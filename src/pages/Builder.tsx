import { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { INGREDIENTS, READY_MADE } from '../data/ingredients';
import { spices } from '../data/spices';
import SpiceSelector from '../components/SpiceSelector';
import { useJars } from '../hooks/useJars';

function matchSpices(spiceNames: string[]): string[] {
  return spiceNames
    .map(name => {
      const lower = name.toLowerCase();
      return spices.find(s =>
        lower.includes(s.name.toLowerCase().split(' ')[0]) ||
        s.name.toLowerCase().includes(lower.split(' ')[0])
      );
    })
    .filter((s): s is typeof spices[number] => s !== undefined)
    .map(s => s.slug);
}

function prefillForSlug(slug: string | undefined) {
  if (!slug) return { custom: undefined, ready: undefined } as const;
  const custom = INGREDIENTS.find(i => i.id === slug);
  if (custom) return { custom, ready: undefined } as const;
  const ready = READY_MADE.find(i => i.id === slug);
  return { custom: undefined, ready } as const;
}

function BuilderContent() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addJar } = useJars();

  const { custom: prefillCustom, ready: prefillReady } = prefillForSlug(slug);

  const [name,           setName]           = useState('');
  const [ingredient,     setIngredient]     = useState(() => slug ?? '');
  const [brineType,      setBrineType]      = useState<'vinegar' | 'salt'>(() => {
    const forwarded = (location.state as { brineType?: 'vinegar' | 'salt' } | null)?.brineType;
    if (forwarded) return forwarded;
    const { custom, ready } = prefillForSlug(slug);
    if (custom) return custom.brineDefault;
    if (ready) return ready.brineType;
    return 'vinegar';
  });
  const [selectedSpices, setSelectedSpices] = useState<string[]>(() => {
    const { custom, ready } = prefillForSlug(slug);
    if (custom) return custom.suggestedSpices;
    if (ready) return matchSpices(ready.spices).slice(0, 4);
    return [];
  });
  const [dateStarted,    setDateStarted]    = useState(
    () => new Date().toISOString().slice(0, 10),
  );

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

  function handleIngredientChange(id: string) {
    const custom = INGREDIENTS.find(i => i.id === id);
    const ready  = READY_MADE.find(i => i.id === id);
    setIngredient(id);
    if (custom) {
      setBrineType(custom.brineDefault);
      setSelectedSpices(custom.suggestedSpices);
    } else if (ready) {
      setBrineType(ready.brineType);
      setSelectedSpices(matchSpices(ready.spices).slice(0, 4));
    }
  }

  const backHref  = prefillCustom
    ? `/ingredient/${prefillCustom.id}`
    : prefillReady
      ? `/ingredient/${prefillReady.id}`
      : '/';
  const backLabel = prefillCustom
    ? `Back to ${prefillCustom.name} guide`
    : prefillReady
      ? `Back to ${prefillReady.name} recipe`
      : 'All ingredients';

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to={backHref} className="text-sm text-muted hover:text-cosmos transition-colors">
        ← {backLabel}
      </Link>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.18em',
        color: '#7A5A9E', marginTop: 20, marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#D4E842', boxShadow: '0 0 0 3px rgba(212,232,66,0.3)',
          display: 'inline-block', flexShrink: 0,
        }} />
        step three · pick your aromatics
      </p>
      <h1
        className="text-4xl text-cosmos mb-8"
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
            onChange={e => handleIngredientChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-white/60 border border-lavender/30 rounded-xl text-cosmos focus:outline-none focus:border-lavender transition-colors appearance-none"
          >
            <option value="">Select an ingredient…</option>
            <optgroup label="Custom">
              {INGREDIENTS.map(ing => (
                <option key={ing.id} value={ing.id}>{ing.name}</option>
              ))}
            </optgroup>
            <optgroup label="Ready Made">
              {READY_MADE.map(rm => (
                <option key={rm.id} value={rm.id}>{rm.name}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Brine type */}
        <div>
          <label className="block text-sm font-medium text-cosmos mb-1.5">
            Brine type
          </label>
          <div className="flex gap-3">
            {(['salt', 'vinegar'] as const).map(type => (
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
          Save jar
        </button>
      </form>
    </main>
  );
}

/** Remount when the route slug changes so form state is initialized from the URL without an effect. */
export default function Builder() {
  const { slug } = useParams<{ slug?: string }>();
  return <BuilderContent key={slug ?? ''} />;
}
