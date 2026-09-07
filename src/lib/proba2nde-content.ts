import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ─────────────────────────────────────────────────────────────────
export const PROBA2NDE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Un univers compte 8 issues équiprobables et l\'événement $A$ en contient 3. Alors $P(A)$ vaut :',
    options: [
      { label: 'a', text: '$3$' },
      { label: 'b', text: '$\\dfrac{3}{8}$' },
      { label: 'c', text: '$\\dfrac{8}{3}$' },
      { label: 'd', text: '$\\dfrac{1}{8}$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Si $P(A) = 0{,}3$, alors $P(\\bar{A})$ vaut :',
    options: [
      { label: 'a', text: '$0{,}3$' },
      { label: 'b', text: '$-0{,}3$' },
      { label: 'c', text: '$0{,}7$' },
      { label: 'd', text: '$1{,}3$' },
    ],
    answer: 'c',
  },
  {
    n: 3,
    text: '$A$ et $B$ sont incompatibles, $P(A)=0{,}3$ et $P(B)=0{,}5$. Alors $P(A\\cup B)$ vaut :',
    options: [
      { label: 'a', text: '$0{,}15$' },
      { label: 'b', text: '$0{,}2$' },
      { label: 'c', text: '$0{,}8$' },
      { label: 'd', text: 'on ne peut pas savoir' },
    ],
    answer: 'c',
  },
  {
    n: 4,
    text: '$P(A)=0{,}5$, $P(B)=0{,}6$ et $P(A\\cap B)=0{,}35$. Alors $P(A\\cup B)$ vaut :',
    options: [
      { label: 'a', text: '$1$' },
      { label: 'b', text: '$0{,}75$' },
      { label: 'c', text: '$0{,}25$' },
      { label: 'd', text: '$0{,}85$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'On lance deux dés équilibrés. La probabilité que la somme vaille 5 est :',
    options: [
      { label: 'a', text: '$\\dfrac{5}{36}$' },
      { label: 'b', text: '$\\dfrac{1}{9}$' },
      { label: 'c', text: '$\\dfrac{5}{6}$' },
      { label: 'd', text: '$\\dfrac{1}{6}$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Une expérience a quatre issues de probabilités $0{,}25$, $0{,}35$, $0{,}15$ et $p_4$. Alors $p_4$ vaut :',
    options: [
      { label: 'a', text: '$0{,}75$' },
      { label: 'b', text: '$0{,}25$' },
      { label: 'c', text: '$0{,}15$' },
      { label: 'd', text: '$1$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'Un tableau définit une loi de probabilité valide si :',
    options: [
      { label: 'a', text: 'toutes les valeurs sont égales' },
      { label: 'b', text: 'leur somme vaut $1$' },
      { label: 'c', text: 'leur somme vaut $100$' },
      { label: 'd', text: 'il y a au moins deux issues' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Pour $n=400$, le rayon de l\'intervalle de fluctuation au seuil de 95 % vaut :',
    options: [
      { label: 'a', text: '$0{,}0025$' },
      { label: 'b', text: '$0{,}02$' },
      { label: 'c', text: '$0{,}05$' },
      { label: 'd', text: '$20$' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: 'On teste $p=0{,}6$ sur un échantillon de 100 personnes et l\'on observe $f=0{,}65$. On doit :',
    options: [
      { label: 'a', text: 'rejeter l\'hypothèse' },
      { label: 'b', text: 'ne pas rejeter l\'hypothèse' },
      { label: 'c', text: 'refaire le calcul' },
      { label: 'd', text: 'conclure que $p=0{,}65$' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Pour diviser par 10 le rayon de l\'intervalle de fluctuation, il faut multiplier $n$ par :',
    options: [
      { label: 'a', text: '$10$' },
      { label: 'b', text: '$20$' },
      { label: 'c', text: '$100$' },
      { label: 'd', text: '$1\\,000$' },
    ],
    answer: 'c',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const PROBA2NDE_EXERCISES: ExerciseContent[] = [
  // ── Partie A — Automatismes ★ ─────────────────────────────────────────────
  {
    id: 'proba2nde-1',
    title: 'Univers et loi',
    subject: 'Une roue est partagée en 8 secteurs identiques : 3 rouges, 2 verts et 3 bleus.',
    questions: [
      { n: 1, text: 'Décrire l\'univers de l\'expérience.' },
      { n: 2, text: 'Justifier l\'équiprobabilité, puis donner la loi de probabilité sur les couleurs.' },
      { n: 3, text: 'Vérifier que la somme des probabilités vaut 1.' },
      { n: 4, text: 'Calculer la probabilité de ne pas obtenir rouge.' },
    ],
  },
  {
    id: 'proba2nde-2',
    title: 'Loi incomplète',
    subject: 'Une expérience a quatre issues $e_1$, $e_2$, $e_3$, $e_4$ avec probabilités $0{,}2$, $0{,}35$, $0{,}15$ et $p_4$.',
    questions: [
      { n: 1, text: 'Déterminer $p_4$.' },
      { n: 2, text: 'Calculer $P(\\{e_2, e_3\\})$.' },
    ],
  },
  {
    id: 'proba2nde-3',
    title: 'Tirage dans une urne',
    subject: 'Une urne contient 5 boules rouges, 3 vertes et 2 jaunes, indiscernables au toucher. On en tire une au hasard.',
    questions: [
      { n: 1, text: 'Décrire l\'univers et donner la loi de probabilité.' },
      { n: 2, text: 'Calculer la probabilité d\'obtenir une boule rouge ou verte.' },
      { n: 3, text: 'Calculer la probabilité de ne pas obtenir une boule jaune, de deux façons.' },
    ],
  },
  {
    id: 'proba2nde-4',
    title: 'Événements incompatibles',
    subject: 'On lance un dé équilibré à six faces. $A$ = « multiple de 3 », $B$ = « nombre ≤ 2 ».',
    questions: [
      { n: 1, text: 'Écrire $A$ et $B$ en extension, puis calculer $P(A)$ et $P(B)$.' },
      { n: 2, text: 'Déterminer $A\\cap B$. Que peut-on en conclure ?' },
      { n: 3, text: 'En déduire $P(A\\cup B)$.' },
    ],
  },
  {
    id: 'proba2nde-5',
    title: 'Formule de la réunion',
    subject: 'Deux événements $A$ et $B$ : $P(A)=0{,}4$, $P(B)=0{,}5$, $P(A\\cap B)=0{,}2$.',
    questions: [
      { n: 1, text: 'Calculer $P(A\\cup B)$.' },
      { n: 2, text: 'Calculer $P(\\bar{A})$.' },
      { n: 3, text: '$A$ et $B$ sont-ils incompatibles ?' },
    ],
  },
  {
    id: 'proba2nde-6',
    title: 'Deux dés',
    subject: 'On lance deux dés équilibrés à six faces et on note le couple des faces (36 issues équiprobables).',
    questions: [
      { n: 1, text: 'Calculer la probabilité que la somme vaille 6.' },
      { n: 2, text: 'Calculer la probabilité que la somme soit impaire.' },
      { n: 3, text: 'Calculer la probabilité que le produit dépasse 20.' },
      { n: 4, text: 'Calculer la probabilité d\'obtenir au moins un 6.' },
    ],
  },
  {
    id: 'proba2nde-7',
    title: 'Arbre — 3 lancers',
    subject: 'On lance trois fois de suite une pièce équilibrée.',
    questions: [
      { n: 1, text: 'Construire l\'arbre et justifier qu\'il y a 8 issues équiprobables.' },
      { n: 2, text: 'Calculer la probabilité d\'obtenir exactement deux Piles.' },
      { n: 3, text: 'Calculer la probabilité d\'obtenir au moins un Pile via l\'événement contraire.' },
    ],
  },
  {
    id: 'proba2nde-8',
    title: 'Tableau à double entrée',
    subject: 'Sur 200 personnes, 88 sont des femmes dont 55 abonnées streaming ; parmi les 112 hommes, 49 sont abonnés.',
    questions: [
      { n: 1, text: 'Recopier et compléter le tableau à double entrée avec les totaux.' },
      { n: 2, text: 'Calculer la probabilité que la personne soit abonnée.' },
      { n: 3, text: 'Calculer la probabilité qu\'elle soit une femme et abonnée.' },
      { n: 4, text: 'Calculer la probabilité qu\'elle soit une femme ou abonnée, puis vérifier.' },
    ],
  },
  // ── Partie B — Méthodes ★★ ────────────────────────────────────────────────
  {
    id: 'proba2nde-9',
    title: 'Calculer un intervalle de fluctuation',
    subject: '',
    questions: [
      { n: 1, text: 'Donner l\'intervalle de fluctuation au seuil 95 % pour $p=0{,}5$, $n=100$.' },
      { n: 2, text: 'Idem pour $p=0{,}4$, $n=400$.' },
      { n: 3, text: 'Idem pour $p=0{,}7$, $n=250$ (bornes arrondies au millième).' },
    ],
  },
  {
    id: 'proba2nde-10',
    title: 'Prendre une décision',
    subject: 'Un candidat à une élection affirme représenter la moitié des électeurs. Lors d\'un sondage, 61 personnes sur 100 interrogées se déclarent favorables à sa candidature.',
    questions: [
      { n: 1, text: 'Poser l\'hypothèse $H$ sur $p$.' },
      { n: 2, text: 'Calculer l\'intervalle de fluctuation au seuil de 95 %.' },
      { n: 3, text: 'Calculer la fréquence observée et conclure.' },
    ],
  },
  {
    id: 'proba2nde-11',
    title: 'Rédiger une conclusion',
    subject: 'Une entreprise affirme que 30 % de ses clients ont moins de 25 ans. Sur 900 clients, 261 ont moins de 25 ans.',
    questions: [
      { n: 1, text: 'Calculer l\'intervalle de fluctuation sous l\'hypothèse $p=0{,}3$.' },
      { n: 2, text: 'Calculer la fréquence observée et conclure.' },
      { n: 3, text: 'Corriger la phrase : « on a démontré que $p=30\\%$ ».' },
    ],
  },
  {
    id: 'proba2nde-12',
    title: 'Effet de la taille',
    subject: '',
    questions: [
      { n: 1, text: 'Calculer le rayon de l\'intervalle pour $n=100$, puis $n=400$, puis $n=1000$.' },
      { n: 2, text: 'Par combien multiplier $n$ pour diviser le rayon par 2 ? Par 5 ?' },
      { n: 3, text: 'Un institut veut un rayon de $0{,}02$. Quelle taille d\'échantillon prévoir ?' },
    ],
  },
  {
    id: 'proba2nde-13',
    title: 'Événement contraire',
    subject: '',
    questions: [
      { n: 1, text: 'Probabilité d\'obtenir au moins un Pile en 4 lancers d\'une pièce équilibrée.' },
      { n: 2, text: 'Probabilité d\'obtenir au moins un 6 en lançant deux dés.' },
      { n: 3, text: 'Probabilité d\'obtenir au moins une boule rouge en tirant 2 fois avec remise dans une urne (1 rouge, 2 vertes).' },
    ],
  },
  {
    id: 'proba2nde-14',
    title: 'Arbre pondéré',
    subject: 'Urne : 1 boule rouge, 2 vertes. Tirage avec remise, deux fois.',
    questions: [
      { n: 1, text: 'Construire l\'arbre avec probabilités sur chaque branche.' },
      { n: 2, text: 'Calculer la probabilité d\'obtenir deux rouges, puis deux vertes.' },
      { n: 3, text: 'Calculer la probabilité d\'obtenir exactement une rouge.' },
      { n: 4, text: 'Vérifier que la somme vaut 1.' },
    ],
  },
  {
    id: 'proba2nde-15',
    title: 'Loi non uniforme — dé truqué',
    subject: 'Un dé truqué suit la loi de probabilité suivante. Face : 1, 2, 3, 4, 5, 6. Probabilités : $0{,}1$; $0{,}1$; $0{,}15$; $0{,}15$; $0{,}2$; $p_6$.',
    questions: [
      { n: 1, text: 'Déterminer la probabilité manquante $p_6$.' },
      { n: 2, text: 'Ce dé est-il équitable ? Justifier.' },
      { n: 3, text: 'Calculer $P(\\text{face paire})$ et $P(\\text{face} \\geq 4)$.' },
      { n: 4, text: 'Calculer $P(\\text{face} \\neq 1)$ de deux façons différentes.' },
    ],
  },
  {
    id: 'proba2nde-16',
    title: 'Tableau à compléter',
    subject: 'Un café a servi 150 boissons : 90 cafés dont 54 avec sucre, et 60 thés dont 21 avec sucre.',
    questions: [
      { n: 1, text: 'Construire le tableau à double entrée complet.' },
      { n: 2, text: 'Calculer la probabilité que le client ait pris du sucre.' },
      { n: 3, text: 'Calculer $P(\\text{café})$ et $P(\\text{sans sucre})$.' },
      { n: 4, text: 'Vérifier $P(\\text{sucre ou café})$ par un dénombrement direct.' },
    ],
  },
  // ── Partie C — Situations complètes ★★★ ──────────────────────────────────
  {
    id: 'proba2nde-17',
    title: 'Deux tours de roue',
    subject: 'Roue de 8 secteurs identiques dont 3 rouges. On la fait tourner deux fois.',
    questions: [
      { n: 1, text: 'Justifier que $P(\\text{rouge}) = 3/8$ à chaque tour.' },
      { n: 2, text: 'Calculer la probabilité d\'obtenir deux fois rouge.' },
      { n: 3, text: 'Calculer la probabilité de n\'obtenir aucun rouge.' },
      { n: 4, text: 'En déduire la probabilité d\'obtenir au moins un rouge.' },
      { n: 5, text: 'Corriger l\'erreur : « en deux tours j\'ai $2\\times 3/8 = 6/8$ de chances ».' },
    ],
  },
  {
    id: 'proba2nde-18',
    title: 'Réunion et intersection',
    subject: 'Deux dés équilibrés. $A$ = « somme ≥ 10 », $B$ = « même résultat sur les deux dés ».',
    questions: [
      { n: 1, text: 'Dénombrer les issues de $A$, puis celles de $B$.' },
      { n: 2, text: 'Déterminer $A\\cap B$ en listant les couples.' },
      { n: 3, text: 'Calculer $P(A)$, $P(B)$, puis $P(A\\cup B)$ par la formule.' },
      { n: 4, text: 'Vérifier en dénombrant directement les issues de $A\\cup B$.' },
      { n: 5, text: '$A$ et $B$ sont-ils incompatibles ? Justifier.' },
    ],
  },
  {
    id: 'proba2nde-19',
    title: 'Lire une simulation',
    subject: 'On simule 30 sondages de 100 personnes dans une population où $p=0{,}5$. Les fréquences observées s\'étalent de $0{,}38$ à $0{,}63$, et 29 sondages sur 30 donnent une fréquence dans $[0{,}4\\,;\\,0{,}6]$.',
    questions: [
      { n: 1, text: 'Calculer l\'intervalle de fluctuation théorique au seuil de 95 %.' },
      { n: 2, text: '1 sondage sur 30 sort de l\'intervalle. Est-ce cohérent avec le seuil de 95 % ? Justifier.' },
      { n: 3, text: 'Un sondage donne $f=0{,}62$. Peut-on conclure que $p\\neq 0{,}5$ ? Nuancer la réponse.' },
    ],
  },
  {
    id: 'proba2nde-20',
    title: 'Décision serrée',
    subject: 'Référendum annoncé 50/50. Institut interroge 625 personnes : 340 votent oui.',
    questions: [
      { n: 1, text: 'Calculer la fréquence observée.' },
      { n: 2, text: 'Calculer l\'intervalle de fluctuation sous $H : p=0{,}5$.' },
      { n: 3, text: 'Conclure au seuil de 95 %.' },
      { n: 4, text: 'Avec $n=100$ et même fréquence, la conclusion change-t-elle ?' },
    ],
  },
  {
    id: 'proba2nde-21',
    title: 'Tableau et réunion',
    subject: 'Lycée de 300 élèves : 120 internes. Parmi les internes, 84 font du sport en club ; parmi les 180 externes, 96.',
    questions: [
      { n: 1, text: 'Construire le tableau à double entrée complet.' },
      { n: 2, text: 'Calculer la probabilité de pratiquer un sport en club.' },
      { n: 3, text: 'Calculer $P(\\text{interne})$ et $P(\\text{sport})$.' },
      { n: 4, text: 'Calculer $P(\\text{externe et sans sport})$.' },
      { n: 5, text: 'Vérifier que la somme des quatre cases vaut 1.' },
    ],
  },
  {
    id: 'proba2nde-22',
    title: 'Synthèse — pièce truquée',
    subject: 'Pièce truquée : $P(\\text{Pile}) = 2/3$. Lancée deux fois de suite.',
    questions: [
      { n: 1, text: 'Construire l\'arbre pondéré des deux lancers.' },
      { n: 2, text: 'Calculer $P(\\text{PP})$ puis $P(\\text{FF})$.' },
      { n: 3, text: 'Calculer $P(\\text{exactement un Pile})$ et vérifier la somme.' },
      { n: 4, text: 'On lance 100 fois et on obtient 66 Piles. Tester $H : p=2/3$ au seuil 95 %.' },
    ],
  },
  // ── Partie D — Problèmes ◆ ────────────────────────────────────────────────
  {
    id: 'proba2nde-pb1',
    title: 'Problème 1 — Ce dé est-il truqué ?',
    subject: 'Un dé est lancé 300 fois : on obtient les effectifs 42, 48, 51, 47, 53, 59 pour les faces 1 à 6.',
    questions: [
      { n: 1, text: 'Probabilité de chaque face si le dé est équilibré (décimale arrondie au millième).' },
      { n: 2, text: 'Calculer la fréquence observée de chaque face.' },
      { n: 3, text: 'Calculer l\'intervalle de fluctuation pour la face 6 sous $H : p=1/6$.' },
      { n: 4, text: 'Peut-on affirmer au seuil 95 % que le dé est truqué ?' },
      { n: 5, text: 'Même calcul avec 3 000 lancers (mêmes fréquences). Conclure.' },
      { n: 6, text: 'Pourquoi les conclusions diffèrent alors que les fréquences sont identiques ?' },
    ],
  },
  {
    id: 'proba2nde-pb2',
    title: 'Problème 2 — Sondage au lycée',
    subject: 'Un lycée accueille 400 élèves. Un sondage sur l\'adhésion à un nouveau projet donne le tableau suivant.\n\nFavorable : Secondes 80, Premières 52, Terminales 28.\nDéfavorable : Secondes 60, Premières 98, Terminales 82.',
    questions: [
      { n: 1, text: 'Recopier et compléter le tableau avec les totaux de chaque ligne et colonne.' },
      { n: 2, text: 'On choisit un élève au hasard. Calculer $P(\\text{favorable au projet})$.' },
      { n: 3, text: 'Calculer $P(\\text{élève de Terminale})$.' },
      { n: 4, text: 'Calculer $P(\\text{Terminale et défavorable})$.' },
      { n: 5, text: 'Comparer la proportion d\'élèves favorables en Terminale à celle de l\'ensemble du lycée. Conclure.' },
      { n: 6, text: 'Comparer la proportion de favorables dans chaque niveau. Que peut-on observer ?' },
    ],
  },
  {
    id: 'proba2nde-pb3',
    title: 'Problème 3 — Le taux de germination',
    subject: 'Un semencier garantit un taux de germination de 80 %. Deux contrôles sont effectués : contrôle A sur 100 graines (84 ont germé), contrôle B sur 900 graines (756 ont germé).',
    questions: [
      { n: 1, text: 'Calculer la fréquence de germination pour chaque contrôle.' },
      { n: 2, text: 'Poser l\'hypothèse $H$ testée lors d\'un contrôle.' },
      { n: 3, text: 'Calculer l\'intervalle de fluctuation pour le contrôle A ($n=100$) et conclure.' },
      { n: 4, text: 'Calculer l\'intervalle de fluctuation pour le contrôle B ($n=900$) et conclure.' },
      { n: 5, text: 'Les deux contrôles donnent la même fréquence. Pourquoi les conclusions peuvent-elles différer ?' },
      { n: 6, text: 'Quelle taille d\'échantillon permettrait d\'avoir un intervalle de rayon $0{,}01$ ?' },
    ],
  },
];

// ── Corrections ────────────────────────────────────────────────────────────────
export const PROBA2NDE_CORRECTIONS: Record<string, Correction> = {
  'proba2nde-1': {
    steps: [
      { title: 'Univers', text: '$\\Omega = \\{\\text{rouge, vert, bleu}\\}$ (trois issues possibles).' },
      { title: 'Équiprobabilité', text: 'Les 8 secteurs sont identiques (même angle) → équiprobabilité sur les secteurs.' },
      { title: 'Loi', tex: 'P(\\text{rouge}) = \\tfrac{3}{8} \\quad P(\\text{vert}) = \\tfrac{2}{8} = \\tfrac{1}{4} \\quad P(\\text{bleu}) = \\tfrac{3}{8}' },
      { title: 'Vérification', tex: '\\tfrac{3}{8}+\\tfrac{2}{8}+\\tfrac{3}{8} = \\tfrac{8}{8} = 1 \\checkmark' },
      { title: 'Pas rouge', tex: 'P(\\overline{\\text{rouge}}) = 1 - \\tfrac{3}{8} = \\tfrac{5}{8}' },
    ],
  },
  'proba2nde-2': {
    steps: [
      { title: 'p4', tex: 'p_4 = 1 - (0{,}2 + 0{,}35 + 0{,}15) = 1 - 0{,}7 = 0{,}3' },
      { title: 'P(e2, e3)', tex: 'P(\\{e_2, e_3\\}) = 0{,}35 + 0{,}15 = 0{,}5' },
    ],
  },
  'proba2nde-3': {
    steps: [
      { title: 'Loi', tex: 'P(\\text{rouge}) = \\tfrac{5}{10} = 0{,}5 \\quad P(\\text{verte}) = \\tfrac{3}{10} = 0{,}3 \\quad P(\\text{jaune}) = \\tfrac{2}{10} = 0{,}2' },
      { title: 'Rouge ou verte', tex: 'P(R\\cup V) = 0{,}5 + 0{,}3 = 0{,}8 \\quad (\\text{incompatibles})' },
      { title: 'Pas jaune', tex: 'P(\\overline{J}) = 1 - 0{,}2 = 0{,}8 \\quad \\text{ou} \\quad P(R)+P(V) = 0{,}8' },
    ],
  },
  'proba2nde-4': {
    steps: [
      { title: 'Événements', text: '$A=\\{3;6\\}$, $P(A)=2/6=1/3$. $B=\\{1;2\\}$, $P(B)=2/6=1/3$.' },
      { title: 'Intersection', text: '$A\\cap B=\\emptyset$ : $A$ et $B$ sont incompatibles (aucune issue commune).' },
      { title: 'Réunion', tex: 'P(A\\cup B) = P(A)+P(B) = \\tfrac{1}{3}+\\tfrac{1}{3} = \\tfrac{2}{3}' },
    ],
  },
  'proba2nde-5': {
    steps: [
      { title: 'Réunion', tex: 'P(A\\cup B) = P(A)+P(B)-P(A\\cap B) = 0{,}4+0{,}5-0{,}2 = 0{,}7' },
      { title: 'Contraire', tex: 'P(\\bar{A}) = 1 - 0{,}4 = 0{,}6' },
      { title: 'Incompatibilité', text: 'Non : $P(A\\cap B)=0{,}2\\neq 0$ donc $A$ et $B$ ont des issues communes.' },
    ],
  },
  'proba2nde-6': {
    steps: [
      { title: 'Somme = 6', text: 'Couples : (1,5),(2,4),(3,3),(4,2),(5,1) → 5 couples.', tex: 'P = \\tfrac{5}{36}' },
      { title: 'Somme impaire', text: 'Pair+Impair ou Impair+Pair : 3×3+3×3=18 couples.', tex: 'P = \\tfrac{18}{36} = \\tfrac{1}{2}' },
      { title: 'Produit > 20', text: '(4,6),(5,5),(5,6),(6,4),(6,5),(6,6) → 6 couples.', tex: 'P = \\tfrac{6}{36} = \\tfrac{1}{6}' },
      { title: 'Au moins un 6', tex: 'P(\\bar{A}) = (\\tfrac{5}{6})^2 = \\tfrac{25}{36} \\Rightarrow P(A) = 1-\\tfrac{25}{36} = \\tfrac{11}{36}' },
    ],
  },
  'proba2nde-7': {
    steps: [
      { title: 'Arbre', text: '3 lancers binaires → $2^3=8$ issues. Chaque chemin a prob. $(1/2)^3=1/8$ → équiprobables.' },
      { title: '2 Piles exactement', text: 'Issues PPF, PFP, FPP → 3 chemins.', tex: 'P = \\tfrac{3}{8}' },
      { title: 'Au moins 1 Pile', tex: 'P(\\overline{\\text{aucun Pile}}) = 1 - P(\\text{FFF}) = 1 - \\tfrac{1}{8} = \\tfrac{7}{8}' },
    ],
  },
  'proba2nde-8': {
    steps: [
      { title: 'Tableau', text: 'Femmes abonnées : 55, femmes non abonnées : 33, hommes abonnés : 49, non : 63. Total abonnés : 104.' },
      { title: 'Abonnée', tex: 'P = \\tfrac{104}{200} = 0{,}52' },
      { title: 'Femme et abonnée', tex: 'P = \\tfrac{55}{200} = 0{,}275' },
      { title: 'Femme ou abonnée', tex: 'P = \\tfrac{88}{200}+\\tfrac{104}{200}-\\tfrac{55}{200} = \\tfrac{137}{200} = 0{,}685' },
    ],
  },
  'proba2nde-9': {
    steps: [
      { title: 'n=100, p=0,5', tex: '\\left[0{,}5 - \\tfrac{1}{\\sqrt{100}};\\; 0{,}5 + \\tfrac{1}{\\sqrt{100}}\\right] = [0{,}4\\,;\\,0{,}6]' },
      { title: 'n=400, p=0,4', tex: '\\left[0{,}4 - \\tfrac{1}{\\sqrt{400}};\\; 0{,}4 + \\tfrac{1}{\\sqrt{400}}\\right] = [0{,}35\\,;\\,0{,}45]' },
      { title: 'n=250, p=0,7', tex: '\\left[0{,}7 - \\tfrac{1}{\\sqrt{250}};\\; 0{,}7 + \\tfrac{1}{\\sqrt{250}}\\right] \\approx [0{,}637\\,;\\,0{,}763]' },
    ],
  },
  'proba2nde-10': {
    steps: [
      { title: 'Hypothèse', text: '$H : p = 0{,}5$ (la moitié des électeurs lui sont favorables).' },
      { title: 'Intervalle', tex: '\\left[0{,}5 - \\tfrac{1}{\\sqrt{100}};\\; 0{,}5 + \\tfrac{1}{\\sqrt{100}}\\right] = [0{,}5-0{,}1\\,;\\,0{,}5+0{,}1] = [0{,}4\\,;\\,0{,}6]' },
      { title: 'Conclusion', tex: 'f = \\tfrac{61}{100} = 0{,}61 \\notin [0{,}4\\,;\\,0{,}6] \\Rightarrow \\text{on rejette } H', text: 'La fréquence 0,61 dépasse la borne supérieure 0,6. Les données ne sont pas compatibles avec l\'hypothèse que la moitié des électeurs lui sont favorables.' },
    ],
  },
  'proba2nde-11': {
    steps: [
      { title: 'Intervalle (n=900)', tex: '\\left[0{,}3 - \\tfrac{1}{\\sqrt{900}};\\; 0{,}3 + \\tfrac{1}{30}\\right] = [0{,}267\\,;\\,0{,}333]' },
      { title: 'Fréquence observée', tex: 'f = \\tfrac{261}{900} \\approx 0{,}290 \\in [0{,}267\\,;\\,0{,}333] \\Rightarrow \\text{on ne rejette pas}' },
      { title: 'Correction', text: 'On ne peut pas « démontrer » que $p=30\\%$ : on conclut seulement que les données sont compatibles avec cette hypothèse au seuil de 95 %.' },
    ],
  },
  'proba2nde-12': {
    steps: [
      { title: 'Rayons', tex: 'n=100 : r=0{,}1 \\quad n=400 : r=0{,}05 \\quad n=1000 : r\\approx 0{,}032' },
      { title: 'Relation', text: 'Diviser par 2 → multiplier n par 4 ; diviser par 5 → multiplier n par 25. Car $r=1/\\sqrt{n}$, donc $r/k \\Leftrightarrow n \\times k^2$.' },
      { title: 'Rayon = 0,02', tex: '\\tfrac{1}{\\sqrt{n}} = 0{,}02 \\Rightarrow \\sqrt{n}=50 \\Rightarrow n=2\\,500' },
    ],
  },
  'proba2nde-13': {
    steps: [
      { title: '4 lancers', tex: 'P(\\geq 1P) = 1-(\\tfrac{1}{2})^4 = 1-\\tfrac{1}{16} = \\tfrac{15}{16}' },
      { title: '2 dés, au moins un 6', tex: 'P = 1-(\\tfrac{5}{6})^2 = 1-\\tfrac{25}{36} = \\tfrac{11}{36}' },
      { title: 'Urne 2 tirages', tex: 'P(\\geq 1R) = 1-(\\tfrac{2}{3})^2 = 1-\\tfrac{4}{9} = \\tfrac{5}{9}' },
    ],
  },
  'proba2nde-14': {
    steps: [
      { title: 'Probabilités', tex: 'P(R)=\\tfrac{1}{3},\\; P(V)=\\tfrac{2}{3}. \\text{ Chaque branche conserve ces proba (remise).}' },
      { title: 'RR et VV', tex: 'P(RR)=\\tfrac{1}{3}\\times\\tfrac{1}{3}=\\tfrac{1}{9} \\quad P(VV)=\\tfrac{2}{3}\\times\\tfrac{2}{3}=\\tfrac{4}{9}' },
      { title: 'Exactement 1 rouge', tex: 'P(RV)+P(VR)=\\tfrac{1}{3}\\cdot\\tfrac{2}{3}+\\tfrac{2}{3}\\cdot\\tfrac{1}{3}=\\tfrac{4}{9}' },
      { title: 'Vérification', tex: '\\tfrac{1}{9}+\\tfrac{4}{9}+\\tfrac{4}{9}=\\tfrac{9}{9}=1 \\checkmark' },
    ],
  },
  'proba2nde-15': {
    steps: [
      { title: 'Probabilité manquante', tex: 'p_6 = 1-(0{,}1+0{,}1+0{,}15+0{,}15+0{,}2) = 1-0{,}7 = 0{,}3' },
      { title: 'Dé équitable ?', text: 'Non : pour un dé équitable, chaque face aurait $P=1/6\\approx0{,}167$. Ici $P(1)=P(2)=0{,}1<1/6$ et $P(6)=0{,}3>1/6$ → les faces n\'ont pas la même probabilité → le dé est truqué.' },
      { title: 'P(face paire) et P(≥4)', tex: 'P(\\text{pair}) = P(2)+P(4)+P(6) = 0{,}1+0{,}15+0{,}3 = 0{,}55', text: 'P(face ≥ 4) = P(4)+P(5)+P(6) = 0,15+0,20+0,30 = 0,65.' },
      { title: 'P(face ≠ 1)', tex: '\\text{Méthode 1 (contraire) : } P(\\neq 1) = 1-P(1) = 1-0{,}1 = 0{,}9', text: 'Méthode 2 (directe) : somme des 5 autres = 0,1+0,15+0,15+0,2+0,3 = 0,9 ✓' },
    ],
  },
  'proba2nde-16': {
    steps: [
      { title: 'Tableau complet', text: 'Café avec sucre 54, sans sucre 36, total 90. Thé avec sucre 21, sans sucre 39, total 60. Total avec sucre 75, sans sucre 75, total 150.' },
      { title: 'P(sucre)', tex: 'P(\\text{sucre}) = \\tfrac{75}{150} = 0{,}5' },
      { title: 'P(café) et P(sans sucre)', tex: 'P(\\text{café}) = \\tfrac{90}{150} = 0{,}6 \\qquad P(\\text{sans sucre}) = \\tfrac{75}{150} = 0{,}5' },
      { title: 'P(sucre ou café)', text: 'Par dénombrement : café sans sucre + café avec sucre + thé avec sucre = 36+54+21 = 111 boissons.', tex: 'P(\\text{sucre ou café}) = \\tfrac{111}{150} \\approx 0{,}74' },
    ],
  },
  'proba2nde-17': {
    steps: [
      { title: 'P(rouge)', tex: 'P(R) = \\tfrac{3}{8} \\text{ (3 secteurs sur 8 équiprobables)}' },
      { title: '2 rouges', tex: 'P(RR) = \\tfrac{3}{8}\\times\\tfrac{3}{8} = \\tfrac{9}{64}' },
      { title: 'Aucun rouge', tex: 'P(\\bar{R}\\bar{R}) = \\tfrac{5}{8}\\times\\tfrac{5}{8} = \\tfrac{25}{64}' },
      { title: 'Au moins un rouge', tex: 'P = 1-\\tfrac{25}{64} = \\tfrac{39}{64}' },
      { title: 'Erreur', text: 'Les tours sont indépendants mais les probabilités ne s\'additionnent pas. La bonne formule donne $1-(1-3/8)^2 = 39/64 \\neq 6/8$.' },
    ],
  },
  'proba2nde-18': {
    steps: [
      { title: 'Issues de A et B', text: 'A={somme≥10}={(4,6),(5,5),(5,6),(6,4),(6,5),(6,6)} → 6 issues, P(A)=6/36=1/6. B={même valeur}={(1,1),(2,2),(3,3),(4,4),(5,5),(6,6)} → 6 issues, P(B)=6/36=1/6.' },
      { title: 'Intersection', text: 'A∩B : couples à la fois dans A et B : (5,5) et (6,6). Donc P(A∩B)=2/36=1/18.' },
      { title: 'Réunion par formule', tex: 'P(A\\cup B) = \\tfrac{1}{6}+\\tfrac{1}{6}-\\tfrac{1}{18} = \\tfrac{3+3-1}{18} = \\tfrac{5}{18}' },
      { title: 'Vérification directe', text: 'A∪B={(1,1),(2,2),(3,3),(4,4),(4,6),(5,5),(5,6),(6,4),(6,5),(6,6)} → 10 issues.', tex: 'P = \\tfrac{10}{36} = \\tfrac{5}{18} \\checkmark' },
      { title: 'Incompatibilité', text: 'Non : P(A∩B)=1/18≠0, donc A et B ont des issues communes.' },
    ],
  },
  'proba2nde-19': {
    steps: [
      { title: 'Intervalle théorique', tex: '\\left[0{,}5 - \\tfrac{1}{\\sqrt{100}}\\,;\\, 0{,}5 + \\tfrac{1}{\\sqrt{100}}\\right] = [0{,}4\\,;\\,0{,}6]' },
      { title: 'Cohérence', text: 'Au seuil de 95 %, environ 5 % des sondages sortent de l\'intervalle par hasard, soit 5%×30=1,5 → 1 ou 2 sondages. Avoir 1 sondage hors intervalle est donc parfaitement cohérent.' },
      { title: 'f=0,62', text: '0,62 > 0,6 → hors de l\'intervalle. On peut rejeter H:p=0,5 au seuil 95 %. Cependant, en simulation, 1 sondage sur 20 sort de l\'intervalle par pure fluctuation : un seul résultat hors intervalle n\'est pas une certitude.' },
    ],
  },
  'proba2nde-20': {
    steps: [
      { title: 'Fréquence', tex: 'f = \\tfrac{340}{625} = 0{,}544' },
      { title: 'Intervalle (n=625)', tex: '\\left[0{,}5 - \\tfrac{1}{25}\\,;\\, 0{,}5 + \\tfrac{1}{25}\\right] = [0{,}46\\,;\\,0{,}54]' },
      { title: 'Conclusion', text: '$f=0{,}544 \\notin [0{,}46\\,;\\,0{,}54]$ → on rejette $H:p=0{,}5$ au seuil de 95 %.' },
      { title: 'n=100', tex: '\\text{Intervalle : }[0{,}4\\,;\\,0{,}6].\\; f=0{,}544\\in[0{,}4\\,;\\,0{,}6] \\Rightarrow \\text{on ne rejette plus } H.' },
    ],
  },
  'proba2nde-21': {
    steps: [
      { title: 'Tableau complet', text: 'Interne+sport=84, interne+sans sport=36, externe+sport=96, externe+sans sport=84. Total sport=180, sans sport=120, total=300.' },
      { title: 'P(sport)', tex: 'P(\\text{sport}) = \\tfrac{180}{300} = 0{,}6' },
      { title: 'P(interne) et P(sport)', tex: 'P(\\text{interne}) = \\tfrac{120}{300} = 0{,}4 \\qquad P(\\text{sport}) = 0{,}6' },
      { title: 'P(externe et sans sport)', tex: 'P = \\tfrac{84}{300} = 0{,}28' },
      { title: 'Vérification', tex: '\\tfrac{84}{300}+\\tfrac{96}{300}+\\tfrac{36}{300}+\\tfrac{84}{300} = \\tfrac{300}{300} = 1 \\checkmark' },
    ],
  },
  'proba2nde-22': {
    steps: [
      { title: 'Arbre pondéré', tex: 'P(P)=\\tfrac{2}{3},\\; P(F)=\\tfrac{1}{3}. \\text{ Arbre : PP, PF, FP, FF.}' },
      { title: 'P(PP) et P(FF)', tex: 'P(PP)=\\tfrac{2}{3}\\times\\tfrac{2}{3}=\\tfrac{4}{9} \\quad P(FF)=\\tfrac{1}{3}\\times\\tfrac{1}{3}=\\tfrac{1}{9}' },
      { title: 'Exactement 1 Pile', tex: 'P(PF)+P(FP)=\\tfrac{2}{9}+\\tfrac{2}{9}=\\tfrac{4}{9}', text: 'Vérif : 4/9+4/9+1/9 = 1 ✓' },
      { title: 'Test H:p=2/3, n=100', tex: '\\left[\\tfrac{2}{3}-\\tfrac{1}{10}\\,;\\,\\tfrac{2}{3}+\\tfrac{1}{10}\\right]\\approx[0{,}567\\,;\\,0{,}767]', text: 'f=66/100=0,66 ∈ [0,567;0,767] → on ne rejette pas H.' },
    ],
  },
  'proba2nde-pb1': {
    steps: [
      { title: 'p équilibré', tex: 'p = 1/6 \\approx 0{,}167' },
      { title: 'Fréquences', text: 'Face 1 : 42/300=0,140; 2 : 0,160; 3 : 0,170; 4 : 0,157; 5 : 0,177; 6 : 0,197.' },
      { title: 'Intervalle n=300', tex: '\\left[\\tfrac{1}{6}-\\tfrac{1}{\\sqrt{300}}\\,;\\,\\tfrac{1}{6}+\\tfrac{1}{\\sqrt{300}}\\right]\\approx[0{,}109\\,;\\,0{,}225]' },
      { title: 'Conclusion n=300', text: 'Toutes les fréquences appartiennent à l\'intervalle → on ne peut pas affirmer que le dé est truqué.' },
      { title: 'Intervalle n=3000', tex: '\\approx[0{,}149\\,;\\,0{,}184]' },
      { title: 'Conclusion n=3000', text: 'La fréquence de la face 6 (0,197) sort de l\'intervalle → on rejette l\'hypothèse au seuil 95 %.' },
      { title: 'Explication', text: 'L\'intervalle de fluctuation se rétrécit quand $n$ augmente ($r=1/\\sqrt{n}$). La même fréquence aberrante qui passait inaperçue avec 300 lancers devient significative avec 3 000 lancers.' },
    ],
  },
  'proba2nde-pb2': {
    steps: [
      { title: 'Tableau complet', text: 'Favorable : Sec 80, Pre 52, Term 28, Total 160. Défavorable : Sec 60, Pre 98, Term 82, Total 240. Totaux par niveau : Sec 140, Pre 150, Term 110, Total 400.' },
      { title: 'P(favorable)', tex: 'P(\\text{favorable}) = \\tfrac{160}{400} = 0{,}4' },
      { title: 'P(Terminale)', tex: 'P(\\text{Terminale}) = \\tfrac{110}{400} = 0{,}275' },
      { title: 'P(Terminale et défavorable)', tex: 'P = \\tfrac{82}{400} = 0{,}205' },
      { title: 'Comparaison Terminale / ensemble', text: 'En Terminale : 28/110 ≈ 25,5 % de favorables. Ensemble : 40 %. Les Terminales sont moins favorables au projet que les autres niveaux.' },
      { title: 'Par niveau', text: 'Secondes : 80/140 ≈ 57,1 % · Premières : 52/150 ≈ 34,7 % · Terminales : 28/110 ≈ 25,5 %. La proportion de favorables diminue régulièrement à mesure que les élèves avancent dans leurs études.' },
    ],
  },
  'proba2nde-pb3': {
    steps: [
      { title: 'Fréquences', tex: 'f_A = \\tfrac{84}{100} = 0{,}84 \\qquad f_B = \\tfrac{756}{900} = 0{,}84' },
      { title: 'Hypothèse', text: '$H : p = 0{,}8$ (taux de germination garanti par le semencier).' },
      { title: 'Contrôle A (n=100)', tex: '\\left[0{,}8-\\tfrac{1}{10}\\,;\\,0{,}8+\\tfrac{1}{10}\\right] = [0{,}7\\,;\\,0{,}9]', text: '$f_A=0{,}84 \\in [0{,}7\\,;\\,0{,}9]$ → on ne rejette pas $H$ : le résultat est compatible avec un taux de 80 %.' },
      { title: 'Contrôle B (n=900)', tex: '\\left[0{,}8-\\tfrac{1}{30}\\,;\\,0{,}8+\\tfrac{1}{30}\\right] \\approx [0{,}767\\,;\\,0{,}833]', text: '$f_B=0{,}84 \\notin [0{,}767\\,;\\,0{,}833]$ → on rejette $H$ : le taux réel semble supérieur à 80 %.' },
      { title: 'Pourquoi des conclusions différentes ?', text: 'L\'intervalle de fluctuation a pour rayon $1/\\sqrt{n}$. Avec $n=100$, le rayon est 0,1 ; avec $n=900$, il est 1/30≈0,033. Le même écart (0,04) entre $f$ et $p$ est insignifiant dans le premier cas mais significatif dans le second.' },
      { title: 'Rayon = 0,01', tex: '\\tfrac{1}{\\sqrt{n}} = 0{,}01 \\Rightarrow \\sqrt{n} = 100 \\Rightarrow n = 10\\,000 \\text{ graines}' },
    ],
  },
};
