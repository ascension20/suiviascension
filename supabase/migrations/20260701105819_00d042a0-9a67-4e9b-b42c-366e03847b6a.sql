
-- 1. UPDATE policy on exam-photos storage bucket (mirror INSERT policy)
CREATE POLICY "Users can update own exam photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'exam-photos' AND (storage.foldername(name))[1] = auth.uid()::text)
WITH CHECK (bucket_id = 'exam-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 2. Restrict DELETE on user_roles: only coaches may delete rows.
--    Prevents a student deleting their own student row and re-inserting as coach.
DROP POLICY IF EXISTS "Users can delete their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Self delete role" ON public.user_roles;

CREATE POLICY "Only coaches can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'coach'));
