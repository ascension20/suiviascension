import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Zap, ChevronRight, ChevronDown, Check, GraduationCap, BookOpen, RotateCcw,
  Layers, Target, BarChart3, Play, Trophy, Sparkles,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ALL_MODULES, type PhysicsModule, type ModuleLevel } from '@/lib/modules-data';
import { ModulePage } from './ModulePage';

interface Props {
  onXpGain?: (amount: number) => void;
}

// Ordre d'affichage des matières (programme + progression logique)
const SUBJECT_ORDER = ['Physique', 'Chimie', 'Maths'];
// Ordre des classes par difficulté croissante (catalogue : Seconde avant Terminale)
const CLASS_ORDER = ['3ème', 'Seconde', 'Première', 'Terminale'];
const classRank = (level: string) => {
  const i = CLASS_ORDER.indexOf(level);
  return i === -1 ? 99 : i;
};
// Couleur associée à chaque matière (accent des modules)
const subjectHsl = (subject: string) =>
  subject === 'Maths' ? '270 65% 62%'
  : subject === 'Chimie' ? '150 55% 42%'
  : '205 85% 60%';

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

  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string | null>(null);

  const LEVEL_ORDER = ['Terminale', 'Première', 'Seconde', '3ème'];
  const availableLevels = LEVEL_ORDER.filter(l => ALL_MODULES.some(m => m.level === l));

  // Filtre par défaut sur le niveau de l'élève (renseigné à l'onboarding).
  // Un élève de Seconde ne voit que les modules de Seconde. Appliqué une seule
  // fois au chargement du profil ; l'élève peut ensuite ajuster le filtre.
  const defaultLevelApplied = useRef(false);
  useEffect(() => {
    if (defaultLevelApplied.current || !profile) return;
    defaultLevelApplied.current = true;
    const lvl = profile.class_level;
    // On ne filtre que si des modules existent pour ce niveau (sinon : tout afficher)
    if (lvl && ALL_MODULES.some(m => m.level === lvl)) {
      setFilterLevel(lvl);
    }
  }, [profile]);
  const availableSubjects = [...new Set(ALL_MODULES.map(m => m.subject))]
    .sort((a, b) => SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b));

  const filtered = ALL_MODULES.filter(m =>
    (!filterLevel || m.level === filterLevel) &&
    (!filterSubject || m.subject === filterSubject)
  );

  // Groupement par matière pour le catalogue
  const grouped = availableSubjects
    .filter(s => filtered.some(m => m.subject === s))
    .map(s => ({ subject: s, modules: filtered.filter(m => m.subject === s) }));

  // ── Statistiques globales ──────────────────────────────────────────────────
  const doneCount = (m: PhysicsModule) => (completedByModule[m.id]?.size ?? 0);
  const moduleXp = (m: PhysicsModule) => m.levels.reduce((s, l) => s + l.xpReward, 0);
  const moduleEarnedXp = (m: PhysicsModule) =>
    m.levels.filter(l => completedByModule[m.id]?.has(l.id)).reduce((s, l) => s + l.xpReward, 0);

  const totalLevels   = ALL_MODULES.reduce((s, m) => s + m.levels.length, 0);
  const doneLevels    = ALL_MODULES.reduce((s, m) => s + doneCount(m), 0);
  const totalXpAll    = ALL_MODULES.reduce((s, m) => s + moduleXp(m), 0);
  const earnedXpAll   = ALL_MODULES.reduce((s, m) => s + moduleEarnedXp(m), 0);
  const globalPct     = totalXpAll > 0 ? Math.round((earnedXpAll / totalXpAll) * 100) : 0;
  const completedMods = ALL_MODULES.filter(m => doneCount(m) === m.levels.length).length;

  // Modules en cours (au moins 1 niveau fait, pas terminés), les plus avancés d'abord
  const inProgress = ALL_MODULES
    .map(m => ({ m, done: doneCount(m) }))
    .filter(x => x.done > 0 && x.done < x.m.levels.length)
    .sort((a, b) => b.done / b.m.levels.length - a.done / a.m.levels.length)
    .slice(0, 3);

  // Suggestion de démarrage si rien n'est en cours — scopée au niveau de l'élève
  // (un élève de Seconde est orienté vers un module de Seconde, pas de Terminale).
  const studentLevel = profile?.class_level ?? null;
  const startPool =
    studentLevel && ALL_MODULES.some(m => m.level === studentLevel)
      ? ALL_MODULES.filter(m => m.level === studentLevel)
      : ALL_MODULES;
  const suggested = inProgress.length === 0
    ? startPool.find(m => doneCount(m) === 0) ?? null
    : null;

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
        className="space-y-7"
      >
        {/* ── En-tête héro ─────────────────────────────────────────────── */}
        <div>
          <p
            className="text-[10px] font-black tracking-[0.25em] uppercase mb-1.5"
            style={{ color: 'hsl(43 90% 50% / 0.5)' }}
          >
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
            MODULES D'ENTRAÎNEMENT
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 font-mono tracking-wide">
            Cours complet · Fiche de synthèse · Exercices corrigés · QCM
          </p>
        </div>

        {/* ── Stats globales ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <StatCard
            icon={<Layers size={15} />}
            hsl="270 65% 62%"
            label="Modules"
            value={`${ALL_MODULES.length}`}
            sub={completedMods > 0 ? `${completedMods} terminé${completedMods > 1 ? 's' : ''}` : 'à explorer'}
          />
          <StatCard
            icon={<Target size={15} />}
            hsl="210 85% 60%"
            label="Niveaux"
            value={`${doneLevels}`}
            sub={`/ ${totalLevels} complétés`}
          />
          <StatCard
            icon={<Zap size={15} />}
            hsl="43 90% 55%"
            label="XP gagnés"
            value={`${earnedXpAll}`}
            sub={`/ ${totalXpAll} XP`}
          />
          <StatCard
            icon={<BarChart3 size={15} />}
            hsl="142 71% 48%"
            label="Progression"
            value={`${globalPct}%`}
            bar={globalPct}
          />
        </div>

        {/* ── Reprendre / Commencer ────────────────────────────────────── */}
        {(inProgress.length > 0 || suggested) && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.16em] uppercase"
                style={{ color: 'hsl(43 90% 55%)' }}
              >
                {inProgress.length > 0 ? <Play size={11} /> : <Sparkles size={11} />}
                {inProgress.length > 0 ? 'Reprendre' : 'Commencer ici'}
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: 'linear-gradient(to right, hsl(43 90% 50% / 0.18), transparent)' }}
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {inProgress.length > 0
                ? inProgress.map(({ m }) => (
                    <ContinueCard
                      key={m.id}
                      mod={m}
                      completedIds={completedByModule[m.id] ?? new Set()}
                      onOpen={() => setSelected(m)}
                    />
                  ))
                : suggested && (
                    <ContinueCard
                      mod={suggested}
                      completedIds={new Set()}
                      onOpen={() => setSelected(suggested)}
                    />
                  )}
            </div>
          </div>
        )}

        {/* ── Catalogue ────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.16em] uppercase"
              style={{ color: 'hsl(43 90% 55%)' }}
            >
              <BookOpen size={11} />
              Catalogue
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, hsl(43 90% 50% / 0.18), transparent)' }}
            />
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-2.5 flex-wrap mb-4">
            <FilterDropdown
              icon={<BookOpen size={14} />}
              label="Matière"
              placeholder="Toutes les matières"
              value={filterSubject}
              onChange={setFilterSubject}
              options={availableSubjects.map(s => ({
                value: s,
                label: s,
                dotHsl: subjectHsl(s),
                count: ALL_MODULES.filter(m => m.subject === s).length,
              }))}
            />
            <FilterDropdown
              icon={<GraduationCap size={14} />}
              label="Niveau"
              placeholder="Tous les niveaux"
              value={filterLevel}
              onChange={setFilterLevel}
              options={availableLevels.map(l => ({
                value: l,
                label: l,
                dotHsl: '210 85% 60%',
                count: ALL_MODULES.filter(m => m.level === l).length,
              }))}
            />
            <AnimatePresence>
              {(filterSubject || filterLevel) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => { setFilterSubject(null); setFilterLevel(null); }}
                  className="flex items-center gap-1.5 px-3 h-10 rounded-xl text-[12px] font-semibold text-white/45 hover:text-white/80 bg-white/[0.03] hover:bg-white/[0.07] border border-white/8 transition-colors"
                >
                  <RotateCcw size={12} />
                  Réinitialiser
                </motion.button>
              )}
            </AnimatePresence>
            <span className="ml-auto text-[11px] font-medium text-white/30 tabular-nums">
              {filtered.length} module{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Modules groupés par matière */}
          {grouped.length === 0 ? (
            <p className="text-sm text-white/40 text-center py-8">Aucun module pour ces filtres.</p>
          ) : (
            <div className="space-y-6">
              {grouped.map(group => {
                const subjHsl = subjectHsl(group.subject);
                const subjDone = group.modules.reduce((s, m) => s + doneCount(m), 0);
                const subjTotal = group.modules.reduce((s, m) => s + m.levels.length, 0);
                // Sous-groupement par classe, de la plus simple à la plus avancée.
                // Le séparateur n'apparaît que si plusieurs classes sont affichées
                // (donc jamais dans la vue par défaut, filtrée sur le niveau de l'élève).
                const classes = [...new Set(group.modules.map(m => m.level))]
                  .sort((a, b) => classRank(a) - classRank(b));
                const multiClass = classes.length > 1;
                // Module recommandé pour cette spé : le premier non terminé, dans l'ordre de difficulté
                const recommendedId =
                  group.modules.find(m => doneCount(m) < m.levels.length)?.id ?? null;
                return (
                  <div key={group.subject}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: `hsl(${subjHsl})` }} />
                      <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: `hsl(${subjHsl})` }}>
                        {group.subject}
                      </span>
                      <span className="text-[10px] font-bold text-white/25 tabular-nums">
                        {group.modules.length} module{group.modules.length > 1 ? 's' : ''} · {subjDone}/{subjTotal} niveaux
                      </span>
                      <div className="flex-1 h-px" style={{ background: `hsl(${subjHsl} / 0.15)` }} />
                    </div>
                    <div className="space-y-4">
                      {classes.map(cls => {
                        const mods = group.modules.filter(m => m.level === cls);
                        return (
                          <div key={cls}>
                            {/* Séparateur de classe — visible seulement en vue multi-niveaux */}
                            {multiClass && (
                              <div className="flex items-center gap-2 mb-2.5 ml-0.5">
                                <GraduationCap size={12} style={{ color: `hsl(${subjHsl} / 0.75)` }} />
                                <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/45">
                                  {cls}
                                </span>
                                <span className="text-[9.5px] font-semibold text-white/20 tabular-nums">
                                  {mods.length} chapitre{mods.length > 1 ? 's' : ''}
                                </span>
                                <div className="flex-1 h-px bg-white/[0.06]" />
                              </div>
                            )}
                            {/* Modules ordonnés par difficulté croissante — le numéro indique la progression conseillée */}
                            <div className="grid md:grid-cols-2 gap-3">
                              {mods.map((mod, i) => (
                                <ModuleCard
                                  key={mod.id}
                                  mod={mod}
                                  step={i + 1}
                                  recommended={mod.id === recommendedId}
                                  completedIds={completedByModule[mod.id] ?? new Set()}
                                  onOpen={() => setSelected(mod)}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Carte statistique ─────────────────────────────────────────────────────────
function StatCard({
  icon, hsl, label, value, sub, bar,
}: {
  icon: React.ReactNode;
  hsl: string;
  label: string;
  value: string;
  sub?: string;
  bar?: number;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col gap-1.5"
      style={{ boxShadow: `inset 0 0 30px hsl(${hsl} / 0.03)` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `hsl(${hsl} / 0.14)`, color: `hsl(${hsl})` }}
        >
          {icon}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/35">{label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl font-black text-white tabular-nums leading-none">{value}</span>
        {sub && <span className="text-[11px] font-semibold text-white/35">{sub}</span>}
      </div>
      {bar !== undefined && (
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-0.5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `hsl(${hsl})` }}
            initial={{ width: 0 }}
            animate={{ width: `${bar}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      )}
    </div>
  );
}

// ── Carte « reprendre » ───────────────────────────────────────────────────────
function ContinueCard({
  mod, completedIds, onOpen,
}: {
  mod: PhysicsModule;
  completedIds: Set<string>;
  onOpen: () => void;
}) {
  const totalXp = mod.levels.reduce((s, l) => s + l.xpReward, 0);
  const earnedXp = mod.levels.filter(l => completedIds.has(l.id)).reduce((s, l) => s + l.xpReward, 0);
  const pct = totalXp > 0 ? Math.round((earnedXp / totalXp) * 100) : 0;
  const nextLevel = mod.levels.find(l => !completedIds.has(l.id));
  const accentColor = `hsl(${mod.accentHsl})`;

  return (
    <motion.button
      onClick={onOpen}
      whileTap={{ scale: 0.985 }}
      className="group text-left rounded-2xl border border-white/10 hover:border-white/25 bg-white/[0.04] hover:bg-white/[0.07] p-4 transition-all"
      style={{ borderLeftColor: accentColor, borderLeftWidth: 3 }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-bold text-white text-[13.5px] leading-tight truncate">{mod.title}</h4>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
          style={{ background: `${accentColor}22`, color: accentColor }}
        >
          <Play size={13} className="ml-0.5" />
        </span>
      </div>
      {nextLevel && (
        <p className="text-[11px] text-white/45 mb-2.5 truncate">
          {completedIds.size > 0 ? 'Prochain niveau' : 'Premier niveau'} : <span className="text-white/70 font-semibold">{nextLevel.title}</span>
        </p>
      )}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ background: accentColor, width: `${pct}%` }} />
        </div>
        <span className="text-[11px] font-bold tabular-nums" style={{ color: accentColor }}>{pct}%</span>
      </div>
    </motion.button>
  );
}

// ── Menu déroulant de filtre ──────────────────────────────────────────────────
interface FilterOption {
  value: string;
  label: string;
  dotHsl: string;   // pastille de couleur "H S% L%"
  count: number;    // nombre de modules concernés
}

function FilterDropdown({
  icon, label, placeholder, value, onChange, options,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: FilterOption[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fermeture au clic extérieur & à Échap
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selected = options.find(o => o.value === value) ?? null;

  return (
    <div ref={ref} className="relative">
      {/* Déclencheur */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`group flex items-center gap-2.5 h-10 pl-3 pr-2.5 rounded-xl border text-left transition-all ${
          open
            ? 'bg-white/[0.08] border-white/25 shadow-lg shadow-black/20'
            : selected
              ? 'bg-white/[0.06] border-white/20 hover:border-white/30'
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
        }`}
      >
        <span className={`transition-colors ${selected ? 'text-white/70' : 'text-white/30'}`}>{icon}</span>
        <span className="flex flex-col leading-none gap-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{label}</span>
          <span className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${selected ? 'text-white' : 'text-white/50'}`}>
            {selected && (
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${selected.dotHsl})` }} />
            )}
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <ChevronDown
          size={15}
          className={`ml-1 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-white/70' : 'text-white/30 group-hover:text-white/50'}`}
        />
      </button>

      {/* Panneau */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="absolute z-40 mt-2 left-0 min-w-[220px] rounded-xl border border-white/12 bg-[#101826]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden py-1.5"
          >
            {/* Option « tout » */}
            <DropdownItem
              active={value === null}
              onClick={() => { onChange(null); setOpen(false); }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
              <span className="flex-1 text-white/70">{placeholder}</span>
            </DropdownItem>

            <div className="my-1.5 h-px bg-white/8 mx-3" />

            {options.map(opt => (
              <DropdownItem
                key={opt.value}
                active={value === opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `hsl(${opt.dotHsl})` }} />
                <span className="flex-1">{opt.label}</span>
                <span className="text-[10px] font-bold text-white/25 tabular-nums px-1.5 py-0.5 rounded-md bg-white/[0.05]">
                  {opt.count}
                </span>
              </DropdownItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  active, onClick, children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[12.5px] font-semibold text-left transition-colors ${
        active ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.05] hover:text-white/90'
      }`}
    >
      {children}
      {active && <Check size={14} className="text-white/70 shrink-0" />}
    </button>
  );
}

// ── Carte module ──────────────────────────────────────────────────────────────
function ModuleCard({
  mod,
  completedIds,
  onOpen,
  step,
  recommended,
}: {
  mod: PhysicsModule;
  completedIds: Set<string>;
  onOpen: () => void;
  step?: number;
  recommended?: boolean;
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
      className={`w-full rounded-2xl p-5 text-left transition-all ${
        recommended
          ? 'bg-white/[0.07]'
          : 'bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20'
      }`}
      style={
        recommended
          ? {
              border: `1.5px solid ${accentColor}`,
              boxShadow: `0 0 0 3px ${accentColor}1a, 0 10px 34px -12px ${accentColor}80`,
            }
          : undefined
      }
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          {step !== undefined && (
            <span
              className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[12px] font-black tabular-nums"
              style={{ background: `${accentColor}1f`, color: accentColor, border: `1px solid ${accentColor}3d` }}
              title={`Chapitre ${step} — progression conseillée`}
            >
              {step}
            </span>
          )}
          <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white/70"
              style={{ background: `${accentColor}22`, border: `1px solid ${accentColor}44` }}>
              {mod.subject}
            </span>
            {recommended && (
              <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{ background: `${accentColor}26`, color: accentColor, border: `1px solid ${accentColor}66` }}>
                <Sparkles size={10} />
                {completedIds.size > 0 ? 'À continuer' : 'Recommandé'}
              </span>
            )}
            {pct === 100 && (
              <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: 'hsl(43 90% 55% / 0.15)', color: 'hsl(43 90% 55%)', border: '1px solid hsl(43 90% 55% / 0.35)' }}>
                <Trophy size={10} />
                TERMINÉ
              </span>
            )}
          </div>
          <h3 className="font-bold text-white text-base">{mod.title}</h3>
          <p className="text-sm text-white/50">{mod.subtitle}</p>
          </div>
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
