import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { findSecrets } from './catalog.mjs';
import { git, insideDirectory } from './private-root.mjs';
import { changedRelevantFiles } from './sweep.mjs';

function gitIgnores(checkout, relativePath) {
  try {
    git(checkout, ['check-ignore', '-q', '--', relativePath]);
    return true;
  } catch {
    return false;
  }
}

// Copies the rendered draft into the registered checkout. It never stages, commits, or pushes.
export function distribute({ repo, draftPath }) {
  if (!existsSync(draftPath)) throw new Error(`No rendered draft for ${repo.id}. Run sweep, validate, and render first.`);
  let toplevel;
  try {
    toplevel = git(repo.checkoutPath, ['rev-parse', '--show-toplevel']).trim();
  } catch {
    throw new Error(`The checkout for ${repo.id} is not a git repository.`);
  }
  const checkout = resolve(toplevel);
  const target = resolve(checkout, repo.targetPath);
  if (target === checkout || !insideDirectory(checkout, target)) throw new Error(`The target path for ${repo.id} escapes the checkout.`);
  const relativeTarget = relative(checkout, target).split(sep).join('/');
  if (/^\.git(\/|$)/i.test(relativeTarget)) throw new Error(`The target path for ${repo.id} is inside .git.`);

  // A symlinked folder or file could send the write outside the checkout, so compare real paths.
  let ancestor = dirname(target);
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  if (!insideDirectory(realpathSync(checkout), realpathSync(ancestor))) {
    throw new Error(`The target path for ${repo.id} resolves outside the checkout through a symbolic link.`);
  }
  if (existsSync(target) || lstatSync(target, { throwIfNoEntry: false })) {
    const stat = lstatSync(target);
    if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`The target for ${repo.id} is a symbolic link or not a regular file: ${relativeTarget}`);
  }
  if (gitIgnores(checkout, relativeTarget)) {
    throw new Error(`The target for ${repo.id} is ignored by git, so the catalog could not be committed: ${relativeTarget}`);
  }

  const draft = readFileSync(draftPath, 'utf8');
  if (findSecrets(draft).length > 0) throw new Error(`The draft for ${repo.id} contains a credential-shaped string or an internal host name. Fix the curated entry and render again.`);

  if (existsSync(target) && readFileSync(target, 'utf8') === draft) {
    return { action: 'unchanged', target, status: git(checkout, ['status', '--short', '--', relativeTarget]).trim() };
  }
  const dirty = git(checkout, ['status', '--porcelain', '--', relativeTarget]).trim();
  if (dirty !== '') {
    throw new Error(`The target file has uncommitted changes, so nothing was written: ${relativeTarget}\n${dirty}\nCommit or discard them, then run distribute again.`);
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(draftPath, target);
  return { action: 'written', target, status: git(checkout, ['status', '--short', '--', relativeTarget]).trim() };
}

export function catalogStatus({ repo, sweep }) {
  const checkout = resolve(git(repo.checkoutPath, ['rev-parse', '--show-toplevel']).trim());
  const head = git(checkout, ['rev-parse', 'HEAD']).trim();
  const branch = git(checkout, ['branch', '--show-current']).trim() || '(detached)';
  if (head === sweep.commit) return { stale: false, head, branch, changed: [], reason: 'The checkout is at the swept commit.' };
  let descendant = true;
  try {
    git(checkout, ['merge-base', '--is-ancestor', sweep.commit, head]);
  } catch {
    descendant = false;
  }
  if (!descendant) {
    return { stale: true, head, branch, changed: [], reason: 'The checkout HEAD does not contain the swept commit.' };
  }
  const changed = changedRelevantFiles(git(checkout, ['diff', '--name-only', sweep.commit, head]).split('\n').filter(Boolean));
  return {
    stale: changed.length > 0,
    head,
    branch,
    changed,
    reason: changed.length > 0 ? `${changed.length} manifest, source, or infrastructure file(s) changed since the sweep.` : 'New commits touched no swept file type.'
  };
}
