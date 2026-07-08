import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const EXPONENTIELLE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: '$(e^x)\'$ vaut…',
    options: [
      { label: 'a', text: '$e^x$ (l\'exponentielle est sa propre dérivée)' },
      { label: 'b', text: '$xe^{x-1}$' },
      { label: 'c', text: '$e^{x-1}$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: '$e^{a+b}$ est égal à…',
    options: [
      { label: 'a', text: '$e^a+e^b$' },
      { label: 'b', text: '$e^a\\times e^b$ (relation fonctionnelle)' },
      { label: 'c', text: '$e^{ab}$' },
      { label: 'd', text: '$e^a-e^b$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: '$(e^{2x})\'$ vaut…',
    options: [
      { label: 'a', text: '$e^{2x}$' },
      { label: 'b', text: '$2e^{2x}$ (car $(e^u)\'=u\'e^u$)' },
      { label: 'c', text: '$2xe^{2x}$' },
      { label: 'd', text: '$e^{2x-1}$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x}$ vaut…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$' },
      { label: 'c', text: '$+\\infty$ (croissances comparées)' },
      { label: 'd', text: '$-\\infty$' },
    ],
    answer: 'c',
  },
  {
    n: 5,
    text: '$e^x=1$ équivaut à…',
    options: [
      { label: 'a', text: '$x=1$' },
      { label: 'b', text: '$x=0$ (car $e^0=1$)' },
      { label: 'c', text: '$x=e$' },
      { label: 'd', text: 'aucune solution' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Pour tout réel $x$, $e^x$ est…',
    options: [
      { label: 'a', text: 'strictement positif' },
      { label: 'b', text: 'parfois nul' },
      { label: 'c', text: 'parfois négatif' },
      { label: 'd', text: 'supérieur ou égal à $1$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'La tangente à $\\exp$ au point d\'abscisse $0$ est…',
    options: [
      { label: 'a', text: '$y=x$' },
      { label: 'b', text: '$y=x+1$' },
      { label: 'c', text: '$y=1$' },
      { label: 'd', text: '$y=e^x$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: '$\\displaystyle\\lim_{x\\to-\\infty}e^x$ vaut…',
    options: [
      { label: 'a', text: '$-\\infty$' },
      { label: 'b', text: '$0$ (asymptote horizontale)' },
      { label: 'c', text: '$1$' },
      { label: 'd', text: '$+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: '$(e^{-x})\'$ vaut…',
    options: [
      { label: 'a', text: '$e^{-x}$' },
      { label: 'b', text: '$-e^{-x}$ (car $u\'=-1$)' },
      { label: 'c', text: '$-xe^{-x}$' },
      { label: 'd', text: '$e^{-x-1}$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Une primitive de $e^{3x}$ est…',
    options: [
      { label: 'a', text: '$3e^{3x}$' },
      { label: 'b', text: '$\\tfrac{1}{3}e^{3x}$ (primitive de $e^{ax}$ : $\\tfrac{1}{a}e^{ax}$)' },
      { label: 'c', text: '$e^{3x}$' },
      { label: 'd', text: '$\\dfrac{e^{3x}}{x}$' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const EXPONENTIELLE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'exponentielle-1',
    context: 'Utiliser les propriétés algébriques de l\'exponentielle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Simplifier $e^3\\times e^{-1}$.' },
        { n: 'b', text: 'Simplifier $\\dfrac{e^5}{e^2}$.' },
        { n: 'c', text: 'Simplifier $(e^2)^3$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-2',
    context: 'Rappel : $(e^u)\'=u\'e^u$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=e^{3x}$.' },
        { n: 'b', text: 'Dériver $g(x)=e^{-x^2}$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-3',
    context: 'L\'exponentielle est strictement croissante : $e^A=e^B\\iff A=B$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $e^{2x}=e^{x+3}$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-4',
    context: 'Croissances comparées : l\'exponentielle l\'emporte sur toute puissance de $x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^2}$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'exponentielle-5',
    context: 'Écrire chaque expression sous la forme $e^{kx}$.',
    parts: [{
      questions: [
        { n: 'a', text: '$A=\\dfrac{e^x\\times e^{2x}}{e^{-x}}$.' },
        { n: 'b', text: '$B=(e^x)^2\\times e^{-x}$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-6',
    context: 'Identité remarquable et exponentielle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que pour tout réel $x$, $e^{2x}-1=(e^x-1)(e^x+1)$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-7',
    context: 'Dérivée d\'un produit avec exponentielle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=(2x-1)e^x$ et factoriser le résultat.' },
      ],
    }],
  },
  {
    id: 'exponentielle-8',
    context: 'Dérivée d\'un quotient avec exponentielle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=\\dfrac{e^x}{x}$ sur $]0\\,;+\\infty[$ et factoriser.' },
      ],
    }],
  },
  {
    id: 'exponentielle-9',
    context: 'Dérivée d\'un produit avec exponentielle composée.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dériver $f(x)=x^2e^{-x}$ et factoriser le résultat.' },
      ],
    }],
  },
  {
    id: 'exponentielle-10',
    context: 'Indication : poser $X=e^x$ ($X>0$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $e^{2x}-4e^x+3=0$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-11',
    context: 'Se ramener à $e^A=e^B$ avec $1=e^0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $e^{x^2-1}=1$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-12',
    context: 'L\'exponentielle étant strictement croissante, l\'ordre des exposants est conservé.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $e^{-x}<e^2$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-13',
    context: 'Croissances comparées en $-\\infty$ : $x^ne^x\\to 0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to-\\infty}x^2e^x$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-14',
    context: 'Rappel : $\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{x}=1$ (nombre dérivé de $\\exp$ en $0$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{2x}$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-15',
    context: 'Soit $f(x)=(x-1)e^x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'(x)$, étudier son signe et dresser le tableau de variations. Préciser l\'extremum.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'exponentielle-16',
    context: 'Indication : factoriser par $e^x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $\\displaystyle\\lim_{x\\to+\\infty}\\bigl(e^x-x^3\\bigr)$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-17',
    context: 'Soit $f(x)=e^x-x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Étudier ses variations et en déduire que $e^x\\geq x+1$ pour tout réel $x$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-18',
    context: 'Soit $f(x)=x\\,e^{-x}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $f\'$, les variations, l\'extremum, et les limites en $-\\infty$ et $+\\infty$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'exponentielle-19',
    context: 'Soit $f$ définie sur $\\mathbb{R}$ par $f(x)=(x+1)e^{-x}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'(x)$ et montrer que $f\'(x)=-x\\,e^{-x}$.' },
        { n: 'b', text: 'Étudier le signe de $f\'$ et dresser le tableau de variations. Préciser l\'extremum.' },
        { n: 'c', text: 'Déterminer les limites de $f$ en $-\\infty$ et $+\\infty$.' },
        { n: 'd', text: 'Donner l\'équation de la tangente à $\\mathcal{C}_f$ au point d\'abscisse $0$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-20',
    context: 'Soit $f(x)=e^{2x}-3e^x+2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $f(x)=(e^x-1)(e^x-2)$.' },
        { n: 'b', text: 'Résoudre $f(x)=0$.' },
        { n: 'c', text: 'Étudier le signe de $f(x)$ sur $\\mathbb{R}$.' },
      ],
    }],
  },
  {
    id: 'exponentielle-21',
    context: 'Soit $f(x)=x\\,e^x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f\'(x)$, étudier son signe et préciser l\'extremum de $f$.' },
        { n: 'b', text: 'Montrer que $F(x)=(x-1)e^x$ est une primitive de $f$ sur $\\mathbb{R}$.' },
        { n: 'c', text: 'En déduire la valeur de $\\displaystyle\\int_0^1 x\\,e^x\\,\\mathrm{d}x$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const EXPONENTIELLE_CORRECTIONS: Record<string, Correction> = {
  'exponentielle-1': {
    steps: [
      { n: 'a', text: '$e^3\\times e^{-1}=e^{3-1}=e^2$.' },
      { n: 'b', text: '$\\dfrac{e^5}{e^2}=e^{5-2}=e^3$.' },
      { n: 'c', text: '$(e^2)^3=e^{2\\times 3}=e^6$.' },
    ],
    result: '$e^2$ ; $e^3$ ; $e^6$.',
  },
  'exponentielle-2': {
    steps: [
      { n: 'a', text: '$f\'(x)=3e^{3x}$ ($u=3x$, $u\'=3$).' },
      { n: 'b', text: '$g\'(x)=-2x\\,e^{-x^2}$ ($u=-x^2$, $u\'=-2x$).' },
    ],
    result: '$f\'(x)=3e^{3x}$ ; $g\'(x)=-2xe^{-x^2}$.',
  },
  'exponentielle-3': {
    steps: [
      { n: '1', text: '$e^{2x}=e^{x+3}\\iff 2x=x+3\\iff x=3$.' },
    ],
    result: '$x=3$.',
  },
  'exponentielle-4': {
    steps: [
      { n: '1', text: 'Par croissances comparées, $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^2}=+\\infty$.' },
    ],
    result: '$=+\\infty$.',
  },
  'exponentielle-5': {
    steps: [
      { n: 'a', text: '$A=\\dfrac{e^x\\times e^{2x}}{e^{-x}}=e^{x+2x-(-x)}=e^{4x}$.' },
      { n: 'b', text: '$B=(e^x)^2\\times e^{-x}=e^{2x}\\times e^{-x}=e^x$.' },
    ],
    result: '$A=e^{4x}$ ; $B=e^x$.',
  },
  'exponentielle-6': {
    steps: [
      { n: '1', text: '$(e^x-1)(e^x+1)=(e^x)^2-1^2=e^{2x}-1$ (identité remarquable). ✓' },
    ],
    result: '$e^{2x}-1=(e^x-1)(e^x+1)$ pour tout $x$.',
  },
  'exponentielle-7': {
    steps: [
      { n: '1', text: '$f\'(x)=2\\cdot e^x+(2x-1)\\cdot e^x=(2+2x-1)e^x=(2x+1)e^x$.' },
    ],
    result: '$f\'(x)=(2x+1)e^x$.',
  },
  'exponentielle-8': {
    steps: [
      { n: '1', text: '$f\'(x)=\\dfrac{e^x\\cdot x-e^x\\cdot 1}{x^2}=\\dfrac{(x-1)e^x}{x^2}$.' },
    ],
    result: '$f\'(x)=\\dfrac{(x-1)e^x}{x^2}$.',
  },
  'exponentielle-9': {
    steps: [
      { n: '1', text: '$f\'(x)=2x\\,e^{-x}+x^2\\cdot(-e^{-x})=(2x-x^2)e^{-x}=x(2-x)e^{-x}$.' },
    ],
    result: '$f\'(x)=x(2-x)e^{-x}$.',
  },
  'exponentielle-10': {
    steps: [
      { n: '1', text: 'On pose $X=e^x>0$ : $X^2-4X+3=0$, soit $(X-1)(X-3)=0$, d\'où $X=1$ ou $X=3$.' },
      { n: '2', text: 'Donc $e^x=1$ ($x=0$) ou $e^x=3$ ($x=\\ln 3$).' },
    ],
    result: '$x=0$ ou $x=\\ln 3$.',
  },
  'exponentielle-11': {
    steps: [
      { n: '1', text: '$e^{x^2-1}=1=e^0\\iff x^2-1=0\\iff x=1$ ou $x=-1$.' },
    ],
    result: '$x=\\pm 1$.',
  },
  'exponentielle-12': {
    steps: [
      { n: '1', text: '$e^{-x}<e^2$. L\'exponentielle étant strictement croissante : $-x<2\\iff x>-2$.' },
    ],
    result: '$x>-2$, soit $x\\in\\,]-2\\,;+\\infty[$.',
  },
  'exponentielle-13': {
    steps: [
      { n: '1', text: 'Forme indéterminée $\\infty\\times 0$. Par croissances comparées ($x^ne^x\\to 0$ en $-\\infty$), $\\displaystyle\\lim_{x\\to-\\infty}x^2e^x=0$.' },
    ],
    result: '$=0$.',
  },
  'exponentielle-14': {
    steps: [
      { n: '1', text: '$\\dfrac{e^x-1}{2x}=\\dfrac{1}{2}\\cdot\\dfrac{e^x-1}{x}$. Or $\\dfrac{e^x-1}{x}\\to 1$ en $0$, donc $\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{2x}=\\dfrac{1}{2}$.' },
    ],
    result: '$=\\dfrac{1}{2}$.',
  },
  'exponentielle-15': {
    steps: [
      { n: '1', text: '$f\'(x)=1\\cdot e^x+(x-1)e^x=x\\,e^x$. Comme $e^x>0$, $f\'(x)$ a le signe de $x$.' },
      { n: '2', text: '$f$ décroît sur $]-\\infty\\,;0]$, croît sur $[0\\,;+\\infty[$. Elle admet un **minimum** en $x=0$, valant $f(0)=(0-1)\\times 1=-1$.' },
    ],
    result: 'Min en $0$ : $f(0)=-1$.',
  },
  'exponentielle-16': {
    steps: [
      { n: '1', text: 'On factorise : $e^x-x^3=e^x\\left(1-\\dfrac{x^3}{e^x}\\right)$. Par croissances comparées, $\\dfrac{x^3}{e^x}\\to 0$, donc le facteur tend vers $1$, et $e^x\\to+\\infty$.' },
    ],
    result: '$\\displaystyle\\lim_{x\\to+\\infty}(e^x-x^3)=+\\infty$.',
  },
  'exponentielle-17': {
    steps: [
      { n: '1', text: '$f\'(x)=e^x-1$. $f\'(x)>0\\iff e^x>1\\iff x>0$. Donc $f$ décroît sur $]-\\infty\\,;0]$ et croît sur $[0\\,;+\\infty[$ : elle admet un minimum en $0$, $f(0)=e^0-0=1$.' },
      { n: '2', text: 'Ainsi $f(x)\\geq 1$ pour tout $x$, c\'est-à-dire $e^x-x\\geq 1$, soit $e^x\\geq x+1$.' },
    ],
    result: '$e^x\\geq x+1$ pour tout $x$.',
  },
  'exponentielle-18': {
    steps: [
      { n: '1', text: '$f\'(x)=1\\cdot e^{-x}+x(-e^{-x})=(1-x)e^{-x}$. Comme $e^{-x}>0$, $f\'(x)$ a le signe de $1-x$ : $f$ croît sur $]-\\infty\\,;1]$, décroît sur $[1\\,;+\\infty[$, avec un **maximum** en $x=1$ : $f(1)=e^{-1}=\\dfrac{1}{e}$.' },
      { n: '2', text: 'Limites : $\\displaystyle\\lim_{x\\to-\\infty}xe^{-x}=-\\infty$ (car $e^{-x}\\to+\\infty$ et $x\\to-\\infty$) ; $\\displaystyle\\lim_{x\\to+\\infty}xe^{-x}=0^+$ (croissances comparées).' },
    ],
    result: 'Max en $1$ : $f(1)=\\dfrac{1}{e}$ ; $\\lim_{-\\infty}=-\\infty$ ; $\\lim_{+\\infty}=0^+$.',
  },
  'exponentielle-19': {
    steps: [
      { n: 'a', text: '$f\'(x)=1\\cdot e^{-x}+(x+1)\\cdot(-e^{-x})=\\bigl(1-(x+1)\\bigr)e^{-x}=-x\\,e^{-x}$.' },
      { n: 'b', text: '$e^{-x}>0$, donc $f\'(x)$ a le signe de $-x$ : $f\'>0$ pour $x<0$, $f\'<0$ pour $x>0$. $f$ croît sur $]-\\infty\\,;0]$, décroît sur $[0\\,;+\\infty[$, avec un **maximum** en $0$ : $f(0)=1$.' },
      { n: 'c', text: '$\\displaystyle\\lim_{x\\to-\\infty}f(x)=-\\infty$ ($x+1\\to-\\infty$, $e^{-x}\\to+\\infty$) ; $\\displaystyle\\lim_{x\\to+\\infty}f(x)=0^+$ (croissances comparées).' },
      { n: 'd', text: '$f(0)=1$ et $f\'(0)=0$, donc la tangente est $y=f\'(0)(x-0)+f(0)=1$ : la droite horizontale $y=1$.' },
    ],
    result: 'Max $f(0)=1$ ; $\\lim_{-\\infty}=-\\infty$, $\\lim_{+\\infty}=0^+$ ; tangente $y=1$.',
  },
  'exponentielle-20': {
    steps: [
      { n: 'a', text: '$(e^x-1)(e^x-2)=(e^x)^2-2e^x-e^x+2=e^{2x}-3e^x+2=f(x)$. ✓' },
      { n: 'b', text: '$f(x)=0\\iff e^x=1$ ou $e^x=2\\iff x=0$ ou $x=\\ln 2$.' },
      { n: 'c', text: '$e^x-1>0\\iff x>0$ et $e^x-2>0\\iff x>\\ln 2$. Tableau de signes du produit : $f>0$ sur $]-\\infty\\,;0[$, $f<0$ sur $]0\\,;\\ln 2[$, $f>0$ sur $]\\ln 2\\,;+\\infty[$. $f$ s\'annule en $x=0$ et $x=\\ln 2$.' },
    ],
    result: 'Racines $0$ et $\\ln 2$ ; $f>0$ sauf sur $]0\\,;\\ln 2[$.',
  },
  'exponentielle-21': {
    steps: [
      { n: 'a', text: '$f\'(x)=e^x+xe^x=(x+1)e^x$. Signe de $x+1$ : $f$ décroît sur $]-\\infty\\,;-1]$, croît sur $[-1\\,;+\\infty[$, avec un **minimum** en $-1$ : $f(-1)=-e^{-1}=-\\dfrac{1}{e}$.' },
      { n: 'b', text: '$F\'(x)=e^x+(x-1)e^x=(1+x-1)e^x=xe^x=f(x)$, donc $F$ est une primitive de $f$.' },
      { n: 'c', text: '$\\displaystyle\\int_0^1 xe^x\\,\\mathrm{d}x=\\bigl[(x-1)e^x\\bigr]_0^1=(0)\\cdot e-(-1)\\cdot 1=0-(-1)=1$.' },
    ],
    result: 'Min $f(-1)=-\\dfrac{1}{e}$ ; $\\displaystyle\\int_0^1 xe^x\\,\\mathrm{d}x=1$.',
  },
};
