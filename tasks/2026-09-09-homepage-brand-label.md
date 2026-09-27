# Todo: Clarify the homepage identity and interview companion label

Status: `Proposed`
Priority: `Medium`
Scope: `Homepage annotation 1 only`
Owner: Marcus + Codex

## Annotation

The header currently shows only `Marcus Udén`. That identifies the person, but not what the site is: a recruiter-facing portfolio, CV entry point, public archive of selected work and decisions, and a digital companion for an interview conversation.

## Positioning question

The site should communicate: “You can use this to understand Marcus before, during, or after an interview.” The label must explain that role without implying that an AI replica speaks for Marcus.

## Copy principles

- State what the site helps the visitor do before using a concept such as “digital twin”.
- Keep `Marcus Udén` as the primary identity.
- Use “interview companion” when naming the visitor use case.
- Treat “digital interview twin” as an optional explanatory concept, not the main label. It is distinctive but may sound like an AI replica that answers on Marcus’s behalf.

## Copy alternatives

| Option | Proposed label | Strength | Risk |
|---|---|---|---|
| A — Recommended | `Marcus Udén`<br>`Product portfolio · CV · interview companion` | Clear, short, and explains what the site is useful for. | “Interview companion” is less distinctive than “twin”. |
| B | `Marcus Udén — Digital portfolio & interview companion` | Direct and easy for a recruiter to understand. | It does not name the CV explicitly. |
| C | `Marcus Udén — CV, product work & interview context` | Makes the evidence and use case concrete. | “Interview context” is slightly abstract. |
| D | `Marcus Udén — Developer portfolio, CV & interview companion` | Uses familiar recruiter language and names the use case. | “Developer” may narrow the product and operations positioning. |
| E | `Marcus Udén — Portfolio, CV & digital interview twin` | Preserves the distinctive concept. | “Twin” can sound like an AI replica that speaks for Marcus. |
| F | `Marcus Udén — Product work, decisions & interview guide` | Strongly signals how the site can be used. | “Guide” may sound like a document rather than a living site. |

## Recommended implementation shape

Use Option A as a two-line brand lockup:

```text
Marcus Udén
Product portfolio · CV · interview companion
```

Keep the descriptor smaller and quieter than the name. On mobile, let it wrap to a second line rather than turning it into a chip or another navigation item.

Add one clear sentence near the hero if the concept needs more explanation:

`Explore the work, decisions, and evidence behind the CV before the first conversation.`

The navigation can then remain task-oriented:

```text
Hiring case · Selected work · How I think · Contact
```

## Acceptance criteria

- [ ] A first-time visitor can identify the site as a portfolio and CV entry point.
- [ ] A recruiter can understand that the site is an interview companion, not an AI replacement for Marcus.
- [ ] The label does not compete with the hero statement.
- [ ] The wording works in the desktop header and on mobile.
- [ ] The “digital interview twin” concept remains available for a deeper explanation, but is not required for initial comprehension.
- [ ] No live-site implementation starts until the wording and lockup treatment are approved.

## Review artifact

[Homepage brand label preview](../docs/prototypes/homepage-brand-label-annotation-01-preview.html)

## Next action

Choose a copy option and lockup treatment before implementation.
