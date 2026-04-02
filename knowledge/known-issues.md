# Known Issues

## 1. AI Parsing Constraints (Before vs After)
Currently, the UI parses the generated Cloudflare Workers AI response to split the `skill.md` from the fallback "Before vs After Example" section.
**Issue:** If the AI fails to generate the explicit keyword boundaries (e.g. `### Before vs After Example`), the parsing logic in `App.jsx` might fail to split them reliably, showing the example text inside the `skill.md` pane.
**Workaround:** We provide multiple regex keyword checks (`before vs after`, `vergleich`, etc.) to intercept the break point.
**Status:** Monitored. Usually the heavily-instructed system prompt avoids this error.

## 2. Llama 3.1 Availability 
The `generate.js` attempts to hit `@cf/meta/llama-3.1-8b-instruct`. 
**Issue:** If that model hits rate limits or is unconfigured in some Cloudflare regions, a 404/Error is thrown.
**Solution:** A fallback block is included in `generate.js` to automatically catch 404 errors and retry using `@cf/meta/llama-3-8b-instruct`. Max tokens are statically set for both (2048) to avoid silent truncation on larger requests.

## 3. PowerShell Token Verification
**Issue:** Verifying tokens with `curl` on Windows PowerShell may conflict on headers (`-H`). 
**Solution:** Ensure you use `curl.exe` strictly when playing with Cloudflare REST APIs locally.
