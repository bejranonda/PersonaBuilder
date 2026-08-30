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

## Architecture: Hooks & Components (v2.5+)

The application follows a **Modular Component Architecture**, separating business logic from UI rendering:

### The Central Hooks (`src/hooks/`)
1.  **`usePersonaWizard.js`**: Manages the branching questionnaire state, step navigation, and answer storage.
2.  **`usePersonaGenerator.js`**: Orchestrates the AI streaming, lazy-loaded extras (token optimization), system prompts, and format transformation (SOUL.md).

### The UI Components (`src/components/`)
- Avoid placing logic in components. They should receive state via props or hooks.
- **`ScenarioPanel.jsx`**: A standalone accordion for help examples.
- **`ApplicationGuide.jsx`**: A scrollable instruction set on the results page.
- **`PersonaViewer.jsx`**: Renders the generated `persona.md`. Owns only one piece of local state — the Preview/Markdown toggle. Copy/Download are passed in as `onCopy` / `onDownload` props from `usePersonaGenerator` via `ResultStep`, so there is exactly one implementation of each action.

---

## Adding or Changing a Dimension

The questionnaire is a linked list, not an array: every option carries a `nextId` pointing at the next question, and the chain terminates with `nextId: 'END'`. Inserting a dimension therefore means re-pointing the chain, not appending to a list. The Empathy dimension (v2.7) is the reference example — it was inserted between Persuasion and Guardrails in both flows.

Checklist for inserting a dimension:

1. **Re-point the predecessors.** Every option that previously pointed at the old next question must now point at the new question id (e.g. all `nextId: 'capability'` became `nextId: 'empathy'`). Both flows have *multiple* branch paths converging on the same node — miss one and that branch silently skips your new question.
2. **Add the node in both flows.** `clone` and `agent` are separate trees with different framing (self-description vs. specification). Give the node a distinct id per flow (`empathy` / `a_empathy`).
3. **Renumber the `dimension` labels** for every downstream question, in all three languages.
4. **Update `questionProgress.total`** in `usePersonaWizard.js` — it is a hardcoded count, not derived from the flow.
5. **Give every option a `tag`, `label`, and `helpExample`** in th/en/de. The `tag` is the machine-readable key: it is what `objectiveFilter` matches on and what the fallback persona prints, so keep it stable and English-first (Thai tags conventionally mirror the English).
6. **Extend `objectiveFilter`** with the new tags, otherwise no option in your dimension will ever show a "Recommended" badge.
7. **Teach the prompt about it.** Add the dimension to `PERSONA_SYSTEM_PROMPT` (and the Pages Function's `SYSTEM_INSTRUCTION`) with an explicit output section, or the model will average it into generic tone advice.

The instant fallback and the Summary tab need no changes — both walk the flow chain dynamically and pick new dimensions up automatically.

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
- Style with the CSS custom properties in `src/index.css` (`var(--color-accent)`, etc.) rather than literal hex values, so the theme stays swappable.

### Accessibility Baseline (v2.7)
- Interactive elements keep a visible `:focus-visible` ring — do not remove outlines without providing an equivalent.
- Long-running or multi-step UI exposes state to assistive tech (the questionnaire bar uses `role="progressbar"` with `aria-valuenow` / `aria-valuemax`); toggle buttons use `aria-pressed`.
- All animation is wrapped by a global `prefers-reduced-motion: reduce` rule. New animations inherit this automatically as long as they are CSS-driven; JS-driven motion must check the media query itself.
- Tap targets stay at or above 44px (`min-h-[44px]` / `touch-manipulation`).

---

## Verifying a Change

There is no unit-test suite; verification is done by driving the real app. At minimum, for any change to the questionnaire or result page:

1. `npm run build` — catches import/syntax breakage.
2. Walk **both** flows (Clone and Agent) end-to-end in **all three languages**. Language matters: the fallback path and every question string are localized independently, and a missing `t()` key surfaces as `undefined` only at runtime.
3. On the result page, confirm the persona renders, the Preview/Markdown toggle switches, and Download produces a non-empty `persona.md`.
4. Watch the browser console — the app has no error boundary, so a render error shows as a blank section rather than a visible failure.

A headless Playwright script is the fastest way to cover the 6 language × flow combinations in one pass; Chromium is preinstalled at `/opt/pw-browsers/chromium`.
