import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Check, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';

interface WeeklyPlan {
  id: string;
  plan_content: string;
  week_start: string;
  validated: boolean;
  created_at: string;
}

export function WeeklyPlanView({ userId }: { userId: string }) {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('weekly_plans')
        .select('*')
        .eq('user_id', userId)
        .eq('validated', true)
        .order('created_at', { ascending: false })
        .limit(1);
      if (data?.[0]) setPlan(data[0] as unknown as WeeklyPlan);
    };
    load();

    const channel = supabase.channel('student-plans')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'weekly_plans', filter: `user_id=eq.${userId}` }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  if (!plan) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          Plan de la semaine
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
            <Sparkles size={10} /> Généré par IA
          </span>
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary hover:underline">
            {expanded ? 'Réduire' : 'Voir tout'}
          </button>
        </div>
      </div>
      <div className={`prose prose-sm prose-invert max-w-none text-sm ${!expanded ? 'max-h-[200px] overflow-hidden relative' : ''}`}>
        <ReactMarkdown>{plan.plan_content}</ReactMarkdown>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>
    </div>
  );
}
