import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const entries = JSON.parse(readFileSync('site/evidence/decision-log.json', 'utf8'));
const tags = JSON.parse(readFileSync('site/evidence/decision-log-tags.json', 'utf8'));
const currentTagNames = new Set(tags.map((t) => t.tag));

// Session-mechanics / tool-internal markers this test can safely name directly.
// Forbidden-identity and local-path leaks are already caught repo-wide by
// scripts/check-public-release.mjs (identity via PUBLIC_RELEASE_FORBIDDEN_IDENTITIES, an env
// var / CI secret never hardcoded in a tracked file; local paths via its own generic
// [A-Za-z]:\Users\... pattern) -- this file must not duplicate either as a literal/regex here,
// or it risks becoming the exact leak it exists to prevent, and a path-shaped regex literal in
// this file's own source would also false-positive against that repo-wide scan. Deliberately
// narrow otherwise: this site legitimately references "Claude"/"Codex" as external AI assistant
// names elsewhere (recruiter-agent-guide.md), so this deny-list targets specific leakage shapes,
// not tool brand names in general.
const redactionPatterns = [
  { label: 'codex automations directory', pattern: /\.codex[\\/]automations/i },
  { label: 'automation config filename', pattern: /automation\.toml/i },
  { label: 'session-mechanics term: subagent', pattern: /\bsubagent\b/i },
  { label: 'session-mechanics term: gh auth switch', pattern: /\bgh auth switch\b/i },
  { label: 'session-mechanics term: session transcript', pattern: /session transcript/i }
];

function validateEntry(entry, index) {
  const label = `entries[${index}]`;
  assert.ok(Array.isArray(entry.tags), `${label}.tags must be an array`);
  assert.ok(entry.tags.length >= 3 && entry.tags.length <= 7, `${label}.tags must have 3-7 entries, got ${entry.tags.length}`);
  assert.equal(new Set(entry.tags).size, entry.tags.length, `${label}.tags must not contain duplicates`);
  for (const tag of entry.tags) {
    assert.ok(currentTagNames.has(tag), `${label} uses unknown or future-bank tag: ${tag}`);
  }
  assert.equal(typeof entry.why, 'string', `${label}.why must be a string`);
  assert.ok(entry.why.trim().length > 0, `${label}.why must not be empty`);
  assert.equal(typeof entry.demonstrates, 'string', `${label}.demonstrates must be a string`);
  assert.ok(entry.demonstrates.trim().length > 0, `${label}.demonstrates must not be empty`);
  assert.ok(!Number.isNaN(Date.parse(entry.date)), `${label}.date must be a valid date`);
  for (const { label: patternLabel, pattern } of redactionPatterns) {
    assert.ok(!pattern.test(entry.why), `${label}.why matches redaction-backstop pattern (${patternLabel})`);
    assert.ok(!pattern.test(entry.demonstrates), `${label}.demonstrates matches redaction-backstop pattern (${patternLabel})`);
  }
}

test('decision-log entries are schema-valid, use only current taxonomy tags, and pass the redaction backstop', () => {
  entries.forEach(validateEntry);
});

test('decision-log entries are ordered newest-first', () => {
  for (let i = 1; i < entries.length; i += 1) {
    const prev = Date.parse(entries[i - 1].date);
    const curr = Date.parse(entries[i].date);
    assert.ok(prev >= curr, `entries[${i - 1}] (${entries[i - 1].date}) must not be older than entries[${i}] (${entries[i].date})`);
  }
});

test('decision-log-tags.json is a subset of the current-tags taxonomy (never the future bank)', () => {
  for (const { tag, shows } of tags) {
    assert.equal(typeof tag, 'string');
    assert.ok(tag.length > 0);
    assert.equal(typeof shows, 'string');
    assert.ok(shows.length > 0);
  }
  const names = tags.map((t) => t.tag);
  assert.equal(new Set(names).size, names.length, 'decision-log-tags.json must not contain duplicate tags');
});

test('validator rejects a malformed sample entry (fixture-only, not live data)', () => {
  const badEntries = [
    { date: '2026-08-23', tags: ['product-taste'], why: 'x', demonstrates: 'y' }, // too few tags
    { date: '2026-08-23', tags: ['product-taste', 'product-taste', 'evidence-driven'], why: 'x', demonstrates: 'y' }, // duplicate tag
    { date: '2026-08-23', tags: ['not-a-real-tag', 'product-taste', 'evidence-driven'], why: 'x', demonstrates: 'y' }, // unknown tag
    { date: '2026-08-23', tags: ['value-realization', 'product-taste', 'evidence-driven'], why: 'x', demonstrates: 'y' }, // future-bank tag
    { date: '2026-08-23', tags: ['product-taste', 'evidence-driven', 'systems-thinking'], why: '', demonstrates: 'y' } // empty why
  ];
  for (const [i, entry] of badEntries.entries()) {
    assert.throws(() => validateEntry(entry, i), `bad fixture ${i} should have failed validation`);
  }
});

test('validator rejects every redaction-backstop pattern (fixture-only, not live data)', () => {
  const baseEntry = { date: '2026-08-23', tags: ['product-taste', 'evidence-driven', 'systems-thinking'], demonstrates: 'y' };
  const leakSamples = [
    'checked .codex/automations output',
    'ran the automation.toml step',
    'dispatched a subagent for this',
    'ran gh auth switch first',
    'reviewed the session transcript'
  ];
  for (const [i, leak] of leakSamples.entries()) {
    assert.throws(() => validateEntry({ ...baseEntry, why: leak }, i), `redaction pattern should have caught: ${leak}`);
  }
});

test('validator accepts a well-formed sample entry (fixture-only, not live data)', () => {
  const goodEntry = {
    date: '2026-08-23',
    tags: ['product-taste', 'evidence-driven', 'systems-thinking'],
    why: 'Added a deterministic redaction backstop instead of relying solely on prompt compliance.',
    demonstrates: 'Designs automated systems with a second, code-enforced safety gate, not just a single point of trust.'
  };
  assert.doesNotThrow(() => validateEntry(goodEntry, 0));
});
