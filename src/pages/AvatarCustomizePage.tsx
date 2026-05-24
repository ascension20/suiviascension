import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useAvatarConfig } from '@/hooks/useAvatarConfig';
import { useUnlocks } from '@/hooks/useUnlocks';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { UnlockToast } from '@/components/avatar/UnlockToast';

export default function AvatarCustomizePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { config, saving, setConfig, saveConfig } = useAvatarConfig(user?.id);
  const { unlockedIds, newlyUnlocked, stats, dismissNewUnlocks } = useUnlocks(user?.id);

  const handleSave = async () => {
    await saveConfig();
    navigate('/student/profile');
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header
        className="border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-20 backdrop-blur-sm hud-top-line"
        style={{ backgroundColor: 'hsl(222 22% 5% / 0.92)' }}
      >
        <button
          onClick={() => navigate('/student/profile')}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: 'hsl(43 90% 55%)' }} />
          <h1 className="font-display font-semibold">Personnaliser l'avatar</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AvatarCustomizer
            config={config}
            unlockedIds={unlockedIds}
            stats={stats}
            saving={saving}
            seed={profile?.pseudo ?? user?.id ?? 'default'}
            onConfigChange={setConfig}
            onSave={handleSave}
          />
        </motion.div>
      </main>

      {/* Unlock toast */}
      <UnlockToast unlocks={newlyUnlocked} onDismiss={dismissNewUnlocks} />
    </div>
  );
}
