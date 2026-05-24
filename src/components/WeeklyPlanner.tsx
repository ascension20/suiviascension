import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Plus, X, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Subject, SUBJECTS, SUBJECT_CSS_VAR } from '@/lib/game-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlannerSlot {
  id: string;
  day: number; // 0=Mon..6=Sun
  subject: Subject;
  description: string;
  start_time: string;
  duration_minutes: number;
}

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// We store planner slots in student_tasks with a special convention:
// Use localStorage for the weekly planner since it's a planning tool, not graded work

export function WeeklyPlanner({ userId }: { userId: string }) {
  const [slots, setSlots] = useState<PlannerSlot[]>([]);
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1; // Convert to Mon=0
  });
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState<Subject>('Maths' as Subject);
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('17:00');
  const [duration, setDuration] = useState(30);

  const storageKey = `planner-${userId}`;

  const loadSlots = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setSlots(JSON.parse(stored));
    } catch { /* ignore */ }
  }, [storageKey]);

  const saveSlots = useCallback((newSlots: PlannerSlot[]) => {
    setSlots(newSlots);
    localStorage.setItem(storageKey, JSON.stringify(newSlots));
  }, [storageKey]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const handleAdd = () => {
    if (!description.trim()) return;
    const newSlot: PlannerSlot = {
      id: crypto.randomUUID(),
      day: selectedDay,
      subject,
      description: description.trim(),
      start_time: startTime,
      duration_minutes: duration,
    };
    saveSlots([...slots, newSlot]);
    setDescription('');
    setShowForm(false);
  };

  const handleRemove = (id: string) => {
    saveSlots(slots.filter(s => s.id !== id));
  };

  const daySlots = slots
    .filter(s => s.day === selectedDay)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  const totalMinutes = daySlots.reduce((sum, s) => sum + s.duration_minutes, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-base font-semibold flex items-center gap-2">
          <CalendarDays size={16} className="text-primary" />
          Planning
        </h2>
        <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={14} /> : <Plus size={14} />}
        </Button>
      </div>

      {/* Day selector */}
      <div className="flex gap-1 mb-4">
        {DAY_LABELS.map((label, i) => {
          const count = slots.filter(s => s.day === i).length;
          const isToday = i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors relative ${
                selectedDay === i
                  ? 'bg-primary text-primary-foreground'
                  : isToday
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                  selectedDay === i ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="space-y-3 p-3 rounded-lg border border-border bg-secondary/30 mb-4">
          <Input
            placeholder="Que vas-tu travailler ?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="h-9 text-sm"
          />
          <div className="grid grid-cols-3 gap-2">
            <Select value={subject} onValueChange={v => setSubject(v as Subject)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="h-9 text-sm"
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                min={5}
                max={180}
                step={5}
                value={duration}
                onChange={e => setDuration(parseInt(e.target.value) || 30)}
                className="h-9 text-sm"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">min</span>
            </div>
          </div>
          <Button size="sm" onClick={handleAdd} disabled={!description.trim()} className="w-full">
            Ajouter au planning
          </Button>
        </div>
      )}

      {/* Day slots */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {daySlots.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-3">
            Rien de prévu {DAY_LABELS[selectedDay].toLowerCase()} 📅
          </p>
        ) : (
          <>
            {daySlots.map(slot => (
              <div key={slot.id} className="flex items-center gap-3 p-3 rounded-lg border border-border group">
                <div
                  className="w-2 h-full min-h-[24px] rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[slot.subject]}))` }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{slot.description}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{slot.subject}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <Clock size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{slot.start_time} — {slot.duration_minutes}min</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(slot.id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-50 hover:!opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-all"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-border">
              <Clock size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Total : {Math.floor(totalMinutes / 60)}h{totalMinutes % 60 > 0 ? `${String(totalMinutes % 60).padStart(2, '0')}` : ''}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
