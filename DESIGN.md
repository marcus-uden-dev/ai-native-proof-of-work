---
created: 2026-08-18
author: Marcus Udén (Codex)
source_tool: Codex
source: recruiter brief concept
type: reference
status: active
review_status: pending
visibility: public
tags: [design, portfolio, recruiter, proof-of-work]
---

# Design Identity

## Overview

This repository presents evidence of product judgment, execution, and AI-native workflow design.

The visual system must feel restrained, editorial, and credible. It must help a recruiter find useful evidence quickly. It must not look like a generic AI product, a developer dashboard, or a personal branding template.

The primary recruiter-facing mode uses warm paper, dark ink, and small gold and teal accents. Interactive demos can retain a dark mode with the same semantic accents.

The main design principles are:

- Lead with the hiring case.
- Make claims easy to scan.
- Place evidence close to each claim.
- Use hierarchy before decoration.
- Keep each page readable in print.
- Show status and evidence boundaries clearly.

## Colors

Use these tokens as the default recruiter-facing palette.

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

Usage rules:

- Use `--paper` for the page background.
- Use `--surface` for evidence cards and raised paper sections.
- Use `--ink` for primary text.
- Use `--muted` for support text and metadata.
- Use `--gold` for strategic emphasis and primary actions.
- Use `--teal` for evidence, verification, and secondary actions.
- Use `--line` for borders and dividers.
- Do not use gradients.
- Do not use neon colors, purple AI effects, or decorative glow.
- In print, keep backgrounds light and preserve strong text contrast.

Interactive demos can use the existing dark palette:

```css
[data-theme="dark"] {
  --paper: #090907;
  --surface: #12100d;
  --ink: #f3eadc;
  --muted: #a99d8b;
  --line: #312a20;
  --gold: #d4a259;
  --teal: #7eb8a4;
}
```

## Typography

Use a system-first sans-serif stack. Do not require a network font.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

Typography roles:

- Display: 42–64 px on screen, 29–34 pt in print, weight 650–750.
- Section heading: 24–32 px, weight 650–750.
- Card heading: 17–21 px, weight 650–700.
- Body: 15–18 px, line-height 1.55–1.7.
- Metadata and labels: 11–13 px, weight 650–750, letter spacing 0.08–0.12 em.
- Avoid long all-capital text.
- Keep line length near 55–72 characters for long reading.
- Use sentence case for headings and actions.

## Layout

The default recruiter flow is:

1. Identity and value statement.
2. Two-minute hiring brief.
3. Claim-to-evidence summary.
4. Selected proof library.
5. Working method.
6. AI-assisted review prompt.
7. CV and conversation call to action.

Layout rules:

- Use a centered content column with a maximum width near 1120 px.
- Use a 12-column grid on wide screens.
- Collapse to one column below 760 px.
- Keep the first screen focused on identity, hiring value, and the main action.
- Place detailed proof below the hiring brief.
- Use generous section spacing of 64–104 px on screen.
- Use 20–32 px gaps within sections.
- Keep print margins between 14 and 18 mm.
- Avoid page breaks inside claims, proof cards, or calls to action.
- Keep headers with the content that follows them.
- Role-specific chips are deferred until their content paths are genuinely distinct.

## Elevation & Depth

The design uses paper layers, borders, and contrast. It does not use heavy shadows.

- Default cards: 1 px border using `--line`.
- Raised cards: subtle shadow only on screen.
- Print: remove shadows.
- Use one dominant surface level per section.
- Do not stack several nested cards.

## Shapes

- Card radius: 8–12 px.
- Button radius: 8 px.
- Evidence label radius: 999 px for compact pills only.
- Border width: 1 px.
- Avoid oversized rounded rectangles.
- Avoid decorative blobs or abstract AI shapes.
- Use short rules, dots, and arrows only when they clarify sequence.

## Components

### Identity block

Contains the role posture, value statement, and three-part support line.

Required copy:

- Experienced individual contributor
- Operational depth. Product thinking. AI-native execution.
- I turn messy operational problems into clear, buildable product work.

### Hiring brief

Use a clear heading such as “Why Marcus for hands-on product work?”

The brief must explain the fit before it shows the employment timeline. It can include a concise current-role context note when necessary.

### Claim-to-evidence card

Each card contains:

1. Claim category.
2. One precise claim.
3. One short evidence interpretation.
4. One link or status label.

Use the approved claim set:

- Product judgment — Identifies high-leverage problems before committing to solutions.
- Execution — Turns ambiguity into decision-ready scope and working proof.
- AI-native leverage — Uses AI to accelerate execution without outsourcing judgment.

### Proof card

Each proof card contains:

1. Project or evidence name.
2. Problem or context.
3. Decision or workflow.
4. Evidence status.
5. A clear next action.

Do not use skill bars or unsupported percentages.

### Process strip

Use four compact stages:

Discover → Define → Build → Improve

The process must support the evidence. It must not replace it.

### AI review prompt

Provide a copyable prompt that accepts any job description. It must tell the model to use only linked public evidence and separate evidence from inference.

### Contact panel

Use the question:

“Enough signal for a conversation?”

Primary actions:

- Download CV.
- Request an interview.
- Email Marcus.
- Copy email.

Use `marcus.uden.dev@gmail.com` as the public email.

### Status labels

Use explicit labels such as:

- Verified
- Planned
- Needs public link
- Open question

Do not imply that planned pages or private repositories are public.

## Do's and Don'ts

Do:

- Make the page useful in two minutes.
- Use concise claims with adjacent evidence.
- State uncertainty.
- Use real project names and real decision records.
- Keep the CV action specific to the role only when a role-specific CV exists.
- Provide one general path for roles that do not match a predefined category.
- Test at 375, 768, 1024, and 1440 px.
- Maintain keyboard focus styles and strong contrast.
- Keep interactive targets at least 44 px high.

Do not:

- Lead with PostNord or an employment chronology.
- Hide the recent-work context when it affects interpretation.
- Claim seniority that the evidence does not support.
- add role chips that only change a few words.
- add an embedded AI chat before a curated public evidence page exists.
- expose private repositories, local paths, personal details, or hidden reasoning.
- use generic AI imagery, glow effects, skill meters, or inflated metrics.
- use more than two accent colors in one view.
