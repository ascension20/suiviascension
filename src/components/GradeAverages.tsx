import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECT_CSS_VAR, BAC_COEFFICIENTS } from '@/lib/game-utils';

interface ExamRow {
  subject: string;
  grade: number | null;
}

function gradeColor(avg: number) {
  if (avg >= 14) return 'hsl(var(--success))';
  if (avg >= 10) return 'hsl(var(--xp))';
  return 'hsl(var(--destructive))';
}

export function GradeAverages({ userId }: { userId: string }) {
  const [exams, setExams] = useState<ExamRow[]>([]);

  useEffect(() => {
    supabase
      .from('exams')
      .select('subject, grade')
      .eq('user_id', userId)
      .then(({ data }) => { if (data) setExams(data); });
  }, [userId]);

  /** Moyenne simple par matière (sur les DS notés) */
  const averages = useMemo(() => {
    const bySubject: Record<string, number[]> = {};
    exams.forEach(e => {
      if (e.grade !== null) {
        if (!bySubject[e.subject]) bySubject[e.subject] = [];
        bySubject[e.subject].push(e.grade);
      }
    });
    return Object.entries(bySubject)
      .map(([subject, grades]) => ({
        subject,
        avg: Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 10) / 10,
        count: grades.length,
        coeff: BAC_COEFFICIENTS[subject as Subject] ?? 1,
      }))
      .sort((a, b) => b.coeff - a.coeff || b.avg - a.avg);
  }, [exams]);

  /** Moyenne pondérée par les coefficients officiels bac */
  const weightedAvg = useMemo(() => {
    let sum = 0, totalCoeff = 0;
    averages.forEach(a => {
      sum += a.avg * a.coeff;
      totalCoeff += a.coeff;
    });
    return totalCoeff > 0 ? Math.round((sum / totalCoeff) * 10) / 10 : null;
  }, [averages]);

  if (averages.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold">📊 Moyennes</h2>
        {weightedAvg !== null && (
          <div className="text-right">
            <span
              className="font-display text-lg font-bold tabular-nums"
              style={{ color: gradeColor(weightedAvg) }}
            >
              {weightedAvg}/20
            </span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">moyenne pondérée bac</p>
          </div>
        )}
      </div>

      {/* Subjects list */}
      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
        {averages.map(a => {
          const cssVar = SUBJECT_CSS_VAR[a.subject as Subject] ?? '--subject-autre';
          const barWidth = Math.round((a.avg / 20) * 100);
          return (
            <div key={a.subject} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(${cssVar}))` }}
                />
                <span className="text-xs flex-1 truncate">{a.subject}</span>
                {/* Coefficient badge */}
                <span
                  className="text-[9px] font-bold px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: `hsl(var(${cssVar}) / 0.15)`,
                    color: `hsl(var(${cssVar}))`,
                  }}
                >
                  ×{a.coeff}
                </span>
                <span className="text-[10px] text-muted-foreground w-8 text-right tabular-nums">
                  {a.count} DS
                </span>
                <span
                  className="font-display text-sm font-bold tabular-nums w-10 text-right"
                  style={{ color: gradeColor(a.avg) }}
                >
                  {a.avg}
                </span>
              </div>
              {/* Mini progress bar */}
              <div className="h-1 rounded-full bg-secondary/60 ml-4 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: `hsl(var(${cssVar}))`,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 text-right">
        Coefficients officiels Bac général 2021
      </p>
    </div>
  );
}
