# Problem-Solving Log

## 2026-08-09 — The committed `job-agent` source moved again, but only part of that movement is product-code evidence

### Problem

The proof-of-work repo already had an August 5 boundary correction in progress, but the committed `job-agent` redesign branch moved again by August 9. A naive refresh would either miss the latest committed source state or overstate docs/ops commits and dirty M2 follow-up work as equivalent to landed product progress.

### Cause

The redesign branch kept advancing with a mix of product-code, ops, and docs commits, while the local worktree also accumulated uncommitted M2 follow-up work.

### Attempted Fixes

- Re-checked the actual `job-agent` branch head, ahead/behind count, and recent log window.
- Verified the latest committed product-code change separately from later docs/ops commits.
- Re-read committed status and startup docs, migration counts, env examples, compose, and package metadata before promoting any refreshed handoff claims.
- Updated recruiter-facing proof surfaces to name the latest product-code signal while keeping dirty local work out of scope.

### Resolution

The portfolio sync now reflects the source state that is actually verifiable on 2026-08-09: committed redesign-branch evidence through `bc10287`, with August 8 shell polish at `cfb91bc` called out as the latest committed product-code signal and dirty M2 follow-up work excluded.

### Lesson

When a lead source repo advances with mixed commit types, separate the latest committed product-code milestone from later docs/ops commits instead of flattening them into one vague "latest update" claim.

### Reusable Rule

```text
For weekly proof syncs, refresh to the current committed source boundary, but identify the latest committed product-code milestone separately when later commits are docs/ops follow-through.
```

## 2026-08-05 — Job-agent's current committed branch no longer matches the older verified handoff snapshot

### Problem

The weekly compiler needed a fresh `job-agent` evidence boundary, but the currently accessible committed branch in this workspace is now `feat/frontend-redesign-shell` with 44 migrations and July redesign work, while the existing portfolio handoff docs still described an older June branch state with 46 migrations and different source-doc precedence claims.

### Cause

Prior weekly runs verified a different accessible source snapshot. By 2026-08-05, the local `job-agent` clone also contained dirty uncommitted status-doc and frontend changes, which made "latest local state" an unsafe default for recruiter-facing proof.

### Attempted Fixes

- Re-checked the actual `job-agent` worktree state with `git status --short`, `git log --pretty=format`, branch/ahead-behind checks, and direct file inspection.
- Read the committed `HEAD` versions of `docs/operations/current-status.md`, `docs/operations/current-status-history.md`, `docs/overview/agent-context.md`, and `.claude/CLAUDE.md` instead of trusting dirty working-tree files.
- Recounted committed migrations from `HEAD` and `origin/master`.
- Updated the portfolio handoff, proof, recruiter, and source-map surfaces to reflect the committed July branch state and to exclude dirty local worktree changes from shipped evidence.

### Resolution

The portfolio sync now reflects the source state that is actually verifiable on 2026-08-05: committed July redesign evidence on `feat/frontend-redesign-shell`, 44 migrations with named head `0043`, and an explicit note that dirty local worktree edits were not promoted.

### Lesson

When a lead source repo is accessible on a different committed branch than the one used in a prior verification, the portfolio should correct its snapshot to the currently verifiable branch and explicitly fence off any dirty local WIP.

### Reusable Rule

```text
For weekly proof syncs, prefer the currently accessible committed branch state over older verified snapshots, and never promote dirty local worktree changes as shipped recruiter-facing evidence.
```

## 2026-06-28 — Job-agent source orientation, status, and HEAD no longer map to one document

### Problem

The weekly compiler needed to refresh `job-agent` evidence, but the source repo now spreads truth across multiple artifacts: `agent-context` for orientation, `current-status` for durable state, `current-status-history` for review windows, and git HEAD for the latest follow-up commit. Treating one file as the whole truth risked either stale freshness or a muddled handoff order.

### Cause

The source repo's documentation improved after 2026-06-23, but the portfolio layer was still largely phrased as if one status document carried both setup orientation and freshness.

### Attempted Fixes

- Re-checked the actual `job-agent` worktree state with `git status --short`, `git log --oneline -5`, and direct file inspection.
- Read `docs/operations/current-status.md`, `docs/operations/current-status-history.md`, `docs/overview/agent-context.md`, `.claude/CLAUDE.md`, and the startup/handoff docs together.
- Promoted only the changes grounded in committed source files and commits, not untracked ops-run artifacts.
- Updated the portfolio handoff and recruiter-agent wording to reflect the clearer source hierarchy.

### Resolution

The portfolio sync now preserves the source repo's own document roles: `agent-context` for orientation, `current-status` for durable product state, and direct git/file verification for final freshness when follow-up commits land afterward.

### Lesson

Lead-project handoff quality improves when the portfolio mirrors the source repo's own document hierarchy instead of compressing it into one generic status summary.

### Reusable Rule

```text
When a lead source repo separates orientation docs, durable status docs, and dated review-history docs, preserve that hierarchy in recruiter-safe handoff material and use direct git/file checks only for the final freshness boundary.
```

## 2026-06-14 — Source-repo status docs lagged the actual job-agent HEAD

### Problem

The weekly compiler needed a fresh `job-agent` status boundary, but `docs/operations/current-status.md` in the source repo still carried a 2026-06-12 triage header even though the repo had newer committed work on 2026-06-13 and 2026-06-14.

### Cause

The source repo's status doc is helpful but not guaranteed to be the freshest artifact after branch-local work, docs follow-ups, or small commit bursts.

### Attempted Fixes

- Checked the actual `job-agent` worktree state with `git status --short --branch`.
- Read the current setup and ops docs that the handoff depends on.
- Compared the status doc against `git log --oneline -10`.
- Promoted only the changes that were grounded in committed source files and commits, not untracked ops-run artifacts.

### Resolution

The portfolio sync now treats the direct source-verification date as authoritative when a source-repo status doc header lags the actual HEAD. Recruiter-facing guidance was updated to say so explicitly.

### Lesson

Lead-project freshness should come from direct source verification, not from a status doc date alone.

### Reusable Rule

```text
If the lead source repo is accessible but its status summary lags the actual HEAD, use direct git/file verification for freshness and treat the status doc as supporting context, not the sole authority.
```

## 2026-06-07 — Weekly compiler had no direct access to the lead source repo

### Problem

The weekly compiler run needed to maintain `job-agent` status and handoff boundaries, but the lead source repository was not directly accessible from the current workspace.

### Cause

This proof-of-work repository workspace contains the evidence layer and internal indexes, but not the `job-agent` source tree itself.

### Attempted Fixes

- Checked `weekly-input/` for a fresh dated source summary.
- Reused the latest available internal source-index freshness notes from 2026-06-01.
- Kept the latest direct source-verification date at 2026-05-31 instead of promoting newer implied product progress.
- Updated recruiter-safe docs to state the evidence boundary explicitly.

### Resolution

The run completed as a bounded no-new-evidence sync. Product-progress claims stayed anchored to the last direct source verification and existing internal source-index summaries.

### Lesson

When a weekly proof-of-work run cannot access the lead source repo directly, it should preserve the last verified source date, mark newer product progress `Needs Review`, and avoid inventing freshness from adjacent portfolio-doc changes.

### Reusable Rule

```text
If a weekly sync cannot directly inspect the lead source repo, keep the last verified source date explicit and downgrade fresher product-status claims to Needs Review until a dated source summary or direct verification exists.
```

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
