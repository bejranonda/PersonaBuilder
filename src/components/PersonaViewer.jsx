import { FileText, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function PersonaViewer({ generatedMarkdown, fallbackMarkdown, isGenerating, t }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-lg relative h-[500px] flex flex-col mb-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-[var(--color-surface-sunken)] px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-2 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]/70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]/70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-success)]/70" />
        </div>
        <span className="ml-4 text-sm font-mono text-[var(--color-text-muted)] flex items-center gap-2">
          <FileText className="w-4 h-4" /> persona.md
        </span>
      </div>
      <div className="p-5 sm:p-8 overflow-auto flex-1 custom-scrollbar">
        <div className="text-[var(--color-text-primary)] text-sm leading-relaxed prose prose-persona max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-[var(--color-text-primary)] prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface-sunken)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[var(--color-surface-sunken)] prose-pre:border prose-pre:border-[var(--color-border)] prose-li:marker:text-[var(--color-text-muted)]">
          {(generatedMarkdown || fallbackMarkdown) ? (
            <>
              {!generatedMarkdown && isGenerating && fallbackMarkdown && (
                <div className="bg-[var(--color-warning-soft)] border border-[var(--color-warning)]/30 text-[var(--color-accent-secondary)] text-xs px-3 py-2 rounded-lg flex items-center gap-2 mb-4">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t.enhancingNote}
                </div>
              )}
              <ReactMarkdown>{generatedMarkdown || fallbackMarkdown}</ReactMarkdown>
            </>
          ) : (
            <div className="flex items-center gap-2 text-[var(--color-accent)] animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" /> {t.generatingSub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
