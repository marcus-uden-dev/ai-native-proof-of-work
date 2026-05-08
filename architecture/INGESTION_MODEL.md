# Ingestion Model

Last updated: 2026-05-08  
Status: Initial design

## Purpose

Turn messy inputs into structured, reusable knowledge without exposing sensitive information or bloating the repo.

## Sources

| Source | Data Type | Use | Risk | Handling |
|---|---|---|---|---|
| Chat logs | Ideas / decisions | Strategy extraction | Context bloat / privacy | Summarize, do not dump raw text |
| Codex projects | Repo/documentation work | Evidence and implementation traces | Local/private paths | Index and summarize |
| Claude projects | Strategy/synthesis/instruction work | Decision trail and planning evidence | Raw context leakage | Summarize |
| Shared agents folder | Skills/scripts/docs | Reusable operating assets | Unknown custom layout | Map with internal index |
| Gmail | Recruiter/job signals | Follow-up workflow | Sensitive data | Human approval required |
| Job ads | Role requirements | Application targeting | Expiring links | Snapshot key fields |
| Research links | Market/technical insight | Strategy input | Hype/low quality | Source quality filter |
| GitHub | Artifacts | Proof of work | Oversharing | Private repo / curated sharing |

## Metadata

Track:

- source
- date
- topic
- status
- confidence
- evidence link
- sensitivity level
- recommended destination
- last indexed date
- recruiter-safe status

## Deduplication

Do not create duplicate docs.

Update existing docs unless a new topic deserves its own file.

## Privacy Handling

Do not include:

- private emails
- personal addresses
- sensitive personal data
- credentials
- API keys
- private local paths in recruiter-facing files
- confidential third-party material
- raw chat logs
