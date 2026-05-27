import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import type { AvatarConfig, AccessorySlot, PlayerStats } from '@/lib/avatar/types';
import { SLOT_LABELS, SLOT_EMOJIS } from '@/lib/avatar/types';
import { ACCESSORIES, getAccessoriesBySlot } from '@/lib/avatar/accessories';
import { AccessoryCard } from './AccessoryCard';
import { Avatar, buildAvataaarsUrl } from './Avatar';

// ─────────────────────────────────────────────────────────────
// Base appearance data
// ─────────────────────────────────────────────────────────────

const SKIN_OPTIONS = [
  { id: 'pale',      label: 'Pâle',      hex: '#FDDBB4' },
  { id: 'light',     label: 'Claire',    hex: '#EDB98A' },
  { id: 'tanned',    label: 'Dorée',     hex: '#D08B5B' },
  { id: 'yellow',    label: 'Jaune',     hex: '#F8D25C' },
  { id: 'brown',     label: 'Brune',     hex: '#AE5D29' },
  { id: 'darkBrown', label: 'Foncée',    hex: '#694D3D' },
  { id: 'black',     label: 'Noire',     hex: '#614335' },
];

const HAIR_STYLES = [
  { id: 'shortFlat',         label: 'Court plat' },
  { id: 'shortRound',        label: 'Court rond' },
  { id: 'theCaesar',         label: 'César'      },
  { id: 'dreads01',          label: 'Dreads'     },
  { id: 'straight01',        label: 'Long lisse' },
  { id: 'bob',               label: 'Bob'        },
  { id: 'bun',               label: 'Chignon'    },
  { id: 'curly',             label: 'Bouclé'     },
  { id: 'fro',               label: 'Afro'       },
  { id: 'shavedSides',       label: 'Rasé'       },
];

const HAIR_COLORS = [
  { id: 'black',        label: 'Noir',      hex: '#2C1B18' },
  { id: 'brownDark',    label: 'Brun foncé', hex: '#4A312C' },
  { id: 'brown',        label: 'Brun',      hex: '#724133' },
  { id: 'auburn',       label: 'Auburn',    hex: '#A55728' },
  { id: 'blonde',       label: 'Blond',     hex: '#B58143' },
  { id: 'blondeGolden', label: 'Doré',      hex: '#D6B370' },
  { id: 'red',          label: 'Roux',      hex: '#C93305' },
  { id: 'pastelPink',   label: 'Rose',      hex: '#F59797' },
  { id: 'silverGray',   label: 'Argenté',   hex: '#E8E1E1' },
  { id: 'platinum',     label: 'Platine',   hex: '#EEEEEE' },
];

// ─────────────────────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────────────────────

type Tab = 'base' | AccessorySlot;
const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: 'base',    emoji: '👤', label: 'Perso'       },
  { id: 'hat',     emoji: '🎩', label: 'Couvre-chef' },
  { id: 'glasses', emoji: '👓', label: 'Lunettes'    },
  { id: 'outfit',  emoji: '👕', label: 'Tenue'       },
  { id: 'badge',   emoji: '🏅', label: 'Badge'       },
];

const PREVIEW_SEED = 'ascension-preview';

// ─────────────────────────────────────────────────────────────
// Base appearance picker (inner component)
// ─────────────────────────────────────────────────────────────

function BaseAppearancePicker({
  config,
  seed,
  onChange,
}: {
  config: AvatarConfig;
  seed: string;
  onChange: (next: AvatarConfig) => void;
}) {
  const hairPreviewUrl = (hairStyle: string) =>
    buildAvataaarsUrl(
      { ...config, hat: null, glasses: null, outfit: null, background: null, hairStyle },
      PREVIEW_SEED,
    );

  return (
    <div className="flex flex-col gap-6">

      {/* Carnation */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold tracking-wide uppercase"
           style={{ color: 'hsl(43 90% 55%)' }}>
          Carnation
        </p>
        <div className="flex flex-wrap gap-2.5">
          {SKIN_OPTIONS.map(skin => (
            <motion.button
              key={skin.id}
              onClick={() => onChange({ ...config, skinColor: skin.id })}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={skin.label}
              className="relative w-9 h-9 rounded-full transition-all"
              style={{
                background: skin.hex,
                outline: config.skinColor === skin.id
                  ? '2px solid hsl(43 90% 55%)'
                  : '2px solid transparent',
                outlineOffset: 2,
                boxShadow: config.skinColor === skin.id
                  ? '0 0 10px hsl(43 90% 50% / 0.5)'
                  : 'none',
              }}
            >
              {config.skinColor === skin.id && (
                <Check size={12} className="absolute inset-0 m-auto"
                       style={{ color: 'hsl(222 22% 10%)' }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Coupe de cheveux */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold tracking-wide uppercase"
           style={{ color: 'hsl(43 90% 55%)' }}>
          Coupe de cheveux
        </p>
        <div className="grid grid-cols-5 gap-2">
          {HAIR_STYLES.map((style, i) => (
            <motion.button
              key={style.id}
              onClick={() => onChange({ ...config, hairStyle: style.id })}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 rounded-xl border p-1.5 transition-all"
              style={{
                borderColor: config.hairStyle === style.id
                  ? 'hsl(43 90% 50%)'
                  : 'hsl(222 16% 18%)',
                background: config.hairStyle === style.id
                  ? 'hsl(43 90% 50% / 0.1)'
                  : 'hsl(222 22% 9%)',
                boxShadow: config.hairStyle === style.id
                  ? '0 0 10px hsl(43 90% 50% / 0.25)'
                  : 'none',
              }}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src={hairPreviewUrl(style.id)}
                  alt={style.label}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p className="text-[9px] text-center leading-tight font-medium"
                 style={{ color: config.hairStyle === style.id ? 'hsl(43 90% 65%)' : 'hsl(220 10% 55%)' }}>
                {style.label}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Couleur des cheveux */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold tracking-wide uppercase"
           style={{ color: 'hsl(43 90% 55%)' }}>
          Couleur des cheveux
        </p>
        <div className="flex flex-wrap gap-2.5">
          {HAIR_COLORS.map(color => (
            <motion.button
              key={color.id}
              onClick={() => onChange({ ...config, hairColor: color.id })}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={color.label}
              className="relative w-9 h-9 rounded-full border-2 transition-all"
              style={{
                background: color.hex,
                borderColor: color.hex === '#E8E8E8' || color.hex === '#C4C4C4'
                  ? 'hsl(222 16% 30%)'
                  : 'transparent',
                outline: config.hairColor === color.id
                  ? '2px solid hsl(43 90% 55%)'
                  : '2px solid transparent',
                outlineOffset: 2,
                boxShadow: config.hairColor === color.id
                  ? '0 0 10px hsl(43 90% 50% / 0.5)'
                  : 'none',
              }}
            >
              {config.hairColor === color.id && (
                <Check size={12} className="absolute inset-0 m-auto"
                       style={{ color: color.hex === '#E8E8E8' ? '#222' : '#fff' }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main customizer
// ─────────────────────────────────────────────────────────────

interface AvatarCustomizerProps {
  config: AvatarConfig;
  unlockedIds: Set<string>;
  stats: PlayerStats | null;
  saving: boolean;
  seed?: string;
  onConfigChange: (next: AvatarConfig) => void;
  onSave: () => Promise<void>;
}

export function AvatarCustomizer({
  config,
  unlockedIds,
  stats,
  saving,
  seed = 'default',
  onConfigChange,
  onSave,
}: AvatarCustomizerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('base');

  const equip = (slot: AccessorySlot, id: string | null) => {
    const current = config[slot];
    onConfigChange({ ...config, [slot]: current === id ? null : id });
  };

  const equippedCount = (['hat', 'glasses', 'outfit', 'background', 'badge'] as AccessorySlot[])
    .filter(s => config[s]).length;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Preview ── */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Avatar config={config} size="xl" animated seed={seed} />
          <div
            className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
            style={{ boxShadow: '0 0 50px hsl(43 90% 50% / 0.15), 0 0 100px hsl(43 90% 50% / 0.06)' }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {equippedCount === 0
            ? 'Aucun accessoire équipé'
            : `${equippedCount} accessoire${equippedCount > 1 ? 's' : ''} équipé${equippedCount > 1 ? 's' : ''}`}
        </p>
        <motion.button
          onClick={onSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-display font-bold text-sm"
          style={{
            background: 'hsl(43 90% 50%)',
            color: 'hsl(222 22% 8%)',
            boxShadow: '0 0 20px hsl(43 90% 50% / 0.3)',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </motion.button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
        {TABS.map(tab => {
          const hasEquipped = tab.id !== 'base' && !!config[tab.id as AccessorySlot];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold tracking-wide whitespace-nowrap shrink-0 transition-all"
              style={isActive
                ? { background: 'hsl(43 90% 50%)', color: 'hsl(222 22% 8%)', boxShadow: '0 0 12px hsl(43 90% 50% / 0.4)' }
                : { background: 'hsl(222 22% 11%)', color: 'hsl(220 10% 55%)' }}
            >
              <span>{tab.emoji}</span>
              {tab.label}
              {hasEquipped && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isActive ? 'hsl(222 22% 8%)' : 'hsl(43 90% 50%)' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === 'base' ? (
            <BaseAppearancePicker
              config={config}
              seed={seed}
              onChange={onConfigChange}
            />
          ) : (
            <div className="flex flex-col gap-3">
              {/* "None" option */}
              <div className="grid grid-cols-3 gap-2.5">
                <motion.button
                  onClick={() => onConfigChange({ ...config, [activeTab]: null })}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
                  style={{
                    borderColor: config[activeTab as AccessorySlot] === null
                      ? 'hsl(43 90% 50%)' : 'hsl(222 16% 18%)',
                    background: config[activeTab as AccessorySlot] === null
                      ? 'hsl(43 90% 50% / 0.08)' : 'hsl(222 22% 8%)',
                  }}
                >
                  <div className="w-13 h-13 flex items-center justify-center text-2xl opacity-40">✕</div>
                  <p className="text-[11px] font-semibold text-muted-foreground">Aucun</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: 'hsl(222 16% 12%)', color: 'hsl(220 10% 40%)' }}>
                    Défaut
                  </span>
                </motion.button>

                {getAccessoriesBySlot(activeTab as AccessorySlot).map((acc, i) => (
                  <motion.div
                    key={acc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <AccessoryCard
                      accessory={acc}
                      isUnlocked={unlockedIds.has(acc.id)}
                      isEquipped={config[activeTab as AccessorySlot] === acc.id}
                      stats={stats}
                      onSelect={() => equip(activeTab as AccessorySlot, acc.id)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Unlock counter */}
              <div className="rounded-xl border border-border p-3 flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">Accessoires débloqués</span>
                <span className="font-display font-black text-sm" style={{ color: 'hsl(43 90% 55%)' }}>
                  {unlockedIds.size} / {ACCESSORIES.length}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
