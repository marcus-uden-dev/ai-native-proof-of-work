# Recursive Workflows

Last updated: 2026-05-08  
Status: Initial design

## Core Loop

```mermaid
flowchart TD
    A[Execution] --> B[Review]
    B --> C[Pattern Detection]
    C --> D{Recurring Pattern?}
    D -->|Yes| E[Promotion Decision]
    D -->|No| F[Keep as One-Off]
    E --> G{Best Form?}
    G --> H[Instruction]
    G --> I[Checklist]
    G --> J[Scheduled Task]
    G --> K[Skill]
    G --> L[Template]
    G --> M[Source Index Update]
    H --> N[Next Execution Cycle]
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    N --> A
```

## What Gets Promoted

| Pattern | Destination |
|---|---|
| Repeated prompt | Template or instruction |
| Repeated review step | Checklist |
| Repeated scheduled need | Scheduled task |
| Repeated coding workflow | Codex instruction |
| Repeated reasoning process | Claude instruction |
| Repeated artifact type | Repo template |
| Reusable local skill/script | Skills index |
| Useful local documentation | Documentation index |

## What Gets Deleted

Delete or archive:

- noisy routines
- duplicate prompts
- stale instructions
- unvalidated claims
- workflows that no longer produce value

## Human Gate

No recursive loop should update important instructions without human review.
