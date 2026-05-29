import { ExternalLink } from 'lucide-react';

const METHODS_URL = 'https://ascension20.github.io/methodes/';

export function ResourcesTab() {
  return (
    <div className="pb-10">

      {/* ── Header card ───────────────────────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight mb-0.5">
            📚 Méthodes
          </h1>
          <p className="text-xs text-muted-foreground">
            Les méthodes Ascension pour progresser en continu.
          </p>
        </div>
        <a
          href={METHODS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10
                     text-xs font-medium text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
        >
          Ouvrir <ExternalLink size={11} />
        </a>
      </div>

      {/* ── iframe ────────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: '1px solid hsl(220 15% 16%)',
          boxShadow: '0 0 0 1px hsl(43 90% 50% / 0.08), 0 8px 40px hsl(222 22% 0% / 0.5)',
          height: 'calc(100vh - 200px)',
          minHeight: '520px',
        }}
      >
        <iframe
          src={METHODS_URL}
          title="Méthodes Ascension"
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>

      <p className="text-[11px] text-muted-foreground/60 mt-2 text-center">
        Page non affichée ?{' '}
        <a href={METHODS_URL} target="_blank" rel="noopener noreferrer"
           className="text-amber-400/70 underline hover:text-amber-300 transition-colors">
          Ouvrir dans un nouvel onglet
        </a>
      </p>
    </div>
  );
}
