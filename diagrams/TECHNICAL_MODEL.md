# Technical Model

Last updated: 2026-05-11
Status: Active diagram

```mermaid
flowchart TD
    A["Raw inputs"] --> B["Source indexes<br/>Codex, Claude,<br/>skills, scripts"]
    B --> C["Ingest"]
    C --> D["Classify<br/>source, topic,<br/>confidence, sensitivity"]
    D --> E["Retrieve"]
    E --> F["Analyze<br/>strategy, architecture,<br/>workflow, recruiter summary"]
    F --> G["Generate"]
    G --> H["Human review"]
    H --> I["Evidence repo"]
```
