/**
 * Avatar component — CSS placeholder (no .riv files yet).
 *
 * Drop-in Rive upgrade path:
 *   1. npm install @rive-app/react-canvas
 *   2. Place character.riv in /public/avatar/
 *   3. Uncomment the Rive block at the bottom and delete the CSS placeholder.
 */

import { motion } from 'framer-motion';
import type { AvatarConfig } from '@/lib/avatar/types';
import { getAccessory } from '@/lib/avatar/accessories';

// ─────────────────────────────────────────────────────────────
// Background gradients per background accessory
// ─────────────────────────────────────────────────────────────
const BG_GRADIENTS: Record<string, { from: string; to: string; particle?: string }> = {
  bg_classroom: {
    from: 'hsl(222 22% 12%)',
    to: 'hsl(222 22% 8%)',
  },
  bg_library: {
    from: 'hsl(30 40% 14%)',
    to: 'hsl(30 25% 8%)',
    particle: '📖',
  },
  bg_dungeon: {
    from: 'hsl(270 30% 12%)',
    to: 'hsl(270 20% 5%)',
    particle: '💀',
  },
  bg_sorbonne: {
    from: 'hsl(25 50% 14%)',
    to: 'hsl(25 30% 7%)',
    particle: '🏛️',
  },
  bg_paris: {
    from: 'hsl(220 50% 12%)',
    to: 'hsl(220 35% 5%)',
    particle: '🗼',
  },
  bg_space: {
    from: 'hsl(240 60% 8%)',
    to: 'hsl(240 80% 3%)',
    particle: '⭐',
  },
};

const SIZE_CONFIG = {
  sm:  { total: 40,  head: 18, body: 14, hatOff: 4  },
  md:  { total: 64,  head: 28, body: 22, hatOff: 6  },
  lg:  { total: 80,  head: 34, body: 28, hatOff: 8  },
  xl:  { total: 160, head: 62, body: 52, hatOff: 14 },
};

type AvatarSize = keyof typeof SIZE_CONFIG;

interface AvatarProps {
  config: AvatarConfig;
  size?: AvatarSize;
  animated?: boolean;
  className?: string;
}

export function Avatar({ config, size = 'md', animated = true, className = '' }: AvatarProps) {
  const dim = SIZE_CONFIG[size];
  const total = dim.total;

  const hatAcc     = config.hat        ? getAccessory(config.hat)        : null;
  const glassesAcc = config.glasses    ? getAccessory(config.glasses)    : null;
  const outfitAcc  = config.outfit     ? getAccessory(config.outfit)     : null;
  const bgAcc      = config.background ? getAccessory(config.background) : null;
  const badgeAcc   = config.badge      ? getAccessory(config.badge)      : null;

  const bgKey = config.background ?? 'bg_classroom';
  const bgGrad = BG_GRADIENTS[bgKey] ?? BG_GRADIENTS.bg_classroom;

  // Font sizes as fractions of total
  const fs = (frac: number) => `${Math.round(total * frac)}px`;

  const idleAnimation = animated
    ? { y: [0, -3, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }
    : {};

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        width: total,
        height: total,
        borderRadius: size === 'xl' ? '1.25rem' : '0.75rem',
        background: `linear-gradient(160deg, ${bgGrad.from} 0%, ${bgGrad.to} 100%)`,
      }}
    >
      {/* Background particle (decorative) */}
      {bgGrad.particle && size === 'xl' && (
        <div
          className="absolute bottom-2 right-3 pointer-events-none opacity-20"
          style={{ fontSize: fs(0.18) }}
        >
          {bgGrad.particle}
        </div>
      )}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(hsl(43 90% 50% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(43 90% 50% / 0.03) 1px, transparent 1px)',
          backgroundSize: `${Math.round(total / 5)}px ${Math.round(total / 5)}px`,
        }}
      />

      {/* Character (idle bob) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        animate={idleAnimation}
        style={{ paddingTop: hatAcc ? dim.hatOff : 0 }}
      >
        {/* Hat */}
        {hatAcc && (
          <div
            className="leading-none"
            style={{
              fontSize: fs(0.22),
              marginBottom: fs(-0.02),
              filter: size === 'xl' ? 'drop-shadow(0 0 6px hsl(43 90% 50% / 0.5))' : undefined,
            }}
          >
            {hatAcc.emoji}
          </div>
        )}

        {/* Head */}
        <div
          className="relative flex items-center justify-center rounded-full shrink-0"
          style={{
            width: dim.head,
            height: dim.head,
            background: 'linear-gradient(135deg, hsl(30 25% 70%) 0%, hsl(25 30% 58%) 100%)',
            boxShadow: '0 2px 8px hsl(222 22% 4% / 0.6)',
          }}
        >
          {/* Eyes */}
          <div className="flex gap-1 absolute" style={{ top: '32%' }}>
            <div
              className="rounded-full"
              style={{
                width: Math.max(2, Math.round(dim.head * 0.14)),
                height: Math.max(2, Math.round(dim.head * 0.14)),
                background: 'hsl(222 22% 12%)',
              }}
            />
            <div
              className="rounded-full"
              style={{
                width: Math.max(2, Math.round(dim.head * 0.14)),
                height: Math.max(2, Math.round(dim.head * 0.14)),
                background: 'hsl(222 22% 12%)',
              }}
            />
          </div>
          {/* Glasses overlay */}
          {glassesAcc && size !== 'sm' && (
            <div
              className="absolute leading-none"
              style={{ fontSize: fs(0.14), top: '18%' }}
            >
              {glassesAcc.emoji}
            </div>
          )}
        </div>

        {/* Body */}
        <div
          className="rounded-t-sm shrink-0 flex items-center justify-center"
          style={{
            width: Math.round(dim.head * 1.1),
            height: dim.body,
            background: outfitAcc
              ? 'linear-gradient(180deg, hsl(213 60% 35%) 0%, hsl(213 60% 25%) 100%)'
              : 'linear-gradient(180deg, hsl(222 22% 28%) 0%, hsl(222 22% 20%) 100%)',
            marginTop: 1,
          }}
        >
          {outfitAcc && size !== 'sm' && (
            <span style={{ fontSize: fs(0.1) }}>{outfitAcc.emoji}</span>
          )}
        </div>
      </motion.div>

      {/* Badge — bottom-left corner */}
      {badgeAcc && size !== 'sm' && (
        <div
          className="absolute bottom-1 left-1.5 leading-none"
          style={{ fontSize: fs(0.16) }}
        >
          {badgeAcc.emoji}
        </div>
      )}

      {/* Gold corner brackets (xl only) */}
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
// FUTURE: Rive integration (uncomment when .riv files are ready)
// ─────────────────────────────────────────────────────────────
/*
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function RiveAvatar({ config, size = 'md' }: AvatarProps) {
  const dim = SIZE_CONFIG[size];
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
    const apply = (input: ReturnType<typeof useStateMachineInput>, id: string | null) => {
      if (!input || !id) return;
      const acc = getAccessory(id);
      if (acc?.riveValue !== undefined) input.value = acc.riveValue;
    };
    apply(hatInput, config.hat);
    apply(glassesInput, config.glasses);
    apply(outfitInput, config.outfit);
    apply(bgInput, config.background);
    apply(badgeInput, config.badge);
  }, [config, hatInput, glassesInput, outfitInput, bgInput, badgeInput]);

  return (
    <div style={{ width: dim.total, height: dim.total }}>
      <RiveComponent />
    </div>
  );
}
*/
