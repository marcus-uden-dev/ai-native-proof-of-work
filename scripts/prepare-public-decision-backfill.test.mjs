import test from 'node:test';
import assert from 'node:assert/strict';
import { preparePublicDecisionBackfill } from './prepare-public-decision-backfill.mjs';

test('normalizes a dated plan candidate as a public planned decision', () => {
  const result = preparePublicDecisionBackfill([{
    review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Use a deterministic FX table'
  }], []);
  assert.deepEqual(result[0], {
    date: '2026-08-22', project: 'Job-agent', status: 'Planned', type: 'Technical decision',
    title: 'Use a deterministic FX table', tags: ['technical-judgment', 'systems-thinking', 'decision-making'],
    why: 'The dated design plan specifies this boundary: Use a deterministic FX table.',
    demonstrates: 'Makes the technical decision explicit through technical judgment and systems thinking.'
  });
});

test('deduplicates a record already in the public log', () => {
  const candidate = { review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Use a deterministic FX table' };
  const result = preparePublicDecisionBackfill([candidate], [{ date: '2026-08-22', project: 'Job-agent', title: 'Use a deterministic FX table' }]);
  assert.equal(result.length, 0);
});

test('rejects private and incomplete candidate titles', () => {
  const result = preparePublicDecisionBackfill([
    { review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Private source of truth:' },
    { review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Store records in .agents/docs' },
    { review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Do not call gh auth switch directly' },
    { review_state: 'draft', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Use autonomous execution' },
    { review_state: 'hold', decision_date: '2026-08-22', confidence: 'dated-filename', primary_project: 'job-agent', title: 'Use a deterministic FX table' }
  ], []);
  assert.equal(result.length, 0);
});
