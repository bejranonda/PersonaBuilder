import { useState, useEffect } from 'react';
import { QUESTION_FLOW, PLATFORMS } from '../data/questionFlow';
import { generateContentStream, stripMarkdownFences } from '../lib/api';

const LANG_NAMES = { en: 'English', th: 'Thai', de: 'German' };

const PERSONA_SYSTEM_PROMPT = `You are an elite AI Persona Design expert. Create a complete, ready-to-use persona.md system prompt from a 6-dimension personality analysis.

Rules:
1. Output ONLY the persona.md content as clean Markdown. Do NOT wrap it in code blocks or fences.
2. Use the "Act as [Role]" format at the beginning.
3. Include sections for: Core Identity, Communication Style, Decision Framework, Guardrails.
4. Make instructions explicit enough for any LLM to follow exactly.
5. Do NOT reference or create a "skill.md" file. The output IS a persona.md file.
6. NEVER wrap the output in \`\`\`markdown or \`\`\` code fences. Output raw Markdown only.`;

const EXTRAS_SYSTEM_PROMPT = `You are analyzing an AI persona definition. Generate supplementary materials for it.

Rules:
1. Generate EXACTLY the sections below with the EXACT markers shown.
2. Do NOT include the persona.md content itself.
3. NEVER wrap output in code fences.
4. Format:

===SUMMARY_START===
A professional summary of the persona's key traits, strengths, and communication style (3-5 short paragraphs).

===EXAMPLE_PROMPT_START===
A realistic sample user prompt (1-2 sentences) that someone would ask this persona.

===BEFORE_START===
A standard, generic AI response to the example prompt (without the persona).

===AFTER_START===
The same response rewritten entirely through this persona's voice and traits.

===END===`;

export const SOUL_TRANSFORM_PROMPT = `You are an expert at converting AI persona definitions into the OpenClaw SOUL.md format. Transform the provided persona.md into SOUL.md format with these exact sections:

# SOUL.md - Who You Are

## Core Truths
(Distill the persona's fundamental identity, values, and approach into 3-5 bullet points)

## Boundaries
(Extract guardrails and limitations as clear boundary rules)
- Private things stay private. Period.
- When in doubt, ask before acting externally.
(Add persona-specific boundaries)

## Vibe
(Capture the communication style, tone, and personality feel in 2-3 sentences)

## Continuity
(Define how the persona maintains consistency across conversations)

Output ONLY raw Markdown. No code fences.`;

function buildFallbackPersona(personaType, answers, lang) {
  const dimensions = [];
  let iterQId = QUESTION_FLOW[personaType].start;
  while (iterQId && iterQId !== 'END') {
    const qObj = QUESTION_FLOW[personaType][iterQId];
    const ans = answers[iterQId];
    if (!ans) break;
    const dim = qObj.dimension.en || qObj.dimension[lang];
    const opt = qObj.options.find(o => o.label === ans);
    const tagEn = opt?.tag?.en || '';
    const labelEn = opt?.label?.en || '';
    dimensions.push({ dim, tagEn, labelEn });
    iterQId = opt ? opt.nextId : 'END';
  }
  const isClone = personaType === 'clone';
  const title = isClone ? 'Personal Clone Persona' : 'Specialized AI Agent Persona';
  const roleDesc = isClone
    ? 'Act as a personalized AI clone that mirrors the user\'s thinking patterns, communication style, and decision-making approach.'
    : 'Act as a specialized AI agent configured with precise behavioral protocols and strategic guardrails.';
  const dimSections = dimensions.map(d => `### ${d.dim}\n**${d.tagEn}** — ${d.labelEn}`).join('\n\n');
  const rules = dimensions.map(d => `- Apply **${d.tagEn}** approach consistently`).join('\n');
  const guardrail = dimensions.length > 0
    ? `- Primary constraint: **${dimensions[dimensions.length - 1].tagEn}** — ${dimensions[dimensions.length - 1].labelEn}`
    : '- Follow standard safety and accuracy guidelines.';
  return `# ${title}\n\n## Core Identity\n${roleDesc}\n\n## Personality Dimensions\n${dimSections}\n\n## Communication Rules\n${rules}\n\n## Guardrails\n${guardrail}\n- Stay in character at all times\n- Be consistent with the defined personality dimensions`;
}

export default function usePersonaGenerator(personaType, answers, samples, lang, t) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [fallbackMarkdown, setFallbackMarkdown] = useState('');
  const [personaSummary, setPersonaSummary] = useState('');
  const [examplePrompt, setExamplePrompt] = useState('');
  const [exampleBefore, setExampleBefore] = useState('');
  const [exampleAfter, setExampleAfter] = useState('');
  const [activeTab, setActiveTab] = useState('persona');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [generationPhase, setGenerationPhase] = useState('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (isGenerating) {
      setElapsedSeconds(0);
      interval = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const extractSection = (text, startMark, endMarks) => {
    const startIdx = text.indexOf(startMark);
    if (startIdx === -1) return '';
    const contentStart = startIdx + startMark.length;
    let endIdx = text.length;
    for (const endMark of endMarks) {
      const markIdx = text.indexOf(endMark, contentStart);
      if (markIdx !== -1 && markIdx < endIdx) endIdx = markIdx;
    }
    return text.substring(contentStart, endIdx).replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '').trim();
  };

  const handleGenerate = async (setStep, topRef) => {
    setIsGenerating(true);
    setError('');
    setGeneratedMarkdown('');
    setPersonaSummary('');
    setExamplePrompt('');
    setExampleBefore('');
    setExampleAfter('');
    setActiveTab('persona');
    setStep(4);
    setGenerationPhase('building');

    const fallback = buildFallbackPersona(personaType, answers, lang);
    setFallbackMarkdown(fallback);
    setGenerationPhase('enhancing');
    setTimeout(() => topRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    const pathData = [];
    let iterQId = QUESTION_FLOW[personaType].start;
    while (iterQId && iterQId !== 'END') {
      const qObj = QUESTION_FLOW[personaType][iterQId];
      const ans = answers[iterQId];
      if (!ans) break;
      const qDim = qObj.dimension[lang] || qObj.dimension.en;
      const qText = qObj.question[lang] || qObj.question.en;
      const opt = qObj.options.find((o) => o.label === ans);
      const tagLabel = opt?.tag ? (opt.tag[lang] || opt.tag.en) : '';
      const optLabel = opt?.label?.[lang] || opt?.label?.en || ans;
      pathData.push(`[${qDim}] ${qText}\n-> Answer Selection: ${tagLabel ? tagLabel + ' - ' : ''}${optLabel}`);
      iterQId = opt ? opt.nextId : 'END';
    }

    const questionDataStr = pathData.join('\n\n');
    const sampleData = samples
      .filter((s) => s.text.trim() !== '')
      .map((s, i) => {
        const sourceName = s.source === 'other' ? s.customSource : PLATFORMS.find((p) => p.id === s.source)?.name;
        return `--- Reference Sample ${i + 1} (Source: ${sourceName}) ---\n${s.text}\n`;
      }).join('\n');

    let aiPersonaMd = '';
    let timeoutId;

    try {
      const personaUserPrompt = `[INPUT CONTEXT]\n- Persona Type: ${personaType === 'clone' ? 'Personal Clone' : 'Specialized Agent'}\n- 6-Dimension Deep Analysis Results:\n${questionDataStr}\n\n[WRITING STYLE REFERENCES]\n${sampleData || 'No specific writing samples provided. Extrapolate tone from the selection logic.'}\n\nGenerate the persona.md system prompt in ${LANG_NAMES[lang]}. Output ONLY the raw Markdown content. Do NOT wrap in code fences.`;

      const personaPromise = generateContentStream(
        personaUserPrompt, lang,
        (chunk) => { aiPersonaMd += chunk; setGeneratedMarkdown(stripMarkdownFences(aiPersonaMd)); },
        { maxTokens: 2048, systemPrompt: PERSONA_SYSTEM_PROMPT, retries: 2 }
      );
      const timeoutPromise = new Promise((_, reject) => { timeoutId = setTimeout(() => reject(new Error('TIMEOUT')), 90000); });
      await Promise.race([personaPromise, timeoutPromise]);
      clearTimeout(timeoutId);

      aiPersonaMd = stripMarkdownFences(aiPersonaMd);
      setGeneratedMarkdown(aiPersonaMd);
      setGenerationPhase('extras');

      const extrasUserPrompt = `[PERSONA DEFINITION]\n${aiPersonaMd}\n\nGenerate supplementary materials for this persona in ${LANG_NAMES[lang]}. Follow the marker format exactly.`;
      let extrasRaw = '';
      const extrasPromise = generateContentStream(
        extrasUserPrompt, lang,
        (chunk) => {
          extrasRaw += chunk;
          const summary = extractSection(extrasRaw, '===SUMMARY_START===', ['===EXAMPLE_PROMPT_START===']);
          const promptExp = extractSection(extrasRaw, '===EXAMPLE_PROMPT_START===', ['===BEFORE_START===']);
          const before = extractSection(extrasRaw, '===BEFORE_START===', ['===AFTER_START===']);
          const after = extractSection(extrasRaw, '===AFTER_START===', ['===END===']);
          if (summary) setPersonaSummary(summary);
          if (promptExp) setExamplePrompt(promptExp);
          if (before) setExampleBefore(before);
          if (after) setExampleAfter(after);
        },
        { maxTokens: 2048, systemPrompt: EXTRAS_SYSTEM_PROMPT, retries: 2 }
      );
      const extrasTimeoutPromise = new Promise((_, reject) => { timeoutId = setTimeout(() => reject(new Error('EXTRAS_TIMEOUT')), 60000); });
      await Promise.race([extrasPromise, extrasTimeoutPromise]);
      clearTimeout(timeoutId);
      setGenerationPhase('done');
    } catch (err) {
      clearTimeout(timeoutId);
      console.error(err);
      if (err.message === 'TIMEOUT') {
        setGenerationPhase('timeout');
        if (!aiPersonaMd.trim()) setGeneratedMarkdown(fallback);
      } else if (err.message === 'EXTRAS_TIMEOUT') {
        setGenerationPhase('done');
      } else {
        setGenerationPhase('error');
        setError(t.aiError);
        if (!aiPersonaMd.trim()) setGeneratedMarkdown(fallback);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const content = generatedMarkdown || fallbackMarkdown;
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'persona.md';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const content = generatedMarkdown || fallbackMarkdown;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetGenerator = () => {
    setGeneratedMarkdown(''); setFallbackMarkdown('');
    setPersonaSummary(''); setExamplePrompt('');
    setExampleBefore(''); setExampleAfter('');
    setActiveTab('persona'); setError('');
    setGenerationPhase('idle'); setElapsedSeconds(0);
  };

  return {
    isGenerating, generatedMarkdown, fallbackMarkdown,
    personaSummary, examplePrompt, exampleBefore, exampleAfter,
    activeTab, setActiveTab, error, copied, generationPhase, elapsedSeconds,
    handleGenerate, handleDownload, handleCopy, resetGenerator,
  };
}
