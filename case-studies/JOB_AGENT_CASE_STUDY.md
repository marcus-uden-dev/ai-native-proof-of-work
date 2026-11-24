# Earned Signal Case Study

Last updated: 2026-11-24
Status: Active / Lead proof point / Closed beta / Internal evidence summarized

## Executive Summary

Earned Signal, formerly tracked as Job-agent, is the lead product proof in this repository.

It demonstrates product execution across a career workflow: profile and CV handling, job discovery, application support, interview practice, feedback loops, privacy/data rights, QA, telemetry, recovery controls, and staged rollout. On 2026-11-24 the product reached an invite-only closed beta and the first invited tester signed in and accepted the current terms.

That milestone proves controlled external use. It does **not** prove product adoption, market validation, recruiter response, job-search impact, or business outcomes.

## Public Demo

The [recruiter-safe static demo](https://marcus-uden-dev.github.io/ai-native-proof-of-work/proof/job-agent/demo/) is separate from the closed-beta service. It uses synthetic company data and contains no beta user data.

The strongest public surface is company research: it shows positive and warning signals, financial and compensation fields, culture signals, evidence labels, and explicit `public_source`, `synthetic_demo`, or `inferred_demo` classes.

## Problem

Job search work is fragmented across CVs, job boards, application portals, interviews, notes, feedback, and follow-ups. AI can help, but only if the workflow remains trustworthy, reviewable, and grounded in user control.

## What Was Built / Verified

| Area | Current evidence | Status |
|---|---|---|
| Profile and documents | Profile intake, document library, CV variants and export flows are represented in the product | Internal / Verified |
| Job discovery | Search, monitoring, match context, source handling and failure visibility are represented | Internal / Verified |
| Application support | Application answers and tailored material are prepared for user review; the beta does not submit applications autonomously | Internal / Verified |
| Feedback and learning | Generated outputs can be rated and problem reports can be submitted with bounded context | Internal / Verified |
| Privacy/data rights | Versioned terms acceptance, consent choices, export/delete surfaces and analytics consent gating are represented | Internal / Verified |
| QA and operations | Authentication, pre-invitation smoke checks, telemetry, backup/restore and reboot recovery are recorded as verified | Internal / Verified |
| Closed beta | Invite-only beta running; first invited tester signed in and accepted terms on 2026-11-24 | Internal / Verified |

## Closed-Beta Decision Trail

| Element | Summary |
|---|---|
| Context | The product had moved beyond internal implementation but still lacked evidence from controlled external use |
| Options Considered | Wait for final hosting and commercial setup, open broadly, or launch to a constrained invited cohort with explicit trust gates |
| Trade-off | A small closed beta limits learning speed and availability but reduces privacy, reliability, support, and reputation risk while the product is still changing |
| Decision | Launch invite-only, verify auth/telemetry/recovery/smoke gates first, keep application submission human-controlled, and keep the beta free while learning |
| Execution | Controlled access, versioned terms acceptance, telemetry, backup/restore, reboot recovery and pre-invitation smoke checks were put in place before the first invitation |
| Result | First invited tester signed in and accepted the current terms on 2026-11-24 |
| Next test | Expand the cohort deliberately and measure whether the workflow creates repeatable user value before making pricing, adoption, or outcome claims |

## Recruiter-Relevant Signals

| Signal | Evidence |
|---|---|
| Product judgment | Chose a constrained learning release rather than equating technical readiness with a public launch |
| Execution | Took the product from internal implementation through hardening, operational verification, invitation flow and first external use |
| Privacy & trust judgment | Terms, consent, data rights, access control and no-autonomous-submit boundaries are explicit |
| QA discipline | Smoke tests, telemetry, backup/restore and reboot recovery were used as release gates |
| Commercial judgment | Kept the beta free and deferred paid-model claims until evidence exists |
| AI-native leverage | AI assistance is embedded in a reviewed workflow rather than an unchecked autonomous application system |

## Evidence Boundaries

- Closed-beta status is `Internal / Verified`, grounded in committed source release notes, current-status records, decisions and dated checkpoints.
- Private repository identity, paths, tester identity, contact details, secrets and operational host details are intentionally excluded.
- The public demo is synthetic and separate from the live closed beta.
- One invited tester is a release milestone, not adoption or market validation.
- No recruiter response, job-search impact, time saved, revenue, retention, or business outcome is claimed.

## Suggested Interview Questions

1. Why launch to a constrained cohort instead of waiting for the final hosting target?
2. Which trust and reliability gates had to pass before the first invitation?
3. Where does the workflow deliberately keep human review instead of automating further?
4. What would count as evidence that the closed beta creates repeatable user value?
5. Which commercial assumptions should remain hypotheses until the cohort produces stronger evidence?
