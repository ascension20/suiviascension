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
    text: 'Le vecteur vitesse est…',
    options: [
      { label: 'a', text: 'tangent à la trajectoire' },
      { label: 'b', text: 'parallèle à l\'accélération' },
      { label: 'c', text: 'toujours vertical' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'L\'unité SI de l\'accélération est…',
    options: [
      { label: 'a', text: 'm·s⁻¹' },
      { label: 'b', text: 'm·s⁻²' },
      { label: 'c', text: 'N' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La deuxième loi de Newton s\'écrit…',
    options: [
      { label: 'a', text: 'ΣF = mv' },
      { label: 'b', text: 'ΣF = ma' },
      { label: 'c', text: 'ΣF = 0' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'Le principe d\'inertie n\'est valable que dans…',
    options: [
      { label: 'a', text: 'tout référentiel' },
      { label: 'b', text: 'un référentiel galiléen' },
      { label: 'c', text: 'le référentiel de l\'objet' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Dans le champ de pesanteur (sans frottement), l\'accélération…',
    options: [
      { label: 'a', text: 'augmente avec la masse' },
      { label: 'b', text: 'est nulle' },
      { label: 'c', text: 'ne dépend pas de la masse' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: 'La trajectoire d\'un projectile sans frottement est…',
    options: [
      { label: 'a', text: 'une droite' },
      { label: 'b', text: 'une parabole' },
      { label: 'c', text: 'un cercle' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Au sommet de la trajectoire, la composante verticale de la vitesse vaut…',
    options: [
      { label: 'a', text: 'v₀' },
      { label: 'b', text: '0' },
      { label: 'c', text: 'maximale' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Entre les plaques d\'un condensateur (tension U, distance d), le champ vaut…',
    options: [
      { label: 'a', text: 'E = U/d' },
      { label: 'b', text: 'E = Ud' },
      { label: 'c', text: 'E = d/U' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Dans un référentiel galiléen, si ΣF = 0, le centre d\'inertie est…',
    options: [
      { label: 'a', text: 'forcément immobile' },
      { label: 'b', text: 'au repos ou en mouvement rectiligne uniforme' },
      { label: 'c', text: 'en mouvement circulaire' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Les deux forces d\'une paire « action–réaction » s\'exercent…',
    options: [
      { label: 'a', text: 'sur le même corps' },
      { label: 'b', text: 'sur deux corps différents' },
      { label: 'c', text: 'toujours vers le bas' },
    ],
    answer: 'b',
  },
  {
    n: 11,
    text: 'La force exercée par un champ E sur un électron est…',
    options: [
      { label: 'a', text: 'dans le sens de E' },
      { label: 'b', text: 'opposée à E' },
      { label: 'c', text: 'perpendiculaire à E' },
    ],
    answer: 'b',
  },
  {
    n: 12,
    text: 'La portée d\'un tir depuis le sol est maximale pour un angle…',
    options: [
      { label: 'a', text: '30°' },
      { label: 'b', text: '45°' },
      { label: 'c', text: '60°' },
    ],
    answer: 'b',
  },
];

// ── Exercices ─────────────────────────────────────────────────────────────────
export interface ExercisePart {
  label?: string;   // e.g. "Partie A — Entre les plaques"
  questions: { n: string; text: string }[];
}

export interface ExerciseContent {
  id: string;
  context: string;
  data?: string;       // données numériques
  parts: ExercisePart[];
}

export const NEWTON_EXERCISES: ExerciseContent[] = [
  // ── Ex 1 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-1',
    context: 'Un point M a pour vecteur position, en mètres :\nOM(t) = 2t·i + (3t² − t)·j',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les composantes du vecteur vitesse v(t).' },
        { n: '2', text: 'En déduire le vecteur accélération a(t). Le mouvement est-il uniformément accéléré ?' },
      ],
    }],
  },
  // ── Ex 2 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-2',
    context: 'Le vecteur vitesse d\'un mobile est v(t) = 2·i + (6 − 10t)·j (en m·s⁻¹).\nÀ t = 0, le mobile est à l\'origine OM₀ = (0 ; 0).',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer le vecteur accélération a. Que peut-on dire du mouvement ?' },
        { n: '2', text: 'En intégrant, établir les équations horaires x(t) et y(t).' },
      ],
    }],
  },
  // ── Ex 3 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-3',
    context: 'Un solide de masse m est posé, immobile, sur un plan incliné d\'un angle β. On suppose le contact sans frottement.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire l\'inventaire des forces extérieures s\'exerçant sur le solide.' },
        { n: '2', text: 'Les représenter sur un schéma clair, en précisant leur direction.' },
      ],
    }],
  },
  // ── Ex 4 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-4',
    context: 'Une bille de masse m = 50 g tombe dans l\'air. On modélise les frottements par une force f verticale, dirigée vers le haut, de norme f = 0,15 N.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire le bilan des forces et écrire la deuxième loi de Newton.' },
        { n: '2', text: 'Projeter sur un axe vertical orienté vers le bas, exprimer l\'accélération a puis calculer sa valeur numérique.' },
      ],
    }],
  },
  // ── Ex 5 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-5',
    context: 'Le centre d\'inertie d\'un mobile a une accélération constante a = (0 ; −10) en m·s⁻².\nÀ t = 0 : v₀ = (5 ; 0) m·s⁻¹ et OM₀ = (0 ; 20) m.',
    parts: [{
      questions: [
        { n: '1', text: 'Déterminer les composantes de v(t).' },
        { n: '2', text: 'En déduire les équations horaires x(t) et y(t).' },
      ],
    }],
  },
  // ── Ex 6 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-6',
    context: 'Un palet de hockey glisse en ligne droite à vitesse constante sur une patinoire (frottements négligeables).',
    parts: [{
      questions: [
        { n: '1', text: 'Que vaut la somme des forces s\'exerçant sur le palet ? Énoncer le principe utilisé.' },
        { n: '2', text: 'Un livre est posé, immobile, sur une table horizontale. Faire le bilan des forces et écrire la relation qui les lie.' },
      ],
    }],
  },
  // ── Ex 7 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-7',
    context: 'Un livre de masse m est posé sur une table.',
    parts: [{
      questions: [
        { n: '1', text: 'Énoncer la troisième loi de Newton.' },
        { n: '2', text: 'Le poids du livre et la réaction de la table forment-ils une paire « action–réaction » ? Justifier soigneusement.' },
        { n: '3', text: 'Donner le partenaire « réaction » du poids du livre, puis celui de la force exercée par le livre sur la table.' },
      ],
    }],
  },
  // ── Ex 8 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-8',
    context: 'Deux plaques parallèles distantes de d = 2,0 cm sont soumises à une tension U = 1,0 kV.',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer la valeur du champ électrique E entre les plaques (supposé uniforme).' },
        { n: '2', text: 'En déduire la norme de la force électrique exercée sur un électron placé dans ce champ.' },
      ],
    }],
  },
  // ── Ex 9 ─────────────────────────────────────────────────────────────────
  {
    id: 'newton-9',
    context: 'Un électron est placé dans un champ électrique uniforme de norme E = 1,0 × 10³ V·m⁻¹.',
    data: 'e = 1,6 × 10⁻¹⁹ C · mₑ = 9,1 × 10⁻³¹ kg',
    parts: [{
      questions: [
        { n: '1', text: 'Exprimer puis calculer la norme de son accélération.' },
        { n: '2', text: 'Indiquer le sens de a par rapport à E. Justifier.' },
      ],
    }],
  },
  // ── Ex 10 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-10',
    context: 'On lâche, sans vitesse initiale, une bille depuis une hauteur h = 20 m. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Par la méthode en 5 étapes, établir l\'équation horaire y(t) (origine au point de lâcher, axe orienté vers le bas).' },
        { n: '2', text: 'Calculer la durée de la chute.' },
        { n: '3', text: 'En déduire la vitesse de la bille à l\'impact au sol.' },
      ],
    }],
  },
  // ── Ex 11 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-11',
    context: 'Un solide de masse m = 200 g glisse, sans frottement, sur un plan incliné d\'un angle β = 20°. Il part du repos.',
    parts: [{
      questions: [
        { n: '1', text: 'Faire le bilan des forces et appliquer la deuxième loi de Newton.' },
        { n: '2', text: 'Projeter sur un axe parallèle à la pente et montrer que a = g sin β. Calculer a.' },
        { n: '3', text: 'Établir v(t) et la distance parcourue x(t) le long de la pente.' },
      ],
    }],
  },
  // ── Ex 12 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-12',
    context: 'Un footballeur frappe un ballon depuis le sol avec une vitesse v₀ = 15 m·s⁻¹ formant un angle α = 40° avec l\'horizontale. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Par la méthode en 5 étapes, établir les équations horaires x(t) et y(t).' },
        { n: '2', text: 'En déduire l\'équation de la trajectoire y(x).' },
        { n: '3', text: 'Calculer la flèche H et la portée D.' },
        { n: '4', text: 'Un mur de 3,0 m de haut se trouve à 18 m. Le ballon passe-t-il au-dessus ?' },
      ],
    }],
  },
  // ── Ex 13 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-13',
    context: 'Une balle est lancée horizontalement avec v₀ = 8,0 m·s⁻¹ depuis le haut d\'une falaise de hauteur h = 20 m.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires (origine au point de lancement, axe y vers le haut).' },
        { n: '2', text: 'Calculer la durée de la chute.' },
        { n: '3', text: 'En déduire la distance horizontale au point d\'impact.' },
        { n: '4', text: 'Calculer la vitesse de la balle à l\'impact.' },
      ],
    }],
  },
  // ── Ex 14 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-14',
    context: 'Un électron entre horizontalement avec v₀ = 2,0 × 10⁷ m·s⁻¹ entre deux plaques de longueur L = 4,0 cm où règne un champ uniforme E = 1,0 × 10⁴ V·m⁻¹. Poids négligé.',
    data: 'e = 1,6 × 10⁻¹⁹ C · mₑ = 9,1 × 10⁻³¹ kg',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer l\'accélération de l\'électron.' },
        { n: '2', text: 'Déterminer la durée de traversée t₁, puis la composante vy acquise à la sortie.' },
        { n: '3', text: 'En déduire la norme de la vitesse à la sortie, et l\'angle dont la trajectoire a tourné.' },
      ],
    }],
  },
  // ── Ex 15 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-15',
    context: 'Un électron pénètre avec une vitesse horizontale v₀ = 2,0 × 10⁷ m·s⁻¹ entre deux plaques horizontales de longueur L = 5,0 cm, distantes de d = 2,0 cm, soumises à une tension U = 200 V. Poids négligé.',
    data: 'e = 1,6 × 10⁻¹⁹ C · mₑ = 9,1 × 10⁻³¹ kg',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer le champ E entre les plaques, puis l\'accélération de l\'électron.' },
        { n: '2', text: 'Établir l\'équation de la trajectoire dans les plaques.' },
        { n: '3', text: 'Calculer la déviation verticale à la sortie des plaques.' },
        { n: '4', text: 'L\'électron heurte-t-il une plaque ? Justifier.' },
      ],
    }],
  },
  // ── Ex 16 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-16',
    context: 'Un basketteur réalise un lancer franc. Le ballon quitte ses mains à une hauteur y₀ = 2,00 m avec une vitesse v₀ = 7,3 m·s⁻¹ formant un angle α = 52° avec l\'horizontale. Le centre du panier est à une distance horizontale D = 4,20 m et à une hauteur de 3,05 m. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires du mouvement (origine au point de lancement).' },
        { n: '2', text: 'En déduire l\'équation de la trajectoire y(x) (avec y compté depuis le point de lancement).' },
        { n: '3', text: 'Calculer la hauteur du ballon à l\'abscisse du panier. Le ballon passe-t-il par le centre du panier (tolérance ±8 cm) ?' },
        { n: '4', text: 'Montrer que le ballon est en train de descendre lorsqu\'il atteint le panier.' },
      ],
    }],
  },
  // ── Ex 17 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-17',
    context: 'Lors d\'un saut en longueur, un athlète quitte le sol avec une vitesse v₀ = 9,5 m·s⁻¹ formant un angle α = 22° avec l\'horizontale. On assimile son centre d\'inertie à un point, frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir les équations horaires, puis l\'équation de la trajectoire y(x).' },
        { n: '2', text: 'Calculer la flèche H (hauteur maximale du centre d\'inertie).' },
        { n: '3', text: 'Calculer la portée D (distance horizontale avant de retomber à la même hauteur).' },
        { n: '4', text: 'À v₀ constant, l\'athlète dépasserait-il 7 m en sautant à 45° ? Calculer et commenter (le modèle est-il réaliste ?).' },
      ],
    }],
  },
  // ── Ex 18 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-18',
    context: 'Dans un tube cathodique, un électron entre avec une vitesse horizontale v₀ = 3,0 × 10⁷ m·s⁻¹ entre deux plaques de déviation de longueur L = 4,0 cm, distantes de d = 1,5 cm, sous une tension U = 150 V. À la sortie, il poursuit en ligne droite jusqu\'à un écran situé à D = 18 cm. Poids négligé.',
    data: 'e = 1,6 × 10⁻¹⁹ C · mₑ = 9,1 × 10⁻³¹ kg',
    parts: [
      {
        label: 'Partie A — Entre les plaques',
        questions: [
          { n: '1', text: 'Calculer le champ E puis l\'accélération a.' },
          { n: '2', text: 'Déterminer la durée t₁ passée entre les plaques et la déviation verticale y₁ à la sortie.' },
          { n: '3', text: 'Calculer la composante verticale vy de la vitesse à la sortie.' },
        ],
      },
      {
        label: 'Partie B — Jusqu\'à l\'écran',
        questions: [
          { n: '4', text: 'Le mouvement est rectiligne uniforme. Exprimer puis calculer la déviation supplémentaire y₂ sur la distance D.' },
          { n: '5', text: 'En déduire la déviation totale Y sur l\'écran. (Bonus : retrouver Y = eEL(D + L/2) / mv₀².)' },
        ],
      },
    ],
  },
  // ── Ex 19 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-19',
    context: 'Dans un canon à électrons, un électron part du repos et est accéléré entre deux plaques distantes de d = 4,0 cm soumises à une tension U = 250 V. Poids négligé.',
    data: 'e = 1,6 × 10⁻¹⁹ C · mₑ = 9,1 × 10⁻³¹ kg',
    parts: [{
      questions: [
        { n: '1', text: 'Calculer le champ E puis l\'accélération a de l\'électron.' },
        { n: '2', text: 'Établir les équations horaires de la vitesse v(t) et de la position x(t) (départ du repos).' },
        { n: '3', text: 'Calculer la durée du trajet entre les plaques, puis la vitesse de sortie vₛ.' },
        { n: '4', text: 'Retrouver vₛ par un bilan d\'énergie (½mvₛ² = eU) et comparer les deux résultats.' },
      ],
    }],
  },
  // ── Ex 20 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-20',
    context: 'On tire un projectile depuis le sol avec une vitesse v₀ = 20 m·s⁻¹. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Établir l\'expression de la portée D(α). Pour quel angle est-elle maximale ? Calculer D_max.' },
        { n: '2', text: 'La cible est au sol à d = 30 m. Montrer qu\'il existe deux angles de tir possibles et les calculer. Interpréter (tir tendu / tir en cloche).' },
        { n: '3', text: 'Que se passe-t-il si la cible est placée à 45 m ?' },
      ],
    }],
  },
  // ── Ex 21 ────────────────────────────────────────────────────────────────
  {
    id: 'newton-21',
    context: 'Un lanceur de poids lâche le poids à une hauteur h = 2,0 m au-dessus du sol, avec une vitesse v₀ = 13 m·s⁻¹. Frottements négligés.',
    parts: [{
      questions: [
        { n: '1', text: 'Pour un tir depuis le sol (h = 0), montrer que la portée D = v₀² sin 2α / g est maximale pour α = 45°.' },
        { n: '2', text: 'Pour h = 2,0 m, la portée se mesure jusqu\'à l\'impact au sol. Établir l\'équation donnant la durée de vol (résoudre y(t) = −h), puis l\'expression de la portée D(α) = (v₀ cos α) · t.' },
        { n: '3', text: 'Calculer D pour α = 45° puis pour α = 42°. Lequel est le plus grand ? Conclure sur l\'angle optimal lorsque h > 0.' },
      ],
    }],
  },
];
