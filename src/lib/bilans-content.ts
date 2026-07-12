import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const BILANS_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le premier principe s\'écrit…',
    options: [
      { label: 'a', text: '$\\Delta U=W+Q$' },
      { label: 'b', text: '$\\Delta U=W-Q$' },
      { label: 'c', text: '$\\Delta U=Q-W$' },
      { label: 'd', text: '$U=W+Q$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'L\'énergie pour chauffer un corps vaut…',
    options: [
      { label: 'a', text: '$Q=mc\\Delta T$' },
      { label: 'b', text: '$Q=\\dfrac{mc}{\\Delta T}$' },
      { label: 'c', text: '$Q=m\\Delta T$' },
      { label: 'd', text: '$Q=c\\Delta T$' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Pour un système qui reçoit de l\'énergie, $Q$ est…',
    options: [
      { label: 'a', text: 'positif' },
      { label: 'b', text: 'négatif' },
      { label: 'c', text: 'nul' },
      { label: 'd', text: 'indéterminé' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Le flux thermique s\'exprime en…',
    options: [
      { label: 'a', text: '$\\text{J}$' },
      { label: 'b', text: '$\\text{W}$' },
      { label: 'c', text: '$\\text{K}$' },
      { label: 'd', text: '$°\\text{C}$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'La conduction thermique se fait…',
    options: [
      { label: 'a', text: 'par ondes' },
      { label: 'b', text: 'par déplacement de fluide' },
      { label: 'c', text: 'par contact, sans déplacement de matière' },
      { label: 'd', text: 'uniquement dans le vide' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: 'La résistance thermique d\'une paroi vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{\\lambda S}{e}$' },
      { label: 'b', text: '$\\dfrac{e}{\\lambda S}$' },
      { label: 'c', text: '$\\dfrac{e\\lambda}{S}$' },
      { label: 'd', text: '$e\\lambda S$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Le rayonnement thermique…',
    options: [
      { label: 'a', text: 'nécessite un support matériel' },
      { label: 'b', text: 'se propage dans le vide' },
      { label: 'c', text: 'ne concerne que les liquides' },
      { label: 'd', text: 'est un cas de convection' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'En régime stationnaire, le flux à travers une paroi vaut…',
    options: [
      { label: 'a', text: '$\\Phi=\\dfrac{\\Delta T}{R_{th}}$' },
      { label: 'b', text: '$\\Phi=R_{th}\\,\\Delta T$' },
      { label: 'c', text: '$\\Phi=\\dfrac{R_{th}}{\\Delta T}$' },
      { label: 'd', text: '$\\Phi=R_{th}+\\Delta T$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'La capacité thermique massique de l\'eau vaut environ…',
    options: [
      { label: 'a', text: '$418$' },
      { label: 'b', text: '$4180$' },
      { label: 'c', text: '$41800$' },
      { label: 'd', text: '$100$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Un bon isolant a une résistance thermique…',
    options: [
      { label: 'a', text: 'grande' },
      { label: 'b', text: 'petite' },
      { label: 'c', text: 'nulle' },
      { label: 'd', text: 'négative' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const BILANS_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'bilans-1',
    context: 'Premier principe : $\\Delta U=W+Q$. Une énergie reçue est comptée positivement.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un système reçoit $Q=+30\\,\\text{kJ}$ par transfert thermique et $W=+5\\,\\text{kJ}$ par travail. Calculer la variation d\'énergie interne $\\Delta U$.' },
      ],
    }],
  },
  {
    id: 'bilans-2',
    context: 'Conventions de signe : reçu $>0$, cédé $<0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un gaz cède $200\\,\\text{J}$ de chaleur et reçoit $150\\,\\text{J}$ de travail. Déterminer $\\Delta U$.' },
      ],
    }],
  },
  {
    id: 'bilans-3',
    context: 'Relation fondamentale : $Q=mc\\Delta T$, avec $c_{\\text{eau}}=4180\\,\\text{J·kg}^{-1}\\text{·K}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie nécessaire pour chauffer $2{,}0\\,\\text{kg}$ d\'eau de $15\\,°\\text{C}$ à $65\\,°\\text{C}$.' },
      ],
    }],
  },
  {
    id: 'bilans-4',
    context: 'Flux thermique : $\\Phi=\\dfrac{Q}{\\Delta t}$ (en watts).',
    parts: [{
      questions: [
        { n: 'a', text: 'Une énergie de $1{,}8\\times 10^{6}\\,\\text{J}$ traverse une paroi en $1{,}0\\,\\text{h}$. Calculer le flux thermique.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'bilans-5',
    context: 'Un bloc métallique se refroidit à l\'air libre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Préciser le signe de $Q$ pour le bloc, et ce que devient son énergie interne.' },
      ],
    }],
  },
  {
    id: 'bilans-6',
    context: 'Autre matériau : $c_{\\text{fer}}=450\\,\\text{J·kg}^{-1}\\text{·K}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie nécessaire pour chauffer $500\\,\\text{g}$ de fer de $20\\,°\\text{C}$ à $120\\,°\\text{C}$.' },
      ],
    }],
  },
  {
    id: 'bilans-7',
    context: 'Capacité thermique de l\'objet entier : $C=mc$, puis $Q=C\\,\\Delta T$. On prend $c_{\\text{alu}}=900\\,\\text{J·kg}^{-1}\\text{·K}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un bloc d\'aluminium a une masse de $3{,}0\\,\\text{kg}$. Calculer sa capacité thermique $C$, puis l\'énergie à fournir pour l\'échauffer de $40\\,\\text{K}$.' },
      ],
    }],
  },
  {
    id: 'bilans-8',
    context: 'On isole la température finale à partir de $Q=mc\\Delta T$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On fournit $50\\,\\text{kJ}$ à $1{,}0\\,\\text{kg}$ d\'eau initialement à $20\\,°\\text{C}$. Déterminer la température finale.' },
      ],
    }],
  },
  {
    id: 'bilans-9',
    context: 'Système isolé : $\\sum Q_i=0$. Les deux corps ont la même capacité massique (eau).',
    parts: [{
      questions: [
        { n: 'a', text: 'On mélange $0{,}40\\,\\text{kg}$ d\'eau à $70\\,°\\text{C}$ et $0{,}60\\,\\text{kg}$ d\'eau à $10\\,°\\text{C}$ (système isolé). Déterminer la température d\'équilibre.' },
      ],
    }],
  },
  {
    id: 'bilans-10',
    context: 'Résistance d\'une paroi plane : $R_{th}=\\dfrac{e}{\\lambda S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la résistance thermique d\'un mur d\'épaisseur $0{,}25\\,\\text{m}$, de conductivité $\\lambda=1{,}2\\,\\text{W·m}^{-1}\\text{·K}^{-1}$ et de surface $15\\,\\text{m}^2$.' },
      ],
    }],
  },
  {
    id: 'bilans-11',
    context: 'Régime stationnaire : $\\Phi=\\dfrac{\\Delta T}{R_{th}}$. On reprend le mur de l\'exercice précédent ($R_{th}\\approx 0{,}0139\\,\\text{K·W}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le flux thermique lorsque l\'écart de température vaut $18\\,\\text{K}$.' },
      ],
    }],
  },
  {
    id: 'bilans-12',
    context: 'Chauffe-eau : $Q=mc\\Delta T$, avec $1\\,\\text{L}$ d\'eau $\\approx 1\\,\\text{kg}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie nécessaire pour porter $150\\,\\text{L}$ d\'eau de $15\\,°\\text{C}$ à $55\\,°\\text{C}$.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'bilans-13',
    context: 'Calorimètre parfait (système isolé) : $\\sum m_i c_i (T_{eq}-T_i)=0$. Données : $c_{\\text{fer}}=450$, $c_{\\text{eau}}=4180\\,\\text{J·kg}^{-1}\\text{·K}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un morceau de fer de $0{,}20\\,\\text{kg}$ à $200\\,°\\text{C}$ est plongé dans $1{,}0\\,\\text{kg}$ d\'eau à $20\\,°\\text{C}$. Déterminer la température d\'équilibre.' },
      ],
    }],
  },
  {
    id: 'bilans-14',
    context: 'À épaisseur et surface égales, $R_{th}=\\dfrac{e}{\\lambda S}\\propto\\dfrac{1}{\\lambda}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On compare la laine de verre ($\\lambda=0{,}04$) et le béton ($\\lambda=1{,}5$, en $\\text{W·m}^{-1}\\text{·K}^{-1}$). Combien de fois la laine isole-t-elle mieux ?' },
      ],
    }],
  },
  {
    id: 'bilans-15',
    context: 'Puissance thermique : $P=\\dfrac{Q}{\\Delta t}$. On reprend le chauffe-eau ($Q\\approx 2{,}508\\times 10^{7}\\,\\text{J}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Le chauffe-eau réalise cette opération en $2{,}0\\,\\text{h}$. Calculer sa puissance thermique.' },
      ],
    }],
  },
  {
    id: 'bilans-16',
    context: 'Pertes d\'une maison en régime stationnaire : $\\Phi=\\dfrac{\\Delta T}{R_{th}}$ puis $E=\\Phi\\,\\Delta t$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une maison a une résistance thermique globale $R_{th}=5{,}0\\times 10^{-3}\\,\\text{K·W}^{-1}$, l\'écart intérieur-extérieur étant $20\\,\\text{K}$. Calculer le flux perdu, puis l\'énergie perdue en $24\\,\\text{h}$.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'bilans-17',
    context: 'Calorimétrie (cuivre + eau). Un bloc de cuivre de $0{,}50\\,\\text{kg}$ à $90\\,°\\text{C}$ est plongé dans $0{,}80\\,\\text{kg}$ d\'eau à $18\\,°\\text{C}$, dans un calorimètre parfait. Données : $c_{\\text{cuivre}}=385$, $c_{\\text{eau}}=4180\\,\\text{J·kg}^{-1}\\text{·K}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire le bilan énergétique du système isolé.' },
        { n: 'b', text: 'Déterminer la température d\'équilibre.' },
        { n: 'c', text: 'Vérifier le signe de l\'énergie échangée par chaque corps.' },
      ],
    }],
  },
  {
    id: 'bilans-18',
    context: 'Isolation d\'un mur de surface $S=20\\,\\text{m}^2$, d\'épaisseur $e=0{,}30\\,\\text{m}$, de conductivité $\\lambda=0{,}90\\,\\text{W·m}^{-1}\\text{·K}^{-1}$, avec $\\Delta T=15\\,\\text{K}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la résistance thermique et le flux thermique.' },
        { n: 'b', text: 'En déduire l\'énergie perdue en $24\\,\\text{h}$.' },
        { n: 'c', text: 'On ajoute un isolant ($e\'=0{,}10\\,\\text{m}$, $\\lambda\'=0{,}04$). Calculer la nouvelle résistance (résistances en série) et le nouveau flux. Conclure.' },
      ],
    }],
  },
  {
    id: 'bilans-19',
    context: 'Chauffage d\'une piscine contenant $30\\,\\text{m}^3$ d\'eau ($30\\,000\\,\\text{kg}$) à $18\\,°\\text{C}$. On souhaite la chauffer à $26\\,°\\text{C}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer l\'énergie thermique nécessaire.' },
        { n: 'b', text: 'Déterminer la durée de chauffage avec une pompe à chaleur fournissant $15\\,\\text{kW}$.' },
        { n: 'c', text: 'Expliquer qualitativement pourquoi, en réalité, la température se stabilise avant $26\\,°\\text{C}$ (pertes).' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const BILANS_CORRECTIONS: Record<string, Correction> = {
  'bilans-1': {
    steps: [
      { n: '1', text: '$\\Delta U=W+Q=(+5)+(+30)=+35\\,\\text{kJ}$ : l\'énergie interne augmente.' },
    ],
    result: '$\\Delta U=+35\\,\\text{kJ}$.',
  },
  'bilans-2': {
    steps: [
      { n: '1', text: 'Chaleur cédée : $Q=-200\\,\\text{J}$ ; travail reçu : $W=+150\\,\\text{J}$.' },
      { n: '2', text: '$\\Delta U=W+Q=(+150)+(-200)=-50\\,\\text{J}$ : l\'énergie interne diminue.' },
    ],
    result: '$\\Delta U=-50\\,\\text{J}$.',
  },
  'bilans-3': {
    steps: [
      { n: '1', text: '$Q=mc\\Delta T=2{,}0\\times 4180\\times(65-15)=2{,}0\\times 4180\\times 50\\approx 4{,}2\\times 10^{5}\\,\\text{J}=418\\,\\text{kJ}$.' },
    ],
    result: '$Q\\approx 418\\,\\text{kJ}$.',
  },
  'bilans-4': {
    steps: [
      { n: '1', text: '$\\Phi=\\dfrac{Q}{\\Delta t}=\\dfrac{1{,}8\\times 10^{6}}{3600}=5{,}0\\times 10^{2}\\,\\text{W}$.' },
    ],
    result: '$\\Phi=500\\,\\text{W}$.',
  },
  'bilans-5': {
    steps: [
      { n: '1', text: 'Le bloc **cède** de l\'énergie au milieu : $Q<0$ pour le bloc.' },
      { n: '2', text: 'Son énergie interne diminue ($\\Delta U=Q<0$) et sa température baisse.' },
    ],
    result: '$Q<0$ : l\'énergie interne du bloc diminue, sa température baisse.',
  },
  'bilans-6': {
    steps: [
      { n: '1', text: '$Q=mc\\Delta T=0{,}500\\times 450\\times(120-20)=0{,}500\\times 450\\times 100=2{,}25\\times 10^{4}\\,\\text{J}=22{,}5\\,\\text{kJ}$.' },
    ],
    result: '$Q=22{,}5\\,\\text{kJ}$.',
  },
  'bilans-7': {
    steps: [
      { n: '1', text: '$C=mc=3{,}0\\times 900=2{,}7\\times 10^{3}\\,\\text{J·K}^{-1}$.' },
      { n: '2', text: '$Q=C\\,\\Delta T=2700\\times 40\\approx 1{,}1\\times 10^{5}\\,\\text{J}$.' },
    ],
    result: '$C=2700\\,\\text{J·K}^{-1}$ ; $Q\\approx 1{,}08\\times 10^{5}\\,\\text{J}$.',
  },
  'bilans-8': {
    steps: [
      { n: '1', text: '$\\Delta T=\\dfrac{Q}{mc}=\\dfrac{50\\,000}{1{,}0\\times 4180}\\approx 12\\,\\text{K}$.' },
      { n: '2', text: 'D\'où $T_f=20+12=32\\,°\\text{C}$.' },
    ],
    result: '$T_f\\approx 32\\,°\\text{C}$.',
  },
  'bilans-9': {
    steps: [
      { n: '1', text: 'Système isolé : $m_1 c(T_{eq}-70)+m_2 c(T_{eq}-10)=0$.' },
      { n: '2', text: '$T_{eq}=\\dfrac{m_1\\times 70+m_2\\times 10}{m_1+m_2}=\\dfrac{0{,}40\\times 70+0{,}60\\times 10}{1{,}0}=34\\,°\\text{C}$.' },
    ],
    result: '$T_{eq}=34\\,°\\text{C}$.',
  },
  'bilans-10': {
    steps: [
      { n: '1', text: '$R_{th}=\\dfrac{e}{\\lambda S}=\\dfrac{0{,}25}{1{,}2\\times 15}\\approx 1{,}4\\times 10^{-2}\\,\\text{K·W}^{-1}$.' },
    ],
    result: '$R_{th}\\approx 0{,}014\\,\\text{K·W}^{-1}$.',
  },
  'bilans-11': {
    steps: [
      { n: '1', text: '$\\Phi=\\dfrac{\\Delta T}{R_{th}}=\\dfrac{18}{0{,}0139}\\approx 1{,}3\\times 10^{3}\\,\\text{W}$ (soit $1296\\,\\text{W}$).' },
    ],
    result: '$\\Phi\\approx 1{,}3\\times 10^{3}\\,\\text{W}$.',
  },
  'bilans-12': {
    steps: [
      { n: '1', text: '$150\\,\\text{L}$ d\'eau $\\approx 150\\,\\text{kg}$. $Q=mc\\Delta T=150\\times 4180\\times(55-15)\\approx 2{,}5\\times 10^{7}\\,\\text{J}=25{,}1\\,\\text{MJ}$.' },
    ],
    result: '$Q\\approx 25{,}1\\,\\text{MJ}$.',
  },
  'bilans-13': {
    steps: [
      { n: '1', text: 'Système isolé : $m_{\\text{fer}}c_{\\text{fer}}(T_{eq}-200)+m_{\\text{eau}}c_{\\text{eau}}(T_{eq}-20)=0$.' },
      { n: '2', text: '$T_{eq}=\\dfrac{0{,}20\\times 450\\times 200+1{,}0\\times 4180\\times 20}{0{,}20\\times 450+1{,}0\\times 4180}=\\dfrac{101\\,600}{4270}\\approx 23{,}8\\,°\\text{C}$.' },
    ],
    result: '$T_{eq}\\approx 23{,}8\\,°\\text{C}$.',
  },
  'bilans-14': {
    steps: [
      { n: '1', text: 'À $e$ et $S$ égaux, $R_{th}=\\dfrac{e}{\\lambda S}\\propto\\dfrac{1}{\\lambda}$.' },
      { n: '2', text: '$\\dfrac{R_{\\text{laine}}}{R_{\\text{béton}}}=\\dfrac{\\lambda_{\\text{béton}}}{\\lambda_{\\text{laine}}}=\\dfrac{1{,}5}{0{,}04}\\approx 38$.' },
    ],
    result: 'La laine de verre isole environ **38 fois mieux**.',
  },
  'bilans-15': {
    steps: [
      { n: '1', text: '$P=\\dfrac{Q}{\\Delta t}=\\dfrac{2{,}508\\times 10^{7}}{2{,}0\\times 3600}\\approx 3{,}5\\times 10^{3}\\,\\text{W}=3{,}5\\,\\text{kW}$.' },
    ],
    result: '$P\\approx 3{,}5\\,\\text{kW}$.',
  },
  'bilans-16': {
    steps: [
      { n: '1', text: '$\\Phi=\\dfrac{\\Delta T}{R_{th}}=\\dfrac{20}{5{,}0\\times 10^{-3}}=4{,}0\\times 10^{3}\\,\\text{W}$.' },
      { n: '2', text: 'Sur $24\\,\\text{h}$ : $E=\\Phi\\,\\Delta t=4000\\times 86\\,400\\approx 3{,}5\\times 10^{8}\\,\\text{J}=346\\,\\text{MJ}$.' },
    ],
    result: '$\\Phi=4{,}0\\,\\text{kW}$ ; $E\\approx 346\\,\\text{MJ/jour}$.',
  },
  'bilans-17': {
    steps: [
      { n: 'a', text: 'Système isolé : la somme des énergies échangées est nulle, $m_{\\text{Cu}}c_{\\text{Cu}}(T_{eq}-90)+m_{\\text{eau}}c_{\\text{eau}}(T_{eq}-18)=0$.' },
      { n: 'b', text: '$T_{eq}=\\dfrac{m_{\\text{Cu}}c_{\\text{Cu}}\\times 90+m_{\\text{eau}}c_{\\text{eau}}\\times 18}{m_{\\text{Cu}}c_{\\text{Cu}}+m_{\\text{eau}}c_{\\text{eau}}}=\\dfrac{0{,}50\\times 385\\times 90+0{,}80\\times 4180\\times 18}{0{,}50\\times 385+0{,}80\\times 4180}\\approx 21{,}9\\,°\\text{C}$.' },
      { n: 'c', text: '$Q_{\\text{Cu}}=m_{\\text{Cu}}c_{\\text{Cu}}(21{,}9-90)<0$ (le cuivre cède) et $Q_{\\text{eau}}=m_{\\text{eau}}c_{\\text{eau}}(21{,}9-18)>0$ (l\'eau reçoit) : cohérent avec $Q_{\\text{Cu}}+Q_{\\text{eau}}=0$.' },
    ],
    result: '$T_{eq}\\approx 21{,}9\\,°\\text{C}$.',
  },
  'bilans-18': {
    steps: [
      { n: 'a', text: '$R_1=\\dfrac{e}{\\lambda S}=\\dfrac{0{,}30}{0{,}90\\times 20}\\approx 1{,}7\\times 10^{-2}\\,\\text{K·W}^{-1}$ ; $\\Phi_1=\\dfrac{\\Delta T}{R_1}=\\dfrac{15}{0{,}0167}\\approx 9{,}0\\times 10^{2}\\,\\text{W}$.' },
      { n: 'b', text: '$E=\\Phi_1\\,\\Delta t=900\\times 86\\,400\\approx 7{,}8\\times 10^{7}\\,\\text{J}=77{,}8\\,\\text{MJ}$.' },
      { n: 'c', text: '$R_{\\text{iso}}=\\dfrac{0{,}10}{0{,}04\\times 20}=0{,}125\\,\\text{K·W}^{-1}$. En série : $R_{\\text{tot}}=R_1+R_{\\text{iso}}\\approx 0{,}142\\,\\text{K·W}^{-1}$, d\'où $\\Phi_2=\\dfrac{15}{0{,}142}\\approx 1{,}1\\times 10^{2}\\,\\text{W}$. Le flux est divisé par $\\approx 8{,}5$ : l\'isolant réduit très fortement les pertes.' },
    ],
    result: '$\\Phi_1\\approx 900\\,\\text{W}\\rightarrow\\Phi_2\\approx 106\\,\\text{W}$.',
  },
  'bilans-19': {
    steps: [
      { n: 'a', text: '$Q=mc\\Delta T=30\\,000\\times 4180\\times(26-18)\\approx 1{,}0\\times 10^{9}\\,\\text{J}=1003\\,\\text{MJ}$.' },
      { n: 'b', text: '$\\Delta t=\\dfrac{Q}{P}=\\dfrac{1{,}0032\\times 10^{9}}{15\\,000}\\approx 6{,}7\\times 10^{4}\\,\\text{s}\\approx 18{,}6\\,\\text{h}$.' },
      { n: 'c', text: 'La piscine perd de l\'énergie vers l\'extérieur (évaporation, convection, rayonnement) d\'autant plus que l\'écart de température est grand. Lorsque ces pertes compensent l\'apport de $15\\,\\text{kW}$, la température se stabilise (régime stationnaire) à une valeur inférieure à $26\\,°\\text{C}$.' },
    ],
    result: '$Q\\approx 1003\\,\\text{MJ}$ ; $\\Delta t\\approx 18{,}6\\,\\text{h}$.',
  },
};
