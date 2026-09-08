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
        const detail = await readProviderError(response);
        const error = new Error(`Groq request failed with ${response.status}`);
        error.status = response.status;
        error.detail = detail;
        throw error;
      }
      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content;
      if (typeof content !== 'string' || !content.trim()) throw new Error('Groq response did not contain structured content');

      try {
        return JSON.parse(content);
      } catch {
        throw new Error('Groq response was not valid JSON');
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

async function requestWithRetry(fetch, { apiKey, model, mode, systemInstructions, userInput, schema, abortSignal }) {
  let response;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      signal: abortSignal,
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_completion_tokens: 4096,
        reasoning_effort: 'low',
        include_reasoning: false,
        stream: false,
        tool_choice: 'none',
        messages: [
          { role: 'system', content: systemInstructions },
          { role: 'user', content: userInput }
        ],
        response_format: mode === 'role'
          ? { type: 'json_object' }
          : { type: 'json_schema', json_schema: { name: 'recruiter_review', strict: true, schema } }
      })
    });

    if (response.status !== 429 && response.status < 500) return response;
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return response;
}
