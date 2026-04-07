import { useState } from 'react';
import { X, Download, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { generateContentStream, stripMarkdownFences } from '../lib/api';
import { SOUL_TRANSFORM_PROMPT } from '../hooks/usePersonaGenerator';
import ReactMarkdown from 'react-markdown';

const LANG_NAMES = { en: 'English', th: 'Thai', de: 'German' };

export default function TransformModal({ isOpen, onClose, personaMd, lang, t }) {
  const [soulMd, setSoulMd] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleTransform = async () => {
    setIsTransforming(true);
    setError('');
    setSoulMd('');
    let raw = '';

    try {
      await generateContentStream(
        `[PERSONA.MD CONTENT]\n${personaMd}\n\nTransform this into SOUL.md format in ${LANG_NAMES[lang]}.`,
        lang,
        (chunk) => { raw += chunk; setSoulMd(stripMarkdownFences(raw)); },
        { maxTokens: 2048, systemPrompt: SOUL_TRANSFORM_PROMPT, retries: 2 }
      );
      setSoulMd(stripMarkdownFences(raw));
    } catch (err) {
      setError(t.aiError);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(soulMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!soulMd) return;
    const blob = new Blob([soulMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'SOUL.md';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[var(--color-border)] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{t.transformTitle}</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">{t.transformDesc}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--color-surface-sunken)] rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          >
            <X className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-5 custom-scrollbar">
          {!soulMd && !isTransforming && (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-secondary)] mb-6">{t.transformReadyDesc}</p>
              <button
                onClick={handleTransform}
                className="bg-[var(--color-accent-secondary)] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity shadow-md min-h-[48px] touch-manipulation"
              >
                {t.transformStart}
              </button>
            </div>
          )}
          {isTransforming && !soulMd && (
            <div className="flex items-center gap-2 text-[var(--color-accent)] animate-pulse py-12 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" /> {t.transforming}
            </div>
          )}
          {soulMd && (
            <div className="prose prose-persona max-w-none text-sm">
              <ReactMarkdown>{soulMd}</ReactMarkdown>
            </div>
          )}
          {error && (
            <div className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)]/20 text-[var(--color-danger)] p-4 rounded-xl text-sm mt-4">{error}</div>
          )}
        </div>

        {/* Footer */}
        {soulMd && (
          <div className="flex gap-3 p-5 border-t border-[var(--color-border)]">
            <button onClick={handleCopy}
              className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)] py-3 rounded-xl hover:bg-[var(--color-border)] transition-colors font-bold min-h-[48px] touch-manipulation"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" /> : <Copy className="w-5 h-5" />}
              {copied ? t.copied : t.copy}
            </button>
            <button onClick={handleDownload}
              className="flex-1 flex justify-center items-center gap-2 bg-[var(--color-accent-secondary)] text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-bold shadow-md min-h-[48px] touch-manipulation"
            >
              <Download className="w-5 h-5" /> SOUL.md
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
