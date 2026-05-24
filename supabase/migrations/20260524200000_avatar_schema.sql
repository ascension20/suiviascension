-- ─────────────────────────────────────────────────────────────
-- Avatar system: configs + achievements + student_achievements
-- ─────────────────────────────────────────────────────────────

-- 1. avatar_configs — one row per user, stores equipped accessories
CREATE TABLE IF NOT EXISTS public.avatar_configs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hat         TEXT,
  glasses     TEXT,
  outfit      TEXT,
  background  TEXT,
  badge       TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT avatar_configs_user_id_unique UNIQUE (user_id)
);
ALTER TABLE public.avatar_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "avatar_configs: users manage own"
  ON public.avatar_configs
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "avatar_configs: public read"
  ON public.avatar_configs FOR SELECT USING (true);

-- 2. achievements — static catalog seeded below
CREATE TABLE IF NOT EXISTS public.achievements (
  id          TEXT PRIMARY KEY,
  label       TEXT NOT NULL,
  description TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT 'general'
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "achievements: public read"
  ON public.achievements FOR SELECT USING (true);

-- 3. student_achievements — which users have earned which achievements
CREATE TABLE IF NOT EXISTS public.student_achievements (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT        NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT student_achievements_unique UNIQUE (user_id, achievement_id)
);
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "student_achievements: public read"
  ON public.student_achievements FOR SELECT USING (true);
CREATE POLICY "student_achievements: users insert own"
  ON public.student_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS student_achievements_user_idx
  ON public.student_achievements (user_id);

-- ─────────────────────────────────────────────────────────────
-- Seed achievement catalog
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.achievements (id, label, description, category) VALUES
  ('first_deepwork',  'Première session',       'Compléter une première session deepwork',   'deepwork'),
  ('deepwork_10',     '10 sessions',            'Compléter 10 sessions deepwork',            'deepwork'),
  ('deepwork_50',     '50 sessions',            'Compléter 50 sessions deepwork',            'deepwork'),
  ('deepwork_100',    'Centurion deepwork',      'Compléter 100 sessions deepwork',           'deepwork'),
  ('streak_7',        'Semaine parfaite',        'Maintenir un streak de 7 jours',            'streak'),
  ('streak_30',       'Mois impeccable',         'Maintenir un streak de 30 jours',           'streak'),
  ('streak_100',      'Cent jours d''affilée',   'Maintenir un streak de 100 jours',          'streak'),
  ('quests_10',       '10 quêtes',              'Compléter 10 quêtes',                       'quests'),
  ('quests_50',       '50 quêtes',              'Compléter 50 quêtes',                       'quests'),
  ('level_10',        'Ascension Lv.10',         'Atteindre le niveau 10',                    'level'),
  ('level_25',        'Ascension Lv.25',         'Atteindre le niveau 25',                    'level'),
  ('level_50',        'Ascension Lv.50',         'Atteindre le niveau 50',                    'level')
ON CONFLICT (id) DO NOTHING;
