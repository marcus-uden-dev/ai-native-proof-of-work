import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { main } from '../../scripts/technology-catalog.mjs';
import { findSecrets, validateCatalog } from '../../scripts/technology-catalog/catalog.mjs';
import { catalogStatus, distribute } from '../../scripts/technology-catalog/distribute.mjs';
import {
  assertPrivateRoot, initPrivateRoot, PRIVATE_ROOT_ENV, resolvePrivateRoot, validateRegistry
} from '../../scripts/technology-catalog/private-root.mjs';
import { renderCatalog } from '../../scripts/technology-catalog/render.mjs';
import {
  extractJsImports, extractPythonImports, maxStateFor, stableStringify, sweepCheckout
} from '../../scripts/technology-catalog/sweep.mjs';
import { fixtureCatalog } from './fixtures/technology-catalog/fixture-catalog.mjs';
import { makeFixtureRepo, sh } from './fixtures/technology-catalog/fixture-repo.mjs';

const fixtureDirectory = fileURLToPath(new URL('./fixtures/technology-catalog/', import.meta.url));

function tempDirectory() {
  return mkdtempSync(join(tmpdir(), 'tech-catalog-work-'));
}

function sweepOf(root) {
  return sweepCheckout({ checkoutPath: root, repoId: 'fixture' });
}

function packageOf(sweep, key) {
  return sweep.packages.find((record) => record.key === key);
}

function codes(errors) {
  return errors.map((error) => error.code);
}

// U1: private root, registry, hygiene

test('resolves the owning checkout from a linked worktree (AE6)', () => {
  const main = makeFixtureRepo();
  const worktree = join(tempDirectory(), 'linked');
  sh(main, ['worktree', 'add', '--quiet', '-b', 'linked-branch', worktree]);
  const location = resolvePrivateRoot({ cwd: worktree, env: {} });
  assert.equal(location.root.replaceAll('\\', '/').endsWith('/internal/technology-catalog'), true);
  assert.equal(realpathSync(location.ownerCheckout), realpathSync(main));
});

test('accepts an absolute override outside the repo and rejects a relative one', () => {
  const outside = tempDirectory();
  const location = resolvePrivateRoot({ cwd: tempDirectory(), env: { [PRIVATE_ROOT_ENV]: outside } });
  assert.equal(assertPrivateRoot(location).root, outside);
  assert.throws(() => resolvePrivateRoot({ cwd: tempDirectory(), env: { [PRIVATE_ROOT_ENV]: 'relative/path' } }), /absolute/);
});

test('rejects a root that git does not ignore, and init fixes it without a tracked change', () => {
  const root = makeFixtureRepo();
  const location = resolvePrivateRoot({ cwd: root, env: {} });
  assert.throws(() => assertPrivateRoot(location), /not ignored/);
  initPrivateRoot(location);
  assert.doesNotThrow(() => assertPrivateRoot(location));
  assert.equal(existsSync(location.root), true);
  assert.equal(sh(root, ['status', '--porcelain']).trim(), '');
});

test('rejects registry entries with a missing checkout, a non-git folder, an escaping target, or a duplicate ID', () => {
  const repo = makeFixtureRepo();
  const plain = tempDirectory();
  const good = { id: 'one', displayName: 'One', checkoutPath: repo, targetPath: 'docs/CATALOG.md' };
  const messages = (repos) => validateRegistry({ schemaVersion: 1, repos }).map((error) => `${error.repo}: ${error.message}`).join('\n');
  assert.equal(messages([good]), '');
  assert.match(messages([{ ...good, id: 'gone', checkoutPath: join(plain, 'missing') }]), /gone: .*does not exist/);
  assert.match(messages([{ ...good, id: 'plain', checkoutPath: plain }]), /plain: .*not a git repository/);
  assert.match(messages([{ ...good, id: 'escape', targetPath: '../outside.md' }]), /escape: .*escapes the checkout/);
  assert.match(messages([{ ...good, id: 'abs', targetPath: join(plain, 'x.md') }]), /abs: .*repo-relative/);
  assert.match(messages([good, good]), /one: .*duplicated/);
});

// U2: sweep

test('sweeps manifests at any depth and records consumers by class and kind (AE1, AE3)', () => {
  const sweep = sweepOf(makeFixtureRepo());
  assert.deepEqual(packageOf(sweep, 'python:unusedlib').consumers, []);
  assert.deepEqual(packageOf(sweep, 'node:lodash').consumers, []);
  const redis = packageOf(sweep, 'python:redis').consumers;
  assert.deepEqual(redis.map((consumer) => consumer.class).sort(), ['app', 'dev-tooling', 'test']);
  const uvicorn = packageOf(sweep, 'python:uvicorn').consumers;
  assert.equal(uvicorn.every((consumer) => consumer.kind === 'runtime-command' && consumer.class === 'app'), true);
  assert.deepEqual(uvicorn.map((consumer) => consumer.path).sort(), ['backend/Dockerfile', 'docker-compose.yml']);
});

test('records compose services, workflow steps, and migration files as consumers', () => {
  const sweep = sweepOf(makeFixtureRepo());
  assert.equal(packageOf(sweep, 'image:postgres').consumers[0].kind, 'compose-service');
  assert.equal(packageOf(sweep, 'workflow-action:actions/checkout').consumers[0].kind, 'workflow-step');
  assert.equal(packageOf(sweep, 'python:alembic').consumers[0].kind, 'migration-file');
  assert.ok(sweep.infra.some((item) => item.id === 'infra:migration-file:backend/alembic/versions' && item.count === 1));
});

test('records a driver named only in a connection URL as a string reference', () => {
  const asyncpg = packageOf(sweepOf(makeFixtureRepo()), 'python:asyncpg');
  assert.deepEqual(asyncpg.consumers.map((consumer) => consumer.kind), ['string-ref']);
  assert.equal(maxStateFor(asyncpg.consumers), 'configured');
});

test('ignores comments, strings, type-only imports, mock targets, and shadowing local modules', () => {
  const sweep = sweepOf(makeFixtureRepo());
  assert.deepEqual(packageOf(sweep, 'python:unusedlib').consumers, []);
  assert.deepEqual(packageOf(sweep, 'python:typedlib').consumers, []);
  assert.deepEqual(packageOf(sweep, 'python:cryptography').consumers, []);
  assert.equal(packageOf(sweep, 'python:asyncpg').consumers.some((consumer) => consumer.kind === 'import'), false);
  assert.deepEqual(extractPythonImports('# import a\nimport b, c as d\nfrom e.f import g\nfrom .h import i\n'), [
    { module: 'b', typeOnly: false }, { module: 'c', typeOnly: false }, { module: 'e.f', typeOnly: false }
  ]);
  assert.deepEqual(
    extractJsImports("import type { A } from 'a';\nimport b from 'b';\n// import c from 'c'\nconst d = require('d');\nexport * from 'e';\nawait import('f');"),
    ['b', 'f', 'e', 'd']
  );
});

test('leaves packages without any consumer on the needs-verification list instead of defaulting them', () => {
  const sweep = sweepOf(makeFixtureRepo());
  for (const key of ['python:unusedlib', 'python:typedlib', 'python:cryptography', 'node:lodash', 'node:@types/node']) {
    assert.ok(sweep.needsVerification.includes(key), key);
  }
  assert.equal(sweep.needsVerification.includes('python:asyncpg'), false);
  assert.deepEqual(packageOf(sweep, 'node:@types/node').hints, ['type-definitions']);
});

test('records environment key names without values', () => {
  const sweep = sweepOf(makeFixtureRepo());
  assert.deepEqual(sweep.envKeys.map((key) => key.name), ['DATABASE_URL', 'NEXT_PUBLIC_API_URL', 'SECRET_KEY']);
  assert.equal(JSON.stringify(sweep).includes('user:pw'), false);
});

test('ignores untracked files and vendor trees, and refuses a dirty tracked tree', () => {
  const root = makeFixtureRepo({ 'node_modules/leftpad/index.js': "import 'redis';\n" });
  writeFileSync(join(root, 'backend', 'untracked.py'), 'import fastapi\nimport unusedlib\n');
  const sweep = sweepOf(root);
  assert.equal(packageOf(sweep, 'python:unusedlib').consumers.length, 0);
  assert.equal(sweep.files.some((path) => path.startsWith('node_modules/')), false);
  assert.equal(typeof sweep.branch, 'string');
  writeFileSync(join(root, 'backend', 'app', 'main.py'), 'import fastapi\n');
  assert.throws(() => sweepOf(root), /uncommitted changes/);
});

test('produces the same fingerprint for the same facts and a different one when facts change', () => {
  const first = sweepOf(makeFixtureRepo());
  const second = sweepOf(makeFixtureRepo());
  assert.equal(first.fingerprint, second.fingerprint);
  assert.match(first.fingerprint, /^[0-9a-f]{64}$/);
  const changed = sweepOf(makeFixtureRepo({ 'backend/app/extra.py': 'import unusedlib\n' }));
  assert.notEqual(first.fingerprint, changed.fingerprint);
  assert.equal(stableStringify({ b: 1, a: [2, { d: 1, c: 2 }] }), '{"a":[2,{"c":2,"d":1}],"b":1}');
});

// U3: validator

test('accepts the fixture catalog', () => {
  assert.deepEqual(validateCatalog(fixtureCatalog(), sweepOf(makeFixtureRepo())), []);
});

test('rejects implemented on a manifest-only package and names the allowed maximum (AE1)', () => {
  const catalog = fixtureCatalog();
  catalog.entries.push({ ...catalog.entries.find((e) => e.id === 'data.asyncpg'), id: 'data.asyncpg-claim', evidenceState: 'implemented' });
  const errors = validateCatalog(catalog, sweepOf(makeFixtureRepo()));
  assert.deepEqual(codes(errors), ['state-claim']);
  assert.match(errors[0].message, /allows at most configured/);
  assert.equal(errors[0].entry, 'data.asyncpg-claim');
});

test('accepts tested with an app and a test consumer, and rejects it without a test consumer (AE2)', () => {
  const sweep = sweepOf(makeFixtureRepo());
  assert.deepEqual(validateCatalog(fixtureCatalog(), sweep), []);
  const catalog = fixtureCatalog();
  catalog.entries.find((e) => e.id === 'backend.fastapi').evidenceState = 'tested';
  const errors = validateCatalog(catalog, sweep);
  assert.deepEqual(codes(errors), ['state-claim']);
  assert.match(errors[0].message, /at most implemented/);
});

test('caps a package with only test and dev-tooling consumers at dev-test-only, and infrastructure can reach implemented', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const catalog = fixtureCatalog();
  catalog.entries.find((e) => e.id === 'testing.pytest').evidenceState = 'implemented';
  assert.deepEqual(codes(validateCatalog(catalog, sweep)), ['state-claim']);
  const nginx = fixtureCatalog();
  nginx.entries.find((e) => e.id === 'delivery.nginx').evidenceState = 'implemented';
  assert.deepEqual(codes(validateCatalog(nginx, sweep)), ['state-claim']);
  assert.equal(maxStateFor([{ path: 'a', class: 'config', kind: 'compose-service' }]), 'implemented');
  assert.equal(maxStateFor([{ path: 'a', class: 'config', kind: 'string-ref' }]), 'configured');
});

test('rejects duplicate IDs, unknown capabilities, unknown candidates, and invalid states', () => {
  const catalog = fixtureCatalog();
  catalog.capabilities.push({ id: 'backend.api-design', label: 'Again' });
  catalog.entries.push({ ...catalog.entries[0] });
  catalog.entries[1].capabilityIds = ['nope.nothing'];
  catalog.entries[2].candidates = [...catalog.entries[2].candidates, 'pkg:python:missing'];
  catalog.entries[3].evidenceState = 'verified';
  assert.deepEqual(codes(validateCatalog(catalog, sweepOf(makeFixtureRepo()))).sort(), [
    'duplicate-capability', 'duplicate-entry', 'state', 'unknown-candidate', 'unknown-capability'
  ]);
});

test('rejects evidence paths that are untracked, absolute, or match no file', () => {
  const catalog = fixtureCatalog();
  catalog.entries[1].evidence = [{ path: 'backend/nomatch/*.py', description: 'x' }];
  catalog.entries[4].evidence = [{ path: 'backend/untracked.py', description: 'x' }];
  catalog.entries[6].evidence = [{ path: '/etc/passwd', description: 'x' }];
  const errors = validateCatalog(catalog, sweepOf(makeFixtureRepo()));
  assert.deepEqual(codes(errors), ['evidence-path', 'evidence-path', 'evidence-path']);
});

test('requires documented rationale to resolve to a tracked file, and accepts undocumented', () => {
  const catalog = fixtureCatalog();
  const redis = catalog.entries.find((e) => e.id === 'async.redis');
  redis.decisionRefs = ['docs/decisions/missing.md'];
  assert.deepEqual(codes(validateCatalog(catalog, sweepOf(makeFixtureRepo()))), ['decision-ref']);
  redis.rationale = 'undocumented';
  redis.decisionRefs = [];
  assert.deepEqual(validateCatalog(catalog, sweepOf(makeFixtureRepo())), []);
});

test('accepts planned and historical entries only with document evidence and no production consumer', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const base = { id: 'plan.queue', name: 'Queue', kind: 'queue', domain: 'async', purpose: 'Planned work queue.', problemSolved: 'Background jobs.', architectureRole: 'Queue', technologies: [], capabilityIds: [], candidates: [], decisionRefs: [], rationale: 'undocumented' };
  const good = fixtureCatalog();
  good.entries.push({ ...base, evidenceState: 'planned', evidence: [{ path: 'docs/decisions/0001-hosting.md', description: 'Plan' }] });
  assert.deepEqual(validateCatalog(good, sweep), []);
  const noDoc = fixtureCatalog();
  noDoc.entries.push({ ...base, evidenceState: 'historical', evidence: [{ path: 'backend/app/main.py', description: 'Code' }] });
  assert.deepEqual(codes(validateCatalog(noDoc, sweep)), ['state-evidence']);
  const implemented = fixtureCatalog();
  implemented.entries.push({ ...base, evidenceState: 'planned', candidates: ['pkg:python:fastapi'], evidence: [{ path: 'docs/decisions/0001-hosting.md', description: 'Plan' }] });
  assert.deepEqual(codes(validateCatalog(implemented, sweep)), ['state-claim']);
});

test('requires a disposition or entry for every candidate and blocks on needs-verification', () => {
  const catalog = fixtureCatalog();
  catalog.dispositions = catalog.dispositions.filter((rule) => !['pkg:node:lodash', 'pkg:python:typedlib'].includes(rule.match));
  catalog.dispositions.push({ match: 'pkg:python:unusedlib', disposition: 'unused', reason: 'duplicate rule is allowed' });
  const errors = validateCatalog(catalog, sweepOf(makeFixtureRepo()));
  assert.deepEqual(errors.map((error) => `${error.code}:${error.entry}`).sort(), [
    'needs-verification:pkg:node:lodash', 'needs-verification:pkg:python:typedlib'
  ]);
});

test('accepts only the three dispositions, each with a reason, and flags a rule that matches nothing', () => {
  const catalog = fixtureCatalog();
  catalog.dispositions[1].disposition = 'needs-verification';
  catalog.dispositions[2].reason = '';
  catalog.dispositions.push({ match: 'pkg:python:ghost', disposition: 'unused', reason: 'x' });
  const errors = validateCatalog(catalog, sweepOf(makeFixtureRepo()));
  assert.ok(errors.some((error) => error.code === 'disposition' && /needs-verification is not a disposition/.test(error.message)));
  assert.ok(errors.some((error) => error.code === 'disposition' && /needs a reason/.test(error.message)));
  assert.ok(errors.some((error) => error.code === 'disposition' && /matches no sweep candidate/.test(error.message)));
});

test('allows a curator override only with a recorded reason', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const catalog = fixtureCatalog();
  const asyncpg = catalog.entries.find((e) => e.id === 'data.asyncpg');
  asyncpg.evidenceState = 'implemented';
  asyncpg.override = { maxState: 'implemented', reason: '' };
  assert.deepEqual(codes(validateCatalog(catalog, sweep)).sort(), ['override-reason', 'state-claim']);
  asyncpg.override.reason = 'The driver is selected by the connection URL scheme.';
  assert.deepEqual(validateCatalog(catalog, sweep), []);
});

test('rejects adoption and outcome claims and credential-shaped or internal-host text in curated fields', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const claim = fixtureCatalog();
  claim.entries[1].purpose = 'Serves many customers in production.';
  assert.deepEqual(codes(validateCatalog(claim, sweep)), ['claim']);
  const live = fixtureCatalog();
  live.entries[1].problemSolved = 'The product is live.';
  assert.deepEqual(codes(validateCatalog(live, sweep)), ['claim']);
  const secret = fixtureCatalog();
  secret.entries[1].purpose = `Token ${'ghp_'}${'a'.repeat(30)} is configured.`;
  assert.deepEqual(codes(validateCatalog(secret, sweep)), ['secret']);
  const host = fixtureCatalog();
  host.entries[1].architectureRole = 'Talks to db.corp over the network.';
  assert.deepEqual(codes(validateCatalog(host, sweep)), ['secret']);
  assert.deepEqual(findSecrets('plain text about a database'), []);
});

test('lets a technology map to several capabilities and a capability to several technologies', () => {
  const catalog = fixtureCatalog();
  catalog.entries.find((e) => e.id === 'backend.fastapi').capabilityIds = ['backend.api-design', 'delivery.ci'];
  assert.deepEqual(validateCatalog(catalog, sweepOf(makeFixtureRepo())), []);
  const owners = catalog.entries.filter((e) => e.capabilityIds.includes('delivery.ci'));
  assert.ok(owners.length > 1);
});

// U4: renderer

function renderFixture() {
  const sweep = sweepOf(makeFixtureRepo());
  return { sweep, text: renderCatalog({ catalog: fixtureCatalog(), sweep, displayName: 'Fixture Service' }) };
}

test('renders byte-identically twice and independent of entry order', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const catalog = fixtureCatalog();
  const first = renderCatalog({ catalog, sweep, displayName: 'Fixture Service' });
  const shuffled = { ...catalog, entries: catalog.entries.slice().reverse(), capabilities: catalog.capabilities.slice().reverse() };
  assert.equal(renderCatalog({ catalog: shuffled, sweep, displayName: 'Fixture Service' }), first);
  assert.equal(renderCatalog({ catalog, sweep, displayName: 'Fixture Service' }), first);
});

test('lists every entry once in its domain section and once in the technology index', () => {
  const { text } = renderFixture();
  for (const entry of fixtureCatalog().entries) {
    assert.equal(text.split('\n').filter((line) => line === `### ${entry.name}`).length, 1, entry.name);
    assert.equal(text.split('\n').filter((line) => line.startsWith(`| ${entry.name} |`)).length, 1, entry.name);
  }
});

test('states provenance, the generated-file notice, and the source-evidence disclaimer', () => {
  const { sweep, text } = renderFixture();
  assert.match(text, /^<!-- GENERATED FILE\. Do not edit by hand\./);
  assert.ok(text.includes(`Swept commit: \`${sweep.commit}\``));
  assert.ok(text.includes(`Sweep fingerprint: \`${sweep.fingerprint}\``));
  assert.match(text, /makes no claim about adoption, users, or outcomes/);
  assert.match(text, /## Capability index/);
  assert.match(text, /Rationale: documented in `docs\/decisions\/0001-hosting\.md`/);
});

test('matches the stored expected render', () => {
  const { sweep, text } = renderFixture();
  const expected = readFileSync(join(fixtureDirectory, 'expected-render.md'), 'utf8')
    .replaceAll('{{COMMIT}}', sweep.commit)
    .replaceAll('{{BRANCH}}', sweep.branch);
  assert.equal(text, expected);
});

// U5: distribute, status, CLI

function draftIn(directory, content = 'GENERATED CATALOG\n') {
  const draftPath = join(directory, 'draft.md');
  writeFileSync(draftPath, content);
  return draftPath;
}

test('distribute writes one file, creates missing folders, and does not stage or commit', () => {
  const root = makeFixtureRepo();
  const repo = { id: 'fixture', checkoutPath: root, targetPath: 'docs/architecture/CATALOG.md' };
  const before = sh(root, ['rev-parse', 'HEAD']);
  const result = distribute({ repo, draftPath: draftIn(tempDirectory()) });
  assert.equal(result.action, 'written');
  assert.equal(readFileSync(join(root, 'docs', 'architecture', 'CATALOG.md'), 'utf8'), 'GENERATED CATALOG\n');
  assert.equal(sh(root, ['rev-parse', 'HEAD']), before);
  assert.equal(sh(root, ['diff', '--cached', '--name-only']).trim(), '');
  assert.match(sh(root, ['status', '--porcelain']), /\?\? docs\/architecture\//);
});

test('distribute is a no-op when the target already equals the draft, even before it is committed', () => {
  const root = makeFixtureRepo();
  const repo = { id: 'fixture', checkoutPath: root, targetPath: 'CATALOG.md' };
  const draftPath = draftIn(tempDirectory());
  assert.equal(distribute({ repo, draftPath }).action, 'written');
  assert.equal(distribute({ repo, draftPath }).action, 'unchanged');
});

test('distribute refuses a target with uncommitted changes and leaves it untouched (AE4)', () => {
  const root = makeFixtureRepo({ 'CATALOG.md': 'committed\n' });
  writeFileSync(join(root, 'CATALOG.md'), 'edited by hand\n');
  const repo = { id: 'fixture', checkoutPath: root, targetPath: 'CATALOG.md' };
  assert.throws(() => distribute({ repo, draftPath: draftIn(tempDirectory()) }), /uncommitted changes/);
  assert.equal(readFileSync(join(root, 'CATALOG.md'), 'utf8'), 'edited by hand\n');
});

test('distribute refuses an escaping path, a missing draft, a non-git checkout, and a credential-shaped draft', () => {
  const root = makeFixtureRepo();
  const draftPath = draftIn(tempDirectory());
  assert.throws(() => distribute({ repo: { id: 'x', checkoutPath: root, targetPath: '../outside.md' }, draftPath }), /escapes the checkout/);
  assert.throws(() => distribute({ repo: { id: 'x', checkoutPath: root, targetPath: 'a.md' }, draftPath: join(tempDirectory(), 'none.md') }), /No rendered draft/);
  assert.throws(() => distribute({ repo: { id: 'x', checkoutPath: tempDirectory(), targetPath: 'a.md' }, draftPath }), /not a git repository/);
  const leaky = draftIn(tempDirectory(), `key ${'sk-'}${'a'.repeat(30)}\n`);
  assert.throws(() => distribute({ repo: { id: 'x', checkoutPath: root, targetPath: 'a.md' }, draftPath: leaky }), /credential-shaped/);
  assert.equal(existsSync(join(root, 'a.md')), false);
});

test('status reports current, stale with the changed files, and unrelated commits as not stale (AE5)', () => {
  const root = makeFixtureRepo();
  const sweep = sweepOf(root);
  const repo = { id: 'fixture', checkoutPath: root, targetPath: 'CATALOG.md' };
  assert.equal(catalogStatus({ repo, sweep }).stale, false);
  writeFileSync(join(root, 'README.md'), '# notes\n');
  sh(root, ['add', '-A']);
  sh(root, ['commit', '--quiet', '-m', 'docs']);
  const unrelated = catalogStatus({ repo, sweep });
  assert.equal(unrelated.stale, false);
  assert.deepEqual(unrelated.changed, []);
  writeFileSync(join(root, 'backend', 'requirements.txt'), 'fastapi==0.2.0\n');
  sh(root, ['add', '-A']);
  sh(root, ['commit', '--quiet', '-m', 'deps']);
  const stale = catalogStatus({ repo, sweep });
  assert.equal(stale.stale, true);
  assert.deepEqual(stale.changed, ['backend/requirements.txt']);
});

test('runs the full flow through the CLI and keeps private data out of the checkout tree', () => {
  const product = makeFixtureRepo();
  const privateRoot = tempDirectory();
  const env = { [PRIVATE_ROOT_ENV]: privateRoot };
  const output = [];
  const errors = [];
  const run = (...args) => main(args, { cwd: product, env, out: (line) => output.push(line), err: (line) => errors.push(line) });

  writeFileSync(join(privateRoot, 'repos.json'), JSON.stringify({
    schemaVersion: 1,
    repos: [{ id: 'fixture', displayName: 'Fixture Service', checkoutPath: product, targetPath: 'docs/CATALOG.md' }]
  }));
  assert.equal(run('sweep', 'fixture'), 0);
  assert.equal(run('validate', 'fixture'), 1, 'validation fails before a catalog exists');
  mkdirSync(join(privateRoot, 'fixture'), { recursive: true });
  writeFileSync(join(privateRoot, 'fixture', 'catalog.json'), JSON.stringify(fixtureCatalog()));
  assert.equal(run('distribute', 'fixture'), 1, 'distribute needs a rendered draft');
  assert.equal(run('validate', 'fixture'), 0);
  assert.equal(run('render', 'fixture'), 0);
  assert.equal(run('distribute', 'fixture'), 0);
  assert.equal(run('status', 'fixture', '--check'), 0);
  assert.equal(readFileSync(join(product, 'docs', 'CATALOG.md'), 'utf8'), readFileSync(join(privateRoot, 'fixture', 'TECHNOLOGY_CAPABILITY_CATALOG.md'), 'utf8'));
  assert.equal(sh(product, ['status', '--porcelain']).trim(), '?? docs/CATALOG.md');
  assert.equal(errors.some((line) => /Cannot/.test(line)), false);
  assert.equal(run('bogus', 'fixture'), 1);
});
