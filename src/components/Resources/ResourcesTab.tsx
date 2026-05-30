import { useState } from 'react';
import { Copy, Check, ChevronDown, BookOpen, Timer, Zap, Brain } from 'lucide-react';
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

// ── Subject colors ─────────────────────────────────────────────────────────
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

// method icon → color
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
const TABS: { id: TabId; label: string; Icon?: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }> }[] = [
  { id: 'general',   label: 'Général',    Icon: Zap   },
  { id: 'seconde',   label: 'Seconde' },
  { id: 'premiere',  label: 'Première' },
  { id: 'terminale', label: 'Terminale' },
  { id: 'prompts',   label: 'Prompts IA', Icon: Brain },
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

// ── Method icon renderer (maps ⏱ emoji → Lucide Timer) ────────────────────
function MethodIcon({ icon, color }: { icon: string; color: string }) {
  if (icon === '⏱') {
    return <Timer size={13} style={{ color, flexShrink: 0 }} />;
  }
  return (
    <span
      className="font-bold leading-none"
      style={{ color, fontSize: '0.8rem', flexShrink: 0 }}
    >
      {icon}
    </span>
  );
}

// ── Method item ────────────────────────────────────────────────────────────
function MethodItem({ m }: { m: import('./methodes-data').Method }) {
  const color = ICON_COLOR[m.icon] ?? 'hsl(220 10% 50%)';
  return (
    <li
      className="rounded-lg border bg-card transition-all duration-150"
      style={{
        borderColor:     m.hot ? 'hsl(43 90% 50% / 0.28)' : 'hsl(var(--border))',
        borderLeftColor: color,
        borderLeftWidth: '2px',
        boxShadow:       m.hot ? '0 0 18px hsl(43 90% 50% / 0.07), inset 0 0 24px hsl(43 90% 50% / 0.025)' : 'none',
      }}
    >
      <div className="px-3 py-2.5">
        <div className="flex items-start gap-2 mb-1.5">
          <span className="flex-shrink-0 mt-[2px]">
            <MethodIcon icon={m.icon} color={color} />
          </span>
          <span className="text-sm font-semibold leading-snug text-foreground flex-1">
            {m.title}
          </span>
          {m.hot && (
            <span
              className="clip-sm flex-shrink-0 text-[9px] font-black tracking-widest px-1.5 py-[3px]"
              style={{
                background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 62%))',
                color: 'hsl(222 22% 6%)',
              }}
            >
              TOP
            </span>
          )}
        </div>
        {m.desc && (
          <p
            className="r-desc text-xs leading-relaxed text-muted-foreground pl-[1.4rem]"
            dangerouslySetInnerHTML={{ __html: m.desc }}
          />
        )}
        {m.tags && m.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5 pl-[1.4rem]">
            {m.tags.map(tag => {
              const t = TAG_CFG[tag];
              return (
                <span
                  key={tag}
                  className="clip-sm text-[9px] font-black tracking-wide px-2 py-[3px]"
                  style={{
                    color:      `hsl(${t.hsl})`,
                    background: `hsl(${t.hsl} / 0.14)`,
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
  const rawHsl   = isExam ? '30 80% 57%' : clr;
  const color    = `hsl(${rawHsl})`;
  const colorBg  = `hsl(${rawHsl} / 0.12)`;
  const railClr  = `hsl(${rawHsl} / 0.15)`;

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:bg-secondary/40 text-left group"
      >
        <span className="text-[10px] font-black leading-none" style={{ color }}>◆</span>
        <span className="text-[11px] font-semibold flex-1 tracking-wide text-muted-foreground group-hover:text-foreground/80 transition-colors">
          {label}
        </span>
        <span
          className="clip-sm text-[9px] font-black px-1.5 py-[3px]"
          style={{ background: colorBg, color }}
        >
          {cat.methods.length}
        </span>
        <ChevronDown
          size={11}
          className="text-muted-foreground/40 transition-transform duration-200"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
      </button>

      {open && (
        <div
          className="ml-3 pl-3 mt-1 mb-2.5 flex flex-col gap-1.5 border-l"
          style={{ borderColor: railClr }}
        >
          {cat.methods.map(m => <MethodItem key={m.title} m={m} />)}
        </div>
      )}
    </div>
  );
}

// ── Phase divider ──────────────────────────────────────────────────────────
function PhaseDivider({
  Icon, label, count, rawHsl,
}: {
  Icon: typeof BookOpen;
  label: string;
  count: number;
  rawHsl: string;
}) {
  const color = `hsl(${rawHsl})`;
  return (
    <div className="flex items-center gap-3 mb-3 mt-1">
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-[3px] h-4 rounded-full flex-shrink-0"
          style={{ background: `linear-gradient(to bottom, ${color}, ${color}50)` }}
        />
        <span className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.14em] uppercase" style={{ color }}>
          <Icon size={11} />
          {label}
        </span>
      </div>
      <span className="font-mono text-[10px] font-bold text-muted-foreground/40">{count}</span>
      <div className="flex-1 h-px" style={{ background: `hsl(${rawHsl} / 0.12)` }} />
    </div>
  );
}

// ── Section divider (gold — General + Prompts tabs) ────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="section-header-bar text-[10px] font-black tracking-[0.16em] uppercase text-primary/80">
        {label}
      </div>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(to right, hsl(43 90% 50% / 0.18), transparent)' }}
      />
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
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200"
            style={{
              borderColor: active ? hsla(s.code, 0.55) : 'hsl(var(--border))',
              background:  active ? hsla(s.code, 0.1) : 'hsl(var(--card))',
              color:       active ? hsl(s.code) : 'hsl(var(--muted-foreground))',
              boxShadow:   active
                ? `0 0 0 1px ${hsla(s.code, 0.3)}, 0 0 18px ${hsla(s.code, 0.1)}`
                : 'none',
            }}
          >
            <span
              className="clip-sm text-[9px] font-black px-1.5 py-[3px] leading-none"
              style={{ background: hsl(s.code), color: 'hsl(222 22% 6%)' }}
            >
              {s.code}
            </span>
            <span className={`hidden sm:inline ${active ? '' : 'opacity-80'}`}>{s.name}</span>
            <span
              className={`font-mono text-[10px] font-bold ${active ? 'hud-number' : 'opacity-40'}`}
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
            <PhaseDivider Icon={BookOpen} label="Révision" count={revCount} rawHsl={clr} />
            {revCats.map(cat => (
              <CategorySection key={cat.label} cat={cat} clr={clr} isExam={false} />
            ))}
          </div>
        )}
        {examCats.length > 0 && (
          <div>
            <PhaseDivider Icon={Timer} label="Pendant le contrôle" count={examCount} rawHsl="30 80% 57%" />
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
            {sec.cards.map((card, ci) => (
              <article
                key={card.title}
                className={`relative rounded-xl border bg-card p-4 game-panel game-card card-enter card-enter-${Math.min(ci + 1, 4)}`}
                style={{
                  borderColor: card.hot ? 'hsl(43 90% 50% / 0.22)' : 'hsl(var(--border))',
                }}
              >
                {card.hot && (
                  <span
                    className="absolute -top-2 -right-2 clip-sm text-[9px] font-black tracking-widest px-1.5 py-[4px]"
                    style={{
                      background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 62%))',
                      color: 'hsl(222 22% 6%)',
                    }}
                  >
                    ✦
                  </span>
                )}
                <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{card.title}</h3>
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
      className="rounded-xl border bg-card overflow-hidden transition-all duration-150 game-panel"
      style={{
        borderColor: open ? 'hsl(43 90% 50% / 0.3)' : 'hsl(var(--border))',
        boxShadow:   open ? '0 0 20px hsl(43 90% 50% / 0.07)' : 'none',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{prompt.title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-mono tracking-wide">{prompt.scope}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => {
              navigator.clipboard.writeText(prompt.text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-md border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
            style={copied ? { color: 'hsl(142 71% 45%)', borderColor: 'hsl(142 71% 45% / 0.35)' } : undefined}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? 'Copié' : 'Copier'}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            className="clip-sm w-7 h-7 flex items-center justify-center text-sm font-black transition-all"
            style={
              open
                ? {
                    background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 62%))',
                    color: 'hsl(222 22% 6%)',
                  }
                : {
                    background: 'hsl(var(--secondary))',
                    color: 'hsl(var(--muted-foreground))',
                  }
            }
          >
            {open ? '−' : '+'}
          </button>
        </div>
      </div>
      {open && (
        <pre
          className="text-[11px] leading-relaxed font-mono text-muted-foreground border-t px-4 py-3 whitespace-pre-wrap break-words"
          style={{
            borderColor: 'hsl(var(--border))',
            background:  'hsl(222 22% 7%)',
          }}
        >
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
        .r-desc em     { font-style: italic; color: hsl(42 12% 78%); }
      `}</style>

      <div className="space-y-5 max-w-4xl mx-auto">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[10px] font-black tracking-[0.25em] uppercase mb-1.5"
              style={{ color: 'hsl(43 90% 50% / 0.5)' }}
            >
              Ascension · Base de connaissances
            </p>
            <h1
              className="font-display font-black tracking-tight leading-none"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                background: 'linear-gradient(135deg, hsl(43 90% 44%), hsl(50 100% 66%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MÉTHODES DE RÉVISION
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5 font-mono tracking-wide">
              Rappel actif · Répétition espacée · IA
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0 mt-1">
            {[
              { label: 'ACTIF',  hsl: '142 71% 48%' },
              { label: 'ESPACÉ', hsl: '43 90% 55%'  },
              { label: 'IA',     hsl: '270 50% 65%' },
            ].map(c => (
              <span
                key={c.label}
                className="clip-sm text-[9px] font-black tracking-widest px-2.5 py-[4px]"
                style={{
                  color:      `hsl(${c.hsl})`,
                  background: `hsl(${c.hsl} / 0.12)`,
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div
          className="flex gap-0.5 p-1 rounded-xl border"
          style={{
            background:  'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            width:       'fit-content',
            boxShadow:   '0 0 0 1px hsl(43 90% 50% / 0.04) inset',
          }}
        >
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black tracking-wide transition-all duration-150 whitespace-nowrap"
                style={
                  active
                    ? {
                        background:  'linear-gradient(135deg, hsl(43 90% 40%), hsl(50 100% 60%))',
                        color:       'hsl(222 22% 6%)',
                        borderRadius: '8px',
                        clipPath:    'polygon(6px 0%,calc(100% - 6px) 0%,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0% calc(100% - 6px),0% 6px)',
                        boxShadow:   '0 0 14px hsl(43 90% 50% / 0.45)',
                      }
                    : {
                        background:   'transparent',
                        color:        'hsl(var(--muted-foreground))',
                        borderRadius: '8px',
                      }
                }
              >
                {t.Icon && <t.Icon size={11} />}
                {t.label}
              </button>
            );
          })}
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
