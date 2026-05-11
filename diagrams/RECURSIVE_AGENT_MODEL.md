# Recursive Agent Model

Last updated: 2026-05-11
Status: Active diagram

```mermaid
flowchart TD
    A["Work output"] --> B["Review"]
    B --> C["Extract pattern"]
    C --> D{"Repeated?"}
    D -->|No| E["Keep one-off"]
    D -->|Yes| F["Promotion board"]
    F --> G["Instruction, checklist,<br/>template, scheduled task,<br/>skill, or source index"]
    G --> H["Next run"]
    H --> A
```
