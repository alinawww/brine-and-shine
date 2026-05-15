import { Link } from 'react-router-dom';
import { useJars, type Jar } from '../hooks/useJars';
import { ingredientsBySlug } from '../data/ingredients';
import StatusBadge from '../components/StatusBadge';

const STATUS_ORDER: Jar['status'][] = ['ready', 'fermenting', 'draft', 'eaten'];

export default function MyJars() {
  const { jars, updateJar, deleteJar } = useJars();

  if (jars.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🫙</div>
        <h1 className="font-display text-3xl text-near-black mb-3">No jars yet</h1>
        <p className="text-muted mb-8">
          Start by picking an ingredient and building your first jar.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pickle-green text-cream rounded-xl font-medium hover:bg-pickle-green-dark transition-colors"
        >
          Browse ingredients
        </Link>
      </main>
    );
  }

  const sorted = [...jars].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-near-black">My Jars</h1>
        <Link
          to="/build"
          className="px-4 py-2 bg-pickle-green text-cream text-sm font-medium rounded-full hover:bg-pickle-green-dark transition-colors"
        >
          + New jar
        </Link>
      </div>

      <ul className="space-y-3">
        {sorted.map(jar => {
          const ingredient = ingredientsBySlug[jar.ingredient];
          return (
            <li key={jar.id} className="bg-cream border border-mustard/20 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl" aria-hidden="true">
                      {ingredient?.emoji ?? '🫙'}
                    </span>
                    <h2 className="font-display text-lg text-near-black truncate">
                      {jar.name}
                    </h2>
                  </div>
                  <p className="text-sm text-muted">
                    {ingredient?.name ?? jar.ingredient} ·{' '}
                    {jar.brineType === 'vinegar' ? 'Vinegar brine' : 'Salt ferment'}
                  </p>
                  <p className="text-xs text-muted/70 mt-0.5">Started {jar.dateStarted}</p>
                  {jar.spices.length > 0 && (
                    <p className="text-xs text-muted mt-1">
                      {jar.spices.length} spice{jar.spices.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={jar.status} />
                  <select
                    value={jar.status}
                    onChange={e =>
                      updateJar(jar.id, { status: e.target.value as Jar['status'] })
                    }
                    className="text-xs bg-parchment border border-muted/20 rounded-lg px-2 py-1 text-muted focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="fermenting">Fermenting</option>
                    <option value="ready">Ready</option>
                    <option value="eaten">Eaten</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-mustard/10 flex items-center gap-4">
                <Link
                  to={`/ingredient/${jar.ingredient}`}
                  className="text-xs text-pickle-green hover:underline"
                >
                  View guide →
                </Link>
                <Link
                  to={`/build/${jar.ingredient}`}
                  className="text-xs text-muted hover:text-near-black transition-colors"
                >
                  Make another
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${jar.name}"?`)) deleteJar(jar.id);
                  }}
                  className="text-xs text-muted hover:text-red-600 transition-colors ml-auto"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
