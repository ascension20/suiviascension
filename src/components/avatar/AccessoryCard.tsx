import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Accessory, PlayerStats } from '@/lib/avatar/types';
import { RARITY_COLORS } from '@/lib/avatar/types';
import { unlockProgress } from '@/lib/avatar/unlock-engine';
import { buildAvataaarsUrl } from './Avatar';
import type { AvatarConfig } from '@/lib/avatar/types';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const RARITY_LABEL: Record<string, string> = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
};

const PREVIEW_SEED = 'ascension-preview';

/** Build a preview URL showing only this accessory on a neutral character */
function previewUrl(acc: Accessory): string {
  const config: AvatarConfig = {
    hat:        acc.slot === 'hat'        ? acc.id : null,
    glasses:    acc.slot === 'glasses'    ? acc.id : null,
    outfit:     acc.slot === 'outfit'     ? acc.id : 'outfit_hoodie',
    background: acc.slot === 'background' ? acc.id : 'bg_dark',
    badge:      null,
    skinColor:  'light',
    hairStyle:  'shortFlat',
    hairColor:  'brown',
  };
  return buildAvataaarsUrl(config, PREVIEW_SEED);
}

/** Extract hex from dicebearParam for background swatches */
function bgHex(acc: Accessory): string | null {
  if (acc.slot !== 'background') return null;
  return acc.dicebearParam?.match(/backgroundColor=([0-9a-fA-F]{6})/)?.[1] ?? null;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

interface AccessoryCardProps {
  accessory: Accessory;
  isUnlocked: boolean;
  isEquipped: boolean;
  stats: PlayerStats | null;
  onSelect: () => void;
}

export function AccessoryCard({
  accessory,
  isUnlocked,
  isEquipped,
  stats,
  onSelect,
}: AccessoryCardProps) {
  const rc       = RARITY_COLORS[accessory.rarity];
  const progress = stats ? unlockProgress(accessory, stats) : null;
  const hex      = bgHex(accessory);

  return (
    <motion.button
      onClick={isUnlocked ? onSelect : undefined}
      whileHover={isUnlocked ? { scale: 1.03 } : {}}
      whileTap={isUnlocked ? { scale: 0.97 } : {}}
      className="relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-left w-full"
      style={{
        borderColor: isEquipped
          ? rc.border
          : isUnlocked ? `${rc.border}55` : 'hsl(222 16% 18%)',
        background: isEquipped
          ? rc.bg
          : isUnlocked ? 'hsl(222 22% 10%)' : 'hsl(222 22% 8%)',
        boxShadow: isEquipped ? rc.glow : 'none',
        opacity: isUnlocked ? 1 : 0.55,
        cursor: isUnlocked ? 'pointer' : 'default',
      }}
    >
      {/* Equipped check */}
      {isEquipped && (
        <div
          className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded text-[8px] font-bold"
          style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}` }}
        >
          ✓
        </div>
      )}

      {/* Preview visual */}
      <div
        className="relative overflow-hidden rounded-lg shrink-0"
        style={{
          width: 52,
          height: 52,
          filter: isUnlocked ? 'none' : 'grayscale(1) brightness(0.4)',
        }}
      >
        {hex ? (
          /* Background slot → color swatch */
          <div
            className="w-full h-full rounded-lg flex items-center justify-center"
            style={{ background: `#${hex}` }}
          >
            <span className="text-xl">{
              hex === '0d1117' ? '🌑' :
              hex === '1a2332' ? '🏫' :
              hex === '2d1500' ? '📚' :
              hex === '1a0a2e' ? '🏰' :
              hex === '3d2000' ? '🏛️' :
              hex === '0a1628' ? '🗼' : '🌌'
            }</span>
          </div>
        ) : accessory.badgeSymbol ? (
          /* Badge slot → emoji centered */
          <div
            className="w-full h-full flex items-center justify-center text-2xl"
            style={{ background: 'hsl(222 22% 12%)' }}
          >
            {accessory.badgeSymbol}
          </div>
        ) : (
          /* All other slots → mini DiceBear preview */
          <img
            src={previewUrl(accessory)}
            alt={accessory.label}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Lock overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-end justify-end p-1">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(222 22% 14%)', border: '1px solid hsl(222 16% 25%)' }}
            >
              <Lock size={8} className="text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <p
        className="text-[11px] font-semibold text-center leading-tight line-clamp-2 w-full"
        style={{ color: isUnlocked ? 'hsl(42 12% 88%)' : 'hsl(220 10% 45%)' }}
      >
        {accessory.label}
      </p>

      {/* Rarity */}
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

      {/* Lock condition */}
      {!isUnlocked && (
        <p className="text-[9px] text-center" style={{ color: 'hsl(220 10% 40%)' }}>
          {progress ?? accessory.condition.label}
        </p>
      )}
    </motion.button>
  );
}
