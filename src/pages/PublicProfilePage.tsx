import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Brain, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';

interface PublicProfile {
  user_id: string;
  pseudo: string;
  avatar: string;
  total_xp: number;
  streak: number;
  total_deepwork_seconds: number;
  total_deepwork_sessions: number;
}

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [questsDone, setQuestsDone] = useState(0);
  const [loading, setLoading] = useState(true);

  // Redirect to own profile if same user
  useEffect(() => {
    if (user && userId === user.id) {
      navigate('/student/profile', { replace: true });
    }
  }, [user, userId]);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('user_id, pseudo, avatar, total_xp, streak, total_deepwork_seconds, total_deepwork_sessions')
        .eq('user_id', userId)
        .single();
      if (data) setProfile(data as PublicProfile);

      const { count } = await supabase
        .from('planning_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('validated', true);
      setQuestsDone(count ?? 0);

      setLoading(false);
    };
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Chargement…</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Profil introuvable.</p>
          <button onClick={() => navigate(-1)} className="text-primary text-sm hover:underline">
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  const totalXp = profile.total_xp ?? 0;
  const { level, currentXp, requiredXp } = calculateLevel(totalXp);
  const title = getTitleForLevel(level);
  const pct = Math.min(100, Math.round((currentXp / requiredXp) * 100));
  const deepworkHours = ((profile.total_deepwork_seconds ?? 0) / 3600).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 sticky top-0 z-30 backdrop-blur-sm"
              style={{ backgroundColor: 'hsl(222 22% 5% / 0.92)' }}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)}
                  className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="font-display font-semibold text-sm">Profil de {profile.pseudo}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Hero */}
          <div className="rounded-2xl border border-border p-6 mb-6 flex items-center gap-5"
               style={{ background: 'hsl(222 22% 8%)' }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2 shrink-0"
              style={{ borderColor: 'hsl(var(--primary) / 0.6)', background: 'hsl(222 22% 12%)' }}
            >
              {profile.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-xl font-black" style={{ color: 'hsl(42 12% 92%)' }}>
                {profile.pseudo}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-widest mt-0.5"
                 style={{ color: 'hsl(var(--primary))' }}>
                Niv. {level} — {title}
              </p>
              {/* XP bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>{currentXp.toLocaleString()} XP</span>
                  <span>{requiredXp.toLocaleString()} XP</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: 'hsl(var(--primary))' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Trophy size={16} />, label: 'XP total', value: totalXp.toLocaleString(), color: 'hsl(43 90% 55%)' },
              { icon: <Flame size={16} />, label: 'Série', value: `${profile.streak}j`, color: 'hsl(var(--streak))' },
              { icon: <Brain size={16} />, label: 'Deep Work', value: `${deepworkHours}h`, color: 'hsl(270 60% 70%)' },
              { icon: <Star size={16} />, label: 'Quêtes', value: questsDone.toString(), color: 'hsl(145 60% 55%)' },
            ].map(stat => (
              <div key={stat.label}
                   className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <p className="font-display text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  );
}
