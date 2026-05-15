import { useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { INGREDIENTS, ingredientsBySlug } from '../data/ingredients';
import { JAR_SIZES, getScaledRecipe, type JarSize } from '../utils/scaleRecipe';
import { useJars, type Jar } from '../hooks/useJars';
import SpiceSelector from '../components/SpiceSelector';

// ── Recipe line renderer (dark panel) ──────────────────────────

function renderRecipeLines(text: string, keyPrefix: string) {
  return text.split('\n').filter(l => l.trim()).map((line, i) => {
    const key = `${keyPrefix}-${i}`;

    if (line.startsWith('**')) {
      const clean = line.replace(/^\*\*/, '').replace(/\*\*$/, '');
      return (
        <p key={key} style={{ fontWeight: 700, color: '#FDF4E3', fontSize: 13, margin: '2px 0' }}>
          {clean}
        </p>
      );
    }

    if (line.startsWith('•')) {
      return (
        <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
          <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2 }}>•</span>
          <span style={{ color: 'rgba(253,244,227,0.9)', lineHeight: 1.55 }}>{line.slice(1).trim()}</span>
        </div>
      );
    }

    if (/^\d+\./.test(line)) {
      const match = line.match(/^(\d+)\.\s*(.*)/s);
      const num = match?.[1];
      const rest = match?.[2] ?? line;
      return (
        <div key={key} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: 'rgba(255,255,255,0.05)', borderRadius: 12,
          padding: '10px 14px',
        }}>
          <span style={{
            flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
            background: '#D4E842', color: '#2A1A4E',
            fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {num}
          </span>
          <span style={{ color: 'rgba(253,244,227,0.9)', fontSize: 13, lineHeight: 1.55 }}>{rest}</span>
        </div>
      );
    }

    return (
      <p key={key} style={{ color: 'rgba(253,244,227,0.45)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.55, margin: '2px 0' }}>
        {line}
      </p>
    );
  });
}

// ── Section heading ─────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#2A1A4E', margin: '0 0 16px' }}
    >
      {children}
    </h2>
  );
}

// ── Equivalent jar label ────────────────────────────────────────

function getEquivalentJarLabel(grams: number): string | null {
  if (grams === 400) return '≈ 1 small jar (500ml)';
  if (grams === 800) return '≈ 1 medium jar (1L)';
  if (grams === 1500) return '≈ 1 large jar (2L)';
  return null;
}

// ── Builder ─────────────────────────────────────────────────────

export default function Builder() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addJar } = useJars();

  const brineFromUrl = searchParams.get('brine') as 'salt' | 'vinegar' | null;
  const slugIngredient = slug ? (INGREDIENTS.find(i => i.id === slug) ?? null) : null;

  const [ingredientId, setIngredientId] = useState<string>(() => slug ?? '');
  const [brineType, setBrineType] = useState<'salt' | 'vinegar'>(() => {
    if (brineFromUrl === 'salt' || brineFromUrl === 'vinegar') return brineFromUrl;
    return slugIngredient?.brineDefault ?? 'salt';
  });
  const [inputMode, setInputMode] = useState<'weight' | 'jarsize'>('jarsize');
  const [jarSize, setJarSize] = useState<JarSize>('medium');
  const [customGrams, setCustomGrams] = useState<number>(800);
  const [selectedSpices, setSelectedSpices] = useState<string[]>(
    () => slugIngredient?.suggestedSpices ?? []
  );
  const [jarName, setJarName] = useState<string>(
    () => slugIngredient ? `My ${slugIngredient.name}` : ''
  );
  const [dateStarted, setDateStarted] = useState<string>(
    () => new Date().toISOString().slice(0, 10)
  );
  const [status, setStatus] = useState<Jar['status']>('fermenting');

  // Derived values
  const activeGrams = inputMode === 'jarsize'
    ? (jarSize === 'custom' ? customGrams : JAR_SIZES[jarSize].grams)
    : customGrams;

  const selectedIngredient = INGREDIENTS.find(i => i.id === ingredientId) ?? null;
  const scaledRecipe = selectedIngredient
    ? getScaledRecipe(ingredientId, brineType, activeGrams)
    : null;

  const backHref  = slugIngredient ? `/ingredient/${slug}` : '/';
  const backLabel = slugIngredient ? `Back to ${slugIngredient.name} guide` : 'All ingredients';

  // ── Handlers ──────────────────────────────────────────────────

  function handleIngredientSelect(id: string) {
    const ing = INGREDIENTS.find(i => i.id === id);
    if (!ing) return;
    setIngredientId(id);
    setBrineType(ing.brineDefault);
    setSelectedSpices(ing.suggestedSpices);
    setJarName(prev =>
      !prev || prev === `My ${selectedIngredient?.name ?? ''}`
        ? `My ${ing.name}`
        : prev
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredientId || !jarName.trim()) return;
    addJar({
      name: jarName.trim(),
      ingredient: ingredientId,
      brineType,
      spices: selectedSpices,
      dateStarted,
      status,
      grams: activeGrams,
      jarSize: inputMode === 'jarsize' ? jarSize : 'custom',
    });
    navigate('/jars');
  }

  // ── Render ───────────────────────────────────────────────────

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
      <h1 className="text-4xl text-cosmos mb-10" style={{ fontFamily: 'var(--font-display)' }}>
        Build a Jar
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ── 1. Ingredient ──────────────────────────────────── */}
        <div>
          <SectionHeading>1. Pick your ingredient</SectionHeading>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            {INGREDIENTS.map(ing => {
              const sel = ingredientId === ing.id;
              return (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => handleIngredientSelect(ing.id)}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 999,
                    border: sel ? '2px solid #D4E842' : '1px solid #2A1A4E',
                    background: sel ? '#2A1A4E' : '#FDF4E3',
                    color: sel ? '#FDF4E3' : '#2A1A4E',
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 150ms ease',
                  }}
                >
                  <span aria-hidden="true">{ingredientsBySlug[ing.id]?.emoji}</span>
                  {ing.name}
                </button>
              );
            })}
          </div>
        </div>

        {ingredientId && (
          <>
            {/* ── 2. Brine type ──────────────────────────────── */}
            <div>
              <SectionHeading>2. Choose your brine</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {(['salt', 'vinegar'] as const).map(type => {
                  const sel = brineType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBrineType(type)}
                      style={{
                        padding: '20px 18px 20px 14px',
                        borderRadius: 16, textAlign: 'left',
                        cursor: 'pointer', transition: 'all 180ms ease',
                        background: sel ? '#2A1A4E' : '#FDF4E3',
                        color: sel ? '#FDF4E3' : '#2A1A4E',
                        border: sel ? 'none' : '1.5px dashed rgba(42,26,78,0.35)',
                        borderLeft: sel ? '4px solid #D4E842' : '1.5px dashed rgba(42,26,78,0.35)',
                      }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 8 }}>
                        {type === 'salt' ? '🧂' : '🍶'}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 4 }}>
                        {type === 'salt' ? 'Salt Brine' : 'Vinegar Brine'}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: 12,
                        opacity: sel ? 0.65 : 0.5, lineHeight: 1.4,
                      }}>
                        {type === 'salt'
                          ? 'Lacto-fermentation · Living cultures · Deeper flavour'
                          : 'Quick pickle · Crisp · Ready faster'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 3. Quantity ────────────────────────────────── */}
            <div>
              <SectionHeading>3. How much are you making?</SectionHeading>

              {/* Mode pill toggle */}
              <div style={{
                display: 'inline-flex', marginBottom: 20,
                border: '1.5px solid rgba(42,26,78,0.15)',
                borderRadius: 999, overflow: 'hidden',
              }}>
                {(['jarsize', 'weight'] as const).map((mode, i) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setInputMode(mode)}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                      padding: '8px 18px',
                      background: inputMode === mode ? '#2A1A4E' : 'transparent',
                      color: inputMode === mode ? '#FDF4E3' : '#2A1A4E',
                      border: 'none',
                      borderLeft: i > 0 ? '1px solid rgba(42,26,78,0.15)' : 'none',
                      cursor: 'pointer', transition: 'all 180ms ease',
                    }}
                  >
                    {mode === 'jarsize' ? 'By jar size' : 'By weight'}
                  </button>
                ))}
              </div>

              {inputMode === 'jarsize' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {(['small', 'medium', 'large'] as const).map(size => {
                    const sel = jarSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setJarSize(size)}
                        style={{
                          padding: '16px 12px', borderRadius: 16, textAlign: 'center',
                          cursor: 'pointer', transition: 'all 180ms ease',
                          background: sel ? '#2A1A4E' : '#FDF4E3',
                          color: sel ? '#FDF4E3' : '#2A1A4E',
                          border: sel ? 'none' : '1.5px solid rgba(42,26,78,0.2)',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, opacity: 0.65, marginBottom: 2 }}>
                          {JAR_SIZES[size].ml}ml
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, opacity: 0.45 }}>
                          ~{JAR_SIZES[size].grams}g
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <label style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                    display: 'block', marginBottom: 8, color: '#7A5A9E',
                  }}>
                    Weight of produce (grams)
                  </label>
                  <input
                    type="number"
                    value={customGrams}
                    onChange={e => setCustomGrams(
                      Math.max(100, Math.min(5000, Number(e.target.value) || 100))
                    )}
                    min={100}
                    max={5000}
                    step={50}
                    style={{
                      fontFamily: 'var(--font-display)', fontSize: 32,
                      width: '100%', textAlign: 'center',
                      padding: '16px', boxSizing: 'border-box',
                      border: '2px solid #2A1A4E', borderRadius: 16,
                      background: '#FDF4E3', color: '#2A1A4E', outline: 'none',
                    }}
                  />
                  {getEquivalentJarLabel(customGrams) && (
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: '#7A5A9E', marginTop: 8, textAlign: 'center',
                    }}>
                      {getEquivalentJarLabel(customGrams)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ── 4. Aromatics ───────────────────────────────── */}
            <div>
              <SectionHeading>4. Pick your aromatics (optional)</SectionHeading>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A5A9E',
                marginTop: -8, marginBottom: 16,
              }}>
                We'll include these in your jar card
              </p>
              <SpiceSelector
                selected={selectedSpices}
                suggested={selectedIngredient?.suggestedSpices}
                onChange={setSelectedSpices}
              />
            </div>

            {/* ── 5. Jar details ──────────────────────────────── */}
            <div>
              <SectionHeading>5. Name your jar</SectionHeading>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmos mb-1.5">
                    Jar name
                  </label>
                  <input
                    type="text"
                    value={jarName}
                    onChange={e => setJarName(e.target.value)}
                    placeholder="e.g. Spicy dills for the holidays"
                    className="w-full px-4 py-2.5 bg-white/60 border border-lavender/30 rounded-xl text-cosmos placeholder:text-muted/50 focus:outline-none focus:border-lavender transition-colors"
                  />
                </div>
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
                <div>
                  <label className="block text-sm font-medium text-cosmos mb-2">
                    Status
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {(['draft', 'fermenting', 'ready', 'eaten'] as const).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        style={{
                          padding: '6px 14px', borderRadius: 999,
                          border: `1.5px solid ${status === s ? '#2A1A4E' : 'rgba(42,26,78,0.2)'}`,
                          background: status === s ? '#2A1A4E' : 'transparent',
                          color: status === s ? '#FDF4E3' : '#2A1A4E',
                          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                          cursor: 'pointer', textTransform: 'capitalize',
                          transition: 'all 150ms ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Save button ─────────────────────────────────── */}
            <button
              type="submit"
              disabled={!jarName.trim()}
              style={{
                width: '100%', padding: '18px',
                background: jarName.trim() ? '#D4E842' : 'rgba(212,232,66,0.35)',
                color: '#2A1A4E',
                fontFamily: 'var(--font-display)', fontSize: 22,
                borderRadius: 999, border: 'none',
                boxShadow: jarName.trim() ? '0 4px 0 #2A1A4E' : 'none',
                cursor: jarName.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 120ms ease',
              }}
            >
              Save Jar →
            </button>

            {/* ── 6. Live recipe calculator ───────────────────── */}
            {scaledRecipe && (
              <div style={{ background: '#2A1A4E', borderRadius: 24, padding: 32 }}>

                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 28,
                }}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 28,
                    color: '#FDF4E3', margin: 0,
                  }}>
                    Your Recipe
                  </h2>
                  <span style={{
                    background: '#D4E842', color: '#2A1A4E',
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '4px 12px', borderRadius: 999,
                  }}>
                    Scaled for {activeGrams}g
                  </span>
                </div>

                {/* Brine */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', color: '#D4E842',
                    letterSpacing: '0.08em', marginBottom: 12,
                  }}>
                    🧪 Brine
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {renderRecipeLines(scaledRecipe.brine, 'rb')}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }} />

                {/* Aromatics */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', color: '#D4E842',
                    letterSpacing: '0.08em', marginBottom: 12,
                  }}>
                    🌿 Aromatics
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {renderRecipeLines(scaledRecipe.aromatics, 'ra')}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, fontStyle: 'italic',
                    color: 'rgba(253,244,227,0.32)', marginTop: 10,
                  }}>
                    Quantities scale automatically with your weight
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }} />

                {/* Method */}
                <div style={{ marginBottom: 28 }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', color: '#D4E842',
                    letterSpacing: '0.08em', marginBottom: 12,
                  }}>
                    📋 Method
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {renderRecipeLines(scaledRecipe.method, 'rm')}
                  </div>
                </div>

                {/* Timeline & Pro Tip */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16 }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                      color: '#D4E842', marginBottom: 6,
                    }}>⏳ Ready in</p>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: '#FDF4E3', lineHeight: 1.55,
                    }}>
                      {scaledRecipe.timeline}
                    </p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16 }}>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                      color: '#D4E842', marginBottom: 6,
                    }}>💡 Pro Tip</p>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: '#FDF4E3', lineHeight: 1.55,
                    }}>
                      {scaledRecipe.proTip}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </form>
    </main>
  );
}
