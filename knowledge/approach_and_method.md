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

## 6. Multi-Phase Generation & Instant Fallback

In v2.2, we overhauled the pipeline to solve the "blank screen" timeout issue caused by generating 4000+ tokens at once:

1. **Instant Fallback**: Before the AI even responds, we generate a highly structured `persona.md` directly from the user's 6-dimension answers using a deterministic template function. The user has a functional result in 0ms.
2. **Phase 1 (Persona Enhancement)**: We prompt the AI to generate *only* the `persona.md` file (max 2048 tokens). This reduces payload size and takes ~20 seconds via SSE streaming.
3. **Phase 2 (Background Extras)**: Once the core persona is complete, we make a secondary AI call to generate the Summary and Before/After examples, populating the remaining UI tabs without blocking the primary export.
4. **Graceful Degradation**: If Cloudflare AI times out (90s) or fails, the interface silently catches the exception, ensures the Instant Fallback is in place, and unlocks the download button. The user never leaves empty-handed.
