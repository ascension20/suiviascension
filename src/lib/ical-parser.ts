import ICAL from 'ical.js';
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

const CORS_PROXIES = [
  (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
  (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u: string) => `https://cors-anywhere.herokuapp.com/${u}`,
];

export async function fetchICal(url: string): Promise<string> {
  // 1. Try via Supabase Edge Function (server-side, no CORS issues)
  try {
    const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
    const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/functions/v1/fetch-ical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ url }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.text && json.text.includes('BEGIN:VCALENDAR')) return json.text;
      }
    }
  } catch { /* fall through to CORS proxies */ }

  // 2. Try direct fetch (works if URL allows CORS)
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('BEGIN:VCALENDAR')) return text;
    }
  } catch { /* fall through */ }

  // 3. CORS proxies as last resort
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy(url));
      if (res.ok) {
        const text = await res.text();
        if (text.includes('BEGIN:VCALENDAR')) return text;
      }
    } catch { /* try next */ }
  }

  throw new Error('Impossible de récupérer le calendrier iCal.');
}

export function parseICal(icsText: string, weekStart: Date, weekEnd: Date): ICalEvent[] {
  const jcal = ICAL.parse(icsText);
  const comp = new ICAL.Component(jcal);
  const vevents = comp.getAllSubcomponents('vevent');
  const results: ICalEvent[] = [];

  for (const v of vevents) {
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
