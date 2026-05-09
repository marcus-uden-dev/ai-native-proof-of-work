# Problem-Solving Log

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
