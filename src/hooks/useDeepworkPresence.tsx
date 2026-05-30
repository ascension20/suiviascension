import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DEEPWORK_STORAGE_KEY } from '@/lib/planning-utils';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

export interface DeepworkPeer { pseudo: string; avatarUrl: string; }

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
 *  - Fetches the user's avatar_config once (on userId / pseudo change) and
 *    builds the canonical Avataaars URL — same avatar as the profile page.
 *  - Always subscribes to the channel so we can see who is studying.
 *  - Calls channel.track() INSIDE the subscribe callback (the only safe
 *    place), with the up-to-date isActive + avatarUrl captured in the same
 *    closure — no stale-closure race condition.
 *  - Re-creates the channel whenever isActive, profile or avatarUrl changes.
 *  - Reacts to session start/stop via a custom DOM event (same tab) and
 *    the storage event (cross-tab).
 */
export function DeepworkPresenceProvider({ children, userId, profile }: Props) {
  const [peers, setPeers] = useState<DeepworkPeer[]>([]);
  const [isActive, setIsActive] = useState(() => !!localStorage.getItem(DEEPWORK_STORAGE_KEY));
  const [avatarUrl, setAvatarUrl] = useState('');

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

  // Fetch avatar_config from DB and build the Avataaars URL for this user.
  // This ensures the deepwork peer card shows the exact same avatar as the profile.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('avatar_configs')
        .select('hat, glasses, outfit, background, badge, skin_color, hair_style, hair_color')
        .eq('user_id', userId)
        .maybeSingle();

      if (cancelled) return;

      const config: AvatarConfig = data ? {
        hat:        data.hat        ?? null,
        glasses:    data.glasses    ?? null,
        outfit:     data.outfit     ?? DEFAULT_AVATAR_CONFIG.outfit,
        background: data.background ?? DEFAULT_AVATAR_CONFIG.background,
        badge:      data.badge      ?? null,
        skinColor:  data.skin_color ?? DEFAULT_AVATAR_CONFIG.skinColor,
        hairStyle:  data.hair_style ?? DEFAULT_AVATAR_CONFIG.hairStyle,
        hairColor:  data.hair_color ?? DEFAULT_AVATAR_CONFIG.hairColor,
      } : DEFAULT_AVATAR_CONFIG;

      setAvatarUrl(buildAvataaarsUrl(config, profile?.pseudo ?? 'Élève'));
    })();
    return () => { cancelled = true; };
  }, [userId, profile?.pseudo]);

  /**
   * Channel effect. Depends on isActive + profile + avatarUrl so the
   * subscribe callback always captures current values. track() is called
   * only after SUBSCRIBED, only when active, and only once avatarUrl is set.
   */
  useEffect(() => {
    if (!userId) return;

    const pseudo = profile?.pseudo ?? 'Élève';

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
        await ch.track({ pseudo, avatarUrl });
      }
    });

    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isActive, profile?.pseudo, avatarUrl]);

  return <Ctx.Provider value={peers}>{children}</Ctx.Provider>;
}

export function useDeepworkPresence() { return useContext(Ctx); }
