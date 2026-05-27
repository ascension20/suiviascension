import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw     = window.atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

export type PushPermission = 'default' | 'granted' | 'denied' | 'unsupported';

export function usePushNotifications(userId: string | undefined) {
  const [permission, setPermission] = useState<PushPermission>('default');
  const [subscribed, setSubscribed]  = useState(false);
  const [loading, setLoading]        = useState(false);

  const isSupported =
    typeof window !== 'undefined' &&
    'Notification'    in window &&
    'serviceWorker'   in navigator &&
    'PushManager'     in window;

  // Sync permission state on mount
  useEffect(() => {
    if (!isSupported) { setPermission('unsupported'); return; }
    setPermission(Notification.permission as PushPermission);
  }, [isSupported]);

  // Check if already subscribed
  useEffect(() => {
    if (!userId || !isSupported) return;
    navigator.serviceWorker.ready.then(reg =>
      reg.pushManager.getSubscription().then(sub => setSubscribed(!!sub))
    );
  }, [userId, isSupported]);

  const subscribe = useCallback(async () => {
    if (!userId || !VAPID_PUBLIC_KEY || !isSupported) return false;
    setLoading(true);
    try {
      // Register service worker if needed
      await navigator.serviceWorker.register('/sw.js');
      const registration = await navigator.serviceWorker.ready;

      // Ask user for permission
      const perm = await Notification.requestPermission();
      setPermission(perm as PushPermission);
      if (perm !== 'granted') { setLoading(false); return false; }

      // Subscribe to push
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });

      const json = sub.toJSON();
      const keys = json.keys as { p256dh: string; auth: string };

      // Save to Supabase
      await supabase.from('push_subscriptions').upsert({
        user_id:  userId,
        endpoint: json.endpoint!,
        p256dh:   keys.p256dh,
        auth:     keys.auth,
      }, { onConflict: 'user_id,endpoint' });

      setSubscribed(true);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('[Push] subscribe failed:', err);
      setLoading(false);
      return false;
    }
  }, [userId, isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!userId || !isSupported) return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    await sub.unsubscribe();
    await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', userId)
      .eq('endpoint', sub.endpoint);
    setSubscribed(false);
  }, [userId, isSupported]);

  return { permission, subscribed, loading, isSupported, subscribe, unsubscribe };
}
