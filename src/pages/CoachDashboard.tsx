import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, BookOpen, TrendingUp, LogOut, Plus, UserPlus, Loader2, MessageCircle, ChevronDown, ChevronUp, X } from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, AVATARS, Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface Alert {
  type: 'danger' | 'warning' | 'info';
  message: string;
  icon: typeof AlertTriangle;
}

interface StudentDifficulty {
  id: string;
  user_id: string;
  subject: string;
  severity: string;
  description: string;
  resolved: boolean;
  coach_reply: string | null;
  created_at: string;
  pseudo?: string;
  avatar?: string;
}

interface StudentExam {
  id: string;
  user_id: string;
  subject: string;
  exam_date: string;
  chapters: string | null;
  stress_level: string;
  grade: number | null;
  pseudo?: string;
  avatar?: string;
}

interface StudentTask {
  id: string;
  user_id: string;
  description: string;
  subject: string;
  difficulty: string;
  xp_reward: number;
  completed: boolean;
  deadline: string | null;
  pseudo?: string;
  avatar?: string;
}

const alertStyles = {
  danger: { bg: 'hsl(var(--destructive) / 0.08)', border: 'hsl(var(--destructive) / 0.25)', color: 'hsl(var(--destructive))' },
  warning: { bg: 'hsl(var(--xp) / 0.08)', border: 'hsl(var(--xp) / 0.25)', color: 'hsl(var(--xp))' },
  info: { bg: 'hsl(var(--primary) / 0.08)', border: 'hsl(var(--primary) / 0.25)', color: 'hsl(var(--primary))' },
};

const SEVERITY_LABELS: Record<string, { label: string; color: string }> = {
  blocking: { label: '🔴 Bloquant', color: 'hsl(0 84% 60%)' },
  fragile: { label: '🟡 Fragile', color: 'hsl(38 92% 55%)' },
  ok: { label: '🟢 Gérable', color: 'hsl(142 71% 45%)' },
};

const STRESS_LABELS: Record<string, string> = {
  stressed: '😰 Stressé',
  neutral: '😐 Neutre',
  calm: '😊 Serein',
};

function CompletionBadge({ rate }: { rate: number }) {
  const style = rate >= 80
    ? { backgroundColor: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }
    : rate >= 50
      ? { backgroundColor: 'hsl(var(--xp) / 0.15)', color: 'hsl(var(--xp))' }
      : { backgroundColor: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' };
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={style}>{rate}%</span>;
}

export default function CoachDashboard() {
  const { signOut } = useAuth();
  const [students, setStudents] = useState<(Profile & { completionRate: number; totalHours: number; lastActive: string })[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [newStudent, setNewStudent] = useState({ pseudo: '', email: '', password: '', avatar: '🐺' });
  const [newQuest, setNewQuest] = useState({ title: '', description: '', subject: 'Maths' as string, difficulty: 'medium' as string, xp_reward: 100, deadline: '', assigned_to: '' });
  const [creating, setCreating] = useState(false);
  const [questStudents, setQuestStudents] = useState<Profile[]>([]);

  // New state for student data
  const [difficulties, setDifficulties] = useState<StudentDifficulty[]>([]);
  const [exams, setExams] = useState<StudentExam[]>([]);
  const [studentTasks, setStudentTasks] = useState<StudentTask[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const loadData = async () => {
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');

    if (!profiles || !roles) { setLoading(false); return; }

    const studentUserIds = roles.filter(r => r.role === 'student').map(r => r.user_id);
    const studentProfiles = profiles.filter(p => studentUserIds.includes(p.user_id));
    const profileMap = Object.fromEntries(studentProfiles.map(p => [p.user_id, p]));

    const { data: allQuests } = await supabase.from('quests').select('*');
    const { data: allSessions } = await supabase.from('timer_sessions').select('user_id, duration_minutes');

    // Load difficulties, exams, student_tasks
    const [{ data: diffs }, { data: examsData }, { data: tasksData }] = await Promise.all([
      supabase.from('difficulties').select('*').order('created_at', { ascending: false }),
      supabase.from('exams').select('*').order('exam_date', { ascending: true }),
      supabase.from('student_tasks').select('*').order('created_at', { ascending: false }),
    ]);

    if (diffs) {
      setDifficulties(diffs.map(d => ({
        ...d,
        pseudo: profileMap[d.user_id]?.pseudo,
        avatar: profileMap[d.user_id]?.avatar,
      })));
    }
    if (examsData) {
      setExams(examsData.map(e => ({
        ...e,
        pseudo: profileMap[e.user_id]?.pseudo,
        avatar: profileMap[e.user_id]?.avatar,
      })));
    }
    if (tasksData) {
      setStudentTasks(tasksData.map(t => ({
        ...t,
        pseudo: profileMap[t.user_id]?.pseudo,
        avatar: profileMap[t.user_id]?.avatar,
      })));
    }

    const enriched = studentProfiles.map(p => {
      const userQuests = (allQuests || []).filter(q => q.assigned_to === p.user_id);
      const completed = userQuests.filter(q => q.completed).length;
      const total = userQuests.length;
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 100;
      const totalMinutes = (allSessions || []).filter(s => s.user_id === p.user_id).reduce((a, s) => a + s.duration_minutes, 0);
      const totalHours = Math.round(totalMinutes / 60);
      const lastActive = p.last_activity_date
        ? (new Date(p.last_activity_date).toDateString() === new Date().toDateString() ? "Aujourd'hui" : p.last_activity_date)
        : 'Jamais';
      return { ...p, completionRate, totalHours, lastActive };
    });

    setStudents(enriched);
    setQuestStudents(studentProfiles);

    // Alerts
    const newAlerts: Alert[] = [];
    enriched.forEach(s => {
      if (s.streak === 0) newAlerts.push({ type: 'danger', message: `${s.pseudo} — Série à 0`, icon: AlertTriangle });
      if (s.completionRate < 50) newAlerts.push({ type: 'warning', message: `${s.pseudo} — Complétion à ${s.completionRate}%`, icon: Clock });
    });

    // Urgent difficulties
    const unresolvedBlocking = (diffs || []).filter(d => !d.resolved && d.severity === 'blocking');
    unresolvedBlocking.forEach(d => {
      const name = profileMap[d.user_id]?.pseudo || 'Élève';
      newAlerts.push({ type: 'danger', message: `${name} — Difficulté bloquante en ${d.subject}`, icon: AlertTriangle });
    });

    // Upcoming exams within 3 days
    const now = new Date();
    const upcomingExams = (examsData || []).filter(e => {
      const diff = (new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 3 && e.grade === null;
    });
    upcomingExams.forEach(e => {
      const name = profileMap[e.user_id]?.pseudo || 'Élève';
      newAlerts.push({ type: 'warning', message: `${name} — DS ${e.subject} dans ${Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))}j`, icon: BookOpen });
    });

    const todayCompleted = (allQuests || []).filter(q => q.completed && q.completed_at && new Date(q.completed_at).toDateString() === new Date().toDateString()).length;
    if (todayCompleted > 0) newAlerts.push({ type: 'info', message: `${todayCompleted} quête${todayCompleted > 1 ? 's' : ''} complétée${todayCompleted > 1 ? 's' : ''} aujourd'hui`, icon: BookOpen });

    setAlerts(newAlerts);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const channel = supabase
      .channel('coach-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'timer_sessions' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'student_tasks' }, () => loadData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleReply = async (diffId: string) => {
    if (!replyText.trim()) return;
    await supabase.from('difficulties').update({ coach_reply: replyText.trim(), resolved: true }).eq('id', diffId);
    setReplyText('');
    setReplyingTo(null);
    loadData();
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data, error } = await supabase.auth.signUp({
      email: newStudent.email,
      password: newStudent.password,
      options: { data: { pseudo: newStudent.pseudo, avatar: newStudent.avatar } },
    });
    if (error || !data.user) {
      alert('Erreur: ' + (error?.message || 'Impossible de créer le compte'));
      setCreating(false);
      return;
    }
    await supabase.from('user_roles').insert({ user_id: data.user.id, role: 'student' as Database['public']['Enums']['app_role'] });
    setNewStudent({ pseudo: '', email: '', password: '', avatar: '🐺' });
    setShowCreateStudent(false);
    setCreating(false);
    loadData();
  };

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const targets = newQuest.assigned_to === 'all' ? questStudents.map(s => s.user_id) : [newQuest.assigned_to];
    for (const userId of targets) {
      await supabase.from('quests').insert({
        assigned_to: userId,
        title: newQuest.title,
        description: newQuest.description || null,
        subject: newQuest.subject as Database['public']['Enums']['subject_type'],
        difficulty: newQuest.difficulty as Database['public']['Enums']['difficulty_level'],
        xp_reward: newQuest.xp_reward,
        deadline: newQuest.deadline || null,
      });
    }
    setNewQuest({ title: '', description: '', subject: 'Maths', difficulty: 'medium', xp_reward: 100, deadline: '', assigned_to: '' });
    setShowCreateQuest(false);
    setCreating(false);
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const dangerCount = students.filter(s => s.completionRate < 50 || s.streak === 0).length;
  const unresolvedDiffs = difficulties.filter(d => !d.resolved);
  const now = new Date();
  const upcomingExams = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-lg font-semibold">Centre de Commande</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowCreateStudent(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors">
              <UserPlus size={14} /> Élève
            </button>
            <button onClick={() => setShowCreateQuest(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
              <Plus size={14} /> Quête
            </button>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mb-6">
          <span className="text-destructive font-medium">{dangerCount} élève{dangerCount > 1 ? 's' : ''}</span> {dangerCount > 1 ? 'ont' : 'a'} besoin d'attention.
          {unresolvedDiffs.length > 0 && (
            <span className="ml-2 text-streak">· {unresolvedDiffs.length} difficulté{unresolvedDiffs.length > 1 ? 's' : ''} en attente</span>
          )}
        </motion.p>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2 mb-6">
            {alerts.map((alert, i) => {
              const s = alertStyles[alert.type];
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm"
                  style={{ backgroundColor: s.bg, borderColor: s.border, color: s.color }}>
                  <alert.icon size={16} />
                  <span>{alert.message}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Élèves', value: students.length, icon: '👥' },
            { label: 'XP moyen', value: students.length > 0 ? Math.round(students.reduce((a, s) => a + s.total_xp, 0) / students.length).toLocaleString() : '0', icon: '⚡' },
            { label: 'Série moyenne', value: students.length > 0 ? Math.round(students.reduce((a, s) => a + s.streak, 0) / students.length) : 0, icon: '🔥' },
            { label: 'Heures totales', value: students.reduce((a, s) => a + s.totalHours, 0), icon: '⏱' },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-display text-2xl font-bold tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Tabs: Élèves / Difficultés / DS / Tâches */}
        <Tabs defaultValue="students" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="students">👥 Élèves</TabsTrigger>
            <TabsTrigger value="difficulties" className="relative">
              ⚠️ Difficultés
              {unresolvedDiffs.length > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                  {unresolvedDiffs.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="exams">
              📝 DS
              {upcomingExams.length > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                  {upcomingExams.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="tasks">✏️ Tâches perso</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-base font-semibold">Tous les élèves</h2>
                <TrendingUp size={16} className="text-muted-foreground" />
              </div>
              {students.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">Aucun élève. Créez-en un pour commencer.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border text-left text-[11px] text-muted-foreground uppercase tracking-wider">
                        <th className="px-5 py-3">Élève</th>
                        <th className="px-5 py-3">Niveau</th>
                        <th className="px-5 py-3">XP</th>
                        <th className="px-5 py-3">Série</th>
                        <th className="px-5 py-3">Complétion</th>
                        <th className="px-5 py-3">Heures</th>
                        <th className="px-5 py-3">Activité</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => {
                        const { level } = calculateLevel(student.total_xp);
                        const studentTitle = getTitleForLevel(level);
                        const isExpanded = expandedStudent === student.user_id;
                        const sDiffs = difficulties.filter(d => d.user_id === student.user_id);
                        const sExams = exams.filter(e => e.user_id === student.user_id);
                        const sTasks = studentTasks.filter(t => t.user_id === student.user_id);

                        return (
                          <>
                            <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer" onClick={() => setExpandedStudent(isExpanded ? null : student.user_id)}>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{student.avatar}</span>
                                  <span className="font-medium text-sm">{student.pseudo}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="font-display text-sm">{level}</span>
                                <span className="text-[11px] text-muted-foreground ml-1">{studentTitle}</span>
                              </td>
                              <td className="px-5 py-3.5 tabular-nums text-sm">{student.total_xp.toLocaleString()}</td>
                              <td className="px-5 py-3.5">
                                <span style={{ color: student.streak > 0 ? 'hsl(var(--streak))' : 'hsl(var(--destructive))' }}>
                                  🔥 {student.streak}
                                </span>
                              </td>
                              <td className="px-5 py-3.5"><CompletionBadge rate={student.completionRate} /></td>
                              <td className="px-5 py-3.5 tabular-nums text-sm">{student.totalHours}h</td>
                              <td className="px-5 py-3.5 text-sm text-muted-foreground">{student.lastActive}</td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  {sDiffs.filter(d => !d.resolved).length > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-destructive/20 text-destructive text-[10px] flex items-center justify-center">
                                      {sDiffs.filter(d => !d.resolved).length}
                                    </span>
                                  )}
                                  {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr key={`${student.id}-detail`}>
                                <td colSpan={8} className="px-5 py-4 bg-secondary/20">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Difficulties */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                        Difficultés ({sDiffs.length})
                                      </h4>
                                      {sDiffs.length === 0 ? (
                                        <p className="text-xs text-muted-foreground">Aucune</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {sDiffs.map(d => (
                                            <div key={d.id} className={`p-2 rounded border text-xs ${d.resolved ? 'border-border/50 opacity-60' : 'border-border'}`}>
                                              <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject] || '--muted'}))` }} />
                                                <span>{d.subject}</span>
                                                <span style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                                              </div>
                                              <p className="text-foreground">{d.description}</p>
                                              {d.coach_reply && (
                                                <div className="mt-1 p-1.5 rounded bg-primary/10 text-primary text-[11px]">
                                                  💬 {d.coach_reply}
                                                </div>
                                              )}
                                              {!d.resolved && !d.coach_reply && (
                                                <div className="mt-2">
                                                  {replyingTo === d.id ? (
                                                    <div className="space-y-1">
                                                      <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Répondre..." className="min-h-[40px] text-xs" />
                                                      <div className="flex gap-1">
                                                        <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)} className="h-6 text-[10px]">Annuler</Button>
                                                        <Button size="sm" onClick={() => handleReply(d.id)} className="h-6 text-[10px]">Envoyer</Button>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <button onClick={(e) => { e.stopPropagation(); setReplyingTo(d.id); setReplyText(''); }}
                                                      className="flex items-center gap-1 text-primary text-[11px] hover:underline">
                                                      <MessageCircle size={10} /> Répondre
                                                    </button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Exams */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                        DS ({sExams.length})
                                      </h4>
                                      {sExams.length === 0 ? (
                                        <p className="text-xs text-muted-foreground">Aucun</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {sExams.map(e => {
                                            const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                            const isPast = daysUntil < 0;
                                            return (
                                              <div key={e.id} className={`p-2 rounded border text-xs ${isPast ? 'border-border/50 opacity-60' : daysUntil <= 3 ? 'border-destructive/50' : 'border-border'}`}>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[e.subject as Subject] || '--muted'}))` }} />
                                                  <span className="font-medium">{e.subject}</span>
                                                  <span className="text-muted-foreground ml-auto">
                                                    {new Date(e.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                  </span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                                                  {e.chapters && <span className="text-muted-foreground truncate">· {e.chapters}</span>}
                                                  {e.grade !== null && <span className="ml-auto font-medium">{e.grade}/20</span>}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>

                                    {/* Tasks */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                        Tâches perso ({sTasks.length})
                                      </h4>
                                      {sTasks.length === 0 ? (
                                        <p className="text-xs text-muted-foreground">Aucune</p>
                                      ) : (
                                        <div className="space-y-2">
                                          {sTasks.map(t => (
                                            <div key={t.id} className={`p-2 rounded border text-xs ${t.completed ? 'border-border/50 opacity-60' : 'border-border'}`}>
                                              <div className="flex items-center gap-2">
                                                {t.completed && <span className="text-success">✓</span>}
                                                <span className={t.completed ? 'line-through' : ''}>{t.description}</span>
                                              </div>
                                              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                                <span>{t.subject}</span>
                                                <span>·</span>
                                                <span>+{t.xp_reward} XP</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Difficulties Tab */}
          <TabsContent value="difficulties">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-display text-base font-semibold mb-4">
                Toutes les difficultés ({unresolvedDiffs.length} non résolues)
              </h2>
              <div className="space-y-3">
                {difficulties.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">Aucune difficulté signalée 🎉</p>
                ) : (
                  difficulties.map(d => (
                    <div key={d.id} className={`p-4 rounded-lg border ${d.resolved ? 'border-border/50 opacity-60' : d.severity === 'blocking' ? 'border-destructive/40 bg-destructive/5' : 'border-border'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{d.avatar}</span>
                        <span className="font-medium text-sm">{d.pseudo}</span>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject] || '--muted'}))` }} />
                        <span className="text-xs text-muted-foreground">{d.subject}</span>
                        <span className="text-xs" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                        {d.resolved && <span className="text-xs text-success">✓ Résolu</span>}
                      </div>
                      <p className="text-sm mb-2">{d.description}</p>
                      {d.coach_reply && (
                        <div className="p-2 rounded bg-primary/10 border border-primary/20 text-sm">
                          <span className="text-primary text-xs font-medium">💬 Coach :</span> {d.coach_reply}
                        </div>
                      )}
                      {!d.resolved && !d.coach_reply && (
                        <div className="mt-2">
                          {replyingTo === d.id ? (
                            <div className="space-y-2">
                              <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse..." className="min-h-[50px] text-sm" />
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Annuler</Button>
                                <Button size="sm" onClick={() => handleReply(d.id)} disabled={!replyText.trim()}>Envoyer</Button>
                              </div>
                            </div>
                          ) : (
                            <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }}
                              className="flex items-center gap-1.5 text-primary text-sm hover:underline">
                              <MessageCircle size={14} /> Répondre
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-display text-base font-semibold mb-4">
                Tous les DS ({upcomingExams.length} à venir)
              </h2>
              <div className="space-y-3">
                {exams.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">Aucun DS déclaré 📝</p>
                ) : (
                  exams.map(e => {
                    const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    const isPast = daysUntil < 0;
                    return (
                      <div key={e.id} className={`p-4 rounded-lg border ${isPast ? 'border-border/50 opacity-60' : daysUntil <= 3 ? 'border-destructive/40 bg-destructive/5' : 'border-border'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{e.avatar}</span>
                          <span className="font-medium text-sm">{e.pseudo}</span>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[e.subject as Subject] || '--muted'}))` }} />
                          <span className="text-sm">{e.subject}</span>
                          <span className="text-sm text-muted-foreground ml-auto">
                            {new Date(e.exam_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </span>
                          {!isPast && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{daysUntil === 0 ? "Aujourd'hui" : `${daysUntil}j`}</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                          {e.chapters && <span className="text-muted-foreground">Chapitres : {e.chapters}</span>}
                          {e.grade !== null && <span className="ml-auto font-display font-semibold">{e.grade}/20</span>}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-display text-base font-semibold mb-4">
                Tâches personnelles des élèves ({studentTasks.filter(t => !t.completed).length} actives)
              </h2>
              <div className="space-y-3">
                {studentTasks.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">Aucune tâche personnelle ✏️</p>
                ) : (
                  studentTasks.map(t => (
                    <div key={t.id} className={`p-4 rounded-lg border ${t.completed ? 'border-border/50 opacity-60' : 'border-border'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{t.avatar}</span>
                        <span className="font-medium text-sm">{t.pseudo}</span>
                        {t.completed && <span className="text-success text-xs">✓</span>}
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[t.subject as Subject] || '--muted'}))` }} />
                        <span className="text-xs text-muted-foreground">{t.subject}</span>
                        <span className="text-xs ml-auto" style={{ color: 'hsl(var(--xp))' }}>+{t.xp_reward} XP</span>
                      </div>
                      <p className={`text-sm mt-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</p>
                      {t.deadline && (
                        <span className="text-xs text-muted-foreground mt-1 block">
                          Échéance : {new Date(t.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Student Modal */}
      {showCreateStudent && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setShowCreateStudent(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-lg font-semibold mb-4">Créer un élève</h2>
            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pseudo</label>
                <input type="text" required value={newStudent.pseudo} onChange={e => setNewStudent(p => ({ ...p, pseudo: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input type="email" required value={newStudent.email} onChange={e => setNewStudent(p => ({ ...p, email: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Mot de passe</label>
                <input type="password" required minLength={6} value={newStudent.password} onChange={e => setNewStudent(p => ({ ...p, password: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Avatar</label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map(a => (
                    <button key={a} type="button" onClick={() => setNewStudent(p => ({ ...p, avatar: a }))} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border ${newStudent.avatar === a ? 'border-primary bg-primary/10' : 'border-border'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateStudent(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {creating && <Loader2 size={14} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Create Quest Modal */}
      {showCreateQuest && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setShowCreateQuest(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-lg font-semibold mb-4">Créer une quête</h2>
            <form onSubmit={handleCreateQuest} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Titre</label>
                <input type="text" required value={newQuest.title} onChange={e => setNewQuest(p => ({ ...p, title: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                <textarea value={newQuest.description} onChange={e => setNewQuest(p => ({ ...p, description: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Matière</label>
                  <select value={newQuest.subject} onChange={e => setNewQuest(p => ({ ...p, subject: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Difficulté</label>
                  <select value={newQuest.difficulty} onChange={e => setNewQuest(p => ({ ...p, difficulty: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                    <option value="easy">★ Facile</option>
                    <option value="medium">★★ Moyen</option>
                    <option value="hard">★★★ Difficile</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">XP</label>
                  <input type="number" min={10} value={newQuest.xp_reward} onChange={e => setNewQuest(p => ({ ...p, xp_reward: parseInt(e.target.value) || 50 }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Date limite</label>
                  <input type="date" value={newQuest.deadline} onChange={e => setNewQuest(p => ({ ...p, deadline: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Assigner à</label>
                <select required value={newQuest.assigned_to} onChange={e => setNewQuest(p => ({ ...p, assigned_to: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                  <option value="">Choisir...</option>
                  <option value="all">Tous les élèves</option>
                  {questStudents.map(s => <option key={s.user_id} value={s.user_id}>{s.avatar} {s.pseudo}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateQuest(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
                <button type="submit" disabled={creating} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {creating && <Loader2 size={14} className="animate-spin" />} Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
