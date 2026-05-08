# Recursive Agent Model

Last updated: 2026-05-08  
Status: Active diagram

```mermaid
flowchart TD
    A[Work Output] --> B[Review Output]
    B --> C[Extract Pattern]
    C --> D{Repeated 2+ Times?}
    D -->|No| E[Keep as Prompt or Archive]
    D -->|Yes| F[Promotion Board]
    F --> G{Best Destination?}
    G --> H[Instruction]
    G --> I[Checklist]
    G --> J[Template]
    G --> K[Scheduled Task]
    G --> L[Skill]
    G --> M[Source Index]
    H --> N[Next Run]
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    N --> A
```
