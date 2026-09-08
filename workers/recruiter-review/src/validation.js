import { experienceFitDimensions } from './catalog.js';

const states = new Set(['direct', 'transferable', 'needs_interview_verification', 'not_evidenced']);
const dimensionIds = new Set(experienceFitDimensions.map(({ id }) => id));

export function validateRequest(payload) {
  if (!payload || typeof payload !== 'object') return { ok: false, status: 400, message: 'A JSON request body is required.' };
  if (!['question', 'role'].includes(payload.mode)) return { ok: false, status: 400, message: 'Mode must be question or role.' };
  if (!['auto', 'question', 'role'].includes(payload.clientMode)) return { ok: false, status: 400, message: 'Client mode is invalid.' };
  if (typeof payload.input !== 'string' || !payload.input.trim()) return { ok: false, status: 400, message: 'Input is required.' };
  if (payload.input.length > 12000) return { ok: false, status: 413, message: 'Input is too long.' };
  return { ok: true, value: { mode: payload.mode, clientMode: payload.clientMode, input: payload.input.trim() } };
}

export function validateReview(value, mode, catalogue) {
  const invalid = (reason) => ({ ok: false, reason });
  if (!value || typeof value !== 'object') return invalid('kind');
  if (value.kind !== mode) {
    if (mode === 'role' && !Object.hasOwn(value, 'kind') && value.assessment) value = { ...value, kind: mode };
    else return invalid('kind');
  }
  const evidenceIds = new Set(catalogue.map(({ id }) => id));
  const hasOnlyKnownEvidence = (ids) => Array.isArray(ids) && ids.every((id) => evidenceIds.has(id));
  const noScores = (text) => typeof text === 'string' && !/\b\d{1,3}\s*(?:%|percent\b|\/\s*10\b)/i.test(text);
  const scoreFreeTextArray = (items, allowEmpty = false) => arrayOfText(items, allowEmpty) && items.every(noScores);

  if (mode === 'question') {
    const answer = value.answer;
    if (answer && Array.isArray(answer.findings)) {
      if (!scoreFreeTextArray(answer.limitations)) {
        answer.limitations = ['This answer uses public evidence only and is not a hiring decision.'];
      }
      if (!hasOnlyKnownEvidence(answer.sources) || answer.sources.length === 0) {
        answer.sources = [...new Set(answer.findings.flatMap((finding) => Array.isArray(finding?.evidenceIds)
          ? finding.evidenceIds.filter((id) => evidenceIds.has(id))
          : []))];
      }
    }
    if (!answer || !nonEmptyText(answer.summary) || !Array.isArray(answer.findings) || answer.findings.length === 0 || !scoreFreeTextArray(answer.limitations) || !hasOnlyKnownEvidence(answer.sources) || answer.sources.length === 0) return invalid('question-fields');
    if (!noScores(answer.summary) || !answer.findings.every((finding) => nonEmptyText(finding?.claim) && noScores(finding.claim) && hasOnlyKnownEvidence(finding.evidenceIds) && finding.evidenceIds.length > 0)) return invalid('question-findings');
    return { ok: true, value };
  }

  const assessment = value.assessment;
  if (assessment && !scoreFreeTextArray(assessment.roleNeeds)) {
    assessment.roleNeeds = ['Assess the submitted role requirements against cited public evidence and interview validation.'];
  }
  if (assessment && !scoreFreeTextArray(assessment.interviewQuestions, true)) assessment.interviewQuestions = [];
  if (assessment && !scoreFreeTextArray(assessment.limitations)) {
    assessment.limitations = ['This assessment uses public evidence only and is not a hiring decision.'];
  }
  const invalidRoleFields = !assessment ? ['assessment'] : [
    !nonEmptyText(assessment.summary) && 'summary',
    !scoreFreeTextArray(assessment.roleNeeds) && 'roleNeeds',
    !Array.isArray(assessment.dimensions) && 'dimensions',
    !Array.isArray(assessment.evidenceAnchors) && 'evidenceAnchors',
    !scoreFreeTextArray(assessment.interviewQuestions, true) && 'interviewQuestions',
    !scoreFreeTextArray(assessment.limitations) && 'limitations'
  ].filter(Boolean);
  if (invalidRoleFields.length) return invalid(`role-fields-${invalidRoleFields.join('-')}`);
  if (assessment.dimensions.length > dimensionIds.size) return invalid('role-dimension-count');
  if (!noScores(assessment.summary)) return invalid('role-summary-score');
  const seen = new Set();
  const suppliedDimensions = new Map();
  for (const dimension of assessment.dimensions) {
    if (!dimensionIds.has(dimension?.id) || seen.has(dimension.id) || !nonEmptyText(dimension.label) || !noScores(dimension.label) || !states.has(dimension.state) || !nonEmptyText(dimension.explanation) || !hasOnlyKnownEvidence(dimension.evidenceIds) || !noScores(dimension.explanation)) return invalid('role-dimension');
    if (dimension.state === 'direct' && dimension.evidenceIds.length === 0) return invalid('role-direct-without-evidence');
    if (dimension.state !== 'direct' && (!nonEmptyText(dimension.verificationQuestion) || !noScores(dimension.verificationQuestion))) return invalid('role-verification-question');
    seen.add(dimension.id);
    suppliedDimensions.set(dimension.id, dimension);
  }
  assessment.dimensions = experienceFitDimensions.map(({ id, label }) => suppliedDimensions.get(id) ?? {
    id,
    label,
    state: 'not_evidenced',
    explanation: `No direct public evidence was identified for ${label} in this review.`,
    evidenceIds: [],
    verificationQuestion: `Ask Marcus for a relevant example of ${label}.`
  });
  assessment.evidenceAnchors = [...new Set(assessment.dimensions.flatMap((dimension) => dimension.evidenceIds))];
  if (assessment.evidenceAnchors.length === 0) return invalid('role-anchor-empty');
  return { ok: true, value };
}

function nonEmptyText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function arrayOfText(value, allowEmpty = false) {
  return Array.isArray(value) && (allowEmpty || value.length > 0) && value.every(nonEmptyText);
}
