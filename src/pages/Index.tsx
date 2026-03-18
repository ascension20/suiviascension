import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          L'Académie de Fer
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Gagne des XP, monte de niveau et deviens <span className="font-display font-semibold" style={{ color: 'hsl(var(--xp))' }}>Maître</span>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
        <Link to="/student">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8 text-center cursor-pointer card-hover"
          >
            <Swords className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="font-display text-xl font-semibold mb-2">Élève</h2>
            <p className="text-muted-foreground text-sm">
              Tes quêtes, ton chronomètre et ta progression.
            </p>
          </motion.div>
        </Link>

        <Link to="/coach">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card border border-border rounded-lg p-8 text-center cursor-pointer card-hover"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-xp" />
            <h2 className="font-display text-xl font-semibold mb-2">Coach</h2>
            <p className="text-muted-foreground text-sm">
              Gère tes élèves et suis leur progression.
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
