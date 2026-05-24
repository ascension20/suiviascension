import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Accessory } from '@/lib/avatar/types';
import { RARITY_COLORS } from '@/lib/avatar/types';
import { unlockProgress } from '@/lib/avatar/unlock-engine';
import type { PlayerStats } from '@/lib/avatar/types';

interface AccessoryCardProps {
  accessory: Accessory;
  isUnlocked: boolean;
  isEquipped: boolean;
  stats: PlayerStats | null;
  onSelect: () => void;
}

const RARITY_LABEL: Record<string, string> = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
};

export function AccessoryCard({
  accessory,
  isUnlocked,
  isEquipped,
  stats,
  onSelect,
}: AccessoryCardProps) {
  const rc = RARITY_COLORS[accessory.rarity];
  const progress = stats ? unlockProgress(accessory, stats) : null;

  return (
    <motion.button
      onClick={isUnlocked ? onSelect : undefined}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
      whileTap={isUnlocked ? { scale: 0.97 } : {}}
      className="relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-left w-full"
      style={{
        borderColor: isEquipped
          ? rc.border
          : isUnlocked
          ? `${rc.border}55`
          : 'hsl(222 16% 18%)',
        background: isEquipped
          ? rc.bg
          : isUnlocked
          ? 'hsl(222 22% 10%)'
          : 'hsl(222 22% 8%)',
        boxShadow: isEquipped ? rc.glow : 'none',
        opacity: isUnlocked ? 1 : 0.55,
        cursor: isUnlocked ? 'pointer' : 'default',
      }}
    >
      {/* Equipped indicator */}
      {isEquipped && (
        <div
          className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[8px] font-bold tracking-wide"
          style={{
            background: rc.bg,
            color: rc.text,
            border: `1px solid ${rc.border}`,
          }}
        >
          ✓
        </div>
      )}

      {/* Emoji */}
      <div
        className="relative text-3xl leading-none"
        style={{
          filter: isUnlocked
            ? isEquipped
              ? `drop-shadow(0 0 8px ${rc.border})`
              : 'none'
            : 'grayscale(1) brightness(0.4)',
        }}
      >
        {accessory.emoji}

        {/* Lock overlay */}
        {!isUnlocked && (
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(222 22% 14%)', border: '1px solid hsl(222 16% 25%)' }}
          >
            <Lock size={8} className="text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-center leading-tight line-clamp-2"
         style={{ color: isUnlocked ? 'hsl(42 12% 88%)' : 'hsl(220 10% 45%)' }}>
        {accessory.label}
      </p>

      {/* Rarity badge */}
      <span
        className="text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded"
        style={{
          background: isUnlocked ? rc.bg : 'hsl(222 16% 12%)',
          color: isUnlocked ? rc.text : 'hsl(220 10% 40%)',
          border: `1px solid ${isUnlocked ? rc.border + '55' : 'transparent'}`,
        }}
      >
        {RARITY_LABEL[accessory.rarity]}
      </span>

      {/* Unlock progress (for locked items) */}
      {!isUnlocked && progress && (
        <p className="text-[9px] text-center" style={{ color: 'hsl(220 10% 40%)' }}>
          {progress}
        </p>
      )}
      {!isUnlocked && !progress && (
        <p className="text-[9px] text-center" style={{ color: 'hsl(220 10% 40%)' }}>
          {accessory.condition.label}
        </p>
      )}
    </motion.button>
  );
}
