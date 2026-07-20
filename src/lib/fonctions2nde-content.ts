import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const FONCTIONS2NDE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Avec $f(x)=x^2-2x-3$, l\'image de $0$ par $f$ est…',
    options: [
      { label: 'a', text: '$-3$' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$3$' },
      { label: 'd', text: '$-1$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Avec $f(x)=x^2-2x-3$, les antécédents de $0$ par $f$ sont…',
    options: [
      { label: 'a', text: '$0$ seulement' },
      { label: 'b', text: '$-1$ et $3$' },
      { label: 'c', text: '$-3$ seulement' },
      { label: 'd', text: '$1$ et $-4$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Avec $f(x)=x^2-2x-3$, le minimum de $f$ est…',
    options: [
      { label: 'a', text: '$0$, atteint en $x=1$' },
      { label: 'b', text: '$-3$, atteint en $x=0$' },
      { label: 'c', text: '$-4$, atteint en $x=1$' },
      { label: 'd', text: '$-4$, atteint en $x=-1$' },
    ],
    answer: 'c',
  },
  {
    n: 4,
    text: 'Un nombre, par une fonction, a…',
    options: [
      { label: 'a', text: 'toujours plusieurs images' },
      { label: 'b', text: 'toujours un seul antécédent' },
      { label: 'c', text: 'jamais d\'image' },
      { label: 'd', text: 'toujours une seule image' },
    ],
    answer: 'd',
  },
  {
    n: 5,
    text: 'L\'ensemble de définition de $\\dfrac{1}{x-5}$ est…',
    options: [
      { label: 'a', text: '$\\mathbb{R}$' },
      { label: 'b', text: '$[5\\,;+\\infty[$' },
      { label: 'c', text: '$\\mathbb{R}$ privé de $5$' },
      { label: 'd', text: '$\\{5\\}$' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: 'La fonction $\\sqrt{x-2}$ est définie pour…',
    options: [
      { label: 'a', text: '$x\\geqslant 2$' },
      { label: 'b', text: '$x>2$' },
      { label: 'c', text: '$x\\leqslant 2$' },
      { label: 'd', text: 'tout $x$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'Une fonction croissante…',
    options: [
      { label: 'a', text: 'ne prend que des valeurs positives' },
      { label: 'b', text: 'a une courbe qui descend' },
      { label: 'c', text: 'est forcément affine' },
      { label: 'd', text: 'a une courbe qui monte de gauche à droite' },
    ],
    answer: 'd',
  },
  {
    n: 8,
    text: 'La fonction affine $f(x)=-3x+1$ est…',
    options: [
      { label: 'a', text: 'croissante' },
      { label: 'b', text: 'constante' },
      { label: 'c', text: 'décroissante' },
      { label: 'd', text: 'ni l\'un ni l\'autre' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: 'Le coefficient directeur de la droite passant par $(1\\,;2)$ et $(3\\,;8)$ est…',
    options: [
      { label: 'a', text: '$2$' },
      { label: 'b', text: '$6$' },
      { label: 'c', text: '$4$' },
      { label: 'd', text: '$3$' },
    ],
    answer: 'd',
  },
  {
    n: 10,
    text: 'Sur son graphique, l\'image de $a$ se lit…',
    options: [
      { label: 'a', text: 'sur l\'axe vertical, à la hauteur de la courbe en $x=a$' },
      { label: 'b', text: 'sur l\'axe horizontal' },
      { label: 'c', text: 'à l\'origine' },
      { label: 'd', text: 'n\'importe où' },
    ],
    answer: 'a',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const FONCTIONS2NDE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'fonctions2nde-1',
    context: 'Dans toute la partie A, $f$ est la fonction définie par $f(x)=x^2-2x-3$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer les images de $-2$, $0$ et $3$ par $f$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-2',
    context: 'Vocabulaire : image et antécédent.',
    parts: [{
      questions: [
        { n: 'a', text: 'On sait que $f(-1)=0$. Compléter : « $0$ est l\'… de $-1$ » et « $-1$ est un … de $0$ ».' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-3',
    context: 'Ensemble de définition : le dénominateur ne doit pas s\'annuler.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer l\'ensemble de définition de $f(x)=\\dfrac{1}{x+4}$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-4',
    context: 'Sous une racine carrée, l\'expression doit être $\\geqslant 0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer l\'ensemble de définition de $h(x)=\\sqrt{x+5}$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-5',
    context: 'Fonction affine : $f(x)=ax+b$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $f(x)=3x-6$ : donner le coefficient directeur, l\'ordonnée à l\'origine, et le sens de variation.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-6',
    context: 'Le sens de variation d\'une fonction affine ne dépend que du signe de $a$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $g(x)=-2x+4$ : la fonction est-elle croissante ou décroissante ? Calculer $g(0)$ et résoudre $g(x)=0$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-7',
    context: 'Lecture graphique. La courbe passe par les points $(-3\\,;2)$, $(0\\,;-1)$, $(2\\,;3)$ et $(5\\,;0)$, formée de segments.',
    parts: [{
      questions: [
        { n: 'a', text: 'Lire graphiquement $f(0)$ et $f(2)$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-8',
    context: 'Les antécédents de $0$ se lisent là où la courbe croise l\'axe horizontal.',
    parts: [{
      questions: [
        { n: 'a', text: 'Lire graphiquement les antécédents de $0$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-9',
    context: 'Définition d\'une fonction croissante.',
    parts: [{
      questions: [
        { n: 'a', text: 'Recopier et compléter : « $f$ est croissante sur $I$ si, pour tous $a$ et $b$ de $I$ avec $a<b$, on a $f(a)\\ldots f(b)$. »' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'fonctions2nde-10',
    context: 'Chercher un antécédent, c\'est résoudre une équation.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer par le calcul tous les antécédents de $-3$ par $f$ (résoudre $f(x)=-3$), avec $f(x)=x^2-2x-3$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-11',
    context: 'Un nombre peut avoir plusieurs antécédents.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer tous les antécédents de $5$ par $f$, avec $f(x)=x^2-2x-3$. Combien y en a-t-il ?' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-12',
    context: 'Un quotient peut avoir plusieurs valeurs interdites.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer l\'ensemble de définition de $g(x)=\\dfrac{x+1}{(x-1)(x+2)}$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-13',
    context: 'Racine carrée avec un coefficient devant $x$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer l\'ensemble de définition de $k(x)=\\sqrt{2x-6}$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-14',
    context: 'Taux de variation d\'une fonction affine.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $f(x)=2x-3$, calculer le taux de variation entre $x=1$ et $x=4$. Que retrouve-t-on ?' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-15',
    context: 'Déterminer une fonction affine à partir de deux points.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer la fonction affine $f$ telle que $f(1)=5$ et $f(3)=11$. Détailler le calcul de $a$ puis de $b$.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-16',
    context: 'Lecture graphique (même courbe : $(-3\\,;2)$, $(0\\,;-1)$, $(2\\,;3)$, $(5\\,;0)$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner les intervalles sur lesquels $f$ est croissante, puis décroissante.' },
        { n: 'b', text: 'Dresser le tableau de variation.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-17',
    context: 'Un extremum, ce sont deux informations : la valeur et l\'endroit.',
    parts: [{
      questions: [
        { n: 'a', text: 'La fonction admet-elle un maximum sur $[-3\\,;5]$ ? Si oui, préciser sa valeur et l\'abscisse où il est atteint.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-18',
    context: 'Croissante et positive sont deux notions distinctes.',
    parts: [{
      questions: [
        { n: 'a', text: 'La fonction $f(x)=2x-6$ est-elle croissante ? Prend-elle des valeurs négatives ?' },
        { n: 'b', text: 'Ces deux réponses sont-elles contradictoires ? Expliquer.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-19',
    context: 'Une fonction croissante conserve l\'ordre.',
    parts: [{
      questions: [
        { n: 'a', text: 'On sait que $f$ est croissante sur $\\mathbb{R}$ et que $2<7$. Comparer $f(2)$ et $f(7)$ sans connaître $f$. Justifier.' },
      ],
    }],
  },
  // ── TIER 3 — synthèse ★★★ ──────────────────────────────────────────────────
  {
    id: 'fonctions2nde-20',
    context: 'La forme canonique de $f(x)=x^2-2x-3$ est $f(x)=(x-1)^2-4$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le nombre $-5$ a-t-il un antécédent par $f$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-21',
    context: 'Un élève affirme que $\\dfrac{1}{x^2+1}$ n\'est pas définie en $x=0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'A-t-il raison ? Déterminer l\'ensemble de définition de cette fonction et justifier.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-22',
    context: 'Linéaire, affine : ne pas confondre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Parmi $f(x)=3x$, $g(x)=3x+2$ et $h(x)=5$, lesquelles sont linéaires ? affines ? Laquelle a une courbe passant par l\'origine ? Justifier.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-23',
    context: 'Résoudre graphiquement $f(x)=k$ (même courbe que les exercices de lecture).',
    parts: [{
      questions: [
        { n: 'a', text: 'Sans calcul, indiquer combien de solutions possède l\'équation $f(x)=1$ sur $[-3\\,;5]$. Expliquer la méthode graphique employée.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-24',
    context: 'Le test de la droite verticale.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi un cercle n\'est pas la courbe représentative d\'une fonction. Quel critère graphique permet de le décider ?' },
      ],
    }],
  },
  // ── TIER 4 — problèmes de synthèse ◆ ───────────────────────────────────────
  {
    id: 'fonctions2nde-25',
    context: 'On considère $f(x)=x^2-2x-3$, définie sur $\\mathbb{R}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $f(-2)$, $f(0)$, $f(1)$, $f(2)$ et $f(4)$.' },
        { n: 'b', text: 'Vérifier que $f(x)=(x-1)^2-4$ (développer le membre de droite).' },
        { n: 'c', text: 'En déduire que $f$ admet un minimum. Préciser sa valeur et l\'abscisse où il est atteint.' },
        { n: 'd', text: 'Donner le sens de variation de $f$ sur $]-\\infty\\,;1]$ puis sur $[1\\,;+\\infty[$, et dresser le tableau de variation.' },
        { n: 'e', text: 'Résoudre $f(x)=0$ et interpréter graphiquement les solutions.' },
        { n: 'f', text: 'À l\'aide de la table de valeurs du a, tracer l\'allure de la courbe.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-26',
    context: 'On dispose de $20\\,\\text{m}$ de grillage pour clôturer un enclos rectangulaire. Soit $x$ la largeur en mètres.',
    parts: [{
      questions: [
        { n: 'a', text: 'Justifier que la longueur vaut $10-x$.' },
        { n: 'b', text: 'Exprimer l\'aire $A(x)$ de l\'enclos en fonction de $x$. Pour quelles valeurs de $x$ le problème a-t-il un sens ?' },
        { n: 'c', text: 'Vérifier que $A(x)=-(x-5)^2+25$.' },
        { n: 'd', text: 'En déduire l\'aire maximale et les dimensions correspondantes.' },
        { n: 'e', text: 'Quelle forme particulière a alors l\'enclos ? Commenter.' },
      ],
    }],
  },
  {
    id: 'fonctions2nde-27',
    context: 'Un club de sport propose deux formules. Formule A : $20$ € par mois. Formule B : $8$ € d\'inscription puis $4$ € par séance. Soit $x$ le nombre de séances dans le mois.',
    parts: [{
      questions: [
        { n: 'a', text: 'Exprimer le coût $A(x)$ de la formule A et $B(x)$ de la formule B en fonction de $x$.' },
        { n: 'b', text: 'Ces fonctions sont-elles affines ? Préciser dans chaque cas $a$ et $b$.' },
        { n: 'c', text: 'Résoudre $A(x)=B(x)$. Interpréter le résultat.' },
        { n: 'd', text: 'À partir de combien de séances la formule A devient-elle plus avantageuse ? Justifier.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const FONCTIONS2NDE_CORRECTIONS: Record<string, Correction> = {
  'fonctions2nde-1': {
    steps: [
      { n: '1', text: '$f(-2)=(-2)^2-2\\times(-2)-3=4+4-3=5$.' },
      { n: '2', text: '$f(0)=0-0-3=-3$.' },
      { n: '3', text: '$f(3)=9-6-3=0$.' },
    ],
    result: '$f(-2)=5$ · $f(0)=-3$ · $f(3)=0$.',
  },
  'fonctions2nde-2': {
    steps: [
      { n: '1', text: '« $0$ est l\'**image** de $-1$ » et « $-1$ est un **antécédent** de $0$ ».' },
      { n: '2', text: 'On part de $-1$ (le nombre de départ) pour obtenir $0$ : c\'est donc l\'image. Réciproquement, $-1$ est un antécédent de $0$.' },
    ],
    result: '$0$ = image de $-1$ ; $-1$ = antécédent de $0$.',
  },
  'fonctions2nde-3': {
    steps: [
      { n: '1', text: 'Le dénominateur s\'annule pour $x+4=0$, soit $x=-4$.' },
      { n: '2', text: 'Cette valeur est interdite ; toutes les autres conviennent.' },
    ],
    result: '$D_f=]-\\infty\\,;-4[\\;\\cup\\;]-4\\,;+\\infty[$.',
  },
  'fonctions2nde-4': {
    steps: [
      { n: '1', text: 'Il faut que la quantité sous la racine soit positive ou nulle, soit $x+5\\geqslant 0$, donc $x\\geqslant -5$.' },
      { n: '2', text: 'Le crochet est **fermé** en $-5$, car $\\sqrt{0}=0$ existe.' },
    ],
    result: '$D_h=[-5\\,;+\\infty[$.',
  },
  'fonctions2nde-5': {
    steps: [
      { n: '1', text: '$f(x)=3x-6$ est de la forme $ax+b$ avec $a=3$ et $b=-6$.' },
      { n: '2', text: 'Coefficient directeur : $a=3$. Ordonnée à l\'origine : $b=-6$. Comme $a=3>0$, la fonction est **croissante**.' },
    ],
    result: '$a=3$, $b=-6$, croissante.',
  },
  'fonctions2nde-6': {
    steps: [
      { n: '1', text: '$g(x)=-2x+4$ : $a=-2<0$, donc la fonction est **décroissante**.' },
      { n: '2', text: '$g(0)=-2\\times 0+4=4$.' },
      { n: '3', text: '$g(x)=0$ : $-2x+4=0$, soit $2x=4$, donc $x=2$.' },
    ],
    result: 'décroissante · $g(0)=4$ · $g(x)=0$ en $x=2$.',
  },
  'fonctions2nde-7': {
    steps: [
      { n: '1', text: 'On lit sur le graphique : le point d\'abscisse $0$ a pour ordonnée $-1$, donc $f(0)=-1$.' },
      { n: '2', text: 'Le point d\'abscisse $2$ a pour ordonnée $3$, donc $f(2)=3$.' },
    ],
    result: '$f(0)=-1$ · $f(2)=3$.',
  },
  'fonctions2nde-8': {
    steps: [
      { n: '1', text: 'On cherche les points de la courbe situés sur l\'axe horizontal (ordonnée $0$).' },
      { n: '2', text: 'La courbe croise l\'axe des abscisses en $x=-1$ et en $x=5$.' },
    ],
    result: 'Antécédents de $0$ : $-1$ et $5$.',
  },
  'fonctions2nde-9': {
    steps: [
      { n: '1', text: '« $f$ est croissante sur $I$ si, pour tous $a$ et $b$ de $I$ avec $a<b$, on a $f(a)\\leqslant f(b)$. »' },
      { n: '2', text: 'La fonction **conserve l\'ordre** : si l\'entrée augmente, la sortie augmente (ou reste égale).' },
    ],
    result: '$f(a)\\leqslant f(b)$ — la fonction conserve l\'ordre.',
  },
  'fonctions2nde-10': {
    steps: [
      { n: '1', text: 'On résout $f(x)=-3$, soit $x^2-2x-3=-3$.' },
      { n: '2', text: '$x^2-2x=0$, donc $x(x-2)=0$ : $x=0$ ou $x=2$.' },
      { n: '3', text: '**Vérification** : $f(0)=-3$ ✓ et $f(2)=4-4-3=-3$ ✓.' },
    ],
    result: 'Antécédents de $-3$ : $0$ et $2$.',
  },
  'fonctions2nde-11': {
    steps: [
      { n: '1', text: 'On résout $f(x)=5$, soit $x^2-2x-3=5$, c\'est-à-dire $x^2-2x-8=0$.' },
      { n: '2', text: 'On factorise : $x^2-2x-8=(x-4)(x+2)$, d\'où $x=4$ ou $x=-2$.' },
      { n: '3', text: 'Il y a **deux** antécédents : $4$ et $-2$.' },
    ],
    result: 'Antécédents de $5$ : $-2$ et $4$ — deux.',
  },
  'fonctions2nde-12': {
    steps: [
      { n: '1', text: 'Le dénominateur s\'annule si $x-1=0$ ou $x+2=0$, soit $x=1$ ou $x=-2$.' },
      { n: '2', text: 'Ces **deux** valeurs sont interdites.' },
    ],
    result: '$D_g=\\mathbb{R}\\setminus\\{-2\\,;1\\}$.',
  },
  'fonctions2nde-13': {
    steps: [
      { n: '1', text: 'Il faut $2x-6\\geqslant 0$, soit $2x\\geqslant 6$, donc $x\\geqslant 3$.' },
    ],
    result: '$D_k=[3\\,;+\\infty[$.',
  },
  'fonctions2nde-14': {
    steps: [
      { n: '1', text: 'Taux de variation entre $1$ et $4$ : $\\dfrac{f(4)-f(1)}{4-1}$.' },
      { n: '2', text: '$f(4)=2\\times 4-3=5$ et $f(1)=2\\times 1-3=-1$.' },
      { n: '3', text: '$\\dfrac{5-(-1)}{3}=\\dfrac{6}{3}=2$.' },
      { n: '4', text: 'On retrouve le **coefficient directeur** $a=2$. C\'est normal : pour une fonction affine, le taux de variation est constant et vaut toujours $a$.' },
    ],
    result: 'taux $=2=a$.',
  },
  'fonctions2nde-15': {
    steps: [
      { n: '1', text: '**Calcul de $a$** : $a=\\dfrac{f(3)-f(1)}{3-1}=\\dfrac{11-5}{2}=\\dfrac{6}{2}=3$.' },
      { n: '2', text: '**Calcul de $b$** : on utilise $f(1)=5$, soit $a\\times 1+b=5$, donc $3+b=5$ et $b=2$.' },
      { n: '3', text: '**Vérification** : $f(3)=3\\times 3+2=11$ ✓.' },
    ],
    result: '$f(x)=3x+2$.',
  },
  'fonctions2nde-16': {
    steps: [
      { n: '1', text: 'En parcourant la courbe de gauche à droite : de $-3$ à $0$, elle **descend** : $f$ est décroissante sur $[-3\\,;0]$.' },
      { n: '2', text: 'De $0$ à $2$, elle **monte** : $f$ est croissante sur $[0\\,;2]$.' },
      { n: '3', text: 'De $2$ à $5$, elle **descend** : $f$ est décroissante sur $[2\\,;5]$.' },
      { n: '4', text: 'Tableau de variation : $x$ va de $-3$ à $5$ ; $f(x)$ vaut $2$ en $-3$, descend jusqu\'à $-1$ en $0$, monte jusqu\'à $3$ en $2$, puis descend jusqu\'à $0$ en $5$.' },
    ],
    result: 'Décroissante sur $[-3\\,;0]$ et $[2\\,;5]$ · croissante sur $[0\\,;2]$.',
  },
  'fonctions2nde-17': {
    steps: [
      { n: '1', text: '**Oui**, la fonction admet un maximum sur $[-3\\,;5]$.' },
      { n: '2', text: 'La plus grande valeur atteinte est $3$, au point d\'abscisse $2$.' },
      { n: '3', text: 'Le maximum vaut donc $3$, atteint **en $x=2$**. Il faut préciser les deux : la valeur ET l\'endroit.' },
    ],
    result: 'maximum $=3$, atteint en $x=2$.',
  },
  'fonctions2nde-18': {
    steps: [
      { n: '1', text: '$f(x)=2x-6$ a pour coefficient $a=2>0$ : elle est **croissante**.' },
      { n: '2', text: 'Prend-elle des valeurs négatives ? $f(0)=-6<0$, donc **oui**.' },
      { n: '3', text: '**Ce n\'est pas contradictoire.** « Croissante » décrit le **sens de variation** (la fonction monte), tandis que « négative » décrit le **signe** des valeurs (la courbe est sous l\'axe). Une droite peut très bien monter tout en restant, sur une partie, sous l\'axe des abscisses : elle monte *vers* le positif, en partant du négatif.' },
      { n: '4', text: '$f$ est négative pour $x<3$ et positive pour $x>3$, tout en étant croissante **partout**.' },
    ],
    result: 'Croissante ET négative par endroits : deux notions distinctes, aucune contradiction.',
  },
  'fonctions2nde-19': {
    steps: [
      { n: '1', text: '$f$ est croissante, donc elle **conserve l\'ordre**. Comme $2<7$, on a $f(2)\\leqslant f(7)$.' },
      { n: '2', text: 'On peut l\'affirmer **sans connaître $f$** : c\'est la définition même d\'une fonction croissante qui le garantit.' },
    ],
    result: '$f(2)\\leqslant f(7)$.',
  },
  'fonctions2nde-20': {
    steps: [
      { n: '1', text: '$-5$ **n\'a aucun antécédent**.' },
      { n: '2', text: 'La forme canonique $f(x)=(x-1)^2-4$ montre que $(x-1)^2\\geqslant 0$ pour tout $x$, donc $f(x)\\geqslant -4$.' },
      { n: '3', text: 'La fonction ne descend jamais en dessous de $-4$. Or $-5<-4$ : aucun $x$ ne peut donner $f(x)=-5$.' },
      { n: '4', text: '*Autre formulation* : résoudre $f(x)=-5$ donnerait $(x-1)^2-4=-5$, soit $(x-1)^2=-1$, impossible car un carré n\'est jamais négatif.' },
    ],
    result: '$-5$ n\'a pas d\'antécédent : $f(x)\\geqslant -4$ toujours.',
  },
  'fonctions2nde-21': {
    steps: [
      { n: '1', text: '**L\'élève a tort.** La fonction $\\dfrac{1}{x^2+1}$ est définie en $x=0$, et même partout.' },
      { n: '2', text: '**Justification** : le dénominateur est $x^2+1$. Or $x^2\\geqslant 0$ pour tout $x$, donc $x^2+1\\geqslant 1>0$ : il ne s\'annule **jamais**.' },
      { n: '3', text: 'En particulier en $x=0$ : $0^2+1=1\\neq 0$, et $\\dfrac{1}{1}=1$ existe sans problème. L\'élève a sans doute confondu avec $\\dfrac{1}{x}$, qui, elle, n\'est pas définie en $0$.' },
    ],
    result: '$D=\\mathbb{R}$ : le dénominateur $x^2+1$ ne s\'annule jamais.',
  },
  'fonctions2nde-22': {
    steps: [
      { n: '1', text: '$f(x)=3x$ : de la forme $ax$ avec $a=3$, $b=0$. C\'est une fonction **linéaire** (donc aussi affine). Sa courbe passe par l\'**origine**.' },
      { n: '2', text: '$g(x)=3x+2$ : de la forme $ax+b$ avec $b=2\\neq 0$. C\'est une fonction **affine** mais **pas linéaire**. Sa courbe ne passe pas par l\'origine ($g(0)=2$).' },
      { n: '3', text: '$h(x)=5$ : c\'est $0\\times x+5$, une fonction **affine constante** ($a=0$). Elle n\'est pas linéaire.' },
      { n: '4', text: '**Bilan** : linéaire → $f$ ; affines → $f$, $g$, $h$ (toutes) ; passe par l\'origine → $f$.' },
    ],
    result: '$f$ linéaire · $f$, $g$, $h$ toutes affines · seule $f$ passe par l\'origine.',
  },
  'fonctions2nde-23': {
    steps: [
      { n: '1', text: '**Méthode graphique** : on trace la droite **horizontale** d\'équation $y=1$, et on compte ses points d\'intersection avec la courbe.' },
      { n: '2', text: 'Cette horizontale coupe la courbe : une fois sur le segment montant $[0\\,;2]$, et une fois sur le segment descendant $[2\\,;5]$. Sur le premier segment $[-3\\,;0]$, la courbe va de $2$ à $-1$ et passe donc aussi par $1$ : cela fait une intersection de plus.' },
      { n: '3', text: 'L\'équation $f(x)=1$ a donc **trois solutions** sur $[-3\\,;5]$.' },
      { n: '4', text: '*Principe* : le nombre de solutions de $f(x)=k$ est le nombre de points d\'intersection de $\\mathcal{C}_f$ avec l\'horizontale $y=k$.' },
    ],
    result: '$3$ solutions ($3$ intersections avec la droite $y=1$).',
  },
  'fonctions2nde-24': {
    steps: [
      { n: '1', text: 'Un cercle **n\'est pas** la courbe d\'une fonction.' },
      { n: '2', text: '**Raison** : par définition, un nombre $x$ n\'a qu\'**une seule** image. Or sur un cercle, pour une même abscisse $x$ (entre les deux bords), il existe **deux** points : un en haut, un en bas. Ce $x$ aurait donc deux images — c\'est impossible pour une fonction.' },
      { n: '3', text: '**Critère graphique — le test de la droite verticale** : une courbe est celle d\'une fonction si et seulement si **toute droite verticale** la coupe en **au plus un point**. Une verticale traversant un cercle le coupe en deux points : le test échoue.' },
    ],
    result: 'Non : le test de la droite verticale échoue (deux images pour un même $x$).',
  },
  'fonctions2nde-25': {
    steps: [
      { n: 'a', text: '$f(-2)=5$ · $f(0)=-3$ · $f(1)=1-2-3=-4$ · $f(2)=-3$ · $f(4)=16-8-3=5$.' },
      { n: 'b', text: '$(x-1)^2-4=x^2-2x+1-4=x^2-2x-3=f(x)$ ✓.' },
      { n: 'c', text: '$(x-1)^2\\geqslant 0$ pour tout $x$, donc $f(x)=(x-1)^2-4\\geqslant -4$. L\'égalité a lieu quand $(x-1)^2=0$, soit $x=1$. $f$ admet donc un **minimum** égal à $-4$, atteint en $x=1$.' },
      { n: 'd', text: 'Avant le minimum la fonction décroît, après elle croît : $f$ est **décroissante** sur $]-\\infty\\,;1]$ et **croissante** sur $[1\\,;+\\infty[$. Le tableau de variation porte une flèche descendante jusqu\'à $-4$ en $x=1$, puis une flèche montante.' },
      { n: 'e', text: '$f(x)=0$ : $(x-1)^2-4=0$, soit $(x-1)^2=4$, donc $x-1=2$ ou $x-1=-2$, c\'est-à-dire $x=3$ ou $x=-1$. Graphiquement, ce sont les points où la courbe **croise l\'axe des abscisses**.' },
      { n: 'f', text: 'La table donne les points $(-2\\,;5)$, $(-1\\,;0)$, $(0\\,;-3)$, $(1\\,;-4)$, $(2\\,;-3)$, $(3\\,;0)$, $(4\\,;5)$. En les plaçant, on obtient une **parabole** symétrique par rapport à la droite verticale $x=1$, de sommet $(1\\,;-4)$.' },
    ],
    result: 'min $-4$ en $x=1$ · racines $-1$ et $3$ · parabole de sommet $(1\\,;-4)$.',
  },
  'fonctions2nde-26': {
    steps: [
      { n: 'a', text: 'Le périmètre est $2\\times(\\text{largeur}+\\text{longueur})=20$, donc largeur $+$ longueur $=10$. Si la largeur est $x$, la longueur est $10-x$.' },
      { n: 'b', text: '$A(x)=x(10-x)=10x-x^2$. Le problème a un sens pour $0<x<10$ (largeur et longueur strictement positives).' },
      { n: 'c', text: '$-(x-5)^2+25=-(x^2-10x+25)+25=-x^2+10x-25+25=-x^2+10x=A(x)$ ✓.' },
      { n: 'd', text: '$-(x-5)^2\\leqslant 0$, donc $A(x)\\leqslant 25$, avec égalité quand $(x-5)^2=0$, soit $x=5$. L\'aire **maximale** est $25\\,\\text{m}^2$, atteinte pour une largeur $x=5\\,\\text{m}$ et une longueur $10-5=5\\,\\text{m}$.' },
      { n: 'e', text: 'L\'enclos est alors un **carré** de côté $5\\,\\text{m}$. C\'est un résultat général : à périmètre fixé, c\'est le carré qui a la plus grande aire parmi tous les rectangles.' },
    ],
    result: 'aire max $=25\\,\\text{m}^2$ pour un carré $5\\times 5$.',
  },
  'fonctions2nde-27': {
    steps: [
      { n: 'a', text: 'Formule A : coût fixe, $A(x)=20$. Formule B : $8$ d\'inscription plus $4$ par séance, $B(x)=4x+8$.' },
      { n: 'b', text: '$A(x)=20$ est affine avec $a=0$ et $b=20$ (c\'est une fonction constante). $B(x)=4x+8$ est affine avec $a=4$ et $b=8$.' },
      { n: 'c', text: '$A(x)=B(x)$ : $20=4x+8$, soit $4x=12$, donc $x=3$. **Interprétation** : pour $3$ séances, les deux formules coûtent le même prix, $20$ €.' },
      { n: 'd', text: 'La formule A (fixe à $20$) devient plus avantageuse quand $B(x)>20$, soit $4x+8>20$, c\'est-à-dire $x>3$. À partir de **$4$ séances**, la formule A est plus avantageuse. *Contrôle* : à $4$ séances, $A=20$ et $B=4\\times 4+8=24$ : A est bien moins chère. À $2$ séances, $A=20$ et $B=16$ : B est moins chère. Le basculement se fait bien à $3$ séances.' },
    ],
    result: 'croisement à $3$ séances ($20$ €) · A avantageuse dès $4$ séances.',
  },
};
