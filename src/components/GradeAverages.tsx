import { useState, useEffect, useMemo } from 'react';
import { BarChart2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';

interface ExamRow {
  subject: string;
  grade: number | null;
  coefficient: number | null;
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
      .select('subject, grade, coefficient')
      .eq('user_id', userId)
      .then(({ data }) => { if (data) setExams(data as ExamRow[]); });
  }, [userId]);

  /** Moyenne pondérée par DS (coefficient choisi par l'élève) par matière */
  const averages = useMemo(() => {
    const bySubject: Record<string, { sum: number; totalCoeff: number; count: number }> = {};
    exams.forEach(e => {
      if (e.grade !== null) {
        const coeff = e.coefficient ?? 1;
        if (!bySubject[e.subject]) bySubject[e.subject] = { sum: 0, totalCoeff: 0, count: 0 };
        bySubject[e.subject].sum       += e.grade * coeff;
        bySubject[e.subject].totalCoeff += coeff;
        bySubject[e.subject].count     += 1;
      }
    });
    return Object.entries(bySubject)
      .map(([subject, { sum, totalCoeff, count }]) => ({
        subject,
        avg: Math.round((sum / totalCoeff) * 10) / 10,
        count,
      }))
      .sort((a, b) => b.avg - a.avg);
  }, [exams]);

  /** Moyenne générale pondérée (tous DS confondus) */
  const globalAvg = useMemo(() => {
    let sum = 0, totalCoeff = 0;
    exams.forEach(e => {
      if (e.grade !== null) {
        const c = e.coefficient ?? 1;
        sum        += e.grade * c;
        totalCoeff += c;
      }
    });
    return totalCoeff > 0 ? Math.round((sum / totalCoeff) * 10) / 10 : null;
  }, [exams]);

  if (averages.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <BarChart2 size={15} style={{ color: 'hsl(43 90% 52%)' }} /> Moyennes
        </h2>
        {globalAvg !== null && (
          <div className="text-right">
            <span
              className="font-display text-xl font-black tabular-nums"
              style={{ color: gradeColor(globalAvg) }}
            >
              {globalAvg}/20
            </span>
            <p className="text-[10px] text-muted-foreground mt-0.5">moyenne générale</p>
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
        {averages.map(a => {
          const cssVar = SUBJECT_CSS_VAR[a.subject as Subject] ?? '--subject-autre';
          const barPct = Math.round((a.avg / 20) * 100);
          return (
            <div key={a.subject} className="space-y-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(${cssVar}))` }}
                />
                <span className="text-xs flex-1 truncate">{a.subject}</span>
                <span className="text-[10px] text-muted-foreground tabular-nums">{a.count} DS</span>
                <span
                  className="font-display text-sm font-bold tabular-nums w-10 text-right"
                  style={{ color: gradeColor(a.avg) }}
                >
                  {a.avg}
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden ml-4" style={{ background: 'hsl(222 18% 15%)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${barPct}%`, backgroundColor: `hsl(var(${cssVar}))`, opacity: 0.75 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
