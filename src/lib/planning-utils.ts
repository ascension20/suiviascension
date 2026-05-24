export type EventType = 'course' | 'quest' | 'ds';
export type EventDifficulty = 'easy' | 'medium' | 'hard';

export interface PlanningEvent {
  id: string;
  user_id: string;
  type: EventType;
  title: string;
  subject: string | null;
  event_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string;
  description: string | null;
  validated: boolean;
  source: 'manual' | 'ical';
  ical_uid?: string | null;
}

/** XP pour une quête : 0.5 XP/min × multiplicateur de difficulté */
export function computeQuestXp(difficulty: EventDifficulty, durationMinutes: number): number {
  const mult = difficulty === 'easy' ? 0.6 : difficulty === 'medium' ? 1.0 : 1.6;
  return Math.max(5, Math.round(durationMinutes * 0.5 * mult));
}

export function computeDeepworkXp(seconds: number): number {
  const minutes = Math.floor(seconds / 60);
  let xp = 0;
  for (let m = 1; m <= minutes; m++) {
    if (m <= 15) xp += 1;
    else if (m <= 30) xp += 2;
    else xp += 3;
  }
  return xp;
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function formatWeekLabel(weekStart: Date): string {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  const months = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
  const sameMonth = weekStart.getMonth() === end.getMonth();
  if (sameMonth) {
    return `${weekStart.getDate()} – ${end.getDate()} ${months[end.getMonth()]}`;
  }
  return `${weekStart.getDate()} ${months[weekStart.getMonth()]} – ${end.getDate()} ${months[end.getMonth()]}`;
}

export function formatDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function dayName(d: Date, short = false): string {
  const long = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const sh = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return (short ? sh : long)[d.getDay()];
}

export function eventTypeColor(type: EventType) {
  switch (type) {
    case 'course':
      return { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-300', dot: 'bg-amber-500' };
    case 'quest':
      return { bg: 'bg-violet-500/15', border: 'border-violet-500/40', text: 'text-violet-300', dot: 'bg-violet-500' };
    case 'ds':
      return { bg: 'bg-rose-500/15', border: 'border-rose-500/40', text: 'text-rose-300', dot: 'bg-rose-500' };
  }
}

export function eventTypeLabel(type: EventType) {
  return type === 'course' ? 'Cours' : type === 'quest' ? 'Quête' : 'DS';
}

/**
 * Maps full subject names (from SUBJECTS) to the DB's limited subject_type enum
 * ("Maths" | "Français" | "Physique" | "SES" | "Anglais" | "Autre").
 * Unmapped subjects fall back to 'Autre' with the original name in custom_subject.
 */
export function toExamSubject(s: string): { subject: string; custom_subject: string | null } {
  if (s === 'Français')        return { subject: 'Français', custom_subject: null };
  if (s === 'SES')             return { subject: 'SES',      custom_subject: null };
  if (s === 'Autre')           return { subject: 'Autre',    custom_subject: null };
  if (s === 'Mathématiques')   return { subject: 'Maths',    custom_subject: 'Mathématiques' };
  if (s === 'Physique-Chimie') return { subject: 'Physique', custom_subject: 'Physique-Chimie' };
  if (s === 'LV1 (Anglais)')   return { subject: 'Anglais',  custom_subject: 'LV1 (Anglais)' };
  return { subject: 'Autre', custom_subject: s };
}

/** localStorage key used by the deepwork timer (shared between pages) */
export const DEEPWORK_STORAGE_KEY = 'deepwork_started_at';
