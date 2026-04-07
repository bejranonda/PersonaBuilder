import { HelpCircle, X } from 'lucide-react';

export default function ScenarioPanel({ helpExample, isOpen, onToggle, lang }) {
  if (!helpExample) return null;
  const text = helpExample[lang] || helpExample.en;

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors py-1 mt-1 min-h-[36px] touch-manipulation"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
        {isOpen ? (lang === 'th' ? 'ปิด' : lang === 'de' ? 'Schließen' : 'Close') : (lang === 'th' ? 'ดูตัวอย่าง' : lang === 'de' ? 'Beispiel' : 'See example')}
      </button>
      <div className={`scenario-panel ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="bg-[var(--color-accent-soft)]/60 border border-[var(--color-accent)]/10 rounded-xl p-3 mt-0.5 border-l-4 border-l-[var(--color-accent)]">
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0 mt-0.5">💡</span>
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
