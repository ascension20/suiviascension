-- Fix: Remove overly permissive leaderboard policies that expose per-row data
DROP POLICY IF EXISTS "xp_history: leaderboard read all" ON public.xp_history;
DROP POLICY IF EXISTS "deepwork_sessions: leaderboard read all" ON public.deepwork_sessions;

-- Fix: Restrict avatar_configs public read to authenticated users only
DROP POLICY IF EXISTS "avatar_configs: public read" ON public.avatar_configs;
CREATE POLICY "avatar_configs: authenticated read"
  ON public.avatar_configs FOR SELECT
  TO authenticated
  USING (true);

-- Provide aggregated leaderboards via SECURITY DEFINER functions
-- so we don't expose per-row XP / deepwork data to other users.
CREATE OR REPLACE FUNCTION public.get_xp_leaderboard(_since timestamptz)
RETURNS TABLE(user_id uuid, total integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, COALESCE(SUM(amount), 0)::int AS total
  FROM public.xp_history
  WHERE created_at >= _since
  GROUP BY user_id
  HAVING COALESCE(SUM(amount), 0) > 0
  ORDER BY total DESC
  LIMIT 50;
$$;

CREATE OR REPLACE FUNCTION public.get_deepwork_leaderboard(_since timestamptz)
RETURNS TABLE(user_id uuid, total_seconds integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, COALESCE(SUM(duration_seconds), 0)::int AS total_seconds
  FROM public.deepwork_sessions
  WHERE started_at >= _since
  GROUP BY user_id
  HAVING COALESCE(SUM(duration_seconds), 0) > 0
  ORDER BY total_seconds DESC
  LIMIT 50;
$$;

REVOKE ALL ON FUNCTION public.get_xp_leaderboard(timestamptz) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_deepwork_leaderboard(timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_xp_leaderboard(timestamptz) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_deepwork_leaderboard(timestamptz) TO authenticated;