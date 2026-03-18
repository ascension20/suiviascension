import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelUpData {
  level: number;
  title: string;
  xpGained: number;
}

interface Props {
  data: LevelUpData | null;
  onDismiss: () => void;
}

export function LevelUpOverlay({ data, onDismiss }: Props) {
  useEffect(() => {
    if (data) {
      const timer = setTimeout(onDismiss, 3500);
      return () => clearTimeout(timer);
    }
  }, [data, onDismiss]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'hsl(var(--background) / 0.85)' }}
          onClick={onDismiss}
        >
          {/* Flash */}
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{ backgroundColor: 'hsl(var(--xp) / 0.15)' }}
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="text-8xl mb-4"
            >
              ⚔️
            </motion.div>
            <h1 className="font-display text-5xl font-bold mb-2" style={{ color: 'hsl(var(--xp))' }}>
              Niveau {data.level}
            </h1>
            <p className="font-display text-2xl text-foreground mb-3">{data.title}</p>
            <p className="text-muted-foreground text-sm">+{data.xpGained} XP gagnés</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
