---
created: 2026-10-02
author: Marcus Udén + Codex
source_tool: Codex Desktop
source: historical decision coverage expansion plan
type: reference
status: active
review_status: reviewed
tags: [decision-log, evidence, coverage, privacy]
---

# Historical Decision Coverage

## Purpose

This reference defines how the private repository measures historical decision coverage. It prevents a small curated set of examples from being described as a complete decision history.

The canonical source is `docs/evidence/historical-decision-source-registry.json`. It is private repository evidence. It is never copied to recruiter-facing surfaces.

## Coverage contract

A coverage revision is complete only when each registered source is in one of these states:

| State | Meaning | Required follow-up |
|---|---|---|
| `registered` | Frozen in the source universe but not yet scanned. | Run deterministic discovery. |
| `changed` | Source revision changed after its last scan. | Scan the new revision. |
| `stale` | Source metadata or local index is too old to support a claim. | Refresh or mark unavailable. |
| `scanned` | Scanner completed. Zero drafts is a valid result. | Store aggregate results. |
| `unavailable` | Access is not available. | Record access requirement and retry trigger. |
| `blocked` | A known condition prevents scanning. | Record owner and retry trigger. |

The register freezes the source universe, grammar, revision, privacy class, and cutoff date. A later-discovered source starts a new coverage revision; it cannot silently change an earlier coverage claim.

## What counts as a decision

Discovery recognizes only explicit, supported choices or boundaries in a registered grammar:

- Product direction, architecture, evidence boundaries, governance, safety boundaries, rejected alternatives, and material sequencing decisions.
- Headings with an explicit ISO date and a decision title.
- Visible decision-trail sections whose registered grammar identifies them as decisions.

Discovery excludes templates, status-only activity, headings without a supported date, repeated lifecycle updates, and unverified outcome claims. It produces drafts only. A project-wave review normalizes a draft, resolves duplicates, and applies the existing `publish`, `hold`, or `internal-only` gate.

Drafts can include suggested capability tags such as API and systems integration, evaluation and quality, safety and governance, and systems architecture. These tags guide recruiter-relevance review only. They are not evidence of delivery, proficiency, or measured outcome.

## Private and public boundaries

The private candidate layer can retain repository-relative anchors, fingerprints, scan state, and retry conditions. Public artifacts can contain only allowlisted, sanitized decision fields. They must never contain source-register data, local paths, raw source references, fingerprints, per-source retry state, credentials, personal data, or confidential detail.

## Coverage reporting

Every private coverage report names the frozen register revision and reports counts by source and disposition: normalized, held, internal-only, duplicate, excluded activity, and unavailable. The target is at least 100 meaningful, normalized, dispositioned private records. This is a coverage floor, not a maximum: retain every meaningful candidate supported by the frozen source universe. If the frozen universe contains fewer eligible decisions, the report must document that evidence-based exception instead of padding the inventory.
