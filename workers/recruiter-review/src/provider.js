const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export function createGroqProvider({ fetch = globalThis.fetch } = {}) {
  return {
    async generateStructuredReview({ apiKey, model, mode, systemInstructions, userInput, schema, abortSignal }) {
      const response = await requestWithRetry(fetch, {
        apiKey,
        model,
        mode,
        systemInstructions,
        userInput,
        schema,
        abortSignal
      });

      if (!response.ok) {
        throw await providerResponseError(response, 'groq');
      }
      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content;
      if (typeof content !== 'string' || !content.trim()) throw invalidStructuredOutput('groq', 'response did not contain structured content');

      try {
        return JSON.parse(content);
      } catch {
        throw invalidStructuredOutput('groq', 'response was not valid JSON');
      }
    }
  };
}

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

export function createGeminiProvider({ fetch = globalThis.fetch } = {}) {
  return {
    async generateStructuredReview({ apiKey, model, systemInstructions, userInput, schema, abortSignal }) {
      const response = await requestWithRetry(fetch, {
        apiKey,
        abortSignal,
        request: () => fetch(`${GEMINI_ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          signal: abortSignal,
          headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstructions }] },
            contents: [{ role: 'user', parts: [{ text: userInput }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 4096,
              responseMimeType: 'application/json',
              responseJsonSchema: geminiSchema(schema)
            }
          })
        })
      });

      if (!response.ok) throw await providerResponseError(response, 'gemini');
      const payload = await response.json();
      const content = payload?.candidates?.[0]?.content?.parts?.map(({ text }) => text).filter(Boolean).join('');
      if (typeof content !== 'string' || !content.trim()) throw invalidStructuredOutput('gemini', 'response did not contain structured content');
      try {
        return JSON.parse(content);
      } catch {
        throw invalidStructuredOutput('gemini', 'response was not valid JSON');
      }
    }
  };
}

async function readProviderError(response) {
  try {
    const payload = await response.clone().json();
    const message = payload?.error?.message;
    return typeof message === 'string' ? message.slice(0, 300) : 'No provider error detail.';
  } catch {
    return 'No provider error detail.';
  }
}

async function providerResponseError(response, provider) {
  const detail = await readProviderError(response);
  const error = new Error(`${provider} request failed with ${response.status}`);
  error.status = response.status;
  error.detail = detail;
  error.provider = provider;
  return error;
}

function invalidStructuredOutput(provider, detail) {
  const error = new Error(`${provider} ${detail}`);
  error.provider = provider;
  error.retryable = true;
  return error;
}

async function requestWithRetry(fetch, { abortSignal, request, ...requestOptions }) {
  let response;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    response = await (request ? request() : fetch(GROQ_ENDPOINT, {
      method: 'POST',
      signal: abortSignal,
      headers: {
        authorization: `Bearer ${requestOptions.apiKey}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: requestOptions.model,
        temperature: 0.2,
        max_completion_tokens: 4096,
        reasoning_effort: 'low',
        include_reasoning: false,
        stream: false,
        tool_choice: 'none',
        messages: [
          { role: 'system', content: requestOptions.systemInstructions },
          { role: 'user', content: requestOptions.userInput }
        ],
        response_format: requestOptions.mode === 'role'
          ? { type: 'json_object' }
          : { type: 'json_schema', json_schema: { name: 'recruiter_review', strict: true, schema: requestOptions.schema } }
      })
    }));

    if (response.status !== 429 && response.status < 500) return response;
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return response;
}

function geminiSchema(schema) {
  if (!schema || typeof schema !== 'object') return schema;
  const result = {};
  if (schema.type) result.type = schema.type;
  if (schema.const !== undefined) result.enum = [schema.const];
  if (Array.isArray(schema.enum)) result.enum = schema.enum;
  if (schema.properties) result.properties = Object.fromEntries(Object.entries(schema.properties).map(([key, value]) => [key, geminiSchema(value)]));
  if (Array.isArray(schema.required)) result.required = schema.required;
  if (schema.items) result.items = geminiSchema(schema.items);
  return result;
}
