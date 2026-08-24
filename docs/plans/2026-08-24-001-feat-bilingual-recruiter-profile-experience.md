---
title: Bilingual recruiter profile and localized decision-log experience
type: feat
date: 2026-08-24
topic: bilingual-recruiter-profile
status: deferred
---

# Bilingual Recruiter Profile and Localized Decision-Log Experience

## Status

**Deferred until further notice.** This is a recorded product proposal, not an implementation commitment.

## Context

The GitHub profile is the entry point for the recruiter experience, and the linked proof site should serve both Swedish- and English-speaking visitors. GitHub's profile README is Markdown content, so the profile itself should expose clear language links while the linked proof site owns the interactive language control. Decision-log tags currently use stable English IDs, but Swedish readers also need clear localized labels. Content changes in the GitHub profile or linked proof site must not leave either language variant stale.

## Proposed experience

1. Put two prominent links near the top of the GitHub profile README: **English** and **Svenska**, both leading to the matching language on the linked proof site.
2. On the linked proof site, provide a persistent `EN | SV` switcher in the upper-right corner of the masthead.
3. Keep the current page, anchor, and relevant query state when switching language. Store the choice locally, but allow the visitor to change it at any time.
4. Keep English as the default when no choice exists, while respecting a supported browser-language hint only when it does not create a surprising redirect.
5. Show Swedish labels for every current decision-log tag while retaining stable English tag IDs for data, URLs, filters, and tests.
6. Treat a GitHub profile or linked proof-site change as a sync event: update both language variants, recruiter navigation, metadata, and decision-log tag labels in the same validation run.

## Requirements for a future implementation

- **R1 — GitHub entry links:** The profile README exposes working English and Swedish links near its top; the links open the matching language on the proof site.
- **R2 — Language entry:** A first-time visitor can select English or Swedish from the proof site's upper-right switcher without losing the current page or query state.
- **R3 — Localized content:** The selected language changes UI copy, profile summary, navigation, decision-log labels, empty states, and accessibility text.
- **R4 — Tag integrity:** Every assignable tag has a stable ID, an English description, and a Swedish display label. Future-bank tags remain non-assignable until promoted with both language values.
- **R5 — Profile synchronization:** Changes to the public GitHub profile or linked proof site trigger a paired English/Swedish content check. A partial update fails closed and is not published.
- **R6 — Evidence safety:** Localization may improve clarity but must not add claims, metrics, maturity, or capabilities that are absent from the evidence source.
- **R7 — Accessibility:** The language selector is keyboard accessible, announces the active language, and does not rely on flags as the only language signal.

## Deferred feature: technical depth preference

The idea of letting a visitor choose a technical-knowledge level — for example, recruiter-friendly, product-aware, or technically deep — is also **deferred until further notice**. If revisited, it should adapt explanation depth and terminology, not create different claims or hide important evidence. The default should remain a concise recruiter path with optional technical depth.

## Decision trail

```text
Context → The GitHub profile is the entry point, while the linked proof site should provide a proper Swedish/English experience; technical depth varies between recruiters.
Options Considered → English only; duplicate manually maintained pages; README language links plus a proof-site switcher; language plus technical-depth personalization.
Tradeoffs → A shared localized model reduces drift but needs validation and translation maintenance. Technical-depth personalization can improve relevance but adds state, content, and test complexity.
Decision → Use GitHub README language links and a persistent upper-right switcher on the linked proof site. Synchronize both variants after profile or site changes. Defer technical-depth selection.
Evidence → logs/DECISION_LOG_TAGS.md now defines Swedish labels for all 49 current decision-log tags and a sync policy.
Open Questions → Whether the GitHub profile or the recruiter site should be the canonical public content source, and which language should be the default for Swedish browser settings.
Next Action → Revisit after the current public profile and decision-log publishing work has a stable release path.
```
