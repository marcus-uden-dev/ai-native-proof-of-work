import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { validateRepository } from '../../scripts/check-public-release.mjs';

function makeRepository(files, privacy = {}, extraAllowedFiles = []) {
  const root = mkdtempSync(join(tmpdir(), 'public-boundary-'));
  const allowedFiles = ['release/allowlist.json', 'release/privacy-review.json', ...Object.keys(files), ...extraAllowedFiles];
  const records = privacy.reviewedFiles ?? [];
  const base = {
    schemaVersion: 1,
    releaseId: 'test',
    reviewStatus: privacy.reviewStatus ?? 'scaffold',
    reviewedAt: '2026-08-20',
    reviewer: 'Test reviewer',
    candidateCommit: privacy.candidateCommit ?? null,
    scope: 'Contract fixture',
    reviewedFiles: records
  };
  const allFiles = {
    'release/allowlist.json': JSON.stringify({ schemaVersion: 1, allowedFiles }, null, 2),
    'release/privacy-review.json': JSON.stringify(base, null, 2),
    ...files
  };
  for (const [path, content] of Object.entries(allFiles)) {
    const absolute = join(root, path);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
  return root;
}

test('accepts a clean allowlisted scaffold without a remote', () => {
  const root = makeRepository({ 'README.md': '# Public proof' });
  assert.deepEqual(validateRepository(root).errors, []);
});

test('rejects an unexpected file with an exact category and path', () => {
  const root = makeRepository({ 'README.md': '# Public proof' });
  writeFileSync(join(root, 'private-notes.md'), 'not public');
  const result = validateRepository(root);
  assert.ok(result.errors.some((error) => error.category === 'unexpected-path' && error.file === 'private-notes.md'));
});

test('rejects a protected identity supplied outside the tracked repository', () => {
  const marker = 'forbidden-private-identity';
  const root = makeRepository({ 'README.md': `# ${marker}` });
  const result = validateRepository(root, { forbiddenIdentities: marker });
  assert.ok(result.errors.some((error) => error.category === 'private-identity' && error.file === 'README.md'));
});

test('rejects local machine paths', () => {
  const localPath = ['C:', 'Users', 'person', 'private.txt'].join('\\');
  const root = makeRepository({ 'README.md': localPath });
  const result = validateRepository(root);
  assert.ok(result.errors.some((error) => error.category === 'local-path' && error.file === 'README.md'));
});

test('rejects unreviewed binary artifacts', () => {
  const root = makeRepository({ 'site/assets/images/job-agent/test.png': Buffer.from('not-a-real-image') });
  const result = validateRepository(root);
  assert.ok(result.errors.some((error) => error.category === 'privacy-record'));
});

test('accepts an approved binary artifact with a matching digest', async () => {
  const { createHash } = await import('node:crypto');
  const content = Buffer.from('synthetic-image-fixture');
  const digest = createHash('sha256').update(content).digest('hex');
  const root = makeRepository(
    { 'site/assets/images/job-agent/test.png': content },
    {
      reviewStatus: 'complete',
      candidateCommit: 'test-candidate',
      reviewedFiles: [{
        path: 'site/assets/images/job-agent/test.png',
        sha256: digest,
        decision: 'approved',
        dataClass: 'synthetic demo'
      }]
    }
  );
  const result = validateRepository(root);
  assert.deepEqual(result.errors, []);
});

test('rejects disallowed positive maturity wording but permits an explicit negative status', () => {
  const unsafe = makeRepository({ 'site/index.html': '<p>This product is live.</p>' });
  const safe = makeRepository({ 'site/index.html': '<p>Work in progress. It is not live.</p>' });
  assert.ok(validateRepository(unsafe).errors.some((error) => error.category === 'maturity'));
  assert.equal(validateRepository(safe).errors.some((error) => error.category === 'maturity'), false);
});

test('rejects a missing or stale approved CV artifact', async () => {
  const { createHash } = await import('node:crypto');
  const content = Buffer.from('synthetic-pdf-fixture');
  const digest = createHash('sha256').update(content).digest('hex');
  const missing = makeRepository(
    {
      'release/cv-import.json': JSON.stringify({ artifact: { path: 'site/assets/cv/marcus-uden-cv.pdf', sha256: digest, privacyReview: 'approved' } })
    },
    {},
    ['site/assets/cv/marcus-uden-cv.pdf']
  );
  assert.ok(validateRepository(missing).errors.some((error) => error.category === 'cv-import' && error.file === 'site/assets/cv/marcus-uden-cv.pdf'));

  const stale = makeRepository(
    {
      'release/cv-import.json': JSON.stringify({ artifact: { path: 'site/assets/cv/marcus-uden-cv.pdf', sha256: '0'.repeat(64), privacyReview: 'approved' } }),
      'site/assets/cv/marcus-uden-cv.pdf': content
    },
    {
      reviewStatus: 'complete',
      candidateCommit: 'test-candidate',
      reviewedFiles: [{ path: 'site/assets/cv/marcus-uden-cv.pdf', sha256: digest, decision: 'approved' }]
    }
  );
  assert.ok(validateRepository(stale).errors.some((error) => error.category === 'cv-import' && error.file === 'site/assets/cv/marcus-uden-cv.pdf'));
});

test('rejects broken and root-relative internal links', () => {
  const broken = makeRepository({ 'site/index.html': '<a href="missing/">Missing</a>' });
  const rooted = makeRepository({ 'site/index.html': '<a href="/proof/">Rooted</a>' });
  assert.ok(validateRepository(broken).errors.some((error) => error.category === 'broken-link'));
  assert.ok(validateRepository(rooted).errors.some((error) => error.category === 'broken-link'));
});
