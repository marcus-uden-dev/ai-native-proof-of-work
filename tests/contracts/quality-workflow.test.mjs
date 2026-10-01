import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const repositoryRoot = resolve(import.meta.dirname, '../..');
const workflow = readFileSync(resolve(repositoryRoot, '.github/workflows/quality.yml'), 'utf8');

test('Quality workflow defines one deterministic checkout ref', () => {
  const checkoutBlock = workflow.match(/- name: Check out the full clean history[\s\S]*?(?=\n\s+- name:|\n\s*$)/)?.[0] ?? '';
  const refs = checkoutBlock.match(/^\s+ref:/gm) ?? [];

  assert.equal(refs.length, 1, 'actions/checkout must receive exactly one ref value');
  assert.match(checkoutBlock, /^\s+ref: \$\{\{ github\.event_name == 'pull_request' && github\.event\.pull_request\.head\.sha \|\| github\.sha \}\}$/m);
});
