import React from 'react';

/* Campus Cycle logo mark — a near-complete 300° arc with a directional dot.
   Suggests circulation/cycle without recycling-triangle cliché.
   Works as standalone mark or alongside wordmark. */

export function LogoMark({ size = 28, color = 'currentColor' }) {
  // Arc: circle r=10, center 14,14. 300° arc, gap at top-right.
  // Start: 90° - 150° = -60° → (14 + 10·cos(-60°), 14 + 10·sin(-60°)) = (19, 5.34)
  // End:   90° + 150° = 240° → (14 + 10·cos(240°), 14 + 10·sin(240°)) = (9, 5.34)
  // Going clockwise (sweep-flag=1), large-arc=1
  const cx = 14, cy = 14, r = 10;
  const startAngle = -60 * (Math.PI / 180);
  const endAngle = 240 * (Math.PI / 180);
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  // Arrowhead dot slightly inside the arc end
  const dotAngle = 225 * (Math.PI / 180);
  const dx = cx + (r - 0.5) * Math.cos(dotAngle);
  const dy = cy + (r - 0.5) * Math.sin(dotAngle);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={`M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${r} ${r} 0 1 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={dx.toFixed(3)} cy={dy.toFixed(3)} r="2.2" fill={color} />
    </svg>
  );
}

export function LogoWordmark({ size = 22, color = 'currentColor', markColor }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <LogoMark size={size + 6} color={markColor || color} />
      <span style={{
        fontSize: size,
        fontWeight: 700,
        letterSpacing: '-0.035em',
        color,
        lineHeight: 1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
      }}>
        Campus Cycle
      </span>
    </span>
  );
}

/* Standalone SVG strings for export / favicon use */
export const LOGO_MARK_SVG_MONO = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 19 5.34 A 10 10 0 1 1 9 5.34" stroke="#1a1a18" stroke-width="2" stroke-linecap="round"/>
  <circle cx="9.56" cy="5.93" r="2.2" fill="#1a1a18"/>
</svg>`;

export const LOGO_MARK_SVG_GREEN = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 19 5.34 A 10 10 0 1 1 9 5.34" stroke="#1a5c3f" stroke-width="2" stroke-linecap="round"/>
  <circle cx="9.56" cy="5.93" r="2.2" fill="#1a5c3f"/>
</svg>`;

export default LogoWordmark;
