import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface Step {
  selector: string;
  title: string;
  body: string;
  cta: string;
}

const STEPS: Step[] = [
  { selector: '[data-tutorial="planning"]', title: 'Voici ton planning', body: "C'est ici que tu organises ta semaine : tes quêtes (révisions) et tes DS. On va en ajouter ensemble, c'est rapide.", cta: 'Compris' },
  { selector: '[data-tutorial="planning"]', title: 'Choisis le type "Quête"', body: "Clique sur + puis sélectionne le bouton Quête pour planifier une révision.", cta: 'Continuer' },
  { selector: '[data-tutorial="planning"]', title: 'Complète puis valide', body: "Une fois la quête faite, clique sur Valider pour gagner ton XP.", cta: 'Continuer' },
  { selector: '[data-tutorial="planning"]', title: 'Ajoute un DS', body: "De la même façon, ajoute tes contrôles à venir : c'est le type DS.", cta: 'Continuer' },
  { selector: '[data-tutorial="deepwork"]', title: 'Le deepwork, c\'est quoi ?', body: "Le deepwork est ton chrono de concentration : tu le lances quand tu travailles vraiment.", cta: 'Continuer' },
  { selector: '[data-tutorial="leaderboard"]', title: 'Le classement', body: "Juste en dessous, tu retrouves le classement des élèves selon leur XP.", cta: 'Continuer' },
  { selector: 'body', title: 'Bravo, tu es prêt ! 🎉', body: "+15 XP pour avoir terminé le tutoriel. Bonne ascension !", cta: 'Commencer' },
];

interface Props {
  userId: string;
  onXpGain: (n: number) => void;
  onDone: () => void;
}

export function TutorialOverlay({ userId, onXpGain, onDone }: Props) {
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      const el = document.querySelector(STEPS[idx].selector) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => setRect(el.getBoundingClientRect()), 300);
      } else {
        setRect(null);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [idx]);

  const finish = async () => {
    await supabase.from('profiles').update({ tutorial_completed: true }).eq('user_id', userId);
    onXpGain(15);
    onDone();
  };

  const next = () => {
    if (idx === STEPS.length - 1) finish();
    else setIdx(i => i + 1);
  };

  const step = STEPS[idx];
  const pad = 8;
  const box = rect ? { top: rect.top - pad, left: rect.left - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 } : null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {box ? (
        <svg className="absolute inset-0 w-full h-full pointer-events-auto">
          <defs>
            <mask id="hole">
              <rect width="100%" height="100%" fill="white" />
              <rect x={box.left} y={box.top} width={box.width} height={box.height} rx={12} fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#hole)" />
          <rect x={box.left} y={box.top} width={box.width} height={box.height} rx={12} fill="none" stroke="hsl(38 92% 50%)" strokeWidth={2} />
        </svg>
      ) : (
        <div className="absolute inset-0 bg-black/75 pointer-events-auto" />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-6 max-w-sm w-[92%] bg-card border border-amber-500/40 rounded-xl p-5 shadow-2xl"
        >
          <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1">Tutoriel · {idx + 1}/{STEPS.length}</p>
          <h3 className="font-display font-bold text-base mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{step.body}</p>
          <div className="flex justify-between items-center">
            <button onClick={finish} className="text-xs text-muted-foreground hover:text-foreground">Passer</button>
            <button onClick={next} className="px-4 py-2 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600">
              {step.cta}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
