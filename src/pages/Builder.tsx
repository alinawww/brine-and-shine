import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ingredients, ingredientsBySlug } from '../data/ingredients';
import SpiceSelector from '../components/SpiceSelector';
import { useJars } from '../hooks/useJars';

export default function Builder() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { addJar } = useJars();

  const prefilled = slug ? ingredientsBySlug[slug] : undefined;

  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState(slug ?? '');
  const [brineType, setBrineType] = useState<'vinegar' | 'salt'>('vinegar');
  const [selectedSpices, setSelectedSpices] = useState<string[]>([]);
  const [dateStarted, setDateStarted] = useState(
    () => new Date().toISOString().slice(0, 10),
  );

  useEffect(() => {
    if (prefilled) {
      setSelectedSpices(prefilled.suggestedSpices.slice(0, 3));
    }
  }, [prefilled]);

  const selectedIngredient = ingredientsBySlug[ingredient];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredient || !name.trim()) return;
    addJar({
      name: name.trim(),
      ingredient,
      brineType,
      spices: selectedSpices,
      dateStarted,
      status: 'fermenting',
    });
    navigate('/jars');
  }

  const backHref = prefilled ? `/ingredient/${prefilled.slug}` : '/';
  const backLabel = prefilled ? `Back to ${prefilled.name} guide` : 'All ingredients';

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to={backHref} className="text-sm text-muted hover:text-cosmos transition-colors">
        ← {backLabel}
      </Link>

      <h1
        className="text-4xl text-cosmos mt-5 mb-8"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Build a Jar
      </h1>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Jar name */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-1.5">
            Jar name{' '}
            <span className="font-normal text-muted">(your label for this batch)</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Spicy dills for the holidays"
            required
            className="w-full px-4 py-2.5 bg-white/60 border border-lavender/30 rounded-xl text-cosmos placeholder:text-muted/50 focus:outline-none focus:border-lavender transition-colors"
          />
        </div>

        {/* Ingredient */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-1.5">
            Ingredient
          </label>
          <select
            value={ingredient}
            onChange={e => {
              const ing = ingredientsBySlug[e.target.value];
              setIngredient(e.target.value);
              if (ing) setSelectedSpices(ing.suggestedSpices.slice(0, 3));
            }}
            required
            className="w-full px-4 py-2.5 bg-white/60 border border-lavender/30 rounded-xl text-cosmos focus:outline-none focus:border-lavender transition-colors appearance-none"
          >
            <option value="">Select an ingredient…</option>
            {ingredients.map(ing => (
              <option key={ing.slug} value={ing.slug}>
                {ing.emoji} {ing.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brine type */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-1.5">
            Brine type
          </label>
          <div className="flex gap-3">
            {(['vinegar', 'salt'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setBrineType(type)}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  brineType === type
                    ? 'bg-cosmos text-parchment border-cosmos'
                    : 'bg-white/60 text-cosmos border-lavender/30 hover:border-lavender'
                }`}
              >
                {type === 'vinegar' ? '🍶 Vinegar brine' : '🧂 Salt ferment'}
              </button>
            ))}
          </div>
        </div>

        {/* Spices */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-2">
            Spices
          </label>
          <SpiceSelector
            selected={selectedSpices}
            suggested={selectedIngredient?.suggestedSpices}
            onChange={setSelectedSpices}
          />
        </div>

        {/* Date started */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-1.5">
            Date started
          </label>
          <input
            type="date"
            value={dateStarted}
            onChange={e => setDateStarted(e.target.value)}
            className="px-4 py-2.5 bg-white/60 border border-lavender/30 rounded-xl text-cosmos focus:outline-none focus:border-lavender transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim() || !ingredient}
          className="w-full py-3.5 bg-cosmos text-parchment font-medium rounded-2xl hover:bg-cosmos-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-base"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Save jar 🫙
        </button>
      </form>
    </main>
  );
}
