# Design identity

## Intent

This site presents evidence of product judgment, execution, and AI-native workflow design. It must feel restrained, editorial, and credible. It must not look like a generic AI product, a developer dashboard, or a personal branding template.

The design uses warm paper, dark ink, and small gold and teal accents. Hierarchy, spacing, and evidence labels do most of the visual work.

## Principles

1. Lead with the hiring case.
2. Make claims easy to scan.
3. Place evidence close to each claim.
4. Use hierarchy before decoration.
5. Keep each page readable in print.
6. Show status and evidence boundaries clearly.

## Tokens

```css
:root {
  --paper: #f7f3eb;
  --surface: #fffdf8;
  --ink: #171815;
  --muted: #626159;
  --line: #d8d1c4;
  --gold: #a86d25;
  --gold-soft: #efe1ca;
  --teal: #35695a;
  --teal-soft: #dce9e3;
  --dark: #11120f;
}
```

Do not use gradients, neon colors, purple AI effects, decorative glow, large rounded containers, or skill bars.

## Typography

Use a system-first sans-serif stack. Keep body text between 15 and 18 pixels with generous line height. Use compact uppercase only for short evidence labels. Keep long reading lines between 55 and 72 characters.

## Layout

The default reading order is:

1. Identity and value statement.
2. Two-minute hiring brief.
3. Claim-to-evidence summary.
4. Selected proof library.
5. Working method.
6. AI-assisted review prompt.
7. CV and conversation call to action.

Use a centered 1120-pixel content column. Use a 12-column grid on wide screens and one column below 760 pixels. Keep interactive targets at least 44 pixels high. Preserve visible focus and the same content order at every supported width.

## Components

- Identity block: role posture, value statement, and the three-part support line.
- Hiring brief: fit for hands-on product work before employment chronology.
- Claim-to-evidence card: one precise claim, one interpretation, and one evidence link.
- Proof card: problem, decision, evidence status, and next action. A second, subordinate proof card uses a "Supporting proof" pill instead of "Lead proof" and omits the primary pill entirely.
- Process strip: Discover → Define → Build → Improve. A second, human-gated system-loop strip can sit beneath it: Execute → Review → Detect pattern → Human gate → Promote → Next cycle.
- Loop diagram: the light-context counterpart to the system-loop strip, used on the recursive-workflow supporting-proof page (not inside a dark section). A numbered step list plus a two-path branch card (confirmed pattern vs. one-off) showing the human-gate outcome. Uses root tokens only (`--gold`, `--teal`, `--line`, `--surface`, `--muted`) — never the process strip's dark-only hardcoded colors, since this component can appear on a light `.section`.
- Decision log: a stacked, single-column list of tagged, dated entries (date, capability-tag pills, one-line why, one-line what-it-shows), auto-published weekly directly as static HTML (never client-fetched) so the content is present in the raw page a non-JS-executing reader or agent receives. Reuses `.limitations-list--stacked`'s bordered-stack pattern rather than a card grid, to read as a scannable log, not a case study. A companion `site/evidence/decision-log.json` carries the full structured history for programmatic readers; `site/evidence/decision-log-tags.json` carries the current tag taxonomy. Renders an explicit "no entries yet" state when empty.
- AI review prompt: public evidence only, evidence separated from inference. The hero can offer a secondary "Review fit with AI" action beside the primary CV action, linking to this section rather than duplicating its copy control.
- Contact panel: CV download, interview request, email, and copy-email fallback.
- Header repository link: a quiet, muted-color link in the masthead pointing to the public GitHub repository. It never competes visually with the primary conversion actions and is hidden below 760 pixels.
- Status labels: compact pills for evidence and product maturity. Known values: "Work in progress", "Lead proof", "Supporting proof", "Working title" (labels a product name as temporary, not final).

## Print

Use the same semantic document for screen and print. Remove navigation and copy controls in print. Keep evidence, status, source labels, links, and contact details visible. Avoid page breaks inside evidence cards.

