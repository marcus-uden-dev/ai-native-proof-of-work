import fs from 'node:fs';

const STATES = new Set(['registered', 'stale', 'changed', 'scanned', 'unavailable', 'blocked']);
const ACCESSIBILITY = new Set(['available', 'unavailable', 'blocked']);
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const issue = (code, message, index) => ({ code, message, ...(index === undefined ? {} : { index }) });

function safeRepositoryPath(value) {
  if (value === '.') return true;
  if (!text(value) || value.includes('\\') || value.startsWith('/') || value.includes(':')) return false;
  const segments = value.split('/');
  return !segments.some((segment) => !segment || segment === '.' || segment === '..' || /^\.(codex|claude|agents)$/i.test(segment));
}

export function validateSourceRegistry(registry) {
  const errors = [];
  if (registry?.schema_version !== 1) errors.push(issue('invalid-schema-version', 'schema_version must be 1'));
  if (!text(registry?.register_revision)) errors.push(issue('missing-register-revision', 'register_revision is required'));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(registry?.scan_cutoff ?? '')) errors.push(issue('invalid-scan-cutoff', 'scan_cutoff must be an ISO day date'));
  if (!registry?.source_classes || typeof registry.source_classes !== 'object' || Array.isArray(registry.source_classes)) errors.push(issue('invalid-source-classes', 'source_classes must be an object'));
  if (!Array.isArray(registry?.sources) || registry.sources.length === 0) return { errors: [...errors, issue('invalid-sources', 'sources must be a non-empty array')] };

  const ids = new Set();
  registry.sources.forEach((source, index) => {
    if (!source || typeof source !== 'object') { errors.push(issue('invalid-source', 'source must be an object', index)); return; }
    if (!text(source.id)) errors.push(issue('missing-source-id', 'source id is required', index));
    else if (ids.has(source.id)) errors.push(issue('duplicate-source-id', `duplicate source id: ${source.id}`, index)); else ids.add(source.id);
    if (!text(source.source_class) || !registry.source_classes?.[source.source_class]) errors.push(issue('invalid-source-class', 'source class must exist in source_classes', index));
    if (!ACCESSIBILITY.has(source.accessibility)) errors.push(issue('invalid-accessibility', 'accessibility is invalid', index));
    if (!STATES.has(source.scan_state)) errors.push(issue('invalid-scan-state', 'scan state is invalid', index));
    if (!text(source.source_revision)) errors.push(issue('missing-source-revision', 'source revision is required', index));
    if (!text(source.owner_project)) errors.push(issue('missing-owner-project', 'owner project is required', index));
    if (!text(source.privacy_class)) errors.push(issue('missing-privacy-class', 'privacy class is required', index));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.scan_cutoff ?? '')) errors.push(issue('invalid-source-scan-cutoff', 'source scan cutoff must be an ISO day date', index));
    if (source.source_path !== null && !safeRepositoryPath(source.source_path)) errors.push(issue('unsafe-source-path', 'source path must be a safe repository-relative path', index));
    if (source.accessibility === 'available' && !safeRepositoryPath(source.source_path)) errors.push(issue('missing-source-path', 'available sources need a safe repository-relative path', index));
    if (source.accessibility !== 'available' && (!text(source.access_requirement) || !text(source.retry_trigger))) errors.push(issue('missing-unavailable-details', 'unavailable or blocked sources need access_requirement and retry_trigger', index));
  });
  return { errors };
}

if (process.argv[1]?.endsWith('validate-historical-decision-source-registry.mjs')) {
  const path = process.argv[2];
  if (!path) { console.error('Usage: node scripts/validate-historical-decision-source-registry.mjs <registry-path>'); process.exitCode = 2; }
  else {
    try {
      const result = validateSourceRegistry(JSON.parse(fs.readFileSync(path, 'utf8')));
      if (result.errors.length) { console.error(JSON.stringify(result.errors, null, 2)); process.exitCode = 1; }
      else console.log(`Valid historical decision source registry: ${path}`);
    } catch (error) { console.error(error.message); process.exitCode = 2; }
  }
}
