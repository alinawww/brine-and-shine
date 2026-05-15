import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundDecor } from '../components/BackgroundDecor';
import { IngredientIcon } from '../components/IngredientIcons';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { HOME_INGREDIENTS, type HomeIngredient } from '../data/homeIngredients';

// ── Bubble field ────────────────────────────────────────────

function BubbleField({ dark }: { dark: boolean }) {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    left:     `${8 + (i * 9) % 84}%`,
    size:     3.5 + (i * 7) % 5.5,
    duration: 4.2 + (i * 0.26) % 2.6,
    delay:    -(i * 0.7),
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 18 }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: b.left,
            width:  b.size * 2,
            height: b.size * 2,
            borderRadius: '50%',
            border:     `1px solid ${dark ? 'rgba(212,232,66,0.55)' : 'rgba(122,90,158,0.42)'}`,
            background: dark ? 'rgba(212,232,66,0.08)' : 'rgba(122,90,158,0.06)',
            animation:  `bs-bubble-rise ${b.duration}s cubic-bezier(0.22,0.61,0.36,1) ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Ingredient card ─────────────────────────────────────────

function IngredientCard({
  ingredient,
  index,
  isSelected,
  onNavigate,
  isMobile,
}: {
  ingredient: HomeIngredient;
  index: number;
  isSelected: boolean;
  onNavigate: (slug: string) => void;
  isMobile: boolean;
}) {
  const [hover, setHover] = useState(false);
  const dark = ingredient.brineDefault === 'salt';
  const baseRotate = ((index * 73) % 5) - 2.5;
  const rotate     = hover ? baseRotate * 0.3 : baseRotate * 0.5;

  return (
    <article
      onClick={() => onNavigate(ingredient.slug)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background:   dark ? '#2A1A4E' : '#FDF4E3',
        borderRadius: isMobile ? 20 : 28,
        padding:      isMobile ? 16 : 22,
        cursor:       'pointer',
        transform:    `rotate(${rotate}deg)${isSelected ? ' scale(1.04)' : ''}${hover ? ' translateY(-6px)' : ''}`,
        transition:   'all 280ms cubic-bezier(0.34,1.56,0.64,1)',
        border:       dark ? 'none' : `1.5px solid rgba(42,26,78,${hover ? 0.3 : 0.10})`,
        boxShadow:    dark
          ? hover
            ? '0 8px 0 #1A0F36, 0 16px 32px rgba(26,15,54,0.3)'
            : '0 4px 0 #1A0F36'
          : hover
            ? '0 8px 0 rgba(42,26,78,0.10), 0 16px 32px rgba(42,26,78,0.12)'
            : '0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 0 rgba(42,26,78,0.06)',
        animation:    isSelected ? 'bs-wiggle 0.7s ease-in-out' : 'none',
      }}
    >
      {/* Icon area */}
      <div
        style={{
          position:   'relative', height: 130,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(42,26,78,0.03)',
          borderRadius: 18, marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <BubbleField dark={dark} />
        <div
          style={{
            position:   'relative', zIndex: 1,
            transform:  hover ? 'rotate(-8deg) scale(1.06)' : 'none',
            transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <IngredientIcon name={ingredient.id} color={dark ? '#FDF4E3' : '#2A1A4E'} size={96} />
        </div>
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 26,
          color:      dark ? '#FDF4E3' : '#2A1A4E',
          margin:     '0 0 8px', lineHeight: 1,
        }}
      >
        {ingredient.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)', fontSize: isMobile ? 12 : 13.5,
          color:      dark ? 'rgba(253,244,227,0.78)' : 'rgba(42,26,78,0.78)',
          lineHeight: 1.45, margin: '0 0 12px', minHeight: isMobile ? 44 : 58,
        }}
      >
        {ingredient.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {ingredient.tags.map((tag, i) => (
          <span
            key={tag}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      isMobile ? 9 : 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding:       isMobile ? '3px 8px' : '4px 10px', borderRadius: 999,
              background:    i === 0
                ? '#D4E842'
                : dark ? 'rgba(253,244,227,0.12)' : 'rgba(122,90,158,0.12)',
              color:         i === 0
                ? '#2A1A4E'
                : dark ? 'rgba(253,244,227,0.7)' : '#7A5A9E',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div
        style={{
          borderTop:      `1px dashed ${dark ? 'rgba(253,244,227,0.25)' : 'rgba(122,90,158,0.3)'}`,
          paddingTop:     12,
          display:        'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily:     'var(--font-body)',
          fontSize:       12, fontWeight: 700,
          textTransform:  'uppercase', letterSpacing: '0.12em',
          color:          hover
            ? dark ? '#D4E842' : '#F4845A'
            : dark ? 'rgba(253,244,227,0.7)' : '#7A5A9E',
          transition:     'color 200ms ease',
        }}
      >
        <span>View guide</span>
        <svg width="22" height="14" viewBox="0 0 22 14" style={{ overflow: 'visible' }} aria-hidden="true">
          <g filter="url(#wobble)" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 1 7 L 20 7" />
            <path d="M 14 2 L 20 7 L 14 12" />
          </g>
        </svg>
      </div>
    </article>
  );
}

// ── Home page ───────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [brineFilter, setBrineFilter] = useState<'salt' | 'vinegar' | null>(null);
  const isMobile = useWindowWidth() < 768;

  const visibleIngredients = brineFilter
    ? HOME_INGREDIENTS.filter(ing => ing.brineDefault === brineFilter)
    : HOME_INGREDIENTS;

  const onSurprise = () => {
    const pool = visibleIngredients;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setSelected(pick.id);
    setTimeout(() => {
      setSelected(null);
      navigate(`/ingredient/${pick.slug}`);
    }, 1400);
  };

  const onNavigate = (slug: string) => navigate(`/ingredient/${slug}`);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundDecor />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: isMobile ? '60px 20px 60px' : '96px 56px 80px' }}>

        {/* ── Hero ── */}
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: 40, marginBottom: 60, alignItems: 'start' }}>

          {/* Left copy */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: '#7A5A9E', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#D4E842',
                boxShadow: '0 0 0 3px rgba(212,232,66,0.3)',
                display: 'inline-block', flexShrink: 0,
              }} />
              step one · pick your produce
            </p>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      isMobile ? 'clamp(48px, 12vw, 132px)' : 'clamp(64px, 9vw, 132px)',
              lineHeight:    0.95, letterSpacing: '0.005em',
              color:         '#2A1A4E', margin: '0 0 24px',
            }}>
              What are you<br />
              <span style={{ color: '#F4845A', fontStyle: 'italic', transform: 'rotate(-2deg)', display: 'inline-block', transformOrigin: 'left center' }}>
                pickling
              </span>
              <span style={{ transform: 'rotate(8deg) translateY(-6px)', display: 'inline-block', color: '#2A1A4E' }}>?</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 19, fontWeight: 500,
              color: '#7A5A9E', maxWidth: 480, lineHeight: 1.5,
            }}>
              Pick an ingredient. We'll set you up with a brine ratio, a spice blend, and a timeline that doesn't lie.
            </p>
          </div>

          {/* Right: button + stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 20, width: isMobile ? '100%' : 'fit-content' }}>
            <button
              onClick={onSurprise}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '18px 28px 18px 22px',
                background: '#D4E842', borderRadius: 999,
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontSize: 22,
                color: '#2A1A4E',
                boxShadow: '0 6px 0 0 #2A1A4E, 0 12px 24px rgba(42,26,78,0.18)',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform  = 'translateY(-2px) rotate(-2deg)';
                e.currentTarget.style.boxShadow  = '0 8px 0 0 #2A1A4E, 0 16px 28px rgba(42,26,78,0.22)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = '';
                e.currentTarget.style.boxShadow  = '0 6px 0 0 #2A1A4E, 0 12px 24px rgba(42,26,78,0.18)';
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform  = 'translateY(4px)';
                e.currentTarget.style.boxShadow  = '0 2px 0 0 #2A1A4E, 0 4px 8px rgba(42,26,78,0.12)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform  = 'translateY(-2px) rotate(-2deg)';
                e.currentTarget.style.boxShadow  = '0 8px 0 0 #2A1A4E, 0 16px 28px rgba(42,26,78,0.22)';
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#2A1A4E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
                animation: 'bs-spin 8s linear infinite',
              }}>
                🥒
              </span>
              <span>Surprise me</span>
              <span style={{
                borderLeft: '1px solid rgba(42,26,78,0.3)',
                paddingLeft: 12, marginLeft: 4,
                fontSize: 11, fontFamily: 'var(--font-body)',
                fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.16em', opacity: 0.55,
              }}>
                roll the jar
              </span>
            </button>

            {/* Stats pill */}
            <div style={{
              display: 'flex', gap: 24,
              padding: isMobile ? '12px 16px' : '18px 24px', borderRadius: 18,
              border: '1px dashed rgba(196,168,232,0.4)',
              background: 'rgba(42,26,78,0.04)',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
            }}>
              {[
                { n: '12', label: 'ingredients' },
                { n: '38', label: 'recipes' },
              ].map(({ n, label }) => (
                <div key={label} style={{ textAlign: isMobile ? 'left' : 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#2A1A4E', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A5A9E' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section header ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 8 : 20,
          paddingTop: 40, marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 40 }}>🍄</span>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A5A9E', margin: 0 }}>Category</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: '#2A1A4E', margin: 0, lineHeight: 1 }}>Vegetables</h2>
            </div>
          </div>
          {!isMobile && (
            <svg width="260" height="20" viewBox="0 0 260 20" fill="none" aria-hidden="true" style={{ flex: 1, maxWidth: 260 }}>
              <path d="M0 10 Q32 2 65 10 Q98 18 130 10 Q162 2 195 10 Q228 18 260 10" stroke="#C4A8E8" strokeWidth="2" />
            </svg>
          )}
          <div style={{ display: 'flex', gap: 8, marginLeft: isMobile ? 0 : 'auto' }}>
            <button
              onClick={() => setBrineFilter(f => f === 'salt' ? null : 'salt')}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                padding: '6px 14px', borderRadius: 999, border: 'none',
                background: '#2A1A4E', color: '#FDF4E3',
                cursor: 'pointer', transition: 'opacity 180ms ease',
                opacity: brineFilter === 'vinegar' ? 0.35 : 1,
              }}
            >
              ● Salt Brine
            </button>
            <button
              onClick={() => setBrineFilter(f => f === 'vinegar' ? null : 'vinegar')}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                padding: '6px 14px', borderRadius: 999,
                background: '#FDF4E3', color: '#2A1A4E',
                border: '1.5px solid rgba(42,26,78,0.15)',
                cursor: 'pointer', transition: 'opacity 180ms ease',
                opacity: brineFilter === 'salt' ? 0.35 : 1,
              }}
            >
              ● Vinegar Brine
            </button>
          </div>
        </div>

        {/* ── Grid ── */}
        <section
          className="bs-grid"
          style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 14 : 22 }}
        >
          {HOME_INGREDIENTS
            .map((ing, i) => ({ ing, i }))
            .filter(({ ing }) => !brineFilter || ing.brineDefault === brineFilter)
            .map(({ ing, i }) => (
              <IngredientCard
                key={ing.id}
                ingredient={ing}
                index={i}
                isSelected={selected === ing.id}
                onNavigate={onNavigate}
                isMobile={isMobile}
              />
            ))}
        </section>

        {/* ── Footer ── */}
        <footer style={{
          marginTop: 80, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontFamily: 'var(--font-display)', fontSize: 18, color: '#7A5A9E',
        }}>
          <span>Brine &amp; Shine</span>
          <span style={{ color: '#C4A8E8', fontSize: 20 }}>☀</span>
          <span>your gut will thank you</span>
        </footer>
      </div>
    </div>
  );
}
