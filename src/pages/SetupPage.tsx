import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export default function SetupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if a coach already exists
    const { data: existingRoles } = await supabase.from('user_roles').select('id').eq('role', 'coach' as Database['public']['Enums']['app_role']).limit(1);
    if (existingRoles && existingRoles.length > 0) {
      setError('Un compte coach existe déjà. Connectez-vous.');
      setLoading(false);
      return;
    }

    // Create coach account
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { pseudo: 'Coach', avatar: '🛡️' } },
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Erreur lors de la création');
      setLoading(false);
      return;
    }

    // Assign coach role via SECURITY DEFINER bootstrap (only works if no coach exists)
    await supabase.rpc('bootstrap_first_coach');

    setDone(true);
    setLoading(false);

    // Redirect to coach dashboard
    setTimeout(() => navigate('/coach'), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-lg p-8 max-w-sm w-full text-center"
      >
        <Shield className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h1 className="font-display text-2xl font-bold mb-1">Configuration initiale</h1>
        <p className="text-muted-foreground text-sm mb-6">Créez le compte Coach pour démarrer.</p>

        {done ? (
          <div className="text-success font-medium">✅ Compte coach créé ! Redirection...</div>
        ) : (
          <form onSubmit={handleSetup} className="space-y-4 text-left">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email du coach</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="coach@example.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Mot de passe</label>
              <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
            </div>
            {error && <p className="text-destructive text-xs">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
              Créer le compte Coach
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
