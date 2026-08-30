# Approach & Methodology

> This document explains the *why* behind key design decisions in PersonaBuilder (current: v2.7.0).

---

## 1. The 7-Dimension Framework

The persona generation is structured around seven psychological and behavioral dimensions that define an AI's "soul":

| # | Dimension | Thai Name | Purpose |
|---|-----------|-----------|---------|
| 1 | **Worldview** | โลกทัศน์ | The AI's fundamental lens — e.g., systems thinker vs. pragmatist. |
| 2 | **Perception** | มุมมอง | How the AI filters raw data — e.g., seeking patterns vs. assessing risks. |
| 3 | **Agency** | ตัวตน | Decision-making style — e.g., data-driven vs. intuitive. |
| 4 | **Taste** | รสนิยม | Output aesthetic — e.g., minimalist vs. academic. |
| 5 | **Persuasion** | การเชิญชวน | Rhetorical strategy — e.g., logic-based vs. empathy-driven. |
| 6 | **Empathy (EQ)** | ความเห็นอกเห็นใจ | Emotional attunement — how the persona responds to the user's feelings, from warm companion to strictly neutral. |
| 7 | **Guardrails** | ขอบเขต | Hard constraints — e.g., strict accuracy vs. no-fluff policy. |

**Why these dimensions?** This specific set provides enough complexity to differentiate personas without overwhelming the underlying LLM with contradictory instructions. The Empathy dimension (added in v2.7) is deliberately separate from Persuasion: Persuasion covers *how the persona argues*, while Empathy covers *how it responds to the user's emotional state* — the trait users most often mean when they ask for a "more human" AI.

---

### 1.1 Why Empathy is its own dimension (v2.7)

Empathy already appeared inside the framework as *tactics* — `Empathy` as a persuasion move in the Clone flow, `Deep Empathy` as a conversational technique in the Agent flow. Both answer "how does this persona win someone over?", which is a rhetorical question, not an emotional one.

The Empathy (EQ) dimension answers a different question: **how does the persona react when the user is stressed, frustrated, or upset?** That behaviour is orthogonal to rhetoric — a blunt, data-driven persona can still lead with "that sounds genuinely frustrating", and a warm storyteller can still be emotionally tone-deaf. Collapsing the two into one question forced users to trade away one to get the other.

Design constraints we held to:

- **A spectrum, not a toggle.** Empathy is not on/off. Each flow offers four points along a spectrum, and *both* ends are legitimate: `Strictly Neutral` / `Objective & Calm` is the right answer for compliance, research, and code-review personas, and is recommended as such by the `objectiveFilter`.
- **Behavioural, not adjectival.** Options describe an observable action ("acknowledge and validate their feelings first — solutions can wait"), not a trait label ("is kind"). LLMs follow the former and ignore the latter.
- **Different framing per flow.** The Clone flow asks how *you* respond to someone upset (self-description); the Agent flow asks how the agent *should* treat users (specification). Same dimension, different grammatical subject.
- **It must survive into the output.** `PERSONA_SYSTEM_PROMPT` requires a dedicated `Empathy & Emotional Attunement` section, so the answer becomes explicit behavioural rules in `persona.md` rather than being averaged away into a generic tone description.

The `Adaptive Mirror` option (Agent flow) deserves a note: it instructs the agent to *match* the user's register rather than hold a fixed warmth level. It is the most useful default for general-purpose assistants and the hardest to express through any of the other six dimensions.

---

## 2. Objective-Based Recommendation Logic (v2.5)

In v2.5, we introduced the **Objective-Based Flow**. Before defining a persona, the user selects their goal (e.g., *Technical Documentation* or *Storytelling*).

- **Philosophy**: Preserve user freedom while providing expert guidance.
- **Implementation**: Instead of hiding questions (which could be limiting), we use a `Recommended` badge.
- **Mapping**: `src/data/questionFlow.js` includes an `objectiveFilter` that links goals to specific dimension tags (e.g., *Customer Support* recommends *Fact-Focus* and *User-centric*).

---

## 3. Inline Scenario Panels (Touch-First UX)

To improve context-aware help on mobile and touchscreen devices, we moved away from tooltips and hover-states, and integrated the help directly into the choice cards.

- **Solution**: The `ScenarioPanel.jsx` provides an inline, expandable accordion directly *inside* the option card.
- **Visual Connection**: By keeping the help text inside the card's border, the user never loses track of which choice the help corresponds to.
- **Expansion**: Every single option in the flow (over 100 choices across both Clone and Agent paths) now includes a dedicated `helpExample` string.

### 3.1 Progress legibility at 7 steps (v2.7)

Adding a seventh question made the bare `n / 7` counter too weak a signal — at question 5 of 7 there was no visual sense of "nearly there". The question header now pairs that counter with a gradient progress bar (`role="progressbar"` with the matching `aria-value*` attributes), so progress is legible at a glance and to screen readers. The Empathy step additionally carries a heart glyph on its dimension chip, marking it as the one dimension about the *user's* feelings rather than the persona's mechanics.

---

## 4. Reading and Exporting the Result (v2.7)

The result page originally exposed Copy/Download **only** in the top status bar. Once a user scrolled down to actually read the generated persona — the natural thing to do on a page whose whole purpose is a generated document — both actions were off-screen, and there was no way to view the raw Markdown source at all.

- **Actions live with the artifact**: Copy and `Download .md` now sit in the `persona.md` card's title bar, which stays adjacent to the content the user is reading. The status-bar buttons remain for users who act immediately without scrolling.
- **Preview ⇄ Markdown toggle**: The rendered preview is better for *evaluating* a persona; the raw source is what actually gets pasted into Cursor, a system prompt, or an API call. Both are one click apart, defaulting to the preview.

---

## 5. Multi-Phase Generation & Lazy Loading

We utilize a tiered generation pipeline to maximize performance and minimize token waste:

1. **Phase 1 (Persona.md)**: Streams the core ruleset instantly upon completion of the questionnaire.
2. **Phase 2 (Lazy-Loaded Extras)**: The Summary and Example tabs are *not* generated automatically. The secondary AI call (saving ~2048 tokens) is only triggered when the user explicitly clicks the "Summary" or "Example" tab.
3. **SOUL.md Transform**: A dedicated, secondary AI execution that reformats the current persona into the specific **OpenClaw SOUL.md** structure (Core Truths, Boundaries, Vibe, Continuity).

---

## 6. Instant Fallback (v2.2+, Localized in v2.6.1)

To solve the "AI latency" issue, we always build a highly structured `persona.md` directly from the user's 7-dimension answers using a deterministic template function. The user has a functional result in 0ms, which is then *enhanced* by the AI in Phase 1.

**Why this has to be fully localized:** the fallback is not just a loading placeholder — for any user whose AI call fails or times out, it *is* the final result. As of v2.6.1, `buildFallbackPersona()` sources every string (headers, role description, dimension/tag/label text) from the `t` dictionary and resolves language-first (`field[lang] || field.en`), so the fallback matches the AI-generated output's language instead of silently reverting to English.

The same philosophy now extends to the **SOUL.md Transform** (see §5): `buildFallbackSoul()` derives a usable SOUL.md from the existing `persona.md` headings whenever the transform's AI call fails outright, so that flow no longer dead-ends on a bare error message. Per the OpenClaw spec, the `Core Truths` / `Boundaries` / `Vibe` / `Continuity` section headers stay in English even in this fallback — only the body content is localized.

---

## 7. Modular Refactoring (The Component Split)

As of v2.5, the application is no longer a monolith.
- **Hooks**: Logic is centralized in `src/hooks/`, separating "how to navigate" from "how to generate".
- **Components**: The UI is split into organized modules, ensuring that the results tab logic doesn't bloat the questionnaire logic.
- **State Preservation**: The architecture ensures that navigating "Back" preserves answers, but "Reset" clears the hooks' states completely.
