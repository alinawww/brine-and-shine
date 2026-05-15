import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INGREDIENTS, READY_MADE, type ReadyMade } from '../data/ingredients';
import { IngredientIcon } from '../components/IngredientIcons';
import { BRINE_VARIANTS } from '../data/brineVariants';

// ── Line renderer ─────────────────────────────────────────────

function renderLines(text: string, keyPrefix: string) {
  return text.split('\n').filter(l => l.trim()).map((line, i) => {
    const key = `${keyPrefix}-${i}`;
    if (line.startsWith('**')) {
      const clean = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
      return <p key={key} className="font-semibold text-cosmos text-sm mb-0.5">{clean}</p>;
    }
    if (line.startsWith('•')) {
      return (
        <div key={key} className="flex items-start gap-2 text-sm text-cosmos">
          <span className="shrink-0 mt-0.5" style={{ color: '#D4E842' }}>•</span>
          <span>{line.slice(1).trim()}</span>
        </div>
      );
    }
    if (/^\d+\./.test(line)) {
      const match = line.match(/^(\d+)\.\s*(.*)/s);
      const num = match?.[1];
      const rest = match?.[2] ?? line;
      return (
        <div key={key} className="flex items-start gap-2 text-sm text-cosmos">
          <span className="shrink-0 font-semibold" style={{ minWidth: '1.2em' }}>{num}.</span>
          <span>{rest}</span>
        </div>
      );
    }
    return <p key={key} className="text-sm text-muted italic">{line}</p>;
  });
}

// ── Ready Made guide ─────────────────────────────────────────

function ReadyMadeGuide({ item }: { item: ReadyMade }) {
  const navigate = useNavigate();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-muted hover:text-cosmos transition-colors">
        ← All ingredients
      </Link>

      <div className="mt-6 mb-8">
        {/* Icon */}
        <div style={{
          width: 160, height: 160, borderRadius: 24,
          background: '#D4E842',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
        }}>
          <IngredientIcon name={item.id} color="#2A1A4E" size={120} />
        </div>

        {/* Region eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: '#7A5A9E', margin: '0 0 8px',
        }}>
          {item.region}
        </p>

        {/* Name + badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          <h1 className="text-4xl text-cosmos" style={{ fontFamily: 'var(--font-display)', margin: 0 }}>
            {item.name}
          </h1>
          <span style={{
            background: '#D4E842', color: '#2A1A4E',
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 999,
          }}>
            Ready Made Classic
          </span>
        </div>

        <p className="text-lg text-muted leading-relaxed">{item.desc}</p>
      </div>

      {/* Ingredients + Spices */}
      <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h2 className="text-lg text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Ingredients
            </h2>
            <ul className="space-y-1.5">
              {item.ingredients.map(ing => (
                <li key={ing} className="text-sm text-cosmos flex items-start gap-2">
                  <span className="shrink-0 mt-0.5" style={{ color: '#D4E842' }}>•</span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Spices
            </h2>
            <ul className="space-y-1.5">
              {item.spices.map(spice => (
                <li key={spice} className="text-sm text-cosmos flex items-start gap-2">
                  <span className="text-muted shrink-0 mt-0.5">·</span>
                  {spice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-6">
        <h2 className="text-xl text-cosmos mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Timeline
        </h2>
        <p className="text-muted leading-relaxed">{item.timeline}</p>
      </section>

      {/* Pro tip */}
      <section className="bg-tangerine/10 border-l-4 border-tangerine rounded-r-2xl px-5 py-4 mb-6">
        <p className="text-sm font-semibold text-cosmos mb-1">Pro Tip</p>
        <p className="text-sm text-cosmos leading-relaxed">{item.proTip}</p>
      </section>

      {/* Health benefits */}
      <section className="mb-10">
        <h2 className="text-xl text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Health Benefits
        </h2>
        <ul className="space-y-2">
          {item.healthBenefits.map(benefit => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
              <span className="text-sage shrink-0 mt-0.5">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <button
        onClick={() => navigate(`/build/${item.id}`)}
        className="w-full py-3.5 bg-cosmos text-parchment font-medium rounded-2xl hover:bg-cosmos-deep transition-colors cursor-pointer text-base"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Start Pickling →
      </button>
    </main>
  );
}

type CustomIngredient = (typeof INGREDIENTS)[number];

function GuideCustomIngredient({ ingredient }: { ingredient: CustomIngredient }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'salt' | 'vinegar'>(
    () => ingredient.brineDefault,
  );

  const isSalt   = ingredient.brineDefault === 'salt';
  const variants = BRINE_VARIANTS[ingredient.id];
  const content  = variants?.[activeTab];

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-muted hover:text-cosmos transition-colors">
        ← All ingredients
      </Link>

      {/* Hero */}
      <div className="mt-6 mb-8">
        <div style={{
          width: 160, height: 160, borderRadius: 24,
          background: isSalt ? '#2A1A4E' : 'rgba(42,26,78,0.04)',
          border: isSalt ? 'none' : '1.5px solid rgba(42,26,78,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
        }}>
          <IngredientIcon name={ingredient.id} color={isSalt ? '#FDF4E3' : '#2A1A4E'} size={120} />
        </div>

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
          step two · choose your brine
        </p>
        <h1 className="text-4xl text-cosmos" style={{ fontFamily: 'var(--font-display)' }}>
          {ingredient.name}
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{ingredient.desc}</p>

        {/* Brine tabs */}
        <div style={{
          display: 'inline-flex', marginTop: 20,
          border: '1.5px solid rgba(42,26,78,0.15)',
          borderRadius: 999, overflow: 'hidden',
        }}>
          {(['salt', 'vinegar'] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                padding: '8px 18px',
                background:  activeTab === tab ? '#2A1A4E' : 'transparent',
                color:       activeTab === tab ? '#FDF4E3' : '#2A1A4E',
                border:      'none',
                borderLeft:  i > 0 ? '1px solid rgba(42,26,78,0.15)' : 'none',
                cursor:      'pointer', transition: 'all 180ms ease',
              }}
            >
              {tab === 'salt' ? '🧂 Salt Brine' : '🍶 Vinegar Brine'}
            </button>
          ))}
        </div>
      </div>

      {content && (
        <>
          {/* Brine recipe card */}
          <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
            <h2 className="text-xl text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Brine
            </h2>
            <div className="space-y-1.5">{renderLines(content.brine, 'brine')}</div>
          </section>

          {/* Method */}
          <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
            <h2 className="text-xl text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Method
            </h2>
            <div className="space-y-2">{renderLines(content.method, 'method')}</div>
          </section>

          {/* Aromatics & Ratios */}
          <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
            <h2 className="text-xl text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Aromatics &amp; Ratios
            </h2>
            <div className="space-y-1.5">{renderLines(content.aromatics, 'aromatics')}</div>
          </section>

          {/* Timeline */}
          <section className="mb-6">
            <h2 className="text-xl text-cosmos mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Timeline
            </h2>
            <p className="text-muted leading-relaxed">{content.timeline}</p>
          </section>

          {/* Pro tip */}
          <section className="bg-tangerine/10 border-l-4 border-tangerine rounded-r-2xl px-5 py-4 mb-6">
            <p className="text-sm font-semibold text-cosmos mb-1">Pro Tip</p>
            <p className="text-sm text-cosmos leading-relaxed">{content.proTip}</p>
          </section>
        </>
      )}

      <button
        onClick={() => navigate(`/build/${ingredient.id}?brine=${activeTab}`)}
        className="w-full py-3.5 bg-cosmos text-parchment font-medium rounded-2xl hover:bg-cosmos-deep transition-colors cursor-pointer text-base"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Start a jar of {ingredient.name} →
      </button>
    </main>
  );
}

// ── Guide page ───────────────────────────────────────────────

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();

  const customIng = slug ? INGREDIENTS.find(i => i.id === slug) : undefined;
  const readyMade = slug ? READY_MADE.find(i => i.id === slug)  : undefined;

  if (!customIng && !readyMade) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-5">🫙</div>
        <p className="text-lg text-cosmos mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Ingredient not found
        </p>
        <p className="text-muted text-sm mb-6">We don't have a guide for that one yet.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-cosmos text-parchment rounded-xl text-sm font-medium hover:bg-cosmos-deep transition-colors"
        >
          ← Back to ingredients
        </Link>
      </main>
    );
  }

  if (readyMade) return <ReadyMadeGuide item={readyMade} />;

  return <GuideCustomIngredient key={slug} ingredient={customIng!} />;
}
