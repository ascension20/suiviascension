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

// ── Texte mixte : parse $...$ (LaTeX) et **...** (gras) ──────────────────────
export function MixedText({ text, className = '' }: { text: string; className?: string }) {
  // Split on $...$ OR **...** tokens
  const parts = text.split(/(\$[^$]+\$|\*\*[^*]+\*\*)/g);

  const rendered: React.ReactNode[] = [];
  let key = 0;

  for (const part of parts) {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      rendered.push(<InlineMath key={key++} tex={part.slice(1, -1)} />);
    } else if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      rendered.push(<strong key={key++} className="font-semibold text-white/95">{part.slice(2, -2)}</strong>);
    } else {
      // Newlines → <br>
      const lines = part.split('\n');
      lines.forEach((line, i) => {
        rendered.push(<React.Fragment key={key++}>{line}</React.Fragment>);
        if (i < lines.length - 1) rendered.push(<br key={key++} />);
      });
    }
  }

  return <span className={className}>{rendered}</span>;
}
