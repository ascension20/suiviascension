import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const OXYDO_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Un oxydant est une espèce qui…',
    options: [
      { label: 'a', text: 'capte des électrons' },
      { label: 'b', text: 'cède des électrons' },
      { label: 'c', text: 'capte un proton' },
      { label: 'd', text: 'cède un proton' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Le réducteur d\'un couple…',
    options: [
      { label: 'a', text: 'subit la réduction' },
      { label: 'b', text: 'subit l\'oxydation' },
      { label: 'c', text: 'ne réagit pas' },
      { label: 'd', text: 'capte des électrons' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La demi-équation du couple $\\text{Cu}^{2+}/\\text{Cu}$ est…',
    options: [
      { label: 'a', text: '$\\text{Cu}^{2+}+2\\,\\text{e}^-=\\text{Cu}$' },
      { label: 'b', text: '$\\text{Cu}^{2+}=\\text{Cu}+2\\,\\text{e}^-$' },
      { label: 'c', text: '$\\text{Cu}+2\\,\\text{e}^-=\\text{Cu}^{2+}$' },
      { label: 'd', text: '$\\text{Cu}^{2+}+\\text{e}^-=\\text{Cu}$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Dans une équation bilan d\'oxydoréduction, les électrons…',
    options: [
      { label: 'a', text: 'apparaissent à gauche' },
      { label: 'b', text: 'n\'apparaissent pas' },
      { label: 'c', text: 'apparaissent à droite' },
      { label: 'd', text: 'apparaissent des deux côtés' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'L\'anode est le siège…',
    options: [
      { label: 'a', text: 'de la réduction' },
      { label: 'b', text: 'de l\'oxydation' },
      { label: 'c', text: 'd\'aucune réaction' },
      { label: 'd', text: 'de la dissolution du pont salin' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Dans une pile, l\'anode est le pôle…',
    options: [
      { label: 'a', text: '$+$' },
      { label: 'b', text: '$-$' },
      { label: 'c', text: 'neutre' },
      { label: 'd', text: 'cela dépend du couple' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Dans une électrolyse, la cathode est le pôle…',
    options: [
      { label: 'a', text: '$+$' },
      { label: 'b', text: '$-$' },
      { label: 'c', text: 'neutre' },
      { label: 'd', text: 'variable' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'La constante de Faraday vaut environ…',
    options: [
      { label: 'a', text: '$9{,}65\\times 10^{4}\\,\\text{C·mol}^{-1}$' },
      { label: 'b', text: '$6{,}02\\times 10^{23}\\,\\text{mol}^{-1}$' },
      { label: 'c', text: '$1{,}60\\times 10^{-19}\\,\\text{C}$' },
      { label: 'd', text: '$96{,}5\\,\\text{C·mol}^{-1}$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'La charge débitée par une pile vaut…',
    options: [
      { label: 'a', text: '$Q=\\dfrac{I}{\\Delta t}$' },
      { label: 'b', text: '$Q=I\\,\\Delta t=n(\\text{e}^-)\\,F$' },
      { label: 'c', text: '$Q=\\dfrac{n(\\text{e}^-)}{F}$' },
      { label: 'd', text: '$Q=n(\\text{e}^-)+F$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Une électrolyse est une transformation…',
    options: [
      { label: 'a', text: 'spontanée' },
      { label: 'b', text: 'forcée' },
      { label: 'c', text: 'impossible' },
      { label: 'd', text: 'acide-base' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const OXYDO_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'oxydo-1',
    context: 'Oxydant : capte des électrons. Réducteur : cède des électrons.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir un oxydant et un réducteur. Lequel subit l\'oxydation ? Lequel subit la réduction ?' },
      ],
    }],
  },
  {
    id: 'oxydo-2',
    context: 'Demi-équation électronique : $\\text{Ox}+n\\,\\text{e}^-=\\text{Red}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire les demi-équations électroniques des couples $\\text{Cu}^{2+}/\\text{Cu}$, $\\text{Ag}^+/\\text{Ag}$ et $\\text{Fe}^{3+}/\\text{Fe}^{2+}$.' },
      ],
    }],
  },
  {
    id: 'oxydo-3',
    context: 'L\'oxydant est l\'espèce qui capte les électrons.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans le couple $\\text{I}_2/\\text{I}^-$, quelle espèce est l\'oxydant ? Écrire la demi-équation associée.' },
      ],
    }],
  },
  {
    id: 'oxydo-4',
    context: 'Équilibrer l\'élément, puis les charges avec des électrons.',
    parts: [{
      questions: [
        { n: 'a', text: 'Équilibrer la demi-équation du couple $\\text{I}_2/\\text{I}^-$ et vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-5',
    context: 'Couples $\\text{Zn}^{2+}/\\text{Zn}$ et $\\text{Cu}^{2+}/\\text{Cu}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction entre le zinc métallique et les ions $\\text{Cu}^{2+}$.' },
      ],
    }],
  },
  {
    id: 'oxydo-6',
    context: 'Charge débitée : $Q=I\\,\\Delta t$ (convertir $\\Delta t$ en secondes).',
    parts: [{
      questions: [
        { n: 'a', text: 'Une pile débite $I=0{,}20\\,\\text{A}$ pendant $2{,}0\\,\\text{h}$. Calculer la charge $Q$ écoulée.' },
      ],
    }],
  },
  {
    id: 'oxydo-7',
    context: 'Loi de Faraday : $Q=n(\\text{e}^-)\\,F$, avec $F=9{,}65\\times 10^{4}\\,\\text{C·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'À partir du résultat précédent ($Q=1{,}44\\times 10^{3}\\,\\text{C}$), calculer la quantité de matière d\'électrons échangés.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'oxydo-8',
    context: 'L\'oxydoréduction est à l\'électron ce que l\'acido-basique est au proton.',
    parts: [{
      questions: [
        { n: 'a', text: 'Établir le parallèle entre une réaction acide-base et une réaction d\'oxydoréduction : qu\'est-ce qui est échangé dans chaque cas ? Quel rôle joue l\'acide ? l\'oxydant ?' },
      ],
    }],
  },
  {
    id: 'oxydo-9',
    context: 'Milieu acide : équilibrer O avec $\\text{H}_2\\text{O}$, H avec $\\text{H}^+$, charges avec $\\text{e}^-$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Équilibrer, en milieu acide, la demi-équation du couple $\\text{MnO}_4^-/\\text{Mn}^{2+}$. Vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-10',
    context: 'Milieu acide. Le chrome du dichromate passe de $+\\text{VI}$ à $+\\text{III}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Équilibrer, en milieu acide, la demi-équation du couple $\\text{Cr}_2\\text{O}_7^{2-}/\\text{Cr}^{3+}$. Vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-11',
    context: 'Les soufres et oxygènes sont déjà équilibrés ; il ne reste que les charges.',
    parts: [{
      questions: [
        { n: 'a', text: 'Équilibrer la demi-équation du couple $\\text{S}_2\\text{O}_8^{2-}/\\text{SO}_4^{2-}$ et vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-12',
    context: 'Couples $\\text{Cu}^{2+}/\\text{Cu}$ et $\\text{Ag}^+/\\text{Ag}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une lame de cuivre est plongée dans une solution de nitrate d\'argent : un dépôt d\'argent apparaît. Écrire l\'équation de la réaction.' },
      ],
    }],
  },
  {
    id: 'oxydo-13',
    context: 'Loi de Faraday : $n(\\text{e}^-)=\\dfrac{Q}{F}$. $M(\\text{Ag})=108\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une pile mettant en jeu le couple $\\text{Ag}^+/\\text{Ag}$, une charge $Q=965\\,\\text{C}$ a circulé. Calculer la masse d\'argent déposée.' },
      ],
    }],
  },
  {
    id: 'oxydo-14',
    context: 'Anode : oxydation. Cathode : réduction.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une pile, où a lieu l\'oxydation ? Quel est le signe de cette électrode ? Dans quel sens circulent les électrons dans le circuit extérieur ? Et le courant ?' },
      ],
    }],
  },
  {
    id: 'oxydo-15',
    context: 'Le pont salin ferme le circuit et assure l\'électroneutralité.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quel est le rôle du pont salin dans une pile ? Que se passerait-il en son absence ?' },
      ],
    }],
  },
  {
    id: 'oxydo-16',
    context: 'Électrolyse : $Q=I\\,\\Delta t$ puis $n(\\text{e}^-)=Q/F$. $M(\\text{Cu})=63{,}5\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On réalise l\'électrolyse d\'une solution de sulfate de cuivre avec $I=1{,}5\\,\\text{A}$ pendant $20\\,\\text{min}$. Calculer la masse de cuivre déposée à la cathode.' },
      ],
    }],
  },
  {
    id: 'oxydo-17',
    context: 'L\'anode reste toujours le siège de l\'oxydation, la cathode de la réduction.',
    parts: [{
      questions: [
        { n: 'a', text: 'Comparer une pile et une électrolyse : nature de la transformation, conversion d\'énergie, polarité de l\'anode et de la cathode. Qu\'est-ce qui reste inchangé dans les deux cas ?' },
      ],
    }],
  },
  {
    id: 'oxydo-18',
    context: 'Une électrolyse est une transformation forcée par un générateur.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi la recharge d\'un accumulateur est une électrolyse.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'oxydo-19',
    context: 'Couples $\\text{MnO}_4^-/\\text{Mn}^{2+}$ (5 e⁻) et $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ (1 e⁻), en milieu acide.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction entre les ions $\\text{MnO}_4^-$ et les ions $\\text{Fe}^{2+}$ en milieu acide, en détaillant les demi-équations et les coefficients multiplicateurs. Vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-20',
    context: 'Couples $\\text{Cr}_2\\text{O}_7^{2-}/\\text{Cr}^{3+}$ (6 e⁻) et $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ (1 e⁻), en milieu acide.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction entre $\\text{Cr}_2\\text{O}_7^{2-}$ et $\\text{Fe}^{2+}$ en milieu acide, en détaillant les coefficients. Vérifier les charges.' },
      ],
    }],
  },
  {
    id: 'oxydo-21',
    context: 'Capacité : $Q_{\\max}=n(\\text{e}^-)\\,F$ ; durée : $\\Delta t=\\dfrac{Q_{\\max}}{I}$. $M(\\text{Zn})=65{,}4\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une pile Daniell contient une lame de zinc de $m=3{,}27\\,\\text{g}$, réactif limitant. Calculer la quantité maximale d\'électrons échangeables, la capacité $Q_{\\max}$ de la pile, puis sa durée de fonctionnement sous $I=100\\,\\text{mA}$.' },
      ],
    }],
  },
  {
    id: 'oxydo-22',
    context: 'La production d\'aluminium repose sur la réduction $\\text{Al}^{3+}+3\\,\\text{e}^-\\to\\text{Al}$. $M(\\text{Al})=27{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelle durée faut-il, sous $I=5{,}0\\,\\text{A}$, pour produire $1{,}0\\,\\text{g}$ d\'aluminium ?' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'oxydo-23',
    context: 'Une pile Daniell : lame de zinc de $m=2{,}00\\,\\text{g}$ dans du sulfate de zinc, lame de cuivre dans $V=100\\,\\text{mL}$ de sulfate de cuivre à $c=0{,}100\\,\\text{mol·L}^{-1}$. La pile débite $I=0{,}20\\,\\text{A}$. Données : $M(\\text{Zn})=65{,}4$, $M(\\text{Cu})=63{,}5\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire les deux demi-équations et l\'équation de la réaction de fonctionnement.' },
        { n: 'b', text: 'Identifier l\'anode et la cathode, préciser leur polarité, et indiquer le sens de circulation des électrons puis du courant.' },
        { n: 'c', text: 'Calculer les quantités de matière initiales de $\\text{Zn}$ et de $\\text{Cu}^{2+}$. En déduire le réactif limitant.' },
        { n: 'd', text: 'Calculer la quantité maximale d\'électrons échangeables, puis la capacité $Q_{\\max}$ de la pile.' },
        { n: 'e', text: 'En déduire la durée de fonctionnement de la pile, en heures.' },
        { n: 'f', text: 'Calculer la masse de cuivre déposée et la variation de masse de la lame de zinc en fin de fonctionnement.' },
      ],
    }],
  },
  {
    id: 'oxydo-24',
    context: 'On titre $V_A=20{,}0\\,\\text{mL}$ d\'une solution de sulfate de fer(II) par une solution de permanganate de potassium à $C_B=0{,}020\\,\\text{mol·L}^{-1}$, en milieu acide. L\'équivalence est repérée pour $V_E=12{,}5\\,\\text{mL}$. $M(\\text{Fe})=55{,}8\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction support et vérifier qu\'elle convient à un titrage.' },
        { n: 'b', text: 'Comment repère-t-on l\'équivalence ? Pourquoi ce titrage ne nécessite-t-il aucun indicateur coloré ?' },
        { n: 'c', text: 'Établir la relation à l\'équivalence, en tenant compte de la stœchiométrie.' },
        { n: 'd', text: 'Calculer la concentration $C_A$ de la solution de fer(II).' },
        { n: 'e', text: 'Calculer la masse de fer(II) contenue dans la prise d\'essai.' },
      ],
    }],
  },
  {
    id: 'oxydo-25',
    context: 'On chrome une pièce de surface $S=100\\,\\text{cm}^2$ par électrolyse d\'une solution contenant des ions $\\text{Cr}^{3+}$. Le courant vaut $I=5{,}0\\,\\text{A}$ et l\'opération dure $45\\,\\text{min}$. Données : $M(\\text{Cr})=52{,}0\\,\\text{g·mol}^{-1}$ ; masse volumique du chrome $\\rho=7{,}19\\,\\text{g·cm}^{-3}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire la demi-équation de réduction se produisant sur la pièce. La pièce est-elle l\'anode ou la cathode ? Quelle est sa polarité ?' },
        { n: 'b', text: 'Calculer la charge $Q$ ayant circulé, puis la quantité d\'électrons échangés.' },
        { n: 'c', text: 'En déduire la quantité de chrome déposé, puis sa masse.' },
        { n: 'd', text: 'Calculer le volume du dépôt, puis son épaisseur (en µm), supposée uniforme.' },
        { n: 'e', text: 'Pourquoi cette transformation ne peut-elle pas se produire spontanément ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const OXYDO_CORRECTIONS: Record<string, Correction> = {
  'oxydo-1': {
    steps: [
      { n: '1', text: 'Un **oxydant** capte des électrons ; un **réducteur** en cède.' },
      { n: '2', text: 'L\'oxydant **subit la réduction** (il gagne des électrons) et le réducteur **subit l\'oxydation** (il en perd). Les noms désignent le rôle joué, pas la transformation subie.' },
    ],
    result: 'Oxydant : capte des e⁻ (subit la réduction). Réducteur : cède des e⁻ (subit l\'oxydation).',
  },
  'oxydo-2': {
    steps: [
      { n: '1', text: '$\\text{Cu}^{2+}+2\\,\\text{e}^-=\\text{Cu}$.' },
      { n: '2', text: '$\\text{Ag}^++\\text{e}^-=\\text{Ag}$ ; $\\text{Fe}^{3+}+\\text{e}^-=\\text{Fe}^{2+}$.' },
    ],
    result: '$\\text{Cu}^{2+}+2\\,\\text{e}^-=\\text{Cu}$ ; $\\text{Ag}^++\\text{e}^-=\\text{Ag}$ ; $\\text{Fe}^{3+}+\\text{e}^-=\\text{Fe}^{2+}$.',
  },
  'oxydo-3': {
    steps: [
      { n: '1', text: 'L\'**oxydant** est $\\text{I}_2$ (il capte les électrons) ; $\\text{I}^-$ est le réducteur conjugué.' },
      { n: '2', text: '$\\text{I}_2+2\\,\\text{e}^-=2\\,\\text{I}^-$. Charges : $0-2=-2$ à gauche ; $2\\times(-1)=-2$ à droite. ✓' },
    ],
    result: 'Oxydant : $\\text{I}_2$ ; $\\text{I}_2+2\\,\\text{e}^-=2\\,\\text{I}^-$.',
  },
  'oxydo-4': {
    steps: [
      { n: '1', text: '$\\text{I}_2+2\\,\\text{e}^-=2\\,\\text{I}^-$. Charges : $0-2=-2$ ; $2\\times(-1)=-2$. ✓' },
    ],
    result: '$\\text{I}_2+2\\,\\text{e}^-=2\\,\\text{I}^-$.',
  },
  'oxydo-5': {
    steps: [
      { n: '1', text: '$\\text{Cu}^{2+}+2\\,\\text{e}^-=\\text{Cu}$ et $\\text{Zn}=\\text{Zn}^{2+}+2\\,\\text{e}^-$ : les nombres d\'électrons sont déjà égaux.' },
      { n: '2', text: '$\\text{Zn}+\\text{Cu}^{2+}\\to\\text{Zn}^{2+}+\\text{Cu}$. Charges : $0+2=+2$ à gauche ; $+2+0=+2$ à droite. ✓' },
    ],
    result: '$\\text{Zn}+\\text{Cu}^{2+}\\to\\text{Zn}^{2+}+\\text{Cu}$.',
  },
  'oxydo-6': {
    steps: [
      { n: '1', text: '$\\Delta t=2{,}0\\,\\text{h}=7{,}2\\times 10^{3}\\,\\text{s}$, donc $Q=I\\,\\Delta t=0{,}20\\times 7200=1{,}44\\times 10^{3}\\,\\text{C}$.' },
    ],
    result: '$Q\\approx 1{,}4\\times 10^{3}\\,\\text{C}$.',
  },
  'oxydo-7': {
    steps: [
      { n: '1', text: '$n(\\text{e}^-)=\\dfrac{Q}{F}=\\dfrac{1440}{9{,}65\\times 10^{4}}\\approx 1{,}5\\times 10^{-2}\\,\\text{mol}$.' },
    ],
    result: '$n(\\text{e}^-)\\approx 1{,}5\\times 10^{-2}\\,\\text{mol}$.',
  },
  'oxydo-8': {
    steps: [
      { n: '1', text: 'Dans une réaction acide-base, c\'est un **proton** $\\text{H}^+$ qui est échangé ; dans une réaction d\'**oxydoréduction**, ce sont des **électrons**.' },
      { n: '2', text: 'L\'**acide** (donneur de proton) est l\'analogue du **réducteur** (donneur d\'électrons) ; l\'**oxydant** (accepteur d\'électrons) est l\'analogue de la **base**. La méthode (couples, demi-équations, addition avec simplification de l\'espèce échangée) est rigoureusement la même.' },
    ],
    result: 'Proton (acide-base) ↔ électrons (oxydo) ; acide ↔ réducteur (donneur), base ↔ oxydant (accepteur).',
  },
  'oxydo-9': {
    steps: [
      { n: '1', text: '$\\text{MnO}_4^-=\\text{Mn}^{2+}$ → oxygènes : $+4\\,\\text{H}_2\\text{O}$ à droite → hydrogènes : $+8\\,\\text{H}^+$ à gauche → charges : $-1+8=+7$ à gauche contre $+2$ à droite, il faut $5\\,\\text{e}^-$ à gauche.' },
      { n: '2', text: '$\\text{MnO}_4^-+8\\,\\text{H}^++5\\,\\text{e}^-=\\text{Mn}^{2+}+4\\,\\text{H}_2\\text{O}$. Vérification : Mn 1=1 ; O 4=4 ; H 8=8 ; charges $-1+8-5=+2=+2$. ✓' },
    ],
    result: '$\\text{MnO}_4^-+8\\,\\text{H}^++5\\,\\text{e}^-=\\text{Mn}^{2+}+4\\,\\text{H}_2\\text{O}$.',
  },
  'oxydo-10': {
    steps: [
      { n: '1', text: '$\\text{Cr}_2\\text{O}_7^{2-}=2\\,\\text{Cr}^{3+}$ → oxygènes : $+7\\,\\text{H}_2\\text{O}$ à droite → hydrogènes : $+14\\,\\text{H}^+$ à gauche → charges : $-2+14=+12$ à gauche contre $2\\times 3=+6$ à droite, il faut $6\\,\\text{e}^-$ à gauche.' },
      { n: '2', text: '$\\text{Cr}_2\\text{O}_7^{2-}+14\\,\\text{H}^++6\\,\\text{e}^-=2\\,\\text{Cr}^{3+}+7\\,\\text{H}_2\\text{O}$. Vérification : Cr 2=2 ; O 7=7 ; H 14=14 ; charges $-2+14-6=+6=+6$. ✓' },
    ],
    result: '$\\text{Cr}_2\\text{O}_7^{2-}+14\\,\\text{H}^++6\\,\\text{e}^-=2\\,\\text{Cr}^{3+}+7\\,\\text{H}_2\\text{O}$.',
  },
  'oxydo-11': {
    steps: [
      { n: '1', text: '$\\text{S}_2\\text{O}_8^{2-}=2\\,\\text{SO}_4^{2-}$ : soufres ($2=2$) et oxygènes ($8=8$) déjà équilibrés. Charges : $-2$ à gauche contre $2\\times(-2)=-4$ à droite, il faut $2\\,\\text{e}^-$ à gauche.' },
      { n: '2', text: '$\\text{S}_2\\text{O}_8^{2-}+2\\,\\text{e}^-=2\\,\\text{SO}_4^{2-}$. Charges : $-2-2=-4=-4$. ✓' },
    ],
    result: '$\\text{S}_2\\text{O}_8^{2-}+2\\,\\text{e}^-=2\\,\\text{SO}_4^{2-}$.',
  },
  'oxydo-12': {
    steps: [
      { n: '1', text: 'Le cuivre est oxydé, les ions argent réduits : $\\text{Ag}^++\\text{e}^-=\\text{Ag}$ ($\\times 2$) ; $\\text{Cu}=\\text{Cu}^{2+}+2\\,\\text{e}^-$ ($\\times 1$).' },
      { n: '2', text: '$\\text{Cu}+2\\,\\text{Ag}^+\\to\\text{Cu}^{2+}+2\\,\\text{Ag}$. Charges : $0+2=+2$ ; $+2+0=+2$. ✓' },
    ],
    result: '$\\text{Cu}+2\\,\\text{Ag}^+\\to\\text{Cu}^{2+}+2\\,\\text{Ag}$.',
  },
  'oxydo-13': {
    steps: [
      { n: '1', text: '$n(\\text{e}^-)=\\dfrac{965}{9{,}65\\times 10^{4}}=1{,}00\\times 10^{-2}\\,\\text{mol}$.' },
      { n: '2', text: 'Comme $\\text{Ag}^++\\text{e}^-=\\text{Ag}$ (un seul électron), $n(\\text{Ag})=n(\\text{e}^-)=1{,}00\\times 10^{-2}\\,\\text{mol}$, d\'où $m=n\\times M=1{,}00\\times 10^{-2}\\times 108=1{,}08\\,\\text{g}$.' },
    ],
    result: '$m(\\text{Ag})=1{,}08\\,\\text{g}$.',
  },
  'oxydo-14': {
    steps: [
      { n: '1', text: 'L\'oxydation a lieu à l\'**anode**, qui est le pôle **−** d\'une pile.' },
      { n: '2', text: 'Les **électrons** vont de l\'anode vers la cathode dans le circuit extérieur ; le **courant**, de sens conventionnel opposé, va de la cathode ($+$) vers l\'anode ($-$) à l\'extérieur.' },
    ],
    result: 'Oxydation à l\'anode (pôle −) ; e⁻ : anode→cathode ; courant : cathode→anode.',
  },
  'oxydo-15': {
    steps: [
      { n: '1', text: 'Le **pont salin** assure l\'**électroneutralité** des deux solutions en laissant migrer les ions, et **ferme le circuit**.' },
      { n: '2', text: 'Sans lui, la demi-pile où a lieu l\'oxydation accumulerait des charges positives et l\'autre des charges négatives : cette accumulation s\'opposerait immédiatement au transfert d\'électrons et la pile **cesserait de débiter**.' },
    ],
    result: 'Il assure l\'électroneutralité et ferme le circuit ; sans lui, la pile s\'arrête.',
  },
  'oxydo-16': {
    steps: [
      { n: '1', text: '$\\Delta t=20\\,\\text{min}=1{,}2\\times 10^{3}\\,\\text{s}$ ; $Q=I\\,\\Delta t=1{,}5\\times 1200=1{,}8\\times 10^{3}\\,\\text{C}$, donc $n(\\text{e}^-)=\\dfrac{1800}{9{,}65\\times 10^{4}}\\approx 1{,}9\\times 10^{-2}\\,\\text{mol}$.' },
      { n: '2', text: '$\\text{Cu}^{2+}+2\\,\\text{e}^-\\to\\text{Cu}$ : $n(\\text{Cu})=\\dfrac{n(\\text{e}^-)}{2}\\approx 9{,}3\\times 10^{-3}\\,\\text{mol}$, donc $m=9{,}3\\times 10^{-3}\\times 63{,}5\\approx 0{,}59\\,\\text{g}$.' },
    ],
    result: '$m(\\text{Cu})\\approx 0{,}59\\,\\text{g}$.',
  },
  'oxydo-17': {
    steps: [
      { n: '1', text: '**Pile** : transformation **spontanée**, énergie chimique → électrique, anode = pôle −, cathode = pôle +. **Électrolyse** : transformation **forcée**, énergie électrique → chimique, anode = pôle +, cathode = pôle −.' },
      { n: '2', text: 'Ce qui **ne change pas** : l\'anode reste le siège de l\'**oxydation** et la cathode celui de la **réduction**. Seule la polarité s\'inverse.' },
    ],
    result: 'Pile spontanée (anode −), électrolyse forcée (anode +) ; anode = oxydation, cathode = réduction (invariant).',
  },
  'oxydo-18': {
    steps: [
      { n: '1', text: 'Lors de sa décharge, un accumulateur fonctionne en **pile** : la réaction s\'y produit spontanément.' },
      { n: '2', text: 'Pour le recharger, on impose avec un générateur un courant en sens inverse, ce qui **force** la réaction à se produire dans le sens contraire de son évolution spontanée et régénère les réactifs : c\'est bien la définition d\'une **électrolyse**.' },
    ],
    result: 'La recharge impose un courant inverse qui force la réaction : c\'est une électrolyse.',
  },
  'oxydo-19': {
    steps: [
      { n: '1', text: '$\\text{MnO}_4^-+8\\,\\text{H}^++5\\,\\text{e}^-=\\text{Mn}^{2+}+4\\,\\text{H}_2\\text{O}$ ($\\times 1$) ; $\\text{Fe}^{2+}=\\text{Fe}^{3+}+\\text{e}^-$ ($\\times 5$).' },
      { n: '2', text: 'En additionnant, les $5\\,\\text{e}^-$ se simplifient : $\\text{MnO}_4^-+5\\,\\text{Fe}^{2+}+8\\,\\text{H}^+\\to\\text{Mn}^{2+}+5\\,\\text{Fe}^{3+}+4\\,\\text{H}_2\\text{O}$. Charges : $-1+10+8=+17$ ; $+2+15=+17$. ✓' },
    ],
    result: '$\\text{MnO}_4^-+5\\,\\text{Fe}^{2+}+8\\,\\text{H}^+\\to\\text{Mn}^{2+}+5\\,\\text{Fe}^{3+}+4\\,\\text{H}_2\\text{O}$.',
  },
  'oxydo-20': {
    steps: [
      { n: '1', text: '$\\text{Cr}_2\\text{O}_7^{2-}+14\\,\\text{H}^++6\\,\\text{e}^-=2\\,\\text{Cr}^{3+}+7\\,\\text{H}_2\\text{O}$ ($\\times 1$) ; $\\text{Fe}^{2+}=\\text{Fe}^{3+}+\\text{e}^-$ ($\\times 6$).' },
      { n: '2', text: '$\\text{Cr}_2\\text{O}_7^{2-}+6\\,\\text{Fe}^{2+}+14\\,\\text{H}^+\\to 2\\,\\text{Cr}^{3+}+6\\,\\text{Fe}^{3+}+7\\,\\text{H}_2\\text{O}$. Charges : $-2+12+14=+24$ ; $+6+18=+24$. ✓' },
    ],
    result: '$\\text{Cr}_2\\text{O}_7^{2-}+6\\,\\text{Fe}^{2+}+14\\,\\text{H}^+\\to 2\\,\\text{Cr}^{3+}+6\\,\\text{Fe}^{3+}+7\\,\\text{H}_2\\text{O}$.',
  },
  'oxydo-21': {
    steps: [
      { n: '1', text: '$n(\\text{Zn})=\\dfrac{3{,}27}{65{,}4}=5{,}00\\times 10^{-2}\\,\\text{mol}$. D\'après $\\text{Zn}=\\text{Zn}^{2+}+2\\,\\text{e}^-$ : $n(\\text{e}^-)=2\\times 5{,}00\\times 10^{-2}=0{,}100\\,\\text{mol}$.' },
      { n: '2', text: '$Q_{\\max}=n(\\text{e}^-)\\times F=0{,}100\\times 9{,}65\\times 10^{4}=9{,}65\\times 10^{3}\\,\\text{C}$. $\\Delta t=\\dfrac{Q_{\\max}}{I}=\\dfrac{9{,}65\\times 10^{3}}{0{,}100}=9{,}65\\times 10^{4}\\,\\text{s}\\approx 26{,}8\\,\\text{h}$.' },
    ],
    result: '$n(\\text{e}^-)=0{,}100\\,\\text{mol}$ ; $Q_{\\max}=9{,}65\\times 10^{3}\\,\\text{C}$ ; $\\Delta t\\approx 27\\,\\text{h}$.',
  },
  'oxydo-22': {
    steps: [
      { n: '1', text: '$n(\\text{Al})=\\dfrac{1{,}0}{27{,}0}\\approx 3{,}7\\times 10^{-2}\\,\\text{mol}$. D\'après $\\text{Al}^{3+}+3\\,\\text{e}^-\\to\\text{Al}$ : $n(\\text{e}^-)=3\\times 3{,}7\\times 10^{-2}\\approx 0{,}111\\,\\text{mol}$.' },
      { n: '2', text: '$Q=n(\\text{e}^-)\\times F=0{,}111\\times 9{,}65\\times 10^{4}\\approx 1{,}07\\times 10^{4}\\,\\text{C}$, d\'où $\\Delta t=\\dfrac{Q}{I}=\\dfrac{1{,}07\\times 10^{4}}{5{,}0}\\approx 2{,}1\\times 10^{3}\\,\\text{s}\\approx 36\\,\\text{min}$.' },
    ],
    result: '$\\Delta t\\approx 2{,}1\\times 10^{3}\\,\\text{s}\\approx 36\\,\\text{min}$.',
  },
  'oxydo-23': {
    steps: [
      { n: 'a', text: '$\\text{Zn}=\\text{Zn}^{2+}+2\\,\\text{e}^-$ (oxydation) et $\\text{Cu}^{2+}+2\\,\\text{e}^-=\\text{Cu}$ (réduction), d\'où $\\text{Zn}+\\text{Cu}^{2+}\\to\\text{Zn}^{2+}+\\text{Cu}$.' },
      { n: 'b', text: 'La lame de **zinc** est l\'**anode** (oxydation), donc le pôle **−** ; la lame de **cuivre** est la **cathode** (réduction), pôle **+**. Les électrons vont du zinc vers le cuivre dans le circuit extérieur ; le courant circule en sens inverse, du cuivre vers le zinc.' },
      { n: 'c', text: '$n(\\text{Zn})=\\dfrac{2{,}00}{65{,}4}\\approx 3{,}06\\times 10^{-2}\\,\\text{mol}$ ; $n(\\text{Cu}^{2+})=c\\times V=0{,}100\\times 0{,}100=1{,}00\\times 10^{-2}\\,\\text{mol}$. La stœchiométrie étant $1{:}1$ : $1{,}00\\times 10^{-2}<3{,}06\\times 10^{-2}$, le réactif limitant est $\\text{Cu}^{2+}$.' },
      { n: 'd', text: '$n(\\text{e}^-)=2\\times n(\\text{Cu}^{2+})=2{,}00\\times 10^{-2}\\,\\text{mol}$, d\'où $Q_{\\max}=2{,}00\\times 10^{-2}\\times 9{,}65\\times 10^{4}=1{,}93\\times 10^{3}\\,\\text{C}$.' },
      { n: 'e', text: '$\\Delta t=\\dfrac{Q_{\\max}}{I}=\\dfrac{1{,}93\\times 10^{3}}{0{,}20}=9{,}65\\times 10^{3}\\,\\text{s}\\approx 2{,}7\\,\\text{h}$.' },
      { n: 'f', text: '$n(\\text{Cu})_{\\text{déposé}}=n(\\text{Cu}^{2+})=1{,}00\\times 10^{-2}\\,\\text{mol}$, soit $m=1{,}00\\times 10^{-2}\\times 63{,}5\\approx 0{,}635\\,\\text{g}$. Le zinc consommé vaut $1{,}00\\times 10^{-2}\\,\\text{mol}$, soit une perte de $1{,}00\\times 10^{-2}\\times 65{,}4\\approx 0{,}654\\,\\text{g}$ (il en restait $2{,}00-0{,}654\\approx 1{,}35\\,\\text{g}$).' },
    ],
    result: 'Limitant : $\\text{Cu}^{2+}$ ; $Q_{\\max}=1{,}93\\times 10^{3}\\,\\text{C}$ ; $\\Delta t\\approx 2{,}7\\,\\text{h}$ ; $m(\\text{Cu})\\approx 0{,}635\\,\\text{g}$, $0{,}654\\,\\text{g}$ de Zn consommés.',
  },
  'oxydo-24': {
    steps: [
      { n: 'a', text: '$\\text{MnO}_4^-+5\\,\\text{Fe}^{2+}+8\\,\\text{H}^+\\to\\text{Mn}^{2+}+5\\,\\text{Fe}^{3+}+4\\,\\text{H}_2\\text{O}$. Cette réaction est **totale**, **rapide** et **unique** : elle convient à un titrage.' },
      { n: 'b', text: 'Les ions $\\text{MnO}_4^-$ sont **violets**, alors que $\\text{Mn}^{2+}$ est quasi incolore. Avant l\'équivalence, le permanganate versé est immédiatement consommé et la solution reste décolorée. Dès la première goutte en excès, la teinte violette persiste : c\'est l\'équivalence. Le réactif titrant est donc son **propre indicateur** — aucun indicateur coloré n\'est nécessaire.' },
      { n: 'c', text: 'À l\'équivalence, proportions stœchiométriques $1{:}5$ : $\\dfrac{n(\\text{MnO}_4^-)}{1}=\\dfrac{n(\\text{Fe}^{2+})}{5}\\Rightarrow n(\\text{Fe}^{2+})=5\\,C_B V_E$.' },
      { n: 'd', text: '$n(\\text{MnO}_4^-)=C_B V_E=0{,}020\\times 12{,}5\\times 10^{-3}=2{,}50\\times 10^{-4}\\,\\text{mol}$, donc $n(\\text{Fe}^{2+})=5\\times 2{,}50\\times 10^{-4}=1{,}25\\times 10^{-3}\\,\\text{mol}$ et $C_A=\\dfrac{n(\\text{Fe}^{2+})}{V_A}=\\dfrac{1{,}25\\times 10^{-3}}{20{,}0\\times 10^{-3}}=6{,}25\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      { n: 'e', text: '$m=n\\times M=1{,}25\\times 10^{-3}\\times 55{,}8\\approx 7{,}0\\times 10^{-2}\\,\\text{g}=70\\,\\text{mg}$.' },
    ],
    result: '$C_A=6{,}25\\times 10^{-2}\\,\\text{mol·L}^{-1}$ ; $m(\\text{Fe}^{2+})\\approx 70\\,\\text{mg}$ ; équivalence : persistance du violet.',
  },
  'oxydo-25': {
    steps: [
      { n: 'a', text: '$\\text{Cr}^{3+}+3\\,\\text{e}^-\\to\\text{Cr}$. C\'est une **réduction** : la pièce est donc la **cathode**. En électrolyse, la cathode est reliée au pôle **−** du générateur.' },
      { n: 'b', text: '$\\Delta t=45\\,\\text{min}=2{,}70\\times 10^{3}\\,\\text{s}$ ; $Q=I\\,\\Delta t=5{,}0\\times 2700=1{,}35\\times 10^{4}\\,\\text{C}$. $n(\\text{e}^-)=\\dfrac{Q}{F}=\\dfrac{1{,}35\\times 10^{4}}{9{,}65\\times 10^{4}}\\approx 0{,}140\\,\\text{mol}$.' },
      { n: 'c', text: '$n(\\text{Cr})=\\dfrac{n(\\text{e}^-)}{3}\\approx 4{,}66\\times 10^{-2}\\,\\text{mol}$, d\'où $m=n\\times M=4{,}66\\times 10^{-2}\\times 52{,}0\\approx 2{,}4\\,\\text{g}$.' },
      { n: 'd', text: '$V=\\dfrac{m}{\\rho}=\\dfrac{2{,}43}{7{,}19}\\approx 0{,}337\\,\\text{cm}^3$. L\'épaisseur vaut $e=\\dfrac{V}{S}=\\dfrac{0{,}337}{100}\\approx 3{,}4\\times 10^{-3}\\,\\text{cm}=34\\,\\mu\\text{m}$ — un ordre de grandeur réaliste pour un chromage.' },
      { n: 'e', text: 'La réaction $\\text{Cr}^{3+}+3\\,\\text{e}^-\\to\\text{Cr}$ n\'est **pas spontanée** dans ces conditions : le sens spontané serait l\'inverse. Il faut donc un générateur pour imposer le passage du courant et **forcer** la transformation — c\'est le principe de l\'électrolyse.' },
    ],
    result: 'Cathode (pôle −) ; $Q=1{,}35\\times 10^{4}\\,\\text{C}$ ; $n(\\text{Cr})\\approx 4{,}7\\times 10^{-2}\\,\\text{mol}$ ; $m\\approx 2{,}4\\,\\text{g}$ ; $e\\approx 34\\,\\mu\\text{m}$.',
  },
};
