import { useEffect, useState } from 'react';

const LOFI_KEY = 'ascension_lofi_enabled';

// ── Singleton au niveau module ─────────────────────────────────────────────
// Survive aux navigations / remontages de composant.
let _audio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio('/music/lofi.mp3');
    _audio.loop   = true;
    _audio.volume = 0.15;
  }
  return _audio;
}
// ──────────────────────────────────────────────────────────────────────────

export function useLofiMusic() {
  const [enabled, setEnabled] = useState(() => localStorage.getItem(LOFI_KEY) === '1');

  useEffect(() => {
    const audio = getAudio();
    if (enabled) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    localStorage.setItem(LOFI_KEY, enabled ? '1' : '0');
  }, [enabled]);

  // Pas de cleanup: on veut que l'audio continue quand on navigue ailleurs.
  // Le toggle suffit à stopper/démarrer.
  return { enabled, toggle: () => setEnabled(v => !v) };
}

export function playXpSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g  = ctx.createGain();
    o1.frequency.value = 880;
    o2.frequency.value = 1320;
    o1.type = 'triangle';
    o2.type = 'triangle';
    g.gain.value = 0.0001;
    g.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    o1.connect(g); o2.connect(g); g.connect(ctx.destination);
    o1.start(); o2.start();
    o1.stop(ctx.currentTime + 0.45);
    o2.stop(ctx.currentTime + 0.45);
  } catch { /* ignore */ }
}
