const RETRY_DELAYS = [2000, 5000, 10000];

/**
 * Call the Cloudflare Workers AI with streaming + retry.
 * @param {string} prompt
 * @param {string} language - language code (e.g. 'en', 'th', 'de')
 * @param {function} onChunk - called with each text token
 * @param {number} retries - max retry attempts
 */
export async function generateContentStream(prompt, language, onChunk, retries = 3) {
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await streamFromProxy(prompt, language, onChunk);
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

async function streamFromProxy(prompt, language, onChunk) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, language, stream: true }),
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
