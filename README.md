# 🤖 Persona Builder

> Create an AI Persona (`skill.md`) for Vibe-Coding using a 6-dimension deep personality analysis framework.

**🌐 Live:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Multi-language** | Full support for Thai 🇹🇭, English 🇬🇧, and German 🇩🇪 across the UI and AI output. |
| **6-Dimension Analysis** | Worldview, Perception, Agency, Taste, Persuasion, and Guardrails logic. |
| **Clone Mode** | Reverse-engineer your own voice/personality into an AI ruleset. |
| **Agent Mode** | Design an expert AI Agent with specific strategic boundaries from scratch. |
| **Writing Samples** | Calibrate the AI's tone using real text snippets from social media or blogs. |
| **Cloudflare AI** | High-performance generation powered by **Llama 3.1 8B Instruct** via Cloudflare Workers AI. |
| **GitHub Actions** | Automated CI/CD for deployments to Cloudflare Pages and versioned releases. |
| **skill.md Export** | Instant download or copy of the generated ruleset for use in Vibe-Coding tools. |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 |
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
Pushing a tag (e.g., `git push origin v1.0.1`) triggers `.github/workflows/release.yml`, which creates a new GitHub Release with automated notes.

## 📐 Architecture & Logic

```mermaid
flowchart LR
    User([User]) --> UI[React Frontend]
    UI --> Wiz[6-Dim Wizard]
    Wiz --> Proxy[CF Pages Function]
    Proxy --> AI[Cloudflare Workers AI<br/>Llama 3.1 8B]
    AI --> Res[skill.md Generator]
    Res --> UI
```

- **Frontend**: A state-driven React app that manages the multi-step branching questionnaire.
- **API Proxy**: A Cloudflare Pages Function (`/api/generate`) that securely handles authentication with the Cloudflare API.
- **6 Dimensions**: A proprietary framework that defines an AI's behavior across Worldview, Perception, Agency, Taste, Persuasion, and Guardrails.

## 📚 Documentation

Detailed documentation is available in the `knowledge/` directory:

| Document | Purpose |
|----------|---------|
| [**Approach & Method**](knowledge/approach_and_method.md) | Deep dive into the 6-dimension framework and design philosophy. |
| [**Developer Guideline**](knowledge/guideline.md) | Technical guide for extending languages, prompts, and local dev. |
| [**Known Issues**](knowledge/known-issues.md) | Tracked limitations, model quirks, and planned improvements. |

## 📄 License

MIT
