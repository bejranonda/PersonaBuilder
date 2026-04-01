const SYSTEM_INSTRUCTION = `คุณคือผู้เชี่ยวชาญระดับสูงด้าน AI Persona Design และ Behavioral Psychology หน้าที่ของคุณคือสกัดคุณลักษณะจากข้อมูลเชิงลึก 6 มิติ เพื่อสร้าง 'skill.md' ที่สมบูรณ์แบบสำหรับ Vibe-Coding 

กฎเกณฑ์:
1. ตอบกลับเป็นภาษา Markdown เท่านั้น ไม่ต้องมีคำเกริ่นนำ ไม่ต้องครอบด้วย \`\`\`markdown
2. เขียนเนื้อหาเป็นภาษาไทยหรืออังกฤษตามบริบท แต่เน้นความโปรเฟสชันนอล
3. รูปแบบ prompt instructions ต้องชัดเจน ให้ AI ตัวอื่นทำตามได้เป๊ะๆ เหมือนกำลังเขียน Code ให้ AI`;

const MODEL = 'gemini-2.5-flash-preview-09-2025';
const RETRY_DELAYS = [1000, 2000, 4000, 8000, 16000];

/**
 * Call the Gemini API via Cloudflare Function proxy,
 * or directly if VITE_GEMINI_API_KEY is set (local dev).
 */
export async function generateContentWithRetry(prompt, retries = 5) {
  const clientApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  for (let i = 0; i < retries; i++) {
    try {
      let text;

      if (clientApiKey) {
        // Direct client-side call (local dev without wrangler)
        text = await callGeminiDirect(prompt, clientApiKey);
      } else {
        // Cloudflare Function proxy (production)
        text = await callViaProxy(prompt);
      }

      if (!text) throw new Error('Empty response from AI');
      return text;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, RETRY_DELAYS[i]));
    }
  }
}

async function callGeminiDirect(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    }),
  });

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callViaProxy(prompt) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `API proxy error: ${response.status}`);
  }

  const data = await response.json();
  return data.text || '';
}
