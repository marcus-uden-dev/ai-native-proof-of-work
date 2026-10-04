// A curated catalog for the synthetic fixture repo. Every name here is invented for the tests.
export function fixtureCatalog() {
  const entry = (id, name, kind, domain, evidenceState, candidates, evidencePath, extra = {}) => ({
    id,
    name,
    kind,
    domain,
    evidenceState,
    purpose: `Used for ${name.toLowerCase()} in the fixture service.`,
    problemSolved: `Gives the fixture service ${name.toLowerCase()} without custom code.`,
    architectureRole: `${name} layer`,
    technologies: [name],
    capabilityIds: ['backend.api-design'],
    candidates,
    evidence: [{ path: evidencePath, description: `${name} evidence` }],
    decisionRefs: [],
    rationale: 'undocumented',
    ...extra
  });
  return {
    schemaVersion: 1,
    capabilities: [
      { id: 'backend.api-design', label: 'API design' },
      { id: 'data.schema-migrations', label: 'Database schema migrations' },
      { id: 'delivery.ci', label: 'Continuous integration' }
    ],
    entries: [
      entry('lang.python', 'Python', 'language', 'languages', 'implemented', [], 'backend/app/*.py'),
      entry('backend.fastapi', 'FastAPI', 'framework', 'backend', 'implemented', ['pkg:python:fastapi', 'pkg:python:uvicorn'], 'backend/app/main.py'),
      entry('data.alembic', 'Alembic', 'library', 'data', 'implemented', ['pkg:python:alembic', 'infra:migration-file:backend/alembic/versions'], 'backend/alembic/versions/*.py', {
        capabilityIds: ['data.schema-migrations']
      }),
      entry('async.redis', 'Redis', 'datastore', 'async', 'tested', ['pkg:python:redis', 'pkg:image:redis'], 'backend/app/main.py', {
        rationale: 'documented',
        decisionRefs: ['docs/decisions/0001-hosting.md']
      }),
      entry('security.jwt', 'PyJWT', 'security', 'security', 'implemented', ['pkg:python:pyjwt'], 'backend/app/main.py'),
      entry('data.asyncpg', 'asyncpg', 'library', 'data', 'configured', ['pkg:python:asyncpg'], 'backend/.env.example'),
      entry('testing.pytest', 'pytest', 'testing', 'testing', 'dev-test-only', ['pkg:python:pytest'], 'backend/tests/test_main.py'),
      entry('frontend.next', 'Next.js and React', 'frontend', 'frontend', 'implemented', ['pkg:node:next', 'pkg:node:react'], 'frontend/app/page.tsx'),
      entry('testing.vitest', 'Vitest', 'testing', 'testing', 'dev-test-only', ['pkg:node:vitest'], 'frontend/app/page.test.tsx'),
      entry('delivery.docker', 'Docker images', 'delivery', 'delivery', 'implemented', ['pkg:image:python', 'pkg:image:postgres'], 'backend/Dockerfile', {
        capabilityIds: ['delivery.ci']
      }),
      entry('delivery.actions', 'GitHub Actions', 'cicd', 'delivery', 'implemented', ['pkg:workflow-action:actions/checkout', 'infra:workflow:.github/workflows/ci.yml'], '.github/workflows/ci.yml', {
        capabilityIds: ['delivery.ci']
      }),
      entry('delivery.nginx', 'Nginx', 'delivery', 'delivery', 'configured', ['infra:reverse-proxy:nginx/nginx.conf'], 'nginx/nginx.conf')
    ],
    dispositions: [
      { match: 'pkg:node:@types/*', disposition: 'incidental', reason: 'Type definitions only.' },
      { match: 'pkg:node:lodash', disposition: 'unused', reason: 'Declared but no tracked file imports it.' },
      { match: 'pkg:python:unusedlib', disposition: 'unused', reason: 'Declared but no tracked file imports it.' },
      { match: 'pkg:python:typedlib', disposition: 'incidental', reason: 'Imported for type checking only.' },
      { match: 'pkg:python:cryptography', disposition: 'unused', reason: 'Only a local module with the same name uses the name.' },
      { match: 'env:*', disposition: 'incidental', reason: 'Environment key names are not technologies.' }
    ]
  };
}
