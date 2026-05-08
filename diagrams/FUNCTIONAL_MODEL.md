# Functional Model

Last updated: 2026-05-08  
Status: Active diagram

```mermaid
flowchart LR
    A[Input Sources] --> B[Capture Layer]
    B --> C[Analysis Layer]
    C --> D[Artifact Generator]
    D --> E[Review Layer]
    E --> F[GitHub Proof-of-Work Repository]

    A --> A1[Chats]
    A --> A2[Scheduled Tasks]
    A --> A3[Research]
    A --> A4[Job Ads]
    A --> A5[Project Notes]
    A --> A6[Codex Projects]
    A --> A7[Claude Projects]
    A --> A8[Shared Skills + Scripts]

    C --> C1[Product Strategy]
    C --> C2[Architecture]
    C --> C3[Business Model]
    C --> C4[Workflow Improvement]

    D --> D1[CV Bullets]
    D --> D2[LinkedIn Drafts]
    D --> D3[Portfolio Notes]
    D --> D4[Recruiter Briefs]
    D --> D5[Demo Scripts]
```
