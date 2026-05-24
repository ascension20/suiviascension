/**
 * Avatar component — DiceBear pixel-art (temporary until .riv files are ready).
 *
 * Drop-in Rive upgrade path:
 *   1. npm install @rive-app/react-canvas
 *   2. Place character.riv in /public/avatar/
 *   3. Uncomment the Rive block at the bottom and delete the DiceBear section.
 */

import { motion } from 'framer-motion';
import type { AvatarConfig } from '@/lib/avatar/types';
import { getAccessory } from '@/lib/avatar/accessories';

// ─────────────────────────────────────────────────────────────
// Background gradients per background accessory
// ─────────────────────────────────────────────────────────────
const BG_GRADIENTS: Record<string, { from: string; to: string; particle?: string }> = {
  bg_classroom: { from: 'hsl(222 22% 12%)', to: 'hsl(222 22% 8%)' },
  bg_library:   { from: 'hsl(30 40% 14%)',  to: 'hsl(30 25% 8%)',   particle: '📖' },
  bg_dungeon:   { from: 'hsl(270 30% 12%)', to: 'hsl(270 20% 5%)',  particle: '💀' },
  bg_sorbonne:  { from: 'hsl(25 50% 14%)',  to: 'hsl(25 30% 7%)',   particle: '🏛️' },
  bg_paris:     { from: 'hsl(220 50% 12%)', to: 'hsl(220 35% 5%)',  particle: '🗼' },
  bg_space:     { from: 'hsl(240 60% 8%)',  to: 'hsl(240 80% 3%)',  particle: '⭐' },
};

const SIZE_CONFIG = {
  sm:  { total: 40  },
  md:  { total: 64  },
  lg:  { total: 80  },
  xl:  { total: 160 },
};

type AvatarSize = keyof typeof SIZE_CONFIG;

interface AvatarProps {
  config: AvatarConfig;
  size?: AvatarSize;
  animated?: boolean;
  seed?: string;
  className?: string;
}

function dicebearUrl(seed: string) {
  const s = encodeURIComponent(seed || 'default');
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${s}&backgroundColor=transparent`;
}

export function Avatar({
  config,
  size = 'md',
  animated = true,
  seed = 'default',
  className = '',
}: AvatarProps) {
  const total = SIZE_CONFIG[size].total;

  const hatAcc     = config.hat        ? getAccessory(config.hat)        : null;
  const glassesAcc = config.glasses    ? getAccessory(config.glasses)    : null;
  const outfitAcc  = config.outfit     ? getAccessory(config.outfit)     : null;
  const badgeAcc   = config.badge      ? getAccessory(config.badge)      : null;

  const bgKey  = config.background ?? 'bg_classroom';
  const bgGrad = BG_GRADIENTS[bgKey] ?? BG_GRADIENTS.bg_classroom;

  const radius = size === 'xl' ? '1.25rem' : '0.75rem';

  // Scale emoji sizes relative to container
  const fs = (frac: number) => `${Math.round(total * frac)}px`;

  return (
    <div
      className={`relative overflow-hidden select-none shrink-0 ${className}`}
      style={{
        width: total,
        height: total,
        borderRadius: radius,
        background: `linear-gradient(160deg, ${bgGrad.from} 0%, ${bgGrad.to} 100%)`,
      }}
    >
      {/* Subtle scanline grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(43 90% 50% / 0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, hsl(43 90% 50% / 0.025) 1px, transparent 1px)',
          backgroundSize: `${Math.round(total / 6)}px ${Math.round(total / 6)}px`,
        }}
      />

      {/* Background particle — xl only */}
      {bgGrad.particle && size === 'xl' && (
        <div
          className="absolute bottom-2 right-2.5 pointer-events-none select-none"
          style={{ fontSize: fs(0.16), opacity: 0.18 }}
        >
          {bgGrad.particle}
        </div>
      )}

      {/* ── Hat (above character head) ── */}
      {hatAcc && size !== 'sm' && (
        <div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{ top: size === 'xl' ? '2%' : '1px', fontSize: fs(0.26) }}
        >
          <span style={{ filter: `drop-shadow(0 0 4px hsl(43 90% 50% / 0.6))` }}>
            {hatAcc.emoji}
          </span>
        </div>
      )}

      {/* ── DiceBear pixel-art character (idle bob) ── */}
      <motion.img
        src={dicebearUrl(seed)}
        alt="avatar"
        animate={animated ? { y: [0, -3, 0] } : {}}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        draggable={false}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88%',
          height: '88%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
        }}
      />

      {/* ── Glasses (eye zone ~22% from top) ── */}
      {glassesAcc && size !== 'sm' && (
        <div
          className="absolute left-0 right-0 flex justify-center pointer-events-none"
          style={{ top: '22%', fontSize: fs(0.18) }}
        >
          {glassesAcc.emoji}
        </div>
      )}

      {/* ── Outfit badge (bottom center, subtle) ── */}
      {outfitAcc && size === 'xl' && (
        <div
          className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none"
          style={{ fontSize: fs(0.12) }}
        >
          {outfitAcc.emoji}
        </div>
      )}

      {/* ── Badge — bottom-left corner ── */}
      {badgeAcc && size !== 'sm' && (
        <div
          className="absolute bottom-1 left-1.5 pointer-events-none leading-none"
          style={{ fontSize: fs(0.18) }}
        >
          {badgeAcc.emoji}
        </div>
      )}

      {/* ── Gold corner brackets (xl only) ── */}
      {size === 'xl' && (
        <>
          <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 rounded-tl-sm pointer-events-none"
               style={{ borderColor: 'hsl(43 90% 55% / 0.7)' }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 rounded-tr-sm pointer-events-none"
               style={{ borderColor: 'hsl(43 90% 55% / 0.7)' }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 rounded-bl-sm pointer-events-none"
               style={{ borderColor: 'hsl(43 90% 55% / 0.7)' }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 rounded-br-sm pointer-events-none"
               style={{ borderColor: 'hsl(43 90% 55% / 0.7)' }} />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FUTURE: Rive integration (uncomment when character.riv is ready)
// ─────────────────────────────────────────────────────────────
/*
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function RiveAvatar({ config, size = 'md' }: AvatarProps) {
  const total = SIZE_CONFIG[size].total;
  const { RiveComponent, rive } = useRive({
    src: '/avatar/character.riv',
    stateMachines: 'Main',
    autoplay: true,
  });

  const hatInput     = useStateMachineInput(rive, 'Main', 'hat');
  const glassesInput = useStateMachineInput(rive, 'Main', 'glasses');
  const outfitInput  = useStateMachineInput(rive, 'Main', 'outfit');
  const bgInput      = useStateMachineInput(rive, 'Main', 'background');
  const badgeInput   = useStateMachineInput(rive, 'Main', 'badge');

  useEffect(() => {
    const apply = (input, id) => {
      if (!input || !id) return;
      const acc = getAccessory(id);
      if (acc?.riveValue !== undefined) input.value = acc.riveValue;
    };
    apply(hatInput,     config.hat);
    apply(glassesInput, config.glasses);
    apply(outfitInput,  config.outfit);
    apply(bgInput,      config.background);
    apply(badgeInput,   config.badge);
  }, [config, hatInput, glassesInput, outfitInput, bgInput, badgeInput]);

  return <div style={{ width: total, height: total }}><RiveComponent /></div>;
}
*/
