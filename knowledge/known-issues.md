# Known Issues & Roadmap

## Tracked Issues

### 1. Model Availability (Llama 3.1)
- **Problem**: In some Cloudflare regions, the Llama 3.1 8B model may occasionally be unavailable or return 404.
- **Workaround**: The proxy function automatically falls back to `llama-3-8b-instruct` to ensure the app continues to function.

### 2. Output Parsing
- **Problem**: Lower-param models (8B) occasionally wrap output in ```markdown fences or hallucinate headers.
- **Status**: Mitigated via `stripMarkdownFences()` and the new 2-Phase generation architecture that isolates the persona payload from summary statistics.

### 3. Multi-language Consistency
- **Problem**: Lower-parameter models (8B) can sometimes code-switch or use awkward phrasing in Thai or German.
- **Mitigation**: The system prompt now strictly enforces the output language.

### 4. SOUL.md Transform Fallback
- **Problem**: The new OpenClaw SOUL transform (v2.5.0) requires an active AI connection and has no 0ms deterministic fallback yet.
- **Status**: Identified.

---

## Roadmap

### Phase 4: Modern App Architecture (v2.5.0 - Completed)
- [x] **Full UI Refactor**: Modular React 19 + Vite 6 + Component-based split.
- [x] **New Light Theme**: Clean, creative writing-first aesthetic.
- [x] **Objective-Driven Logic**: "Recommended" badges tailored to the user's goal.
- [x] **Inline Context Help**: Scenario-based examples replacing static tooltips.
- [x] **Ecosystem Transforms**: One-click "persona.md → SOUL.md" reformatting via AI.
- [x] **Application Guide**: Visual integration instructions for Gemini, Cursor, etc.

### Phase 5: Enhanced Vision
- [ ] Support for **direct `persona.md` uploads** to "edit" existing personas without restarting the wizard.
- [ ] Integration with **higher parameter models** (Llama 3.1 70B) for better Thai/German reasoning.
- [ ] Built-in **Prompt Playground** for immediate persona testing within the Results page.

### Phase 6: Ecosystem Expansion
- [ ] Additional **Format Adapters**: (.cursorrules, Claude Projects JSON, Custom APIs).
- [ ] **Community Library**: Pre-built "Template Agents" as starting points.
- [ ] **Advanced Logic**: AI-suggested follow-up questions specialized for each objective.
