import { ExternalLink } from 'lucide-react';

const METHODS_URL = 'https://ascension20.github.io/methodes/';

// ── Design tokens — mirror the methodes site exactly ────────────────────────
const C = {
  bg:       '#faf9f6',
  surface:  '#ffffff',
  surface2: '#f3f2ef',
  border:   '#e0ddd8',
  border2:  '#ccc9c2',
  text:     '#1a1916',
  muted:    '#8a8178',
  gold:     '#c9973a',
  goldDim:  'rgba(201,151,58,0.12)',
  goldGlow: 'rgba(201,151,58,0.05)',
} as const;

export function ResourcesTab() {
  return (
    <>
      {/* Load the same Google Fonts as the methodes site */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .m-ressources-root {
          background: ${C.bg};
          color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: calc(100vh - 80px);
          margin: -1.5rem -1.5rem 0;      /* bleed past the main padding */
          padding: 2.5rem 2rem 3rem;
          position: relative;
        }

        /* Gold grain texture — identical to the site */
        .m-ressources-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          mix-blend-mode: multiply;
        }

        .m-ressources-root > * { position: relative; z-index: 1; }

        /* ── Header ── */
        .m-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        /* Radial gold glow behind title */
        .m-header::before {
          content: '';
          position: absolute;
          top: -40px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 220px;
          background: radial-gradient(ellipse at center, rgba(201,151,58,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .m-logo-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: ${C.muted};
          margin-bottom: 0.3rem;
        }

        .m-gold-divider {
          width: 32px;
          height: 1px;
          background: linear-gradient(to right, transparent, ${C.gold}, transparent);
          margin: 0.4rem auto 0.8rem;
        }

        .m-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 6vw, 3.8rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: ${C.text};
          margin: 0 0 0.5rem;
        }

        .m-title-gold {
          color: ${C.gold};
          font-style: italic;
        }

        .m-subtitle {
          color: ${C.muted};
          font-size: 0.85rem;
          font-weight: 300;
          max-width: 420px;
          margin: 0 auto 0.8rem;
          line-height: 1.7;
        }

        /* ✦ stars */
        .m-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .m-star {
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          color: ${C.gold};
          line-height: 1;
          user-select: none;
        }

        /* Open link */
        .m-open-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid ${C.border2};
          background: transparent;
          color: ${C.muted};
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.45rem 1.1rem;
          border-radius: 100px;
          transition: all 0.18s ease;
        }
        .m-open-link:hover {
          border-color: ${C.gold};
          color: ${C.gold};
        }

        /* ── Iframe wrapper ── */
        .m-iframe-wrapper {
          border: 1px solid ${C.border};
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(201,151,58,0.06),
            0 4px 32px rgba(26,25,22,0.1);
          height: calc(100vh - 280px);
          min-height: 500px;
          background: ${C.surface};
        }

        .m-iframe-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        /* Hint text */
        .m-hint {
          text-align: center;
          margin-top: 0.75rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: ${C.muted};
        }
        .m-hint a {
          color: ${C.gold};
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .m-hint a:hover { opacity: 0.8; }
      `}</style>

      <div className="m-ressources-root">

        {/* ── Decorative ✦ stars ── */}
        <div className="m-stars" aria-hidden="true">
          <span className="m-star" style={{ top: '6%', left: '4%',  fontSize: '3rem',   opacity: 0.45 }}>✦</span>
          <span className="m-star" style={{ top: '18%', left: '10%', fontSize: '1.4rem', opacity: 0.3  }}>✦</span>
          <span className="m-star" style={{ top: '5%',  right: '5%', fontSize: '3.5rem', opacity: 0.4  }}>✦</span>
          <span className="m-star" style={{ top: '20%', right: '12%',fontSize: '2rem',   opacity: 0.32 }}>✦</span>
          <span className="m-star" style={{ top: '12%', left: '20%', fontSize: '1.2rem', opacity: 0.28 }}>✦</span>
        </div>

        {/* ── Header ── */}
        <header className="m-header">
          <p className="m-logo-label">Ascension</p>
          <div className="m-gold-divider" />
          <h1 className="m-title">
            Méthodes <span className="m-title-gold">de révision</span>
          </h1>
          <p className="m-subtitle">
            Uniquement les méthodes qui marchent — rappel actif, répétition espacée, et IA.
          </p>
          <a
            href={METHODS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="m-open-link"
          >
            Ouvrir <ExternalLink size={11} />
          </a>
        </header>

        {/* ── Iframe ── */}
        <div className="m-iframe-wrapper">
          <iframe
            src={METHODS_URL}
            title="Méthodes Ascension"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>

        <p className="m-hint">
          Page non affichée ?{' '}
          <a href={METHODS_URL} target="_blank" rel="noopener noreferrer">
            Ouvrir dans un nouvel onglet
          </a>
        </p>

      </div>
    </>
  );
}
