import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const RC_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La charge d\'un condensateur vaut…',
    options: [
      { label: 'a', text: '$q=C\\,u_C$' },
      { label: 'b', text: '$q=\\dfrac{C}{u_C}$' },
      { label: 'c', text: '$q=\\dfrac{u_C}{C}$' },
      { label: 'd', text: '$q=C+u_C$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'La capacité s\'exprime en…',
    options: [
      { label: 'a', text: 'ohms' },
      { label: 'b', text: 'farads' },
      { label: 'c', text: 'volts' },
      { label: 'd', text: 'coulombs' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'L\'intensité dans la branche du condensateur vaut…',
    options: [
      { label: 'a', text: '$i=C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$' },
      { label: 'b', text: '$i=\\dfrac{u_C}{C}$' },
      { label: 'c', text: '$i=C\\,u_C$' },
      { label: 'd', text: '$i=\\dfrac{\\mathrm{d}C}{\\mathrm{d}t}$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'La constante de temps vaut…',
    options: [
      { label: 'a', text: '$\\tau=\\dfrac{R}{C}$' },
      { label: 'b', text: '$\\tau=R\\,C$' },
      { label: 'c', text: '$\\tau=\\dfrac{C}{R}$' },
      { label: 'd', text: '$\\tau=R+C$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Lors de la charge, $u_C(t)$ vaut…',
    options: [
      { label: 'a', text: '$E\\,\\mathrm{e}^{-t/\\tau}$' },
      { label: 'b', text: '$E\\left(1-\\mathrm{e}^{-t/\\tau}\\right)$' },
      { label: 'c', text: '$E\\,\\mathrm{e}^{t/\\tau}$' },
      { label: 'd', text: '$E\\,t/\\tau$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'À $t=\\tau$ lors de la charge, $u_C$ vaut environ…',
    options: [
      { label: 'a', text: '$37\\,\\%$ de $E$' },
      { label: 'b', text: '$63\\,\\%$ de $E$' },
      { label: 'c', text: '$50\\,\\%$ de $E$' },
      { label: 'd', text: '$99\\,\\%$ de $E$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Lors de la décharge, à $t=\\tau$, $u_C$ vaut environ…',
    options: [
      { label: 'a', text: '$63\\,\\%$ de $E$' },
      { label: 'b', text: '$37\\,\\%$ de $E$' },
      { label: 'c', text: '$0$' },
      { label: 'd', text: '$E$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Le régime permanent est atteint après environ…',
    options: [
      { label: 'a', text: '$\\tau$' },
      { label: 'b', text: '$5\\tau$' },
      { label: 'c', text: '$100\\tau$' },
      { label: 'd', text: '$\\tau/2$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'L\'énergie stockée par un condensateur vaut…',
    options: [
      { label: 'a', text: '$\\tfrac{1}{2}C\\,u_C^2$' },
      { label: 'b', text: '$C\\,u_C^2$' },
      { label: 'c', text: '$\\tfrac{1}{2}C\\,u_C$' },
      { label: 'd', text: '$\\tfrac{1}{2}\\dfrac{u_C^2}{C}$' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'À la fermeture de l\'interrupteur (condensateur déchargé), l\'intensité vaut…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$E/R$' },
      { label: 'c', text: '$E\\,R$' },
      { label: 'd', text: 'infinie' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const RC_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'rc-1',
    context: 'Relation charge-tension : $q=C\\,u_C$, avec $1\\,\\mu\\text{F}=10^{-6}\\,\\text{F}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un condensateur de capacité $C=4{,}7\\,\\mu\\text{F}$ est chargé sous une tension $u_C=9{,}0\\,\\text{V}$. Calculer la charge $q$.' },
      ],
    }],
  },
  {
    id: 'rc-2',
    context: 'De $q=C\\,u_C$ on tire $u_C=\\dfrac{q}{C}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un condensateur de $10\\,\\mu\\text{F}$ porte une charge $q=30\\,\\mu\\text{C}$. Calculer la tension à ses bornes.' },
      ],
    }],
  },
  {
    id: 'rc-3',
    context: 'Constante de temps : $\\tau=RC$, avec $1\\,\\text{nF}=10^{-9}\\,\\text{F}$ et $1\\,\\text{k}\\Omega=10^{3}\\,\\Omega$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la constante de temps d\'un circuit RC avec $R=2{,}2\\,\\text{k}\\Omega$ et $C=470\\,\\text{nF}$.' },
      ],
    }],
  },
  {
    id: 'rc-4',
    context: 'Le régime permanent est atteint au bout de $\\approx 5\\tau$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\tau$ pour $R=100\\,\\text{k}\\Omega$ et $C=10\\,\\mu\\text{F}$. Commenter la rapidité du circuit.' },
      ],
    }],
  },
  {
    id: 'rc-5',
    context: 'Charge : $u_C(t)=E\\left(1-\\mathrm{e}^{-t/\\tau}\\right)$. À $t=\\tau$, $u_C=E(1-\\mathrm{e}^{-1})\\approx 0{,}63\\,E$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un circuit RC ($E=12\\,\\text{V}$, $\\tau=5{,}0\\,\\text{ms}$) charge un condensateur initialement déchargé. Calculer $u_C$ à $t=5{,}0\\,\\text{ms}$.' },
      ],
    }],
  },
  {
    id: 'rc-6',
    context: 'Décharge : $u_C(t)=E\\,\\mathrm{e}^{-t/\\tau}$. À $t=\\tau$, $u_C=E\\,\\mathrm{e}^{-1}\\approx 0{,}37\\,E$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un condensateur chargé sous $E=9{,}0\\,\\text{V}$ se décharge dans une résistance ; $\\tau=2{,}0\\,\\text{ms}$. Calculer $u_C$ à $t=2{,}0\\,\\text{ms}$.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'rc-7',
    context: 'Intensité : $i=C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Aux bornes d\'un condensateur de $2{,}0\\,\\mu\\text{F}$, la tension croît au rythme de $1000\\,\\text{V·s}^{-1}$. Calculer l\'intensité du courant.' },
      ],
    }],
  },
  {
    id: 'rc-8',
    context: 'En régime permanent, $u_C$ est constante.',
    parts: [{
      questions: [
        { n: 'a', text: 'En régime permanent, la tension aux bornes d\'un condensateur est constante. Que vaut alors l\'intensité du courant qui le traverse ? Justifier à partir de $i=C\\,\\mathrm{d}u_C/\\mathrm{d}t$.' },
      ],
    }],
  },
  {
    id: 'rc-9',
    context: 'De $\\tau=RC$ on tire $C=\\dfrac{\\tau}{R}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On mesure $\\tau=22\\,\\text{ms}$ dans un circuit où $R=4{,}7\\,\\text{k}\\Omega$. En déduire la capacité $C$.' },
      ],
    }],
  },
  {
    id: 'rc-10',
    context: 'De $\\tau=RC$ on tire $R=\\dfrac{\\tau}{C}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On souhaite $\\tau=0{,}50\\,\\text{s}$ avec un condensateur de $100\\,\\mu\\text{F}$. Quelle résistance faut-il choisir ?' },
      ],
    }],
  },
  {
    id: 'rc-11',
    context: 'On utilise $u=Ri$ et $q=Cu$, avec $i=\\dfrac{\\mathrm{d}q}{\\mathrm{d}t}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que le produit $RC$ est homogène à un temps, à partir des relations $u=Ri$ et $q=Cu$.' },
      ],
    }],
  },
  {
    id: 'rc-12',
    context: 'À $t=3\\tau$, $u_C=E(1-\\mathrm{e}^{-3})$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour le circuit RC ($E=12\\,\\text{V}$, $\\tau=5{,}0\\,\\text{ms}$), calculer $u_C$ à $t=15\\,\\text{ms}$. À quel pourcentage de $E$ cela correspond-il ?' },
      ],
    }],
  },
  {
    id: 'rc-13',
    context: 'On considère le régime permanent atteint au bout de $5\\tau$ ($u_C\\approx 99\\,\\%$ de $E$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Au bout de combien de temps peut-on considérer que le régime permanent est atteint ? Faire l\'application numérique ($\\tau=5{,}0\\,\\text{ms}$).' },
      ],
    }],
  },
  {
    id: 'rc-14',
    context: 'À $t=0$, le condensateur déchargé impose $u_C=0$, donc $E=R\\,i_0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'À la fermeture de l\'interrupteur ($E=12\\,\\text{V}$, $R=1{,}0\\,\\text{k}\\Omega$), calculer l\'intensité initiale $i_0$. Que vaut-elle en régime permanent ?' },
      ],
    }],
  },
  {
    id: 'rc-15',
    context: 'Décharge : $u_C=E\\,\\mathrm{e}^{-t/\\tau}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour la décharge ($E=9{,}0\\,\\text{V}$, $\\tau=2{,}0\\,\\text{ms}$), calculer $u_C$ à $t=6{,}0\\,\\text{ms}$.' },
      ],
    }],
  },
  {
    id: 'rc-16',
    context: 'Énergie stockée : $E_{\\text{stockée}}=\\tfrac{1}{2}C\\,u_C^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie stockée par un condensateur de $470\\,\\mu\\text{F}$ chargé sous $15\\,\\text{V}$.' },
      ],
    }],
  },
  {
    id: 'rc-17',
    context: 'L\'énergie dépend du carré de la tension : $E_{\\text{stockée}}=\\tfrac{1}{2}C\\,u^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie stockée par un condensateur de $1000\\,\\mu\\text{F}$ chargé sous $5{,}0\\,\\text{V}$. Comparer à l\'exercice précédent et commenter le rôle respectif de $C$ et de $u$.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'rc-18',
    context: 'On résout $E\\,\\mathrm{e}^{-t/\\tau}=\\dfrac{E}{2}$ en passant au logarithme.',
    parts: [{
      questions: [
        { n: 'a', text: 'Établir l\'expression du temps au bout duquel, lors d\'une décharge, la tension a été divisée par 2. Calculer sa valeur pour $\\tau=2{,}0\\,\\text{ms}$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'rc-19',
    context: 'Un circuit série comprend un générateur $E=6{,}0\\,\\text{V}$, une résistance $R=10\\,\\text{k}\\Omega$ et un condensateur $C=4{,}7\\,\\mu\\text{F}$ initialement déchargé. À $t=0$, on ferme l\'interrupteur.',
    parts: [{
      questions: [
        { n: 'a', text: 'Établir l\'équation différentielle vérifiée par $u_C(t)$.' },
        { n: 'b', text: 'Vérifier que $u_C(t)=E\\left(1-\\mathrm{e}^{-t/\\tau}\\right)$ est solution, avec $\\tau=RC$, et qu\'elle respecte la condition initiale.' },
        { n: 'c', text: 'Calculer $\\tau$, puis $u_C$ à $t=\\tau$ et à $t=3\\tau$.' },
        { n: 'd', text: 'Calculer l\'intensité initiale $i_0$ et la charge finale du condensateur.' },
      ],
    }],
  },
  {
    id: 'rc-20',
    context: 'On enregistre la charge d\'un condensateur de capacité inconnue, avec $R=4{,}7\\,\\text{k}\\Omega$ et $E=5{,}0\\,\\text{V}$. Sur la courbe $u_C(t)$, on relève que la tension atteint $63\\,\\%$ de $E$ à la date $t=47\\,\\text{ms}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que cette date correspond à $\\tau$.' },
        { n: 'b', text: 'Quelle valeur de tension a-t-on lue sur la courbe ?' },
        { n: 'c', text: 'En déduire la capacité $C$ du condensateur.' },
        { n: 'd', text: 'Citer une autre méthode graphique pour déterminer $\\tau$, et indiquer au bout de combien de temps la charge est pratiquement terminée.' },
      ],
    }],
  },
  {
    id: 'rc-21',
    context: 'Le flash d\'un appareil photo utilise un condensateur de $C=470\\,\\mu\\text{F}$ chargé sous $U=200\\,\\text{V}$. Il se décharge ensuite dans le tube éclair, de résistance $R=2{,}0\\,\\Omega$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie stockée par le condensateur.' },
        { n: 'b', text: 'Calculer la constante de temps de la décharge.' },
        { n: 'c', text: 'La décharge est pratiquement terminée au bout de $5\\tau$. Estimer la puissance moyenne délivrée pendant l\'éclair et commenter.' },
        { n: 'd', text: 'Pourquoi la charge du condensateur est-elle beaucoup plus lente que sa décharge ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const RC_CORRECTIONS: Record<string, Correction> = {
  'rc-1': {
    steps: [
      { n: '1', text: '$q=C\\,u_C=4{,}7\\times 10^{-6}\\times 9{,}0\\approx 4{,}2\\times 10^{-5}\\,\\text{C}=42{,}3\\,\\mu\\text{C}$.' },
    ],
    result: '$q\\approx 42\\,\\mu\\text{C}$.',
  },
  'rc-2': {
    steps: [
      { n: '1', text: '$u_C=\\dfrac{q}{C}=\\dfrac{30\\times 10^{-6}}{10\\times 10^{-6}}=3{,}0\\,\\text{V}$.' },
    ],
    result: '$u_C=3{,}0\\,\\text{V}$.',
  },
  'rc-3': {
    steps: [
      { n: '1', text: '$\\tau=RC=2{,}2\\times 10^{3}\\times 470\\times 10^{-9}\\approx 1{,}0\\times 10^{-3}\\,\\text{s}=1{,}0\\,\\text{ms}$.' },
    ],
    result: '$\\tau\\approx 1{,}0\\,\\text{ms}$.',
  },
  'rc-4': {
    steps: [
      { n: '1', text: '$\\tau=100\\times 10^{3}\\times 10\\times 10^{-6}=1{,}0\\,\\text{s}$.' },
      { n: '2', text: 'C\'est un circuit **lent** : il faudra environ $5\\,\\text{s}$ ($5\\tau$) pour atteindre le régime permanent.' },
    ],
    result: '$\\tau=1{,}0\\,\\text{s}$ (circuit lent).',
  },
  'rc-5': {
    steps: [
      { n: '1', text: '$u_C(\\tau)=E\\left(1-\\mathrm{e}^{-1}\\right)=12\\times 0{,}632\\approx 7{,}6\\,\\text{V}$ (soit $63\\,\\%$ de $E$).' },
    ],
    result: '$u_C\\approx 7{,}6\\,\\text{V}$.',
  },
  'rc-6': {
    steps: [
      { n: '1', text: '$u_C(\\tau)=E\\,\\mathrm{e}^{-1}=9{,}0\\times 0{,}368\\approx 3{,}3\\,\\text{V}$ (soit $37\\,\\%$ de $E$).' },
    ],
    result: '$u_C\\approx 3{,}3\\,\\text{V}$.',
  },
  'rc-7': {
    steps: [
      { n: '1', text: '$i=C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}=2{,}0\\times 10^{-6}\\times 1000=2{,}0\\times 10^{-3}\\,\\text{A}=2{,}0\\,\\text{mA}$.' },
    ],
    result: '$i=2{,}0\\,\\text{mA}$.',
  },
  'rc-8': {
    steps: [
      { n: '1', text: 'En régime permanent, $u_C$ est constante donc $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}=0$, d\'où $i=C\\times 0=0$.' },
      { n: '2', text: 'Le condensateur chargé **bloque le courant continu** : il se comporte comme un interrupteur ouvert.' },
    ],
    result: '$i=0$ en régime permanent.',
  },
  'rc-9': {
    steps: [
      { n: '1', text: '$C=\\dfrac{\\tau}{R}=\\dfrac{22\\times 10^{-3}}{4{,}7\\times 10^{3}}\\approx 4{,}7\\times 10^{-6}\\,\\text{F}=4{,}7\\,\\mu\\text{F}$.' },
    ],
    result: '$C\\approx 4{,}7\\,\\mu\\text{F}$.',
  },
  'rc-10': {
    steps: [
      { n: '1', text: '$R=\\dfrac{\\tau}{C}=\\dfrac{0{,}50}{100\\times 10^{-6}}=5{,}0\\times 10^{3}\\,\\Omega=5{,}0\\,\\text{k}\\Omega$.' },
    ],
    result: '$R=5{,}0\\,\\text{k}\\Omega$.',
  },
  'rc-11': {
    steps: [
      { n: '1', text: 'De $u=Ri$ : $[R]=\\dfrac{[u]}{[i]}$. De $q=Cu$ : $[C]=\\dfrac{[q]}{[u]}$. Donc $[RC]=\\dfrac{[u]}{[i]}\\times\\dfrac{[q]}{[u]}=\\dfrac{[q]}{[i]}$.' },
      { n: '2', text: 'Or $i=\\dfrac{\\mathrm{d}q}{\\mathrm{d}t}$ donne $[q]=[i]\\times[t]$, d\'où $[RC]=[t]$ : $RC$ est bien homogène à un **temps**.' },
    ],
    result: '$[RC]=[t]$ : homogène à un temps.',
  },
  'rc-12': {
    steps: [
      { n: '1', text: '$t=15\\,\\text{ms}=3\\tau$, donc $u_C=12\\times\\left(1-\\mathrm{e}^{-3}\\right)\\approx 11{,}4\\,\\text{V}$, soit $95\\,\\%$ de $E$.' },
    ],
    result: '$u_C\\approx 11{,}4\\,\\text{V}$ ($95\\,\\%$ de $E$).',
  },
  'rc-13': {
    steps: [
      { n: '1', text: 'On considère le régime permanent atteint au bout de $5\\tau$ ($u_C\\approx 99\\,\\%$ de $E$), soit $5\\times 5{,}0=25\\,\\text{ms}$.' },
    ],
    result: '$t\\approx 25\\,\\text{ms}$.',
  },
  'rc-14': {
    steps: [
      { n: '1', text: 'À $t=0$, le condensateur déchargé impose $u_C=0$, donc $E=R\\,i_0$ et $i_0=\\dfrac{E}{R}=\\dfrac{12}{1{,}0\\times 10^{3}}=1{,}2\\times 10^{-2}\\,\\text{A}=12\\,\\text{mA}$.' },
      { n: '2', text: 'En régime permanent, $i=0$.' },
    ],
    result: '$i_0=12\\,\\text{mA}$ ; $i=0$ en permanent.',
  },
  'rc-15': {
    steps: [
      { n: '1', text: '$t=6{,}0\\,\\text{ms}=3\\tau$, donc $u_C=9{,}0\\times\\mathrm{e}^{-3}\\approx 0{,}45\\,\\text{V}$.' },
    ],
    result: '$u_C\\approx 0{,}45\\,\\text{V}$.',
  },
  'rc-16': {
    steps: [
      { n: '1', text: '$E_{\\text{stockée}}=\\tfrac{1}{2}C\\,u^2=\\tfrac{1}{2}\\times 470\\times 10^{-6}\\times 15^2\\approx 5{,}3\\times 10^{-2}\\,\\text{J}=52{,}9\\,\\text{mJ}$.' },
    ],
    result: '$E\\approx 53\\,\\text{mJ}$.',
  },
  'rc-17': {
    steps: [
      { n: '1', text: '$E_{\\text{stockée}}=\\tfrac{1}{2}\\times 1000\\times 10^{-6}\\times 5{,}0^2=1{,}25\\times 10^{-2}\\,\\text{J}=12{,}5\\,\\text{mJ}$.' },
      { n: '2', text: 'Bien que $C$ soit environ deux fois plus grande qu\'en E1, l\'énergie est **quatre fois plus faible** : l\'énergie dépend du **carré** de la tension, qui pèse donc davantage que la capacité.' },
    ],
    result: '$E=12{,}5\\,\\text{mJ}$ (la tension pèse au carré).',
  },
  'rc-18': {
    steps: [
      { n: '1', text: 'On cherche $t$ tel que $E\\,\\mathrm{e}^{-t/\\tau}=\\dfrac{E}{2}$, soit $\\mathrm{e}^{-t/\\tau}=\\dfrac{1}{2}$.' },
      { n: '2', text: 'En passant au logarithme : $-\\dfrac{t}{\\tau}=\\ln\\dfrac{1}{2}=-\\ln 2$, d\'où $t=\\tau\\ln 2\\approx 0{,}69\\,\\tau$. Application : $t=2{,}0\\times 0{,}693\\approx 1{,}4\\,\\text{ms}$.' },
    ],
    result: '$t=\\tau\\ln 2\\approx 1{,}4\\,\\text{ms}$.',
  },
  'rc-19': {
    steps: [
      { n: 'a', text: 'Loi des mailles : $E=R\\,i+u_C$. Avec $i=C\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}$ : $E=RC\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}+u_C$, soit $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}+\\dfrac{1}{RC}u_C=\\dfrac{E}{RC}$.' },
      { n: 'b', text: 'Avec $u_C=E\\left(1-\\mathrm{e}^{-t/\\tau}\\right)$ : $\\dfrac{\\mathrm{d}u_C}{\\mathrm{d}t}=\\dfrac{E}{\\tau}\\mathrm{e}^{-t/\\tau}$. En reportant : $\\dfrac{E}{\\tau}\\mathrm{e}^{-t/\\tau}+\\dfrac{E}{\\tau}\\left(1-\\mathrm{e}^{-t/\\tau}\\right)=\\dfrac{E}{\\tau}=\\dfrac{E}{RC}$. De plus $u_C(0)=E(1-1)=0$ : la condition initiale est respectée.' },
      { n: 'c', text: '$\\tau=RC=10\\times 10^{3}\\times 4{,}7\\times 10^{-6}=4{,}7\\times 10^{-2}\\,\\text{s}=47\\,\\text{ms}$. Alors $u_C(\\tau)=6{,}0\\times 0{,}632\\approx 3{,}8\\,\\text{V}$ et $u_C(3\\tau)=6{,}0\\times 0{,}950\\approx 5{,}7\\,\\text{V}$.' },
      { n: 'd', text: '$i_0=\\dfrac{E}{R}=\\dfrac{6{,}0}{10\\times 10^{3}}=6{,}0\\times 10^{-4}\\,\\text{A}=0{,}60\\,\\text{mA}$. Charge finale : $q=C\\,E=4{,}7\\times 10^{-6}\\times 6{,}0\\approx 2{,}8\\times 10^{-5}\\,\\text{C}=28\\,\\mu\\text{C}$.' },
    ],
    result: '$\\tau=47\\,\\text{ms}$ ; $u_C(\\tau)\\approx 3{,}8\\,\\text{V}$ ; $i_0=0{,}60\\,\\text{mA}$ ; $q=28\\,\\mu\\text{C}$.',
  },
  'rc-20': {
    steps: [
      { n: 'a', text: 'D\'après $u_C=E\\left(1-\\mathrm{e}^{-t/\\tau}\\right)$, à $t=\\tau$ on a $u_C=E(1-\\mathrm{e}^{-1})\\approx 0{,}63\\,E$. La date à laquelle la tension atteint $63\\,\\%$ de $E$ est donc bien $\\tau$, soit $\\tau=47\\,\\text{ms}$.' },
      { n: 'b', text: '$u_C=0{,}632\\times 5{,}0\\approx 3{,}2\\,\\text{V}$.' },
      { n: 'c', text: '$C=\\dfrac{\\tau}{R}=\\dfrac{47\\times 10^{-3}}{4{,}7\\times 10^{3}}=1{,}0\\times 10^{-5}\\,\\text{F}=10\\,\\mu\\text{F}$.' },
      { n: 'd', text: 'Autre méthode : tracer la **tangente à l\'origine** ; elle coupe l\'asymptote $u_C=E$ à l\'abscisse $t=\\tau$. La charge est pratiquement terminée au bout de $5\\tau=235\\,\\text{ms}$.' },
    ],
    result: '$\\tau=47\\,\\text{ms}$ ; $u_C\\approx 3{,}2\\,\\text{V}$ ; $C=10\\,\\mu\\text{F}$ ; $5\\tau=235\\,\\text{ms}$.',
  },
  'rc-21': {
    steps: [
      { n: 'a', text: '$E_{\\text{stockée}}=\\tfrac{1}{2}C\\,U^2=\\tfrac{1}{2}\\times 470\\times 10^{-6}\\times 200^2=9{,}4\\,\\text{J}$.' },
      { n: 'b', text: '$\\tau=RC=2{,}0\\times 470\\times 10^{-6}=9{,}4\\times 10^{-4}\\,\\text{s}=0{,}94\\,\\text{ms}$.' },
      { n: 'c', text: 'La décharge dure $\\approx 5\\tau=4{,}7\\times 10^{-3}\\,\\text{s}$. La puissance moyenne vaut $P=\\dfrac{E_{\\text{stockée}}}{5\\tau}=\\dfrac{9{,}4}{4{,}7\\times 10^{-3}}=2{,}0\\times 10^{3}\\,\\text{W}$. Soit $2\\,\\text{kW}$ : une énergie modeste ($9{,}4\\,\\text{J}$) libérée en très peu de temps donne une puissance considérable — d\'où l\'éclair intense.' },
      { n: 'd', text: 'La charge se fait à travers une résistance **bien plus grande** (le circuit de charge), donc avec un $\\tau=RC$ bien plus grand : elle dure plusieurs secondes. La décharge, elle, se fait dans une résistance très faible ($2{,}0\\,\\Omega$) : $\\tau$ est minuscule, la décharge est quasi instantanée.' },
    ],
    result: '$W=9{,}4\\,\\text{J}$ ; $\\tau=0{,}94\\,\\text{ms}$ ; $P\\approx 2{,}0\\,\\text{kW}$.',
  },
};
