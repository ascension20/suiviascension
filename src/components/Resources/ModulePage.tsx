import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, FileText, Gamepad2,
  CheckCircle2, Lock, Play, ChevronDown, ChevronRight,
} from 'lucide-react';
import { PhysicsModule, ModuleLevel, TIER_META, DIFF_LABEL } from '@/lib/modules-data';
import { NEWTON_QCM, NEWTON_EXERCISES } from '@/lib/newton-content';
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
  | { type: 'figure';    caption: string; svg: () => JSX.Element };

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

/** Toutes les boxes ambrées partagent cette palette */
const A = {
  bg:       'bg-amber-950/20',
  border:   'border-amber-700/35',
  head:     'bg-amber-600/20',
  headTxt:  'text-amber-300',
  bodyTxt:  'text-amber-100/85',
  label:    'text-amber-400',
  dot:      'bg-amber-500',
};

function Block({ b }: { b: BlockType }) {
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
        <div className="flex items-center gap-2 mt-1 mb-0.5">
          <span className="text-amber-500 font-bold text-sm">▸</span>
          <h4 className="text-[14px] font-bold text-white">
            <span className="text-amber-400 mr-1">{b.num}</span>{b.title}
          </h4>
        </div>
      );

    /* ── Formule unique ───────────────────────────────────────────────────── */
    case 'formula':
      return (
        <div className={`relative rounded-lg ${A.bg} border ${A.border} py-3 px-4 text-center overflow-x-auto`}>
          {b.label && (
            <span className={`absolute top-1.5 left-3 text-[9px] font-black ${A.label} uppercase tracking-widest`}>
              {b.label}
            </span>
          )}
          <BlockMath tex={b.tex} />
        </div>
      );

    /* ── Bloc de plusieurs formules ───────────────────────────────────────── */
    case 'formules':
      return (
        <div className={`rounded-lg ${A.bg} border ${A.border} overflow-hidden`}>
          {b.label && (
            <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
              <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>{b.label}</span>
            </div>
          )}
          <div className="px-4 py-2 space-y-2">
            {b.rows.map((r, i) => (
              <div key={i}>
                {r.desc && (
                  <p className={`text-[12px] ${A.bodyTxt} mb-0.5`}><MixedText text={r.desc} /></p>
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
        <div className={`rounded-lg ${A.bg} border ${A.border} overflow-hidden`}>
          <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>
              VOCABULAIRE — {b.title}
            </span>
          </div>
          <div className="px-3 py-2.5">
            {b.intro && (
              <p className={`text-[13px] ${A.bodyTxt} mb-2 leading-relaxed`}>
                <MixedText text={b.intro} />
              </p>
            )}
            <ul className="space-y-1.5">
              {b.items.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${A.dot} mt-[6px]`}/>
                  <span className={`text-[13px] ${A.bodyTxt} leading-relaxed`}><MixedText text={item} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    /* ── Définition ──────────────────────────────────────────────────────── */
    case 'definition':
      return (
        <div className={`rounded-lg border-l-[3px] border-amber-500 border ${A.border} ${A.bg} overflow-hidden`}>
          {b.badge && (
            <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
              <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>{b.badge}</span>
            </div>
          )}
          <div className="px-3 py-2.5 space-y-2">
            {b.content.split('\n\n').map((para, i) => (
              <p key={i} className={`text-[13px] ${A.bodyTxt} leading-relaxed`}>
                <MixedText text={para} />
              </p>
            ))}
            {b.formulas?.map((tex, i) => (
              <div key={i} className="overflow-x-auto"><BlockMath tex={tex} /></div>
            ))}
          </div>
        </div>
      );

    /* ── Propriété ───────────────────────────────────────────────────────── */
    case 'propriete':
      return (
        <div className={`rounded-lg border-l-[3px] border-amber-500 border ${A.border} ${A.bg} px-3 py-2.5`}>
          <div className={`mb-1`}>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>PROPRIÉTÉ</span>
          </div>
          <p className={`text-[13px] ${A.bodyTxt} leading-relaxed`}><MixedText text={b.text} /></p>
        </div>
      );

    /* ── Idée clé 💡 ─────────────────────────────────────────────────────── */
    case 'idee_cle':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span>💡</span>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>IDÉE CLÉ</span>
          </div>
          <p className={`px-3 py-2.5 text-[13px] ${A.bodyTxt} leading-relaxed`}>
            <MixedText text={b.text} />
          </p>
        </div>
      );

    /* ── L'idée à comprendre 💡 ──────────────────────────────────────────── */
    case 'idee_comprendre':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span>💡</span>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>L'IDÉE À COMPRENDRE</span>
          </div>
          <ul className="px-3 py-2.5 space-y-1.5">
            {b.items.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${A.dot} mt-[6px]`}/>
                <span className={`text-[13px] ${A.bodyTxt} leading-relaxed`}><MixedText text={item} /></span>
              </li>
            ))}
          </ul>
        </div>
      );

    /* ── Méthode (étapes numérotées) ─────────────────────────────────────── */
    case 'methode':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>
              MÉTHODE{b.title ? ` — ${b.title}` : ''}
            </span>
          </div>
          <ol className="divide-y divide-amber-700/15">
            {b.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start px-3 py-2.5">
                <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500 text-[11px] font-black text-black flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className={`text-[13px] ${A.bodyTxt} leading-relaxed`}><MixedText text={step} /></span>
              </li>
            ))}
          </ol>
        </div>
      );

    /* ── Exemple express ─────────────────────────────────────────────────── */
    case 'exemple':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>
              EXEMPLE EXPRESS{b.title ? ` — ${b.title}` : ''}
            </span>
          </div>
          <div className="px-3 py-2.5 space-y-1">
            {b.lines.map((line, i) =>
              line === '' ? <div key={i} className="h-1" /> : (
                <p key={i} className={`text-[13px] ${A.bodyTxt} leading-relaxed`}>
                  <MixedText text={line} />
                </p>
              )
            )}
          </div>
        </div>
      );

    /* ── Application de la méthode ①②③④⑤ ───────────────────────────────── */
    case 'application':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>{b.title}</span>
          </div>
          <div className="divide-y divide-amber-700/15">
            {b.steps.map((step, i) => (
              <div key={i} className="px-3 py-2.5 space-y-1.5">
                <p className={`text-[13px] ${A.bodyTxt} leading-relaxed`}>
                  <span className="font-bold text-amber-300 mr-1">{step.n}</span>
                  <strong className={A.headTxt}>{step.bold}</strong>
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

    /* ── Piège fréquent ──────────────────────────────────────────────────── */
    case 'piege':
      return (
        <div className="rounded-lg border border-red-800/40 bg-red-950/15 overflow-hidden">
          <div className="px-3 py-1.5 bg-red-800/20 border-b border-red-800/35">
            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">
              {b.badge ?? 'PIÈGE FRÉQUENT'}
            </span>
          </div>
          <p className="px-3 py-2.5 text-[13px] text-red-100/80 leading-relaxed">
            <MixedText text={b.text} />
          </p>
        </div>
      );

    /* ── Le bon réflexe ──────────────────────────────────────────────────── */
    case 'reflex':
      return (
        <div className={`rounded-lg border ${A.border} ${A.bg} overflow-hidden`}>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 ${A.head} border-b ${A.border}`}>
            <span>🎯</span>
            <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>LE BON RÉFLEXE</span>
          </div>
          <p className={`px-3 py-2.5 text-[13px] ${A.bodyTxt} leading-relaxed`}>
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

    /* ── Figure SVG ──────────────────────────────────────────────────────── */
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

    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ONGLET COURS
   ═══════════════════════════════════════════════════════════════════════════ */

// Objectifs du chapitre — page de couverture
const OBJECTIFS = [
  'Décrire un mouvement à l\'aide des vecteurs **position**, **vitesse** et **accélération**.',
  'Énoncer et exploiter les **trois lois de Newton**.',
  'Appliquer une **méthode unique en 5 étapes** à n\'importe quel problème de dynamique.',
  'Établir les **équations horaires** et l\'**équation de la trajectoire** d\'un projectile.',
  'Étudier le mouvement d\'une **particule chargée** dans un champ électrique uniforme.',
];

function CourseTab() {
  const [open, setOpen] = useState<Set<string>>(new Set(['cinematique']));
  const toggle = (id: string) =>
    setOpen(p => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="space-y-2 pb-6">

      {/* Objectifs */}
      <div className={`rounded-xl border ${A.border} ${A.bg} overflow-hidden`}>
        <div className={`px-4 py-2 ${A.head} border-b ${A.border}`}>
          <span className={`text-[9px] font-black ${A.label} uppercase tracking-widest`}>
            OBJECTIFS DU CHAPITRE
          </span>
        </div>
        <ul className="px-4 py-3 space-y-1.5">
          {OBJECTIFS.map((o, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${A.dot} mt-[6px]`}/>
              <span className={`text-[13px] ${A.bodyTxt} leading-relaxed`}><MixedText text={o} /></span>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-amber-700/20">
          <p className="text-[11px] text-white/35 text-center">
            {"Conventions : repère $(O,\\,\\vec{i},\\,\\vec{j})$, $g = 9{,}81\\,\\text{m\\,s}^{-2}$, frottements négligés sauf mention contraire."}
          </p>
        </div>
      </div>

      {/* Sections */}
      {COURS.map(sec => (
        <div key={sec.id} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
          <button onClick={() => toggle(sec.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-amber-500 text-black text-[13px] font-black flex items-center justify-center">
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
const FICHE_DATA = [
  {
    title: '§1  Cinématique',
    rows: [
      { label: 'Position',     tex: '\\overrightarrow{OM}(t) = x(t)\\,\\vec{i}+y(t)\\,\\vec{j}' },
      { label: 'Vitesse',      tex: '\\vec{v}=\\dfrac{d\\overrightarrow{OM}}{dt}\\quad(\\text{tangente})' },
      { label: 'Accélération', tex: '\\vec{a}=\\dfrac{d\\vec{v}}{dt}' },
      { label: 'Norme',        tex: 'v=\\sqrt{v_x^2+v_y^2}' },
    ],
  },
  {
    title: '§2  Lois de Newton',
    rows: [
      { label: '1ʳᵉ loi', tex: '\\sum\\vec{F}_{\\text{ext}}=\\vec{0}\\iff\\vec{v}_G=\\overrightarrow{\\text{cte}}' },
      { label: '2ᵉ loi',  tex: '\\sum\\vec{F}_{\\text{ext}}=m\\vec{a}_G' },
      { label: '3ᵉ loi',  tex: '\\vec{F}_{A/B}=-\\vec{F}_{B/A}\\;(\\text{corps ≠})' },
    ],
  },
  {
    title: '§4  Projectile (sans frottement)',
    rows: [
      { label: 'Horaires',    tex: 'x=v_0\\cos\\alpha\\cdot t\\;,\\;\\;y=v_0\\sin\\alpha\\cdot t-\\tfrac{1}{2}g\\,t^2' },
      { label: 'Trajectoire', tex: 'y=-\\dfrac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2+(\\tan\\alpha)\\,x' },
      { label: 'Flèche H',    tex: 'H=\\dfrac{v_0^2\\sin^2\\!\\alpha}{2g}' },
      { label: 'Portée D',    tex: 'D=\\dfrac{v_0^2\\sin2\\alpha}{g}\\quad(D_{\\max}\\text{ à }45°)' },
    ],
  },
  {
    title: '§5  Particule chargée',
    rows: [
      { label: 'Champ',        tex: 'E=U/d' },
      { label: 'Force',        tex: '\\vec{F}=q\\vec{E}\\;(\\text{opposée à }\\vec{E}\\text{ si }q<0)' },
      { label: 'Accélération', tex: 'a=qE/m' },
      { label: 'Trajectoire',  tex: 'y=\\dfrac{qE}{2mv_0^2}\\,x^2' },
    ],
  },
];

function FicheTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }} className="pb-6 space-y-3">
      <div className="text-center pt-1 pb-1">
        <p className="text-white font-black text-base">Newton & Champ uniforme</p>
        <p className="text-[11px] text-white/35 uppercase tracking-widest mt-0.5">Fiche de révision · Terminale</p>
      </div>

      {FICHE_DATA.map(sec => (
        <div key={sec.title} className={`rounded-xl overflow-hidden border ${A.border} ${A.bg}`}>
          <div className={`px-4 py-2 ${A.head} border-b ${A.border}`}>
            <span className={`text-[11px] font-black ${A.headTxt} uppercase tracking-wider`}>{sec.title}</span>
          </div>
          <div className="divide-y divide-amber-900/30">
            {sec.rows.map((row, i) => (
              <div key={i} className="flex items-center min-h-[2.75rem]">
                <div className="w-[95px] shrink-0 px-3 py-2 self-stretch flex items-center border-r border-amber-900/30">
                  <span className="text-[11px] font-semibold text-amber-400/60 leading-tight">{row.label}</span>
                </div>
                <div className="flex-1 px-3 py-1 overflow-x-auto">
                  <BlockMath tex={row.tex} className="!py-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={`rounded-xl overflow-hidden border ${A.border} ${A.bg}`}>
        <div className={`px-4 py-2 ${A.head} border-b ${A.border}`}>
          <span className={`text-[11px] font-black ${A.headTxt} uppercase tracking-wider`}>Constantes</span>
        </div>
        {[
          { sym: 'g',   tex: '9{,}81\\;\\text{m\\,s}^{-2}' },
          { sym: 'e',   tex: '1{,}6\\times10^{-19}\\;\\text{C}' },
          { sym: 'm_e', tex: '9{,}1\\times10^{-31}\\;\\text{kg}' },
        ].map(c => (
          <div key={c.sym} className="flex items-center min-h-[2.5rem] border-t border-amber-900/30">
            <div className="w-[95px] shrink-0 px-3 py-1 self-stretch flex items-center border-r border-amber-900/30">
              <span className="text-[11px] font-mono text-amber-400/60">{c.sym} =</span>
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
