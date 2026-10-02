import fs from 'node:fs';

const DATE_PRECISIONS = new Set(['day', 'month', 'year']);
const LIFECYCLE_STATUSES = new Set(['planned', 'implemented', 'hypothesis', 'deprecated', 'rejected']);
const EVIDENCE_STATUSES = new Set(['verified', 'planned', 'estimated', 'open-question', 'needs-review', 'unverified']);
const PUBLICATION_STATES = new Set(['publish', 'hold', 'internal-only']);
const MANUAL_STATES = new Set(['manual-approval', 'manual-review', 'pending-manual-approval']);

const issue = (code, message, index) => ({ code, message, ...(index === undefined ? {} : { index }) });
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const unsafeLocation = (value) => /(?:[a-z]:[\\/]|(?:^|[\s"'(])\/(?:users|home|var|tmp)(?:\/|$)|\\|(?:^|[\\/])\.?(?:codex|claude|agents)(?:[\\/]|$)|(?:^|\s)~[\\/]|raw[- ]chat)/i.test(String(value ?? ''));
const validSourceAnchor = (value) => typeof value === 'string' && /^[a-z0-9][a-z0-9._/-]*#L\d+$/i.test(value) && !unsafeLocation(value) && !value.includes('..');

function validDate(value, precision) {
  if (typeof value !== 'string') return false;
  const pattern = precision === 'day' ? /^\d{4}-\d{2}-\d{2}$/ : precision === 'month' ? /^\d{4}-\d{2}$/ : /^\d{4}$/;
  if (!pattern.test(value)) return false;
  const [year, month = '01', day = '01'] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function decisionFingerprint(record) {
  return ['primary_project', 'decision_type', 'title', 'decision'].map((key) => normalize(record[key])).join('|');
}

export function validateInventory(inventory) {
  const errors = [];
  const taxonomy = inventory?.project_taxonomy;
  if (!Array.isArray(taxonomy) || taxonomy.length === 0) errors.push(issue('invalid-taxonomy', 'project_taxonomy must be a non-empty array'));
  const allowedProjects = new Set(Array.isArray(taxonomy) ? taxonomy : []);
  if (!Array.isArray(inventory?.records)) return { errors: [...errors, issue('invalid-records', 'records must be an array')] };
  const ids = new Map(); const fingerprints = new Map();
  inventory.records.forEach((record, index) => {
    if (!record || typeof record !== 'object') { errors.push(issue('invalid-record', 'record must be an object', index)); return; }
    if (!text(record.id)) errors.push(issue('missing-id', 'record id is required', index));
    else if (ids.has(record.id)) errors.push(issue('duplicate-id', `duplicate id: ${record.id}`, index)); else ids.set(record.id, index);
    if (!DATE_PRECISIONS.has(record.date_precision)) errors.push(issue('invalid-date-precision', 'unsupported date precision', index));
    else if (!validDate(record.decision_date, record.date_precision)) errors.push(issue('invalid-decision-date', 'invalid decision date', index));
    if (!text(record.primary_project) || !allowedProjects.has(record.primary_project)) errors.push(issue('invalid-primary-project', 'primary project is absent or outside taxonomy', index));
    if (!EVIDENCE_STATUSES.has(record.evidence_status)) errors.push(issue('invalid-evidence-status', 'invalid evidence status', index));
    if (!LIFECYCLE_STATUSES.has(record.lifecycle_status)) errors.push(issue('invalid-lifecycle-status', 'invalid lifecycle status', index));
    if (!Array.isArray(record.capability_tags) || record.capability_tags.length < 3 || record.capability_tags.length > 7 || record.capability_tags.some((tag) => !text(tag))) errors.push(issue('invalid-capability-tags', 'capability_tags must contain 3-7 non-empty strings', index));
    else if (new Set(record.capability_tags.map(normalize)).size !== record.capability_tags.length) errors.push(issue('duplicate-capability-tag', 'capability tags must be unique', index));
    if (!Array.isArray(record.evidence_refs) || record.evidence_refs.length === 0 || record.evidence_refs.some((ref) => !text(ref))) errors.push(issue('missing-evidence-refs', 'evidence_refs must be non-empty', index));
    else if (record.evidence_refs.some(unsafeLocation)) errors.push(issue('unsafe-evidence-ref', 'evidence references cannot include local, runtime, or raw-chat paths', index));
    if (record.source_anchor !== undefined && !validSourceAnchor(record.source_anchor)) errors.push(issue('unsafe-source-anchor', 'source_anchor must be a safe repository-relative line anchor', index));
    if (!text(record.public_eligibility)) errors.push(issue('missing-public-eligibility', 'public eligibility is required', index));
    const state = record.publication_state ?? record.public_eligibility;
    if (MANUAL_STATES.has(normalize(state))) errors.push(issue('manual-approval', 'manual approval states are not supported', index));
    if (record.publication_state !== undefined && !PUBLICATION_STATES.has(record.publication_state) && !MANUAL_STATES.has(normalize(record.publication_state))) errors.push(issue('invalid-publication-state', 'invalid publication state', index));
    if (record.publication_state === 'hold' && (!text(record.failed_gate) || !text(record.automatic_retry_condition) || !text(record.gate_version) || !Number.isInteger(record.attempt_count) || record.attempt_count < 0)) errors.push(issue('invalid-hold-record', 'hold records need gate, retry, gate version, and non-negative attempt count', index));
    const fingerprint = record.fingerprint || decisionFingerprint(record);
    if (fingerprints.has(fingerprint)) errors.push(issue('duplicate-fingerprint', `duplicate decision fingerprint: ${fingerprint}`, index)); else fingerprints.set(fingerprint, index);
  });
  return { errors };
}

if (process.argv[1] && process.argv[1].endsWith('validate-historical-decision-inventory.mjs')) {
  const path = process.argv[2];
  if (!path) { console.error('Usage: node scripts/validate-historical-decision-inventory.mjs <inventory-path>'); process.exitCode = 2; }
  else {
    try {
      const result = validateInventory(JSON.parse(fs.readFileSync(path, 'utf8')));
      if (result.errors.length) { console.error(JSON.stringify(result.errors, null, 2)); process.exitCode = 1; }
      else console.log(`Valid historical decision inventory: ${path}`);
    } catch (error) { console.error(error.message); process.exitCode = 2; }
  }
}
