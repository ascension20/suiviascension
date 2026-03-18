import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';

export interface Quest {
  id: string;
  title: string;
  subject: Subject;
  deadline: string;
  difficulty: 1 | 2 | 3;
  xp: number;
  isCoachQuest: boolean;
  completed: boolean;
}

interface Props {
  quests: Quest[];
  onComplete: (id: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: 'spring', bounce: 0 } },
};

export function QuestList({ quests, onComplete }: Props) {
  if (quests.length === 0) {
    return <p className="text-muted-foreground text-sm py-4 text-center">Aucune quête active 🎉</p>;
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
      {quests.map(quest => {
        const daysLeft = Math.ceil(
          (new Date(quest.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );
        const isOverdue = daysLeft < 0;

        return (
          <motion.div
            key={quest.id}
            variants={item}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary transition-colors group"
          >
            <div
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[quest.subject]}))` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">{quest.title}</span>
                {quest.isCoachQuest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">Coach</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{quest.subject}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs" style={{ color: isOverdue ? 'hsl(var(--destructive))' : undefined }}>
                  {isOverdue ? `En retard (${Math.abs(daysLeft)}j)` : `${daysLeft}j`}
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{'★'.repeat(quest.difficulty)}{'☆'.repeat(3 - quest.difficulty)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-display tabular-nums" style={{ color: 'hsl(var(--xp))' }}>
                +{quest.xp}
              </span>
              <button
                onClick={() => onComplete(quest.id)}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center opacity-50 group-hover:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
              >
                <Check size={14} />
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
