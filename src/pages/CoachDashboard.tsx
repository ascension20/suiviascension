import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Clock, BookOpen, TrendingUp, Lock } from 'lucide-react';
import { calculateLevel, getTitleForLevel } from '@/lib/game-utils';

const COACH_CODE = 'coach2025';

const STUDENTS = [
  { id: '1', pseudo: 'Théo', avatar: '🐺', totalXp: 2800, streak: 5, completionRate: 85, totalHours: 42, lastActive: "Aujourd'hui" },
  { id: '2', pseudo: 'Luna', avatar: '🦊', totalXp: 4500, streak: 12, completionRate: 92, totalHours: 68, lastActive: "Aujourd'hui" },
  { id: '3', pseudo: 'Axel', avatar: '🦅', totalXp: 3200, streak: 0, completionRate: 45, totalHours: 31, lastActive: 'Il y a 4 jours' },
  { id: '4', pseudo: 'Jade', avatar: '🐱', totalXp: 1900, streak: 8, completionRate: 78, totalHours: 25, lastActive: 'Hier' },
  { id: '5', pseudo: 'Enzo', avatar: '🐻', totalXp: 5100, streak: 15, completionRate: 95, totalHours: 89, lastActive: "Aujourd'hui" },
];

const ALERTS = [
  { type: 'danger' as const, message: 'Axel — Série à 0 depuis 4 jours, complétion à 45%', icon: AlertTriangle },
  { type: 'warning' as const, message: 'Jade — Contrôle de Maths dans 2 jours, aucune session récente', icon: Clock },
  { type: 'info' as const, message: '12 quêtes complétées aujourd\'hui par le groupe', icon: BookOpen },
];

const alertStyles = {
  danger: { bg: 'hsl(var(--destructive) / 0.08)', border: 'hsl(var(--destructive) / 0.25)', color: 'hsl(var(--destructive))' },
  warning: { bg: 'hsl(var(--xp) / 0.08)', border: 'hsl(var(--xp) / 0.25)', color: 'hsl(var(--xp))' },
  info: { bg: 'hsl(var(--primary) / 0.08)', border: 'hsl(var(--primary) / 0.25)', color: 'hsl(var(--primary))' },
};

function CompletionBadge({ rate }: { rate: number }) {
  const style = rate >= 80
    ? { backgroundColor: 'hsl(var(--success) / 0.15)', color: 'hsl(var(--success))' }
    : rate >= 50
      ? { backgroundColor: 'hsl(var(--xp) / 0.15)', color: 'hsl(var(--xp))' }
      : { backgroundColor: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' };

  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={style}>
      {rate}%
    </span>
  );
}

export default function CoachDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === COACH_CODE) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-lg p-8 max-w-sm w-full text-center"
        >
          <Lock className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
          <h2 className="font-display text-xl font-semibold mb-2">Accès Coach</h2>
          <p className="text-muted-foreground text-sm mb-6">Entrez le code d'accès pour continuer.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Code d'accès"
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {error && <p className="text-destructive text-xs">Code incorrect.</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Accéder
            </button>
          </form>
          <Link to="/" className="text-muted-foreground text-xs mt-4 inline-block hover:text-foreground transition-colors">
            ← Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    );
  }

  const dangerCount = STUDENTS.filter(s => s.completionRate < 50 || s.streak === 0).length;
  const completedToday = 12;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-lg font-semibold">Centre de Commande</h1>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-6"
        >
          <span className="text-destructive font-medium">{dangerCount} élève{dangerCount > 1 ? 's' : ''}</span> {dangerCount > 1 ? 'ont' : 'a'} besoin d'attention.
          {' '}<span className="text-foreground font-medium">{completedToday} quêtes</span> complétées aujourd'hui.
        </motion.p>

        {/* Alerts */}
        <div className="space-y-2 mb-6">
          {ALERTS.map((alert, i) => {
            const s = alertStyles[alert.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm"
                style={{ backgroundColor: s.bg, borderColor: s.border, color: s.color }}
              >
                <alert.icon size={16} />
                <span>{alert.message}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Élèves', value: STUDENTS.length, icon: '👥' },
            { label: 'XP moyen', value: Math.round(STUDENTS.reduce((a, s) => a + s.totalXp, 0) / STUDENTS.length).toLocaleString(), icon: '⚡' },
            { label: 'Série moyenne', value: Math.round(STUDENTS.reduce((a, s) => a + s.streak, 0) / STUDENTS.length), icon: '🔥' },
            { label: 'Heures totales', value: STUDENTS.reduce((a, s) => a + s.totalHours, 0), icon: '⏱' },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span>{stat.icon}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <span className="font-display text-2xl font-bold tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Student table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Tous les élèves</h2>
            <TrendingUp size={16} className="text-muted-foreground" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-[11px] text-muted-foreground uppercase tracking-wider">
                  <th className="px-5 py-3">Élève</th>
                  <th className="px-5 py-3">Niveau</th>
                  <th className="px-5 py-3">XP</th>
                  <th className="px-5 py-3">Série</th>
                  <th className="px-5 py-3">Complétion</th>
                  <th className="px-5 py-3">Heures</th>
                  <th className="px-5 py-3">Activité</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map(student => {
                  const { level } = calculateLevel(student.totalXp);
                  const studentTitle = getTitleForLevel(level);
                  return (
                    <tr key={student.id} className="border-b border-border/50 hover:bg-secondary/40 transition-colors cursor-pointer">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{student.avatar}</span>
                          <span className="font-medium text-sm">{student.pseudo}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-display text-sm">{level}</span>
                        <span className="text-[11px] text-muted-foreground ml-1">{studentTitle}</span>
                      </td>
                      <td className="px-5 py-3.5 tabular-nums text-sm">{student.totalXp.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span style={{ color: student.streak > 0 ? 'hsl(var(--streak))' : 'hsl(var(--destructive))' }}>
                          🔥 {student.streak}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <CompletionBadge rate={student.completionRate} />
                      </td>
                      <td className="px-5 py-3.5 tabular-nums text-sm">{student.totalHours}h</td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{student.lastActive}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
