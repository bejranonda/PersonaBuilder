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
- **Fixed (v2.6.1)**: The *deterministic* instant-fallback `persona.md` (built locally before/without AI) previously always rendered its section headers, dimension names, tags, and labels in English regardless of the selected UI language. `buildFallbackPersona()` in `usePersonaGenerator.js` now sources every string from the `t` dictionary and resolves dimension/tag/label text language-first (`field[lang] || field.en`), matching the AI-generated path.

### 4. SOUL.md Transform Fallback
- **Problem**: The OpenClaw SOUL transform (v2.5.0) required an active AI connection and had no 0ms deterministic fallback.
- **Fixed (v2.6.1)**: Added `buildFallbackSoul()` in `usePersonaGenerator.js`. If the AI call to `TransformModal` errors or times out with no partial output, it deterministically derives Core Truths/Boundaries/Vibe from the existing `persona.md` headings and shows a localized notice (`transformFallbackNotice`). If a partial stream did arrive before failure, that partial output is kept instead (`transformPartialNotice`). The fixed `Core Truths` / `Boundaries` / `Vibe` / `Continuity` headers intentionally stay in English to match the OpenClaw SOUL.md spec — only the body content is localized.

---

## Roadmap

### Phase 4: Modern App Architecture (v2.5.0 - Completed)
- [x] **Full UI Refactor**: Modular React 19 + Vite 6 + Component-based split.
- [x] **New Light Theme**: Clean, creative writing-first aesthetic.
- [x] **Objective-Driven Logic**: "Recommended" badges tailored to the user's goal.
- [x] **Expanded Answer Choices**: Broadened semantic coverage mapped to objective tags.
- [x] **Inline Context Help**: Scenario-based examples integrated inside choice cards replacing static tooltips.
- [x] **Lazy-Load Generation**: Deferred/lazy generation of Summary and Example tabs to save tokens.
- [x] **Ecosystem Transforms**: One-click "persona.md → SOUL.md" reformatting via AI.
- [x] **Smart App Guide**: Generic tool categories with expandable step-by-step instructions for AI integration.

### Phase 4.1: Reliability & i18n Fixes (v2.6.1 - Completed)
- [x] **Localized Instant Fallback**: `persona.md` deterministic fallback now fully respects the selected UI language (en/th/de).
- [x] **SOUL.md Deterministic Fallback**: `TransformModal` no longer dead-ends on AI failure; derives a usable SOUL.md from the existing persona.

### Phase 5: Enhanced Vision
- [ ] Support for **direct `persona.md` uploads** to "edit" existing personas without restarting the wizard.
- [ ] Integration with **higher parameter models** (Llama 3.1 70B) for better Thai/German reasoning.
- [ ] Built-in **Prompt Playground** for immediate persona testing within the Results page.

### Phase 6: Ecosystem Expansion
- [ ] Additional **Format Adapters**: (.cursorrules, Claude Projects JSON, Custom APIs).
- [ ] **Community Library**: Pre-built "Template Agents" as starting points.
- [ ] **Advanced Logic**: AI-suggested follow-up questions specialized for each objective.
