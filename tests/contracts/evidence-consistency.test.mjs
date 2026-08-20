import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const manifest = JSON.parse(readFileSync('site/evidence/releases/job-agent-v1.json', 'utf8'));
const fixture = JSON.parse(readFileSync('site/evidence/fixtures/job-agent-company-v1.json', 'utf8'));
const repeatedFactFiles = [
  'site/recruiter-agent-guide.md',
  'site/recruiter-report-brief.md',
  'site/proof/job-agent/index.html'
];

const facts = {
  productVersion: manifest.productVersion,
  evidenceDate: manifest.evidenceDate,
  implementationState: manifest.implementationState,
  publicAvailability: manifest.publicAvailability,
  maturity: manifest.maturity,
  marketValidationState: manifest.marketValidationState,
  outcomeMeasurementState: manifest.outcomeMeasurementState,
  nextTest: manifest.nextTest,
  privacyState: manifest.privacyState
};

test('release manifest contains every required public trust field', () => {
  for (const [field, value] of Object.entries(facts)) {
    assert.equal(typeof value, 'string', `${field} must be a string`);
    assert.ok(value.length > 0, `${field} must not be empty`);
  }
  assert.equal(manifest.artifactId, 'job-agent');
  assert.equal(manifest.fixture.companyMode, 'synthetic-only');
  assert.equal(manifest.canonicalUrl, 'https://marcus.uden.dev/proof/job-agent/');
});

test('all repeated release facts match the evidence manifest', () => {
  for (const file of repeatedFactFiles) {
    const content = readFileSync(file, 'utf8');
    for (const value of Object.values(facts)) {
      assert.ok(content.includes(value), `${file} must repeat the exact value: ${value}`);
    }
  }
});

test('release-one company evidence is synthetic-only and field-labelled', () => {
  assert.equal(fixture.companyMode, 'synthetic-only');
  assert.match(fixture.notice, /invented company/i);
  for (const field of fixture.researchFields) {
    assert.ok(['synthetic_demo', 'inferred_demo'].includes(field.sourceClass));
    assert.ok(['synthetic demo', 'inferred demo'].includes(field.sourceLabel));
    assert.ok(field.decisionUse.length > 0);
  }
});

test('case-study research fields repeat the governed fixture values and labels', () => {
  const caseStudy = readFileSync('site/proof/job-agent/index.html', 'utf8');
  assert.ok(caseStudy.includes(fixture.company.name));
  for (const field of fixture.researchFields) {
    assert.ok(caseStudy.includes(field.value), `case study must contain ${field.id} value`);
    assert.ok(caseStudy.includes(field.sourceLabel), `case study must contain ${field.id} source label`);
    assert.ok(caseStudy.includes(field.decisionUse), `case study must contain ${field.id} decision use`);
  }
});

test('source-class vocabulary remains stable', () => {
  assert.deepEqual(
    manifest.sourceClasses.map(({ id, label }) => ({ id, label })),
    [
      { id: 'public_source', label: 'public source' },
      { id: 'synthetic_demo', label: 'synthetic demo' },
      { id: 'inferred_demo', label: 'inferred demo' }
    ]
  );
});

test('agent guide defines citations, inference limits, missing sources, and untrusted input handling', () => {
  const guide = readFileSync('site/recruiter-agent-guide.md', 'utf8');
  assert.match(guide, /untrusted data/i);
  assert.match(guide, /Separate `Evidence` from `Inference`/);
  assert.match(guide, /Source unavailable/);
  assert.match(guide, /Link each material finding/);
  assert.match(guide, /Do not include confidential or personal data/);
});
