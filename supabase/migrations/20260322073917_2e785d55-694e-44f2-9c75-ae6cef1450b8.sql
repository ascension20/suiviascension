
-- Add class_level and last_seen_at to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS class_level text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_seen_at timestamptz;

-- Update RLS: coach can update class_level (already has update policy)
-- Students can read all profiles for leaderboard
CREATE POLICY "All authenticated can view profiles for leaderboard"
ON public.profiles FOR SELECT TO authenticated
USING (true);

-- Drop old restrictive select policies that conflict
DROP POLICY IF EXISTS "Coach can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
