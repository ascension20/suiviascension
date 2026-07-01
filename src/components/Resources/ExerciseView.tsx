import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Zap, BookOpen } from 'lucide-react';
import { ModuleLevel, DIFF_LABEL } from '@/lib/modules-data';
import { ExerciseContent } from '@/lib/newton-content';
import { MixedText, BlockMath } from './Math';

interface ExerciseViewProps {
  level: ModuleLevel;
  content: ExerciseContent | null;
  onComplete: () => void;
  onBack: () => void;
}

const DIFF_COLOR: Record<number, string> = {
  0: '205 85% 62%',
  1: '142 65% 48%',
  2: '43 90% 52%',
  3: '270 60% 62%',
  4: '0 70% 60%',
};

export function ExerciseView({ level, content, onComplete, onBack }: ExerciseViewProps) {
  const [done, setDone] = useState(false);
  const color = DIFF_COLOR[level.difficulty] ?? '205 85% 62%';

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-5">
        <button onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white mt-0.5">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ background: `hsl(${color} / 0.15)`, color: `hsl(${color})`, border: `1px solid hsl(${color} / 0.35)` }}>
              {DIFF_LABEL[level.difficulty]}
            </span>
            <span className="text-[11px] text-white/40 bg-white/8 px-2 py-0.5 rounded-md">
              {level.notion}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">{level.title}</h3>
        </div>
      </div>

      {/* ── Méta ── */}
      <div className="flex gap-5 mb-5 text-sm text-white/40">
        <span className="flex items-center gap-1.5">
          <Clock size={13} />{level.timeMin} min
        </span>
        <span className="flex items-center gap-1.5 text-amber-400/80">
          <Zap size={13} />+{level.xpReward} XP
        </span>
      </div>

      {content ? (
        <div className="flex-1 space-y-4">

          {/* ── Énoncé ── */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: `hsl(${color} / 0.05)`, border: `1px solid hsl(${color} / 0.25)` }}>
            <div className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: `hsl(${color} / 0.12)` }}>
              <BookOpen size={14} style={{ color: `hsl(${color})` }} />
              <span className="text-xs font-bold tracking-wide" style={{ color: `hsl(${color})` }}>ÉNONCÉ</span>
            </div>
            <div className="px-4 py-4">
              <p className="text-sm text-white/85 leading-relaxed whitespace-pre-line">
                <MixedText text={content.context} />
              </p>
              {content.data && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[11px] font-bold text-white/35 uppercase tracking-wider mb-2">Données</p>
                  <div className="overflow-x-auto">
                    <BlockMath tex={content.data} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Questions ── */}
          {content.parts.map((part, pi) => (
            <div key={pi} className="space-y-2">
              {part.label && (
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-1">
                    {part.label}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              )}
              {part.questions.map((q) => (
                <div key={q.n}
                  className="flex gap-3 bg-white/5 rounded-xl border border-white/10 p-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                    style={{
                      background: `hsl(${color} / 0.15)`,
                      border: `1px solid hsl(${color} / 0.4)`,
                      color: `hsl(${color})`,
                    }}>
                    {q.n}
                  </span>
                  <p className="text-sm text-white/85 leading-relaxed flex-1">
                    <MixedText text={q.text} />
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/30 text-sm">Contenu non disponible.</p>
        </div>
      )}

      {/* ── Bouton Terminé ── */}
      <div className="mt-6 pb-4">
        {done ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl">
            <CheckCircle2 size={22} className="text-emerald-400" />
            <span className="text-emerald-300 font-bold">Bravo ! +{level.xpReward} XP gagnés</span>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => { setDone(true); setTimeout(onComplete, 900); }}
            className="w-full py-4 rounded-xl font-bold text-base text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            style={{ background: `hsl(${color})` }}
            whileHover={{ filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.97 }}>
            <CheckCircle2 size={20} />
            Exercice terminé — +{level.xpReward} XP
          </motion.button>
        )}
        <p className="text-center text-[11px] text-white/25 mt-2">
          Résous l'exercice sur ton cahier, puis valide pour débloquer la suite.
        </p>
      </div>
    </div>
  );
}
