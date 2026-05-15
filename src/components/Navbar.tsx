import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Ingredients', to: '/' },
  { label: 'Build a Jar', to: '/build' },
  { label: 'My Jars',     to: '/jars' },
] as const;

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1440, margin: '0 auto',
        padding: '28px 56px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ overflow: 'visible' }} aria-hidden="true">
          <g filter="url(#wobble)">
            <rect x="9"  y="10" width="22" height="24" rx="4" fill="#2A1A4E" />
            <rect x="7"  y="6"  width="26" height="6"  rx="2" fill="#D4E842" />
            <path d="M 12 22 Q 20 18, 28 22" fill="none" stroke="#C4A8E8" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M 12 28 Q 20 24, 28 28" fill="none" stroke="#C4A8E8" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
            <circle cx="16" cy="25" r="1.6" fill="#E8A2C8" />
            <circle cx="24" cy="20" r="1.4" fill="#A8D8A8" />
            <circle cx="22" cy="30" r="1.3" fill="#F4845A" />
          </g>
        </svg>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: '#2A1A4E', lineHeight: 1 }}>
          Brine <em style={{ color: '#F4845A', fontStyle: 'normal' }}>&</em> Shine
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: 8 }}>
        {NAV_LINKS.map(({ label, to }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700, fontSize: 14,
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 999,
                color:      active ? '#FDF4E3' : '#2A1A4E',
                background: active ? '#2A1A4E' : 'transparent',
                transition: 'all 200ms ease',
                display: 'inline-block',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
