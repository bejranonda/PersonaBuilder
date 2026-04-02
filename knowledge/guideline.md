# Developer Guidelines

## Adding New Languages
PersonaBuilder uses a lightweight, custom i18n implementation via `src/lib/i18n.js` to avoid bulky dependencies.
To add a new language (e.g. `FR` for French):
1. **Update Dictionary:** Open `src/lib/i18n.js` and add a new `fr: { ... }` object parallel to `en`, `th`, and `de` with the translated strings.
2. **Update Question Tree:** Open `src/data/questionFlow.js`. For every `t(...)` call, add a fourth parameter mapping to the French text.
3. **UI Toggles:** The logic in `App.jsx` handles cycles. `handleLanguageSwitch` must be updated to cycle through `fr` (e.g., `prev === 'de' ? 'fr' : (prev === 'fr' ? 'en' : ...)`).

## Modifying AI Prompts
If you wish to change the system instructions:
- Navigate to `functions/api/generate.js`.
- Alter the `SYSTEM_INSTRUCTION` block.
- Keep in mind that you MUST instruct the LLM to output its 'skill.md' FIRST, followed by the 'Before vs After' example.
- If you alter the text 'Before vs After', you MUST also add your new keyword variant in `App.jsx` logic (`splitKeywords` array) to ensure the client-side parser can separate the rule file from the demo sample.

## Cloudflare Pages Deployment
- Environment Variables (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`) are required in production Settings.
- When running locally, ensure `.dev.vars` is populated with these keys so `wrangler pages dev` proxies the functions accurately.
