import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Maximize2, Calendar, Plus, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  PlanningEvent, getWeekStart, getWeekDays, formatDateISO, formatWeekLabel,
  dayName, eventTypeColor, eventTypeLabel,
} from '@/lib/planning-utils';
import { PlanningFull } from './PlanningFull';
import { EventFormModal } from './EventFormModal';
import { QuestValidationModal } from './QuestValidationModal';

interface Props { userId: string; onXpGain: (amount: number) => void; }

const SHORT_DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function PlanningMini({ userId, onXpGain }: Props) {
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [full, setFull] = useState(false);
  const [creating, setCreating] = useState(false);
  const [validating, setValidating] = useState<PlanningEvent | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1; // 0=Lun … 6=Dim
  });

  const baseWeekStart = getWeekStart(new Date());
  const weekStart = new Date(baseWeekStart);
  weekStart.setDate(weekStart.getDate() + weekOffset * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const days = getWeekDays(weekStart);
  const isCurrentWeek = weekOffset === 0;

  const load = async () => {
    const { data } = await supabase
      .from('planning_events')
      .select('*')
      .eq('user_id', userId)
      .gte('event_date', formatDateISO(weekStart))
      .lte('event_date', formatDateISO(weekEnd))
      .order('start_time');
    if (data) setEvents(data as PlanningEvent[]);
  };

  useEffect(() => { load(); }, [userId, weekOffset]);

  const selectedDay = days[selectedDayIdx];
  const selectedIso = selectedDay ? formatDateISO(selectedDay) : '';
  // N'afficher que les quêtes et les DS (pas les cours)
  const dayEvents        = events.filter(e => e.event_date === selectedIso && (e.type === 'quest' || e.type === 'ds'));
  const activeEvents     = dayEvents.filter(e => !(e.type === 'quest' && e.validated));
  const completedQuests  = dayEvents.filter(e => e.type === 'quest' && e.validated);

  // Badge info par jour (quêtes + DS uniquement)
  const dayInfo = days.map(d => {
    const iso = formatDateISO(d);
    const dayEvs = events.filter(e => e.event_date === iso && (e.type === 'quest' || e.type === 'ds'));
    return { count: dayEvs.length, hasDs: dayEvs.some(e => e.type === 'ds') };
  });

  const todayIso = formatDateISO(new Date());
  const isTodayInWeek = days.some(d => formatDateISO(d) === todayIso);

  return (
    <div className="h-full flex flex-col min-h-[260px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-primary shrink-0" />
          <div className="flex items-center gap-1">
            <button onClick={() => setWeekOffset(w => w - 1)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={13} />
            </button>
            <span className="font-display font-semibold text-xs tabular-nums min-w-[90px] text-center">
              {formatWeekLabel(weekStart)}
            </span>
            <button onClick={() => setWeekOffset(w => w + 1)} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight size={13} />
            </button>
          </div>
          {!isCurrentWeek && (
            <button onClick={() => { setWeekOffset(0); setSelectedDayIdx(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1); }}
              className="text-[10px] text-primary hover:underline ml-1">
              Auj.
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCreating(true)} className="p-1.5 rounded-md hover:bg-secondary" title="Ajouter" data-tutorial="planning-add">
            <Plus size={14} />
          </button>
          <button onClick={() => setFull(true)} className="p-1.5 rounded-md hover:bg-secondary" title="Agrandir">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Day selector */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map((d, i) => {
          const iso = formatDateISO(d);
          const isToday = iso === todayIso;
          const isSelected = i === selectedDayIdx;
          const { count, hasDs } = dayInfo[i];
          return (
            <button
              key={iso}
              onClick={() => setSelectedDayIdx(i)}
              className={`relative flex flex-col items-center py-1.5 rounded-lg border-2 text-[10px] font-semibold transition-all ${
                isSelected
                  ? 'border-primary bg-primary/15 text-primary'
                  : isToday
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                  : 'border-border bg-secondary/30 text-muted-foreground hover:border-border/80 hover:text-foreground'
              }`}
            >
              <span>{SHORT_DAYS[i]}</span>
              <span className={`tabular-nums ${isSelected ? 'text-primary' : isToday ? 'text-amber-300' : ''}`}>
                {d.getDate()}
              </span>
              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: hasDs ? 'hsl(0 84% 60%)' : isSelected ? 'hsl(var(--primary))' : 'hsl(270 50% 60%)' }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {dayEvents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-xs">Rien ce jour-là.</p>
            <button onClick={() => setCreating(true)} className="mt-1.5 text-xs text-primary hover:underline">
              + Ajouter un événement
            </button>
          </div>
        ) : (
          <>
            {/* ── Événements actifs (DS + quêtes non validées) ── */}
            {activeEvents.map(ev => {
              const c = eventTypeColor(ev.type);
              return (
                <div key={ev.id} className={`rounded-lg border ${c.bg} ${c.border}`}>
                  <button
                    onClick={() => setFull(true)}
                    className="w-full text-left p-2.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wide ${c.text}`}>
                        {eventTypeLabel(ev.type)}
                      </span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {ev.start_time.slice(0, 5)}
                      </span>
                      {ev.end_time && (
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          → {ev.end_time.slice(0, 5)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold truncate mt-0.5">{ev.title}</p>
                    {ev.subject && <p className="text-[10px] text-muted-foreground">{ev.subject}</p>}
                  </button>
                  {ev.type === 'quest' && ev.source !== 'ical' && (
                    <button
                      onClick={e => { e.stopPropagation(); setValidating(ev); }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold rounded-b-lg border-t transition-colors"
                      style={{
                        borderColor: 'hsl(var(--primary) / 0.25)',
                        backgroundColor: 'hsl(var(--primary) / 0.08)',
                        color: 'hsl(var(--primary))',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      Valider la quête
                    </button>
                  )}
                </div>
              );
            })}

            {/* ── Quêtes complétées ── */}
            {completedQuests.length > 0 && (
              <div className="mt-2">
                <p className="text-[9px] uppercase tracking-widest text-emerald-500/70 font-bold mb-1.5 flex items-center gap-1">
                  <CheckCircle2 size={9} />
                  Quêtes complétées ({completedQuests.length})
                </p>
                <div className="space-y-1">
                  {completedQuests.map(ev => (
                    <div
                      key={ev.id}
                      className="rounded-lg border px-2.5 py-2 flex items-center gap-2"
                      style={{
                        background: 'hsl(145 50% 10%)',
                        borderColor: 'hsl(145 50% 25%)',
                      }}
                    >
                      <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate text-emerald-300">{ev.title}</p>
                        {ev.subject && <p className="text-[10px] text-emerald-600">{ev.subject}</p>}
                      </div>
                      <span className="text-[10px] text-emerald-600 ml-auto tabular-nums shrink-0">
                        {ev.start_time.slice(0, 5)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
          <PlanningFull userId={userId} onXpGain={onXpGain} onChanged={load} initialWeekStart={weekStart} />
        </DialogContent>
      </Dialog>

      {creating && (
        <EventFormModal
          userId={userId}
          onClose={() => setCreating(false)}
          onSaved={() => { setCreating(false); load(); }}
        />
      )}
      {validating && (
        <QuestValidationModal
          event={validating}
          userId={userId}
          onXpGain={onXpGain}
          onClose={() => setValidating(null)}
          onValidated={() => { setValidating(null); load(); }}
        />
      )}
    </div>
  );
}
