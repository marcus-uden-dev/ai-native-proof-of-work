import { candidateIds, consumersFor, infraConsumers, maxStateFor } from './sweep.mjs';

export const STATE_RANK = { configured: 1, 'dev-test-only': 2, implemented: 3, tested: 4 };
export const ALL_STATES = ['tested', 'implemented', 'configured', 'dev-test-only', 'planned', 'historical'];
export const DOMAINS = [
  'languages', 'backend', 'data', 'async', 'ai', 'frontend', 'documents', 'security',
  'observability', 'testing', 'delivery', 'integrations', 'practices'
];
export const KINDS = [
  'language', 'framework', 'library', 'datastore', 'queue', 'observability', 'integration', 'security',
  'document', 'frontend', 'testing', 'delivery', 'cicd', 'protocol', 'practice'
];
export const DISPOSITIONS = ['incidental', 'transitive', 'unused'];

const ID_PATTERN = /^[a-z0-9]+(?:[.-][a-z0-9]+)+$/;
const DOC_EXTENSION = /\.(md|mdx|rst|txt)$/i;

const rank = (state) => (Object.hasOwn(STATE_RANK, state) ? STATE_RANK[state] : 0);

const SECRET_PATTERNS = [
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\b[sp]k_live_[A-Za-z0-9]{10,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bAIza[0-9A-Za-z_-]{30,}\b/,
  /\beyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]+/,
  /\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:[^\s/@]+@/i,
  /hooks\.slack\.com\/services\//,
  /\b(?:localhost|0\.0\.0\.0|127\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
  /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/,
  /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:internal|corp|lan|svc|cluster\.local)\b/i
];

const CLAIM_PATTERNS = [
  /\bin production(?! (?:code|path|paths|config|build|image|environment))/i,
  /\b(?:deployed|running|launched|shipped|released) (?:to|in|on) production\b/i,
  /\b(?:is|are|now|currently|already) live\b/i,
  /\blive (?:demo|product|app|service|system|experience|users)\b/i,
  /\b(?:\d[\d,.]*\+?|many|thousands of|millions of)\s+(?:users|customers|requests)\b/i,
  /\b(?:adopted|adoption|market[- ]validated|battle[- ]tested|proven at scale)\b/i,
  /\b(?:increased|reduced|improved|boosted)\b[^.]*\b\d+\s*%/i
];

export function findSecrets(text) {
  return SECRET_PATTERNS.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);
}

export function findClaims(text) {
  // Fold compatibility characters and collapse whitespace so double spaces or no-break spaces cannot hide a phrase.
  const folded = text.normalize('NFKC').replace(/\s+/g, ' ');
  return CLAIM_PATTERNS.filter((pattern) => pattern.test(folded)).map((pattern) => pattern.source);
}

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
  return new RegExp(`^${escaped}$`);
}

export function matchesFile(files, path) {
  if (!path.includes('*')) return files.includes(path);
  const pattern = globToRegExp(path);
  return files.some((file) => pattern.test(file));
}

function matchesCandidate(pattern, id) {
  return pattern.endsWith('*') ? id.startsWith(pattern.slice(0, -1)) : pattern === id;
}

// A wildcard may only end the pattern, and must keep a package ecosystem, infrastructure kind, or "env:" in front of it.
function disallowedWildcard(pattern) {
  const star = pattern.indexOf('*');
  if (star === -1) return null;
  if (star !== pattern.length - 1) return 'A wildcard may only be the last character.';
  const prefix = pattern.slice(0, -1);
  if (prefix === 'env:') return null;
  if (!/^(?:pkg:[a-z-]+:|infra:[a-z-]+:)[^*]+$/.test(prefix)) {
    return 'A wildcard needs a package ecosystem or infrastructure kind and at least one more character before it.';
  }
  return null;
}

// A language entry without candidates reaches "implemented" only through a source file of that kind, never a README or manifest.
const LANGUAGE_SOURCE = /(\.(py|[cm]?[jt]sx?|sh|ps1|sql|go|rs|java|kt|rb|php|cs|swift|css|scss|html|vue|svelte|c|cc|cpp|h)|(^|\/)(Makefile|Dockerfile[^/]*))$/;

function nonEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

export function validateCatalog(catalog, sweep) {
  const errors = [];
  const add = (code, entry, message) => errors.push({ code, entry, message });
  const list = (value, id, field) => {
    if (value === undefined) return [];
    if (!Array.isArray(value)) {
      add('shape', id, `The ${field} field must be an array.`);
      return [];
    }
    return value;
  };
  if (!catalog || catalog.schemaVersion !== 1 || !Array.isArray(catalog.entries) || !Array.isArray(catalog.capabilities)) {
    return [{ code: 'shape', entry: null, message: 'The catalog needs schemaVersion 1, a capabilities array, and an entries array.' }];
  }
  const dispositions = list(catalog.dispositions, 'dispositions', 'dispositions');
  const known = new Set(candidateIds(sweep));

  const capabilityIds = new Set();
  for (const capability of catalog.capabilities) {
    if (!capability || !ID_PATTERN.test(capability.id ?? '')) {
      add('capability-id', capability?.id ?? null, 'A capability ID must be dotted lowercase, for example data.schema-migrations.');
      continue;
    }
    if (capabilityIds.has(capability.id)) add('duplicate-capability', capability.id, 'The capability ID is duplicated.');
    capabilityIds.add(capability.id);
    if (!nonEmpty(capability.label)) add('capability-label', capability.id, 'The capability needs a label.');
    else {
      if (findSecrets(capability.label).length > 0) add('secret', capability.id, 'A capability label contains a credential-shaped string or an internal host name.');
      if (findClaims(capability.label).length > 0) add('claim', capability.id, `A capability label makes an adoption or outcome claim: "${capability.label.slice(0, 80)}".`);
    }
  }

  const entryIds = new Set();
  const covered = new Set();
  for (const entry of catalog.entries) {
    const id = entry?.id ?? null;
    if (!ID_PATTERN.test(id ?? '')) {
      add('entry-id', id, 'An entry ID must be dotted lowercase, for example data.alembic.');
      continue;
    }
    if (entryIds.has(id)) add('duplicate-entry', id, 'The entry ID is duplicated.');
    entryIds.add(id);
    for (const field of ['name', 'purpose', 'problemSolved', 'architectureRole']) {
      if (!nonEmpty(entry[field])) add('missing-field', id, `The ${field} field is required.`);
    }
    if (!KINDS.includes(entry.kind)) add('kind', id, `The kind must be one of: ${KINDS.join(', ')}.`);
    if (!DOMAINS.includes(entry.domain)) add('domain', id, `The domain must be one of: ${DOMAINS.join(', ')}.`);
    for (const candidate of list(entry.candidates, id, 'candidates')) covered.add(candidate);
    if (!ALL_STATES.includes(entry.evidenceState)) {
      add('state', id, `The evidence state must be one of: ${ALL_STATES.join(', ')}.`);
      continue;
    }
    if (!Array.isArray(entry.technologies)) add('missing-field', id, 'The technologies field must be an array.');
    for (const capabilityId of list(entry.capabilityIds, id, 'capabilityIds')) {
      if (!capabilityIds.has(capabilityId)) add('unknown-capability', id, `Unknown capability ID: ${capabilityId}.`);
    }
    const candidates = list(entry.candidates, id, 'candidates');
    for (const candidate of candidates) {
      if (!known.has(candidate)) add('unknown-candidate', id, `The sweep has no candidate ${candidate}.`);
    }
    const evidence = list(entry.evidence, id, 'evidence');
    if (evidence.length === 0) add('evidence', id, 'At least one evidence location is required.');
    for (const item of evidence) {
      if (!nonEmpty(item?.path) || !nonEmpty(item?.description)) {
        add('evidence', id, 'Each evidence location needs a path and a description.');
      } else if (item.path.startsWith('/') || item.path.includes('..')) {
        add('evidence-path', id, `The evidence path must be repo-relative: ${item.path}.`);
      } else if (!matchesFile(sweep.files, item.path)) {
        add('evidence-path', id, `The evidence path matches no tracked file at the swept commit: ${item.path}.`);
      }
    }
    if (entry.rationale === 'documented') {
      if (list(entry.decisionRefs, id, 'decisionRefs').length === 0) add('rationale', id, 'Documented rationale needs at least one decision reference.');
    } else if (entry.rationale !== 'undocumented') {
      add('rationale', id, 'The rationale must be "documented" or "undocumented".');
    }
    const decisionRefs = list(entry.decisionRefs, id, 'decisionRefs');
    for (const ref of decisionRefs) {
      if (!sweep.files.includes(ref)) add('decision-ref', id, `The decision reference is not a tracked file: ${ref}.`);
    }

    // State gating: the allowed ceiling comes from swept facts, never from the curator's word.
    const override = entry.override;
    if (override && !nonEmpty(override.reason)) add('override-reason', id, 'A state override needs a recorded reason.');
    if (override && rank(override.maxState) === 0) add('override-state', id, 'The override maxState must be configured, dev-test-only, implemented, or tested.');
    if (entry.evidenceState === 'planned' || entry.evidenceState === 'historical') {
      if (!evidence.some((item) => DOC_EXTENSION.test(item?.path ?? ''))) {
        add('state-evidence', id, `A ${entry.evidenceState} entry needs a document as evidence.`);
      }
      if (entry.evidenceState === 'planned' && candidates.some((candidate) => {
        const state = maxStateFor([...consumersFor(sweep, candidate), ...infraConsumers(sweep, candidate)]);
        return state === 'implemented' || state === 'tested';
      })) {
        add('state-claim', id, 'A planned entry has a production consumer in source. Use implemented or tested.');
      }
    } else {
      const consumers = candidates.flatMap((candidate) => [...consumersFor(sweep, candidate), ...infraConsumers(sweep, candidate)]);
      let ceiling = candidates.length === 0 && entry.kind === 'language'
        ? (evidence.some((item) => LANGUAGE_SOURCE.test(item?.path ?? '') && matchesFile(sweep.files, item.path)) ? 'implemented' : 'configured')
        : maxStateFor(consumers);
      if (override && nonEmpty(override.reason) && rank(override.maxState) > 0) ceiling = override.maxState;
      if (rank(entry.evidenceState) > rank(ceiling)) {
        add('state-claim', id, `The entry claims ${entry.evidenceState} but swept evidence allows at most ${ceiling}.`);
      }
    }

    const prose = [entry.name, entry.purpose, entry.problemSolved, entry.architectureRole, override?.reason, ...evidence.map((item) => item?.description),
      ...list(entry.aliases, id, 'aliases'), ...(Array.isArray(entry.technologies) ? entry.technologies : [])]
      .filter((value) => typeof value === 'string');
    for (const text of prose) {
      if (findSecrets(text).length > 0) add('secret', id, 'A curated field contains a credential-shaped string or an internal host name.');
      if (findClaims(text).length > 0) add('claim', id, `A curated field makes an adoption or outcome claim: "${text.slice(0, 80)}".`);
    }
  }

  for (const rule of dispositions) {
    if (!rule || !nonEmpty(rule.match)) {
      add('disposition', null, 'A disposition needs a match.');
      continue;
    }
    const wildcardProblem = disallowedWildcard(rule.match);
    if (wildcardProblem) add('disposition', rule.match, wildcardProblem);
    if (!DISPOSITIONS.includes(rule.disposition)) {
      add('disposition', rule.match, `The disposition must be one of: ${DISPOSITIONS.join(', ')}. needs-verification is not a disposition.`);
    }
    if (!nonEmpty(rule.reason)) add('disposition', rule.match, 'A disposition needs a reason.');
    else if (findSecrets(rule.reason).length > 0) add('secret', rule.match, 'A disposition reason contains a credential-shaped string or an internal host name.');
  }
  const validRules = dispositions.filter((rule) => rule && nonEmpty(rule.match) && DISPOSITIONS.includes(rule.disposition)
    && nonEmpty(rule.reason) && !disallowedWildcard(rule.match));
  for (const rule of validRules.filter((item) => item.disposition === 'unused')) {
    for (const candidate of known) {
      if (!matchesCandidate(rule.match, candidate)) continue;
      const state = maxStateFor([...consumersFor(sweep, candidate), ...infraConsumers(sweep, candidate)]);
      if (rank(state) >= STATE_RANK.implemented) {
        add('disposition', candidate, `The candidate is marked unused but the sweep shows a production consumer (${state}).`);
      }
    }
  }
  const needsVerification = new Set((sweep.needsVerification ?? []).map((key) => `pkg:${key}`));
  for (const candidate of known) {
    if (covered.has(candidate) || validRules.some((rule) => matchesCandidate(rule.match, candidate))) continue;
    add(needsVerification.has(candidate) ? 'needs-verification' : 'uncovered-candidate', candidate,
      needsVerification.has(candidate)
        ? 'The sweep could not resolve this candidate. Catalog it or disposition it with a reason.'
        : 'The candidate is neither cataloged nor dispositioned.');
  }

  for (const rule of dispositions) {
    if (nonEmpty(rule?.match) && ![...known].some((candidate) => matchesCandidate(rule.match, candidate))) {
      add('disposition', rule.match, 'The disposition matches no sweep candidate.');
    }
  }
  return errors;
}

export function formatErrors(errors) {
  return errors.map((error) => `[${error.code}] ${error.entry ?? '-'}: ${error.message}`).join('\n');
}
