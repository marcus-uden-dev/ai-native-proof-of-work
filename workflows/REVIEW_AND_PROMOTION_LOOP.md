# Review and Promotion Loop

Last updated: 2026-05-11
Status: Initial design

## Purpose

Turn repeated useful patterns into durable assets.

## Loop

```mermaid
flowchart TD
    A["Weekly output"] --> B["Review"]
    B --> C{"Pattern?"}
    C -->|No| D["Archive/one-off"]
    C -->|Yes| E["Classify"]
    E --> F["Instruction"]
    E --> G["Checklist"]
    E --> H["Template"]
    E --> I["Scheduled task"]
    E --> J["Skill"]
    F --> K["Human review"]
    G --> K
    H --> K
    I --> K
    J --> K
    K --> L["Promote/reject"]
```

## Promotion Destinations

| Pattern | Destination |
|---|---|
| Repeated prompt | Template or instruction |
| Repeated review behavior | Checklist |
| Repeated schedule need | Scheduled task |
| Reusable capability | Skill |
| Stable decision | Static documentation |
| Temporary idea | Archive |

## Rule

No important instruction update should be promoted without human review.
