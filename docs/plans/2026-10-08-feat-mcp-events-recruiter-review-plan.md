---
title: MCP Events for Recruiter Review — CE-Suite Implementation Plan
date: 2026-10-08
author: Marcus Udén + Claude
source_tool: Claude Code
source: user-provided implementation plan (Decision B — test in isolation)
type: implementation-plan
status: proposed
review_status: pending
tags: [mcp-events, recruiter-review, cloudflare-worker, d1, privacy, event-outbox]
supersedes: null
---

# AI-Native Proof-of-Work — MCP Events

CE-Suite Implementation Plan

Repository: `marcus-uden-dev/ai-native-proof-of-work`
Status: Implementation-ready
Decision: B — Test in isolation

## 1. Existing architecture verified

The repository currently contains:

```text
GitHub Pages static site
        ↓
site/assets/js/site.js
        ↓
Cloudflare Worker
workers/recruiter-review/
        ↓
POST /api/recruiter-review
POST /api/recruiter-enquiry
        ↓
Groq primary
Gemini fallback
        ↓
published evidence catalogue
```

The site already supports:

- evidence questions;
- pasted role descriptions;
- automatic question/role detection;
- evidence-grounded recruiter review;
- an Experience Fit Map;
- optional recruiter follow-up;
- explicit consent;
- recruiter email/name/organisation;
- D1 persistence;
- 90-day enquiry retention;
- notification email to Marcus;
- idempotent enquiry submission IDs;
- rate limiting;
- allowlisted origins.

Do not replace these components.

## 2. Objective

Turn meaningful recruiter interactions into durable artifacts capable of emitting lightweight events.

Separate:

```text
ordinary interaction
        ↓
analytics / artifact only

meaningful interaction
        ↓
event
        ↓
agent
        ↓
useful follow-up
```

MCP Events must not make every AI query trigger another LLM call.

## 3. Event taxonomy

Define three domain events.

### `recruiter.enquiry_submitted`

Source:

```text
POST /api/recruiter-enquiry
```

This is the strongest event because the visitor has:

- supplied contact information;
- explicitly consented;
- requested follow-up.

Implement agent subscription first.

### `recruiter.role_analysis_completed`

Source:

```text
POST /api/recruiter-review
mode = role
```

Store a privacy-minimized analysis artifact.

Initially: artifact + event capability implemented, autonomous agent handling disabled by default.

### `recruiter.evidence_inquiry_completed`

Source:

```text
POST /api/recruiter-review
mode = question
```

Store minimal artifact/analytics.

Initially: do not wake an agent for ordinary evidence questions.

## 4. Architecture

```text
GitHub Pages
     │
     ▼
Recruiter Review Worker
     │
     ├──────── ordinary evidence question
     │              ↓
     │       minimal interaction artifact
     │              ↓
     │          analytics only
     │
     ├──────── role analysis
     │              ↓
     │       analysis artifact
     │              ↓
     │   role_analysis_completed
     │              ↓
     │        disabled subscriber
     │
     └──────── consented enquiry
                    ↓
               D1 enquiry
                    ↓
          enquiry_submitted
                    ↓
                MCP Event
                    ↓
              recruiter agent
                    ↓
            read enquiry/artifact
                    ↓
             notify / summarize
```

## 5. Artifact model

Do not persist raw recruiter-review input by default merely to support Events.

Create a privacy-minimized interaction artifact.

Conceptual:

```text
id
kind
created_at
mode
evidence_ids
result_state
provider
degraded
contact_enquiry_id nullable
```

For role analysis, add only data justified by the product requirement.

If retaining the original role description is desired, treat that as a separate privacy/retention decision rather than silently introducing it as part of MCP Events.

## 6. Event envelope

```json
{
  "event_id": "uuid",
  "event_type": "recruiter.enquiry_submitted",
  "schema_version": 1,
  "occurred_at": "ISO-8601",
  "artifact_id": "uuid",
  "enquiry_id": "uuid"
}
```

- No email address in the webhook payload.
- No pasted job description.
- No recruiter question.
- No model output.

The receiving agent retrieves permitted data explicitly.

## 7. MCP read tools

Implement narrowly.

### `recruiter.get_enquiry`

Input:

```json
{ "enquiry_id": "uuid" }
```

Returns consented enquiry data needed for follow-up.

### `recruiter.get_interaction_artifact`

Input:

```json
{ "artifact_id": "uuid" }
```

Returns bounded non-sensitive analysis metadata and relevant evidence IDs.

Do not expose arbitrary D1 querying.

## 8. First active workflow

Only `recruiter.enquiry_submitted` should wake the agent initially.

Agent output:

```json
{
  "interaction_summary": "...",
  "submission_kind": "question | role",
  "organisation": "...",
  "recommended_action": "reply | inspect | no_action",
  "reason": "...",
  "evidence_context": []
}
```

No automatic outbound email in Phase 1.

The existing deterministic Cloudflare email notification may remain. The event agent supplements it with structured context.

## 9. Avoid duplicated notifications

Current architecture already sends Marcus an email after `/api/recruiter-enquiry`.

Do not create:

```text
existing email
+
agent sends another email
+
automation sends third notification
```

Phase 1:

```text
existing email = immediate notification
event agent = structured processing
```

If agent-based notification later proves superior, replace the old path explicitly rather than stacking notifications.

## 10. D1 changes

Prefer adding:

```text
recruiter_interaction_artifacts
event_outbox
event_processing
```

only if equivalent tables do not already exist.

Example conceptual schemas:

```text
recruiter_interaction_artifacts
- id
- kind
- mode
- evidence_ids_json
- result_state
- provider
- degraded
- created_at
- expires_at
```

```text
event_outbox
- id
- event_type
- aggregate_id
- schema_version
- occurred_at
- published_at
- delivery_attempts
- last_error
```

```text
event_processing
- event_id
- processor
- status
- processed_at
```

Do not mix consented recruiter contact records with non-consented interaction telemetry.

## 11. Retention

Existing recruiter enquiries are deleted after 90 days.

Preserve that behavior.

Artifacts referencing deleted enquiries must either:

- expire at or before the enquiry;
- lose the relationship when the enquiry is deleted;
- contain no retained personal data.

Define and test this explicitly.

## 12. Event filters

Subscriptions should support narrow event selection.

Initial subscription:

```text
recruiter.enquiry_submitted
```

Do not subscribe to:

```text
recruiter.evidence_inquiry_completed
recruiter.role_analysis_completed
```

until their value is demonstrated.

## 13. Token budget

Expected agent-triggering volume should be tiny.

Rules:

```text
anonymous question → 0 additional event-agent inference
anonymous role analysis → 0 additional event-agent inference initially
consented enquiry → max 1 event-agent inference
duplicate delivery → 0 additional inference
```

This gives an extremely clean cost boundary.

## 14. Security

Maintain current boundaries:

- Cloudflare secrets remain server-side;
- origin allowlist remains authoritative;
- rate limiter remains authoritative;
- MCP read tools expose allowlisted fields;
- no provider keys enter Git;
- no recruiter email appears in event payload;
- event deliveries are signed/verified according to current MCP Events requirements;
- no arbitrary event producer endpoint is exposed publicly.

## 15. Tests

Add contract tests for:

```text
event schemas
artifact schemas
minimal payload guarantees
```

Add Worker tests:

```text
question review creates expected artifact behavior
role review creates expected artifact behavior
enquiry creates event
duplicate enquiry does not create duplicate logical event
provider fallback behaves unchanged
event failure does not break recruiter review
event failure does not lose consented enquiry
```

Add privacy tests:

```text
event payload excludes email
event payload excludes raw recruiter input
event payload excludes model output
expired enquiry cannot leak through MCP read tool
```

Add end-to-end test:

```text
browser
→ recruiter review
→ follow-up consent
→ enquiry
→ event
→ read tool
→ structured processing
```

## 16. Failure semantics

The public recruiter experience is primary. Therefore:

```text
MCP/event outage
≠
recruiter API outage
```

Event publishing must not make successful recruiter review dependent on ChatGPT/MCP availability.

Use durable asynchronous delivery/outbox semantics.

## 17. PR sequence

### PR 1 — Domain event contracts

Add:

- event taxonomy;
- artifact contract;
- ADR;
- retention/privacy rules;
- event test fixtures.

No production behavior.

### PR 2 — Interaction artifacts

Extend Worker/D1. Preserve `/api/recruiter-review` response contract. Add tests.

### PR 3 — Durable event outbox

Emit:

```text
recruiter.enquiry_submitted
recruiter.role_analysis_completed
recruiter.evidence_inquiry_completed
```

but do not subscribe agents to the latter two.

### PR 4 — MCP Events endpoint

Implement current MCP Events protocol requirements:

```text
events/list
events/subscribe
events/unsubscribe
```

plus signed webhook delivery, retry/idempotency and subscription lifecycle.

### PR 5 — Recruiter MCP read tools

Implement `recruiter.get_enquiry` and `recruiter.get_interaction_artifact` with strict field allowlists.

### PR 6 — First active subscription

Enable only `recruiter.enquiry_submitted`. Add structured agent processing.

### PR 7 — Evaluation instrumentation

Measure:

```text
event count
successful deliveries
duplicate deliveries
agent runs
token usage
useful-action rate
failures
```

## 18. Definition of done

The experiment is complete when:

- current recruiter review remains unchanged for visitors;
- current enquiry flow remains functional;
- meaningful interactions create durable artifacts where intended;
- consented enquiry produces exactly one logical event;
- agent can retrieve permitted context;
- event failure cannot break the public API;
- anonymous questions consume no additional event-agent tokens;
- role analyses do not wake agents by default;
- duplicate delivery causes no duplicate processing;
- retention rules are enforced;
- tests pass;
- existing release validation passes.

## 19. Stop rule

Do not activate role-analysis or evidence-question subscriptions until real recruiter usage shows a concrete downstream action worth automating.

The presence of an event is not sufficient reason to run an agent.
