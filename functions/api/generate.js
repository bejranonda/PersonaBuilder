const MODEL = '@cf/meta/llama-3.1-8b-instruct'; // Can fallback to llama-3-8b-instruct

const LANG_MAP = { en: 'English', th: 'Thai', de: 'German' };

const SYSTEM_INSTRUCTION = `You are an elite AI Persona Design expert and Behavioral Psychologist. Your task is to create a premium persona ruleset from a 6-dimension deep personality analysis.

Rules:
1. Always format output in precise Markdown.
2. The persona instructions must be explicit so other AIs can follow them exactly.
3. You must generate EXACTLY FIVE sections separated by the following markers. Do NOT deviate from this format:

===SUMMARY_START===
A professional summary of the persona's traits, strengths, and communication style.

===PERSONA_MD_START===
A complete, ready-to-use system prompt (in English for best AI performance) that can be pasted into any LLM to activate this persona. Use the "Act as [Role]" format.

===EXAMPLE_PROMPT_START===
Provide a sample user prompt (in the requested language) that someone would use to ask this persona for help (e.g. "Draft an email about the new launch").

===BEFORE_START===
A standard, generic response to the example prompt.

===AFTER_START===
The response rewritten entirely through this persona's voice and newly defined traits.

4. CRITICAL: Do NOT reference or create a "skill.md" file. The output IS a persona.md file.
5. After the last section, output ===END=== on its own line to mark the end of output.`;

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
    const { prompt, language, stream, max_tokens: reqMaxTokens, system_prompt: customSystemPrompt } = await context.request.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Missing or invalid prompt' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const langName = LANG_MAP[language] || LANG_MAP[Object.keys(LANG_MAP).find(k => LANG_MAP[k] === language)] || language;
    const langSuffix = `\n\nCRITICAL: Generate the output entirely in ${langName} language. Never mention or generate "skill.md".`;
    const sysInst = customSystemPrompt ? customSystemPrompt + langSuffix : SYSTEM_INSTRUCTION + langSuffix;
    const maxTokens = Math.min(reqMaxTokens || 4096, 4096);

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
        max_tokens: maxTokens,
        stream: !!stream
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
            max_tokens: maxTokens,
            stream: !!stream
          }),
        });
        if (fbResponse.ok) {
          if (stream) {
            return new Response(fbResponse.body, { headers: { ...CORS_HEADERS, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
          }
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

    if (stream) {
      return new Response(response.body, { headers: { ...CORS_HEADERS, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
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
