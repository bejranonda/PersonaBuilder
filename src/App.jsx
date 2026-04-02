import { useState, useEffect, useMemo } from 'react';
import {
  User, Bot, FileText, Download, Plus, Trash2, ArrowRight, ArrowLeft,
  Loader2, CheckCircle2, Sparkles, Copy, Globe, AlertTriangle
} from 'lucide-react';
import { QUESTION_FLOW, PLATFORMS } from './data/questionFlow';
import { DICTIONARY } from './lib/i18n';
import { generateContentWithRetry } from './lib/api';
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

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('pb-lang') || 'en'; } catch { return 'en'; }
  });
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
  const [exampleMarkdown, setExampleMarkdown] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem('pb-lang', lang); } catch { /* noop */ }
    document.documentElement.lang = lang === 'th' ? 'th' : lang === 'de' ? 'de' : 'en';
  }, [lang]);

  useEffect(() => {
    if (step === 2 && !currentQId) {
      setCurrentQId(QUESTION_FLOW[personaType].start);
      setQHistory([]);
    }
  }, [step, personaType]);

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
    } else if (selectedOption) {
      setQHistory((prev) => [...prev, currentQId]);
      setCurrentQId(selectedOption.nextId);
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
    }
  };

  const addSample = () => setSamples((prev) => [...prev, { id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  const removeSample = (id) => samples.length > 1 && setSamples((prev) => prev.filter((s) => s.id !== id));
  const updateSample = (id, field, value) => setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    setStep(4);

    try {
      const pathData = [];
      let iterQId = QUESTION_FLOW[personaType].start;
      while (iterQId && iterQId !== 'END') {
        const qObj = QUESTION_FLOW[personaType][iterQId];
        const ans = answers[iterQId];
        if (!ans) break;

        const ansLabel = ans[lang] || ans;
        const qText = qObj.question[lang] || qObj.question;

        pathData.push(qText + '\n-> Selected: ' + ansLabel);

        const opt = qObj.options.find((o) => o.label === ans);
        iterQId = opt ? opt.nextId : 'END';
      }

      const questionDataStr = pathData.join('\n\n');

      const sampleData = samples
        .filter((s) => s.text.trim() !== '')
        .map((s, i) => {
          const sourceName = s.source === 'other' ? s.customSource : PLATFORMS.find((p) => p.id === s.source)?.name;
          return '--- Sample ' + (i + 1) + ' (From: ' + sourceName + ') ---\n' + s.text + '\n';
        })
        .join('\n');

      const prompt = [
        'Create a persona.md file based on the following profile type: ' + personaType,
        '',
        'Traits and conceptual logic selected by user:',
        questionDataStr,
        '',
        '[Writing References provided by user]',
        sampleData || 'No specific writing samples provided. Extrapolate based on the logic.',
        '',
        'The standard test phrase for the "Before vs After Example" is:',
        '"We are launching our new project next week. We hope you like it. Please feel free to give us feedback."'
      ].join('\n');

      let result = await generateContentWithRetry(prompt, LANG_NAMES[lang] || 'English');

      // Heuristic parser for separating "Before vs After" from persona.md
      const lowerResult = result.toLowerCase();
      let splitIndex = result.length;
      
      const splitKeywords = [
        '### before vs after example', 
        '### before vs after',
        'before vs after',
        '### vergleich',
        '### vorher vs',
        '### ตัวอย่าง',
        '## before vs',
      ];
      
      for (const keyword of splitKeywords) {
        const idx = lowerResult.lastIndexOf(keyword);
        if (idx !== -1 && idx < splitIndex) {
          splitIndex = idx;
        }
      }

      let generatedSkill = result;
      let generatedExample = '';

      if (splitIndex < result.length && splitIndex > 100) {
        generatedSkill = result.substring(0, splitIndex).trim();
        generatedExample = result.substring(splitIndex).trim();
      }

      generatedSkill = generatedSkill.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '');
      setGeneratedMarkdown(generatedSkill);
      setExampleMarkdown(generatedExample);

    } catch (err) {
      console.error(err);
      setGeneratedMarkdown(
        '# 🤖 Persona: Default Fallback\n\n## 🎯 Core Identity\n- AI Generation Failed\n- ' + t.aiError + '\n\n## Raw Error:\n' + err.message
      );
      setError(t.aiError);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
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
    navigator.clipboard.writeText(generatedMarkdown);
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
    setExampleMarkdown('');
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

            {/* Language switcher */}
            <div className="relative flex items-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50">
              <Globe className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-200 outline-none cursor-pointer appearance-none pr-6 w-full"
              >
                <option value="en" className="bg-slate-800 text-slate-200">English</option>
                <option value="th" className="bg-slate-800 text-slate-200">ภาษาไทย</option>
                <option value="de" className="bg-slate-800 text-slate-200">Deutsch</option>
              </select>
              <div className="absolute right-3 pointer-events-none">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
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
              <div className="mb-10 p-6 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {QUESTION_FLOW[personaType][currentQId].question[lang] || QUESTION_FLOW[personaType][currentQId].question.en}
                </h2>
              </div>

              <div className="space-y-4">
                {QUESTION_FLOW[personaType][currentQId].options.map((option, idx) => {
                  const labelText = option.label[lang] || option.label.en;
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
                      className={'w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ' + selectedStyle}
                    >
                      <span className={'text-lg font-medium ' + textStyle}>
                        {labelText}
                      </span>
                      <div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-4 ' + radioStyle}>
                        {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
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
            {isGenerating ? (
              <div className="py-12 md:py-20 flex flex-col items-center justify-center space-y-8 animate-pulse text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20" />
                  <Loader2 className="w-16 h-16 text-indigo-400 animate-spin relative z-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{t.generatingTitle}</h2>
                  <p className="text-slate-400">{t.generatingSub}</p>
                </div>
                
                {/* Shimmer Skeleton matching the result layout */}
                <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 mt-12 text-left opacity-30">
                  <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden h-[400px] flex flex-col">
                    <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-700" />
                       <div className="w-3 h-3 rounded-full bg-slate-700" />
                       <div className="w-3 h-3 rounded-full bg-slate-700" />
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                      <div className="h-4 bg-slate-800 rounded w-2/3 mt-8"></div>
                      <div className="h-4 bg-slate-800 rounded w-4/5"></div>
                      <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 h-[400px] flex flex-col justify-start">
                    <div className="h-6 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-2/3 mb-10"></div>
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-6 h-24"></div>
                    <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-5 flex-1"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-4 border border-green-500/20">
                      <CheckCircle2 className="w-4 h-4" /> {t.successTitle}
                    </div>
                    <p className="text-slate-400 mt-2">{t.successSub}</p>
                  </div>

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
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Generated Markdown view */}
                  <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative h-full flex flex-col">
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
                    <div className="p-6 sm:p-8 overflow-auto flex-1 max-h-[500px] custom-scrollbar">
                      <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                        <code>{generatedMarkdown}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Before vs After view */}
                  {exampleMarkdown && (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400" /> {t.compareTitle}
                      </h3>
                      <p className="text-sm text-slate-400 mb-6">{t.compareDesc}</p>
                      
                      <div className="space-y-6 flex-1 overflow-auto custom-scrollbar pr-2 pb-4">
                        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-slate-600"></div>
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.originalText}</h4>
                          <p className="text-slate-300 text-sm leading-relaxed italic opacity-80">
                            &ldquo;We are launching our new project next week. We hope you like it. Please feel free to give us feedback.&rdquo;
                          </p>
                        </div>

                        <div className="flex justify-center text-slate-600">
                          <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
                        </div>

                        <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
                            {lang === 'th' ? 'คุณลักษณะ Persona ที่ใช้' : lang === 'de' ? 'Angewandte Persona-Attribute' : 'Applied Persona Attributes'}
                          </h4>
                          <ul className="text-slate-300 text-sm leading-relaxed list-disc pl-4 space-y-1">
                            {Object.values(answers).map((ans, idx) => (
                              <li key={idx} className="opacity-90">
                                {ans[lang] || ans.en || ans}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex justify-center text-slate-600">
                          <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
                        </div>

                        <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">{t.personaText}</h4>
                          <div className="text-slate-200 text-sm leading-relaxed prose prose-invert prose-indigo max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                            <ReactMarkdown>
                              {exampleMarkdown.replace(/#.*$/gm, '').trim()}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-8">
                  <button
                    onClick={handleReset}
                    className="text-slate-500 hover:text-white transition-colors font-medium flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t.reset}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>Persona Builder v{__APP_VERSION__} &mdash; Inspired by Warroom's philosophy</span>
          <span>6-Dimension Deep Analysis Framework</span>
        </div>
      </footer>
    </div>
  );
}
