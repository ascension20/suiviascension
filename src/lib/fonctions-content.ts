import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const FONCTIONS_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: '$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^2}=$',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$' },
      { label: 'c', text: '$+\\infty$ (croissance comparée : $x^2\\ll e^x$)' },
    ],
    answer: 'c',
  },
  {
    n: 2,
    text: '$\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x-1}{x}=$',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$ (taux d\'accroissement de $e^x$ en $0$)' },
      { label: 'c', text: '$+\\infty$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La pente de la tangente à $\\mathcal{C}_f$ au point d\'abscisse $a$ vaut…',
    options: [
      { label: 'a', text: '$f(a)$' },
      { label: 'b', text: '$f\'(a)$' },
      { label: 'c', text: '$f\'(a)(x-a)$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$f$ est convexe sur $I$ si et seulement si…',
    options: [
      { label: 'a', text: '$f\'<0$ sur $I$' },
      { label: 'b', text: '$f\'\'\\geq 0$ sur $I$ (courbe au-dessus de ses tangentes)' },
      { label: 'c', text: '$f\'=0$ sur $I$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Si $f$ est dérivable en $a$, alors…',
    options: [
      { label: 'a', text: '$f$ est continue en $a$' },
      { label: 'b', text: '$f\'(a)=0$' },
      { label: 'c', text: '$f$ est croissante au voisinage de $a$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'Le théorème des valeurs intermédiaires garantit…',
    options: [
      { label: 'a', text: 'l\'existence d\'une solution de $f(x)=k$' },
      { label: 'b', text: 'l\'unicité de cette solution' },
      { label: 'c', text: 'la valeur exacte de la solution' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: '$\\displaystyle\\lim_{x\\to-\\infty}e^x=$',
    options: [
      { label: 'a', text: '$-\\infty$' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: '$A$ est un point d\'inflexion de $\\mathcal{C}_f$ si et seulement si $f\'\'$…',
    options: [
      { label: 'a', text: 's\'annule en $A$' },
      { label: 'b', text: 's\'annule en changeant de signe' },
      { label: 'c', text: 'est positive au voisinage de $A$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Si $f\'(x)>0$ sur $I$, alors $f$ est…',
    options: [
      { label: 'a', text: 'positive sur $I$' },
      { label: 'b', text: 'strictement croissante sur $I$' },
      { label: 'c', text: 'convexe sur $I$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: '$f$ continue sur $[a,b]$ avec $f(a)f(b)<0$ : que conclut-on ?',
    options: [
      { label: 'a', text: 'Il existe une racine de $f$ dans $]a,b[$' },
      { label: 'b', text: '$f$ est monotone sur $[a,b]$' },
      { label: 'c', text: '$f$ n\'a pas de racine dans $[a,b]$' },
    ],
    answer: 'a',
  },
  {
    n: 11,
    text: 'L\'asymptote verticale de $f(x)=\\dfrac{2x+1}{x-1}$ est…',
    options: [
      { label: 'a', text: '$y=2$' },
      { label: 'b', text: '$x=0$' },
      { label: 'c', text: '$x=1$' },
    ],
    answer: 'c',
  },
  {
    n: 12,
    text: 'La dérivée de $e^{u(x)}$ est…',
    options: [
      { label: 'a', text: '$e^{u(x)}$' },
      { label: 'b', text: '$u\'(x)\\cdot e^{u(x)}$ (règle de dérivation en chaîne)' },
      { label: 'c', text: '$u(x)\\cdot e^{u(x)-1}$' },
    ],
    answer: 'b',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const FONCTIONS_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ── Automatismes ★ ──────────────────────────────────────────────
  {
    id: 'fonctions-1',
    context: 'On souhaite prouver rigoureusement que $\\lim_{x\\to+\\infty}\\dfrac{1}{x}=0$ à l\'aide de la définition formelle.',
    parts: [{
      questions: [
        { n: '1', text: 'Rappeler la définition de $\\lim_{x\\to+\\infty}f(x)=0$ avec les quantificateurs $\\varepsilon$ et $B$.' },
        { n: '2', text: 'En posant $B=\\dfrac{1}{\\varepsilon}$, montrer que pour tout $x>B$, $\\left|\\dfrac{1}{x}\\right|\\leq\\varepsilon$.' },
        { n: '3', text: 'Conclure.' },
      ],
    }],
  },
  {
    id: 'fonctions-2',
    context: 'Soit $g(x)=\\dfrac{\\cos x}{x}$ sur $]0,+\\infty[$. On cherche à déterminer la limite de $g$ en $+\\infty$ par encadrement.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que pour tout $x>0$, $-\\dfrac{1}{x}\\leq g(x)\\leq\\dfrac{1}{x}$.' },
        { n: '2', text: 'En déduire la limite de $g$ en $+\\infty$. Quel théorème utilises-tu ?' },
      ],
    }],
  },
  {
    id: 'fonctions-3',
    context: 'Soit $h(x)=4+\\dfrac{\\cos x}{x^2}$ sur $\\mathbb{R}^*$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $4-\\dfrac{1}{x^2}\\leq h(x)\\leq 4+\\dfrac{1}{x^2}$.' },
        { n: '2', text: 'En déduire la limite de $h$ en $+\\infty$.' },
        { n: '3', text: 'Même question en $-\\infty$.' },
      ],
    }],
  },
  {
    id: 'fonctions-4',
    context: 'Deux limites à calculer en levant les formes indéterminées.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{2x^2-3x+1}{x^2+1}$ (forme $\\dfrac{\\infty}{\\infty}$, factoriser par $x^2$).' },
        { n: '2', text: 'Calculer $\\displaystyle\\lim_{x\\to+\\infty}\\bigl(\\sqrt{x^2+x}-x\\bigr)$ (forme $\\infty-\\infty$, utiliser la quantité conjuguée).' },
      ],
    }],
  },
  {
    id: 'fonctions-5',
    context: 'Soit $f(x)=\\dfrac{2x+1}{x-1}$ définie sur $\\mathbb{R}\\setminus\\{1\\}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $\\displaystyle\\lim_{x\\to+\\infty}f(x)$ et $\\displaystyle\\lim_{x\\to-\\infty}f(x)$. Quelle est l\'asymptote horizontale ?' },
        { n: '2', text: 'Étudier le comportement de $f$ au voisinage de $x=1$ (limite à gauche et à droite). Quelle est l\'asymptote verticale ?' },
      ],
    }],
  },
  {
    id: 'fonctions-6',
    context: 'On considère $h(x)=e^x-x^3$ sur $\\mathbb{R}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Écrire $h(x)=x^3\\!\\left(\\dfrac{e^x}{x^3}-1\\right)$ pour $x>0$. Que vaut $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^3}$ ? (croissances comparées)' },
        { n: '2', text: 'En déduire $\\displaystyle\\lim_{x\\to+\\infty}h(x)$.' },
      ],
    }],
  },
  {
    id: 'fonctions-7',
    context: 'Deux limites mettant en jeu la fonction exponentielle.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{e^x}{x^2+1}$. (On peut écrire $\\dfrac{e^x}{x^2+1}=\\dfrac{e^x}{x^2}\\cdot\\dfrac{1}{1+\\frac{1}{x^2}}$.)' },
        { n: '2', text: 'Calculer $\\displaystyle\\lim_{x\\to-\\infty}x\\,e^x$. (Poser $t=-x\\to+\\infty$.)' },
      ],
    }],
  },
  // ── TIER 2 ── Méthodes ★★ ────────────────────────────────────────────────
  {
    id: 'fonctions-8',
    context: 'Déterminer une équation de la tangente à la courbe $\\mathcal{C}_f$ au point indiqué.',
    parts: [{
      questions: [
        { n: '1', text: '$f(x)=x^3$ au point d\'abscisse $x=1$ (calculer $f\'(1)$ et $f(1)$).' },
        { n: '2', text: '$f(x)=e^x$ au point d\'abscisse $x=0$.' },
      ],
    }],
  },
  {
    id: 'fonctions-9',
    context: 'Dériver les fonctions composées suivantes en appliquant $(u(g(x)))'= g\'(x)\\cdot u\'(g(x))$.',
    parts: [{
      questions: [
        { n: '1', text: '$f(x)=e^{-x^2}$ (poser $u=-x^2$).' },
        { n: '2', text: '$g(x)=\\sqrt{x^2+1}$ (poser $u=x^2+1$).' },
        { n: '3', text: '$h(x)=(2x-1)^4$ (poser $u=2x-1$).' },
      ],
    }],
  },
  {
    id: 'fonctions-10',
    context: 'Soit $g(x)=\\dfrac{-2x}{x^2+1}$ définie sur $\\mathbb{R}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Étudier les limites de $g$ en $\\pm\\infty$. Que peut-on en déduire graphiquement ?' },
        { n: '2', text: 'Calculer $g\'(x)=\\dfrac{-2(x^2+1)-(-2x)\\cdot 2x}{(x^2+1)^2}$ et simplifier pour obtenir $\\dfrac{2x^2-2}{(x^2+1)^2}$.' },
        { n: '3', text: 'Étudier le signe de $g\'$ et dresser le tableau de variations de $g$ (préciser les extrema locaux).' },
      ],
    }],
  },
  {
    id: 'fonctions-11',
    context: 'Soit $f(x)=x^3-3x^2+x-1$.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer $\\displaystyle\\lim_{x\\to\\pm\\infty}f(x)$ (terme dominant $x^3$).' },
        { n: '2', text: 'Calculer $f\'(x)$, étudier son signe (discriminant $\\Delta$), et dresser le tableau de variations.' },
        { n: '3', text: 'En déduire le nombre de solutions de $f(x)=0$ sur $\\mathbb{R}$.' },
      ],
    }],
  },
  {
    id: 'fonctions-12',
    context: 'Soit $f(x)=x\\,e^x$ sur $\\mathbb{R}$. On étudie sa convexité.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $f\'(x)=(1+x)e^x$, puis calculer $f\'\'(x)$.' },
        { n: '2', text: 'Étudier le signe de $f\'\'(x)$ (rappel : $e^x>0$ pour tout $x$).' },
        { n: '3', text: 'En déduire les intervalles de convexité et de concavité. Donner l\'abscisse du point d\'inflexion.' },
      ],
    }],
  },
  {
    id: 'fonctions-13',
    context: 'Soit $f(x)=x^4-6x^2$.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $f\'(x)$ puis $f\'\'(x)$.' },
        { n: '2', text: 'Résoudre $f\'\'(x)=0$ et étudier le signe de $f\'\'$ sur chaque intervalle.' },
        { n: '3', text: 'Déterminer les intervalles de convexité et de concavité, et les points d\'inflexion.' },
      ],
    }],
  },
  {
    id: 'fonctions-14',
    context: 'On veut démontrer que $e^x\\geq x+1$ pour tout $x\\in\\mathbb{R}$ en utilisant la convexité de $f(x)=e^x$.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $f\'\'(x)=e^x>0$ : la fonction $e^x$ est **convexe** sur $\\mathbb{R}$.' },
        { n: '2', text: 'Écrire l\'équation de la tangente $T$ à $\\mathcal{C}_f$ au point d\'abscisse $0$.' },
        { n: '3', text: 'Rappeler la propriété liant courbe convexe et tangentes, et conclure que $e^x\\geq x+1$ pour tout $x$.' },
      ],
    }],
  },
  // ── TIER 3 ── Type Bac ★★★ ───────────────────────────────────────────────
  {
    id: 'fonctions-15',
    context: 'On étudie $f(x)=|x|$ en $x=0$ pour distinguer continuité et dérivabilité.',
    parts: [{
      questions: [
        { n: '1', text: 'Montrer que $f$ est continue en $0$ : calculer $\\displaystyle\\lim_{x\\to 0}|x|$ et comparer à $f(0)$.' },
        { n: '2', text: 'Étudier la dérivabilité de $f$ en $0$ : calculer $\\dfrac{|x|-0}{x-0}$ pour $x>0$ et pour $x<0$, puis conclure.' },
        { n: '3', text: 'Que conclut-on sur la réciproque de « dérivable $\\Rightarrow$ continue » ?' },
      ],
    }],
  },
  {
    id: 'fonctions-16',
    context: 'Soit $f(x)=x^3+4x^2+4x$ définie sur $[-3,0]$.',
    parts: [{
      questions: [
        { n: '1', text: 'Justifier que $f$ est continue sur $[-3,0]$.' },
        { n: '2', text: 'Calculer $f(-3)$ et $f(0)$. Vérifier que $-1$ est compris entre ces deux valeurs.' },
        { n: '3', text: 'Appliquer le TVI : conclure qu\'il existe $c\\in[-3,0]$ tel que $f(c)=-1$.' },
      ],
    }],
  },
  {
    id: 'fonctions-17',
    context: 'Soit $f(x)=x^3+x-1$ sur $\\mathbb{R}$. On cherche à localiser sa racine.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $f\'(x)$ et montrer que $f\'(x)>0$ pour tout $x$ : $f$ est **strictement croissante** sur $\\mathbb{R}$.' },
        { n: '2', text: 'Calculer $f(0)$ et $f(1)$. Montrer que l\'équation $f(x)=0$ admet une **unique** solution $\\alpha\\in]0,1[$.' },
        { n: '3', text: 'Calculer $f(0{,}6)$ et $f(0{,}7)$ pour donner un encadrement de $\\alpha$ d\'amplitude $0{,}1$.' },
      ],
    }],
  },
  {
    id: 'fonctions-18',
    context: 'Soit $f(x)=x^3-3x+1$ sur $\\mathbb{R}$. On cherche le nombre de solutions de $f(x)=0$.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $f\'(x)=3x^2-3$, étudier son signe et dresser le tableau de variations de $f$ en précisant les extrema locaux $f(-1)$ et $f(1)$.' },
        { n: '2', text: 'Déterminer les limites de $f$ en $\\pm\\infty$.' },
        { n: '3', text: 'En appliquant le TVI sur chaque intervalle de monotonie, montrer que $f(x)=0$ admet **exactement trois** solutions réelles.' },
      ],
    }],
  },
  // ── TIER 4 ── Défis ◆ ────────────────────────────────────────────────────
  {
    id: 'fonctions-19',
    context: 'Soit $f$ définie sur $\\mathbb{R}$ par $f(x)=(x+1)e^{-x}$, de courbe $\\mathcal{C}_f$. Étude complète.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les limites de $f$ en $-\\infty$ et en $+\\infty$. Interpréter graphiquement la limite en $+\\infty$.' },
        { n: '2', text: 'Montrer que $f\'(x)=-x\\,e^{-x}$. Dresser le tableau de variations de $f$.' },
        { n: '3', text: 'Déterminer une équation de la tangente $T$ à $\\mathcal{C}_f$ au point d\'abscisse $0$.' },
        { n: '4', text: 'Calculer $f\'\'(x)$, étudier son signe, et donner l\'abscisse du point d\'inflexion de $\\mathcal{C}_f$.' },
      ],
    }],
  },
  {
    id: 'fonctions-20',
    context: 'Soit $f(x)=x\\,e^x$ sur $\\mathbb{R}$. Étude complète avec convexité.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer $\\displaystyle\\lim_{x\\to-\\infty}f(x)$ (croissance comparée) et $\\displaystyle\\lim_{x\\to+\\infty}f(x)$.' },
        { n: '2', text: 'Montrer que $f\'(x)=(1+x)e^x$. Étudier son signe et dresser le tableau de variations (préciser le minimum de $f$).' },
        { n: '3', text: 'Calculer $f\'\'(x)$, étudier son signe, et déterminer le point d\'inflexion de $\\mathcal{C}_f$.' },
      ],
    }],
  },
  {
    id: 'fonctions-21',
    context: 'Soit $f(x)=x^3+x-3$ sur $\\mathbb{R}$. Étude de la racine de $f$.',
    parts: [{
      questions: [
        { n: '1', text: 'Justifier que $f$ est continue et strictement croissante sur $\\mathbb{R}$.' },
        { n: '2', text: 'En déduire que l\'équation $f(x)=0$ admet une **unique** solution $\\alpha$.' },
        { n: '3', text: 'Vérifier que $1<\\alpha<2$, puis donner un encadrement de $\\alpha$ d\'amplitude $0{,}1$.' },
      ],
    }],
  },
];

// ── Corrections ───────────────────────────────────────────────────────────────
export const FONCTIONS_CORRECTIONS: Record<string, Correction> = {
  'fonctions-1': {
    steps: [
      { n: '1', text: '$\\lim_{x\\to+\\infty}f(x)=0$ signifie : pour tout $\\varepsilon>0$, il existe $B>0$ tel que $x>B\\Rightarrow|f(x)|\\leq\\varepsilon$.' },
      { n: '2', text: 'Pour $x>0$, $\\left|\\dfrac{1}{x}\\right|=\\dfrac{1}{x}$. On a $\\dfrac{1}{x}\\leq\\varepsilon\\iff x\\geq\\dfrac{1}{\\varepsilon}$. En posant $B=\\dfrac{1}{\\varepsilon}$, pour tout $x>B$ on a bien $\\left|\\dfrac{1}{x}\\right|\\leq\\varepsilon$.' },
      { n: '3', text: 'La condition de la définition est satisfaite pour tout $\\varepsilon>0$.' },
    ],
    result: '$\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{1}{x}=0$',
  },
  'fonctions-2': {
    steps: [
      { n: '1', text: 'Pour $x>0$ : $-1\\leq\\cos x\\leq 1$. En divisant par $x>0$ (sens conservé) : $-\\dfrac{1}{x}\\leq\\dfrac{\\cos x}{x}\\leq\\dfrac{1}{x}$.' },
      { n: '2', text: '$\\displaystyle\\lim_{x\\to+\\infty}\\left(-\\dfrac{1}{x}\\right)=0$ et $\\displaystyle\\lim_{x\\to+\\infty}\\dfrac{1}{x}=0$. Par le **théorème des gendarmes**, $g(x)\\to 0$.' },
    ],
    result: '$\\displaystyle\\lim_{x\\to+\\infty}g(x)=0$',
  },
  'fonctions-3': {
    steps: [
      { n: '1', text: '$-1\\leq\\cos x\\leq 1$ donne $-\\dfrac{1}{x^2}\\leq\\dfrac{\\cos x}{x^2}\\leq\\dfrac{1}{x^2}$, d\'où $4-\\dfrac{1}{x^2}\\leq h(x)\\leq 4+\\dfrac{1}{x^2}$.' },
      { n: '2', text: '$\\pm\\dfrac{1}{x^2}\\to 0$ en $+\\infty$. Par les gendarmes, $h(x)\\to 4$.' },
      { n: '3', text: 'En $-\\infty$ : même encadrement car $x^2>0$. $\\pm\\dfrac{1}{x^2}\\to 0$, donc $h(x)\\to 4$.' },
    ],
    result: '$\\displaystyle\\lim_{\\pm\\infty}h(x)=4$ : asymptote horizontale $y=4$',
  },
  'fonctions-4': {
    steps: [
      { n: '1', text: '$\\dfrac{2x^2-3x+1}{x^2+1}=\\dfrac{x^2(2-\\frac{3}{x}+\\frac{1}{x^2})}{x^2(1+\\frac{1}{x^2})}=\\dfrac{2-\\frac{3}{x}+\\frac{1}{x^2}}{1+\\frac{1}{x^2}}\\to\\dfrac{2}{1}=2$.' },
      { n: '2', text: '$\\sqrt{x^2+x}-x=\\dfrac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x}=\\dfrac{x}{\\sqrt{x^2+x}+x}=\\dfrac{1}{\\sqrt{1+\\frac{1}{x}}+1}\\to\\dfrac{1}{2}$.' },
    ],
    result: '$\\lim_1=2$ et $\\lim_2=\\dfrac{1}{2}$',
  },
  'fonctions-5': {
    steps: [
      { n: '1', text: 'En $\\pm\\infty$ : $\\dfrac{2x+1}{x-1}=\\dfrac{2+\\frac{1}{x}}{1-\\frac{1}{x}}\\to 2$. Asymptote horizontale $y=2$.' },
      { n: '2', text: 'Au voisinage de $1$ : numérateur $\\to 3\\neq 0$, dénominateur $\\to 0^+$ ou $0^-$. Donc $f(x)\\to+\\infty$ par valeurs supérieures et $f(x)\\to-\\infty$ par valeurs inférieures. Asymptote verticale $x=1$.' },
    ],
    result: 'Asymptotes : $y=2$ (horizontale) et $x=1$ (verticale)',
  },
  'fonctions-6': {
    steps: [
      { n: '1', text: 'Pour $x>0$ : $h(x)=x^3\\!\\left(\\dfrac{e^x}{x^3}-1\\right)$. Par croissances comparées, $\\dfrac{e^x}{x^3}\\to+\\infty$ en $+\\infty$.' },
      { n: '2', text: '$x^3\\to+\\infty$ et $\\dfrac{e^x}{x^3}-1\\to+\\infty$, donc le produit $\\to+\\infty$.' },
    ],
    result: '$\\displaystyle\\lim_{x\\to+\\infty}(e^x-x^3)=+\\infty$',
  },
  'fonctions-7': {
    steps: [
      { n: '1', text: '$\\dfrac{e^x}{x^2+1}=\\dfrac{e^x}{x^2}\\cdot\\dfrac{1}{1+\\frac{1}{x^2}}\\to+\\infty\\times 1=+\\infty$ (croissance comparée : $x^2\\ll e^x$).' },
      { n: '2', text: 'Posons $t=-x$ : $xe^x=-t\\,e^{-t}=-\\dfrac{t}{e^t}\\to 0$ car $t\\to+\\infty$ et $\\dfrac{t}{e^t}\\to 0$ (croissance comparée).' },
    ],
    result: '$\\lim_1=+\\infty$, $\\lim_2=0$',
  },
  'fonctions-8': {
    steps: [
      { n: '1', text: '$f\'(x)=3x^2$, $f\'(1)=3$, $f(1)=1$. Tangente : $y=3(x-1)+1=3x-2$.' },
      { n: '2', text: '$f\'(x)=e^x$, $f\'(0)=1$, $f(0)=1$. Tangente : $y=1(x-0)+1=x+1$.' },
    ],
    result: 'Tangentes : $y=3x-2$ et $y=x+1$',
  },
  'fonctions-9': {
    steps: [
      { n: '1', text: '$u=-x^2$, $u\'=-2x$. Formule $(e^u)\'=u\'e^u$ : $f\'(x)=-2x\\,e^{-x^2}$.' },
      { n: '2', text: '$u=x^2+1$, $u\'=2x$. Formule $(\\sqrt{u})\'=\\dfrac{u\'}{2\\sqrt{u}}$ : $g\'(x)=\\dfrac{2x}{2\\sqrt{x^2+1}}=\\dfrac{x}{\\sqrt{x^2+1}}$.' },
      { n: '3', text: '$u=2x-1$, $u\'=2$. Formule $(u^4)\'=4u\'u^3$ : $h\'(x)=4\\cdot 2\\cdot(2x-1)^3=8(2x-1)^3$.' },
    ],
    result: '$f\'=-2xe^{-x^2}$ ; $g\'=\\dfrac{x}{\\sqrt{x^2+1}}$ ; $h\'=8(2x-1)^3$',
  },
  'fonctions-10': {
    steps: [
      { n: '1', text: 'Terme dominant : $\\dfrac{-2x}{x^2+1}\\approx\\dfrac{-2x}{x^2}=\\dfrac{-2}{x}\\to 0$. Asymptote horizontale $y=0$.' },
      { n: '2', text: '$g\'=\\dfrac{-2(x^2+1)-(-2x)(2x)}{(x^2+1)^2}=\\dfrac{-2x^2-2+4x^2}{(x^2+1)^2}=\\dfrac{2x^2-2}{(x^2+1)^2}=\\dfrac{2(x-1)(x+1)}{(x^2+1)^2}$.' },
      { n: '3', text: '$g\'\\geq 0\\iff x^2\\geq 1$. $g$ croissante sur $]-\\infty,-1]$ et $[1,+\\infty[$, décroissante sur $[-1,1]$. Max local $g(-1)=1$, min local $g(1)=-1$.' },
    ],
    result: 'Max local $1$ en $x=-1$, min local $-1$ en $x=1$, asymptote $y=0$',
  },
  'fonctions-11': {
    steps: [
      { n: '1', text: 'Terme dominant $x^3$ : $f\\to-\\infty$ en $-\\infty$ et $f\\to+\\infty$ en $+\\infty$.' },
      { n: '2', text: '$f\'(x)=3x^2-6x+1$. Discriminant : $\\Delta=36-12=24>0$. Racines : $x_{1,2}=\\dfrac{6\\pm 2\\sqrt{6}}{6}=1\\pm\\dfrac{\\sqrt{6}}{3}\\approx 0{,}18$ et $1{,}82$. $f\'<0$ entre les racines, $f\'>0$ à l\'extérieur.' },
      { n: '3', text: 'Comme $f\\to-\\infty$, croît jusqu\'à un max local, décroît jusqu\'à un min local (en-dessous de $0$ ?), puis croît vers $+\\infty$ : à vérifier avec les valeurs $f(x_1)$ et $f(x_2)$.' },
    ],
    result: '$f$ croissante sur $]-\\infty,x_1]$, décroissante sur $[x_1,x_2]$, croissante sur $[x_2,+\\infty[$',
  },
  'fonctions-12': {
    steps: [
      { n: '1', text: '$f\'(x)=e^x+xe^x=(1+x)e^x$. $f\'\'(x)=e^x+(1+x)e^x=(2+x)e^x$.' },
      { n: '2', text: '$e^x>0$ toujours, donc $f\'\'(x)\\geq 0\\iff 2+x\\geq 0\\iff x\\geq-2$.' },
      { n: '3', text: '$f$ concave sur $]-\\infty,-2]$, convexe sur $[-2,+\\infty[$. Point d\'inflexion en $x=-2$.' },
    ],
    result: 'Point d\'inflexion en $x=-2$, convexe pour $x\\geq -2$',
  },
  'fonctions-13': {
    steps: [
      { n: '1', text: '$f\'(x)=4x^3-12x$, $f\'\'(x)=12x^2-12=12(x^2-1)=12(x-1)(x+1)$.' },
      { n: '2', text: '$f\'\'(x)\\geq 0\\iff x^2\\geq 1\\iff x\\leq-1$ ou $x\\geq 1$.' },
      { n: '3', text: 'Convexe sur $]-\\infty,-1]$ et $[1,+\\infty[$, concave sur $[-1,1]$. Points d\'inflexion en $x=-1$ et $x=1$.' },
    ],
    result: 'Points d\'inflexion en $x=-1$ et $x=1$',
  },
  'fonctions-14': {
    steps: [
      { n: '1', text: '$f\'\'(x)=(e^x)\'\'=e^x>0$ pour tout $x$ : $f(x)=e^x$ est convexe sur $\\mathbb{R}$.' },
      { n: '2', text: '$f\'(0)=1$ et $f(0)=1$, donc la tangente en $0$ est $T:y=1(x-0)+1=x+1$.' },
      { n: '3', text: 'Une fonction convexe est **au-dessus de chacune de ses tangentes**. Donc pour tout $x\\in\\mathbb{R}$, $e^x\\geq x+1$.' },
    ],
    result: '$e^x\\geq x+1$ pour tout $x\\in\\mathbb{R}$ (inégalité fondamentale de la convexité)',
  },
  'fonctions-15': {
    steps: [
      { n: '1', text: '$\\displaystyle\\lim_{x\\to 0}|x|=0=|0|=f(0)$ : $f$ est continue en $0$.' },
      { n: '2', text: 'Taux d\'accroissement : $\\dfrac{|x|-0}{x-0}=\\dfrac{|x|}{x}$. Pour $x>0$ : vaut $1$. Pour $x<0$ : vaut $-1$. Limites à gauche ($-1$) et à droite ($1$) différentes : pas de limite, donc **non dérivable en $0$**.' },
      { n: '3', text: 'La réciproque de « dérivable $\\Rightarrow$ continue » est **fausse** : $|x|$ est continue mais non dérivable en $0$.' },
    ],
    result: '$|x|$ : continue mais non dérivable en $0$ (point anguleux)',
  },
  'fonctions-16': {
    steps: [
      { n: '1', text: '$f$ est polynomiale, donc continue sur $\\mathbb{R}$, en particulier sur $[-3,0]$.' },
      { n: '2', text: '$f(-3)=(-27)+4\\times 9+4\\times(-3)=-27+36-12=-3$ et $f(0)=0$. On a $-3\\leq-1\\leq 0$, donc $-1\\in[f(-3),f(0)]$.' },
      { n: '3', text: '$f$ est continue sur $[-3,0]$ et $-1$ est entre $f(-3)=-3$ et $f(0)=0$. Par le TVI, il existe $c\\in[-3,0]$ tel que $f(c)=-1$.' },
    ],
    result: 'Il existe $c\\in[-3,0]$ tel que $f(c)=-1$',
  },
  'fonctions-17': {
    steps: [
      { n: '1', text: '$f\'(x)=3x^2+1\\geq 1>0$ pour tout $x$ : $f$ est **strictement croissante** (et continue) sur $\\mathbb{R}$.' },
      { n: '2', text: '$f(0)=-1<0$ et $f(1)=1+1-1=1>0$. Par le corollaire du TVI (monotonie stricte), $f(x)=0$ admet une **unique** solution $\\alpha\\in]0,1[$.' },
      { n: '3', text: '$f(0{,}6)=0{,}216+0{,}6-1=-0{,}184<0$ et $f(0{,}7)=0{,}343+0{,}7-1=0{,}043>0$. Donc $0{,}6<\\alpha<0{,}7$.' },
    ],
    result: 'Unique solution $\\alpha$ avec $0{,}6<\\alpha<0{,}7$',
  },
  'fonctions-18': {
    steps: [
      { n: '1', text: '$f\'(x)=3x^2-3=3(x-1)(x+1)$. $f\'<0$ sur $]-1,1[$, $f\'>0$ à l\'extérieur. Max local $f(-1)=3>0$, min local $f(1)=-1<0$.' },
      { n: '2', text: '$f\\to-\\infty$ en $-\\infty$ et $f\\to+\\infty$ en $+\\infty$.' },
      { n: '3', text: 'Sur $]-\\infty,-1]$ : $f$ croît de $-\\infty$ à $3>0$ → une racine. Sur $[-1,1]$ : $f$ décroît de $3$ à $-1<0$ → une racine. Sur $[1,+\\infty[$ : $f$ croît de $-1$ à $+\\infty$ → une racine.' },
    ],
    result: '$x^3-3x+1=0$ admet exactement **trois** solutions réelles',
  },
  'fonctions-19': {
    steps: [
      { n: '1', text: 'En $-\\infty$ : $(x+1)\\to-\\infty$ et $e^{-x}\\to+\\infty$, donc $f(x)\\to-\\infty$. En $+\\infty$ : $f(x)=\\dfrac{x+1}{e^x}\\to 0$ (croissances comparées). **Asymptote $y=0$** en $+\\infty$.' },
      { n: '2', text: '$f\'(x)=e^{-x}+(x+1)(-e^{-x})=(1-(x+1))e^{-x}=-xe^{-x}$. $f\'\\geq 0\\iff x\\leq 0$. Maximum $f(0)=1$, décroît sur $[0,+\\infty[$.' },
      { n: '3', text: '$f\'(0)=0$ et $f(0)=1$ : tangente $T:y=0\\cdot(x-0)+1=1$ (tangente horizontale en $0$).' },
      { n: '4', text: '$f\'\'(x)=-e^{-x}-x(-e^{-x})=(x-1)e^{-x}$. $f\'\'\\geq 0\\iff x\\geq 1$. Concave sur $]-\\infty,1]$, convexe sur $[1,+\\infty[$. **Point d\'inflexion en $x=1$**.' },
    ],
    result: 'Max $f(0)=1$ ; asymptote $y=0$ ; tangente $y=1$ ; inflexion en $x=1$',
  },
  'fonctions-20': {
    steps: [
      { n: '1', text: 'En $-\\infty$ : $xe^x=\\dfrac{x}{e^{-x}}=-\\dfrac{-x}{e^{-x}}\\to 0$ (croissances comparées : $|-x|\\ll e^{-x}$ quand $x\\to-\\infty$). En $+\\infty$ : $xe^x\\to+\\infty$.' },
      { n: '2', text: '$f\'(x)=(1+x)e^x$. $f\'\\geq 0\\iff x\\geq-1$. Min $f(-1)=-e^{-1}=-\\dfrac{1}{e}$. $f$ décroît sur $]-\\infty,-1]$, croît sur $[-1,+\\infty[$.' },
      { n: '3', text: '$f\'\'(x)=e^x+(1+x)e^x=(2+x)e^x$. $f\'\'\\geq 0\\iff x\\geq-2$. Concave sur $]-\\infty,-2]$, convexe sur $[-2,+\\infty[$. **Inflexion en $x=-2$**.' },
    ],
    result: 'Minimum $-\\dfrac{1}{e}$ en $x=-1$ ; point d\'inflexion en $x=-2$',
  },
  'fonctions-21': {
    steps: [
      { n: '1', text: '$f$ est polynomiale → continue. $f\'(x)=3x^2+1\\geq 1>0$ pour tout $x$ → **strictement croissante**.' },
      { n: '2', text: '$f$ est continue et strictement monotone, $f\\to-\\infty$ en $-\\infty$ et $f\\to+\\infty$ en $+\\infty$. Par le corollaire du TVI, $f(x)=0$ admet une **unique** solution $\\alpha$.' },
      { n: '3', text: '$f(1)=1+1-3=-1<0$ et $f(2)=8+2-3=7>0$, donc $1<\\alpha<2$. On affine : $f(1{,}2)=1{,}728+1{,}2-3=-0{,}072<0$ et $f(1{,}3)=2{,}197+1{,}3-3=0{,}497>0$, d\'où $1{,}2<\\alpha<1{,}3$.' },
    ],
    result: 'Unique solution $\\alpha$ avec $1{,}2<\\alpha<1{,}3$',
  },
};
