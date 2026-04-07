import { useState } from 'react';
import { Loader2, CheckCircle2, AlertTriangle, Copy, Download, ArrowLeft, Sparkles, User } from 'lucide-react';
import { QUESTION_FLOW } from '../data/questionFlow';
import ReactMarkdown from 'react-markdown';
import PersonaViewer from './PersonaViewer';
import ApplicationGuide from './ApplicationGuide';
import TransformModal from './TransformModal';

export default function ResultStep({
  isGenerating, isGeneratingExtras, extrasLoaded,
  generatedMarkdown, fallbackMarkdown,
  personaSummary, examplePrompt, exampleBefore, exampleAfter,
  activeTab, setActiveTab, error, copied, generationPhase, elapsedSeconds,
  onCopy, onDownload, onReset, onRegenerate, onGenerateExtras,
  personaType, answers, lang, t
}) {
  const [showTransform, setShowTransform] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if ((tab === 'summary' || tab === 'example') && !extrasLoaded && !isGeneratingExtras) {
      onGenerateExtras();
    }
  };

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      {/* Status Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-5 sm:p-8 rounded-3xl border border-[var(--color-border)] shadow-sm">
        <div>
          {isGenerating ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-sm font-bold mb-3 border border-[var(--color-accent)]/15">
                <Loader2 className="w-4 h-4 animate-spin" />
                {generationPhase === 'extras' ? t.phaseExtras : t.phaseEnhancing}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[var(--color-text-muted)] text-xs font-mono bg-[var(--color-surface-sunken)] px-2 py-1 rounded-lg">{elapsedSeconds}s</span>
                {(generatedMarkdown || fallbackMarkdown) && (
                  <span className="text-[var(--color-success)] text-xs font-medium">✓ {t.downloadAvailable}</span>
                )}
              </div>
            </>
          ) : generationPhase === 'timeout' ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warning-soft)] text-[var(--color-accent-secondary)] text-sm font-bold mb-3 border border-[var(--color-warning)]/30">
                <AlertTriangle className="w-4 h-4" /> {t.phaseTimeout}
              </div>
              <p className="text-[var(--color-text-secondary)] mt-1 text-sm">{t.timeoutSub}</p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-success-soft)] text-[var(--color-success)] text-sm font-bold mb-3 border border-[var(--color-success)]/20">
                <CheckCircle2 className="w-4 h-4" /> {t.successTitle}
              </div>
              <p className="text-[var(--color-text-secondary)] mt-1 text-sm">{t.successSub}</p>
            </>
          )}
        </div>

        {(generatedMarkdown || fallbackMarkdown) && (
          <div className="flex flex-wrap gap-3">
            <button onClick={onCopy}
              className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)] px-6 py-3 rounded-xl hover:bg-[var(--color-border)] transition-colors font-bold min-h-[48px] touch-manipulation"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" /> : <Copy className="w-5 h-5" />}
              {copied ? t.copied : t.copy}
            </button>
            <button onClick={onDownload}
              className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors shadow-md shadow-[var(--color-accent)]/15 font-bold min-h-[48px] touch-manipulation"
            >
              <Download className="w-5 h-5" /> {t.download}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)]/20 text-[var(--color-danger)] p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Application Guide */}
      {!isGenerating && (generatedMarkdown || fallbackMarkdown) && (
        <ApplicationGuide onTransform={() => setShowTransform(true)} t={t} />
      )}

      {/* Tabs */}
      <div className="flex bg-[var(--color-surface-sunken)] p-1.5 rounded-2xl border border-[var(--color-border)] w-full max-w-lg mx-auto md:mx-0">
        <button onClick={() => handleTabClick('persona')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all min-h-[44px] touch-manipulation ${activeTab === 'persona' ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
        >{t.tabPersona}</button>
        <button onClick={() => handleTabClick('summary')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all min-h-[44px] touch-manipulation ${activeTab === 'summary' ? 'bg-[var(--color-clone)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
        >{t.tabSummary}</button>
        <button onClick={() => handleTabClick('example')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all min-h-[44px] touch-manipulation ${activeTab === 'example' ? 'bg-[var(--color-agent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
        >{t.tabExample}</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'persona' && (
        <PersonaViewer generatedMarkdown={generatedMarkdown} fallbackMarkdown={fallbackMarkdown} isGenerating={isGenerating} t={t} />
      )}

      {activeTab === 'summary' && (
        <div className="bg-white border border-[var(--color-border)] rounded-3xl p-5 sm:p-8 shadow-sm relative h-[500px] flex flex-col mb-6 animate-in fade-in zoom-in-95 duration-300">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--color-clone)]" /> {t.tabSummary}
          </h3>
          <div className="overflow-auto custom-scrollbar pr-2 flex-1 space-y-6">
            <div className="text-[var(--color-text-primary)] text-sm leading-relaxed prose prose-persona max-w-none">
              {personaSummary ? <ReactMarkdown>{personaSummary}</ReactMarkdown> : (
                <div className="flex items-center gap-2 text-[var(--color-accent)] animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> {t.generatingSub}</div>
              )}
            </div>
            <div className="bg-[var(--color-clone-soft)] border border-[var(--color-clone)]/15 rounded-2xl p-5 relative overflow-hidden mt-6">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-clone)]" />
              <h4 className="text-xs font-bold text-[var(--color-clone)] uppercase tracking-wider mb-3 pl-3">{t.appliedAttributes}</h4>
              <ul className="text-[var(--color-text-primary)] text-sm leading-relaxed list-disc pl-7 space-y-2">
                {Object.entries(answers).map(([qId, ans], idx) => {
                  const qObj = QUESTION_FLOW[personaType]?.[qId];
                  const opt = qObj?.options.find((o) => o.label === ans);
                  const tag = opt?.tag ? (opt.tag[lang] || opt.tag.en) : null;
                  const ansLabel = opt?.label?.[lang] || opt?.label?.en || ans;
                  return (
                    <li key={idx}>
                      {tag && <strong className="text-[var(--color-clone)] mr-1 bg-[var(--color-clone-soft)] px-1 py-0.5 rounded">{tag}:</strong>}
                      {ansLabel}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'example' && (
        <div className="bg-white border border-[var(--color-border)] rounded-3xl p-5 sm:p-8 shadow-sm relative h-[500px] flex flex-col mb-6 animate-in fade-in zoom-in-95 duration-300">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--color-agent)]" /> {t.compareTitle}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">{t.compareDesc}</p>
          <div className="space-y-4 flex-1 overflow-auto custom-scrollbar pr-2 pb-4">
            <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-2xl p-4">
              <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{t.examplePromptLabel}</h4>
              {examplePrompt ? (
                <p className="text-[var(--color-text-primary)] text-sm italic">&ldquo;{examplePrompt}&rdquo;</p>
              ) : <div className="h-4 bg-[var(--color-border)] rounded w-3/4 animate-pulse" />}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 text-[10px] font-bold tracking-wider px-2 py-1 bg-[var(--color-border)] text-[var(--color-text-muted)] rounded-br-lg">{t.exampleBeforeBadge}</div>
                <div className="mt-4 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {exampleBefore ? <ReactMarkdown>{exampleBefore}</ReactMarkdown> : <div className="h-20 bg-[var(--color-border)] rounded animate-pulse" />}
                </div>
              </div>
              <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 text-[10px] font-bold tracking-wider px-2 py-1 bg-[var(--color-accent)] text-white rounded-br-lg shadow-sm">{t.exampleAfterBadge}</div>
                <div className="mt-4 text-[var(--color-text-primary)] text-sm leading-relaxed prose prose-persona max-w-none">
                  {exampleAfter ? <ReactMarkdown>{exampleAfter}</ReactMarkdown> : <div className="h-20 bg-[var(--color-accent)]/10 rounded animate-pulse" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-6 pt-4">
        <button onClick={onReset} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors font-medium flex items-center gap-2 min-h-[44px] touch-manipulation">
          <ArrowLeft className="w-4 h-4" /> {t.reset}
        </button>
        <button onClick={onRegenerate}
          className="flex items-center gap-2 bg-[var(--color-surface-sunken)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] px-5 py-2 rounded-xl font-medium transition-colors border border-[var(--color-border)] min-h-[44px] touch-manipulation"
        >
          <Sparkles className="w-4 h-4" /> {t.regenerateButton}
        </button>
      </div>

      {/* Transform Modal */}
      <TransformModal
        isOpen={showTransform}
        onClose={() => setShowTransform(false)}
        personaMd={generatedMarkdown || fallbackMarkdown}
        lang={lang}
        t={t}
      />
    </div>
  );
}
