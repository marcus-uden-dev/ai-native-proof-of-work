# Todo: Clarify the claim-to-evidence section CTA

Status: `Proposed`
Priority: `High`
Scope: `Annotation 1 only`
Owner: Marcus + Codex

## Annotation

The heading `Three signals for the first conversation` is abstract. It does not tell the reader what the three cards are, what opens when they click, or why the section matters in the portfolio.

## Copy proposal

### Recommended section copy

- Kicker: `What you can inspect`
- Heading: `See how I turn a claim into a decision.`
- Supporting copy: `Each example pairs a product claim with the public artifact behind it. Open one to see the reasoning, trade-offs, and evidence.`

### Recommended card CTAs

| Card | Current CTA | Proposed CTA | What the reader gets |
|---|---|---|---|
| Product judgment | Inspect the research decision | `See the company research decision` | The research trail and the pursue / investigate / pass decision. |
| Execution | Follow the proof sequence | `See how the scope became working proof` | The path from intake to a concrete product workflow. |
| AI-native leverage | See the evidence boundary | `See how the AI workflow is governed` | The human review, memory, backup, and evidence controls behind the work. |

### Alternatives to test

- `Three ways to inspect the work` — more direct, but less explanatory.
- `Open the reasoning behind the work` — stronger promise, but may sound too broad for three focused cards.
- `See the decision, not just the claim` — memorable, but slightly more rhetorical.

## Proposed design change

Keep the existing claim cards, but make the interaction explicit:

- replace the abstract heading with a sentence describing the inspection action;
- add one short explanation below the heading;
- make each CTA describe the destination and the evidence the reader will see;
- keep `Claim → Evidence` as the section label because it explains the relationship;
- use one consistent text-link treatment for all three actions.

The review preview compares three structures:

- **A — Guided inspection:** recommended heading and three clear card actions;
- **B — Three routes:** numbered actions make the next click explicit;
- **C — Claim / evidence split:** each card makes the relationship visible before the CTA.

## Acceptance criteria

- [ ] A recruiter can explain what the section contains without reading the cards in detail.
- [ ] Every CTA states what opens or what the reader will inspect.
- [ ] The three cards keep their existing evidence boundaries.
- [ ] The selected design works on mobile without creating another chip row.
- [ ] No live-site implementation starts until the copy and variant are approved.

## Review artifact

[Claim-to-evidence CTA preview](../docs/prototypes/homepage-claim-evidence-annotation-01-preview.html)

## Next action

Choose A, B, or C, or adjust the recommended heading and card CTAs before implementation.
