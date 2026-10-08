import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { main } from '../../scripts/technology-catalog.mjs';
import { findSecrets, matchesFile, validateCatalog } from '../../scripts/technology-catalog/catalog.mjs';
import { catalogStatus, distribute } from '../../scripts/technology-catalog/distribute.mjs';
import {
  assertPrivateRoot, initPrivateRoot, PRIVATE_ROOT_ENV, resolvePrivateRoot, validateRegistry
} from '../../scripts/technology-catalog/private-root.mjs';
import { renderCatalog } from '../../scripts/technology-catalog/render.mjs';
import {
  changedRelevantFiles, classifyFile, commandHeads, extractJsImports, extractPythonImports, maxStateFor, stableStringify,
  sweepCheckout
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
  assert.equal(maxStateFor([{ path: 'a', class: 'app', kind: 'compose-service' }]), 'implemented');
  assert.equal(maxStateFor([{ path: 'a', class: 'dev-tooling', kind: 'compose-service' }]), 'dev-test-only');
  assert.equal(maxStateFor([{ path: 'a', class: 'config', kind: 'workflow-step' }]), 'implemented');
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
  assert.equal(run('validate', 'fixture'), 0);
  assert.equal(run('render', 'fixture'), 0);
  assert.equal(run('distribute', 'fixture'), 0);
  assert.equal(run('status', 'fixture', '--check'), 0);
  assert.equal(readFileSync(join(product, 'docs', 'CATALOG.md'), 'utf8'), readFileSync(join(privateRoot, 'fixture', 'TECHNOLOGY_CAPABILITY_CATALOG.md'), 'utf8'));
  assert.equal(sh(product, ['status', '--porcelain']).trim(), '?? docs/CATALOG.md');
  assert.equal(run('bogus', 'fixture'), 1);
  assert.match(errors.at(-1), /Unknown command/);
});

function cliFixture() {
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
  mkdirSync(join(privateRoot, 'fixture'), { recursive: true });
  const catalogPath = join(privateRoot, 'fixture', 'catalog.json');
  writeFileSync(catalogPath, JSON.stringify(fixtureCatalog()));
  return { product, privateRoot, output, errors, run, catalogPath };
}

test('render and distribute refuse an invalid catalog and write nothing', () => {
  const { product, errors, run, catalogPath } = cliFixture();
  assert.equal(run('sweep', 'fixture'), 0);
  const catalog = fixtureCatalog();
  catalog.entries[1].evidenceState = 'tested';
  writeFileSync(catalogPath, JSON.stringify(catalog));
  assert.equal(run('render', 'fixture'), 1);
  assert.equal(run('distribute', 'fixture'), 1);
  assert.ok(errors.some((line) => /Cannot render/.test(line)));
  assert.ok(errors.some((line) => /Cannot distribute/.test(line)));
  assert.equal(existsSync(join(product, 'docs', 'CATALOG.md')), false);
});

test('distribute renders fresh from the validated catalog instead of shipping an old draft', () => {
  const { product, run, catalogPath } = cliFixture();
  assert.equal(run('sweep', 'fixture'), 0);
  assert.equal(run('render', 'fixture'), 0);
  assert.equal(run('distribute', 'fixture'), 0);
  sh(product, ['add', 'docs/CATALOG.md']);
  sh(product, ['commit', '--quiet', '-m', 'catalog']);
  const catalog = fixtureCatalog();
  catalog.entries[1].purpose = 'Changed purpose after the last render.';
  writeFileSync(catalogPath, JSON.stringify(catalog));
  assert.equal(run('distribute', 'fixture'), 0);
  assert.match(readFileSync(join(product, 'docs', 'CATALOG.md'), 'utf8'), /Changed purpose after the last render\./);
});

test('distribute refuses a stale sweep unless told otherwise, and status --check exits 1 when stale', () => {
  const { product, errors, run } = cliFixture();
  assert.equal(run('sweep', 'fixture'), 0);
  writeFileSync(join(product, 'backend', 'requirements.txt'), 'fastapi==0.2.0\n');
  sh(product, ['add', '-A']);
  sh(product, ['commit', '--quiet', '-m', 'deps']);
  assert.equal(run('status', 'fixture'), 0);
  assert.equal(run('status', 'fixture', '--check'), 1);
  assert.equal(run('distribute', 'fixture'), 1);
  assert.match(errors.at(-1), /sweep is stale/);
  assert.equal(existsSync(join(product, 'docs', 'CATALOG.md')), false);
  assert.equal(run('distribute', 'fixture', '--allow-stale'), 0);
  assert.equal(existsSync(join(product, 'docs', 'CATALOG.md')), true);
});

// Review hardening

test('parses pyproject dependency tables and ignores unrelated arrays', () => {
  const root = makeFixtureRepo({
    'svc/pyproject.toml': [
      '[project]', 'name = "svc"', 'dependencies = [', '  "requests>=2",', '  "rich",', ']', '',
      '[project.optional-dependencies]', 'dev = ["black>=24"]', '',
      '[dependency-groups]', 'test = ["pytest-cov"]', '',
      '[tool.poetry.dependencies]', 'python = "^3.12"', 'flask = "^3"', '',
      '[tool.other]', 'items = ["notapackage"]', ''
    ].join('\n')
  });
  const keys = sweepOf(root).packages.map((record) => record.key);
  for (const expected of ['python:requests', 'python:rich', 'python:black', 'python:pytest-cov', 'python:flask']) {
    assert.ok(keys.includes(expected), expected);
  }
  assert.equal(keys.includes('python:python'), false);
  assert.equal(keys.includes('python:notapackage'), false);
});

test('parses compose, workflow, and Dockerfile shapes beyond the simplest', () => {
  const root = makeFixtureRepo({
    'worker/requirements.txt': 'celery==5.0\n',
    'docker-compose.prod.yml': [
      'services:', '  web:', '    image: nginx:1', '# a comment at column zero', '  worker:', '    image: busybox',
      '    command:', '      - celery', '      - worker', ''
    ].join('\n'),
    'docker-compose.dev.yml': 'services:\n  mail:\n    image: mailhog/mailhog:1\n',
    '.github/workflows/lint.yml': [
      'jobs:', '  lint:', '    steps:', '      - uses: ./local-action', '      - uses: actions/setup-node@v4',
      '      - run: |', '          npm ci', '          npx vitest run', ''
    ].join('\n'),
    'tools/Dockerfile.dev': 'FROM scratch\nFROM node:22 AS build\nRUN \\\n  npm ci\n'
  });
  const sweep = sweepOf(root);
  assert.ok(packageOf(sweep, 'image:nginx'));
  assert.ok(packageOf(sweep, 'image:busybox'), 'a service after a column-zero comment is kept');
  assert.ok(packageOf(sweep, 'python:celery').consumers.some((c) => c.kind === 'runtime-command' && c.path === 'docker-compose.prod.yml' && c.class === 'app'));
  assert.deepEqual(packageOf(sweep, 'image:mailhog/mailhog').consumers.map((c) => c.class), ['dev-tooling']);
  assert.equal(maxStateFor(packageOf(sweep, 'image:mailhog/mailhog').consumers), 'dev-test-only');
  assert.equal(packageOf(sweep, 'workflow-action:./local-action'), undefined);
  assert.ok(packageOf(sweep, 'workflow-action:actions/setup-node'));
  assert.ok(packageOf(sweep, 'node:vitest').consumers.some((c) => c.path === '.github/workflows/lint.yml' && c.kind === 'runtime-command'));
  assert.equal(packageOf(sweep, 'image:scratch'), undefined);
  assert.equal(packageOf(sweep, 'image:node').consumers[0].class, 'dev-tooling');
});

test('only the program a command starts counts as a runtime consumer', () => {
  assert.deepEqual([...commandHeads('["uvicorn", "app.main:app"]')], ['uvicorn']);
  assert.deepEqual([...commandHeads('python -m pytest -q && pip install fastapi')].sort(), ['pip', 'pytest']);
  assert.deepEqual([...commandHeads('FOO=1 npx vitest run; echo fastapi')].sort(), ['echo', 'vitest']);
  const root = makeFixtureRepo({ 'ops/Dockerfile': 'FROM python:3.12\nRUN echo fastapi redis\nCMD ["uvicorn", "app.main:app"]\n' });
  const redis = packageOf(sweepOf(root), 'python:redis').consumers;
  assert.equal(redis.some((consumer) => consumer.path === 'ops/Dockerfile'), false);
});

test('import extraction ignores strings, templates, regex literals, block comments, and type-only statements', () => {
  const source = [
    "import a from 'a';",
    'const s = "import x from \'y\'";',
    "// import c from 'c'",
    "/* import blockcomment from 'block' */",
    "const r = /import z from 'q'/;",
    'const t = `import w from "tpl"`;',
    "const u = 'http://host'; const d = require('d');",
    "await import('f');",
    "export * from 'e'",
    "import type { T } from 'tt'",
    'export type X = { a: 1 }',
    "import b from 'b'",
    'import {', ' a,', " b } from '@s/pkg/deep'",
    "import 'side'",
    "export { q } from 'qq'",
    "export type { Q } from 'qt'"
  ].join('\n');
  assert.deepEqual(extractJsImports(source).sort(), ['@s/pkg/deep', 'a', 'b', 'd', 'e', 'f', 'qq', 'side'].sort());
});

test('hostile file contents are scanned in linear time and very long lines are reported as unparsed', () => {
  const start = Date.now();
  for (const source of ['import '.repeat(40000), 'export { '.repeat(40000), 'import \n'.repeat(40000), ' '.repeat(300000)]) extractJsImports(source);
  const root = makeFixtureRepo({
    'backend/requirements-long.txt': `longpackage${' '.repeat(200000)}#comment\n`,
    'frontend/app/minified.js': `${'x'.repeat(30000)};import n from 'next'\n`
  });
  const sweep = sweepOf(root);
  assert.ok(Date.now() - start < 30000, 'finishes quickly');
  assert.deepEqual(sweep.unparsedFiles, ['frontend/app/minified.js']);
  assert.ok(packageOf(sweep, 'python:longpackage'));
});

test('classifies mocks, stories, setup files, and examples away from application code', () => {
  assert.equal(classifyFile('src/__mocks__/api.ts'), 'test');
  assert.equal(classifyFile('src/setupTests.ts'), 'test');
  assert.equal(classifyFile('src/lib/user.fixture.ts'), 'test');
  assert.equal(classifyFile('src/components/Button.stories.tsx'), 'dev-tooling');
  assert.equal(classifyFile('examples/demo/app.py'), 'dev-tooling');
  assert.equal(classifyFile('src/app/main.py'), 'app');
});

test('the stale check recognizes every file type the sweep reads', () => {
  const relevant = ['Dockerfile', 'svc/app.dockerfile', 'docker-compose.prod.yml', '.github/workflows/ci.yml', 'requirements/base.txt',
    'backend/pyproject.toml', 'nginx/nginx.conf', 'otel-collector-config.yaml', 'chrome/manifest.json', 'alembic/versions/0001.py',
    'supabase/migrations/001.sql', 'backend/.env.example', 'src/a.ts', 'package-lock.json'];
  assert.deepEqual(changedRelevantFiles(relevant), relevant);
  assert.deepEqual(changedRelevantFiles(['README.md', 'docs/notes.md', 'image.png']), []);
});

test('glob matching treats * as one path segment and ** as many', () => {
  assert.equal(matchesFile(['backend/a.py'], 'backend/*.py'), true);
  assert.equal(matchesFile(['backend/sub/b.py'], 'backend/*.py'), false);
  assert.equal(matchesFile(['backend/sub/b.py'], 'backend/**/*.py'), true);
  assert.equal(matchesFile(['aXbc.py'], 'a.b*.py'), false);
  assert.equal(matchesFile(['a.bc.py'], 'a.b*.py'), true);
  assert.equal(matchesFile(['a+b.py'], 'a+b*.py'), true);
});

test('status reports a checkout whose HEAD no longer contains the swept commit as stale', () => {
  const root = makeFixtureRepo();
  writeFileSync(join(root, 'extra.py'), 'import redis\n');
  sh(root, ['add', '-A']);
  sh(root, ['commit', '--quiet', '-m', 'extra']);
  const sweep = sweepOf(root);
  sh(root, ['reset', '--quiet', '--hard', 'HEAD~1']);
  const status = catalogStatus({ repo: { id: 'x', checkoutPath: root, targetPath: 'a.md' }, sweep });
  assert.equal(status.stale, true);
  assert.deepEqual(status.changed, []);
  assert.match(status.reason, /does not contain the swept commit/);
});

test('overrides must name a real state, can lower the ceiling, and never use prototype keys', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const bogus = fixtureCatalog();
  bogus.entries.find((e) => e.id === 'data.asyncpg').evidenceState = 'implemented';
  bogus.entries.find((e) => e.id === 'data.asyncpg').override = { maxState: 'constructor', reason: 'x' };
  assert.deepEqual(codes(validateCatalog(bogus, sweep)).sort(), ['override-state', 'state-claim']);
  const lowered = fixtureCatalog();
  lowered.entries.find((e) => e.id === 'backend.fastapi').override = { maxState: 'configured', reason: 'Only declared here.' };
  assert.deepEqual(codes(validateCatalog(lowered, sweep)), ['state-claim']);
});

test('dispositions reject broad wildcards and refuse to call a used candidate unused', () => {
  const sweep = sweepOf(makeFixtureRepo());
  for (const match of ['*', 'pkg:*', 'pkg:node:*', 'infra:*', 'pkg:*:x']) {
    const catalog = fixtureCatalog();
    catalog.dispositions.push({ match, disposition: 'incidental', reason: 'Too broad.' });
    assert.ok(validateCatalog(catalog, sweep).some((error) => error.code === 'disposition' && error.entry === match), match);
  }
  const used = fixtureCatalog();
  used.dispositions.push({ match: 'pkg:python:fastapi', disposition: 'unused', reason: 'Wrong.' });
  const errors = validateCatalog(used, sweep);
  assert.deepEqual(errors.map((error) => `${error.code}:${error.entry}`), ['disposition:pkg:python:fastapi']);
});

test('malformed list fields are reported instead of crashing validation', () => {
  const sweep = sweepOf(makeFixtureRepo());
  const catalog = fixtureCatalog();
  catalog.entries[1].candidates = 'pkg:python:fastapi';
  catalog.entries[2].decisionRefs = 'docs/decisions/0001-hosting.md';
  catalog.entries[3].capabilityIds = 'backend.api-design';
  const errors = validateCatalog(catalog, sweep);
  assert.ok(errors.filter((error) => error.code === 'shape').length >= 3);
});

test('detects common credential and internal-host shapes', () => {
  const samples = [
    `sk_live_${'a'.repeat(12)}`, `github_pat_${'a'.repeat(25)}`, `AIza${'a'.repeat(35)}`,
    `eyJ${'a'.repeat(10)}.eyJ${'a'.repeat(10)}.sig`, 'postgres://user:hunter2@db/app', 'https://hooks.slack.com/services/T0/B0/x',
    'db.svc.cluster.local', 'redis on localhost:6379', 'bind 127.0.0.1', 'host db.internal'
  ];
  for (const sample of samples) assert.ok(findSecrets(sample).length > 0, sample.slice(0, 20));
  assert.deepEqual(findSecrets('Uses a relational database through an ORM.'), []);
});

test('distribute refuses git-ignored, .git, and symlinked targets', (t) => {
  const outside = tempDirectory();
  const root = makeFixtureRepo({ '.gitignore': 'ignored.md\n' });
  const draftPath = draftIn(tempDirectory());
  const attempt = (targetPath) => () => distribute({ repo: { id: 'x', checkoutPath: root, targetPath }, draftPath });
  assert.throws(attempt('ignored.md'), /ignored by git/);
  assert.throws(attempt('.git/hooks/pre-commit'), /inside \.git/);
  try {
    symlinkSync(outside, join(root, 'linked'), 'junction');
  } catch {
    t.diagnostic('symbolic links are unavailable here, so the link case was skipped');
    return;
  }
  assert.throws(attempt('linked/CATALOG.md'), /outside the checkout|symbolic link/);
  assert.equal(existsSync(join(outside, 'CATALOG.md')), false);
});

test('the registry rejects targets inside .git', () => {
  const repo = makeFixtureRepo();
  const errors = validateRegistry({ schemaVersion: 1, repos: [{ id: 'one', displayName: 'One', checkoutPath: repo, targetPath: '.git/CATALOG.md' }] });
  assert.match(errors[0].message, /inside \.git/);
});
