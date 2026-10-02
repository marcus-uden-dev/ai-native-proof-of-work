import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCoverage } from './check-historical-decision-coverage.mjs';

const base = { schema_version: 1, register_revision: 'test', scan_cutoff: '2026-10-02', source_classes: { heading: { inclusion_grammar: 'test', exclusion_grammar: 'test' } }, sources: [{ id: 'source', source_path: 'logs/a.md', source_class: 'heading', owner_project: 'job-agent', accessibility: 'available', source_revision: 'git:test', last_scanned_revision: 'git:test', scan_state: 'scanned', scan_cutoff: '2026-10-02', privacy_class: 'private' }] };
test('does not rescan an unchanged completed source', () => assert.equal(checkCoverage(base).needs_scan.length, 0));
test('marks changed sources for review', () => {
  const registry = structuredClone(base); registry.sources[0].scan_state = 'changed';
  assert.deepEqual(checkCoverage(registry).needs_scan, ['source']);
});

test('marks a scanned source for review when its revision changes', () => {
  const registry = structuredClone(base); registry.sources[0].last_scanned_revision = 'git:old';
  assert.deepEqual(checkCoverage(registry).needs_scan, ['source']);
});
