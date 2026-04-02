# Known Issues & Roadmap

## Tracked Issues

### 1. Model Availability (Llama 3.1)
- **Problem**: In some Cloudflare regions, the Llama 3.1 8B model may occasionally be unavailable or return 404.
- **Workaround**: The proxy function automatically falls back to `llama-3-8b-instruct` to ensure the app continues to function.

### 2. Output Parsing
- **Problem**: The app parses the AI's markdown response using a keyword-based split (`### Before vs After Example`). While reliable, it can fail if the AI radically changes the heading format.
- **Status**: Stable, but monitoring.

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
- [x] Implemented Custom Dropdown Language selector.
- [x] Enforced strict 3-section AI output format (`persona.md` without skill.md contamination).

### Phase 3: Enhanced Vision
- [ ] Integration with higher parameter models (Llama 3.1 70B) for better Thai/German reasoning.
- [ ] Support for direct `persona.md` file uploads to "edit" existing personas.
- [ ] Built-in prompt playground for immediate persona testing.

### Phase 3: Ecosystem
- [ ] Export directly to popular AI coding tools (Windsurf, Cursor, etc.).
- [ ] Communal library of pre-built "Base Agents".
