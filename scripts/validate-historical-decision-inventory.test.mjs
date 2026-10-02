import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInventory } from './validate-historical-decision-inventory.mjs';

const baseRecord = {
  id: 'decision-2026-01-02-example', decision_date: '2026-01-02', date_precision: 'day',
  primary_project: 'job-agent', decision_type: 'product', lifecycle_status: 'implemented',
  evidence_status: 'verified', title: 'Choose the reviewed workflow',
  decision: 'Keep human review in the workflow.', evidence_refs: ['logs/DECISION_LOG.md'],
  capability_tags: ['product-judgment', 'validation', 'risk-awareness'], public_eligibility: 'eligible'
};
const inventory = (record = {}) => ({ project_taxonomy: ['job-agent', 'pkm', 'household-budget', 'personal-ai-harness', 'phone-layout-agent'], records: [{ ...baseRecord, ...record }] });
const errors = (value) => validateInventory(value).errors;

test('accepts a valid baseline and publication states', () => {
  for (const state of ['publish', 'internal-only']) assert.equal(errors(inventory({ publication_state: state })).length, 0);
  assert.equal(errors(inventory({ publication_state: 'hold', failed_gate: 'grounded_evidence', automatic_retry_condition: 'Verified evidence becomes available.', gate_version: 'v1', attempt_count: 0 })).length, 0);
  assert.equal(errors(inventory()).length, 0);
});

for (const [name, change] of [
  ['missing id', { id: undefined }], ['unsupported date precision', { date_precision: 'hour' }],
  ['invalid decision date', { decision_date: '2026-02-31' }], ['missing primary project', { primary_project: undefined }],
  ['invalid primary project', { primary_project: 'unknown' }], ['missing evidence status', { evidence_status: undefined }],
  ['invalid lifecycle status', { lifecycle_status: 'unknown' }], ['too few capability tags', { capability_tags: ['one', 'two'] }],
  ['duplicate capability tags', { capability_tags: ['same', 'same', 'third'] }], ['missing evidence refs', { evidence_refs: [] }],
  ['missing public eligibility', { public_eligibility: undefined }]
]) test(`rejects ${name}`, () => assert.ok(errors(inventory(change)).length > 0));

test('rejects duplicate stable ids and normalized fingerprints', () => {
  const duplicateId = inventory(); duplicateId.records.push({ ...baseRecord, title: 'Other' });
  assert.ok(errors(duplicateId).some((e) => e.code === 'duplicate-id'));
  const duplicateFingerprint = inventory(); duplicateFingerprint.records.push({ ...baseRecord, id: 'other' });
  assert.ok(errors(duplicateFingerprint).some((e) => e.code === 'duplicate-fingerprint'));
});

test('rejects manual approval states', () => {
  for (const key of ['public_eligibility', 'publication_state']) {
    assert.ok(errors(inventory({ [key]: 'manual-approval' })).some((e) => e.code === 'manual-approval'));
  }
});

test('rejects hold records without a failed gate and automatic retry condition', () => {
  assert.ok(errors(inventory({ publication_state: 'hold' })).some((e) => e.code === 'invalid-hold-record'));
  assert.ok(errors(inventory({ publication_state: 'hold', failed_gate: 'grounded_evidence', automatic_retry_condition: 'Retry.', gate_version: 'v1', attempt_count: -1 })).some((e) => e.code === 'invalid-hold-record'));
});

test('accepts a safe repository-relative source anchor', () => {
  assert.equal(errors(inventory({ source_anchor: 'logs/DECISION_LOG.md#L3' })).length, 0);
});

test('rejects runtime paths in inventory evidence or source anchors', () => {
  assert.ok(errors(inventory({ evidence_refs: ['C:/Users/name/.codex/private.md'] })).some((e) => e.code === 'unsafe-evidence-ref'));
  assert.ok(errors(inventory({ source_anchor: 'C:/Users/name/private.md#L3' })).some((e) => e.code === 'unsafe-source-anchor'));
  assert.ok(errors(inventory({ evidence_refs: ['/home/name/private.md'] })).some((e) => e.code === 'unsafe-evidence-ref'));
});

test('accepts a directly evidenced phone-layout-agent record only when taxonomy includes it', () => {
  const record = { ...baseRecord, primary_project: 'phone-layout-agent', source_anchor: 'strategy/phone-layout-agent/decisions/DECISION_TRAIL.md#L17' };
  assert.equal(errors(inventory(record)).length, 0);
  const missingTaxonomy = inventory(record); missingTaxonomy.project_taxonomy = missingTaxonomy.project_taxonomy.filter((project) => project !== 'phone-layout-agent');
  assert.ok(errors(missingTaxonomy).some((error) => error.code === 'invalid-primary-project'));
});
