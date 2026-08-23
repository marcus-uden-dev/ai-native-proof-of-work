# Plan for the Plan: Recursive Workflow Page Content Depth

Mode: Implementation / repo work

## 1. Objective

`site/proof/recursive-workflow/index.html` (in the public-staging repo) currently states the two loops, a one-line Autoresearch claim, a one-line daily-automation claim, and four abstract promotion/human-gate/kill-switch bullets — no named example of an actual promotion, no concrete quality-filter criteria, no reference to the task layers that make "daily automation" true, and no visual. Marcus flagged it needs more substance. The eventual implementation plan (via `/compound-engineering:ce-plan`) must decide which additional content earns a place on this page and which stays out, without turning it into a second lead case (R34) or overclaiming autonomy (Scope Boundaries).

## 2. Final artifact target

An implementation plan (`ce-plan` output) scoped to `site/proof/recursive-workflow/index.html` and its supporting CSS, listing concrete content additions as Implementation Units, each traced to a private-repo source document — followed by `ce-work` execution.

## 3. Inputs to examine

- `architecture/RECURSIVE_WORKFLOWS.md` — core loop diagram, "What Gets Promoted" table, "What Gets Deleted" list, human gate rule. Already partially used; the promotion/deletion **tables** were paraphrased into prose, losing the pattern→destination mapping.
- `architecture/AUTORESEARCH_MODEL.md` — research loop, source-quality criteria table, promotion rules, anti-duplication rule. Already partially used; the quality-criteria table was never surfaced — the page currently says "filter for quality" with no stated bar.
- `workflows/SCHEDULED_TASKS_MODEL.md` — the actual task-layer list (12 named layers: daily verifier, command center, recruiter follow-up, source quality filter, proof-of-work compiler, source index refresh, weekly automation runbook, lead-project handoff maintenance, template maintenance, privacy/sharing review, instruction drift audit, kill-switch review). Currently only one example (the weekly compiler) is used; the rest of the list is unused evidence.
- `workflows/REVIEW_AND_PROMOTION_LOOP.md` — weekly-output review loop, promotion-destination table. Used for the abstract description only; the table was not surfaced.
- `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md` — **not yet used.** Fourteen named, evidence-linked cases (e.g. "Codex tasks and lessons loop," "Custom skills as reusable workflow infrastructure," "Repo automation audit loop") each with a Verified/Internal/Needs-Review status. This is the closest thing to a concrete "here is a pattern that actually got promoted" example the repo has.
- `workflows/WORKFLOW_PHILOSOPHY.md` — **not yet used.** Ten core beliefs ("Human judgment remains the final gate," "Automate repeatable work," "Review important decisions manually") — candidate framing for a short "why this exists" line, not a new section.
- `workflows/SOURCE_QUALITY_MODEL.md` — **not yet used.** The actual quality-filter criteria table (primary source / reproducible / practical / relevant / low-hype / evidence-backed) that `AUTORESEARCH_MODEL.md` references only abstractly.
- `DESIGN.md` (public-staging repo) — component vocabulary already used on this page (`decision-grid`, `limitations-list`, `trust-notice`) and on the Job-agent case study (`proof-sequence`, `research-field`, `signal-columns`, `technical-appendix`) — the richer patterns exist and are unused on this page.
- `site/proof/job-agent/index.html` (public-staging repo) — the depth precedent R6 sets for the *lead* case (90-second summary → three-frame sequence → research → prototype → decisions → limitations → technical appendix). Read as a ceiling, not a template to copy — R34 requires this page to read as lighter than the lead case.
- The main plan's Product Contract (`docs/plans/2026-08-20-1527-feat-recruiter-first-public-proof-work-plan.md`, R11/R32-R34/F6/AE10) and its own KTD2/KTD3 rationale for why this page is deliberately a lighter shell than the case study.
- `scripts/check-public-release.mjs` (public-staging repo) — the release-gate constraints this page must keep passing (no local paths, no forbidden-identity strings, no positive-maturity wording, no root-relative or broken internal links).

## 4. Context assumptions

- Implementation target: the public-staging repository (public, live at `marcus-uden-dev.github.io/ai-native-proof-of-work`), branch `main`, committed directly (established pattern this session — no PR flow, solo repo). This planning artifact itself stays in the private working repo — the public repo's release gate rejects any file outside its allowlist, so internal planning documents don't belong there.
- Node/Playwright test stack already in place in the public repo (`npm test`, `npm run release:validate`); any new content must keep both green.
- Source material (`architecture/`, `workflows/`, `case-studies/`) lives only in this private repo and must be paraphrased, not reproduced verbatim, per the existing Risks & Dependencies note on "source fidelity" already in the main plan.
- This is content-depth work, not a new page or new requirement — no new R-IDs. The governing requirements (R11, R32-R34, AE10) are already satisfied at a pass/fail level (tests confirmed this); the question is depth and evidence quality, not correctness.
- No auth, billing, infra, or destructive changes are in scope.

## 5. Key questions to answer

- Which of the unused source material (quality-criteria table, task-layer list, promotion/deletion tables, a named case from `WORKFLOW_IMPLEMENTATION_CASES.md`) most directly strengthens R33's three claims (Autoresearch filters, daily automation bounds, promotion converts friction to infrastructure) versus which would just pad the page?
- Should the Autoresearch section name the actual quality criteria (primary source, reproducible, practical, relevant, low-hype, evidence-backed) instead of the current vague "quality filter"?
- Should the daily-automation section list more than one task layer, and if so how many before it stops being a scan and starts being a genuine second reading?
- Should a specific `WORKFLOW_IMPLEMENTATION_CASES.md` case (e.g. "Codex tasks and lessons loop," status Verified) replace the current generic promotion example with a named, evidence-linked one?
- Does the promotion/deletion section need the actual pattern→destination table (prompt→template, review step→checklist, schedule need→scheduled task, etc.), or does that tip the page toward looking like a second lead case (R34 risk)?
- Is a diagram (mermaid-style, matching the private repo's own `RECURSIVE_WORKFLOWS.md` flowchart) worth adding, given the main plan's Key Flows section already uses mermaid elsewhere and the current page has zero visuals?
- What explicitly should **not** be added — this must be answered in the plan, not left implicit (Marcus's instruction).

## 6. Extraction method

For each of the 8 source documents: pull only claims that (a) are traceable to a real repo artifact per `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md`'s own evidence-status column, and (b) can be paraphrased without exposing local paths, tool names that read as internal-only (Codex/Claude session mechanics), or private file paths. Reject anything marked only "Internal source scan found" with no verifiable evidence — those are candidates for the *exclusions* list, not the content.

## 7. Synthesis method

Bias toward **grounding existing claims**, not adding new sections. The page's structure (Two loops → Autoresearch → Daily automation → Promotion/human gate/kill switch) already matches R33's three required claims — the fix is depth within each, plus one concrete named example, not a longer page with more headings. Prefer one well-chosen table or named case over several vague new paragraphs. Keep the page visibly lighter than the Job-agent case study (no `proof-sequence`, no `research-field` grid, no `technical-appendix`) — those belong to the lead case only, per KTD2/KTD3.

## 8. Decision criteria

- Use only claims with a Verified or clearly-scoped Internal/Verified-summary status in `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md` — reject "Needs Review" or unverifiable "Internal source scan found" rows as content sources.
- Modify only `site/proof/recursive-workflow/index.html` and `site/assets/css/site.css` (new component styling if a genuinely new pattern is needed) — no other page.
- Every added claim must cite back to a specific source document/section in the Implementation Unit, matching the existing plan's citation discipline (e.g. "drawn from `architecture/RECURSIVE_WORKFLOWS.md`'s Human Gate section").
- Defer: turning this into a fuller "case study" with its own prototype, screenshots, or technical appendix — that would cross into second-lead-case territory (R34) and isn't what "needs content" was asking for.
- Reject: any addition that would require exposing session-mechanics detail (Claude/Codex/OneDarkHorse tool-specific internals) — `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md`'s own Evidence Boundaries section already forbids this.

## 9. Proposed final output structure

The `ce-plan` output will likely propose Implementation Units along these lines (not final — `ce-plan` decides):

- Ground the Autoresearch section in the actual quality-filter criteria (from `SOURCE_QUALITY_MODEL.md`), replacing the vague "quality filter" phrase.
- Ground the daily-automation section in 2-4 named task layers (from `SCHEDULED_TASKS_MODEL.md`), not just the weekly compiler.
- Replace the generic promotion example with one named case from `WORKFLOW_IMPLEMENTATION_CASES.md` (status: Verified), keeping the existing "not autonomous self-modification" framing intact.
- Optional: a compact promotion pattern→destination reference (table or short list) grounded in `RECURSIVE_WORKFLOWS.md`'s "What Gets Promoted" table, sized to stay visibly lighter than the case study's data-dense sections.
- Explicit "Excluded from this page" note in the plan itself, listing what was deliberately left out and why (Marcus's requirement).

## 10. Acceptance criteria

The `ce-plan` output must: cite every new claim to a specific source document, keep the page's existing test coverage passing (`tests/e2e/recursive-workflow.spec.js`, `tests/e2e/accessibility.spec.js`, `npm run release:validate`), add new test scenarios for any new content block, explicitly list excluded content with one-line reasons, and not introduce a second lead-case reading of the page (R34).

## 11. Risk gates

- No credentials/secrets, auth/session, billing, infra/deploy, or destructive actions.
- Privacy-sensitive data: source material lives in a private repo and references internal tooling (Codex/Claude/OneDarkHorse session mechanics in some `WORKFLOW_IMPLEMENTATION_CASES.md` rows) — extraction must paraphrase and exclude anything that would leak that boundary. This is a content-accuracy risk, not an account/infra risk, and is handled in the decision criteria above rather than requiring a blocking approval gate.
- No external dependencies, no long-running automation.
- Net risk: low. Proceeding to bounded research and then `ce-plan` without a separate approval gate.

## 12. Failure modes

- Padding the page with paraphrased source-doc prose instead of picking the highest-value 2-3 additions (violates "needs content, not more words").
- Reproducing a `WORKFLOW_IMPLEMENTATION_CASES.md` row that's only "Internal source scan found" as if it were verified evidence.
- Letting the promotion/deletion table's richness make the page read as a second lead case (contradicts R34, KTD3, and the adversarial-review finding already on record about this page's shell being kept deliberately lighter).
- Forgetting to update `tests/e2e/recursive-workflow.spec.js` for whatever new content lands (this test currently asserts specific strings for the Autoresearch/automation sections that will change).
- Skipping the explicit "what was excluded" list Marcus asked for.
- **Committing this planning artifact into the public-staging repo** — its release gate treats any untracked/non-allowlisted file as a failure, and this document itself would trip the local-path check. Keep it in this private repo only.

## 13. Stop rule

This plan-for-plan is complete: objective, inputs (8 source docs + 2 in-repo references), assumptions, key questions, extraction/synthesis method, decision criteria, proposed shape, acceptance criteria, risks, and failure modes are defined, and the bounded research pass below has inspected all listed sources. Do not write final page content yet — `/compound-engineering:ce-plan` runs next per Marcus's explicit instruction.

## 14. Next action

Ready to produce the final deliverable — proceeding directly to `/compound-engineering:ce-plan` per Marcus's explicit chained instruction (plan-for-plan → ce-plan → ce-work), no separate approval gate needed for this low-risk content work.

## 15. Research pass log

**Tools/source types used:** repo file reads only (Read tool), both repos (this private repo for source docs, the public-staging repo for the current page and DESIGN.md), `grep` for requirement cross-references. No web search, no external tools, no protected operations.

**Files inspected this pass:**
- `case-studies/WORKFLOW_IMPLEMENTATION_CASES.md` (new — 14-case inventory, evidence-status column, evidence-boundary rules)
- `workflows/WORKFLOW_PHILOSOPHY.md` (new — core beliefs, working style)
- `workflows/SOURCE_QUALITY_MODEL.md` (new — quality criteria table, source categories, promotion rule)
- `site/proof/recursive-workflow/index.html` (public-staging repo, current state, re-read in full)
- `docs/plans/2026-08-20-1527-feat-recruiter-first-public-proof-work-plan.md` (R11, R32-R34, F6, AE10, KTD2/KTD3 re-confirmed)
- Previously read this session (not re-fetched): `architecture/RECURSIVE_WORKFLOWS.md`, `architecture/AUTORESEARCH_MODEL.md`, `workflows/SCHEDULED_TASKS_MODEL.md`, `workflows/REVIEW_AND_PROMOTION_LOOP.md`

**Key findings:**
- Two source documents (`SOURCE_QUALITY_MODEL.md`, `SCHEDULED_TASKS_MODEL.md`'s full task-layer list) and one case inventory (`WORKFLOW_IMPLEMENTATION_CASES.md`) were available but never used when the page was first built — the page's vagueness traces directly to under-using material that was already gathered for the original plan's Sources list.
- `WORKFLOW_IMPLEMENTATION_CASES.md` has a built-in evidence-status column (Verified / Internal-Verified-summary / Needs Review) that gives a ready-made filter for which case to name concretely without overclaiming.
- The page's current test file (`tests/e2e/recursive-workflow.spec.js`) asserts specific text strings for the sections that will change — the eventual plan must account for test updates, not just content updates.

**Unresolved questions (for `ce-plan` to resolve):** exact selection of which named case to use; whether a diagram is worth the added complexity; how many task layers to name before it stops reading as a scan.

**Blockers:** none.
