import React from 'react';
import katex from 'katex';

// ── Rendu LaTeX inline ─────────────────────────────────────────────────────────
export function InlineMath({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: false });
  return <span className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── Rendu LaTeX bloc (display mode) ───────────────────────────────────────────
export function BlockMath({ tex, className = '' }: { tex: string; className?: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: true });
  return (
    <div
      className={`katex-block overflow-x-auto py-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ── Texte mixte : parse les $...$ inline ────────────────────────────────────
export function MixedText({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const tex = part.slice(1, -1);
          return <InlineMath key={i} tex={tex} />;
        }
        // Handle newlines
        return (
          <React.Fragment key={i}>
            {part.split('\n').map((line, j, arr) => (
              <React.Fragment key={j}>
                {line}
                {j < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </span>
  );
}
