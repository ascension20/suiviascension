import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Accessory } from '@/lib/avatar/types';
import { RARITY_COLORS } from '@/lib/avatar/types';

interface UnlockToastProps {
  unlocks: Accessory[];
  onDismiss: () => void;
}

const RARITY_LABEL: Record<string, string> = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
};

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
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(222 22% 11%) 0%, hsl(222 22% 8%) 100%)',
              borderColor: rc.border,
              boxShadow: `${rc.glow}, 0 20px 40px hsl(222 22% 2% / 0.8)`,
              minWidth: 260,
            }}
          >
            {/* Gold top line */}
            <div
              className="absolute top-0 left-4 right-4 h-px rounded"
              style={{ background: `linear-gradient(90deg, transparent, ${rc.border}, transparent)` }}
            />

            {/* Emoji */}
            <div
              className="text-3xl leading-none shrink-0"
              style={{ filter: `drop-shadow(0 0 8px ${rc.border})` }}
            >
              {first.emoji}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                 style={{ color: rc.text }}>
                🔓 Nouveau déblocage !
              </p>
              <p className="font-display font-black text-base leading-tight text-foreground">
                {first.label}
              </p>
              <p className="text-[10px] mt-0.5"
                 style={{ color: rc.text }}>
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
