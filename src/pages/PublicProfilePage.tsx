import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Brain, Star, Trophy, Swords, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';
import { useAuth } from '@/hooks/useAuth';
import { buildAvataaarsUrl } from '@/components/avatar/Avatar';
import { DEFAULT_AVATAR_CONFIG } from '@/lib/avatar/types';
import type { AvatarConfig } from '@/lib/avatar/types';

interface PublicProfile {
  user_id: string;
  pseudo: string;
  total_xp: number;
  streak: number;
  total_deepwork_seconds: number;
  total_deepwork_sessions: number;
}

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile]           = useState<PublicProfile | null>(null);
  const [avatarUrl, setAvatarUrl]        = useState<string | null>(null);
  const [questsDone, setQuestsDone]      = useState(0);
  const [specialties, setSpecialties]    = useState<string[]>([]);
  const [schoolLevel, setSchoolLevel]    = useState<string | null>(null);
  const [loading, setLoading]            = useState(true);

  // Redirect to own profile if same user
  useEffect(() => {
    if (user && userId === user.id) {
      navigate('/student/profile', { replace: true });
    }
  }, [user, userId, navigate]);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      setLoading(true);

      const [profRes, avatarRes, questsRes, onbRes] = await Promise.all([
        // Profile stats
        supabase
          .from('profiles')
          .select('user_id, pseudo, total_xp, streak, total_deepwork_seconds, total_deepwork_sessions')
          .eq('user_id', userId)
          .single(),

        // Avatar config
        supabase
          .from('avatar_configs')
          .select('hat, glasses, outfit, background, badge, skin_color, hair_style, hair_color')
          .eq('user_id', userId)
          .maybeSingle(),

        // Quests completed
        supabase
          .from('planning_events')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('validated', true),

        // Specialties + class from onboarding
        supabase
          .from('onboarding_data')
          .select('specialties, school_level')
          .eq('user_id', userId)
          .maybeSingle(),
      ]);

      if (profRes.data) {
        setProfile(profRes.data as PublicProfile);

        // Build DiceBear avatar URL
        const ac = avatarRes.data;
        const cfg: AvatarConfig = ac ? {
          hat:        ac.hat        ?? null,
          glasses:    ac.glasses    ?? null,
          outfit:     ac.outfit     ?? null,
          background: ac.background ?? DEFAULT_AVATAR_CONFIG.background,
          badge:      ac.badge      ?? null,
          skinColor:  ac.skin_color ?? DEFAULT_AVATAR_CONFIG.skinColor,
          hairStyle:  ac.hair_style ?? DEFAULT_AVATAR_CONFIG.hairStyle,
          hairColor:  ac.hair_color ?? DEFAULT_AVATAR_CONFIG.hairColor,
        } : DEFAULT_AVATAR_CONFIG;
        setAvatarUrl(buildAvataaarsUrl(cfg, profRes.data.pseudo || userId));
      }

      setQuestsDone(questsRes.count ?? 0);

      if (onbRes.data) {
        setSpecialties((onbRes.data.specialties as string[]) ?? []);
        setSchoolLevel(onbRes.data.school_level ?? null);
      }

      setLoading(false);
    };
    load();
  }, [userId]);

  /* ── helpers ── */
  const fmtDeepwork = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} h`;
    return `${h} h ${String(m).padStart(2, '0')}`;
  };

  /* ── loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm animate-pulse">Chargement…</div>
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

  const stats = [
    {
      icon: <Trophy size={16} />,
      label: 'XP total',
      value: totalXp.toLocaleString('fr-FR'),
      color: 'hsl(43 90% 55%)',
      borderColor: 'hsl(43 90% 50% / 0.25)',
      bg: 'hsl(43 90% 50% / 0.08)',
    },
    {
      icon: <Flame size={16} />,
      label: 'Série',
      value: `${profile.streak} j`,
      color: 'hsl(var(--streak))',
      borderColor: 'hsl(var(--streak) / 0.25)',
      bg: 'hsl(var(--streak) / 0.08)',
    },
    {
      icon: <Brain size={16} />,
      label: 'Deep Work',
      value: fmtDeepwork(profile.total_deepwork_seconds ?? 0),
      color: 'hsl(270 60% 70%)',
      borderColor: 'hsl(270 60% 60% / 0.25)',
      bg: 'hsl(270 60% 60% / 0.08)',
    },
    {
      icon: <Swords size={16} />,
      label: 'Quêtes',
      value: String(questsDone),
      color: 'hsl(345 80% 65%)',
      borderColor: 'hsl(345 80% 60% / 0.25)',
      bg: 'hsl(345 80% 60% / 0.08)',
    },
    {
      icon: <Star size={16} />,
      label: 'Sessions',
      value: String(profile.total_deepwork_sessions ?? 0),
      color: 'hsl(142 60% 55%)',
      borderColor: 'hsl(142 71% 45% / 0.25)',
      bg: 'hsl(142 71% 45% / 0.08)',
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header
        className="border-b border-border px-4 py-3 sticky top-0 z-30 backdrop-blur-sm hud-top-line"
        style={{ backgroundColor: 'hsl(222 22% 5% / 0.92)' }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="font-display font-semibold text-sm">Profil de {profile.pseudo}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* ── Hero card ── */}
          <div
            className="relative rounded-2xl border border-border p-6 overflow-hidden"
            style={{ background: 'hsl(222 22% 8%)', boxShadow: '0 0 50px hsl(43 90% 50% / 0.06)' }}
          >
            {/* top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="flex items-center gap-5">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: 'hsl(var(--primary) / 0.5)', background: 'hsl(222 22% 12%)' }}
                >
                  {avatarUrl
                    ? <img src={avatarUrl} alt={profile.pseudo} className="w-full h-full object-cover" />
                    : <span className="w-full h-full flex items-center justify-center"><User size={32} style={{ color: 'hsl(220 10% 50%)' }} /></span>
                  }
                </div>
                {/* LVL badge */}
                <div
                  className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg border text-[10px] font-display font-bold"
                  style={{
                    background: 'hsl(43 90% 50%)',
                    borderColor: 'hsl(43 90% 70% / 0.5)',
                    color: 'hsl(222 22% 8%)',
                  }}
                >
                  LVL {level}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-xl font-black truncate" style={{ color: 'hsl(42 12% 92%)' }}>
                  {profile.pseudo}
                </h1>

                {/* Titre + classe */}
                <div className="flex items-center gap-2 flex-wrap mt-0.5 mb-2">
                  <p className="text-sm font-semibold" style={{ color: 'hsl(var(--primary) / 0.85)' }}>
                    {title}
                  </p>
                  {schoolLevel && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: 'hsl(43 90% 50% / 0.12)',
                        color: 'hsl(43 90% 60%)',
                        border: '1px solid hsl(43 90% 50% / 0.25)',
                      }}
                    >
                      {schoolLevel}
                    </span>
                  )}
                </div>

                {/* Spécialités */}
                {specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specialties.map(s => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'hsl(270 60% 50% / 0.12)',
                          color: 'hsl(270 60% 70%)',
                          border: '1px solid hsl(270 60% 50% / 0.25)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* XP bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{currentXp.toLocaleString('fr-FR')} XP</span>
                    <span>{requiredXp.toLocaleString('fr-FR')} XP</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: 'hsl(var(--primary))' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats grid ── */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center"
                style={{ borderColor: stat.borderColor, backgroundColor: stat.bg }}
              >
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <p className="font-display text-lg font-black leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wide leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </motion.div>
      </main>
    </div>
  );
}
