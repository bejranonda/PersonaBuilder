const RETRY_DELAYS = [2000, 5000, 10000];

/**
 * Strip markdown code fences the AI sometimes wraps around output.
 * e.g. ```markdown ... ``` → clean content
 */
export function stripMarkdownFences(text) {
  return text
    .replace(/^```(?:markdown|md)?\s*\n/i, '')
    .replace(/\n```\s*$/i, '')
    .trim();
}

/**
 * Call the Cloudflare Workers AI with streaming + retry.
 * @param {string} prompt
 * @param {string} language - language code (e.g. 'en', 'th', 'de')
 * @param {function} onChunk - called with each text token
 * @param {object} options - { retries, maxTokens, systemPrompt }
 */
export async function generateContentStream(prompt, language, onChunk, options = {}) {
  const { retries = 3, maxTokens, systemPrompt } = options;
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await streamFromProxy(prompt, language, onChunk, { maxTokens, systemPrompt });
      return; // success
    } catch (err) {
      lastError = err;
      console.warn(`Stream attempt ${attempt + 1} failed:`, err.message);
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, RETRY_DELAYS[attempt]));
      }
    }
  }

  throw lastError;
}

async function streamFromProxy(prompt, language, onChunk, options = {}) {
  const body = { prompt, language, stream: true };
  if (options.maxTokens) body.max_tokens = options.maxTokens;
  if (options.systemPrompt) body.system_prompt = options.systemPrompt;

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `API proxy error: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    let boundary = buffer.indexOf('\n');

    while (boundary !== -1) {
      const line = buffer.slice(0, boundary).trim();
      buffer = buffer.slice(boundary + 1);

      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        try {
          const payload = JSON.parse(line.substring(6));
          if (payload.response) {
            onChunk(payload.response);
          }
        } catch (e) {
          console.warn('Failed to parse SSE payload:', line);
        }
      }

      boundary = buffer.indexOf('\n');
    }
  }
}
