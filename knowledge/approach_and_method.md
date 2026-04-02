# Approach & Methodology

> This document explains the *why* behind key design decisions in PersonaBuilder.

---

## 1. The 6-Dimension Framework

The persona generation is structured around six psychological/behavioral dimensions:

| # | Dimension | Thai Name | Purpose |
|---|-----------|-----------|---------|
| 1 | **Worldview** | โลกทัศน์ | How the AI perceives reality — systems thinker, pragmatist, critic, or optimist |
| 2 | **Perception** | มุมมอง | How it processes and filters information — categorizes, finds patterns, assesses risk |
| 3 | **Agency** | ตัวตน | Decision-making style — data-driven, gut-feeling, feedback-oriented, or trial & error |
| 4 | **Taste** | รสนิยม | Output aesthetic — minimalist, academic, casual, or provocative |
| 5 | **Persuasion** | การเชิญชวน | Rhetorical strategy — data, logic, humor, empathy, pain points, or myth-busting |
| 6 | **Guardrails** | ขอบเขต | Non-negotiable constraints — accuracy, conciseness, neutrality, or creativity enforcement |

**Why 6 dimensions?** Each dimension maps to a distinct behavioral axis that LLMs can reliably follow as rules. Fewer dimensions under-specify the persona; more dimensions create contradictory instructions that confuse the model.

**Why a branching tree?** Dimension 2 (Perception) and Dimension 5 (Persuasion) branch based on the prior answer. This creates contextually relevant follow-up questions instead of generic ones, producing a more nuanced persona with only 6 questions total.

---

## 2. Clone Mode vs. Agent Mode

Both modes share the same 6-dimension structure but differ in framing:

| Aspect | Clone Mode | Agent Mode |
|--------|------------|------------|
| **Goal** | Mimic an existing human | Build a specialized AI from scratch |
| **Question framing** | "How do **you** think?" | "How should **the agent** behave?" |
| **Writing samples** | Critical (captures personal voice) | Optional (defines domain tone) |
| **Typical output** | First-person persona with idiosyncrasies | Third-person role with strict protocols |

---

## 3. Why Custom i18n Instead of react-i18next

| Factor | Custom Dictionary | react-i18next |
|--------|------------------|---------------|
| Bundle size | ~8 KB (raw strings) | +40 KB (library + plugins) |
| Complexity | Single object lookup | Namespaces, interpolation engine, context API |
| Question tree | Direct `label[lang]` access | Would need key-based indirection for every option |
| Performance | Zero re-renders from context changes | Provider re-render cascade on language switch |

For an app with ~40 UI strings and ~60 question labels, a full i18n framework is overkill.

---

## 4. Why Cloudflare Workers AI over Google Gemini

The initial prototype used Gemini API keys directly in the frontend.

| Concern | Gemini (client-side) | Cloudflare Workers AI (server-side proxy) |
|---------|---------------------|------------------------------------------|
| API key exposure | ⚠️ Visible in browser DevTools | ✅ Keys stay in server environment variables |
| CORS | ⚠️ Requires `Access-Control` headers from Google | ✅ Same-origin via `/api/generate` |
| Cost | Pay-per-use | ✅ Free tier (10,000 neurons/day) |
| Deployment coupling | Separate API key management | ✅ Native to Cloudflare Pages ecosystem |
| Model control | Google-managed models | ✅ Choose specific open-source model versions |

---

## 5. The "Before vs After" Validation Pattern

**Problem:** Users download a `skill.md` file but have no idea if it actually works until they paste it into their AI tool.

**Solution:** The AI prompt includes a fixed test sentence:
> "We are launching our new project next week. We hope you like it. Please feel free to give us feedback."

The LLM must rewrite this sentence *using the persona it just created*. The frontend splits the response and shows both versions side-by-side, giving the user immediate confidence (or the ability to regenerate).

**Implementation:** The response is a single markdown string. A heuristic parser in `App.jsx` scans for keywords like `### Before vs After Example` to find the split point. This is intentionally simple — structured JSON output from Llama 3 8B is unreliable, so parsing markdown headings is more robust.

---

## 6. Retry & Fallback Strategy

```
User clicks "Generate"
  └─ api.js: generateContentWithRetry()
       ├─ Attempt 1 → POST /api/generate
       ├─ Attempt 2 (after 1s delay)
       ├─ Attempt 3 (after 2s delay)
       ├─ Attempt 4 (after 4s delay)
       └─ Attempt 5 (after 8s delay) → throw if still failing

Server-side (generate.js):
  ├─ Try: llama-3.1-8b-instruct
  ├─ If 404: fallback to llama-3-8b-instruct
  └─ If both fail: return error JSON
```

This two-layer retry (client exponential backoff + server model fallback) ensures maximum resilience against transient failures and model availability issues.
