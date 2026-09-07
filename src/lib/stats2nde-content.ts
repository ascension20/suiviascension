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
  // ── TIER 1 — Automatismes ★ ────────────────────────────────────────────────
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
      { n: 1, text: 'Calculer l\'étendue.' },
      { n: 2, text: 'On ajoute la valeur $45$. Que devient l\'étendue ? Que peut-on conclure ?' },
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
      { n: 1, text: 'Déterminer la médiane. Appartient-elle à la série ?' },
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
  // ── TIER 2 — Méthodes ★★ ──────────────────────────────────────────────────
  {
    id: 'stats2nde-9',
    title: 'Tous les indicateurs',
    subject: '30 personnes ont lu 0, 1, 2, 3 ou 4 livres le mois dernier (effectifs : 5, 8, 11, 4, 2).',
    questions: [
      { n: 1, text: 'Calculer la moyenne.' },
      { n: 2, text: 'Construire la ligne des effectifs cumulés croissants.' },
      { n: 3, text: 'Déterminer la médiane, $Q_1$ et $Q_3$.' },
      { n: 4, text: "Calculer l'étendue et l'écart interquartile." },
      { n: 5, text: 'Interpréter $Q_3$ par une phrase.' },
    ],
  },
  {
    id: 'stats2nde-10',
    title: 'Diagramme en boîte',
    subject: 'Série ordonnée de 15 valeurs : $4\\,;\\,6\\,;\\,7\\,;\\,9\\,;\\,11\\,;\\,12\\,;\\,12\\,;\\,15\\,;\\,17\\,;\\,19\\,;\\,23\\,;\\,28\\,;\\,31\\,;\\,34\\,;\\,40$.',
    questions: [
      { n: 1, text: 'Déterminer le minimum, $Q_1$, la médiane, $Q_3$, le maximum.' },
      { n: 2, text: 'Construire le diagramme en boîte sur un axe gradué de 0 à 40.' },
      { n: 3, text: 'La série est-elle symétrique ? Justifier.' },
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
    subject: 'Notes : 13 (coef. 5), 8 (coef. 4), 16 (coef. 2), 11 (coef. 1).',
    questions: [
      { n: 1, text: 'Calculer la moyenne générale (arrondie au centième).' },
      { n: 2, text: 'Les coefficients deviennent 2, 4, 5, 1. Calculer la nouvelle moyenne.' },
      { n: 3, text: 'Expliquer pourquoi la moyenne a augmenté.' },
    ],
  },
  {
    id: 'stats2nde-13',
    title: 'Valeur manquante',
    subject: '',
    questions: [
      { n: 1, text: 'Un élève a 5 notes de moyenne 12. Quatre sont : 9, 14, 11, 15. Retrouver la cinquième.' },
      { n: 2, text: 'Un autre élève a 6 notes de moyenne 11,5. Cinq sont : 8, 12, 10, 14, 13. Retrouver la sixième.' },
    ],
  },
  {
    id: 'stats2nde-14',
    title: 'Réunion de deux groupes',
    subject: '18 élèves de spécialité A ont une moyenne de 11,5 et 12 élèves de spécialité B ont une moyenne de 14.',
    questions: [
      { n: 1, text: 'Calculer la moyenne de la classe entière.' },
      { n: 2, text: "Un élève affirme que la moyenne est $\\frac{11{,}5+14}{2}=12{,}75$. Expliquer son erreur." },
    ],
  },
  // ── TIER 3 — Situations complètes ★★★ ─────────────────────────────────────
  {
    id: 'stats2nde-15',
    title: 'Série en classes — Réseaux sociaux',
    subject: 'Temps passé chaque jour sur les réseaux par 50 élèves, en heures. Classes $[0;5[$, $[5;10[$, $[10;15[$, $[15;25[$ avec effectifs 12, 18, 15, 5.',
    questions: [
      { n: 1, text: 'Donner le centre de chaque classe.' },
      { n: 2, text: 'Calculer la moyenne approchée.' },
      { n: 3, text: 'Construire les ECC et déterminer la classe médiane.' },
      { n: 4, text: 'Calculer la hauteur de chaque rectangle (aire proportionnelle à l\'effectif) et tracer l\'histogramme.' },
      { n: 5, text: 'Pourquoi la moyenne obtenue n\'est-elle qu\'une valeur approchée ?' },
    ],
  },
  {
    id: 'stats2nde-16',
    title: 'Comparer deux séries',
    subject: 'Deux groupes de 9 élèves. Groupe A : 9;10;10;11;11;12;12;13;14. Groupe B : 4;6;9;11;11;13;16;18;20.',
    questions: [
      { n: 1, text: 'Calculer la moyenne de chaque groupe (arrondie au centième).' },
      { n: 2, text: 'Déterminer les cinq nombres du résumé pour chaque groupe.' },
      { n: 3, text: 'Tracer les deux diagrammes en boîte sur un même axe.' },
      { n: 4, text: 'Rédiger une comparaison (position puis dispersion).' },
      { n: 5, text: 'Le professeur veut un groupe homogène pour un projet. Lequel conseiller ?' },
    ],
  },
  {
    id: 'stats2nde-17',
    title: 'Effet d\'une valeur extrême',
    subject: 'Sept salaires mensuels (en €) : 1500 ; 1600 ; 1700 ; 1800 ; 1900 ; 2000 ; 2100.',
    questions: [
      { n: 1, text: 'Calculer la moyenne et la médiane.' },
      { n: 2, text: 'Le dernier salarié est remplacé par un dirigeant payé 12 000 €. Recalculer les deux indicateurs.' },
      { n: 3, text: 'Lequel des deux décrit le mieux la situation d\'un salarié typique ?' },
    ],
  },
  // ── TIER 4 — Problème de synthèse ◆ ──────────────────────────────────────
  {
    id: 'stats2nde-18',
    title: 'Problème — Les notes d\'une classe',
    subject: '20 élèves ont obtenu : 12;14;9;16;11;13;15;8;17;12;10;14;13;11;15;9;16;12;14;10.',
    questions: [
      { n: 1, text: 'Regrouper dans un tableau d\'effectifs puis ordonner la série.' },
      { n: 2, text: 'Calculer la moyenne.' },
      { n: 3, text: 'Déterminer la médiane, $Q_1$ et $Q_3$.' },
      { n: 4, text: "Calculer l'étendue et l'écart interquartile." },
      { n: 5, text: 'Quel pourcentage d\'élèves a la moyenne (note ≥ 12) ?' },
      { n: 6, text: 'Le professeur ajoute 1 point. Donner la nouvelle moyenne et la nouvelle médiane sans recalculer.' },
      { n: 7, text: 'Construire le diagramme en boîte.' },
    ],
  },
];

// ── Corrections ────────────────────────────────────────────────────────────────
export const STATS2NDE_CORRECTIONS: Record<string, Correction> = {
  'stats2nde-1': {
    steps: [
      {
        title: 'Calcul de la moyenne',
        tex: '\\bar{x} = \\dfrac{9+10+12+14+15}{5} = \\dfrac{60}{5} = 12',
      },
    ],
  },
  'stats2nde-2': {
    steps: [
      {
        title: 'Effectif total',
        tex: 'N = 4+6+7+3 = 20',
      },
      {
        title: 'Moyenne pondérée',
        tex: '\\bar{x} = \\dfrac{4\\times 5 + 6\\times 10 + 7\\times 15 + 3\\times 20}{20} = \\dfrac{20+60+105+60}{20} = \\dfrac{245}{20} = 12{,}25',
      },
    ],
  },
  'stats2nde-3': {
    steps: [
      {
        title: 'Moyenne avec coefficients',
        tex: '\\bar{x} = \\dfrac{3\\times 8 + 2\\times 12 + 4\\times 15 + 1\\times 10}{3+2+4+1} = \\dfrac{24+24+60+10}{10} = \\dfrac{118}{10} = 11{,}8',
      },
      {
        title: 'Moyenne sans coefficients',
        tex: '\\bar{x}_0 = \\dfrac{8+12+15+10}{4} = \\dfrac{45}{4} = 11{,}25',
        text: 'Oui, les coefficients l\'ont avantagé : 11,8 > 11,25 car sa meilleure note (15) porte le coefficient le plus élevé (4).',
      },
    ],
  },
  'stats2nde-4': {
    steps: [
      {
        title: 'Fréquences',
        text: 'f(0)=6/40=0,15 → 15% · f(1)=9/40=0,225 → 22,5% · f(2)=15/40=0,375 → 37,5% · f(3)=10/40=0,25 → 25%. Somme = 1 ✓',
      },
      {
        title: 'Effectifs cumulés croissants',
        text: 'ECC : 6 ; 15 ; 30 ; 40',
      },
      {
        title: 'Au plus 2 frères et sœurs',
        text: 'ECC(2) = 30 élèves, soit 30/40 = 75 %.',
      },
    ],
  },
  'stats2nde-5': {
    steps: [
      {
        title: 'Étendue initiale',
        tex: 'e = \\max - \\min = 30 - 9 = 21',
      },
      {
        title: 'Après ajout de 45',
        tex: 'e = 45 - 9 = 36',
        text: 'L\'étendue a augmenté de 15 avec l\'ajout d\'une seule valeur extrême. Cela illustre la fragilité de l\'étendue face aux valeurs aberrantes.',
      },
    ],
  },
  'stats2nde-6': {
    steps: [
      {
        title: 'Série ordonnée',
        tex: '3\\,;\\,5\\,;\\,7\\,;\\,8\\,;\\,9\\,;\\,12\\,;\\,15',
        text: 'N = 7 (impair). Rang médian : (7+1)/2 = 4.',
      },
      {
        title: 'Médiane',
        tex: 'Me = 8 \\quad (4^{\\text{e}} \\text{ valeur})',
      },
    ],
  },
  'stats2nde-7': {
    steps: [
      {
        title: 'Série ordonnée',
        tex: '2\\,;\\,4\\,;\\,6\\,;\\,9\\,;\\,11\\,;\\,14',
        text: 'N = 6 (pair). On prend la moyenne des rangs 3 et 4.',
      },
      {
        title: 'Médiane',
        tex: 'Me = \\dfrac{6+9}{2} = 7{,}5',
        text: 'La médiane 7,5 n\'appartient pas à la série.',
      },
    ],
  },
  'stats2nde-8': {
    steps: [
      {
        title: 'N et rangs',
        tex: 'N = 12 \\quad \\text{Rang } Q_1 : \\tfrac{12}{4} = 3 \\quad \\text{Rang } Q_3 : \\tfrac{3\\times 12}{4} = 9',
      },
      {
        title: 'Valeurs',
        tex: 'Q_1 = 4 \\quad Me = \\dfrac{9+10}{2} = 9{,}5 \\quad Q_3 = 15',
      },
      {
        title: 'Écart interquartile',
        tex: 'Q_3 - Q_1 = 15 - 4 = 11',
      },
    ],
  },
  'stats2nde-9': {
    steps: [
      {
        title: 'Moyenne',
        tex: '\\bar{x} = \\dfrac{5\\times 0 + 8\\times 1 + 11\\times 2 + 4\\times 3 + 2\\times 4}{30} = \\dfrac{0+8+22+12+8}{30} = \\dfrac{50}{30} \\approx 1{,}67',
      },
      {
        title: 'ECC',
        text: 'ECC : 5 ; 13 ; 24 ; 28 ; 30',
      },
      {
        title: 'Médiane, Q1, Q3',
        text: 'N=30 pair. Médiane = moyenne des rangs 15 et 16 → ECC atteint 24 en valeur 2 → Me = 2. Rang Q1 = 30/4 = 7,5 → rang 8 → Q1 = 1. Rang Q3 = 22,5 → rang 23 → Q3 = 3.',
      },
      {
        title: 'Dispersion',
        tex: 'e = 4 - 0 = 4 \\qquad Q_3 - Q_1 = 3 - 1 = 2',
      },
      {
        title: 'Interprétation de Q3',
        text: '75 % des personnes ont lu 3 livres ou moins le mois dernier.',
      },
    ],
  },
  'stats2nde-10': {
    steps: [
      {
        title: 'Cinq nombres',
        text: 'N = 15 (impair). min = 4. Rang Q1 : 15/4 = 3,75 → rang 4 → Q1 = 9. Rang médiane : (15+1)/2 = 8 → Me = 15. Rang Q3 : 3×15/4 = 11,25 → rang 12 → Q3 = 28. max = 40.',
      },
      {
        title: 'Symétrie',
        text: 'Non : la moustache droite (28→40 = 12) est plus longue que la gauche (4→9 = 5), et Me (15) n\'est pas au centre de la boîte [9;28]. La série est asymétrique à droite.',
      },
    ],
  },
  'stats2nde-11': {
    steps: [
      {
        title: '+2 points à chaque copie',
        tex: '\\bar{x}_{\\text{new}} = 13{,}4 + 2 = 15{,}4',
      },
      {
        title: '×1,5 chaque note',
        tex: '\\bar{x}_{\\text{new}} = 1{,}5 \\times 13{,}4 = 20{,}1',
      },
      {
        title: 'Doubler puis enlever 5',
        tex: '\\bar{x}_{\\text{new}} = 2 \\times 13{,}4 - 5 = 26{,}8 - 5 = 21{,}8',
      },
    ],
  },
  'stats2nde-12': {
    steps: [
      {
        title: 'Coefficients 5, 4, 2, 1',
        tex: '\\bar{x} = \\dfrac{5\\times 13 + 4\\times 8 + 2\\times 16 + 1\\times 11}{5+4+2+1} = \\dfrac{65+32+32+11}{12} = \\dfrac{140}{12} \\approx 11{,}67',
      },
      {
        title: 'Coefficients 2, 4, 5, 1',
        tex: '\\bar{x} = \\dfrac{2\\times 13 + 4\\times 8 + 5\\times 16 + 1\\times 11}{12} = \\dfrac{26+32+80+11}{12} = \\dfrac{149}{12} \\approx 12{,}42',
      },
      {
        title: 'Explication',
        text: 'La moyenne a augmenté car la note 16 (la plus haute) porte maintenant le coefficient le plus fort (5 au lieu de 2).',
      },
    ],
  },
  'stats2nde-13': {
    steps: [
      {
        title: 'Question 1 — somme totale',
        tex: 'N\\bar{x} = 5 \\times 12 = 60 \\quad \\text{Somme des 4 connues} = 9+14+11+15 = 49',
      },
      {
        title: 'Cinquième note',
        tex: 'x_5 = 60 - 49 = 11',
      },
      {
        title: 'Question 2 — somme totale',
        tex: 'N\\bar{x} = 6 \\times 11{,}5 = 69 \\quad \\text{Somme des 5 connues} = 8+12+10+14+13 = 57',
      },
      {
        title: 'Sixième note',
        tex: 'x_6 = 69 - 57 = 12',
      },
    ],
  },
  'stats2nde-14': {
    steps: [
      {
        title: 'Moyenne pondérée',
        tex: '\\bar{x} = \\dfrac{18 \\times 11{,}5 + 12 \\times 14}{18+12} = \\dfrac{207 + 168}{30} = \\dfrac{375}{30} = 12{,}5',
      },
      {
        title: 'Erreur de l\'élève',
        text: 'Il a calculé la moyenne arithmétique des deux moyennes, sans tenir compte des effectifs différents (18 ≠ 12). On ne peut faire la moyenne des moyennes que si les groupes ont le même effectif.',
      },
    ],
  },
  'stats2nde-15': {
    steps: [
      {
        title: 'Centres des classes',
        text: '[0;5[ → 2,5 · [5;10[ → 7,5 · [10;15[ → 12,5 · [15;25[ → 20',
      },
      {
        title: 'Moyenne approchée',
        tex: '\\bar{x} \\approx \\dfrac{12\\times 2{,}5 + 18\\times 7{,}5 + 15\\times 12{,}5 + 5\\times 20}{50} = \\dfrac{30+135+187{,}5+100}{50} = \\dfrac{452{,}5}{50} = 9{,}05\\text{ h}',
      },
      {
        title: 'ECC et classe médiane',
        text: 'ECC : 12 ; 30 ; 45 ; 50. N/2 = 25. L\'ECC atteint 30 dans la classe [5;10[ → classe médiane : [5;10[.',
      },
      {
        title: 'Hauteurs histogramme',
        text: '[0;5[ : h=12/5=2,4 · [5;10[ : h=18/5=3,6 · [10;15[ : h=15/5=3 · [15;25[ : h=5/10=0,5 (amplitude double → hauteur divisée par 2).',
      },
      {
        title: 'Pourquoi approchée',
        text: 'On ne connaît pas les valeurs individuelles, seulement les classes. On suppose que toutes les valeurs d\'une classe sont au centre, ce qui est une approximation.',
      },
    ],
  },
  'stats2nde-16': {
    steps: [
      {
        title: 'Moyennes',
        tex: '\\bar{x}_A = \\dfrac{9+10+10+11+11+12+12+13+14}{9} = \\dfrac{102}{9} \\approx 11{,}33 \\qquad \\bar{x}_B = \\dfrac{4+6+9+11+11+13+16+18+20}{9} = \\dfrac{108}{9} = 12',
      },
      {
        title: 'Cinq nombres — Groupe A',
        text: 'min=9, Q1 (rang 2,25→3) = 10, Me (rang 5) = 11, Q3 (rang 6,75→7) = 12, max=14.',
      },
      {
        title: 'Cinq nombres — Groupe B',
        text: 'min=4, Q1 (rang 3) = 9, Me (rang 5) = 11, Q3 (rang 7) = 16, max=20.',
      },
      {
        title: 'Comparaison',
        text: 'Position : les médianes sont égales (11), la moyenne de B est légèrement supérieure (12 vs 11,33). Dispersion : l\'écart interquartile de A vaut 12−10=2 contre 16−9=7 pour B, et l\'étendue de A est 5 contre 16 pour B. Groupe A est beaucoup plus homogène.',
      },
      {
        title: 'Conseil',
        text: 'Pour un projet demandant un niveau homogène, choisir le Groupe A (EQI = 2 contre 7).',
      },
    ],
  },
  'stats2nde-17': {
    steps: [
      {
        title: 'Indicateurs initiaux',
        tex: '\\bar{x} = \\dfrac{1500+1600+1700+1800+1900+2000+2100}{7} = \\dfrac{12600}{7} = 1800 \\text{ €} \\qquad Me = 1800 \\text{ €}',
      },
      {
        title: 'Après remplacement par 12 000 €',
        tex: '\\bar{x} = \\dfrac{12600 - 2100 + 12000}{7} = \\dfrac{22500}{7} \\approx 3214 \\text{ €} \\qquad Me = 1800 \\text{ €(inchangée)}',
      },
      {
        title: 'Meilleur indicateur',
        text: 'La médiane (1 800 €) décrit mieux la situation : aucun salarié ne gagne la moyenne de 3 214 €, et six des sept gagnent moins de 2 100 €. La moyenne est faussée par la valeur extrême du dirigeant.',
      },
    ],
  },
  'stats2nde-18': {
    steps: [
      {
        title: 'Série ordonnée',
        text: '8 ; 9 ; 9 ; 10 ; 10 ; 11 ; 11 ; 12 ; 12 ; 12 ; 13 ; 13 ; 14 ; 14 ; 14 ; 15 ; 15 ; 16 ; 16 ; 17',
      },
      {
        title: 'Moyenne',
        tex: '\\bar{x} = \\dfrac{252}{20} = 12{,}6',
      },
      {
        title: 'Médiane, Q1, Q3',
        tex: 'N=20. \\text{ Rangs médiane : 10 et 11} \\to Me = \\dfrac{12+13}{2} = 12{,}5',
        text: 'Rang Q1 : 20/4=5 → Q1 = 10. Rang Q3 : 15 → Q3 = 15.',
      },
      {
        title: 'Dispersion',
        tex: 'e = 17-8 = 9 \\qquad Q_3 - Q_1 = 15-10 = 5',
      },
      {
        title: 'Pourcentage avec la moyenne',
        text: 'Notes ≥ 12 : 8;9;9;10;10;11;11 → 7 élèves < 12. Donc 20−7 = 13 élèves ont la moyenne, soit 13/20 = 65 %.',
      },
      {
        title: '+1 point (linéarité)',
        tex: '\\bar{x}_{\\text{new}} = 12{,}6 + 1 = 13{,}6 \\qquad Me_{\\text{new}} = 12{,}5 + 1 = 13{,}5',
      },
    ],
  },
};
