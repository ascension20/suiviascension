import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  PlanningEvent, getWeekStart, getWeekDays, formatDateISO, formatWeekLabel,
  dayName, eventTypeColor, eventTypeLabel, toExamSubject,
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
  /** Increment to trigger a data reload from the parent (e.g. after external validation) */
  reloadTrigger?: number;
}

// ── Composant ─────────────────────────────────────────────────────────────
export function PlanningFull({ userId, onXpGain, onChanged, initialWeekStart, reloadTrigger }: Props) {
  const [weekStart, setWeekStart] = useState(() => initialWeekStart ?? getWeekStart(new Date()));
  const [events,     setEvents]   = useState<PlanningEvent[]>([]);
  const [icalEvents, setIcalEvents] = useState<PlanningEvent[]>([]);
  const [icalUrl, setIcalUrl]     = useState<string | null>(null);
  const [creating, setCreating]   = useState(false);
  const [editing, setEditing]     = useState<PlanningEvent | null>(null);
  const [validating, setValidating] = useState<PlanningEvent | null>(null);
  const [converting, setConverting] = useState<PlanningEvent | null>(null);
  const [suppressedSlots, setSuppressedSlots] = useState<Set<string>>(new Set());
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
    if (data) {
      setEvents(data as PlanningEvent[]);
      // Rebuild suppressed slots from DB DS events (persists after remount)
      const slots = new Set<string>(
        (data as PlanningEvent[])
          .filter(e => e.type === 'ds')
          .map(e => `${e.event_date}|${e.start_time.slice(0, 5)}`)
      );
      setSuppressedSlots(slots);
    }

    const { data: prof } = await supabase.from('user_private').select('ical_url').eq('user_id', userId).maybeSingle();
    setIcalUrl(prof?.ical_url ?? null);
  };

  useEffect(() => { load(); }, [userId, weekStart.getTime(), reloadTrigger]);

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

  // iCal courses are stored in DB at onboarding (source='ical').
  // The live URL parser also returns the same courses → would duplicate them in allEvents.
  // Hide URL-parsed courses when:
  //   (a) A DB iCal event exists at the same date+time (it IS the stored version)
  //   (b) A DS exists at that slot (the course was converted)
  //   (c) Client-side immediate suppression flag (set on convert before DB round-trip)
  const dbIcalSlots = new Set(
    events.filter(e => e.source === 'ical')
          .map(e => `${e.event_date}|${e.start_time.slice(0, 5)}`)
  );
  const dbDsSlots = new Set(
    events.filter(e => e.type === 'ds')
          .map(e => `${e.event_date}|${e.start_time.slice(0, 5)}`)
  );
  const filteredIcal = icalEvents.filter(ev => {
    const slot = `${ev.event_date}|${ev.start_time.slice(0, 5)}`;
    if (dbIcalSlots.has(slot))      return false; // (a) already in DB → show DB version
    if (dbDsSlots.has(slot))        return false; // (b) converted to DS
    if (suppressedSlots.has(slot))  return false; // (c) immediate client flag
    return true;
  });
  // Also hide DB iCal courses that are covered by a DS (course was converted but NOT deleted)
  const visibleDbEvents = events.filter(e => {
    if (e.source === 'ical' && e.type === 'course') {
      const slot = `${e.event_date}|${e.start_time.slice(0, 5)}`;
      if (dbDsSlots.has(slot) || suppressedSlots.has(slot)) return false;
    }
    return true;
  });
  const allEvents = [...visibleDbEvents, ...filteredIcal];
  const days          = getWeekDays(weekStart);
  const todayIso   = formatDateISO(new Date());

  const eventsForDay = (d: Date) =>
    allEvents
      .filter(e => e.event_date === formatDateISO(d))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

  // ── Helper: decide what happens when an event card is clicked ─────────
  const handleEventClick = (ev: PlanningEvent) => {
    if (ev.type === 'course') { setConverting(ev); return; }
    if (ev.type === 'quest' && !ev.validated && ev.source !== 'ical') { setValidating(ev); return; }
    if (ev.source !== 'ical') setEditing(ev);
  };

  // ── Mobile : liste par jour ───────────────────────────────────────────
  const renderEventCard = (ev: PlanningEvent) => {
    const c = eventTypeColor(ev.type);
    return (
      <button
        key={ev.id}
        onClick={() => handleEventClick(ev)}
        className={`w-full text-left p-2 rounded-md border ${c.bg} ${c.border} hover:opacity-80 transition mb-1.5`}
      >
        <div className="flex items-center justify-between gap-1">
          <span className={`text-[10px] font-bold uppercase ${c.text}`}>{eventTypeLabel(ev.type)}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            {ev.start_time.slice(0, 5)}–{ev.end_time.slice(0, 5)}
          </span>
        </div>
        <p className="text-xs font-medium leading-tight mt-1">{ev.title}</p>
        {ev.subject && <p className="text-[10px] text-muted-foreground mt-0.5">{ev.subject}</p>}
        {ev.validated && <span className="text-[10px] text-emerald-400">✓ Validée</span>}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">

      {/* ── Header ── */}
      <header className="border-b border-border px-3 py-1.5 flex items-center justify-between flex-wrap gap-1.5 flex-shrink-0 pr-10">
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
        <div className="flex flex-1 min-h-0 overflow-hidden flex-col">

          {/* En-têtes des jours (avec gouttière pour l'axe horaire) */}
          <div className="flex flex-shrink-0 border-b border-border">
            <div className="w-7 flex-shrink-0 border-r border-border" />
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(7, 1fr)` }}>
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
          </div>

          {/* Axe horaire + Zone événements (même espace de coordonnées) */}
          <div className="flex flex-1 min-h-0 overflow-hidden">

            {/* Axe horaire — positionné DANS la zone événements */}
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
                          onClick={() => handleEventClick(ev)}
                          className={`absolute inset-x-0.5 rounded overflow-hidden text-left border hover:opacity-80 transition-opacity ${ev.validated ? 'opacity-60' : ''} ${c.bg} ${c.border}`}
                          style={{
                            top: `${topPct}%`, height: `${heightPct}%`,
                            ...(ev.validated ? { background: 'hsl(145 50% 10%)', borderColor: 'hsl(145 50% 25%)' } : {}),
                          }}
                        >
                          <div className="px-1 py-0.5 h-full flex flex-col justify-start overflow-hidden">
                            <p className={`text-[8px] font-bold leading-tight truncate ${ev.validated ? 'text-emerald-400' : c.text}`}>
                              {ev.start_time.slice(0, 5)}
                              {ev.type === 'ds' ? ' 🔴' : ''}
                              {ev.validated ? ' ✓' : ''}
                            </p>
                            <p className="text-[8px] font-medium leading-tight text-foreground truncate">
                              {ev.title}
                            </p>
                            {heightPct > 7 && ev.subject && (
                              <p className="text-[7px] text-muted-foreground leading-tight truncate">
                                {ev.subject}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>{/* fin flex axe+events */}
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
      {converting && (
        <ConvertToDsModal
          event={converting}
          userId={userId}
          onClose={() => setConverting(null)}
          onSaved={() => {
            // Immediately suppress the iCal course before DB round-trip
            const slot = `${converting.event_date}|${converting.start_time.slice(0, 5)}`;
            setSuppressedSlots(prev => new Set([...prev, slot]));
            setConverting(null);
            load();
            onChanged?.();
          }}
        />
      )}
    </div>
  );
}

// ── Modal : convertir un cours en DS ─────────────────────────────────────────
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SUBJECTS } from '@/lib/game-utils';


function ConvertToDsModal({
  event, userId, onClose, onSaved,
}: { event: PlanningEvent; userId: string; onClose: () => void; onSaved: () => void }) {
  const [subject, setSubject] = useState<string>(event.subject ?? SUBJECTS[0]);
  const [chapters, setChapters] = useState('');
  const [saving, setSaving] = useState(false);

  const dsTitle = `DS · ${event.title}`;

  const confirm = async () => {
    setSaving(true);
    await supabase.from('planning_events').insert({
      user_id: userId,
      type: 'ds',
      title: dsTitle,
      subject,
      event_date: event.event_date,
      start_time: event.start_time,
      end_time: event.end_time,
      source: 'manual',
      ical_uid: event.ical_uid ?? null,
    });
    const { subject: examEnum, custom_subject: examCustom } = toExamSubject(subject);
    await supabase.from('exams').insert({
      user_id: userId,
      subject: examEnum as any,
      custom_subject: examCustom,
      exam_date: event.event_date,
      chapters: chapters.trim() || null,
      stress_level: 'neutral',
      coefficient: 1,
    });
    // Do NOT delete the original iCal course — it stays in DB.
    // The DS at the same slot suppresses it via dbDsSlots filtering.
    // When the DS is deleted, the course automatically reappears.
    setSaving(false);
    onSaved();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Marquer comme DS 🔴</DialogTitle>
        </DialogHeader>
        <div className="space-y-1 mb-4 p-3 rounded-lg bg-secondary/40 border border-border">
          <p className="text-sm font-semibold">{event.title}</p>
          <p className="text-xs text-muted-foreground">
            {event.event_date} · {event.start_time.slice(0,5)}–{event.end_time.slice(0,5)}
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Matière</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm"
            >
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Chapitres (optionnel)</label>
            <input
              value={chapters}
              onChange={e => setChapters(e.target.value)}
              placeholder="Ex : Ch. 3 – Cinématique"
              className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm"
              autoFocus
            />
          </div>
          <button
            onClick={confirm}
            disabled={saving}
            className="w-full py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
            style={{ background: 'hsl(0 84% 60%)', color: 'white' }}
          >
            {saving ? 'Enregistrement…' : 'Confirmer — c\'est un DS 🔴'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
