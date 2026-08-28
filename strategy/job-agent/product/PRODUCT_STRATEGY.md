# Job-Agent Product Strategy

Last updated: 2026-05-11
Status: Active hypothesis / Internal evidence summarized

## Project Scope

Project: job-agent.

Role in portfolio: primary proof point and lead career workflow product.

## Target User

Initial target user: job seekers in technical, product, AI-adjacent, and career-transition roles who need a more structured, evidence-aware job search workflow.

## Core Problem

Job search is a repeated, context-heavy workflow. Users need help with discovery, tailoring, applying, following up, and learning from feedback without losing control of their personal data or professional voice.

## Existing Alternatives

| Alternative | Gap |
|---|---|
| Manual spreadsheets and notes | Flexible but high-friction and easy to neglect |
| Generic AI chat | Good drafts, weak workflow memory and weak privacy boundaries |
| Job boards | Discovery-focused, not application workflow-focused |
| Resume builders | Improve materials but do not manage the whole loop |
| Fully autonomous appliers | High trust, quality, and platform-risk burden |

## Product Wedge

Start with reviewed career workflow support: structured job discovery, fit/context analysis, CV/application assistance, and feedback capture.

## MVP Scope

- Profile and CV workflow
- Job discovery and monitoring
- Job fit/context analysis
- Per-job application support
- Feedback and correction loop
- Privacy and consent surfaces
- Data export/delete planning
- QA and regression coverage
- Deployment and observability planning

## Non-MVP Scope

- Fully autonomous application sending
- Unreviewed recruiter outreach
- Large-scale scraping without source controls
- Production claims before legal/privacy review
- Outcome metrics before measurement exists

## Feature Prioritization

| Feature | User Value | Complexity | Priority |
|---|---|---|---|
| CV/profile workflow | High | Medium | High |
| Job discovery and monitoring | High | Medium | High |
| Per-job application support | High | Medium | High |
| Feedback loop | High | Medium | High |
| Consent and data-rights flows | High | Medium | High |
| Telemetry and outcome learning | Medium | Medium | Medium |
| Billing and credits | Medium | Medium | Medium |
| Referral economy | Unknown | High | Deferred |

## Risks

- Privacy and legal risk
- Trust risk from over-automation
- Quality risk in generated materials
- Source quality risk in job discovery
- Platform risk around job boards and application portals
- Pricing risk before outcome validation

## Evidence

See [Job-Agent Case Study](../../../case-studies/JOB_AGENT_CASE_STUDY.md) and [Project Proof Points](../../../PROJECT_PROOF_POINTS.md).

## Strategy Decisions

Use the decision-trail format in [Decision Trail](../decisions/DECISION_TRAIL.md) and summarize public portfolio-level decisions in the [public decision log](../../../site/evidence/decision-log.json) when they materially affect recruiter-facing claims.
