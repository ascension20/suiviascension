
-- 1. xp_history: restrict SELECT
DROP POLICY IF EXISTS "xp_history: leaderboard read all" ON public.xp_history;
CREATE POLICY "xp_history: users read own"
  ON public.xp_history FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "xp_history: coach reads all"
  ON public.xp_history FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'coach'::app_role));

-- 2. student_achievements: restrict SELECT
DROP POLICY IF EXISTS "student_achievements: public read" ON public.student_achievements;
CREATE POLICY "student_achievements: users read own"
  ON public.student_achievements FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "student_achievements: coach reads all"
  ON public.student_achievements FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'coach'::app_role));

-- 3. exam-photos: remove overly broad SELECT policy if present
DROP POLICY IF EXISTS "Authenticated users can view exam photos" ON storage.objects;

-- 4. onboarding_data: drop duplicated ical_url column
ALTER TABLE public.onboarding_data DROP COLUMN IF EXISTS ical_url;
