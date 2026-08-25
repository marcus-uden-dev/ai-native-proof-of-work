# Case Study Promotion Prompt

Use this prompt with the Compound Engineering suite when a new project or
experience may deserve a recruiter-facing case.

## Source of truth

Read [CASE_STUDY_REGISTRY.md](../docs/evidence/CASE_STUDY_REGISTRY.md) first.
Use the full repository and [CAREER_EVIDENCE_SOURCE.md](../career-evidence/CAREER_EVIDENCE_SOURCE.md)
where relevant. Do not treat raw sessions, private paths, or unverified plans
as public evidence.

## Required decision

Return:

```text
Context → Options Considered → Trade-offs → Decision → Evidence → Open Questions → Next Action
```

Classify the candidate as one of:

- Default Profiles case
- Evidence-backfill case
- Supporting operating/trust proof
- Agent-database / historical case
- Mechanism only; do not create a standalone case

## Evidence rules

- Separate `employment_evidence`, `portfolio_decision_evidence`, `persona_evidence`, and `user_cv_evidence`.
- Use `Verified`, `Estimated`, `Planned`, `Open Question`, `Needs Review`, or `Not measured` explicitly.
- Do not infer metrics, adoption, revenue, authority, or completed implementation.
- Generalise confidential employer or client details.
- Preserve a stable `CASE-NNN` identifier once assigned.

## CE routing

1. Use `ce-brainstorm` when the case boundary or promotion tier is undecided.
2. Use `ce-plan` for evidence backfill and the affected-file list.
3. Use `ce-work` to update the registry, narrative page, JSON projection, and navigation.
4. Use `ce-doc-review` before publishing recruiter-facing claims.
5. Use `ce-compound` only for reusable workflow lessons, not for the case record.

## Definition of done

- The registry record exists or is explicitly rejected.
- Source references resolve.
- Evidence and outcome status are visible.
- The next evidence test is concrete.
- Default Profiles navigation changes only when the promotion gate passes.
- Mechanisms remain attached to stronger cases.
