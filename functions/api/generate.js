const MODEL = '@cf/meta/llama-3.1-8b-instruct'; // Can fallback to llama-3-8b-instruct

const LANG_MAP = { en: 'English', th: 'Thai', de: 'German' };

const SYSTEM_INSTRUCTION = `You are an elite AI Persona Design expert and Behavioral Psychologist. Your task is to create a premium "persona.md" ruleset from a 6-dimension deep personality analysis.

Rules:
1. Always format output in precise Markdown. Do not wrap the whole response in a markdown code block. Output the content directly with beautiful structure.
2. The persona instructions must be explicit so other AIs can follow them exactly.
3. You must generate EXACTLY THREE sections:

   Section 1 — **Persona Summary**: A professional summary of the persona's traits, strengths, and communication style.

   Section 2 — **System Prompt**: A complete, ready-to-use system prompt (in English for best AI performance) that can be pasted into any LLM to activate this persona. Use the "Act as [Role]" format.

   Section 3 — **### Before vs After Example**: Rewrite the test phrase provided by the user, showing:
   - **Original Text (Before)**: the original phrase
   - **Persona Applied (After)**: the phrase rewritten through this persona's voice

4. CRITICAL: Do NOT reference or create a "skill.md" file. The output IS a persona.md file.
5. Do NOT wrap the entire output in triple backticks.`;

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

    const langName = LANG_MAP[language] || language;
    const sysInst = SYSTEM_INSTRUCTION + `\n\nCRITICAL: You must generate the output entirely in ${langName} language. Never mention or generate "skill.md".`;

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
        ],
        max_tokens: 4096
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
            ],
            max_tokens: 4096
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
