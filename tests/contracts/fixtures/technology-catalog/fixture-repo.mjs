import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

export function sh(cwd, args) {
  return execFileSync('git', ['-C', cwd, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.com', ...args], { encoding: 'utf8' });
}

// A synthetic product repo. Every name here is invented for the tests.
export const FIXTURE_FILES = {
  'backend/requirements.txt': [
    'fastapi==0.1.0', 'redis>=5', 'asyncpg==0.1.0', 'unusedlib==1.0', 'PyJWT>=2', 'alembic==1.0', 'uvicorn==0.3', 'pytest==8',
    'cryptography>=1', 'typedlib==1.0', '# a comment', '-r other.txt'
  ].join('\n'),
  'backend/app/main.py': [
    'import os', 'from fastapi import FastAPI', 'import redis', 'import jwt', 'from .local import thing',
    'SECRET = os.getenv("SECRET_KEY")', ''
  ].join('\n'),
  'backend/app/noise.py': [
    '# import unusedlib', '"""', 'import unusedlib', '"""', 'from typing import TYPE_CHECKING',
    'if TYPE_CHECKING:', '    import typedlib', 'text = "from unusedlib import x"', ''
  ].join('\n'),
  'backend/app/shadow_user.py': 'import cryptography\n',
  'backend/cryptography.py': '# a local module that shadows the package name\n',
  'backend/tests/test_main.py': [
    'import pytest', 'import redis', 'from unittest.mock import patch', 'patch("asyncpg.connect")', ''
  ].join('\n'),
  'backend/scripts/seed.py': 'import redis\n',
  'backend/alembic/versions/0001_init.py': 'from alembic import op\n',
  'backend/Dockerfile': 'FROM python:3.12\nCMD ["uvicorn", "app.main:app"]\n',
  'backend/.env.example': 'DATABASE_URL=postgresql+asyncpg://user:pw@db/app\nSECRET_KEY=\n',
  'docker-compose.yml': [
    'services:', '  db:', '    image: postgres:16', '  cache:', '    image: redis:7-alpine', '  api:', '    build: .',
    '    command: uvicorn app.main:app', ''
  ].join('\n'),
  '.github/workflows/ci.yml': [
    'name: ci', 'jobs:', '  test:', '    steps:', '      - uses: actions/checkout@v4', '      - run: pytest', ''
  ].join('\n'),
  'frontend/package.json': JSON.stringify({
    dependencies: { next: '16.0.0', react: '19.0.0', lodash: '4.0.0' },
    devDependencies: { vitest: '2.0.0', '@types/node': '22.0.0' },
    scripts: { dev: 'next dev', test: 'vitest run' }
  }, null, 2),
  'frontend/app/page.tsx': [
    "import Link from 'next/link';", "import type { Thing } from 'react';", 'import React from "react";',
    "// import lodash from 'lodash'", 'export const url = process.env.NEXT_PUBLIC_API_URL;', ''
  ].join('\n'),
  'frontend/app/page.test.tsx': "import { describe } from 'vitest';\n",
  'nginx/nginx.conf': 'events {}\n',
  'docs/decisions/0001-hosting.md': '# Hosting decision\n'
};

export function makeFixtureRepo(overrides = {}) {
  const root = mkdtempSync(join(tmpdir(), 'tech-catalog-'));
  sh(root, ['init', '--quiet']);
  sh(root, ['config', 'core.autocrlf', 'false']);
  const files = { ...FIXTURE_FILES, ...overrides };
  for (const [path, content] of Object.entries(files)) {
    if (content === null) continue;
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  sh(root, ['add', '-A']);
  sh(root, ['commit', '--quiet', '-m', 'fixture']);
  return root;
}
