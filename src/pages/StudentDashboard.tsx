import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, LogOut, WifiOff } from 'lucide-react';
import { DeepworkWidget } from '@/components/Deepwork/DeepworkWidget';
import { DeepworkStats } from '@/components/Deepwork/DeepworkStats';
import { PlanningMini } from '@/components/Planning/PlanningMini';
import { DailyTaskGate } from '@/components/DailyTaskGate';
import { EndOfDayReview } from '@/components/EndOfDayReview';
import { XPBar } from '@/components/XPBar';
import { WeeklyLeaderboard, LeaderboardEntry } from '@/components/WeeklyLeaderboard';
import { LevelUpOverlay } from '@/components/LevelUpOverlay';
import { DifficultiesSection } from '@/components/DifficultiesSection';
import { ExamsSection } from '@/components/ExamsSection';
import { XPProgressionChart } from '@/components/XPProgressionChart';

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
  const [xpLeaderboard, setXpLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timerLeaderboard, setTimerLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weeklyChampion, setWeeklyChampion] = useState<string | null>(null);
  const [dailyGatePassed, setDailyGatePassed] = useState(false);
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
      const day = startOfWeek.getDay();
      startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      // ── 1. Classement Global XP (all-time) ──
      const { data: allProfiles } = await supabase
        .from('profiles').select('user_id, pseudo, avatar, total_xp, today_xp, today_xp_date')
        .order('total_xp', { ascending: false }).limit(10);

      if (allProfiles) {
        setXpLeaderboard(allProfiles.map((p, i) => ({
          rank: i + 1, userId: p.user_id, pseudo: p.pseudo, avatar: p.avatar,
          value: p.total_xp, isCurrentUser: p.user_id === user.id,
        })));

        // ── 3. Classement Journalier (today_xp) ──
        const daily = [...allProfiles]
          .map(p => ({ ...p, dayXp: p.today_xp_date === today ? (p.today_xp ?? 0) : 0 }))
          .filter(p => p.dayXp > 0)
          .sort((a, b) => b.dayXp - a.dayXp)
          .slice(0, 10)
          .map((p, i) => ({
            rank: i + 1, userId: p.user_id, pseudo: p.pseudo, avatar: p.avatar,
            value: p.dayXp, isCurrentUser: p.user_id === user.id,
          }));
        setTimerLeaderboard(daily); // reuse for daily
      }

      // ── 2. Classement Hebdomadaire (deepwork XP cette semaine) ──
      const { data: dwSessions } = await supabase
        .from('deepwork_sessions')
        .select('user_id, xp_earned')
        .gte('started_at', startOfWeek.toISOString());

      if (dwSessions && dwSessions.length > 0) {
        const byUser: Record<string, number> = {};
        dwSessions.forEach(s => { byUser[s.user_id] = (byUser[s.user_id] || 0) + (s.xp_earned ?? 0); });
        const userIds = Object.keys(byUser);
        const { data: wkProfiles } = await supabase
          .from('profiles').select('user_id, pseudo, avatar').in('user_id', userIds);
        if (wkProfiles) {
          const entries = wkProfiles
            .map(p => ({ rank: 0, userId: p.user_id, pseudo: p.pseudo, avatar: p.avatar, value: byUser[p.user_id] || 0, isCurrentUser: p.user_id === user.id }))
            .sort((a, b) => b.value - a.value)
            .map((e, i) => ({ ...e, rank: i + 1 }));
          setWeeklyLeaderboard(entries);
          if (entries.length > 0) setWeeklyChampion(entries[0].pseudo);
        }
      }
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
  if (user && !dailyGatePassed) {
    return <DailyTaskGate userId={user.id} onComplete={() => setDailyGatePassed(true)} />;
  }

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
            {user && <XPProgressionChart userId={user.id} totalXp={totalXp} />}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-tutorial="leaderboard">
          <WeeklyLeaderboard
            title="🌍 Classement Global"
            subtitle="XP total cumulé"
            data={xpLeaderboard}
            unit="XP"
            emptyLabel="Aucun élève"
          />
          <WeeklyLeaderboard
            title="📅 Classement Semaine"
            subtitle="XP deepwork cette semaine"
            data={weeklyLeaderboard}
            unit="XP"
            weeklyChampion={weeklyChampion}
            emptyLabel="Aucune session cette semaine"
          />
          <WeeklyLeaderboard
            title="☀️ Classement Aujourd'hui"
            subtitle="XP quêtes du jour"
            data={timerLeaderboard}
            unit="XP"
            emptyLabel="Aucune quête validée aujourd'hui"
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
