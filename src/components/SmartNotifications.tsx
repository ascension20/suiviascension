import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock, BookOpen, AlertTriangle, Flame, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SmartNotification {
  id: string;
  icon: React.ReactNode;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  priority: 'high' | 'medium' | 'low';
  color: string;
}

const LS_DISMISSED_PREFIX = 'ascension_notif_dismissed_';

function isDismissedToday(id: string): boolean {
  try {
    const val = localStorage.getItem(LS_DISMISSED_PREFIX + id);
    if (!val) return false;
    return val === new Date().toISOString().slice(0, 10);
  } catch { return false; }
}

function dismissForToday(id: string) {
  try {
    localStorage.setItem(LS_DISMISSED_PREFIX + id, new Date().toISOString().slice(0, 10));
  } catch {}
}

export function SmartNotifications({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const buildNotifications = async () => {
      const now = new Date();
      const notifs: SmartNotification[] = [];

      // ── Fetch all relevant data in parallel ───────────────────────────────
      const [examsRes, profileRes, diffsRes, lastDeepworkRes] = await Promise.all([
        supabase
          .from('exams')
          .select('*')
          .eq('user_id', userId)
          .gte('exam_date', now.toISOString().split('T')[0])
          .order('exam_date', { ascending: true }),
        supabase.from('profiles').select('*').eq('user_id', userId).single(),
        supabase.from('difficulties').select('*').eq('user_id', userId).eq('resolved', false),
        supabase
          .from('deepwork_sessions')
          .select('started_at')
          .eq('user_id', userId)
          .order('started_at', { ascending: false })
          .limit(1),
      ]);

      const exams   = examsRes.data   ?? [];
      const profile = profileRes.data;
      const diffs   = diffsRes.data   ?? [];
      const lastDw  = lastDeepworkRes.data?.[0];

      // ── 1. Relance deepwork si inactif depuis 24h ─────────────────────────
      const hoursSinceDw = lastDw?.started_at
        ? (now.getTime() - new Date(lastDw.started_at).getTime()) / (1000 * 60 * 60)
        : 999;

      if (hoursSinceDw >= 24 && !isDismissedToday('deepwork-gap')) {
        notifs.push({
          id: 'deepwork-gap',
          icon: <Zap size={16} />,
          message: hoursSinceDw >= 48
            ? `Aucune session deepwork depuis 2+ jours — même 20 min font la différence ! 🎯`
            : `Pas de session deepwork depuis hier — garde le rythme ! Une session rapide ?`,
          actionLabel: '⚡ Lancer deepwork',
          actionHref: '/student/deepwork',
          priority: hoursSinceDw >= 48 ? 'high' : 'medium',
          color: 'hsl(43 90% 55%)',
        });
      }

      // ── 2. Rappel quotidien DS (1 semaine avant) ──────────────────────────
      exams.forEach(exam => {
        const daysUntil = Math.ceil(
          (new Date(exam.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysUntil >= 1 && daysUntil <= 7 && !isDismissedToday(`ds-daily-${exam.id}`)) {
          const subject = exam.custom_subject || exam.subject;
          const urgency = daysUntil <= 2 ? 'high' : daysUntil <= 4 ? 'medium' : 'low';
          notifs.push({
            id: `ds-daily-${exam.id}`,
            icon: <BookOpen size={16} />,
            message: daysUntil === 1
              ? `⚠️ DS ${subject} demain ! Dernière ligne droite — as-tu tout révisé ?`
              : `DS ${subject} dans ${daysUntil} jours — pense à réviser aujourd'hui.`,
            actionLabel: '📚 Planifier une session',
            actionHref: '/student/deepwork',
            priority: urgency,
            color: daysUntil <= 2 ? 'hsl(0 84% 60%)' : daysUntil <= 4 ? 'hsl(38 90% 55%)' : 'hsl(213 90% 65%)',
          });
        }
      });

      // ── 3. Streak en danger ───────────────────────────────────────────────
      if (profile?.last_activity_date && !isDismissedToday('streak-risk')) {
        const lastActive = new Date(profile.last_activity_date);
        const hoursSince = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
        if (hoursSince >= 18 && hoursSince < 48 && profile.streak > 0) {
          notifs.push({
            id: 'streak-risk',
            icon: <Flame size={16} />,
            message: `Ta série de ${profile.streak} jours 🔥 est en danger ! Une petite session pour la maintenir ?`,
            actionLabel: "💪 C'est parti !",
            actionHref: '/student/deepwork',
            priority: 'high',
            color: 'hsl(var(--streak))',
          });
        }
      }

      // ── 4. DS proche + matière non travaillée ─────────────────────────────
      // (basé sur deepwork_sessions récentes par subject si disponible)
      exams.forEach(exam => {
        const daysUntil = Math.ceil(
          (new Date(exam.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );
        const hasDiff = diffs.some(d => d.subject === exam.subject);
        if (daysUntil <= 5 && daysUntil >= 1 && hasDiff && !isDismissedToday(`exam-diff-${exam.id}`)) {
          if (!notifs.some(n => n.id === `ds-daily-${exam.id}`)) {
            notifs.push({
              id: `exam-diff-${exam.id}`,
              icon: <AlertTriangle size={16} />,
              message: `Tu as une difficulté en ${exam.custom_subject || exam.subject} et le DS est dans ${daysUntil}j. Même 15 min aideraient !`,
              priority: 'medium',
              color: 'hsl(var(--destructive))',
            });
          }
        }
      });

      // ── Sort high → medium → low ──────────────────────────────────────────
      const order = { high: 0, medium: 1, low: 2 };
      notifs.sort((a, b) => order[a.priority] - order[b.priority]);
      setNotifications(notifs);
    };

    buildNotifications();
    const interval = setInterval(buildNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleDismiss = (id: string) => {
    dismissForToday(id);
    setDismissed(prev => new Set([...prev, id]));
  };

  const visibleNotifs = notifications.filter(n => !dismissed.has(n.id) && !isDismissedToday(n.id));

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
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <p className="text-sm leading-snug">{notif.message}</p>
              {notif.actionLabel && notif.actionHref && (
                <button
                  onClick={() => { handleDismiss(notif.id); navigate(notif.actionHref!); }}
                  className="self-start text-xs font-semibold px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                  style={{
                    background: `${notif.color}22`,
                    border: `1px solid ${notif.color}55`,
                    color: notif.color,
                  }}
                >
                  {notif.actionLabel}
                </button>
              )}
            </div>
            <button
              onClick={() => handleDismiss(notif.id)}
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
