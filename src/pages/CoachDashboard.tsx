import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Plus, UserPlus, Loader2, MessageCircle, X, Zap,
  Image as ImageIcon, Trash2, Check, Camera, Shield, BookOpen,
  Users, ChevronLeft, ChevronRight, Search, Pin, PinOff,
  LayoutGrid, CalendarDays,
} from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, AVATARS, Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

// ── types ────────────────────────────────────────────────────────────────────
interface StudentDifficulty {
  id: string; user_id: string; subject: string; severity: string;
  description: string; resolved: boolean; coach_reply: string | null; created_at: string;
}
interface StudentExam {
  id: string; user_id: string; subject: string; exam_date: string;
  chapters: string | null; stress_level: string; grade: number | null;
  photo_url?: string | null; grade_received: boolean;
}
interface StudentTask {
  id: string; user_id: string; description: string; subject: string;
  difficulty: string; xp_reward: number; completed: boolean;
  deadline: string | null; completed_at: string | null; created_at: string; priority: string;
}
interface PlanningEvent {
  id: string; user_id: string; subject: string;
  start_time: string; end_time: string; description: string | null; validated: boolean;
}
interface DailyTask {
  id: string; user_id: string; task_date: string; task_number: number;
  description: string; subject: string; completed: boolean; created_at: string; method: string;
}

// ── constants ────────────────────────────────────────────────────────────────
const PIN_KEY = 'coach_pinned_students';
const SEVERITY_LABELS: Record<string, { label: string; color: string }> = {
  blocking: { label: '🔴 Bloquant', color: 'hsl(0 84% 60%)' },
  fragile:  { label: '🟡 Fragile',  color: 'hsl(38 92% 55%)' },
  ok:       { label: '🟢 Gérable',  color: 'hsl(142 71% 45%)' },
};
const STRESS_LABELS: Record<string, string> = {
  stressed: '😰 Stressé', neutral: '😐 Neutre', calm: '😊 Serein',
};
const PRIORITY_COLORS: Record<string, string> = {
  high: 'hsl(0 84% 60%)', medium: 'hsl(38 92% 55%)', low: 'hsl(142 71% 45%)',
};

// ── subject color helper ─────────────────────────────────────────────────────
const SUBJECT_HEX: Record<string, string> = {
  Maths: '#6366f1', Physique: '#06b6d4', 'Chimie': '#8b5cf6',
  SVT: '#22c55e', Histoire: '#f59e0b', Géographie: '#84cc16',
  Français: '#ec4899', Anglais: '#3b82f6', Philosophie: '#a78bfa',
  SES: '#f97316', NSI: '#14b8a6', default: '#6b7280',
};
function subjectColor(subject: string): string {
  return SUBJECT_HEX[subject] || SUBJECT_HEX.default;
}

// ── mini helpers ─────────────────────────────────────────────────────────────
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
      <span style={{
        display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
        background: online ? 'hsl(142 71% 50%)' : 'hsl(220 10% 35%)',
        boxShadow: online ? '0 0 5px hsl(142 71% 50%)' : 'none',
      }} />
      <span style={{ color: online ? 'hsl(142 71% 55%)' : 'hsl(220 10% 50%)' }}>{label}</span>
    </span>
  );
}

function SubjectPill({ subject }: { subject: string }) {
  const color = subjectColor(subject);
  return (
    <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium"
      style={{ background: `${color}20`, color, border: `1px solid ${color}35` }}>
      {subject}
    </span>
  );
}

// ── weekly calendar ──────────────────────────────────────────────────────────
const HOUR_START = 7;  // 7am
const HOUR_END   = 22; // 10pm
const HOUR_PX    = 44; // px per hour

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
    }),
  [monday]);

  const hours = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);
  const gridH = hours.length * HOUR_PX;

  const weekLabel = `${days[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} — ${days[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const weekEvents = useMemo(() =>
    events.filter(e => {
      const start = new Date(e.start_time);
      start.setHours(0, 0, 0, 0);
      return start >= days[0] && start <= days[6];
    }),
  [events, days]);

  function eventForDay(day: Date) {
    return weekEvents.filter(e => {
      const d = new Date(e.start_time);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === day.getTime();
    });
  }

  function eventStyle(e: PlanningEvent): React.CSSProperties {
    const start   = new Date(e.start_time);
    const end     = new Date(e.end_time);
    const topMin  = (start.getHours() - HOUR_START) * 60 + start.getMinutes();
    const durMin  = (end.getTime() - start.getTime()) / 60000;
    const color   = subjectColor(e.subject);
    return {
      position: 'absolute',
      top:    `${(topMin / 60) * HOUR_PX}px`,
      height: `${Math.max((durMin / 60) * HOUR_PX, 20)}px`,
      left: '2px', right: '2px',
      background: `${color}20`,
      border:     `1px solid ${color}55`,
      borderLeft: `3px solid ${color}`,
      borderRadius: '4px',
      padding: '2px 4px',
      overflow: 'hidden',
    };
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Week nav */}
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
      <div className="grid gap-0" style={{ gridTemplateColumns: '36px repeat(7, 1fr)' }}>
        <div />
        {days.map((d, i) => {
          const isToday = d.getTime() === today.getTime();
          return (
            <div key={i} className="text-center pb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                {d.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </span>
              <span
                className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mx-auto`}
                style={isToday ? { background: 'hsl(43 90% 52%)', color: 'hsl(222 22% 8%)' } : { color: 'hsl(220 10% 70%)' }}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="overflow-y-auto rounded-xl border border-border/40" style={{ maxHeight: 480 }}>
        <div className="grid gap-0 relative" style={{ gridTemplateColumns: '36px repeat(7, 1fr)', minHeight: `${gridH}px` }}>
          {/* Hour labels column */}
          <div className="relative">
            {hours.map(h => (
              <div key={h} style={{ height: HOUR_PX, position: 'absolute', top: `${(h - HOUR_START) * HOUR_PX}px`, width: '100%' }}
                className="flex items-start justify-end pr-1.5 pt-0.5">
                <span className="text-[9px] text-muted-foreground">{h}h</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d, di) => {
            const isToday = d.getTime() === today.getTime();
            const dayEvs = eventForDay(d);
            return (
              <div
                key={di}
                className="relative border-l border-border/20"
                style={{ height: `${gridH}px`, background: isToday ? 'hsl(43 90% 50% / 0.03)' : 'transparent' }}
              >
                {/* Hour lines */}
                {hours.map(h => (
                  <div key={h} style={{ position: 'absolute', top: `${(h - HOUR_START) * HOUR_PX}px`, left: 0, right: 0, height: 1, background: 'hsl(222 16% 16%)' }} />
                ))}
                {/* Events */}
                {dayEvs.map(e => {
                  const start = new Date(e.start_time);
                  const end   = new Date(e.end_time);
                  const dur   = Math.round((end.getTime() - start.getTime()) / 60000);
                  return (
                    <div key={e.id} style={eventStyle(e)}>
                      <span className="text-[9px] font-bold block leading-none truncate" style={{ color: subjectColor(e.subject) }}>{e.subject}</span>
                      {dur >= 30 && (
                        <span className="text-[8px] text-muted-foreground block">
                          {start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}–{end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
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

// ── main ─────────────────────────────────────────────────────────────────────
export default function CoachDashboard() {
  const { signOut } = useAuth();

  type EnrichedStudent = Profile & {
    completionRate: number; totalHours: number; lastActive: string;
    last_seen_at: string | null; class_level: string | null; avatarUrl: string;
  };

  // ── state ──
  const [students,      setStudents]      = useState<EnrichedStudent[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [difficulties,  setDifficulties]  = useState<StudentDifficulty[]>([]);
  const [exams,         setExams]         = useState<StudentExam[]>([]);
  const [studentTasks,  setStudentTasks]  = useState<StudentTask[]>([]);
  const [dailyTasks,    setDailyTasks]    = useState<DailyTask[]>([]);
  const [planningEvents, setPlanningEvents] = useState<PlanningEvent[]>([]);
  const [baselines,     setBaselines]     = useState<Record<string, boolean>>({});
  const [questStudents, setQuestStudents] = useState<Profile[]>([]);

  // UI state
  const [selectedId,     setSelectedId]     = useState<string | null>(null);
  const [selectedTab,    setSelectedTab]    = useState('overview');
  const [search,         setSearch]         = useState('');
  const [pinnedIds,      setPinnedIds]      = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(PIN_KEY) || '[]')); }
    catch { return new Set(); }
  });
  const [showCalendar,   setShowCalendar]   = useState(false);

  // Modals
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showCreateCoach,   setShowCreateCoach]   = useState(false);
  const [showCreateQuest,   setShowCreateQuest]   = useState(false);
  const [newStudent,  setNewStudent]  = useState({ pseudo: '', email: '', password: '', avatar: '🐺', class_level: '' });
  const [newCoach,    setNewCoach]    = useState({ pseudo: '', email: '', password: '' });
  const [newQuest,    setNewQuest]    = useState({ title: '', description: '', subject: 'Maths' as string, difficulty: 'medium' as string, xp_reward: 100, deadline: '', assigned_to: '' });
  const [creating,    setCreating]    = useState(false);

  const [replyingTo,     setReplyingTo]     = useState<string | null>(null);
  const [replyText,      setReplyText]      = useState('');
  const [previewPhoto,   setPreviewPhoto]   = useState<string | null>(null);
  const [confirmDelete,  setConfirmDelete]  = useState<{ userId: string; pseudo: string } | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<string | null>(null);
  const [quickQuestFor,  setQuickQuestFor]  = useState<{ diffId: string; userId: string; subject: string } | null>(null);
  const [quickQuestTitle, setQuickQuestTitle] = useState('');

  // ── pin persistence ──
  const togglePin = useCallback((uid: string) => {
    setPinnedIds(prev => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid); else next.add(uid);
      localStorage.setItem(PIN_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  // ── data ──
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
      supabase.from('quests').select('*'),
      supabase.from('timer_sessions').select('user_id, duration_minutes'),
      supabase.from('avatar_configs').select('*'),
    ]);

    if (!profiles || !roles) { setLoading(false); return; }

    const studentIds   = roles.filter(r => r.role === 'student').map(r => r.user_id);
    const studentProfs = profiles.filter(p => studentIds.includes(p.user_id));
    const profileMap   = Object.fromEntries(studentProfs.map(p => [p.user_id, p]));
    const lastSeenMap  = Object.fromEntries((privateRows ?? []).map(r => [r.user_id, r.last_seen_at]));

    const cfgMap: Record<string, AvatarConfig> = {};
    (avatarCfgs ?? []).forEach((c: any) => { cfgMap[c.user_id] = c as AvatarConfig; });

    const [
      { data: diffs },
      { data: examsData },
      { data: tasksData },
      { data: dailyData },
      { data: planningData },
      { data: blData },
    ] = await Promise.all([
      supabase.from('difficulties').select('*').order('created_at', { ascending: false }),
      supabase.from('exams').select('*').order('exam_date', { ascending: true }),
      supabase.from('student_tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('daily_tasks').select('*').order('task_date', { ascending: false }).limit(200),
      supabase.from('planning_events').select('*').order('start_time', { ascending: true }),
      supabase.from('student_baselines').select('user_id'),
    ]);

    if (diffs)        setDifficulties(diffs as StudentDifficulty[]);
    if (examsData)    setExams(examsData.map(e => ({ ...e, photo_url: (e as any).photo_url, grade_received: (e as any).grade_received ?? false })) as StudentExam[]);
    if (tasksData)    setStudentTasks(tasksData as StudentTask[]);
    if (dailyData)    setDailyTasks(dailyData as DailyTask[]);
    if (planningData) setPlanningEvents(planningData as PlanningEvent[]);
    if (blData)       setBaselines(Object.fromEntries((blData as any[]).map((b: any) => [b.user_id, true])));

    const enriched: EnrichedStudent[] = studentProfs.map(p => {
      const userQuests     = (allQuests  || []).filter(q => q.assigned_to === p.user_id);
      const completed      = userQuests.filter(q => q.completed).length;
      const completionRate = userQuests.length > 0 ? Math.round((completed / userQuests.length) * 100) : 100;
      const totalMinutes   = (allSessions || []).filter(s => s.user_id === p.user_id).reduce((a, s) => a + s.duration_minutes, 0);
      const totalHours     = Math.round(totalMinutes / 60);
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

    setStudents(enriched);
    setQuestStudents(studentProfs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const ch = supabase.channel('coach-rt2')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' },        () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' },          () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'timer_sessions' },  () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties' },    () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' },           () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'student_tasks' },   () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_tasks' },     () => loadData())
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

  const handleQuickQuest = async () => {
    if (!quickQuestFor || !quickQuestTitle.trim()) return;
    setCreating(true);
    await supabase.from('quests').insert({
      assigned_to: quickQuestFor.userId,
      title: quickQuestTitle.trim(),
      subject: quickQuestFor.subject as Database['public']['Enums']['subject_type'],
      difficulty: 'medium' as Database['public']['Enums']['difficulty_level'],
      xp_reward: 100,
    });
    setQuickQuestFor(null); setQuickQuestTitle(''); setCreating(false); loadData();
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true);
    const { data, error } = await supabase.auth.signUp({
      email: newStudent.email, password: newStudent.password,
      options: { data: { pseudo: newStudent.pseudo, avatar: newStudent.avatar } },
    });
    if (error || !data.user) { alert('Erreur: ' + (error?.message || 'Impossible de créer le compte')); setCreating(false); return; }
    await supabase.from('user_roles').insert({ user_id: data.user.id, role: 'student' as Database['public']['Enums']['app_role'] });
    setNewStudent({ pseudo: '', email: '', password: '', avatar: '🐺', class_level: '' });
    setShowCreateStudent(false); setCreating(false); loadData();
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

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true);
    const targets = newQuest.assigned_to === 'all' ? questStudents.map(s => s.user_id) : [newQuest.assigned_to];
    for (const uid of targets) {
      await supabase.from('quests').insert({
        assigned_to: uid, title: newQuest.title, description: newQuest.description || null,
        subject: newQuest.subject as Database['public']['Enums']['subject_type'],
        difficulty: newQuest.difficulty as Database['public']['Enums']['difficulty_level'],
        xp_reward: newQuest.xp_reward, deadline: newQuest.deadline || null,
      });
    }
    setNewQuest({ title: '', description: '', subject: 'Maths', difficulty: 'medium', xp_reward: 100, deadline: '', assigned_to: '' });
    setShowCreateQuest(false); setCreating(false); loadData();
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
    const s = students.find(x => x.user_id === uid);
    if (!s) return;
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
  const now       = new Date();
  const todayStr  = now.toISOString().split('T')[0];

  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return students;
    return students.filter(s => s.pseudo.toLowerCase().includes(q));
  }, [students, search]);

  const pinnedStudents  = filteredStudents.filter(s => pinnedIds.has(s.user_id));
  const regularStudents = filteredStudents.filter(s => !pinnedIds.has(s.user_id));
  const selectedStudent = students.find(s => s.user_id === selectedId) ?? null;

  const totalUnresolvedDiffs  = difficulties.filter(d => !d.resolved).length;
  const totalUpcomingExams    = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null).length;
  const totalMissingGrades    = exams.filter(e => new Date(e.exam_date) < now && e.grade === null && !(e as any).grade_received).length;
  const onlineCount           = students.filter(s => s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000).length;

  // Per-student derived
  const sd = (uid: string) => ({
    diffs:    difficulties.filter(d => d.user_id === uid),
    exams:    exams.filter(e => e.user_id === uid),
    tasks:    studentTasks.filter(t => t.user_id === uid),
    daily:    dailyTasks.filter(t => t.user_id === uid && t.task_date === todayStr),
    planning: planningEvents.filter(p => p.user_id === uid),
    grades:   exams.filter(e => e.user_id === uid && e.grade !== null),
  });

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

  // ── render student row in the left list ──
  const StudentRow = ({ s }: { s: EnrichedStudent }) => {
    const isSelected = selectedId === s.user_id;
    const isPinned   = pinnedIds.has(s.user_id);
    const { diffs }  = sd(s.user_id);
    const unresolved = diffs.filter(d => !d.resolved).length;
    const { level }  = calculateLevel(s.total_xp);

    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer group transition-all"
        style={{
          background: isSelected ? 'hsl(43 90% 50% / 0.1)' : 'transparent',
          border: `1px solid ${isSelected ? 'hsl(43 90% 50% / 0.3)' : 'transparent'}`,
        }}
        onClick={() => { setSelectedId(s.user_id); setSelectedTab('overview'); }}
        whileHover={{ x: 2 }}
      >
        {/* Avatar + online dot */}
        <div className="relative shrink-0">
          <img src={s.avatarUrl} alt={s.pseudo}
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: `2px solid ${isSelected ? 'hsl(43 90% 50% / 0.5)' : 'hsl(222 16% 22%)'}` }}
          />
          {s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000 && (
            <span className="absolute -bottom-0.5 -right-0.5 block w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'hsl(142 71% 50%)', borderColor: 'hsl(222 22% 8%)', boxShadow: '0 0 5px hsl(142 71% 50%)' }} />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium truncate">{s.pseudo}</span>
            {s.class_level && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0"
                style={{ background: 'hsl(43 90% 50% / 0.1)', color: 'hsl(43 90% 60%)' }}>
                {s.class_level}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-muted-foreground">Lv.{level}</span>
            <span className="text-[10px]" style={{ color: s.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(0 84% 55%)' }}>🔥{s.streak}</span>
            <OnlineDot lastSeenAt={s.last_seen_at} />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {unresolved > 0 && (
            <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
              style={{ background: 'hsl(0 84% 55% / 0.15)', color: 'hsl(0 84% 65%)' }}>
              {unresolved}
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); togglePin(s.user_id); }}
            className="p-1 rounded opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            style={{ color: isPinned ? 'hsl(43 90% 55%)' : 'hsl(220 10% 45%)' }}
            title={isPinned ? 'Désépingler' : 'Épingler'}
          >
            {isPinned ? <PinOff size={11} /> : <Pin size={11} />}
          </button>
        </div>
      </motion.div>
    );
  };

  // ── render student detail right panel ──
  const DetailPanel = ({ s }: { s: EnrichedStudent }) => {
    const { level }  = calculateLevel(s.total_xp);
    const title      = getTitleForLevel(level);
    const data       = sd(s.user_id);
    const gradesBySubject: Record<string, number[]> = {};
    data.grades.forEach(e => { gradesBySubject[e.subject] = gradesBySubject[e.subject] || []; gradesBySubject[e.subject].push(e.grade!); });

    const TABS = [
      { key: 'overview', label: '📊 Vue d\'ensemble' },
      { key: 'planning', label: '📅 Planning', badge: data.planning.filter(p => new Date(p.start_time) >= now).length },
      { key: 'diffs',    label: '⚠️ Difficultés', badge: data.diffs.filter(d => !d.resolved).length },
      { key: 'exams',    label: '📝 DS', badge: data.exams.filter(e => new Date(e.exam_date) >= now).length },
      { key: 'tasks',    label: '✏️ Tâches', badge: data.tasks.filter(t => !t.completed).length },
    ];

    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 p-5 border-b border-border/50">
          <div className="relative">
            <img src={s.avatarUrl} alt={s.pseudo} className="w-14 h-14 rounded-full object-cover"
              style={{ border: '2px solid hsl(43 90% 50% / 0.4)' }} />
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
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePin(s.user_id)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ color: pinnedIds.has(s.user_id) ? 'hsl(43 90% 55%)' : 'hsl(220 10% 45%)', background: pinnedIds.has(s.user_id) ? 'hsl(43 90% 50% / 0.1)' : 'transparent' }}
              title={pinnedIds.has(s.user_id) ? 'Désépingler' : 'Épingler'}
            >
              {pinnedIds.has(s.user_id) ? <PinOff size={15} /> : <Pin size={15} />}
            </button>
            {!baselines[s.user_id] ? (
              <button onClick={() => handleCreateBaseline(s.user_id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                style={{ background: 'hsl(222 22% 12%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 65%)' }}>
                <Camera size={11} /> Snapshot
              </button>
            ) : (
              <span className="text-xs flex items-center gap-1" style={{ color: 'hsl(142 71% 50%)' }}>
                <Check size={11} /> Snapshot
              </span>
            )}
            <button
              onClick={() => setConfirmDelete({ userId: s.user_id, pseudo: s.pseudo })}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 px-4 pt-3 pb-0 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setSelectedTab(tab.key)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-t-lg text-[11px] font-bold whitespace-nowrap transition-all border-b-2"
              style={selectedTab === tab.key
                ? { color: 'hsl(43 90% 62%)', borderColor: 'hsl(43 90% 52%)', background: 'hsl(43 90% 50% / 0.07)' }
                : { color: 'hsl(220 10% 45%)', borderColor: 'transparent' }
              }
            >
              {tab.label}
              {tab.badge != null && tab.badge > 0 && (
                <span className="min-w-[16px] h-4 rounded-full text-[9px] px-1 flex items-center justify-center"
                  style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 60%)' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {/* ── Vue d'ensemble ── */}
          {selectedTab === 'overview' && (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { label: 'XP total',    value: s.total_xp.toLocaleString('fr-FR'),     color: 'hsl(43 90% 55%)' },
                  { label: 'Streak',      value: `🔥 ${s.streak} jours`,                 color: s.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(0 84% 60%)' },
                  { label: 'Heures',      value: `${s.totalHours}h travaillées`,          color: 'hsl(270 70% 65%)' },
                  { label: 'Complétion',  value: `${s.completionRate}%`,                 color: s.completionRate >= 80 ? 'hsl(142 71% 45%)' : s.completionRate >= 50 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' },
                ].map(st => (
                  <div key={st.label} className="p-3 rounded-xl" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{st.label}</p>
                    <p className="font-display font-bold text-sm" style={{ color: st.color }}>{st.value}</p>
                  </div>
                ))}
              </div>

              {/* Dernière présence */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                <OnlineDot lastSeenAt={s.last_seen_at} />
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">Dernière activité : <span className="text-foreground">{s.lastActive}</span></span>
              </div>

              {/* Moyennes par matière */}
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
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: subjectColor(subj) }} />
                          {subj}
                          <span className="font-bold" style={{ color }}>{avg}/20</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tâches du jour */}
              {data.daily.length > 0 && (
                <div className="p-3 rounded-xl" style={{ background: 'hsl(222 22% 9%)', border: '1px solid hsl(222 16% 16%)' }}>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                    Tâches d'aujourd'hui ({data.daily.filter(t => t.completed).length}/{data.daily.length})
                  </p>
                  <div className="space-y-1.5">
                    {data.daily.sort((a, b) => a.task_number - b.task_number).map(t => (
                      <div key={t.id} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${t.completed ? 'opacity-50' : ''}`}
                        style={{ background: 'hsl(222 22% 12%)' }}>
                        <span className="w-4 text-center font-bold" style={{ color: t.completed ? 'hsl(142 71% 50%)' : 'hsl(220 10% 45%)' }}>
                          {t.completed ? '✓' : t.task_number}
                        </span>
                        <span className={`flex-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</span>
                        <SubjectPill subject={t.subject} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Planning ── */}
          {selectedTab === 'planning' && (
            <>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Emploi du temps</p>
                <button
                  onClick={() => setShowCalendar(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                  style={{ background: 'hsl(43 90% 50% / 0.1)', border: '1px solid hsl(43 90% 50% / 0.2)', color: 'hsl(43 90% 62%)' }}
                >
                  <CalendarDays size={12} /> Voir l'EDT complet
                </button>
              </div>

              {/* Next 7 days compact list */}
              {(() => {
                const upcoming = data.planning
                  .filter(p => new Date(p.start_time) >= now)
                  .slice(0, 20);
                if (upcoming.length === 0) return (
                  <p className="text-xs text-muted-foreground text-center py-8">Aucune session planifiée 📅</p>
                );
                // Group by day
                const byDay: Record<string, PlanningEvent[]> = {};
                upcoming.forEach(ev => {
                  const day = new Date(ev.start_time).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
                  byDay[day] = byDay[day] || []; byDay[day].push(ev);
                });
                return Object.entries(byDay).map(([day, evs]) => (
                  <div key={day}>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground capitalize mb-1.5 mt-3 first:mt-0">{day}</p>
                    <div className="space-y-1.5">
                      {evs.map(ev => {
                        const start = new Date(ev.start_time);
                        const end   = new Date(ev.end_time);
                        const dur   = Math.round((end.getTime() - start.getTime()) / 60000);
                        const color = subjectColor(ev.subject);
                        return (
                          <div key={ev.id} className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs"
                            style={{ background: 'hsl(222 22% 9%)', borderLeft: `3px solid ${color}`, border: `1px solid hsl(222 16% 16%)` }}>
                            <span className="font-bold" style={{ color }}>{ev.subject}</span>
                            <span className="text-muted-foreground">
                              {start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}–{end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="ml-auto text-muted-foreground">{dur}min</span>
                            {ev.validated && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </>
          )}

          {/* ── Difficultés ── */}
          {selectedTab === 'diffs' && (
            data.diffs.length === 0
              ? <p className="text-xs text-muted-foreground text-center py-8">Aucune difficulté 🎉</p>
              : data.diffs.map(d => (
                <div key={d.id} className={`p-3.5 rounded-xl border text-xs ${d.resolved ? 'opacity-50' : ''}`}
                  style={{ background: 'hsl(222 22% 9%)', borderColor: d.severity === 'blocking' && !d.resolved ? 'hsl(0 84% 55% / 0.3)' : 'hsl(222 16% 16%)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: subjectColor(d.subject) }} />
                    <span className="font-bold">{d.subject}</span>
                    <span className="font-bold" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                    <span className="text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                    {d.resolved && <span style={{ color: 'hsl(142 71% 50%)' }}>✓ Résolu</span>}
                  </div>
                  <p className="text-foreground/90 mb-2">{d.description}</p>
                  {d.coach_reply && (
                    <div className="p-2 rounded-lg text-[11px]" style={{ background: 'hsl(43 90% 50% / 0.08)', border: '1px solid hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>
                      💬 {d.coach_reply}
                    </div>
                  )}
                  {!d.resolved && !d.coach_reply && (
                    replyingTo === d.id ? (
                      <div className="space-y-1.5 mt-2">
                        <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse..." className="min-h-[36px] text-xs" />
                        <div className="flex gap-1.5">
                          <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)} className="h-7 text-[11px]">Annuler</Button>
                          <Button size="sm" onClick={() => handleReply(d.id)} className="h-7 text-[11px]">Envoyer</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }}
                          className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: 'hsl(43 90% 55%)' }}>
                          <MessageCircle size={10} /> Répondre
                        </button>
                        <button onClick={() => { setQuickQuestFor({ diffId: d.id, userId: d.user_id, subject: d.subject }); setQuickQuestTitle(''); }}
                          className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: 'hsl(270 70% 65%)' }}>
                          <Zap size={10} /> Créer une quête
                        </button>
                      </div>
                    )
                  )}
                </div>
              ))
          )}

          {/* ── DS ── */}
          {selectedTab === 'exams' && (
            data.exams.length === 0
              ? <p className="text-xs text-muted-foreground text-center py-8">Aucun DS déclaré 📝</p>
              : data.exams.map(e => {
                const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / 86400000);
                const isPast    = daysUntil < 0;
                const isMissing = isPast && e.grade === null && !e.grade_received;
                return (
                  <div key={e.id} className={`p-3.5 rounded-xl border text-xs ${isPast && !isMissing ? 'opacity-55' : ''}`}
                    style={{ background: 'hsl(222 22% 9%)', borderColor: isMissing ? 'hsl(38 92% 55% / 0.3)' : !isPast && daysUntil <= 7 ? 'hsl(0 84% 55% / 0.25)' : 'hsl(222 16% 16%)' }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: subjectColor(e.subject) }} />
                      <span className="font-bold">{e.subject}</span>
                      <span className="text-muted-foreground ml-auto">{new Date(e.exam_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                      {!isPast && <span className="px-1.5 py-0.5 rounded font-bold" style={{ background: daysUntil <= 3 ? 'hsl(0 84% 55% / 0.12)' : 'hsl(222 22% 14%)', color: daysUntil <= 3 ? 'hsl(0 84% 65%)' : 'hsl(220 10% 55%)' }}>
                        {daysUntil === 0 ? "Aujourd'hui" : `J-${daysUntil}`}
                      </span>}
                      {e.grade !== null && <span className="font-display font-bold" style={{ color: e.grade >= 14 ? 'hsl(142 71% 50%)' : e.grade >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' }}>{e.grade}/20</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-muted-foreground">
                      <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                      {e.chapters && <span>· {e.chapters}</span>}
                      {e.photo_url && (
                        <button onClick={() => setPreviewPhoto(e.photo_url!)} className="flex items-center gap-1 ml-auto" style={{ color: 'hsl(43 90% 55%)' }}>
                          <ImageIcon size={10} /> Voir
                        </button>
                      )}
                      {isPast && e.grade === null && (
                        <label className="flex items-center gap-1.5 ml-auto cursor-pointer hover:text-foreground transition-colors">
                          <input type="checkbox" checked={e.grade_received} onChange={ev => handleMarkGradeReceived(e.id, ev.target.checked)} className="w-3 h-3 accent-primary" />
                          Résultat donné
                        </label>
                      )}
                    </div>
                  </div>
                );
              })
          )}

          {/* ── Tâches ── */}
          {selectedTab === 'tasks' && (
            data.tasks.length === 0
              ? <p className="text-xs text-muted-foreground text-center py-8">Aucune tâche perso ✏️</p>
              : data.tasks.map(t => (
                <div key={t.id} className={`p-3.5 rounded-xl border text-xs ${t.completed ? 'opacity-50' : ''}`}
                  style={{ background: 'hsl(222 22% 9%)', borderColor: 'hsl(222 16% 16%)' }}>
                  <div className="flex items-center gap-2">
                    {t.completed && <Check size={11} style={{ color: 'hsl(142 71% 50%)' }} />}
                    <span className={`flex-1 ${t.completed ? 'line-through text-muted-foreground' : 'text-foreground/90'}`}>{t.description}</span>
                    <SubjectPill subject={t.subject} />
                    <span style={{ color: 'hsl(43 90% 55%)' }}>+{t.xp_reward} XP</span>
                  </div>
                  {t.deadline && <p className="text-muted-foreground mt-1">Échéance : {new Date(t.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>}
                </div>
              ))
          )}

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
          {/* Logo */}
          <div className="stat-badge px-2.5 py-1 text-xs font-display font-black shrink-0"
            style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))', color: 'hsl(222 22% 8%)', boxShadow: '0 0 12px hsl(43 90% 50% / 0.45)' }}>
            ◈
          </div>
          <span className="font-display text-sm font-bold tracking-wide shrink-0 hidden sm:block" style={{ color: 'hsl(43 90% 60%)' }}>
            COMMANDE
          </span>

          {/* Search */}
          <div className="flex-1 max-w-xs relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un élève…"
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 85%)' }}
            />
          </div>

          {/* KPIs compact */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            {[
              { v: students.length,       l: 'élèves',  c: 'hsl(210 70% 60%)' },
              { v: onlineCount,           l: 'en ligne', c: 'hsl(142 71% 55%)' },
              { v: totalUnresolvedDiffs,  l: 'diffs',   c: totalUnresolvedDiffs > 0 ? 'hsl(0 84% 60%)' : 'hsl(220 10% 45%)' },
              { v: totalUpcomingExams,    l: 'DS',      c: 'hsl(43 90% 52%)' },
              { v: totalMissingGrades,    l: 'notes mq.', c: totalMissingGrades > 0 ? 'hsl(0 84% 55%)' : 'hsl(220 10% 45%)' },
            ].map(k => (
              <span key={k.l} className="flex items-center gap-1">
                <span className="font-display font-black tabular-nums" style={{ color: k.c }}>{k.v}</span>
                <span className="text-muted-foreground">{k.l}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            <button onClick={() => setShowCreateStudent(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'hsl(222 22% 13%)', border: '1px solid hsl(222 16% 22%)', color: 'hsl(220 10% 75%)' }}>
              <UserPlus size={12} /> Élève
            </button>
            <button onClick={() => setShowCreateCoach(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'hsl(222 22% 13%)', border: '1px solid hsl(280 60% 45% / 0.4)', color: 'hsl(280 70% 75%)' }}>
              <Shield size={12} /> Tuteur
            </button>
            <button onClick={() => setShowCreateQuest(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)', boxShadow: '0 0 8px hsl(43 90% 50% / 0.3)' }}>
              <Plus size={12} /> Quête
            </button>
            <button onClick={signOut} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 53px)' }}>

        {/* LEFT: Student list */}
        <aside className="w-72 shrink-0 border-r border-border/50 flex flex-col overflow-hidden"
          style={{ background: 'hsl(222 22% 7%)' }}>
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">

            {filteredStudents.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">
                {search ? 'Aucun résultat' : 'Aucun élève'}
              </p>
            )}

            {/* Pinned */}
            {pinnedStudents.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 px-2 py-1">
                  <Pin size={10} style={{ color: 'hsl(43 90% 52%)' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'hsl(43 90% 52%)' }}>
                    Épinglés ({pinnedStudents.length})
                  </span>
                </div>
                {pinnedStudents.map((s, i) => (
                  <motion.div key={s.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <StudentRow s={s} />
                  </motion.div>
                ))}
                {regularStudents.length > 0 && (
                  <div className="border-t border-border/30 my-2 mx-2" />
                )}
              </>
            )}

            {/* All / remaining */}
            {regularStudents.length > 0 && (
              <>
                {pinnedStudents.length > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-1">
                    <Users size={10} className="text-muted-foreground" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tous ({regularStudents.length})
                    </span>
                  </div>
                )}
                {regularStudents.map((s, i) => (
                  <motion.div key={s.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <StudentRow s={s} />
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </aside>

        {/* RIGHT: Detail panel */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedStudent ? (
              <motion.div
                key={selectedStudent.user_id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.18 }}
                className="h-full flex flex-col"
                style={{ background: 'hsl(222 22% 8%)' }}
              >
                <DetailPanel s={selectedStudent} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center gap-4"
              >
                <div className="stat-badge px-4 py-3 text-2xl font-display font-black"
                  style={{ background: 'linear-gradient(135deg, hsl(43 90% 38% / 0.3), hsl(43 90% 58% / 0.15))', color: 'hsl(43 90% 50% / 0.4)', border: '1px solid hsl(43 90% 50% / 0.1)' }}>
                  ◈
                </div>
                <p className="text-sm text-muted-foreground">Sélectionne un élève pour voir son dossier</p>
                {pinnedStudents.length === 0 && students.length > 0 && (
                  <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                    <Pin size={10} /> Épingle les élèves que tu tutoies pour les retrouver rapidement
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ════════════════════════════ MODALS ════════════════════════════ */}
      {/* Full calendar modal */}
      {showCalendar && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12"
          style={{ background: 'hsl(222 22% 4% / 0.9)', backdropFilter: 'blur(10px)' }}
          onClick={() => setShowCalendar(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card border border-border rounded-2xl p-5 w-full max-w-3xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={selectedStudent.avatarUrl} alt={selectedStudent.pseudo} className="w-7 h-7 rounded-full" />
                <span className="font-display font-bold text-sm">EDT — {selectedStudent.pseudo}</span>
              </div>
              <button onClick={() => setShowCalendar(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"><X size={15} /></button>
            </div>
            <WeekCalendar events={planningEvents.filter(p => p.user_id === selectedStudent.user_id)} />
          </motion.div>
        </div>
      )}

      {/* Quick quest */}
      {quickQuestFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setQuickQuestFor(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card border border-border rounded-2xl p-5 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-sm font-bold mb-1" style={{ color: 'hsl(270 70% 70%)' }}>⚡ Quête rapide</h2>
            <p className="text-xs text-muted-foreground mb-3">En {quickQuestFor.subject} · 100 XP</p>
            <input type="text" placeholder="Titre de la quête…" value={quickQuestTitle} onChange={e => setQuickQuestTitle(e.target.value)} autoFocus
              className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3"
              style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }} />
            <div className="flex gap-2">
              <button onClick={() => setQuickQuestFor(null)} className="flex-1 py-2 rounded-xl text-sm text-muted-foreground border hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
              <button onClick={handleQuickQuest} disabled={creating || !quickQuestTitle.trim()}
                className="flex-1 py-2 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-1"
                style={{ background: 'linear-gradient(135deg, hsl(270 50% 38%), hsl(270 60% 55%))', color: 'white' }}>
                {creating && <Loader2 size={12} className="animate-spin" />} Assigner
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Student */}
      {showCreateStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCreateStudent(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card border border-border rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={15} style={{ color: 'hsl(43 90% 55%)' }} />
              <h2 className="font-display text-sm font-bold" style={{ color: 'hsl(43 90% 62%)' }}>Créer un élève</h2>
            </div>
            <form onSubmit={handleCreateStudent} className="space-y-3">
              {[
                { l: 'Pseudo', k: 'pseudo', t: 'text' },
                { l: 'Email', k: 'email', t: 'email' },
                { l: 'Mot de passe', k: 'password', t: 'password' },
              ].map(f => (
                <div key={f.k}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">{f.l}</label>
                  <input type={f.t} required value={(newStudent as any)[f.k]} onChange={e => setNewStudent(p => ({ ...p, [f.k]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }} />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Avatar</label>
                <div className="flex gap-1.5 flex-wrap">
                  {AVATARS.map(a => (
                    <button key={a} type="button" onClick={() => setNewStudent(p => ({ ...p, avatar: a }))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all hover:scale-110"
                      style={{ border: `2px solid ${newStudent.avatar === a ? 'hsl(43 90% 52%)' : 'hsl(222 16% 22%)'}`, background: newStudent.avatar === a ? 'hsl(43 90% 50% / 0.1)' : 'transparent' }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowCreateStudent(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-1"
                  style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)' }}>
                  {creating && <Loader2 size={12} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Coach */}
      {showCreateCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCreateCoach(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card rounded-2xl p-6 max-w-md w-full" style={{ border: '1px solid hsl(280 60% 45% / 0.3)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={15} style={{ color: 'hsl(280 70% 70%)' }} />
              <h2 className="font-display text-sm font-bold" style={{ color: 'hsl(280 70% 70%)' }}>Créer un tuteur</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Le compte est créé sans vous déconnecter.</p>
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
                  {creating && <Loader2 size={12} className="animate-spin" />} Créer le tuteur
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Quest */}
      {showCreateQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCreateQuest(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="game-panel bg-card border border-border rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={15} style={{ color: 'hsl(270 70% 65%)' }} />
              <h2 className="font-display text-sm font-bold" style={{ color: 'hsl(270 70% 70%)' }}>Créer une quête</h2>
            </div>
            <form onSubmit={handleCreateQuest} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Titre</label>
                <input type="text" required value={newQuest.title} onChange={e => setNewQuest(p => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Description (optionnel)</label>
                <textarea value={newQuest.description} onChange={e => setNewQuest(p => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[48px] resize-none"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Matière</label>
                  <select value={newQuest.subject} onChange={e => setNewQuest(p => ({ ...p, subject: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Difficulté</label>
                  <select value={newQuest.difficulty} onChange={e => setNewQuest(p => ({ ...p, difficulty: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}>
                    <option value="easy">★ Facile</option>
                    <option value="medium">★★ Moyen</option>
                    <option value="hard">★★★ Difficile</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">XP</label>
                  <input type="number" min={10} value={newQuest.xp_reward} onChange={e => setNewQuest(p => ({ ...p, xp_reward: parseInt(e.target.value) || 50 }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Date limite</label>
                  <input type="date" value={newQuest.deadline} onChange={e => setNewQuest(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Assigner à</label>
                <select required value={newQuest.assigned_to} onChange={e => setNewQuest(p => ({ ...p, assigned_to: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}>
                  <option value="">Choisir…</option>
                  <option value="all">Tous les élèves</option>
                  {questStudents.map(s => <option key={s.user_id} value={s.user_id}>{s.pseudo}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowCreateQuest(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-1"
                  style={{ background: 'linear-gradient(135deg, hsl(270 50% 38%), hsl(270 60% 55%))', color: 'white' }}>
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
            <h2 className="font-display text-sm font-bold mb-2" style={{ color: 'hsl(0 84% 65%)' }}>⚠️ Supprimer l'élève</h2>
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
