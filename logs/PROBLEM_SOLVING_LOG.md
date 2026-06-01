# Problem-Solving Log

## 2026-06-01 — Scheduled task needed a manual run-now equivalent

### Problem

The user asked to run the Codex scheduled task immediately and then verify the drift called out in the prior review.

### Cause

The available automation tool exposes viewing and schedule management, but not a direct run-now mode in the callable schema. The active automation itself exists and is scheduled weekly.

### Attempted Fixes

- Confirmed the active task named `ai-native-proof-of-work` exists and is `ACTIVE`.
- Read the scheduled automation prompt and weekly compiler prompt.
- Ran the same compiler contract manually from the repository root.
- Updated only source-grounded drift: entry-point freshness, source-index metadata, demo portal evidence, supporting-project maintenance signals, and logs.

### Resolution

The manual run-now equivalent completed without inventing new product progress. The scheduled task remains active for the normal Sunday 22:00 cadence.

### Lesson

If a scheduler lacks a callable run-now action, use the checked-in automation prompt as the execution contract, record the run in the weekly log, and clearly distinguish manual execution from the recurring schedule.

## 2026-05-31 — Job-agent startup contract drifted from the simpler handoff summary

### Problem

The recruiter-facing `job-agent` handoff summary treated Docker Compose defaults and manual local startup as if they used one shared frontend port and one shared verification path.

### Cause

The source repo now has more explicit operations docs than the portfolio summary used last week. `docker-compose.yml` still exposes frontend `3000`, while the newer startup handoff doc sets the canonical manual frontend port to `3002` and requires explicit OAuth callback verification.

### Attempted Fixes

- Re-inspected the current source repo's root `.env.example`, `backend/.env.example`, `docker-compose.yml`, `Makefile`, `frontend/package.json`, `docs/operations/current-status.md`, `docs/operations/llm-handoff.md`, and `docs/operations/job-agent-startup-skill-handoff.md`.
- Updated the portfolio handoff guide to distinguish Compose defaults from the manual startup contract.
- Added the newer source-repo ops docs to the cold-start reading order for LLM agents.
- Added an explicit wrong-port / stale-OAuth callback trap to the common-issues section.

### Resolution

The portfolio handoff guide now preserves the real distinction between:

- Docker Compose local flow: frontend on `3000`
- Manual startup contract: frontend on `3002` with explicit OAuth callback checks

This reduces setup drift while keeping the recruiter-facing summary concise.

### Lesson

Lead-project handoff summaries must distinguish default container ports from the repo's canonical manual-dev contract when the source repo treats them differently.

### Reusable Rule

```text
When a source repo has both container defaults and a separate manual startup contract, document both explicitly and verify which one governs OAuth, health checks, and reviewer handoff.
```

## 2026-05-24 — Job-agent handoff drifted from the source repo

### Problem

The recruiter-facing handoff guide for `job-agent` referenced agent-entry files that are not present in the inspected source worktree and mixed together root, backend, and frontend setup assumptions.

### Cause

The handoff file had been updated faster than it was re-verified against the actual source repo. Older assumptions about `.claude/CLAUDE.md` and `docs/setup/llm-handoff.md` were carried forward without checking the current tree.

### Attempted Fixes

- Re-inspected the `job-agent` source tree directly.
- Checked env examples, `docker-compose.yml`, `Makefile`, `frontend/package.json`, backend requirements, migration files, and current-status docs.
- Removed nonexistent handoff entrypoints and clarified which env examples belong to Docker Compose versus host-based backend runs.
- Added source-verification notes to the handoff guide so future runs can detect drift faster.

### Resolution

`case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md` now reflects the inspected source tree and explicitly marks what was verified present, what was absent, and which migration-status claim still needs repo-side investigation.

### Lesson

Lead-project handoff docs must be source-verified from actual files and config, not inferred from older repo conventions or adjacent docs.

### Reusable Rule

```text
Before promoting setup or agent-entry claims into recruiter-facing handoff docs, verify the exact files, commands, env examples, ports, and validation paths from the current source repo.
```

---

## 2026-05-09 — Automation layer overshadowed project evidence

### Problem

Recruiter-facing documents were drifting toward the proof-of-work compiler, source indexing, and automation process as the main value proposition.

### Cause

The first weekly compiler pass had strong verified evidence for the repository scaffold and indexes, while the concrete project evidence had only recently been indexed and not yet promoted into recruiter-facing summaries.

### Attempted Fixes

- Added a project-centered proof-point map.
- Rewrote central positioning around job-agent, PKM, and the household budget app.
- Updated recruiter assets, value proposition, demo script, and strategy docs.
- Recorded a lesson to prevent future compiler-first drift.

### Resolution

The repository now treats job-agent as the lead proof point, PKM and the budget app as supporting proof points, and the compiler as documented packaging/review automation.

### Reusable Rule

```text
When updating recruiter-facing proof-of-work artifacts, make concrete product projects the primary evidence and keep automation documented as the repeatable operating layer unless the document is specifically about the automation system.
```

## 2026-05-08 — Direct GitHub file creation stalled

### Problem

Attempted direct GitHub file creation did not complete reliably during the session.

### Cause

Likely connector/tool call latency or failure. The `.gitignore` file was not visible afterward when checked.

### Attempted Fixes

- Checked repository metadata.
- Checked whether `.gitignore` existed.
- Confirmed file was not found.
- Stopped direct writes.

### Resolution

Generate a complete ZIP scaffold for batch download instead of continuing direct GitHub writes.

### Lesson

For initial repo scaffolding, batch generation is safer than creating dozens of files one by one through a connector.

### Reusable Rule

Should become:

- instruction
- checklist
- no action

Reusable rule:

```text
For initial documentation repo setup, prefer generating a ZIP scaffold or local file tree, then commit once through Git/Codex.
```

---

## 2026-05-08 — Source indexes unavailable during weekly compiler run

### Problem

The weekly compiler expected optional internal source indexes, but the repository currently contains only source-index templates.

### Cause

The local-only files under `internal/LOCAL_SOURCE_MAP.md` and `internal/source-indexes/*.md` had not been generated yet.

### Attempted Fixes

- Checked the `internal/` tree.
- Confirmed templates exist.
- Confirmed populated source indexes do not exist.

### Resolution

Continued the weekly run using repo-visible evidence only. Marked local source indexes as unavailable and kept related claims planned or open.

### Lesson

Missing indexes should reduce claim scope, not block a truthful weekly update when repo-visible evidence exists.

### Reusable Rule

```text
If source indexes are absent, mark them unavailable and continue from verified repository artifacts only.
```

---

## 2026-05-08 — Keep project sources separated during indexing

### Problem

Local context exists across Codex project folders, Claude project folders, and shared agent assets. Treating them as one undifferentiated source would blur execution evidence, planning evidence, and reusable workflow infrastructure.

### Cause

The source roots serve different purposes and contain different artifact types.

### Attempted Fixes

- Created separate internal indexes for Codex projects, Claude projects, and shared agent assets.
- Added a local source map with an explicit separation rule.
- Recorded the source-layer rule in [tasks/lessons.md](../tasks/lessons.md).

### Resolution

Future proof-of-work extraction should cite the correct source layer for each claim and avoid merging separate project histories into one bucket.

### Reusable Rule

```text
Keep Codex execution projects, Claude planning projects, and shared agent workflow assets as separate evidence layers.
```
