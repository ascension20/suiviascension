import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const LUNETTE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La vergence d\'une lentille vaut…',
    options: [
      { label: 'a', text: '$V=f\'$' },
      { label: 'b', text: '$V=\\dfrac{1}{f\'}$' },
      { label: 'c', text: '$V=2f\'$' },
      { label: 'd', text: '$V=f\'^2$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'La vergence s\'exprime en…',
    options: [
      { label: 'a', text: 'mètres' },
      { label: 'b', text: 'dioptries' },
      { label: 'c', text: 'radians' },
      { label: 'd', text: 'sans unité' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Un rayon passant par le centre optique…',
    options: [
      { label: 'a', text: 'est dévié vers $F\'$' },
      { label: 'b', text: 'n\'est pas dévié' },
      { label: 'c', text: 'est réfléchi' },
      { label: 'd', text: 'est absorbé' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'L\'image d\'un objet à l\'infini se forme…',
    options: [
      { label: 'a', text: 'au centre optique' },
      { label: 'b', text: 'dans le plan focal image' },
      { label: 'c', text: 'à l\'infini' },
      { label: 'd', text: 'dans le plan focal objet' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La condition afocale s\'écrit…',
    options: [
      { label: 'a', text: '$F_1\'=F_2$' },
      { label: 'b', text: '$F_1=F_2\'$' },
      { label: 'c', text: '$O_1=O_2$' },
      { label: 'd', text: '$f_1\'=f_2\'$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'La distance entre objectif et oculaire vaut…',
    options: [
      { label: 'a', text: '$f_1\'-f_2\'$' },
      { label: 'b', text: '$f_1\'+f_2\'$' },
      { label: 'c', text: '$f_1\'\\times f_2\'$' },
      { label: 'd', text: '$\\dfrac{f_1\'}{f_2\'}$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Le grossissement vaut…',
    options: [
      { label: 'a', text: '$G=\\dfrac{f_2\'}{f_1\'}$' },
      { label: 'b', text: '$G=\\dfrac{f_1\'}{f_2\'}$' },
      { label: 'c', text: '$G=f_1\'f_2\'$' },
      { label: 'd', text: '$G=f_1\'+f_2\'$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Le grossissement s\'exprime en…',
    options: [
      { label: 'a', text: 'dioptries' },
      { label: 'b', text: 'sans unité' },
      { label: 'c', text: 'radians' },
      { label: 'd', text: 'mètres' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Pour un fort grossissement, il faut…',
    options: [
      { label: 'a', text: '$f_1\'$ grande et $f_2\'$ courte' },
      { label: 'b', text: '$f_1\'$ courte et $f_2\'$ grande' },
      { label: 'c', text: '$f_1\'=f_2\'$' },
      { label: 'd', text: '$f_2\'$ nulle' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'L\'image finale d\'une lunette afocale est…',
    options: [
      { label: 'a', text: 'réelle, sur un écran' },
      { label: 'b', text: 'à l\'infini' },
      { label: 'c', text: 'au foyer $F_2\'$' },
      { label: 'd', text: 'au centre $O_2$' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const LUNETTE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'lunette-1',
    context: 'Vergence : $V=\\dfrac{1}{f\'}$ (en dioptries, $\\delta=\\text{m}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lentille convergente a une distance focale $f\'=25\\,\\text{cm}$. Calculer sa vergence.' },
      ],
    }],
  },
  {
    id: 'lunette-2',
    context: 'De $V=\\dfrac{1}{f\'}$ on tire $f\'=\\dfrac{1}{V}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lentille a une vergence $V=8{,}0\\,\\delta$. Calculer sa distance focale, en mètres puis en centimètres.' },
      ],
    }],
  },
  {
    id: 'lunette-3',
    context: 'Diamètre apparent : $\\theta\\approx\\dfrac{D}{d}$ (en rad). Soleil : $D=1{,}39\\times 10^{6}\\,\\text{km}$, $d=1{,}50\\times 10^{8}\\,\\text{km}$. Rappel : $1\\,\\text{rad}=57{,}3°$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le diamètre apparent du Soleil, en radians puis en degrés.' },
      ],
    }],
  },
  {
    id: 'lunette-4',
    context: 'Grossissement d\'une lunette afocale : $G=\\dfrac{f_1\'}{f_2\'}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lunette a pour objectif $f_1\'=800\\,\\text{mm}$ et pour oculaire $f_2\'=16\\,\\text{mm}$. Calculer son grossissement.' },
      ],
    }],
  },
  {
    id: 'lunette-5',
    context: '$G=\\dfrac{f_1\'}{f_2\'}$ (convertir les focales dans la même unité).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le grossissement d\'une lunette dont l\'objectif a une focale de $1{,}0\\,\\text{m}$ et l\'oculaire de $25\\,\\text{mm}$.' },
      ],
    }],
  },
  {
    id: 'lunette-6',
    context: 'Condition afocale : $O_1O_2=f_1\'+f_2\'$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lunette afocale a $f_1\'=900\\,\\text{mm}$ et $f_2\'=20\\,\\text{mm}$. Calculer la distance entre l\'objectif et l\'oculaire.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'lunette-7',
    context: 'Vergence : $V=\\dfrac{1}{f\'}$. Une lentille très convergente a une courte focale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un oculaire a une distance focale $f\'=50\\,\\text{mm}$. Calculer sa vergence. Est-elle plus grande ou plus petite que celle d\'un objectif de $f\'=1{,}0\\,\\text{m}$ ? Commenter.' },
      ],
    }],
  },
  {
    id: 'lunette-8',
    context: 'Construction d\'image par une lentille convergente.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer les trois rayons particuliers utilisés pour construire l\'image donnée par une lentille convergente.' },
      ],
    }],
  },
  {
    id: 'lunette-9',
    context: '$\\theta\\approx\\dfrac{D}{d}$ (en rad), puis conversion en degrés ($1\\,\\text{rad}=57{,}3°$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un clocher de $30\\,\\text{m}$ de haut est situé à $2{,}0\\,\\text{km}$. Calculer son diamètre apparent, en radians puis en degrés.' },
      ],
    }],
  },
  {
    id: 'lunette-10',
    context: 'Taille de l\'image intermédiaire : $A_1B_1\\approx f_1\'\\theta$ ($\\theta$ en rad).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un objectif de distance focale $f_1\'=0{,}60\\,\\text{m}$ vise un astre de diamètre apparent $\\theta=9{,}0\\times 10^{-3}\\,\\text{rad}$. Calculer la taille de l\'image intermédiaire.' },
      ],
    }],
  },
  {
    id: 'lunette-11',
    context: 'L\'image d\'un objet à l\'infini se forme dans le plan focal image.',
    parts: [{
      questions: [
        { n: 'a', text: 'Où se forme l\'image d\'un objet situé à l\'infini donnée par une lentille convergente ? Justifier en utilisant le rayon passant par le centre optique.' },
      ],
    }],
  },
  {
    id: 'lunette-12',
    context: 'De $G=\\dfrac{f_1\'}{f_2\'}$ on tire $f_2\'=\\dfrac{f_1\'}{G}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On dispose d\'un objectif de focale $f_1\'=1{,}2\\,\\text{m}$ et l\'on souhaite obtenir un grossissement $G=100$. Quelle distance focale d\'oculaire faut-il choisir ?' },
      ],
    }],
  },
  {
    id: 'lunette-13',
    context: 'De $G=\\dfrac{f_1\'}{f_2\'}$ on tire $f_1\'=G\\times f_2\'$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec un oculaire de $15\\,\\text{mm}$, quelle distance focale d\'objectif permet d\'obtenir $G=60$ ?' },
      ],
    }],
  },
  {
    id: 'lunette-14',
    context: 'Condition afocale et confort d\'observation.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'appelle-t-on une lunette « afocale » ? Quel est l\'intérêt de cette configuration pour l\'observateur ?' },
      ],
    }],
  },
  {
    id: 'lunette-15',
    context: 'Angle image : $\\theta\'=G\\,\\theta$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lunette de grossissement $G=45$ vise un astre de diamètre apparent $\\theta=9{,}0\\times 10^{-3}\\,\\text{rad}$. Calculer l\'angle $\\theta\'$ sous lequel on observe l\'image, en radians puis en degrés.' },
      ],
    }],
  },
  {
    id: 'lunette-16',
    context: 'L\'image finale d\'une lunette afocale est à l\'infini.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'image finale donnée par une lunette afocale est-elle réelle ou virtuelle ? Peut-on la recueillir sur un écran ? Est-elle droite ou renversée ?' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'lunette-17',
    context: 'De $O_1O_2=f_1\'+f_2\'$ on tire $f_1\'=O_1O_2-f_2\'$, puis $G=\\dfrac{f_1\'}{f_2\'}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lunette afocale mesure $O_1O_2=1{,}05\\,\\text{m}$ et son oculaire a une focale de $50\\,\\text{mm}$. Déterminer la focale de l\'objectif, puis le grossissement.' },
      ],
    }],
  },
  {
    id: 'lunette-18',
    context: 'Lune : $D=3474\\,\\text{km}$, $d=3{,}844\\times 10^{5}\\,\\text{km}$. Lunette afocale $f_1\'=0{,}90\\,\\text{m}$, $f_2\'=20\\,\\text{mm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\theta$, puis la taille de l\'image intermédiaire $A_1B_1$.' },
        { n: 'b', text: 'En déduire $\\theta\'=\\dfrac{A_1B_1}{f_2\'}$, puis $G=\\dfrac{\\theta\'}{\\theta}$.' },
        { n: 'c', text: 'Vérifier que l\'on retrouve bien $G=\\dfrac{f_1\'}{f_2\'}$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'lunette-19',
    context: 'Une lunette afocale est constituée d\'un objectif de focale $f_1\'=900\\,\\text{mm}$ et d\'un oculaire de focale $f_2\'=20\\,\\text{mm}$. On observe la Lune ($D=3474\\,\\text{km}$, $d=3{,}844\\times 10^{5}\\,\\text{km}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le diamètre apparent $\\theta$ de la Lune, en radians puis en degrés.' },
        { n: 'b', text: 'Calculer la distance $O_1O_2$ entre l\'objectif et l\'oculaire. Justifier la relation utilisée.' },
        { n: 'c', text: 'Calculer la taille de l\'image intermédiaire $A_1B_1$ et préciser où elle se forme.' },
        { n: 'd', text: 'Calculer le grossissement $G$, puis l\'angle $\\theta\'$ sous lequel on voit la Lune dans la lunette. Conclure.' },
      ],
    }],
  },
  {
    id: 'lunette-20',
    context: 'Un astronome dispose d\'un objectif de focale $f_1\'=1{,}20\\,\\text{m}$ et de deux oculaires, de focales $30\\,\\text{mm}$ et $10\\,\\text{mm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le grossissement obtenu avec chaque oculaire.' },
        { n: 'b', text: 'Calculer, pour chaque cas, la longueur $O_1O_2$ de la lunette afocale.' },
        { n: 'c', text: 'Quel oculaire choisir pour observer un détail très fin ? Quel est l\'inconvénient d\'un très fort grossissement ?' },
        { n: 'd', text: 'Quelle focale d\'oculaire faudrait-il pour obtenir exactement $G=80$ ?' },
      ],
    }],
  },
  {
    id: 'lunette-21',
    context: 'Jupiter a un diamètre $D=1{,}43\\times 10^{5}\\,\\text{km}$ et se trouve à $d=6{,}3\\times 10^{8}\\,\\text{km}$ de la Terre. L\'œil ne distingue deux points que si leur écart angulaire dépasse environ $3\\times 10^{-4}\\,\\text{rad}$. Lunette afocale : $f_1\'=1{,}00\\,\\text{m}$, $f_2\'=20\\,\\text{mm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le diamètre apparent $\\theta$ de Jupiter.' },
        { n: 'b', text: 'À l\'œil nu, Jupiter apparaît-elle comme un disque ou comme un point ? Justifier.' },
        { n: 'c', text: 'Calculer le grossissement $G$ de la lunette, puis l\'angle $\\theta\'$. Jupiter apparaît-elle alors comme un disque ?' },
        { n: 'd', text: 'Calculer la taille de l\'image intermédiaire. Commenter sa petitesse au regard du résultat précédent.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const LUNETTE_CORRECTIONS: Record<string, Correction> = {
  'lunette-1': {
    steps: [
      { n: '1', text: '$V=\\dfrac{1}{f\'}=\\dfrac{1}{0{,}25}=4{,}0\\,\\delta$.' },
    ],
    result: '$V=4{,}0\\,\\delta$.',
  },
  'lunette-2': {
    steps: [
      { n: '1', text: '$f\'=\\dfrac{1}{V}=\\dfrac{1}{8{,}0}=0{,}125\\,\\text{m}=12{,}5\\,\\text{cm}$.' },
    ],
    result: '$f\'=0{,}125\\,\\text{m}=12{,}5\\,\\text{cm}$.',
  },
  'lunette-3': {
    steps: [
      { n: '1', text: '$\\theta\\approx\\dfrac{D}{d}=\\dfrac{1{,}39\\times 10^{6}}{1{,}50\\times 10^{8}}\\approx 9{,}3\\times 10^{-3}\\,\\text{rad}$.' },
      { n: '2', text: 'En degrés : $\\theta\\approx 9{,}3\\times 10^{-3}\\times 57{,}3\\approx 0{,}53°$.' },
    ],
    result: '$\\theta\\approx 9{,}3\\times 10^{-3}\\,\\text{rad}\\approx 0{,}53°$.',
  },
  'lunette-4': {
    steps: [
      { n: '1', text: '$G=\\dfrac{f_1\'}{f_2\'}=\\dfrac{800}{16}=50$ (le rapport peut se faire directement en mm : les unités se simplifient).' },
    ],
    result: '$G=50$.',
  },
  'lunette-5': {
    steps: [
      { n: '1', text: '$G=\\dfrac{f_1\'}{f_2\'}=\\dfrac{1{,}0}{25\\times 10^{-3}}=40$.' },
    ],
    result: '$G=40$.',
  },
  'lunette-6': {
    steps: [
      { n: '1', text: '$O_1O_2=f_1\'+f_2\'=900+20=920\\,\\text{mm}=0{,}920\\,\\text{m}$.' },
    ],
    result: '$O_1O_2=920\\,\\text{mm}$.',
  },
  'lunette-7': {
    steps: [
      { n: '1', text: '$V_{\\text{oculaire}}=\\dfrac{1}{0{,}050}=20\\,\\delta$ ; $V_{\\text{objectif}}=\\dfrac{1}{1{,}0}=1{,}0\\,\\delta$.' },
      { n: '2', text: 'L\'oculaire est **bien plus convergent** : c\'est logique, sa distance focale est courte. Dans une lunette, l\'objectif est peu convergent (grande focale), l\'oculaire très convergent (courte focale).' },
    ],
    result: '$20\\,\\delta$ contre $1{,}0\\,\\delta$.',
  },
  'lunette-8': {
    steps: [
      { n: '1', text: 'Le rayon passant par le **centre optique** $O$ n\'est pas dévié.' },
      { n: '2', text: 'Le rayon **parallèle à l\'axe optique** émerge en passant par le foyer image $F\'$.' },
      { n: '3', text: 'Le rayon passant par le **foyer objet** $F$ émerge parallèle à l\'axe optique.' },
    ],
    result: 'Rayon par $O$ (non dévié), rayon parallèle → $F\'$, rayon par $F$ → parallèle.',
  },
  'lunette-9': {
    steps: [
      { n: '1', text: '$\\theta\\approx\\dfrac{30}{2{,}0\\times 10^{3}}=1{,}5\\times 10^{-2}\\,\\text{rad}$.' },
      { n: '2', text: 'En degrés : $\\theta\\approx 1{,}5\\times 10^{-2}\\times 57{,}3\\approx 0{,}86°$.' },
    ],
    result: '$\\theta=1{,}5\\times 10^{-2}\\,\\text{rad}\\approx 0{,}86°$.',
  },
  'lunette-10': {
    steps: [
      { n: '1', text: '$A_1B_1\\approx f_1\'\\theta=0{,}60\\times 9{,}0\\times 10^{-3}=5{,}4\\times 10^{-3}\\,\\text{m}=5{,}4\\,\\text{mm}$.' },
    ],
    result: '$A_1B_1=5{,}4\\,\\text{mm}$.',
  },
  'lunette-11': {
    steps: [
      { n: '1', text: 'L\'image se forme dans le **plan focal image** (plan perpendiculaire à l\'axe passant par $F\'$).' },
      { n: '2', text: 'En effet, tous les rayons issus d\'un même point à l\'infini arrivent parallèles entre eux ; celui qui passe par $O$ n\'étant pas dévié, il donne la direction commune de convergence, et l\'ensemble se coupe dans ce plan.' },
    ],
    result: 'Dans le plan focal image (passant par $F\'$).',
  },
  'lunette-12': {
    steps: [
      { n: '1', text: '$G=\\dfrac{f_1\'}{f_2\'}\\Rightarrow f_2\'=\\dfrac{f_1\'}{G}=\\dfrac{1{,}2}{100}=1{,}2\\times 10^{-2}\\,\\text{m}=12\\,\\text{mm}$.' },
    ],
    result: '$f_2\'=12\\,\\text{mm}$.',
  },
  'lunette-13': {
    steps: [
      { n: '1', text: '$f_1\'=G\\times f_2\'=60\\times 15\\times 10^{-3}=0{,}90\\,\\text{m}$.' },
    ],
    result: '$f_1\'=0{,}90\\,\\text{m}$.',
  },
  'lunette-14': {
    steps: [
      { n: '1', text: 'Une lunette est **afocale** lorsque $F_1\'=F_2$ : l\'image d\'un objet à l\'infini est alors rejetée à l\'infini.' },
      { n: '2', text: 'L\'intérêt : l\'œil, au repos, observe naturellement à l\'infini — il n\'a **aucune accommodation** à fournir, l\'observation prolongée est donc confortable et sans fatigue.' },
    ],
    result: 'Afocale ($F_1\'=F_2$) : image à l\'infini, œil au repos (sans accommodation).',
  },
  'lunette-15': {
    steps: [
      { n: '1', text: '$\\theta\'=G\\,\\theta=45\\times 9{,}0\\times 10^{-3}=0{,}405\\,\\text{rad}$.' },
      { n: '2', text: 'En degrés : $\\theta\'\\approx 0{,}405\\times 57{,}3\\approx 23°$.' },
    ],
    result: '$\\theta\'\\approx 0{,}41\\,\\text{rad}\\approx 23°$.',
  },
  'lunette-16': {
    steps: [
      { n: '1', text: 'L\'image finale est **à l\'infini**, donc **virtuelle** : on ne peut pas la recueillir sur un écran (elle ne s\'observe qu\'à l\'œil).' },
      { n: '2', text: 'Elle est de plus **renversée** par rapport à l\'objet.' },
    ],
    result: 'Virtuelle (à l\'infini), non recueillable sur écran, renversée.',
  },
  'lunette-17': {
    steps: [
      { n: '1', text: '$O_1O_2=f_1\'+f_2\'\\Rightarrow f_1\'=O_1O_2-f_2\'=1{,}05-0{,}050=1{,}00\\,\\text{m}$.' },
      { n: '2', text: '$G=\\dfrac{f_1\'}{f_2\'}=\\dfrac{1{,}00}{0{,}050}=20$.' },
    ],
    result: '$f_1\'=1{,}00\\,\\text{m}$ ; $G=20$.',
  },
  'lunette-18': {
    steps: [
      { n: 'a', text: '$\\theta\\approx\\dfrac{3474}{3{,}844\\times 10^{5}}\\approx 9{,}04\\times 10^{-3}\\,\\text{rad}$ ; $A_1B_1\\approx f_1\'\\theta=0{,}90\\times 9{,}04\\times 10^{-3}\\approx 8{,}1\\times 10^{-3}\\,\\text{m}=8{,}1\\,\\text{mm}$.' },
      { n: 'b', text: '$\\theta\'=\\dfrac{A_1B_1}{f_2\'}=\\dfrac{8{,}1\\times 10^{-3}}{20\\times 10^{-3}}\\approx 0{,}41\\,\\text{rad}$, d\'où $G=\\dfrac{\\theta\'}{\\theta}=\\dfrac{0{,}41}{9{,}04\\times 10^{-3}}\\approx 45$.' },
      { n: 'c', text: '$\\dfrac{f_1\'}{f_2\'}=\\dfrac{0{,}90}{0{,}020}=45$ : on retrouve bien la même valeur. C\'est la vérification attendue.' },
    ],
    result: '$A_1B_1=8{,}1\\,\\text{mm}$ ; $\\theta\'\\approx 0{,}41\\,\\text{rad}$ ; $G=45$ (par les deux voies).',
  },
  'lunette-19': {
    steps: [
      { n: 'a', text: '$\\theta\\approx\\dfrac{D}{d}=\\dfrac{3474}{3{,}844\\times 10^{5}}\\approx 9{,}0\\times 10^{-3}\\,\\text{rad}$, soit $\\approx 9{,}0\\times 10^{-3}\\times 57{,}3\\approx 0{,}52°$.' },
      { n: 'b', text: 'La lunette étant afocale, $F_1\'=F_2$ ; l\'objectif et l\'oculaire sont donc séparés de $O_1O_2=f_1\'+f_2\'=900+20=920\\,\\text{mm}=0{,}920\\,\\text{m}$.' },
      { n: 'c', text: '$A_1B_1\\approx f_1\'\\theta=0{,}900\\times 9{,}0\\times 10^{-3}\\approx 8{,}1\\,\\text{mm}$. Cette image intermédiaire, **réelle**, se forme dans le plan focal image de l\'objectif — qui est aussi le plan focal objet de l\'oculaire.' },
      { n: 'd', text: '$G=\\dfrac{f_1\'}{f_2\'}=\\dfrac{900}{20}=45$, d\'où $\\theta\'=G\\,\\theta=45\\times 9{,}0\\times 10^{-3}\\approx 0{,}41\\,\\text{rad}\\approx 23°$. La Lune, vue à l\'œil nu sous $0{,}52°$, est vue sous $23°$ dans la lunette : elle occupe une portion considérable du champ de vision.' },
    ],
    result: '$\\theta\\approx 0{,}52°$ ; $O_1O_2=920\\,\\text{mm}$ ; $A_1B_1=8{,}1\\,\\text{mm}$ ; $G=45$ ; $\\theta\'\\approx 23°$.',
  },
  'lunette-20': {
    steps: [
      { n: 'a', text: 'Avec $f_2\'=30\\,\\text{mm}$ : $G=\\dfrac{1{,}20}{0{,}030}=40$. Avec $f_2\'=10\\,\\text{mm}$ : $G=\\dfrac{1{,}20}{0{,}010}=120$.' },
      { n: 'b', text: '$O_1O_2=f_1\'+f_2\'$ : soit $1{,}20+0{,}030=1{,}23\\,\\text{m}$ dans le premier cas, et $1{,}20+0{,}010=1{,}21\\,\\text{m}$ dans le second. La longueur de la lunette varie peu : c\'est l\'objectif qui la fixe.' },
      { n: 'c', text: 'Pour un détail très fin, on choisit l\'oculaire de $10\\,\\text{mm}$ ($G=120$). Inconvénients d\'un très fort grossissement : le **champ observé se réduit**, l\'**image s\'assombrit** (la lumière collectée est étalée sur une plus grande surface apparente), et les défauts (turbulence atmosphérique, tremblements) sont amplifiés d\'autant.' },
      { n: 'd', text: '$f_2\'=\\dfrac{f_1\'}{G}=\\dfrac{1{,}20}{80}=1{,}5\\times 10^{-2}\\,\\text{m}=15\\,\\text{mm}$.' },
    ],
    result: '$G=40$ ou $120$ ; $O_1O_2=1{,}23$ ou $1{,}21\\,\\text{m}$ ; $f_2\'=15\\,\\text{mm}$ pour $G=80$.',
  },
  'lunette-21': {
    steps: [
      { n: 'a', text: '$\\theta\\approx\\dfrac{D}{d}=\\dfrac{1{,}43\\times 10^{5}}{6{,}3\\times 10^{8}}\\approx 2{,}3\\times 10^{-4}\\,\\text{rad}$.' },
      { n: 'b', text: '$\\theta\\approx 2{,}3\\times 10^{-4}\\,\\text{rad}<3\\times 10^{-4}\\,\\text{rad}$ : le diamètre apparent est **inférieur** à la limite de résolution de l\'œil. Jupiter apparaît donc à l\'œil nu comme un simple **point** lumineux, et non comme un disque.' },
      { n: 'c', text: '$G=\\dfrac{f_1\'}{f_2\'}=\\dfrac{1{,}00}{0{,}020}=50$, d\'où $\\theta\'=G\\,\\theta=50\\times 2{,}3\\times 10^{-4}\\approx 1{,}1\\times 10^{-2}\\,\\text{rad}\\approx 0{,}65°$. Cette valeur est très supérieure à $3\\times 10^{-4}\\,\\text{rad}$ : Jupiter est alors nettement perçue comme un **disque**.' },
      { n: 'd', text: '$A_1B_1\\approx f_1\'\\theta=1{,}00\\times 2{,}3\\times 10^{-4}\\approx 0{,}23\\,\\text{mm}$. L\'image intermédiaire est minuscule — mais c\'est sans importance : l\'oculaire, en la plaçant en son foyer objet, la fait voir sous un grand angle. Ce qui compte n\'est pas la taille de l\'image, mais l\'angle sous lequel on la voit.' },
    ],
    result: '$\\theta\\approx 2{,}3\\times 10^{-4}\\,\\text{rad}$ (point) ; $G=50$ ; $\\theta\'\\approx 0{,}65°$ (disque) ; $A_1B_1=0{,}23\\,\\text{mm}$.',
  },
};
