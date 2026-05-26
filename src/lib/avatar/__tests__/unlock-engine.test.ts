import { describe, it, expect } from 'vitest';
import {
  isAccessoryUnlocked,
  computeUnlocked,
  detectNewUnlocks,
  sanitiseConfig,
  unlockProgress,
} from '../unlock-engine';
import type { Accessory, PlayerStats, AvatarConfig } from '../types';

// ─────────────────────────────────────────────────────────────
// Mock accessories (no emoji field — avataaars edition)
// ─────────────────────────────────────────────────────────────

const baseStats: PlayerStats = {
  totalXp: 0,
  level: 1,
  streak: 0,
  deepworkSessions: 0,
  achievements: [],
};

const freeAcc: Accessory = {
  id: 'free_item',
  slot: 'hat',
  label: 'Free item',
  description: '',
  condition: { type: 'free', label: 'Disponible dès le début' },
  rarity: 'common',
  dicebearParam: 'top[]=winterHat1',
};

const xpAcc: Accessory = {
  id: 'xp_item',
  slot: 'glasses',
  label: 'XP item',
  description: '',
  condition: { type: 'xp', value: 1000, label: '1 000 XP' },
  rarity: 'rare',
  dicebearParam: 'accessories[]=round&accessoriesProbability=100',
};

const levelAcc: Accessory = {
  id: 'level_item',
  slot: 'outfit',
  label: 'Level item',
  description: '',
  condition: { type: 'level', value: 10, label: 'Niveau 10' },
  rarity: 'rare',
  dicebearParam: 'clothes[]=hoodie&clothesColor=262E33',
};

const streakAcc: Accessory = {
  id: 'streak_item',
  slot: 'badge',
  label: 'Streak item',
  description: '',
  condition: { type: 'streak', value: 7, label: 'Streak 7 jours' },
  rarity: 'rare',
  badgeSymbol: '🔥',
};

const deepworkAcc: Accessory = {
  id: 'deepwork_item',
  slot: 'background',
  label: 'Deepwork item',
  description: '',
  condition: { type: 'deepwork_sessions', value: 50, label: '50 sessions' },
  rarity: 'epic',
  dicebearParam: 'backgroundColor=1a0a2e&backgroundType[]=solid',
};

const achievementAcc: Accessory = {
  id: 'achievement_item',
  slot: 'hat',
  label: 'Achievement item',
  description: '',
  condition: { type: 'achievement', value: 'first_deepwork', label: 'Première session' },
  rarity: 'epic',
  dicebearParam: 'top[]=hat',
};

const catalog = [freeAcc, xpAcc, levelAcc, streakAcc, deepworkAcc, achievementAcc];

// ─────────────────────────────────────────────────────────────
// isAccessoryUnlocked
// ─────────────────────────────────────────────────────────────

describe('isAccessoryUnlocked', () => {
  it('free accessories are always unlocked', () => {
    expect(isAccessoryUnlocked(freeAcc, baseStats)).toBe(true);
  });

  it('xp threshold: locked when below', () => {
    expect(isAccessoryUnlocked(xpAcc, { ...baseStats, totalXp: 999 })).toBe(false);
  });

  it('xp threshold: unlocked exactly at target', () => {
    expect(isAccessoryUnlocked(xpAcc, { ...baseStats, totalXp: 1000 })).toBe(true);
  });

  it('xp threshold: unlocked above target', () => {
    expect(isAccessoryUnlocked(xpAcc, { ...baseStats, totalXp: 5000 })).toBe(true);
  });

  it('level threshold: locked below', () => {
    expect(isAccessoryUnlocked(levelAcc, { ...baseStats, level: 9 })).toBe(false);
  });

  it('level threshold: unlocked at exact level', () => {
    expect(isAccessoryUnlocked(levelAcc, { ...baseStats, level: 10 })).toBe(true);
  });

  it('streak threshold: locked at 0', () => {
    expect(isAccessoryUnlocked(streakAcc, { ...baseStats, streak: 0 })).toBe(false);
  });

  it('streak threshold: unlocked at target', () => {
    expect(isAccessoryUnlocked(streakAcc, { ...baseStats, streak: 7 })).toBe(true);
  });

  it('deepwork_sessions: locked when insufficient', () => {
    expect(isAccessoryUnlocked(deepworkAcc, { ...baseStats, deepworkSessions: 49 })).toBe(false);
  });

  it('deepwork_sessions: unlocked at target', () => {
    expect(isAccessoryUnlocked(deepworkAcc, { ...baseStats, deepworkSessions: 50 })).toBe(true);
  });

  it('achievement: locked when not in list', () => {
    expect(isAccessoryUnlocked(achievementAcc, baseStats)).toBe(false);
  });

  it('achievement: unlocked when achievement present', () => {
    expect(
      isAccessoryUnlocked(achievementAcc, { ...baseStats, achievements: ['first_deepwork'] })
    ).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────
// computeUnlocked
// ─────────────────────────────────────────────────────────────

describe('computeUnlocked', () => {
  it('new player only gets free accessories', () => {
    const result = computeUnlocked(baseStats, catalog);
    expect(result.has('free_item')).toBe(true);
    expect(result.has('xp_item')).toBe(false);
    expect(result.size).toBe(1);
  });

  it('advanced player unlocks multiple items', () => {
    const stats: PlayerStats = {
      totalXp: 2000,
      level: 15,
      streak: 10,
      deepworkSessions: 5,
      achievements: ['first_deepwork'],
    };
    const result = computeUnlocked(stats, catalog);
    expect(result.has('free_item')).toBe(true);
    expect(result.has('xp_item')).toBe(true);
    expect(result.has('level_item')).toBe(true);
    expect(result.has('streak_item')).toBe(true);
    expect(result.has('deepwork_item')).toBe(false);
    expect(result.has('achievement_item')).toBe(true);
  });

  it('returns empty set for empty catalog', () => {
    expect(computeUnlocked(baseStats, [])).toHaveLength !== undefined;
    expect(computeUnlocked(baseStats, []).size).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────
// detectNewUnlocks
// ─────────────────────────────────────────────────────────────

describe('detectNewUnlocks', () => {
  it('returns empty array when no new unlocks', () => {
    const ids = new Set(['free_item']);
    expect(detectNewUnlocks(ids, ids, catalog)).toHaveLength(0);
  });

  it('detects one newly unlocked item', () => {
    const previous = new Set(['free_item']);
    const current  = new Set(['free_item', 'xp_item']);
    const result = detectNewUnlocks(previous, current, catalog);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('xp_item');
  });

  it('detects multiple newly unlocked items', () => {
    const previous = new Set<string>();
    const current  = new Set(['free_item', 'xp_item', 'level_item']);
    expect(detectNewUnlocks(previous, current, catalog)).toHaveLength(3);
  });

  it('ignores already-seen items', () => {
    const previous = new Set(['free_item', 'xp_item']);
    const current  = new Set(['free_item', 'xp_item', 'streak_item']);
    const result = detectNewUnlocks(previous, current, catalog);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('streak_item');
  });
});

// ─────────────────────────────────────────────────────────────
// sanitiseConfig
// ─────────────────────────────────────────────────────────────

describe('sanitiseConfig', () => {
  const config: AvatarConfig = {
    hat: 'free_item',
    glasses: 'xp_item',
    outfit: null,
    background: null,
    badge: null,
  };

  it('keeps null slots as null', () => {
    const unlocked = new Set(['free_item', 'xp_item']);
    expect(sanitiseConfig(config, unlocked).outfit).toBeNull();
  });

  it('keeps unlocked items as-is', () => {
    const unlocked = new Set(['free_item', 'xp_item']);
    const result = sanitiseConfig(config, unlocked);
    expect(result.hat).toBe('free_item');
    expect(result.glasses).toBe('xp_item');
  });

  it('nullifies items that are no longer unlocked', () => {
    const unlocked = new Set(['free_item']);
    const result = sanitiseConfig(config, unlocked);
    expect(result.hat).toBe('free_item');
    expect(result.glasses).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────
// unlockProgress
// ─────────────────────────────────────────────────────────────

describe('unlockProgress', () => {
  it('returns null for free accessories', () => {
    expect(unlockProgress(freeAcc, baseStats)).toBeNull();
  });

  it('returns null for achievement-based accessories', () => {
    expect(unlockProgress(achievementAcc, baseStats)).toBeNull();
  });

  it('returns formatted xp progress string', () => {
    expect(unlockProgress(xpAcc, { ...baseStats, totalXp: 350 })).toBe('350 / 1 000 XP');
  });

  it('returns formatted streak progress string', () => {
    expect(unlockProgress(streakAcc, { ...baseStats, streak: 3 })).toBe('3 / 7 j');
  });
});
