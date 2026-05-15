import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INGREDIENTS, READY_MADE, type ReadyMade } from '../data/ingredients';
import { IngredientIcon } from '../components/IngredientIcons';

// ── Brine variants ───────────────────────────────────────────

const BRINE_VARIANTS: Record<string, {
  salt:    { brine: string; timeline: string; proTip: string };
  vinegar: { brine: string; timeline: string; proTip: string };
}> = {
  cucumber: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water). Submerge fully.',
      timeline: 'Ready in 3–7 days at room temperature.',
      proTip:   'Add a grape leaf or horseradish leaf to keep them crunchy — the tannins work wonders.',
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp salt, 1 tsp sugar per cup.',
      timeline: 'Ready in 24–48 hours in the fridge.',
      proTip:   "Pour the hot brine over the cucumbers for a quicker pickle — they'll be ready overnight.",
    },
  },
  carrot: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 5–10 days at room temperature.',
      proTip:   'Cut into sticks or coins — coins ferment faster but sticks stay crunchier.',
    },
    vinegar: {
      brine:    '1:1 apple cider vinegar to water, 1 tbsp honey, 1 tsp salt.',
      timeline: 'Ready in 24 hours in the fridge.',
      proTip:   'Apple cider vinegar adds a subtle sweetness that pairs beautifully with carrots.',
    },
  },
  jalapeno: {
    salt: {
      brine:    '3% salt brine (30g salt per 1L water).',
      timeline: 'Ready in 5–7 days at room temperature.',
      proTip:   'Score the jalapeños slightly so brine penetrates faster and fermentation is more even.',
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp salt, 1 tsp sugar.',
      timeline: 'Ready in 2–4 days in the fridge.',
      proTip:   'Leave the seeds in for full heat, remove for a milder pickle. Your call.',
    },
  },
  redOnion: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 2–3 days at room temperature.',
      proTip:   'Slice thinly and evenly — uniform slices ferment at the same rate.',
    },
    vinegar: {
      brine:    '1:1 red wine vinegar to water, 1 tbsp sugar, 1 tsp salt.',
      timeline: 'Ready in 1 hour in the fridge. Better after 24 hours.',
      proTip:   'Pour boiling brine over the onions to accelerate the colour transformation to magenta.',
    },
  },
  beet: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 7–14 days at room temperature.',
      proTip:   'Wear gloves — beet will stain your hands and everything else. Worth it.',
    },
    vinegar: {
      brine:    '1:1 apple cider vinegar to water, 2 tbsp sugar, 1 tsp salt.',
      timeline: 'Ready in 3–5 days in the fridge.',
      proTip:   'Roast the beets first for a deeper, sweeter flavour before pickling.',
    },
  },
  greenBean: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 5–7 days at room temperature.',
      proTip:   'Pack them vertically in the jar — they stay crunchier and look more impressive.',
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp salt, 1 tsp sugar.',
      timeline: 'Ready in 3–5 days in the fridge.',
      proTip:   'Blanch for 30 seconds before pickling to lock in the green colour.',
    },
  },
  cauliflower: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 7–14 days at room temperature.',
      proTip:   "Add a small beetroot for the most stunning pink cauliflower you've ever seen.",
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp salt, 1 tsp turmeric.',
      timeline: 'Ready in 5–7 days in the fridge.',
      proTip:   'Turmeric turns it golden yellow — visually stunning and anti-inflammatory.',
    },
  },
  radish: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 3–5 days at room temperature.',
      proTip:   'Use a mix of radish varieties for a visually striking jar.',
    },
    vinegar: {
      brine:    '1:1 rice vinegar to water, 1 tbsp sugar, 1 tsp salt.',
      timeline: 'Ready in 1–2 days in the fridge.',
      proTip:   'Rice vinegar gives a lighter, more delicate flavour — perfect for radishes.',
    },
  },
  cabbage: {
    salt: {
      brine:    'No brine needed — massage 2% salt (20g per 1kg cabbage) directly into shredded cabbage.',
      timeline: 'Ready in 7–21 days at room temperature.',
      proTip:   'Massage the salt in vigorously until the cabbage releases enough liquid to submerge itself — usually 10 minutes.',
    },
    vinegar: {
      brine:    '1:1 apple cider vinegar to water, 1 tbsp sugar, 1 tsp salt.',
      timeline: 'Ready in 24–48 hours in the fridge.',
      proTip:   "Quick vinegar-pickled cabbage is great for slaws — it won't have probiotics but it's crunchy and tangy.",
    },
  },
  garlic: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 30+ days. Better at 60 days. Worth every day.',
      proTip:   'Peel but keep cloves whole. The longer they ferment, the more mellow and nutty they become.',
    },
    vinegar: {
      brine:    '1:1 apple cider vinegar to water, 1 tsp salt, 1 tsp honey.',
      timeline: 'Ready in 2 weeks in the fridge.',
      proTip:   'Honey-garlic ferment is its own thing and absolutely worth trying alongside.',
    },
  },
  asparagus: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 5–10 days at room temperature.',
      proTip:   'Trim to jar height and stand upright — they look beautiful and ferment evenly.',
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp salt, 1 tsp sugar.',
      timeline: 'Ready in 3–5 days in the fridge.',
      proTip:   'Use thin asparagus spears — they pickle faster and stay crunchier than thick ones.',
    },
  },
  bellPepper: {
    salt: {
      brine:    '2% salt brine (20g salt per 1L water).',
      timeline: 'Ready in 5–7 days at room temperature.',
      proTip:   'Mix colours — red, yellow, and orange together make a stunning jar.',
    },
    vinegar: {
      brine:    '1:1 white vinegar to water, 1 tbsp sugar, 1 tsp salt.',
      timeline: 'Ready in 3–5 days in the fridge.',
      proTip:   'Roast briefly before pickling for a smoky-sweet flavour profile.',
    },
  },
};

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

// ── Guide page ───────────────────────────────────────────────

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const customIng = slug ? INGREDIENTS.find(i => i.id === slug) : undefined;
  const readyMade = slug ? READY_MADE.find(i => i.id === slug)  : undefined;

  const [activeTab, setActiveTab] = useState<'salt' | 'vinegar'>(
    customIng?.brineDefault ?? 'salt',
  );

  useEffect(() => {
    if (customIng) setActiveTab(customIng.brineDefault);
  }, [slug, customIng?.brineDefault]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const ingredient = customIng!;
  const isSalt     = ingredient.brineDefault === 'salt';
  const variants   = BRINE_VARIANTS[ingredient.id];
  const content    = variants?.[activeTab];

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
          {/* Brine */}
          <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
            <h2 className="text-xl text-cosmos mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Brine
            </h2>
            <p className="text-cosmos">{content.brine}</p>
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
        onClick={() => navigate(`/build/${ingredient.id}`, { state: { brineType: activeTab } })}
        className="w-full py-3.5 bg-cosmos text-parchment font-medium rounded-2xl hover:bg-cosmos-deep transition-colors cursor-pointer text-base"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Start a jar of {ingredient.name} →
      </button>
    </main>
  );
}
