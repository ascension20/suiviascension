import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Medal, ChevronDown } from 'lucide-react';

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
  datasets: LeaderboardDataset[];           // [global, weekly, daily] or similar
  weeklyChampion?: string | null;
}

export function WeeklyLeaderboard({ title, datasets, weeklyChampion }: Props) {
  const navigate = useNavigate();
  const [periodIdx, setPeriodIdx] = useState(0);

  const current = datasets[periodIdx] ?? datasets[0];
  const { data, unit, emptyLabel } = current;

  const rankColor = (rank: number) => {
    if (rank === 1) return 'hsl(43 90% 50%)';
    if (rank === 2) return 'hsl(210 10% 65%)';
    if (rank === 3) return 'hsl(25 60% 55%)';
    return 'hsl(var(--border))';
  };

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={11} style={{ color: 'hsl(43 90% 50%)' }} />;
    if (rank === 2) return <Medal size={11} style={{ color: 'hsl(210 10% 65%)' }} />;
    if (rank === 3) return <Medal size={11} style={{ color: 'hsl(25 60% 55%)' }} />;
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm font-semibold">{title}</h3>

        {/* Period selector */}
        <div className="flex gap-1">
          {datasets.map((ds, i) => (
            <button
              key={ds.label}
              onClick={() => setPeriodIdx(i)}
              className="px-2 py-0.5 rounded text-[10px] font-semibold transition-all"
              style={
                i === periodIdx
                  ? { background: 'hsl(var(--primary))', color: 'hsl(222 22% 8%)' }
                  : { background: 'hsl(222 16% 14%)', color: 'hsl(220 10% 50%)' }
              }
            >
              {ds.label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 flex-1">
          {emptyLabel ?? 'Aucune donnée'}
        </p>
      ) : (
        <div className="space-y-1.5 flex-1">
          {data.map((entry, index) => (
            <button
              key={`${entry.userId}-${index}`}
              onClick={() => navigate(`/student/profile/${entry.userId}`)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-secondary/60 group text-left"
              style={entry.isCurrentUser ? { backgroundColor: 'hsl(var(--primary) / 0.08)' } : undefined}
            >
              {/* Rank */}
              <div className="w-5 flex items-center justify-center shrink-0">
                {rankIcon(entry.rank) ?? (
                  <span className="font-display text-xs tabular-nums text-muted-foreground">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0 relative"
                style={{ border: `2px solid ${rankColor(entry.rank)}` }}
              >
                {entry.avatar}
                {weeklyChampion && entry.pseudo === weeklyChampion && entry.rank === 1 && (
                  <span className="absolute -top-2 -right-2 text-xs">👑</span>
                )}
              </div>

              {/* Name */}
              <span className="font-medium text-sm flex-1 truncate">
                {entry.pseudo}
                {entry.isCurrentUser && (
                  <span className="text-xs text-muted-foreground ml-1">(toi)</span>
                )}
              </span>

              {/* Value */}
              <span
                className="font-display text-sm tabular-nums shrink-0 font-semibold"
                style={{ color: entry.rank === 1 ? 'hsl(43 90% 55%)' : undefined }}
              >
                {entry.value.toLocaleString()}
                <span className="text-xs text-muted-foreground font-normal ml-1">{unit}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
