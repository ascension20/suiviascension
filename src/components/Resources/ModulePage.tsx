import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Gamepad2,
  CheckCircle2, Lock, Play, ChevronDown, ChevronUp,
} from 'lucide-react';
import { PhysicsModule, ModuleLevel, TIER_META, DIFF_LABEL } from '@/lib/modules-data';
import { NEWTON_QCM, NEWTON_EXERCISES } from '@/lib/newton-content';
import { BlockMath, MixedText } from './Math';
import { QcmView } from './QcmView';
import { ExerciseView } from './ExerciseView';

type Tab = 'cours' | 'fiche' | 'exercices';

interface ModulePageProps {
  module: PhysicsModule;
  completedIds: Set<string>;
  onComplete: (level: ModuleLevel) => void;
  onBack: () => void;
}

export function ModulePage({ module, completedIds, onComplete, onBack }: ModulePageProps) {
  const [tab, setTab] = useState<Tab>('cours');
  const [activeLevel, setActiveLevel] = useState<ModuleLevel | null>(null);

  const accent = module.accentHsl;

  const getStatus = (level: ModuleLevel): 'completed' | 'current' | 'locked' => {
    if (completedIds.has(level.id)) return 'completed';
    if (level.number === 0) return 'current';
    const prev = module.levels[level.number - 1];
    if (prev && completedIds.has(prev.id)) return 'current';
    return 'locked';
  };

  const totalXp = module.levels.reduce((s, l) => s + l.xpReward, 0);
  const earnedXp = module.levels.filter(l => completedIds.has(l.id)).reduce((s, l) => s + l.xpReward, 0);
  const pct = totalXp > 0 ? Math.round((earnedXp / totalXp) * 100) : 0;

  if (activeLevel) {
    const isQcm = activeLevel.id === 'newton-qcm';
    if (isQcm) {
      return (
        <QcmView
          questions={NEWTON_QCM}
          xpReward={activeLevel.xpReward}
          onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
          onBack={() => setActiveLevel(null)}
        />
      );
    }
    const content = NEWTON_EXERCISES.find(e => e.id === activeLevel.id) ?? null;
    return (
      <ExerciseView
        level={activeLevel}
        content={content}
        onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
        onBack={() => setActiveLevel(null)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-5">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white mt-0.5"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white/60"
            style={{ background: `hsl(${accent} / 0.15)`, border: `1px solid hsl(${accent} / 0.35)` }}>
            {module.subject} · {module.level}
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5">{module.title}</h2>
          <p className="text-sm text-white/45">{module.subtitle}</p>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="bg-white/5 rounded-xl p-4 mb-5 border border-white/10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/50">Progression</span>
          <span className="font-bold" style={{ color: `hsl(${accent})` }}>
            {earnedXp} / {totalXp} XP · {pct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `hsl(${accent})` }}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }} />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1.5 mb-5 bg-white/5 rounded-xl p-1.5 border border-white/8">
        {([
          { key: 'cours',     icon: BookOpen,  label: 'Cours' },
          { key: 'fiche',     icon: FileText,  label: 'Fiche' },
          { key: 'exercices', icon: Gamepad2,  label: 'Exercices' },
        ] as const).map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === key ? 'bg-white/15 text-white shadow-sm' : 'text-white/45 hover:text-white/75'
            }`}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        {tab === 'cours'     && <CourseTab     key="cours" />}
        {tab === 'fiche'     && <FicheTab      key="fiche" />}
        {tab === 'exercices' && (
          <ExercicesTab key="exercices"
            module={module} getStatus={getStatus}
            accent={accent} onOpen={setActiveLevel} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COURS
// ══════════════════════════════════════════════════════════════════════════════

type BlockType =
  | { type: 'text';       content: string }
  | { type: 'math';       tex: string; label?: string }
  | { type: 'definition'; title: string; content: string }
  | { type: 'law';        number: string; title: string; content: string }
  | { type: 'property';   title: string; items: string[] }
  | { type: 'method';     steps: string[] }
  | { type: 'warning';    content: string }
  | { type: 'tip';        content: string };

interface CourseSection {
  id: string;
  tag: string;
  title: string;
  color: string;   // HSL string without hsl()
  blocks: BlockType[];
}

const SECTIONS: CourseSection[] = [
  // ── §1 Cinématique ──────────────────────────────────────────────────────────
  {
    id: 'cinematique',
    tag: '§ 1',
    title: 'Cinématique vectorielle',
    color: '205 85% 62%',
    blocks: [
      {
        type: 'definition',
        title: 'Vecteur position',
        content: 'Le vecteur $\\overrightarrow{OM}(t)$ relie l\'origine O du repère au point mobile M à l\'instant $t$. Dans un repère cartésien $(\\vec{i}, \\vec{j})$ :',
      },
      { type: 'math', tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j}' },
      {
        type: 'definition',
        title: 'Vecteur vitesse',
        content: 'Dérivée du vecteur position par rapport au temps :',
      },
      {
        type: 'math',
        tex: '\\vec{v}(t) = \\frac{d\\overrightarrow{OM}}{dt} = \\dot{x}(t)\\,\\vec{i} + \\dot{y}(t)\\,\\vec{j}',
      },
      {
        type: 'property',
        title: 'Propriétés de $\\vec{v}$',
        items: [
          'Tangent à la trajectoire en M, orienté dans le sens du mouvement',
          'Norme : $v = \\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2}$',
        ],
      },
      {
        type: 'definition',
        title: 'Vecteur accélération',
        content: 'Dérivée du vecteur vitesse :',
      },
      {
        type: 'math',
        tex: '\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\ddot{x}(t)\\,\\vec{i} + \\ddot{y}(t)\\,\\vec{j}',
      },
      {
        type: 'tip',
        content: 'Intégration : si $\\vec{a}(t)$ est connue, on remonte à $\\vec{v}(t) = \\int\\vec{a}\\,dt + \\vec{v}_0$, puis à $\\overrightarrow{OM}(t) = \\int\\vec{v}\\,dt + \\overrightarrow{OM}_0$. Les constantes d\'intégration sont les conditions initiales.',
      },
    ],
  },

  // ── §2 & 3 Lois Newton ──────────────────────────────────────────────────────
  {
    id: 'newton',
    tag: '§ 2–3',
    title: 'Les trois lois de Newton',
    color: '142 65% 48%',
    blocks: [
      {
        type: 'law',
        number: '1',
        title: 'Principe d\'inertie',
        content: 'Dans un référentiel galiléen, si la somme des forces extérieures est nulle, alors le centre de masse est au repos ou en mouvement rectiligne uniforme (MRU).',
      },
      {
        type: 'math',
        tex: '\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{a} = \\vec{0} \\iff \\vec{v} = \\text{cste}',
      },
      {
        type: 'law',
        number: '2',
        title: 'Relation fondamentale de la dynamique',
        content: 'Dans un référentiel galiléen :',
      },
      {
        type: 'math',
        tex: '\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}',
        label: '(RFD)',
      },
      {
        type: 'law',
        number: '3',
        title: 'Principe des actions réciproques',
        content: 'Si A exerce $\\vec{F}_{A/B}$ sur B, alors B exerce sur A une force $\\vec{F}_{B/A}$ telle que :',
      },
      {
        type: 'math',
        tex: '\\vec{F}_{B/A} = -\\vec{F}_{A/B}',
      },
      {
        type: 'property',
        title: 'Caractéristiques de la paire action–réaction',
        items: [
          'Même droite d\'action, même norme',
          'Sens opposés',
          'S\'exercent sur deux corps **différents**',
        ],
      },
      {
        type: 'warning',
        content: 'Le poids d\'un livre posé sur une table et la réaction normale de la table **ne sont pas** une paire action–réaction : elles s\'exercent toutes deux sur le livre. Elles sont égales et opposées par la 1ʳᵉ loi (livre immobile).',
      },
    ],
  },

  // ── §4 Méthode ──────────────────────────────────────────────────────────────
  {
    id: 'methode',
    tag: '§ 4',
    title: 'Méthode en 5 étapes',
    color: '43 90% 52%',
    blocks: [
      {
        type: 'text',
        content: 'Cette méthode s\'applique à tout problème de mécanique (chute libre, plan incliné, condensateur…).',
      },
      {
        type: 'method',
        steps: [
          'Choisir le **système** (l\'objet dont on étudie le mouvement) et un **référentiel galiléen** adapté.',
          'Faire le **bilan des forces extérieures** s\'exerçant sur le système (schéma clair avec flèches).',
          'Appliquer la **2ᵉ loi de Newton** : $\\sum \\vec{F}_{\\text{ext}} = m\\vec{a}$.',
          '**Projeter** sur les axes du repère choisi pour obtenir deux équations scalaires.',
          '**Intégrer** les équations différentielles avec les conditions initiales pour obtenir $\\vec{v}(t)$ puis $\\overrightarrow{OM}(t)$.',
        ],
      },
      {
        type: 'tip',
        content: 'Toujours écrire la relation vectorielle complète avant de projeter — ne jamais sauter cette étape.',
      },
    ],
  },

  // ── §5 Projectile ───────────────────────────────────────────────────────────
  {
    id: 'projectile',
    tag: '§ 5',
    title: 'Mouvement d\'un projectile',
    color: '270 60% 62%',
    blocks: [
      {
        type: 'text',
        content: 'Système : solide de masse $m$. Seule force : poids $\\vec{P} = -mg\\,\\vec{j}$. Référentiel terrestre (galiléen). La RFD donne $\\vec{a} = -g\\,\\vec{j}$, soit $a_x = 0$ et $a_y = -g$.',
      },
      {
        type: 'definition',
        title: 'Équations horaires (vitesse initiale $v_0$ à l\'angle $\\alpha$)',
        content: 'Conditions initiales : $v_{0x} = v_0\\cos\\alpha$, $v_{0y} = v_0\\sin\\alpha$, origine en O.',
      },
      {
        type: 'math',
        tex: `\\begin{cases} x(t) = v_0\\cos\\alpha\\cdot t \\\\ y(t) = v_0\\sin\\alpha\\cdot t - \\dfrac{1}{2}g\\,t^2 \\end{cases}`,
      },
      {
        type: 'definition',
        title: 'Équation de la trajectoire',
        content: 'En éliminant $t$ entre $x(t)$ et $y(t)$ :',
      },
      {
        type: 'math',
        tex: 'y = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\alpha}\\,x^2 \\qquad (\\text{parabole})',
      },
      {
        type: 'property',
        title: 'Grandeurs caractéristiques',
        items: [
          '**Flèche** (hauteur max, $v_y = 0$) : $H = \\dfrac{v_0^2\\sin^2\\alpha}{2g}$',
          '**Portée** (retour au sol) : $D = \\dfrac{v_0^2\\sin 2\\alpha}{g}$',
          '**Portée maximale** pour $\\alpha = 45°$ : $D_{\\max} = \\dfrac{v_0^2}{g}$',
        ],
      },
    ],
  },

  // ── §6 Particule chargée ────────────────────────────────────────────────────
  {
    id: 'champ',
    tag: '§ 6',
    title: 'Particule chargée en champ uniforme',
    color: '0 70% 60%',
    blocks: [
      {
        type: 'definition',
        title: 'Condensateur plan',
        content: 'Deux plaques parallèles distantes de $d$, soumises à une tension $U$. Le champ électrique entre les plaques est uniforme et vaut :',
      },
      {
        type: 'math',
        tex: 'E = \\frac{U}{d} \\quad (\\text{V\\,m}^{-1})',
      },
      {
        type: 'definition',
        title: 'Force sur une charge',
        content: 'La force électrique sur une charge $q$ vaut $\\vec{F} = q\\,\\vec{E}$. Pour un électron ($q = -e < 0$), la force est **opposée** à $\\vec{E}$ (vers la plaque positive).',
      },
      {
        type: 'math',
        tex: '\\|\\vec{F}\\| = eE = \\frac{eU}{d}',
      },
      {
        type: 'definition',
        title: 'Accélération (poids négligé)',
        content: 'Application de la RFD ($\\vec{F} = m_e\\vec{a}$) :',
      },
      {
        type: 'math',
        tex: 'a = \\frac{eE}{m_e} = \\frac{eU}{m_e d}',
      },
      {
        type: 'property',
        title: 'Analogie avec le projectile',
        items: [
          'Axe $x$ : MRU (force nulle) → $x = v_0 t$',
          'Axe $y$ : MRUA → $y = \\frac{1}{2}at^2$ (départ au repos en $y$)',
          'Trajectoire : $y = \\dfrac{a}{2v_0^2}\\,x^2$ (parabole)',
        ],
      },
      {
        type: 'definition',
        title: 'Déviation totale sur l\'écran',
        content: 'Avec $L$ la longueur des plaques et $D$ la distance plaques–écran :',
      },
      {
        type: 'math',
        tex: 'Y = \\frac{eEL}{m_e v_0^2}\\left(D + \\frac{L}{2}\\right)',
      },
    ],
  },
];

function CourseTab() {
  const [open, setOpen] = useState<Set<string>>(new Set(['cinematique']));
  const toggle = (id: string) =>
    setOpen(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-3 pb-4">
      {SECTIONS.map(sec => (
        <div key={sec.id}
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: `hsl(${sec.color} / 0.25)`, background: `hsl(${sec.color} / 0.05)` }}>

          {/* Section header */}
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
            onClick={() => toggle(sec.id)}>
            <span className="shrink-0 text-[10px] font-black px-2 py-1 rounded-md tracking-widest"
              style={{ background: `hsl(${sec.color} / 0.2)`, color: `hsl(${sec.color})`, border: `1px solid hsl(${sec.color} / 0.4)` }}>
              {sec.tag}
            </span>
            <span className="font-bold text-white flex-1">{sec.title}</span>
            {open.has(sec.id)
              ? <ChevronUp size={16} className="text-white/30 shrink-0" />
              : <ChevronDown size={16} className="text-white/30 shrink-0" />}
          </button>

          <AnimatePresence>
            {open.has(sec.id) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 space-y-3.5 border-t"
                  style={{ borderColor: `hsl(${sec.color} / 0.2)` }}>
                  {sec.blocks.map((b, i) => <CourseBlock key={i} block={b} color={sec.color} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

function CourseBlock({ block, color }: { block: BlockType; color: string }) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-sm text-white/75 leading-relaxed">
          <MixedText text={block.content} />
        </p>
      );

    case 'math':
      return (
        <div className="relative rounded-xl overflow-hidden"
          style={{ background: `hsl(${color} / 0.08)`, border: `1px solid hsl(${color} / 0.22)` }}>
          {block.label && (
            <span className="absolute top-2 right-3 text-[10px] font-bold opacity-50"
              style={{ color: `hsl(${color})` }}>{block.label}</span>
          )}
          <div className="px-4 py-3 text-center">
            <BlockMath tex={block.tex} />
          </div>
        </div>
      );

    case 'definition':
      return (
        <div className="rounded-xl overflow-hidden"
          style={{ border: `1px solid hsl(${color} / 0.3)` }}>
          <div className="px-3 py-1.5 text-xs font-bold"
            style={{ background: `hsl(${color} / 0.15)`, color: `hsl(${color})` }}>
            {block.title}
          </div>
          <div className="px-3 py-2.5">
            <p className="text-sm text-white/80 leading-relaxed">
              <MixedText text={block.content} />
            </p>
          </div>
        </div>
      );

    case 'law':
      return (
        <div className="rounded-xl overflow-hidden border border-emerald-500/30">
          <div className="px-3 py-1.5 bg-emerald-500/15 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-black flex items-center justify-center">
              {block.number}
            </span>
            <span className="text-xs font-bold text-emerald-300">{block.title}</span>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-sm text-white/80 leading-relaxed">
              <MixedText text={block.content} />
            </p>
          </div>
        </div>
      );

    case 'property':
      return (
        <div className="rounded-xl overflow-hidden"
          style={{ background: `hsl(${color} / 0.06)`, border: `1px solid hsl(${color} / 0.2)` }}>
          <div className="px-3 py-1.5 text-[11px] font-bold tracking-wide"
            style={{ color: `hsl(${color} / 0.9)` }}>
            {block.title}
          </div>
          <ul className="px-3 pb-2.5 space-y-1.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-2 items-start text-sm text-white/75">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: `hsl(${color})` }} />
                <MixedText text={item} />
              </li>
            ))}
          </ul>
        </div>
      );

    case 'method':
      return (
        <div className="space-y-2">
          {block.steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center mt-0.5"
                style={{ background: `hsl(${color} / 0.2)`, border: `1px solid hsl(${color} / 0.45)`, color: `hsl(${color})` }}>
                {i + 1}
              </span>
              <p className="text-sm text-white/80 leading-relaxed pt-1">
                <MixedText text={step} />
              </p>
            </div>
          ))}
        </div>
      );

    case 'warning':
      return (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex gap-2.5 items-start">
          <span className="text-amber-400 mt-0.5 text-base shrink-0">⚠</span>
          <p className="text-sm text-amber-200/90 leading-relaxed">
            <MixedText text={block.content} />
          </p>
        </div>
      );

    case 'tip':
      return (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 flex gap-2.5 items-start">
          <span className="text-emerald-400 mt-0.5 text-base shrink-0">💡</span>
          <p className="text-sm text-emerald-200/90 leading-relaxed">
            <MixedText text={block.content} />
          </p>
        </div>
      );

    default:
      return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// FICHE SYNTHÈSE
// ══════════════════════════════════════════════════════════════════════════════

const FICHE_SECTIONS = [
  {
    title: 'Cinématique',
    color: '205 85% 62%',
    rows: [
      { label: 'Position', tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j}' },
      { label: 'Vitesse', tex: '\\vec{v} = \\dfrac{d\\overrightarrow{OM}}{dt} \\quad \\text{(tangente à la trajectoire)}' },
      { label: 'Accélération', tex: '\\vec{a} = \\dfrac{d\\vec{v}}{dt}' },
      { label: 'Norme', tex: 'v = \\sqrt{v_x^2+v_y^2}' },
    ],
  },
  {
    title: 'Lois de Newton',
    color: '142 65% 48%',
    rows: [
      { label: '1ʳᵉ loi',  tex: '\\sum\\vec{F}_{\\text{ext}} = \\vec{0} \\Rightarrow \\vec{v} = \\text{cste (MRU)}' },
      { label: '2ᵉ loi',  tex: '\\sum\\vec{F}_{\\text{ext}} = m\\vec{a}' },
      { label: '3ᵉ loi',  tex: '\\vec{F}_{B/A} = -\\vec{F}_{A/B} \\quad \\text{(corps différents)}' },
    ],
  },
  {
    title: 'Projectile (sans frottement)',
    color: '43 90% 52%',
    rows: [
      { label: 'Équations', tex: 'x = v_0\\cos\\alpha\\cdot t \\;,\\quad y = v_0\\sin\\alpha\\cdot t - \\tfrac{1}{2}gt^2' },
      { label: 'Trajectoire', tex: 'y = x\\tan\\alpha - \\dfrac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2' },
      { label: 'Flèche', tex: 'H = \\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}' },
      { label: 'Portée', tex: 'D = \\dfrac{v_0^2\\sin 2\\alpha}{g} \\;\\;(\\text{max à }45°)' },
    ],
  },
  {
    title: 'Particule chargée',
    color: '270 60% 62%',
    rows: [
      { label: 'Champ',       tex: 'E = \\dfrac{U}{d}' },
      { label: 'Force',       tex: '\\vec{F} = q\\vec{E} \\;\\;\\Rightarrow\\;\\; F = eE \\;\\text{(électron, opposée à }\\vec{E}\\text{)}' },
      { label: 'Accélération', tex: 'a = \\dfrac{eE}{m_e}' },
      { label: 'Trajectoire', tex: 'y = \\dfrac{a}{2v_0^2}\\,x^2' },
      { label: 'Écran',       tex: 'Y = \\dfrac{eEL}{m_e v_0^2}\\!\\left(D+\\tfrac{L}{2}\\right)' },
    ],
  },
];

const DONNEES_UTILES = [
  { label: 'g', tex: '9{,}81 \\;\\text{m\\,s}^{-2}' },
  { label: 'e', tex: '1{,}6\\times10^{-19} \\;\\text{C}' },
  { label: 'm_e', tex: '9{,}1\\times10^{-31} \\;\\text{kg}' },
];

function FicheTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-3 pb-4">

      {/* Titre */}
      <div className="text-center py-2">
        <h3 className="text-base font-black text-white tracking-wide">FICHE SYNTHÈSE</h3>
        <p className="text-xs text-white/40 font-medium">Newton & Champ uniforme · Terminale</p>
      </div>

      {FICHE_SECTIONS.map(sec => (
        <div key={sec.title} className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid hsl(${sec.color} / 0.35)` }}>
          {/* Header */}
          <div className="px-4 py-2.5 flex items-center gap-2"
            style={{ background: `hsl(${sec.color} / 0.15)` }}>
            <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${sec.color})` }} />
            <span className="text-sm font-bold" style={{ color: `hsl(${sec.color})` }}>{sec.title}</span>
          </div>
          {/* Rows */}
          <div className="divide-y" style={{ '--divide-color': `hsl(${sec.color} / 0.1)` } as React.CSSProperties}>
            {sec.rows.map((row, i) => (
              <div key={i} className="flex gap-0 items-center divide-x"
                style={{ borderColor: `hsl(${sec.color} / 0.1)` }}>
                <div className="w-24 shrink-0 px-3 py-2.5 text-[11px] font-semibold text-white/40">
                  {row.label}
                </div>
                <div className="flex-1 px-3 py-2 overflow-x-auto">
                  <BlockMath tex={row.tex} className="!py-0 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Données utiles */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <div className="px-4 py-2.5 bg-white/8">
          <span className="text-xs font-bold text-white/60 tracking-wider uppercase">Données utiles</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-3">
          {DONNEES_UTILES.map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="text-xs text-white/40">{d.label} =</span>
              <BlockMath tex={d.tex} className="!py-0" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EXERCICES
// ══════════════════════════════════════════════════════════════════════════════

function ExercicesTab({
  module, getStatus, accent, onOpen,
}: {
  module: PhysicsModule;
  getStatus: (l: ModuleLevel) => 'completed' | 'current' | 'locked';
  accent: string;
  onOpen: (l: ModuleLevel) => void;
}) {
  const byTier = TIER_META.map(tm => ({
    ...tm,
    levels: module.levels.filter(l => l.tier === tm.tier),
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-4 pb-4">
      {byTier.map(tier => (
        <div key={tier.tier}>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-black px-2 tracking-wider"
              style={{ color: `hsl(${tier.hsl})` }}>
              {tier.label}
            </span>
            <span className="text-[10px] text-white/30">{tier.sub}</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-2">
            {tier.levels.map(level => {
              const status = getStatus(level);
              const isLocked = status === 'locked';
              return (
                <motion.button key={level.id}
                  onClick={() => !isLocked && onOpen(level)}
                  disabled={isLocked}
                  whileTap={isLocked ? {} : { scale: 0.98 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left
                    ${isLocked
                      ? 'opacity-40 cursor-not-allowed bg-white/3 border-white/5'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                    }`}>
                  {/* Icône */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all
                    ${status === 'completed' ? 'bg-emerald-500/20 border-emerald-500/40' :
                      status === 'current' ? 'bg-white/8' : 'bg-white/4 border-white/8'}`}
                    style={status === 'current' ? {
                      borderColor: `hsl(${tier.hsl} / 0.7)`,
                      boxShadow: `0 0 12px hsl(${tier.hsl} / 0.35)`,
                    } : {}}>
                    {status === 'completed'
                      ? <CheckCircle2 size={18} className="text-emerald-400" />
                      : status === 'current'
                      ? <Play size={15} style={{ color: `hsl(${tier.hsl})` }} />
                      : <Lock size={13} className="text-white/25" />}
                  </div>
                  {/* Texte */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isLocked ? 'text-white/35' : 'text-white'}`}>
                      {level.title}
                    </p>
                    <p className={`text-xs ${isLocked ? 'text-white/20' : 'text-white/45'}`}>
                      {level.notion} · {DIFF_LABEL[level.difficulty]} · {level.timeMin} min
                    </p>
                  </div>
                  {/* XP */}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0
                    ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/8 text-white/40'}`}>
                    +{level.xpReward} XP
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
