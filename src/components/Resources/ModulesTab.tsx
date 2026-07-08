import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, ChevronRight, ChevronDown, Check, GraduationCap, BookOpen, RotateCcw } from 'lucide-react';
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

  const [filterLevel, setFilterLevel] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string | null>(null);

  const LEVEL_ORDER = ['Terminale', 'Première', 'Seconde', '3ème'];
  const availableLevels = LEVEL_ORDER.filter(l => ALL_MODULES.some(m => m.level === l));
  const availableSubjects = [...new Set(ALL_MODULES.map(m => m.subject))].sort();

  const filtered = ALL_MODULES.filter(m =>
    (!filterLevel || m.level === filterLevel) &&
    (!filterSubject || m.subject === filterSubject)
  );

  // Groupement par niveau pour l'affichage
  const grouped = LEVEL_ORDER
    .filter(l => filtered.some(m => m.level === l))
    .map(l => ({ level: l, modules: filtered.filter(m => m.level === l) }));

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
        className="space-y-5"
      >
        {/* Filtres */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <FilterDropdown
            icon={<BookOpen size={14} />}
            label="Matière"
            placeholder="Toutes les matières"
            value={filterSubject}
            onChange={setFilterSubject}
            options={availableSubjects.map(s => ({
              value: s,
              label: s,
              dotHsl: s === 'Maths' ? '270 65% 62%' : '38 92% 50%',
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

        <div className="h-px bg-white/8" />

        {/* Modules groupés par niveau */}
        {grouped.length === 0 ? (
          <p className="text-sm text-white/40 text-center py-8">Aucun module pour ces filtres.</p>
        ) : (
          grouped.map(group => (
            <div key={group.level}>
              {/* En-tête de niveau — masqué si un seul niveau affiché */}
              {grouped.length > 1 && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">{group.level}</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>
              )}
              <div className="space-y-3">
                {group.modules.map(mod => (
                  <ModuleCard
                    key={mod.id}
                    mod={mod}
                    completedIds={completedByModule[mod.id] ?? new Set()}
                    onOpen={() => setSelected(mod)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
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
