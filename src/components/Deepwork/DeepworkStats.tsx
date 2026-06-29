import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  userId: string;
}

export function DeepworkStats({ userId }: Props) {
  const [totalSec, setTotalSec] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [series, setSeries] = useState<{ date: string; xp: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: prof } = await supabase.from('profiles').select('total_deepwork_seconds, total_deepwork_sessions').eq('user_id', userId).single();
      if (prof) {
        setTotalSec(prof.total_deepwork_seconds ?? 0);
        setSessionCount(prof.total_deepwork_sessions ?? 0);
      }
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data: sessions } = await supabase
        .from('deepwork_sessions')
        .select('started_at, xp_earned')
        .eq('user_id', userId)
        .gte('started_at', since.toISOString());

      const toLocalKey = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const byDate: Record<string, number> = {};
      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        byDate[toLocalKey(d)] = 0;
      }
      sessions?.forEach(s => {
        const k = toLocalKey(new Date(s.started_at));
        if (byDate[k] !== undefined) byDate[k] += s.xp_earned;
      });
      setSeries(Object.entries(byDate).map(([date, xp]) => ({ date: date.slice(5), xp })));
    };
    load();
  }, [userId]);

  const hours = (totalSec / 3600).toFixed(1).replace('.', ',');

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain size={16} className="text-violet-400" />
        <h3 className="font-display font-semibold">Deepwork</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-xs text-muted-foreground">Cumulé</p>
          <p className="font-display text-2xl font-bold text-violet-300">{hours} h</p>
        </div>
        <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-xs text-muted-foreground">Sessions</p>
          <p className="font-display text-2xl font-bold text-violet-300">{sessionCount}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-2">XP des 30 derniers jours (deepwork)</p>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', fontSize: 12 }} />
            <Line type="monotone" dataKey="xp" stroke="hsl(262 80% 60%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
