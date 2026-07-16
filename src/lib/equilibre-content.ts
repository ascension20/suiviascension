import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const EQUILIBRE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le taux d\'avancement final vaut…',
    options: [
      { label: 'a', text: '$\\tau=\\dfrac{x_f}{x_{\\max}}$' },
      { label: 'b', text: '$\\tau=\\dfrac{x_{\\max}}{x_f}$' },
      { label: 'c', text: '$\\tau=x_f\\,x_{\\max}$' },
      { label: 'd', text: '$\\tau=x_{\\max}-x_f$' },
    ],
    answer: 'a',
  },
  {
    n: 2,
    text: 'Une transformation est totale si…',
    options: [
      { label: 'a', text: '$\\tau=0$' },
      { label: 'b', text: '$\\tau=1$' },
      { label: 'c', text: '$K=0$' },
      { label: 'd', text: '$Q_r=0$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Dans l\'expression de $Q_r$, on exclut…',
    options: [
      { label: 'a', text: 'les produits' },
      { label: 'b', text: 'les solides et le solvant' },
      { label: 'c', text: 'les ions' },
      { label: 'd', text: 'les réactifs' },
    ],
    answer: 'b',
  },
  {
    n: 4,
    text: 'La constante d\'équilibre dépend…',
    options: [
      { label: 'a', text: 'des concentrations initiales' },
      { label: 'b', text: 'de la réaction et de la température' },
      { label: 'c', text: 'du volume' },
      { label: 'd', text: 'du catalyseur' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Si $Q_{r,i}<K$, le système évolue…',
    options: [
      { label: 'a', text: 'dans le sens direct' },
      { label: 'b', text: 'dans le sens inverse' },
      { label: 'c', text: 'pas du tout' },
      { label: 'd', text: 'au hasard' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: 'Si $Q_{r,i}=K$…',
    options: [
      { label: 'a', text: 'le système est à l\'équilibre' },
      { label: 'b', text: 'la réaction est totale' },
      { label: 'c', text: '$\\tau=1$' },
      { label: 'd', text: '$\\tau=0$' },
    ],
    answer: 'a',
  },
  {
    n: 7,
    text: 'Si l\'on part uniquement de réactifs…',
    options: [
      { label: 'a', text: '$Q_{r,i}=K$' },
      { label: 'b', text: '$Q_{r,i}=0$, sens direct' },
      { label: 'c', text: '$Q_{r,i}$ infini, sens inverse' },
      { label: 'd', text: '$Q_{r,i}=1$' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Une réaction de $K=10^{10}$ est…',
    options: [
      { label: 'a', text: 'très limitée' },
      { label: 'b', text: 'quasi totale' },
      { label: 'c', text: 'impossible' },
      { label: 'd', text: 'infiniment lente' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: '$K_a$ est…',
    options: [
      { label: 'a', text: 'un taux d\'avancement' },
      { label: 'b', text: 'une constante d\'équilibre' },
      { label: 'c', text: 'une vitesse' },
      { label: 'd', text: 'un quotient initial' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'En diluant une solution d\'acide faible, $\\tau$…',
    options: [
      { label: 'a', text: 'augmente' },
      { label: 'b', text: 'diminue' },
      { label: 'c', text: 'ne change pas' },
      { label: 'd', text: 'devient nul' },
    ],
    answer: 'a',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const EQUILIBRE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'equilibre-1',
    context: 'Taux d\'avancement final : $\\tau=\\dfrac{x_f}{x_{\\max}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une transformation a $x_f=0{,}080\\,\\text{mol}$ et $x_{\\max}=0{,}100\\,\\text{mol}$. Calculer $\\tau$. La transformation est-elle totale ?' },
      ],
    }],
  },
  {
    id: 'equilibre-2',
    context: 'Taux d\'avancement final : $\\tau=\\dfrac{x_f}{x_{\\max}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une transformation a $\\tau=0{,}25$ et $x_{\\max}=2{,}0\\times 10^{-2}\\,\\text{mol}$. Calculer $x_f$.' },
      ],
    }],
  },
  {
    id: 'equilibre-3',
    context: 'Quotient de réaction : $Q_r=\\dfrac{[\\text{C}]^c[\\text{D}]^d}{[\\text{A}]^a[\\text{B}]^b}$ (solides et solvant exclus).',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour $\\text{A}+\\text{B}\\rightleftharpoons\\text{C}$ (toutes espèces en solution), écrire $Q_r$ puis le calculer pour $[\\text{A}]=0{,}10$, $[\\text{B}]=0{,}20$ et $[\\text{C}]=0{,}050\\,\\text{mol·L}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'equilibre-4',
    context: 'Critère : $Q_{r,i}<K$ → sens direct ; $Q_{r,i}>K$ → sens inverse.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une réaction a $K=1{,}0\\times 10^{-3}$. Prévoir le sens d\'évolution pour $Q_{r,i}=1{,}0\\times 10^{-5}$, puis pour $Q_{r,i}=5{,}0\\times 10^{-2}$, puis pour $Q_{r,i}=1{,}0\\times 10^{-3}$.' },
      ],
    }],
  },
  {
    id: 'equilibre-5',
    context: 'Le cas le plus simple : que des réactifs à l\'instant initial.',
    parts: [{
      questions: [
        { n: 'a', text: 'On mélange uniquement des réactifs. Que vaut $Q_{r,i}$ ? Dans quel sens le système évolue-t-il nécessairement ? Justifier sans calcul.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'equilibre-6',
    context: 'Acide faible peu dissocié. Si la réaction était totale, on aurait $[\\text{H}_3\\text{O}^+]=c$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une solution d\'acide faible de concentration $c=0{,}050\\,\\text{mol·L}^{-1}$ contient $[\\text{H}_3\\text{O}^+]=2{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$ à l\'équilibre. Calculer $\\tau$ et conclure.' },
      ],
    }],
  },
  {
    id: 'equilibre-7',
    context: 'Transformation totale ou limitée, équilibre dynamique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'est-ce qu\'une transformation totale ? limitée ? Que reste-t-il dans le milieu dans chaque cas ?' },
        { n: 'b', text: 'Pourquoi dit-on que l\'équilibre est **dynamique** ?' },
      ],
    }],
  },
  {
    id: 'equilibre-8',
    context: 'Le solvant est exclu du quotient de réaction.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire $Q_r$ pour $\\text{CH}_3\\text{COOH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{CH}_3\\text{COO}^-+\\text{H}_3\\text{O}^+$. Justifier l\'absence de l\'eau. À quelle grandeur connue $K$ correspond-elle ?' },
      ],
    }],
  },
  {
    id: 'equilibre-9',
    context: 'Les solides sont exclus du quotient de réaction.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire $Q_r$ pour $\\text{Zn}_{(s)}+\\text{Cu}^{2+}\\rightleftharpoons\\text{Zn}^{2+}+\\text{Cu}_{(s)}$, puis le calculer pour $[\\text{Zn}^{2+}]=0{,}10$ et $[\\text{Cu}^{2+}]=0{,}010\\,\\text{mol·L}^{-1}$.' },
      ],
    }],
  },
  {
    id: 'equilibre-10',
    context: 'Réaction $\\text{Zn}_{(s)}+\\text{Cu}^{2+}\\rightleftharpoons\\text{Zn}^{2+}+\\text{Cu}_{(s)}$, de constante $K=1{,}9\\times 10^{37}$. Le mélange initial donne $Q_{r,i}=10$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Prévoir le sens d\'évolution.' },
        { n: 'b', text: 'Que faudrait-il pour évoluer en sens inverse ? Est-ce réalisable ?' },
      ],
    }],
  },
  {
    id: 'equilibre-11',
    context: 'La valeur de $K$ renseigne sur le caractère total ou limité.',
    parts: [{
      questions: [
        { n: 'a', text: 'Que peut-on dire d\'une transformation dont $K=1{,}0\\times 10^{8}$ ? Et de celle dont $K=1{,}0\\times 10^{-6}$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'equilibre-12',
    context: 'Méthode de détermination de l\'état final à partir de $K$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire les quatre étapes permettant de déterminer l\'état final d\'un système à l\'équilibre à partir de $K$.' },
      ],
    }],
  },
  {
    id: 'equilibre-13',
    context: 'Réaction d\'un acide sur l\'eau : $\\text{AH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{A}^-+\\text{H}_3\\text{O}^+$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer que $K_a$ est la constante d\'équilibre de la réaction d\'un acide sur l\'eau.' },
        { n: 'b', text: 'Que signifie physiquement un $K_a$ très petit ?' },
      ],
    }],
  },
  {
    id: 'equilibre-14',
    context: 'Autoprotolyse de l\'eau. $K_e=1{,}0\\times 10^{-14}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de l\'autoprotolyse de l\'eau et le $Q_r$ associé. À quoi $K$ correspond-il ?' },
        { n: 'b', text: 'Que dit sa valeur ($10^{-14}$) sur cette transformation ?' },
      ],
    }],
  },
  {
    id: 'equilibre-15',
    context: 'Acide faible peu dissocié : $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{K_a\\,c}$ et $\\tau\\approx\\sqrt{\\dfrac{K_a}{c}}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour l\'acide éthanoïque ($\\text{p}K_a=4{,}8$), calculer $\\tau$ et le pH pour $c=5{,}0\\times 10^{-2}\\,\\text{mol·L}^{-1}$, puis pour $c=1{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$. Commenter les deux évolutions.' },
      ],
    }],
  },
  {
    id: 'equilibre-16',
    context: 'Deux expériences sur la même réaction, à la même température, mais avec des concentrations initiales différentes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Ont-elles le même $K$ ? le même $\\tau$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'equilibre-17',
    context: 'Cinétique et thermodynamique sont indépendantes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un catalyseur modifie-t-il $K$ ? Modifie-t-il $\\tau$ ? Modifie-t-il la durée nécessaire pour atteindre l\'équilibre ? Justifier.' },
      ],
    }],
  },
  // ── TIER 3 — approfondissement ★★★ ─────────────────────────────────────────
  {
    id: 'equilibre-18',
    context: 'Les nombres stœchiométriques deviennent les exposants ; le solvant est exclu.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire $Q_r$ pour $\\text{MnO}_4^-+5\\,\\text{Fe}^{2+}+8\\,\\text{H}^+\\rightleftharpoons\\text{Mn}^{2+}+5\\,\\text{Fe}^{3+}+4\\,\\text{H}_2\\text{O}$. Attention aux exposants et au solvant.' },
      ],
    }],
  },
  {
    id: 'equilibre-19',
    context: 'Un mélange contient $2{,}0\\,\\text{mol}$ d\'acide et $2{,}0\\,\\text{mol}$ d\'alcool. La réaction $\\text{acide}+\\text{alcool}\\rightleftharpoons\\text{ester}+\\text{eau}$ a $K=4{,}0$ (le volume se simplifie).',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $x_{\\max}$.' },
        { n: 'b', text: 'Exprimer $Q_{r,\\text{éq}}$ en fonction de $x_f$ et poser $Q_{r,\\text{éq}}=K$.' },
        { n: 'c', text: 'Résoudre pour trouver $x_f$, puis calculer $\\tau$.' },
        { n: 'd', text: 'Vérifier le résultat en recalculant $Q_r$.' },
      ],
    }],
  },
  {
    id: 'equilibre-20',
    context: 'En diluant un acide faible, $\\tau$ augmente **et** le pH augmente (la solution devient moins acide).',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi il n\'y a aucune contradiction.' },
      ],
    }],
  },
  // ── TIER 4 — sujets type bac ◆ ─────────────────────────────────────────────
  {
    id: 'equilibre-21',
    context: 'On étudie une solution d\'acide méthanoïque $\\text{HCOOH}$ de concentration $c=0{,}10\\,\\text{mol·L}^{-1}$. Donnée : $\\text{p}K_a(\\text{HCOOH}/\\text{HCOO}^-)=3{,}8$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'équation de la réaction de l\'acide sur l\'eau, puis l\'expression de $Q_r$. Justifier l\'absence de l\'eau.' },
        { n: 'b', text: 'À quelle grandeur la constante $K$ de cette réaction correspond-elle ? Calculer sa valeur. Que peut-on en déduire sur le caractère total ou limité de la transformation ?' },
        { n: 'c', text: 'Sans calcul, prévoir le sens d\'évolution du système à l\'instant initial.' },
        { n: 'd', text: 'Calculer $[\\text{H}_3\\text{O}^+]$ puis le pH de la solution.' },
        { n: 'e', text: 'Calculer le taux d\'avancement final $\\tau$.' },
        { n: 'f', text: 'On dilue la solution $100$ fois. Calculer le nouveau $\\tau$ et le nouveau pH. Par quel facteur $\\tau$ est-il multiplié ? La constante $K$ a-t-elle changé ? Commenter.' },
      ],
    }],
  },
  {
    id: 'equilibre-22',
    context: 'Une pile met en jeu les couples $\\text{Zn}^{2+}/\\text{Zn}$ et $\\text{Cu}^{2+}/\\text{Cu}$, selon $\\text{Zn}_{(s)}+\\text{Cu}^{2+}\\rightleftharpoons\\text{Zn}^{2+}+\\text{Cu}_{(s)}$, de constante $K=1{,}9\\times 10^{37}$. Initialement, $[\\text{Zn}^{2+}]=0{,}10\\,\\text{mol·L}^{-1}$ et $[\\text{Cu}^{2+}]=0{,}010\\,\\text{mol·L}^{-1}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire l\'expression de $Q_r$ en justifiant les espèces retenues, puis calculer $Q_{r,i}$.' },
        { n: 'b', text: 'Comparer $Q_{r,i}$ à $K$ et en déduire le sens d\'évolution spontanée.' },
        { n: 'c', text: 'En déduire quelle électrode est le siège de l\'oxydation. S\'agit-il de l\'anode ou de la cathode ? Quelle est sa polarité ?' },
        { n: 'd', text: 'Que dit la valeur de $K$ sur le caractère total ou limité de la transformation ?' },
        { n: 'e', text: 'Que faudrait-il pour que le système évolue en sens inverse ? Est-ce réalisable spontanément ? Comment procède-t-on en pratique ?' },
      ],
    }],
  },
  {
    id: 'equilibre-23',
    context: 'On réalise l\'estérification $\\text{acide}+\\text{alcool}\\rightleftharpoons\\text{ester}+\\text{eau}$, de constante $K=4{,}0$, en mélangeant $1{,}0\\,\\text{mol}$ d\'acide et $3{,}0\\,\\text{mol}$ d\'alcool (le volume se simplifie dans $Q_r$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Dresser le tableau d\'avancement et identifier le réactif limitant. En déduire $x_{\\max}$.' },
        { n: 'b', text: 'Exprimer $Q_{r,\\text{éq}}$ en fonction de $x_f$, puis poser $Q_{r,\\text{éq}}=K$. Montrer que $x_f$ vérifie $3x_f^2-16x_f+12=0$.' },
        { n: 'c', text: 'Résoudre cette équation et justifier le choix de la racine.' },
        { n: 'd', text: 'Calculer $\\tau$. Vérifier le résultat en recalculant $Q_r$.' },
        { n: 'e', text: 'Dans les mêmes conditions mais avec un mélange équimolaire ($1{,}0$ et $1{,}0\\,\\text{mol}$), on trouve $\\tau=67\\,\\%$. Comparer et conclure sur l\'intérêt d\'utiliser un réactif en excès. La constante $K$ a-t-elle changé ?' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const EQUILIBRE_CORRECTIONS: Record<string, Correction> = {
  'equilibre-1': {
    steps: [
      { n: '1', text: '$\\tau=\\dfrac{x_f}{x_{\\max}}=\\dfrac{0{,}080}{0{,}100}=0{,}80$, soit $80\\,\\%$.' },
      { n: '2', text: 'Comme $\\tau<1$, la transformation **n\'est pas totale** : elle est **limitée**. Il reste du réactif limitant à l\'état final.' },
    ],
    result: '$\\tau=0{,}80$ → transformation limitée.',
  },
  'equilibre-2': {
    steps: [
      { n: '1', text: '$\\tau=\\dfrac{x_f}{x_{\\max}}$ donne $x_f=\\tau\\times x_{\\max}$.' },
      { n: '2', text: '$x_f=0{,}25\\times 2{,}0\\times 10^{-2}=5{,}0\\times 10^{-3}\\,\\text{mol}$.' },
    ],
    result: '$x_f=5{,}0\\times 10^{-3}\\,\\text{mol}$.',
  },
  'equilibre-3': {
    steps: [
      { n: '1', text: 'Toutes les espèces étant en solution : $Q_r=\\dfrac{[\\text{C}]}{[\\text{A}][\\text{B}]}$.' },
      { n: '2', text: '$Q_r=\\dfrac{0{,}050}{0{,}10\\times 0{,}20}=\\dfrac{0{,}050}{0{,}020}=2{,}5$.' },
    ],
    result: '$Q_r=\\dfrac{[\\text{C}]}{[\\text{A}][\\text{B}]}=2{,}5$.',
  },
  'equilibre-4': {
    steps: [
      { n: '1', text: 'On compare systématiquement $Q_{r,i}$ à $K=1{,}0\\times 10^{-3}$.' },
      { n: '2', text: '$Q_{r,i}=1{,}0\\times 10^{-5}<K$ : évolution dans le **sens direct** ($\\to$), formation de produits.' },
      { n: '3', text: '$Q_{r,i}=5{,}0\\times 10^{-2}>K$ : évolution dans le **sens inverse** ($\\leftarrow$), formation de réactifs.' },
      { n: '4', text: '$Q_{r,i}=1{,}0\\times 10^{-3}=K$ : le système est déjà à l\'**équilibre**, il n\'évolue pas.' },
    ],
    result: 'direct · inverse · pas d\'évolution.',
  },
  'equilibre-5': {
    steps: [
      { n: '1', text: 'S\'il n\'y a que des réactifs, aucune concentration de produit n\'est présente : le **numérateur** de $Q_r$ est nul, donc $Q_{r,i}=0$.' },
      { n: '2', text: 'Or $K>0$ toujours. Donc $Q_{r,i}=0<K$ : le système évolue nécessairement dans le **sens direct**. Aucun calcul n\'est requis — c\'est vrai quelle que soit la valeur de $K$.' },
    ],
    result: '$Q_{r,i}=0$ → sens direct, toujours.',
  },
  'equilibre-6': {
    steps: [
      { n: '1', text: 'Si la réaction était totale, tout l\'acide serait dissocié et l\'on aurait $[\\text{H}_3\\text{O}^+]=c$ : c\'est le cas correspondant à $x_{\\max}$.' },
      { n: '2', text: 'Donc $\\tau=\\dfrac{[\\text{H}_3\\text{O}^+]}{c}=\\dfrac{2{,}0\\times 10^{-3}}{0{,}050}=0{,}040$, soit $4{,}0\\,\\%$.' },
      { n: '3', text: '$\\tau\\ll 1$ : la transformation est **très limitée**. L\'acide est faiblement dissocié — c\'est bien un **acide faible**.' },
    ],
    result: '$\\tau=4{,}0\\,\\%$ → transformation limitée (acide faible).',
  },
  'equilibre-7': {
    steps: [
      { n: '1', text: 'Une transformation est **totale** si elle se poursuit jusqu\'à disparition complète du réactif limitant : $x_f=x_{\\max}$ et $\\tau=1$. Il ne reste alors plus de réactif limitant.' },
      { n: '2', text: 'Elle est **limitée** si elle s\'arrête avant : $x_f<x_{\\max}$ et $\\tau<1$. Il reste alors tous les réactifs **et** tous les produits simultanément : le système a atteint un état d\'équilibre.' },
      { n: '3', text: 'Cet équilibre est **dynamique** car, à l\'échelle microscopique, les réactions directe et inverse continuent de se produire — mais à la **même vitesse**. Les concentrations n\'évoluent plus à l\'échelle macroscopique, alors que rien n\'est figé au niveau moléculaire.' },
    ],
    result: 'Totale : $\\tau=1$. Limitée : $\\tau<1$, il reste réactifs et produits. Équilibre dynamique : vitesses directe et inverse égales.',
  },
  'equilibre-8': {
    steps: [
      { n: '1', text: '$Q_r=\\dfrac{[\\text{CH}_3\\text{COO}^-]\\,[\\text{H}_3\\text{O}^+]}{[\\text{CH}_3\\text{COOH}]}$.' },
      { n: '2', text: 'L\'eau n\'apparaît pas : elle est le **solvant**, présente en très large excès. Sa concentration est quasi constante et, par convention, elle n\'est pas comptée dans $Q_r$.' },
      { n: '3', text: 'À l\'équilibre, $K=Q_{r,\\text{éq}}$ : cette constante est exactement la **constante d\'acidité $K_a$** du couple $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$.' },
    ],
    result: '$Q_r=\\dfrac{[\\text{CH}_3\\text{COO}^-][\\text{H}_3\\text{O}^+]}{[\\text{CH}_3\\text{COOH}]}$ ; $K=K_a$ du couple.',
  },
  'equilibre-9': {
    steps: [
      { n: '1', text: '$\\text{Zn}_{(s)}$ et $\\text{Cu}_{(s)}$ sont des **solides** : ils n\'apparaissent pas dans $Q_r$. Il reste donc $Q_r=\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$.' },
      { n: '2', text: '$Q_r=\\dfrac{0{,}10}{0{,}010}=10$.' },
    ],
    result: '$Q_r=\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}=10$.',
  },
  'equilibre-10': {
    steps: [
      { n: '1', text: '$Q_{r,i}=10$ et $K=1{,}9\\times 10^{37}$ : $Q_{r,i}\\lll K$, le système évolue dans le **sens direct** — le zinc est oxydé, les ions $\\text{Cu}^{2+}$ sont réduits.' },
      { n: '2', text: 'Pour évoluer en sens inverse, il faudrait $Q_{r,i}>K$, soit $\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}>1{,}9\\times 10^{37}$ : un rapport de concentrations irréaliste (il faudrait $[\\text{Cu}^{2+}]$ inférieure à toute valeur physiquement atteignable). C\'est donc **impossible spontanément**.' },
      { n: '3', text: 'En pratique, on force le sens inverse par **électrolyse**, c\'est-à-dire en imposant un générateur.' },
    ],
    result: 'Sens direct ($Q_{r,i}\\lll K$) ; sens inverse impossible spontanément → électrolyse.',
  },
  'equilibre-11': {
    steps: [
      { n: '1', text: '$K=1{,}0\\times 10^{8}$ est très grand ($>10^4$) : à l\'équilibre, $Q_r$ est très grand, donc les **produits dominent** très largement. La transformation est **quasi totale** ($\\tau\\approx 1$).' },
      { n: '2', text: '$K=1{,}0\\times 10^{-6}$ est très petit ($<10^{-4}$) : les **réactifs dominent**. La transformation est **très limitée** ($\\tau\\ll 1$).' },
    ],
    result: '$K=10^{8}$ : quasi totale. $K=10^{-6}$ : très limitée.',
  },
  'equilibre-12': {
    steps: [
      { n: '1', text: '**Dresser le tableau d\'avancement** et exprimer toutes les quantités (ou concentrations) en fonction de $x_f$.' },
      { n: '2', text: '**Écrire $Q_{r,\\text{éq}}$** en fonction de $x_f$, en excluant solides et solvant.' },
      { n: '3', text: '**Poser $Q_{r,\\text{éq}}=K$** — c\'est la condition d\'équilibre — et résoudre l\'équation obtenue en $x_f$.' },
      { n: '4', text: '**Sélectionner la racine physiquement acceptable** ($0\\leqslant x_f\\leqslant x_{\\max}$), puis calculer $\\tau=\\dfrac{x_f}{x_{\\max}}$ et vérifier en recalculant $Q_r$.' },
    ],
    result: 'Tableau d\'avancement → $Q_{r,\\text{éq}}(x_f)$ → poser $=K$ et résoudre → racine acceptable, $\\tau$ et vérification.',
  },
  'equilibre-13': {
    steps: [
      { n: '1', text: 'La réaction d\'un acide sur l\'eau s\'écrit $\\text{AH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{A}^-+\\text{H}_3\\text{O}^+$, d\'où $Q_r=\\dfrac{[\\text{A}^-]\\,[\\text{H}_3\\text{O}^+]}{[\\text{AH}]}$ (l\'eau, solvant, est exclue).' },
      { n: '2', text: 'À l\'équilibre, $K=Q_{r,\\text{éq}}$ : c\'est exactement la définition de $K_a$. Donc $K=K_a$.' },
      { n: '3', text: 'Un $K_a$ **très petit** signifie qu\'à l\'équilibre le numérateur (les produits) est très petit devant le dénominateur : l\'acide est **très peu dissocié**. C\'est un **acide faible**, et sa réaction avec l\'eau est très limitée ($\\tau\\ll 1$).' },
    ],
    result: '$K=K_a$ ; $K_a$ petit ⇒ acide faible, transformation limitée.',
  },
  'equilibre-14': {
    steps: [
      { n: '1', text: 'Autoprotolyse de l\'eau : $2\\,\\text{H}_2\\text{O}\\rightleftharpoons\\text{H}_3\\text{O}^++\\text{OH}^-$.' },
      { n: '2', text: 'L\'eau étant le solvant, elle est exclue de $Q_r$ : $Q_r=[\\text{H}_3\\text{O}^+]\\,[\\text{OH}^-]$.' },
      { n: '3', text: 'À l\'équilibre, $K=Q_{r,\\text{éq}}=[\\text{H}_3\\text{O}^+][\\text{OH}^-]$ : c\'est le **produit ionique de l\'eau** $K_e$.' },
      { n: '4', text: '$K_e=1{,}0\\times 10^{-14}$ est extrêmement petit : l\'autoprotolyse est une transformation **très limitée**. L\'eau est très faiblement ionisée — ce qui explique qu\'elle conduise très mal le courant à l\'état pur.' },
    ],
    result: '$2\\,\\text{H}_2\\text{O}\\rightleftharpoons\\text{H}_3\\text{O}^++\\text{OH}^-$ ; $K=K_e=1{,}0\\times 10^{-14}$ — transformation très limitée.',
  },
  'equilibre-15': {
    steps: [
      { n: '1', text: '$K_a=10^{-4{,}8}\\approx 1{,}6\\times 10^{-5}$. L\'acide étant peu dissocié : $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{K_a\\,c}$ et $\\tau\\approx\\sqrt{\\dfrac{K_a}{c}}$.' },
      { n: '2', text: 'Pour $c=5{,}0\\times 10^{-2}$ : $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{1{,}6\\times 10^{-5}\\times 5{,}0\\times 10^{-2}}\\approx 8{,}9\\times 10^{-4}\\,\\text{mol·L}^{-1}$, d\'où $\\text{pH}\\approx 3{,}05$ et $\\tau\\approx\\dfrac{8{,}9\\times 10^{-4}}{5{,}0\\times 10^{-2}}\\approx 1{,}8\\,\\%$.' },
      { n: '3', text: 'Pour $c=1{,}0\\times 10^{-3}$ : $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{1{,}6\\times 10^{-5}\\times 1{,}0\\times 10^{-3}}\\approx 1{,}3\\times 10^{-4}\\,\\text{mol·L}^{-1}$, d\'où $\\text{pH}\\approx 3{,}9$ et $\\tau\\approx 13\\,\\%$.' },
      { n: '4', text: '**Commentaire.** En diluant, $\\tau$ **augmente** (de $\\approx 2\\,\\%$ à $\\approx 13\\,\\%$) : la dissociation est plus poussée. Mais le pH **augmente** aussi (de $3{,}05$ à $3{,}9$) : la solution est **moins acide**. Les deux évolutions sont bien réelles et compatibles.' },
    ],
    result: '$c=5{,}0\\times 10^{-2}$ : $\\text{pH}\\approx 3{,}0$, $\\tau\\approx 1{,}8\\,\\%$ — $c=1{,}0\\times 10^{-3}$ : $\\text{pH}\\approx 3{,}9$, $\\tau\\approx 13\\,\\%$.',
  },
  'equilibre-16': {
    steps: [
      { n: '1', text: '**Même $K$ : OUI.** La constante d\'équilibre ne dépend que de la **réaction** et de la **température**. À température identique, $K$ est le même — les concentrations initiales n\'y changent rien.' },
      { n: '2', text: '**Même $\\tau$ : NON, en général.** Le taux d\'avancement final dépend de l\'**état initial** : concentrations, proportions des réactifs, dilution. Deux expériences de même $K$ peuvent parfaitement donner des $\\tau$ très différents.' },
    ],
    result: '$K$ identique ; $\\tau$ en général différent.',
  },
  'equilibre-17': {
    steps: [
      { n: '1', text: '**$K$ : non.** $K$ ne dépend que de la réaction et de la température. Un catalyseur ne la modifie pas.' },
      { n: '2', text: '**$\\tau$ : non.** L\'état final est fixé par $K$ et l\'état initial. Le catalyseur ne change ni l\'un ni l\'autre : le système atteint le **même état d\'équilibre**.' },
      { n: '3', text: '**La durée : oui.** C\'est là — et là seulement — que le catalyseur agit : il permet d\'atteindre **plus vite** le même état final.' },
      { n: '4', text: 'C\'est la distinction fondamentale : la **cinétique** gouverne la durée du trajet, la **thermodynamique** ($K$) gouverne la destination.' },
    ],
    result: '$K$ inchangé · $\\tau$ inchangé · durée réduite.',
  },
  'equilibre-18': {
    steps: [
      { n: '1', text: 'Les nombres stœchiométriques deviennent les **exposants**, et l\'eau (solvant) est **exclue** :' },
      { n: '2', text: '$Q_r=\\dfrac{[\\text{Mn}^{2+}]\\,[\\text{Fe}^{3+}]^5}{[\\text{MnO}_4^-]\\,[\\text{Fe}^{2+}]^5\\,[\\text{H}^+]^8}$.' },
      { n: '3', text: 'Erreurs classiques : oublier les exposants $5$ et $8$, ou faire figurer $\\text{H}_2\\text{O}$ au numérateur.' },
    ],
    result: '$Q_r=\\dfrac{[\\text{Mn}^{2+}][\\text{Fe}^{3+}]^5}{[\\text{MnO}_4^-][\\text{Fe}^{2+}]^5[\\text{H}^+]^8}$.',
  },
  'equilibre-19': {
    steps: [
      { n: 'a', text: '**Avancement maximal.** Les réactifs sont en quantités égales ($2{,}0$ et $2{,}0\\,\\text{mol}$) et de nombres stœchiométriques $1$ : ils s\'épuisent ensemble, donc $x_{\\max}=2{,}0\\,\\text{mol}$.' },
      { n: 'b', text: '**Quotient à l\'équilibre.** À l\'avancement $x_f$ : acide $2-x_f$, alcool $2-x_f$, ester $x_f$, eau $x_f$. Le volume se simplifiant : $Q_{r,\\text{éq}}=\\dfrac{x_f^2}{(2-x_f)^2}=K=4{,}0$.' },
      { n: 'c', text: '**Résolution.** En passant à la racine (les deux membres sont positifs) : $\\dfrac{x_f}{2-x_f}=2$, d\'où $x_f=4-2x_f$, soit $3x_f=4$ et $x_f=\\dfrac{4}{3}\\approx 1{,}33\\,\\text{mol}$. Puis $\\tau=\\dfrac{x_f}{x_{\\max}}=\\dfrac{4/3}{2{,}0}=\\dfrac{2}{3}\\approx 0{,}667$, soit $66{,}7\\,\\%$.' },
      { n: 'd', text: '**Vérification.** $Q_r=\\dfrac{(1{,}333)^2}{(0{,}667)^2}=4{,}0$ ✓.' },
    ],
    result: '$x_{\\max}=2{,}0\\,\\text{mol}$ · $x_f\\approx 1{,}33\\,\\text{mol}$ · $\\tau\\approx 67\\,\\%$.',
  },
  'equilibre-20': {
    steps: [
      { n: '1', text: 'Il n\'y a contradiction que si l\'on confond deux grandeurs différentes.' },
      { n: '2', text: '$\\tau$ est un **pourcentage** : c\'est la **proportion** de molécules d\'acide qui se sont dissociées. Le pH mesure la **concentration absolue** en $\\text{H}_3\\text{O}^+$.' },
      { n: '3', text: 'En diluant, une **plus grande fraction** de l\'acide se dissocie ($\\tau$ augmente), mais cette fraction porte sur une **quantité totale bien plus petite**. Le produit des deux — la concentration en $\\text{H}_3\\text{O}^+$ — **diminue** malgré tout.' },
      { n: '4', text: 'Image : $80\\,\\%$ d\'un petit gâteau reste moins que $10\\,\\%$ d\'un gâteau cent fois plus grand. Un pourcentage plus élevé d\'une quantité plus faible peut donner un résultat plus faible.' },
    ],
    result: '$\\tau$ est une proportion, le pH une concentration : aucune contradiction.',
  },
  'equilibre-21': {
    steps: [
      { n: 'a', text: '$\\text{HCOOH}+\\text{H}_2\\text{O}\\rightleftharpoons\\text{HCOO}^-+\\text{H}_3\\text{O}^+$, d\'où $Q_r=\\dfrac{[\\text{HCOO}^-]\\,[\\text{H}_3\\text{O}^+]}{[\\text{HCOOH}]}$. L\'eau est le **solvant** : présente en très large excès, sa concentration est quasi constante et elle est exclue de $Q_r$ par convention.' },
      { n: 'b', text: '$K=Q_{r,\\text{éq}}$ : c\'est la **constante d\'acidité $K_a$** du couple. $K=K_a=10^{-\\text{p}K_a}=10^{-3{,}8}\\approx 1{,}6\\times 10^{-4}$. $K$ est **très petit** : à l\'équilibre les réactifs dominent largement. La transformation est **limitée** — l\'acide méthanoïque est bien un **acide faible**.' },
      { n: 'c', text: 'À l\'instant initial, il n\'y a **que des réactifs** (l\'acide et l\'eau) : aucun produit, donc $Q_{r,i}=0$. Comme $K>0$, on a $Q_{r,i}=0<K$ : le système évolue nécessairement dans le **sens direct**. Aucun calcul n\'est nécessaire.' },
      { n: 'd', text: 'L\'acide étant faible et peu dissocié : $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{K_a\\,c}=\\sqrt{1{,}585\\times 10^{-4}\\times 0{,}10}\\approx 4{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$. $\\text{pH}=-\\log(4{,}0\\times 10^{-3})\\approx 2{,}4$.' },
      { n: 'e', text: 'Si la réaction était totale, on aurait $[\\text{H}_3\\text{O}^+]=c$. Donc $\\tau=\\dfrac{[\\text{H}_3\\text{O}^+]}{c}=\\dfrac{4{,}0\\times 10^{-3}}{0{,}10}\\approx 4{,}0\\,\\%$ : la transformation est bien **très limitée**, ce que $K$ laissait prévoir.' },
      { n: 'f', text: 'Après dilution $100$ fois : $c\'=1{,}0\\times 10^{-3}\\,\\text{mol·L}^{-1}$. $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{1{,}585\\times 10^{-4}\\times 1{,}0\\times 10^{-3}}\\approx 4{,}0\\times 10^{-4}$, d\'où $\\text{pH}\\approx 3{,}4$ et $\\tau\'\\approx 40\\,\\%$. Comme $\\tau\\approx\\sqrt{K_a/c}$, diviser $c$ par $100$ multiplie $\\tau$ par $\\sqrt{100}=\\mathbf{10}$ : on passe bien de $4{,}0\\,\\%$ à $40\\,\\%$. **$K$ n\'a pas changé** : elle ne dépend que de la réaction et de la température, jamais de la dilution. Diluer un acide faible le rend **relativement plus dissocié** ($\\tau$ augmente) tout en le rendant **moins acide** (le pH augmente) : aucune contradiction, $\\tau$ est une proportion, le pH une concentration.' },
      { n: 'g', text: '**Remarque de rigueur.** L\'approximation $[\\text{H}_3\\text{O}^+]\\approx\\sqrt{K_a c}$ suppose l\'acide **peu dissocié**. À $c=0{,}10$ elle est excellente ($\\tau\\approx 4\\,\\%$, erreur $2\\,\\%$). À $c=1{,}0\\times 10^{-3}$, $\\tau$ atteint $40\\,\\%$ : l\'hypothèse est à la limite. La résolution exacte donnerait $\\tau\\approx 33\\,\\%$ et $\\text{pH}\\approx 3{,}5$. La conclusion qualitative — $\\tau$ augmente fortement, $K$ inchangée — reste rigoureusement valable.' },
    ],
    result: '$K=K_a\\approx 1{,}6\\times 10^{-4}$ · $\\text{pH}\\approx 2{,}4$ · $\\tau\\approx 4{,}0\\,\\%$ → dilué : $\\text{pH}\\approx 3{,}4$, $\\tau\\approx 40\\,\\%$ (facteur $10$), $K$ inchangée.',
  },
  'equilibre-22': {
    steps: [
      { n: 'a', text: '$\\text{Zn}_{(s)}$ et $\\text{Cu}_{(s)}$ sont des **solides** : ils sont exclus de $Q_r$. Seuls les ions en solution interviennent : $Q_r=\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$, d\'où $Q_{r,i}=\\dfrac{0{,}10}{0{,}010}=10$.' },
      { n: 'b', text: '$Q_{r,i}=10$ et $K=1{,}9\\times 10^{37}$ : $Q_{r,i}\\lll K$. Le système évolue donc dans le **sens direct** ($\\to$) afin de rapprocher $Q_r$ de $K$.' },
      { n: 'c', text: 'Dans le sens direct, $\\text{Zn}_{(s)}$ est consommé et $\\text{Zn}^{2+}$ est formé : le zinc **perd des électrons**, il est donc le siège de l\'**oxydation**. Or l\'électrode siège de l\'oxydation est l\'**anode** ; dans une **pile**, l\'anode est le pôle **négatif** (les électrons quittent l\'électrode de zinc et partent dans le circuit extérieur).' },
      { n: 'd', text: '$K=1{,}9\\times 10^{37}$ est **gigantesque** ($\\ggg 10^4$) : à l\'équilibre, les produits dominent de façon écrasante. La transformation est donc **quasi totale** : la pile fonctionnera jusqu\'à épuisement quasi complet du réactif limitant.' },
      { n: 'e', text: 'Il faudrait $Q_{r,i}>K$, soit $\\dfrac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}>1{,}9\\times 10^{37}$ : c\'est **physiquement inatteignable** (il faudrait une concentration en $\\text{Cu}^{2+}$ inférieure à une fraction d\'ion par litre). Ce n\'est donc **pas réalisable spontanément**. En pratique, on impose le sens inverse par **électrolyse** : un générateur extérieur force le transfert d\'électrons contre le sens spontané.' },
    ],
    result: '$Q_{r,i}=10\\lll K$ ⇒ sens direct · Zn : oxydation, anode, pôle négatif · $K$ énorme ⇒ quasi totale · sens inverse : électrolyse seulement.',
  },
  'equilibre-23': {
    steps: [
      { n: 'a', text: '**Tableau d\'avancement** (en mol) — initial : acide $1{,}0$, alcool $3{,}0$, ester $0$, eau $0$ ; en cours ($x$) : acide $1{,}0-x$, alcool $3{,}0-x$, ester $x$, eau $x$. L\'acide s\'annule pour $x=1{,}0$, l\'alcool pour $x=3{,}0$ : le **réactif limitant** est l\'**acide**, et $x_{\\max}=1{,}0\\,\\text{mol}$.' },
      { n: 'b', text: 'Le volume se simplifiant (autant d\'espèces au numérateur qu\'au dénominateur) : $Q_{r,\\text{éq}}=\\dfrac{x_f^2}{(1-x_f)(3-x_f)}=K=4{,}0$. D\'où $x_f^2=4(1-x_f)(3-x_f)=4(3-4x_f+x_f^2)=12-16x_f+4x_f^2$, soit $3x_f^2-16x_f+12=0$.' },
      { n: 'c', text: '$\\Delta=(-16)^2-4\\times 3\\times 12=256-144=112$, $\\sqrt{112}\\approx 10{,}58$. $x_f=\\dfrac{16\\pm 10{,}58}{6}$ : les racines sont $x_f\\approx 0{,}90$ et $x_f\\approx 4{,}43$. La racine $4{,}43$ est **à rejeter** : elle dépasse $x_{\\max}=1{,}0$ — on ne peut pas consommer plus d\'acide qu\'il n\'y en a. On retient $x_f\\approx 0{,}90\\,\\text{mol}$.' },
      { n: 'd', text: '$\\tau=\\dfrac{x_f}{x_{\\max}}=\\dfrac{0{,}903}{1{,}0}\\approx 0{,}90$, soit $90\\,\\%$. Vérification : $Q_r=\\dfrac{(0{,}903)^2}{(1-0{,}903)(3-0{,}903)}=\\dfrac{0{,}815}{0{,}097\\times 2{,}097}=\\dfrac{0{,}815}{0{,}204}\\approx 4{,}0$ ✓ — on retrouve bien $K$.' },
      { n: 'e', text: 'Avec un mélange équimolaire, $\\tau=67\\,\\%$ ; avec l\'alcool en excès, $\\tau=90\\,\\%$. Utiliser un **réactif en excès déplace l\'équilibre** dans le sens direct et **augmente le taux d\'avancement** du réactif limitant : c\'est le procédé standard en synthèse organique pour mieux valoriser le réactif coûteux. En revanche, **$K$ n\'a pas changé** : elle vaut toujours $4{,}0$. C\'est bien la même constante qui, appliquée à un **état initial différent**, conduit à un $\\tau$ différent. $K$ fixe la règle du jeu ; l\'état initial fixe le résultat.' },
    ],
    result: '$x_{\\max}=1{,}0\\,\\text{mol}$ (acide limitant) · $3x_f^2-16x_f+12=0$, $\\Delta=112$ · $x_f\\approx 0{,}90\\,\\text{mol}$ · $\\tau\\approx 90\\,\\%$ contre $67\\,\\%$ — $K=4{,}0$ inchangée.',
  },
};
