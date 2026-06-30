import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, WifiOff, Bell, BellOff, Menu, X, LayoutDashboard, BookOpen, LogOut, Crown, Trophy, Timer, User } from 'lucide-react';
import { ResourcesTab } from '@/components/Resources/ResourcesTab';
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
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ressources'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleBellClick = useCallback(async () => {
    if (subscribed) {
      await unsubscribePush();
      toast({ title: 'Notifications désactivées', description: 'Tu ne recevras plus de rappels push.' });
      return;
    }
    const result = await subscribePush();
    if (result.ok === true) {
      toast({ title: 'Notifications activées !', description: 'Tu recevras des rappels DS et deepwork sur cet appareil.' });
      return;
    }
    const reason = result.reason;
    if (reason === 'no_vapid_key') {
      toast({ title: 'Config manquante', description: 'La clé VAPID n\'est pas configurée. Ajoute VITE_VAPID_PUBLIC_KEY dans les variables d\'environnement Lovable.', variant: 'destructive' });
    } else if (reason === 'permission_denied') {
      toast({ title: 'Permission refusée', description: 'Autorise les notifications dans les réglages de ton navigateur.', variant: 'destructive' });
    } else if (reason === 'sw_failed') {
      toast({ title: 'Service worker échoué', description: 'Recharge la page et réessaie.', variant: 'destructive' });
    } else if (reason === 'db_failed') {
      toast({ title: 'Tables SQL manquantes', description: 'Lance les migrations push_subscriptions dans Supabase SQL Editor.', variant: 'destructive' });
    } else if (reason === 'subscribe_failed') {
      toast({ title: 'Abonnement push échoué', description: 'La clé VAPID est peut-être incorrecte. Vérifie VITE_VAPID_PUBLIC_KEY.', variant: 'destructive' });
    } else {
      toast({ title: 'Erreur inconnue', description: 'Ouvre la console (F12) pour plus de détails.', variant: 'destructive' });
    }
  }, [subscribed, subscribePush, unsubscribePush, toast]);

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
      // Epoch = all-time anchor so global boards use the same RPC as weekly/daily
      // → prevents impossible "weekly XP > global XP" when profiles.total_xp drifts
      const epoch = new Date(0).toISOString();

      const [profsRes, allXpRes, weekXpRes, dayXpRes, allSecRes, weekSecRes, daySecRes, avatarCfgsRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('user_id, pseudo, avatar'),
        // XP global / weekly / daily → all via the same RPC (xp_history source)
        supabase.rpc('get_xp_leaderboard', { _since: epoch }),
        supabase.rpc('get_xp_leaderboard', { _since: weekStart.toISOString() }),
        supabase.rpc('get_xp_leaderboard', { _since: dayStart.toISOString() }),
        // Chrono global / weekly / daily → all via the same RPC (deepwork_sessions source)
        supabase.rpc('get_deepwork_leaderboard', { _since: epoch }),
        supabase.rpc('get_deepwork_leaderboard', { _since: weekStart.toISOString() }),
        supabase.rpc('get_deepwork_leaderboard', { _since: dayStart.toISOString() }),
        supabase
          .from('avatar_configs')
          .select('user_id, hat, glasses, outfit, background, badge, skin_color, hair_style, hair_color'),
      ]);

      const profs        = profsRes.data     ?? [];
      const allXpRows    = (allXpRes.data     ?? []) as { user_id: string; total: number }[];
      const weekXpRows   = (weekXpRes.data    ?? []) as { user_id: string; total: number }[];
      const dayXpRows    = (dayXpRes.data     ?? []) as { user_id: string; total: number }[];
      const allSessions  = (allSecRes.data    ?? []) as { user_id: string; total_seconds: number }[];
      const weekSessions = (weekSecRes.data   ?? []) as { user_id: string; total_seconds: number }[];
      const daySessions  = (daySecRes.data    ?? []) as { user_id: string; total_seconds: number }[];
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

      // RPC results are already aggregated per user — just map to score dicts
      const toMap = <K extends string>(rows: Array<{ user_id: string } & Record<K, number>>, key: K): Record<string, number> => {
        const acc: Record<string, number> = {};
        rows.forEach(r => { acc[r.user_id] = (r[key] ?? 0) as number; });
        return acc;
      };

      const allXpByUser   = toMap(allXpRows,    'total');
      const weekXpByUser  = toMap(weekXpRows,   'total');
      const dayXpByUser   = toMap(dayXpRows,    'total');
      const allSecByUser  = toMap(allSessions,  'total_seconds');
      const weekSecByUser = toMap(weekSessions, 'total_seconds');
      const daySecByUser  = toMap(daySessions,  'total_seconds');

      // Build a sorted, consecutively ranked leaderboard from a score map
      // All boards (global, weekly, daily) come from the same RPC source so
      // it is impossible for a period board to show more than the global board.
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
            avatar:  profMap[x.uid]?.avatar ?? '',
            value:   x.val,
            isCurrentUser: x.uid === user.id,
          }));

      // ── All boards from the same RPC source ──────────────────────────────
      const xpGlobal  = buildBoard(allXpByUser);
      const chGlobal  = buildBoard(allSecByUser,  v => Math.round(v / 60));

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
      <header
        className="border-b border-border px-4 md:px-6 py-3 sticky top-0 z-30 backdrop-blur-sm hud-top-line"
        style={{ backgroundColor: 'hsl(222 22% 4% / 0.95)', backdropFilter: 'blur(20px) saturate(1.8)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Menu"
            >
              <Menu size={20} />
            </button>

          {/* Logo */}
          <div className="items-center gap-2 shrink-0 hidden sm:flex">
            <span className="font-display text-sm font-black tracking-[0.12em] uppercase"
                  style={{ color: 'hsl(42 12% 75%)' }}>
              Ascension
            </span>
            <span
              className="font-display text-sm font-black tracking-tight neon-gold stat-badge px-2 py-0.5"
              style={{
                background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%))',
                color: 'hsl(222 22% 8%)',
                boxShadow: '0 0 12px hsl(43 90% 50% / 0.6)',
              }}
            >
              20
            </span>
            {/* Online indicator */}
            {isOnline && (
              <div className="hidden md:flex items-center gap-1.5 ml-1">
                <span
                  className="live-dot w-1.5 h-1.5"
                  style={{ background: 'hsl(142 71% 50%)', color: 'hsl(142 71% 50%)' }}
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: 'hsl(142 71% 50% / 0.7)' }}>
                  online
                </span>
              </div>
            )}
          </div>
          </div> {/* end left group */}

          <div className="flex items-center gap-2 md:gap-3">
            {!isOnline && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
                <WifiOff size={12} />
                <span className="hidden sm:inline">Hors ligne{pendingCount > 0 ? ` (${pendingCount})` : ''}</span>
              </div>
            )}

            {/* Streak badge */}
            <div
              data-tutorial="streak"
              className="flex items-center gap-1.5 px-3 py-1.5 stat-badge"
              style={{
                background: 'hsl(var(--streak) / 0.12)',
                border: '1px solid hsl(var(--streak) / 0.35)',
                boxShadow: streak > 0 ? '0 0 14px hsl(var(--streak) / 0.2)' : undefined,
              }}
            >
              <Flame size={13} className="text-streak" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--streak)))' }} />
              <span className="font-display text-sm font-black text-streak hud-number" style={{ color: 'hsl(var(--streak))' }}>
                {streak}
              </span>
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
                className="w-9 h-9 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                style={{
                  border: '2px solid hsl(43 90% 50% / 0.4)',
                  background: 'hsl(222 22% 12%)',
                  boxShadow: '0 0 10px hsl(43 90% 50% / 0.2)',
                }}
              >
                {currentAvatarUrl
                  ? <img src={currentAvatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <User size={18} style={{ color: "hsl(220 10% 50%)" }} />
                }
              </div>
              {weeklyChampion === profile?.pseudo && (
                <span className="absolute -top-1 -right-1" title="Premier du classement chrono !">
                  <Crown size={14} className="champion-glow" style={{ color: 'hsl(43 90% 55%)' }} />
                </span>
              )}
            </button>

            {/* Notification bell */}
            {pushSupported && permission !== 'denied' && (
              <button
                onClick={handleBellClick}
                disabled={pushLoading}
                title={subscribed ? 'Désactiver les notifications' : 'Activer les notifications push'}
                className="relative transition-all duration-200 hover:scale-110 disabled:opacity-50"
                style={{ color: subscribed ? 'hsl(43 90% 55%)' : 'hsl(220 10% 50%)' }}
              >
                {subscribed
                  ? <Bell size={18} style={{ filter: 'drop-shadow(0 0 5px hsl(43 90% 55%))' }} />
                  : <BellOff size={18} />
                }
                {subscribed && (
                  <span
                    className="live-dot absolute -top-0.5 -right-0.5 w-2 h-2"
                    style={{ background: 'hsl(142 71% 50%)', color: 'hsl(142 71% 50%)' }}
                  />
                )}
              </button>
            )}

          </div>
        </div>
      </header>

      {/* ─── SIDEBAR ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-60 z-50 flex flex-col"
              style={{
                background: 'hsl(222 22% 6%)',
                borderRight: '1px solid hsl(220 15% 18%)',
                boxShadow: '4px 0 32px hsl(222 22% 0% / 0.6)',
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-4 border-b"
                   style={{ borderColor: 'hsl(220 15% 18%)' }}>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-black tracking-[0.12em] uppercase"
                        style={{ color: 'hsl(42 12% 75%)' }}>Ascension</span>
                  <span className="font-display text-sm font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 60%))',
                          color: 'hsl(222 22% 8%)',
                        }}>20</span>
                </div>
                <button onClick={() => setSidebarOpen(false)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 p-3 space-y-1">
                {([
                  { id: 'dashboard',  label: 'Dashboard',   icon: LayoutDashboard },
                  { id: 'ressources', label: 'Ressources',  icon: BookOpen },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${activeTab === id
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
                      }`}
                  >
                    <Icon size={16} />
                    {label}
                    {activeTab === id && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-3 border-t" style={{ borderColor: 'hsl(220 15% 18%)' }}>
                <button onClick={signOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── MAIN ─── */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* ── Ressources tab ── */}
        {activeTab === 'ressources' && <ResourcesTab onXpGain={addXp} />}

        {/* ── Dashboard tab ── */}
        {activeTab === 'dashboard' && <>

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
            title="Classement XP"
            defaultPeriodIdx={1}
            datasets={[
              { label: 'Global',  data: xpGlobal,  unit: 'XP',  emptyLabel: 'Aucun élève' },
              { label: 'Semaine', data: xpWeekly,  unit: 'XP',  emptyLabel: 'Aucune activité cette semaine' },
              { label: 'Jour',    data: xpDaily,   unit: 'XP',  emptyLabel: 'Aucune activité aujourd\'hui' },
            ]}
          />
          <WeeklyLeaderboard
            title="Classement Chrono"
            weeklyChampion={weeklyChampion}
            defaultPeriodIdx={1}
            datasets={[
              { label: 'Global',  data: chronoGlobal, unit: 'min', emptyLabel: 'Aucune session' },
              { label: 'Semaine', data: chronoWeekly, unit: 'min', emptyLabel: 'Aucun deepwork cette semaine' },
              { label: 'Jour',    data: chronoDaily,  unit: 'min', emptyLabel: 'Aucun deepwork aujourd\'hui' },
            ]}
          />
        </div>

        </>} {/* end dashboard tab */}

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
