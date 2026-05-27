import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_EMAIL = Deno.env.get('VAPID_EMAIL') ?? 'mailto:admin@ascension20.fr';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function alreadySentToday(userId: string, type: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await db.from('notification_log').select('id').eq('user_id', userId).eq('notif_type', type).gte('sent_at', today + 'T00:00:00Z').limit(1);
  return (data?.length ?? 0) > 0;
}

async function logSent(userId: string, type: string) {
  await db.from('notification_log').insert({ user_id: userId, notif_type: type });
}

async function sendPush(sub: any, notif: any): Promise<boolean> {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify({ title: notif.title, body: notif.body, url: notif.url, tag: notif.tag }),
    );
    return true;
  } catch (err: any) {
    if (err?.statusCode === 410 || err?.statusCode === 404) {
      await db.from('push_subscriptions').delete().eq('user_id', sub.user_id).eq('endpoint', sub.endpoint);
    }
    return false;
  }
}

Deno.serve(async (req) => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const { data: subs } = await db.from('push_subscriptions').select('user_id, endpoint, p256dh, auth');
  if (!subs?.length) return new Response(JSON.stringify({ sent: 0 }), { headers: { 'Content-Type': 'application/json' } });

  const userIds = [...new Set(subs.map((s: any) => s.user_id))];
  const notifications: any[] = [];

  await Promise.all(userIds.map(async (userId: any) => {
    if (!await alreadySentToday(userId, 'deepwork-gap')) {
      const { data: lastDw } = await db.from('deepwork_sessions').select('started_at').eq('user_id', userId).order('started_at', { ascending: false }).limit(1);
      const hoursSince = lastDw?.[0]?.started_at ? (now.getTime() - new Date(lastDw[0].started_at).getTime()) / 3600000 : 999;
      if (hoursSince >= 24) {
        notifications.push({ userId, type: 'deepwork-gap', title: '⚡ Session deepwork', body: 'Aucune session hier — garde le rythme !', url: '/student/deepwork', tag: 'deepwork-gap' });
      }
    }
    const in7 = new Date(now); in7.setDate(in7.getDate() + 7);
    const { data: upcoming } = await db.from('exams').select('id, subject, custom_subject, exam_date').eq('user_id', userId).is('grade', null).gte('exam_date', today).lte('exam_date', in7.toISOString().slice(0, 10)).order('exam_date', { ascending: true });
    for (const exam of (upcoming ?? [])) {
      const type = `ds-reminder-${exam.id}`;
      if (await alreadySentToday(userId, type)) continue;
      const daysUntil = Math.ceil((new Date(exam.exam_date).getTime() - now.getTime()) / 86400000);
      const subject = exam.custom_subject || exam.subject;
      notifications.push({ userId, type, title: daysUntil <= 1 ? `🚨 DS ${subject} demain !` : `📚 DS ${subject} — J-${daysUntil}`, body: daysUntil <= 1 ? 'Bonne chance demain ! 💪' : `Il te reste ${daysUntil} jours.`, url: '/student', tag: `ds-${exam.id}` });
    }
  }));

  let sent = 0;
  for (const notif of notifications) {
    for (const sub of subs.filter((s: any) => s.user_id === notif.userId)) {
      if (await sendPush(sub, notif)) { await logSent(notif.userId, notif.type); sent++; break; }
    }
  }
  return new Response(JSON.stringify({ sent, users: userIds.length }), { headers: { 'Content-Type': 'application/json' } });
});
