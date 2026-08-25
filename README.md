# Marcus Udén — proof of work

This repository contains the recruiter-first public proof-of-work edition for Marcus Udén and hands-on product roles.

The site leads with a concise hiring case. It then provides dated evidence, explicit maturity labels, and a guided Job-agent case study. The public edition is curated. It is not a mirror of a working repository.

## Current state

This is the professional public repository staging area for `marcus-uden-dev/ai-native-proof-of-work`. It contains the curated static site and a staged migration of project strategy and case-study evidence from the earlier proof-of-work archive. Publication, Pages activation, and DNS changes still require explicit approval.

The migration is content-only. The earlier repository history is not imported. See [release/migration-manifest.json](release/migration-manifest.json) for the staged file boundary.

## Project evidence

- [Project proof points](PROJECT_PROOF_POINTS.md)
- [Project status](PROJECT_STATUS.md)
- [Job-agent case study](case-studies/JOB_AGENT_CASE_STUDY.md)
- [PKM case study](case-studies/PKM_CASE_STUDY.md)
- [Household budget app case study](case-studies/HOUSEHOLD_BUDGET_CASE_STUDY.md)

## Hiring route

1. Read the two-minute hiring brief.
2. Inspect the Job-agent case study and synthetic company-research proof.
3. Download the sanitized English CV.
4. Request an interview through `marcus.uden.dev@gmail.com`.

The site describes Job-agent as work in progress, not live, not market-validated, and without measured market outcomes.

## Development

```text
npm ci
npm test
npm run release:validate
```

The static site will live under `site/`. The release validator checks file allowlisting, identity separation, private paths, credentials, product maturity wording, Git metadata, and binary privacy records.

## Publication boundary

Publication, GitHub Pages activation, and domain changes require explicit approval. The rollback method is an append-only revert commit to the last approved release.

CI uses read-only permissions for quality checks. Pages and identity-token permissions exist only in the deployment job, which runs after Quality succeeds. See `docs/RELEASE_RUNBOOK.md` for the release, temporary-host, rollback, and domain gates.
