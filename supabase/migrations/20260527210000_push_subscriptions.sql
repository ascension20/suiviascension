-- Push subscriptions for Web Push API
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  endpoint    text NOT NULL,
  p256dh      text NOT NULL,
  auth        text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, endpoint)
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own push subscriptions"
  ON public.push_subscriptions
  FOR ALL
  TO authenticated
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Track last notification sent per user per type (anti-spam)
CREATE TABLE IF NOT EXISTS public.notification_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notif_type  text NOT NULL,
  sent_at     timestamptz DEFAULT now(),
  UNIQUE (user_id, notif_type, (sent_at::date))
);

ALTER TABLE public.notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role only on notification_log"
  ON public.notification_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
