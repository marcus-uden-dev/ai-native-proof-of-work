# Local Source Discovery Model

Last updated: 2026-05-11
Status: Internal concept. Do not expose local paths in recruiter-facing exports.

```mermaid
flowchart TD
    A["Local roots"] --> B["Index structure"]
    B --> C["Summarize"]
    C --> D["Classify"]
    D --> E["Internal indexes"]
    E --> F["Weekly compiler"]
    F --> G{"Fresh enough?"}
    G -->|Yes| H["Use index"]
    G -->|No| I["Refresh"]
    I --> E

    A --> A1["Codex projects"]
    A --> A2["Claude projects"]
    A --> A3["Shared skills"]
```
