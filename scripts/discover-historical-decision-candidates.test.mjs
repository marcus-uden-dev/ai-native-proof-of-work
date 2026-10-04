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
function withDatedFixture(t, contents) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'decision-discovery-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'docs', 'plans'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs', 'plans', '2026-05-11-architecture.md'), contents);
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

test('creates a held draft for an explicit undated KTD in a registered corpus', (t) => {
  const corpus = structuredClone(registry); corpus.source_classes['decision-statement-corpus'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; corpus.sources[0].source_class = 'decision-statement-corpus';
  const result = discoverCandidates(corpus, withFixture(t, '- **KTD1 — Keep publication one-way**\n'));
  assert.equal(result.candidates[0].title, 'Keep publication one-way');
  assert.equal(result.candidates[0].review_state, 'hold');
});

test('recognizes an explicit KTD using the numbered-dot notation', (t) => {
  const corpus = structuredClone(registry); corpus.source_classes['decision-statement-corpus'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; corpus.sources[0].source_class = 'decision-statement-corpus';
  const result = discoverCandidates(corpus, withFixture(t, '- **KTD1. Use an allowlisted bridge**\n'));
  assert.equal(result.candidates[0].title, 'Use an allowlisted bridge');
  assert.equal(result.candidates[0].review_state, 'hold');
});

test('excludes templates and similarly named decision-related headings', (t) => {
  const corpus = structuredClone(registry); corpus.source_classes['decision-statement-corpus'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; corpus.sources[0].source_class = 'decision-statement-corpus';
  const result = discoverCandidates(corpus, withFixture(t, '**Decision-makers:**\n| Decision | What landed |\n|---|---|\n| Decision | [What we are doing] |\n| Decision | "What tipped you over?" |\n'));
  assert.equal(result.candidates.length, 0);
});

test('creates a held draft for a visible decision-table row', (t) => {
  const corpus = structuredClone(registry); corpus.source_classes['decision-statement-corpus'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; corpus.sources[0].source_class = 'decision-statement-corpus';
  const result = discoverCandidates(corpus, withFixture(t, '| Decision | Use a reviewed workflow |\n'));
  assert.equal(result.candidates[0].title, 'Use a reviewed workflow');
  assert.equal(result.candidates[0].failed_gate, 'supported_date');
});

test('uses an ISO date in a plan filename as explicit source metadata', (t) => {
  const corpus = structuredClone(registry); corpus.source_classes['decision-statement-corpus'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; corpus.sources[0].source_path = 'docs/plans'; corpus.sources[0].source_class = 'decision-statement-corpus';
  const result = discoverCandidates(corpus, withDatedFixture(t, '- **KTD1 — Keep publication one-way**\n'));
  assert.equal(result.candidates[0].decision_date, '2026-05-11');
  assert.equal(result.candidates[0].confidence, 'dated-filename');
  assert.equal(result.candidates[0].review_state, 'draft');
});

test('creates a held draft for a documented Swedish architecture rationale', (t) => {
  const notes = structuredClone(registry); notes.source_classes['session-decision-notes'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; notes.sources[0].source_class = 'session-decision-notes';
  const result = discoverCandidates(notes, withFixture(t, '## Varför MCP-server\nPortability rationale.\n'));
  assert.equal(result.candidates[0].title, 'MCP-server');
  assert.equal(result.candidates[0].primary_project, 'job-agent');
  assert.equal(result.candidates[0].review_state, 'hold');
});

test('creates a held draft for another explicit section in a dedicated decision note', (t) => {
  const notes = structuredClone(registry); notes.source_classes['session-decision-notes'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; notes.sources[0].source_class = 'session-decision-notes';
  const result = discoverCandidates(notes, withFixture(t, '## Deduplicering\nUse URL matching and similarity review.\n'));
  assert.equal(result.candidates[0].title, 'Deduplicering');
  assert.equal(result.candidates[0].review_state, 'hold');
});

test('creates held drafts from explicit architecture-outline decisions', (t) => {
  const notes = structuredClone(registry); notes.source_classes['architecture-decision-outline'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; notes.sources[0].source_class = 'architecture-decision-outline';
  const result = discoverCandidates(notes, withFixture(t, '## Why multi-agent execution\n### 1. Accounts before budgets\n### Recommended: per-user shortcut\n### Alternative A: Task Scheduler\n'));
  assert.deepEqual(result.candidates.map((candidate) => candidate.title), ['multi-agent execution', 'Accounts before budgets', 'per-user shortcut', 'Task Scheduler']);
  assert.ok(result.candidates.every((candidate) => candidate.review_state === 'hold'));
});

test('suggests employer-relevant capability tags without changing review gates', (t) => {
  const notes = structuredClone(registry); notes.source_classes['session-decision-notes'] = { inclusion_grammar: 'test', exclusion_grammar: 'test' }; notes.sources[0].source_class = 'session-decision-notes';
  const result = discoverCandidates(notes, withFixture(t, '## Varför MCP-server\nPortability rationale.\n'));
  assert.deepEqual(result.candidates[0].suggested_capability_tags, ['api-and-systems-integration']);
  assert.equal(result.candidates[0].review_state, 'hold');
});

test('uses a local source-root mapping without exposing its path in the draft anchor', (t) => {
  const external = structuredClone(registry); external.sources[0].source_root = 'job-agent';
  const root = withFixture(t, '## 2026-05-11 — Use reviewed workflow\n');
  const result = discoverCandidates(external, process.cwd(), { 'job-agent': root });
  assert.equal(result.candidates[0].source_anchor, 'job-agent:logs/DECISION_LOG.md#L1');
});
