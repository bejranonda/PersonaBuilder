# Known Issues & Roadmap

## Tracked Issues

### 1. Model Availability (Llama 3.1)
- **Problem**: In some Cloudflare regions, the Llama 3.1 8B model may occasionally be unavailable or return 404.
- **Workaround**: The proxy function automatically falls back to `llama-3-8b-instruct` to ensure the app continues to function.

### 2. Output Parsing
- **Problem**: Lower-param models (8B) occasionally wrap output in ```markdown fences or hallucinates headers.
- **Status**: Mitigated via `stripMarkdownFences()` and the new 2-Phase generation architecture that isolates the persona payload from summary statistics.

### 3. Multi-language Consistency
- **Problem**: Lower-parameter models (8B) can sometimes code-switch or use awkward phrasing in Thai or German.
- **Mitigation**: The system prompt now strictly enforces the output language.

---

## Roadmap

### Phase 1: Stability (v1.0 - Completed)
- [x] Refactor to React 19 + Cloudflare Pages.
- [x] Secure API proxy implementation.
- [x] Multi-language support (TH, EN, DE).

### Phase 2: Natural Language UX (v2.0 - Completed)
- [x] Refactored questionnaire to use regular human phrasing.
- [x] Separated technical `tags` from textual `labels`.
- [x] Enforced strict AI output format (`persona.md` without skill.md contamination).

### Phase 3: Performance & Architecture (v2.2 - Completed)
- [x] **2-Phase Generation**: Split the monolithic AI prompt into Persona (Phase 1) and Extras (Phase 2) to bypass 4096-max token delays.
- [x] **Instant Fallback**: Construct a deterministic template in 0ms to ensure users can download a basic persona even if Cloudflare times out.
- [x] **Phase Progress UI**: Real-time timer and multi-stage status indicator replacing the static spinner.
- [x] **Frictionless Mobile scroll**: Automated `scrollIntoView` anchoring.

### Phase 4: Enhanced Vision
- [ ] Integration with higher parameter models (Llama 3.1 70B) for better Thai/German reasoning.
- [ ] Support for direct `persona.md` file uploads to "edit" existing personas.
- [ ] Built-in prompt playground for immediate persona testing.

### Phase 5: Ecosystem
- [ ] Export directly to popular AI coding tools (Windsurf, Cursor, etc.).
- [ ] Communal library of pre-built "Base Agents".
