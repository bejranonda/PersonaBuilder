# 🤖 Persona Builder v2.5.0

> Create a premium AI Persona (`persona.md`) for Vibe-Coding using a natural-language 6-dimension deep personality analysis framework.

**🌐 Live:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## ✨ Features v2.5

| Feature | Description |
|---------|-------------|
| **Light Creative Theme** | A clean, modern, and high-contrast "writing-friendly" theme with warm indigo and coral accents. |
| **Objective-Based Logic** | Tailors recommendations ("Recommended" badges) across the flow based on your goal (e.g. Creative Writing, Customer Support). |
| **Expanded Answer Pool** | Broadened semantic coverage with enriched options for all dimensions, including 100+ context-aware help examples. |
| **Inline Scenario Panels** | Replaces abstract tooltips with touch-friendly inline accordion help integrated directly inside choice cards. |
| **OpenClaw SOUL.md Transform** | Automated secondary AI call to transform your `persona.md` into the specialized OpenClaw `SOUL.md` format. |
| **Modular Architecture** | Fully refactored codebase using a component-based structure with custom hooks (`usePersonaWizard`, `usePersonaGenerator`). |
| **Lazy-Load Generation** | Generates `persona.md` instantly, deferring Summary & Extras generation until viewed to save API tokens and bandwidth. |
| **Smart Application Guide** | Generic tool categories with expandable panels showing step-by-step setup guides and code snippets for immediate integration. |
| **Instant Fallback** | Creates a functional template from user answers in 0ms, gracefully handling AI timeouts/errors. |
| **Tabbed Results UI** | Clean, organized display of persona.md, Summary, and Before/After Examples in isolated tabs. |
| **6-Dimension Analysis** | Deep mapping of Worldview, Perception, Agency, Taste, Persuasion, and Guardrails. |
| **Cloudflare AI Edge** | High-performance generation powered by **Llama 3.1 8B Instruct** via Cloudflare Workers AI. |

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
    Create a `.dev.vars` file for local proxy testing (or use wrangler directly):
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

## 📐 Architecture & Logic

```mermaid
flowchart TD
    User([User]) --> UI[React Frontend]
    subgraph "🧩 Modular UI"
        UI --> Header[AppHeader]
        UI --> Wizard[Wizard Components]
        UI --> Results[ResultStep]
    end
    UI -->|0ms| Fallback[Instant Fallback]
    subgraph "🧠 Hooks"
        WizHook[usePersonaWizard]
        GenHook[usePersonaGenerator]
    end
    Wizard --> WizHook
    Results --> GenHook
    GenHook -->|Phase 1: persona.md| Proxy[CF Pages Function]
    GenHook -->|Phase 2: extras (Lazy)| Proxy
    GenHook -->|Transform| Proxy
    Proxy --> AI[Cloudflare Workers AI]
```

- **Frontend**: A modular React app using custom hooks to manage logic and state across 4 distinct steps.
- **6 Dimensions**: A proprietary framework that defines an AI's behavior across Worldview, Perception, Agency, Taste, Persuasion, and Guardrails.
- **Objective Filter**: Dynamically highlights answer paths based on the user's initial objective.

## 📚 Documentation

Detailed documentation is available in the `knowledge/` directory:

| Document | Purpose |
|----------|---------|
| [**Approach & Method**](knowledge/approach_and_method.md) | Deep dive into the 6-dimension framework and design philosophy. |
| [**Developer Guideline**](knowledge/guideline.md) | Technical guide for extending languages, prompts, and local dev. |
| [**Known Issues**](knowledge/known-issues.md) | Tracked limitations, model quirks, and planned improvements. |

## 📄 License

MIT
