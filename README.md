# 🤖 Persona Builder v3.0

> Create a premium AI Persona (`persona.md`) for Vibe-Coding using a natural-language 6-dimension deep personality analysis framework.

**🌐 Live:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## ✨ Features v3.0

| Feature | Description |
|---------|-------------|
| **Light & Warm UI** | Clean, warm-toned light theme designed for creative workflows — stone whites, amber accents, teal highlights. |
| **Situational Tooltips** | Every answer choice includes a real-world example scenario (tap the (i) icon) to help users understand what each option means in practice. |
| **Platform Guidance** | Result page shows how to use your `persona.md` in Gemini, Cursor, OpenClaw/Claude, and any AI chat tool. |
| **Quick Export Actions** | One-click "Download as soul.md", "Copy as System Prompt", and standard download/copy. |
| **Mobile-First Design** | 44px touch targets, responsive spacing, inline tooltip expand on mobile. |
| **2-Phase Streaming** | Generates `persona.md` instantly (2048 tokens), then processes Summary & Examples in the background. |
| **Instant Fallback** | Creates a functional template from user answers in 0ms, gracefully handling AI timeouts/errors. |
| **Tabbed Results UI** | Clean, organized display of persona.md, Summary, and Before/After Examples in isolated tabs. |
| **Browser Language Detection** | Automatically boots in English, Thai, or German based on OS/Browser preferred languages (`navigator.language`). |
| **6-Dimension Analysis** | Deep mapping of Worldview, Perception, Agency, Taste, Persuasion, and Guardrails. |
| **Clone & Agent Modes** | Two distinct flows tailored for either mirroring human traits or defining exact specialist boundaries. |
| **Cloudflare AI Edge** | High-performance generation powered by **Llama 3.1 8B Instruct** via Cloudflare Workers AI. |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 (Light & Warm theme: `stone`, `amber`, `teal`) |
| **Icons** | Lucide React |
| **AI Generation** | Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct`) |
| **Serverless** | Cloudflare Pages Functions (API Proxy) |
| **CI/CD** | GitHub Actions |

## 🚀 Getting Started

### Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/bejranonda/PersonaBuilder.git
    cd PersonaBuilder
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.dev.vars` file for local proxy testing:
    ```bash
    CLOUDFLARE_ACCOUNT_ID=your_account_id
    CLOUDFLARE_API_TOKEN=your_api_token
    ```

4.  **Run the application**:
    - **Frontend Only**: `npm run dev` (Vite dev server)
    - **Full Stack (Recommended)**: `npm run pages:dev` (Wrangler proxy dev)

### Production Build

```bash
npm run build
npm run preview
```

## ☁️ Deployment (CI/CD)

The project includes pre-configured **GitHub Actions** for seamless deployment:

### 1. Cloudflare Pages Deployment
Pushing to the `master` branch triggers `.github/workflows/deploy.yml`. It builds the app and deploys it to Cloudflare Pages automatically.

**Required Secrets:**
- `CLOUDFLARE_API_TOKEN`: API token with "Cloudflare Pages Edit" permission.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID.

### 2. Automatic Releases
Pushing a tag (e.g., `git push origin v3.0.0`) triggers `.github/workflows/release.yml`, which creates a new GitHub Release with automated notes.

## 📐 Architecture & Logic

```mermaid
flowchart LR
    User([User]) --> UI[React Frontend]
    UI -->|0ms| Fallback[Instant Fallback Persona]
    UI --> Wiz[6-Dim Wizard + Tooltips]
    Wiz --> Proxy[CF Pages Function]
    Proxy -- Phase 1: Stream persona.md --> AI[Cloudflare Llama 3.1]
    Proxy -- Phase 2: Stream extras --> AI
    AI -- Chunked Tokens --> UI
    UI --> Result[Result Page + Platform Guidance]
```

- **Frontend**: A state-driven React app with warm light theme (`stone`/`amber`/`teal` palette), situational tooltips on each questionnaire option, and platform guidance cards on the result page.
- **API Proxy**: A Cloudflare Pages Function (`/api/generate`) that securely handles authentication with the Cloudflare API.
- **6 Dimensions**: A proprietary framework that defines an AI's behavior across Worldview, Perception, Agency, Taste, Persuasion, and Guardrails.
- **Result Page**: After generation, users see guidance cards explaining how to use their `persona.md` in Gemini (System Instructions), Cursor (Rules for AI), OpenClaw/Claude (soul.md / System Prompt), or any AI chat tool. Quick export actions include "Download as soul.md" and "Copy as System Prompt".

## 📚 Documentation

Detailed documentation is available in the `knowledge/` directory:

| Document | Purpose |
|----------|---------|
| [**Approach & Method**](knowledge/approach_and_method.md) | Deep dive into the 6-dimension framework and design philosophy. |
| [**Developer Guideline**](knowledge/guideline.md) | Technical guide for extending languages, prompts, and local dev. |
| [**Known Issues**](knowledge/known-issues.md) | Tracked limitations, model quirks, and planned improvements. |

## 📄 License

MIT
