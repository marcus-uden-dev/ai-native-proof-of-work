import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MARKER = '<!-- generated-by: build-technology-catalog.mjs -->';
export const STATES = ['implemented', 'tested', 'configured', 'dev-test-only', 'planned', 'historical'];

const SKIP_DIRS = new Set(['node_modules', '.git', 'venv', '__pycache__', '.next', 'dist', 'build', '.cache', '.pytest_cache', '.mypy_cache', 'coverage', 'test-results', 'site-packages', '.claude', '.codex', '.agents', 'worktrees', '.worktrees']);
const skipDir = (name) => SKIP_DIRS.has(name) || /^\.?venv([-_.].*)?$/i.test(name);
const SOURCE_EXT = new Set(['.py', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);
const MAX_BYTES = 1_000_000;

// Same pattern as `unsafe` in export-public-decision-log.mjs (not exported there).
export const isUnsafe = (value) => /(?:[a-z]:[\\/]|(?:^|[\s"'(])\/(?:users|home|var|tmp)(?:\/|$)|\\|(?:^|[\\/])\.(?:codex|claude|agents)(?:[\\/]|$)|raw[- ]chat|(?:password|secret|token|api[_ -]?key)\s*[:=]|@(?:[a-z0-9-]+\.)+[a-z]{2,})/i.test(String(value ?? ''));

const sha = (value) => crypto.createHash('sha256').update(value).digest('hex');
const norm = (name) => name.toLowerCase().replace(/[_.]+/g, '-');
const isTestPath = (rel) => /(?:^|\/)(?:tests?|__tests__|spec|e2e)\/|\.(?:test|spec)\.[a-z]+$|(?:^|\/)test_[^/]*\.py$|_test\.py$|(?:^|\/)conftest\.py$|(?:^|\/)[^/]*_test_[^/]*\.py$/i.test(rel);

export function loadRegistry() {
  return JSON.parse(fs.readFileSync(new URL('./technology-registry.json', import.meta.url), 'utf8'));
}

function walk(root) {
  const files = [];
  const visit = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!skipDir(entry.name)) visit(path.join(dir, entry.name));
      } else if (entry.isFile()) {
        const full = path.join(dir, entry.name);
        if (fs.statSync(full).size <= MAX_BYTES) files.push({ rel: path.relative(root, full).split(path.sep).join('/'), full });
      }
    }
  };
  visit(root);
  return files.sort((a, b) => a.rel.localeCompare(b.rel));
}

function lookup(registry) {
  const byAlias = new Map();
  for (const [key, entry] of Object.entries(registry)) {
    byAlias.set(norm(key), key);
    for (const alias of entry.aliases ?? []) byAlias.set(norm(alias), key);
  }
  return byAlias;
}

const specName = (spec) => spec.trim().match(/^([A-Za-z0-9_.@/-]+)/)?.[1];

// Manifest candidates: { name, dev, evidence }
function manifestCandidates(file, text) {
  const out = [];
  const base = path.posix.basename(file.rel);
  if (/^requirements.*\.txt$/i.test(base)) {
    const dev = /dev|test/i.test(base);
    for (const line of text.split(/\r?\n/)) {
      const clean = line.replace(/#.*/, '').trim();
      if (clean && !clean.startsWith('-')) {
        const name = specName(clean.replace(/\[.*?\]/, ''));
        if (name) out.push({ name, dev, evidence: file.rel });
      }
    }
  } else if (base === 'pyproject.toml') {
    let section = '';
    for (const line of text.split(/\r?\n/)) {
      const header = line.match(/^\s*\[([^\]]+)\]/);
      if (header) section = header[1];
      const key = line.match(/^\s*([A-Za-z0-9_-]+)\s*=\s*\[/);
      if (key) section = `${section}.${key[1]}`;
      const dev = /dev|test/i.test(section);
      if (/(^|\.)(dependencies|optional-dependencies|dev-dependencies|dependency-groups)(\.|$)/i.test(section)) {
        const quoted = line.match(/^\s*(?:[A-Za-z0-9_-]+\s*=\s*\[)?\s*["']([A-Za-z0-9_.-]+)/);
        if (quoted && !/^(python|requires)$/i.test(quoted[1])) out.push({ name: quoted[1], dev, evidence: file.rel });
      }
    }
  } else if (base === 'package.json') {
    let pkg;
    try { pkg = JSON.parse(text); } catch { return out; }
    for (const [field, dev] of [['dependencies', false], ['peerDependencies', false], ['devDependencies', true]]) {
      for (const name of Object.keys(pkg[field] ?? {})) out.push({ name, dev, evidence: file.rel });
    }
  }
  return out;
}

export function scanRepo(repoPath, registry = loadRegistry()) {
  const root = path.resolve(repoPath);
  const files = walk(root);
  const aliasToKey = lookup(registry);
  const found = new Map(); // key -> { key, dev, manifest, consumers, tests, extra, evidence:Set, kinds }
  const unclassified = new Map();
  const texts = new Map();
  const read = (file) => {
    if (!texts.has(file.rel)) texts.set(file.rel, fs.readFileSync(file.full, 'utf8'));
    return texts.get(file.rel);
  };
  const entryFor = (key) => {
    if (!found.has(key)) found.set(key, { key, devOnly: true, manifest: false, consumers: [], tests: [], configured: [], implementedBy: [] });
    return found.get(key);
  };

  for (const file of files) {
    const base = path.posix.basename(file.rel);
    const isManifest = /^requirements.*\.txt$/i.test(base) || base === 'pyproject.toml' || base === 'package.json';
    const isDocker = /^Dockerfile/i.test(base) || /^(docker-)?compose.*\.ya?ml$/i.test(base);
    const isWorkflow = /^\.github\/workflows\/[^/]+\.ya?ml$/.test(file.rel);
    const isEnv = /(^|\/)\.env[^/]*$/.test(file.rel) || /(^|\/)\.?env\.(example|sample)$/.test(file.rel);
    const ext = path.posix.extname(file.rel);
    if (!(isManifest || isDocker || isWorkflow || isEnv || SOURCE_EXT.has(ext))) continue;
    const text = read(file);

    if (isManifest) {
      for (const cand of manifestCandidates(file, text)) {
        const key = aliasToKey.get(norm(cand.name));
        if (!key) {
          const prev = unclassified.get(norm(cand.name)) ?? { name: cand.name, dev: true, evidence: file.rel };
          unclassified.set(norm(cand.name), { ...prev, dev: prev.dev && cand.dev });
          continue;
        }
        const entry = entryFor(key);
        entry.manifest = true;
        entry.devOnly = entry.devOnly && cand.dev;
        entry.configured.push(cand.evidence);
      }
    }
    if (isDocker) {
      for (const match of text.matchAll(/^\s*(?:FROM|image:)\s+["']?([^\s"':@]+)/gim)) {
        const image = match[1].toLowerCase();
        for (const [key, entry] of Object.entries(registry)) {
          if ((entry.images ?? []).some((i) => image === i || image.endsWith(`/${i}`))) entryFor(key).implementedBy.push(file.rel);
        }
      }
      if (/^FROM\s/im.test(text)) entryFor('docker').implementedBy.push(file.rel);
      for (const [key, entry] of Object.entries(registry)) {
        for (const cmd of entry.commands ?? []) {
          if (new RegExp(`\\b${cmd}\\b`).test(text) && /(CMD|ENTRYPOINT|command:)/.test(text)) entryFor(key).implementedBy.push(file.rel);
        }
      }
    }
    if (isWorkflow) entryFor('github-actions').implementedBy.push(file.rel);
    if (isEnv) {
      for (const [key, entry] of Object.entries(registry)) {
        for (const prefix of entry.envKeys ?? []) {
          if (new RegExp(`^\\s*${prefix}`, 'm').test(text)) entryFor(key).configured.push(file.rel);
        }
      }
    }
    if (SOURCE_EXT.has(ext) && !/^(?:docs?|documentation)\//i.test(file.rel)) {
      const test = isTestPath(file.rel);
      for (const [key, entry] of Object.entries(registry)) {
        const bucket = test ? 'tests' : 'consumers';
        for (const mod of entry.imports ?? []) {
          const esc = mod.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
          const py = ext === '.py' && new RegExp(`^\\s*(?:import|from)\\s+${esc}(?:[.\\s]|$)`, 'm').test(text);
          const js = ext !== '.py' && new RegExp(`(?:from\\s+|require\\(\\s*|import\\s+)["']${esc}(?:/[^"']*)?["']`).test(text);
          if (py || js) { entryFor(key)[bucket].push(file.rel); break; }
        }
        for (const scheme of entry.urlSchemes ?? []) {
          if (text.includes(`postgresql${scheme}`) || text.includes(`postgres${scheme}`)) entryFor(key)[bucket].push(file.rel);
        }
      }
    }
  }

  const rows = [];
  for (const entry of found.values()) {
    const reg = registry[entry.key];
    const unique = (list) => [...new Set(list)].sort();
    const live = unique([...entry.consumers, ...entry.implementedBy]);
    const tests = unique(entry.tests);
    const configured = unique(entry.configured);
    let state; let evidence;
    if (live.length) { state = 'implemented'; evidence = live; }
    else if (tests.length) { state = entry.manifest && entry.devOnly ? 'dev-test-only' : 'tested'; evidence = tests; }
    else if (configured.length) { state = entry.manifest && entry.devOnly ? 'dev-test-only' : 'configured'; evidence = configured; }
    else continue;
    rows.push({ key: entry.key, name: reg.name, purpose: reg.purpose, capability: reg.capability, state, evidence: evidence.slice(0, 3) });
  }
  rows.sort((a, b) => STATES.indexOf(a.state) - STATES.indexOf(b.state) || a.name.localeCompare(b.name));

  const unclassifiedRows = [...unclassified.values()]
    .map((u) => ({ name: u.name, state: u.dev ? 'dev-test-only' : 'configured', evidence: [u.evidence] }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const evidenceFiles = [...new Set([...rows, ...unclassifiedRows].flatMap((r) => r.evidence))].sort();
  const fingerprint = sha(JSON.stringify(evidenceFiles.map((rel) => [rel, sha(texts.get(rel) ?? '')])));
  return { rows, unclassified: unclassifiedRows, fingerprint };
}

const cell = (value) => String(value).replace(/\|/g, '/');

export function renderCatalog({ rows, unclassified, fingerprint }, repoName) {
  const lines = [
    MARKER,
    `# Technology Capability Catalog: ${repoName}`,
    '',
    `Source fingerprint: \`${fingerprint}\``,
    '',
    'Each row is backed by source evidence. A dependency or config key alone is `configured`, never `implemented`.',
    '',
    '| State | Meaning |',
    '|---|---|',
    '| implemented | A live consumer exists in non-test source, a container image or a CI workflow |',
    '| tested | Used only by test code |',
    '| configured | Declared in a manifest or config, with no live consumer found |',
    '| dev-test-only | Declared only as a development or test dependency |',
    '| planned | Intended, not yet built (set by hand, never generated) |',
    '| historical | Used before, no longer used (set by hand, never generated) |',
    '',
    '## Technologies',
    '',
    '| Technology | Purpose | Capability | State | Evidence |',
    '|---|---|---|---|---|',
    ...rows.map((r) => `| ${cell(r.name)} | ${cell(r.purpose)} | ${cell(r.capability)} | ${r.state} | ${r.evidence.map((e) => `\`${cell(e)}\``).join(', ')} |`),
    '',
    '## Unclassified',
    '',
    'Declared packages without curated purpose text. State only.',
    '',
    ...(unclassified.length
      ? ['| Package | State | Evidence |', '|---|---|---|', ...unclassified.map((r) => `| ${cell(r.name)} | ${r.state} | \`${cell(r.evidence[0])}\` |`)]
      : ['None.']),
    ''
  ];
  const output = lines.join('\n');
  if (isUnsafe(output.replace(MARKER, ''))) throw new Error('Catalog failed the public-safety scan.');
  return output;
}

export function buildCatalog(repoPath, { name } = {}) {
  const result = scanRepo(repoPath);
  return renderCatalog(result, name ?? path.basename(path.resolve(repoPath)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const take = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
  const out = take('--out');
  const name = take('--name');
  const [repoPath] = args;
  if (!repoPath || !fs.existsSync(repoPath)) {
    console.error('Usage: node scripts/build-technology-catalog.mjs <repoPath> [--out file] [--name label]');
    process.exit(2);
  }
  try {
    const output = buildCatalog(repoPath, { name });
    if (out) fs.writeFileSync(out, output); else process.stdout.write(output);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
