// ─────────────────────────────────────────────────────────────
// Avatar System — Core Types (avataaars edition)
// ─────────────────────────────────────────────────────────────

export type AccessorySlot = 'hat' | 'glasses' | 'outfit' | 'background' | 'badge';

export type UnlockConditionType =
  | 'xp'
  | 'level'
  | 'streak'
  | 'deepwork_sessions'
  | 'achievement'
  | 'free';

export interface UnlockCondition {
  type: UnlockConditionType;
  value?: number | string;
  label: string;
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Accessory {
  id: string;
  slot: AccessorySlot;
  label: string;
  description: string;
  condition: UnlockCondition;
  rarity: Rarity;
  /**
   * DiceBear avataaars URL params appended to the avatar URL.
   * Hat/glasses/outfit/background slots only.
   * Example: "top[]=winterHat1" or "accessories[]=round&accessoriesProbability=100"
   */
  dicebearParam?: string;
  /**
   * Badge slot only — emoji shown as an overlay on the avatar frame.
   */
  badgeSymbol?: string;
}

export interface AvatarConfig {
  hat: string | null;
  glasses: string | null;
  outfit: string | null;
  background: string | null;
  badge: string | null;
  // Base appearance (optional)
  skinColor?: string;
  hairStyle?: string;
  hairColor?: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  hat: null,
  glasses: null,
  outfit: 'outfit_hoodie',
  background: 'bg_dark',
  badge: null,
  skinColor: 'light',
  hairStyle: 'shortFlat',
  hairColor: 'brown',
};

export interface PlayerStats {
  totalXp: number;
  level: number;
  streak: number;
  deepworkSessions: number;
  achievements: string[];
}

export const RARITY_COLORS: Record<Rarity, { border: string; bg: string; text: string; glow: string }> = {
  common: {
    border: 'hsl(220 10% 50%)',
    bg: 'hsl(220 10% 50% / 0.08)',
    text: 'hsl(220 10% 75%)',
    glow: 'none',
  },
  rare: {
    border: 'hsl(213 90% 62%)',
    bg: 'hsl(213 90% 62% / 0.1)',
    text: 'hsl(213 90% 72%)',
    glow: '0 0 12px hsl(213 90% 62% / 0.35)',
  },
  epic: {
    border: 'hsl(270 70% 65%)',
    bg: 'hsl(270 70% 65% / 0.1)',
    text: 'hsl(270 70% 78%)',
    glow: '0 0 14px hsl(270 70% 65% / 0.4)',
  },
  legendary: {
    border: 'hsl(43 90% 52%)',
    bg: 'hsl(43 90% 52% / 0.12)',
    text: 'hsl(43 90% 65%)',
    glow: '0 0 18px hsl(43 90% 52% / 0.5)',
  },
};

export const SLOT_LABELS: Record<AccessorySlot, string> = {
  hat: 'Couvre-chef',
  glasses: 'Lunettes',
  outfit: 'Tenue',
  background: 'Décor',
  badge: 'Badge',
};

export const SLOT_EMOJIS: Record<AccessorySlot, string> = {
  hat: '🎩',
  glasses: '👓',
  outfit: '👕',
  background: '🌆',
  badge: '🏅',
};
