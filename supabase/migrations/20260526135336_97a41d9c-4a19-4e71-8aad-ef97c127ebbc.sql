
-- Trigger-only functions: revoke execute from API roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Bootstrap: only authenticated users (not anon)
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_coach() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.bootstrap_first_coach() TO authenticated;

-- has_role: needed by RLS (called via auth.uid()); revoke from anon explicitly
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
