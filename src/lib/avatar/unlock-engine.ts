import type { Accessory, PlayerStats, AvatarConfig } from './types';
import { ACCESSORIES } from './accessories';

// ─────────────────────────────────────────────────────────────
// Unlock Engine — pure functions, no side-effects
// ─────────────────────────────────────────────────────────────

/**
 * Returns true if a single accessory's unlock condition is met.
 */
export function isAccessoryUnlocked(acc: Accessory, stats: PlayerStats): boolean {
  const { type, value } = acc.condition;
  switch (type) {
    case 'free':
      return true;
    case 'xp':
      return stats.totalXp >= (value as number);
    case 'level':
      return stats.level >= (value as number);
    case 'streak':
      return stats.streak >= (value as number);
    case 'deepwork_sessions':
      return stats.deepworkSessions >= (value as number);
    case 'achievement':
      return stats.achievements.includes(value as string);
    default:
      return false;
  }
}

/**
 * Computes the full set of unlocked accessory IDs for a player.
 */
export function computeUnlocked(
  stats: PlayerStats,
  catalog: Accessory[] = ACCESSORIES
): Set<string> {
  const unlocked = new Set<string>();
  for (const acc of catalog) {
    if (isAccessoryUnlocked(acc, stats)) {
      unlocked.add(acc.id);
    }
  }
  return unlocked;
}

/**
 * Compares two unlock sets and returns newly unlocked accessories.
 * Use `previousIds` from persistent storage (e.g. localStorage) to avoid
 * re-showing toasts for already-seen unlocks.
 */
export function detectNewUnlocks(
  previousIds: Set<string>,
  currentIds: Set<string>,
  catalog: Accessory[] = ACCESSORIES
): Accessory[] {
  const newIds = [...currentIds].filter(id => !previousIds.has(id));
  return newIds
    .map(id => catalog.find(a => a.id === id))
    .filter((a): a is Accessory => a !== undefined);
}

/**
 * Sanitises an AvatarConfig: removes any equipped accessories that are no
 * longer unlocked (e.g. after a streak reset).  Returns null for those slots.
 */
export function sanitiseConfig(
  config: AvatarConfig,
  unlockedIds: Set<string>
): AvatarConfig {
  const sanitise = (id: string | null) =>
    id === null || unlockedIds.has(id) ? id : null;
  return {
    hat: sanitise(config.hat),
    glasses: sanitise(config.glasses),
    outfit: sanitise(config.outfit),
    background: sanitise(config.background),
    badge: sanitise(config.badge),
  };
}

/**
 * Returns a human-readable progress string toward an unlock condition.
 * E.g. "1 200 / 5 000 XP"
 */
export function unlockProgress(acc: Accessory, stats: PlayerStats): string | null {
  const { type, value } = acc.condition;
  if (type === 'free') return null;
  if (type === 'achievement') return null;

  const current: number = (() => {
    switch (type) {
      case 'xp': return stats.totalXp;
      case 'level': return stats.level;
      case 'streak': return stats.streak;
      case 'deepwork_sessions': return stats.deepworkSessions;
      default: return 0;
    }
  })();

  const target = value as number;
  const suffix: Record<string, string> = {
    xp: ' XP',
    level: '',
    streak: ' j',
    deepwork_sessions: ' sessions',
  };

  return `${current.toLocaleString('fr-FR')} / ${target.toLocaleString('fr-FR')}${suffix[type] ?? ''}`;
}
