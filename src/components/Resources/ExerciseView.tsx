import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Zap } from 'lucide-react';
import { ModuleLevel, DIFF_LABEL } from '@/lib/modules-data';
import { ExerciseContent } from '@/lib/newton-content';

interface ExerciseViewProps {
  level: ModuleLevel;
  content: ExerciseContent | null;
  onComplete: () => void;
  onBack: () => void;
}

export function ExerciseView({ level, content, onComplete, onBack }: ExerciseViewProps) {
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
              {DIFF_LABEL[level.difficulty]}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">
              {level.notion}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">{level.title}</h3>
        </div>
      </div>

      {/* Méta */}
      <div className="flex gap-4 mb-5 text-sm text-white/50">
        <span className="flex items-center gap-1.5">
          <Clock size={14} />{level.timeMin} min
        </span>
        <span className="flex items-center gap-1.5">
          <Zap size={14} className="text-amber-400" />+{level.xpReward} XP
        </span>
      </div>

      {/* Contenu */}
      {content ? (
        <div className="space-y-4 flex-1">
          {/* Contexte */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-4">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Énoncé</p>
            <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
              {content.context}
            </p>
            {content.data && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Données</p>
                <p className="text-white/70 text-sm font-mono">{content.data}</p>
              </div>
            )}
          </div>

          {/* Questions par partie */}
          {content.parts.map((part, pi) => (
            <div key={pi} className="space-y-2">
              {part.label && (
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-1">
                  {part.label}
                </p>
              )}
              {part.questions.map((q) => (
                <div key={q.n}
                  className="bg-white/5 rounded-xl border border-white/10 p-4 flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[hsl(205_85%_60%/0.15)] border border-[hsl(205_85%_60%/0.35)] text-[hsl(205_85%_70%)] text-xs font-bold flex items-center justify-center">
                    {q.n}
                  </span>
                  <p className="text-sm text-white/85 leading-relaxed">{q.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm">Contenu non disponible.</p>
        </div>
      )}

      {/* Bouton Terminé */}
      <div className="mt-6 pb-4">
        {done ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl"
          >
            <CheckCircle2 size={22} className="text-emerald-400" />
            <span className="text-emerald-300 font-semibold">Bravo ! +{level.xpReward} XP gagnés</span>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => { setDone(true); setTimeout(onComplete, 800); }}
            className="w-full py-4 rounded-xl font-bold text-base bg-[hsl(205_85%_60%)] hover:bg-[hsl(205_85%_55%)] text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            whileTap={{ scale: 0.97 }}
          >
            <CheckCircle2 size={20} />
            Exercice terminé — +{level.xpReward} XP
          </motion.button>
        )}
        <p className="text-center text-xs text-white/30 mt-2">
          Tu as résolu l'exercice sur ton cahier ? Valide pour débloquer le suivant.
        </p>
      </div>
    </div>
  );
}
