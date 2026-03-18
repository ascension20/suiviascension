
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('coach', 'student');

-- Enum for subjects
CREATE TYPE public.subject_type AS ENUM ('Maths', 'Français', 'Physique', 'SES', 'Anglais', 'Autre');

-- Enum for difficulty
CREATE TYPE public.difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Enum for stress level
CREATE TYPE public.stress_level AS ENUM ('stressed', 'neutral', 'calm');

-- Enum for issue severity
CREATE TYPE public.issue_severity AS ENUM ('blocking', 'fragile', 'ok');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  pseudo TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🐺',
  total_xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Coach can update any profile" ON public.profiles FOR UPDATE USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Coach can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'coach') OR auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Coach can manage roles" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'coach'));

-- Quests (coach-assigned)
CREATE TABLE public.quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  subject subject_type NOT NULL,
  difficulty difficulty_level NOT NULL DEFAULT 'medium',
  xp_reward INTEGER NOT NULL DEFAULT 100,
  deadline TIMESTAMPTZ,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own quests" ON public.quests FOR SELECT USING (auth.uid() = assigned_to);
CREATE POLICY "Coach sees all quests" ON public.quests FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Coach can create quests" ON public.quests FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Coach can update quests" ON public.quests FOR UPDATE USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Students can complete own quests" ON public.quests FOR UPDATE USING (auth.uid() = assigned_to);
CREATE POLICY "Coach can delete quests" ON public.quests FOR DELETE USING (public.has_role(auth.uid(), 'coach'));

-- Student tasks (self-created)
CREATE TABLE public.student_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject subject_type NOT NULL,
  description TEXT NOT NULL,
  estimated_minutes INTEGER,
  deadline TIMESTAMPTZ,
  difficulty difficulty_level NOT NULL DEFAULT 'medium',
  xp_reward INTEGER NOT NULL DEFAULT 70,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.student_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own tasks" ON public.student_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all tasks" ON public.student_tasks FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Students create own tasks" ON public.student_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own tasks" ON public.student_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students delete own tasks" ON public.student_tasks FOR DELETE USING (auth.uid() = user_id);

-- Timer sessions
CREATE TABLE public.timer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject subject_type NOT NULL,
  duration_minutes INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.timer_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own sessions" ON public.timer_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all sessions" ON public.timer_sessions FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Students create own sessions" ON public.timer_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exams
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject subject_type NOT NULL,
  exam_date DATE NOT NULL,
  chapters TEXT,
  stress_level stress_level NOT NULL DEFAULT 'neutral',
  grade NUMERIC(4,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own exams" ON public.exams FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all exams" ON public.exams FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Students create own exams" ON public.exams FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own exams" ON public.exams FOR UPDATE USING (auth.uid() = user_id);

-- Difficulties journal
CREATE TABLE public.difficulties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject subject_type NOT NULL,
  description TEXT NOT NULL,
  severity issue_severity NOT NULL DEFAULT 'fragile',
  resolved BOOLEAN NOT NULL DEFAULT false,
  coach_reply TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.difficulties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own difficulties" ON public.difficulties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all difficulties" ON public.difficulties FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Students create own difficulties" ON public.difficulties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students update own difficulties" ON public.difficulties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Coach can update difficulties" ON public.difficulties FOR UPDATE USING (public.has_role(auth.uid(), 'coach'));

-- Badges
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_key TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_key)
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own badges" ON public.badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coach sees all badges" ON public.badges FOR SELECT USING (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "System can insert badges" ON public.badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup (for students created by coach)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, pseudo, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', 'Nouveau'),
    COALESCE(NEW.raw_user_meta_data->>'avatar', '🐺')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
