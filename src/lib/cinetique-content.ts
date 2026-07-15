import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const CINETIQUE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La vitesse volumique de disparition de $\\text{A}$ vaut…',
    options: [
      { label: 'a', text: '$+\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$' },
      { label: 'b', text: '$-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$' },
      { label: 'c', text: '$[\\text{A}]\\times t$' },
      { label: 'd', text: '$\\dfrac{[\\text{A}]}{t}$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Graphiquement, la vitesse à la date $t$ est…',
    options: [
      { label: 'a', text: 'l\'aire sous la courbe' },
      { label: 'b', text: 'la pente de la tangente' },
      { label: 'c', text: 'l\'ordonnée du point' },
      { label: 'd', text: 'l\'abscisse du point' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Pour une loi d\'ordre 1…',
    options: [
      { label: 'a', text: '$v=k$' },
      { label: 'b', text: '$v=k\\,[\\text{A}]$' },
      { label: 'c', text: '$v=k\\,[\\text{A}]^2$' },
      { label: 'd', text: '$v=\\dfrac{k}{[\\text{A}]}$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'L\'unité de $k$ pour un ordre 1 est…',
    options: [
      { label: 'a', text: '$\\text{mol·L}^{-1}$' },
      { label: 'b', text: '$\\text{s}^{-1}$' },
      { label: 'c', text: '$\\text{mol·L}^{-1}\\text{·s}^{-1}$' },
      { label: 'd', text: 'sans unité' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La solution de $\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}+k\\,[\\text{A}]=0$ est…',
    options: [
      { label: 'a', text: '$[\\text{A}]_0\\,\\mathrm{e}^{-kt}$' },
      { label: 'b', text: '$[\\text{A}]_0\\,\\mathrm{e}^{+kt}$' },
      { label: 'c', text: '$[\\text{A}]_0\\,(1-\\mathrm{e}^{-kt})$' },
      { label: 'd', text: '$[\\text{A}]_0-kt$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'Le temps de demi-réaction vaut…',
    options: [
      { label: 'a', text: '$t_{1/2}=\\dfrac{\\ln 2}{k}$' },
      { label: 'b', text: '$t_{1/2}=\\dfrac{k}{\\ln 2}$' },
      { label: 'c', text: '$t_{1/2}=2k$' },
      { label: 'd', text: '$t_{1/2}=\\dfrac{1}{2k}$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'Après $2\\,t_{1/2}$, il reste…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$\\dfrac{[\\text{A}]_0}{4}$' },
      { label: 'c', text: '$\\dfrac{[\\text{A}]_0}{2}$' },
      { label: 'd', text: '$\\dfrac{[\\text{A}]_0}{3}$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Pour un ordre 1, $t_{1/2}$ dépend…',
    options: [
      { label: 'a', text: 'de $[\\text{A}]_0$' },
      { label: 'b', text: 'seulement de $k$' },
      { label: 'c', text: 'du volume' },
      { label: 'd', text: 'de la pression' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Une élévation de température…',
    options: [
      { label: 'a', text: 'augmente la vitesse' },
      { label: 'b', text: 'diminue la vitesse' },
      { label: 'c', text: 'est sans effet' },
      { label: 'd', text: 'modifie l\'état final' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'Un catalyseur…',
    options: [
      { label: 'a', text: 'figure dans le bilan' },
      { label: 'b', text: 'est régénéré et absent du bilan' },
      { label: 'c', text: 'déplace l\'état final' },
      { label: 'd', text: 'est consommé totalement' },
    ],
    answer: 'b',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const CINETIQUE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'cinetique-1',
    context: 'Vitesse volumique de disparition d\'un réactif $\\text{A}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir la vitesse volumique de disparition d\'un réactif $\\text{A}$. Pourquoi comporte-t-elle un signe $-$ ? Donner son unité.' },
      ],
    }],
  },
  {
    id: 'cinetique-2',
    context: 'Vitesse volumique d\'apparition d\'un produit $\\text{P}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire la vitesse volumique d\'apparition d\'un produit $\\text{P}$. Pourquoi n\'y a-t-il pas de signe $-$ ?' },
      ],
    }],
  },
  {
    id: 'cinetique-3',
    context: 'Loi d\'ordre 1 : $t_{1/2}=\\dfrac{\\ln 2}{k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction d\'ordre 1 a un temps de demi-réaction $t_{1/2}=25\\,\\text{s}$. Calculer la constante de vitesse $k$.' },
      ],
    }],
  },
  {
    id: 'cinetique-4',
    context: 'Loi d\'ordre 1 : $t_{1/2}=\\dfrac{\\ln 2}{k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction d\'ordre 1 a pour constante $k=0{,}050\\,\\text{s}^{-1}$. Calculer son temps de demi-réaction.' },
      ],
    }],
  },
  {
    id: 'cinetique-5',
    context: 'À chaque $t_{1/2}$, la concentration est divisée par 2.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution a $[\\text{A}]_0=0{,}40\\,\\text{mol·L}^{-1}$ et $t_{1/2}=5{,}0\\,\\text{min}$. Quelle est la concentration à $t=15\\,\\text{min}$ ? (Répondre sans exponentielle.)' },
      ],
    }],
  },
  {
    id: 'cinetique-6',
    context: 'Après $n$ demi-vies, $[\\text{A}]=\\dfrac{[\\text{A}]_0}{2^n}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $[\\text{A}]_0=0{,}080\\,\\text{mol·L}^{-1}$, quelle est la concentration après $4\\,t_{1/2}$ ?' },
      ],
    }],
  },
  {
    id: 'cinetique-7',
    context: 'Loi d\'ordre 1 : $v=k\\,[\\text{A}]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $k=0{,}020\\,\\text{s}^{-1}$ et $[\\text{A}]=0{,}10\\,\\text{mol·L}^{-1}$, calculer la vitesse volumique de disparition.' },
      ],
    }],
  },
  {
    id: 'cinetique-8',
    context: 'Les deux principaux facteurs cinétiques.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer les deux principaux facteurs cinétiques. Dans quel sens chacun modifie-t-il la vitesse ? Justifier à l\'échelle microscopique.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'cinetique-9',
    context: 'Lecture graphique de la vitesse sur une courbe $[\\text{A}]=f(t)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Comment détermine-t-on graphiquement la vitesse à une date $t$ sur une courbe $[\\text{A}]=f(t)$ ? Comment évolue cette vitesse au cours du temps ? Justifier à partir de l\'allure de la courbe.' },
      ],
    }],
  },
  {
    id: 'cinetique-10',
    context: 'Transformations lentes et rapides.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'appelle-t-on une transformation lente ? rapide ? Donner un exemple de chaque.' },
      ],
    }],
  },
  {
    id: 'cinetique-11',
    context: 'Convertir soigneusement les unités de temps.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $k=4{,}0\\times 10^{-3}\\,\\text{s}^{-1}$, calculer $t_{1/2}$ en secondes, puis en minutes.' },
      ],
    }],
  },
  {
    id: 'cinetique-12',
    context: 'Loi d\'ordre 1 : $t_{1/2}=\\dfrac{\\ln 2}{k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction a $t_{1/2}=12\\,\\text{min}$. Calculer $k$ en $\\text{min}^{-1}$, puis en $\\text{s}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'cinetique-13',
    context: 'Relation $t_{1/2}=\\dfrac{\\ln 2}{k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir le temps de demi-réaction. Pour une loi d\'ordre 1, dépend-il de la concentration initiale ? Justifier à partir de la relation $t_{1/2}=\\dfrac{\\ln 2}{k}$.' },
      ],
    }],
  },
  {
    id: 'cinetique-14',
    context: 'Solution : $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $[\\text{A}]_0=0{,}10\\,\\text{mol·L}^{-1}$ et $k=0{,}020\\,\\text{s}^{-1}$, calculer $[\\text{A}]$ à $t=60\\,\\text{s}$.' },
      ],
    }],
  },
  {
    id: 'cinetique-15',
    context: 'Solution : $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $[\\text{A}]_0=0{,}25\\,\\text{mol·L}^{-1}$ et $k=1{,}5\\times 10^{-3}\\,\\text{s}^{-1}$, calculer $[\\text{A}]$ à $t=300\\,\\text{s}$.' },
      ],
    }],
  },
  {
    id: 'cinetique-16',
    context: 'Loi d\'ordre 1 : $v=k\\,[\\text{A}]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Comparer la vitesse à $t_{1/2}$ à la vitesse initiale $v_0$. Justifier à l\'aide de la loi $v=k\\,[\\text{A}]$.' },
      ],
    }],
  },
  {
    id: 'cinetique-17',
    context: 'Durée pour atteindre une concentration : $t=\\dfrac{1}{k}\\ln\\dfrac{[\\text{A}]_0}{[\\text{A}]}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $k=2{,}3\\times 10^{-2}\\,\\text{s}^{-1}$, calculer la durée au bout de laquelle il ne reste que le quart du réactif. Retrouver le résultat par un raisonnement en demi-vies.' },
      ],
    }],
  },
  {
    id: 'cinetique-18',
    context: 'La trempe repose sur un facteur cinétique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'est-ce que la trempe ? Sur quel facteur cinétique repose-t-elle ? Pourquoi l\'utilise-t-on avant de titrer un mélange réactionnel ?' },
      ],
    }],
  },
  {
    id: 'cinetique-19',
    context: 'Le catalyseur n\'apparaît pas dans le bilan.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir un catalyseur. Apparaît-il dans l\'équation bilan ? Modifie-t-il l\'état final du système ? Citer les trois types de catalyse.' },
      ],
    }],
  },
  // ── TIER 3 — approfondissement ★★★ ─────────────────────────────────────────
  {
    id: 'cinetique-20',
    context: 'Combiner $v=-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$ et $v=k\\,[\\text{A}]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Établir l\'équation différentielle vérifiée par $[\\text{A}]$ pour une réaction d\'ordre 1.' },
        { n: 'b', text: 'Vérifier que $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}$ en est solution (dérivation et condition initiale).' },
      ],
    }],
  },
  {
    id: 'cinetique-21',
    context: 'Durée : $t=\\dfrac{1}{k}\\ln\\dfrac{[\\text{A}]_0}{[\\text{A}]}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $k=0{,}020\\,\\text{s}^{-1}$, calculer la durée nécessaire pour que $90\\,\\%$ du réactif ait disparu.' },
      ],
    }],
  },
  {
    id: 'cinetique-22',
    context: 'Cinétique (« à quelle vitesse ? ») et thermodynamique (« jusqu\'où ? ») sont indépendantes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction très lente est-elle nécessairement peu avancée à l\'état final ?' },
        { n: 'b', text: 'Un catalyseur peut-il rendre possible une réaction qui ne l\'était pas ? Justifier.' },
      ],
    }],
  },
  // ── TIER 4 — sujets type bac ◆ ─────────────────────────────────────────────
  {
    id: 'cinetique-23',
    context: 'L\'eau oxygénée se décompose selon $2\\,\\text{H}_2\\text{O}_2 \\to 2\\,\\text{H}_2\\text{O} + \\text{O}_2$. Le suivi d\'une solution de concentration initiale $c_0=0{,}20\\,\\text{mol·L}^{-1}$ montre que la réaction suit une loi d\'ordre 1, de temps de demi-réaction $t_{1/2}=8{,}0\\,\\text{min}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la constante de vitesse $k$, en $\\text{min}^{-1}$ puis en $\\text{s}^{-1}$.' },
        { n: 'b', text: 'Donner la concentration en eau oxygénée à $t=8{,}0$, $16$ et $24\\,\\text{min}$. Répondre sans utiliser l\'exponentielle, puis vérifier par le calcul pour $t=16\\,\\text{min}$.' },
        { n: 'c', text: 'Calculer la vitesse initiale $v_0$ de disparition, en $\\text{mol·L}^{-1}\\text{·min}^{-1}$.' },
        { n: 'd', text: 'Calculer la durée nécessaire pour décomposer $90\\,\\%$ de l\'eau oxygénée.' },
        { n: 'e', text: 'En présence d\'ions $\\text{Fe}^{3+}$, le temps de demi-réaction chute à $30\\,\\text{s}$. Calculer la nouvelle constante $k\'$ et le rapport $k\'/k$. Quel est le rôle des ions $\\text{Fe}^{3+}$ ? De quel type de catalyse s\'agit-il ? La quantité finale de dioxygène est-elle modifiée ?' },
      ],
    }],
  },
  {
    id: 'cinetique-24',
    context: 'Le suivi d\'une transformation donne, pour un réactif $\\text{A}$ : $[\\text{A}]=0{,}100$ ; $0{,}050$ ; $0{,}025$ ; $0{,}0125\\,\\text{mol·L}^{-1}$ aux dates $t=0$ ; $30$ ; $60$ ; $90\\,\\text{s}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la durée nécessaire pour passer de $0{,}100$ à $0{,}050\\,\\text{mol·L}^{-1}$, puis de $0{,}050$ à $0{,}025$, puis de $0{,}025$ à $0{,}0125$.' },
        { n: 'b', text: 'Que constate-t-on ? En quoi cela confirme-t-il une loi de vitesse d\'ordre 1 ?' },
        { n: 'c', text: 'En déduire $t_{1/2}$, puis calculer $k$.' },
        { n: 'd', text: 'Calculer la vitesse à $t=0$, puis à $t=30\\,\\text{s}$. Quel rapport observe-t-on ? Était-ce prévisible ?' },
        { n: 'e', text: 'Quelle serait la concentration à $t=150\\,\\text{s}$ ?' },
      ],
    }],
  },
  {
    id: 'cinetique-25',
    context: 'Une même transformation d\'ordre 1 est suivie à deux températures. À $20\\,°\\text{C}$, $t_{1/2}=40\\,\\text{min}$ ; à $40\\,°\\text{C}$, $t_{1/2}=10\\,\\text{min}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les constantes de vitesse $k_{20}$ et $k_{40}$, en $\\text{min}^{-1}$. Calculer le rapport $k_{40}/k_{20}$ et commenter.' },
        { n: 'b', text: 'Interpréter, à l\'échelle microscopique, l\'effet d\'une élévation de température sur la vitesse.' },
        { n: 'c', text: 'À $20\\,°\\text{C}$, quelle fraction du réactif reste-t-il au bout de $2{,}0\\,\\text{h}$ ? Répondre par un raisonnement en demi-vies, puis vérifier par le calcul.' },
        { n: 'd', text: 'Même question à $40\\,°\\text{C}$. Commenter l\'écart.' },
        { n: 'e', text: 'Pour figer le système avant un titrage, on plonge le bécher dans un bain de glace. Comment s\'appelle cette opération ? Pourquoi est-elle nécessaire ? L\'état final du système en est-il modifié ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const CINETIQUE_CORRECTIONS: Record<string, Correction> = {
  'cinetique-1': {
    steps: [
      { n: '1', text: '$v=-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$, en $\\text{mol·L}^{-1}\\text{·s}^{-1}$.' },
      { n: '2', text: 'La concentration d\'un réactif **décroît**, donc $\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}<0$ : le signe $-$ rend la vitesse **positive**, comme il se doit.' },
    ],
    result: '$v=-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$, en $\\text{mol·L}^{-1}\\text{·s}^{-1}$ ; le signe $-$ garantit $v>0$.',
  },
  'cinetique-2': {
    steps: [
      { n: '1', text: '$v=+\\dfrac{\\mathrm{d}[\\text{P}]}{\\mathrm{d}t}$.' },
      { n: '2', text: 'La concentration d\'un **produit augmente**, donc sa dérivée est déjà positive : aucun signe $-$ n\'est nécessaire.' },
    ],
    result: '$v=+\\dfrac{\\mathrm{d}[\\text{P}]}{\\mathrm{d}t}$ (dérivée déjà positive).',
  },
  'cinetique-3': {
    steps: [
      { n: '1', text: '$t_{1/2}=\\dfrac{\\ln 2}{k}$, donc $k=\\dfrac{\\ln 2}{t_{1/2}}$.' },
      { n: '2', text: '$k=\\dfrac{0{,}693}{25}\\approx 2{,}8\\times 10^{-2}\\,\\text{s}^{-1}$.' },
    ],
    result: '$k\\approx 2{,}8\\times 10^{-2}\\,\\text{s}^{-1}$.',
  },
  'cinetique-4': {
    steps: [
      { n: '1', text: '$t_{1/2}=\\dfrac{\\ln 2}{k}=\\dfrac{0{,}693}{0{,}050}$.' },
      { n: '2', text: '$t_{1/2}\\approx 14\\,\\text{s}$.' },
    ],
    result: '$t_{1/2}\\approx 14\\,\\text{s}$.',
  },
  'cinetique-5': {
    steps: [
      { n: '1', text: '$t=15\\,\\text{min}=3\\times 5{,}0=3\\,t_{1/2}$ : la concentration est divisée par $2^3=8$.' },
      { n: '2', text: '$[\\text{A}]=\\dfrac{0{,}40}{8}=0{,}050\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$[\\text{A}]=0{,}050\\,\\text{mol·L}^{-1}$.',
  },
  'cinetique-6': {
    steps: [
      { n: '1', text: 'Après $4\\,t_{1/2}$, division par $2^4=16$.' },
      { n: '2', text: '$[\\text{A}]=\\dfrac{0{,}080}{16}=5{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$[\\text{A}]=5{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.',
  },
  'cinetique-7': {
    steps: [
      { n: '1', text: '$v=k\\,[\\text{A}]=0{,}020\\times 0{,}10$.' },
      { n: '2', text: '$v=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}\\text{·s}^{-1}$.' },
    ],
    result: '$v=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}\\text{·s}^{-1}$.',
  },
  'cinetique-8': {
    steps: [
      { n: '1', text: 'Les deux principaux facteurs sont la **température** et la **concentration** des réactifs. Une augmentation de l\'un ou de l\'autre **augmente** la vitesse.' },
      { n: '2', text: 'Microscopiquement : une concentration plus élevée rend les chocs entre entités plus **fréquents**. Une température plus élevée accroît l\'agitation thermique : les chocs sont plus fréquents et surtout plus **énergétiques**, donc une plus grande proportion d\'entre eux est efficace.' },
    ],
    result: 'Température et concentration : les augmenter augmente la vitesse (chocs plus fréquents et plus énergétiques).',
  },
  'cinetique-9': {
    steps: [
      { n: '1', text: 'On trace la **tangente** à la courbe $[\\text{A}]=f(t)$ à la date $t$ et on mesure son coefficient directeur ; la vitesse en est l\'**opposé** (pour un réactif).' },
      { n: '2', text: 'La vitesse **diminue** au cours du temps : la courbe s\'aplatit, la pente de la tangente tend vers $0$. C\'est cohérent avec $v=k\\,[\\text{A}]$ : à mesure que $[\\text{A}]$ diminue, la vitesse diminue aussi.' },
    ],
    result: 'Vitesse = opposé de la pente de la tangente ; elle diminue au cours du temps.',
  },
  'cinetique-10': {
    steps: [
      { n: '1', text: 'Une transformation **rapide** paraît instantanée à l\'échelle de l\'observation (ex. : précipitation, réaction acide-base, explosion).' },
      { n: '2', text: 'Une transformation **lente** évolue sur une durée mesurable (ex. : rouille du fer, décomposition de l\'eau oxygénée, fermentation).' },
    ],
    result: 'Rapide : quasi instantanée. Lente : suivie dans le temps.',
  },
  'cinetique-11': {
    steps: [
      { n: '1', text: '$t_{1/2}=\\dfrac{\\ln 2}{k}=\\dfrac{0{,}693}{4{,}0\\times 10^{-3}}\\approx 1{,}7\\times 10^{2}\\,\\text{s}$.' },
      { n: '2', text: 'En minutes : $\\dfrac{173}{60}\\approx 2{,}9\\,\\text{min}$.' },
    ],
    result: '$t_{1/2}\\approx 1{,}7\\times 10^{2}\\,\\text{s}\\approx 2{,}9\\,\\text{min}$.',
  },
  'cinetique-12': {
    steps: [
      { n: '1', text: '$k=\\dfrac{\\ln 2}{t_{1/2}}=\\dfrac{0{,}693}{12}\\approx 5{,}8\\times 10^{-2}\\,\\text{min}^{-1}$.' },
      { n: '2', text: 'En secondes : $t_{1/2}=12\\times 60=720\\,\\text{s}$, donc $k=\\dfrac{0{,}693}{720}\\approx 9{,}6\\times 10^{-4}\\,\\text{s}^{-1}$.' },
    ],
    result: '$k\\approx 5{,}8\\times 10^{-2}\\,\\text{min}^{-1}\\approx 9{,}6\\times 10^{-4}\\,\\text{s}^{-1}$.',
  },
  'cinetique-13': {
    steps: [
      { n: '1', text: 'Le temps de demi-réaction est la durée au bout de laquelle l\'avancement atteint la moitié de sa valeur finale — soit, si $\\text{A}$ est limitant, $[\\text{A}](t_{1/2})=\\dfrac{[\\text{A}]_0}{2}$.' },
      { n: '2', text: 'Pour un ordre 1, $t_{1/2}=\\dfrac{\\ln 2}{k}$ : cette expression ne fait intervenir que $k$. Donc $t_{1/2}$ est **indépendant de $[\\text{A}]_0$** — c\'est une propriété caractéristique de l\'ordre 1.' },
    ],
    result: '$t_{1/2}=\\dfrac{\\ln 2}{k}$ : indépendant de la concentration initiale (signature de l\'ordre 1).',
  },
  'cinetique-14': {
    steps: [
      { n: '1', text: '$[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}=0{,}10\\times\\mathrm{e}^{-0{,}020\\times 60}=0{,}10\\times\\mathrm{e}^{-1{,}2}$.' },
      { n: '2', text: '$[\\text{A}]\\approx 3{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$[\\text{A}]\\approx 3{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$.',
  },
  'cinetique-15': {
    steps: [
      { n: '1', text: '$[\\text{A}]=0{,}25\\times\\mathrm{e}^{-1{,}5\\times 10^{-3}\\times 300}=0{,}25\\times\\mathrm{e}^{-0{,}45}$.' },
      { n: '2', text: '$[\\text{A}]\\approx 0{,}16\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$[\\text{A}]\\approx 0{,}16\\,\\text{mol·L}^{-1}$.',
  },
  'cinetique-16': {
    steps: [
      { n: '1', text: '$v_0=k\\,[\\text{A}]_0$ et $v(t_{1/2})=k\\,[\\text{A}](t_{1/2})=k\\,\\dfrac{[\\text{A}]_0}{2}=\\dfrac{v_0}{2}$.' },
      { n: '2', text: 'La vitesse est donc **divisée par deux**, exactement comme la concentration : conséquence directe de la proportionnalité $v=k\\,[\\text{A}]$.' },
    ],
    result: '$v(t_{1/2})=\\dfrac{v_0}{2}$.',
  },
  'cinetique-17': {
    steps: [
      { n: '1', text: 'Le quart restant correspond à deux divisions par 2, soit $2\\,t_{1/2}$.' },
      { n: '2', text: 'Par le calcul : $k=\\dfrac{\\ln 2}{t_{1/2}}$ donne $t_{1/2}=\\dfrac{\\ln 2}{2{,}3\\times 10^{-2}}=30\\,\\text{s}$, donc $t=\\dfrac{\\ln 4}{k}=\\dfrac{1{,}386}{2{,}3\\times 10^{-2}}\\approx 60\\,\\text{s}$.' },
      { n: '3', text: 'Les deux méthodes concordent : $t=2\\,t_{1/2}=60\\,\\text{s}$ (et pour cause, $\\ln 4=2\\ln 2$).' },
    ],
    result: '$t=60\\,\\text{s}=2\\,t_{1/2}$.',
  },
  'cinetique-18': {
    steps: [
      { n: '1', text: 'La **trempe** consiste à refroidir brutalement le mélange réactionnel (bain de glace), éventuellement en le diluant. Elle repose sur le facteur cinétique **température**.' },
      { n: '2', text: 'On l\'utilise avant un titrage pour **bloquer l\'évolution** du système : la réaction devenant extrêmement lente, la composition reste figée pendant tout le dosage — on titre bien l\'état du système à la date choisie.' },
    ],
    result: 'Trempe = refroidir pour bloquer la réaction (facteur température) et figer la composition avant titrage.',
  },
  'cinetique-19': {
    steps: [
      { n: '1', text: 'Un **catalyseur** augmente la vitesse d\'une réaction sans être consommé : il est utilisé puis **régénéré** au cours du mécanisme. Il n\'apparaît **pas** dans l\'équation bilan.' },
      { n: '2', text: 'Il ne modifie **pas l\'état final** : il ne fait qu\'accélérer son obtention.' },
      { n: '3', text: 'Trois types : catalyse **homogène** (même phase), **hétérogène** (phases différentes), **enzymatique** (catalyseur = enzyme).' },
    ],
    result: 'Catalyseur : accélère, non consommé, absent du bilan, n\'altère pas l\'état final. Types : homogène / hétérogène / enzymatique.',
  },
  'cinetique-20': {
    steps: [
      { n: '1', text: 'Par définition $v=-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}$ ; pour un ordre 1, $v=k\\,[\\text{A}]$. En égalant : $-\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}=k\\,[\\text{A}]$, soit $\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}+k\\,[\\text{A}]=0$.' },
      { n: '2', text: 'Vérification : en dérivant $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}$, on a $\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}=-k\\,[\\text{A}]_0\\,\\mathrm{e}^{-kt}=-k\\,[\\text{A}]$. Donc $\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}+k\\,[\\text{A}]=0$ ✓.' },
      { n: '3', text: 'Condition initiale : à $t=0$, $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^0=[\\text{A}]_0$ ✓.' },
    ],
    result: '$\\dfrac{\\mathrm{d}[\\text{A}]}{\\mathrm{d}t}+k\\,[\\text{A}]=0$, de solution $[\\text{A}]=[\\text{A}]_0\\,\\mathrm{e}^{-kt}$.',
  },
  'cinetique-21': {
    steps: [
      { n: '1', text: 'Si $90\\,\\%$ a disparu, il reste $10\\,\\%$ : $[\\text{A}]=\\dfrac{[\\text{A}]_0}{10}$.' },
      { n: '2', text: '$t=\\dfrac{1}{k}\\ln\\dfrac{[\\text{A}]_0}{[\\text{A}]}=\\dfrac{\\ln 10}{k}=\\dfrac{2{,}303}{0{,}020}\\approx 1{,}2\\times 10^{2}\\,\\text{s}$.' },
    ],
    result: '$t\\approx 1{,}2\\times 10^{2}\\,\\text{s}$.',
  },
  'cinetique-22': {
    steps: [
      { n: '1', text: 'Non dans les deux cas — pour la même raison de fond : **cinétique et thermodynamique sont indépendantes**.' },
      { n: '2', text: 'Une réaction très lente peut être **totale** : elle atteindra un avancement maximal, simplement au bout d\'un temps très long. La vitesse ne dit rien de l\'avancement final.' },
      { n: '3', text: 'Un catalyseur ne peut **pas** rendre possible une réaction qui ne l\'était pas : il n\'accélère que ce qui se produirait déjà. Il agit sur la durée du trajet, jamais sur la destination.' },
    ],
    result: 'Non : une réaction lente peut être totale ; un catalyseur agit sur la durée, pas sur l\'état final.',
  },
  'cinetique-23': {
    steps: [
      { n: 'a', text: '$k=\\dfrac{\\ln 2}{t_{1/2}}=\\dfrac{0{,}693}{8{,}0}\\approx 8{,}7\\times 10^{-2}\\,\\text{min}^{-1}$. En secondes : $t_{1/2}=480\\,\\text{s}$, donc $k=\\dfrac{0{,}693}{480}\\approx 1{,}4\\times 10^{-3}\\,\\text{s}^{-1}$.' },
      { n: 'b', text: 'Chaque $t_{1/2}$ divise la concentration par 2 : à $8{,}0\\,\\text{min}$, $0{,}10$ ; à $16\\,\\text{min}$, $0{,}050$ ; à $24\\,\\text{min}$, $0{,}025\\,\\text{mol·L}^{-1}$. Vérification à $16\\,\\text{min}$ : $0{,}20\\times\\mathrm{e}^{-8{,}66\\times 10^{-2}\\times 16}=0{,}20\\times\\mathrm{e}^{-1{,}386}=0{,}050\\,\\text{mol·L}^{-1}$ ✓.' },
      { n: 'c', text: '$v_0=k\\,c_0=8{,}66\\times 10^{-2}\\times 0{,}20\\approx 1{,}7\\times 10^{-2}\\,\\text{mol·L}^{-1}\\text{·min}^{-1}$.' },
      { n: 'd', text: 'Il reste $10\\,\\%$ : $t=\\dfrac{\\ln 10}{k}=\\dfrac{2{,}303}{8{,}66\\times 10^{-2}}\\approx 27\\,\\text{min}$.' },
      { n: 'e', text: '$t\'_{1/2}=30\\,\\text{s}=0{,}50\\,\\text{min}$, donc $k\'=\\dfrac{0{,}693}{0{,}50}\\approx 1{,}4\\,\\text{min}^{-1}$, soit $\\dfrac{k\'}{k}=16$ : la réaction est **16 fois plus rapide**. Les ions $\\text{Fe}^{3+}$ jouent le rôle de **catalyseur** (catalyse **homogène**, en solution comme le réactif). La quantité finale de $\\text{O}_2$ est **inchangée** : un catalyseur ne modifie pas l\'état final.' },
    ],
    result: '$k\\approx 8{,}7\\times 10^{-2}\\,\\text{min}^{-1}$ · $[\\text{H}_2\\text{O}_2]=0{,}10/0{,}050/0{,}025$ · $v_0\\approx 1{,}7\\times 10^{-2}$ · $t_{90\\%}\\approx 27\\,\\text{min}$ · $k\'/k=16$, catalyse homogène, $n(\\text{O}_2)$ inchangée.',
  },
  'cinetique-24': {
    steps: [
      { n: 'a', text: 'De $0{,}100$ à $0{,}050$ : de $0$ à $30\\,\\text{s}$, soit $30\\,\\text{s}$. De $0{,}050$ à $0{,}025$ : $30\\,\\text{s}$. De $0{,}025$ à $0{,}0125$ : $30\\,\\text{s}$.' },
      { n: 'b', text: 'La durée pour diviser la concentration par deux est **toujours la même** ($30\\,\\text{s}$), quel que soit le point de départ. Or c\'est précisément la propriété caractéristique d\'une **loi d\'ordre 1** : $t_{1/2}=\\dfrac{\\ln 2}{k}$ ne dépend pas de la concentration. L\'ordre 1 est confirmé.' },
      { n: 'c', text: '$t_{1/2}=30\\,\\text{s}$, d\'où $k=\\dfrac{\\ln 2}{30}\\approx 2{,}3\\times 10^{-2}\\,\\text{s}^{-1}$.' },
      { n: 'd', text: '$v(0)=k\\,[\\text{A}]_0=2{,}31\\times 10^{-2}\\times 0{,}100\\approx 2{,}3\\times 10^{-3}$ ; $v(30)=k\\times 0{,}050\\approx 1{,}2\\times 10^{-3}\\,\\text{mol·L}^{-1}\\text{·s}^{-1}$. La vitesse est **divisée par 2** — prévisible, car $t=30\\,\\text{s}=t_{1/2}$ correspond à une concentration divisée par deux.' },
      { n: 'e', text: '$t=150\\,\\text{s}=5\\,t_{1/2}$ : $[\\text{A}]=\\dfrac{0{,}100}{2^5}=\\dfrac{0{,}100}{32}\\approx 3{,}1\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$t_{1/2}=30\\,\\text{s}$ constant $\\Rightarrow$ ordre 1 · $k\\approx 2{,}3\\times 10^{-2}\\,\\text{s}^{-1}$ · $v$ divisée par 2 · $[\\text{A}](150)\\approx 3{,}1\\times 10^{-3}\\,\\text{mol·L}^{-1}$.',
  },
  'cinetique-25': {
    steps: [
      { n: 'a', text: '$k_{20}=\\dfrac{0{,}693}{40}\\approx 1{,}7\\times 10^{-2}\\,\\text{min}^{-1}$ ; $k_{40}=\\dfrac{0{,}693}{10}\\approx 6{,}9\\times 10^{-2}\\,\\text{min}^{-1}$. Rapport $\\dfrac{k_{40}}{k_{20}}=4{,}0$ : une élévation de $20\\,°\\text{C}$ rend ici la réaction 4 fois plus rapide — ordre de grandeur classique.' },
      { n: 'b', text: 'Élever la température accroît l\'agitation thermique : chocs plus **fréquents** et surtout plus **énergétiques**. Une proportion bien plus grande de chocs devient efficace, ce qui augmente la vitesse.' },
      { n: 'c', text: 'À $20\\,°\\text{C}$ : $2{,}0\\,\\text{h}=120\\,\\text{min}=3\\,t_{1/2}$ : il reste $\\dfrac{1}{2^3}=\\dfrac{1}{8}=12{,}5\\,\\%$ du réactif. Vérification : $\\mathrm{e}^{-1{,}73\\times 10^{-2}\\times 120}=\\mathrm{e}^{-2{,}08}\\approx 0{,}125$ ✓.' },
      { n: 'd', text: 'À $40\\,°\\text{C}$ : $120\\,\\text{min}=12\\,t_{1/2}$, il reste $\\dfrac{1}{2^{12}}=\\dfrac{1}{4096}\\approx 0{,}02\\,\\%$. L\'écart est spectaculaire ($12{,}5\\,\\%$ contre $0{,}02\\,\\%$) : un facteur 4 sur $k$ se traduit par plusieurs ordres de grandeur sur la quantité restante, car l\'effet est **exponentiel**.' },
      { n: 'e', text: 'C\'est la **trempe**. Elle fige la composition du système pendant le titrage : sans elle, la réaction continuerait d\'évoluer et la valeur mesurée ne correspondrait plus à la date voulue. L\'**état final n\'est pas modifié** : la température est un facteur cinétique, elle n\'agit que sur la durée.' },
    ],
    result: '$k_{40}/k_{20}=4{,}0$ · reste $12{,}5\\,\\%$ à $20\\,°\\text{C}$ contre $\\approx 0{,}02\\,\\%$ à $40\\,°\\text{C}$ · trempe : fige la composition, état final inchangé.',
  },
};
