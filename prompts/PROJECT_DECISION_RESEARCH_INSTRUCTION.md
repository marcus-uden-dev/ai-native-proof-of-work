---
title: Research project decisions for the public Decision Log
type: prompt
status: active
review_status: reviewed
tags: [decision-research, project-evidence, oracle, recruiter-evidence]
---

# Project Decision Research Instruction

Copy the prompt below into another ChatGPT session or research chat. Give the session access to the relevant repository folders, exported documents, or a repository archive. Do not assume access to files that have not been provided.

## Copyable prompt

```text
You are helping research historical decisions for a recruiter-facing, agent-readable public Decision Log.

Your task is to find meaningful decisions made about the individual product repositories, not only decisions about the portfolio repository or Personal AI Harness.

The portfolio contains these project lenses:

- job-agent: lead product proof
- pkm: supporting product proof
- household-budget: supporting product proof
- personal-ai-harness: memory, agents, automation, recursive improvement, evidence capture, and portfolio operating layer

The repository that stores the evidence is not automatically the project that owns the decision. Classify each decision by the product or system it governs.

## Research scope

Search the available sources in this order:

1. Project decision trails under `strategy/<project>/decisions/`.
2. Project product strategy under `strategy/<project>/product/`.
3. Project business, pricing, market, and GTM documents under `strategy/<project>/business/` and `strategy/<project>/market/`.
4. Relevant source-repository documentation, specs, issue exports, changelogs, and design notes, if the source repository is available.
5. Portfolio `logs/DECISION_LOG.md`, `docs/evidence/historical-decision-inventory.json`, plans, lessons, and sanitized incident reports.
6. Public case studies and status documents for corroboration.

Raw chat transcripts are not the primary source. Use them only when the user provides them and clearly labels them as evidence. Never publish raw chat content.

If a source is unavailable, write `Source unavailable` and continue. Do not invent contents.

## What qualifies as a decision

Include a record only when there is evidence of a meaningful choice, such as:

- choosing or rejecting a user flow
- defining where human review stays in the workflow
- deciding what telemetry or feedback signals to measure
- choosing a product boundary or MVP scope
- choosing an architecture or data model
- selecting, deferring, or rejecting a pricing model
- defining a business model, GTM, ICP, or commercial test
- choosing a privacy, consent, data-rights, or security boundary
- selecting a validation method or quality gate
- deciding how a feature should support a user or stakeholder

Do not treat routine implementation activity, a file edit, a tool choice, or a task completion as a decision unless the source explains the choice and its trade-off.

## Required evidence test

For every candidate, extract:

`Context -> Options considered -> Trade-offs -> Decision -> Evidence -> Open questions -> Next action`

If the source does not contain all fields, preserve only what is supported and mark missing fields as `Not stated`. Do not reconstruct hidden reasoning.

## Date and status rules

- Use the explicit decision date in the source.
- If only a month or year is known, preserve that precision.
- Never infer a decision date from file modification time, commit time, or discovery time.
- Use one primary project ID from this exact set: `job-agent`, `pkm`, `household-budget`, `personal-ai-harness`.
- Use `Verified` when the decision and its evidence are implemented or directly documented.
- Use `Planned` when the decision is an intended next step or product direction that is not implemented.
- Use `Hypothesis` when it is a testable assumption, especially pricing, value, GTM, or market reasoning.
- Use `Open Question` when no decision has been made.
- Use `Rejected` only when the source explicitly records rejection.
- Do not turn a hypothesis into a verified outcome.

## Tagging rules

Assign 3 to 7 capability tags from the repository's current decision-log taxonomy. Prefer capability tags over implementation details.

Choose tags that are directly supported by the record, for example:

- user flow: `product-discovery`, `problem-framing`, `decision-support`, `human-in-the-loop`
- telemetry and learning: `validation`, `quality-assurance`, `continuous-improvement`, `decision-traceability`
- pricing and business model: `product-judgment`, `prioritization`, `commercial-awareness`, `value-creation`
- architecture and data: `systems-thinking`, `technical-judgment`, `risk-controls`, `governance-architecture`
- privacy and trust: `risk-awareness`, `security-by-design`, `evidence-driven`

Do not assign a tag only because a tool, framework, or file name appears in the source. Do not use future or unapproved tags.

## Project ownership checks

Before accepting a record, ask:

1. What product or system does this decision change?
2. Is the decision about the product itself, or only about how the portfolio documents it?
3. Would the decision still exist if the proof repository were renamed or moved?
4. Does the evidence belong to the project, the Personal AI Harness, or both?

If a decision affects both a project and the harness, choose the system that owns the primary choice and mention the other as a related system only in notes. Do not duplicate the same decision under two projects.

## Public safety rules

The public Decision Log may contain:

- sanitized decision summaries
- stable project IDs and display names
- decision type
- lifecycle status
- capability tags
- repo-relative public evidence links
- clearly labelled hypotheses and planned decisions

Do not include:

- raw conversations or hidden model reasoning
- private local paths
- secrets, credentials, or tokens
- private financial or family details
- confidential employer or customer information
- unsupported metrics, revenue, conversion, adoption, or market outcomes
- internal automation mechanics that are not useful to a recruiter

## Required output

Return three sections.

### 1. Candidate decision inventory

Use a table with these columns:

| Field | Required content |
|---|---|
| `id` | Stable ID such as `decision-YYYY-MM-DD-project-short-name` |
| `decision_date` | Explicit date and precision |
| `primary_project` | One project ID |
| `decision_type` | Product flow, telemetry, pricing, architecture, privacy, validation, GTM, or similar |
| `lifecycle_status` | Verified, Planned, Hypothesis, Open Question, or Rejected |
| `title` | Short recruiter-readable title |
| `context` | The problem or trigger |
| `decision` | The chosen direction |
| `tradeoff` | What was accepted or deferred |
| `evidence_refs` | Available source paths or links |
| `capability_tags` | 3 to 7 approved tags |
| `public_eligibility` | Eligible, eligible-after-redaction, or needs-review |
| `redaction_notes` | What must stay private |

### 2. Recommended public additions

Select only the strongest candidates. Explain why each one helps a recruiter understand product judgment, user-flow thinking, telemetry, pricing reasoning, architecture, or risk management.

### 3. Evidence gaps and questions

List decisions that need a source, date, clearer ownership, human review, or better public redaction. Do not fill gaps with assumptions.

End with a short count by project and by lifecycle status.

Do not edit or publish files unless the user explicitly asks you to implement the recommendations. This research pass produces a reviewable inventory first.
```

## Review checklist

Before importing any candidate into the public Decision Log, verify:

- The primary project is correct.
- The date is explicit and correctly ordered.
- The record describes a decision, not only activity.
- The status is honest.
- The tags are supported by the evidence.
- Pricing and commercial records are labelled as hypotheses or planned when they are not validated.
- Telemetry records do not claim outcomes that have not been measured.
- User-flow records explain user control, boundaries, or trade-offs.
- Public redaction removes private paths, raw conversations, secrets, and sensitive personal data.
- The candidate does not duplicate an existing Decision Log record.
