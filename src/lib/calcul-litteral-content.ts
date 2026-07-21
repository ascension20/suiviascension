import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const CALCULLITTERAL_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Développer $(x+2)(x+5)$ donne…',
    options: [
      { label: 'a', text: '$x^2+10$' },
      { label: 'b', text: '$x^2+7x+10$' },
      { label: 'c', text: '$x^2+7x$' },
      { label: 'd', text: '$2x+7$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: '$(a+b)^2$ est égal à…',
    options: [
      { label: 'a', text: '$a^2+b^2$' },
      { label: 'b', text: '$a^2-2ab+b^2$' },
      { label: 'c', text: '$a^2+ab+b^2$' },
      { label: 'd', text: '$a^2+2ab+b^2$' },
    ],
    answer: 'd',
  },
  {
    n: 3,
    text: '$(3x)^2$ est égal à…',
    options: [
      { label: 'a', text: '$9x^2$' },
      { label: 'b', text: '$3x^2$' },
      { label: 'c', text: '$6x^2$' },
      { label: 'd', text: '$9x$' },
    ],
    answer: 'a',
  },
  {
    n: 4,
    text: 'Factoriser $x^2-36$ donne…',
    options: [
      { label: 'a', text: '$(x-6)^2$' },
      { label: 'b', text: '$(x+6)^2$' },
      { label: 'c', text: '$(x+6)(x-6)$' },
      { label: 'd', text: 'impossible' },
    ],
    answer: 'c',
  },
  {
    n: 5,
    text: 'L\'expression $x^2+16$…',
    options: [
      { label: 'a', text: 'se factorise en $(x+4)(x-4)$' },
      { label: 'b', text: 'se factorise en $(x+4)^2$' },
      { label: 'c', text: 'ne se factorise pas' },
      { label: 'd', text: 'est toujours nulle' },
    ],
    answer: 'c',
  },
  {
    n: 6,
    text: '$3x-(x-5)$ est égal à…',
    options: [
      { label: 'a', text: '$2x-5$' },
      { label: 'b', text: '$4x-5$' },
      { label: 'c', text: '$2x+5$' },
      { label: 'd', text: '$4x+5$' },
    ],
    answer: 'c',
  },
  {
    n: 7,
    text: 'L\'équation $(x-3)(x+8)=0$ a pour solutions…',
    options: [
      { label: 'a', text: '$3$ et $8$' },
      { label: 'b', text: '$-3$ et $8$' },
      { label: 'c', text: '$-3$ et $-8$' },
      { label: 'd', text: '$3$ et $-8$' },
    ],
    answer: 'd',
  },
  {
    n: 8,
    text: 'Si $A\\times B=12$, alors…',
    options: [
      { label: 'a', text: '$A=12$ ou $B=12$' },
      { label: 'b', text: 'on ne peut rien conclure directement' },
      { label: 'c', text: '$A=0$ ou $B=0$' },
      { label: 'd', text: '$A=B=6$' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'En divisant les deux membres de $-2x>6$ par $-2$, on obtient…',
    options: [
      { label: 'a', text: '$x>-3$' },
      { label: 'b', text: '$x<-3$' },
      { label: 'c', text: '$x>3$' },
      { label: 'd', text: '$x<3$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Pour $\\dfrac{x-4}{x-1}=0$, la valeur interdite est…',
    options: [
      { label: 'a', text: '$4$' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$-1$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'd',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const CALCULLITTERAL_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'calcul-litteral-1',
    context: 'Distributivité simple : $k(a+b)=ka+kb$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer et réduire : $3(2x-5)$.' }] }],
  },
  {
    id: 'calcul-litteral-2',
    context: 'Double distributivité : $(a+b)(c+d)=ac+ad+bc+bd$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer et réduire : $(x+3)(x+7)$.' }] }],
  },
  {
    id: 'calcul-litteral-3',
    context: 'Carré d\'une somme : $(a+b)^2=a^2+2ab+b^2$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer : $(x+5)^2$.' }] }],
  },
  {
    id: 'calcul-litteral-4',
    context: 'Carré d\'une différence : $(a-b)^2=a^2-2ab+b^2$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer : $(x-6)^2$.' }] }],
  },
  {
    id: 'calcul-litteral-5',
    context: 'Facteur commun.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser : $5x^2+15x$.' }] }],
  },
  {
    id: 'calcul-litteral-6',
    context: 'Différence de carrés : $a^2-b^2=(a+b)(a-b)$.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser : $x^2-49$.' }] }],
  },
  {
    id: 'calcul-litteral-7',
    context: 'Équation du premier degré.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $4x-16=0$.' }] }],
  },
  {
    id: 'calcul-litteral-8',
    context: 'Équation avec parenthèses.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $5(x+2)=2x+4$. Vérifier la solution.' }] }],
  },
  {
    id: 'calcul-litteral-9',
    context: 'Inéquation du premier degré ; donner la solution sous forme d\'intervalle.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre $2x-8>0$ et donner la solution sous forme d\'intervalle.' }] }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'calcul-litteral-10',
    context: 'Double distributivité, avec des signes.',
    parts: [{ questions: [{ n: 'a', text: 'Développer et réduire : $(2x-1)(3x+4)$.' }] }],
  },
  {
    id: 'calcul-litteral-11',
    context: 'Attention aux signes dans les produits.',
    parts: [{ questions: [{ n: 'a', text: 'Développer et réduire : $(5x+2)(x-3)$.' }] }],
  },
  {
    id: 'calcul-litteral-12',
    context: 'Un signe $-$ devant une parenthèse change tous les signes.',
    parts: [{ questions: [{ n: 'a', text: 'Développer et réduire : $4x-(3x-8)$. Détailler soigneusement le traitement du signe $-$.' }] }],
  },
  {
    id: 'calcul-litteral-13',
    context: 'Le carré porte sur le coefficient et sur $x$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer : $(2x+3)^2$ puis $(3x-2)^2$. Bien identifier $a$ et $b$ dans chaque cas.' }] }],
  },
  {
    id: 'calcul-litteral-14',
    context: 'Somme × différence : $(a+b)(a-b)=a^2-b^2$.',
    parts: [{ questions: [{ n: 'a', text: 'Développer : $(x+7)(x-7)$ puis $(4x+1)(4x-1)$.' }] }],
  },
  {
    id: 'calcul-litteral-15',
    context: 'L\'erreur classique sur $(a+b)^2$.',
    parts: [{ questions: [{ n: 'a', text: 'Un élève écrit $(x+3)^2=x^2+9$. Cette égalité est-elle vraie ? La tester avec $x=1$, puis corriger.' }] }],
  },
  {
    id: 'calcul-litteral-16',
    context: 'Carré parfait : identifier $a$, $b$ et contrôler le terme du milieu $2ab$.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser : $x^2+10x+25$ puis $x^2-4x+4$. Vérifier à chaque fois que le terme du milieu vaut bien $2ab$.' }] }],
  },
  {
    id: 'calcul-litteral-17',
    context: 'Différence de carrés avec un coefficient.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser : $9x^2-16$.' }] }],
  },
  {
    id: 'calcul-litteral-18',
    context: 'Le facteur commun peut être une parenthèse entière.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser : $(x-2)(x+5)+(x-2)\\times 4$.' }] }],
  },
  {
    id: 'calcul-litteral-19',
    context: 'Équation avec l\'inconnue des deux côtés.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $3(x-1)=x+7$. Vérifier la solution.' }] }],
  },
  {
    id: 'calcul-litteral-20',
    context: 'Équation produit nul : un produit est nul ssi l\'un des facteurs est nul.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $(3x-9)(x+2)=0$.' }] }],
  },
  {
    id: 'calcul-litteral-21',
    context: 'Il faut d\'abord factoriser (ne pas prendre la racine des deux côtés).',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $x^2=25$. Combien y a-t-il de solutions ? Détailler la méthode.' }] }],
  },
  {
    id: 'calcul-litteral-22',
    context: 'Le changement de sens dans une inéquation.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre $-3x+6>0$. Expliquer précisément à quelle étape le sens de l\'inégalité change, et pourquoi.' }] }],
  },
  {
    id: 'calcul-litteral-23',
    context: 'Inéquation large : soigner les crochets.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre $4-x\\leqslant 0$. Donner la solution sous forme d\'intervalle, en soignant les crochets.' }] }],
  },
  // ── TIER 3 — synthèse ★★★ ──────────────────────────────────────────────────
  {
    id: 'calcul-litteral-24',
    context: 'La double distributivité, c\'est le calcul de l\'aire d\'un rectangle.',
    parts: [{ questions: [{ n: 'a', text: 'Expliquer, en s\'appuyant sur l\'aire d\'un rectangle, pourquoi $(a+b)(c+d)=ac+ad+bc+bd$. Un schéma est attendu.' }] }],
  },
  {
    id: 'calcul-litteral-25',
    context: 'Les identités remarquables servent aussi au calcul mental.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $101^2$ sans calculatrice (indication : $101=100+1$).' },
        { n: 'b', text: 'Calculer $99^2$.' },
        { n: 'c', text: 'Calculer $103\\times 97$.' },
      ],
    }],
  },
  {
    id: 'calcul-litteral-26',
    context: 'Somme de deux carrés vs différence.',
    parts: [{
      questions: [
        { n: 'a', text: 'Peut-on factoriser $x^2+9$ ? Justifier.' },
        { n: 'b', text: 'Comparer avec $x^2-9$.' },
      ],
    }],
  },
  {
    id: 'calcul-litteral-27',
    context: 'Factorisation en deux étapes : d\'abord le facteur commun.',
    parts: [{ questions: [{ n: 'a', text: 'Factoriser complètement : $2x^2-18$. (indication : commencer par un facteur commun)' }] }],
  },
  {
    id: 'calcul-litteral-28',
    context: 'Équation quotient : commencer par la valeur interdite.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre : $\\dfrac{3x-12}{x+2}=0$. Commencer impérativement par déterminer la valeur interdite.' }] }],
  },
  {
    id: 'calcul-litteral-29',
    context: 'Le théorème du produit nul ne vaut que pour $0$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un élève veut résoudre $(x-1)(x-2)=6$ en écrivant « $x-1=6$ ou $x-2=6$ ». Expliquer pourquoi ce raisonnement est faux.' },
        { n: 'b', text: 'Que faudrait-il faire à la place ?' },
      ],
    }],
  },
  {
    id: 'calcul-litteral-30',
    context: 'Tableau de signes : à l\'aide d\'un tableau, on étudie le signe d\'un produit.',
    parts: [{ questions: [{ n: 'a', text: 'À l\'aide d\'un tableau de signes, résoudre $(x-1)(x+4)>0$.' }] }],
  },
  {
    id: 'calcul-litteral-31',
    context: 'Un seul tableau de signes répond à toutes les questions.',
    parts: [{ questions: [{ n: 'a', text: 'À partir du tableau de l\'exercice précédent, donner la solution de $(x-1)(x+4)<0$. Que remarque-t-on ?' }] }],
  },
  {
    id: 'calcul-litteral-32',
    context: 'Inéquation produit large : attention aux crochets.',
    parts: [{ questions: [{ n: 'a', text: 'Résoudre $(2x-6)(x+1)\\leqslant 0$. Attention aux crochets.' }] }],
  },
  // ── TIER 4 — problèmes de synthèse ◆ ───────────────────────────────────────
  {
    id: 'calcul-litteral-33',
    context: 'Un jardin rectangulaire a une longueur de $5\\,\\text{m}$ de plus que sa largeur. Son aire vaut $84\\,\\text{m}^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Soit $x$ la largeur en mètres. Exprimer la longueur en fonction de $x$.' },
        { n: 'b', text: 'Montrer que le problème conduit à l\'équation $x^2+5x-84=0$.' },
        { n: 'c', text: 'Vérifier que $x^2+5x-84=(x-7)(x+12)$.' },
        { n: 'd', text: 'Résoudre l\'équation.' },
        { n: 'e', text: 'Les deux solutions conviennent-elles au problème ? Justifier.' },
        { n: 'f', text: 'Conclure : donner les dimensions du jardin et vérifier l\'aire.' },
      ],
    }],
  },
  {
    id: 'calcul-litteral-34',
    context: 'La somme de trois entiers consécutifs vaut $96$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Soit $n$ le plus petit. Exprimer les deux autres en fonction de $n$.' },
        { n: 'b', text: 'Mettre le problème en équation.' },
        { n: 'c', text: 'Résoudre et conclure.' },
        { n: 'd', text: 'Vérifier le résultat.' },
        { n: 'e', text: 'Montrer que la somme de trois entiers consécutifs est toujours un multiple de $3$. En déduire pourquoi une somme de $100$ serait impossible.' },
      ],
    }],
  },
  {
    id: 'calcul-litteral-35',
    context: 'On considère l\'expression $A=(x+1)^2-(x-1)^2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Développer chacun des deux carrés, puis réduire $A$.' },
        { n: 'b', text: 'Retrouver ce résultat en factorisant $A$ à l\'aide de l\'identité $a^2-b^2=(a+b)(a-b)$.' },
        { n: 'c', text: 'Les deux méthodes donnent-elles le même résultat ? Laquelle est la plus rapide ?' },
        { n: 'd', text: 'En déduire la solution de l\'équation $(x+1)^2-(x-1)^2=20$.' },
        { n: 'e', text: 'Vérifier.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const CALCULLITTERAL_CORRECTIONS: Record<string, Correction> = {
  'calcul-litteral-1': {
    steps: [
      { n: '1', text: '$3(2x-5)=3\\times 2x+3\\times(-5)$.' },
      { n: '2', text: '$=6x-15$.' },
    ],
    result: '$6x-15$.',
  },
  'calcul-litteral-2': {
    steps: [
      { n: '1', text: '$(x+3)(x+7)=x\\times x+x\\times 7+3\\times x+3\\times 7$.' },
      { n: '2', text: '$=x^2+7x+3x+21=x^2+10x+21$.' },
    ],
    result: '$x^2+10x+21$.',
  },
  'calcul-litteral-3': {
    steps: [
      { n: '1', text: '$(x+5)^2=x^2+2\\times x\\times 5+5^2$.' },
      { n: '2', text: '$=x^2+10x+25$.' },
    ],
    result: '$x^2+10x+25$.',
  },
  'calcul-litteral-4': {
    steps: [
      { n: '1', text: '$(x-6)^2=x^2-2\\times x\\times 6+6^2$.' },
      { n: '2', text: '$=x^2-12x+36$.' },
    ],
    result: '$x^2-12x+36$.',
  },
  'calcul-litteral-5': {
    steps: [
      { n: '1', text: 'Les deux termes contiennent $5x$ : $5x^2=5x\\times x$ et $15x=5x\\times 3$.' },
      { n: '2', text: '$5x^2+15x=5x(x+3)$.' },
      { n: '3', text: '**Vérification** : $5x(x+3)=5x^2+15x$ ✓.' },
    ],
    result: '$5x(x+3)$.',
  },
  'calcul-litteral-6': {
    steps: [
      { n: '1', text: '$x^2-49=x^2-7^2=(x+7)(x-7)$.' },
    ],
    result: '$(x+7)(x-7)$.',
  },
  'calcul-litteral-7': {
    steps: [
      { n: '1', text: '$4x-16=0$ donne $4x=16$.' },
      { n: '2', text: '$x=\\dfrac{16}{4}=4$.' },
    ],
    result: '$x=4$.',
  },
  'calcul-litteral-8': {
    steps: [
      { n: '1', text: '$5(x+2)=2x+4$ ; on développe : $5x+10=2x+4$.' },
      { n: '2', text: 'On rassemble : $5x-2x=4-10$, soit $3x=-6$, donc $x=-2$.' },
      { n: '3', text: '**Vérification** : à gauche $5(-2+2)=5\\times 0=0$ ; à droite $2\\times(-2)+4=0$ ✓.' },
    ],
    result: '$x=-2$.',
  },
  'calcul-litteral-9': {
    steps: [
      { n: '1', text: '$2x-8>0$ donne $2x>8$.' },
      { n: '2', text: 'En divisant par $2$ (positif, donc le sens ne change pas) : $x>4$.' },
    ],
    result: '$S=]4\\,;+\\infty[$.',
  },
  'calcul-litteral-10': {
    steps: [
      { n: '1', text: '$(2x-1)(3x+4)=2x\\times 3x+2x\\times 4+(-1)\\times 3x+(-1)\\times 4$.' },
      { n: '2', text: '$=6x^2+8x-3x-4=6x^2+5x-4$.' },
    ],
    result: '$6x^2+5x-4$.',
  },
  'calcul-litteral-11': {
    steps: [
      { n: '1', text: '$(5x+2)(x-3)=5x\\times x+5x\\times(-3)+2\\times x+2\\times(-3)$.' },
      { n: '2', text: '$=5x^2-15x+2x-6=5x^2-13x-6$.' },
    ],
    result: '$5x^2-13x-6$.',
  },
  'calcul-litteral-12': {
    steps: [
      { n: '1', text: 'Le signe $-$ devant la parenthèse est un $\\times(-1)$ : il se distribue à **chaque** terme.' },
      { n: '2', text: '$4x-(3x-8)=4x-3x-(-8)=4x-3x+8=x+8$.' },
      { n: '3', text: '**L\'erreur à éviter** : écrire $4x-3x-8=x-8$, en ne changeant que le premier signe. Le $-8$ devient $+8$.' },
    ],
    result: '$x+8$.',
  },
  'calcul-litteral-13': {
    steps: [
      { n: '1', text: '$(2x+3)^2$ : ici $a=2x$ et $b=3$. $=(2x)^2+2\\times 2x\\times 3+3^2=4x^2+12x+9$.' },
      { n: '2', text: '$(3x-2)^2$ : ici $a=3x$ et $b=2$. $=(3x)^2-2\\times 3x\\times 2+2^2=9x^2-12x+4$.' },
      { n: '3', text: '**Attention** : $(2x)^2=4x^2$ et $(3x)^2=9x^2$ — le carré porte sur le coefficient *et* sur $x$.' },
    ],
    result: '$4x^2+12x+9$ et $9x^2-12x+4$.',
  },
  'calcul-litteral-14': {
    steps: [
      { n: '1', text: '$(x+7)(x-7)=x^2-7^2=x^2-49$.' },
      { n: '2', text: '$(4x+1)(4x-1)=(4x)^2-1^2=16x^2-1$.' },
    ],
    result: '$x^2-49$ et $16x^2-1$.',
  },
  'calcul-litteral-15': {
    steps: [
      { n: '1', text: 'L\'égalité est **fausse**.' },
      { n: '2', text: '**Test avec $x=1$** : à gauche $(1+3)^2=4^2=16$ ; à droite $1^2+9=10$. Or $16\\neq 10$ : l\'égalité est bien fausse.' },
      { n: '3', text: '**Correction** : $(x+3)^2=x^2+2\\times x\\times 3+3^2=x^2+6x+9$. Le terme oublié est $6x$, c\'est-à-dire le $2ab$.' },
      { n: '4', text: '*Bonne pratique* : un seul contre-exemple suffit à prouver qu\'une égalité est fausse. En cas de doute, tester avec un nombre simple prend cinq secondes.' },
    ],
    result: 'Faux : $(x+3)^2=x^2+6x+9$, il manquait $6x$.',
  },
  'calcul-litteral-16': {
    steps: [
      { n: '1', text: '$x^2+10x+25$ : on tente $a=x$ et $b=5$ (car $25=5^2$). Contrôle du terme du milieu : $2ab=2\\times x\\times 5=10x$ ✓. Donc $x^2+10x+25=(x+5)^2$.' },
      { n: '2', text: '$x^2-4x+4$ : on tente $a=x$ et $b=2$ (car $4=2^2$). Contrôle : $2ab=2\\times x\\times 2=4x$ ✓, avec un signe $-$. Donc $x^2-4x+4=(x-2)^2$.' },
      { n: '3', text: 'Ce contrôle du $2ab$ n\'est **pas facultatif** : $x^2+7x+25$ n\'est **pas** un carré parfait, bien que $x^2$ et $25$ le soient.' },
    ],
    result: '$(x+5)^2$ et $(x-2)^2$.',
  },
  'calcul-litteral-17': {
    steps: [
      { n: '1', text: '$9x^2-16=(3x)^2-4^2=(3x+4)(3x-4)$.' },
      { n: '2', text: '**Vérification** : $(3x+4)(3x-4)=9x^2-12x+12x-16=9x^2-16$ ✓.' },
    ],
    result: '$(3x+4)(3x-4)$.',
  },
  'calcul-litteral-18': {
    steps: [
      { n: '1', text: 'Le facteur commun est la parenthèse $(x-2)$ tout entière.' },
      { n: '2', text: '$(x-2)(x+5)+(x-2)\\times 4=(x-2)\\big[(x+5)+4\\big]=(x-2)(x+9)$.' },
      { n: '3', text: '**Vérification** : $(x-2)(x+9)=x^2+7x-18$, et l\'expression de départ donne $(x^2+3x-10)+(4x-8)=x^2+7x-18$ ✓.' },
    ],
    result: '$(x-2)(x+9)$.',
  },
  'calcul-litteral-19': {
    steps: [
      { n: '1', text: '$3(x-1)=x+7$ ; on développe : $3x-3=x+7$.' },
      { n: '2', text: 'On rassemble : $3x-x=7+3$, soit $2x=10$ et $x=5$.' },
      { n: '3', text: '**Vérification** : à gauche $3(5-1)=12$ ; à droite $5+7=12$ ✓.' },
    ],
    result: '$x=5$.',
  },
  'calcul-litteral-20': {
    steps: [
      { n: '1', text: 'C\'est une **équation produit nul** : $(3x-9)(x+2)=0$.' },
      { n: '2', text: 'D\'après le théorème : $3x-9=0$ **ou** $x+2=0$.' },
      { n: '3', text: '$3x=9$ donne $x=3$ ; $x+2=0$ donne $x=-2$.' },
    ],
    result: '$x=3$ et $x=-2$.',
  },
  'calcul-litteral-21': {
    steps: [
      { n: '1', text: '**On ne prend surtout pas la racine des deux côtés.** On ramène tout du même côté pour se ramener à un produit nul : $x^2=25$ donne $x^2-25=0$.' },
      { n: '2', text: 'On factorise : $x^2-5^2=(x+5)(x-5)=0$.' },
      { n: '3', text: 'D\'où $x+5=0$ ou $x-5=0$, soit $x=-5$ ou $x=5$.' },
      { n: '4', text: 'Il y a **deux** solutions. C\'est l\'erreur classique de ne retenir que $x=5$ : $(-5)^2=25$ tout autant.' },
    ],
    result: '$x=-5$ et $x=5$ — deux solutions.',
  },
  'calcul-litteral-22': {
    steps: [
      { n: '1', text: '$-3x+6>0$ donne $-3x>-6$ (on retranche $6$ : le sens ne change pas).' },
      { n: '2', text: 'On divise maintenant par $-3$. **C\'est ici que le sens change**, car $-3$ est négatif : $x<2$.' },
      { n: '3', text: '**Pourquoi** : multiplier par un négatif renverse l\'ordre des nombres. Par exemple $2<5$, mais en multipliant par $-1$ : $-2>-5$. Le plus grand devient le plus petit.' },
      { n: '4', text: '**Vérification** : pour $x=0$ ($<2$) : $-3\\times 0+6=6>0$ ✓. Pour $x=3$ : $-3\\times 3+6=-3$, qui n\'est pas $>0$ ✓.' },
    ],
    result: '$S=]-\\infty\\,;2[$.',
  },
  'calcul-litteral-23': {
    steps: [
      { n: '1', text: '$4-x\\leqslant 0$ donne $-x\\leqslant -4$.' },
      { n: '2', text: 'On divise par $-1$, donc on **change le sens** : $x\\geqslant 4$.' },
      { n: '3', text: 'L\'inégalité étant **large** ($\\leqslant$), la valeur $4$ est **incluse** : crochet fermé. Vérification : pour $x=4$, $4-4=0\\leqslant 0$ ✓.' },
    ],
    result: '$S=[4\\,;+\\infty[$.',
  },
  'calcul-litteral-24': {
    steps: [
      { n: '1', text: 'On considère un rectangle de largeur $(a+b)$ et de hauteur $(c+d)$.' },
      { n: '2', text: '**Première façon de calculer son aire** : largeur × hauteur, soit $(a+b)(c+d)$.' },
      { n: '3', text: '**Deuxième façon** : on découpe le rectangle en quatre sous-rectangles, en prolongeant les segments de longueurs $a$, $b$ d\'une part et $c$, $d$ d\'autre part. Leurs aires sont respectivement $ac$, $ad$, $bc$ et $bd$. L\'aire totale est leur somme : $ac+ad+bc+bd$.' },
      { n: '4', text: 'C\'est **la même aire**, calculée de deux manières. Donc $(a+b)(c+d)=ac+ad+bc+bd$.' },
      { n: '5', text: '*Remarque* : cette preuve ne vaut, telle quelle, que pour des longueurs positives. L\'égalité reste néanmoins vraie pour tous les nombres — la figure sert à comprendre, pas à démontrer le cas général.' },
    ],
    result: 'Les deux façons de calculer l\'aire du rectangle donnent $(a+b)(c+d)=ac+ad+bc+bd$.',
  },
  'calcul-litteral-25': {
    steps: [
      { n: 'a', text: '$101^2=(100+1)^2=100^2+2\\times 100\\times 1+1^2=10\\,000+200+1=10\\,201$.' },
      { n: 'b', text: '$99^2=(100-1)^2=100^2-2\\times 100\\times 1+1^2=10\\,000-200+1=9\\,801$.' },
      { n: 'c', text: '$103\\times 97=(100+3)(100-3)=100^2-3^2=10\\,000-9=9\\,991$.' },
      { n: 'd', text: 'Les identités remarquables ne servent pas qu\'au calcul littéral : elles transforment une multiplication pénible en additions de tête.' },
    ],
    result: '$10\\,201$ · $9\\,801$ · $9\\,991$.',
  },
  'calcul-litteral-26': {
    steps: [
      { n: 'a', text: '$x^2+9$ **ne se factorise pas** (au lycée). Il n\'existe **aucune** identité remarquable pour une *somme* de deux carrés : les trois identités concernent $(a+b)^2$, $(a-b)^2$ et $a^2-b^2$ — cette dernière étant une **différence**.' },
      { n: 'b', text: '**Comparaison** : $x^2-9=x^2-3^2=(x+3)(x-3)$ se factorise sans difficulté. Un seul signe change tout. *Argument supplémentaire* : $x^2+9$ est toujours $\\geqslant 9$, donc ne s\'annule jamais ; s\'il se factorisait en deux facteurs du premier degré, chacun s\'annulerait quelque part — impossible.' },
    ],
    result: '$x^2+9$ : pas de factorisation · $x^2-9=(x+3)(x-3)$.',
  },
  'calcul-litteral-27': {
    steps: [
      { n: '1', text: '**Étape 1 — facteur commun** : $2x^2-18=2(x^2-9)$.' },
      { n: '2', text: '**Étape 2 — identité remarquable** : $x^2-9=x^2-3^2=(x+3)(x-3)$.' },
      { n: '3', text: 'D\'où $2x^2-18=2(x+3)(x-3)$. Sans la première étape, on ne reconnaît pas l\'identité : $2x^2$ n\'est pas le carré d\'un nombre simple. **Toujours commencer par le facteur commun.**' },
    ],
    result: '$2(x+3)(x-3)$.',
  },
  'calcul-litteral-28': {
    steps: [
      { n: '1', text: '**Étape 1 — valeur interdite.** Le dénominateur s\'annule pour $x+2=0$, soit $x=-2$. Cette valeur est **interdite**.' },
      { n: '2', text: '**Étape 2 — numérateur nul.** $3x-12=0$ donne $3x=12$, soit $x=4$.' },
      { n: '3', text: '**Étape 3 — conclusion.** Comme $4\\neq -2$, la valeur trouvée est autorisée. La solution est $x=4$.' },
      { n: '4', text: '**Vérification** : $\\dfrac{3\\times 4-12}{4+2}=\\dfrac{0}{6}=0$ ✓.' },
    ],
    result: '$x=4$ (valeur interdite : $x=-2$).',
  },
  'calcul-litteral-29': {
    steps: [
      { n: 'a', text: 'Le raisonnement est **faux** car le théorème du produit nul ne vaut que pour le nombre **zéro**. Si $A\\times B=6$, il y a une infinité de possibilités — $1\\times 6$, $2\\times 3$, $12\\times 0{,}5$… Savoir que le produit vaut $6$ ne donne **aucune** information sur $A$ seul. *Contre-exemple* : avec le raisonnement de l\'élève, $x-1=6$ donnerait $x=7$ ; or $(7-1)(7-2)=6\\times 5=30\\neq 6$.' },
      { n: 'b', text: '**Ce qu\'il faut faire** : tout ramener à zéro, puis développer et réduire. $(x-1)(x-2)=6$ donne $x^2-3x+2-6=0$, soit $x^2-3x-4=0$. On factorise : $x^2-3x-4=(x-4)(x+1)$, d\'où $x=4$ ou $x=-1$. *Contrôle* : $(4-1)(4-2)=3\\times 2=6$ ✓ et $(-1-1)(-1-2)=(-2)\\times(-3)=6$ ✓.' },
    ],
    result: 'Le théorème ne vaut que pour $0$ — ici $x=4$ ou $x=-1$.',
  },
  'calcul-litteral-30': {
    steps: [
      { n: '1', text: '**Racines** : $x-1=0$ donne $x=1$ ; $x+4=0$ donne $x=-4$. Rangées dans l\'ordre croissant : $-4$ puis $1$.' },
      { n: '2', text: 'Dans le tableau, $(x-1)$ est négatif avant $1$, positif après ; $(x+4)$ est négatif avant $-4$, positif après.' },
      { n: '3', text: 'Le **produit** est positif quand les deux facteurs ont le **même signe** — avant $-4$ (les deux négatifs, $-\\times-=+$) et après $1$ (les deux positifs).' },
      { n: '4', text: 'L\'inégalité étant **stricte**, les racines sont exclues.' },
    ],
    result: '$S=]-\\infty\\,;-4[\\;\\cup\\;]1\\,;+\\infty[$.',
  },
  'calcul-litteral-31': {
    steps: [
      { n: '1', text: 'On relit **le même tableau** — inutile d\'en refaire un. On cherche cette fois où le produit est **négatif** : c\'est **entre** les deux racines.' },
      { n: '2', text: '**Ce qu\'on remarque** : les solutions de $<0$ sont exactement le **complémentaire** de celles de $>0$, privé des racines. C\'est logique : un produit est soit positif, soit négatif, soit nul — et il est nul exactement en $-4$ et $1$. Un seul tableau de signes répond donc à *toutes* les questions ($>0$, $<0$, $\\geqslant 0$, $\\leqslant 0$).' },
    ],
    result: '$S=]-4\\,;1[$.',
  },
  'calcul-litteral-32': {
    steps: [
      { n: '1', text: '**Racines** : $2x-6=0$ donne $x=3$ ; $x+1=0$ donne $x=-1$. Ordre croissant : $-1$ puis $3$.' },
      { n: '2', text: 'On cherche $\\leqslant 0$ : le produit est **négatif entre** $-1$ et $3$, et **nul** en $-1$ et en $3$.' },
      { n: '3', text: 'L\'inégalité étant **large**, les racines **sont incluses** (crochets fermés). *Contrôle* : en $x=3$, $(2\\times 3-6)(3+1)=0\\times 4=0\\leqslant 0$ ✓.' },
    ],
    result: '$S=[-1\\,;3]$.',
  },
  'calcul-litteral-33': {
    steps: [
      { n: 'a', text: 'Soit $x$ la largeur en mètres. La longueur vaut $x+5$.' },
      { n: 'b', text: 'L\'aire est le produit longueur × largeur : $x(x+5)=84$. En développant : $x^2+5x=84$, soit $x^2+5x-84=0$.' },
      { n: 'c', text: 'Développons $(x-7)(x+12)=x^2+12x-7x-84=x^2+5x-84$ ✓. La factorisation est correcte.' },
      { n: 'd', text: '$(x-7)(x+12)=0$ donne $x-7=0$ ou $x+12=0$, soit $x=7$ ou $x=-12$.' },
      { n: 'e', text: '**Non, une seule convient.** $x$ représente une **largeur** : une longueur ne peut pas être négative. La solution $x=-12$ est mathématiquement correcte mais **n\'a pas de sens** pour le problème posé. On ne retient que $x=7$. C\'est *une étape à ne jamais sauter* : résoudre l\'équation ne suffit pas, il faut revenir au contexte.' },
      { n: 'f', text: 'La largeur vaut $7\\,\\text{m}$ et la longueur $7+5=12\\,\\text{m}$. **Vérification** : $7\\times 12=84\\,\\text{m}^2$ ✓, et la longueur dépasse bien la largeur de $5\\,\\text{m}$ ✓.' },
    ],
    result: 'largeur $7\\,\\text{m}$, longueur $12\\,\\text{m}$ — la solution $x=-12$ est rejetée.',
  },
  'calcul-litteral-34': {
    steps: [
      { n: 'a', text: 'Si $n$ est le plus petit, les suivants sont $n+1$ et $n+2$.' },
      { n: 'b', text: '$n+(n+1)+(n+2)=96$.' },
      { n: 'c', text: 'En réduisant : $3n+3=96$, donc $3n=93$ et $n=31$. Les trois entiers sont $31$, $32$ et $33$.' },
      { n: 'd', text: '$31+32+33=96$ ✓, et ce sont bien trois entiers consécutifs ✓.' },
      { n: 'e', text: 'La somme s\'écrit toujours $n+(n+1)+(n+2)=3n+3=3(n+1)$ : c\'est $3$ fois un entier, donc **toujours un multiple de $3$** (élégamment : trois fois l\'entier du milieu). **Pourquoi $100$ est impossible** : $100$ n\'est pas un multiple de $3$ ($100=3\\times 33+1$). Aucune somme de trois entiers consécutifs ne peut donc valoir $100$. C\'est le calcul littéral qui permet cette conclusion : sans lui, on pourrait tester des valeurs indéfiniment sans jamais affirmer que *rien* ne marche.' },
    ],
    result: '$31$, $32$, $33$ · la somme vaut toujours $3(n+1)$, donc $100$ est impossible.',
  },
  'calcul-litteral-35': {
    steps: [
      { n: 'a', text: '**Par développement.** $(x+1)^2=x^2+2x+1$ et $(x-1)^2=x^2-2x+1$. $A=(x^2+2x+1)-(x^2-2x+1)$. Attention au signe $-$ devant la parenthèse, qui change **tous** les signes : $A=x^2+2x+1-x^2+2x-1=4x$.' },
      { n: 'b', text: '**Par factorisation.** $A$ est une différence de deux carrés, avec $a=x+1$ et $b=x-1$ : $A=\\big[(x+1)+(x-1)\\big]\\times\\big[(x+1)-(x-1)\\big]=[2x]\\times[x+1-x+1]=2x\\times 2=4x$.' },
      { n: 'c', text: 'Les deux méthodes donnent bien $A=4x$ ✓. La **factorisation est plus rapide** : elle évite de développer deux carrés et de gérer le signe $-$ devant la seconde parenthèse — précisément là où les erreurs se produisent. Reconnaître $a^2-b^2$ fait tout le travail.' },
      { n: 'd', text: 'L\'équation $(x+1)^2-(x-1)^2=20$ devient simplement $4x=20$, d\'où $x=5$.' },
      { n: 'e', text: '**Vérification** : $(5+1)^2-(5-1)^2=6^2-4^2=36-16=20$ ✓. *La morale* : une expression compliquée cachait une expression triviale. Factoriser d\'abord, calculer ensuite.' },
    ],
    result: '$A=4x$ par les deux méthodes · $x=5$.',
  },
};
