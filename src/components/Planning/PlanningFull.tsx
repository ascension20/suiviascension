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

// ── Grille horaire ────────────────────────────────────────────────────────
const GRID_START = 8;   // 8h00
const GRID_END   = 26;  // 2h00 du matin (= 24 + 2)
const GRID_HOURS = GRID_END - GRID_START; // 18

/** Convertit "HH:MM" en heure décimale, gère le passage minuit (0–2h → 24–26) */
function toDecHour(timeStr: string): number {
  const h = parseInt(timeStr.slice(0, 2), 10);
  const m = parseInt(timeStr.slice(3, 5), 10);
  return (h < 3 ? h + 24 : h) + m / 60;
}

/** Position % dans la grille pour un horaire donné */
function timeToPct(timeStr: string): number {
  return Math.max(0, Math.min(100, ((toDecHour(timeStr) - GRID_START) / GRID_HOURS) * 100));
}

/** Labels sur l'axe horaire */
const TIME_LABELS = Array.from({ length: GRID_HOURS + 1 }, (_, i) => {
  const h = (GRID_START + i) % 24;
  return `${String(h).padStart(2, '0')}h`;
});

// ── Types ─────────────────────────────────────────────────────────────────
interface Props {
  userId: string;
  onXpGain: (amount: number) => void;
  onChanged?: () => void;
  initialWeekStart?: Date;
}

// ── Composant ─────────────────────────────────────────────────────────────
export function PlanningFull({ userId, onXpGain, onChanged, initialWeekStart }: Props) {
  const [weekStart, setWeekStart] = useState(() => initialWeekStart ?? getWeekStart(new Date()));
  const [events,     setEvents]   = useState<PlanningEvent[]>([]);
  const [icalEvents, setIcalEvents] = useState<PlanningEvent[]>([]);
  const [icalUrl, setIcalUrl]     = useState<string | null>(null);
  const [creating, setCreating]   = useState(false);
  const [editing, setEditing]     = useState<PlanningEvent | null>(null);
  const [validating, setValidating] = useState<PlanningEvent | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const isMobile = useIsMobile();

  const weekEnd = useMemo(() => {
    const d = new Date(weekStart); d.setDate(d.getDate() + 6); d.setHours(23, 59, 59); return d;
  }, [weekStart]);

  const load = async () => {
    const { data } = await supabase
      .from('planning_events').select('*')
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
        const txt    = await fetchICal(icalUrl);
        const parsed = parseICal(txt, weekStart, weekEnd);
        if (!cancelled) setIcalEvents(parsed.map(e => icalToPlanningEvent(e, userId)));
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [icalUrl, weekStart.getTime()]);

  const allEvents  = [...events, ...icalEvents];
  const days       = getWeekDays(weekStart);
  const todayIso   = formatDateISO(new Date());

  const eventsForDay = (d: Date) =>
    allEvents
      .filter(e => e.event_date === formatDateISO(d))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // ── Mobile : liste par jour ───────────────────────────────────────────
  const renderEventCard = (ev: PlanningEvent) => {
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
            {ev.start_time.slice(0, 5)}–{ev.end_time.slice(0, 5)}
          </span>
        </div>
        <p className="text-xs font-medium leading-tight mt-1">{ev.title}</p>
        {ev.subject && <p className="text-[10px] text-muted-foreground mt-0.5">{ev.subject}</p>}
        {ev.type === 'quest' && !ev.validated && ev.source !== 'ical' && (
          <button
            onClick={e => { e.stopPropagation(); setValidating(ev); }}
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
    <div className="flex flex-col h-full bg-background overflow-hidden">

      {/* ── Header ── */}
      <header className="border-b border-border px-3 py-1.5 flex items-center justify-between flex-wrap gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <CalendarDays size={13} className="text-primary" />
          <h2 className="font-display font-semibold text-xs">{formatWeekLabel(weekStart)}</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }}
            className="p-1 rounded hover:bg-secondary"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={() => setWeekStart(getWeekStart(new Date()))}
            className="px-2 py-0.5 rounded text-[10px] hover:bg-secondary border border-border"
          >
            Auj.
          </button>
          <button
            onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }}
            className="p-1 rounded hover:bg-secondary"
          >
            <ChevronRight size={12} />
          </button>
          <button
            onClick={() => setCreating(true)}
            className="ml-1 px-2.5 py-1 rounded text-[10px] font-medium flex items-center gap-1"
            style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            <Plus size={11} /> Ajouter
          </button>
        </div>
      </header>

      {/* ── Mobile view ── */}
      {isMobile ? (
        <>
          <div className="flex overflow-x-auto border-b border-border px-2 py-1.5 gap-1.5 flex-shrink-0">
            {days.map((d, i) => {
              const dayEvs = eventsForDay(d);
              const dsCount = dayEvs.filter(e => e.type === 'ds').length;
              const active  = selectedDay === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`relative shrink-0 min-w-[52px] px-1.5 py-1.5 rounded-lg border ${active ? 'border-primary bg-primary/10' : 'border-border bg-card'}`}
                >
                  <p className="text-[9px] uppercase text-muted-foreground">{dayName(d, true)}</p>
                  <p className={`text-xs font-bold ${formatDateISO(d) === todayIso ? 'text-primary' : ''}`}>{d.getDate()}</p>
                  {dsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                      {dsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {eventsForDay(days[selectedDay]).length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">Rien de prévu.</p>
            ) : eventsForDay(days[selectedDay]).map(renderEventCard)}
          </div>
        </>
      ) : (
        /* ── Desktop : grille horaire ── */
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Axe horaire */}
          <div className="w-7 flex-shrink-0 border-r border-border relative bg-background">
            {TIME_LABELS.map((label, i) => (
              <div
                key={label}
                className={`absolute right-0.5 text-[7px] text-muted-foreground select-none leading-none ${
                  i === 0 ? '' : i === GRID_HOURS ? '-translate-y-full' : '-translate-y-1/2'
                }`}
                style={{ top: `${(i / GRID_HOURS) * 100}%` }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Colonnes jours */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* En-têtes des jours */}
            <div
              className="grid flex-shrink-0 border-b border-border"
              style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
            >
              {days.map((d, i) => {
                const isToday = formatDateISO(d) === todayIso;
                const dayEvs  = eventsForDay(d);
                const dsCount = dayEvs.filter(e => e.type === 'ds').length;
                return (
                  <div
                    key={i}
                    className={`text-center py-0.5 border-r border-border last:border-r-0 ${isToday ? 'bg-primary/[0.08]' : ''}`}
                  >
                    <p className="text-[8px] uppercase text-muted-foreground leading-tight">{dayName(d, true)}</p>
                    <p className={`text-[10px] font-bold leading-tight ${isToday ? 'text-primary' : ''}`}>{d.getDate()}</p>
                    {dsCount > 0 && (
                      <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-500 text-white text-[7px] font-bold leading-none">
                        {dsCount}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Zone événements avec grille horaire */}
            <div
              className="flex-1 grid relative overflow-hidden min-h-0"
              style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
            >
              {/* Lignes horaires (fond) */}
              <div className="absolute inset-0 pointer-events-none" style={{ gridColumn: '1 / -1' }}>
                {Array.from({ length: GRID_HOURS }, (_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-t border-border/25"
                    style={{ top: `${(i / GRID_HOURS) * 100}%` }}
                  />
                ))}
                {/* Demi-heures */}
                {Array.from({ length: GRID_HOURS }, (_, i) => (
                  <div
                    key={`h${i}`}
                    className="absolute left-0 right-0 border-t border-border/10"
                    style={{ top: `${((i + 0.5) / GRID_HOURS) * 100}%` }}
                  />
                ))}
              </div>

              {/* Colonne par jour */}
              {days.map((d, i) => {
                const isToday = formatDateISO(d) === todayIso;
                const dayEvs  = eventsForDay(d);

                return (
                  <div
                    key={i}
                    className={`relative border-r border-border last:border-r-0 ${isToday ? 'bg-primary/5' : ''}`}
                  >
                    {dayEvs.map(ev => {
                      const topPct    = timeToPct(ev.start_time);
                      const heightPct = Math.max(
                        timeToPct(ev.end_time) - topPct,
                        3.5, // hauteur minimale
                      );
                      const c = eventTypeColor(ev.type);

                      return (
                        <button
                          key={ev.id}
                          onClick={() => ev.source !== 'ical' && setEditing(ev)}
                          className={`absolute inset-x-0.5 rounded overflow-hidden text-left border ${c.bg} ${c.border} hover:opacity-80 transition-opacity`}
                          style={{ top: `${topPct}%`, height: `${heightPct}%` }}
                        >
                          <div className="px-1 py-0.5 h-full flex flex-col justify-start overflow-hidden">
                            <p className={`text-[8px] font-bold leading-tight truncate ${c.text}`}>
                              {ev.start_time.slice(0, 5)} {ev.type === 'ds' ? '🔴' : ''}
                            </p>
                            <p className="text-[8px] font-medium leading-tight text-foreground truncate">
                              {ev.title}
                            </p>
                            {heightPct > 7 && ev.subject && (
                              <p className="text-[7px] text-muted-foreground leading-tight truncate">
                                {ev.subject}
                              </p>
                            )}
                            {heightPct > 10 && ev.type === 'quest' && !ev.validated && ev.source !== 'ical' && (
                              <button
                                onMouseDown={e => { e.stopPropagation(); setValidating(ev); }}
                                className="mt-auto text-[7px] rounded px-1 bg-violet-500/40 text-violet-100 leading-tight"
                              >
                                Valider
                              </button>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {creating && (
        <EventFormModal
          userId={userId}
          onClose={() => setCreating(false)}
          onSaved={() => { setCreating(false); load(); onChanged?.(); }}
        />
      )}
      {editing && (
        <EventFormModal
          userId={userId}
          event={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); onChanged?.(); }}
        />
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
