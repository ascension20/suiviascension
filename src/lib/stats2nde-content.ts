import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash (Partie E du poly) ──────────────────────────────────────────────
export const STATS2NDE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'La moyenne de la série $7\\,;\\,9\\,;\\,10\\,;\\,14$ est :',
    options: [
      { label: 'a', text: '$9$' },
      { label: 'b', text: '$9{,}5$' },
      { label: 'c', text: '$10$' },
      { label: 'd', text: '$40$' },
    ],
    answer: 'c',
  },
  {
    n: 2,
    text: 'La médiane de la série $3\\,;\\,7\\,;\\,8\\,;\\,10\\,;\\,15$ est :',
    options: [
      { label: 'a', text: '$7$' },
      { label: 'b', text: '$8$' },
      { label: 'c', text: '$8{,}6$' },
      { label: 'd', text: '$10$' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'La médiane de la série $4\\,;\\,6\\,;\\,9\\,;\\,11$ est :',
    options: [
      { label: 'a', text: '$6$' },
      { label: 'b', text: '$6{,}5$' },
      { label: 'c', text: '$7{,}5$' },
      { label: 'd', text: '$9$' },
    ],
    answer: 'c',
  },
  {
    n: 4,
    text: "L'étendue de la série $12\\,;\\,5\\,;\\,19\\,;\\,7\\,;\\,20$ est :",
    options: [
      { label: 'a', text: '$13$' },
      { label: 'b', text: '$15$' },
      { label: 'c', text: '$20$' },
      { label: 'd', text: '$12{,}6$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Les valeurs $10\\,;\\,12\\,;\\,15$ ont pour effectifs respectifs $3\\,;\\,5\\,;\\,2$. La moyenne est :',
    options: [
      { label: 'a', text: '$12$' },
      { label: 'b', text: '$12{,}33$' },
      { label: 'c', text: '$12{,}5$' },
      { label: 'd', text: '$37$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: "Dans une série d'effectif total $40$, une valeur a pour effectif $12$. Sa fréquence est :",
    options: [
      { label: 'a', text: '$0{,}12$' },
      { label: 'b', text: '$3$' },
      { label: 'c', text: '$30$' },
      { label: 'd', text: '$0{,}3$' },
    ],
    answer: 'd',
  },
  {
    n: 7,
    text: 'Pour une série ordonnée de $30$ valeurs, les rangs de $Q_1$ et $Q_3$ sont :',
    options: [
      { label: 'a', text: '$7$ et $22$' },
      { label: 'b', text: '$7{,}5$ et $22{,}5$' },
      { label: 'c', text: '$8$ et $22$' },
      { label: 'd', text: '$8$ et $23$' },
    ],
    answer: 'd',
  },
  {
    n: 8,
    text: 'Série ordonnée : $2\\,;\\,3\\,;\\,5\\,;\\,5\\,;\\,7\\,;\\,8\\,;\\,9\\,;\\,11\\,;\\,12\\,;\\,14\\,;\\,16\\,;\\,20$. Son premier quartile $Q_1$ est :',
    options: [
      { label: 'a', text: '$3$' },
      { label: 'b', text: '$4$' },
      { label: 'c', text: '$5$' },
      { label: 'd', text: '$5{,}5$' },
    ],
    answer: 'c',
  },
  {
    n: 9,
    text: 'Pour la même série ($N=12$), le troisième quartile $Q_3$ est :',
    options: [
      { label: 'a', text: '$12$' },
      { label: 'b', text: '$12{,}5$' },
      { label: 'c', text: '$14$' },
      { label: 'd', text: '$11$' },
    ],
    answer: 'a',
  },
  {
    n: 10,
    text: 'Pour la même série, l\'écart interquartile $Q_3 - Q_1$ vaut :',
    options: [
      { label: 'a', text: '$6$' },
      { label: 'b', text: '$7$' },
      { label: 'c', text: '$9$' },
      { label: 'd', text: '$18$' },
    ],
    answer: 'b',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const STATS2NDE_EXERCISES: ExerciseContent[] = [
  // ── Partie A — Automatismes ★ ─────────────────────────────────────────────
  {
    id: 'stats2nde-1',
    title: 'Moyenne simple',
    subject: 'Calculer la moyenne de la série : $9\\,;\\,10\\,;\\,12\\,;\\,14\\,;\\,15$.',
    questions: [
      { n: 1, text: 'Calculer la moyenne $\\bar{x}$.' },
    ],
  },
  {
    id: 'stats2nde-2',
    title: 'Moyenne pondérée',
    subject: 'Une série est donnée par le tableau : valeurs $5, 10, 15, 20$ avec effectifs $4, 6, 7, 3$.',
    questions: [
      { n: 1, text: "Donner l'effectif total $N$." },
      { n: 2, text: 'Calculer la moyenne pondérée $\\bar{x}$.' },
    ],
  },
  {
    id: 'stats2nde-3',
    title: 'Coefficients',
    subject: "Un élève a 8 en maths (coef. 3), 12 en français (coef. 2), 15 en anglais (coef. 4) et 10 en SVT (coef. 1).",
    questions: [
      { n: 1, text: 'Calculer sa moyenne générale.' },
      { n: 2, text: 'Calculer la moyenne sans coefficients. Les coefficients l\'ont-ils avantagé ?' },
    ],
  },
  {
    id: 'stats2nde-4',
    title: 'Fréquences et cumuls',
    subject: 'Nombre de frères et sœurs de 40 élèves : valeurs 0, 1, 2, 3 avec effectifs 6, 9, 15, 10.',
    questions: [
      { n: 1, text: 'Calculer les fréquences en décimal et en pourcentage. Vérifier leur somme.' },
      { n: 2, text: 'Compléter la ligne des effectifs cumulés croissants.' },
      { n: 3, text: "Combien d'élèves ont au plus 2 frères et sœurs ? Quel pourcentage ?" },
    ],
  },
  {
    id: 'stats2nde-5',
    title: 'Étendue',
    subject: 'Série : $21\\,;\\,14\\,;\\,30\\,;\\,9\\,;\\,17\\,;\\,25$.',
    questions: [
      { n: 1, text: "Calculer l'étendue." },
      { n: 2, text: 'On ajoute la valeur $45$. Que devient l\'étendue ? Que peut-on en conclure sur cet indicateur ?' },
    ],
  },
  {
    id: 'stats2nde-6',
    title: 'Médiane, N impair',
    subject: 'Déterminer la médiane de la série : $7\\,;\\,3\\,;\\,9\\,;\\,12\\,;\\,5\\,;\\,8\\,;\\,15$.',
    questions: [
      { n: 1, text: 'Ordonner la série et déterminer la médiane.' },
    ],
  },
  {
    id: 'stats2nde-7',
    title: 'Médiane, N pair',
    subject: 'Série : $2\\,;\\,9\\,;\\,4\\,;\\,11\\,;\\,6\\,;\\,14$.',
    questions: [
      { n: 1, text: 'Déterminer la médiane. La médiane appartient-elle à la série ?' },
    ],
  },
  {
    id: 'stats2nde-8',
    title: 'Quartiles',
    subject: 'Série ordonnée : $1\\,;\\,3\\,;\\,4\\,;\\,6\\,;\\,7\\,;\\,9\\,;\\,10\\,;\\,12\\,;\\,15\\,;\\,18\\,;\\,20\\,;\\,24$.',
    questions: [
      { n: 1, text: 'Donner $N$, puis les rangs de $Q_1$ et $Q_3$.' },
      { n: 2, text: 'En déduire $Q_1$, la médiane et $Q_3$.' },
      { n: 3, text: "Calculer l'écart interquartile." },
    ],
  },
  // ── Partie B — Méthodes ★★ ────────────────────────────────────────────────
  {
    id: 'stats2nde-9',
    title: 'Tous les indicateurs',
    subject: '30 personnes ont lu 0, 1, 2, 3 ou 4 livres le mois dernier (effectifs : 5, 8, 11, 4, 2).',
    questions: [
      { n: 1, text: 'Calculer la moyenne.' },
      { n: 2, text: 'Construire la ligne des effectifs cumulés croissants.' },
      { n: 3, text: 'Déterminer la médiane, $Q_1$ et $Q_3$ à l\'aide de cette ligne.' },
      { n: 4, text: "Calculer l'étendue et l'écart interquartile." },
      { n: 5, text: 'Interpréter la valeur de $Q_3$ par une phrase.' },
    ],
  },
  {
    id: 'stats2nde-10',
    title: 'Diagramme en boîte',
    subject: 'Série ordonnée de 15 valeurs : $4\\,;\\,6\\,;\\,7\\,;\\,9\\,;\\,11\\,;\\,12\\,;\\,12\\,;\\,15\\,;\\,17\\,;\\,19\\,;\\,23\\,;\\,28\\,;\\,31\\,;\\,34\\,;\\,40$.',
    questions: [
      { n: 1, text: 'Déterminer le minimum, $Q_1$, la médiane, $Q_3$, le maximum.' },
      { n: 2, text: 'Construire le diagramme en boîte sur un axe gradué de 0 à 40.' },
      { n: 3, text: 'La série est-elle symétrique ? Justifier à partir du diagramme.' },
    ],
  },
  {
    id: 'stats2nde-11',
    title: 'Linéarité',
    subject: 'La moyenne des notes d\'une classe est $\\bar{x} = 13{,}4$.',
    questions: [
      { n: 1, text: 'Nouvelle moyenne si le professeur ajoute 2 points à chaque copie.' },
      { n: 2, text: 'Nouvelle moyenne si le professeur multiplie chaque note par $1{,}5$.' },
      { n: 3, text: 'Nouvelle moyenne si on double chaque note puis on enlève 5 points.' },
    ],
  },
  {
    id: 'stats2nde-12',
    title: 'Poids des coefficients',
    subject: 'Un élève a obtenu : 13 (coef. 5), 8 (coef. 4), 16 (coef. 2) et 11 (coef. 1).',
    questions: [
      { n: 1, text: 'Calculer la moyenne générale (arrondie au centième).' },
      { n: 2, text: 'Les coefficients deviennent 2, 4, 5, 1. Calculer la nouvelle moyenne.' },
      { n: 3, text: 'Expliquer en une phrase pourquoi la moyenne a augmenté.' },
    ],
  },
  {
    id: 'stats2nde-13',
    title: 'Valeur manquante',
    subject: '',
    questions: [
      { n: 1, text: 'Un élève a 5 notes de moyenne 12. Quatre sont : 9, 14, 11, 15. Retrouver la cinquième.' },
      { n: 2, text: 'Un autre élève a 6 notes de moyenne $11{,}5$. Cinq sont : 8, 12, 10, 14, 13. Retrouver la sixième.' },
    ],
  },
  {
    id: 'stats2nde-14',
    title: 'Réunion de deux groupes',
    subject: 'Dans une classe, les 18 élèves de spécialité A ont une moyenne de $11{,}5$ et les 12 élèves de spécialité B une moyenne de 14.',
    questions: [
      { n: 1, text: 'Calculer la moyenne de la classe entière.' },
      { n: 2, text: "Un élève affirme que la moyenne est $\\frac{11{,}5+14}{2} = 12{,}75$. Expliquer son erreur." },
    ],
  },
  {
    id: 'stats2nde-15',
    title: 'Rangs des quartiles',
    subject: 'Sans connaître les valeurs, donner les rangs de $Q_1$ et $Q_3$ pour une série ordonnée comportant :',
    questions: [
      { n: 1, text: '$N = 30$ valeurs.' },
      { n: 2, text: '$N = 28$ valeurs.' },
      { n: 3, text: '$N = 45$ valeurs.' },
    ],
  },
  {
    id: 'stats2nde-16',
    title: 'Lecture d\'une boîte',
    subject: 'Le diagramme en boîte d\'une série de temps d\'attente (en minutes) donne : minimum 5, $Q_1 = 9$, médiane 14, $Q_3 = 20$, maximum 32.',
    questions: [
      { n: 1, text: "Calculer l'étendue et l'écart interquartile." },
      { n: 2, text: 'Quelle proportion des clients attend au moins 14 minutes ?' },
      { n: 3, text: 'Peut-on connaître le nombre exact de clients ayant attendu 20 minutes ? Justifier.' },
    ],
  },
  {
    id: 'stats2nde-17',
    title: 'Effet d\'une valeur extrême',
    subject: 'Les sept salaires mensuels d\'une entreprise, en euros, sont : $1500\\,;\\,1600\\,;\\,1700\\,;\\,1800\\,;\\,1900\\,;\\,2000\\,;\\,2100$.',
    questions: [
      { n: 1, text: 'Calculer la moyenne et la médiane.' },
      { n: 2, text: 'Le salarié le mieux payé est remplacé par un dirigeant payé 12 000 €. Recalculer les deux indicateurs.' },
      { n: 3, text: 'Lequel des deux décrit le mieux la situation d\'un salarié de cette entreprise ?' },
    ],
  },
  {
    id: 'stats2nde-18',
    title: 'Choisir son indicateur',
    subject: 'Pour chacune des situations suivantes, indiquer si la moyenne ou la médiane décrit le mieux la série, et justifier en une phrase.',
    questions: [
      { n: 1, text: 'Les notes des 30 élèves d\'une classe à un devoir, comprises entre 6 et 17.' },
      { n: 2, text: 'Les loyers des appartements d\'une grande ville.' },
      { n: 3, text: 'La quantité de farine consommée chaque jour par une boulangerie, pour prévoir sa commande hebdomadaire.' },
      { n: 4, text: 'Les temps d\'attente aux urgences d\'un hôpital un soir de forte affluence.' },
    ],
  },
  // ── Partie C — Situations complètes ★★★ ──────────────────────────────────
  {
    id: 'stats2nde-19',
    title: 'Série en classes — Réseaux sociaux',
    subject: 'Le temps passé chaque jour sur les réseaux sociaux a été relevé auprès de 50 élèves. Classes (en heures) : $[0;5[$, $[5;10[$, $[10;15[$, $[15;25[$, avec effectifs 12, 18, 15, 5.',
    questions: [
      { n: 1, text: 'Donner le centre de chaque classe.' },
      { n: 2, text: 'Calculer la moyenne approchée de la série.' },
      { n: 3, text: 'Construire la ligne des effectifs cumulés croissants et déterminer la classe médiane.' },
      { n: 4, text: 'Calculer la hauteur de chaque rectangle (aire proportionnelle à l\'effectif) et tracer l\'histogramme.' },
      { n: 5, text: 'Expliquer pourquoi la moyenne obtenue n\'est qu\'une valeur approchée.' },
    ],
  },
  {
    id: 'stats2nde-20',
    title: 'Comparer deux séries',
    subject: 'Deux groupes de 9 élèves ont passé le même test noté sur 20. Groupe A : $9\\,;\\,10\\,;\\,10\\,;\\,11\\,;\\,11\\,;\\,12\\,;\\,12\\,;\\,13\\,;\\,14$. Groupe B : $4\\,;\\,6\\,;\\,9\\,;\\,11\\,;\\,11\\,;\\,13\\,;\\,16\\,;\\,18\\,;\\,20$.',
    questions: [
      { n: 1, text: 'Calculer la moyenne de chaque groupe (arrondie au centième).' },
      { n: 2, text: 'Déterminer les cinq nombres du résumé pour chaque groupe.' },
      { n: 3, text: 'Tracer les deux diagrammes en boîte sur un même axe gradué.' },
      { n: 4, text: 'Rédiger une comparaison des deux groupes en distinguant position et dispersion.' },
      { n: 5, text: 'Le professeur doit choisir un groupe pour un projet demandant un niveau homogène. Lequel conseiller ?' },
    ],
  },
  {
    id: 'stats2nde-21',
    title: 'Travailler à partir des cumuls',
    subject: 'Les notes de 30 élèves à un contrôle sont résumées dans le tableau suivant. Note : 10, 11, 12, 13, 14, 15. Effectif : 3, 5, 9, 7, 4, 2.',
    questions: [
      { n: 1, text: 'Calculer la moyenne de la classe (arrondie au centième).' },
      { n: 2, text: 'Construire la ligne des effectifs cumulés croissants.' },
      { n: 3, text: 'Déterminer la médiane, $Q_1$ et $Q_3$ en utilisant uniquement cette ligne, sans réécrire les 30 notes.' },
      { n: 4, text: "Calculer l'écart interquartile et interpréter le résultat." },
      { n: 5, text: 'Le professeur ajoute 1 point à chaque copie. Donner sans nouveau calcul la nouvelle moyenne et la nouvelle médiane.' },
    ],
  },
  {
    id: 'stats2nde-22',
    title: 'Synthèse — Communications téléphoniques',
    subject: 'Les durées, en minutes, de 16 communications téléphoniques sont (déjà ordonnées) : $3\\,;\\,4\\,;\\,5\\,;\\,6\\,;\\,6\\,;\\,7\\,;\\,9\\,;\\,10\\,;\\,12\\,;\\,12\\,;\\,14\\,;\\,15\\,;\\,15\\,;\\,17\\,;\\,25\\,;\\,28$.',
    questions: [
      { n: 1, text: 'Calculer la moyenne et la médiane. Comparer les deux valeurs et expliquer l\'écart observé.' },
      { n: 2, text: 'Déterminer $Q_1$, $Q_3$, l\'étendue et l\'écart interquartile.' },
      { n: 3, text: 'Construire le diagramme en boîte.' },
      { n: 4, text: 'L\'opérateur affirme : « la moitié de nos communications durent moins de 11 minutes ». Cette affirmation est-elle exacte ?' },
      { n: 5, text: 'On retire la valeur 28. Recalculer la médiane et l\'étendue, puis dire lequel des deux indicateurs a le plus varié.' },
    ],
  },
  // ── Partie D — Problèmes ◆ ────────────────────────────────────────────────
  {
    id: 'stats2nde-pb1',
    title: 'Problème 1 — Les notes d\'une classe',
    subject: 'Les 20 élèves d\'une classe de Seconde ont obtenu les notes suivantes à un devoir sur 20 : $12\\,;\\,14\\,;\\,9\\,;\\,16\\,;\\,11\\,;\\,13\\,;\\,15\\,;\\,8\\,;\\,17\\,;\\,12\\,;\\,10\\,;\\,14\\,;\\,13\\,;\\,11\\,;\\,15\\,;\\,9\\,;\\,16\\,;\\,12\\,;\\,14\\,;\\,10$.',
    questions: [
      { n: 1, text: 'Regrouper ces notes dans un tableau d\'effectifs, puis ordonner la série.' },
      { n: 2, text: 'Calculer la moyenne de la classe.' },
      { n: 3, text: 'Déterminer la médiane, $Q_1$ et $Q_3$.' },
      { n: 4, text: "Calculer l'étendue et l'écart interquartile." },
      { n: 5, text: 'Quel pourcentage d\'élèves a la moyenne (note $\\geq 12$) ?' },
      { n: 6, text: 'Le professeur ajoute 1 point à chaque copie. Donner la nouvelle moyenne et la nouvelle médiane sans recalculer la somme.' },
      { n: 7, text: 'Construire le diagramme en boîte de la série initiale.' },
    ],
  },
  {
    id: 'stats2nde-pb2',
    title: 'Problème 2 — Dépenses mensuelles',
    subject: 'Une enquête porte sur la dépense mensuelle en loisirs de 60 lycéens (en euros). Classes : $[0;20[$, $[20;40[$, $[40;60[$, $[60;80[$, $[80;100[$. Effectifs : 7, 13, 22, 12, 6.',
    questions: [
      { n: 1, text: 'Donner le centre de chaque classe et calculer la dépense moyenne approchée.' },
      { n: 2, text: 'Construire les lignes des effectifs et des fréquences cumulés croissants (fréquences en pourcentage arrondi au dixième).' },
      { n: 3, text: 'Déterminer la classe médiane et justifier.' },
      { n: 4, text: 'Quel pourcentage de lycéens dépense au moins 60 € par mois ?' },
      { n: 5, text: 'Une association affirme : « plus de la moitié des lycéens dépensent moins de 50 € par mois ». Cette affirmation est-elle compatible avec les données ? Justifier en expliquant ce que les classes ne permettent pas de savoir.' },
    ],
  },
  {
    id: 'stats2nde-pb3',
    title: 'Problème 3 — Deux méthodes d\'entraînement',
    subject: 'Deux groupes de 10 élèves préparent le même examen avec deux méthodes différentes. Groupe A : $13\\,;\\,14\\,;\\,11\\,;\\,15\\,;\\,13\\,;\\,16\\,;\\,14\\,;\\,13\\,;\\,12\\,;\\,15$. Groupe B : $5\\,;\\,20\\,;\\,17\\,;\\,13\\,;\\,14\\,;\\,21\\,;\\,18\\,;\\,10\\,;\\,8\\,;\\,15$.',
    questions: [
      { n: 1, text: 'Justifier que la note 21 est une erreur de saisie, puis la remplacer par 20 pour toute la suite.' },
      { n: 2, text: 'Calculer la moyenne de chaque groupe.' },
      { n: 3, text: 'Déterminer les cinq nombres du résumé pour chaque groupe et tracer les deux diagrammes en boîte sur un même axe.' },
      { n: 4, text: 'Comparer les deux groupes en distinguant position et dispersion.' },
      { n: 5, text: 'Le responsable de la formation veut généraliser la méthode qui donne les meilleurs résultats moyens. Que lui répondre en tenant compte de la dispersion ?' },
      { n: 6, text: 'Un parent affirme : « avec la méthode B, mon enfant a plus de chances d\'obtenir plus de 16 ». Discuter cette affirmation à partir des données.' },
    ],
  },
];

// ── Corrections ────────────────────────────────────────────────────────────────
export const STATS2NDE_CORRECTIONS: Record<string, Correction> = {
  'stats2nde-1': {
    steps: [
      { title: 'Calcul de la moyenne', tex: '\\bar{x} = \\dfrac{9+10+12+14+15}{5} = \\dfrac{60}{5} = 12' },
    ],
  },
  'stats2nde-2': {
    steps: [
      { title: 'Effectif total', tex: 'N = 4+6+7+3 = 20' },
      { title: 'Moyenne pondérée', tex: '\\bar{x} = \\dfrac{4\\times 5 + 6\\times 10 + 7\\times 15 + 3\\times 20}{20} = \\dfrac{20+60+105+60}{20} = \\dfrac{245}{20} = 12{,}25' },
    ],
  },
  'stats2nde-3': {
    steps: [
      { title: 'Moyenne avec coefficients', tex: '\\bar{x} = \\dfrac{3\\times 8 + 2\\times 12 + 4\\times 15 + 1\\times 10}{3+2+4+1} = \\dfrac{24+24+60+10}{10} = \\dfrac{118}{10} = 11{,}8' },
      { title: 'Moyenne sans coefficients', tex: '\\bar{x}_0 = \\dfrac{8+12+15+10}{4} = \\dfrac{45}{4} = 11{,}25', text: 'Oui, les coefficients ont avantagé l\'élève (11,8 > 11,25) car la meilleure note (15) porte le coefficient le plus élevé (4).' },
    ],
  },
  'stats2nde-4': {
    steps: [
      { title: 'Fréquences', text: 'f(0)=6/40=0,15 → 15 % · f(1)=9/40=0,225 → 22,5 % · f(2)=15/40=0,375 → 37,5 % · f(3)=10/40=0,25 → 25 %. Somme=1 ✓' },
      { title: 'ECC', text: 'ECC : 6 ; 15 ; 30 ; 40' },
      { title: 'Au plus 2 frères et sœurs', text: 'ECC(2)=30 élèves, soit 30/40=75 %.' },
    ],
  },
  'stats2nde-5': {
    steps: [
      { title: 'Étendue initiale', tex: 'e = \\max - \\min = 30 - 9 = 21' },
      { title: 'Après ajout de 45', tex: 'e = 45 - 9 = 36', text: 'Une seule valeur fait passer l\'étendue de 21 à 36 : cet indicateur ne repose que sur deux données et est très sensible aux valeurs extrêmes.' },
    ],
  },
  'stats2nde-6': {
    steps: [
      { title: 'Série ordonnée', tex: '3\\,;\\,5\\,;\\,7\\,;\\,8\\,;\\,9\\,;\\,12\\,;\\,15', text: 'N=7 (impair). Rang médian : (7+1)/2=4.' },
      { title: 'Médiane', tex: 'Me = 8 \\quad (4^{\\text{e}} \\text{ valeur})' },
    ],
  },
  'stats2nde-7': {
    steps: [
      { title: 'Série ordonnée', tex: '2\\,;\\,4\\,;\\,6\\,;\\,9\\,;\\,11\\,;\\,14', text: 'N=6 (pair). On prend la moyenne des rangs 3 et 4.' },
      { title: 'Médiane', tex: 'Me = \\dfrac{6+9}{2} = 7{,}5', text: 'La médiane 7,5 n\'appartient pas à la série.' },
    ],
  },
  'stats2nde-8': {
    steps: [
      { title: 'N et rangs', tex: 'N = 12 \\quad \\text{Rang } Q_1 : \\tfrac{12}{4} = 3 \\quad \\text{Rang } Q_3 : \\tfrac{3\\times 12}{4} = 9' },
      { title: 'Valeurs', tex: 'Q_1 = 4 \\quad Me = \\dfrac{9+10}{2} = 9{,}5 \\quad Q_3 = 15' },
      { title: 'Écart interquartile', tex: 'Q_3 - Q_1 = 15 - 4 = 11' },
    ],
  },
  'stats2nde-9': {
    steps: [
      { title: 'Moyenne', tex: '\\bar{x} = \\dfrac{5\\times 0 + 8\\times 1 + 11\\times 2 + 4\\times 3 + 2\\times 4}{30} = \\dfrac{50}{30} \\approx 1{,}67' },
      { title: 'ECC', text: 'ECC : 5 ; 13 ; 24 ; 28 ; 30' },
      { title: 'Médiane, Q1, Q3', text: 'N=30, pair. Me=moyenne des rangs 15 et 16 → ECC atteint 24 sur valeur 2 → Me=2. Rang Q1=7,5→rang 8→Q1=1. Rang Q3=22,5→rang 23→Q3=2.' },
      { title: 'Dispersion', tex: 'e = 4 \\qquad Q_3-Q_1 = 3-1 = 2' },
      { title: 'Interprétation Q3', text: 'Au moins 75 % des personnes ont lu au plus 2 livres dans le mois.' },
    ],
  },
  'stats2nde-10': {
    steps: [
      { title: 'Cinq nombres', text: 'N=15 (impair). min=4. Rang Q1 : 15/4=3,75 → rang 4 → Q1=9. Rang Me : (15+1)/2=8 → Me=15. Rang Q3 : 3×15/4=11,25 → rang 12 → Q3=28. max=40.' },
      { title: 'Symétrie', text: 'Non : la moustache droite (28→40=12) est plus longue que la gauche (4→9=5), et Me=15 n\'est pas au centre de la boîte [9;28]. La série est asymétrique à droite.' },
    ],
  },
  'stats2nde-11': {
    steps: [
      { title: '+2 points', tex: '\\bar{x}_{\\text{new}} = 13{,}4 + 2 = 15{,}4' },
      { title: '×1,5', tex: '\\bar{x}_{\\text{new}} = 1{,}5 \\times 13{,}4 = 20{,}1' },
      { title: 'Doubler puis −5', tex: '\\bar{x}_{\\text{new}} = 2 \\times 13{,}4 - 5 = 21{,}8' },
    ],
  },
  'stats2nde-12': {
    steps: [
      { title: 'Coefficients 5, 4, 2, 1', tex: '\\bar{x} = \\dfrac{5\\times 13 + 4\\times 8 + 2\\times 16 + 1\\times 11}{12} = \\dfrac{65+32+32+11}{12} = \\dfrac{140}{12} \\approx 11{,}67' },
      { title: 'Coefficients 2, 4, 5, 1', tex: '\\bar{x} = \\dfrac{2\\times 13 + 4\\times 8 + 5\\times 16 + 1\\times 11}{12} = \\dfrac{149}{12} \\approx 12{,}42' },
      { title: 'Explication', text: 'La note 16 (la plus haute) passe du coefficient 2 au coefficient 5 : elle pèse beaucoup plus lourd et tire la moyenne vers le haut.' },
    ],
  },
  'stats2nde-13': {
    steps: [
      { title: 'Q1 — somme totale', tex: 'N\\bar{x} = 5\\times 12 = 60 \\quad \\text{Somme connues} = 9+14+11+15 = 49' },
      { title: 'Cinquième note', tex: 'x_5 = 60 - 49 = 11' },
      { title: 'Q2 — somme totale', tex: 'N\\bar{x} = 6\\times 11{,}5 = 69 \\quad \\text{Somme connues} = 8+12+10+14+13 = 57' },
      { title: 'Sixième note', tex: 'x_6 = 69 - 57 = 12' },
    ],
  },
  'stats2nde-14': {
    steps: [
      { title: 'Moyenne pondérée', tex: '\\bar{x} = \\dfrac{18\\times 11{,}5 + 12\\times 14}{30} = \\dfrac{207+168}{30} = \\dfrac{375}{30} = 12{,}5' },
      { title: 'Erreur de l\'élève', text: 'Il a fait la moyenne des deux moyennes, ce qui donne le même poids aux deux groupes alors qu\'ils n\'ont pas la même taille (18 ≠ 12). On ne peut moyenner deux moyennes que si les effectifs sont égaux.' },
    ],
  },
  'stats2nde-15': {
    steps: [
      { title: 'N=30', tex: '\\tfrac{30}{4} = 7{,}5 \\to \\text{rang 8} \\quad \\tfrac{3\\times 30}{4} = 22{,}5 \\to \\text{rang 23}', text: 'Réponse : (8 ; 23)' },
      { title: 'N=28', tex: '\\tfrac{28}{4} = 7 \\;(\\text{entier}) \\to \\text{rang 7} \\quad \\tfrac{3\\times 28}{4} = 21 \\;(\\text{entier}) \\to \\text{rang 21}', text: 'Réponse : (7 ; 21)' },
      { title: 'N=45', tex: '\\tfrac{45}{4} = 11{,}25 \\to \\text{rang 12} \\quad \\tfrac{3\\times 45}{4} = 33{,}75 \\to \\text{rang 34}', text: 'Réponse : (12 ; 34)' },
    ],
  },
  'stats2nde-16': {
    steps: [
      { title: 'Étendue et EQI', tex: 'e = 32-5 = 27 \\qquad EQI = Q_3-Q_1 = 20-9 = 11' },
      { title: 'Proportion ≥ 14 min', text: 'La médiane vaut 14 : par définition, au moins la moitié des clients attendent 14 minutes ou plus, soit environ 50 %.' },
      { title: 'Nombre exact à 20 min', text: 'Non. Le diagramme en boîte ne conserve que cinq nombres : il ne dit rien du détail des valeurs entre Q3 et le maximum, ni de l\'effectif total. L\'information est perdue.' },
    ],
  },
  'stats2nde-17': {
    steps: [
      { title: 'Indicateurs initiaux', tex: '\\bar{x} = \\dfrac{12600}{7} = 1800 \\text{ €} \\qquad Me = 1800 \\text{ €}' },
      { title: 'Après remplacement', tex: '\\bar{x} = \\dfrac{12600-2100+12000}{7} = \\dfrac{22500}{7} \\approx 3214 \\text{ €} \\qquad Me = 1800 \\text{ € (inchangée)}' },
      { title: 'Meilleur indicateur', text: 'La médiane (1 800 €) : aucun salarié ne gagne la moyenne de 3 214 €, et six des sept gagnent moins de 2 100 €. La moyenne est faussée par le salaire du dirigeant.' },
    ],
  },
  'stats2nde-18': {
    steps: [
      { title: 'Situation 1', text: 'Moyenne : les notes sont resserrées entre 6 et 17, sans valeur aberrante — la série est homogène.' },
      { title: 'Situation 2', text: 'Médiane : quelques loyers très élevés tireraient la moyenne vers le haut sans concerner la majorité des logements.' },
      { title: 'Situation 3', text: 'Moyenne : elle conserve le total, et c\'est bien un total de farine qu\'il faut commander pour la semaine.' },
      { title: 'Situation 4', text: 'Médiane : un soir de forte affluence, quelques attentes très longues gonfleraient la moyenne sans décrire l\'attente d\'un patient ordinaire.' },
    ],
  },
  'stats2nde-19': {
    steps: [
      { title: 'Centres des classes', text: '[0;5[ → 2,5 · [5;10[ → 7,5 · [10;15[ → 12,5 · [15;25[ → 20' },
      { title: 'Moyenne approchée', tex: '\\bar{x} \\approx \\dfrac{12\\times 2{,}5 + 18\\times 7{,}5 + 15\\times 12{,}5 + 5\\times 20}{50} = \\dfrac{452{,}5}{50} = 9{,}05 \\text{ h}' },
      { title: 'ECC et classe médiane', text: 'ECC : 12 ; 30 ; 45 ; 50. N/2=25. ECC passe de 12 à 30 sur la classe [5;10[ → classe médiane : [5;10[.' },
      { title: 'Hauteurs histogramme', text: '[0;5[ : h=12/5=2,4 · [5;10[ : h=18/5=3,6 · [10;15[ : h=15/5=3 · [15;25[ : h=5/10=0,5 (amplitude double → hauteur divisée par 2).' },
      { title: 'Valeur approchée', text: 'On ne connaît pas les valeurs individuelles, seulement les classes. On suppose que toutes les données d\'une classe sont au centre, ce qui est une approximation.' },
    ],
  },
  'stats2nde-20': {
    steps: [
      { title: 'Moyennes', tex: '\\bar{x}_A = \\dfrac{102}{9} \\approx 11{,}33 \\qquad \\bar{x}_B = \\dfrac{108}{9} = 12' },
      { title: 'Cinq nombres — Groupe A', text: 'min=9, Q1(rang 2,25→3)=10, Me(rang 5)=11, Q3(rang 6,75→7)=12, max=14. EQI=2, étendue=5.' },
      { title: 'Cinq nombres — Groupe B', text: 'min=4, Q1(rang 3)=9, Me(rang 5)=11, Q3(rang 7)=16, max=20. EQI=7, étendue=16.' },
      { title: 'Comparaison', text: 'Même médiane (11), moyennes proches. En dispersion : EQI de A vaut 2 contre 7 pour B, étendue 5 contre 16. Groupe A est nettement plus homogène.' },
      { title: 'Conseil', text: 'Le Groupe A : à niveau central équivalent, ses élèves ont des résultats resserrés — critère d\'homogénéité.' },
    ],
  },
  'stats2nde-21': {
    steps: [
      { title: 'Moyenne', tex: '\\bar{x} = \\dfrac{3\\times 10+5\\times 11+9\\times 12+7\\times 13+4\\times 14+2\\times 15}{30} = \\dfrac{370}{30} \\approx 12{,}33' },
      { title: 'ECC', text: 'ECC : 3 ; 8 ; 17 ; 24 ; 28 ; 30' },
      { title: 'Médiane, Q1, Q3', text: 'N=30 pair. Me : rangs 15 et 16, ECC=8 à 11 et 17 à 12 → les deux sont en 12, Me=12. Rang Q1=7,5→8, ECC=8 à la note 11 → Q1=11. Rang Q3=22,5→23, ECC=17 à 12 et 24 à 13 → Q3=13.' },
      { title: 'EQI et interprétation', tex: 'EQI = Q_3-Q_1 = 13-11 = 2', text: 'Les 50 % centraux sont contenus dans un intervalle de 2 points : la classe est très homogène.' },
      { title: '+1 point (linéarité)', tex: '\\bar{x}_{\\text{new}} = 12{,}33+1 = 13{,}33 \\qquad Me_{\\text{new}} = 12+1 = 13' },
    ],
  },
  'stats2nde-22': {
    steps: [
      { title: 'Moyenne et médiane', tex: '\\bar{x} = \\dfrac{188}{16} = 11{,}75 \\qquad Me = \\dfrac{10+12}{2} = 11', text: 'La moyenne (11,75) dépasse la médiane (11) de 0,75 : les valeurs 25 et 28 tirent la moyenne vers le haut.' },
      { title: 'Q1, Q3, étendue, EQI', tex: '\\text{Rang } Q_1 = 4 \\to Q_1=6 \\qquad \\text{Rang } Q_3 = 12 \\to Q_3=15', text: 'Étendue = 28−3 = 25. EQI = 15−6 = 9.' },
      { title: 'Diagramme en boîte', text: 'Boîte de 6 à 15, barre à 11, moustaches de 3 à 28.' },
      { title: 'Affirmation de l\'opérateur', text: 'Les valeurs strictement inférieures à 11 sont : 3,4,5,6,6,7,9,10, soit 8 communications sur 16 = exactement la moitié. L\'affirmation est exacte.' },
      { title: 'Sans la valeur 28', text: 'Il reste 15 valeurs. Nouvelle médiane : valeur de rang 8 = 10. Nouvelle étendue : 25−3 = 22. L\'étendue a perdu 3 points, la médiane 1 : c\'est l\'étendue qui a le plus varié.' },
    ],
  },
  'stats2nde-pb1': {
    steps: [
      { title: 'Tableau et série ordonnée', text: 'Note : 8(×1) ; 9(×2) ; 10(×2) ; 11(×2) ; 12(×3) ; 13(×2) ; 14(×3) ; 15(×2) ; 16(×2) ; 17(×1). ECC : 1;3;5;7;10;12;15;17;19;20.' },
      { title: 'Moyenne', tex: '\\bar{x} = \\dfrac{252}{20} = 12{,}6' },
      { title: 'Médiane, Q1, Q3', text: 'N=20 pair. Me=moyenne des rangs 10 et 11=(12+13)/2=12,5. Rang Q1=5→Q1=10. Rang Q3=15→Q3=14.' },
      { title: 'Étendue et EQI', tex: 'e = 17-8 = 9 \\qquad EQI = 14-10 = 4' },
      { title: 'Pourcentage avec la moyenne', text: 'ECC(11)=7 élèves ont une note <12. Donc 20−7=13 élèves ont ≥12, soit 65 %.' },
      { title: '+1 point', tex: '\\bar{x}_{\\text{new}} = 12{,}6+1 = 13{,}6 \\qquad Me_{\\text{new}} = 12{,}5+1 = 13{,}5' },
      { title: 'Diagramme en boîte', text: 'Boîte de 10 à 14, barre à 12,5, moustaches de 8 à 17.' },
    ],
  },
  'stats2nde-pb2': {
    steps: [
      { title: 'Centres et moyenne', tex: '\\bar{x} \\approx \\dfrac{7\\times 10+13\\times 30+22\\times 50+12\\times 70+6\\times 90}{60} = \\dfrac{70+390+1100+840+540}{60} = \\dfrac{2940}{60} = 49 \\text{ €}' },
      { title: 'ECC et FCC', text: 'ECC : 7 ; 20 ; 42 ; 54 ; 60. FCC : 11,7 % ; 33,3 % ; 70,0 % ; 90,0 % ; 100 %.' },
      { title: 'Classe médiane', text: 'N/2=30. L\'ECC vaut 20 en fin de [20;40[ et 42 en fin de [40;60[ : le cumul franchit 30 sur la classe [40;60[ → classe médiane.' },
      { title: 'Au moins 60 €', tex: '\\dfrac{12+6}{60} = \\dfrac{18}{60} = 30\\,\\%' },
      { title: 'Affirmation', text: 'Il faudrait au moins 31 lycéens dépensant moins de 50 €. Or 20 dépensent moins de 40 €, et la classe [40;60[ en contient 22 : 11 d\'entre eux suffiraient. L\'affirmation est possible mais invérifiable — 50 € tombe au milieu d\'une classe.' },
    ],
  },
  'stats2nde-pb3': {
    steps: [
      { title: 'Erreur de saisie', text: 'L\'examen est noté sur 20 : une note de 21 est impossible. On la corrige en 20. Groupe B corrigé (trié) : 5 ; 8 ; 10 ; 13 ; 14 ; 15 ; 17 ; 18 ; 19 ; 20.' },
      { title: 'Moyennes', tex: '\\bar{x}_A = \\dfrac{136}{10} = 13{,}6 \\qquad \\bar{x}_B = \\dfrac{139}{10} = 13{,}9' },
      { title: 'Résumés', text: 'A (trié : 11;12;12;13;13;14;15;15;15;16) : min=11, Q1(rang 3)=12, Me=(13+14)/2=13,5, Q3(rang 8)=15, max=16. EQI=3, étendue=5. B : min=5, Q1=10, Me=(14+15)/2=14,5, Q3=18, max=20. EQI=8, étendue=15.' },
      { title: 'Comparaison', text: 'En position, les deux groupes sont très proches (moyennes 13,6 vs 13,9, médianes 13,5 vs 14,5). L\'écart majeur est en dispersion : étendue 5 contre 15, EQI 3 contre 8. Le groupe A est homogène, le groupe B très dispersé.' },
      { title: 'Conseil méthode', text: 'La méthode B affiche une moyenne à peine supérieure (+0,3 point) mais produit trois élèves sous 11 contre aucun pour A. Généraliser B sur la seule base de la moyenne ignorerait ce risque : la méthode A sécurise le niveau de tous.' },
      { title: 'Affirmation du parent', text: 'Sur les données : 4 élèves de B dépassent 16 contre 1 pour A (le maximum de A est justement 16). Mais la même méthode produit aussi les trois notes les plus faibles. Avec B, la chance d\'une très bonne note augmente en même temps que le risque d\'une mauvaise.' },
    ],
  },
};
