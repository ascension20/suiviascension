import ICAL from 'ical.js';
import { supabase } from '@/integrations/supabase/client';
import type { PlanningEvent } from './planning-utils';
import { formatDateISO } from './planning-utils';

export interface ICalEvent {
  uid: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
}

export async function fetchICal(rawUrl: string): Promise<string> {
  // Normalise protocol: webcal:// and http:// → https://
  const url = rawUrl
    .trim()
    .replace(/^webcal:\/\//i, 'https://')
    .replace(/^http:\/\//i, 'https://');

  // 1. Via Supabase edge function (server-side — no CORS, reaches Pronote/EcoleDirecte).
  //    This is the primary and most reliable path. The edge function adds realistic
  //    browser headers and handles redirects; it returns { text } on success.
  //    NOTE: requires the edge function to be deployed (supabase functions deploy fetch-ical).
  try {
    const { data, error } = await supabase.functions.invoke('fetch-ical', { body: { url } });
    if (!error && data) {
      const text = typeof data === 'string'
        ? data
        : (data as { text?: string }).text ?? '';
      if (text.includes('BEGIN:VCALENDAR')) return text;
    }
    // If the function returned an error object (e.g. { error: "HTTP 403" }),
    // fall through and try the direct fetch below.
  } catch { /* fall through */ }

  // 2. Direct browser fetch — only works if the calendar server sends CORS headers
  //    (rare for school servers). Worth trying as a zero-latency fallback.
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const text = await res.text();
      if (text.includes('BEGIN:VCALENDAR')) return text;
    }
  } catch { /* fall through */ }

  // All methods failed. Likely causes:
  //   a) Edge function not yet deployed → deploy with `supabase functions deploy fetch-ical`
  //   b) School server blocks cloud IPs (Cloudflare/Supabase) → rare, contact school IT
  //   c) The URL has expired or is incorrect
  throw new Error('Impossible de récupérer le calendrier iCal. Vérifiez que la fonction fetch-ical est déployée sur Supabase.');
}

export function parseICal(icsText: string, weekStart: Date, weekEnd: Date): ICalEvent[] {
  const jcal = ICAL.parse(icsText);
  const comp = new ICAL.Component(jcal);
  const vevents = comp.getAllSubcomponents('vevent');
  const results: ICalEvent[] = [];

  for (const v of vevents) {
    // Skip events marked as cancelled in the iCal feed (STATUS:CANCELLED).
    // This handles both standalone cancelled events and individual cancelled
    // occurrences of recurring events (via RECURRENCE-ID + STATUS:CANCELLED).
    const status = v.getFirstPropertyValue('status');
    if (status && (status as string).toLowerCase() === 'cancelled') continue;

    const ev = new ICAL.Event(v);
    try {
      // Handle recurring events: expand within range
      if (ev.isRecurring()) {
        const iter = ev.iterator();
        let next;
        while ((next = iter.next())) {
          const occDate = next.toJSDate();
          if (occDate > weekEnd) break;
          if (occDate >= weekStart) {
            const occ = ev.getOccurrenceDetails(next);
            results.push(toEvent(ev, occ.startDate.toJSDate(), occ.endDate.toJSDate()));
          }
        }
      } else {
        const start = ev.startDate.toJSDate();
        const end = ev.endDate?.toJSDate() ?? new Date(start.getTime() + 3600000);
        if (start >= weekStart && start <= weekEnd) {
          results.push(toEvent(ev, start, end));
        }
      }
    } catch {/* skip malformed */}
  }
  return results;
}

function toEvent(ev: ICAL.Event, start: Date, end: Date): ICalEvent {
  const hh = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:00`;
  return {
    uid: ev.uid,
    title: ev.summary || 'Cours',
    date: formatDateISO(start),
    start_time: hh(start),
    end_time: hh(end),
    description: ev.description || '',
  };
}

export function icalToPlanningEvent(ical: ICalEvent, userId: string): PlanningEvent {
  return {
    id: `ical-${ical.uid}-${ical.date}`,
    user_id: userId,
    type: 'course',
    title: ical.title,
    subject: null,
    event_date: ical.date,
    start_time: ical.start_time,
    end_time: ical.end_time,
    description: ical.description,
    validated: false,
    source: 'ical',
    ical_uid: ical.uid,
  };
}
