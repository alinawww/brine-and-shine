import { Link } from 'react-router-dom';
import { useJars, type Jar } from '../hooks/useJars';
import { ingredientsBySlug } from '../data/ingredients';
import StatusBadge from '../components/StatusBadge';

const STATUS_ORDER: Jar['status'][] = ['ready', 'fermenting', 'draft', 'eaten'];

export default function MyJars() {
  const { jars, deleteJar } = useJars();

  if (jars.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🫙</div>
        <h1
          className="text-3xl text-cosmos mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          No jars yet
        </h1>
        <p className="text-muted mb-8">
          Start by picking an ingredient and building your first jar.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-cosmos text-parchment rounded-xl font-medium hover:bg-cosmos-deep transition-colors"
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
        step four · wait
      </p>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-4xl text-cosmos"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My Jars
        </h1>
        <Link
          to="/build"
          className="px-4 py-2 bg-cosmos text-parchment text-sm font-medium rounded-full hover:bg-cosmos-deep transition-colors"
        >
          + New jar
        </Link>
      </div>

      <ul className="space-y-3">
        {sorted.map(jar => {
          const ingredient = ingredientsBySlug[jar.ingredient];
          const isDraft = jar.status === 'draft';
          return (
            <li
              key={jar.id}
              style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.6)',
                border: isDraft
                  ? '1.5px dashed rgba(196,168,232,0.5)'
                  : '1px solid rgba(196,168,232,0.25)',
                borderRadius: 16,
                padding: 20,
                opacity: isDraft ? 0.75 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              {isDraft && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: '#F4845A', color: '#FDF4E3',
                  fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  padding: '3px 8px', borderRadius: 999,
                }}>
                  Draft
                </div>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl" aria-hidden="true">
                      {ingredient?.emoji ?? '🫙'}
                    </span>
                    <Link
                      to={`/jars/${jar.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h2
                        className="text-lg text-cosmos truncate"
                        style={{ fontFamily: 'var(--font-display)', transition: 'opacity 200ms ease' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        {jar.name}
                      </h2>
                    </Link>
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

                <div className="shrink-0" style={{ paddingTop: isDraft ? 20 : 0 }}>
                  <StatusBadge status={jar.status} />
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(196,168,232,0.15)',
                  marginTop: 12, paddingTop: 12,
                  display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
                }}
              >
                {isDraft ? (
                  <Link
                    to={`/build/${jar.ingredient}`}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                      color: '#2A1A4E', textDecoration: 'none',
                    }}
                  >
                    Finish setting up →
                  </Link>
                ) : (
                  <>
                    <Link
                      to={`/jars/${jar.id}`}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                        padding: '8px 18px', borderRadius: 999,
                        background: '#2A1A4E', color: '#FDF4E3',
                        textDecoration: 'none',
                      }}
                    >
                      View details
                    </Link>
                    <Link
                      to={`/build/${jar.ingredient}?brine=${jar.brineType}`}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                        padding: '8px 18px', borderRadius: 999,
                        border: '1.5px solid #2A1A4E',
                        background: 'transparent', color: '#2A1A4E',
                        textDecoration: 'none',
                      }}
                    >
                      Make another
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${jar.name}"?`)) deleteJar(jar.id);
                  }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    background: 'transparent', border: 'none',
                    color: '#7A5A9E', cursor: 'pointer', marginLeft: 'auto',
                  }}
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
