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
    if (activeLevel.id === 'newton-qcm') {
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
   TYPES DE BLOCS
   ═══════════════════════════════════════════════════════════════════════════ */
type BlockType =
  | { type: 'para';       text: string }
  | { type: 'formula';    tex: string; label?: string }
  | { type: 'definition'; title: string; text: string }
  | { type: 'law';        n: string; title: string; text: string }
  | { type: 'property';   title: string; items: string[] }
  | { type: 'method';     steps: string[] }
  | { type: 'example';    title: string; lines: string[] }
  | { type: 'figure';     caption: string; svg: () => JSX.Element }
  | { type: 'attention';  text: string }
  | { type: 'astuce';     text: string };

interface Section { id: string; num: string; title: string; blocks: BlockType[] }

/* ═══════════════════════════════════════════════════════════════════════════
   SCHÉMAS SVG
   ═══════════════════════════════════════════════════════════════════════════ */

function FigTrajectoire() {
  return (
    <svg viewBox="0 0 300 160" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="20" y1="140" x2="280" y2="140" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrowG)" />
      <line x1="20" y1="140" x2="20" y2="10" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrowG)" />
      <defs>
        <marker id="arrowG" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4b5563" />
        </marker>
        <marker id="arrowB" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrowV" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
      </defs>
      {/* Étiquettes axes */}
      <text x="282" y="144" fill="#6b7280" fontSize="11" fontFamily="sans-serif">x</text>
      <text x="12" y="10" fill="#6b7280" fontSize="11" fontFamily="sans-serif">y</text>
      {/* Trajectoire parabolique */}
      <path d="M40,130 Q160,20 270,115" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,3" />
      {/* Point M */}
      <circle cx="130" cy="52" r="4" fill="#38bdf8" />
      <text x="135" y="50" fill="#38bdf8" fontSize="11" fontFamily="sans-serif">M</text>
      {/* Vecteur vitesse (tangente) */}
      <line x1="130" y1="52" x2="180" y2="28" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowV)" />
      <text x="178" y="22" fill="#34d399" fontSize="11" fontFamily="sans-serif" fontStyle="italic">v⃗</text>
      {/* Vecteur accélération */}
      <line x1="130" y1="52" x2="130" y2="88" stroke="#fb923c" strokeWidth="2" markerEnd="url(#arrowO)" />
      <text x="135" y="86" fill="#fb923c" fontSize="11" fontFamily="sans-serif" fontStyle="italic">a⃗</text>
      <defs>
        <marker id="arrowO" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#fb923c" />
        </marker>
      </defs>
      {/* Vecteur position */}
      <line x1="20" y1="140" x2="128" y2="54" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrowP)" />
      <text x="55" y="108" fill="#a78bfa" fontSize="10" fontFamily="sans-serif" fontStyle="italic">OM⃗</text>
      <defs>
        <marker id="arrowP" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
        </marker>
      </defs>
      {/* Origine O */}
      <text x="8" y="152" fill="#6b7280" fontSize="11" fontFamily="sans-serif">O</text>
    </svg>
  );
}

function FigPlanIncline() {
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrW" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="white" />
        </marker>
        <marker id="arrGr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
        </marker>
        <marker id="arrR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#f87171" />
        </marker>
      </defs>
      {/* Plan incliné */}
      <polygon points="30,160 250,160 250,80" fill="#1e293b" stroke="#475569" strokeWidth="1.5"/>
      <line x1="30" y1="160" x2="250" y2="80" stroke="#64748b" strokeWidth="2"/>
      {/* Angle β */}
      <path d="M230,160 A20,20 0 0,0 240,143" fill="none" stroke="#94a3b8" strokeWidth="1.2"/>
      <text x="222" y="155" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" fontStyle="italic">β</text>
      {/* Solide (carré sur la pente) */}
      <rect x="120" y="95" width="28" height="24"
        transform="rotate(-18.4, 134, 107)"
        fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="2"/>
      {/* Centre de masse */}
      <circle cx="140" cy="108" r="3" fill="#38bdf8" />
      {/* Poids P */}
      <line x1="140" y1="108" x2="140" y2="158" stroke="#f87171" strokeWidth="2" markerEnd="url(#arrR)" />
      <text x="144" y="148" fill="#f87171" fontSize="12" fontFamily="sans-serif" fontStyle="italic">P⃗</text>
      {/* Réaction N */}
      <line x1="140" y1="108" x2="108" y2="72" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrGr)" />
      <text x="96" y="72" fill="#34d399" fontSize="12" fontFamily="sans-serif" fontStyle="italic">N⃗</text>
      {/* Axe x (parallèle pente) */}
      <line x1="140" y1="108" x2="200" y2="86" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" markerEnd="url(#arrW)" />
      <text x="202" y="84" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">x</text>
      {/* Axe y (perpendiculaire) */}
      <line x1="140" y1="108" x2="118" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,2" markerEnd="url(#arrW)" />
      <text x="109" y="66" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">y</text>
    </svg>
  );
}

function FigProjectile() {
  return (
    <svg viewBox="0 0 320 170" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrProj" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4b5563" />
        </marker>
        <marker id="arrBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
      </defs>
      {/* Sol */}
      <line x1="20" y1="145" x2="300" y2="145" stroke="#374151" strokeWidth="2"/>
      {/* Axes */}
      <line x1="30" y1="145" x2="295" y2="145" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrProj)" />
      <line x1="30" y1="145" x2="30" y2="15" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#arrProj)" />
      <text x="297" y="149" fill="#6b7280" fontSize="10">x</text>
      <text x="22" y="13" fill="#6b7280" fontSize="10">y</text>
      {/* Trajectoire parabolique */}
      <path d="M30,145 Q170,10 270,145" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
      {/* Sommet */}
      <circle cx="150" cy="23" r="3.5" fill="#f59e0b" />
      {/* H — trait vertical pointillé */}
      <line x1="150" y1="23" x2="150" y2="145" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4,3"/>
      <text x="154" y="88" fill="#f59e0b" fontSize="12" fontStyle="italic">H</text>
      {/* D — trait horizontal pointillé */}
      <line x1="30" y1="152" x2="270" y2="152" stroke="#34d399" strokeWidth="1.2" strokeDasharray="4,3"/>
      <line x1="30" y1="148" x2="30" y2="156" stroke="#34d399" strokeWidth="1.5"/>
      <line x1="270" y1="148" x2="270" y2="156" stroke="#34d399" strokeWidth="1.5"/>
      <text x="143" y="165" fill="#34d399" fontSize="12" fontStyle="italic">D</text>
      {/* Angle α */}
      <path d="M50,145 A22,22 0 0,0 64,126" fill="none" stroke="#a78bfa" strokeWidth="1.3"/>
      <text x="55" y="136" fill="#a78bfa" fontSize="11" fontStyle="italic">α</text>
      {/* Vecteur vitesse initiale */}
      <line x1="30" y1="145" x2="68" y2="117" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrP2)"/>
      <text x="56" y="113" fill="#a78bfa" fontSize="11" fontStyle="italic">v₀</text>
      <defs>
        <marker id="arrP2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
        </marker>
      </defs>
      {/* Labels lancement/impact */}
      <text x="22" y="158" fill="#6b7280" fontSize="9">O</text>
      <circle cx="30" cy="145" r="3" fill="#38bdf8"/>
      <circle cx="270" cy="145" r="3" fill="#38bdf8"/>
    </svg>
  );
}

function FigCondensateur() {
  return (
    <svg viewBox="0 0 300 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrE" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
        </marker>
        <marker id="arrEl" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
        </marker>
      </defs>
      {/* Plaque + (rouge) */}
      <rect x="30" y="25" width="240" height="14" rx="3" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5"/>
      <text x="8" y="37" fill="#f87171" fontSize="13" fontWeight="bold">+</text>
      {/* Plaque − (bleu) */}
      <rect x="30" y="142" width="240" height="14" rx="3" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
      <text x="10" y="155" fill="#60a5fa" fontSize="13" fontWeight="bold">−</text>
      {/* Champ E (flèches vers le bas) */}
      {[80, 140, 200].map(x => (
        <line key={x} x1={x} y1="50" x2={x} y2="135" stroke="#f59e0b" strokeWidth="1.5"
          markerEnd="url(#arrE)" strokeDasharray="none"/>
      ))}
      <text x="220" y="96" fill="#f59e0b" fontSize="12" fontStyle="italic">E⃗</text>
      {/* d — flèche */}
      <line x1="280" y1="39" x2="280" y2="142" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#arrE2)"/>
      <line x1="280" y1="39" x2="280" y2="142" stroke="#94a3b8" strokeWidth="1.2"/>
      <text x="284" y="96" fill="#94a3b8" fontSize="11" fontStyle="italic">d</text>
      <defs>
        <marker id="arrE2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="#94a3b8" />
        </marker>
      </defs>
      {/* Électron (entrant horizontalement) */}
      <circle cx="52" cy="88" r="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2"/>
      <text x="48" y="92" fill="#38bdf8" fontSize="8">e⁻</text>
      {/* Trajectoire de l'électron (parabole vers +) */}
      <path d="M58,88 Q140,88 230,50" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrEl)"/>
      {/* v0 */}
      <line x1="30" y1="88" x2="50" y2="88" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrV0)"/>
      <text x="16" y="84" fill="#a78bfa" fontSize="10" fontStyle="italic">v₀</text>
      <defs>
        <marker id="arrV0" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" />
        </marker>
      </defs>
      {/* U */}
      <text x="7" y="90" fill="#d1d5db" fontSize="10">U</text>
      <line x1="20" y1="39" x2="20" y2="142" stroke="#d1d5db" strokeWidth="0.8" strokeDasharray="3,2"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENU DU COURS
   ═══════════════════════════════════════════════════════════════════════════ */
const COURS: Section[] = [
  {
    id: 'cine', num: '1', title: 'Cinématique vectorielle',
    blocks: [
      {
        type: 'figure',
        caption: 'Vecteur position $\\overrightarrow{OM}$, vecteur vitesse $\\vec{v}$ (tangent) et vecteur accélération $\\vec{a}$',
        svg: FigTrajectoire,
      },
      {
        type: 'definition', title: 'Vecteur position',
        text: 'Le vecteur $\\overrightarrow{OM}(t)$ relie l\'origine O du repère au point mobile M à l\'instant $t$.',
      },
      { type: 'formula', tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j}' },
      {
        type: 'definition', title: 'Vecteur vitesse',
        text: 'Dérivée du vecteur position. Il est **tangent à la trajectoire** et orienté dans le **sens du mouvement**.',
      },
      { type: 'formula', tex: '\\vec{v}(t) = \\frac{d\\,\\overrightarrow{OM}}{dt} = \\dot{x}\\,\\vec{i} + \\dot{y}\\,\\vec{j} \\qquad v = \\sqrt{v_x^2 + v_y^2}' },
      {
        type: 'definition', title: 'Vecteur accélération',
        text: 'Dérivée du vecteur vitesse par rapport au temps.',
      },
      { type: 'formula', tex: '\\vec{a}(t) = \\frac{d\\,\\vec{v}}{dt} = \\ddot{x}\\,\\vec{i} + \\ddot{y}\\,\\vec{j}' },
      {
        type: 'property', title: 'Intégration (sens inverse)',
        items: [
          'Si $\\vec{a}(t)$ est connue : $\\vec{v}(t) = \\int \\vec{a}\\,dt + \\vec{v}_0$',
          'Puis : $\\overrightarrow{OM}(t) = \\int \\vec{v}\\,dt + \\overrightarrow{OM}_0$',
          'Les constantes $\\vec{v}_0$ et $\\overrightarrow{OM}_0$ sont les **conditions initiales**.',
        ],
      },
      {
        type: 'example',
        title: 'Exemple — dériver un vecteur position',
        lines: [
          'Données : $\\overrightarrow{OM}(t) = 3t\\,\\vec{i} + (4t - t^2)\\,\\vec{j}$ (en m)',
          '',
          '**Vitesse :** $\\vec{v}(t) = 3\\,\\vec{i} + (4 - 2t)\\,\\vec{j}$ m·s⁻¹',
          '**Accélération :** $\\vec{a} = 0\\,\\vec{i} - 2\\,\\vec{j}$ m·s⁻²  → constante (MRUA)',
          '**Norme de la vitesse à t = 1 s :** $v = \\sqrt{3^2+2^2} = \\sqrt{13} \\approx 3{,}6$ m·s⁻¹',
        ],
      },
    ],
  },

  {
    id: 'newton', num: '2–3', title: 'Les trois lois de Newton',
    blocks: [
      {
        type: 'figure',
        caption: 'Bilan des forces sur un solide posé sur un plan incliné — vecteurs $\\vec{P}$ et $\\vec{N}$',
        svg: FigPlanIncline,
      },
      {
        type: 'law', n: '1', title: 'Principe d\'inertie',
        text: 'Dans un **référentiel galiléen**, si $\\sum\\vec{F}_{\\text{ext}} = \\vec{0}$, alors le centre de masse est **au repos ou en MRU**.',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{a} = \\vec{0} \\iff \\vec{v} = \\text{constante}' },
      {
        type: 'law', n: '2', title: 'Relation fondamentale de la dynamique',
        text: 'Dans un référentiel galiléen :',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}', label: 'RFD' },
      {
        type: 'law', n: '3', title: 'Actions réciproques',
        text: 'Si A exerce $\\vec{F}_{A/B}$ sur B, alors B exerce sur A une force opposée :',
      },
      { type: 'formula', tex: '\\vec{F}_{B/A} = -\\vec{F}_{A/B}' },
      {
        type: 'property', title: 'Caractéristiques de la paire action–réaction',
        items: [
          'Même **droite d\'action**, même norme',
          'Sens **opposés**',
          'S\'exercent sur **deux corps différents**',
        ],
      },
      {
        type: 'attention',
        text: 'Le poids $\\vec{P}$ et la réaction $\\vec{N}$ de la table sur un livre immobile **ne sont pas** une paire action–réaction : elles s\'exercent toutes deux sur le livre. Elles sont égales et opposées par la **1ʳᵉ loi** (objet immobile).',
      },
      {
        type: 'example',
        title: 'Exemple — plan incliné sans frottement',
        lines: [
          'Données : $m = 2{,}0$ kg, $\\beta = 30°$, sans frottement, part du repos.',
          '',
          '**Forces :** poids $\\vec{P} = m\\vec{g}$ vers le bas, réaction $\\vec{N}$ perpendiculaire à la pente.',
          '**RFD :** $\\vec{P} + \\vec{N} = m\\vec{a}$',
          '**Projection sur x** (axe ↗ parallèle à la pente) :',
          '$mg\\sin\\beta = ma \\Rightarrow a = g\\sin 30° = 10 \\times 0{,}5 = 5{,}0$ m·s⁻²',
        ],
      },
    ],
  },

  {
    id: 'methode', num: '4', title: 'Méthode en 5 étapes',
    blocks: [
      {
        type: 'para',
        text: 'Cette méthode **universelle** s\'applique à tout problème de mécanique (chute, plan incliné, projectile, condensateur…). Elle est indispensable pour une copie de bac.',
      },
      {
        type: 'method',
        steps: [
          'Choisir le **système** étudié et un **référentiel galiléen** adapté.',
          'Faire le **bilan des forces extérieures** s\'exerçant sur le système (schéma avec flèches).',
          'Appliquer la **2ᵉ loi de Newton** : $\\sum\\vec{F}_{\\text{ext}} = m\\vec{a}$.',
          '**Projeter** sur les axes du repère pour obtenir les équations scalaires.',
          '**Intégrer** avec les conditions initiales pour trouver $\\vec{v}(t)$ puis $\\overrightarrow{OM}(t)$.',
        ],
      },
      {
        type: 'astuce',
        text: 'Toujours écrire la relation vectorielle $\\sum\\vec{F} = m\\vec{a}$ **avant** de projeter. Choisir les axes de façon à aligner un axe avec une force ou avec l\'accélération.',
      },
      {
        type: 'example',
        title: 'Exemple — chute libre verticale',
        lines: [
          '**Système :** bille de masse $m$. **Réf. :** terrestre (galiléen). **Axe :** $y$ vers le bas.',
          '',
          '**Bilan des forces :** poids $\\vec{P} = mg\\,\\vec{j}$ (seule force, frottements négligés).',
          '**RFD :** $mg\\,\\vec{j} = m\\vec{a}$ → $a_y = g = 9{,}81$ m·s⁻²',
          '**Intégration :** $v_y(t) = gt + v_0 = gt$ (lâché sans vitesse initiale)',
          '$y(t) = \\dfrac{1}{2}g\\,t^2$ (origine au point de lâcher)',
        ],
      },
    ],
  },

  {
    id: 'projectile', num: '5', title: 'Mouvement d\'un projectile',
    blocks: [
      {
        type: 'figure',
        caption: 'Trajectoire parabolique, flèche $H$, portée $D$ et angle de lancement $\\alpha$',
        svg: FigProjectile,
      },
      {
        type: 'para',
        text: 'Seule la pesanteur agit ($\\vec{P} = m\\vec{g}$, frottements négligés). La RFD donne $a_x = 0$ et $a_y = -g$ (axe $y$ vers le haut).',
      },
      {
        type: 'property', title: 'Équations horaires (lancement depuis l\'origine à l\'angle $\\alpha$)',
        items: [
          '$v_x(t) = v_0\\cos\\alpha = \\text{constante}$',
          '$v_y(t) = v_0\\sin\\alpha - g\\,t$',
          '$x(t) = v_0\\cos\\alpha \\cdot t$',
          '$y(t) = v_0\\sin\\alpha \\cdot t - \\dfrac{1}{2}g\\,t^2$',
        ],
      },
      {
        type: 'definition', title: 'Équation de la trajectoire (parabole)',
        text: 'En éliminant $t = x/(v_0\\cos\\alpha)$ :',
      },
      { type: 'formula', tex: 'y = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2' },
      {
        type: 'property', title: 'Grandeurs caractéristiques',
        items: [
          '**Flèche** (sommet, $v_y=0$ à $t_H = v_0\\sin\\alpha/g$) : $H = \\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}$',
          '**Portée** (impact, $y=0$) : $D = \\dfrac{v_0^2\\sin 2\\alpha}{g}$',
          '**Portée max** pour $\\alpha = 45°$ : $D_{\\max} = \\dfrac{v_0^2}{g}$',
        ],
      },
      {
        type: 'example',
        title: 'Exemple — ballon de foot',
        lines: [
          'Données : $v_0 = 20$ m·s⁻¹, $\\alpha = 30°$, $g = 10$ m·s⁻²',
          '',
          '**Flèche :** $H = \\dfrac{20^2\\sin^2 30°}{2\\times 10} = \\dfrac{400\\times 0{,}25}{20} = 5{,}0$ m',
          '**Portée :** $D = \\dfrac{20^2\\sin 60°}{10} = \\dfrac{400\\times 0{,}866}{10} \\approx 34{,}6$ m',
          '**Durée totale :** $t_D = 2v_0\\sin\\alpha/g = 2\\times 20\\times 0{,}5/10 = 2{,}0$ s',
        ],
      },
    ],
  },

  {
    id: 'champ', num: '6', title: 'Particule chargée en champ uniforme',
    blocks: [
      {
        type: 'figure',
        caption: 'Électron entrant entre les plaques d\'un condensateur : déviation parabolique vers la plaque $+$',
        svg: FigCondensateur,
      },
      {
        type: 'definition', title: 'Condensateur plan',
        text: 'Deux plaques conductrices parallèles distantes de $d$, portées à des potentiels différant de $U$. Le champ est **uniforme** et **perpendiculaire aux plaques**.',
      },
      { type: 'formula', tex: 'E = \\frac{U}{d} \\quad (\\text{V\\,m}^{-1})' },
      {
        type: 'definition', title: 'Force sur un électron',
        text: 'L\'électron de charge $-e < 0$ subit une force **opposée à $\\vec{E}$**, donc dirigée vers la plaque positive.',
      },
      { type: 'formula', tex: '\\vec{F} = -e\\vec{E} \\qquad F = eE = \\frac{eU}{d}' },
      {
        type: 'property', title: 'Résolution (poids négligé devant $\\vec{F}$)',
        items: [
          'Axe $x$ (sens de $\\vec{v}_0$) : aucune force → **MRU** : $x = v_0 t$',
          'Axe $y$ (sens de $\\vec{F}$) : MRUA : $a = eE/m_e$, $y = \\frac{1}{2}at^2$',
          '**Trajectoire** (en éliminant $t$) : $y = \\dfrac{a}{2v_0^2}x^2$ (parabole)',
        ],
      },
      {
        type: 'definition', title: 'Déviation totale sur l\'écran (à distance $D$ des plaques)',
        text: 'La déviation à la sortie des plaques est $y_1$, puis l\'électron continue en ligne droite :',
      },
      { type: 'formula', tex: 'Y = y_1 + y_2 = \\frac{eEL}{m_e v_0^2}\\!\\left(D + \\frac{L}{2}\\right)', label: 'formule écran' },
      {
        type: 'example',
        title: 'Exemple numérique',
        lines: [
          'Données : $d = 2{,}0$ cm, $U = 400$ V, $v_0 = 3{,}0\\times10^7$ m·s⁻¹',
          '',
          '**Champ :** $E = 400/0{,}02 = 2{,}0\\times10^4$ V·m⁻¹',
          '**Force :** $F = eE = 1{,}6\\times10^{-19}\\times 2{,}0\\times10^4 = 3{,}2\\times10^{-15}$ N',
          '**Accélération :** $a = F/m_e = 3{,}2\\times10^{-15}/9{,}1\\times10^{-31} \\approx 3{,}5\\times10^{15}$ m·s⁻²',
          '→ Très grande devant $g = 9{,}8$ m·s⁻² : **poids justifié négligé**.',
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   RENDU DES BLOCS
   ═══════════════════════════════════════════════════════════════════════════ */
function Block({ b }: { b: BlockType }) {
  switch (b.type) {

    case 'para':
      return <p className="text-[13.5px] text-white/70 leading-relaxed"><MixedText text={b.text} /></p>;

    case 'formula':
      return (
        <div className="relative my-1">
          <div className="rounded-lg bg-[#0b1622] border border-sky-900/50 py-3 px-4 text-center overflow-x-auto">
            <BlockMath tex={b.tex} />
          </div>
          {b.label && (
            <span className="absolute top-1.5 right-2.5 text-[10px] font-bold text-sky-600 uppercase tracking-wider">
              {b.label}
            </span>
          )}
        </div>
      );

    case 'figure':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1520]">
          <div className="px-3 pt-3 pb-1">
            <b.svg />
          </div>
          <div className="px-3 py-2 border-t border-white/8 bg-white/[0.02]">
            <p className="text-[11px] text-white/40 text-center italic leading-snug">
              <MixedText text={b.caption} />
            </p>
          </div>
        </div>
      );

    case 'definition':
      return (
        <div className="rounded-lg overflow-hidden border-l-4 border-sky-500 border border-sky-800/30 bg-sky-950/25">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/12 border-b border-sky-800/25">
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Définition</span>
            <span className="text-[11px] text-sky-200/80">— {b.title}</span>
          </div>
          <p className="px-3 py-2.5 text-[13.5px] text-white/80 leading-relaxed">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    case 'law':
      return (
        <div className="rounded-lg overflow-hidden border border-emerald-700/40 bg-emerald-950/20">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-emerald-700/18 border-b border-emerald-700/30">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-black text-white flex items-center justify-center shrink-0">
              {b.n}
            </span>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Loi</span>
            <span className="text-[11px] text-emerald-200/80">— {b.title}</span>
          </div>
          <p className="px-3 py-2.5 text-[13.5px] text-white/80 leading-relaxed">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    case 'property':
      return (
        <div className="rounded-lg overflow-hidden border-l-4 border-violet-500 border border-violet-800/25 bg-violet-950/18">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 border-b border-violet-800/22">
            <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Propriété</span>
            <span className="text-[11px] text-violet-200/80">— {b.title}</span>
          </div>
          <ul className="px-3 py-2.5 space-y-2">
            {b.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 items-baseline">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-[7px]" />
                <span className="text-[13.5px] text-white/80 leading-relaxed"><MixedText text={item} /></span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'method':
      return (
        <div className="rounded-lg overflow-hidden border border-amber-700/35 bg-amber-950/15">
          <div className="px-3 py-1.5 bg-amber-600/12 border-b border-amber-700/28">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Méthode</span>
          </div>
          <ol className="px-3 py-2.5 space-y-2.5">
            {b.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/22 border border-amber-500/45 text-amber-300 text-[11px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[13.5px] text-white/80 leading-relaxed"><MixedText text={step} /></span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'example':
      return (
        <div className="rounded-lg overflow-hidden border border-teal-700/35 bg-teal-950/15">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-600/12 border-b border-teal-700/28">
            <span className="text-base">📐</span>
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Exemple</span>
            <span className="text-[11px] text-teal-200/70">— {b.title}</span>
          </div>
          <div className="px-3 py-2.5 space-y-1">
            {b.lines.map((line, i) =>
              line === '' ? (
                <div key={i} className="h-1" />
              ) : (
                <p key={i} className="text-[13px] text-white/75 leading-relaxed">
                  <MixedText text={line} />
                </p>
              )
            )}
          </div>
        </div>
      );

    case 'attention':
      return (
        <div className="rounded-lg border border-red-700/40 bg-red-950/18 px-3 py-2.5 flex gap-2.5 items-start">
          <span className="text-red-400 text-base shrink-0 mt-0.5">⚠</span>
          <div>
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-0.5">Attention</p>
            <p className="text-[13px] text-red-100/80 leading-relaxed"><MixedText text={b.text} /></p>
          </div>
        </div>
      );

    case 'astuce':
      return (
        <div className="rounded-lg border border-teal-700/40 bg-teal-950/15 px-3 py-2.5 flex gap-2.5 items-start">
          <span className="text-teal-400 text-base shrink-0 mt-0.5">💡</span>
          <div>
            <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-0.5">Astuce</p>
            <p className="text-[13px] text-teal-100/80 leading-relaxed"><MixedText text={b.text} /></p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ONGLET COURS
   ═══════════════════════════════════════════════════════════════════════════ */
function CourseTab() {
  const [open, setOpen] = useState<Set<string>>(new Set(['cine']));
  const toggle = (id: string) =>
    setOpen(p => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-2 pb-6">
      {COURS.map(sec => (
        <div key={sec.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.025]">
          <button onClick={() => toggle(sec.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/18 border border-sky-500/38 text-sky-300 text-[12px] font-black flex items-center justify-center">
              {sec.num}
            </span>
            <span className="flex-1 font-bold text-white text-[14.5px]">{sec.title}</span>
            <ChevronDown size={15} className={`text-white/30 transition-transform duration-200 ${open.has(sec.id) ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open.has(sec.id) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
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

/* ═══════════════════════════════════════════════════════════════════════════
   ONGLET FICHE
   ═══════════════════════════════════════════════════════════════════════════ */
const FICHE = [
  {
    title: '§1  Cinématique',
    cls: { bg: 'bg-sky-950/35', border: 'border-sky-700/35', head: 'bg-sky-700/18', label: 'text-sky-300' },
    rows: [
      { label: 'Position',     tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i}+y(t)\\,\\vec{j}' },
      { label: 'Vitesse',      tex: '\\vec{v}=\\dfrac{d\\overrightarrow{OM}}{dt}\\quad(\\text{tangente})' },
      { label: 'Accélération', tex: '\\vec{a}=\\dfrac{d\\vec{v}}{dt}' },
      { label: 'Norme',        tex: 'v=\\sqrt{v_x^2+v_y^2}' },
    ],
  },
  {
    title: '§2–3  Lois de Newton',
    cls: { bg: 'bg-emerald-950/35', border: 'border-emerald-700/35', head: 'bg-emerald-700/18', label: 'text-emerald-300' },
    rows: [
      { label: '1ʳᵉ loi', tex: '\\sum\\vec{F}_{\\text{ext}}=\\vec{0}\\Rightarrow\\vec{v}=\\text{cste}' },
      { label: '2ᵉ loi',  tex: '\\sum\\vec{F}_{\\text{ext}}=m\\vec{a}' },
      { label: '3ᵉ loi',  tex: '\\vec{F}_{B/A}=-\\vec{F}_{A/B}\\;(\\text{corps ≠})' },
    ],
  },
  {
    title: '§5  Projectile (sans frottement)',
    cls: { bg: 'bg-violet-950/35', border: 'border-violet-700/35', head: 'bg-violet-700/18', label: 'text-violet-300' },
    rows: [
      { label: 'Horaires',    tex: 'x=v_0\\cos\\alpha\\cdot t\\;,\\;\\; y=v_0\\sin\\alpha\\cdot t-\\tfrac{1}{2}g\\,t^2' },
      { label: 'Trajectoire', tex: 'y=x\\tan\\alpha-\\dfrac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2' },
      { label: 'Flèche H',    tex: 'H=\\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}' },
      { label: 'Portée D',    tex: 'D=\\dfrac{v_0^2\\sin 2\\alpha}{g}\\quad(D_{\\max}\\text{ à }45°)' },
    ],
  },
  {
    title: '§6  Particule chargée',
    cls: { bg: 'bg-amber-950/35', border: 'border-amber-700/35', head: 'bg-amber-700/18', label: 'text-amber-300' },
    rows: [
      { label: 'Champ',       tex: 'E=U/d\\quad(\\text{V\\,m}^{-1})' },
      { label: 'Force e⁻',    tex: 'F=eE\\;(\\text{opposée à }\\vec{E})' },
      { label: 'Accélération',tex: 'a=eE/m_e' },
      { label: 'Trajectoire', tex: 'y=ax^2/(2v_0^2)' },
      { label: 'Écran',       tex: 'Y=\\dfrac{eEL}{m_e v_0^2}\\!\\left(D+\\dfrac{L}{2}\\right)' },
    ],
  },
];

function FicheTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="pb-6 space-y-3">
      <div className="text-center pt-1 pb-2">
        <p className="text-white font-black text-base">Newton & Champ uniforme</p>
        <p className="text-[11px] text-white/35 uppercase tracking-widest mt-0.5">Fiche de révision · Terminale</p>
      </div>

      {FICHE.map(sec => (
        <div key={sec.title} className={`rounded-xl overflow-hidden border ${sec.cls.bg} ${sec.cls.border}`}>
          <div className={`px-4 py-2 ${sec.cls.head} border-b ${sec.cls.border}`}>
            <span className={`text-[11px] font-black ${sec.cls.label} uppercase tracking-wider`}>{sec.title}</span>
          </div>
          <div className="divide-y divide-white/5">
            {sec.rows.map((row, i) => (
              <div key={i} className="flex items-center min-h-[2.75rem]">
                <div className="w-[92px] shrink-0 px-3 py-2 self-stretch flex items-center border-r border-white/8">
                  <span className="text-[11px] font-semibold text-white/35 leading-tight">{row.label}</span>
                </div>
                <div className="flex-1 px-3 py-1 overflow-x-auto">
                  <BlockMath tex={row.tex} className="!py-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
        <div className="px-4 py-2 bg-white/5 border-b border-white/8">
          <span className="text-[11px] font-black text-white/45 uppercase tracking-wider">Constantes</span>
        </div>
        {[
          { sym: 'g', tex: '9{,}81\\;\\text{m\\,s}^{-2}' },
          { sym: 'e', tex: '1{,}6\\times10^{-19}\\;\\text{C}' },
          { sym: 'm_e', tex: '9{,}1\\times10^{-31}\\;\\text{kg}' },
        ].map(c => (
          <div key={c.sym} className="flex items-center min-h-[2.5rem] border-t border-white/5">
            <div className="w-[92px] shrink-0 px-3 py-1 self-stretch flex items-center border-r border-white/8">
              <span className="text-[11px] font-mono text-white/35">{c.sym}</span>
            </div>
            <div className="flex-1 px-3 py-1 overflow-x-auto">
              <BlockMath tex={c.tex} className="!py-0" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ONGLET EXERCICES
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
          <div className="flex items-center gap-3 mb-2.5">
            <div className="h-px flex-1" style={{ background: `hsl(${tier.hsl} / 0.3)` }} />
            <span className="text-[11px] font-black tracking-widest uppercase"
              style={{ color: `hsl(${tier.hsl})` }}>{tier.label}</span>
            <span className="text-[10px] text-white/25">{tier.sub}</span>
            <div className="h-px flex-1" style={{ background: `hsl(${tier.hsl} / 0.3)` }} />
          </div>
          <div className="space-y-1.5">
            {tier.levels.map(level => {
              const status = getStatus(level);
              const locked = status === 'locked';
              return (
                <motion.button key={level.id}
                  onClick={() => !locked && onOpen(level)} disabled={locked}
                  whileTap={locked ? {} : { scale: 0.985 }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all
                    ${locked ? 'opacity-35 cursor-not-allowed bg-white/[0.02] border-white/5'
                      : status === 'completed' ? 'bg-emerald-950/30 border-emerald-700/30 hover:border-emerald-600/50 cursor-pointer'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all
                    ${status === 'completed' ? 'bg-emerald-500/25 border-emerald-500/50'
                      : status === 'current' ? 'bg-white/10' : 'bg-white/5 border-white/10'}`}
                    style={status === 'current' ? {
                      borderColor: `hsl(${tier.hsl} / 0.7)`,
                      boxShadow: `0 0 10px hsl(${tier.hsl} / 0.3)`,
                    } : {}}>
                    {status === 'completed' ? <CheckCircle2 size={16} className="text-emerald-400" />
                      : status === 'current' ? <Play size={13} style={{ color: `hsl(${tier.hsl})` }} />
                      : <Lock size={12} className="text-white/25" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13.5px] font-semibold truncate ${locked ? 'text-white/30' : 'text-white'}`}>
                      {level.title}
                    </p>
                    <p className={`text-[11px] ${locked ? 'text-white/15' : 'text-white/40'}`}>
                      {level.notion} · {DIFF_LABEL[level.difficulty]} · {level.timeMin} min
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full
                      ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/8 text-white/35'}`}>
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
