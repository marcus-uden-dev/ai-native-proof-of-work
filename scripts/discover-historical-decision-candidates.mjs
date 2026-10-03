import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSourceRegistry } from './validate-historical-decision-source-registry.mjs';

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const isTemplate = (value) => /^(decision title|title|template)$/i.test(value.trim()) || /^\[.+\]$/.test(value.trim()) || /\b(addendum|status)\b/i.test(value) || /\?[”"]?$/.test(value.trim());
const datedHeading = /^(#{2,4})\s+(\d{4}-\d{2}-\d{2})\s+[—-]\s+(.+?)\s*$/;
const undatedDecisionHeading = /^(#{2,4})\s+decision\s+[—-]\s+(.+?)\s*$/i;
const keyDecision = /^\s*(?:[-*]\s+)?\*\*(?:KTD\d*(?:\s*[—-]\s*|\.\s*)|Decision\d*(?:\s+[—-]\s*|\.\s*))(.+?)\*\*(?:\s+.*)?$/i;
const decisionTableRow = /^\|\s*Decision\s*\|\s*(.+?)\s*\|\s*$/i;
const rationaleHeading = /^#{2,4}\s+varför\s+(.+?)\s*$/i;
const sessionDecisionHeading = /^#{2,4}\s+(.+?)\s*$/;
const architectureWhyHeading = /^#{2,4}\s+why\s+(.+?)\s*$/i;
const numberedArchitecturePrinciple = /^#{3,4}\s+\d+\.\s+(.+?)\s*$/;
const recommendedAlternativeHeading = /^#{3,4}\s+(?:recommended|alternative\s+[a-z]+):\s+(.+?)\s*$/i;

function isIsoDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 72) || 'untitled';
}

function projectForPath(source, sourcePath) {
  const normalizedPath = sourcePath.toLowerCase();
  if (normalizedPath.includes('job-agent')) return 'job-agent';
  if (normalizedPath.includes('household-budget')) return 'household-budget';
  if (normalizedPath.includes('/pkm')) return 'pkm';
  if (normalizedPath.includes('phone-layout')) return 'phone-layout-agent';
  return source.owner_project;
}

function draft({ source, sourcePath, date, title, line, state = 'draft', failedGate, retryCondition }) {
  const decision = title;
  const fingerprintInputs = {
    primary_project: projectForPath(source, sourcePath),
    decision_type: 'unclassified',
    title: normalize(title),
    decision: normalize(decision)
  };
  const fingerprint = Object.values(fingerprintInputs).join('|');
  return {
    draft_only: true,
    id: `draft-${source.id}-${date ?? 'undated'}-${slug(title)}`,
    registry_source_id: source.id,
    source_anchor: `${source.source_root ? `${source.source_root}:` : ''}${sourcePath}#L${line}`,
    decision_date: date,
    date_precision: date ? 'day' : null,
    primary_project: projectForPath(source, sourcePath),
    title,
    decision,
    fingerprint_inputs: fingerprintInputs,
    collision_group: hash(fingerprint).slice(0, 16),
    confidence: date ? 'explicit-dated-heading' : 'date-missing',
    review_state: state,
    ...(failedGate ? { failed_gate: failedGate, automatic_retry_condition: retryCondition } : {})
  };
}

export function discoverCandidates(registry, rootDirectory, sourceRoots = {}, sourceIds = null) {
  const validation = validateSourceRegistry(registry);
  if (validation.errors.length) throw new Error(`Invalid source registry: ${JSON.stringify(validation.errors)}`);
  const candidates = [];
  const sourceResults = [];
  for (const source of registry.sources) {
    if (sourceIds && !sourceIds.has(source.id)) continue;
    if (source.accessibility !== 'available') {
      sourceResults.push({ source_id: source.id, scan_state: source.scan_state, candidate_count: 0 });
      continue;
    }
    if (source.scan_state === 'scanned' && source.last_scanned_revision === source.source_revision) {
      sourceResults.push({ source_id: source.id, scan_state: 'scanned', candidate_count: 0, skipped: 'unchanged' });
      continue;
    }
    const sourceRoot = source.source_root ? sourceRoots[source.source_root] : rootDirectory;
    if (!sourceRoot) throw new Error(`No local source root was supplied for: ${source.source_root}`);
    const resolvedRoot = path.resolve(sourceRoot);
    const absolutePath = path.resolve(resolvedRoot, source.source_path);
    if (!absolutePath.startsWith(resolvedRoot + path.sep) && absolutePath !== resolvedRoot) throw new Error(`Source escapes repository root: ${source.id}`);
    if (!fs.existsSync(absolutePath)) throw new Error(`Registered source is missing: ${source.source_path}`);
    const files = fs.statSync(absolutePath).isDirectory()
      ? fs.readdirSync(absolutePath, { recursive: true }).filter((entry) => entry.endsWith('.md')).map((entry) => path.join(absolutePath, entry))
      : [absolutePath];
    let sourceCount = 0;
    for (const file of files) {
      const sourcePath = path.relative(resolvedRoot, file).replaceAll('\\', '/');
      const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
      lines.forEach((line, offset) => {
        const dated = line.match(datedHeading);
        if (dated && isIsoDay(dated[2]) && !isTemplate(dated[3])) {
          candidates.push(draft({ source, sourcePath, date: dated[2], title: dated[3].trim(), line: offset + 1 }));
          sourceCount += 1;
          return;
        }
        const undated = line.match(undatedDecisionHeading);
        if (undated && !isTemplate(undated[2])) {
          candidates.push(draft({ source, sourcePath, date: null, title: undated[2].trim(), line: offset + 1, state: 'hold', failedGate: 'supported_date', retryCondition: 'A source with an explicit ISO decision date is registered.' }));
          sourceCount += 1;
          return;
        }
        if (source.source_class === 'decision-statement-corpus') {
          const keyTechnicalDecision = line.match(keyDecision);
          const tableDecision = line.match(decisionTableRow);
          const title = keyTechnicalDecision?.[1] ?? tableDecision?.[1];
          const tableHeader = Boolean(tableDecision && /^\|\s*:?-{3,}/.test(lines[offset + 1] ?? ''));
          if (title && !tableHeader && !isTemplate(title)) {
            candidates.push(draft({ source, sourcePath, date: null, title: title.trim(), line: offset + 1, state: 'hold', failedGate: 'supported_date', retryCondition: 'A source with an explicit ISO decision date is registered.' }));
            sourceCount += 1;
          }
        }
        if (source.source_class === 'session-decision-notes') {
          const rationale = line.match(rationaleHeading);
          const heading = line.match(sessionDecisionHeading);
          const title = rationale?.[1] ?? heading?.[1];
          if (title && !isTemplate(title)) {
            candidates.push(draft({ source, sourcePath, date: null, title: title.trim(), line: offset + 1, state: 'hold', failedGate: 'supported_date', retryCondition: 'A dated source or independently verifiable evidence is registered.' }));
            sourceCount += 1;
          }
        }
        if (source.source_class === 'architecture-decision-outline') {
          const title = line.match(architectureWhyHeading)?.[1]
            ?? line.match(numberedArchitecturePrinciple)?.[1]
            ?? line.match(recommendedAlternativeHeading)?.[1];
          if (title && !isTemplate(title)) {
            candidates.push(draft({ source, sourcePath, date: null, title: title.trim(), line: offset + 1, state: 'hold', failedGate: 'supported_date', retryCondition: 'A dated source or independently verifiable evidence is registered.' }));
            sourceCount += 1;
          }
        }
      });
    }
    sourceResults.push({ source_id: source.id, scan_state: 'scanned', candidate_count: sourceCount });
  }
  return { register_revision: registry.register_revision, candidates, source_results: sourceResults };
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const registryPath = process.argv[2];
  const rootIndex = process.argv.indexOf('--root');
  const outputIndex = process.argv.indexOf('--out');
  const rootDirectory = rootIndex >= 0 ? process.argv[rootIndex + 1] : process.cwd();
  const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
  if (!registryPath || !rootDirectory || (outputIndex >= 0 && !outputPath)) { console.error('Usage: node scripts/discover-historical-decision-candidates.mjs <registry-path> [--root <repository-root>] [--out <draft-json-path>]'); process.exitCode = 2; }
  else {
    try {
      const sourceRoots = {};
      const sourceIds = new Set();
      for (let index = 0; index < process.argv.length; index += 1) {
        if (process.argv[index] !== '--source-root') continue;
        const [id, localPath] = (process.argv[index + 1] ?? '').split('=', 2);
        if (!id || !localPath) throw new Error('Each --source-root value must be <source-root-id>=<local-path>.');
        sourceRoots[id] = localPath;
      }
      for (let index = 0; index < process.argv.length; index += 1) if (process.argv[index] === '--source') sourceIds.add(process.argv[index + 1]);
      const result = discoverCandidates(JSON.parse(fs.readFileSync(registryPath, 'utf8')), rootDirectory, sourceRoots, sourceIds.size ? sourceIds : null);
      const serialized = `${JSON.stringify(result, null, 2)}\n`;
      if (outputPath) fs.writeFileSync(outputPath, serialized);
      else console.log(serialized);
    }
    catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
