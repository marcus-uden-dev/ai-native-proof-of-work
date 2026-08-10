# Job-Agent Install And Handoff Guide

Last updated: 2026-08-09
Status: Active / Recruiter-facing / LLM-readable

## Purpose

This guide explains how another user, collaborator, or LLM agent can clone and run the `job-agent` source repository.

Use this as the practical handoff layer between this proof-of-work repository and the actual product repo.

This file should stay safe to share. It summarizes install steps, expected local services, agent context, and common setup traps without exposing private local paths, secrets, raw chat logs, or machine-specific state.

## Source Repository

| Field | Value |
|---|---|
| Repository | `TheOneDarkHorse/job-agent` |
| Primary proof role | Lead product proof point |
| Product type | Local-first job search automation app |
| Main stack | FastAPI, PostgreSQL with pgvector, Redis/Celery, Next.js |
| Evidence label | Verified from inspected local source files on 2026-08-09 |

## What The App Contains

`job-agent` is a product codebase, not just a portfolio artifact.

At a high level:

- FastAPI backend for application APIs
- PostgreSQL plus pgvector for relational data and vector-search use cases
- Redis and Celery for background work
- Next.js frontend for the user interface
- Docker Compose for local integration
- Alembic migrations for database schema evolution
- repo-specific agent instructions, design rules, project status, and lessons

## Fast Local Start

Prerequisites:

- Git
- Docker Desktop with Compose v2
- Node.js 20
- Python 3.11 or 3.12
- Make, or direct `docker compose` commands

Clone:

```powershell
git clone git@github.com:TheOneDarkHorse/job-agent.git
cd job-agent
git status --short --branch
```

If SSH is not configured:

```powershell
git clone https://github.com/TheOneDarkHorse/job-agent.git
cd job-agent
```

Create the root environment file for Docker Compose:

```powershell
Copy-Item .env.example .env
```

For Docker Compose, the database and Redis URLs should use service hostnames instead of the `localhost` values shown in the checked-in root example:

```dotenv
DATABASE_URL=postgresql+asyncpg://job_agent:secret@db:5432/job_agent
SYNC_DATABASE_URL=postgresql+psycopg2://job_agent:secret@db:5432/job_agent
REDIS_URL=redis://redis:6379/0
FRONTEND_URL=http://localhost:3000
SECRET_KEY=change-me-to-a-32-char-random-string
```

Start the local stack:

```powershell
make dev
make migrate
```

Equivalent direct commands:

```powershell
docker compose up -d --build
docker compose exec backend alembic upgrade head
```

Expected local services:

| Service | URL / Port |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |
| Backend health | http://localhost:8000/health |
| Celery Flower | http://localhost:5555 |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

## LLM Agent Boot Sequence

If an LLM agent is entering the `job-agent` repo cold, start with these files:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `.claude/CLAUDE.md`
4. `docs/operations/current-status.md`
5. `docs/operations/llm-handoff.md` for the latest repo-ops session state
6. `docs/overview/agent-context.md` for the deeper repo/module map
7. `docs/operations/job-agent-startup-skill-handoff.md` before local startup or OAuth verification work
8. `docs/HANDOVER.md` for prior session context when needed
9. `DESIGN.md` before UI work
10. `tasks/lessons.md` before changing an area with prior lessons

In the currently accessible committed branch, `.claude/CLAUDE.md` routes cold starts
to `docs/operations/current-status.md` first, then optional session handoff, with
`docs/overview/agent-context.md` as the deeper repo/module map. If a small follow-up
commit lands after those docs, use direct git/file verification for freshness and do
not treat dirty local worktree state as shipped evidence.

Then check actual state:

```powershell
git status --short --branch
git log --oneline -5
(Get-ChildItem backend\alembic\versions\*.py | Measure-Object).Count
```

## Direct Backend Run

Use this when running FastAPI outside Docker:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt -r requirements-dev.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Create the backend environment file for host-based runs:

```powershell
Copy-Item .env.example .env
```

For host-based backend runs, URLs should use `localhost`:

```dotenv
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/jobagent
SYNC_DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/jobagent
TEST_DATABASE_URL=postgresql+asyncpg://job_agent:secret@localhost:5432/job_agent_test
REDIS_URL=redis://localhost:6379/0
```

## Direct Frontend Run

```powershell
cd frontend
npm ci
$env:NEXT_PUBLIC_API_URL="http://localhost:8000"
npm run dev -- --port 3002
```

The frontend reads `NEXT_PUBLIC_API_URL` and source-repo startup docs now treat `http://localhost:3002` as the canonical manual frontend port so OAuth callback routing stays predictable.

If you intentionally want the Next.js default instead:

```powershell
$env:NEXT_PUBLIC_API_URL="http://localhost:8000"
npm run dev
```

## Verification

Backend:

```powershell
make test
```

or:

```powershell
docker compose exec backend pytest -q --tb=short
```

Frontend:

```powershell
cd frontend
npm ci
npx tsc --noEmit
npx eslint . --max-warnings 0
npm run build
```

Smoke check:

```powershell
Invoke-WebRequest http://localhost:8000/health
```

Manual startup contract checks:

```powershell
Invoke-WebRequest http://localhost:3002
```

## Common Setup Traps

| Symptom | Likely Cause | Fix |
|---|---|---|
| Backend in Docker cannot reach Postgres | `.env` uses `localhost` from inside a container | Use `db` as the host |
| Host-based backend cannot reach Postgres | `.env` uses Compose hostname from outside Docker | Use `localhost` as the host and match `backend/.env.example` |
| Frontend points at the wrong API | missing or stale `NEXT_PUBLIC_API_URL` | set it to `http://localhost:8000` |
| OAuth redirects to the wrong frontend port | startup uses stale `FRONTEND_URL` or an old `3003` callback | use `http://localhost:3002` for manual frontend startup and verify the callback path explicitly |
| Migrations look inconsistent | docs or local branch are stale, or the migration tree needs review | check `backend/alembic/versions/`, run Alembic head, and verify the current-status note about the hash-named migration anomaly |
| Agent starts from raw files | skipped repo instructions | read `AGENTS.md`, `CLAUDE.md`, `.claude/CLAUDE.md`, `docs/overview/agent-context.md`, and `docs/operations/current-status.md` first |

## What Not To Copy

Do not copy or commit:

- `.env`
- `.env.local`
- `.claude/settings.local.json`
- `.claude/worktrees/`
- `.gstack/`
- `workspace/`
- `frontend/node_modules/`
- `frontend/.next/`
- `backend/.venv/`
- `backend/.db_backups/`
- secrets, tokens, API keys, or credentials

## How This Supports Proof Of Work

This handoff guide matters because it turns `job-agent` from a private source repo into inspectable evidence:

- a recruiter can see that the product has a real local stack
- a technical reviewer can see the dependency and service model
- another LLM can enter the repo without guessing the first files to read
- a collaborator can reproduce the setup path
- the proof-of-work repository can point to product execution without dumping private local context

## Source Verification Notes

This guide was checked against the inspected `job-agent` source tree on 2026-08-09.

- Verified present: `AGENTS.md`, `CLAUDE.md`, `.claude/CLAUDE.md`, `DESIGN.md`, `docs/overview/agent-context.md`, `docs/operations/current-status.md`, `docs/operations/llm-handoff.md`, `docs/operations/job-agent-startup-skill-handoff.md`, `docs/HANDOVER.md`, root `.env.example`, `backend/.env.example`, `docker-compose.yml`, `Makefile`, `frontend/package.json`, `backend/requirements.txt`, `backend/requirements-dev.txt`, and `backend/alembic/versions/`.
- Verified absent in the inspected worktree: `docs/setup/llm-handoff.md`.
- Current source verification also confirms:
  - active committed branch `feat/frontend-redesign-shell` at `bc10287`, twelve commits ahead of `origin/master`
  - 44 Python migration files in `backend/alembic/versions/`, with sequential named head `0043_snippet_source_metadata.py` plus one older hash-named anomaly `3aac5340ec46_add_user_documents.py`
  - committed frontend redesign planning at `19c3525`
  - committed M0 UI foundations at `dd29f6d`
  - committed M1 sidebar shell, one IA, and legacy redirects at `38cefcb`
  - committed M1 shell polish at `cfb91bc`
  - later docs/ops follow-through at `8b9486e` and `bc10287`
  - committed status docs still describe PR #6 as awaiting human merge decision and the frontend redesign as the newest active product direction on this branch, but the status file's triage table can lag the latest docs-only commit and should still be cross-checked against git
- Current source-repo ops docs also distinguish Docker Compose frontend `3000` from the canonical manual startup contract on frontend `3002`; this portfolio guide now preserves that difference explicitly.
- The local `job-agent` worktree is dirty on 2026-08-09, including uncommitted M2 `JourneyBar` / Today rebuild work, a backend funnel summary API, and related docs/frontend changes plus untracked ops-run files. This portfolio sync used committed `HEAD` content only and did not promote those local working-tree changes as shipped evidence.

If a future weekly run cannot verify these paths or commands from the source repo, mark the affected claim `Needs Review`.

## Maintenance Rule

Update this file whenever `job-agent` changes:

- local setup commands
- required services
- ports
- environment variable names
- migration model
- repo-specific agent files
- validation commands
- source repo URLs
- privacy exclusions

If a claim cannot be verified from the source repo or explicit user input, mark it `Needs Review`.
