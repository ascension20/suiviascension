-- Planification horaire de l'edge function send-notifications
-- Tourne entre 8h et 20h (heure France UTC+2 → UTC 6h–18h)
-- Nécessite pg_cron et pg_net (activés par défaut sur Supabase)
--
-- IMPORTANT : remplace <PROJECT_ID> par ton ID de projet Supabase
-- (visible dans Project Settings → General → Reference ID)
-- et <SERVICE_ROLE_KEY> par ta Service Role Key
-- (visible dans Project Settings → API → service_role)

SELECT cron.schedule(
  'send-push-notifications',
  '0 6-18 * * *',   -- toutes les heures de 8h à 20h (Paris = UTC+2)
  $$
  SELECT net.http_post(
    url     := 'https://hyduebgmpqjzleiyfpri.supabase.co/functions/v1/send-notifications',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body    := '{}'::jsonb
  );
  $$
);
