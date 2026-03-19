-- Insert the coach role for the existing coach user
INSERT INTO public.user_roles (user_id, role)
VALUES ('8a8b510e-08c7-4591-b65e-0bd456afb55a', 'coach')
ON CONFLICT (user_id, role) DO NOTHING;

-- Fix: allow self-insert on user_roles so setup page works for first coach
DROP POLICY IF EXISTS "Coach can manage roles" ON public.user_roles;
CREATE POLICY "Coach can manage roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'coach'::app_role) OR auth.uid() = user_id
  );

-- Ensure the trigger for auto-creating profiles exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();