import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const LOGARITHME_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: '$\\ln(ab)=$',
    options: [
      { label: 'a', text: '$\\ln a \\times \\ln b$' },
      { label: 'b', text: '$\\ln a + \\ln b$ (logarithme transforme les produits en sommes)' },
      { label: 'c', text: '$\\ln(a+b)$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: '$\\ln\'(x)=$',
    options: [
      { label: 'a', text: '$\\dfrac{1}{x}$ (sur $]0,+\\infty[$)' },
      { label: 'b', text: '$e^x$' },
      { label: 'c', text: '$\\ln x$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: '$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x}=$',
    options: [
      { label: 'a', text: '$+\\infty$' },
      { label: 'b', text: '$0$ (croissance comparée : $\\ln x \\ll x$)' },
      { label: 'c', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$\\ln x = 3 \\Longleftrightarrow$',
    options: [
      { label: 'a', text: '$x = e^3$' },
      { label: 'b', text: '$x = 3e$' },
      { label: 'c', text: '$x = \\ln 3$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: '$\\displaystyle\\lim_{x\\to 0^+}\\ln x=$',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$-\\infty$ (asymptote verticale $x=0$)' },
      { label: 'c', text: '$+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Si $u>0$ et $u$ dérivable, $(\\ln u)\'=$',
    options: [
      { label: 'a', text: '$\\dfrac{1}{u}$' },
      { label: 'b', text: "$\\dfrac{u'}{u}$" },
      { label: 'c', text: "$u'\\ln u$" },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: '$\\ln(e^5)=$',
    options: [
      { label: 'a', text: '$5$ (car $\\ln$ et $\\exp$ sont réciproques)' },
      { label: 'b', text: '$e^5$' },
      { label: 'c', text: '$\\ln 5$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'Le domaine de $x\\mapsto\\ln(x-2)$ est :',
    options: [
      { label: 'a', text: '$\\mathbb{R}$' },
      { label: 'b', text: '$]2,+\\infty[$ (il faut $x-2>0$)' },
      { label: 'c', text: '$]-\\infty,2[$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: '$\\ln a < 0 \\Longleftrightarrow$',
    options: [
      { label: 'a', text: '$a > 1$' },
      { label: 'b', text: '$0 < a < 1$' },
      { label: 'c', text: '$a < 0$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: '$\\displaystyle\\lim_{x\\to 0^+}x\\ln x=$',
    options: [
      { label: 'a', text: '$0$ (croissance comparée : $x^n\\ln x\\to 0$ en $0^+$)' },
      { label: 'b', text: '$-\\infty$' },
      { label: 'c', text: '$1$' },
    ],
    answer: 'a',
  },
  {
    n: 11,
    text: '$\\ln(a+b)=$',
    options: [
      { label: 'a', text: '$\\ln a + \\ln b$' },
      { label: 'b', text: '$\\ln a \\times \\ln b$' },
      { label: 'c', text: "Aucune de ces expressions (ln n'ouvre que les produits, pas les sommes)" },
    ],
    answer: 'c',
  },
  {
    n: 12,
    text: 'La fonction $\\ln$ est concave sur $]0,+\\infty[$ car…',
    options: [
      { label: 'a', text: "$\\ln'(x)=\\dfrac{1}{x}>0$" },
      { label: 'b', text: "$\\ln''(x)=-\\dfrac{1}{x^2}<0$ (dérivée seconde négative)" },
      { label: 'c', text: '$\\ln$ est croissante' },
    ],
    answer: 'b',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const LOGARITHME_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — Automatismes ★ ───────────────────────────────────────────────
  {
    id: 'logarithme-1',
    context: 'Exprimer en fonction de $\\ln 2$ et $\\ln 3$.',
    parts: [{
      questions: [
        { n: '1', text: '$\\ln 6$' },
        { n: '2', text: '$\\ln\\dfrac{8}{3}$' },
        { n: '3', text: '$\\ln\\sqrt{12}$' },
        { n: '4', text: '$\\ln\\dfrac{1}{9}$' },
      ],
    }],
  },
  {
    id: 'logarithme-2',
    context: 'Simplifier les expressions suivantes.',
    parts: [{
      questions: [
        { n: '1', text: '$\\ln(e^2)+\\ln\\dfrac{1}{e}$' },
        { n: '2', text: '$e^{2\\ln 3}$' },
        { n: '3', text: '$\\ln(e^x\\cdot e^{-2})$' },
      ],
    }],
  },
  {
    id: 'logarithme-3',
    context: 'On cherche à démontrer une identité algébrique.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que pour tout $x>0$, $\\ln(x)+\\ln\\!\\left(1+\\dfrac{1}{x}\\right)=\\ln(x+1)$.' },
      ],
    }],
  },
  {
    id: 'logarithme-4',
    context: 'Résoudre dans $\\mathbb{R}$ les équations suivantes (vérifier le domaine).',
    parts: [{
      questions: [
        { n: '1', text: '$e^x=5$' },
        { n: '2', text: '$\\ln x=-2$' },
        { n: '3', text: '$\\ln(3x-6)=\\ln(12+x)$' },
      ],
    }],
  },
  {
    id: 'logarithme-5',
    context: 'Résoudre dans $\\mathbb{R}$ les inéquations suivantes.',
    parts: [{
      questions: [
        { n: '1', text: '$e^{5x}\\leq 2$' },
        { n: '2', text: '$\\ln(3x+1)>0$' },
        { n: '3', text: '$\\ln(2x)\\leq\\ln(6-x)$' },
      ],
    }],
  },
  {
    id: 'logarithme-6',
    context: 'Pour $A=3$, $k=1$, $B=2$.',
    parts: [{
      questions: [
        { n: '1', text: 'Démontrer que pour tout réel $x$, $x+\\ln\\!\\left(1+3e^{-x}\\right)=\\ln\\!\\left(3+e^x\\right)$.' },
        { n: '2', text: 'En déduire la solution de $x+\\ln\\!\\left(1+3e^{-x}\\right)=2$.' },
      ],
    }],
  },
  // ── TIER 2 — Méthodes ★★ ────────────────────────────────────────────────
  {
    id: 'logarithme-7',
    context: 'Étudier la limite en $0^+$ puis en $+\\infty$ des fonctions suivantes.',
    parts: [{
      questions: [
        { n: '1', text: '$f(x)=\\ln x - x^2$' },
        { n: '2', text: '$g(x)=x^2-3x-\\ln x$' },
      ],
    }],
  },
  {
    id: 'logarithme-8',
    context: 'Déterminer les limites suivantes.',
    parts: [{
      questions: [
        { n: '1', text: '$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln x}{x+1}$' },
        { n: '2', text: '$\\displaystyle\\lim_{x\\to 0^+}x^2\\ln x$' },
        { n: '3', text: '$\\displaystyle\\lim_{x\\to+\\infty}(x-\\ln x)$' },
      ],
    }],
  },
  {
    id: 'logarithme-9',
    context: 'Limite d\'une expression mêlant $\\ln$ et puissances.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $\\ln(x^2+1)=2\\ln x+\\ln\\!\\left(1+\\dfrac{1}{x^2}\\right)$ pour $x>0$.' },
        { n: '2', text: 'En déduire $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{\\ln(x^2+1)}{\\ln x}$.' },
      ],
    }],
  },
  {
    id: 'logarithme-10',
    context: 'Dériver les fonctions suivantes en précisant le domaine.',
    parts: [{
      questions: [
        { n: '1', text: '$f(x)=\\ln(x^2+1)$' },
        { n: '2', text: '$g(x)=\\ln(2x-1)$' },
        { n: '3', text: '$h(x)=x\\ln x$' },
      ],
    }],
  },
  {
    id: 'logarithme-11',
    context: 'Soit $f(x)=\\dfrac{\\ln x}{x}$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $f\'(x)=\\dfrac{1-\\ln x}{x^2}$.' },
      ],
    }],
  },
  {
    id: 'logarithme-12',
    context: 'Soit $h(x)=(\\ln x)^2-\\ln x$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Justifier que $h\'(x)=\\dfrac{2\\ln x-1}{x}$.' },
      ],
    }],
  },
  // ── TIER 3 — Type Bac ★★★ ────────────────────────────────────────────────
  {
    id: 'logarithme-13',
    context: 'Soit $f(x)=x-\\ln x$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les limites de $f$ en $0^+$ et en $+\\infty$.' },
        { n: '2', text: "Montrer que $f'(x)=\\dfrac{x-1}{x}$, étudier son signe et dresser le tableau de variations." },
        { n: '3', text: 'En déduire que pour tout $x>0$, $x>\\ln x$ (i.e. $x-\\ln x>0$).' },
      ],
    }],
  },
  {
    id: 'logarithme-14',
    context: 'Soit $f(x)=\\dfrac{\\ln x}{x}$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les limites de $f$ en $0^+$ et en $+\\infty$ ; en déduire une asymptote.' },
        { n: '2', text: "Montrer que $f'(x)=\\dfrac{1-\\ln x}{x^2}$, puis dresser le tableau de variations (préciser le maximum)." },
      ],
    }],
  },
  {
    id: 'logarithme-15',
    context: 'Soit $h(x)=(\\ln x)^2-\\ln x$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les limites de $h$ en $0^+$ et en $+\\infty$.' },
        { n: '2', text: "Étudier le signe de $h'(x)=\\dfrac{2\\ln x-1}{x}$ et dresser le tableau de variations (préciser le minimum)." },
        { n: '3', text: 'Résoudre $h(x)=0$.' },
      ],
    }],
  },
  {
    id: 'logarithme-16',
    context: 'Soit $f(x)=x^2-2\\ln x$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les limites de $f$ en $0^+$ et en $+\\infty$.' },
        { n: '2', text: "Montrer que $f'(x)=\\dfrac{2(x^2-1)}{x}$, étudier son signe et dresser le tableau de variations (préciser le minimum)." },
      ],
    }],
  },
  {
    id: 'logarithme-17',
    context: 'Soit $g(x)=\\ln x + x - 3$ sur $]0,+\\infty[$.',
    parts: [{
      questions: [
        { n: '1', text: 'Justifier que $g$ est continue et strictement croissante sur $]0,+\\infty[$.' },
        { n: '2', text: "En déduire que l'équation $g(x)=0$ admet une unique solution $\\alpha$." },
        { n: '3', text: 'Vérifier que $2<\\alpha<3$, puis donner un encadrement de $\\alpha$ d\'amplitude $0{,}1$.' },
      ],
    }],
  },
];

// ── Corrections ────────────────────────────────────────────────────────────────
export const LOGARITHME_CORRECTIONS: Record<string, Correction> = {
  'logarithme-1': {
    steps: [
      { n: '1', text: '$\\ln 6 = \\ln(2\\times 3) = \\ln 2 + \\ln 3$' },
      { n: '2', text: '$\\ln\\dfrac{8}{3} = \\ln 8 - \\ln 3 = 3\\ln 2 - \\ln 3$' },
      { n: '3', text: '$\\ln\\sqrt{12} = \\tfrac{1}{2}\\ln 12 = \\tfrac{1}{2}(2\\ln 2+\\ln 3) = \\ln 2 + \\tfrac{1}{2}\\ln 3$' },
      { n: '4', text: '$\\ln\\dfrac{1}{9} = -\\ln 9 = -2\\ln 3$' },
    ],
    result: '$\\ln 2+\\ln 3\\ ;\\ 3\\ln 2-\\ln 3\\ ;\\ \\ln 2+\\tfrac{1}{2}\\ln 3\\ ;\\ -2\\ln 3$',
  },
  'logarithme-2': {
    steps: [
      { n: '1', text: '$\\ln(e^2)+\\ln\\dfrac{1}{e} = 2 + (-1) = 1$' },
      { n: '2', text: '$e^{2\\ln 3} = e^{\\ln 9} = 9$' },
      { n: '3', text: '$\\ln(e^x\\cdot e^{-2}) = \\ln(e^{x-2}) = x-2$' },
    ],
    result: '$1\\ ;\\ 9\\ ;\\ x-2$',
  },
  'logarithme-3': {
    steps: [
      { text: 'Pour $x>0$ :' },
      { tex: '\\ln x + \\ln\\!\\left(1+\\tfrac{1}{x}\\right) = \\ln\\!\\left(x\\bigl(1+\\tfrac{1}{x}\\bigr)\\right) = \\ln(x+1).' },
    ],
    result: 'Identité démontrée.',
  },
  'logarithme-4': {
    steps: [
      { n: '1', text: '$e^x = 5 \\Longleftrightarrow x = \\ln 5$' },
      { n: '2', text: '$\\ln x = -2 \\Longleftrightarrow x = e^{-2}$ (compatible $x>0$)' },
      { n: '3', text: 'Domaine : $3x-6>0$ et $12+x>0$, soit $x>2$. Alors $3x-6=12+x \\Longleftrightarrow 2x=18 \\Longleftrightarrow x=9$ (accepté car $9>2$).' },
    ],
    result: '$x=\\ln 5\\ ;\\ x=e^{-2}\\ ;\\ x=9$',
  },
  'logarithme-5': {
    steps: [
      { n: '1', text: '$e^{5x}\\leq 2 \\Longleftrightarrow 5x\\leq\\ln 2 \\Longleftrightarrow x\\leq\\dfrac{\\ln 2}{5}$' },
      { n: '2', text: 'Domaine $x>-\\tfrac{1}{3}$. $\\ln(3x+1)>0 \\Longleftrightarrow 3x+1>1 \\Longleftrightarrow x>0$.' },
      { n: '3', text: 'Domaine $0<x<6$. $\\ln(2x)\\leq\\ln(6-x) \\Longleftrightarrow 2x\\leq 6-x \\Longleftrightarrow x\\leq 2$, d\'où $0<x\\leq 2$.' },
    ],
    result: '$x\\leq\\dfrac{\\ln 2}{5}\\ ;\\ x>0\\ ;\\ 0<x\\leq 2$',
  },
  'logarithme-6': {
    steps: [
      { n: '1', tex: 'x+\\ln(1+3e^{-x})=\\ln(e^x)+\\ln(1+3e^{-x})=\\ln\\!\\bigl(e^x(1+3e^{-x})\\bigr)=\\ln(e^x+3).' },
      { n: '2', text: "$\\ln(e^x+3)=2 \\Longleftrightarrow e^x+3=e^2 \\Longleftrightarrow e^x=e^2-3 \\Longleftrightarrow x=\\ln(e^2-3)$. ($e^2-3>0$, solution valide, $x\\approx 1{,}48$.)" },
    ],
    result: '$x = \\ln(e^2-3)\\approx 1{,}48$',
  },
  'logarithme-7': {
    steps: [
      { n: '1', text: 'En $0^+$ : $\\ln x\\to-\\infty$ et $-x^2\\to 0$, donc $f(x)\\to-\\infty$. En $+\\infty$ : $f(x)=-x^2\\!\\left(1-\\dfrac{\\ln x}{x^2}\\right)\\to-\\infty$ (car $\\dfrac{\\ln x}{x^2}\\to 0$).' },
      { n: '2', text: 'En $0^+$ : $-\\ln x\\to+\\infty$, donc $g(x)\\to+\\infty$. En $+\\infty$ : $g(x)=x^2\\!\\left(1-\\dfrac{3}{x}-\\dfrac{\\ln x}{x^2}\\right)\\to+\\infty$.' },
    ],
    result: '$f\\to-\\infty$ aux deux bornes ; $g\\to+\\infty$ aux deux bornes.',
  },
  'logarithme-8': {
    steps: [
      { n: '1', tex: '\\frac{\\ln x}{x+1}=\\frac{\\ln x}{x}\\cdot\\frac{x}{x+1}\\to 0\\times 1=0.' },
      { n: '2', text: '$x^2\\ln x = x\\cdot(x\\ln x)\\to 0$ (car $x\\ln x\\to 0$).' },
      { n: '3', tex: 'x-\\ln x = x\\!\\left(1-\\frac{\\ln x}{x}\\right)\\to+\\infty.' },
    ],
    result: '$0\\ ;\\ 0\\ ;\\ +\\infty$',
  },
  'logarithme-9': {
    steps: [
      { n: '1', tex: '\\ln(x^2+1)=\\ln\\!\\bigl(x^2(1+\\tfrac{1}{x^2})\\bigr)=2\\ln x+\\ln\\!\\bigl(1+\\tfrac{1}{x^2}\\bigr).' },
      { n: '2', tex: '\\frac{\\ln(x^2+1)}{\\ln x}=2+\\frac{\\ln(1+\\frac{1}{x^2})}{\\ln x}\\to 2+0=2.' },
    ],
    result: 'Limite $= 2$',
  },
  'logarithme-10': {
    steps: [
      { n: '1', text: '$u=x^2+1>0$ : $f\'(x)=\\dfrac{2x}{x^2+1}$ sur $\\mathbb{R}$.' },
      { n: '2', text: 'Domaine $x>\\dfrac{1}{2}$ : $g\'(x)=\\dfrac{2}{2x-1}$.' },
      { n: '3', text: "$h'(x)=\\ln x + x\\cdot\\dfrac{1}{x}=\\ln x+1$ sur $]0,+\\infty[$." },
    ],
    result: "$\\dfrac{2x}{x^2+1}\\ ;\\ \\dfrac{2}{2x-1}\\ ;\\ \\ln x+1$",
  },
  'logarithme-11': {
    steps: [
      { text: 'Règle du quotient avec $\\ln x$ et $x$ :' },
      { tex: "f'(x)=\\frac{\\frac{1}{x}\\cdot x - \\ln x\\cdot 1}{x^2}=\\frac{1-\\ln x}{x^2}." },
    ],
    result: "$f'(x)=\\dfrac{1-\\ln x}{x^2}$",
  },
  'logarithme-12': {
    steps: [
      { text: 'On pose $u=\\ln x$, $u\'=\\dfrac{1}{x}$ :' },
      { tex: "h'(x)=2\\ln x\\cdot\\frac{1}{x}-\\frac{1}{x}=\\frac{2\\ln x-1}{x}." },
    ],
    result: "$h'(x)=\\dfrac{2\\ln x-1}{x}$",
  },
  'logarithme-13': {
    steps: [
      { n: '1', text: 'En $0^+$ : $-\\ln x\\to+\\infty$, donc $f\\to+\\infty$. En $+\\infty$ : $f=x(1-\\dfrac{\\ln x}{x})\\to+\\infty$.' },
      { n: '2', tex: "f'(x)=1-\\frac{1}{x}=\\frac{x-1}{x}." },
      { text: '$f\'\\geq 0 \\Longleftrightarrow x\\geq 1$ : $f$ décroît sur $]0,1]$, croît sur $[1,+\\infty[$, minimum $f(1)=1-\\ln 1=1$.' },
      { n: '3', text: 'Le minimum de $f$ vaut $1>0$, donc $f(x)\\geq 1>0$ pour tout $x>0$, soit $x-\\ln x>0$.' },
    ],
    result: 'Pour tout $x>0$, $x>\\ln x$.',
  },
  'logarithme-14': {
    steps: [
      { n: '1', text: 'En $0^+$ : $\\ln x\\to-\\infty$ et $\\dfrac{1}{x}\\to+\\infty$, donc $f(x)\\to-\\infty$. En $+\\infty$ : $f(x)=\\dfrac{\\ln x}{x}\\to 0^+$ (croissance comparée) : asymptote horizontale $y=0$.' },
      { n: '2', tex: "f'(x)=\\frac{\\frac{1}{x}\\cdot x-\\ln x}{x^2}=\\frac{1-\\ln x}{x^2}." },
      { text: '$f\'\\geq 0 \\Longleftrightarrow \\ln x\\leq 1 \\Longleftrightarrow x\\leq e$ : croît sur $]0,e]$, décroît sur $[e,+\\infty[$, maximum $f(e)=\\dfrac{1}{e}$.' },
    ],
    result: 'Maximum $\\dfrac{1}{e}$ en $x=e$ ; asymptote $y=0$.',
  },
  'logarithme-15': {
    steps: [
      { n: '1', text: 'En $0^+$ : $\\ln x\\to-\\infty$, donc $(\\ln x)^2\\to+\\infty$, $h\\to+\\infty$. En $+\\infty$ : $h=\\ln x(\\ln x-1)\\to+\\infty$.' },
      { n: '2', tex: "h'(x)=\\frac{2\\ln x-1}{x}." },
      { text: "$h'\\geq 0 \\Longleftrightarrow \\ln x\\geq\\tfrac{1}{2} \\Longleftrightarrow x\\geq\\sqrt{e}$ : décroît sur $]0,\\sqrt{e}]$, croît sur $[\\sqrt{e},+\\infty[$, minimum $h(\\sqrt{e})=\\tfrac{1}{4}-\\tfrac{1}{2}=-\\tfrac{1}{4}$." },
      { n: '3', text: '$h(x)=0 \\Longleftrightarrow \\ln x(\\ln x-1)=0 \\Longleftrightarrow \\ln x=0$ ou $\\ln x=1$, soit $x=1$ ou $x=e$.' },
    ],
    result: 'Minimum $-\\dfrac{1}{4}$ en $\\sqrt{e}$ ; $h(x)=0$ pour $x=1$ et $x=e$.',
  },
  'logarithme-16': {
    steps: [
      { n: '1', text: 'En $0^+$ : $-2\\ln x\\to+\\infty$, donc $f\\to+\\infty$. En $+\\infty$ : $x^2$ l\'emporte, $f\\to+\\infty$.' },
      { n: '2', tex: "f'(x)=2x-\\frac{2}{x}=\\frac{2(x^2-1)}{x}=\\frac{2(x-1)(x+1)}{x}." },
      { text: 'Sur $]0,+\\infty[$, le signe est celui de $x-1$ : décroît sur $]0,1]$, croît sur $[1,+\\infty[$, minimum $f(1)=1-0=1$.' },
    ],
    result: 'Minimum $f(1)=1$.',
  },
  'logarithme-17': {
    steps: [
      { n: '1', text: "$g$ est somme de fonctions continues sur $]0,+\\infty[$ ; $g'(x)=\\dfrac{1}{x}+1>0$ : strictement croissante." },
      { n: '2', text: 'Continue et strictement monotone : par le corollaire du TVI, $g(x)=0$ admet une unique solution $\\alpha$.' },
      { n: '3', text: '$g(2)=\\ln 2-1\\approx-0{,}31<0$ et $g(3)=\\ln 3\\approx 1{,}10>0$, donc $2<\\alpha<3$.' },
      { text: 'Affinement : $g(2{,}2)\\approx-0{,}01<0$ et $g(2{,}3)\\approx 0{,}13>0$, d\'où $2{,}2<\\alpha<2{,}3$.' },
    ],
    result: 'Unique solution $\\alpha$ avec $2{,}2<\\alpha<2{,}3$ ($\\alpha\\approx 2{,}21$).',
  },
};
