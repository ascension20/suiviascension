import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const GEOMETRIE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Les vecteurs $\\vec{u}(1,2,3)$ et $\\vec{v}(2,4,6)$ sont…',
    options: [
      { label: 'a', text: 'colinéaires (car $\\vec{v}=2\\vec{u}$)' },
      { label: 'b', text: 'orthogonaux' },
      { label: 'c', text: 'non colinéaires' },
      { label: 'd', text: 'une base' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: '$\\|\\vec{u}(2,-2,1)\\|$ vaut…',
    options: [
      { label: 'a', text: '$5$' },
      { label: 'b', text: '$3$ (car $\\sqrt{4+4+1}$)' },
      { label: 'c', text: '$\\sqrt{5}$' },
      { label: 'd', text: '$9$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: '$\\vec{u}(1,-1,2)\\cdot\\vec{v}(2,1,-1)$ vaut…',
    options: [
      { label: 'a', text: '$-1$ (car $2-1-2$)' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$3$' },
      { label: 'd', text: '$5$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Un vecteur normal au plan $x-2y+z+5=0$ est…',
    options: [
      { label: 'a', text: '$(1,-2,1)$ (les coefficients de $x,y,z$)' },
      { label: 'b', text: '$(1,2,1)$' },
      { label: 'c', text: '$(-2,1,5)$' },
      { label: 'd', text: '$(5,0,0)$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'Une droite (directeur $\\vec{u}$) et un plan (normal $\\vec{n}$) sont sécants si et seulement si…',
    options: [
      { label: 'a', text: '$\\vec{u}\\cdot\\vec{n}=0$' },
      { label: 'b', text: '$\\vec{u}\\cdot\\vec{n}\\neq 0$' },
      { label: 'c', text: '$\\vec{u}$ et $\\vec{n}$ colinéaires' },
      { label: 'd', text: 'jamais' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'La distance de $O(0,0,0)$ au plan $2x+y-2z-6=0$ vaut…',
    options: [
      { label: 'a', text: '$2$ (car $|-6|/\\sqrt{9}$)' },
      { label: 'b', text: '$6$' },
      { label: 'c', text: '$3$' },
      { label: 'd', text: '$\\sqrt{6}$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'Trois points $A$, $B$, $C$ sont alignés si et seulement si…',
    options: [
      { label: 'a', text: '$\\vec{AB}\\cdot\\vec{AC}=0$' },
      { label: 'b', text: '$\\vec{AB}$ et $\\vec{AC}$ colinéaires' },
      { label: 'c', text: '$\\vec{AB}=\\vec{AC}$' },
      { label: 'd', text: '$AB=AC$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Deux plans dont les vecteurs normaux sont colinéaires sont…',
    options: [
      { label: 'a', text: 'sécants' },
      { label: 'b', text: 'parallèles (confondus ou strictement)' },
      { label: 'c', text: 'orthogonaux' },
      { label: 'd', text: 'toujours confondus' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Les vecteurs $\\vec{i}(1,0,0)$ et $\\vec{j}(0,1,0)$ sont…',
    options: [
      { label: 'a', text: 'colinéaires' },
      { label: 'b', text: 'orthogonaux (produit scalaire nul)' },
      { label: 'c', text: 'égaux' },
      { label: 'd', text: 'opposés' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La formule $\\|\\vec{u}\\|=\\sqrt{x^2+y^2+z^2}$ n\'est valable que…',
    options: [
      { label: 'a', text: 'dans tout repère' },
      { label: 'b', text: 'dans un repère orthonormé' },
      { label: 'c', text: 'si $\\vec{u}$ est unitaire' },
      { label: 'd', text: 'en dimension 2' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const GEOMETRIE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'geometrie-1',
    context: 'On travaille dans un repère orthonormé $(O\\,;\\vec{i},\\vec{j},\\vec{k})$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Les vecteurs $\\vec{u}(2,-4,6)$ et $\\vec{v}(-1,2,-3)$ sont-ils colinéaires ? Justifier.' },
      ],
    }],
  },
  {
    id: 'geometrie-2',
    context: 'Soit $A(1,2,-1)$ et $B(3,-1,1)$ dans un repère orthonormé.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la distance $AB$.' },
      ],
    }],
  },
  {
    id: 'geometrie-3',
    context: 'Soit $A(2,0,4)$ et $B(-2,6,2)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer les coordonnées du milieu $I$ de $[AB]$.' },
      ],
    }],
  },
  {
    id: 'geometrie-4',
    context: 'Soit la droite $\\mathcal{D}$ passant par $A(2,-1,3)$ et de vecteur directeur $\\vec{u}(1,2,-1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner une représentation paramétrique de $\\mathcal{D}$.' },
      ],
    }],
  },
  {
    id: 'geometrie-5',
    context: 'Soit $\\vec{u}(2,1,-3)$ et $\\vec{v}(1,-2,0)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils orthogonaux ? Justifier.' },
      ],
    }],
  },
  {
    id: 'geometrie-6',
    context: 'Soit le plan passant par $A(2,1,-1)$ et de vecteur normal $\\vec{n}(1,3,-2)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une équation cartésienne de ce plan.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'geometrie-7',
    context: 'On donne $\\vec{u}(1,0,1)$, $\\vec{v}(0,1,1)$ et $\\vec{w}(2,3,5)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ sont coplanaires en exprimant $\\vec{w}$ en fonction de $\\vec{u}$ et $\\vec{v}$.' },
      ],
    }],
  },
  {
    id: 'geometrie-8',
    context: 'Soit $A(1,2,3)$, $B(3,1,5)$ et $C(-1,3,1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Les points $A$, $B$, $C$ sont-ils alignés ?' },
      ],
    }],
  },
  {
    id: 'geometrie-9',
    context: 'Soit $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $AB$, $BC$, $CA$ et en déduire la nature du triangle $ABC$.' },
      ],
    }],
  },
  {
    id: 'geometrie-10',
    context: 'Soit $\\mathcal{D}$ de représentation paramétrique :',
    data: '\\begin{cases}x=1+2t\\\\y=-t\\\\z=2+t\\end{cases}\\quad t\\in\\mathbb{R}',
    parts: [{
      questions: [
        { n: 'a', text: 'Le point $M(5,-2,4)$ appartient-il à $\\mathcal{D}$ ?' },
        { n: 'b', text: 'Le point $N(3,-1,4)$ appartient-il à $\\mathcal{D}$ ?' },
      ],
    }],
  },
  {
    id: 'geometrie-11',
    context: 'Soit $\\vec{u}(1,0,1)$ et $\\vec{v}(0,1,1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer une mesure de l\'angle entre $\\vec{u}$ et $\\vec{v}$.' },
      ],
    }],
  },
  {
    id: 'geometrie-12',
    context: 'Soit $\\vec{u}(1,1,0)$ et $\\vec{v}(0,1,1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer un vecteur $\\vec{n}$ non nul orthogonal à la fois à $\\vec{u}$ et à $\\vec{v}$.' },
      ],
    }],
  },
  {
    id: 'geometrie-13',
    context: 'Soit $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer un vecteur normal au plan $(ABC)$.' },
        { n: 'b', text: 'En déduire une équation cartésienne de $(ABC)$.' },
      ],
    }],
  },
  {
    id: 'geometrie-14',
    context: 'On considère les plans $(P_1) : 2x-y+3z+1=0$ et $(P_2) : -4x+2y-6z+5=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Étudier la position relative des plans $(P_1)$ et $(P_2)$.' },
      ],
    }],
  },
  {
    id: 'geometrie-15',
    context: 'Soit $\\mathcal{D}$ de vecteur directeur $\\vec{u}(1,2,-1)$ passant par $A(0,0,1)$, et le plan $(P) : x+y+3z-2=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Étudier la position relative de $\\mathcal{D}$ et $(P)$.' },
      ],
    }],
  },
  {
    id: 'geometrie-16',
    context: 'On considère la droite $\\mathcal{D}$ et le plan $(P) : 2x-y+z-3=0$, avec :',
    data: '\\mathcal{D}:\\begin{cases}x=1+t\\\\y=2t\\\\z=-1+t\\end{cases}\\quad t\\in\\mathbb{R}',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer le point d\'intersection de $\\mathcal{D}$ et $(P)$.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'geometrie-17',
    context: 'Soit $M(1,2,3)$ et le plan $(P) : x+y+z-3=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la distance $d(M,P)$.' },
        { n: 'b', text: 'Déterminer les coordonnées du projeté orthogonal $H$ de $M$ sur $(P)$.' },
        { n: 'c', text: 'Vérifier que $MH=d(M,P)$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'geometrie-18',
    context: 'On considère le cube $ABCDEFGH$ d\'arête 1, muni du repère orthonormé $(A\\,;\\vec{AB},\\vec{AD},\\vec{AE})$. Ainsi $A(0,0,0)$, $B(1,0,0)$, $D(0,1,0)$, $E(0,0,1)$ et $G(1,1,1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les coordonnées de $G$, et le vecteur $\\vec{AG}$.' },
        { n: 'b', text: 'Montrer que $\\vec{AG}$ est orthogonal à $\\vec{BD}$ et à $\\vec{BE}$. Que peut-on en conclure sur $\\vec{AG}$ et le plan $(BDE)$ ?' },
        { n: 'c', text: 'En déduire une équation cartésienne du plan $(BDE)$.' },
        { n: 'd', text: 'Calculer la distance du point $G$ au plan $(BDE)$.' },
      ],
    }],
  },
  {
    id: 'geometrie-19',
    context: 'On considère la droite $\\mathcal{D}$ passant par $A(1,0,2)$ de vecteur directeur $\\vec{u}(2,-1,1)$, et le plan $(P) : x+2y+z-6=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner une représentation paramétrique de $\\mathcal{D}$.' },
        { n: 'b', text: 'Montrer que $\\mathcal{D}$ et $(P)$ sont sécants.' },
        { n: 'c', text: 'Déterminer les coordonnées de leur point d\'intersection.' },
        { n: 'd', text: 'Calculer la distance de l\'origine $O$ au plan $(P)$.' },
      ],
    }],
  },
  {
    id: 'geometrie-20',
    context: 'Soit $A(0,0,0)$, $B(2,0,0)$, $C(0,2,0)$ et $D(0,0,2)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que les vecteurs $\\vec{AB}$, $\\vec{AC}$, $\\vec{AD}$ sont deux à deux orthogonaux.' },
        { n: 'b', text: 'Calculer $BC$, $BD$, $CD$ et en déduire la nature du triangle $BCD$.' },
        { n: 'c', text: 'Déterminer une équation cartésienne du plan $(BCD)$.' },
        { n: 'd', text: 'Calculer la distance de $A$ au plan $(BCD)$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const GEOMETRIE_CORRECTIONS: Record<string, Correction> = {
  'geometrie-1': {
    steps: [
      { n: '1', text: 'On remarque que $\\vec{u}=-2\\,\\vec{v}$ car $-2\\times(-1,2,-3)=(2,-4,6)$. Les vecteurs sont donc **colinéaires**.' },
    ],
    result: '$\\vec{u}=-2\\vec{v}$ : **colinéaires**.',
  },
  'geometrie-2': {
    steps: [
      { n: '1', text: '$AB=\\sqrt{(3-1)^2+(-1-2)^2+(1-(-1))^2}=\\sqrt{4+9+4}=\\sqrt{17}\\approx 4{,}12$.' },
    ],
    result: '$AB=\\sqrt{17}$.',
  },
  'geometrie-3': {
    steps: [
      { n: '1', text: '$I\\left(\\dfrac{2+(-2)}{2},\\dfrac{0+6}{2},\\dfrac{4+2}{2}\\right)=(0\\,;3\\,;3)$.' },
    ],
    result: '$I(0\\,;3\\,;3)$.',
  },
  'geometrie-4': {
    steps: [
      { n: '1', text: 'Avec le point $A(2,-1,3)$ et le vecteur directeur $\\vec{u}(1,2,-1)$ :', tex: '\\begin{cases}x=2+t\\\\y=-1+2t\\\\z=3-t\\end{cases}\\quad t\\in\\mathbb{R}' },
    ],
    result: '$x=2+t$ ; $y=-1+2t$ ; $z=3-t$ ($t\\in\\mathbb{R}$).',
  },
  'geometrie-5': {
    steps: [
      { n: '1', text: '$\\vec{u}\\cdot\\vec{v}=2\\times 1+1\\times(-2)+(-3)\\times 0=2-2+0=0$. Les vecteurs sont **orthogonaux**.' },
    ],
    result: '$\\vec{u}\\cdot\\vec{v}=0$ : **orthogonaux**.',
  },
  'geometrie-6': {
    steps: [
      { n: '1', text: 'Le plan a une équation $x+3y-2z+d=0$ (les coefficients sont les coordonnées de $\\vec{n}$).' },
      { n: '2', text: 'En injectant $A(2,1,-1)$ : $2+3+2+d=0$, donc $d=-7$.' },
    ],
    result: '$x+3y-2z-7=0$.',
  },
  'geometrie-7': {
    steps: [
      { n: '1', text: 'On cherche $a,b$ tels que $\\vec{w}=a\\vec{u}+b\\vec{v}$, soit $(2,3,5)=(a,\\;b,\\;a+b)$.' },
      { n: '2', text: 'D\'où $a=2$, $b=3$, et l\'on vérifie $a+b=5$. ✓ Ainsi $\\vec{w}=2\\vec{u}+3\\vec{v}$ : les trois vecteurs sont **coplanaires**.' },
    ],
    result: '$\\vec{w}=2\\vec{u}+3\\vec{v}$ : **coplanaires**.',
  },
  'geometrie-8': {
    steps: [
      { n: '1', text: '$\\vec{AB}=(2,-1,2)$ et $\\vec{AC}=(-2,1,-2)=-\\vec{AB}$.' },
      { n: '2', text: 'Ces vecteurs sont colinéaires, donc $A$, $B$, $C$ sont **alignés**.' },
    ],
    result: '$\\vec{AC}=-\\vec{AB}$ : **points alignés**.',
  },
  'geometrie-9': {
    steps: [
      { n: '1', text: '$AB=\\sqrt{(-1)^2+1^2+0^2}=\\sqrt{2}$ ; $BC=\\sqrt{0^2+(-1)^2+1^2}=\\sqrt{2}$ ; $CA=\\sqrt{1^2+0^2+(-1)^2}=\\sqrt{2}$.' },
      { n: '2', text: 'Les trois côtés sont égaux : le triangle $ABC$ est **équilatéral**.' },
    ],
    result: '$AB=BC=CA=\\sqrt{2}$ : **équilatéral**.',
  },
  'geometrie-10': {
    steps: [
      { n: 'a', text: '$M(5,-2,4)$ : $1+2t=5\\Rightarrow t=2$ ; $-t=-2\\Rightarrow t=2$ ✓ ; $2+t=4\\Rightarrow t=2$ ✓. Le même $t=2$ convient partout : $M\\in\\mathcal{D}$.' },
      { n: 'b', text: '$N(3,-1,4)$ : $1+2t=3\\Rightarrow t=1$ ; $-t=-1\\Rightarrow t=1$ ✓ ; mais $2+t=4\\Rightarrow t=2\\neq 1$. Incompatible : $N\\notin\\mathcal{D}$.' },
    ],
    result: '$M\\in\\mathcal{D}$ ; $N\\notin\\mathcal{D}$.',
  },
  'geometrie-11': {
    steps: [
      { n: '1', text: '$\\vec{u}\\cdot\\vec{v}=0+0+1=1$ ; $\\|\\vec{u}\\|=\\|\\vec{v}\\|=\\sqrt{2}$.' },
      { n: '2', text: 'Donc $\\cos(\\vec{u},\\vec{v})=\\dfrac{1}{\\sqrt{2}\\times\\sqrt{2}}=\\dfrac{1}{2}$, d\'où un angle de $60°$.' },
    ],
    result: 'Angle $=60°$.',
  },
  'geometrie-12': {
    steps: [
      { n: '1', text: 'On cherche $\\vec{n}(a,b,c)$ tel que $\\vec{n}\\cdot\\vec{u}=a+b=0$ et $\\vec{n}\\cdot\\vec{v}=b+c=0$. Donc $a=-b$ et $c=-b$.' },
      { n: '2', text: 'En prenant $b=-1$ : $\\vec{n}(1,-1,1)$. Vérification : $(1,-1,1)\\cdot(1,1,0)=0$ et $(1,-1,1)\\cdot(0,1,1)=0$. ✓' },
    ],
    result: '$\\vec{n}(1,-1,1)$ convient.',
  },
  'geometrie-13': {
    steps: [
      { n: 'a', text: '$\\vec{AB}(-1,2,0)$ et $\\vec{AC}(-1,0,3)$. On cherche $\\vec{n}(a,b,c)$ avec $\\vec{n}\\cdot\\vec{AB}=-a+2b=0$ et $\\vec{n}\\cdot\\vec{AC}=-a+3c=0$. Donc $a=2b$ et $a=3c$ : en prenant $a=6$, on obtient $\\vec{n}(6,3,2)$.' },
      { n: 'b', text: '$6x+3y+2z+d=0$, en injectant $A(1,0,0)$ : $6+d=0$, donc $d=-6$.' },
    ],
    result: '$\\vec{n}(6,3,2)$ ; $(ABC) : 6x+3y+2z-6=0$.',
  },
  'geometrie-14': {
    steps: [
      { n: '1', text: '$\\vec{n_1}(2,-1,3)$ et $\\vec{n_2}(-4,2,-6)=-2\\,\\vec{n_1}$ : les normaux sont colinéaires, donc les plans sont **parallèles**.' },
      { n: '2', text: 'Les équations ne sont pas proportionnelles (le terme constant $5$ ne suit pas le facteur $-2$), donc les plans sont **strictement parallèles** (non confondus).' },
    ],
    result: 'Plans **strictement parallèles**.',
  },
  'geometrie-15': {
    steps: [
      { n: '1', text: '$\\vec{u}(1,2,-1)$, $\\vec{n}(1,1,3)$ : $\\vec{u}\\cdot\\vec{n}=1+2-3=0$, donc $\\mathcal{D}$ est parallèle à $(P)$.' },
      { n: '2', text: 'Le point $A(0,0,1)$ vérifie $0+0+3-2=1\\neq 0$, donc $A\\notin(P)$ : $\\mathcal{D}$ est **strictement parallèle** à $(P)$.' },
    ],
    result: '$\\mathcal{D}$ strictement parallèle à $(P)$.',
  },
  'geometrie-16': {
    steps: [
      { n: '1', text: 'On substitue $(1+t,\\;2t,\\;-1+t)$ dans $2x-y+z-3=0$ : $2(1+t)-2t+(-1+t)-3=0\\iff t-2=0\\iff t=2$.' },
      { n: '2', text: 'Le point d\'intersection est $(3\\,;4\\,;1)$. Vérification : $6-4+1-3=0$. ✓' },
    ],
    result: 'Intersection : $(3\\,;4\\,;1)$.',
  },
  'geometrie-17': {
    steps: [
      { n: 'a', text: '$d(M,P)=\\dfrac{|1+2+3-3|}{\\sqrt{1^2+1^2+1^2}}=\\dfrac{3}{\\sqrt{3}}=\\sqrt{3}$.' },
      { n: 'b', text: 'La droite passant par $M$ de vecteur directeur $\\vec{n}(1,1,1)$ est $(1+t,\\;2+t,\\;3+t)$. En l\'injectant dans $(P)$ : $(1+t)+(2+t)+(3+t)-3=0\\Rightarrow 3+3t=0\\Rightarrow t=-1$. Donc $H(0\\,;1\\,;2)$.' },
      { n: 'c', text: '$MH=\\sqrt{1^2+1^2+1^2}=\\sqrt{3}=d(M,P)$. ✓' },
    ],
    result: '$d(M,P)=\\sqrt{3}$ ; $H(0\\,;1\\,;2)$.',
  },
  'geometrie-18': {
    steps: [
      { n: 'a', text: '$G(1,1,1)$ et $\\vec{AG}=(1,1,1)$.' },
      { n: 'b', text: '$\\vec{BD}=(-1,1,0)$, $\\vec{BE}=(-1,0,1)$. Alors $\\vec{AG}\\cdot\\vec{BD}=-1+1+0=0$ et $\\vec{AG}\\cdot\\vec{BE}=-1+0+1=0$. $\\vec{AG}$ est orthogonal à deux vecteurs non colinéaires du plan $(BDE)$, donc $\\vec{AG}$ est **normal** au plan $(BDE)$.' },
      { n: 'c', text: '$(BDE)$ a pour vecteur normal $\\vec{AG}(1,1,1)$ : $x+y+z+d=0$. En injectant $B(1,0,0)$ : $1+d=0$, donc $(BDE) : x+y+z-1=0$.' },
      { n: 'd', text: '$d(G,BDE)=\\dfrac{|1+1+1-1|}{\\sqrt{3}}=\\dfrac{2}{\\sqrt{3}}=\\dfrac{2\\sqrt{3}}{3}\\approx 1{,}15$.' },
    ],
    result: '$(BDE) : x+y+z-1=0$ ; $d(G,BDE)=\\dfrac{2\\sqrt{3}}{3}$.',
  },
  'geometrie-19': {
    steps: [
      { n: 'a', text: 'Avec $A(1,0,2)$ et $\\vec{u}(2,-1,1)$ :', tex: '\\begin{cases}x=1+2t\\\\y=-t\\\\z=2+t\\end{cases}\\quad t\\in\\mathbb{R}' },
      { n: 'b', text: '$\\vec{u}(2,-1,1)$, $\\vec{n}(1,2,1)$ : $\\vec{u}\\cdot\\vec{n}=2-2+1=1\\neq 0$, donc $\\mathcal{D}$ et $(P)$ sont **sécants**.' },
      { n: 'c', text: '$(1+2t)+2(-t)+(2+t)-6=0\\Rightarrow t-3=0\\Rightarrow t=3$. Point d\'intersection : $(7\\,;-3\\,;5)$. Vérification : $7-6+5-6=0$. ✓' },
      { n: 'd', text: '$d(O,P)=\\dfrac{|0+0+0-6|}{\\sqrt{1^2+2^2+1^2}}=\\dfrac{6}{\\sqrt{6}}=\\sqrt{6}\\approx 2{,}45$.' },
    ],
    result: 'Intersection $(7\\,;-3\\,;5)$ ; $d(O,P)=\\sqrt{6}$.',
  },
  'geometrie-20': {
    steps: [
      { n: 'a', text: '$\\vec{AB}(2,0,0)$, $\\vec{AC}(0,2,0)$, $\\vec{AD}(0,0,2)$ : $\\vec{AB}\\cdot\\vec{AC}=0$, $\\vec{AB}\\cdot\\vec{AD}=0$, $\\vec{AC}\\cdot\\vec{AD}=0$. Ils sont **deux à deux orthogonaux**.' },
      { n: 'b', text: '$BC=\\sqrt{(-2)^2+2^2+0^2}=2\\sqrt{2}$ ; $BD=\\sqrt{(-2)^2+0^2+2^2}=2\\sqrt{2}$ ; $CD=\\sqrt{0^2+(-2)^2+2^2}=2\\sqrt{2}$. Triangle **équilatéral** de côté $2\\sqrt{2}$.' },
      { n: 'c', text: 'Par symétrie, $\\vec{n}(1,1,1)$ est normal à $(BCD)$ (on vérifie $\\vec{n}\\cdot\\vec{BC}=0$ et $\\vec{n}\\cdot\\vec{BD}=0$). $x+y+z+d=0$ avec $B(2,0,0)$ : $2+d=0$, donc $(BCD) : x+y+z-2=0$.' },
      { n: 'd', text: '$d(A,BCD)=\\dfrac{|0+0+0-2|}{\\sqrt{3}}=\\dfrac{2}{\\sqrt{3}}=\\dfrac{2\\sqrt{3}}{3}\\approx 1{,}15$.' },
    ],
    result: '$(BCD) : x+y+z-2=0$ ; $d(A,BCD)=\\dfrac{2\\sqrt{3}}{3}$.',
  },
};
