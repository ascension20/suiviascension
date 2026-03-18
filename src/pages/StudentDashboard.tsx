import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, LogOut } from 'lucide-react';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { XPBar } from '@/components/XPBar';
import { QuestList, Quest } from '@/components/QuestList';
import { WeeklyLeaderboard, LeaderboardEntry } from '@/components/WeeklyLeaderboard';
import { LevelUpOverlay } from '@/components/LevelUpOverlay';
import { calculateLevel, getTitleForLevel, Subject } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function StudentDashboard() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string; xpGained: number } | null>(null);
  const [xpLeaderboard, setXpLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timerLeaderboard, setTimerLeaderboard] = useState<LeaderboardEntry[]>([]);

  const totalXp = profile?.total_xp ?? 0;
  const streak = profile?.streak ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);

  // Load quests
  useEffect(() => {
    if (!user) return;
    const loadQuests = async () => {
      const { data } = await supabase
        .from('quests')
        .select('*')
        .eq('assigned_to', user.id)
        .order('deadline', { ascending: true });
      if (data) {
        setQuests(data.map(q => ({
          id: q.id,
          title: q.title,
          subject: q.subject as Subject,
          deadline: q.deadline || '',
          difficulty: q.difficulty === 'easy' ? 1 : q.difficulty === 'hard' ? 3 : 2,
          xp: q.xp_reward,
          isCoachQuest: true,
          completed: q.completed,
        })));
      }
    };
    loadQuests();

    // Real-time subscription
    const channel = supabase
      .channel('student-quests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quests', filter: `assigned_to=eq.${user.id}` }, () => {
        loadQuests();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Load leaderboards
  useEffect(() => {
    const loadLeaderboards = async () => {
      // XP leaderboard
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, pseudo, avatar, total_xp')
        .order('total_xp', { ascending: false })
        .limit(10);

      if (profiles) {
        setXpLeaderboard(profiles.map((p, i) => ({
          rank: i + 1,
          pseudo: p.pseudo,
          avatar: p.avatar,
          value: p.total_xp,
          isCurrentUser: p.user_id === user?.id,
        })));
      }

      // Timer leaderboard - weekly
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
      startOfWeek.setHours(0, 0, 0, 0);

      const { data: sessions } = await supabase
        .from('timer_sessions')
        .select('user_id, subject, duration_minutes')
        .gte('created_at', startOfWeek.toISOString());

      if (sessions) {
        const byUser: Record<string, { total: number; subjects: Record<string, number> }> = {};
        sessions.forEach(s => {
          if (!byUser[s.user_id]) byUser[s.user_id] = { total: 0, subjects: {} };
          byUser[s.user_id].total += s.duration_minutes;
          byUser[s.user_id].subjects[s.subject] = (byUser[s.user_id].subjects[s.subject] || 0) + s.duration_minutes;
        });

        // Get profiles for these users
        const userIds = Object.keys(byUser);
        if (userIds.length > 0) {
          const { data: timerProfiles } = await supabase
            .from('profiles')
            .select('user_id, pseudo, avatar')
            .in('user_id', userIds);

          if (timerProfiles) {
            const entries = timerProfiles
              .map(p => ({
                pseudo: p.pseudo,
                avatar: p.avatar,
                value: byUser[p.user_id]?.total || 0,
                isCurrentUser: p.user_id === user?.id,
                subjectBreakdown: byUser[p.user_id]?.subjects as Record<Subject, number>,
                rank: 0,
              }))
              .sort((a, b) => b.value - a.value)
              .map((e, i) => ({ ...e, rank: i + 1 }));
            setTimerLeaderboard(entries);
          }
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

    if (newLevel > oldLevel) {
      setLevelUpData({ level: newLevel, title: getTitleForLevel(newLevel), xpGained: amount });
    }

    await supabase.from('profiles').update({ total_xp: newTotal }).eq('user_id', user.id);
    await refreshProfile();
  }, [user, totalXp, refreshProfile]);

  const handleSessionComplete = useCallback(async (subject: Subject, durationMinutes: number) => {
    if (!user) return;
    const xp = Math.floor(durationMinutes / 25) * 10;

    await supabase.from('timer_sessions').insert({
      user_id: user.id,
      subject,
      duration_minutes: durationMinutes,
      xp_earned: xp,
    });

    if (xp > 0) await addXp(xp);
  }, [user, addXp]);

  const handleQuestComplete = useCallback(async (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    await supabase.from('quests').update({
      completed: true,
      completed_at: new Date().toISOString(),
    }).eq('id', questId);

    setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true } : q));
    await addXp(quest.xp);
  }, [quests, addXp]);

  const activeQuests = quests.filter(q => !q.completed);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-lg font-semibold hidden sm:block">Ascension Académique</h1>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border"
              style={{ backgroundColor: 'hsl(var(--streak) / 0.1)' }}
            >
              <Flame size={14} className="text-streak" />
              <span className="font-display text-sm font-semibold text-streak">{streak}</span>
            </div>
            <XPBar current={currentXp} max={requiredXp} level={level} title={title} className="hidden md:flex" />
            <XPBar current={currentXp} max={requiredXp} level={level} title={title} compact className="md:hidden" />
            <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-lg">
              {profile?.avatar ?? '🐺'}
            </div>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-6"
        >
          Prêt pour ta prochaine quête, <span className="text-foreground font-medium">{profile?.pseudo ?? 'Élève'}</span> ?
          {' '}Ta série de <span className="text-streak font-semibold">{streak} jours</span> t'attend.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6"
            style={{ background: 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(225, 28%, 12%) 100%)' }}
          >
            <PomodoroTimer onSessionComplete={handleSessionComplete} />
          </div>
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
            <h2 className="font-display text-base font-semibold mb-4 flex items-center gap-2">
              ⚔️ Quêtes actives
              <span className="text-xs text-muted-foreground font-normal">({activeQuests.length})</span>
            </h2>
            <QuestList quests={activeQuests} onComplete={handleQuestComplete} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WeeklyLeaderboard title="🏆 Classement XP" data={xpLeaderboard} unit="XP" />
          <WeeklyLeaderboard title="⏱ Classement Chrono" data={timerLeaderboard} unit="min" />
        </div>
      </main>

      <LevelUpOverlay data={levelUpData} onDismiss={() => setLevelUpData(null)} />
    </div>
  );
}
