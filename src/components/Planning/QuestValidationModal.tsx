import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { computeQuestXp, DAILY_XP_CAP, type PlanningEvent, type EventDifficulty } from '@/lib/planning-utils';
import { playXpSound } from '@/hooks/useXpAudio';

interface Props {
  event: PlanningEvent;
  userId: string;
  onClose: () => void;
  onValidated: () => void;
  onXpGain: (amount: number) => void;
}

export function QuestValidationModal({ event, userId, onClose, onValidated, onXpGain }: Props) {
  const [duration, setDuration] = useState(45);
  const [difficulty, setDifficulty] = useState<EventDifficulty>('medium');
  const [note, setNote] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [xpPop, setXpPop] = useState<number | null>(null);

  const xpPreview = computeQuestXp(difficulty, duration, hasPhoto);

  const submit = async () => {
    setSubmitting(true);
    // Daily cap check
    const today = new Date().toISOString().slice(0, 10);
    const { data: prof } = await supabase
      .from('profiles')
      .select('today_xp, today_xp_date')
      .eq('user_id', userId).single();
    const todayXp = prof?.today_xp_date === today ? (prof?.today_xp ?? 0) : 0;
    const remaining = Math.max(0, DAILY_XP_CAP - todayXp);
    const grantedXp = Math.min(xpPreview, remaining);

    await supabase.from('planning_events').update({
      validated: true,
      description: [event.description, note ? `Note: ${note}` : ''].filter(Boolean).join('\n\n') || null,
    }).eq('id', event.id);

    await supabase.from('profiles').update({
      today_xp: todayXp + grantedXp,
      today_xp_date: today,
    }).eq('user_id', userId);

    if (grantedXp > 0) {
      onXpGain(grantedXp);
      playXpSound();
    }
    setXpPop(grantedXp);
    setTimeout(() => { setXpPop(null); onValidated(); }, 1600);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Valider la quête</DialogTitle></DialogHeader>
        <p className="text-sm text-muted-foreground -mt-2 mb-2">{event.title}</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Durée : {duration} min</label>
            <input type="range" min={5} max={180} step={5} value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Difficulté</label>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as EventDifficulty[]).map(d => (
                <button key={d} onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2 rounded-md border text-xs font-medium ${difficulty === d ? 'border-violet-500 bg-violet-500/15 text-violet-300' : 'border-border bg-secondary text-muted-foreground'}`}>
                  {d === 'easy' ? '😌 Facile' : d === 'medium' ? '🙂 Moyen' : '🔥 Difficile'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Note (optionnel)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" placeholder="Ce que tu as retenu..." />
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} />
            Photo de mon travail jointe (+20 % XP)
          </label>
          <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/30">
            <p className="text-xs text-muted-foreground">Récompense estimée</p>
            <p className="font-display text-2xl font-bold text-amber-400">+{xpPreview} XP</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Plafond journalier : {DAILY_XP_CAP} XP</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 px-3 py-2 rounded-md border border-border text-sm hover:bg-secondary">Annuler</button>
            <button onClick={submit} disabled={submitting} className="flex-1 px-3 py-2 rounded-md bg-violet-500 text-white text-sm font-medium disabled:opacity-50">
              {submitting ? 'Validation…' : 'Valider'}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {xpPop !== null && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 1, y: -80, scale: 1.3 }}
              exit={{ opacity: 0, y: -140 }}
              transition={{ duration: 1.4 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none"
            >
              <span className="font-display text-4xl font-bold text-amber-400 drop-shadow-[0_0_16px_rgba(245,166,35,0.9)]">+{xpPop} XP</span>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
