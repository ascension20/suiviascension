import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  GENERAL_SECTIONS,
  SECONDE_SUBJECTS,
  PREMIERE_SUBJECTS,
  TERMINALE_SUBJECTS,
  PROMPT_GROUPS,
  type Tag,
  type SubjectCard,
  type GeneralSection,
  type PromptGroup,
  type Prompt,
} from './methodes-data';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:       '#faf9f6',
  surface:  '#ffffff',
  surface2: '#f3f2ef',
  border:   '#e0ddd8',
  border2:  '#ccc9c2',
  text:     '#1a1916',
  muted:    '#8a8178',
  gold:     '#c9973a',
  seconde:  '#7eb8d4',
  premiere: '#c9973a',
  terminale:'#c97a5a',
} as const;

type TabId = 'general' | 'seconde' | 'premiere' | 'terminale' | 'prompts';

const TABS: { id: TabId; label: string }[] = [
  { id: 'general',   label: '⚡ Conseils généraux' },
  { id: 'seconde',   label: 'Seconde' },
  { id: 'premiere',  label: 'Première' },
  { id: 'terminale', label: 'Terminale' },
  { id: 'prompts',   label: '✦ Prompts IA' },
];

const TAG_CONFIG: Record<Tag, { label: string; color: string; bg: string }> = {
  ia:     { label: 'IA',                 color: '#9b8ecf', bg: 'rgba(155,142,207,0.15)' },
  actif:  { label: 'Rappel actif',       color: '#6aab8e', bg: 'rgba(106,171,142,0.15)' },
  espace: { label: 'Répétition espacée', color: '#c9973a', bg: 'rgba(201,151,58,0.15)'  },
};

// ── General Tab ───────────────────────────────────────────────────────────────
function GeneralTab({ sections }: { sections: GeneralSection[] }) {
  return (
    <div className="m-general">
      {sections.map(sec => (
        <div key={sec.title} className="m-general-section">
          <h2 className="m-section-title">{sec.title}</h2>
          <div className="m-cards-grid">
            {sec.cards.map(card => (
              <div key={card.title} className={`m-card${card.hot ? ' m-card-hot' : ''}`}>
                {card.hot && <span className="m-hot-badge">✦</span>}
                <h3 className="m-card-title">{card.title}</h3>
                <p
                  className="m-card-desc"
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Level Tab ─────────────────────────────────────────────────────────────────
function LevelTab({ subjects, color }: { subjects: SubjectCard[]; color: string }) {
  return (
    <div className="m-level">
      {subjects.map(subj => (
        <div key={subj.code} className="m-subject-card" style={{ borderLeftColor: color }}>
          <div className="m-subject-header">
            <span className="m-subject-code" style={{ color }}>{subj.code}</span>
            <span className="m-subject-name">{subj.name}</span>
          </div>
          <div className="m-categories">
            {subj.categories.map(cat => (
              <div key={cat.label} className="m-category">
                <p className="m-category-label">{cat.label}</p>
                <ul className="m-methods-list">
                  {cat.methods.map(m => (
                    <li key={m.title} className={`m-method${m.hot ? ' m-method-hot' : ''}`}>
                      <div className="m-method-header">
                        <span
                          className="m-method-icon"
                          style={{ color: m.icon === '⏱' ? C.muted : C.gold }}
                        >
                          {m.icon}
                        </span>
                        <span className="m-method-title">{m.title}</span>
                        {m.hot && <span className="m-hot-dot" />}
                      </div>
                      <p
                        className="m-method-desc"
                        dangerouslySetInnerHTML={{ __html: m.desc }}
                      />
                      {m.tags && m.tags.length > 0 && (
                        <div className="m-tags">
                          {m.tags.map(tag => {
                            const t = TAG_CONFIG[tag];
                            return (
                              <span
                                key={tag}
                                className="m-tag"
                                style={{
                                  color: t.color,
                                  background: t.bg,
                                  borderColor: t.color + '40',
                                }}
                              >
                                {t.label}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Prompts Tab ───────────────────────────────────────────────────────────────
function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`m-prompt-card${expanded ? ' m-prompt-expanded' : ''}`}>
      <div className="m-prompt-header">
        <div className="m-prompt-meta">
          <p className="m-prompt-title">{prompt.title}</p>
          <p className="m-prompt-scope">{prompt.scope}</p>
        </div>
        <div className="m-prompt-actions">
          <button className="m-prompt-btn" onClick={handleCopy} title="Copier le prompt">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>
          <button
            className="m-prompt-toggle"
            onClick={() => setExpanded(e => !e)}
            title={expanded ? 'Réduire' : 'Voir le prompt'}
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>
      {expanded && <pre className="m-prompt-text">{prompt.text}</pre>}
    </div>
  );
}

function PromptsTab({ groups }: { groups: PromptGroup[] }) {
  return (
    <div className="m-prompts">
      {groups.map(group => (
        <div key={group.label} className="m-prompt-group">
          <h2 className="m-section-title">{group.label}</h2>
          <div className="m-prompts-list">
            {group.prompts.map(p => (
              <PromptCard key={p.title} prompt={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function ResourcesTab() {
  const [activeTab, setActiveTab] = useState<TabId>('general');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        /* ── Root ── */
        .m-root {
          background: ${C.bg};
          color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: calc(100vh - 80px);
          margin: -1.5rem -1.5rem 0;
          padding: 0;
          position: relative;
        }

        /* Grain texture */
        .m-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; mix-blend-mode: multiply;
        }
        .m-root > * { position: relative; z-index: 1; }

        /* ── Stars ── */
        .m-stars { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .m-star  {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          color: ${C.gold}; line-height: 1; user-select: none;
        }

        /* ── Header ── */
        .m-header {
          text-align: center;
          padding: 2.5rem 2rem 1.5rem;
          position: relative;
        }
        .m-header::before {
          content: '';
          position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 220px;
          background: radial-gradient(ellipse at center, rgba(201,151,58,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .m-logo-label {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: ${C.muted}; margin-bottom: 0.3rem;
        }

        .m-gold-divider {
          width: 32px; height: 1px;
          background: linear-gradient(to right, transparent, ${C.gold}, transparent);
          margin: 0.4rem auto 0.8rem;
        }

        .m-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700; line-height: 0.95;
          color: ${C.text}; margin: 0 0 0.5rem;
        }
        .m-title-gold { color: ${C.gold}; font-style: italic; }

        .m-subtitle {
          color: ${C.muted}; font-size: 0.85rem; font-weight: 300;
          max-width: 420px; margin: 0 auto; line-height: 1.7;
        }

        /* ── Tab bar ── */
        .m-tabbar {
          display: flex;
          border-bottom: 1px solid ${C.border};
          padding: 0 2rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .m-tabbar::-webkit-scrollbar { display: none; }

        .m-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 400;
          letter-spacing: 0.04em;
          color: ${C.muted};
          background: transparent; border: none;
          border-bottom: 2px solid transparent;
          padding: 0.75rem 1.1rem;
          cursor: pointer;
          transition: color 0.18s, border-color 0.18s;
          white-space: nowrap; margin-bottom: -1px;
        }
        .m-tab:hover { color: ${C.text}; }
        .m-tab.m-tab-active {
          color: ${C.gold};
          border-bottom-color: ${C.gold};
          font-weight: 500;
        }

        /* ── Content ── */
        .m-content {
          padding: 2rem 2rem 3rem;
          max-width: 900px; margin: 0 auto;
        }

        .m-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 600;
          color: ${C.text}; margin: 0 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid ${C.border};
        }

        /* ── General cards ── */
        .m-general { display: flex; flex-direction: column; gap: 2.5rem; }

        .m-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .m-card {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 10px; padding: 1.2rem;
          position: relative;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .m-card:hover {
          border-color: ${C.border2};
          box-shadow: 0 2px 16px rgba(26,25,22,0.06);
        }
        .m-card-hot {
          border-color: rgba(201,151,58,0.3);
          background: linear-gradient(135deg, #fff 0%, rgba(201,151,58,0.03) 100%);
        }
        .m-hot-badge {
          position: absolute; top: 0.8rem; right: 0.9rem;
          font-family: 'Cormorant Garamond', serif;
          color: ${C.gold}; font-size: 0.9rem; opacity: 0.7;
        }
        .m-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-weight: 600;
          color: ${C.text}; margin: 0 0 0.5rem; line-height: 1.3;
        }
        .m-card-desc {
          font-size: 0.82rem; line-height: 1.7;
          color: #4a4845; margin: 0;
        }
        .m-card-desc strong { font-weight: 500; color: ${C.text}; }

        /* ── Level subjects ── */
        .m-level { display: flex; flex-direction: column; gap: 1.5rem; }

        .m-subject-card {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-left-width: 3px;
          border-radius: 10px; overflow: hidden;
        }

        .m-subject-header {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.85rem 1.2rem;
          border-bottom: 1px solid ${C.border};
          background: ${C.surface2};
        }
        .m-subject-code {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; line-height: 1;
        }
        .m-subject-name {
          font-size: 0.8rem; font-weight: 400;
          color: ${C.muted}; letter-spacing: 0.03em;
        }

        .m-categories {
          padding: 1rem 1.2rem;
          display: flex; flex-direction: column; gap: 1.2rem;
        }

        .m-category-label {
          font-size: 0.66rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: ${C.muted}; margin: 0 0 0.55rem;
        }

        .m-methods-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.65rem;
        }

        .m-method {
          padding: 0.8rem 1rem;
          background: ${C.surface2};
          border: 1px solid ${C.border};
          border-radius: 8px;
          transition: border-color 0.15s;
        }
        .m-method:hover { border-color: ${C.border2}; }
        .m-method-hot {
          border-color: rgba(201,151,58,0.25);
          background: linear-gradient(135deg, ${C.surface2} 0%, rgba(201,151,58,0.04) 100%);
        }

        .m-method-header {
          display: flex; align-items: flex-start;
          gap: 0.45rem; margin-bottom: 0.35rem;
        }
        .m-method-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; flex-shrink: 0;
          margin-top: 0.05rem; line-height: 1.3;
        }
        .m-method-title {
          font-size: 0.83rem; font-weight: 500;
          color: ${C.text}; line-height: 1.4; flex: 1;
        }
        .m-hot-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${C.gold}; flex-shrink: 0; margin-top: 0.35rem;
        }

        .m-method-desc {
          font-size: 0.79rem; line-height: 1.65;
          color: #5a5754; margin: 0 0 0.45rem;
          padding-left: 1.3rem;
        }
        .m-method-desc strong { font-weight: 500; color: ${C.text}; }

        .m-tags {
          display: flex; flex-wrap: wrap; gap: 0.3rem;
          padding-left: 1.3rem;
        }
        .m-tag {
          font-size: 0.64rem; font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.16rem 0.52rem;
          border-radius: 100px; border: 1px solid;
        }

        /* ── Prompts ── */
        .m-prompts { display: flex; flex-direction: column; gap: 2.5rem; }
        .m-prompts-list { display: flex; flex-direction: column; gap: 0.6rem; }

        .m-prompt-card {
          background: ${C.surface};
          border: 1px solid ${C.border};
          border-radius: 10px; overflow: hidden;
          transition: border-color 0.15s;
        }
        .m-prompt-card:hover { border-color: ${C.border2}; }
        .m-prompt-expanded { border-color: rgba(201,151,58,0.3) !important; }

        .m-prompt-header {
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          padding: 0.85rem 1rem;
        }
        .m-prompt-meta { flex: 1; min-width: 0; }
        .m-prompt-title {
          font-size: 0.85rem; font-weight: 500;
          color: ${C.text}; margin: 0 0 0.15rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .m-prompt-scope {
          font-size: 0.71rem; color: ${C.muted}; margin: 0;
        }

        .m-prompt-actions {
          display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;
        }
        .m-prompt-btn, .m-prompt-toggle {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: transparent;
          border: 1px solid ${C.border};
          border-radius: 6px;
          color: ${C.muted};
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 400;
          cursor: pointer; padding: 0.28rem 0.6rem;
          transition: border-color 0.15s, color 0.15s;
        }
        .m-prompt-btn:hover, .m-prompt-toggle:hover {
          border-color: ${C.gold}; color: ${C.gold};
        }
        .m-prompt-toggle { font-size: 1rem; padding: 0.18rem 0.5rem; }

        .m-prompt-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 300;
          line-height: 1.75; color: #4a4845;
          background: ${C.surface2};
          border-top: 1px solid ${C.border};
          margin: 0; padding: 1rem 1.1rem;
          white-space: pre-wrap; word-break: break-word;
        }
      `}</style>

      <div className="m-root">

        {/* Decorative stars */}
        <div className="m-stars" aria-hidden="true">
          <span className="m-star" style={{ top: '3%',  left: '3%',   fontSize: '3rem',   opacity: 0.4  }}>✦</span>
          <span className="m-star" style={{ top: '9%',  left: '9%',   fontSize: '1.2rem', opacity: 0.25 }}>✦</span>
          <span className="m-star" style={{ top: '2%',  right: '4%',  fontSize: '3.5rem', opacity: 0.38 }}>✦</span>
          <span className="m-star" style={{ top: '10%', right: '11%', fontSize: '1.8rem', opacity: 0.28 }}>✦</span>
          <span className="m-star" style={{ top: '6%',  left: '20%',  fontSize: '1rem',   opacity: 0.2  }}>✦</span>
        </div>

        {/* Header */}
        <header className="m-header">
          <p className="m-logo-label">Ascension</p>
          <div className="m-gold-divider" />
          <h1 className="m-title">
            Méthodes <span className="m-title-gold">de révision</span>
          </h1>
          <p className="m-subtitle">
            Uniquement les méthodes qui marchent — rappel actif, répétition espacée, et IA.
          </p>
        </header>

        {/* Tab bar */}
        <nav className="m-tabbar" aria-label="Sections">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`m-tab${activeTab === t.id ? ' m-tab-active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="m-content">
          {activeTab === 'general'   && <GeneralTab sections={GENERAL_SECTIONS} />}
          {activeTab === 'seconde'   && <LevelTab subjects={SECONDE_SUBJECTS}   color={C.seconde} />}
          {activeTab === 'premiere'  && <LevelTab subjects={PREMIERE_SUBJECTS}  color={C.premiere} />}
          {activeTab === 'terminale' && <LevelTab subjects={TERMINALE_SUBJECTS} color={C.terminale} />}
          {activeTab === 'prompts'   && <PromptsTab groups={PROMPT_GROUPS} />}
        </div>

      </div>
    </>
  );
}
