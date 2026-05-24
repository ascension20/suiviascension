import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ACCESSORIES } from '@/lib/avatar/accessories';
import { computeUnlocked, detectNewUnlocks } from '@/lib/avatar/unlock-engine';
import { calculateLevel } from '@/lib/game-utils';
import type { Accessory, PlayerStats } from '@/lib/avatar/types';

const SEEN_KEY = 'avatar_seen_unlocks_v1';

function loadSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch { /* ignore */ }
  return new Set();
}

function saveSeenIds(ids: Set<string>) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

interface UseUnlocksReturn {
  unlockedIds: Set<string>;
  newlyUnlocked: Accessory[];
  stats: PlayerStats | null;
  dismissNewUnlocks: () => void;
}

export function useUnlocks(userId: string | undefined): UseUnlocksReturn {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [newlyUnlocked, setNewlyUnlocked] = useState<Accessory[]>([]);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const seenRef = useRef<Set<string>>(loadSeenIds());

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      const [profileRes, achievementsRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('total_xp, streak, total_deepwork_sessions')
          .eq('user_id', userId)
          .single(),
        supabase
          .from('student_achievements')
          .select('achievement_id')
          .eq('user_id', userId),
      ]);

      const prof = profileRes.data;
      if (!prof) return;

      const totalXp = prof.total_xp ?? 0;
      const { level } = calculateLevel(totalXp);

      const playerStats: PlayerStats = {
        totalXp,
        level,
        streak: prof.streak ?? 0,
        deepworkSessions: prof.total_deepwork_sessions ?? 0,
        achievements: achievementsRes.data?.map(a => a.achievement_id) ?? [],
      };

      setStats(playerStats);

      const current = computeUnlocked(playerStats, ACCESSORIES);
      setUnlockedIds(current);

      const newItems = detectNewUnlocks(seenRef.current, current, ACCESSORIES);
      if (newItems.length > 0) {
        setNewlyUnlocked(newItems);
        // Mark as seen immediately so we don't show again on re-mount
        newItems.forEach(a => seenRef.current.add(a.id));
        saveSeenIds(seenRef.current);
      }
    };

    load();
  }, [userId]);

  const dismissNewUnlocks = () => setNewlyUnlocked([]);

  return { unlockedIds, newlyUnlocked, stats, dismissNewUnlocks };
}
