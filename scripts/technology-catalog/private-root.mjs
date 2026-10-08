import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

export const PRIVATE_ROOT_ENV = 'TECHNOLOGY_CATALOG_PRIVATE_ROOT';
const DEFAULT_RELATIVE_ROOT = ['internal', 'technology-catalog'];
const REPO_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

export function git(cwd, args, options = {}) {
  return execFileSync('git', ['-C', cwd, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 256 * 1024 * 1024,
    ...options
  });
}

function tryGit(cwd, args) {
  try {
    return git(cwd, args).trim();
  } catch {
    return null;
  }
}

export function insideDirectory(parent, child) {
  const path = relative(parent, child);
  return path === '' || (!path.startsWith('..') && !isAbsolute(path));
}

// The checkout that owns the shared git directory holds the private root, whatever branch it has
// checked out, so every worktree of this repo resolves to the same folder.
export function resolvePrivateRoot({ cwd = process.cwd(), env = process.env } = {}) {
  const override = env[PRIVATE_ROOT_ENV];
  if (override) {
    if (!isAbsolute(override)) throw new Error(`${PRIVATE_ROOT_ENV} must be an absolute path.`);
    const root = resolve(override);
    const probe = existsSync(root) ? root : dirname(root);
    const toplevel = tryGit(probe, ['rev-parse', '--show-toplevel']);
    const common = toplevel ? tryGit(probe, ['rev-parse', '--git-common-dir']) : null;
    return { root, ownerCheckout: toplevel ? resolve(toplevel) : null, commonDir: common ? resolve(probe, common) : undefined, source: 'env' };
  }
  const common = tryGit(cwd, ['rev-parse', '--git-common-dir']);
  if (!common) throw new Error('Cannot resolve the private root: the working directory is not inside a git repository.');
  const commonDir = resolve(cwd, common);
  const ownerCheckout = dirname(commonDir);
  return { root: join(ownerCheckout, ...DEFAULT_RELATIVE_ROOT), ownerCheckout, commonDir, source: 'default' };
}

function ignoredByGit(ownerCheckout, root) {
  const probe = join(relative(ownerCheckout, root), '.ignore-check').split(sep).join('/');
  try {
    git(ownerCheckout, ['check-ignore', '-q', '--', probe]);
    return true;
  } catch {
    return false;
  }
}

// Returns the resolved location, or throws when git would not ignore a root inside a checkout.
export function assertPrivateRoot(location) {
  const { root, ownerCheckout } = location;
  if (ownerCheckout && insideDirectory(ownerCheckout, root) && !ignoredByGit(ownerCheckout, root)) {
    throw new Error(
      `The private root is not ignored by git: add an ignore rule for it or run "init". Missing rule for ${relative(ownerCheckout, root).split(sep).join('/')}/`
    );
  }
  return location;
}

// Makes the default root ignored through the shared exclude file, so no tracked file has to change first.
export function initPrivateRoot(location) {
  const { root, ownerCheckout, commonDir } = location;
  if (ownerCheckout && insideDirectory(ownerCheckout, root) && !ignoredByGit(ownerCheckout, root)) {
    const excludeFile = join(commonDir, 'info', 'exclude');
    mkdirSync(dirname(excludeFile), { recursive: true });
    const existing = existsSync(excludeFile) ? readFileSync(excludeFile, 'utf8') : '';
    const rule = `/${relative(ownerCheckout, root).split(sep).join('/')}/`;
    appendFileSync(excludeFile, `${existing === '' || existing.endsWith('\n') ? '' : '\n'}${rule}\n`);
  }
  assertPrivateRoot(location);
  mkdirSync(root, { recursive: true });
  return location;
}

export function validateRegistry(registry, { exists = existsSync } = {}) {
  const errors = [];
  if (!registry || registry.schemaVersion !== 1 || !Array.isArray(registry.repos)) {
    return [{ repo: null, message: 'The registry must be an object with schemaVersion 1 and a repos array.' }];
  }
  const seen = new Set();
  for (const repo of registry.repos) {
    const id = repo?.id ?? null;
    const fail = (message) => errors.push({ repo: id, message });
    if (typeof id !== 'string' || !REPO_ID_PATTERN.test(id)) {
      fail('The repo ID must be lowercase letters, digits, and hyphens.');
      continue;
    }
    if (seen.has(id)) fail('The repo ID is duplicated.');
    seen.add(id);
    if (typeof repo.displayName !== 'string' || repo.displayName.trim() === '') fail('The display name is missing.');
    if (typeof repo.checkoutPath !== 'string' || !isAbsolute(repo.checkoutPath)) {
      fail('The checkout path must be an absolute path.');
    } else if (!exists(repo.checkoutPath)) {
      fail('The checkout path does not exist.');
    } else if (tryGit(repo.checkoutPath, ['rev-parse', '--show-toplevel']) === null) {
      fail('The checkout path is not a git repository.');
    }
    if (typeof repo.targetPath !== 'string' || repo.targetPath === '' || isAbsolute(repo.targetPath)) {
      fail('The target path must be a repo-relative path.');
    } else if (typeof repo.checkoutPath === 'string' && isAbsolute(repo.checkoutPath)) {
      if (!insideDirectory(resolve(repo.checkoutPath), resolve(repo.checkoutPath, repo.targetPath))) {
        fail('The target path escapes the checkout.');
      } else if (/^\.git(\/|\\|$)/i.test(repo.targetPath.replace(/^\.[\\/]/, ''))) {
        fail('The target path may not be inside .git.');
      }
    }
  }
  return errors;
}

export function loadRegistry(root) {
  const file = join(root, 'repos.json');
  if (!existsSync(file)) throw new Error(`The registry is missing: create ${file} with schemaVersion 1 and a repos array.`);
  const registry = JSON.parse(readFileSync(file, 'utf8'));
  const errors = validateRegistry(registry);
  if (errors.length > 0) {
    throw new Error(errors.map((error) => `${error.repo ?? 'registry'}: ${error.message}`).join('\n'));
  }
  return registry;
}

export function findRepo(registry, id) {
  const repo = registry.repos.find((candidate) => candidate.id === id);
  if (!repo) throw new Error(`No repo "${id}" in the registry. Known repos: ${registry.repos.map((r) => r.id).join(', ') || 'none'}.`);
  return repo;
}

export function repoFolder(root, id) {
  return join(root, id);
}
