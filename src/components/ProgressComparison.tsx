import { useState, useEffect } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { calculateLevel } from '@/lib/game-utils';

interface Baseline {
  initial_total_xp: number;
  initial_streak: number;
  initial_total_hours: number;
  initial_grades: Record<string, number[]>;
  initial_quest_completion_rate: number;
  created_at: string;
}

interface ComparisonMetric {
  label: string;
  before: string;
  after: string;
  change: number; // percentage or absolute
  unit: string;
  positive: boolean; // is increase good?
}

export function ProgressComparison({ userId, totalXp, streak }: { userId: string; totalXp: number; streak: number }) {
  const [baseline, setBaseline] = useState<Baseline | null>(null);
  const [currentHours, setCurrentHours] = useState(0);
  const [currentGrades, setCurrentGrades] = useState<Record<string, number[]>>({});
  const [currentCompletion, setCurrentCompletion] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data: bl } = await supabase.from('student_baselines').select('*').eq('user_id', userId).single();
      if (!bl) return;
      setBaseline(bl as unknown as Baseline);

      const [profileRes, examsRes, questsRes] = await Promise.all([
        supabase.from('profiles').select('total_deepwork_seconds').eq('user_id', userId).single(),
        supabase.from('exams').select('subject, grade').eq('user_id', userId).not('grade', 'is', null),
        supabase.from('quests').select('completed').eq('assigned_to', userId),
      ]);

      setCurrentHours(Math.round((profileRes.data?.total_deepwork_seconds ?? 0) / 3600));

      const grades: Record<string, number[]> = {};
      (examsRes.data || []).forEach((e: any) => {
        if (!grades[e.subject]) grades[e.subject] = [];
        grades[e.subject].push(e.grade);
      });
      setCurrentGrades(grades);

      const quests = questsRes.data || [];
      const completed = quests.filter((q: any) => q.completed).length;
      setCurrentCompletion(quests.length > 0 ? Math.round((completed / quests.length) * 100) : 100);
    };
    load();
  }, [userId]);

  if (!baseline) return null;

  const daysSinceStart = Math.max(1, Math.floor((Date.now() - new Date(baseline.created_at).getTime()) / (1000 * 60 * 60 * 24)));

  // Compute overall grade averages
  const computeAvg = (grades: Record<string, number[]>) => {
    const all = Object.values(grades).flat();
    return all.length > 0 ? Math.round((all.reduce((a, b) => a + b, 0) / all.length) * 10) / 10 : null;
  };

  const initialAvg = computeAvg(baseline.initial_grades || {});
  const currentAvg = computeAvg(currentGrades);

  const metrics: ComparisonMetric[] = [
    {
      label: 'Niveau',
      before: `Niv. ${calculateLevel(baseline.initial_total_xp).level}`,
      after: `Niv. ${calculateLevel(totalXp).level}`,
      change: calculateLevel(totalXp).level - calculateLevel(baseline.initial_total_xp).level,
      unit: 'niveaux',
      positive: true,
    },
    {
      label: 'XP Total',
      before: baseline.initial_total_xp.toLocaleString(),
      after: totalXp.toLocaleString(),
      change: totalXp > 0 && baseline.initial_total_xp > 0 ? Math.round(((totalXp - baseline.initial_total_xp) / baseline.initial_total_xp) * 100) : totalXp > baseline.initial_total_xp ? 100 : 0,
      unit: '%',
      positive: true,
    },
    {
      label: 'Heures travaillées',
      before: `${baseline.initial_total_hours}h`,
      after: `${currentHours}h`,
      change: currentHours - baseline.initial_total_hours,
      unit: 'h',
      positive: true,
    },
    {
      label: 'Complétion quêtes',
      before: `${baseline.initial_quest_completion_rate}%`,
      after: `${currentCompletion}%`,
      change: currentCompletion - baseline.initial_quest_completion_rate,
      unit: 'pts',
      positive: true,
    },
  ];

  if (initialAvg !== null && currentAvg !== null) {
    metrics.push({
      label: 'Moyenne générale',
      before: `${initialAvg}/20`,
      after: `${currentAvg}/20`,
      change: Math.round((currentAvg - initialAvg) * 10) / 10,
      unit: 'pts',
      positive: true,
    });
  }

  const ChangeIcon = ({ change, positive }: { change: number; positive: boolean }) => {
    const isGood = positive ? change > 0 : change < 0;
    const isBad = positive ? change < 0 : change > 0;
    if (change === 0) return <Minus size={12} className="text-muted-foreground" />;
    if (isGood) return <ArrowUp size={12} style={{ color: 'hsl(var(--success))' }} />;
    if (isBad) return <ArrowDown size={12} style={{ color: 'hsl(var(--destructive))' }} />;
    return <Minus size={12} className="text-muted-foreground" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          Progression depuis l'entrée
        </h2>
        <span className="text-xs text-muted-foreground">{daysSinceStart} jours</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {metrics.map(m => (
          <div key={m.label} className="p-3 rounded-lg border border-border bg-secondary/20">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-xs text-muted-foreground line-through">{m.before}</span>
              <span className="text-sm font-semibold">{m.after}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <ChangeIcon change={m.change} positive={m.positive} />
              <span className="text-xs font-medium" style={{ color: (m.positive ? m.change > 0 : m.change < 0) ? 'hsl(var(--success))' : m.change === 0 ? 'hsl(var(--muted-foreground))' : 'hsl(var(--destructive))' }}>
                {m.change > 0 ? '+' : ''}{m.change}{m.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
