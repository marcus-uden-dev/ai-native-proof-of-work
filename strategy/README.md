# Project Strategy Index

Last updated: 2026-05-11
Status: Active / Project-scoped

## Purpose

Strategy in this repository is organized by product project.

This repository is the evidence and portfolio layer. It is not the product that the strategy docs are primarily about.

## Project Strategy Areas

| Project | Role | Strategy Docs |
|---|---|---|
| Job-agent | Primary proof point and lead product strategy | [strategy/job-agent/](job-agent/) |
| PKM | Supporting proof point for knowledge workflow design | [strategy/pkm/](pkm/) |
| Household budget app | Supporting proof point for financial domain modeling and household UX | [strategy/household-budget-app/](household-budget-app/) |

## Operating Layer

The proof-of-work compiler, source indexes, weekly review, and recruiter assets are documented as the portfolio operating system:

- [strategy/portfolio-operating-system/](portfolio-operating-system/)

Use this area only when discussing how project evidence is captured, reviewed, and packaged. Use the project folders above when discussing product strategy, value proposition, pricing, GTM, business model, or competitive positioning for the actual products.

Each project folder uses the same canonical subfolders and document names so links and future weekly compiler updates can stay predictable.

## Canonical Project Folder Layout

```text
strategy/<project>/
  README.md
  product/
    VALUE_PROPOSITION.md
    PRODUCT_STRATEGY.md
    COMPETITIVE_POSITIONING.md
  business/
    BUSINESS_MODEL.md
    PRICING_STRATEGY.md
  market/
    GO_TO_MARKET.md
  decisions/
    DECISION_TRAIL.md
```

## Link Rule

Recruiter-facing links should point to project-specific strategy documents, especially `strategy/job-agent/`, unless the document is explicitly about the portfolio operating model.

## Canonical Document Structures

All project folders use the same filenames and the same section order for each document type.

### Project README

```text
Purpose → Project Role → Canonical Documents → Evidence → Validation Focus
```

### VALUE_PROPOSITION.md

```text
Project Scope → Core Claim → User Problem → Before → After → Value Created → Evidence → Validation Needed
```

### PRODUCT_STRATEGY.md

```text
Project Scope → Target User → Core Problem → Existing Alternatives → Product Wedge → MVP Scope → Non-MVP Scope → Feature Prioritization → Risks → Evidence → Strategy Decisions
```

### BUSINESS_MODEL.md

```text
Project Scope → Possible Customer Segments → Business Model Options → Current Hypothesis → Rejected or Deferred Models → Evidence → Validation Needed
```

### PRICING_STRATEGY.md

```text
Project Scope → Pricing Philosophy → Pricing Options Considered → Current Recommendation → Reasoning Trail → Evidence → Validation Needed
```

### GO_TO_MARKET.md

```text
Project Scope → Initial Audience → Distribution Channels → GTM Principle → Validation Plan → Evidence
```

### COMPETITIVE_POSITIONING.md

```text
Project Scope → Positioning Statement → Differentiation → What This Is Not → Strategic Wedge → Evidence
```

### DECISION_TRAIL.md

```text
Purpose → Decision Format → Decisions
```

Each decision entry should use:

```text
Context → Options Considered → Tradeoffs → Decision → Evidence → Open Questions → Next Action
```
