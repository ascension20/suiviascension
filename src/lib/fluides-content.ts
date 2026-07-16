import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const FLUIDES_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'L\'unité de pression du système international est…',
    options: [
      { label: 'a', text: 'le bar' },
      { label: 'b', text: 'le pascal' },
      { label: 'c', text: 'le newton' },
      { label: 'd', text: 'le joule' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Dans un fluide au repos, la pression dépend…',
    options: [
      { label: 'a', text: 'de la forme du récipient' },
      { label: 'b', text: 'du volume total de fluide' },
      { label: 'c', text: 'de la profondeur uniquement' },
      { label: 'd', text: 'de la surface libre' },
    ],
    answer: 'c',
  },
  {
    n: 3,
    text: 'Dans l\'eau, $10\\,\\text{m}$ de profondeur correspondent à environ…',
    options: [
      { label: 'a', text: '$0{,}1$ bar' },
      { label: 'b', text: '$1$ bar' },
      { label: 'c', text: '$10$ bar' },
      { label: 'd', text: '$100$ bar' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'La poussée d\'Archimède vaut…',
    options: [
      { label: 'a', text: '$\\rho_{\\text{corps}}\\,V_{\\text{tot}}\\,g$' },
      { label: 'b', text: '$\\rho_{\\text{fluide}}\\,V_{\\text{immergé}}\\,g$' },
      { label: 'c', text: '$\\rho_{\\text{corps}}\\,V_{\\text{immergé}}\\,g$' },
      { label: 'd', text: '$\\rho_{\\text{fluide}}\\,V_{\\text{tot}}\\,g$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Un corps flotte si…',
    options: [
      { label: 'a', text: '$\\rho_{\\text{corps}}>\\rho_{\\text{fluide}}$' },
      { label: 'b', text: '$\\rho_{\\text{corps}}<\\rho_{\\text{fluide}}$' },
      { label: 'c', text: 'son volume est grand' },
      { label: 'd', text: 'sa masse est faible' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Un iceberg ($\\rho=917$) dans l\'eau de mer ($\\rho=1025$) a un volume immergé d\'environ…',
    options: [
      { label: 'a', text: '$10\\,\\%$' },
      { label: 'b', text: '$50\\,\\%$' },
      { label: 'c', text: '$90\\,\\%$' },
      { label: 'd', text: '$100\\,\\%$' },
    ],
    answer: 'c',
  },
  {
    n: 7,
    text: 'Le débit volumique s\'exprime…',
    options: [
      { label: 'a', text: '$D_v=S/v$' },
      { label: 'b', text: '$D_v=S\\times v$' },
      { label: 'c', text: '$D_v=v/S$' },
      { label: 'd', text: '$D_v=S+v$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Si la section d\'une conduite est divisée par $3$, la vitesse est…',
    options: [
      { label: 'a', text: 'divisée par $3$' },
      { label: 'b', text: 'multipliée par $3$' },
      { label: 'c', text: 'inchangée' },
      { label: 'd', text: 'multipliée par $9$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Dans un rétrécissement horizontal, la pression…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 's\'annule' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La vitesse de vidange $v=\\sqrt{2gh}$ dépend…',
    options: [
      { label: 'a', text: 'de la masse volumique du fluide' },
      { label: 'b', text: 'de la seule profondeur $h$' },
      { label: 'c', text: 'de la section de l\'orifice' },
      { label: 'd', text: 'de la pression atmosphérique' },
    ],
    answer: 'b',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const FLUIDES_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'fluides-1',
    context: 'Pression : $p=\\dfrac{F}{S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir la pression et donner son unité. Quelle est la direction de la force pressante exercée par un fluide sur une paroi ?' },
      ],
    }],
  },
  {
    id: 'fluides-2',
    context: 'Conversion : $1\\,\\text{cm}^2=10^{-4}\\,\\text{m}^2$ · $1\\,\\text{bar}=10^{5}\\,\\text{Pa}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une force de $45\\,\\text{N}$ s\'exerce perpendiculairement sur une surface de $3{,}0\\,\\text{cm}^2$. Calculer la pression, en $\\text{Pa}$ puis en bar.' },
      ],
    }],
  },
  {
    id: 'fluides-3',
    context: 'Loi fondamentale de la statique des fluides.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer la loi fondamentale de la statique des fluides. Préciser la signification de chaque terme et les conditions d\'application.' },
      ],
    }],
  },
  {
    id: 'fluides-4',
    context: '$p=p_0+\\rho g h$, avec $p_0=1{,}013\\times 10^{5}\\,\\text{Pa}$, $\\rho_{\\text{eau}}=1{,}0\\times 10^{3}\\,\\text{kg·m}^{-3}$ et $g=9{,}81\\,\\text{m·s}^{-2}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la pression dans l\'eau douce aux profondeurs $h=5{,}0\\,\\text{m}$ ; $15\\,\\text{m}$ ; $25\\,\\text{m}$. Exprimer chaque résultat en bar.' },
      ],
    }],
  },
  {
    id: 'fluides-5',
    context: 'Théorème d\'Archimède : $\\Pi=\\rho_{\\text{fluide}}\\,V_{\\text{immergé}}\\,g$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer le théorème d\'Archimède. Préciser la direction et le sens de la poussée, ainsi que la signification de chaque grandeur de l\'expression.' },
      ],
    }],
  },
  {
    id: 'fluides-6',
    context: '$1\\,\\text{L}=10^{-3}\\,\\text{m}^3$ · $\\rho_{\\text{eau}}=1{,}0\\times 10^{3}\\,\\text{kg·m}^{-3}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un objet de volume $2{,}0\\,\\text{L}$ est **totalement** immergé dans l\'eau douce. Calculer la poussée d\'Archimède qu\'il subit.' },
      ],
    }],
  },
  {
    id: 'fluides-7',
    context: 'Débit volumique : $D_v=S\\,v$.',
    parts: [{
      questions: [
        { n: 'a', text: 'De l\'eau circule à $2{,}0\\,\\text{m·s}^{-1}$ dans un tuyau de section $12\\,\\text{cm}^2$. Calculer le débit volumique en $\\text{m}^3\\text{·s}^{-1}$ puis en $\\text{L·s}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'fluides-8',
    context: 'Conservation du débit volumique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer la loi de conservation du débit. Sous quelles hypothèses est-elle valable ? Quelle relation lie $S$ et $v$ ?' },
      ],
    }],
  },
  {
    id: 'fluides-9',
    context: 'Relation de Bernoulli.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer la relation de Bernoulli. Préciser les **trois** hypothèses nécessaires à son application.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'fluides-10',
    context: 'Attention : la conversion des surfaces est **quadratique**.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un fluide à $2{,}5\\,\\text{bar}$ s\'exerce sur une paroi de $200\\,\\text{cm}^2$. Calculer la force pressante. Détailler la conversion de la surface.' },
      ],
    }],
  },
  {
    id: 'fluides-11',
    context: 'Analyse dimensionnelle : $[\\rho]=\\text{M·L}^{-3}$, $[g]=\\text{L·T}^{-2}$, $[h]=\\text{L}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer, par analyse dimensionnelle, que le produit $\\rho g h$ est homogène à une pression.' },
      ],
    }],
  },
  {
    id: 'fluides-12',
    context: 'La règle pratique du plongeur.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer par le calcul que $10\\,\\text{m}$ d\'eau correspondent à environ $1\\,\\text{bar}$. Cette règle est-elle exacte ou approchée ? Justifier.' },
      ],
    }],
  },
  {
    id: 'fluides-13',
    context: 'Problème inverse : isoler $h$ dans $p=p_0+\\rho g h$.',
    parts: [{
      questions: [
        { n: 'a', text: 'À quelle profondeur, dans l\'eau douce, la pression atteint-elle $3{,}00\\,\\text{bar}$ ?' },
      ],
    }],
  },
  {
    id: 'fluides-14',
    context: 'Un bloc de masse $m=1{,}5\\,\\text{kg}$ et de volume $V=2{,}0\\,\\text{L}$ est posé sur l\'eau douce.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer sa masse volumique. Flotte-t-il ? Justifier.' },
        { n: 'b', text: 'Calculer la fraction de son volume immergée, puis le volume immergé en litres.' },
        { n: 'c', text: 'Vérifier que l\'équilibre $\\Pi=P$ est bien satisfait.' },
      ],
    }],
  },
  {
    id: 'fluides-15',
    context: 'Le piège central du chapitre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un élève écrit : « $\\Pi=\\rho_{\\text{corps}}\\times V_{\\text{total}}\\times g$ ». Relever les **deux** erreurs et écrire l\'expression correcte.' },
      ],
    }],
  },
  {
    id: 'fluides-16',
    context: 'Débit : $v=\\dfrac{D_v}{S}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un débit de $6{,}0\\,\\text{L·s}^{-1}$ traverse une conduite de section $15\\,\\text{cm}^2$. Calculer la vitesse d\'écoulement.' },
      ],
    }],
  },
  {
    id: 'fluides-17',
    context: 'Conservation du débit : $S_1v_1=S_2v_2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une conduite de section $8{,}0\\,\\text{cm}^2$, parcourue à $3{,}0\\,\\text{m·s}^{-1}$, se rétrécit à $2{,}0\\,\\text{cm}^2$. Calculer la nouvelle vitesse. Vérifier la cohérence par le rapport des sections.' },
      ],
    }],
  },
  {
    id: 'fluides-18',
    context: 'Chaque terme de Bernoulli est une énergie volumique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que chaque terme de la relation de Bernoulli est homogène à une énergie volumique. À quelle loi générale cette relation correspond-elle ?' },
      ],
    }],
  },
  {
    id: 'fluides-19',
    context: 'Un réservoir ouvert est percé à une profondeur $h$ sous la surface libre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Établir l\'expression $v=\\sqrt{2gh}$ à partir de la relation de Bernoulli.' },
        { n: 'b', text: 'Calculer $v$ pour $h=1{,}5\\,\\text{m}$ puis $h=3{,}0\\,\\text{m}$.' },
        { n: 'c', text: 'La vitesse dépend-elle du fluide ? Commenter ce résultat.' },
      ],
    }],
  },
  {
    id: 'fluides-20',
    context: 'Conduite horizontale d\'eau ($\\rho=1{,}0\\times 10^{3}\\,\\text{kg·m}^{-3}$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une conduite horizontale d\'eau, la vitesse passe de $2{,}0$ à $8{,}0\\,\\text{m·s}^{-1}$. Calculer la différence de pression $p_1-p_2$, en $\\text{Pa}$ puis en bar. La pression augmente-t-elle ou diminue-t-elle ?' },
      ],
    }],
  },
  // ── TIER 3 — approfondissement ★★★ ─────────────────────────────────────────
  {
    id: 'fluides-21',
    context: 'Un baromètre de Torricelli est constitué d\'un tube renversé rempli de mercure ; le vide règne au-dessus de la colonne. On mesure une hauteur de $760\\,\\text{mm}$. Donnée : $\\rho_{\\text{Hg}}=13{,}6\\times 10^{3}\\,\\text{kg·m}^{-3}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\rho_{\\text{Hg}}\\,g\\,h$.' },
        { n: 'b', text: 'Comparer à $p_0$. Interpréter.' },
        { n: 'c', text: 'Pourquoi utilise-t-on du mercure plutôt que de l\'eau ? Calculer la hauteur d\'eau qui serait nécessaire.' },
      ],
    }],
  },
  {
    id: 'fluides-22',
    context: 'Trois récipients de formes très différentes (cylindrique, conique évasé, conique resserré) contiennent de l\'eau jusqu\'à la même hauteur.',
    parts: [{
      questions: [
        { n: 'a', text: 'Comparer les pressions au fond de chacun. Justifier.' },
      ],
    }],
  },
  {
    id: 'fluides-23',
    context: 'Fraction immergée : $\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{\\rho_{\\text{corps}}}{\\rho_{\\text{fluide}}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un même corps flotte successivement dans l\'eau douce puis dans l\'eau de mer. Dans quel cas s\'enfonce-t-il le plus ? Justifier par la relation donnant la fraction immergée.' },
      ],
    }],
  },
  {
    id: 'fluides-24',
    context: 'L\'acier a une masse volumique de $7{,}8\\times 10^{3}\\,\\text{kg·m}^{-3}$, bien supérieure à celle de l\'eau.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi un navire en acier flotte pourtant.' },
        { n: 'b', text: 'Sur quelle grandeur porte réellement la condition de flottaison ?' },
      ],
    }],
  },
  {
    id: 'fluides-25',
    context: 'Interprétation physique de la conservation du débit.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pourquoi le débit se conserve-t-il ? Répondre en une phrase de raisonnement physique, sans formule. Que se passerait-il si ce n\'était pas le cas ?' },
      ],
    }],
  },
  {
    id: 'fluides-26',
    context: 'Le sens du raisonnement dans un effet Venturi.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelle grandeur détermine quelle autre ? Ordonner correctement : section, pression, vitesse.' },
        { n: 'b', text: 'Pourquoi ne peut-on pas raisonner en sens inverse ?' },
      ],
    }],
  },
  // ── TIER 4 — sujets type bac ◆ ─────────────────────────────────────────────
  {
    id: 'fluides-27',
    context: 'Un plongeur descend dans l\'eau de mer ($\\rho=1{,}025\\times 10^{3}\\,\\text{kg·m}^{-3}$). Données : $g=9{,}81\\,\\text{m·s}^{-2}$, $p_0=1{,}013\\times 10^{5}\\,\\text{Pa}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer la pression à $h=10\\,\\text{m}$, $20\\,\\text{m}$ et $40\\,\\text{m}$. Exprimer en bar.' },
        { n: 'b', text: 'Tracer l\'allure de $p$ en fonction de $h$. Quelle est la nature de cette évolution ? Que représente l\'ordonnée à l\'origine ?' },
        { n: 'c', text: 'À $40\\,\\text{m}$, calculer la force pressante s\'exerçant sur un hublot circulaire de surface $15\\,\\text{cm}^2$.' },
        { n: 'd', text: 'En réalité, l\'air à l\'intérieur du masque est à la pression ambiante. Calculer la force **nette** s\'exerçant sur le hublot si l\'intérieur est à $p_0$. Commenter l\'écart avec la question c.' },
        { n: 'e', text: 'Le volume d\'une bulle d\'air est $V_0$ en surface. À $40\\,\\text{m}$, et à température constante, la loi de Boyle-Mariotte $pV=\\text{cste}$ s\'applique. Calculer le rapport $V/V_0$.' },
        { n: 'f', text: 'En déduire pourquoi un plongeur ne doit jamais bloquer sa respiration lors d\'une remontée. Justifier physiquement.' },
      ],
    }],
  },
  {
    id: 'fluides-28',
    context: 'Un iceberg de volume total $V_{\\text{tot}}=1{,}00\\times 10^{3}\\,\\text{m}^3$ flotte en équilibre dans l\'eau de mer. On donne $\\rho_{\\text{glace}}=917\\,\\text{kg·m}^{-3}$ et $\\rho_{\\text{mer}}=1{,}025\\times 10^{3}\\,\\text{kg·m}^{-3}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Faire le bilan des forces s\'exerçant sur l\'iceberg à l\'équilibre. Écrire la condition d\'équilibre.' },
        { n: 'b', text: 'En déduire l\'expression littérale de la fraction immergée $\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}$ en fonction des masses volumiques.' },
        { n: 'c', text: 'Calculer cette fraction. Quel pourcentage du volume émerge ?' },
        { n: 'd', text: 'Calculer $V_{\\text{imm}}$ et $V_{\\text{émergé}}$ en $\\text{m}^3$.' },
        { n: 'e', text: 'Calculer la masse de l\'iceberg, puis son poids.' },
        { n: 'f', text: 'Calculer la poussée d\'Archimède. Vérifier numériquement l\'équilibre.' },
        { n: 'g', text: 'L\'iceberg dérive dans une zone d\'eau douce ($\\rho=1{,}0\\times 10^{3}$). Émergera-t-il davantage ou moins ? Justifier par le calcul.' },
      ],
    }],
  },
  {
    id: 'fluides-29',
    context: 'De l\'eau ($\\rho=1{,}0\\times 10^{3}\\,\\text{kg·m}^{-3}$) circule dans une conduite **horizontale** de section $S_1=20\\,\\text{cm}^2$ à la vitesse $v_1=1{,}5\\,\\text{m·s}^{-1}$. Un rétrécissement ramène la section à $S_2=5{,}0\\,\\text{cm}^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer le débit volumique, en $\\text{m}^3\\text{·s}^{-1}$ puis en $\\text{L·s}^{-1}$.' },
        { n: 'b', text: 'Calculer $v_2$. Vérifier la cohérence avec le rapport $S_1/S_2$.' },
        { n: 'c', text: 'Justifier que le terme $\\rho g z$ se simplifie dans la relation de Bernoulli. Écrire la relation simplifiée entre les deux points.' },
        { n: 'd', text: 'Établir l\'expression littérale de $p_1-p_2$ en fonction de $\\rho$, $v_1$ et $v_2$.' },
        { n: 'e', text: 'Calculer $p_1-p_2$, en $\\text{Pa}$ puis en bar. La pression augmente-t-elle ou diminue-t-elle dans le rétrécissement ?' },
        { n: 'f', text: 'Deux tubes verticaux ouverts sont branchés en $1$ et en $2$. Dans lequel l\'eau monte-t-elle le plus haut ? Calculer la différence de hauteur entre les deux colonnes.' },
        { n: 'g', text: 'Ce dispositif permet de mesurer un débit. Expliquer le principe : quelle grandeur mesure-t-on, et comment remonte-t-on à $D_v$ ?' },
        { n: 'h', text: 'En réalité, l\'eau est visqueuse. La relation de Bernoulli reste-t-elle rigoureusement valable ? Quel effet la viscosité aurait-elle sur la mesure ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const FLUIDES_CORRECTIONS: Record<string, Correction> = {
  'fluides-1': {
    steps: [
      { n: '1', text: 'La **pression** est le quotient de la force pressante par la surface sur laquelle elle s\'exerce : $p=\\dfrac{F}{S}$. Son unité est le **pascal** (Pa), avec $1\\,\\text{Pa}=1\\,\\text{N·m}^{-2}$.' },
      { n: '2', text: 'La force pressante exercée par un fluide sur une paroi est **perpendiculaire** à cette paroi et dirigée **vers** elle.' },
    ],
    result: '$p=\\dfrac{F}{S}$ en pascals ; force pressante perpendiculaire à la paroi et dirigée vers elle.',
  },
  'fluides-2': {
    steps: [
      { n: '1', text: '$S=3{,}0\\,\\text{cm}^2=3{,}0\\times 10^{-4}\\,\\text{m}^2$.' },
      { n: '2', text: '$p=\\dfrac{F}{S}=\\dfrac{45}{3{,}0\\times 10^{-4}}=1{,}5\\times 10^{5}\\,\\text{Pa}$.' },
      { n: '3', text: 'Soit $p=\\dfrac{1{,}5\\times 10^{5}}{10^{5}}=1{,}5\\,\\text{bar}$.' },
    ],
    result: '$p=1{,}5\\times 10^{5}\\,\\text{Pa}=1{,}5\\,\\text{bar}$.',
  },
  'fluides-3': {
    steps: [
      { n: '1', text: 'Dans un fluide **incompressible au repos**, la pression à la profondeur $h$ sous la surface libre vaut $p=p_0+\\rho g h$.' },
      { n: '2', text: '$p_0$ : pression à la surface libre (souvent la pression atmosphérique), en Pa. $\\rho$ : masse volumique du fluide, en $\\text{kg·m}^{-3}$.' },
      { n: '3', text: '$g$ : intensité de pesanteur, en $\\text{m·s}^{-2}$. $h$ : **profondeur** comptée vers le bas depuis la surface, en m.' },
      { n: '4', text: '**Conditions** : fluide au **repos** et **incompressible** ($\\rho$ constante).' },
    ],
    result: '$p=p_0+\\rho g h$ — fluide au repos et incompressible ; $h$ est une profondeur comptée vers le bas.',
  },
  'fluides-4': {
    steps: [
      { n: '1', text: '$h=5{,}0\\,\\text{m}$ : $p=1{,}013\\times 10^{5}+1{,}0\\times 10^{3}\\times 9{,}81\\times 5{,}0=1{,}50\\times 10^{5}\\,\\text{Pa}=1{,}50\\,\\text{bar}$.' },
      { n: '2', text: '$h=15\\,\\text{m}$ : $p=1{,}013\\times 10^{5}+1{,}47\\times 10^{5}=2{,}48\\times 10^{5}\\,\\text{Pa}=2{,}48\\,\\text{bar}$.' },
      { n: '3', text: '$h=25\\,\\text{m}$ : $p=1{,}013\\times 10^{5}+2{,}45\\times 10^{5}=3{,}47\\times 10^{5}\\,\\text{Pa}=3{,}47\\,\\text{bar}$.' },
      { n: '4', text: 'On vérifie que la pression croît bien d\'environ $1\\,\\text{bar}$ tous les $10\\,\\text{m}$.' },
    ],
    result: '$1{,}50$ · $2{,}48$ · $3{,}47$ bar — environ $+1$ bar tous les $10\\,\\text{m}$.',
  },
  'fluides-5': {
    steps: [
      { n: '1', text: 'Tout corps plongé dans un fluide subit de sa part une force **verticale**, dirigée **vers le haut**, appelée **poussée d\'Archimède**, dont la valeur est égale au **poids du fluide déplacé**.' },
      { n: '2', text: '$\\Pi=\\rho_{\\text{fluide}}\\times V_{\\text{immergé}}\\times g$, où $\\rho_{\\text{fluide}}$ est la masse volumique du **fluide** et $V_{\\text{immergé}}$ le volume de la partie du corps **effectivement sous la surface**.' },
    ],
    result: '$\\Pi=\\rho_{\\text{fluide}}\\,V_{\\text{immergé}}\\,g$ — verticale, vers le haut, égale au poids du fluide déplacé.',
  },
  'fluides-6': {
    steps: [
      { n: '1', text: '$V=2{,}0\\,\\text{L}=2{,}0\\times 10^{-3}\\,\\text{m}^3$. Le corps étant **totalement** immergé, $V_{\\text{immergé}}=V=2{,}0\\times 10^{-3}\\,\\text{m}^3$.' },
      { n: '2', text: '$\\Pi=1{,}0\\times 10^{3}\\times 2{,}0\\times 10^{-3}\\times 9{,}81=19{,}62\\,\\text{N}$.' },
    ],
    result: '$\\Pi\\approx 19{,}6\\,\\text{N}$.',
  },
  'fluides-7': {
    steps: [
      { n: '1', text: '$S=12\\,\\text{cm}^2=1{,}2\\times 10^{-3}\\,\\text{m}^2$.' },
      { n: '2', text: '$D_v=S\\times v=1{,}2\\times 10^{-3}\\times 2{,}0=2{,}4\\times 10^{-3}\\,\\text{m}^3\\text{·s}^{-1}$.' },
      { n: '3', text: 'Soit $D_v=2{,}4\\times 10^{-3}\\times 10^{3}=2{,}4\\,\\text{L·s}^{-1}$.' },
    ],
    result: '$D_v=2{,}4\\times 10^{-3}\\,\\text{m}^3\\text{·s}^{-1}=2{,}4\\,\\text{L·s}^{-1}$.',
  },
  'fluides-8': {
    steps: [
      { n: '1', text: 'Pour un fluide **incompressible** en écoulement **stationnaire**, le débit volumique se **conserve** le long de l\'écoulement : $D_v=S_1v_1=S_2v_2=\\text{constante}$.' },
      { n: '2', text: '**Hypothèses** : fluide incompressible ($\\rho$ constante) et écoulement stationnaire (le régime ne varie pas au cours du temps).' },
      { n: '3', text: '**Relation** : $S$ et $v$ sont **inversement proportionnelles** — leur produit est constant.' },
    ],
    result: '$S_1v_1=S_2v_2$ — fluide incompressible, écoulement stationnaire ; $S$ et $v$ inversement proportionnelles.',
  },
  'fluides-9': {
    steps: [
      { n: '1', text: 'Le long d\'une ligne de courant : $p+\\tfrac{1}{2}\\rho v^2+\\rho g z=\\text{constante}$.' },
      { n: '2', text: '**Les trois hypothèses** : fluide **parfait** (sans viscosité, donc sans frottement interne) ; fluide **incompressible** ($\\rho$ constante) ; écoulement **stationnaire** (indépendant du temps).' },
    ],
    result: '$p+\\tfrac{1}{2}\\rho v^2+\\rho g z=\\text{cste}$ — fluide parfait, incompressible, écoulement stationnaire.',
  },
  'fluides-10': {
    steps: [
      { n: '1', text: '**Conversion** : $200\\,\\text{cm}^2=200\\times 10^{-4}=2{,}0\\times 10^{-2}\\,\\text{m}^2$. Attention, la conversion est **quadratique** : $1\\,\\text{cm}^2=(10^{-2}\\,\\text{m})^2=10^{-4}\\,\\text{m}^2$.' },
      { n: '2', text: '$p=2{,}5\\,\\text{bar}=2{,}5\\times 10^{5}\\,\\text{Pa}$.' },
      { n: '3', text: '$F=p\\times S=2{,}5\\times 10^{5}\\times 2{,}0\\times 10^{-2}=5{,}0\\times 10^{3}\\,\\text{N}$.' },
    ],
    result: '$F=5{,}0\\times 10^{3}\\,\\text{N}$ — soit le poids d\'environ $500\\,\\text{kg}$.',
  },
  'fluides-11': {
    steps: [
      { n: '1', text: '$[\\rho]=\\text{M·L}^{-3}$ ; $[g]=\\text{L·T}^{-2}$ ; $[h]=\\text{L}$.' },
      { n: '2', text: 'D\'où $[\\rho g h]=\\text{M·L}^{-3}\\times\\text{L·T}^{-2}\\times\\text{L}=\\text{M·L}^{-1}\\text{·T}^{-2}$.' },
      { n: '3', text: 'Par ailleurs $[p]=\\left[\\dfrac{F}{S}\\right]=\\dfrac{\\text{M·L·T}^{-2}}{\\text{L}^2}=\\text{M·L}^{-1}\\text{·T}^{-2}$.' },
      { n: '4', text: 'Les deux dimensions sont **identiques** : $\\rho g h$ est bien homogène à une pression, ce qui valide la cohérence de $p=p_0+\\rho g h$ (on n\'additionne que des grandeurs de même dimension).' },
    ],
    result: '$[\\rho g h]=\\text{M·L}^{-1}\\text{·T}^{-2}=[p]$ ✓.',
  },
  'fluides-12': {
    steps: [
      { n: '1', text: '$\\rho g h=1{,}0\\times 10^{3}\\times 9{,}81\\times 10=9{,}81\\times 10^{4}\\,\\text{Pa}=0{,}981\\,\\text{bar}$.' },
      { n: '2', text: 'La règle est donc **approchée**, mais excellente : l\'écart avec $1\\,\\text{bar}$ n\'est que de $1{,}9\\,\\%$.' },
      { n: '3', text: 'Elle repose sur la coïncidence numérique $\\rho g\\approx 10^{4}$ (précisément $9{,}81\\times 10^{3}$) : $10\\,\\text{m}$ d\'eau produisent $\\approx 10^{5}\\,\\text{Pa}$, soit exactement un bar. C\'est un repère de calcul mental très commode — à ne pas confondre avec une égalité exacte.' },
    ],
    result: '$10\\,\\text{m}$ d\'eau $=0{,}981\\,\\text{bar}\\approx 1\\,\\text{bar}$ — approché à $2\\,\\%$ près.',
  },
  'fluides-13': {
    steps: [
      { n: '1', text: '$p=p_0+\\rho g h$ donne $h=\\dfrac{p-p_0}{\\rho g}$.' },
      { n: '2', text: '$h=\\dfrac{3{,}00\\times 10^{5}-1{,}013\\times 10^{5}}{1{,}0\\times 10^{3}\\times 9{,}81}=\\dfrac{1{,}987\\times 10^{5}}{9{,}81\\times 10^{3}}\\approx 20{,}3\\,\\text{m}$.' },
      { n: '3', text: '*Contrôle* : $3\\,\\text{bar}$, c\'est $\\approx 2\\,\\text{bar}$ de plus que la surface, donc $\\approx 20\\,\\text{m}$ selon la règle pratique ✓.' },
    ],
    result: '$h\\approx 20{,}3\\,\\text{m}$.',
  },
  'fluides-14': {
    steps: [
      { n: 'a', text: '$\\rho_{\\text{corps}}=\\dfrac{m}{V}=\\dfrac{1{,}5}{2{,}0\\times 10^{-3}}=7{,}5\\times 10^{2}\\,\\text{kg·m}^{-3}$. Comme $750<1000$, on a $\\rho_{\\text{corps}}<\\rho_{\\text{eau}}$ : le bloc **flotte**.' },
      { n: 'b', text: '$\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{\\rho_{\\text{corps}}}{\\rho_{\\text{fluide}}}=\\dfrac{750}{1000}=0{,}750$, soit $75{,}0\\,\\%$. $V_{\\text{imm}}=0{,}750\\times 2{,}0=1{,}5\\,\\text{L}=1{,}5\\times 10^{-3}\\,\\text{m}^3$.' },
      { n: 'c', text: '$\\Pi=1{,}0\\times 10^{3}\\times 1{,}5\\times 10^{-3}\\times 9{,}81=14{,}7\\,\\text{N}$ et $P=mg=1{,}5\\times 9{,}81=14{,}7\\,\\text{N}$. $\\Pi=P$ ✓ : l\'équilibre est vérifié. C\'est cohérent — le corps s\'enfonce *précisément* jusqu\'à ce que la poussée compense son poids.' },
    ],
    result: '$\\rho_{\\text{corps}}=750\\,\\text{kg·m}^{-3}$ — flotte · $75\\,\\%$ immergé ($1{,}5\\,\\text{L}$) · $\\Pi=P=14{,}7\\,\\text{N}$.',
  },
  'fluides-15': {
    steps: [
      { n: '1', text: '**Erreur 1** : $\\rho$ doit être celle du **FLUIDE**, pas celle du corps. La poussée traduit l\'action du fluide environnant ; la nature du corps n\'y intervient pas.' },
      { n: '2', text: '**Erreur 2** : $V$ doit être le volume **IMMERGÉ**, pas le volume total. Ils ne coïncident que si le corps est entièrement sous la surface.' },
      { n: '3', text: '**Expression correcte** : $\\Pi=\\rho_{\\text{fluide}}\\times V_{\\text{immergé}}\\times g$.' },
      { n: '4', text: '*Remarque* : l\'expression fautive $\\rho_{\\text{corps}}V_{\\text{tot}}g$ est en réalité celle du **poids** du corps — ce qui explique que l\'erreur passe parfois inaperçue en cas de flottaison, où $\\Pi=P$ justement.' },
    ],
    result: '$\\rho$ = celle du **fluide** · $V$ = volume **immergé** ⟹ $\\Pi=\\rho_{\\text{fluide}}V_{\\text{immergé}}g$.',
  },
  'fluides-16': {
    steps: [
      { n: '1', text: '$D_v=6{,}0\\,\\text{L·s}^{-1}=6{,}0\\times 10^{-3}\\,\\text{m}^3\\text{·s}^{-1}$ ; $S=15\\,\\text{cm}^2=1{,}5\\times 10^{-3}\\,\\text{m}^2$.' },
      { n: '2', text: '$v=\\dfrac{D_v}{S}=\\dfrac{6{,}0\\times 10^{-3}}{1{,}5\\times 10^{-3}}=4{,}0\\,\\text{m·s}^{-1}$.' },
    ],
    result: '$v=4{,}0\\,\\text{m·s}^{-1}$.',
  },
  'fluides-17': {
    steps: [
      { n: '1', text: '$S_1v_1=S_2v_2$ donne $v_2=\\dfrac{S_1v_1}{S_2}=\\dfrac{8{,}0\\times 10^{-4}\\times 3{,}0}{2{,}0\\times 10^{-4}}=12\\,\\text{m·s}^{-1}$.' },
      { n: '2', text: '**Contrôle** : $\\dfrac{S_1}{S_2}=\\dfrac{8{,}0}{2{,}0}=4$ et $\\dfrac{v_2}{v_1}=\\dfrac{12}{3{,}0}=4$ ✓. La section est divisée par $4$, la vitesse est multipliée par $4$ : cohérent.' },
      { n: '3', text: '*Astuce* : les sections étant dans le même rapport quelle que soit l\'unité, on peut travailler directement en $\\text{cm}^2$ pour ce type de rapport.' },
    ],
    result: '$v_2=12\\,\\text{m·s}^{-1}$.',
  },
  'fluides-18': {
    steps: [
      { n: '1', text: '$[p]=\\text{M·L}^{-1}\\text{·T}^{-2}$. Or une énergie volumique a pour dimension $\\dfrac{[E]}{[V]}=\\dfrac{\\text{M·L}^2\\text{·T}^{-2}}{\\text{L}^3}=\\text{M·L}^{-1}\\text{·T}^{-2}$ : identiques ✓.' },
      { n: '2', text: '$\\left[\\tfrac{1}{2}\\rho v^2\\right]=\\text{M·L}^{-3}\\times\\text{L}^2\\text{·T}^{-2}=\\text{M·L}^{-1}\\text{·T}^{-2}$ ✓ — c\'est l\'énergie cinétique par unité de volume.' },
      { n: '3', text: '$[\\rho g z]=\\text{M·L}^{-3}\\times\\text{L·T}^{-2}\\times\\text{L}=\\text{M·L}^{-1}\\text{·T}^{-2}$ ✓ — c\'est l\'énergie potentielle de pesanteur par unité de volume.' },
      { n: '4', text: 'Les trois termes sont donc des **énergies volumiques** (en $\\text{J·m}^{-3}$), et leur somme se conserve. La relation de Bernoulli n\'est rien d\'autre que la **conservation de l\'énergie mécanique**, écrite par unité de volume : c\'est le $E_m=\\text{cste}$ déjà connu, transposé aux fluides.' },
    ],
    result: 'Les trois termes sont des énergies volumiques ($\\text{J·m}^{-3}$) : Bernoulli = conservation de l\'énergie mécanique par unité de volume.',
  },
  'fluides-19': {
    steps: [
      { n: 'a', text: 'On applique Bernoulli entre la **surface libre** (point 1) et l\'**orifice** (point 2). Au point 1 : $p_1=p_0$ (réservoir ouvert), $v_1\\approx 0$ (la surface descend très lentement, sa section étant grande devant celle de l\'orifice), $z_1=h$. Au point 2 : $p_2=p_0$ (le jet débouche à l\'air libre), $v_2=v$, $z_2=0$. D\'où $p_0+0+\\rho g h=p_0+\\tfrac{1}{2}\\rho v^2+0$. Les $p_0$ se simplifient : $\\rho g h=\\tfrac{1}{2}\\rho v^2$, puis $\\rho$ se simplifie également : $gh=\\tfrac{v^2}{2}$, d\'où $v=\\sqrt{2gh}$.' },
      { n: 'b', text: '$h=1{,}5\\,\\text{m}$ : $v=\\sqrt{2\\times 9{,}81\\times 1{,}5}=\\sqrt{29{,}4}\\approx 5{,}4\\,\\text{m·s}^{-1}$. $h=3{,}0\\,\\text{m}$ : $v=\\sqrt{2\\times 9{,}81\\times 3{,}0}=\\sqrt{58{,}9}\\approx 7{,}7\\,\\text{m·s}^{-1}$. *Remarque* : $h$ doublé ne double pas $v$, qui n\'est multipliée que par $\\sqrt{2}\\approx 1{,}41$ — cohérent avec les valeurs ✓.' },
      { n: 'c', text: '**Non** : $\\rho$ s\'est **simplifiée** dans la démonstration. La vitesse de vidange est donc **indépendante du fluide** — l\'eau, l\'huile ou le mercure sortiraient à la même vitesse. C\'est exactement la formule de la **chute libre** depuis une hauteur $h$, et pour la même raison profonde : un fluide plus dense est plus lourd (donc plus poussé) mais aussi plus inerte (donc plus dur à accélérer). Les deux effets se compensent *exactement*, comme pour la chute des corps.' },
    ],
    result: '$v=\\sqrt{2gh}$ · $5{,}4$ et $7{,}7\\,\\text{m·s}^{-1}$ · indépendant de $\\rho$.',
  },
  'fluides-20': {
    steps: [
      { n: '1', text: 'Conduite **horizontale** : $z_1=z_2$, le terme $\\rho g z$ se simplifie.' },
      { n: '2', text: '$p_1-p_2=\\tfrac{1}{2}\\rho\\left(v_2^2-v_1^2\\right)=\\tfrac{1}{2}\\times 1{,}0\\times 10^{3}\\times\\left(8{,}0^2-2{,}0^2\\right)=500\\times(64-4)=500\\times 60$.' },
      { n: '3', text: '$p_1-p_2=3{,}0\\times 10^{4}\\,\\text{Pa}=0{,}30\\,\\text{bar}$.' },
      { n: '4', text: 'Comme $p_1-p_2>0$, on a $p_2<p_1$ : la pression **diminue** là où le fluide accélère.' },
    ],
    result: '$p_1-p_2=3{,}0\\times 10^{4}\\,\\text{Pa}=0{,}30\\,\\text{bar}$ — la pression diminue.',
  },
  'fluides-21': {
    steps: [
      { n: 'a', text: '$\\rho_{\\text{Hg}}\\,g\\,h=13{,}6\\times 10^{3}\\times 9{,}81\\times 0{,}760=1{,}014\\times 10^{5}\\,\\text{Pa}$.' },
      { n: 'b', text: '$p_0=1{,}013\\times 10^{5}\\,\\text{Pa}$ : l\'écart relatif n\'est que de $0{,}09\\,\\%$. Les deux valeurs **coïncident**. **Interprétation** : le vide régnant au-dessus du mercure, c\'est la **pression atmosphérique** qui, s\'exerçant sur la surface libre du bac, soutient la colonne. La hauteur de mercure **mesure** donc directement $p_0$ — d\'où l\'unité historique du « millimètre de mercure » et la valeur $760\\,\\text{mmHg}$.' },
      { n: 'c', text: 'Avec de l\'eau, il faudrait $h=\\dfrac{p_0}{\\rho_{\\text{eau}}\\,g}=\\dfrac{1{,}013\\times 10^{5}}{1{,}0\\times 10^{3}\\times 9{,}81}\\approx 10{,}3\\,\\text{m}$. Un baromètre à eau mesurerait donc plus de **dix mètres de haut** : totalement impraticable. Le rapport des hauteurs vaut $\\dfrac{10{,}3}{0{,}760}\\approx 13{,}6$, soit exactement $\\dfrac{\\rho_{\\text{Hg}}}{\\rho_{\\text{eau}}}$ — les hauteurs sont inversement proportionnelles aux masses volumiques.' },
    ],
    result: '$\\rho_{\\text{Hg}}gh=1{,}014\\times 10^{5}\\,\\text{Pa}\\approx p_0$ · un baromètre à eau ferait $10{,}3\\,\\text{m}$.',
  },
  'fluides-22': {
    steps: [
      { n: '1', text: 'Les pressions au fond sont **rigoureusement identiques** dans les trois cas.' },
      { n: '2', text: '**Justification** : $p=p_0+\\rho g h$ ne fait intervenir que $p_0$, $\\rho$, $g$ et $h$. Ni la **forme** du récipient, ni le **volume** de fluide, ni la **quantité** d\'eau n\'y figurent. Les trois récipients ayant la même hauteur d\'eau, ils ont la même pression au fond — bien que le récipient évasé contienne infiniment plus d\'eau que le récipient resserré.' },
      { n: '3', text: 'C\'est le résultat contre-intuitif connu sous le nom de **paradoxe hydrostatique**.' },
    ],
    result: 'Pressions identiques : $p=p_0+\\rho gh$ ne dépend que de $h$ — c\'est le paradoxe hydrostatique.',
  },
  'fluides-23': {
    steps: [
      { n: '1', text: '$\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{\\rho_{\\text{corps}}}{\\rho_{\\text{fluide}}}$ : à corps identique, la fraction immergée est **inversement proportionnelle** à $\\rho_{\\text{fluide}}$.' },
      { n: '2', text: 'Or $\\rho_{\\text{mer}}=1025>\\rho_{\\text{douce}}=1000$. La fraction immergée est donc **plus faible** en eau de mer.' },
      { n: '3', text: 'Le corps s\'enfonce donc **davantage dans l\'eau douce**. Physiquement : l\'eau de mer, plus dense, fournit une poussée plus forte à volume immergé égal — il faut donc en déplacer moins pour équilibrer le même poids.' },
    ],
    result: 'Il s\'enfonce plus dans l\'eau douce (fluide moins dense ⟹ poussée plus faible).',
  },
  'fluides-24': {
    steps: [
      { n: '1', text: 'La condition de flottaison ne porte **pas** sur la masse volumique du **matériau**, mais sur la masse volumique **MOYENNE** de l\'objet dans son ensemble.' },
      { n: '2', text: 'Un navire est une **coque creuse** : son volume total englobe la coque d\'acier *et* l\'énorme volume d\'air qu\'elle renferme. Sa masse volumique moyenne, $\\rho_{\\text{moy}}=\\dfrac{m_{\\text{total}}}{V_{\\text{total}}}$, est largement inférieure à $1{,}0\\times 10^{3}\\,\\text{kg·m}^{-3}$.' },
      { n: '3', text: 'Autrement dit, la coque **déplace beaucoup d\'eau pour peu de masse** : $\\Pi$ devient considérable. Une plaque d\'acier pleine, elle, coule — le même métal, mais sans le volume.' },
      { n: '4', text: 'C\'est aussi pourquoi une voie d\'eau est fatale : en remplaçant l\'air par de l\'eau, elle fait grimper $\\rho_{\\text{moy}}$ au-dessus de celle de l\'eau.' },
    ],
    result: 'La condition porte sur la masse volumique **moyenne** de l\'objet (coque + air), pas sur celle du matériau.',
  },
  'fluides-25': {
    steps: [
      { n: '1', text: 'Le fluide étant **incompressible**, il ne peut ni s\'accumuler ni se raréfier en un point de la conduite : tout ce qui entre par une section doit ressortir par la suivante, dans le même intervalle de temps.' },
      { n: '2', text: 'Si le débit n\'était pas conservé, de la matière **s\'accumulerait** (ou **disparaîtrait**) quelque part dans la conduite — ce qui contredirait soit la conservation de la masse, soit l\'incompressibilité, soit le caractère stationnaire de l\'écoulement.' },
    ],
    result: 'Le fluide incompressible ne peut ni s\'accumuler ni disparaître : ce qui entre ressort.',
  },
  'fluides-26': {
    steps: [
      { n: '1', text: 'L\'ordre est **imposé** et à sens unique : section $S\\;\\longrightarrow$ (conservation du débit) $\\longrightarrow$ vitesse $v\\;\\longrightarrow$ (Bernoulli) $\\longrightarrow$ pression $p$.' },
      { n: '2', text: 'La **géométrie** de la conduite est la seule donnée réellement libre : c\'est elle qu\'on impose en construisant le tube. Elle fixe alors $v$ par $S_1v_1=S_2v_2$, et $v$ fixe $p$ par Bernoulli.' },
      { n: '3', text: '**Pourquoi pas l\'inverse** : on ne peut pas « décider » de la pression dans le rétrécissement. Elle est une **conséquence** — la variable d\'ajustement par laquelle le fluide paie son accélération. Croire qu\'on impose $p$ reviendrait à inverser cause et effet.' },
    ],
    result: '$S\\to v$ (débit) $\\to p$ (Bernoulli) — jamais dans l\'autre sens.',
  },
  'fluides-27': {
    steps: [
      { n: 'a', text: '$p=p_0+\\rho g h$ avec $\\rho=1{,}025\\times 10^{3}\\,\\text{kg·m}^{-3}$ : à $10\\,\\text{m}$, $\\rho gh=1{,}01\\times 10^{5}$ et $p=2{,}02\\times 10^{5}\\,\\text{Pa}=2{,}02\\,\\text{bar}$ ; à $20\\,\\text{m}$, $p=3{,}02\\times 10^{5}\\,\\text{Pa}=3{,}02\\,\\text{bar}$ ; à $40\\,\\text{m}$, $p=5{,}04\\times 10^{5}\\,\\text{Pa}=5{,}04\\,\\text{bar}$.' },
      { n: 'b', text: '$p$ est une fonction **affine** de $h$ : la représentation est une **droite** de pente $\\rho g=1{,}01\\times 10^{4}\\,\\text{Pa·m}^{-1}$. L\'**ordonnée à l\'origine** vaut $p_0=1{,}013\\times 10^{5}\\,\\text{Pa}$ : c\'est la pression **en surface** ($h=0$), c\'est-à-dire la pression atmosphérique.' },
      { n: 'c', text: '$S=15\\,\\text{cm}^2=1{,}5\\times 10^{-3}\\,\\text{m}^2$. $F=p\\times S=5{,}04\\times 10^{5}\\times 1{,}5\\times 10^{-3}\\approx 7{,}6\\times 10^{2}\\,\\text{N}$.' },
      { n: 'd', text: 'Si l\'intérieur est à $p_0$, la force **nette** résulte de la **différence** de pression de part et d\'autre : $F_{\\text{nette}}=(p-p_0)\\times S=4{,}02\\times 10^{5}\\times 1{,}5\\times 10^{-3}\\approx 6{,}0\\times 10^{2}\\,\\text{N}$. **Commentaire** : l\'écart avec c vaut $p_0\\times S\\approx 152\\,\\text{N}$ — c\'est la contribution de l\'atmosphère, qui pousse aussi de l\'*autre* côté. Seule la **différence** de pression exerce un effet mécanique réel : c\'est pourquoi on raisonne toujours en pression **relative** pour dimensionner une paroi.' },
      { n: 'e', text: 'Boyle-Mariotte : $p_0V_0=pV$, d\'où $\\dfrac{V}{V_0}=\\dfrac{p_0}{p}=\\dfrac{1{,}013\\times 10^{5}}{5{,}04\\times 10^{5}}\\approx 0{,}201$. Le volume de la bulle est donc divisé par environ $5$ à $40\\,\\text{m}$.' },
      { n: 'f', text: 'Lors d\'une **remontée**, $h$ diminue donc $p$ diminue, et le volume d\'air **augmente** : de $40\\,\\text{m}$ à la surface, il est **multiplié par 5**. Si le plongeur bloque sa respiration, l\'air emprisonné dans ses poumons ne peut pas s\'échapper : il se dilate d\'un facteur $5$ dans une cavité fermée, ce qui provoque une **surpression pulmonaire** pouvant déchirer les alvéoles (barotraumatisme). En expirant continûment, le plongeur laisse l\'air excédentaire s\'évacuer au fur et à mesure de la détente : le volume pulmonaire reste constant. C\'est aussi pourquoi le danger est **maximal près de la surface**, là où la pression varie proportionnellement le plus vite.' },
    ],
    result: '$2{,}02$ / $3{,}02$ / $5{,}04$ bar · $F\\approx 7{,}6\\times 10^{2}\\,\\text{N}$ · $F_{\\text{nette}}\\approx 6{,}0\\times 10^{2}\\,\\text{N}$ · $V/V_0\\approx 0{,}20$ — l\'air ×5 à la remontée.',
  },
  'fluides-28': {
    steps: [
      { n: 'a', text: 'L\'iceberg est soumis à **deux** forces : son **poids** $\\vec{P}$ (vertical, vers le bas, $P=\\rho_{\\text{glace}}V_{\\text{tot}}\\,g$) et la **poussée d\'Archimède** $\\vec{\\Pi}$ (verticale, vers le haut, $\\Pi=\\rho_{\\text{mer}}V_{\\text{imm}}\\,g$). À l\'équilibre : $\\vec{P}+\\vec{\\Pi}=\\vec{0}$, soit en projection $\\Pi=P$.' },
      { n: 'b', text: '$\\rho_{\\text{mer}}V_{\\text{imm}}\\,g=\\rho_{\\text{glace}}V_{\\text{tot}}\\,g$. En simplifiant par $g$ : $\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{\\rho_{\\text{glace}}}{\\rho_{\\text{mer}}}$.' },
      { n: 'c', text: '$\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{917}{1025}\\approx 0{,}895$, soit $89{,}5\\,\\%$ immergé. Il émerge donc $100-89{,}5=\\mathbf{10{,}5\\,\\%}$ du volume — d\'où l\'expression « la partie émergée de l\'iceberg ».' },
      { n: 'd', text: '$V_{\\text{imm}}=0{,}895\\times 1{,}00\\times 10^{3}\\approx 8{,}95\\times 10^{2}\\,\\text{m}^3$. $V_{\\text{émergé}}=1{,}00\\times 10^{3}-8{,}95\\times 10^{2}\\approx 1{,}05\\times 10^{2}\\,\\text{m}^3$.' },
      { n: 'e', text: '$m=\\rho_{\\text{glace}}\\times V_{\\text{tot}}=917\\times 1{,}00\\times 10^{3}=9{,}17\\times 10^{5}\\,\\text{kg}$, soit $917$ **tonnes**. $P=mg=9{,}17\\times 10^{5}\\times 9{,}81\\approx 9{,}00\\times 10^{6}\\,\\text{N}$.' },
      { n: 'f', text: '$\\Pi=\\rho_{\\text{mer}}\\times V_{\\text{imm}}\\times g=1{,}025\\times 10^{3}\\times 8{,}95\\times 10^{2}\\times 9{,}81\\approx 9{,}00\\times 10^{6}\\,\\text{N}$. $\\Pi=P$ ✓ — l\'équilibre est numériquement vérifié. Ce n\'est pas une coïncidence : la fraction immergée a précisément été calculée pour que ce soit le cas.' },
      { n: 'g', text: 'En eau douce : $\\dfrac{V_{\\text{imm}}}{V_{\\text{tot}}}=\\dfrac{917}{1000}=0{,}917$, soit $91{,}7\\,\\%$ immergé et seulement $8{,}3\\,\\%$ **émergé**. L\'iceberg émerge donc **MOINS** en eau douce ($8{,}3\\,\\%$ contre $10{,}5\\,\\%$) : il s\'y enfonce davantage. **Justification physique** : l\'eau douce est **moins dense**, donc à volume immergé égal elle fournit une poussée **plus faible**. Pour équilibrer le même poids, l\'iceberg doit déplacer un **plus grand volume** — il s\'enfonce.' },
    ],
    result: '$89{,}5\\,\\%$ immergé · $V_{\\text{imm}}\\approx 895\\,\\text{m}^3$ · $m=917\\,\\text{t}$ · $\\Pi=P\\approx 9{,}00\\times 10^{6}\\,\\text{N}$ · en eau douce : $91{,}7\\,\\%$ immergé.',
  },
  'fluides-29': {
    steps: [
      { n: 'a', text: '$S_1=20\\,\\text{cm}^2=2{,}0\\times 10^{-3}\\,\\text{m}^2$. $D_v=S_1v_1=2{,}0\\times 10^{-3}\\times 1{,}5=3{,}0\\times 10^{-3}\\,\\text{m}^3\\text{·s}^{-1}=3{,}0\\,\\text{L·s}^{-1}$.' },
      { n: 'b', text: '$S_2=5{,}0\\,\\text{cm}^2=5{,}0\\times 10^{-4}\\,\\text{m}^2$. Conservation du débit : $v_2=\\dfrac{D_v}{S_2}=\\dfrac{3{,}0\\times 10^{-3}}{5{,}0\\times 10^{-4}}=6{,}0\\,\\text{m·s}^{-1}$. *Contrôle* : $\\dfrac{S_1}{S_2}=4$ et $\\dfrac{v_2}{v_1}=\\dfrac{6{,}0}{1{,}5}=4$ ✓.' },
      { n: 'c', text: 'La conduite étant **horizontale**, les deux points sont à la **même altitude** : $z_1=z_2$. Les termes $\\rho gz_1$ et $\\rho gz_2$ sont égaux et se **simplifient** de part et d\'autre : $p_1+\\tfrac{1}{2}\\rho v_1^2=p_2+\\tfrac{1}{2}\\rho v_2^2$.' },
      { n: 'd', text: 'En isolant : $p_1-p_2=\\tfrac{1}{2}\\rho v_2^2-\\tfrac{1}{2}\\rho v_1^2$, soit $p_1-p_2=\\tfrac{1}{2}\\rho\\left(v_2^2-v_1^2\\right)$.' },
      { n: 'e', text: '$p_1-p_2=\\tfrac{1}{2}\\times 1{,}0\\times 10^{3}\\times\\left(6{,}0^2-1{,}5^2\\right)=500\\times(36-2{,}25)=500\\times 33{,}75$, soit $p_1-p_2=1{,}7\\times 10^{4}\\,\\text{Pa}\\approx 0{,}17\\,\\text{bar}$. $p_1-p_2>0$ donc $p_2<p_1$ : la pression **DIMINUE** dans le rétrécissement, alors même que le fluide y est « resserré ».' },
      { n: 'f', text: 'L\'eau monte **plus haut dans le tube 1**, puisque $p_1>p_2$. Dans chaque tube vertical ouvert, la colonne équilibre la pression locale : $p=p_0+\\rho gh$, donc $\\Delta h=\\dfrac{p_1-p_2}{\\rho g}=\\dfrac{1{,}69\\times 10^{4}}{1{,}0\\times 10^{3}\\times 9{,}81}\\approx 1{,}7\\,\\text{m}$. Une différence de niveau de près de deux mètres : l\'effet est spectaculairement visible.' },
      { n: 'g', text: '**Principe du débitmètre** : on mesure la **différence de pression** $p_1-p_2$ (par exemple via la dénivellation $\\Delta h$ des deux colonnes). Les sections $S_1$ et $S_2$ étant connues par construction, on a $v_1=\\dfrac{D_v}{S_1}$ et $v_2=\\dfrac{D_v}{S_2}$. En reportant : $p_1-p_2=\\tfrac{1}{2}\\rho D_v^2\\left(\\dfrac{1}{S_2^2}-\\dfrac{1}{S_1^2}\\right)$, d\'où l\'on tire $D_v$. L\'intérêt est considérable : mesurer un **débit** directement est difficile, alors que mesurer une **hauteur d\'eau** est immédiat. Le Venturi convertit une grandeur malcommode en une grandeur lisible à l\'œil — sans aucune pièce mobile dans l\'écoulement.' },
      { n: 'h', text: '**Non** : Bernoulli suppose un fluide **parfait**, donc **sans viscosité**. L\'eau réelle étant visqueuse, la relation n\'est qu\'**approchée**. **Effet de la viscosité** : les frottements internes **dissipent** une partie de l\'énergie mécanique en chaleur. La somme $p+\\tfrac{1}{2}\\rho v^2+\\rho gz$ **décroît** donc le long de l\'écoulement, au lieu de se conserver. La chute de pression mesurée est ainsi **plus grande** que celle prévue par Bernoulli : une part de $p_1-p_2$ provient de l\'accélération (Venturi), l\'autre des pertes de charge. Appliquer la formule idéale **surestimerait** le débit. En pratique, on corrige par un **coefficient de décharge** déterminé expérimentalement.' },
    ],
    result: '$D_v=3{,}0\\,\\text{L·s}^{-1}$ · $v_2=6{,}0\\,\\text{m·s}^{-1}$ · $p_1-p_2\\approx 1{,}7\\times 10^{4}\\,\\text{Pa}=0{,}17\\,\\text{bar}$ · $\\Delta h\\approx 1{,}7\\,\\text{m}$.',
  },
};
