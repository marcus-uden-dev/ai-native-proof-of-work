# Technology Capability Catalog Sweep

Generates one `TECHNOLOGY_CAPABILITY_CATALOG.md` per product repo. Each row names a technology, its purpose, its capability and an evidence state taken from source. Plan: `plans/2026-10-22-technology-capability-catalog-sweep-plan.md`.

## Run

```bash
node scripts/build-technology-catalog.mjs <repoPath> --out <scratchFile> --name <label>
node scripts/publish-technology-catalog.mjs <scratchFile> <repoPath>
```

- The build step reads the target repo and writes only `--out` (or stdout). It exits 1 if the public-safety scan matches.
- The publish step copies the file to `<repoPath>/TECHNOLOGY_CAPABILITY_CATALOG.md`. It overwrites only a file that carries the generated-by marker. It never runs git. Committing and pushing are separate, user-approved steps.
- The same input gives byte-identical output. The header carries a source fingerprint.

## Evidence states

| State | Rule |
|---|---|
| implemented | Live consumer in non-test source, a container image, or a CI workflow |
| tested | Consumers only under test paths |
| configured | Manifest, env key or config only |
| dev-test-only | Declared only as a dev or test dependency |
| planned, historical | Set by hand, never generated |

The scan skips `node_modules`, virtualenvs, `site-packages`, worktree folders, and `docs/`. Purpose text comes only from `scripts/technology-registry.json`. Packages not in the registry appear under Unclassified with state only. Add a registry entry to give one a purpose.
