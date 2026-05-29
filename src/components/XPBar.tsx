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
      <div className={cn('flex items-center gap-2', className)}>
        {/* LVL badge — compact */}
        <div
          className="stat-badge shrink-0 px-2 py-0.5 text-[10px] font-display font-black"
          style={{
            background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(43 90% 58%))',
            color: 'hsl(222 22% 8%)',
            boxShadow: '0 0 10px hsl(43 90% 50% / 0.55)',
          }}
        >
          {level}
        </div>

        {/* Track */}
        <div
          className="relative h-1.5 overflow-hidden flex-1"
          style={{
            background: 'hsl(222 22% 12%)',
            minWidth: 70,
            clipPath: 'polygon(3px 0%,calc(100% - 3px) 0%,100% 3px,100% calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,0% calc(100% - 3px),0% 3px)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 energy-bar transition-all duration-700"
            style={{
              width: `${percentage}%`,
              boxShadow: percentage > 3
                ? '2px 0 8px hsl(43 90% 55% / 0.9), 4px 0 18px hsl(43 90% 50% / 0.5)'
                : 'none',
            }}
          />
          {/* Tick marks */}
          <div className="absolute inset-0 progress-ticks pointer-events-none" style={{ opacity: 0.45 }} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* LVL badge */}
      <div
        className="stat-badge shrink-0 px-2.5 py-1 text-xs font-display font-black"
        style={{
          background: 'linear-gradient(135deg, hsl(43 90% 38%), hsl(50 100% 62%))',
          color: 'hsl(222 22% 8%)',
          boxShadow: '0 0 14px hsl(43 90% 50% / 0.6)',
        }}
      >
        LVL {level}
      </div>

      {/* Title */}
      <span
        className="text-[10px] font-bold uppercase tracking-widest shrink-0 hidden lg:block"
        style={{ color: 'hsl(43 90% 50% / 0.65)' }}
      >
        {title}
      </span>

      {/* Track */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          height: 10,
          minWidth: 100,
          background: 'hsl(222 22% 11%)',
          clipPath: 'polygon(5px 0%,calc(100% - 5px) 0%,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0% calc(100% - 5px),0% 5px)',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.65)',
        }}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 energy-bar transition-all duration-700"
          style={{
            width: `${percentage}%`,
            boxShadow: percentage > 3
              ? '3px 0 10px hsl(43 90% 55% / 1), 6px 0 24px hsl(43 90% 50% / 0.6), 8px 0 40px hsl(43 90% 50% / 0.25)'
              : 'none',
          }}
        />
        {/* Tick segments */}
        <div className="absolute inset-0 progress-ticks pointer-events-none" style={{ opacity: 0.4 }} />
        {/* Shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* XP counter */}
      <span
        className="text-xs tabular-nums shrink-0 font-display font-semibold"
        style={{ color: 'hsl(43 90% 60%)' }}
      >
        {current.toLocaleString('fr-FR')}
        <span className="text-muted-foreground font-normal"> / {max.toLocaleString('fr-FR')}</span>
      </span>
    </div>
  );
}
