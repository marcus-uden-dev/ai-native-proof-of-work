# Todo: Clarify the homepage entry points and reading order

Status: `Proposed`
Priority: `High`
Scope: `Homepage annotation 1 only`
Owner: Marcus + Codex

## Annotation

The hero currently presents five equal-looking actions and two explanatory notes. The reader must decide between `Download CV`, `Read CV facts`, `Review fit with AI`, `Open Decision Log`, and `See selected proof` before the page has explained the intended reading order.

## Design problem to solve

The homepage should answer three questions in order:

1. What kind of work does Marcus do?
2. Where should I start if I want to assess fit quickly?
3. Where can I inspect the work, decisions, and AI-assisted process in more depth?

The current action row mixes these levels. It also makes `Download CV` and `Read CV facts` look like separate destinations even though the CV facts page should be the main CV entry point, with the download action available there.

## Recommended information architecture

### 1. Hero: one clear starting point

Keep the positioning statement and supporting line. Replace the five-chip action row with three ordered entry points:

| Order | Label | Destination | Role |
|---|---|---|---|
| 1 | `CV` | `cv/` | The fastest way to assess background and current focus. The CV facts page owns the `Download CV` action. |
| 2 | `See selected work` | `#selected-proof` | The fastest route to concrete product examples. |
| 3 | `See how I think` | `#how-i-think` | The route to decisions, trade-offs, and the working method. |

### 2. Optional AI route: explain before asking for a click

Move the AI action out of the primary row into a distinct, clearly labelled block:

- Label: `Optional AI review`
- Heading: `Want a second read on fit?`
- Copy: `Open a ready-made prompt for ChatGPT or Claude to review the public evidence against a role or question.`
- CTA: `Review my fit with AI`

This makes the external-assistant boundary useful context instead of a footnote competing with the main actions.

### 3. Explain the site below the hero

Move the current `What it is` explanation closer to the `How I think` section, where the dated decisions and trade-offs are actually introduced. Keep the explanation short and concrete:

`This site is a guided index of selected work, public decisions, and the evidence behind them.`

The detailed Decision Log remains available from the `How I think` section, but it is no longer presented as the first decision a visitor must make.

## Copy proposal

### Recommended hero actions

- `CV`
- `See selected work`
- `See how I think`
- `Review my fit with AI`

### Alternative wording for the AI route

- `Ask AI to review my fit` — clearest about the action, but longer.
- `Open the AI fit review` — compact, but less conversational.
- `Review this profile with AI` — clear about the input, but slightly less personal.

Recommendation: `Review my fit with AI`, with the explanatory sentence directly above it.

## Proposed design variants

- **A — Guided entry points (recommended):** three ordered primary paths, then a separate optional AI review panel. Best balance of clarity and continuity with the current page.
- **B — Reader path:** a horizontal three-step “Start here” rail makes the intended reading order explicit before the optional AI route.
- **C — Split navigation:** a left-side “Choose your depth” rail separates quick assessment, selected work, and method from the optional AI review. Strongest hierarchy, but more structural change.

## Acceptance criteria

- [ ] The hero has one CV entry point, not separate CV download and CV facts chips.
- [ ] The CV facts page contains the download action.
- [ ] `See selected work` replaces the unclear `See selected proof` wording.
- [ ] `See how I think` replaces `Open Decision Log` in the hero.
- [ ] The AI route explains what the external assistant does before the CTA.
- [ ] The page presents a clear quick-to-deep reading order.
- [ ] The current visual language remains recognisable and works on mobile.
- [ ] No live-site implementation starts until a design variant is approved.

## Review artifact

[Homepage clarity and structure preview](../docs/prototypes/homepage-clarity-structure-annotation-01-preview.html)

## Next action

Choose A, B, or C, or adjust the proposed entry-point labels before implementation.
