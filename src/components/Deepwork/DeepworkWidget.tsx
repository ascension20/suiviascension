import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Brain } from 'lucide-react';

const STORAGE_KEY = 'deepwork_started_at';

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
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = elapsedSec % 60;
  const active = !!startedAt;

  return (
    <button
      onClick={() => navigate('/student/deepwork')}
      className={`w-full text-left relative rounded-xl border p-5 overflow-hidden transition-all hover:opacity-90 active:scale-[0.99] ${
        active
          ? 'border-violet-500/40 bg-violet-500/5'
          : 'border-amber-500/40 bg-amber-500/5'
      }`}
    >
      {active && (
        <div className="mb-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-amber-300">En deep work en ce moment</span>
        </div>
      )}
      <div className="flex items-center gap-5">
        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
          active
            ? 'bg-violet-500 shadow-violet-500/40'
            : 'bg-amber-500 shadow-amber-500/40'
        }`}>
          {active ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
          <span className="absolute -bottom-6 text-[10px] font-display font-bold tracking-widest text-foreground">
            {active ? 'PAUSE' : 'FOCUS'}
          </span>
        </div>
        <div className="flex-1 pt-1">
          <p className={`text-sm mb-1 font-medium ${active ? 'text-violet-300' : 'text-amber-300'}`}>
            {active ? `${minutes} min de focus` : 'Lancer une session deepwork'}
          </p>
          <div className="font-display text-4xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {active
              ? `Cliquer pour ouvrir · débit actuel ${minutes < 15 ? '1' : minutes < 30 ? '2' : '3'} XP/min`
              : 'Plus la session est longue, plus le débit monte (1→2→3 XP/min)'}
          </p>
        </div>
      </div>
    </button>
  );
}
