import { createContext, useContext, useEffect, useRef, useState } from 'react';
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
 * Provides real-time deepwork presence across all pages.
 * - Always subscribes to the channel (so we can SEE who's studying).
 * - Only calls channel.track() while a session is active (so we appear to others).
 * - Uses a custom DOM event + storage event to react to session start/stop
 *   without needing a polling loop.
 */
export function DeepworkPresenceProvider({ children, userId, profile }: Props) {
  const [peers, setPeers] = useState<DeepworkPeer[]>([]);
  const [isActive, setIsActive] = useState(() => !!localStorage.getItem(DEEPWORK_STORAGE_KEY));
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // React to session start / stop from any page
  useEffect(() => {
    const sync = () => setIsActive(!!localStorage.getItem(DEEPWORK_STORAGE_KEY));
    window.addEventListener('deepwork-session-change', sync);
    window.addEventListener('storage', sync); // cross-tab
    return () => {
      window.removeEventListener('deepwork-session-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Subscribe once (to observe peers) — track/untrack based on isActive
  useEffect(() => {
    if (!userId) return;

    const ch = supabase.channel('deepwork-room', {
      config: { presence: { key: userId } },
    });
    channelRef.current = ch;

    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState<DeepworkPeer>();
      const others = Object.entries(state)
        .filter(([key]) => key !== userId)
        .flatMap(([, v]) => v as DeepworkPeer[]);
      setPeers(others);
    }).subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') return;
      if (isActive) {
        await ch.track({ pseudo: profile?.pseudo ?? 'Élève', avatar: profile?.avatar ?? '🐺' });
      }
    });

    return () => { supabase.removeChannel(ch); channelRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // only reconnect if userId changes

  // Track / untrack without reconnecting when isActive changes
  useEffect(() => {
    const ch = channelRef.current;
    if (!ch) return;
    if (isActive) {
      ch.track({ pseudo: profile?.pseudo ?? 'Élève', avatar: profile?.avatar ?? '🐺' });
    } else {
      ch.untrack();
      setPeers([]); // clear peers when not in session
    }
  }, [isActive, profile?.pseudo, profile?.avatar]);

  return <Ctx.Provider value={peers}>{children}</Ctx.Provider>;
}

export function useDeepworkPresence() { return useContext(Ctx); }
