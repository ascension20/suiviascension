import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';

const STORAGE_KEY = 'deepwork_started_at';

function XpRate({ minutes }: { minutes: number }) {
  const rate = minutes < 15 ? 1 : minutes < 30 ? 2 : 3;
  const label = rate === 1
    ? '1 XP/min'
    : rate === 2
    ? '2 XP/min · Bonus vitesse ⚡'
    : '3 XP/min · Mode turbo 🔥';
  return (
    <span className="text-xs font-semibold" style={{ color: `hsl(43 90% ${50 + rate * 5}%)` }}>
      {label}
    </span>
  );
}

function TierProgressBar({ minutes }: { minutes: number }) {
  const atMax = minutes >= 30;
  const inTier2 = minutes >= 15 && minutes < 30;
  const pct = atMax ? 100 : inTier2 ? ((minutes - 15) / 15) * 100 : (minutes / 15) * 100;
  const nextIn = atMax ? 0 : inTier2 ? 30 - minutes : 15 - minutes;
  const label = atMax
    ? '🔥 Mode turbo — palier max atteint'
    : inTier2
    ? `⚡ Palier 2 — 🔥 dans ${nextIn} min`
    : `Palier 1 — ⚡ dans ${nextIn} min`;
  const color = atMax ? 'hsl(16 100% 60%)' : inTier2 ? 'hsl(38 90% 55%)' : 'hsl(43 90% 50%)';

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold" style={{ color }}>{label}</span>
        <span className="text-[10px] text-muted-foreground">{atMax ? '' : `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 22% 14%)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: atMax ? 'hsl(16 100% 60%)' : inTier2 ? 'hsl(38 90% 55%)' : 'hsl(43 90% 50%)', boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
}

export function DeepworkWidget({ userId, onXpGain }: { userId: string; onXpGain: (amount: number) => void }) {
  const navigate = useNavigate();
  const [startedAt, setStartedAt] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? Number(v) : null;
  });
  const [now, setNow] = useState(Date.now());
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
  const active     = !!startedAt;

  return (
    <button
      onClick={() => navigate('/student/deepwork')}
      className="w-full text-left group"
    >
      <div
        className={`relative rounded-2xl border overflow-hidden transition-all duration-300 active:scale-[0.995] ${
          active ? 'border-primary/60 gold-pulse' : 'border-primary/30 hover:border-primary/60'
        }`}
        style={{
          background: 'hsl(222 22% 8%)',
          boxShadow: active
            ? undefined
            : '0 0 70px hsl(43 90% 50% / 0.28), 0 0 120px hsl(43 90% 50% / 0.1)',
        }}
      >
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

        {/* Ambient gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, hsl(43 90% 50% / 0.20) 0%, transparent 70%)',
            opacity: active ? 1 : 0.7,
          }}
        />

        {/* 4-corner brackets (manual via absolute divs — game panel look) */}
        {/* top-left */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 rounded-tl-sm pointer-events-none z-10 transition-opacity duration-300"
             style={{ borderColor: 'hsl(43 90% 55% / 0.6)', opacity: active ? 1 : 0.4 }} />
        {/* top-right */}
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 rounded-tr-sm pointer-events-none z-10 transition-opacity duration-300"
             style={{ borderColor: 'hsl(43 90% 55% / 0.6)', opacity: active ? 1 : 0.4 }} />
        {/* bottom-left */}
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 rounded-bl-sm pointer-events-none z-10 transition-opacity duration-300"
             style={{ borderColor: 'hsl(43 90% 55% / 0.6)', opacity: active ? 1 : 0.4 }} />
        {/* bottom-right */}
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 rounded-br-sm pointer-events-none z-10 transition-opacity duration-300"
             style={{ borderColor: 'hsl(43 90% 55% / 0.6)', opacity: active ? 1 : 0.4 }} />

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-10 px-6">

          {/* ── left: session badge + circle ── */}
          <div className="flex flex-col items-center gap-4">
            {active && (
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-widest uppercase hud-live"
                style={{
                  borderColor: 'hsl(43 90% 50% / 0.5)',
                  backgroundColor: 'hsl(43 90% 50% / 0.12)',
                  color: 'hsl(var(--primary))',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(142 71% 50%)', boxShadow: '0 0 6px hsl(142 71% 50%)' }} />
                SESSION ACTIVE
              </div>
            )}

            {/* Big circle */}
            <div
              className={`relative w-36 h-36 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                active
                  ? 'border-2 border-primary/80'
                  : 'border-2 border-primary/30 group-hover:border-primary/65'
              }`}
              style={{
                background: active
                  ? 'linear-gradient(135deg, hsl(43 90% 50%) 0%, hsl(38 90% 38%) 100%)'
                  : 'linear-gradient(135deg, hsl(43 90% 50% / 0.18) 0%, hsl(43 90% 50% / 0.05) 100%)',
                boxShadow: active
                  ? '0 0 60px hsl(43 90% 50% / 0.5), inset 0 0 30px hsl(43 90% 60% / 0.1)'
                  : '0 0 20px hsl(43 90% 50% / 0.1)',
              }}
            >
              {active
                ? <Pause size={44} style={{ color: 'hsl(222 22% 8%)' }} />
                : <Play  size={44} style={{ color: 'hsl(var(--primary))', filter: 'drop-shadow(0 0 8px hsl(43 90% 50% / 0.6))' }} className="ml-2" />
              }

              {/* Rotating ring — active */}
              {active && (
                <div
                  className="spin-slow absolute inset-[-12px] rounded-full border border-dashed pointer-events-none"
                  style={{ borderColor: 'hsl(43 90% 50% / 0.4)' }}
                />
              )}
              {/* Rotating ring 2 — slower, opposite */}
              {active && (
                <div
                  className="absolute inset-[-22px] rounded-full border border-dashed pointer-events-none"
                  style={{ borderColor: 'hsl(43 90% 50% / 0.15)', animation: 'spin-slow 20s linear infinite reverse' }}
                />
              )}

              {/* Static outer ring */}
              <div
                className="absolute inset-[-20px] rounded-full border pointer-events-none"
                style={{ borderColor: 'hsl(43 90% 50% / 0.08)' }}
              />
            </div>
          </div>

          {/* ── right: info ── */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'hsl(43 90% 50% / 0.6)' }}
            >
              {active ? '⚔ Session active' : '◈ Focus'}
            </p>

            {/* Timer */}
            <div
              className={`font-display font-black tabular-nums leading-none transition-all duration-300 ${active ? 'neon-gold' : ''}`}
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: active ? 'hsl(var(--primary))' : 'hsl(42 12% 92%)',
              }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            {/* XP rate */}
            {active && (
              <div className="flex items-center gap-2">
                <XpRate minutes={minutes} />
              </div>
            )}

            {/* Tier progress bar */}
            {active && (
              <div className="w-full max-w-[220px]">
                <TierProgressBar minutes={minutes} />
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {active ? 'Ouvrir la session →' : 'Démarrer une session de travail'}
            </p>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      </div>
    </button>
  );
}
