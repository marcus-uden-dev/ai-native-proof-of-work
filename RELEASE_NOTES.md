# Release Notes

## 2026-10-22 — Agent Harness Lifecycle Evidence

### Features

- Added a public-safe report covering the Personal AI Harness lifecycle work
  completed from October 15 through October 22, including the problem,
  implemented controls, evidence, risks, limits, and next steps.
- Added ten decision-log entries for the Personal AI Harness, with verified and
  planned work clearly distinguished.
- Updated the static homepage timeline, recursive-workflow page, and repository
  evidence index to expose the new lifecycle evidence.

### Portfolio Site

- Opened the public proof-of-work routes without the former preview password gate.
- Refined the editorial masthead and responsive navigation across the homepage,
  CV page, and proof pages.
- Simplified the paths from portfolio claims to their supporting evidence,
  including the Job-agent and company-research proof pages.

These are portfolio presentation changes, not a new release of Job-agent or
another underlying product. The harness report remains marked pending review.

### Validation

- Passed `npm run test:contracts` with 99 passing checks.
- Passed `npm run test:e2e` with 94 passing browser checks.
- Passed `npm run release:validate` for 181 files, including a run that treated
  private account, email, and machine identifiers as forbidden.
- Confirmed the repository evidence index is current with 497 chunks.
- Passed `git diff --check` and the pull request validation workflow.
