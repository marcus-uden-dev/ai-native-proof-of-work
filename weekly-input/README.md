# Weekly Input

Status: Active / Compiler input

## Purpose

Use this folder as the clean input layer for the weekly proof-of-work compiler.

The automation should not rely on raw chats or session logs as its main source. Raw sessions are noisy, private, and easy to overinterpret. Instead, capture the week as short, evidence-labeled notes here, then let the compiler translate those notes into recruiter-safe updates.

## How To Use

1. Copy [TEMPLATE.md](TEMPLATE.md) to a dated weekly file, for example `2026-W19.md`.
2. Fill only the sections that changed.
3. Link to safe evidence where possible.
4. Mark uncertain claims as `Needs Review`, `Hypothesis`, or `Open Question`.
5. Do not paste raw private logs, credentials, personal data, or private local paths.

## What Belongs Here

- project progress
- shipped or verified features
- blockers
- decisions
- product insights
- business model or pricing changes
- QA findings
- recruiter feedback
- screenshots or evidence candidates that need review
- lessons that should become durable instructions

## What Does Not Belong Here

- raw Claude/Codex sessions
- private emails
- credentials or tokens
- personal data
- unreviewed screenshots
- large logs
- local machine paths
- speculative claims written as facts

## Compiler Rule

When a weekly input file exists for the current period, the compiler should treat it as the primary source for new updates, then cross-check it against:

- [PROJECT_STATUS.md](../PROJECT_STATUS.md)
- [PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md)
- [PROJECT_TIMELINE.md](../PROJECT_TIMELINE.md)
- [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md)
- [logs/DECISION_LOG.md](../logs/DECISION_LOG.md)
- internal source indexes, if available

If no weekly input file exists, the compiler may still update from verified repo-visible changes and source indexes, but it must not invent missing progress.
