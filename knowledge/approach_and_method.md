# Approach & Methodology

This document outlines the architectural and product methodologies behind the PersonaBuilder application, providing context for the design decisions made throughout its development.

## 1. The 6-Dimension Framework
At the core of the AI Persona generation is a psychological profiling framework divided into six distinct dimensions:
1. **Worldview (โลกทัศน์):** How the AI perceives reality and humanity.
2. **Perception (มุมมอง):** How it interprets incoming data or problems.
3. **Agency (ตัวตน):** The level of autonomy and proactiveness.
4. **Taste (รสนิยม):** The aesthetic and intellectual preferences in output generation.
5. **Persuasion (การเชิญชวน):** The rhetorical style used when convincing or instructing the user.
6. **Guardrails (ขอบเขต):** Strict limitations and behavioral boundaries.

By breaking down the persona into these dimensions, the wizard-like flow guides users logically without overwhelming them, mapping their selections to the generation prompt seamlessly.

## 2. Clone Mode vs. Agent Mode
- **Clone Mode:** Designed to mimic an existing human identity. It assumes a first-person perspective, relying heavily on "Writing Samples" to match tone, slang, and formatting idiosyncrasies.
- **Agent Mode:** Designed to act as an unopinionated software entity or highly-specialized persona. It relies heavily on strict boundaries and domain expertise parameters rather than mimicking human flaws.

## 3. Custom i18n Localization Strategy
Instead of importing heavy localization libraries like `react-i18next`, we built a lightweight dictionary object in `src/lib/i18n.js`.
**Benefits:**
- Reduces final bundle size significantly, leading to faster loading on Cloudflare Pages.
- Keeps UI logic decoupled from text data.
- The `questionFlow.js` is structured to dynamically return `label[lang]` based on the active state, rather than duplicating the entire flowchart for every language.

## 4. Why Cloudflare Workers AI?
Initially prototyped with Google Gemini (client-side API keys), the project was migrated to Cloudflare Workers AI (`@cf/meta/llama-3.1-8b-instruct`) for the following reasons:
- **Security:** Front-end applications cannot securely hold API keys. The Cloudflare Functions proxy (`/api/generate`) securely signs requests server-side.
- **Cost-Efficiency:** Cloudflare's free-tier AI ecosystem is tightly integrated with CF Pages.
- **CORS Handling:** The proxy effortlessly masks cross-origin policies.

## 5. The "Before vs After" Validation Heuristic
A major UX improvement was introducing instant validation for the persona.
Instead of just handing the user a raw `skill.md` file, the prompt forces the LLM to process a standard placeholder sentence ("We are launching our new project next week...") using the generated persona rules.
The frontend uses a heuristic parser (splitting strings based on keywords array like `### before vs after`) to gracefully separate the raw rule file from the visual demonstration, instilling immediate confidence in the generated profile.
