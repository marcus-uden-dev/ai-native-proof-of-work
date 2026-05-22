# Weekly Automation Runbook

Last updated: 2026-05-18
Status: Active / Internal operating documentation

## Purpose

This file documents the active weekly automation that keeps this proof-of-work repository current.

It is intentionally stored in the repository so a future user, LLM assistant, or automation runner can understand what should exist even if the local scheduler configuration is unavailable.

This supports the one-click clone goal state: the repository should carry enough scheduling intent that another user can recreate the same weekly proof-of-work loop in their own automation runner.

## Active Automation

| Field | Value |
|---|---|
| Automation name | `ai-native-proof-of-work` |
| Kind | Weekly scheduled run |
| Status | Active |
| Schedule | Sunday at 22:00 |
| Schedule rule | `RRULE:FREQ=WEEKLY;BYHOUR=22;BYMINUTE=0;BYDAY=SU` |
| Target repository | `TheOneDarkHorse/ai-native-proof-of-work` |
| Execution model | Worktree-based documentation update |
| Primary prompt source | [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md) |
| Supporting prompt | [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md) |
| Template prompt | [LLM_BOOTSTRAP_REPO_PROMPT.md](LLM_BOOTSTRAP_REPO_PROMPT.md) |

Do not commit local scheduler state files, machine-specific paths, credentials, logs, or automation runtime metadata.

## Weekly Job

The weekly automation should run the Proof-of-Work Compiler for this repository.

It should:

- update job-agent evidence into this repository
- keep [case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md) current
- maintain [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md) as a reusable, LLM-agnostic template seed
- maintain [LLM_BOOTSTRAP_REPO_PROMPT.md](LLM_BOOTSTRAP_REPO_PROMPT.md)
- update recruiter-facing proof files only when there is verified new material
- keep product strategy under `strategy/<project>/`
- keep portfolio operating strategy under `strategy/portfolio-operating-system/`
- add decision-log or problem-solving-log entries when meaningful decisions or issues occur
- avoid private source leakage
- avoid invented progress

## Required Inspection List

Before editing, the automation should inspect:

1. [AGENTS.md](../AGENTS.md)
2. [README.md](../README.md)
3. [START_HERE.md](../START_HERE.md)
4. [NAVIGATION.md](../NAVIGATION.md)
5. [template/README.md](README.md)
6. [REPO_SEED_BLUEPRINT.md](REPO_SEED_BLUEPRINT.md)
7. [IMPORT_INSTRUCTIONS.md](IMPORT_INSTRUCTIONS.md)
8. [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md)
9. [prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md](../prompts/WEEKLY_PROOF_OF_WORK_COMPILER.md)
10. [LLM_BOOTSTRAP_REPO_PROMPT.md](LLM_BOOTSTRAP_REPO_PROMPT.md)
11. [SOURCE_MAP.md](../SOURCE_MAP.md)
12. [PROOF_OF_WORK.md](../PROOF_OF_WORK.md)
13. [PROJECT_STATUS.md](../PROJECT_STATUS.md)
14. [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md)
15. [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md)
16. [RECRUITER_AGENT_GUIDE.md](../RECRUITER_AGENT_GUIDE.md)
17. [case-studies/](../case-studies/)
18. [logs/](../logs/)
19. [recruiter-assets/](../recruiter-assets/)
20. [strategy/](../strategy/)
21. [architecture/](../architecture/)
22. [workflows/](../workflows/)
23. [diagrams/](../diagrams/)
24. [weekly-input/](../weekly-input/)
25. [tasks/lessons.md](../tasks/lessons.md)

If local source indexes are available, inspect `internal/LOCAL_SOURCE_MAP.md` and `internal/source-indexes/*.md`. If unavailable, continue without inventing their contents.

## Recreate The Automation

If the scheduled automation is missing, recreate it with these settings:

| Setting | Value |
|---|---|
| Name | `ai-native-proof-of-work` |
| Prompt | Use [AUTOMATION_PROMPT.md](../AUTOMATION_PROMPT.md) |
| Schedule | Weekly, Sunday, 22:00 |
| RRULE | `RRULE:FREQ=WEEKLY;BYHOUR=22;BYMINUTE=0;BYDAY=SU` |
| Repository root | The local clone of `TheOneDarkHorse/ai-native-proof-of-work` |
| Environment | Worktree or equivalent isolated working copy |
| Status | Active |

If the automation runner does not support RRULE, use the closest weekly schedule available.

For another user cloning this repository, replace the target repository, local clone path, lead project, product repository URLs, source roots, weekly-input process, and automation runner with their own values before activating the schedule.

The automation should update from the user's own product repositories and evidence sources. It should not keep using Marcus's product repositories, screenshots, source summaries, or project claims after the template has been adopted by another user.

## Validation

Each run should report:

- files updated
- new artifacts
- static files changed
- job-agent handoff status
- reusable-template updates
- weekly input used or missing
- project proof-point updates
- timeline updates
- source index status
- validation run and result
- commit and push status
- blockers
- open questions
- one concrete next action

At minimum, validate:

```powershell
git status --short --branch
git diff --check
```

For changed Markdown files, perform targeted link checks. For changed recruiter-facing files, scan for private paths, secrets, raw chats, credentials, and sensitive personal data.

## Safety Rules

- Do not stage unrelated user changes.
- Do not use broad staging such as `git add -A`.
- Do not commit local source indexes unless explicitly approved.
- Do not commit `.env`, credentials, raw logs, runtime state, or private local paths.
- Do not claim new progress without verified input, repo-visible changes, or explicit user-provided evidence.
- If no verified new source material is available, record that directly instead of inventing an update.
