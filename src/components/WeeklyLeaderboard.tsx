import { useNavigate } from 'react-router-dom';
import { Crown, Medal, ExternalLink } from 'lucide-react';

export interface LeaderboardEntry {
  rank: number;
  pseudo: string;
  avatar: string;
  value: number;
  userId: string;
  isCurrentUser?: boolean;
}

interface Props {
  title: string;
  subtitle?: string;
  data: LeaderboardEntry[];
  unit: string;
  weeklyChampion?: string | null;
  emptyLabel?: string;
}

export function WeeklyLeaderboard({ title, subtitle, data, unit, weeklyChampion, emptyLabel }: Props) {
  const navigate = useNavigate();

  const rankColor = (rank: number) => {
    if (rank === 1) return 'hsl(43 90% 50%)';   // gold
    if (rank === 2) return 'hsl(210 10% 65%)';  // silver
    if (rank === 3) return 'hsl(25 60% 55%)';   // bronze
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
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          {emptyLabel ?? 'Aucune donnée'}
        </p>
      ) : (
        <div className="space-y-1.5 flex-1">
          {data.map((entry, index) => (
            <button
              key={`${entry.userId}-${index}`}
              onClick={() => navigate(`/student/profile/${entry.userId}`)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-secondary/60 group"
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
              <span className="font-medium text-sm flex-1 truncate text-left">
                {entry.pseudo}
                {entry.isCurrentUser && (
                  <span className="text-xs text-muted-foreground ml-1">(toi)</span>
                )}
              </span>

              {/* Profile link icon */}
              <ExternalLink
                size={11}
                className="shrink-0 text-muted-foreground opacity-0 group-hover:opacity-60 transition-opacity"
              />

              {/* Value */}
              <span className="font-display text-sm tabular-nums shrink-0 font-semibold"
                    style={{ color: entry.rank === 1 ? 'hsl(43 90% 55%)' : undefined }}>
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
