import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AvatarConfig } from '@/lib/avatar/types';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';

// ─────────────────────────────────────────────────────────────
// Hook — loads and persists avatar config for a given user
// ─────────────────────────────────────────────────────────────

interface UseAvatarConfigReturn {
  config: AvatarConfig;
  loading: boolean;
  saving: boolean;
  setConfig: (next: AvatarConfig) => void;
  saveConfig: (next?: AvatarConfig) => Promise<void>;
}

export function useAvatarConfig(userId: string | undefined): UseAvatarConfigReturn {
  const [config, setConfigState] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load from DB on mount
  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('avatar_configs')
        .select('hat, glasses, outfit, background, badge')
        .eq('user_id', userId)
        .maybeSingle();

      if (data) {
        setConfigState({
          hat: data.hat ?? null,
          glasses: data.glasses ?? null,
          outfit: data.outfit ?? DEFAULT_AVATAR_CONFIG.outfit,
          background: data.background ?? DEFAULT_AVATAR_CONFIG.background,
          badge: data.badge ?? null,
        });
      }
      setLoading(false);
    };

    load();
  }, [userId]);

  const setConfig = useCallback((next: AvatarConfig) => {
    setConfigState(next);
  }, []);

  const saveConfig = useCallback(async (next?: AvatarConfig) => {
    if (!userId) return;
    const toSave = next ?? config;
    setSaving(true);
    await supabase.from('avatar_configs').upsert({
      user_id: userId,
      hat: toSave.hat,
      glasses: toSave.glasses,
      outfit: toSave.outfit,
      background: toSave.background,
      badge: toSave.badge,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (next) setConfigState(next);
    setSaving(false);
  }, [userId, config]);

  return { config, loading, saving, setConfig, saveConfig };
}
