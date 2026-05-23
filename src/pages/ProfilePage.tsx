import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Brain, Star, Trophy, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';

interface XPDay { label: string; xp: number; }

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const totalXp = profile?.total_xp ?? 0;
  const streak = profile?.streak ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);
  const pct = Math.min(100, Math.round((currentXp / requiredXp) * 100));

  const [deepworkSec, setDeepworkSec] = useState(0);
  const [deepworkSessions, setDeepworkSessions] = useState(0);
  const [questsDone, setQuestsDone] = useState(0);
  const [xpHistory, setXpHistory] = useState<XPDay[]>([]);
  const [weightedAvg, setWeightedAvg] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Deepwork stats from profile
      const { data: prof } = await supabase.from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions')
        .eq('user_id', user.id).single();
      if (prof) {
        setDeepworkSec(prof.total_deepwork_seconds ?? 0);
        setDeepworkSessions(prof.total_deepwork_sessions ?? 0);
      }

      // Quests completed
      const { count } = await supabase.from('quests')
        .select('*', { count: 'exact', head: true })
        .eq('assigned_to', user.id).eq('completed', true);
      setQuestsDone(count ?? 0);

      // XP last 30 days
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data: sessions } = await supabase.from('deepwork_sessions')
        .select('created_at, xp_earned').eq('user_id', user.id)
        .gte('created_at', since.toISOString());
      const byDate: Record<string, number> = {};
      for (let i = 0; i < 30; i++) {
        const d = new Date(); d.setDate(d.getDate() - (29 - i));
        byDate[d.toISOString().slice(0, 10)] = 0;
      }
      sessions?.forEach(s => {
        const k = s.created_at.slice(0, 10);
        if (byDate[k] !== undefined) byDate[k] += s.xp_earned ?? 0;
      });
      setXpHistory(Object.entries(byDate).map(([date, xp]) => ({
        label: new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        xp,
      })));

      // Weighted average from initial_grades
      const { data: grades } = await supabase.from('initial_grades')
        .select('grade, coefficient').eq('user_id', user.id);
      if (grades && grades.length > 0) {
        const filled = grades.filter(g => g.grade !== null);
        if (filled.length > 0) {
          const num = filled.reduce((a, g) => a + (g.grade! * g.coefficient), 0);
          const den = filled.reduce((a, g) => a + g.coefficient, 0);
          if (den > 0) setWeightedAvg(Math.round((num / den) * 100) / 100);
        }
      }
    };
    load();
  }, [user]);

  const fmtDeepwork = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h} h ${String(m).padStart(2, '0')}`;
  };

  const stats = [
    { label: 'Niveau', value: `${level}`, sub: title, icon: <Star size={16} className="text-amber-400" />, color: 'amber' },
    { label: 'XP Total', value: totalXp.toLocaleString('fr-FR'), sub: `+${currentXp}/${requiredXp} XP`, icon: <Trophy size={16} className="text-blue-400" />, color: 'blue' },
    { label: 'Streak', value: `${streak} j`, sub: 'jours consécutifs', icon: <Flame size={16} className="text-orange-400" />, color: 'orange' },
    { label: 'Deepwork', value: fmtDeepwork(deepworkSec), sub: `${deepworkSessions} session${deepworkSessions > 1 ? 's' : ''}`, icon: <Brain size={16} className="text-violet-400" />, color: 'violet' },
    { label: 'Quêtes', value: String(questsDone), sub: 'complétées', icon: <Swords size={16} className="text-rose-400" />, color: 'rose' },
    { label: 'Moyenne', value: weightedAvg !== null ? `${weightedAvg.toFixed(2).replace('.', ',')}/20` : '—', sub: 'pondérée', icon: <Star size={16} className="text-emerald-400" />, color: 'emerald' },
  ];

  const colorMap: Record<string, string> = {
    amber: 'border-amber-500/30 bg-amber-500/10',
    blue: 'border-blue-500/30 bg-blue-500/10',
    orange: 'border-orange-500/30 bg-orange-500/10',
    violet: 'border-violet-500/30 bg-violet-500/10',
    rose: 'border-rose-500/30 bg-rose-500/10',
    emerald: 'border-emerald-500/30 bg-emerald-500/10',
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-20 bg-background/95 backdrop-blur">
        <button onClick={() => navigate('/student')} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display font-semibold">Mon Profil</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Avatar + level card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/30 to-violet-500/10 border-2 border-violet-500/60 flex items-center justify-center text-4xl shadow-inner">
                {profile?.avatar ?? '🐺'}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-violet-600 border border-violet-400/50 text-white text-[10px] font-display font-bold shadow-lg">
                LVL {level}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-xl truncate">{profile?.pseudo ?? 'Joueur'}</p>
              <p className="text-sm text-violet-300 font-medium mb-3">{title}</p>
              {/* XP bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentXp.toLocaleString('fr-FR')} XP</span>
                  <span>{requiredXp.toLocaleString('fr-FR')} XP</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent xp-shimmer" />
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground text-right">{pct}% vers le niveau {level + 1}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border p-4 flex flex-col gap-1 ${colorMap[s.color]}`}
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                {s.icon}
                <span>{s.label}</span>
              </div>
              <p className="font-display font-bold text-xl tabular-nums">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* XP last 30 days chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm">XP des 30 derniers jours</h2>
            <span className="text-xs text-muted-foreground">Sessions deepwork</span>
          </div>
          {xpHistory.some(d => d.xp > 0) ? (
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={xpHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="profileXpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(262,80%,60%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(262,80%,60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} tickLine={false} axisLine={false} interval={9} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(225,28%,14%)', border: '1px solid hsl(225,20%,22%)', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v} XP`, 'XP gagné']} />
                  <Area type="monotone" dataKey="xp" stroke="hsl(262,80%,60%)" strokeWidth={2} fill="url(#profileXpGrad)" dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Lance ta première session deepwork ! 🧠</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
