import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  userId: string;
  totalXp: number;
}

interface DayData {
  date: string;
  label: string;
  xp: number;
  cumulative: number;
}

export function XPProgressionChart({ userId, totalXp }: Props) {
  const [sessions, setSessions] = useState<{ created_at: string; xp_earned: number }[]>([]);
  const [quests, setQuests] = useState<{ completed_at: string | null; xp_reward: number }[]>([]);

  useEffect(() => {
    const since = new Date();
    since.setDate(since.getDate() - 21);
    const sinceStr = since.toISOString();

    Promise.all([
      supabase.from('timer_sessions').select('created_at, xp_earned').eq('user_id', userId).gte('created_at', sinceStr),
      supabase.from('quests').select('completed_at, xp_reward').eq('assigned_to', userId).eq('completed', true).gte('completed_at', sinceStr),
    ]).then(([sessRes, questRes]) => {
      if (sessRes.data) setSessions(sessRes.data);
      if (questRes.data) setQuests(questRes.data as { completed_at: string; xp_reward: number }[]);
    });
  }, [userId]);

  const chartData = useMemo(() => {
    const days: DayData[] = [];
    const now = new Date();
    const byDay: Record<string, number> = {};

    sessions.forEach(s => {
      const d = new Date(s.created_at).toISOString().slice(0, 10);
      byDay[d] = (byDay[d] || 0) + s.xp_earned;
    });
    quests.forEach(q => {
      if (q.completed_at) {
        const d = new Date(q.completed_at).toISOString().slice(0, 10);
        byDay[d] = (byDay[d] || 0) + q.xp_reward;
      }
    });

    // Estimate cumulative: totalXp - sum of last 21 days = baseline
    const totalLast21 = Object.values(byDay).reduce((a, b) => a + b, 0);
    let cumulative = totalXp - totalLast21;

    for (let i = 20; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const dayXp = byDay[key] || 0;
      cumulative += dayXp;
      days.push({
        date: key,
        label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        xp: dayXp,
        cumulative,
      });
    }
    return days;
  }, [sessions, quests, totalXp]);

  const weekXp = chartData.slice(-7).reduce((a, d) => a + d.xp, 0);
  const prevWeekXp = chartData.slice(-14, -7).reduce((a, d) => a + d.xp, 0);
  const trend = weekXp > prevWeekXp ? 'up' : weekXp < prevWeekXp ? 'down' : 'flat';

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          📈 Progression XP
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">7j:</span>
          <span className="text-sm font-semibold" style={{ color: 'hsl(var(--xp))' }}>+{weekXp} XP</span>
          {trend === 'up' && <TrendingUp size={14} style={{ color: 'hsl(var(--success))' }} />}
          {trend === 'down' && <TrendingDown size={14} style={{ color: 'hsl(var(--destructive))' }} />}
          {trend === 'flat' && <Minus size={14} className="text-muted-foreground" />}
        </div>
      </div>
      <div className="h-[160px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGradStudent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 64%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 64%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: 'hsl(215, 15%, 55%)' }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis hide domain={[(dataMin: number) => Math.max(0, dataMin - 10), (dataMax: number) => dataMax + 10]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(225, 28%, 14%)',
                  border: '1px solid hsl(225, 20%, 22%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(210, 20%, 90%)',
                }}
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} XP`,
                  name === 'cumulative' ? 'Total' : 'Jour',
                ]}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="hsl(217, 91%, 64%)"
                strokeWidth={2}
                fill="url(#xpGradStudent)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-8">Pas encore de données</p>
        )}
      </div>
      {trend === 'down' && (
        <p className="text-xs mt-2" style={{ color: 'hsl(var(--destructive))' }}>
          ⚠️ XP en baisse par rapport à la semaine précédente ({prevWeekXp} → {weekXp})
        </p>
      )}
    </div>
  );
}
