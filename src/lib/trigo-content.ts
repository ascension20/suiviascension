import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const TRIGO_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: '$(\\sin x)\'$ vaut…',
    options: [
      { label: 'a', text: '$\\cos x$' },
      { label: 'b', text: '$-\\cos x$' },
      { label: 'c', text: '$-\\sin x$' },
      { label: 'd', text: '$\\sin x$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: '$(\\cos x)\'$ vaut…',
    options: [
      { label: 'a', text: '$\\sin x$' },
      { label: 'b', text: '$-\\sin x$ (ne pas oublier le signe moins)' },
      { label: 'c', text: '$\\cos x$' },
      { label: 'd', text: '$-\\cos x$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: '$\\cos\\dfrac{\\pi}{3}$ vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{1}{2}$' },
      { label: 'b', text: '$\\dfrac{\\sqrt{3}}{2}$' },
      { label: 'c', text: '$\\dfrac{\\sqrt{2}}{2}$' },
      { label: 'd', text: '$0$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: '$\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{x}$ vaut…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$ (limite de référence)' },
      { label: 'c', text: '$+\\infty$' },
      { label: 'd', text: '$\\pi$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La période de la fonction sinus est…',
    options: [
      { label: 'a', text: '$\\pi$' },
      { label: 'b', text: '$2\\pi$' },
      { label: 'c', text: '$\\dfrac{\\pi}{2}$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'La fonction cosinus est…',
    options: [
      { label: 'a', text: 'paire (car $\\cos(-x)=\\cos x$)' },
      { label: 'b', text: 'impaire' },
      { label: 'c', text: 'ni paire ni impaire' },
      { label: 'd', text: 'de période $\\pi$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: '$(\\sin(2x))\'$ vaut…',
    options: [
      { label: 'a', text: '$\\cos(2x)$' },
      { label: 'b', text: '$2\\cos(2x)$ (car $(\\sin u)\'=u\'\\cos u$)' },
      { label: 'c', text: '$-2\\sin(2x)$' },
      { label: 'd', text: '$2\\cos x$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: '$\\sin(-x)$ est égal à…',
    options: [
      { label: 'a', text: '$\\sin x$' },
      { label: 'b', text: '$-\\sin x$ (sinus est impaire)' },
      { label: 'c', text: '$\\cos x$' },
      { label: 'd', text: '$-\\cos x$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'L\'équation $\\cos x=1$ sur $[0\\,;2\\pi[$ a pour solution…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$\\pi$' },
      { label: 'c', text: '$\\dfrac{\\pi}{2}$' },
      { label: 'd', text: '$0$ et $\\pi$' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'Une primitive de $\\cos x$ est…',
    options: [
      { label: 'a', text: '$\\sin x$' },
      { label: 'b', text: '$-\\sin x$' },
      { label: 'c', text: '$\\cos x$' },
      { label: 'd', text: '$-\\cos x$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const TRIGO_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'trigo-1',
    context: 'Utiliser les angles associés et les valeurs remarquables du cercle trigonométrique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner la valeur exacte de $\\cos\\dfrac{2\\pi}{3}$.' },
        { n: 'b', text: 'Donner la valeur exacte de $\\sin\\dfrac{5\\pi}{6}$.' },
        { n: 'c', text: 'Donner la valeur exacte de $\\cos\\left(-\\dfrac{\\pi}{4}\\right)$.' },
        { n: 'd', text: 'Donner la valeur exacte de $\\sin\\dfrac{3\\pi}{4}$.' },
      ],
    }],
  },
  {
    id: 'trigo-2',
    context: 'Rappels : $(\\sin u)\'=u\'\\cos u$ et $(\\cos u)\'=-u\'\\sin u$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=\\sin(3x)$.' },
        { n: 'b', text: 'Dériver $g(x)=\\cos(2x)$.' },
        { n: 'c', text: 'Dériver $h(x)=\\sin x+\\cos x$.' },
      ],
    }],
  },
  {
    id: 'trigo-3',
    context: 'Limite de référence : $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{x}=1$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(2x)}{x}$.' },
      ],
    }],
  },
  {
    id: 'trigo-4',
    context: 'Équation de référence : $\\cos x=\\cos\\alpha\\iff x=\\pm\\alpha+2k\\pi$ ($k\\in\\mathbb{Z}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $\\cos x=\\dfrac{\\sqrt{2}}{2}$ sur $[0\\,;2\\pi[$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'trigo-5',
    context: 'Utiliser les formules d\'angles associés.',
    parts: [{
      questions: [
        { n: 'a', text: 'Simplifier $A=\\cos(-x)+\\sin\\left(\\dfrac{\\pi}{2}-x\\right)$.' },
        { n: 'b', text: 'Simplifier $B=\\sin(\\pi-x)-\\sin(-x)$.' },
      ],
    }],
  },
  {
    id: 'trigo-6',
    context: 'Les formules d\'angles associés se retrouvent avec les symétries du cercle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que pour tout réel $x$, $\\cos\\left(\\dfrac{\\pi}{2}+x\\right)=-\\sin x$.' },
      ],
    }],
  },
  {
    id: 'trigo-7',
    context: 'Dérivée d\'un produit.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=x\\sin x$.' },
      ],
    }],
  },
  {
    id: 'trigo-8',
    context: 'Dérivée d\'une composée avec $u=x^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=\\cos(x^2)$.' },
      ],
    }],
  },
  {
    id: 'trigo-9',
    context: 'On rappelle la formule de duplication : $\\sin(2x)=2\\sin x\\cos x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=\\sin^2 x$ et exprimer le résultat à l\'aide de $\\sin(2x)$.' },
      ],
    }],
  },
  {
    id: 'trigo-10',
    context: 'Faire apparaître le quotient $\\dfrac{\\sin(\\bullet)}{\\bullet}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin(5x)}{3x}$.' },
      ],
    }],
  },
  {
    id: 'trigo-11',
    context: 'Même limite de référence, avec un facteur constant.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{2x}$.' },
      ],
    }],
  },
  {
    id: 'trigo-12',
    context: 'Équation de référence : $\\sin x=\\sin\\alpha\\iff x=\\alpha+2k\\pi$ ou $x=\\pi-\\alpha+2k\\pi$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $\\sin x=\\dfrac{1}{2}$ sur $[0\\,;2\\pi[$.' },
      ],
    }],
  },
  {
    id: 'trigo-13',
    context: 'Penser aux angles associés pour écrire $-\\dfrac{1}{2}$ comme un cosinus remarquable.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $\\cos x=-\\dfrac{1}{2}$ sur $[0\\,;2\\pi[$.' },
      ],
    }],
  },
  {
    id: 'trigo-14',
    context: 'Soit $f(x)=\\cos x$ sur $[0\\,;2\\pi]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'$, étudier son signe, dresser le tableau de variations et préciser les extrema.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'trigo-15',
    context: 'Commencer par isoler le sinus.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $2\\sin x-1=0$ sur $[0\\,;2\\pi[$.' },
      ],
    }],
  },
  {
    id: 'trigo-16',
    context: 'Soit $f(x)=\\sin(2x)$ sur $[0\\,;\\pi]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'$ et déterminer les variations et les extrema.' },
      ],
    }],
  },
  {
    id: 'trigo-17',
    context: 'Soit $f(x)=x+\\sin x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $f$ est croissante sur $\\mathbb{R}$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'trigo-18',
    context: 'Soit $f(x)=\\sin x+\\cos x$ sur $[0\\,;2\\pi[$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'(x)$.' },
        { n: 'b', text: 'Résoudre $f\'(x)=0$ sur $[0\\,;2\\pi[$.' },
        { n: 'c', text: 'Étudier le signe de $f\'$ et dresser le tableau de variations.' },
        { n: 'd', text: 'Préciser le maximum et le minimum de $f$.' },
      ],
    }],
  },
  {
    id: 'trigo-19',
    context: 'Indication : poser $X=\\cos x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre l\'équation $2\\cos^2 x-\\cos x-1=0$ sur $[0\\,;2\\pi[$.' },
      ],
    }],
  },
  {
    id: 'trigo-20',
    context: 'Soit $f(x)=x-\\sin x$ sur $[0\\,;2\\pi]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'(x)$ et étudier son signe.' },
        { n: 'b', text: 'En déduire les variations de $f$, puis que $f(x)\\geq 0$ sur $[0\\,;2\\pi]$.' },
        { n: 'c', text: 'Conclure : que peut-on dire de $\\sin x$ par rapport à $x$ sur $[0\\,;2\\pi]$ ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const TRIGO_CORRECTIONS: Record<string, Correction> = {
  'trigo-1': {
    steps: [
      { n: 'a', text: '$\\cos\\dfrac{2\\pi}{3}=\\cos\\left(\\pi-\\dfrac{\\pi}{3}\\right)=-\\cos\\dfrac{\\pi}{3}=-\\dfrac{1}{2}$.' },
      { n: 'b', text: '$\\sin\\dfrac{5\\pi}{6}=\\sin\\left(\\pi-\\dfrac{\\pi}{6}\\right)=\\sin\\dfrac{\\pi}{6}=\\dfrac{1}{2}$.' },
      { n: 'c', text: '$\\cos\\left(-\\dfrac{\\pi}{4}\\right)=\\cos\\dfrac{\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$ (cosinus est paire).' },
      { n: 'd', text: '$\\sin\\dfrac{3\\pi}{4}=\\sin\\left(\\pi-\\dfrac{\\pi}{4}\\right)=\\dfrac{\\sqrt{2}}{2}$.' },
    ],
    result: '$-\\dfrac{1}{2}$ ; $\\dfrac{1}{2}$ ; $\\dfrac{\\sqrt{2}}{2}$ ; $\\dfrac{\\sqrt{2}}{2}$.',
  },
  'trigo-2': {
    steps: [
      { n: 'a', text: '$f\'(x)=3\\cos(3x)$.' },
      { n: 'b', text: '$g\'(x)=-2\\sin(2x)$.' },
      { n: 'c', text: '$h\'(x)=\\cos x-\\sin x$.' },
    ],
    result: '$3\\cos(3x)$ ; $-2\\sin(2x)$ ; $\\cos x-\\sin x$.',
  },
  'trigo-3': {
    steps: [
      { n: '1', text: '$\\dfrac{\\sin(2x)}{x}=2\\cdot\\dfrac{\\sin(2x)}{2x}\\to 2\\times 1=2$.' },
    ],
    result: '$=2$.',
  },
  'trigo-4': {
    steps: [
      { n: '1', text: '$\\cos x=\\dfrac{\\sqrt{2}}{2}=\\cos\\dfrac{\\pi}{4}$, donc $x=\\dfrac{\\pi}{4}$ ou $x=-\\dfrac{\\pi}{4}+2\\pi=\\dfrac{7\\pi}{4}$.' },
    ],
    result: '$\\left\\{\\dfrac{\\pi}{4},\\dfrac{7\\pi}{4}\\right\\}$.',
  },
  'trigo-5': {
    steps: [
      { n: 'a', text: '$A=\\cos(-x)+\\sin\\left(\\dfrac{\\pi}{2}-x\\right)=\\cos x+\\cos x=2\\cos x$.' },
      { n: 'b', text: '$B=\\sin(\\pi-x)-\\sin(-x)=\\sin x-(-\\sin x)=2\\sin x$.' },
    ],
    result: '$A=2\\cos x$ ; $B=2\\sin x$.',
  },
  'trigo-6': {
    steps: [
      { n: '1', text: 'Le point du cercle associé à $\\dfrac{\\pi}{2}+x$ s\'obtient par rotation d\'un quart de tour de celui associé à $x$ : son abscisse devient l\'opposé de l\'ordonnée de départ.' },
      { n: '2', text: 'Donc $\\cos\\left(\\dfrac{\\pi}{2}+x\\right)=-\\sin x$. (On retrouve la formule d\'angle associé.)' },
    ],
    result: '$\\cos\\left(\\dfrac{\\pi}{2}+x\\right)=-\\sin x$ pour tout $x$.',
  },
  'trigo-7': {
    steps: [
      { n: '1', text: '$f\'(x)=1\\cdot\\sin x+x\\cdot\\cos x=\\sin x+x\\cos x$.' },
    ],
    result: '$f\'(x)=\\sin x+x\\cos x$.',
  },
  'trigo-8': {
    steps: [
      { n: '1', text: 'Avec $u=x^2$, $u\'=2x$ : $f\'(x)=-u\'\\sin(u)=-2x\\sin(x^2)$.' },
    ],
    result: '$f\'(x)=-2x\\sin(x^2)$.',
  },
  'trigo-9': {
    steps: [
      { n: '1', text: '$f=(\\sin x)^2$, donc $f\'(x)=2\\sin x\\cdot(\\sin x)\'=2\\sin x\\cos x=\\sin(2x)$.' },
    ],
    result: '$f\'(x)=\\sin(2x)$.',
  },
  'trigo-10': {
    steps: [
      { n: '1', text: '$\\dfrac{\\sin(5x)}{3x}=\\dfrac{5}{3}\\cdot\\dfrac{\\sin(5x)}{5x}\\to\\dfrac{5}{3}\\times 1=\\dfrac{5}{3}$.' },
    ],
    result: '$=\\dfrac{5}{3}$.',
  },
  'trigo-11': {
    steps: [
      { n: '1', text: '$\\dfrac{\\sin x}{2x}=\\dfrac{1}{2}\\cdot\\dfrac{\\sin x}{x}\\to\\dfrac{1}{2}\\times 1=\\dfrac{1}{2}$.' },
    ],
    result: '$=\\dfrac{1}{2}$.',
  },
  'trigo-12': {
    steps: [
      { n: '1', text: '$\\sin x=\\dfrac{1}{2}=\\sin\\dfrac{\\pi}{6}$, donc $x=\\dfrac{\\pi}{6}$ ou $x=\\pi-\\dfrac{\\pi}{6}=\\dfrac{5\\pi}{6}$.' },
    ],
    result: '$\\left\\{\\dfrac{\\pi}{6},\\dfrac{5\\pi}{6}\\right\\}$.',
  },
  'trigo-13': {
    steps: [
      { n: '1', text: '$\\cos x=-\\dfrac{1}{2}=\\cos\\dfrac{2\\pi}{3}$, donc $x=\\dfrac{2\\pi}{3}$ ou $x=-\\dfrac{2\\pi}{3}+2\\pi=\\dfrac{4\\pi}{3}$.' },
    ],
    result: '$\\left\\{\\dfrac{2\\pi}{3},\\dfrac{4\\pi}{3}\\right\\}$.',
  },
  'trigo-14': {
    steps: [
      { n: '1', text: '$f\'(x)=-\\sin x$. Sur $[0\\,;\\pi]$, $\\sin x\\geq 0$ donc $f\'\\leq 0$ : $f$ décroît. Sur $[\\pi\\,;2\\pi]$, $\\sin x\\leq 0$ donc $f\'\\geq 0$ : $f$ croît.' },
      { n: '2', text: 'Maximum $1$ en $0$ et $2\\pi$, minimum $-1$ en $\\pi$.' },
    ],
    result: 'Max $1$ en $0$ et $2\\pi$ ; min $-1$ en $\\pi$.',
  },
  'trigo-15': {
    steps: [
      { n: '1', text: '$2\\sin x-1=0\\iff\\sin x=\\dfrac{1}{2}$, d\'où $x=\\dfrac{\\pi}{6}$ ou $x=\\dfrac{5\\pi}{6}$.' },
    ],
    result: '$\\left\\{\\dfrac{\\pi}{6},\\dfrac{5\\pi}{6}\\right\\}$.',
  },
  'trigo-16': {
    steps: [
      { n: '1', text: '$f\'(x)=2\\cos(2x)$. Sur $[0\\,;\\pi]$, $2x\\in[0\\,;2\\pi]$, et $\\cos(2x)>0$ pour $2x\\in\\left[0\\,;\\tfrac{\\pi}{2}\\right[\\,\\cup\\,\\left]\\tfrac{3\\pi}{2}\\,;2\\pi\\right]$, soit $x\\in\\left[0\\,;\\tfrac{\\pi}{4}\\right[\\,\\cup\\,\\left]\\tfrac{3\\pi}{4}\\,;\\pi\\right]$.' },
      { n: '2', text: 'Donc $f$ croît sur $\\left[0\\,;\\tfrac{\\pi}{4}\\right]$, décroît sur $\\left[\\tfrac{\\pi}{4}\\,;\\tfrac{3\\pi}{4}\\right]$, croît sur $\\left[\\tfrac{3\\pi}{4}\\,;\\pi\\right]$. Maximum $1$ en $\\tfrac{\\pi}{4}$, minimum $-1$ en $\\tfrac{3\\pi}{4}$.' },
    ],
    result: 'Max $1$ en $\\dfrac{\\pi}{4}$ ; min $-1$ en $\\dfrac{3\\pi}{4}$.',
  },
  'trigo-17': {
    steps: [
      { n: '1', text: '$f\'(x)=1+\\cos x$. Comme $\\cos x\\geq-1$, on a $f\'(x)\\geq 0$ (avec $f\'(x)=0$ seulement en des points isolés $x=\\pi+2k\\pi$).' },
      { n: '2', text: 'Donc $f$ est **croissante sur $\\mathbb{R}$**.' },
    ],
    result: '$f$ croissante sur $\\mathbb{R}$.',
  },
  'trigo-18': {
    steps: [
      { n: 'a', text: '$f\'(x)=\\cos x-\\sin x$.' },
      { n: 'b', text: '$f\'(x)=0\\iff\\cos x=\\sin x$. Sur $[0\\,;2\\pi[$, en divisant par $\\cos x$ ($\\neq 0$), $\\tan x=1$, d\'où $x=\\dfrac{\\pi}{4}$ ou $x=\\dfrac{5\\pi}{4}$.' },
      { n: 'c', text: '$f\'(0)=1>0$, $f\'(\\pi)=-1<0$, $f\'\\left(\\tfrac{3\\pi}{2}\\right)=1>0$. Donc $f$ croît sur $\\left[0\\,;\\tfrac{\\pi}{4}\\right]$, décroît sur $\\left[\\tfrac{\\pi}{4}\\,;\\tfrac{5\\pi}{4}\\right]$, croît sur $\\left[\\tfrac{5\\pi}{4}\\,;2\\pi\\right[$.' },
      { n: 'd', text: 'Maximum en $\\tfrac{\\pi}{4}$ : $f\\left(\\tfrac{\\pi}{4}\\right)=\\dfrac{\\sqrt{2}}{2}+\\dfrac{\\sqrt{2}}{2}=\\sqrt{2}$. Minimum en $\\tfrac{5\\pi}{4}$ : $f\\left(\\tfrac{5\\pi}{4}\\right)=-\\sqrt{2}$.' },
    ],
    result: 'Max $\\sqrt{2}$ en $\\dfrac{\\pi}{4}$ ; min $-\\sqrt{2}$ en $\\dfrac{5\\pi}{4}$.',
  },
  'trigo-19': {
    steps: [
      { n: '1', text: 'On pose $X=\\cos x$ : $2X^2-X-1=0$. Discriminant $\\Delta=1+8=9$, $\\sqrt{\\Delta}=3$, d\'où $X=\\dfrac{1\\pm 3}{4}$, soit $X=1$ ou $X=-\\dfrac{1}{2}$.' },
      { n: '2', text: '$\\cos x=1\\Rightarrow x=0$ (sur $[0\\,;2\\pi[$). $\\cos x=-\\dfrac{1}{2}=\\cos\\dfrac{2\\pi}{3}\\Rightarrow x=\\dfrac{2\\pi}{3}$ ou $x=\\dfrac{4\\pi}{3}$.' },
    ],
    result: '$\\left\\{0,\\dfrac{2\\pi}{3},\\dfrac{4\\pi}{3}\\right\\}$.',
  },
  'trigo-20': {
    steps: [
      { n: 'a', text: '$f\'(x)=1-\\cos x$. Comme $\\cos x\\leq 1$, on a $f\'(x)\\geq 0$ sur $[0\\,;2\\pi]$ (avec égalité seulement en $0$ et $2\\pi$).' },
      { n: 'b', text: '$f\'\\geq 0$ donc $f$ est croissante sur $[0\\,;2\\pi]$. Or $f(0)=0-\\sin 0=0$, donc $f(x)\\geq f(0)=0$ pour tout $x\\in[0\\,;2\\pi]$.' },
      { n: 'c', text: '$f(x)\\geq 0$ signifie $x-\\sin x\\geq 0$, c\'est-à-dire $\\sin x\\leq x$ sur $[0\\,;2\\pi]$.' },
    ],
    result: '$\\sin x\\leq x$ sur $[0\\,;2\\pi]$.',
  },
};
