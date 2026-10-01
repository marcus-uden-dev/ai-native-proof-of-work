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
const inventory = (record = {}) => ({ project_taxonomy: ['job-agent', 'pkm', 'household-budget', 'personal-ai-harness'], records: [{ ...baseRecord, ...record }] });
const errors = (value) => validateInventory(value).errors;

test('accepts a valid baseline and publication states', () => {
  for (const state of ['publish', 'internal-only']) assert.equal(errors(inventory({ publication_state: state })).length, 0);
  assert.equal(errors(inventory({ publication_state: 'hold', failed_gate: 'grounded_evidence', automatic_retry_condition: 'Verified evidence becomes available.' })).length, 0);
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
});
