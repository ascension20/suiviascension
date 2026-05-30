import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';

export interface LeaderboardEntry {
  rank: number;
  pseudo: string;
  avatar: string;
  value: number;
  userId: string;
  isCurrentUser?: boolean;
}

export interface LeaderboardDataset {
  label: string;
  data: LeaderboardEntry[];
  unit: string;
  emptyLabel?: string;
}

interface Props {
  title: string;
  datasets: LeaderboardDataset[];
  weeklyChampion?: string | null;
}

export function WeeklyLeaderboard({ title, datasets, weeklyChampion }: Props) {
  const navigate = useNavigate();
  const [periodIdx, setPeriodIdx] = useState(0);

  const current = datasets[periodIdx] ?? datasets[0];
  const { data, unit, emptyLabel } = current;

  const rankColors = {
    1: { border: 'hsl(43 90% 52%)', bg: 'hsl(43 90% 50% / 0.1)', text: 'hsl(43 90% 62%)' },
    2: { border: 'hsl(210 10% 62%)', bg: 'hsl(210 10% 50% / 0.08)', text: 'hsl(210 10% 72%)' },
    3: { border: 'hsl(25 60% 52%)', bg: 'hsl(25 60% 50% / 0.08)', text: 'hsl(25 60% 65%)' },
  } as const;

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={12} className="champion-glow" style={{ color: 'hsl(43 90% 55%)' }} />;
    if (rank === 2) return <Medal size={12} style={{ color: 'hsl(210 10% 65%)' }} />;
    if (rank === 3) return <Medal size={12} style={{ color: 'hsl(25 60% 58%)' }} />;
    return null;
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-5 flex flex-col game-panel scan-container"
      style={{ minHeight: 260 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold">{title}</h3>

        {/* Period selector */}
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'hsl(222 22% 11%)' }}>
          {datasets.map((ds, i) => (
            <button
              key={ds.label}
              onClick={() => setPeriodIdx(i)}
              className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wide transition-all duration-200"
              style={
                i === periodIdx
                  ? {
                      background: 'hsl(var(--primary))',
                      color: 'hsl(222 22% 8%)',
                      boxShadow: '0 0 10px hsl(43 90% 50% / 0.4)',
                    }
                  : { color: 'hsl(220 10% 50%)' }
              }
            >
              {ds.label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8 flex-1">
          {emptyLabel ?? 'Aucune donnée'}
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={periodIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-1.5 flex-1"
          >
            {data.map((entry, index) => {
              const rc = rankColors[entry.rank as 1 | 2 | 3];
              const isPodium = entry.rank <= 3;
              return (
                <motion.button
                  key={`${entry.userId}-${index}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                  onClick={() => navigate(`/student/profile/${entry.userId}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-left"
                  style={{
                    background: entry.isCurrentUser
                      ? 'hsl(43 90% 50% / 0.08)'
                      : entry.rank === 1 ? 'hsl(43 90% 50% / 0.06)'
                      : isPodium ? rc.bg : 'transparent',
                    border: entry.isCurrentUser
                      ? '1px solid hsl(43 90% 50% / 0.25)'
                      : isPodium ? `1px solid ${rc.border}33` : '1px solid transparent',
                    boxShadow: entry.rank === 1 ? '0 0 20px hsl(43 90% 50% / 0.08)' : undefined,
                  }}
                  whileHover={{ scale: 1.015, x: 2 }}
                >
                  {/* Rank badge */}
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 font-display font-black text-[10px] ${
                      isPodium ? `rank-${entry.rank}` : ''
                    }`}
                    style={
                      !isPodium
                        ? { color: 'hsl(220 10% 50%)', background: 'hsl(222 22% 13%)' }
                        : undefined
                    }
                  >
                    {rankIcon(entry.rank) ?? entry.rank}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative transition-all"
                    style={{
                      border: `2px solid ${isPodium ? rc.border : 'hsl(222 16% 22%)'}`,
                      background: isPodium ? `${rc.bg}` : 'hsl(222 22% 12%)',
                    }}
                  >
                    <img src={entry.avatar} alt={entry.pseudo} className="w-full h-full object-cover" />
                    {weeklyChampion && entry.pseudo === weeklyChampion && entry.rank === 1 && (
                      <Crown size={12} className="absolute -top-2 -right-2 champion-glow" style={{ color: 'hsl(43 90% 55%)' }} />
                    )}
                  </div>

                  {/* Name */}
                  <span className="font-medium text-sm flex-1 truncate">
                    {entry.pseudo}
                    {entry.isCurrentUser && (
                      <span className="text-[10px] text-muted-foreground ml-1 font-normal">(toi)</span>
                    )}
                  </span>

                  {/* Value */}
                  <span
                    className={`font-display text-sm tabular-nums shrink-0 font-bold transition-all ${
                      entry.rank === 1 ? 'neon-gold' : ''
                    }`}
                    style={{
                      color: isPodium ? rc.text : 'hsl(220 10% 65%)',
                    }}
                  >
                    {entry.value.toLocaleString()}
                    <span className="text-[10px] text-muted-foreground font-normal ml-1">{unit}</span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
