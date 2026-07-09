import { useState } from 'react';
import { FileText, Loader2, Copy, Download, CheckCircle2, Eye, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function PersonaViewer({ generatedMarkdown, fallbackMarkdown, isGenerating, onCopy, onDownload, copied, t }) {
  const [showRaw, setShowRaw] = useState(false);
  const content = generatedMarkdown || fallbackMarkdown;

  const toggleBase = 'flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-colors touch-manipulation';
  const toggleActive = 'bg-white text-[var(--color-accent)] shadow-sm';
  const toggleInactive = 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]';

  return (
    <div className="bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden shadow-lg relative h-[500px] flex flex-col mb-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-[var(--color-surface-sunken)] px-4 py-2.5 border-b border-[var(--color-border)] flex items-center gap-2 shrink-0">
        <div className="hidden sm:flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-danger)]/70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-warning)]/70" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-success)]/70" />
        </div>
        <span className="sm:ml-4 text-sm font-mono text-[var(--color-text-muted)] flex items-center gap-2">
          <FileText className="w-4 h-4" /> persona.md
        </span>

        {content && (
          <div className="ml-auto flex items-center gap-2">
            {/* Preview / Raw Markdown toggle */}
            <div className="flex bg-[var(--color-border)]/60 p-0.5 rounded-lg" role="group" aria-label={t.tabPersona}>
              <button
                onClick={() => setShowRaw(false)}
                className={`${toggleBase} ${!showRaw ? toggleActive : toggleInactive}`}
                aria-pressed={!showRaw}
              >
                <Eye className="w-3.5 h-3.5" /> {t.viewPreview}
              </button>
              <button
                onClick={() => setShowRaw(true)}
                className={`${toggleBase} ${showRaw ? toggleActive : toggleInactive}`}
                aria-pressed={showRaw}
              >
                <Code className="w-3.5 h-3.5" /> {t.viewMarkdown}
              </button>
            </div>

            {/* Copy + Download actions, always visible next to the file */}
            <button
              onClick={onCopy}
              title={t.copy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-border)]/60 transition-colors touch-manipulation"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? t.copied : t.copy}</span>
            </button>
            <button
              onClick={onDownload}
              title={`${t.download} persona.md`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-sm transition-colors touch-manipulation"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.download}</span> .md
            </button>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-8 overflow-auto flex-1 custom-scrollbar">
        {content ? (
          <>
            {!generatedMarkdown && isGenerating && fallbackMarkdown && (
              <div className="bg-[var(--color-warning-soft)] border border-[var(--color-warning)]/30 text-[var(--color-accent-secondary)] text-xs px-3 py-2 rounded-lg flex items-center gap-2 mb-4">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t.enhancingNote}
              </div>
            )}
            {showRaw ? (
              <pre className="font-mono text-xs leading-relaxed text-[var(--color-text-primary)] whitespace-pre-wrap break-words bg-[var(--color-surface-code)] border border-[var(--color-border)] rounded-xl p-4">
                {content}
              </pre>
            ) : (
              <div className="text-[var(--color-text-primary)] text-sm leading-relaxed prose prose-persona max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-[var(--color-text-primary)] prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface-sunken)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[var(--color-surface-sunken)] prose-pre:border prose-pre:border-[var(--color-border)] prose-li:marker:text-[var(--color-text-muted)]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-[var(--color-accent)] animate-pulse text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> {t.generatingSub}
          </div>
        )}
      </div>
    </div>
  );
}
