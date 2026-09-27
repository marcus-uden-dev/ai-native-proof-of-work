# Todo: Clarify the homepage hero actions

Status: `Proposed`
Priority: `High`
Scope: `Annotation 1 only`
Owner: Marcus + Codex

## Annotation

The hero action row has too many controls with similar visual weight. The CV actions overlap, the AI action is vague, and the links to the Decision Log and portfolio do not explain the next step clearly enough.

## Proposed copy

| Current | Proposed | Reason |
|---|---|---|
| Download CV | Move to the CV page | Keep the hero focused; the CV page can explain the facts and offer the download. |
| Read CV facts | `CV` | Short, familiar, and clear. |
| Review fit with AI | `Compare a role with my evidence` | Describes the actual action without promising an automatic fit verdict. |
| Open Decision Log | `Read the Decision Log` | Makes the destination and action explicit. `Open the Decision Log` remains a valid shorter alternative. |
| See selected proof | `Explore the portfolio` | Uses a more familiar recruiter-facing term than “proof”. |

### Recommended hero action set

1. Primary: `Explore the portfolio`
2. Secondary: `Read the Decision Log`
3. Secondary: `Compare a role with my evidence`
4. Quiet utility link: `CV`

The CV page should contain the prominent `Download CV` action. This keeps the download available without making the hero action row compete with four other destinations.

## Proposed design change

Replace the five chip-like controls with a clear hierarchy:

- one filled primary action for the portfolio;
- two outlined actions for reading the Decision Log and comparing a role;
- one unboxed, quiet `CV` link;
- desktop: one compact action group aligned under the hero copy;
- mobile: primary action full width, secondary actions below it, and `CV` as a small utility link.

The preview file contains three alternatives for this same action group:

- **A — Clear priority:** one primary action, two secondary actions, one utility link;
- **B — Intent lanes:** portfolio and decision history are grouped as the main reading path, with role comparison separated as a utility action;
- **C — Numbered route:** the actions become a short reading path rather than a row of buttons.

## Acceptance criteria

- [ ] Hero no longer presents five similarly weighted chip controls.
- [ ] CV download is available from the CV page, not required in the hero.
- [ ] AI CTA describes role comparison against public evidence.
- [ ] Portfolio and Decision Log links state what the reader can do next.
- [ ] The chosen layout works at desktop and mobile widths.
- [ ] No live-site implementation starts until Marcus selects or adjusts a proposal.

## Review artifact

[Homepage hero actions — annotation 1 preview](../docs/prototypes/homepage-hero-actions-annotation-01-preview.html)

## Next action

Choose A, B, or C, or adjust the proposed labels before implementation.
