import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Accessory } from '@/lib/avatar/types';
import { RARITY_COLORS } from '@/lib/avatar/types';
import { buildAvataaarsUrl } from './Avatar';
import type { AvatarConfig } from '@/lib/avatar/types';

const RARITY_LABEL: Record<string, string> = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
};

const PREVIEW_SEED = 'ascension-preview';

function unlockPreviewUrl(acc: Accessory): string {
  const config: AvatarConfig = {
    hat:        acc.slot === 'hat'        ? acc.id : null,
    glasses:    acc.slot === 'glasses'    ? acc.id : null,
    outfit:     acc.slot === 'outfit'     ? acc.id : 'outfit_hoodie',
    background: acc.slot === 'background' ? acc.id : 'bg_dark',
    badge:      null,
  };
  return buildAvataaarsUrl(config, PREVIEW_SEED);
}

interface UnlockToastProps {
  unlocks: Accessory[];
  onDismiss: () => void;
}

export function UnlockToast({ unlocks, onDismiss }: UnlockToastProps) {
  const first = unlocks[0];

  useEffect(() => {
    if (!first) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [first, onDismiss]);

  const rc = first ? RARITY_COLORS[first.rarity] : null;

  return (
    <AnimatePresence>
      {first && rc && (
        <motion.div
          key={first.id}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
          className="fixed bottom-6 left-1/2 z-50 pointer-events-auto"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(222 22% 11%) 0%, hsl(222 22% 8%) 100%)',
              borderColor: rc.border,
              boxShadow: `${rc.glow}, 0 20px 40px hsl(222 22% 2% / 0.8)`,
              minWidth: 280,
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-4 right-4 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${rc.border}, transparent)` }}
            />

            {/* Avatar preview */}
            <div
              className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border"
              style={{ borderColor: rc.border }}
            >
              {first.badgeSymbol ? (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl"
                  style={{ background: 'hsl(222 22% 14%)' }}
                >
                  {first.badgeSymbol}
                </div>
              ) : (
                <img
                  src={unlockPreviewUrl(first)}
                  alt={first.label}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                style={{ color: rc.text }}
              >
                🔓 Nouveau déblocage !
              </p>
              <p className="font-display font-black text-base leading-tight text-foreground truncate">
                {first.label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: rc.text }}>
                {RARITY_LABEL[first.rarity]}
                {unlocks.length > 1 && (
                  <span className="text-muted-foreground ml-1.5">
                    +{unlocks.length - 1} autre{unlocks.length > 2 ? 's' : ''}
                  </span>
                )}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
