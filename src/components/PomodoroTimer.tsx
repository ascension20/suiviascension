import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Minus, Plus, Bell, BellOff, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBJECTS, Subject, playBeep } from '@/lib/game-utils';

const PRESETS = [
  { label: '25 min', minutes: 25 },
  { label: '50 min', minutes: 50 },
  { label: '5 min', minutes: 5, isBreak: true },
];

interface Props {
  onSessionComplete?: (subject: Subject, durationMinutes: number) => void;
}

export function PomodoroTimer({ onSessionComplete }: Props) {
  const [customMinutes, setCustomMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [subject, setSubject] = useState<Subject>('Mathématiques');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const totalSeconds = customMinutes * 60;

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (soundEnabled) playBeep();
          if (!isBreak) {
            onSessionComplete?.(subject, customMinutes);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, subject, onSessionComplete, customMinutes, soundEnabled]);

  const applyPreset = useCallback((minutes: number, brk: boolean = false) => {
    setCustomMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setIsBreak(brk);
    setHasStarted(false);
  }, []);

  const adjustMinutes = useCallback((delta: number) => {
    if (isRunning) return;
    setCustomMinutes(prev => {
      const next = Math.max(1, Math.min(180, prev + delta));
      setTimeLeft(next * 60);
      return next;
    });
    setHasStarted(false);
  }, [isRunning]);

  const toggleTimer = useCallback(() => {
    setIsRunning(r => {
      if (!r) setHasStarted(true);
      return !r;
    });
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(customMinutes * 60);
    setHasStarted(false);
  }, [customMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Subject pills */}
      <div className="flex gap-2 flex-wrap justify-center">
        {SUBJECTS.map(s => (
          <button
            key={s}
            onClick={() => setSubject(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
              subject === s
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="relative">
        <svg width="260" height="260" className="-rotate-90">
          <circle
            cx="130" cy="130" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <circle
            cx="130" cy="130" r={radius}
            fill="none"
            stroke={isRunning ? "hsl(var(--success))" : "hsl(var(--primary))"}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Duration adjuster (only when not running and not started) */}
          {!hasStarted && (
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => adjustMinutes(-5)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                value={customMinutes}
                onChange={e => {
                  const v = Math.max(1, Math.min(180, parseInt(e.target.value) || 1));
                  setCustomMinutes(v);
                  setTimeLeft(v * 60);
                }}
                className="w-16 text-center bg-transparent font-display text-2xl font-bold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-muted-foreground -ml-2">min</span>
              <button
                onClick={() => adjustMinutes(5)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
          {hasStarted && (
            <span className="font-display text-6xl font-bold tabular-nums text-foreground">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          )}
          <span className="text-sm text-muted-foreground mt-2">
            {subject} · {isBreak ? 'Pause' : 'Focus'} · {customMinutes} min
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={resetTimer}
          className="w-11 h-11 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center hover:text-foreground hover:border-muted-foreground transition-colors"
        >
          <RotateCcw size={18} />
        </button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={toggleTimer}
          className="w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground"
          style={{
            backgroundColor: isRunning ? 'hsl(var(--success))' : 'hsl(var(--primary))',
            boxShadow: isRunning
              ? '0 0 30px hsl(var(--success) / 0.4)'
              : '0 0 30px hsl(var(--primary) / 0.4)',
          }}
        >
          {isRunning ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
        </motion.button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={cn(
            "w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center transition-colors text-xs font-medium",
            soundEnabled ? "text-foreground" : "text-muted-foreground"
          )}
          title={soundEnabled ? 'Son activé' : 'Son désactivé'}
        >
          {soundEnabled ? <Bell size={14} /> : <BellOff size={14} />}
        </button>
      </div>

      {/* Preset selector */}
      <div className="flex gap-2">
        {PRESETS.map(p => (
          <button
            key={p.label}
            onClick={() => applyPreset(p.minutes, p.isBreak || false)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-medium transition-all",
              customMinutes === p.minutes && isBreak === !!p.isBreak
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-1">{p.label}{p.isBreak ? <Coffee size={10} className="opacity-60" /> : null}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
