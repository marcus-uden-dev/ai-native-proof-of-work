# Decision Log

## 2026-08-24 — Record bilingual recruiter experience and defer technical-depth personalization

### Context

The recruiter-facing GitHub profile and supporting decision-log experience should be usable for Swedish- and English-speaking visitors. The current decision-log taxonomy has stable English IDs, but the public presentation also needs Swedish labels. A later idea is to let recruiters choose a technical depth, but that would add content variants and interaction complexity.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep the public experience English-only | Lowest maintenance cost | Excludes Swedish-speaking visitors and keeps tag labels less accessible |
| Maintain separate English and Swedish content manually | Simple mental model | High risk of drift after GitHub profile or decision-log changes |
| Use one localized content model with an entry language choice and sync validation | Supports both audiences and makes drift detectable | Requires future implementation and translation QA |
| Add technical-depth personalization now | Could fit different recruiter backgrounds | Adds state, content, testing, and evidence-boundary complexity before the base language flow is stable |

### Decision

Record bilingual support as a future feature: expose `English` and `Svenska` links near the top of the GitHub profile README, provide a persistent `EN | SV` switcher in the upper-right corner of the linked proof site, retain stable English tag IDs, show Swedish labels for all current decision-log tags, and require GitHub profile or proof-site changes to trigger a paired language-sync check. Defer technical-depth personalization until further notice.

### Reasoning Trail

```text
Context → Recruiters may read the profile in Swedish or English, and technical familiarity varies.
Options Considered → English only, manually duplicated pages, a validated localized model, or localized content plus technical-depth personalization.
Tradeoffs → A shared localized model costs more to build but lowers drift risk. Technical-depth personalization is useful but expands scope before the base flow is proven.
Decision → Plan bilingual support and profile-triggered synchronization; defer technical-depth selection.
Evidence → logs/DECISION_LOG_TAGS.md contains Swedish display labels for all 49 current tags and a synchronization policy.
Open Questions → Which public surface owns the canonical profile content, and what default-language behavior is least surprising.
Next Action → Use the complete translation plan to confirm the canonical public GitHub-profile source and public release checkout before approving implementation.
```

### Evidence

[Bilingual Recruiter Profile and Localized Decision-Log Experience](../docs/plans/2026-08-24-001-feat-bilingual-recruiter-profile-experience.md), [Decision-Log Tag Taxonomy](DECISION_LOG_TAGS.md)

### Status

Planned — translation research is complete. Implementation remains deferred until the canonical public GitHub-profile source and public release checkout are confirmed. Technical-depth personalization remains deferred.

## 2026-08-09 — Separate committed product-code freshness from later docs/ops commits

### Context

The `job-agent` redesign branch moved forward again after the 2026-08-05 proof sync. By 2026-08-09, `HEAD` is `bc10287`, twelve commits ahead of `origin/master`, but the newest landed product-code signal is `cfb91bc` from 2026-08-08 while later commits are docs/ops follow-through. The local worktree is also still dirty with newer M2 follow-up work.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Treat the latest committed `HEAD` as pure product progress | Simple story | Blurs product-code evidence with docs/ops maintenance commits |
| Ignore the August 8 to August 9 movement because no weekly input exists | Avoids another wording pass | Leaves the portfolio one source boundary behind the current committed repo state |
| Refresh to the current committed branch head but call out the latest committed product-code commit separately | Keeps freshness accurate without overstating what kind of work actually landed | Requires more precise recruiter-facing wording |

### Tradeoffs

This adds nuance to the status summary, but it keeps the strongest proof point honest. Reviewers get the latest source boundary and still know which commit materially changed the product surface.

### Decision

For the 2026-08-09 weekly sync, refresh the portfolio to the current committed branch head, explicitly identify `cfb91bc` as the latest committed product-code signal, and continue to exclude dirty local follow-up work from recruiter-facing proof.

### Evidence

Context -> `job-agent` `HEAD` is `bc10287`, `origin/master` is `b38596e`, and the branch is twelve commits ahead.
Options Considered -> Treat all commits as product progress, freeze the 2026-08-05 snapshot, or separate product-code freshness from docs/ops follow-through.
Tradeoffs -> Slightly more complex wording in exchange for a more truthful boundary.
Decision -> Refresh to `bc10287` while naming `cfb91bc` as the latest committed product-code signal.
Evidence -> 2026-08-09 verification found `cfb91bc` followed by docs/ops commits `8b9486e` and `bc10287`, with the worktree still dirty beyond `HEAD`.
Open Questions -> Whether the redesign branch will be merged as-is, rebased, or superseded by later M2 work.
Next Action -> Keep using direct git/file verification until the branch state is simplified by a clean merge or another verified milestone.

## 2026-08-05 — Prefer the currently accessible committed branch over older verified snapshots or dirty local WIP

### Context

The `job-agent` source repo was directly accessible again, but the currently available committed branch is `feat/frontend-redesign-shell` at `852a191`, not the older June branch state reflected in prior portfolio handoff snapshots. The local worktree is also dirty, so uncommitted edits and untracked ops-run files are present beside the committed July redesign work.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep the older June 46-migration snapshot because it was previously verified | Avoids rewriting earlier proof surfaces | Becomes false for the currently accessible source state |
| Promote the dirty local July/August worktree as the newest truth | Captures the latest local edits | Overstates uncommitted work as shipped evidence |
| Re-anchor to the currently accessible committed branch and exclude dirty local WIP | Matches the actual verifiable source state and keeps the boundary honest | Requires correcting prior handoff and status wording |

### Decision

For the 2026-08-05 weekly sync, use the currently accessible committed `job-agent` branch as the source of truth, explicitly note the dirty worktree boundary, and stop carrying forward the older June migration/head snapshot as if it were still current.

### Reasoning Trail

```text
Context -> The accessible source branch changed and the worktree is dirty.
Options Considered -> Keep the old snapshot, trust dirty local WIP, or re-anchor to the committed branch only.
Tradeoffs -> The committed-branch-only path is slightly less fresh than raw local WIP but much more defensible.
Decision -> Promote only the accessible committed branch state and mark dirty local edits out of scope.
Evidence -> 2026-08-05 verification found `feat/frontend-redesign-shell` at `852a191`, four commits ahead of `origin/master`, with 44 migrations and committed July redesign work, while the local worktree still has uncommitted docs/frontend edits.
Open Questions -> Whether a future sync should verify both `origin/master` and the active feature branch when they diverge materially.
Next Action -> Refresh again after the lead repo is either cleaned or the redesign branch state is merged or otherwise stabilized.
```

### Evidence

[case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [PROJECT_STATUS.md](../PROJECT_STATUS.md), [SOURCE_MAP.md](../SOURCE_MAP.md), [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md)

### Status

Decision

## 2026-06-28 — Use the source repo's own handoff hierarchy before falling back to raw freshness checks

### Context

The `job-agent` source repo now distinguishes three different kinds of truth: `docs/overview/agent-context.md` for repo orientation, `docs/operations/current-status.md` for durable product state, and direct git/file inspection for the freshest commit boundary. The portfolio repo needs to preserve that hierarchy instead of flattening everything into one generic "status doc".

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep treating all source docs as one status surface | Simple wording in portfolio docs | Hides the clearer source-repo contract and can confuse setup versus progress reading order |
| Trust only git HEAD and ignore source docs | Freshest possible evidence | Loses curated repo-orientation and durable-status context |
| Preserve the source repo's own hierarchy and still use direct verification for final freshness | Matches the source repo's intended handoff model and keeps freshness honest | Requires slightly more explanation in handoff docs |

### Decision

For `job-agent`, treat `agent-context` as the canonical orientation doc, `current-status` as the durable state summary, and direct git/file inspection as the freshness override when newer follow-up commits land.

### Reasoning Trail

```text
Context -> The source repo now encodes different roles for orientation, durable state, and freshness.
Options Considered -> Flatten all docs, trust git only, or preserve the source repo's own hierarchy plus direct verification.
Tradeoffs -> A clearer hierarchy adds wording overhead but lowers setup and interpretation ambiguity.
Decision -> Mirror the source repo's hierarchy in the portfolio handoff and reviewer guidance.
Evidence -> The 2026-06-28 verification found `agent-context` refreshed on 2026-06-27, `current-status-history` refreshed on 2026-06-26, and `.claude/CLAUDE.md` updated on 2026-06-28 to spell out the precedence explicitly.
Open Questions -> Whether the source repo should also add an explicit "verified against HEAD" field inside `current-status.md`.
Next Action -> Keep recruiter-agent and handoff docs aligned with this hierarchy on future weekly runs.
```

### Evidence

[case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md), [logs/PROBLEM_SOLVING_LOG.md](../logs/PROBLEM_SOLVING_LOG.md), [RECRUITER_AGENT_GUIDE.md](../RECRUITER_AGENT_GUIDE.md), [PROJECT_STATUS.md](../PROJECT_STATUS.md)

### Status

Decision

## 2026-06-14 — Use direct source verification when lead-project status docs lag

### Context

The portfolio repo depends on `job-agent` status and handoff freshness, but the source repo's `docs/operations/current-status.md` can lag the actual git HEAD after small commit bursts or docs follow-ups.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Trust the source status doc date as the freshness boundary | Simple and easy to explain | Can understate or misdate current evidence |
| Ignore status docs and use git/files only | Freshest possible boundary | Loses useful curated context from the source repo |
| Use status docs as context but let direct git/file verification override stale dates | Preserves curated context and freshness | Requires extra weekly verification work |

### Decision

Use source status docs as context, but treat the direct source-verification date from git/file inspection as authoritative when the status doc date lags.

### Reasoning Trail

```text
Context -> The lead product can move faster than its status summary.
Options Considered -> Trust the status doc, ignore it entirely, or combine it with direct verification.
Tradeoffs -> Direct verification adds weekly work but avoids stale recruiter-facing freshness claims.
Decision -> Keep the status doc as context and let direct verification override stale dates.
Evidence -> The 2026-06-14 job-agent verification found newer commits than the dated triage header in docs/operations/current-status.md.
Open Questions -> Whether the source repo should add an explicit "verified against HEAD" field in its own ops docs.
Next Action -> Keep the handoff guide and recruiter-agent/report guidance aligned with the direct verification rule.
```

### Evidence

[case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md](../case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md), [logs/WEEKLY_LOG.md](../logs/WEEKLY_LOG.md), [logs/PROBLEM_SOLVING_LOG.md](../logs/PROBLEM_SOLVING_LOG.md), [RECRUITER_AGENT_GUIDE.md](../RECRUITER_AGENT_GUIDE.md), [docs/reports/recruiter-llm-report-brief.md](../docs/reports/recruiter-llm-report-brief.md)

### Status

Decision

## 2026-06-02 — Add workflow implementation cases as supporting proof

### Context

The repository already leads with product case studies, but many practical improvements happen in the operating layer: Claude artifacts, Codex intake flows, `tasks/lessons.md`, design rules, frequent skills, automations, global logs, and template materials. Those workflows are evidence of implementation quality when they are tied to concrete artifacts.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep workflow evidence only inside logs and prompts | Avoids adding another case-study surface | Makes implemented workflow improvements hard to find |
| Promote workflows as main case studies | Shows AI-native operating-system depth | Risks making the portfolio feel too meta again |
| Add a supporting workflow-case index | Makes the evidence visible while preserving product-first positioning | Requires careful evidence labels per workflow |

### Decision

Add workflow implementation cases as supporting proof points under `case-studies/`, linked from navigation and evidence maps.

### Reasoning Trail

```text
Context -> Workflow implementation evidence is real but scattered.
Options Considered -> Leave scattered, make workflows primary, or add a supporting workflow-case index.
Tradeoffs -> A workflow index adds maintenance but keeps product projects as the lead proof.
Decision -> Create a supporting workflow implementation case-study index.
Evidence -> Existing prompts, lessons, logs, workflow docs, source map, and template docs already document parts of this system.
Open Questions -> Which cases should be expanded into full before/after narratives after more source evidence is sanitized.
Next Action -> Expand the weekly proof-of-work compiler case first.
```

### Evidence

[case-studies/WORKFLOW_IMPLEMENTATION_CASES.md](../case-studies/WORKFLOW_IMPLEMENTATION_CASES.md), [tasks/lessons.md](../tasks/lessons.md), [workflows/CLAUDE_CODEX_WORKFLOW.md](../workflows/CLAUDE_CODEX_WORKFLOW.md), [template/README.md](../template/README.md)

### Status

Decision

---

## 2026-05-11 — Organize strategy by product project

### Context

The flat `strategy/` folder made several strategy documents read as if they described the portfolio evidence layer rather than the actual product projects. This blurred the distinction between job-agent, PKM, the household budget app, and the portfolio operating layer.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep flat strategy files | Fewer files and links to update | Continues confusing product strategy with portfolio strategy |
| Add notes inside existing files | Low migration cost | Still leaves ambiguous file ownership |
| Organize by project folder | Clear ownership and scalable for more repos | Requires link updates and a strategy index |

### Decision

Use project-scoped strategy folders under `strategy/`: job-agent, PKM, household budget app, and portfolio operating system.

### Reasoning Trail

```text
Context → Strategy docs sounded like they described the portfolio evidence layer.
Options Considered → Keep flat files, add clarifying notes, organize by project folder.
Tradeoffs → Project folders require link updates but make strategy ownership explicit.
Decision → Move strategy to project-scoped folders and make job-agent the primary strategy surface.
Evidence → Existing docs and recruiter links pointed to flat strategy files that mixed product and portfolio language.
Open Questions → Which supporting project strategy files should be expanded once more validated evidence is available.
Next Action → Review recruiter-facing navigation after the next weekly run.
```

### Evidence

[strategy/README.md](../strategy/README.md), [strategy/job-agent/README.md](../strategy/job-agent/README.md), [strategy/pkm/README.md](../strategy/pkm/README.md), [strategy/household-budget-app/README.md](../strategy/household-budget-app/README.md), [strategy/personal-ai-harness/README.md](../strategy/personal-ai-harness/README.md)

### Status

Decision

---

## 2026-05-24 — Keep the reusable seed template-scoped and provider-neutral

### Context

The repository now serves two readers at once: a recruiter reviewing Marcus's proof of work and another user who may want to reuse the system. Reuse material is useful, but it can blur the recruiter path or accidentally carry Marcus-specific assumptions into the seed.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep bootstrap and import files at the repo root | Easier to notice quickly | Pollutes the recruiter-facing surface and encourages copying Marcus-specific context |
| Skip reusable template material entirely | Keeps recruiter path clean | Loses the system-reuse value and makes cloning the workflow harder |
| Keep reusable seed material under `template/` and write it provider-neutral | Preserves reuse while keeping the main repo recruiter-first | Requires extra cross-links and maintenance |

### Decision

Keep the reusable seed under `template/`, keep the main repo recruiter-first, and write reusable prompts and runbooks in provider-neutral language with tool-specific files treated as adapters.

### Reasoning Trail

```text
Context → The repo now has both recruiter-review and template-adoption audiences.
Options Considered → Root-level reuse docs, no reuse layer, or template-scoped neutral seed.
Tradeoffs → A template layer adds maintenance cost but avoids mixing Marcus-specific evidence into the reusable architecture.
Decision → Keep reusable material under template/ and keep the seed provider-neutral by default.
Evidence → template/*, llms.txt, navigation links, and the weekly automation runbook all separate reuse from recruiter review.
Open Questions → Which additional tool-specific adapters belong in prompts/ versus template/ as the system grows.
Next Action → Keep weekly runs updating template docs only when the reusable architecture actually changes.
```

### Evidence

[template/README.md](../template/README.md), [template/REPO_SEED_BLUEPRINT.md](../template/REPO_SEED_BLUEPRINT.md), [template/IMPORT_INSTRUCTIONS.md](../template/IMPORT_INSTRUCTIONS.md), [template/LLM_BOOTSTRAP_REPO_PROMPT.md](../template/LLM_BOOTSTRAP_REPO_PROMPT.md), [template/WEEKLY_AUTOMATION_RUNBOOK.md](../template/WEEKLY_AUTOMATION_RUNBOOK.md), [llms.txt](../llms.txt)

### Status

Decision

---

## 2026-05-09 — Lead with concrete projects while documenting the automation

### Context

The documentation layer risked positioning the compiler, weekly review, and source-indexing system as the whole value proposition. The stronger recruiter signal is the concrete product portfolio: job-agent first, with PKM and the household budget app as supporting proof points. The automation should remain documented as the operating method that makes the portfolio repeatable and credible.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep automation/compiler as the main story | Clear system narrative | Makes the portfolio feel meta and underplays real product execution |
| Lead with all projects equally | Shows breadth | Dilutes the strongest career-domain proof point |
| Lead with job-agent and document automation as method | Strongest recruiter relevance, still shows repeatable operating discipline | Requires careful privacy-safe summarization of internal project evidence |

### Decision

Lead recruiter-facing documentation with job-agent as the primary proof point. Use PKM and the household budget app as supporting project evidence. Keep the proof-of-work compiler, source indexes, and review loops documented as automation and operating infrastructure.

### Reasoning Trail

```text
Context → Current docs overemphasize the automation layer.
Options Considered → Compiler-first, equal project portfolio, job-agent-first with automation documented as method.
Tradeoffs → Job-agent-first gives stronger recruiter signal but needs sanitized evidence summaries.
Decision → Make projects the primary proof and automation the documented operating layer.
Evidence → Internal indexes and project docs identify job-agent, PKM, and household budget app evidence.
Open Questions → Which job-agent artifacts should become a sanitized public/recruiter case study?
Next Action → Create a job-agent case-study page with evidence labels.
```

### Evidence

[PROJECT_PROOF_POINTS.md](../PROJECT_PROOF_POINTS.md), [PROOF_OF_WORK.md](../PROOF_OF_WORK.md), [strategy/job-agent/product/VALUE_PROPOSITION.md](../strategy/job-agent/product/VALUE_PROPOSITION.md), internal source indexes

### Status

Decision

---

## 2026-05-08 — Use a private GitHub repository as proof-of-work archive

### Context

The proof-of-work system needs to be structured, versioned, recruiter-shareable, and readable without access to raw chats or local folders.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| GitHub repo | Versioned, structured, shareable | Requires privacy discipline |
| Google Drive folder | Easy sharing | Less structured and less versioned |
| PDF only | Easy to read | Static and quickly outdated |
| Website | Polished | More setup and maintenance |

### Decision

Use a private GitHub repository as the canonical proof-of-work archive.

### Reasoning Trail

```text
Context → Need recruiter-readable proof.
Options Considered → GitHub, Drive, PDF, website.
Tradeoffs → GitHub is less polished than a website but more versioned and operational.
Decision → Use private GitHub repo.
Evidence → Repository exists: TheOneDarkHorse/ai-native-proof-of-work.
Open Questions → Which artifacts should be shared first?
Next Action → Populate first verified proof points.
```

### Evidence

[README.md](../README.md), [AGENTS.md](../AGENTS.md), [SOURCE_MAP.md](../SOURCE_MAP.md)

### Status

Decision

---

## 2026-05-08 — Use Markdown and Mermaid as canonical documentation format

### Context

The repo needs to be readable directly in GitHub and easy to update through Codex.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Markdown + Mermaid | GitHub-native, versionable | Less polished than slides |
| Word/PPT | Recruiter-friendly | Harder to diff and update |
| PDF | Easy to share | Static |
| Website | Polished | Higher setup cost |

### Decision

Use Markdown and Mermaid as canonical source. Exports may be generated later.

### Reasoning Trail

```text
Context → Need readable, versioned, maintainable docs.
Options Considered → Markdown, Word/PPT, PDF, website.
Tradeoffs → Markdown is less visually rich but more maintainable.
Decision → Use Markdown and Mermaid first.
Evidence → Scaffold files generated.
Open Questions → Whether to export PDF later.
Next Action → Validate Mermaid rendering in GitHub.
```

### Status

Decision
