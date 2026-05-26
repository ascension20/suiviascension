/**
 * Avatar component — DiceBear avataaars
 *
 * Each equipped accessory contributes URL params to the avataaars URL.
 * The badge slot is rendered as an emoji overlay (avataaars has no badge).
 *
 * Drop-in Rive upgrade: uncomment the Rive block at the bottom.
 */

import { motion } from 'framer-motion';
import type { AvatarConfig } from '@/lib/avatar/types';
import { RARITY_COLORS } from '@/lib/avatar/types';
import { getAccessory } from '@/lib/avatar/accessories';

// ─────────────────────────────────────────────────────────────
// URL builder
// ─────────────────────────────────────────────────────────────

export function buildAvataaarsUrl(config: AvatarConfig, seed: string): string {
  const parts: string[] = [`seed=${encodeURIComponent(seed || 'default')}`];

  const hat     = config.hat        ? getAccessory(config.hat)        : null;
  const glasses = config.glasses    ? getAccessory(config.glasses)    : null;
  const outfit  = config.outfit     ? getAccessory(config.outfit)     : null;
  const bg      = config.background ? getAccessory(config.background) : null;

  if (hat?.dicebearParam)     parts.push(hat.dicebearParam);
  if (glasses?.dicebearParam) parts.push(glasses.dicebearParam);
  else                        parts.push('accessoriesProbability=0');
  if (outfit?.dicebearParam)  parts.push(outfit.dicebearParam);
  if (bg?.dicebearParam)      parts.push(bg.dicebearParam);
  else                        parts.push('backgroundColor=0d1117&backgroundType[]=solid');

  return `https://api.dicebear.com/9.x/avataaars/svg?${parts.join('&')}`;
}

// ─────────────────────────────────────────────────────────────
// Sizes
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function Avatar({
  config,
  size = 'md',
  animated = true,
  seed = 'default',
  className = '',
}: AvatarProps) {
  const total  = SIZE_CONFIG[size].total;
  const radius = size === 'xl' ? '1.25rem' : '0.75rem';

  const badgeAcc = config.badge ? getAccessory(config.badge) : null;
  const bgAcc    = config.background ? getAccessory(config.background) : null;

  // Extract background color for the frame (fallback)
  const bgHex = bgAcc?.dicebearParam?.match(/backgroundColor=([0-9a-fA-F]{6})/)?.[1] ?? '0d1117';

  const url = buildAvataaarsUrl(config, seed);

  return (
    <div
      className={`relative overflow-hidden select-none shrink-0 ${className}`}
      style={{
        width: total,
        height: total,
        borderRadius: radius,
        background: `#${bgHex}`,
      }}
    >
      {/* Avataaars SVG */}
      <motion.img
        src={url}
        alt="avatar"
        animate={animated ? { y: [0, -2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Badge overlay — bottom right */}
      {badgeAcc?.badgeSymbol && (
        <div
          className="absolute pointer-events-none leading-none"
          style={{
            bottom: Math.round(total * 0.04),
            right: Math.round(total * 0.05),
            fontSize: Math.round(total * 0.2),
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))',
          }}
        >
          {badgeAcc.badgeSymbol}
        </div>
      )}

      {/* Gold corner brackets (xl only) */}
      {size === 'xl' && (
        <>
          {(['tl','tr','bl','br'] as const).map(corner => (
            <div
              key={corner}
              className="absolute w-5 h-5 pointer-events-none"
              style={{
                top:    corner.startsWith('t') ? 0 : undefined,
                bottom: corner.startsWith('b') ? 0 : undefined,
                left:   corner.endsWith('l')   ? 0 : undefined,
                right:  corner.endsWith('r')   ? 0 : undefined,
                borderTop:    corner.startsWith('t') ? '2px solid hsl(43 90% 55% / 0.8)' : undefined,
                borderBottom: corner.startsWith('b') ? '2px solid hsl(43 90% 55% / 0.8)' : undefined,
                borderLeft:   corner.endsWith('l')   ? '2px solid hsl(43 90% 55% / 0.8)' : undefined,
                borderRight:  corner.endsWith('r')   ? '2px solid hsl(43 90% 55% / 0.8)' : undefined,
                borderRadius:
                  corner === 'tl' ? '1.25rem 0 0 0' :
                  corner === 'tr' ? '0 1.25rem 0 0' :
                  corner === 'bl' ? '0 0 0 1.25rem' : '0 0 1.25rem 0',
              }}
            />
          ))}
        </>
      )}

      {/* Rarity glow ring (xl only, if badge equipped) */}
      {size === 'xl' && badgeAcc && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[1.25rem]"
          style={{ boxShadow: RARITY_COLORS[badgeAcc.rarity].glow }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FUTURE: Rive integration
// ─────────────────────────────────────────────────────────────
/*
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

function RiveAvatar({ config, size = 'md', seed }: AvatarProps) {
  const total = SIZE_CONFIG[size].total;
  const { RiveComponent, rive } = useRive({
    src: '/avatar/character.riv',
    stateMachines: 'Main',
    autoplay: true,
  });

  const inputs = {
    hat:        useStateMachineInput(rive, 'Main', 'hat'),
    glasses:    useStateMachineInput(rive, 'Main', 'glasses'),
    outfit:     useStateMachineInput(rive, 'Main', 'outfit'),
    background: useStateMachineInput(rive, 'Main', 'background'),
    badge:      useStateMachineInput(rive, 'Main', 'badge'),
  };

  useEffect(() => {
    const slots = ['hat','glasses','outfit','background','badge'] as const;
    slots.forEach(slot => {
      const acc = config[slot] ? getAccessory(config[slot]!) : null;
      if (inputs[slot] && acc?.riveValue !== undefined) {
        inputs[slot]!.value = acc.riveValue;
      }
    });
  }, [config, inputs]);

  return <div style={{ width: total, height: total }}><RiveComponent /></div>;
}
*/
