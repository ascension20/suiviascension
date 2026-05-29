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

export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'unsupported' | 'no_vapid_key' | 'permission_denied' | 'sw_failed' | 'subscribe_failed' | 'db_failed' | 'unknown' };

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

  const subscribe = useCallback(async (): Promise<SubscribeResult> => {
    if (!isSupported) return { ok: false, reason: 'unsupported' };
    if (!VAPID_PUBLIC_KEY) {
      console.error('[Push] VITE_VAPID_PUBLIC_KEY manquante dans .env');
      return { ok: false, reason: 'no_vapid_key' };
    }
    if (!userId) return { ok: false, reason: 'unknown' };

    setLoading(true);
    try {
      // Register service worker
      let registration: ServiceWorkerRegistration;
      try {
        await navigator.serviceWorker.register('/sw.js');
        registration = await navigator.serviceWorker.ready;
      } catch (swErr) {
        console.error('[Push] Service worker failed:', swErr);
        setLoading(false);
        return { ok: false, reason: 'sw_failed' };
      }

      // Ask user for permission
      const perm = await Notification.requestPermission();
      setPermission(perm as PushPermission);
      if (perm !== 'granted') {
        setLoading(false);
        return { ok: false, reason: 'permission_denied' };
      }

      // Subscribe to push
      let sub: PushSubscription;
      try {
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
        });
      } catch (subErr) {
        console.error('[Push] pushManager.subscribe failed:', subErr);
        setLoading(false);
        return { ok: false, reason: 'subscribe_failed' };
      }

      const json = sub.toJSON();
      const keys = json.keys as { p256dh: string; auth: string };

      // Save to Supabase (non-blocking — subscription is still valid locally even if DB fails)
      try {
        const { error } = await supabase.from('push_subscriptions').upsert({
          user_id:  userId,
          endpoint: json.endpoint!,
          p256dh:   keys.p256dh,
          auth:     keys.auth,
        }, { onConflict: 'user_id,endpoint' });
        if (error) {
          console.error('[Push] DB upsert failed:', error.message);
          // Subscription still created locally — mark subscribed but warn
          setSubscribed(true);
          setLoading(false);
          return { ok: false, reason: 'db_failed' };
        }
      } catch (dbErr) {
        console.error('[Push] DB upsert threw:', dbErr);
        setSubscribed(true);
        setLoading(false);
        return { ok: false, reason: 'db_failed' };
      }

      setSubscribed(true);
      setLoading(false);
      return { ok: true };
    } catch (err) {
      console.error('[Push] subscribe unknown error:', err);
      setLoading(false);
      return { ok: false, reason: 'unknown' };
    }
  }, [userId, isSupported]);

  const unsubscribe = useCallback(async () => {
    if (!userId || !isSupported) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) { setSubscribed(false); return; }
      await sub.unsubscribe();
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('user_id', userId)
        .eq('endpoint', sub.endpoint);
      setSubscribed(false);
    } catch (err) {
      console.error('[Push] unsubscribe failed:', err);
      setSubscribed(false);
    }
  }, [userId, isSupported]);

  return { permission, subscribed, loading, isSupported, subscribe, unsubscribe };
}
