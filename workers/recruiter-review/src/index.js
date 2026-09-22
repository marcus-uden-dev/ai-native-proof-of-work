import { experienceFitCatalogue } from './catalog.js';
import { publicProviderFailure, providerErrorCategory, providerCreditsExhausted, shouldTryBackupProvider } from './errors.js';
import { notifyMarcus, purgeExpiredEnquiries, saveEnquiry, updateNotificationStatus, validateEnquiryRequest } from './enquiry.js';
import { createGeminiProvider, createGroqProvider } from './provider.js';
import { composeSystemInstructions, composeUserInput } from './prompt.js';
import { loadRepositoryEvidence } from './repository-index.js';
import { schemaForMode } from './schema.js';
import { validateRequest, validateReview } from './validation.js';

const timeoutMs = 12000;
const defaultGeminiModel = 'gemini-2.5-flash-lite';
const secondaryGeminiModel = 'gemini-2.5-flash';

export function createRecruiterReviewWorker(options = {}) {
  const catalogue = options.catalogue ?? experienceFitCatalogue;
  const provider = options.provider ?? createGroqProvider();
  const backupProvider = options.backupProvider ?? createGeminiProvider();
  const catalogueLoader = options.catalogueLoader ?? (options.catalogue ? ({ fallbackCatalogue }) => fallbackCatalogue : loadRepositoryEvidence);
  return {
    async fetch(request, env) {
      const origin = request.headers.get('origin');
      const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);
      if (origin && !cors) return json({ error: 'Origin is not allowed.' }, 403);
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors ?? {} });
      if (request.method !== 'POST') return json({ error: 'Not found.' }, 404, cors);
      const path = new URL(request.url).pathname;
      if (path === '/api/recruiter-enquiry') return handleEnquiry(request, env, cors);
      if (path !== '/api/recruiter-review') return json({ error: 'Not found.' }, 404, cors);
      if (!env.GROQ_API_KEY && !env.GEMINI_API_KEY) return json({ error: 'The review service is not configured yet. Use the copyable prompt instead.' }, 503, cors);

      const allowed = await env.RECRUITER_REVIEW_RATE_LIMITER?.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
      if (!allowed?.success) return json({ error: 'Too many review requests. Try again shortly.' }, 429, cors);

      let payload;
      try { payload = await request.json(); } catch { return json({ error: 'Request body must be valid JSON.' }, 400, cors); }
      const parsed = validateRequest(payload);
      if (!parsed.ok) return json({ error: parsed.message }, parsed.status, cors);

      try {
        const reviewCatalogue = await catalogueLoader({
          input: parsed.value.input,
          fallbackCatalogue: catalogue
        });
        for (let attempt = 0; attempt < 2; attempt += 1) {
          try {
            const review = await generateWithBackup({
              provider,
              backupProvider,
              env,
              mode: parsed.value.mode,
              catalogue: reviewCatalogue,
              userInput: parsed.value.input,
              validationReason: attempt === 0 ? null : 'The previous response did not meet the required evidence-validation shape. Return complete JSON with only supported evidence IDs.'
            });
            const validated = validateReview(review, parsed.value.mode, reviewCatalogue);
            if (validated.ok) return json({ ...validated.value, evidenceSources: citedEvidenceSources(validated.value, reviewCatalogue) }, 200, cors);
            console.warn('Recruiter review validation failure', { mode: parsed.value.mode, reason: validated.reason, attempt: attempt + 1 });
          } catch (error) {
            if (attempt === 1) throw error;
            console.warn('Recruiter review retryable provider failure', { status: Number.isInteger(error?.status) ? error.status : null, category: providerErrorCategory(error) });
          }
        }
        return json({ code: 'review_validation_failed', error: 'The review could not be validated against public evidence. Use the copyable prompt instead.' }, 502, cors);
      } catch (error) {
        const failure = publicProviderFailure(error);
        console.error('Recruiter review provider failure', {
          status: Number.isInteger(error?.status) ? error.status : null,
          category: providerErrorCategory(error),
          failures: Array.isArray(error?.failures)
            ? error.failures.map((failure) => ({ provider: failure?.provider ?? 'unknown', status: Number.isInteger(failure?.status) ? failure.status : null, message: failure?.message ?? 'unknown failure' }))
            : undefined
        });
        return json(failure, failure.status, cors);
      }
    }
  };
}

async function generateWithBackup({ provider, backupProvider, env, mode, catalogue, userInput, validationReason }) {
  const request = {
    mode,
    systemInstructions: `${composeSystemInstructions({ mode, catalogue })}${validationReason ? `\n\n${validationReason}` : ''}`,
    userInput: composeUserInput(userInput),
    schema: schemaForMode(mode)
  };
  if (!env.GROQ_API_KEY) {
    return generateWithGeminiModelFallback(backupProvider, request, env);
  }
  try {
    return await generateWithTimeout(provider, { ...request, apiKey: env.GROQ_API_KEY, model: env.GROQ_MODEL || 'openai/gpt-oss-20b' });
  } catch (primaryError) {
    if (!env.GEMINI_API_KEY || !shouldTryBackupProvider(primaryError)) throw primaryError;
    try {
      return await generateWithGeminiModelFallback(backupProvider, request, env);
    } catch (backupError) {
      const error = new Error('Primary and backup review providers failed.');
      error.status = backupError?.status ?? primaryError?.status;
      error.failures = [primaryError, backupError];
      error.creditsExhausted = providerCreditsExhausted(primaryError) && providerCreditsExhausted(backupError);
      throw error;
    }
  }
}

async function generateWithGeminiModelFallback(provider, request, env) {
  const models = [...new Set([env.GEMINI_MODEL || defaultGeminiModel, secondaryGeminiModel])];
  let lastError;
  for (const model of models) {
    try {
      return await generateWithTimeout(provider, { ...request, apiKey: env.GEMINI_API_KEY, model });
    } catch (error) {
      lastError = error;
      if (error?.status !== 404) throw error;
    }
  }
  throw lastError;
}

async function generateWithTimeout(provider, request) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await provider.generateStructuredReview({ ...request, abortSignal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function handleEnquiry(request, env, cors) {
  if (!env.RECRUITER_ENQUIRIES) return json({ error: 'Follow-up is not configured yet.' }, 503, cors);
  const allowed = await env.RECRUITER_REVIEW_RATE_LIMITER?.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
  if (!allowed?.success) return json({ error: 'Too many requests. Try again shortly.' }, 429, cors);
  let payload;
  try { payload = await request.json(); } catch { return json({ error: 'Request body must be valid JSON.' }, 400, cors); }
  const parsed = validateEnquiryRequest(payload);
  if (!parsed.ok) return json({ error: parsed.message }, parsed.status, cors);
  await purgeExpiredEnquiries(env.RECRUITER_ENQUIRIES);
  const created = await saveEnquiry(env.RECRUITER_ENQUIRIES, parsed.value);
  if (!created) return json({ accepted: true, duplicate: true }, 200, cors);
  try {
    const status = await notifyMarcus(env.EMAIL, env.FOLLOW_UP_FROM, parsed.value);
    await updateNotificationStatus(env.RECRUITER_ENQUIRIES, parsed.value.id, status);
  } catch {
    console.error('Recruiter enquiry notification failure', { category: 'email-send-failed' });
    await updateNotificationStatus(env.RECRUITER_ENQUIRIES, parsed.value.id, 'failed');
  }
  return json({ accepted: true }, 202, cors);
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

export default {
  ...createRecruiterReviewWorker(),
  async scheduled(_event, env, context) {
    context.waitUntil(purgeExpiredEnquiries(env.RECRUITER_ENQUIRIES));
  }
};
