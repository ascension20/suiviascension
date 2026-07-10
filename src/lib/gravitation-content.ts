import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const GRAVITATION_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La force de gravitation entre deux masses varie comme…',
    options: [
      { label: 'a', text: '$d$' },
      { label: 'b', text: '$\\dfrac{1}{d}$' },
      { label: 'c', text: '$\\dfrac{1}{d^2}$ (loi en carré inverse)' },
      { label: 'd', text: '$d^2$' },
    ],
    answer: 'c',
  },
  {
    n: 2,
    text: 'Le champ de gravitation $\\mathcal{G}$ s\'exprime en…',
    options: [
      { label: 'a', text: '$\\text{N}$' },
      { label: 'b', text: '$\\text{N·kg}^{-1}$' },
      { label: 'c', text: '$\\text{m·s}^{-1}$' },
      { label: 'd', text: '$\\text{kg}$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La vitesse d\'un satellite en orbite circulaire vaut…',
    options: [
      { label: 'a', text: '$\\sqrt{\\dfrac{GM}{r}}$' },
      { label: 'b', text: '$\\dfrac{GM}{r}$' },
      { label: 'c', text: '$\\sqrt{GMr}$' },
      { label: 'd', text: '$\\dfrac{GM}{r^2}$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'La vitesse d\'un satellite en orbite circulaire dépend de…',
    options: [
      { label: 'a', text: 'sa masse' },
      { label: 'b', text: 'le rayon de l\'orbite (et de $M$), pas de sa masse' },
      { label: 'c', text: 'sa masse et le rayon' },
      { label: 'd', text: 'rien' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La 3ᵉ loi de Kepler s\'écrit…',
    options: [
      { label: 'a', text: '$\\dfrac{T}{r}=\\text{cste}$' },
      { label: 'b', text: '$\\dfrac{T^2}{r^3}=\\text{cste}$' },
      { label: 'c', text: '$\\dfrac{T^3}{r^2}=\\text{cste}$' },
      { label: 'd', text: '$Tr=\\text{cste}$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Un satellite géostationnaire a une période de…',
    options: [
      { label: 'a', text: '$1\\,\\text{h}$' },
      { label: 'b', text: '$\\approx 24\\,\\text{h}$ (période de rotation de la Terre)' },
      { label: 'c', text: '$1\\,\\text{an}$' },
      { label: 'd', text: '$92\\,\\text{min}$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Dans un mouvement circulaire uniforme, l\'accélération est…',
    options: [
      { label: 'a', text: 'nulle' },
      { label: 'b', text: 'tangente' },
      { label: 'c', text: 'centripète (dirigée vers le centre)' },
      { label: 'd', text: 'centrifuge' },
    ],
    answer: 'c',
  },
  {
    n: 8,
    text: 'À la surface d\'un astre, $g$ vaut…',
    options: [
      { label: 'a', text: '$G\\dfrac{M}{R}$' },
      { label: 'b', text: '$G\\dfrac{M}{R^2}$' },
      { label: 'c', text: '$G\\dfrac{M^2}{R}$' },
      { label: 'd', text: '$\\dfrac{GM}{R^3}$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'D\'après Kepler, une planète décrit…',
    options: [
      { label: 'a', text: 'un cercle centré sur le Soleil' },
      { label: 'b', text: 'une ellipse dont le Soleil est un foyer' },
      { label: 'c', text: 'une droite' },
      { label: 'd', text: 'une parabole' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La masse d\'un astre central se calcule par…',
    options: [
      { label: 'a', text: '$M=\\dfrac{4\\pi^2 r^3}{GT^2}$' },
      { label: 'b', text: '$M=\\dfrac{GT^2}{4\\pi^2 r^3}$' },
      { label: 'c', text: '$M=\\dfrac{4\\pi^2 r^2}{GT^3}$' },
      { label: 'd', text: '$M=GTr$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const GRAVITATION_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'gravitation-1',
    context: 'Données : $G=6{,}67\\times 10^{-11}\\,\\text{N·m}^2\\text{·kg}^{-2}$, $m_T=5{,}97\\times 10^{24}\\,\\text{kg}$, $M_{\\text{Soleil}}=1{,}99\\times 10^{30}\\,\\text{kg}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la force gravitationnelle exercée par le Soleil sur la Terre, sachant que la distance Terre-Soleil vaut $d=1{,}50\\times 10^{11}\\,\\text{m}$.' },
      ],
    }],
  },
  {
    id: 'gravitation-2',
    context: 'On considère deux personnes de $70\\,\\text{kg}$ séparées de $1{,}0\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la force gravitationnelle entre ces deux personnes.' },
        { n: 'b', text: 'Commenter le résultat.' },
      ],
    }],
  },
  {
    id: 'gravitation-3',
    context: 'On s\'intéresse aux forces $\\vec{F}_{T/L}$ et $\\vec{F}_{L/T}$ entre la Terre et la Lune.',
    parts: [{
      questions: [
        { n: 'a', text: 'Représenter, sur un schéma, les forces $\\vec{F}_{T/L}$ et $\\vec{F}_{L/T}$.' },
        { n: 'b', text: 'Que peut-on dire de leurs valeurs ? Justifier à l\'aide d\'une loi de Newton.' },
      ],
    }],
  },
  {
    id: 'gravitation-4',
    context: 'Le champ de gravitation à la surface d\'un astre vaut $g=G\\dfrac{M}{R^2}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'intensité de pesanteur $g_M$ à la surface de Mars ($M_M=6{,}42\\times 10^{23}\\,\\text{kg}$, $R_M=3{,}39\\times 10^{6}\\,\\text{m}$).' },
      ],
    }],
  },
  {
    id: 'gravitation-5',
    context: 'La vitesse d\'un satellite en orbite circulaire de rayon $r$ autour de la Terre vaut $v=\\sqrt{\\dfrac{Gm_T}{r}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un satellite décrit une orbite circulaire de rayon $r=2{,}0\\times 10^{7}\\,\\text{m}$ autour de la Terre. Calculer sa vitesse.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'gravitation-6',
    context: 'On étudie le champ de gravitation terrestre en altitude ($R_T=6{,}37\\times 10^{6}\\,\\text{m}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la valeur du champ de gravitation terrestre à une altitude $h=400\\,\\text{km}$.' },
        { n: 'b', text: 'Comparer à sa valeur au sol ($g\\approx 9{,}8\\,\\text{N·kg}^{-1}$).' },
      ],
    }],
  },
  {
    id: 'gravitation-7',
    context: 'Un astronaute de masse $80\\,\\text{kg}$ se pose sur la Lune ($g_{\\text{Lune}}=1{,}62\\,\\text{N·kg}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer son poids sur la Lune, puis sur Terre.' },
        { n: 'b', text: 'Sa masse a-t-elle changé ?' },
      ],
    }],
  },
  {
    id: 'gravitation-8',
    context: 'On reprend le satellite de rayon d\'orbite $r=2{,}0\\times 10^{7}\\,\\text{m}$ (vitesse $v\\approx 4{,}5\\,\\text{km·s}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la période de révolution $T$ de ce satellite (en heures).' },
      ],
    }],
  },
  {
    id: 'gravitation-9',
    context: 'La Lune décrit autour de la Terre une orbite quasi circulaire de rayon $r=3{,}84\\times 10^{8}\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer sa vitesse orbitale.' },
      ],
    }],
  },
  {
    id: 'gravitation-10',
    context: 'Une comète décrit une orbite très allongée autour du Soleil.',
    parts: [{
      questions: [
        { n: 'a', text: 'Où sa vitesse est-elle maximale ? minimale ?' },
        { n: 'b', text: 'Justifier par la 2ᵉ loi de Kepler.' },
      ],
    }],
  },
  {
    id: 'gravitation-11',
    context: 'La 3ᵉ loi de Kepler donne $\\dfrac{T^2}{r^3}=\\dfrac{4\\pi^2}{Gm_T}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la constante $\\dfrac{T^2}{r^3}$ pour les satellites terrestres.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'gravitation-12',
    context: 'Deux satellites A et B orbitent autour de la Terre, avec $r_B=2\\,r_A$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Exprimer le rapport $\\dfrac{T_B}{T_A}$ de leurs périodes.' },
      ],
    }],
  },
  {
    id: 'gravitation-13',
    context: 'Un satellite géostationnaire a une période $T=86\\,164\\,\\text{s}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer le rayon $r$ de l\'orbite d\'un satellite géostationnaire.' },
        { n: 'b', text: 'En déduire son altitude.' },
      ],
    }],
  },
  {
    id: 'gravitation-14',
    context: 'La lune Io orbite autour de Jupiter avec un rayon $r=4{,}22\\times 10^{8}\\,\\text{m}$ et une période $T=1{,}77\\,\\text{jours}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'En déduire la masse de Jupiter.' },
      ],
    }],
  },
  {
    id: 'gravitation-15',
    context: 'On établit la vitesse d\'un satellite par la 2ᵉ loi de Newton.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que la seule force gravitationnelle impose une accélération centripète $a=\\dfrac{v^2}{r}$.' },
        { n: 'b', text: 'En déduire l\'expression $v=\\sqrt{\\dfrac{Gm_T}{r}}$ et justifier que la vitesse est indépendante de la masse du satellite.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'gravitation-16',
    context: 'Un satellite d\'observation évolue sur une orbite circulaire à l\'altitude $h=800\\,\\text{km}$. ($R_T=6{,}37\\times 10^{6}\\,\\text{m}$, $m_T=5{,}97\\times 10^{24}\\,\\text{kg}$.)',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le rayon $r$ de l\'orbite.' },
        { n: 'b', text: 'Établir l\'expression de la vitesse $v$ et la calculer.' },
        { n: 'c', text: 'Calculer la période de révolution $T$ (en minutes).' },
        { n: 'd', text: 'Ce satellite est-il géostationnaire ? Justifier.' },
      ],
    }],
  },
  {
    id: 'gravitation-17',
    context: 'On observe la lune Io de Jupiter : orbite circulaire de rayon $r=4{,}22\\times 10^{8}\\,\\text{m}$, période $T=1{,}77\\,\\text{jours}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Rappeler la 3ᵉ loi de Kepler dans le cas circulaire.' },
        { n: 'b', text: 'En déduire l\'expression puis la valeur de la masse de Jupiter.' },
        { n: 'c', text: 'Comparer à la valeur tabulée $M_J=1{,}90\\times 10^{27}\\,\\text{kg}$.' },
      ],
    }],
  },
  {
    id: 'gravitation-18',
    context: 'On donne pour la Terre : demi-grand axe $a_T=1{,}50\\times 10^{11}\\,\\text{m}$, période $T_T=1\\,\\text{an}=3{,}16\\times 10^{7}\\,\\text{s}$. Pour Mars : $a_M=2{,}28\\times 10^{11}\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\dfrac{T_T^2}{a_T^3}$.' },
        { n: 'b', text: 'En déduire la période de révolution de Mars (en jours).' },
        { n: 'c', text: 'Comparer à la valeur réelle (687 jours).' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const GRAVITATION_CORRECTIONS: Record<string, Correction> = {
  'gravitation-1': {
    steps: [
      { n: '1', text: '$F=G\\dfrac{m_T M_S}{d^2}=6{,}67\\times 10^{-11}\\times\\dfrac{5{,}97\\times 10^{24}\\times 1{,}99\\times 10^{30}}{(1{,}50\\times 10^{11})^2}$.' },
    ],
    result: '$F\\approx 3{,}5\\times 10^{22}\\,\\text{N}$.',
  },
  'gravitation-2': {
    steps: [
      { n: 'a', text: '$F=G\\dfrac{70\\times 70}{1{,}0^2}=6{,}67\\times 10^{-11}\\times 4900\\approx 3{,}3\\times 10^{-7}\\,\\text{N}$.' },
      { n: 'b', text: 'C\'est infime : l\'attraction gravitationnelle entre objets du quotidien est totalement imperceptible.' },
    ],
    result: '$F\\approx 3{,}3\\times 10^{-7}\\,\\text{N}$ — négligeable.',
  },
  'gravitation-3': {
    steps: [
      { n: 'a', text: '$\\vec{F}_{T/L}$ et $\\vec{F}_{L/T}$ sont portées par la droite Terre-Lune, dirigées l\'une vers l\'autre (attractives).' },
      { n: 'b', text: 'D\'après la 3ᵉ loi de Newton (actions réciproques), elles ont la **même valeur** : $\\vec{F}_{T/L}=-\\vec{F}_{L/T}$.' },
    ],
    result: 'Forces opposées, de même valeur (3ᵉ loi de Newton).',
  },
  'gravitation-4': {
    steps: [
      { n: '1', text: '$g_M=G\\dfrac{M_M}{R_M^2}=6{,}67\\times 10^{-11}\\times\\dfrac{6{,}42\\times 10^{23}}{(3{,}39\\times 10^{6})^2}\\approx 3{,}7\\,\\text{N·kg}^{-1}$ (environ 2,6 fois plus faible que sur Terre).' },
    ],
    result: '$g_M\\approx 3{,}7\\,\\text{N·kg}^{-1}$.',
  },
  'gravitation-5': {
    steps: [
      { n: '1', text: '$v=\\sqrt{\\dfrac{Gm_T}{r}}=\\sqrt{\\dfrac{6{,}67\\times 10^{-11}\\times 5{,}97\\times 10^{24}}{2{,}0\\times 10^{7}}}\\approx 4{,}5\\times 10^{3}\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 4{,}5\\,\\text{km·s}^{-1}$.',
  },
  'gravitation-6': {
    steps: [
      { n: 'a', text: '$r=R_T+h=6{,}37\\times 10^{6}+4{,}00\\times 10^{5}=6{,}77\\times 10^{6}\\,\\text{m}$. $g(h)=G\\dfrac{m_T}{(R_T+h)^2}=6{,}67\\times 10^{-11}\\times\\dfrac{5{,}97\\times 10^{24}}{(6{,}77\\times 10^{6})^2}\\approx 8{,}7\\,\\text{N·kg}^{-1}$.' },
      { n: 'b', text: 'Au sol $g\\approx 9{,}8\\,\\text{N·kg}^{-1}$ : l\'altitude diminue le champ.' },
    ],
    result: '$g(400\\,\\text{km})\\approx 8{,}7\\,\\text{N·kg}^{-1}$.',
  },
  'gravitation-7': {
    steps: [
      { n: 'a', text: 'Sur la Lune : $P_L=m\\,g_L=80\\times 1{,}62\\approx 1{,}3\\times 10^{2}\\,\\text{N}$. Sur Terre : $P_T=80\\times 9{,}81\\approx 7{,}8\\times 10^{2}\\,\\text{N}$.' },
      { n: 'b', text: 'La masse (80 kg) est **inchangée** : seul le poids dépend de l\'astre.' },
    ],
    result: '$P_L\\approx 130\\,\\text{N}$ ; $P_T\\approx 785\\,\\text{N}$ ; masse inchangée.',
  },
  'gravitation-8': {
    steps: [
      { n: '1', text: '$T=2\\pi\\sqrt{\\dfrac{r^3}{Gm_T}}=\\dfrac{2\\pi r}{v}\\approx\\dfrac{2\\pi\\times 2{,}0\\times 10^{7}}{4{,}5\\times 10^{3}}\\approx 2{,}8\\times 10^{4}\\,\\text{s}\\approx 7{,}8\\,\\text{h}$.' },
    ],
    result: '$T\\approx 7{,}8\\,\\text{h}$.',
  },
  'gravitation-9': {
    steps: [
      { n: '1', text: '$v=\\sqrt{\\dfrac{Gm_T}{r}}=\\sqrt{\\dfrac{6{,}67\\times 10^{-11}\\times 5{,}97\\times 10^{24}}{3{,}84\\times 10^{8}}}\\approx 1{,}0\\times 10^{3}\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 1{,}0\\,\\text{km·s}^{-1}$.',
  },
  'gravitation-10': {
    steps: [
      { n: 'a', text: 'La vitesse est **maximale au périhélie** (au plus près du Soleil) et **minimale à l\'aphélie** (au plus loin).' },
      { n: 'b', text: 'D\'après la loi des aires, pour balayer des aires égales en des durées égales, la comète doit aller plus vite lorsque le rayon est court.' },
    ],
    result: '$v$ max au périhélie, min à l\'aphélie (loi des aires).',
  },
  'gravitation-11': {
    steps: [
      { n: '1', text: '$\\dfrac{T^2}{r^3}=\\dfrac{4\\pi^2}{Gm_T}=\\dfrac{4\\pi^2}{6{,}67\\times 10^{-11}\\times 5{,}97\\times 10^{24}}\\approx 9{,}9\\times 10^{-14}\\,\\text{s}^2\\text{·m}^{-3}$.' },
    ],
    result: '$\\dfrac{T^2}{r^3}\\approx 9{,}9\\times 10^{-14}\\,\\text{SI}$.',
  },
  'gravitation-12': {
    steps: [
      { n: '1', text: 'Comme $T=2\\pi\\sqrt{\\dfrac{r^3}{GM}}$, on a $T\\propto r^{3/2}$.' },
      { n: '2', text: 'Donc $\\dfrac{T_B}{T_A}=\\left(\\dfrac{r_B}{r_A}\\right)^{3/2}=2^{3/2}=2\\sqrt{2}\\approx 2{,}8$.' },
    ],
    result: '$\\dfrac{T_B}{T_A}=2\\sqrt{2}\\approx 2{,}8$.',
  },
  'gravitation-13': {
    steps: [
      { n: 'a', text: 'On isole $r$ dans la 3ᵉ loi : $r=\\left(\\dfrac{Gm_T T^2}{4\\pi^2}\\right)^{1/3}=\\left(\\dfrac{6{,}67\\times 10^{-11}\\times 5{,}97\\times 10^{24}\\times(86\\,164)^2}{4\\pi^2}\\right)^{1/3}\\approx 4{,}22\\times 10^{7}\\,\\text{m}$.' },
      { n: 'b', text: 'Altitude : $h=r-R_T\\approx 4{,}22\\times 10^{7}-6{,}37\\times 10^{6}\\approx 3{,}58\\times 10^{7}\\,\\text{m}\\approx 35\\,800\\,\\text{km}$.' },
    ],
    result: '$r\\approx 4{,}22\\times 10^{7}\\,\\text{m}$ ; $h\\approx 35\\,800\\,\\text{km}$.',
  },
  'gravitation-14': {
    steps: [
      { n: '1', text: '$M_J=\\dfrac{4\\pi^2 r^3}{GT^2}$, avec $T=1{,}77\\times 86\\,400\\approx 1{,}53\\times 10^{5}\\,\\text{s}$ :' },
      { n: '2', text: '$M_J=\\dfrac{4\\pi^2\\times(4{,}22\\times 10^{8})^3}{6{,}67\\times 10^{-11}\\times(1{,}53\\times 10^{5})^2}\\approx 1{,}9\\times 10^{27}\\,\\text{kg}$.' },
    ],
    result: '$M_J\\approx 1{,}9\\times 10^{27}\\,\\text{kg}$.',
  },
  'gravitation-15': {
    steps: [
      { n: 'a', text: 'La seule force est $\\vec{F}=m\\vec{\\mathcal{G}}$, dirigée vers le centre. La 2ᵉ loi de Newton donne $\\vec{F}=m\\vec{a}$, donc $\\vec{a}=\\vec{\\mathcal{G}}$ : l\'accélération est **centripète**. Pour un mouvement circulaire uniforme, $a=\\dfrac{v^2}{r}$. En projetant sur l\'axe radial : $\\dfrac{v^2}{r}=G\\dfrac{m_T}{r^2}$.' },
      { n: 'b', text: 'On en déduit $v=\\sqrt{\\dfrac{Gm_T}{r}}$ : la masse $m$ du satellite s\'est simplifiée, la vitesse n\'en dépend donc pas (elle ne dépend que de $M$ et de $r$).' },
    ],
    result: '$v=\\sqrt{\\dfrac{Gm_T}{r}}$, indépendante de la masse du satellite.',
  },
  'gravitation-16': {
    steps: [
      { n: 'a', text: '$r=R_T+h=6{,}37\\times 10^{6}+8{,}00\\times 10^{5}=7{,}17\\times 10^{6}\\,\\text{m}$.' },
      { n: 'b', text: 'La 2ᵉ loi de Newton donne $\\dfrac{v^2}{r}=G\\dfrac{m_T}{r^2}$, d\'où $v=\\sqrt{\\dfrac{Gm_T}{r}}=\\sqrt{\\dfrac{6{,}67\\times 10^{-11}\\times 5{,}97\\times 10^{24}}{7{,}17\\times 10^{6}}}\\approx 7{,}5\\times 10^{3}\\,\\text{m·s}^{-1}$.' },
      { n: 'c', text: '$T=\\dfrac{2\\pi r}{v}=\\dfrac{2\\pi\\times 7{,}17\\times 10^{6}}{7{,}5\\times 10^{3}}\\approx 6{,}0\\times 10^{3}\\,\\text{s}\\approx 1{,}0\\times 10^{2}\\,\\text{min}$.' },
      { n: 'd', text: 'Non : $T\\approx 101\\,\\text{min}$, très inférieure aux $24\\,\\text{h}$ ($=1440\\,\\text{min}$) d\'un satellite géostationnaire.' },
    ],
    result: '$r=7{,}17\\times 10^{6}\\,\\text{m}$ ; $v\\approx 7{,}5\\,\\text{km·s}^{-1}$ ; $T\\approx 101\\,\\text{min}$ ; non géostationnaire.',
  },
  'gravitation-17': {
    steps: [
      { n: 'a', text: '3ᵉ loi (cas circulaire) : $\\dfrac{T^2}{r^3}=\\dfrac{4\\pi^2}{GM_J}$.' },
      { n: 'b', text: 'On isole $M_J=\\dfrac{4\\pi^2 r^3}{GT^2}$, avec $T=1{,}77\\times 86\\,400\\approx 1{,}53\\times 10^{5}\\,\\text{s}$ : $M_J=\\dfrac{4\\pi^2\\times(4{,}22\\times 10^{8})^3}{6{,}67\\times 10^{-11}\\times(1{,}53\\times 10^{5})^2}\\approx 1{,}9\\times 10^{27}\\,\\text{kg}$.' },
      { n: 'c', text: 'Excellent accord avec la valeur tabulée $1{,}90\\times 10^{27}\\,\\text{kg}$, ce qui valide la méthode.' },
    ],
    result: '$M_J\\approx 1{,}9\\times 10^{27}\\,\\text{kg}$.',
  },
  'gravitation-18': {
    steps: [
      { n: 'a', text: '$\\dfrac{T_T^2}{a_T^3}=\\dfrac{(3{,}16\\times 10^{7})^2}{(1{,}50\\times 10^{11})^3}\\approx 3{,}0\\times 10^{-19}\\,\\text{s}^2\\text{·m}^{-3}$.' },
      { n: 'b', text: 'La constante étant la même pour toutes les planètes : $T_M=T_T\\left(\\dfrac{a_M}{a_T}\\right)^{3/2}=3{,}16\\times 10^{7}\\times\\left(\\dfrac{2{,}28}{1{,}50}\\right)^{3/2}\\approx 5{,}9\\times 10^{7}\\,\\text{s}\\approx 685\\,\\text{jours}$.' },
      { n: 'c', text: 'Très bon accord avec la valeur réelle de 687 jours (écart < 0,5 %).' },
    ],
    result: '$T_M\\approx 685\\,\\text{jours}$.',
  },
};
