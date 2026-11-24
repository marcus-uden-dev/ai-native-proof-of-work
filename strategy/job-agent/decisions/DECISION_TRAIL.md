# Earned Signal Strategy Decision Trail

Last updated: 2026-11-24
Status: Active

## Purpose

This file captures major Earned Signal strategy decisions that affect positioning, product direction, value proposition, pricing, business model, or GTM.

## Decision Format

Use this visible reasoning format:

```text
Context → Options Considered → Tradeoffs → Decision → Evidence → Open Questions → Next Action
```

## Decisions

### 2026-11-24 — Keep the closed beta free while learning

#### Context

The first external cohort is small and controlled. Charging at this point would mix product-learning questions with willingness-to-pay questions before repeatable value is established.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Paid beta | Tests payment earlier | Confounds product learning with pricing and adds consumer/commercial complexity |
| Free invite-only beta | Keeps the learning loop focused | Does not validate willingness to pay |
| Broad free launch | More usage quickly | Higher support, privacy, reliability, and reputation risk |

#### Tradeoffs

A free closed beta gives weaker commercial evidence but cleaner product-learning evidence and a smaller risk surface.

#### Decision

Keep the closed beta free. Assess a Pro subscription plus optional credit packs only after stronger usage and value evidence exists.

#### Evidence

Committed beta release and business/legal decision records document the free-beta decision and test-mode payment boundary.

#### Open Questions

- Which workflows create repeatable value?
- What outcomes can be measured credibly?
- Does actual usage support subscription plus credits or a different model?

#### Next Action

Collect controlled beta evidence before testing paid positioning.

### 2026-11-24 — Release to a constrained invite-only cohort

#### Context

The product had passed internal implementation and operational hardening, but still lacked evidence from external use.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Wait for final hosting and broader production setup | Lower operational uncertainty | Delays learning from real use |
| Open access broadly | Faster usage volume | Larger privacy, support, reliability, and reputation risk |
| Invite-only closed beta | Real external learning with bounded exposure | Small, non-representative cohort |

#### Tradeoffs

A constrained cohort limits learning speed and cannot establish market validation, but it makes failures easier to contain while the product is still changing.

#### Decision

Release to an invitation-only closed beta and expand deliberately rather than treating deployment readiness as a reason for broad availability.

#### Evidence

The first invited tester signed in and accepted the current terms on 2026-11-24. Authentication, smoke checks, telemetry, backup/restore, and reboot recovery were recorded as verified before or around the first invitation.

#### Open Questions

- Which failure modes appear only under external use?
- How quickly should the cohort expand?
- What evidence threshold should precede broader availability?

#### Next Action

Invite additional testers deliberately and measure repeatable user value.

### 2026-11-23 — Gate invitations on trust and recovery checks

#### Context

A technically reachable beta is not enough if authentication, consent, observability, backup, or recovery fail under use.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Invite as soon as the service is reachable | Fastest path to feedback | Higher chance of avoidable trust and recovery failures |
| Gate invitations on operational checks | Slower | Better evidence that failures can be detected and recovered |

#### Tradeoffs

The gate delays user feedback but reduces the probability that the first external experience is dominated by preventable operational failure.

#### Decision

Require authentication, terms acceptance, telemetry, backup/restore, reboot recovery, and pre-invitation smoke checks before treating the beta as ready to invite.

#### Evidence

Committed checkpoints record those checks as completed before the first invitation milestone.

#### Open Questions

- Which checks should become permanent automated release gates?
- Which failures need explicit tester-facing fallback behavior?

#### Next Action

Use beta incidents and feedback to refine the gate rather than relaxing it by default.

### 2026-05-11 — Position job-agent as a reviewed career workflow product

#### Context

Job-agent can be misunderstood as a generic AI application writer or as a fully autonomous job applier. The stronger product strategy is a reviewed workflow that connects discovery, CV/profile context, application support, privacy, and feedback.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Generic AI application writer | Easy to explain | Weak differentiation and quality risk |
| Fully autonomous applier | Strong automation story | High trust, legal, spam, and platform risk |
| Reviewed career workflow product | Better trust and product depth | More complex product surface |

#### Tradeoffs

Reviewed workflow positioning is more complex than a simple AI-writing story, but it better reflects the privacy, QA, feedback, and user-control requirements of the product.

#### Decision

Position job-agent as a reviewed career workflow product, not a generic AI writer or autonomous applier.

#### Evidence

Internal project summaries show CV workflow, discovery, application support, feedback loops, privacy/data-rights planning, QA, deployment, telemetry, and billing/product decisions.

#### Open Questions

- Which workflow step is the strongest wedge for a first external demo?
- What evidence can be safely shown without exposing private project material?
- Which pricing frame is easiest for users to understand?

#### Next Action

Add recruiter-safe screenshots or excerpts that show the reviewed workflow without exposing private data.
