import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Loader2, MessageCircle, X, Image as ImageIcon, Trash2,
  Check, Shield, Users, ChevronLeft, ChevronRight,
  Search, Pin, PinOff, CalendarDays, Flame, Moon, AlarmClock, Zap,
  BarChart2, Calendar, AlertTriangle, FileText, Star,
} from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

// ── types ────────────────────────────────────────────────────────────────────
type Profile = Database['public']['Tables']['profiles']['Row'];

// Matches the actual DB schema for planning_events
interface PlanningEvent {
  id: string;
  user_id: string;
  type: 'course' | 'quest' | 'ds';
  source: 'manual' | 'ical';
  title: string;
  subject: string | null;
  event_date: string;   // YYYY-MM-DD
  start_time: string;   // HH:MM:SS
  end_time: string;     // HH:MM:SS
  description: string | null;
  validated: boolean;
  ical_uid: string | null;
  linked_quest_id: string | null;
}

interface StudentQuest {
  id: string; user_id: string; title: string; subject: string;
  difficulty: string; xp_reward: number; completed: boolean;
  completed_at: string | null; deadline: string | null; created_at: string;
}

interface StudentDifficulty {
  id: string; user_id: string; subject: string; severity: string;
  description: string; resolved: boolean; coach_reply: string | null; created_at: string;
}

interface StudentExam {
  id: string; user_id: string; subject: string; exam_date: string;
  chapters: string | null; stress_level: string; grade: number | null;
  photo_url?: string | null; grade_received: boolean;
}

// ── constants ────────────────────────────────────────────────────────────────
const TUTOR_KEY = 'coach_tutored_students';

const SEVERITY_LABELS: Record<string, { label: string; color: string }> = {
  blocking: { label: 'Bloquant', color: 'hsl(0 84% 60%)' },
  fragile:  { label: 'Fragile',  color: 'hsl(38 92% 55%)' },
  ok:       { label: 'Gérable',  color: 'hsl(142 71% 45%)' },
};
const STRESS_LABELS: Record<string, string> = {
  stressed: '◆ Stressé', neutral: '◆ Neutre', calm: '◆ Serein',
};

// Returns true if the streak is still "alive" (last activity today or yesterday)
function isStreakLive(lastActivityDate: string | null): boolean {
  if (!lastActivityDate) return false;
  const today = new Date().toISOString().slice(0, 10);
  const yest  = new Date(); yest.setDate(yest.getDate() - 1);
  return lastActivityDate === today || lastActivityDate === yest.toISOString().slice(0, 10);
}

// How many days since last activity (null → never)
function daysSinceActivity(lastActivityDate: string | null): number | null {
  if (!lastActivityDate) return null;
  const diff = new Date().getTime() - new Date(lastActivityDate + 'T12:00:00').getTime();
  return Math.floor(diff / 86_400_000);
}

// Event type visual config
const EVENT_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  course: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Cours' },
  quest:  { color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', label: 'Quête' },
  ds:     { color: '#f87171', bg: 'rgba(248,113,113,0.15)', label: 'DS' },
};

// ── weekly calendar ──────────────────────────────────────────────────────────
const GRID_START = 8;
const GRID_END   = 22;
const GRID_HOURS = GRID_END - GRID_START;
const HOUR_PX    = 52;

function toDecHour(timeStr: string): number {
  const h = parseInt(timeStr.slice(0, 2), 10);
  const m = parseInt(timeStr.slice(3, 5), 10);
  return h + m / 60;
}

/**
 * Returns a YYYY-MM-DD string in the LOCAL timezone.
 * Never use d.toISOString().slice(0,10) for date keys — that gives a UTC date
 * which in UTC+2 shifts every day back by one, making Tuesday events appear
 * on Wednesday in the calendar grid.
 */
function toLocalDateKey(d: Date): string {
  const y   = d.getFullYear();
  const mo  = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

function WeekCalendar({ events }: { events: PlanningEvent[] }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const monday = useMemo(() => {
    const d = new Date();
    const dow = d.getDay();
    d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1) + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

  const days = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    }), [monday]);

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);

  const weekLabel = useMemo(() =>
    `${days[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — ${days[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`,
  [days]);

  const weekDateKeys = useMemo(() =>
    days.map(d => toLocalDateKey(d)),
  [days]);

  // Group events by event_date key
  const eventsByDay = useMemo(() => {
    const map: Record<string, PlanningEvent[]> = {};
    weekDateKeys.forEach(k => { map[k] = []; });
    events.forEach(ev => {
      if (map[ev.event_date]) map[ev.event_date].push(ev);
    });
    return map;
  }, [events, weekDateKeys]);

  const hours = Array.from({ length: GRID_HOURS }, (_, i) => GRID_START + i);
  const gridH = GRID_HOURS * HOUR_PX;

  function eventStyle(ev: PlanningEvent): React.CSSProperties {
    const startH  = toDecHour(ev.start_time);
    const endH    = toDecHour(ev.end_time);
    const topPx   = Math.max(0, (startH - GRID_START) * HOUR_PX);
    const heightPx = Math.max(20, (endH - startH) * HOUR_PX);
    const cfg      = EVENT_STYLE[ev.type] ?? EVENT_STYLE.course;
    return {
      position: 'absolute',
      top:    `${topPx}px`,
      height: `${heightPx}px`,
      left: '2px', right: '2px',
      background: cfg.bg,
      borderLeft: `3px solid ${cfg.color}`,
      borderRadius: '4px',
      padding: '2px 5px',
      overflow: 'hidden',
      cursor: 'default',
      zIndex: 1,
    };
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(EVENT_STYLE).map(([type, cfg]) => (
          <span key={type} className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
            <span style={{ color: cfg.color }}>{cfg.label}</span>
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground ml-2">
          <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-muted-foreground" />
          iCal importé
        </span>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-bold" style={{ color: 'hsl(43 90% 60%)' }}>{weekLabel}</span>
        <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid" style={{ gridTemplateColumns: '32px repeat(7, 1fr)', gap: 0 }}>
        <div />
        {days.map((d, i) => {
          const isToday = d.getTime() === today.getTime();
          return (
            <div key={i} className="text-center pb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                {d.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </span>
              <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mx-auto mt-0.5`}
                style={isToday
                  ? { background: 'hsl(43 90% 52%)', color: 'hsl(222 22% 8%)' }
                  : { color: 'hsl(220 10% 65%)' }
                }>
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="overflow-y-auto rounded-xl border border-border/30" style={{ maxHeight: 500 }}>
        <div className="grid" style={{ gridTemplateColumns: '32px repeat(7, 1fr)', minHeight: `${gridH}px` }}>
          {/* Hour labels */}
          <div className="relative border-r border-border/20" style={{ minHeight: `${gridH}px` }}>
            {hours.map(h => (
              <div key={h} style={{ position: 'absolute', top: `${(h - GRID_START) * HOUR_PX}px`, height: HOUR_PX, width: '100%' }}
                className="flex items-start justify-end pr-1 pt-0.5">
                <span className="text-[8px] text-muted-foreground/60">{h}h</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d, di) => {
            const dateKey  = weekDateKeys[di];
            const dayEvs   = eventsByDay[dateKey] || [];
            const isToday  = d.getTime() === today.getTime();
            return (
              <div key={di} className="relative border-l border-border/20"
                style={{ height: `${gridH}px`, background: isToday ? 'hsl(43 90% 50% / 0.025)' : 'transparent' }}>
                {/* Hour lines */}
                {hours.map(h => (
                  <div key={h} style={{ position: 'absolute', top: `${(h - GRID_START) * HOUR_PX}px`, left: 0, right: 0, height: 1, background: 'hsl(222 16% 16%)' }} />
                ))}
                {/* Events */}
                {dayEvs.map(ev => {
                  const startH = toDecHour(ev.start_time);
                  const endH   = toDecHour(ev.end_time);
                  const dur    = Math.round((endH - startH) * 60);
                  const cfg    = EVENT_STYLE[ev.type] ?? EVENT_STYLE.course;
                  return (
                    <div key={ev.id} style={eventStyle(ev)}
                      title={`${ev.title}${ev.subject ? ` — ${ev.subject}` : ''}\n${ev.start_time.slice(0,5)}–${ev.end_time.slice(0,5)}`}>
                      <span className="text-[9px] font-bold block leading-tight truncate" style={{ color: cfg.color }}>
                        {ev.title}
                        {ev.source === 'ical' && <span className="ml-1 opacity-60">·iCal</span>}
                      </span>
                      {dur >= 30 && (
                        <span className="text-[8px] block opacity-60" style={{ color: cfg.color }}>
                          {ev.start_time.slice(0, 5)}–{ev.end_time.slice(0, 5)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── activity chart ────────────────────────────────────────────────────────────
function ActivityChart({ sessions }: { sessions: { duration_seconds: number; started_at: string }[] }) {
  const todayKey = toLocalDateKey(new Date());

  const days = useMemo(() => {
    const arr: { date: string; hours: number; label: string }[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = toLocalDateKey(d);   // local date, never UTC-shifted
      const mins = sessions
        .filter(s => s.started_at && toLocalDateKey(new Date(s.started_at)) === key)
        .reduce((a, s) => a + s.duration_seconds / 60, 0);
      arr.push({ date: key, hours: mins / 60, label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) });
    }
    return arr;
  }, [sessions]);

  const maxH = Math.max(...days.map(d => d.hours), 0.5);
  const totalMonth = days.reduce((a, d) => a + d.hours, 0);
  const activeDays = days.filter(d => d.hours > 0).length;

  // 4 weekly totals (oldest → newest)
  const weekTotals = [3, 2, 1, 0].map(w => {
    const endIdx   = 30 - w * 7;
    const startIdx = Math.max(0, endIdx - 7);
    return days.slice(startIdx, endIdx).reduce((a, d) => a + d.hours, 0);
  });

  return (
    <div className="p-3 rounded-xl space-y-2" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Activité — 30 derniers jours</p>
        <div className="flex gap-3 text-[10px]">
          <span>
            <span className="font-bold tabular-nums" style={{ color: 'hsl(43 90% 55%)' }}>{Math.round(totalMonth)}h</span>
            {' '}<span className="text-muted-foreground">total</span>
          </span>
          <span>
            <span className="font-bold tabular-nums" style={{ color: 'hsl(270 70% 65%)' }}>{activeDays}</span>
            {' '}<span className="text-muted-foreground">j actifs</span>
          </span>
        </div>
      </div>

      {/* Daily bars */}
      <div className="flex items-end gap-px" style={{ height: 52 }}>
        {days.map(d => {
          const hPct    = d.hours > 0 ? Math.max((d.hours / maxH) * 100, 6) : 0;
          const isToday = d.date === todayKey;
          return (
            <div key={d.date}
              title={`${d.label} : ${d.hours > 0 ? `${Math.round(d.hours * 10) / 10}h` : '—'}`}
              className="flex-1 flex items-end" style={{ height: '100%' }}>
              <div style={{
                width: '100%',
                height: d.hours > 0 ? `${hPct}%` : '2px',
                background: isToday
                  ? 'hsl(43 90% 52%)'
                  : d.hours > 0 ? 'hsl(270 70% 55%)' : 'hsl(222 16% 16%)',
                borderRadius: '2px 2px 0 0',
                boxShadow: isToday ? '0 0 6px hsl(43 90% 52% / 0.5)' : 'none',
              }} />
            </div>
          );
        })}
      </div>

      {/* Week boundary labels */}
      <div className="flex text-[8px] text-muted-foreground/40 justify-between px-0.5">
        {[4, 3, 2, 1].map(w => {
          const d = new Date(); d.setDate(d.getDate() - w * 7);
          return <span key={w}>{d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>;
        })}
        <span>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
      </div>

      {/* Weekly totals */}
      <div className="grid grid-cols-4 gap-1">
        {weekTotals.map((h, i) => (
          <div key={i} className="text-center p-1.5 rounded-lg" style={{ background: 'hsl(222 22% 12%)' }}>
            <p className="font-bold text-[11px] tabular-nums" style={{
              color: h >= 10 ? 'hsl(142 71% 50%)' : h >= 5 ? 'hsl(43 90% 52%)' : 'hsl(220 10% 50%)',
            }}>{Math.round(h * 10) / 10}h</p>
            <p className="text-[8px] text-muted-foreground">
              {i === 3 ? 'Cette sem.' : `S-${3 - i}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── quests-per-day chart ──────────────────────────────────────────────────────
function QuestsChart({ quests }: { quests: { completed: boolean; completed_at: string | null; created_at: string }[] }) {
  const todayKey = new Date().toISOString().slice(0, 10);

  // All-time counts
  const allTimeCompleted = quests.filter(q => q.completed).length;
  // Quests completed but without a known completion date (can't be placed on the chart)
  const undated = quests.filter(q => q.completed && !q.completed_at).length;

  const days = useMemo(() => {
    const arr: { date: string; count: number; label: string }[] = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      // Only use completed_at — created_at is the creation date, not completion date
      const count = quests.filter(q => q.completed && q.completed_at?.slice(0, 10) === key).length;
      arr.push({ date: key, count, label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) });
    }
    return arr;
  }, [quests]);

  const maxCount  = Math.max(...days.map(d => d.count), 1);
  const total30d  = days.reduce((a, d) => a + d.count, 0);
  const activeDays = days.filter(d => d.count > 0).length;

  return (
    <div className="p-3 rounded-xl space-y-2" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Quêtes complétées</p>
        <div className="flex gap-3 text-[10px]">
          <span title="Total depuis le début">
            <span className="font-bold tabular-nums" style={{ color: '#a78bfa' }}>{allTimeCompleted}</span>
            {' '}<span className="text-muted-foreground">total</span>
          </span>
          <span title="Sur les 30 derniers jours (avec date connue)">
            <span className="font-bold tabular-nums" style={{ color: 'hsl(142 71% 50%)' }}>{total30d}</span>
            {' '}<span className="text-muted-foreground">30j</span>
          </span>
          <span>
            <span className="font-bold tabular-nums" style={{ color: 'hsl(220 10% 55%)' }}>{activeDays}</span>
            {' '}<span className="text-muted-foreground">jours actifs</span>
          </span>
        </div>
      </div>

      {/* Daily bars */}
      <div className="flex items-end gap-px" style={{ height: 44 }}>
        {days.map(d => {
          const hPct    = d.count > 0 ? Math.max((d.count / maxCount) * 100, 12) : 0;
          const isToday = d.date === todayKey;
          return (
            <div key={d.date}
              title={`${d.label} : ${d.count > 0 ? `${d.count} quête${d.count > 1 ? 's' : ''}` : '—'}`}
              className="flex-1 flex items-end" style={{ height: '100%' }}>
              <div style={{
                width: '100%',
                height: d.count > 0 ? `${hPct}%` : '2px',
                background: isToday
                  ? 'hsl(43 90% 52%)'
                  : d.count > 0 ? '#a78bfa' : 'hsl(222 16% 16%)',
                borderRadius: '2px 2px 0 0',
                boxShadow: isToday ? '0 0 6px hsl(43 90% 52% / 0.5)' : d.count > 0 ? '0 0 4px rgba(167,139,250,0.25)' : 'none',
              }} />
            </div>
          );
        })}
      </div>

      {/* Week boundary labels */}
      <div className="flex text-[8px] text-muted-foreground/40 justify-between px-0.5">
        {[4, 3, 2, 1].map(w => {
          const d = new Date(); d.setDate(d.getDate() - w * 7);
          return <span key={w}>{d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>;
        })}
        <span>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
      </div>

      {/* Undated completed quests notice */}
      {undated > 0 && (
        <p className="text-[9px] text-center" style={{ color: 'hsl(220 10% 38%)' }}>
          {undated} quête{undated > 1 ? 's' : ''} ancienne{undated > 1 ? 's' : ''} sans date de complétion — comptée{undated > 1 ? 's' : ''} dans le total, non représentée{undated > 1 ? 's' : ''} sur le graphique
        </p>
      )}
    </div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
export default function CoachDashboard() {
  const { signOut } = useAuth();

  type EnrichedStudent = Profile & {
    completionRate: number; totalHours: number; lastActive: string;
    last_seen_at: string | null; class_level: string | null; avatarUrl: string;
  };

  // ── state ──
  const [students,       setStudents]       = useState<EnrichedStudent[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [difficulties,   setDifficulties]   = useState<StudentDifficulty[]>([]);
  const [exams,          setExams]          = useState<StudentExam[]>([]);
  const [quests,         setQuests]         = useState<StudentQuest[]>([]);
  const [planningEvents, setPlanningEvents] = useState<PlanningEvent[]>([]);
  const [baselines,      setBaselines]      = useState<Record<string, boolean>>({});
  const [deepworkSessions, setDeepworkSessions] = useState<{ user_id: string; duration_seconds: number; started_at: string }[]>([]);

  // UI
  const [selectedId,  setSelectedId]  = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [search,      setSearch]      = useState('');
  const [tutoredIds,  setTutoredIds]  = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(TUTOR_KEY) || '[]')); }
    catch { return new Set(); }
  });
  const [showCalendar, setShowCalendar] = useState(false);

  // Modals
  const [showCreateCoach,  setShowCreateCoach]  = useState(false);
  const [newCoach,         setNewCoach]         = useState({ pseudo: '', email: '', password: '' });
  const [creating,         setCreating]         = useState(false);

  const [replyingTo,     setReplyingTo]     = useState<string | null>(null);
  const [replyText,      setReplyText]      = useState('');
  const [previewPhoto,   setPreviewPhoto]   = useState<string | null>(null);
  const [confirmDelete,  setConfirmDelete]  = useState<{ userId: string; pseudo: string } | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<string | null>(null);

  // ── tutor toggle ──
  const toggleTutor = useCallback((uid: string) => {
    setTutoredIds(prev => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid); else next.add(uid);
      localStorage.setItem(TUTOR_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  // ── data loading ──
  const loadData = async () => {
    const [
      { data: profiles },
      { data: roles },
      { data: privateRows },
      { data: allQuests },
      { data: allSessions },
      { data: avatarCfgs },
    ] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('user_roles').select('user_id, role'),
      supabase.from('user_private').select('user_id, last_seen_at'),
      supabase.from('quests').select('*').limit(5000),
      supabase.from('deepwork_sessions').select('user_id, duration_seconds, started_at')
        .order('started_at', { ascending: false }).limit(10000),
      supabase.from('avatar_configs').select('*'),
    ]);

    if (!profiles || !roles) { setLoading(false); return; }

    const studentIds   = roles.filter(r => r.role === 'student').map(r => r.user_id);
    const studentProfs = profiles.filter(p => studentIds.includes(p.user_id));
    const lastSeenMap  = Object.fromEntries((privateRows ?? []).map(r => [r.user_id, r.last_seen_at]));

    const cfgMap: Record<string, AvatarConfig> = {};
    (avatarCfgs ?? []).forEach((c: any) => { cfgMap[c.user_id] = c as AvatarConfig; });

    const [
      { data: diffs },
      { data: examsData },
      { data: planningData },
      { data: blData },
    ] = await Promise.all([
      supabase.from('difficulties').select('*').order('created_at', { ascending: false }),
      supabase.from('exams').select('*').order('exam_date', { ascending: true }),
      supabase.from('planning_events').select('*').order('event_date').order('start_time'),
      supabase.from('student_baselines').select('user_id'),
    ]);

    if (diffs)        setDifficulties(diffs as StudentDifficulty[]);
    if (examsData)    setExams(examsData.map(e => ({ ...e, photo_url: (e as any).photo_url ?? null, grade_received: (e as any).grade_received ?? false })) as StudentExam[]);
    if (planningData) setPlanningEvents(planningData as PlanningEvent[]);
    if (blData)       setBaselines(Object.fromEntries((blData as any[]).map((b: any) => [b.user_id, true])));

    // Quests
    if (allQuests) setQuests(allQuests.map(q => ({
      id: q.id, user_id: q.assigned_to!, title: q.title, subject: q.subject,
      difficulty: q.difficulty, xp_reward: q.xp_reward, completed: q.completed,
      completed_at: q.completed_at, deadline: q.deadline, created_at: q.created_at,
    })).filter(q => !!q.user_id));

    const enriched: EnrichedStudent[] = studentProfs.map(p => {
      const userQuests     = (allQuests  || []).filter(q => q.assigned_to === p.user_id);
      const completed      = userQuests.filter(q => q.completed).length;
      const completionRate = userQuests.length > 0 ? Math.round((completed / userQuests.length) * 100) : 100;
      // Use the pre-aggregated total from profiles (kept in sync by deepwork save hooks)
      const totalHours = Math.round((p.total_deepwork_seconds ?? 0) / 3600);
      const lastActive     = p.last_activity_date
        ? (new Date(p.last_activity_date).toDateString() === new Date().toDateString() ? "Aujourd'hui" : p.last_activity_date)
        : 'Jamais';
      const cfg = cfgMap[p.user_id] ?? DEFAULT_AVATAR_CONFIG;
      return {
        ...p,
        completionRate, totalHours, lastActive,
        last_seen_at: lastSeenMap[p.user_id] ?? null,
        class_level: p.class_level,
        avatarUrl: buildAvataaarsUrl(cfg, p.pseudo),
      };
    });

    setDeepworkSessions((allSessions || []) as { user_id: string; duration_seconds: number; started_at: string }[]);
    setStudents(enriched);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const ch = supabase.channel('coach-rt3')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' },        () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' },          () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deepwork_sessions' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties' },    () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' },           () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'planning_events' }, () => loadData())
      .subscribe();
    const tick = setInterval(() => setStudents(p => [...p]), 30_000);
    return () => { supabase.removeChannel(ch); clearInterval(tick); };
  }, []);

  // ── handlers ──
  const handleReply = async (diffId: string) => {
    if (!replyText.trim()) return;
    await supabase.from('difficulties').update({ coach_reply: replyText.trim(), resolved: true }).eq('id', diffId);
    setReplyText(''); setReplyingTo(null); loadData();
  };

  const handleCreateCoach = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke('create-coach', {
        body: { email: newCoach.email, password: newCoach.password, pseudo: newCoach.pseudo },
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (res.error) alert('Erreur: ' + res.error.message);
      else { setNewCoach({ pseudo: '', email: '', password: '' }); setShowCreateCoach(false); }
    } catch (err) { alert('Erreur: ' + (err as Error).message); }
    setCreating(false);
  };

  const handleDeleteStudent = async (userId: string) => {
    setDeletingStudent(userId);
    try { await supabase.functions.invoke('delete-student', { body: { studentUserId: userId } }); }
    catch { alert('Erreur lors de la suppression'); }
    if (selectedId === userId) setSelectedId(null);
    setDeletingStudent(null); setConfirmDelete(null); loadData();
  };

  const handleMarkGradeReceived = async (examId: string, received: boolean) => {
    await supabase.from('exams').update({ grade_received: received } as any).eq('id', examId);
    setExams(prev => prev.map(e => e.id === examId ? { ...e, grade_received: received } : e));
  };

  const handleCreateBaseline = async (uid: string) => {
    const s = students.find(x => x.user_id === uid); if (!s) return;
    const sExams = exams.filter(e => e.user_id === uid);
    const gradesBySubject: Record<string, number[]> = {};
    sExams.forEach(e => { if (e.grade !== null) { gradesBySubject[e.subject] = gradesBySubject[e.subject] || []; gradesBySubject[e.subject].push(e.grade!); } });
    await supabase.from('student_baselines').upsert({
      user_id: uid, initial_total_xp: s.total_xp, initial_streak: s.streak,
      initial_total_hours: s.totalHours, initial_grades: gradesBySubject,
      initial_quest_completion_rate: s.completionRate,
    }, { onConflict: 'user_id' });
    setBaselines(prev => ({ ...prev, [uid]: true }));
  };

  // ── derived ──
  const now      = new Date();
  const todayStr = toLocalDateKey(now);

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase().trim();
    return q ? students.filter(s => s.pseudo.toLowerCase().includes(q)) : students;
  }, [students, search]);

  const tutoredStudents  = filteredStudents.filter(s => tutoredIds.has(s.user_id));
  const otherStudents    = filteredStudents.filter(s => !tutoredIds.has(s.user_id));
  const selectedStudent  = students.find(s => s.user_id === selectedId) ?? null;

  const onlineCount          = students.filter(s => s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000).length;
  const totalUnresolvedDiffs = difficulties.filter(d => !d.resolved).length;
  const totalMissingGrades   = exams.filter(e => new Date(e.exam_date) < now && e.grade === null && !(e as any).grade_received).length;

  // Per-student helpers
  const sData = (uid: string) => ({
    diffs:    difficulties.filter(d => d.user_id === uid),
    exams:    exams.filter(e => e.user_id === uid),
    quests:   quests.filter(q => q.user_id === uid),
    planning: planningEvents.filter(p => p.user_id === uid),
  });

  // ── online dot ──
  function OnlineDot({ lastSeenAt }: { lastSeenAt: string | null }) {
    if (!lastSeenAt) return <span className="text-[10px] text-muted-foreground">Jamais</span>;
    const diff    = (Date.now() - new Date(lastSeenAt).getTime()) / 1000;
    const online  = diff < 120;
    const minutes = Math.floor(diff / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const label   = online ? 'En ligne' : days > 0 ? `${days}j` : hours > 0 ? `${hours}h` : `${minutes}min`;
    return (
      <span className="flex items-center gap-1 text-[10px]">
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: online ? 'hsl(142 71% 50%)' : 'hsl(220 10% 35%)', boxShadow: online ? '0 0 5px hsl(142 71% 50%)' : 'none' }} />
        <span style={{ color: online ? 'hsl(142 71% 55%)' : 'hsl(220 10% 50%)' }}>{label}</span>
      </span>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="stat-badge px-4 py-2 text-sm font-display font-black"
            style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))', color: 'hsl(222 22% 8%)' }}>
            COMMANDE
          </div>
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'hsl(43 90% 52%)' }} />
        </div>
      </div>
    );
  }

  // ── student row component ──
  const StudentRow = ({ s }: { s: EnrichedStudent }) => {
    const isTutored  = tutoredIds.has(s.user_id);
    const isSelected = selectedId === s.user_id;
    const { diffs }  = sData(s.user_id);
    const unresolved = diffs.filter(d => !d.resolved).length;
    const { level }  = calculateLevel(s.total_xp);

    return (
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer group transition-all"
        style={{
          background: isSelected
            ? 'hsl(43 90% 50% / 0.12)'
            : isTutored ? 'hsl(43 90% 50% / 0.05)' : 'transparent',
          border: `1px solid ${
            isSelected ? 'hsl(43 90% 50% / 0.35)'
            : isTutored ? 'hsl(43 90% 50% / 0.18)'
            : 'transparent'
          }`,
        }}
        onClick={() => { setSelectedId(s.user_id); setSelectedTab('overview'); }}
        whileHover={{ x: 2 }}
      >
        {/* Avatar + online */}
        <div className="relative shrink-0">
          <img src={s.avatarUrl} alt={s.pseudo}
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: `2px solid ${isTutored ? 'hsl(43 90% 50% / 0.55)' : isSelected ? 'hsl(43 90% 50% / 0.4)' : 'hsl(222 16% 22%)'}` }}
          />
          {s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000 && (
            <span className="absolute -bottom-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'hsl(142 71% 50%)', borderColor: 'hsl(222 22% 8%)', boxShadow: '0 0 5px hsl(142 71% 50%)' }} />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium truncate" style={{ color: isTutored ? 'hsl(43 90% 72%)' : 'inherit' }}>{s.pseudo}</span>
            {s.class_level && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0"
                style={{ background: 'hsl(43 90% 50% / 0.1)', color: 'hsl(43 90% 60%)' }}>
                {s.class_level}
              </span>
            )}
            {isTutored && (
              <span className="text-[8px] px-1 py-0.5 rounded font-bold shrink-0 uppercase tracking-wide"
                style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 65%)', border: '1px solid hsl(43 90% 50% / 0.2)' }}>
                tutoré
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-muted-foreground">Lv.{level}</span>
            {(() => {
              const live = isStreakLive(s.last_activity_date);
              return (
                <span className="text-[10px]"
                  title={live ? `Streak actif — ${s.streak}j` : `Streak brisé (dernier: ${s.last_activity_date ?? 'jamais'})`}
                  style={{ color: live && s.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(220 10% 38%)' }}>
                  {live ? <Flame size={10} style={{ display: 'inline' }} /> : <Moon size={10} style={{ display: 'inline' }} />}{s.streak}
                </span>
              );
            })()}
            <OnlineDot lastSeenAt={s.last_seen_at} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {unresolved > 0 && (
            <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
              style={{ background: 'hsl(0 84% 55% / 0.15)', color: 'hsl(0 84% 65%)' }}>
              {unresolved}
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); toggleTutor(s.user_id); }}
            className="p-1 rounded opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            style={{ color: isTutored ? 'hsl(43 90% 55%)' : 'hsl(220 10% 45%)' }}
            title={isTutored ? 'Retirer des tutorés' : 'Marquer comme tutoré'}
          >
            {isTutored ? <PinOff size={11} /> : <Pin size={11} />}
          </button>
        </div>
      </motion.div>
    );
  };

  // ── detail panel ──
  const DetailPanel = ({ s }: { s: EnrichedStudent }) => {
    const { level }  = calculateLevel(s.total_xp);
    const title      = getTitleForLevel(level);
    const data       = sData(s.user_id);
    const isTutored  = tutoredIds.has(s.user_id);

    const streakLive  = isStreakLive(s.last_activity_date);
    const streakDays  = daysSinceActivity(s.last_activity_date);

    const gradesBySubject: Record<string, number[]> = {};
    data.exams.filter(e => e.grade !== null).forEach(e => {
      gradesBySubject[e.subject] = gradesBySubject[e.subject] || [];
      gradesBySubject[e.subject].push(e.grade!);
    });

    // ── period filter for overview stats ──
    const [statPeriod, setStatPeriod] = useState<'global' | 'monthly' | 'weekly'>('global');

    const periodStats = useMemo(() => {
      const studentSessions = deepworkSessions.filter(sess => sess.user_id === s.user_id);
      const quests = data.quests;

      if (statPeriod === 'global') {
        return {
          xpLabel:  'XP total',
          xp:       s.total_xp.toLocaleString('fr-FR'),
          hoursLabel: 'Heures totales',
          hours:    `${s.totalHours}h`,
          questLabel: 'Quêtes ✓',
          quests:   `${quests.filter(q => q.completed).length}/${quests.length}`,
          questRate: s.completionRate,
        };
      }

      const days   = statPeriod === 'weekly' ? 7 : 30;
      const cutoff = new Date(now.getTime() - days * 86_400_000);

      const filteredSessions = studentSessions.filter(sess => new Date(sess.started_at) >= cutoff);
      const completedInPeriod = quests.filter(q =>
        q.completed && q.completed_at && new Date(q.completed_at) >= cutoff
      );
      const xpInPeriod    = completedInPeriod.reduce((a, q) => a + q.xp_reward, 0);
      const secsInPeriod  = filteredSessions.reduce((a, sess) => a + sess.duration_seconds, 0);
      const hoursInPeriod = Math.round((secsInPeriod / 3600) * 10) / 10;
      const rate = quests.length > 0
        ? Math.round((completedInPeriod.length / quests.length) * 100)
        : 100;

      return {
        xpLabel:   'XP gagné',
        xp:        xpInPeriod.toLocaleString('fr-FR'),
        hoursLabel: 'Heures',
        hours:     `${hoursInPeriod}h`,
        questLabel: 'Quêtes ✓',
        quests:    `${completedInPeriod.length}`,
        questRate: rate,
      };
    }, [statPeriod, s, deepworkSessions, data.quests]);

    // DS from planning calendar (upcoming)
    const upcomingDsEvents = data.planning.filter(p => p.type === 'ds' && p.event_date >= todayStr);
    // Upcoming exams from exams table
    const upcomingExams    = data.exams.filter(e => new Date(e.exam_date + 'T12:00:00') >= now);

    const TABS = [
      { key: 'overview', label: 'Vue d\'ensemble',    icon: <BarChart2 size={12} /> },
      { key: 'planning', label: 'Planning & Quêtes', icon: <Calendar  size={12} />,
        badge: data.planning.filter(p => p.event_date >= todayStr && p.type !== 'course').length + data.quests.filter(q => !q.completed).length },
      { key: 'diffs',    label: 'Difficultés',        icon: <AlertTriangle size={12} />,
        badge: data.diffs.filter(d => !d.resolved).length },
      { key: 'exams',    label: 'DS',                 icon: <FileText size={12} />,
        badge: upcomingDsEvents.length + upcomingExams.length || undefined },
    ];

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 p-5 border-b border-border/50">
          <div className="relative">
            <img src={s.avatarUrl} alt={s.pseudo} className="w-14 h-14 rounded-full object-cover"
              style={{ border: `2px solid ${isTutored ? 'hsl(43 90% 50% / 0.6)' : 'hsl(43 90% 50% / 0.3)'}`,
                boxShadow: isTutored ? '0 0 16px hsl(43 90% 50% / 0.2)' : 'none' }} />
            {s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000 && (
              <span className="absolute -bottom-0.5 -right-0.5 block w-3.5 h-3.5 rounded-full border-2"
                style={{ background: 'hsl(142 71% 50%)', borderColor: 'hsl(222 22% 8%)' }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-base">{s.pseudo}</h2>
              {s.class_level && (
                <span className="text-xs px-2 py-0.5 rounded-lg font-bold"
                  style={{ background: 'hsl(43 90% 50% / 0.12)', color: 'hsl(43 90% 62%)', border: '1px solid hsl(43 90% 50% / 0.2)' }}>
                  {s.class_level}
                </span>
              )}
              <span className="stat-badge text-[10px] px-2 py-0.5"
                style={{ background: 'linear-gradient(135deg, hsl(43 90% 32%), hsl(43 90% 48%))', color: 'hsl(222 22% 8%)' }}>
                LVL {level}
              </span>
              {isTutored && (
                <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold"
                  style={{ background: 'hsl(43 90% 50% / 0.12)', color: 'hsl(43 90% 65%)', border: '1px solid hsl(43 90% 50% / 0.2)' }}>
                  ◆ Tutoré
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => toggleTutor(s.user_id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={isTutored
                ? { background: 'hsl(43 90% 50% / 0.15)', border: '1px solid hsl(43 90% 50% / 0.3)', color: 'hsl(43 90% 62%)' }
                : { background: 'hsl(222 22% 12%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 60%)' }
              }>
              {isTutored ? <><PinOff size={11} /> Retirer</> : <><Pin size={11} /> Marquer tutoré</>}
            </button>
            <button onClick={() => setConfirmDelete({ userId: s.user_id, pseudo: s.pseudo })}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-4 pt-3 overflow-x-auto border-b border-border/30">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setSelectedTab(tab.key)}
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold whitespace-nowrap transition-all border-b-2 -mb-px"
              style={selectedTab === tab.key
                ? { color: 'hsl(43 90% 62%)', borderColor: 'hsl(43 90% 52%)' }
                : { color: 'hsl(220 10% 45%)', borderColor: 'transparent' }
              }>
              {tab.icon}{tab.label}
              {tab.badge != null && tab.badge > 0 && (
                <span className="min-w-[16px] h-4 rounded-full text-[9px] px-1 flex items-center justify-center"
                  style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 60%)' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {/* ── Vue d'ensemble ── */}
          {selectedTab === 'overview' && (
            <>
              {/* Period selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl self-start"
                style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                {([
                  { key: 'global',  label: 'Global' },
                  { key: 'monthly', label: 'Mensuel' },
                  { key: 'weekly',  label: 'Hebdo' },
                ] as const).map(p => (
                  <button key={p.key} onClick={() => setStatPeriod(p.key)}
                    className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all"
                    style={statPeriod === p.key
                      ? { background: 'hsl(43 90% 50% / 0.18)', color: 'hsl(43 90% 65%)', border: '1px solid hsl(43 90% 50% / 0.3)' }
                      : { color: 'hsl(220 10% 45%)', border: '1px solid transparent' }
                    }>
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { label: periodStats.xpLabel,   value: periodStats.xp,     color: 'hsl(43 90% 55%)' },
                  { label: streakLive ? 'Streak' : 'Streak brisé',
                    value: `${s.streak}j`,
                    color: streakLive && s.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(220 10% 42%)' },
                  { label: periodStats.hoursLabel, value: periodStats.hours,  color: 'hsl(270 70% 65%)' },
                  { label: periodStats.questLabel, value: periodStats.quests,
                    color: periodStats.questRate >= 80 ? 'hsl(142 71% 45%)' : periodStats.questRate >= 50 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' },
                ].map(st => (
                  <div key={st.label} className="p-3 rounded-xl"
                    style={{
                      background: 'hsl(222 22% 9%)',
                      border: `1px solid ${!streakLive && st.label.startsWith('Streak') ? 'hsl(220 10% 22%)' : 'hsl(222 16% 16%)'}`,
                    }}>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 truncate">{st.label}</p>
                    <p className="font-display font-bold text-sm" style={{ color: st.color }}>{st.value}</p>
                    {!streakLive && st.label.startsWith('Streak') && streakDays !== null && streakDays > 1 && (
                      <p className="text-[9px] mt-0.5" style={{ color: 'hsl(220 10% 38%)' }}>
                        inactif depuis {streakDays}j
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                <OnlineDot lastSeenAt={s.last_seen_at} />
                <span className="text-xs text-muted-foreground">Dernière activité : <span className="text-foreground">{s.lastActive}</span></span>
              </div>

              {Object.keys(gradesBySubject).length > 0 && (
                <div className="p-3 rounded-xl" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Moyennes</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(gradesBySubject).map(([subj, grades]) => {
                      const avg   = Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10;
                      const color = avg >= 14 ? 'hsl(142 71% 45%)' : avg >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)';
                      return (
                        <div key={subj} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg"
                          style={{ background: 'hsl(222 22% 12%)', border: '1px solid hsl(222 16% 18%)' }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(var(${SUBJECT_CSS_VAR[subj as Subject] || '--muted'}))` }} />
                          {subj}
                          <span className="font-bold" style={{ color }}>{avg}/20</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <ActivityChart sessions={deepworkSessions.filter(sess => sess.user_id === s.user_id)} />
              <QuestsChart quests={data.quests} />
            </>
          )}

          {/* ── Planning & Quêtes ── */}
          {selectedTab === 'planning' && (() => {
            const upcoming = data.planning.filter(p => p.event_date >= todayStr && p.type !== 'course').slice(0, 30);
            const pendingQuests = data.quests.filter(q => !q.completed)
              .sort((a, b) => {
                if (a.deadline && b.deadline) return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                if (a.deadline) return -1;
                if (b.deadline) return 1;
                return 0;
              });
            const doneQuests = data.quests.filter(q => q.completed);

            // Group planning by day
            const byDay: Record<string, PlanningEvent[]> = {};
            upcoming.forEach(ev => { byDay[ev.event_date] = byDay[ev.event_date] || []; byDay[ev.event_date].push(ev); });

            const DIFF_COLOR: Record<string, string> = { easy: 'hsl(142 71% 45%)', medium: 'hsl(43 90% 52%)', hard: 'hsl(0 84% 60%)' };

            return (
              <>
                {/* EDT button */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Prochaines sessions</p>
                  <button onClick={() => setShowCalendar(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                    style={{ background: 'hsl(43 90% 50% / 0.1)', border: '1px solid hsl(43 90% 50% / 0.2)', color: 'hsl(43 90% 62%)' }}>
                    <CalendarDays size={12} /> Voir l'EDT complet
                  </button>
                </div>

                {/* Planning list */}
                {Object.keys(byDay).length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">Aucune session planifiée</p>
                ) : Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b)).map(([dateKey, evs]) => (
                  <div key={dateKey}>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground capitalize mb-1.5">
                      {new Date(dateKey + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      {dateKey === todayStr && <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>Aujourd'hui</span>}
                    </p>
                    <div className="space-y-1.5">
                      {evs.map(ev => {
                        const cfg = EVENT_STYLE[ev.type] ?? EVENT_STYLE.course;
                        const dur = (() => {
                          const sh = toDecHour(ev.start_time), eh = toDecHour(ev.end_time);
                          return Math.round((eh - sh) * 60);
                        })();
                        return (
                          <div key={ev.id} className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs"
                            style={{ background: 'hsl(222 22% 9%)', borderLeft: `3px solid ${cfg.color}`, border: `1px solid hsl(222 16% 16%)` }}>
                            <span className="font-bold shrink-0" style={{ color: cfg.color }}>{cfg.label}</span>
                            <span className="flex-1 truncate font-medium">{ev.title}</span>
                            {ev.source === 'ical' && (
                              <span className="text-[9px] px-1 py-0.5 rounded font-bold border"
                                style={{ color: 'hsl(210 70% 60%)', borderColor: 'hsl(210 70% 40% / 0.4)', background: 'hsl(210 70% 40% / 0.1)' }}>
                                iCal
                              </span>
                            )}
                            <span className="text-muted-foreground shrink-0">
                              {ev.start_time.slice(0,5)}–{ev.end_time.slice(0,5)}
                              {dur > 0 && ` · ${dur}min`}
                            </span>
                            {ev.validated && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Separator */}
                {data.quests.length > 0 && (
                  <div className="border-t border-border/40 pt-3 mt-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                      Quêtes assignées ({pendingQuests.length} actives · {doneQuests.length} terminées)
                    </p>

                    {pendingQuests.length === 0 && doneQuests.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">Aucune quête</p>
                    )}

                    {/* Active quests */}
                    <div className="space-y-1.5">
                      {pendingQuests.map(q => {
                        const daysOld    = Math.floor((now.getTime() - new Date(q.created_at).getTime()) / 86400000);
                        const weeksOld   = Math.floor(daysOld / 7);
                        const isOld      = daysOld >= 14;
                        const deadlineDays = q.deadline
                          ? Math.ceil((new Date(q.deadline).getTime() - now.getTime()) / 86400000)
                          : null;
                        const ageLabel   = weeksOld >= 2 ? `${weeksOld} semaines` : `${daysOld} jours`;
                        const waMsg      = isOld ? encodeURIComponent(
                          `Salut ${s.pseudo} ! La quête "${q.title}" est toujours en attente depuis ${ageLabel}. Tu as besoin d'aide pour la terminer ?`
                        ) : '';

                        return (
                          <div key={q.id} className="rounded-xl text-xs overflow-hidden"
                            style={{
                              background: isOld ? 'hsl(38 92% 55% / 0.06)' : 'hsl(270 50% 15% / 0.3)',
                              border:     isOld ? '1px solid hsl(38 92% 55% / 0.35)' : '1px solid hsl(270 60% 45% / 0.25)',
                            }}>
                            <div className="flex items-center gap-2.5 p-2.5">
                              <span className="font-bold shrink-0" style={{ color: isOld ? 'hsl(38 92% 65%)' : '#a78bfa' }}>
                                {isOld ? <AlarmClock size={11} /> : <Zap size={11} />}
                              </span>
                              <span className="flex-1 truncate">{q.title}</span>
                              <span className="text-muted-foreground shrink-0">{q.subject}</span>
                              <span className="font-bold text-[9px] px-1.5 py-0.5 rounded shrink-0"
                                style={{ color: DIFF_COLOR[q.difficulty] || DIFF_COLOR.medium, background: `${DIFF_COLOR[q.difficulty] || DIFF_COLOR.medium}20` }}>
                                {q.difficulty === 'easy' ? '★' : q.difficulty === 'medium' ? '★★' : '★★★'}
                              </span>
                              <span className="shrink-0" style={{ color: 'hsl(43 90% 55%)' }}>+{q.xp_reward} XP</span>
                              {deadlineDays !== null && (
                                <span className="text-[9px] shrink-0"
                                  style={{ color: deadlineDays < 0 ? 'hsl(0 84% 62%)' : 'hsl(220 10% 50%)' }}>
                                  {deadlineDays < 0 ? `+${Math.abs(deadlineDays)}j` : `J-${deadlineDays}`}
                                </span>
                              )}
                            </div>
                            {isOld && (
                              <div className="flex items-center gap-2 px-2.5 pb-2 border-t"
                                style={{ borderColor: 'hsl(38 92% 55% / 0.15)' }}>
                                <span className="text-[10px]" style={{ color: 'hsl(38 92% 60%)' }}>
                                  En attente depuis {ageLabel}
                                </span>
                                <a href={`https://wa.me/?text=${waMsg}`}
                                  target="_blank" rel="noopener noreferrer"
                                  className="ml-auto flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all hover:scale-105"
                                  style={{ background: 'hsl(142 71% 40% / 0.12)', border: '1px solid hsl(142 71% 40% / 0.3)', color: 'hsl(142 71% 62%)' }}>
                                  Relancer sur WhatsApp
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Done quests */}
                    {doneQuests.length > 0 && (
                      <div className="space-y-1.5 mt-2">
                        {doneQuests.map(q => (
                          <div key={q.id} className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs opacity-50"
                            style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                            <Check size={10} style={{ color: 'hsl(142 71% 50%)', flexShrink: 0 }} />
                            <span className="flex-1 line-through text-muted-foreground truncate">{q.title}</span>
                            <span style={{ color: 'hsl(43 90% 55%)' }}>+{q.xp_reward} XP</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })()}

          {/* ── Difficultés ── */}
          {selectedTab === 'diffs' && (
            data.diffs.length === 0
              ? <p className="text-xs text-muted-foreground text-center py-8">Aucune difficulté</p>
              : data.diffs.map(d => (
                <div key={d.id} className={`p-3.5 rounded-xl border text-xs ${d.resolved ? 'opacity-50' : ''}`}
                  style={{ background: 'hsl(222 22% 9%)', borderColor: d.severity === 'blocking' && !d.resolved ? 'hsl(0 84% 55% / 0.3)' : 'hsl(222 16% 16%)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject] || '--muted'}))` }} />
                    <span className="font-bold">{d.subject}</span>
                    <span className="font-bold" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                    <span className="text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    {d.resolved && <span style={{ color: 'hsl(142 71% 50%)' }}>✓ Résolu</span>}
                  </div>
                  <p className="text-foreground/90 mb-2">{d.description}</p>
                  {d.coach_reply && (
                    <div className="p-2 rounded-lg text-[11px]" style={{ background: 'hsl(43 90% 50% / 0.08)', border: '1px solid hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>
                      {d.coach_reply}
                    </div>
                  )}
                  {!d.resolved && !d.coach_reply && (
                    replyingTo === d.id ? (
                      <div className="space-y-1.5 mt-2">
                        <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse…" className="min-h-[36px] text-xs" />
                        <div className="flex gap-1.5">
                          <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)} className="h-7 text-[11px]">Annuler</Button>
                          <Button size="sm" onClick={() => handleReply(d.id)} className="h-7 text-[11px]">Envoyer</Button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }}
                        className="flex items-center gap-1 text-[11px] hover:underline mt-2" style={{ color: 'hsl(43 90% 55%)' }}>
                        <MessageCircle size={10} /> Répondre
                      </button>
                    )
                  )}
                </div>
              ))
          )}

          {/* ── DS — liste fusionnée (planning + exams, dédupliqué) ── */}
          {selectedTab === 'exams' && (() => {
            // Build a single merged list so the same DS never appears twice.
            // Strategy:
            //  1. Start with all exams (grade-tracking source).
            //  2. For each planning DS event, check if an exam already covers it
            //     (same subject, date within ±3 days). If yes → enrich the exam
            //     entry with planning time info. If no → add as a planning-only entry.
            // Result: one card per real DS, combining data from both sources.

            type MergedEntry = {
              key:        string;
              date:       string;          // YYYY-MM-DD (canonical sort key)
              subject:    string;
              startTime?: string;
              endTime?:   string;
              chapters?:  string | null;
              grade?:     number | null;
              gradeReceived?: boolean;
              photoUrl?:  string | null;
              examId?:    string;
            };

            const matched = new Set<string>(); // exam IDs already paired

            // Pass 1: exams enriched with planning time when a match exists
            const fromExams: MergedEntry[] = data.exams.map(e => {
              const pair = data.planning.find(p =>
                p.type === 'ds' &&
                p.subject?.toLowerCase() === e.subject.toLowerCase() &&
                Math.abs(
                  new Date(p.event_date + 'T12:00:00').getTime() -
                  new Date(e.exam_date  + 'T12:00:00').getTime()
                ) <= 3 * 86_400_000
              );
              if (pair) matched.add(pair.id);
              return {
                key:          e.id,
                date:         e.exam_date,
                subject:      e.subject,
                startTime:    pair?.start_time,
                endTime:      pair?.end_time,
                chapters:     e.chapters,
                grade:        e.grade,
                gradeReceived: e.grade_received,
                photoUrl:     e.photo_url,
                examId:       e.id,
              };
            });

            // Pass 2: planning-only DS events (no corresponding exam)
            const fromPlanning: MergedEntry[] = data.planning
              .filter(p => p.type === 'ds' && !matched.has(p.id))
              .map(p => ({
                key:       p.id,
                date:      p.event_date,
                subject:   p.subject ?? p.title,
                startTime: p.start_time,
                endTime:   p.end_time,
              }));

            const allEntries = [...fromExams, ...fromPlanning]
              .sort((a, b) => a.date.localeCompare(b.date));

            const upcoming = allEntries.filter(e => e.date >= todayStr);
            const past     = allEntries.filter(e => e.date <  todayStr);

            if (allEntries.length === 0) {
              return <p className="text-xs text-muted-foreground text-center py-8">Aucun DS déclaré</p>;
            }

            const DsCard = ({ entry, dimmed = false }: { entry: MergedEntry; dimmed?: boolean }) => {
              const daysUntil     = Math.ceil(
                (new Date(entry.date + 'T12:00:00').getTime() - now.getTime()) / 86_400_000
              );
              const isPast        = daysUntil < 0;
              const isMissing     = isPast && entry.grade == null && !entry.gradeReceived;
              const isOverdue2Wks = isPast && entry.grade == null && !entry.gradeReceived && daysUntil <= -14;
              const isUrgent      = !dimmed && !isPast && daysUntil <= 5;

              return (
                <div className={`p-3.5 rounded-xl border text-xs ${dimmed ? 'opacity-50' : ''}`}
                  style={{
                    background:  isUrgent ? 'hsl(0 84% 55% / 0.05)' : isOverdue2Wks ? 'hsl(38 92% 55% / 0.05)' : 'hsl(222 22% 9%)',
                    borderColor: isOverdue2Wks ? 'hsl(38 92% 55% / 0.55)'
                               : isMissing    ? 'hsl(38 92% 55% / 0.3)'
                               : isUrgent     ? 'hsl(0 84% 55% / 0.45)'
                               : 'hsl(222 16% 16%)',
                    boxShadow:   isUrgent ? '0 0 10px hsl(0 84% 55% / 0.08)'
                               : isOverdue2Wks ? '0 0 12px hsl(38 92% 55% / 0.12)' : 'none',
                  }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `hsl(var(${SUBJECT_CSS_VAR[entry.subject as Subject] || '--muted'}))` }} />
                    <span className="font-bold" style={{ color: isUrgent ? 'hsl(0 84% 72%)' : undefined }}>
                      {entry.subject}
                    </span>
                    <span className="text-muted-foreground ml-auto shrink-0">
                      {new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                      {entry.startTime && ` · ${entry.startTime.slice(0, 5)}${entry.endTime ? '–' + entry.endTime.slice(0, 5) : ''}`}
                    </span>
                    {!isPast && !dimmed && (
                      <span className="px-1.5 py-0.5 rounded font-bold text-[9px] shrink-0" style={{
                        background: isUrgent ? 'hsl(0 84% 55% / 0.15)' : 'hsl(222 22% 14%)',
                        color:      isUrgent ? 'hsl(0 84% 68%)'        : 'hsl(220 10% 55%)',
                        border:     isUrgent ? '1px solid hsl(0 84% 55% / 0.25)' : '1px solid transparent',
                      }}>
                        {daysUntil === 0 ? "Aujourd'hui !" : daysUntil === 1 ? 'Demain !' : `J-${daysUntil}`}
                      </span>
                    )}
                    {entry.grade != null && (
                      <span className="font-display font-bold shrink-0"
                        style={{ color: entry.grade >= 14 ? 'hsl(142 71% 50%)' : entry.grade >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' }}>
                        {entry.grade}/20
                      </span>
                    )}
                  </div>

                  {(entry.chapters || entry.photoUrl) && (
                    <div className="flex items-center gap-2 mt-1.5 text-muted-foreground">
                      {entry.chapters && <span>{entry.chapters}</span>}
                      {entry.photoUrl && (
                        <button onClick={() => setPreviewPhoto(entry.photoUrl!)}
                          className="flex items-center gap-1 ml-auto" style={{ color: 'hsl(43 90% 55%)' }}>
                          <ImageIcon size={10} /> Voir
                        </button>
                      )}
                    </div>
                  )}

                  {isOverdue2Wks && (() => {
                    const dateStr = new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
                    const waMsg   = encodeURIComponent(`Salut ${s.pseudo} ! Tu as eu ta note pour le DS de ${entry.subject} du ${dateStr} ? `);
                    return (
                      <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t" style={{ borderColor: 'hsl(38 92% 55% / 0.2)' }}>
                        <AlarmClock size={12} style={{ color: 'hsl(38 92% 65%)', flexShrink: 0 }} />
                        <span className="text-[11px] font-medium" style={{ color: 'hsl(38 92% 65%)' }}>Pas de note depuis +2 semaines</span>
                        <a href={`https://wa.me/?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                          style={{ background: 'hsl(142 71% 40% / 0.12)', border: '1px solid hsl(142 71% 40% / 0.35)', color: 'hsl(142 71% 62%)' }}>
                          Relancer sur WhatsApp
                        </a>
                      </div>
                    );
                  })()}
                </div>
              );
            };

            return (
              <>
                {upcoming.length === 0 && (
                  <p className="text-xs text-muted-foreground italic text-center py-2">Aucun DS à venir</p>
                )}
                {upcoming.map(e => <DsCard key={e.key} entry={e} />)}

                {past.length > 0 && (
                  <details className="group mt-1">
                    <summary className="cursor-pointer text-[10px] text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-1.5 select-none py-1">
                      <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                      {past.length} DS passé{past.length > 1 ? 's' : ''}
                    </summary>
                    <div className="space-y-1.5 mt-1.5">
                      {past.map(e => <DsCard key={e.key} entry={e} dimmed />)}
                    </div>
                  </details>
                )}
              </>
            );
          })()}

        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-border/60 px-4 py-2.5"
        style={{ backdropFilter: 'blur(20px) saturate(1.6)', background: 'hsl(222 22% 6% / 0.88)' }}>
        <div className="max-w-screen-2xl mx-auto flex items-center gap-3">
          <div className="stat-badge px-2.5 py-1 text-xs font-display font-black shrink-0"
            style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))', color: 'hsl(222 22% 8%)', boxShadow: '0 0 12px hsl(43 90% 50% / 0.45)' }}>
            ◈
          </div>
          <span className="font-display text-sm font-bold tracking-wide shrink-0 hidden sm:block" style={{ color: 'hsl(43 90% 60%)' }}>
            CENTRE DE COMMANDE
          </span>

          {/* Search */}
          <div className="flex-1 max-w-xs relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un élève…"
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 85%)' }} />
          </div>

          {/* KPIs */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            {[
              { v: students.length,           l: 'élèves',    c: 'hsl(210 70% 60%)' },
              { v: tutoredIds.size,            l: 'tutorés',   c: 'hsl(43 90% 55%)' },
              { v: onlineCount,               l: 'en ligne',  c: 'hsl(142 71% 55%)' },
              { v: totalUnresolvedDiffs,       l: 'diffs',     c: totalUnresolvedDiffs > 0 ? 'hsl(0 84% 60%)' : 'hsl(220 10% 45%)' },
              { v: totalMissingGrades,         l: 'notes mq.', c: totalMissingGrades > 0 ? 'hsl(0 84% 55%)' : 'hsl(220 10% 45%)' },
            ].map(k => (
              <span key={k.l} className="flex items-center gap-1">
                <span className="font-display font-black tabular-nums" style={{ color: k.c }}>{k.v}</span>
                <span className="text-muted-foreground">{k.l}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button onClick={() => setShowCreateCoach(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'hsl(222 22% 13%)', border: '1px solid hsl(280 60% 45% / 0.4)', color: 'hsl(280 70% 75%)' }}>
              <Shield size={12} /> Tuteur
            </button>
            <button onClick={signOut} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── SPLIT LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 53px)' }}>

        {/* LEFT: Student list */}
        <aside className="w-72 shrink-0 border-r border-border/50 flex flex-col overflow-hidden"
          style={{ background: 'hsl(222 22% 7%)' }}>
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">

            {filteredStudents.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">
                {search ? 'Aucun résultat' : 'Aucun élève'}
              </p>
            )}

            {/* Tutored section */}
            {tutoredStudents.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 px-2 py-1.5">
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'hsl(43 90% 55%)' }}>
                    ◆ Mes élèves ({tutoredStudents.length})
                  </span>
                </div>
                {tutoredStudents.map((s, i) => (
                  <motion.div key={s.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <StudentRow s={s} />
                  </motion.div>
                ))}
                {otherStudents.length > 0 && <div className="border-t border-border/30 my-2 mx-2" />}
              </>
            )}

            {/* Other students */}
            {otherStudents.length > 0 && (
              <>
                {tutoredStudents.length > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Autres élèves ({otherStudents.length})
                    </span>
                  </div>
                )}
                {otherStudents.map((s, i) => (
                  <motion.div key={s.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <StudentRow s={s} />
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </aside>

        {/* RIGHT: Detail */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedStudent ? (
              <motion.div key={selectedStudent.user_id}
                initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.15 }}
                className="h-full flex flex-col" style={{ background: 'hsl(222 22% 8%)' }}>
                <DetailPanel s={selectedStudent} />
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="stat-badge px-5 py-3 text-3xl font-display font-black opacity-20"
                  style={{ background: 'linear-gradient(135deg, hsl(43 90% 38% / 0.3), hsl(43 90% 58% / 0.1))', color: 'hsl(43 90% 50%)', border: '1px solid hsl(43 90% 50% / 0.1)' }}>
                  ◈
                </div>
                <p className="text-sm text-muted-foreground">Sélectionne un élève pour voir son dossier</p>
                {tutoredIds.size === 0 && students.length > 0 && (
                  <p className="text-xs text-muted-foreground/50 flex items-center gap-1 max-w-xs">
                    <Pin size={10} /> Clique sur l'icône pour marquer tes élèves tutorés — ils apparaîtront en surbrillance en haut de la liste
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ════════════ MODALS ════════════ */}

      {/* Full calendar */}
      {showCalendar && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10"
          style={{ background: 'hsl(222 22% 4% / 0.92)', backdropFilter: 'blur(12px)' }}
          onClick={() => setShowCalendar(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card border border-border rounded-2xl p-5 w-full max-w-4xl max-h-[88vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={selectedStudent.avatarUrl} alt={selectedStudent.pseudo} className="w-7 h-7 rounded-full" />
                <span className="font-display font-bold text-sm">Emploi du temps — {selectedStudent.pseudo}</span>
                <span className="text-[10px] text-muted-foreground">
                  (cours manuels + iCal + quêtes planifiées)
                </span>
              </div>
              <button onClick={() => setShowCalendar(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"><X size={15} /></button>
            </div>
            <WeekCalendar events={planningEvents.filter(p => p.user_id === selectedStudent.user_id)} />
          </motion.div>
        </div>
      )}

      {/* Create Coach */}
      {showCreateCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCreateCoach(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card rounded-2xl p-6 max-w-md w-full" style={{ border: '1px solid hsl(280 60% 45% / 0.3)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={15} style={{ color: 'hsl(280 70% 70%)' }} />
              <h2 className="font-display text-sm font-bold" style={{ color: 'hsl(280 70% 70%)' }}>Créer un tuteur</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Le compte est créé sans vous déconnecter. Le tuteur peut se connecter immédiatement.</p>
            <form onSubmit={handleCreateCoach} className="space-y-3">
              {[
                { l: 'Prénom / Nom', k: 'pseudo', t: 'text', ph: 'Ex: Marie D.' },
                { l: 'Email', k: 'email', t: 'email', ph: 'tuteur@exemple.com' },
                { l: 'Mot de passe temporaire', k: 'password', t: 'password', ph: 'Min. 6 caractères' },
              ].map(f => (
                <div key={f.k}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">{f.l}</label>
                  <input type={f.t} required placeholder={f.ph} minLength={f.k === 'password' ? 6 : undefined}
                    value={(newCoach as any)[f.k]} onChange={e => setNewCoach(p => ({ ...p, [f.k]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(280 40% 30% / 0.35)', color: 'hsl(220 10% 90%)' }} />
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowCreateCoach(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-1"
                  style={{ background: 'linear-gradient(135deg, hsl(280 50% 38%), hsl(280 60% 55%))', color: 'white' }}>
                  {creating && <Loader2 size={12} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Photo preview */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setPreviewPhoto(null)}>
          <div className="max-w-2xl max-h-[80vh] overflow-auto rounded-2xl border border-border" onClick={e => e.stopPropagation()}>
            <img src={previewPhoto} alt="Contrôle" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setConfirmDelete(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 max-w-sm w-full" style={{ border: '1px solid hsl(0 84% 55% / 0.35)' }}
            onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-sm font-bold mb-2" style={{ color: 'hsl(0 84% 65%)' }}>Supprimer l'élève</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Supprimer <strong className="text-foreground">{confirmDelete.pseudo}</strong> ? Toutes ses données seront supprimées définitivement.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
              <button onClick={() => handleDeleteStudent(confirmDelete.userId)} disabled={deletingStudent === confirmDelete.userId}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-1"
                style={{ background: 'hsl(0 84% 55%)', color: 'white' }}>
                {deletingStudent === confirmDelete.userId && <Loader2 size={12} className="animate-spin" />} Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
