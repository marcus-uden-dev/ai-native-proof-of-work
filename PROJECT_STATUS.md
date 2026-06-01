# Project Status

Last updated: 2026-06-01
Status: Active / Recruiter-facing summary

## Purpose

This page summarizes how the main projects are progressing right now.

It is a recruiter-safe status layer. It does not expose private local paths, raw logs, personal data, credentials, or sensitive project internals.

## Portfolio Status Snapshot

| Project / Layer | Current State | Recent Progress | Main Open Work | Evidence Status |
|---|---|---|---|---|
| Job-agent | MVP complete in local project status; career-ops tasks marked done; remaining work is mainly infra, production activation, pricing/legal decisions, external verification, and repo-ops follow-up | Source-repo status docs checked through 2026-05-31 now add current-status/handoff refreshes, migration-convention follow-up, and repo-ops context alongside nav integration, Windows local validation recovery (`391 passed, 7 skipped`), startup/LLM handoff notes, privacy, feedback, QA, CI, telemetry, and OAuth work | Production deploy, public backend origin, OTel/Grafana setup, Stripe live activation, final legal review, real third-party ATS smoke checks, selected public-safe screenshots/test references, and publish-safe confirmation of local branch/repo-ops state | Internal / Verified |
| PKM | Knowledge-workflow product surfaces are represented, but operational blockers remain before full daily use | Ingestion/search/learning/feed/source/person/topic surfaces are represented; feature workflow is explicit; social feed feature is marked done in the queue; Chrome extension exists for browser capture; latest observed repo signal is a 2026-05-26 frontend dependency-maintenance commit | OpenAI billing/embedding quota, frontend URL cleanup, SMTP setup, Hetzner deployment, source/person/topic setup, search/flashcard/extension/MCP verification | Internal / Verified |
| Household budget app | Active product with core surfaces and a large household/shared-account hardening track | Household scope is threaded across major pages; owner/member/admin flows, invite onboarding, shared-account ownership rules, read-model/view-model extraction, and mutation helper extraction have progressed significantly; latest observed repo signal is a 2026-05-26 app dependency-maintenance commit | Finish post-hardening household migration cleanup, remove legacy migration debt, validate ownership hardening end-to-end in Supabase, split future modeling into smaller landing slices | Internal / Verified |
| Portfolio evidence repository | GitHub-ready documentation and review layer for the product portfolio | Project-first positioning, recruiter/agent review layer, evidence matrix, navigation hub, case studies, a provider-neutral template kit, `llms.txt`, published static demo portal, active scheduled compiler task, and source-verified handoff guidance are in place | Add safe test/commit excerpts, dated weekly-input notes, and first curated recruiter export after privacy review | Verified |

## Job-Agent Status

Job-agent is still the lead proof point.

Current status from local project status docs:

- MVP is marked complete in the local project status.
- Career-ops tasks are marked done.
- Shared-job-postings rewire and legacy-ID cleanup are marked complete.
- Privacy/GDPR work is locally implemented but still needs legal review before production enablement.
- Feedback and UX signals are implemented across backend API, AI-output feedback, product rating, and admin visibility.
- Local QA includes backend regression checks, Playwright coverage against real local services, discover regression tests, migration smokes, and CI workflow setup.
- Source-repo status docs updated on 2026-05-17 report that OAuth social auth landed on master across six commits from 2026-05-13 to 2026-05-16.
- Source-repo status docs updated through 2026-05-31 report current-status and LLM handoff refreshes, repo-ops context, migration-convention follow-up, and the earlier Windows local validation recovery.
- Source-repo ops notes on 2026-05-27 add a portable startup contract with canonical manual local ports `8000` / `3002` and explicit OAuth callback verification requirements.
- Remaining work is mostly external or production-facing: hosting, domain, OTel/Grafana, Stripe live, OAuth credentials, legal review, final destructive data-rights workflows, and verification of the hash-named migration anomaly.

Recruiter signal:

- This is not just a prompt wrapper.
- It shows a product system with CV handling, job discovery, application support, feedback, privacy, QA, deployment planning, telemetry, and billing/product decisions.

## PKM Status

PKM is the knowledge-workflow proof point.

Current status from local project docs:

- Feature workflow is explicit: brainstorm, proposed, ready, in-progress, done, reviewed, or rejected.
- Social media feed is marked `done` in the feature queue, with merged feed, tagging, saving to KB, and ranking concepts documented.
- Core surfaces include ingestion, search, learning, feed/social, sources, persons, topics, and browser capture.
- Chrome extension exists for one-click browser saving.
- Operational blockers remain before full daily use: OpenAI credit/embedding quota, SMTP password, local frontend URL cleanup, deployment, source/person/topic setup, and verification of search/learn/extension/MCP paths.
- Latest observed repo-level signal is a 2026-05-26 frontend dependency-maintenance commit. Treat this as maintenance freshness, not a new product milestone.

Recruiter signal:

- Shows information architecture, ingestion thinking, knowledge retrieval, prioritization, and feature-lifecycle discipline.

## Household Budget App Status

The household budget app is the domain-modeling and reliability proof point.

Current status from local project docs:

- Core surfaces include dashboard, transactions, statement imports, recurring expenses, accounts, liquidity, budget, goals, settings, and household administration.
- Household scope now threads through the major operational surfaces.
- Shared-account ownership, owner proposals, household invites, member roles, and migration-safe read/write guards have been heavily hardened.
- Recent work moved large page-local logic into read models, view models, workflow helpers, and mutation helpers across dashboard, settings, accounts, transactions, statement imports, recurring expenses, budget, goals, and liquidity.
- Latest committed feature milestones are reported as passing `npm test` and `npm run lint` in the local project status.
- Latest observed repo-level signal is a 2026-05-26 app dependency-maintenance commit. Treat this as maintenance freshness, not a new product milestone.
- Remaining work is to finish post-hardening migration cleanup and retire legacy bridge/debt affordances once validation is complete.

Recruiter signal:

- Shows careful modeling of household financial data, shared access, security boundaries, migration debt, and test-backed refactoring.

## Portfolio Evidence Repository Status

This repository is the evidence packaging layer, not the main product.

Current status:

- GitHub-readable Markdown is the canonical format.
- Project-first positioning is now the main narrative.
- Recruiter and recruiter-agent navigation is in place.
- Evidence matrix, role reading paths, case studies, milestone timeline, and before/after snapshots are available.
- Mermaid diagrams have been adjusted for safer GitHub rendering.
- The weekly compiler and source-indexing automation remain documented as the operating layer.
- The reusable `template/` adoption layer and weekly automation runbook now give another user a provider-neutral path to recreate the system without copying Marcus-specific evidence.
- `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md` has been re-checked against inspected `job-agent` source files so it reflects actual setup files, newly present repo-ops handoff docs, and the difference between Docker Compose frontend `3000` and the canonical manual startup port `3002`.

## Evidence Boundaries

- Project status comes from local project docs and source indexes, summarized into recruiter-safe language.
- Exact user or business impact is not claimed.
- Production readiness is not overstated when external blockers remain.
- Local paths, raw logs, and sensitive implementation details are intentionally excluded.
- Internal source indexes were refreshed at a high level on 2026-06-01. This refresh updates source freshness and project inventory; it does not promote raw local paths or unreviewed source content into recruiter-facing files.
