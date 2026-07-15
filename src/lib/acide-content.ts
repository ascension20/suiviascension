import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const ACIDE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Selon Brønsted, un acide est une espèce qui…',
    options: [
      { label: 'a', text: 'cède un proton' },
      { label: 'b', text: 'capte un proton' },
      { label: 'c', text: 'cède un électron' },
      { label: 'd', text: 'capte un électron' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'La base conjuguée de $\\text{NH}_4^+$ est…',
    options: [
      { label: 'a', text: '$\\text{NH}_3$' },
      { label: 'b', text: '$\\text{NH}_2^-$' },
      { label: 'c', text: '$\\text{NH}_5^{2+}$' },
      { label: 'd', text: '$\\text{N}_2$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Le pH est défini par…',
    options: [
      { label: 'a', text: '$\\text{pH}=\\log\\left[\\text{H}_3\\text{O}^+\\right]$' },
      { label: 'b', text: '$\\text{pH}=-\\log\\left[\\text{H}_3\\text{O}^+\\right]$' },
      { label: 'c', text: '$\\text{pH}=\\left[\\text{H}_3\\text{O}^+\\right]$' },
      { label: 'd', text: '$\\text{pH}=-\\log\\left[\\text{HO}^-\\right]$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Le produit ionique de l\'eau à 25 °C vaut…',
    options: [
      { label: 'a', text: '$10^{-7}$' },
      { label: 'b', text: '$10^{-14}$' },
      { label: 'c', text: '$14$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Une solution de $\\text{pH}=9$ est…',
    options: [
      { label: 'a', text: 'acide' },
      { label: 'b', text: 'basique' },
      { label: 'c', text: 'neutre' },
      { label: 'd', text: 'amphotère' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Un acide est d\'autant plus fort que…',
    options: [
      { label: 'a', text: 'son $\\text{p}K_a$ est grand' },
      { label: 'b', text: 'son $\\text{p}K_a$ est petit' },
      { label: 'c', text: 'sa concentration est grande' },
      { label: 'd', text: 'son $K_a$ est petit' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'La constante d\'acidité vaut…',
    options: [
      { label: 'a', text: '$K_a=\\dfrac{\\left[\\text{A}^-\\right]\\left[\\text{H}_3\\text{O}^+\\right]}{[\\text{AH}]}$' },
      { label: 'b', text: '$K_a=\\dfrac{[\\text{AH}]}{\\left[\\text{A}^-\\right]\\left[\\text{H}_3\\text{O}^+\\right]}$' },
      { label: 'c', text: '$K_a=\\left[\\text{A}^-\\right][\\text{AH}]$' },
      { label: 'd', text: '$K_a=-\\log\\left[\\text{A}^-\\right]$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'Lorsque $\\text{pH}=\\text{p}K_a$…',
    options: [
      { label: 'a', text: '$[\\text{AH}]=\\left[\\text{A}^-\\right]$' },
      { label: 'b', text: '$[\\text{AH}]=0$' },
      { label: 'c', text: '$\\left[\\text{A}^-\\right]=0$' },
      { label: 'd', text: 'la solution est neutre' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Si $\\text{pH}>\\text{p}K_a$, l\'espèce prédominante est…',
    options: [
      { label: 'a', text: 'l\'acide $\\text{AH}$' },
      { label: 'b', text: 'la base $\\text{A}^-$' },
      { label: 'c', text: '$\\text{H}_3\\text{O}^+$' },
      { label: 'd', text: 'aucune' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La relation de Henderson s\'écrit…',
    options: [
      { label: 'a', text: '$\\text{pH}=\\text{p}K_a+\\log\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}$' },
      { label: 'b', text: '$\\text{pH}=\\text{p}K_a-\\log\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}$' },
      { label: 'c', text: '$\\text{pH}=\\text{p}K_a\\times\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}$' },
      { label: 'd', text: '$\\text{pH}=\\log\\text{p}K_a$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const ACIDE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'acide-1',
    context: 'Théorie de Brønsted : transfert de proton $\\text{H}^+$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Rappeler les définitions d\'un acide et d\'une base au sens de Brønsted.' },
      ],
    }],
  },
  {
    id: 'acide-2',
    context: 'La base conjuguée s\'obtient en retirant un proton $\\text{H}^+$ à l\'acide (la charge diminue d\'une unité).',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner la base conjuguée des acides suivants : $\\text{HCOOH}$, $\\text{NH}_4^+$, $\\text{H}_3\\text{O}^+$, $\\text{HCO}_3^-$.' },
      ],
    }],
  },
  {
    id: 'acide-3',
    context: 'Demi-équation acide-base : $\\text{AH}=\\text{A}^-+\\text{H}^+$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire les demi-équations acide-base des couples $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$ et $\\text{NH}_4^+/\\text{NH}_3$.' },
      ],
    }],
  },
  {
    id: 'acide-4',
    context: 'pH : $\\text{pH}=-\\log\\left[\\text{H}_3\\text{O}^+\\right]$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le pH d\'une solution telle que $\\left[\\text{H}_3\\text{O}^+\\right]=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'acide-5',
    context: 'Relation inverse : $\\left[\\text{H}_3\\text{O}^+\\right]=10^{-\\text{pH}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution a un pH de $4{,}5$. Calculer $\\left[\\text{H}_3\\text{O}^+\\right]$.' },
      ],
    }],
  },
  {
    id: 'acide-6',
    context: 'Produit ionique : $\\left[\\text{H}_3\\text{O}^+\\right]\\left[\\text{HO}^-\\right]=K_e=1{,}0\\times 10^{-14}$ à 25 °C.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une solution, $\\left[\\text{H}_3\\text{O}^+\\right]=1{,}0\\times 10^{-5}\\,\\text{mol·L}^{-1}$. Calculer $\\left[\\text{HO}^-\\right]$ et le pH. La solution est-elle acide ou basique ?' },
      ],
    }],
  },
  {
    id: 'acide-7',
    context: 'Constante d\'acidité : $K_a=10^{-\\text{p}K_a}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'acide éthanoïque a un $\\text{p}K_a=4{,}8$. Calculer sa constante d\'acidité $K_a$.' },
      ],
    }],
  },
  {
    id: 'acide-8',
    context: 'Relation : $\\text{p}K_a=-\\log K_a$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le couple $\\text{NH}_4^+/\\text{NH}_3$ a une constante $K_a=6{,}3\\times 10^{-10}$. Calculer son $\\text{p}K_a$.' },
      ],
    }],
  },
  {
    id: 'acide-9',
    context: 'Relation de Henderson : $\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=10^{\\text{pH}-\\text{p}K_a}$. Pour l\'acide éthanoïque, $\\text{p}K_a=4{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution d\'acide éthanoïque a un pH de $4{,}8$. Que vaut le rapport $\\left[\\text{A}^-\\right]/[\\text{AH}]$ ? Quelle espèce prédomine ?' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'acide-10',
    context: 'Une espèce amphotère est à la fois acide d\'un couple et base d\'un autre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'est-ce qu\'une espèce amphotère ? Montrer que l\'eau en est une, en précisant les deux couples auxquels elle appartient.' },
      ],
    }],
  },
  {
    id: 'acide-11',
    context: '$\\left[\\text{H}_3\\text{O}^+\\right]=10^{-\\text{pH}}$. Eau pure : $\\left[\\text{H}_3\\text{O}^+\\right]=10^{-7}\\,\\text{mol·L}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le suc gastrique a un pH voisin de $1{,}7$. Calculer $\\left[\\text{H}_3\\text{O}^+\\right]$ et commenter l\'acidité.' },
      ],
    }],
  },
  {
    id: 'acide-12',
    context: 'Pour un acide fort, $\\left[\\text{H}_3\\text{O}^+\\right]=c$ ; diluer divise la concentration.',
    parts: [{
      questions: [
        { n: 'a', text: 'On dilue $100$ fois une solution d\'acide fort. De combien d\'unités le pH varie-t-il ? Augmente-t-il ou diminue-t-il ? Justifier.' },
      ],
    }],
  },
  {
    id: 'acide-13',
    context: '$\\left[\\text{H}_3\\text{O}^+\\right]=\\dfrac{K_e}{\\left[\\text{HO}^-\\right]}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution contient $\\left[\\text{HO}^-\\right]=2{,}0\\times 10^{-4}\\,\\text{mol·L}^{-1}$. Calculer $\\left[\\text{H}_3\\text{O}^+\\right]$ puis le pH.' },
      ],
    }],
  },
  {
    id: 'acide-14',
    context: 'Une base forte est totalement dissociée : $\\left[\\text{HO}^-\\right]=c$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le pH d\'une solution d\'hydroxyde de sodium (base forte) de concentration $c=1{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'acide-15',
    context: 'Un acide fort est totalement dissocié : $\\left[\\text{H}_3\\text{O}^+\\right]=c$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le pH d\'une solution d\'acide chlorhydrique (acide fort) de concentration $c=5{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'acide-16',
    context: 'Plus l\'acide est fort, plus $K_a$ est grand et $\\text{p}K_a$ petit. Données : $\\text{p}K_a(\\text{HCOOH})=3{,}8$, $\\text{p}K_a(\\text{CH}_3\\text{COOH})=4{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'acide méthanoïque ($3{,}8$) et l\'acide éthanoïque ($4{,}8$) : lequel est le plus fort ? Que peut-on dire de leurs bases conjuguées ?' },
      ],
    }],
  },
  {
    id: 'acide-17',
    context: 'Un acide fort réagit totalement avec l\'eau, un acide faible partiellement.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelle est la différence entre un acide fort et un acide faible ? Comment le vérifier expérimentalement à partir du pH d\'une solution de concentration connue ?' },
      ],
    }],
  },
  {
    id: 'acide-18',
    context: '$\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=10^{\\text{pH}-\\text{p}K_a}$. Couple $\\text{NH}_4^+/\\text{NH}_3$, $\\text{p}K_a=9{,}2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une solution de $\\text{pH}=7{,}2$ contenant le couple $\\text{NH}_4^+/\\text{NH}_3$, calculer le rapport $\\left[\\text{NH}_3\\right]/\\left[\\text{NH}_4^+\\right]$ et indiquer l\'espèce prédominante.' },
      ],
    }],
  },
  {
    id: 'acide-19',
    context: 'Diagramme de prédominance construit autour de $\\text{pH}=\\text{p}K_a$. Couple $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$, $\\text{p}K_a=4{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Tracer le diagramme de prédominance du couple $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$. Quelle espèce prédomine à $\\text{pH}=3{,}0$ ? à $\\text{pH}=6{,}5$ ?' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'acide-20',
    context: 'Additionner deux demi-équations : les $\\text{H}^+$ doivent se simplifier.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction entre l\'acide méthanoïque $\\text{HCOOH}$ et l\'ammoniac $\\text{NH}_3$, en détaillant les deux demi-équations.' },
      ],
    }],
  },
  {
    id: 'acide-21',
    context: 'Relation de Henderson : $\\text{pH}=\\text{p}K_a+\\log\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}$. Acide éthanoïque : $\\text{p}K_a=4{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On souhaite que la base soit $100$ fois moins concentrée que l\'acide dans une solution d\'acide éthanoïque. Quel doit être le pH ?' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'acide-22',
    context: 'Une solution d\'acide éthanoïque de concentration $c=0{,}10\\,\\text{mol·L}^{-1}$ a un pH mesuré de $2{,}9$. Donnée : $\\text{p}K_a(\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-)=4{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction de l\'acide éthanoïque avec l\'eau.' },
        { n: 'b', text: 'Calculer $\\left[\\text{H}_3\\text{O}^+\\right]$ dans la solution.' },
        { n: 'c', text: 'Quel serait le pH si l\'acide était fort ? En comparant à la valeur mesurée, conclure sur la force de l\'acide.' },
        { n: 'd', text: 'Calculer le taux d\'avancement final $\\tau=\\dfrac{\\left[\\text{H}_3\\text{O}^+\\right]}{c}$ et commenter.' },
        { n: 'e', text: 'Quelle espèce du couple prédomine ? Vérifier la cohérence avec le diagramme de prédominance.' },
      ],
    }],
  },
  {
    id: 'acide-23',
    context: 'On dispose d\'une solution d\'hydroxyde de sodium (base forte, totalement dissociée) de concentration $c=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de dissolution et donner $\\left[\\text{HO}^-\\right]$.' },
        { n: 'b', text: 'Calculer $\\left[\\text{H}_3\\text{O}^+\\right]$ en utilisant le produit ionique de l\'eau.' },
        { n: 'c', text: 'En déduire le pH de la solution.' },
        { n: 'd', text: 'On dilue cette solution $10$ fois. Calculer le nouveau pH et commenter la variation.' },
      ],
    }],
  },
  {
    id: 'acide-24',
    context: 'Le pH du sang est régulé autour de $7{,}40$, notamment par le couple $\\text{CO}_2,\\text{H}_2\\text{O}/\\text{HCO}_3^-$ de $\\text{p}K_a=6{,}4$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le sang est-il acide ou basique ? Justifier.' },
        { n: 'b', text: 'Calculer le rapport $\\dfrac{\\left[\\text{HCO}_3^-\\right]}{\\left[\\text{CO}_2\\right]}$ à $\\text{pH}=7{,}40$. Quelle espèce prédomine ?' },
        { n: 'c', text: 'Lors d\'un effort intense, le pH descend à $7{,}10$. Calculer le nouveau rapport et $\\left[\\text{H}_3\\text{O}^+\\right]$ dans les deux cas.' },
        { n: 'd', text: 'Par quel facteur $\\left[\\text{H}_3\\text{O}^+\\right]$ a-t-elle été multipliée ? Commenter, sachant qu\'une variation de pH de $\\pm 0{,}4$ est déjà critique pour l\'organisme.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const ACIDE_CORRECTIONS: Record<string, Correction> = {
  'acide-1': {
    steps: [
      { n: '1', text: 'Un **acide** est une espèce capable de **céder** un proton $\\text{H}^+$.' },
      { n: '2', text: 'Une **base** est une espèce capable de **capter** un proton $\\text{H}^+$.' },
    ],
    result: 'Acide : donneur de $\\text{H}^+$ ; base : accepteur de $\\text{H}^+$.',
  },
  'acide-2': {
    steps: [
      { n: '1', text: 'On retire un $\\text{H}^+$ à chaque acide (la charge diminue d\'une unité) :' },
      { n: '2', text: '$\\text{HCOOH}\\to\\text{HCOO}^-$ ; $\\text{NH}_4^+\\to\\text{NH}_3$ ; $\\text{H}_3\\text{O}^+\\to\\text{H}_2\\text{O}$ ; $\\text{HCO}_3^-\\to\\text{CO}_3^{2-}$.' },
    ],
    result: '$\\text{HCOO}^-$, $\\text{NH}_3$, $\\text{H}_2\\text{O}$, $\\text{CO}_3^{2-}$.',
  },
  'acide-3': {
    steps: [
      { n: '1', text: '$\\text{CH}_3\\text{COOH}=\\text{CH}_3\\text{COO}^-+\\text{H}^+$.' },
      { n: '2', text: '$\\text{NH}_4^+=\\text{NH}_3+\\text{H}^+$.' },
    ],
    result: '$\\text{CH}_3\\text{COOH}=\\text{CH}_3\\text{COO}^-+\\text{H}^+$ ; $\\text{NH}_4^+=\\text{NH}_3+\\text{H}^+$.',
  },
  'acide-4': {
    steps: [
      { n: '1', text: '$\\text{pH}=-\\log\\left(2{,}0\\times 10^{-3}\\right)\\approx 2{,}7$.' },
    ],
    result: '$\\text{pH}\\approx 2{,}7$.',
  },
  'acide-5': {
    steps: [
      { n: '1', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=10^{-4{,}5}\\approx 3{,}2\\times 10^{-5}\\,\\text{mol·L}^{-1}$.' },
    ],
    result: '$\\left[\\text{H}_3\\text{O}^+\\right]\\approx 3{,}2\\times 10^{-5}\\,\\text{mol·L}^{-1}$.',
  },
  'acide-6': {
    steps: [
      { n: '1', text: '$\\left[\\text{HO}^-\\right]=\\dfrac{K_e}{\\left[\\text{H}_3\\text{O}^+\\right]}=\\dfrac{10^{-14}}{10^{-5}}=10^{-9}\\,\\text{mol·L}^{-1}$, et $\\text{pH}=-\\log\\left(10^{-5}\\right)=5{,}0$.' },
      { n: '2', text: 'Comme $\\text{pH}<7$ (et $\\left[\\text{H}_3\\text{O}^+\\right]>\\left[\\text{HO}^-\\right]$), la solution est **acide**.' },
    ],
    result: '$\\left[\\text{HO}^-\\right]=10^{-9}\\,\\text{mol·L}^{-1}$ ; $\\text{pH}=5{,}0$ (acide).',
  },
  'acide-7': {
    steps: [
      { n: '1', text: '$K_a=10^{-\\text{p}K_a}=10^{-4{,}8}\\approx 1{,}6\\times 10^{-5}$.' },
    ],
    result: '$K_a\\approx 1{,}6\\times 10^{-5}$.',
  },
  'acide-8': {
    steps: [
      { n: '1', text: '$\\text{p}K_a=-\\log K_a=-\\log\\left(6{,}3\\times 10^{-10}\\right)\\approx 9{,}2$.' },
    ],
    result: '$\\text{p}K_a\\approx 9{,}2$.',
  },
  'acide-9': {
    steps: [
      { n: '1', text: '$\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=10^{\\text{pH}-\\text{p}K_a}=10^{4{,}8-4{,}8}=10^{0}=1$.' },
      { n: '2', text: 'Les deux espèces sont en **concentrations égales** : aucune ne prédomine (50 % / 50 %).' },
    ],
    result: 'Rapport $=1$ ; $[\\text{AH}]=\\left[\\text{A}^-\\right]$.',
  },
  'acide-10': {
    steps: [
      { n: '1', text: 'Une espèce **amphotère** est à la fois l\'acide d\'un couple et la base d\'un autre.' },
      { n: '2', text: 'L\'eau est l\'acide du couple $\\text{H}_2\\text{O}/\\text{HO}^-$ (elle peut céder un $\\text{H}^+$) et la base du couple $\\text{H}_3\\text{O}^+/\\text{H}_2\\text{O}$ (elle peut en capter un). Elle est donc amphotère.' },
    ],
    result: 'L\'eau appartient à $\\text{H}_2\\text{O}/\\text{HO}^-$ et $\\text{H}_3\\text{O}^+/\\text{H}_2\\text{O}$ : amphotère.',
  },
  'acide-11': {
    steps: [
      { n: '1', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=10^{-1{,}7}\\approx 2{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      { n: '2', text: 'C\'est une solution **très acide** : la concentration en ions oxonium y est environ $10^{5}$ fois plus grande que dans l\'eau pure ($10^{-7}$).' },
    ],
    result: '$\\left[\\text{H}_3\\text{O}^+\\right]\\approx 2{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$ (très acide).',
  },
  'acide-12': {
    steps: [
      { n: '1', text: 'Pour un acide fort, $\\left[\\text{H}_3\\text{O}^+\\right]=c$. Diluer $100$ fois divise $c$ par $100$, donc $\\text{pH}\'=-\\log\\dfrac{c}{100}=-\\log c+\\log 100=\\text{pH}+2$.' },
      { n: '2', text: 'Le pH **augmente de 2 unités** : la solution devient moins acide, ce qui est cohérent.' },
    ],
    result: 'Le pH augmente de $2$ unités.',
  },
  'acide-13': {
    steps: [
      { n: '1', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=\\dfrac{10^{-14}}{2{,}0\\times 10^{-4}}=5{,}0\\times 10^{-11}\\,\\text{mol·L}^{-1}$.' },
      { n: '2', text: '$\\text{pH}=-\\log\\left(5{,}0\\times 10^{-11}\\right)\\approx 10{,}3$ : la solution est basique.' },
    ],
    result: '$\\text{pH}\\approx 10{,}3$ (basique).',
  },
  'acide-14': {
    steps: [
      { n: '1', text: 'La base forte est totalement dissociée : $\\left[\\text{HO}^-\\right]=c=1{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$.' },
      { n: '2', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=\\dfrac{10^{-14}}{10^{-2}}=10^{-12}$, et $\\text{pH}=12{,}0$.' },
    ],
    result: '$\\text{pH}=12{,}0$.',
  },
  'acide-15': {
    steps: [
      { n: '1', text: 'L\'acide fort est totalement dissocié : $\\left[\\text{H}_3\\text{O}^+\\right]=c=5{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
      { n: '2', text: '$\\text{pH}=-\\log\\left(5{,}0\\times 10^{-3}\\right)\\approx 2{,}3$.' },
    ],
    result: '$\\text{pH}\\approx 2{,}3$.',
  },
  'acide-16': {
    steps: [
      { n: '1', text: 'L\'acide méthanoïque a le $\\text{p}K_a$ le plus petit ($3{,}8<4{,}8$) : c\'est le **plus fort** des deux.' },
      { n: '2', text: 'En conséquence, sa base conjuguée $\\text{HCOO}^-$ est la **plus faible** : à acide plus fort, base conjuguée plus faible.' },
    ],
    result: '$\\text{HCOOH}$ le plus fort ; $\\text{HCOO}^-$ la base la plus faible.',
  },
  'acide-17': {
    steps: [
      { n: '1', text: 'Un **acide fort** réagit **totalement** avec l\'eau ; un **acide faible** ne réagit que **partiellement** (état d\'équilibre).' },
      { n: '2', text: 'Vérification expérimentale : pour une solution de concentration $c$ connue, comparer le pH mesuré à $-\\log c$. S\'ils coïncident, l\'acide est fort ; si le pH mesuré est **supérieur**, l\'acide est faible (moins d\'ions $\\text{H}_3\\text{O}^+$ formés que prévu).' },
    ],
    result: 'Fort = réaction totale ; faible = partielle. Comparer pH mesuré et $-\\log c$.',
  },
  'acide-18': {
    steps: [
      { n: '1', text: '$\\dfrac{\\left[\\text{NH}_3\\right]}{\\left[\\text{NH}_4^+\\right]}=10^{\\text{pH}-\\text{p}K_a}=10^{7{,}2-9{,}2}=10^{-2}=0{,}010$.' },
      { n: '2', text: 'L\'ammoniac est $100$ fois moins concentré que l\'ion ammonium : c\'est $\\text{NH}_4^+$ (l\'acide) qui prédomine — cohérent avec $\\text{pH}<\\text{p}K_a$.' },
    ],
    result: 'Rapport $=1{,}0\\times 10^{-2}$ ; $\\text{NH}_4^+$ prédomine.',
  },
  'acide-19': {
    steps: [
      { n: '1', text: 'Le diagramme se construit autour de $\\text{p}K_a=4{,}8$ : $\\text{CH}_3\\text{COOH}$ prédomine pour $\\text{pH}<4{,}8$, $\\text{CH}_3\\text{COO}^-$ pour $\\text{pH}>4{,}8$.' },
      { n: '2', text: 'À $\\text{pH}=3{,}0<4{,}8$ : l\'**acide** $\\text{CH}_3\\text{COOH}$ prédomine. À $\\text{pH}=6{,}5>4{,}8$ : la **base** $\\text{CH}_3\\text{COO}^-$ prédomine.' },
    ],
    result: 'pH 3,0 → acide $\\text{CH}_3\\text{COOH}$ ; pH 6,5 → base $\\text{CH}_3\\text{COO}^-$.',
  },
  'acide-20': {
    steps: [
      { n: '1', text: 'Demi-équations : $\\text{HCOOH}=\\text{HCOO}^-+\\text{H}^+$ (l\'acide cède) ; $\\text{NH}_3+\\text{H}^+=\\text{NH}_4^+$ (la base capte).' },
      { n: '2', text: 'En additionnant, les $\\text{H}^+$ se simplifient : $\\text{HCOOH}+\\text{NH}_3\\to\\text{HCOO}^-+\\text{NH}_4^+$.' },
    ],
    result: '$\\text{HCOOH}+\\text{NH}_3\\to\\text{HCOO}^-+\\text{NH}_4^+$.',
  },
  'acide-21': {
    steps: [
      { n: '1', text: 'On veut $\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=\\dfrac{1}{100}=10^{-2}$.' },
      { n: '2', text: 'D\'après Henderson : $\\text{pH}=\\text{p}K_a+\\log\\left(10^{-2}\\right)=4{,}8-2=2{,}8$.' },
    ],
    result: '$\\text{pH}=2{,}8$.',
  },
  'acide-22': {
    steps: [
      { n: 'a', text: '$\\text{CH}_3\\text{COOH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{CH}_3\\text{COO}^-+\\text{H}_3\\text{O}^+$ (l\'eau joue le rôle de base ; la double flèche traduit l\'équilibre).' },
      { n: 'b', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=10^{-2{,}9}\\approx 1{,}3\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
      { n: 'c', text: 'Si l\'acide était fort, il serait totalement dissocié : $\\left[\\text{H}_3\\text{O}^+\\right]=c=0{,}10$, soit $\\text{pH}=-\\log(0{,}10)=1{,}0$. Or le pH mesuré vaut $2{,}9>1{,}0$ : il s\'est formé **bien moins** d\'ions oxonium que prévu. L\'acide éthanoïque est donc un **acide faible**.' },
      { n: 'd', text: '$\\tau=\\dfrac{\\left[\\text{H}_3\\text{O}^+\\right]}{c}=\\dfrac{1{,}3\\times 10^{-3}}{0{,}10}\\approx 1{,}3\\times 10^{-2}=1{,}3\\,\\%$. Seule une molécule sur $80$ environ a cédé son proton : la réaction est très limitée, ce qui confirme le caractère faible de l\'acide.' },
      { n: 'e', text: '$\\text{pH}=2{,}9<\\text{p}K_a=4{,}8$ : c\'est l\'**acide** $\\text{CH}_3\\text{COOH}$ qui prédomine. Vérification par Henderson : $\\dfrac{\\left[\\text{A}^-\\right]}{[\\text{AH}]}=10^{2{,}9-4{,}8}\\approx 1{,}3\\times 10^{-2}$ — cohérent avec le diagramme.' },
    ],
    result: '$\\left[\\text{H}_3\\text{O}^+\\right]\\approx 1{,}3\\times 10^{-3}$ ; acide faible ($2{,}9>1{,}0$) ; $\\tau\\approx 1{,}3\\,\\%$ ; $\\text{CH}_3\\text{COOH}$ prédomine.',
  },
  'acide-23': {
    steps: [
      { n: 'a', text: '$\\text{NaOH}\\to\\text{Na}^++\\text{HO}^-$ : la dissolution étant totale, $\\left[\\text{HO}^-\\right]=c=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$.' },
      { n: 'b', text: '$\\left[\\text{H}_3\\text{O}^+\\right]=\\dfrac{K_e}{\\left[\\text{HO}^-\\right]}=\\dfrac{1{,}0\\times 10^{-14}}{2{,}0\\times 10^{-3}}=5{,}0\\times 10^{-12}\\,\\text{mol·L}^{-1}$.' },
      { n: 'c', text: '$\\text{pH}=-\\log\\left(5{,}0\\times 10^{-12}\\right)\\approx 11{,}3$. La solution est bien **basique** ($\\text{pH}>7$).' },
      { n: 'd', text: 'Après dilution $10$ fois : $c\'=2{,}0\\times 10^{-4}$, donc $\\left[\\text{H}_3\\text{O}^+\\right]=\\dfrac{10^{-14}}{2{,}0\\times 10^{-4}}=5{,}0\\times 10^{-11}$ et $\\text{pH}\'\\approx 10{,}3$. Le pH a **diminué d\'une unité** : diluer une base rapproche le pH de $7$ (la solution devient moins basique).' },
    ],
    result: '$\\left[\\text{H}_3\\text{O}^+\\right]=5{,}0\\times 10^{-12}$ ; $\\text{pH}\\approx 11{,}3\\rightarrow 10{,}3$ après dilution.',
  },
  'acide-24': {
    steps: [
      { n: 'a', text: '$\\text{pH}=7{,}40>7{,}0$ : le sang est légèrement basique.' },
      { n: 'b', text: '$\\dfrac{\\left[\\text{HCO}_3^-\\right]}{\\left[\\text{CO}_2\\right]}=10^{\\text{pH}-\\text{p}K_a}=10^{7{,}40-6{,}4}=10^{1}=10$. Comme $\\text{pH}>\\text{p}K_a$, c\'est la **base** $\\text{HCO}_3^-$ qui prédomine — elle est $10$ fois plus concentrée que $\\text{CO}_2$ dissous.' },
      { n: 'c', text: 'À $\\text{pH}=7{,}10$ : $\\dfrac{\\left[\\text{HCO}_3^-\\right]}{\\left[\\text{CO}_2\\right]}=10^{7{,}10-6{,}4}=10^{0{,}70}\\approx 5{,}0$. Concentrations : $\\left[\\text{H}_3\\text{O}^+\\right]=10^{-7{,}40}\\approx 4{,}0\\times 10^{-8}\\,\\text{mol·L}^{-1}$ et $10^{-7{,}10}\\approx 7{,}9\\times 10^{-8}\\,\\text{mol·L}^{-1}$.' },
      { n: 'd', text: 'Le facteur vaut $\\dfrac{7{,}9\\times 10^{-8}}{4{,}0\\times 10^{-8}}\\approx 2{,}0$ : la concentration en ions oxonium a **doublé** pour une baisse de pH de seulement $0{,}30$. C\'est toute la brutalité de l\'échelle logarithmique — d\'où la nécessité d\'un système tampon très efficace maintenant le pH dans une plage étroite.' },
    ],
    result: 'Rapport $10$ (pH 7,40) → $5{,}0$ (pH 7,10) ; $\\left[\\text{H}_3\\text{O}^+\\right]$ doublée.',
  },
};
