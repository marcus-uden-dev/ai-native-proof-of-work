# Technology catalog runbook

This repo owns the tooling that produces one technology capability catalog per product repo. The tooling is public. The evidence it collects is private and stays in a local, git-ignored folder. Only the finished Markdown file leaves, into the product repo that owns the source.

## Private root

The tooling stores the registry, swept facts, curated entries, and rendered drafts in a private root:

- Default: `internal/technology-catalog/` in the checkout that owns this repo's git directory. Every worktree resolves to the same folder.
- Override: set `TECHNOLOGY_CATALOG_PRIVATE_ROOT` to an absolute path outside the repo.

Run `npm run catalog -- init` once. It adds the folder to the shared git exclude file when no ignore rule covers it, then creates it. The tooling refuses to run when git does not ignore the root.

Never copy anything from the private root into a tracked file here.

## Registry

Create `repos.json` in the private root:

```json
{
  "schemaVersion": 1,
  "repos": [
    {
      "id": "example-repo",
      "displayName": "Example Repo",
      "checkoutPath": "<absolute path to a local checkout>",
      "targetPath": "docs/TECHNOLOGY_CAPABILITY_CATALOG.md"
    }
  ]
}
```

The repo ID uses lowercase letters, digits, and hyphens. The target path is relative to the checkout and must stay inside it.

## Refresh sequence

1. Use a clean checkout of the branch that should receive the file. The sweep refuses uncommitted changes to tracked files.
2. `npm run catalog -- sweep <repo-id>` records source facts and prints the candidate count, the `needs-verification` count, and the unparsed-file count. An unparsed file has a line over 20,000 characters, usually minified code, and contributes no consumers. Curate anything it hides by hand.
3. Edit `<private root>/<repo-id>/catalog.json`. Catalog every candidate or give it a disposition (`incidental`, `transitive`, `unused`) with a reason. Resolve every `needs-verification` candidate.
4. `npm run catalog -- validate <repo-id>` checks the entries against the swept facts.
5. `npm run catalog -- render <repo-id>` writes the draft into the private root.
6. `npm run catalog -- distribute <repo-id>` renders again from the validated catalog and copies the result into the checkout. It refuses a stale sweep unless you pass `--allow-stale`. It refuses a target that is git-ignored, inside `.git`, a symbolic link, or has uncommitted changes. It never stages, commits, or pushes.
7. Review the file in the product repo. Commit and push only after Marcus approves, and follow that repo's own branch rules.

`npm run catalog -- status <repo-id>` reports whether the catalog is stale against the checkout's current HEAD and lists the changed manifest, source, and infrastructure files. Add `--check` to exit non-zero when stale.

## Evidence rules

- A manifest line, an environment key, or a configuration value alone is at most `configured`.
- `implemented` needs a production-path consumer: an import in application code, a runtime command, a compose service, a workflow step, or a migration file.
- `tested` also needs a test file that imports the technology. A name that appears only in a mock or patch string does not count. Whether a test is relevant beyond that is the curator's judgment and the validator does not check it.
- `dev-test-only` is for technologies used only by tests or developer tooling.
- A curator may override the ceiling for one entry with a recorded reason. The rendered file shows every override.
- `planned` and `historical` entries need a document as evidence.
- Rationale is `documented` only when a tracked decision document exists. Otherwise it is `undocumented`.
- Prose fields make no adoption or outcome claim, and they hold no credential-shaped text or internal host name.

## Back up the private root

The curated entries exist only in the private root. A re-sweep rebuilds facts, not curated purpose, role, and capability mapping.

1. Copy the private root folder to a backup location outside every git repo.
2. To check a restore, copy it back and run `validate` for each repo. A restore is good when validation passes against a fresh sweep.

## Supersession

The earlier Job-agent catalog plan is superseded by `docs/plans/2026-10-03-1321-feat-technology-capability-catalog-plan.md`. Mark it with a one-line pointer in the Job-agent repo when its first catalog file is committed there.
