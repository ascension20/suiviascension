import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { QcmQuestion } from '@/lib/newton-content';
import { MixedText } from './Math';

interface QcmViewProps {
  questions: QcmQuestion[];
  xpReward: number;
  onComplete: () => void;
  onBack: () => void;
}

export function QcmView({ questions, xpReward, onComplete, onBack }: QcmViewProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const pct = Math.round(((current) / questions.length) * 100);

  const handleSelect = (label: string) => {
    if (revealed) return;
    setSelected(label);
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
    if (selected === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (finished) {
    const pctScore = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4 max-w-sm w-full"
        >
          <div className="text-6xl mb-2">
            {pctScore >= 80 ? '🏆' : pctScore >= 50 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-white">
            {score} / {questions.length}
          </h3>
          <p className="text-white/60">
            {pctScore >= 80
              ? 'Excellent ! Le cours est bien maîtrisé.'
              : pctScore >= 50
              ? 'Bon travail ! Quelques points à revoir.'
              : 'Relis le cours avant de passer aux exercices.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-lg">
            <Zap size={20} />+{xpReward} XP
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/10 transition-colors font-medium"
            >
              Retour
            </button>
            <motion.button
              onClick={onComplete}
              className="flex-1 py-3 rounded-xl bg-[hsl(205_85%_60%)] hover:bg-[hsl(205_85%_55%)] text-white font-bold transition-colors flex items-center justify-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              <CheckCircle2 size={18} />
              Valider
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">QCM Flash</h3>
          <p className="text-sm text-white/50">Vérifie que le cours est en place</p>
        </div>
        <span className="text-sm font-bold text-white/60">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Barre de progression */}
      <div className="h-1.5 rounded-full bg-white/10 mb-6 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[hsl(205_85%_60%)]"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-5">
            <p className="text-white font-semibold text-base leading-relaxed">
              {q.n}. <MixedText text={q.text} />
            </p>
          </div>

          <div className="space-y-3">
            {q.options.map(opt => {
              const isCorrect = opt.label === q.answer;
              const isSelected = opt.label === selected;

              let style = 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30';
              if (revealed && isCorrect) style = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300';
              else if (revealed && isSelected && !isCorrect) style = 'border-red-500/60 bg-red-500/15 text-red-300';
              else if (isSelected && !revealed) style = 'border-[hsl(205_85%_60%/0.8)] bg-[hsl(205_85%_60%/0.15)] text-white';

              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  disabled={revealed}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${style}`}
                >
                  <span className="shrink-0 w-7 h-7 rounded-full border border-current/40 bg-white/10 text-sm font-bold flex items-center justify-center uppercase">
                    {opt.label}
                  </span>
                  <span className="text-sm"><MixedText text={opt.text} /></span>
                  {revealed && isCorrect && <CheckCircle2 size={18} className="ml-auto text-emerald-400" />}
                  {revealed && isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-red-400" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-6 pb-4">
        {!revealed ? (
          <motion.button
            onClick={handleReveal}
            disabled={!selected}
            className="w-full py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2"
            style={selected
              ? { background: 'hsl(205 85% 60%)', color: '#fff' }
              : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', cursor: 'not-allowed' }}
            whileTap={selected ? { scale: 0.97 } : {}}
          >
            Valider ma réponse
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-3.5 rounded-xl font-bold text-base bg-[hsl(205_85%_60%)] hover:bg-[hsl(205_85%_55%)] text-white transition-colors flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
          >
            {current + 1 < questions.length ? (
              <><ArrowRight size={20} />Question suivante</>
            ) : (
              <><CheckCircle2 size={20} />Voir les résultats</>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
