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
