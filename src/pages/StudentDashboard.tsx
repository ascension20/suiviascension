import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowLeft } from 'lucide-react';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { XPBar } from '@/components/XPBar';
import { QuestList, Quest } from '@/components/QuestList';
import { WeeklyLeaderboard, LeaderboardEntry } from '@/components/WeeklyLeaderboard';
import { LevelUpOverlay } from '@/components/LevelUpOverlay';
import { calculateLevel, getTitleForLevel, Subject } from '@/lib/game-utils';

// --- Mock Data ---
const INITIAL_QUESTS: Quest[] = [
  { id: '1', title: 'Exercices chapitre 5 — Fonctions', subject: 'Maths', deadline: new Date(Date.now() + 2 * 86400000).toISOString(), difficulty: 2, xp: 100, isCoachQuest: true, completed: false },
  { id: '2', title: 'Dissertation sur Molière', subject: 'Français', deadline: new Date(Date.now() + 5 * 86400000).toISOString(), difficulty: 1, xp: 50, isCoachQuest: true, completed: false },
  { id: '3', title: 'Réviser formules cinématique', subject: 'Physique', deadline: new Date(Date.now() + 1 * 86400000).toISOString(), difficulty: 3, xp: 150, isCoachQuest: true, completed: false },
  { id: '4', title: 'Fiche vocabulaire unit 8', subject: 'Anglais', deadline: new Date(Date.now() + 7 * 86400000).toISOString(), difficulty: 1, xp: 35, isCoachQuest: false, completed: false },
];

const XP_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, pseudo: 'Enzo', avatar: '🐻', value: 5100 },
  { rank: 2, pseudo: 'Luna', avatar: '🦊', value: 4500 },
  { rank: 3, pseudo: 'Axel', avatar: '🦅', value: 3200 },
  { rank: 4, pseudo: 'Théo', avatar: '🐺', value: 2800, isCurrentUser: true },
  { rank: 5, pseudo: 'Jade', avatar: '🐱', value: 1900 },
];

const TIMER_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, pseudo: 'Enzo', avatar: '🐻', value: 320, subjectBreakdown: { Maths: 140, Physique: 100, SES: 80 } },
  { rank: 2, pseudo: 'Luna', avatar: '🦊', value: 280, subjectBreakdown: { Français: 130, Anglais: 90, Maths: 60 } },
  { rank: 3, pseudo: 'Théo', avatar: '🐺', value: 250, isCurrentUser: true, subjectBreakdown: { Maths: 120, Physique: 80, Français: 50 } },
  { rank: 4, pseudo: 'Jade', avatar: '🐱', value: 195, subjectBreakdown: { SES: 100, Français: 55, Anglais: 40 } },
  { rank: 5, pseudo: 'Axel', avatar: '🦅', value: 150, subjectBreakdown: { Maths: 90, Physique: 60 } },
];

export default function StudentDashboard() {
  const [totalXp, setTotalXp] = useState(2800);
  const [streak] = useState(5);
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [levelUpData, setLevelUpData] = useState<{ level: number; title: string; xpGained: number } | null>(null);

  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);

  const addXp = useCallback((amount: number) => {
    setTotalXp(prev => {
      const oldLevel = calculateLevel(prev).level;
      const newTotal = prev + amount;
      const newLevel = calculateLevel(newTotal).level;
      if (newLevel > oldLevel) {
        setLevelUpData({ level: newLevel, title: getTitleForLevel(newLevel), xpGained: amount });
      }
      return newTotal;
    });
  }, []);

  const handleSessionComplete = useCallback((subject: Subject, durationMinutes: number) => {
    const xp = Math.floor(durationMinutes / 25) * 10;
    if (xp > 0) addXp(xp);
  }, [addXp]);

  const handleQuestComplete = useCallback((questId: string) => {
    setQuests(prev => {
      const quest = prev.find(q => q.id === questId);
      if (quest && !quest.completed) {
        addXp(quest.xp);
        return prev.map(q => q.id === questId ? { ...q, completed: true } : q);
      }
      return prev;
    });
  }, [addXp]);

  const activeQuests = quests.filter(q => !q.completed);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-display text-lg font-semibold hidden sm:block">L'Académie de Fer</h1>
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
              🐺
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-6"
        >
          Prêt pour ta prochaine quête, <span className="text-foreground font-medium">Théo</span> ?
          {' '}Ta série de <span className="text-streak font-semibold">{streak} jours</span> t'attend.
        </motion.p>

        {/* Timer + Quests */}
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

        {/* Leaderboards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WeeklyLeaderboard title="🏆 Classement XP" data={XP_LEADERBOARD} unit="XP" />
          <WeeklyLeaderboard title="⏱ Classement Chrono" data={TIMER_LEADERBOARD} unit="min" />
        </div>
      </main>

      <LevelUpOverlay data={levelUpData} onDismiss={() => setLevelUpData(null)} />
    </div>
  );
}
