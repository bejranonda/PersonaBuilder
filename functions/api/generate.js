const MODEL = '@cf/meta/llama-3.1-8b-instruct'; // Can fallback to llama-3-8b-instruct

const SYSTEM_INSTRUCTION = `You are an elite AI Persona Design expert and Behavioral Psychologist. Your task is to extract traits from a 6-dimension deep dive to create a perfect 'skill.md' for Vibe-Coding.

Rules:
1. Always format output in precise Markdown. Do not wrap the whole response in a markdown block, just output the content directly but structure it beautifully.
2. The prompt instructions must be explicit so other AIs can follow exactly.
3. You must generate TWO sections.
   - Section 1: The 'skill.md' ruleset.
   - Section 2: An explicit example demonstrating the persona, labeled "### Before vs After Example" (or appropriately localized based on the language requested). Provide a highly generic text snippet, then translate it using the persona exactly.`;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { env } = context;
  const token = env.CLOUDFLARE_API_TOKEN;
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;

  if (!token || !accountId) {
    return Response.json(
      { error: 'Cloudflare credentials are not configured in environment variables.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const { prompt, language } = await context.request.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Missing or invalid prompt' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const sysInst = SYSTEM_INSTRUCTION + `\n\nCRITICAL: You must generate the output entirely in ${language} language.`;

    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: sysInst },
          { role: 'user', content: prompt }
        ]
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      // Attempt fallback to older llama 3 model if llama-3.1 fails
      if (response.status === 404 || errText.includes('not found')) {
        const fallbackUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`;
        const fbResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: sysInst },
              { role: 'user', content: prompt }
            ]
          }),
        });
        if (fbResponse.ok) {
          const data = await fbResponse.json();
          const text = data.result?.response || '';
          return Response.json({ text }, { headers: CORS_HEADERS });
        }
      }
      
      return Response.json(
        { error: `Cloudflare AI API error: ${response.status}`, details: errText },
        { status: response.status, headers: CORS_HEADERS }
      );
    }

    const data = await response.json();
    const text = data.result?.response || '';

    return Response.json({ text }, { headers: CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { error: err.message || 'Internal server error' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
