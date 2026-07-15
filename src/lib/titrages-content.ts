import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const TITRAGES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le réactif titrant se trouve…',
    options: [
      { label: 'a', text: 'dans le bécher' },
      { label: 'b', text: 'dans la burette' },
      { label: 'c', text: 'dans la fiole' },
      { label: 'd', text: 'dans la pipette' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'La réaction support d\'un titrage doit être…',
    options: [
      { label: 'a', text: 'lente et totale' },
      { label: 'b', text: 'totale, rapide et unique' },
      { label: 'c', text: 'limitée' },
      { label: 'd', text: 'réversible' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'À l\'équivalence, les réactifs sont…',
    options: [
      { label: 'a', text: 'en excès' },
      { label: 'b', text: 'dans les proportions stœchiométriques' },
      { label: 'c', text: 'de même concentration' },
      { label: 'd', text: 'de même volume' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Pour une réaction $1{:}1$, la relation à l\'équivalence est…',
    options: [
      { label: 'a', text: '$C_A V_A=C_B V_E$' },
      { label: 'b', text: '$C_A V_E=C_B V_A$' },
      { label: 'c', text: '$C_A+C_B=V_A+V_E$' },
      { label: 'd', text: '$\\dfrac{C_A}{V_A}=\\dfrac{C_B}{V_E}$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'Le point d\'équivalence sur une courbe pH-métrique est…',
    options: [
      { label: 'a', text: 'le maximum' },
      { label: 'b', text: 'le point d\'inflexion' },
      { label: 'c', text: 'l\'origine' },
      { label: 'd', text: 'le minimum' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'La courbe $\\dfrac{\\mathrm{d}\\text{pH}}{\\mathrm{d}V}$ présente en $V_E$…',
    options: [
      { label: 'a', text: 'un minimum' },
      { label: 'b', text: 'un maximum' },
      { label: 'c', text: 'un zéro' },
      { label: 'd', text: 'une asymptote' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Pour un titrage acide fort / base forte, $\\text{pH}_E$ vaut…',
    options: [
      { label: 'a', text: '$7{,}0$' },
      { label: 'b', text: 'toujours $>7$' },
      { label: 'c', text: 'toujours $<7$' },
      { label: 'd', text: '$\\text{p}K_a$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'À la demi-équivalence d\'un acide faible…',
    options: [
      { label: 'a', text: '$\\text{pH}=7$' },
      { label: 'b', text: '$\\text{pH}=\\text{p}K_a$' },
      { label: 'c', text: '$\\text{pH}=\\text{p}K_e$' },
      { label: 'd', text: '$\\text{pH}=0$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Un indicateur coloré convient si sa zone de virage…',
    options: [
      { label: 'a', text: 'contient $\\text{pH}=7$' },
      { label: 'b', text: 'est incluse dans le saut de pH' },
      { label: 'c', text: 'est très large' },
      { label: 'd', text: 'vaut $\\text{p}K_a$ de l\'acide titré' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'En conductimétrie, $V_E$ se lit…',
    options: [
      { label: 'a', text: 'au maximum de $\\sigma$' },
      { label: 'b', text: 'à l\'intersection des deux droites' },
      { label: 'c', text: 'quand $\\sigma=0$' },
      { label: 'd', text: 'au point d\'inflexion' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const TITRAGES_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'titrages-1',
    context: 'Le réactif titrant est dans la burette (concentration connue), le réactif titré dans le bécher (concentration inconnue).',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir « réactif titrant » et « réactif titré ». Lequel se trouve dans la burette ? Lequel a une concentration inconnue ?' },
      ],
    }],
  },
  {
    id: 'titrages-2',
    context: 'La réaction support doit vérifier trois conditions.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelles sont les trois propriétés que doit vérifier la réaction support d\'un titrage ? Expliquer brièvement pourquoi chacune est nécessaire.' },
      ],
    }],
  },
  {
    id: 'titrages-3',
    context: 'Relation à l\'équivalence (cas $1{:}1$) : $C_A V_A=C_B V_E$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On titre $V_A=20{,}0\\,\\text{mL}$ d\'une solution d\'acide chlorhydrique à $C_A=0{,}10\\,\\text{mol·L}^{-1}$ par une solution de soude à $C_B=0{,}20\\,\\text{mol·L}^{-1}$. Calculer $V_E$.' },
      ],
    }],
  },
  {
    id: 'titrages-4',
    context: 'De $C_A V_A=C_B V_E$ on tire $C_A=\\dfrac{C_B V_E}{V_A}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un titrage de $V_A=25{,}0\\,\\text{mL}$ d\'acide par de la soude à $C_B=0{,}10\\,\\text{mol·L}^{-1}$ donne $V_E=15{,}0\\,\\text{mL}$. Calculer $C_A$.' },
      ],
    }],
  },
  {
    id: 'titrages-5',
    context: 'La courbe $\\text{pH}=f(V)$ présente trois zones.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire l\'allure d\'une courbe $\\text{pH}=f(V)$ lors d\'un titrage acide fort / base forte. Que vaut le pH à l\'équivalence ?' },
      ],
    }],
  },
  {
    id: 'titrages-6',
    context: 'La demi-équivalence est atteinte pour $V=\\dfrac{V_E}{2}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Lors d\'un titrage, $V_E=14{,}0\\,\\text{mL}$. À quel volume se situe la demi-équivalence ? Que lit-on à ce point ?' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'titrages-7',
    context: 'Avant l\'équivalence, un réactif est limitant ; après, l\'autre est en excès.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir l\'équivalence d\'un titrage. Quel réactif est limitant avant l\'équivalence ? Après ?' },
      ],
    }],
  },
  {
    id: 'titrages-8',
    context: 'Montage d\'un titrage suivi par pH-métrie.',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer le matériel nécessaire à un titrage suivi par pH-métrie. À quoi sert l\'agitateur magnétique ?' },
      ],
    }],
  },
  {
    id: 'titrages-9',
    context: 'De $C_A V_A=C_B V_E$ on tire $C_B=\\dfrac{C_A V_A}{V_E}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On titre $V_A=10{,}0\\,\\text{mL}$ d\'acide à $C_A=0{,}050\\,\\text{mol·L}^{-1}$ par une base de concentration inconnue. L\'équivalence est atteinte pour $V_E=12{,}5\\,\\text{mL}$. Calculer $C_B$.' },
      ],
    }],
  },
  {
    id: 'titrages-10',
    context: '$V_E=\\dfrac{C_A V_A}{C_B}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On titre $V_A=20{,}0\\,\\text{mL}$ d\'une solution à $C_A=0{,}15\\,\\text{mol·L}^{-1}$ par un titrant à $C_B=0{,}25\\,\\text{mol·L}^{-1}$. Calculer le volume équivalent.' },
      ],
    }],
  },
  {
    id: 'titrages-11',
    context: 'L\'équivalence porte sur les quantités de matière, pas sur les concentrations dans le bécher.',
    parts: [{
      questions: [
        { n: 'a', text: 'Avant le titrage, on ajoute $50\\,\\text{mL}$ d\'eau distillée dans le bécher pour immerger la sonde. Cela modifie-t-il $V_E$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'titrages-12',
    context: 'Le point d\'équivalence est le point d\'inflexion de la courbe pH-métrique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire la méthode des tangentes permettant de repérer le point d\'équivalence sur une courbe pH-métrique.' },
      ],
    }],
  },
  {
    id: 'titrages-13',
    context: 'On peut tracer la dérivée $\\dfrac{\\mathrm{d}\\text{pH}}{\\mathrm{d}V}=g(V)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelle est l\'allure de la courbe $\\dfrac{\\mathrm{d}\\text{pH}}{\\mathrm{d}V}=g(V)$ ? Comment y lit-on $V_E$ ? Quel avantage par rapport aux tangentes ?' },
      ],
    }],
  },
  {
    id: 'titrages-14',
    context: 'À la demi-équivalence, $[\\text{AH}]=\\left[\\text{A}^-\\right]$. Relation de Henderson : $\\text{pH}=\\text{p}K_a+\\log\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer qu\'à la demi-équivalence du titrage d\'un acide faible $\\text{AH}$ par une base forte, on a $\\text{pH}=\\text{p}K_a$. On utilisera la relation de Henderson.' },
      ],
    }],
  },
  {
    id: 'titrages-15',
    context: 'Le pH lu à la demi-équivalence donne le $\\text{p}K_a$. Données : $\\text{p}K_a$(HCOOH) = 3,8 ; (CH₃COOH) = 4,8 ; (NH₄⁺) = 9,2.',
    parts: [{
      questions: [
        { n: 'a', text: 'Lors du titrage d\'un acide faible, $V_E=20{,}0\\,\\text{mL}$ et le pH lu à $10{,}0\\,\\text{mL}$ vaut $4{,}8$. Identifier l\'acide parmi ceux du tableau de données.' },
      ],
    }],
  },
  {
    id: 'titrages-16',
    context: 'Comparaison acide fort / acide faible (même concentration, même titrant).',
    parts: [{
      questions: [
        { n: 'a', text: 'Citer trois différences entre la courbe de titrage d\'un acide fort et celle d\'un acide faible (même concentration, même titrant).' },
      ],
    }],
  },
  {
    id: 'titrages-17',
    context: 'La zone de virage de l\'indicateur doit être incluse dans le saut de pH. Indicateurs : hélianthine 3,1–4,4 ; BBT 6,0–7,6 ; phénolphtaléine 8,2–10,0.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour un titrage acide fort / base forte ($\\text{pH}_E=7{,}0$), quel indicateur choisir parmi ceux du tableau ? Justifier le critère de choix.' },
      ],
    }],
  },
  {
    id: 'titrages-18',
    context: 'La conductivité évolue de façon affine par morceaux.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi la courbe $\\sigma=f(V)$ d\'un titrage est constituée de segments de droite. Comment y repère-t-on $V_E$ ?' },
      ],
    }],
  },
  {
    id: 'titrages-19',
    context: 'Masse : $m=n\\times M$, avec $M(\\text{CH}_3\\text{COOH})=60{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un titrage donne $n=1{,}5\\times 10^{-3}\\,\\text{mol}$ d\'acide éthanoïque dans la prise d\'essai. Calculer la masse correspondante.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'titrages-20',
    context: 'Le pH à l\'équivalence dépend de la nature des réactifs.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le pH à l\'équivalence vaut-il toujours $7$ ? Discuter les trois cas : acide fort/base forte, acide faible/base forte, base faible/acide fort.' },
      ],
    }],
  },
  {
    id: 'titrages-21',
    context: 'Si la solution a été diluée d\'un facteur $f$ : $C_{\\text{mère}}=f\\times C_{\\text{diluée}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution commerciale est diluée $20$ fois avant titrage. Le titrage de la solution diluée donne $C=0{,}045\\,\\text{mol·L}^{-1}$. Calculer la concentration de la solution commerciale.' },
      ],
    }],
  },
  {
    id: 'titrages-22',
    context: 'Relation générale : $\\dfrac{n_A}{a}=\\dfrac{n_B}{b}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On titre $V_A=20{,}0\\,\\text{mL}$ d\'acide sulfurique par de la soude à $C_B=0{,}10\\,\\text{mol·L}^{-1}$, selon $\\text{H}_2\\text{SO}_4+2\\,\\text{NaOH}\\to\\text{Na}_2\\text{SO}_4+2\\,\\text{H}_2\\text{O}$. L\'équivalence est à $V_E=16{,}0\\,\\text{mL}$. Calculer $C_A$. Que trouverait-on à tort en appliquant $C_A V_A=C_B V_E$ ?' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'titrages-23',
    context: 'Un vinaigre commercial est dilué $10$ fois. On titre $V_A=20{,}0\\,\\text{mL}$ de la solution diluée par de la soude à $C_B=0{,}100\\,\\text{mol·L}^{-1}$ (suivi pH-métrique). L\'équivalence est obtenue pour $V_E=12{,}5\\,\\text{mL}$. L\'acidité est due à l\'acide éthanoïque ($\\text{p}K_a=4{,}8$, $M=60{,}0\\,\\text{g·mol}^{-1}$). Le degré d\'acidité est la masse (en g) d\'acide éthanoïque dans $100\\,\\text{mL}$ de vinaigre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction support et vérifier qu\'elle convient à un titrage.' },
        { n: 'b', text: 'Calculer la quantité d\'acide éthanoïque dans la prise d\'essai, puis la concentration $C_{\\text{dil}}$ de la solution diluée.' },
        { n: 'c', text: 'En déduire la concentration $C$ du vinaigre commercial.' },
        { n: 'd', text: 'Calculer le degré d\'acidité du vinaigre.' },
        { n: 'e', text: 'À quel volume se situe la demi-équivalence ? Quel pH y lit-on ?' },
        { n: 'f', text: 'Le pH à l\'équivalence est-il supérieur ou inférieur à $7$ ? En déduire l\'indicateur coloré le mieux adapté.' },
      ],
    }],
  },
  {
    id: 'titrages-24',
    context: 'On titre $V_A=20{,}0\\,\\text{mL}$ d\'une solution d\'un acide faible inconnu par de la soude à $C_B=0{,}050\\,\\text{mol·L}^{-1}$. La courbe pH-métrique donne $V_E=16{,}0\\,\\text{mL}$, et le pH lu à $V=8{,}0\\,\\text{mL}$ vaut $3{,}8$. Données : $\\text{p}K_a$(HCOOH) = 3,8 ; (CH₃COOH) = 4,8 ; (NH₄⁺) = 9,2.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que $V=8{,}0\\,\\text{mL}$ correspond à la demi-équivalence.' },
        { n: 'b', text: 'En déduire le $\\text{p}K_a$ du couple, puis identifier l\'acide à l\'aide du tableau de données.' },
        { n: 'c', text: 'Calculer la concentration $C_A$ de la solution titrée.' },
        { n: 'd', text: 'Justifier, sans calcul, que le pH à l\'équivalence est supérieur à $7$.' },
      ],
    }],
  },
  {
    id: 'titrages-25',
    context: 'On titre $V_A=25{,}0\\,\\text{mL}$ d\'une solution d\'acide sulfurique par de la soude à $C_B=0{,}100\\,\\text{mol·L}^{-1}$ (suivi conductimétrique). Équation : $\\text{H}_2\\text{SO}_4+2\\,\\text{NaOH}\\to\\text{Na}_2\\text{SO}_4+2\\,\\text{H}_2\\text{O}$. La courbe $\\sigma=f(V)$ est décroissante puis croissante, la rupture de pente à $V_E=15{,}0\\,\\text{mL}$. Donnée : $M(\\text{H}_2\\text{SO}_4)=98{,}0\\,\\text{g·mol}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi la conductivité décroît avant l\'équivalence, puis croît après.' },
        { n: 'b', text: 'Écrire la relation à l\'équivalence en tenant compte de la stœchiométrie. En déduire $C_A$.' },
        { n: 'c', text: 'Quelle valeur obtiendrait-on en appliquant, à tort, $C_A V_A=C_B V_E$ ? Commenter l\'ampleur de l\'erreur.' },
        { n: 'd', text: 'Calculer la masse d\'acide sulfurique contenue dans la prise d\'essai.' },
        { n: 'e', text: 'Pourquoi la conductimétrie est-elle ici préférable à un indicateur coloré ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const TITRAGES_CORRECTIONS: Record<string, Correction> = {
  'titrages-1': {
    steps: [
      { n: '1', text: 'Le **réactif titrant** est celui de concentration **connue**, placé dans la **burette** et versé progressivement.' },
      { n: '2', text: 'Le **réactif titré** est celui de concentration **inconnue** (celle que l\'on cherche), placé dans le **bécher**.' },
    ],
    result: 'Titrant : connu, burette. Titré : inconnu, bécher.',
  },
  'titrages-2': {
    steps: [
      { n: '1', text: '**Totale** : sinon une partie du réactif titré subsisterait à l\'équivalence, et le compte serait faussé.' },
      { n: '2', text: '**Rapide** : sinon la mesure (pH, couleur, $\\sigma$) ne refléterait pas l\'état réel du mélange au moment de la lecture.' },
      { n: '3', text: '**Unique** : sinon une partie du titrant serait consommée par une autre réaction, faussant $V_E$.' },
    ],
    result: 'Totale, rapide, unique.',
  },
  'titrages-3': {
    steps: [
      { n: '1', text: '$C_A V_A=C_B V_E\\Rightarrow V_E=\\dfrac{C_A V_A}{C_B}=\\dfrac{0{,}10\\times 20{,}0}{0{,}20}=10{,}0\\,\\text{mL}$.' },
    ],
    result: '$V_E=10{,}0\\,\\text{mL}$.',
  },
  'titrages-4': {
    steps: [
      { n: '1', text: '$C_A=\\dfrac{C_B V_E}{V_A}=\\dfrac{0{,}10\\times 15{,}0}{25{,}0}=0{,}060\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$C_A=0{,}060\\,\\text{mol·L}^{-1}$.',
  },
  'titrages-5': {
    steps: [
      { n: '1', text: 'La courbe présente **trois zones** : variation lente, puis **saut de pH** brutal au voisinage de $V_E$, puis de nouveau variation lente.' },
      { n: '2', text: 'Pour un titrage acide fort / base forte, $\\text{pH}_E=7{,}0$ : le sel formé (par ex. NaCl) est neutre.' },
    ],
    result: 'Trois zones (lente-saut-lente) ; $\\text{pH}_E=7{,}0$ (sel neutre).',
  },
  'titrages-6': {
    steps: [
      { n: '1', text: 'La demi-équivalence est à $V=\\dfrac{V_E}{2}=\\dfrac{14{,}0}{2}=7{,}0\\,\\text{mL}$.' },
      { n: '2', text: 'Le pH lu à ce volume donne directement le $\\text{p}K_a$ du couple titré.' },
    ],
    result: '$V=7{,}0\\,\\text{mL}$ ; on y lit $\\text{pH}=\\text{p}K_a$.',
  },
  'titrages-7': {
    steps: [
      { n: '1', text: 'L\'**équivalence** est l\'instant où les réactifs ont été introduits dans les proportions **stœchiométriques**.' },
      { n: '2', text: '**Avant** l\'équivalence, le réactif **titrant** est limitant (consommé au fur et à mesure) ; **après**, c\'est le réactif **titré** qui a disparu, et le titrant s\'accumule en excès.' },
    ],
    result: 'Proportions stœchiométriques ; titrant limitant avant, titré disparu après.',
  },
  'titrages-8': {
    steps: [
      { n: '1', text: 'Matériel : burette graduée (titrant), bécher (titré), pipette jaugée (prise d\'essai), sonde pH reliée à un pH-mètre, agitateur magnétique et barreau aimanté.' },
      { n: '2', text: 'L\'**agitateur** assure l\'**homogénéité** du mélange : sans lui, le titrant resterait localement concentré et la sonde mesurerait un pH non représentatif de l\'ensemble.' },
    ],
    result: 'Burette, bécher, pipette, pH-mètre, agitateur. L\'agitateur homogénéise le mélange.',
  },
  'titrages-9': {
    steps: [
      { n: '1', text: '$C_B=\\dfrac{C_A V_A}{V_E}=\\dfrac{0{,}050\\times 10{,}0}{12{,}5}=0{,}040\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$C_B=0{,}040\\,\\text{mol·L}^{-1}$.',
  },
  'titrages-10': {
    steps: [
      { n: '1', text: '$V_E=\\dfrac{C_A V_A}{C_B}=\\dfrac{0{,}15\\times 20{,}0}{0{,}25}=12{,}0\\,\\text{mL}$.' },
    ],
    result: '$V_E=12{,}0\\,\\text{mL}$.',
  },
  'titrages-11': {
    steps: [
      { n: '1', text: '**Non**, $V_E$ est inchangé. L\'eau ajoutée dilue la solution, mais ne modifie pas la **quantité de matière** $n_A=C_A V_A$ présente dans le bécher.' },
      { n: '2', text: 'Or la relation à l\'équivalence porte sur les **quantités**, pas sur les concentrations dans le bécher. Il faut simplement en verser assez pour immerger la sonde.' },
    ],
    result: '$V_E$ inchangé : $n_A$ ne dépend pas de la dilution dans le bécher.',
  },
  'titrages-12': {
    steps: [
      { n: '1', text: 'On trace une tangente à la courbe **avant** le saut, puis sa **parallèle après** le saut.' },
      { n: '2', text: 'On trace ensuite la parallèle **équidistante** des deux : elle coupe la courbe au point d\'équivalence $E$, que l\'on projette sur l\'axe des abscisses pour lire $V_E$.' },
    ],
    result: 'Deux tangentes parallèles + parallèle médiane → $E$, projeté sur l\'axe pour lire $V_E$.',
  },
  'titrages-13': {
    steps: [
      { n: '1', text: 'La courbe dérivée présente un **pic** (maximum) très net : son abscisse donne directement $V_E$.' },
      { n: '2', text: 'L\'avantage : la lecture d\'un maximum est bien plus **précise** et moins subjective que le tracé à la main de trois droites parallèles.' },
    ],
    result: 'Pic (maximum) en $V_E$ ; lecture plus précise que les tangentes.',
  },
  'titrages-14': {
    steps: [
      { n: '1', text: 'À la demi-équivalence, la moitié de l\'acide initial a réagi : il s\'est formé autant de $\\text{A}^-$ qu\'il reste de $\\text{AH}$, donc $[\\text{AH}]=\\left[\\text{A}^-\\right]$.' },
      { n: '2', text: 'La relation de Henderson donne alors $\\text{pH}=\\text{p}K_a+\\log\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=\\text{p}K_a+\\log 1=\\text{p}K_a$.' },
    ],
    result: '$\\text{pH}=\\text{p}K_a$ à la demi-équivalence.',
  },
  'titrages-15': {
    steps: [
      { n: '1', text: 'La demi-équivalence est à $\\dfrac{V_E}{2}=\\dfrac{20{,}0}{2}=10{,}0\\,\\text{mL}$ : le pH lu ($4{,}8$) est donc le $\\text{p}K_a$.' },
      { n: '2', text: 'D\'après le tableau, $\\text{p}K_a=4{,}8$ correspond au couple $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$ : c\'est l\'**acide éthanoïque**.' },
    ],
    result: '$\\text{p}K_a=4{,}8$ → acide éthanoïque.',
  },
  'titrages-16': {
    steps: [
      { n: '1', text: 'Le **pH initial** est plus élevé pour l\'acide faible (il est peu dissocié, donc libère moins de $\\text{H}_3\\text{O}^+$).' },
      { n: '2', text: 'Le **saut de pH** est moins ample ; le **pH à l\'équivalence** est $>7$ au lieu de $7{,}0$ ; la courbe présente un **palier tampon** autour de $V_E/2$.' },
    ],
    result: 'pH initial plus élevé, saut moins ample, $\\text{pH}_E>7$ (palier tampon).',
  },
  'titrages-17': {
    steps: [
      { n: '1', text: 'Il faut que la **zone de virage** soit incluse dans le saut de pH. Le saut étant centré sur $\\text{pH}_E=7{,}0$, le **bleu de bromothymol** (zone $6{,}0-7{,}6$) convient parfaitement.' },
      { n: '2', text: 'L\'hélianthine ($3{,}1-4{,}4$) virerait trop tôt, la phénolphtaléine ($8{,}2-10{,}0$) trop tard.' },
    ],
    result: 'Bleu de bromothymol (zone incluse dans le saut).',
  },
  'titrages-18': {
    steps: [
      { n: '1', text: 'Entre deux ruptures, la **nature** des ions présents ne change pas : seules leurs quantités évoluent proportionnellement au volume versé, d\'où une variation **affine** de $\\sigma$.' },
      { n: '2', text: 'À l\'équivalence, la composition ionique bascule, ce qui change la pente. $V_E$ se lit à l\'**intersection des deux droites**, obtenues en prolongeant les parties linéaires (sans utiliser les points proches de $V_E$).' },
    ],
    result: 'Segments affines (composition ionique constante) ; $V_E$ = intersection des deux droites.',
  },
  'titrages-19': {
    steps: [
      { n: '1', text: '$m=n\\times M=1{,}5\\times 10^{-3}\\times 60{,}0=9{,}0\\times 10^{-2}\\,\\text{g}=90\\,\\text{mg}$.' },
    ],
    result: '$m=90\\,\\text{mg}$.',
  },
  'titrages-20': {
    steps: [
      { n: '1', text: 'Non, le pH à l\'équivalence dépend de la nature des réactifs. **Acide fort + base forte** : $\\text{pH}_E=7{,}0$ (le sel formé est neutre).' },
      { n: '2', text: '**Acide faible + base forte** : $\\text{pH}_E>7$ (il ne reste que la base conjuguée $\\text{A}^-$, qui rend le milieu basique). **Base faible + acide fort** : $\\text{pH}_E<7$ (il ne reste que l\'acide conjugué, qui rend le milieu acide).' },
    ],
    result: '$\\text{pH}_E=7$ (fort/fort) ; $>7$ (faible/forte) ; $<7$ (base faible/acide fort).',
  },
  'titrages-21': {
    steps: [
      { n: '1', text: 'La dilution divise la concentration par $20$ ; pour remonter à la solution mère, on multiplie : $C_{\\text{mère}}=20\\times 0{,}045=0{,}90\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$C_{\\text{mère}}=0{,}90\\,\\text{mol·L}^{-1}$.',
  },
  'titrages-22': {
    steps: [
      { n: '1', text: 'La stœchiométrie est $1{:}2$ : $n(\\text{NaOH})=2\\,n(\\text{H}_2\\text{SO}_4)$, soit $C_B V_E=2\\,C_A V_A$. D\'où $C_A=\\dfrac{C_B V_E}{2V_A}=\\dfrac{0{,}10\\times 16{,}0}{2\\times 20{,}0}=0{,}040\\,\\text{mol·L}^{-1}$.' },
      { n: '2', text: 'En appliquant à tort $C_A V_A=C_B V_E$, on trouverait $C_A=\\dfrac{0{,}10\\times 16{,}0}{20{,}0}=0{,}080\\,\\text{mol·L}^{-1}$, soit le **double** : l\'erreur de stœchiométrie coûte un facteur $2$.' },
    ],
    result: '$C_A=0{,}040\\,\\text{mol·L}^{-1}$ (et non $0{,}080$).',
  },
  'titrages-23': {
    steps: [
      { n: 'a', text: '$\\text{CH}_3\\text{COOH}+\\text{HO}^-\\to\\text{CH}_3\\text{COO}^-+\\text{H}_2\\text{O}$. Cette réaction est **totale** (la base forte consomme intégralement l\'acide), **rapide** et **unique** : elle convient donc à un titrage.' },
      { n: 'b', text: '$n(\\text{AH})=C_B V_E=0{,}100\\times 12{,}5\\times 10^{-3}=1{,}25\\times 10^{-3}\\,\\text{mol}$. $C_{\\text{dil}}=\\dfrac{n}{V_A}=\\dfrac{1{,}25\\times 10^{-3}}{20{,}0\\times 10^{-3}}=6{,}25\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      { n: 'c', text: 'Le vinaigre a été dilué $10$ fois, donc $C=10\\times C_{\\text{dil}}=0{,}625\\,\\text{mol·L}^{-1}$.' },
      { n: 'd', text: 'Dans $100\\,\\text{mL}=0{,}100\\,\\text{L}$ : $n=C\\times 0{,}100=6{,}25\\times 10^{-2}\\,\\text{mol}$, soit $m=n\\times M=6{,}25\\times 10^{-2}\\times 60{,}0=3{,}75\\,\\text{g}$. Le degré d\'acidité vaut donc environ $3{,}8°$.' },
      { n: 'e', text: 'Demi-équivalence : $V=\\dfrac{V_E}{2}=\\dfrac{12{,}5}{2}=6{,}25\\,\\text{mL}$. On y lit $\\text{pH}=\\text{p}K_a=4{,}8$.' },
      { n: 'f', text: 'L\'acide éthanoïque est un **acide faible** : à l\'équivalence, il ne reste que sa base conjuguée $\\text{CH}_3\\text{COO}^-$, qui rend le milieu **basique** — donc $\\text{pH}_E>7$. L\'indicateur adapté est la **phénolphtaléine** (zone $8{,}2-10{,}0$) ; le BBT virerait trop tôt.' },
    ],
    result: '$C_{\\text{dil}}=6{,}25\\times 10^{-2}$ ; $C=0{,}625\\,\\text{mol·L}^{-1}$ ; degré $\\approx 3{,}8°$ ; demi-équiv. $6{,}25\\,\\text{mL}$ (pH = 4,8) ; phénolphtaléine.',
  },
  'titrages-24': {
    steps: [
      { n: 'a', text: 'La demi-équivalence correspond à $V=\\dfrac{V_E}{2}=\\dfrac{16{,}0}{2}=8{,}0\\,\\text{mL}$ : c\'est bien le volume donné.' },
      { n: 'b', text: 'À la demi-équivalence, $[\\text{AH}]=\\left[\\text{A}^-\\right]$, donc $\\text{pH}=\\text{p}K_a=3{,}8$. D\'après le tableau, ce $\\text{p}K_a$ est celui du couple $\\text{HCOOH}/\\text{HCOO}^-$ : l\'acide est l\'**acide méthanoïque**.' },
      { n: 'c', text: 'La stœchiométrie étant $1{:}1$ : $C_A=\\dfrac{C_B V_E}{V_A}=\\dfrac{0{,}050\\times 16{,}0}{20{,}0}=0{,}040\\,\\text{mol·L}^{-1}$.' },
      { n: 'd', text: 'L\'acide titré est **faible** : à l\'équivalence, tout l\'acide a été converti en sa base conjuguée $\\text{HCOO}^-$. Cette base réagit partiellement avec l\'eau et libère des ions $\\text{HO}^-$ : le milieu est donc basique, $\\text{pH}_E>7$.' },
    ],
    result: '$\\text{p}K_a=3{,}8$ → acide méthanoïque ; $C_A=0{,}040\\,\\text{mol·L}^{-1}$ ; $\\text{pH}_E>7$.',
  },
  'titrages-25': {
    steps: [
      { n: 'a', text: 'Avant l\'équivalence, les ions $\\text{H}_3\\text{O}^+$ (très mobiles, donc très conducteurs) sont consommés et remplacés par des ions $\\text{Na}^+$, bien moins mobiles : $\\sigma$ **décroît**. Après l\'équivalence, on ajoute des ions $\\text{Na}^+$ et $\\text{HO}^-$ en excès, qui s\'accumulent sans réagir : $\\sigma$ **croît**.' },
      { n: 'b', text: 'D\'après l\'équation, $n(\\text{NaOH})=2\\,n(\\text{H}_2\\text{SO}_4)$, soit $C_B V_E=2\\,C_A V_A$. D\'où $C_A=\\dfrac{C_B V_E}{2V_A}=\\dfrac{0{,}100\\times 15{,}0\\times 10^{-3}}{2\\times 25{,}0\\times 10^{-3}}=3{,}00\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      { n: 'c', text: 'Avec $C_A V_A=C_B V_E$, on obtiendrait $C_A=\\dfrac{0{,}100\\times 15{,}0}{25{,}0}=6{,}00\\times 10^{-2}\\,\\text{mol·L}^{-1}$, soit le **double**. Chaque molécule $\\text{H}_2\\text{SO}_4$ libérant deux protons, oublier le coefficient revient à surestimer la concentration d\'un facteur $2$.' },
      { n: 'd', text: '$n(\\text{H}_2\\text{SO}_4)=C_A V_A=3{,}00\\times 10^{-2}\\times 25{,}0\\times 10^{-3}=7{,}50\\times 10^{-4}\\,\\text{mol}$, d\'où $m=n\\times M=7{,}50\\times 10^{-4}\\times 98{,}0\\approx 7{,}35\\times 10^{-2}\\,\\text{g}=73{,}5\\,\\text{mg}$.' },
      { n: 'e', text: 'La conductimétrie exploite **toutes** les mesures via deux régressions linéaires, alors qu\'un indicateur coloré repose sur l\'appréciation subjective d\'un virage. Elle est donc plus précise, et reste utilisable sur des solutions colorées ou troubles, où le virage serait invisible.' },
    ],
    result: '$C_A=3{,}00\\times 10^{-2}\\,\\text{mol·L}^{-1}$ (et non $6{,}00\\times 10^{-2}$) ; $m\\approx 73{,}5\\,\\text{mg}$.',
  },
};
