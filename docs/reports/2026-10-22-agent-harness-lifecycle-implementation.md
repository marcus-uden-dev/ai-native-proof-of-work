---
created: 2026-10-22
author: Marcus Udén (Claude)
source_tool: Claude Code
source: implementation sessions 2026-10-15 to 2026-10-22 on the Personal AI Harness (private source repositories, pull requests, test runs and live evaluation transcripts)
type: report
status: active
review_status: pending
visibility: public-safe
tags: [personal-ai-harness, agent-lifecycle, quality-gate, evaluation]
---

# Agent harness lifecycle: from audit to enforced controls

## Summary

Between 2026-10-15 and 2026-10-22 the Personal AI Harness moved from documented intentions to enforced, tested controls. The harness runs two coding agents (Claude Code and Codex) on a Windows workstation and a Linux workstation. The work started with a read-only audit against 16 lifecycle decisions Marcus approved in advance. It ended with a merge gate, checkpoint hooks, a task-dispatch controller, goal anchoring, per-model compaction thresholds and a cross-repository branch cleanup. More than 30 pull requests were merged, each through the same merge gate.

Every change was verified on the machine where it runs. Where a check could not run, the report says so.

## Problem

Instructions said one thing and the runtime did another. Examples found by the audit:

- An instruction file claimed a context-size hook was active. The hook had been removed weeks earlier.
- The agent allow-list permitted merges that the workflow's own rules said were never authorized by default.
- The same rules were copied into three entrypoint files and had drifted apart.
- A configuration regression capped one agent's skill context at 1,000 tokens, so it silently could not see most of its skills.
- Two workflow families competed for the same jobs (shipping, review, debugging).

Text-only rules could not catch any of these. Each needed an enforced control or a test.

## Approach

1. **Audit first, change nothing.** The audit produced an inventory with file hashes, an authority matrix, 13 contradictions, a risk-ranked gap list and acceptance tests. Two audit-discipline slips (one script run before it was read, one temporary file) were disclosed and corrected. They are not hidden.
2. **One decision record.** The 16 decisions went into a single ADR. Each has one owning file and one acceptance test. Status columns are updated only with commit or test evidence.
3. **Enforce, then document.** Each control below is code, a hook or a configuration value with a test, not a sentence in a prompt.

## What was built

| Control | Mechanism | Evidence |
|---|---|---|
| Merge boundary | A shared pre-tool hook in both agents blocks a merge unless the PR is not a draft, the merge state is clean, checks pass (or, with no CI, the PR body has a Verification section), and no review thread is open. It fails closed when GitHub cannot answer. | 43 unit cases. In live use it blocked a draft PR and two PRs with unresolved review threads. One thread was a valid finding and was filed; the other was a false positive and was answered before merging. |
| Thin entrypoints | Shared rules come from one source file. A sync script writes them into each agent's entrypoint, and a check fails on drift. | The sync check runs after every core change. The duplicated rule sets are gone. |
| Checkpoint before compaction | A pre-compaction hook writes a durable checkpoint (git state, recent requests, goal). After compaction or resume, a session-start hook injects a reconcile step. | Verified with a manual compaction and a real automatic compaction. |
| Task dispatch controller | A local SQLite task ledger owns approval, a one-live-dispatch lease, policy hashes, preflight checks, launch, verification, the checkpoint commit and receipts. Child agents never commit; the controller does. Publishing and merging need explicit grants and run through the merge gate in dependency order. | 34 tests on Windows and Linux. Real runs with both agents on Windows, including resuming a Codex run in the same thread after a usage-limit interruption. A real two-PR run in a sandbox repository: the dependency order held, the gate denied a draft, and a repeated merge was a no-op. |
| Goal anchoring | A silent goal record per session. An explicit `goal:` replaces it and parks the old goal. A cheap word-overlap check flags three off-goal requests in a row, once per deviation. | Baseline evaluation found zero nudges during sustained drift (0 of 2 runs). With the check: sustained drift 2/2, long necessary investigation 2/2, side question pass, explicit goal change pass. |
| Model-specific compaction | Measured that the current models default to a 1M-token window and would compact only near 967k tokens. Per-model limits now compact near 167k (180k window for the most expensive model). | Measured before and after. A live automatic compaction confirmed that the checkpoint is written first. |
| One workflow family | Shipping, review, QA and debugging route to the same workflow suite in both agents. The older skills stay installed for explicit use. | A routing probe returned the expected skill for five intents. |
| Proof capture | A runtime-neutral contract for repo-local proof records, with one shared skill adapter installed for both agents on both machines. | Skill visibility confirmed live in one agent; the other was blocked by a usage limit at test time. |

## Risk handling

- **Live configuration moves.** Before moving a live configuration checkout between branches, 1,199 tracked files under junction-backed folders were removed from tracking (nothing on disk changed). Otherwise Git could have written or deleted shared skills through the junction. During the switch, a mislabeled transfer bundle nearly pointed the checkout at an old commit. Git refused the switch, nothing was lost, and the lesson was recorded.
- **Branch cleanup.** Branches were merged only if they had unique work. Branches whose content was already on the default branch were deleted, with their tip commits recorded first. Conflicts were resolved by union where both sides added content, or toward the newer side for generated snapshots. Product repositories that deploy, the public site and third-party forks were held for explicit approval rather than merged automatically.
- **Own errors corrected in the record.** Two merged PRs said tests had run, but the test runner was missing on the merge host. The tests were then run (18 and 10 passed), both PR records were corrected, and the merge helper now treats a missing runner as a failure.

## Limits

- The goal-anchoring evaluation used one model and two runs per case. It shows direction, not statistical significance.
- Codex-side checks for proof-capture visibility and native-goal resume were not run live because of usage limits.
- Child agents launched from the command line are not listed in either desktop app. This is accepted for now.

## Next

A communication-policy gap addendum is saved as a proposed plan. It covers a complete runtime inventory across both machines, a prompt-injection boundary, data-egress rules, a deterministic readiness gate, multi-run evaluation, the scope of the nudging setting, and model-fallback rules. None of it is implemented yet.
