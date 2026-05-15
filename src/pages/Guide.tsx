import { useParams, Link, useNavigate } from 'react-router-dom';
import { ingredientsBySlug } from '../data/ingredients';
import { spicesBySlug } from '../data/spices';
import { homeIngredientsBySlug } from '../data/homeIngredients';
import { IngredientIcon } from '../components/IngredientIcons';

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const ingredient = slug ? ingredientsBySlug[slug] : undefined;

  if (!ingredient) {
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

  const { recommendedBrine } = ingredient;
  const homeIng = slug ? homeIngredientsBySlug[slug] : undefined;
  const isSalt = homeIng?.brineDefault === 'salt';

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-muted hover:text-cosmos transition-colors">
        ← All ingredients
      </Link>

      {/* Hero */}
      <div className="mt-6 mb-8">
        <div style={{
          width: 160, height: 160,
          borderRadius: 24,
          background: isSalt ? '#2A1A4E' : 'rgba(42,26,78,0.04)',
          border: isSalt ? 'none' : '1.5px solid rgba(42,26,78,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          position: 'relative', overflow: 'visible',
        }}>
          {homeIng
            ? <IngredientIcon name={homeIng.id} color={isSalt ? '#FDF4E3' : '#2A1A4E'} size={120} />
            : <span style={{ fontSize: 64 }}>{ingredient.emoji}</span>
          }
        </div>
        <h1
          className="text-4xl text-cosmos"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {ingredient.name}
        </h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{ingredient.intro}</p>
      </div>

      {/* Brine card */}
      <section className="bg-white/60 border border-lavender/30 rounded-2xl p-6 mb-6">
        <h2
          className="text-xl text-cosmos mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Recommended Brine
        </h2>
        <p className="font-semibold text-cosmos mb-5">{recommendedBrine.name}</p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <Field label="Vinegar"  value={recommendedBrine.vinegar} />
          <Field label="Ratio"    value={recommendedBrine.ratio} />
          <Field label="Salt"     value={recommendedBrine.salt} />
          {recommendedBrine.sugar && (
            <Field label="Sugar" value={recommendedBrine.sugar} />
          )}
        </div>

        {recommendedBrine.notes && (
          <p className="mt-5 text-sm text-muted italic border-t border-lavender/20 pt-4">
            {recommendedBrine.notes}
          </p>
        )}

        <p className="mt-4 text-sm text-muted leading-relaxed">{ingredient.brineReason}</p>
      </section>

      {/* Suggested spices */}
      <section className="mb-6">
        <h2
          className="text-xl text-cosmos mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Suggested Spices
        </h2>
        <div className="flex flex-wrap gap-2">
          {ingredient.suggestedSpices.map(spiceSlug => {
            const spice = spicesBySlug[spiceSlug];
            if (!spice) return null;
            return (
              <span
                key={spiceSlug}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lavender/20 border border-lavender/40 rounded-full text-sm text-cosmos"
              >
                <span aria-hidden="true">{spice.emoji}</span>
                {spice.name}
              </span>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-6">
        <h2
          className="text-xl text-cosmos mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Timeline
        </h2>
        <p className="text-muted leading-relaxed">{ingredient.timeline}</p>
      </section>

      {/* Pro tip */}
      <section className="bg-tangerine/10 border-l-4 border-tangerine rounded-r-2xl px-5 py-4 mb-6">
        <p className="text-sm font-semibold text-cosmos mb-1">Pro Tip</p>
        <p className="text-sm text-cosmos leading-relaxed">{ingredient.proTip}</p>
      </section>

      {/* Health benefits */}
      <section className="mb-10">
        <h2
          className="text-xl text-cosmos mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Health Benefits
        </h2>
        <ul className="space-y-2">
          {ingredient.healthBenefits.map(benefit => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
              <span className="text-sage shrink-0 mt-0.5">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <button
        onClick={() => navigate(`/build/${ingredient.slug}`)}
        className="w-full py-3.5 bg-cosmos text-parchment font-medium rounded-2xl hover:bg-cosmos-deep transition-colors cursor-pointer text-base"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        Start a jar of {ingredient.name} →
      </button>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs font-medium text-muted uppercase tracking-wider mb-0.5">
        {label}
      </span>
      <span className="text-cosmos">{value}</span>
    </div>
  );
}
