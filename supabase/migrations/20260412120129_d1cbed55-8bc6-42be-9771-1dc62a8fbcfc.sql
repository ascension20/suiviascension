
ALTER TABLE public.daily_tasks ADD COLUMN method text DEFAULT '' NOT NULL;

ALTER TABLE public.exams ADD COLUMN grade_received boolean DEFAULT false NOT NULL;
