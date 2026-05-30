import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SUBJECTS } from '@/lib/game-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const METHODS = [
  'Exercices',
  'Cours / Relecture',
  'Fiches',
  'Vidéos',
  'Annales',
  'Autre',
] as const;

interface DailyTaskGateProps {
  userId: string;
  onComplete: () => void;
}

export function DailyTaskGate({ userId, onComplete }: DailyTaskGateProps) {
  const [tasks, setTasks] = useState([
    { description: '', subject: 'Maths', method: 'Exercices' },
    { description: '', subject: 'Maths', method: 'Exercices' },
    { description: '', subject: 'Maths', method: 'Exercices' },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToday = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data } = await supabase
        .from('daily_tasks')
        .select('id')
        .eq('user_id', userId)
        .eq('task_date', today)
        .limit(1);
      if (data && data.length > 0) {
        setAlreadyDone(true);
        onComplete();
      } else {
        setAlreadyDone(false);
      }
    };
    checkToday();
  }, [userId, onComplete]);

  if (alreadyDone === null) return null;
  if (alreadyDone) return null;

  const allFilled = tasks.every(t => t.description.trim().length > 0);

  const handleSubmit = async () => {
    if (!allFilled) return;
    setSubmitting(true);
    const today = new Date().toISOString().split('T')[0];
    const inserts = tasks.map((t, i) => ({
      user_id: userId,
      task_date: today,
      task_number: i + 1,
      description: t.description.trim().slice(0, 100),
      subject: t.subject,
      method: t.method,
    }));
    await supabase.from('daily_tasks').insert(inserts as any);
    setSubmitting(false);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="mb-4 flex items-center justify-center">
            <Target size={56} style={{ color: 'hsl(43 90% 52%)', filter: 'drop-shadow(0 0 14px hsl(43 90% 50% / 0.5))' }} />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Tes 3 tâches du jour</h1>
          <p className="text-muted-foreground">Définis tes 3 tâches avant de commencer</p>
        </motion.div>

        <div className="space-y-4">
          {tasks.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <span className="flex items-center justify-center w-8 h-10 rounded-lg text-sm font-bold shrink-0" style={{ backgroundColor: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}>
                  {i + 1}
                </span>
                <Input
                  placeholder={`Tâche ${i + 1}`}
                  value={task.description}
                  onChange={(e) => {
                    const v = e.target.value.slice(0, 100);
                    setTasks(prev => prev.map((t, j) => j === i ? { ...t, description: v } : t));
                  }}
                  maxLength={100}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 ml-10">
                <Select
                  value={task.subject}
                  onValueChange={(v) => setTasks(prev => prev.map((t, j) => j === i ? { ...t, subject: v } : t))}
                >
                  <SelectTrigger className="w-[120px] shrink-0 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={task.method}
                  onValueChange={(v) => setTasks(prev => prev.map((t, j) => j === i ? { ...t, method: v } : t))}
                >
                  <SelectTrigger className="w-[140px] shrink-0 h-8 text-xs">
                    <SelectValue placeholder="Méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    {METHODS.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: allFilled ? 1 : 0.4 }}
          className="mt-8"
        >
          <Button
            onClick={handleSubmit}
            disabled={!allFilled || submitting}
            className="w-full h-12 text-base font-semibold gap-2"
            size="lg"
          >
            <Rocket size={18} />
            {submitting ? 'Enregistrement...' : 'Commencer ma journée'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
