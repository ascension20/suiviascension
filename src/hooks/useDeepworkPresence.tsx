import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DEEPWORK_STORAGE_KEY } from '@/lib/planning-utils';

export interface DeepworkPeer { pseudo: string; avatar: string; }

const Ctx = createContext<DeepworkPeer[]>([]);

interface Props {
  children: React.ReactNode;
  userId: string | undefined;
  profile: { pseudo?: string; avatar?: string } | null | undefined;
}

/**
 * Provides real-time deepwork presence to the whole app.
 *
 * Design:
 *  - Always subscribes to the channel so we can see who is studying.
 *  - Calls channel.track() INSIDE the subscribe callback (the only safe
 *    place), with the up-to-date isActive value captured in the same
 *    closure — no stale-closure race condition.
 *  - Re-creates the channel whenever isActive or profile changes so the
 *    subscribe callback always sees the correct values.
 *  - Reacts to session start/stop via a custom DOM event (same tab) and
 *    the storage event (cross-tab).
 */
export function DeepworkPresenceProvider({ children, userId, profile }: Props) {
  const [peers, setPeers] = useState<DeepworkPeer[]>([]);
  const [isActive, setIsActive] = useState(() => !!localStorage.getItem(DEEPWORK_STORAGE_KEY));

  // Listen for session start / stop from any tab / page
  useEffect(() => {
    const sync = () => setIsActive(!!localStorage.getItem(DEEPWORK_STORAGE_KEY));
    window.addEventListener('deepwork-session-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('deepwork-session-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  /**
   * Channel effect. Dependencies include isActive + profile so that each
   * time one of them changes we spin up a fresh channel. The subscribe
   * callback therefore always captures the current values — no stale
   * closure. track() is called only after SUBSCRIBED and only when active.
   */
  useEffect(() => {
    if (!userId) return;

    const pseudo = profile?.pseudo ?? 'Élève';
    const avatar = profile?.avatar ?? '';

    const ch = supabase.channel('deepwork-room', {
      config: { presence: { key: userId } },
    });

    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState<DeepworkPeer>();
      const others = Object.entries(state)
        .filter(([key]) => key !== userId)
        .flatMap(([, v]) => v as DeepworkPeer[]);
      setPeers(others);
    }).subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') return;
      if (isActive) {
        await ch.track({ pseudo, avatar });
      }
    });

    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isActive, profile?.pseudo, profile?.avatar]);

  return <Ctx.Provider value={peers}>{children}</Ctx.Provider>;
}

export function useDeepworkPresence() { return useContext(Ctx); }
