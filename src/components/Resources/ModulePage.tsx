import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Gamepad2,
  CheckCircle2, Lock, Play, ChevronDown, ChevronRight,
} from 'lucide-react';
import { PhysicsModule, ModuleLevel, TIER_META, DIFF_LABEL } from '@/lib/modules-data';
import { NEWTON_QCM, NEWTON_EXERCISES, NEWTON_CORRECTIONS } from '@/lib/newton-content';
import { SUITES_QCM, SUITES_EXERCISES, SUITES_CORRECTIONS } from '@/lib/suites-content';
import { FONCTIONS_QCM, FONCTIONS_EXERCISES, FONCTIONS_CORRECTIONS } from '@/lib/fonctions-content';
import { LOGARITHME_QCM, LOGARITHME_EXERCISES, LOGARITHME_CORRECTIONS } from '@/lib/logarithme-content';
import { PROBABILITES_QCM, PROBABILITES_EXERCISES, PROBABILITES_CORRECTIONS } from '@/lib/probabilites-content';
import { GEOMETRIE_QCM, GEOMETRIE_EXERCISES, GEOMETRIE_CORRECTIONS } from '@/lib/geometrie-content';
import { BlockMath, InlineMath, MixedText } from './Math';
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
    const isMaths = module.subject === 'Maths';
    const isFonctions = module.id === 'maths-fonctions';
    const isLogarithme = module.id === 'maths-logarithme';
    const isProbabilites = module.id === 'maths-probabilites';
    const isGeometrie = module.id === 'maths-geometrie';
    if (activeLevel.id === 'newton-qcm' || activeLevel.id === 'suites-qcm' || activeLevel.id === 'fonctions-qcm' || activeLevel.id === 'logarithme-qcm' || activeLevel.id === 'probabilites-qcm' || activeLevel.id === 'geometrie-qcm') {
      const questions = isGeometrie ? GEOMETRIE_QCM : isProbabilites ? PROBABILITES_QCM : isLogarithme ? LOGARITHME_QCM : isFonctions ? FONCTIONS_QCM : isMaths ? SUITES_QCM : NEWTON_QCM;
      return <QcmView questions={questions} xpReward={activeLevel.xpReward}
        onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
        onBack={() => setActiveLevel(null)} />;
    }
    const exercises = isGeometrie ? GEOMETRIE_EXERCISES : isProbabilites ? PROBABILITES_EXERCISES : isLogarithme ? LOGARITHME_EXERCISES : isFonctions ? FONCTIONS_EXERCISES : isMaths ? SUITES_EXERCISES : NEWTON_EXERCISES;
    const corrections = isGeometrie ? GEOMETRIE_CORRECTIONS : isProbabilites ? PROBABILITES_CORRECTIONS : isLogarithme ? LOGARITHME_CORRECTIONS : isFonctions ? FONCTIONS_CORRECTIONS : isMaths ? SUITES_CORRECTIONS : NEWTON_CORRECTIONS;
    const nextLevel = module.levels.find(l => l.number === activeLevel.number + 1);
    const correctionUnlocked = nextLevel
      ? completedIds.has(nextLevel.id)
      : completedIds.has(activeLevel.id);
    return <ExerciseView level={activeLevel}
      content={exercises.find(e => e.id === activeLevel.id) ?? null}
      correction={corrections[activeLevel.id] ?? null}
      correctionUnlocked={correctionUnlocked}
      nextLevelTitle={nextLevel?.title}
      onComplete={() => { onComplete(activeLevel); setActiveLevel(null); }}
      onBack={() => setActiveLevel(null)} />;
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
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

      {/* Progress */}
      <div className="mb-5 px-1">
        <div className="flex justify-between text-xs mb-1.5 text-white/40">
          <span>{completedIds.size} / {module.levels.length} niveaux complétés</span>
          <span className="font-bold text-white/60">{earnedXp} / {totalXp} XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full rounded-full bg-amber-500"
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl border border-white/8">
        {([
          { key: 'cours', icon: BookOpen, label: 'Cours' },
          { key: 'fiche', icon: FileText, label: 'Fiche' },
          { key: 'exercices', icon: Gamepad2, label: 'Exercices' },
        ] as const).map(({ key, icon: Icon, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all
              ${tab === key ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'}`}>
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'cours'     && <CourseTab     key="cours" module={module} />}
        {tab === 'fiche'     && <FicheTab      key="fiche" module={module} />}
        {tab === 'exercices' && (
          <ExercicesTab key="exercices" module={module}
            getStatus={getStatus} onOpen={setActiveLevel} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES DE BLOCS — fidèles au PDF
   ═══════════════════════════════════════════════════════════════════════════ */
type BlockType =
  | { type: 'para';      text: string }
  | { type: 'subsection'; num: string; title: string }
  | { type: 'formula';   tex: string; label?: string }
  | { type: 'formules';  label?: string; rows: { desc?: string; tex: string }[] }
  | { type: 'vocabulaire'; title: string; intro?: string; items: string[] }
  | { type: 'definition'; badge?: string; title?: string; content: string; formulas?: string[] }
  | { type: 'propriete'; text: string }
  | { type: 'idee_cle'; text: string }
  | { type: 'idee_comprendre'; items: string[] }
  | { type: 'methode';   title?: string; steps: string[] }
  | { type: 'exemple';   title?: string; lines: string[] }
  | { type: 'application'; title: string; steps: { n: string; bold: string; rest?: string; formulas?: string[] }[] }
  | { type: 'piege';     badge?: string; text: string }
  | { type: 'reflex';    text: string }
  | { type: 'lien_ex';   text: string }
  | { type: 'figure';    caption: string; svg?: () => JSX.Element; src?: string };

interface Section { id: string; num: string; title: string; blocks: BlockType[] }

/* ═══════════════════════════════════════════════════════════════════════════
   FIGURES — images extraites directement du PDF
   ═══════════════════════════════════════════════════════════════════════════ */

const BASE = '/modules/phys-newton';

function FigVecteurs() {
  return <img src={`${BASE}/fig-vecteurs.png`} alt="Vecteurs cinématiques" className="w-full h-auto" />;
}

function FigProjectile() {
  return <img src={`${BASE}/fig-projectile.png`} alt="Trajectoire parabolique du projectile" className="w-full h-auto" />;
}

function FigCondensateur() {
  return <img src={`${BASE}/fig-condensateur.png`} alt="Condensateur plan — déflexion électron" className="w-full h-auto" />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENU DU COURS — fidèle au PDF page par page
   ═══════════════════════════════════════════════════════════════════════════ */
const COURS: Section[] = [
  /* ──────────────────────────────────────────────────────────────────────
   * 1  Décrire un mouvement
   * ─────────────────────────────────────────────────────────────────────── */
  {
    id: 'cinematique', num: '1', title: 'Décrire un mouvement',
    blocks: [
      {
        type: 'para',
        text: 'Avant de comprendre *pourquoi* les objets bougent (la **dynamique**, partie 2), il faut savoir *comment* ils bougent : c\'est la **cinématique**. Tout repose sur un cadre (le référentiel) et trois vecteurs : position, vitesse, accélération.',
      },

      { type: 'subsection', num: '1.1', title: 'Référentiel et repère' },
      {
        type: 'para',
        text: 'Première question à se poser, toujours : **« en mouvement par rapport à quoi ? »** Tout mouvement se décrit **par rapport à un référentiel**, c\'est-à-dire un solide de référence (le wagon, le sol…) muni d\'une horloge.',
      },
      {
        type: 'para',
        text: 'À ce référentiel on attache un **repère** $(O,\\vec{i},\\vec{j})$ : une origine et deux axes. La position du point $M$ est décrite par le **vecteur position**, la flèche qui va de l\'origine jusqu\'à $M$ :',
      },
      { type: 'formula', tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j}' },
      {
        type: 'para',
        text: 'Les deux fonctions $x(t)$ et $y(t)$ sont les **équations horaires** : elles disent où se trouve $M$ à chaque instant. **Décrire un mouvement, c\'est connaître ces deux fonctions.**',
      },
      {
        type: 'vocabulaire',
        title: 'TRAJECTOIRE & TYPES DE MOUVEMENT',
        intro: 'La **trajectoire** est la courbe formée par les positions successives de $M$. On qualifie tout mouvement par **deux critères** :',
        items: [
          'sa **forme** : **rectiligne** (trajectoire droite) ou **curviligne** (courbe — par exemple circulaire ou parabolique) ;',
          'l\'évolution de sa vitesse : **uniforme** (valeur constante), **accéléré** (qui augmente) ou **ralenti** (qui diminue).',
        ],
      },

      { type: 'subsection', num: '1.2', title: 'Vecteur vitesse' },
      {
        type: 'para',
        text: 'La vitesse mesure **à quelle allure et dans quelle direction la position change**. Or « comment une grandeur varie au cours du temps » se traduit en maths par une **dérivée** : le vecteur vitesse est donc la dérivée du vecteur position.',
      },
      { type: 'formula', tex: '\\vec{v}(t) = \\frac{d\\overrightarrow{OM}}{dt} \\qquad\\Longrightarrow\\qquad v_x = \\frac{dx}{dt},\\quad v_y = \\frac{dy}{dt}' },
      {
        type: 'para',
        text: 'En pratique, on dérive simplement **chaque coordonnée** de son côté.',
      },
      {
        type: 'propriete',
        text: 'Le vecteur vitesse est toujours **tangent à la trajectoire** et orienté dans le sens du mouvement. Sa norme s\'exprime en $\\text{m\\,s}^{-1}$.',
      },

      { type: 'subsection', num: '1.3', title: 'Vecteur accélération' },
      {
        type: 'para',
        text: 'De la même façon, l\'accélération mesure **comment la vitesse change** : c\'est la dérivée du vecteur vitesse — donc la dérivée seconde de la position. Elle s\'exprime en $\\text{m\\,s}^{-2}$.',
      },
      { type: 'formula', tex: '\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\overrightarrow{OM}}{dt^2} \\qquad\\Longrightarrow\\qquad a_x = \\frac{dv_x}{dt},\\quad a_y = \\frac{dv_y}{dt}' },
      {
        type: 'idee_cle',
        text: '« Accélérer » ne veut pas seulement dire *aller plus vite*. Un vecteur change aussi quand sa **direction** change. En voiture à vitesse constante dans un virage, ta vitesse *tourne* : il y a une accélération, dirigée **vers l\'intérieur du virage**. À retenir : **tout changement de la vitesse — en norme ou en direction — est une accélération.**',
      },
      {
        type: 'methode',
        title: 'DÉRIVER / INTÉGRER',
        steps: [
          'On travaille toujours **composante par composante** : dériver $\\overrightarrow{OM}\\to\\vec{v}\\to\\vec{a}$, ou intégrer dans l\'autre sens $\\vec{a}\\to\\vec{v}\\to\\overrightarrow{OM}$.',
          'N\'oublier jamais les **constantes d\'intégration**, fixées par les conditions initiales.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE EXPRESS',
        lines: [
          'Soit $\\overrightarrow{OM}(t) = (3t)\\,\\vec{i} + (5t - t^2)\\,\\vec{j}$ (en m). En dérivant :',
          '$\\vec{v}(t) = 3\\,\\vec{i} + (5-2t)\\,\\vec{j}$, puis $\\vec{a}(t) = 0\\,\\vec{i} - 2\\,\\vec{j}$.',
          'L\'accélération est **constante** : le mouvement est **uniformément accéléré**.',
        ],
      },
      {
        type: 'figure',
        caption: 'Vecteur vitesse $\\vec{v}$ tangent à la trajectoire ; le vecteur accélération $\\vec{a}$ est dirigé vers l\'intérieur de la courbe.',
        svg: FigVecteurs,
      },
      { type: 'lien_ex', text: '→ Exercices 1 et 2 : dériver puis intégrer un vecteur position' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * 2  Les trois lois de Newton
   * ─────────────────────────────────────────────────────────────────────── */
  {
    id: 'newton', num: '2', title: 'Les trois lois de Newton',
    blocks: [
      {
        type: 'para',
        text: 'Après avoir *décrit* le mouvement, on cherche à l\'**expliquer** : qu\'est-ce qui le crée ou le modifie ? La réponse tient en un mot — les **forces** — et en trois lois posées par Isaac Newton.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITIONS — FORCE, SYSTÈME, CENTRE D\'INERTIE',
        content: 'Une **force** modélise une action capable de **modifier le mouvement** d\'un objet (ou de le déformer). On la représente par un vecteur, défini par son point d\'application, sa direction, son sens et sa **valeur**, qui se mesure en newtons ($\\text{N}$).\n\nLe **système** est l\'objet (ou l\'ensemble) qu\'on choisit d\'étudier. On suit le mouvement de son **centre d\'inertie** $G$ — le point qui se comporte comme si toute la masse y était concentrée. Une force est dite **extérieure** lorsqu\'elle est exercée par autre chose que le système lui-même : ce sont les seules qui comptent dans les lois de Newton.',
      },

      { type: 'subsection', num: '2.1', title: 'Première loi — principe d\'inertie' },
      {
        type: 'para',
        text: 'L\'idée est simple mais contre-intuitive : **un objet ne s\'arrête pas tout seul**. Ce qui ralentit les objets du quotidien, ce sont les **frottements**, pas une tendance naturelle à s\'arrêter.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION',
        content: 'Dans un **référentiel galiléen**, le centre d\'inertie d\'un système est immobile ou en mouvement rectiligne uniforme **si et seulement si** la somme des forces extérieures est nulle :',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{v}_G = \\overrightarrow{\\text{cte}}' },
      {
        type: 'para',
        text: 'En clair : **sans force (ou si les forces se compensent), pas de changement de mouvement.** Cette loi sert aussi à **définir les référentiels galiléens** — ceux où elle est vérifiée (terrestre sur une courte durée, géocentrique, héliocentrique). On s\'y place toujours pour appliquer les lois de Newton.',
      },

      { type: 'subsection', num: '2.2', title: 'Deuxième loi — principe fondamental de la dynamique' },
      {
        type: 'para',
        text: 'Si les forces ne se compensent pas, le mouvement change. Mais de combien ? La deuxième loi répond exactement, et c\'est l\'**outil central** de tout le chapitre :',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — LOI CENTRALE',
        content: 'Dans un référentiel galiléen, la somme des forces extérieures appliquées à un système de masse $m$ constante est égale au produit de sa masse par l\'accélération de son centre d\'inertie :',
      },
      { type: 'formula', tex: '\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G \\qquad\\left(= \\frac{d\\vec{p}}{dt},\\quad \\vec{p}=m\\vec{v}\\right)' },
      {
        type: 'idee_cle',
        text: 'Lis cette relation comme **cause → effet** : la somme des forces (la cause) fixe l\'accélération (l\'effet). Plus la **force** est grande, plus l\'accélération est grande ; plus la **masse** est grande, moins l\'objet accélère pour une même force — la masse mesure l\'**inertie**, la résistance au changement de vitesse. Et $\\vec{a}$ est dans le **sens de la somme des forces**, pas forcément dans celui du mouvement.',
      },

      { type: 'subsection', num: '2.3', title: 'Troisième loi — actions réciproques' },
      {
        type: 'para',
        text: 'Une force n\'existe jamais seule. Quand tu marches, ton pied pousse le sol vers l\'arrière… et le sol te pousse vers l\'avant. Une fusée éjecte ses gaz vers le bas, les gaz la propulsent vers le haut.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION',
        content: 'Si un corps A exerce une force sur un corps B, alors B exerce sur A une force **opposée**, de même droite d\'action et de même norme :',
      },
      { type: 'formula', tex: '\\vec{F}_{A/B} = -\\vec{F}_{B/A}' },
      {
        type: 'piege',
        badge: 'PIÈGE FRÉQUENT',
        text: 'Les deux forces d\'une paire action–réaction s\'exercent **sur deux corps différents** (A sur B, et B sur A) : elles ne se compensent donc jamais entre elles. Le poids d\'un livre et la réaction de la table ne forment *pas* une telle paire — ils s\'appliquent tous deux **au même corps**, le livre.',
      },
      { type: 'lien_ex', text: '→ Exercices 3 à 7 : bilan des forces, inertie, projection et 3ᵉ loi' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * 3  La méthode universelle (5 étapes)
   * ─────────────────────────────────────────────────────────────────────── */
  {
    id: 'methode', num: '3', title: 'La méthode universelle (5 étapes)',
    blocks: [
      {
        type: 'para',
        text: 'Bonne nouvelle : tous les exercices de dynamique se résolvent avec **la même méthode**. L\'idée d\'ensemble est simple — on repère les forces (la cause), on en déduit l\'accélération par la 2ᵉ loi, puis on « remonte » jusqu\'à la position. **Apprends ces 5 étapes une fois, applique-les partout.**',
      },
      {
        type: 'methode',
        title: '',
        steps: [
          '**Système & référentiel.** Définir le système étudié et choisir un référentiel galiléen.',
          '**Bilan des forces.** Lister toutes les forces extérieures et faire un schéma.',
          '**Deuxième loi.** Écrire $\\sum\\vec{F}_{\\text{ext}} = m\\vec{a}$.',
          '**Projeter.** Projeter la relation vectorielle sur les axes $\\vec{i},\\vec{j}$ pour obtenir $a_x$ et $a_y$.',
          '**Intégrer.** Remonter $\\vec{a}\\to\\vec{v}\\to\\overrightarrow{OM}$ à l\'aide des conditions initiales.',
        ],
      },
      {
        type: 'para',
        text: 'Les étapes 1 à 3 traduisent la **physique** en équations ; les étapes 4 et 5 ne sont plus que des **mathématiques** (projeter, puis intégrer deux fois). Si tu bloques, demande-toi toujours à quelle étape tu en es.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * 4  Mouvement dans un champ de pesanteur uniforme
   * ─────────────────────────────────────────────────────────────────────── */
  {
    id: 'projectile', num: '4', title: 'Mouvement dans un champ de pesanteur uniforme',
    blocks: [
      {
        type: 'para',
        text: 'Première grande application de la méthode : la chute et le tir d\'objets près du sol, là où règne le **champ de pesanteur** $\\vec{g}$.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITIONS — CHAMP UNIFORME, POIDS, PROJECTILE',
        content: 'Un **champ** associe un vecteur à chaque point de l\'espace ; il est **uniforme** dans une région si ce vecteur y a partout la **même direction, le même sens et la même valeur**.\n\nLe **champ de pesanteur** $\\vec{g}$ est, localement, uniforme : vertical, dirigé vers le bas, de valeur $g \\approx 9{,}81\\,\\text{m\\,s}^{-2}$.\n\nLe **poids** est la force exercée par ce champ sur un objet de masse $m$ : $\\vec{P}=m\\vec{g}$. Un **projectile** est un objet lancé, puis soumis à son **seul poids** (frottements de l\'air négligés).',
      },
      {
        type: 'idee_comprendre',
        items: [
          'Une fois lâché, le projectile ne subit **que son poids**, vertical.',
          'Horizontalement, **aucune force** : le mouvement horizontal est donc **uniforme** (vitesse constante).',
          'Verticalement, le poids tire vers le bas : le mouvement vertical est **uniformément accéléré**, comme une chute.',
          'Ces deux mouvements se déroulent **en même temps mais indépendamment** — leur composition dessine la parabole.',
          'Comme $\\vec{a} = \\vec{g}$ ne dépend pas de la masse, une plume et une bille tombent **exactement ensemble** dans le vide (l\'expérience de Galilée).',
        ],
      },
      {
        type: 'application',
        title: 'APPLICATION DE LA MÉTHODE — LE PROJECTILE',
        steps: [
          { n: '①', bold: 'Système / réf. :', rest: 'le projectile, dans le référentiel terrestre supposé galiléen.' },
          { n: '②', bold: 'Bilan :', rest: 'une seule force, le poids $\\vec{P} = m\\vec{g}$ (frottements négligés).' },
          { n: '③', bold: '2ᵉ loi :', rest: '$m\\vec{g} = m\\vec{a}$, donc $\\vec{a} = \\vec{g}$ : *l\'accélération ne dépend pas de la masse*.' },
          { n: '④', bold: 'Projection', rest: '(axe $y$ vers le haut) :', formulas: ['a_x = 0 \\qquad;\\qquad a_y = -g'] },
          { n: '⑤', bold: 'Intégration', rest: 'avec $\\vec{v}_0 = (v_0\\cos\\alpha\\;,\\;v_0\\sin\\alpha)$ et un départ à l\'origine :', formulas: [
            'v_x = v_0\\cos\\alpha \\qquad;\\qquad v_y = -g\\,t + v_0\\sin\\alpha',
            'x(t) = (v_0\\cos\\alpha)\\,t \\qquad;\\qquad y(t) = -\\tfrac{1}{2}g\\,t^2 + (v_0\\sin\\alpha)\\,t',
          ]},
        ],
      },

      { type: 'subsection', num: '4.1', title: 'Équation de la trajectoire' },
      {
        type: 'para',
        text: 'Le mouvement est la **composition** d\'un mouvement **rectiligne uniforme** horizontal et d\'un mouvement **uniformément accéléré** vertical, indépendants l\'un de l\'autre — c\'est ce qui rend la trajectoire parabolique. En éliminant le temps $\\left(t = \\dfrac{x}{v_0\\cos\\alpha}\\right)$ on obtient :',
      },
      { type: 'formula', tex: 'y(x) = -\\frac{g}{2\\,v_0^2\\cos^2\\!\\alpha}\\,x^2 + (\\tan\\alpha)\\,x' },

      { type: 'subsection', num: '4.2', title: 'Grandeurs caractéristiques' },
      {
        type: 'para',
        text: 'Deux grandeurs résument la trajectoire : la **flèche** $H$, hauteur maximale atteinte au sommet, et la **portée** $D$, distance horizontale parcourue avant de retomber au niveau de départ.',
      },
      {
        type: 'formules',
        label: 'FORMULES',
        rows: [
          { desc: 'Date du sommet ($v_y = 0$) :', tex: 't_s = \\dfrac{v_0\\sin\\alpha}{g}' },
          { desc: 'Flèche (hauteur maximale) :', tex: 'H = \\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}' },
          { desc: 'Portée (retour au sol, tir depuis le sol) :', tex: 'D = \\dfrac{v_0^2\\sin(2\\alpha)}{g}' },
        ],
      },
      {
        type: 'para',
        text: 'Le sommet est atteint quand $v_y = 0$. Et comme $\\sin(2\\alpha)$ est maximal pour $2\\alpha = 90°$, la portée est **maximale pour un angle de $45°$**.',
      },
      {
        type: 'figure',
        caption: 'Trajectoire parabolique d\'un projectile : flèche $H$ au sommet, portée $D$ au retour au sol.',
        svg: FigProjectile,
      },
      { type: 'lien_ex', text: '→ Exercices 12, 13, 16 et 17 : projectile complet, tir horizontal, lancer franc, saut en longueur' },
    ],
  },

  /* ──────────────────────────────────────────────────────────────────────
   * 5  Particule chargée dans un champ électrique uniforme
   * ─────────────────────────────────────────────────────────────────────── */
  {
    id: 'champ', num: '5', title: 'Particule chargée dans un champ électrique uniforme',
    blocks: [
      {
        type: 'para',
        text: 'Le même raisonnement s\'applique mot pour mot à une particule chargée placée dans un **champ électrique** : c\'est l\'autre grand exemple de mouvement à accélération constante (au cœur des écrans cathodiques, des imprimantes à jet d\'encre, des accélérateurs de particules).',
      },
      {
        type: 'definition',
        badge: 'DÉFINITIONS — CONDENSATEUR, CHAMP ÉLECTRIQUE, CHARGE',
        content: 'Un **condensateur plan** est formé de deux plaques parallèles entre lesquelles on applique une **tension** $U$ (en volts, $\\text{V}$). Il y règne un **champ électrique uniforme** $\\vec{E}$, dirigé de la plaque $+$ vers la plaque $-$.\n\nUne particule de **charge** $q$ (en coulombs, $\\text{C}$) placée dans ce champ subit la **force électrique** :',
        formulas: ['\\vec{F} = q\\,\\vec{E} \\qquad;\\qquad E = \\frac{U}{d} \\quad (d\\text{ : distance entre plaques})'],
      },
      {
        type: 'para',
        text: 'Une particule de charge $q$ et de masse $m$ pénètre entre les plaques avec une vitesse $\\vec{v}_0$ horizontale ; on lui applique la méthode.',
      },
      {
        type: 'reflex',
        text: 'La force $\\vec{F} = q\\vec{E}$ est **parallèle au champ** si la charge est positive, et **opposée au champ** si la charge est négative (un électron). C\'est ce signe qui décide **vers quelle plaque** la particule est déviée — commence toujours par le déterminer.',
      },
      {
        type: 'piege',
        badge: 'PIÈGE — POIDS NÉGLIGEABLE',
        text: 'Pour une particule élémentaire (électron, ion), le **poids est négligeable** devant la force électrique. Il faut le *justifier* par un rapport d\'ordres de grandeur, puis l\'ignorer.',
      },
      {
        type: 'para',
        text: 'La 2ᵉ loi donne alors une accélération **constante**, donc une trajectoire **parabolique** : c\'est exactement l\'analogue du projectile, avec $\\vec{g}$ remplacé par $\\dfrac{q}{m}\\vec{E}$.',
      },
      {
        type: 'formules',
        label: 'FORMULE',
        rows: [
          { tex: 'm\\vec{a} = q\\vec{E} \\implies \\vec{a} = \\dfrac{q}{m}\\,\\vec{E}' },
          { desc: 'Avec $\\vec{v}_0$ selon $x$ et $\\vec{E}$ selon $y$ :', tex: 'x = v_0 t,\\quad y = \\dfrac{1}{2}\\dfrac{qE}{m}\\,t^2 \\implies y(x) = \\dfrac{qE}{2m\\,v_0^2}\\,x^2' },
        ],
      },
      {
        type: 'figure',
        caption: 'Déflexion d\'un électron (charge négative) : la force $q\\vec{E}$ est opposée à $\\vec{E}$, l\'électron est dévié vers la plaque $+$. Trajectoire parabolique entre les plaques, rectiligne ensuite.',
        svg: FigCondensateur,
      },
      { type: 'lien_ex', text: '→ Exercices 8, 9, 14, 15, 18 et 19 : champ, accélération, déflexion, oscilloscope et canon à électrons' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   RENDU DES BLOCS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Palette amber (Physique) */
const A = {
  bg:       'bg-amber-950/20',
  border:   'border-amber-700/35',
  head:     'bg-amber-600/20',
  headTxt:  'text-amber-300',
  bodyTxt:  'text-amber-100/85',
  label:    'text-amber-400',
  dot:      'bg-amber-500',
  badge:    'bg-amber-500',
};

/** Palette violette (Maths) */
const V = {
  bg:       'bg-violet-900/25',
  border:   'border-violet-500/45',
  head:     'bg-violet-700/35',
  headTxt:  'text-violet-200',
  bodyTxt:  'text-white/90',
  label:    'text-violet-300',
  dot:      'bg-violet-400',
  badge:    'bg-violet-500',
};

type Palette = typeof A;

function Block({ b, pal = A }: { b: BlockType; pal?: Palette }) {
  switch (b.type) {

    /* ── Paragraphe ──────────────────────────────────────────────────────── */
    case 'para':
      return (
        <p className="text-[13.5px] text-white/75 leading-relaxed">
          <MixedText text={b.text} />
        </p>
      );

    /* ── Sous-section ▸ X.X ──────────────────────────────────────────────── */
    case 'subsection':
      return (
        <div className="flex items-center gap-2.5 mt-5 mb-1 pb-2 border-b border-white/10">
          <span className={`${pal.label} font-black text-base leading-none`}>▸</span>
          <h4 className="text-[15px] font-bold text-white tracking-tight">
            <span className={`${pal.label} mr-1.5 font-black`}>{b.num}</span><MixedText text={b.title} />
          </h4>
        </div>
      );

    /* ── Formule unique ───────────────────────────────────────────────────── */
    case 'formula':
      return (
        <div className={`relative rounded-lg ${pal.bg} border ${pal.border} py-3 px-4 text-center overflow-x-auto`}>
          {b.label && (
            <span className={`absolute top-1.5 left-3 text-[9px] font-black ${pal.label} uppercase tracking-widest`}>
              {b.label}
            </span>
          )}
          <BlockMath tex={b.tex} />
        </div>
      );

    /* ── Bloc de plusieurs formules ───────────────────────────────────────── */
    case 'formules':
      return (
        <div className={`rounded-lg ${pal.bg} border ${pal.border} overflow-hidden`}>
          {b.label && (
            <div className={`px-3 py-1.5 ${pal.head} border-b ${pal.border}`}>
              <span className={`text-[9px] font-black ${pal.label} uppercase tracking-widest`}>{b.label}</span>
            </div>
          )}
          <div className="px-4 py-2 space-y-2">
            {b.rows.map((r, i) => (
              <div key={i}>
                {r.desc && (
                  <p className={`text-[12px] ${pal.bodyTxt} mb-0.5`}><MixedText text={r.desc} /></p>
                )}
                <div className="overflow-x-auto"><BlockMath tex={r.tex} /></div>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── Vocabulaire ─────────────────────────────────────────────────────── */
    case 'vocabulaire':
      return (
        <div className={`rounded-lg ${pal.bg} border ${pal.border} overflow-hidden`}>
          <div className={`px-3 py-1.5 ${pal.head} border-b ${pal.border}`}>
            <span className={`text-[9px] font-black ${pal.label} uppercase tracking-widest`}>
              VOCABULAIRE — {b.title}
            </span>
          </div>
          <div className="px-3 py-2.5">
            {b.intro && (
              <p className={`text-[13px] ${pal.bodyTxt} mb-2 leading-relaxed`}>
                <MixedText text={b.intro} />
              </p>
            )}
            <ul className="space-y-1.5">
              {b.items.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${pal.dot} mt-[6px]`}/>
                  <span className={`text-[13px] ${pal.bodyTxt} leading-relaxed`}><MixedText text={item} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    /* ── Définition ──────────────────────────────────────────────────────── */
    case 'definition':
      return (
        <div className={`rounded-lg border-l-[3px] ${pal.dot.replace('bg-', 'border-')} border ${pal.border} ${pal.bg} overflow-hidden`}>
          {b.badge && (
            <div className={`px-3 py-1.5 ${pal.head} border-b ${pal.border}`}>
              <span className={`text-[9px] font-black ${pal.label} uppercase tracking-widest`}>{b.badge}</span>
            </div>
          )}
          <div className="px-3 py-2.5 space-y-2">
            {b.content.split('\n\n').map((para, i) => (
              <p key={i} className={`text-[13px] ${pal.bodyTxt} leading-relaxed`}>
                <MixedText text={para} />
              </p>
            ))}
            {b.formulas?.map((tex, i) => (
              <div key={i} className="overflow-x-auto"><BlockMath tex={tex} /></div>
            ))}
          </div>
        </div>
      );

    /* ── Propriété ── bleu ───────────────────────────────────────────────── */
    case 'propriete':
      return (
        <div className="rounded-lg border-l-[3px] border-blue-400 border border-blue-600/45 bg-blue-950/30 px-3 py-3">
          <div className="mb-1.5">
            <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">PROPRIÉTÉ</span>
          </div>
          <p className="text-[13px] text-white/90 leading-relaxed"><MixedText text={b.text} /></p>
        </div>
      );

    /* ── Idée clé 💡 ── violet ───────────────────────────────────────────── */
    case 'idee_cle':
      return (
        <div className="rounded-lg border border-violet-500/45 bg-violet-900/25 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-700/35 border-b border-violet-500/35">
            <span>💡</span>
            <span className="text-[9px] font-black text-violet-200 uppercase tracking-widest">IDÉE CLÉ</span>
          </div>
          <p className="px-3 py-3 text-[13px] text-white/90 leading-relaxed">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    /* ── L'idée à comprendre 💡 ── violet ───────────────────────────────── */
    case 'idee_comprendre':
      return (
        <div className="rounded-lg border border-violet-500/45 bg-violet-900/25 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-700/35 border-b border-violet-500/35">
            <span>💡</span>
            <span className="text-[9px] font-black text-violet-200 uppercase tracking-widest">L'IDÉE À COMPRENDRE</span>
          </div>
          <ul className="px-3 py-3 space-y-2">
            {b.items.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-violet-400 mt-[6px]"/>
                <span className="text-[13px] text-white/90 leading-relaxed"><MixedText text={item} /></span>
              </li>
            ))}
          </ul>
        </div>
      );

    /* ── Méthode (étapes numérotées) ── vert ─────────────────────────────── */
    case 'methode':
      return (
        <div className="rounded-lg border border-emerald-600/45 bg-emerald-950/30 overflow-hidden">
          <div className="px-3 py-1.5 bg-emerald-700/35 border-b border-emerald-600/35">
            <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">
              MÉTHODE{b.title ? ` — ${b.title}` : ''}
            </span>
          </div>
          <ol className="divide-y divide-emerald-700/20">
            {b.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start px-3 py-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-[11px] font-black text-black flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[13px] text-white/90 leading-relaxed"><MixedText text={step} /></span>
              </li>
            ))}
          </ol>
        </div>
      );

    /* ── Exemple express ── cyan ──────────────────────────────────────────── */
    case 'exemple':
      return (
        <div className="rounded-lg border border-cyan-600/45 bg-cyan-950/30 overflow-hidden">
          <div className="px-3 py-1.5 bg-cyan-700/35 border-b border-cyan-600/35">
            <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest">
              EXEMPLE{b.title ? ` — ${b.title}` : ''}
            </span>
          </div>
          <div className="px-3 py-3 space-y-1.5">
            {b.lines.map((line, i) =>
              line === '' ? <div key={i} className="h-1" /> : (
                <p key={i} className="text-[13px] text-white/90 leading-relaxed">
                  <MixedText text={line} />
                </p>
              )
            )}
          </div>
        </div>
      );

    /* ── Application de la méthode ── vert ───────────────────────────────── */
    case 'application':
      return (
        <div className="rounded-lg border border-emerald-600/45 bg-emerald-950/30 overflow-hidden">
          <div className="px-3 py-1.5 bg-emerald-700/35 border-b border-emerald-600/35">
            <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">{b.title}</span>
          </div>
          <div className="divide-y divide-emerald-700/20">
            {b.steps.map((step, i) => (
              <div key={i} className="px-3 py-3 space-y-1.5">
                <p className="text-[13px] text-white/90 leading-relaxed">
                  <span className="font-bold text-emerald-300 mr-1">{step.n}</span>
                  <strong className="text-emerald-300">{step.bold}</strong>
                  {step.rest && <> <MixedText text={step.rest} /></>}
                </p>
                {step.formulas?.map((tex, j) => (
                  <div key={j} className="overflow-x-auto pl-7">
                    <BlockMath tex={tex} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    /* ── Piège fréquent ── rouge ──────────────────────────────────────────── */
    case 'piege':
      return (
        <div className="rounded-lg border-l-[3px] border-l-red-500 border border-red-700/45 bg-red-950/30 overflow-hidden">
          <div className="px-3 py-1.5 bg-red-800/30 border-b border-red-700/35">
            <span className="text-[9px] font-black text-red-300 uppercase tracking-widest">
              {b.badge ?? '⚠ PIÈGE FRÉQUENT'}
            </span>
          </div>
          <p className="px-3 py-3 text-[13px] text-white/90 leading-relaxed">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    /* ── Le bon réflexe ── vert clair ────────────────────────────────────── */
    case 'reflex':
      return (
        <div className="rounded-lg border-l-[4px] border-l-green-500 border border-green-600/45 bg-green-900/30 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-800/30 border-b border-green-600/30">
            <span className="text-base">🎯</span>
            <span className="text-[10px] font-black text-green-300 uppercase tracking-widest">RÉFLEXE — À RETENIR</span>
          </div>
          <p className="px-4 py-3 text-[13.5px] text-white/95 leading-relaxed font-medium">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    /* ── Lien vers les exercices ─────────────────────────────────────────── */
    case 'lien_ex':
      return (
        <div className="flex">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/12 border border-amber-600/35 text-[11px] font-semibold text-amber-300/80">
            {b.text}
          </span>
        </div>
      );

    /* ── Figure (SVG ou image) ───────────────────────────────────────────── */
    case 'figure':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1520]">
          <div className="px-3 pt-3 pb-1">
            {b.src
              ? <img src={b.src} alt={b.caption} className="w-full rounded" />
              : b.svg ? <b.svg /> : null}
          </div>
          <div className="px-3 py-2 border-t border-white/8 bg-white/[0.02]">
            <p className="text-[11px] text-white/40 text-center italic leading-snug">
              <MixedText text={b.caption} />
            </p>
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

// ── Contenu Les fonctions ─────────────────────────────────────────────────────
const FONCTIONS_OBJECTIFS = [
  'Calculer des **limites de fonctions** en levant les formes indéterminées ($\\infty/\\infty$, $\\infty-\\infty$).',
  'Exploiter le **théorème des gendarmes** et les **croissances comparées** ($x^n \\ll e^x$).',
  'Identifier les **asymptotes** horizontales et verticales d\'une courbe.',
  'Dériver des fonctions composées et dresser un **tableau de variations** complet.',
  'Étudier la **convexité** via $f\'\'$ et localiser les **points d\'inflexion**.',
  'Appliquer le **TVI** pour prouver l\'existence et l\'unicité d\'une solution.',
];


const FONCTIONS_COURS: Section[] = [
  {
    id: 'limites',
    num: '1',
    title: 'Limites de fonctions',
    blocks: [
      {
        type: 'para',
        text: 'Étudier une fonction, c\'est comprendre son comportement global : que se passe-t-il quand $x$ devient très grand, ou s\'approche d\'un point particulier ? C\'est précisément ce que décrivent les **limites**. Elles permettent aussi de lire la courbe à grande échelle — les **asymptotes** — et de lever les cas difficiles où la forme calculée est du type $\\dfrac{\\infty}{\\infty}$ ou $\\infty-\\infty$.',
      },
      { type: 'subsection', num: '1.1', title: 'Définition et intuition' },
      {
        type: 'definition',
        badge: 'DÉFINITION — Limite en $+\\infty$',
        content: 'On dit que $f(x)\\to\\ell$ quand $x\\to+\\infty$ si les valeurs de $f(x)$ peuvent être rendues aussi proches de $\\ell$ que l\'on veut, en prenant $x$ suffisamment grand. Formellement : pour tout $\\varepsilon>0$, il existe $B>0$ tel que $x>B\\Rightarrow|f(x)-\\ell|\\leq\\varepsilon$.',
      },
      {
        type: 'propriete',
        text: 'Si $\\displaystyle\\lim_{x\\to+\\infty}f(x)=\\ell$ (réel fini), la droite $y=\\ell$ est une **asymptote horizontale** à la courbe $\\mathcal{C}_f$. Si $\\displaystyle\\lim_{x\\to a}f(x)=\\pm\\infty$, la droite $x=a$ est une **asymptote verticale**.',
      },
      { type: 'figure', caption: 'Fig. 1.1 — Asymptote horizontale $y=2$ (en $+\\infty$) et asymptote verticale $x=1$ pour $f(x)=\\dfrac{2x+1}{x-1}$.', src: '/modules/maths-fonctions/fig1-1.png' },
      { type: 'subsection', num: '1.2', title: 'Théorème des gendarmes' },
      {
        type: 'propriete',
        text: 'Si $g(x)\\leq f(x)\\leq h(x)$ au voisinage de $+\\infty$ et si $\\displaystyle\\lim_{+\\infty}g=\\lim_{+\\infty}h=\\ell$, alors $\\displaystyle\\lim_{+\\infty}f=\\ell$. Idem si $g\\to+\\infty$ : si $f\\geq g$, alors $f\\to+\\infty$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Pour $g(x)=\\dfrac{\\cos x}{x}$ : $-\\dfrac{1}{x}\\leq g(x)\\leq\\dfrac{1}{x}$ (car $|\\cos x|\\leq 1$).',
          'Les deux gendarmes tendent vers $0$ en $+\\infty$, donc $g(x)\\to 0$.',
        ],
      },
      { type: 'subsection', num: '1.3', title: 'Formes indéterminées' },
      {
        type: 'para',
        text: 'Lorsque le calcul direct donne $\\dfrac{\\infty}{\\infty}$ ou $\\infty-\\infty$, il faut transformer l\'expression avant de conclure.',
      },
      {
        type: 'methode',
        title: 'LEVER UNE FORME INDÉTERMINÉE',
        steps: [
          '**Forme $\\dfrac{\\infty}{\\infty}$** : factoriser numérateur et dénominateur par la plus grande puissance de $x$ qui apparaît.',
          '**Forme $\\infty-\\infty$** (racines) : multiplier par la **quantité conjuguée** $\\sqrt{A}+\\sqrt{B}$ ou $\\sqrt{A}+B$.',
          'Simplifier, puis évaluer la limite du résultat.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          '$\\sqrt{x^2+x}-x = \\dfrac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x}=\\dfrac{x^2+x-x^2}{\\sqrt{x^2+x}+x}=\\dfrac{x}{\\sqrt{x^2+x}+x}$.',
          'En divisant par $x$ : $\\dfrac{1}{\\sqrt{1+\\frac{1}{x}}+1}\\to\\dfrac{1}{2}$.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 1 à 5 : définition, gendarmes, formes indéterminées, asymptotes' },
    ],
  },
  {
    id: 'exponentielle',
    num: '2',
    title: 'La fonction exponentielle',
    blocks: [
      {
        type: 'para',
        text: 'La fonction exponentielle est omniprésente en analyse : croissance des populations, radioactivité, intérêts composés… Sa particularité ? Elle est **égale à sa propre dérivée**, ce qui la rend unique et fondamentale.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Propriétés fondamentales',
        content: 'La fonction $\\exp : x\\mapsto e^x$ est l\'unique fonction telle que $f\'=f$ et $f(0)=1$. Elle est définie, **strictement positive** et **strictement croissante** sur $\\mathbb{R}$.',
        formulas: [
          'e^{a+b}=e^a\\cdot e^b \\qquad;\\qquad e^{-a}=\\dfrac{1}{e^a} \\qquad;\\qquad (e^u)\'=u\'e^u',
        ],
      },
      {
        type: 'propriete',
        text: '$\\displaystyle\\lim_{x\\to+\\infty}e^x=+\\infty$ et $\\displaystyle\\lim_{x\\to-\\infty}e^x=0$ : l\'axe des abscisses est une asymptote horizontale en $-\\infty$.',
      },
      { type: 'subsection', num: '2.1', title: 'Croissances comparées' },
      {
        type: 'idee_cle',
        text: 'L\'exponentielle **gagne toujours** face à n\'importe quelle puissance : pour tout entier $n\\geq 0$, $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{x^n}{e^x}=0$ et $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^n}=+\\infty$. Autrement dit, $x^n\\ll e^x$ en $+\\infty$. De même, $x^n e^{-x}\\to 0$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLES',
        lines: [
          '$\\dfrac{e^x}{x^2+1}\\to+\\infty$ (car $x^2\\ll e^x$).',
          '$xe^x\\to 0$ en $-\\infty$ (poser $t=-x$ : $-te^{-t}\\to 0$).',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 6 et 7 : croissances comparées, limites avec eˣ' },
    ],
  },
  {
    id: 'derivation',
    num: '3',
    title: 'Dérivation',
    blocks: [
      {
        type: 'para',
        text: 'La dérivée mesure **la vitesse de variation** de $f$ en un point. En un point, c\'est la pente de la tangente. Globalement, son signe dicte les **variations** de $f$.',
      },
      { type: 'subsection', num: '3.1', title: 'Nombre dérivé et tangente' },
      {
        type: 'definition',
        badge: 'DÉFINITION',
        content: 'Le **nombre dérivé** de $f$ en $a$ est la limite du taux d\'accroissement : $f\'(a)=\\displaystyle\\lim_{h\\to 0}\\dfrac{f(a+h)-f(a)}{h}$. C\'est la pente de la **tangente** à $\\mathcal{C}_f$ au point d\'abscisse $a$, d\'équation :',
        formulas: ['y=f\'(a)(x-a)+f(a)'],
      },
      { type: 'figure', caption: 'Fig. 3.1 — La tangente en $A(a,f(a))$ a pour pente $f\'(a)$.', src: '/modules/maths-fonctions/fig3-1.png' },
      { type: 'subsection', num: '3.2', title: 'Règles de dérivation' },
      {
        type: 'formules',
        label: 'RÈGLES CLÉS',
        rows: [
          { desc: 'Produit :', tex: '(fg)\'=f\'g+fg\'' },
          { desc: 'Quotient :', tex: '\\left(\\dfrac{f}{g}\\right)\'=\\dfrac{f\'g-fg\'}{g^2}' },
          { desc: 'Composée :', tex: '\\bigl(f(g(x))\\bigr)\'=g\'(x)\\cdot f\'(g(x))' },
        ],
      },
      {
        type: 'formules',
        label: 'COMPOSÉES USUELLES',
        rows: [
          { tex: '(e^u)\'=u\'e^u' },
          { tex: '(\\ln u)\'=\\dfrac{u\'}{u}' },
          { tex: '(\\sqrt{u})\'=\\dfrac{u\'}{2\\sqrt{u}}' },
          { tex: '(u^n)\'=nu\'u^{n-1}' },
        ],
      },
      { type: 'subsection', num: '3.3', title: 'Tableau de variations' },
      {
        type: 'propriete',
        text: '$f\'(x)>0$ sur $I\\Rightarrow f$ **strictement croissante** sur $I$. $f\'(x)<0\\Rightarrow f$ **strictement décroissante**. $f\'$ s\'annule en changeant de signe : extremum local (maximum si $+\\to-$, minimum si $-\\to+$).',
      },
      {
        type: 'methode',
        title: 'DRESSER UN TABLEAU DE VARIATIONS',
        steps: [
          'Calculer $f\'(x)$ (factoriser pour le signe).',
          'Étudier le signe de $f\'$ sur chaque intervalle (tableau de signes).',
          'En déduire la monotonie de $f$ et les extrema locaux.',
          'Ajouter les limites aux bornes pour compléter le tableau.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 8 à 11 : tangentes, dérivées composées, tableaux de variations' },
    ],
  },
  {
    id: 'convexite',
    num: '4',
    title: 'Convexité',
    blocks: [
      {
        type: 'para',
        text: 'La convexité décrit la **courbure** d\'une courbe : est-elle creuse ou bombée ? C\'est la dérivée seconde $f\'\'$ qui répond à cette question, et c\'est aussi elle qui permet de repérer les **points d\'inflexion**, là où la courbure change de sens.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITIONS',
        content: '$f$ est **convexe** sur $I$ si $f\'\'\\geq 0$ sur $I$ : la courbe est **au-dessus de ses tangentes**. $f$ est **concave** sur $I$ si $f\'\'\\leq 0$ sur $I$ : la courbe est **en-dessous de ses tangentes**.',
      },
      {
        type: 'idee_cle',
        text: 'Retenir l\'image : une **courbe convexe** ressemble à un bol ($\\smile$) — elle est creuse, et si tu poses une règle sur deux points, la règle passe au-dessus de la courbe. Une **courbe concave** est comme une colline ($\\frown$) — bombée vers le haut.',
      },
      { type: 'figure', caption: 'Fig. 4.1 — À gauche : courbe **convexe** (corde au-dessus). À droite : courbe **concave** (corde en dessous).', src: '/modules/maths-fonctions/fig4-1.png' },
      { type: 'subsection', num: '4.1', title: 'Point d\'inflexion' },
      {
        type: 'definition',
        badge: 'DÉFINITION',
        content: 'Un **point d\'inflexion** est un point où $\\mathcal{C}_f$ **traverse** sa tangente, c\'est-à-dire où la convexité change de sens. Cela correspond à $f\'\'$ qui **s\'annule en changeant de signe**.',
      },
      {
        type: 'piege',
        text: 'Si $f\'\'(x_0)=0$ mais $f\'\'$ **ne change pas de signe** en $x_0$ (ex. $f(x)=x^4$ en $0$), il n\'y a **pas** de point d\'inflexion.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — $f(x)=xe^x$',
        lines: [
          '$f\'(x)=(1+x)e^x$, $f\'\'(x)=(2+x)e^x$.',
          '$f\'\'(x)\\geq 0\\iff x\\geq-2$ : $f$ convexe sur $[-2,+\\infty[$, concave sur $]-\\infty,-2]$.',
          'Point d\'inflexion en $x=-2$.',
        ],
      },
      { type: 'subsection', num: '4.2', title: 'Application : inégalités' },
      {
        type: 'propriete',
        text: 'Si $f$ est convexe sur $I$, alors pour tout $x\\in I$ et tout $a\\in I$ : $f(x)\\geq f\'(a)(x-a)+f(a)$ (la courbe est au-dessus de chaque tangente). Cela permet de prouver des **inégalités fondamentales** : ex. $e^x\\geq x+1$ pour tout $x$ (convexité de $e^x$ en $a=0$).',
      },
      { type: 'lien_ex', text: '→ Exercices 12 à 14 : convexité, inflexion, inégalité eˣ ≥ x+1' },
    ],
  },
  {
    id: 'continuite',
    num: '5',
    title: 'Continuité et TVI',
    blocks: [
      {
        type: 'para',
        text: 'Une fonction est continue si on peut tracer sa courbe **sans lever le crayon**. C\'est l\'hypothèse clé du théorème des valeurs intermédiaires, l\'outil roi pour prouver qu\'une équation $f(x)=k$ a une solution.',
      },
      { type: 'subsection', num: '5.1', title: 'Continuité' },
      {
        type: 'definition',
        badge: 'DÉFINITION',
        content: '$f$ est **continue** en $a$ si $\\displaystyle\\lim_{x\\to a}f(x)=f(a)$. Elle est continue sur $I$ si elle l\'est en tout point de $I$.',
      },
      {
        type: 'propriete',
        text: 'Si $f$ est **dérivable** en $a$, alors $f$ est **continue** en $a$. La **réciproque est fausse** : $x\\mapsto|x|$ est continue en $0$ mais non dérivable (les pentes à gauche $-1$ et à droite $+1$ diffèrent).',
      },
      {
        type: 'reflex',
        text: 'Les fonctions polynomiales, rationnelles, racine, $\\exp$, $\\ln$, $\\sin$, $\\cos$ sont continues sur tout intervalle de leur ensemble de définition. Toute composée ou combinaison de telles fonctions l\'est aussi.',
      },
      { type: 'subsection', num: '5.2', title: 'Théorème des valeurs intermédiaires (TVI)' },
      {
        type: 'definition',
        badge: 'THÉORÈME DES VALEURS INTERMÉDIAIRES',
        content: 'Soit $f$ **continue** sur $[a,b]$. Pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe $c\\in[a,b]$ tel que $f(c)=k$.',
      },
      {
        type: 'idee_cle',
        text: 'Le TVI dit : « si tu pars de $f(a)$ et tu arrives à $f(b)$ sans lever le crayon, tu passes **obligatoirement** par toute valeur intermédiaire. » Il garantit l\'**existence** d\'une solution, mais pas son **unicité**.',
      },
      { type: 'figure', caption: 'Fig. 5.1 — Toute valeur $k$ comprise entre $f(a)$ et $f(b)$ est atteinte : il existe $c\\in[a,b]$ tel que $f(c)=k$.', src: '/modules/maths-fonctions/fig5-1.png' },
      {
        type: 'definition',
        badge: 'COROLLAIRE — Unicité',
        content: 'Si $f$ est **continue ET strictement monotone** sur $[a,b]$, alors pour tout $k$ entre $f(a)$ et $f(b)$, l\'équation $f(x)=k$ admet une **unique** solution dans $[a,b]$.',
      },
      {
        type: 'methode',
        title: 'PROUVER L\'UNICITÉ D\'UNE SOLUTION',
        steps: [
          '**Continuité.** Justifier que $f$ est continue sur l\'intervalle (polynôme, composée de fonctions continues…).',
          '**Stricte monotonie.** Étudier le signe de $f\'$ pour conclure que $f$ est strictement croissante (ou décroissante).',
          '**Valeurs aux bornes.** Vérifier que $k$ est compris entre $f(a)$ et $f(b)$ (ou entre les limites si l\'intervalle est $\\mathbb{R}$).',
          '**Conclusion.** Par le corollaire du TVI : il existe une **unique** solution. On peut ensuite l\'encadrer par dichotomie (calculer $f$ en des points intermédiaires).',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 15 à 18 : continuité, TVI, unicité, nombre de solutions' },
    ],
  },
];

// ── Fiche de révision Les fonctions ──────────────────────────────────────────
const FONCTIONS_FICHE_DATA = [
  {
    title: '1  Limites & Asymptotes',
    rows: [
      {
        label: 'Asym. horizontale',
        tex: 'f(x)\\to\\ell\\text{ en }\\pm\\infty\\Rightarrow y=\\ell',
        vars: '$\\ell$ : valeur finie vers laquelle $f$ tend · La droite $y=\\ell$ est asymptote horizontale à $\\mathcal{C}_f$',
      },
      {
        label: 'Asym. verticale',
        tex: 'f(x)\\to\\pm\\infty\\text{ en }a\\Rightarrow x=a',
        vars: '$a$ : valeur interdite ou singulière de $f$ · La droite $x=a$ est asymptote verticale à $\\mathcal{C}_f$',
      },
      {
        label: 'Gendarmes',
        tex: 'g\\leq f\\leq h,\\;g,h\\to\\ell\\Rightarrow f\\to\\ell',
        vars: '$g,h$ : fonctions encadrantes (gendarmes) · $\\ell$ : limite commune · Si $g\\to+\\infty$ et $f\\geq g$, alors $f\\to+\\infty$',
      },
      {
        label: 'Croissances comp.',
        tex: '\\frac{e^x}{x^n}\\to+\\infty,\\quad x^n e^{-x}\\to 0',
        vars: 'Valable en $+\\infty$ pour tout $n\\in\\mathbb{N}$ · $x^n\\ll e^x$ : l\'exponentielle domine toujours les puissances',
      },
    ],
  },
  {
    title: '2  Tangente & Dérivation',
    rows: [
      {
        label: 'Tangente en $a$',
        tex: 'y=f\'(a)(x-a)+f(a)',
        vars: '$f\'(a)$ : pente (nombre dérivé) · $f(a)$ : ordonnée du point de tangence · On pose $h\\to 0$ dans $\\dfrac{f(a+h)-f(a)}{h}$',
      },
      {
        label: 'Produit',
        tex: '(fg)\'=f\'g+fg\'',
        vars: '$f,g$ : deux fonctions dérivables · Mémoriser : « dérivée première × deuxième + première × dérivée deuxième »',
      },
      {
        label: 'Quotient',
        tex: '\\left(\\dfrac{f}{g}\\right)\'=\\dfrac{f\'g-fg\'}{g^2}',
        vars: '$g\\neq 0$ sur l\'intervalle · Mémoriser : « dérivée × bas − haut × dérivée bas, sur bas² »',
      },
      {
        label: 'Composée',
        tex: '(f\\circ g)\'=g\'\\cdot(f\'\\circ g)',
        vars: 'Mémoriser : $(e^u)\'=u\'e^u$ · $(\\ln u)\'=u\'/u$ · $(\\sqrt{u})\'=u\'/(2\\sqrt{u})$ · $(u^n)\'=nu\'u^{n-1}$',
      },
    ],
  },
  {
    title: '3  Variations & Extrema',
    rows: [
      {
        label: 'Signe de $f\'$',
        tex: 'f\'(x)>0\\Rightarrow f\\nearrow\\;;\\quad f\'<0\\Rightarrow f\\searrow',
        vars: 'Si $f\'$ s\'annule **en changeant de signe** : extremum local. De $+$ à $-$ : maximum ; de $-$ à $+$ : minimum',
      },
    ],
  },
  {
    title: '4  Convexité',
    rows: [
      {
        label: 'Convexe',
        tex: 'f\'\'\\geq 0\\Leftrightarrow\\mathcal{C}_f\\text{ au-dessus de ses tangentes}',
        vars: '$f\'\'$ : dérivée seconde de $f$ · Courbe convexe : forme de bol $\\smile$ · Au-dessus des tangentes',
      },
      {
        label: 'Concave',
        tex: 'f\'\'\\leq 0\\Leftrightarrow\\mathcal{C}_f\\text{ en-dessous de ses tangentes}',
        vars: 'Courbe concave : forme de colline $\\frown$ · En-dessous des tangentes',
      },
      {
        label: 'Inflexion',
        tex: 'f\'\'(x_0)=0\\text{ (avec changement de signe)}',
        vars: '$x_0$ : abscisse du point d\'inflexion · $f\'\'$ doit **changer de signe** (si $f\'\'$ ne change pas de signe, pas d\'inflexion)',
      },
    ],
  },
  {
    title: '5  Continuité & TVI',
    rows: [
      {
        label: 'Continue en $a$',
        tex: '\\lim_{x\\to a}f(x)=f(a)',
        vars: 'Dérivable $\\Rightarrow$ continue (réciproque fausse : $|x|$ est continue mais non dérivable en $0$)',
      },
      {
        label: 'TVI',
        tex: 'k\\in[f(a),f(b)]\\Rightarrow\\exists\\, c\\in[a,b],\\;f(c)=k',
        vars: '$f$ : continue sur $[a,b]$ · $k$ : valeur intermédiaire · Garantit l\'**existence** d\'une solution — pas l\'unicité',
      },
      {
        label: 'Unicité',
        tex: 'f\\text{ continue}+\\text{strictement monotone}\\Rightarrow!c',
        vars: '$!c$ : une **unique** solution · Méthode : (1) continuité (2) stricte monotonie ($f\'>0$) (3) $k$ entre $f(a)$ et $f(b)$',
      },
    ],
  },
];

// ── Contenu Logarithme ────────────────────────────────────────────────────────
const LOGARITHME_OBJECTIFS = [
  'Maîtriser la **définition** de $\\ln$ comme réciproque de $\\exp$ et les relations $e^{\\ln x}=x$, $\\ln(e^x)=x$.',
  'Utiliser les **propriétés algébriques** : $\\ln(ab)=\\ln a+\\ln b$, $\\ln(a^n)=n\\ln a$, $\\ln(\\sqrt{a})=\\tfrac{1}{2}\\ln a$.',
  'Calculer des **limites** en $0^+$ et $+\\infty$ grâce aux croissances comparées ($\\ln x\\ll x^\\alpha\\ll e^x$).',
  'Dériver $\\ln u$ : appliquer $(\\ln u)\'=\\dfrac{u\'}{u}$ et dresser un **tableau de variations** complet.',
  'Résoudre **équations et inéquations** avec $\\ln$ ou $\\exp$ en fixant les domaines au préalable.',
  'Réaliser une **étude complète** de fonctions type bac mêlant $\\ln$, dérivation et TVI.',
];

const LOGARITHME_FICHE_DATA = [
  {
    title: '1  Définition & Relations fondamentales',
    rows: [
      {
        label: 'Définition',
        tex: 'x=e^y \\Longleftrightarrow y=\\ln x \\quad (x>0)',
        vars: '$\\ln$ : réciproque de $\\exp$ sur $]0,+\\infty[$ · $e^{\\ln x}=x$ pour $x>0$ · $\\ln(e^x)=x$ pour tout $x\\in\\mathbb{R}$',
      },
      {
        label: 'Valeurs clés',
        tex: '\\ln 1=0 \\qquad \\ln e=1',
        vars: '$\\ln$ est nulle en $1$ et vaut $1$ en $e\\approx 2{,}718$',
      },
      {
        label: 'Signe',
        tex: '\\ln a>0\\Leftrightarrow a>1 \\quad;\\quad \\ln a<0\\Leftrightarrow 0<a<1',
        vars: 'Strictement croissante : $\\ln a<\\ln b\\Longleftrightarrow a<b$',
      },
    ],
  },
  {
    title: '2  Propriétés algébriques',
    rows: [
      {
        label: 'Produit',
        tex: '\\ln(ab)=\\ln a+\\ln b',
        vars: '$a,b>0$ · Le logarithme transforme les **produits** en sommes',
      },
      {
        label: 'Quotient / inverse',
        tex: '\\ln\\!\\left(\\dfrac{a}{b}\\right)=\\ln a-\\ln b \\quad;\\quad \\ln\\!\\left(\\dfrac{1}{b}\\right)=-\\ln b',
        vars: 'Attention : $\\ln(a+b)\\neq\\ln a+\\ln b$ (piège classique)',
      },
      {
        label: 'Puissance / racine',
        tex: '\\ln(a^n)=n\\ln a \\quad;\\quad \\ln(\\sqrt{a})=\\tfrac{1}{2}\\ln a',
        vars: '$n\\in\\mathbb{Z}$ (ou même $n\\in\\mathbb{Q}$) · Attention : $(\\ln a)^2\\neq 2\\ln a$',
      },
    ],
  },
  {
    title: '3  Dérivée & Variations',
    rows: [
      {
        label: 'Dérivée',
        tex: '\\ln\'(x)=\\dfrac{1}{x} \\quad;\\quad (\\ln u)\'=\\dfrac{u\'}{u}',
        vars: '$u$ strictement positive et dérivable sur $I$ · Exemple : $(\\ln(x^2+1))\'=\\dfrac{2x}{x^2+1}$',
      },
      {
        label: 'Variations',
        tex: '\\text{strictement croissante sur }]0,+\\infty[',
        vars: '$\\ln\'(x)=1/x>0$ · Concave : $\\ln\'\'(x)=-1/x^2<0$',
      },
      {
        label: 'Limites',
        tex: '\\lim_{x\\to+\\infty}\\ln x=+\\infty \\quad;\\quad \\lim_{x\\to 0^+}\\ln x=-\\infty',
        vars: 'Asymptote verticale $x=0$ à la courbe $\\mathcal{C}_{\\ln}$',
      },
    ],
  },
  {
    title: '4  Croissances comparées',
    rows: [
      {
        label: 'En $+\\infty$',
        tex: '\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x^n}=0 \\quad (n\\in\\mathbb{N}^*)',
        vars: 'Les puissances $x^n$ dominent $\\ln x$ · $\\ln x\\ll x^\\alpha\\ll e^x$ en $+\\infty$',
      },
      {
        label: 'En $0^+$',
        tex: '\\lim_{x\\to 0^+}x^n\\ln x=0 \\quad (n\\in\\mathbb{N}^*)',
        vars: 'En particulier $x\\ln x\\to 0$ — les puissances de $x$ "écrasent" le $\\ln$',
      },
    ],
  },
  {
    title: '5  Équations & Inéquations',
    rows: [
      {
        label: 'Équations de référence',
        tex: '\\ln x=a\\Leftrightarrow x=e^a \\quad;\\quad e^x=b\\Leftrightarrow x=\\ln b\\;(b>0)',
        vars: '$\\ln A=\\ln B\\Longleftrightarrow A=B$ (sur $A,B>0$) · Stricte croissance conserve le sens',
      },
      {
        label: 'Méthode',
        tex: '\\text{Domaine}\\to\\text{Transformer}\\to\\text{Résoudre}\\to\\text{Vérifier}',
        vars: 'Toujours poser le domaine d\'existence en premier ($u>0$ pour $\\ln u$)',
      },
    ],
  },
];

const LOGARITHME_COURS: Section[] = [
  {
    id: 'definition',
    num: '1',
    title: 'Définition & premières propriétés',
    blocks: [
      {
        type: 'para',
        text: 'La fonction $\\exp$ est continue et strictement croissante de $\\mathbb{R}$ sur $]0,+\\infty[$. D\'après le corollaire du TVI, tout réel $x>0$ possède un unique antécédent par $\\exp$ : c\'est le **logarithme népérien** de $x$, noté $\\ln x$.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Logarithme népérien',
        content: 'Le **logarithme népérien**, noté $\\ln$, est la fonction définie sur $]0,+\\infty[$ qui à $x>0$ associe l\'unique réel $y$ tel que $e^y=x$. C\'est la **fonction réciproque** de $\\exp$.',
      },
      {
        type: 'propriete',
        text: '**Relations fondamentales** — Pour $x>0$ et $y\\in\\mathbb{R}$ : $x=e^y\\Longleftrightarrow y=\\ln x$. De plus : $e^{\\ln x}=x$ (pour $x>0$) et $\\ln(e^x)=x$ (pour tout $x$). Valeurs remarquables : $\\ln 1=0$ et $\\ln e=1$.',
      },
      {
        type: 'figure',
        caption: 'Fig. 1.1 — $\\ln$ est le symétrique de $\\exp$ par rapport à la droite $y=x$. Points remarquables : $(1,e)$ sur $\\mathcal{C}_{\\exp}$ et $(e,1)$ sur $\\mathcal{C}_{\\ln}$.',
        src: '/modules/maths-logarithme/fig1-1.png',
      },
      {
        type: 'propriete',
        text: '$\\ln$ est **strictement croissante** sur $]0,+\\infty[$ (elle hérite de la stricte croissance de $\\exp$). Conséquences : $\\ln a=\\ln b\\Longleftrightarrow a=b$ ; $\\ln a<\\ln b\\Longleftrightarrow a<b$ ; $\\ln a>0\\Longleftrightarrow a>1$ ; $\\ln a<0\\Longleftrightarrow 0<a<1$.',
      },
      { type: 'lien_ex', text: '→ Exercices 1 à 3 : expressions, simplifications, démonstration algébrique' },
    ],
  },
  {
    id: 'algebre',
    num: '2',
    title: 'Propriétés algébriques',
    blocks: [
      {
        type: 'para',
        text: 'Le logarithme **transforme les produits en sommes** : c\'est sa propriété reine, qui découle directement de $e^{a+b}=e^a e^b$.',
      },
      {
        type: 'propriete',
        text: '**Règles de calcul** — Pour tous $a,b>0$ et $n\\in\\mathbb{Z}$ (ou même $n\\in\\mathbb{Q}$) : $\\ln(ab)=\\ln a+\\ln b$ ; $\\ln\\!\\left(\\dfrac{1}{b}\\right)=-\\ln b$ et $\\ln\\!\\left(\\dfrac{a}{b}\\right)=\\ln a-\\ln b$ ; $\\ln(a^n)=n\\ln a$ et $\\ln(\\sqrt{a})=\\dfrac{1}{2}\\ln a$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLES',
        lines: [
          '$\\ln 12=\\ln(4\\times 3)=\\ln 4+\\ln 3=2\\ln 2+\\ln 3$.',
          '$\\ln\\dfrac{e^3}{5}=3-\\ln 5$.',
        ],
      },
      {
        type: 'piege',
        text: '$\\ln(a+b)\\neq\\ln a+\\ln b$ et $(\\ln a)^2\\neq\\ln(a^2)=2\\ln a$. Le logarithme n\'ouvre que les **produits, quotients et puissances**, jamais les sommes.',
      },
      { type: 'lien_ex', text: '→ Exercices 4 à 6 : équations, inéquations, transformation' },
    ],
  },
  {
    id: 'etude',
    num: '3',
    title: 'Étude de la fonction ln',
    blocks: [
      {
        type: 'para',
        text: 'On dérive $\\ln$, on établit ses limites, puis les croissances comparées qui complètent la hiérarchie $\\ln x\\ll x^n\\ll e^x$.',
      },
      {
        type: 'propriete',
        text: '**Dérivée** — $\\ln$ est dérivable (donc continue) sur $]0,+\\infty[$, et $\\ln\'(x)=\\dfrac{1}{x}$. Plus généralement, si $u$ est dérivable et strictement positive sur $I$ : $(\\ln u)\'=\\dfrac{u\'}{u}$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: ['Pour $f(x)=\\ln(x^2+1)$ : $u=x^2+1>0$, $u\'=2x$, donc $f\'(x)=\\dfrac{2x}{x^2+1}$.'],
      },
      {
        type: 'idee_cle',
        text: '**Tableau de variations** — Comme $\\ln\'(x)=\\dfrac{1}{x}>0$ sur $]0,+\\infty[$, $\\ln$ est strictement **croissante**, de $-\\infty$ (en $0^+$) à $+\\infty$, en passant par $\\ln 1=0$. Elle est **concave** ($\\ln\'\'(x)=-\\dfrac{1}{x^2}<0$). L\'axe des ordonnées ($x=0$) est asymptote verticale.',
      },
      {
        type: 'propriete',
        text: '**Croissances comparées** — En $+\\infty$, $\\ln$ est négligeable devant les puissances de $x$ : pour tout $n\\in\\mathbb{N}^*$, $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x^n}=0$. En $0^+$ : $\\displaystyle\\lim_{x\\to 0^+}x^n\\ln x=0$ (en particulier $x\\ln x\\to 0$).',
      },
      {
        type: 'idee_cle',
        text: '**La hiérarchie complète** en $+\\infty$ : $\\ln x\\ll x^\\alpha\\ll e^x$ ($\\alpha>0$). Le logarithme est le plus lent, l\'exponentielle le plus rapide. C\'est ce classement qui lève la plupart des formes indéterminées.',
      },
      { type: 'lien_ex', text: '→ Exercices 7 à 12 : limites, croissances comparées, dérivées' },
    ],
  },
  {
    id: 'equations',
    num: '4',
    title: 'Équations & inéquations',
    blocks: [
      {
        type: 'para',
        text: '$\\ln$ et $\\exp$ sont réciproques et strictement croissantes : c\'est ce qui permet de résoudre équations et inéquations, à condition de bien fixer les **domaines** au départ.',
      },
      {
        type: 'propriete',
        text: '**Résolutions de référence** : $\\ln x=a\\Longleftrightarrow x=e^a$ ($x>0$) ; $e^x=b\\Longleftrightarrow x=\\ln b$ ($b>0$) ; $\\ln A=\\ln B\\Longleftrightarrow A=B$ ($A,B>0$). Par stricte croissance : $\\ln A<\\ln B\\Longleftrightarrow A<B$ et $e^A<e^B\\Longleftrightarrow A<B$.',
      },
      {
        type: 'methode',
        title: 'RÉSOUDRE UNE ÉQUATION / INÉQUATION AVEC ln',
        steps: [
          '**Domaine.** Écrire les conditions d\'existence : tout argument d\'un $\\ln$ doit être $>0$.',
          '**Transformer.** Regrouper avec les propriétés algébriques pour obtenir $\\ln A=\\ln B$ (ou passer à l\'exponentielle).',
          '**Résoudre.** Utiliser $\\ln A=\\ln B\\Longleftrightarrow A=B$, puis résoudre l\'équation obtenue.',
          '**Vérifier.** Ne garder que les solutions compatibles avec le domaine de départ.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Résoudre $\\ln(3x-6)=\\ln(12+x)$.',
          '**Domaine :** $3x-6>0$ et $12+x>0$, soit $x>2$.',
          'L\'équation donne $3x-6=12+x \\Longleftrightarrow 2x=18 \\Longleftrightarrow x=9$. Comme $9>2$, la solution est $x=9$.',
        ],
      },
      {
        type: 'reflex',
        text: '**Logarithme décimal.** $\\log x=\\dfrac{\\ln x}{\\ln 10}$ (hors programme, mais utile en sciences : pH, décibels, échelle de Richter).',
      },
      { type: 'lien_ex', text: '→ Exercices 13 à 17 : études complètes de fonctions type bac' },
    ],
  },
];

// ── Contenu Probabilités & loi binomiale ──────────────────────────────────────
const PROBABILITES_OBJECTIFS = [
  'Calculer une **probabilité conditionnelle** $\\mathbb{P}_B(A)$ et exploiter un **arbre pondéré**.',
  'Appliquer la formule des **probabilités totales** et inverser un conditionnement (idée de Bayes).',
  'Reconnaître l\'**indépendance** de deux événements et la distinguer de l\'incompatibilité.',
  'Déterminer la **loi d\'une variable aléatoire**, son espérance, sa variance et son écart-type.',
  'Reconnaître un **schéma de Bernoulli** et mener les calculs de la **loi binomiale** $\\mathcal{B}(n,p)$.',
  'Majorer un écart par **Bienaymé-Tchebychev** et dimensionner un échantillon (loi des grands nombres).',
];

const PROBABILITES_FICHE_DATA = [
  {
    title: '1  Conditionnelles & Arbres',
    rows: [
      {
        label: 'Proba conditionnelle',
        tex: '\\mathbb{P}_B(A)=\\dfrac{\\mathbb{P}(A\\cap B)}{\\mathbb{P}(B)} \\quad (\\mathbb{P}(B)\\neq 0)',
        vars: 'Intersection : $\\mathbb{P}(A\\cap B)=\\mathbb{P}(B)\\,\\mathbb{P}_B(A)=\\mathbb{P}(A)\\,\\mathbb{P}_A(B)$ · Attention : $\\mathbb{P}_B(A)\\neq\\mathbb{P}_A(B)$',
      },
      {
        label: 'Arbre pondéré',
        tex: '\\text{nœud : somme}=1\\;;\\;\\text{chemin : produit}',
        vars: 'Feuille finale = somme des chemins qui y mènent · Les secondes branches portent des probabilités conditionnelles',
      },
      {
        label: 'Probas totales',
        tex: '\\mathbb{P}(B)=\\mathbb{P}(A)\\mathbb{P}_A(B)+\\mathbb{P}(\\bar{A})\\mathbb{P}_{\\bar{A}}(B)',
        vars: 'Partition $\\{A,\\bar{A}\\}$ (cas le plus fréquent) · Généralise à toute partition $A_1,\\dots,A_n$ de $\\Omega$',
      },
      {
        label: 'Inversion (Bayes)',
        tex: '\\mathbb{P}_B(A)=\\dfrac{\\mathbb{P}(A)\\,\\mathbb{P}_A(B)}{\\mathbb{P}(B)}',
        vars: '$\\mathbb{P}(B)$ se calcule par les probabilités totales · Sert à « remonter » l\'arbre (ex. dépistage)',
      },
    ],
  },
  {
    title: '2  Indépendance',
    rows: [
      {
        label: 'Définition',
        tex: 'A,B\\text{ indép.}\\iff\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\mathbb{P}(B)',
        vars: 'Équivalent (si $\\mathbb{P}(B)\\neq 0$) : $\\mathbb{P}_B(A)=\\mathbb{P}(A)$ · Se propage aux complémentaires $\\bar{A}$, $\\bar{B}$',
      },
      {
        label: 'Piège',
        tex: '\\text{indépendant}\\neq\\text{incompatible}',
        vars: 'Incompatibles ($A\\cap B=\\varnothing$) de probas non nulles : jamais indépendants — ils s\'excluent, ils ne s\'ignorent pas',
      },
    ],
  },
  {
    title: '3  Variables aléatoires & Linéarité',
    rows: [
      {
        label: 'Espérance · Variance',
        tex: '\\mathbb{E}(X)=\\sum_i x_i\\mathbb{P}(X=x_i)\\;;\\;\\mathrm{V}(X)=\\mathbb{E}(X^2)-\\mathbb{E}(X)^2',
        vars: '$\\sigma(X)=\\sqrt{\\mathrm{V}(X)}$ · König-Huygens, valable pour toute variable aléatoire',
      },
      {
        label: 'Transformation affine',
        tex: '\\mathbb{E}(aX+b)=a\\mathbb{E}(X)+b\\;;\\;\\mathrm{V}(aX+b)=a^2\\mathrm{V}(X)',
        vars: '$\\sigma(aX+b)=|a|\\sigma(X)$ · Le décalage $b$ ne change pas l\'étalement',
      },
      {
        label: 'Somme',
        tex: '\\mathbb{E}(X+Y)=\\mathbb{E}(X)+\\mathbb{E}(Y)\\;\\text{(toujours)}',
        vars: '$\\mathrm{V}(X+Y)=\\mathrm{V}(X)+\\mathrm{V}(Y)$ **seulement si** $X,Y$ indépendantes',
      },
    ],
  },
  {
    title: '4  Bernoulli & Binomiale',
    rows: [
      {
        label: 'Loi de Bernoulli',
        tex: '\\mathcal{B}(p):\\;\\mathbb{E}(X)=p\\;;\\;\\mathrm{V}(X)=p(1-p)',
        vars: '2 issues : succès ($p$) / échec ($1-p$) · $X$ vaut $1$ ou $0$',
      },
      {
        label: 'Loi binomiale',
        tex: '\\mathbb{P}(X=k)=\\dbinom{n}{k}p^k(1-p)^{n-k}',
        vars: '$n$ épreuves identiques **indépendantes** · $\\mathbb{E}=np$, $\\mathrm{V}=np(1-p)$, $\\sigma=\\sqrt{np(1-p)}$',
      },
      {
        label: 'Coefficient binomial',
        tex: '\\dbinom{n}{k}=\\dbinom{n}{n-k}\\;;\\;\\dbinom{n}{k}+\\dbinom{n}{k+1}=\\dbinom{n+1}{k+1}',
        vars: 'Nombre de chemins à $k$ succès parmi $n$ · Triangle de Pascal ou calculatrice',
      },
      {
        label: 'Calculatrice',
        tex: '\\mathbb{P}(X\\geq k)=1-\\mathbb{P}(X\\leq k-1)',
        vars: '$\\mathbb{P}(X=k)$ : binomFdp$(n,p,k)$ · $\\mathbb{P}(X\\leq k)$ : binomFRép$(n,p,k)$',
      },
    ],
  },
  {
    title: '5  Échantillon & Grands nombres',
    rows: [
      {
        label: 'Échantillon',
        tex: 'M_n=\\dfrac{S_n}{n}:\\;\\mathbb{E}=\\mu\\;;\\;\\mathrm{V}=\\dfrac{v}{n}\\;;\\;\\sigma=\\dfrac{\\sigma(X)}{\\sqrt{n}}',
        vars: '$X_1,\\dots,X_n$ indépendantes de même loi ($\\mu$, $v$) · $S_n$ : $\\mathbb{E}=n\\mu$, $\\mathrm{V}=nv$',
      },
      {
        label: 'Bienaymé-Tchebychev',
        tex: '\\mathbb{P}\\bigl(|X-\\mu|\\geq\\delta\\bigr)\\leq\\dfrac{v}{\\delta^2}',
        vars: 'Concentration : $\\mathbb{P}\\bigl(|M_n-\\mu|\\geq\\delta\\bigr)\\leq\\dfrac{v}{n\\delta^2}$ · Borne toujours valable, jamais fine',
      },
      {
        label: 'Loi des grands nombres',
        tex: '\\lim_{n\\to+\\infty}\\mathbb{P}\\bigl(|M_n-\\mu|\\geq\\delta\\bigr)=0',
        vars: 'Dimensionner : $n\\geq\\dfrac{v}{\\alpha\\,\\delta^2}$ pour garantir un risque $\\leq\\alpha$',
      },
    ],
  },
];

const PROBABILITES_COURS: Section[] = [
  {
    id: 'conditionnelles',
    num: '1',
    title: 'Probabilités conditionnelles',
    blocks: [
      {
        type: 'para',
        text: 'On travaille sur un univers fini $\\Omega$ muni d\'une probabilité $\\mathbb{P}$. Conditionner, c\'est **réduire l\'univers** : on se place dans le monde où un événement s\'est déjà réalisé, et on recalcule les probabilités dans ce monde plus petit.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Probabilité conditionnelle',
        content: 'Soit $A$ et $B$ deux événements avec $\\mathbb{P}(B)\\neq 0$. La **probabilité de $A$ sachant $B$** est $\\mathbb{P}_B(A)=\\dfrac{\\mathbb{P}(A\\cap B)}{\\mathbb{P}(B)}$. On la note aussi $\\mathbb{P}(A\\mid B)$.',
      },
      {
        type: 'idee_cle',
        text: 'Savoir que $B$ est réalisé revient à « zoomer » sur $B$ : $B$ devient le nouvel univers, de masse $\\mathbb{P}(B)$. On mesure alors la part de $A$ qui vit à l\'intérieur de $B$, c\'est-à-dire $\\mathbb{P}(A\\cap B)$, et on la ramène à $1$ en divisant par $\\mathbb{P}(B)$.',
      },
      {
        type: 'propriete',
        text: '**Probabilité d\'une intersection** — Si $\\mathbb{P}(B)\\neq 0$, alors $\\mathbb{P}(A\\cap B)=\\mathbb{P}(B)\\times\\mathbb{P}_B(A)$. De même, si $\\mathbb{P}(A)\\neq 0$, $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\times\\mathbb{P}_A(B)$. C\'est la formule la plus utilisée du chapitre.',
      },
      { type: 'subsection', num: '1.1', title: 'Arbre pondéré' },
      {
        type: 'para',
        text: 'Un arbre pondéré traduit visuellement les probabilités conditionnelles. Chaque nœud se sépare en branches dont les probabilités **somment à 1**. La probabilité d\'un chemin est le **produit** des probabilités rencontrées le long du chemin.',
      },
      {
        type: 'figure',
        caption: 'Arbre pondéré à deux niveaux — les probabilités portées par les secondes branches sont des probabilités conditionnelles.',
        src: '/modules/maths-probabilites/fig-arbre.png',
      },
      {
        type: 'methode',
        title: 'LIRE UN ARBRE',
        steps: [
          '**Somme des branches** issues d\'un même nœud $=1$ (permet de retrouver une probabilité manquante).',
          '**Probabilité d\'un chemin** $=$ produit des probabilités du chemin, ex. $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\times\\mathbb{P}_A(B)$.',
          '**Probabilité d\'une feuille « finale »** (ex. l\'événement $B$) $=$ somme des probabilités des chemins qui y mènent.',
        ],
      },
      {
        type: 'piege',
        text: 'Ne pas confondre $\\mathbb{P}_B(A)$ et $\\mathbb{P}_A(B)$ : ce ne sont pas les mêmes ! Et $\\mathbb{P}(A\\cap B)$ n\'est **pas** une probabilité conditionnelle : c\'est la masse de l\'intersection dans l\'univers entier.',
      },
      { type: 'lien_ex', text: '→ Exercices 1 et 2 : conditionnelles, arbre pondéré' },
    ],
  },
  {
    id: 'probas-totales',
    num: '2',
    title: 'Formule des probabilités totales',
    blocks: [
      {
        type: 'para',
        text: 'Souvent on connaît une probabilité « par morceaux » (selon plusieurs cas de figure) et on veut la recoller pour obtenir la probabilité globale.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Partition',
        content: 'Des événements $A_1,\\dots,A_n$ forment une **partition de l\'univers** lorsqu\'ils sont deux à deux incompatibles, de probabilités non nulles, et que $A_1\\cup\\dots\\cup A_n=\\Omega$. Le cas le plus fréquent est la partition $\\{A,\\bar{A}\\}$.',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Probabilités totales',
        content: 'Si $A_1,\\dots,A_n$ forme une partition de $\\Omega$, alors pour tout événement $B$ : $\\mathbb{P}(B)=\\displaystyle\\sum_{i=1}^{n}\\mathbb{P}(A_i\\cap B)=\\sum_{i=1}^{n}\\mathbb{P}(A_i)\\,\\mathbb{P}_{A_i}(B)$. En particulier, avec la partition $\\{A,\\bar{A}\\}$ :',
        formulas: ['\\mathbb{P}(B)=\\mathbb{P}(A)\\mathbb{P}_A(B)+\\mathbb{P}(\\bar{A})\\mathbb{P}_{\\bar{A}}(B)'],
      },
      {
        type: 'idee_cle',
        text: 'On découpe $B$ selon les « régions » de la partition, on calcule la part de $B$ dans chaque région, puis on additionne. Sur l\'arbre : la probabilité de $B$ est la **somme des chemins** qui aboutissent à $B$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — Dépistage',
        lines: [
          'Une maladie touche $2\\%$ d\'une population. Un test détecte la maladie chez $95\\%$ des malades ($\\mathbb{P}_M(T)=0{,}95$) mais donne aussi $4\\%$ de faux positifs ($\\mathbb{P}_{\\bar{M}}(T)=0{,}04$).',
          'Alors $\\mathbb{P}(T)=0{,}02\\times 0{,}95+0{,}98\\times 0{,}04=0{,}0582$. Un test positif tombe donc dans environ $5{,}8\\%$ des cas.',
        ],
      },
      { type: 'subsection', num: '2.1', title: 'Probabilités « inversées »' },
      {
        type: 'propriete',
        text: '**Inversion du conditionnement** — $\\mathbb{P}_B(A)=\\dfrac{\\mathbb{P}(A)\\,\\mathbb{P}_A(B)}{\\mathbb{P}(B)}$, où $\\mathbb{P}(B)$ se calcule par les probabilités totales. C\'est la **formule de Bayes** (hors programme comme formule, mais l\'idée est exigible).',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — Suite du dépistage',
        lines: [
          'Sachant que le test est positif, la probabilité d\'être réellement malade vaut $\\mathbb{P}_T(M)=\\dfrac{\\mathbb{P}(M)\\mathbb{P}_M(T)}{\\mathbb{P}(T)}=\\dfrac{0{,}02\\times 0{,}95}{0{,}0582}\\approx 0{,}33$.',
        ],
      },
      {
        type: 'piege',
        text: 'Le test est « fiable à 95 % », pourtant un positif n\'est réellement malade qu\'à $33\\%$ ! La raison : la maladie est rare, donc les faux positifs (nombreux car ils portent sur les $98\\%$ de bien-portants) écrasent les vrais positifs. C\'est l\'effet de la **fréquence de base**.',
      },
      { type: 'lien_ex', text: '→ Exercices 6 et 13 : probabilités totales, dépistage & Bayes' },
    ],
  },
  {
    id: 'independance',
    num: '3',
    title: 'Indépendance',
    blocks: [
      {
        type: 'para',
        text: 'Deux événements sont indépendants lorsque la réalisation de l\'un ne change pas la probabilité de l\'autre.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Événements indépendants',
        content: '$A$ et $B$ sont **indépendants** lorsque $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\times\\mathbb{P}(B)$. De façon équivalente (si $\\mathbb{P}(B)\\neq 0$) : $\\mathbb{P}_B(A)=\\mathbb{P}(A)$.',
      },
      {
        type: 'piege',
        text: '**Indépendant ≠ incompatible.** Deux événements incompatibles ($A\\cap B=\\varnothing$) de probabilités non nulles ne sont *jamais* indépendants : si $A$ est réalisé, $B$ est impossible, donc $A$ informe fortement sur $B$. Incompatible = ils s\'excluent ; indépendant = ils s\'ignorent.',
      },
      {
        type: 'propriete',
        text: 'Si $A$ et $B$ sont indépendants, alors $A$ et $\\bar{B}$ le sont aussi, ainsi que $\\bar{A}$ et $B$, et $\\bar{A}$ et $\\bar{B}$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'On lance deux dés équilibrés. « Le premier dé donne 6 » et « le second dé donne un nombre pair » sont indépendants : $\\mathbb{P}(A\\cap B)=\\dfrac{1}{6}\\times\\dfrac{1}{2}=\\dfrac{1}{12}=\\mathbb{P}(A)\\mathbb{P}(B)$.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 3 et 7 : indépendance par le calcul, propagation au complémentaire' },
    ],
  },
  {
    id: 'variables-aleatoires',
    num: '4',
    title: 'Variables aléatoires',
    blocks: [
      {
        type: 'para',
        text: 'Une variable aléatoire associe un nombre à chaque issue d\'une expérience. Elle permet de calculer une valeur « moyenne » (l\'**espérance**) et de mesurer la dispersion (**variance**, **écart-type**).',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Loi de probabilité',
        content: 'Une **variable aléatoire** $X$ sur $\\Omega$ prend les valeurs $x_1,\\dots,x_n$. Sa **loi** est la donnée des $\\mathbb{P}(X=x_i)$, avec $\\sum_i\\mathbb{P}(X=x_i)=1$.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Espérance, variance, écart-type',
        content: 'L\'espérance est la valeur moyenne attendue ; l\'écart-type mesure l\'étalement autour de cette moyenne.',
        formulas: [
          '\\mathbb{E}(X)=\\sum_i x_i\\,\\mathbb{P}(X=x_i)\\qquad;\\qquad\\mathrm{V}(X)=\\mathbb{E}(X^2)-\\mathbb{E}(X)^2\\qquad;\\qquad\\sigma(X)=\\sqrt{\\mathrm{V}(X)}',
        ],
      },
      {
        type: 'propriete',
        text: '**Linéarité et transformation** — Pour tous réels $a,b$ : $\\mathbb{E}(aX+b)=a\\,\\mathbb{E}(X)+b$, $\\mathrm{V}(aX+b)=a^2\\,\\mathrm{V}(X)$, $\\sigma(aX+b)=|a|\\,\\sigma(X)$.',
      },
      {
        type: 'idee_cle',
        text: 'Ajouter $b$ décale toute la distribution : la moyenne bouge, mais l\'étalement non — d\'où $\\mathrm{V}(aX+b)=a^2\\mathrm{V}(X)$, sans $b$. Le facteur $a^2$ vient de ce que la variance est un carré : dilater les valeurs par $a$ dilate les écarts par $a$, donc leurs carrés par $a^2$.',
      },
      {
        type: 'propriete',
        text: '**Linéarité de l\'espérance** — Pour deux variables aléatoires $X$ et $Y$ sur le même univers : $\\mathbb{E}(X+Y)=\\mathbb{E}(X)+\\mathbb{E}(Y)$. Cette égalité est **toujours vraie**, que $X$ et $Y$ soient indépendantes ou non.',
      },
      {
        type: 'propriete',
        text: '**Variance d\'une somme (cas indépendant)** — Si $X$ et $Y$ sont **indépendantes**, alors $\\mathrm{V}(X+Y)=\\mathrm{V}(X)+\\mathrm{V}(Y)$.',
      },
      {
        type: 'piege',
        text: 'La variance ne s\'additionne *que* pour des variables indépendantes. L\'espérance, elle, s\'additionne toujours. Ne jamais écrire $\\mathrm{V}(X+Y)=\\mathrm{V}(X)+\\mathrm{V}(Y)$ sans avoir justifié l\'indépendance.',
      },
      { type: 'lien_ex', text: '→ Exercices 4, 8, 9 et 14 : lois, espérance, linéarité, somme de variables' },
    ],
  },
  {
    id: 'binomiale',
    num: '5',
    title: 'Épreuves de Bernoulli & loi binomiale',
    blocks: [
      {
        type: 'definition',
        badge: 'DÉFINITION — Épreuve et loi de Bernoulli',
        content: 'Une **épreuve de Bernoulli** de paramètre $p$ a deux issues : succès (probabilité $p$) et échec (probabilité $1-p$). La variable $X$ valant $1$ en cas de succès et $0$ sinon suit la **loi de Bernoulli** $\\mathcal{B}(p)$, avec $\\mathbb{E}(X)=p$ et $\\mathrm{V}(X)=p(1-p)$.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Schéma de Bernoulli & loi binomiale',
        content: 'Un **schéma de Bernoulli** est la répétition de $n$ épreuves de Bernoulli identiques et **indépendantes**. La variable $X$ comptant le nombre de succès suit la **loi binomiale** $\\mathcal{B}(n,p)$.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Coefficient binomial',
        content: '$\\dbinom{n}{k}$ est le nombre de chemins réalisant exactement $k$ succès parmi $n$ épreuves. On lit sa valeur sur le triangle de Pascal ou à la calculatrice. Propriétés :',
        formulas: [
          '\\dbinom{n}{0}=\\dbinom{n}{n}=1\\qquad;\\qquad\\dbinom{n}{k}=\\dbinom{n}{n-k}\\qquad;\\qquad\\dbinom{n}{k}+\\dbinom{n}{k+1}=\\dbinom{n+1}{k+1}',
        ],
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Loi binomiale',
        content: 'Si $X\\sim\\mathcal{B}(n,p)$, alors pour tout $k\\in\\{0,1,\\dots,n\\}$ :',
        formulas: [
          '\\mathbb{P}(X=k)=\\dbinom{n}{k}p^k(1-p)^{n-k}\\qquad;\\qquad\\mathbb{E}(X)=np\\quad;\\quad\\mathrm{V}(X)=np(1-p)\\quad;\\quad\\sigma(X)=\\sqrt{np(1-p)}',
        ],
      },
      {
        type: 'idee_cle',
        text: 'Un chemin précis à $k$ succès a pour probabilité $p^k(1-p)^{n-k}$ (produit des branches, épreuves indépendantes). Il existe $\\binom{n}{k}$ tels chemins, tous de même probabilité : on multiplie donc par $\\binom{n}{k}$.',
      },
      {
        type: 'figure',
        caption: 'Loi binomiale $\\mathcal{B}(10\\,;0{,}4)$ : $\\mathbb{E}(X)=4$, $\\mathrm{V}(X)=2{,}4$. Le mode est proche de l\'espérance.',
        src: '/modules/maths-probabilites/fig-binomiale.png',
      },
      {
        type: 'methode',
        title: 'CALCULS À LA CALCULATRICE',
        steps: [
          '$\\mathbb{P}(X=k)$ : binomFdp (ou binompdf)$(n,p,k)$.',
          '$\\mathbb{P}(X\\leq k)$ : binomFRép (ou binomcdf)$(n,p,k)$.',
          '$\\mathbb{P}(X\\geq k)=1-\\mathbb{P}(X\\leq k-1)$ ; $\\mathbb{P}(a\\leq X\\leq b)=\\mathbb{P}(X\\leq b)-\\mathbb{P}(X\\leq a-1)$.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — QCM',
        lines: [
          '$10$ questions, $4$ choix, réponses au hasard : $X\\sim\\mathcal{B}(10\\,;0{,}25)$.',
          'Probabilité d\'avoir au moins $8$ bonnes réponses avec $p=0{,}4$ : $\\mathbb{P}(X\\geq 8)=1-\\mathbb{P}(X\\leq 7)\\approx 0{,}012$.',
        ],
      },
      {
        type: 'piege',
        text: '**Conditions à vérifier avant d\'écrire « $X\\sim\\mathcal{B}(n,p)$ »** — Il faut : (1) un nombre **fixé** $n$ d\'épreuves, (2) **deux** issues seulement, (3) épreuves **identiques** (même $p$), (4) épreuves **indépendantes**. Le tirage *sans remise* casse l\'indépendance et n\'est donc pas binomial.',
      },
      { type: 'lien_ex', text: '→ Exercices 5, 10 et 15 : calculs binomiaux, au moins un, seuil de lancers' },
    ],
  },
  {
    id: 'echantillon',
    num: '6',
    title: 'Somme de variables & échantillon',
    blocks: [
      {
        type: 'para',
        text: 'Nouveauté de Terminale : on étudie ce qui se passe quand on **répète** et qu\'on **moyenne** une même expérience.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Échantillon',
        content: 'Un **échantillon de taille $n$** de la loi de $X$ est une liste $(X_1,\\dots,X_n)$ de variables **indépendantes et de même loi** que $X$. On pose :',
        formulas: ['S_n=X_1+\\dots+X_n\\quad\\text{(somme)}\\qquad;\\qquad M_n=\\dfrac{S_n}{n}\\quad\\text{(moyenne empirique)}'],
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Espérance et variance de Sₙ et Mₙ',
        content: 'Si les $X_i$ sont indépendants de même loi que $X$, avec $\\mathbb{E}(X)=\\mu$ et $\\mathrm{V}(X)=v$ :',
        formulas: [
          '\\mathbb{E}(S_n)=n\\mu\\quad;\\quad\\mathrm{V}(S_n)=nv\\qquad;\\qquad\\mathbb{E}(M_n)=\\mu\\quad;\\quad\\mathrm{V}(M_n)=\\dfrac{v}{n}\\quad;\\quad\\sigma(M_n)=\\dfrac{\\sigma(X)}{\\sqrt{n}}',
        ],
      },
      {
        type: 'idee_cle',
        text: 'La moyenne $M_n$ est centrée sur la « vraie » valeur $\\mu$ (son espérance vaut $\\mu$), et sa dispersion **diminue** quand $n$ grandit : $\\mathrm{V}(M_n)=v/n\\to 0$. Autrement dit, plus on prend d\'observations, plus la moyenne est stable et proche de $\\mu$. C\'est la base de tout sondage.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — Lien avec la binomiale',
        lines: [
          'Si chaque $X_i\\sim\\mathcal{B}(p)$ (Bernoulli), alors $S_n=X_1+\\dots+X_n\\sim\\mathcal{B}(n,p)$.',
          'On retrouve $\\mathbb{E}(S_n)=np$ et $\\mathrm{V}(S_n)=np(1-p)$ : la loi binomiale est une somme de Bernoulli indépendantes.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercice 11 : moyenne empirique d\'un échantillon' },
    ],
  },
  {
    id: 'concentration',
    num: '7',
    title: 'Concentration & loi des grands nombres',
    blocks: [
      {
        type: 'para',
        text: 'On formalise l\'idée que la moyenne empirique se concentre autour de l\'espérance.',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Inégalité de Bienaymé-Tchebychev',
        content: 'Pour toute variable aléatoire $X$ d\'espérance $\\mu$ et de variance $v$, et pour tout réel $\\delta>0$ :',
        formulas: ['\\mathbb{P}\\bigl(|X-\\mu|\\geq\\delta\\bigr)\\leq\\dfrac{v}{\\delta^2}'],
      },
      {
        type: 'idee_cle',
        text: 'Cette inégalité borne la probabilité de s\'écarter « beaucoup » de la moyenne, uniquement à partir de la variance — sans connaître la loi. Plus la variance est petite ou plus $\\delta$ est grand, plus s\'éloigner est improbable. La borne est **volontairement grossière** : elle est toujours valable, jamais fine.',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Inégalité de concentration',
        content: 'Pour la moyenne empirique $M_n$ d\'un échantillon de $X$ (espérance $\\mu$, variance $v$), et tout $\\delta>0$ :',
        formulas: ['\\mathbb{P}\\bigl(|M_n-\\mu|\\geq\\delta\\bigr)\\leq\\dfrac{v}{n\\,\\delta^2}'],
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Loi des grands nombres',
        content: 'Quand $n\\to+\\infty$, la probabilité que $M_n$ s\'écarte de $\\mu$ de plus de $\\delta$ tend vers $0$ : $\\displaystyle\\lim_{n\\to+\\infty}\\mathbb{P}\\bigl(|M_n-\\mu|\\geq\\delta\\bigr)=0$. La moyenne empirique se rapproche de l\'espérance quand la taille de l\'échantillon augmente.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE — Combien d\'observations ?',
        lines: [
          'Soit $X\\sim\\mathcal{B}(100\\,;0{,}5)$, donc $\\mu=50$ et $v=25$. La probabilité de s\'écarter d\'au moins $15$ de la moyenne vérifie $\\mathbb{P}\\bigl(|X-50|\\geq 15\\bigr)\\leq\\dfrac{25}{15^2}=\\dfrac{25}{225}\\approx 0{,}11$.',
          'La vraie valeur ($\\approx 0{,}0035$) est bien plus petite : la borne est correcte mais large, ce qui est normal.',
        ],
      },
      {
        type: 'methode',
        title: 'DIMENSIONNER UN ÉCHANTILLON',
        steps: [
          'On veut $\\mathbb{P}(|M_n-\\mu|\\geq\\delta)\\leq\\alpha$.',
          'Il suffit que $\\dfrac{v}{n\\delta^2}\\leq\\alpha$, donc $n\\geq\\dfrac{v}{\\alpha\\,\\delta^2}$.',
          'On prend le plus petit entier $n$ satisfaisant cette inégalité.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 12 et 16 : Tchebychev, dimensionnement — puis sujets bac 17 à 20' },
    ],
  },
];

// ── Contenu Géométrie dans l'espace ───────────────────────────────────────────
const GEOMETRIE_OBJECTIFS = [
  'Manipuler **colinéarité** et **coplanarité** de vecteurs (alignement, base, repère).',
  'Calculer **normes, distances et milieux** avec les coordonnées en repère orthonormé.',
  'Écrire et exploiter la **représentation paramétrique** d\'une droite de l\'espace.',
  'Utiliser le **produit scalaire** : orthogonalité, angles, vecteur orthogonal à deux vecteurs.',
  'Déterminer l\'**équation cartésienne d\'un plan** à partir d\'un vecteur normal.',
  'Étudier les **positions relatives** et calculer la **distance d\'un point à un plan** (projeté orthogonal).',
];

const GEOMETRIE_FICHE_DATA = [
  {
    title: '1  Vecteurs — Colinéarité & Coplanarité',
    rows: [
      {
        label: 'Colinéarité',
        tex: '\\vec{u},\\vec{v}\\text{ colinéaires}\\iff\\vec{v}=k\\vec{u}',
        vars: 'Points alignés : $\\vec{AB}$ et $\\vec{AC}$ colinéaires · $k$ réel, $\\vec{u}\\neq\\vec{0}$',
      },
      {
        label: 'Coplanarité',
        tex: '\\vec{w}=a\\vec{u}+b\\vec{v}',
        vars: '$\\vec{w}$ coplanaire à $\\vec{u},\\vec{v}$ non colinéaires · Résoudre le système sur les coordonnées',
      },
      {
        label: 'Base & repère',
        tex: '\\vec{i},\\vec{j},\\vec{k}\\text{ non coplanaires}\\Rightarrow\\text{base}',
        vars: 'Avec une origine $O$ : repère $(O\\,;\\vec{i},\\vec{j},\\vec{k})$ · Écriture unique $\\vec{u}=x\\vec{i}+y\\vec{j}+z\\vec{k}$',
      },
    ],
  },
  {
    title: '2  Coordonnées & Distances',
    rows: [
      {
        label: 'Vecteur & milieu',
        tex: '\\vec{AB}\\,(x_B-x_A\\,;\\,y_B-y_A\\,;\\,z_B-z_A)',
        vars: 'Milieu $I$ de $[AB]$ : moyennes des coordonnées $\\left(\\frac{x_A+x_B}{2},\\frac{y_A+y_B}{2},\\frac{z_A+z_B}{2}\\right)$',
      },
      {
        label: 'Norme & distance',
        tex: '\\|\\vec{u}\\|=\\sqrt{x^2+y^2+z^2}',
        vars: '$AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$ · **Uniquement en repère orthonormé**',
      },
    ],
  },
  {
    title: '3  Droites — Représentation paramétrique',
    rows: [
      {
        label: 'Paramétrique',
        tex: 'x=x_A+at\\;;\\;y=y_A+bt\\;;\\;z=z_A+ct\\quad(t\\in\\mathbb{R})',
        vars: 'Point $A(x_A,y_A,z_A)$, vecteur directeur $\\vec{u}(a,b,c)$ · Chaque $t$ donne un point unique',
      },
      {
        label: 'Appartenance',
        tex: '\\text{même }t\\text{ dans les trois équations}',
        vars: 'Trouver $t$ avec la 1ʳᵉ équation, vérifier qu\'il convient dans les deux autres',
      },
    ],
  },
  {
    title: '4  Produit scalaire',
    rows: [
      {
        label: 'Trois expressions',
        tex: '\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos(\\vec{u},\\vec{v})=xx\'+yy\'+zz\'',
        vars: 'Aussi $\\frac{1}{2}\\bigl(\\|\\vec{u}\\|^2+\\|\\vec{v}\\|^2-\\|\\vec{u}-\\vec{v}\\|^2\\bigr)$ · Analytique en repère orthonormé',
      },
      {
        label: 'Orthogonalité',
        tex: '\\vec{u}\\perp\\vec{v}\\iff\\vec{u}\\cdot\\vec{v}=0',
        vars: 'En coordonnées : $xx\'+yy\'+zz\'=0$',
      },
      {
        label: 'Angle',
        tex: '\\cos(\\vec{u},\\vec{v})=\\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}',
        vars: 'Calculer le produit scalaire analytique et les normes, puis en déduire l\'angle',
      },
    ],
  },
  {
    title: '5  Plans',
    rows: [
      {
        label: 'Vecteur normal',
        tex: 'M\\in(P)\\iff\\vec{AM}\\cdot\\vec{n}=0',
        vars: '$\\vec{n}\\perp(P)$ : orthogonal à tous les vecteurs de $(P)$ · Vérifier $\\vec{n}\\cdot\\vec{u}=0$ **et** $\\vec{n}\\cdot\\vec{v}=0$',
      },
      {
        label: 'Équation cartésienne',
        tex: 'ax+by+cz+d=0\\quad\\text{avec}\\quad\\vec{n}(a,b,c)',
        vars: '$d$ trouvé en injectant un point du plan · Les coefficients de $x,y,z$ donnent le vecteur normal',
      },
    ],
  },
  {
    title: '6  Positions relatives & Distances',
    rows: [
      {
        label: 'Droite & plan',
        tex: '\\vec{u}\\cdot\\vec{n}\\neq 0\\;:\\;\\text{sécants}\\;;\\;\\vec{u}\\cdot\\vec{n}=0\\;:\\;\\text{parallèles}',
        vars: 'Parallèle : incluse si un point de $\\mathcal{D}$ est dans $(P)$ · Intersection : substituer la paramétrique, résoudre en $t$',
      },
      {
        label: 'Deux plans',
        tex: '\\vec{n_1},\\vec{n_2}\\text{ colinéaires}\\;:\\;\\text{parallèles}',
        vars: 'Sinon : sécants selon une droite',
      },
      {
        label: 'Distance point → plan',
        tex: 'd(M,P)=\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}',
        vars: '$(P) : ax+by+cz+d=0$, $M(x_0,y_0,z_0)$ · Atteinte au projeté orthogonal $H$ : $d(M,P)=MH$',
      },
    ],
  },
];

const GEOMETRIE_COURS: Section[] = [
  {
    id: 'vecteurs',
    num: '1',
    title: 'Vecteurs de l\'espace',
    blocks: [
      {
        type: 'para',
        text: 'Les vecteurs de l\'espace se manipulent comme dans le plan : addition, multiplication par un réel, relation de Chasles. La nouveauté est la notion de **coplanarité**.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Colinéarité',
        content: 'Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont **colinéaires** lorsqu\'il existe un réel $k$ tel que $\\vec{v}=k\\,\\vec{u}$ (avec $\\vec{u}\\neq\\vec{0}$). Trois points $A$, $B$, $C$ sont alignés si et seulement si $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Vecteurs coplanaires',
        content: 'Trois vecteurs $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ sont **coplanaires** lorsqu\'ils admettent des représentants dans un même plan. De façon équivalente, $\\vec{w}$ est coplanaire à $\\vec{u},\\vec{v}$ (non colinéaires) s\'il existe des réels $a,b$ tels que $\\vec{w}=a\\,\\vec{u}+b\\,\\vec{v}$.',
      },
      {
        type: 'idee_cle',
        text: 'Deux vecteurs non colinéaires « engendrent » un plan. Un troisième vecteur est coplanaire s\'il reste dans ce plan, c\'est-à-dire s\'il s\'écrit comme combinaison des deux premiers. S\'il en « sort », les trois vecteurs forment une **base** de l\'espace.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Base et repère',
        content: 'Trois vecteurs $\\vec{i},\\vec{j},\\vec{k}$ non coplanaires forment une **base** de l\'espace. Associés à un point origine $O$, ils forment un **repère** $(O\\,;\\vec{i},\\vec{j},\\vec{k})$. Tout vecteur $\\vec{u}$ s\'écrit alors de manière unique $\\vec{u}=x\\vec{i}+y\\vec{j}+z\\vec{k}$, et $(x,y,z)$ sont ses **coordonnées**.',
      },
      {
        type: 'methode',
        title: 'MONTRER QUE TROIS POINTS/VECTEURS SONT COPLANAIRES',
        steps: [
          'Chercher deux réels $a,b$ tels que $\\vec{w}=a\\vec{u}+b\\vec{v}$ (résoudre le système sur les coordonnées).',
          'Si le système a une solution : coplanaires. Sinon : non coplanaires.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 1, 7 et 8 : colinéarité, coplanarité, alignement' },
    ],
  },
  {
    id: 'coordonnees',
    num: '2',
    title: 'Repère & coordonnées',
    blocks: [
      {
        type: 'para',
        text: 'On se place désormais dans un repère **orthonormé** $(O\\,;\\vec{i},\\vec{j},\\vec{k})$ : les trois vecteurs de base sont deux à deux orthogonaux et de norme 1.',
      },
      {
        type: 'figure',
        caption: 'Un point $M$ et ses coordonnées $(2\\,;3\\,;2)$ dans le repère orthonormé.',
        src: '/modules/maths-geometrie/fig-repere.png',
      },
      {
        type: 'propriete',
        text: '**Calculs avec coordonnées** — Pour $A(x_A,y_A,z_A)$ et $B(x_B,y_B,z_B)$ : $\\vec{AB}\\,(x_B-x_A\\,;\\,y_B-y_A\\,;\\,z_B-z_A)$, et le milieu de $[AB]$ est $I\\left(\\frac{x_A+x_B}{2},\\frac{y_A+y_B}{2},\\frac{z_A+z_B}{2}\\right)$.',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Norme et distance (repère orthonormé)',
        content: 'La norme du vecteur $\\vec{u}(x,y,z)$ est :',
        formulas: ['\\|\\vec{u}\\|=\\sqrt{x^2+y^2+z^2}\\qquad;\\qquad AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}'],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Pour $\\vec{u}(2,-1,2)$ : $\\|\\vec{u}\\|=\\sqrt{4+1+4}=\\sqrt{9}=3$.',
        ],
      },
      {
        type: 'piege',
        text: 'Les formules de norme, distance et produit scalaire par coordonnées **ne sont valables que dans un repère orthonormé**. Toujours vérifier cette hypothèse avant de les appliquer.',
      },
      { type: 'lien_ex', text: '→ Exercices 2, 3 et 9 : distance, milieu, nature d\'un triangle' },
    ],
  },
  {
    id: 'droites',
    num: '3',
    title: 'Représentation paramétrique d\'une droite',
    blocks: [
      {
        type: 'definition',
        badge: 'DÉFINITION — Droite par un point et un vecteur directeur',
        content: 'La droite $\\mathcal{D}$ passant par $A(x_A,y_A,z_A)$ et de **vecteur directeur** $\\vec{u}(a,b,c)$ est l\'ensemble des points $M$ tels que $\\vec{AM}=t\\,\\vec{u}$, $t\\in\\mathbb{R}$. Une **représentation paramétrique** de $\\mathcal{D}$ est :',
        formulas: ['\\begin{cases}x=x_A+at\\\\y=y_A+bt\\\\z=z_A+ct\\end{cases}\\quad t\\in\\mathbb{R}'],
      },
      {
        type: 'idee_cle',
        text: 'Le paramètre $t$ est une « horloge » : à $t=0$ on est en $A$, et quand $t$ varie, le point $M$ parcourt toute la droite dans la direction de $\\vec{u}$. Chaque valeur de $t$ donne un point, et un seul.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Droite passant par $A(1,2,3)$ de vecteur directeur $\\vec{u}(1,-1,2)$ : $x=1+t$, $y=2-t$, $z=3+2t$ ($t\\in\\mathbb{R}$).',
        ],
      },
      {
        type: 'methode',
        title: 'UN POINT APPARTIENT-IL À LA DROITE ?',
        steps: [
          'Écrire les trois équations avec les coordonnées du point.',
          'Trouver $t$ à partir de la première équation.',
          'Vérifier que **ce même** $t$ convient dans les deux autres. Si oui, le point est sur la droite.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 4 et 10 : représentation paramétrique, appartenance' },
    ],
  },
  {
    id: 'produit-scalaire',
    num: '4',
    title: 'Produit scalaire dans l\'espace',
    blocks: [
      {
        type: 'para',
        text: 'Le produit scalaire garde toutes ses propriétés du plan (symétrie, bilinéarité) et se calcule de trois façons.',
      },
      {
        type: 'definition',
        badge: 'DÉFINITION — Trois expressions',
        content: 'Pour $\\vec{u}$ et $\\vec{v}$ : $\\vec{u}\\cdot\\vec{v}=\\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos(\\vec{u},\\vec{v})$ (géométrique), $\\vec{u}\\cdot\\vec{v}=\\frac{1}{2}\\bigl(\\|\\vec{u}\\|^2+\\|\\vec{v}\\|^2-\\|\\vec{u}-\\vec{v}\\|^2\\bigr)$ (avec les normes), et en repère **orthonormé**, avec $\\vec{u}(x,y,z)$ et $\\vec{v}(x\',y\',z\')$ :',
        formulas: ['\\vec{u}\\cdot\\vec{v}=xx\'+yy\'+zz\'\\quad\\text{(analytique)}'],
      },
      {
        type: 'propriete',
        text: '**Orthogonalité** — $\\vec{u}$ et $\\vec{v}$ sont **orthogonaux** si et seulement si $\\vec{u}\\cdot\\vec{v}=0$. En coordonnées : $xx\'+yy\'+zz\'=0$.',
      },
      {
        type: 'exemple',
        title: 'EXEMPLES',
        lines: [
          '$\\vec{u}(1,2,-1)\\cdot\\vec{v}(3,0,1)=3+0-1=2$.',
          '$\\vec{u}(1,2,-1)\\cdot\\vec{w}(2,-1,0)=2-2+0=0$ : $\\vec{u}$ et $\\vec{w}$ sont orthogonaux.',
        ],
      },
      {
        type: 'methode',
        title: 'CALCULER UN ANGLE',
        steps: [
          'Calculer $\\vec{u}\\cdot\\vec{v}$ (analytique) et les normes $\\|\\vec{u}\\|$, $\\|\\vec{v}\\|$.',
          'En déduire $\\cos(\\vec{u},\\vec{v})=\\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$, puis l\'angle. Ex. $\\vec{u}(1,1,0)$, $\\vec{v}(1,0,1)$ : $\\cos=\\dfrac{1}{\\sqrt{2}\\cdot\\sqrt{2}}=\\dfrac{1}{2}$, donc l\'angle vaut $60°$.',
        ],
      },
      { type: 'lien_ex', text: '→ Exercices 5, 11 et 12 : orthogonalité, angle, vecteur orthogonal à deux vecteurs' },
    ],
  },
  {
    id: 'plans',
    num: '5',
    title: 'Vecteur normal & équation d\'un plan',
    blocks: [
      {
        type: 'definition',
        badge: 'DÉFINITION — Vecteur normal',
        content: 'Un vecteur $\\vec{n}\\neq\\vec{0}$ est **normal** au plan $(P)$ s\'il est orthogonal à tous les vecteurs de $(P)$. Un point $M$ appartient au plan passant par $A$ et de vecteur normal $\\vec{n}$ si et seulement si $\\vec{AM}\\cdot\\vec{n}=0$.',
      },
      {
        type: 'figure',
        caption: 'Le vecteur $\\vec{n}$ est normal au plan $(P)$ : pour tout point $M$ du plan, $\\vec{n}\\cdot\\vec{AM}=0$.',
        src: '/modules/maths-geometrie/fig-normal.png',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Équation cartésienne d\'un plan',
        content: 'Dans un repère orthonormé, tout plan de vecteur normal $\\vec{n}(a,b,c)$ admet une équation de la forme $ax+by+cz+d=0$. Réciproquement, l\'ensemble des points vérifiant une telle équation (avec $(a,b,c)\\neq(0,0,0)$) est un plan de vecteur normal $\\vec{n}(a,b,c)$.',
      },
      {
        type: 'methode',
        title: 'ÉQUATION D\'UN PLAN CONNAISSANT A ET n',
        steps: [
          'Écrire $ax+by+cz+d=0$ avec $(a,b,c)$ les coordonnées de $\\vec{n}$.',
          'Injecter les coordonnées de $A$ pour trouver $d$.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Plan passant par $A(1,0,-2)$ de vecteur normal $\\vec{n}(2,-1,3)$ :',
          '$2(x-1)-1(y-0)+3(z+2)=0\\iff 2x-y+3z+4=0$. Vérification en $A$ : $2-0-6+4=0$. ✓',
        ],
      },
      {
        type: 'piege',
        text: 'Pour montrer qu\'un vecteur est normal à un plan défini par deux vecteurs directeurs $\\vec{u},\\vec{v}$, il faut vérifier $\\vec{n}\\cdot\\vec{u}=0$ **et** $\\vec{n}\\cdot\\vec{v}=0$ (l\'orthogonalité à un seul ne suffit pas).',
      },
      { type: 'lien_ex', text: '→ Exercices 6 et 13 : équation cartésienne, plan par trois points' },
    ],
  },
  {
    id: 'positions',
    num: '6',
    title: 'Positions relatives & intersections',
    blocks: [
      {
        type: 'propriete',
        text: '**Droite et plan** — Soit $\\mathcal{D}$ de vecteur directeur $\\vec{u}$ et $(P)$ de vecteur normal $\\vec{n}$. Si $\\vec{u}\\cdot\\vec{n}\\neq 0$ : $\\mathcal{D}$ et $(P)$ sont **sécants** en un unique point. Si $\\vec{u}\\cdot\\vec{n}=0$ : $\\mathcal{D}$ est **parallèle** à $(P)$ (incluse si un point de $\\mathcal{D}$ est dans $(P)$, strictement parallèle sinon).',
      },
      {
        type: 'methode',
        title: 'INTERSECTION DROITE / PLAN',
        steps: [
          'Substituer la représentation paramétrique $(x,y,z)$ de $\\mathcal{D}$ dans l\'équation cartésienne de $(P)$.',
          'Résoudre l\'équation en $t$. Une solution unique $\\Rightarrow$ un point d\'intersection.',
          'Reporter la valeur de $t$ pour obtenir les coordonnées du point.',
        ],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Droite $x=1+t$, $y=2+t$, $z=t$ et plan $2x-y+3z+4=0$. En substituant :',
          '$2(1+t)-(2+t)+3t+4=0\\iff 4t+4=0\\iff t=-1$. Le point d\'intersection est $(0\\,;1\\,;-1)$.',
        ],
      },
      {
        type: 'propriete',
        text: '**Deux plans** — Deux plans de vecteurs normaux $\\vec{n_1},\\vec{n_2}$ sont **parallèles** si $\\vec{n_1},\\vec{n_2}$ sont colinéaires (confondus ou strictement parallèles), et **sécants selon une droite** sinon.',
      },
      { type: 'lien_ex', text: '→ Exercices 14, 15 et 16 : positions relatives, intersection droite/plan' },
    ],
  },
  {
    id: 'distances',
    num: '7',
    title: 'Projeté orthogonal & distances',
    blocks: [
      {
        type: 'definition',
        badge: 'DÉFINITION — Projeté orthogonal sur un plan',
        content: 'Le **projeté orthogonal** $H$ d\'un point $M$ sur un plan $(P)$ est le point d\'intersection de $(P)$ avec la droite passant par $M$ et de vecteur directeur $\\vec{n}$ (normal à $(P)$). C\'est le point de $(P)$ **le plus proche** de $M$.',
      },
      {
        type: 'figure',
        caption: 'La distance de $M$ au plan $(P)$ est la longueur $MH$, où $H$ est le projeté orthogonal de $M$.',
        src: '/modules/maths-geometrie/fig-projete.png',
      },
      {
        type: 'definition',
        badge: 'THÉORÈME — Distance d\'un point à un plan',
        content: 'Dans un repère orthonormé, la distance du point $M(x_0,y_0,z_0)$ au plan d\'équation $ax+by+cz+d=0$ est :',
        formulas: ['d(M,P)=\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}'],
      },
      {
        type: 'exemple',
        title: 'EXEMPLE',
        lines: [
          'Distance de $M(1,1,1)$ au plan $2x-y+3z+4=0$ :',
          '$d=\\dfrac{|2\\times 1-1+3\\times 1+4|}{\\sqrt{2^2+(-1)^2+3^2}}=\\dfrac{|8|}{\\sqrt{14}}=\\dfrac{8}{\\sqrt{14}}\\approx 2{,}14$.',
        ],
      },
      {
        type: 'methode',
        title: 'COORDONNÉES DU PROJETÉ ORTHOGONAL H',
        steps: [
          'Écrire la droite passant par $M$ de vecteur directeur $\\vec{n}$ (paramétrée par $t$).',
          'Injecter dans l\'équation du plan et résoudre en $t$.',
          'Reporter $t$ : on obtient $H$. Alors $d(M,P)=MH$.',
        ],
      },
      {
        type: 'idee_cle',
        text: '« Descendre » de $M$ vers le plan le long de la normale donne le chemin le plus court : tout autre point du plan est plus loin (théorème de Pythagore dans le triangle rectangle $MHK$). D\'où le rôle central du vecteur normal dans les calculs de distance.',
      },
      { type: 'lien_ex', text: '→ Exercice 17 : distance & projeté — puis sujets bac 18 à 20' },
    ],
  },
];

// ── Contenu Suites & Récurrence ───────────────────────────────────────────────
const SUITES_OBJECTIFS = [
  'Rédiger un raisonnement par **récurrence simple, double ou forte** en trois étapes.',
  'Utiliser la définition de la **convergence** et le **théorème des gendarmes**.',
  'Appliquer le **théorème de la limite monotone** (suite monotone bornée → converge).',
  'Lever les **formes indéterminées** et exploiter les **croissances comparées**.',
  'Étudier une **suite récurrente** $u_{n+1}=f(u_n)$ (stabilité · monotonie · point fixe).',
];

const SUITES_COURS: Section[] = [
  {
    id: 'recurrence',
    num: '1',
    title: 'La récurrence',
    blocks: [
      { type: 'para', text: 'La récurrence est un raisonnement qui permet de démontrer qu\'une propriété est vraie pour tous les entiers, en la vérifiant à un premier rang puis en montrant qu\'elle se transmet d\'un rang au suivant. Au bac, la difficulté n\'est pas l\'idée mais la rédaction : les trois étapes doivent apparaître clairement.' },

      { type: 'subsection', num: '1.1', title: 'Récurrence simple' },
      { type: 'propriete', text: '**Propriété 1.1.1.** Soit une proposition $P$ définie sur $\\mathbb{N}$. Si $P(n_0)$ est vraie et si, pour tout $n\\geq n_0$, $P(n)\\Rightarrow P(n+1)$, alors $P$ est vraie pour tout $n\\geq n_0$.' },
      { type: 'idee_cle', text: '**Intuition — Les dominos.** Imagine une file infinie de dominos. **Initialisation :** on fait tomber le premier. **Hérédité :** chaque domino qui tombe fait tomber le suivant. Alors tous tombent. Les deux ingrédients sont indispensables : sans le premier poussé, rien ne bouge ; sans la transmission, la chute s\'arrête au premier.' },
      { type: 'methode', title: 'Rédiger une récurrence — les 3 étapes', steps: [
        '**Initialisation.** Montrer que $P(n_0)$ est vraie (calculer les deux membres au rang initial et vérifier l\'égalité ou l\'inégalité).',
        '**Hérédité.** Fixer $n\\geq n_0$, supposer $P(n)$ vraie (c\'est l\'**hypothèse de récurrence**, HR) et démontrer $P(n+1)$ en s\'appuyant sur HR.',
        '**Conclusion.** « Par le principe de récurrence, $P(n)$ est vraie pour tout $n\\geq n_0$. »',
      ]},
      { type: 'piege', text: 'Si la propriété n\'est vraie qu\'à partir d\'un certain rang $n_0$, on initialise simplement à $n_0$ (pas forcément à $0$). Le raisonnement reste identique.' },
      { type: 'exemple', title: 'Exemple rédigé : $4^n - 1$ est divisible par $3$', lines: [
        '**Init.** Au rang $n_0=0$ : $4^0-1=0=3\\times 0$. Donc $P(0)$ est vraie.',
        '**Hér.** Soit $n\\geq 0$, supposons $P(n)$ vraie, i.e. $3\\mid 4^n-1$, donc $4^n-1=3k$ pour un certain $k\\in\\mathbb{Z}$. Alors $4^{n+1}-1=4\\cdot 4^n-1=4(3k+1)-1=12k+3=3(4k+1)$. Donc $3\\mid 4^{n+1}-1$ : $P(n+1)$ est vraie.',
        '**Concl.** Par le principe de récurrence, $3\\mid 4^n-1$ pour tout $n\\in\\mathbb{N}$.',
      ]},

      { type: 'subsection', num: '1.2', title: 'Récurrence double' },
      { type: 'propriete', text: '**Propriété 1.2.1.** Soit $P$ une proposition sur $\\mathbb{N}$. Si $P(n_0)$ et $P(n_0+1)$ sont vraies, et si pour tout $n\\geq n_0$, $[P(n)$ et $P(n+1)]\\Rightarrow P(n+2)$, alors $P$ est vraie pour tout $n\\geq n_0$.' },
      { type: 'idee_cle', text: '**Quand l\'utiliser ?** Dès que le rang $n+2$ dépend des deux rangs précédents $n$ et $n+1$ — typiquement une suite du type $u_{n+2}=f(u_{n+1},u_n)$.' },
      { type: 'exemple', title: 'Exemple', lines: [
        'Suite définie par $u_0=a$, $u_1=b$, $u_{n+2}=u_{n+1}+u_n$. Montrons $u_n\\geq 0$ si $a,b\\geq 0$.',
        '**Init.** $u_0=a\\geq 0$ et $u_1=b\\geq 0$ : vrais.',
        '**Hér.** Si $u_n\\geq 0$ et $u_{n+1}\\geq 0$, alors $u_{n+2}=u_{n+1}+u_n\\geq 0$ (somme de deux positifs). Donc $P(n+2)$ vraie.',
        '**Concl.** Par récurrence double, $u_n\\geq 0$ pour tout $n\\in\\mathbb{N}$.',
      ]},

      { type: 'subsection', num: '1.3', title: 'Récurrence forte' },
      { type: 'propriete', text: '**Propriété 1.3.1.** Soit $P$ une proposition sur $\\mathbb{N}$. Si $P(n_0)$ est vraie et si, pour tout $n\\geq n_0$, $[P(n_0)$ et $\\cdots$ et $P(n)]\\Rightarrow P(n+1)$, alors $P$ est vraie pour tout $n\\geq n_0$.' },
      { type: 'idee_cle', text: '**Différence avec la simple.** En récurrence forte, l\'hérédité peut s\'appuyer sur **tous les rangs précédents** $n_0,\\ldots,n$, pas seulement le dernier. Utile quand $u_{n+1}$ dépend d\'une somme $u_0+u_1+\\cdots+u_n$.' },
    ],
  },
  {
    id: 'limites',
    num: '2',
    title: 'Les suites & leurs limites',
    blocks: [
      { type: 'para', text: 'On étudie le comportement d\'une suite $(u_n)$ quand $n$ devient très grand : va-t-elle se stabiliser autour d\'une valeur (convergence), filer vers l\'infini, ou osciller ? La quantité $|u_n-\\ell|$ mesure la distance entre $u_n$ et $\\ell$ : c\'est l\'outil clé de toutes les définitions qui suivent.' },

      { type: 'subsection', num: '2.1', title: 'Suites convergentes' },
      { type: 'definition', badge: 'Déf. 2.1.1', title: 'Limite finie — convergence', content: '$(u_n)$ converge vers un réel $\\ell$ si et seulement si, pour tout $\\varepsilon>0$, il existe un rang $N$ tel que pour tout $n\\geq N$, $|u_n-\\ell|<\\varepsilon$.', formulas: ['\\lim_{n\\to+\\infty} u_n = \\ell'] },
      { type: 'idee_cle', text: '**Intuition — Le tube.** Fixe une largeur $\\varepsilon$ aussi petite que tu veux autour de $\\ell$. La suite converge si, à partir d\'un certain rang $N$, tous les termes restent piégés dans le tube $]\\ell-\\varepsilon,\\ell+\\varepsilon[$. Avant $N$, la suite peut faire n\'importe quoi ; c\'est le comportement **final** qui compte.' },
      { type: 'propriete', text: '**Unicité (Prop. 2.1.1).** Si $(u_n)$ converge, alors sa limite est **unique**.' },
      { type: 'propriete', text: '**Passage à la limite dans une inégalité (Prop. 2.1.2).** Si $u_n\\leq v_n$ pour tout $n$ et si $\\lim u_n=\\ell$, $\\lim v_n=m$, alors $\\ell\\leq m$.' },
      { type: 'piege', text: 'Une **inégalité stricte** $u_n < v_n$ devient **large** à la limite : on obtient $\\ell\\leq m$, et pas $\\ell<m$ en général.' },
      { type: 'propriete', text: '**Théorème des gendarmes (Th. 2.1.1).** Si $v_n\\leq u_n\\leq w_n$ à partir d\'un certain rang et $\\lim v_n=\\lim w_n=\\ell$, alors $\\lim u_n=\\ell$.' },
      { type: 'idee_cle', text: '**Intuition.** $(u_n)$ est un fuyard encadré par deux gendarmes $(v_n)$ et $(w_n)$. S\'ils convergent tous deux vers le même point $\\ell$, le fuyard, coincé entre eux, n\'a d\'autre choix que d\'y aller aussi.' },
      { type: 'vocabulaire', title: 'Suites majorées, minorées, bornées', items: [
        '$M$ est un **majorant** de $(u_n)$ si $u_n\\leq M$ pour tout $n$.',
        '$m$ est un **minorant** si $u_n\\geq m$ pour tout $n$.',
        'La suite est **bornée** si elle est à la fois majorée et minorée.',
      ]},
      { type: 'propriete', text: '**Convergente $\\Rightarrow$ bornée (Prop. 2.1.3).** Toute suite convergente est bornée. La réciproque est fausse : $((-1)^n)$ est bornée mais diverge.' },
      { type: 'propriete', text: '**Théorème de la limite monotone — convergence (Th. 2.1.2).** Toute suite **croissante et majorée** converge. Toute suite **décroissante et minorée** converge.' },
      { type: 'piege', text: 'Le théorème garantit la **convergence** mais ne donne pas la valeur de la limite : « croissante et majorée par $M$ » ne signifie **pas** « converge vers $M$ ».' },

      { type: 'subsection', num: '2.2', title: 'Suites divergentes' },
      { type: 'definition', badge: 'Déf. 2.1.6', title: 'Divergence', content: '$(u_n)$ diverge si elle ne converge vers aucun réel. Trois cas possibles :', formulas: [
        '\\text{vers }+\\infty\\;:\\;\\forall A>0,\\,\\exists N,\\,\\forall n\\geq N,\\;u_n\\geq A',
        '\\text{vers }-\\infty\\;:\\;\\forall A<0,\\,\\exists N,\\,\\forall n\\geq N,\\;u_n\\leq A',
        '\\text{sans limite}\\;:\\;\\text{oscille (ex. }(-1)^n\\text{)}',
      ]},
      { type: 'propriete', text: '**Limite monotone — divergence (Th. 2.1.3).** Si $(u_n)$ est croissante et **non majorée**, alors $\\lim u_n=+\\infty$. Si elle est décroissante et non minorée, $\\lim u_n=-\\infty$.' },
      { type: 'propriete', text: '**Comparaison (Th. 2.1.4).** Si $u_n\\leq v_n$ pour tout $n$ et $\\lim u_n=+\\infty$, alors $\\lim v_n=+\\infty$. Si $u_n\\geq v_n$ et $\\lim u_n=-\\infty$, alors $\\lim v_n=-\\infty$.' },
      { type: 'idee_cle', text: '**Gendarmes vs comparaison.** Pour une **limite finie** $\\ell$ : il faut deux gendarmes (un encadrement). Pour $+\\infty$ ou $-\\infty$ : un seul suffit — il pousse la suite par en dessous (vers $+\\infty$) ou par au-dessus (vers $-\\infty$).' },

      { type: 'subsection', num: '2.3', title: 'Opérations sur les limites' },
      { type: 'propriete', text: '**Limites finies (Prop. 2.1.6).** Si $\\lim u_n=\\ell$ et $\\lim v_n=m$ (deux réels finis) : $\\lim(u_n+v_n)=\\ell+m$, $\\lim(u_n\\cdot v_n)=\\ell\\cdot m$, $\\lim(u_n/v_n)=\\ell/m$ si $m\\neq 0$.' },
      { type: 'propriete', text: '**Limites infinies (Prop. 2.1.7).** $(+\\infty)+(+\\infty)=+\\infty$ ; $\\ell\\cdot(+\\infty)=+\\infty$ si $\\ell>0$, $-\\infty$ si $\\ell<0$ ; $(+\\infty)\\cdot(+\\infty)=+\\infty$ ; $1/(+\\infty)=0$.' },
      { type: 'definition', badge: 'Déf. 2.1.7', title: 'Formes indéterminées (FI)', content: 'Une FI est une expression dont on ne peut pas déterminer la valeur directement par les règles opératoires. Les quatre formes à connaître :', formulas: [
        '\\infty-\\infty \\qquad 0\\times\\infty \\qquad \\dfrac{\\infty}{\\infty} \\qquad \\dfrac{0}{0}',
      ]},
      { type: 'para', text: 'Face à une FI, il faut **lever l\'indétermination** par une transformation adaptée avant de conclure.' },
      { type: 'methode', title: 'Méthode du terme dominant', steps: [
        'Dans une somme, la limite est imposée par le terme qui « l\'emporte » en croissance : c\'est le **terme dominant**.',
        'On factorise tout par ce terme dominant — les autres termes tendent vers $0$.',
        '**Ordre des croissances comparées** : $\\ln n\\ll n^\\alpha\\,(\\alpha>0)\\ll a^n\\,(a>1)\\ll n!\\ll n^n$.',
      ]},
      { type: 'exemple', title: 'Exemples — lever une FI', lines: [
        '$\\dfrac{3n^2+n}{n^2-1}=\\dfrac{n^2(3+1/n)}{n^2(1-1/n^2)}\\to\\dfrac{3}{1}=3$.',
        '$\\sqrt{n^2+n}-n=\\dfrac{n}{\\sqrt{n^2+n}+n}=\\dfrac{1}{\\sqrt{1+1/n}+1}\\to\\dfrac{1}{2}$.',
        '$n^2\\cdot e^{-n}=\\dfrac{n^2}{e^n}\\to 0$ (croissances comparées : $n^\\alpha\\ll e^n$).',
      ]},
      { type: 'propriete', text: '**Quantité conjuguée (Prop. 2.1.9).** Pour lever une FI $\\infty-\\infty$ avec des racines, on multiplie et divise par la quantité conjuguée : $(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b$.' },
      { type: 'exemple', title: 'Exemple', lines: [
        '$\\sqrt{n+1}-\\sqrt{n}=\\dfrac{(n+1)-n}{\\sqrt{n+1}+\\sqrt{n}}=\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}\\to 0$.',
      ]},
      { type: 'propriete', text: '**Taux d\'accroissement (Prop. 2.1.10).** Si $f$ est dérivable en $a$, alors $\\displaystyle\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}=f\'(a)$. En posant $h=1/n\\to 0$, on peut calculer des limites en reconnaissant ce taux d\'accroissement.' },
      { type: 'formules', label: 'Taux d\'accroissement usuels — à retenir', rows: [
        { desc: 'Exponentielle', tex: '\\frac{e^x-1}{x}\\xrightarrow[x\\to 0]{}1' },
        { desc: 'Logarithme', tex: '\\frac{\\ln(1+x)}{x}\\xrightarrow[x\\to 0]{}1' },
        { desc: 'Sinus', tex: '\\frac{\\sin x}{x}\\xrightarrow[x\\to 0]{}1' },
      ]},
      { type: 'reflex', text: '**FI polynômes / rationnelles** → factoriser par le monôme dominant.\n**FI avec exponentielle ou $\\ln$** → croissances comparées ($n^\\alpha\\ll e^n$, $\\ln n\\ll n^\\alpha$).\n**FI $\\infty-\\infty$ avec racines** → quantité conjuguée.\n**FI $0/0$ en un point** → taux d\'accroissement.' },

      { type: 'subsection', num: '2.4', title: 'Suites récurrentes $u_{n+1}=f(u_n)$' },
      { type: 'propriete', text: '**Point fixe.** Soit $f$ continue telle que $u_{n+1}=f(u_n)$. Si $(u_n)$ converge vers $\\ell$, alors $\\ell$ vérifie $f(\\ell)=\\ell$ : la limite est un **point fixe** de $f$.' },
      { type: 'methode', title: 'Étudier une suite récurrente — 4 étapes', steps: [
        '**Stabilité.** Montrer par récurrence que $u_n$ reste dans un intervalle $I$ (encadrement).',
        '**Monotonie.** Étudier le signe de $u_{n+1}-u_n=f(u_n)-u_n$ (souvent par récurrence ou via $f\'$).',
        '**Convergence.** Croissante majorée (ou décroissante minorée) $\\Rightarrow$ converge (théorème de la limite monotone).',
        '**Valeur de la limite.** Résoudre $f(\\ell)=\\ell$ et choisir la solution compatible avec $I$.',
      ]},
      { type: 'piege', text: 'L\'équation $f(\\ell)=\\ell$ ne se résout qu\'**après** avoir prouvé que la suite converge. Sans convergence établie, écrire « la limite vérifie $f(\\ell)=\\ell$ » n\'a aucune valeur.' },
      { type: 'lien_ex', text: '→ Exercices 8, 16, 17, 18, 19' },
    ],
  },
];

const SUITES_FICHE_DATA = [
  {
    title: '1  Récurrence',
    rows: [
      {
        label: 'Simple',
        tex: 'P(n_0)\\text{ vraie}\\;+\\;\\forall n,\\,[P(n)\\Rightarrow P(n+1)]\\;\\Rightarrow\\;P\\text{ vraie }\\forall n\\geq n_0',
        vars: '3 étapes : **Init.** · **Hérédité** · **Conclusion**',
      },
      {
        label: 'Double',
        tex: 'P(n_0),P(n_0{+}1)\\text{ vraies}\\;+\\;[P(n)\\,\\&\\,P(n+1)\\Rightarrow P(n+2)]',
        vars: 'Utile quand $u_{n+2}=f(u_{n+1},u_n)$',
      },
      {
        label: 'Forte',
        tex: 'P(n_0),\\ldots,P(n)\\text{ tous vrais}\\;\\Rightarrow\\;P(n+1)',
        vars: 'L\'hypothèse porte sur **tous** les rangs jusqu\'à $n$',
      },
    ],
  },
  {
    title: '2  Convergence',
    rows: [
      {
        label: 'Définition',
        tex: 'u_n\\to\\ell\\iff\\forall\\varepsilon>0,\\,\\exists N,\\,\\forall n\\geq N,\\;|u_n-\\ell|<\\varepsilon',
        vars: '$\\ell\\in\\mathbb{R}$ : valeur limite (réelle finie) · $\\varepsilon$ : tolérance arbitrairement petite · $N$ : rang à partir duquel $u_n$ reste à distance $<\\varepsilon$ de $\\ell$ · Limite **unique**. Toute suite convergente est **bornée**.',
      },
      {
        label: 'Inégalité',
        tex: 'u_n\\leq v_n\\text{ et les deux convergent}\\implies\\ell\\leq m\\quad(\\text{stricte}\\to\\text{large})',
        vars: '$\\ell=\\lim u_n$, $m=\\lim v_n$ · Si $u_n<v_n$ on obtient quand même $\\ell\\leq m$ (pas $\\ell<m$) — l\'inégalité **stricte ne passe pas** à la limite',
      },
    ],
  },
  {
    title: '3  Gendarmes & comparaison',
    rows: [
      {
        label: 'Gendarmes',
        tex: 'u_n\\leq v_n\\leq w_n\\text{ et }\\lim u_n=\\lim w_n=\\ell\\implies\\lim v_n=\\ell',
        vars: '$\\ell\\in\\mathbb{R}$ : limite **commune** des deux suites encadrantes · $(u_n)$ et $(w_n)$ : suites « gendarmes » encadrant $(v_n)$',
      },
      {
        label: 'Comparaison',
        tex: 'u_n\\leq v_n\\text{ et }\\lim u_n=+\\infty\\implies\\lim v_n=+\\infty',
        vars: '$(u_n)$ : **minorante** divergente vers $+\\infty$ · Une seule minorante suffit — pas besoin d\'encadrement',
      },
    ],
  },
  {
    title: '4  Limite monotone',
    rows: [
      {
        label: 'Convergence',
        tex: '(u_n)\\text{ croissante et majorée}\\implies (u_n)\\text{ converge}',
        vars: 'Majorée : $\\exists M,\\,\\forall n,\\,u_n\\leq M$ · Idem décroissante et minorée · **Ne donne pas** la valeur de $\\ell$ — il faut la calculer séparément',
      },
      {
        label: 'Divergence',
        tex: '(u_n)\\text{ croissante non majorée}\\implies u_n\\to+\\infty',
        vars: 'Non majorée : $\\forall M,\\,\\exists n,\\,u_n>M$ · Idem décroissante non minorée $\\to-\\infty$',
      },
    ],
  },
  {
    title: '5  Opérations sur les limites',
    rows: [
      {
        label: 'Finies',
        tex: '\\lim(u_n\\pm v_n)=\\ell\\pm m\\;,\\quad\\lim(u_n v_n)=\\ell m\\;,\\quad\\lim\\tfrac{u_n}{v_n}=\\tfrac{\\ell}{m}\\;(m\\neq 0)',
        vars: '$\\ell=\\lim u_n\\in\\mathbb{R}$, $m=\\lim v_n\\in\\mathbb{R}$ · **FI** (formes indéterminées) : $\\infty-\\infty$, $0\\times\\infty$, $\\infty/\\infty$, $0/0$ → lever avant d\'appliquer',
      },
      {
        label: 'Infinies',
        tex: '(+\\infty)+(+\\infty)=+\\infty\\;,\\quad\\ell\\cdot(+\\infty)=\\text{signe}(\\ell)\\times\\infty\\;,\\quad\\tfrac{1}{+\\infty}=0',
        vars: '$\\ell\\in\\mathbb{R}^*$ : **réel non nul** · son signe détermine le sens de l\'infini produit · $\\ell=0$ est une FI ($0\\times\\infty$)',
      },
    ],
  },
  {
    title: '6  Croissances comparées',
    rows: [
      {
        label: 'Ordre',
        tex: '\\ln n\\ll n^\\alpha\\ll a^n\\ll n!\\ll n^n\\quad(\\alpha>0,\\;a>1)',
        vars: '$\\alpha>0$ : exposant (puissance) · $a>1$ : base de l\'exponentielle · $\\ll$ : «\\, croît beaucoup plus lentement que \\,» · Le **terme dominant** impose la limite — factoriser par lui',
      },
      {
        label: 'Exemples',
        tex: '\\frac{\\ln n}{n^\\alpha}\\to 0\\;,\\quad\\frac{n^\\alpha}{a^n}\\to 0\\;,\\quad n^2 e^{-n}\\to 0',
        vars: 'Les puissances l\'emportent sur $\\ln$, l\'exponentielle l\'emporte sur les puissances',
      },
    ],
  },
  {
    title: '7  Quantité conjuguée',
    rows: [
      {
        label: 'Formule',
        tex: '\\sqrt{a}-\\sqrt{b}=\\dfrac{a-b}{\\sqrt{a}+\\sqrt{b}}',
        vars: '$a,b\\geq 0$ : expressions sous les radicaux · $\\sqrt{a}+\\sqrt{b}$ : **quantité conjuguée** (toujours $>0$) · Lève la FI $\\infty-\\infty$ — multiplier et diviser par le conjugué',
      },
      {
        label: 'Exemple',
        tex: '\\sqrt{n+1}-\\sqrt{n}=\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}\\to 0',
        vars: 'Ici $a=n+1$, $b=n$ · le dénominateur $\\to+\\infty$ donc le quotient $\\to 0$',
      },
    ],
  },
  {
    title: '8  Taux d\'accroissement',
    rows: [
      {
        label: 'Principe',
        tex: '\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}=f\'(a)\\;\\text{ avec }h=\\tfrac{1}{n}\\to 0',
        vars: '$a\\in\\mathbb{R}$ : point fixe · $h=1/n$ : pas qui $\\to 0$ quand $n\\to+\\infty$ · $f\'(a)$ : dérivée de $f$ en $a$ · Reconnaître la forme $\\frac{f(a+h)-f(a)}{h}$ pour calculer la limite',
      },
      {
        label: 'À retenir',
        tex: '\\frac{e^x-1}{x}\\to 1\\quad\\frac{\\ln(1+x)}{x}\\to 1\\quad\\frac{\\sin x}{x}\\to 1\\quad(x\\to 0)',
        vars: 'Ces trois limites sont les taux d\'accroissement de $e^x$, $\\ln$, $\\sin$ en $0$ — elles valent $f\'(0)=1$',
      },
    ],
  },
  {
    title: '9  Suite $u_{n+1}=f(u_n)$',
    rows: [
      {
        label: 'Méthode',
        tex: '\\text{Stabilité}\\to\\text{Monotonie}\\to\\text{Convergence}\\to\\ell=f(\\ell)',
        vars: '$f$ : fonction telle que $u_{n+1}=f(u_n)$ · $\\ell=\\displaystyle\\lim_{n\\to+\\infty}u_n$ : limite quand $n\\to+\\infty$ · **4 étapes dans cet ordre** — ne pas résoudre $\\ell=f(\\ell)$ avant d\'avoir prouvé la convergence',
      },
      {
        label: 'Point fixe',
        tex: 'u_n\\xrightarrow[n\\to+\\infty]{}\\ell\\implies\\ell=f(\\ell)',
        vars: '$\\ell$ : **point fixe** de $f$ — valeur vers laquelle $(u_n)$ tend quand $n\\to+\\infty$ · Solution de $f(\\ell)=\\ell$ · ⚠ Résoudre **seulement après** avoir prouvé la convergence',
      },
    ],
  },
];

// Objectifs du chapitre — page de couverture (Newton)
const OBJECTIFS = [
  'Décrire un mouvement à l\'aide des vecteurs **position**, **vitesse** et **accélération**.',
  'Énoncer et exploiter les **trois lois de Newton**.',
  'Appliquer une **méthode unique en 5 étapes** à n\'importe quel problème de dynamique.',
  'Établir les **équations horaires** et l\'**équation de la trajectoire** d\'un projectile.',
  'Étudier le mouvement d\'une **particule chargée** dans un champ électrique uniforme.',
];

function CourseTab({ module }: { module: PhysicsModule }) {
  const isMaths = module.subject === 'Maths';
  const isFonctions = module.id === 'maths-fonctions';
  const isLogarithmeCours = module.id === 'maths-logarithme';
  const isProbabilitesCours = module.id === 'maths-probabilites';
  const pal = isMaths ? V : A;
  const isGeometrieCours = module.id === 'maths-geometrie';
  const sections = isGeometrieCours ? GEOMETRIE_COURS : isProbabilitesCours ? PROBABILITES_COURS : isLogarithmeCours ? LOGARITHME_COURS : isFonctions ? FONCTIONS_COURS : isMaths ? SUITES_COURS : COURS;
  const objectifs = isGeometrieCours ? GEOMETRIE_OBJECTIFS : isProbabilitesCours ? PROBABILITES_OBJECTIFS : isLogarithmeCours ? LOGARITHME_OBJECTIFS : isFonctions ? FONCTIONS_OBJECTIFS : isMaths ? SUITES_OBJECTIFS : OBJECTIFS;
  const firstId = sections[0]?.id ?? '';
  const [open, setOpen] = useState<Set<string>>(new Set([firstId]));
  const toggle = (id: string) =>
    setOpen(p => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-2 pb-6">

      {/* Objectifs */}
      <div className={`rounded-xl border ${pal.border} ${pal.bg} overflow-hidden`}>
        <div className={`px-4 py-2 ${pal.head} border-b ${pal.border}`}>
          <span className={`text-[9px] font-black ${pal.label} uppercase tracking-widest`}>
            OBJECTIFS DU CHAPITRE
          </span>
        </div>
        <ul className="px-4 py-3 space-y-1.5">
          {objectifs.map((o, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${pal.dot} mt-[6px]`}/>
              <span className={`text-[13px] ${pal.bodyTxt} leading-relaxed`}><MixedText text={o} /></span>
            </li>
          ))}
        </ul>
        {!isMaths && (
          <div className="px-4 py-2 border-t border-amber-700/20">
            <p className="text-[11px] text-white/35 text-center">
              Conventions : repère <InlineMath tex="(O,\vec{i},\vec{j})" />, <InlineMath tex="g=9{,}81\,\text{m\,s}^{-2}" />, frottements négligés sauf mention contraire.
            </p>
          </div>
        )}
      </div>

      {/* Sections */}
      {sections.map(sec => (
        <div key={sec.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
          <button onClick={() => toggle(sec.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors">
            <span className={`shrink-0 w-8 h-8 rounded-lg ${pal.badge} text-black text-[13px] font-black flex items-center justify-center`}>
              {sec.num}
            </span>
            <span className="flex-1 font-bold text-white text-[14.5px]">{sec.title}</span>
            <ChevronDown size={15} className={`text-white/30 transition-transform duration-200 ${open.has(sec.id) ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open.has(sec.id) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                <div className="px-4 pb-6 pt-2 space-y-4 border-t border-white/8">
                  {sec.blocks.map((b, i) => <Block key={i} b={b} pal={pal} />)}
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
const FICHE_DATA = [
  {
    title: '1  Cinématique',
    rows: [
      {
        label: 'Position',
        tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i}+y(t)\\,\\vec{j}',
        vars: '$O$ : origine · $x(t),y(t)$ : coordonnées (équations horaires) · $\\vec{i},\\vec{j}$ : vecteurs unitaires des axes',
      },
      {
        label: 'Vitesse',
        tex: '\\vec{v}=\\dfrac{d\\overrightarrow{OM}}{dt}',
        vars: '$\\vec{v}$ : vecteur vitesse (m·s⁻¹) — toujours tangent à la trajectoire · $v_x=dx/dt$, $v_y=dy/dt$',
      },
      {
        label: 'Accélération',
        tex: '\\vec{a}=\\dfrac{d\\vec{v}}{dt}=\\dfrac{d^2\\overrightarrow{OM}}{dt^2}',
        vars: '$\\vec{a}$ : vecteur accélération (m·s⁻²) · $a_x=dv_x/dt$, $a_y=dv_y/dt$',
      },
      {
        label: 'Norme vitesse',
        tex: 'v=\\|\\vec{v}\\|=\\sqrt{v_x^2+v_y^2}',
        vars: '$v$ : vitesse scalaire (m·s⁻¹) · $v_x, v_y$ : composantes sur $x$ et $y$',
      },
    ],
  },
  {
    title: '2  Lois de Newton',
    rows: [
      {
        label: '1ʳᵉ loi — Inertie',
        tex: '\\sum\\vec{F}_{\\text{ext}}=\\vec{0}\\iff\\vec{v}_G=\\overrightarrow{\\text{cte}}',
        vars: '$\\sum\\vec{F}_{\\text{ext}}$ : somme des forces extérieures · $\\vec{v}_G$ : vitesse du centre d\'inertie — constante (en direction et norme) si la somme est nulle',
      },
      {
        label: '2ᵉ loi — PFD',
        tex: '\\sum\\vec{F}_{\\text{ext}}=m\\,\\vec{a}_G',
        vars: '$m$ : masse du système (kg) · $\\vec{a}_G$ : accélération du centre d\'inertie (m·s⁻²) · forces $\\vec{F}$ en newtons (N)',
      },
      {
        label: '3ᵉ loi — Réaction',
        tex: '\\vec{F}_{A/B}=-\\vec{F}_{B/A}\\quad(A\\neq B)',
        vars: '$\\vec{F}_{A/B}$ : force de A sur B · $\\vec{F}_{B/A}$ : force de B sur A — même droite, sens opposés, **corps différents**',
      },
    ],
  },
  {
    title: '4  Projectile (sans frottement)',
    rows: [
      {
        label: 'Équations horaires',
        tex: 'x=(v_0\\cos\\alpha)\\,t\\;,\\quad y=(v_0\\sin\\alpha)\\,t-\\tfrac{1}{2}g\\,t^2',
        vars: '$v_0$ : vitesse initiale (m·s⁻¹) · $\\alpha$ : angle avec l\'horizontale · $g=9{,}81\\;\\text{m·s}^{-2}$ · $t$ : temps (s)',
      },
      {
        label: 'Trajectoire y(x)',
        tex: 'y=-\\dfrac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2+(\\tan\\alpha)\\,x',
        vars: 'Parabole obtenue en éliminant $t$ via $t=x/(v_0\\cos\\alpha)$ · coefficients dépendent de $v_0$ et $\\alpha$',
      },
      {
        label: 'Flèche H',
        tex: 'H=\\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}',
        vars: '$H$ : hauteur maximale au sommet (m) — atteinte quand $v_y=0$ · date du sommet : $t_s = v_0\\sin\\alpha/g$',
      },
      {
        label: 'Portée D',
        tex: 'D=\\dfrac{v_0^2\\sin(2\\alpha)}{g}\\quad\\bigl(D_{\\max}\\text{ à }45°\\bigr)',
        vars: '$D$ : distance horizontale jusqu\'au retour au sol · maximale pour $\\alpha=45°$ car $\\sin 90°=1$',
      },
    ],
  },
  {
    title: '5  Particule chargée dans E⃗ uniforme',
    rows: [
      {
        label: 'Champ électrique',
        tex: 'E=\\dfrac{U}{d}',
        vars: '$E$ : champ électrique (V·m⁻¹) · $U$ : tension entre les plaques (V) · $d$ : distance entre plaques (m)',
      },
      {
        label: 'Force électrique',
        tex: '\\vec{F}=q\\,\\vec{E}',
        vars: '$q$ : charge de la particule (C) · $\\vec{F}$ parallèle à $\\vec{E}$ si $q>0$ · opposée à $\\vec{E}$ si $q<0$ (électron)',
      },
      {
        label: 'Accélération',
        tex: 'a=\\dfrac{qE}{m}',
        vars: '$a$ : accélération perpendiculaire aux plaques (m·s⁻²) · $m$ : masse de la particule (kg)',
      },
      {
        label: 'Trajectoire y(x)',
        tex: 'y=\\dfrac{qE}{2m\\,v_0^2}\\,x^2',
        vars: 'Parabole (analogue au projectile) · $v_0$ : vitesse d\'entrée horizontale · $x$ : distance parcourue horizontalement',
      },
    ],
  },
];

function FicheTab({ module }: { module: PhysicsModule }) {
  const isMaths = module.subject === 'Maths';
  const isFonctions = module.id === 'maths-fonctions';
  const isLogarithmeFiche = module.id === 'maths-logarithme';
  const isProbabilitesFiche = module.id === 'maths-probabilites';
  const isGeometrieFiche = module.id === 'maths-geometrie';
  const ficheData = isGeometrieFiche ? GEOMETRIE_FICHE_DATA : isProbabilitesFiche ? PROBABILITES_FICHE_DATA : isLogarithmeFiche ? LOGARITHME_FICHE_DATA : isFonctions ? FONCTIONS_FICHE_DATA : isMaths ? SUITES_FICHE_DATA : FICHE_DATA;
  const ficheTitle = isGeometrieFiche ? 'Géométrie dans l\'espace' : isProbabilitesFiche ? 'Probabilités & loi binomiale' : isLogarithmeFiche ? 'Le logarithme népérien' : isFonctions ? 'Les fonctions' : isMaths ? 'Suites & Récurrence' : 'Newton & Champ uniforme';
  const pal = isMaths ? V : A;
  const divider = isMaths ? 'divide-violet-500/20' : 'divide-amber-900/30';
  const borderR  = isMaths ? 'border-violet-500/20' : 'border-amber-900/30';
  const labelTxt = isMaths ? 'text-violet-300/70' : 'text-amber-400/60';
  const varsTxt  = isMaths ? 'text-violet-200/45' : 'text-amber-200/40';
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="pb-6 space-y-3">
      <div className="text-center pt-1 pb-1">
        <p className="text-white font-black text-base">{ficheTitle}</p>
        <p className="text-[11px] text-white/35 uppercase tracking-widest mt-0.5">Fiche de révision · Terminale</p>
      </div>

      {ficheData.map(sec => (
        <div key={sec.title} className={`rounded-xl overflow-hidden border ${pal.border} ${pal.bg}`}>
          <div className={`px-4 py-2 ${pal.head} border-b ${pal.border}`}>
            <span className={`text-[11px] font-black ${pal.headTxt} uppercase tracking-wider`}>
              <MixedText text={sec.title} />
            </span>
          </div>
          <div className={`divide-y ${divider}`}>
            {sec.rows.map((row, i) => (
              <div key={i} className="flex min-h-[2.75rem]">
                <div className={`w-[95px] shrink-0 px-3 py-2 flex items-start pt-3 border-r ${borderR}`}>
                  <span className={`text-[11px] font-semibold ${labelTxt} leading-tight`}>
                    <MixedText text={row.label} />
                  </span>
                </div>
                <div className="flex-1 px-3 py-1 overflow-x-auto">
                  <BlockMath tex={row.tex} className="!py-0" />
                  {'vars' in row && row.vars && (
                    <p className={`text-[10px] ${varsTxt} leading-snug mt-0.5 pb-1 whitespace-normal`}>
                      <MixedText text={row.vars} />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isMaths && <div className={`rounded-xl overflow-hidden border ${A.border} ${A.bg}`}>
        <div className={`px-4 py-2 ${A.head} border-b ${A.border}`}>
          <span className={`text-[11px] font-black ${A.headTxt} uppercase tracking-wider`}>Constantes utiles</span>
        </div>
        {[
          {
            label: 'Pesanteur terrestre',
            sym: 'g',
            tex: 'g = 9{,}81\\;\\text{m}\\cdot\\text{s}^{-2}',
          },
          {
            label: 'Charge élémentaire',
            sym: 'e',
            tex: 'e = 1{,}6\\times10^{-19}\\;\\text{C}',
          },
          {
            label: "Masse de l'électron",
            sym: 'm_e',
            tex: 'm_e = 9{,}1\\times10^{-31}\\;\\text{kg}',
          },
        ].map(c => (
          <div key={c.sym} className="flex items-start border-t border-amber-900/30 py-2 px-3 gap-3">
            <div className="shrink-0 w-[110px]">
              <p className="text-[11px] font-semibold text-white/70 leading-tight">{c.label}</p>
              <p className="text-[10px] text-amber-400/50 font-mono mt-0.5">{c.sym}</p>
            </div>
            <div className="flex-1 overflow-x-auto">
              <BlockMath tex={c.tex} className="!py-0" />
            </div>
          </div>
        ))}
      </div>}
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
