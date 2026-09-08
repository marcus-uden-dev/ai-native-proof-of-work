const canonicalIndexUrl = 'https://raw.githubusercontent.com/marcus-uden-dev/ai-native-proof-of-work/main/site/evidence/repository-evidence-index.json';
const maxDynamicRecords = 10;
const ignoredTerms = new Set(['about', 'against', 'also', 'and', 'are', 'ask', 'but', 'can', 'for', 'from', 'has', 'how', 'into', 'job', 'marcus', 'not', 'role', 'that', 'the', 'this', 'what', 'with', 'work']);

export async function loadRepositoryEvidence({ input, fallbackCatalogue, fetchImpl = fetch, abortSignal }) {
  try {
    const response = await fetchImpl(canonicalIndexUrl, {
      headers: { accept: 'application/json' },
      signal: abortSignal,
      cf: { cacheEverything: true, cacheTtl: 600 }
    });
    if (!response.ok) return fallbackCatalogue;
    const document = await response.json();
    const records = Array.isArray(document?.records) ? document.records.filter(isEvidenceRecord) : [];
    const selected = selectRepositoryEvidence(records, input);
    return selected.length > 0 ? mergeEvidence(selected, fallbackCatalogue) : fallbackCatalogue;
  } catch (error) {
    if (abortSignal?.aborted) throw error;
    return fallbackCatalogue;
  }
}

export function selectRepositoryEvidence(records, input) {
  const terms = tokenize(input);
  if (terms.length === 0) return [];
  return records
    .map((record) => ({ record, score: scoreRecord(record, terms) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.record.path.localeCompare(right.record.path) || left.record.id.localeCompare(right.record.id))
    .slice(0, maxDynamicRecords)
    .map(({ record }) => record);
}

function mergeEvidence(selected, fallbackCatalogue) {
  const merged = [...selected, ...fallbackCatalogue];
  const seen = new Set();
  return merged.filter((record) => {
    if (seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

function scoreRecord(record, terms) {
  const haystack = `${record.path} ${record.label} ${record.excerpt}`.toLowerCase();
  const sourceWeight = record.path.startsWith('site/evidence/') || record.path.startsWith('site/cv/') || record.path.startsWith('site/proof/') || record.path.startsWith('case-studies/') || record.path.startsWith('strategy/') ? 3 : 1;
  return terms.reduce((score, term) => score + (countOccurrences(haystack, term) * sourceWeight), 0);
}

function countOccurrences(text, term) {
  let count = 0;
  let position = text.indexOf(term);
  while (position !== -1) {
    count += 1;
    position = text.indexOf(term, position + term.length);
  }
  return count;
}

function tokenize(input) {
  return [...new Set(input.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}-]{2,}/gu) ?? [])]
    .filter((term) => !ignoredTerms.has(term));
}

function isEvidenceRecord(record) {
  return record
    && typeof record.id === 'string'
    && record.id.length > 0
    && record.id.length <= 80
    && typeof record.path === 'string'
    && typeof record.label === 'string'
    && typeof record.url === 'string'
    && record.url.startsWith('https://github.com/marcus-uden-dev/ai-native-proof-of-work/blob/main/')
    && typeof record.excerpt === 'string'
    && record.excerpt.length > 0
    && record.excerpt.length <= 1400;
}
