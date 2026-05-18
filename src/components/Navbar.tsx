import { Link, useLocation } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { NotificationBell } from './NotificationBell';

const NAV_LINKS = [
  { label: 'Build a Jar', to: '/build' },
  { label: 'My Jars',     to: '/jars' },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <header
      style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1440, margin: '0 auto',
        padding: isMobile ? '20px 16px 0' : '28px 56px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10, textDecoration: 'none' }}>
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ flexShrink: 0 }} aria-hidden="true">
          <rect x="0" y="0" width="32" height="32" rx="7.5" ry="7.5" fill="#2A1A4E" />
          <g transform="rotate(-4 16 17)">
            <rect x="6.2" y="9.5" width="19.6" height="2.2" rx="1.1" fill="#1A0F36" />
            <rect x="5.2" y="5.5" width="21.6" height="5.2" rx="2.2" fill="#D4E842" />
            <rect x="7.4" y="6.8" width="4.6" height="1.1" rx="0.55" fill="#FDF4E3" opacity="0.55" />
            <rect x="6.6" y="11.4" width="18.8" height="15.4" rx="3.4" fill="#FDF4E3" />
            <path d="M7.6 15.2 Q11 14.2 16 14.6 T24.4 15.2" fill="none" stroke="#C4A8E8" strokeWidth="0.9" strokeLinecap="round" />
            <circle cx="10.4" cy="21.6" r="1.3" fill="#A8D8A8" />
            <circle cx="21.4" cy="22.4" r="1.1" fill="#F4845A" />
            <circle cx="22.2" cy="18.6" r="0.85" fill="#E8A2C8" />
            <circle cx="13.0" cy="19.6" r="1.05" fill="#2A1A4E" />
            <circle cx="18.4" cy="19.6" r="1.05" fill="#2A1A4E" />
            <circle cx="11.4" cy="22.0" r="0.9" fill="#F4845A" opacity="0.55" />
            <circle cx="20.0" cy="22.0" r="0.9" fill="#F4845A" opacity="0.55" />
            <path d="M13.4 22.4 Q15.7 24.2 18.0 22.4" fill="none" stroke="#2A1A4E" strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <circle cx="3.6" cy="14.4" r="0.7" fill="#D4E842" />
          <circle cx="28.6" cy="6.6" r="0.7" fill="#D4E842" />
          <circle cx="29" cy="24" r="0.7" fill="#F4845A" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 30, color: '#2A1A4E', lineHeight: 1,
          display: width < 400 ? 'none' : 'inline',
          whiteSpace: 'nowrap',
        }}>
          Brine <em style={{ color: '#F4845A', fontStyle: 'normal' }}>&</em> Shine
        </span>
      </Link>

      {/* Nav links + bell */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <nav style={{ display: 'flex', gap: isMobile ? 4 : 8 }}>
          {NAV_LINKS.map(({ label, to }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700, fontSize: isMobile ? 12 : 14,
                  textDecoration: 'none',
                  padding: isMobile ? '6px 10px' : '6px 14px',
                  borderRadius: 999,
                  color:      active ? '#FDF4E3' : '#2A1A4E',
                  background: active ? '#2A1A4E' : 'transparent',
                  transition: 'all 200ms ease',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <NotificationBell />
      </div>
    </header>
  );
}
