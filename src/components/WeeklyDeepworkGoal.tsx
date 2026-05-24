import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getWeekStart, getWeekDays, formatDateISO } from '@/lib/planning-utils';

const WEEKLY_GOAL_MIN = 300; // 5 h / semaine
const SHORT_DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

interface DayData { label: string; minutes: number; isToday: boolean; }

function fmtMin(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h === 0) return `${min} min`;
  if (min === 0) return `${h} h`;
  return `${h} h ${String(min).padStart(2, '0')}`;
}

export function WeeklyDeepworkGoal({ userId }: { userId: string }) {
  const [days, setDays]     = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const weekStart = getWeekStart(new Date());
      const weekDays  = getWeekDays(weekStart);
      const weekEnd   = new Date(weekDays[6]);
      weekEnd.setHours(23, 59, 59, 999);

      const { data: sessions } = await supabase
        .from('deepwork_sessions')
        .select('started_at, duration_seconds')
        .eq('user_id', userId)
        .gte('started_at', weekStart.toISOString())
        .lte('started_at', weekEnd.toISOString());

      const byDay: Record<string, number> = {};
      weekDays.forEach(d => { byDay[formatDateISO(d)] = 0; });
      sessions?.forEach(s => {
        const key = (s.started_at ?? '').slice(0, 10);
        if (byDay[key] !== undefined) byDay[key] += Math.floor((s.duration_seconds ?? 0) / 60);
      });

      const todayIso = formatDateISO(new Date());
      setDays(weekDays.map((d, i) => ({
        label:   SHORT_DAYS[i],
        minutes: byDay[formatDateISO(d)] ?? 0,
        isToday: formatDateISO(d) === todayIso,
      })));
      setLoading(false);
    };
    load();
  }, [userId]);

  const totalMin  = days.reduce((s, d) => s + d.minutes, 0);
  const pct       = Math.min(100, Math.round((totalMin / WEEKLY_GOAL_MIN) * 100));
  const remaining = Math.max(0, WEEKLY_GOAL_MIN - totalMin);
  const done      = totalMin >= WEEKLY_GOAL_MIN;
  const maxDay    = Math.max(...days.map(d => d.minutes), 1);

  if (loading) {
    return <div className="bg-card border border-border rounded-lg p-4 min-h-[200px] animate-pulse" />;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 h-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold flex items-center gap-1.5">
          <Target size={14} className="text-primary" />
          Objectif semaine
        </h3>
        <span className="text-[10px] text-muted-foreground">5 h / semaine</span>
      </div>

      {/* Total + progress bar */}
      <div>
        <div className="flex items-end justify-between mb-1.5">
          <span
            className="font-display font-black text-2xl tabular-nums leading-none"
            style={{ color: done ? 'hsl(142 71% 50%)' : 'hsl(42 12% 92%)' }}
          >
            {fmtMin(totalMin)}
          </span>
          <span className="text-sm font-bold tabular-nums neon-gold" style={{ color: 'hsl(var(--primary))' }}>
            {pct} %
          </span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 18% 14%)' }}>
          <div
            className={`h-full rounded-full transition-all duration-700 ${done ? '' : 'energy-bar'}`}
            style={{
              width: `${pct}%`,
              background: done
                ? 'linear-gradient(90deg, hsl(142 71% 40%), hsl(142 71% 55%))'
                : undefined,
              boxShadow: done
                ? '0 0 10px hsl(142 71% 45% / 0.5)'
                : '0 0 10px hsl(43 90% 50% / 0.5)',
            }}
          />
        </div>
      </div>

      {/* Day bars */}
      <div className="flex items-end gap-1 flex-1 min-h-[52px]">
        {days.map(d => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center" style={{ height: 48 }}>
              <div
                className="w-full rounded-sm transition-all duration-500"
                style={{
                  height: d.minutes > 0
                    ? `${Math.max(6, (d.minutes / maxDay) * 48)}px`
                    : '4px',
                  background: d.isToday
                    ? 'hsl(43 90% 55%)'
                    : d.minutes > 0
                    ? 'hsl(43 90% 50% / 0.45)'
                    : 'hsl(222 16% 18%)',
                  boxShadow: d.isToday && d.minutes > 0
                    ? '0 0 8px hsl(43 90% 50% / 0.65)'
                    : 'none',
                }}
              />
            </div>
            <span
              className={`text-[9px] font-semibold leading-none ${d.isToday ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational message */}
      <p className="text-[11px] text-center leading-snug">
        {done ? (
          <span className="font-semibold text-emerald-400">Objectif de la semaine atteint 🏆</span>
        ) : totalMin === 0 ? (
          <span className="text-muted-foreground">Lance une session pour démarrer la semaine 🔥</span>
        ) : (
          <span className="text-muted-foreground">
            Encore{' '}
            <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
              {fmtMin(remaining)}
            </span>{' '}
            pour atteindre l'objectif 💪
          </span>
        )}
      </p>
    </div>
  );
}
