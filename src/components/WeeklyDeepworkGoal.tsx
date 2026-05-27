import { useEffect, useRef, useState } from 'react';
import { Target, Zap, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getWeekStart, getWeekDays, formatDateISO } from '@/lib/planning-utils';

// ── Tier config ───────────────────────────────────────────────────────────────

const TIERS = [
  { minutes: 300, label: '5 h', xp: 20 },  // 5 h
  { minutes: 420, label: '7 h', xp: 35 },  // 7 h
  { minutes: 540, label: '9 h', xp: 50 },  // 9 h
] as const;

const MAX_MIN = TIERS[TIERS.length - 1].minutes; // 540

const SHORT_DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// ── Helpers ───────────────────────────────────────────────────────────────────

interface DayData { label: string; minutes: number; isToday: boolean; }

function fmtMin(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h === 0) return `${min} min`;
  if (min === 0) return `${h} h`;
  return `${h} h ${String(min).padStart(2, '0')}`;
}

function weekKey(): string {
  return formatDateISO(getWeekStart(new Date()));
}

const LS_PREFIX = 'ascension_wgoal_';

function loadClaimed(): number[] {
  try { return JSON.parse(localStorage.getItem(LS_PREFIX + weekKey()) ?? '[]'); }
  catch { return []; }
}

function saveClaimed(c: number[]) {
  try { localStorage.setItem(LS_PREFIX + weekKey(), JSON.stringify(c)); }
  catch {}
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  userId: string;
  onXpGain?: (amount: number, source?: string) => void;
}

export function WeeklyDeepworkGoal({ userId, onXpGain }: Props) {
  const [days, setDays]       = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState<number[]>(loadClaimed);
  const hasChecked = useRef(false);

  useEffect(() => {
    const load = async () => {
      const ws      = getWeekStart(new Date());
      const wd      = getWeekDays(ws);
      const weekEnd = new Date(wd[6]);
      weekEnd.setHours(23, 59, 59, 999);

      const { data: sessions } = await supabase
        .from('deepwork_sessions')
        .select('started_at, duration_seconds')
        .eq('user_id', userId)
        .gte('started_at', ws.toISOString())
        .lte('started_at', weekEnd.toISOString());

      const byDay: Record<string, number> = {};
      wd.forEach(d => { byDay[formatDateISO(d)] = 0; });
      sessions?.forEach(s => {
        const key = (s.started_at ?? '').slice(0, 10);
        if (byDay[key] !== undefined) byDay[key] += Math.floor((s.duration_seconds ?? 0) / 60);
      });

      const todayIso = formatDateISO(new Date());
      setDays(wd.map((d, i) => ({
        label:   SHORT_DAYS[i],
        minutes: byDay[formatDateISO(d)] ?? 0,
        isToday: formatDateISO(d) === todayIso,
      })));
      setLoading(false);
    };
    load();
  }, [userId]);

  const totalMin = days.reduce((s, d) => s + d.minutes, 0);
  const pct      = Math.min(100, (totalMin / MAX_MIN) * 100);
  const maxDay   = Math.max(...days.map(d => d.minutes), 1);

  // Grant XP for newly unlocked tiers (once per week per tier)
  useEffect(() => {
    if (loading || hasChecked.current) return;
    hasChecked.current = true;
    if (!onXpGain) return;

    const current   = loadClaimed();
    const toGrant   = TIERS
      .map((tier, i) => ({ tier, i }))
      .filter(({ tier, i }) => totalMin >= tier.minutes && !current.includes(i));

    if (toGrant.length === 0) return;

    const updated = [...current, ...toGrant.map(x => x.i)];
    saveClaimed(updated);
    setClaimed(updated);
    toGrant.forEach(({ tier }) => onXpGain(tier.xp, 'weekly_goal'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading) {
    return <div className="bg-card border border-border rounded-lg p-4 min-h-[200px] animate-pulse" />;
  }

  const allDone  = totalMin >= MAX_MIN;
  const nextTier = TIERS.find(t => totalMin < t.minutes);

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3 h-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold flex items-center gap-1.5">
          <Target size={14} className="text-primary" />
          Objectif semaine
        </h3>
        <span
          className="font-display font-black text-base tabular-nums"
          style={{ color: allDone ? 'hsl(142 71% 50%)' : 'hsl(42 12% 92%)' }}
        >
          {fmtMin(totalMin)}
        </span>
      </div>

      {/* ── Tiered progress bar ────────────────────────────────────────── */}
      {/* Extra bottom padding so the tier labels (absolutely positioned) don't clip */}
      <div className="relative" style={{ paddingBottom: 42 }}>

        {/* Track */}
        <div className="h-3 rounded-full relative overflow-visible" style={{ background: 'hsl(222 18% 13%)' }}>

          {/* Fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: allDone
                ? 'linear-gradient(90deg, hsl(43 90% 45%), hsl(142 71% 45%))'
                : 'linear-gradient(90deg, hsl(43 90% 45%), hsl(43 90% 60%))',
              boxShadow: `0 0 8px hsl(43 90% 50% / 0.45)`,
            }}
          />

          {/* Tier diamond markers on the bar */}
          {TIERS.map((tier, i) => {
            const pos     = (tier.minutes / MAX_MIN) * 100;
            const reached = totalMin >= tier.minutes;
            const isClaimed = claimed.includes(i);
            return (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${pos}%`, zIndex: 2 }}
              >
                {/* Diamond */}
                <div
                  className="w-4 h-4 rounded-sm transition-all duration-500"
                  style={{
                    transform: 'rotate(45deg)',
                    background: reached
                      ? isClaimed ? 'hsl(142 71% 35%)' : 'hsl(43 90% 40%)'
                      : 'hsl(222 16% 18%)',
                    border: `2px solid ${reached
                      ? isClaimed ? 'hsl(142 71% 55%)' : 'hsl(43 90% 60%)'
                      : 'hsl(222 16% 28%)'}`,
                    boxShadow: reached
                      ? `0 0 8px ${isClaimed ? 'hsl(142 71% 45% / 0.7)' : 'hsl(43 90% 50% / 0.7)'}`
                      : 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Tier labels absolutely below bar */}
        {TIERS.map((tier, i) => {
          const pos       = (tier.minutes / MAX_MIN) * 100;
          const reached   = totalMin >= tier.minutes;
          const isClaimed = claimed.includes(i);
          const gold      = 'hsl(43 90% 60%)';
          const green     = 'hsl(142 71% 55%)';
          const dim       = 'hsl(220 10% 35%)';
          const col       = reached ? (isClaimed ? green : gold) : dim;

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${pos}%`, top: 22, transform: 'translateX(-50%)' }}
            >
              <span className="text-[9px] font-bold tabular-nums leading-none" style={{ color: col }}>
                {tier.label}
              </span>
              <div
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
                style={{
                  background: reached
                    ? isClaimed ? 'hsl(142 71% 20% / 0.35)' : 'hsl(43 90% 50% / 0.12)'
                    : 'hsl(222 16% 13%)',
                  border: `1px solid ${reached
                    ? isClaimed ? 'hsl(142 71% 35% / 0.5)' : 'hsl(43 90% 50% / 0.3)'
                    : 'hsl(222 16% 22%)'}`,
                }}
              >
                {reached
                  ? <Zap size={8} style={{ color: col }} />
                  : <Lock size={7} style={{ color: dim }} />
                }
                <span className="text-[8px] font-bold leading-none tabular-nums" style={{ color: col }}>
                  +{tier.xp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Day bars */}
      <div className="flex items-end gap-1 flex-1 min-h-[48px]">
        {days.map(d => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center" style={{ height: 44 }}>
              <div
                className="w-full rounded-sm transition-all duration-500"
                style={{
                  height: d.minutes > 0
                    ? `${Math.max(5, (d.minutes / maxDay) * 44)}px`
                    : '4px',
                  background: d.isToday
                    ? 'hsl(43 90% 55%)'
                    : d.minutes > 0
                    ? 'hsl(43 90% 50% / 0.4)'
                    : 'hsl(222 16% 18%)',
                  boxShadow: d.isToday && d.minutes > 0
                    ? '0 0 8px hsl(43 90% 50% / 0.6)'
                    : 'none',
                }}
              />
            </div>
            <span className={`text-[9px] font-semibold leading-none ${d.isToday ? 'text-primary' : 'text-muted-foreground'}`}>
              {d.label}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational message */}
      <p className="text-[11px] text-center leading-snug">
        {allDone ? (
          <span className="font-semibold text-emerald-400">Tous les objectifs atteints 🏆</span>
        ) : nextTier ? (
          <span className="text-muted-foreground">
            Encore{' '}
            <span className="font-semibold" style={{ color: 'hsl(var(--primary))' }}>
              {fmtMin(nextTier.minutes - totalMin)}
            </span>{' '}
            pour +{nextTier.xp} XP 💪
          </span>
        ) : (
          <span className="text-muted-foreground">Lance une session pour démarrer 🔥</span>
        )}
      </p>
    </div>
  );
}
