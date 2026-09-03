import { useEffect, useState } from 'react';

const LOFI_KEY  = 'ascension_lofi_enabled';
const TRACK_KEY = 'ascension_lofi_track';

// ── Playlist deepwork ──────────────────────────────────────────────────────
// Mélange d'un morceau local et de radios d'ambiance libres (SomaFM),
// pour éviter la boucle unique et varier l'atmosphère de travail.
export interface LofiTrack { id: string; label: string; src: string; }

export const LOFI_PLAYLIST: LofiTrack[] = [
  { id: 'local',      label: 'Lofi Ascension',   src: '/music/lofi.mp3' },
  { id: 'groove',     label: 'Groove Salad',     src: 'https://ice1.somafm.com/groovesalad-128-mp3' },
  { id: 'fluid',      label: 'Fluid (lofi hop)', src: 'https://ice1.somafm.com/fluid-128-mp3' },
  { id: 'dronezone',  label: 'Drone Zone',       src: 'https://ice1.somafm.com/dronezone-128-mp3' },
  { id: 'spacestation', label: 'Space Station',  src: 'https://ice1.somafm.com/spacestation-128-mp3' },
  { id: 'lush',       label: 'Lush',             src: 'https://ice1.somafm.com/lush-128-mp3' },
  { id: 'deepspace',  label: 'Deep Space One',   src: 'https://ice1.somafm.com/deepspaceone-128-mp3' },
];

// ── Singleton au niveau module ─────────────────────────────────────────────
// Survive aux navigations / remontages de composant.
let _audio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio();
    _audio.loop   = true;
    _audio.volume = 0.15;
  }
  return _audio;
}
// ──────────────────────────────────────────────────────────────────────────

function initialIndex() {
  const stored = localStorage.getItem(TRACK_KEY);
  const i = stored ? LOFI_PLAYLIST.findIndex(t => t.id === stored) : -1;
  return i >= 0 ? i : 0;
}

export function useLofiMusic() {
  const [enabled, setEnabled] = useState(() => localStorage.getItem(LOFI_KEY) === '1');
  const [index, setIndex]     = useState(initialIndex);

  useEffect(() => {
    const audio = getAudio();
    const track = LOFI_PLAYLIST[index];
    localStorage.setItem(TRACK_KEY, track.id);

    if (enabled) {
      const absolute = new URL(track.src, window.location.origin).href;
      if (audio.src !== absolute) audio.src = track.src;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    localStorage.setItem(LOFI_KEY, enabled ? '1' : '0');
  }, [enabled, index]);

  // Pas de cleanup: on veut que l'audio continue quand on navigue ailleurs.
  return {
    enabled,
    toggle: () => setEnabled(v => !v),
    track: LOFI_PLAYLIST[index],
    playlist: LOFI_PLAYLIST,
    next: () => setIndex(i => (i + 1) % LOFI_PLAYLIST.length),
    prev: () => setIndex(i => (i - 1 + LOFI_PLAYLIST.length) % LOFI_PLAYLIST.length),
    select: (id: string) => {
      const i = LOFI_PLAYLIST.findIndex(t => t.id === id);
      if (i >= 0) setIndex(i);
    },
  };
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

/**
 * Alerte "marque ta présence" : triple bip montant, bien audible,
 * joué quand le check-in horaire du deepwork se déclenche.
 */
export function playCheckinSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const beeps = [
      { t: 0.00, f: 660 },
      { t: 0.28, f: 880 },
      { t: 0.56, f: 1174 },
    ];
    beeps.forEach(({ t, f }) => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = f;
      const start = ctx.currentTime + t;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.24);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.26);
    });
  } catch { /* ignore */ }
}
