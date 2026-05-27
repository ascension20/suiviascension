import { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, MessageCircle, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { Input } from '@/components/ui/input';

type StressLevel = 'stressed' | 'neutral' | 'calm';

interface Exam {
  id: string;
  subject: Subject;
  exam_date: string;
  chapters: string | null;
  stress_level: StressLevel;
  grade: number | null;
  coefficient: number | null;
  photo_url: string | null;
  custom_subject: string | null;
}

const STRESS_LABELS: Record<StressLevel, { label: string; emoji: string }> = {
  stressed: { label: 'Stressé', emoji: '😰' },
  neutral:  { label: 'Neutre',  emoji: '😐' },
  calm:     { label: 'Serein',  emoji: '😊' },
};

const COEFFS = [0.5, 1, 2, 3, 4, 5, 6, 8];

function CoeffPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="text-[9px] text-muted-foreground mr-0.5">Coeff</span>
      {COEFFS.map(c => (
        <button
          key={c}
          type="button"
          onMouseDown={e => { e.preventDefault(); onChange(c); }}
          className="text-[10px] px-1.5 py-0.5 rounded font-bold transition-all border"
          style={{
            borderColor: value === c ? 'hsl(var(--primary))' : 'hsl(222 16% 22%)',
            backgroundColor: value === c ? 'hsl(var(--primary))' : 'transparent',
            color: value === c ? 'hsl(222 22% 8%)' : 'hsl(220 10% 55%)',
          }}
        >
          ×{c}
        </button>
      ))}
    </div>
  );
}

export function ExamsSection({ userId }: { userId: string }) {
  const [exams, setExams]           = useState<Exam[]>([]);

  // Grade editing / entry state
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [editingVal, setEditingVal] = useState('');
  const [editingCoeff, setEditingCoeff] = useState(1);

  const loadExams = async () => {
    const { data } = await supabase
      .from('exams')
      .select('*')
      .eq('user_id', userId)
      .order('exam_date', { ascending: true });
    if (data) setExams(data as unknown as Exam[]);
  };

  useEffect(() => {
    loadExams();
    // Realtime: refresh whenever any exam row changes for this user
    const channel = supabase
      .channel(`exams-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exams', filter: `user_id=eq.${userId}` }, loadExams)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const saveGrade = async (id: string) => {
    const v = parseFloat(editingVal);
    if (!isNaN(v) && v >= 0 && v <= 20) {
      await supabase.from('exams').update({ grade: v, coefficient: editingCoeff } as any).eq('id', id);
    }
    setEditingId(null);
    loadExams();
  };

  const startEdit = (exam: Exam) => {
    setEditingId(exam.id);
    setEditingVal(exam.grade !== null ? String(exam.grade) : '');
    setEditingCoeff(exam.coefficient ?? 1);
  };

  const now = new Date();
  const upcoming = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null);
  const past     = exams.filter(e => new Date(e.exam_date) < now  || e.grade !== null);

  const subjectColor = (s: string) =>
    `hsl(var(${SUBJECT_CSS_VAR[s as Subject] ?? '--subject-autre'}))`;

  const gradeColor = (g: number) =>
    g >= 14 ? 'hsl(var(--success))' : g >= 10 ? 'hsl(var(--xp))' : 'hsl(var(--destructive))';

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <BookOpen size={16} className="text-primary" />
          Mes DS
          {upcoming.length > 0 && (
            <span className="text-xs bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{upcoming.length}</span>
          )}
        </h2>
        <span className="text-[10px] text-muted-foreground">Synchronisé avec le planning</span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {upcoming.length === 0 && past.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-3">Aucun DS déclaré 📝</p>
        ) : (
          <>
            {/* ── Upcoming ── */}
            {upcoming.map(exam => {
              const daysUntil = Math.ceil((new Date(exam.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysUntil <= 3;
              return (
                <div
                  key={exam.id}
                  className={`p-3 rounded-lg border transition-colors ${isUrgent ? 'border-destructive/50 bg-destructive/5' : 'border-border'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: subjectColor(exam.subject) }} />
                    <span className="text-sm font-medium">{exam.custom_subject || exam.subject}</span>
                    {(exam.coefficient ?? 1) !== 1 && (
                      <span className="text-[9px] font-bold px-1 rounded"
                            style={{ color: 'hsl(var(--primary))', background: 'hsl(var(--primary) / 0.12)' }}>
                        ×{exam.coefficient}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(exam.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                    {isUrgent && <AlertCircle size={14} className="text-destructive" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {daysUntil === 0 ? "Aujourd'hui !" : daysUntil === 1 ? 'Demain' : `Dans ${daysUntil}j`}
                    </span>
                    <span className="text-xs">{STRESS_LABELS[exam.stress_level]?.emoji ?? '😐'}</span>
                    {exam.chapters && <span className="text-xs text-muted-foreground truncate">· {exam.chapters}</span>}
                  </div>
                </div>
              );
            })}

            {/* ── Past ── */}
            {past.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors flex items-center gap-1.5 list-none [&::-webkit-details-marker]:hidden">
                  <span>{past.length} DS passé{past.length > 1 ? 's' : ''}</span>
                  {(() => {
                    const missing = past.filter(e => e.grade === null).length;
                    return missing > 0 ? (
                      <span
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full font-bold text-white"
                        style={{ fontSize: '9px', backgroundColor: 'hsl(0 84% 52%)' }}
                      >
                        <AlertCircle size={8} />
                        {missing} note{missing > 1 ? 's' : ''} manquante{missing > 1 ? 's' : ''}
                      </span>
                    ) : null;
                  })()}
                </summary>
                <div className="space-y-1.5 mt-2">
                  {past.map(exam => (
                    <div
                      key={exam.id}
                      className={`p-2 rounded border ${exam.grade === null ? 'border-streak/40 bg-streak/5' : 'border-border/50'}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: subjectColor(exam.subject) }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium truncate">{exam.custom_subject || exam.subject}</span>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(exam.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                        </div>

                        {/* Grade zone */}
                        {editingId === exam.id ? (
                          /* ── édition active ── */
                          <div className="flex flex-col gap-1.5 items-end">
                            <div className="flex items-center gap-1">
                              <Input
                                type="number" min={0} max={20} step={0.5}
                                value={editingVal}
                                onChange={e => setEditingVal(e.target.value)}
                                className="h-6 w-16 text-xs"
                                autoFocus
                                onKeyDown={e => {
                                  if (e.key === 'Enter') saveGrade(exam.id);
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                              />
                              <span className="text-[10px] text-muted-foreground">/20</span>
                              <button
                                onMouseDown={e => { e.preventDefault(); saveGrade(exam.id); }}
                                className="text-emerald-400 hover:text-emerald-300 transition-colors"
                              >
                                <Check size={13} />
                              </button>
                            </div>
                            <CoeffPicker value={editingCoeff} onChange={setEditingCoeff} />
                          </div>
                        ) : exam.grade !== null ? (
                          /* ── note saisie (clic pour modifier) ── */
                          <button
                            onClick={() => startEdit(exam)}
                            className="flex items-center gap-1 group/grade"
                            title="Modifier"
                          >
                            {(exam.coefficient ?? 1) !== 1 && (
                              <span className="text-[9px] font-bold px-1 rounded"
                                    style={{ color: 'hsl(var(--primary))', background: 'hsl(var(--primary) / 0.12)' }}>
                                ×{exam.coefficient}
                              </span>
                            )}
                            <span className="text-xs font-bold tabular-nums" style={{ color: gradeColor(exam.grade) }}>
                              {exam.grade}/20
                            </span>
                            <span className="text-[9px] text-muted-foreground opacity-0 group-hover/grade:opacity-100 transition-opacity">✏</span>
                          </button>
                        ) : (
                          /* ── note manquante → clic pour saisir ── */
                          <button
                            onClick={() => startEdit(exam)}
                            className="flex items-center gap-1 ml-auto"
                          >
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: 'hsl(var(--streak) / 0.15)', color: 'hsl(var(--streak))' }}
                            >
                              Saisir la note
                            </span>
                          </button>
                        )}
                      </div>

                      {exam.grade === null && editingId !== exam.id && (
                        <div className="mt-1.5 ml-3.5">
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <MessageCircle size={10} />
                            Pense à m'envoyer ta note sur WhatsApp 📱
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </>
        )}
      </div>
    </div>
  );
}
