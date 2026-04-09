import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface EndOfDayReviewProps {
  userId: string;
}

interface DailyTask {
  id: string;
  description: string;
  subject: string;
  completed: boolean;
  task_number: number;
}

export function EndOfDayReview({ userId }: EndOfDayReviewProps) {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      // Show at 21h or later
      if (hour >= 21) {
        loadTasks();
      }
    };

    const loadTasks = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('user_id', userId)
        .eq('task_date', today)
        .order('task_number');
      if (data && data.length > 0) {
        // Only show if not all already reviewed (at least one not completed)
        const hasUnreviewed = data.some(t => !t.completed);
        if (hasUnreviewed) {
          setTasks(data as DailyTask[]);
          setVisible(true);
        }
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60_000);
    return () => clearInterval(interval);
  }, [userId]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const task of tasks) {
      await supabase.from('daily_tasks').update({ completed: task.completed }).eq('id', task.id);
    }
    setSaving(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 w-80 bg-card border border-border rounded-xl shadow-xl p-5"
      >
        <h3 className="font-display font-semibold text-sm mb-1">T'as fait tes 3 tâches ? 🤔</h3>
        <p className="text-xs text-muted-foreground mb-4">Coche ce que tu as accompli aujourd'hui</p>

        <div className="space-y-3">
          {tasks.map(task => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-start gap-3 w-full text-left p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'hsl(var(--success))' }} />
              ) : (
                <Circle size={18} className="shrink-0 mt-0.5 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.description}</p>
                <span className="text-[10px] text-muted-foreground">{task.subject}</span>
              </div>
            </button>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full mt-4" size="sm">
          {saving ? 'Enregistrement...' : 'Valider mon bilan'}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
