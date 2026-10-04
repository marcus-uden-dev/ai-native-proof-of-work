<!-- GENERATED FILE. Do not edit by hand. Regenerate it with the technology catalog tooling in the proof-of-work repo. -->

# Technology capability catalog: Fixture Service

- Swept commit: `{{COMMIT}}` on branch `{{BRANCH}}`
- Sweep fingerprint: `ace954730b8c99541d74fe34b98bcc0463f5862effed08b2b0e03b0b28c5183d`
- Tool version: `technology-catalog/1`

This catalog records what the tracked source shows: which technologies the repo uses, what for, and where the source shows it. It makes no claim about adoption, users, or outcomes.

## Evidence states

| State | Meaning |
|---|---|
| `tested` | Live implementation plus an automated test that uses it. |
| `implemented` | Live implementation in source or runtime configuration. A test may exist but is not established. |
| `configured` | Declared or configured, but the swept source does not show it running. |
| `dev-test-only` | Used only by tests or developer tooling. |
| `planned` | Appears only in a current plan or document. |
| `historical` | Superseded or removed. Kept for context. |

## Languages by tracked file count

| Language | Files |
|---|---|
| Python (`.py`) | 7 |
| TypeScript (TSX) (`.tsx`) | 2 |
| YAML (`.yml`) | 2 |
| Dockerfile (`Dockerfile`) | 1 |
| JSON (`.json`) | 1 |
| Markdown (`.md`) | 1 |

## Languages and file formats

### Python

- State: `implemented`
- Kind: language
- Used for: Used for python in the fixture service.
- Problem solved: Gives the fixture service python without custom code.
- Architecture role: Python layer
- Related technologies: Python
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `backend/app/*.py`: Python evidence

## Backend and API

### FastAPI

- State: `implemented`
- Kind: framework
- Used for: Used for fastapi in the fixture service.
- Problem solved: Gives the fixture service fastapi without custom code.
- Architecture role: FastAPI layer
- Related technologies: FastAPI
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `backend/app/main.py`: FastAPI evidence

## Data and persistence

### Alembic

- State: `implemented`
- Kind: library
- Used for: Used for alembic in the fixture service.
- Problem solved: Gives the fixture service alembic without custom code.
- Architecture role: Alembic layer
- Related technologies: Alembic
- Capabilities: Database schema migrations (`data.schema-migrations`)
- Rationale: not documented
- Evidence:
  - `backend/alembic/versions/*.py`: Alembic evidence

### asyncpg

- State: `configured`
- Kind: library
- Used for: Used for asyncpg in the fixture service.
- Problem solved: Gives the fixture service asyncpg without custom code.
- Architecture role: asyncpg layer
- Related technologies: asyncpg
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `backend/.env.example`: asyncpg evidence

## Async work and caching

### Redis

- State: `tested`
- Kind: datastore
- Used for: Used for redis in the fixture service.
- Problem solved: Gives the fixture service redis without custom code.
- Architecture role: Redis layer
- Related technologies: Redis
- Capabilities: API design (`backend.api-design`)
- Rationale: documented in `docs/decisions/0001-hosting.md`
- Evidence:
  - `backend/app/main.py`: Redis evidence

## Frontend

### Next.js and React

- State: `implemented`
- Kind: frontend
- Used for: Used for next.js and react in the fixture service.
- Problem solved: Gives the fixture service next.js and react without custom code.
- Architecture role: Next.js and React layer
- Related technologies: Next.js and React
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `frontend/app/page.tsx`: Next.js and React evidence

## Security and authentication

### PyJWT

- State: `implemented`
- Kind: security
- Used for: Used for pyjwt in the fixture service.
- Problem solved: Gives the fixture service pyjwt without custom code.
- Architecture role: PyJWT layer
- Related technologies: PyJWT
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `backend/app/main.py`: PyJWT evidence

## Testing and quality

### pytest

- State: `dev-test-only`
- Kind: testing
- Used for: Used for pytest in the fixture service.
- Problem solved: Gives the fixture service pytest without custom code.
- Architecture role: pytest layer
- Related technologies: pytest
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `backend/tests/test_main.py`: pytest evidence

### Vitest

- State: `dev-test-only`
- Kind: testing
- Used for: Used for vitest in the fixture service.
- Problem solved: Gives the fixture service vitest without custom code.
- Architecture role: Vitest layer
- Related technologies: Vitest
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `frontend/app/page.test.tsx`: Vitest evidence

## Delivery and infrastructure

### Docker images

- State: `implemented`
- Kind: delivery
- Used for: Used for docker images in the fixture service.
- Problem solved: Gives the fixture service docker images without custom code.
- Architecture role: Docker images layer
- Related technologies: Docker images
- Capabilities: Continuous integration (`delivery.ci`)
- Rationale: not documented
- Evidence:
  - `backend/Dockerfile`: Docker images evidence

### GitHub Actions

- State: `implemented`
- Kind: cicd
- Used for: Used for github actions in the fixture service.
- Problem solved: Gives the fixture service github actions without custom code.
- Architecture role: GitHub Actions layer
- Related technologies: GitHub Actions
- Capabilities: Continuous integration (`delivery.ci`)
- Rationale: not documented
- Evidence:
  - `.github/workflows/ci.yml`: GitHub Actions evidence

### Nginx

- State: `configured`
- Kind: delivery
- Used for: Used for nginx in the fixture service.
- Problem solved: Gives the fixture service nginx without custom code.
- Architecture role: Nginx layer
- Related technologies: Nginx
- Capabilities: API design (`backend.api-design`)
- Rationale: not documented
- Evidence:
  - `nginx/nginx.conf`: Nginx evidence

## Technology index

| Technology | State | Domain |
|---|---|---|
| Alembic | `implemented` | Data and persistence |
| asyncpg | `configured` | Data and persistence |
| Docker images | `implemented` | Delivery and infrastructure |
| FastAPI | `implemented` | Backend and API |
| GitHub Actions | `implemented` | Delivery and infrastructure |
| Next.js and React | `implemented` | Frontend |
| Nginx | `configured` | Delivery and infrastructure |
| PyJWT | `implemented` | Security and authentication |
| pytest | `dev-test-only` | Testing and quality |
| Python | `implemented` | Languages and file formats |
| Redis | `tested` | Async work and caching |
| Vitest | `dev-test-only` | Testing and quality |

## Capability index

- API design (`backend.api-design`): asyncpg (`configured`), FastAPI (`implemented`), Next.js and React (`implemented`), Nginx (`configured`), PyJWT (`implemented`), pytest (`dev-test-only`), Python (`implemented`), Redis (`tested`), Vitest (`dev-test-only`)
- Database schema migrations (`data.schema-migrations`): Alembic (`implemented`)
- Continuous integration (`delivery.ci`): Docker images (`implemented`), GitHub Actions (`implemented`)
