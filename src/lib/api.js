const RETRY_DELAYS = [1000, 2000, 4000, 8000, 16000];

/**
 * Call the Cloudflare Workers AI via Cloudflare Function proxy.
 */
export async function generateContentWithRetry(prompt, language = 'en', retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const text = await callViaProxy(prompt, language);
      if (!text) throw new Error('Empty response from AI');
      return text;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, RETRY_DELAYS[i]));
    }
  }
}

async function callViaProxy(prompt, language) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, language }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `API proxy error: ${response.status}`);
  }

  const data = await response.json();
  return data.text || '';
}
