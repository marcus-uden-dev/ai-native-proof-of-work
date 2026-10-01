---
created: 2026-10-01
author: Marcus Udén (Codex)
source_tool: Codex Desktop
source: experience-fit narrative prototype review and automated saved-role smoke tests
type: report
status: active
review_status: verified
visibility: public-safe
tags: [recruiter, experience-fit-map, evidence-boundary, validation]
---

# Experience Fit role-narrative validation

## Summary

The Experience Fit Map now starts with a role-question ledger. It gives a short, source-bounded answer before the visual map. The visual map remains a role-specific evidence view, not a candidate score.

The ingress uses inline chips for the strongest directly supported capabilities and the evidence mechanisms behind them. The third question is always retained:

> Can he apply this in this role’s domain?

Its answer is an explicit evidence boundary. It identifies local systems, metrics, and domain constraints as interview exploration, not negative evidence.

## Decision

Use the editorial dark-panel ledger treatment with inline chips.

- Capability chips identify the directly supported dimensions for the submitted role.
- Evidence chips identify the public-record mechanisms: source-linked product decisions, reusable workflow controls, and an inspectable evidence trail.
- Up to two role-specific requirements are shown before the stable domain-exploration row.
- The map and full evidence details follow the ledger, so readers can inspect the broader seven-dimension evidence model.

**Evidence-informed decisions** replaces **Evidence synthesis** as a clearer axis label. It means turning research and available evidence into an explicit decision trail, not an abstract research score.

## Automated smoke coverage

The browser smoke tests render the public saved-role data through the same recruiter-review interface used on the site.

| Saved role brief | Result checked |
| --- | --- |
| Spotify — Customer Service Platform | Three ledger rows, retained domain boundary, seven map axes, role-specific coverage |
| Saviynt — Staff Product Operations Manager | Role-specific ledger rows and the retained domain boundary |
| capital.com — Product Operations Manager | Role-specific ledger rows and the retained domain boundary |

The tests also verify that the renamed **Evidence-informed decisions** axis appears and that the full evidence detail view remains available.

## Validation record

- **npm run test:review-api** — passed: 32 tests.
- Focused Playwright role-review and saved-role smoke suite — passed: 3 tests.
- Full Playwright suite — passed: 79 tests.
- Full project test command — passed: contracts, evidence-index, worker, and browser suites.
- JavaScript syntax checks for the updated site renderer and validation module — passed.
- Prototype visual review — passed locally with the ledger variant and inline chips.

## Evidence boundary

The saved role briefs are public test fixtures from recorded role listings. They verify deterministic rendering and the evidence boundary. They do not claim that a current role is open or that the public record proves domain-specific delivery.
