// ── Ascension 20 — Service Worker (Push Notifications) ──────────────────────

const APP_ICON = '/favicon.ico';

// ── Push event : affiche la notification native ────────────────────────────
self.addEventListener('push', event => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: 'Ascension 20', body: event.data.text(), url: '/student' };
  }

  const options = {
    body:    payload.body  ?? '',
    icon:    payload.icon  ?? APP_ICON,
    badge:   APP_ICON,
    data:    { url: payload.url ?? '/student' },
    vibrate: [200, 100, 200],
    requireInteraction: payload.requireInteraction ?? false,
    tag: payload.tag ?? 'ascension-notif',        // regroupe les notifs du même type
    renotify: false,
  };

  event.waitUntil(
    self.registration.showNotification(payload.title ?? 'Ascension 20', options)
  );
});

// ── Clic sur la notification : ouvre / focus l'app ─────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url ?? '/student';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Focus un onglet déjà ouvert sur l'app
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Sinon ouvre un nouvel onglet
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin + targetUrl);
      }
    })
  );
});

// ── Activation : prend le contrôle immédiatement ───────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
