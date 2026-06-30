import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Lock, CheckCircle2, Clock, Zap, Download, BookOpen, FileText, PenLine, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  ALL_MODULES, TIER_META, DIFF_LABEL,
  type PhysicsModule, type ModuleLevel,
} from '@/lib/modules-data';

interface Props {
  onXpGain?: (amount: number) => void;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function hsl(h: string) { return `hsl(${h})`; }
function hsla(h: string, a: number) { return `hsl(${h} / ${a})`; }

function getTierMeta(tier: ModuleLevel['tier']) {
  return TIER_META.find(t => t.tier === tier) ?? TIER_META[0];
}

function totalModuleXp(mod: PhysicsModule) {
  return mod.levels.reduce((s, l) => s + l.xpReward, 0);
}

// ── SubjectBadge ─────────────────────────────────────────────────────────────
function SubjectBadge({ subject }: { subject: string }) {
  const hslStr = subject === 'Physique' ? '205 85% 60%' : '270 60% 62%';
  return (
    <span
      className="text-[9px] font-black tracking-widest px-2 py-[3px]"
      style={{
        background: hsla(hslStr, 0.15),
        color: hsl(hslStr),
        clipPath: 'polygon(4px 0%,calc(100% - 4px) 0%,100% 4px,100% calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,0% calc(100% - 4px),0% 4px)',
      }}
    >
      {subject.toUpperCase()}
    </span>
  );
}

// ── DiffBadge ────────────────────────────────────────────────────────────────
function DiffBadge({ difficulty }: { difficulty: ModuleLevel['difficulty'] }) {
  const tm = getTierMeta(difficulty as ModuleLevel['tier']);
  return (
    <span
      className="text-[9px] font-black tabular-nums"
      style={{ color: hsl(tm.hsl) }}
    >
      {DIFF_LABEL[difficulty]}
    </span>
  );
}

// ── PDF download button ───────────────────────────────────────────────────────
function PdfButton({ href, label, Icon }: { href: string | null; label: string; Icon: typeof BookOpen }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
    >
      <Icon size={12} />
      {label}
      <Download size={10} className="opacity-50" />
    </a>
  );
}

// ── Module card (list view) ───────────────────────────────────────────────────
function ModuleCard({
  mod,
  completedCount,
  earnedXp,
  onClick,
}: {
  mod: PhysicsModule;
  completedCount: number;
  earnedXp: number;
  onClick: () => void;
}) {
  const pct = mod.levels.length > 0 ? (completedCount / mod.levels.length) * 100 : 0;
  const totalXp = totalModuleXp(mod);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full text-left rounded-xl border bg-card p-4 transition-all duration-150 hover:border-primary/30 group"
      style={{
        borderColor: pct > 0 ? hsla(mod.accentHsl, 0.35) : 'hsl(var(--border))',
        boxShadow: pct > 0 ? `0 0 20px ${hsla(mod.accentHsl, 0.07)}` : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SubjectBadge subject={mod.subject} />
          <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wide">{mod.level}</span>
        </div>
        <ChevronRight size={14} className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0 mt-0.5" />
      </div>

      <h3
        className="font-display font-bold text-base leading-tight mb-0.5"
        style={{ color: pct > 0 ? hsl(mod.accentHsl) : 'hsl(var(--foreground))' }}
      >
        {mod.title}
      </h3>
      <p className="text-[11px] text-muted-foreground mb-4">{mod.subtitle}</p>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono text-muted-foreground">
            {completedCount}/{mod.levels.length} niveaux
          </span>
          <span className="text-[10px] font-bold tabular-nums" style={{ color: hsl('43 90% 52%') }}>
            +{earnedXp} / {totalXp} XP
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${hsl(mod.accentHsl)}, ${hsl('43 90% 52%')})`,
              boxShadow: pct > 0 ? `0 0 8px ${hsla(mod.accentHsl, 0.5)}` : 'none',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.button>
  );
}

// ── Level node ───────────────────────────────────────────────────────────────
function LevelNode({
  level,
  status,
  isLast,
  tierHsl,
  onComplete,
  completing,
}: {
  level: ModuleLevel;
  status: 'completed' | 'current' | 'locked';
  isLast: boolean;
  tierHsl: string;
  onComplete: () => void;
  completing: boolean;
}) {
  const isCompleted = status === 'completed';
  const isCurrent   = status === 'current';
  const isLocked    = status === 'locked';

  return (
    <div className="flex gap-3">
      {/* Node + connector */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
        {/* Circle */}
        <div className="relative flex-shrink-0">
          {isCurrent && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: hsl(tierHsl) }}
            />
          )}
          <div
            className="relative w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-[11px] transition-all duration-300"
            style={
              isCompleted ? {
                background: hsla(tierHsl, 0.2),
                borderColor: hsl(tierHsl),
                color: hsl(tierHsl),
              } : isCurrent ? {
                background: `linear-gradient(135deg, ${hsla(tierHsl, 0.3)}, ${hsla(tierHsl, 0.1)})`,
                borderColor: hsl(tierHsl),
                color: hsl(tierHsl),
                boxShadow: `0 0 16px ${hsla(tierHsl, 0.5)}`,
              } : {
                background: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--muted-foreground))',
              }
            }
          >
            {isCompleted ? (
              <CheckCircle2 size={14} />
            ) : isLocked ? (
              <Lock size={11} />
            ) : (
              <span>{level.number === 0 ? 'Q' : level.number}</span>
            )}
          </div>
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1 min-h-[24px]"
            style={{
              background: isCompleted
                ? `linear-gradient(to bottom, ${hsl(tierHsl)}, ${hsla(tierHsl, 0.3)})`
                : 'hsl(var(--border))',
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-lg border p-3 mb-3 transition-all duration-200"
        style={{
          borderColor: isCompleted
            ? hsla(tierHsl, 0.3)
            : isCurrent
            ? hsla(tierHsl, 0.4)
            : 'hsl(var(--border))',
          background: isCompleted
            ? hsla(tierHsl, 0.05)
            : isCurrent
            ? hsla(tierHsl, 0.07)
            : 'hsl(var(--card))',
          opacity: isLocked ? 0.5 : 1,
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p
            className="text-sm font-semibold leading-snug flex-1"
            style={{ color: isLocked ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))' }}
          >
            {level.number > 0 && (
              <span className="text-muted-foreground/50 font-mono mr-1.5 text-xs">{level.number}.</span>
            )}
            {level.title}
          </p>
          <span
            className="text-[10px] font-black tabular-nums flex-shrink-0"
            style={{ color: isCompleted ? hsl('43 90% 52%') : 'hsl(var(--muted-foreground))' }}
          >
            +{level.xpReward} XP
          </span>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{level.description}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <Clock size={10} />{level.timeMin} min
            </span>
            <span className="text-[10px] font-mono" style={{ color: hsla(tierHsl, 0.8) }}>
              {level.notion}
            </span>
            <DiffBadge difficulty={level.difficulty} />
          </div>

          {isCurrent && (
            <motion.button
              onClick={onComplete}
              disabled={completing}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-black tracking-wide transition-all disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${hsl(tierHsl)}, ${hsl('43 90% 52%')})`,
                color: 'hsl(222 22% 6%)',
                boxShadow: `0 0 12px ${hsla(tierHsl, 0.4)}`,
              }}
            >
              <Zap size={11} />
              {completing ? 'Enregistrement…' : 'Terminé !'}
            </motion.button>
          )}

          {isCompleted && (
            <span className="flex items-center gap-1 text-[10px] font-black" style={{ color: hsl(tierHsl) }}>
              <CheckCircle2 size={11} /> Complété
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Level Map (module detail view) ───────────────────────────────────────────
function LevelMap({
  mod,
  completedIds,
  earnedXp,
  onBack,
  onComplete,
  completing,
}: {
  mod: PhysicsModule;
  completedIds: Set<string>;
  earnedXp: number;
  onBack: () => void;
  onComplete: (level: ModuleLevel) => void;
  completing: string | null;
}) {
  const totalXp    = totalModuleXp(mod);
  const totalLevels = mod.levels.length;
  const doneCount  = completedIds.size;
  const pct        = totalLevels > 0 ? (doneCount / totalLevels) * 100 : 0;

  // Determine status of each level
  function getStatus(level: ModuleLevel): 'completed' | 'current' | 'locked' {
    if (completedIds.has(level.id)) return 'completed';
    const prev = mod.levels.find(l => l.number === level.number - 1);
    if (level.number === 0 || (prev && completedIds.has(prev.id))) return 'current';
    return 'locked';
  }

  // Group levels by tier
  const tiers = TIER_META.map(tm => ({
    ...tm,
    levels: mod.levels.filter(l => l.tier === tm.tier),
  })).filter(t => t.levels.length > 0);

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-0.5 flex-shrink-0"
        >
          <ChevronLeft size={14} />
          Modules
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <SubjectBadge subject={mod.subject} />
            <span className="text-[10px] font-mono text-muted-foreground/50">{mod.level}</span>
          </div>
          <h2 className="font-display font-bold text-lg leading-tight" style={{ color: hsl(mod.accentHsl) }}>
            {mod.title}
          </h2>
        </div>
      </div>

      {/* PDFs */}
      {(mod.pdfCours || mod.pdfFiche || mod.pdfExercices) && (
        <div className="flex flex-wrap gap-2">
          <PdfButton href={mod.pdfCours}     label="Cours"     Icon={BookOpen} />
          <PdfButton href={mod.pdfFiche}     label="Fiche"     Icon={FileText} />
          <PdfButton href={mod.pdfExercices} label="Exercices" Icon={PenLine}  />
        </div>
      )}

      {/* Progress summary */}
      <div
        className="rounded-lg border p-3"
        style={{ borderColor: hsla(mod.accentHsl, 0.25), background: hsla(mod.accentHsl, 0.05) }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-muted-foreground">{doneCount}/{totalLevels} niveaux complétés</span>
          <span className="text-xs font-black tabular-nums" style={{ color: hsl('43 90% 52%') }}>
            {earnedXp} / {totalXp} XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${hsl(mod.accentHsl)}, ${hsl('43 90% 52%')})`,
              boxShadow: pct > 0 ? `0 0 8px ${hsla(mod.accentHsl, 0.5)}` : 'none',
            }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Level map */}
      <div className="space-y-6">
        {tiers.map(tier => (
          <div key={tier.tier}>
            {/* Tier header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ background: hsla(tier.hsl, 0.2) }} />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: hsl(tier.hsl) }}>
                  {tier.label}
                </span>
                <span className="text-[9px] text-muted-foreground/50 font-mono">{tier.sub}</span>
              </div>
              <div className="h-px flex-1" style={{ background: hsla(tier.hsl, 0.2) }} />
            </div>

            {/* Levels */}
            {tier.levels.map((level, idx) => (
              <LevelNode
                key={level.id}
                level={level}
                status={getStatus(level)}
                isLast={idx === tier.levels.length - 1}
                tierHsl={tier.hsl}
                onComplete={() => onComplete(level)}
                completing={completing === level.id}
              />
            ))}
          </div>
        ))}
      </div>

      {doneCount === totalLevels && totalLevels > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border p-6 text-center"
          style={{
            borderColor: hsla('43 90% 52%', 0.4),
            background: hsla('43 90% 52%', 0.07),
            boxShadow: `0 0 30px ${hsla('43 90% 52%', 0.1)}`,
          }}
        >
          <p className="text-2xl mb-2">🏆</p>
          <p className="font-display font-black text-lg" style={{ color: hsl('43 90% 52%') }}>
            Module complété !
          </p>
          <p className="text-xs text-muted-foreground mt-1">{totalXp} XP gagnés sur ce module</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export function ModulesTab({ onXpGain }: Props) {
  const { user, profile, updateProfile } = useAuth();
  const [selectedModule, setSelectedModule] = useState<PhysicsModule | null>(null);
  const [completedIds, setCompletedIds]     = useState<Set<string>>(new Set());
  const [earnedXpMap, setEarnedXpMap]       = useState<Record<string, number>>({});  // moduleId → xp
  const [completing, setCompleting]         = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter]   = useState<'all' | 'Physique' | 'Maths'>('all');

  const loadProgress = useCallback(async (moduleId: string) => {
    if (!user) return;
    const { data } = await supabase
      .from('module_progress')
      .select('level_id, xp_earned')
      .eq('user_id', user.id)
      .eq('module_id', moduleId);
    if (data) {
      setCompletedIds(new Set(data.map(r => r.level_id)));
      const xp = data.reduce((s, r) => s + (r.xp_earned ?? 0), 0);
      setEarnedXpMap(prev => ({ ...prev, [moduleId]: xp }));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    // Pre-load progress counts for all modules to show on cards
    const loadAll = async () => {
      for (const mod of ALL_MODULES) {
        await loadProgress(mod.id);
      }
    };
    loadAll();
  }, [user, loadProgress]);

  useEffect(() => {
    if (selectedModule) loadProgress(selectedModule.id);
  }, [selectedModule, loadProgress]);

  const handleComplete = useCallback(async (level: ModuleLevel) => {
    if (!user || !selectedModule || completing) return;
    setCompleting(level.id);

    try {
      // 1. Insert progress record
      const { error } = await supabase.from('module_progress').insert({
        user_id:   user.id,
        module_id: selectedModule.id,
        level_id:  level.id,
        xp_earned: level.xpReward,
      });
      if (error && error.code !== '23505') throw error;  // 23505 = unique violation (déjà complété)

      // 2. Update total_xp in profiles + xp_history
      const currentXp = profile?.total_xp ?? 0;
      await Promise.all([
        supabase.from('profiles').update({ total_xp: currentXp + level.xpReward }).eq('user_id', user.id),
        supabase.from('xp_history').insert({ user_id: user.id, amount: level.xpReward, source: 'module' }),
      ]);

      // 3. Update local state
      updateProfile({ total_xp: currentXp + level.xpReward });
      setCompletedIds(prev => new Set([...prev, level.id]));
      setEarnedXpMap(prev => ({
        ...prev,
        [selectedModule.id]: (prev[selectedModule.id] ?? 0) + level.xpReward,
      }));

      // 4. Trigger level-up overlay in StudentDashboard
      onXpGain?.(level.xpReward);
    } catch (err) {
      console.error('Erreur enregistrement module_progress', err);
    } finally {
      setCompleting(null);
    }
  }, [user, selectedModule, completing, profile, updateProfile, onXpGain]);

  const visibleModules = ALL_MODULES.filter(
    m => subjectFilter === 'all' || m.subject === subjectFilter
  );

  return (
    <AnimatePresence mode="wait">
      {selectedModule ? (
        <motion.div
          key="map"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <LevelMap
            mod={selectedModule}
            completedIds={completedIds}
            earnedXp={earnedXpMap[selectedModule.id] ?? 0}
            onBack={() => { setSelectedModule(null); setCompletedIds(new Set()); }}
            onComplete={handleComplete}
            completing={completing}
          />
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="space-y-5 max-w-2xl mx-auto"
        >
          {/* Header */}
          <div>
            <p className="text-[10px] font-black tracking-[0.25em] uppercase mb-1.5" style={{ color: 'hsl(43 90% 50% / 0.5)' }}>
              Ascension · Entraînement
            </p>
            <h1
              className="font-display font-black tracking-tight leading-none"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                background: 'linear-gradient(135deg, hsl(43 90% 44%), hsl(50 100% 66%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MODULES
            </h1>
            <p className="text-xs text-muted-foreground mt-1.5 font-mono tracking-wide">
              Progresse niveau par niveau · Débloque les exercices · Gagne des XP
            </p>
          </div>

          {/* Subject filter */}
          <div className="flex gap-1.5">
            {(['all', 'Physique', 'Maths'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSubjectFilter(f)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150"
                style={
                  subjectFilter === f
                    ? {
                        background: 'linear-gradient(135deg, hsl(43 90% 40%), hsl(50 100% 60%))',
                        color: 'hsl(222 22% 6%)',
                        borderColor: 'transparent',
                        boxShadow: '0 0 14px hsl(43 90% 50% / 0.4)',
                        clipPath: 'polygon(6px 0%,calc(100% - 6px) 0%,100% 6px,100% calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,0% calc(100% - 6px),0% 6px)',
                      }
                    : {
                        background: 'hsl(var(--card))',
                        color: 'hsl(var(--muted-foreground))',
                        borderColor: 'hsl(var(--border))',
                      }
                }
              >
                {f === 'all' ? 'Tout' : f}
              </button>
            ))}
          </div>

          {/* Module list */}
          <div className="space-y-3">
            {visibleModules.map(mod => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                completedCount={mod.id === selectedModule?.id
                  ? completedIds.size
                  : Math.round(((earnedXpMap[mod.id] ?? 0) / Math.max(totalModuleXp(mod), 1)) * mod.levels.length)
                }
                earnedXp={earnedXpMap[mod.id] ?? 0}
                onClick={() => setSelectedModule(mod)}
              />
            ))}

            {/* Coming soon cards */}
            {(subjectFilter === 'all' || subjectFilter === 'Maths') && (
              <div
                className="rounded-xl border border-dashed p-5 text-center"
                style={{ borderColor: 'hsl(var(--border))', opacity: 0.5 }}
              >
                <p className="text-sm font-semibold text-muted-foreground mb-1">Maths · Terminale</p>
                <p className="text-xs text-muted-foreground/60">Bientôt disponible</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
