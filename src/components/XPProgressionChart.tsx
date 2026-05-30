import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface Props { userId: string; totalXp: number; }
interface Day { label: string; xp: number; isToday: boolean; }

export function XPProgressionChart({ userId, totalXp }: Props) {
  const [data, setData] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const since = new Date();
      since.setDate(since.getDate() - 20);
      since.setHours(0, 0, 0, 0);

      const { data: sessions } = await supabase
        .from('deepwork_sessions')
        .select('started_at, xp_earned')
        .eq('user_id', userId)
        .gte('started_at', since.toISOString());

      // Build day buckets
      const byDay: Record<string, number> = {};
      for (let i = 0; i <= 20; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (20 - i));
        byDay[d.toISOString().slice(0, 10)] = 0;
      }

      sessions?.forEach(s => {
        const key = (s.started_at ?? '').slice(0, 10);
        if (key in byDay) byDay[key] += s.xp_earned ?? 0;
      });

      const todayKey = new Date().toISOString().slice(0, 10);
      const days = Object.entries(byDay).map(([date, xp]) => ({
        label: new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
        xp,
        isToday: date === todayKey,
      }));
      setData(days);
      setLoading(false);
    };
    load();
  }, [userId]);

  const weekXp = data.slice(-7).reduce((a, d) => a + d.xp, 0);
  const prevWeekXp = data.slice(-14, -7).reduce((a, d) => a + d.xp, 0);
  const trend = weekXp > prevWeekXp ? 'up' : weekXp < prevWeekXp ? 'down' : 'flat';
  const hasData = data.some(d => d.xp > 0);

  return (
    <div className="bg-card border border-border rounded-lg p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <BarChart3 size={15} style={{ color: 'hsl(43 90% 52%)' }} /> Progression XP
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">7j :</span>
          <span className="text-sm font-bold tabular-nums text-amber-400">+{weekXp} XP</span>
          {trend === 'up'   && <TrendingUp  size={14} className="text-emerald-400" />}
          {trend === 'down' && <TrendingDown size={14} className="text-destructive" />}
          {trend === 'flat' && <Minus size={14} className="text-muted-foreground" />}
        </div>
      </div>

      <div className="h-[150px]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-xs text-muted-foreground">Chargement…</div>
        ) : !hasData ? (
          <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
            Lance ta première session deepwork pour voir ta progression
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={10}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: 'hsl(215,15%,50%)' }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 9, fill: 'hsl(215,15%,50%)' }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{
                  background: 'hsl(225,28%,14%)',
                  border: '1px solid hsl(225,20%,24%)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v} XP`, 'Deepwork']}
              />
              <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.isToday ? 'hsl(38,92%,55%)' : d.xp > 0 ? 'hsl(262,80%,60%)' : 'hsl(225,20%,24%)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground mt-1 text-right">XP total : {totalXp.toLocaleString('fr-FR')}</p>
    </div>
  );
}
