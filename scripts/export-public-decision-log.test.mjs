import test from 'node:test';
import assert from 'node:assert/strict';
import { exportPublicDecisionLog } from './export-public-decision-log.mjs';

const record = { id: 'decision-2026-01-01-example', decision_date: '2026-01-01', date_precision: 'day', primary_project: 'job-agent', decision_type: 'product', lifecycle_status: 'implemented', evidence_status: 'verified', title: 'Use reviewed workflow', context: 'Users need control.', decision: 'Keep review in the flow.', tradeoff: 'This adds a step.', evidence_refs: ['logs/DECISION_LOG.md'], capability_tags: ['product-judgment', 'validation', 'risk-awareness'], public_eligibility: 'eligible', publication_state: 'publish' };
const inventory = (records) => ({ project_taxonomy: ['job-agent'], records });

test('exports only allowlisted public fields from publishable records', () => {
  const result = exportPublicDecisionLog(inventory([{ ...record, fingerprint: 'private', evidence_refs: ['private.md'] }]));
  assert.deepEqual(Object.keys(result.records[0]).sort(), ['context', 'date', 'decision', 'decision_type', 'evidence_status', 'id', 'lifecycle_status', 'project', 'tags', 'title', 'tradeoff'].sort());
  assert.equal(result.manifest.record_count, 1);
});
test('does not export held or internal-only records', () => {
  const result = exportPublicDecisionLog(inventory([{ ...record, publication_state: 'hold', failed_gate: 'grounded_evidence', automatic_retry_condition: 'Retry.', gate_version: 'v1', attempt_count: 0 }, { ...record, id: 'private', title: 'Keep internal evidence private', decision: 'Do not publish it.', publication_state: 'internal-only' }]));
  assert.equal(result.records.length, 0);
});
test('rejects local paths and secret-like text in public fields', () => {
  assert.throws(() => exportPublicDecisionLog(inventory([{ ...record, context: 'C:/Users/name/private.md' }])), /rejected/);
  assert.throws(() => exportPublicDecisionLog(inventory([{ ...record, decision: 'Use API_KEY=private-value.' }])), /rejected/);
  assert.throws(() => exportPublicDecisionLog(inventory([{ ...record, context: '/home/name/private.md' }])), /rejected/);
});
