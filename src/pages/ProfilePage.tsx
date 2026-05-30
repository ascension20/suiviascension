import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Brain, Star, Trophy, Swords, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { GradeAverages } from '@/components/GradeAverages';
import { Avatar } from '@/components/avatar/Avatar';
import { UnlockToast } from '@/components/avatar/UnlockToast';
import { useAvatarConfig } from '@/hooks/useAvatarConfig';
import { useUnlocks } from '@/hooks/useUnlocks';

interface XPDay { label: string; xp: number; }

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const totalXp  = profile?.total_xp ?? 0;
  const streak   = profile?.streak ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);
  const pct = Math.min(100, Math.round((currentXp / requiredXp) * 100));

  const { config: avatarConfig, loading: avatarLoading } = useAvatarConfig(user?.id);
  const { newlyUnlocked, dismissNewUnlocks } = useUnlocks(user?.id);

  const [deepworkSec, setDeepworkSec]         = useState(0);
  const [deepworkSessions, setDeepworkSessions] = useState(0);
  const [questsDone, setQuestsDone]           = useState(0);
  const [xpHistory, setXpHistory]             = useState<XPDay[]>([]);
  const [simpleAvg, setSimpleAvg]             = useState<number | null>(null);
  const [specialties, setSpecialties]         = useState<string[]>([]);
  const [schoolLevel, setSchoolLevel]         = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: prof } = await supabase.from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions')
        .eq('user_id', user.id).single();
      if (prof) {
        setDeepworkSec(prof.total_deepwork_seconds ?? 0);
        setDeepworkSessions(prof.total_deepwork_sessions ?? 0);
      }

      const { count } = await supabase.from('quests')
        .select('*', { count: 'exact', head: true })
        .eq('assigned_to', user.id).eq('completed', true);
      setQuestsDone(count ?? 0);

      const since = new Date();
      since.setDate(since.getDate() - 30);
      since.setHours(0, 0, 0, 0);
      const [sessionsRes, questXpRes] = await Promise.all([
        supabase.from('deepwork_sessions')
          .select('started_at, xp_earned').eq('user_id', user.id)
          .gte('started_at', since.toISOString()),
        supabase.from('xp_history')
          .select('created_at, amount').eq('user_id', user.id)
          .neq('source', 'deepwork')
          .gte('created_at', since.toISOString()),
      ]);
      const byDate: Record<string, number> = {};
      for (let i = 0; i < 30; i++) {
        const d = new Date(); d.setDate(d.getDate() - (29 - i));
        byDate[d.toISOString().slice(0, 10)] = 0;
      }
      sessionsRes.data?.forEach(s => {
        const k = (s.started_at ?? '').slice(0, 10);
        if (byDate[k] !== undefined) byDate[k] += s.xp_earned ?? 0;
      });
      questXpRes.data?.forEach(r => {
        const k = (r.created_at ?? '').slice(0, 10);
        if (byDate[k] !== undefined) byDate[k] += r.amount ?? 0;
      });
      setXpHistory(Object.entries(byDate).map(([date, xp]) => ({
        label: new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        xp,
      })));

      const { data: exams } = await supabase.from('exams')
        .select('grade').eq('user_id', user.id).not('grade', 'is', null);
      if (exams && exams.length > 0) {
        const grades = exams.map(e => e.grade as number);
        setSimpleAvg(Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 100) / 100);
      }

      const { data: onb } = await supabase
        .from('onboarding_data')
        .select('specialties, school_level')
        .eq('user_id', user.id)
        .maybeSingle();
      if (onb) {
        setSpecialties((onb.specialties as string[]) ?? []);
        setSchoolLevel(onb.school_level ?? null);
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
    {
      label: 'Niveau', value: `${level}`, sub: title,
      icon: <Star size={16} style={{ color: 'hsl(var(--primary))' }} />,
      style: { borderColor: 'hsl(43 90% 50% / 0.25)', backgroundColor: 'hsl(43 90% 50% / 0.08)' },
    },
    {
      label: 'XP Total', value: totalXp.toLocaleString('fr-FR'), sub: `+${currentXp}/${requiredXp} XP`,
      icon: <Trophy size={16} className="text-blue-400" />,
      style: { borderColor: 'hsl(213 90% 62% / 0.25)', backgroundColor: 'hsl(213 90% 62% / 0.08)' },
    },
    {
      label: 'Streak', value: `${streak} j`, sub: 'jours consécutifs',
      icon: <Flame size={16} className="text-streak" />,
      style: { borderColor: 'hsl(var(--streak) / 0.25)', backgroundColor: 'hsl(var(--streak) / 0.08)' },
    },
    {
      label: 'Deepwork', value: fmtDeepwork(deepworkSec), sub: `${deepworkSessions} session${deepworkSessions > 1 ? 's' : ''}`,
      icon: <Brain size={16} className="text-violet-400" />,
      style: { borderColor: 'hsl(270 60% 60% / 0.25)', backgroundColor: 'hsl(270 60% 60% / 0.08)' },
    },
    {
      label: 'Quêtes', value: String(questsDone), sub: 'complétées',
      icon: <Swords size={16} className="text-rose-400" />,
      style: { borderColor: 'hsl(345 80% 60% / 0.25)', backgroundColor: 'hsl(345 80% 60% / 0.08)' },
    },
    {
      label: 'Moyenne',
      value: simpleAvg !== null ? `${simpleAvg.toFixed(1).replace('.', ',')}/20` : '—',
      sub: 'générale (DS)',
      icon: <Star size={16} className="text-emerald-400" />,
      style: { borderColor: 'hsl(142 71% 45% / 0.25)', backgroundColor: 'hsl(142 71% 45% / 0.08)' },
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header
        className="border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-20 backdrop-blur-sm hud-top-line"
        style={{ backgroundColor: 'hsl(222 22% 5% / 0.92)' }}
      >
        <button
          onClick={() => navigate('/student')}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display font-semibold">Mon Profil</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* ── Hero card: Avatar + level ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden game-panel"
          style={{ boxShadow: '0 0 50px hsl(43 90% 50% / 0.08)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-5"
            style={{ background: 'hsl(var(--primary))' }}
          />

          <div className="flex items-center gap-5 relative">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatarLoading ? (
                <div
                  className="rounded-2xl animate-pulse"
                  style={{
                    width: 80, height: 80,
                    background: 'hsl(222 22% 14%)',
                  }}
                />
              ) : (
                <Avatar config={avatarConfig} size="lg" seed={profile?.pseudo ?? user?.id ?? 'default'} />
              )}
              {/* LVL badge */}
              <div
                className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg border text-[10px] font-display font-bold neon-gold"
                style={{
                  background: 'hsl(43 90% 50%)',
                  borderColor: 'hsl(43 90% 70% / 0.5)',
                  color: 'hsl(222 22% 8%)',
                }}
              >
                LVL {level}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-display font-black text-xl truncate">{profile?.pseudo ?? 'Joueur'}</p>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm font-semibold" style={{ color: 'hsl(var(--primary) / 0.8)' }}>{title}</p>
                    {schoolLevel && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'hsl(43 90% 50% / 0.12)', color: 'hsl(43 90% 60%)', border: '1px solid hsl(43 90% 50% / 0.25)' }}>
                        {schoolLevel}
                      </span>
                    )}
                  </div>
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {specialties.map(s => (
                        <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: 'hsl(270 60% 50% / 0.12)', color: 'hsl(270 60% 70%)', border: '1px solid hsl(270 60% 50% / 0.25)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Customise button */}
                <motion.button
                  onClick={() => navigate('/student/profile/customize')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all"
                  style={{
                    background: 'hsl(43 90% 50% / 0.12)',
                    color: 'hsl(43 90% 60%)',
                    border: '1px solid hsl(43 90% 50% / 0.3)',
                  }}
                >
                  <Sparkles size={11} />
                  Personnaliser
                </motion.button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentXp.toLocaleString('fr-FR')} XP</span>
                  <span>{requiredXp.toLocaleString('fr-FR')} XP</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden border border-border"
                     style={{ background: 'hsl(222 18% 14%)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full relative overflow-hidden energy-bar"
                    style={{ boxShadow: '0 0 12px hsl(43 90% 50% / 0.6), 0 0 24px hsl(43 90% 50% / 0.2)' }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{pct}% → niveau {level + 1}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border p-4 flex flex-col gap-1"
              style={s.style}
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                {s.icon}
                <span>{s.label}</span>
              </div>
              <p className="font-display font-black text-xl tabular-nums">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── XP chart 30 jours ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-sm">XP des 30 derniers jours</h2>
            <span className="text-xs text-muted-foreground">Deepwork + Quêtes</span>
          </div>
          {xpHistory.some(d => d.xp > 0) ? (
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={xpHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="profileXpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="hsl(43,90%,50%)" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="hsl(43,90%,50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: 'hsl(220,10%,50%)' }}
                    tickLine={false} axisLine={false} interval={9}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'hsl(220,10%,50%)' }}
                    tickLine={false} axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ background: 'hsl(222,22%,9%)', border: '1px solid hsl(222,16%,18%)', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number) => [`${v} XP`, 'XP gagné']}
                  />
                  <Area
                    type="monotone" dataKey="xp"
                    stroke="hsl(43,90%,50%)" strokeWidth={2}
                    fill="url(#profileXpGrad)" dot={false} isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Lance ta première session ou valide une quête !</p>
          )}
        </motion.div>

        {/* ── Moyennes par matière ── */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            <GradeAverages userId={user.id} />
          </motion.div>
        )}

      </main>

      {/* Unlock toast */}
      <UnlockToast unlocks={newlyUnlocked} onDismiss={dismissNewUnlocks} />
    </div>
  );
}
