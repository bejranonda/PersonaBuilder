import { useState, useEffect, useRef } from 'react';
import { QUESTION_FLOW } from './data/questionFlow';
import { DICTIONARY } from './lib/i18n';
import usePersonaWizard from './hooks/usePersonaWizard';
import usePersonaGenerator from './hooks/usePersonaGenerator';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import TypeSelector from './components/TypeSelector';
import QuestionStep from './components/QuestionStep';
import SampleStep from './components/SampleStep';
import ResultStep from './components/ResultStep';

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

export default function App() {
  const [lang, setLang] = useState(detectBrowserLang);
  const t = DICTIONARY[lang];
  const topRef = useRef(null);

  const wizard = usePersonaWizard();
  const generator = usePersonaGenerator(wizard.personaType, wizard.answers, wizard.samples, lang, t);

  // Persist language preference
  useEffect(() => {
    try { localStorage.setItem('pb-lang', lang); } catch { /* noop */ }
    document.documentElement.lang = lang === 'th' ? 'th' : lang === 'de' ? 'de' : 'en';
  }, [lang]);

  const handleGenerate = () => generator.handleGenerate(wizard.setStep, topRef);
  const handleReset = () => { wizard.handleReset(); generator.resetGenerator(); };
  const handleRegenerate = () => generator.handleGenerate(wizard.setStep, topRef);

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent)]/20 flex flex-col texture-grain">
      <AppHeader step={wizard.step} lang={lang} setLang={setLang} t={t} />

      <main ref={topRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 w-full relative">
        {/* Step 1: Type + Objective Selection */}
        {wizard.step === 1 && (
          <TypeSelector
            personaType={wizard.personaType}
            objective={wizard.objective}
            onTypeSelect={wizard.handleTypeSelect}
            onObjectiveSelect={wizard.handleObjectiveSelect}
            onNext={() => wizard.setStep(2)}
            lang={lang}
            t={t}
          />
        )}

        {/* Step 2: Questions */}
        {wizard.step === 2 && wizard.currentQId && QUESTION_FLOW[wizard.personaType]?.[wizard.currentQId] && (
          <QuestionStep
            personaType={wizard.personaType}
            currentQId={wizard.currentQId}
            answers={wizard.answers}
            objective={wizard.objective}
            onAnswer={wizard.handleAnswerSelect}
            onNext={() => wizard.handleNextQuestion(topRef)}
            onPrev={() => wizard.handlePrevQuestion(topRef)}
            questionProgress={wizard.questionProgress}
            lang={lang}
            t={t}
          />
        )}

        {/* Step 3: Writing Samples */}
        {wizard.step === 3 && (
          <SampleStep
            samples={wizard.samples}
            onAdd={wizard.addSample}
            onRemove={wizard.removeSample}
            onUpdate={wizard.updateSample}
            onBack={() => wizard.setStep(2)}
            onGenerate={handleGenerate}
            t={t}
          />
        )}

        {/* Step 4: Result */}
        {wizard.step === 4 && (
          <ResultStep
            isGenerating={generator.isGenerating}
            generatedMarkdown={generator.generatedMarkdown}
            fallbackMarkdown={generator.fallbackMarkdown}
            personaSummary={generator.personaSummary}
            examplePrompt={generator.examplePrompt}
            exampleBefore={generator.exampleBefore}
            exampleAfter={generator.exampleAfter}
            activeTab={generator.activeTab}
            setActiveTab={generator.setActiveTab}
            error={generator.error}
            copied={generator.copied}
            generationPhase={generator.generationPhase}
            elapsedSeconds={generator.elapsedSeconds}
            onCopy={generator.handleCopy}
            onDownload={generator.handleDownload}
            onReset={handleReset}
            onRegenerate={handleRegenerate}
            personaType={wizard.personaType}
            answers={wizard.answers}
            lang={lang}
            t={t}
          />
        )}
      </main>

      <AppFooter />
    </div>
  );
}
