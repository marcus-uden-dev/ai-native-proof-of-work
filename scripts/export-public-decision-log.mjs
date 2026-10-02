import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { validateInventory } from './validate-historical-decision-inventory.mjs';

const unsafe = (value) => /(?:[a-z]:[\\/]|(?:^|[\s"'(])\/(?:users|home|var|tmp)(?:\/|$)|\\|(?:^|[\\/])\.(?:codex|claude|agents)(?:[\\/]|$)|raw[- ]chat|(?:password|secret|token|api[_ -]?key)\s*[:=]|@(?:[a-z0-9-]+\.)+[a-z]{2,})/i.test(String(value ?? ''));
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const digest = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');

function publicProject(project) {
  return ({ 'personal-ai-harness': 'Personal AI Harness', 'job-agent': 'Job-agent', pkm: 'PKM', 'household-budget': 'Household budget app' })[project] ?? null;
}

export function exportPublicDecisionLog(inventory) {
  const validation = validateInventory(inventory);
  if (validation.errors.length) throw new Error(`Invalid inventory: ${JSON.stringify(validation.errors)}`);
  const rejected = [];
  const records = [];
  for (const record of inventory?.records ?? []) {
    if (record.publication_state !== 'publish') continue;
    const project = publicProject(record.primary_project);
    const fields = [record.id, record.decision_date, record.title, record.context, record.decision, record.tradeoff, ...(record.capability_tags ?? [])];
    if (!project || fields.some((field) => !text(field)) || fields.some(unsafe)) {
      rejected.push({ id: record.id ?? null, reason: !project ? 'internal-or-unknown-project' : 'unsafe-or-incomplete-public-field' });
      continue;
    }
    records.push({
      id: record.id,
      date: record.decision_date,
      project,
      decision_type: record.decision_type,
      lifecycle_status: record.lifecycle_status,
      evidence_status: record.evidence_status,
      title: record.title,
      context: record.context,
      decision: record.decision,
      tradeoff: record.tradeoff,
      tags: record.capability_tags
    });
  }
  if (rejected.length) throw new Error(`Public export rejected ${rejected.length} record(s): ${JSON.stringify(rejected)}`);
  return { records, manifest: { artifact: 'decision-log.json', record_count: records.length, approved_ids: records.map((record) => record.id), sha256: digest(records) } };
}

if (process.argv[1]?.endsWith('export-public-decision-log.mjs')) {
  const [inventoryPath, outputDirectory] = process.argv.slice(2);
  if (!inventoryPath || !outputDirectory) { console.error('Usage: node scripts/export-public-decision-log.mjs <inventory-path> <output-directory>'); process.exitCode = 2; }
  else {
    try {
      const result = exportPublicDecisionLog(JSON.parse(fs.readFileSync(inventoryPath, 'utf8')));
      fs.mkdirSync(outputDirectory, { recursive: true });
      fs.writeFileSync(path.join(outputDirectory, 'decision-log.json'), `${JSON.stringify(result.records, null, 2)}\n`);
      fs.writeFileSync(path.join(outputDirectory, 'decision-log-manifest.json'), `${JSON.stringify(result.manifest, null, 2)}\n`);
      console.log(`Exported ${result.manifest.record_count} public decision records with SHA-256 ${result.manifest.sha256}`);
    } catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
