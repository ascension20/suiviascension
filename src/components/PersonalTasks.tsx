import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check, ListTodo } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECTS, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudentTask {
  id: string;
  description: string;
  subject: Subject;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  completed: boolean;
  deadline: string | null;
  custom_subject: string | null;
}

const DIFF_LABELS: Record<string, string> = { easy: '★☆☆', medium: '★★☆', hard: '★★★' };
const DIFF_XP: Record<string, number> = { easy: 35, medium: 70, hard: 105 };

interface Props {
  userId: string;
  onXpGain: (amount: number) => void;
}

export function PersonalTasks({ userId, onXpGain }: Props) {
  const [tasks, setTasks] = useState<StudentTask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<Subject>('Maths');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [customSubject, setCustomSubject] = useState('');
  const [deadline, setDeadline] = useState('');

  const loadTasks = useCallback(async () => {
    const { data } = await supabase
      .from('student_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('completed', { ascending: true })
      .order('created_at', { ascending: false });
    if (data) setTasks(data as unknown as StudentTask[]);
  }, [userId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAdd = async () => {
    if (!description.trim()) return;
    await supabase.from('student_tasks').insert({
      user_id: userId,
      description: description.trim(),
      subject,
      difficulty,
      xp_reward: DIFF_XP[difficulty],
      deadline: deadline || null,
      custom_subject: subject === 'Autre' && customSubject.trim() ? customSubject.trim() : null,
    });
    setDescription('');
    setDeadline('');
    setCustomSubject('');
    setShowForm(false);
    loadTasks();
  };

  const handleComplete = async (task: StudentTask) => {
    if (task.completed) return;
    await supabase.from('student_tasks').update({
      completed: true,
      completed_at: new Date().toISOString(),
    }).eq('id', task.id);
    onXpGain(task.xp_reward);
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('student_tasks').delete().eq('id', id);
    loadTasks();
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <div className="flex items-center justify-end mb-3">
        <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={14} /> : <Plus size={14} />}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="space-y-3 p-3 rounded-lg border border-border bg-secondary/30">
              <Input
                placeholder="Description de la tâche..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="h-9 text-sm"
              />
              <div className="grid grid-cols-3 gap-2">
                <Select value={subject} onValueChange={v => { setSubject(v as Subject); if (v !== 'Autre') setCustomSubject(''); }}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={difficulty} onValueChange={v => setDifficulty(v as 'easy' | 'medium' | 'hard')}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Facile (35 XP)</SelectItem>
                    <SelectItem value="medium">Moyen (70 XP)</SelectItem>
                    <SelectItem value="hard">Difficile (105 XP)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              {subject === 'Autre' && (
                <Input placeholder="Précise la matière..." value={customSubject} onChange={e => setCustomSubject(e.target.value)} className="h-9 text-sm" />
              )}
              <Button size="sm" onClick={handleAdd} disabled={!description.trim()} className="w-full">
                Ajouter
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {activeTasks.length === 0 && completedTasks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-3">Aucune tâche perso ✏️</p>
        ) : (
          <>
            {activeTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary transition-colors group">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[task.subject]}))` }}
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{task.description}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{task.custom_subject || task.subject}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{DIFF_LABELS[task.difficulty]}</span>
                    {task.deadline && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(task.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-display tabular-nums" style={{ color: 'hsl(var(--xp))' }}>
                    +{task.xp_reward}
                  </span>
                  <button
                    onClick={() => handleComplete(task)}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center opacity-50 group-hover:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-50 hover:!opacity-100 hover:bg-destructive hover:border-destructive hover:text-destructive-foreground transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
            {completedTasks.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  {completedTasks.length} tâche{completedTasks.length > 1 ? 's' : ''} terminée{completedTasks.length > 1 ? 's' : ''}
                </summary>
                <div className="space-y-1 mt-2">
                  {completedTasks.slice(0, 5).map(task => (
                    <div key={task.id} className="flex items-center gap-2 p-2 rounded opacity-50">
                      <Check size={12} className="text-success" />
                      <span className="text-xs line-through">{task.description}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </>
        )}
      </div>
    </div>
  );
}
