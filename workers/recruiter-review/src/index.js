import { experienceFitCatalogue } from './catalog.js';
import { createGroqProvider } from './provider.js';
import { composeSystemInstructions, composeUserInput } from './prompt.js';
import { loadRepositoryEvidence } from './repository-index.js';
import { schemaForMode } from './schema.js';
import { validateRequest, validateReview } from './validation.js';

const timeoutMs = 12000;

export function createRecruiterReviewWorker(options = {}) {
  const catalogue = options.catalogue ?? experienceFitCatalogue;
  const provider = options.provider ?? createGroqProvider();
  const catalogueLoader = options.catalogueLoader ?? (options.catalogue ? ({ fallbackCatalogue }) => fallbackCatalogue : loadRepositoryEvidence);
  return {
    async fetch(request, env) {
      const origin = request.headers.get('origin');
      const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);
      if (origin && !cors) return json({ error: 'Origin is not allowed.' }, 403);
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors ?? {} });
      if (request.method !== 'POST' || new URL(request.url).pathname !== '/api/recruiter-review') return json({ error: 'Not found.' }, 404, cors);
      if (!env.GROQ_API_KEY) return json({ error: 'The review service is not configured yet. Use the copyable prompt instead.' }, 503, cors);

      const allowed = await env.RECRUITER_REVIEW_RATE_LIMITER?.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
      if (!allowed?.success) return json({ error: 'Too many review requests. Try again shortly.' }, 429, cors);

      let payload;
      try { payload = await request.json(); } catch { return json({ error: 'Request body must be valid JSON.' }, 400, cors); }
      const parsed = validateRequest(payload);
      if (!parsed.ok) return json({ error: parsed.message }, parsed.status, cors);

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const reviewCatalogue = await catalogueLoader({
          input: parsed.value.input,
          fallbackCatalogue: catalogue,
          abortSignal: controller.signal
        });
        const review = await provider.generateStructuredReview({
          apiKey: env.GROQ_API_KEY,
          model: env.GROQ_MODEL || 'openai/gpt-oss-20b',
          mode: parsed.value.mode,
          systemInstructions: composeSystemInstructions({ mode: parsed.value.mode, catalogue: reviewCatalogue }),
          userInput: composeUserInput(parsed.value.input),
          schema: schemaForMode(parsed.value.mode),
          abortSignal: controller.signal
        });
        const validated = validateReview(review, parsed.value.mode, reviewCatalogue);
        if (!validated.ok) {
          console.warn('Recruiter review validation failure', { mode: parsed.value.mode, reason: validated.reason });
          return json({ error: 'The review could not be validated against public evidence. Use the copyable prompt instead.' }, 502, cors);
        }
        return json({ ...validated.value, evidenceSources: citedEvidenceSources(validated.value, reviewCatalogue) }, 200, cors);
      } catch (error) {
        console.error('Recruiter review provider failure', {
          status: Number.isInteger(error?.status) ? error.status : null,
          category: providerErrorCategory(error?.detail)
        });
        return json({ error: 'The review service is temporarily unavailable. Use the copyable prompt instead.' }, 503, cors);
      } finally {
        clearTimeout(timer);
      }
    }
  };
}

function providerErrorCategory(detail) {
  const message = typeof detail === 'string' ? detail.toLowerCase() : '';
  if (message.includes('json schema')) return 'json-schema';
  if (message.includes('context') || message.includes('token')) return 'context-or-token-limit';
  if (message.includes('model')) return 'model';
  if (message.includes('rate limit')) return 'rate-limit';
  return message ? 'other-provider-error' : 'no-provider-detail';
}

function citedEvidenceSources(review, catalogue) {
  const ids = review.kind === 'role'
    ? [...review.assessment.dimensions.flatMap(({ evidenceIds }) => evidenceIds), ...review.assessment.roleCoverage.flatMap(({ evidenceIds }) => evidenceIds)]
    : [...review.answer.sources, ...review.answer.findings.flatMap(({ evidenceIds }) => evidenceIds)];
  const sourceById = new Map(catalogue.map((source) => [source.id, source]));
  return [...new Set(ids)].flatMap((id) => {
    const source = sourceById.get(id);
    return source ? [{ id: source.id, label: source.label, sourceClass: source.sourceClass, url: source.url }] : [];
  });
}

function corsHeaders(origin, allowedOrigins = '') {
  if (!origin) return {};
  const allowed = allowedOrigins.split(',').map((item) => item.trim()).filter(Boolean);
  if (!allowed.includes(origin)) return null;
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    vary: 'Origin'
  };
}

function json(payload, status, headers = {}) {
  return new Response(JSON.stringify(payload), { status, headers: { ...headers, 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
}

export default createRecruiterReviewWorker();
