# Project Status

Last updated: 2026-11-24
Status: Active / Recruiter-facing summary

## Purpose

This page summarizes how the main projects are progressing right now.

It is a recruiter-safe status layer. It does not expose private local paths, raw logs, personal data, credentials, or sensitive project internals.

## Portfolio Status Snapshot

| Project / Layer | Current State | Recent Progress | Main Open Work | Evidence Status |
|---|---|---|---|---|
| Earned Signal (formerly Job-agent) | Released to an invite-only closed beta on 2026-11-24; the public recruiter-safe proof remains separate from beta user data | First invited tester signed in and accepted the current terms; authentication, telemetry, backup/restore, reboot recovery, and pre-invitation smoke checks are recorded as verified | Learn from the controlled cohort, expand invitations deliberately, resolve remaining operational follow-ups, and measure outcomes before making adoption or market claims | Internal / Verified |
| PKM | Knowledge-workflow product surfaces are represented, but operational blockers remain before full daily use | Ingestion/search/learning/feed/source/person/topic surfaces are represented; feature workflow is explicit; social feed feature is marked done in the queue; Chrome extension exists for browser capture; latest observed repo signal is a 2026-05-26 frontend dependency-maintenance commit | OpenAI billing/embedding quota, frontend URL cleanup, SMTP setup, Hetzner deployment, source/person/topic setup, search/flashcard/extension/MCP verification | Internal / Verified |
| Household budget app | Active product with core surfaces and a large household/shared-account hardening track | Household scope is threaded across major pages; owner/member/admin flows, invite onboarding, shared-account ownership rules, read-model/view-model extraction, and mutation helper extraction have progressed significantly; latest observed repo signal is a 2026-05-26 app dependency-maintenance commit | Finish post-hardening household migration cleanup, remove legacy migration debt, validate ownership hardening end-to-end in Supabase, split future modeling into smaller landing slices | Internal / Verified |
| Portfolio evidence repository | Public recruiter-first evidence layer on GitHub Pages | Recruiter/agent review, decision log, case studies, public evidence manifests, static demo portal, and source-grounded status reconciliation are in place | Keep current product evidence fresh through the enabled proof compiler while continuing privacy/release validation | Verified |

## Earned Signal Status

Earned Signal, formerly tracked as Job-agent, is the lead proof point.

Current source-grounded status as of 2026-11-24:

- The product is running as an invitation-only closed beta.
- The first invited tester signed in and accepted the current beta terms on 2026-11-24.
- Authentication, pre-invitation smoke checks, API and worker telemetry, backup/restore, and reboot recovery are recorded as verified in committed source evidence.
- The beta is free. In-app payments remain test-mode only; a paid model is still a hypothesis rather than validated demand.
- Application support remains human-reviewed. The beta prepares application material but does not submit applications on the user's behalf.
- The public prototype remains a synthetic recruiter-safe demonstration and is separate from closed-beta user data and services.
- This milestone proves controlled external use. It does not prove adoption, market validation, recruiter response, job-search impact, or business outcomes.

Recruiter signal:

- Product execution progressed from internal implementation and hardening to controlled external use.
- The launch sequence shows explicit trust gates: authentication, terms acceptance, privacy controls, smoke testing, telemetry, backup/restore, and staged invitations.
- The commercial boundary stayed conservative: free beta first, paid monetization later if evidence supports it.

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
- `case-studies/JOB_AGENT_INSTALL_AND_HANDOFF.md` has been re-checked against inspected `job-agent` source files so it reflects actual setup files, repo-ops handoff docs, the difference between Docker Compose frontend `3000` and the canonical manual startup port `3002`, and the newer redesign-shell / shell-polish source state.
- Direct source verification for the lead project was refreshed on 2026-11-24 against committed release notes, current status, decision records, and dated checkpoints. Private source paths and identities are not published here.

## Evidence Boundaries

- Project status comes from local project docs and source indexes, summarized into recruiter-safe language.
- Exact user or business impact is not claimed.
- Closed-beta release status is distinguished from public availability, market validation, adoption, and measured outcomes.
- Local paths, raw logs, and sensitive implementation details are intentionally excluded.
- Internal source indexes were refreshed at a high level on 2026-06-01. This refresh updates source freshness and project inventory; it does not promote raw local paths or unreviewed source content into recruiter-facing files.
- No dated weekly-input file existed for the week ending 2026-08-09, so this run promoted only source-verified repo state and did not invent a higher-level weekly narrative beyond the sources above.
