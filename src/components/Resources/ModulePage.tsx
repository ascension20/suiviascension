import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, FileText, Gamepad2, CheckCircle2, Lock, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { PhysicsModule, ModuleLevel, TIER_META, DIFF_LABEL } from '@/lib/modules-data';
import { NEWTON_QCM, NEWTON_EXERCISES } from '@/lib/newton-content';
import { QcmView } from './QcmView';
import { ExerciseView } from './ExerciseView';

type Tab = 'cours' | 'fiche' | 'exercices';
type ExerciceView = { level: ModuleLevel } | null;

interface ModulePageProps {
  module: PhysicsModule;
  completedIds: Set<string>;
  onComplete: (level: ModuleLevel) => void;
  onBack: () => void;
}

export function ModulePage({ module, completedIds, onComplete, onBack }: ModulePageProps) {
  const [tab, setTab] = useState<Tab>('cours');
  const [exerciceView, setExerciceView] = useState<ExerciceView>(null);

  const accent = module.accentHsl;

  // Statut d'un niveau
  const getStatus = (level: ModuleLevel): 'completed' | 'current' | 'locked' => {
    if (completedIds.has(level.id)) return 'completed';
    // Premier niveau toujours débloqué
    if (level.number === 0) return 'current';
    // Niveau n débloqué si n-1 est complété
    const prev = module.levels[level.number - 1];
    if (prev && completedIds.has(prev.id)) return 'current';
    // Niveau 0 complété → niveau 1 débloqué
    if (level.number === 1 && completedIds.has(module.levels[0].id)) return 'current';
    return 'locked';
  };

  const totalXp = module.levels.reduce((s, l) => s + l.xpReward, 0);
  const earnedXp = module.levels
    .filter(l => completedIds.has(l.id))
    .reduce((s, l) => s + l.xpReward, 0);
  const pct = totalXp > 0 ? Math.round((earnedXp / totalXp) * 100) : 0;

  if (exerciceView) {
    const level = exerciceView.level;
    const isQcm = level.id === 'newton-qcm';
    if (isQcm) {
      return (
        <QcmView
          questions={NEWTON_QCM}
          xpReward={level.xpReward}
          onComplete={() => { onComplete(level); setExerciceView(null); }}
          onBack={() => setExerciceView(null)}
        />
      );
    }
    const content = NEWTON_EXERCISES.find(e => e.id === level.id);
    return (
      <ExerciseView
        level={level}
        content={content ?? null}
        onComplete={() => { onComplete(level); setExerciceView(null); }}
        onBack={() => setExerciceView(null)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white/70"
              style={{ background: `hsl(${accent} / 0.2)`, border: `1px solid hsl(${accent} / 0.4)` }}>
              {module.subject} · {module.level}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{module.title}</h2>
          <p className="text-sm text-white/50">{module.subtitle}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Progression</span>
          <span className="font-semibold" style={{ color: `hsl(${accent})` }}>
            {earnedXp} / {totalXp} XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `hsl(${accent})` }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-2 mb-6 bg-white/5 rounded-xl p-1">
        {([
          { key: 'cours', icon: BookOpen, label: 'Cours' },
          { key: 'fiche', icon: FileText, label: 'Fiche' },
          { key: 'exercices', icon: Gamepad2, label: 'Exercices' },
        ] as const).map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === key
                ? 'bg-white/15 text-white shadow'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <AnimatePresence mode="wait">
        {tab === 'cours' && <CourseTab key="cours" module={module} />}
        {tab === 'fiche' && <FicheTab key="fiche" module={module} />}
        {tab === 'exercices' && (
          <ExercicesTab
            key="exercices"
            module={module}
            getStatus={getStatus}
            accent={accent}
            onOpen={(level) => setExerciceView({ level })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Onglet Cours ─────────────────────────────────────────────────────────────
const NEWTON_COURSE_SECTIONS = [
  {
    id: 'cinematique',
    number: '1',
    title: 'Cinématique vectorielle',
    content: [
      {
        type: 'definition',
        title: 'Vecteur position',
        text: 'Le vecteur position OM(t) relie l\'origine O du repère au point M à l\'instant t.\nDans un repère cartésien : OM(t) = x(t)·i + y(t)·j',
      },
      {
        type: 'formula',
        text: 'v(t) = dOM/dt = ẋ(t)·i + ẏ(t)·j',
      },
      {
        type: 'property',
        title: 'Vecteur vitesse',
        text: '• Tangent à la trajectoire en M\n• Orienté dans le sens du mouvement\n• Norme : v = ||v|| = √(vx² + vy²)',
      },
      {
        type: 'formula',
        text: 'a(t) = dv/dt = v̇x(t)·i + v̇y(t)·j',
      },
      {
        type: 'property',
        title: 'Intégration',
        text: 'Si a(t) est connue :\nv(t) = ∫a(t) dt + v₀\nOM(t) = ∫v(t) dt + OM₀\n→ Les constantes d\'intégration (v₀, OM₀) sont les conditions initiales.',
      },
    ],
  },
  {
    id: 'newton',
    number: '2 & 3',
    title: 'Les trois lois de Newton',
    content: [
      {
        type: 'law',
        title: '1ʳᵉ loi — Principe d\'inertie',
        text: 'Dans un référentiel galiléen, si la somme des forces extérieures est nulle, alors le centre de masse est au repos ou en mouvement rectiligne uniforme.\n\nΣF_ext = 0  ⟺  a = 0  ⟺  v = constante',
      },
      {
        type: 'law',
        title: '2ᵉ loi — Relation fondamentale de la dynamique',
        text: 'Dans un référentiel galiléen :\n\nΣF_ext = m·a\n\n→ La somme des forces extérieures est égale au produit de la masse par l\'accélération du centre de masse.',
      },
      {
        type: 'law',
        title: '3ᵉ loi — Principe des actions réciproques',
        text: 'Si un corps A exerce une force F_{A/B} sur un corps B, alors B exerce sur A une force F_{B/A} telle que :\n\nF_{B/A} = −F_{A/B}\n\n→ Même droite d\'action, même norme, sens opposé, corps différents !',
      },
      {
        type: 'warning',
        text: 'Poids et réaction du sol sur un livre immobile NE sont PAS une paire action–réaction (elles s\'exercent sur le même corps). Elles sont égales et opposées par la 1ʳᵉ loi.',
      },
    ],
  },
  {
    id: 'methode',
    number: '4',
    title: 'Méthode en 5 étapes',
    content: [
      {
        type: 'method',
        steps: [
          'Choisir le système et le référentiel galiléen adapté.',
          'Faire le bilan des forces extérieures (schéma clair).',
          'Appliquer la 2ᵉ loi : ΣF_ext = m·a.',
          'Projeter sur les axes (choisir les axes en cohérence avec les forces).',
          'Intégrer les équations différentielles avec les conditions initiales pour obtenir v(t), puis OM(t).',
        ],
      },
      {
        type: 'tip',
        text: 'Toujours écrire les forces en vecteurs, projeter ensuite — ne pas sauter l\'étape vectorielle.',
      },
    ],
  },
  {
    id: 'projectile',
    number: '5',
    title: 'Mouvement d\'un projectile',
    content: [
      {
        type: 'text',
        text: 'Système : solide de masse m. Forces : poids seul (P = mg vers le bas). Référentiel terrestre (galiléen).',
      },
      {
        type: 'formula',
        text: 'ΣF = P = −mg·j  →  a = (0 ; −g)',
      },
      {
        type: 'property',
        title: 'Équations horaires (v₀ à l\'angle α)',
        text: 'vx(t) = v₀ cos α        x(t) = v₀ cos α · t\nvy(t) = v₀ sin α − gt   y(t) = v₀ sin α · t − ½gt²',
      },
      {
        type: 'formula',
        text: 'Trajectoire : y = x·tan α − gx²/[2v₀²cos²α]   (parabole)',
      },
      {
        type: 'property',
        title: 'Flèche (hauteur maximale H)',
        text: 'Au sommet : vy = 0  ⟹  tH = v₀ sin α / g\nH = v₀² sin²α / (2g)',
      },
      {
        type: 'property',
        title: 'Portée D (retour au sol)',
        text: 'y(tD) = 0  ⟹  tD = 2v₀ sin α / g\nD = v₀² sin 2α / g\n→ Portée maximale pour α = 45°',
      },
    ],
  },
  {
    id: 'champ',
    number: '6',
    title: 'Particule chargée dans un champ uniforme',
    content: [
      {
        type: 'property',
        title: 'Condensateur plan',
        text: 'Deux plaques parallèles, distance d, tension U.\nChamp électrique uniforme : E = U / d  (en V·m⁻¹)',
      },
      {
        type: 'formula',
        text: 'Force sur une charge q : F = q·E\n→ Électron (q = −e) : F opposée à E, donc vers la plaque positive.',
      },
      {
        type: 'property',
        title: 'Accélération',
        text: 'D\'après la 2ᵉ loi (poids négligé) :\na = eE / mₑ  (en m·s⁻²)',
      },
      {
        type: 'method',
        steps: [
          'Axes : x horizontal (sens de v₀), y vertical (sens de E ou son opposé).',
          'Bilan des forces : seule la force électrique (poids négligé devant).',
          'Équations : ax = 0, ay = eE/mₑ (ou −eE/mₑ selon le signe).',
          'Intégrer : vx = v₀, vy = ay·t ; x = v₀t, y = ½ay·t².',
          'Trajectoire : y = ay·x²/(2v₀²)  (parabole, comme le projectile).',
        ],
      },
      {
        type: 'tip',
        text: 'La déviation totale sur l\'écran vaut Y = y₁ + y₂, avec y₂ = vy₁ · (D/v₀) pour le trajet après les plaques.',
      },
    ],
  },
];

function CourseTab({ module }: { module: PhysicsModule }) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['cinematique']));

  const toggle = (id: string) => {
    setOpenSections(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-3"
    >
      {NEWTON_COURSE_SECTIONS.map(section => (
        <div key={section.id} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            onClick={() => toggle(section.id)}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[hsl(205_85%_60%/0.15)] text-[hsl(205_85%_70%)] border border-[hsl(205_85%_60%/0.3)]">
                §{section.number}
              </span>
              <span className="font-semibold text-white">{section.title}</span>
            </div>
            {openSections.has(section.id) ? (
              <ChevronUp size={18} className="text-white/40" />
            ) : (
              <ChevronDown size={18} className="text-white/40" />
            )}
          </button>
          <AnimatePresence>
            {openSections.has(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                  {section.content.map((block, i) => (
                    <CourseBlock key={i} block={block} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

function CourseBlock({ block }: { block: Record<string, unknown> }) {
  const type = block.type as string;

  if (type === 'formula') {
    return (
      <div className="bg-[hsl(205_85%_60%/0.08)] border border-[hsl(205_85%_60%/0.25)] rounded-lg px-4 py-3">
        <pre className="text-[hsl(205_85%_75%)] font-mono text-sm whitespace-pre-wrap break-words leading-relaxed">
          {block.text as string}
        </pre>
      </div>
    );
  }

  if (type === 'law' || type === 'definition' || type === 'property') {
    const colorMap: Record<string, string> = {
      law: 'hsl(142 65% 48%)',
      definition: 'hsl(43 90% 52%)',
      property: 'hsl(205 85% 60%)',
    };
    const color = colorMap[type] ?? 'hsl(205 85% 60%)';
    return (
      <div className="rounded-lg overflow-hidden border" style={{ borderColor: `${color}33` }}>
        {block.title && (
          <div className="px-3 py-1.5 text-xs font-bold"
            style={{ background: `${color}18`, color }}>
            {block.title as string}
          </div>
        )}
        <div className="px-3 py-2">
          <p className="text-sm text-white/80 whitespace-pre-line leading-relaxed">
            {block.text as string}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
        <p className="text-amber-300 text-sm whitespace-pre-line">⚠ {block.text as string}</p>
      </div>
    );
  }

  if (type === 'tip') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
        <p className="text-emerald-300 text-sm whitespace-pre-line">💡 {block.text as string}</p>
      </div>
    );
  }

  if (type === 'method') {
    const steps = block.steps as string[];
    return (
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(205_85%_60%/0.2)] border border-[hsl(205_85%_60%/0.4)] text-[hsl(205_85%_70%)] text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <p className="text-sm text-white/80 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    );
  }

  // fallback: text
  return (
    <p className="text-sm text-white/70 whitespace-pre-line leading-relaxed">
      {block.text as string}
    </p>
  );
}

// ── Onglet Fiche ─────────────────────────────────────────────────────────────
function FicheTab({ module: _module }: { module: PhysicsModule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-3"
    >
      {/* Fiche de synthèse compacte */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-4">
        <h3 className="font-bold text-white text-center text-lg border-b border-white/10 pb-2">
          Fiche synthèse — Newton & champ uniforme
        </h3>
        <SyntheseSection title="Cinématique" color="hsl(205 85% 60%)">
          <FormulaLine label="Position" formula="OM(t) = x(t)·i + y(t)·j" />
          <FormulaLine label="Vitesse" formula="v = dOM/dt · tangente à la trajectoire" />
          <FormulaLine label="Accélération" formula="a = dv/dt" />
        </SyntheseSection>
        <SyntheseSection title="Lois de Newton" color="hsl(142 65% 48%)">
          <FormulaLine label="1ʳᵉ loi" formula="ΣF = 0 ⟺ a = 0 (MRU ou repos)" />
          <FormulaLine label="2ᵉ loi" formula="ΣF_ext = m·a" />
          <FormulaLine label="3ᵉ loi" formula="F_{A/B} = −F_{B/A} (corps différents)" />
        </SyntheseSection>
        <SyntheseSection title="Projectile (sans frottement)" color="hsl(43 90% 52%)">
          <FormulaLine label="Équations" formula="x = v₀cosα·t  ·  y = v₀sinα·t − ½gt²" />
          <FormulaLine label="Trajectoire" formula="y = x·tanα − gx²/(2v₀²cos²α)" />
          <FormulaLine label="Flèche" formula="H = v₀²sin²α / (2g)" />
          <FormulaLine label="Portée" formula="D = v₀²sin2α / g  →  max à 45°" />
        </SyntheseSection>
        <SyntheseSection title="Particule chargée" color="hsl(270 60% 62%)">
          <FormulaLine label="Champ" formula="E = U/d  (V·m⁻¹)" />
          <FormulaLine label="Force" formula="F = eE  (opposée à E pour e⁻)" />
          <FormulaLine label="Accélération" formula="a = eE/mₑ  (poids négligé)" />
          <FormulaLine label="Déviation écran" formula="Y = eEL(D + L/2) / (mv₀²)" />
        </SyntheseSection>
      </div>
    </motion.div>
  );
}

function SyntheseSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${color}33` }}>
      <div className="px-3 py-1.5 text-xs font-bold" style={{ background: `${color}20`, color }}>
        {title}
      </div>
      <div className="px-3 py-2 space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function FormulaLine({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="flex gap-2 items-baseline flex-wrap">
      <span className="text-white/50 text-xs shrink-0 w-24">{label}</span>
      <code className="text-xs text-white/85 font-mono">{formula}</code>
    </div>
  );
}

// ── Onglet Exercices ──────────────────────────────────────────────────────────
function ExercicesTab({
  module,
  getStatus,
  accent,
  onOpen,
}: {
  module: PhysicsModule;
  getStatus: (l: ModuleLevel) => 'completed' | 'current' | 'locked';
  accent: string;
  onOpen: (level: ModuleLevel) => void;
}) {
  const byTier = TIER_META.map(tm => ({
    ...tm,
    levels: module.levels.filter(l => l.tier === tm.tier),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-4"
    >
      {byTier.map(tier => (
        <div key={tier.tier}>
          {/* Tier header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-bold px-2" style={{ color: `hsl(${tier.hsl})` }}>
              {tier.label}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-2">
            {tier.levels.map(level => {
              const status = getStatus(level);
              return (
                <LevelRow
                  key={level.id}
                  level={level}
                  status={status}
                  tierHsl={tier.hsl}
                  accent={accent}
                  onOpen={onOpen}
                />
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function LevelRow({
  level,
  status,
  tierHsl,
  accent: _accent,
  onOpen,
}: {
  level: ModuleLevel;
  status: 'completed' | 'current' | 'locked';
  tierHsl: string;
  accent: string;
  onOpen: (l: ModuleLevel) => void;
}) {
  const isLocked = status === 'locked';

  return (
    <motion.button
      onClick={() => !isLocked && onOpen(level)}
      disabled={isLocked}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left
        ${isLocked
          ? 'opacity-40 cursor-not-allowed bg-white/3 border-white/5'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
        }`}
      whileTap={isLocked ? {} : { scale: 0.98 }}
    >
      {/* Icône état */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border
        ${status === 'completed' ? 'bg-emerald-500/20 border-emerald-500/40' :
          status === 'current' ? 'border-white/30 bg-white/10' :
          'border-white/10 bg-white/5'}`}
        style={status === 'current' ? { boxShadow: `0 0 12px hsl(${tierHsl} / 0.4)`, borderColor: `hsl(${tierHsl} / 0.7)` } : {}}>
        {status === 'completed' ? (
          <CheckCircle2 size={18} className="text-emerald-400" />
        ) : status === 'current' ? (
          <Play size={16} style={{ color: `hsl(${tierHsl})` }} />
        ) : (
          <Lock size={14} className="text-white/30" />
        )}
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isLocked ? 'text-white/40' : 'text-white'}`}>
          {level.title}
        </p>
        <p className={`text-xs truncate ${isLocked ? 'text-white/20' : 'text-white/50'}`}>
          {level.notion} · {DIFF_LABEL[level.difficulty]} · {level.timeMin} min
        </p>
      </div>

      {/* XP */}
      <div className="text-right shrink-0">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
          ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/50'}`}>
          +{level.xpReward} XP
        </span>
      </div>
    </motion.button>
  );
}
