CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high');
ALTER TABLE public.student_tasks ADD COLUMN priority task_priority NOT NULL DEFAULT 'medium';