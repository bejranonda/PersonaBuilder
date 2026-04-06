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
- `CLOUDFLARE_API_TOKEN`: API token with "Cloudflare Pages Edit" permission.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID.

---

## Modifying the AI Engine

### The Proxy Function & Streaming
The core AI logic is in `functions/api/generate.js`.
- **Model**: Defaulting to `@cf/meta/llama-3.1-8b-instruct`.
- **System Prompt**: Dynamically assembled per request via `custom_system_prompt`.
- **Streaming**: Uses `stream: true` to forward Server-Sent Events natively to the React client (`src/lib/api.js`).
- **2-Phase Architecture**: App generates concise ruleset first, streaming extras later to bypass 4096-max token delays.

---

## Code Conventions
- Use functional React components with hooks.
- Prefer Tailwind utility classes for styling.
- Keep business logic (question trees, i18n) separate from UI components.

---

## Extending Languages

1.  Update `src/data/questionFlow.js` helper `t()` and all question definitions.
2.  Add `example` field to each option with 3-language translations (TH/EN/DE).
3.  Add the language to `LANG_MAP` in `functions/api/generate.js`.
4.  Add UI translations in `src/lib/i18n.js`.

---

## Tooltip System (v3.0)

Each questionnaire option includes a **situational example** to help users understand what each choice means in practice:

- **Desktop**: Hover/click the `(i)` info icon shows a positioned tooltip popup
- **Mobile**: Tap toggles inline expand below the label
- Uses `stopPropagation()` to prevent option selection when tapping tooltip

### Adding New Examples
When adding new questionnaire options, update the `example` field in `questionFlow.js`:

```js
{
  tag: t('Systems Thinker', 'Systems Thinker', 'Systemdenker'),
  label: t('...', '...', '...'),
  nextId: 'perception_system',
  example: t(
    'เช่น เวลาเจอปัญหาน้ำท่วม จะไม่ดูแค่ระดับน้ำแต่จะไปดูโครงสร้างระบบระบายน้ำทั้งเมือง',
    'e.g. When facing flooding, you investigate the entire drainage system, not just the water level.',
    'z.B. Bei Hochwasser prüfen Sie das gesamte Entwässerungssystem, nicht nur den Wasserstand.'
  )
}
```

---

## Result Page Guidance (v3.0)

After generation, users see **platform guidance cards** explaining how to use their `persona.md` in different AI tools:

| Platform | Usage |
|----------|-------|
| **Gemini** | Paste into Settings > System Instructions |
| **Cursor** | Paste into Settings > Rules for AI |
| **OpenClaw / Claude** | Use as System Prompt or soul.md |
| **Any AI Chat** | Paste at start of conversation or upload .md file |

### Quick Actions
| Action | Description |
|--------|-------------|
| **Copy** | Copy persona.md as-is |
| **Download persona.md** | Download as .md file |
| **Download soul.md** | Same content, filename `soul.md` |
| **Copy as System Prompt** | Wraps in `[SYSTEM INSTRUCTIONS]...[END]` |
