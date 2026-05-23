import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  PlanningEvent, getWeekStart, getWeekDays, formatDateISO, formatWeekLabel,
  dayName, eventTypeColor, eventTypeLabel,
} from '@/lib/planning-utils';
import { fetchICal, parseICal, icalToPlanningEvent } from '@/lib/ical-parser';
import { EventFormModal } from './EventFormModal';
import { QuestValidationModal } from './QuestValidationModal';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  userId: string;
  onXpGain: (amount: number) => void;
  onChanged?: () => void;
  initialWeekStart?: Date;
}

export function PlanningFull({ userId, onXpGain, onChanged, initialWeekStart }: Props) {
  const [weekStart, setWeekStart] = useState(() => initialWeekStart ?? getWeekStart(new Date()));
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [icalEvents, setIcalEvents] = useState<PlanningEvent[]>([]);
  const [icalUrl, setIcalUrl] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<PlanningEvent | null>(null);
  const [validating, setValidating] = useState<PlanningEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const isMobile = useIsMobile();

  const weekEnd = useMemo(() => {
    const d = new Date(weekStart); d.setDate(d.getDate() + 6); d.setHours(23, 59, 59); return d;
  }, [weekStart]);

  const load = async () => {
    const { data } = await supabase
      .from('planning_events')
      .select('*')
      .eq('user_id', userId)
      .gte('event_date', formatDateISO(weekStart))
      .lte('event_date', formatDateISO(weekEnd))
      .order('start_time');
    if (data) setEvents(data as PlanningEvent[]);

    const { data: prof } = await supabase.from('profiles').select('ical_url').eq('user_id', userId).single();
    setIcalUrl(prof?.ical_url ?? null);
  };

  useEffect(() => { load(); }, [userId, weekStart.getTime()]);

  useEffect(() => {
    if (!icalUrl) { setIcalEvents([]); return; }
    let cancelled = false;
    (async () => {
      try {
        const txt = await fetchICal(icalUrl);
        const parsed = parseICal(txt, weekStart, weekEnd);
        if (!cancelled) setIcalEvents(parsed.map(e => icalToPlanningEvent(e, userId)));
      } catch {/* ignore */}
    })();
    return () => { cancelled = true; };
  }, [icalUrl, weekStart.getTime()]);

  const allEvents = [...events, ...icalEvents];
  const days = getWeekDays(weekStart);

  const eventsForDay = (d: Date) => {
    const iso = formatDateISO(d);
    return allEvents.filter(e => e.event_date === iso).sort((a, b) => a.start_time.localeCompare(b.start_time));
  };

  const renderEvent = (ev: PlanningEvent) => {
    const c = eventTypeColor(ev.type);
    return (
      <button
        key={ev.id}
        onClick={() => ev.source === 'ical' ? null : setEditing(ev)}
        className={`w-full text-left p-2 rounded-md border ${c.bg} ${c.border} hover:opacity-80 transition mb-1.5 ${ev.source === 'ical' ? 'cursor-default' : ''}`}
      >
        <div className="flex items-center justify-between gap-1">
          <span className={`text-[10px] font-bold uppercase ${c.text}`}>{eventTypeLabel(ev.type)}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            {ev.start_time.slice(0,5)}–{ev.end_time.slice(0,5)}
          </span>
        </div>
        <p className="text-xs font-medium leading-tight mt-1">{ev.title}</p>
        {ev.subject && <p className="text-[10px] text-muted-foreground mt-0.5">{ev.subject}</p>}
        {ev.type === 'quest' && !ev.validated && ev.source !== 'ical' && (
          <button
            onClick={(e) => { e.stopPropagation(); setValidating(ev); }}
            className="mt-1.5 w-full text-[10px] py-1 rounded bg-violet-500/30 hover:bg-violet-500/50 text-violet-100 font-medium"
          >
            ✓ Valider
          </button>
        )}
        {ev.validated && <span className="text-[10px] text-emerald-400">✓ Validée</span>}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          <h2 className="font-display font-semibold">{formatWeekLabel(weekStart)}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }} className="p-1.5 rounded hover:bg-secondary"><ChevronLeft size={16} /></button>
          <button onClick={() => setWeekStart(getWeekStart(new Date()))} className="px-3 py-1 rounded text-xs hover:bg-secondary border border-border">Cette semaine</button>
          <button onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }} className="p-1.5 rounded hover:bg-secondary"><ChevronRight size={16} /></button>
          <button onClick={() => setCreating(true)} className="ml-2 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </header>

      {isMobile ? (
        <>
          <div className="flex overflow-x-auto border-b border-border px-2 py-2 gap-1.5">
            {days.map((d, i) => {
              const dayEvs = eventsForDay(d);
              const questCount = dayEvs.filter(e => e.type === 'quest').length;
              const dsCount = dayEvs.filter(e => e.type === 'ds').length;
              const active = selectedDay === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`relative shrink-0 min-w-[58px] px-2 py-2 rounded-lg border ${active ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
                >
                  <p className="text-[10px] uppercase text-muted-foreground">{dayName(d, true)}</p>
                  <p className="font-display font-bold">{d.getDate()}</p>
                  <div className="flex gap-1 mt-1 justify-center">
                    {questCount > 0 && <span className="text-[9px] px-1 rounded bg-violet-500 text-white">{questCount}</span>}
                    {dsCount > 0 && <span className="text-[9px] px-1 rounded bg-rose-500 text-white">{dsCount}</span>}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {eventsForDay(days[selectedDay]).length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">Rien de prévu.</p>
            ) : eventsForDay(days[selectedDay]).map(renderEvent)}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-7 min-w-[800px] h-full">
            {days.map((d, i) => (
              <div key={i} className={`border-r border-border last:border-r-0 flex flex-col ${formatDateISO(d) === formatDateISO(new Date()) ? 'bg-primary/5' : ''}`}>
                <div className="px-2 py-2 border-b border-border sticky top-0 bg-background z-10">
                  <p className="text-[10px] uppercase text-muted-foreground">{dayName(d, true)}</p>
                  <p className="font-display font-bold">{d.getDate()}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-1.5">
                  {eventsForDay(d).map(renderEvent)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {creating && (
        <EventFormModal userId={userId} onClose={() => setCreating(false)} onSaved={() => { setCreating(false); load(); onChanged?.(); }} />
      )}
      {editing && (
        <EventFormModal userId={userId} event={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); onChanged?.(); }} />
      )}
      {validating && (
        <QuestValidationModal
          event={validating}
          userId={userId}
          onXpGain={onXpGain}
          onClose={() => setValidating(null)}
          onValidated={() => { setValidating(null); load(); onChanged?.(); }}
        />
      )}
    </div>
  );
}
