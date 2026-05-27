import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, LogOut, WifiOff, Bell, BellOff } from 'lucide-react';
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
import { EventFormModal } from '@/components/Planning/EventFormModal';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { useOnlineTracker, updateStreak } from '@/hooks/useOnlineTracker';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { playXpSound } from '@/hooks/useXpAudio';
import { supabase } from '@/integrations/supabase/client';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

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
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const [creatingDs, setCreatingDs] = useState(false);
  const { permission, subscribed, loading: pushLoading, isSupported: pushSupported, subscribe: subscribePush, unsubscribe: unsubscribePush } = usePushNotifications(user?.id);
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
    if (profile && !profile.tutorial_completed && profile.onboarding_completed) setShowTutorial(true);
  }, [profile, navigate]);

  useEffect(() => {
    if (!user) return;
    const loadLeaderboards = async () => {
      // ── Time boundaries (local midnight → ISO for Supabase) ──────────────
      const now = new Date();

      const weekStart = new Date(now);
      const dow = weekStart.getDay();
      weekStart.setDate(weekStart.getDate() - (dow === 0 ? 6 : dow - 1));
      weekStart.setHours(0, 0, 0, 0);

      const dayStart = new Date(now);
      dayStart.setHours(0, 0, 0, 0);

      // ── Fetch everything in parallel ─────────────────────────────────────
      const [profsRes, weekXpRes, dayXpRes, weekSecRes, daySecRes, avatarCfgsRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('user_id, pseudo, avatar, total_xp, total_deepwork_seconds'),
        // XP weekly / daily → from xp_history (captures deepwork + quest + tutorial)
        supabase
          .from('xp_history')
          .select('user_id, amount')
          .gte('created_at', weekStart.toISOString()),
        supabase
          .from('xp_history')
          .select('user_id, amount')
          .gte('created_at', dayStart.toISOString()),
        // Chrono weekly / daily → still from deepwork_sessions (actual time spent)
        supabase
          .from('deepwork_sessions')
          .select('user_id, duration_seconds')
          .gte('started_at', weekStart.toISOString()),
        supabase
          .from('deepwork_sessions')
          .select('user_id, duration_seconds')
          .gte('started_at', dayStart.toISOString()),
        supabase
          .from('avatar_configs')
          .select('user_id, hat, glasses, outfit, background, badge, skin_color, hair_style, hair_color'),
      ]);

      const profs        = profsRes.data     ?? [];
      const weekXpRows   = weekXpRes.data    ?? [];
      const dayXpRows    = dayXpRes.data     ?? [];
      const weekSessions = weekSecRes.data   ?? [];
      const daySessions  = daySecRes.data    ?? [];
      const avatarCfgs   = avatarCfgsRes.data ?? [];

      // Build avatar config map per user
      const cfgMap: Record<string, AvatarConfig> = {};
      avatarCfgs.forEach(ac => {
        cfgMap[ac.user_id] = {
          hat:        ac.hat        ?? null,
          glasses:    ac.glasses    ?? null,
          outfit:     ac.outfit     ?? null,
          background: ac.background ?? DEFAULT_AVATAR_CONFIG.background,
          badge:      ac.badge      ?? null,
          skinColor:  ac.skin_color ?? DEFAULT_AVATAR_CONFIG.skinColor,
          hairStyle:  ac.hair_style ?? DEFAULT_AVATAR_CONFIG.hairStyle,
          hairColor:  ac.hair_color ?? DEFAULT_AVATAR_CONFIG.hairColor,
        };
      });
      const avatarUrl = (uid: string, pseudo: string) =>
        buildAvataaarsUrl(cfgMap[uid] ?? DEFAULT_AVATAR_CONFIG, pseudo || uid);

      // Profile lookup map
      const profMap: Record<string, { pseudo: string; avatar: string }> = {};
      profs.forEach(p => {
        const pseudo = p.pseudo ?? 'Élève';
        profMap[p.user_id] = { pseudo, avatar: avatarUrl(p.user_id, pseudo) };
      });

      // Aggregate rows by user
      const aggXp = (rows: { user_id: string; amount: number }[]): Record<string, number> => {
        const acc: Record<string, number> = {};
        rows.forEach(r => { acc[r.user_id] = (acc[r.user_id] ?? 0) + (r.amount ?? 0); });
        return acc;
      };
      const aggSec = (rows: { user_id: string; duration_seconds: number }[]): Record<string, number> => {
        const acc: Record<string, number> = {};
        rows.forEach(r => { acc[r.user_id] = (acc[r.user_id] ?? 0) + (r.duration_seconds ?? 0); });
        return acc;
      };

      const weekXpByUser  = aggXp(weekXpRows);
      const dayXpByUser   = aggXp(dayXpRows);
      const weekSecByUser = aggSec(weekSessions);
      const daySecByUser  = aggSec(daySessions);

      // Build a sorted, consecutively ranked leaderboard from a score map
      const buildBoard = (
        scores: Record<string, number>,
        transform: (v: number) => number = v => v,
      ): LeaderboardEntry[] =>
        Object.entries(scores)
          .map(([uid, raw]) => ({ uid, val: transform(raw) }))
          .filter(x => x.val > 0)                          // filter BEFORE ranking
          .sort((a, b) => b.val - a.val)
          .slice(0, 10)
          .map((x, i) => ({
            rank:  i + 1,                                  // consecutive ranks
            userId: x.uid,
            pseudo:  profMap[x.uid]?.pseudo ?? 'Élève',
            avatar:  profMap[x.uid]?.avatar ?? '🐺',
            value:   x.val,
            isCurrentUser: x.uid === user.id,
          }));

      // ── Global boards (from profiles, all-time) ──────────────────────────
      const xpGlobal = profs
        .filter(p => (p.total_xp ?? 0) > 0)
        .sort((a, b) => (b.total_xp ?? 0) - (a.total_xp ?? 0))
        .slice(0, 10)
        .map((p, i) => {
          const pseudo = p.pseudo ?? 'Élève';
          return {
            rank: i + 1,
            userId: p.user_id,
            pseudo,
            avatar: avatarUrl(p.user_id, pseudo),
            value:  p.total_xp ?? 0,
            isCurrentUser: p.user_id === user.id,
          };
        });

      const chGlobal = profs
        .filter(p => (p.total_deepwork_seconds ?? 0) > 0)
        .sort((a, b) => (b.total_deepwork_seconds ?? 0) - (a.total_deepwork_seconds ?? 0))
        .slice(0, 10)
        .map((p, i) => {
          const pseudo = p.pseudo ?? 'Élève';
          return {
            rank: i + 1,
            userId: p.user_id,
            pseudo,
            avatar: avatarUrl(p.user_id, pseudo),
            value:  Math.round((p.total_deepwork_seconds ?? 0) / 60),
            isCurrentUser: p.user_id === user.id,
          };
        });

      // ── Weekly / daily boards (from deepwork_sessions) ───────────────────
      const xpWeekly  = buildBoard(weekXpByUser);
      const xpDaily   = buildBoard(dayXpByUser);
      const chWeekly  = buildBoard(weekSecByUser, v => Math.round(v / 60));
      const chDaily   = buildBoard(daySecByUser,  v => Math.round(v / 60));

      setXpGlobal(xpGlobal);
      setXpWeekly(xpWeekly);
      setXpDaily(xpDaily);
      setChronoGlobal(chGlobal);
      setChronoWeekly(chWeekly);
      setChronoDaily(chDaily);

      // Weekly champion = #1 chrono this week (shown as crown on Chrono board)
      if (chWeekly.length > 0) setWeeklyChampion(chWeekly[0].pseudo);

      // Current user avatar for HUD
      if (user) {
        setCurrentAvatarUrl(avatarUrl(user.id, profile?.pseudo ?? user.id));
      }
    };
    loadLeaderboards();
  }, [user]);

  const addXp = useCallback(async (amount: number, source = 'quest') => {
    if (!user) return;
    const oldLevel = calculateLevel(totalXp).level;
    const newTotal = totalXp + amount;
    const newLevel = calculateLevel(newTotal).level;
    if (newLevel > oldLevel) setLevelUpData({ level: newLevel, title: getTitleForLevel(newLevel), xpGained: amount });
    await Promise.all([
      supabase.from('profiles').update({ total_xp: newTotal }).eq('user_id', user.id),
      supabase.from('xp_history').insert({ user_id: user.id, amount, source }),
    ]);
    await updateStreak(user.id);
    playXpSound();
    await refreshProfile();
  }, [user, totalXp, refreshProfile]);

  if (user && profile?.onboarding_completed === false) return null;

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HEADER ─── */}
      <header className="border-b border-border px-4 md:px-6 py-3 sticky top-0 z-30 backdrop-blur-sm hud-top-line"
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
            <div data-tutorial="streak" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                 style={{ borderColor: 'hsl(var(--streak) / 0.3)', backgroundColor: 'hsl(var(--streak) / 0.1)' }}>
              <Flame size={14} className="text-streak" />
              <span className="font-display text-sm font-semibold text-streak">{streak}</span>
            </div>

            <div data-tutorial="xpbar" className="hidden md:flex">
              <XPBar current={currentXp} max={requiredXp} level={level} title={title} />
            </div>
            <div className="md:hidden">
              <XPBar current={currentXp} max={requiredXp} level={level} title={title} compact />
            </div>

            {/* Avatar */}
            <button
              data-tutorial="profile"
              onClick={() => navigate('/student/profile')}
              className="relative group"
              title="Mon profil"
            >
              <div
                className="w-9 h-9 rounded-full border overflow-hidden transition-all"
                style={{ backgroundColor: 'hsl(222 22% 12%)', borderColor: 'hsl(43 90% 50% / 0.3)' }}
              >
                {currentAvatarUrl
                  ? <img src={currentAvatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="w-full h-full flex items-center justify-center text-lg">🐺</span>
                }
              </div>
              {weeklyChampion === profile?.pseudo && (
                <span className="absolute -top-1 -right-1 text-sm" title="Premier du classement chrono !">👑</span>
              )}
            </button>

            {/* Notification bell */}
            {pushSupported && permission !== 'denied' && (
              <button
                onClick={() => subscribed ? unsubscribePush() : subscribePush()}
                disabled={pushLoading}
                title={subscribed ? 'Désactiver les notifications' : 'Activer les notifications push'}
                className="relative text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {subscribed
                  ? <Bell size={18} style={{ color: 'hsl(43 90% 55%)' }} />
                  : <BellOff size={18} />
                }
                {subscribed && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                        style={{ background: 'hsl(142 71% 50%)', boxShadow: '0 0 4px hsl(142 71% 50%)' }} />
                )}
              </button>
            )}

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
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-card border border-border rounded-lg p-4 min-h-[280px] game-panel"
            data-tutorial="planning"
          >
            {user && <PlanningMini userId={user.id} onXpGain={addXp} />}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="lg:col-span-2"
          >
            {user && <WeeklyDeepworkGoal userId={user.id} onXpGain={addXp} />}
          </motion.div>
        </div>

        {/* ══ ROW 3 : Deepwork Stats (large) + DS + Difficultés ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="md:col-span-2 xl:col-span-2"
          >
            {user && <DeepworkStats userId={user.id} />}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          >
            {user && <ExamsSection userId={user.id} />}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
          >
            {user && <DifficultiesSection userId={user.id} />}
          </motion.div>
        </div>

        {/* ══ ROW 4 : Comparaison ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
          className="mb-6"
        >
          {user && <ProgressComparison userId={user.id} totalXp={totalXp} streak={streak} />}
        </motion.div>

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
      {user && <DSReminderModal userId={user.id} onAddDs={() => setCreatingDs(true)} />}
      {creatingDs && user && (
        <EventFormModal
          userId={user.id}
          defaultType="ds"
          onClose={() => setCreatingDs(false)}
          onSaved={() => setCreatingDs(false)}
        />
      )}
      {user && <EndOfDayReview userId={user.id} />}
      {showTutorial && user && (
        <TutorialOverlay userId={user.id} onXpGain={addXp} onDone={() => setShowTutorial(false)} />
      )}
    </div>
  );
}
