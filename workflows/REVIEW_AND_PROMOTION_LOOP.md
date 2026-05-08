# Review and Promotion Loop

Last updated: 2026-05-08  
Status: Initial design

## Purpose

Turn repeated useful patterns into durable assets.

## Loop

```mermaid
flowchart TD
    A[Weekly Output] --> B[Review]
    B --> C[Pattern Detected?]
    C -->|No| D[Keep as one-off or archive]
    C -->|Yes| E[Classify Destination]
    E --> F[Instruction]
    E --> G[Checklist]
    E --> H[Template]
    E --> I[Scheduled Task]
    E --> J[Skill]
    F --> K[Human Review]
    G --> K
    H --> K
    I --> K
    J --> K
    K --> L[Promote or Reject]
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
