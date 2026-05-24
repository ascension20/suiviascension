import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, LogOut, WifiOff } from 'lucide-react';
import { DeepworkWidget } from '@/components/Deepwork/DeepworkWidget';
import { DeepworkStats } from '@/components/Deepwork/DeepworkStats';
import { PlanningMini } from '@/components/Planning/PlanningMini';
import { EndOfDayReview } from '@/components/EndOfDayReview';
import { XPBar } from '@/components/XPBar';
import { WeeklyLeaderboard, LeaderboardEntry } from '@/components/WeeklyLeaderboard';
import { LevelUpOverlay } from '@/components/LevelUpOverlay';
import { DifficultiesSection } from '@/components/DifficultiesSection';
import { ExamsSection } from '@/components/ExamsSection';
import { WeeklyDeepworkGoal } from '@/components/WeeklyDeepworkGoal';

import { ProgressComparison } from '@/components/ProgressComparison';
import { TutorialOverlay } from '@/components/Tutorial/TutorialOverlay';
import { DSReminderModal } from '@/components/DSReminderModal';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { useOnlineTracker, updateStreak } from '@/hooks/useOnlineTracker';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { playXpSound } from '@/hooks/useXpAudio';
import { supabase } from '@/integrations/supabase/client';

export default function StudentDashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string; xpGained: number } | null>(null);
  // XP leaderboard: [global, weekly, daily]
  const [xpGlobal,  setXpGlobal]  = useState<LeaderboardEntry[]>([]);
  const [xpWeekly,  setXpWeekly]  = useState<LeaderboardEntry[]>([]);
  const [xpDaily,   setXpDaily]   = useState<LeaderboardEntry[]>([]);
  // Chrono leaderboard: [global, weekly, daily]
  const [chronoGlobal, setChronoGlobal] = useState<LeaderboardEntry[]>([]);
  const [chronoWeekly, setChronoWeekly] = useState<LeaderboardEntry[]>([]);
  const [chronoDaily,  setChronoDaily]  = useState<LeaderboardEntry[]>([]);
  const [weeklyChampion, setWeeklyChampion] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const { isOnline, pendingCount } = useOfflineQueue();
  useOnlineTracker(user?.id);

  const totalXp = profile?.total_xp ?? 0;
  const streak  = profile?.streak ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);

  // Onboarding redirect
  useEffect(() => {
    if (profile && profile.onboarding_completed === false) navigate('/onboarding');
    if (profile && profile.tutorial_completed === false && profile.onboarding_completed) setShowTutorial(true);
  }, [profile, navigate]);

  useEffect(() => {
    if (!user) return;
    const loadLeaderboards = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const startOfWeek = new Date();
      const dow = startOfWeek.getDay();
      startOfWeek.setDate(startOfWeek.getDate() - (dow === 0 ? 6 : dow - 1));
      startOfWeek.setHours(0, 0, 0, 0);
      const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);

      const toEntry = (p: { user_id: string; pseudo: string; avatar: string }, value: number, rank: number): LeaderboardEntry => ({
        rank, userId: p.user_id, pseudo: p.pseudo, avatar: p.avatar ?? '🐺',
        value, isCurrentUser: p.user_id === user.id,
      });

      const rank = <T extends { value: number }>(arr: T[]): (T & { rank: number })[] =>
        [...arr].sort((a, b) => b.value - a.value).map((e, i) => ({ ...e, rank: i + 1 }));

      // ── Profiles (all) ──
      const { data: profs } = await supabase
        .from('profiles')
        .select('user_id, pseudo, avatar, total_xp, today_xp, today_xp_date, total_deepwork_seconds');
      if (!profs) return;

      // XP Global
      const xpG = rank(profs.map(p => ({ ...p, value: p.total_xp ?? 0 })))
        .slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setXpGlobal(xpG);

      // XP Daily (today_xp)
      const xpD = rank(profs.map(p => ({ ...p, value: p.today_xp_date === today ? (p.today_xp ?? 0) : 0 })))
        .filter(p => p.value > 0).slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setXpDaily(xpD);

      // Chrono Global (total_deepwork_seconds → minutes)
      const chG = rank(profs.map(p => ({ ...p, value: Math.round((p.total_deepwork_seconds ?? 0) / 60) })))
        .filter(p => p.value > 0).slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setChronoGlobal(chG);

      // ── Deepwork sessions this week ──
      const { data: dwWeek } = await supabase
        .from('deepwork_sessions').select('user_id, duration_seconds, xp_earned')
        .gte('started_at', startOfWeek.toISOString());

      // ── Deepwork sessions today ──
      const { data: dwDay } = await supabase
        .from('deepwork_sessions').select('user_id, duration_seconds, xp_earned')
        .gte('started_at', startOfDay.toISOString());

      const aggregate = (sessions: { user_id: string; duration_seconds: number; xp_earned: number }[] | null, field: 'duration_seconds' | 'xp_earned') => {
        const byUser: Record<string, number> = {};
        sessions?.forEach(s => { byUser[s.user_id] = (byUser[s.user_id] || 0) + (s[field] ?? 0); });
        return byUser;
      };

      // XP Weekly (deepwork xp_earned this week)
      const xpWByUser = aggregate(dwWeek, 'xp_earned');
      const xpW = rank(profs.filter(p => xpWByUser[p.user_id] > 0).map(p => ({ ...p, value: xpWByUser[p.user_id] || 0 })))
        .slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setXpWeekly(xpW);
      if (xpW.length > 0) setWeeklyChampion(xpW[0].pseudo);

      // Chrono Weekly (deepwork minutes this week)
      const chWByUser = aggregate(dwWeek, 'duration_seconds');
      const chW = rank(profs.filter(p => chWByUser[p.user_id] > 0).map(p => ({ ...p, value: Math.round((chWByUser[p.user_id] || 0) / 60) })))
        .slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setChronoWeekly(chW);

      // Chrono Daily (deepwork minutes today)
      const chDByUser = aggregate(dwDay, 'duration_seconds');
      const chD = rank(profs.filter(p => chDByUser[p.user_id] > 0).map(p => ({ ...p, value: Math.round((chDByUser[p.user_id] || 0) / 60) })))
        .slice(0, 10).map((p, i) => toEntry(p, p.value, p.rank));
      setChronoDaily(chD);
    };
    loadLeaderboards();
  }, [user]);

  const addXp = useCallback(async (amount: number) => {
    if (!user) return;
    const oldLevel = calculateLevel(totalXp).level;
    const newTotal = totalXp + amount;
    const newLevel = calculateLevel(newTotal).level;
    if (newLevel > oldLevel) setLevelUpData({ level: newLevel, title: getTitleForLevel(newLevel), xpGained: amount });
    await supabase.from('profiles').update({ total_xp: newTotal }).eq('user_id', user.id);
    await updateStreak(user.id);
    playXpSound();
    await refreshProfile();
  }, [user, totalXp, refreshProfile]);

  if (user && profile?.onboarding_completed === false) return null;

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HEADER ─── */}
      <header className="border-b border-border px-4 md:px-6 py-3 sticky top-0 z-30 backdrop-blur-sm"
              style={{ backgroundColor: 'hsl(222 22% 5% / 0.92)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* Logo / title */}
          <div className="items-center gap-1 shrink-0 hidden sm:flex">
            <span className="font-display text-sm font-black tracking-tight"
                  style={{ color: 'hsl(42 12% 92%)' }}>
              ASCENSION
            </span>
            <span className="font-display text-sm font-black tracking-tight neon-gold"
                  style={{ color: 'hsl(var(--primary))' }}>
              20
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
                <WifiOff size={12} />
                <span className="hidden sm:inline">Hors ligne{pendingCount > 0 ? ` (${pendingCount})` : ''}</span>
              </div>
            )}

            {/* Streak badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                 style={{ borderColor: 'hsl(var(--streak) / 0.3)', backgroundColor: 'hsl(var(--streak) / 0.1)' }}>
              <Flame size={14} className="text-streak" />
              <span className="font-display text-sm font-semibold text-streak">{streak}</span>
            </div>

            <XPBar current={currentXp} max={requiredXp} level={level} title={title} className="hidden md:flex" />
            <XPBar current={currentXp} max={requiredXp} level={level} title={title} compact className="md:hidden" />

            {/* Avatar */}
            <button
              onClick={() => navigate('/student/profile')}
              className="relative group"
              title="Mon profil"
            >
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center text-lg transition-all"
                style={{ backgroundColor: 'hsl(222 22% 12%)', borderColor: 'hsl(43 90% 50% / 0.3)' }}
              >
                {profile?.avatar ?? '🐺'}
              </div>
              {weeklyChampion === profile?.pseudo && (
                <span className="absolute -top-1 -right-1 text-sm" title="Premier du classement chrono !">👑</span>
              )}
            </button>

            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN ─── */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground mb-5"
        >
          Prêt pour ta prochaine quête,{' '}
          <span className="font-semibold" style={{ color: 'hsl(42 12% 92%)' }}>
            {profile?.pseudo ?? 'Élève'}
          </span>{' '}?{' '}
          Ta série de{' '}
          <span className="text-streak font-semibold">{streak} jour{streak > 1 ? 's' : ''}</span>{' '}
          t'attend.
        </motion.p>

        {/* ══ ROW 1 : DEEPWORK HERO (full width) ══ */}
        <div className="mb-6" data-tutorial="deepwork">
          {user && <DeepworkWidget userId={user.id} onXpGain={addXp} />}
        </div>

        {/* ══ ROW 2 : Planning + XP Chart ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 bg-card border border-border rounded-lg p-4 min-h-[280px]" data-tutorial="planning">
            {user && <PlanningMini userId={user.id} onXpGain={addXp} />}
          </div>
          <div className="lg:col-span-2">
            {user && <WeeklyDeepworkGoal userId={user.id} />}
          </div>
        </div>

        {/* ══ ROW 3 : Deepwork Stats (large) + DS + Difficultés ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2 xl:col-span-2">
            {user && <DeepworkStats userId={user.id} />}
          </div>
          {user && <ExamsSection userId={user.id} />}
          {user && <DifficultiesSection userId={user.id} />}
        </div>

        {/* ══ ROW 4 : Comparaison ══ */}
        <div className="mb-6">
          {user && <ProgressComparison userId={user.id} totalXp={totalXp} streak={streak} />}
        </div>

        {/* ══ ROW 5 : Classements (pleine largeur) ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-tutorial="leaderboard">
          <WeeklyLeaderboard
            title="🏆 Classement XP"
            datasets={[
              { label: 'Global',  data: xpGlobal,  unit: 'XP',  emptyLabel: 'Aucun élève' },
              { label: 'Semaine', data: xpWeekly,  unit: 'XP',  emptyLabel: 'Aucun deepwork cette semaine' },
              { label: 'Jour',    data: xpDaily,   unit: 'XP',  emptyLabel: 'Aucun XP aujourd\'hui' },
            ]}
          />
          <WeeklyLeaderboard
            title="⏱ Classement Chrono"
            weeklyChampion={weeklyChampion}
            datasets={[
              { label: 'Global',  data: chronoGlobal, unit: 'min', emptyLabel: 'Aucune session' },
              { label: 'Semaine', data: chronoWeekly, unit: 'min', emptyLabel: 'Aucun deepwork cette semaine' },
              { label: 'Jour',    data: chronoDaily,  unit: 'min', emptyLabel: 'Aucun deepwork aujourd\'hui' },
            ]}
          />
        </div>
      </main>

      <LevelUpOverlay data={levelUpData} onDismiss={() => setLevelUpData(null)} />
      {user && <DSReminderModal userId={user.id} />}
      {user && <EndOfDayReview userId={user.id} />}
      {showTutorial && user && (
        <TutorialOverlay userId={user.id} onXpGain={addXp} onDone={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
