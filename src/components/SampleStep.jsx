import { Plus, Trash2, ArrowLeft, Sparkles } from 'lucide-react';
import { PLATFORMS } from '../data/questionFlow';

export default function SampleStep({ samples, onAdd, onRemove, onUpdate, onBack, onGenerate, t }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
      <div className="space-y-3 text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">{t.samplesTitle}</h2>
        <p className="text-[var(--color-text-secondary)]">
          {t.samplesSub1}
          <span className="text-[var(--color-accent)] block mt-1">{t.samplesSub2}</span>
        </p>
      </div>

      <div className="space-y-8">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className="bg-white border border-[var(--color-border)] p-5 sm:p-8 rounded-3xl relative group transition-all shadow-sm hover:shadow-md"
          >
            {samples.length > 1 && (
              <button
                onClick={() => onRemove(sample.id)}
                className="absolute top-5 right-5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors p-2 bg-[var(--color-surface-sunken)] rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="mb-6">
              <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-3">{t.sourceLabel}</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = sample.source === platform.id;
                  const btnStyle = isSelected
                    ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/15'
                    : 'bg-[var(--color-surface-sunken)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]';
                  return (
                    <button
                      key={platform.id}
                      onClick={() => onUpdate(sample.id, 'source', platform.id)}
                      className={'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] touch-manipulation ' + btnStyle}
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
                  onChange={(e) => onUpdate(sample.id, 'customSource', e.target.value)}
                  className="w-full bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all text-base"
                />
              </div>
            )}

            <div>
              <textarea
                placeholder={t.textPlaceholder}
                value={sample.text}
                onChange={(e) => onUpdate(sample.id, 'text', e.target.value)}
                rows={6}
                className="w-full bg-[var(--color-surface-sunken)] border border-[var(--color-border)] rounded-xl p-5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all resize-none placeholder:text-[var(--color-text-muted)] text-base"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] py-5 rounded-3xl transition-all font-bold text-lg mt-6 min-h-[56px] touch-manipulation"
      >
        <Plus className="w-6 h-6" /> {t.addSample}
      </button>

      <div className="flex justify-between pt-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-6 py-4 rounded-2xl font-medium transition-colors min-h-[56px] touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5" /> {t.backButton}
        </button>
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-white px-8 sm:px-10 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105 active:scale-95 min-h-[56px] touch-manipulation"
        >
          <Sparkles className="w-5 h-5" /> {t.generateButton}
        </button>
      </div>
    </div>
  );
}
