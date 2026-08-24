# Weekly Proof-of-Work Compiler Note — 2026-06-05

Status: Verified / partial GitHub connector run
Time spent: Estimated / not directly tracked.

## Scope

This run retried GitHub export from ChatGPT using the GitHub connector after a prior run could not write to the canonical proof-of-work repository.

Canonical repository: `marcus-uden-dev/ai-native-proof-of-work`

## Instruction Source

- `AGENTS.md` was read from the canonical repository before writing.
- The run followed the repo rule that claims must be source-grounded, uncertainty must be labeled, and recruiter-facing files must not include private paths, raw chats, personal data, secrets, or sensitive internal details.

## Source Repositories Inspected

GitHub commit search was run for recent work since 2026-05-29 across the requested product/app repositories, with product repositories prioritized.

### Job-agent

Evidence status: Verified
Repository: `TheOneDarkHorse/job-agent`

Recent verified commits found during this run:

| Commit | Date | Evidence |
|---|---:|---|
| `891f8215ed16f67a58ce1b7ba39ea193c767598e` | 2026-06-05 | Docs update: migration count corrected and personal-context mining todo closed |
| `fe27bac1108fc891a4fece98073330d0c3611668` | 2026-06-04 | Docs update: inline rewrite editor backlog |
| `c6f4afc60ec0dc07addd2dc65e7345e9477db5df` | 2026-06-04 | Feature: finish personal context mining |
| `9241de64cfddea0e5f71a803832ce67c4d6bd38d` | 2026-06-04 | Merge instruction-drift-hardening branch with PS1 hooks, scripts, skills |
| `04c6fa4df07a45639f9a2a40bf4594beabc19861` | 2026-06-04 | Harden instruction drift checks |
| `0b7a66eb47304bc45b0edfd36f968aac38448318` | 2026-06-04 | Add request size limits to context mining endpoints |
| `3b155e3c32b094231532c5938c7aa74b1802856b` | 2026-06-03 | Guard against `None` values in context-mining duplicate detection |
| `a8be0ff9e15a3526377a6ad1c4fb61e7a3218cc2` | 2026-06-02 | Review-queue ops run documenting branch audit findings |

## Key Proof-of-Work This Week

1. Verified recent `job-agent` work around personal-context mining, request-size limits, duplicate-detection robustness, instruction-drift hardening, and ops/run documentation.
2. Verified that the GitHub connector has write permission to the canonical proof-of-work repository.
3. Added this minimal run note directly to the canonical repository because the connector exposed safe single-file writes but did not expose enough repository tree/listing operations in this environment for a full multi-file compiler update.

## Claims That Need Evidence Before Promotion

| Claim | Missing Evidence | Suggested Fix |
|---|---|---|
| Full test-suite success for the recent job-agent changes | Workflow-run or test output was not inspected in this run | Inspect GitHub Actions/status checks or source test logs before promoting |
| Production deployment or user impact | No deployment/user metrics inspected | Keep as Open Question until verified |
| PKM and household-budget updates this week | No recent commit evidence surfaced in the inspected search result excerpt | Run repo-specific commit scans or compare refs before updating case studies |
| Install/handoff changes after the latest job-agent commits | Source docs were not fully fetched in this run | Fetch and inspect handoff/setup docs before updating install guide |

## Problems / Blockers

| Problem | Current Handling | Next Action |
|---|---|---|
| GitHub connector supports file fetch/write, but the visible tool set did not provide full directory listing or PR creation in this run | Wrote a single conservative run artifact instead of overwriting canonical summary files | Run the compiler from a full git checkout or enable connector operations for branch/PR and directory listing |
| Multi-file updates risk overwriting useful prior work without reading each existing file fully | Avoided broad replacement updates | Fetch target files individually before any future update |
| Product repos were searched by commits, but not fully diff-reviewed | Claims limited to commit messages and metadata | Inspect commit diffs and workflow status before promoting recruiter-facing claims |

## Decision

Decision: Use this run as a conservative export marker, not a full weekly proof-of-work promotion.

Context → The prior attempt failed because GitHub access was unavailable. This retry confirmed write access and found recent source-repo evidence.

Options Considered → Broad multi-file overwrite, no write, or a minimal run note.

Tradeoffs → A broad overwrite could damage curated recruiter docs without full file inspection. No write would fail the user's explicit request to retry GitHub export despite connector access now working.

Decision → Write one append-only dated artifact under `logs/weekly-runs/`.

Evidence → Canonical repo metadata showed push/admin permissions. `AGENTS.md` was fetched. Recent `job-agent` commits were found through GitHub commit search.

Open Questions → Whether workflow runs/tests passed for the recent job-agent commits; whether PKM, household-budget, git-connect-hub, PostNord prototypes, or llm-agent-setup had meaningful product changes this week.

Next Action → Run a full repo-checkout compiler pass that fetches each target Markdown file, inspects source repo diffs/workflow runs, and updates the canonical summary files without overwriting prior curated content.
