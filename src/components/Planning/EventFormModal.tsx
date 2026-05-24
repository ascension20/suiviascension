import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import type { PlanningEvent, EventType } from '@/lib/planning-utils';
import { SUBJECTS } from '@/lib/game-utils';
import { Trash2 } from 'lucide-react';

/** Maps full subject names to the DB's subject_type enum + custom_subject display override. */
function toExamSubject(s: string): { subject: string; custom_subject: string | null } {
  if (s === 'Français')          return { subject: 'Français',  custom_subject: null };
  if (s === 'SES')               return { subject: 'SES',       custom_subject: null };
  if (s === 'Autre')             return { subject: 'Autre',     custom_subject: null };
  if (s === 'Mathématiques')     return { subject: 'Maths',     custom_subject: 'Mathématiques' };
  if (s === 'Physique-Chimie')   return { subject: 'Physique',  custom_subject: 'Physique-Chimie' };
  if (s === 'LV1 (Anglais)')     return { subject: 'Anglais',   custom_subject: 'LV1 (Anglais)' };
  return { subject: 'Autre', custom_subject: s };
}

interface Props {
  userId: string;
  event?: PlanningEvent;
  onClose: () => void;
  onSaved: () => void;
}

export function EventFormModal({ userId, event, onClose, onSaved }: Props) {
  const [type, setType] = useState<EventType>(event?.type ?? 'quest');
  const [title, setTitle] = useState(event?.title ?? '');
  const [subject, setSubject] = useState<string>(event?.subject ?? 'Mathématiques');
  const [date, setDate] = useState(event?.event_date ?? new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(event?.start_time?.slice(0, 5) ?? '14:00');
  const [endTime, setEndTime] = useState(event?.end_time?.slice(0, 5) ?? '15:00');
  const [description, setDescription] = useState(event?.description ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const payload = {
      user_id: userId,
      type, title: title.trim(), subject,
      event_date: date, start_time: startTime, end_time: endTime,
      description: description.trim() || null,
    };
    if (event) {
      await supabase.from('planning_events').update(payload).eq('id', event.id);
    } else {
      await supabase.from('planning_events').insert(payload);
      // When adding a NEW DS in planning, auto-create it in Mes DS (exams)
      if (type === 'ds') {
        const { subject: examEnum, custom_subject: examCustom } = toExamSubject(subject);
        await supabase.from('exams').insert({
          user_id: userId,
          subject: examEnum as any,
          custom_subject: examCustom,
          exam_date: date,
          chapters: title.trim() || null,
          stress_level: 'neutral',
        });
      }
    }
    setSaving(false);
    onSaved();
  };

  const remove = async () => {
    if (!event) return;
    if (!confirm('Supprimer cet événement ?')) return;
    await supabase.from('planning_events').delete().eq('id', event.id);
    // Sync: delete the matching exam entry when a DS is removed
    if (event.type === 'ds') {
      const { subject: examEnum } = toExamSubject(event.subject ?? 'Autre');
      await supabase.from('exams').delete()
        .eq('user_id', userId)
        .eq('exam_date', event.event_date)
        .eq('subject', examEnum as any);
    }
    onSaved();
  };

  const typeBtn = (t: EventType, label: string, cls: string) => (
    <button
      type="button"
      onClick={() => setType(t)}
      className={`flex-1 py-2 rounded-md border text-xs font-medium transition ${type === t ? cls : 'border-border bg-secondary text-muted-foreground'}`}
    >
      {label}
    </button>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{event ? 'Modifier l\'événement' : 'Nouvel événement'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Type</label>
            <div className="flex gap-2">
              {typeBtn('course', '📘 Cours', 'border-amber-500 bg-amber-500/15 text-amber-300')}
              {typeBtn('quest', '⚔️ Quête', 'border-violet-500 bg-violet-500/15 text-violet-300')}
              {typeBtn('ds', '📝 DS', 'border-rose-500 bg-rose-500/15 text-rose-300')}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Titre</label>
            <input value={title} onChange={e => setTitle(e.target.value)} maxLength={100}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Matière</label>
            <select value={subject} onChange={e => setSubject(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm">
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Début</label>
              <input type="time" step={300} value={startTime} onChange={e => setStartTime(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Fin</label>
              <input type="time" step={300} value={endTime} onChange={e => setEndTime(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm" />
          </div>
          <div className="flex items-center gap-2 pt-2">
            {event && (
              <button onClick={remove} className="px-3 py-2 rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10">
                <Trash2 size={14} />
              </button>
            )}
            <button onClick={onClose} className="flex-1 px-3 py-2 rounded-md border border-border text-sm hover:bg-secondary">Annuler</button>
            <button onClick={save} disabled={saving || !title.trim()} className="flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">
              {event ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
