
-- 1. USER_ROLES
DROP POLICY IF EXISTS "Coach can manage roles" ON public.user_roles;

CREATE POLICY "Coach inserts any role"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Self insert student role"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'student');

CREATE OR REPLACE FUNCTION public.bootstrap_first_coach()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'coach') THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'coach') ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_coach() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_coach() TO authenticated;

-- 2. user_private
CREATE TABLE IF NOT EXISTS public.user_private (
  user_id uuid PRIMARY KEY,
  ical_url text,
  last_seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.user_private (user_id, ical_url, last_seen_at)
SELECT user_id, ical_url, last_seen_at FROM public.profiles
ON CONFLICT (user_id) DO NOTHING;

ALTER TABLE public.profiles DROP COLUMN IF EXISTS ical_url;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS last_seen_at;

ALTER TABLE public.user_private ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own private read" ON public.user_private FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach reads private" ON public.user_private FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Own private insert" ON public.user_private FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own private update" ON public.user_private FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Coach updates private" ON public.user_private FOR UPDATE USING (public.has_role(auth.uid(), 'coach'));

DROP TRIGGER IF EXISTS user_private_updated_at ON public.user_private;
CREATE TRIGGER user_private_updated_at
BEFORE UPDATE ON public.user_private
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, pseudo, avatar)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', 'Nouveau'),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '🐺'));
  INSERT INTO public.user_private (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

-- 3. EXAM-PHOTOS
UPDATE storage.buckets SET public = false WHERE id = 'exam-photos';

DROP POLICY IF EXISTS "Exam photos viewable by authenticated" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view exam photos" ON storage.objects;
DROP POLICY IF EXISTS "Exam photos: owner or coach" ON storage.objects;

CREATE POLICY "Exam photos: owner or coach"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'exam-photos'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.has_role(auth.uid(), 'coach')
  )
);

-- 4. Missing DELETE policies
CREATE POLICY "Students delete own exams"
ON public.exams FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Coach deletes any exam"
ON public.exams FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'coach'));

CREATE POLICY "Students delete own onboarding"
ON public.onboarding_data FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- 5. Drop fetch_ical_url SECURITY DEFINER + http extension
DROP FUNCTION IF EXISTS public.fetch_ical_url(text);
DROP EXTENSION IF EXISTS http;
