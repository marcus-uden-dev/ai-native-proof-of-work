# User Flow

Last updated: 2026-05-11
Status: Active diagram

```mermaid
flowchart TD
    A["Product work<br/>Job-agent, PKM,<br/>budget app"] --> B["AI-assisted<br/>planning + execution"]
    B --> C["Tests, docs,<br/>handoffs, decisions"]
    C --> D["Extract evidence"]
    D --> E["Privacy + claim review"]
    E --> F{"Safe + useful?"}
    F -->|Yes| G["Evidence repo"]
    F -->|No| H["Summarize,<br/>redact, reject"]
    H --> E
    G --> I["CV, brief,<br/>portfolio, demo"]
```
