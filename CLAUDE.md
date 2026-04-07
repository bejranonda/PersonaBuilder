# CLAUDE.md

## Project Overview
PersonaBuilder is a specialized tool for generating AI Personas (`persona.md`) using a deep 6-dimension behavioral framework. The application was recently refactored into a modern, modular React 19 architecture from its original monolithic codebase.

## Tech Stack
- **Frontend**: React 19, Vite 6, Tailwind CSS v4, Lucide Icons, React Markdown
- **Backend/AI**: Cloudflare Pages Functions (Proxy) + Cloudflare Workers AI (Llama 3.1 8B)
- **CI/CD**: GitHub Actions (Deploy to Pages, Auto-Release)

## Environment Setup
- Required local file: `.dev.vars` containing `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- Required GitHub secrets: Same as above.

## Build and Development Commands
- `npm run dev`: Local frontend development (Vite).
- `npm run pages:dev`: Full-stack local development with wrangler (recommended).
- `npm run build`: Production build.
- `npm run pages:deploy`: Manual deployment to Cloudflare Pages (requires auth).

## Architectural Conventions (v2.5 Modular)
- **Hooks**: All logical state and AI orchestration are in custom hooks:
  - `src/hooks/usePersonaWizard.js`: Navigation, step progression, and answer storage.
  - `src/hooks/usePersonaGenerator.js`: AI streaming logic, fallback creation, and result parsing.
- **Components**: The UI is split into organized functional components in `src/components/`:
  - `TypeSelector.jsx` (includes `ObjectiveSelector.jsx`)
  - `QuestionStep.jsx` (includes `ScenarioPanel.jsx`)
  - `ResultStep.jsx` (includes `PersonaViewer.jsx`, `ApplicationGuide.jsx`, `TransformModal.jsx`)
- **Questionnaire**: Data structure in `src/data/questionFlow.js`. Includes an `objectiveFilter` mapping for the Recommendation system.
- **Output Models**: Enforces a strict multi-section marker format (`===SUMMARY_START===`, etc.) for real-time parsing into Tabbed interfaces.

## Code Style
- Component-based architecture with clean props passing.
- Descriptive Tailwind classes.
- Explicit language handling (`t()` helper) across all dimensions, objectives, and help panels.
- Separation of AI framing (prompts) inside the generator hooks.
