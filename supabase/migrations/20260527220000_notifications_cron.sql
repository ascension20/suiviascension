-- Planification horaire de l'edge function send-notifications
-- Tourne entre 8h et 20h (heure France UTC+2 → UTC 6h–18h)
-- Nécessite l'extension pg_cron et pg_net (activées par défaut sur Supabase)

SELECT cron.schedule(
  'send-push-notifications',
  '0 6-18 * * *',   -- toutes les heures de 8h à 20h (Paris = UTC+2)
  $$
  SELECT net.http_post(
    url     := (SELECT 'https://' || value || '.supabase.co/functions/v1/send-notifications'
                FROM pg_settings WHERE name = 'app.settings.supabase_project_id'
                LIMIT 1),
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || (SELECT value FROM pg_settings WHERE name = 'app.settings.service_role_key' LIMIT 1)
    ),
    body    := '{}'::jsonb
  );
  $$
);
