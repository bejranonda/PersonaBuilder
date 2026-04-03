# Approach & Methodology

> This document explains the *why* behind key design decisions in PersonaBuilder.

---

## 1. The 6-Dimension Framework

The persona generation is structured around six psychological and behavioral dimensions that define an AI's "soul":

| # | Dimension | Thai Name | Purpose |
|---|-----------|-----------|---------|
| 1 | **Worldview** | โลกทัศน์ | The AI's fundamental lens — e.g., systems thinker vs. pragmatist. |
| 2 | **Perception** | มุมมอง | How the AI filters raw data — e.g., seeking patterns vs. assessing risks. |
| 3 | **Agency** | ตัวตน | Decision-making style — e.g., data-driven vs. intuitive. |
| 4 | **Taste** | รสนิยม | Output aesthetic — e.g., minimalist vs. academic. |
| 5 | **Persuasion** | การเชิญชวน | Rhetorical strategy — e.g., logic-based vs. empathy-driven. |
| 6 | **Guardrails** | ขอบเขต | Hard constraints — e.g., strict accuracy vs. no-fluff policy. |

**Why 6 dimensions?** This specific set provides enough complexity to differentiate personas without overwhelming the underlying LLM with contradictory instructions.

---

## 2. Model Selection: Cloudflare Workers AI (Llama 3.1 8B)

After testing multiple models, we selected **Llama 3.1 8B Instruct** via Cloudflare Workers AI for its excellent cost-to-performance ratio and privacy characteristics.

- **Privacy**: Keys stay server-side in Cloudflare environment variables.
- **Latency**: Fast inference times for real-time persona updates.
- **Capability**: Llama 3.1 handles the "persona injection" prompt pattern reliably in English, Thai, and German.

---

## 3. Serverless Architecture (The Proxy Pattern)

We use a **Cloudflare Pages Function** (`/api/generate`) as a secure bridge:
- **Security**: Prevents leaking Cloudflare API tokens to the client.
- **CORS**: Handles same-origin requests naturally within the Pages environment.
- **Resilience**: Implements a model fallback (Llama 3.1 → Llama 3) to ensure high availability.

---

## 4. The Validation Pattern: "Before vs After"

To give users immediate confidence, each generated `skill.md` includes a rewrite of a standard test sentence. This allows users to see exactly how the persona changes the tone, style, and structure of text before they even leave the app.

---

## 5. Branching Question logic

The wizard isn't linear. Dimension 2 (Perception) and Dimension 5 (Persuasion) change based on the user's previous answers. This ensures that follow-up questions are always contextually relevant to the specific type of persona being built.

---

## 6. Real-time Feedback via SSE Streaming

In v2.1, we migrated the generation pipeline from standard request/response to Server-Sent Events (SSE) streaming.
- **Why?** Generating 1000+ tokens of deep persona markdown takes 15–30 seconds. A static loader decreases user trust and frustrates iteration.
- **How?** The Cloudflare Worker proxy forwards the native Llama 3.1 stream. The React frontend uses a custom token parser (`generateContentStream`) to intercept boundary markers (`===PERSONA_MD_START===`) and route live tokens cleanly into separate UI Tabs (Persona, Summary, Example).
