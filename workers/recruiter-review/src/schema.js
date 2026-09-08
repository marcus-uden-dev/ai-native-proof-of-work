const evidenceId = { type: 'string', minLength: 1, maxLength: 80 };
const shortText = { type: 'string', minLength: 1, maxLength: 900 };

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
        summary: shortText,
        roleNeeds: { type: 'array', minItems: 1, maxItems: 7, items: shortText },
        dimensions: {
          type: 'array',
          maxItems: 10,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['id', 'label', 'state', 'explanation', 'evidenceIds', 'verificationQuestion'],
            properties: {
              id: evidenceId,
              label: shortText,
              state: { enum: ['direct', 'transferable', 'needs_interview_verification', 'not_evidenced'] },
              explanation: shortText,
              evidenceIds: { type: 'array', maxItems: 4, items: evidenceId },
              verificationQuestion: { type: 'string', maxLength: 500 }
            }
          }
        },
        roleCoverage: {
          type: 'array',
          minItems: 3,
          maxItems: 5,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['capabilityId', 'roleNeed', 'state', 'explanation', 'evidenceIds', 'verificationQuestion'],
            properties: {
              capabilityId: evidenceId,
              roleNeed: shortText,
              state: { enum: ['direct', 'transferable', 'needs_interview_verification', 'not_evidenced'] },
              explanation: shortText,
              evidenceIds: { type: 'array', maxItems: 4, items: evidenceId },
              verificationQuestion: { type: 'string', maxLength: 500 }
            }
          }
        },
        evidenceAnchors: { type: 'array', minItems: 1, maxItems: 20, items: evidenceId },
        interviewQuestions: { type: 'array', maxItems: 7, items: shortText },
        limitations: { type: 'array', minItems: 1, maxItems: 6, items: shortText }
      }
    }
  }
};

export function schemaForMode(mode) {
  return mode === 'role' ? roleResponseSchema : questionResponseSchema;
}
