import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Calendar, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DSEvent {
  id: string;
  subject: string;
  exam_date: string;
  chapters: string | null;
  custom_subject: string | null;
}

export function DSReminderModal({ userId, onAddDs }: { userId: string; onAddDs?: () => void }) {
  const [open, setOpen] = useState(false);
  const [upcomingDS, setUpcomingDS] = useState<DSEvent[]>([]);

  useEffect(() => {
    // Ne montre qu'une seule fois par session navigateur
    const SESSION_KEY = `ds_reminder_shown_${userId}`;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const load = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const in30  = new Date();
      in30.setDate(in30.getDate() + 30);
      const { data } = await supabase
        .from('exams')
        .select('id, subject, exam_date, chapters, custom_subject')
        .eq('user_id', userId)
        .is('grade', null)
        .gte('exam_date', today)
        .lte('exam_date', in30.toISOString().slice(0, 10))
        .order('exam_date', { ascending: true });
      if (data && data.length > 0) {
        setUpcomingDS(data as DSEvent[]);
        setOpen(true);
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    };
    load();
  }, [userId]);

  const getDaysUntil = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui !";
    if (diff === 1) return 'Demain';
    return `Dans ${diff} jours`;
  };

  const getUrgencyColor = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff <= 3) return 'text-red-400 border-red-500/40 bg-red-500/10';
    if (diff <= 7) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-blue-400 border-blue-500/40 bg-blue-500/10';
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
            style={{ boxShadow: '0 0 60px rgba(239,68,68,0.15), 0 25px 50px rgba(0,0,0,0.6)' }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent rounded-full" />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base">DS à venir</h2>
                <p className="text-xs text-muted-foreground">
                  {upcomingDS.length} DS dans les 30 prochains jours
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-5 max-h-60 overflow-y-auto">
              {upcomingDS.map(ds => (
                <div
                  key={ds.id}
                  className={`flex items-center justify-between p-3 rounded-xl border ${getUrgencyColor(ds.exam_date)}`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="text-sm font-semibold">{ds.custom_subject || ds.subject}</span>
                    {ds.chapters && (
                      <span className="text-xs opacity-70 truncate max-w-[120px]">· {ds.chapters}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold tabular-nums shrink-0">
                    {getDaysUntil(ds.exam_date)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                C'est noté — on y va ! 💪
              </button>
              <button
                onClick={() => { setOpen(false); onAddDs?.(); }}
                className="w-full py-2.5 rounded-xl border font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-secondary"
                style={{ borderColor: 'hsl(0 84% 50% / 0.4)', color: 'hsl(0 84% 65%)' }}
              >
                <Plus size={14} />
                Ajouter un nouveau DS
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
