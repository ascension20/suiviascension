import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ALL_MODULES, type PhysicsModule, type ModuleLevel } from '@/lib/modules-data';
import { ModulePage } from './ModulePage';

interface Props {
  onXpGain?: (amount: number) => void;
}

export function ModulesTab({ onXpGain }: Props) {
  const { user, profile, updateProfile } = useAuth();
  const [completedByModule, setCompletedByModule] = useState<Record<string, Set<string>>>({});
  const [selected, setSelected] = useState<PhysicsModule | null>(null);

  // Charge la progression depuis Supabase
  const loadProgress = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('module_progress')
      .select('module_id, level_id')
      .eq('user_id', user.id);
    if (!data) return;
    const map: Record<string, Set<string>> = {};
    for (const row of data) {
      if (!map[row.module_id]) map[row.module_id] = new Set();
      map[row.module_id].add(row.level_id);
    }
    setCompletedByModule(map);
  }, [user]);

  useEffect(() => { loadProgress(); }, [loadProgress]);

  const handleComplete = useCallback(async (mod: PhysicsModule, level: ModuleLevel) => {
    if (!user || !profile) return;
    const set = completedByModule[mod.id] ?? new Set<string>();
    if (set.has(level.id)) return; // déjà complété

    // Insérer la progression
    await supabase.from('module_progress').insert({
      user_id: user.id,
      module_id: mod.id,
      level_id: level.id,
    });

    // Mettre à jour XP profil
    const newXp = (profile.total_xp ?? 0) + level.xpReward;
    await supabase.from('profiles').update({ total_xp: newXp }).eq('id', user.id);
    await supabase.from('xp_history').insert({
      user_id: user.id,
      amount: level.xpReward,
      source: `module:${mod.id}:${level.id}`,
    });

    updateProfile({ total_xp: newXp });
    onXpGain?.(level.xpReward);

    setCompletedByModule(prev => {
      const next = { ...prev };
      next[mod.id] = new Set([...(prev[mod.id] ?? []), level.id]);
      return next;
    });
  }, [user, profile, completedByModule, updateProfile, onXpGain]);

  if (selected) {
    const completedIds = completedByModule[selected.id] ?? new Set<string>();
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="module-page"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
        >
          <ModulePage
            module={selected}
            completedIds={completedIds}
            onComplete={(level) => handleComplete(selected, level)}
            onBack={() => setSelected(null)}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="module-list"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        className="space-y-4"
      >
        <p className="text-sm text-white/50 mb-2">
          Avance niveau par niveau. Chaque exercice se débloque après le précédent.
        </p>

        {/* Modules disponibles */}
        {ALL_MODULES.map(mod => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            completedIds={completedByModule[mod.id] ?? new Set()}
            onOpen={() => setSelected(mod)}
          />
        ))}

      </motion.div>
    </AnimatePresence>
  );
}

// ── Carte module ──────────────────────────────────────────────────────────────
function ModuleCard({
  mod,
  completedIds,
  onOpen,
}: {
  mod: PhysicsModule;
  completedIds: Set<string>;
  onOpen: () => void;
}) {
  const totalXp = mod.levels.reduce((s, l) => s + l.xpReward, 0);
  const earnedXp = mod.levels.filter(l => completedIds.has(l.id)).reduce((s, l) => s + l.xpReward, 0);
  const totalTime = mod.levels.reduce((s, l) => s + l.timeMin, 0);
  const pct = totalXp > 0 ? Math.round((earnedXp / totalXp) * 100) : 0;
  const completedCount = completedIds.size;

  const accentColor = `hsl(${mod.accentHsl})`;

  return (
    <motion.button
      onClick={onOpen}
      className="w-full bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-5 text-left transition-all"
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white/70"
              style={{ background: `${accentColor}22`, border: `1px solid ${accentColor}44` }}>
              {mod.subject} · {mod.level}
            </span>
          </div>
          <h3 className="font-bold text-white text-base">{mod.title}</h3>
          <p className="text-sm text-white/50">{mod.subtitle}</p>
        </div>
        <ChevronRight size={20} className="text-white/30 shrink-0 mt-1" />
      </div>

      {/* Barre de progression */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-white/50">{completedCount} / {mod.levels.length} niveaux</span>
          <span className="font-semibold" style={{ color: accentColor }}>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1.5">
          <Zap size={12} className="text-amber-400" />{earnedXp} / {totalXp} XP
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={12} />~{Math.round(totalTime / 60)} h de contenu
        </span>
      </div>
    </motion.button>
  );
}
