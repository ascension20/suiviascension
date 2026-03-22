import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Updates last_seen_at on the profile every 60 seconds while the user is active.
 * Also updates last_activity_date and streak logic.
 */
export function useOnlineTracker(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;

    const updatePresence = async () => {
      await supabase.from('profiles').update({
        last_seen_at: new Date().toISOString(),
      } as any).eq('user_id', userId);
    };

    // Update immediately on mount
    updatePresence();

    // Then every 60 seconds
    const interval = setInterval(updatePresence, 60_000);

    // Also on visibility change
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') updatePresence();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [userId]);
}

/**
 * Updates streak logic: call this when a meaningful activity happens (session, quest, etc.)
 */
export async function updateStreak(userId: string) {
  const { data: profile } = await supabase.from('profiles').select('streak, last_activity_date').eq('user_id', userId).single();
  if (!profile) return;

  const today = new Date().toISOString().split('T')[0];
  const lastDate = profile.last_activity_date;

  if (lastDate === today) return; // Already active today

  let newStreak = 1;
  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    if (lastDate === yesterdayStr) {
      newStreak = (profile.streak || 0) + 1;
    }
  }

  await supabase.from('profiles').update({
    streak: newStreak,
    last_activity_date: today,
  }).eq('user_id', userId);
}
