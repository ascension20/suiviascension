export const SUBJECTS = ['Maths', 'Français', 'Physique', 'SES', 'Anglais', 'Autre'] as const;
export type Subject = typeof SUBJECTS[number];

export const SUBJECT_CSS_VAR: Record<Subject, string> = {
  'Maths': '--subject-maths',
  'Français': '--subject-francais',
  'Physique': '--subject-physique',
  'SES': '--subject-ses',
  'Anglais': '--subject-anglais',
  'Autre': '--subject-autre',
};

export const AVATARS = ['🐺', '🦊', '🦅', '🐱', '🐻', '🦁', '🐲', '🦉', '🐍', '🦈'] as const;

const TITLE_THRESHOLDS = [
  { name: 'Apprenti', minLevel: 1 },
  { name: 'Élève', minLevel: 6 },
  { name: 'Studieux', minLevel: 13 },
  { name: 'Érudit', minLevel: 23 },
  { name: 'Expert', minLevel: 35 },
  { name: 'Maître', minLevel: 46 },
];

export function getTitleForLevel(level: number): string {
  for (let i = TITLE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (level >= TITLE_THRESHOLDS[i].minLevel) return TITLE_THRESHOLDS[i].name;
  }
  return TITLE_THRESHOLDS[0].name;
}

export function calculateLevel(totalXp: number): { level: number; currentXp: number; requiredXp: number } {
  let level = 1;
  let xpUsed = 0;
  while (level < 50) {
    const needed = 200 * level;
    if (xpUsed + needed > totalXp) {
      return { level, currentXp: totalXp - xpUsed, requiredXp: needed };
    }
    xpUsed += needed;
    level++;
  }
  return { level: 50, currentXp: 0, requiredXp: 1 };
}

export function questXpReward(difficulty: 1 | 2 | 3, isCoachQuest: boolean): number {
  const base = [50, 100, 150];
  return isCoachQuest ? base[difficulty - 1] : Math.round(base[difficulty - 1] * 0.7);
}

export function timerXpReward(durationMinutes: number): number {
  return Math.floor(durationMinutes / 25) * 10;
}

export function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.value = 0.3;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Audio not available
  }
}
