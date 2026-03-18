import { Subject, SUBJECT_CSS_VAR } from '@/lib/game-utils';

export interface LeaderboardEntry {
  rank: number;
  pseudo: string;
  avatar: string;
  value: number;
  isCurrentUser?: boolean;
  subjectBreakdown?: Partial<Record<Subject, number>>;
}

interface Props {
  title: string;
  data: LeaderboardEntry[];
  unit: string;
}

export function WeeklyLeaderboard({ title, data, unit }: Props) {
  const rankBorder = (rank: number) => {
    if (rank === 1) return 'hsl(var(--xp))';
    if (rank === 2) return 'hsl(210, 10%, 65%)';
    if (rank === 3) return 'hsl(25, 60%, 50%)';
    return 'hsl(var(--border))';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-display text-base font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {data.map(entry => (
          <div
            key={entry.rank}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
            style={entry.isCurrentUser ? { backgroundColor: 'hsl(var(--primary) / 0.08)' } : undefined}
          >
            <span className="font-display text-sm w-5 tabular-nums text-muted-foreground">{entry.rank}.</span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
              style={{ border: `2px solid ${rankBorder(entry.rank)}` }}
            >
              {entry.avatar}
            </div>
            <span className="font-medium text-sm flex-1 truncate">
              {entry.pseudo}
              {entry.isCurrentUser && <span className="text-xs text-muted-foreground ml-1">(toi)</span>}
            </span>
            {entry.subjectBreakdown && (
              <div className="flex h-2 rounded-full overflow-hidden w-16 shrink-0">
                {Object.entries(entry.subjectBreakdown).map(([subj, val]) => (
                  <div
                    key={subj}
                    style={{
                      width: `${(val / entry.value) * 100}%`,
                      backgroundColor: `hsl(var(${SUBJECT_CSS_VAR[subj as Subject]}))`,
                    }}
                  />
                ))}
              </div>
            )}
            <span className="font-display text-sm tabular-nums shrink-0">
              {entry.value.toLocaleString()}
              <span className="text-xs text-muted-foreground ml-1">{unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
