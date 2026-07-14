import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const DIFFRACTION_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La diffraction est nette lorsque l\'ouverture $a$ est…',
    options: [
      { label: 'a', text: 'très grande devant $\\lambda$' },
      { label: 'b', text: 'de l\'ordre de $\\lambda$' },
      { label: 'c', text: 'nulle' },
      { label: 'd', text: 'infinie' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'L\'écart angulaire de diffraction vaut…',
    options: [
      { label: 'a', text: '$\\theta=\\dfrac{\\lambda}{a}$' },
      { label: 'b', text: '$\\theta=\\dfrac{a}{\\lambda}$' },
      { label: 'c', text: '$\\theta=\\lambda a$' },
      { label: 'd', text: '$\\theta=\\dfrac{2\\lambda}{a}$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: '$\\theta$ s\'exprime en…',
    options: [
      { label: 'a', text: 'degrés' },
      { label: 'b', text: 'radians' },
      { label: 'c', text: 'mètres' },
      { label: 'd', text: 'hertz' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Si la fente devient plus fine, la tache centrale…',
    options: [
      { label: 'a', text: 's\'élargit' },
      { label: 'b', text: 'se rétrécit' },
      { label: 'c', text: 'disparaît' },
      { label: 'd', text: 'ne change pas' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'La largeur de la tache centrale vaut…',
    options: [
      { label: 'a', text: '$L=\\dfrac{2D\\lambda}{a}$' },
      { label: 'b', text: '$L=\\dfrac{D\\lambda}{a}$' },
      { label: 'c', text: '$L=\\dfrac{a}{2D\\lambda}$' },
      { label: 'd', text: '$L=2Da\\lambda$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'Deux ondes interfèrent de façon constructive si…',
    options: [
      { label: 'a', text: '$\\delta=k\\lambda$' },
      { label: 'b', text: '$\\delta=\\left(k+\\tfrac{1}{2}\\right)\\lambda$' },
      { label: 'c', text: '$\\delta=\\dfrac{\\lambda}{4}$' },
      { label: 'd', text: '$\\delta=0$ uniquement' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'Une frange sombre correspond à…',
    options: [
      { label: 'a', text: '$\\delta=k\\lambda$' },
      { label: 'b', text: '$\\delta=\\left(k+\\tfrac{1}{2}\\right)\\lambda$' },
      { label: 'c', text: '$\\delta=0$' },
      { label: 'd', text: '$\\delta=2\\lambda$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'L\'interfrange des fentes de Young vaut…',
    options: [
      { label: 'a', text: '$i=\\dfrac{\\lambda D}{b}$' },
      { label: 'b', text: '$i=\\dfrac{\\lambda b}{D}$' },
      { label: 'c', text: '$i=\\dfrac{bD}{\\lambda}$' },
      { label: 'd', text: '$i=\\lambda Db$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Pour observer des interférences, les sources doivent être…',
    options: [
      { label: 'a', text: 'de couleurs différentes' },
      { label: 'b', text: 'cohérentes' },
      { label: 'c', text: 'très éloignées' },
      { label: 'd', text: 'de fréquences différentes' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La diffraction et les interférences prouvent que la lumière…',
    options: [
      { label: 'a', text: 'est un jet de particules' },
      { label: 'b', text: 'a un caractère ondulatoire' },
      { label: 'c', text: 'ne transporte pas d\'énergie' },
      { label: 'd', text: 'se déplace à vitesse variable' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const DIFFRACTION_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'diffraction-1',
    context: 'La diffraction est d\'autant plus nette que l\'ouverture $a$ est proche de $\\lambda$ (ou plus petite). On rappelle $1\\,\\text{nm}=10^{-9}\\,\\text{m}$, $1\\,\\mu\\text{m}=10^{-6}\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un faisceau lumineux ($\\lambda\\approx 0{,}5\\,\\mu\\text{m}$) passe par une ouverture. Pour laquelle observe-t-on une diffraction nette : une ouverture de $1\\,\\text{cm}$ ou une fente de $0{,}1\\,\\text{mm}$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'diffraction-2',
    context: 'Certains phénomènes ne s\'expliquent que si la lumière est une onde.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer deux phénomènes qui prouvent le caractère ondulatoire de la lumière.' },
      ],
    }],
  },
  {
    id: 'diffraction-3',
    context: 'Écart angulaire : $\\theta=\\dfrac{\\lambda}{a}$ ($\\theta$ en radians).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un laser ($\\lambda=633\\,\\text{nm}$) traverse une fente de largeur $a=0{,}05\\,\\text{mm}$. Calculer l\'écart angulaire $\\theta$.' },
      ],
    }],
  },
  {
    id: 'diffraction-4',
    context: 'Interférence **constructive** si $\\delta=k\\lambda$ ($k$ entier), **destructive** si $\\delta=\\left(k+\\tfrac{1}{2}\\right)\\lambda$.',
    parts: [{
      questions: [
        { n: 'a', text: 'En un point, la différence de marche vaut $\\delta=1{,}5\\,\\mu\\text{m}$, pour $\\lambda=500\\,\\text{nm}$. L\'interférence est-elle constructive ou destructive ?' },
      ],
    }],
  },
  {
    id: 'diffraction-5',
    context: 'Interfrange des fentes de Young : $i=\\dfrac{\\lambda D}{b}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Des fentes de Young distantes de $b=0{,}30\\,\\text{mm}$ sont éclairées par un laser $\\lambda=633\\,\\text{nm}$ ; l\'écran est à $D=1{,}5\\,\\text{m}$. Calculer l\'interfrange.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'diffraction-6',
    context: 'La diffraction est marquée quand $a$ est de l\'ordre de $\\lambda$ (ou plus petit).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un son ($\\lambda\\approx 1\\,\\text{m}$) et la lumière ($\\lambda\\approx 0{,}5\\,\\mu\\text{m}$) franchissent une porte de largeur $\\approx 1\\,\\text{m}$. Lequel est notablement diffracté ? Pourquoi entend-on quelqu\'un sans le voir à travers une porte entrouverte ?' },
      ],
    }],
  },
  {
    id: 'diffraction-7',
    context: 'Largeur de la tache centrale : $L=2D\\theta=\\dfrac{2D\\lambda}{a}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avec $\\lambda=633\\,\\text{nm}$, une fente $a=0{,}20\\,\\text{mm}$ et un écran à $D=3{,}0\\,\\text{m}$, calculer la largeur $L$ de la tache centrale.' },
      ],
    }],
  },
  {
    id: 'diffraction-8',
    context: 'On raisonne sur la relation $L=\\dfrac{2D\\lambda}{a}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Comment varie la largeur $L$ de la tache centrale si l\'on double la largeur $a$ de la fente ? si l\'on double la distance $D$ à l\'écran ?' },
      ],
    }],
  },
  {
    id: 'diffraction-9',
    context: 'De $L=\\dfrac{2D\\lambda}{a}$ on tire $\\lambda=\\dfrac{aL}{2D}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On mesure une tache centrale $L=3{,}0\\,\\text{cm}$ pour une fente $a=0{,}10\\,\\text{mm}$ et un écran à $D=2{,}4\\,\\text{m}$. En déduire la longueur d\'onde du laser.' },
      ],
    }],
  },
  {
    id: 'diffraction-10',
    context: 'On compare $\\dfrac{\\delta}{\\lambda}$ à un entier ou un demi-entier.',
    parts: [{
      questions: [
        { n: 'a', text: 'En un point, $\\delta=0{,}90\\,\\mu\\text{m}$ pour $\\lambda=600\\,\\text{nm}$. Frange brillante ou sombre ? Justifier.' },
      ],
    }],
  },
  {
    id: 'diffraction-11',
    context: 'Au centre, les deux ondes ont parcouru la même distance.',
    parts: [{
      questions: [
        { n: 'a', text: 'Au centre de la figure d\'interférences (point équidistant des deux sources), que vaut la différence de marche ? En déduire la nature de la frange centrale.' },
      ],
    }],
  },
  {
    id: 'diffraction-12',
    context: 'De $i=\\dfrac{\\lambda D}{b}$ on tire $\\lambda=\\dfrac{ib}{D}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On mesure un interfrange $i=1{,}8\\,\\text{mm}$ avec $b=0{,}40\\,\\text{mm}$ et $D=1{,}2\\,\\text{m}$. En déduire la longueur d\'onde.' },
      ],
    }],
  },
  {
    id: 'diffraction-13',
    context: 'Interfrange : $i=\\dfrac{\\lambda D}{b}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un laser vert ($\\lambda=532\\,\\text{nm}$) éclaire des fentes distantes de $b=0{,}50\\,\\text{mm}$, écran à $D=2{,}0\\,\\text{m}$. Calculer l\'interfrange.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'diffraction-14',
    context: 'Un fil se comporte comme une fente de même largeur : $L=\\dfrac{2D\\lambda}{a}$, d\'où $a=\\dfrac{2D\\lambda}{L}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un cheveu, éclairé par un laser $\\lambda=633\\,\\text{nm}$, donne une tache centrale $L=1{,}9\\,\\text{cm}$ sur un écran à $D=1{,}2\\,\\text{m}$. Calculer le diamètre du cheveu.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'diffraction-15',
    context: 'Des fentes de Young ($b=0{,}50\\,\\text{mm}$) sont éclairées par un laser de longueur d\'onde inconnue ; l\'écran est à $D=2{,}0\\,\\text{m}$. On mesure la largeur de $10$ interfranges : $25\\,\\text{mm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer l\'interfrange $i$.' },
        { n: 'b', text: 'En déduire la longueur d\'onde $\\lambda$.' },
        { n: 'c', text: 'À quel domaine de couleur correspond ce laser ?' },
      ],
    }],
  },
  {
    id: 'diffraction-16',
    context: 'Un laser ($\\lambda=650\\,\\text{nm}$) traverse une fente de largeur $a=0{,}10\\,\\text{mm}$, l\'écran étant à $D=2{,}5\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'écart angulaire $\\theta$.' },
        { n: 'b', text: 'Calculer la largeur $L$ de la tache centrale.' },
        { n: 'c', text: 'On remplace la fente par un cheveu de diamètre $80\\,\\mu\\text{m}$. La tache centrale est-elle plus large ou plus étroite ? Calculer sa nouvelle largeur.' },
      ],
    }],
  },
  {
    id: 'diffraction-17',
    context: 'Un fil fin est éclairé par un laser $\\lambda=650\\,\\text{nm}$. Sur un écran à $D=2{,}0\\,\\text{m}$, la tache centrale mesure $L=3{,}2\\,\\text{cm}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que la relation de diffraction s\'applique à un fil comme à une fente.' },
        { n: 'b', text: 'Calculer le diamètre $a$ du fil.' },
        { n: 'c', text: 'Ce fil pourrait-il être un cheveu (diamètre typique $50$ à $100\\,\\mu\\text{m}$) ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const DIFFRACTION_CORRECTIONS: Record<string, Correction> = {
  'diffraction-1': {
    steps: [
      { n: '1', text: 'C\'est la fente de $0{,}1\\,\\text{mm}$ : sa dimension se rapproche de $\\lambda$ (le rapport $a/\\lambda$ est bien plus petit que pour l\'ouverture de $1\\,\\text{cm}$).' },
      { n: '2', text: 'La diffraction est d\'autant plus nette que l\'ouverture est petite. L\'ouverture de $1\\,\\text{cm}$ diffracte de façon négligeable.' },
    ],
    result: 'La fente de $0{,}1\\,\\text{mm}$ diffracte nettement.',
  },
  'diffraction-2': {
    steps: [
      { n: '1', text: 'La **diffraction** et les **interférences** : ces deux phénomènes n\'ont d\'explication que si la lumière est une onde.' },
    ],
    result: 'Diffraction et interférences.',
  },
  'diffraction-3': {
    steps: [
      { n: '1', text: '$\\theta=\\dfrac{\\lambda}{a}=\\dfrac{633\\times 10^{-9}}{0{,}05\\times 10^{-3}}\\approx 1{,}3\\times 10^{-2}\\,\\text{rad}$.' },
    ],
    result: '$\\theta\\approx 1{,}3\\times 10^{-2}\\,\\text{rad}$.',
  },
  'diffraction-4': {
    steps: [
      { n: '1', text: '$\\dfrac{\\delta}{\\lambda}=\\dfrac{1{,}5\\times 10^{-6}}{500\\times 10^{-9}}=3{,}0$ : c\'est un **entier** ($\\delta=3\\lambda$).' },
      { n: '2', text: 'Donc interférence **constructive** (frange brillante).' },
    ],
    result: 'Constructive ($\\delta=3\\lambda$).',
  },
  'diffraction-5': {
    steps: [
      { n: '1', text: '$i=\\dfrac{\\lambda D}{b}=\\dfrac{633\\times 10^{-9}\\times 1{,}5}{0{,}30\\times 10^{-3}}\\approx 3{,}2\\times 10^{-3}\\,\\text{m}=3{,}2\\,\\text{mm}$.' },
    ],
    result: '$i\\approx 3{,}2\\,\\text{mm}$.',
  },
  'diffraction-6': {
    steps: [
      { n: '1', text: 'Le **son** ($\\lambda\\approx 1\\,\\text{m}\\approx$ largeur de la porte) est fortement diffracté : il contourne l\'obstacle, on l\'entend.' },
      { n: '2', text: 'La lumière ($\\lambda\\approx 0{,}5\\,\\mu\\text{m}\\ll 1\\,\\text{m}$) n\'est pas diffractée à cette échelle et se propage en ligne droite : on ne voit pas derrière la porte.' },
    ],
    result: 'Le son est diffracté (on l\'entend), pas la lumière (on ne voit pas).',
  },
  'diffraction-7': {
    steps: [
      { n: '1', text: '$L=\\dfrac{2D\\lambda}{a}=\\dfrac{2\\times 3{,}0\\times 633\\times 10^{-9}}{0{,}20\\times 10^{-3}}\\approx 1{,}9\\times 10^{-2}\\,\\text{m}=1{,}9\\,\\text{cm}$.' },
    ],
    result: '$L\\approx 1{,}9\\,\\text{cm}$.',
  },
  'diffraction-8': {
    steps: [
      { n: '1', text: 'Comme $L=\\dfrac{2D\\lambda}{a}$ : si $a$ est **doublé**, $L$ est **divisé par 2**.' },
      { n: '2', text: 'Si $D$ est **doublé**, $L$ est **doublé** ($L$ proportionnel à $D$).' },
    ],
    result: '$a\\times 2 \\Rightarrow L/2$ ; $D\\times 2 \\Rightarrow L\\times 2$.',
  },
  'diffraction-9': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{aL}{2D}=\\dfrac{0{,}10\\times 10^{-3}\\times 0{,}030}{2\\times 2{,}4}\\approx 6{,}3\\times 10^{-7}\\,\\text{m}=625\\,\\text{nm}$.' },
    ],
    result: '$\\lambda\\approx 625\\,\\text{nm}$.',
  },
  'diffraction-10': {
    steps: [
      { n: '1', text: '$\\dfrac{\\delta}{\\lambda}=\\dfrac{0{,}90\\times 10^{-6}}{600\\times 10^{-9}}=1{,}5$ : c\'est un **demi-entier** ($\\delta=1{,}5\\,\\lambda$).' },
      { n: '2', text: 'Donc interférence **destructive** (frange sombre).' },
    ],
    result: 'Destructive ($\\delta=1{,}5\\,\\lambda$), frange sombre.',
  },
  'diffraction-11': {
    steps: [
      { n: '1', text: 'Au centre, les deux ondes ont parcouru la même distance : $\\delta=0=0\\times\\lambda$.' },
      { n: '2', text: 'C\'est une interférence **constructive** : la frange centrale est **brillante**.' },
    ],
    result: '$\\delta=0$ : frange centrale brillante (constructive).',
  },
  'diffraction-12': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{ib}{D}=\\dfrac{1{,}8\\times 10^{-3}\\times 0{,}40\\times 10^{-3}}{1{,}2}\\approx 6{,}0\\times 10^{-7}\\,\\text{m}=600\\,\\text{nm}$.' },
    ],
    result: '$\\lambda\\approx 600\\,\\text{nm}$.',
  },
  'diffraction-13': {
    steps: [
      { n: '1', text: '$i=\\dfrac{\\lambda D}{b}=\\dfrac{532\\times 10^{-9}\\times 2{,}0}{0{,}50\\times 10^{-3}}\\approx 2{,}1\\times 10^{-3}\\,\\text{m}=2{,}1\\,\\text{mm}$.' },
    ],
    result: '$i\\approx 2{,}1\\,\\text{mm}$.',
  },
  'diffraction-14': {
    steps: [
      { n: '1', text: '$a=\\dfrac{2D\\lambda}{L}=\\dfrac{2\\times 1{,}2\\times 633\\times 10^{-9}}{0{,}019}\\approx 8{,}0\\times 10^{-5}\\,\\text{m}=80\\,\\mu\\text{m}$.' },
    ],
    result: 'Diamètre $\\approx 80\\,\\mu\\text{m}$.',
  },
  'diffraction-15': {
    steps: [
      { n: 'a', text: '$i=\\dfrac{25\\,\\text{mm}}{10}=2{,}5\\,\\text{mm}$ (mesurer plusieurs interfranges réduit l\'incertitude).' },
      { n: 'b', text: '$\\lambda=\\dfrac{ib}{D}=\\dfrac{2{,}5\\times 10^{-3}\\times 0{,}50\\times 10^{-3}}{2{,}0}\\approx 6{,}3\\times 10^{-7}\\,\\text{m}=625\\,\\text{nm}$.' },
      { n: 'c', text: '$625\\,\\text{nm}$ correspond au **rouge**.' },
    ],
    result: '$i=2{,}5\\,\\text{mm}$ ; $\\lambda\\approx 625\\,\\text{nm}$ (rouge).',
  },
  'diffraction-16': {
    steps: [
      { n: 'a', text: '$\\theta=\\dfrac{\\lambda}{a}=\\dfrac{650\\times 10^{-9}}{0{,}10\\times 10^{-3}}=6{,}5\\times 10^{-3}\\,\\text{rad}$.' },
      { n: 'b', text: '$L=\\dfrac{2D\\lambda}{a}=\\dfrac{2\\times 2{,}5\\times 650\\times 10^{-9}}{0{,}10\\times 10^{-3}}\\approx 3{,}3\\times 10^{-2}\\,\\text{m}=3{,}25\\,\\text{cm}$.' },
      { n: 'c', text: 'Le cheveu ($80\\,\\mu\\text{m}$) est plus fin que la fente ($100\\,\\mu\\text{m}$) : la tache est donc **plus large**. $L\'=\\dfrac{2\\times 2{,}5\\times 650\\times 10^{-9}}{80\\times 10^{-6}}\\approx 4{,}1\\times 10^{-2}\\,\\text{m}=4{,}06\\,\\text{cm}$.' },
    ],
    result: '$\\theta=6{,}5\\times 10^{-3}\\,\\text{rad}$ ; $L=3{,}25\\,\\text{cm}\\rightarrow L\'=4{,}06\\,\\text{cm}$.',
  },
  'diffraction-17': {
    steps: [
      { n: 'a', text: 'Un fil (obstacle) de largeur $a$ produit la même figure de diffraction qu\'une fente de même largeur $a$ : on applique donc la relation $L=\\dfrac{2D\\lambda}{a}$.' },
      { n: 'b', text: '$a=\\dfrac{2D\\lambda}{L}=\\dfrac{2\\times 2{,}0\\times 650\\times 10^{-9}}{0{,}032}\\approx 8{,}1\\times 10^{-5}\\,\\text{m}=81\\,\\mu\\text{m}$.' },
      { n: 'c', text: '$81\\,\\mu\\text{m}$ se situe bien dans la fourchette $50$–$100\\,\\mu\\text{m}$ : ce pourrait être un cheveu.' },
    ],
    result: '$a\\approx 81\\,\\mu\\text{m}$ (compatible avec un cheveu).',
  },
};
