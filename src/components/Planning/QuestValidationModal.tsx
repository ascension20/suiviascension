import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { computeQuestXp, type PlanningEvent, type EventDifficulty } from '@/lib/planning-utils';
import { playXpSound } from '@/hooks/useXpAudio';

interface Props {
  event: PlanningEvent;
  userId: string;
  onClose: () => void;
  onValidated: () => void;
  onXpGain: (amount: number) => void;
}

const DIFFICULTIES: {
  value: EventDifficulty;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    value: 'easy',
    label: 'Commun',
    sublabel: '×0.6',
    color: 'hsl(220 10% 65%)',
    bg: 'hsl(220 10% 18%)',
    border: 'hsl(220 10% 30%)',
  },
  {
    value: 'medium',
    label: 'Épique',
    sublabel: '×1.0',
    color: 'hsl(270 60% 75%)',
    bg: 'hsl(270 50% 14%)',
    border: 'hsl(270 50% 35%)',
  },
  {
    value: 'hard',
    label: 'Légendaire',
    sublabel: '×1.6',
    color: 'hsl(43 90% 55%)',
    bg: 'hsl(43 60% 10%)',
    border: 'hsl(43 70% 35%)',
  },
];

export function QuestValidationModal({ event, userId, onClose, onValidated, onXpGain }: Props) {
  const [duration, setDuration] = useState(45);
  const [difficulty, setDifficulty] = useState<EventDifficulty>('medium');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [xpPop, setXpPop] = useState<number | null>(null);

  const xpPreview = computeQuestXp(difficulty, duration);
  const diff = DIFFICULTIES.find(d => d.value === difficulty)!;

  const submit = async () => {
    setSubmitting(true);

    await supabase.from('planning_events').update({
      validated: true,
      description: note.trim() || null,
    }).eq('id', event.id);

    if (xpPreview > 0) {
      onXpGain(xpPreview);
      playXpSound();
    }

    setXpPop(xpPreview);
    setTimeout(() => { setXpPop(null); onValidated(); }, 1600);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
            >
              {diff.label}
            </span>
            Valider la quête
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground -mt-2 mb-1 truncate">{event.title}</p>

        <div className="space-y-4">

          {/* Durée */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-muted-foreground">Durée de travail</label>
              <span className="text-xs font-bold tabular-nums" style={{ color: 'hsl(var(--primary))' }}>
                {duration} min
              </span>
            </div>
            <input
              type="range" min={5} max={180} step={5}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
              <span>5 min</span><span>3 h</span>
            </div>
          </div>

          {/* Difficulté */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Difficulté</label>
            <div className="grid grid-cols-3 gap-1.5">
              {DIFFICULTIES.map(d => {
                const selected = difficulty === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => setDifficulty(d.value)}
                    className="flex flex-col items-center py-2.5 rounded-lg border text-center transition-all"
                    style={{
                      background: selected ? d.bg : 'hsl(222 22% 10%)',
                      borderColor: selected ? d.border : 'hsl(222 16% 20%)',
                      boxShadow: selected ? `0 0 12px ${d.border}55` : 'none',
                    }}
                  >
                    <span
                      className="text-xs font-bold leading-tight"
                      style={{ color: selected ? d.color : 'hsl(220 10% 50%)' }}
                    >
                      {d.label}
                    </span>
                    <span
                      className="text-[9px] mt-0.5"
                      style={{ color: selected ? d.color : 'hsl(220 10% 35%)' }}
                    >
                      {d.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Note (optionnel)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm"
              placeholder="Ce que tu as retenu…"
            />
          </div>

          {/* XP preview */}
          <div
            className="p-3 rounded-lg border flex items-center justify-between"
            style={{
              background: 'hsl(43 60% 8%)',
              borderColor: 'hsl(43 70% 30%)',
            }}
          >
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Récompense</p>
              <p
                className="font-display text-3xl font-black tabular-nums leading-none mt-0.5"
                style={{ color: 'hsl(43 90% 55%)', textShadow: '0 0 20px hsl(43 90% 50% / 0.5)' }}
              >
                +{xpPreview} XP
              </p>
            </div>
            <div
              className="text-right text-[9px] leading-relaxed"
              style={{ color: diff.color }}
            >
              <p>{duration} min</p>
              <p>{diff.label}</p>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-3 py-2 rounded-md border border-border text-sm hover:bg-secondary transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={submit}
              disabled={submitting}
              className="flex-1 px-3 py-2 rounded-md text-sm font-semibold disabled:opacity-50 transition-colors"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(222 22% 8%)' }}
            >
              {submitting ? 'Validation…' : 'Valider ✓'}
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
              <span
                className="font-display text-4xl font-black"
                style={{ color: 'hsl(43 90% 55%)', textShadow: '0 0 24px hsl(43 90% 50% / 0.9)' }}
              >
                +{xpPop} XP
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
