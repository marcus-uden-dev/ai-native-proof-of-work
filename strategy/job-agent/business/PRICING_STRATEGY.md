# Earned Signal Pricing Strategy

Last updated: 2026-11-24
Status: Closed beta free / Paid model hypothesis not validated

## Project Scope

Project: Earned Signal (historical project label: job-agent).

Role in portfolio: primary proof point and lead career workflow product.

## Pricing Philosophy

Pricing should reflect career workflow value, not generic AI text generation.

Users are not paying for "more AI output." They are paying for better application throughput, stronger tailoring, less context switching, safer handling of personal career data, and a clearer feedback loop.

## Pricing Options Considered

| Model | Example | Pros | Cons | Status |
|---|---|---|---|---|
| Free + Pro | Free tracking, paid application support | Low adoption friction | Conversion risk | Hypothesis |
| Monthly subscription | Active job-search plan | Recurring revenue | Must show ongoing value quickly | Hypothesis |
| Job-search sprint package | Fixed setup or 4-week package | Clear value frame | Less scalable | Hypothesis |
| Usage-based credits | Pay per analyzed job or generated package | Cost-aligned | Can discourage usage | Deferred |
| Coach license | Per coach/client seat | Higher value buyer | Requires different workflow | Deferred |

## Current Decision

Keep the closed beta free while the product is learning from a controlled cohort. Do not use beta access as evidence of willingness to pay.

The paid model to assess after the beta is a Pro subscription plus optional credit packs. That is a product hypothesis, not validated pricing. Stripe remains test-mode only during the beta.

## Reasoning Trail

```text
Context → Users need better job-search outcomes and less workflow friction, not generic AI content.
Options Considered → Free/pro, subscription, sprint package, usage-based credits, coach license.
Tradeoffs → Sprint pricing is concrete but less recurring; subscription is scalable but needs sustained perceived value.
Decision → Keep the beta free; defer paid monetization until controlled-use evidence is stronger. Assess Pro plus optional credit packs after the beta.
Evidence → Closed-beta release decision and current beta terms; willingness to pay remains unmeasured.
Open Questions → Which workflow creates repeatable value, whether users will pay for it, and whether subscription plus credits matches actual use.
Next Action → Measure beta value first, then test paid positioning against observed usage and feedback.
```

## Evidence

See [Job-Agent Case Study](../../../case-studies/JOB_AGENT_CASE_STUDY.md) and [Project Proof Points](../../../PROJECT_PROOF_POINTS.md).

## Validation Needed

- Which beta workflows create repeatable value before price enters the discussion?
- Does usage support a subscription, credit packs, another model, or no paid product at all?
- What price feels acceptable during an active job search?
- Can value be measured through time saved, application quality, interviews, or another outcome without relying on self-reported activity alone?
