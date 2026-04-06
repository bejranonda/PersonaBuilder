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

---

## 7. Light & Warm Theme (v3.0)

PersonaBuilder v3.0 switched from a dark (`slate-950`) theme to a **Light & Warm** theme designed for creative workflows:

- **Color Palette**: Uses `stone-*` for backgrounds, `amber-*` for primary accents, and `teal-*` for secondary accents
- **Rationale**: Dark themes feel gloomy for creative writing tools; warm tones invite ideation and creativity
- **Code Viewer Exception**: The markdown preview panel retains a dark background (`bg-stone-800`) with `prose-invert` for optimal code readability

### Color Mapping (Dark → Light)
| Role | Dark (v2.x) | Light (v3.0) |
|------|-------------|---------------|
| Page background | `bg-slate-950` | `bg-stone-50` |
| Card/panel | `bg-slate-900` | `bg-white` |
| Primary text | `text-white` | `text-stone-800` |
| Secondary text | `text-slate-400` | `text-stone-500` |
| Borders | `border-slate-800` | `border-stone-200` |
| Primary accent | `indigo-500` | `amber-500` |
| Secondary accent | `cyan-500` | `teal-500` |

---

## 8. Situational Tooltip System (v3.0)

Each questionnaire option now includes a **real-world example** to help users understand what each choice means in practice:

- **Data Source**: All 63 options in `questionFlow.js` have an `example` field with 3-language translations (TH/EN/DE)
- **Desktop UX**: Hover/click the `(i)` info icon shows a positioned tooltip popup above the option card
- **Mobile UX**: Tap toggles inline expand below the label text
- **Technical Implementation**: Uses `stopPropagation()` to prevent option selection when tapping tooltip

### Example Format
```js
example: t(
  'เช่น เวลาเจอปัญหาน้ำท่วม จะไม่ดูแค่ระดับน้ำแต่จะไปดูโครงสร้างระบบระบายน้ำทั้งเมือง',
  'e.g. When facing flooding, you investigate the entire drainage system, not just the water level.',
  'z.B. Bei Hochwasser prüfen Sie das gesamte Entwässerungssystem, nicht nur den Wasserstand.'
)
```

---

## 9. Platform Guidance & Quick Actions (v3.0)

After persona generation, users see guidance cards explaining how to use their `persona.md` across different AI tools:

### Supported Platforms
| Platform | Usage |
|----------|-------|
| **Gemini** | Paste into Settings > System Instructions |
| **Cursor** | Paste into Settings > Rules for AI |
| **OpenClaw / Claude** | Use as System Prompt or save as soul.md |
| **Any AI Chat** | Paste at start of conversation or upload .md file |

### Quick Export Actions
| Action | Description |
|--------|-------------|
| **Copy** | Copy persona.md as-is (existing) |
| **Download persona.md** | Download as .md file (existing) |
| **Download soul.md** | Same content, filename `soul.md` (new in v3.0) |
| **Copy as System Prompt** | Wraps in `[SYSTEM INSTRUCTIONS]...[END]` block (new in v3.0) |
