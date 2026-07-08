import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const EQUADIFF_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Les solutions de $y\'=ay$ sont…',
    options: [
      { label: 'a', text: '$Ce^{ax}$' },
      { label: 'b', text: '$ax+C$' },
      { label: 'c', text: '$e^{ax}+C$' },
      { label: 'd', text: '$Cax$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'La solution de $y\'=y$ telle que $y(0)=1$ est…',
    options: [
      { label: 'a', text: '$e^x$ (c\'est l\'exponentielle)' },
      { label: 'b', text: '$Ce^x$' },
      { label: 'c', text: '$x+1$' },
      { label: 'd', text: '$e^x+1$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Les solutions de $y\'=ay+b$ ($a\\neq 0$) sont…',
    options: [
      { label: 'a', text: '$Ce^{ax}$' },
      { label: 'b', text: '$Ce^{ax}-\\dfrac{b}{a}$' },
      { label: 'c', text: '$Ce^{ax}+b$' },
      { label: 'd', text: '$Ce^{ax}+ab$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'La solution d\'équilibre de $y\'=ay+b$ est…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$-\\dfrac{b}{a}$' },
      { label: 'c', text: '$\\dfrac{b}{a}$' },
      { label: 'd', text: '$\\dfrac{a}{b}$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La solution de $y\'=3y$ telle que $y(0)=2$ est…',
    options: [
      { label: 'a', text: '$2e^{3x}$ (car $C=2$)' },
      { label: 'b', text: '$3e^{2x}$' },
      { label: 'c', text: '$2e^x$' },
      { label: 'd', text: '$6x$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'Sans condition initiale, $y\'=ay$ admet…',
    options: [
      { label: 'a', text: 'une solution' },
      { label: 'b', text: 'deux solutions' },
      { label: 'c', text: 'aucune solution' },
      { label: 'd', text: 'une infinité de solutions ($C$ libre)' },
    ],
    answer: 'd',
  },
  {
    n: 7,
    text: 'Les solutions de $y\'=-y+2$ sont…',
    options: [
      { label: 'a', text: '$Ce^{-x}+2$ (équilibre $-b/a=2$)' },
      { label: 'b', text: '$Ce^{-x}-2$' },
      { label: 'c', text: '$Ce^x+2$' },
      { label: 'd', text: '$Ce^{-x}$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'Pour $y\'=ay$ avec $a<0$ et $C>0$, quand $x\\to+\\infty$, $y(x)$…',
    options: [
      { label: 'a', text: 'tend vers $+\\infty$' },
      { label: 'b', text: 'tend vers $0$ (car $e^{ax}\\to 0$)' },
      { label: 'c', text: 'tend vers $-\\infty$' },
      { label: 'd', text: 'tend vers $C$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: '$f(x)=Ce^{ax}$ est solution de…',
    options: [
      { label: 'a', text: '$y\'=ay$ (car $(Ce^{ax})\'=aCe^{ax}$)' },
      { label: 'b', text: '$y\'=a+y$' },
      { label: 'c', text: '$y\'=y+a$' },
      { label: 'd', text: '$y=ay\'$' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'Le théorème de Cauchy garantit…',
    options: [
      { label: 'a', text: 'aucune solution' },
      { label: 'b', text: 'une infinité' },
      { label: 'c', text: 'une unique solution avec condition initiale' },
      { label: 'd', text: 'deux solutions' },
    ],
    answer: 'c',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const EQUADIFF_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'equadiff-1',
    context: '$C$ désigne une constante réelle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les solutions sur $\\mathbb{R}$ de $y\'=3y$.' },
        { n: 'b', text: 'Donner les solutions de $y\'=-2y$.' },
        { n: 'c', text: 'Donner les solutions de $y\'=\\dfrac{1}{2}y$.' },
      ],
    }],
  },
  {
    id: 'equadiff-2',
    context: 'On vérifie qu\'une fonction est solution en la dérivant.',
    parts: [{
      questions: [
        { n: 'a', text: 'Vérifier que la fonction $f(x)=5e^{-4x}$ est solution de l\'équation $y\'=-4y$.' },
      ],
    }],
  },
  {
    id: 'equadiff-3',
    context: 'Problème de Cauchy : une condition initiale isole une unique solution.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la solution de $y\'=2y$ vérifiant $y(0)=5$.' },
      ],
    }],
  },
  {
    id: 'equadiff-4',
    context: 'Les solutions de $y\'=ay+b$ ($a\\neq 0$) sont $x\\mapsto Ce^{ax}-\\dfrac{b}{a}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les solutions sur $\\mathbb{R}$ de $y\'=2y+6$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'equadiff-5',
    context: 'Commencer par mettre l\'équation sous la forme $y\'=ay$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre l\'équation $2y\'-6y=0$.' },
      ],
    }],
  },
  {
    id: 'equadiff-6',
    context: 'Problème de Cauchy puis évaluation.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la solution de $y\'=-y$ vérifiant $y(0)=3$.' },
        { n: 'b', text: 'Calculer $y(1)$.' },
      ],
    }],
  },
  {
    id: 'equadiff-7',
    context: 'Attention : la condition initiale n\'est pas donnée en $x_0=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la solution de $y\'=\\dfrac{1}{2}y$ vérifiant $y(2)=4$.' },
      ],
    }],
  },
  {
    id: 'equadiff-8',
    context: 'Les solutions de $y\'=ay+b$ s\'écrivent $Ce^{ax}-\\dfrac{b}{a}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les solutions de $y\'=-3y+12$ et préciser la solution d\'équilibre.' },
      ],
    }],
  },
  {
    id: 'equadiff-9',
    context: 'La solution d\'équilibre est la solution constante de l\'équation.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la solution constante (d\'équilibre) de $y\'=4y-8$, et vérifier.' },
      ],
    }],
  },
  {
    id: 'equadiff-10',
    context: 'Résolution complète avec condition initiale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $y\'=-2y+6$ avec $y(0)=1$.' },
      ],
    }],
  },
  {
    id: 'equadiff-11',
    context: 'Un objet à $80°$ refroidit dans une pièce à $20°$ selon $T\'=-0{,}05\\,(T-20)$, avec $T(0)=80$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation sous la forme $T\'=aT+b$.' },
        { n: 'b', text: 'Déterminer $T(t)$.' },
        { n: 'c', text: 'Calculer la température au bout de 20 unités de temps (arrondir au dixième).' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'equadiff-12',
    context: 'Résolution puis comportement asymptotique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $y\'=y-2$ avec $y(0)=5$.' },
        { n: 'b', text: 'Déterminer $\\displaystyle\\lim_{x\\to+\\infty}y(x)$.' },
      ],
    }],
  },
  {
    id: 'equadiff-13',
    context: 'Les solutions convergent vers l\'équilibre lorsque $a<0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $y\'=-\\dfrac{1}{2}y+2$ avec $y(0)=10$.' },
        { n: 'b', text: 'Vers quelle valeur $y(x)$ tend-elle en $+\\infty$ ?' },
      ],
    }],
  },
  {
    id: 'equadiff-14',
    context: 'Une population croît de $2\\%$ par an : $P\'=0{,}02\\,P$, avec $P(0)=1000$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $P(t)$.' },
        { n: 'b', text: 'Calculer $P(50)$ (arrondir à l\'unité).' },
      ],
    }],
  },
  {
    id: 'equadiff-15',
    context: 'La tension d\'un condensateur vérifie $u\'=-2u+10$ avec $u(0)=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $u(t)$.' },
        { n: 'b', text: 'Déterminer sa limite en $+\\infty$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'equadiff-16',
    context: 'On considère l\'équation différentielle $(E) : y\'=-2y+8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les solutions générales de $(E)$.' },
        { n: 'b', text: 'Préciser la solution d\'équilibre.' },
        { n: 'c', text: 'Déterminer la solution $f$ vérifiant $f(0)=1$.' },
        { n: 'd', text: 'Étudier le sens de variation de $f$ et déterminer $\\displaystyle\\lim_{x\\to+\\infty}f(x)$.' },
      ],
    }],
  },
  {
    id: 'equadiff-17',
    context: 'Une tasse de thé à $85°$ est posée dans une pièce à $22°$. On modélise sa température par $T\'=-k\\,(T-22)$ avec $k=0{,}04$ et $T(0)=85$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $T\'=-0{,}04\\,T+0{,}88$.' },
        { n: 'b', text: 'Donner les solutions générales, puis la solution vérifiant $T(0)=85$.' },
        { n: 'c', text: 'Calculer la température au bout de 30 minutes (arrondir au dixième).' },
        { n: 'd', text: 'Vers quelle température tend le thé ? Interpréter.' },
      ],
    }],
  },
  {
    id: 'equadiff-18',
    context: 'Soit $f$ la solution de $y\'=2y-6$ vérifiant $f(0)=1$. On pose $g=f-3$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $g$ est solution de l\'équation $y\'=2y$.' },
        { n: 'b', text: 'En déduire l\'expression de $g$, puis celle de $f$.' },
        { n: 'c', text: 'Vérifier le résultat en résolvant directement $y\'=2y-6$ avec $f(0)=1$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const EQUADIFF_CORRECTIONS: Record<string, Correction> = {
  'equadiff-1': {
    steps: [
      { n: 'a', text: '$y\'=3y$ : $y=Ce^{3x}$.' },
      { n: 'b', text: '$y\'=-2y$ : $y=Ce^{-2x}$.' },
      { n: 'c', text: '$y\'=\\dfrac{1}{2}y$ : $y=Ce^{x/2}$. ($C\\in\\mathbb{R}$ dans les trois cas.)' },
    ],
    result: '$Ce^{3x}$ ; $Ce^{-2x}$ ; $Ce^{x/2}$ ($C\\in\\mathbb{R}$).',
  },
  'equadiff-2': {
    steps: [
      { n: '1', text: '$f(x)=5e^{-4x}$, donc $f\'(x)=5\\times(-4)e^{-4x}=-20e^{-4x}=-4\\times(5e^{-4x})=-4f(x)$.' },
      { n: '2', text: 'Donc $f$ vérifie $y\'=-4y$. ✓' },
    ],
    result: '$f\'=-4f$ : $f$ est bien solution.',
  },
  'equadiff-3': {
    steps: [
      { n: '1', text: 'Forme générale : $y=Ce^{2x}$ ; condition : $y(0)=C=5$, donc $y(x)=5e^{2x}$.' },
    ],
    result: '$y(x)=5e^{2x}$.',
  },
  'equadiff-4': {
    steps: [
      { n: '1', text: '$a=2$, $b=6$ : $y=Ce^{2x}-\\dfrac{6}{2}=Ce^{2x}-3$.' },
    ],
    result: '$y=Ce^{2x}-3$ ($C\\in\\mathbb{R}$).',
  },
  'equadiff-5': {
    steps: [
      { n: '1', text: '$2y\'-6y=0\\iff y\'=3y$, d\'où $y=Ce^{3x}$.' },
    ],
    result: '$y=Ce^{3x}$.',
  },
  'equadiff-6': {
    steps: [
      { n: 'a', text: '$y=Ce^{-x}$ ; $y(0)=C=3$, donc $y(x)=3e^{-x}$.' },
      { n: 'b', text: '$y(1)=3e^{-1}=\\dfrac{3}{e}\\approx 1{,}10$.' },
    ],
    result: '$y(x)=3e^{-x}$ ; $y(1)\\approx 1{,}10$.',
  },
  'equadiff-7': {
    steps: [
      { n: '1', text: '$y=Ce^{x/2}$ ; $y(2)=Ce^1=4$, donc $C=4e^{-1}$.' },
      { n: '2', text: 'D\'où $y(x)=4e^{-1}e^{x/2}=4e^{\\,x/2-1}$. (Vérification : $y(2)=4e^0=4$.) ✓' },
    ],
    result: '$y(x)=4e^{\\,x/2-1}$.',
  },
  'equadiff-8': {
    steps: [
      { n: '1', text: '$a=-3$, $b=12$ : $y=Ce^{-3x}-\\dfrac{12}{-3}=Ce^{-3x}+4$.' },
      { n: '2', text: 'Solution d\'équilibre : $y=4$.' },
    ],
    result: '$y=Ce^{-3x}+4$ ; équilibre $y=4$.',
  },
  'equadiff-9': {
    steps: [
      { n: '1', text: 'Équilibre : $-\\dfrac{b}{a}=-\\dfrac{-8}{4}=2$.' },
      { n: '2', text: 'Vérification : pour $y=2$, $y\'=0$ et $4\\times 2-8=0$. ✓' },
    ],
    result: '$y=2$.',
  },
  'equadiff-10': {
    steps: [
      { n: '1', text: '$a=-2$, $b=6$ : $y=Ce^{-2x}+3$ (équilibre $-\\tfrac{6}{-2}=3$).' },
      { n: '2', text: 'Condition : $y(0)=C+3=1$, donc $C=-2$. D\'où $y(x)=-2e^{-2x}+3$.' },
    ],
    result: '$y(x)=-2e^{-2x}+3$.',
  },
  'equadiff-11': {
    steps: [
      { n: 'a', text: '$T\'=-0{,}05(T-20)=-0{,}05\\,T+1$.' },
      { n: 'b', text: 'Équilibre $\\dfrac{1}{0{,}05}=20$ ; $T=Ce^{-0{,}05t}+20$ ; $T(0)=C+20=80\\Rightarrow C=60$. Donc $T(t)=60e^{-0{,}05t}+20$.' },
      { n: 'c', text: '$T(20)=60e^{-1}+20\\approx 60\\times 0{,}368+20\\approx 42{,}1°$.' },
    ],
    result: '$T(t)=60e^{-0{,}05t}+20$ ; $T(20)\\approx 42{,}1°$.',
  },
  'equadiff-12': {
    steps: [
      { n: 'a', text: '$a=1$, $b=-2$ : $y=Ce^x+2$ (équilibre $-\\tfrac{-2}{1}=2$). Condition : $y(0)=C+2=5$, donc $C=3$. $y(x)=3e^x+2$.' },
      { n: 'b', text: 'Comme $e^x\\to+\\infty$, $\\displaystyle\\lim_{x\\to+\\infty}y(x)=+\\infty$.' },
    ],
    result: '$y(x)=3e^x+2$ ; $\\lim_{+\\infty}=+\\infty$.',
  },
  'equadiff-13': {
    steps: [
      { n: 'a', text: '$a=-\\tfrac{1}{2}$, $b=2$ : $y=Ce^{-x/2}+4$ (équilibre $-\\tfrac{2}{-1/2}=4$). Condition : $y(0)=C+4=10$, donc $C=6$. $y(x)=6e^{-x/2}+4$.' },
      { n: 'b', text: 'Comme $e^{-x/2}\\to 0$, $y(x)\\to 4$ : la solution converge vers l\'équilibre.' },
    ],
    result: '$y(x)=6e^{-x/2}+4$ ; $\\lim_{+\\infty}=4$.',
  },
  'equadiff-14': {
    steps: [
      { n: 'a', text: '$P=Ce^{0{,}02t}$ ; $P(0)=C=1000$, donc $P(t)=1000e^{0{,}02t}$.' },
      { n: 'b', text: '$P(50)=1000e^{1}=1000e\\approx 2718$.' },
    ],
    result: '$P(t)=1000e^{0{,}02t}$ ; $P(50)\\approx 2718$.',
  },
  'equadiff-15': {
    steps: [
      { n: 'a', text: '$a=-2$, $b=10$ : $u=Ce^{-2t}+5$ (équilibre $\\tfrac{10}{2}=5$). $u(0)=C+5=0\\Rightarrow C=-5$. Donc $u(t)=-5e^{-2t}+5=5\\bigl(1-e^{-2t}\\bigr)$.' },
      { n: 'b', text: 'Comme $e^{-2t}\\to 0$, $\\displaystyle\\lim_{t\\to+\\infty}u(t)=5$.' },
    ],
    result: '$u(t)=5(1-e^{-2t})$ ; $\\lim_{+\\infty}=5$.',
  },
  'equadiff-16': {
    steps: [
      { n: 'a', text: '$a=-2$, $b=8$ : les solutions sont $y=Ce^{-2x}+4$ ($C\\in\\mathbb{R}$), car $-\\tfrac{b}{a}=-\\tfrac{8}{-2}=4$.' },
      { n: 'b', text: 'Solution d\'équilibre : la constante $y=4$.' },
      { n: 'c', text: '$f(0)=C+4=1\\Rightarrow C=-3$. Donc $f(x)=-3e^{-2x}+4$.' },
      { n: 'd', text: '$f\'(x)=-3\\times(-2)e^{-2x}=6e^{-2x}>0$ : $f$ est **strictement croissante**. Comme $e^{-2x}\\to 0$, $\\displaystyle\\lim_{x\\to+\\infty}f(x)=4$.' },
    ],
    result: '$f(x)=-3e^{-2x}+4$ ; croissante ; $\\lim_{+\\infty}=4$.',
  },
  'equadiff-17': {
    steps: [
      { n: 'a', text: '$T\'=-0{,}04(T-22)=-0{,}04\\,T+0{,}04\\times 22=-0{,}04\\,T+0{,}88$.' },
      { n: 'b', text: 'Équilibre $\\dfrac{0{,}88}{0{,}04}=22$ ; solutions $T=Ce^{-0{,}04t}+22$. $T(0)=C+22=85\\Rightarrow C=63$. Donc $T(t)=63e^{-0{,}04t}+22$.' },
      { n: 'c', text: '$T(30)=63e^{-1{,}2}+22\\approx 63\\times 0{,}301+22\\approx 41{,}0°$.' },
      { n: 'd', text: 'Comme $e^{-0{,}04t}\\to 0$, $T(t)\\to 22$ : le thé tend vers la température de la pièce.' },
    ],
    result: '$T(t)=63e^{-0{,}04t}+22$ ; $T(30)\\approx 41{,}0°$ ; $\\lim=22°$.',
  },
  'equadiff-18': {
    steps: [
      { n: 'a', text: '$g=f-3$, donc $g\'=f\'$. Or $f\'=2f-6=2(f-3)=2g$. Donc $g\'=2g$ : $g$ est solution de $y\'=2y$.' },
      { n: 'b', text: 'Ainsi $g(x)=Ce^{2x}$. Or $g(0)=f(0)-3=1-3=-2$, donc $C=-2$ et $g(x)=-2e^{2x}$. Puis $f=g+3$, soit $f(x)=-2e^{2x}+3$.' },
      { n: 'c', text: 'Directement : $y\'=2y-6$ a pour solutions $y=Ce^{2x}+3$ (équilibre $-\\tfrac{-6}{2}=3$). $f(0)=C+3=1\\Rightarrow C=-2$, d\'où $f(x)=-2e^{2x}+3$. Même résultat. ✓' },
    ],
    result: '$f(x)=-2e^{2x}+3$.',
  },
};
