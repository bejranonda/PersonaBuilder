import { Pen, Briefcase, FlaskConical, Palette } from 'lucide-react';

const OBJECTIVE_CATEGORIES = [
  {
    id: 'creative',
    icon: Pen,
    color: 'var(--color-accent)',
    colorSoft: 'var(--color-accent-soft)',
    items: [
      { id: 'blog_writing', emoji: '📝' },
      { id: 'storytelling', emoji: '📖' },
      { id: 'copywriting', emoji: '✍️' },
      { id: 'social_media', emoji: '📱' },
    ]
  },
  {
    id: 'business',
    icon: Briefcase,
    color: 'var(--color-agent)',
    colorSoft: 'var(--color-agent-soft)',
    items: [
      { id: 'customer_support', emoji: '💬' },
      { id: 'sales', emoji: '🤝' },
      { id: 'corporate_comms', emoji: '📋' },
      { id: 'email_writing', emoji: '✉️' },
    ]
  },
  {
    id: 'technical',
    icon: FlaskConical,
    color: '#00B894',
    colorSoft: '#E8FBF5',
    items: [
      { id: 'tech_docs', emoji: '📄' },
      { id: 'research', emoji: '🔬' },
      { id: 'code_review', emoji: '💻' },
      { id: 'education', emoji: '🎓' },
    ]
  },
  {
    id: 'brand',
    icon: Palette,
    color: 'var(--color-accent-secondary)',
    colorSoft: 'var(--color-accent-secondary-soft)',
    items: [
      { id: 'brand_voice', emoji: '🎨' },
      { id: 'media_production', emoji: '🎬' },
      { id: 'pr_crisis', emoji: '📢' },
      { id: 'community', emoji: '👥' },
    ]
  }
];

export default function ObjectiveSelector({ objective, onSelect, lang, t }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
          {t.objectiveTitle}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm">
          {t.objectiveSubText}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OBJECTIVE_CATEGORIES.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <div key={cat.id} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>
                  {t[`objCat_${cat.id}`]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map((item) => {
                  const isSelected = objective === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={`text-left p-3 rounded-xl border-2 transition-all text-sm font-medium min-h-[56px] touch-manipulation ${
                        isSelected
                          ? 'shadow-md'
                          : 'border-[var(--color-border)] bg-white hover:shadow-md'
                      }`}
                      style={isSelected ? {
                        borderColor: cat.color,
                        backgroundColor: cat.colorSoft,
                        color: cat.color,
                      } : {}}
                    >
                      <span className="text-base mr-1.5">{item.emoji}</span>
                      <span className={isSelected ? '' : 'text-[var(--color-text-primary)]'}>
                        {t[`obj_${item.id}`]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!objective && (
        <p className="text-center text-xs text-[var(--color-text-muted)] italic mt-2">
          {t.objectiveSkipHint}
        </p>
      )}
    </div>
  );
}

export { OBJECTIVE_CATEGORIES };
