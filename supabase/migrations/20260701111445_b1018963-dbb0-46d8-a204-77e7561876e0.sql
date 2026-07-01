CREATE POLICY "Authenticated users can read module-pdfs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'module-pdfs');

CREATE POLICY "Coaches can upload module-pdfs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'module-pdfs'
  AND public.has_role(auth.uid(), 'coach')
);

CREATE POLICY "Coaches can update module-pdfs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'module-pdfs'
  AND public.has_role(auth.uid(), 'coach')
)
WITH CHECK (
  bucket_id = 'module-pdfs'
  AND public.has_role(auth.uid(), 'coach')
);

CREATE POLICY "Coaches can delete module-pdfs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'module-pdfs'
  AND public.has_role(auth.uid(), 'coach')
);