import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJars } from '../hooks/useJars';
import { ingredientsBySlug, INGREDIENTS, READY_MADE } from '../data/ingredients';
import StatusBadge from '../components/StatusBadge';
import { getScaledRecipe } from '../utils/scaleRecipe';
import { spicesBySlug } from '../data/spices';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { FermentationProgress } from '../components/FermentationProgress';
import { MEAL_PAIRINGS, DEFAULT_PAIRINGS } from '../data/mealPairings';

function daysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}


export default function JarDetail() {
  const { id } = useParams<{ id: string }>();
  const { jars, deleteJar } = useJars();
  const navigate = useNavigate();

  const jar = jars.find(j => j.id === id);

  if (!jar) {
    return (
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🫙</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#2A1A4E', marginBottom: 12 }}>
          Jar not found
        </h1>
        <Link to="/jars" style={{ color: '#7A5A9E', fontSize: 14 }}>← Back to My Jars</Link>
      </main>
    );
  }

  const isMobile = useWindowWidth() < 768;
  const ingredient = ingredientsBySlug[jar.ingredient];
  const ingredientData = INGREDIENTS.find(i => i.id === jar.ingredient);
  const readyMadeIngredient = READY_MADE.find(i => i.id === jar.ingredient);
  const scaledRecipe = getScaledRecipe(jar.ingredient, jar.brineType, jar.grams);
  const days = daysSince(jar.dateStarted);
  const allBenefits: string[] = readyMadeIngredient?.healthBenefits ?? [];
  const pairings = MEAL_PAIRINGS[jar.ingredient] ?? { meals: DEFAULT_PAIRINGS, note: 'Great with a wide range of dishes.' };

  function handleDelete() {
    if (window.confirm(`Delete "${jar!.name}"?`)) {
      deleteJar(jar!.id);
      navigate('/jars');
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      <Link
        to="/jars"
        style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A5A9E', textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}
      >
        ← My Jars
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 40 }} aria-hidden="true">{ingredient?.emoji ?? '🫙'}</span>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 40px)', color: '#2A1A4E', margin: 0 }}>
              {jar.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#7A5A9E', margin: 0 }}>
              {ingredient?.name ?? jar.ingredient} · {jar.brineType === 'vinegar' ? 'Vinegar brine' : 'Salt ferment'}
            </p>
          </div>
        </div>
        <StatusBadge status={jar.status} />
      </div>

      {/* Fermentation progress */}
      <FermentationProgress
        dateStarted={jar.dateStarted}
        timeline={readyMadeIngredient?.timeline ?? scaledRecipe?.timeline ?? '7 days'}
        status={jar.status}
      />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Started', value: jar.dateStarted },
          { label: 'Days in', value: `${days} day${days !== 1 ? 's' : ''}` },
          { label: 'Batch size', value: `${jar.grams}g` },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(196,168,232,0.25)',
            borderRadius: 16, padding: '16px 20px',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7A5A9E', marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#2A1A4E' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Spices used */}
      {jar.spices.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(196,168,232,0.25)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 24,
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#2A1A4E', marginBottom: 12 }}>
            🌿 Aromatics used
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {jar.spices.map(slug => {
              const spice = spicesBySlug[slug];
              return (
                <div key={slug} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 999,
                  background: '#2A1A4E', color: '#FDF4E3',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                }}>
                  <span>{spice?.emoji ?? '🌿'}</span>
                  {spice?.name ?? slug}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Additional ingredients */}
      {jar.additionalIngredients.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(196,168,232,0.25)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 24,
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#2A1A4E', marginBottom: 12 }}>
            🥒 Also in this jar
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {jar.additionalIngredients.map(ingId => {
              const ing = ingredientsBySlug[ingId];
              return (
                <div key={ingId} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 999,
                  border: '1.5px solid #D4E842',
                  background: 'rgba(212,232,66,0.12)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#2A1A4E',
                }}>
                  <span>{ing?.emoji ?? '🥬'}</span>
                  {ingredientData?.name ?? ingId}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Health benefits */}
      {allBenefits.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontFamily: '"Bagel Fat One"', fontSize: 28,
            color: '#2A1A4E', marginBottom: 20,
          }}>
            What's good for you 🌿
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 12,
          }}>
            {allBenefits.map((benefit, i) => (
              <div key={i} style={{
                background: '#FDF4E3',
                border: '1.5px solid rgba(42,26,78,0.1)',
                borderRadius: 16, padding: '14px 18px',
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <span style={{
                  color: '#D4E842',
                  fontSize: 16, flexShrink: 0,
                  marginTop: 1,
                }}>
                  {(['✦', '✸', '❋', '✺'] as const)[i % 4]}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  fontWeight: 500, color: '#2A1A4E',
                  lineHeight: 1.5,
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recipe reference */}
      {scaledRecipe && (
        <div style={{
          background: '#2A1A4E', borderRadius: 20, padding: '24px 28px', marginBottom: 32,
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#FDF4E3', marginBottom: 16 }}>
            📋 Recipe reference
          </h2>

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4E842', marginBottom: 8 }}>
              Brine
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {scaledRecipe.brine.split('\n').filter(l => l.trim()).map((line, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(253,244,227,0.85)', lineHeight: 1.5, margin: 0 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: '#D4E842', marginBottom: 4 }}>⏳ Ready in</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FDF4E3', lineHeight: 1.5 }}>{scaledRecipe.timeline}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: '#D4E842', marginBottom: 4 }}>💡 Pro Tip</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FDF4E3', lineHeight: 1.5 }}>{scaledRecipe.proTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Ready-made recipe reference */}
      {readyMadeIngredient && !scaledRecipe && (
        <div style={{
          background: '#2A1A4E', borderRadius: 20, padding: '24px 28px', marginBottom: 32,
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#FDF4E3', marginBottom: 16 }}>
            📋 Classic recipe
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4E842', marginBottom: 8 }}>
                🥬 Ingredients
              </p>
              {readyMadeIngredient.ingredients.map((ing, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(253,244,227,0.85)', margin: '0 0 4px' }}>
                  • {ing}
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4E842', marginBottom: 8 }}>
                🌿 Spices
              </p>
              {readyMadeIngredient.spices.map((spice, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(253,244,227,0.85)', margin: '0 0 4px' }}>
                  • {spice}
                </p>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: '#D4E842', marginBottom: 4 }}>⏳ Ready in</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FDF4E3', lineHeight: 1.5 }}>{readyMadeIngredient.timeline}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: '#D4E842', marginBottom: 4 }}>💡 Pro Tip</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FDF4E3', lineHeight: 1.5 }}>{readyMadeIngredient.proTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Meal pairings */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{
          fontFamily: '"Bagel Fat One"', fontSize: 28,
          color: '#2A1A4E', marginBottom: 8,
        }}>
          Pairs well with 🍽️
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14,
          color: '#7A5A9E', marginBottom: 20,
          fontStyle: 'italic',
        }}>
          {pairings.note}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 14,
        }}>
          {pairings.meals.map((meal, i) => (
            <div
              key={i}
              style={{
                background: '#FDF4E3',
                border: '1.5px solid rgba(42,26,78,0.1)',
                borderRadius: 18, padding: '16px 20px',
                display: 'flex', gap: 14, alignItems: 'flex-start',
                transition: 'all 200ms ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(42,26,78,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{meal.emoji}</span>
              <div>
                <div style={{
                  fontFamily: '"Bagel Fat One"', fontSize: 16,
                  color: '#2A1A4E', marginBottom: 4,
                }}>
                  {meal.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: '#7A5A9E', lineHeight: 1.4,
                }}>
                  {meal.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link
          to={`/ingredient/${jar.ingredient}`}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
            padding: '12px 24px', borderRadius: 999,
            background: '#2A1A4E', color: '#FDF4E3',
            textDecoration: 'none',
          }}
        >
          View guide →
        </Link>
        <Link
          to={`/build/${jar.ingredient}`}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
            padding: '12px 24px', borderRadius: 999,
            border: '1.5px solid #2A1A4E',
            background: 'transparent', color: '#2A1A4E',
            textDecoration: 'none',
          }}
        >
          Make another
        </Link>
        <button
          onClick={handleDelete}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
            padding: '12px 24px', borderRadius: 999,
            border: '1.5px solid rgba(244,132,90,0.4)',
            background: 'transparent', color: '#F4845A',
            cursor: 'pointer', marginLeft: 'auto',
          }}
        >
          Delete jar
        </button>
      </div>
    </main>
  );
}
