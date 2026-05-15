import { useParams, Link, useNavigate } from 'react-router-dom';
import { ingredientsBySlug } from '../data/ingredients';
import { spicesBySlug } from '../data/spices';

export default function Guide() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const ingredient = slug ? ingredientsBySlug[slug] : undefined;

  if (!ingredient) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted text-lg">Ingredient not found.</p>
        <Link to="/" className="mt-4 inline-block text-pickle-green hover:underline">
          ← Back to ingredients
        </Link>
      </main>
    );
  }

  const { recommendedBrine } = ingredient;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-muted hover:text-near-black transition-colors">
        ← All ingredients
      </Link>

      {/* Hero */}
      <div className="mt-6 mb-8">
        <div className="text-6xl mb-4">{ingredient.emoji}</div>
        <h1 className="font-display text-4xl text-near-black">{ingredient.name}</h1>
        <p className="mt-3 text-lg text-muted leading-relaxed">{ingredient.intro}</p>
      </div>

      {/* Brine card */}
      <section className="bg-cream border border-mustard/30 rounded-xl p-6 mb-6">
        <h2 className="font-display text-xl text-pickle-green mb-1">Recommended Brine</h2>
        <p className="font-semibold text-near-black mb-5">{recommendedBrine.name}</p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <Field label="Vinegar"  value={recommendedBrine.vinegar} />
          <Field label="Ratio"    value={recommendedBrine.ratio} />
          <Field label="Salt"     value={recommendedBrine.salt} />
          {recommendedBrine.sugar && (
            <Field label="Sugar" value={recommendedBrine.sugar} />
          )}
        </div>

        {recommendedBrine.notes && (
          <p className="mt-5 text-sm text-muted italic border-t border-mustard/20 pt-4">
            {recommendedBrine.notes}
          </p>
        )}

        <p className="mt-4 text-sm text-muted leading-relaxed">{ingredient.brineReason}</p>
      </section>

      {/* Suggested spices */}
      <section className="mb-6">
        <h2 className="font-display text-xl text-near-black mb-3">Suggested Spices</h2>
        <div className="flex flex-wrap gap-2">
          {ingredient.suggestedSpices.map(spiceSlug => {
            const spice = spicesBySlug[spiceSlug];
            if (!spice) return null;
            return (
              <span
                key={spiceSlug}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border border-mustard/30 rounded-full text-sm text-near-black"
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
        <h2 className="font-display text-xl text-near-black mb-2">Timeline</h2>
        <p className="text-muted leading-relaxed">{ingredient.timeline}</p>
      </section>

      {/* Pro tip */}
      <section className="bg-mustard/10 border-l-4 border-mustard rounded-r-xl px-5 py-4 mb-6">
        <p className="text-sm font-semibold text-near-black mb-1">Pro Tip</p>
        <p className="text-sm text-near-black leading-relaxed">{ingredient.proTip}</p>
      </section>

      {/* Health benefits */}
      <section className="mb-10">
        <h2 className="font-display text-xl text-near-black mb-3">Health Benefits</h2>
        <ul className="space-y-2">
          {ingredient.healthBenefits.map(benefit => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-muted">
              <span className="text-pickle-green shrink-0 mt-0.5">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <button
        onClick={() => navigate(`/build/${ingredient.slug}`)}
        className="w-full py-3 bg-pickle-green text-cream font-medium rounded-xl hover:bg-pickle-green-dark transition-colors"
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
      <span className="text-near-black">{value}</span>
    </div>
  );
}
