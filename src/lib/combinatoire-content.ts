import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const COMBINATOIRE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le nombre de k-uplets d\'un ensemble à $n$ éléments est…',
    options: [
      { label: 'a', text: '$n^k$ ($k$ positions, $n$ choix chacune)' },
      { label: 'b', text: '$n!$' },
      { label: 'c', text: '$\\dbinom{n}{k}$' },
      { label: 'd', text: '$k^n$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: '$A_n^k$ vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{n!}{k!}$' },
      { label: 'b', text: '$\\dfrac{n!}{(n-k)!}$' },
      { label: 'c', text: '$\\dfrac{n!}{k!(n-k)!}$' },
      { label: 'd', text: '$n^k$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Le nombre de permutations de $n$ éléments est…',
    options: [
      { label: 'a', text: '$n^2$' },
      { label: 'b', text: '$n!$' },
      { label: 'c', text: '$2^n$' },
      { label: 'd', text: '$n$' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: '$\\dbinom{n}{k}$ vaut…',
    options: [
      { label: 'a', text: '$\\dfrac{n!}{(n-k)!}$' },
      { label: 'b', text: '$\\dfrac{n!}{k!(n-k)!}$' },
      { label: 'c', text: '$n^k$' },
      { label: 'd', text: '$k!$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: '$\\dbinom{10}{2}$ vaut…',
    options: [
      { label: 'a', text: '$45$ (car $\\tfrac{10\\times 9}{2}$)' },
      { label: 'b', text: '$90$' },
      { label: 'c', text: '$100$' },
      { label: 'd', text: '$20$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: '$\\dbinom{n}{0}$ vaut…',
    options: [
      { label: 'a', text: '$0$' },
      { label: 'b', text: '$1$' },
      { label: 'c', text: '$n$' },
      { label: 'd', text: '$n!$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'La symétrie donne $\\dbinom{n}{k}=$…',
    options: [
      { label: 'a', text: '$\\dbinom{n}{n-k}$' },
      { label: 'b', text: '$\\dbinom{k}{n}$' },
      { label: 'c', text: '$\\dbinom{n-1}{k}$' },
      { label: 'd', text: '$\\dbinom{n+1}{k}$' },
    ],
    answer: 'a',
  },
  {
    n: 8,
    text: 'Ordre important et répétitions possibles : le modèle est…',
    options: [
      { label: 'a', text: 'combinaison' },
      { label: 'b', text: 'arrangement' },
      { label: 'c', text: 'k-uplet (tirage avec remise)' },
      { label: 'd', text: 'permutation' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: '$\\displaystyle\\sum_{k=0}^{n}\\dbinom{n}{k}$ vaut…',
    options: [
      { label: 'a', text: '$n!$' },
      { label: 'b', text: '$2^n$ (nombre de parties d\'un ensemble à $n$ éléments)' },
      { label: 'c', text: '$n^2$' },
      { label: 'd', text: '$2n$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'La règle de Pascal s\'écrit $\\dbinom{n}{k}=$…',
    options: [
      { label: 'a', text: '$\\dbinom{n-1}{k-1}+\\dbinom{n-1}{k}$' },
      { label: 'b', text: '$\\dbinom{n-1}{k}+\\dbinom{n}{k-1}$' },
      { label: 'c', text: '$\\dbinom{n}{k-1}+\\dbinom{n}{k+1}$' },
      { label: 'd', text: '$2\\dbinom{n-1}{k}$' },
    ],
    answer: 'a',
  },
];

// ── Énoncés des exercices ──────────────────────────────────────────────────────
export const COMBINATOIRE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 ────────────────────────────────────────────────────────────────
  {
    id: 'combinatoire-1',
    context: 'Modèle du k-uplet : liste ordonnée avec répétitions autorisées.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de codes à 4 chiffres peut-on former ?' },
        { n: 'b', text: 'Combien de plaques composées de 2 lettres suivies de 3 chiffres ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-2',
    context: 'Principe multiplicatif : des choix successifs indépendants se multiplient.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un menu propose 4 entrées, 5 plats et 3 desserts. Combien de repas complets (entrée, plat, dessert) peut-on composer ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-3',
    context: 'Rappel : $A_n^k=n\\times(n-1)\\times\\dots\\times(n-k+1)$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $A_7^3$.' },
        { n: 'b', text: 'Calculer $A_{10}^2$.' },
      ],
    }],
  },
  {
    id: 'combinatoire-4',
    context: 'Une permutation est un rangement ordonné de tous les éléments : $n!$ possibilités.',
    parts: [{
      questions: [
        { n: 'a', text: 'De combien de façons peut-on ranger 6 livres sur une étagère ?' },
        { n: 'b', text: 'Combien d\'anagrammes du mot « LIVRE » (5 lettres distinctes) ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-5',
    context: 'Rappel : $\\dbinom{n}{k}=\\dfrac{n!}{k!\\,(n-k)!}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\dbinom{8}{3}$.' },
        { n: 'b', text: 'Calculer $\\dbinom{10}{2}$.' },
      ],
    }],
  },
  {
    id: 'combinatoire-6',
    context: 'Propriété de symétrie du coefficient binomial.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $\\dbinom{7}{2}$ et $\\dbinom{7}{5}$. Que constate-t-on ?' },
      ],
    }],
  },
  // ── TIER 2 ────────────────────────────────────────────────────────────────
  {
    id: 'combinatoire-7',
    context: 'Tirage successif avec remise : le modèle du k-uplet.',
    parts: [{
      questions: [
        { n: 'a', text: 'On lance un dé à 6 faces 3 fois de suite. Combien de résultats ordonnés possibles ?' },
        { n: 'b', text: 'Même question pour 2 tirages avec remise d\'une boule parmi 5.' },
      ],
    }],
  },
  {
    id: 'combinatoire-8',
    context: 'Une course compte 12 coureurs.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de podiums (1ᵉʳ, 2ᵉ, 3ᵉ) différents sont possibles ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-9',
    context: 'Ordre important, lettres toutes différentes : quel modèle ?',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de mots de 4 lettres **distinctes** peut-on former avec un alphabet de 26 lettres ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-10',
    context: 'Une main de cartes est un tirage simultané : l\'ordre ne compte pas.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de mains de 5 cartes peut-on tirer d\'un jeu de 32 cartes ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-11',
    context: 'Un comité sans rôle particulier est un sous-ensemble.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans une classe de 20 élèves, combien de comités de 4 élèves (sans rôle particulier) peut-on former ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-12',
    context: 'La règle de Pascal : $\\dbinom{n}{k}=\\dbinom{n-1}{k-1}+\\dbinom{n-1}{k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Vérifier la règle de Pascal : $\\dbinom{6}{3}=\\dbinom{5}{2}+\\dbinom{5}{3}$.' },
      ],
    }],
  },
  {
    id: 'combinatoire-13',
    context: 'Formule du binôme : $(a+b)^n=\\displaystyle\\sum_{k=0}^{n}\\dbinom{n}{k}a^kb^{\\,n-k}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Développer $(x+2)^3$ à l\'aide de la formule du binôme.' },
      ],
    }],
  },
  {
    id: 'combinatoire-14',
    context: 'Une urne contient 10 boules numérotées. On en tire 3.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de tirages possibles si le tirage est simultané ?' },
        { n: 'b', text: 'Successif sans remise ?' },
        { n: 'c', text: 'Successif avec remise ?' },
      ],
    }],
  },
  // ── TIER 3 ────────────────────────────────────────────────────────────────
  {
    id: 'combinatoire-15',
    context: 'Un groupe compte 6 femmes et 5 hommes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de comités de 2 femmes et 2 hommes peut-on former ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-16',
    context: 'Écrire le développement avec la formule du binôme, puis isoler le bon terme.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer le coefficient de $x^2$ dans le développement de $(2x+1)^5$.' },
      ],
    }],
  },
  {
    id: 'combinatoire-17',
    context: 'Les 7 lettres du mot « CLAVIER » sont distinctes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de mots de 5 lettres distinctes peut-on former avec les lettres du mot « CLAVIER » ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-18',
    context: 'Un jury de 3 personnes est choisi parmi 5 hommes et 4 femmes. Indication : passer par le complémentaire.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de jurys comportent **au moins une femme** ?' },
      ],
    }],
  },
  // ── TIER 4 — Sujets type bac ──────────────────────────────────────────────
  {
    id: 'combinatoire-19',
    context: 'Un club compte 8 femmes et 6 hommes. On forme un bureau de 4 personnes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de bureaux différents peut-on former ?' },
        { n: 'b', text: 'Combien comportent exactement 2 femmes et 2 hommes ?' },
        { n: 'c', text: 'Combien comportent au moins 3 femmes ?' },
      ],
    }],
  },
  {
    id: 'combinatoire-20',
    context: 'Une urne contient 5 boules rouges et 3 boules vertes (soit 8 boules). On tire simultanément 3 boules.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de tirages possibles ?' },
        { n: 'b', text: 'Combien contiennent exactement 2 rouges ?' },
        { n: 'c', text: 'Combien contiennent au moins une verte ?' },
        { n: 'd', text: 'En déduire la probabilité d\'obtenir exactement 2 rouges.' },
      ],
    }],
  },
  {
    id: 'combinatoire-21',
    context: 'On considère le développement de $(1+x)^4$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Développer $(1+x)^4$ à l\'aide de la formule du binôme.' },
        { n: 'b', text: 'En choisissant une valeur de $x$, calculer $\\displaystyle\\sum_{k=0}^{4}\\dbinom{4}{k}$.' },
        { n: 'c', text: 'De même, calculer $\\displaystyle\\sum_{k=0}^{4}(-1)^k\\dbinom{4}{k}$.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const COMBINATOIRE_CORRECTIONS: Record<string, Correction> = {
  'combinatoire-1': {
    steps: [
      { n: 'a', text: 'Codes à 4 chiffres : chaque position a 10 choix, donc $10^4=10\\,000$.' },
      { n: 'b', text: 'Plaques (2 lettres puis 3 chiffres) : $26^2\\times 10^3=676\\,000$.' },
    ],
    result: '$10\\,000$ codes ; $676\\,000$ plaques.',
  },
  'combinatoire-2': {
    steps: [
      { n: '1', text: 'Par le principe multiplicatif : $4\\times 5\\times 3=60$ repas.' },
    ],
    result: '$60$ repas.',
  },
  'combinatoire-3': {
    steps: [
      { n: 'a', text: '$A_7^3=7\\times 6\\times 5=210$.' },
      { n: 'b', text: '$A_{10}^2=10\\times 9=90$.' },
    ],
    result: '$A_7^3=210$ ; $A_{10}^2=90$.',
  },
  'combinatoire-4': {
    steps: [
      { n: 'a', text: 'Ranger 6 livres : $6!=720$.' },
      { n: 'b', text: 'Anagrammes de « LIVRE » (5 lettres distinctes) : $5!=120$.' },
    ],
    result: '$720$ rangements ; $120$ anagrammes.',
  },
  'combinatoire-5': {
    steps: [
      { n: 'a', text: '$\\dbinom{8}{3}=\\dfrac{8\\times 7\\times 6}{3!}=56$.' },
      { n: 'b', text: '$\\dbinom{10}{2}=\\dfrac{10\\times 9}{2}=45$.' },
    ],
    result: '$\\dbinom{8}{3}=56$ ; $\\dbinom{10}{2}=45$.',
  },
  'combinatoire-6': {
    steps: [
      { n: '1', text: '$\\dbinom{7}{2}=21$ et $\\dbinom{7}{5}=21$ : ils sont égaux.' },
      { n: '2', text: 'Cela illustre la **symétrie** $\\dbinom{7}{5}=\\dbinom{7}{7-5}=\\dbinom{7}{2}$.' },
    ],
    result: '$\\dbinom{7}{2}=\\dbinom{7}{5}=21$ (symétrie).',
  },
  'combinatoire-7': {
    steps: [
      { n: 'a', text: 'Dé lancé 3 fois (avec remise, ordonné) : $6^3=216$.' },
      { n: 'b', text: 'Deux tirages avec remise parmi 5 : $5^2=25$.' },
    ],
    result: '$216$ résultats ; $25$ tirages.',
  },
  'combinatoire-8': {
    steps: [
      { n: '1', text: 'Podium (ordre important, sans répétition) : $A_{12}^3=12\\times 11\\times 10=1320$.' },
    ],
    result: '$1320$ podiums.',
  },
  'combinatoire-9': {
    steps: [
      { n: '1', text: 'Mots de 4 lettres distinctes : $A_{26}^4=26\\times 25\\times 24\\times 23=358\\,800$.' },
    ],
    result: '$358\\,800$ mots.',
  },
  'combinatoire-10': {
    steps: [
      { n: '1', text: 'Mains de 5 cartes parmi 32 (ordre indifférent) : $\\dbinom{32}{5}=201\\,376$.' },
    ],
    result: '$201\\,376$ mains.',
  },
  'combinatoire-11': {
    steps: [
      { n: '1', text: 'Comités de 4 élèves parmi 20 : $\\dbinom{20}{4}=4845$.' },
    ],
    result: '$4845$ comités.',
  },
  'combinatoire-12': {
    steps: [
      { n: '1', text: '$\\dbinom{5}{2}+\\dbinom{5}{3}=10+10=20=\\dbinom{6}{3}$. La règle de Pascal est vérifiée. ✓' },
    ],
    result: '$\\dbinom{6}{3}=20=\\dbinom{5}{2}+\\dbinom{5}{3}$.',
  },
  'combinatoire-13': {
    steps: [
      { n: '1', text: '$(x+2)^3=\\displaystyle\\sum_{k=0}^{3}\\dbinom{3}{k}x^k2^{3-k}=x^3+3\\cdot 2\\,x^2+3\\cdot 4\\,x+8$.' },
    ],
    result: '$(x+2)^3=x^3+6x^2+12x+8$.',
  },
  'combinatoire-14': {
    steps: [
      { n: 'a', text: 'Simultané (ordre indifférent) : $\\dbinom{10}{3}=120$.' },
      { n: 'b', text: 'Successif sans remise (ordonné) : $A_{10}^3=720$.' },
      { n: 'c', text: 'Successif avec remise : $10^3=1000$.' },
    ],
    result: '$120$ ; $720$ ; $1000$.',
  },
  'combinatoire-15': {
    steps: [
      { n: '1', text: 'On choisit 2 femmes parmi 6 **et** 2 hommes parmi 5 : $\\dbinom{6}{2}\\times\\dbinom{5}{2}=15\\times 10=150$.' },
    ],
    result: '$150$ comités.',
  },
  'combinatoire-16': {
    steps: [
      { n: '1', text: '$(2x+1)^5=\\displaystyle\\sum_{k=0}^{5}\\dbinom{5}{k}(2x)^k$. Le terme en $x^2$ correspond à $k=2$ : $\\dbinom{5}{2}\\times 2^2=10\\times 4=40$.' },
    ],
    result: 'Coefficient de $x^2$ : $40$.',
  },
  'combinatoire-17': {
    steps: [
      { n: '1', text: 'Mots de 5 lettres distinctes parmi les 7 lettres de « CLAVIER » : $A_7^5=7\\times 6\\times 5\\times 4\\times 3=2520$.' },
    ],
    result: '$2520$ mots.',
  },
  'combinatoire-18': {
    steps: [
      { n: '1', text: 'On passe par le complémentaire. Total de jurys : $\\dbinom{9}{3}=84$.' },
      { n: '2', text: 'Jurys **sans** femme (3 hommes parmi 5) : $\\dbinom{5}{3}=10$. Donc « au moins une femme » : $84-10=74$.' },
    ],
    result: '$74$ jurys.',
  },
  'combinatoire-19': {
    steps: [
      { n: 'a', text: 'Bureaux de 4 personnes parmi 14 : $\\dbinom{14}{4}=1001$.' },
      { n: 'b', text: 'Exactement 2 femmes et 2 hommes : $\\dbinom{8}{2}\\times\\dbinom{6}{2}=28\\times 15=420$.' },
      { n: 'c', text: 'Au moins 3 femmes $=$ (3 femmes, 1 homme) $+$ (4 femmes, 0 homme) : $\\dbinom{8}{3}\\dbinom{6}{1}+\\dbinom{8}{4}=56\\times 6+70=336+70=406$.' },
    ],
    result: '$1001$ ; $420$ ; $406$.',
  },
  'combinatoire-20': {
    steps: [
      { n: 'a', text: 'Tirages de 3 boules parmi 8 : $\\dbinom{8}{3}=56$.' },
      { n: 'b', text: 'Exactement 2 rouges (et donc 1 verte) : $\\dbinom{5}{2}\\times\\dbinom{3}{1}=10\\times 3=30$.' },
      { n: 'c', text: 'Au moins une verte $=$ total $-$ aucune verte (3 rouges) : $\\dbinom{8}{3}-\\dbinom{5}{3}=56-10=46$.' },
      { n: 'd', text: '$P(\\text{exactement 2 rouges})=\\dfrac{30}{56}=\\dfrac{15}{28}\\approx 0{,}54$.' },
    ],
    result: '$56$ ; $30$ ; $46$ ; $P=\\dfrac{15}{28}$.',
  },
  'combinatoire-21': {
    steps: [
      { n: 'a', text: '$(1+x)^4=\\displaystyle\\sum_{k=0}^{4}\\dbinom{4}{k}x^k=1+4x+6x^2+4x^3+x^4$.' },
      { n: 'b', text: 'Pour $x=1$ : $(1+1)^4=2^4=16=\\displaystyle\\sum_{k=0}^{4}\\dbinom{4}{k}$.' },
      { n: 'c', text: 'Pour $x=-1$ : $(1-1)^4=0=\\displaystyle\\sum_{k=0}^{4}(-1)^k\\dbinom{4}{k}$ (soit $1-4+6-4+1=0$).' },
    ],
    result: '$\\sum\\dbinom{4}{k}=16$ ; $\\sum(-1)^k\\dbinom{4}{k}=0$.',
  },
};
