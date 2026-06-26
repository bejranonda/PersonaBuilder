# Developer Guideline

## Project Overview

PersonaBuilder is a **React 19 + Vite 6** application deployed on **Cloudflare Pages**. It utilizes **Cloudflare Pages Functions** as a proxy to reach **Cloudflare Workers AI (Llama 3.1 8B)**.

---

## Local Development Flow

### 1. Requirements
- Node.js 18+
- GitHub Account (for CI/CD)
- Cloudflare Account (for AI & hosting)

### 2. Environment Setup
Create a `.dev.vars` file in the root directory:
```bash
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_id
```

### 3. Running the App
- `npm run dev`: Starts the Vite development server (port 5173).
- `npm run pages:dev`: Starts the full-stack environment using Wrangler (recommended).

---

## v2.5 Architecture: Hooks & Components

The application follows a **Modular Component Architecture**, separating business logic from UI rendering:

### The Central Hooks (`src/hooks/`)
1.  **`usePersonaWizard.js`**: Manages the branching questionnaire state, step navigation, and answer storage.
2.  **`usePersonaGenerator.js`**: Orchestrates the AI streaming, lazy-loaded extras (token optimization), system prompts, and format transformation (SOUL.md).

### The UI Components (`src/components/`)
- Avoid placing logic in components. They should receive state via props or hooks.
- **`ScenarioPanel.jsx`**: A standalone accordion for help examples.
- **`ApplicationGuide.jsx`**: A scrollable instruction set on the results page.

---

## Modifying the AI Engine

### System Prompts
The core AI logic is located in `src/hooks/usePersonaGenerator.js`.
- **`PERSONA_SYSTEM_PROMPT`**: Guides the specific generation of `persona.md`.
- **`EXTRAS_SYSTEM_PROMPT`**: Guides the generation of Summary and Before/After examples.
- **`SOUL_TRANSFORM_PROMPT`**: Guides the reformatting to the OpenClaw SOUL template.

### Deterministic Fallbacks (No AI Required)
Both generation paths have a 0ms, locally-built fallback that never depends on network/AI availability:
- **`buildFallbackPersona()`** (`usePersonaGenerator.js`): Builds `persona.md` directly from the user's answers. All copy comes from the `t` dictionary — never hardcode English strings here. Resolve dimension/tag/label text **language-first**: `field[lang] || field.en`, not `field.en || field[lang]` (the latter silently prefers English even when a translation exists).
- **`buildFallbackSoul()`** (`usePersonaGenerator.js`): Used by `TransformModal.jsx` when the SOUL.md AI transform errors or times out with no partial output. It heuristically extracts bullet points from the existing `persona.md` markdown headings (matching on keywords like "personality dimension", "guardrail", "communication style") to populate Core Truths/Boundaries/Vibe. **Do not localize** the `Core Truths` / `Boundaries` / `Vibe` / `Continuity` headers — they are a fixed part of the external OpenClaw SOUL.md spec. Only the body content should be localized via `t.fallbackSoul*` keys.
- If a partial AI stream arrives before a transform error, that partial output is preserved and shown instead of the fallback (see `t.transformPartialNotice` vs `t.transformFallbackNotice`).

### Extending Languages
1.  **I18n**: Add UI translations to `src/lib/i18n.js`, including any new `fallback*`/`fallbackSoul*` keys if you touch the deterministic fallback templates.
2.  **Flow**: Update `src/data/questionFlow.js` helper `t()` with the new language strings.
3.  **Engine**: Ensure the selected language is passed to `usePersonaGenerator` to correctly localize the AI's output.
4.  **Fallbacks**: Pass the `t` dictionary into `buildFallbackPersona(personaType, answers, lang, t)` / `buildFallbackSoul(personaMd, lang, t)` rather than hardcoding strings — these run when there is no AI response at all, so they're the only thing some users ever see.

---

## Code Conventions
- Maintain the **Modular Component Architecture**.
- Use **functional React components** with hooks.
- Use **Tailwind CSS v4** utility classes for styling.
- Keep the `questionFlow.js` as the single source of truth for the questionnaire branching and recommendation (objectiveFilter) logic.
