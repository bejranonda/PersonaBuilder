import { MessageSquare, Puzzle, Code2, FolderOpen, Terminal, ExternalLink } from 'lucide-react';

const APPS = [
  { id: 'gemini', icon: MessageSquare, color: '#4285F4', hasTransform: false, link: null },
  { id: 'openclaw', icon: Puzzle, color: '#E17055', hasTransform: true, link: 'https://docs.openclaw.ai/reference/templates/SOUL' },
  { id: 'cursor', icon: Code2, color: '#00B894', hasTransform: false, link: null },
  { id: 'claude', icon: FolderOpen, color: '#6C5CE7', hasTransform: false, link: null },
  { id: 'api', icon: Terminal, color: '#636E72', hasTransform: false, link: null },
];

export default function ApplicationGuide({ onTransform, t }) {
  return (
    <div className="bg-gradient-to-r from-[var(--color-accent-soft)] to-[var(--color-accent-secondary-soft)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-6 mb-6 animate-in fade-in duration-300">
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
        {t.appGuideTitle}
      </h3>
      <p className="text-xs text-[var(--color-text-secondary)] mb-4">{t.appGuideDesc}</p>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory custom-scrollbar">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <div key={app.id} className="flex-shrink-0 w-[200px] sm:w-auto sm:flex-1 snap-start bg-white rounded-2xl border border-[var(--color-border)] p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: app.color + '15', color: app.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-[var(--color-text-primary)]">{t[`app_${app.id}_title`]}</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">{t[`app_${app.id}_desc`]}</p>
              <div className="flex gap-2">
                {app.hasTransform && (
                  <button
                    onClick={onTransform}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors min-h-[36px] touch-manipulation"
                    style={{ backgroundColor: app.color + '15', color: app.color }}
                  >
                    {t.transformButton}
                  </button>
                )}
                {app.link && (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 min-h-[36px] touch-manipulation"
                  >
                    {t.learnMore} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
