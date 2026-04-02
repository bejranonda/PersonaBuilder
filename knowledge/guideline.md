# Developer Guidelines

## Adding New Languages
PersonaBuilder uses a lightweight, custom i18n implementation via `src/lib/i18n.js` to avoid bulky dependencies.
To add a new language (e.g. `FR` for French):
1. **Update Dictionary:** Open `src/lib/i18n.js` and add a new `fr: { ... }` object parallel to `en`, `th`, and `de` with the translated strings. Do not use raw HTML bindings inside strings.
2. **Update Question Tree:** Open `src/data/questionFlow.js`. For every string response, ensure the third language is added as a property key.
3. **UI Toggles:** Update `LANG_ORDER`, `LANG_NAMES` and `LANG_FLAGS` constants at the top of `App.jsx` to include your new language array map. The `handleLanguageSwitch` function will automatically handle the toggle array cycle.

## Modifying AI Prompts
If you wish to change the system instructions:
- Navigate to `functions/api/generate.js`.
- Alter the `SYSTEM_INSTRUCTION` block.
- Keep in mind that you MUST instruct the LLM to output its 'skill.md' FIRST, followed by the 'Before vs After' example.
- If you alter the text 'Before vs After', you MUST also add your new keyword variant in `App.jsx` logic (`splitKeywords` array) to ensure the client-side parser can separate the rule file from the demo sample.
- The Cloudflare request automatically maps the abbreviation (`th`) to the full text (`Thai`) via `LANG_MAP` so the Llama model understands strictly which language to use. If adding a new language, update `LANG_MAP` in `generate.js`.

## Persistence Data
- Currently, the dashboard utilizes strict browser `localStorage` under the key `pb-lang` to memorize the user's localized flag context without server-side cookies.

## Cloudflare Pages Deployment
- Environment Variables (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`) are required in production Settings.
- When running locally, ensure `.dev.vars` is populated with these keys so `wrangler pages dev` proxies the functions accurately.
