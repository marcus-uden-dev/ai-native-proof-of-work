import fs from 'node:fs';
import { validateSourceRegistry } from './validate-historical-decision-source-registry.mjs';

export function checkCoverage(registry) {
  const validation = validateSourceRegistry(registry);
  if (validation.errors.length) throw new Error(`Invalid source registry: ${JSON.stringify(validation.errors)}`);
  const sources = registry.sources.map((source) => ({
    id: source.id,
    state: source.scan_state,
    needs_scan: source.accessibility === 'available' && (source.scan_state !== 'scanned' || source.last_scanned_revision !== source.source_revision),
    unavailable: source.accessibility !== 'available'
  }));
  return { register_revision: registry.register_revision, sources, needs_scan: sources.filter((source) => source.needs_scan).map((source) => source.id), unavailable: sources.filter((source) => source.unavailable).map((source) => source.id) };
}

if (process.argv[1]?.endsWith('check-historical-decision-coverage.mjs')) {
  const registryPath = process.argv[2];
  if (!registryPath) { console.error('Usage: node scripts/check-historical-decision-coverage.mjs <registry-path>'); process.exitCode = 2; }
  else {
    try {
      const result = checkCoverage(JSON.parse(fs.readFileSync(registryPath, 'utf8')));
      console.log(JSON.stringify(result, null, 2));
      if (result.needs_scan.length) process.exitCode = 1;
    } catch (error) { console.error(error.message); process.exitCode = 2; }
  }
}
