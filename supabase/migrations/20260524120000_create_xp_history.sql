-- XP history: one row per XP gain (deepwork, quest, tutorial, etc.)
-- Lets us compute weekly / daily XP leaderboards accurately.

CREATE TABLE IF NOT EXISTS public.xp_history (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount      INTEGER     NOT NULL DEFAULT 0,
  source      TEXT        NOT NULL DEFAULT 'quest',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.xp_history ENABLE ROW LEVEL SECURITY;

-- Students can read their own history
CREATE POLICY "xp_history: users read own"
  ON public.xp_history FOR SELECT
  USING (auth.uid() = user_id);

-- Students can insert their own history
CREATE POLICY "xp_history: users insert own"
  ON public.xp_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Everyone can read all rows for leaderboard aggregation
CREATE POLICY "xp_history: leaderboard read all"
  ON public.xp_history FOR SELECT
  USING (true);

-- Fast index for leaderboard queries (filter by time, group by user)
CREATE INDEX IF NOT EXISTS xp_history_user_created
  ON public.xp_history (user_id, created_at DESC);
