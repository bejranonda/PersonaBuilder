import { Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const LANG_FLAGS = { en: '🇬🇧', th: '🇹🇭', de: '🇩🇪' };
const LANG_NAMES = { en: 'English', th: 'Thai', de: 'German' };
const LANG_ORDER = ['en', 'th', 'de'];

export default function LanguageSwitcher({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white hover:bg-[var(--color-surface-sunken)] px-3 py-2 rounded-xl border border-[var(--color-border)] transition-all text-sm font-medium text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/30 shadow-sm"
      >
        <Globe className="w-4 h-4 text-[var(--color-accent)]" />
        <span className="hidden sm:inline">{LANG_NAMES[lang]}</span>
        <span className="inline sm:hidden">{LANG_FLAGS[lang]}</span>
        <ArrowRight className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-[var(--color-border)] rounded-2xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="p-1.5 space-y-1">
              {LANG_ORDER.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    lang === l
                      ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-bold'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-text-primary)]'
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
  );
}
