import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Maximize2, Calendar, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  PlanningEvent, getWeekStart, getWeekDays, formatDateISO, formatWeekLabel,
  dayName, eventTypeColor, eventTypeLabel,
} from '@/lib/planning-utils';
import { PlanningFull } from './PlanningFull';
import { EventFormModal } from './EventFormModal';

interface Props { userId: string; onXpGain: (amount: number) => void; }

export function PlanningMini({ userId, onXpGain }: Props) {
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [full, setFull] = useState(false);
  const [creating, setCreating] = useState(false);

  const weekStart = getWeekStart(new Date());
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);

  const load = async () => {
    const { data } = await supabase
      .from('planning_events')
      .select('*')
      .eq('user_id', userId)
      .in('type', ['quest', 'ds'])
      .gte('event_date', formatDateISO(weekStart))
      .lte('event_date', formatDateISO(weekEnd))
      .order('event_date').order('start_time');
    if (data) setEvents(data as PlanningEvent[]);
  };

  useEffect(() => { load(); }, [userId]);

  const days = getWeekDays(weekStart);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          <h3 className="font-display font-semibold text-sm">Planning · {formatWeekLabel(weekStart)}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCreating(true)} className="p-1.5 rounded-md hover:bg-secondary" title="Ajouter">
            <Plus size={14} />
          </button>
          <button onClick={() => setFull(true)} className="p-1.5 rounded-md hover:bg-secondary" title="Agrandir">
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {days.map(d => {
          const iso = formatDateISO(d);
          const dayEvents = events.filter(e => e.event_date === iso);
          if (dayEvents.length === 0) return null;
          return (
            <div key={iso}>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
                {dayName(d, true)} {d.getDate()}
              </p>
              <div className="space-y-1.5">
                {dayEvents.map(ev => {
                  const c = eventTypeColor(ev.type);
                  return (
                    <button
                      key={ev.id}
                      onClick={() => setFull(true)}
                      className={`w-full text-left p-2 rounded-md border ${c.bg} ${c.border} hover:opacity-80 transition-opacity`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase ${c.text}`}>
                          {eventTypeLabel(ev.type)}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {ev.start_time.slice(0,5)}
                        </span>
                        {ev.validated && <span className="text-[10px] text-emerald-400">✓</span>}
                      </div>
                      <p className="text-xs font-medium truncate">{ev.title}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs">
            <p>Aucune quête ni DS planifié cette semaine.</p>
            <button onClick={() => setCreating(true)} className="mt-2 text-primary hover:underline">
              + Ajouter un événement
            </button>
          </div>
        )}
      </div>

      <Dialog open={full} onOpenChange={setFull}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden">
          <PlanningFull userId={userId} onXpGain={onXpGain} onChanged={load} />
        </DialogContent>
      </Dialog>

      {creating && (
        <EventFormModal
          userId={userId}
          onClose={() => setCreating(false)}
          onSaved={() => { setCreating(false); load(); }}
        />
      )}
    </div>
  );
}
