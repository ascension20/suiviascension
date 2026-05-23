import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowLeft, Music, Music2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp } from '@/lib/planning-utils';
import { playXpSound, useLofiMusic } from '@/hooks/useXpAudio';
import { useAuth } from '@/hooks/useAuth';
import { updateStreak } from '@/hooks/useOnlineTracker';
import { DeepworkStats } from '@/components/Deepwork/DeepworkStats';

const STORAGE_KEY = 'deepwork_started_at';

function xpRateInfo(seconds: number) {
  const m = Math.floor(seconds / 60);
  if (m < 15) return { rate: 1, label: '1 XP / min', color: 'hsl(43,90%,60%)' };
  if (m < 30) return { rate: 2, label: '2 XP / min · Bonus vitesse ⚡', color: 'hsl(38,92%,65%)' };
  return { rate: 3, label: '3 XP / min · Mode turbo 🔥', color: 'hsl(16,100%,65%)' };
}

export default function DeepworkPage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const { enabled: lofiOn, toggle: toggleLofi } = useLofiMusic();

  const [startedAt, setStartedAt] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? Number(v) : null;
  });
  const [now, setNow]       = useState(Date.now());
  const [xpPop, setXpPop]   = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedAt) {
      intervalRef.current = window.setInterval(() => setNow(Date.now()), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startedAt]);

  const elapsedSec  = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const minutes     = Math.floor(elapsedSec / 60);
  const seconds     = elapsedSec % 60;
  const earnedXp    = computeDeepworkXp(elapsedSec);
  const { label: rateLabel, color: rateColor } = xpRateInfo(elapsedSec);
  const active      = !!startedAt;

  const handleStart = () => {
    const t = Date.now();
    localStorage.setItem(STORAGE_KEY, String(t));
    setStartedAt(t);
  };

  const handleStop = async () => {
    if (!startedAt || !user) return;
    const ended    = Date.now();
    const duration = Math.floor((ended - startedAt) / 1000);
    const xp       = computeDeepworkXp(duration);
    localStorage.removeItem(STORAGE_KEY);
    setStartedAt(null);

    if (duration >= 60) {
      await supabase.from('deepwork_sessions').insert({
        user_id: user.id,
        started_at: new Date(startedAt).toISOString(),
        ended_at:   new Date(ended).toISOString(),
        duration_seconds: duration,
        xp_earned: xp,
      });
      const { data: prof } = await supabase
        .from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions, total_xp')
        .eq('user_id', user.id).single();
      if (prof) {
        await supabase.from('profiles').update({
          total_deepwork_seconds:  (prof.total_deepwork_seconds  ?? 0) + duration,
          total_deepwork_sessions: (prof.total_deepwork_sessions ?? 0) + 1,
          total_xp: (prof.total_xp ?? 0) + xp,
        }).eq('user_id', user.id);
      }
      await updateStreak(user.id);
      if (xp > 0) {
        playXpSound();
        setXpPop(xp);
        setTimeout(() => setXpPop(null), 2200);
      }
      await refreshProfile();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'hsl(222 22% 5%)' }}>

      {/* Ambient top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(43 90% 50% / 0.10) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ─── Header ─── */}
      <header
        className="relative z-10 border-b border-border px-4 py-3 flex items-center gap-3 backdrop-blur-sm"
        style={{ backgroundColor: 'hsl(222 22% 5% / 0.90)' }}
      >
        <button
          onClick={() => navigate('/student')}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <h1 className="font-display font-black tracking-tight" style={{ color: 'hsl(var(--primary))' }}>
            FOCUS MODE
          </h1>
        </div>

        {/* Lofi toggle */}
        <button
          onClick={toggleLofi}
          title={lofiOn ? 'Couper la musique lofi' : 'Activer la musique lofi'}
          className="ml-auto p-2 rounded-lg border transition-all"
          style={{
            borderColor: lofiOn ? 'hsl(43 90% 50% / 0.5)' : 'hsl(222 16% 18%)',
            backgroundColor: lofiOn ? 'hsl(43 90% 50% / 0.12)' : 'transparent',
            color: lofiOn ? 'hsl(var(--primary))' : 'hsl(220 10% 50%)',
          }}
        >
          {lofiOn ? <Music2 size={16} /> : <Music size={16} />}
        </button>
      </header>

      {/* ─── Focus area ─── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">

        {/* Active badge */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold"
              style={{
                borderColor: 'hsl(43 90% 50% / 0.4)',
                backgroundColor: 'hsl(43 90% 50% / 0.10)',
                color: 'hsl(var(--primary))',
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'hsl(var(--primary))' }}
              />
              ✦ SESSION ACTIVE ✦
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title when idle */}
        {!active && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-display font-black mb-1 neon-gold"
                style={{ color: 'hsl(var(--primary))' }}>
              ✦ Ascension Focus ✦
            </h2>
            <p className="text-muted-foreground text-sm">Plus la session est longue, plus le débit XP monte</p>
          </motion.div>
        )}

        {/* ─── Big circle button ─── */}
        <div className="relative flex flex-col items-center gap-8">
          <motion.button
            onClick={active ? handleStop : handleStart}
            whileTap={{ scale: 0.94 }}
            className="relative w-52 h-52 rounded-full flex flex-col items-center justify-center gap-3 transition-all border-4"
            style={{
              borderColor: active ? 'hsl(43 90% 50%)' : 'hsl(43 90% 50% / 0.4)',
              background: active
                ? 'linear-gradient(145deg, hsl(43 90% 50%) 0%, hsl(38 90% 36%) 100%)'
                : 'linear-gradient(145deg, hsl(43 90% 50% / 0.15) 0%, hsl(43 90% 50% / 0.04) 100%)',
              boxShadow: active
                ? '0 0 60px hsl(43 90% 50% / 0.5), 0 0 120px hsl(43 90% 50% / 0.2)'
                : '0 0 30px hsl(43 90% 50% / 0.15)',
            }}
          >
            {/* Rotating ring when active */}
            {active && (
              <div
                className="spin-slow absolute inset-[-12px] rounded-full border-2 border-dashed pointer-events-none"
                style={{ borderColor: 'hsl(43 90% 50% / 0.4)' }}
              />
            )}

            {active
              ? <Pause size={44} style={{ color: 'hsl(222 22% 8%)' }} />
              : <Play  size={44} style={{ color: 'hsl(var(--primary))' }} className="ml-2" />
            }
            <span
              className="text-xs font-display font-black tracking-[0.3em]"
              style={{ color: active ? 'hsl(222 22% 10%)' : 'hsl(var(--primary))' }}
            >
              {active ? 'STOP' : 'FOCUS'}
            </span>
            <span
              className="text-3xl font-display font-black tabular-nums leading-none"
              style={{ color: active ? 'hsl(222 22% 10%)' : 'hsl(var(--primary))' }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </motion.button>

          {/* XP pop */}
          <AnimatePresence>
            {xpPop !== null && (
              <motion.div
                key="xp-pop"
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: -100, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <span
                  className="font-display text-4xl font-black"
                  style={{
                    color: 'hsl(var(--primary))',
                    textShadow: '0 0 20px hsl(43 90% 50% / 0.8), 0 0 40px hsl(43 90% 50% / 0.4)',
                  }}
                >
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
              <p className="text-lg font-bold" style={{ color: rateColor }}>{rateLabel}</p>
              <p className="text-muted-foreground text-sm">
                +{earnedXp} XP en cours · {minutes} min {seconds > 0 ? `${seconds}s` : ''} de focus
              </p>
            </>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>0–15 min : <span className="font-bold" style={{ color: 'hsl(43,90%,60%)' }}>1 XP/min</span></span>
              <span>15–30 min : <span className="font-bold" style={{ color: 'hsl(38,92%,65%)' }}>2 XP/min</span></span>
              <span>30+ min : <span className="font-bold" style={{ color: 'hsl(16,100%,65%)' }}>3 XP/min</span></span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 px-4 pb-10 max-w-2xl mx-auto w-full">
        {user && <DeepworkStats userId={user.id} />}
      </div>
    </div>
  );
}
