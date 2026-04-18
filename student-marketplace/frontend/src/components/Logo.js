import React from 'react';

/*
  Campus Cycle logomark — precision orbit system.

  Five layers:
  1. Outer guide ring    — faint structural reference
  2. 12 tick marks       — clock/compass precision (4 cardinal + 8 minor)
  3. Primary orbit arc   — 300° clockwise, the main "cycle" form
  4. Secondary inner arc — 80° echo arc in lower half, adds orbital depth
  5. Node system         — direction dot at arc terminus + double center node
*/

export function LogoMark({ size = 32, color = 'currentColor', accent }) {
  const ac = accent || color;

  // 12 tick marks, every 30°. Cardinal ticks (0°, 90°, 180°, 270°) are longer.
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const θ = (i * 30 * Math.PI) / 180;
    const isCardinal = i % 3 === 0;
    const r1 = isCardinal ? 14.8 : 16.0;
    const r2 = 17.8;
    return {
      x1: +(20 + r1 * Math.cos(θ)).toFixed(3),
      y1: +(20 + r1 * Math.sin(θ)).toFixed(3),
      x2: +(20 + r2 * Math.cos(θ)).toFixed(3),
      y2: +(20 + r2 * Math.sin(θ)).toFixed(3),
      isCardinal,
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 1. Outer guide ring */}
      <circle cx="20" cy="20" r="18.5" stroke={color} strokeWidth="0.65" opacity="0.14" />

      {/* 2. Precision tick marks */}
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1}
          x2={t.x2} y2={t.y2}
          stroke={color}
          strokeWidth={t.isCardinal ? '1.1' : '0.7'}
          strokeLinecap="round"
          opacity={t.isCardinal ? '0.30' : '0.16'}
        />
      ))}

      {/* 3. Primary orbit arc — 300° clockwise
          Start: angle −60° → (26.5, 8.74)
          End:   angle 240° → (13.5, 8.74)
          Gap sits at the very top of the circle.
      */}
      <path
        d="M 26.5 8.74 A 13 13 0 1 1 13.5 8.74"
        stroke={ac}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* 4. Secondary inner arc — 80° clockwise through bottom of inner circle
          Start: 130° → (15.5, 25.36)
          End:   50°  → (24.5, 25.36)
          Passes through (20, 27), adds counter-orbital depth.
      */}
      <path
        d="M 15.5 25.36 A 7 7 0 0 1 24.5 25.36"
        stroke={ac}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.42"
      />

      {/* 5a. Direction dot at arc terminus — upper-left */}
      <circle cx="13.5" cy="8.74" r="2.9" fill={ac} />

      {/* 5b. Double center node — precision anchor */}
      <circle cx="20" cy="20" r="3.4" stroke={ac} strokeWidth="0.85" opacity="0.20" />
      <circle cx="20" cy="20" r="1.7" fill={ac} opacity="0.48" />
    </svg>
  );
}

export function LogoWordmark({ size = 20, color = 'currentColor', accent }) {
  const ac = accent || color;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      lineHeight: 1,
      userSelect: 'none',
    }}>
      <LogoMark size={size + 16} color={color} accent={ac} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontSize: size * 0.62,
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color,
          opacity: 0.42,
          lineHeight: 1,
          fontFamily: 'Inter, -apple-system, sans-serif',
        }}>
          Campus
        </span>
        <span style={{
          fontSize: size * 1.02,
          fontWeight: 800,
          letterSpacing: '-0.045em',
          color,
          lineHeight: 1.0,
          fontFamily: 'Inter, -apple-system, sans-serif',
        }}>
          Cycle
        </span>
      </span>
    </span>
  );
}

export default LogoWordmark;
