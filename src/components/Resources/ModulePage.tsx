import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Gamepad2,
  CheckCircle2, Lock, Play, ChevronDown, ChevronRight,
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
      return <QcmView questions={NEWTON_QCM} xpReward={activeLevel.xpReward}
        onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
        onBack={() => setActiveLevel(null)} />;
    }
    return <ExerciseView level={activeLevel}
      content={NEWTON_EXERCISES.find(e => e.id === activeLevel.id) ?? null}
      onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
      onBack={() => setActiveLevel(null)} />;
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 mb-5">
        <button onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white mt-0.5">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            {module.subject} · {module.level}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5 leading-tight">{module.title}</h2>
          <p className="text-sm text-white/40 mt-0.5">{module.subtitle}</p>
        </div>
      </div>

      {/* ── Progress ───────────────────────────────────────────────────────── */}
      <div className="mb-5 px-1">
        <div className="flex justify-between text-xs mb-1.5 text-white/40">
          <span>{completedIds.size} / {module.levels.length} niveaux complétés</span>
          <span className="font-bold text-white/60">{earnedXp} / {totalXp} XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full rounded-full bg-sky-500"
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }} />
        </div>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl border border-white/8">
        {([
          { key: 'cours',     icon: BookOpen,  label: 'Cours' },
          { key: 'fiche',     icon: FileText,  label: 'Fiche' },
          { key: 'exercices', icon: Gamepad2,  label: 'Exercices' },
        ] as const).map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all
              ${tab === key ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}>
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {tab === 'cours'     && <CourseTab     key="cours" />}
        {tab === 'fiche'     && <FicheTab      key="fiche" />}
        {tab === 'exercices' && (
          <ExercicesTab key="exercices" module={module}
            getStatus={getStatus} onOpen={setActiveLevel} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COURS — mise en page style document
   ═══════════════════════════════════════════════════════════════════════════ */

type BlockType =
  | { type: 'para';       text: string }
  | { type: 'formula';    tex: string;   label?: string }
  | { type: 'definition'; title: string; text: string }
  | { type: 'law';        n: string;     title: string; text: string }
  | { type: 'property';   title: string; items: string[] }
  | { type: 'method';     steps: string[] }
  | { type: 'attention';  text: string }
  | { type: 'astuce';     text: string };

interface Section {
  id: string;
  num: string;
  title: string;
  blocks: BlockType[];
}

const COURS: Section[] = [
  /* ── §1 Cinématique ─────────────────────────────────────────────────── */
  {
    id: 'cine', num: '1', title: 'Cinématique vectorielle',
    blocks: [
      {
        type: 'definition', title: 'Vecteur position',
        text: 'Le vecteur $\\overrightarrow{OM}(t)$ relie l\'origine O du repère au point mobile M à l\'instant $t$.',
      },
      { type: 'formula', tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j}' },
      {
        type: 'definition', title: 'Vecteur vitesse',
        text: 'Dérivée du vecteur position par rapport au temps. Il est **tangent à la trajectoire**, orienté dans le sens du mouvement.',
      },
      { type: 'formula', tex: '\\vec{v}(t) = \\frac{d\\,\\overrightarrow{OM}}{dt} = \\dot{x}\\,\\vec{i} + \\dot{y}\\,\\vec{j} \\qquad v = \\sqrt{v_x^2 + v_y^2}' },
      {
        type: 'definition', title: 'Vecteur accélération',
        text: 'Dérivée du vecteur vitesse par rapport au temps.',
      },
      { type: 'formula', tex: '\\vec{a}(t) = \\frac{d\\,\\vec{v}}{dt} = \\ddot{x}\\,\\vec{i} + \\ddot{y}\\,\\vec{j}' },
      {
        type: 'property', title: 'Intégration',
        items: [
          'Si $\\vec{a}(t)$ est connue : $\\vec{v}(t) = \\int \\vec{a}\\,dt + \\vec{v}_0$',
          'Puis : $\\overrightarrow{OM}(t) = \\int \\vec{v}\\,dt + \\overrightarrow{OM}_0$',
          'Les constantes $\\vec{v}_0$ et $\\overrightarrow{OM}_0$ sont les **conditions initiales**.',
        ],
      },
    ],
  },
  /* ── §2–3 Lois Newton ───────────────────────────────────────────────── */
  {
    id: 'newton', num: '2–3', title: 'Les trois lois de Newton',
    blocks: [
      {
        type: 'law', n: '1', title: 'Principe d\'inertie',
        text: 'Dans un référentiel galiléen, si $\\sum\\vec{F}_{\\text{ext}} = \\vec{0}$, alors le centre de masse est **au repos ou en mouvement rectiligne uniforme (MRU)**.',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{a} = \\vec{0} \\iff \\vec{v} = \\text{constante}' },
      {
        type: 'law', n: '2', title: 'Relation fondamentale de la dynamique (RFD)',
        text: 'Dans un référentiel galiléen, la somme des forces extérieures est égale au produit de la masse par l\'accélération du centre de masse.',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}', label: 'RFD' },
      {
        type: 'law', n: '3', title: 'Principe des actions réciproques',
        text: 'Si A exerce une force $\\vec{F}_{A/B}$ sur B, alors B exerce sur A une force $\\vec{F}_{B/A}$ vérifiant :',
      },
      { type: 'formula', tex: '\\vec{F}_{B/A} = -\\vec{F}_{A/B}' },
      {
        type: 'property', title: 'Paire action–réaction',
        items: [
          'Même droite d\'action, même norme',
          'Sens **opposés**',
          'S\'exercent sur **deux corps différents**',
        ],
      },
      {
        type: 'attention',
        text: 'Le poids $\\vec{P}$ et la réaction $\\vec{N}$ de la table sur un livre immobile **ne sont pas** une paire action–réaction : elles s\'exercent toutes deux sur le livre. Elles sont égales et opposées par la 1ʳᵉ loi.',
      },
    ],
  },
  /* ── §4 Méthode ────────────────────────────────────────────────────── */
  {
    id: 'methode', num: '4', title: 'Méthode en 5 étapes',
    blocks: [
      {
        type: 'para',
        text: 'Cette méthode universelle s\'applique à tout problème de mécanique (chute, plan incliné, condensateur…).',
      },
      {
        type: 'method',
        steps: [
          'Choisir le **système** étudié et un **référentiel galiléen** adapté.',
          'Faire le **bilan des forces extérieures** s\'exerçant sur le système (schéma avec flèches correctement orientées).',
          'Appliquer la **2ᵉ loi de Newton** : $\\sum\\vec{F}_{\\text{ext}} = m\\vec{a}$.',
          '**Projeter** sur les axes du repère choisi pour obtenir les équations scalaires.',
          '**Intégrer** avec les conditions initiales pour trouver $\\vec{v}(t)$ puis $\\overrightarrow{OM}(t)$.',
        ],
      },
      {
        type: 'astuce',
        text: 'Toujours écrire la relation vectorielle $\\sum\\vec{F} = m\\vec{a}$ **avant** de projeter — ne jamais projeter directement.',
      },
    ],
  },
  /* ── §5 Projectile ─────────────────────────────────────────────────── */
  {
    id: 'projectile', num: '5', title: 'Mouvement d\'un projectile',
    blocks: [
      {
        type: 'para',
        text: 'Seule la pesanteur agit ($\\vec{P} = m\\vec{g}$, frottements négligés). La RFD donne $\\vec{a} = \\vec{g}$, soit $a_x = 0$ et $a_y = -g$.',
      },
      {
        type: 'property', title: 'Équations horaires (vitesse initiale $v_0$ à l\'angle $\\alpha$)',
        items: [
          '$x(t) = v_0\\cos\\alpha \\cdot t$',
          '$y(t) = v_0\\sin\\alpha \\cdot t - \\dfrac{1}{2}g\\,t^2$',
        ],
      },
      {
        type: 'definition', title: 'Équation de la trajectoire (parabole)',
        text: 'En éliminant $t$ :',
      },
      { type: 'formula', tex: 'y = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2' },
      {
        type: 'property', title: 'Grandeurs caractéristiques',
        items: [
          '**Flèche** (au sommet, $v_y = 0$) :  $H = \\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}$',
          '**Portée** (retour au sol) : $D = \\dfrac{v_0^2\\sin 2\\alpha}{g}$',
          '**Portée maximale** pour $\\alpha = 45°$ : $D_{\\max} = \\dfrac{v_0^2}{g}$',
        ],
      },
    ],
  },
  /* ── §6 Champ électrique ───────────────────────────────────────────── */
  {
    id: 'champ', num: '6', title: 'Particule chargée en champ uniforme',
    blocks: [
      {
        type: 'definition', title: 'Condensateur plan',
        text: 'Deux plaques distantes de $d$, sous tension $U$. Le champ est uniforme et perpendiculaire aux plaques.',
      },
      { type: 'formula', tex: 'E = \\frac{U}{d} \\quad (\\text{en V\\,m}^{-1})' },
      {
        type: 'definition', title: 'Force sur un électron',
        text: 'L\'électron de charge $-e$ subit une force **opposée à $\\vec{E}$** (vers la plaque positive).',
      },
      { type: 'formula', tex: 'F = eE = \\frac{eU}{d}' },
      {
        type: 'property', title: 'Accélération (poids négligé)',
        items: [
          'RFD : $m_e\\vec{a} = \\vec{F}$, donc $a = \\dfrac{eE}{m_e} = \\dfrac{eU}{m_e d}$',
          'Axe $x$ (horizontal) : MRU → $x = v_0 t$',
          'Axe $y$ (vertical) : MRUA → $y = \\dfrac{1}{2}at^2$',
          'Trajectoire : $y = \\dfrac{a}{2v_0^2}\\,x^2$ (parabole, analogue au projectile)',
        ],
      },
      {
        type: 'definition', title: 'Déviation totale sur l\'écran',
        text: 'Avec $L$ la longueur des plaques et $D$ la distance plaques–écran :',
      },
      { type: 'formula', tex: 'Y = \\frac{eEL}{m_e v_0^2}\\!\\left(D + \\frac{L}{2}\\right)', label: 'formule écran' },
      {
        type: 'astuce',
        text: 'Le mouvement entre les plaques est **identique à celui d\'un projectile** : même méthode, les rôles de la gravité et du champ électrique sont analogues.',
      },
    ],
  },
];

function CourseTab() {
  const [open, setOpen] = useState<Set<string>>(new Set(['cine']));
  const toggle = (id: string) =>
    setOpen(p => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-2 pb-6">
      {COURS.map(sec => (
        <div key={sec.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">

          {/* Section header */}
          <button
            onClick={() => toggle(sec.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-black flex items-center justify-center">
              {sec.num}
            </span>
            <span className="flex-1 font-bold text-white text-[15px]">{sec.title}</span>
            <ChevronDown size={16} className={`text-white/30 transition-transform duration-200 ${open.has(sec.id) ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {open.has(sec.id) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <div className="px-4 pb-5 pt-1 space-y-3 border-t border-white/8">
                  {sec.blocks.map((b, i) => <Block key={i} b={b} />)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

/* Blocs de contenu — style document ─────────────────────────────────────── */
function Block({ b }: { b: BlockType }) {
  switch (b.type) {

    /* Paragraphe libre */
    case 'para':
      return (
        <p className="text-[13.5px] text-white/70 leading-relaxed">
          <MixedText text={b.text} />
        </p>
      );

    /* Formule display math */
    case 'formula':
      return (
        <div className="relative my-1">
          <div className="rounded-lg bg-[#0f1825] border border-sky-900/60 py-3 px-4 text-center overflow-x-auto">
            <BlockMath tex={b.tex} />
          </div>
          {b.label && (
            <span className="absolute top-1.5 right-2.5 text-[10px] font-bold text-sky-500/60 uppercase tracking-wider">
              {b.label}
            </span>
          )}
        </div>
      );

    /* Définition — bordure bleue gauche */
    case 'definition':
      return (
        <div className="rounded-lg overflow-hidden border-l-4 border-sky-500 bg-sky-950/30 border border-sky-800/30 border-l-4">
          <div className="px-3 py-1.5 bg-sky-500/15 border-b border-sky-800/30">
            <span className="text-[11px] font-black text-sky-400 uppercase tracking-widest">Définition</span>
            <span className="text-[12px] font-semibold text-sky-200 ml-2">— {b.title}</span>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[13.5px] text-white/80 leading-relaxed">
              <MixedText text={b.text} />
            </p>
          </div>
        </div>
      );

    /* Loi Newton — bandeau vert numéroté */
    case 'law':
      return (
        <div className="rounded-lg overflow-hidden border border-emerald-700/40 bg-emerald-950/25">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-emerald-700/20 border-b border-emerald-700/30">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-black text-white flex items-center justify-center shrink-0">
              {b.n}
            </span>
            <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Loi de Newton</span>
            <span className="text-[12px] font-semibold text-emerald-200">— {b.title}</span>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[13.5px] text-white/80 leading-relaxed">
              <MixedText text={b.text} />
            </p>
          </div>
        </div>
      );

    /* Propriété — bordure violette gauche */
    case 'property':
      return (
        <div className="rounded-lg overflow-hidden border-l-4 border-violet-500 bg-violet-950/20 border border-violet-800/25">
          <div className="px-3 py-1.5 bg-violet-500/12 border-b border-violet-800/25">
            <span className="text-[11px] font-black text-violet-400 uppercase tracking-widest">Propriété</span>
            <span className="text-[12px] font-semibold text-violet-200 ml-2">— {b.title}</span>
          </div>
          <ul className="px-3 py-2.5 space-y-2">
            {b.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 items-baseline">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-2" />
                <span className="text-[13.5px] text-white/80 leading-relaxed">
                  <MixedText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    /* Méthode — étapes numérotées */
    case 'method':
      return (
        <div className="rounded-lg overflow-hidden border border-amber-700/35 bg-amber-950/20">
          <div className="px-3 py-1.5 bg-amber-600/15 border-b border-amber-700/30">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">Méthode</span>
          </div>
          <ol className="px-3 py-2.5 space-y-2.5">
            {b.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/25 border border-amber-500/50 text-amber-300 text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[13.5px] text-white/80 leading-relaxed">
                  <MixedText text={step} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      );

    /* Attention */
    case 'attention':
      return (
        <div className="rounded-lg border border-red-700/40 bg-red-950/20 px-3 py-2.5 flex gap-2.5 items-start">
          <span className="text-red-400 text-base shrink-0 mt-0.5">⚠</span>
          <div>
            <p className="text-[11px] font-black text-red-400 uppercase tracking-widest mb-1">Attention</p>
            <p className="text-[13px] text-red-100/80 leading-relaxed">
              <MixedText text={b.text} />
            </p>
          </div>
        </div>
      );

    /* Astuce */
    case 'astuce':
      return (
        <div className="rounded-lg border border-teal-700/40 bg-teal-950/20 px-3 py-2.5 flex gap-2.5 items-start">
          <span className="text-teal-400 text-base shrink-0 mt-0.5">💡</span>
          <div>
            <p className="text-[11px] font-black text-teal-400 uppercase tracking-widest mb-1">Astuce</p>
            <p className="text-[13px] text-teal-100/80 leading-relaxed">
              <MixedText text={b.text} />
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FICHE DE RÉVISION — tableau de formules
   ═══════════════════════════════════════════════════════════════════════════ */

const FICHE = [
  {
    title: '§1  Cinématique',
    color: { bg: 'bg-sky-950/40', border: 'border-sky-700/40', head: 'bg-sky-700/20', label: 'text-sky-300' },
    rows: [
      { label: 'Position',       tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i}+y(t)\\,\\vec{j}' },
      { label: 'Vitesse',        tex: '\\vec{v}=\\dfrac{d\\overrightarrow{OM}}{dt}\\quad(\\text{tangente traj.})' },
      { label: 'Accélération',   tex: '\\vec{a}=\\dfrac{d\\vec{v}}{dt}' },
      { label: 'Norme',          tex: 'v=\\sqrt{v_x^2+v_y^2}' },
    ],
  },
  {
    title: '§2–3  Lois de Newton',
    color: { bg: 'bg-emerald-950/40', border: 'border-emerald-700/40', head: 'bg-emerald-700/20', label: 'text-emerald-300' },
    rows: [
      { label: '1ʳᵉ loi',       tex: '\\sum\\vec{F}_{\\text{ext}}=\\vec{0}\\Rightarrow\\vec{v}=\\text{cste}' },
      { label: '2ᵉ loi',        tex: '\\sum\\vec{F}_{\\text{ext}}=m\\vec{a}' },
      { label: '3ᵉ loi',        tex: '\\vec{F}_{B/A}=-\\vec{F}_{A/B}\\;(\\text{corps ≠})' },
    ],
  },
  {
    title: '§5  Projectile (sans frottement)',
    color: { bg: 'bg-violet-950/40', border: 'border-violet-700/40', head: 'bg-violet-700/20', label: 'text-violet-300' },
    rows: [
      { label: 'Horaires',       tex: 'x=v_0\\cos\\alpha\\cdot t\\;,\\quad y=v_0\\sin\\alpha\\cdot t-\\tfrac12 g\\,t^2' },
      { label: 'Trajectoire',    tex: 'y=x\\tan\\alpha-\\dfrac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2' },
      { label: 'Flèche',        tex: 'H=\\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}' },
      { label: 'Portée',         tex: 'D=\\dfrac{v_0^2\\sin2\\alpha}{g}\\quad(D_{\\max}\\text{ à }45°)' },
    ],
  },
  {
    title: '§6  Particule chargée',
    color: { bg: 'bg-amber-950/40', border: 'border-amber-700/40', head: 'bg-amber-700/20', label: 'text-amber-300' },
    rows: [
      { label: 'Champ',          tex: 'E=\\dfrac{U}{d}\\quad(\\text{V\\,m}^{-1})' },
      { label: 'Force',          tex: 'F=eE\\;(\\text{opposée à }\\vec{E}\\text{ pour e}^-)' },
      { label: 'Accélération',   tex: 'a=\\dfrac{eE}{m_e}' },
      { label: 'Trajectoire',    tex: 'y=\\dfrac{a}{2v_0^2}\\,x^2' },
      { label: 'Écran',          tex: 'Y=\\dfrac{eEL}{m_e v_0^2}\\!\\left(D+\\dfrac{L}{2}\\right)' },
    ],
  },
];

const CONSTANTES = [
  { sym: 'g',   tex: '9{,}81\\;\\text{m\\,s}^{-2}' },
  { sym: 'e',   tex: '1{,}6\\times10^{-19}\\;\\text{C}' },
  { sym: 'm_e', tex: '9{,}1\\times10^{-31}\\;\\text{kg}' },
];

function FicheTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="pb-6 space-y-3">

      {/* Titre de la fiche */}
      <div className="text-center pt-1 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5">
          <FileText size={13} className="text-white/50" />
          <span className="text-[12px] font-bold text-white/60 uppercase tracking-widest">Fiche de révision</span>
        </div>
        <p className="text-white font-black text-base mt-2">Newton & Champ uniforme — Terminale</p>
      </div>

      {/* Sections de formules */}
      {FICHE.map(sec => (
        <div key={sec.title}
          className={`rounded-xl overflow-hidden border ${sec.color.bg} ${sec.color.border}`}>
          {/* Header */}
          <div className={`px-4 py-2 ${sec.color.head} border-b ${sec.color.border}`}>
            <span className={`text-[12px] font-black ${sec.color.label} uppercase tracking-wider`}>
              {sec.title}
            </span>
          </div>
          {/* Lignes */}
          <div className="divide-y divide-white/5">
            {sec.rows.map((row, i) => (
              <div key={i} className="flex items-center min-h-[2.75rem]">
                {/* Étiquette */}
                <div className="w-[90px] shrink-0 px-3 py-2 self-stretch flex items-center border-r border-white/8">
                  <span className="text-[11px] font-semibold text-white/35 leading-tight">{row.label}</span>
                </div>
                {/* Formule */}
                <div className="flex-1 px-3 py-1 overflow-x-auto">
                  <BlockMath tex={row.tex} className="!py-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Constantes */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <div className="px-4 py-2 bg-white/5 border-b border-white/8">
          <span className="text-[12px] font-black text-white/50 uppercase tracking-wider">Constantes utiles</span>
        </div>
        <div className="divide-y divide-white/5">
          {CONSTANTES.map(c => (
            <div key={c.sym} className="flex items-center min-h-[2.5rem]">
              <div className="w-[90px] shrink-0 px-3 py-1 self-stretch flex items-center border-r border-white/8">
                <span className="text-[11px] font-mono text-white/40">{c.sym}</span>
              </div>
              <div className="flex-1 px-3 py-1 overflow-x-auto">
                <BlockMath tex={c.tex} className="!py-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXERCICES — carte des niveaux
   ═══════════════════════════════════════════════════════════════════════════ */

function ExercicesTab({
  module, getStatus, onOpen,
}: {
  module: PhysicsModule;
  getStatus: (l: ModuleLevel) => 'completed' | 'current' | 'locked';
  onOpen: (l: ModuleLevel) => void;
}) {
  const byTier = TIER_META.map(tm => ({
    ...tm,
    levels: module.levels.filter(l => l.tier === tm.tier),
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-5 pb-6">
      {byTier.map(tier => (
        <div key={tier.tier}>
          {/* Tier header */}
          <div className="flex items-center gap-3 mb-2.5">
            <div className="h-px flex-1" style={{ background: `hsl(${tier.hsl} / 0.3)` }} />
            <div>
              <span className="text-[11px] font-black tracking-widest uppercase"
                style={{ color: `hsl(${tier.hsl})` }}>
                {tier.label}
              </span>
              <span className="text-[10px] text-white/25 ml-2">{tier.sub}</span>
            </div>
            <div className="h-px flex-1" style={{ background: `hsl(${tier.hsl} / 0.3)` }} />
          </div>

          <div className="space-y-1.5">
            {tier.levels.map(level => {
              const status = getStatus(level);
              const locked = status === 'locked';
              return (
                <motion.button key={level.id}
                  onClick={() => !locked && onOpen(level)}
                  disabled={locked}
                  whileTap={locked ? {} : { scale: 0.985 }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all
                    ${locked
                      ? 'opacity-35 cursor-not-allowed bg-white/[0.02] border-white/5'
                      : status === 'completed'
                        ? 'bg-emerald-950/30 border-emerald-700/30 hover:border-emerald-600/50 cursor-pointer'
                        : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer'
                    }`}>
                  {/* Icône état */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all
                    ${status === 'completed' ? 'bg-emerald-500/25 border-emerald-500/50' :
                      status === 'current' ? 'bg-white/10' : 'bg-white/5 border-white/10'}`}
                    style={status === 'current' ? {
                      borderColor: `hsl(${tier.hsl} / 0.7)`,
                      boxShadow: `0 0 10px hsl(${tier.hsl} / 0.3)`,
                    } : {}}>
                    {status === 'completed'
                      ? <CheckCircle2 size={16} className="text-emerald-400" />
                      : status === 'current'
                      ? <Play size={13} style={{ color: `hsl(${tier.hsl})` }} />
                      : <Lock size={12} className="text-white/25" />}
                  </div>

                  {/* Texte */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13.5px] font-semibold truncate ${locked ? 'text-white/30' : 'text-white'}`}>
                      {level.title}
                    </p>
                    <p className={`text-[11px] ${locked ? 'text-white/15' : 'text-white/40'}`}>
                      {level.notion} · {DIFF_LABEL[level.difficulty]} · {level.timeMin} min
                    </p>
                  </div>

                  {/* XP + chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full
                      ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/8 text-white/35'}`}>
                      +{level.xpReward} XP
                    </span>
                    {!locked && <ChevronRight size={14} className="text-white/20" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
