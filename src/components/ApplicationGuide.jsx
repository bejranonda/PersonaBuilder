import { useState } from 'react';
import { MessageSquare, Puzzle, Code2, FolderOpen, Terminal, ChevronDown, ExternalLink } from 'lucide-react';

const APPS = [
  { id: 'ai_chat', icon: MessageSquare, color: '#4285F4', hasTransform: false },
  { id: 'agent_framework', icon: Puzzle, color: '#E17055', hasTransform: true, link: 'https://docs.openclaw.ai/reference/templates/SOUL' },
  { id: 'ide_platform', icon: Code2, color: '#00B894', hasTransform: false },
  { id: 'ai_workspace', icon: FolderOpen, color: '#6C5CE7', hasTransform: false },
  { id: 'api_integration', icon: Terminal, color: '#636E72', hasTransform: false },
];

export default function ApplicationGuide({ onTransform, t }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-r from-[var(--color-accent-soft)] to-[var(--color-accent-secondary-soft)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-6 mb-6 animate-in fade-in duration-300">
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
        {t.appGuideTitle}
      </h3>
      <p className="text-xs text-[var(--color-text-secondary)] mb-4">{t.appGuideDesc}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {APPS.map((app) => {
          const Icon = app.icon;
          const isExpanded = expandedId === app.id;
          return (
            <div key={app.id} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-all">
              {/* Card header — clickable */}
              <button
                onClick={() => toggleExpand(app.id)}
                className="w-full text-left p-4 flex items-start gap-3 min-h-[56px] touch-manipulation"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: app.color + '15', color: app.color }}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">{t[`app_${app.id}_title`]}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[var(--color-text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-0.5">{t[`app_${app.id}_desc`]}</p>
                  {/* Example platforms */}
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{t[`app_${app.id}_examples`]}</p>
                </div>
              </button>

              {/* Expandable accordion content */}
              <div className={`guide-accordion ${isExpanded ? 'open' : ''}`}>
                <div>
                  <div className="px-4 pb-4 pt-0 border-t border-[var(--color-border-light)]">
                    <div className="pt-3 space-y-2">
                      {/* Steps */}
                      {t[`app_${app.id}_steps`]?.map((step, i) => (
                        <div key={i} className="flex gap-2 text-xs">
                          <span className="font-bold shrink-0" style={{ color: app.color }}>{i + 1}.</span>
                          <span className="text-[var(--color-text-secondary)] leading-relaxed">{step}</span>
                        </div>
                      ))}
                      {/* Code snippet */}
                      {t[`app_${app.id}_code`] && (
                        <pre className="guide-code mt-2">{t[`app_${app.id}_code`]}</pre>
                      )}
                      {/* Action buttons */}
                      <div className="flex gap-2 mt-2 pt-1">
                        {app.hasTransform && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onTransform(); }}
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
