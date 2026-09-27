---
created: 2026-08-28
updated: 2026-08-28
author: Marcus Udén (Codex)
source_tool: Codex Desktop
source: user request
type: handoff
status: active
review_status: pending
runtime: shared
visibility: private
tags: [handoff, claude, preview, demo, github-pages, account-safety]
---

# Session handoff

## Objective and current user intent

The user first requested a handoff to Claude and then clarified that the handoff must explain the different preview and demo pages. The user also wants the handoff to warn that the active GitHub account may need to change so the wrong account is not used for a push.

No implementation or publishing task was requested in this session.

## Current repository state

- Repository: `ai-native-proof-of-work`.
- Branch: `codex/ai-fit-career-evidence`.
- HEAD: `e9d539c39bf2ec2b68adaaeb829ad7f89b6d2a43`.
- Current `origin`: `https://github.com/marcus-uden-dev/ai-native-proof-of-work.git`.
- Working tree is dirty. Preserve existing user changes and inspect the diff before editing.
- No repository files were changed by the handoff content itself; this file is the requested repo-local handoff artifact.

## Preview and demo-page map

The following distinctions are verified from `demos/README.md`, `demos/manifest.json`, and the referenced HTML files:

- `docs/prototypes/repository-evidence-preview.html` — internal recruiter/evidence prototype, explicitly marked WIP/private and not published.
- `demos/index.html` — lightweight demo portal/index page that links to the supporting project previews.
- `demos/job-agent/index.html` — app-faithful clickable Job-agent UX snapshot. This is the strongest local demo surface.
- `demos/index.html#pkm` — lightweight synthetic PKM concept preview.
- `demos/index.html#household-budget` — lightweight synthetic Household Budget concept preview.
- `demos/archive/job-agent-concept/index.html` — older archived Job-agent concept, not the current UX baseline.

The local `demos/` files are source/repository artifacts. They do not become a public website merely because they exist in this repository.

## Separate public demo deployment and account boundary

Repository documentation records the older public demo deployment as:

- Public demo repository: `https://github.com/TheOneDarkHorse/ai-native-proof-of-work-demo`
- Published demo URL: `https://theonedarkhorse.github.io/ai-native-proof-of-work-demo/`

This is separate from the current source/evidence repository owned by `marcus-uden-dev`. The published URL is therefore associated with the `TheOneDarkHorse` owner, while the current repository remote points to `marcus-uden-dev`. The old published demo is documented as an archived/stale V1 snapshot; the local Job-agent snapshot is more current according to the repository documentation. Re-verify the live deployment before describing it as current.

If the goal is to publish Pages from the current repository instead, the likely project-site URL would be under the current owner, for example `https://marcus-uden-dev.github.io/ai-native-proof-of-work/`, but that is only valid after Pages is configured and deployed from the intended source. Do not treat this URL as verified live evidence without checking it.

## GitHub account and push safety

Before any push, distinguish these four identities:

1. Browser account currently logged in to GitHub.
2. Repository owner encoded in `origin`.
3. Authentication account used by HTTPS credentials, SSH keys, or GitHub CLI.
4. Commit author identity from `git config user.name` and `git config user.email`.

The commit author settings do not determine the push destination. A wrong authentication account can cause a rejected push, a push to an unintended repository, or a commit that is attributed to the wrong account. A wrong repository owner can also publish Pages under the wrong account and URL.

Safe pre-push checks:

```powershell
git remote get-url origin
git branch --show-current
git config --get user.name
git config --get user.email
gh auth status --active
git push --dry-run origin HEAD
```

If GitHub CLI has multiple accounts, the intended account can be selected explicitly with:

```powershell
gh auth switch --hostname github.com --user YOUR_CORRECT_USERNAME
gh auth status --active
```

HTTPS credentials cached by Git Credential Manager and SSH key selection are separate concerns. Verify which authentication path the repository uses before assuming that changing the browser account or GitHub CLI account changes Git push authentication.

## Existing working-tree changes

Modified tracked files:

- `.gitignore`
- `RECRUITER_AGENT_GUIDE.md`
- `docs/plans/2026-08-25-004-feat-private-profile-oracle-preview-and-automation-smoke-plan.md`
- `docs/plans/2026-08-25-005-feat-public-profile-oracle-integration-plan-for-plan.md`
- `docs/prototypes/repository-evidence-preview.html`
- `llms.txt`
- `logs/DECISION_LOG.md`
- `recruiter-assets/INFORMATION_DIET.md`
- `repository-evidence-index.json`
- `tasks/2026-08-25-replace-profile-oracle-with-repository-interview.md`

Untracked paths:

- `docs/drafts/`
- `docs/plans/2026-08-25-repository-consolidation-and-source-of-truth-plan.md`
- `logs/automation-smoke/2026-08-25-ai-fit-repository-interview-saab-smoke.md`
- `prompts/REPOSITORY_INTERVIEW_PROMPT.md`

The tracked diff was previously observed at approximately 150 insertions and 34 deletions across 10 files. Re-run `git diff --stat` before acting; this is a snapshot, not a completion claim.

## Authoritative orientation references

- `AGENTS.md` — repository mission, privacy rules, evidence labels, weekly-run contract, and definition of done.
- `START_HERE.md` — recruiter-facing orientation and primary reading order.
- `SOURCE_MAP.md` — evidence boundaries and source availability.
- `PROJECT_STATUS.md` — project status and open work.
- `demos/README.md` — demo scope, public-demo relationship, and data rules.
- `demos/manifest.json` — snapshot metadata, paths, published URL, and status labels.
- `docs/prototypes/repository-evidence-preview.html` — explicit private-preview/WIP boundary.
- `logs/DECISION_LOG.md` — decisions and trade-offs.
- `RECRUITER_AGENT_GUIDE.md` and `llms.txt` — recruiter/LLM reading guidance.

## Constraints

- Preserve the dirty worktree. Do not reset, discard, stash, commit, push, or create a pull request unless the user explicitly requests that action.
- Do not publish a preview or demo without checking the intended repository, Pages source, GitHub owner, and authentication account.
- Do not fabricate current deployment status, metrics, evidence, or project maturity.
- Keep recruiter-facing material free of private local paths, credentials, raw chat logs, and sensitive personal information.
- This handoff transfers context only. It does not authorize edits, deployment, account changes, or pushes.

## Suggested skills

- `handoff` — use the canonical shared handoff skill for future transfers and repo-local destination routing.
- `ce-code-review` — only if the user requests a review of the current diff.
- `ce-commit-push-pr` — only if the user explicitly requests commit, push, or pull-request work and the GitHub account pre-flight passes.

## Verification performed

- Re-read the earlier temporary handoff before creating this updated snapshot.
- Confirmed current branch, HEAD, origin, and dirty working-tree state.
- Reviewed the demo README, manifest, relevant prototype, and repository references for preview/demo distinctions.
- Confirmed this repo-local handoff exists at `docs/handoffs/2026-08-28-handoff-to-claude-previews-and-github-identity.md`.

## Recommended continuation

If Claude receives a new implementation request, it should first re-read `AGENTS.md`, inspect `git status` and the relevant diff, identify whether the intended target is the current source repository or the separate public demo repository, and verify the GitHub account before any push. If no concrete next objective is provided, report that the handoff is loaded and wait for direction.

## Continuity warning

This repo-local file is the canonical handoff for this request. The earlier AppData temporary copies were only intermediate artifacts created by the handoff skill's default storage rule and should not be used as the receiving source.
