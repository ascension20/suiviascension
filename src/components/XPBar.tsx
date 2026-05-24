import { cn } from '@/lib/utils';

interface XPBarProps {
  current: number;
  max: number;
  level: number;
  title: string;
  className?: string;
  compact?: boolean;
}

export function XPBar({ current, max, level, title, className, compact }: XPBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="font-display text-xs font-semibold neon-gold" style={{ color: 'hsl(var(--primary))' }}>
          Niv. {level}
        </span>
        <div
          className="h-2 rounded-full overflow-hidden min-w-[80px]"
          style={{ backgroundColor: 'hsl(var(--secondary))', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
        >
          <div
            className="h-full rounded-full energy-bar transition-all duration-700"
            style={{
              width: `${percentage}%`,
              boxShadow: '0 0 8px hsl(43 90% 50% / 0.7)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-display text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
          Niv. {level}
        </span>
        <span className="text-xs text-muted-foreground">— {title}</span>
      </div>
      <div
        className="flex-1 h-3 rounded-full overflow-hidden min-w-[100px]"
        style={{ backgroundColor: 'hsl(var(--secondary))', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}
      >
        <div
          className="h-full rounded-full energy-bar transition-all duration-700"
          style={{
            width: `${percentage}%`,
            boxShadow: '0 0 10px hsl(43 90% 50% / 0.6), 0 0 20px hsl(43 90% 50% / 0.2)',
          }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
        {current.toLocaleString()} / {max.toLocaleString()} XP
      </span>
    </div>
  );
}
