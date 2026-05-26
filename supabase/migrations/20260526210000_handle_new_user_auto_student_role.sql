-- Auto-assign 'student' role on signup so new users always have a role.
-- The previous handle_new_user() only created profiles + user_private
-- but NOT user_roles, causing ProtectedRoute to spin forever after signup.

-- 1. Update the trigger function to also create the student role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, pseudo, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', 'Nouveau'),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '🐺')
  )
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_private (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Every user who signs up via onboarding gets the student role by default.
  -- Coaches are promoted separately via bootstrap_first_coach().
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 2. Backfill: give a student role to any existing profile that has none.
--    This fixes accounts created before this migration (repeated test runs, etc.)
INSERT INTO public.user_roles (user_id, role)
SELECT p.user_id, 'student'::app_role
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.user_id
WHERE ur.user_id IS NULL
ON CONFLICT (user_id, role) DO NOTHING;
