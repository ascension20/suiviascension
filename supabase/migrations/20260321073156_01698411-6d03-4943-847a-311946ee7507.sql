
-- Add custom_subject column to tables that use subject_type
ALTER TABLE public.exams ADD COLUMN custom_subject text;
ALTER TABLE public.difficulties ADD COLUMN custom_subject text;
ALTER TABLE public.student_tasks ADD COLUMN custom_subject text;
