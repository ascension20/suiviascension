import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowLeft, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp } from '@/lib/planning-utils';
import { playXpSound } from '@/hooks/useXpAudio';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { updateStreak } from '@/hooks/useOnlineTracker';
import { DeepworkStats } from '@/components/Deepwork/DeepworkStats';

const STORAGE_KEY = 'deepwork_started_at';

function xpRateLabel(seconds: number): { label: string; color: string } {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 15) return { label: '1 XP / min', color: 'text-amber-300' };
  if (minutes < 30) return { label: '2 XP / min · Bonus vitesse !', color: 'text-orange-300' };
  return { label: '3 XP / min · Mode turbo 🔥', color: 'text-rose-300' };
}

export default function DeepworkPage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const totalXp = profile?.total_xp ?? 0;

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
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startedAt]);

  const elapsedSec = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = elapsedSec % 60;
  const currentXp = computeDeepworkXp(elapsedSec);
  const { label: rateLabel, color: rateColor } = xpRateLabel(elapsedSec);
  const active = !!startedAt;

  const handleStart = () => {
    const t = Date.now();
    localStorage.setItem(STORAGE_KEY, String(t));
    setStartedAt(t);
  };

  const handleStop = async () => {
    if (!startedAt || !user) return;
    const ended = Date.now();
    const duration = Math.floor((ended - startedAt) / 1000);
    const xp = computeDeepworkXp(duration);
    localStorage.removeItem(STORAGE_KEY);
    setStartedAt(null);

    if (duration >= 60) {
      await supabase.from('deepwork_sessions').insert({
        user_id: user.id,
        started_at: new Date(startedAt).toISOString(),
        ended_at: new Date(ended).toISOString(),
        duration_seconds: duration,
        xp_earned: xp,
      });
      const { data: prof } = await supabase
        .from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions, total_xp')
        .eq('user_id', user.id).single();
      if (prof) {
        await supabase.from('profiles').update({
          total_deepwork_seconds: (prof.total_deepwork_seconds ?? 0) + duration,
          total_deepwork_sessions: (prof.total_deepwork_sessions ?? 0) + 1,
          total_xp: (prof.total_xp ?? 0) + xp,
        }).eq('user_id', user.id);
      }
      await updateStreak(user.id);
      if (xp > 0) {
        playXpSound();
        setXpPop(xp);
        setTimeout(() => setXpPop(null), 2000);
      }
      await refreshProfile();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/student')}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-violet-400" />
          <h1 className="font-display font-semibold">Deepwork</h1>
        </div>
      </header>

      {/* Main focus area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">

        {/* Active banner */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm font-medium text-amber-300">En deep work en ce moment</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        {!active && (
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold mb-1">Lance ton chrono de concentration</h2>
            <p className="text-muted-foreground text-sm">Plus la session est longue, plus le débit monte</p>
          </div>
        )}

        {/* Big circular button */}
        <div className="relative flex flex-col items-center gap-8">
          <motion.button
            onClick={active ? handleStop : handleStart}
            whileTap={{ scale: 0.95 }}
            className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 transition-all shadow-2xl border-4 ${
              active
                ? 'border-violet-500 bg-violet-500/25 shadow-violet-500/40'
                : 'border-amber-500 bg-amber-500/15 hover:bg-amber-500/25 shadow-amber-500/30'
            }`}
          >
            {active
              ? <Pause size={40} className="text-violet-200" />
              : <Play size={40} className="text-amber-200 ml-2" />
            }
            <span className={`text-xs font-display font-bold tracking-[0.3em] ${active ? 'text-violet-300' : 'text-amber-300'}`}>
              FOCUS
            </span>
            <span className={`text-2xl font-display font-bold tabular-nums ${active ? 'text-violet-100' : 'text-amber-100'}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </motion.button>

          {/* XP pop animation */}
          <AnimatePresence>
            {xpPop !== null && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: -80, scale: 1.3 }}
                exit={{ opacity: 0, y: -140 }}
                transition={{ duration: 1.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <span className="font-display text-4xl font-bold text-amber-400 drop-shadow-[0_0_16px_rgba(245,166,35,0.9)]">
                  +{xpPop} XP
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* XP rate & info */}
        <div className="flex flex-col items-center gap-2 text-center">
          {active ? (
            <>
              <p className={`text-lg font-semibold ${rateColor}`}>{rateLabel}</p>
              <p className="text-muted-foreground text-sm">+{currentXp} XP en cours · {minutes} min de focus</p>
            </>
          ) : (
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>0–15 min : <span className="text-amber-300 font-medium">1 XP/min</span></span>
              <span>15–30 min : <span className="text-orange-300 font-medium">2 XP/min</span></span>
              <span>30+ min : <span className="text-rose-300 font-medium">3 XP/min</span></span>
            </div>
          )}
        </div>
      </div>

      {/* Stats section */}
      <div className="px-4 pb-10 max-w-2xl mx-auto w-full">
        {user && <DeepworkStats userId={user.id} />}
      </div>
    </div>
  );
}
