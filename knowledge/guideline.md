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

### Extending Languages
1.  **I18n**: Add UI translations to `src/lib/i18n.js`.
2.  **Flow**: Update `src/data/questionFlow.js` helper `t()` with the new language strings.
3.  **Engine**: Ensure the selected language is passed to `usePersonaGenerator` to correctly localize the AI's output.

---

## Code Conventions
- Maintain the **Modular Component Architecture**.
- Use **functional React components** with hooks.
- Use **Tailwind CSS v4** utility classes for styling.
- Keep the `questionFlow.js` as the single source of truth for the questionnaire branching and recommendation (objectiveFilter) logic.
