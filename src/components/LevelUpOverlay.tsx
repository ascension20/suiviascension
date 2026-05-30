import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords } from 'lucide-react';

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
      const timer = setTimeout(onDismiss, 4500);
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: 'hsl(222 22% 3% / 0.9)' }}
          onClick={onDismiss}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)' }}
          />

          {/* Initial flash */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, hsl(43 90% 50% / 0.25) 0%, transparent 65%)' }}
          />

          {/* Expanding rings x3 */}
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.15, opacity: 0.85 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.8, delay, ease: 'easeOut' }}
              className="absolute w-40 h-40 rounded-full pointer-events-none"
              style={{ border: `${2.5 - i * 0.6}px solid hsl(43 90% 55% / ${0.75 - i * 0.2})` }}
            />
          ))}

          {/* Gold rays */}
          {[0, 45, 90, 135, 22, 67, 112, 157].map((angle, i) => (
            <motion.div
              key={`ray-${angle}`}
              initial={{ scaleX: 0, opacity: 0.7 }}
              animate={{ scaleX: 5, opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.05 + i * 0.03, ease: 'easeOut' }}
              className="absolute pointer-events-none"
              style={{
                width: i < 4 ? 160 : 80,
                height: i < 4 ? 2 : 1,
                background: `linear-gradient(90deg, hsl(43 90% ${55 + (i % 3) * 5}%), transparent)`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'left center',
              }}
            />
          ))}

          {/* Main panel */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: 'spring', bounce: 0.42, duration: 0.9, delay: 0.05 }}
            className="text-center relative z-10 px-4"
          >
            <div
              className="relative inline-block px-10 py-8 rounded-xl border"
              style={{
                background: 'linear-gradient(145deg, hsl(222 22% 11%) 0%, hsl(222 22% 7%) 100%)',
                borderColor: 'hsl(43 90% 50% / 0.5)',
                boxShadow:
                  '0 0 60px hsl(43 90% 50% / 0.28),' +
                  '0 0 120px hsl(43 90% 50% / 0.12),' +
                  '0 30px 60px hsl(222 22% 1% / 0.8),' +
                  'inset 0 0 40px hsl(43 90% 50% / 0.04)',
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 rounded-tl-sm" style={{ borderColor: 'hsl(43 90% 58%)' }} />
              <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 rounded-tr-sm" style={{ borderColor: 'hsl(43 90% 58%)' }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 rounded-bl-sm" style={{ borderColor: 'hsl(43 90% 58%)' }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 rounded-br-sm" style={{ borderColor: 'hsl(43 90% 58%)' }} />

              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/90 to-transparent" />

              {/* Sword */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.25, type: 'spring', bounce: 0.55 }}
                className="mb-4 flex items-center justify-center select-none"
              >
                <Swords size={72} style={{ color: 'hsl(43 90% 55%)', filter: 'drop-shadow(0 0 20px hsl(43 90% 50% / 0.7))' }} />
              </motion.div>

              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-[10px] font-bold tracking-[0.35em] uppercase mb-1"
                style={{ color: 'hsl(43 90% 55% / 0.65)' }}
              >
                ◈ Niveau atteint ◈
              </motion.p>

              {/* Level number */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', bounce: 0.45 }}
                className="font-display font-black neon-gold"
                style={{ fontSize: '5rem', color: 'hsl(var(--xp))', lineHeight: 1, marginBottom: '0.25rem' }}
              >
                {data.level}
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="font-display text-xl font-semibold mb-4"
                style={{ color: 'hsl(42 12% 88%)' }}
              >
                {data.title}
              </motion.p>

              {/* XP badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-bold text-sm"
                style={{
                  borderColor: 'hsl(43 90% 50% / 0.4)',
                  background: 'hsl(43 90% 50% / 0.1)',
                  color: 'hsl(43 90% 65%)',
                  boxShadow: '0 0 16px hsl(43 90% 50% / 0.2)',
                }}
              >
                +{data.xpGained} XP
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-[9px] text-muted-foreground mt-4 tracking-widest uppercase"
              >
                Appuie pour continuer
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
