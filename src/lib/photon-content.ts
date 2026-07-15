import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const PHOTON_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'L\'énergie d\'un photon vaut…',
    options: [
      { label: 'a', text: '$E=h\\nu$' },
      { label: 'b', text: '$E=\\dfrac{h}{\\nu}$' },
      { label: 'c', text: '$E=h\\lambda$' },
      { label: 'd', text: '$E=\\dfrac{\\nu}{h}$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'La constante de Planck vaut environ…',
    options: [
      { label: 'a', text: '$6{,}63\\times 10^{-34}\\,\\text{J·s}$' },
      { label: 'b', text: '$1{,}60\\times 10^{-19}\\,\\text{J·s}$' },
      { label: 'c', text: '$3{,}00\\times 10^{8}\\,\\text{J·s}$' },
      { label: 'd', text: '$9{,}81\\,\\text{J·s}$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Quand $\\lambda$ augmente, l\'énergie du photon…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 's\'annule' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$1\\,\\text{eV}$ vaut…',
    options: [
      { label: 'a', text: '$1{,}60\\times 10^{-19}\\,\\text{J}$' },
      { label: 'b', text: '$6{,}63\\times 10^{-34}\\,\\text{J}$' },
      { label: 'c', text: '$1\\,\\text{J}$' },
      { label: 'd', text: '$3{,}00\\times 10^{8}\\,\\text{J}$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'Les niveaux d\'énergie d\'un atome sont…',
    options: [
      { label: 'a', text: 'continus' },
      { label: 'b', text: 'quantifiés' },
      { label: 'c', text: 'toujours positifs' },
      { label: 'd', text: 'tous égaux' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Lors d\'une émission, l\'atome…',
    options: [
      { label: 'a', text: 'monte vers un niveau supérieur' },
      { label: 'b', text: 'descend vers un niveau inférieur' },
      { label: 'c', text: 'est ionisé' },
      { label: 'd', text: 'ne change pas de niveau' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'L\'énergie du photon échangé lors d\'une transition vaut…',
    options: [
      { label: 'a', text: '$|\\Delta E|=h\\nu$' },
      { label: 'b', text: '$|\\Delta E|=\\dfrac{h}{\\nu}$' },
      { label: 'c', text: '$|\\Delta E|=h\\lambda$' },
      { label: 'd', text: '$|\\Delta E|=\\dfrac{\\lambda}{h}$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'L\'énergie d\'ionisation de l\'hydrogène depuis $n=1$ vaut…',
    options: [
      { label: 'a', text: '$3{,}40\\,\\text{eV}$' },
      { label: 'b', text: '$13{,}6\\,\\text{eV}$' },
      { label: 'c', text: '$-13{,}6\\,\\text{eV}$' },
      { label: 'd', text: '$1{,}51\\,\\text{eV}$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Un spectre d\'absorption présente…',
    options: [
      { label: 'a', text: 'des raies colorées sur fond noir' },
      { label: 'b', text: 'des raies noires sur fond continu' },
      { label: 'c', text: 'un fond noir uniquement' },
      { label: 'd', text: 'un spectre continu sans raie' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Les raies d\'un élément constituent…',
    options: [
      { label: 'a', text: 'un hasard' },
      { label: 'b', text: 'sa signature' },
      { label: 'c', text: 'une propriété du détecteur' },
      { label: 'd', text: 'un effet Doppler' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const PHOTON_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'photon-1',
    context: 'Relation $\\nu=\\dfrac{c}{\\lambda}$, avec $c=3{,}00\\times 10^{8}\\,\\text{m·s}^{-1}$ et $1\\,\\text{nm}=10^{-9}\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la fréquence d\'un photon de longueur d\'onde $\\lambda=500\\,\\text{nm}$.' },
      ],
    }],
  },
  {
    id: 'photon-2',
    context: 'La lumière possède deux modèles complémentaires.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer un phénomène qui met en évidence le caractère ondulatoire de la lumière, et expliquer ce que décrit le modèle corpusculaire.' },
      ],
    }],
  },
  {
    id: 'photon-3',
    context: 'Relation de Planck-Einstein : $E=\\dfrac{hc}{\\lambda}$, avec $h=6{,}63\\times 10^{-34}\\,\\text{J·s}$ et $1\\,\\text{eV}=1{,}60\\times 10^{-19}\\,\\text{J}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie (en J puis en eV) d\'un photon de longueur d\'onde $\\lambda=450\\,\\text{nm}$.' },
      ],
    }],
  },
  {
    id: 'photon-4',
    context: 'Énergie d\'un photon : $E=\\dfrac{hc}{\\lambda}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie, en eV, d\'un photon de longueur d\'onde $\\lambda=600\\,\\text{nm}$.' },
      ],
    }],
  },
  {
    id: 'photon-5',
    context: 'Conversion : des joules vers les eV, diviser par $1{,}60\\times 10^{-19}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Convertir $E=4{,}0\\times 10^{-19}\\,\\text{J}$ en électronvolts.' },
      ],
    }],
  },
  {
    id: 'photon-6',
    context: 'Conversion : des eV vers les joules, multiplier par $1{,}60\\times 10^{-19}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Convertir $E=2{,}5\\,\\text{eV}$ en joules.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'photon-7',
    context: 'La lumière est un objet quantique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Que signifie l\'expression « dualité onde-particule » ? Peut-on observer les deux aspects au cours d\'une même expérience ?' },
      ],
    }],
  },
  {
    id: 'photon-8',
    context: 'Le domaine visible s\'étend de $400$ à $800\\,\\text{nm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie (en eV) d\'un photon UV de longueur d\'onde $200\\,\\text{nm}$. Comparer à celle d\'un photon visible et commenter la nocivité des UV.' },
      ],
    }],
  },
  {
    id: 'photon-9',
    context: 'De $E=\\dfrac{hc}{\\lambda}$ on tire $\\lambda=\\dfrac{hc}{E}$ (penser à convertir l\'énergie en joules).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un photon transporte une énergie de $3{,}0\\,\\text{eV}$. Calculer sa longueur d\'onde et préciser s\'il appartient au domaine visible.' },
      ],
    }],
  },
  {
    id: 'photon-10',
    context: '$\\lambda=\\dfrac{hc}{E}$, visible entre $400$ et $800\\,\\text{nm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un photon a une énergie de $1{,}55\\,\\text{eV}$. Calculer sa longueur d\'onde. À quel domaine appartient-il ?' },
      ],
    }],
  },
  {
    id: 'photon-11',
    context: 'Hydrogène : $E_n=-\\dfrac{13{,}6}{n^2}\\,\\text{eV}$. Transition : $|\\Delta E|=|E_n-E_p|$.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'atome d\'hydrogène passe du niveau $n=4$ au niveau $n=2$. Calculer $|\\Delta E|$ (en eV) puis la longueur d\'onde du photon émis. Quelle est sa couleur ?' },
      ],
    }],
  },
  {
    id: 'photon-12',
    context: 'Absorption : l\'atome monte en absorbant un photon d\'énergie $|\\Delta E|$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un atome d\'hydrogène dans son état fondamental absorbe un photon et passe au niveau $n=2$. Calculer l\'énergie et la longueur d\'onde de ce photon. Est-il visible ?' },
      ],
    }],
  },
  {
    id: 'photon-13',
    context: 'La puissance est l\'énergie émise par seconde : $N=\\dfrac{P}{E}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un laser vert ($\\lambda=532\\,\\text{nm}$) a une puissance de $5{,}0\\,\\text{mW}$. Calculer le nombre de photons émis par seconde.' },
      ],
    }],
  },
  {
    id: 'photon-14',
    context: 'Une raie d\'absorption correspond à un écart entre niveaux $|\\Delta E|=\\dfrac{hc}{\\lambda}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une raie d\'absorption est observée à $434\\,\\text{nm}$ dans le spectre d\'une étoile. Calculer, en eV, l\'écart entre les deux niveaux d\'énergie concernés.' },
      ],
    }],
  },
  {
    id: 'photon-15',
    context: 'Émission et absorption révèlent les mêmes longueurs d\'onde.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer la différence entre un spectre d\'émission et un spectre d\'absorption. Pourquoi les raies apparaissent-elles aux mêmes longueurs d\'onde ?' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'photon-16',
    context: 'Ioniser un atome, c\'est amener l\'électron au niveau $E=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie nécessaire pour ioniser un atome d\'hydrogène se trouvant dans l\'état $n=2$. Comparer à l\'ionisation depuis l\'état fondamental et commenter.' },
      ],
    }],
  },
  {
    id: 'photon-17',
    context: 'Un photon n\'est absorbé que si son énergie correspond exactement à un écart entre niveaux.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un atome d\'hydrogène dans l\'état fondamental reçoit un photon d\'énergie $5{,}0\\,\\text{eV}$. Peut-il l\'absorber ? Justifier à l\'aide des niveaux d\'énergie.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'photon-18',
    context: 'On compare un rayonnement UV ($\\lambda_1=365\\,\\text{nm}$) et la raie jaune du sodium ($\\lambda_2=589\\,\\text{nm}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la fréquence de chaque rayonnement.' },
        { n: 'b', text: 'Calculer l\'énergie de chaque photon, en joules puis en électronvolts.' },
        { n: 'c', text: 'Calculer le rapport des énergies. Retrouver ce rapport sans calculer les énergies, et expliquer pourquoi les UV sont plus dangereux.' },
      ],
    }],
  },
  {
    id: 'photon-19',
    context: 'Les niveaux d\'énergie de l\'hydrogène sont donnés par $E_n=-\\dfrac{13{,}6}{n^2}\\,\\text{eV}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $E_1$, $E_2$ et $E_3$. Pourquoi ces énergies sont-elles négatives ?' },
        { n: 'b', text: 'L\'atome passe de $n=3$ à $n=2$. S\'agit-il d\'une absorption ou d\'une émission ? Calculer la longueur d\'onde du photon échangé et donner sa couleur.' },
        { n: 'c', text: 'Calculer l\'énergie du photon nécessaire pour faire passer l\'atome de $n=1$ à $n=3$, puis sa longueur d\'onde.' },
        { n: 'd', text: 'Quelle énergie faut-il fournir pour ioniser l\'atome depuis le niveau $n=3$ ?' },
      ],
    }],
  },
  {
    id: 'photon-20',
    context: 'Un laser vert émet à $\\lambda=532\\,\\text{nm}$ avec une puissance $P=5{,}0\\,\\text{mW}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie d\'un photon, en joules puis en eV.' },
        { n: 'b', text: 'Sachant que la puissance est l\'énergie émise par seconde, calculer le nombre de photons émis chaque seconde.' },
        { n: 'c', text: 'Combien de photons sont émis en une minute ? Commenter l\'ordre de grandeur.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const PHOTON_CORRECTIONS: Record<string, Correction> = {
  'photon-1': {
    steps: [
      { n: '1', text: '$\\nu=\\dfrac{c}{\\lambda}=\\dfrac{3{,}00\\times 10^{8}}{500\\times 10^{-9}}=6{,}00\\times 10^{14}\\,\\text{Hz}$.' },
    ],
    result: '$\\nu=6{,}00\\times 10^{14}\\,\\text{Hz}$.',
  },
  'photon-2': {
    steps: [
      { n: '1', text: 'La **diffraction** (ou les interférences) met en évidence le caractère ondulatoire.' },
      { n: '2', text: 'Le modèle corpusculaire décrit la lumière comme un flux de **photons**, grains d\'énergie $E=h\\nu$.' },
    ],
    result: 'Diffraction ⇒ onde ; photons (grains $E=h\\nu$) ⇒ corpuscule.',
  },
  'photon-3': {
    steps: [
      { n: '1', text: '$E=\\dfrac{hc}{\\lambda}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{450\\times 10^{-9}}\\approx 4{,}42\\times 10^{-19}\\,\\text{J}$.' },
      { n: '2', text: '$E=\\dfrac{4{,}42\\times 10^{-19}}{1{,}60\\times 10^{-19}}\\approx 2{,}76\\,\\text{eV}$.' },
    ],
    result: '$E\\approx 4{,}42\\times 10^{-19}\\,\\text{J}=2{,}76\\,\\text{eV}$.',
  },
  'photon-4': {
    steps: [
      { n: '1', text: '$E=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{600\\times 10^{-9}}\\approx 3{,}32\\times 10^{-19}\\,\\text{J}\\approx 2{,}07\\,\\text{eV}$.' },
    ],
    result: '$E\\approx 2{,}07\\,\\text{eV}$.',
  },
  'photon-5': {
    steps: [
      { n: '1', text: '$E=\\dfrac{4{,}0\\times 10^{-19}}{1{,}60\\times 10^{-19}}=2{,}5\\,\\text{eV}$.' },
    ],
    result: '$E=2{,}5\\,\\text{eV}$.',
  },
  'photon-6': {
    steps: [
      { n: '1', text: '$E=2{,}5\\times 1{,}60\\times 10^{-19}=4{,}0\\times 10^{-19}\\,\\text{J}$.' },
    ],
    result: '$E=4{,}0\\times 10^{-19}\\,\\text{J}$.',
  },
  'photon-7': {
    steps: [
      { n: '1', text: 'La dualité signifie que la lumière possède **à la fois** un caractère ondulatoire et un caractère corpusculaire.' },
      { n: '2', text: 'Les deux aspects sont **complémentaires** : une expérience donnée en révèle un seul, jamais les deux simultanément.' },
    ],
    result: 'Deux caractères complémentaires ; jamais les deux à la fois.',
  },
  'photon-8': {
    steps: [
      { n: '1', text: '$E=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{200\\times 10^{-9}}\\approx 9{,}95\\times 10^{-19}\\,\\text{J}\\approx 6{,}2\\,\\text{eV}$.' },
      { n: '2', text: 'C\'est environ **3 fois** l\'énergie d\'un photon visible ($\\approx 2\\,\\text{eV}$). Ces photons sont assez énergétiques pour **briser des liaisons chimiques** (notamment dans l\'ADN) : d\'où la nocivité des UV.' },
    ],
    result: '$E\\approx 6{,}2\\,\\text{eV}$ (≈ 3× un photon visible).',
  },
  'photon-9': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{hc}{E}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{3{,}0\\times 1{,}60\\times 10^{-19}}\\approx 4{,}1\\times 10^{-7}\\,\\text{m}=414\\,\\text{nm}$.' },
      { n: '2', text: 'Comprise entre $400$ et $800\\,\\text{nm}$ : le photon est **visible** (violet).' },
    ],
    result: '$\\lambda\\approx 414\\,\\text{nm}$ (violet, visible).',
  },
  'photon-10': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{hc}{E}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{1{,}55\\times 1{,}60\\times 10^{-19}}\\approx 8{,}0\\times 10^{-7}\\,\\text{m}=802\\,\\text{nm}$.' },
      { n: '2', text: 'Au-delà de $800\\,\\text{nm}$ : c\'est de l\'**infrarouge** (proche).' },
    ],
    result: '$\\lambda\\approx 8{,}0\\times 10^{2}\\,\\text{nm}$ (IR proche).',
  },
  'photon-11': {
    steps: [
      { n: '1', text: '$E_4=-\\dfrac{13{,}6}{16}=-0{,}85\\,\\text{eV}$ et $E_2=-\\dfrac{13{,}6}{4}=-3{,}40\\,\\text{eV}$, d\'où $|\\Delta E|=|{-3{,}40}-(-0{,}85)|=2{,}55\\,\\text{eV}=4{,}08\\times 10^{-19}\\,\\text{J}$.' },
      { n: '2', text: '$\\lambda=\\dfrac{hc}{|\\Delta E|}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{4{,}08\\times 10^{-19}}\\approx 4{,}9\\times 10^{-7}\\,\\text{m}=488\\,\\text{nm}$. C\'est une raie **bleu-vert**.' },
    ],
    result: '$|\\Delta E|=2{,}55\\,\\text{eV}$ ; $\\lambda\\approx 488\\,\\text{nm}$ (bleu-vert).',
  },
  'photon-12': {
    steps: [
      { n: '1', text: '$|\\Delta E|=|E_2-E_1|=|{-3{,}40}-(-13{,}60)|=10{,}20\\,\\text{eV}=1{,}63\\times 10^{-18}\\,\\text{J}$.' },
      { n: '2', text: '$\\lambda=\\dfrac{hc}{|\\Delta E|}\\approx 1{,}2\\times 10^{-7}\\,\\text{m}=122\\,\\text{nm}$. Bien en dessous de $400\\,\\text{nm}$ : ce photon est **ultraviolet**, donc invisible.' },
    ],
    result: '$|\\Delta E|=10{,}2\\,\\text{eV}$ ; $\\lambda\\approx 122\\,\\text{nm}$ (UV, invisible).',
  },
  'photon-13': {
    steps: [
      { n: '1', text: 'Énergie d\'un photon : $E=\\dfrac{hc}{\\lambda}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{532\\times 10^{-9}}\\approx 3{,}74\\times 10^{-19}\\,\\text{J}$.' },
      { n: '2', text: '$N=\\dfrac{P}{E}=\\dfrac{5{,}0\\times 10^{-3}}{3{,}74\\times 10^{-19}}\\approx 1{,}3\\times 10^{16}$ photons par seconde.' },
    ],
    result: '$N\\approx 1{,}3\\times 10^{16}\\,\\text{photons/s}$.',
  },
  'photon-14': {
    steps: [
      { n: '1', text: '$|\\Delta E|=\\dfrac{hc}{\\lambda}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{434\\times 10^{-9}}\\approx 4{,}58\\times 10^{-19}\\,\\text{J}\\approx 2{,}9\\,\\text{eV}$.' },
    ],
    result: '$|\\Delta E|\\approx 2{,}9\\,\\text{eV}$.',
  },
  'photon-15': {
    steps: [
      { n: '1', text: '**Émission** : un gaz excité restitue des photons → raies colorées sur fond noir. **Absorption** : une lumière blanche traverse un gaz froid, qui prélève certains photons → raies noires sur fond continu.' },
      { n: '2', text: 'Les raies sont aux **mêmes longueurs d\'onde** car elles correspondent aux mêmes écarts $|\\Delta E|$ entre les niveaux d\'énergie de l\'atome.' },
    ],
    result: 'Émission (raies colorées) et absorption (raies noires) aux mêmes λ : mêmes écarts de niveaux.',
  },
  'photon-16': {
    steps: [
      { n: '1', text: 'Ioniser depuis $n=2$ revient à amener l\'atome de $E_2=-3{,}40\\,\\text{eV}$ à $E=0$ : il faut fournir $3{,}40\\,\\text{eV}$.' },
      { n: '2', text: 'Depuis l\'état fondamental, il faudrait $13{,}6\\,\\text{eV}$, soit **4 fois plus** : un atome excité est bien plus facile à ioniser, car son électron est moins lié.' },
    ],
    result: '$E_{\\text{ionisation}}(n=2)=3{,}40\\,\\text{eV}$ (4× moins que depuis $n=1$).',
  },
  'photon-17': {
    steps: [
      { n: '1', text: 'Depuis $n=1$, les transitions possibles demandent $10{,}2\\,\\text{eV}$ ($n=2$), $12{,}1\\,\\text{eV}$ ($n=3$)… et l\'ionisation $13{,}6\\,\\text{eV}$.' },
      { n: '2', text: 'Un photon de $5{,}0\\,\\text{eV}$ ne correspond à **aucun** écart entre niveaux et est insuffisant pour ioniser : il n\'est pas absorbé et traverse l\'atome. C\'est une conséquence directe de la quantification.' },
    ],
    result: 'Non absorbé (aucune transition à $5{,}0\\,\\text{eV}$).',
  },
  'photon-18': {
    steps: [
      { n: 'a', text: '$\\nu_1=\\dfrac{c}{\\lambda_1}=\\dfrac{3{,}00\\times 10^{8}}{365\\times 10^{-9}}\\approx 8{,}22\\times 10^{14}\\,\\text{Hz}$ ; $\\nu_2=\\dfrac{3{,}00\\times 10^{8}}{589\\times 10^{-9}}\\approx 5{,}09\\times 10^{14}\\,\\text{Hz}$.' },
      { n: 'b', text: '$E_1=h\\nu_1\\approx 5{,}45\\times 10^{-19}\\,\\text{J}\\approx 3{,}41\\,\\text{eV}$ ; $E_2=h\\nu_2\\approx 3{,}38\\times 10^{-19}\\,\\text{J}\\approx 2{,}11\\,\\text{eV}$.' },
      { n: 'c', text: '$\\dfrac{E_1}{E_2}\\approx\\dfrac{3{,}41}{2{,}11}\\approx 1{,}6$. On le retrouve directement : $E=\\dfrac{hc}{\\lambda}\\Rightarrow\\dfrac{E_1}{E_2}=\\dfrac{\\lambda_2}{\\lambda_1}=\\dfrac{589}{365}\\approx 1{,}6$. Les photons UV sont plus énergétiques : ils peuvent rompre des liaisons chimiques dans les cellules, d\'où leur dangerosité.' },
    ],
    result: '$E_1\\approx 3{,}41\\,\\text{eV}$ ; $E_2\\approx 2{,}11\\,\\text{eV}$ ; rapport $\\approx 1{,}6=\\lambda_2/\\lambda_1$.',
  },
  'photon-19': {
    steps: [
      { n: 'a', text: '$E_1=-13{,}60\\,\\text{eV}$ ; $E_2=-3{,}40\\,\\text{eV}$ ; $E_3=-1{,}51\\,\\text{eV}$. Elles sont **négatives** car l\'électron est lié à l\'atome : la référence $E=0$ correspond à l\'électron libre (atome ionisé).' },
      { n: 'b', text: 'L\'atome **descend** ($n=3\\to n=2$) : c\'est une **émission**. $|\\Delta E|=|{-3{,}40}-(-1{,}51)|=1{,}89\\,\\text{eV}=3{,}02\\times 10^{-19}\\,\\text{J}$, d\'où $\\lambda=\\dfrac{hc}{|\\Delta E|}\\approx 6{,}6\\times 10^{-7}\\,\\text{m}=658\\,\\text{nm}$ : raie **rouge** (la raie $H_\\alpha$, $656\\,\\text{nm}$ tabulée).' },
      { n: 'c', text: '$|\\Delta E|=|E_3-E_1|=|{-1{,}51}-(-13{,}60)|=12{,}09\\,\\text{eV}=1{,}93\\times 10^{-18}\\,\\text{J}$, d\'où $\\lambda\\approx 1{,}0\\times 10^{-7}\\,\\text{m}=103\\,\\text{nm}$ (UV).' },
      { n: 'd', text: 'Ioniser depuis $n=3$ : amener l\'atome de $E_3=-1{,}51\\,\\text{eV}$ à $0$, soit $1{,}51\\,\\text{eV}$.' },
    ],
    result: '$\\lambda_{3\\to2}\\approx 658\\,\\text{nm}$ (rouge) ; $\\lambda_{1\\to3}\\approx 103\\,\\text{nm}$ (UV) ; $E_{\\text{ion}}(n=3)=1{,}51\\,\\text{eV}$.',
  },
  'photon-20': {
    steps: [
      { n: 'a', text: '$E=\\dfrac{hc}{\\lambda}=\\dfrac{6{,}63\\times 10^{-34}\\times 3{,}00\\times 10^{8}}{532\\times 10^{-9}}\\approx 3{,}74\\times 10^{-19}\\,\\text{J}\\approx 2{,}34\\,\\text{eV}$.' },
      { n: 'b', text: '$P=N\\times E$ (énergie émise par seconde), d\'où $N=\\dfrac{P}{E}=\\dfrac{5{,}0\\times 10^{-3}}{3{,}74\\times 10^{-19}}\\approx 1{,}3\\times 10^{16}$ photons par seconde.' },
      { n: 'c', text: 'En une minute : $N\'=N\\times 60\\approx 8{,}0\\times 10^{17}$ photons. C\'est un nombre gigantesque : à notre échelle, le flux paraît **continu**, ce qui explique que le caractère granulaire de la lumière soit indétectable à l\'œil.' },
    ],
    result: '$E\\approx 2{,}34\\,\\text{eV}$ ; $N\\approx 1{,}3\\times 10^{16}\\,\\text{s}^{-1}$ ; $\\approx 8{,}0\\times 10^{17}$ par minute.',
  },
};
