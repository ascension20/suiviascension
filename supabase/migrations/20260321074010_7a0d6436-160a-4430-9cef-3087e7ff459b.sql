
-- Baseline snapshots for before/after comparison
CREATE TABLE public.student_baselines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  initial_total_xp integer NOT NULL DEFAULT 0,
  initial_streak integer NOT NULL DEFAULT 0,
  initial_total_hours integer NOT NULL DEFAULT 0,
  initial_grades jsonb NOT NULL DEFAULT '{}'::jsonb,
  initial_quest_completion_rate integer NOT NULL DEFAULT 0,
  UNIQUE (user_id)
);

ALTER TABLE public.student_baselines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coach sees all baselines" ON public.student_baselines FOR SELECT TO public USING (has_role(auth.uid(), 'coach'::app_role));
CREATE POLICY "Students see own baseline" ON public.student_baselines FOR SELECT TO public USING (auth.uid() = user_id);
CREATE POLICY "Coach can insert baselines" ON public.student_baselines FOR INSERT TO public WITH CHECK (has_role(auth.uid(), 'coach'::app_role));
CREATE POLICY "Coach can update baselines" ON public.student_baselines FOR UPDATE TO public USING (has_role(auth.uid(), 'coach'::app_role));

-- AI generated weekly plans
CREATE TABLE public.weekly_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL,
  plan_content text NOT NULL,
  week_start date NOT NULL,
  validated boolean NOT NULL DEFAULT false,
  validated_at timestamptz
);

ALTER TABLE public.weekly_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Coach sees all plans" ON public.weekly_plans FOR SELECT TO public USING (has_role(auth.uid(), 'coach'::app_role));
CREATE POLICY "Students see own plans" ON public.weekly_plans FOR SELECT TO public USING (auth.uid() = user_id);
CREATE POLICY "Coach can insert plans" ON public.weekly_plans FOR INSERT TO public WITH CHECK (has_role(auth.uid(), 'coach'::app_role));
CREATE POLICY "Coach can update plans" ON public.weekly_plans FOR UPDATE TO public USING (has_role(auth.uid(), 'coach'::app_role));

-- Enable realtime for weekly_plans so student sees validated plan
ALTER PUBLICATION supabase_realtime ADD TABLE public.weekly_plans;
