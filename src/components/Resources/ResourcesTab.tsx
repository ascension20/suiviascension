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

// ── Subject color map ──────────────────────────────────────────────────────────
const SUBJ_HSL: Record<string, string> = {
  Mx:  '213 90% 62%',
  PC:  '142 71% 45%',
  Fr:  '336 77% 59%',
  HG:  '30 80% 57%',
  SV:  '155 58% 48%',
  SE:  '270 50% 60%',
  Ph:  '290 60% 62%',
  EN:  '175 60% 50%',
  NS:  '205 85% 60%',
  GO:  '43 90% 55%',
};
const sc  = (code: string) => `hsl(${SUBJ_HSL[code] ?? '220 10% 50%'})`;
const scA = (code: string, a: number) => `hsl(${SUBJ_HSL[code] ?? '220 10% 50%'} / ${a})`;

const ICON_HSL = { '✦': '43 90% 55%', '◆': '205 60% 60%', '⏱': '30 80% 57%' } as const;

const TAG_CFG: Record<Tag, { label: string; hsl: string }> = {
  ia:     { label: 'IA',                 hsl: '270 50% 65%' },
  actif:  { label: 'Rappel actif',       hsl: '142 71% 48%' },
  espace: { label: 'Répétition espacée', hsl: '43 90% 55%'  },
};

type TabId = 'general' | 'seconde' | 'premiere' | 'terminale' | 'prompts';
const TABS: { id: TabId; label: string }[] = [
  { id: 'general',   label: '⚡ Général' },
  { id: 'seconde',   label: 'Seconde' },
  { id: 'premiere',  label: 'Première' },
  { id: 'terminale', label: 'Terminale' },
  { id: 'prompts',   label: '✦ Prompts IA' },
];

// ── General Tab ───────────────────────────────────────────────────────────────
function GeneralTab({ sections }: { sections: GeneralSection[] }) {
  return (
    <div className="r-general">
      {sections.map((sec) => (
        <div key={sec.title}>
          <div className="r-section-label">{sec.title}</div>
          <div className="r-gen-grid">
            {sec.cards.map((card, ci) => (
              <article
                key={card.title}
                className={`r-gen-card game-card card-enter card-enter-${ci + 1}${card.hot ? ' r-hot-card' : ''}`}
              >
                {card.hot && (
                  <span className="r-hot-star clip-sm" aria-label="Technique prioritaire">✦</span>
                )}
                <h3 className="r-gen-title">{card.title}</h3>
                <p className="r-gen-desc" dangerouslySetInnerHTML={{ __html: card.desc }} />
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Subject Picker ─────────────────────────────────────────────────────────────
function SubjectPicker({
  subjects, selected, onSelect,
}: {
  subjects: SubjectCard[];
  selected: string;
  onSelect: (code: string) => void;
}) {
  return (
    <div className="r-picker">
      {subjects.map(s => {
        const count  = s.categories.reduce((n, c) => n + c.methods.length, 0);
        const active = s.code === selected;
        return (
          <button
            key={s.code}
            className={`r-pick-btn${active ? ' r-pick-active' : ''}`}
            style={{
              '--sc':  sc(s.code),
              '--scl': scA(s.code, 0.12),
              '--scb': scA(s.code, active ? 0.55 : 0.3),
            } as React.CSSProperties}
            onClick={() => onSelect(s.code)}
          >
            <span className="r-pick-code clip-sm">{s.code}</span>
            <span className="r-pick-name">{s.name}</span>
            <span className="r-pick-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function isExamCat(label: string) {
  const l = label.toLowerCase();
  return l.includes('pendant le contrôle') || l.includes("pendant l'épreuve");
}

function cleanExamLabel(label: string) {
  const stripped = label
    .replace(/^pendant le contrôle — /i, '')
    .replace(/^pendant l['']épreuve — /i, '');
  if (stripped.toLowerCase() === 'tous types') return '';
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

// ── Method item ───────────────────────────────────────────────────────────────
function MethodItem({ m }: { m: import('./methodes-data').Method }) {
  const iconHsl = ICON_HSL[m.icon as keyof typeof ICON_HSL] ?? '220 10% 50%';
  return (
    <li
      className={`r-method${m.hot ? ' r-method-hot' : ''}`}
      style={{ '--ih': `hsl(${iconHsl})` } as React.CSSProperties}
    >
      <div className="r-method-row">
        <span className="r-method-icon">{m.icon}</span>
        <span className="r-method-title">{m.title}</span>
        {m.hot && <span className="r-hot-badge clip-sm">TOP</span>}
      </div>
      <p className="r-method-desc" dangerouslySetInnerHTML={{ __html: m.desc }} />
      {m.tags && m.tags.length > 0 && (
        <div className="r-tags">
          {m.tags.map(tag => {
            const t = TAG_CFG[tag];
            return (
              <span
                key={tag}
                className="r-tag"
                style={{ color: `hsl(${t.hsl})`, background: `hsl(${t.hsl} / 0.12)`, borderColor: `hsl(${t.hsl} / 0.3)` }}
              >
                {t.label}
              </span>
            );
          })}
        </div>
      )}
    </li>
  );
}

// ── Category section (collapsible) ────────────────────────────────────────────
function CategorySection({
  cat, clr, isExam,
}: {
  cat: import('./methodes-data').Category;
  clr: string;
  isExam: boolean;
}) {
  const [open, setOpen] = useState(true);
  const rawLabel = isExam ? cleanExamLabel(cat.label) : cat.label;
  const label    = rawLabel || 'Général';
  const catClr   = isExam ? '30 80% 57%' : clr;

  return (
    <section className="r-cat-section">
      <button
        className="r-cat-hd"
        onClick={() => setOpen(o => !o)}
        style={{
          '--cc':  `hsl(${catClr})`,
          '--ccl': `hsl(${catClr} / 0.1)`,
        } as React.CSSProperties}
      >
        <span className="r-cat-dot" />
        <span className="r-cat-hd-lbl">{label}</span>
        <span className="r-cat-count">{cat.methods.length}</span>
        <svg
          className="r-cat-chev"
          viewBox="0 0 10 10"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5"
            fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          className="r-methods-list"
          style={{ '--ml': `hsl(${catClr} / 0.2)` } as React.CSSProperties}
        >
          {cat.methods.map(m => <MethodItem key={m.title} m={m} />)}
        </ul>
      )}
    </section>
  );
}

// ── Level Tab ─────────────────────────────────────────────────────────────────
function LevelTab({ subjects }: { subjects: SubjectCard[] }) {
  const [selected, setSelected] = useState(subjects[0].code);
  const subj = subjects.find(s => s.code === selected) ?? subjects[0];
  const clr  = SUBJ_HSL[subj.code] ?? '220 10% 50%';

  const revCats   = subj.categories.filter(c => !isExamCat(c.label));
  const examCats  = subj.categories.filter(c =>  isExamCat(c.label));
  const revCount  = revCats.reduce((n, c) => n + c.methods.length, 0);
  const examCount = examCats.reduce((n, c) => n + c.methods.length, 0);

  return (
    <div className="r-level">
      <SubjectPicker subjects={subjects} selected={selected} onSelect={setSelected} />

      {revCats.length > 0 && (
        <div className="r-phase">
          <div
            className="r-phase-hd"
            style={{
              color:       `hsl(${clr})`,
              background:  `hsl(${clr} / 0.08)`,
              borderColor: `hsl(${clr} / 0.22)`,
            } as React.CSSProperties}
          >
            <span className="r-phase-icon">📚</span>
            Révision
            <span className="r-phase-count">{revCount} méthodes</span>
          </div>
          <div className="r-phase-body">
            {revCats.map(cat => (
              <CategorySection key={cat.label} cat={cat} clr={clr} isExam={false} />
            ))}
          </div>
        </div>
      )}

      {examCats.length > 0 && (
        <div className="r-phase">
          <div className="r-phase-hd r-phase-exam">
            <span className="r-phase-icon">⏱</span>
            Pendant le contrôle
            <span className="r-phase-count">{examCount} méthodes</span>
          </div>
          <div className="r-phase-body">
            {examCats.map(cat => (
              <CategorySection key={cat.label} cat={cat} clr={clr} isExam={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Prompts Tab ───────────────────────────────────────────────────────────────
function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [open,   setOpen]   = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`r-prompt${open ? ' r-prompt-open' : ''}`}>
      <div className="r-prompt-head">
        <div>
          <p className="r-prompt-title">{prompt.title}</p>
          <p className="r-prompt-scope">{prompt.scope}</p>
        </div>
        <div className="r-prompt-btns">
          <button
            className="r-pbtn"
            onClick={handleCopy}
            style={copied ? { color: 'hsl(142 71% 45%)', borderColor: 'hsl(142 71% 45% / 0.4)' } : undefined}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copié' : 'Copier'}</span>
          </button>
          <button className="r-pbtn r-ptoggle" onClick={() => setOpen(o => !o)}>
            {open ? '−' : '+'}
          </button>
        </div>
      </div>
      {open && <pre className="r-prompt-body">{prompt.text}</pre>}
    </div>
  );
}

function PromptsTab({ groups }: { groups: PromptGroup[] }) {
  return (
    <div className="r-prompts">
      {groups.map(g => (
        <div key={g.label}>
          <div className="r-section-label">{g.label}</div>
          <div className="r-prompts-list">
            {g.prompts.map(p => <PromptCard key={p.title} prompt={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export function ResourcesTab() {
  const [tab, setTab] = useState<TabId>('general');

  return (
    <>
      <style>{`
        /* ─── Layout ─── */
        .r-root {
          background: hsl(222 22% 4%);
          color: hsl(42 12% 92%);
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 0.875rem;
          margin: -1rem -1rem 0;
          min-height: calc(100vh - 72px);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .r-root { margin: -1.5rem -1.5rem 0; }
        }
        .r-root::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            hsl(222 22% 0% / 0.03) 2px, hsl(222 22% 0% / 0.03) 4px
          );
        }
        .r-root > * { position: relative; z-index: 1; }

        /* ─── Header ─── */
        .r-header {
          padding: 2rem 1.5rem 1.25rem;
          text-align: center; position: relative;
        }
        .r-header::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 160px at 50% 0%, hsl(43 90% 50% / 0.06) 0%, transparent 100%);
          pointer-events: none;
        }
        .r-eye {
          display: inline-block; font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: hsl(43 90% 50% / 0.7); margin-bottom: 0.6rem;
        }
        .r-title {
          font-family: 'Space Grotesk', 'Geist', sans-serif;
          font-size: clamp(1.75rem, 5vw, 2.8rem); font-weight: 800;
          line-height: 1; margin: 0 0 0.5rem;
          background: linear-gradient(135deg, hsl(43 90% 40%), hsl(50 100% 65%));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; letter-spacing: -0.02em;
        }
        .r-subtitle {
          font-size: 0.8rem; color: hsl(220 10% 50%);
          margin: 0 0 1rem; line-height: 1.6;
        }
        .r-method-chips {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 0.4rem;
          margin-bottom: 0.25rem;
        }
        .r-mchip {
          font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 0.2rem 0.65rem;
          border: 1px solid; border-radius: 100px;
        }

        /* ─── Tab bar ─── */
        .r-tabbar {
          display: flex; border-bottom: 1px solid hsl(222 16% 18%);
          padding: 0 1rem; overflow-x: auto; scrollbar-width: none;
          background: hsl(222 22% 5%);
        }
        .r-tabbar::-webkit-scrollbar { display: none; }
        .r-tab {
          font-family: 'Geist', 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 400;
          color: hsl(220 10% 45%); background: transparent; border: none;
          border-bottom: 2px solid transparent;
          padding: 0.7rem 1rem; cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap; margin-bottom: -1px; letter-spacing: 0.02em;
        }
        .r-tab:hover { color: hsl(42 12% 85%); }
        .r-tab.r-tab-on {
          color: hsl(43 90% 55%); border-bottom-color: hsl(43 90% 50%);
          font-weight: 500;
        }

        /* ─── Content ─── */
        .r-content {
          padding: 1.5rem 1.25rem 3rem;
          max-width: 860px; margin: 0 auto;
        }
        @media (min-width: 640px) {
          .r-content { padding: 2rem 2rem 3rem; }
        }

        /* ─── Section label ─── */
        .r-section-label {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: hsl(43 90% 50%); margin-bottom: 0.85rem; margin-top: 0.25rem;
        }
        .r-section-label::before {
          content: ''; display: block; width: 2px; height: 0.9rem;
          background: linear-gradient(180deg, hsl(43 90% 50%), hsl(43 90% 50% / 0));
          border-radius: 1px; flex-shrink: 0;
        }
        .r-section-label::after {
          content: ''; display: block; flex: 1; height: 1px;
          background: linear-gradient(to right, hsl(43 90% 50% / 0.2), transparent);
        }

        /* ─── General tab ─── */
        .r-general { display: flex; flex-direction: column; gap: 2rem; }
        .r-gen-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 0.75rem;
        }
        .r-gen-card {
          background: hsl(222 22% 9%);
          border: 1px solid hsl(222 16% 18%);
          border-radius: 10px; padding: 1.1rem 1.1rem 1rem;
          position: relative; cursor: default;
        }
        .r-hot-card {
          border-color: hsl(43 90% 50% / 0.25) !important;
          background: hsl(222 22% 10%);
        }
        .r-hot-card:hover { box-shadow: 0 0 20px hsl(43 90% 50% / 0.1) !important; }
        .r-hot-star {
          position: absolute; top: -7px; right: -7px;
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          background: linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%));
          color: hsl(222 22% 8%); font-weight: 900;
        }
        .r-gen-title {
          font-family: 'Space Grotesk', 'Geist', sans-serif;
          font-size: 0.9rem; font-weight: 700; color: hsl(42 12% 92%);
          margin: 0 0 0.5rem; line-height: 1.35;
        }
        .r-gen-desc {
          font-size: 0.79rem; line-height: 1.65; color: hsl(220 10% 55%); margin: 0;
        }
        .r-gen-desc strong { font-weight: 500; color: hsl(42 12% 82%); }

        /* ─── Subject picker ─── */
        .r-picker {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
          gap: 0.6rem; margin-bottom: 1.5rem;
        }
        @media (min-width: 640px) {
          .r-picker { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        }
        .r-pick-btn {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 0.35rem;
          padding: 0.75rem 0.85rem;
          background: hsl(222 22% 9%);
          border: 1px solid hsl(222 16% 18%);
          border-radius: 10px; cursor: pointer; text-align: left;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          position: relative; overflow: hidden;
        }
        .r-pick-btn::before {
          content: ''; position: absolute; inset: 0;
          background: var(--scl); opacity: 0; transition: opacity 0.18s;
        }
        .r-pick-btn:hover { border-color: var(--scb); }
        .r-pick-btn:hover::before { opacity: 0.6; }
        .r-pick-active {
          border-color: var(--scb) !important;
          box-shadow: 0 0 0 1px var(--scb), 0 0 18px var(--scl);
        }
        .r-pick-active::before { opacity: 1 !important; }
        .r-pick-code {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 2rem; height: 1.5rem; padding: 0 0.4rem;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.04em;
          color: hsl(222 22% 6%); background: var(--sc);
        }
        .r-pick-name {
          font-size: 0.76rem; font-weight: 500;
          color: hsl(42 12% 85%); line-height: 1.3; position: relative; z-index: 1;
        }
        .r-pick-count {
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em;
          color: var(--sc); position: relative; z-index: 1;
        }
        .r-pick-count::after { content: ' méthodes'; font-weight: 400; color: hsl(220 10% 45%); }

        /* ─── Phase block ─── */
        .r-phase { margin-bottom: 1.75rem; }
        .r-phase-hd {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.5rem 0.9rem; border-radius: 8px; border: 1px solid;
          margin-bottom: 0.9rem;
        }
        .r-phase-icon { font-size: 0.9rem; line-height: 1; }
        .r-phase-count {
          margin-left: auto; font-size: 0.63rem; font-weight: 400;
          letter-spacing: 0.03em; opacity: 0.65; text-transform: none;
        }
        .r-phase-exam {
          color: hsl(30 80% 57%);
          background: hsl(30 80% 57% / 0.08);
          border-color: hsl(30 80% 57% / 0.22);
        }
        .r-phase-body { display: flex; flex-direction: column; gap: 0.4rem; padding-left: 0.1rem; }

        /* ─── Category section ─── */
        .r-cat-section {}

        .r-cat-hd {
          width: 100%; display: flex; align-items: center; gap: 0.5rem;
          background: hsl(222 22% 7%);
          border: 1px solid hsl(222 16% 15%);
          border-left: 2px solid var(--cc);
          border-radius: 7px;
          padding: 0.48rem 0.75rem;
          cursor: pointer; text-align: left;
          transition: background 0.14s, border-color 0.14s;
          margin-bottom: 0.38rem;
        }
        .r-cat-hd:hover {
          background: hsl(222 22% 9%);
          border-color: hsl(222 16% 22%);
          border-left-color: var(--cc);
        }

        .r-cat-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--cc); flex-shrink: 0;
        }
        .r-cat-hd-lbl {
          font-size: 0.74rem; font-weight: 600;
          color: hsl(42 12% 80%); flex: 1; line-height: 1.3;
        }
        .r-cat-count {
          font-size: 0.61rem; font-weight: 700; letter-spacing: 0.04em;
          color: var(--cc); background: var(--ccl);
          border-radius: 100px; padding: 0.1rem 0.48rem;
          flex-shrink: 0;
        }
        .r-cat-chev {
          width: 10px; height: 10px; color: hsl(220 10% 38%);
          flex-shrink: 0; transition: transform 0.2s;
        }

        /* ─── Methods list ─── */
        .r-methods-list {
          list-style: none; margin: 0 0 0.35rem; padding: 0;
          display: flex; flex-direction: column; gap: 0.35rem;
          border-left: 2px solid var(--ml, hsl(222 16% 16%));
          padding-left: 0.65rem; margin-left: 0.3rem;
        }

        /* ─── Method item ─── */
        .r-method {
          background: hsl(222 22% 8%);
          border: 1px solid hsl(222 16% 14%);
          border-left: 2px solid var(--ih);
          border-radius: 6px;
          padding: 0.6rem 0.85rem;
          transition: border-color 0.14s, background 0.14s;
        }
        .r-method:hover {
          background: hsl(222 22% 10%);
          border-color: hsl(222 16% 22%);
          border-left-color: var(--ih);
        }
        .r-method-hot {
          border-color: hsl(43 90% 50% / 0.2) !important;
          border-left-color: hsl(43 90% 50%) !important;
          background: hsl(222 22% 9.5%);
          box-shadow: 0 0 10px hsl(43 90% 50% / 0.06);
        }
        .r-method-row {
          display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.3rem;
        }
        .r-method-icon { font-size: 0.82rem; color: var(--ih); flex-shrink: 0; line-height: 1; }
        .r-method-title {
          font-size: 0.82rem; font-weight: 600;
          color: hsl(42 12% 90%); flex: 1; line-height: 1.3;
        }
        .r-hot-badge {
          font-size: 0.56rem; font-weight: 800; letter-spacing: 0.08em;
          padding: 0.15rem 0.4rem;
          background: linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%));
          color: hsl(222 22% 6%); flex-shrink: 0;
        }
        .r-method-desc {
          font-size: 0.77rem; line-height: 1.65;
          color: hsl(220 10% 55%); margin: 0 0 0.4rem;
          padding-left: 1.2rem;
        }
        .r-method-desc strong { font-weight: 500; color: hsl(42 12% 80%); }
        .r-tags {
          display: flex; flex-wrap: wrap; gap: 0.28rem; padding-left: 1.2rem;
        }
        .r-tag {
          font-size: 0.62rem; font-weight: 600; letter-spacing: 0.05em;
          padding: 0.14rem 0.5rem; border-radius: 100px; border: 1px solid;
        }

        /* ─── Prompts ─── */
        .r-prompts { display: flex; flex-direction: column; gap: 2rem; }
        .r-prompts-list { display: flex; flex-direction: column; gap: 0.55rem; }
        .r-prompt {
          background: hsl(222 22% 9%); border: 1px solid hsl(222 16% 18%);
          border-radius: 10px; overflow: hidden; transition: border-color 0.15s;
        }
        .r-prompt:hover { border-color: hsl(222 16% 25%); }
        .r-prompt-open { border-color: hsl(43 90% 50% / 0.3) !important; box-shadow: 0 0 16px hsl(43 90% 50% / 0.07); }
        .r-prompt-head {
          display: flex; align-items: center;
          justify-content: space-between; gap: 0.75rem; padding: 0.8rem 1rem;
        }
        .r-prompt-title { font-size: 0.83rem; font-weight: 600; color: hsl(42 12% 90%); margin: 0 0 0.15rem; }
        .r-prompt-scope { font-size: 0.7rem; color: hsl(220 10% 45%); margin: 0; }
        .r-prompt-btns { display: flex; align-items: center; gap: 0.3rem; flex-shrink: 0; }
        .r-pbtn {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: transparent; border: 1px solid hsl(222 16% 24%);
          border-radius: 6px; color: hsl(220 10% 48%);
          font-family: inherit; font-size: 0.71rem; font-weight: 500;
          cursor: pointer; padding: 0.27rem 0.55rem; transition: all 0.15s;
        }
        .r-pbtn:hover { border-color: hsl(43 90% 50% / 0.5); color: hsl(43 90% 55%); }
        .r-ptoggle { font-size: 1rem; line-height: 1; padding: 0.2rem 0.5rem; }
        .r-prompt-body {
          font-family: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.75rem; line-height: 1.8; color: hsl(220 10% 58%);
          background: hsl(222 22% 7%); border-top: 1px solid hsl(222 16% 16%);
          margin: 0; padding: 1rem 1.1rem; white-space: pre-wrap; word-break: break-word;
        }
      `}</style>

      <div className="r-root">

        {/* ── Header ── */}
        <header className="r-header">
          <span className="r-eye">Ascension — Méthodes</span>
          <h1 className="r-title">Méthodes de révision</h1>
          <p className="r-subtitle">
            Les techniques qui font la différence — actif, espacé, IA.
          </p>
          <div className="r-method-chips">
            {([
              { label: 'Rappel actif',       hsl: '142 71% 48%' },
              { label: 'Répétition espacée', hsl: '43 90% 55%'  },
              { label: 'IA',                 hsl: '270 50% 65%' },
            ] as const).map(c => (
              <span
                key={c.label}
                className="r-mchip"
                style={{
                  color:       `hsl(${c.hsl})`,
                  background:  `hsl(${c.hsl} / 0.1)`,
                  borderColor: `hsl(${c.hsl} / 0.3)`,
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </header>

        {/* ── Tab bar ── */}
        <nav className="r-tabbar">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`r-tab${tab === t.id ? ' r-tab-on' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* ── Content ── */}
        <div className="r-content">
          {tab === 'general'   && <GeneralTab   sections={GENERAL_SECTIONS}   />}
          {tab === 'seconde'   && <LevelTab     subjects={SECONDE_SUBJECTS}   />}
          {tab === 'premiere'  && <LevelTab     subjects={PREMIERE_SUBJECTS}  />}
          {tab === 'terminale' && <LevelTab     subjects={TERMINALE_SUBJECTS} />}
          {tab === 'prompts'   && <PromptsTab   groups={PROMPT_GROUPS}        />}
        </div>

      </div>
    </>
  );
}
