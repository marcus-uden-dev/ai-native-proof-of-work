# Todo: Homepage annotation batch

Status: `Shipped — continue collecting annotations for the next batch`
Priority: `High`
Scope: Homepage and directly linked proof surfaces
Owner: Marcus + Codex

## Batch rule

Collect reviewed annotation items here before implementation. Each item moves through:

`Incoming` → `Proposed` → `Preview approved` → `Ready for batch` → `Shipped`

Only items marked `Ready for batch` are included in the next implementation branch and merged together.

For every annotation, show a local preview and receive review feedback before the item can move to `Ready for batch`. Do not push or merge an annotated change without that preview step.

## Items

| ID | Status | Surface | Change | Review artifact |
|---|---|---|---|---|
| H-01 | Shipped | Homepage header | Group all first-level destinations in one centred navigation. | PR 49 |
| H-02 | Shipped | Homepage hero | Clarify that `Interview my work` opens the embedded AI assistant and explain what it can review. | PR 50; [local preview](../docs/prototypes/homepage-ai-review-hero-annotation-01-preview.html) |
| H-03 | Shipped | Homepage → Job-agent | Remove the Job-agent evidence band and its `Read the current proof` link from the homepage. Keep the detailed evidence boundary on the Job-agent case study, before the interface. | PR 50; [local preview](../docs/prototypes/homepage-job-agent-boundary-relocation-annotation-01-preview.html) |
| H-04 | Shipped | How I think and Decision Log introductions | Use a short project-map description in How I think, and place the decision-history explanation beside the Decision Log heading. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-05 | Shipped | How I think kicker | Remove the `WIP` label. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-06 | Shipped | How I think actions | Remove the public raw-JSON route from the primary page. Keep the JSON as repository evidence, not a recruiter CTA. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-07 | Shipped | How I think → Decision Log | Move the existing Decision Log directly below the existing How I think section. Replace its external action with one in-page continuation link. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-08 | Shipped | Decision Log data pipeline | The 2026-08-26 JSON record has no `project`, so it cannot be rendered into the static project-filtered log. Add its project classification, regenerate the static entry and summary counts, and add a parity check that fails when JSON, static entries, and metrics disagree. | PR 50; previewed locally before merge |
| H-09 | Shipped | How I think project cards | Stack capability chips vertically and align the stacks across all four project cards. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-10 | Shipped | How I think project cards | Place Personal AI Harness beside Job-agent, followed by PKM and Household budget. | PR 50; [local preview](../docs/prototypes/homepage-how-i-think-decision-log-relocation-annotation-01-preview.html) |
| H-11 | Preview available | Homepage evidence labels | Increase the global gold metadata-label size slightly while preserving the existing visual language. | [Clarity and label-scale preview](../docs/prototypes/homepage-clarity-language-annotation-01-preview.html) |
| H-12 | Preview available | Hiring case kicker | Replace the ambiguous time estimate with a direct role-context label: `For hands-on product roles`. | [Clarity and label-scale preview](../docs/prototypes/homepage-clarity-language-annotation-01-preview.html) |
| H-13 | Preview available | Decision Log introduction | State that the log is a growing, selected record and that more entries will be added as their evidence is prepared. | [Clarity and label-scale preview](../docs/prototypes/homepage-clarity-language-annotation-01-preview.html) |
| H-14 | Preview available | Claim-to-evidence section | Replace abstract claim language with a concrete problem-to-action framing and a clearer Job-agent proof link. | [Clarity and label-scale preview](../docs/prototypes/homepage-clarity-language-annotation-01-preview.html) |

## H-03 implementation note

The Job-agent case study already contains the complete evidence boundary after its release facts. No new duplicate notice is needed. The batch change removes only the homepage status band.

## Annotation intake

Add new items in this format:

| ID | Status | Surface | Change | Review artifact |
|---|---|---|---|---|
| H-XX | Incoming | | | |

## Batch readiness checklist

- [x] Every item has a clear scope and destination.
- [x] Every copy or layout change has an approved preview.
- [x] Links are mapped to valid public destinations.
- [x] The batch does not include unrelated cleanup.
- [x] The final implementation branch has targeted browser tests and release validation.

## Next action

Continue adding annotations for the next batch. Mark an item `Preview approved` when its direction is accepted, then `Ready for batch` when it should ship.
