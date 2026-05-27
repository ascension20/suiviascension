// ── Ascension 20 — Edge Function: send-notifications ────────────────────────
// Appelée par un cron Supabase toutes les heures entre 8h et 20h.
// Envoie des push notifications aux élèves selon leurs conditions (deepwork,
// DS à venir, etc.) — une notification de chaque type par utilisateur par jour.

import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3';

const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY      = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY     = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_EMAIL           = Deno.env.get('VAPID_EMAIL') ?? 'mailto:admin@ascension20.fr';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Types ──────────────────────────────────────────────────────────────────

interface PushSub { user_id: string; endpoint: string; p256dh: string; auth: string; }

interface Notif {
  userId:   string;
  type:     string;            // pour le log anti-spam
  title:    string;
  body:     string;
  url:      string;
  tag:      string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function alreadySentToday(userId: string, type: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await db
    .from('notification_log')
    .select('id')
    .eq('user_id', userId)
    .eq('notif_type', type)
    .gte('sent_at', today + 'T00:00:00Z')
    .limit(1);
  return (data?.length ?? 0) > 0;
}

async function logSent(userId: string, type: string) {
  await db.from('notification_log').insert({ user_id: userId, notif_type: type });
}

async function sendPush(sub: PushSub, notif: Notif): Promise<boolean> {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify({ title: notif.title, body: notif.body, url: notif.url, tag: notif.tag }),
    );
    return true;
  } catch (err: any) {
    if (err?.statusCode === 410 || err?.statusCode === 404) {
      // Subscription expirée — on supprime
      await db.from('push_subscriptions')
        .delete()
        .eq('user_id', sub.user_id)
        .eq('endpoint', sub.endpoint);
    }
    return false;
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  // Sécurité : uniquement en POST avec le bon header
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${SUPABASE_SERVICE_KEY}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const now   = new Date();
  const today = now.toISOString().slice(0, 10);

  // Récupère toutes les souscriptions actives
  const { data: subs, error: subsErr } = await db
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth');

  if (subsErr || !subs?.length) {
    return new Response(JSON.stringify({ sent: 0, reason: subsErr?.message ?? 'no subs' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Déduplique les user_ids
  const userIds = [...new Set(subs.map(s => s.user_id))];

  const notifications: Notif[] = [];

  // ── Vérifie les conditions pour chaque user ──────────────────────────────
  await Promise.all(userIds.map(async (userId) => {

    // 1. Pas de session deepwork depuis 24h
    if (!await alreadySentToday(userId, 'deepwork-gap')) {
      const { data: lastDw } = await db
        .from('deepwork_sessions')
        .select('started_at')
        .eq('user_id', userId)
        .order('started_at', { ascending: false })
        .limit(1);

      const last = lastDw?.[0];
      const hoursSince = last?.started_at
        ? (now.getTime() - new Date(last.started_at).getTime()) / 3_600_000
        : 999;

      if (hoursSince >= 24) {
        notifications.push({
          userId,
          type:  'deepwork-gap',
          title: hoursSince >= 48 ? '🎯 Reviens travailler !' : '⚡ Session deepwork',
          body:  hoursSince >= 48
            ? 'Tu n\'as pas travaillé depuis 2 jours. Une session de 20 min peut tout changer.'
            : 'Aucune session hier — garde le rythme, une session courte compte !',
          url:   '/student/deepwork',
          tag:   'deepwork-gap',
        });
      }
    }

    // 2. DS dans ≤ 7 jours — un rappel par DS par jour
    const in7 = new Date(now);
    in7.setDate(in7.getDate() + 7);

    const { data: upcoming } = await db
      .from('exams')
      .select('id, subject, custom_subject, exam_date')
      .eq('user_id', userId)
      .is('grade', null)
      .gte('exam_date', today)
      .lte('exam_date', in7.toISOString().slice(0, 10))
      .order('exam_date', { ascending: true });

    for (const exam of (upcoming ?? [])) {
      const type = `ds-reminder-${exam.id}`;
      if (await alreadySentToday(userId, type)) continue;

      const daysUntil = Math.ceil(
        (new Date(exam.exam_date).getTime() - now.getTime()) / 86_400_000,
      );
      const subject = exam.custom_subject || exam.subject;

      notifications.push({
        userId,
        type,
        title: daysUntil <= 1
          ? `🚨 DS ${subject} demain !`
          : `📚 DS ${subject} — J-${daysUntil}`,
        body: daysUntil <= 1
          ? 'Dernière révision ce soir ? Bonne chance demain ! 💪'
          : `Il te reste ${daysUntil} jours. Lance une session deepwork maintenant.`,
        url:  '/student',
        tag:  `ds-${exam.id}`,
      });
    }
  }));

  // ── Envoie les notifications ─────────────────────────────────────────────
  let sent = 0;
  for (const notif of notifications) {
    const userSubs = subs.filter(s => s.user_id === notif.userId);
    for (const sub of userSubs) {
      const ok = await sendPush(sub, notif);
      if (ok) {
        await logSent(notif.userId, notif.type);
        sent++;
        break; // 1 notif par user par type, même s'il a plusieurs appareils
      }
    }
  }

  return new Response(JSON.stringify({ sent, users: userIds.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
