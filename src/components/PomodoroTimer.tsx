import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBJECTS, Subject, playBeep } from '@/lib/game-utils';

const MODES = {
  focus25: { label: '25 min', seconds: 25 * 60 },
  break5: { label: '5 min', seconds: 5 * 60 },
  focus50: { label: '50 min', seconds: 50 * 60 },
} as const;

type ModeKey = keyof typeof MODES;

interface Props {
  onSessionComplete?: (subject: Subject, durationMinutes: number) => void;
}

export function PomodoroTimer({ onSessionComplete }: Props) {
  const [mode, setMode] = useState<ModeKey>('focus25');
  const [timeLeft, setTimeLeft] = useState(MODES.focus25.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [subject, setSubject] = useState<Subject>('Maths');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const totalSeconds = MODES[mode].seconds;

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (soundEnabled) playBeep();
          if (mode !== 'break5') {
            onSessionComplete?.(subject, totalSeconds / 60);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, subject, onSessionComplete, totalSeconds, soundEnabled]);

  const handleModeChange = useCallback((newMode: ModeKey) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].seconds);
    setIsRunning(false);
  }, []);

  const toggleTimer = useCallback(() => setIsRunning(r => !r), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].seconds);
  }, [mode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / totalSeconds;

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
          <span className="font-display text-6xl font-bold tabular-nums text-foreground">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-sm text-muted-foreground mt-2">{subject} · {MODES[mode].label}</span>
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
          {soundEnabled ? '🔔' : '🔕'}
        </button>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2">
        {(Object.keys(MODES) as ModeKey[]).map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-medium transition-all",
              mode === m
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>
    </div>
  );
}
