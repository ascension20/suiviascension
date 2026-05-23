import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp } from '@/lib/planning-utils';
import { playXpSound } from '@/hooks/useXpAudio';

interface Props {
  userId: string;
  onXpGain: (amount: number) => void;
}

const STORAGE_KEY = 'deepwork_started_at';

export function DeepworkWidget({ userId, onXpGain }: Props) {
  const [startedAt, setStartedAt] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? Number(v) : null;
  });
  const [now, setNow] = useState(Date.now());
  const [xpPop, setXpPop] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedAt) {
      intervalRef.current = window.setInterval(() => setNow(Date.now()), 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startedAt]);

  const elapsedSec = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = elapsedSec % 60;
  const currentXp = computeDeepworkXp(elapsedSec);

  const handleStart = () => {
    const t = Date.now();
    localStorage.setItem(STORAGE_KEY, String(t));
    setStartedAt(t);
  };

  const handleStop = async () => {
    if (!startedAt) return;
    const ended = Date.now();
    const duration = Math.floor((ended - startedAt) / 1000);
    const xp = computeDeepworkXp(duration);
    localStorage.removeItem(STORAGE_KEY);
    setStartedAt(null);

    if (duration >= 60) {
      await supabase.from('deepwork_sessions').insert({
        user_id: userId,
        started_at: new Date(startedAt).toISOString(),
        ended_at: new Date(ended).toISOString(),
        duration_seconds: duration,
        xp_earned: xp,
      });
      // Update profile cumulative deepwork
      const { data: prof } = await supabase.from('profiles').select('total_deepwork_seconds, total_deepwork_sessions').eq('user_id', userId).single();
      if (prof) {
        await supabase.from('profiles').update({
          total_deepwork_seconds: (prof.total_deepwork_seconds ?? 0) + duration,
          total_deepwork_sessions: (prof.total_deepwork_sessions ?? 0) + 1,
        }).eq('user_id', userId);
      }
      if (xp > 0) {
        onXpGain(xp);
        playXpSound();
        setXpPop(xp);
        setTimeout(() => setXpPop(null), 1800);
      }
    }
  };

  const active = !!startedAt;

  return (
    <div className={`relative rounded-xl border p-5 overflow-hidden transition-colors ${active ? 'border-violet-500/40 bg-violet-500/5' : 'border-amber-500/40 bg-amber-500/5'}`}>
      {active && (
        <div className="mb-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
          <Sparkles size={12} className="text-amber-400" />
          <span className="text-xs font-medium text-amber-300">En deep work en ce moment</span>
        </div>
      )}
      <div className="flex items-center gap-5">
        <button
          onClick={active ? handleStop : handleStart}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${active ? 'bg-violet-500 hover:bg-violet-600 shadow-violet-500/40' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/40'}`}
        >
          {active ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
          <span className="absolute -bottom-6 text-[10px] font-display font-bold tracking-widest text-foreground">
            {active ? 'PAUSE' : 'FOCUS'}
          </span>
        </button>
        <div className="flex-1 pt-1">
          <p className={`text-sm mb-1 ${active ? 'text-violet-300' : 'text-amber-300'} font-medium`}>
            {active ? `${minutes} min de focus` : 'Lancer une session deepwork'}
          </p>
          <div className="font-display text-4xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {active ? `+${currentXp} XP en cours` : 'Plus la session est longue, plus le débit monte (1→2→3 XP/min)'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {xpPop !== null && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -60, scale: 1.2 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none"
          >
            <span className="font-display text-3xl font-bold text-amber-400 drop-shadow-[0_0_12px_rgba(245,166,35,0.8)]">
              +{xpPop} XP
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
