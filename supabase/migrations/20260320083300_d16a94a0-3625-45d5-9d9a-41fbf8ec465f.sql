-- Create storage bucket for exam photos
INSERT INTO storage.buckets (id, name, public) VALUES ('exam-photos', 'exam-photos', true);

-- RLS: Students can upload their own exam photos
CREATE POLICY "Students upload own exam photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'exam-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- RLS: Anyone authenticated can view exam photos
CREATE POLICY "Authenticated users can view exam photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'exam-photos');

-- RLS: Students can delete own photos
CREATE POLICY "Students delete own exam photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'exam-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Add photo_url column to exams table
ALTER TABLE public.exams ADD COLUMN photo_url text DEFAULT NULL;