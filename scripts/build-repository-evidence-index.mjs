import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = 'site/evidence/repository-evidence-index.json';
const publicTextExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.txt', '.xml', '.yml']);
const repositoryUrl = 'https://github.com/marcus-uden-dev/ai-native-proof-of-work';
const chunkSize = 1200;
const excludedPrefixes = ['.github/', 'release/', 'scripts/', 'tests/', 'workers/'];

const allowlist = JSON.parse(readFileSync(resolve(repositoryRoot, 'release/allowlist.json'), 'utf8'));
const records = allowlist.allowedFiles
  .filter((path) => path !== outputPath && isRecruiterEvidencePath(path))
  .flatMap((path) => buildRecords(path, readFileSync(resolve(repositoryRoot, path), 'utf8')));
const renderedIndex = `${JSON.stringify({ schemaVersion: 1, repository: repositoryUrl, records }, null, 2)}\n`;

if (process.argv.includes('--check')) {
  const currentIndex = readFileSync(resolve(repositoryRoot, outputPath), 'utf8');
  if (currentIndex !== renderedIndex) {
    console.error('Repository evidence index is stale. Run npm run build:repository-evidence-index.');
    process.exitCode = 1;
  } else {
    console.log(`Repository evidence index is current with ${records.length} public evidence chunks.`);
  }
} else {
  writeFileSync(resolve(repositoryRoot, outputPath), renderedIndex);
  console.log(`Generated ${records.length} public evidence chunks from ${new Set(records.map(({ path }) => path)).size} files.`);
}

function buildRecords(path, source) {
  const text = normalizeText(path, source);
  const chunks = splitIntoChunks(text);
  const digest = createHash('sha256').update(path).digest('hex').slice(0, 16);
  return chunks.map((excerpt, index) => ({
    id: `repo-${digest}-${index + 1}`,
    path,
    label: `${path} · excerpt ${index + 1}`,
    sourceClass: sourceClassFor(path),
    url: `${repositoryUrl}/blob/main/${path}`,
    excerpt
  }));
}

function normalizeText(path, source) {
  const text = extname(path).toLowerCase() === '.html'
    ? source
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&(?:amp|lt|gt|quot|#39);/g, ' ')
    : source;
  return text.replace(/\blive product\b/gi, 'production product').replace(/\s+/g, ' ').trim();
}

function isRecruiterEvidencePath(path) {
  if (!publicTextExtensions.has(extname(path).toLowerCase()) || excludedPrefixes.some((prefix) => path.startsWith(prefix))) return false;
  return path === 'README.md'
    || path === 'PROJECT_PROOF_POINTS.md'
    || path === 'PROJECT_STATUS.md'
    || path.startsWith('case-studies/')
    || path.startsWith('strategy/')
    || path.startsWith('docs/')
    || (path.startsWith('site/') && !path.startsWith('site/assets/'));
}

function splitIntoChunks(text) {
  if (!text) return [];
  const chunks = [];
  let remaining = text;
  while (remaining.length > chunkSize) {
    const boundary = Math.max(remaining.lastIndexOf('. ', chunkSize), remaining.lastIndexOf(' ', chunkSize));
    const end = boundary > chunkSize / 2 ? boundary + 1 : chunkSize;
    chunks.push(remaining.slice(0, end).trim());
    remaining = remaining.slice(end).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

function sourceClassFor(path) {
  if (path.startsWith('site/cv/') || path.startsWith('site/evidence/cv-')) return 'employment';
  if (path.startsWith('site/proof/')) return 'portfolio-proof';
  if (path.startsWith('strategy/') || path.startsWith('case-studies/')) return 'strategy-document';
  if (path.startsWith('site/evidence/')) return 'public-evidence';
  return 'public-repository';
}
