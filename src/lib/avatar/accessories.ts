import type { Accessory } from './types';

// ─────────────────────────────────────────────────────────────
// Accessory catalog — DiceBear avataaars edition
//
// Each dicebearParam is appended as-is to the avataaars URL.
// DiceBear v9 avataaars options used:
//   top[]          = hat/hair style
//   accessories[]  = eyewear
//   accessoriesProbability = 0–100
//   clothes[]      = outfit style
//   clothesColor   = outfit hex color (no #)
//   backgroundColor = bg hex color (no #)
//   backgroundType[]= solid | gradientLinear
// ─────────────────────────────────────────────────────────────

export const ACCESSORIES: Accessory[] = [

  // ── HATS (top[]) ──────────────────────────────────────────
  {
    id: 'hat_beanie',
    slot: 'hat',
    label: 'Bonnet de révision',
    description: 'Le classique bonnet des nuits de révision.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    dicebearParam: 'top[]=winterHat1',
  },
  {
    id: 'hat_graduation',
    slot: 'hat',
    label: 'Chapeau académique',
    description: 'Le couvre-chef des esprits d\'élite.',
    condition: { type: 'level', value: 5, label: 'Niveau 5' },
    rarity: 'rare',
    dicebearParam: 'top[]=hat',
  },
  {
    id: 'hat_beret',
    slot: 'hat',
    label: 'Bonnet intellectuel',
    description: 'Style feutré pour les esprits affûtés.',
    condition: { type: 'streak', value: 7, label: 'Streak 7 jours' },
    rarity: 'rare',
    dicebearParam: 'top[]=winterHat02',
  },
  {
    id: 'hat_wizard',
    slot: 'hat',
    label: 'Turban du sage',
    description: 'Le deepwork t\'a accordé la sagesse.',
    condition: { type: 'deepwork_sessions', value: 50, label: '50 sessions deepwork' },
    rarity: 'epic',
    dicebearParam: 'top[]=turban',
  },
  {
    id: 'hat_crown',
    slot: 'hat',
    label: 'Bonnet légendaire',
    description: 'Réservé aux légendes du tableau de bord.',
    condition: { type: 'level', value: 50, label: 'Niveau 50' },
    rarity: 'legendary',
    dicebearParam: 'top[]=winterHat04',
  },

  // ── GLASSES (accessories[]) ────────────────────────────────
  {
    id: 'glasses_round',
    slot: 'glasses',
    label: 'Lunettes rondes',
    description: 'Le style bibliothèque intemporel.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    dicebearParam: 'accessories[]=round&accessoriesProbability=100',
  },
  {
    id: 'glasses_prescription',
    slot: 'glasses',
    label: 'Lunettes d\'intello',
    description: 'Pour ceux qui voient plus loin que les autres.',
    condition: { type: 'level', value: 10, label: 'Niveau 10' },
    rarity: 'rare',
    dicebearParam: 'accessories[]=prescription01&accessoriesProbability=100',
  },
  {
    id: 'glasses_sunglasses',
    slot: 'glasses',
    label: 'Lunettes de soleil',
    description: 'Pour ceux qui voient le travail comme un jeu.',
    condition: { type: 'deepwork_sessions', value: 10, label: '10 sessions deepwork' },
    rarity: 'rare',
    dicebearParam: 'accessories[]=sunglasses&accessoriesProbability=100',
  },
  {
    id: 'glasses_kurt',
    slot: 'glasses',
    label: 'Montures Kurt',
    description: 'Pour les explorateurs d\'idées.',
    condition: { type: 'xp', value: 5000, label: '5 000 XP' },
    rarity: 'epic',
    dicebearParam: 'accessories[]=kurt&accessoriesProbability=100',
  },
  {
    id: 'glasses_wayfarers',
    slot: 'glasses',
    label: 'Wayfarers',
    description: 'Style iconique pour les grands esprits.',
    condition: { type: 'level', value: 25, label: 'Niveau 25' },
    rarity: 'epic',
    dicebearParam: 'accessories[]=wayfarers&accessoriesProbability=100',
  },

  // ── OUTFITS (clothes[]) ────────────────────────────────────
  {
    id: 'outfit_hoodie',
    slot: 'outfit',
    label: 'Hoodie étudiant',
    description: 'Confort total pour les longues sessions.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    dicebearParam: 'clothing[]=hoodie&clothesColor[]=262E33',
  },
  {
    id: 'outfit_sweater',
    slot: 'outfit',
    label: 'Col roulé élite',
    description: 'Rigueur et discipline. Chaque jour.',
    condition: { type: 'streak', value: 30, label: 'Streak 30 jours' },
    rarity: 'rare',
    dicebearParam: 'clothing[]=collarAndSweater&clothesColor[]=3C4F5C',
  },
  {
    id: 'outfit_blazer',
    slot: 'outfit',
    label: 'Blazer & chemise',
    description: 'Pour les grandes occasions et les grandes ambitions.',
    condition: { type: 'xp', value: 10000, label: '10 000 XP' },
    rarity: 'epic',
    dicebearParam: 'clothing[]=blazerAndShirt&clothesColor[]=1F2D3D',
  },
  {
    id: 'outfit_toga',
    slot: 'outfit',
    label: 'Blazer doré',
    description: 'La tenue des diplômés des grandes écoles.',
    condition: { type: 'level', value: 25, label: 'Niveau 25' },
    rarity: 'epic',
    dicebearParam: 'clothing[]=blazerAndSweater&clothesColor[]=7B6000',
  },
  {
    id: 'outfit_graphicshirt',
    slot: 'outfit',
    label: 'T-shirt du guerrier',
    description: 'Pour ceux qui ont bravé 100 sessions de deepwork.',
    condition: { type: 'deepwork_sessions', value: 100, label: '100 sessions deepwork' },
    rarity: 'legendary',
    dicebearParam: 'clothing[]=graphicShirt&clothesColor[]=3C0000',
  },

  // ── BACKGROUNDS (backgroundColor) ─────────────────────────
  {
    id: 'bg_dark',
    slot: 'background',
    label: 'Nuit de révision',
    description: 'Le cadre sombre du guerrier de l\'étude.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    dicebearParam: 'backgroundColor=0d1117&backgroundType[]=solid',
  },
  {
    id: 'bg_classroom',
    slot: 'background',
    label: 'Salle de cours',
    description: 'Le cadre familier du quotidien étudiant.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    dicebearParam: 'backgroundColor=1a2332&backgroundType[]=solid',
  },
  {
    id: 'bg_library',
    slot: 'background',
    label: 'Bibliothèque royale',
    description: 'Des milliers de livres pour t\'inspirer.',
    condition: { type: 'level', value: 10, label: 'Niveau 10' },
    rarity: 'rare',
    dicebearParam: 'backgroundColor=2d1500&backgroundType[]=solid',
  },
  {
    id: 'bg_dungeon',
    slot: 'background',
    label: 'Donjon mystique',
    description: 'Un cadre obscur pour des sessions profondes.',
    condition: { type: 'deepwork_sessions', value: 50, label: '50 sessions deepwork' },
    rarity: 'epic',
    dicebearParam: 'backgroundColor=1a0a2e&backgroundType[]=solid',
  },
  {
    id: 'bg_sorbonne',
    slot: 'background',
    label: 'Sorbonne dorée',
    description: 'La cour de la Sorbonne au coucher du soleil.',
    condition: { type: 'level', value: 25, label: 'Niveau 25' },
    rarity: 'epic',
    dicebearParam: 'backgroundColor=3d2000&backgroundType[]=solid',
  },
  {
    id: 'bg_paris',
    slot: 'background',
    label: 'Paris la nuit',
    description: 'La Tour Eiffel illuminée pour les grands esprits.',
    condition: { type: 'xp', value: 15000, label: '15 000 XP' },
    rarity: 'legendary',
    dicebearParam: 'backgroundColor=0a1628&backgroundType[]=solid',
  },
  {
    id: 'bg_space',
    slot: 'background',
    label: 'Espace infini',
    description: 'Pour ceux dont les ambitions n\'ont pas de limites.',
    condition: { type: 'level', value: 50, label: 'Niveau 50' },
    rarity: 'legendary',
    dicebearParam: 'backgroundColor=030011&backgroundType[]=solid',
  },

  // ── BADGES (emoji overlay — avataaars has no badge concept) ─
  {
    id: 'badge_scholar',
    slot: 'badge',
    label: 'Érudit',
    description: 'La connaissance avant tout.',
    condition: { type: 'free', label: 'Disponible dès le début' },
    rarity: 'common',
    badgeSymbol: '📖',
  },
  {
    id: 'badge_flame',
    slot: 'badge',
    label: 'Flamme éternelle',
    description: 'Pour ceux qui ne s\'arrêtent jamais.',
    condition: { type: 'streak', value: 7, label: 'Streak 7 jours' },
    rarity: 'rare',
    badgeSymbol: '🔥',
  },
  {
    id: 'badge_brain',
    slot: 'badge',
    label: 'Cerveau d\'or',
    description: 'La maîtrise intellectuelle totale.',
    condition: { type: 'xp', value: 10000, label: '10 000 XP' },
    rarity: 'epic',
    badgeSymbol: '🧠',
  },
  {
    id: 'badge_champion',
    slot: 'badge',
    label: 'Champion',
    description: 'Cent jours de discipline. Indestructible.',
    condition: { type: 'streak', value: 100, label: 'Streak 100 jours' },
    rarity: 'legendary',
    badgeSymbol: '🏆',
  },
  {
    id: 'badge_elite',
    slot: 'badge',
    label: 'Élite',
    description: 'Le sommet de l\'ascension.',
    condition: { type: 'level', value: 50, label: 'Niveau 50' },
    rarity: 'legendary',
    badgeSymbol: '⚡',
  },
];

export function getAccessory(id: string): Accessory | undefined {
  return ACCESSORIES.find(a => a.id === id);
}

export function getAccessoriesBySlot(slot: Accessory['slot']): Accessory[] {
  return ACCESSORIES.filter(a => a.slot === slot);
}
