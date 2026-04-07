# Approach & Methodology

> This document explains the *why* behind key design decisions in PersonaBuilder v2.5.

---

## 1. The 6-Dimension Framework

The persona generation is structured around six psychological and behavioral dimensions that define an AI's "soul":

| # | Dimension | Thai Name | Purpose |
|---|-----------|-----------|---------|
| 1 | **Worldview** | โลกทัศน์ | The AI's fundamental lens — e.g., systems thinker vs. pragmatist. |
| 2 | **Perception** | มุมมอง | How the AI filters raw data — e.g., seeking patterns vs. assessing risks. |
| 3 | **Agency** | ตัวตน | Decision-making style — e.g., data-driven vs. intuitive. |
| 4 | **Taste** | รสนิยม | Output aesthetic — e.g., minimalist vs. academic. |
| 5 | **Persuasion** | การเชิญชวน | Rhetorical strategy — e.g., logic-based vs. empathy-driven. |
| 6 | **Guardrails** | ขอบเขต | Hard constraints — e.g., strict accuracy vs. no-fluff policy. |

**Why 6 dimensions?** This specific set provides enough complexity to differentiate personas without overwhelming the underlying LLM with contradictory instructions.

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

---

## 4. Multi-Phase Generation & Lazy Loading

We utilize a tiered generation pipeline to maximize performance and minimize token waste:

1. **Phase 1 (Persona.md)**: Streams the core ruleset instantly upon completion of the questionnaire.
2. **Phase 2 (Lazy-Loaded Extras)**: The Summary and Example tabs are *not* generated automatically. The secondary AI call (saving ~2048 tokens) is only triggered when the user explicitly clicks the "Summary" or "Example" tab.
3. **SOUL.md Transform**: A dedicated, secondary AI execution that reformats the current persona into the specific **OpenClaw SOUL.md** structure (Core Truths, Boundaries, Vibe, Continuity).

---

## 5. Instant Fallback (v2.2+)

To solve the "AI latency" issue, we always build a highly structured `persona.md` directly from the user's 6-dimension answers using a deterministic template function. The user has a functional result in 0ms, which is then *enhanced* by the AI in Phase 1.

---

## 6. Modular Refactoring (The Component Split)

As of v2.5, the application is no longer a monolith.
- **Hooks**: Logic is centralized in `src/hooks/`, separating "how to navigate" from "how to generate".
- **Components**: The UI is split into organized modules, ensuring that the results tab logic doesn't bloat the questionnaire logic.
- **State Preservation**: The architecture ensures that navigating "Back" preserves answers, but "Reset" clears the hooks' states completely.
