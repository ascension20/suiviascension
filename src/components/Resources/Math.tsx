import React from 'react';
import katex from 'katex';

// ── Rendu LaTeX inline ────────────────────────────────────────────────────────
export function InlineMath({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: false });
  return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Rendu LaTeX bloc (display mode) ──────────────────────────────────────────
export function BlockMath({ tex, className = '' }: { tex: string; className?: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: true });
  return (
    <div className={`katex-block overflow-x-auto py-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// ── Helpers internes ─────────────────────────────────────────────────────────
// Parse $...$ à l'intérieur d'un segment (sans récursion sur **)
function parseInlineMath(text: string, keyRef: { k: number }): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const parts = text.split(/(\$[^$]+\$)/g);
  for (const p of parts) {
    if (p.startsWith('$') && p.endsWith('$') && p.length > 2) {
      nodes.push(<InlineMath key={keyRef.k++} tex={p.slice(1, -1)} />);
    } else {
      const lines = p.split('\n');
      lines.forEach((line, i) => {
        nodes.push(<React.Fragment key={keyRef.k++}>{line}</React.Fragment>);
        if (i < lines.length - 1) nodes.push(<br key={keyRef.k++} />);
      });
    }
  }
  return nodes;
}

// ── Texte mixte : parse $...$ (LaTeX) et **...** (gras) ──────────────────────
// Ordre : on split d'abord sur ** puis on re-parse le $...$ à l'intérieur du gras.
export function MixedText({ text, className = '' }: { text: string; className?: string }) {
  // On split sur **...** en premier pour isoler les blocs gras,
  // puis chaque segment (gras ou non) est re-parsé pour le LaTeX inline.
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  const keyRef = { k: 0 };
  const rendered: React.ReactNode[] = [];

  for (const part of boldParts) {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      // Contenu gras : on y parse aussi le $...$ éventuel
      const inner = parseInlineMath(part.slice(2, -2), keyRef);
      rendered.push(
        <strong key={keyRef.k++} className="font-semibold text-white/95">{inner}</strong>
      );
    } else {
      // Texte normal : parse $...$
      rendered.push(...parseInlineMath(part, keyRef));
    }
  }

  return <span className={className}>{rendered}</span>;
}
