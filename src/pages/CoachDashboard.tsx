import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, TrendingUp, LogOut, Plus, UserPlus, Loader2, MessageCircle,
  ChevronDown, ChevronUp, X, Zap, Image as ImageIcon, Filter, Trash2,
  Sparkles, Check, Camera, Calendar, Shield, Activity, BookOpen, Users,
} from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, AVATARS, Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

const CLASS_LEVELS = ['3ème', '2nde', '1ère', 'Tle'] as const;

interface StudentDifficulty {
  id: string; user_id: string; subject: string; severity: string;
  description: string; resolved: boolean; coach_reply: string | null; created_at: string;
  pseudo?: string; avatarUrl?: string;
}
interface StudentExam {
  id: string; user_id: string; subject: string; exam_date: string;
  chapters: string | null; stress_level: string; grade: number | null; photo_url?: string | null;
  grade_received: boolean; pseudo?: string; avatarUrl?: string;
}
interface StudentTask {
  id: string; user_id: string; description: string; subject: string;
  difficulty: string; xp_reward: number; completed: boolean; deadline: string | null;
  completed_at: string | null; created_at: string; priority: string;
  pseudo?: string; avatarUrl?: string;
}
interface PlanningEvent {
  id: string; user_id: string; subject: string; start_time: string;
  end_time: string; description: string | null; validated: boolean;
}

const SEVERITY_LABELS: Record<string, { label: string; color: string }> = {
  blocking: { label: '🔴 Bloquant',  color: 'hsl(0 84% 60%)' },
  fragile:  { label: '🟡 Fragile',   color: 'hsl(38 92% 55%)' },
  ok:       { label: '🟢 Gérable',   color: 'hsl(142 71% 45%)' },
};
const STRESS_LABELS: Record<string, string> = {
  stressed: '😰 Stressé', neutral: '😐 Neutre', calm: '😊 Serein',
};
const PRIORITY_COLORS: Record<string, string> = { high: 'hsl(0 84% 60%)', medium: 'hsl(38 92% 55%)', low: 'hsl(142 71% 45%)' };
const PRIORITY_LABELS: Record<string, string>  = { high: '🔴 Haute', medium: '🟡 Moyenne', low: '🟢 Faible' };

// ─── tiny helpers ───────────────────────────────────────────────────────────
function OnlineDot({ lastSeenAt }: { lastSeenAt: string | null }) {
  if (!lastSeenAt) return <span className="text-xs text-muted-foreground">Jamais</span>;
  const diff = (Date.now() - new Date(lastSeenAt).getTime()) / 1000;
  const online = diff < 120;
  const recent = diff < 300;
  const minutes = Math.floor(diff / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const label   = online ? 'En ligne' : days > 0 ? `${days}j` : hours > 0 ? `${hours}h` : minutes > 0 ? `${minutes}min` : 'à l\'instant';

  return (
    <span className="flex items-center gap-1.5 text-xs">
      <span
        className={online ? 'live-dot' : ''}
        style={{
          display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
          background: online ? 'hsl(142 71% 50%)' : recent ? 'hsl(38 92% 55%)' : 'hsl(220 10% 35%)',
          boxShadow: online ? '0 0 6px hsl(142 71% 50%)' : 'none',
        }}
      />
      <span style={{ color: online ? 'hsl(142 71% 55%)' : 'hsl(220 10% 55%)' }}>{label}</span>
    </span>
  );
}

function CompletionBadge({ rate }: { rate: number }) {
  const color = rate >= 80 ? 'hsl(142 71% 45%)' : rate >= 50 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)';
  return (
    <span
      className="px-2 py-0.5 rounded text-[10px] font-bold tabular-nums"
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {rate}%
    </span>
  );
}

function SubjectDot({ subject }: { subject: string }) {
  return (
    <span
      className="w-2 h-2 rounded-full shrink-0"
      style={{ background: `hsl(var(${SUBJECT_CSS_VAR[subject as Subject] || '--muted'}))` }}
    />
  );
}

// ─── main component ──────────────────────────────────────────────────────────
export default function CoachDashboard() {
  const { signOut } = useAuth();

  type EnrichedStudent = Profile & {
    completionRate: number; totalHours: number; lastActive: string;
    last_seen_at: string | null; class_level: string | null;
    avatarUrl: string;
  };

  const [students,      setStudents]      = useState<EnrichedStudent[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [difficulties,  setDifficulties]  = useState<StudentDifficulty[]>([]);
  const [exams,         setExams]         = useState<StudentExam[]>([]);
  const [studentTasks,  setStudentTasks]  = useState<StudentTask[]>([]);
  const [dailyTasks,    setDailyTasks]    = useState<{
    id: string; user_id: string; task_date: string; task_number: number;
    description: string; subject: string; completed: boolean;
    created_at: string; method: string; pseudo?: string; avatarUrl?: string;
  }[]>([]);
  const [planningEvents, setPlanningEvents] = useState<PlanningEvent[]>([]);
  const [urgentAlerts,  setUrgentAlerts]  = useState<{ studentName: string; avatarUrl: string; reasons: string[]; userId: string }[]>([]);
  const [baselines,     setBaselines]     = useState<Record<string, boolean>>({});
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [expandedTab,   setExpandedTab]   = useState<Record<string, string>>({});
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Modal states
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showCreateCoach,   setShowCreateCoach]   = useState(false);
  const [showCreateQuest,   setShowCreateQuest]   = useState(false);
  const [newStudent,  setNewStudent]  = useState({ pseudo: '', email: '', password: '', avatar: '🐺', class_level: '' });
  const [newCoach,    setNewCoach]    = useState({ pseudo: '', email: '', password: '' });
  const [newQuest,    setNewQuest]    = useState({ title: '', description: '', subject: 'Maths' as string, difficulty: 'medium' as string, xp_reward: 100, deadline: '', assigned_to: '' });
  const [creating,    setCreating]    = useState(false);
  const [questStudents, setQuestStudents] = useState<Profile[]>([]);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText,  setReplyText]  = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ userId: string; pseudo: string } | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<string | null>(null);
  const [quickQuestFor, setQuickQuestFor] = useState<{ diffId: string; userId: string; subject: string } | null>(null);
  const [quickQuestTitle, setQuickQuestTitle] = useState('');

  const [generatingPlan, setGeneratingPlan] = useState<string | null>(null);
  const [generatedPlan,  setGeneratedPlan]  = useState<{ userId: string; content: string } | null>(null);
  const [validatingPlan, setValidatingPlan] = useState(false);

  // ── data loading ────────────────────────────────────────────────────────────
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

    // Build avatar URLs
    const cfgMap: Record<string, AvatarConfig> = {};
    (avatarCfgs ?? []).forEach((c: any) => { cfgMap[c.user_id] = c as AvatarConfig; });
    const avatarUrlMap: Record<string, string> = {};
    studentProfs.forEach(p => {
      const cfg = cfgMap[p.user_id] ?? DEFAULT_AVATAR_CONFIG;
      avatarUrlMap[p.user_id] = buildAvataaarsUrl(cfg, p.pseudo);
    });

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

    if (diffs)      setDifficulties(diffs.map(d => ({ ...d, pseudo: profileMap[d.user_id]?.pseudo, avatarUrl: avatarUrlMap[d.user_id] })));
    if (examsData)  setExams(examsData.map(e => ({ ...e, photo_url: (e as any).photo_url, grade_received: (e as any).grade_received ?? false, pseudo: profileMap[e.user_id]?.pseudo, avatarUrl: avatarUrlMap[e.user_id] })));
    if (tasksData)  setStudentTasks(tasksData.map(t => ({ ...t, pseudo: profileMap[t.user_id]?.pseudo, avatarUrl: avatarUrlMap[t.user_id] })));
    if (dailyData)  setDailyTasks((dailyData as any[]).map(d => ({ ...d, pseudo: profileMap[d.user_id]?.pseudo, avatarUrl: avatarUrlMap[d.user_id] })));
    if (planningData) setPlanningEvents(planningData as PlanningEvent[]);
    if (blData)     setBaselines(Object.fromEntries((blData as any[]).map((b: any) => [b.user_id, true])));

    const enriched: EnrichedStudent[] = studentProfs.map(p => {
      const userQuests   = (allQuests  || []).filter(q => q.assigned_to === p.user_id);
      const completed    = userQuests.filter(q => q.completed).length;
      const completionRate = userQuests.length > 0 ? Math.round((completed / userQuests.length) * 100) : 100;
      const totalMinutes = (allSessions || []).filter(s => s.user_id === p.user_id).reduce((a, s) => a + s.duration_minutes, 0);
      const totalHours   = Math.round(totalMinutes / 60);
      const lastActive   = p.last_activity_date
        ? (new Date(p.last_activity_date).toDateString() === new Date().toDateString() ? "Aujourd'hui" : p.last_activity_date)
        : 'Jamais';
      return { ...p, completionRate, totalHours, lastActive, last_seen_at: lastSeenMap[p.user_id] ?? null, class_level: p.class_level, avatarUrl: avatarUrlMap[p.user_id] };
    });

    setStudents(enriched);
    setQuestStudents(studentProfs);

    // Urgent alerts
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const todayDailyUsers = new Set((dailyData || []).filter((d: any) => d.task_date === todayStr).map((d: any) => d.user_id));
    const alertMap: Record<string, string[]> = {};
    enriched.forEach(s => {
      if (s.streak === 0) { alertMap[s.user_id] = alertMap[s.user_id] || []; alertMap[s.user_id].push('Série à 0 🔥'); }
      if (s.completionRate < 50) { alertMap[s.user_id] = alertMap[s.user_id] || []; alertMap[s.user_id].push(`Complétion ${s.completionRate}%`); }
    });
    (diffs || []).filter(d => !d.resolved && d.severity === 'blocking').forEach(d => {
      alertMap[d.user_id] = alertMap[d.user_id] || []; alertMap[d.user_id].push(`Bloquant en ${d.subject}`);
    });
    if (now.getHours() >= 14) {
      studentProfs.forEach(p => {
        if (!todayDailyUsers.has(p.user_id)) { alertMap[p.user_id] = alertMap[p.user_id] || []; alertMap[p.user_id].push('Tâches du jour manquantes'); }
      });
    }
    setUrgentAlerts(Object.entries(alertMap).filter(([_, r]) => r.length > 0).map(([uid, reasons]) => ({
      studentName: profileMap[uid]?.pseudo || 'Élève',
      avatarUrl:   avatarUrlMap[uid] || '',
      reasons, userId: uid,
    })).sort((a, b) => b.reasons.length - a.reasons.length));

    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const channel = supabase.channel('coach-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' },         () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' },           () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'timer_sessions' },   () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties' },     () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' },            () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'student_tasks' },    () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_tasks' },      () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'planning_events' }, () => loadData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setStudents(prev => [...prev]), 30_000);
    return () => clearInterval(interval);
  }, []);

  // ── handlers ────────────────────────────────────────────────────────────────
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
    if (newStudent.class_level) {
      await supabase.from('profiles').update({ class_level: newStudent.class_level }).eq('user_id', data.user.id);
    }
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
      if (res.error) { alert('Erreur: ' + (res.error.message || 'Impossible de créer le compte tuteur')); }
      else { setNewCoach({ pseudo: '', email: '', password: '' }); setShowCreateCoach(false); }
    } catch (err) { alert('Erreur: ' + (err as Error).message); }
    setCreating(false);
  };

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault(); setCreating(true);
    const targets = newQuest.assigned_to === 'all' ? questStudents.map(s => s.user_id) : [newQuest.assigned_to];
    for (const userId of targets) {
      await supabase.from('quests').insert({
        assigned_to: userId, title: newQuest.title, description: newQuest.description || null,
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
    try {
      await supabase.functions.invoke('delete-student', { body: { studentUserId: userId } });
    } catch { alert('Erreur lors de la suppression'); }
    setDeletingStudent(null); setConfirmDelete(null); loadData();
  };

  const handleUpdateClassLevel = async (userId: string, classLevel: string) => {
    await supabase.from('profiles').update({ class_level: classLevel || null }).eq('user_id', userId);
    setStudents(prev => prev.map(s => s.user_id === userId ? { ...s, class_level: classLevel || null } : s));
  };

  const handleGeneratePlan = async (studentUserId: string) => {
    setGeneratingPlan(studentUserId); setGeneratedPlan(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-plan', { body: { studentUserId } });
      if (error) alert('Erreur: ' + (error.message || 'Impossible de générer le plan'));
      else if (data?.plan) setGeneratedPlan({ userId: studentUserId, content: data.plan });
    } catch { alert('Erreur lors de la génération'); }
    setGeneratingPlan(null);
  };

  const handleValidatePlan = async () => {
    if (!generatedPlan) return;
    setValidatingPlan(true);
    const { data: plans } = await supabase.from('weekly_plans').select('id').eq('user_id', generatedPlan.userId).eq('validated', false).order('created_at', { ascending: false }).limit(1);
    if (plans?.[0]) await supabase.from('weekly_plans').update({ validated: true, validated_at: new Date().toISOString() }).eq('id', plans[0].id);
    setValidatingPlan(false); setGeneratedPlan(null); loadData();
  };

  const handleCreateBaseline = async (studentUserId: string) => {
    const student = students.find(s => s.user_id === studentUserId);
    if (!student) return;
    const sExams = exams.filter(e => e.user_id === studentUserId);
    const gradesBySubject: Record<string, number[]> = {};
    sExams.forEach(e => { if (e.grade !== null) { gradesBySubject[e.subject] = gradesBySubject[e.subject] || []; gradesBySubject[e.subject].push(e.grade!); } });
    await supabase.from('student_baselines').upsert({
      user_id: studentUserId,
      initial_total_xp: student.total_xp,
      initial_streak: student.streak,
      initial_total_hours: student.totalHours,
      initial_grades: gradesBySubject,
      initial_quest_completion_rate: student.completionRate,
    }, { onConflict: 'user_id' });
    setBaselines(prev => ({ ...prev, [studentUserId]: true }));
  };

  const handleMarkGradeReceived = async (examId: string, received: boolean) => {
    await supabase.from('exams').update({ grade_received: received } as any).eq('id', examId);
    setExams(prev => prev.map(e => e.id === examId ? { ...e, grade_received: received } : e));
  };

  // ── derived values ───────────────────────────────────────────────────────────
  const now              = new Date();
  const todayStr         = now.toISOString().split('T')[0];
  const unresolvedDiffs  = difficulties.filter(d => !d.resolved);
  const upcomingExams    = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null);
  const missingGradeExams = exams.filter(e => new Date(e.exam_date) < now && e.grade === null && !(e as any).grade_received);
  const filteredDiffs    = subjectFilter === 'all' ? difficulties : difficulties.filter(d => d.subject === subjectFilter);
  const onlineCount      = students.filter(s => s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000).length;
  const avgXp            = students.length > 0 ? Math.round(students.reduce((a, s) => a + s.total_xp, 0) / students.length) : 0;
  const avgStreak        = students.length > 0 ? Math.round(students.reduce((a, s) => a + s.streak, 0) / students.length) : 0;
  const totalHoursAll    = students.reduce((a, s) => a + s.totalHours, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="stat-badge px-4 py-2 text-lg font-display font-black" style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))', color: 'hsl(222 22% 8%)' }}>
            COMMANDE
          </div>
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'hsl(43 90% 52%)' }} />
        </div>
      </div>
    );
  }

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-40 border-b border-border/60 px-4 md:px-6 py-3"
        style={{ backdropFilter: 'blur(20px) saturate(1.6)', background: 'hsl(222 22% 6% / 0.85)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div
              className="stat-badge px-2.5 py-1 text-xs font-display font-black"
              style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))', color: 'hsl(222 22% 8%)', boxShadow: '0 0 14px hsl(43 90% 50% / 0.5)' }}
            >
              ◈
            </div>
            <h1 className="font-display text-base font-bold tracking-wide" style={{ color: 'hsl(43 90% 62%)' }}>
              CENTRE DE COMMANDE
            </h1>
            {onlineCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(142 71% 55%)' }}>
                <span className="live-dot" style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'hsl(142 71% 50%)', boxShadow: '0 0 6px hsl(142 71% 50%)' }} />
                {onlineCount} en ligne
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateStudent(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'hsl(222 22% 13%)', border: '1px solid hsl(222 16% 22%)', color: 'hsl(220 10% 75%)' }}
            >
              <UserPlus size={13} /> Élève
            </button>
            <button
              onClick={() => setShowCreateCoach(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'hsl(222 22% 13%)', border: '1px solid hsl(280 60% 45% / 0.4)', color: 'hsl(280 70% 75%)' }}
            >
              <Shield size={13} /> Tuteur
            </button>
            <button
              onClick={() => setShowCreateQuest(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)', boxShadow: '0 0 10px hsl(43 90% 50% / 0.35)' }}
            >
              <Plus size={13} /> Quête
            </button>
            <button onClick={signOut} className="p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground" title="Déconnexion">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

        {/* ── KPI GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Élèves',          value: students.length,                   icon: <Users size={14} />,     color: 'hsl(210 70% 60%)' },
            { label: 'En ligne',         value: onlineCount,                       icon: <Activity size={14} />,  color: 'hsl(142 71% 52%)' },
            { label: 'XP moyen',         value: avgXp.toLocaleString('fr-FR'),     icon: '⚡',                    color: 'hsl(43 90% 52%)' },
            { label: 'Série moyenne',    value: avgStreak,                         icon: '🔥',                    color: 'hsl(25 90% 55%)' },
            { label: 'Heures totales',   value: `${totalHoursAll}h`,              icon: <Clock size={14} />,     color: 'hsl(270 70% 65%)' },
            { label: 'Notes manquantes', value: missingGradeExams.length,         icon: '📋',                    color: missingGradeExams.length > 0 ? 'hsl(0 84% 60%)' : 'hsl(142 71% 45%)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="game-panel bg-card border border-border rounded-lg p-4 flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span style={{ color: stat.color }}>{stat.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
              <span className="hud-number text-2xl font-display font-black tabular-nums" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── ALERT STRIP ── */}
        <AnimatePresence>
          {urgentAlerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="game-panel bg-card border rounded-lg p-4 overflow-hidden"
              style={{ borderColor: 'hsl(0 84% 55% / 0.35)', background: 'hsl(0 84% 50% / 0.05)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(0 84% 60%)' }}>⚠ Alertes actives</span>
                <span className="stat-badge text-[10px] px-2 py-0.5" style={{ background: 'hsl(0 84% 55% / 0.15)', color: 'hsl(0 84% 65%)', border: '1px solid hsl(0 84% 55% / 0.3)' }}>
                  {urgentAlerts.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {urgentAlerts.map(alert => (
                  <button
                    key={alert.userId}
                    onClick={() => setExpandedStudent(prev => prev === alert.userId ? null : alert.userId)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all hover:scale-105"
                    style={{ background: 'hsl(0 84% 50% / 0.1)', border: '1px solid hsl(0 84% 55% / 0.25)', color: 'hsl(0 84% 65%)' }}
                  >
                    <img src={alert.avatarUrl} alt={alert.studentName} className="w-5 h-5 rounded-full" />
                    <span className="font-medium">{alert.studentName}</span>
                    {alert.reasons.map((r, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'hsl(0 84% 50% / 0.15)', color: 'hsl(0 84% 70%)' }}>{r}</span>
                    ))}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN TABS ── */}
        <Tabs defaultValue="students">
          <TabsList
            className="mb-5 p-1 rounded-xl gap-1"
            style={{ background: 'hsl(222 22% 8%)', border: '1px solid hsl(222 16% 16%)' }}
          >
            {[
              { value: 'students',    label: '👥 Élèves',       badge: students.length },
              { value: 'difficulties',label: '⚠️ Difficultés',  badge: unresolvedDiffs.length, badgeColor: 'hsl(0 84% 60%)' },
              { value: 'exams',       label: '📝 DS',            badge: upcomingExams.length + missingGradeExams.length },
              { value: 'tasks',       label: '✏️ Tâches',        badge: 0 },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative text-xs font-bold px-3 py-2 rounded-lg transition-all data-[state=active]:text-foreground"
                style={{ color: 'hsl(220 10% 50%)' }}
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span
                    className="ml-1.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold inline-flex items-center justify-center px-1"
                    style={{ background: tab.badgeColor || 'hsl(43 90% 50% / 0.2)', color: tab.badgeColor || 'hsl(43 90% 60%)' }}
                  >
                    {tab.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ═══ STUDENTS TAB ═══ */}
          <TabsContent value="students">
            <div className="game-panel scan-container bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(43 90% 52%)' }}>
                  ◈ Roster — {students.length} élève{students.length > 1 ? 's' : ''}
                </span>
                <TrendingUp size={14} className="text-muted-foreground" />
              </div>

              {students.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-12">Aucun élève. Créez-en un pour commencer.</p>
              ) : (
                <div className="divide-y divide-border/40">
                  {students.map((student, idx) => {
                    const { level }      = calculateLevel(student.total_xp);
                    const title          = getTitleForLevel(level);
                    const isExpanded     = expandedStudent === student.user_id;
                    const subTab         = expandedTab[student.user_id] || 'resume';
                    const sDiffs         = difficulties.filter(d => d.user_id === student.user_id);
                    const sExams         = exams.filter(e => e.user_id === student.user_id);
                    const sTasks         = studentTasks.filter(t => t.user_id === student.user_id);
                    const sPlanning      = planningEvents.filter(p => p.user_id === student.user_id && new Date(p.start_time) >= now).slice(0, 10);
                    const sMissing       = sExams.filter(e => new Date(e.exam_date) < now && e.grade === null);
                    const sNextExam      = sExams.filter(e => new Date(e.exam_date) >= now && e.grade === null).sort((a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime())[0];
                    const isAlerted      = !!urgentAlerts.find(a => a.userId === student.user_id);
                    const gradesBySubject: Record<string, number[]> = {};
                    sExams.forEach(e => { if (e.grade !== null) { gradesBySubject[e.subject] = gradesBySubject[e.subject] || []; gradesBySubject[e.subject].push(e.grade!); } });

                    return (
                      <AnimatePresence key={student.id}>
                        {/* Student row */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04, type: 'spring', stiffness: 300, damping: 26 }}
                        >
                          <div
                            className="px-4 py-3.5 cursor-pointer transition-all group"
                            style={{
                              background: isAlerted
                                ? 'hsl(0 84% 50% / 0.04)'
                                : isExpanded ? 'hsl(43 90% 50% / 0.04)' : 'transparent',
                              borderLeft: isExpanded ? '3px solid hsl(43 90% 52%)' : isAlerted ? '3px solid hsl(0 84% 55% / 0.5)' : '3px solid transparent',
                            }}
                            onClick={() => setExpandedStudent(isExpanded ? null : student.user_id)}
                          >
                            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                              {/* Avatar + online */}
                              <div className="relative shrink-0">
                                <img
                                  src={student.avatarUrl}
                                  alt={student.pseudo}
                                  className="w-10 h-10 rounded-full object-cover"
                                  style={{ border: `2px solid ${isAlerted ? 'hsl(0 84% 55% / 0.5)' : 'hsl(43 90% 50% / 0.3)'}` }}
                                />
                                {student.last_seen_at && (Date.now() - new Date(student.last_seen_at).getTime()) < 120_000 && (
                                  <span
                                    className="live-dot absolute -bottom-0.5 -right-0.5"
                                    style={{ display: 'block', width: 9, height: 9, borderRadius: '50%', background: 'hsl(142 71% 50%)', boxShadow: '0 0 5px hsl(142 71% 50%)', border: '2px solid hsl(222 22% 8%)' }}
                                  />
                                )}
                              </div>

                              {/* Name + alerts */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-sm truncate">{student.pseudo}</span>
                                  {student.class_level && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'hsl(43 90% 50% / 0.12)', color: 'hsl(43 90% 60%)', border: '1px solid hsl(43 90% 50% / 0.2)' }}>
                                      {student.class_level}
                                    </span>
                                  )}
                                  {isAlerted && urgentAlerts.find(a => a.userId === student.user_id)!.reasons.map((r, i) => (
                                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'hsl(0 84% 50% / 0.12)', color: 'hsl(0 84% 65%)', border: '1px solid hsl(0 84% 55% / 0.2)' }}>
                                      {r}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-3 mt-0.5 text-[10px] text-muted-foreground">
                                  <span>LVL {level} · {title}</span>
                                  {sNextExam && (
                                    <span style={{ color: Math.ceil((new Date(sNextExam.exam_date).getTime() - now.getTime()) / 86400000) <= 3 ? 'hsl(0 84% 60%)' : 'hsl(38 92% 55%)' }}>
                                      📝 DS dans {Math.ceil((new Date(sNextExam.exam_date).getTime() - now.getTime()) / 86400000)}j
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Stats row */}
                              <div className="flex items-center gap-4 text-sm shrink-0">
                                <span className="tabular-nums font-display font-semibold" style={{ color: 'hsl(43 90% 60%)' }}>
                                  {student.total_xp.toLocaleString('fr-FR')} XP
                                </span>
                                <span style={{ color: student.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(0 84% 55%)' }}>
                                  🔥 {student.streak}
                                </span>
                                <CompletionBadge rate={student.completionRate} />
                                <span className="text-muted-foreground text-xs">⏱ {student.totalHours}h</span>
                                <OnlineDot lastSeenAt={student.last_seen_at} />

                                {/* Badges */}
                                {sDiffs.filter(d => !d.resolved).length > 0 && (
                                  <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: 'hsl(0 84% 55% / 0.15)', color: 'hsl(0 84% 65%)' }}>
                                    {sDiffs.filter(d => !d.resolved).length}
                                  </span>
                                )}
                                {sMissing.length > 0 && (
                                  <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center" style={{ background: 'hsl(38 92% 52% / 0.15)', color: 'hsl(38 92% 65%)' }}>
                                    {sMissing.length}
                                  </span>
                                )}

                                {/* Delete */}
                                <button
                                  onClick={(e) => { e.stopPropagation(); setConfirmDelete({ userId: student.user_id, pseudo: student.pseudo }); }}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-all hover:bg-destructive/20 hover:text-destructive"
                                >
                                  <Trash2 size={12} />
                                </button>

                                {isExpanded
                                  ? <ChevronUp size={14} className="text-muted-foreground" />
                                  : <ChevronDown size={14} className="text-muted-foreground" />
                                }
                              </div>
                            </div>
                          </div>

                          {/* ── EXPANDED DOSSIER ── */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                key="dossier"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div
                                  className="mx-4 mb-4 rounded-xl border p-4"
                                  style={{ background: 'hsl(222 22% 7%)', borderColor: 'hsl(43 90% 50% / 0.15)' }}
                                >
                                  {/* Dossier actions */}
                                  <div className="flex flex-wrap items-center gap-2 mb-4">
                                    {/* Class level selector */}
                                    <select
                                      value={student.class_level || ''}
                                      onChange={(e) => handleUpdateClassLevel(student.user_id, e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      className="px-2 py-1.5 rounded-lg text-xs font-bold focus:outline-none focus:ring-1"
                                      style={{ background: 'hsl(222 22% 12%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 70%)' }}
                                    >
                                      <option value="">Classe —</option>
                                      {CLASS_LEVELS.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                                    </select>

                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleGeneratePlan(student.user_id); }}
                                      disabled={generatingPlan === student.user_id}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 disabled:opacity-50"
                                      style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)' }}
                                    >
                                      {generatingPlan === student.user_id ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
                                      {generatingPlan === student.user_id ? 'Génération...' : 'Plan IA'}
                                    </button>

                                    {!baselines[student.user_id] ? (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleCreateBaseline(student.user_id); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                                        style={{ background: 'hsl(222 22% 12%)', border: '1px solid hsl(222 16% 22%)', color: 'hsl(220 10% 65%)' }}
                                      >
                                        <Camera size={11} /> Snapshot initial
                                      </button>
                                    ) : (
                                      <span className="flex items-center gap-1 text-xs" style={{ color: 'hsl(142 71% 50%)' }}>
                                        <Check size={11} /> Snapshot pris
                                      </span>
                                    )}
                                  </div>

                                  {/* Sub-tabs */}
                                  <div className="flex gap-1 mb-4 p-0.5 rounded-lg w-fit" style={{ background: 'hsl(222 22% 10%)' }}>
                                    {[
                                      { key: 'resume',   label: '📊 Résumé' },
                                      { key: 'planning', label: '📅 Planning', badge: sPlanning.length },
                                      { key: 'diffs',    label: '⚠️ Difficultés', badge: sDiffs.filter(d => !d.resolved).length },
                                      { key: 'exams',    label: '📝 DS', badge: sExams.filter(e => new Date(e.exam_date) >= now).length },
                                      { key: 'tasks',    label: '✏️ Tâches', badge: sTasks.filter(t => !t.completed).length },
                                    ].map(tab => (
                                      <button
                                        key={tab.key}
                                        onClick={() => setExpandedTab(prev => ({ ...prev, [student.user_id]: tab.key }))}
                                        className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wide transition-all"
                                        style={
                                          subTab === tab.key
                                            ? { background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)', border: '1px solid hsl(43 90% 50% / 0.25)' }
                                            : { color: 'hsl(220 10% 48%)' }
                                        }
                                      >
                                        {tab.label}
                                        {tab.badge != null && tab.badge > 0 && (
                                          <span className="ml-1 px-1 rounded-full text-[9px]" style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 60%)' }}>
                                            {tab.badge}
                                          </span>
                                        )}
                                      </button>
                                    ))}
                                  </div>

                                  {/* ── Résumé ── */}
                                  {subTab === 'resume' && (
                                    <div className="space-y-3">
                                      {/* Stats */}
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {[
                                          { label: 'Temps total', value: `${student.totalHours}h`, color: 'hsl(270 70% 65%)' },
                                          { label: 'Streak',      value: `🔥 ${student.streak}`,   color: student.streak > 0 ? 'hsl(25 90% 55%)' : 'hsl(0 84% 60%)' },
                                          { label: 'Complétion',  value: `${student.completionRate}%`, color: student.completionRate >= 80 ? 'hsl(142 71% 45%)' : 'hsl(43 90% 52%)' },
                                          { label: 'Dernière activité', value: student.lastActive, color: 'hsl(220 10% 60%)' },
                                        ].map(s => (
                                          <div key={s.label} className="p-3 rounded-lg" style={{ background: 'hsl(222 22% 10%)', border: '1px solid hsl(222 16% 16%)' }}>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                                            <p className="font-display font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
                                          </div>
                                        ))}
                                      </div>
                                      {/* Grade averages */}
                                      {Object.keys(gradesBySubject).length > 0 && (
                                        <div className="p-3 rounded-lg flex flex-wrap gap-3 items-center" style={{ background: 'hsl(222 22% 10%)', border: '1px solid hsl(222 16% 16%)' }}>
                                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Moyennes :</span>
                                          {Object.entries(gradesBySubject).map(([subj, grades]) => {
                                            const avg = Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10;
                                            const color = avg >= 14 ? 'hsl(142 71% 45%)' : avg >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)';
                                            return (
                                              <span key={subj} className="flex items-center gap-1.5 text-xs">
                                                <SubjectDot subject={subj} />
                                                {subj}: <span className="font-semibold" style={{ color }}>{avg}/20</span>
                                              </span>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* ── Planning ── */}
                                  {subTab === 'planning' && (
                                    <div className="space-y-2">
                                      {sPlanning.length === 0 ? (
                                        <p className="text-xs text-muted-foreground py-4 text-center">Aucune session planifiée 📅</p>
                                      ) : sPlanning.map(ev => {
                                        const start    = new Date(ev.start_time);
                                        const end      = new Date(ev.end_time);
                                        const durMin   = Math.round((end.getTime() - start.getTime()) / 60000);
                                        const isToday  = start.toDateString() === now.toDateString();
                                        return (
                                          <div
                                            key={ev.id}
                                            className="flex items-center gap-3 p-2.5 rounded-lg text-xs"
                                            style={{
                                              background: isToday ? 'hsl(43 90% 50% / 0.07)' : 'hsl(222 22% 10%)',
                                              border: `1px solid ${isToday ? 'hsl(43 90% 50% / 0.2)' : 'hsl(222 16% 16%)'}`,
                                            }}
                                          >
                                            <SubjectDot subject={ev.subject} />
                                            <span className="font-medium" style={{ color: isToday ? 'hsl(43 90% 62%)' : 'hsl(220 10% 75%)' }}>
                                              {ev.subject}
                                            </span>
                                            <span className="text-muted-foreground">
                                              {start.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                                              {' · '}
                                              {start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}–{end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="ml-auto text-muted-foreground">{durMin}min</span>
                                            {ev.validated && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                                            {isToday && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>Aujourd'hui</span>}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* ── Difficultés ── */}
                                  {subTab === 'diffs' && (
                                    <div className="space-y-2">
                                      {sDiffs.length === 0 ? (
                                        <p className="text-xs text-muted-foreground py-4 text-center">Aucune difficulté enregistrée 🎉</p>
                                      ) : sDiffs.map(d => (
                                        <div
                                          key={d.id}
                                          className={`p-3 rounded-lg border text-xs ${d.resolved ? 'opacity-50' : ''}`}
                                          style={{ background: 'hsl(222 22% 10%)', borderColor: d.severity === 'blocking' && !d.resolved ? 'hsl(0 84% 55% / 0.3)' : 'hsl(222 16% 16%)' }}
                                        >
                                          <div className="flex items-center gap-2 mb-1.5">
                                            <SubjectDot subject={d.subject} />
                                            <span className="font-medium">{d.subject}</span>
                                            <span style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                                            <span className="text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                                            {d.resolved && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                                          </div>
                                          <p className="text-foreground mb-1">{d.description}</p>
                                          {d.coach_reply && (
                                            <div className="p-2 rounded-lg text-[11px]" style={{ background: 'hsl(43 90% 50% / 0.08)', border: '1px solid hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>
                                              💬 {d.coach_reply}
                                            </div>
                                          )}
                                          {!d.resolved && !d.coach_reply && (
                                            <div className="flex gap-2 mt-2">
                                              {replyingTo === d.id ? (
                                                <div className="flex-1 space-y-1">
                                                  <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse..." className="min-h-[36px] text-xs" />
                                                  <div className="flex gap-1">
                                                    <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)} className="h-6 text-[10px]">Annuler</Button>
                                                    <Button size="sm" onClick={() => handleReply(d.id)} className="h-6 text-[10px]">Envoyer</Button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <>
                                                  <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }} className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: 'hsl(43 90% 55%)' }}>
                                                    <MessageCircle size={10} /> Répondre
                                                  </button>
                                                  <button onClick={() => { setQuickQuestFor({ diffId: d.id, userId: d.user_id, subject: d.subject }); setQuickQuestTitle(''); }} className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: 'hsl(270 70% 65%)' }}>
                                                    <Zap size={10} /> Quête
                                                  </button>
                                                </>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* ── DS ── */}
                                  {subTab === 'exams' && (
                                    <div className="space-y-2">
                                      {sExams.length === 0 ? (
                                        <p className="text-xs text-muted-foreground py-4 text-center">Aucun DS déclaré 📝</p>
                                      ) : sExams.map(e => {
                                        const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / 86400000);
                                        const isPast    = daysUntil < 0;
                                        const isMissing = isPast && e.grade === null && !e.grade_received;
                                        return (
                                          <div
                                            key={e.id}
                                            className={`p-3 rounded-lg border text-xs ${isPast && !isMissing ? 'opacity-55' : ''}`}
                                            style={{ background: 'hsl(222 22% 10%)', borderColor: isMissing ? 'hsl(38 92% 55% / 0.3)' : !isPast && daysUntil <= 7 ? 'hsl(0 84% 55% / 0.3)' : 'hsl(222 16% 16%)' }}
                                          >
                                            <div className="flex items-center gap-2">
                                              <SubjectDot subject={e.subject} />
                                              <span className="font-medium">{e.subject}</span>
                                              <span className="text-muted-foreground ml-auto">
                                                {new Date(e.exam_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                                              </span>
                                              {!isPast && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: daysUntil <= 3 ? 'hsl(0 84% 55% / 0.15)' : 'hsl(222 22% 14%)', color: daysUntil <= 3 ? 'hsl(0 84% 65%)' : 'hsl(220 10% 55%)' }}>{daysUntil === 0 ? "Aujourd'hui" : `${daysUntil}j`}</span>}
                                              {e.grade !== null && <span className="font-display font-bold" style={{ color: e.grade >= 14 ? 'hsl(142 71% 50%)' : e.grade >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' }}>{e.grade}/20</span>}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                              <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                                              {e.chapters && <span>· {e.chapters}</span>}
                                              {e.photo_url && (
                                                <button onClick={() => setPreviewPhoto(e.photo_url!)} className="flex items-center gap-1 text-[10px] ml-auto" style={{ color: 'hsl(43 90% 55%)' }}>
                                                  <ImageIcon size={10} /> Voir
                                                </button>
                                              )}
                                              {isPast && e.grade === null && (
                                                <label className="flex items-center gap-1 ml-auto cursor-pointer text-[10px] hover:text-foreground transition-colors">
                                                  <input type="checkbox" checked={e.grade_received} onChange={ev => handleMarkGradeReceived(e.id, ev.target.checked)} className="w-3 h-3 accent-primary" />
                                                  Résultat donné
                                                </label>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* ── Tâches ── */}
                                  {subTab === 'tasks' && (
                                    <div className="space-y-2">
                                      {sTasks.length === 0 ? (
                                        <p className="text-xs text-muted-foreground py-4 text-center">Aucune tâche perso ✏️</p>
                                      ) : sTasks.map(t => (
                                        <div
                                          key={t.id}
                                          className={`p-3 rounded-lg border text-xs ${t.completed ? 'opacity-50' : ''}`}
                                          style={{ background: 'hsl(222 22% 10%)', borderColor: 'hsl(222 16% 16%)' }}
                                        >
                                          <div className="flex items-center gap-2">
                                            {t.completed && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                                            <SubjectDot subject={t.subject} />
                                            <span className={`flex-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</span>
                                            <span className="text-muted-foreground">{t.subject}</span>
                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ color: PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium, background: `${PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium}15` }}>
                                              {PRIORITY_LABELS[t.priority] || PRIORITY_LABELS.medium}
                                            </span>
                                            <span style={{ color: 'hsl(43 90% 55%)' }}>+{t.xp_reward} XP</span>
                                          </div>
                                          {t.deadline && <p className="text-muted-foreground mt-1">Échéance : {new Date(t.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ═══ DIFFICULTIES TAB ═══ */}
          <TabsContent value="difficulties">
            <div className="game-panel bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(0 84% 60%)' }}>⚠ Difficultés</span>
                  <span className="text-xs text-muted-foreground">({unresolvedDiffs.length} non résolues)</span>
                </div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[130px] h-8 text-xs">
                    <Filter size={11} className="mr-1" /><SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                {filteredDiffs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">Aucune difficulté{subjectFilter !== 'all' ? ` en ${subjectFilter}` : ''} 🎉</p>
                ) : filteredDiffs.map(d => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${d.resolved ? 'opacity-50' : ''}`}
                    style={{ background: 'hsl(222 22% 9%)', borderColor: d.severity === 'blocking' && !d.resolved ? 'hsl(0 84% 55% / 0.3)' : 'hsl(222 16% 18%)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img src={d.avatarUrl} alt={d.pseudo} className="w-7 h-7 rounded-full object-cover" style={{ border: '1.5px solid hsl(43 90% 50% / 0.25)' }} />
                      <span className="font-medium text-sm">{d.pseudo}</span>
                      <SubjectDot subject={d.subject} />
                      <span className="text-xs text-muted-foreground">{d.subject}</span>
                      <span className="text-xs font-bold" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                      {d.resolved && <span className="text-xs" style={{ color: 'hsl(142 71% 50%)' }}>✓ Résolu</span>}
                    </div>
                    <p className="text-sm mb-2">{d.description}</p>
                    {d.coach_reply && (
                      <div className="p-2.5 rounded-lg text-sm" style={{ background: 'hsl(43 90% 50% / 0.08)', border: '1px solid hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 62%)' }}>
                        💬 {d.coach_reply}
                      </div>
                    )}
                    {!d.resolved && !d.coach_reply && (
                      replyingTo === d.id ? (
                        <div className="space-y-2 mt-2">
                          <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse..." className="min-h-[50px] text-sm" />
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Annuler</Button>
                            <Button size="sm" onClick={() => handleReply(d.id)} disabled={!replyText.trim()}>Envoyer</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-4 mt-2">
                          <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: 'hsl(43 90% 55%)' }}>
                            <MessageCircle size={13} /> Répondre
                          </button>
                          <button onClick={() => { setQuickQuestFor({ diffId: d.id, userId: d.user_id, subject: d.subject }); setQuickQuestTitle(''); }} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: 'hsl(270 70% 65%)' }}>
                            <Zap size={13} /> Assigner une quête
                          </button>
                        </div>
                      )
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ═══ EXAMS TAB ═══ */}
          <TabsContent value="exams">
            <div className="game-panel bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(43 90% 52%)' }}>📝 DS</span>
                <span className="text-xs text-muted-foreground">{upcomingExams.length} à venir · {missingGradeExams.length} résultat{missingGradeExams.length > 1 ? 's' : ''} manquant{missingGradeExams.length > 1 ? 's' : ''}</span>
              </div>
              {exams.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Aucun DS déclaré 📝</p>
              ) : (
                <div className="space-y-2">
                  {exams.map(e => {
                    const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / 86400000);
                    const isPast    = daysUntil < 0;
                    const isMissing = isPast && e.grade === null && !(e as any).grade_received;
                    return (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3.5 rounded-xl border ${isPast && !isMissing ? 'opacity-55' : ''}`}
                        style={{ background: 'hsl(222 22% 9%)', borderColor: isMissing ? 'hsl(38 92% 55% / 0.25)' : !isPast && daysUntil <= 7 ? 'hsl(0 84% 55% / 0.25)' : 'hsl(222 16% 18%)' }}
                      >
                        <div className="flex items-center gap-3">
                          <img src={e.avatarUrl} alt={e.pseudo} className="w-7 h-7 rounded-full object-cover" style={{ border: '1.5px solid hsl(43 90% 50% / 0.2)' }} />
                          <span className="font-medium text-sm">{e.pseudo}</span>
                          <SubjectDot subject={e.subject} />
                          <span className="text-sm">{e.subject}</span>
                          <span className="text-sm text-muted-foreground ml-auto">{new Date(e.exam_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                          {!isPast && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: daysUntil <= 3 ? 'hsl(0 84% 55% / 0.12)' : 'hsl(222 22% 14%)', color: daysUntil <= 3 ? 'hsl(0 84% 65%)' : 'hsl(220 10% 55%)' }}>{daysUntil === 0 ? "Aujourd'hui" : `${daysUntil}j`}</span>}
                          {isMissing && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'hsl(38 92% 52% / 0.12)', color: 'hsl(38 92% 65%)' }}>Résultat manquant</span>}
                          {e.grade_received && e.grade === null && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsl(142 71% 45% / 0.12)', color: 'hsl(142 71% 55%)' }}>✓ Reçu</span>}
                          {e.grade !== null && <span className="font-display font-bold" style={{ color: e.grade >= 14 ? 'hsl(142 71% 50%)' : e.grade >= 10 ? 'hsl(43 90% 52%)' : 'hsl(0 84% 60%)' }}>{e.grade}/20</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                          {e.chapters && <span>Chapitres : {e.chapters}</span>}
                          {e.photo_url && (
                            <button onClick={() => setPreviewPhoto(e.photo_url!)} className="flex items-center gap-1 ml-auto" style={{ color: 'hsl(43 90% 55%)' }}>
                              <ImageIcon size={11} /> Voir le contrôle
                            </button>
                          )}
                          {isPast && e.grade === null && (
                            <label className="flex items-center gap-1.5 ml-auto cursor-pointer hover:text-foreground transition-colors">
                              <input type="checkbox" checked={e.grade_received} onChange={ev => handleMarkGradeReceived(e.id, ev.target.checked)} className="w-3.5 h-3.5 accent-primary" />
                              Résultat donné
                            </label>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ═══ TASKS TAB ═══ */}
          <TabsContent value="tasks">
            <div className="game-panel bg-card border border-border rounded-xl p-5">
              {(() => {
                const todayDailyTasks = dailyTasks.filter(t => t.task_date === todayStr);
                const byStudent: Record<string, typeof todayDailyTasks> = {};
                todayDailyTasks.forEach(t => { byStudent[t.user_id] = byStudent[t.user_id] || []; byStudent[t.user_id].push(t); });
                const allByStudent: Record<string, { total: number; done: number }> = {};
                dailyTasks.forEach(t => { allByStudent[t.user_id] = allByStudent[t.user_id] || { total: 0, done: 0 }; allByStudent[t.user_id].total++; if (t.completed) allByStudent[t.user_id].done++; });
                const missingStudentsToday = students.filter(s => !byStudent[s.user_id]);

                const sorted = [...studentTasks].sort((a, b) => new Date(b.completed_at || b.created_at).getTime() - new Date(a.completed_at || a.created_at).getTime());
                const grouped: Record<string, typeof sorted> = {};
                sorted.forEach(t => {
                  const day = new Date(t.completed_at || t.created_at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
                  grouped[day] = grouped[day] || []; grouped[day].push(t);
                });

                return (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(43 90% 52%)' }}>✏️ Tâches</span>
                      <span className="text-xs text-muted-foreground">{studentTasks.filter(t => !t.completed).length} perso actives · {todayDailyTasks.length} du jour</span>
                    </div>

                    {missingStudentsToday.length > 0 && now.getHours() >= 14 && (
                      <div className="p-3 rounded-xl border" style={{ background: 'hsl(38 92% 50% / 0.06)', borderColor: 'hsl(38 92% 52% / 0.2)' }}>
                        <p className="text-xs font-bold mb-2" style={{ color: 'hsl(38 92% 60%)' }}>
                          ⚠️ {missingStudentsToday.length} élève{missingStudentsToday.length > 1 ? 's' : ''} n'ha{missingStudentsToday.length > 1 ? 'vent' : ''} pas défini ses tâches du jour
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {missingStudentsToday.map(s => (
                            <span key={s.user_id} className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg border" style={{ background: 'hsl(222 22% 10%)', borderColor: 'hsl(222 16% 18%)' }}>
                              <img src={s.avatarUrl} alt={s.pseudo} className="w-4 h-4 rounded-full" /> {s.pseudo}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {Object.keys(byStudent).length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">🎯 Tâches du jour</p>
                        <div className="space-y-3">
                          {Object.entries(byStudent).map(([userId, tasks]) => {
                            const completedCount = tasks.filter(t => t.completed).length;
                            const allTime = allByStudent[userId];
                            const rate = allTime ? Math.round((allTime.done / allTime.total) * 100) : 0;
                            return (
                              <div key={userId} className="rounded-xl border p-4" style={{ background: 'hsl(222 22% 9%)', borderColor: 'hsl(222 16% 18%)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                  <img src={tasks[0]?.avatarUrl} alt={tasks[0]?.pseudo} className="w-7 h-7 rounded-full object-cover" style={{ border: '1.5px solid hsl(43 90% 50% / 0.25)' }} />
                                  <span className="font-medium text-sm">{tasks[0]?.pseudo}</span>
                                  <span className="text-xs text-muted-foreground">{completedCount}/3 faites</span>
                                  <CompletionBadge rate={rate} />
                                </div>
                                <div className="space-y-1.5">
                                  {tasks.sort((a, b) => a.task_number - b.task_number).map(t => (
                                    <div key={t.id} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${t.completed ? 'opacity-55' : ''}`} style={{ background: 'hsl(222 22% 12%)' }}>
                                      <span className="w-5 text-center font-bold" style={{ color: t.completed ? 'hsl(142 71% 50%)' : 'hsl(220 10% 50%)' }}>{t.completed ? '✓' : t.task_number}</span>
                                      <p className={`flex-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</p>
                                      <span className="text-muted-foreground">{t.subject}</span>
                                      {t.method && <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'hsl(222 22% 16%)', color: 'hsl(220 10% 55%)' }}>{t.method}</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {Object.keys(grouped).length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">✏️ Tâches perso</p>
                        <div className="space-y-4">
                          {Object.keys(grouped).map(day => (
                            <div key={day}>
                              <p className="text-[10px] text-muted-foreground capitalize mb-2 uppercase tracking-widest">{day}</p>
                              <div className="space-y-1.5">
                                {grouped[day].map(t => (
                                  <div key={t.id} className={`p-3 rounded-xl border text-xs ${t.completed ? 'opacity-50' : ''}`} style={{ background: 'hsl(222 22% 9%)', borderColor: 'hsl(222 16% 16%)' }}>
                                    <div className="flex items-center gap-2">
                                      <img src={t.avatarUrl} alt={t.pseudo} className="w-5 h-5 rounded-full" />
                                      <span className="font-medium">{t.pseudo}</span>
                                      {t.completed && <span style={{ color: 'hsl(142 71% 50%)' }}>✓</span>}
                                      <SubjectDot subject={t.subject} />
                                      <span className="text-muted-foreground">{t.subject}</span>
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ color: PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium, background: `${PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium}15` }}>
                                        {PRIORITY_LABELS[t.priority] || PRIORITY_LABELS.medium}
                                      </span>
                                      <span className="ml-auto" style={{ color: 'hsl(43 90% 55%)' }}>+{t.xp_reward} XP</span>
                                    </div>
                                    <p className={`mt-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</p>
                                    {t.deadline && <span className="text-muted-foreground">Échéance : {new Date(t.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {Object.keys(grouped).length === 0 && Object.keys(byStudent).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">Aucune tâche ✏️</p>
                    )}
                  </div>
                );
              })()}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ══════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════ */}

      {/* Quick quest */}
      {quickQuestFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setQuickQuestFor(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="game-panel bg-card border border-border rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-base font-bold mb-1" style={{ color: 'hsl(43 90% 62%)' }}>⚡ Quête rapide</h2>
            <p className="text-xs text-muted-foreground mb-4">En {quickQuestFor.subject} · 100 XP · Difficulté moyenne</p>
            <input type="text" placeholder="Titre de la quête..." value={quickQuestTitle} onChange={e => setQuickQuestTitle(e.target.value)} autoFocus
              className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 mb-4"
              style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }}
            />
            <div className="flex gap-3">
              <button onClick={() => setQuickQuestFor(null)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
              <button onClick={handleQuickQuest} disabled={creating || !quickQuestTitle.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)' }}>
                {creating && <Loader2 size={13} className="animate-spin" />} Assigner
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Student */}
      {showCreateStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setShowCreateStudent(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="game-panel animated-border bg-card border border-border rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <UserPlus size={16} style={{ color: 'hsl(43 90% 55%)' }} />
              <h2 className="font-display text-base font-bold" style={{ color: 'hsl(43 90% 62%)' }}>Créer un élève</h2>
            </div>
            <form onSubmit={handleCreateStudent} className="space-y-3">
              {[
                { label: 'Pseudo', key: 'pseudo', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Mot de passe', key: 'password', type: 'password' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    type={f.type} required value={(newStudent as any)[f.key]}
                    onChange={e => setNewStudent(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Avatar</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {AVATARS.map(a => (
                      <button key={a} type="button" onClick={() => setNewStudent(p => ({ ...p, avatar: a }))}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all hover:scale-110"
                        style={{ border: `2px solid ${newStudent.avatar === a ? 'hsl(43 90% 52%)' : 'hsl(222 16% 22%)'}`, background: newStudent.avatar === a ? 'hsl(43 90% 50% / 0.1)' : 'hsl(222 22% 11%)' }}
                      >{a}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Classe</label>
                  <select value={newStudent.class_level} onChange={e => setNewStudent(p => ({ ...p, class_level: e.target.value }))}
                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}
                  >
                    <option value="">Non définie</option>
                    {CLASS_LEVELS.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowCreateStudent(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)' }}>
                  {creating && <Loader2 size={13} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Coach */}
      {showCreateCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setShowCreateCoach(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="game-panel bg-card border rounded-2xl p-6 max-w-md w-full" style={{ borderColor: 'hsl(280 60% 45% / 0.35)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16} style={{ color: 'hsl(280 70% 70%)' }} />
              <h2 className="font-display text-base font-bold" style={{ color: 'hsl(280 70% 70%)' }}>Créer un compte tuteur</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Le compte sera créé sans vous déconnecter. Le tuteur pourra se connecter immédiatement.</p>
            <form onSubmit={handleCreateCoach} className="space-y-3">
              {[
                { label: 'Prénom / Nom', key: 'pseudo', type: 'text', placeholder: 'Ex: Marie D.' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'tuteur@exemple.com' },
                { label: 'Mot de passe temporaire', key: 'password', type: 'password', placeholder: 'Min. 6 caractères' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    type={f.type} required minLength={f.key === 'password' ? 6 : undefined}
                    placeholder={f.placeholder}
                    value={(newCoach as any)[f.key]}
                    onChange={e => setNewCoach(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(280 40% 30% / 0.4)', color: 'hsl(220 10% 90%)' }}
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowCreateCoach(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(280 50% 38%), hsl(280 60% 55%))', color: 'white' }}>
                  {creating && <Loader2 size={13} className="animate-spin" />} Créer le tuteur
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Quest */}
      {showCreateQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setShowCreateQuest(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="game-panel bg-card border border-border rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} style={{ color: 'hsl(270 70% 65%)' }} />
              <h2 className="font-display text-base font-bold" style={{ color: 'hsl(270 70% 70%)' }}>Créer une quête</h2>
            </div>
            <form onSubmit={handleCreateQuest} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Titre</label>
                <input type="text" required value={newQuest.title} onChange={e => setNewQuest(p => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Description</label>
                <textarea value={newQuest.description} onChange={e => setNewQuest(p => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[56px] resize-none"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Matière', key: 'subject', options: SUBJECTS.map(s => ({ v: s, l: s })) },
                  { label: 'Difficulté', key: 'difficulty', options: [{ v: 'easy', l: '★ Facile' }, { v: 'medium', l: '★★ Moyen' }, { v: 'hard', l: '★★★ Difficile' }] },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">{f.label}</label>
                    <select value={(newQuest as any)[f.key]} onChange={e => setNewQuest(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}
                    >
                      {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">XP</label>
                  <input type="number" min={10} value={newQuest.xp_reward} onChange={e => setNewQuest(p => ({ ...p, xp_reward: parseInt(e.target.value) || 50 }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 90%)' }}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Date limite</label>
                  <input type="date" value={newQuest.deadline} onChange={e => setNewQuest(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                    style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Assigner à</label>
                <select required value={newQuest.assigned_to} onChange={e => setNewQuest(p => ({ ...p, assigned_to: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  style={{ background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 16% 20%)', color: 'hsl(220 10% 80%)' }}
                >
                  <option value="">Choisir...</option>
                  <option value="all">Tous les élèves</option>
                  {questStudents.map(s => <option key={s.user_id} value={s.user_id}>{s.pseudo}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowCreateQuest(false)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(270 50% 38%), hsl(270 60% 55%))', color: 'white' }}>
                  {creating && <Loader2 size={13} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* AI Plan */}
      {generatedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setGeneratedPlan(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="game-panel bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold flex items-center gap-2" style={{ color: 'hsl(43 90% 62%)' }}>
                <Sparkles size={16} style={{ color: 'hsl(43 90% 55%)' }} /> Plan de la semaine
              </h2>
              <button onClick={() => setGeneratedPlan(null)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
            </div>
            <div className="text-sm whitespace-pre-wrap mb-6 text-foreground/90 leading-relaxed">{generatedPlan.content}</div>
            <div className="flex gap-3">
              <button onClick={() => setGeneratedPlan(null)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Rejeter</button>
              <button onClick={handleValidatePlan} disabled={validatingPlan} className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 52%))', color: 'hsl(222 22% 8%)' }}>
                {validatingPlan ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                Valider et envoyer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Photo preview */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.9)', backdropFilter: 'blur(8px)' }} onClick={() => setPreviewPhoto(null)}>
          <div className="max-w-2xl max-h-[80vh] overflow-auto rounded-2xl border border-border" onClick={e => e.stopPropagation()}>
            <img src={previewPhoto} alt="Contrôle" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'hsl(222 22% 4% / 0.8)', backdropFilter: 'blur(8px)' }} onClick={() => setConfirmDelete(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border rounded-2xl p-6 max-w-sm w-full" style={{ borderColor: 'hsl(0 84% 55% / 0.4)' }} onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-base font-bold mb-2" style={{ color: 'hsl(0 84% 65%)' }}>⚠️ Supprimer l'élève</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Supprimer <strong className="text-foreground">{confirmDelete.pseudo}</strong> ? Toutes ses données seront effacées définitivement.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ borderColor: 'hsl(222 16% 20%)' }}>Annuler</button>
              <button onClick={() => handleDeleteStudent(confirmDelete.userId)} disabled={deletingStudent === confirmDelete.userId}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'hsl(0 84% 55%)', color: 'white' }}
              >
                {deletingStudent === confirmDelete.userId && <Loader2 size={13} className="animate-spin" />}
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
