# Decision Log

## 2026-05-09 — Lead with concrete projects while documenting the automation

### Context

The repository risked positioning the proof-of-work automation, weekly compiler, and source-indexing system as the whole value proposition. The stronger recruiter signal is the concrete product portfolio: job-agent first, with PKM and the household budget app as supporting proof points. The automation should remain documented as the operating method that makes the portfolio repeatable and credible.

### Options Considered

| Option | Pros | Cons |
|---|---|---|
| Keep automation/compiler as the main story | Clear system narrative | Makes the portfolio feel meta and underplays real product execution |
| Lead with all projects equally | Shows breadth | Dilutes the strongest career-domain proof point |
| Lead with job-agent and document automation as method | Strongest recruiter relevance, still shows repeatable operating discipline | Requires careful privacy-safe summarization of internal project evidence |

### Decision

Lead recruiter-facing documentation with job-agent as the primary proof point. Use PKM and the household budget app as supporting project evidence. Keep the proof-of-work compiler, source indexes, and review loops documented as automation and operating infrastructure.

### Reasoning Trail

```text
Context → Current docs overemphasize the automation layer.
Options Considered → Compiler-first, equal project portfolio, job-agent-first with automation documented as method.
Tradeoffs → Job-agent-first gives stronger recruiter signal but needs sanitized evidence summaries.
Decision → Make projects the primary proof and automation the documented operating layer.
Evidence → Internal indexes and project docs identify job-agent, PKM, and household budget app evidence.
Open Questions → Which job-agent artifacts should become a sanitized public/recruiter case study?
Next Action → Create a job-agent case-study page with evidence labels.
```

### Evidence

`PROJECT_PROOF_POINTS.md`, `PROOF_OF_WORK.md`, `strategy/VALUE_PROPOSITION.md`, internal source indexes

### Status

Decision

---

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
