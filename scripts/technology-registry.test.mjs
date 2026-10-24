import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { isUnsafe } from './build-technology-catalog.mjs';

const registry = JSON.parse(fs.readFileSync(new URL('./technology-registry.json', import.meta.url), 'utf8'));

test('every registry entry has name, purpose and capability', () => {
  for (const [key, entry] of Object.entries(registry)) {
    for (const field of ['name', 'purpose', 'capability']) {
      assert.ok(entry[field], `${key}.${field}`);
    }
  }
});

test('registry text is public-safe', () => {
  for (const [key, entry] of Object.entries(registry)) {
    assert.equal(isUnsafe(`${entry.name} ${entry.purpose} ${entry.capability}`), false, key);
  }
});
