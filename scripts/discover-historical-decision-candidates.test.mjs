import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { discoverCandidates } from './discover-historical-decision-candidates.mjs';

function withFixture(t, contents) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'decision-discovery-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'logs'));
  fs.writeFileSync(path.join(root, 'logs', 'DECISION_LOG.md'), contents);
  return root;
}
const registry = { schema_version: 1, register_revision: 'test', scan_cutoff: '2026-10-02', source_classes: { 'dated-decision-heading': { inclusion_grammar: 'test', exclusion_grammar: 'test' } }, sources: [{ id: 'decision-log', source_path: 'logs/DECISION_LOG.md', source_class: 'dated-decision-heading', owner_project: 'job-agent', accessibility: 'available', source_revision: 'test', scan_state: 'registered', scan_cutoff: '2026-10-02', privacy_class: 'private-repository-evidence' }] };

test('creates one draft with an exact date and source anchor', (t) => {
  const result = discoverCandidates(registry, withFixture(t, '## 2026-05-11 — Use reviewed workflow\n'));
  assert.deepEqual(result.candidates[0].decision_date, '2026-05-11');
  assert.equal(result.candidates[0].source_anchor, 'logs/DECISION_LOG.md#L1');
});
test('holds an explicit undated decision instead of inferring a date', (t) => {
  const result = discoverCandidates(registry, withFixture(t, '## Decision — Keep user control\n'));
  assert.equal(result.candidates[0].review_state, 'hold');
  assert.equal(result.candidates[0].failed_gate, 'supported_date');
});
test('excludes templates and status-only headings', (t) => {
  const result = discoverCandidates(registry, withFixture(t, '## YYYY-MM-DD — Decision Title\n## 2026-05-11 — Status update\n'));
  assert.equal(result.candidates.length, 0);
});
test('creates a stable duplicate collision group for repeated decisions', (t) => {
  const root = withFixture(t, '## 2026-05-11 — Use reviewed workflow\n## 2026-05-12 — Use reviewed workflow\n');
  const result = discoverCandidates(registry, root);
  assert.equal(result.candidates[0].collision_group, result.candidates[1].collision_group);
});

test('does not rescan a source whose recorded revision is unchanged', (t) => {
  const unchanged = structuredClone(registry); unchanged.sources[0].scan_state = 'scanned'; unchanged.sources[0].last_scanned_revision = 'test';
  const result = discoverCandidates(unchanged, withFixture(t, '## 2026-05-11 — Use reviewed workflow\n'));
  assert.equal(result.candidates.length, 0);
  assert.equal(result.source_results[0].skipped, 'unchanged');
});
