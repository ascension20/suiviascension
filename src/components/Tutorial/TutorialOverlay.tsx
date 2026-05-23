import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// ── Step definitions ──────────────────────────────────────────────────────────

type StepKind = 'info' | 'action';

interface WaitFor {
  type: 'quest' | 'ds';
  minCount: number;
}

interface Step {
  id: string;
  selector: string;
  title: string;
  body: string;
  cta: string;
  ctaDone?: string;
  kind: StepKind;
  waitFor?: WaitFor;
}

const STEPS: Step[] = [
  {
    id: 'welcome',
    selector: 'body',
    title: 'Bienvenue sur Ascension 20 ! 🎮',
    body: "Ton tableau de bord est prêt. On fait un tour rapide ensemble pour que tu sois opérationnel en 2 minutes.",
    cta: "C'est parti !",
    kind: 'info',
  },
  {
    id: 'planning-intro',
    selector: '[data-tutorial="planning"]',
    title: 'Ton planning 📅',
    body: "Ici tu organises ta semaine : quêtes de révision, cours, DS. Tout ce que tu planifies et valides te rapporte de l'XP.",
    cta: 'Compris',
    kind: 'info',
  },
  {
    id: 'add-quest-1',
    selector: '[data-tutorial="planning-add"]',
    title: 'Ajoute ta 1ère quête ⚔️',
    body: 'Clique sur ce bouton +, choisis "Quête", remplis la matière et l\'horaire. Une quête = une session de révision planifiée.',
    cta: 'En attente…',
    ctaDone: 'Parfait, continuer !',
    kind: 'action',
    waitFor: { type: 'quest', minCount: 1 },
  },
  {
    id: 'add-quest-2',
    selector: '[data-tutorial="planning-add"]',
    title: 'Encore une quête ! 🔥',
    body: 'Super ! Planifie une 2ème quête, idéalement dans une autre matière. La régularité bat le talent — toujours.',
    cta: 'En attente…',
    ctaDone: 'Parfait, continuer !',
    kind: 'action',
    waitFor: { type: 'quest', minCount: 2 },
  },
  {
    id: 'add-ds',
    selector: '[data-tutorial="planning-add"]',
    title: 'Planifie un DS 🔴',
    body: 'Maintenant ajoute un contrôle à venir. Clique sur + et choisis "DS". Les jours DS apparaissent avec une pastille rouge.',
    cta: 'En attente…',
    ctaDone: 'Noté, continuer !',
    kind: 'action',
    waitFor: { type: 'ds', minCount: 1 },
  },
  {
    id: 'deepwork',
    selector: '[data-tutorial="deepwork"]',
    title: 'Le Deepwork ⏱',
    body: "Lance ce chrono quand tu travailles. Le taux XP monte avec le temps : 1→2→3 XP/min après 30 min. Pas de distraction !",
    cta: 'Continuer',
    kind: 'info',
  },
  {
    id: 'leaderboard',
    selector: '[data-tutorial="leaderboard"]',
    title: 'Le classement 🏆',
    body: "XP total et temps de deepwork de la semaine. Grimpe dans le classement en travaillant régulièrement. Bonne ascension !",
    cta: 'Terminer le tutoriel',
    kind: 'info',
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useRect(selector: string, tick: number) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    const measure = () => {
      if (selector === 'body') { setRect(null); return; }
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => setRect(el.getBoundingClientRect()), 380);
      } else {
        setRect(null);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, tick]);
  return rect;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  userId: string;
  onXpGain: (n: number) => void;
  onDone: () => void;
}

export function TutorialOverlay({ userId, onXpGain, onDone }: Props) {
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const [actionDone, setActionDone] = useState(false);
  const pollRef = useRef<number | null>(null);

  const step = STEPS[idx];
  const rect = useRect(step.selector, tick);
  const PAD = 10;

  // ── Count events in DB ───────────────────────────────────────────────────
  const checkAction = useCallback(async (waitFor: WaitFor) => {
    const { count } = await supabase
      .from('planning_events')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('type', waitFor.type);
    if ((count ?? 0) >= waitFor.minCount) {
      setActionDone(true);
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    }
  }, [userId]);

  // ── Start / stop polling on step change ─────────────────────────────────
  useEffect(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    setActionDone(false);
    setTick(t => t + 1);

    if (step.kind === 'action' && step.waitFor) {
      const wf = step.waitFor;
      checkAction(wf);
      pollRef.current = window.setInterval(() => checkAction(wf), 2000);
    }
    return () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // ── Navigation ───────────────────────────────────────────────────────────
  const finish = async () => {
    if (pollRef.current) clearInterval(pollRef.current);
    await supabase.from('profiles').update({ tutorial_completed: true }).eq('user_id', userId);
    onXpGain(15);
    onDone();
  };

  const next = () => {
    if (idx >= STEPS.length - 1) { finish(); return; }
    setIdx(i => i + 1);
  };

  const canAdvance = step.kind === 'info' || actionDone;

  // ── Overlay geometry ─────────────────────────────────────────────────────
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Pour les étapes "action" : pas de backdrop (l'élève doit interagir librement)
  // Pour les étapes "info" : backdrop avec trou autour de l'élément ciblé
  const isActionStep = step.kind === 'action';
  const box = (!isActionStep && rect)
    ? { top: rect.top - PAD, left: rect.left - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }
    : null;

  // Anneau doré autour de l'élément ciblé (info) ou du planning-add (action)
  const highlightBox = rect
    ? { top: rect.top - PAD, left: rect.left - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }
    : null;

  const cardWidth = Math.min(vw - 32, 400);
  // Carte toujours en bas pour les étapes action, sinon près de l'élément
  const cardTop = isActionStep
    ? vh - 240
    : box
      ? (box.top + box.height + 16 + 220 < vh ? box.top + box.height + 16 : box.top - 240)
      : vh / 2 - 110;

  return (
    <div className="fixed inset-0 z-[100]" style={{ pointerEvents: 'none' }}>

      {/* ── Backdrop (uniquement pour les étapes info) ── */}
      {!isActionStep && (
        box ? (
          <>
            <div className="absolute left-0 right-0 top-0 bg-black/80 pointer-events-auto"
                 style={{ height: Math.max(0, box.top) }} />
            <div className="absolute left-0 right-0 bg-black/80 pointer-events-auto"
                 style={{ top: box.top + box.height, bottom: 0 }} />
            <div className="absolute bg-black/80 pointer-events-auto"
                 style={{ top: box.top, width: Math.max(0, box.left), height: box.height }} />
            <div className="absolute bg-black/80 pointer-events-auto"
                 style={{ top: box.top, left: box.left + box.width, right: 0, height: box.height }} />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/80 pointer-events-auto" />
        )
      )}

      {/* ── Anneau doré (toujours visible sur l'élément ciblé) ── */}
      {highlightBox && (
        <div className="absolute pointer-events-none" style={{
          top: highlightBox.top, left: highlightBox.left,
          width: highlightBox.width, height: highlightBox.height,
          borderRadius: 10,
          boxShadow: isActionStep
            ? '0 0 0 2px hsl(43 90% 50%), 0 0 0 8px hsl(43 90% 50% / 0.2), 0 0 30px hsl(43 90% 50% / 0.5)'
            : '0 0 0 2px hsl(43 90% 50%), 0 0 0 4px hsl(43 90% 50% / 0.25), 0 0 40px hsl(43 90% 50% / 0.3)',
        }} />
      )}

      {/* ── Carte instruction ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-auto absolute"
          style={{
            top: Math.max(8, Math.min(cardTop, vh - 260)),
            left: vw / 2 - cardWidth / 2,
            width: cardWidth,
          }}
        >
          <div className="rounded-2xl p-5 border border-amber-500/40"
               style={{
                 background: 'hsl(222 22% 9%)',
                 boxShadow: '0 0 0 1px hsl(43 90% 50% / 0.2), 0 24px 64px rgba(0,0,0,0.8)',
               }}>

            {/* Progress */}
            <div className="flex items-center gap-1 mb-3">
              {STEPS.map((_, i) => (
                <div key={i} className="h-1 rounded-full transition-all duration-300"
                     style={{
                       width: i === idx ? 20 : 8,
                       background: i < idx ? 'hsl(43 90% 40%)' : i === idx ? 'hsl(43 90% 50%)' : 'hsl(222 18% 22%)',
                     }} />
              ))}
              <span className="ml-auto text-[10px] text-muted-foreground">{idx + 1}/{STEPS.length}</span>
            </div>

            <h3 className="font-display font-bold text-[15px] mb-1.5 leading-snug">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.body}</p>

            {/* Action feedback */}
            {step.kind === 'action' && (
              <div className="mb-3 px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all duration-300"
                   style={{
                     background: actionDone ? 'hsl(142 70% 30% / 0.2)' : 'hsl(43 90% 50% / 0.08)',
                     borderColor: actionDone ? 'hsl(142 70% 45% / 0.5)' : 'hsl(43 90% 50% / 0.3)',
                     color: actionDone ? 'hsl(142 70% 60%)' : 'hsl(43 90% 65%)',
                   }}>
                {actionDone
                  ? <><span>✓</span><span>Action détectée — bien joué !</span></>
                  : <><span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(43 90% 50%)' }} />
                    <span>En attente de ton action dans le planning…</span></>}
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <button onClick={finish}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
                Passer
              </button>
              <button
                onClick={next}
                disabled={!canAdvance}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: canAdvance ? 'hsl(43 90% 50%)' : 'hsl(222 18% 18%)',
                  color: canAdvance ? 'hsl(222 22% 8%)' : 'hsl(220 10% 45%)',
                }}
              >
                {step.kind === 'action'
                  ? (actionDone ? (step.ctaDone ?? 'Continuer !') : 'En attente…')
                  : step.cta}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
