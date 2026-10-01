---
created: 2026-10-01
author: Marcus Udén + Codex
source_tool: Codex Desktop
source: Historical decision backfill run
type: ops-run
status: in-progress
review_status: objective-gates
tags: [historical-decisions, decision-log, evidence, github-pages, automation]
---

# Historical decision backfill run

## Outcome

The private inventory now contains 20 normalized candidates. Fifteen passed the private publish state; five remain held with an explicit failed gate and automatic retry condition. The private decision log received eight previously missing historical decision trails without duplicating existing entries.

## Publication result

- Public decision records added: 2.
- Already represented public candidates: 13.
- Held candidates exported: 0.
- Public commits: `d0b78c2` (historical evidence) and `97428ea` (generated evidence-index refresh).
- GitHub Pages state: pending the Quality workflow for `97428ea`.

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Private inventory validator | Pass | 15 tests pass; normalized inventory is valid. |
| Public decision-log contract | Pass | 7 tests pass. |
| Static decision-log projection | Pass | Renderer check passes. |
| Public evidence-index projection | Pass | Generated index check passes after regeneration. |
| Public project-replay projection | Pass | 4 project-replay contract tests pass after regeneration. |
| Public release validation | Pass | Public release validator passes for 162 files. |
| Public end-to-end browser tests | Pending CI | Playwright is not installed in the isolated release clone. |

## Hold register

| Candidate class | Count | Failed gate | Automatic retry condition |
|---|---:|---|---|
| Planned extraction workflow | 1 | `grounded_evidence` | Verified implementation evidence becomes available. |
| Shared-source candidates | 4 | `source_availability` | A verified repository-visible source becomes available. |

## Recovery note

The first public Quality run failed because generated public evidence artifacts were stale after a concurrent upstream update. The run regenerated the repository evidence index and the project-replay static fallback, then reran the affected gates. The corrected follow-up commit triggered a new Quality workflow.

## Next automatic action

The weekly compiler should retry held records only when their recorded source or evidence gate changes. It should publish other eligible records without waiting for a manual approval queue.
