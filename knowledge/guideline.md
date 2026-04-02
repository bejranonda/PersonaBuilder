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

## CI/CD Workflow

The project uses GitHub Actions for automated deployment and releasing.

- **Deploy**: Every push to `master` builds and deploys to Cloudflare Pages.
- **Release**: Pushing a tag starting with `v` (e.g., `v1.0.0`) creates a GitHub Release.

**Required Repo Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Modifying the AI Engine

### The Proxy Function
The core AI logic is in `functions/api/generate.js`. 
- **Model**: Defaulting to `@cf/meta/llama-3.1-8b-instruct`.
- **System Prompt**: Defines how the traits are synthesized into the `skill.md` format.

### Extending Languages
1.  Update `src/data/questionFlow.js` helper `t()` and all question definitions.
2.  Add the language to `LANG_MAP` in `functions/api/generate.js`.
3.  Add UI translations to `src/lib/i18n.js`.

---

## Code Conventions
- Use functional React components with hooks.
- Prefer Tailwind utility classes for styling.
- Keep business logic (question trees, i18n) separate from UI components.
