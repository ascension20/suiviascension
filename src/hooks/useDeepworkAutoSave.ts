/**
 * useDeepworkAutoSave
 *
 * Global hook — called once at the App level, not inside DeepworkPage.
 *
 * Two responsibilities:
 *
 * 1. CAPTURE: registers pagehide + beforeunload listeners that are ALWAYS
 *    active (not tied to DeepworkPage being mounted). When the user closes
 *    the tab or navigates away while a session is running, the end timestamp
 *    is saved to localStorage regardless of which page they were on.
 *
 * 2. RECOVER: on every mount (and every time userId becomes defined), checks
 *    whether an interrupted session exists and saves it to Supabase. This
 *    runs on any page — student dashboard, profile, anywhere — so the
 *    session is never silently lost.
 */

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { computeDeepworkXp, DEEPWORK_STORAGE_KEY } from '@/lib/planning-utils';
import { updateStreak } from '@/hooks/useOnlineTracker';

const ENDED_KEY = 'deepwork_ended_at';

export function useDeepworkAutoSave(userId: string | undefined) {

  // ── 1. Capture: always-on beforeunload / pagehide ─────────────────────────
  // Does NOT depend on React state — reads directly from localStorage so it
  // works even after DeepworkPage has unmounted.
  useEffect(() => {
    const saveEndTime = () => {
      if (localStorage.getItem(DEEPWORK_STORAGE_KEY)) {
        localStorage.setItem(ENDED_KEY, String(Date.now()));
      }
    };
    window.addEventListener('pagehide',      saveEndTime);
    window.addEventListener('beforeunload',  saveEndTime);
    // visibilitychange as belt-and-suspenders for mobile (where beforeunload
    // is often suppressed when the user backgrounds the app)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') saveEndTime();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('pagehide',     saveEndTime);
      window.removeEventListener('beforeunload', saveEndTime);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []); // no deps — registered once for the lifetime of the app

  // ── 2. Recover: save interrupted session as soon as user is identified ────
  useEffect(() => {
    if (!userId) return;

    const started = localStorage.getItem(DEEPWORK_STORAGE_KEY);
    const ended   = localStorage.getItem(ENDED_KEY);
    if (!started || !ended) return;

    const startTs  = Number(started);
    const endedTs  = Number(ended);

    // Guard: only treat as interrupted if the saved end time is clearly in
    // the past (≥ 3 s ago), not the tail of a session being ended right now.
    if (endedTs > Date.now() - 3000) return;

    const duration = Math.floor((endedTs - startTs) / 1000);

    // Clean up localStorage first to prevent double-recovery on StrictMode
    localStorage.removeItem(ENDED_KEY);
    localStorage.removeItem(DEEPWORK_STORAGE_KEY);
    window.dispatchEvent(new Event('deepwork-session-change'));

    if (duration < 60) return; // sessions under 1 min aren't worth saving

    const xp = computeDeepworkXp(duration);

    (async () => {
      await supabase.from('deepwork_sessions').insert({
        user_id:          userId,
        started_at:       new Date(startTs).toISOString(),
        ended_at:         new Date(endedTs).toISOString(),
        duration_seconds: duration,
        xp_earned:        xp,
      });

      if (xp > 0) {
        await supabase.from('xp_history').insert({
          user_id: userId,
          amount:  xp,
          source:  'deepwork',
        });
      }

      // Update profile totals
      const { data: prof } = await supabase
        .from('profiles')
        .select('total_deepwork_seconds, total_deepwork_sessions, total_xp')
        .eq('user_id', userId)
        .single();

      if (prof) {
        await supabase.from('profiles').update({
          total_deepwork_seconds:  (prof.total_deepwork_seconds  ?? 0) + duration,
          total_deepwork_sessions: (prof.total_deepwork_sessions ?? 0) + 1,
          total_xp:                (prof.total_xp                ?? 0) + xp,
        }).eq('user_id', userId);
      }

      await updateStreak(userId);
    })();
  }, [userId]);
}
