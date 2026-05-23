import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';

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

  /** Moyenne simple par matière (identique à Pronote) */
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
      }))
      .sort((a, b) => b.avg - a.avg);
  }, [exams]);

  /** Moyenne générale simple (toutes matières, tous DS) */
  const globalAvg = useMemo(() => {
    const all = exams.filter(e => e.grade !== null).map(e => e.grade!);
    if (all.length === 0) return null;
    return Math.round((all.reduce((a, b) => a + b, 0) / all.length) * 10) / 10;
  }, [exams]);

  if (averages.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold">📊 Moyennes</h2>
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
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {a.count} DS
                </span>
                <span
                  className="font-display text-sm font-bold tabular-nums w-10 text-right"
                  style={{ color: gradeColor(a.avg) }}
                >
                  {a.avg}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1 rounded-full overflow-hidden ml-4" style={{ background: 'hsl(222 18% 15%)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${barPct}%`,
                    backgroundColor: `hsl(var(${cssVar}))`,
                    opacity: 0.75,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
