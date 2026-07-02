// ── QCM Flash ────────────────────────────────────────────────────────────────
export interface QcmQuestion {
  n: number;
  text: string;
  options: { label: string; text: string }[];
  answer: string;
}

export const NEWTON_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le vecteur vitesse $\\vec{v}$ est…',
    options: [
      { label: 'a', text: 'tangent à la trajectoire, orienté dans le sens du mouvement' },
      { label: 'b', text: 'parallèle au vecteur accélération' },
      { label: 'c', text: 'toujours vertical' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: "L'unité SI de l'accélération est…",
    options: [
      { label: 'a', text: '$\\text{m\\,s}^{-1}$' },
      { label: 'b', text: '$\\text{m\\,s}^{-2}$' },
      { label: 'c', text: '$\\text{N}$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La deuxième loi de Newton s\'écrit…',
    options: [
      { label: 'a', text: '$\\sum\\vec{F} = m\\vec{v}$' },
      { label: 'b', text: '$\\sum\\vec{F}_{\\text{ext}} = m\\vec{a}$' },
      { label: 'c', text: '$\\sum\\vec{F}_{\\text{ext}} = \\vec{0}$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Le principe d\'inertie n\'est valable que dans…',
    options: [
      { label: 'a', text: 'tout référentiel' },
      { label: 'b', text: 'un référentiel galiléen' },
      { label: 'c', text: 'le référentiel propre de l\'objet' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Dans le champ de pesanteur, sans frottement, l\'accélération d\'un projectile…',
    options: [
      { label: 'a', text: 'augmente avec la masse' },
      { label: 'b', text: 'est nulle' },
      { label: 'c', text: 'ne dépend pas de la masse ($\\vec{a} = \\vec{g}$)' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: 'La trajectoire d\'un projectile lancé obliquement (sans frottement) est…',
    options: [
      { label: 'a', text: 'une droite' },
      { label: 'b', text: 'une parabole' },
      { label: 'c', text: 'un arc de cercle' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Au sommet de la trajectoire d\'un projectile, la composante verticale de la vitesse vaut…',
    options: [
      { label: 'a', text: '$v_0$' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$v_0\\sin\\alpha$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Entre les plaques d\'un condensateur plan (tension $U$, distance $d$), le champ $E$ vaut…',
    options: [
      { label: 'a', text: '$E = U/d$' },
      { label: 'b', text: '$E = Ud$' },
      { label: 'c', text: '$E = d/U$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Dans un référentiel galiléen, si $\\sum\\vec{F}_{\\text{ext}} = \\vec{0}$, alors le centre d\'inertie est…',
    options: [
      { label: 'a', text: 'forcément immobile' },
      { label: 'b', text: 'au repos ou en MRU' },
      { label: 'c', text: 'en mouvement circulaire uniforme' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Les deux forces d\'une paire « action–réaction » s\'exercent…',
    options: [
      { label: 'a', text: 'sur le même corps' },
      { label: 'b', text: 'sur deux corps différents' },
      { label: 'c', text: 'toujours dans la direction verticale' },
    ],
    answer: 'b',
  },
  {
    n: 11,
    text: 'La force exercée par un champ $\\vec{E}$ sur un électron est…',
    options: [
      { label: 'a', text: 'dans le sens de $\\vec{E}$' },
      { label: 'b', text: 'opposée à $\\vec{E}$ (vers la plaque +)' },
      { label: 'c', text: 'perpendiculaire à $\\vec{E}$' },
    ],
    answer: 'b',
  },
  {
    n: 12,
    text: 'La portée d\'un tir depuis le sol est maximale pour un angle…',
    options: [
      { label: 'a', text: '$30°$' },
      { label: 'b', text: '$45°$' },
      { label: 'c', text: '$60°$' },
    ],
    answer: 'b',
  },
];

// ── Corrections ──────────────────────────────────────────────────────────────
export interface CorrectionStep {
  n?: string;      // "1", "2", "A.1" — omit for remark/non-numbered lines
  text: string;    // MixedText: $...$ for inline LaTeX, **...** for bold
  tex?: string;    // optional display-mode block formula
}

export interface Correction {
  steps: CorrectionStep[];
  result: string;  // RÉSULTAT line — MixedText
}

export const NEWTON_CORRECTIONS: Record<string, Correction> = {
  'newton-1': {
    steps: [
      { n: '1', text: 'On dérive chaque coordonnée de $\\overrightarrow{OM}(t) = 2t\\,\\vec{i} + (3t^2 - t)\\,\\vec{j}$ : $v_x = 2$, $v_y = 6t - 1$, soit $\\vec{v}(t) = 2\\,\\vec{i} + (6t-1)\\,\\vec{j}$.' },
      { n: '2', text: 'On dérive à nouveau : $a_x = 0$, $a_y = 6$, soit $\\vec{a}(t) = 6\\,\\vec{j}$. L\'accélération est **constante et non nulle** : le mouvement est uniformément accéléré.' },
    ],
    result: '$\\vec{v} = 2\\,\\vec{i} + (6t-1)\\,\\vec{j}$ ; $\\vec{a} = 6\\,\\vec{j}$ (constante) → **mouvement uniformément accéléré**.',
  },
  'newton-2': {
    steps: [
      { n: '1', text: '$\\vec{a} = \\dfrac{d\\vec{v}}{dt} = 0\\,\\vec{i} - 10\\,\\vec{j}$ : accélération **constante** → mouvement uniformément accéléré.' },
      { n: '2', text: 'On intègre chaque composante, les constantes étant fixées par $\\overrightarrow{OM}_0 = (0\\,;\\,0)$ :', tex: 'x = \\int 2\\,dt = 2t \\qquad y = \\int (6-10t)\\,dt = 6t - 5t^2' },
    ],
    result: '$\\vec{a} = -10\\,\\vec{j}$ ; $x(t) = 2t$, $y(t) = 6t - 5t^2$.',
  },
  'newton-3': {
    steps: [
      { text: '**Système :** le solide. Contact **sans frottement** → deux forces extérieures :' },
      { n: '1', text: 'le **poids** $\\vec{P} = m\\vec{g}$, vertical, dirigé vers le bas, appliqué en $G$ ;' },
      { n: '2', text: 'la **réaction normale** $\\vec{N}$ du plan, perpendiculaire au plan (aucune composante tangentielle).' },
      { text: '**Remarque.** Ces deux forces ne s\'équilibrent pas le long de la pente : un solide réellement sans frottement glisserait ($a = g\\sin\\beta$).' },
    ],
    result: '2 forces : le **poids** (vertical) et la **réaction normale** (⊥ au plan).',
  },
  'newton-4': {
    steps: [
      { n: '1', text: 'Forces : le poids $\\vec{P} = m\\vec{g}$ (vers le bas) et le frottement $\\vec{f}$ (vers le haut). Deuxième loi : $\\vec{P} + \\vec{f} = m\\vec{a}$.' },
      { n: '2', text: 'Sur un axe vertical orienté vers le bas : $mg - f = ma$, donc :', tex: 'a = \\frac{mg - f}{m} = g - \\frac{f}{m} = 9{,}81 - \\frac{0{,}15}{0{,}050} = 9{,}81 - 3{,}0' },
    ],
    result: '$a = g - \\dfrac{f}{m} = 6{,}8\\;\\text{m·s}^{-2}$ **(vers le bas)**.',
  },
  'newton-5': {
    steps: [
      { n: '1', text: '$\\vec{v} = \\int \\vec{a}\\,dt$ avec $\\vec{v}_0 = (5\\,;\\,0)$ : $v_x = 5$, $v_y = -10t$.' },
      { n: '2', text: '$\\overrightarrow{OM} = \\int \\vec{v}\\,dt$ avec $\\overrightarrow{OM}_0 = (0\\,;\\,20)$ : $x = 5t$, $y = -5t^2 + 20$.' },
    ],
    result: '$\\vec{v} = (5\\,;\\,-10t)$ ; $x = 5t$, $y = 20 - 5t^2$.',
  },
  'newton-6': {
    steps: [
      { n: '1', text: 'Le palet a un mouvement rectiligne uniforme dans un référentiel galiléen. D\'après le **principe d\'inertie**, la somme des forces est **nulle** : le poids est exactement compensé par la réaction de la glace.' },
      { n: '2', text: 'Le livre est immobile : deux forces, le poids $\\vec{P}$ (bas) et la réaction normale $\\vec{N}$ (haut). L\'immobilité impose $\\vec{P} + \\vec{N} = \\vec{0}$, donc $N = P = mg$.' },
    ],
    result: '$\\sum\\vec{F} = \\vec{0}$ dans les deux cas ; pour le livre, $N = P = mg$.',
  },
  'newton-7': {
    steps: [
      { n: '1', text: 'Si A exerce $\\vec{F}_{A/B}$ sur B, alors B exerce $\\vec{F}_{B/A} = -\\vec{F}_{A/B}$ sur A : même droite d\'action, même norme, sens opposé.' },
      { n: '2', text: '**Non.** Le poids (Terre → livre) et la réaction de la table (table → livre) s\'appliquent tous deux **au même corps**. Une paire action–réaction relie deux corps *différents* : ces deux forces se compensent par la 1ʳᵉ loi, pas par la 3ᵉ.' },
      { n: '3', text: 'Partenaire du poids (Terre → livre) : force **livre → Terre**. Partenaire de (livre → table) : force **table → livre** (la réaction normale).' },
    ],
    result: 'Poids & réaction ne forment pas une paire (même corps). Vraies paires : **Terre ↔ livre** et **livre ↔ table**.',
  },
  'newton-8': {
    steps: [
      { n: '1', tex: 'E = \\frac{U}{d} = \\frac{1000}{0{,}020} = 5{,}0 \\times 10^4\\;\\text{V·m}^{-1}', text: '' },
      { n: '2', tex: 'F = |q|\\,E = e\\,E = 1{,}6 \\times 10^{-19} \\times 5{,}0 \\times 10^4 = 8{,}0 \\times 10^{-15}\\;\\text{N}', text: '' },
    ],
    result: '$E = 5{,}0 \\times 10^4\\;\\text{V·m}^{-1}$ ; $F = 8{,}0 \\times 10^{-15}\\;\\text{N}$.',
  },
  'newton-9': {
    steps: [
      { n: '1', text: 'Poids négligé : $\\vec{F} = q\\vec{E} = m\\vec{a}$, donc :', tex: 'a = \\frac{eE}{m} = \\frac{1{,}6 \\times 10^{-19} \\times 1{,}0 \\times 10^3}{9{,}1 \\times 10^{-31}} = 1{,}8 \\times 10^{14}\\;\\text{m·s}^{-2}' },
      { n: '2', text: 'L\'électron a une charge $q < 0$ : $\\vec{a}$ est donc de **sens opposé** à $\\vec{E}$.' },
    ],
    result: '$a = 1{,}8 \\times 10^{14}\\;\\text{m·s}^{-2}$, **opposée à** $\\vec{E}$.',
  },
  'newton-10': {
    steps: [
      { n: '1', text: 'Seul le poids agit → $\\vec{a} = \\vec{g}$. Axe vers le bas, origine au lâcher, $v_0 = 0$ : $v_y = gt$ puis $y = \\tfrac{1}{2}gt^2$.' },
      { n: '2', tex: 't = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{40}{9{,}81}} = 2{,}02\\;\\text{s}', text: 'Impact au sol ($y = h$) :' },
      { n: '3', text: '$v = gt = 9{,}81 \\times 2{,}02 = 19{,}8\\;\\text{m·s}^{-1}$.' },
    ],
    result: '$t = 2{,}0\\;\\text{s}$ ; $v \\approx 20\\;\\text{m·s}^{-1}$.',
  },
  'newton-11': {
    steps: [
      { n: '1', text: 'Forces : poids $\\vec{P} = m\\vec{g}$ et réaction normale $\\vec{N}$ (⊥ plan). Deuxième loi : $\\vec{P} + \\vec{N} = m\\vec{a}$.' },
      { n: '2', text: 'Sur un axe parallèle à la pente (vers le bas), $\\vec{N}$ n\'a pas de composante : $mg\\sin\\beta = ma$, d\'où $a = g\\sin\\beta = 9{,}81 \\times \\sin 20° = 3{,}36\\;\\text{m·s}^{-2}$ (indépendant de $m$).' },
      { n: '3', text: 'Départ du repos : $v = at = 3{,}36\\,t$ et $x = \\tfrac{1}{2}at^2 = 1{,}68\\,t^2$.' },
    ],
    result: '$a = g\\sin\\beta = 3{,}4\\;\\text{m·s}^{-2}$ ; $v = 3{,}36\\,t$ ; $x = 1{,}68\\,t^2$.',
  },
  'newton-12': {
    steps: [
      { n: '1', text: '$\\vec{a} = \\vec{g}$ → $a_x = 0$, $a_y = -g$. Avec $v_0\\cos 40° = 11{,}5$ et $v_0\\sin 40° = 9{,}64$ : $x = 11{,}5\\,t$ et $y = -4{,}905\\,t^2 + 9{,}64\\,t$.' },
      { n: '2', text: 'En éliminant $t$ :', tex: 'y = -\\frac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2 + \\tan\\alpha\\,x = -0{,}0372\\,x^2 + 0{,}839\\,x' },
      { n: '3', tex: 'H = \\frac{v_0^2\\sin^2\\!\\alpha}{2g} = 4{,}74\\;\\text{m} \\qquad D = \\frac{v_0^2\\sin 2\\alpha}{g} = 22{,}6\\;\\text{m}', text: '' },
      { n: '4', text: 'À $x = 18\\;\\text{m}$ : $y = -0{,}0372 \\times 324 + 0{,}839 \\times 18 = 3{,}07\\;\\text{m} > 3\\;\\text{m}$ → le ballon **passe** (de ~7 cm).' },
    ],
    result: '$H = 4{,}7\\;\\text{m}$ ; $D = 22{,}6\\;\\text{m}$ ; **passe le mur** ($y(18) = 3{,}07\\;\\text{m}$).',
  },
  'newton-13': {
    steps: [
      { n: '1', text: 'Origine au lancement, axe $y$ vers le haut, $\\vec{a} = (0\\,;\\,-g)$ : $x = v_0 t = 8t$ et $y = -4{,}905\\,t^2$ (car $v_{0y} = 0$).' },
      { n: '2', tex: 't = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{40}{9{,}81}} = 2{,}02\\;\\text{s}', text: 'Sol ($y = -h$) :' },
      { n: '3', text: '$x = 8 \\times 2{,}02 = 16{,}2\\;\\text{m}$.' },
      { n: '4', text: '$v_x = 8$, $v_y = -gt = -19{,}8$ → $v = \\sqrt{8^2 + 19{,}8^2} = 21{,}4\\;\\text{m·s}^{-1}$.' },
    ],
    result: '$t = 2{,}0\\;\\text{s}$ ; **portée** $16{,}2\\;\\text{m}$ ; $v_{\\text{impact}} = 21{,}4\\;\\text{m·s}^{-1}$.',
  },
  'newton-14': {
    steps: [
      { n: '1', tex: 'a = \\frac{eE}{m} = \\frac{1{,}6 \\times 10^{-19} \\times 1{,}0 \\times 10^4}{9{,}1 \\times 10^{-31}} = 1{,}76 \\times 10^{15}\\;\\text{m·s}^{-2}', text: '' },
      { n: '2', text: '$t_1 = \\dfrac{L}{v_0} = \\dfrac{0{,}04}{2{,}0 \\times 10^7} = 2{,}0 \\times 10^{-9}\\;\\text{s}$ ; $v_y = at_1 = 3{,}5 \\times 10^6\\;\\text{m·s}^{-1}$.' },
      { n: '3', text: '$v = \\sqrt{v_0^2 + v_y^2} = 2{,}03 \\times 10^7\\;\\text{m·s}^{-1}$ ; $\\tan\\theta = \\dfrac{v_y}{v_0} = 0{,}176 \\Rightarrow \\theta \\approx 10°$.' },
    ],
    result: '$a = 1{,}8 \\times 10^{15}\\;\\text{m·s}^{-2}$ ; $v_y = 3{,}5 \\times 10^6$ ; $v = 2{,}0 \\times 10^7\\;\\text{m·s}^{-1}$ ; $\\theta \\approx 10°$.',
  },
  'newton-15': {
    steps: [
      { n: '1', tex: 'E = \\frac{U}{d} = \\frac{200}{0{,}02} = 1{,}0 \\times 10^4\\;\\text{V·m}^{-1} \\qquad a = \\frac{eE}{m} = 1{,}76 \\times 10^{15}\\;\\text{m·s}^{-2}', text: '' },
      { n: '2', text: '$x = v_0 t$ et $y = \\tfrac{1}{2}at^2$ → en éliminant $t$ :', tex: 'y = \\frac{a}{2v_0^2}\\,x^2 = 2{,}20\\,x^2 \\quad (\\text{parabole},\\;x\\text{ en m})' },
      { n: '3', text: 'Sortie $x = L = 0{,}05\\;\\text{m}$ : $y = 2{,}20 \\times (0{,}05)^2 = 5{,}5 \\times 10^{-3}\\;\\text{m} = 5{,}5\\;\\text{mm}$.' },
      { n: '4', text: 'La déviation possible avant de toucher une plaque est $\\dfrac{d}{2} = 1{,}0\\;\\text{cm} = 10\\;\\text{mm}$. Comme $5{,}5\\;\\text{mm} < 10\\;\\text{mm}$, l\'électron **sort sans toucher** les plaques.' },
    ],
    result: 'Déviation $y = 5{,}5\\;\\text{mm} < \\dfrac{d}{2} = 10\\;\\text{mm}$ → **ne touche pas**.',
  },
  'newton-16': {
    steps: [
      { n: '1', text: 'Origine au lancement, $v_0\\cos 52° = 4{,}49$, $v_0\\sin 52° = 5{,}75$ : $x = 4{,}49\\,t$ et $y = -4{,}905\\,t^2 + 5{,}75\\,t$.' },
      { n: '2', tex: 'y = -\\frac{g}{2v_0^2\\cos^2\\!\\alpha}\\,x^2 + \\tan\\alpha\\,x = -0{,}243\\,x^2 + 1{,}280\\,x', text: 'Trajectoire :' },
      { n: '3', text: 'Le panier est $3{,}05 - 2{,}00 = 1{,}05\\;\\text{m}$ au-dessus du lancer, à $x = 4{,}20\\;\\text{m}$. $y(4{,}20) = -0{,}243 \\times 17{,}64 + 1{,}280 \\times 4{,}20 = 1{,}09\\;\\text{m}$. Écart à la cible : 4 cm ≤ 8 cm → **panier réussi**.' },
      { n: '4', text: 'À $x = 4{,}20\\;\\text{m}$ ($t = 0{,}94\\;\\text{s}$) : $v_y = 5{,}75 - 9{,}81 \\times 0{,}94 = -3{,}4\\;\\text{m·s}^{-1} < 0$ → le ballon **descend** en atteignant le panier.' },
    ],
    result: '$y(4{,}20) = 1{,}09\\;\\text{m}$ (cible 1,05 m, écart 4 cm) → **panier** ; ballon **descendant** ($v_y < 0$).',
  },
  'newton-17': {
    steps: [
      { n: '1', text: '$v_0\\cos 22° = 8{,}81$, $v_0\\sin 22° = 3{,}56$ : $x = 8{,}81\\,t$, $y = -4{,}905\\,t^2 + 3{,}56\\,t$, d\'où $y = -0{,}0632\\,x^2 + 0{,}404\\,x$.' },
      { n: '2', tex: 'H = \\frac{v_0^2\\sin^2\\!\\alpha}{2g} = 0{,}65\\;\\text{m}', text: '' },
      { n: '3', tex: 'D = \\frac{v_0^2\\sin 2\\alpha}{g} = 6{,}39\\;\\text{m}', text: '' },
      { n: '4', text: 'À $45°$ : $D = \\dfrac{v_0^2}{g} = 9{,}20\\;\\text{m} > 7\\;\\text{m}$ → oui d\'après le modèle. Mais c\'est **irréaliste** : un sauteur ne peut pas décoller à 45° en conservant $v_0$ (contrainte biomécanique ; les sauteurs décollent vers 20°).' },
    ],
    result: '$H = 0{,}65\\;\\text{m}$ ; $D = 6{,}4\\;\\text{m}$ ; à 45° $D = 9{,}2\\;\\text{m}$ (modèle non réaliste).',
  },
  'newton-18': {
    steps: [
      { n: 'A.1', tex: 'E = \\frac{U}{d} = \\frac{150}{0{,}015} = 1{,}0 \\times 10^4\\;\\text{V·m}^{-1} \\qquad a = \\frac{eE}{m} = 1{,}76 \\times 10^{15}\\;\\text{m·s}^{-2}', text: '' },
      { n: 'A.2', text: '$t_1 = \\dfrac{L}{v_0} = 1{,}33 \\times 10^{-9}\\;\\text{s}$ ; $y_1 = \\tfrac{1}{2}at_1^2 = 1{,}56 \\times 10^{-3}\\;\\text{m} = 1{,}56\\;\\text{mm}$.' },
      { n: 'A.3', text: '$v_y = at_1 = 2{,}34 \\times 10^6\\;\\text{m·s}^{-1}$.' },
      { n: 'B.4', text: 'Après les plaques, mouvement rectiligne uniforme : $t_2 = \\dfrac{D}{v_0} = 6{,}0 \\times 10^{-9}\\;\\text{s}$ ; $y_2 = v_y t_2 = 14{,}1\\;\\text{mm}$.' },
      { n: 'B.5', tex: 'Y = y_1 + y_2 = 15{,}6\\;\\text{mm} \\qquad \\text{On retrouve }Y = \\frac{eEL}{mv_0^2}\\!\\left(D + \\frac{L}{2}\\right) = 15{,}6\\;\\text{mm}', text: '' },
    ],
    result: '$y_1 = 1{,}6\\;\\text{mm}$ ; **déviation totale** $Y \\approx 15{,}6\\;\\text{mm}$.',
  },
  'newton-19': {
    steps: [
      { n: '1', tex: 'E = \\frac{U}{d} = \\frac{250}{0{,}04} = 6250\\;\\text{V·m}^{-1} \\qquad a = \\frac{eE}{m} = 1{,}10 \\times 10^{15}\\;\\text{m·s}^{-2}', text: '' },
      { n: '2', text: 'Départ du repos : $v(t) = at$ et $x(t) = \\tfrac{1}{2}at^2$.' },
      { n: '3', tex: 't = \\sqrt{\\frac{2d}{a}} = 8{,}5 \\times 10^{-9}\\;\\text{s} \\qquad v_s = at = 9{,}4 \\times 10^6\\;\\text{m·s}^{-1}', text: 'Sortie $x = d = 0{,}04\\;\\text{m}$ :' },
      { n: '4', tex: '\\tfrac{1}{2}mv_s^2 = eU \\implies v_s = \\sqrt{\\frac{2eU}{m}} = 9{,}38 \\times 10^6\\;\\text{m·s}^{-1}', text: 'Bilan d\'énergie — **identique** (les deux méthodes concordent) :' },
    ],
    result: '$v_s = 9{,}4 \\times 10^6\\;\\text{m·s}^{-1}$ (confirmé par $\\tfrac{1}{2}mv_s^2 = eU$).',
  },
  'newton-20': {
    steps: [
      { n: '1', text: '$D(\\alpha) = \\dfrac{v_0^2\\sin 2\\alpha}{g} = 40{,}8\\sin 2\\alpha$. Maximale quand $\\sin 2\\alpha = 1$, soit $\\alpha = 45°$ :', tex: 'D_{\\max} = \\frac{v_0^2}{g} = 40{,}8\\;\\text{m}' },
      { n: '2', text: 'Cible à $d = 30\\;\\text{m}$ : $\\sin 2\\alpha = \\dfrac{gd}{v_0^2} = 0{,}736$ → $2\\alpha = 47{,}4°$ ou $132{,}6°$, d\'où $\\alpha = 23{,}7°$ (tir tendu) ou $\\alpha = 66{,}3°$ (tir en cloche). Les deux angles sont complémentaires ($23{,}7 + 66{,}3 = 90$).' },
      { n: '3', text: 'Cible à $45\\;\\text{m} > D_{\\max}$ : $\\sin 2\\alpha > 1$ impossible → **hors de portée**.' },
    ],
    result: '$D_{\\max} = 40{,}8\\;\\text{m}$ à 45° ; pour 30 m : $\\alpha = 23{,}7°$ ou $66{,}3°$ ; 45 m **hors de portée**.',
  },
  'newton-21': {
    steps: [
      { n: '1', text: 'Depuis le sol, $D = \\dfrac{v_0^2\\sin 2\\alpha}{g}$ est maximale quand $\\sin 2\\alpha = 1$, soit $\\alpha = 45°$.' },
      { n: '2', text: 'Avec $y(t) = (v_0\\sin\\alpha)t - \\tfrac{1}{2}gt^2$, l\'impact au sol ($y = -h$) donne :', tex: 't = \\frac{v_0\\sin\\alpha + \\sqrt{v_0^2\\sin^2\\!\\alpha + 2gh}}{g} \\qquad D = (v_0\\cos\\alpha)\\,t' },
      { n: '3', text: '$\\alpha = 45°$ : $t = 2{,}07\\;\\text{s}$, $D = 19{,}04\\;\\text{m}$. $\\alpha = 42°$ : $t = 1{,}98\\;\\text{s}$, $D = 19{,}12\\;\\text{m}$. Comme $19{,}12 > 19{,}04$, l\'angle optimal est **inférieur à 45°** dès que $h > 0$ : partir de plus haut donne un temps de vol supplémentaire, qu\'on exploite mieux avec un tir un peu plus tendu.' },
    ],
    result: 'Depuis le sol : 45°. Avec $h = 2\\;\\text{m}$ : $D(42°) > D(45°)$ → angle optimal **< 45°**.',
  },
};

// ── Exercices ─────────────────────────────────────────────────────────────────
export interface ExercisePart {
  label?: string;
  questions: { n: string; text: string }[];
}

export interface ExerciseContent {
  id: string;
  context: string;
  data?: string;   // LaTeX string for display math
  parts: ExercisePart[];
}

export const NEWTON_EXERCISES: ExerciseContent[] = [
  {
    id: 'newton-1',
    context: 'Un point M a pour vecteur position, en mètres :',
    data: '\\overrightarrow{OM}(t) = 2t\\,\\vec{i} + (3t^2 - t)\\,\\vec{j}',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les composantes $v_x(t)$ et $v_y(t)$ du vecteur vitesse $\\vec{v}(t)$.' },
        { n: '2', text: 'En déduire le vecteur accélération $\\vec{a}(t)$. Le mouvement est-il uniformément accéléré ? Justifier.' },
      ],
    }],
  },
  {
    id: 'newton-2',
    context: 'Le vecteur vitesse d\'un mobile est exprimé en m·s⁻¹ par :',
    data: '\\vec{v}(t) = 2\\,\\vec{i} + (6 - 10t)\\,\\vec{j}',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer le vecteur accélération $\\vec{a}$. Quelle est la nature du mouvement ?' },
        { n: '2', text: 'Sachant qu\'à $t=0$ le mobile est à l\'origine, en intégrant exprimer $x(t)$ et $y(t)$.' },
      ],
    }],
  },
  {
    id: 'newton-3',
    context: 'Un solide de masse $m$ est posé, immobile, sur un plan incliné d\'un angle $\\beta$. Le contact est supposé sans frottement.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire l\'inventaire des forces extérieures s\'exerçant sur le solide.' },
        { n: '2', text: 'Représenter ces forces sur un schéma clair, en précisant leur direction et leur point d\'application.' },
      ],
    }],
  },
  {
    id: 'newton-4',
    context: 'Une bille de masse $m = 50\\,\\text{g}$ tombe dans l\'air. Les frottements sont modélisés par une force $f = 0{,}15\\,\\text{N}$ verticale dirigée vers le haut.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire le bilan des forces et écrire la 2ᵉ loi de Newton sous forme vectorielle.' },
        { n: '2', text: 'Projeter sur un axe vertical orienté vers le bas, exprimer $a$ puis calculer sa valeur numérique.' },
      ],
    }],
  },
  {
    id: 'newton-5',
    context: 'Le centre d\'inertie d\'un mobile a une accélération constante. À $t=0$ : $\\vec{v}_0 = 5\\,\\vec{i}\\;\\text{m\\,s}^{-1}$ et $\\overrightarrow{OM}_0 = 20\\,\\vec{j}\\;\\text{m}$.',
    data: '\\vec{a} = -10\\,\\vec{j}\\;\\text{m\\,s}^{-2}',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les composantes $v_x(t)$ et $v_y(t)$.' },
        { n: '2', text: 'En déduire les équations horaires $x(t)$ et $y(t)$.' },
      ],
    }],
  },
  {
    id: 'newton-6',
    context: 'Un palet de hockey glisse en ligne droite à vitesse constante sur une patinoire (frottements négligeables). Un livre est posé, immobile, sur une table horizontale.',
    parts: [{
      questions: [
        { n: '1', text: 'Que vaut $\\sum\\vec{F}_{\\text{ext}}$ sur le palet ? Quel principe permet de le dire ?' },
        { n: '2', text: 'Pour le livre immobile, faire le bilan des forces et écrire la relation vectorielle qui les lie. Quelle loi justifie cette relation ?' },
      ],
    }],
  },
  {
    id: 'newton-7',
    context: 'Un livre de masse $m$ est posé sur une table.',
    parts: [{
      questions: [
        { n: '1', text: 'Énoncer la troisième loi de Newton (principe des actions réciproques).' },
        { n: '2', text: 'Le poids $\\vec{P}$ du livre et la réaction $\\vec{N}$ de la table sur le livre forment-ils une paire action–réaction ? Justifier soigneusement.' },
        { n: '3', text: 'Donner la force qui forme une paire action–réaction avec $\\vec{P}$, puis la force partenaire de la force exercée par le livre sur la table.' },
      ],
    }],
  },
  {
    id: 'newton-8',
    context: 'Deux plaques parallèles sont distantes de $d = 2{,}0\\,\\text{cm}$ et soumises à une tension $U = 1{,}0\\,\\text{kV}$.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C}',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer la valeur du champ électrique $E$ entre les plaques (supposé uniforme).' },
        { n: '2', text: 'En déduire la norme de la force électrique $F = eE$ exercée sur un électron placé dans ce champ.' },
      ],
    }],
  },
  {
    id: 'newton-9',
    context: 'Un électron est placé dans un champ électrique uniforme de norme $E = 1{,}0\\times10^3\\,\\text{V\\,m}^{-1}$.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C} \\qquad m_e = 9{,}1\\times10^{-31}\\,\\text{kg}',
    parts: [{
      questions: [
        { n: '1', text: 'Exprimer puis calculer la norme de l\'accélération de l\'électron ($\\vec{P}$ négligé).' },
        { n: '2', text: 'Indiquer le sens de $\\vec{a}$ par rapport à $\\vec{E}$. Justifier à partir du signe de la charge.' },
      ],
    }],
  },
  {
    id: 'newton-10',
    context: 'On lâche, sans vitesse initiale, une bille depuis une hauteur $h = 20\\,\\text{m}$. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Appliquer la méthode en 5 étapes et établir $y(t)$ (origine au point de lâcher, axe $y$ orienté vers le bas).' },
        { n: '2', text: 'Calculer la durée $t_1$ de la chute.' },
        { n: '3', text: 'En déduire la vitesse $v_1$ de la bille à l\'impact.' },
      ],
    }],
  },
  {
    id: 'newton-11',
    context: 'Un solide de masse $m = 200\\,\\text{g}$ glisse sans frottement sur un plan incliné d\'angle $\\beta = 20°$. Il part du repos.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire le bilan des forces et appliquer la 2ᵉ loi de Newton sous forme vectorielle.' },
        { n: '2', text: 'Projeter sur un axe parallèle à la pente (vers le bas) et montrer que $a = g\\sin\\beta$. Calculer $a$.' },
        { n: '3', text: 'Établir $v(t)$ et la distance parcourue $x(t)$ le long de la pente.' },
      ],
    }],
  },
  {
    id: 'newton-12',
    context: 'Un footballeur frappe un ballon depuis le sol avec une vitesse $v_0 = 15\\,\\text{m\\,s}^{-1}$ formant un angle $\\alpha = 40°$ avec l\'horizontale. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires $x(t)$ et $y(t)$ (méthode 5 étapes).' },
        { n: '2', text: 'En éliminant $t$, établir l\'équation de la trajectoire $y(x)$.' },
        { n: '3', text: 'Calculer la flèche $H$ et la portée $D$.' },
        { n: '4', text: 'Un mur de $3{,}0\\,\\text{m}$ de haut se trouve à $18\\,\\text{m}$. Le ballon passe-t-il par-dessus ?' },
      ],
    }],
  },
  {
    id: 'newton-13',
    context: 'Une balle est lancée horizontalement avec $v_0 = 8{,}0\\,\\text{m\\,s}^{-1}$ depuis le sommet d\'une falaise de hauteur $h = 20\\,\\text{m}$.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires (origine au point de lancement, axe $y$ vers le haut).' },
        { n: '2', text: 'Calculer la durée $t_1$ de la chute.' },
        { n: '3', text: 'En déduire la distance horizontale $d$ au point d\'impact.' },
        { n: '4', text: 'Calculer la norme de la vitesse $\\vec{v}$ à l\'impact.' },
      ],
    }],
  },
  {
    id: 'newton-14',
    context: 'Un électron entre horizontalement avec $v_0 = 2{,}0\\times10^7\\,\\text{m\\,s}^{-1}$ entre deux plaques de longueur $L = 4{,}0\\,\\text{cm}$ où règne un champ $E = 1{,}0\\times10^4\\,\\text{V\\,m}^{-1}$. Poids négligé.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C} \\qquad m_e = 9{,}1\\times10^{-31}\\,\\text{kg}',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer l\'accélération $a$ de l\'électron.' },
        { n: '2', text: 'Déterminer la durée de traversée $t_1$, puis la composante $v_y$ à la sortie.' },
        { n: '3', text: 'En déduire la norme de $\\vec{v}$ à la sortie et l\'angle de déviation $\\theta$.' },
      ],
    }],
  },
  {
    id: 'newton-15',
    context: 'Un électron pénètre avec $v_0 = 2{,}0\\times10^7\\,\\text{m\\,s}^{-1}$ entre deux plaques horizontales : longueur $L = 5{,}0\\,\\text{cm}$, distance $d = 2{,}0\\,\\text{cm}$, tension $U = 200\\,\\text{V}$. Poids négligé.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C} \\qquad m_e = 9{,}1\\times10^{-31}\\,\\text{kg}',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $E = U/d$, puis l\'accélération $a$ de l\'électron.' },
        { n: '2', text: 'Établir l\'équation de la trajectoire $y(x)$ dans les plaques.' },
        { n: '3', text: 'Calculer la déviation verticale $y_1$ à la sortie des plaques.' },
        { n: '4', text: 'L\'électron heurte-t-il une plaque ? Comparer $y_1$ à $d/2$ et conclure.' },
      ],
    }],
  },
  {
    id: 'newton-16',
    context: 'Un basketteur effectue un lancer franc. Le ballon quitte ses mains à $y_0 = 2{,}00\\,\\text{m}$ de hauteur avec $v_0 = 7{,}3\\,\\text{m\\,s}^{-1}$ à $\\alpha = 52°$. Le centre du panier est à $D = 4{,}20\\,\\text{m}$ et à $3{,}05\\,\\text{m}$ de hauteur.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires (origine au point de lancement).' },
        { n: '2', text: 'En déduire l\'équation de la trajectoire $y(x)$ (avec $y$ mesuré depuis le lancement).' },
        { n: '3', text: 'Calculer la hauteur du ballon à $x = D$. Le ballon passe-t-il par le panier (tolérance $\\pm 8\\,\\text{cm}$) ?' },
        { n: '4', text: 'Montrer que le ballon est en train de descendre lorsqu\'il atteint le panier.' },
      ],
    }],
  },
  {
    id: 'newton-17',
    context: 'Lors d\'un saut en longueur, un athlète quitte le sol avec $v_0 = 9{,}5\\,\\text{m\\,s}^{-1}$ à $\\alpha = 22°$. On assimile son centre d\'inertie à un point, frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires, puis l\'équation de la trajectoire $y(x)$.' },
        { n: '2', text: 'Calculer la flèche $H$ (hauteur maximale du centre d\'inertie).' },
        { n: '3', text: 'Calculer la portée $D$ (retour à la même hauteur).' },
        { n: '4', text: 'À $v_0$ fixé, un angle de $45°$ permettrait-il de dépasser $7\\,\\text{m}$ ? Calculer $D$ à $45°$ et commenter le modèle.' },
      ],
    }],
  },
  {
    id: 'newton-18',
    context: 'Dans un tube cathodique, un électron entre avec $v_0 = 3{,}0\\times10^7\\,\\text{m\\,s}^{-1}$ entre des plaques de déviation ($L = 4{,}0\\,\\text{cm}$, $d = 1{,}5\\,\\text{cm}$, $U = 150\\,\\text{V}$). Il poursuit jusqu\'à un écran à $D = 18\\,\\text{cm}$ des plaques. Poids négligé.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C} \\qquad m_e = 9{,}1\\times10^{-31}\\,\\text{kg}',
    parts: [
      {
        label: 'Partie A — Entre les plaques',
        questions: [
          { n: '1', text: 'Calculer $E = U/d$ puis l\'accélération $a$.' },
          { n: '2', text: 'Déterminer la durée $t_1$ passée entre les plaques et la déviation verticale $y_1$ à la sortie.' },
          { n: '3', text: 'Calculer la composante verticale $v_y$ de la vitesse à la sortie.' },
        ],
      },
      {
        label: 'Partie B — Jusqu\'à l\'écran',
        questions: [
          { n: '4', text: 'Le mouvement est ensuite rectiligne uniforme. Exprimer et calculer la déviation supplémentaire $y_2$ sur la distance $D$.' },
          { n: '5', text: 'En déduire la déviation totale $Y = y_1 + y_2$ sur l\'écran. (Bonus : retrouver $Y = eEL(D + L/2)/(m_e v_0^2)$.)' },
        ],
      },
    ],
  },
  {
    id: 'newton-19',
    context: 'Dans un canon à électrons, un électron part du repos et est accéléré entre deux plaques ($d = 4{,}0\\,\\text{cm}$, $U = 250\\,\\text{V}$). Poids négligé.',
    data: 'e = 1{,}6\\times10^{-19}\\,\\text{C} \\qquad m_e = 9{,}1\\times10^{-31}\\,\\text{kg}',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer $E = U/d$ puis l\'accélération $a$.' },
        { n: '2', text: 'Établir $v(t)$ et $x(t)$ (départ du repos en $x=0$).' },
        { n: '3', text: 'Calculer la durée $t_s$ du trajet entre les plaques, puis la vitesse de sortie $v_s$.' },
        { n: '4', text: 'Retrouver $v_s$ par un bilan d\'énergie ($\\frac{1}{2}m_e v_s^2 = eU$) et comparer les deux résultats.' },
      ],
    }],
  },
  {
    id: 'newton-20',
    context: 'On tire un projectile depuis le sol avec $v_0 = 20\\,\\text{m\\,s}^{-1}$, à un angle $\\alpha$ réglable. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir $D(\\alpha) = v_0^2\\sin 2\\alpha / g$. Pour quel angle $D$ est-elle maximale ? Calculer $D_{\\max}$.' },
        { n: '2', text: 'La cible est au sol à $d = 30\\,\\text{m}$. Montrer qu\'il existe deux angles de tir et les calculer. Interpréter (tir tendu / tir en cloche).' },
        { n: '3', text: 'Que se passe-t-il si la cible est à $45\\,\\text{m}$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'newton-21',
    context: 'Un lanceur de poids lâche le poids à $h = 2{,}0\\,\\text{m}$ de hauteur avec $v_0 = 13\\,\\text{m\\,s}^{-1}$. La portée $D$ est mesurée jusqu\'à l\'impact au sol.',
    parts: [{
      questions: [
        { n: '1', text: 'Pour $h = 0$, montrer que $D = v_0^2\\sin 2\\alpha / g$ est maximale pour $\\alpha = 45°$.' },
        { n: '2', text: 'Pour $h = 2{,}0\\,\\text{m}$, établir l\'équation en $t$ de la condition d\'impact ($y = -h$), puis en déduire $D(\\alpha) = v_0\\cos\\alpha\\cdot t$.' },
        { n: '3', text: 'Calculer $D$ pour $\\alpha = 45°$ puis $\\alpha = 42°$. Lequel est le plus grand ? Conclure sur l\'angle optimal quand $h > 0$.' },
      ],
    }],
  },
];
