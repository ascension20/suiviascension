import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const PRIMITIVES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Une primitive de $f(x)=x^3$ est…',
    options: [
      { label: 'a', text: '$\\dfrac{x^4}{4}$ (car $(x^4/4)\'=x^3$)' },
      { label: 'b', text: '$3x^2$' },
      { label: 'c', text: '$x^4$' },
      { label: 'd', text: '$4x^3$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Une primitive de $\\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ est…',
    options: [
      { label: 'a', text: '$\\ln x$' },
      { label: 'b', text: '$-\\dfrac{1}{x^2}$' },
      { label: 'c', text: '$\\dfrac{1}{x}$' },
      { label: 'd', text: '$-\\ln x$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: '$\\displaystyle\\int_0^1 2x\\,\\mathrm{d}x$ vaut…',
    options: [
      { label: 'a', text: '$1$ (car $[x^2]_0^1$)' },
      { label: 'b', text: '$2$' },
      { label: 'c', text: '$0$' },
      { label: 'd', text: '$\\tfrac{1}{2}$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: '$\\displaystyle\\int_a^a f(x)\\,\\mathrm{d}x$ vaut…',
    options: [
      { label: 'a', text: '$f(a)$' },
      { label: 'b', text: '$0$ (bornes égales)' },
      { label: 'c', text: '$F(a)$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Si $F\'=f$ et $G\'=f$ sur $I$, alors…',
    options: [
      { label: 'a', text: '$F=G$' },
      { label: 'b', text: '$F-G$ est constante' },
      { label: 'c', text: '$F=2G$' },
      { label: 'd', text: '$F=-G$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'La valeur moyenne de $f$ sur $[a\\,;b]$ est…',
    options: [
      { label: 'a', text: '$F(b)-F(a)$' },
      { label: 'b', text: '$\\dfrac{1}{b-a}\\displaystyle\\int_a^b f$' },
      { label: 'c', text: '$\\displaystyle\\int_a^b f$' },
      { label: 'd', text: '$f\\left(\\tfrac{a+b}{2}\\right)$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: '$\\displaystyle\\int_0^1(x+x^2)\\,\\mathrm{d}x$ vaut…',
    options: [
      { label: 'a', text: '$\\tfrac{5}{6}$ (car $\\tfrac{1}{2}+\\tfrac{1}{3}$)' },
      { label: 'b', text: '$1$' },
      { label: 'c', text: '$\\tfrac{1}{2}$' },
      { label: 'd', text: '$\\tfrac{7}{6}$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'La formule d\'intégration par parties est…',
    options: [
      { label: 'a', text: '$\\int uv\'=[uv]-\\int u\'v$' },
      { label: 'b', text: '$\\int uv\'=[uv]+\\int u\'v$' },
      { label: 'c', text: '$\\int uv\'=\\int u\'v\'$' },
      { label: 'd', text: '$\\int uv\'=[u\'v]-\\int uv$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Si $f\\leq g$ sur $[a\\,;b]$ ($a<b$), alors…',
    options: [
      { label: 'a', text: '$\\int_a^b f\\geq\\int_a^b g$' },
      { label: 'b', text: '$\\int_a^b f\\leq\\int_a^b g$ (ordre conservé)' },
      { label: 'c', text: '$\\int_a^b f=\\int_a^b g$' },
      { label: 'd', text: 'on ne peut rien dire' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Une primitive de $e^x$ est…',
    options: [
      { label: 'a', text: '$e^x$' },
      { label: 'b', text: '$xe^x$' },
      { label: 'c', text: '$\\dfrac{e^x}{x}$' },
      { label: 'd', text: '$e^{x+1}$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const PRIMITIVES_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'primitives-1',
    context: 'On note $F$ une primitive et $k\\in\\mathbb{R}$ une constante.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=3x^2-4x+5$ sur $\\mathbb{R}$.' },
      ],
    }],
  },
  {
    id: 'primitives-2',
    context: 'Rappel : $\\dfrac{1}{x^2}=x^{-2}$ et $\\dfrac{1}{\\sqrt{x}}=x^{-1/2}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=\\dfrac{1}{x^2}+\\dfrac{2}{\\sqrt{x}}$ sur $]0\\,;+\\infty[$.' },
      ],
    }],
  },
  {
    id: 'primitives-3',
    context: 'On cherche une primitive particulière, fixée par une condition initiale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la primitive $F$ de $f(x)=6x^2-2$ telle que $F(1)=5$.' },
      ],
    }],
  },
  {
    id: 'primitives-4',
    context: 'Premier calcul d\'intégrale avec le théorème fondamental.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_1^3 2x\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  {
    id: 'primitives-5',
    context: 'Attention au signe du résultat : une intégrale peut être nulle sans que la fonction le soit.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^1(3x^2-1)\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'primitives-6',
    context: 'Combiner les primitives usuelles de l\'exponentielle et des fonctions trigonométriques.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=2e^x-3\\sin x$ sur $\\mathbb{R}$.' },
      ],
    }],
  },
  {
    id: 'primitives-7',
    context: 'Forme composée $u\'u^n$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=2x(x^2+3)^4$.' },
      ],
    }],
  },
  {
    id: 'primitives-8',
    context: 'Forme composée $\\dfrac{u\'}{u}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=\\dfrac{x}{x^2+1}$ sur $\\mathbb{R}$.' },
      ],
    }],
  },
  {
    id: 'primitives-9',
    context: 'Forme composée $u\'e^u$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=(2x-1)\\,e^{x^2-x}$.' },
      ],
    }],
  },
  {
    id: 'primitives-10',
    context: 'On cherche une primitive particulière, fixée par une condition initiale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la primitive $F$ de $f(x)=e^x+1$ telle que $F(0)=2$.' },
      ],
    }],
  },
  {
    id: 'primitives-11',
    context: 'Une intégrale qui fait apparaître le logarithme.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_1^e\\dfrac{1}{x}\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  {
    id: 'primitives-12',
    context: 'Reconnaître une forme composée avant d\'intégrer (attention au facteur constant).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^1 x\\,e^{x^2}\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  {
    id: 'primitives-13',
    context: 'Utiliser la linéarité de l\'intégrale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^1(3x^2+2e^x)\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  {
    id: 'primitives-14',
    context: 'Indication : découper en $x=1$ avec la relation de Chasles.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^2|x-1|\\,\\mathrm{d}x$.' },
      ],
    }],
  },
  {
    id: 'primitives-15',
    context: 'La valeur moyenne de $f$ sur $[a\\,;b]$ est $\\mu=\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la valeur moyenne de $f(x)=x^3$ sur $[0\\,;2]$.' },
      ],
    }],
  },
  {
    id: 'primitives-16',
    context: 'Première intégration par parties : $\\displaystyle\\int_a^b uv\'=[uv]_a^b-\\int_a^b u\'v$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^1(x+1)\\,e^x\\,\\mathrm{d}x$ par intégration par parties.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'primitives-17',
    context: 'Reconnaissance d\'une forme composée moins évidente.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une primitive de $f(x)=\\cos x\\,\\sin^2 x$.' },
      ],
    }],
  },
  {
    id: 'primitives-18',
    context: 'Si $f\\geq g$ sur $[a\\,;b]$, l\'aire entre les deux courbes est $\\displaystyle\\int_a^b(f(x)-g(x))\\,\\mathrm{d}x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'aire du domaine compris entre les courbes de $y=2x$ et $y=x^2$ sur $[0\\,;2]$.' },
      ],
    }],
  },
  {
    id: 'primitives-19',
    context: 'Intégration par parties avec un logarithme.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_1^e x\\ln x\\,\\mathrm{d}x$ par intégration par parties.' },
      ],
    }],
  },
  {
    id: 'primitives-20',
    context: 'Intégration par parties avec une fonction trigonométrique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\displaystyle\\int_0^\\pi x\\sin x\\,\\mathrm{d}x$ par intégration par parties.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'primitives-21',
    context: 'Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x)=(2-x)\\,e^x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $F(x)=(3-x)\\,e^x$ est une primitive de $f$ sur $\\mathbb{R}$.' },
        { n: 'b', text: 'Calculer $\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x$.' },
        { n: 'c', text: 'Étudier le signe de $f(x)$ sur $[0\\,;3]$.' },
        { n: 'd', text: 'En déduire l\'aire, en unités d\'aire, du domaine compris entre $\\mathcal{C}_f$, l\'axe des abscisses et les droites $x=0$ et $x=2$.' },
      ],
    }],
  },
  {
    id: 'primitives-22',
    context: 'On pose :',
    data: 'J=\\int_0^1 x\\,e^x\\,\\mathrm{d}x\\qquad\\text{et}\\qquad I=\\int_0^1 x^2\\,e^x\\,\\mathrm{d}x',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $J$ par une intégration par parties.' },
        { n: 'b', text: 'À l\'aide d\'une intégration par parties, exprimer $I$ en fonction de $J$.' },
        { n: 'c', text: 'En déduire la valeur exacte de $I$.' },
      ],
    }],
  },
  {
    id: 'primitives-23',
    context: 'Soit $f(x)=-x^2+4x$ et $g(x)=x$ sur $\\mathbb{R}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer les abscisses des points d\'intersection des courbes de $f$ et $g$.' },
        { n: 'b', text: 'Montrer que $f(x)\\geq g(x)$ sur l\'intervalle correspondant, puis calculer l\'aire du domaine compris entre les deux courbes.' },
        { n: 'c', text: 'Déterminer la valeur moyenne de $f$ sur $[0\\,;3]$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const PRIMITIVES_CORRECTIONS: Record<string, Correction> = {
  'primitives-1': {
    steps: [
      { n: '1', text: '$F(x)=x^3-2x^2+5x\\;(+k)$. Vérification : $F\'(x)=3x^2-4x+5=f(x)$. ✓' },
    ],
    result: '$F(x)=x^3-2x^2+5x$.',
  },
  'primitives-2': {
    steps: [
      { n: '1', text: '$f(x)=x^{-2}+2x^{-1/2}$. Primitive : $-\\dfrac{1}{x}+2\\times\\dfrac{x^{1/2}}{1/2}=-\\dfrac{1}{x}+4\\sqrt{x}\\;(+k)$.' },
    ],
    result: '$F(x)=4\\sqrt{x}-\\dfrac{1}{x}$.',
  },
  'primitives-3': {
    steps: [
      { n: '1', text: 'Les primitives sont $F(x)=2x^3-2x+k$.' },
      { n: '2', text: 'Condition : $F(1)=2-2+k=k=5$. Donc $F(x)=2x^3-2x+5$.' },
    ],
    result: '$F(x)=2x^3-2x+5$.',
  },
  'primitives-4': {
    steps: [
      { n: '1', text: '$\\displaystyle\\int_1^3 2x\\,\\mathrm{d}x=\\bigl[x^2\\bigr]_1^3=9-1=8$.' },
    ],
    result: '$=8$.',
  },
  'primitives-5': {
    steps: [
      { n: '1', text: '$\\displaystyle\\int_0^1(3x^2-1)\\,\\mathrm{d}x=\\bigl[x^3-x\\bigr]_0^1=(1-1)-0=0$.' },
      { text: 'Une intégrale nulle ne signifie pas que la fonction est nulle : les aires positives et négatives se compensent.' },
    ],
    result: '$=0$.',
  },
  'primitives-6': {
    steps: [
      { n: '1', text: 'Une primitive de $2e^x$ est $2e^x$, et une primitive de $-3\\sin x$ est $3\\cos x$. Donc $F(x)=2e^x+3\\cos x\\;(+k)$.' },
    ],
    result: '$F(x)=2e^x+3\\cos x$.',
  },
  'primitives-7': {
    steps: [
      { n: '1', text: 'Avec $u=x^2+3$, $u\'=2x$ : $f=u\'u^4$, donc $F(x)=\\dfrac{(x^2+3)^5}{5}\\;(+k)$.' },
    ],
    result: '$F(x)=\\dfrac{(x^2+3)^5}{5}$.',
  },
  'primitives-8': {
    steps: [
      { n: '1', text: '$f(x)=\\dfrac{x}{x^2+1}=\\dfrac{1}{2}\\cdot\\dfrac{2x}{x^2+1}$, avec $u=x^2+1>0$ : forme $\\dfrac{1}{2}\\cdot\\dfrac{u\'}{u}$.' },
      { n: '2', text: 'Donc $F(x)=\\dfrac{1}{2}\\ln(x^2+1)\\;(+k)$.' },
    ],
    result: '$F(x)=\\dfrac{1}{2}\\ln(x^2+1)$.',
  },
  'primitives-9': {
    steps: [
      { n: '1', text: 'Avec $u=x^2-x$, $u\'=2x-1$ : $f=u\'e^u$, donc $F(x)=e^{x^2-x}\\;(+k)$.' },
    ],
    result: '$F(x)=e^{x^2-x}$.',
  },
  'primitives-10': {
    steps: [
      { n: '1', text: '$F(x)=e^x+x+k$. Condition : $F(0)=1+0+k=2$, donc $k=1$ et $F(x)=e^x+x+1$.' },
    ],
    result: '$F(x)=e^x+x+1$.',
  },
  'primitives-11': {
    steps: [
      { n: '1', text: '$\\displaystyle\\int_1^e\\dfrac{1}{x}\\,\\mathrm{d}x=\\bigl[\\ln x\\bigr]_1^e=1-0=1$.' },
    ],
    result: '$=1$.',
  },
  'primitives-12': {
    steps: [
      { n: '1', text: 'Forme $\\dfrac{1}{2}u\'e^u$ avec $u=x^2$ : $\\displaystyle\\int_0^1 xe^{x^2}\\,\\mathrm{d}x=\\dfrac{1}{2}\\bigl[e^{x^2}\\bigr]_0^1=\\dfrac{1}{2}(e-1)$.' },
    ],
    result: '$=\\dfrac{e-1}{2}$.',
  },
  'primitives-13': {
    steps: [
      { n: '1', text: '$\\displaystyle\\int_0^1(3x^2+2e^x)\\,\\mathrm{d}x=\\bigl[x^3+2e^x\\bigr]_0^1=(1+2e)-(0+2)=2e-1$.' },
    ],
    result: '$=2e-1$.',
  },
  'primitives-14': {
    steps: [
      { n: '1', text: 'Sur $[0\\,;1]$, $|x-1|=1-x$ ; sur $[1\\,;2]$, $|x-1|=x-1$. Par Chasles :' },
      { n: '2', text: '$\\displaystyle\\int_0^2|x-1|\\,\\mathrm{d}x=\\int_0^1(1-x)\\,\\mathrm{d}x+\\int_1^2(x-1)\\,\\mathrm{d}x=\\dfrac{1}{2}+\\dfrac{1}{2}=1$.' },
    ],
    result: '$=1$.',
  },
  'primitives-15': {
    steps: [
      { n: '1', text: '$\\mu=\\dfrac{1}{2}\\displaystyle\\int_0^2 x^3\\,\\mathrm{d}x=\\dfrac{1}{2}\\left[\\dfrac{x^4}{4}\\right]_0^2=\\dfrac{1}{2}\\times 4=2$.' },
    ],
    result: '$\\mu=2$.',
  },
  'primitives-16': {
    steps: [
      { n: '1', text: 'On pose $u=x+1$ ($u\'=1$) et $v\'=e^x$ ($v=e^x$) :' },
      { n: '2', text: '$\\displaystyle\\int_0^1(x+1)e^x\\,\\mathrm{d}x=\\bigl[(x+1)e^x\\bigr]_0^1-\\int_0^1 e^x\\,\\mathrm{d}x=(2e-1)-(e-1)=e$.' },
    ],
    result: '$=e$.',
  },
  'primitives-17': {
    steps: [
      { n: '1', text: 'Avec $u=\\sin x$, $u\'=\\cos x$ : $f=\\cos x\\,\\sin^2 x=u\'u^2$, donc $F(x)=\\dfrac{\\sin^3 x}{3}\\;(+k)$.' },
    ],
    result: '$F(x)=\\dfrac{\\sin^3 x}{3}$.',
  },
  'primitives-18': {
    steps: [
      { n: '1', text: 'Sur $[0\\,;2]$, $2x\\geq x^2$. L\'aire vaut $\\displaystyle\\int_0^2(2x-x^2)\\,\\mathrm{d}x=\\left[x^2-\\dfrac{x^3}{3}\\right]_0^2=4-\\dfrac{8}{3}=\\dfrac{4}{3}$ u.a.' },
    ],
    result: '$\\mathcal{A}=\\dfrac{4}{3}$ u.a.',
  },
  'primitives-19': {
    steps: [
      { n: '1', text: 'On pose $u=\\ln x$ ($u\'=\\tfrac{1}{x}$) et $v\'=x$ ($v=\\tfrac{x^2}{2}$) :' },
      { n: '2', text: '$\\displaystyle\\int_1^e x\\ln x\\,\\mathrm{d}x=\\left[\\dfrac{x^2}{2}\\ln x\\right]_1^e-\\int_1^e\\dfrac{x^2}{2}\\cdot\\dfrac{1}{x}\\,\\mathrm{d}x=\\dfrac{e^2}{2}-\\int_1^e\\dfrac{x}{2}\\,\\mathrm{d}x$.' },
      { n: '3', text: 'Or $\\displaystyle\\int_1^e\\dfrac{x}{2}\\,\\mathrm{d}x=\\left[\\dfrac{x^2}{4}\\right]_1^e=\\dfrac{e^2}{4}-\\dfrac{1}{4}$. Donc l\'intégrale vaut $\\dfrac{e^2}{2}-\\dfrac{e^2}{4}+\\dfrac{1}{4}=\\dfrac{e^2+1}{4}$.' },
    ],
    result: '$=\\dfrac{e^2+1}{4}$.',
  },
  'primitives-20': {
    steps: [
      { n: '1', text: 'On pose $u=x$ ($u\'=1$) et $v\'=\\sin x$ ($v=-\\cos x$) :' },
      { n: '2', text: '$\\displaystyle\\int_0^\\pi x\\sin x\\,\\mathrm{d}x=\\bigl[-x\\cos x\\bigr]_0^\\pi-\\int_0^\\pi(-\\cos x)\\,\\mathrm{d}x=\\pi+\\bigl[\\sin x\\bigr]_0^\\pi=\\pi+0=\\pi$.' },
    ],
    result: '$=\\pi$.',
  },
  'primitives-21': {
    steps: [
      { n: 'a', text: '$F(x)=(3-x)e^x$. En dérivant (produit) : $F\'(x)=(-1)e^x+(3-x)e^x=(3-x-1)e^x=(2-x)e^x=f(x)$. Donc $F$ est une primitive de $f$.' },
      { n: 'b', text: '$\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x=F(2)-F(0)=(3-2)e^2-(3-0)e^0=e^2-3$.' },
      { n: 'c', text: '$e^x>0$, donc $f(x)=(2-x)e^x$ a le signe de $2-x$ : $f(x)\\geq 0$ pour $x\\leq 2$, $f(x)\\leq 0$ pour $x\\geq 2$. Sur $[0\\,;2]$, $f\\geq 0$.' },
      { n: 'd', text: '$f$ étant positive sur $[0\\,;2]$, l\'aire cherchée vaut $\\displaystyle\\int_0^2 f=e^2-3$ unités d\'aire ($\\approx 4{,}39$).' },
    ],
    result: '$\\displaystyle\\int_0^2 f=e^2-3$ ; aire $=e^2-3$ u.a.',
  },
  'primitives-22': {
    steps: [
      { n: 'a', text: '$J$ : avec $u=x$, $v\'=e^x$, $J=\\bigl[xe^x\\bigr]_0^1-\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x=e-(e-1)=1$.' },
      { n: 'b', text: '$I$ : avec $u=x^2$ ($u\'=2x$), $v\'=e^x$ ($v=e^x$) : $I=\\bigl[x^2e^x\\bigr]_0^1-\\displaystyle\\int_0^1 2xe^x\\,\\mathrm{d}x=e-2\\int_0^1 xe^x\\,\\mathrm{d}x=e-2J$.' },
      { n: 'c', text: '$I=e-2J=e-2\\times 1=e-2$.' },
    ],
    result: '$J=1$ ; $I=e-2$.',
  },
  'primitives-23': {
    steps: [
      { n: 'a', text: '$f(x)=g(x)\\iff -x^2+4x=x\\iff -x^2+3x=0\\iff x(3-x)=0$, d\'où $x=0$ ou $x=3$.' },
      { n: 'b', text: 'Sur $[0\\,;3]$, $f(x)-g(x)=-x^2+3x=x(3-x)\\geq 0$, donc $f\\geq g$. L\'aire vaut $\\displaystyle\\int_0^3(-x^2+3x)\\,\\mathrm{d}x=\\left[-\\dfrac{x^3}{3}+\\dfrac{3x^2}{2}\\right]_0^3=-9+\\dfrac{27}{2}=\\dfrac{9}{2}$.' },
      { n: 'c', text: '$\\mu=\\dfrac{1}{3}\\displaystyle\\int_0^3(-x^2+4x)\\,\\mathrm{d}x=\\dfrac{1}{3}\\left[-\\dfrac{x^3}{3}+2x^2\\right]_0^3=\\dfrac{1}{3}(-9+18)=3$.' },
    ],
    result: 'Intersections $x=0$ et $x=3$ ; aire $=\\dfrac{9}{2}$ u.a. ; $\\mu=3$.',
  },
};
