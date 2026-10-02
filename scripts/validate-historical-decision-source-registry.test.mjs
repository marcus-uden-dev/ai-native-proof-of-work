import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSourceRegistry } from './validate-historical-decision-source-registry.mjs';

const source = {
  id: 'decision-log', source_path: 'logs/DECISION_LOG.md', source_class: 'dated-decision-heading',
  owner_project: 'personal-ai-harness', accessibility: 'available', source_revision: 'git:abc123',
  scan_state: 'registered', scan_cutoff: '2026-10-02', privacy_class: 'private-repository-evidence'
};
const registry = (overrides = {}) => ({
  schema_version: 1, register_revision: 'test', scan_cutoff: '2026-10-02',
  source_classes: { 'dated-decision-heading': { inclusion_grammar: 'test', exclusion_grammar: 'test' } },
  sources: [{ ...source, ...overrides }]
});

test('accepts a safe available source', () => assert.equal(validateSourceRegistry(registry()).errors.length, 0));
test('accepts a source-root itself as a safe relative source path', () => assert.equal(validateSourceRegistry(registry({ source_path: '.' })).errors.length, 0));
test('rejects local and runtime paths', () => {
  for (const source_path of ['C:/Users/name/file.md', 'C:\\Users\\name\\file.md', '../logs/DECISION_LOG.md', '.codex/projects/a.md']) {
    assert.ok(validateSourceRegistry(registry({ source_path })).errors.some((error) => error.code === 'unsafe-source-path'));
  }
});
test('requires access details for unavailable sources', () => {
  const result = validateSourceRegistry(registry({ source_path: null, accessibility: 'unavailable', scan_state: 'unavailable', access_requirement: undefined }));
  assert.ok(result.errors.some((error) => error.code === 'missing-unavailable-details'));
});
test('rejects a source class outside the frozen grammar', () => {
  assert.ok(validateSourceRegistry(registry({ source_class: 'free-text' })).errors.some((error) => error.code === 'invalid-source-class'));
});
