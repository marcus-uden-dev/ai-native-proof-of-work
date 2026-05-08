# Technical Decision Log

Last updated: 2026-05-08  
Status: Active template

## Purpose

Capture technical decisions about architecture, ingestion, data flow, source indexing, repo structure, and automation behavior.

## Template

```markdown
## YYYY-MM-DD — Decision Title

### Context

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| | | |

### Decision

### Reasoning Trail

Context → Options Considered → Tradeoffs → Decision → Evidence → Open Questions → Next Action

### Evidence

### Status

Decision / Hypothesis / Open Question / Rejected
```

## Decisions

### 2026-05-08 — Use Markdown and Mermaid as canonical documentation layer

#### Context

The repository needs to be readable directly in GitHub and version-controlled.

#### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Markdown + Mermaid | GitHub-native, lightweight, versionable | Less polished than slides |
| Word/PPT | Recruiter-friendly | Harder to diff/version |
| Website | Polished | More setup and maintenance |

#### Decision

Use Markdown and Mermaid as canonical source. Exports can be generated later.

#### Status

Decision
