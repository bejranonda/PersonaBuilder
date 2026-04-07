import { HelpCircle, X } from 'lucide-react';

export default function ScenarioPanel({ helpExample, isOpen, onToggle, lang }) {
  if (!helpExample) return null;
  const text = helpExample[lang] || helpExample.en;

  return (
    <div className="mt-1">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors py-1 min-h-[44px] touch-manipulation"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
        {isOpen ? (lang === 'th' ? 'ปิด' : lang === 'de' ? 'Schließen' : 'Close') : (lang === 'th' ? 'ดูตัวอย่าง' : lang === 'de' ? 'Beispiel ansehen' : 'See example')}
      </button>
      <div className={`scenario-panel ${isOpen ? 'open' : ''}`}>
        <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/15 rounded-xl p-4 mt-1 border-l-4 border-l-[var(--color-accent)]">
          <div className="flex items-start gap-2">
            <span className="text-lg shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
