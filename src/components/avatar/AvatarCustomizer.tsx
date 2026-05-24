import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import type { AvatarConfig, AccessorySlot } from '@/lib/avatar/types';
import { SLOT_LABELS, SLOT_EMOJIS } from '@/lib/avatar/types';
import type { PlayerStats } from '@/lib/avatar/types';
import { ACCESSORIES, getAccessoriesBySlot } from '@/lib/avatar/accessories';
import { AccessoryCard } from './AccessoryCard';
import { Avatar } from './Avatar';

const SLOTS: AccessorySlot[] = ['hat', 'glasses', 'outfit', 'background', 'badge'];

interface AvatarCustomizerProps {
  config: AvatarConfig;
  unlockedIds: Set<string>;
  stats: PlayerStats | null;
  saving: boolean;
  onConfigChange: (next: AvatarConfig) => void;
  onSave: () => Promise<void>;
}

export function AvatarCustomizer({
  config,
  unlockedIds,
  stats,
  saving,
  onConfigChange,
  onSave,
}: AvatarCustomizerProps) {
  const [activeSlot, setActiveSlot] = useState<AccessorySlot>('hat');

  const accessories = getAccessoriesBySlot(activeSlot);

  const equip = (slot: AccessorySlot, id: string | null) => {
    const current = config[slot];
    // Toggle off if already equipped
    onConfigChange({ ...config, [slot]: current === id ? null : id });
  };

  const equippedCount = Object.values(config).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Preview + save */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Avatar config={config} size="xl" animated />
          {/* Rarity glow ring (changes by equipped badge rarity) */}
          <div
            className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
            style={{
              boxShadow: '0 0 40px hsl(43 90% 50% / 0.2), 0 0 80px hsl(43 90% 50% / 0.08)',
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {equippedCount === 0
              ? 'Aucun accessoire équipé'
              : `${equippedCount} accessoire${equippedCount > 1 ? 's' : ''} équipé${equippedCount > 1 ? 's' : ''}`}
          </p>
        </div>

        <motion.button
          onClick={onSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-display font-bold text-sm transition-all"
          style={{
            background: 'hsl(43 90% 50%)',
            color: 'hsl(222 22% 8%)',
            boxShadow: '0 0 20px hsl(43 90% 50% / 0.3)',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Check size={14} />
          )}
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </motion.button>
      </div>

      {/* Slot tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
        {SLOTS.map(slot => (
          <button
            key={slot}
            onClick={() => setActiveSlot(slot)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold tracking-wide whitespace-nowrap shrink-0 transition-all"
            style={
              activeSlot === slot
                ? {
                    background: 'hsl(43 90% 50%)',
                    color: 'hsl(222 22% 8%)',
                    boxShadow: '0 0 12px hsl(43 90% 50% / 0.4)',
                  }
                : {
                    background: 'hsl(222 22% 11%)',
                    color: 'hsl(220 10% 55%)',
                  }
            }
          >
            <span>{SLOT_EMOJIS[slot]}</span>
            {SLOT_LABELS[slot]}
            {config[slot] && (
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: activeSlot === slot ? 'hsl(222 22% 8%)' : 'hsl(43 90% 50%)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Accessory grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlot}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-3 gap-2.5"
        >
          {/* "None" option */}
          <motion.button
            onClick={() => onConfigChange({ ...config, [activeSlot]: null })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
            style={{
              borderColor: config[activeSlot] === null
                ? 'hsl(43 90% 50%)'
                : 'hsl(222 16% 18%)',
              background: config[activeSlot] === null
                ? 'hsl(43 90% 50% / 0.08)'
                : 'hsl(222 22% 8%)',
            }}
          >
            <span className="text-3xl leading-none">✕</span>
            <p className="text-[11px] font-semibold text-center text-muted-foreground">Aucun</p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: 'hsl(222 16% 12%)', color: 'hsl(220 10% 40%)' }}>
              Défaut
            </span>
          </motion.button>

          {accessories.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <AccessoryCard
                accessory={acc}
                isUnlocked={unlockedIds.has(acc.id)}
                isEquipped={config[activeSlot] === acc.id}
                stats={stats}
                onSelect={() => equip(activeSlot, acc.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Unlock summary */}
      <div className="rounded-xl border border-border p-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Accessoires débloqués
        </span>
        <span className="font-display font-black text-sm" style={{ color: 'hsl(43 90% 55%)' }}>
          {unlockedIds.size} / {ACCESSORIES.length}
        </span>
      </div>
    </div>
  );
}
