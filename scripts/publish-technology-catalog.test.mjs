import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { MARKER } from './build-technology-catalog.mjs';
import { CATALOG_FILE, publishCatalog } from './publish-technology-catalog.mjs';

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'tech-publish-'));
const catalog = (dir) => {
  const file = path.join(dir, 'in.md');
  fs.writeFileSync(file, `${MARKER}\n# x\n`);
  return file;
};

test('writes only the catalog file and leaves others untouched', () => {
  const src = tmp();
  const target = tmp();
  fs.writeFileSync(path.join(target, 'keep.txt'), 'keep');
  publishCatalog(catalog(src), target);
  assert.deepEqual(fs.readdirSync(target).sort(), [CATALOG_FILE, 'keep.txt']);
  assert.equal(fs.readFileSync(path.join(target, 'keep.txt'), 'utf8'), 'keep');
});

test('overwrites a previously generated catalog', () => {
  const src = tmp();
  const target = tmp();
  fs.writeFileSync(path.join(target, CATALOG_FILE), `${MARKER}\nold`);
  publishCatalog(catalog(src), target);
  assert.match(fs.readFileSync(path.join(target, CATALOG_FILE), 'utf8'), /# x/);
});

test('refuses to overwrite a hand-written file', () => {
  const src = tmp();
  const target = tmp();
  fs.writeFileSync(path.join(target, CATALOG_FILE), 'mine');
  assert.throws(() => publishCatalog(catalog(src), target), /hand-written/);
  assert.equal(fs.readFileSync(path.join(target, CATALOG_FILE), 'utf8'), 'mine');
});

test('fails on a missing target and on an unmarked catalog', () => {
  const src = tmp();
  assert.throws(() => publishCatalog(catalog(src), path.join(src, 'nope')), /does not exist/);
  const bad = path.join(src, 'bad.md');
  fs.writeFileSync(bad, '# x');
  assert.throws(() => publishCatalog(bad, tmp()), /marker/);
});
