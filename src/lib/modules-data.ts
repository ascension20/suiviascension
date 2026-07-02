export interface ModuleLevel {
  id: string;
  number: number;
  tier: 0 | 1 | 2 | 3 | 4;
  title: string;
  notion: string;
  difficulty: 0 | 1 | 2 | 3 | 4;   // 0=QCM · 1=★ · 2=★★ · 3=★★★ · 4=◆
  timeMin: number;
  description: string;
  xpReward: number;
}

export interface PhysicsModule {
  id: string;
  subject: 'Physique' | 'Maths';
  level: string;            // e.g. "Terminale"
  title: string;
  subtitle: string;
  accentHsl: string;
  pdfCours: string | null;
  pdfFiche: string | null;
  pdfExercices: string | null;
  levels: ModuleLevel[];
}

// ─── Module 1 : Newton & champ uniforme ────────────────────────────────────
const NEWTON_LEVELS: ModuleLevel[] = [
  // ── TIER 0 — QCM ─────────────────────────────────────────────────────────
  {
    id: 'newton-qcm',
    number: 0,
    tier: 0,
    title: 'QCM Flash',
    notion: 'Tout le cours',
    difficulty: 0,
    timeMin: 15,
    description: '12 questions pour vérifier que le cours est en place avant de passer aux exercices.',
    xpReward: 30,
  },
  // ── TIER 1 — Automatismes ★ ───────────────────────────────────────────────
  {
    id: 'newton-1',
    number: 1,
    tier: 1,
    title: 'Dériver un vecteur position',
    notion: 'Cinématique',
    difficulty: 1,
    timeMin: 8,
    description: 'Calculer vitesse et accélération à partir de OM(t) = 2t·i + (3t²−t)·j.',
    xpReward: 40,
  },
  {
    id: 'newton-2',
    number: 2,
    tier: 1,
    title: 'Du vecteur vitesse à la position',
    notion: 'Intégration',
    difficulty: 1,
    timeMin: 8,
    description: 'Intégrer v(t) pour retrouver les équations horaires x(t) et y(t).',
    xpReward: 40,
  },
  {
    id: 'newton-3',
    number: 3,
    tier: 1,
    title: 'Faire le bilan des forces',
    notion: 'Forces',
    difficulty: 1,
    timeMin: 7,
    description: 'Inventaire et schéma des forces sur un solide posé sur un plan incliné sans frottement.',
    xpReward: 40,
  },
  {
    id: 'newton-4',
    number: 4,
    tier: 1,
    title: 'Écrire et projeter la 2e loi',
    notion: 'Méthode',
    difficulty: 1,
    timeMin: 9,
    description: "Bilan des forces sur une bille avec frottement, puis projection pour calculer l'accélération.",
    xpReward: 40,
  },
  {
    id: 'newton-5',
    number: 5,
    tier: 1,
    title: 'Intégrer pour obtenir les équations horaires',
    notion: 'Intégration',
    difficulty: 1,
    timeMin: 8,
    description: "À partir d'une accélération constante et des conditions initiales, remonter à v(t) puis OM(t).",
    xpReward: 40,
  },
  {
    id: 'newton-6',
    number: 6,
    tier: 1,
    title: "Le principe d'inertie",
    notion: '1re loi',
    difficulty: 1,
    timeMin: 6,
    description: 'Palet sur la glace et livre sur une table : énoncer et appliquer la 1re loi de Newton.',
    xpReward: 40,
  },
  {
    id: 'newton-7',
    number: 7,
    tier: 1,
    title: 'Action et réaction',
    notion: '3e loi',
    difficulty: 1,
    timeMin: 7,
    description: 'Identifier les paires action–réaction et distinguer forces sur le même corps / corps différents.',
    xpReward: 40,
  },
  {
    id: 'newton-8',
    number: 8,
    tier: 1,
    title: 'Champ, tension et force',
    notion: 'Champ E',
    difficulty: 1,
    timeMin: 6,
    description: 'Calculer E = U/d puis la force sur un électron dans un condensateur (d=2 cm, U=1 kV).',
    xpReward: 40,
  },
  {
    id: 'newton-9',
    number: 9,
    tier: 1,
    title: "Accélération d'une particule chargée",
    notion: 'Champ E',
    difficulty: 1,
    timeMin: 7,
    description: "Calculer l'accélération d'un électron dans un champ E = 1 000 V·m⁻¹ et déterminer son sens.",
    xpReward: 40,
  },
  // ── TIER 2 — Méthodes ★★ ─────────────────────────────────────────────────
  {
    id: 'newton-10',
    number: 10,
    tier: 2,
    title: 'Chute libre verticale',
    notion: 'Méthode',
    difficulty: 2,
    timeMin: 12,
    description: "Méthode 5 étapes sur une chute depuis h=20 m : durée, vitesse à l'impact.",
    xpReward: 70,
  },
  {
    id: 'newton-11',
    number: 11,
    tier: 2,
    title: 'Plan incliné sans frottement',
    notion: 'Méthode',
    difficulty: 2,
    timeMin: 14,
    description: 'Solide sur plan incliné (β=20°) : bilan des forces, projection, a = g sin β, équations horaires.',
    xpReward: 70,
  },
  {
    id: 'newton-12',
    number: 12,
    tier: 2,
    title: 'Le projectile complet',
    notion: 'Projectile',
    difficulty: 2,
    timeMin: 18,
    description: "Footballeur (v₀=15 m/s, α=40°) : équations horaires, trajectoire, flèche, portée, franchissement d'un mur.",
    xpReward: 70,
  },
  {
    id: 'newton-13',
    number: 13,
    tier: 2,
    title: 'Tir horizontal depuis une hauteur',
    notion: 'Projectile',
    difficulty: 2,
    timeMin: 14,
    description: "Balle lancée horizontalement (v₀=8 m/s) du haut d'une falaise (h=20 m) : durée, distance, vitesse à l'impact.",
    xpReward: 70,
  },
  {
    id: 'newton-14',
    number: 14,
    tier: 2,
    title: "Vitesse d'un électron dévié",
    notion: 'Champ E',
    difficulty: 2,
    timeMin: 16,
    description: 'Électron dans un condensateur (L=4 cm, E=10⁴ V/m) : accélération, composante vy et norme de v à la sortie.',
    xpReward: 70,
  },
  {
    id: 'newton-15',
    number: 15,
    tier: 2,
    title: 'Déflexion dans un condensateur',
    notion: 'Champ E',
    difficulty: 2,
    timeMin: 16,
    description: "Trajectoire d'un électron entre deux plaques (U=200 V, d=2 cm, L=5 cm) : déviation et vérification qu'il ne touche pas les plaques.",
    xpReward: 70,
  },
  // ── TIER 3 — Type Bac ★★★ ────────────────────────────────────────────────
  {
    id: 'newton-16',
    number: 16,
    tier: 3,
    title: 'Le lancer franc',
    notion: 'Type Bac',
    difficulty: 3,
    timeMin: 22,
    description: 'Lancer franc de basket (v₀=7,3 m/s, α=52°, D=4,20 m, h_panier=3,05 m) : trajectoire, hauteur au panier, sens du mouvement.',
    xpReward: 100,
  },
  {
    id: 'newton-17',
    number: 17,
    tier: 3,
    title: 'Le saut en longueur',
    notion: 'Type Bac',
    difficulty: 3,
    timeMin: 20,
    description: "Saut en longueur (v₀=9,5 m/s, α=22°) : flèche, portée, optimisation de l'angle pour 7 m.",
    xpReward: 100,
  },
  {
    id: 'newton-18',
    number: 18,
    tier: 3,
    title: "L'oscilloscope cathodique",
    notion: 'Type Bac',
    difficulty: 3,
    timeMin: 24,
    description: "Tube cathodique : déviation entre les plaques puis jusqu'à l'écran — retrouver la formule générale Y = eEL(D+L/2)/mv₀².",
    xpReward: 100,
  },
  {
    id: 'newton-19',
    number: 19,
    tier: 3,
    title: 'Le canon à électrons',
    notion: 'Type Bac',
    difficulty: 3,
    timeMin: 20,
    description: "Accélération d'un électron depuis le repos (U=250 V) : vitesse de sortie par la cinématique ET par bilan d'énergie.",
    xpReward: 100,
  },
  // ── TIER 4 — Défis ◆ ─────────────────────────────────────────────────────
  {
    id: 'newton-20',
    number: 20,
    tier: 4,
    title: "Deux façons d'atteindre la cible",
    notion: 'Défi',
    difficulty: 4,
    timeMin: 25,
    description: 'v₀=20 m/s, cible à 30 m : deux angles de tir possibles (tir tendu / tir en cloche) — cas limite à 45 m.',
    xpReward: 150,
  },
  {
    id: 'newton-21',
    number: 21,
    tier: 4,
    title: "L'influence de la hauteur de lancement",
    notion: 'Défi',
    difficulty: 4,
    timeMin: 30,
    description: "Lanceur de poids (h=2 m, v₀=13 m/s) : portée à α=45° vs α=42° — l'angle optimal n'est plus 45° quand h>0.",
    xpReward: 150,
  },
];

export const PHYSICS_MODULES: PhysicsModule[] = [
  {
    id: 'phys-newton',
    subject: 'Physique',
    level: 'Terminale',
    title: 'Newton & champ uniforme',
    subtitle: 'Lois de Newton · Projectile · Champ électrique',
    accentHsl: '205 85% 60%',
    pdfCours:      '/modules/phys-newton/cours.pdf',
    pdfFiche:      '/modules/phys-newton/fiche.pdf',
    pdfExercices:  '/modules/phys-newton/exercices.pdf',
    levels: NEWTON_LEVELS,
  },
];

export const MATHS_MODULES: PhysicsModule[] = [
  // À venir
];

export const ALL_MODULES = [...PHYSICS_MODULES, ...MATHS_MODULES];

export const TIER_META = [
  { tier: 0 as const, label: 'VÉRIF COURS',       sub: 'QCM Flash',              hsl: '205 85% 60%' },
  { tier: 1 as const, label: 'AUTOMATISMES ★',    sub: 'Une notion = un exercice', hsl: '142 65% 48%' },
  { tier: 2 as const, label: 'MÉTHODES ★★',       sub: 'Les méthodes types',       hsl: '43 90% 52%'  },
  { tier: 3 as const, label: 'TYPE BAC ★★★',      sub: 'Les problèmes complets',   hsl: '270 60% 62%' },
  { tier: 4 as const, label: 'DÉFIS ◆',           sub: 'Pour aller plus loin',     hsl: '0 70% 60%'   },
];

export const DIFF_LABEL = ['QCM', '★', '★★', '★★★', '◆'];
