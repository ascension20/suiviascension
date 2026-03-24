import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, X, AlertCircle, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECTS, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StressLevel = 'stressed' | 'neutral' | 'calm';

interface Exam {
  id: string;
  subject: Subject;
  exam_date: string;
  chapters: string | null;
  stress_level: StressLevel;
  grade: number | null;
  photo_url: string | null;
  custom_subject: string | null;
}

const STRESS_LABELS: Record<StressLevel, { label: string; emoji: string }> = {
  stressed: { label: 'Stressé', emoji: '😰' },
  neutral: { label: 'Neutre', emoji: '😐' },
  calm: { label: 'Serein', emoji: '😊' },
};

export function ExamsSection({ userId }: { userId: string }) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState<Subject>('Maths');
  const [examDate, setExamDate] = useState('');
  const [chapters, setChapters] = useState('');
  const [stressLevel, setStressLevel] = useState<StressLevel>('neutral');
  const [customSubject, setCustomSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const loadExams = async () => {
    const { data } = await supabase
      .from('exams')
      .select('*')
      .eq('user_id', userId)
      .order('exam_date', { ascending: true });
    if (data) setExams(data as unknown as Exam[]);
  };

  useEffect(() => { loadExams(); }, [userId]);

  const handleAdd = async () => {
    if (!examDate) return;
    setLoading(true);
    await supabase.from('exams').insert({
      user_id: userId, subject, exam_date: examDate,
      chapters: chapters.trim() || null, stress_level: stressLevel,
      custom_subject: subject === 'Autre' && customSubject.trim() ? customSubject.trim() : null,
    });
    setExamDate(''); setChapters(''); setCustomSubject(''); setShowForm(false); setLoading(false);
    loadExams();
  };

  const handleGrade = async (id: string, grade: number) => {
    await supabase.from('exams').update({ grade }).eq('id', id);
    loadExams();
  };

  const handlePhotoUpload = async (examId: string, file: File) => {
    setUploadingFor(examId);
    const ext = file.name.split('.').pop();
    const path = `${userId}/${examId}.${ext}`;
    const { error } = await supabase.storage.from('exam-photos').upload(path, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from('exam-photos').getPublicUrl(path);
      await supabase.from('exams').update({ photo_url: urlData.publicUrl }).eq('id', examId);
      loadExams();
    }
    setUploadingFor(null);
  };

  const now = new Date();
  const upcoming = exams.filter(e => new Date(e.exam_date) >= now && e.grade === null);
  const past = exams.filter(e => new Date(e.exam_date) < now || e.grade !== null);

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
        <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={14} /> : <Plus size={14} />}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <div className="space-y-3 p-3 rounded-lg border border-border bg-secondary/30">
              <div className="grid grid-cols-2 gap-2">
                <Select value={subject} onValueChange={v => { setSubject(v as Subject); if (v !== 'Autre') setCustomSubject(''); }}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>{SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <Input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="h-9 text-sm" />
              </div>
              {subject === 'Autre' && (
                <Input placeholder="Précise la matière..." value={customSubject} onChange={e => setCustomSubject(e.target.value)} className="h-9 text-sm" />
              )}
              <Input placeholder="Chapitres (optionnel)..." value={chapters} onChange={e => setChapters(e.target.value)} className="h-9 text-sm" />
              <div className="flex gap-2">
                {(Object.entries(STRESS_LABELS) as [StressLevel, { label: string; emoji: string }][]).map(([key, val]) => (
                  <button key={key} onClick={() => setStressLevel(key)}
                    className={`flex-1 text-center py-2 rounded-lg border text-sm transition-colors ${stressLevel === key ? 'border-primary bg-primary/10' : 'border-border'}`}>
                    {val.emoji} {val.label}
                  </button>
                ))}
              </div>
              <Button size="sm" onClick={handleAdd} disabled={loading || !examDate} className="w-full">Ajouter</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {upcoming.length === 0 && past.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-3">Aucun DS déclaré 📝</p>
        ) : (
          <>
            {upcoming.map(exam => {
              const daysUntil = Math.ceil((new Date(exam.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysUntil <= 3;
              return (
                <div key={exam.id} className={`p-3 rounded-lg border transition-colors ${isUrgent ? 'border-destructive/50 bg-destructive/5' : 'border-border'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[exam.subject]}))` }} />
                    <span className="text-sm font-medium">{exam.custom_subject || exam.subject}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(exam.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                    {isUrgent && <AlertCircle size={14} className="text-destructive" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {daysUntil === 0 ? "Aujourd'hui !" : daysUntil === 1 ? 'Demain' : `Dans ${daysUntil}j`}
                    </span>
                    <span className="text-xs">{STRESS_LABELS[exam.stress_level].emoji}</span>
                    {exam.chapters && <span className="text-xs text-muted-foreground truncate">· {exam.chapters}</span>}
                  </div>
                </div>
              );
            })}
            {past.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  {past.length} DS passé{past.length > 1 ? 's' : ''}
                </summary>
                <div className="space-y-1 mt-2">
                  {past.map(exam => (
                    <div key={exam.id} className={`p-2 rounded border ${exam.grade === null ? 'border-streak/40 bg-streak/5' : 'border-border/50 opacity-60'}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[exam.subject]}))` }} />
                        <span className="text-xs">{exam.custom_subject || exam.subject}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(exam.exam_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                        </span>
                        {exam.grade !== null ? (
                          <span className="text-xs font-medium ml-auto">{exam.grade}/20</span>
                        ) : (
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'hsl(var(--streak) / 0.15)', color: 'hsl(var(--streak))' }}>
                              Note manquante
                            </span>
                            <Input
                              type="number" min={0} max={20} step={0.5} placeholder="/20"
                              className="h-6 w-14 text-xs"
                              onBlur={e => {
                                const v = parseFloat(e.target.value);
                                if (!isNaN(v) && v >= 0 && v <= 20) handleGrade(exam.id, v);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {/* Photo upload */}
                      <div className="flex items-center gap-2 mt-1.5">
                        {exam.photo_url ? (
                          <button onClick={() => setPreviewPhoto(exam.photo_url)} className="flex items-center gap-1 text-[10px] text-primary hover:underline">
                            <Image size={10} /> Voir le contrôle
                          </button>
                        ) : (
                          <label className={`flex items-center gap-1 text-[10px] cursor-pointer transition-colors ${uploadingFor === exam.id ? 'text-muted-foreground' : 'text-primary hover:underline'}`}>
                            <Camera size={10} />
                            {uploadingFor === exam.id ? 'Envoi...' : 'Ajouter photo'}
                            <input type="file" accept="image/*" className="hidden" disabled={uploadingFor === exam.id}
                              onChange={e => { if (e.target.files?.[0]) handlePhotoUpload(exam.id, e.target.files[0]); }} />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </>
        )}
      </div>

      {/* Photo preview modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4" onClick={() => setPreviewPhoto(null)}>
          <div className="max-w-2xl max-h-[80vh] overflow-auto rounded-lg border border-border" onClick={e => e.stopPropagation()}>
            <img src={previewPhoto} alt="Contrôle" className="w-full h-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
