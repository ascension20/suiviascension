import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECTS, SUBJECT_CSS_VAR } from '@/lib/game-utils';

interface Exam {
  subject: string;
  grade: number | null;
}

export function GradeAverages({ userId }: { userId: string }) {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    supabase.from('exams').select('subject, grade').eq('user_id', userId).then(({ data }) => {
      if (data) setExams(data);
    });
  }, [userId]);

  const averages = useMemo(() => {
    const bySubject: Record<string, number[]> = {};
    exams.forEach(e => {
      if (e.grade !== null) {
        if (!bySubject[e.subject]) bySubject[e.subject] = [];
        bySubject[e.subject].push(e.grade);
      }
    });
    return Object.entries(bySubject).map(([subject, grades]) => ({
      subject,
      avg: Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10,
      count: grades.length,
    })).sort((a, b) => b.avg - a.avg);
  }, [exams]);

  const globalAvg = useMemo(() => {
    const allGrades = exams.filter(e => e.grade !== null).map(e => e.grade!);
    if (allGrades.length === 0) return null;
    return Math.round((allGrades.reduce((a, b) => a + b, 0) / allGrades.length) * 10) / 10;
  }, [exams]);

  if (averages.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-base font-semibold">📊 Moyennes</h2>
        {globalAvg !== null && (
          <span className="font-display text-lg font-bold" style={{
            color: globalAvg >= 14 ? 'hsl(var(--success))' : globalAvg >= 10 ? 'hsl(var(--xp))' : 'hsl(var(--destructive))',
          }}>
            {globalAvg}/20
          </span>
        )}
      </div>
      <div className="space-y-2">
        {averages.map(a => (
          <div key={a.subject} className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[a.subject as Subject] || '--muted'}))` }}
            />
            <span className="text-sm flex-1">{a.subject}</span>
            <span className="text-xs text-muted-foreground">{a.count} DS</span>
            <span className="font-display text-sm font-semibold tabular-nums" style={{
              color: a.avg >= 14 ? 'hsl(var(--success))' : a.avg >= 10 ? 'hsl(var(--xp))' : 'hsl(var(--destructive))',
            }}>
              {a.avg}/20
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
