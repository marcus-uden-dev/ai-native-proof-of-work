import { createHash } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { PYTHON_IMPORT_ALIASES, normalizePythonName } from './aliases.mjs';
import { git } from './private-root.mjs';

export const TOOL_VERSION = 'technology-catalog/1';

const MAX_FILE_BYTES = 1_500_000;
const SKIPPED_DIRECTORIES = /(^|\/)(node_modules|vendor|dist|build|\.next|__pycache__|\.venv|venv|coverage|target)\//;
const LOCKFILES = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'poetry.lock', 'Pipfile.lock', 'uv.lock', 'bun.lockb', 'Cargo.lock']);
const PYTHON_EXTENSIONS = new Set(['.py']);
const JS_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts']);
const CONFIG_EXTENSIONS = new Set(['.yml', '.yaml', '.toml', '.ini', '.cfg', '.conf', '.json', '.properties', '.env']);
const MANIFEST_NAMES = new Set(['package.json', 'pyproject.toml', 'setup.cfg', 'setup.py', 'Pipfile']);

const APP_ONLY_KINDS = new Set(['import', 'runtime-command', 'compose-service', 'container-image']);
const LONG_LINE = /[^\n]{20000}/;

// Path predicates shared by the sweep and the stale check, so both agree on what the sweep reads.
const isDockerfileName = (name) => /^Dockerfile(\..+)?$/.test(name) || name.endsWith('.dockerfile');
const isComposeName = (name) => /^(docker-)?compose(\..+)?\.ya?ml$/.test(name);
const isWorkflowPath = (path) => /^\.github\/workflows\/[^/]+\.ya?ml$/.test(path);
const isRequirementsPath = (path) => /(^|\/)requirements[^/]*\.txt$/.test(path) || /(^|\/)requirements\/[^/]+\.txt$/.test(path);
const isNginxPath = (path) => /(^|\/)nginx[^/]*\.conf$/.test(path);
const isCollectorPath = (path) => /otel[^/]*collector[^/]*\.ya?ml$|collector[^/]*config[^/]*\.ya?ml$/.test(path);
const MIGRATION_PATTERN = /^(.*\/)?(alembic\/versions|supabase\/migrations|migrations|db\/migrate)\/[^/]+\.(py|sql|ts|js)$/;
// Development, test, and override variants of container files do not describe the production runtime.
const isDevInfraFile = (path) => /(^|[./_-])(dev|development|test|tests|local|override|ci|e2e)([./_-]|$)/i.test(basename(path));

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function classifyFile(path) {
  if (/(^|\/)(tests?|__tests__|__mocks__|__fixtures__|fixtures?|mocks?|e2e|specs?|cypress|testing|test-utils|testutils)\//i.test(path)) return 'test';
  if (/(^|\/)(test_[^/]+\.py|[^/]+_test\.py|conftest\.py)$/.test(path)) return 'test';
  if (/\.(test|spec|mock|fixture)\.[cm]?[jt]sx?$/.test(path)) return 'test';
  if (/(^|\/)(setup-?tests?|jest\.setup|vitest\.setup)[^/]*$/i.test(path)) return 'test';
  if (/(^|\/)(scripts?|tools?|benchmarks?|bin|examples?|demos?|docs?|stories|\.storybook)\//i.test(path)) return 'dev-tooling';
  if (/\.stories\.[cm]?[jt]sx?$/.test(path)) return 'dev-tooling';
  if (/(^|\/)[^/]*\.config\.[cm]?[jt]s$/.test(path)) return 'dev-tooling';
  if (/(^|\/)(setup|noxfile|fabfile)\.py$/.test(path)) return 'dev-tooling';
  return 'app';
}

// Workflow steps and migration files run whatever their class. Everything else counts only from application files.
export function isProductionConsumer(consumer) {
  if (consumer.kind === 'workflow-step' || consumer.kind === 'migration-file') return true;
  return APP_ONLY_KINDS.has(consumer.kind) && consumer.class === 'app';
}

export function maxStateFor(consumers) {
  const production = consumers.filter(isProductionConsumer);
  const tests = consumers.filter((consumer) => consumer.class === 'test' && consumer.kind === 'import');
  const dev = consumers.filter((consumer) => consumer.class === 'dev-tooling' || consumer.class === 'test');
  if (production.length > 0) return tests.length > 0 ? 'tested' : 'implemented';
  if (dev.length > 0) return 'dev-test-only';
  return 'configured';
}

// Reads regular files only, so a tracked symlink cannot pull in content from outside the checkout.
// Normalizes CRLF to LF: a Windows checkout with core.autocrlf=true yields CRLF, and `.` in a regex does not match `\r`.
function readText(root, path) {
  try {
    const absolute = join(root, path);
    const stat = lstatSync(absolute);
    if (!stat.isFile() || stat.size > MAX_FILE_BYTES) return '';
    return readFileSync(absolute, 'utf8').replace(/\r\n?/g, '\n');
  } catch {
    return '';
  }
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replaces comments and strings with blanks while keeping line numbers.
function blank(match) {
  return match.replace(/[^\n]/g, ' ');
}

export function stripPythonNoise(text) {
  return text.replace(/("""|''')[\s\S]*?\1/g, blank);
}

// Characters after which a slash starts a regular-expression literal rather than a division.
const REGEX_PRECEDERS = new Set(['', '(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '+', '-', '*', '%', '~', '^']);

// Blanks comments and regex literals, and replaces every string with a numbered placeholder.
// Import text inside a string, template, comment, or regex literal is therefore never scanned.
export function tokenizeJs(source) {
  const literals = [];
  const length = source.length;
  let out = '';
  let index = 0;
  let previous = '';
  while (index < length) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '/' && next === '/') {
      while (index < length && source[index] !== '\n') {
        out += ' ';
        index += 1;
      }
    } else if (char === '/' && next === '*') {
      const end = source.indexOf('*/', index + 2);
      const stop = end === -1 ? length : end + 2;
      out += blank(source.slice(index, stop));
      index = stop;
    } else if (char === '"' || char === "'") {
      let cursor = index + 1;
      while (cursor < length && source[cursor] !== char && source[cursor] !== '\n') {
        if (source[cursor] === '\\') cursor += 1;
        cursor += 1;
      }
      literals.push(source.slice(index + 1, cursor));
      out += `${char}\u0001${literals.length - 1}\u0001${char}`;
      index = cursor + 1;
      previous = char;
    } else if (char === '`') {
      let cursor = index + 1;
      let depth = 0;
      let dynamic = false;
      while (cursor < length) {
        const c = source[cursor];
        if (c === '\\') {
          cursor += 2;
          continue;
        }
        if (depth === 0 && c === '`') break;
        if (c === '$' && source[cursor + 1] === '{') {
          depth += 1;
          dynamic = true;
          cursor += 2;
          continue;
        }
        if (depth > 0 && c === '{') depth += 1;
        else if (depth > 0 && c === '}') depth -= 1;
        cursor += 1;
      }
      literals.push(dynamic ? null : source.slice(index + 1, cursor));
      out += `"\u0001${literals.length - 1}\u0001"`;
      index = cursor + 1;
      previous = '`';
    } else if (char === '/' && REGEX_PRECEDERS.has(previous)) {
      let cursor = index + 1;
      let inClass = false;
      while (cursor < length && source[cursor] !== '\n') {
        const c = source[cursor];
        if (c === '\\') {
          cursor += 2;
          continue;
        }
        if (c === '[') inClass = true;
        else if (c === ']') inClass = false;
        else if (c === '/' && !inClass) break;
        cursor += 1;
      }
      const stop = Math.min(cursor + 1, length);
      out += ' '.repeat(stop - index);
      index = stop;
      previous = 'x';
    } else {
      out += char;
      if (!/\s/.test(char)) previous = char;
      index += 1;
    }
  }
  return { code: out, literals };
}

export function extractPythonImports(text) {
  const imports = [];
  let typeIndent = null;
  for (const raw of stripPythonNoise(text).split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '');
    if (line.trim() === '') continue;
    const indent = line.length - line.trimStart().length;
    if (typeIndent !== null && indent <= typeIndent) typeIndent = null;
    if (/^\s*if\s+(?:typing\.)?TYPE_CHECKING\s*:/.test(line)) {
      typeIndent = indent;
      continue;
    }
    const typeOnly = typeIndent !== null;
    const plain = /^\s*import\s+(.+)$/.exec(line);
    if (plain) {
      for (const part of plain[1].split(',')) {
        const module = /^\s*([\w.]+)/.exec(part);
        if (module) imports.push({ module: module[1], typeOnly });
      }
      continue;
    }
    const from = /^\s*from\s+(\.*)([\w.]*)\s+import\b/.exec(line);
    if (from && from[1] === '' && from[2] !== '') imports.push({ module: from[2], typeOnly });
  }
  return imports;
}

const SPEC = String.raw`["']\u0001(\d+)\u0001["']`;
const MAX_STATEMENT = 3000;
// Each statement is matched inside its own bounded slice, which ends at the next keyword, so the total work stays linear.
const IMPORT_RULES = [
  {
    keyword: /\bimport(?![\w$])/g,
    skip: /^\s+type\s+(?!from\b)/,
    tails: [new RegExp(String.raw`^\s*\(\s*${SPEC}\s*\)`), new RegExp(String.raw`^\s*(?:[\w$*\s,{}]*?\sfrom\s*)?${SPEC}`)]
  },
  {
    keyword: /\bexport(?![\w$])/g,
    skip: /^\s+type\s/,
    tails: [new RegExp(String.raw`^\s+(?:\*(?:\s*as\s*[\w$]+)?|\{[^}]*\})\s*from\s*${SPEC}`)]
  },
  { keyword: /\brequire(?![\w$])/g, skip: null, tails: [new RegExp(String.raw`^\s*\(\s*${SPEC}\s*\)`)] }
];

export function extractJsImports(text) {
  const { code, literals } = tokenizeJs(text);
  const specifiers = [];
  for (const { keyword, skip, tails } of IMPORT_RULES) {
    const hits = [...code.matchAll(keyword)].map((match) => ({ start: match.index + match[0].length, at: match.index }));
    hits.forEach((hit, i) => {
      const segment = code.slice(hit.start, Math.min(hit.start + MAX_STATEMENT, hits[i + 1]?.at ?? code.length));
      if (skip?.test(segment)) return;
      for (const tail of tails) {
        const match = tail.exec(segment);
        const literal = match ? literals[Number(match[1])] : null;
        if (typeof literal === 'string') {
          specifiers.push(literal);
          break;
        }
      }
    });
  }
  return specifiers;
}

export function nodePackageName(specifier) {
  if (specifier.startsWith('.') || specifier.startsWith('/') || specifier.startsWith('node:')) return null;
  if (specifier.startsWith('@/') || specifier.startsWith('~/')) return null;
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

// Linear replacement for /\s+#.*$/, which backtracks quadratically on long whitespace runs.
function stripTrailingComment(line) {
  for (let i = line.indexOf('#'); i > 0; i = line.indexOf('#', i + 1)) {
    if (/\s/.test(line[i - 1])) return line.slice(0, i).trimEnd();
  }
  return line;
}

function parseRequirementName(line) {
  const text = stripTrailingComment(line).split(';')[0].trim();
  if (text === '' || text.startsWith('-') || text.startsWith('#')) return null;
  const egg = /#egg=([\w.-]+)/.exec(line);
  if (egg) return egg[1];
  if (/^(git\+|https?:|\.|\/)/.test(text)) return null;
  const match = /^([A-Za-z0-9][A-Za-z0-9._-]*)/.exec(text);
  return match ? match[1] : null;
}

function parsePyprojectNames(text) {
  const names = [];
  let section = '';
  let collecting = false;
  for (const raw of text.split('\n')) {
    const line = stripTrailingComment(raw);
    const header = /^\s*\[([^\]]+)\]\s*$/.exec(line);
    if (header) {
      section = header[1].trim();
      collecting = false;
      continue;
    }
    const inProject = section === 'project' || section === 'project.optional-dependencies' || section === 'dependency-groups';
    if (inProject) {
      if (!collecting && /^\s*(dependencies|[\w.-]+)\s*=\s*\[/.test(line) && (section !== 'project' || /^\s*dependencies\s*=/.test(line))) {
        collecting = true;
      }
      if (collecting) {
        for (const quoted of line.matchAll(/["']([^"']+)["']/g)) {
          const name = parseRequirementName(quoted[1]);
          if (name) names.push(name);
        }
        if (line.includes(']')) collecting = false;
      }
    } else if (section.startsWith('tool.poetry') && section.includes('dependencies')) {
      const entry = /^\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*=/.exec(line);
      if (entry && entry[1].toLowerCase() !== 'python') names.push(entry[1]);
    }
  }
  return names;
}

function joinContinuations(text) {
  return text.replace(/\\\r?\n/g, ' ');
}

function parseDockerfile(text, devFile) {
  const images = [];
  const commands = [];
  for (const line of joinContinuations(text).split('\n')) {
    const from = /^\s*FROM\s+(?:--platform=\S+\s+)?(\S+)/i.exec(line);
    if (from && from[1].toLowerCase() !== 'scratch') images.push(from[1].split(':')[0].split('@')[0]);
    const command = /^\s*(CMD|ENTRYPOINT|RUN)\s+(.+)$/i.exec(line);
    if (command) commands.push({ text: command[2], class: devFile || command[1].toUpperCase() === 'RUN' ? 'dev-tooling' : 'app' });
  }
  return { images, commands };
}

function indentOf(line) {
  return line.length - line.trimStart().length;
}

function parseCompose(text) {
  const services = [];
  const lines = text.split('\n');
  let inServices = false;
  let serviceIndent = null;
  let current = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = stripTrailingComment(lines[i]);
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    if (/^services\s*:/.test(line)) {
      inServices = true;
      continue;
    }
    if (inServices && indentOf(line) === 0) inServices = false;
    if (!inServices) continue;
    const indent = indentOf(line);
    if (serviceIndent === null) serviceIndent = indent;
    if (indent === serviceIndent) {
      const name = /^\s*([\w.-]+)\s*:/.exec(line);
      current = name ? { name: name[1], image: null, commands: [] } : null;
      if (current) services.push(current);
    } else if (current) {
      const field = /^\s*(image|command|entrypoint)\s*:\s*(.*)$/.exec(line);
      if (!field) continue;
      if (field[1] === 'image') {
        current.image = field[2].replace(/^["']|["']$/g, '').split(':')[0].split('@')[0];
      } else {
        let value = field[2];
        for (let j = i + 1; j < lines.length && /^\s*-\s/.test(lines[j]) && indentOf(lines[j]) > indent; j += 1) value += ` ${lines[j].trim().replace(/^-\s+/, '')}`;
        current.commands.push(value);
      }
    }
  }
  return services;
}

function parseWorkflow(text) {
  const actions = [];
  const commands = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const uses = /^\s*-?\s*uses\s*:\s*([^\s#]+)/.exec(line);
    if (uses && !uses[1].startsWith('./')) actions.push(uses[1].split('@')[0]);
    const run = /^\s*-?\s*run\s*:\s*(.*)$/.exec(line);
    if (run) {
      let value = run[1];
      if (/^[|>][+-]?$/.test(value.trim())) {
        value = '';
        const base = indentOf(line);
        for (let j = i + 1; j < lines.length && (lines[j].trim() === '' || indentOf(lines[j]) > base); j += 1) value += `\n${lines[j].trim()}`;
      }
      commands.push(value);
    }
  }
  return { actions, commands };
}

const COMMAND_WRAPPERS = new Set(['sudo', 'exec', 'env', 'time', 'npx', 'bunx', 'pnpm', 'yarn', 'npm', 'run', 'uv', 'poetry', 'pipx', 'python', 'python3', 'py', 'node', '-m']);

// The program each shell segment starts, after env assignments and launcher words such as "python -m".
export function commandHeads(text) {
  let normalized = text.trim();
  if (normalized.startsWith('[')) normalized = normalized.replace(/[[\]",]/g, ' ');
  const heads = new Set();
  for (const segment of normalized.split(/&&|\|\||;|\||\n/)) {
    const tokens = segment.trim().split(/\s+/).filter(Boolean);
    let i = 0;
    while (i < tokens.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(tokens[i])) i += 1;
    while (i < tokens.length && COMMAND_WRAPPERS.has(tokens[i])) i += 1;
    if (i < tokens.length) heads.add(tokens[i].replace(/^.*[\\/]/, ''));
  }
  return heads;
}

function languageKey(path) {
  const name = basename(path);
  if (/^Dockerfile(\..+)?$/.test(name)) return 'Dockerfile';
  if (name === 'Makefile') return 'Makefile';
  return extname(name).toLowerCase() || name;
}

const ENV_EXAMPLE = /^\.?env(\.[\w-]+)*\.(example|sample|template)$|^[\w.-]+\.env\.(example|sample|template)$/i;

export function sweepCheckout({ checkoutPath, repoId }) {
  const dirty = git(checkoutPath, ['status', '--porcelain', '--untracked-files=no']).trim();
  if (dirty !== '') {
    throw new Error(`The checkout has uncommitted changes to tracked files, so the sweep cannot match its commit. Use a clean worktree of the branch.\n${dirty}`);
  }
  const commit = git(checkoutPath, ['rev-parse', 'HEAD']).trim();
  const branch = git(checkoutPath, ['branch', '--show-current']).trim() || '(detached)';
  const allFiles = git(checkoutPath, ['ls-files', '-z']).split('\0').filter(Boolean).sort();
  const files = allFiles.filter((path) => !SKIPPED_DIRECTORIES.test(path));

  const packages = new Map();
  const envKeys = new Map();
  const infra = new Map();
  const commandSources = [];
  const unparsedFiles = [];

  const addPackage = (ecosystem, rawName, source) => {
    const name = ecosystem === 'python' ? normalizePythonName(rawName) : rawName;
    const key = `${ecosystem}:${name}`;
    if (!packages.has(key)) packages.set(key, { key, ecosystem, name, sources: new Set(), consumers: [], hints: new Set() });
    const record = packages.get(key);
    record.sources.add(source);
    if (ecosystem !== 'python' && (name.startsWith('@types/'))) record.hints.add('type-definitions');
    if (ecosystem === 'python' && name.startsWith('types-')) record.hints.add('type-definitions');
    return record;
  };
  const addConsumer = (record, consumer) => {
    if (!record.consumers.some((c) => c.path === consumer.path && c.class === consumer.class && c.kind === consumer.kind)) {
      record.consumers.push(consumer);
    }
  };
  const addInfra = (kind, path, extra = {}) => {
    const id = `infra:${kind}:${path}`;
    if (!infra.has(id)) infra.set(id, { id, kind, path, ...extra });
  };
  const addEnv = (name, source) => {
    if (!envKeys.has(name)) envKeys.set(name, new Set());
    envKeys.get(name).add(source);
  };

  const census = {};
  const texts = new Map();
  const text = (path) => {
    if (!texts.has(path)) texts.set(path, readText(checkoutPath, path));
    return texts.get(path);
  };

  // Pass 1: manifests, infrastructure, commands, environment-key names.
  for (const path of files) {
    const name = basename(path);
    census[languageKey(path)] = (census[languageKey(path)] ?? 0) + 1;
    if (LOCKFILES.has(name)) continue;

    if (isRequirementsPath(path)) {
      for (const line of text(path).split('\n')) {
        const requirement = parseRequirementName(line);
        if (requirement) addPackage('python', requirement, path);
      }
    } else if (name === 'pyproject.toml') {
      for (const requirement of parsePyprojectNames(text(path))) addPackage('python', requirement, path);
    } else if (name === 'package.json') {
      try {
        const manifest = JSON.parse(text(path));
        for (const section of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
          for (const dep of Object.keys(manifest[section] ?? {})) addPackage('node', dep, path);
        }
        for (const dep of Object.keys(manifest.devDependencies ?? {})) addPackage('node', dep, path);
        for (const [script, command] of Object.entries(manifest.scripts ?? {})) {
          const scriptClass = /^(start|dev|serve|build)$/.test(script) ? 'app' : /test|e2e|spec/.test(script) ? 'test' : 'dev-tooling';
          commandSources.push({ path, heads: commandHeads(String(command)), class: scriptClass });
        }
      } catch {
        // A malformed manifest contributes nothing; the curator sees the gap in the report.
      }
    } else if (isDockerfileName(name)) {
      const devFile = isDevInfraFile(path);
      const dockerfile = parseDockerfile(text(path), devFile);
      for (const image of dockerfile.images) {
        const record = addPackage('image', image, path);
        addConsumer(record, { path, class: devFile ? 'dev-tooling' : 'app', kind: 'container-image' });
      }
      for (const command of dockerfile.commands) commandSources.push({ path, heads: commandHeads(command.text), class: command.class });
    } else if (isComposeName(name)) {
      const composeClass = isDevInfraFile(path) ? 'dev-tooling' : 'app';
      for (const service of parseCompose(text(path))) {
        if (service.image) {
          const record = addPackage('image', service.image, path);
          addConsumer(record, { path, class: composeClass, kind: 'compose-service' });
        }
        for (const command of service.commands) commandSources.push({ path, heads: commandHeads(command), class: composeClass });
      }
    } else if (isWorkflowPath(path)) {
      const workflow = parseWorkflow(text(path));
      addInfra('workflow', path);
      for (const action of workflow.actions) {
        const record = addPackage('workflow-action', action, path);
        addConsumer(record, { path, class: 'config', kind: 'workflow-step' });
      }
      for (const command of workflow.commands) commandSources.push({ path, heads: commandHeads(command), class: 'dev-tooling' });
    }

    if (isNginxPath(path)) addInfra('reverse-proxy', path);
    if (isCollectorPath(path)) addInfra('collector', path);
    if (name === 'manifest.json' && /"manifest_version"/.test(text(path))) addInfra('extension-manifest', path);
    const migration = MIGRATION_PATTERN.exec(path);
    if (migration) {
      const directory = `${migration[1] ?? ''}${migration[2]}`;
      const id = `infra:migration-file:${directory}`;
      const existing = infra.get(id);
      if (existing) existing.count += 1;
      else infra.set(id, { id, kind: 'migration-file', path: directory, count: 1 });
    }
    if (ENV_EXAMPLE.test(name)) {
      for (const line of text(path).split('\n')) {
        const key = /^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=/.exec(line);
        if (key) addEnv(key[1], path);
      }
    }
  }

  // Pass 2: imports, source environment keys, local-module index.
  const pythonFiles = files.filter((path) => PYTHON_EXTENSIONS.has(extname(path)));
  const localModules = new Set();
  for (const path of pythonFiles) {
    const parts = path.split('/');
    const fileName = parts.pop();
    if (fileName !== '__init__.py') localModules.add(`${parts.join('/')}\0${fileName.slice(0, -3)}`);
    for (let i = parts.length; i > 0; i -= 1) localModules.add(`${parts.slice(0, i - 1).join('/')}\0${parts[i - 1]}`);
  }
  const isLocalPython = (top, path) => {
    const parts = path.split('/').slice(0, -1);
    for (let i = parts.length - 1; i >= 0; i -= 1) {
      if (localModules.has(`${parts.slice(0, i).join('/')}\0${top}`)) return true;
    }
    return false;
  };

  const pythonIndex = new Map([...packages.values()].filter((p) => p.ecosystem === 'python').map((p) => [p.name, p]));
  const nodeIndex = new Map([...packages.values()].filter((p) => p.ecosystem === 'node').map((p) => [p.name, p]));
  const aliasKeys = Object.keys(PYTHON_IMPORT_ALIASES).sort((a, b) => b.length - a.length);

  const mapPython = (module) => {
    for (const key of aliasKeys) {
      if (module === key || module.startsWith(`${key}.`)) {
        const aliased = pythonIndex.get(normalizePythonName(PYTHON_IMPORT_ALIASES[key]));
        if (aliased) return aliased;
      }
    }
    const parts = module.split('.');
    for (let k = parts.length; k >= 1; k -= 1) {
      const hit = pythonIndex.get(normalizePythonName(parts.slice(0, k).join('-')));
      if (hit) return hit;
    }
    return null;
  };

  for (const path of files) {
    if (LOCKFILES.has(basename(path))) continue;
    const extension = extname(path);
    const isPython = PYTHON_EXTENSIONS.has(extension);
    const isJs = JS_EXTENSIONS.has(extension);
    if (!isPython && !isJs) continue;
    const content = text(path);
    if (LONG_LINE.test(content)) {
      unparsedFiles.push(path);
      continue;
    }
    const fileClass = classifyFile(path);
    if (isPython) {
      for (const { module, typeOnly } of extractPythonImports(content)) {
        if (typeOnly) continue;
        const top = module.split('.')[0];
        if (isLocalPython(top, path)) continue;
        const record = mapPython(module);
        if (record) addConsumer(record, { path, class: fileClass, kind: 'import' });
      }
      for (const match of content.matchAll(/os\.environ(?:\.get)?\s*[\[(]\s*['"]([A-Z][A-Z0-9_]*)['"]|os\.getenv\s*\(\s*['"]([A-Z][A-Z0-9_]*)['"]/g)) {
        addEnv(match[1] ?? match[2], path);
      }
    } else {
      for (const specifier of extractJsImports(content)) {
        const packageName = nodePackageName(specifier);
        const record = packageName ? nodeIndex.get(packageName) : null;
        if (record) addConsumer(record, { path, class: fileClass, kind: 'import' });
      }
      for (const match of content.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)|process\.env\[\s*['"]([A-Z][A-Z0-9_]*)['"]\s*\]|import\.meta\.env\.([A-Z][A-Z0-9_]*)/g)) {
        addEnv(match[1] ?? match[2] ?? match[3], path);
      }
    }
  }

  // Commands (Dockerfile CMD, compose command, workflow run, package scripts) and migration tooling.
  for (const record of packages.values()) {
    if (record.ecosystem !== 'python' && record.ecosystem !== 'node') continue;
    const names = new Set([record.name, record.name.includes('/') ? record.name.split('/')[1] : record.name]);
    for (const source of commandSources) {
      if ([...names].some((commandName) => source.heads.has(commandName))) {
        addConsumer(record, { path: source.path, class: source.class, kind: 'runtime-command' });
      }
    }
  }
  for (const entry of infra.values()) {
    if (entry.kind === 'migration-file' && entry.path.endsWith('alembic/versions') && pythonIndex.has('alembic')) {
      addConsumer(pythonIndex.get('alembic'), { path: entry.path, class: 'app', kind: 'migration-file' });
    }
  }

  // String references, only for packages nothing else uses (for example a driver named in a URL).
  const configFiles = files.filter((path) => {
    const name = basename(path);
    if (LOCKFILES.has(name) || MANIFEST_NAMES.has(name) || /(^|\/)requirements/.test(path)) return false;
    return CONFIG_EXTENSIONS.has(extname(path)) || ENV_EXAMPLE.test(name) || /^Dockerfile/.test(name);
  });
  for (const record of packages.values()) {
    if (record.consumers.length > 0 || (record.ecosystem !== 'python' && record.ecosystem !== 'node')) continue;
    const spellings = new Set([record.name, record.name.replace(/-/g, '_')]);
    for (const spelling of spellings) {
      if (spelling.length < 4) continue;
      const pattern = new RegExp(`(?<![A-Za-z0-9_-])${escapeRegExp(spelling)}(?![A-Za-z0-9_-])`);
      for (const path of configFiles) {
        if (pattern.test(text(path))) addConsumer(record, { path, class: 'config', kind: 'string-ref' });
      }
    }
  }

  const packageList = [...packages.values()]
    .map((record) => ({
      key: record.key,
      ecosystem: record.ecosystem,
      name: record.name,
      hints: [...record.hints].sort(),
      sources: [...record.sources].sort(),
      consumers: record.consumers.slice().sort((a, b) => `${a.kind}${a.path}${a.class}`.localeCompare(`${b.kind}${b.path}${b.class}`))
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
  const facts = {
    schemaVersion: 1,
    tool: TOOL_VERSION,
    repoId,
    packages: packageList,
    envKeys: [...envKeys.entries()].map(([name, sources]) => ({ name, sources: [...sources].sort() })).sort((a, b) => a.name.localeCompare(b.name)),
    infra: [...infra.values()].sort((a, b) => a.id.localeCompare(b.id)),
    census: Object.fromEntries(Object.entries(census).sort(([a], [b]) => a.localeCompare(b))),
    needsVerification: packageList.filter((record) => record.consumers.length === 0).map((record) => record.key),
    unparsedFiles: unparsedFiles.sort()
  };
  const fingerprint = createHash('sha256').update(stableStringify(facts)).digest('hex');
  return { ...facts, commit, branch, files, fingerprint };
}

export function candidateIds(sweep) {
  return [
    ...sweep.packages.map((record) => `pkg:${record.key}`),
    ...sweep.envKeys.map((record) => `env:${record.name}`),
    ...sweep.infra.map((record) => record.id)
  ].sort();
}

export function consumersFor(sweep, candidateId) {
  if (!candidateId.startsWith('pkg:')) return [];
  const record = sweep.packages.find((item) => `pkg:${item.key}` === candidateId);
  return record ? record.consumers : [];
}

// A candidate counts as execution evidence when it is infrastructure that runs, such as a workflow or migrations.
export function infraConsumers(sweep, candidateId) {
  const record = sweep.infra.find((item) => item.id === candidateId);
  if (!record) return [];
  if (record.kind === 'workflow') return [{ path: record.path, class: 'config', kind: 'workflow-step' }];
  if (record.kind === 'migration-file') return [{ path: record.path, class: 'app', kind: 'migration-file' }];
  return [{ path: record.path, class: 'config', kind: 'config-file' }];
}

export function changedRelevantFiles(paths) {
  return paths.filter((path) => {
    const name = basename(path);
    const extension = extname(path);
    return MANIFEST_NAMES.has(name) || LOCKFILES.has(name) || isRequirementsPath(path)
      || PYTHON_EXTENSIONS.has(extension) || JS_EXTENSIONS.has(extension)
      || isDockerfileName(name) || isComposeName(name) || isWorkflowPath(path)
      || isNginxPath(path) || isCollectorPath(path) || name === 'manifest.json'
      || MIGRATION_PATTERN.test(path) || ENV_EXAMPLE.test(name);
  });
}
