import { useState } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
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

// ── Subject color map ──────────────────────────────────────────────────────
const SUBJ_HSL: Record<string, string> = {
  Mx: '213 90% 62%',
  PC: '142 71% 45%',
  Fr: '336 77% 59%',
  HG: '30 80% 57%',
  SV: '155 58% 48%',
  SE: '270 50% 60%',
  Ph: '290 60% 62%',
  EN: '175 60% 50%',
  NS: '205 85% 60%',
  GO: '43 90% 55%',
};
const hsl  = (code: string) => `hsl(${SUBJ_HSL[code] ?? '220 10% 50%'})`;
const hsla = (code: string, a: number) => `hsl(${SUBJ_HSL[code] ?? '220 10% 50%'} / ${a})`;

const ICON_COLOR: Record<string, string> = {
  '✦': 'hsl(43 90% 55%)',
  '◆': 'hsl(205 70% 62%)',
  '⏱': 'hsl(30 80% 57%)',
};

const TAG_CFG: Record<Tag, { label: string; hsl: string }> = {
  ia:     { label: 'IA',                 hsl: '270 50% 65%' },
  actif:  { label: 'Rappel actif',       hsl: '142 71% 48%' },
  espace: { label: 'Répétition espacée', hsl: '43 90% 55%'  },
};

type TabId = 'general' | 'seconde' | 'premiere' | 'terminale' | 'prompts';
const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'general',   label: 'Général',    icon: '⚡' },
  { id: 'seconde',   label: 'Seconde',    icon: '' },
  { id: 'premiere',  label: 'Première',   icon: '' },
  { id: 'terminale', label: 'Terminale',  icon: '' },
  { id: 'prompts',   label: 'Prompts IA', icon: '✦' },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function isExamCat(label: string) {
  const l = label.toLowerCase();
  return l.includes('pendant le contrôle') || l.includes("pendant l'épreuve");
}
function cleanExamLabel(label: string) {
  const s = label
    .replace(/^pendant le contrôle — /i, '')
    .replace(/^pendant l['']épreuve — /i, '');
  if (s.toLowerCase() === 'tous types') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Method item ────────────────────────────────────────────────────────────
function MethodItem({ m }: { m: import('./methodes-data').Method }) {
  const color = ICON_COLOR[m.icon] ?? 'hsl(220 10% 50%)';
  return (
    <li
      className="rounded-lg border bg-card transition-colors duration-150 hover:bg-accent/30"
      style={{
        borderColor:     'hsl(var(--border))',
        borderLeftColor: color,
        borderLeftWidth: '2px',
      }}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-start gap-2 mb-1">
          <span className="text-sm leading-none mt-[3px] flex-shrink-0" style={{ color }}>
            {m.icon}
          </span>
          <span className="text-sm font-semibold leading-snug text-foreground flex-1">
            {m.title}
          </span>
          {m.hot && (
            <span
              className="flex-shrink-0 text-[9px] font-black tracking-widest px-1.5 py-[2px] rounded-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%))',
                color: 'hsl(222 22% 6%)',
              }}
            >
              TOP
            </span>
          )}
        </div>
        {m.desc && (
          <p
            className="r-desc text-xs leading-relaxed text-muted-foreground pl-[1.375rem]"
            dangerouslySetInnerHTML={{ __html: m.desc }}
          />
        )}
        {m.tags && m.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5 pl-[1.375rem]">
            {m.tags.map(tag => {
              const t = TAG_CFG[tag];
              return (
                <span
                  key={tag}
                  className="text-[10px] font-semibold tracking-wide px-2 py-[2px] rounded-full border"
                  style={{
                    color:       `hsl(${t.hsl})`,
                    background:  `hsl(${t.hsl} / 0.1)`,
                    borderColor: `hsl(${t.hsl} / 0.25)`,
                  }}
                >
                  {t.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
}

// ── Category section (collapsible) ────────────────────────────────────────
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
  const color    = isExam ? 'hsl(30 80% 57%)' : `hsl(${clr})`;
  const colorA   = isExam ? 'hsl(30 80% 57% / 0.12)' : `hsl(${clr} / 0.12)`;
  const colorB   = isExam ? 'hsl(30 80% 57% / 0.25)' : `hsl(${clr} / 0.25)`;
  const railClr  = isExam ? 'hsl(30 80% 57% / 0.18)' : `hsl(${clr} / 0.18)`;

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors duration-100 hover:bg-secondary/40 text-left group"
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-[11px] font-semibold flex-1 transition-colors text-muted-foreground group-hover:text-foreground">
          {label}
        </span>
        <span
          className="text-[10px] font-bold px-1.5 py-[2px] rounded-full border"
          style={{ color, background: colorA, borderColor: colorB }}
        >
          {cat.methods.length}
        </span>
        <ChevronDown
          size={12}
          className="text-muted-foreground/50 transition-transform duration-200"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
      </button>

      {open && (
        <div
          className="ml-[0.875rem] pl-3 mt-1 mb-2 flex flex-col gap-1.5 border-l"
          style={{ borderColor: railClr }}
        >
          {cat.methods.map(m => <MethodItem key={m.title} m={m} />)}
        </div>
      )}
    </div>
  );
}

// ── Subject picker ─────────────────────────────────────────────────────────
function SubjectPicker({
  subjects, selected, onSelect,
}: {
  subjects: SubjectCard[];
  selected: string;
  onSelect: (code: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-5">
      {subjects.map(s => {
        const active = s.code === selected;
        const count  = s.categories.reduce((n, c) => n + c.methods.length, 0);
        return (
          <button
            key={s.code}
            onClick={() => onSelect(s.code)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150"
            style={{
              borderColor: active ? hsla(s.code, 0.5) : 'hsl(var(--border))',
              background:  active ? hsla(s.code, 0.1) : 'transparent',
              boxShadow:   active ? `0 0 0 1px ${hsla(s.code, 0.35)}, 0 0 14px ${hsla(s.code, 0.08)}` : 'none',
              color:       active ? hsl(s.code) : 'hsl(var(--muted-foreground))',
            }}
          >
            <span
              className="text-[10px] font-black clip-sm px-1 py-[2px] leading-none"
              style={{ background: hsl(s.code), color: 'hsl(222 22% 6%)' }}
            >
              {s.code}
            </span>
            <span className={active ? '' : 'hidden sm:inline'}>{s.name}</span>
            <span
              className="text-[10px] font-bold opacity-70"
              style={{ color: active ? hsl(s.code) : 'inherit' }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Phase divider ──────────────────────────────────────────────────────────
function PhaseDivider({
  icon, label, count, color,
}: {
  icon: string; label: string; count: number; color: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-3 px-0.5">
      <span className="text-xs font-bold tracking-widest uppercase" style={{ color }}>
        {icon} {label}
      </span>
      <span
        className="text-[10px] font-medium pl-2 border-l"
        style={{ color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}
      >
        {count} méthodes
      </span>
      <div className="flex-1 h-px" style={{ background: `${color}20` }} />
    </div>
  );
}

// ── Section divider (for General + Prompts tabs) ───────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3 px-0.5">
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary/70">
        {label}
      </span>
      <div className="flex-1 h-px bg-primary/10" />
    </div>
  );
}

// ── Level Tab ──────────────────────────────────────────────────────────────
function LevelTab({ subjects }: { subjects: SubjectCard[] }) {
  const [selected, setSelected] = useState(subjects[0].code);
  const subj = subjects.find(s => s.code === selected) ?? subjects[0];
  const clr  = SUBJ_HSL[subj.code] ?? '220 10% 50%';

  const revCats  = subj.categories.filter(c => !isExamCat(c.label));
  const examCats = subj.categories.filter(c =>  isExamCat(c.label));
  const revCount  = revCats.reduce((n, c) => n + c.methods.length, 0);
  const examCount = examCats.reduce((n, c) => n + c.methods.length, 0);

  return (
    <div>
      <SubjectPicker subjects={subjects} selected={selected} onSelect={setSelected} />
      <div className="space-y-5">
        {revCats.length > 0 && (
          <div>
            <PhaseDivider icon="📚" label="Révision" count={revCount} color={hsl(subj.code)} />
            {revCats.map(cat => (
              <CategorySection key={cat.label} cat={cat} clr={clr} isExam={false} />
            ))}
          </div>
        )}
        {examCats.length > 0 && (
          <div>
            <PhaseDivider icon="⏱" label="Pendant le contrôle" count={examCount} color="hsl(30 80% 57%)" />
            {examCats.map(cat => (
              <CategorySection key={cat.label} cat={cat} clr={clr} isExam={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── General Tab ────────────────────────────────────────────────────────────
function GeneralTab({ sections }: { sections: GeneralSection[] }) {
  return (
    <div className="space-y-7">
      {sections.map(sec => (
        <div key={sec.title}>
          <SectionDivider label={sec.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {sec.cards.map(card => (
              <article
                key={card.title}
                className="relative rounded-xl border bg-card p-4 transition-colors duration-150 hover:bg-accent/20 game-panel"
                style={{ borderColor: card.hot ? 'hsl(43 90% 50% / 0.3)' : 'hsl(var(--border))' }}
              >
                {card.hot && (
                  <span
                    className="absolute -top-2 -right-2 text-[9px] font-black tracking-wider px-1.5 py-[3px] clip-sm"
                    style={{
                      background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%))',
                      color: 'hsl(222 22% 6%)',
                    }}
                  >
                    ✦
                  </span>
                )}
                <h3 className="text-sm font-bold text-foreground mb-1.5 leading-snug">{card.title}</h3>
                <p
                  className="r-desc text-xs leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: card.desc }}
                />
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Prompts Tab ────────────────────────────────────────────────────────────
function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const [open,   setOpen]   = useState(false);

  return (
    <div
      className="rounded-xl border bg-card overflow-hidden transition-colors duration-150"
      style={{ borderColor: open ? 'hsl(43 90% 50% / 0.25)' : 'hsl(var(--border))' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{prompt.title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{prompt.scope}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => {
              navigator.clipboard.writeText(prompt.text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-white/15"
            style={copied ? { color: 'hsl(142 71% 45%)', borderColor: 'hsl(142 71% 45% / 0.35)' } : undefined}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? 'Copié' : 'Copier'}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-white/15 transition-colors text-base leading-none"
          >
            {open ? '−' : '+'}
          </button>
        </div>
      </div>
      {open && (
        <pre className="text-[11px] leading-relaxed font-mono text-muted-foreground border-t border-border bg-background/40 px-4 py-3 whitespace-pre-wrap break-words">
          {prompt.text}
        </pre>
      )}
    </div>
  );
}

function PromptsTab({ groups }: { groups: PromptGroup[] }) {
  return (
    <div className="space-y-6">
      {groups.map(g => (
        <div key={g.label}>
          <SectionDivider label={g.label} />
          <div className="space-y-2">
            {g.prompts.map(p => <PromptCard key={p.title} prompt={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export function ResourcesTab() {
  const [tab, setTab] = useState<TabId>('general');

  return (
    <>
      <style>{`
        .r-desc strong { font-weight: 600; color: hsl(42 12% 86%); }
        .r-desc em     { font-style: italic; }
      `}</style>

      <div className="space-y-5 max-w-4xl">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase text-primary/50 mb-1">
              Ascension · Méthodes
            </p>
            <h1 className="font-display text-2xl font-black tracking-tight text-foreground leading-none">
              Méthodes de révision
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5">
              Les techniques qui font la différence — rappel actif, répétition espacée, IA.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 mt-1">
            {[
              { label: 'Rappel actif',       h: '142 71% 48%' },
              { label: 'Espacement',          h: '43 90% 55%'  },
              { label: 'IA',                  h: '270 50% 65%' },
            ].map(c => (
              <span
                key={c.label}
                className="text-[10px] font-semibold px-2 py-[3px] rounded-full border"
                style={{
                  color:       `hsl(${c.h})`,
                  background:  `hsl(${c.h} / 0.1)`,
                  borderColor: `hsl(${c.h} / 0.25)`,
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tab bar — segmented control ── */}
        <div
          className="flex gap-0.5 p-1 rounded-xl border w-fit"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
        >
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap"
              style={
                tab === t.id
                  ? {
                      background: 'hsl(43 90% 50%)',
                      color:      'hsl(222 22% 6%)',
                      boxShadow:  '0 1px 8px hsl(43 90% 50% / 0.35)',
                    }
                  : {
                      background: 'transparent',
                      color:      'hsl(var(--muted-foreground))',
                    }
              }
            >
              {t.icon && <span className="mr-1">{t.icon}</span>}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div>
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
