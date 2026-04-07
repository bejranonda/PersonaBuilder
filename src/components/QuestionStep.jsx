import { useState } from 'react';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { QUESTION_FLOW } from '../data/questionFlow';
import ScenarioPanel from './ScenarioPanel';

export default function QuestionStep({ personaType, currentQId, answers, objective, onAnswer, onNext, onPrev, questionProgress, lang, t }) {
  const [openScenarioIdx, setOpenScenarioIdx] = useState(null);
  const questionData = QUESTION_FLOW[personaType]?.[currentQId];
  if (!questionData) return null;

  const handleScenarioToggle = (idx) => {
    setOpenScenarioIdx(openScenarioIdx === idx ? null : idx);
  };

  // Check if option is recommended for the selected objective
  const isRecommended = (option) => {
    if (!objective) return false;
    const filter = QUESTION_FLOW.objectiveFilter?.[objective];
    if (!filter?.recommendedTags) return false;
    const tagEn = option.tag?.en || '';
    return filter.recommendedTags.includes(tagEn);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[50vh]">
      <div className="mb-8 flex items-center gap-4 text-sm font-medium text-[var(--color-text-muted)]">
        <button
          onClick={onPrev}
          className="hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1 bg-[var(--color-surface-sunken)] px-3 py-1.5 rounded-lg min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" /> {t.backButton}
        </button>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        {questionProgress && (
          <span className="text-[var(--color-text-muted)] text-xs font-mono bg-[var(--color-surface-sunken)] px-2 py-1 rounded-lg">
            {questionProgress.current} / {questionProgress.total}
          </span>
        )}
      </div>

      <div key={currentQId} className="flex-1 animate-in fade-in slide-in-from-right-8 duration-500">
        <div className="mb-10 text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-widest mb-4 border border-[var(--color-accent)]/15">
            {questionData.dimension[lang] || questionData.dimension.en}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] leading-snug">
            {questionData.question[lang] || questionData.question.en}
          </h2>
        </div>

        <div className="space-y-4">
          {questionData.options.map((option, idx) => {
            const labelText = option.label[lang] || option.label.en;
            const tagText = option.tag ? (option.tag[lang] || option.tag.en) : null;
            const isSelected = answers[currentQId] === option.label;
            const recommended = isRecommended(option);

            const selectedStyle = isSelected
              ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-md shadow-[var(--color-accent)]/8'
              : 'border-[var(--color-border)] bg-white hover:border-[var(--color-accent)]/40 hover:shadow-md';
            const textStyle = isSelected
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-text-primary)]';
            const radioStyle = isSelected
              ? 'border-[var(--color-accent)]'
              : 'border-[var(--color-border)]';

            return (
              <div key={idx}>
                <button
                  onClick={() => onAnswer(option.label)}
                  className={'w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all flex flex-col gap-2 group min-h-[56px] touch-manipulation ' + selectedStyle}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {tagText && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                            {tagText}
                          </span>
                        )}
                        {recommended && !isSelected && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--color-recommended)] bg-[var(--color-recommended-soft)] px-2 py-0.5 rounded-full recommend-pulse">
                            <Award className="w-3 h-3" />
                            {lang === 'th' ? 'แนะนำ' : lang === 'de' ? 'Empfohlen' : 'Recommended'}
                          </span>
                        )}
                      </div>
                      <span className={'text-base sm:text-lg font-medium leading-normal ' + textStyle}>
                        {labelText}
                      </span>
                    </div>
                    <div className={'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ml-4 ' + radioStyle}>
                      {isSelected && <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full" />}
                    </div>
                  </div>
                </button>
                <ScenarioPanel
                  helpExample={option.helpExample}
                  isOpen={openScenarioIdx === idx}
                  onToggle={() => handleScenarioToggle(idx)}
                  lang={lang}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!answers[currentQId]}
          className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[var(--color-accent-hover)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-[var(--color-accent)]/20 min-h-[56px] touch-manipulation"
        >
          {t.nextButton} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
