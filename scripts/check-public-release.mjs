import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const binaryExtensions = new Set(['.gif', '.jpeg', '.jpg', '.pdf', '.png', '.webp']);
const ignoredDirectories = new Set(['.git', 'node_modules', 'playwright-report', 'test-results']);
const publicContentExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.txt', '.xml']);
const requiredProfessionalEmail = 'marcus.uden.dev@gmail.com';

function normalizePath(path) {
  return path.split(sep).join('/');
}

function listFiles(root, current = root) {
  const files = [];
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = resolve(current, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(root, absolute));
    if (entry.isFile()) files.push(normalizePath(relative(root, absolute)));
  }
  return files.sort();
}

function git(root, args, fallback = '') {
  try {
    return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return fallback;
  }
}

function readJson(root, path, errors, category) {
  try {
    return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
  } catch {
    errors.push({ category, file: path, message: 'The file is missing or is not valid JSON.' });
    return null;
  }
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function addMatch(errors, category, file, message) {
  errors.push({ category, file, message });
}

export function validateRepository(root = repositoryRoot, options = {}) {
  const errors = [];
  const files = listFiles(root);
  const allowlist = readJson(root, 'release/allowlist.json', errors, 'allowlist');
  const privacy = readJson(root, 'release/privacy-review.json', errors, 'privacy-record');
  const allowed = new Set(allowlist?.allowedFiles ?? []);
  const cvImport = allowed.has('release/cv-import.json')
    ? readJson(root, 'release/cv-import.json', errors, 'cv-import')
    : null;

  for (const file of files) {
    if (!allowed.has(file)) addMatch(errors, 'unexpected-path', file, 'The file is not in the public release allowlist.');
  }

  const environmentTokens = (options.forbiddenIdentities ?? process.env.PUBLIC_RELEASE_FORBIDDEN_IDENTITIES ?? '')
    .split(';')
    .map((value) => value.trim())
    .filter(Boolean);
  const genericPrivateMarkers = ['private-identity.invalid', 'private-workbench.invalid'];
  const forbiddenIdentities = [...genericPrivateMarkers, ...environmentTokens];
  const localPathPatterns = [
    /[A-Za-z]:\\Users\\[^\s"'<>]+/gi,
    /[A-Za-z]:\/Users\/[^\s"'<>]+/gi,
    /[A-Za-z]:\\Min enhet\\[^\s"'<>]+/gi,
    /\\\\Users\\[^\s"'<>]+/gi
  ];
  const credentialPatterns = [
    /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g,
    /\bsk-[A-Za-z0-9_-]{20,}\b/g,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g
  ];
  const positiveMaturityPatterns = [
    /\bcurrent-UX\b/gi,
    /\bworking application\b/gi,
    /\bverified demo snapshot\b/gi,
    /\blive-verifiable\b/gi,
    /\b(?:is|now|currently) live\b/gi,
    /\blive (?:demo|experience|product)\b/gi
  ];

  for (const file of files) {
    const extension = extname(file).toLowerCase();
    if (!publicContentExtensions.has(extension)) continue;
    const content = readFileSync(resolve(root, file), 'utf8');
    for (const token of forbiddenIdentities) {
      if (token && content.toLowerCase().includes(token.toLowerCase())) {
        addMatch(errors, 'private-identity', file, 'The file contains a protected identity reference.');
      }
    }
    for (const pattern of localPathPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(content)) addMatch(errors, 'local-path', file, 'The file contains a local machine path.');
    }
    for (const pattern of credentialPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(content)) addMatch(errors, 'credential', file, 'The file contains a likely credential.');
    }
    if (file === 'README.md' || file.startsWith('site/')) {
      for (const pattern of positiveMaturityPatterns) {
        pattern.lastIndex = 0;
        if (pattern.test(content)) addMatch(errors, 'maturity', file, 'The file contains disallowed positive maturity wording.');
      }
    }
  }

  const binaries = files.filter((file) => binaryExtensions.has(extname(file).toLowerCase()));
  const reviewedFiles = new Map((privacy?.reviewedFiles ?? []).map((record) => [record.path, record]));
  if (binaries.length > 0 && privacy?.reviewStatus !== 'complete') {
    addMatch(errors, 'privacy-record', 'release/privacy-review.json', 'Binary artifacts require a completed privacy review.');
  }
  for (const file of binaries) {
    const record = reviewedFiles.get(file);
    if (!record || record.decision !== 'approved') {
      addMatch(errors, 'privacy-record', file, 'The binary artifact has no approved privacy record.');
      continue;
    }
    if (record.sha256 !== sha256(resolve(root, file))) {
      addMatch(errors, 'privacy-record', file, 'The binary artifact digest does not match the privacy record.');
    }
  }
  if (privacy?.reviewStatus === 'complete' && !privacy.candidateCommit) {
    addMatch(errors, 'privacy-record', 'release/privacy-review.json', 'A completed review must name its candidate commit.');
  }
  const cvPath = 'site/assets/cv/marcus-uden-cv.pdf';
  if (allowed.has(cvPath)) {
    if (!files.includes(cvPath)) {
      addMatch(errors, 'cv-import', cvPath, 'The approved public CV is missing.');
    } else if (!cvImport || cvImport.artifact?.path !== cvPath || cvImport.artifact?.privacyReview !== 'approved') {
      addMatch(errors, 'cv-import', 'release/cv-import.json', 'The CV import record is missing, incomplete, or not privacy-approved.');
    } else if (cvImport.artifact.sha256 !== sha256(resolve(root, cvPath))) {
      addMatch(errors, 'cv-import', cvPath, 'The CV digest does not match the approved import record.');
    }
  }

  const remote = git(root, ['remote', '-v']);
  if (remote) addMatch(errors, 'git-remote', '.git/config', 'The local staging repository must not have a remote before approval.');
  const head = git(root, ['rev-parse', '--verify', 'HEAD']);
  if (head) {
    const roots = git(root, ['rev-list', '--max-parents=0', 'HEAD']).split(/\r?\n/).filter(Boolean);
    if (roots.length !== 1) addMatch(errors, 'git-ancestry', '.git', 'The repository must have exactly one clean root commit.');
    const authors = git(root, ['log', '--format=%ae']).split(/\r?\n/).filter(Boolean);
    if (authors.some((email) => email.toLowerCase() !== requiredProfessionalEmail)) {
      addMatch(errors, 'git-author', '.git', 'All commits must use the professional author email.');
    }
    if (privacy?.reviewStatus === 'complete' && privacy.candidateCommit) {
      const candidateExists = git(root, ['cat-file', '-e', `${privacy.candidateCommit}^{commit}`], 'missing') === '';
      if (!candidateExists) {
        addMatch(errors, 'privacy-record', 'release/privacy-review.json', 'The reviewed candidate commit does not exist in this repository.');
      } else {
        const candidateIsAncestor = git(root, ['merge-base', '--is-ancestor', privacy.candidateCommit, 'HEAD'], 'missing') === '';
        if (!candidateIsAncestor) addMatch(errors, 'privacy-record', 'release/privacy-review.json', 'The reviewed candidate commit is not an ancestor of HEAD.');
        for (const file of binaries) {
          const changedAfterReview = git(root, ['diff', '--name-only', `${privacy.candidateCommit}..HEAD`, '--', file]);
          if (changedAfterReview) addMatch(errors, 'privacy-record', file, 'The binary artifact changed after the reviewed candidate commit.');
        }
      }
    }
    const forbiddenAncestors = (options.forbiddenAncestors ?? process.env.PUBLIC_RELEASE_FORBIDDEN_ANCESTORS ?? '')
      .split(';')
      .map((value) => value.trim())
      .filter(Boolean);
    for (const ancestor of forbiddenAncestors) {
      const present = git(root, ['merge-base', '--is-ancestor', ancestor, 'HEAD'], 'missing') === '';
      if (present) addMatch(errors, 'git-ancestry', '.git', 'The repository contains a protected private ancestor.');
    }
  }

  return { errors, files };
}

function printResult(result) {
  if (result.errors.length === 0) {
    console.log(`Public release validation passed for ${result.files.length} files.`);
    return;
  }
  for (const error of result.errors) console.error(`[${error.category}] ${error.file}: ${error.message}`);
  console.error(`Public release validation failed with ${result.errors.length} error(s).`);
  process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  printResult(validateRepository());
}
