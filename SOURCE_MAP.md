# Source Map

Last updated: 2026-06-23
Status: Recruiter-safe / Does not expose private local paths

## Purpose

This file explains what types of sources inform the portfolio evidence repository.

It does not expose private local paths or sensitive material.

## Canonical Repository

| Item | Location | Notes |
|---|---|---|
| Portfolio evidence repository | `https://github.com/TheOneDarkHorse/ai-native-proof-of-work` | Main private recruiter-shareable archive |

## Source Categories

| Source Type | Use | Handling |
|---|---|---|
| AI workflow conversations | Extract decisions, patterns, and workflow improvements | Summarized, not dumped |
| Codex project work | Evidence of structured repo/documentation work | Referenced when available |
| Claude project work | Strategy, synthesis, planning, and instruction design | Summarized when relevant |
| Shared skills and scripts | Reusable workflow components | Described at a high level; custom skills are documented through sanitized problem/solution cases |
| Job/recruiter material | Career positioning and application assets | Redacted and generalized |
| Personal learning subscriptions | Taste, curiosity, and external signal intake from private podcast/app exports | Aggregated by topic; raw feeds, private identifiers, and local paths excluded |
| Research sources | Product, GTM, architecture, and workflow insights | Filtered for source quality |
| GitHub artifacts | Proof of execution | Linked when safe |

## Project Source Summary

| Project / Layer | What It Supports | Recruiter-Safe Handling |
|---|---|---|
| Job-agent / job-agent UX | Primary proof point for career workflow product execution, QA, privacy, deployment planning, telemetry, and billing/product decisions | Summarized in [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md); raw project internals are not copied |
| PKM | Supporting proof point for knowledge workflows, ingestion/search, learning/feed surfaces, browser extension material, tests, and feature lifecycle work | Summarized in [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md); private/local source details stay out of recruiter-facing files |
| Household budget app | Supporting proof point for financial domain modeling, shared household data access, imports, review queues, forecasting, goals, and tests | Summarized in [PROJECT_PROOF_POINTS.md](PROJECT_PROOF_POINTS.md); sensitive household/private data is excluded |
| Portfolio evidence automation | Evidence packaging, source separation, weekly review, privacy checks, and recruiter translation | Documented in workflow, architecture, prompt, and log files |
| Custom skills documentation | Reusable skill workflows, before/after improvements, and redaction boundaries | Documented in [case-studies/CUSTOM_SKILLS_CASE_STUDY.md](case-studies/CUSTOM_SKILLS_CASE_STUDY.md), [workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md](workflows/CUSTOM_SKILLS_DOCUMENTATION_MODEL.md), and [template/CUSTOM_SKILL_CASE_TEMPLATE.md](template/CUSTOM_SKILL_CASE_TEMPLATE.md) |
| Recruiter-side LLM report guidance | Fair assessment structure, source priority, and overclaiming guardrails | Documented in [RECRUITER_LLM_REPORT_BRIEF.md](RECRUITER_LLM_REPORT_BRIEF.md); does not expose private sources |

## Latest Source Index Check

| Date | Result | Handling |
|---|---|---|
| 2026-06-01 | Internal source indexes were refreshed at a high level after a manual run-now audit of the scheduled compiler contract | Recruiter-facing files use only generalized summaries; local paths and raw source details remain internal |

Recent source signals from this check:

- Job-agent source status and handoff docs had 2026-05-31 updates, including repo-ops and handoff context that should remain source-verified before future promotion.
- PKM and the household budget app each have 2026-05-26 dependency-maintenance commits; these are maintenance signals, not new product-outcome claims.
- The proof-of-work repo now has a committed static demo portal and a separate public demo repository: `https://github.com/TheOneDarkHorse/ai-native-proof-of-work-demo`.
- Direct source verification on 2026-06-23 refreshed the `job-agent` evidence boundary from committed source files and git history, including the current startup contract, 46 migration files with named head `0045` plus one older hash anomaly, privacy-retention implementation, retention tests, CV variant editing flow, and the newer CV template marketplace Phase 1 source state.

## Current Weekly Boundary

As of the 2026-06-23 weekly compiler run:

- no dated weekly-input file was available for the current week
- the `job-agent` source repo was directly accessible from this workspace and was re-verified against committed files, `git log`, and the source repo's current-status history window for 2026-06-12 to 2026-06-23
- recruiter-facing product-progress claims can now use the refreshed direct source-verification date of 2026-06-23, but they should still avoid promoting untracked branch-local ops artifacts, open-PR work as shipped, or invented weekly narrative

## Evidence Rule

Claims should point to artifacts, logs, decisions, or clearly marked estimates.

## Privacy Rule

Private paths, raw chats, emails, credentials, internal-only documents, and sensitive personal data are excluded from recruiter-facing documents.
