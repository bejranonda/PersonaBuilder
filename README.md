# 🤖 Persona Builder v2.6.0

> **Empower your AI with a Soul.** Create premium, 6-dimension deep personality rulesets (`persona.md` / `SOUL.md`) designed specifically for **Vibe-Coding** in Cursor, Windsurf, and advanced AI Agents.

**🌐 Live Site:** [persona.autobahn.bot](https://persona.autobahn.bot)

---

## 🚀 What is Persona Builder?

Persona Builder is a specialized tool for developers and creators who want their AI assistants to do more than just "follow instructions." By using our **6-Dimension Deep Analysis Framework**, you can craft a personality that feels consistent, nuanced, and aligned with your specific goals.

### Why "Vibe-Coding"?
"Vibe-Coding" is the practice of building software through high-level intent and collaboration with AI (like Cursor or Windsurf). For this to work best, your AI needs a clear "vibe" or persona that understands your taste, worldview, and technical guardrails.

---

## ✨ Key Features v2.6

- **🎯 Objective-Based Recommendations**: Automatically suggests the best personality traits based on your goal (e.g., *Technical Writing*, *Creative Storytelling*, or *Customer Support*).
- **🧠 6-Dimension Psychology**: Define your AI's **Worldview, Perception, Agency, Taste, Persuasion, and Guardrails**.
- **⚡ Instant Fallback Logic**: Get a functional `persona.md` in 0ms, enhanced by AI (Llama 3.1 8B) in the background.
- **🌀 OpenClaw SOUL.md Support**: Transform your persona into the specialized `SOUL.md` format used by next-gen AI systems.
- **📱 Touch-First UX**: Modern, high-contrast theme with inline scenario panels—perfect for mobile or desktop.
- **☁️ Cloudflare AI Edge**: High-performance generation powered by **Llama 3.1 8B Instruct** via Cloudflare Workers AI.

---

## 🛠️ How to Use Your Generated Persona

1.  **Generate**: Complete the 6-dimension questionnaire on our [Live Site](https://persona.autobahn.bot).
2.  **Copy**: Grab the generated `persona.md` or `SOUL.md` content.
3.  **Activate**:
    - **Cursor/Windsurf**: Paste it into your `.cursorrules` or project configuration.
    - **Custom GPTs**: Use it as the "Instructions" or "System Prompt".
    - **AI Agents**: Save it as a ruleset for your agentic workflows.

---

## 💻 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Ultra-fast, modern CSS)
- **AI Backend**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) (`Llama 3.1 8B`)
- **Serverless**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)

---

## 🚀 Getting Started (Developers)

### Local Development

1.  **Clone**:
    ```bash
    git clone https://github.com/bejranonda/PersonaBuilder.git
    cd PersonaBuilder
    ```

2.  **Install**:
    ```bash
    npm install
    ```

3.  **Configure**:
    Create a `.dev.vars` file for local development:
    ```env
    CLOUDFLARE_ACCOUNT_ID=your_account_id
    CLOUDFLARE_API_TOKEN=your_api_token
    ```

4.  **Run**:
    - **Frontend Only**: `npm run dev`
    - **Full Stack (Wrangler Proxy)**: `npm run pages:dev`

### Deployment

Deploy instantly to Cloudflare Pages:
```bash
npm run pages:deploy
```

---

## 📚 Deep Dive Documentation

Learn more about our methodology in the `knowledge/` folder:

| Document | Description |
|----------|-------------|
| [**Approach & Method**](knowledge/approach_and_method.md) | The psychology behind the 6-dimension framework. |
| [**Developer Guideline**](knowledge/guideline.md) | How to extend prompts, languages, and features. |
| [**Known Issues**](knowledge/known-issues.md) | Current limitations and planned improvements. |

---

## 📄 License

MIT © [Werapol](https://github.com/bejranonda)
