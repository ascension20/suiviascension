import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// ── Types ─────────────────────────────────────────────────────────────────────

type StepKind = 'info' | 'action' | 'modal';
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'center';

interface WaitFor { type: 'quest' | 'ds'; minCount: number; }

interface Step {
  id: string;
  selector: string;
  kind: StepKind;
  icon: string;
  title: string;
  body: string;
  cta: string;
  ctaDone?: string;
  waitFor?: WaitFor;
}

// ── Steps ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    id: 'welcome',
    selector: 'body',
    kind: 'modal',
    icon: '🚀',
    title: 'Bienvenue sur Ascension 20 !',
    body: "On fait un tour rapide ensemble pour que tu sois opérationnel en 2 minutes. Chaque fonctionnalité est là pour booster ta progression.",
    cta: "C'est parti !",
  },
  {
    id: 'streak',
    selector: '[data-tutorial="streak"]',
    kind: 'info',
    icon: '🔥',
    title: 'Ta série de jours',
    body: "Chaque jour où tu travailles fait monter ta flamme. Si tu sautes un jour, elle repart à zéro. La régularité, c'est tout.",
    cta: 'Compris !',
  },
  {
    id: 'xpbar',
    selector: '[data-tutorial="xpbar"]',
    kind: 'info',
    icon: '⚡',
    title: 'XP & Niveaux',
    body: "Chaque quête validée et chaque session de deepwork te rapporte de l'XP. Monte en niveau pour débloquer de nouveaux titres et grimpe dans le classement !",
    cta: 'Super !',
  },
  {
    id: 'deepwork',
    selector: '[data-tutorial="deepwork"]',
    kind: 'info',
    icon: '⏱',
    title: 'Le Deepwork',
    body: "Lance ce chrono dès que tu travailles sérieusement. Plus tu tiens longtemps, plus l'XP s'accélère : 1 → 2 → 3 XP/min après 30 min. Zéro distraction.",
    cta: 'Noté !',
  },
  {
    id: 'planning',
    selector: '[data-tutorial="planning"]',
    kind: 'info',
    icon: '📅',
    title: 'Ton planning',
    body: "Organise ta semaine ici. Ajoute tes quêtes de révision, tes cours et tes DS. Chaque quête validée rapporte de l'XP, les DS s'affichent en rouge.",
    cta: 'Compris !',
  },
  {
    id: 'planning-expand',
    selector: '[data-tutorial="planning-expand"]',
    kind: 'info',
    icon: '🗓️',
    title: 'Vue complète & Cours → DS',
    body: "Ce bouton ouvre la vue hebdomadaire complète. Si ton EDT est importé, clique sur n'importe quel cours pour le convertir en DS 🔴 — il apparaîtra en rouge dans ton planning.",
    cta: 'Parfait !',
  },
  {
    id: 'add-quest-1',
    selector: '[data-tutorial="planning-add"]',
    kind: 'action',
    icon: '⚔️',
    title: 'Ajoute ta 1ère quête',
    body: "Clique sur le bouton + juste ici et crée une quête de révision. Choisis la matière et l'horaire, puis valide.",
    cta: 'En attente…',
    ctaDone: 'Parfait ! Continuer →',
    waitFor: { type: 'quest', minCount: 1 },
  },
  {
    id: 'add-quest-2',
    selector: '[data-tutorial="planning-expand"]',
    kind: 'action',
    icon: '🔥',
    title: 'Encore une quête !',
    body: "Clique sur ce bouton pour ouvrir la vue complète du planning, puis ajoute une 2ème quête depuis là. C'est la vue que tu utiliseras au quotidien.",
    cta: 'En attente…',
    ctaDone: 'Excellent ! Continuer →',
    waitFor: { type: 'quest', minCount: 2 },
  },
  {
    id: 'add-ds',
    selector: '[data-tutorial="planning-add"]',
    kind: 'action',
    icon: '📝',
    title: 'Ton prochain DS',
    body: 'Clique sur + et choisis "DS". Entre la date et la matière. Tes DS apparaîtront en rouge dans ton planning.',
    cta: 'En attente…',
    ctaDone: 'Noté ! Continuer →',
    waitFor: { type: 'ds', minCount: 1 },
  },
  {
    id: 'leaderboard',
    selector: '[data-tutorial="leaderboard"]',
    kind: 'info',
    icon: '🏆',
    title: 'Le classement',
    body: "Vois où tu te situes face aux autres élèves en XP et en temps de deepwork. Le #1 du chrono porte une couronne 👑. Grimpe !",
    cta: 'Top !',
  },
  {
    id: 'profile',
    selector: '[data-tutorial="profile"]',
    kind: 'info',
    icon: '🧑‍💻',
    title: 'Ton profil',
    body: "Clique sur ton avatar pour accéder à ton profil : statistiques, progression, et personnalisation de l'avatar.",
    cta: 'OK !',
  },
  {
    id: 'completion',
    selector: 'body',
    kind: 'modal',
    icon: '🎉',
    title: 'Tutoriel terminé !',
    body: "Tu es prêt. Lance-toi : planifie, travaille en deepwork, valide tes quêtes. Dans 3 mois tu regarderas ta moyenne et tu souriras.",
    cta: 'Jouer ! 🚀',
  },
];

// ── localStorage key ──────────────────────────────────────────────────────────

const LS_KEY = 'ascension_tutorial_step';

// ── useRect ───────────────────────────────────────────────────────────────────

function useRect(selector: string, tick: number) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setRect(null);
    if (selector === 'body') return;

    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const t = document.querySelector(selector) as HTMLElement | null;
      if (t) setRect(t.getBoundingClientRect());
    }, 420);

    const remeasure = () => {
      const t = document.querySelector(selector) as HTMLElement | null;
      if (t) setRect(t.getBoundingClientRect());
    };
    const onScroll = () => requestAnimationFrame(remeasure);

    window.addEventListener('resize', remeasure);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('scroll', onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, tick]);

  return rect;
}

// ── Popover positioning ───────────────────────────────────────────────────────

const CARD_W  = 320;
const CARD_H  = 230; // estimated
const GAP     = 14;
const PAD_INFO   = 10;
const PAD_ACTION = 22;

interface CardPos {
  top: number;
  left: number;
  placement: Placement;
  arrowAlong: number; // px offset of arrow along the card edge
}

function getCardPos(rect: DOMRect, vw: number, vh: number): CardPos {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;

  const clampL = (l: number) => Math.max(12, Math.min(l, vw - CARD_W - 12));
  const clampT = (t: number) => Math.max(12, Math.min(t, vh - CARD_H - 12));
  const arrowL = (l: number) => Math.max(16, Math.min(cx - l, CARD_W - 32));
  const arrowT = (t: number) => Math.max(16, Math.min(cy - t, CARD_H - 32));

  // below
  if (rect.bottom + GAP + CARD_H < vh) {
    const left = clampL(cx - CARD_W / 2);
    return { top: rect.bottom + GAP, left, placement: 'bottom', arrowAlong: arrowL(left) };
  }
  // above
  if (rect.top - GAP - CARD_H > 0) {
    const left = clampL(cx - CARD_W / 2);
    return { top: rect.top - GAP - CARD_H, left, placement: 'top', arrowAlong: arrowL(left) };
  }
  // right
  if (rect.right + GAP + CARD_W < vw) {
    const top = clampT(cy - CARD_H / 2);
    return { top, left: rect.right + GAP, placement: 'right', arrowAlong: arrowT(top) };
  }
  // left
  if (rect.left - GAP - CARD_W > 0) {
    const top = clampT(cy - CARD_H / 2);
    return { top, left: rect.left - GAP - CARD_W, placement: 'left', arrowAlong: arrowT(top) };
  }
  // fallback: centered at bottom
  return { top: vh - CARD_H - 16, left: vw / 2 - CARD_W / 2, placement: 'center', arrowAlong: 0 };
}

// Small CSS-triangle arrow pointing toward the highlighted element
function Arrow({ placement, along }: { placement: Placement; along: number }) {
  if (placement === 'center') return null;

  const SIZE = 10;
  const HALF = SIZE / 2;
  const base: React.CSSProperties = {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    background: 'hsl(222 22% 9%)',
    transform: 'rotate(45deg)',
  };
  const border = '1px solid hsl(43 90% 50% / 0.4)';

  if (placement === 'bottom') return (
    <div style={{ ...base, top: -HALF - 1, left: along - HALF,
      borderTop: border, borderLeft: border }} />
  );
  if (placement === 'top') return (
    <div style={{ ...base, bottom: -HALF - 1, left: along - HALF,
      borderBottom: border, borderRight: border }} />
  );
  if (placement === 'right') return (
    <div style={{ ...base, left: -HALF - 1, top: along - HALF,
      borderLeft: border, borderBottom: border }} />
  );
  if (placement === 'left') return (
    <div style={{ ...base, right: -HALF - 1, top: along - HALF,
      borderTop: border, borderRight: border }} />
  );
  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  userId: string;
  onXpGain: (n: number) => void;
  onDone: () => void;
}

export function TutorialOverlay({ userId, onXpGain, onDone }: Props) {
  // Restore step from localStorage so navigation away/back resumes correctly
  const [idx, setIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved !== null) {
        const n = parseInt(saved, 10);
        if (!isNaN(n) && n >= 0 && n < STEPS.length) return n;
      }
    } catch { /* ignore */ }
    return 0;
  });

  const [tick, setTick]             = useState(0);
  const [actionDone, setActionDone] = useState(false);
  const pollRef = useRef<number | null>(null);

  const step = STEPS[idx];
  const isModal  = step.kind === 'modal';
  const isAction = step.kind === 'action';
  const PAD      = isAction ? PAD_ACTION : PAD_INFO;

  const rect = useRect(step.selector, tick);

  // Persist step index to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, String(idx)); } catch { /* ignore */ }
  }, [idx]);

  // ── Polling ───────────────────────────────────────────────────────────────
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

  // ── Navigation ────────────────────────────────────────────────────────────
  const finish = async () => {
    if (pollRef.current) clearInterval(pollRef.current);
    await supabase.from('profiles').update({ tutorial_completed: true }).eq('user_id', userId);
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
    onXpGain(15);
    onDone();
  };

  const next = () => {
    if (idx >= STEPS.length - 1) { finish(); return; }
    setIdx(i => i + 1);
  };

  const canAdvance = step.kind !== 'action' || actionDone;

  // ── Geometry ─────────────────────────────────────────────────────────────
  const vw = typeof window !== 'undefined' ? window.innerWidth  : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Backdrop cut-out (null for modal steps or while rect is loading)
  const box = (!isModal && rect)
    ? { top: rect.top - PAD, left: rect.left - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }
    : null;

  // Card position (tooltip steps only)
  const pos = (!isModal && rect) ? getCardPos(rect, vw, vh) : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100]" style={{ pointerEvents: 'none' }}>

      {/* ── Dark backdrop ───────────────────────────────────────────────── */}
      {box ? (
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
      )}

      {/* ── Gold ring around highlighted element ────────────────────────── */}
      {box && (
        <div className="absolute pointer-events-none" style={{
          top: box.top, left: box.left, width: box.width, height: box.height,
          borderRadius: 10,
          boxShadow: isAction
            ? '0 0 0 2px hsl(43 90% 50%), 0 0 0 8px hsl(43 90% 50% / 0.2), 0 0 32px hsl(43 90% 50% / 0.5)'
            : '0 0 0 2px hsl(43 90% 50%), 0 0 0 4px hsl(43 90% 50% / 0.25), 0 0 40px hsl(43 90% 50% / 0.3)',
        }} />
      )}

      {/* ── Tooltip card (info & action steps) ──────────────────────────── */}
      <AnimatePresence mode="wait">
        {!isModal && pos && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.94, y: pos.placement === 'bottom' ? -6 : pos.placement === 'top' ? 6 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-auto absolute"
            style={{ top: pos.top, left: pos.left, width: CARD_W }}
          >
            <div className="relative rounded-2xl border border-amber-500/35 p-5"
                 style={{
                   background: 'hsl(222 22% 8%)',
                   boxShadow: '0 0 0 1px hsl(43 90% 50% / 0.15), 0 16px 48px rgba(0,0,0,0.85)',
                 }}>

              {/* Arrow pointing to element */}
              <Arrow placement={pos.placement} along={pos.arrowAlong} />

              {/* Progress dots */}
              <div className="flex items-center gap-1 mb-4">
                {STEPS.map((_, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-300"
                       style={{
                         width: i === idx ? 18 : 6,
                         background: i < idx ? 'hsl(43 90% 45%)' : i === idx ? 'hsl(43 90% 55%)' : 'hsl(222 18% 22%)',
                       }} />
                ))}
                <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">{idx + 1}/{STEPS.length}</span>
              </div>

              {/* Content */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl leading-none mt-0.5 shrink-0">{step.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-[14px] leading-snug mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>

              {/* Action status */}
              {isAction && (
                <div className="mb-3 px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all duration-300"
                     style={{
                       background: actionDone ? 'hsl(142 70% 30% / 0.2)' : 'hsl(43 90% 50% / 0.07)',
                       borderColor: actionDone ? 'hsl(142 70% 45% / 0.5)' : 'hsl(43 90% 50% / 0.25)',
                       color: actionDone ? 'hsl(142 70% 60%)' : 'hsl(43 90% 65%)',
                     }}>
                  {actionDone
                    ? <><span>✓</span><span>Action détectée — bien joué !</span></>
                    : <><span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: 'hsl(43 90% 50%)' }} />
                       <span>En attente de ton action…</span></>}
                </div>
              )}

              {/* Button */}
              <button
                onClick={next}
                disabled={!canAdvance}
                className="w-full py-2 rounded-xl text-xs font-bold transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed"
                style={{
                  background: canAdvance ? 'hsl(43 90% 50%)' : 'hsl(222 18% 16%)',
                  color: canAdvance ? 'hsl(222 22% 8%)' : 'hsl(220 10% 40%)',
                }}
              >
                {isAction ? (actionDone ? (step.ctaDone ?? 'Continuer →') : 'En attente…') : step.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Centered modal (welcome & completion) ───────────────────────── */}
      <AnimatePresence mode="wait">
        {isModal && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute"
            style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: Math.min(vw - 32, 440),
            }}
          >
            <div className="rounded-3xl border border-amber-500/35 p-8 text-center"
                 style={{
                   background: 'hsl(222 22% 7%)',
                   boxShadow: '0 0 0 1px hsl(43 90% 50% / 0.2), 0 32px 80px rgba(0,0,0,0.9)',
                 }}>

              {/* Icon */}
              <div className="text-5xl mb-4 leading-none">{step.icon}</div>

              <h2 className="font-display font-black text-xl mb-3 leading-tight">{step.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">{step.body}</p>

              {/* XP reward on completion step */}
              {step.id === 'completion' && (
                <div className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                     style={{ background: 'hsl(43 90% 50% / 0.15)', color: 'hsl(43 90% 55%)', border: '1px solid hsl(43 90% 50% / 0.3)' }}>
                  ⚡ +15 XP débloqués
                </div>
              )}

              {/* Progress dots */}
              <div className="flex justify-center items-center gap-1 mb-6">
                {STEPS.map((_, i) => (
                  <div key={i} className="h-1.5 rounded-full transition-all duration-300"
                       style={{
                         width: i === idx ? 20 : 7,
                         background: i < idx ? 'hsl(43 90% 45%)' : i === idx ? 'hsl(43 90% 55%)' : 'hsl(222 18% 22%)',
                       }} />
                ))}
              </div>

              <button
                onClick={next}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'hsl(43 90% 50%)', color: 'hsl(222 22% 8%)' }}
              >
                {step.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
