import { useState, useEffect, useMemo, useRef } from 'react';
import {
  User, Bot, FileText, Download, Plus, Trash2, ArrowRight, ArrowLeft,
  Loader2, CheckCircle2, Sparkles, Copy, Globe, AlertTriangle
} from 'lucide-react';
import { QUESTION_FLOW, PLATFORMS } from './data/questionFlow';
import { DICTIONARY } from './lib/i18n';
import { generateContentStream, stripMarkdownFences } from './lib/api';
import ReactMarkdown from 'react-markdown';

const LANG_FLAGS = { en: '🇬🇧', th: '🇹🇭', de: '🇩🇪' };
const LANG_NAMES = { en: 'English', th: 'Thai', de: 'German' };
const LANG_ORDER = ['en', 'th', 'de'];

function getStepperClass(step, s) {
  if (step === s) return 'bg-indigo-500 text-white ring-4 ring-indigo-500/20';
  if (step > s) return 'bg-slate-700 text-slate-300';
  return 'bg-slate-800 text-slate-500';
}

function getConnectorClass(step, s) {
  return step > s ? 'bg-slate-700' : 'bg-slate-800';
}

function detectBrowserLang() {
  try {
    const stored = localStorage.getItem('pb-lang');
    if (stored) return stored;
  } catch { /* noop */ }
  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('th')) return 'th';
  if (browserLang.startsWith('de')) return 'de';
  return 'en';
}

// Build an instant fallback persona.md from user answers (no AI needed)
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

  const dimSections = dimensions.map(d =>
    `### ${d.dim}\n**${d.tagEn}** — ${d.labelEn}`
  ).join('\n\n');

  const rules = dimensions.map(d => `- Apply **${d.tagEn}** approach consistently`).join('\n');

  const guardrail = dimensions.length > 0
    ? `- Primary constraint: **${dimensions[dimensions.length - 1].tagEn}** — ${dimensions[dimensions.length - 1].labelEn}`
    : '- Follow standard safety and accuracy guidelines.';

  return `# ${title}\n\n## Core Identity\n${roleDesc}\n\n## Personality Dimensions\n${dimSections}\n\n## Communication Rules\n${rules}\n\n## Guardrails\n${guardrail}\n- Stay in character at all times\n- Be consistent with the defined personality dimensions`;
}

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

export default function App() {
  const [lang, setLang] = useState(detectBrowserLang);
  const t = DICTIONARY[lang];

  const [step, setStep] = useState(1);
  const [personaType, setPersonaType] = useState(null);

  // Questionnaire State
  const [currentQId, setCurrentQId] = useState(null);
  const [qHistory, setQHistory] = useState([]);
  const [answers, setAnswers] = useState({});

  // Samples State
  const [samples, setSamples] = useState([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [personaSummary, setPersonaSummary] = useState('');
  const [examplePrompt, setExamplePrompt] = useState('');
  const [exampleBefore, setExampleBefore] = useState('');
  const [exampleAfter, setExampleAfter] = useState('');
  const [activeTab, setActiveTab] = useState('persona'); // persona | summary | example
  const topRef = useRef(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [generationPhase, setGenerationPhase] = useState('idle');
  const [fallbackMarkdown, setFallbackMarkdown] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Close language dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLangOpen(false);
    };
    if (isLangOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLangOpen]);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem('pb-lang', lang); } catch { /* noop */ }
    document.documentElement.lang = lang === 'th' ? 'th' : lang === 'de' ? 'de' : 'en';
  }, [lang]);

  // Elapsed time counter during generation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      setElapsedSeconds(0);
      interval = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  useEffect(() => {
    if (step === 2 && personaType && !currentQId) {
      setCurrentQId(QUESTION_FLOW[personaType].start);
      setQHistory([]);
    }
  }, [step, personaType, currentQId]);

  // Count total questions for progress indicator
  const questionProgress = useMemo(() => {
    if (!personaType || !currentQId) return null;
    return { current: qHistory.length + 1, total: 6 }; // 6 dimensions always
  }, [personaType, currentQId, qHistory]);

  const handleTypeSelect = (type) => {
    setPersonaType(type);
    setAnswers({});
    setCurrentQId(null);
  };

  const handleAnswerSelect = (optionLabel) => {
    setAnswers((prev) => ({ ...prev, [currentQId]: optionLabel }));
  };

  const handleNextQuestion = () => {
    const selectedLabel = answers[currentQId];
    if (!selectedLabel) return;

    const currentQData = QUESTION_FLOW[personaType][currentQId];
    const selectedOption = currentQData.options.find(
      (o) => o.label === selectedLabel
    );

    if (selectedOption?.nextId === 'END') {
      setStep(3);
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else if (selectedOption) {
      setQHistory((prev) => [...prev, currentQId]);
      setCurrentQId(selectedOption.nextId);
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const handlePrevQuestion = () => {
    if (qHistory.length === 0) {
      setStep(1);
    } else {
      const newHistory = [...qHistory];
      const prevQId = newHistory.pop();
      setQHistory(newHistory);
      setCurrentQId(prevQId);
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const addSample = () => setSamples((prev) => [...prev, { id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  const removeSample = (id) => samples.length > 1 && setSamples((prev) => prev.filter((s) => s.id !== id));
  const updateSample = (id, field, value) => setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleGenerate = async () => {
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

    // Phase 0: Instant fallback persona from answers (0ms)
    const fallback = buildFallbackPersona(personaType, answers, lang);
    setFallbackMarkdown(fallback);
    setGenerationPhase('enhancing');

    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    // Build shared prompt context from answers
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
      })
      .join('\n');

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

    let aiPersonaMd = '';
    let timeoutId;

    try {
      // Phase 1: Generate persona.md ONLY (focused prompt → faster)
      const personaUserPrompt = `[INPUT CONTEXT]
- Persona Type: ${personaType === 'clone' ? 'Personal Clone' : 'Specialized Agent'}
- 6-Dimension Deep Analysis Results:
${questionDataStr}

[WRITING STYLE REFERENCES]
${sampleData || 'No specific writing samples provided. Extrapolate tone from the selection logic.'}

Generate the persona.md system prompt in ${LANG_NAMES[lang]}. Output ONLY the raw Markdown content. Do NOT wrap in code fences.`;

      const personaPromise = generateContentStream(
        personaUserPrompt, lang,
        (chunk) => {
          aiPersonaMd += chunk;
          setGeneratedMarkdown(stripMarkdownFences(aiPersonaMd));
        },
        { maxTokens: 2048, systemPrompt: PERSONA_SYSTEM_PROMPT, retries: 2 }
      );

      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('TIMEOUT')), 90000);
      });

      await Promise.race([personaPromise, timeoutPromise]);
      clearTimeout(timeoutId);

      // Clean final persona output
      aiPersonaMd = stripMarkdownFences(aiPersonaMd);
      setGeneratedMarkdown(aiPersonaMd);

      // Phase 2: Generate extras (summary + examples) in background
      setGenerationPhase('extras');

      const extrasUserPrompt = `[PERSONA DEFINITION]
${aiPersonaMd}

Generate supplementary materials for this persona in ${LANG_NAMES[lang]}. Follow the marker format exactly.`;

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

      const extrasTimeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('EXTRAS_TIMEOUT')), 60000);
      });

      await Promise.race([extrasPromise, extrasTimeoutPromise]);
      clearTimeout(timeoutId);
      setGenerationPhase('done');

    } catch (err) {
      clearTimeout(timeoutId);
      console.error(err);

      if (err.message === 'TIMEOUT') {
        setGenerationPhase('timeout');
        if (!aiPersonaMd.trim()) {
          setGeneratedMarkdown(fallback);
        }
      } else if (err.message === 'EXTRAS_TIMEOUT') {
        // persona.md is complete, extras just timed out — acceptable
        setGenerationPhase('done');
      } else {
        setGenerationPhase('error');
        setError(t.aiError);
        if (!aiPersonaMd.trim()) {
          setGeneratedMarkdown(fallback);
        }
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
    a.href = url;
    a.download = 'persona.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const content = generatedMarkdown || fallbackMarkdown;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setPersonaType(null);
    setCurrentQId(null);
    setQHistory([]);
    setAnswers({});
    setSamples([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
    setGeneratedMarkdown('');
    setPersonaSummary('');
    setExamplePrompt('');
    setExampleBefore('');
    setExampleAfter('');
    setActiveTab('persona');
    setError('');
    setGenerationPhase('idle');
    setFallbackMarkdown('');
    setElapsedSeconds(0);
  };

  const cloneCardClass = personaType === 'clone'
    ? 'border-indigo-500 bg-indigo-500/10 shadow-xl shadow-indigo-500/10'
    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800';

  const agentCardClass = personaType === 'agent'
    ? 'border-cyan-500 bg-cyan-500/10 shadow-xl shadow-cyan-500/10'
    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800';

  const cloneIconClass = personaType === 'clone'
    ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400 group-hover:bg-slate-700';

  const agentIconClass = personaType === 'agent'
    ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-cyan-400 group-hover:bg-slate-700';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:block">
              {t.appTitle}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Step indicators */}
            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3, 4].map((s) => {
                const stepLabels = [t.step1, t.step2, t.step3, t.step4];
                return (
                  <div key={s} className="flex items-center" title={stepLabels[s - 1]}>
                    <div className={'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ' + getStepperClass(step, s)}>
                      {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                    </div>
                    {s < 4 && (
                      <div className={'w-4 sm:w-8 h-1 mx-1 rounded-full transition-all duration-300 ' + getConnectorClass(step, s)} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl border border-slate-700 transition-all text-sm font-medium focus:ring-2 focus:ring-indigo-500/50"
              >
                <Globe className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline">{LANG_NAMES[lang]}</span>
                <span className="inline sm:hidden">{LANG_FLAGS[lang]}</span>
                <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-90' : ''}`} />
              </button>

              {isLangOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-1.5 space-y-1">
                      {LANG_ORDER.map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setLang(l);
                            setIsLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                            lang === l 
                              ? 'bg-indigo-500/10 text-indigo-400 font-bold' 
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg leading-none">{LANG_FLAGS[l]}</span>
                            <span>{LANG_NAMES[l]}</span>
                          </div>
                          {lang === l && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main ref={topRef} className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full relative">
        {/* Step 1: Type Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold text-white tracking-tight">{t.typeSelectionTitle}</h2>
              <p className="text-slate-400 text-lg">
                {t.typeSelectionSubText} <code className="bg-slate-800 px-2 py-1 rounded-md text-sm text-indigo-300">persona.md</code>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleTypeSelect('clone')}
                className={'relative overflow-hidden group p-8 rounded-3xl border-2 transition-all text-left ' + cloneCardClass}
              >
                <div className={'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ' + cloneIconClass}>
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.cloneTitle}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{t.cloneDesc}</p>
                {personaType === 'clone' && (
                  <div className="absolute top-6 right-6 text-indigo-500 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </button>

              <button
                onClick={() => handleTypeSelect('agent')}
                className={'relative overflow-hidden group p-8 rounded-3xl border-2 transition-all text-left ' + agentCardClass}
              >
                <div className={'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ' + agentIconClass}>
                  <Bot className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{t.agentTitle}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{t.agentDesc}</p>
                {personaType === 'agent' && (
                  <div className="absolute top-6 right-6 text-cyan-500 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                )}
              </button>
            </div>

            <div className="flex justify-center pt-10">
              <button
                onClick={() => setStep(2)}
                disabled={!personaType}
                className="flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white hover:scale-105 active:scale-95"
              >
                {t.startButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Questions */}
        {step === 2 && currentQId && QUESTION_FLOW[personaType]?.[currentQId] && (
          <div className="max-w-2xl mx-auto flex flex-col min-h-[50vh]">
            <div className="mb-8 flex items-center gap-4 text-sm font-medium text-slate-400">
              <button
                onClick={handlePrevQuestion}
                className="hover:text-white transition-colors flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" /> {t.backButton}
              </button>
              <div className="flex-1 h-px bg-slate-800" />
              {questionProgress && (
                <span className="text-slate-500 text-xs font-mono">
                  {questionProgress.current} / {questionProgress.total}
                </span>
              )}
            </div>

            <div key={currentQId} className="flex-1 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="mb-10 text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-indigo-500/20">
                  {QUESTION_FLOW[personaType][currentQId].dimension[lang] || QUESTION_FLOW[personaType][currentQId].dimension.en}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {QUESTION_FLOW[personaType][currentQId].question[lang] || QUESTION_FLOW[personaType][currentQId].question.en}
                </h2>
              </div>

              <div className="space-y-4">
                {QUESTION_FLOW[personaType][currentQId].options.map((option, idx) => {
                  const labelText = option.label[lang] || option.label.en;
                  const tagText = option.tag ? (option.tag[lang] || option.tag.en) : null;
                  const isSelected = answers[currentQId] === option.label;
                  const selectedStyle = isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/5'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800';
                  const textStyle = isSelected ? 'text-indigo-300' : 'text-slate-300 group-hover:text-white';
                  const radioStyle = isSelected ? 'border-indigo-500' : 'border-slate-700';
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.label)}
                      className={'w-full text-left p-6 rounded-2xl border-2 transition-all flex flex-col gap-2 group ' + selectedStyle}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-1">
                          {tagText && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                              {tagText}
                            </span>
                          )}
                          <span className={'text-lg font-medium leading-normal ' + textStyle}>
                            {labelText}
                          </span>
                        </div>
                        <div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-4 ' + radioStyle}>
                          {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-10 flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={!answers[currentQId]}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Writing Samples */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
            <div className="space-y-3 text-center mb-10">
              <h2 className="text-3xl font-bold text-white">{t.samplesTitle}</h2>
              <p className="text-slate-400">
                {t.samplesSub1}
                <span className="text-indigo-400 block mt-1">{t.samplesSub2}</span>
              </p>
            </div>

            <div className="space-y-8">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 rounded-3xl relative group transition-all shadow-xl"
                >
                  {samples.length > 1 && (
                    <button
                      onClick={() => removeSample(sample.id)}
                      className="absolute top-6 right-6 text-slate-500 hover:text-red-400 transition-colors p-2 bg-slate-950 rounded-full"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-400 mb-3">{t.sourceLabel}</label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = sample.source === platform.id;
                        const btnStyle = isSelected
                          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                          : 'bg-slate-950 text-slate-400 hover:bg-slate-800';
                        return (
                          <button
                            key={platform.id}
                            onClick={() => updateSample(sample.id, 'source', platform.id)}
                            className={'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ' + btnStyle}
                          >
                            <Icon className="w-4 h-4" /> {platform.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {sample.source === 'other' && (
                    <div className="mb-6 animate-in fade-in zoom-in duration-300">
                      <input
                        type="text"
                        placeholder={t.customSourcePlaceholder}
                        value={sample.customSource}
                        onChange={(e) => updateSample(sample.id, 'customSource', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <textarea
                      placeholder={t.textPlaceholder}
                      value={sample.text}
                      onChange={(e) => updateSample(sample.id, 'text', e.target.value)}
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none placeholder:text-slate-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addSample}
              className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500 hover:bg-indigo-500/10 py-5 rounded-3xl transition-all font-bold text-lg mt-6"
            >
              <Plus className="w-6 h-6" /> {t.addSample}
            </button>

            <div className="flex justify-between pt-10">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-slate-400 hover:text-white px-6 py-4 rounded-2xl font-medium transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> {t.backButton}
              </button>
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-5 h-5" /> {t.generateButton}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md">
                  <div>
                    {isGenerating ? (
                      <>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold mb-4 border border-indigo-500/20">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {generationPhase === 'extras' ? t.phaseExtras : t.phaseEnhancing}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-slate-500 text-xs font-mono bg-slate-800 px-2 py-1 rounded-lg">
                            {elapsedSeconds}s
                          </span>
                          {(generatedMarkdown || fallbackMarkdown) && (
                            <span className="text-emerald-400/80 text-xs font-medium">
                              ✓ {t.downloadAvailable}
                            </span>
                          )}
                        </div>
                      </>
                    ) : generationPhase === 'timeout' ? (
                      <>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold mb-4 border border-amber-500/20">
                          <AlertTriangle className="w-4 h-4" /> {t.phaseTimeout}
                        </div>
                        <p className="text-slate-400 mt-2">{t.timeoutSub}</p>
                      </>
                    ) : (
                      <>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-4 border border-green-500/20">
                          <CheckCircle2 className="w-4 h-4" /> {t.successTitle}
                        </div>
                        <p className="text-slate-400 mt-2">{t.successSub}</p>
                      </>
                    )}
                  </div>

                  {(generatedMarkdown || fallbackMarkdown) && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleCopy}
                        className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors font-bold"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                        {copied ? t.copied : t.copy}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 font-bold"
                      >
                        <Download className="w-5 h-5" />
                        {t.download}
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 shadow-lg w-full max-w-lg mx-auto md:mx-0">
                    <button
                      onClick={() => setActiveTab('persona')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'persona' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                    >
                      {t.tabPersona}
                    </button>
                    <button
                      onClick={() => setActiveTab('summary')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'summary' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                    >
                      {t.tabSummary}
                    </button>
                    <button
                      onClick={() => setActiveTab('example')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${activeTab === 'example' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                    >
                      {t.tabExample}
                    </button>
                  </div>

                  {/* Tab Content: Persona.md */}
                  {activeTab === 'persona' && (
                    <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative h-[500px] flex flex-col mb-8 animate-in fade-in zoom-in-95 duration-300">
                      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2 shrink-0">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="ml-4 text-sm font-mono text-slate-400 flex items-center gap-2">
                          <FileText className="w-4 h-4" /> persona.md
                        </span>
                      </div>
                      <div className="p-6 sm:p-8 overflow-auto flex-1 custom-scrollbar">
                        <div className="text-slate-300 text-sm leading-relaxed prose prose-invert prose-slate max-w-none prose-headings:text-white prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-slate-200 prose-code:text-indigo-300 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-li:marker:text-slate-600">
                          {(generatedMarkdown || fallbackMarkdown) ? (
                            <>
                              {!generatedMarkdown && isGenerating && fallbackMarkdown && (
                                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-3 py-2 rounded-lg flex items-center gap-2 mb-4">
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  {t.enhancingNote}
                                </div>
                              )}
                              <ReactMarkdown>{generatedMarkdown || fallbackMarkdown}</ReactMarkdown>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-indigo-400 animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> {t.generatingSub}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Summary */}
                  {activeTab === 'summary' && (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative h-[500px] flex flex-col mb-8 animate-in fade-in zoom-in-95 duration-300">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-400" /> {t.tabSummary}
                      </h3>
                      <div className="overflow-auto custom-scrollbar pr-2 flex-1 space-y-6">
                        <div className="text-slate-300 text-sm leading-relaxed prose prose-invert prose-purple max-w-none">
                           {personaSummary ? (
                             <ReactMarkdown>{personaSummary}</ReactMarkdown>
                           ) : (
                             <div className="flex items-center gap-2 text-indigo-400 animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> {t.generatingSub}</div>
                           )}
                        </div>

                        <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden mt-6">
                          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">
                            {t.appliedAttributes || 'Applied Persona Attributes'}
                          </h4>
                          <ul className="text-slate-300 text-sm leading-relaxed list-disc pl-4 space-y-2">
                            {Object.entries(answers).map(([qId, ans], idx) => {
                              const qObj = QUESTION_FLOW[personaType]?.[qId];
                              const opt = qObj?.options.find((o) => o.label === ans);
                              const tag = opt?.tag ? (opt.tag[lang] || opt.tag.en) : null;
                              const ansLabel = opt?.label?.[lang] || opt?.label?.en || ans;
                              return (
                                <li key={idx} className="opacity-90">
                                  {tag && <strong className="text-purple-300 mr-1 bg-purple-500/10 px-1 py-0.5 rounded">{tag}:</strong>}
                                  {ansLabel}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Content: Example */}
                  {activeTab === 'example' && (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative h-[500px] flex flex-col mb-8 animate-in fade-in zoom-in-95 duration-300">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" /> {t.compareTitle}
                      </h3>
                      <p className="text-sm text-slate-400 mb-6">{t.compareDesc}</p>
                      
                      <div className="space-y-4 flex-1 overflow-auto custom-scrollbar pr-2 pb-4">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.examplePromptLabel}</h4>
                          {examplePrompt ? (
                            <p className="text-slate-200 text-sm italic">&ldquo;{examplePrompt}&rdquo;</p>
                          ) : (
                             <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-2">
                          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 text-[10px] font-bold tracking-wider px-2 py-1 bg-slate-800 text-slate-400 rounded-br-lg">{t.exampleBeforeBadge}</div>
                            <div className="mt-4 text-slate-300 text-sm leading-relaxed opacity-80">
                               {exampleBefore ? <ReactMarkdown>{exampleBefore}</ReactMarkdown> : <div className="h-20 bg-slate-800 rounded animate-pulse"></div>}
                            </div>
                          </div>

                          <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 text-[10px] font-bold tracking-wider px-2 py-1 bg-indigo-500 text-white rounded-br-lg shadow-sm shadow-indigo-500/20">{t.exampleAfterBadge}</div>
                            <div className="mt-4 text-slate-200 text-sm leading-relaxed prose prose-invert prose-indigo max-w-none prose-p:leading-relaxed">
                               {exampleAfter ? <ReactMarkdown>{exampleAfter}</ReactMarkdown> : <div className="h-20 bg-indigo-900/50 rounded animate-pulse mt-1"></div>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-6 pt-8">
                  <button
                    onClick={handleReset}
                    className="text-slate-500 hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t.reset}
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white px-5 py-2 rounded-xl font-medium transition-colors border border-slate-700"
                  >
                    <Sparkles className="w-4 h-4" /> {t.regenerateButton || 'Regenerate'}
                  </button>
                </div>
              </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-medium text-slate-400">Persona Builder v{__APP_VERSION__} &mdash; Inspired by the philosophical approach of Poramate Minsiri</span>
            <span>6-Dimension Deep Analysis Framework</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="opacity-80">Powered by Cloudflare Workers AI & Llama 3.1</span>
            <span className="opacity-50 text-[10px]">Privacy-First: All computation happens in isolated contexts. No data is stored.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
