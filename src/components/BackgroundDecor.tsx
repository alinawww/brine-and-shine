type GlyphDatum = { top: string; size: number; delay: number } & (
  | { left: string; right?: never }
  | { right: string; left?: never }
);

const GLYPHS = ['✦', '✸', '☀', '✺', '❋', '✹', '✦', '✸'] as const;

const BLOB_DATA = [
  { cx: '8%',  cy: '12%', rx: 180, ry: 140, color: '#C4A8E8', opacity: 0.32 },
  { cx: '92%', cy: '18%', rx: 140, ry: 160, color: '#E8A2C8', opacity: 0.28 },
  { cx: '5%',  cy: '65%', rx: 160, ry: 120, color: '#A8D8A8', opacity: 0.25 },
  { cx: '90%', cy: '70%', rx: 130, ry: 150, color: '#D4E842', opacity: 0.18 },
  { cx: '50%', cy: '45%', rx: 200, ry: 160, color: '#C4A8E8', opacity: 0.12 },
];

const GLYPH_DATA: GlyphDatum[] = [
  { top: '8%',  left: '12%', size: 20, delay: 0 },
  { top: '15%', right: '10%', size: 16, delay: 3 },
  { top: '40%', left: '4%',  size: 24, delay: 7 },
  { top: '55%', right: '6%', size: 18, delay: 2 },
  { top: '70%', left: '15%', size: 14, delay: 5 },
  { top: '80%', right: '14%', size: 22, delay: 9 },
  { top: '25%', left: '88%', size: 16, delay: 4 },
  { top: '90%', left: '50%', size: 18, delay: 6 },
];

export function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none', overflow: 'hidden',
      }}
    >
      {/* Blobs */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="blob-blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        {BLOB_DATA.map((b, i) => (
          <ellipse
            key={i}
            cx={b.cx} cy={b.cy}
            rx={b.rx} ry={b.ry}
            fill={b.color}
            opacity={b.opacity}
            filter="url(#blob-blur)"
          />
        ))}
      </svg>

      {/* Dashed orbits */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[280, 380, 480].map((r, i) => (
          <circle
            key={i}
            cx="50%" cy="35%"
            r={r}
            fill="none"
            stroke="#C4A8E8"
            strokeWidth="0.8"
            strokeDasharray={`${6 + i * 2} ${4 + i}`}
            opacity={0.25 - i * 0.06}
          />
        ))}
      </svg>

      {/* Floating glyphs */}
      {GLYPH_DATA.map((g, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: g.top,
            left: g.left,
            right: g.right,
            fontSize: g.size,
            color: i % 2 === 0 ? '#C4A8E8' : '#E8A2C8',
            opacity: 0.5,
            animation: `bs-float ${12 + i * 3}s ease-in-out ${g.delay}s infinite`,
            fontFamily: 'system-ui',
            userSelect: 'none',
          }}
        >
          {GLYPHS[i]}
        </div>
      ))}
    </div>
  );
}
