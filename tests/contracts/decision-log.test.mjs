import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const entries = JSON.parse(readFileSync('site/evidence/decision-log.json', 'utf8'));
const taxonomy = JSON.parse(readFileSync('site/evidence/taxonomy.json', 'utf8'));
const renderedDecisionLog = readFileSync('site/proof/recursive-workflow/index.html', 'utf8');
const renderedDecisionLogLower = renderedDecisionLog.toLowerCase();
const primary = new Set(taxonomy.capabilities.primary.map(({ id }) => id));
const secondary = new Set(taxonomy.capabilities.secondary.map(({ id }) => id));
const mechanisms = new Set(taxonomy.mechanisms.map(({ id }) => id));
const allCapabilities = new Set([...primary, ...secondary]);
const evidenceStatuses = new Set(taxonomy.evidenceStatuses);
const outcomeStatuses = new Set(taxonomy.outcomeStatuses);
const casePotentials = new Set(taxonomy.casePotentials);
const redactionPatterns = [
  { label: 'codex automations directory', pattern: /\.codex[\\/]automations/i },
  { label: 'automation config filename', pattern: /automation\.toml/i },
  { label: 'session-mechanics term: subagent', pattern: /\bsubagent\b/i },
  { label: 'session-mechanics term: gh auth switch', pattern: /\bgh auth switch\b/i },
  { label: 'session-mechanics term: session transcript', pattern: /session transcript/i }
];

function validateEntry(entry, index) {
  const label = `entries[${index}]`;
  assert.ok(Array.isArray(entry.capabilities), `${label}.capabilities must be an array`);
  assert.ok(entry.capabilities.length >= 2 && entry.capabilities.length <= 4, `${label}.capabilities must have 2-4 entries`);
  assert.equal(new Set(entry.capabilities).size, entry.capabilities.length, `${label}.capabilities must not contain duplicates`);
  for (const capability of entry.capabilities) assert.ok(allCapabilities.has(capability), `${label} uses unknown capability: ${capability}`);
  assert.ok(Array.isArray(entry.mechanisms), `${label}.mechanisms must be an array`);
  assert.equal(new Set(entry.mechanisms).size, entry.mechanisms.length, `${label}.mechanisms must not contain duplicates`);
  for (const mechanism of entry.mechanisms) assert.ok(mechanisms.has(mechanism), `${label} uses unknown mechanism: ${mechanism}`);
  assert.equal(typeof entry.evidence?.status, 'string', `${label}.evidence.status must be a string`);
  assert.ok(evidenceStatuses.has(entry.evidence.status), `${label} uses unknown evidence status: ${entry.evidence.status}`);
  assert.ok(Array.isArray(entry.evidence.refs) && entry.evidence.refs.length > 0, `${label}.evidence.refs must contain a public reference`);
  for (const ref of entry.evidence.refs) {
    assert.equal(typeof ref, 'string');
    assert.ok(!/^[A-Za-z]:[\\/]|^\\\\|^https?:\/\//i.test(ref), `${label}.evidence.refs must stay relative and public`);
  }
  assert.ok(outcomeStatuses.has(entry.outcome?.status), `${label} uses unknown outcome status: ${entry.outcome?.status}`);
  if (entry.outcome.status === 'Measured outcome') assert.equal(typeof entry.outcome.measuredOutcome, 'string', `${label} measured outcomes need measuredOutcome`);
  assert.ok(casePotentials.has(entry.casePotential), `${label} uses unknown case potential: ${entry.casePotential}`);
  assert.equal(typeof entry.why, 'string');
  assert.ok(entry.why.trim().length > 0, `${label}.why must not be empty`);
  assert.equal(typeof entry.demonstrates, 'string');
  assert.ok(entry.demonstrates.trim().length > 0, `${label}.demonstrates must not be empty`);
  assert.ok(!('tags' in entry), `${label} must not retain the ambiguous legacy tags field`);
  if (entry.status !== undefined) assert.ok(['Verified', 'Planned', 'Hypothesis'].includes(entry.status), `${label}.status must be Verified, Planned, or Hypothesis`);
  assert.ok(!Number.isNaN(Date.parse(entry.date)), `${label}.date must be a valid date`);
  for (const { label: patternLabel, pattern } of redactionPatterns) {
    assert.ok(!pattern.test(entry.why), `${label}.why matches redaction-backstop pattern (${patternLabel})`);
    assert.ok(!pattern.test(entry.demonstrates), `${label}.demonstrates matches redaction-backstop pattern (${patternLabel})`);
  }
}

test('taxonomy has unique typed IDs and includes the recruiter capability contract', () => {
  assert.equal(taxonomy.schemaVersion, 2);
  assert.equal(primary.size, taxonomy.capabilities.primary.length);
  assert.equal(secondary.size, taxonomy.capabilities.secondary.length);
  assert.equal(mechanisms.size, taxonomy.mechanisms.length);
  assert.equal([...primary].some((id) => secondary.has(id)), false, 'primary and secondary capabilities must not overlap');
  for (const id of ['execution', 'operational-understanding', 'requirements-translation', 'technical-fluency', 'quality-judgment', 'stakeholder-management', 'operating-model-design', 'change-management', 'adoption-and-enablement', 'metrics-and-kpis', 'value-realization', 'evidence-discipline']) assert.ok(primary.has(id), `missing required primary capability: ${id}`);
  for (const lens of taxonomy.roleLenses) {
    for (const id of [...lens.coreCapabilities, ...lens.supportingCapabilities]) assert.ok(allCapabilities.has(id), `${lens.id} references unknown capability: ${id}`);
  }
});

test('migration covers every former tag and the retired compatibility manifest stays removed', () => {
  const migrations = new Map(taxonomy.migration.map((entry) => [entry.from, entry]));
  assert.equal(migrations.size, 49);
  assert.equal(existsSync('site/evidence/decision-log-tags.json'), false);
  for (const alias of ['product-taste', 'workflow-automation', 'business-value', 'ai-native-workflows', 'least-privilege']) assert.ok(migrations.has(alias), `missing migration for ${alias}`);
});

test('decision-log entries are schema-valid and preserve conservative evidence boundaries', () => {
  assert.equal(entries.length, 17);
  entries.forEach(validateEntry);
  assert.equal(entries.some((entry) => entry.outcome.status === 'Measured outcome'), false, 'migration must not invent measured outcomes');
});

test('decision-log entries are ordered newest-first', () => {
  for (let i = 1; i < entries.length; i += 1) {
    assert.ok(Date.parse(entries[i - 1].date) >= Date.parse(entries[i].date), `entries[${i - 1}] must not be older than entries[${i}]`);
  }
});

test('static Decision Log stays synchronized with structured evidence and the typed model', () => {
  assert.doesNotMatch(renderedDecisionLog, /data-tags=/);
  for (const entry of entries) {
    assert.ok(renderedDecisionLog.includes(entry.why), `rendered Decision Log is missing: ${entry.why}`);
    assert.ok(renderedDecisionLog.includes(entry.demonstrates), `rendered Decision Log is missing: ${entry.demonstrates}`);
    for (const capability of entry.capabilities) assert.ok(renderedDecisionLogLower.includes(capability.replaceAll('-', ' ').toLowerCase()), `rendered Decision Log is missing capability: ${capability}`);
  }
});

test('validator rejects malformed typed evidence', () => {
  const base = {
    date: '2026-08-23', capabilities: ['product-judgment', 'evidence-discipline'], mechanisms: [],
    evidence: { status: 'Public evidence', refs: ['../'] }, outcome: { status: 'Not measured' },
    casePotential: 'Supporting evidence', why: 'x', demonstrates: 'y'
  };
  assert.throws(() => validateEntry({ ...base, capabilities: ['decision-making', 'product-judgment'] }, 0));
  assert.throws(() => validateEntry({ ...base, mechanisms: ['human-in-the-loop'] }, 1));
  assert.throws(() => validateEntry({ ...base, evidence: { status: 'Measured outcome', refs: ['../'] } }, 2));
  assert.throws(() => validateEntry({ ...base, outcome: { status: 'Made-up' } }, 3));
  const localPath = ['C:', 'Users', 'private'].join('\\');
  assert.throws(() => validateEntry({ ...base, evidence: { status: 'Public evidence', refs: [localPath] } }, 4));
  assert.throws(() => validateEntry({ ...base, tags: ['product-judgment'] }, 5));
});

test('validator rejects every redaction-backstop pattern', () => {
  const baseEntry = {
    date: '2026-08-23', capabilities: ['product-judgment', 'evidence-discipline'], mechanisms: [],
    evidence: { status: 'Public evidence', refs: ['../'] }, outcome: { status: 'Not measured' },
    casePotential: 'Supporting evidence', demonstrates: 'y'
  };
  const leakSamples = ['checked .codex/automations output', 'ran the automation.toml step', 'dispatched a subagent for this', 'ran gh auth switch first', 'reviewed the session transcript'];
  for (const leak of leakSamples) assert.throws(() => validateEntry({ ...baseEntry, why: leak }, 0));
});

test('validator accepts a conservative typed entry', () => {
  assert.doesNotThrow(() => validateEntry({
    date: '2026-08-23',
    capabilities: ['product-judgment', 'evidence-discipline'],
    mechanisms: ['human-gate'],
    evidence: { status: 'Public evidence', refs: ['../../'] },
    outcome: { status: 'Success criteria defined but not measured', successDefinition: 'Reduce unsupported public claims.' },
    casePotential: 'Supporting evidence',
    why: 'Added a bounded review gate before publishing a change.',
    demonstrates: 'Makes a decision with explicit evidence and outcome boundaries.'
  }, 0));
});
