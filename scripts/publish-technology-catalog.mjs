import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARKER } from './build-technology-catalog.mjs';

export const CATALOG_FILE = 'TECHNOLOGY_CAPABILITY_CATALOG.md';

export function publishCatalog(catalogFile, repoPath) {
  if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) throw new Error('Target repo path does not exist.');
  const content = fs.readFileSync(catalogFile, 'utf8');
  if (!content.startsWith(MARKER)) throw new Error('Catalog file lacks the generated-by marker.');
  const target = path.join(repoPath, CATALOG_FILE);
  if (fs.existsSync(target) && !fs.readFileSync(target, 'utf8').startsWith(MARKER)) {
    throw new Error('Refusing to overwrite a hand-written file with the catalog name.');
  }
  fs.writeFileSync(target, content);
  return target;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [catalogFile, repoPath] = process.argv.slice(2);
  if (!catalogFile || !repoPath) {
    console.error('Usage: node scripts/publish-technology-catalog.mjs <catalogFile> <repoPath>');
    process.exit(2);
  }
  try {
    publishCatalog(catalogFile, repoPath);
    console.log(`Wrote ${CATALOG_FILE} into the target tree. No git commands were run.`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
