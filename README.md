# 🤖 Persona Builder v2.6.0

> **Empower your AI with a Soul.** Create premium, 6-dimension deep personality rulesets (`persona.md` / `SOUL.md`) designed specifically for **Vibe-Coding** in Cursor, Windsurf, and advanced AI Agents.

**🌐 Live Site:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## 🚀 What is Persona Builder?

Persona Builder is a specialized tool for developers and creators who want their AI assistants to do more than just "follow instructions." By using our **6-Dimension Deep Analysis Framework**, you can craft a personality that feels consistent, nuanced, and aligned with your specific goals.

### Why "Vibe-Coding"?
"Vibe-Coding" is the practice of building software through high-level intent and collaboration with AI (like Cursor or Windsurf). For this to work best, your AI needs a clear "vibe" or persona that understands your taste, worldview, and technical guardrails.

---

## ✨ Features v2.6

| Feature | Description |
|---------|-------------|
| **🎯 Objective-Based Logic** | Tailors recommendations ("Recommended" badges) across the flow based on your goal (e.g. Creative Writing, Customer Support). |
| **🧠 6-Dimension Analysis** | Deep mapping of Worldview, Perception, Agency, Taste, Persuasion, and Guardrails. |
| **🌀 OpenClaw SOUL.md Transform** | Automated secondary AI call to transform your `persona.md` into the specialized OpenClaw `SOUL.md` format. |
| **⚡ Instant Fallback Logic** | Creates a functional template from user answers in 0ms, gracefully handling AI timeouts/errors. |
| **🎨 Light Creative Theme** | A clean, modern, and high-contrast "writing-friendly" theme with warm indigo and coral accents. |
| **📱 Inline Scenario Panels** | Replaces abstract tooltips with touch-friendly inline accordion help integrated directly inside choice cards. |
| **📦 Modular Architecture** | Fully refactored codebase using a component-based structure with custom hooks (`usePersonaWizard`, `usePersonaGenerator`). |
| **💤 Lazy-Load Generation** | Generates `persona.md` instantly, deferring Summary & Extras generation until viewed to save API tokens and bandwidth. |
| **☁️ Cloudflare AI Edge** | High-performance generation powered by **Llama 3.1 8B Instruct** via Cloudflare Workers AI. |

---

## 📐 Architecture & Wizard Flow

Persona Builder uses a multi-stage logic flow to ensure high-quality outputs with zero perceived latency.

### The Wizard Flow
1.  **Objective Selection**: Define the goal (e.g., *Technical Doc*, *Storytelling*). This activates the `objectiveFilter`.
2.  **6-Dimension Questionnaire**: 18+ targeted questions across Worldview, Perception, Agency, Taste, Persuasion, and Guardrails.
3.  **Result Generation**:
    - **Phase 1**: Instant local template generation (0ms).
    - **Phase 2**: Background AI streaming for the core `persona.md`.
    - **Phase 3 (Lazy)**: On-demand generation of Summaries and Before/After examples.
    - **Phase 4 (Transform)**: Optional conversion to OpenClaw `SOUL.md`.

### System Diagram
```mermaid
flowchart TD
    User([User]) --> UI[React Frontend]
    subgraph "🧩 Modular UI"
        UI --> Header[AppHeader]
        UI --> Wizard[Wizard Components]
        UI --> Results[ResultStep]
    end
    UI -->|0ms| Fallback[Instant Fallback]
    subgraph "🧠 Hooks & Logic"
        WizHook[usePersonaWizard]
        GenHook[usePersonaGenerator]
        QFlow[questionFlow.js]
    end
    Wizard --> WizHook
    WizHook --> QFlow
    Results --> GenHook
    GenHook -->|Phase 1: persona.md| Proxy[CF Pages Function]
    GenHook -->|Phase 2: extras (Lazy)| Proxy
    GenHook -->|Transform| Proxy
    Proxy --> AI[Cloudflare Workers AI]
```

- **Frontend**: A modular React 19 app using custom hooks to manage state across 4 distinct steps.
- **Objective Filter**: Dynamically highlights answer paths based on the user's initial objective.
- **Modular Components**: Separation of concerns between the questionnaire engine and the AI generation logic.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **AI Generation** | Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct`) |
| **Serverless** | Cloudflare Pages Functions (API Proxy) |
| **CI/CD** | GitHub Actions |

---

## 🚀 Getting Started (Developers)

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
    Create a `.dev.vars` file for local development (Wrangler proxy):
    ```env
    CLOUDFLARE_ACCOUNT_ID=your_account_id
    CLOUDFLARE_API_TOKEN=your_api_token
    ```

4.  **Run the application**:
    - **Frontend Only**: `npm run dev` (Vite dev server)
    - **Full Stack (Recommended)**: `npm run pages:dev` (Wrangler proxy dev)

### Deployment

Deploy instantly to Cloudflare Pages:
```bash
npm run pages:deploy
```

---

## 📚 Deep Dive Documentation

Detailed documentation is available in the `knowledge/` directory:

| Document | Purpose |
|----------|---------|
| [**Approach & Method**](knowledge/approach_and_method.md) | Deep dive into the 6-dimension framework and design philosophy. |
| [**Developer Guideline**](knowledge/guideline.md) | Technical guide for extending languages, prompts, and local dev. |
| [**Known Issues**](knowledge/known-issues.md) | Tracked limitations, model quirks, and planned improvements. |

---

## 📄 License

MIT © [Werapol](https://github.com/bejranonda)
