import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const ONDES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Une onde mécanique transporte…',
    options: [
      { label: 'a', text: 'de la matière' },
      { label: 'b', text: 'de l\'énergie, sans matière' },
      { label: 'c', text: 'ni matière ni énergie' },
      { label: 'd', text: 'de la matière, sans énergie' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Une onde sonore est…',
    options: [
      { label: 'a', text: 'transversale' },
      { label: 'b', text: 'longitudinale' },
      { label: 'c', text: 'électromagnétique' },
      { label: 'd', text: 'lumineuse' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La célérité d\'une onde dépend…',
    options: [
      { label: 'a', text: 'de la fréquence' },
      { label: 'b', text: 'du milieu' },
      { label: 'c', text: 'de l\'amplitude' },
      { label: 'd', text: 'de la durée' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'La fréquence vaut…',
    options: [
      { label: 'a', text: '$f=\\dfrac{1}{T}$' },
      { label: 'b', text: '$f=T$' },
      { label: 'c', text: '$f=vT$' },
      { label: 'd', text: '$f=\\lambda T$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'La longueur d\'onde vaut…',
    options: [
      { label: 'a', text: '$\\lambda=\\dfrac{v}{T}$' },
      { label: 'b', text: '$\\lambda=v\\,T$' },
      { label: 'c', text: '$\\lambda=\\dfrac{T}{v}$' },
      { label: 'd', text: '$\\lambda=v+T$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'En changeant de milieu, la fréquence d\'une onde…',
    options: [
      { label: 'a', text: 'change' },
      { label: 'b', text: 'ne change pas' },
      { label: 'c', text: 's\'annule' },
      { label: 'd', text: 'double' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Le retard entre deux points vaut…',
    options: [
      { label: 'a', text: '$\\tau=v\\,d$' },
      { label: 'b', text: '$\\tau=\\dfrac{d}{v}$' },
      { label: 'c', text: '$\\tau=\\dfrac{v}{d}$' },
      { label: 'd', text: '$\\tau=v+d$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Le son ne se propage pas…',
    options: [
      { label: 'a', text: 'dans l\'eau' },
      { label: 'b', text: 'dans l\'air' },
      { label: 'c', text: 'dans le vide' },
      { label: 'd', text: 'dans les solides' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: 'Pour un écho, la distance à l\'obstacle vaut…',
    options: [
      { label: 'a', text: '$d=v\\,\\Delta t$' },
      { label: 'b', text: '$d=\\dfrac{v\\,\\Delta t}{2}$' },
      { label: 'c', text: '$d=2v\\,\\Delta t$' },
      { label: 'd', text: '$d=\\dfrac{\\Delta t}{v}$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Un ultrason a une fréquence…',
    options: [
      { label: 'a', text: 'inférieure à $20\\,\\text{Hz}$' },
      { label: 'b', text: 'supérieure à $20\\,\\text{kHz}$' },
      { label: 'c', text: 'égale à $440\\,\\text{Hz}$' },
      { label: 'd', text: 'nulle' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const ONDES_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'ondes-1',
    context: 'Une onde est **transversale** si l\'oscillation est perpendiculaire à la propagation, **longitudinale** si elle lui est parallèle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Classer en ondes transversales ou longitudinales : le son, une vague à la surface de l\'eau, une onde sur une corde, une onde le long d\'un ressort comprimé.' },
      ],
    }],
  },
  {
    id: 'ondes-2',
    context: 'Une onde progressive propage une perturbation de proche en proche.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une onde mécanique transporte-t-elle de la matière ? de l\'énergie ? Illustrer avec un bouchon flottant au passage d\'une vague.' },
      ],
    }],
  },
  {
    id: 'ondes-3',
    context: 'Relation période-fréquence : $f=\\dfrac{1}{T}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une onde a une période $T=4{,}0\\,\\text{ms}$. Calculer sa fréquence.' },
      ],
    }],
  },
  {
    id: 'ondes-4',
    context: 'Relation fondamentale : $\\lambda=\\dfrac{v}{f}$, avec $v_{\\text{air}}\\approx 340\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un son de fréquence $680\\,\\text{Hz}$ se propage dans l\'air. Calculer sa longueur d\'onde.' },
      ],
    }],
  },
  {
    id: 'ondes-5',
    context: 'Longueur d\'onde : $\\lambda=\\dfrac{v}{f}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une onde se propage sur une corde à $v=15\\,\\text{m·s}^{-1}$, à la fréquence $f=25\\,\\text{Hz}$. Calculer sa longueur d\'onde.' },
      ],
    }],
  },
  {
    id: 'ondes-6',
    context: 'La lumière de l\'éclair est quasi instantanée ; le son voyage à $v_{\\text{air}}\\approx 340\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On entend le tonnerre $6{,}0\\,\\text{s}$ après avoir vu l\'éclair. À quelle distance se trouve l\'orage ?' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'ondes-7',
    context: 'La célérité est une propriété du milieu de propagation.',
    parts: [{
      questions: [
        { n: 'a', text: 'La célérité d\'une onde dépend-elle de la fréquence imposée par la source ? du milieu de propagation ? Justifier.' },
      ],
    }],
  },
  {
    id: 'ondes-8',
    context: 'L\'oreille humaine perçoit les fréquences entre $20\\,\\text{Hz}$ et $20\\,\\text{kHz}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Sur un enregistrement, un son a une période $T=2{,}5\\,\\text{ms}$. Déterminer sa fréquence et préciser s\'il est audible.' },
      ],
    }],
  },
  {
    id: 'ondes-9',
    context: 'Célérité à partir de $\\lambda$ et $T$ : $v=\\dfrac{\\lambda}{T}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une houle a une longueur d\'onde $\\lambda=8{,}0\\,\\text{m}$ et une période $T=4{,}0\\,\\text{s}$. Calculer sa célérité.' },
      ],
    }],
  },
  {
    id: 'ondes-10',
    context: 'Attention aux unités : convertir en SI avant de calculer.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une onde de longueur d\'onde $\\lambda=1{,}5\\,\\text{m}$ a une période $T=5{,}0\\,\\text{ms}$. Calculer sa célérité.' },
      ],
    }],
  },
  {
    id: 'ondes-11',
    context: 'Retard : $\\tau=\\dfrac{d}{v}$, avec $v_{\\text{air}}\\approx 340\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Deux microphones sont alignés avec une source sonore, distants de $1{,}7\\,\\text{m}$. Calculer le retard entre les deux signaux reçus.' },
      ],
    }],
  },
  {
    id: 'ondes-12',
    context: 'Écho : l\'onde parcourt l\'aller-retour, donc $d=\\dfrac{v\\,\\Delta t}{2}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un cri se réfléchit sur une falaise ; l\'écho revient après $1{,}2\\,\\text{s}$. Calculer la distance à la falaise.' },
      ],
    }],
  },
  {
    id: 'ondes-13',
    context: 'Sonar : $d=\\dfrac{v\\,\\Delta t}{2}$, avec $v_{\\text{eau}}\\approx 1500\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un sonar émet un ultrason dans l\'eau ; l\'écho du fond revient après $0{,}080\\,\\text{s}$. Calculer la profondeur.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'ondes-14',
    context: 'Deux points sont en **phase** si $d=k\\lambda$, en **opposition de phase** si $d=(k+\\tfrac{1}{2})\\lambda$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Sur une corde, une onde progresse à $v=12\\,\\text{m·s}^{-1}$, imposée à $f=8{,}0\\,\\text{Hz}$. Deux points sont distants de $0{,}75\\,\\text{m}$. Calculer le retard, puis dire s\'ils sont en phase ou en opposition de phase.' },
      ],
    }],
  },
  {
    id: 'ondes-15',
    context: 'Échographie : $d=\\dfrac{v\\,\\Delta t}{2}$, avec $v\\approx 1540\\,\\text{m·s}^{-1}$ dans les tissus.',
    parts: [{
      questions: [
        { n: 'a', text: 'En échographie, un ultrason se propage à $1540\\,\\text{m·s}^{-1}$ dans les tissus. L\'écho d\'un organe revient $40\\,\\mu\\text{s}$ après l\'émission. À quelle profondeur se trouve l\'organe ?' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'ondes-16',
    context: 'Un navire équipé d\'un sonar ($v=1500\\,\\text{m·s}^{-1}$ dans l\'eau) sonde les fonds.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi la distance parcourue par l\'onde est le double de la profondeur.' },
        { n: 'b', text: 'L\'écho du fond revient après $0{,}12\\,\\text{s}$. Calculer la profondeur.' },
        { n: 'c', text: 'À un autre endroit, l\'écho revient après $0{,}20\\,\\text{s}$. Le fond est-il plus profond ? De combien ?' },
      ],
    }],
  },
  {
    id: 'ondes-17',
    context: 'Une onde progressive sinusoïdale se propage sur une corde à $v=12\\,\\text{m·s}^{-1}$, imposée par un vibreur de fréquence $f=8{,}0\\,\\text{Hz}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la période $T$.' },
        { n: 'b', text: 'Calculer la longueur d\'onde $\\lambda$.' },
        { n: 'c', text: 'Deux points de la corde sont distants de $d=0{,}75\\,\\text{m}$. Calculer le retard de l\'un sur l\'autre, puis indiquer s\'ils vibrent en phase ou en opposition de phase.' },
      ],
    }],
  },
  {
    id: 'ondes-18',
    context: 'Lors d\'un orage, on voit l\'éclair puis on entend le tonnerre plus tard (la lumière est considérée comme instantanée).',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier ce décalage entre lumière et son.' },
        { n: 'b', text: 'Le tonnerre arrive $4{,}5\\,\\text{s}$ après l\'éclair. Calculer la distance de l\'orage.' },
        { n: 'c', text: 'Au coup de tonnerre suivant, le décalage n\'est plus que de $3{,}0\\,\\text{s}$. L\'orage se rapproche-t-il ? Calculer la nouvelle distance.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const ONDES_CORRECTIONS: Record<string, Correction> = {
  'ondes-1': {
    steps: [
      { n: '1', text: '**Longitudinales** : le son, l\'onde le long d\'un ressort comprimé (oscillation parallèle à la propagation).' },
      { n: '2', text: '**Transversales** : la vague à la surface de l\'eau, l\'onde sur une corde (oscillation perpendiculaire à la propagation).' },
    ],
    result: 'Longitudinales : son, ressort. Transversales : vague, corde.',
  },
  'ondes-2': {
    steps: [
      { n: '1', text: 'L\'onde transporte de l\'**énergie**, mais **pas de matière**.' },
      { n: '2', text: 'Le bouchon monte et descend sur place au passage de la vague sans être emporté : la matière oscille, seule la perturbation (et son énergie) se propage.' },
    ],
    result: 'Transport d\'énergie, pas de matière (le milieu oscille sur place).',
  },
  'ondes-3': {
    steps: [
      { n: '1', text: '$f=\\dfrac{1}{T}=\\dfrac{1}{4{,}0\\times 10^{-3}}=2{,}5\\times 10^{2}\\,\\text{Hz}=250\\,\\text{Hz}$.' },
    ],
    result: '$f=250\\,\\text{Hz}$.',
  },
  'ondes-4': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{v}{f}=\\dfrac{340}{680}=0{,}50\\,\\text{m}$.' },
    ],
    result: '$\\lambda=0{,}50\\,\\text{m}$.',
  },
  'ondes-5': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{v}{f}=\\dfrac{15}{25}=0{,}60\\,\\text{m}$.' },
    ],
    result: '$\\lambda=0{,}60\\,\\text{m}$.',
  },
  'ondes-6': {
    steps: [
      { n: '1', text: '$d=v\\,\\tau=340\\times 6{,}0\\approx 2{,}0\\times 10^{3}\\,\\text{m}=2{,}0\\,\\text{km}$.' },
    ],
    result: '$d\\approx 2{,}0\\,\\text{km}$.',
  },
  'ondes-7': {
    steps: [
      { n: '1', text: 'La célérité dépend du **milieu** (nature, température…), **pas** de la fréquence imposée par la source.' },
      { n: '2', text: 'Modifier la fréquence ne change pas $v$ ; changer de milieu, oui.' },
    ],
    result: 'Dépend du milieu, pas de la source (ni de la fréquence).',
  },
  'ondes-8': {
    steps: [
      { n: '1', text: '$f=\\dfrac{1}{T}=\\dfrac{1}{2{,}5\\times 10^{-3}}=400\\,\\text{Hz}$.' },
      { n: '2', text: 'Compris entre $20\\,\\text{Hz}$ et $20\\,\\text{kHz}$ : le son est **audible**.' },
    ],
    result: '$f=400\\,\\text{Hz}$ (audible).',
  },
  'ondes-9': {
    steps: [
      { n: '1', text: '$v=\\dfrac{\\lambda}{T}=\\dfrac{8{,}0}{4{,}0}=2{,}0\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v=2{,}0\\,\\text{m·s}^{-1}$.',
  },
  'ondes-10': {
    steps: [
      { n: '1', text: '$v=\\dfrac{\\lambda}{T}=\\dfrac{1{,}5}{5{,}0\\times 10^{-3}}=3{,}0\\times 10^{2}\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v=300\\,\\text{m·s}^{-1}$.',
  },
  'ondes-11': {
    steps: [
      { n: '1', text: '$\\tau=\\dfrac{d}{v}=\\dfrac{1{,}7}{340}=5{,}0\\times 10^{-3}\\,\\text{s}=5{,}0\\,\\text{ms}$.' },
    ],
    result: '$\\tau=5{,}0\\,\\text{ms}$.',
  },
  'ondes-12': {
    steps: [
      { n: '1', text: 'Aller-retour : $d=\\dfrac{v\\,\\Delta t}{2}=\\dfrac{340\\times 1{,}2}{2}\\approx 2{,}0\\times 10^{2}\\,\\text{m}$ (soit $204\\,\\text{m}$).' },
    ],
    result: '$d\\approx 204\\,\\text{m}$.',
  },
  'ondes-13': {
    steps: [
      { n: '1', text: '$d=\\dfrac{v\\,\\Delta t}{2}=\\dfrac{1500\\times 0{,}080}{2}=60\\,\\text{m}$.' },
    ],
    result: 'Profondeur $=60\\,\\text{m}$.',
  },
  'ondes-14': {
    steps: [
      { n: '1', text: 'Retard : $\\tau=\\dfrac{d}{v}=\\dfrac{0{,}75}{12}=6{,}25\\times 10^{-2}\\,\\text{s}$.' },
      { n: '2', text: '$\\lambda=\\dfrac{v}{f}=\\dfrac{12}{8{,}0}=1{,}5\\,\\text{m}$, et $d=0{,}75=\\dfrac{\\lambda}{2}$ : les deux points sont en **opposition de phase** (le retard vaut $T/2=0{,}0625\\,\\text{s}$).' },
    ],
    result: '$\\tau=0{,}0625\\,\\text{s}$ · opposition de phase.',
  },
  'ondes-15': {
    steps: [
      { n: '1', text: '$d=\\dfrac{v\\,\\Delta t}{2}=\\dfrac{1540\\times 40\\times 10^{-6}}{2}\\approx 3{,}1\\times 10^{-2}\\,\\text{m}=3{,}1\\,\\text{cm}$.' },
    ],
    result: '$d\\approx 3{,}1\\,\\text{cm}$.',
  },
  'ondes-16': {
    steps: [
      { n: 'a', text: 'L\'onde effectue l\'aller (jusqu\'au fond) puis le retour (jusqu\'au sonar) : elle parcourt donc $2\\times$ la profondeur.' },
      { n: 'b', text: '$d=\\dfrac{v\\,\\Delta t}{2}=\\dfrac{1500\\times 0{,}12}{2}=90\\,\\text{m}$.' },
      { n: 'c', text: '$d\'=\\dfrac{1500\\times 0{,}20}{2}=150\\,\\text{m}$ : le fond est plus profond de $150-90=60\\,\\text{m}$.' },
    ],
    result: '$90\\,\\text{m}$ puis $150\\,\\text{m}$ ($+60\\,\\text{m}$).',
  },
  'ondes-17': {
    steps: [
      { n: 'a', text: '$T=\\dfrac{1}{f}=\\dfrac{1}{8{,}0}=0{,}125\\,\\text{s}$.' },
      { n: 'b', text: '$\\lambda=v\\,T=12\\times 0{,}125=1{,}5\\,\\text{m}$ (ou $\\lambda=v/f$).' },
      { n: 'c', text: '$\\tau=\\dfrac{d}{v}=\\dfrac{0{,}75}{12}=0{,}0625\\,\\text{s}$. Comme $d=0{,}75\\,\\text{m}=\\dfrac{\\lambda}{2}$ (et $\\tau=T/2$), les deux points vibrent en **opposition de phase**.' },
    ],
    result: '$T=0{,}125\\,\\text{s}$ ; $\\lambda=1{,}5\\,\\text{m}$ · opposition de phase.',
  },
  'ondes-18': {
    steps: [
      { n: 'a', text: 'La lumière se propage à $\\approx 3\\times 10^{8}\\,\\text{m·s}^{-1}$ : elle parvient quasi instantanément. Le son, bien plus lent ($340\\,\\text{m·s}^{-1}$), arrive avec retard — d\'où le décalage.' },
      { n: 'b', text: '$d=v\\,\\tau=340\\times 4{,}5\\approx 1{,}5\\times 10^{3}\\,\\text{m}=1{,}5\\,\\text{km}$.' },
      { n: 'c', text: 'Le décalage a diminué ($3{,}0<4{,}5$) : l\'orage **se rapproche**. $d\'=340\\times 3{,}0\\approx 1{,}0\\times 10^{3}\\,\\text{m}=1{,}0\\,\\text{km}$.' },
    ],
    result: '$d\\approx 1{,}5\\,\\text{km}\\rightarrow d\'\\approx 1{,}0\\,\\text{km}$ (se rapproche).',
  },
};
