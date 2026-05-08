# Claude + Codex Workflow

Last updated: 2026-05-08  
Status: Initial version

## Claude

Best for:

- reasoning
- strategy
- product thinking
- synthesis
- instruction writing
- document drafting
- evaluation

## Codex

Best for:

- repository work
- file updates
- structured documentation maintenance
- implementation planning
- diff-based edits
- repeatable repo hygiene
- source indexing
- keeping proof-of-work docs organized

## Shared Skills / Agents Layer

The shared skills layer lives under local agent folders such as the `.agents` workspace.

Because Marcus uses a custom shared-skills setup, Codex must inspect indexes before assuming structure.

## Combined Workflow

```mermaid
sequenceDiagram
    participant M as Marcus
    participant C as Claude
    participant X as Codex
    participant A as Shared Skills
    participant G as GitHub

    M->>C: Explore idea / strategy / workflow
    C->>M: Structured recommendation
    M->>X: Approved instruction
    X->>A: Check reusable skills/docs/scripts
    X->>G: Update repository files
    G->>M: Proof-of-work artifact
    M->>C: Review and improve
```

## Operating Rule

Claude explores and structures. Codex maintains the repo. Shared skills provide reusable components. GitHub preserves the proof. Marcus makes final decisions.
