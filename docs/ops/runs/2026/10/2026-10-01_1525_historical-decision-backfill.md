---
created: 2026-10-01
author: Marcus Udén + Codex
source_tool: Codex Desktop
source: Historical decision backfill run
type: ops-run
status: complete
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
- Public commits: `d0b78c2` (historical evidence), `97428ea` (generated evidence-index refresh), and `56f9ec0` (filter-count test made data-driven).
- GitHub Quality passed for `56f9ec0`; the Deploy Pages workflow then passed. The live public JSON returned HTTP 200 with 20 records and 7 Job-agent records.

## Gates

| Gate | Result | Evidence |
|---|---|---|
| Private inventory validator | Pass | 15 tests pass; normalized inventory is valid. |
| Public decision-log contract | Pass | 7 tests pass. |
| Static decision-log projection | Pass | Renderer check passes. |
| Public evidence-index projection | Pass | Generated index check passes after regeneration. |
| Public project-replay projection | Pass | 4 project-replay contract tests pass after regeneration. |
| Public release validation | Pass | Public release validator passes for 162 files. |
| Public end-to-end browser tests | Pass | 84 Playwright tests pass after locked dependencies are installed in the isolated release clone. |
| GitHub Quality | Pass | [Quality run 36913121951](https://github.com/marcus-uden-dev/ai-native-proof-of-work/actions/runs/36913121951). |
| GitHub Pages deployment | Pass | [Deploy Pages run 36913377868](https://github.com/marcus-uden-dev/ai-native-proof-of-work/actions/runs/36913377868); live public JSON returned HTTP 200. |

## Hold register

| Candidate class | Count | Failed gate | Automatic retry condition |
|---|---:|---|---|
| Planned extraction workflow | 1 | `grounded_evidence` | Verified implementation evidence becomes available. |
| Shared-source candidates | 4 | `source_availability` | A verified repository-visible source becomes available. |

## Recovery note

The first public Quality run failed because generated public evidence artifacts were stale after a concurrent upstream update. The run regenerated the repository evidence index and the project-replay static fallback. The next Quality run exposed stale hard-coded E2E filter counts after the public decision-log total grew. The test now derives counts from the same public decision-log JSON that drives the page. Quality and deployment passed after that root-cause fix.

## Next automatic action

The weekly compiler should retry held records only when their recorded source or evidence gate changes. It should publish other eligible records without waiting for a manual approval queue.
