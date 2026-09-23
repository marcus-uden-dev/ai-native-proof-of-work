const evidenceId = { type: 'string', minLength: 1, maxLength: 80 };
const shortText = { type: 'string', minLength: 1, maxLength: 900 };
const roleSummary = { type: 'string', minLength: 1, maxLength: 240 };
const roleNeedText = { type: 'string', minLength: 1, maxLength: 120 };
const roleExplanation = { type: 'string', minLength: 1, maxLength: 180 };
const roleVerificationQuestion = { type: 'string', maxLength: 160 };

export const questionResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['kind', 'answer'],
  properties: {
    kind: { const: 'question' },
    answer: {
      type: 'object',
      additionalProperties: false,
      required: ['summary', 'findings', 'limitations', 'sources'],
      properties: {
        summary: shortText,
        findings: {
          type: 'array',
          minItems: 1,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['claim', 'evidenceIds'],
            properties: { claim: shortText, evidenceIds: { type: 'array', minItems: 1, maxItems: 4, items: evidenceId } }
          }
        },
        limitations: { type: 'array', maxItems: 5, items: shortText },
        sources: { type: 'array', minItems: 1, maxItems: 8, items: evidenceId }
      }
    }
  }
};

export const roleResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['kind', 'assessment'],
  properties: {
    kind: { const: 'role' },
    assessment: {
      type: 'object',
      additionalProperties: false,
      required: ['summary', 'roleNeeds', 'dimensions', 'roleCoverage', 'evidenceAnchors', 'interviewQuestions', 'limitations'],
      properties: {
        summary: roleSummary,
        roleNeeds: { type: 'array', minItems: 4, maxItems: 5, items: roleNeedText },
        dimensions: {
          type: 'array', minItems: 7, maxItems: 7,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'label', 'state', 'explanation', 'evidenceIds', 'verificationQuestion'],
            properties: {
              id: evidenceId,
              label: roleNeedText,
              state: { enum: ['direct', 'transferable', 'needs_interview_verification', 'not_evidenced'] },
              explanation: roleExplanation,
              evidenceIds: { type: 'array', maxItems: 3, items: evidenceId },
              verificationQuestion: roleVerificationQuestion
            }
          }
        },
        roleCoverage: {
          type: 'array',
          minItems: 3, maxItems: 3,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['capabilityId', 'roleNeed', 'state', 'explanation', 'evidenceIds', 'verificationQuestion'],
            properties: {
              capabilityId: evidenceId,
              roleNeed: roleNeedText,
              state: { enum: ['direct', 'transferable', 'needs_interview_verification', 'not_evidenced'] },
              explanation: roleExplanation,
              evidenceIds: { type: 'array', maxItems: 3, items: evidenceId },
              verificationQuestion: roleVerificationQuestion
            }
          }
        },
        evidenceAnchors: { type: 'array', minItems: 1, maxItems: 18, items: evidenceId },
        interviewQuestions: { type: 'array', maxItems: 3, items: roleVerificationQuestion },
        limitations: { type: 'array', maxItems: 3, items: roleVerificationQuestion }
      }
    }
  }
};

export function schemaForMode(mode) {
  return mode === 'role' ? roleResponseSchema : questionResponseSchema;
}
