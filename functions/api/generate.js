const MODEL = 'gemini-2.5-flash-preview-09-2025';

const SYSTEM_INSTRUCTION = `คุณคือผู้เชี่ยวชาญระดับสูงด้าน AI Persona Design และ Behavioral Psychology หน้าที่ของคุณคือสกัดคุณลักษณะจากข้อมูลเชิงลึก 6 มิติ เพื่อสร้าง 'skill.md' ที่สมบูรณ์แบบสำหรับ Vibe-Coding 

กฎเกณฑ์:
1. ตอบกลับเป็นภาษา Markdown เท่านั้น ไม่ต้องมีคำเกริ่นนำ ไม่ต้องครอบด้วย \`\`\`markdown
2. เขียนเนื้อหาเป็นภาษาไทยหรืออังกฤษตามบริบท แต่เน้นความโปรเฟสชันนอล
3. รูปแบบ prompt instructions ต้องชัดเจน ให้ AI ตัวอื่นทำตามได้เป๊ะๆ เหมือนกำลังเขียน Code ให้ AI`;

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
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: 'GEMINI_API_KEY is not configured' },
      { status: 500, headers: CORS_HEADERS }
    );
  }

  try {
    const { prompt } = await context.request.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Missing or invalid prompt' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return Response.json(
        { error: `Gemini API error: ${response.status}`, details: errText },
        { status: response.status, headers: CORS_HEADERS }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return Response.json({ text }, { headers: CORS_HEADERS });
  } catch (err) {
    return Response.json(
      { error: err.message || 'Internal server error' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
