import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundDecor } from '../components/BackgroundDecor';
import { StepIllustration, wavySine } from '../components/TimelineIllustrations';
import { IngredientIcon } from '../components/IngredientIcons';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { INGREDIENTS, READY_MADE, type GridItem } from '../data/ingredients';

// ── Helpers ─────────────────────────────────────────────────

function parseTime(tag: string): number {
  const first = parseInt(tag.match(/\d+/)?.[0] ?? '0', 10);
  if (/hour/i.test(tag)) return first / 24;
  if (/week/i.test(tag)) return first * 7;
  return first;
}

// ── Bubble field ─────────────────────────────────────────────

function BubbleField({ variant }: { variant: 'dark' | 'light' | 'lime' }) {
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    left:     `${8 + (i * 9) % 84}%`,
    size:     3.5 + (i * 7) % 5.5,
    duration: 4.2 + (i * 0.26) % 2.6,
    delay:    -(i * 0.7),
  }));

  const colors = variant === 'dark'
    ? { border: 'rgba(212,232,66,0.55)', bg: 'rgba(212,232,66,0.08)' }
    : variant === 'lime'
      ? { border: 'rgba(42,26,78,0.25)', bg: 'rgba(42,26,78,0.06)' }
      : { border: 'rgba(122,90,158,0.42)', bg: 'rgba(122,90,158,0.06)' };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 18 }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', bottom: 0, left: b.left,
            width: b.size * 2, height: b.size * 2, borderRadius: '50%',
            border: `1px solid ${colors.border}`,
            background: colors.bg,
            animation: `bs-bubble-rise ${b.duration}s cubic-bezier(0.22,0.61,0.36,1) ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Grid card ────────────────────────────────────────────────

function GridCard({
  item, index, isSelected, onNavigate, isMobile,
}: {
  item: GridItem;
  index: number;
  isSelected: boolean;
  onNavigate: (id: string) => void;
  isMobile: boolean;
}) {
  const [hover, setHover] = useState(false);

  const isReadyMade = item.cardType === 'readymade';
  const isSalt      = item.cardType === 'custom' && item.brineDefault === 'salt';

  const bubbleVariant = isReadyMade ? 'lime' : isSalt ? 'dark' : 'light';
  const baseRotate = ((index * 73) % 5) - 2.5;
  const rotate     = hover ? baseRotate * 0.3 : baseRotate * 0.5;

  const bg     = isReadyMade ? '#D4E842' : isSalt ? '#2A1A4E' : '#FDF4E3';
  const border = isReadyMade || isSalt ? 'none'
    : `1.5px solid rgba(42,26,78,${hover ? 0.3 : 0.10})`;
  const shadow = isReadyMade
    ? (hover
        ? '0 8px 0 rgba(42,26,78,0.2), 0 16px 32px rgba(42,26,78,0.15)'
        : '0 4px 0 rgba(42,26,78,0.2), 0 1px 0 rgba(255,255,255,0.4) inset')
    : isSalt
      ? (hover
          ? '0 8px 0 #1A0F36, 0 16px 32px rgba(26,15,54,0.3)'
          : '0 4px 0 #1A0F36')
      : (hover
          ? '0 8px 0 rgba(42,26,78,0.10), 0 16px 32px rgba(42,26,78,0.12)'
          : '0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 0 rgba(42,26,78,0.06)');

  const textColor  = isReadyMade || !isSalt ? '#2A1A4E' : '#FDF4E3';
  const mutedColor = isReadyMade
    ? 'rgba(42,26,78,0.72)'
    : isSalt
      ? 'rgba(253,244,227,0.78)'
      : 'rgba(42,26,78,0.78)';
  const ctaColor = hover
    ? (isReadyMade ? '#2A1A4E' : isSalt ? '#D4E842' : '#F4845A')
    : (isReadyMade ? 'rgba(42,26,78,0.7)' : isSalt ? 'rgba(253,244,227,0.7)' : '#7A5A9E');

  return (
    <article
      onClick={() => onNavigate(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position:     'relative',
        background:   bg,
        borderRadius: isMobile ? 20 : 28,
        padding:      isMobile ? 16 : 22,
        cursor:       'pointer',
        transform:    `rotate(${rotate}deg)${isSelected ? ' scale(1.04)' : ''}${hover ? ' translateY(-6px)' : ''}`,
        transition:   'all 280ms cubic-bezier(0.34,1.56,0.64,1)',
        border,
        boxShadow:    shadow,
        animation:    isSelected ? 'bs-wiggle 0.7s ease-in-out' : 'none',
      }}
    >
      {/* Classic badge */}
      {isReadyMade && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(42,26,78,0.12)', color: '#2A1A4E',
          fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.10em',
          padding: '3px 8px', borderRadius: 999,
        }}>
          Classic
        </div>
      )}

      {/* Icon area */}
      <div style={{
        position: 'relative', height: 130,
        background: isReadyMade
          ? 'rgba(42,26,78,0.06)'
          : isSalt ? 'rgba(255,255,255,0.04)' : 'rgba(42,26,78,0.03)',
        borderRadius: 18, marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <BubbleField variant={bubbleVariant} />
        <div style={{
          position: 'relative', zIndex: 1,
          transform:  hover ? 'rotate(-8deg) scale(1.06)' : 'none',
          transition: 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <IngredientIcon
            name={item.id}
            color={!isReadyMade && isSalt ? '#FDF4E3' : '#2A1A4E'}
            size={96}
          />
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 26,
        color: textColor, margin: '0 0 8px', lineHeight: 1,
      }}>
        {item.name}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: isMobile ? 12 : 13.5,
        color: mutedColor, lineHeight: 1.45, margin: '0 0 12px',
        minHeight: isMobile ? 44 : 58,
      }}>
        {item.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {item.tags.map((tag, i) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-body)', fontSize: isMobile ? 9 : 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: isMobile ? '3px 8px' : '4px 10px', borderRadius: 999,
              background: isReadyMade
                ? (i === 0 ? '#2A1A4E' : 'rgba(42,26,78,0.15)')
                : (i === 0 ? '#D4E842' : (isSalt ? 'rgba(253,244,227,0.12)' : 'rgba(122,90,158,0.12)')),
              color: isReadyMade
                ? (i === 0 ? '#FDF4E3' : '#2A1A4E')
                : (i === 0 ? '#2A1A4E' : (isSalt ? 'rgba(253,244,227,0.7)' : '#7A5A9E')),
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA row */}
      <div style={{
        borderTop: `1px dashed ${isReadyMade ? 'rgba(42,26,78,0.25)' : isSalt ? 'rgba(253,244,227,0.25)' : 'rgba(122,90,158,0.3)'}`,
        paddingTop: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        color: ctaColor, transition: 'color 200ms ease',
      }}>
        <span>{isReadyMade ? 'View Recipe →' : 'View guide →'}</span>
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

// ── Process banner ───────────────────────────────────────────

const TIMELINE_STEPS = [
  { id: 'pickProduce',   label: 'Pick your produce',   sub: 'choose 1 of 12' },
  { id: 'chooseBrine',   label: 'Choose your brine',   sub: 'salt or vinegar' },
  { id: 'pickAromatics', label: 'Pick your aromatics', sub: 'spices & herbs' },
  { id: 'wait',          label: 'Wait',                sub: "we'll remind you" },
  { id: 'eatEnjoy',      label: 'Eat & enjoy',         sub: 'open the jar' },
];

const WAVY_PATH = wavySine(1000, 9, 8, 240);

function ProcessBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{
      width: '100%',
      background: '#FFF7E6',
      border: '2px dashed rgba(42,26,78,0.16)',
      borderRadius: 28,
      padding: '40px 32px 48px',
      position: 'relative',
      marginBottom: 8,
    }}>
      {/* Wavy connector — sits behind the step cards */}
      {!isMobile && (
        <div style={{
          position: 'absolute', left: '8%', right: '8%',
          top: 92, height: 24, zIndex: 1, pointerEvents: 'none',
        }}>
          <svg
            viewBox="0 -13 1000 26"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <path d={WAVY_PATH} fill="none" stroke="#2A1A4E" strokeWidth={2.4} strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Step row */}
      <div style={{ overflowX: isMobile ? 'auto' : 'visible' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
          position: 'relative',
          zIndex: 2,
          minWidth: isMobile ? 560 : 'auto',
        }}>
          {TIMELINE_STEPS.map((step, i) => {
            const rotate = i % 2 === 0 ? -2.5 : 2;
            return (
              <div key={step.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              }}>
                {/* Step number */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: '#D4E842', border: '2px solid #2A1A4E',
                  boxShadow: '0 3px 0 0 #2A1A4E',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 16, color: '#2A1A4E',
                  marginBottom: 8, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                {/* Illustration card */}
                <div style={{
                  width: 96, height: 96,
                  background: '#FDF4E3',
                  border: '2px solid #2A1A4E',
                  borderRadius: 22,
                  boxShadow: '0 4px 0 0 #2A1A4E',
                  display: 'grid', placeItems: 'center',
                  marginBottom: 14,
                  transform: `rotate(${rotate}deg)`,
                  transformOrigin: 'center',
                }}>
                  <StepIllustration id={step.id} />
                </div>
                {/* Label */}
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 800,
                  color: '#2A1A4E', lineHeight: 1.2,
                }}>
                  {step.label}
                </div>
                {/* Sub-label */}
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
                  color: '#7A5A9E', marginTop: 4,
                }}>
                  {step.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Sort toggle ──────────────────────────────────────────────

type SortKey = 'az' | 'quickest' | 'longest';

function SortToggle({ sort, setSort }: { sort: SortKey; setSort: (s: SortKey) => void }) {
  const options: Array<{ key: SortKey; label: string }> = [
    { key: 'az', label: 'A–Z' },
    { key: 'quickest', label: 'Quickest' },
    { key: 'longest', label: 'Longest' },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
      <div style={{
        display: 'inline-flex',
        border: '1.5px solid rgba(42,26,78,0.15)',
        borderRadius: 999, overflow: 'hidden',
      }}>
        {options.map((opt, i) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              padding: '6px 14px',
              background: sort === opt.key ? '#2A1A4E' : 'transparent',
              color:      sort === opt.key ? '#FDF4E3' : '#2A1A4E',
              border:     'none',
              borderLeft: i > 0 ? '1px solid rgba(42,26,78,0.15)' : 'none',
              cursor: 'pointer', transition: 'all 180ms ease',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Home page ────────────────────────────────────────────────

const ALL_ITEMS: GridItem[] = [...INGREDIENTS, ...READY_MADE];

export default function Home() {
  const navigate = useNavigate();
  const [selected,    setSelected]    = useState<string | null>(null);
  const [sort,        setSort]        = useState<SortKey>('az');
  const [brineFilter, setBrineFilter] = useState<'salt' | 'vinegar' | 'readymade' | null>(null);
  const isMobile = useWindowWidth() < 768;

  const filteredItems = brineFilter
    ? ALL_ITEMS.filter(item =>
        brineFilter === 'readymade'
          ? item.cardType === 'readymade'
          : item.cardType === 'custom' && item.brineDefault === brineFilter
      )
    : ALL_ITEMS;

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name);
    const tA = parseTime(a.tags[1]);
    const tB = parseTime(b.tags[1]);
    return sort === 'quickest' ? tA - tB : tB - tA;
  });

  const onSurprise = () => {
    const pool = filteredItems.length ? filteredItems : ALL_ITEMS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setSelected(pick.id);
    setTimeout(() => {
      setSelected(null);
      navigate(`/ingredient/${pick.id}`);
    }, 1400);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundDecor />

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto',
        padding: isMobile ? '60px 20px 60px' : '96px 56px 80px',
      }}>

        {/* ── Hero ── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
          gap: 40, marginBottom: 60, alignItems: 'start',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: '#7A5A9E', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#D4E842', boxShadow: '0 0 0 3px rgba(212,232,66,0.3)',
                display: 'inline-block', flexShrink: 0,
              }} />
              step one · pick your produce
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 'clamp(48px, 12vw, 132px)' : 'clamp(64px, 9vw, 132px)',
              lineHeight: 0.95, letterSpacing: '0.005em',
              color: '#2A1A4E', margin: '0 0 24px',
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
                width: 32, height: 32, borderRadius: '50%', background: '#2A1A4E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, animation: 'bs-spin 8s linear infinite',
              }}>🥒</span>
              <span>Surprise me</span>
              <span style={{
                borderLeft: '1px solid rgba(42,26,78,0.3)',
                paddingLeft: 12, marginLeft: 4,
                fontSize: 11, fontFamily: 'var(--font-body)',
                fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.16em', opacity: 0.55,
              }}>roll the jar</span>
            </button>

            <div style={{
              display: 'flex', gap: 24,
              padding: isMobile ? '12px 16px' : '18px 24px', borderRadius: 18,
              border: '1px dashed rgba(196,168,232,0.4)',
              background: 'rgba(42,26,78,0.04)',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
            }}>
              {[{ n: '24', label: 'pickles' }, { n: '12', label: 'classic' }].map(({ n, label }) => (
                <div key={label} style={{ textAlign: isMobile ? 'left' : 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#2A1A4E', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#7A5A9E' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process Banner ── */}
        <ProcessBanner isMobile={isMobile} />

        {/* ── Section header ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 8 : 20,
          paddingTop: 40, marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A5A9E', margin: 0 }}>Browse</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: '#2A1A4E', margin: 0, lineHeight: 1 }}>All Pickles</h2>
            </div>
          </div>
          {!isMobile && (
            <svg width="260" height="20" viewBox="0 0 260 20" fill="none" aria-hidden="true" style={{ flex: 1, maxWidth: 260 }}>
              <path d="M0 10 Q32 2 65 10 Q98 18 130 10 Q162 2 195 10 Q228 18 260 10" stroke="#C4A8E8" strokeWidth="2" />
            </svg>
          )}
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginLeft: isMobile ? 0 : 'auto', flexWrap: 'wrap' }}>
            {([
              { key: 'salt',      label: '● Salt Brine',    bg: '#2A1A4E', color: '#FDF4E3', border: 'none' },
              { key: 'vinegar',   label: '● Vinegar Brine', bg: '#FDF4E3', color: '#2A1A4E', border: '1.5px solid rgba(42,26,78,0.15)' },
              { key: 'readymade', label: '● Ready Made',    bg: '#D4E842', color: '#2A1A4E', border: 'none' },
            ] as const).map(pill => (
              <button
                key={pill.key}
                onClick={() => setBrineFilter(f => f === pill.key ? null : pill.key)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  padding: '6px 14px', borderRadius: 999,
                  background: pill.bg, color: pill.color, border: pill.border,
                  cursor: 'pointer', transition: 'opacity 180ms ease',
                  opacity: brineFilter && brineFilter !== pill.key ? 0.35 : 1,
                }}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sort toggle ── */}
        <SortToggle sort={sort} setSort={setSort} />

        {/* ── Grid ── */}
        <section
          className="bs-grid"
          style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 14 : 22 }}
        >
          {sortedItems.map((item, i) => (
            <GridCard
              key={item.id}
              item={item}
              index={i}
              isSelected={selected === item.id}
              onNavigate={id => navigate(`/ingredient/${id}`)}
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
