import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, LogOut, WifiOff, Music, Music2 } from 'lucide-react';
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
import { GradeAverages } from '@/components/GradeAverages';
import { SmartNotifications } from '@/components/SmartNotifications';
import { ProgressComparison } from '@/components/ProgressComparison';
import { WeeklyPlanView } from '@/components/WeeklyPlanView';
import { TutorialOverlay } from '@/components/Tutorial/TutorialOverlay';
import { calculateLevel, getTitleForLevel, Subject } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { useOnlineTracker, updateStreak } from '@/hooks/useOnlineTracker';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { useLofiMusic, playXpSound } from '@/hooks/useXpAudio';
import { supabase } from '@/integrations/supabase/client';

export default function StudentDashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string; xpGained: number } | null>(null);
  const [xpLeaderboard, setXpLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timerLeaderboard, setTimerLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [weeklyChampion, setWeeklyChampion] = useState<string | null>(null);
  const [dailyGatePassed, setDailyGatePassed] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { enabled: lofiOn, toggle: toggleLofi } = useLofiMusic();

  const { isOnline, pendingCount } = useOfflineQueue();
  useOnlineTracker(user?.id);

  const totalXp = profile?.total_xp ?? 0;
  const streak = profile?.streak ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);

  // Onboarding redirect
  useEffect(() => {
    if (profile && profile.onboarding_completed === false) {
      navigate('/onboarding');
    }
    if (profile && profile.tutorial_completed === false && profile.onboarding_completed) {
      setShowTutorial(true);
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (!user) return;
    const loadLeaderboards = async () => {
      const { data: profiles } = await supabase.from('profiles').select('user_id, pseudo, avatar, total_xp').order('total_xp', { ascending: false }).limit(10);
      if (profiles) {
        setXpLeaderboard(profiles.map((p, i) => ({
          rank: i + 1, pseudo: p.pseudo, avatar: p.avatar,
          value: p.total_xp, isCurrentUser: p.user_id === user.id,
        })));
      }
      const startOfWeek = new Date();
      const day = startOfWeek.getDay();
      startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
      startOfWeek.setHours(0, 0, 0, 0);
      const { data: sessions } = await supabase.from('timer_sessions').select('user_id, subject, duration_minutes').gte('created_at', startOfWeek.toISOString());
      if (sessions && sessions.length > 0) {
        const byUser: Record<string, { total: number; subjects: Record<string, number> }> = {};
        sessions.forEach(s => {
          if (!byUser[s.user_id]) byUser[s.user_id] = { total: 0, subjects: {} };
          byUser[s.user_id].total += s.duration_minutes;
          byUser[s.user_id].subjects[s.subject] = (byUser[s.user_id].subjects[s.subject] || 0) + s.duration_minutes;
        });
        const userIds = Object.keys(byUser);
        const { data: timerProfiles } = await supabase.from('profiles').select('user_id, pseudo, avatar').in('user_id', userIds);
        if (timerProfiles) {
          const entries = timerProfiles.map(p => ({
            pseudo: p.pseudo, avatar: p.avatar,
            value: byUser[p.user_id]?.total || 0,
            isCurrentUser: p.user_id === user.id,
            subjectBreakdown: byUser[p.user_id]?.subjects as Record<Subject, number>,
            rank: 0,
          })).sort((a, b) => b.value - a.value).map((e, i) => ({ ...e, rank: i + 1 }));
          setTimerLeaderboard(entries);
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
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-lg font-semibold hidden sm:block">Ascension Académique</h1>
          <div className="flex items-center gap-3">
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
                <WifiOff size={12} />
                <span>Hors ligne{pendingCount > 0 ? ` (${pendingCount})` : ''}</span>
              </div>
            )}
            <button onClick={toggleLofi} title={lofiOn ? 'Couper la musique lofi' : 'Activer la musique lofi'}
              className={`p-1.5 rounded-md hover:bg-secondary ${lofiOn ? 'text-amber-400' : 'text-muted-foreground'}`}>
              {lofiOn ? <Music2 size={16} /> : <Music size={16} />}
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border" style={{ backgroundColor: 'hsl(var(--streak) / 0.1)' }}>
              <Flame size={14} className="text-streak" />
              <span className="font-display text-sm font-semibold text-streak">{streak}</span>
            </div>
            <XPBar current={currentXp} max={requiredXp} level={level} title={title} className="hidden md:flex" />
            <XPBar current={currentXp} max={requiredXp} level={level} title={title} compact className="md:hidden" />
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-lg">
                {profile?.avatar ?? '🐺'}
              </div>
              {weeklyChampion === profile?.pseudo && (
                <span className="absolute -top-1 -right-1 text-sm" title="Premier du classement chrono cette semaine !">👑</span>
              )}
            </div>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {user && <SmartNotifications userId={user.id} />}

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground mb-6">
          Prêt pour ta prochaine quête, <span className="text-foreground font-medium">{profile?.pseudo ?? 'Élève'}</span> ?
          {' '}Ta série de <span className="text-streak font-semibold">{streak} jours</span> t'attend.
        </motion.p>

        {/* Ligne 1 : Deepwork + Planning */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3" data-tutorial="deepwork">
            {user && <DeepworkWidget userId={user.id} onXpGain={addXp} />}
          </div>
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 min-h-[280px]" data-tutorial="planning">
            {user && <PlanningMini userId={user.id} onXpGain={addXp} />}
          </div>
        </div>

        {/* Ligne 2 : XP Chart + Deepwork Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {user && <XPProgressionChart userId={user.id} totalXp={totalXp} />}
          {user && <DeepworkStats userId={user.id} />}
        </div>

        {/* Ligne 3 : Moyennes + Plan semaine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {user && <GradeAverages userId={user.id} />}
          {user && <WeeklyPlanView userId={user.id} />}
        </div>

        {/* Ligne 4 : Progression comparée (pleine largeur) */}
        <div className="mb-6">
          {user && <ProgressComparison userId={user.id} totalXp={totalXp} streak={streak} />}
        </div>

        {/* Ligne 5 : DS + Difficultés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {user && <ExamsSection userId={user.id} />}
          {user && <DifficultiesSection userId={user.id} />}
        </div>

        {/* Ligne 6 : Classements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-tutorial="leaderboard">
          <WeeklyLeaderboard title="🏆 Classement XP" data={xpLeaderboard} unit="XP" />
          <WeeklyLeaderboard title="⏱ Classement Chrono" data={timerLeaderboard} unit="min" weeklyChampion={weeklyChampion} />
        </div>
      </main>

      <LevelUpOverlay data={levelUpData} onDismiss={() => setLevelUpData(null)} />
      {user && <EndOfDayReview userId={user.id} />}
      {showTutorial && user && (
        <TutorialOverlay userId={user.id} onXpGain={addXp} onDone={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
