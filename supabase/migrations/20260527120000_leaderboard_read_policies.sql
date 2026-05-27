-- Restore leaderboard read-all policies for xp_history and deepwork_sessions.
-- Migration 20260526135205 removed these policies, breaking weekly/daily leaderboards
-- (queries returned only the current user's rows due to "users read own" RLS).
-- These tables contain only non-sensitive aggregated stats (XP amounts, session durations).

-- ── xp_history ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "xp_history: leaderboard read all" ON public.xp_history;
CREATE POLICY "xp_history: leaderboard read all"
  ON public.xp_history
  FOR SELECT
  TO authenticated
  USING (true);

-- ── deepwork_sessions ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "deepwork_sessions: leaderboard read all" ON public.deepwork_sessions;
CREATE POLICY "deepwork_sessions: leaderboard read all"
  ON public.deepwork_sessions
  FOR SELECT
  TO authenticated
  USING (true);
