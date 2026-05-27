import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'coach' | 'student';

interface Profile {
  id: string;
  user_id: string;
  pseudo: string;
  avatar: string;
  total_xp: number;
  streak: number;
  last_activity_date: string | null;
  onboarding_completed?: boolean;
  tutorial_completed?: boolean;
  // ical_url moved to user_private table
  today_xp?: number;
  today_xp_date?: string | null;
  total_deepwork_seconds?: number;
  total_deepwork_sessions?: number;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  /** Synchronously merge `updates` into the in-memory profile.
   *  Use this right before a navigate() call to avoid race conditions
   *  where the DB has been updated but the React state hasn't caught up yet. */
  updateProfile: (updates: Partial<Profile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    const [profileRes, roleRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', userId).single(),
      supabase.from('user_roles').select('role').eq('user_id', userId).single(),
    ]);
    if (profileRes.data) setProfile(profileRes.data as Profile);

    if (roleRes.data) {
      setRole(roleRes.data.role as AppRole);
    } else {
      // Self-heal: no role row found (migration may not have run yet).
      // RLS allows a user to insert their own 'student' role, so try that.
      const { data: healed } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'student' })
        .select('role')
        .single();
      // Even if the insert fails (e.g. row already exists race), default to student.
      setRole((healed?.role as AppRole) ?? 'student');
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchUserData(user.id);
  };

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  useEffect(() => {
    let mounted = true;

    // Initial load: keep loading=true until session + user data are both ready.
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserData(session.user.id);
      }
      if (mounted) setLoading(false);
    };

    init();

    // Subsequent auth state changes (sign-in / sign-out after initial load).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // fetchUserData uses only PostgREST (not supabase.auth.*) so no deadlock risk.
        fetchUserData(session.user.id);
      } else {
        setProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, role, loading, signIn, signOut, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
