# Known Issues & Workarounds

> Last updated: 2026-04-02

---

## 1. Before vs After Parsing Can Miss the Split Point

**Severity:** Medium  
**Component:** `src/App.jsx` → `handleGenerate`

**Problem:** The AI response is a single markdown string containing both the `skill.md` ruleset and the "Before vs After Example" section. The client-side parser uses keyword matching (`splitKeywords` array) to find the boundary. If the AI uses an unexpected heading or omits the section entirely, the example text either appears inside the `skill.md` pane or the comparison panel stays empty.

**Current mitigation:**
- The `SYSTEM_INSTRUCTION` in `generate.js` explicitly tells the AI to label the section `### Before vs After Example`
- The parser checks 7 keyword variants including localized forms (`vergleich`, `ตัวอย่าง`)
- A minimum split index of `100` prevents false positives near the start of the response

**Future improvement:** Consider asking the AI for structured JSON output with separate fields, then parsing that instead.

---

## 2. Llama 3.1 Model Availability

**Severity:** Low (auto-handled)  
**Component:** `functions/api/generate.js`

**Problem:** The primary model `@cf/meta/llama-3.1-8b-instruct` may return 404 in some Cloudflare regions or configurations.

**Current mitigation:** Automatic fallback to `@cf/meta/llama-3-8b-instruct` when a 404 or "not found" error is detected. Both calls use `max_tokens: 2048` to prevent truncation.

---

## 3. Non-English Output Quality

**Severity:** Medium  
**Component:** AI generation

**Problem:** Llama 3 8B has significantly weaker capabilities in Thai and German compared to English. Thai output in particular may contain grammatical errors or code-switch to English mid-sentence.

**Current mitigation:**
- The system prompt includes `CRITICAL: You must generate the output entirely in {Language} language`
- Full language names ("Thai", "German") are sent instead of ISO codes ("th", "de") via `LANG_MAP`

**Future improvement:** Consider a larger model (e.g. Llama 3.1 70B) for non-English generation, or add a post-processing step.

---

## 4. PowerShell `curl` Conflicts on Windows

**Severity:** Low  
**Component:** Local development

**Problem:** PowerShell aliases `curl` to `Invoke-WebRequest`, causing header flags (`-H`) to fail when testing the Cloudflare API manually.

**Solution:** Use `curl.exe` explicitly, or use a proper REST client like Postman/Insomnia.

---

## 5. No Rate Limiting on the API Proxy

**Severity:** Low (free-tier has built-in limits)  
**Component:** `functions/api/generate.js`

**Problem:** The `/api/generate` endpoint has no request rate limiting. A malicious user could spam it to exhaust Cloudflare AI free-tier quotas.

**Future improvement:** Add Cloudflare Turnstile (CAPTCHA) or implement a simple request counter with KV storage.
