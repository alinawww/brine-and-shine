import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { INGREDIENTS, READY_MADE, ingredientsBySlug } from '../data/ingredients';
import { JAR_SIZES, getScaledRecipe, type JarSize } from '../utils/scaleRecipe';
import { useJars } from '../hooks/useJars';
import { useWindowWidth } from '../hooks/useWindowWidth';
import SpiceSelector from '../components/SpiceSelector';
import RecipeCard, { renderLines, AromaticsDiff } from '../components/RecipeCard';
import ReadyMadeRecipeCard from '../components/ReadyMadeRecipeCard';
import { COMPATIBILITY } from '../data/compatibility';
import { spices as SPICES } from '../data/spices';

// ── Helpers ──────────────────────────────────────────────────

function getEquivalentJarLabel(grams: number): string | null {
  if (grams === 400) return '≈ 1 small jar (500ml)';
  if (grams === 800) return '≈ 1 medium jar (1L)';
  if (grams === 1500) return '≈ 1 large jar (2L)';
  return null;
}

// ── Section heading ──────────────────────────────────────────

function SectionHeading({ children, done }: { children: React.ReactNode; done?: boolean }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontSize: 22, color: '#2A1A4E', margin: '0 0 16px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      {children}
      {done && (
        <span style={{
          width: 20, height: 20, borderRadius: '50%',
          background: '#D4E842', color: '#2A1A4E',
          fontSize: 12, fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          ✓
        </span>
      )}
    </h2>
  );
}

// ── Builder ──────────────────────────────────────────────────

export default function Builder() {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addJar } = useJars();
  const isMobile = useWindowWidth() < 1024;

  const brineFromUrl = searchParams.get('brine') as 'salt' | 'vinegar' | null;
  const slugIngredient = slug ? (INGREDIENTS.find(i => i.id === slug) ?? null) : null;
  const readyMadeRecipe = slug ? (READY_MADE.find(i => i.id === slug) ?? null) : null;
  const isReadyMade = !!readyMadeRecipe && !slugIngredient;

  const [ingredientId, setIngredientId] = useState<string>(() => slug ?? '');
  const [brineType, setBrineType] = useState<'salt' | 'vinegar'>(() => {
    if (brineFromUrl === 'salt' || brineFromUrl === 'vinegar') return brineFromUrl;
    return slugIngredient?.brineDefault ?? 'salt';
  });
  const [inputMode, setInputMode]       = useState<'weight' | 'jarsize'>('jarsize');
  const [jarSize, setJarSize]           = useState<JarSize>('medium');
  const [customGrams, setCustomGrams]   = useState<number>(800);
  const [selectedSpices, setSelectedSpices] = useState<string[]>(
    () => slugIngredient?.suggestedSpices ?? []
  );
  const [jarName, setJarName] = useState<string>(
    () => slugIngredient ? `My ${slugIngredient.name}` : ''
  );
  const [dateStarted, setDateStarted] = useState<string>(
    () => new Date().toISOString().slice(0, 10)
  );
  const [isDraft, setIsDraft]                         = useState(false);
  const [additionalIngredients, setAdditionalIngredients] = useState<string[]>([]);
  const [addMoreExpanded, setAddMoreExpanded]         = useState(false);
  const [isMaximized, setIsMaximized]                 = useState(false);

  useEffect(() => {
    if (!isMaximized) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setIsMaximized(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMaximized]);

  useEffect(() => {
    if (readyMadeRecipe) {
      setBrineType(readyMadeRecipe.brineType);
      setJarName(`My ${readyMadeRecipe.name}`);
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (readyMadeRecipe) {
      const matchedSpices = SPICES.filter(spice =>
        readyMadeRecipe.spices.some(s =>
          s.toLowerCase().includes(spice.name.toLowerCase()) ||
          spice.name.toLowerCase().includes(s.toLowerCase().split('(')[0].trim())
        )
      ).map(s => s.slug);
      setSelectedSpices(matchedSpices);
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const status = isDraft ? 'draft' : 'fermenting';

  // Derived values
  const activeGrams = inputMode === 'jarsize'
    ? (jarSize === 'custom' ? customGrams : JAR_SIZES[jarSize].grams)
    : customGrams;

  const selectedIngredient = INGREDIENTS.find(i => i.id === ingredientId) ?? null;
  const scaledRecipe = selectedIngredient
    ? getScaledRecipe(ingredientId, brineType, activeGrams)
    : null;

  const backHref  = (slugIngredient || isReadyMade) ? `/ingredient/${slug}` : '/';
  const backLabel = slugIngredient
    ? `Back to ${slugIngredient.name} guide`
    : isReadyMade
      ? `Back to ${readyMadeRecipe!.name} guide`
      : 'All ingredients';

  // Compatible additional ingredients
  const compatible = COMPATIBILITY[ingredientId]?.[brineType] ?? [];
  const availableToAdd = INGREDIENTS.filter(i =>
    compatible.includes(i.id) && !additionalIngredients.includes(i.id)
  );

  // ── Handlers ─────────────────────────────────────────────────

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
    setAdditionalIngredients([]);
    setAddMoreExpanded(false);
  }

  function handleBrineChange(type: 'salt' | 'vinegar') {
    setBrineType(type);
    const newCompatible = COMPATIBILITY[ingredientId]?.[type] ?? [];
    setAdditionalIngredients(prev => prev.filter(id => newCompatible.includes(id)));
  }

  function toggleAdditional(id: string) {
    setAdditionalIngredients(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ingredientId || !jarName.trim()) return;
    addJar({
      name: jarName.trim(),
      ingredient: ingredientId,
      additionalIngredients,
      brineType,
      spices: selectedSpices,
      dateStarted,
      status,
      grams: activeGrams,
      jarSize: inputMode === 'jarsize' ? jarSize : 'custom',
    });
    navigate('/jars');
  }

  // ── Recipe card shared element ────────────────────────────────

  const recipeCardEl = isReadyMade && readyMadeRecipe ? (
    <ReadyMadeRecipeCard recipe={readyMadeRecipe} grams={activeGrams} />
  ) : (
    <RecipeCard
      scaledRecipe={scaledRecipe}
      ingredientName={selectedIngredient?.name ?? ''}
      additionalIngredients={additionalIngredients}
      selectedSpices={selectedSpices}
      suggestedSpices={selectedIngredient?.suggestedSpices}
      grams={activeGrams}
      brineType={brineType}
      onMaximize={scaledRecipe ? () => setIsMaximized(true) : undefined}
    />
  );

  // ── Step 1 content ────────────────────────────────────────────

  const step1 = isReadyMade && readyMadeRecipe ? (
    // Ready-made multi-chip display
    <div style={{ marginBottom: 40 }}>
      <SectionHeading done>1. Your ingredients</SectionHeading>

      <span style={{
        background: '#D4E842', color: '#2A1A4E',
        borderRadius: 999, padding: '4px 12px',
        fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.10em',
        marginBottom: 12, display: 'inline-block',
      }}>
        Classic Recipe · {readyMadeRecipe.region}
      </span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
        {readyMadeRecipe.ingredients.map((ing, i) => (
          <span key={i} style={{
            background: '#2A1A4E', color: '#FDF4E3',
            borderRadius: 999, padding: '8px 16px',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
            border: '2px solid #D4E842',
            cursor: 'default',
            opacity: 0.9,
          }}>
            {ing}
          </span>
        ))}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 12,
        color: '#7A5A9E', marginTop: 8, fontStyle: 'italic',
      }}>
        This is a classic recipe — ingredients are fixed
      </p>
    </div>
  ) : slugIngredient ? (
    // Locked ingredient display
    <div style={{ marginBottom: 40 }}>
      <SectionHeading done>1. Your ingredient</SectionHeading>

      {/* Locked chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '10px 20px', borderRadius: 999,
        background: '#2A1A4E',
        border: '2px solid #D4E842',
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 20 }} aria-hidden="true">
          {ingredientsBySlug[ingredientId]?.emoji}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700, color: '#FDF4E3' }}>
          {slugIngredient.name}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(253,244,227,0.5)' }}>
          (primary)
        </span>
      </div>

      {/* Added ingredients row */}
      {additionalIngredients.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {additionalIngredients.map(id => {
            const ing = INGREDIENTS.find(i => i.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleAdditional(id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 999,
                  border: '1.5px solid #D4E842',
                  background: 'rgba(212,232,66,0.12)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                  color: '#2A1A4E', cursor: 'pointer',
                }}
              >
                <span>{ingredientsBySlug[id]?.emoji}</span>
                {ing?.name}
                <span style={{ opacity: 0.5, fontSize: 11 }}>✕</span>
              </button>
            );
          })}
        </div>
      )}

      {/* + Add more toggle */}
      <button
        type="button"
        onClick={() => setAddMoreExpanded(x => !x)}
        style={{
          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
          color: '#2A1A4E', background: 'transparent', cursor: 'pointer',
          border: '1.5px dashed rgba(42,26,78,0.4)',
          borderRadius: 999, padding: '8px 18px',
          transition: 'all 150ms ease',
        }}
      >
        {addMoreExpanded ? '− Less ingredients' : '+ Add more ingredients'}
      </button>

      {/* Expanded compatible chips */}
      {addMoreExpanded && (
        <div style={{ marginTop: 16 }}>
          {availableToAdd.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {availableToAdd.map(ing => (
                <button
                  key={ing.id}
                  type="button"
                  onClick={() => toggleAdditional(ing.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 16px', borderRadius: 999,
                    border: '1px solid rgba(42,26,78,0.2)',
                    background: '#FDF4E3',
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                    color: '#2A1A4E', cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                >
                  <span>{ingredientsBySlug[ing.id]?.emoji}</span>
                  {ing.name}
                </button>
              ))}
            </div>
          ) : (
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A5A9E',
              marginBottom: 8,
            }}>
              All compatible ingredients already added.
            </p>
          )}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 12, color: '#7A5A9E',
            fontStyle: 'italic',
          }}>
            These ingredients share your brine type and work well together
          </p>
        </div>
      )}
    </div>
  ) : (
    // Free-select dropdown (no slug)
    <div style={{ marginBottom: 40 }}>
      <SectionHeading>1. Pick your ingredient</SectionHeading>
      <div style={{ position: 'relative' }}>
        <select
          value={ingredientId}
          onChange={e => handleIngredientSelect(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600,
            border: '1.5px solid rgba(42,26,78,0.3)',
            borderRadius: 14,
            background: '#FDF4E3',
            color: ingredientId ? '#2A1A4E' : '#7A5A9E',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
            boxSizing: 'border-box',
          }}
        >
          <option value="">Choose an ingredient…</option>
          {INGREDIENTS.map(ing => (
            <option key={ing.id} value={ing.id}>
              {ingredientsBySlug[ing.id]?.emoji} {ing.name}
            </option>
          ))}
        </select>
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        >
          <path d="M1 1L6 7L11 1" stroke="#2A1A4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {ingredientId && (
        <button
          type="button"
          onClick={() => {
            setIngredientId('');
            setAdditionalIngredients([]);
            setAddMoreExpanded(false);
          }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 12, color: '#7A5A9E',
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '4px 0', marginTop: 4, textDecoration: 'underline',
          }}
        >
          Change ingredient
        </button>
      )}
    </div>
  );

  // ── Fullscreen overlay ────────────────────────────────────────

  const maximizedOverlay = isMaximized && scaledRecipe ? (
    <div
      onClick={e => { if (e.target === e.currentTarget) setIsMaximized(false); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(26,15,54,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 20px',
        animation: 'bs-fade-in 200ms ease',
        overflowY: 'auto',
      }}
    >
      <div style={{
        background: '#2A1A4E', borderRadius: 24, padding: 40,
        width: '100%', maxWidth: 1000,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#FDF4E3', margin: 0 }}>
            Full Recipe
          </h2>
          <button
            onClick={() => setIsMaximized(false)}
            title="Close"
            style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(253,244,227,0.2)',
              borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
              color: '#FDF4E3', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
            }}
          >
            ✕ Close
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          {/* Column 1: Brine */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', color: '#D4E842',
              letterSpacing: '0.08em', marginBottom: 12,
            }}>🧪 Brine</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {renderLines(scaledRecipe.brine, 'max-b')}
            </div>
          </div>

          {/* Column 2: Aromatics */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', color: '#D4E842',
              letterSpacing: '0.08em', marginBottom: 12,
            }}>🌿 Aromatics</p>
            <AromaticsDiff aromatics={scaledRecipe.aromatics} selectedSpices={selectedSpices} suggestedSpices={selectedIngredient?.suggestedSpices} />
          </div>

          {/* Column 3: Method */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', color: '#D4E842',
              letterSpacing: '0.08em', marginBottom: 12,
            }}>📋 Method</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {renderLines(scaledRecipe.method, 'max-m')}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 28, paddingTop: 24,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: '#D4E842', marginBottom: 6 }}>
              ⏳ Ready in
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#FDF4E3', lineHeight: 1.5 }}>
              {scaledRecipe.timeline}
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: '#D4E842', marginBottom: 6 }}>
              💡 Pro Tip
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#FDF4E3', lineHeight: 1.5 }}>
              {scaledRecipe.proTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  // ── Render ────────────────────────────────────────────────────

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {maximizedOverlay}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: isMobile ? '24px 20px 60px' : '48px 56px 80px',
      }}>
        <Link
          to={backHref}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A5A9E',
            textDecoration: 'none', display: 'inline-block', marginBottom: 20,
          }}
        >
          ← {backLabel}
        </Link>

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
          step three · pick your aromatics
        </p>
        <h1
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#2A1A4E', marginBottom: 40 }}
        >
          Build a Jar
        </h1>

        {/* ── Two-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 96,
          alignItems: 'start',
        }}>
          {/* ── Left: form ── */}
          <form onSubmit={handleSubmit}>

            {/* Step 1 */}
            {step1}

            {ingredientId && (
              <>
                {/* ── Step 2: Brine ── */}
                <div style={{ marginBottom: 40 }}>
                  <SectionHeading done={!!brineFromUrl || !!slugIngredient}>
                    2. Brine type
                  </SectionHeading>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {(['salt', 'vinegar'] as const).map(type => {
                      const sel = brineType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleBrineChange(type)}
                          style={{
                            minWidth: 0,
                            padding: '14px 20px', borderRadius: 14,
                            textAlign: 'left', cursor: 'pointer',
                            transition: 'all 180ms ease',
                            background: sel ? '#2A1A4E' : '#FDF4E3',
                            color: sel ? '#FDF4E3' : '#2A1A4E',
                            border: sel ? 'none' : '1.5px dashed rgba(42,26,78,0.35)',
                            borderLeft: sel ? '4px solid #D4E842' : '1.5px dashed rgba(42,26,78,0.35)',
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 2 }}>
                            {type === 'salt' ? 'Salt Brine' : 'Vinegar Brine'}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)', fontSize: 11,
                            opacity: sel ? 0.65 : 0.5, lineHeight: 1.4,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {type === 'salt'
                              ? 'Lacto-ferment · Living cultures · Deeper flavour'
                              : 'Quick pickle · Crisp · Ready faster'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Step 3: Quantity ── */}
                <div style={{ marginBottom: 40 }}>
                  <SectionHeading>3. How much are you making?</SectionHeading>

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
                        min={100} max={5000} step={50}
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

                {/* ── Step 4: Aromatics ── */}
                <div style={{ marginBottom: 40 }}>
                  <SectionHeading>4. Pick your aromatics (optional)</SectionHeading>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A5A9E',
                    marginTop: -8, marginBottom: 16,
                  }}>
                    Changes update your recipe card live
                  </p>
                  <SpiceSelector
                    selected={selectedSpices}
                    suggested={selectedIngredient?.suggestedSpices}
                    onChange={setSelectedSpices}
                  />
                </div>

                {/* Mobile: recipe card above step 5 */}
                {isMobile && (scaledRecipe || (isReadyMade && readyMadeRecipe)) && (
                  <div style={{ marginBottom: 40 }}>
                    {recipeCardEl}
                  </div>
                )}

                {/* ── Step 5: Jar details ── */}
                <div style={{ marginBottom: 40 }}>
                  <SectionHeading>5. Name your jar</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{
                        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                        display: 'block', marginBottom: 6, color: '#7A5A9E',
                      }}>
                        Jar name
                      </label>
                      <input
                        type="text"
                        value={jarName}
                        onChange={e => setJarName(e.target.value)}
                        placeholder="e.g. Spicy dills for the holidays"
                        style={{
                          width: '100%', padding: '10px 16px', boxSizing: 'border-box',
                          fontFamily: 'var(--font-body)', fontSize: 15,
                          border: '1.5px solid rgba(196,168,232,0.3)',
                          borderRadius: 14, background: 'rgba(255,255,255,0.6)',
                          color: '#2A1A4E', outline: 'none',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                        display: 'block', marginBottom: 6, color: '#7A5A9E',
                      }}>
                        Date started
                      </label>
                      <input
                        type="date"
                        value={dateStarted}
                        onChange={e => setDateStarted(e.target.value)}
                        style={{
                          padding: '10px 16px',
                          fontFamily: 'var(--font-body)', fontSize: 15,
                          border: '1.5px solid rgba(196,168,232,0.3)',
                          borderRadius: 14, background: 'rgba(255,255,255,0.6)',
                          color: '#2A1A4E', outline: 'none',
                        }}
                      />
                    </div>

                    {/* Draft checkbox */}
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      cursor: 'pointer', padding: '14px 20px',
                      background: isDraft ? 'rgba(42,26,78,0.06)' : 'transparent',
                      borderRadius: 12,
                      border: '1.5px dashed rgba(42,26,78,0.2)',
                      transition: 'all 200ms ease',
                    }}>
                      <input
                        type="checkbox"
                        checked={isDraft}
                        onChange={e => setIsDraft(e.target.checked)}
                        style={{ width: 18, height: 18, accentColor: '#2A1A4E' }}
                      />
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: '#2A1A4E' }}>
                          Still working on it
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#7A5A9E' }}>
                          {isDraft
                            ? 'Saved as draft — finish setting it up later'
                            : 'Ready to start fermenting — jar will be marked as active'}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* ── Save button ── */}
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
                  {isDraft ? 'Save Draft →' : 'Save Jar →'}
                </button>
              </>
            )}
          </form>

          {/* ── Right: sticky recipe card (desktop only) ── */}
          {!isMobile && (
            <div style={{ position: 'sticky', top: 24 }}>
              {recipeCardEl}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
