import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, BookOpen, AlertTriangle, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';

interface SmartNotification {
  id: string;
  icon: React.ReactNode;
  message: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
}

export function SmartNotifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const buildNotifications = async () => {
      const now = new Date();
      const notifs: SmartNotification[] = [];

      // Fetch all relevant data in parallel
      const [examsRes, sessionsRes, profileRes, diffsRes, plansRes] = await Promise.all([
        supabase.from('exams').select('*').eq('user_id', userId).gte('exam_date', now.toISOString().split('T')[0]).order('exam_date', { ascending: true }),
        supabase.from('timer_sessions').select('*').eq('user_id', userId).gte('created_at', new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('profiles').select('*').eq('user_id', userId).single(),
        supabase.from('difficulties').select('*').eq('user_id', userId).eq('resolved', false),
        supabase.from('weekly_plans').select('*').eq('user_id', userId).eq('validated', true).order('created_at', { ascending: false }).limit(1),
      ]);

      const exams = examsRes.data || [];
      const sessions = sessionsRes.data || [];
      const profile = profileRes.data;
      const diffs = diffsRes.data || [];
      const latestPlan = plansRes.data?.[0];

      // Calculate last session per subject
      const lastSessionBySubject: Record<string, Date> = {};
      sessions.forEach(s => {
        const d = new Date(s.created_at);
        if (!lastSessionBySubject[s.subject] || d > lastSessionBySubject[s.subject]) {
          lastSessionBySubject[s.subject] = d;
        }
      });

      // 1. DS coming up with no recent study in that subject
      exams.forEach(exam => {
        const daysUntil = Math.ceil((new Date(exam.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const lastStudied = lastSessionBySubject[exam.subject];
        const daysSinceStudy = lastStudied ? Math.floor((now.getTime() - lastStudied.getTime()) / (1000 * 60 * 60 * 24)) : 999;

        if (daysUntil <= 7 && daysSinceStudy >= 3) {
          notifs.push({
            id: `exam-gap-${exam.id}`,
            icon: <BookOpen size={16} />,
            message: `Tu n'as pas travaillé les ${exam.subject} depuis ${daysSinceStudy === 999 ? 'longtemps' : `${daysSinceStudy} jours`} et ton DS est dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''} — 25 min maintenant ?`,
            action: '🎯 Lancer un Pomodoro',
            priority: daysUntil <= 3 ? 'high' : 'medium',
            color: daysUntil <= 3 ? 'hsl(var(--destructive))' : 'hsl(var(--streak))',
          });
        }
      });

      // 2. Streak about to break
      if (profile?.last_activity_date) {
        const lastActive = new Date(profile.last_activity_date);
        const hoursSince = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
        if (hoursSince >= 18 && hoursSince < 48 && profile.streak > 0) {
          notifs.push({
            id: 'streak-risk',
            icon: <Flame size={16} />,
            message: `Ta série de ${profile.streak} jours 🔥 est en danger ! Une petite session de 25 min pour la maintenir ?`,
            action: '💪 C\'est parti !',
            priority: 'high',
            color: 'hsl(var(--streak))',
          });
        }
      }

      // 3. Subject imbalance (one subject not studied in a while but has an upcoming exam or difficulty)
      const subjectsWithIssues = new Set([
        ...diffs.map(d => d.subject),
        ...exams.filter(e => {
          const d = Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          return d <= 14;
        }).map(e => e.subject),
      ]);

      subjectsWithIssues.forEach(subject => {
        const lastStudied = lastSessionBySubject[subject];
        const daysSince = lastStudied ? Math.floor((now.getTime() - lastStudied.getTime()) / (1000 * 60 * 60 * 24)) : 999;
        const hasDiff = diffs.some(d => d.subject === subject && d.severity === 'blocking');

        if (daysSince >= 5 && hasDiff) {
          // Avoid duplicate with exam notifications
          if (!notifs.some(n => n.id.startsWith('exam-gap') && n.message.includes(subject))) {
            notifs.push({
              id: `subject-gap-${subject}`,
              icon: <AlertTriangle size={16} />,
              message: `Tu as une difficulté bloquante en ${subject} et tu n'as pas pratiqué depuis ${daysSince === 999 ? 'longtemps' : `${daysSince}j`}. Même 15 min aideraient !`,
              priority: 'medium',
              color: 'hsl(var(--destructive))',
            });
          }
        }
      });

      // 4. Weekly plan available
      if (latestPlan) {
        const planDate = new Date(latestPlan.created_at);
        const hoursSincePlan = (now.getTime() - planDate.getTime()) / (1000 * 60 * 60);
        if (hoursSincePlan < 72) {
          notifs.push({
            id: 'plan-ready',
            icon: <Clock size={16} />,
            message: 'Ton coach a validé un plan de travail pour cette semaine ! Consulte-le 👇',
            priority: 'low',
            color: 'hsl(var(--primary))',
          });
        }
      }

      // 5. Low study time this week
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
      weekStart.setHours(0, 0, 0, 0);
      const thisWeekMinutes = sessions
        .filter(s => new Date(s.created_at) >= weekStart)
        .reduce((a, s) => a + s.duration_minutes, 0);
      const dayOfWeek = now.getDay() || 7; // 1=Mon, 7=Sun
      if (dayOfWeek >= 4 && thisWeekMinutes < 60) {
        notifs.push({
          id: 'low-weekly',
          icon: <Clock size={16} />,
          message: `On est ${['', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'][dayOfWeek]} et tu n'as que ${thisWeekMinutes} min cette semaine. Un petit sprint ?`,
          priority: 'medium',
          color: 'hsl(var(--xp))',
        });
      }

      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      notifs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      setNotifications(notifs);
    };

    buildNotifications();
    // Refresh every 5 minutes
    const interval = setInterval(buildNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const visibleNotifs = notifications.filter(n => !dismissed.has(n.id));

  if (visibleNotifs.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      <AnimatePresence>
        {visibleNotifs.slice(0, 3).map(notif => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 100, height: 0 }}
            className="flex items-start gap-3 p-3.5 rounded-lg border bg-card"
            style={{ borderColor: `${notif.color}40` }}
          >
            <div className="shrink-0 mt-0.5" style={{ color: notif.color }}>
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">{notif.message}</p>
            </div>
            <button
              onClick={() => setDismissed(prev => new Set([...prev, notif.id]))}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
