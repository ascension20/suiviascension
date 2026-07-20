import type { QcmQuestion, Correction, ExerciseContent } from './newton-content';

// ── QCM Flash ──────────────────────────────────────────────────────────────────
export const NOMBRES2NDE_QCM: QcmQuestion[] = [
  {
    n: 1,
    text: 'Le nombre $-4$ appartient au plus petit ensemble…',
    options: [
      { label: 'a', text: '$\\mathbb{N}$' },
      { label: 'b', text: '$\\mathbb{Z}$' },
      { label: 'c', text: '$\\mathbb{Q}$' },
      { label: 'd', text: '$\\mathbb{R}$' },
    ],
    answer: 'b',
  },
  {
    n: 2,
    text: 'Parmi ces nombres, lequel est irrationnel ?',
    options: [
      { label: 'a', text: '$\\dfrac{2}{5}$' },
      { label: 'b', text: '$0{,}75$' },
      { label: 'c', text: '$\\sqrt{3}$' },
      { label: 'd', text: '$-7$' },
    ],
    answer: 'c',
  },
  {
    n: 3,
    text: 'L\'inégalité $x>2$ correspond à l\'intervalle…',
    options: [
      { label: 'a', text: '$[2\\,;+\\infty[$' },
      { label: 'b', text: '$]-\\infty\\,;2[$' },
      { label: 'c', text: '$[2\\,;+\\infty]$' },
      { label: 'd', text: '$]2\\,;+\\infty[$' },
    ],
    answer: 'd',
  },
  {
    n: 4,
    text: 'Le nombre $3$ appartient à…',
    options: [
      { label: 'a', text: '$]3\\,;7]$' },
      { label: 'b', text: '$]0\\,;3[$' },
      { label: 'c', text: '$[3\\,;8]$' },
      { label: 'd', text: '$]-\\infty\\,;3[$' },
    ],
    answer: 'c',
  },
  {
    n: 5,
    text: '$[-1\\,;4]\\cap[2\\,;6]$ est égal à…',
    options: [
      { label: 'a', text: '$[2\\,;4]$' },
      { label: 'b', text: '$[-1\\,;6]$' },
      { label: 'c', text: '$\\varnothing$' },
      { label: 'd', text: '$[2\\,;6]$' },
    ],
    answer: 'a',
  },
  {
    n: 6,
    text: '$[-1\\,;4]\\cup[2\\,;6]$ est égal à…',
    options: [
      { label: 'a', text: '$[2\\,;4]$' },
      { label: 'b', text: '$[-1\\,;6]$' },
      { label: 'c', text: '$[-1\\,;2]$' },
      { label: 'd', text: '$\\varnothing$' },
    ],
    answer: 'b',
  },
  {
    n: 7,
    text: 'La valeur absolue $|-8|$ vaut…',
    options: [
      { label: 'a', text: '$-8$' },
      { label: 'b', text: '$0$' },
      { label: 'c', text: '$8$' },
      { label: 'd', text: '$16$' },
    ],
    answer: 'c',
  },
  {
    n: 8,
    text: '$|x-a|$ représente…',
    options: [
      { label: 'a', text: 'la distance entre $x$ et $a$' },
      { label: 'b', text: 'la somme de $x$ et $a$' },
      { label: 'c', text: 'le produit $xa$' },
      { label: 'd', text: 'toujours $x$' },
    ],
    answer: 'a',
  },
  {
    n: 9,
    text: 'L\'équation $|x|=-5$ a…',
    options: [
      { label: 'a', text: 'une solution' },
      { label: 'b', text: 'deux solutions' },
      { label: 'c', text: 'une infinité' },
      { label: 'd', text: 'aucune solution' },
    ],
    answer: 'd',
  },
  {
    n: 10,
    text: 'L\'arrondi de $7{,}368$ à $10^{-2}$ près est…',
    options: [
      { label: 'a', text: '$7{,}36$' },
      { label: 'b', text: '$7{,}4$' },
      { label: 'c', text: '$7{,}37$' },
      { label: 'd', text: '$7{,}3$' },
    ],
    answer: 'c',
  },
];

// ── Exercices ──────────────────────────────────────────────────────────────────
export const NOMBRES2NDE_EXERCISES: ExerciseContent[] = [
  // ── TIER 1 — application directe ★ ─────────────────────────────────────────
  {
    id: 'nombres2nde-1',
    context: 'Les ensembles sont emboîtés : $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Pour chacun des nombres $-5$, $0$, $12$, indiquer le **plus petit** ensemble ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{D}$, $\\mathbb{Q}$ ou $\\mathbb{R}$) auquel il appartient.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-2',
    context: 'Un décimal est un nombre à virgule finie.',
    parts: [{
      questions: [
        { n: 'a', text: 'Les nombres $2{,}5$ et $-1{,}2$ sont-ils décimaux ? Justifier en les écrivant sous forme de fraction.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-3',
    context: 'Crochet fermé = borne incluse ; vers $\\pm\\infty$, toujours ouvert.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire sous forme d\'intervalle : $x\\geqslant -3$, puis $x<2$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-4',
    context: 'Traduire un encadrement en intervalle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Écrire sous forme d\'intervalle : $-1\\leqslant x\\leqslant 4$, puis $0<x\\leqslant 5$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-5',
    context: 'Tester l\'appartenance : vérifier les bornes, puis regarder les crochets.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le nombre $3$ appartient-il à $]1\\,;3[$ ? à $[1\\,;3]$ ? Justifier par les crochets.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-6',
    context: 'Une borne ouverte n\'appartient pas à l\'intervalle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le nombre $5$ appartient-il à $[2\\,;5[$ ? Et $2$ appartient-il à $]2\\,;6]$ ?' },
      ],
    }],
  },
  {
    id: 'nombres2nde-7',
    context: 'L\'intersection est la partie commune.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $[-1\\,;4]\\cap[2\\,;6]$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-8',
    context: 'La réunion couvre tout ce qui est dans l\'un au moins.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $[-1\\,;4]\\cup[2\\,;6]$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-9',
    context: 'Encadrer un nombre par deux entiers consécutifs.',
    parts: [{
      questions: [
        { n: 'a', text: 'Encadrer $\\sqrt{10}$ par deux entiers consécutifs (indication : comparer avec $3^2$ et $4^2$).' },
      ],
    }],
  },
  {
    id: 'nombres2nde-10',
    context: 'Une valeur absolue est toujours positive ou nulle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Calculer $|-7|$, $|4-9|$ et la distance entre $-3$ et $5$.' },
      ],
    }],
  },
  // ── TIER 2 — à combiner ★★ ─────────────────────────────────────────────────
  {
    id: 'nombres2nde-11',
    context: 'Les ensembles sont emboîtés : un nombre appartient à plusieurs à la fois.',
    parts: [{
      questions: [
        { n: 'a', text: 'Le nombre $-3$ appartient-il à $\\mathbb{Z}$ ? à $\\mathbb{D}$ ? à $\\mathbb{Q}$ ? à $\\mathbb{R}$ ?' },
        { n: 'b', text: 'Expliquer pourquoi il appartient à plusieurs ensembles à la fois.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-12',
    context: 'Un irrationnel ne peut s\'écrire comme aucun quotient d\'entiers.',
    parts: [{
      questions: [
        { n: 'a', text: 'Parmi $\\dfrac{3}{4}$, $\\sqrt{5}$, $\\pi$ et $\\dfrac{22}{7}$, lesquels sont rationnels ? lesquels sont irrationnels ? (attention : $\\dfrac{22}{7}$ n\'est pas $\\pi$)' },
      ],
    }],
  },
  {
    id: 'nombres2nde-13',
    context: 'Traduire un intervalle par une inégalité.',
    parts: [{
      questions: [
        { n: 'a', text: 'Traduire par une inégalité les intervalles $[2\\,;7[$ et $]-\\infty\\,;-1]$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-14',
    context: 'Crochet fermé = point plein ; crochet ouvert = rond vide.',
    parts: [{
      questions: [
        { n: 'a', text: 'Représenter sur une droite graduée les intervalles $[-2\\,;3]$ et $]1\\,;+\\infty[$. Bien distinguer crochets ouverts et fermés.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-15',
    context: 'Tester l\'appartenance sur plusieurs nombres.',
    parts: [{
      questions: [
        { n: 'a', text: 'On considère $I=[-2\\,;4[$. Pour chacun des nombres $-2$, $0$, $4$ et $3{,}9$, dire s\'il appartient à $I$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-16',
    context: 'Deux conditions simultanées se traduisent par un seul intervalle.',
    parts: [{
      questions: [
        { n: 'a', text: 'Décrire par un intervalle l\'ensemble des nombres réels $x$ qui vérifient à la fois $x>-1$ et $x\\leqslant 6$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-17',
    context: 'Intersection et réunion faisant intervenir l\'infini.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $]-\\infty\\,;3]\\cap[0\\,;+\\infty[$, puis $]-\\infty\\,;3]\\cup[0\\,;+\\infty[$.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-18',
    context: 'Deux intervalles qui ne se touchent pas.',
    parts: [{
      questions: [
        { n: 'a', text: 'Déterminer $[-2\\,;1]\\cap[3\\,;5]$, puis $[-2\\,;1]\\cup[3\\,;5]$. Commenter le résultat de chaque opération.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-19',
    context: 'Valeur approchée par défaut, par excès, et arrondi.',
    parts: [{
      questions: [
        { n: 'a', text: 'On donne $\\sqrt{10}=3{,}16227\\ldots$ Donner la valeur approchée par défaut, par excès, puis l\'arrondi de $\\sqrt{10}$ à $10^{-2}$ près.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-20',
    context: 'Une valeur absolue s\'interprète comme une distance.',
    parts: [{
      questions: [
        { n: 'a', text: 'Résoudre $|x-4|=6$ de deux façons : par l\'interprétation « distance », puis par le calcul.' },
      ],
    }],
  },
  // ── TIER 3 — synthèse ★★★ ──────────────────────────────────────────────────
  {
    id: 'nombres2nde-21',
    context: 'Un rationnel est décimal si son dénominateur (fraction irréductible) ne contient que des $2$ et des $5$.',
    parts: [{
      questions: [
        { n: 'a', text: 'La fraction $\\dfrac{1}{7}$ est-elle un nombre décimal ? Et $\\dfrac{3}{8}$ ? Justifier à l\'aide du dénominateur.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-22',
    context: 'L\'infini n\'est pas un nombre.',
    parts: [{
      questions: [
        { n: 'a', text: 'Un élève écrit l\'ensemble des $x$ tels que $x\\leqslant 3$ sous la forme $[-\\infty\\,;3]$. Quelle est son erreur ? Écrire la forme correcte et expliquer.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-23',
    context: '« ET » restreint, « OU » élargit.',
    parts: [{
      questions: [
        { n: 'a', text: 'Expliquer pourquoi une intersection de deux intervalles est toujours **plus petite** (au sens de l\'inclusion) que chacun d\'eux, tandis qu\'une réunion est toujours plus grande. Illustrer sur un exemple.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-24',
    context: 'Une valeur absolue, étant une distance, ne peut pas être négative.',
    parts: [{
      questions: [
        { n: 'a', text: 'L\'équation $|x+1|=-3$ a-t-elle des solutions ? Justifier **sans calcul**.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-25',
    context: 'Un intervalle $[a-r\\,;a+r]$ se décrit par $|x-a|\\leqslant r$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Traduire l\'intervalle $[-1\\,;5]$ sous la forme $|x-a|\\leqslant r$, en précisant le centre $a$ et le rayon $r$.' },
      ],
    }],
  },
  // ── TIER 4 — problèmes de synthèse ◆ ───────────────────────────────────────
  {
    id: 'nombres2nde-26',
    context: 'On veut montrer que $\\sqrt{2}$ est irrationnel, par l\'absurde. **Supposons** au contraire que $\\sqrt{2}=\\dfrac{p}{q}$, fraction **irréductible** ($p$ et $q$ sans facteur commun).',
    parts: [{
      questions: [
        { n: 'a', text: 'Montrer qu\'alors $p^2=2q^2$.' },
        { n: 'b', text: 'En déduire que $p^2$ est pair, puis que $p$ est pair (le carré d\'un impair est impair).' },
        { n: 'c', text: 'On écrit $p=2k$. Montrer que $q^2=2k^2$, donc que $q$ est pair lui aussi.' },
        { n: 'd', text: 'Pourquoi est-ce contradictoire avec l\'hypothèse « fraction irréductible » ? Conclure.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-27',
    context: 'Le côté $c$ d\'un carré est mesuré avec incertitude : on sait seulement que $4\\leqslant c\\leqslant 5$ (en cm).',
    parts: [{
      questions: [
        { n: 'a', text: 'Encadrer le périmètre $P=4c$ du carré.' },
        { n: 'b', text: 'Encadrer l\'aire $A=c^2$ du carré.' },
        { n: 'c', text: 'Donner l\'amplitude de l\'encadrement de l\'aire. Est-elle plus grande ou plus petite que celle de l\'encadrement du côté ? Commenter.' },
      ],
    }],
  },
  {
    id: 'nombres2nde-28',
    context: 'Un thermostat doit maintenir une température $T$ (en °C) telle que l\'écart avec la consigne $20$ ne dépasse pas $2$.',
    parts: [{
      questions: [
        { n: 'a', text: 'Traduire cette condition par une inégalité avec une valeur absolue.' },
        { n: 'b', text: 'En déduire l\'intervalle des températures acceptables.' },
        { n: 'c', text: 'La température $21{,}5$ est-elle acceptable ? Et $23$ ? Justifier.' },
        { n: 'd', text: 'Interpréter la consigne $20$ et la tolérance $2$ en termes de centre et de rayon.' },
      ],
    }],
  },
];

// ── Corrections détaillées ─────────────────────────────────────────────────────
export const NOMBRES2NDE_CORRECTIONS: Record<string, Correction> = {
  'nombres2nde-1': {
    steps: [
      { n: '1', text: '$-5$ est un entier négatif : plus petit ensemble $\\mathbb{Z}$.' },
      { n: '2', text: '$0$ est un entier naturel : plus petit ensemble $\\mathbb{N}$.' },
      { n: '3', text: '$12$ est un entier naturel : plus petit ensemble $\\mathbb{N}$.' },
    ],
    result: '$-5\\in\\mathbb{Z}$ · $0\\in\\mathbb{N}$ · $12\\in\\mathbb{N}$.',
  },
  'nombres2nde-2': {
    steps: [
      { n: '1', text: '$2{,}5=\\dfrac{25}{10}=\\dfrac{5}{2}$ : virgule finie, c\'est un **décimal**.' },
      { n: '2', text: '$-1{,}2=-\\dfrac{12}{10}=-\\dfrac{6}{5}$ : virgule finie également, **décimal**.' },
      { n: '3', text: 'Tout nombre à virgule qui « s\'arrête » est décimal.' },
    ],
    result: 'Les deux sont décimaux.',
  },
  'nombres2nde-3': {
    steps: [
      { n: '1', text: '$x\\geqslant -3$ : borne $-3$ **incluse** ($\\geqslant$), pas de borne haute.' },
      { n: '2', text: '$x<2$ : borne $2$ **exclue** ($<$), pas de borne basse.' },
    ],
    result: '$[-3\\,;+\\infty[$ et $]-\\infty\\,;2[$.',
  },
  'nombres2nde-4': {
    steps: [
      { n: '1', text: '$-1\\leqslant x\\leqslant 4$ : deux bornes incluses.' },
      { n: '2', text: '$0<x\\leqslant 5$ : $0$ exclu, $5$ inclus.' },
    ],
    result: '$[-1\\,;4]$ et $]0\\,;5]$.',
  },
  'nombres2nde-5': {
    steps: [
      { n: '1', text: '$3\\in]1\\,;3[$ ? **Non** : la borne $3$ est exclue (crochet ouvert). L\'intervalle s\'arrête juste avant $3$.' },
      { n: '2', text: '$3\\in[1\\,;3]$ ? **Oui** : la borne $3$ est incluse (crochet fermé).' },
    ],
    result: 'Non pour $]1\\,;3[$, oui pour $[1\\,;3]$.',
  },
  'nombres2nde-6': {
    steps: [
      { n: '1', text: '$5\\in[2\\,;5[$ ? **Non** : $5$ est exclu (crochet ouvert à droite).' },
      { n: '2', text: '$2\\in]2\\,;6]$ ? **Non** : $2$ est exclu (crochet ouvert à gauche).' },
      { n: '3', text: 'Dans les deux cas, le nombre coïncide avec une borne **ouverte** : il n\'appartient pas à l\'intervalle.' },
    ],
    result: 'Non dans les deux cas.',
  },
  'nombres2nde-7': {
    steps: [
      { n: '1', text: 'L\'intersection est la partie **commune** : on prend la borne gauche la plus grande ($2$) et la borne droite la plus petite ($4$).' },
    ],
    result: '$[-1\\,;4]\\cap[2\\,;6]=[2\\,;4]$.',
  },
  'nombres2nde-8': {
    steps: [
      { n: '1', text: 'La réunion couvre **tout** : comme les deux intervalles se chevauchent (sur $[2\\,;4]$), leur réunion est un seul intervalle allant de la plus petite borne ($-1$) à la plus grande ($6$).' },
    ],
    result: '$[-1\\,;4]\\cup[2\\,;6]=[-1\\,;6]$.',
  },
  'nombres2nde-9': {
    steps: [
      { n: '1', text: 'On cherche deux entiers consécutifs encadrant $\\sqrt{10}$. Comme $3^2=9$ et $4^2=16$, on a $9<10<16$.' },
      { n: '2', text: 'Donc $3<\\sqrt{10}<4$.' },
    ],
    result: '$3<\\sqrt{10}<4$.',
  },
  'nombres2nde-10': {
    steps: [
      { n: '1', text: '$|-7|=7$.' },
      { n: '2', text: '$|4-9|=|-5|=5$.' },
      { n: '3', text: 'Distance entre $-3$ et $5$ : $|5-(-3)|=|8|=8$.' },
    ],
    result: '$7$ · $5$ · $8$.',
  },
  'nombres2nde-11': {
    steps: [
      { n: '1', text: '$-3$ appartient à **tous** ces ensembles : $\\mathbb{Z}$ (entier relatif), $\\mathbb{D}$ ($-3=-3{,}0$), $\\mathbb{Q}$ ($-3=\\tfrac{-3}{1}$) et $\\mathbb{R}$.' },
      { n: '2', text: '**Pourquoi plusieurs à la fois** : les ensembles sont **emboîtés**. Dès qu\'un nombre est dans $\\mathbb{Z}$, il est automatiquement dans tous les ensembles qui contiennent $\\mathbb{Z}$, c\'est-à-dire $\\mathbb{D}$, $\\mathbb{Q}$ et $\\mathbb{R}$. Le plus petit est $\\mathbb{Z}$, mais il n\'y est pas « enfermé ».' },
    ],
    result: '$-3\\in\\mathbb{Z}\\subset\\mathbb{D}\\subset\\mathbb{Q}\\subset\\mathbb{R}$ : il est dans les quatre.',
  },
  'nombres2nde-12': {
    steps: [
      { n: '1', text: '$\\dfrac{3}{4}$ : quotient de deux entiers, **rationnel**.' },
      { n: '2', text: '$\\sqrt{5}$ : racine non exacte, **irrationnel** (comme $\\sqrt{2}$).' },
      { n: '3', text: '$\\pi$ : **irrationnel** célèbre.' },
      { n: '4', text: '$\\dfrac{22}{7}$ : c\'est un quotient d\'entiers, donc **rationnel**. C\'est une valeur approchée courante de $\\pi$, mais $\\dfrac{22}{7}=3{,}142857\\ldots\\neq\\pi$. Ne pas confondre une approximation rationnelle avec le nombre irrationnel qu\'elle approche.' },
    ],
    result: 'Rationnels : $\\tfrac{3}{4}$, $\\tfrac{22}{7}$ · irrationnels : $\\sqrt{5}$, $\\pi$.',
  },
  'nombres2nde-13': {
    steps: [
      { n: '1', text: '$[2\\,;7[$ : $2$ inclus (crochet fermé), $7$ exclu (crochet ouvert), soit $2\\leqslant x<7$.' },
      { n: '2', text: '$]-\\infty\\,;-1]$ : pas de borne basse, $-1$ inclus, soit $x\\leqslant -1$.' },
    ],
    result: '$2\\leqslant x<7$ et $x\\leqslant -1$.',
  },
  'nombres2nde-14': {
    steps: [
      { n: '1', text: '$[-2\\,;3]$ : segment de $-2$ à $3$, avec crochets fermés (points pleins) aux deux bornes.' },
      { n: '2', text: '$]1\\,;+\\infty[$ : demi-droite partant de $1$ (exclu, rond vide) vers la droite, sans fin.' },
      { n: '3', text: 'Sur une droite graduée : une barre pleine $[-2\\,;3]$ avec bornes marquées ; une demi-droite ouverte en $1$.' },
    ],
    result: 'Segment fermé $[-2\\,;3]$ · demi-droite ouverte en $1$.',
  },
  'nombres2nde-15': {
    steps: [
      { n: '1', text: '$I=[-2\\,;4[$. $-2$ : borne gauche **incluse** (fermée) → appartient.' },
      { n: '2', text: '$0$ : entre $-2$ et $4$ → appartient.' },
      { n: '3', text: '$4$ : borne droite **exclue** (ouverte) → n\'appartient pas.' },
      { n: '4', text: '$3{,}9$ : entre $-2$ et $4$ → appartient.' },
    ],
    result: '$-2$, $0$, $3{,}9\\in I$ · $4\\notin I$.',
  },
  'nombres2nde-16': {
    steps: [
      { n: '1', text: '« $x>-1$ et $x\\leqslant 6$ » signifie $-1<x\\leqslant 6$.' },
      { n: '2', text: '$-1$ exclu ($>$), $6$ inclus ($\\leqslant$).' },
    ],
    result: '$]-1\\,;6]$.',
  },
  'nombres2nde-17': {
    steps: [
      { n: '1', text: '**Intersection** : les $x$ qui sont à la fois $\\leqslant 3$ et $\\geqslant 0$, soit $0\\leqslant x\\leqslant 3$. Donc $]-\\infty\\,;3]\\cap[0\\,;+\\infty[=[0\\,;3]$.' },
      { n: '2', text: '**Réunion** : tout $x$ qui est $\\leqslant 3$ **ou** $\\geqslant 0$. Comme ces deux conditions couvrent ensemble tous les réels (un nombre est toujours $\\leqslant 3$ ou $\\geqslant 0$, voire les deux), la réunion est $\\mathbb{R}$ tout entier.' },
    ],
    result: '$\\cap=[0\\,;3]$ · $\\cup=\\mathbb{R}$.',
  },
  'nombres2nde-18': {
    steps: [
      { n: '1', text: '$[-2\\,;1]$ et $[3\\,;5]$ ne se touchent pas (il y a un « trou » entre $1$ et $3$).' },
      { n: '2', text: '**Intersection** : aucun nombre n\'est dans les deux → $[-2\\,;1]\\cap[3\\,;5]=\\varnothing$ (ensemble **vide**).' },
      { n: '3', text: '**Réunion** : $[-2\\,;1]\\cup[3\\,;5]$, qui reste **en deux morceaux**. On **ne peut pas** l\'écrire comme un seul intervalle, car les nombres entre $1$ et $3$ n\'en font pas partie.' },
    ],
    result: '$\\cap=\\varnothing$ · $\\cup=[-2\\,;1]\\cup[3\\,;5]$ (deux morceaux).',
  },
  'nombres2nde-19': {
    steps: [
      { n: '1', text: '$\\sqrt{10}=3{,}16227\\ldots$' },
      { n: '2', text: '**Par défaut** à $10^{-2}$ : $3{,}16$ (on tronque).' },
      { n: '3', text: '**Par excès** à $10^{-2}$ : $3{,}17$.' },
      { n: '4', text: '**Arrondi** à $10^{-2}$ : la 3ᵉ décimale est $2<5$, on garde : $3{,}16$.' },
    ],
    result: 'Défaut $3{,}16$ · excès $3{,}17$ · arrondi $3{,}16$.',
  },
  'nombres2nde-20': {
    steps: [
      { n: '1', text: '**Par la distance** : $|x-4|=6$ signifie « $x$ est à distance $6$ de $4$ ». Deux points conviennent : $4+6=10$ et $4-6=-2$.' },
      { n: '2', text: '**Par le calcul** : $|x-4|=6$ équivaut à $x-4=6$ ou $x-4=-6$, soit $x=10$ ou $x=-2$.' },
      { n: '3', text: 'Les deux méthodes donnent les mêmes solutions.' },
    ],
    result: '$x=-2$ et $x=10$.',
  },
  'nombres2nde-21': {
    steps: [
      { n: '1', text: 'Un rationnel est décimal si et seulement si son dénominateur (fraction irréductible) ne contient que des facteurs $2$ et $5$.' },
      { n: '2', text: '$\\dfrac{1}{7}$ : dénominateur $7$, qui n\'est ni $2$ ni $5$. **Pas décimal** : $\\tfrac{1}{7}=0{,}142857142857\\ldots$ (illimité périodique, mais rationnel).' },
      { n: '3', text: '$\\dfrac{3}{8}$ : dénominateur $8=2^3$, uniquement des $2$. **Décimal** : $\\tfrac{3}{8}=0{,}375$.' },
    ],
    result: '$\\tfrac{1}{7}$ non décimal · $\\tfrac{3}{8}=0{,}375$ décimal.',
  },
  'nombres2nde-22': {
    steps: [
      { n: '1', text: '**L\'erreur** : l\'élève a mis un crochet **fermé** sur $-\\infty$.' },
      { n: '2', text: 'Or $-\\infty$ n\'est **pas un nombre** : c\'est un symbole qui indique « sans borne à gauche ». On ne peut donc jamais l\'« inclure », et le crochet côté infini est **toujours ouvert**.' },
      { n: '3', text: '**Forme correcte** : $]-\\infty\\,;3]$. Le $3$, lui, est bien inclus ($x\\leqslant 3$), d\'où le crochet fermé de ce côté.' },
    ],
    result: 'Correct : $]-\\infty\\,;3]$ — l\'infini est toujours ouvert.',
  },
  'nombres2nde-23': {
    steps: [
      { n: '1', text: '**Intersection plus petite** : y appartenir exige **deux** conditions à la fois (être dans $A$ ET dans $B$). Ajouter une exigence ne peut que **restreindre** : tout élément de $A\\cap B$ est en particulier dans $A$, donc $A\\cap B\\subset A$, de même $A\\cap B\\subset B$.' },
      { n: '2', text: '**Réunion plus grande** : y appartenir demande **une seule** condition (être dans $A$ OU dans $B$). C\'est plus facile, donc l\'ensemble **grossit** : $A\\subset A\\cup B$ et $B\\subset A\\cup B$.' },
      { n: '3', text: '**Exemple** : avec $A=[-1\\,;4]$, $B=[2\\,;6]$, on a $A\\cap B=[2\\,;4]$ (plus court que chacun) et $A\\cup B=[-1\\,;6]$ (plus long que chacun).' },
    ],
    result: '« ET » restreint ($\\cap\\subset$ chacun) · « OU » élargit (chacun $\\subset\\cup$).',
  },
  'nombres2nde-24': {
    steps: [
      { n: '1', text: '**Aucune solution.** Une valeur absolue est une **distance** : elle est toujours positive ou nulle. Elle ne peut donc jamais être égale à $-3$, qui est négatif.' },
      { n: '2', text: 'Le raisonnement se fait **sans calcul** : un simple regard au signe du second membre suffit.' },
    ],
    result: 'Aucune solution : $|x+1|\\geqslant 0$ toujours.',
  },
  'nombres2nde-25': {
    steps: [
      { n: '1', text: 'Le **centre** d\'un intervalle $[a-r\\,;a+r]$ est le milieu de ses bornes, le **rayon** la demi-longueur.' },
      { n: '2', text: 'Pour $[-1\\,;5]$ : centre $a=\\dfrac{-1+5}{2}=2$, rayon $r=\\dfrac{5-(-1)}{2}=3$.' },
      { n: '3', text: 'L\'intervalle se décrit donc par $|x-2|\\leqslant 3$ : les $x$ dont la distance à $2$ ne dépasse pas $3$.' },
    ],
    result: '$|x-2|\\leqslant 3$ · centre $2$, rayon $3$.',
  },
  'nombres2nde-26': {
    steps: [
      { n: 'a', text: 'Si $\\sqrt{2}=\\dfrac{p}{q}$, en élevant au carré : $2=\\dfrac{p^2}{q^2}$, donc $p^2=2q^2$.' },
      { n: 'b', text: '$p^2=2q^2$ est un multiple de $2$ : $p^2$ est **pair**. Or si $p$ était impair, $p^2$ serait impair (le carré d\'un impair est impair). Donc $p$ est **pair**.' },
      { n: 'c', text: 'On écrit $p=2k$. Alors $p^2=4k^2$, et l\'égalité $p^2=2q^2$ devient $4k^2=2q^2$, soit $q^2=2k^2$. Donc $q^2$ est pair, et $q$ est **pair** lui aussi.' },
      { n: 'd', text: 'On a montré que $p$ et $q$ sont **tous deux pairs** : ils ont $2$ comme facteur commun. Cela **contredit** l\'hypothèse « fraction irréductible » ($p$ et $q$ sans facteur commun). L\'hypothèse de départ est donc **impossible** : $\\sqrt{2}$ ne peut pas s\'écrire comme une fraction. $\\sqrt{2}$ **est irrationnel**. C\'est *un raisonnement par l\'absurde* : on suppose le contraire de ce qu\'on veut montrer, et on aboutit à une contradiction.' },
    ],
    result: '$p$ et $q$ tous deux pairs contredit l\'irréductibilité : $\\sqrt{2}$ est irrationnel.',
  },
  'nombres2nde-27': {
    steps: [
      { n: 'a', text: 'Le périmètre est $P=4c$. De $4\\leqslant c\\leqslant 5$, en multipliant par $4$ (positif, le sens est conservé) : $16\\leqslant P\\leqslant 20$.' },
      { n: 'b', text: 'L\'aire est $A=c^2$. La fonction carré est croissante sur les positifs, donc de $4\\leqslant c\\leqslant 5$ on tire $4^2\\leqslant c^2\\leqslant 5^2$, soit $16\\leqslant A\\leqslant 25$.' },
      { n: 'c', text: 'Amplitude de l\'encadrement de l\'aire : $25-16=9$. Amplitude de l\'encadrement du côté : $5-4=1$. L\'amplitude est **bien plus grande** pour l\'aire ($9$) que pour le côté ($1$). **Interprétation** : une petite incertitude sur une longueur se trouve **amplifiée** quand on l\'élève au carré. Les incertitudes « grandissent » avec les puissances — c\'est important en physique et en mesure.' },
    ],
    result: '$16\\leqslant P\\leqslant 20$ · $16\\leqslant A\\leqslant 25$ · amplitude aire $=9$ (amplifiée).',
  },
  'nombres2nde-28': {
    steps: [
      { n: 'a', text: '« L\'écart avec $20$ ne dépasse pas $2$ » se traduit par $|T-20|\\leqslant 2$ : la distance entre $T$ et $20$ est au plus $2$.' },
      { n: 'b', text: '$|T-20|\\leqslant 2$ signifie $-2\\leqslant T-20\\leqslant 2$, soit, en ajoutant $20$ partout, $18\\leqslant T\\leqslant 22$. Les températures acceptables forment l\'intervalle $[18\\,;22]$.' },
      { n: 'c', text: '$21{,}5\\in[18\\,;22]$ → **acceptable** (écart $|21{,}5-20|=1{,}5\\leqslant 2$). $23\\notin[18\\,;22]$ → **non acceptable** (écart $|23-20|=3>2$).' },
      { n: 'd', text: 'La consigne $20$ est le **centre** de l\'intervalle, et la tolérance $2$ en est le **rayon**. On accepte tout ce qui est « à distance au plus $2$ du centre $20$ ».' },
    ],
    result: '$|T-20|\\leqslant 2\\iff[18\\,;22]$ · centre $20$, rayon $2$.',
  },
};
