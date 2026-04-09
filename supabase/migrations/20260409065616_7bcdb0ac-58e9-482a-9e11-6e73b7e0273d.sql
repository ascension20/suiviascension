
CREATE TABLE public.daily_tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  task_date date NOT NULL DEFAULT CURRENT_DATE,
  task_number integer NOT NULL CHECK (task_number BETWEEN 1 AND 3),
  description text NOT NULL,
  subject text NOT NULL DEFAULT 'Autre',
  completed boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, task_date, task_number)
);

ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own daily tasks" ON public.daily_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students create own daily tasks" ON public.daily_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own daily tasks" ON public.daily_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all daily tasks" ON public.daily_tasks FOR SELECT USING (has_role(auth.uid(), 'coach'::app_role));
