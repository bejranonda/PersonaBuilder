# Developer Guidelines

## Project Overview

PersonaBuilder is a React 19 + Vite 6 application deployed on Cloudflare Pages. It generates AI persona rulesets (`skill.md`) using a 6-dimension psychological framework, powered by Cloudflare Workers AI (Llama 3.1 8B).

---

## Adding a New Language

The app uses a custom dictionary-based i18n system (no external libraries). Three files need changes:

### 1. `src/lib/i18n.js` — UI Strings
Add a new object key (e.g. `fr`) to the `DICTIONARY` export with all required string keys. Copy any existing language block as a template. **Do not use raw HTML in any string values** — render JSX elements directly in `App.jsx` instead.

### 2. `src/data/questionFlow.js` — Question Tree
Every call to the helper `t(th, en, de)` must gain a fourth parameter. Update the helper signature to `t(th, en, de, fr)` and return `{ th, en, de, fr }`.

### 3. `src/App.jsx` — Constants & Switcher
Update these three constants at the top of the file:
```js
const LANG_FLAGS = { en: '🇬🇧', th: '🇹🇭', de: '🇩🇪', fr: '🇫🇷' };
const LANG_NAMES = { en: 'English', th: 'Thai', de: 'German', fr: 'French' };
const LANG_ORDER = ['en', 'th', 'de', 'fr'];
```
The `handleLanguageSwitch` function cycles through `LANG_ORDER` automatically — no further changes needed.

### 4. `functions/api/generate.js` — AI Language Mapping
Add the new language to `LANG_MAP`:
```js
const LANG_MAP = { en: 'English', th: 'Thai', de: 'German', fr: 'French' };
```
This ensures the AI receives `"French"` instead of `"fr"` in the system prompt.

---

## Modifying AI Prompts

The system instruction lives in `functions/api/generate.js` as `SYSTEM_INSTRUCTION`.

**Critical rules:**
- The LLM must output the `skill.md` ruleset **first**, followed by a `### Before vs After Example` section.
- If you change the section header text, you **must** also update the `splitKeywords` array in `App.jsx` (`handleGenerate` function) so the client-side parser can separate the two sections.
- `max_tokens` is set to `2048` for both primary and fallback model calls. Increase if personas are being truncated.

---

## Persistence

| Key | Storage | Purpose |
|-----|---------|---------|
| `pb-lang` | `localStorage` | Remembers the user's language preference across sessions |

---

## Local Development

### Client-only (no AI)
```bash
npm run dev
```

### Full stack with Cloudflare Functions
```bash
# Create .dev.vars:
#   CLOUDFLARE_API_TOKEN=cfut_...
#   CLOUDFLARE_ACCOUNT_ID=69...
npm run pages:dev
```

### Production build
```bash
npm run build          # → dist/
npm run preview        # local preview
npm run pages:deploy   # deploy to Cloudflare Pages
```

---

## Deployment Checklist

1. Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in Cloudflare Pages → Settings → Environment Variables
2. Build command: `npm run build`
3. Output directory: `dist`
4. Custom domain: `persona.autobahnn.bot` via Cloudflare Pages → Custom Domains
