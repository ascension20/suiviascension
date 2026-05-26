-- Permet à tous les élèves de lire les sessions deepwork pour le classement chrono.
-- La policy existante "Students see own deepwork" reste en place (OR logic en RLS).
CREATE POLICY "deepwork_sessions: leaderboard read all"
  ON public.deepwork_sessions
  FOR SELECT
  USING (true);
