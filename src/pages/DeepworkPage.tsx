import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowLeft, Music, Music2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp, DEEPWORK_STORAGE_KEY } from '@/lib/planning-utils';
import { playXpSound, useLofiMusic } from '@/hooks/useXpAudio';
import { useAuth } from '@/hooks/useAuth';
import { updateStreak } from '@/hooks/useOnlineTracker';
import { useDeepworkPresence } from '@/hooks/useDeepworkPresence';

const STORAGE_KEY = DEEPWORK_STORAGE_KEY;

function xpRateInfo(seconds: number) {
  const m = Math.floor(seconds / 60);
  if (m < 15) return { rate: 1, label: '1 XP / min', color: 'hsl(43,90%,60%)' };
  if (m < 30) return { rate: 2, label: '2 XP / min · Bonus vitesse ⚡', color: 'hsl(38,92%,65%)' };
  return { rate: 3, label: '3 XP / min · Mode turbo 🔥', color: 'hsl(16,100%,65%)' };
}

// ── Page principale ─────────────────────────────────────────────────────────
export default function DeepworkPage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const { enabled: lofiOn, toggle: toggleLofi } = useLofiMusic();
  const peers = useDeepworkPresence();

  const [startedAt, setStartedAt] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? Number(v) : null;
  });
  const [now, setNow]       = useState(Date.now());
  const [xpPop, setXpPop]   = useState<number | null>(null);
  const [questTitle, setQuestTitle] = useState<string | null>(() => localStorage.getItem('deepwork_quest_title'));
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
  const minutes    = Math.floor(elapsedSec / 60);
  const seconds    = elapsedSec % 60;
  const earnedXp   = computeDeepworkXp(elapsedSec);
  const { label: rateLabel, color: rateColor } = xpRateInfo(elapsedSec);
  const active     = !!startedAt;

  const handleStart = () => {
    const t = Date.now();
    localStorage.setItem(STORAGE_KEY, String(t));
    window.dispatchEvent(new Event('deepwork-session-change'));
    setStartedAt(t);
  };

  const handleStop = async () => {
    if (!startedAt || !user) return;
    const ended    = Date.now();
    const duration = Math.floor((ended - startedAt) / 1000);
    const xp       = computeDeepworkXp(duration);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('deepwork_quest_title');
    window.dispatchEvent(new Event('deepwork-session-change'));
    setStartedAt(null);
    setQuestTitle(null);

    if (duration >= 60) {
      await supabase.from('deepwork_sessions').insert({
        user_id:          user.id,
        started_at:       new Date(startedAt).toISOString(),
        ended_at:         new Date(ended).toISOString(),
        duration_seconds: duration,
        xp_earned:        xp,
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

  // ── Fond bibliothèque ─────────────────────────────────────────────────────
  const libBg = {
    background: [
      /* vertical planches de bibliothèque */
      'repeating-linear-gradient(90deg, transparent 0px, transparent 28px, hsl(30 30% 40% / 0.025) 28px, hsl(30 30% 40% / 0.025) 30px)',
      /* étagères horizontales */
      'repeating-linear-gradient(180deg, transparent 0px, transparent 64px, hsl(28 25% 35% / 0.06) 64px, hsl(28 25% 35% / 0.06) 68px)',
      /* chaleur ambiante gauche */
      'radial-gradient(ellipse at 10% 80%, hsl(30 60% 28% / 0.14) 0%, transparent 55%)',
      /* chaleur ambiante droite */
      'radial-gradient(ellipse at 90% 20%, hsl(43 70% 38% / 0.10) 0%, transparent 55%)',
      'hsl(222 22% 5%)',
    ].join(', '),
  };

  return (
    <div className="min-h-screen flex flex-col" style={libBg}>

      {/* Ambient ceiling glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(43 90% 50% / 0.09) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ─── Header ─── */}
      <header
        className="relative z-10 border-b border-border px-4 py-3 flex items-center gap-3 backdrop-blur-sm"
        style={{ backgroundColor: 'hsl(222 22% 5% / 0.85)' }}
      >
        <button
          onClick={() => navigate('/student')}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display font-semibold text-foreground">Deepwork</h1>
      </header>

      {/* ─── Focus area ─── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">

        {/* Active badge */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold"
                style={{
                  borderColor: 'hsl(43 90% 50% / 0.4)',
                  backgroundColor: 'hsl(43 90% 50% / 0.10)',
                  color: 'hsl(var(--primary))',
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(var(--primary))' }} />
                Session active
              </div>
              {questTitle && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium"
                  style={{
                    borderColor: 'hsl(270 50% 50% / 0.4)',
                    backgroundColor: 'hsl(270 50% 50% / 0.10)',
                    color: 'hsl(270 60% 75%)',
                  }}
                >
                  ⚔️ {questTitle}
                </div>
              )}
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
            <h2 className="text-2xl font-display font-black mb-1" style={{ color: 'hsl(var(--primary))' }}>
              Deepwork
            </h2>
            <p className="text-muted-foreground text-sm">Plus la session est longue, plus le débit XP monte</p>
          </motion.div>
        )}

        {/* ─── Big circle button ─── */}
        <div className="relative flex flex-col items-center gap-6">
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
                    textShadow: '0 0 20px hsl(43 90% 50% / 0.8)',
                  }}
                >
                  +{xpPop} XP
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* XP rate info */}
        <div className="flex flex-col items-center gap-2 text-center">
          {active ? (
            <>
              <p className="text-lg font-bold" style={{ color: rateColor }}>{rateLabel}</p>
              <p className="text-muted-foreground text-sm">
                +{earnedXp} XP · {minutes} min {seconds > 0 ? `${seconds}s` : ''}
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

        {/* Lofi button — centré */}
        <button
          onClick={toggleLofi}
          title={lofiOn ? 'Couper la musique lofi' : 'Activer la musique lofi'}
          className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm"
          style={{
            borderColor: lofiOn ? 'hsl(43 90% 50% / 0.5)' : 'hsl(222 16% 22%)',
            backgroundColor: lofiOn ? 'hsl(43 90% 50% / 0.10)' : 'transparent',
            color: lofiOn ? 'hsl(var(--primary))' : 'hsl(220 10% 55%)',
          }}
        >
          {lofiOn ? <Music2 size={15} /> : <Music size={15} />}
          <span>{lofiOn ? 'Lofi ON' : 'Lofi OFF'}</span>
        </button>

        {/* ── Présence élèves ── */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md">
          {peers.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center">
              Tu es le premier à étudier en ce moment 🌙
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold" style={{ color: 'hsl(43 90% 50% / 0.7)' }}>
                {peers.length} élève{peers.length > 1 ? 's' : ''} en deepwork avec toi
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {peers.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: 'hsl(43 90% 50% / 0.3)',
                      backgroundColor: 'hsl(43 90% 50% / 0.07)',
                    }}
                  >
                    <span className="text-base leading-none">{u.avatar}</span>
                    <span className="text-xs font-semibold" style={{ color: 'hsl(42 12% 88%)' }}>
                      {u.pseudo}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
