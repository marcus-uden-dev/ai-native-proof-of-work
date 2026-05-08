# Decision Log

## 2026-05-08 — Use a private GitHub repository as proof-of-work archive

### Context

The proof-of-work system needs to be structured, versioned, recruiter-shareable, and readable without access to raw chats or local folders.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| GitHub repo | Versioned, structured, shareable | Requires privacy discipline |
| Google Drive folder | Easy sharing | Less structured and less versioned |
| PDF only | Easy to read | Static and quickly outdated |
| Website | Polished | More setup and maintenance |

### Decision

Use a private GitHub repository as the canonical proof-of-work archive.

### Reasoning Trail

```text
Context → Need recruiter-readable proof.
Options Considered → GitHub, Drive, PDF, website.
Tradeoffs → GitHub is less polished than a website but more versioned and operational.
Decision → Use private GitHub repo.
Evidence → Repository exists: TheOneDarkHorse/ai-native-proof-of-work.
Open Questions → Which artifacts should be shared first?
Next Action → Populate first verified proof points.
```

### Evidence

`README.md`, `AGENTS.md`, `SOURCE_MAP.md`

### Status

Decision

---

## 2026-05-08 — Use Markdown and Mermaid as canonical documentation format

### Context

The repo needs to be readable directly in GitHub and easy to update through Codex.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Markdown + Mermaid | GitHub-native, versionable | Less polished than slides |
| Word/PPT | Recruiter-friendly | Harder to diff and update |
| PDF | Easy to share | Static |
| Website | Polished | Higher setup cost |

### Decision

Use Markdown and Mermaid as canonical source. Exports may be generated later.

### Reasoning Trail

```text
Context → Need readable, versioned, maintainable docs.
Options Considered → Markdown, Word/PPT, PDF, website.
Tradeoffs → Markdown is less visually rich but more maintainable.
Decision → Use Markdown and Mermaid first.
Evidence → Scaffold files generated.
Open Questions → Whether to export PDF later.
Next Action → Validate Mermaid rendering in GitHub.
```

### Status

Decision
