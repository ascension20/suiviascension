import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, BookOpen, TrendingUp, LogOut, Plus, UserPlus, Loader2 } from 'lucide-react';
import { calculateLevel, getTitleForLevel, SUBJECTS, AVATARS } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type QuestRow = Database['public']['Tables']['quests']['Row'];

interface Alert {
  type: 'danger' | 'warning' | 'info';
  message: string;
  icon: typeof AlertTriangle;
}

const alertStyles = {
  danger: { bg: 'hsl(var(--destructive) / 0.08)', border: 'hsl(var(--destructive) / 0.25)', color: 'hsl(var(--destructive))' },
  warning: { bg: 'hsl(var(--xp) / 0.08)', border: 'hsl(var(--xp) / 0.25)', color: 'hsl(var(--xp))' },
  info: { bg: 'hsl(var(--primary) / 0.08)', border: 'hsl(var(--primary) / 0.25)', color: 'hsl(var(--primary))' },
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

  const loadData = async () => {
    // Get all student profiles
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: roles } = await supabase.from('user_roles').select('user_id, role');

    if (!profiles || !roles) { setLoading(false); return; }

    const studentUserIds = roles.filter(r => r.role === 'student').map(r => r.user_id);
    const studentProfiles = profiles.filter(p => studentUserIds.includes(p.user_id));

    // Get quest stats
    const { data: allQuests } = await supabase.from('quests').select('*');
    // Get timer sessions
    const { data: allSessions } = await supabase.from('timer_sessions').select('user_id, duration_minutes');

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

    // Generate alerts
    const newAlerts: Alert[] = [];
    enriched.forEach(s => {
      if (s.streak === 0) newAlerts.push({ type: 'danger', message: `${s.pseudo} — Série à 0`, icon: AlertTriangle });
      if (s.completionRate < 50) newAlerts.push({ type: 'warning', message: `${s.pseudo} — Complétion à ${s.completionRate}%`, icon: Clock });
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
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    // Create user via Supabase auth (admin-style: sign up with metadata)
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

    // Assign student role
    await supabase.from('user_roles').insert({ user_id: data.user.id, role: 'student' as Database['public']['Enums']['app_role'] });

    setNewStudent({ pseudo: '', email: '', password: '', avatar: '🐺' });
    setShowCreateStudent(false);
    setCreating(false);
    loadData();
  };

  const handleCreateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    const targets = newQuest.assigned_to === 'all'
      ? questStudents.map(s => s.user_id)
      : [newQuest.assigned_to];

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-lg font-semibold">Centre de Commande</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateStudent(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground hover:bg-secondary/80 transition-colors"
            >
              <UserPlus size={14} /> Élève
            </button>
            <button
              onClick={() => setShowCreateQuest(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} /> Quête
            </button>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Summary */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mb-6">
          <span className="text-destructive font-medium">{dangerCount} élève{dangerCount > 1 ? 's' : ''}</span> {dangerCount > 1 ? 'ont' : 'a'} besoin d'attention.
        </motion.p>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2 mb-6">
            {alerts.map((alert, i) => {
              const s = alertStyles[alert.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm"
                  style={{ backgroundColor: s.bg, borderColor: s.border, color: s.color }}
                >
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

        {/* Student table */}
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
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    const { level } = calculateLevel(student.total_xp);
                    const studentTitle = getTitleForLevel(level);
                    return (
                      <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
