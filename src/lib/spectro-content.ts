import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const SPECTRO_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Sur un spectre IR, l\'axe des nombres d\'onde…',
    options: [
      { label: 'a', text: 'croît vers la droite' },
      { label: 'b', text: 'est inversé ($4000$ à gauche)' },
      { label: 'c', text: 'est en µm' },
      { label: 'd', text: 'est logarithmique' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Une bande large vers $3300\\,\\text{cm}^{-1}$, sans bande vers $1700$, indique…',
    options: [
      { label: 'a', text: 'une cétone' },
      { label: 'b', text: 'un alcool' },
      { label: 'c', text: 'un acide carboxylique' },
      { label: 'd', text: 'un ester' },
    ],
    answer: 'b',
  },
  {
    n: 3,
    text: 'Une bande $\\text{O}-\\text{H}$ très large ($2500-3200$) et une bande $\\text{C}=\\text{O}$ indiquent…',
    options: [
      { label: 'a', text: 'un alcool' },
      { label: 'b', text: 'un aldéhyde' },
      { label: 'c', text: 'un acide carboxylique' },
      { label: 'd', text: 'une amine' },
    ],
    answer: 'c',
  },
  {
    n: 4,
    text: 'La bande $\\text{C}=\\text{O}$ se situe vers…',
    options: [
      { label: 'a', text: '$3300\\,\\text{cm}^{-1}$' },
      { label: 'b', text: '$1700\\,\\text{cm}^{-1}$' },
      { label: 'c', text: '$1000\\,\\text{cm}^{-1}$' },
      { label: 'd', text: '$2900\\,\\text{cm}^{-1}$' },
    ],
    answer: 'b',
  },
  {
    n: 5,
    text: 'Le déplacement chimique s\'exprime en…',
    options: [
      { label: 'a', text: '$\\text{cm}^{-1}$' },
      { label: 'b', text: 'ppm' },
      { label: 'c', text: 'Hz' },
      { label: 'd', text: '$\\text{mol·L}^{-1}$' },
    ],
    answer: 'b',
  },
  {
    n: 6,
    text: 'Le nombre de signaux d\'un spectre RMN est égal au nombre…',
    options: [
      { label: 'a', text: 'd\'atomes de carbone' },
      { label: 'b', text: 'total d\'hydrogènes' },
      { label: 'c', text: 'de groupes de protons équivalents' },
      { label: 'd', text: 'de liaisons' },
    ],
    answer: 'c',
  },
  {
    n: 7,
    text: 'La courbe d\'intégration donne…',
    options: [
      { label: 'a', text: 'le nombre de voisins' },
      { label: 'b', text: 'le rapport des nombres de protons' },
      { label: 'c', text: 'le déplacement chimique' },
      { label: 'd', text: 'la masse molaire' },
    ],
    answer: 'b',
  },
  {
    n: 8,
    text: 'Un proton ayant $3$ voisins équivalents donne…',
    options: [
      { label: 'a', text: 'un triplet' },
      { label: 'b', text: 'un quadruplet' },
      { label: 'c', text: 'un singulet' },
      { label: 'd', text: 'un doublet' },
    ],
    answer: 'b',
  },
  {
    n: 9,
    text: 'Dans la règle des $(n+1)$-uplets, $n$ désigne…',
    options: [
      { label: 'a', text: 'les H du groupe lui-même' },
      { label: 'b', text: 'les H portés par les atomes voisins' },
      { label: 'c', text: 'le nombre de carbones' },
      { label: 'd', text: 'le nombre de signaux' },
    ],
    answer: 'b',
  },
  {
    n: 10,
    text: 'Dans $\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CH}_2-\\text{CH}_3$, le $\\text{CH}_3-\\text{CO}$ donne…',
    options: [
      { label: 'a', text: 'un triplet' },
      { label: 'b', text: 'un quadruplet' },
      { label: 'c', text: 'un singulet' },
      { label: 'd', text: 'un doublet' },
    ],
    answer: 'c',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const SPECTRO_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'spectro-1',
    context: 'Le groupe caractéristique définit la famille fonctionnelle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner le groupe caractéristique et la terminaison du nom pour : un alcool, un aldéhyde, une cétone, un acide carboxylique, un ester.' },
      ],
    }],
  },
  {
    id: 'spectro-2',
    context: 'Reconnaître une famille à partir de la formule semi-développée.',
    parts: [{
      questions: [
        { n: 'a', text: 'Identifier la famille de chacune des molécules suivantes : $\\text{CH}_3-\\text{CH}_2-\\text{OH}$ ; $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ ; $\\text{CH}_3-\\text{COOH}$ ; $\\text{CH}_3-\\text{CHO}$ ; $\\text{CH}_3-\\text{COO}-\\text{CH}_3$.' },
      ],
    }],
  },
  {
    id: 'spectro-3',
    context: 'Lecture d\'un spectre IR : axe et sens des bandes.',
    parts: [{
      questions: [
        { n: 'a', text: 'Sur un spectre IR, dans quel sens varie le nombre d\'onde ? Les bandes d\'absorption pointent-elles vers le haut ou vers le bas ? Justifier à partir de la grandeur portée en ordonnée.' },
      ],
    }],
  },
  {
    id: 'spectro-4',
    context: 'Nombre d\'onde : $\\sigma=\\dfrac{1}{\\lambda}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une bande d\'absorption est observée à $\\sigma=1715\\,\\text{cm}^{-1}$. Calculer la longueur d\'onde $\\lambda$ correspondante, en µm. À quelle liaison cette bande correspond-elle ?' },
      ],
    }],
  },
  {
    id: 'spectro-5',
    context: 'Le déplacement chimique et sa référence.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'est-ce que le déplacement chimique ? En quelle unité s\'exprime-t-il ? Quelle est la molécule de référence et quelle est sa valeur de $\\delta$ ?' },
        { n: 'b', text: 'Pourquoi $\\delta$ ne dépend-il pas du spectromètre ?' },
      ],
    }],
  },
  {
    id: 'spectro-6',
    context: 'Le déblindage rapproche le signal de la gauche du spectre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Dans $\\text{CH}_3-\\text{CH}_2-\\text{OH}$, lequel des deux groupes $\\text{CH}_3$ ou $\\text{CH}_2$ a le déplacement chimique le plus élevé ? Justifier.' },
      ],
    }],
  },
  {
    id: 'spectro-7',
    context: 'La règle des $(n+1)$-uplets.',
    parts: [{
      questions: [
        { n: 'a', text: 'Énoncer la règle des $(n+1)$-uplets. Que vaut $n$ exactement ? Donner le nom du multiplet pour $n=0$, $1$, $2$ et $3$.' },
      ],
    }],
  },
  {
    id: 'spectro-8',
    context: 'L\'intégration ne donne qu\'un rapport : la formule brute tranche.',
    parts: [{
      questions: [
        { n: 'a', text: 'Sur un spectre RMN, les paliers de la courbe d\'intégration sont dans le rapport $2:3$. La molécule a pour formule brute $\\text{C}_2\\text{H}_5\\text{Cl}$. En déduire le nombre de protons de chaque signal.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'spectro-9',
    context: 'IR et RMN ne répondent pas à la même question.',
    parts: [{
      questions: [
        { n: 'a', text: 'À quelle question répond la spectroscopie IR ? À quelle question répond la RMN ? Pourquoi les utilise-t-on ensemble ?' },
      ],
    }],
  },
  {
    id: 'spectro-10',
    context: 'La démarche d\'identification d\'une molécule.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire les quatre étapes de la démarche d\'identification d\'une molécule à partir de sa formule brute et de ses spectres.' },
        { n: 'b', text: 'Pourquoi la formule brute est-elle indispensable ?' },
      ],
    }],
  },
  {
    id: 'spectro-11',
    context: 'Deux spectres IR présentant une bande $\\text{O}-\\text{H}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le premier montre une bande large centrée vers $3300\\,\\text{cm}^{-1}$ et aucune bande vers $1700$. Le second montre une bande très large étalée de $2500$ à $3200$ et une bande fine intense à $1710$. Conclure pour chacun.' },
      ],
    }],
  },
  {
    id: 'spectro-12',
    context: 'En IR, l\'absence est une information.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un spectre IR ne présente ni bande $\\text{C}=\\text{O}$, ni bande $\\text{O}-\\text{H}$. Quelles familles peut-on éliminer ? Que reste-t-il comme possibilités ?' },
      ],
    }],
  },
  {
    id: 'spectro-13',
    context: 'La zone des empreintes digitales.',
    parts: [{
      questions: [
        { n: 'a', text: 'Qu\'appelle-t-on la zone des empreintes digitales ? Pourquoi ne l\'interprète-t-on pas bande par bande ? À quoi sert-elle malgré tout ?' },
      ],
    }],
  },
  {
    id: 'spectro-14',
    context: 'Des protons équivalents donnent un seul signal.',
    parts: [{
      questions: [
        { n: 'a', text: 'Définir des protons équivalents. Combien de signaux comporte le spectre RMN de la propanone $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ ? Justifier.' },
      ],
    }],
  },
  {
    id: 'spectro-15',
    context: 'Nombre de signaux = nombre de groupes de protons équivalents.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien de signaux attend-on pour chacune des molécules suivantes ? Justifier à chaque fois : a) $\\text{CH}_3-\\text{CH}_2-\\text{OH}$ ; b) $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$ ; c) $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ ; d) $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$.' },
      ],
    }],
  },
  {
    id: 'spectro-16',
    context: 'Le proton du $\\text{OH}$ est en échange rapide.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pourquoi le proton du groupe $\\text{OH}$ d\'un alcool apparaît-il en singulet ?' },
        { n: 'b', text: 'Pourquoi son déplacement chimique n\'est-il pas exploitable pour identifier la molécule ?' },
      ],
    }],
  },
  {
    id: 'spectro-17',
    context: 'Éthanoate d\'éthyle $\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CH}_2-\\text{CH}_3$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Prévoir pour chaque groupe : le nombre de protons, la multiplicité et l\'ordre de grandeur de $\\delta$.' },
        { n: 'b', text: 'Justifier en particulier la multiplicité du $\\text{CH}_3-\\text{CO}$.' },
      ],
    }],
  },
  {
    id: 'spectro-18',
    context: 'Un singulet signale un voisin sans hydrogène.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un spectre RMN présente un singulet intégrant pour $3\\,\\text{H}$ vers $\\delta=2{,}1$. Que peut-on en déduire sur l\'environnement de ce $\\text{CH}_3$ ?' },
      ],
    }],
  },
  {
    id: 'spectro-19',
    context: 'L\'IR ne distingue pas toujours deux isomères.',
    parts: [{
      questions: [
        { n: 'a', text: 'Donner un exemple de deux molécules que l\'IR ne permet pas de distinguer mais que la RMN sépare immédiatement. Expliquer.' },
      ],
    }],
  },
  {
    id: 'spectro-20',
    context: 'L\'IR fournit directement la nature du groupe caractéristique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quel renseignement l\'IR fournit-il plus directement que la RMN ? Illustrer.' },
      ],
    }],
  },
  // ── TIER 3 — approfondissement ★★★ ─────────────────────────────────────────
  {
    id: 'spectro-21',
    context: 'Une cétone et un aldéhyde ont tous deux une bande $\\text{C}=\\text{O}$ intense.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'IR permet-il de les distinguer avec certitude ? Justifier.' },
        { n: 'b', text: 'Indiquer quelle technique tranche et sur quel critère.' },
      ],
    }],
  },
  {
    id: 'spectro-22',
    context: 'Le piège le plus fréquent de l\'exercice.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un élève lit un rapport d\'intégration $3:2:1$ et en conclut que la molécule possède $6$ hydrogènes. Sa conclusion est-elle nécessairement correcte ? Justifier, et indiquer ce qui manque à son raisonnement.' },
      ],
    }],
  },
  {
    id: 'spectro-23',
    context: 'Remonter à la structure à partir du spectre RMN.',
    parts: [{
      questions: [
        { n: 'a', text: 'Une molécule de formule $\\text{C}_3\\text{H}_8\\text{O}$ donne un spectre RMN à $3$ signaux : un doublet intégrant pour $6\\,\\text{H}$ vers $\\delta=1{,}2$, un singulet $1\\,\\text{H}$, et un multiplet $1\\,\\text{H}$ vers $\\delta=4{,}0$. Identifier la molécule et justifier chaque signal.' },
      ],
    }],
  },
  {
    id: 'spectro-24',
    context: 'Synthèse de la méthode d\'identification.',
    parts: [{
      questions: [
        { n: 'a', text: 'Rédiger, en cinq lignes maximum, la méthode générale d\'identification d\'une molécule inconnue à partir de sa formule brute, de son spectre IR et de son spectre RMN.' },
      ],
    }],
  },
  {
    id: 'spectro-25',
    context: 'On oxyde un alcool primaire en acide carboxylique.',
    parts: [{
      questions: [
        { n: 'a', text: 'Quelles modifications observe-t-on sur le spectre IR entre le début et la fin de la réaction ?' },
        { n: 'b', text: 'Et sur le spectre RMN ?' },
      ],
    }],
  },
  // ── TIER 4 — sujets type bac ◆ ─────────────────────────────────────────────
  {
    id: 'spectro-26',
    context: 'Deux molécules ont la même formule brute $\\text{C}_3\\text{H}_6\\text{O}$ : le propanal $\\text{CH}_3-\\text{CH}_2-\\text{CHO}$ et la propanone $\\text{CH}_3-\\text{CO}-\\text{CH}_3$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Identifier la famille de chacune. Combien d\'hydrogènes chaque molécule possède-t-elle ?' },
        { n: 'b', text: 'Leurs spectres IR présentent-ils tous deux une bande $\\text{C}=\\text{O}$ ? L\'IR permet-il de les distinguer avec certitude ? Justifier.' },
        { n: 'c', text: 'Combien de signaux comporte le spectre RMN de la propanone ? Justifier par l\'équivalence des protons, et préciser l\'intégration et la multiplicité.' },
        { n: 'd', text: 'Combien de signaux comporte celui du propanal ? Quel signal, absent chez la propanone, permet de trancher immédiatement ? Donner son $\\delta$ attendu.' },
        { n: 'e', text: 'Un spectre RMN inconnu de formule $\\text{C}_3\\text{H}_6\\text{O}$ ne présente qu\'un seul signal, singulet, intégrant pour $6\\,\\text{H}$. Conclure.' },
      ],
    }],
  },
  {
    id: 'spectro-27',
    context: 'Deux isomères de formule $\\text{C}_4\\text{H}_8\\text{O}_2$ : l\'éthanoate d\'éthyle $\\text{CH}_3-\\text{CO}-\\text{O}-\\text{CH}_2-\\text{CH}_3$ et l\'acide butanoïque $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien d\'hydrogènes possède chaque molécule ? Vérifier la cohérence avec la formule brute.' },
        { n: 'b', text: 'Quelle bande, présente sur le spectre IR de l\'un et absente de l\'autre, permet de les distinguer immédiatement ? Préciser son domaine et son allure.' },
        { n: 'c', text: 'Les deux présentent une bande $\\text{C}=\\text{O}$. Leurs positions attendues permettent-elles de conclure à elles seules ? Justifier.' },
        { n: 'd', text: 'Prévoir le spectre RMN de l\'éthanoate d\'éthyle : pour chaque signal, donner l\'intégration, la multiplicité et l\'ordre de grandeur de $\\delta$. Justifier soigneusement la multiplicité du $\\text{CH}_3-\\text{CO}$.' },
        { n: 'e', text: 'Quel signal du spectre RMN de l\'acide butanoïque est absent chez l\'ester ? À quel $\\delta$ l\'attend-on ?' },
        { n: 'f', text: 'Un flacon non étiqueté contient l\'un des deux. Son spectre RMN ne présente aucun signal au-delà de $\\delta=4{,}5$. Conclure, et proposer une vérification par IR.' },
      ],
    }],
  },
  {
    id: 'spectro-28',
    context: 'Un composé $\\text{X}$ a pour formule brute $\\text{C}_3\\text{H}_8\\text{O}$. Son spectre IR présente une bande large vers $3350\\,\\text{cm}^{-1}$ et aucune bande entre $1650$ et $1750\\,\\text{cm}^{-1}$. Son spectre RMN comporte trois signaux : un doublet intégrant pour $6\\,\\text{H}$ ($\\delta\\approx 1{,}2$), un singulet $1\\,\\text{H}$ ($\\delta\\approx 2{,}2$), et un septuplet $1\\,\\text{H}$ ($\\delta\\approx 4{,}0$).',
    parts: [{
      questions: [
        { n: 'a', text: 'Combien d\'hydrogènes $\\text{X}$ possède-t-il ? Vérifier que la somme des intégrations est cohérente.' },
        { n: 'b', text: 'Qu\'indique la bande large à $3350$ ? Que conclut-on de l\'absence de bande vers $1700$ ? Quelles familles sont éliminées ?' },
        { n: 'c', text: 'Les deux isomères possibles sont le propan-1-ol $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ et le propan-2-ol $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$. Combien de signaux attend-on pour chacun ?' },
        { n: 'd', text: 'Le doublet intégrant pour $6\\,\\text{H}$ est décisif. Expliquer précisément pourquoi, en discutant l\'équivalence des protons et le nombre de voisins.' },
        { n: 'e', text: 'Identifier $\\text{X}$ et attribuer chaque signal (intégration, multiplicité, $\\delta$).' },
        { n: 'f', text: 'Justifier que le signal à $\\delta\\approx 4{,}0$ est un septuplet, et que celui du $\\text{OH}$ est un singulet.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const SPECTRO_CORRECTIONS: Record<string, Correction> = {
  'spectro-1': {
    steps: [
      { n: '1', text: '**Alcool** : $-\\text{OH}$ (sur C saturé), terminaison **-ol**. **Aldéhyde** : $-\\text{CHO}$, terminaison **-al**.' },
      { n: '2', text: '**Cétone** : $-\\text{CO}-$, terminaison **-one**. **Acide carboxylique** : $-\\text{COOH}$, nom en **acide -oïque**.' },
      { n: '3', text: '**Ester** : $-\\text{COO}-$, nom en **-oate de -yle**.' },
    ],
    result: 'Alcool $-\\text{OH}$ / -ol · aldéhyde $-\\text{CHO}$ / -al · cétone $-\\text{CO}-$ / -one · acide $-\\text{COOH}$ / acide -oïque · ester $-\\text{COO}-$ / -oate de -yle.',
  },
  'spectro-2': {
    steps: [
      { n: '1', text: '$\\text{CH}_3-\\text{CH}_2-\\text{OH}$ : **alcool** (éthanol). $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ : **cétone** (propanone).' },
      { n: '2', text: '$\\text{CH}_3-\\text{COOH}$ : **acide carboxylique** (acide éthanoïque). $\\text{CH}_3-\\text{CHO}$ : **aldéhyde** (éthanal).' },
      { n: '3', text: '$\\text{CH}_3-\\text{COO}-\\text{CH}_3$ : **ester** (éthanoate de méthyle).' },
    ],
    result: 'alcool · cétone · acide carboxylique · aldéhyde · ester.',
  },
  'spectro-3': {
    steps: [
      { n: '1', text: 'Le nombre d\'onde **décroît** de gauche à droite : l\'axe est **inversé** ($4000$ à gauche, $500$ à droite).' },
      { n: '2', text: 'Les bandes pointent vers le **bas**. En ordonnée figure la **transmittance** : plus une liaison absorbe, moins le rayonnement est transmis, donc plus la transmittance est **faible**. Une forte absorption est donc un **creux**.' },
    ],
    result: 'Axe inversé ($4000\\to 500$) ; les bandes pointent vers le bas (l\'ordonnée est la transmittance).',
  },
  'spectro-4': {
    steps: [
      { n: '1', text: '$\\lambda=\\dfrac{1}{\\sigma}=\\dfrac{1}{1715}\\approx 5{,}83\\times 10^{-4}\\,\\text{cm}$.' },
      { n: '2', text: 'Conversion : $1\\,\\text{cm}=10^{4}$ µm, donc $\\lambda\\approx 5{,}83\\times 10^{-4}\\times 10^{4}\\approx 5{,}8$ µm.' },
      { n: '3', text: 'Cette bande correspond à la liaison $\\text{C}=\\text{O}$ — et plus précisément, à $1715\\,\\text{cm}^{-1}$, à une **cétone**.' },
    ],
    result: '$\\lambda\\approx 5{,}8$ µm — liaison $\\text{C}=\\text{O}$ (cétone).',
  },
  'spectro-5': {
    steps: [
      { n: '1', text: 'Le **déplacement chimique** $\\delta$ repère la position d\'un signal ; il s\'exprime en **ppm** (partie par million). La référence est le **TMS**, auquel on attribue $\\delta=0$ par convention.' },
      { n: '2', text: '$\\delta$ ne dépend pas du spectromètre parce qu\'il est défini comme un **rapport** de fréquences (l\'écart à la référence rapporté à la fréquence de l\'appareil). Le champ magnétique se simplifie : un même proton donne le même $\\delta$ sur tout appareil, ce qui rend les tables universelles.' },
    ],
    result: '$\\delta$ en ppm, référence TMS ($\\delta=0$) ; c\'est un rapport de fréquences, donc indépendant du spectromètre.',
  },
  'spectro-6': {
    steps: [
      { n: '1', text: 'C\'est le $\\text{CH}_2$ qui a le $\\delta$ le plus élevé ($\\approx 3{,}7$ contre $\\approx 1{,}2$ pour le $\\text{CH}_3$).' },
      { n: '2', text: 'Le $\\text{CH}_2$ est directement lié à l\'**oxygène**, atome très électronégatif : il attire les électrons, **déblinde** les protons du $\\text{CH}_2$ et déplace leur signal vers la gauche. Le $\\text{CH}_3$, plus éloigné, est nettement moins affecté.' },
    ],
    result: '$\\delta(\\text{CH}_2)\\approx 3{,}7 > \\delta(\\text{CH}_3)\\approx 1{,}2$ — déblindage par l\'oxygène.',
  },
  'spectro-7': {
    steps: [
      { n: '1', text: '**Règle** : un signal dû à des protons ayant $n$ protons **voisins équivalents** est un multiplet à $n+1$ **pics**.' },
      { n: '2', text: '$n$ est le nombre de protons portés par les atomes **directement liés** à l\'atome porteur — **jamais** les protons du groupe lui-même.' },
      { n: '3', text: '$n=0$ : **singulet** · $n=1$ : **doublet** · $n=2$ : **triplet** · $n=3$ : **quadruplet**.' },
    ],
    result: '$n$ voisins équivalents $\\Rightarrow n+1$ pics ; $n=0,1,2,3$ → singulet, doublet, triplet, quadruplet.',
  },
  'spectro-8': {
    steps: [
      { n: '1', text: '$\\text{C}_2\\text{H}_5\\text{Cl}$ possède $5$ hydrogènes. Le rapport $2:3$ a pour somme $2+3=5$, qui coïncide exactement avec le total : le rapport **est** donc directement le nombre de protons.' },
      { n: '2', text: 'Les signaux intègrent pour $2\\,\\text{H}$ et $3\\,\\text{H}$. La molécule est $\\text{CH}_3-\\text{CH}_2-\\text{Cl}$ : le $\\text{CH}_2$ ($2\\,\\text{H}$, quadruplet, déblindé par $\\text{Cl}$) et le $\\text{CH}_3$ ($3\\,\\text{H}$, triplet).' },
    ],
    result: '$2\\,\\text{H}$ et $3\\,\\text{H}$.',
  },
  'spectro-9': {
    steps: [
      { n: '1', text: 'L\'**IR** répond à : *quels groupes caractéristiques la molécule contient-elle ?* Il identifie les **liaisons** présentes, donc les familles fonctionnelles.' },
      { n: '2', text: 'La **RMN** répond à : *comment les atomes d\'hydrogène sont-ils agencés ?* Elle renseigne sur le **squelette carboné** et l\'environnement de chaque proton.' },
      { n: '3', text: 'On les utilise ensemble parce qu\'aucune ne suffit seule : l\'IR ne distingue pas des isomères portant le même groupe (une cétone d\'un aldéhyde, par exemple), et la RMN ne donne pas directement la nature du groupe fonctionnel. Elles sont **complémentaires**.' },
    ],
    result: 'IR : quels groupes (liaisons). RMN : comment les H sont agencés (squelette). Complémentaires.',
  },
  'spectro-10': {
    steps: [
      { n: '1', text: '**Formule brute** : donne le nombre total d\'hydrogènes.' },
      { n: '2', text: '**IR** : repérer les groupes présents et surtout **absents**.' },
      { n: '3', text: '**RMN** : compter les signaux, lire les intégrations, analyser les multiplicités.' },
      { n: '4', text: '**Croiser** les trois pour conclure.' },
      { n: '5', text: 'La formule brute est **indispensable** car l\'intégration ne fournit qu\'un **rapport** de protons, jamais un nombre absolu. Sans le nombre total de $\\text{H}$, un rapport $3:2:1$ reste indiscernable de $6:4:2$.' },
    ],
    result: 'Formule brute → IR (présents/absents) → RMN (signaux, intégrations, multiplicités) → croiser. La formule brute fixe le facteur multiplicatif de l\'intégration.',
  },
  'spectro-11': {
    steps: [
      { n: '1', text: '**Premier spectre** : bande $\\text{O}-\\text{H}$ large vers $3300$ et **aucune** bande $\\text{C}=\\text{O}$ $\\Longrightarrow$ c\'est un **alcool**.' },
      { n: '2', text: '**Second spectre** : bande $\\text{O}-\\text{H}$ **très large** étalée de $2500$ à $3200$ **et** bande $\\text{C}=\\text{O}$ fine et intense à $1710$ $\\Longrightarrow$ c\'est un **acide carboxylique**. La combinaison des deux bandes est sa signature.' },
    ],
    result: 'alcool · acide carboxylique.',
  },
  'spectro-12': {
    steps: [
      { n: '1', text: 'L\'absence de $\\text{C}=\\text{O}$ élimine d\'un coup : **aldéhyde, cétone, acide carboxylique, ester, amide**.' },
      { n: '2', text: 'L\'absence de $\\text{O}-\\text{H}$ élimine en outre l\'**alcool** (et l\'acide, déjà écarté).' },
      { n: '3', text: 'Il reste les hydrocarbures : **alcane**, **alcène** (que confirmerait une bande $\\text{C}=\\text{C}$ vers $1650$), ou un composé sans groupe caractéristique au programme.' },
      { n: '4', text: 'C\'est l\'illustration du principe : en IR, **l\'absence est une information**.' },
    ],
    result: 'Éliminés : aldéhyde, cétone, acide, ester, amide, alcool. Restent les hydrocarbures (alcane, alcène…).',
  },
  'spectro-13': {
    steps: [
      { n: '1', text: 'La **zone des empreintes digitales** est la région en dessous de $1500\\,\\text{cm}^{-1}$. Elle résulte de vibrations d\'ensemble du squelette : les bandes y sont nombreuses, enchevêtrées et non attribuables individuellement — on ne l\'interprète donc pas bande par bande.' },
      { n: '2', text: 'Elle reste précieuse : étant **propre à chaque molécule**, elle permet une identification certaine par **comparaison** avec un spectre de référence, comme une empreinte digitale.' },
    ],
    result: 'Zone $<1500\\,\\text{cm}^{-1}$, non interprétable bande par bande, mais permet l\'identification par comparaison.',
  },
  'spectro-14': {
    steps: [
      { n: '1', text: 'Des protons sont **équivalents** s\'ils ont le même environnement chimique (souvent par symétrie) : ils donnent alors **un seul signal**.' },
      { n: '2', text: 'Dans la propanone $\\text{CH}_3-\\text{CO}-\\text{CH}_3$, les **deux** $\\text{CH}_3$ sont symétriques par rapport au $\\text{C}=\\text{O}$ : ils sont **équivalents**. Le spectre ne comporte donc qu\'**un seul signal**, intégrant pour $6\\,\\text{H}$.' },
    ],
    result: '1 seul signal (6 H).',
  },
  'spectro-15': {
    steps: [
      { n: 'a', text: '$\\text{CH}_3-\\text{CH}_2-\\text{OH}$ : **3 signaux** — $\\text{CH}_3$, $\\text{CH}_2$, $\\text{OH}$, tous d\'environnements différents.' },
      { n: 'b', text: '$(\\text{CH}_3)_2\\text{CH}-\\text{OH}$ : **3 signaux** — les deux $\\text{CH}_3$ sont **équivalents** (un seul signal, $6\\,\\text{H}$), plus le $\\text{CH}$ et le $\\text{OH}$.' },
      { n: 'c', text: '$\\text{CH}_3-\\text{CO}-\\text{CH}_3$ : **1 signal** — les deux $\\text{CH}_3$ sont équivalents.' },
      { n: 'd', text: '$\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ : **4 signaux** — les deux $\\text{CH}_2$ ne sont **pas** équivalents (l\'un est lié à $\\text{OH}$, l\'autre non), donc $\\text{CH}_3$, $\\text{CH}_2$, $\\text{CH}_2-\\text{OH}$ et $\\text{OH}$.' },
    ],
    result: '3 · 3 · 1 · 4.',
  },
  'spectro-16': {
    steps: [
      { n: '1', text: 'Le proton du $\\text{OH}$ est en **échange rapide** avec ceux des autres molécules du milieu. Cet échange est bien plus rapide que la durée de la mesure : le couplage avec les protons voisins est **moyenné et disparaît**. Le signal apparaît donc en **singulet**.' },
      { n: '2', text: 'Pour la même raison, son $\\delta$ dépend fortement du **solvant**, de la **concentration** et de la température : il est **très variable** et ne figure dans aucune table fiable. On ne s\'en sert donc jamais pour identifier une molécule — en revanche, son **intégration** ($1\\,\\text{H}$) reste parfaitement exploitable.' },
    ],
    result: 'Échange rapide ⇒ singulet et $\\delta$ variable, non tabulé ; seule l\'intégration est exploitable.',
  },
  'spectro-17': {
    steps: [
      { n: '1', text: '$\\text{CH}_3-\\text{CO}$ : $3\\,\\text{H}$, $0$ voisin, **singulet**, $\\delta\\approx 2{,}0$.' },
      { n: '2', text: '$\\text{O}-\\text{CH}_2$ : $2\\,\\text{H}$, $3$ voisins, **quadruplet**, $\\delta\\approx 4{,}1$.' },
      { n: '3', text: '$\\text{CH}_2-\\text{CH}_3$ : $3\\,\\text{H}$, $2$ voisins, **triplet**, $\\delta\\approx 1{,}3$.' },
      { n: '4', text: '**Justification du singulet.** Le $\\text{CH}_3$ de gauche est porté par le carbone du $\\text{C}=\\text{O}$. Or ce carbone ne porte **aucun hydrogène** : ce $\\text{CH}_3$ a donc $n=0$ voisin, d\'où $0+1=1$ pic. Le couplage ne se transmet qu\'entre protons portés par des atomes **voisins** — l\'oxygène de l\'ester, plus loin, ne porte pas non plus de $\\text{H}$.' },
      { n: '5', text: 'Intégration totale : $3+2+3=8\\,\\text{H}$, cohérent avec $\\text{C}_4\\text{H}_8\\text{O}_2$ ✓.' },
    ],
    result: 'singulet 3H ($\\approx 2{,}0$) · quadruplet 2H ($\\approx 4{,}1$) · triplet 3H ($\\approx 1{,}3$) — rapport $3:2:3$.',
  },
  'spectro-18': {
    steps: [
      { n: '1', text: 'Un $\\text{CH}_3$ en **singulet** signifie $n=0$ : l\'atome voisin ne porte **aucun hydrogène**. Ce $\\text{CH}_3$ est donc « isolé » du reste de la chaîne.' },
      { n: '2', text: 'Le $\\delta\\approx 2{,}1$ le situe en $\\alpha$ d\'un $\\text{C}=\\text{O}$. La conclusion la plus probable est un groupe $\\text{CH}_3-\\text{CO}-$ (acétyle) — les autres possibilités étant un $\\text{CH}_3$ fixé sur un carbone quaternaire.' },
    ],
    result: 'Voisin sans H ⇒ $\\text{CH}_3$ isolé ; $\\delta\\approx 2{,}1$ ⇒ groupe $\\text{CH}_3-\\text{CO}-$ (acétyle).',
  },
  'spectro-19': {
    steps: [
      { n: '1', text: '**Exemple** : la propanone $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ et le propanal $\\text{CH}_3-\\text{CH}_2-\\text{CHO}$ (isomères $\\text{C}_3\\text{H}_6\\text{O}$).' },
      { n: '2', text: 'En **IR**, les deux présentent une bande $\\text{C}=\\text{O}$ intense, à des positions trop voisines ($\\approx 1715$ et $\\approx 1725$) pour conclure.' },
      { n: '3', text: 'En **RMN**, la séparation est immédiate : la propanone donne **un seul signal** (singulet, $6\\,\\text{H}$), tandis que le propanal en donne **trois**, dont un signal $\\text{CHO}$ très caractéristique vers $\\delta\\approx 9{,}7$. Impossible de les confondre.' },
    ],
    result: 'Propanone / propanal : IR indécis ($\\text{C}=\\text{O}$ voisins) ; RMN décisive (1 singulet 6H contre 3 signaux dont CHO à 9,7).',
  },
  'spectro-20': {
    steps: [
      { n: '1', text: 'L\'IR donne **directement la nature du groupe caractéristique**, là où la RMN ne la fournit qu\'indirectement.' },
      { n: '2', text: 'Exemple : une bande très large de $2500$ à $3200\\,\\text{cm}^{-1}$ accompagnée d\'un $\\text{C}=\\text{O}$ identifie un **acide carboxylique** en une lecture. En RMN, il faudrait repérer le singulet $\\text{COOH}$ vers $\\delta=10-13$ — un signal parfois large, mal résolu, voire absent selon les conditions.' },
      { n: '3', text: 'De même, l\'**absence** d\'une bande $\\text{C}=\\text{O}$ élimine cinq familles d\'un seul coup d\'œil.' },
    ],
    result: 'L\'IR donne directement la nature du groupe (et son absence élimine cinq familles d\'un coup).',
  },
  'spectro-21': {
    steps: [
      { n: '1', text: '**Non, pas avec certitude.** Les deux possèdent une bande $\\text{C}=\\text{O}$ intense, et leurs positions attendues ($\\approx 1725$ pour l\'aldéhyde, $\\approx 1715$ pour la cétone) sont **trop proches** : l\'écart est du même ordre que la largeur des bandes et que la dispersion due à l\'environnement. On peut suspecter, jamais trancher.' },
      { n: '2', text: 'C\'est la **RMN** qui tranche, sur un critère net : l\'aldéhyde possède un proton $\\text{CHO}$ donnant un signal caractéristique vers $\\delta=9-10$ ppm, zone où une cétone n\'a **aucun** signal.' },
    ],
    result: 'L\'IR ne suffit pas ; la RMN tranche par le signal $\\text{CHO}$ à $\\delta\\approx 9-10$.',
  },
  'spectro-22': {
    steps: [
      { n: '1', text: '**Non.** L\'intégration ne fournit qu\'un **rapport**. Un rapport $3:2:1$ est parfaitement compatible avec $3$, $2$ et $1$ protons (soit $6\\,\\text{H}$), mais tout autant avec $6$, $4$ et $2$ (soit $12\\,\\text{H}$), ou $9$, $6$ et $3$ ($18\\,\\text{H}$).' },
      { n: '2', text: 'Il manque à son raisonnement la **formule brute**. Elle seule donne le nombre total d\'hydrogènes et permet de fixer le facteur multiplicatif. Si la formule impose $6\\,\\text{H}$, alors sa conclusion est juste — mais c\'est la formule qui la justifie, pas l\'intégration seule.' },
    ],
    result: 'Non : l\'intégration ne donne qu\'un rapport ; seule la formule brute fixe le nombre absolu.',
  },
  'spectro-23': {
    steps: [
      { n: '1', text: '$\\text{C}_3\\text{H}_8\\text{O}$ possède $8\\,\\text{H}$. Les intégrations $6+1+1=8$ ✓ : le rapport est directement le nombre de protons.' },
      { n: '2', text: 'Le **doublet intégrant pour $6\\,\\text{H}$** est décisif : $6\\,\\text{H}$ équivalents en un seul signal, ce sont **deux $\\text{CH}_3$ équivalents** ; et le doublet indique $n=1$, donc un unique voisin hydrogéné. Ces deux $\\text{CH}_3$ sont donc portés par un même $\\text{CH}$.' },
      { n: '3', text: 'La molécule est le **propan-2-ol** $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$ : $6\\,\\text{H}$, doublet, $\\delta\\approx 1{,}2$ (les deux $\\text{CH}_3$, voisins du seul $\\text{CH}$, $1+1=2$ pics) ; $1\\,\\text{H}$, singulet, $\\delta\\approx 2{,}2$ (le $\\text{OH}$, échange rapide) ; $1\\,\\text{H}$, septuplet, $\\delta\\approx 4{,}0$ (le $\\text{CH}$, déblindé par l\'oxygène, avec $6$ voisins, $6+1=7$ pics).' },
    ],
    result: 'propan-2-ol $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$.',
  },
  'spectro-24': {
    steps: [
      { n: '1', text: 'Partir de la **formule brute** pour connaître le nombre total d\'hydrogènes.' },
      { n: '2', text: 'Lire l\'**IR** en cherchant d\'abord le $\\text{C}=\\text{O}$ vers $1700$, puis le $\\text{O}-\\text{H}$ vers $3000-3400$ : le croisement présence/absence désigne la famille.' },
      { n: '3', text: 'Passer à la **RMN** : compter les signaux (= nombre de groupes équivalents), convertir les intégrations en nombres de protons à l\'aide de la formule brute, puis déduire les voisinages des multiplicités.' },
      { n: '4', text: '**Confronter** enfin les trois sources : la structure retenue doit expliquer *chaque* signal, sans exception.' },
    ],
    result: 'Formule brute → IR (croisement $\\text{C}=\\text{O}$/$\\text{O}-\\text{H}$) → RMN (signaux, intégrations, multiplicités) → confronter : la structure doit expliquer chaque signal.',
  },
  'spectro-25': {
    steps: [
      { n: '1', text: '**En IR.** Au départ (alcool primaire) : bande $\\text{O}-\\text{H}$ large vers $3300$, pas de $\\text{C}=\\text{O}$. À l\'arrivée (acide carboxylique) : apparition d\'une bande $\\text{C}=\\text{O}$ fine et intense vers $1710$, et la bande $\\text{O}-\\text{H}$ devient **très large**, étalée de $2500$ à $3200$. Le suivi consiste donc à voir **naître** le $\\text{C}=\\text{O}$.' },
      { n: '2', text: '**En RMN.** Le signal du $\\text{CH}_2-\\text{OH}$ ($\\delta\\approx 3{,}5$) **disparaît** — ce carbone devient celui du $\\text{COOH}$ et ne porte plus d\'hydrogène. Apparaît en contrepartie un **singulet** très déblindé vers $\\delta=10-13$ : le proton du $\\text{COOH}$. Le nombre de signaux et les intégrations changent en conséquence.' },
    ],
    result: 'IR : apparition du $\\text{C}=\\text{O}$ + $\\text{O}-\\text{H}$ qui s\'élargit — RMN : perte du $\\text{CH}_2-\\text{OH}$, apparition du $\\text{COOH}$ vers $10-13$.',
  },
  'spectro-26': {
    steps: [
      { n: 'a', text: 'Le propanal $\\text{CH}_3-\\text{CH}_2-\\text{CHO}$ est un **aldéhyde** (groupe $-\\text{CHO}$) ; la propanone $\\text{CH}_3-\\text{CO}-\\text{CH}_3$ est une **cétone** (groupe $-\\text{CO}-$). Étant isomères de formule $\\text{C}_3\\text{H}_6\\text{O}$, chacune possède $6$ **hydrogènes**.' },
      { n: 'b', text: '**Oui**, les deux présentent une bande $\\text{C}=\\text{O}$ intense. L\'IR **ne permet pas** de les distinguer avec certitude : les positions attendues ($\\approx 1725$ pour l\'aldéhyde, $\\approx 1715$ pour la cétone) sont trop proches — l\'écart de $10\\,\\text{cm}^{-1}$ est du même ordre que la largeur des bandes et que la variabilité due à l\'environnement. On peut suspecter, pas conclure.' },
      { n: 'c', text: 'La propanone ne comporte qu\'**un seul signal**. Les deux $\\text{CH}_3$ sont en effet **équivalents** par symétrie par rapport au $\\text{C}=\\text{O}$ : ils ont le même environnement chimique et donnent donc un signal unique. Ce signal intègre pour $6\\,\\text{H}$ et c\'est un **singulet** : le carbone voisin de chaque $\\text{CH}_3$ est celui du $\\text{C}=\\text{O}$, qui ne porte aucun hydrogène ($n=0$). Son $\\delta\\approx 2{,}1$ (en $\\alpha$ d\'un carbonyle).' },
      { n: 'd', text: 'Le propanal comporte **trois signaux** : $\\text{CHO}$ ($1\\,\\text{H}$), $\\text{CH}_2$ ($2\\,\\text{H}$) et $\\text{CH}_3$ ($3\\,\\text{H}$) — trois environnements distincts, intégration $1:2:3$, soit $6\\,\\text{H}$ ✓. Le signal qui tranche immédiatement est celui du proton $\\text{CHO}$, attendu vers $\\delta\\approx 9{,}7$ ppm (domaine $9{,}0-10{,}0$). La propanone n\'a **aucun** signal dans cette zone : sa présence ou son absence est un critère net.' },
      { n: 'e', text: 'Un **seul** signal, **singulet**, intégrant pour $6\\,\\text{H}$ : c\'est exactement la signature de la **propanone**. Le propanal donnerait trois signaux, dont le $\\text{CHO}$ vers $9{,}7$. Le composé est donc la **propanone** $\\text{CH}_3-\\text{CO}-\\text{CH}_3$.' },
      { n: 'f', text: '**Remarque de rigueur.** La multiplicité du $\\text{CH}_2$ du propanal n\'est pas demandée, et pour cause : ses voisins (les $3\\,\\text{H}$ du $\\text{CH}_3$ et le $1\\,\\text{H}$ du $\\text{CHO}$) ne sont **pas équivalents entre eux**. La règle des $(n+1)$-uplets, qui suppose des voisins équivalents, ne s\'applique pas rigoureusement : le signal réel est un multiplet complexe. Au bac, on se limite aux cas où les voisins sont équivalents.' },
    ],
    result: 'aldéhyde / cétone · IR insuffisant · propanone : 1 singulet 6H · propanal : 3 signaux dont CHO à 9,7 · X = propanone.',
  },
  'spectro-27': {
    steps: [
      { n: 'a', text: 'Éthanoate d\'éthyle : $3+2+3=8\\,\\text{H}$. Acide butanoïque : $3+2+2+1=8\\,\\text{H}$. Les deux sont cohérents avec $\\text{C}_4\\text{H}_8\\text{O}_2$ ✓ — ce sont bien des **isomères**.' },
      { n: 'b', text: 'La bande $\\text{O}-\\text{H}$ : présente chez l\'acide, **absente** chez l\'ester. Chez l\'acide carboxylique, elle est **très large** et étalée de $2500$ à $3200\\,\\text{cm}^{-1}$ — une allure caractéristique, impossible à manquer, qui empiète sur la zone des $\\text{C}-\\text{H}$. L\'ester n\'a aucune bande dans cette région.' },
      { n: 'c', text: '**Non.** Les positions attendues ($\\approx 1735$ pour l\'ester, $\\approx 1710$ pour l\'acide) sont trop rapprochées pour conclure seules. C\'est bien la présence ou l\'absence du $\\text{O}-\\text{H}$ qui constitue le critère fiable.' },
      { n: 'd', text: 'Spectre de l\'éthanoate d\'éthyle : $\\text{CH}_3-\\text{CO}$ ($3\\,\\text{H}$, $0$ voisin, **singulet**, $\\delta\\approx 2{,}0$) ; $\\text{O}-\\text{CH}_2$ ($2\\,\\text{H}$, $3$ voisins, **quadruplet**, $\\delta\\approx 4{,}1$) ; $\\text{CH}_2-\\text{CH}_3$ ($3\\,\\text{H}$, $2$ voisins, **triplet**, $\\delta\\approx 1{,}3$). **Justification du $\\text{CH}_3-\\text{CO}$** : il est porté par le carbone du $\\text{C}=\\text{O}$, qui ne porte **aucun hydrogène**. Donc $n=0$ et le signal est un **singulet** — le couplage ne se transmettant qu\'aux protons des atomes voisins, ce $\\text{CH}_3$ ne « voit » personne. Total : $3+2+3=8\\,\\text{H}$ ✓.' },
      { n: 'e', text: 'Le signal du proton $\\text{COOH}$, absent chez l\'ester, attendu vers $\\delta=10-13$ ppm (typiquement $\\approx 11-12$), en **singulet** intégrant pour $1\\,\\text{H}$.' },
      { n: 'f', text: 'Aucun signal au-delà de $\\delta=4{,}5$ $\\Longrightarrow$ **pas de $\\text{COOH}$** (qui apparaîtrait vers $10-13$). Le flacon contient donc l\'**éthanoate d\'éthyle**. Le signal le plus déblindé attendu est celui du $\\text{O}-\\text{CH}_2$ à $\\approx 4{,}1$, bien en deçà de $4{,}5$ — parfaitement cohérent. **Vérification par IR** : contrôler l\'**absence** de la bande $\\text{O}-\\text{H}$ très large ($2500-3200$). Son absence confirmerait l\'ester ; sa présence infirmerait la conclusion.' },
    ],
    result: '$\\text{O}-\\text{H}$ très large = critère décisif · ester : singulet 3H / quadruplet 2H / triplet 3H · flacon = éthanoate d\'éthyle.',
  },
  'spectro-28': {
    steps: [
      { n: 'a', text: '$\\text{C}_3\\text{H}_8\\text{O}$ possède $8$ **hydrogènes**. Somme des intégrations : $6+1+1=8$ ✓. Le rapport lu **est** donc directement le nombre de protons de chaque signal.' },
      { n: 'b', text: 'La bande **large** à $3350\\,\\text{cm}^{-1}$ est celle d\'un $\\text{O}-\\text{H}$ d\'**alcool** (domaine $3200-3400$, allure large). Elle n\'est pas assez étalée pour être celle d\'un acide ($2500-3200$). L\'**absence** de bande entre $1650$ et $1750$ signifie qu\'il n\'y a **pas de $\\text{C}=\\text{O}$**. Cela élimine d\'un coup : **aldéhyde, cétone, acide carboxylique, ester, amide**. Combiné au $\\text{O}-\\text{H}$, il ne reste que la famille des **alcools** — ce que confirme la formule $\\text{C}_3\\text{H}_8\\text{O}$.' },
      { n: 'c', text: '**Propan-1-ol** $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ : **4 signaux** (les deux $\\text{CH}_2$ ne sont pas équivalents), d\'intégrations $3:2:2:1$. **Propan-2-ol** $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$ : **3 signaux** (les deux $\\text{CH}_3$ sont équivalents), d\'intégrations $6:1:1$. Le spectre en comporte **trois** : le propan-1-ol est déjà écarté.' },
      { n: 'd', text: 'Le doublet $6\\,\\text{H}$ est décisif pour **deux** raisons combinées. D\'abord l\'**intégration** : $6\\,\\text{H}$ réunis en un **seul** signal imposent **deux $\\text{CH}_3$ équivalents**. Or, dans le propan-1-ol, il n\'y a qu\'un seul $\\text{CH}_3$ : un signal à $6\\,\\text{H}$ y est impossible. Ensuite la **multiplicité** : un doublet signifie $n=1$, donc un **unique** proton voisin. Les deux $\\text{CH}_3$ sont donc portés par un carbone qui ne porte qu\'**un seul $\\text{H}$** : c\'est un $\\text{CH}$. La structure $(\\text{CH}_3)_2\\text{CH}-$ est imposée. Dans le propan-1-ol, le $\\text{CH}_3$ est voisin d\'un $\\text{CH}_2$ ($2\\,\\text{H}$) et donnerait un **triplet**.' },
      { n: 'e', text: '$\\text{X}$ est le **propan-2-ol** $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$. Signal 1 : les deux $\\text{CH}_3$ (équivalents), $6\\,\\text{H}$, doublet, $\\delta\\approx 1{,}2$. Signal 2 : le $\\text{OH}$, $1\\,\\text{H}$, singulet, $\\delta\\approx 2{,}2$. Signal 3 : le $\\text{CH}$, $1\\,\\text{H}$, septuplet, $\\delta\\approx 4{,}0$.' },
      { n: 'f', text: 'Le $\\text{CH}$ a pour voisins les **six** protons des deux $\\text{CH}_3$, qui sont équivalents entre eux : $n=6$, donc $6+1=7$ pics — un **septuplet**. Son $\\delta\\approx 4{,}0$ s\'explique par le **déblindage** dû à l\'oxygène auquel il est directement lié (domaine $\\text{CH}-\\text{O}$ : $3{,}3-4{,}5$) ✓. Le $\\text{OH}$ est un **singulet** car son proton est en **échange rapide** avec le milieu : le couplage avec le $\\text{CH}$ voisin est moyenné et disparaît. C\'est aussi pourquoi son $\\delta$ est variable et non tabulé.' },
    ],
    result: '$\\text{X}$ = propan-2-ol $(\\text{CH}_3)_2\\text{CH}-\\text{OH}$ — doublet 6H (1,2) · singulet 1H OH (2,2) · septuplet 1H CH (4,0).',
  },
};
