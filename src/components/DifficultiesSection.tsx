import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Plus, X, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECTS, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Severity = 'blocking' | 'fragile' | 'ok';

interface Difficulty {
  id: string;
  subject: Subject;
  severity: Severity;
  description: string;
  resolved: boolean;
  coach_reply: string | null;
  created_at: string;
}

const SEVERITY_LABELS: Record<Severity, { label: string; color: string }> = {
  blocking: { label: '🔴 Bloquant', color: 'hsl(0 84% 60%)' },
  fragile: { label: '🟡 Fragile', color: 'hsl(38 92% 55%)' },
  ok: { label: '🟢 Gérable', color: 'hsl(142 71% 45%)' },
};

export function DifficultiesSection({ userId }: { userId: string }) {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState<Subject>('Maths');
  const [severity, setSeverity] = useState<Severity>('fragile');
  const [description, setDescription] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const loadDifficulties = async () => {
    const { data } = await supabase
      .from('difficulties')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) setDifficulties(data as unknown as Difficulty[]);
  };

  useEffect(() => {
    loadDifficulties();
    const channel = supabase
      .channel('student-difficulties')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'difficulties', filter: `user_id=eq.${userId}` }, () => loadDifficulties())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    await supabase.from('difficulties').insert({
      user_id: userId,
      subject,
      severity,
      description: description.trim(),
      custom_subject: subject === 'Autre' && customSubject.trim() ? customSubject.trim() : null,
    });
    setDescription('');
    setCustomSubject('');
    setShowForm(false);
    setLoading(false);
    loadDifficulties();
  };

  const unresolvedCount = difficulties.filter(d => !d.resolved).length;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <AlertTriangle size={16} className="text-streak" />
          Mes difficultés
          {unresolvedCount > 0 && (
            <span className="text-xs bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{unresolvedCount}</span>
          )}
        </h2>
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
              <div className="grid grid-cols-2 gap-2">
                <Select value={subject} onValueChange={(v) => { setSubject(v as Subject); if (v !== 'Autre') setCustomSubject(''); }}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={severity} onValueChange={(v) => setSeverity(v as Severity)}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(SEVERITY_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {subject === 'Autre' && (
                <Input
                  placeholder="Précise la matière..."
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  className="h-9 text-sm"
                />
              )}
              <Textarea
                placeholder="Décris ta difficulté..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="min-h-[60px] text-sm resize-none"
              />
              <Button size="sm" onClick={handleSubmit} disabled={loading || !description.trim()} className="w-full">
                Signaler
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {difficulties.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-3">Aucune difficulté signalée 💪</p>
        ) : (
          difficulties.map(d => (
            <div
              key={d.id}
              className={`p-3 rounded-lg border transition-colors ${d.resolved ? 'border-border/50 opacity-60' : 'border-border'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[d.subject as Subject]}))` }}
                />
                <span className="text-xs text-muted-foreground">{d.subject}</span>
                <span className="text-xs" style={{ color: SEVERITY_LABELS[d.severity]?.color }}>
                  {SEVERITY_LABELS[d.severity]?.label}
                </span>
                {d.resolved && <span className="text-xs text-success ml-auto">✓ Résolu</span>}
              </div>
              <p className="text-sm">{d.description}</p>
              {d.coach_reply && (
                <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-1 mb-1">
                    <MessageCircle size={12} className="text-primary" />
                    <span className="text-xs text-primary font-medium">Coach</span>
                  </div>
                  <p className="text-xs text-foreground">{d.coach_reply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
