import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface Props { userId: string; totalXp: number; }

export function XPProgressionChart({ userId, totalXp }: Props) {
  const [byDay, setByDay] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = async () => {
      const since = new Date();
      since.setDate(since.getDate() - 21);
      const sinceStr = since.toISOString();

      const [deepRes, questRes] = await Promise.all([
        supabase.from('deepwork_sessions').select('created_at, xp_earned').eq('user_id', userId).gte('created_at', sinceStr),
        supabase.from('quests').select('completed_at, xp_reward').eq('assigned_to', userId).eq('completed', true).gte('completed_at', sinceStr),
      ]);

      const map: Record<string, number> = {};
      deepRes.data?.forEach(s => {
        const d = s.created_at.slice(0, 10);
        map[d] = (map[d] || 0) + (s.xp_earned ?? 0);
      });
      questRes.data?.forEach(q => {
        if (q.completed_at) {
          const d = q.completed_at.slice(0, 10);
          map[d] = (map[d] || 0) + (q.xp_reward ?? 0);
        }
      });
      setByDay(map);
    };
    load();
  }, [userId]);

  const chartData = useMemo(() => {
    const totalLast21 = Object.values(byDay).reduce((a, b) => a + b, 0);
    let cumulative = Math.max(0, totalXp - totalLast21);
    const now = new Date();
    return Array.from({ length: 21 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (20 - i));
      const key = d.toISOString().slice(0, 10);
      const dayXp = byDay[key] || 0;
      cumulative += dayXp;
      return {
        label: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        xp: dayXp,
        cumulative,
      };
    });
  }, [byDay, totalXp]);

  const weekXp = chartData.slice(-7).reduce((a, d) => a + d.xp, 0);
  const prevWeekXp = chartData.slice(-14, -7).reduce((a, d) => a + d.xp, 0);
  const trend = weekXp > prevWeekXp ? 'up' : weekXp < prevWeekXp ? 'down' : 'flat';

  return (
    <div className="bg-card border border-border rounded-lg p-5 relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          📈 Progression XP
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">7j :</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: 'hsl(var(--xp))' }}>
            +{weekXp} XP
          </span>
          {trend === 'up' && <TrendingUp size={14} className="text-emerald-400" />}
          {trend === 'down' && <TrendingDown size={14} className="text-destructive" />}
          {trend === 'flat' && <Minus size={14} className="text-muted-foreground" />}
        </div>
      </div>

      <div className="h-[160px]">
        {chartData.some(d => d.cumulative > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217,91%,64%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(217,91%,64%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} tickLine={false} axisLine={false} interval={6} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215,15%,55%)' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: 'hsl(225,28%,14%)', border: '1px solid hsl(225,20%,22%)', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number, name: string) => [`${v.toLocaleString()} XP`, name === 'cumulative' ? 'Total cumulé' : 'Ce jour']}
              />
              <Area type="monotone" dataKey="cumulative" stroke="hsl(217,91%,64%)" strokeWidth={2} fill="url(#xpGrad)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Commence à travailler pour voir ta progression 🚀
          </div>
        )}
      </div>

      {trend === 'down' && weekXp > 0 && (
        <p className="text-xs mt-2 text-destructive">
          ⚠️ XP en baisse vs semaine précédente ({prevWeekXp} → {weekXp})
        </p>
      )}
    </div>
  );
}
