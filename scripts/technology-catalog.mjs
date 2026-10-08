import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatErrors, validateCatalog } from './technology-catalog/catalog.mjs';
import { catalogStatus, distribute } from './technology-catalog/distribute.mjs';
import {
  assertPrivateRoot, findRepo, initPrivateRoot, loadRegistry, repoFolder, resolvePrivateRoot
} from './technology-catalog/private-root.mjs';
import { renderCatalog } from './technology-catalog/render.mjs';
import { candidateIds, sweepCheckout } from './technology-catalog/sweep.mjs';

const USAGE = `Usage: node scripts/technology-catalog.mjs <command> [repo-id] [--check]

Commands:
  init                 Make the private root ignored by git and create it.
  sweep <repo-id>      Record source facts for a clean checkout of a registered repo.
  validate <repo-id>   Check the curated catalog against the swept facts.
  render <repo-id>     Write the Markdown draft into the private root.
  distribute <repo-id> Render fresh, then copy into the repo checkout. Never commits or pushes.
                       Refuses a stale sweep unless --allow-stale is given.
  status <repo-id>     Report whether the catalog is stale. With --check, exit 1 when stale.
`;

function readJson(path, hint) {
  if (!existsSync(path)) throw new Error(`Missing ${path}. ${hint}`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function main(argv, { cwd = process.cwd(), env = process.env, out = console.log, err = console.error } = {}) {
  const [command, repoId, ...flags] = argv;
  try {
    if (!command || command === '--help' || command === '-h') {
      out(USAGE);
      return command ? 0 : 1;
    }
    const location = resolvePrivateRoot({ cwd, env });
    if (command === 'init') {
      initPrivateRoot(location);
      out(`Private root ready: ${location.root}`);
      return 0;
    }
    assertPrivateRoot(location);
    if (!repoId) throw new Error(`The ${command} command needs a repo ID.\n${USAGE}`);
    const registry = loadRegistry(location.root);
    const repo = findRepo(registry, repoId);
    const folder = repoFolder(location.root, repo.id);
    const sweepPath = join(folder, 'sweep.json');
    const catalogPath = join(folder, 'catalog.json');
    const draftPath = join(folder, 'TECHNOLOGY_CAPABILITY_CATALOG.md');

    if (command === 'sweep') {
      const sweep = sweepCheckout({ checkoutPath: repo.checkoutPath, repoId: repo.id });
      mkdirSync(folder, { recursive: true });
      writeFileSync(sweepPath, `${JSON.stringify(sweep, null, 2)}\n`);
      out(`Swept ${repo.id} at ${sweep.commit.slice(0, 12)} (${sweep.branch}): ${sweep.packages.length} packages, ${sweep.envKeys.length} environment keys, ${sweep.infra.length} infrastructure items.`);
      out(`Candidates: ${candidateIds(sweep).length}. Needs verification: ${sweep.needsVerification.length}. Unparsed files: ${sweep.unparsedFiles.length}.`);
      return 0;
    }
    const sweep = readJson(sweepPath, `Run "sweep ${repo.id}" first.`);
    if (command === 'status') {
      const status = catalogStatus({ repo, sweep });
      out(`${repo.id}: ${status.stale ? 'stale' : 'current'}. ${status.reason}`);
      out(`Swept ${sweep.commit.slice(0, 12)} (${sweep.branch}); checkout HEAD ${status.head.slice(0, 12)} (${status.branch}).`);
      for (const file of status.changed) out(`  changed: ${file}`);
      return flags.includes('--check') && status.stale ? 1 : 0;
    }
    const catalog = readJson(catalogPath, 'Write the curated entries first.');
    const errors = validateCatalog(catalog, sweep);
    if (command === 'validate') {
      if (errors.length > 0) {
        err(formatErrors(errors));
        err(`Validation failed with ${errors.length} error(s).`);
        return 1;
      }
      out(`Catalog for ${repo.id} is valid: ${catalog.entries.length} entries.`);
      return 0;
    }
    if (errors.length > 0) {
      err(formatErrors(errors));
      throw new Error(`Cannot ${command}: the catalog is not valid.`);
    }
    if (command === 'render') {
      writeFileSync(draftPath, renderCatalog({ catalog, sweep, displayName: repo.displayName }));
      out(`Rendered ${draftPath}`);
      return 0;
    }
    if (command === 'distribute') {
      const status = catalogStatus({ repo, sweep });
      if (status.stale && !flags.includes('--allow-stale')) {
        throw new Error(`The sweep is stale: ${status.reason} Run sweep, validate, and distribute again, or pass --allow-stale.`);
      }
      // Always render from the validated inputs, so the shipped file cannot lag behind catalog.json.
      writeFileSync(draftPath, renderCatalog({ catalog, sweep, displayName: repo.displayName }));
      const result = distribute({ repo, draftPath });
      out(`${result.action === 'written' ? 'Wrote' : 'Already current:'} ${result.target}`);
      if (result.status) out(`git status: ${result.status}`);
      out('Nothing was staged, committed, or pushed. Review the file, then commit it in the product repo after approval.');
      return 0;
    }
    throw new Error(`Unknown command "${command}".\n${USAGE}`);
  } catch (error) {
    err(error.message);
    return 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = main(process.argv.slice(2));
}
