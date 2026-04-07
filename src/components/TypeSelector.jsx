import { User, Bot, CheckCircle2, ArrowRight } from 'lucide-react';
import ObjectiveSelector from './ObjectiveSelector';

export default function TypeSelector({ personaType, objective, onTypeSelect, onObjectiveSelect, onNext, lang, t }) {
  const cloneCardClass = personaType === 'clone'
    ? 'border-[var(--color-clone)] bg-[var(--color-clone-soft)] shadow-lg shadow-[var(--color-clone)]/8'
    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-clone)]/40 hover:shadow-md';
  const agentCardClass = personaType === 'agent'
    ? 'border-[var(--color-agent)] bg-[var(--color-agent-soft)] shadow-lg shadow-[var(--color-agent)]/8'
    : 'border-[var(--color-border)] bg-white hover:border-[var(--color-agent)]/40 hover:shadow-md';
  const cloneIconClass = personaType === 'clone'
    ? 'bg-[var(--color-clone)] text-white' : 'bg-[var(--color-clone-soft)] text-[var(--color-clone)]';
  const agentIconClass = personaType === 'agent'
    ? 'bg-[var(--color-agent)] text-white' : 'bg-[var(--color-agent-soft)] text-[var(--color-agent)]';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">{t.typeSelectionTitle}</h2>
        <p className="text-[var(--color-text-secondary)] text-lg">
          {t.typeSelectionSubText} <code className="bg-[var(--color-surface-sunken)] px-2 py-1 rounded-md text-sm text-[var(--color-accent)] border border-[var(--color-border)]">persona.md</code>
        </p>
      </div>

      {/* Objective Selection (sub-step) */}
      <ObjectiveSelector objective={objective} onSelect={onObjectiveSelect} lang={lang} t={t} />

      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">{t.thenChooseType}</span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Type Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onTypeSelect('clone')}
          className={'relative overflow-hidden group p-6 sm:p-8 rounded-3xl border-2 transition-all text-left min-h-[56px] touch-manipulation ' + cloneCardClass}
        >
          <div className={'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ' + cloneIconClass}>
            <User className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-3">{t.cloneTitle}</h3>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">{t.cloneDesc}</p>
          {personaType === 'clone' && (
            <div className="absolute top-6 right-6 text-[var(--color-clone)] animate-in zoom-in duration-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          )}
        </button>

        <button
          onClick={() => onTypeSelect('agent')}
          className={'relative overflow-hidden group p-6 sm:p-8 rounded-3xl border-2 transition-all text-left min-h-[56px] touch-manipulation ' + agentCardClass}
        >
          <div className={'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ' + agentIconClass}>
            <Bot className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] mb-3">{t.agentTitle}</h3>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">{t.agentDesc}</p>
          {personaType === 'agent' && (
            <div className="absolute top-6 right-6 text-[var(--color-agent)] animate-in zoom-in duration-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          )}
        </button>
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={onNext}
          disabled={!personaType}
          className="flex items-center gap-2 bg-[var(--color-text-primary)] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[var(--color-text-primary)]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 min-h-[56px] touch-manipulation shadow-lg"
        >
          {t.startButton} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
