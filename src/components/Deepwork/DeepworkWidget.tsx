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
    <span className="text-xs font-semibold" style={{ color: `hsl(var(--primary) / ${0.5 + rate * 0.15})` }}>
      {label}
    </span>
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
        className={`
          relative rounded-2xl border overflow-hidden transition-all duration-300
          hover:border-primary/60 active:scale-[0.995]
          ${active
            ? 'border-primary/40 gold-pulse'
            : 'border-primary/20 hover:shadow-[0_0_40px_hsl(43_90%_50%/0.12)]'}
        `}
        style={{ background: 'hsl(222 22% 8%)' }}
      >
        {/* ── top gold line ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        {/* ── ambient gold glow behind circle ── */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, hsl(43 90% 50% / 0.12) 0%, transparent 70%)',
            opacity: active ? 1 : 0.4,
          }}
        />

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-10 px-6">

          {/* ── left: session badge ── */}
          <div className="flex flex-col items-center gap-4">
            {active && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold"
                style={{
                  borderColor: 'hsl(43 90% 50% / 0.5)',
                  backgroundColor: 'hsl(43 90% 50% / 0.12)',
                  color: 'hsl(var(--primary))',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(var(--primary))' }} />
                SESSION ACTIVE
              </div>
            )}

            {/* Big circle */}
            <div
              className={`
                relative w-36 h-36 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-300
                ${active
                  ? 'border-2 border-primary/80 shadow-[0_0_50px_hsl(43_90%_50%/0.45)]'
                  : 'border-2 border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_hsl(43_90%_50%/0.2)]'}
              `}
              style={{
                background: active
                  ? 'linear-gradient(135deg, hsl(43 90% 50%) 0%, hsl(38 90% 38%) 100%)'
                  : 'linear-gradient(135deg, hsl(43 90% 50% / 0.15) 0%, hsl(43 90% 50% / 0.05) 100%)',
              }}
            >
              {active
                ? <Pause size={40} style={{ color: 'hsl(222 22% 8%)' }} />
                : <Play  size={40} style={{ color: 'hsl(var(--primary))' }} className="ml-2" />
              }

              {/* Rotating ring when active */}
              {active && (
                <div
                  className="spin-slow absolute inset-[-10px] rounded-full border border-dashed pointer-events-none"
                  style={{ borderColor: 'hsl(43 90% 50% / 0.35)' }}
                />
              )}

              {/* Static outer ring */}
              <div
                className="absolute inset-[-18px] rounded-full border pointer-events-none"
                style={{ borderColor: 'hsl(43 90% 50% / 0.1)' }}
              />
            </div>
          </div>

          {/* ── right: info ── */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
               style={{ color: 'hsl(43 90% 50% / 0.6)' }}>
              ✦ Ascension Focus ✦
            </p>

            {/* Timer */}
            <div
              className="font-display font-black tabular-nums leading-none transition-all duration-300"
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                color: active ? 'hsl(var(--primary))' : 'hsl(42 12% 92%)',
                textShadow: active ? '0 0 30px hsl(43 90% 50% / 0.4)' : 'none',
              }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            {/* XP rate */}
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              {active
                ? <XpRate minutes={minutes} />
                : <span className="text-xs text-muted-foreground">Débit : 1 → 2 → 3 XP/min selon la durée</span>
              }
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              {active
                ? 'Clique pour accéder à ta session ↗'
                : 'Clique pour lancer ta session deepwork ↗'}
            </p>
          </div>
        </div>

        {/* ── bottom gold line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      </div>
    </button>
  );
}
