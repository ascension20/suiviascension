import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowLeft, Music, Music2, Swords, Moon, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp, DEEPWORK_STORAGE_KEY } from '@/lib/planning-utils';
import { TierProgressBar } from '@/components/Deepwork/DeepworkWidget';
import { playXpSound, useLofiMusic } from '@/hooks/useXpAudio';
import { useAuth } from '@/hooks/useAuth';
import { updateStreak } from '@/hooks/useOnlineTracker';
import { useDeepworkPresence } from '@/hooks/useDeepworkPresence';

const STORAGE_KEY         = DEEPWORK_STORAGE_KEY;
const CHECKIN_INTERVAL    = 3600; // trigger every 1 h (seconds)
const CHECKIN_WINDOW      = 600;  // 10 min to respond (seconds)
const DISCORD_VOICE_URL   = 'https://discord.com/channels/1347904044823478369/1347904634357940274';

// Discord logo SVG (official brand mark)
function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function xpRateInfo(seconds: number) {
  const m = Math.floor(seconds / 60);
  if (m < 15) return { label: '1 XP / min',                    color: 'hsl(43,90%,60%)' };
  if (m < 30) return { label: '2 XP / min · Bonus vitesse ◆', color: 'hsl(38,92%,65%)' };
  if (m < 90) return { label: '3 XP / min · Mode turbo ✦',    color: 'hsl(16,100%,65%)' };
  return             { label: '4 XP / min · Mode ULTRA ◈',     color: 'hsl(280,90%,70%)' };
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
  const [now, setNow]     = useState(Date.now());
  const [xpPop, setXpPop] = useState<number | null>(null);
  const [questTitle, setQuestTitle] = useState<string | null>(
    () => localStorage.getItem('deepwork_quest_title')
  );
  const intervalRef = useRef<number | null>(null);

  // ── Hourly check-in state ─────────────────────────────────────────────────
  const [showCheckin, setShowCheckin]         = useState(false);
  const [checkinDeadline, setCheckinDeadline] = useState<number | null>(null);
  const [checkinCountdown, setCheckinCountdown] = useState(CHECKIN_WINDOW);
  // Which hour we last triggered a check-in for. Initialised from current
  // elapsed time so we don't immediately pop on page reload mid-session.
  const lastCheckinHour = useRef(
    startedAt ? Math.floor((Date.now() - startedAt) / 1000 / CHECKIN_INTERVAL) : 0
  );

  // 1-second ticker
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

  // ── handleStop (stable via useCallback + ref) ────────────────────────────
  const handleStop = useCallback(async () => {
    if (!startedAt || !user) return;
    const ended    = Date.now();
    const duration = Math.floor((ended - startedAt) / 1000);
    const xp       = computeDeepworkXp(duration);

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('deepwork_quest_title');
    window.dispatchEvent(new Event('deepwork-session-change'));
    setStartedAt(null);
    setQuestTitle(null);
    setShowCheckin(false);
    setCheckinDeadline(null);
    lastCheckinHour.current = 0;

    if (duration >= 60) {
      await supabase.from('deepwork_sessions').insert({
        user_id:          user.id,
        started_at:       new Date(startedAt).toISOString(),
        ended_at:         new Date(ended).toISOString(),
        duration_seconds: duration,
        xp_earned:        xp,
      });
      if (xp > 0) {
        await supabase.from('xp_history').insert({ user_id: user.id, amount: xp, source: 'deepwork' });
      }
      const { data: prof } = await supabase
        .from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions, total_xp')
        .eq('user_id', user.id).single();
      if (prof) {
        await supabase.from('profiles').update({
          total_deepwork_seconds:  (prof.total_deepwork_seconds  ?? 0) + duration,
          total_deepwork_sessions: (prof.total_deepwork_sessions ?? 0) + 1,
          total_xp:                (prof.total_xp                ?? 0) + xp,
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
  }, [startedAt, user, refreshProfile]);

  // Keep a ref so the countdown effect always calls the latest version
  const handleStopRef = useRef(handleStop);
  useEffect(() => { handleStopRef.current = handleStop; }, [handleStop]);

  // ── Hourly check-in: trigger ──────────────────────────────────────────────
  useEffect(() => {
    if (!active || showCheckin) return;
    const currentHour = Math.floor(elapsedSec / CHECKIN_INTERVAL);
    if (currentHour > 0 && currentHour > lastCheckinHour.current) {
      lastCheckinHour.current = currentHour;
      const deadline = Date.now() + CHECKIN_WINDOW * 1000;
      setCheckinDeadline(deadline);
      setCheckinCountdown(CHECKIN_WINDOW);
      setShowCheckin(true);
      // Notify if tab is hidden or browser notifications are granted
      if (Notification.permission === 'granted') {
        new Notification('Deepwork — Tu es toujours là ?', {
          body: `${currentHour}h de session. Tu as 10 minutes pour confirmer, sinon le chrono s'arrête.`,
          icon: '/favicon.ico',
          requireInteraction: true,
        });
      }
    }
  }, [elapsedSec, active, showCheckin]);

  // ── Hourly check-in: countdown + auto-stop ───────────────────────────────
  useEffect(() => {
    if (!showCheckin || checkinDeadline === null) return;
    const remaining = Math.ceil((checkinDeadline - now) / 1000);
    setCheckinCountdown(Math.max(0, remaining));
    if (remaining <= 0) {
      setShowCheckin(false);
      setCheckinDeadline(null);
      void handleStopRef.current();
    }
  }, [now, showCheckin, checkinDeadline]);

  const handleCheckinConfirm = () => {
    setShowCheckin(false);
    setCheckinDeadline(null);
  };

  const handleStart = () => {
    const t = Date.now();
    localStorage.setItem(STORAGE_KEY, String(t));
    window.dispatchEvent(new Event('deepwork-session-change'));
    setStartedAt(t);
    lastCheckinHour.current = 0;
  };

  // ── Background ────────────────────────────────────────────────────────────
  const libBg = {
    background: [
      'repeating-linear-gradient(90deg, transparent 0px, transparent 28px, hsl(30 30% 40% / 0.025) 28px, hsl(30 30% 40% / 0.025) 30px)',
      'repeating-linear-gradient(180deg, transparent 0px, transparent 64px, hsl(28 25% 35% / 0.06) 64px, hsl(28 25% 35% / 0.06) 68px)',
      'radial-gradient(ellipse at 10% 80%, hsl(30 60% 28% / 0.14) 0%, transparent 55%)',
      'radial-gradient(ellipse at 90% 20%, hsl(43 70% 38% / 0.10) 0%, transparent 55%)',
      'hsl(222 22% 5%)',
    ].join(', '),
  };

  const checkinMin = String(Math.floor(checkinCountdown / 60)).padStart(2, '0');
  const checkinSec = String(checkinCountdown % 60).padStart(2, '0');
  const checkinUrgent = checkinCountdown <= 60;

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
                  <Swords size={12} className="inline mr-1" /> {questTitle}
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
        <div className="flex flex-col items-center gap-3 text-center w-full max-w-xs">
          {active ? (
            <>
              <p className="text-lg font-bold" style={{ color: rateColor }}>{rateLabel}</p>
              <TierProgressBar elapsedSec={elapsedSec} />
              <p className="text-muted-foreground text-sm">
                +{earnedXp} XP · {minutes} min {seconds > 0 ? `${seconds}s` : ''}
              </p>
            </>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span>0–15 min : <span className="font-bold" style={{ color: 'hsl(43,90%,60%)' }}>1 XP/min</span></span>
              <span>15–30 min : <span className="font-bold" style={{ color: 'hsl(38,92%,65%)' }}>2 XP/min</span></span>
              <span>30–90 min : <span className="font-bold" style={{ color: 'hsl(16,100%,65%)' }}>3 XP/min</span></span>
              <span>90+ min : <span className="font-bold" style={{ color: 'hsl(280,90%,70%)' }}>4 XP/min</span></span>
            </div>
          )}
        </div>

        {/* Controls row: Lofi + Discord */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Lofi button */}
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

          {/* Discord voice channel */}
          <a
            href={DISCORD_VOICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Rejoindre le salon vocal Deepwork sur Discord"
            className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm hover:brightness-110 active:scale-95"
            style={{
              borderColor: 'hsl(235 86% 65% / 0.45)',
              backgroundColor: 'hsl(235 86% 65% / 0.08)',
              color: 'hsl(235 86% 75%)',
              textDecoration: 'none',
            }}
          >
            <DiscordIcon size={15} />
            <span>Vocal Deepwork</span>
          </a>
        </div>

        {/* ── Présence élèves ── */}
        <div className="flex flex-col items-center gap-3 w-full max-w-md">
          {peers.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center">
              <Moon size={11} className="inline mr-1 opacity-60" /> Tu es le premier à étudier en ce moment
            </p>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'hsl(142 71% 50%)',
                    boxShadow: '0 0 6px hsl(142 71% 50% / 0.9)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
                <span
                  className="text-[11px] font-bold tracking-widest uppercase"
                  style={{ color: 'hsl(43 90% 55%)' }}
                >
                  {peers.length} élève{peers.length > 1 ? 's' : ''} en session
                </span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <AnimatePresence>
                  {peers.map((u, i) => (
                    <motion.div
                      key={u.pseudo}
                      initial={{ opacity: 0, scale: 0.75, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: i * 0.08, type: 'spring', bounce: 0.35 }}
                      className="relative flex flex-col items-center gap-2 p-3 rounded-xl border"
                      style={{
                        width: 80,
                        borderColor: 'hsl(43 90% 50% / 0.28)',
                        background: 'linear-gradient(145deg, hsl(222 22% 11%) 0%, hsl(222 22% 7%) 100%)',
                        boxShadow: '0 0 20px hsl(43 90% 50% / 0.06), inset 0 0 20px hsl(43 90% 50% / 0.03)',
                      }}
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t pointer-events-none rounded-tl-lg"
                           style={{ borderColor: 'hsl(43 90% 55% / 0.5)' }} />
                      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t pointer-events-none rounded-tr-lg"
                           style={{ borderColor: 'hsl(43 90% 55% / 0.5)' }} />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b pointer-events-none rounded-bl-lg"
                           style={{ borderColor: 'hsl(43 90% 55% / 0.5)' }} />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b pointer-events-none rounded-br-lg"
                           style={{ borderColor: 'hsl(43 90% 55% / 0.5)' }} />
                      <div
                        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full hud-live"
                        style={{ background: 'hsl(142 71% 50%)', boxShadow: '0 0 6px hsl(142 71% 50% / 0.8)' }}
                      />
                      <div
                        className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                        style={{ background: 'hsl(222 22% 6%)' }}
                      >
                        <img
                          src={u.avatarUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(u.pseudo)}&backgroundColor=0d1117&backgroundType[]=solid`}
                          alt={u.pseudo}
                          draggable={false}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                      <p
                        className="text-[10px] font-bold text-center leading-tight w-full truncate"
                        style={{ color: 'hsl(42 12% 82%)' }}
                      >
                        {u.pseudo}
                      </p>
                      <p className="text-[9px] text-center leading-none" style={{ color: 'hsl(142 71% 45%)' }}>
                        ● focus
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hourly check-in overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showCheckin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'hsl(222 22% 4% / 0.88)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 24 }}
              animate={{ scale: 1,    y: 0  }}
              exit={{ scale: 0.9,    y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative flex flex-col items-center gap-6 p-8 rounded-2xl border max-w-sm w-full mx-6 text-center"
              style={{
                borderColor: checkinUrgent ? 'hsl(0 84% 60% / 0.5)' : 'hsl(43 90% 50% / 0.4)',
                background: 'linear-gradient(145deg, hsl(222 22% 11%) 0%, hsl(222 22% 7%) 100%)',
                boxShadow: checkinUrgent
                  ? '0 0 60px hsl(0 84% 60% / 0.18), 0 0 120px hsl(0 84% 60% / 0.07)'
                  : '0 0 60px hsl(43 90% 50% / 0.14), 0 0 120px hsl(43 90% 50% / 0.06)',
              }}
            >
              {/* Corner brackets */}
              {(['tl','tr','bl','br'] as const).map(c => (
                <div
                  key={c}
                  className="absolute w-5 h-5 pointer-events-none"
                  style={{
                    top:    c.startsWith('t') ? 0 : undefined,
                    bottom: c.startsWith('b') ? 0 : undefined,
                    left:   c.endsWith('l')   ? 0 : undefined,
                    right:  c.endsWith('r')   ? 0 : undefined,
                    borderTop:    c.startsWith('t') ? `2px solid ${checkinUrgent ? 'hsl(0 84% 60% / 0.7)' : 'hsl(43 90% 55% / 0.6)'}` : undefined,
                    borderBottom: c.startsWith('b') ? `2px solid ${checkinUrgent ? 'hsl(0 84% 60% / 0.7)' : 'hsl(43 90% 55% / 0.6)'}` : undefined,
                    borderLeft:   c.endsWith('l')   ? `2px solid ${checkinUrgent ? 'hsl(0 84% 60% / 0.7)' : 'hsl(43 90% 55% / 0.6)'}` : undefined,
                    borderRight:  c.endsWith('r')   ? `2px solid ${checkinUrgent ? 'hsl(0 84% 60% / 0.7)' : 'hsl(43 90% 55% / 0.6)'}` : undefined,
                    borderRadius:
                      c === 'tl' ? '0.75rem 0 0 0' :
                      c === 'tr' ? '0 0.75rem 0 0' :
                      c === 'bl' ? '0 0 0 0.75rem' : '0 0 0.75rem 0',
                  }}
                />
              ))}

              {/* Icon */}
              <motion.div
                animate={{ scale: checkinUrgent ? [1, 1.08, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: checkinUrgent
                    ? 'linear-gradient(145deg, hsl(0 84% 60% / 0.2), hsl(0 84% 60% / 0.05))'
                    : 'linear-gradient(145deg, hsl(43 90% 50% / 0.2), hsl(43 90% 50% / 0.05))',
                  border: `2px solid ${checkinUrgent ? 'hsl(0 84% 60% / 0.5)' : 'hsl(43 90% 50% / 0.45)'}`,
                  boxShadow: checkinUrgent
                    ? '0 0 30px hsl(0 84% 60% / 0.25)'
                    : '0 0 30px hsl(43 90% 50% / 0.2)',
                }}
              >
                <Zap
                  size={30}
                  style={{ color: checkinUrgent ? 'hsl(0 84% 68%)' : 'hsl(43 90% 62%)' }}
                />
              </motion.div>

              {/* Label + title */}
              <div className="flex flex-col gap-1">
                <p
                  className="text-[10px] font-black tracking-[0.22em] uppercase"
                  style={{ color: checkinUrgent ? 'hsl(0 84% 60% / 0.7)' : 'hsl(43 90% 50% / 0.6)' }}
                >
                  Vérification de présence
                </p>
                <h2
                  className="font-display text-xl font-black"
                  style={{ color: 'hsl(42 12% 92%)' }}
                >
                  Tu es toujours là ?
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {Math.floor(elapsedSec / CHECKIN_INTERVAL)}h de session en cours
                </p>
              </div>

              {/* Countdown */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.span
                  key={checkinMin + checkinSec}
                  animate={checkinUrgent ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.8 }}
                  className="font-display font-black tabular-nums"
                  style={{
                    fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
                    color: checkinUrgent ? 'hsl(0 84% 65%)' : 'hsl(var(--primary))',
                    textShadow: checkinUrgent
                      ? '0 0 24px hsl(0 84% 60% / 0.55)'
                      : '0 0 24px hsl(43 90% 50% / 0.45)',
                    lineHeight: 1,
                  }}
                >
                  {checkinMin}:{checkinSec}
                </motion.span>
                <p className="text-xs text-muted-foreground">
                  Le chrono s'arrête automatiquement ensuite
                </p>
              </div>

              {/* Confirm */}
              <button
                onClick={handleCheckinConfirm}
                className="w-full py-3.5 rounded-xl font-display font-black text-sm tracking-[0.18em] uppercase transition-all active:scale-[0.97] hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, hsl(43 90% 40%), hsl(50 100% 60%))',
                  color: 'hsl(222 22% 6%)',
                  boxShadow: '0 0 22px hsl(43 90% 50% / 0.45)',
                }}
              >
                ◆ Je suis là !
              </button>

              {/* Stop */}
              <button
                onClick={() => { setShowCheckin(false); setCheckinDeadline(null); void handleStop(); }}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                Arrêter la session
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
