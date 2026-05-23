
-- Planning events
CREATE TYPE public.event_type AS ENUM ('course', 'quest', 'ds');
CREATE TYPE public.event_source AS ENUM ('manual', 'ical');

CREATE TABLE public.planning_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type public.event_type NOT NULL,
  title TEXT NOT NULL,
  subject TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  description TEXT,
  linked_quest_id UUID,
  source public.event_source NOT NULL DEFAULT 'manual',
  ical_uid TEXT,
  validated BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.planning_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own events" ON public.planning_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all events" ON public.planning_events FOR SELECT USING (has_role(auth.uid(), 'coach'));
CREATE POLICY "Students create own events" ON public.planning_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own events" ON public.planning_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students delete own events" ON public.planning_events FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Coach can manage all events" ON public.planning_events FOR ALL USING (has_role(auth.uid(), 'coach'));

CREATE TRIGGER trg_planning_events_updated_at BEFORE UPDATE ON public.planning_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_planning_events_user_date ON public.planning_events(user_id, event_date);

-- Deepwork sessions
CREATE TABLE public.deepwork_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  duration_seconds INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.deepwork_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own deepwork" ON public.deepwork_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all deepwork" ON public.deepwork_sessions FOR SELECT USING (has_role(auth.uid(), 'coach'));
CREATE POLICY "Students insert own deepwork" ON public.deepwork_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_deepwork_user_created ON public.deepwork_sessions(user_id, created_at DESC);

-- Onboarding data
CREATE TABLE public.onboarding_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  language TEXT NOT NULL DEFAULT 'fr',
  timezone TEXT NOT NULL DEFAULT 'Europe/Paris',
  school_level TEXT,
  school_name TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  options TEXT[] NOT NULL DEFAULT '{}',
  goals TEXT,
  activities TEXT[] NOT NULL DEFAULT '{}',
  other_activity TEXT,
  ical_url TEXT,
  engagement_signed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own onboarding" ON public.onboarding_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all onboarding" ON public.onboarding_data FOR SELECT USING (has_role(auth.uid(), 'coach'));
CREATE POLICY "Students upsert own onboarding" ON public.onboarding_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own onboarding" ON public.onboarding_data FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER trg_onboarding_updated_at BEFORE UPDATE ON public.onboarding_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Initial grades from onboarding
CREATE TABLE public.initial_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  subject TEXT NOT NULL,
  grade NUMERIC(4,2),
  coefficient NUMERIC(4,2) NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.initial_grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own initial grades" ON public.initial_grades FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all initial grades" ON public.initial_grades FOR SELECT USING (has_role(auth.uid(), 'coach'));
CREATE POLICY "Students insert own initial grades" ON public.initial_grades FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own initial grades" ON public.initial_grades FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students delete own initial grades" ON public.initial_grades FOR DELETE USING (auth.uid() = user_id);

-- Extend profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS ical_url TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS tutorial_completed BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS today_xp INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS today_xp_date DATE,
  ADD COLUMN IF NOT EXISTS total_deepwork_seconds INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_deepwork_sessions INTEGER NOT NULL DEFAULT 0;
