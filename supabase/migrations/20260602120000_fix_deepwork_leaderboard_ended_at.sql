-- Fix: deepwork leaderboard was filtering by started_at while the XP leaderboard
-- filters by xp_history.created_at (≈ ended_at). This caused sessions spanning
-- midnight / week boundaries to appear in different weeks on each board.
-- Both boards now use the session END time as the reference point, keeping them
-- consistent with each other and with how XP is credited.
--
-- Also adds a covering index so the leaderboard query uses an index scan instead
-- of a full seq-scan on deepwork_sessions.

CREATE OR REPLACE FUNCTION public.get_deepwork_leaderboard(_since timestamptz)
RETURNS TABLE(user_id uuid, total_seconds integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, COALESCE(SUM(duration_seconds), 0)::int AS total_seconds
  FROM public.deepwork_sessions
  WHERE ended_at >= _since
  GROUP BY user_id
  HAVING COALESCE(SUM(duration_seconds), 0) > 0
  ORDER BY total_seconds DESC
  LIMIT 50;
$$;

-- Index optimized for the leaderboard query pattern: filter by ended_at,
-- aggregate duration_seconds grouped by user_id.
CREATE INDEX IF NOT EXISTS idx_deepwork_ended_user
  ON public.deepwork_sessions (ended_at, user_id, duration_seconds);
