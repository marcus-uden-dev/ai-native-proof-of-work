# Release Notes

## 2026-10-24 — Recruiter Evidence Review: Decision History and Review Tooling

**Evidence state:** Public site and tooling changes merged to `main` between
2026-09-27 and 2026-10-21 and checked by the repository's contract and release
tests (internal evidence). This is a portfolio presentation and tooling update,
not a product release and not market-validated.

### Problem

A reviewer who opens the portfolio has little time. The public decision log held
few entries, so the story behind the work was hard to follow. Reviewing a single
role against the evidence meant reading several pages. The release checks also
failed on shallow CI checkouts, which blocked evidence updates.

### Decision

Make the evidence easier to scan and easier to audit, without changing what the
evidence claims.

- Rationale beyond making the review path shorter: Needs Review.
- Alternatives considered: Unknown.

### What changed

**For reviewers**

- **Role review summary.** The role review page now opens with a short executive
  scan, so a reviewer sees the fit summary before the detail.
- **Role narrative ledger.** Each role requirement links to the evidence that
  supports it, in one ledger instead of several pages.
- **Clearer review prompts.** The prompts that help a reviewer check a role
  against the evidence now state what they cover, and the review mode controls
  work again after a layout regression.
- **Project Replay.** The replay view shows a clearly marked work-in-progress
  frame, only while the replay is live.
- **Simpler evidence actions.** Evidence buttons and captions use one consistent
  style, and the Job-agent and company-research proof pages show their key frames
  first.

**Evidence depth**

- **Decision log.** The public decision log grew from a short list to 176
  entries after historical decisions were added. Entries judged unsafe to publish
  were filtered out, and summaries were rewritten to be specific. Filter counts
  on the page are now derived from the data.
- **Resume theme decision.** A verified decision on the resume theme was added to
  the public log.
- **Technology capability catalog.** New tooling builds a catalog of the
  technologies used across the work, with a runbook, a validator and a state
  legend that avoids unverified "live" claims.
- **Prototype library.** One command now serves the design prototypes used to
  explore the role-fit views.

**Reliability**

- Release validation now restores full Git history on shallow CI checkouts and
  normalizes line endings, so the same checks pass in CI and on a local machine.

### Result and limits

Directly observed: the changes are merged, the site renders the new views and
the contract tests pass.

- Whether reviewers find the roles faster or decide differently: Not measured.
- Customer or market validation: No evidence.
- The decision log shows decisions, not their outcomes. Backfilled entries
  record what the repository history supports, not full reasoning.

### Proof interpretation

**Work:** Shortened the path from a role to its supporting evidence and
widened the public decision record.

**Evidence:** `site/evidence/decision-log.json` (176 entries),
`docs/TECHNOLOGY_CATALOG_RUNBOOK.md`, `docs/prototypes/`, contract and browser
tests in `tests/`.

**Judgment:** Filter unsafe entries before publishing; keep claims tied to
checked evidence. Rationale beyond this: Needs Review.

**Signal:** Execution, Evidence discipline, Systems thinking. Product judgment
and business outcome are not supported by this evidence alone.

### Validation

- Passed `npm run test:contracts` with 99 passing checks.
- Passed `npm run release:validate`.
- Passed `git diff --check`.
- Browser tests (`npm run test:e2e`) and the pull request validation workflow run
  in CI before merge.

## 2026-10-22 — Personal AI Harness: Agent Lifecycle Evidence

**Evidence state:** Verified on the machines where each control runs (internal
evidence). The harness report remains marked pending review. This is not a
product release and not market-validated.

### Problem

Written rules and runtime behavior had drifted apart. The audit that opened the
October 15 to October 22 period found, among other things, a documented hook
that no longer existed, an allow-list that permitted merges the workflow said
were never authorized by default, three entrypoint files with diverging copies
of the same rules, and a configuration regression that capped one agent's skill
context at 1,000 tokens. Text-only rules could not catch any of these.

### Decision

Audit first and change nothing, record 16 lifecycle decisions in one decision
record (one owning file and one acceptance test each), then replace sentence-level
rules with a hook, a configuration value or a test.

- Decision rationale beyond the audit findings: Needs Review.
- Alternatives considered: Unknown.
- Documented trade-off: broad automation was held back where consequences are
  hard to reverse (see Risk handling).

### Public evidence

- Added a public-safe report covering the lifecycle work, including the problem,
  implemented controls, evidence, risks, limits, and next steps.
- Added ten decision-log entries for the Personal AI Harness, with verified and
  planned work clearly distinguished.
- Updated the static homepage timeline, recursive-workflow page, and repository
  evidence index to expose the new lifecycle evidence.

### Controls

- **Merge gate.** A shared pre-tool hook in both agents blocks a merge unless the
  PR is not a draft, the merge state is clean, checks pass (or, without CI, the
  PR body has a Verification section) and no review thread is open. It fails
  closed when GitHub cannot answer.
- **Thin entrypoints.** Shared rules come from one source file; a sync script
  writes each agent's entrypoint and a check fails on drift.
- **Checkpoint before compaction.** A pre-compaction hook writes a durable
  checkpoint; a session-start hook injects a reconcile step after compaction or
  resume.
- **Task dispatch controller.** A local task ledger owns approval, a
  one-live-dispatch lease, policy hashes, preflight, launch, verification, the
  checkpoint commit and receipts. Child agents never commit; the controller does.
- **Goal anchoring.** A silent per-session goal record, replaced by an explicit
  `goal:`; a word-overlap check flags three off-goal requests in a row, once per
  deviation.
- **Model-specific compaction.** Limits near 167k tokens (180k for the most
  expensive model) instead of the default near 967k.
- **One workflow family.** Shipping, review, QA and debugging route to the same
  workflow suite in both agents; older skills stay installed for explicit use.
- **Proof capture.** A runtime-neutral Proof Record contract, schema, template
  and quality gate, with one shared skill adapter for both agents.

### Verification of the harness

- Merge gate: 43 unit cases. In live use it blocked a draft PR and two PRs with
  unresolved review threads; one thread was a valid finding and was filed, the
  other a false positive and was answered before merging.
- Dispatch controller: 34 tests on Windows and Linux; real runs with both agents;
  a sandbox two-PR run held dependency order, the gate denied a draft and a
  repeated merge was a no-op.
- Goal anchoring, before and after: sustained drift 0/2 then 2/2 flagged; long
  necessary investigation 2/2; side question and explicit goal change passed.
- Compaction: measured before and after; a live automatic compaction confirmed
  the checkpoint is written first.
- Workflow routing: a probe returned the expected skill for five intents.
- More than 30 pull requests merged, each through the same merge gate.

### Risk handling

- **Live configuration moves:** 1,199 tracked files under junction-backed
  folders were untracked (nothing on disk changed) before switching a live
  checkout, so Git could not write through the junction. A mislabeled transfer
  bundle nearly pointed the checkout at an old commit; Git refused and nothing
  was lost.
- **Branch cleanup:** only branches with unique work were merged; others were
  deleted after recording their tip commits. Deploying product repositories, the
  public site and third-party forks were held for explicit approval.
- **Own errors corrected in the record:** two merged PRs said tests had run
  while the test runner was missing on the merge host. The tests were then run
  (18 and 10 passed), both PR records were corrected and the merge helper now
  treats a missing runner as a failure. Two audit-discipline slips were
  disclosed and corrected, not hidden.

### Result and limits

Directly observed: the controls exist, are tested and blocked real violations in
live use.

- Measured outcome (time saved, defects prevented, adoption): Not measured.
- Customer or market validation: No evidence.
- The goal-anchoring evaluation used one model and two runs per case. It shows
  direction, not statistical significance.
- Codex-side checks for proof-capture visibility and native-goal resume were not
  run live because of usage limits.
- Child agents launched from the command line are not listed in either desktop
  app. Accepted for now.

### Next test

Implement and evaluate the communication-policy gap addendum (runtime inventory
across both machines, prompt-injection boundary, data-egress rules, a
deterministic readiness gate, multi-run evaluation, nudging scope and
model-fallback rules). Status: proposed plan, not implemented.

### Portfolio Site

- Opened the public proof-of-work routes without the former preview password gate.
- Refined the editorial masthead and responsive navigation across the homepage,
  CV page, and proof pages.
- Simplified the paths from portfolio claims to their supporting evidence,
  including the Job-agent and company-research proof pages.

These are portfolio presentation changes, not a new release of Job-agent or
another underlying product.

### Proof interpretation

**Work:** Moved agent lifecycle rules from documentation to enforced, tested
controls across two agents and two workstations.

**Evidence:** `docs/reports/2026-10-22-agent-harness-lifecycle-implementation.md`,
test counts, live blocks by the merge gate, before and after measurements,
corrected PR records.

**Judgment:** Audit before change; hold irreversible actions for approval; fix
and disclose own errors in the record. Rationale beyond this: Needs Review.

**Signal:** Execution, AI-native leverage, Evidence discipline, Systems thinking.
Product judgment and business outcome are not supported by this evidence alone.

### Validation

This entry changes release notes only; the harness evidence, site and index
files are unchanged from the earlier 2026-10-22 entry.

- Passed `npm run test:contracts` with 99 passing checks.
- Confirmed the repository evidence index is current with 497 chunks.
- Passed `npm run release:validate` for 181 files.
- Passed `git diff --check`.
- Browser tests (`npm run test:e2e`) and the pull request validation workflow run
  in CI before merge.
