# CLAUDE.md

## Project Overview
PersonaBuilder is a specialized tool for generating AI Personas (`persona.md`) using a deep 6-dimension behavioral framework. It is built as a highly interactive React application deployed on Cloudflare Pages.

## Tech Stack
- **Frontend**: React 19, Vite 6, Lucide Icons
- **Styling**: Tailwind CSS v4
- **Backend/AI**: Cloudflare Pages Functions (Proxy) + Cloudflare Workers AI (Llama 3.1 8B)
- **CI/CD**: GitHub Actions (Deploy to Pages, Auto-Release)

## Environment Setup
- Required local file: `.dev.vars` containing `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- Required GitHub secrets: Same as above.

## Build and Development Commands
- `npm run dev`: Local frontend development.
- `npm run pages:dev`: Full-stack local development with wrangler.
- `npm run build`: Production build.
- `npm run pages:deploy`: Manual deployment to Cloudflare Pages (requires auth).

## Architectural Conventions
- **Questionnaire**: Logic is stored in `src/data/questionFlow.js` using a branching tree structure. Data relies on `dimension`, `question`, `label`, and `tag` attributes for rich UI rendering.
- **Streaming API (SSE)**: `src/lib/api.js` utilizes `ReadableStream` to parse HTTP Event Streams from Cloudflare AI, preventing long timeouts. The raw output is parsed immediately token-by-token.
- **Output Format**: Enforces a strict 5-section backend marker format (`===SUMMARY_START===` etc.) parsed natively in the React chunk processor to cleanly populate the 3 Tabbed interfaces (Persona, Summary, Example).

## Code Style
- Functional components with hooks.
- Descriptive Tailwind classes.
- Explicit language handling in all text-generating prompts.
