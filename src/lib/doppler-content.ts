import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const DOPPLER_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'L\'effet Doppler est dû…',
    options: [
      { label: 'a', text: 'au mouvement relatif source-récepteur' },
      { label: 'b', text: 'à un changement de milieu' },
      { label: 'c', text: 'à la diffraction' },
      { label: 'd', text: 'à l\'amplitude' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Une source qui s\'approche : la fréquence perçue…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 's\'annule' },
    ],
    answer: 'a',
  },
  {
    n: 3,
    text: 'Une source qui s\'éloigne : la longueur d\'onde perçue…',
    options: [
      { label: 'a', text: 'diminue' },
      { label: 'b', text: 'augmente' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 's\'annule' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'La fréquence perçue à l\'approche vaut…',
    options: [
      { label: 'a', text: '$f_E\\dfrac{v}{v-v_S}$' },
      { label: 'b', text: '$f_E\\dfrac{v}{v+v_S}$' },
      { label: 'c', text: '$f_E\\dfrac{v-v_S}{v}$' },
      { label: 'd', text: '$f_E\\dfrac{v_S}{v}$' },
    ],
    answer: 'a',
  },
  {
    n: 5,
    text: 'Le décalage Doppler vaut…',
    options: [
      { label: 'a', text: '$\\Delta f=f_R-f_E$' },
      { label: 'b', text: '$\\Delta f=f_R f_E$' },
      { label: 'c', text: '$\\Delta f=\\dfrac{f_E}{f_R}$' },
      { label: 'd', text: '$\\Delta f=f_R+f_E$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'En astrophysique ($v\\ll c$), $\\dfrac{\\Delta\\lambda}{\\lambda}$ vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{c}{v}$' },
      { label: 'b', text: '$\\dfrac{v}{c}$' },
      { label: 'c', text: '$v\\,c$' },
      { label: 'd', text: '$v+c$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Un décalage vers le rouge indique…',
    options: [
      { label: 'a', text: 'un rapprochement' },
      { label: 'b', text: 'un éloignement' },
      { label: 'c', text: 'l\'immobilité' },
      { label: 'd', text: 'une rotation' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'À cause de l\'effet Doppler, la célérité de l\'onde…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 'double' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: 'Pour un radar à écho sur cible mobile, le décalage est…',
    options: [
      { label: 'a', text: 'nul' },
      { label: 'b', text: 'doublé' },
      { label: 'c', text: 'divisé par 2' },
      { label: 'd', text: 'inchangé' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Pour l\'effet Doppler, seule compte la vitesse…',
    options: [
      { label: 'a', text: 'transversale' },
      { label: 'b', text: 'radiale' },
      { label: 'c', text: 'angulaire' },
      { label: 'd', text: 'de la lumière' },
    ],
    answer: 'b',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const DOPPLER_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'doppler-1',
    context: 'L\'effet Doppler décale la fréquence perçue selon le mouvement relatif source-récepteur.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une ambulance, sirène en marche, passe devant vous à vive allure. Décrire l\'évolution de la hauteur du son perçu et l\'expliquer.' },
      ],
    }],
  },
  {
    id: 'doppler-2',
    context: 'Vers l\'arrière, les fronts d\'onde s\'espacent.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une source sonore s\'éloigne du récepteur. La longueur d\'onde perçue est-elle plus grande ou plus petite qu\'à l\'émission ? Et la fréquence ?' },
      ],
    }],
  },
  {
    id: 'doppler-3',
    context: 'À l\'approche : $f_R=f_E\\dfrac{v}{v-v_S}$, avec $v=340\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une source émet $f_E=500\\,\\text{Hz}$ et s\'approche à $v_S=20\\,\\text{m·s}^{-1}$. Calculer la fréquence perçue.' },
      ],
    }],
  },
  {
    id: 'doppler-4',
    context: 'À l\'éloignement : $f_R=f_E\\dfrac{v}{v+v_S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'La même source ($f_E=500\\,\\text{Hz}$) s\'éloigne à $20\\,\\text{m·s}^{-1}$. Calculer la fréquence perçue.' },
      ],
    }],
  },
  {
    id: 'doppler-5',
    context: 'Longueur d\'onde perçue : $\\lambda_R=\\lambda_E\\left(1\\mp\\dfrac{v_S}{v}\\right)$ ($-$ à l\'approche).',
    parts: [{
      questions: [
        { n: 'a', text: 'Une source émet une onde de longueur d\'onde $\\lambda_E=0{,}68\\,\\text{m}$ et s\'approche à $20\\,\\text{m·s}^{-1}$. Calculer la longueur d\'onde perçue.' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'doppler-6',
    context: 'Seule la composante radiale de la vitesse produit un décalage.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une source se déplace perpendiculairement à la ligne source-récepteur (mouvement transversal). Observe-t-on un décalage Doppler ? Justifier.' },
      ],
    }],
  },
  {
    id: 'doppler-7',
    context: 'Décalage Doppler : $\\Delta f=f_R-f_E$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une source ($f_E=1000\\,\\text{Hz}$) s\'approche à $34\\,\\text{m·s}^{-1}$. Calculer la fréquence perçue et le décalage Doppler $\\Delta f$.' },
      ],
    }],
  },
  {
    id: 'doppler-8',
    context: 'Source qui s\'éloigne : $f_R=f_E\\dfrac{v}{v+v_S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une moto émet un son à $f_E=900\\,\\text{Hz}$ et s\'éloigne à $40\\,\\text{m·s}^{-1}$. Calculer la fréquence perçue.' },
      ],
    }],
  },
  {
    id: 'doppler-9',
    context: 'Avec un écho, l\'onde subit deux décalages successifs.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi un radar à écho (onde émise puis réfléchie sur une cible mobile) est plus sensible qu\'une simple réception : que devient le décalage Doppler ?' },
      ],
    }],
  },
  {
    id: 'doppler-10',
    context: 'À l\'approche, $\\lambda_R=\\lambda_E\\left(1-\\dfrac{v_S}{v}\\right)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'La longueur d\'onde perçue est raccourcie de $5{,}0\\,\\%$. La source s\'approche-t-elle ou s\'éloigne ? Calculer sa vitesse.' },
      ],
    }],
  },
  {
    id: 'doppler-11',
    context: 'Astrophysique : $\\dfrac{\\Delta\\lambda}{\\lambda_E}=\\dfrac{v}{c}$, avec $c=3{,}00\\times 10^{8}\\,\\text{m·s}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une raie émise à $\\lambda_E=486{,}1\\,\\text{nm}$ est observée à $\\lambda_R=492\\,\\text{nm}$ dans le spectre d\'une galaxie. Déterminer sa vitesse radiale et son sens de déplacement.' },
      ],
    }],
  },
  {
    id: 'doppler-12',
    context: 'Décalage relatif : $\\dfrac{\\Delta\\lambda}{\\lambda_E}=\\dfrac{v}{c}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un quasar s\'éloigne à $v=3{,}0\\times 10^{7}\\,\\text{m·s}^{-1}$. Une raie Lyman-α est émise à $121{,}6\\,\\text{nm}$. Calculer la longueur d\'onde observée.' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'doppler-13',
    context: 'On isole $v_S$ à partir de $f_R=f_E\\dfrac{v}{v-v_S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'On mesure une fréquence perçue $f_R=1080\\,\\text{Hz}$ pour une source émettant $f_E=1000\\,\\text{Hz}$. La source s\'approche-t-elle ? Établir l\'expression de $v_S$ et la calculer.' },
      ],
    }],
  },
  {
    id: 'doppler-14',
    context: 'Un décalage $\\Delta\\lambda<0$ (vers le bleu) signale une approche.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une raie du sodium ($\\lambda_E=589{,}0\\,\\text{nm}$) est observée à $588{,}2\\,\\text{nm}$ dans le spectre d\'une étoile. Le décalage est-il vers le rouge ou le bleu ? Calculer la vitesse radiale.' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'doppler-15',
    context: 'Une ambulance dont la sirène émet $f_E=440\\,\\text{Hz}$ roule à $v_S=30\\,\\text{m·s}^{-1}$ ($v=340\\,\\text{m·s}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la fréquence perçue lorsqu\'elle s\'approche.' },
        { n: 'b', text: 'Calculer la fréquence perçue lorsqu\'elle s\'éloigne.' },
        { n: 'c', text: 'En déduire la variation de fréquence entendue au moment du passage.' },
      ],
    }],
  },
  {
    id: 'doppler-16',
    context: 'Un dispositif reçoit un signal sonore émis à $f_E=2000\\,\\text{Hz}$ par un véhicule qui s\'approche ; la fréquence mesurée est $f_R=2125\\,\\text{Hz}$ ($v=340\\,\\text{m·s}^{-1}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que le véhicule s\'approche.' },
        { n: 'b', text: 'Établir l\'expression de $v_S$ en fonction de $f_E$, $f_R$ et $v$.' },
        { n: 'c', text: 'Calculer $v_S$ en m·s⁻¹ puis en km·h⁻¹.' },
      ],
    }],
  },
  {
    id: 'doppler-17',
    context: 'La raie Hα de l\'hydrogène ($\\lambda_E=656{,}3\\,\\text{nm}$) est observée à $\\lambda_R=662\\,\\text{nm}$ dans le spectre d\'une galaxie.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le décalage est-il vers le rouge ou le bleu ? Qu\'en déduit-on sur le mouvement ?' },
        { n: 'b', text: 'Calculer la vitesse radiale de la galaxie.' },
        { n: 'c', text: 'La loi de Hubble s\'écrit $v=H_0\\,d$ avec $H_0=70\\,\\text{km·s}^{-1}\\text{·Mpc}^{-1}$. Estimer la distance de la galaxie (en Mpc).' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const DOPPLER_CORRECTIONS: Record<string, Correction> = {
  'doppler-1': {
    steps: [
      { n: '1', text: 'À l\'**approche**, le son perçu est plus **aigu** (fréquence augmentée) ; après le passage, en **s\'éloignant**, il devient plus **grave**.' },
      { n: '2', text: 'Le mouvement resserre les fronts d\'onde vers l\'avant et les espace vers l\'arrière.' },
    ],
    result: 'Aigu à l\'approche, grave à l\'éloignement (fronts resserrés / espacés).',
  },
  'doppler-2': {
    steps: [
      { n: '1', text: 'Source qui s\'éloigne : longueur d\'onde perçue **plus grande**, fréquence **plus petite** (son plus grave).' },
    ],
    result: '$\\lambda$ plus grande, $f$ plus petite.',
  },
  'doppler-3': {
    steps: [
      { n: '1', text: '$f_R=f_E\\dfrac{v}{v-v_S}=500\\times\\dfrac{340}{340-20}=500\\times\\dfrac{340}{320}\\approx 531\\,\\text{Hz}$.' },
    ],
    result: '$f_R\\approx 531\\,\\text{Hz}$ (plus aigu).',
  },
  'doppler-4': {
    steps: [
      { n: '1', text: '$f_R=f_E\\dfrac{v}{v+v_S}=500\\times\\dfrac{340}{360}\\approx 472\\,\\text{Hz}$.' },
    ],
    result: '$f_R\\approx 472\\,\\text{Hz}$ (plus grave).',
  },
  'doppler-5': {
    steps: [
      { n: '1', text: '$\\lambda_R=\\lambda_E\\left(1-\\dfrac{v_S}{v}\\right)=0{,}68\\times\\left(1-\\dfrac{20}{340}\\right)\\approx 0{,}64\\,\\text{m}$.' },
    ],
    result: '$\\lambda_R\\approx 0{,}64\\,\\text{m}$.',
  },
  'doppler-6': {
    steps: [
      { n: '1', text: 'Non (au premier ordre) : seule la composante **radiale** de la vitesse (celle qui rapproche ou éloigne) produit un décalage.' },
      { n: '2', text: 'Un mouvement purement transversal ne modifie pas la distance instantanée : pas d\'effet Doppler.' },
    ],
    result: 'Pas de décalage (seule la vitesse radiale compte).',
  },
  'doppler-7': {
    steps: [
      { n: '1', text: '$f_R=1000\\times\\dfrac{340}{340-34}=1000\\times\\dfrac{340}{306}\\approx 1111\\,\\text{Hz}$.' },
      { n: '2', text: '$\\Delta f=f_R-f_E\\approx 1111-1000=+111\\,\\text{Hz}$.' },
    ],
    result: '$f_R\\approx 1111\\,\\text{Hz}$ ; $\\Delta f\\approx +111\\,\\text{Hz}$.',
  },
  'doppler-8': {
    steps: [
      { n: '1', text: '$f_R=f_E\\dfrac{v}{v+v_S}=900\\times\\dfrac{340}{380}\\approx 805\\,\\text{Hz}$.' },
    ],
    result: '$f_R\\approx 805\\,\\text{Hz}$.',
  },
  'doppler-9': {
    steps: [
      { n: '1', text: 'Avec un écho, le décalage se produit **deux fois** (réception par la cible mobile, puis ré-émission) : le décalage total est **doublé**.' },
      { n: '2', text: 'Cela rend la mesure plus sensible.' },
    ],
    result: 'Décalage doublé → mesure plus sensible.',
  },
  'doppler-10': {
    steps: [
      { n: '1', text: 'La longueur d\'onde est raccourcie : la source **s\'approche**.' },
      { n: '2', text: '$\\lambda_R=\\lambda_E(1-v_S/v)=0{,}95\\,\\lambda_E\\Rightarrow\\dfrac{v_S}{v}=0{,}05$, d\'où $v_S=0{,}05\\times 340=17\\,\\text{m·s}^{-1}$.' },
    ],
    result: 'Approche · $v_S=17\\,\\text{m·s}^{-1}$.',
  },
  'doppler-11': {
    steps: [
      { n: '1', text: '$\\Delta\\lambda=492-486{,}1=5{,}9\\,\\text{nm}>0$ : décalage vers le **rouge**, la galaxie **s\'éloigne**.' },
      { n: '2', text: '$v=c\\dfrac{\\Delta\\lambda}{\\lambda_E}=3{,}0\\times 10^{8}\\times\\dfrac{5{,}9}{486{,}1}\\approx 3{,}6\\times 10^{6}\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 3{,}6\\times 10^{3}\\,\\text{km·s}^{-1}$ (éloignement).',
  },
  'doppler-12': {
    steps: [
      { n: '1', text: '$\\Delta\\lambda=\\lambda_E\\dfrac{v}{c}=121{,}6\\times\\dfrac{3{,}0\\times 10^{7}}{3{,}0\\times 10^{8}}=12{,}16\\,\\text{nm}$.' },
      { n: '2', text: 'D\'où $\\lambda_R=121{,}6+12{,}16\\approx 133{,}8\\,\\text{nm}$.' },
    ],
    result: '$\\lambda_R\\approx 133{,}8\\,\\text{nm}$.',
  },
  'doppler-13': {
    steps: [
      { n: '1', text: '$f_R>f_E$ : la source **s\'approche**.' },
      { n: '2', text: 'De $f_R=f_E\\dfrac{v}{v-v_S}$, on tire $v_S=v\\left(1-\\dfrac{f_E}{f_R}\\right)=340\\left(1-\\dfrac{1000}{1080}\\right)\\approx 25{,}2\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v_S\\approx 25\\,\\text{m·s}^{-1}$ (approche).',
  },
  'doppler-14': {
    steps: [
      { n: '1', text: '$\\Delta\\lambda=588{,}2-589{,}0=-0{,}8\\,\\text{nm}<0$ : décalage vers le **bleu**, l\'étoile **s\'approche**.' },
      { n: '2', text: '$v=c\\dfrac{|\\Delta\\lambda|}{\\lambda_E}=3{,}0\\times 10^{8}\\times\\dfrac{0{,}8}{589{,}0}\\approx 4{,}1\\times 10^{5}\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v\\approx 407\\,\\text{km·s}^{-1}$ (approche, bleu).',
  },
  'doppler-15': {
    steps: [
      { n: 'a', text: 'Approche : $f_R=f_E\\dfrac{v}{v-v_S}=440\\times\\dfrac{340}{340-30}=440\\times\\dfrac{340}{310}\\approx 482{,}6\\,\\text{Hz}$.' },
      { n: 'b', text: 'Éloignement : $f_R=440\\times\\dfrac{340}{370}\\approx 404{,}3\\,\\text{Hz}$.' },
      { n: 'c', text: 'Au passage, la fréquence chute de $482{,}6-404{,}3\\approx 78\\,\\text{Hz}$ : c\'est la variation brusque entendue.' },
    ],
    result: '$482{,}6\\,\\text{Hz}\\rightarrow 404{,}3\\,\\text{Hz}$ (chute $\\approx 78\\,\\text{Hz}$).',
  },
  'doppler-16': {
    steps: [
      { n: 'a', text: '$f_R=2125>f_E=2000$ : la fréquence perçue est plus grande, donc le véhicule **s\'approche**.' },
      { n: 'b', text: 'De $f_R=f_E\\dfrac{v}{v-v_S}$, on isole $v-v_S=v\\dfrac{f_E}{f_R}$, soit $v_S=v\\left(1-\\dfrac{f_E}{f_R}\\right)$.' },
      { n: 'c', text: '$v_S=340\\left(1-\\dfrac{2000}{2125}\\right)=340\\times\\dfrac{125}{2125}=20{,}0\\,\\text{m·s}^{-1}=72\\,\\text{km·h}^{-1}$.' },
    ],
    result: '$v_S=20\\,\\text{m·s}^{-1}=72\\,\\text{km·h}^{-1}$.',
  },
  'doppler-17': {
    steps: [
      { n: 'a', text: '$\\Delta\\lambda=662-656{,}3=5{,}7\\,\\text{nm}>0$ : décalage vers le **rouge**, donc la galaxie **s\'éloigne**.' },
      { n: 'b', text: '$v=c\\dfrac{\\Delta\\lambda}{\\lambda_E}=3{,}0\\times 10^{8}\\times\\dfrac{5{,}7}{656{,}3}\\approx 2{,}6\\times 10^{6}\\,\\text{m·s}^{-1}\\approx 2606\\,\\text{km·s}^{-1}$.' },
      { n: 'c', text: '$d=\\dfrac{v}{H_0}=\\dfrac{2606}{70}\\approx 37\\,\\text{Mpc}$.' },
    ],
    result: '$v\\approx 2606\\,\\text{km·s}^{-1}$ ; $d\\approx 37\\,\\text{Mpc}$.',
  },
};
