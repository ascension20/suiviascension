import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const PROBABILITES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: '$\\mathbb{P}(B)=0{,}5$ et $\\mathbb{P}(A\\cap B)=0{,}2$. Alors $\\mathbb{P}_B(A)$ vaut…',
    options: [
      { label: 'a', text: '$0{,}1$' },
      { label: 'b', text: '$0{,}4$ (car $0{,}2/0{,}5$)' },
      { label: 'c', text: '$0{,}25$' },
      { label: 'd', text: '$0{,}7$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: '$A$ et $B$ sont indépendants, $\\mathbb{P}(A)=0{,}3$, $\\mathbb{P}(B)=0{,}6$. Alors $\\mathbb{P}(A\\cap B)$ vaut…',
    options: [
      { label: 'a', text: '$0{,}9$' },
      { label: 'b', text: '$0{,}18$ (produit $0{,}3\\times 0{,}6$)' },
      { label: 'c', text: '$0{,}3$' },
      { label: 'd', text: '$0{,}5$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Pour $X\\sim\\mathcal{B}(10\\,;0{,}5)$, $\\mathbb{E}(X)$ vaut…',
    options: [
      { label: 'a', text: '$5$ (car $np=10\\times 0{,}5$)' },
      { label: 'b', text: '$2{,}5$' },
      { label: 'c', text: '$10$' },
      { label: 'd', text: '$0{,}5$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Pour $X\\sim\\mathcal{B}(10\\,;0{,}5)$, $\\mathrm{V}(X)$ vaut…',
    options: [
      { label: 'a', text: '$5$' },
      { label: 'b', text: '$2{,}5$ (car $np(1-p)$)' },
      { label: 'c', text: '$1{,}58$' },
      { label: 'd', text: '$10$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: '$\\mathrm{V}(X)=5$ et $Y=-2X+3$. Alors $\\mathrm{V}(Y)$ vaut…',
    options: [
      { label: 'a', text: '$-10$' },
      { label: 'b', text: '$10$' },
      { label: 'c', text: '$20$ (car $(-2)^2\\times 5$)' },
      { label: 'd', text: '$23$' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: 'Le tirage successif **sans remise** de boules dans une urne, pour le nombre de boules rouges obtenues…',
    options: [
      { label: 'a', text: 'suit une loi binomiale' },
      { label: 'b', text: 'suit une loi de Bernoulli' },
      { label: 'c', text: 'ne suit pas une loi binomiale (épreuves non indépendantes)' },
      { label: 'd', text: 'suit une loi uniforme' },
    ],
    answer: 'c',
  },
  {
    n: 7,
    text: 'L\'égalité $\\mathbb{E}(X+Y)=\\mathbb{E}(X)+\\mathbb{E}(Y)$ est vraie…',
    options: [
      { label: 'a', text: 'seulement si $X,Y$ indépendantes' },
      { label: 'b', text: 'toujours (linéarité de l\'espérance)' },
      { label: 'c', text: 'jamais' },
      { label: 'd', text: 'seulement si même loi' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: '$A$ et $B$ sont incompatibles, $\\mathbb{P}(A)=0{,}4$, $\\mathbb{P}(B)=0{,}5$. Alors $\\mathbb{P}(A\\cup B)$ vaut…',
    options: [
      { label: 'a', text: '$0{,}9$ (car $\\mathbb{P}(A\\cap B)=0$)' },
      { label: 'b', text: '$0{,}2$' },
      { label: 'c', text: '$0{,}7$' },
      { label: 'd', text: '$0{,}65$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: '$X$ a pour espérance $0$ et variance $4$. Bienaymé-Tchebychev majore $\\mathbb{P}(|X|\\geq 4)$ par…',
    options: [
      { label: 'a', text: '$1$' },
      { label: 'b', text: '$0{,}25$ (car $v/\\delta^2=4/16$)' },
      { label: 'c', text: '$0{,}5$' },
      { label: 'd', text: '$4$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Quand la taille $n$ d\'un échantillon augmente, la variance de la moyenne empirique $M_n$…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'reste constante' },
      { label: 'c', text: 'tend vers $0$ (car $\\mathrm{V}(M_n)=v/n$)' },
      { label: 'd', text: 'tend vers $+\\infty$' },
    ],
    answer: 'c',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const PROBABILITES_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'probabilites-1',
    context: 'Un sac contient 10 jetons : 6 rouges dont 2 gagnants, et 4 verts dont 3 gagnants. On tire un jeton au hasard. On note $R$ « rouge » et $G$ « gagnant ».',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{P}(R)$ et $\\mathbb{P}(R\\cap G)$.' },
        { n: 'b', text: 'En déduire $\\mathbb{P}_R(G)$.' },
        { n: 'c', text: 'Calculer $\\mathbb{P}(G)$, puis $\\mathbb{P}_G(R)$.' },
      ],
    }],
  },
  {
    id: 'probabilites-2',
    context: 'On donne $\\mathbb{P}(A)=0{,}3$, $\\mathbb{P}_A(B)=0{,}8$ et $\\mathbb{P}_{\\bar{A}}(B)=0{,}5$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Construire l\'arbre pondéré.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(A\\cap B)$.' },
        { n: 'c', text: 'Calculer $\\mathbb{P}(B)$.' },
        { n: 'd', text: 'En déduire $\\mathbb{P}_B(A)$.' },
      ],
    }],
  },
  {
    id: 'probabilites-3',
    context: 'On lance deux dés équilibrés. On note $A$ « le premier dé donne 6 » et $B$ « la somme des deux dés vaut 7 ».',
    parts: [{
      questions: [
        { n: 'a', text: 'Les événements $A$ et $B$ sont-ils indépendants ? Justifier par le calcul.' },
      ],
    }],
  },
  {
    id: 'probabilites-4',
    context: 'La variable $X$ prend les valeurs $-2$, $1$ et $3$ avec $\\mathbb{P}(X=-2)=0{,}3$, $\\mathbb{P}(X=1)=0{,}5$ et $\\mathbb{P}(X=3)=0{,}2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Vérifier qu\'il s\'agit bien d\'une loi de probabilité.' },
        { n: 'b', text: 'Calculer $\\mathbb{E}(X)$.' },
        { n: 'c', text: 'Calculer $\\mathrm{V}(X)$ et $\\sigma(X)$.' },
      ],
    }],
  },
  {
    id: 'probabilites-5',
    context: 'Soit $X\\sim\\mathcal{B}(20\\,;0{,}3)$. Une calculatrice est autorisée.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{P}(X=6)$.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(X\\leq 6)$.' },
        { n: 'c', text: 'Calculer $\\mathbb{P}(X\\geq 8)$.' },
        { n: 'd', text: 'Calculer $\\mathbb{P}(4\\leq X\\leq 8)$.' },
        { n: 'e', text: 'Calculer $\\mathbb{E}(X)$, $\\mathrm{V}(X)$ et $\\sigma(X)$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'probabilites-6',
    context: 'Une usine possède deux machines. La machine M1 fabrique $60\\%$ des pièces, M2 les $40\\%$ restants. $2\\%$ des pièces de M1 sont défectueuses, contre $5\\%$ de celles de M2. On prélève une pièce au hasard ; on note $D$ « défectueuse ».',
    parts: [{
      questions: [
        { n: 'a', text: 'Représenter la situation par un arbre.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(D)$.' },
        { n: 'c', text: 'Une pièce prélevée est défectueuse. Quelle est la probabilité qu\'elle provienne de M1 ?' },
      ],
    }],
  },
  {
    id: 'probabilites-7',
    context: '$A$ et $B$ sont indépendants, avec $\\mathbb{P}(A)=0{,}4$ et $\\mathbb{P}(B)=0{,}25$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{P}(A\\cap B)$.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(A\\cup B)$.' },
        { n: 'c', text: 'Montrer que $A$ et $\\bar{B}$ sont indépendants, et calculer $\\mathbb{P}(A\\cap\\bar{B})$.' },
      ],
    }],
  },
  {
    id: 'probabilites-8',
    context: 'Une roue équilibrée à 8 secteurs identiques : 1 secteur fait gagner $10\\,€$, 3 secteurs font gagner $2\\,€$, 4 secteurs font perdre $3\\,€$. On note $G$ le gain algébrique d\'une partie.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner la loi de $G$.' },
        { n: 'b', text: 'Calculer $\\mathbb{E}(G)$.' },
        { n: 'c', text: 'Le jeu est-il favorable au joueur ?' },
      ],
    }],
  },
  {
    id: 'probabilites-9',
    context: 'Une variable $X$ vérifie $\\mathbb{E}(X)=4$ et $\\mathrm{V}(X)=2$. On pose $Y=3X-5$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{E}(Y)$.' },
        { n: 'b', text: 'Calculer $\\mathrm{V}(Y)$ et $\\sigma(Y)$.' },
      ],
    }],
  },
  {
    id: 'probabilites-10',
    context: 'Un composant est défectueux avec probabilité $0{,}05$, indépendamment des autres. On teste un lot de 12 composants. On note $X$ le nombre de défectueux.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que $X\\sim\\mathcal{B}(12\\,;0{,}05)$.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(X=0)$.' },
        { n: 'c', text: 'Calculer $\\mathbb{P}(X\\geq 1)$ (« au moins un défectueux »).' },
      ],
    }],
  },
  {
    id: 'probabilites-11',
    context: 'Une variable $X$ vérifie $\\mathbb{E}(X)=3$ et $\\mathrm{V}(X)=4$. On considère un échantillon $(X_1,\\dots,X_{100})$ de variables indépendantes de même loi que $X$, et la moyenne empirique :',
    data: 'M_{100}=\\dfrac{1}{100}\\sum_{i=1}^{100}X_i',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{E}(M_{100})$.' },
        { n: 'b', text: 'Calculer $\\mathrm{V}(M_{100})$ et $\\sigma(M_{100})$.' },
      ],
    }],
  },
  {
    id: 'probabilites-12',
    context: 'Une variable $X$ a pour espérance $50$ et variance $25$.',
    parts: [{
      questions: [
        { n: 'a', text: 'À l\'aide de l\'inégalité de Bienaymé-Tchebychev, majorer $\\mathbb{P}\\bigl(|X-50|\\geq 10\\bigr)$.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'probabilites-13',
    context: 'Une maladie touche $1\\%$ d\'une population. Un test est positif chez $98\\%$ des malades et chez $3\\%$ des non-malades. On note $M$ « malade » et $T$ « test positif ».',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{P}(T)$.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}_T(M)$ : la probabilité d\'être malade sachant que le test est positif.' },
        { n: 'c', text: 'Commenter ce résultat.' },
      ],
    }],
  },
  {
    id: 'probabilites-14',
    context: '$X$ et $Y$ sont **indépendantes** avec $\\mathbb{E}(X)=2$, $\\mathrm{V}(X)=1$, $\\mathbb{E}(Y)=5$, $\\mathrm{V}(Y)=3$. On pose $S=X+Y$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\mathbb{E}(S)$.' },
        { n: 'b', text: 'Calculer $\\mathrm{V}(S)$ et $\\sigma(S)$.' },
        { n: 'c', text: 'Pourrait-on calculer $\\mathrm{V}(S)$ si $X$ et $Y$ n\'étaient pas indépendantes ? Expliquer.' },
      ],
    }],
  },
  {
    id: 'probabilites-15',
    context: 'Un joueur réussit chaque lancer franc avec probabilité $0{,}2$, les lancers étant indépendants.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de lancers doit-il tenter **au minimum** pour que la probabilité de réussir **au moins un** lancer dépasse $0{,}99$ ?' },
      ],
    }],
  },
  {
    id: 'probabilites-16',
    context: 'On estime la proportion $p$ de « pile » d\'une pièce truquée par la moyenne empirique $M_n$ sur $n$ lancers. Chaque lancer suit une loi de Bernoulli, donc $v=p(1-p)\\leq\\dfrac{1}{4}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer un nombre de lancers $n$ suffisant pour garantir $\\mathbb{P}\\bigl(|M_n-p|\\geq 0{,}05\\bigr)\\leq 0{,}05$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'probabilites-17',
    context: 'Une entreprise fabrique des composants sur deux chaînes. La chaîne 1 produit $70\\%$ des composants, la chaîne 2 les $30\\%$ restants. Un composant de la chaîne 1 est défectueux avec probabilité $0{,}04$, un composant de la chaîne 2 avec probabilité $0{,}08$. On note $C_1$, $C_2$ et $D$ « défectueux ».',
    parts: [{
      questions: [
        { n: 'a', text: 'Traduire l\'énoncé par un arbre pondéré.' },
        { n: 'b', text: 'Calculer $\\mathbb{P}(D)$.' },
        { n: 'c', text: 'Un composant est défectueux ; calculer la probabilité qu\'il provienne de la chaîne 2.' },
        { n: 'd', text: 'On prélève au hasard 15 composants (production assez grande pour supposer l\'indépendance). On note $X$ le nombre de composants défectueux. Préciser la loi de $X$, puis calculer $\\mathbb{E}(X)$ et $\\mathbb{P}(X\\geq 1)$.' },
      ],
    }],
  },
  {
    id: 'probabilites-18',
    context: 'Un QCM comporte 30 questions indépendantes, chacune à 4 réponses dont une seule correcte. Un candidat répond entièrement au hasard. On note $X$ le nombre de bonnes réponses.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que $X\\sim\\mathcal{B}(30\\,;0{,}25)$.' },
        { n: 'b', text: 'Calculer $\\mathbb{E}(X)$, $\\mathrm{V}(X)$ et $\\sigma(X)$.' },
        { n: 'c', text: 'Calculer $\\mathbb{P}(X=10)$, $\\mathbb{P}(X\\leq 5)$ et $\\mathbb{P}(X\\geq 15)$.' },
        { n: 'd', text: 'La moyenne est obtenue à partir de 10 bonnes réponses. Le hasard permet-il raisonnablement de l\'atteindre ? (calculer $\\mathbb{P}(X\\geq 10)$).' },
      ],
    }],
  },
  {
    id: 'probabilites-19',
    context: 'Une pièce truquée tombe sur « pile » avec une probabilité $p$ inconnue. On la lance $n$ fois de manière indépendante et on note $M_n$ la fréquence de « pile » observée. Chaque lancer suit une loi de Bernoulli de paramètre $p$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner $\\mathbb{E}(M_n)$ et montrer que $\\mathrm{V}(M_n)\\leq\\dfrac{1}{4n}$.' },
        { n: 'b', text: 'À l\'aide de l\'inégalité de concentration, majorer $\\mathbb{P}\\bigl(|M_n-p|\\geq 0{,}05\\bigr)$ en fonction de $n$.' },
        { n: 'c', text: 'Déterminer un nombre de lancers $n$ garantissant que cette probabilité est inférieure à $0{,}05$.' },
        { n: 'd', text: 'Interpréter le résultat en lien avec la loi des grands nombres.' },
      ],
    }],
  },
  {
    id: 'probabilites-20',
    context: 'Une roue équilibrée comporte 12 secteurs identiques : 2 font gagner $8\\,€$, 4 font gagner $3\\,€$, 6 font perdre $2\\,€$. On note $G$ le gain algébrique d\'une partie.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner la loi de $G$, puis calculer $\\mathbb{E}(G)$ et $\\sigma(G)$.' },
        { n: 'b', text: 'Le jeu est-il favorable au joueur ?' },
        { n: 'c', text: 'Un joueur enchaîne 20 parties indépendantes. On note $Y$ le nombre de parties où il gagne $8\\,€$. Préciser la loi de $Y$, puis calculer $\\mathbb{E}(Y)$ et $\\mathbb{P}(Y\\geq 1)$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const PROBABILITES_CORRECTIONS: Record<string, Correction> = {
  'probabilites-1': {
    steps: [
      { n: 'a', text: '$\\mathbb{P}(R)=\\dfrac{6}{10}=0{,}6$. Il y a 2 jetons rouges gagnants, donc $\\mathbb{P}(R\\cap G)=\\dfrac{2}{10}=0{,}2$.' },
      { n: 'b', text: '$\\mathbb{P}_R(G)=\\dfrac{\\mathbb{P}(R\\cap G)}{\\mathbb{P}(R)}=\\dfrac{0{,}2}{0{,}6}=\\dfrac{1}{3}\\approx 0{,}333$.' },
      { n: 'c', text: 'Jetons gagnants : $2+3=5$, d\'où $\\mathbb{P}(G)=\\dfrac{5}{10}=0{,}5$. Puis $\\mathbb{P}_G(R)=\\dfrac{\\mathbb{P}(R\\cap G)}{\\mathbb{P}(G)}=\\dfrac{0{,}2}{0{,}5}=0{,}4$.' },
    ],
    result: '$\\mathbb{P}_R(G)=\\dfrac{1}{3}$ ; $\\mathbb{P}_G(R)=0{,}4$ — attention, ce ne sont **pas** les mêmes !',
  },
  'probabilites-2': {
    steps: [
      { n: 'a', text: 'L\'arbre part de $\\Omega$ avec deux branches $A$ ($0{,}3$) et $\\bar{A}$ ($0{,}7$) ; chacune se sépare en $B$ / $\\bar{B}$ avec $\\mathbb{P}_A(B)=0{,}8$, $\\mathbb{P}_A(\\bar{B})=0{,}2$, $\\mathbb{P}_{\\bar{A}}(B)=0{,}5$, $\\mathbb{P}_{\\bar{A}}(\\bar{B})=0{,}5$.' },
      { n: 'b', text: '$\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\,\\mathbb{P}_A(B)=0{,}3\\times 0{,}8=0{,}24$.' },
      { n: 'c', text: 'Probabilités totales : $\\mathbb{P}(B)=\\mathbb{P}(A)\\mathbb{P}_A(B)+\\mathbb{P}(\\bar{A})\\mathbb{P}_{\\bar{A}}(B)=0{,}3\\times 0{,}8+0{,}7\\times 0{,}5=0{,}24+0{,}35=0{,}59$.' },
      { n: 'd', text: '$\\mathbb{P}_B(A)=\\dfrac{\\mathbb{P}(A\\cap B)}{\\mathbb{P}(B)}=\\dfrac{0{,}24}{0{,}59}\\approx 0{,}407$.' },
    ],
    result: '$\\mathbb{P}(B)=0{,}59$ ; $\\mathbb{P}_B(A)\\approx 0{,}407$.',
  },
  'probabilites-3': {
    steps: [
      { n: '1', text: '$\\mathbb{P}(A)=\\dfrac{1}{6}$. L\'événement « somme $=7$ » compte 6 issues $\\{(1,6),\\dots,(6,1)\\}$ sur 36, donc $\\mathbb{P}(B)=\\dfrac{6}{36}=\\dfrac{1}{6}$.' },
      { n: '2', text: 'L\'événement $A\\cap B$ (« premier dé $=6$ et somme $=7$ ») ne correspond qu\'à l\'issue $(6,1)$, donc $\\mathbb{P}(A\\cap B)=\\dfrac{1}{36}$.' },
      { n: '3', text: 'Or $\\mathbb{P}(A)\\times\\mathbb{P}(B)=\\dfrac{1}{6}\\times\\dfrac{1}{6}=\\dfrac{1}{36}=\\mathbb{P}(A\\cap B)$. Les événements sont donc **indépendants**.' },
    ],
    result: '$A$ et $B$ sont **indépendants** : $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\mathbb{P}(B)=\\dfrac{1}{36}$.',
  },
  'probabilites-4': {
    steps: [
      { n: 'a', text: '$0{,}3+0{,}5+0{,}2=1$ : c\'est bien une loi de probabilité.' },
      { n: 'b', text: '$\\mathbb{E}(X)=(-2)(0{,}3)+(1)(0{,}5)+(3)(0{,}2)=-0{,}6+0{,}5+0{,}6=0{,}5$.' },
      { n: 'c', text: '$\\mathbb{E}(X^2)=4(0{,}3)+1(0{,}5)+9(0{,}2)=1{,}2+0{,}5+1{,}8=3{,}5$. Donc $\\mathrm{V}(X)=\\mathbb{E}(X^2)-\\mathbb{E}(X)^2=3{,}5-0{,}25=3{,}25$ et $\\sigma(X)=\\sqrt{3{,}25}\\approx 1{,}803$.' },
    ],
    result: '$\\mathbb{E}(X)=0{,}5$ ; $\\mathrm{V}(X)=3{,}25$ ; $\\sigma(X)\\approx 1{,}80$.',
  },
  'probabilites-5': {
    steps: [
      { n: 'a', text: '$\\mathbb{P}(X=6)=\\dbinom{20}{6}(0{,}3)^6(0{,}7)^{14}\\approx 0{,}192$.' },
      { n: 'b', text: '$\\mathbb{P}(X\\leq 6)\\approx 0{,}608$ (binomFRép$(20\\,;0{,}3\\,;6)$).' },
      { n: 'c', text: '$\\mathbb{P}(X\\geq 8)=1-\\mathbb{P}(X\\leq 7)\\approx 0{,}228$.' },
      { n: 'd', text: '$\\mathbb{P}(4\\leq X\\leq 8)=\\mathbb{P}(X\\leq 8)-\\mathbb{P}(X\\leq 3)\\approx 0{,}780$.' },
      { n: 'e', text: '$\\mathbb{E}(X)=np=6$ ; $\\mathrm{V}(X)=np(1-p)=20\\times 0{,}3\\times 0{,}7=4{,}2$ ; $\\sigma(X)=\\sqrt{4{,}2}\\approx 2{,}049$.' },
    ],
    result: '$\\mathbb{E}(X)=6$ ; $\\mathrm{V}(X)=4{,}2$ ; $\\sigma(X)\\approx 2{,}05$.',
  },
  'probabilites-6': {
    steps: [
      { n: 'a', text: 'Arbre : $M_1$ ($0{,}6$) puis $D$ ($0{,}02$) / $\\bar{D}$ ($0{,}98$) ; $M_2$ ($0{,}4$) puis $D$ ($0{,}05$) / $\\bar{D}$ ($0{,}95$).' },
      { n: 'b', text: '$\\mathbb{P}(D)=\\mathbb{P}(M_1)\\mathbb{P}_{M_1}(D)+\\mathbb{P}(M_2)\\mathbb{P}_{M_2}(D)=0{,}6\\times 0{,}02+0{,}4\\times 0{,}05=0{,}012+0{,}020=0{,}032$.' },
      { n: 'c', text: '$\\mathbb{P}_D(M_1)=\\dfrac{\\mathbb{P}(M_1\\cap D)}{\\mathbb{P}(D)}=\\dfrac{0{,}012}{0{,}032}=0{,}375$.' },
    ],
    result: '$\\mathbb{P}(D)=0{,}032$ ; $\\mathbb{P}_D(M_1)=0{,}375$.',
  },
  'probabilites-7': {
    steps: [
      { n: 'a', text: 'Par indépendance, $\\mathbb{P}(A\\cap B)=\\mathbb{P}(A)\\mathbb{P}(B)=0{,}4\\times 0{,}25=0{,}1$.' },
      { n: 'b', text: '$\\mathbb{P}(A\\cup B)=\\mathbb{P}(A)+\\mathbb{P}(B)-\\mathbb{P}(A\\cap B)=0{,}4+0{,}25-0{,}1=0{,}55$.' },
      { n: 'c', text: 'Si $A$ et $B$ sont indépendants, alors $A$ et $\\bar{B}$ le sont aussi (propriété du cours). Donc $\\mathbb{P}(A\\cap\\bar{B})=\\mathbb{P}(A)\\mathbb{P}(\\bar{B})=0{,}4\\times 0{,}75=0{,}3$. Vérification : $\\mathbb{P}(A)-\\mathbb{P}(A\\cap B)=0{,}4-0{,}1=0{,}3$. ✓' },
    ],
    result: '$\\mathbb{P}(A\\cap B)=0{,}1$ ; $\\mathbb{P}(A\\cup B)=0{,}55$ ; $\\mathbb{P}(A\\cap\\bar{B})=0{,}3$.',
  },
  'probabilites-8': {
    steps: [
      { n: 'a', text: 'Loi de $G$ : $\\mathbb{P}(G=10)=\\dfrac{1}{8}$, $\\mathbb{P}(G=2)=\\dfrac{3}{8}$, $\\mathbb{P}(G=-3)=\\dfrac{4}{8}$.' },
      { n: 'b', text: '$\\mathbb{E}(G)=10\\cdot\\dfrac{1}{8}+2\\cdot\\dfrac{3}{8}-3\\cdot\\dfrac{4}{8}=\\dfrac{10+6-12}{8}=\\dfrac{4}{8}=0{,}5$.' },
      { n: 'c', text: '$\\mathbb{E}(G)=0{,}5\\,€>0$ : en moyenne le joueur gagne $0{,}50\\,€$ par partie, le jeu est **favorable au joueur**.' },
    ],
    result: '$\\mathbb{E}(G)=0{,}5\\,€$ → jeu **favorable au joueur**.',
  },
  'probabilites-9': {
    steps: [
      { n: 'a', text: '$\\mathbb{E}(Y)=\\mathbb{E}(3X-5)=3\\,\\mathbb{E}(X)-5=3\\times 4-5=7$.' },
      { n: 'b', text: '$\\mathrm{V}(Y)=3^2\\,\\mathrm{V}(X)=9\\times 2=18$, donc $\\sigma(Y)=\\sqrt{18}=3\\sqrt{2}\\approx 4{,}243$.' },
    ],
    result: '$\\mathbb{E}(Y)=7$ ; $\\mathrm{V}(Y)=18$ ; $\\sigma(Y)=3\\sqrt{2}$.',
  },
  'probabilites-10': {
    steps: [
      { n: 'a', text: 'On répète $n=12$ épreuves identiques (chaque composant défectueux ou non), **indépendantes**, avec la même probabilité de succès $p=0{,}05$. Donc $X\\sim\\mathcal{B}(12\\,;0{,}05)$.' },
      { n: 'b', text: '$\\mathbb{P}(X=0)=(0{,}95)^{12}\\approx 0{,}540$.' },
      { n: 'c', text: '$\\mathbb{P}(X\\geq 1)=1-\\mathbb{P}(X=0)=1-(0{,}95)^{12}\\approx 0{,}460$.' },
    ],
    result: '$\\mathbb{P}(X=0)\\approx 0{,}540$ ; $\\mathbb{P}(X\\geq 1)\\approx 0{,}460$.',
  },
  'probabilites-11': {
    steps: [
      { n: 'a', text: '$\\mathbb{E}(M_{100})=\\mathbb{E}(X)=3$.' },
      { n: 'b', text: '$\\mathrm{V}(M_{100})=\\dfrac{\\mathrm{V}(X)}{100}=\\dfrac{4}{100}=0{,}04$, donc $\\sigma(M_{100})=\\sqrt{0{,}04}=0{,}2$.' },
    ],
    result: '$\\mathbb{E}(M_{100})=3$ ; $\\mathrm{V}(M_{100})=0{,}04$ ; $\\sigma(M_{100})=0{,}2$.',
  },
  'probabilites-12': {
    steps: [
      { n: '1', text: 'Avec $\\mu=50$, $v=25$ et $\\delta=10$ : $\\mathbb{P}\\bigl(|X-50|\\geq 10\\bigr)\\leq\\dfrac{v}{\\delta^2}=\\dfrac{25}{10^2}=\\dfrac{25}{100}=0{,}25$.' },
    ],
    result: '$\\mathbb{P}(|X-50|\\geq 10)\\leq 0{,}25$.',
  },
  'probabilites-13': {
    steps: [
      { n: 'a', text: '$\\mathbb{P}(T)=\\mathbb{P}(M)\\mathbb{P}_M(T)+\\mathbb{P}(\\bar{M})\\mathbb{P}_{\\bar{M}}(T)=0{,}01\\times 0{,}98+0{,}99\\times 0{,}03=0{,}0098+0{,}0297=0{,}0395$.' },
      { n: 'b', text: '$\\mathbb{P}_T(M)=\\dfrac{\\mathbb{P}(M\\cap T)}{\\mathbb{P}(T)}=\\dfrac{0{,}0098}{0{,}0395}\\approx 0{,}248$.' },
      { n: 'c', text: 'Bien que le test détecte $98\\%$ des malades, un test positif ne correspond à un vrai malade que dans environ $25\\%$ des cas. La maladie étant rare, les faux positifs (issus des $99\\%$ de bien-portants) sont nombreux et dominent : c\'est l\'effet de la **fréquence de base**.' },
    ],
    result: '$\\mathbb{P}(T)=0{,}0395$ ; $\\mathbb{P}_T(M)\\approx 0{,}248$.',
  },
  'probabilites-14': {
    steps: [
      { n: 'a', text: '$\\mathbb{E}(S)=\\mathbb{E}(X)+\\mathbb{E}(Y)=2+5=7$ (linéarité, **toujours** vraie).' },
      { n: 'b', text: '$X$ et $Y$ étant indépendantes, $\\mathrm{V}(S)=\\mathrm{V}(X)+\\mathrm{V}(Y)=1+3=4$, donc $\\sigma(S)=2$.' },
      { n: 'c', text: 'Sans l\'hypothèse d\'indépendance, on ne peut **pas** calculer $\\mathrm{V}(S)$ : la variance d\'une somme dépend alors du lien (la covariance) entre $X$ et $Y$, non fourni ici.' },
    ],
    result: '$\\mathbb{E}(S)=7$ ; $\\mathrm{V}(S)=4$ ; $\\sigma(S)=2$.',
  },
  'probabilites-15': {
    steps: [
      { n: '1', text: 'Soit $n$ le nombre de lancers ; le nombre de réussites suit $\\mathcal{B}(n\\,;0{,}2)$. La probabilité de **ne réussir aucun** lancer est $(0{,}8)^n$, donc $\\mathbb{P}(\\text{au moins un})=1-(0{,}8)^n$.' },
      { n: '2', text: 'On veut $1-(0{,}8)^n>0{,}99$, soit $(0{,}8)^n<0{,}01$. En passant au logarithme (le sens change car $\\ln 0{,}8<0$) : $n\\ln(0{,}8)<\\ln(0{,}01)\\iff n>\\dfrac{\\ln(0{,}01)}{\\ln(0{,}8)}\\approx 20{,}6$.' },
      { n: '3', text: 'Le plus petit entier convenable est $n=21$. Vérification : $1-0{,}8^{21}\\approx 0{,}991>0{,}99$ et $1-0{,}8^{20}\\approx 0{,}988<0{,}99$.' },
    ],
    result: 'Il faut au minimum **21 lancers**.',
  },
  'probabilites-16': {
    steps: [
      { n: '1', text: 'Chaque lancer suit une loi de Bernoulli de variance $v=p(1-p)\\leq\\dfrac{1}{4}$. Par l\'inégalité de concentration, avec $\\delta=0{,}05$ : $\\mathbb{P}\\bigl(|M_n-p|\\geq 0{,}05\\bigr)\\leq\\dfrac{v}{n\\,\\delta^2}\\leq\\dfrac{1/4}{n\\times 0{,}0025}=\\dfrac{100}{n}$.' },
      { n: '2', text: 'Il suffit que $\\dfrac{100}{n}\\leq 0{,}05$, c\'est-à-dire $n\\geq\\dfrac{100}{0{,}05}=2000$.' },
    ],
    result: '$n=2000$ lancers suffisent.',
  },
  'probabilites-17': {
    steps: [
      { n: 'a', text: 'Arbre : $C_1$ ($0{,}70$) puis $D$ ($0{,}04$) / $\\bar{D}$ ($0{,}96$) ; $C_2$ ($0{,}30$) puis $D$ ($0{,}08$) / $\\bar{D}$ ($0{,}92$).' },
      { n: 'b', text: '$\\mathbb{P}(D)=0{,}70\\times 0{,}04+0{,}30\\times 0{,}08=0{,}028+0{,}024=0{,}052$.' },
      { n: 'c', text: '$\\mathbb{P}_D(C_2)=\\dfrac{\\mathbb{P}(C_2\\cap D)}{\\mathbb{P}(D)}=\\dfrac{0{,}024}{0{,}052}\\approx 0{,}462$.' },
      { n: 'd', text: 'Les prélèvements étant indépendants avec la même probabilité de défaut $p=0{,}052$, $X\\sim\\mathcal{B}(15\\,;0{,}052)$. Donc $\\mathbb{E}(X)=15\\times 0{,}052=0{,}78$, et $\\mathbb{P}(X\\geq 1)=1-\\mathbb{P}(X=0)=1-(0{,}948)^{15}\\approx 1-0{,}449=0{,}551$.' },
    ],
    result: '$\\mathbb{P}(D)=0{,}052$ ; $\\mathbb{P}_D(C_2)\\approx 0{,}46$ ; $\\mathbb{E}(X)=0{,}78$ ; $\\mathbb{P}(X\\geq 1)\\approx 0{,}55$.',
  },
  'probabilites-18': {
    steps: [
      { n: 'a', text: '30 questions indépendantes, deux issues (bonne / mauvaise), même probabilité de succès $p=\\dfrac{1}{4}$, nombre fixé $n=30$ : donc $X\\sim\\mathcal{B}(30\\,;0{,}25)$.' },
      { n: 'b', text: '$\\mathbb{E}(X)=30\\times 0{,}25=7{,}5$ ; $\\mathrm{V}(X)=30\\times 0{,}25\\times 0{,}75=5{,}625$ ; $\\sigma(X)=\\sqrt{5{,}625}\\approx 2{,}372$.' },
      { n: 'c', text: '$\\mathbb{P}(X=10)\\approx 0{,}091$ ; $\\mathbb{P}(X\\leq 5)\\approx 0{,}203$ ; $\\mathbb{P}(X\\geq 15)=1-\\mathbb{P}(X\\leq 14)\\approx 0{,}003$.' },
      { n: 'd', text: '$\\mathbb{P}(X\\geq 10)=1-\\mathbb{P}(X\\leq 9)\\approx 0{,}197$ : environ une chance sur cinq d\'obtenir au moins 10 bonnes réponses au hasard. C\'est possible mais peu probable pour la majorité des candidats.' },
    ],
    result: '$\\mathbb{E}=7{,}5$ ; $\\sigma\\approx 2{,}37$ ; $\\mathbb{P}(X\\geq 15)\\approx 0{,}003$ ; $\\mathbb{P}(X\\geq 10)\\approx 0{,}20$.',
  },
  'probabilites-19': {
    steps: [
      { n: 'a', text: '$\\mathbb{E}(M_n)=p$ (moyenne d\'une loi de Bernoulli). $\\mathrm{V}(M_n)=\\dfrac{p(1-p)}{n}$, et comme $p(1-p)\\leq\\dfrac{1}{4}$ (maximum en $p=\\tfrac{1}{2}$), on a $\\mathrm{V}(M_n)\\leq\\dfrac{1}{4n}$.' },
      { n: 'b', text: 'Inégalité de concentration avec $\\delta=0{,}05$ : $\\mathbb{P}\\bigl(|M_n-p|\\geq 0{,}05\\bigr)\\leq\\dfrac{\\mathrm{V}(M_n)}{0{,}05^2}\\leq\\dfrac{1/(4n)}{0{,}0025}=\\dfrac{100}{n}$.' },
      { n: 'c', text: '$\\dfrac{100}{n}\\leq 0{,}05\\iff n\\geq 2000$.' },
      { n: 'd', text: 'Quand $n\\to+\\infty$, la borne $\\dfrac{100}{n}\\to 0$, donc $\\mathbb{P}(|M_n-p|\\geq 0{,}05)\\to 0$ : la fréquence observée se rapproche de $p$. C\'est la **loi des grands nombres**.' },
    ],
    result: '$\\mathrm{V}(M_n)\\leq\\dfrac{1}{4n}$ ; borne $=\\dfrac{100}{n}$ ; $n\\geq 2000$.',
  },
  'probabilites-20': {
    steps: [
      { n: 'a', text: 'Loi de $G$ : $\\mathbb{P}(G=8)=\\dfrac{2}{12}=\\dfrac{1}{6}$, $\\mathbb{P}(G=3)=\\dfrac{4}{12}=\\dfrac{1}{3}$, $\\mathbb{P}(G=-2)=\\dfrac{6}{12}=\\dfrac{1}{2}$. $\\mathbb{E}(G)=8\\cdot\\dfrac{1}{6}+3\\cdot\\dfrac{1}{3}-2\\cdot\\dfrac{1}{2}=\\dfrac{8}{6}+1-1=\\dfrac{4}{3}\\approx 1{,}33\\,€$. $\\mathbb{E}(G^2)=64\\cdot\\dfrac{1}{6}+9\\cdot\\dfrac{1}{3}+4\\cdot\\dfrac{1}{2}\\approx 15{,}67$, donc $\\mathrm{V}(G)\\approx 15{,}67-1{,}78=13{,}89$ et $\\sigma(G)\\approx 3{,}73$.' },
      { n: 'b', text: '$\\mathbb{E}(G)=\\dfrac{4}{3}\\,€>0$ : le jeu est **favorable au joueur**.' },
      { n: 'c', text: 'Les 20 parties sont indépendantes et « gagner $8\\,€$ » a la probabilité $\\dfrac{1}{6}$ : $Y\\sim\\mathcal{B}\\bigl(20\\,;\\tfrac{1}{6}\\bigr)$. Alors $\\mathbb{E}(Y)=\\dfrac{20}{6}\\approx 3{,}33$ et $\\mathbb{P}(Y\\geq 1)=1-\\bigl(\\tfrac{5}{6}\\bigr)^{20}\\approx 1-0{,}026=0{,}974$.' },
    ],
    result: '$\\mathbb{E}(G)=\\dfrac{4}{3}\\,€$ ; $\\sigma(G)\\approx 3{,}73$ ; $\\mathbb{E}(Y)\\approx 3{,}33$ ; $\\mathbb{P}(Y\\geq 1)\\approx 0{,}97$.',
  },
};
