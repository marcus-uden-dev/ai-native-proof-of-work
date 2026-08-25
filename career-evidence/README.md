# Career Evidence Source

Status: Active / Recruiter-safe / `employment_evidence`

## Purpose

Use [CAREER_EVIDENCE_SOURCE.md](CAREER_EVIDENCE_SOURCE.md) as the consolidated, searchable source for Marcus's service history and career capabilities. It combines the supplied CV material with the current repository CV so an agent does not need to guess where a claim is recorded.

This is a priority source, not a closed source list. The complete recruiter-safe repository remains available as reference material. Use the repository's project, strategy, workflow, evidence, and decision documents when they are relevant and evidence-labeled.

## Evidence classes

| Class | Meaning | Permitted use |
|---|---|---|
| `employment_evidence` | Service history and role evidence in the career source and CV | Establish employment, responsibilities, capabilities, and stated scope |
| `user_cv_evidence` | A CV variant stored in the job-agent product | Provide user-owned CV context to product scoring |
| `persona_evidence` | User profile or persona material | Explain preferences, target roles, and working context |
| `portfolio_decision_evidence` | Portfolio decisions and tradeoffs in `logs/DECISION_LOG.md` and `logs/DECISION_LOG_TAGS.md` | Support product judgment and workflow evidence; never upgrade an unlisted employment claim |

## Recommended scan order

1. Read the recruiter brief and this career source for the initial evidence map.
2. Read `CV.md` and relevant project, strategy, case-study, workflow, and proof files.
3. Read `logs/DECISION_LOG.md` and `logs/DECISION_LOG_TAGS.md` as portfolio decision evidence.
4. Search the full recruiter-safe repository for role-specific terms, dates, capabilities, and corroborating artifacts.
5. Report the evidence class and confidence for each material claim.

The order improves retrieval. It does not prevent the agent from using other recruiter-safe repository files.

## Boundary

Do not treat a missing claim as proof that the source was unavailable. Say whether the source was searched and whether the claim was present. Keep unsupported duties, authority, metrics, and outcomes as `Needs Detail` or `Open Question`.
