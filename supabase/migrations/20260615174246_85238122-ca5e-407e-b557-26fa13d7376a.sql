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

CREATE INDEX IF NOT EXISTS idx_deepwork_ended_user
  ON public.deepwork_sessions (ended_at, user_id, duration_seconds);

GRANT EXECUTE ON FUNCTION public.get_deepwork_leaderboard(timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_xp_leaderboard(timestamptz) TO authenticated;