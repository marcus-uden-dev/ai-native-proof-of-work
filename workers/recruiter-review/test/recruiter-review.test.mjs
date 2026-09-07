import assert from 'node:assert/strict';
import test from 'node:test';

import { createRecruiterReviewWorker } from '../src/index.js';
import { createGroqProvider } from '../src/provider.js';

const catalogue = [
  {
    id: 'cv-product-operations',
    label: 'CV: product operations and workflow design',
    sourceClass: 'employment',
    url: 'https://marcus-uden-dev.github.io/ai-native-proof-of-work/cv/',
    excerpt: 'Product and operations practitioner who turns messy operating problems into clear, buildable work.'
  }
];

const baseEnv = {
  GROQ_API_KEY: 'test-key',
  GROQ_MODEL: 'openai/gpt-oss-20b',
  ALLOWED_ORIGINS: 'https://marcus-uden-dev.github.io,http://127.0.0.1:8123',
  RECRUITER_REVIEW_RATE_LIMITER: { limit: async () => ({ success: true }) }
};

function request(body, origin = 'https://marcus-uden-dev.github.io') {
  return new Request('https://review.example/api/recruiter-review', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify(body)
  });
}

test('returns a validated cited answer for a focused question', async () => {
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        kind: 'question',
        answer: {
          summary: 'The public record documents workflow design.',
          findings: [{ claim: 'Marcus has documented workflow-design evidence.', evidenceIds: ['cv-product-operations'] }],
          limitations: ['This is public evidence coverage, not a hiring decision.'],
          sources: ['cv-product-operations']
        }
      })
    }
  });

  const response = await worker.fetch(request({ mode: 'question', clientMode: 'auto', input: 'What public evidence shows workflow design?' }), baseEnv);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://marcus-uden-dev.github.io');
  assert.deepEqual((await response.json()).kind, 'question');
});

test('rejects untrusted origins, oversized input, rate limits, and invented evidence', async () => {
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        kind: 'question',
        answer: {
          summary: 'Unsupported claim.',
          findings: [{ claim: 'Unsupported claim.', evidenceIds: ['invented'] }],
          limitations: [],
          sources: ['invented']
        }
      })
    }
  });

  const forbidden = await worker.fetch(request({ mode: 'question', clientMode: 'auto', input: 'Question?' }, 'https://example.com'), baseEnv);
  assert.equal(forbidden.status, 403);

  const oversized = await worker.fetch(request({ mode: 'question', clientMode: 'auto', input: 'a'.repeat(12001) }), baseEnv);
  assert.equal(oversized.status, 413);

  const invalidResult = await worker.fetch(request({ mode: 'question', clientMode: 'auto', input: 'Question?' }), baseEnv);
  assert.equal(invalidResult.status, 502);

  const rateLimited = await worker.fetch(request({ mode: 'question', clientMode: 'auto', input: 'Question?' }), {
    ...baseEnv,
    RECRUITER_REVIEW_RATE_LIMITER: { limit: async () => ({ success: false }) }
  });
  assert.equal(rateLimited.status, 429);
});

test('fills missing role dimensions as safe evidence gaps', async () => {
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        kind: 'role',
        assessment: {
          summary: 'A partial role map.',
          roleNeeds: ['Workflow design'],
          dimensions: [{
            id: 'workflow-design',
            label: 'Workflow design',
            state: 'direct',
            explanation: 'The public record documents workflow design.',
            evidenceIds: ['cv-product-operations'],
            verificationQuestion: ''
          }],
          evidenceAnchors: [],
          interviewQuestions: [],
          limitations: ['This is public evidence coverage.']
        }
      })
    }
  });

  const response = await worker.fetch(request({ mode: 'role', clientMode: 'auto', input: 'Role: workflow lead' }), baseEnv);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.kind, 'role');
  assert.equal(body.assessment.dimensions.length, 7);
  assert.equal(body.assessment.dimensions.find(({ id }) => id === 'workflow-design').state, 'direct');
  assert.equal(body.assessment.dimensions.find(({ id }) => id === 'product-framing').state, 'not_evidenced');
  assert.deepEqual(body.assessment.evidenceAnchors, ['cv-product-operations']);
});

test('rejects a non-direct dimension without an interview-verification question', async () => {
  const dimensionIds = [
    'product-framing', 'workflow-design', 'ai-native-execution', 'evidence-synthesis',
    'operational-collaboration', 'technical-delivery', 'business-prioritisation'
  ];
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        assessment: {
          summary: 'A complete role map.',
          roleNeeds: ['Workflow design'],
          dimensions: dimensionIds.map((id, index) => ({
            id,
            label: id,
            state: index === 1 ? 'transferable' : 'direct',
            explanation: 'Public evidence summary.',
            evidenceIds: index === 0 ? ['cv-product-operations'] : [],
            verificationQuestion: ''
          })),
          evidenceAnchors: [],
          interviewQuestions: ['Ask for a concrete workflow example.'],
          limitations: ['This is public evidence coverage.']
        }
      })
    }
  });

  const response = await worker.fetch(request({ mode: 'role', clientMode: 'auto', input: 'Role: workflow lead' }), baseEnv);
  assert.equal(response.status, 502);
});

test('returns a complete seven-dimension role assessment', async () => {
  const dimensionIds = [
    'product-framing', 'workflow-design', 'ai-native-execution', 'evidence-synthesis',
    'operational-collaboration', 'technical-delivery', 'business-prioritisation'
  ];
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        assessment: {
          summary: 'A complete public-evidence role assessment.',
          roleNeeds: ['Workflow design'],
          dimensions: dimensionIds.map((id, index) => ({
            id,
            label: id,
            state: index === 0 ? 'direct' : 'not_evidenced',
            explanation: 'Public evidence summary.',
            evidenceIds: index === 0 ? ['cv-product-operations'] : [],
            verificationQuestion: index === 0 ? '' : `Ask Marcus about ${id}.`
          })),
          evidenceAnchors: [],
        }
      })
    }
  });

  const response = await worker.fetch(request({ mode: 'role', clientMode: 'role', input: 'Role: workflow lead' }), baseEnv);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.kind, 'role');
  assert.equal(body.assessment.dimensions.length, 7);
  assert.deepEqual(body.assessment.evidenceAnchors, ['cv-product-operations']);
  assert.deepEqual(body.assessment.interviewQuestions, []);
  assert.deepEqual(body.assessment.limitations, ['This assessment uses public evidence only and is not a hiring decision.']);
});

test('rejects score language in every role-assessment text field', async () => {
  const dimensionIds = [
    'product-framing', 'workflow-design', 'ai-native-execution', 'evidence-synthesis',
    'operational-collaboration', 'technical-delivery', 'business-prioritisation'
  ];
  const worker = createRecruiterReviewWorker({
    catalogue,
    provider: {
      generateStructuredReview: async () => ({
        kind: 'role',
        assessment: {
          summary: 'A complete public-evidence role assessment.',
          roleNeeds: ['80% workflow design'],
          dimensions: dimensionIds.map((id) => ({
            id,
            label: id,
            state: 'direct',
            explanation: 'Public evidence summary.',
            evidenceIds: [],
            verificationQuestion: ''
          })),
          evidenceAnchors: ['cv-product-operations'],
          interviewQuestions: [],
          limitations: ['This is public evidence coverage.']
        }
      })
    }
  });

  const response = await worker.fetch(request({ mode: 'role', clientMode: 'role', input: 'Role: workflow lead' }), baseEnv);
  assert.equal(response.status, 502);
});

test('Groq adapter requests strict JSON schema and does not expose the API key', async () => {
  let body;
  const provider = createGroqProvider({
    fetch: async (_url, options) => {
      body = JSON.parse(options.body);
      assert.equal(options.headers.authorization, 'Bearer test-key');
      return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ kind: 'question' }) } }] }), { status: 200 });
    }
  });

  await provider.generateStructuredReview({
    apiKey: 'test-key',
    model: 'openai/gpt-oss-20b',
    mode: 'question',
    systemInstructions: 'System instructions',
    userInput: 'User input',
    schema: { type: 'object', properties: { kind: { type: 'string' } }, required: ['kind'], additionalProperties: false }
  });

  assert.equal(body.response_format.type, 'json_schema');
  assert.equal(body.response_format.json_schema.strict, true);
  assert.equal(body.tool_choice, 'none');
  assert.equal(body.max_completion_tokens, 4096);
  assert.equal(body.reasoning_effort, 'low');
  assert.equal(body.include_reasoning, false);
});

test('Groq role adapter uses JSON mode before server-side evidence validation', async () => {
  let body;
  const provider = createGroqProvider({
    fetch: async (_url, options) => {
      body = JSON.parse(options.body);
      return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ kind: 'role' }) } }] }), { status: 200 });
    }
  });

  await provider.generateStructuredReview({
    apiKey: 'test-key',
    model: 'openai/gpt-oss-20b',
    mode: 'role',
    systemInstructions: 'System instructions',
    userInput: 'User input',
    schema: { type: 'object' }
  });

  assert.deepEqual(body.response_format, { type: 'json_object' });
  assert.equal(body.tool_choice, 'none');
});
