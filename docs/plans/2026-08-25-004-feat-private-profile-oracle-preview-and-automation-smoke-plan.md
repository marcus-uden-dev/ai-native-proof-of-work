---
title: Private profile oracle preview and automation smoke test
type: feat
date: 2026-08-25
topic: private-profile-oracle-preview-automation-smoke
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: user-request
execution: code
---

# Private Profile Oracle Preview and Automation Smoke Test

## Goal Capsule

### Objective

Recruiters can see a clearly marked WIP entry point from the public GitHub profile, while the profile-oracle preview and its supporting evidence remain private until reviewed. One bounded automation smoke run confirms that the oracle inputs and output checks behave correctly without publishing private artifacts.

### Means

Keep `docs/prototypes/profile-oracle-preview.html`, `profile-oracle.json`, and the historical inventory in the internal proof-of-work repository; add a safe WIP link to the public GitHub profile surface; run the existing automation in a dry-run or local validation mode with no public-site write or push.

### Authority and stop conditions

- The user request and repository `AGENTS.md` govern scope and privacy.
- The source repository is the canonical evidence source.
- The public site is a curated release surface, not a mirror.
- Stop before publication if GitHub identity, public-boundary validation, or dry-run isolation cannot be verified.

## Product Contract

### Problem Frame

The profile-oracle preview exists as a private prototype, but the public profile has no clear signal that this work is underway. A scheduled compiler must also be tested against the new oracle contract without accidentally exposing internal plans, prototypes, local paths, or unreviewed historical claims.

### Requirements

- **R1 — Private preview:** Keep the profile-oracle HTML preview and internal oracle source files out of the public staging release.
- **R2 — WIP disclosure:** Add a visible `WIP` or equivalent label to the private preview and to the public profile link.
- **R3 — Safe profile link:** Add a working public-profile link to the canonical proof-of-work repository or another public-safe landing surface; do not link to a private local file or an unpublished route as if it were live.
- **R4 — Oracle-first contract:** Keep the machine-readable oracle as the agent-facing projection and preserve links to the inventory and evidence boundary.
- **R5 — Smoke run:** Execute one bounded automation run or equivalent runner path that parses the oracle, validates tags and evidence references, and proves that no private preview is copied to the public staging checkout.
- **R6 — Traceability:** Record the smoke-run result, boundary, and any limitation in the repository's operational documentation or run output.

### Acceptance examples

- **AE1:** A reviewer opening the source preview sees `Private preview` and `WIP`, and the file remains absent from the public staging release.
- **AE2:** A visitor opening the public GitHub profile sees a WIP-labelled link that resolves to a public-safe repository or landing page, not a local path.
- **AE3:** A smoke run reports the oracle record count, valid project assignments, known tags, resolved repository references, and a no-public-write result.
- **AE4:** If the automation cannot run through its native scheduler, the result clearly states that limitation and runs the closest safe local validation instead of claiming a full scheduled execution.

### Scope boundaries

In scope: the private preview status, public profile WIP link, oracle and inventory validation, one isolated smoke run, and documentation of the boundary.

Out of scope: publishing the preview, changing the scheduled cadence, exposing raw harness files, bulk backfill beyond the existing inventory, or changing GitHub account permissions.

## Planning Contract

### Key technical decisions

- **KTD1 — Private source of truth:** The source repository owns the preview and oracle artifacts. The public staging repository receives only explicitly allowlisted, sanitized profile links or summaries.
- **KTD2 — Safe WIP link target:** The public profile link targets the canonical public repository or public site root, with copy that states the oracle is still private WIP. This keeps the link resolvable without exposing unpublished files.
- **KTD3 — Dry-run boundary:** The smoke run must not push, publish, or modify the public staging checkout. A native scheduler run is acceptable only when an explicit dry-run or isolated workspace boundary is available.
- **KTD4 — Validation before claims:** Counts and status are derived from JSON and repository checks. No new recruiter claim is added from the smoke run itself.

### Sequence

1. Inspect the source and public profile surfaces plus current GitHub identity.
2. Add and review this plan, then update the private preview and profile link.
3. Run the bounded automation smoke path with a rollback point and no public push.
4. Validate JSON, tags, links, privacy boundary, and public release constraints.
5. Commit only the source-repo changes. Leave public staging uncommitted unless the profile link was explicitly added there and its unrelated work is preserved.

### Risks and dependencies

- GitHub profile writes require the `marcus-uden-dev` account, not `TheOneDarkHorse`.
- The existing scheduled prompt may be broader than this smoke test. If no runner supports isolation, use the local validation path and report it as a partial smoke test.
- The public staging checkout contains unrelated dirty files. Do not stage or reset them.

## Implementation Units

### U1. Mark the private preview and preserve its boundary

**Goal:** Make the existing preview visibly private WIP and keep its source-only links accurate.

**Requirements:** R1, R2, R4.

**Files:** `docs/prototypes/profile-oracle-preview.html`, `README.md`, `NAVIGATION.md`, `llms.txt` if link wording requires adjustment.

**Approach:** Add a concise status banner and verify that all preview links are repository-relative or public-safe. Do not add the preview to public staging.

**Test scenarios:** The preview contains the private/WIP marker; all referenced local artifacts exist; no private local filesystem path appears.

**Verification:** Targeted HTML and path checks, privacy scan, `git diff --check`.

### U2. Add WIP-labelled GitHub profile links

**Goal:** Give the public GitHub profile a working, honest entry point for the in-progress oracle work.

**Requirements:** R2, R3.

**Files:** The canonical GitHub profile README repository, or the public staging profile surface if that is the actual configured profile entry point.

**Approach:** Confirm the canonical surface and active account first. Add a short WIP-labelled link to the public-safe repository/site root. Keep the unpublished preview and private local paths out of the target.

**Test scenarios:** Link target resolves; link copy says WIP/private; public release validation passes if the staging site changes.

**Verification:** Markdown/HTML link check, `gh auth status`, and public release validation where applicable.

### U3. Run an isolated automation smoke test

**Goal:** Confirm that one automation execution can read and validate the oracle contract without public side effects.

**Requirements:** R4, R5, R6.

**Files:** Existing automation config and a dated run record only if the runner produces one; do not edit the schedule unless required.

**Approach:** Preserve a rollback copy, run the native automation in dry-run mode if available, otherwise run the repository-local validation path with an explicit partial-run label. Check record counts, tags, evidence references, and public-boundary exclusion.

**Test scenarios:** Valid oracle passes; unknown tags or missing refs fail; the public staging checkout has no new private preview file; no push occurs.

**Verification:** Smoke-run output, JSON checks, `git status` comparison for public staging, and Drive spill guard before/after any automation change.

### U4. Final verification and source commit

**Goal:** Leave a reviewable, recoverable source-repo change set.

**Requirements:** R1–R6.

**Files:** Only files changed by U1 and any source-owned run record.

**Approach:** Inspect the diff, run repository checks, preserve unrelated changes, and commit locally. Do not push the private preview.

**Test scenarios:** Source repo is clean after commit; public staging remains unchanged except for an explicitly approved profile-link change; all claims remain evidence-bounded.

**Verification:** `git diff --check`, targeted JSON/link/privacy checks, relevant repo validation, and final status checks.

## Verification Contract

Run from the source repository:

```powershell
git status --short
node -e "const fs=require('fs'); for (const f of ['profile-oracle.json','docs/evidence/historical-decision-inventory.json']) JSON.parse(fs.readFileSync(f,'utf8')); console.log('JSON OK')"
git diff --check
```

Also verify:

- every oracle tag is in `logs/DECISION_LOG_TAGS.md`;
- every repository-relative evidence reference resolves;
- the private preview has its WIP/private marker;
- the public staging release does not contain `docs/prototypes/profile-oracle-preview.html` or private local paths;
- the smoke run reports whether it was native scheduled execution or a safe local equivalent;
- `Test-AgentDriveSpillGuard.ps1` passes before and after any automation edit;
- `Test-CanonicalSurfaceSync.ps1` is run if canonical agent/runtime surfaces are changed.

## Definition of Done

- [ ] The plan is saved as a CE unified implementation-ready plan.
- [ ] The preview is private, visibly WIP, and linked from internal navigation.
- [ ] The canonical public GitHub profile has a working WIP-labelled public-safe link.
- [ ] One isolated automation smoke run is completed or its runner limitation is recorded without overstating success.
- [ ] Oracle JSON, tags, references, privacy boundary, and public release checks pass.
- [ ] No unrelated dirty files are staged or reset.
- [ ] The source-repo commit is local and reviewable; no private preview is pushed.
- [ ] Abandoned experimental files or temporary smoke artifacts are removed unless they are documented, reusable outputs.

## Appendix

Relevant existing artifacts:

- `profile-oracle.json`
- `docs/evidence/historical-decision-inventory.json`
- `docs/prototypes/profile-oracle-preview.html`
- `docs/plans/2026-08-24-003-feat-historical-decision-and-harness-backfill-plan.md`
- `C:\Users\marcu\.codex\automations\ai-native-proof-of-work\automation.toml`
- `C:\Users\marcu\code\ai-native-proof-of-work-public-staging\site\index.html`
