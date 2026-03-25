import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, BookOpen, TrendingUp, LogOut, Plus, UserPlus, Loader2, MessageCircle, ChevronDown, ChevronUp, X, Zap, Image, Filter, Trash2, Sparkles, Check, Camera, Circle } from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, AVATARS, Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Profile = Database['public']['Tables']['profiles']['Row'];

const CLASS_LEVELS = ['3ème', '2nde', '1ère', 'Tle'] as const;

interface UrgentAlert {
  studentName: string;
  avatar: string;
  reasons: string[];
  userId: string;
}

interface StudentDifficulty {
  id: string; user_id: string; subject: string; severity: string;
  description: string; resolved: boolean; coach_reply: string | null; created_at: string;
  pseudo?: string; avatar?: string;
}

interface StudentExam {
  id: string; user_id: string; subject: string; exam_date: string;
  chapters: string | null; stress_level: string; grade: number | null; photo_url?: string | null;
  pseudo?: string; avatar?: string;
}

interface StudentTask {
  id: string; user_id: string; description: string; subject: string;
  difficulty: string; xp_reward: number; completed: boolean; deadline: string | null;
  completed_at: string | null; created_at: string; priority: string;
  pseudo?: string; avatar?: string;
}

const SEVERITY_LABELS: Record<string, { label: string; color: string }> = {
  blocking: { label: '🔴 Bloquant', color: 'hsl(0 84% 60%)' },
  fragile: { label: '🟡 Fragile', color: 'hsl(38 92% 55%)' },
  ok: { label: '🟢 Gérable', color: 'hsl(142 71% 45%)' },
};

const STRESS_LABELS: Record<string, string> = {
  stressed: '😰 Stressé', neutral: '😐 Neutre', calm: '😊 Serein',
};

function CompletionBadge({ rate }: { rate: number }) {
  const style = rate >= 80
    ? { backgroundColor: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }
    : rate >= 50
      ? { backgroundColor: 'hsl(var(--xp) / 0.15)', color: 'hsl(var(--xp))' }
      : { backgroundColor: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' };
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={style}>{rate}%</span>;
}

function OnlineIndicator({ lastSeenAt }: { lastSeenAt: string | null }) {
  if (!lastSeenAt) return <span className="text-xs text-muted-foreground">Jamais</span>;
  const diff = (Date.now() - new Date(lastSeenAt).getTime()) / 1000;
  const isOnline = diff < 120; // 2 min
  const isRecent = diff < 300; // 5 min

  if (isOnline) {
    return (
      <span className="flex items-center gap-1 text-xs" style={{ color: 'hsl(var(--success))' }}>
        <Circle size={8} fill="currentColor" /> En ligne
      </span>
    );
  }

  // Format last seen
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let label = '';
  if (days > 0) label = `il y a ${days}j`;
  else if (hours > 0) label = `il y a ${hours}h`;
  else if (minutes > 0) label = `il y a ${minutes}min`;
  else label = 'à l\'instant';

  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Circle size={8} fill={isRecent ? 'hsl(var(--xp))' : 'currentColor'} className={isRecent ? '' : 'opacity-30'} /> {label}
    </span>
  );
}

export default function CoachDashboard() {
  const { signOut } = useAuth();
  const [students, setStudents] = useState<(Profile & { completionRate: number; totalHours: number; lastActive: string; last_seen_at: string | null; class_level: string | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showCreateQuest, setShowCreateQuest] = useState(false);
  const [newStudent, setNewStudent] = useState({ pseudo: '', email: '', password: '', avatar: '🐺', class_level: '' });
  const [newQuest, setNewQuest] = useState({ title: '', description: '', subject: 'Maths' as string, difficulty: 'medium' as string, xp_reward: 100, deadline: '', assigned_to: '' });
  const [creating, setCreating] = useState(false);
  const [questStudents, setQuestStudents] = useState<Profile[]>([]);

  const [difficulties, setDifficulties] = useState<StudentDifficulty[]>([]);
  const [exams, setExams] = useState<StudentExam[]>([]);
  const [studentTasks, setStudentTasks] = useState<StudentTask[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [urgentAlerts, setUrgentAlerts] = useState<UrgentAlert[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ userId: string; pseudo: string } | null>(null);

  // AI Plan state
  const [generatingPlan, setGeneratingPlan] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<{ userId: string; content: string } | null>(null);
  const [validatingPlan, setValidatingPlan] = useState(false);

  // Baselines
  const [baselines, setBaselines] = useState<Record<string, boolean>>({});

  // Quick quest from difficulty
  const [quickQuestFor, setQuickQuestFor] = useState<{ diffId: string; userId: string; subject: string } | null>(null);
  const [quickQuestTitle, setQuickQuestTitle] = useState('');

  const loadData = async () => {
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');
    if (!profiles || !roles) { setLoading(false); return; }

    const studentUserIds = roles.filter(r => r.role === 'student').map(r => r.user_id);
    const studentProfiles = profiles.filter(p => studentUserIds.includes(p.user_id));
    const profileMap = Object.fromEntries(studentProfiles.map(p => [p.user_id, p]));

    const { data: allQuests } = await supabase.from('quests').select('*');
    const { data: allSessions } = await supabase.from('timer_sessions').select('user_id, duration_minutes');

    const [{ data: diffs }, { data: examsData }, { data: tasksData }] = await Promise.all([
      supabase.from('difficulties').select('*').order('created_at', { ascending: false }),
      supabase.from('exams').select('*').order('exam_date', { ascending: true }),
      supabase.from('student_tasks').select('*').order('created_at', { ascending: false }),
    ]);

    if (diffs) setDifficulties(diffs.map(d => ({ ...d, pseudo: profileMap[d.user_id]?.pseudo, avatar: profileMap[d.user_id]?.avatar })));
    if (examsData) setExams(examsData.map(e => ({ ...e, photo_url: (e as any).photo_url, pseudo: profileMap[e.user_id]?.pseudo, avatar: profileMap[e.user_id]?.avatar })));
    if (tasksData) setStudentTasks(tasksData.map(t => ({ ...t, pseudo: profileMap[t.user_id]?.pseudo, avatar: profileMap[t.user_id]?.avatar })));

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
      return { ...p, completionRate, totalHours, lastActive, last_seen_at: p.last_seen_at, class_level: p.class_level };
    });

    setStudents(enriched);
    setQuestStudents(studentProfiles);

    // Build urgent alerts grouped by student
    const now = new Date();
    const alertMap: Record<string, UrgentAlert> = {};
    const ensureAlert = (userId: string) => {
      if (!alertMap[userId]) {
        const p = profileMap[userId];
        alertMap[userId] = { studentName: p?.pseudo || 'Élève', avatar: p?.avatar || '🐺', reasons: [], userId };
      }
    };

    enriched.forEach(s => {
      if (s.streak === 0) { ensureAlert(s.user_id); alertMap[s.user_id].reasons.push('Série à 0 🔥'); }
      if (s.completionRate < 50) { ensureAlert(s.user_id); alertMap[s.user_id].reasons.push(`Complétion à ${s.completionRate}%`); }
    });
    (diffs || []).filter(d => !d.resolved && d.severity === 'blocking').forEach(d => {
      ensureAlert(d.user_id); alertMap[d.user_id].reasons.push(`Difficulté bloquante en ${d.subject}`);
    });
    (examsData || []).forEach(e => {
      const diff = (new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 3 && e.grade === null) {
        ensureAlert(e.user_id); alertMap[e.user_id].reasons.push(`DS ${e.subject} dans ${Math.ceil(diff)}j`);
      }
      if (diff < 0 && e.grade === null) {
        ensureAlert(e.user_id); alertMap[e.user_id].reasons.push(`Résultat manquant : DS ${e.subject}`);
      }
    });

    setUrgentAlerts(Object.values(alertMap).sort((a, b) => b.reasons.length - a.reasons.length));

    // Load baselines
    const { data: blData } = await supabase.from('student_baselines').select('user_id');
    if (blData) {
      const blMap: Record<string, boolean> = {};
      blData.forEach((b: any) => { blMap[b.user_id] = true; });
      setBaselines(blMap);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const channel = supabase.channel('coach-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'timer_sessions' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' }, () => loadData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'student_tasks' }, () => loadData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Refresh online status every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render to update relative time
      setStudents(prev => [...prev]);
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

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
    // Set class level if selected
    if (newStudent.class_level) {
      await supabase.from('profiles').update({ class_level: newStudent.class_level }).eq('user_id', data.user.id);
    }
    setNewStudent({ pseudo: '', email: '', password: '', avatar: '🐺', class_level: '' }); setShowCreateStudent(false); setCreating(false); loadData();
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await supabase.functions.invoke('delete-student', {
        body: { studentUserId: userId },
      });
      if (res.error) {
        alert('Erreur: ' + (res.error.message || 'Impossible de supprimer'));
      }
    } catch (e) {
      alert('Erreur lors de la suppression');
    }
    setDeletingStudent(null);
    setConfirmDelete(null);
    loadData();
  };

  const handleUpdateClassLevel = async (userId: string, classLevel: string) => {
    await supabase.from('profiles').update({ class_level: classLevel || null }).eq('user_id', userId);
    setStudents(prev => prev.map(s => s.user_id === userId ? { ...s, class_level: classLevel || null } : s));
  };

  const handleGeneratePlan = async (studentUserId: string) => {
    setGeneratingPlan(studentUserId);
    setGeneratedPlan(null);
    try {
      const { data, error } = await supabase.functions.invoke('generate-plan', {
        body: { studentUserId },
      });
      if (error) {
        alert('Erreur: ' + (error.message || 'Impossible de générer le plan'));
      } else if (data?.plan) {
        setGeneratedPlan({ userId: studentUserId, content: data.plan });
      }
    } catch (e) {
      alert('Erreur lors de la génération');
    }
    setGeneratingPlan(null);
  };

  const handleValidatePlan = async () => {
    if (!generatedPlan) return;
    setValidatingPlan(true);
    const { data: plans } = await supabase.from('weekly_plans').select('id').eq('user_id', generatedPlan.userId).eq('validated', false).order('created_at', { ascending: false }).limit(1);
    if (plans?.[0]) {
      await supabase.from('weekly_plans').update({ validated: true, validated_at: new Date().toISOString() }).eq('id', plans[0].id);
    }
    setValidatingPlan(false);
    setGeneratedPlan(null);
    loadData();
  };

  const handleCreateBaseline = async (studentUserId: string) => {
    const student = students.find(s => s.user_id === studentUserId);
    if (!student) return;
    const studentExams = exams.filter(e => e.user_id === studentUserId && e.grade !== null);
    const gradesBySubject: Record<string, number[]> = {};
    studentExams.forEach(e => {
      if (!gradesBySubject[e.subject]) gradesBySubject[e.subject] = [];
      gradesBySubject[e.subject].push(e.grade!);
    });
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

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const unresolvedDiffs = difficulties.filter(d => !d.resolved);
  const now = new Date();
  const upcomingExams = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null);
  const missingGradeExams = exams.filter(e => new Date(e.exam_date) < now && e.grade === null);

  const filteredDiffs = subjectFilter === 'all' ? difficulties : difficulties.filter(d => d.subject === subjectFilter);

  const onlineCount = students.filter(s => s.last_seen_at && (Date.now() - new Date(s.last_seen_at).getTime()) < 120_000).length;

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
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Urgent Alerts Banner */}
        {urgentAlerts.length > 0 && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: 'hsl(var(--destructive) / 0.06)', borderColor: 'hsl(var(--destructive) / 0.2)' }}>
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'hsl(var(--destructive))' }}>
              <AlertTriangle size={16} />
              {urgentAlerts.length} élève{urgentAlerts.length > 1 ? 's' : ''} {urgentAlerts.length > 1 ? 'nécessitent' : 'nécessite'} ton attention
            </h2>
            <div className="space-y-2">
              {urgentAlerts.map(alert => (
                <div key={alert.userId} className="flex items-start gap-3 p-2.5 rounded-lg bg-card border border-border">
                  <span className="text-lg">{alert.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium">{alert.studentName}</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {alert.reasons.map((r, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'hsl(var(--destructive) / 0.12)', color: 'hsl(var(--destructive))' }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'Élèves', value: students.length, icon: '👥' },
            { label: 'En ligne', value: onlineCount, icon: '🟢' },
            { label: 'XP moyen', value: students.length > 0 ? Math.round(students.reduce((a, s) => a + s.total_xp, 0) / students.length).toLocaleString() : '0', icon: '⚡' },
            { label: 'Série moyenne', value: students.length > 0 ? Math.round(students.reduce((a, s) => a + s.streak, 0) / students.length) : 0, icon: '🔥' },
            { label: 'Heures totales', value: students.reduce((a, s) => a + s.totalHours, 0), icon: '⏱' },
            { label: 'Notes manquantes', value: missingGradeExams.length, icon: '📋' },
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

        {/* Tabs */}
        <Tabs defaultValue="students" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="students">👥 Élèves</TabsTrigger>
            <TabsTrigger value="difficulties" className="relative">
              ⚠️ Difficultés
              {unresolvedDiffs.length > 0 && <span className="ml-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">{unresolvedDiffs.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="exams">
              📝 DS
              {(upcomingExams.length + missingGradeExams.length) > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">{upcomingExams.length + missingGradeExams.length}</span>
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
                        <th className="px-5 py-3">Classe</th>
                        <th className="px-5 py-3">Niveau</th>
                        <th className="px-5 py-3">XP</th>
                        <th className="px-5 py-3">Série</th>
                        <th className="px-5 py-3">Complétion</th>
                        <th className="px-5 py-3">Heures</th>
                        <th className="px-5 py-3">Statut</th>
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
                        const sMissing = sExams.filter(e => new Date(e.exam_date) < now && e.grade === null);

                        // Compute averages per subject for this student
                        const gradesBySubject: Record<string, number[]> = {};
                        sExams.forEach(e => { if (e.grade !== null) { if (!gradesBySubject[e.subject]) gradesBySubject[e.subject] = []; gradesBySubject[e.subject].push(e.grade); } });

                        return (
                          <AnimatePresence key={student.id}>
                            <tr className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer group" onClick={() => setExpandedStudent(isExpanded ? null : student.user_id)}>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{student.avatar}</span>
                                  <span className="font-medium text-sm">{student.pseudo}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <select
                                  value={student.class_level || ''}
                                  onChange={(e) => { e.stopPropagation(); handleUpdateClassLevel(student.user_id, e.target.value); }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-secondary border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                                >
                                  <option value="">—</option>
                                  {CLASS_LEVELS.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                                </select>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="font-display text-sm">{level}</span>
                                <span className="text-[11px] text-muted-foreground ml-1">{studentTitle}</span>
                              </td>
                              <td className="px-5 py-3.5 tabular-nums text-sm">{student.total_xp.toLocaleString()}</td>
                              <td className="px-5 py-3.5">
                                <span style={{ color: student.streak > 0 ? 'hsl(var(--streak))' : 'hsl(var(--destructive))' }}>🔥 {student.streak}</span>
                              </td>
                              <td className="px-5 py-3.5"><CompletionBadge rate={student.completionRate} /></td>
                              <td className="px-5 py-3.5 tabular-nums text-sm">{student.totalHours}h</td>
                              <td className="px-5 py-3.5">
                                <OnlineIndicator lastSeenAt={student.last_seen_at} />
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2">
                                  {sDiffs.filter(d => !d.resolved).length > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-destructive/20 text-destructive text-[10px] flex items-center justify-center">{sDiffs.filter(d => !d.resolved).length}</span>
                                  )}
                                  {sMissing.length > 0 && (
                                    <span className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--streak) / 0.2)', color: 'hsl(var(--streak))' }}>{sMissing.length}</span>
                                  )}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setConfirmDelete({ userId: student.user_id, pseudo: student.pseudo }); }}
                                    className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-50 hover:!opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                                    title="Supprimer l'élève"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                  {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr key={`${student.id}-detail`}>
                                <td colSpan={9} className="px-5 py-4 bg-secondary/20">
                                  {/* Action buttons */}
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleGeneratePlan(student.user_id); }}
                                      disabled={generatingPlan === student.user_id}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                      {generatingPlan === student.user_id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                                      {generatingPlan === student.user_id ? 'Génération...' : 'Générer un plan IA'}
                                    </button>
                                    {!baselines[student.user_id] ? (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleCreateBaseline(student.user_id); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-secondary transition-colors"
                                      >
                                        <Camera size={12} /> Prendre le snapshot initial
                                      </button>
                                    ) : (
                                      <span className="flex items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground">
                                        <Check size={12} style={{ color: 'hsl(var(--success))' }} /> Snapshot initial pris
                                      </span>
                                    )}
                                  </div>
                                  {/* Cumulative work time */}
                                  <div className="mb-4 p-3 rounded-lg border border-border bg-card flex items-center gap-2">
                                    <Clock size={14} className="text-primary" />
                                    <span className="text-xs text-muted-foreground">Temps total travaillé :</span>
                                    <span className="text-sm font-display font-semibold">{student.totalHours}h</span>
                                  </div>
                                  {/* Grade averages for this student */}
                                  {Object.keys(gradesBySubject).length > 0 && (
                                    <div className="flex flex-wrap gap-3 mb-4 p-3 rounded-lg border border-border bg-card">
                                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Moyennes :</span>
                                      {Object.entries(gradesBySubject).map(([subj, grades]) => {
                                        const avg = Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10;
                                        return (
                                          <span key={subj} className="flex items-center gap-1.5 text-xs">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[subj as Subject] || '--muted'}))` }} />
                                            {subj}:
                                            <span className="font-semibold" style={{ color: avg >= 14 ? 'hsl(var(--success))' : avg >= 10 ? 'hsl(var(--xp))' : 'hsl(var(--destructive))' }}>{avg}/20</span>
                                          </span>
                                        );
                                      })}
                                    </div>
                                  )}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Difficulties */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Difficultés ({sDiffs.length})</h4>
                                      {sDiffs.length === 0 ? <p className="text-xs text-muted-foreground">Aucune</p> : (
                                        <div className="space-y-2">
                                          {sDiffs.map(d => (
                                            <div key={d.id} className={`p-2 rounded border text-xs ${d.resolved ? 'border-border/50 opacity-60' : 'border-border'}`}>
                                              <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject] || '--muted'}))` }} />
                                                <span>{d.subject}</span>
                                                <span style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                                              </div>
                                              <p className="text-foreground">{d.description}</p>
                                              {d.coach_reply && <div className="mt-1 p-1.5 rounded bg-primary/10 text-primary text-[11px]">💬 {d.coach_reply}</div>}
                                              {!d.resolved && !d.coach_reply && (
                                                <div className="mt-2 flex gap-1">
                                                  <button onClick={(e) => { e.stopPropagation(); setReplyingTo(d.id); setReplyText(''); }}
                                                    className="flex items-center gap-1 text-primary text-[11px] hover:underline"><MessageCircle size={10} /> Répondre</button>
                                                  <button onClick={(e) => { e.stopPropagation(); setQuickQuestFor({ diffId: d.id, userId: d.user_id, subject: d.subject }); setQuickQuestTitle(''); }}
                                                    className="flex items-center gap-1 text-[11px] hover:underline" style={{ color: 'hsl(var(--xp))' }}><Zap size={10} /> Quête</button>
                                                </div>
                                              )}
                                              {replyingTo === d.id && (
                                                <div className="space-y-1 mt-2">
                                                  <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Répondre..." className="min-h-[40px] text-xs" />
                                                  <div className="flex gap-1">
                                                    <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)} className="h-6 text-[10px]">Annuler</Button>
                                                    <Button size="sm" onClick={() => handleReply(d.id)} className="h-6 text-[10px]">Envoyer</Button>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    {/* Exams */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">DS ({sExams.length})</h4>
                                      {sExams.length === 0 ? <p className="text-xs text-muted-foreground">Aucun</p> : (
                                        <div className="space-y-2">
                                          {sExams.map(e => {
                                            const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                                            const isPast = daysUntil < 0;
                                            const isMissing = isPast && e.grade === null;
                                            return (
                                              <div key={e.id} className={`p-2 rounded border text-xs ${isMissing ? 'border-streak/40 bg-streak/5' : isPast ? 'border-border/50 opacity-60' : daysUntil <= 3 ? 'border-destructive/50' : 'border-border'}`}>
                                                <div className="flex items-center gap-2">
                                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[e.subject as Subject] || '--muted'}))` }} />
                                                  <span className="font-medium">{e.subject}</span>
                                                  <span className="text-muted-foreground ml-auto">{new Date(e.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                  <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                                                  {e.chapters && <span className="text-muted-foreground truncate">· {e.chapters}</span>}
                                                  {e.grade !== null && <span className="ml-auto font-medium">{e.grade}/20</span>}
                                                  {isMissing && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'hsl(var(--streak) / 0.15)', color: 'hsl(var(--streak))' }}>Résultat manquant</span>}
                                                </div>
                                                {e.photo_url && (
                                                  <button onClick={() => setPreviewPhoto(e.photo_url!)} className="flex items-center gap-1 text-[10px] text-primary hover:underline mt-1">
                                                    <Image size={10} /> Voir le contrôle
                                                  </button>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                    {/* Tasks */}
                                    <div>
                                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tâches perso ({sTasks.length})</h4>
                                      {sTasks.length === 0 ? <p className="text-xs text-muted-foreground">Aucune</p> : (
                                        <div className="space-y-2">
                                          {sTasks.map(t => (
                                            <div key={t.id} className={`p-2 rounded border text-xs ${t.completed ? 'border-border/50 opacity-60' : 'border-border'}`}>
                                              <div className="flex items-center gap-2">
                                                {t.completed && <span style={{ color: 'hsl(var(--success))' }}>✓</span>}
                                                <span className={t.completed ? 'line-through' : ''}>{t.description}</span>
                                              </div>
                                              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                                <span>{t.subject}</span><span>·</span><span>+{t.xp_reward} XP</span>
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
                          </AnimatePresence>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Difficulties Tab with subject filter */}
          <TabsContent value="difficulties">
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-semibold">
                  Toutes les difficultés ({unresolvedDiffs.length} non résolues)
                </h2>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[140px] h-8 text-xs">
                    <Filter size={12} className="mr-1" /><SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                {filteredDiffs.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">Aucune difficulté {subjectFilter !== 'all' ? `en ${subjectFilter}` : ''} 🎉</p>
                ) : (
                  filteredDiffs.map(d => (
                    <div key={d.id} className={`p-4 rounded-lg border ${d.resolved ? 'border-border/50 opacity-60' : d.severity === 'blocking' ? 'border-destructive/40 bg-destructive/5' : 'border-border'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">{d.avatar}</span>
                        <span className="font-medium text-sm">{d.pseudo}</span>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject] || '--muted'}))` }} />
                        <span className="text-xs text-muted-foreground">{d.subject}</span>
                        <span className="text-xs" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>{SEVERITY_LABELS[d.severity]?.label}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{new Date(d.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                        {d.resolved && <span className="text-xs" style={{ color: 'hsl(var(--success))' }}>✓ Résolu</span>}
                      </div>
                      <p className="text-sm mb-2">{d.description}</p>
                      {d.coach_reply && (
                        <div className="p-2 rounded bg-primary/10 border border-primary/20 text-sm">
                          <span className="text-primary text-xs font-medium">💬 Coach :</span> {d.coach_reply}
                        </div>
                      )}
                      {!d.resolved && !d.coach_reply && (
                        <div className="mt-2 flex gap-3">
                          {replyingTo === d.id ? (
                            <div className="space-y-2 flex-1">
                              <Textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Ta réponse..." className="min-h-[50px] text-sm" />
                              <div className="flex gap-2">
                                <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Annuler</Button>
                                <Button size="sm" onClick={() => handleReply(d.id)} disabled={!replyText.trim()}>Envoyer</Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <button onClick={() => { setReplyingTo(d.id); setReplyText(''); }}
                                className="flex items-center gap-1.5 text-primary text-sm hover:underline">
                                <MessageCircle size={14} /> Répondre
                              </button>
                              <button onClick={() => { setQuickQuestFor({ diffId: d.id, userId: d.user_id, subject: d.subject }); setQuickQuestTitle(''); }}
                                className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: 'hsl(var(--xp))' }}>
                                <Zap size={14} /> Assigner une quête
                              </button>
                            </>
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
                Tous les DS ({upcomingExams.length} à venir · {missingGradeExams.length} résultat{missingGradeExams.length > 1 ? 's' : ''} manquant{missingGradeExams.length > 1 ? 's' : ''})
              </h2>
              <div className="space-y-3">
                {exams.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">Aucun DS déclaré 📝</p>
                ) : (
                  exams.map(e => {
                    const daysUntil = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    const isPast = daysUntil < 0;
                    const isMissing = isPast && e.grade === null;
                    return (
                      <div key={e.id} className={`p-4 rounded-lg border ${isMissing ? 'border-streak/40 bg-streak/5' : isPast ? 'border-border/50 opacity-60' : daysUntil <= 3 ? 'border-destructive/40 bg-destructive/5' : 'border-border'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{e.avatar}</span>
                          <span className="font-medium text-sm">{e.pseudo}</span>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[e.subject as Subject] || '--muted'}))` }} />
                          <span className="text-sm">{e.subject}</span>
                          <span className="text-sm text-muted-foreground ml-auto">{new Date(e.exam_date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                          {!isPast && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{daysUntil === 0 ? "Aujourd'hui" : `${daysUntil}j`}</span>}
                          {isMissing && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'hsl(var(--streak) / 0.15)', color: 'hsl(var(--streak))' }}>Résultat manquant</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span>{STRESS_LABELS[e.stress_level] || e.stress_level}</span>
                          {e.chapters && <span className="text-muted-foreground">Chapitres : {e.chapters}</span>}
                          {e.grade !== null && <span className="ml-auto font-display font-semibold">{e.grade}/20</span>}
                          {e.photo_url && (
                            <button onClick={() => setPreviewPhoto(e.photo_url!)} className="flex items-center gap-1 text-xs text-primary hover:underline ml-auto">
                              <Image size={12} /> Voir le contrôle
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </TabsContent>

          {/* Tasks Tab - grouped by day */}
          <TabsContent value="tasks">
            <div className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-display text-base font-semibold mb-4">
                Tâches personnelles des élèves ({studentTasks.filter(t => !t.completed).length} actives)
              </h2>
              {(() => {
                // Group tasks by day (completed_at or created_at)
                const PRIORITY_COLORS: Record<string, string> = { high: 'hsl(0 84% 60%)', medium: 'hsl(38 92% 55%)', low: 'hsl(142 71% 45%)' };
                const PRIORITY_LABELS: Record<string, string> = { high: '🔴 Haute', medium: '🟡 Moyenne', low: '🟢 Faible' };
                const sorted = [...studentTasks].sort((a, b) => {
                  const dateA = a.completed_at || a.created_at;
                  const dateB = b.completed_at || b.created_at;
                  return new Date(dateB).getTime() - new Date(dateA).getTime();
                });
                const grouped: Record<string, typeof sorted> = {};
                sorted.forEach(t => {
                  const date = t.completed_at || t.created_at;
                  const day = new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
                  if (!grouped[day]) grouped[day] = [];
                  grouped[day].push(t);
                });

                const days = Object.keys(grouped);
                if (days.length === 0) {
                  return <p className="text-muted-foreground text-sm text-center py-4">Aucune tâche personnelle ✏️</p>;
                }
                return (
                  <div className="space-y-6">
                    {days.map(day => (
                      <div key={day}>
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 capitalize">{day}</h3>
                        <div className="space-y-2">
                          {grouped[day].map(t => (
                            <div key={t.id} className={`p-4 rounded-lg border ${t.completed ? 'border-border/50 opacity-60' : 'border-border'}`}>
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{t.avatar}</span>
                                <span className="font-medium text-sm">{t.pseudo}</span>
                                {t.completed && <span className="text-xs" style={{ color: 'hsl(var(--success))' }}>✓</span>}
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[t.subject as Subject] || '--muted'}))` }} />
                                <span className="text-xs text-muted-foreground">{t.subject}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ color: PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium, backgroundColor: `${PRIORITY_COLORS[t.priority] || PRIORITY_COLORS.medium}15` }}>
                                  {PRIORITY_LABELS[t.priority] || PRIORITY_LABELS.medium}
                                </span>
                                <span className="text-xs ml-auto" style={{ color: 'hsl(var(--xp))' }}>+{t.xp_reward} XP</span>
                              </div>
                              <p className={`text-sm mt-1 ${t.completed ? 'line-through text-muted-foreground' : ''}`}>{t.description}</p>
                              {t.deadline && <span className="text-xs text-muted-foreground mt-1 block">Échéance : {new Date(t.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Quick Quest Modal */}
      {quickQuestFor && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setQuickQuestFor(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-lg p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-base font-semibold mb-1">⚡ Quête rapide</h2>
            <p className="text-xs text-muted-foreground mb-4">En {quickQuestFor.subject} · 100 XP · Difficulté moyenne</p>
            <input type="text" placeholder="Titre de la quête..." value={quickQuestTitle} onChange={e => setQuickQuestTitle(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4" autoFocus />
            <div className="flex gap-3">
              <button type="button" onClick={() => setQuickQuestFor(null)} className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
              <button onClick={handleQuickQuest} disabled={creating || !quickQuestTitle.trim()} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {creating && <Loader2 size={14} className="animate-spin" />} Assigner
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Avatar</label>
                  <div className="flex gap-2 flex-wrap">
                    {AVATARS.map(a => (
                      <button key={a} type="button" onClick={() => setNewStudent(p => ({ ...p, avatar: a }))} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border ${newStudent.avatar === a ? 'border-primary bg-primary/10' : 'border-border'}`}>{a}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Classe</label>
                  <select value={newStudent.class_level} onChange={e => setNewStudent(p => ({ ...p, class_level: e.target.value }))} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none">
                    <option value="">Non définie</option>
                    {CLASS_LEVELS.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                  </select>
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

      {/* AI Plan Preview Modal */}
      {generatedPlan && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setGeneratedPlan(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Sparkles size={18} className="text-primary" /> Plan de la semaine
              </h2>
              <button onClick={() => setGeneratedPlan(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="prose prose-sm prose-invert max-w-none mb-6 text-sm whitespace-pre-wrap">{generatedPlan.content}</div>
            <div className="flex gap-3">
              <button onClick={() => setGeneratedPlan(null)} className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Modifier / Rejeter</button>
              <button
                onClick={handleValidatePlan}
                disabled={validatingPlan}
                className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {validatingPlan ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                Valider et envoyer à l'élève
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Photo preview */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setPreviewPhoto(null)}>
          <div className="max-w-2xl max-h-[80vh] overflow-auto rounded-lg border border-border" onClick={e => e.stopPropagation()}>
            <img src={previewPhoto} alt="Contrôle" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Delete student confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-lg p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-base font-semibold mb-2 text-destructive">⚠️ Supprimer l'élève</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Es-tu sûr de vouloir supprimer <strong className="text-foreground">{confirmDelete.pseudo}</strong> ? Toutes ses données (quêtes, DS, difficultés, tâches, sessions) seront supprimées définitivement.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Annuler</button>
              <button
                onClick={() => handleDeleteStudent(confirmDelete.userId)}
                disabled={deletingStudent === confirmDelete.userId}
                className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletingStudent === confirmDelete.userId && <Loader2 size={14} className="animate-spin" />}
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
