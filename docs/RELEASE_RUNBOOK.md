# Public release runbook

## Current gate

The repository is local-only. Public repository creation, Pages activation, and DNS changes require explicit approval from Marcus.

## Local Ready gate

Run from the repository root:

```text
npm ci
npx playwright install chromium
npm audit --audit-level=high
npm test
npm run release:validate
git diff --check
```

Confirm these items before approval:

1. `git remote -v` is empty.
2. Every commit uses `Marcus Udén <marcus.uden.dev@gmail.com>`.
3. `release/privacy-review.json` binds every binary digest to an ancestor candidate commit.
4. The private repository HEAD, remote, and user-owned changes remain unchanged.
5. The professional profile staging repository has no remote and contains only approved professional identity text.

## Publication gate — one-way door

Public caches and Git history can retain published material. Do not run these steps without explicit approval.

After approval:

1. Create `marcus-uden-dev/ai-native-proof-of-work` as a new public repository. Do not fork, transfer, mirror, or import history.
2. Add only `https://github.com/marcus-uden-dev/ai-native-proof-of-work.git` as `origin`.
3. Configure the protected identity and ancestor values as repository secrets for the Quality workflow.
4. Push the approved staging history.
5. Confirm repository metadata reports no fork parent.
6. Confirm Quality passes before Pages deploys.
7. Record the released commit SHA and the last approved rollback commit.

## Temporary Pages validation

Keep the project URL as the first host. Test the home page, case study, prototype deep links, CV, prompt copy, email, metadata, sitemap, and 404 page.

The canonical domain metadata intentionally names `https://marcus.uden.dev`. Do not activate that domain until the temporary host passes and Marcus gives separate approval.

## Content rollback drill

Use append-only history. Do not rewrite public history.

1. Record the bad commit SHA and last approved commit SHA.
2. Run `git revert --no-edit <bad-commit-sha>`.
3. Run the Local Ready gate on the revert commit.
4. Push the revert commit after it passes.
5. Confirm Pages serves the restored content and record the revert SHA.

The original content remains recoverable from the recorded commits.

## Domain gate and rollback

After separate approval, add the custom subdomain in GitHub Pages before changing DNS. Verify account ownership, retain the DNS verification record, configure the CNAME, wait for HTTPS, then retest every canonical route.

If domain activation fails, remove the Pages custom-domain setting and its DNS CNAME. The temporary project URL remains the fallback. No private repository change is part of this rollback.

Search Console registration follows a working HTTPS custom domain. It is not a Local Ready or publication blocker.

## External AI gate

After the temporary public URL exists, run every fixture in `tests/evaluation/fixtures.json` with ChatGPT and Claude. Use `tests/evaluation/rubric.md`. Record provider, model, date, access state, output, and pass or failure. Provider access limits are recorded; they do not weaken the public evidence contract.

