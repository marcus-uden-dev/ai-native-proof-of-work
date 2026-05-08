# User Flow

Last updated: 2026-05-08  
Status: Active diagram

```mermaid
flowchart TD
    A[Idea, job opportunity, workflow problem, or research input] --> B[AI-assisted intake]
    B --> C[Clarify objective and constraints]
    C --> D[Generate strategy, workflow, or artifact]
    D --> E[Human review]
    E --> F{Approved?}
    F -->|Yes| G[Store in private GitHub proof-of-work repo]
    F -->|No| H[Revise or reject]
    H --> E
    G --> I[Reuse for CV, recruiter brief, LinkedIn, portfolio, demo]
```
