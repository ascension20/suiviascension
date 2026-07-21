import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const REPERAGE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le milieu de $[AB]$ avec $A(2\\,;4)$ et $B(6\\,;-2)$ est…',
    options: [
      { label: 'a', text: '$(4\\,;1)$' },
      { label: 'b', text: '$(8\\,;2)$' },
      { label: 'c', text: '$(2\\,;3)$' },
      { label: 'd', text: '$(4\\,;6)$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Les coordonnées du vecteur $\\vec{AB}$ avec $A(1\\,;3)$ et $B(5\\,;-1)$ sont…',
    options: [
      { label: 'a', text: '$(6\\,;2)$' },
      { label: 'b', text: '$(-4\\,;4)$' },
      { label: 'c', text: '$(3\\,;1)$' },
      { label: 'd', text: '$(4\\,;-4)$' },
    ],
    answer: 'd',
  },
  {
    n: 3,
    text: 'La distance entre $A(0\\,;0)$ et $B(3\\,;4)$ vaut…',
    options: [
      { label: 'a', text: '$7$' },
      { label: 'b', text: '$\\sqrt{7}$' },
      { label: 'c', text: '$5$' },
      { label: 'd', text: '$12$' },
    ],
    answer: 'c',
  },
  {
    n: 4,
    text: 'Deux vecteurs $\\vec{u}(x\\,;y)$ et $\\vec{v}(x\'\\,;y\')$ sont colinéaires si…',
    options: [
      { label: 'a', text: '$x+y\'=0$' },
      { label: 'b', text: '$xy\'-yx\'=0$' },
      { label: 'c', text: '$xx\'+yy\'=0$' },
      { label: 'd', text: '$x=x\'$ et $y=y\'$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: '$\\vec{u}(2\\,;6)$ et $\\vec{v}(1\\,;3)$ sont…',
    options: [
      { label: 'a', text: 'colinéaires' },
      { label: 'b', text: 'non colinéaires' },
      { label: 'c', text: 'perpendiculaires' },
      { label: 'd', text: 'de même norme' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: '$\\vec{AB}=\\vec{CD}$ signifie que le quadrilatère suivant est un parallélogramme…',
    options: [
      { label: 'a', text: '$ABCD$' },
      { label: 'b', text: '$ABDC$' },
      { label: 'c', text: '$ACBD$' },
      { label: 'd', text: '$ADBC$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Pour prouver que $A$, $B$, $C$ sont alignés, on montre que…',
    options: [
      { label: 'a', text: '$AB=AC$' },
      { label: 'b', text: '$\\vec{AB}=\\vec{AC}$' },
      { label: 'c', text: '$B$ est le milieu de $[AC]$' },
      { label: 'd', text: '$\\vec{AB}$ et $\\vec{AC}$ sont colinéaires' },
    ],
    answer: 'd',
  },
  {
    n: 8,
    text: '$\\vec{u}(3\\,;-2)$ et $\\vec{v}(-1\\,;4)$ : les coordonnées de $\\vec{u}+\\vec{v}$ sont…',
    options: [
      { label: 'a', text: '$(2\\,;2)$' },
      { label: 'b', text: '$(4\\,;-6)$' },
      { label: 'c', text: '$(2\\,;-6)$' },
      { label: 'd', text: '$(-3\\,;-8)$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'Le vecteur $\\vec{BA}$ est, par rapport à $\\vec{AB}$…',
    options: [
      { label: 'a', text: 'le même vecteur' },
      { label: 'b', text: 'deux fois plus long' },
      { label: 'c', text: 'perpendiculaire' },
      { label: 'd', text: 'le vecteur opposé' },
    ],
    answer: 'd',
  },
  {
    n: 10,
    text: 'La formule de distance $AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$ est valable…',
    options: [
      { label: 'a', text: 'dans tout repère' },
      { label: 'b', text: 'seulement si $A=O$' },
      { label: 'c', text: 'seulement dans un repère orthonormé' },
      { label: 'd', text: 'jamais pour des négatifs' },
    ],
    answer: 'c',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const REPERAGE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'reperage-1',
    context: 'On travaille dans un repère orthonormé. Lecture et placement de points.',
    parts: [{ questions: [{ n: 'a', text: 'Dans un repère, placer les points $A(2\\,;3)$, $B(-3\\,;1)$, $C(0\\,;-2)$ et $D(4\\,;-1)$.' }] }],
  },
  {
    id: 'reperage-2',
    context: 'Milieu de $[AB]$ : $\\left(\\dfrac{x_A+x_B}{2}\\,;\\dfrac{y_A+y_B}{2}\\right)$.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer les coordonnées du milieu de $[AB]$ pour $A(-2\\,;4)$ et $B(6\\,;2)$.' }] }],
  },
  {
    id: 'reperage-3',
    context: 'La moyenne des abscisses, la moyenne des ordonnées.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer le milieu de $[AB]$ pour $A(1\\,;3)$, $B(5\\,;-1)$, puis pour $A(-3\\,;-2)$, $B(3\\,;4)$.' }] }],
  },
  {
    id: 'reperage-4',
    context: 'Vecteur : $\\vec{AB}\\,(x_B-x_A\\,;y_B-y_A)$.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer les coordonnées du vecteur $\\vec{AB}$ pour $A(-1\\,;2)$ et $B(3\\,;5)$.' }] }],
  },
  {
    id: 'reperage-5',
    context: 'Distance : $AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}$.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer la distance entre $A(1\\,;2)$ et $B(4\\,;6)$.' }] }],
  },
  {
    id: 'reperage-6',
    context: 'Test de colinéarité par le déterminant : $\\vec{u}(x\\,;y)$, $\\vec{v}(x\'\\,;y\')$ colinéaires $\\iff xy\'-yx\'=0$.',
    parts: [{ questions: [{ n: 'a', text: 'Les vecteurs $\\vec{u}(3\\,;6)$ et $\\vec{v}(1\\,;2)$ sont-ils colinéaires ? Justifier par le déterminant.' }] }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'reperage-7',
    context: 'Utiliser la formule du milieu « à l\'envers » pour retrouver une extrémité.',
    parts: [{ questions: [{ n: 'a', text: '$M(2\\,;1)$ est le milieu de $[AB]$, et $A(-1\\,;4)$. Déterminer les coordonnées de $B$.' }] }],
  },
  {
    id: 'reperage-8',
    context: 'Deux distances à calculer.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer $CD$ pour $C(-1\\,;0)$ et $D(2\\,;4)$, puis $EF$ pour $E(0\\,;0)$ et $F(5\\,;12)$.' }] }],
  },
  {
    id: 'reperage-9',
    context: 'Un triangle est isocèle en $A$ si $AB=AD$.',
    parts: [{ questions: [{ n: 'a', text: 'On donne $A(1\\,;2)$, $B(4\\,;6)$ et $D(-3\\,;5)$. Calculer $AB$ et $AD$. Le triangle $ABD$ est-il isocèle en $A$ ?' }] }],
  },
  {
    id: 'reperage-10',
    context: 'Coordonnées de plusieurs vecteurs, dont un partant de l\'origine.',
    parts: [{ questions: [{ n: 'a', text: 'Calculer les coordonnées de $\\vec{CD}$ pour $C(4\\,;-1)$, $D(4\\,;3)$, et de $\\vec{OE}$ pour $O(0\\,;0)$, $E(-2\\,;-3)$.' }] }],
  },
  {
    id: 'reperage-11',
    context: 'Opérations sur les coordonnées : $\\vec{u}+\\vec{v}$, $\\vec{u}-\\vec{v}$, $k\\vec{u}$.',
    parts: [{ questions: [{ n: 'a', text: 'Soit $\\vec{u}(3\\,;-2)$ et $\\vec{v}(1\\,;5)$. Calculer les coordonnées de $\\vec{u}+\\vec{v}$, $\\vec{u}-\\vec{v}$ et $2\\vec{u}+\\vec{v}$.' }] }],
  },
  {
    id: 'reperage-12',
    context: 'Deux vecteurs sont égaux ssi ils ont les mêmes coordonnées.',
    parts: [{ questions: [{ n: 'a', text: 'On donne $A(1\\,;1)$, $B(4\\,;3)$, $C(0\\,;2)$. Déterminer $D$ tel que $\\vec{AB}=\\vec{CD}$.' }] }],
  },
  {
    id: 'reperage-13',
    context: 'Colinéarité par le déterminant.',
    parts: [{ questions: [{ n: 'a', text: 'Les vecteurs $\\vec{u}(2\\,;5)$ et $\\vec{v}(4\\,;9)$ sont-ils colinéaires ? Puis $\\vec{u}(-1\\,;3)$ et $\\vec{v}(2\\,;-6)$ ? Justifier.' }] }],
  },
  {
    id: 'reperage-14',
    context: 'Trois points sont alignés si $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires.',
    parts: [{ questions: [{ n: 'a', text: 'Les points $A(-1\\,;-1)$, $B(1\\,;2)$ et $C(3\\,;5)$ sont-ils alignés ? Justifier avec les vecteurs $\\vec{AB}$ et $\\vec{AC}$.' }] }],
  },
  {
    id: 'reperage-15',
    context: 'Deux droites sont parallèles si des vecteurs directeurs sont colinéaires.',
    parts: [{ questions: [{ n: 'a', text: 'On donne $A(0\\,;1)$, $B(2\\,;5)$, $C(1\\,;0)$, $D(4\\,;6)$. Les droites $(AB)$ et $(CD)$ sont-elles parallèles ?' }] }],
  },
  {
    id: 'reperage-16',
    context: 'Trouver le quatrième sommet d\'un parallélogramme : $\\vec{AB}=\\vec{DC}$.',
    parts: [{ questions: [{ n: 'a', text: '$A(-2\\,;1)$, $B(4\\,;3)$, $C(1\\,;-2)$. Déterminer $D$ pour que $ABCD$ soit un parallélogramme.' }] }],
  },
  {
    id: 'reperage-17',
    context: 'Un parallélogramme se caractérise aussi par des diagonales de même milieu.',
    parts: [{ questions: [{ n: 'a', text: 'Vérifier que le quadrilatère de l\'exercice précédent ($A(-2\\,;1)$, $B(4\\,;3)$, $C(1\\,;-2)$, $D(-5\\,;-4)$) est bien un parallélogramme en montrant que les diagonales $[AC]$ et $[BD]$ ont le même milieu.' }] }],
  },
  // ── TIER 3 — synthèse ★★★ ──────────────────────────────────────────────────
  {
    id: 'reperage-18',
    context: 'Relation de Chasles : $\\vec{AB}+\\vec{BC}=\\vec{AC}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'En utilisant la relation de Chasles, simplifier $\\vec{AB}+\\vec{BC}+\\vec{CD}$.' },
        { n: 'b', text: 'Simplifier $\\vec{AB}-\\vec{AC}$ (indication : $\\vec{AB}-\\vec{AC}=\\vec{AB}+\\vec{CA}=\\vec{CB}$).' },
      ],
    }],
  },
  {
    id: 'reperage-19',
    context: 'Déterminer un paramètre pour que deux vecteurs soient colinéaires.',
    parts: [{ questions: [{ n: 'a', text: 'Déterminer le nombre $m$ pour que $\\vec{u}(2\\,;m)$ et $\\vec{v}(3\\,;6)$ soient colinéaires.' }] }],
  },
  {
    id: 'reperage-20',
    context: 'Déterminer la nature d\'un triangle à partir des longueurs de ses côtés.',
    parts: [{ questions: [{ n: 'a', text: 'Soit $A(0\\,;0)$, $B(4\\,;0)$, $C(0\\,;3)$. Calculer les trois côtés et déterminer la nature du triangle $ABC$.' }] }],
  },
  // ── TIER 4 — problèmes de synthèse ◆ ───────────────────────────────────────
  {
    id: 'reperage-21',
    context: 'Dans un repère orthonormé, on considère $A(1\\,;1)$, $B(5\\,;2)$ et $C(6\\,;5)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les coordonnées du vecteur $\\vec{AB}$.' },
        { n: 'b', text: 'Déterminer les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme.' },
        { n: 'c', text: 'Calculer les coordonnées des milieux des diagonales $[AC]$ et $[BD]$. Que constate-t-on ? Conclure.' },
      ],
    }],
  },
  {
    id: 'reperage-22',
    context: 'On donne $A(4\\,;3)$, $B(1\\,;1)$ et $C(-1\\,;4)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les longueurs $BA$, $BC$ et $AC$ (on pourra travailler avec leurs carrés).' },
        { n: 'b', text: 'Que peut-on dire des longueurs $BA$ et $BC$ ? Qu\'en déduit-on sur le triangle ?' },
        { n: 'c', text: 'Vérifier que $BA^2+BC^2=AC^2$. En utilisant la réciproque du théorème de Pythagore, préciser la nature exacte du triangle $ABC$.' },
      ],
    }],
  },
  {
    id: 'reperage-23',
    context: 'Soit $A(-1\\,;-1)$, $B(1\\,;2)$ et $C(3\\,;5)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les coordonnées de $\\vec{AB}$ et $\\vec{AC}$.' },
        { n: 'b', text: 'Calculer le déterminant de $\\vec{AB}$ et $\\vec{AC}$.' },
        { n: 'c', text: 'Les points $A$, $B$, $C$ sont-ils alignés ? Justifier.' },
        { n: 'd', text: 'Déterminer les coordonnées du point $E$ tel que $B$ soit le milieu de $[AE]$. Le point $E$ est-il aussi sur la droite $(AC)$ ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const REPERAGE_CORRECTIONS: Record<string, Correction> = {
  'reperage-1': {
    steps: [
      { n: '1', text: 'Placement direct : $A(2\\,;3)$ ($2$ à droite, $3$ en haut), $B(-3\\,;1)$ ($3$ à gauche, $1$ en haut).' },
      { n: '2', text: '$C(0\\,;-2)$ (sur l\'axe des ordonnées, $2$ en bas), $D(4\\,;-1)$ ($4$ à droite, $1$ en bas).' },
    ],
    result: 'Quatre points placés · $C$ est sur l\'axe des ordonnées.',
  },
  'reperage-2': {
    steps: [
      { n: '1', text: 'Milieu de $[AB]$ : $\\left(\\dfrac{-2+6}{2}\\,;\\dfrac{4+2}{2}\\right)=\\left(\\dfrac{4}{2}\\,;\\dfrac{6}{2}\\right)$.' },
      { n: '2', text: '$=(2\\,;3)$.' },
    ],
    result: '$(2\\,;3)$.',
  },
  'reperage-3': {
    steps: [
      { n: '1', text: '$\\left(\\dfrac{1+5}{2}\\,;\\dfrac{3+(-1)}{2}\\right)=(3\\,;1)$.' },
      { n: '2', text: '$\\left(\\dfrac{-3+3}{2}\\,;\\dfrac{-2+4}{2}\\right)=(0\\,;1)$.' },
    ],
    result: '$(3\\,;1)$ et $(0\\,;1)$.',
  },
  'reperage-4': {
    steps: [
      { n: '1', text: '$\\vec{AB}\\,(x_B-x_A\\,;y_B-y_A)=(3-(-1)\\,;5-2)$.' },
      { n: '2', text: '$=(4\\,;3)$.' },
    ],
    result: '$\\vec{AB}\\,(4\\,;3)$.',
  },
  'reperage-5': {
    steps: [
      { n: '1', text: '$AB=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5$.' },
      { n: '2', text: 'On reconnaît le triangle $3$-$4$-$5$.' },
    ],
    result: '$AB=5$.',
  },
  'reperage-6': {
    steps: [
      { n: '1', text: 'Déterminant : $3\\times 2-6\\times 1=6-6=0$.' },
      { n: '2', text: 'Le déterminant est nul, donc $\\vec{u}$ et $\\vec{v}$ sont **colinéaires** (ici $\\vec{u}=3\\vec{v}$).' },
    ],
    result: '$\\det=0$ : colinéaires.',
  },
  'reperage-7': {
    steps: [
      { n: '1', text: '$M$ est le milieu de $[AB]$, donc $x_M=\\dfrac{x_A+x_B}{2}$. On isole $x_B$ : $x_B=2x_M-x_A$.' },
      { n: '2', text: '$x_B=2\\times 2-(-1)=5$ et $y_B=2\\times 1-4=-2$.' },
    ],
    result: '$B(5\\,;-2)$.',
  },
  'reperage-8': {
    steps: [
      { n: '1', text: '$CD=\\sqrt{(2-(-1))^2+(4-0)^2}=\\sqrt{9+16}=\\sqrt{25}=5$.' },
      { n: '2', text: '$EF=\\sqrt{(5-0)^2+(12-0)^2}=\\sqrt{25+144}=\\sqrt{169}=13$. C\'est le triangle $5$-$12$-$13$, un autre triplet pythagoricien.' },
    ],
    result: '$CD=5$ · $EF=13$.',
  },
  'reperage-9': {
    steps: [
      { n: '1', text: '$AB=\\sqrt{(4-1)^2+(6-2)^2}=\\sqrt{9+16}=\\sqrt{25}=5$.' },
      { n: '2', text: '$AD=\\sqrt{(-3-1)^2+(5-2)^2}=\\sqrt{16+9}=\\sqrt{25}=5$.' },
      { n: '3', text: 'Comme $AB=AD=5$, le triangle $ABD$ est **isocèle en $A$**.' },
    ],
    result: '$AB=AD=5$ : isocèle en $A$.',
  },
  'reperage-10': {
    steps: [
      { n: '1', text: '$\\vec{CD}\\,(4-4\\,;3-(-1))=(0\\,;4)$ — vecteur vertical.' },
      { n: '2', text: '$\\vec{OE}\\,(-2-0\\,;-3-0)=(-2\\,;-3)$ — les coordonnées d\'un vecteur partant de l\'origine sont celles du point d\'arrivée.' },
    ],
    result: '$\\vec{CD}\\,(0\\,;4)$ · $\\vec{OE}\\,(-2\\,;-3)$.',
  },
  'reperage-11': {
    steps: [
      { n: '1', text: '$\\vec{u}+\\vec{v}=(3+1\\,;-2+5)=(4\\,;3)$.' },
      { n: '2', text: '$\\vec{u}-\\vec{v}=(3-1\\,;-2-5)=(2\\,;-7)$.' },
      { n: '3', text: '$2\\vec{u}+\\vec{v}=(2\\times 3+1\\,;2\\times(-2)+5)=(7\\,;1)$.' },
    ],
    result: '$(4\\,;3)$ · $(2\\,;-7)$ · $(7\\,;1)$.',
  },
  'reperage-12': {
    steps: [
      { n: '1', text: '$\\vec{AB}\\,(4-1\\,;3-1)=(3\\,;2)$. On veut $D$ tel que $\\vec{CD}=\\vec{AB}$, donc $\\vec{CD}\\,(x_D-0\\,;y_D-2)=(3\\,;2)$.' },
      { n: '2', text: 'D\'où $x_D=3$ et $y_D-2=2\\Rightarrow y_D=4$.' },
    ],
    result: '$D(3\\,;4)$.',
  },
  'reperage-13': {
    steps: [
      { n: '1', text: '$\\vec{u}(2\\,;5)$, $\\vec{v}(4\\,;9)$ : $2\\times 9-5\\times 4=18-20=-2\\neq 0$ → **non colinéaires**.' },
      { n: '2', text: '$\\vec{u}(-1\\,;3)$, $\\vec{v}(2\\,;-6)$ : $(-1)\\times(-6)-3\\times 2=6-6=0$ → **colinéaires**.' },
    ],
    result: 'non colinéaires · colinéaires.',
  },
  'reperage-14': {
    steps: [
      { n: '1', text: '$\\vec{AB}\\,(1-(-1)\\,;2-(-1))=(2\\,;3)$ et $\\vec{AC}\\,(3-(-1)\\,;5-(-1))=(4\\,;6)$.' },
      { n: '2', text: 'Déterminant : $2\\times 6-3\\times 4=12-12=0$. Les vecteurs sont colinéaires, donc $A$, $B$, $C$ sont **alignés**.' },
    ],
    result: '$\\det=0$ : $A$, $B$, $C$ alignés.',
  },
  'reperage-15': {
    steps: [
      { n: '1', text: '$\\vec{AB}\\,(2\\,;4)$ et $\\vec{CD}\\,(3\\,;6)$. Déterminant : $2\\times 6-4\\times 3=12-12=0$.' },
      { n: '2', text: 'Les vecteurs sont colinéaires, donc les droites $(AB)$ et $(CD)$ sont **parallèles**.' },
    ],
    result: '$\\det=0$ : $(AB)\\parallel(CD)$.',
  },
  'reperage-16': {
    steps: [
      { n: '1', text: 'Pour que $ABCD$ soit un parallélogramme, on écrit $\\vec{AB}=\\vec{DC}$. $\\vec{AB}\\,(6\\,;2)$.' },
      { n: '2', text: '$\\vec{DC}\\,(1-x_D\\,;-2-y_D)=(6\\,;2)$ donne $1-x_D=6\\Rightarrow x_D=-5$ et $-2-y_D=2\\Rightarrow y_D=-4$.' },
    ],
    result: '$D(-5\\,;-4)$.',
  },
  'reperage-17': {
    steps: [
      { n: '1', text: 'Milieu de $[AC]$ : $\\left(\\dfrac{-2+1}{2}\\,;\\dfrac{1+(-2)}{2}\\right)=\\left(-\\dfrac{1}{2}\\,;-\\dfrac{1}{2}\\right)$.' },
      { n: '2', text: 'Milieu de $[BD]$ : $\\left(\\dfrac{4+(-5)}{2}\\,;\\dfrac{3+(-4)}{2}\\right)=\\left(-\\dfrac{1}{2}\\,;-\\dfrac{1}{2}\\right)$.' },
      { n: '3', text: 'Les diagonales ont le **même milieu** : c\'est bien un parallélogramme.' },
    ],
    result: 'Milieux $\\left(-\\tfrac{1}{2}\\,;-\\tfrac{1}{2}\\right)$ identiques : parallélogramme confirmé.',
  },
  'reperage-18': {
    steps: [
      { n: 'a', text: '$\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AC}+\\vec{CD}=\\vec{AD}$ (Chasles appliqué deux fois).' },
      { n: 'b', text: '$\\vec{AB}-\\vec{AC}=\\vec{AB}+\\vec{CA}=\\vec{CA}+\\vec{AB}=\\vec{CB}$.' },
    ],
    result: '$\\vec{AB}+\\vec{BC}+\\vec{CD}=\\vec{AD}$ · $\\vec{AB}-\\vec{AC}=\\vec{CB}$.',
  },
  'reperage-19': {
    steps: [
      { n: '1', text: '$\\vec{u}(2\\,;m)$ et $\\vec{v}(3\\,;6)$ colinéaires $\\iff$ déterminant nul : $2\\times 6-m\\times 3=0$.' },
      { n: '2', text: 'Soit $12-3m=0$, donc $m=4$.' },
    ],
    result: '$m=4$.',
  },
  'reperage-20': {
    steps: [
      { n: '1', text: '$AB=\\sqrt{(4-0)^2+0^2}=4$. $AC=\\sqrt{0^2+3^2}=3$. $BC=\\sqrt{(0-4)^2+(3-0)^2}=\\sqrt{16+9}=\\sqrt{25}=5$.' },
      { n: '2', text: 'On teste Pythagore : $AB^2+AC^2=16+9=25=BC^2$. D\'après la réciproque de Pythagore, le triangle est **rectangle en $A$**.' },
    ],
    result: 'Côtés $3$, $4$, $5$ : triangle rectangle en $A$.',
  },
  'reperage-21': {
    steps: [
      { n: 'a', text: '$\\vec{AB}\\,(5-1\\,;2-1)=(4\\,;1)$.' },
      { n: 'b', text: 'Pour $ABCD$ parallélogramme, $\\vec{AB}=\\vec{DC}$. $\\vec{DC}\\,(6-x_D\\,;5-y_D)=(4\\,;1)$ donne $x_D=2$ et $y_D=4$. Donc $D(2\\,;4)$.' },
      { n: 'c', text: 'Milieu de $[AC]$ : $\\left(\\dfrac{1+6}{2}\\,;\\dfrac{1+5}{2}\\right)=\\left(\\dfrac{7}{2}\\,;3\\right)$. Milieu de $[BD]$ : $\\left(\\dfrac{5+2}{2}\\,;\\dfrac{2+4}{2}\\right)=\\left(\\dfrac{7}{2}\\,;3\\right)$. Les diagonales ont le même milieu $\\left(\\dfrac{7}{2}\\,;3\\right)$, ce qui **confirme** que $ABCD$ est un parallélogramme.' },
    ],
    result: '$\\vec{AB}(4\\,;1)$ · $D(2\\,;4)$ · milieux $\\left(\\tfrac{7}{2}\\,;3\\right)$ identiques.',
  },
  'reperage-22': {
    steps: [
      { n: 'a', text: '$BA^2=(4-1)^2+(3-1)^2=9+4=13$. $BC^2=(-1-1)^2+(4-1)^2=4+9=13$. $AC^2=(-1-4)^2+(4-3)^2=25+1=26$. Donc $BA=BC=\\sqrt{13}$ et $AC=\\sqrt{26}$.' },
      { n: 'b', text: '$BA=BC$ : le triangle est **isocèle en $B$**.' },
      { n: 'c', text: '$BA^2+BC^2=13+13=26=AC^2$. D\'après la **réciproque du théorème de Pythagore**, le triangle est **rectangle en $B$**. En combinant : c\'est un triangle **rectangle isocèle en $B$**.' },
    ],
    result: '$BA=BC=\\sqrt{13}$, $AC=\\sqrt{26}$ · rectangle isocèle en $B$.',
  },
  'reperage-23': {
    steps: [
      { n: 'a', text: '$\\vec{AB}\\,(1-(-1)\\,;2-(-1))=(2\\,;3)$ et $\\vec{AC}\\,(3-(-1)\\,;5-(-1))=(4\\,;6)$.' },
      { n: 'b', text: 'Déterminant : $2\\times 6-3\\times 4=12-12=0$.' },
      { n: 'c', text: 'Le déterminant est nul, donc $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires : les points $A$, $B$, $C$ sont **alignés**.' },
      { n: 'd', text: '$B$ milieu de $[AE]$ signifie $E=2B-A$ coordonnée par coordonnée : $x_E=2\\times 1-(-1)=3$, $y_E=2\\times 2-(-1)=5$, donc $E(3\\,;5)$. On remarque que $E(3\\,;5)=C$ : le point $E$ **coïncide avec $C$**, il est donc sur la droite $(AC)$. C\'est cohérent, puisque $A$, $B$, $C$ sont alignés et que $B$ est « au milieu ».' },
    ],
    result: '$\\vec{AB}(2\\,;3)$, $\\vec{AC}(4\\,;6)$ · $\\det=0$ : alignés · $E(3\\,;5)=C$.',
  },
};
