import fs from 'node:fs';

const projectNames = {
  'job-agent': 'Job-agent',
  'household-budget': 'Household budget',
  'personal-ai-harness': 'Personal AI Harness',
  'phone-layout-agent': 'Phone Layout Agent',
  pkm: 'PKM',
  'pcmr-device-agent': 'PCMR Device Agent'
};

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const label = (value) => value.replaceAll('-', ' ');

function metadataFor(title) {
  const value = normalize(title);
  if (/\b(test|verify|validation|eslint|ruff|quality|characterization)\b/.test(value)) return { type: 'Quality architecture', tags: ['technical-judgment', 'quality-assurance', 'validation'] };
  if (/\b(consent|approval|security|secret|credential|risk|isolation|network-disabled|privacy)\b/.test(value)) return { type: 'Safety architecture', tags: ['technical-judgment', 'risk-controls', 'security-by-design'] };
  if (/\b(api|endpoint|route|adapter|postgresql|database|json|celery|docker|module|component|column|schema|cursor|cli)\b/.test(value)) return { type: 'Application architecture', tags: ['technical-judgment', 'systems-thinking', 'quality-assurance'] };
  if (/\b(ai|llm|prompt|model|agent|context)\b/.test(value)) return { type: 'AI workflow architecture', tags: ['technical-judgment', 'ai-native-workflows', 'human-in-the-loop'] };
  if (/\b(worktree|branch|publish|evidence|trace|record|decision|repository|release|handoff)\b/.test(value)) return { type: 'Evidence workflow architecture', tags: ['decision-traceability', 'workflow-automation', 'risk-controls'] };
  if (/\b(ui|page|modal|panel|button|tab|picker|preview|animation|layout|design)\b/.test(value)) return { type: 'Product interaction architecture', tags: ['product-judgment', 'design-consistency', 'technical-judgment'] };
  if (/\b(budget|account|household|pricing|salary|compensation|billing|trial|cost|metering)\b/.test(value)) return { type: 'Product and domain architecture', tags: ['product-judgment', 'systems-thinking', 'technical-judgment'] };
  return { type: 'Technical decision', tags: ['technical-judgment', 'systems-thinking', 'decision-making'] };
}

function isPublicSafe(candidate) {
  const title = String(candidate.title ?? '').trim();
  return candidate.review_state === 'draft'
    && /^\d{4}-\d{2}-\d{2}$/.test(candidate.decision_date ?? '')
    && projectNames[candidate.primary_project]
    && title.length >= 12
    && title.length <= 180
    && !/^(private source of truth|safe wip link target|dry-run boundary|pending[,.:]?|decision-log placement)[:.]?$/i.test(title)
    && !/\b(?:pending|private source of truth|safe wip link target)\b/i.test(title)
    && !/\.(?:agents|codex|claude)(?:[\\/]|\b)/i.test(title)
    && !/\b(?:gh auth switch|session transcript)\b/i.test(title)
    && !/\b(api key|token|password|secret value)\b/i.test(title);
}

export function preparePublicDecisionBackfill(candidates, existing) {
  const existingKeys = new Set(existing.map((record) => `${record.project}|${record.date}|${normalize(record.title)}`));
  const selected = new Map();
  for (const candidate of candidates) {
    if (!isPublicSafe(candidate)) continue;
    const project = projectNames[candidate.primary_project];
    const key = `${project}|${candidate.decision_date}|${normalize(candidate.title)}`;
    if (existingKeys.has(key) || selected.has(key)) continue;
    const metadata = metadataFor(candidate.title);
    const status = candidate.confidence === 'dated-filename' ? 'Planned' : 'Verified';
    const decisionTitle = candidate.title.replaceAll('`', '').replace(/[.:]+$/, '');
    selected.set(key, {
      date: candidate.decision_date,
      project,
      status,
      type: metadata.type,
      title: decisionTitle,
      tags: metadata.tags,
      why: status === 'Planned'
        ? `The dated design plan specifies this boundary: ${decisionTitle}.`
        : `The dated decision record specifies this approach: ${decisionTitle}.`,
      demonstrates: `Makes the ${metadata.type.toLowerCase()} explicit through ${label(metadata.tags[0])} and ${label(metadata.tags[1])}.`
    });
  }
  return [...selected.values()].sort((left, right) => right.date.localeCompare(left.date) || left.project.localeCompare(right.project) || left.title.localeCompare(right.title));
}

if (process.argv[1] && process.argv[1].endsWith('prepare-public-decision-backfill.mjs')) {
  const [candidatePaths, existingPath, outputPath] = process.argv.slice(2);
  if (!candidatePaths || !existingPath || !outputPath) throw new Error('Usage: node scripts/prepare-public-decision-backfill.mjs <candidate-json-paths-separated-by-semicolon> <existing-decision-log.json> <output.json>');
  const candidates = candidatePaths.split(';').flatMap((inputPath) => JSON.parse(fs.readFileSync(inputPath, 'utf8')).candidates);
  const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
  fs.writeFileSync(outputPath, `${JSON.stringify(preparePublicDecisionBackfill(candidates, existing), null, 2)}\n`);
}
