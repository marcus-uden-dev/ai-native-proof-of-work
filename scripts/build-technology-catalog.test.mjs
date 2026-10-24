import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { MARKER, buildCatalog, renderCatalog, scanRepo } from './build-technology-catalog.mjs';

function fixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tech-catalog-'));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return root;
}
const stateOf = (result, key) => result.rows.find((r) => r.key === key)?.state;

test('dependency with no consumer is configured, not implemented', () => {
  const result = scanRepo(fixture({ 'requirements.txt': 'bcrypt==4.0\npgvector\n' }));
  assert.equal(stateOf(result, 'bcrypt'), 'configured');
  assert.equal(stateOf(result, 'pgvector'), 'configured');
});

test('import in source is implemented; import only in tests is tested', () => {
  const result = scanRepo(fixture({
    'requirements.txt': 'fastapi\nhttpx\n',
    'app/main.py': 'from fastapi import FastAPI\n',
    'tests/test_x.py': 'import httpx\n'
  }));
  assert.equal(stateOf(result, 'fastapi'), 'implemented');
  assert.equal(stateOf(result, 'httpx'), 'tested');
});

test('database URL scheme counts as a consumer', () => {
  const result = scanRepo(fixture({
    'requirements.txt': 'asyncpg\n',
    'app/db.py': 'URL = "postgresql+asyncpg://user@db/app"\n'
  }));
  assert.equal(stateOf(result, 'asyncpg'), 'implemented');
});

test('compose image and workflow are implemented', () => {
  const result = scanRepo(fixture({
    'docker-compose.yml': 'services:\n  db:\n    image: pgvector/pgvector:pg16\n',
    '.github/workflows/ci.yml': 'on: push\n'
  }));
  assert.equal(stateOf(result, 'postgres'), 'implemented');
  assert.equal(stateOf(result, 'github-actions'), 'implemented');
});

test('env key only is configured', () => {
  const result = scanRepo(fixture({ '.env.example': 'OLLAMA_BASE_URL=http://localhost\n' }));
  assert.equal(stateOf(result, 'ollama'), 'configured');
});

test('dev requirements file gives dev-test-only', () => {
  const result = scanRepo(fixture({ 'requirements-dev.txt': 'psycopg2-binary\npytest\n' }));
  assert.equal(stateOf(result, 'psycopg'), 'dev-test-only');
  assert.equal(stateOf(result, 'pytest'), 'dev-test-only');
});

test('package.json dependencies resolve and unknown packages are unclassified', () => {
  const result = scanRepo(fixture({
    'package.json': JSON.stringify({ dependencies: { next: '1', 'left-pad': '1' } }),
    'src/page.tsx': "import Link from 'next/link';\n"
  }));
  assert.equal(stateOf(result, 'next'), 'implemented');
  assert.deepEqual(result.unclassified.map((u) => u.name), ['left-pad']);
  assert.equal(result.unclassified[0].purpose, undefined);
});

test('worktrees, virtualenvs, docs and test-support scripts are not live consumers', () => {
  const result = scanRepo(fixture({
    'requirements.txt': 'bcrypt\ncelery\nredis\nfastapi\n',
    '.claude/worktrees/x/app/a.py': 'import bcrypt\n',
    'backend/.venv-3.12/Lib/site-packages/m.py': 'import celery\n',
    'docs/example.py': 'import redis\n',
    'backend/scripts/ensure_test_db.py': 'import fastapi\n'
  }));
  assert.equal(stateOf(result, 'bcrypt'), 'configured');
  assert.equal(stateOf(result, 'celery'), 'configured');
  assert.equal(stateOf(result, 'redis'), 'configured');
  assert.equal(stateOf(result, 'fastapi'), 'tested');
});

test('pyproject test settings are not parsed as dependencies', () => {
  const result = scanRepo(fixture({
    'pyproject.toml': '[project]\ndependencies = [\n  "fastapi>=0.1",\n]\n[tool.pytest.ini_options]\ntestpaths = ["tests"]\n'
  }));
  assert.equal(stateOf(result, 'fastapi'), 'configured');
  assert.equal(result.unclassified.length, 0);
});

test('output is deterministic and carries the marker', () => {
  const root = fixture({ 'requirements.txt': 'fastapi\n', 'app/main.py': 'import fastapi\n' });
  const a = buildCatalog(root, { name: 'demo' });
  const b = buildCatalog(root, { name: 'demo' });
  assert.equal(a, b);
  assert.ok(a.startsWith(MARKER));
  assert.match(a, /[0-9a-f]{64}/);
});

test('generation fails closed on unsafe text', () => {
  const unsafeResult = {
    rows: [],
    unclassified: [{ name: 'pkg', state: 'configured', evidence: ['C:\\Users\\x\\req.txt'] }],
    fingerprint: 'f'
  };
  assert.throws(() => renderCatalog(unsafeResult, 'demo'));
  assert.throws(() => renderCatalog({ rows: [], unclassified: [], fingerprint: 'f' }, 'password: hunter2'));
});
