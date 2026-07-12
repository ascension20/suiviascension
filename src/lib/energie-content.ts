import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const ENERGIE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le travail d\'une force s\'exprime en…',
    options: [
      { label: 'a', text: '$\\text{N}$' },
      { label: 'b', text: '$\\text{J}$ (joules)' },
      { label: 'c', text: '$\\text{W}$' },
      { label: 'd', text: '$\\text{kg}$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'L\'énergie cinétique vaut…',
    options: [
      { label: 'a', text: '$mv^2$' },
      { label: 'b', text: '$\\tfrac{1}{2}mv^2$' },
      { label: 'c', text: '$mgz$' },
      { label: 'd', text: '$\\tfrac{1}{2}mv$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Le théorème de l\'énergie cinétique s\'écrit…',
    options: [
      { label: 'a', text: '$\\Delta E_c=\\sum W$' },
      { label: 'b', text: '$E_c=\\sum W$' },
      { label: 'c', text: '$\\Delta E_c=\\Delta E_{pp}$' },
      { label: 'd', text: '$E_c=mgz$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Une force perpendiculaire au déplacement a un travail…',
    options: [
      { label: 'a', text: 'moteur' },
      { label: 'b', text: 'résistant' },
      { label: 'c', text: 'nul (car $\\cos 90°=0$)' },
      { label: 'd', text: 'négatif' },
    ],
    answer: 'c',
  },
  {
    n: 5,
    text: 'L\'énergie potentielle de pesanteur vaut…',
    options: [
      { label: 'a', text: '$\\tfrac{1}{2}mv^2$' },
      { label: 'b', text: '$mgz$' },
      { label: 'c', text: '$mg$' },
      { label: 'd', text: '$mv$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Le travail du poids dépend…',
    options: [
      { label: 'a', text: 'du chemin suivi' },
      { label: 'b', text: 'uniquement de la dénivellation' },
      { label: 'c', text: 'de la vitesse' },
      { label: 'd', text: 'de la durée' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Sans frottement, l\'énergie mécanique…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'se conserve' },
      { label: 'd', text: 's\'annule' },
    ],
    answer: 'c',
  },
  {
    n: 8,
    text: 'En présence de frottements, l\'énergie mécanique…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue (travail résistant)' },
      { label: 'c', text: 'reste constante' },
      { label: 'd', text: 'est nulle' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'L\'énergie mécanique est égale à…',
    options: [
      { label: 'a', text: '$E_c-E_{pp}$' },
      { label: 'b', text: '$E_c+E_{pp}$' },
      { label: 'c', text: '$E_c\\times E_{pp}$' },
      { label: 'd', text: '$E_c/E_{pp}$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'En chute libre, la vitesse au sol après une hauteur $h$ vaut…',
    options: [
      { label: 'a', text: '$\\sqrt{2gh}$' },
      { label: 'b', text: '$2gh$' },
      { label: 'c', text: '$\\sqrt{gh}$' },
      { label: 'd', text: '$gh$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const ENERGIE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'energie-1',
    context: 'On prendra $g=9{,}81\\,\\text{N·kg}^{-1}$. Travail d\'une force constante : $W=F\\times AB\\times\\cos\\alpha$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une force horizontale $F=120\\,\\text{N}$ déplace une caisse de $15\\,\\text{m}$ dans son sens. Calculer le travail de $\\vec{F}$.' },
      ],
    }],
  },
  {
    id: 'energie-2',
    context: 'La composante de la force selon le déplacement est $F\\cos\\alpha$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une force $F=80\\,\\text{N}$, inclinée de $40°$ au-dessus de l\'horizontale, tire un objet sur $12\\,\\text{m}$. Calculer son travail.' },
      ],
    }],
  },
  {
    id: 'energie-3',
    context: 'Le travail du poids ne dépend que de la dénivellation : $W(\\vec{P})=mgh$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un objet de masse $3{,}0\\,\\text{kg}$ descend d\'une hauteur de $5{,}0\\,\\text{m}$. Calculer le travail du poids.' },
      ],
    }],
  },
  {
    id: 'energie-4',
    context: 'On soulève une charge : le poids s\'oppose alors au mouvement.',
    parts: [{
      questions: [
        { n: 'a', text: 'On soulève une charge de $5{,}0\\,\\text{kg}$ de $8{,}0\\,\\text{m}$. Calculer le travail du poids et préciser son signe.' },
      ],
    }],
  },
  {
    id: 'energie-5',
    context: 'Énergie cinétique : $E_c=\\tfrac{1}{2}mv^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie cinétique d\'une voiture de $1200\\,\\text{kg}$ roulant à $20\\,\\text{m·s}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'energie-6',
    context: 'L\'énergie mécanique est $E_m=E_c+E_{pp}=\\tfrac{1}{2}mv^2+mgz$ (origine au sol).',
    parts: [{
      questions: [
        { n: 'a', text: 'Un objet de $2{,}0\\,\\text{kg}$ est à l\'altitude $10\\,\\text{m}$ et se déplace à $5{,}0\\,\\text{m·s}^{-1}$. Calculer son énergie mécanique.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'energie-7',
    context: 'Un palet glisse horizontalement sur un support.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quel est le travail de la réaction normale $\\vec{R}$ du support ? Justifier.' },
      ],
    }],
  },
  {
    id: 'energie-8',
    context: 'Un objet de $10\\,\\text{kg}$ descend un plan incliné, la dénivellation valant $2{,}0\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le travail du poids.' },
        { n: 'b', text: 'Dépend-il de la longueur du plan ?' },
      ],
    }],
  },
  {
    id: 'energie-9',
    context: 'Théorème de l\'énergie cinétique : $\\Delta E_c=\\sum W$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un objet de $0{,}50\\,\\text{kg}$ est lâché sans vitesse d\'une hauteur de $20\\,\\text{m}$. En appliquant le TEC, déterminer sa vitesse au sol (frottements négligés).' },
      ],
    }],
  },
  {
    id: 'energie-10',
    context: 'Un enfant glisse sans frottement sur un toboggan de hauteur $3{,}0\\,\\text{m}$, départ sans vitesse.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer sa vitesse en bas par conservation de l\'énergie mécanique.' },
      ],
    }],
  },
  {
    id: 'energie-11',
    context: 'Une bille de pendule est lâchée d\'une hauteur $0{,}50\\,\\text{m}$ au-dessus du point bas (frottements négligés).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer sa vitesse au point le plus bas.' },
      ],
    }],
  },
  {
    id: 'energie-12',
    context: 'Un palet de $4{,}0\\,\\text{kg}$ lancé à $6{,}0\\,\\text{m·s}^{-1}$ sur un sol horizontal s\'arrête après $9{,}0\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la valeur de la force de frottement (supposée constante).' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'energie-13',
    context: 'Une voiture de $1000\\,\\text{kg}$ roulant à $30\\,\\text{m·s}^{-1}$ s\'arrête sur $75\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la force de freinage moyenne (supposée constante).' },
      ],
    }],
  },
  {
    id: 'energie-14',
    context: 'Un solide de $5{,}0\\,\\text{kg}$ descend un plan (dénivelé $h=4{,}0\\,\\text{m}$, longueur $L=10\\,\\text{m}$) soumis à une force de frottement $f=8{,}0\\,\\text{N}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer sa vitesse en bas.' },
        { n: 'b', text: 'La comparer au cas sans frottement.' },
      ],
    }],
  },
  {
    id: 'energie-15',
    context: 'Un skieur de $70\\,\\text{kg}$ descend un dénivelé de $50\\,\\text{m}$ et arrive en bas à $25\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie dissipée par les frottements.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'energie-16',
    context: 'Une bille de masse $m=100\\,\\text{g}$ est lâchée sans vitesse d\'une hauteur $h=1{,}8\\,\\text{m}$ (frottements négligés).',
    parts: [{
      questions: [
        { n: 'a', text: 'Faire le bilan des forces. Quelle(s) force(s) travaille(nt) ?' },
        { n: 'b', text: 'Par le théorème de l\'énergie cinétique, déterminer la vitesse au sol.' },
        { n: 'c', text: 'Calculer son énergie cinétique au sol et vérifier qu\'elle est égale à $mgh$.' },
      ],
    }],
  },
  {
    id: 'energie-17',
    context: 'Un solide de $m=2{,}0\\,\\text{kg}$ glisse le long d\'un plan incliné (dénivelé $h=1{,}5\\,\\text{m}$, longueur $L=3{,}0\\,\\text{m}$) et arrive en bas à $v=4{,}0\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie cinétique en bas et l\'énergie $mgh$.' },
        { n: 'b', text: 'En déduire l\'énergie dissipée par les frottements.' },
        { n: 'c', text: 'Déterminer la valeur moyenne de la force de frottement.' },
      ],
    }],
  },
  {
    id: 'energie-18',
    context: 'Sur une piste sans frottement, un chariot de masse $m=0{,}20\\,\\text{kg}$ part sans vitesse d\'une hauteur $H$. On veut qu\'il passe un point situé à $h=0{,}40\\,\\text{m}$ avec une vitesse $v=2{,}0\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire la conservation de l\'énergie mécanique entre le départ et ce point.' },
        { n: 'b', text: 'En déduire l\'expression de $H$ puis sa valeur.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const ENERGIE_CORRECTIONS: Record<string, Correction> = {
  'energie-1': {
    steps: [
      { n: '1', text: '$W=F\\times d\\times\\cos 0°=120\\times 15\\times 1=1{,}8\\times 10^{3}\\,\\text{J}$ (travail moteur).' },
    ],
    result: '$W=1{,}8\\times 10^{3}\\,\\text{J}$.',
  },
  'energie-2': {
    steps: [
      { n: '1', text: '$W=F\\times d\\times\\cos\\alpha=80\\times 12\\times\\cos 40°\\approx 7{,}4\\times 10^{2}\\,\\text{J}$.' },
    ],
    result: '$W\\approx 735\\,\\text{J}$.',
  },
  'energie-3': {
    steps: [
      { n: '1', text: '$W(\\vec{P})=mgh=3{,}0\\times 9{,}81\\times 5{,}0\\approx 1{,}5\\times 10^{2}\\,\\text{J}$ (descente : travail moteur).' },
    ],
    result: '$W\\approx 147\\,\\text{J}$.',
  },
  'energie-4': {
    steps: [
      { n: '1', text: 'En montée, $z_B>z_A$ : $W(\\vec{P})=-mgh=-5{,}0\\times 9{,}81\\times 8{,}0\\approx -3{,}9\\times 10^{2}\\,\\text{J}$.' },
      { n: '2', text: 'Travail **résistant** (le poids s\'oppose à la montée).' },
    ],
    result: '$W\\approx -392\\,\\text{J}$ (résistant).',
  },
  'energie-5': {
    steps: [
      { n: '1', text: '$E_c=\\tfrac{1}{2}mv^2=\\tfrac{1}{2}\\times 1200\\times 20^2=2{,}4\\times 10^{5}\\,\\text{J}$.' },
    ],
    result: '$E_c=2{,}4\\times 10^{5}\\,\\text{J}$.',
  },
  'energie-6': {
    steps: [
      { n: '1', text: '$E_m=\\tfrac{1}{2}mv^2+mgz=\\tfrac{1}{2}\\times 2{,}0\\times 5{,}0^2+2{,}0\\times 9{,}81\\times 10=25+196\\approx 2{,}2\\times 10^{2}\\,\\text{J}$.' },
    ],
    result: '$E_m\\approx 221\\,\\text{J}$.',
  },
  'energie-7': {
    steps: [
      { n: '1', text: 'La réaction normale $\\vec{R}$ est perpendiculaire au déplacement horizontal : $\\alpha=90°$, donc $\\cos\\alpha=0$ et $W(\\vec{R})=0$.' },
      { n: '2', text: 'La réaction normale ne travaille pas.' },
    ],
    result: '$W(\\vec{R})=0$ : la réaction normale ne travaille pas.',
  },
  'energie-8': {
    steps: [
      { n: 'a', text: '$W(\\vec{P})=mgh=10\\times 9{,}81\\times 2{,}0\\approx 2{,}0\\times 10^{2}\\,\\text{J}$.' },
      { n: 'b', text: 'Il **ne dépend pas** de la longueur du plan : seule la dénivellation $h$ intervient.' },
    ],
    result: '$W\\approx 196\\,\\text{J}$, indépendant de la longueur du plan.',
  },
  'energie-9': {
    steps: [
      { n: '1', text: 'Seul le poids travaille. TEC : $\\tfrac{1}{2}mv^2-0=mgh$, d\'où $v=\\sqrt{2gh}=\\sqrt{2\\times 9{,}81\\times 20}\\approx 20\\,\\text{m·s}^{-1}$ (soit $19{,}8\\,\\text{m·s}^{-1}$).' },
    ],
    result: '$v\\approx 19{,}8\\,\\text{m·s}^{-1}$.',
  },
  'energie-10': {
    steps: [
      { n: '1', text: 'Sans frottement, $E_m$ se conserve : $\\tfrac{1}{2}mv^2=mgh$, d\'où $v=\\sqrt{2gh}=\\sqrt{2\\times 9{,}81\\times 3{,}0}\\approx 7{,}7\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 7{,}7\\,\\text{m·s}^{-1}$.',
  },
  'energie-11': {
    steps: [
      { n: '1', text: 'Conservation de $E_m$ : $v=\\sqrt{2gh}=\\sqrt{2\\times 9{,}81\\times 0{,}50}\\approx 3{,}1\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 3{,}1\\,\\text{m·s}^{-1}$.',
  },
  'energie-12': {
    steps: [
      { n: '1', text: 'TEC : $0-\\tfrac{1}{2}mv^2=-f\\times d$, d\'où $f=\\dfrac{mv^2}{2d}=\\dfrac{4{,}0\\times 6{,}0^2}{2\\times 9{,}0}=8{,}0\\,\\text{N}$.' },
    ],
    result: '$f=8{,}0\\,\\text{N}$.',
  },
  'energie-13': {
    steps: [
      { n: '1', text: 'TEC : $0-\\tfrac{1}{2}mv^2=-F\\times d$, d\'où $F=\\dfrac{mv^2}{2d}=\\dfrac{1000\\times 30^2}{2\\times 75}=6{,}0\\times 10^{3}\\,\\text{N}$.' },
    ],
    result: '$F=6{,}0\\times 10^{3}\\,\\text{N}$.',
  },
  'energie-14': {
    steps: [
      { n: 'a', text: 'Bilan : $E_c^{\\text{bas}}=mgh-fL=5{,}0\\times 9{,}81\\times 4{,}0-8{,}0\\times 10\\approx 116\\,\\text{J}$. Donc $v=\\sqrt{\\dfrac{2E_c}{m}}=\\sqrt{\\dfrac{2\\times 116}{5{,}0}}\\approx 6{,}8\\,\\text{m·s}^{-1}$.' },
      { n: 'b', text: 'Sans frottement, on aurait $v=\\sqrt{2gh}\\approx 8{,}9\\,\\text{m·s}^{-1}$ : les frottements réduisent la vitesse.' },
    ],
    result: '$v\\approx 6{,}8\\,\\text{m·s}^{-1}$ (vs $8{,}9$ sans frottement).',
  },
  'energie-15': {
    steps: [
      { n: '1', text: 'Énergie dissipée = perte d\'énergie mécanique : $|\\Delta E_m|=mgh-\\tfrac{1}{2}mv^2=70\\times 9{,}81\\times 50-\\tfrac{1}{2}\\times 70\\times 25^2\\approx 1{,}2\\times 10^{4}\\,\\text{J}$.' },
    ],
    result: '$E_{\\text{dissipée}}\\approx 1{,}2\\times 10^{4}\\,\\text{J}$.',
  },
  'energie-16': {
    steps: [
      { n: 'a', text: 'En négligeant l\'air, la seule force est le poids $\\vec{P}$, qui travaille (la bille se déplace verticalement).' },
      { n: 'b', text: 'TEC : $\\tfrac{1}{2}mv^2-0=W(\\vec{P})=mgh$, d\'où $v=\\sqrt{2gh}=\\sqrt{2\\times 9{,}81\\times 1{,}8}\\approx 5{,}9\\,\\text{m·s}^{-1}$.' },
      { n: 'c', text: '$E_c=\\tfrac{1}{2}\\times 0{,}100\\times 5{,}94^2\\approx 1{,}8\\,\\text{J}$. Or $mgh=0{,}100\\times 9{,}81\\times 1{,}8\\approx 1{,}8\\,\\text{J}$ : les deux coïncident, conformément au TEC.' },
    ],
    result: '$v\\approx 5{,}9\\,\\text{m·s}^{-1}$ ; $E_c\\approx 1{,}8\\,\\text{J}=mgh$.',
  },
  'energie-17': {
    steps: [
      { n: 'a', text: '$E_c=\\tfrac{1}{2}mv^2=\\tfrac{1}{2}\\times 2{,}0\\times 4{,}0^2=16\\,\\text{J}$ ; $mgh=2{,}0\\times 9{,}81\\times 1{,}5\\approx 29{,}4\\,\\text{J}$.' },
      { n: 'b', text: 'Sans frottement, l\'énergie cinétique en bas vaudrait $mgh$. L\'écart correspond à l\'énergie dissipée : $E_{\\text{diss}}=mgh-E_c=29{,}4-16\\approx 13{,}4\\,\\text{J}$.' },
      { n: 'c', text: '$E_{\\text{diss}}=f\\times L$, donc $f=\\dfrac{E_{\\text{diss}}}{L}=\\dfrac{13{,}4}{3{,}0}\\approx 4{,}5\\,\\text{N}$.' },
    ],
    result: '$E_c=16\\,\\text{J}$ ; $E_{\\text{diss}}\\approx 13{,}4\\,\\text{J}$ ; $f\\approx 4{,}5\\,\\text{N}$.',
  },
  'energie-18': {
    steps: [
      { n: 'a', text: 'Sans frottement, $E_m$ se conserve entre le départ ($v=0$, $z=H$) et le point ($v$, $z=h$) : $mgH=\\tfrac{1}{2}mv^2+mgh$.' },
      { n: 'b', text: 'En simplifiant par $m$ : $gH=\\tfrac{1}{2}v^2+gh$, d\'où $H=h+\\dfrac{v^2}{2g}=0{,}40+\\dfrac{2{,}0^2}{2\\times 9{,}81}\\approx 0{,}60\\,\\text{m}$.' },
    ],
    result: '$H\\approx 0{,}60\\,\\text{m}$.',
  },
};
