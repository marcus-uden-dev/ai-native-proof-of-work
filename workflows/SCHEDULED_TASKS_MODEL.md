# Scheduled Tasks Model

Last updated: 2026-05-18
Status: Active design

## Purpose

Scheduled tasks reduce the chance that useful work disappears into chats, notes, local projects, or memory.

## Task Layers

| Layer | Purpose |
|---|---|
| Daily verifier | Check prior outputs and evidence |
| Command center | Maintain overview |
| Recruiter follow-up | Track job/recruiter signals |
| Source quality filter | Separate useful sources from hype |
| Proof-of-work compiler | Turn weekly product work into evidence artifacts |
| Source index refresh | Keep local project/skill maps current |
| Weekly automation runbook | Document the active weekly schedule, prompt source, validation, and recreation path in `template/` |
| Lead project handoff maintenance | Keep install, service, validation, and LLM entrypoint docs current for the lead product repo |
| Template maintenance | Keep the reusable, LLM-agnostic seed files current without copying private evidence |
| Privacy and sharing review | Check recruiter-facing files and exports before external access is granted |
| Instruction drift audit | Remove duplicate or stale instructions |
| Kill-switch review | Disable routines that no longer produce value |

## Operating Principle

Scheduled tasks should produce artifacts, decisions, or clear next actions.

If they produce noise, they should be merged, rewritten, or disabled.

## Weekly Compiler Responsibilities

The weekly compiler should maintain both audiences:

- recruiters and hiring managers who need credible proof-of-work evidence
- another user or LLM agent who wants to reuse the repository architecture

Each run should check whether the following need updates:

- project evidence files such as `PROOF_OF_WORK.md`, `PROJECT_STATUS.md`, `PROJECT_PROOF_POINTS.md`, and case studies
- recruiter-facing summaries and role reading paths
- [../template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md) when the active schedule, prompt, runner, or validation contract changes
- `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md` when setup, services, ports, validation, dependencies, or LLM entrypoints changed
- `template/REPO_SEED_BLUEPRINT.md` and `template/LLM_BOOTSTRAP_REPO_PROMPT.md` when the reusable template model changes
- privacy boundaries before anything is shared outside the private repo

No task should invent progress. If there is no verified new material, the output should say so directly and list the missing input needed for the next useful run.
