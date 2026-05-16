import { spicesBySlug } from '../data/spices';
import type { ScaledRecipe } from '../utils/scaleRecipe';

export interface RecipeCardProps {
  scaledRecipe: ScaledRecipe | null;
  ingredientName: string;
  additionalIngredients: string[];
  selectedSpices: string[];
  suggestedSpices?: string[];
  grams: number;
  brineType: 'salt' | 'vinegar';
  onMaximize?: () => void;
}

// ── Helpers ──────────────────────────────────────────────────

function spiceMatchesLine(spiceName: string, line: string): boolean {
  const lLine = line.toLowerCase();
  const lName = spiceName.toLowerCase();
  if (lLine.includes(lName)) return true;
  const words = lName.split(' ');
  const stopWords = new Set(['yellow', 'black', 'white', 'red', 'green', 'fresh', 'dried']);
  const meaningful = words.filter(w => !stopWords.has(w));
  if (meaningful.join(' ') !== lName && lLine.includes(meaningful.join(' '))) return true;
  // Stem match: each meaningful word minus last 2 chars
  return meaningful.length > 0 && meaningful.every(w => {
    const stem = w.slice(0, Math.max(3, w.length - 2));
    return lLine.includes(stem);
  });
}

export function renderLines(text: string, keyPrefix: string) {
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

// ── Aromatics with spice diff ─────────────────────────────────

export function AromaticsDiff({ aromatics, selectedSpices, suggestedSpices }: { aromatics: string; selectedSpices: string[]; suggestedSpices?: string[] }) {
  const lines = aromatics.split('\n').filter(l => l.trim());
  const foundInRecipe = new Set<string>();

  const renderedLines = lines.map((line, i) => {
    if (!line.startsWith('•')) {
      return (
        <p key={i} style={{ color: 'rgba(253,244,227,0.45)', fontSize: 13, fontStyle: 'italic', lineHeight: 1.55, margin: '2px 0' }}>
          {line}
        </p>
      );
    }

    // Find the first selected spice that matches this line
    const matchedSlug = selectedSpices.find(slug => {
      const spice = spicesBySlug[slug];
      return spice && spiceMatchesLine(spice.name, line);
    });

    if (matchedSlug) {
      foundInRecipe.add(matchedSlug);
      return (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
          <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2 }}>•</span>
          <span style={{ color: 'rgba(253,244,227,0.9)', lineHeight: 1.55 }}>{line.slice(1).trim()}</span>
        </div>
      );
    }

    // Only strike-through lines that match a suggested spice the user deselected
    const anySpiceMatches = (suggestedSpices ?? []).some(slug => {
      const spice = spicesBySlug[slug];
      return spice && spiceMatchesLine(spice.name, line);
    });

    if (anySpiceMatches) {
      // In base recipe but deselected
      return (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, opacity: 0.4 }}>
          <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2 }}>•</span>
          <span style={{ color: 'rgba(253,244,227,0.9)', lineHeight: 1.55, textDecoration: 'line-through' }}>
            {line.slice(1).trim()}
          </span>
        </div>
      );
    }

    // Non-spice aromatic (herbs, optional notes, etc.) — show normally
    return (
      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13 }}>
        <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2 }}>•</span>
        <span style={{ color: 'rgba(253,244,227,0.9)', lineHeight: 1.55 }}>{line.slice(1).trim()}</span>
      </div>
    );
  });

  // Selected spices not found in recipe lines → "✦ added"
  const addedSpices = selectedSpices.filter(slug => !foundInRecipe.has(slug));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {renderedLines}
      {addedSpices.map(slug => (
        <div key={slug} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <span style={{ color: '#D4E842', flexShrink: 0 }}>•</span>
          <span style={{ color: 'rgba(253,244,227,0.9)', lineHeight: 1.55 }}>
            {spicesBySlug[slug]?.name ?? slug}
          </span>
          <span style={{
            color: '#D4E842', fontSize: 10, fontWeight: 700,
            fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
          }}>
            ✦ added
          </span>
        </div>
      ))}
    </div>
  );
}

// ── RecipeCard ────────────────────────────────────────────────

export default function RecipeCard({
  scaledRecipe,
  ingredientName,
  additionalIngredients,
  selectedSpices,
  suggestedSpices,
  grams,
  onMaximize,
}: RecipeCardProps) {
  if (!scaledRecipe) {
    return (
      <div style={{
        background: '#2A1A4E', borderRadius: 24, padding: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: 220, textAlign: 'center',
      }}>
        <span style={{ fontSize: 48, marginBottom: 16 }}>🫙</span>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600,
          color: 'rgba(253,244,227,0.6)', marginBottom: 6,
        }}>
          Your recipe will appear here
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13,
          color: 'rgba(253,244,227,0.35)',
        }}>
          Pick an ingredient to get started
        </p>
      </div>
    );
  }

  const hasAdditional = additionalIngredients.length > 0;
  const additionalNames = additionalIngredients.map(id => {
    // Import inline to avoid circular dep — just title-case the id
    return id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1');
  });

  return (
    <div style={{ background: '#2A1A4E', borderRadius: 24, padding: 32 }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: hasAdditional ? 12 : 28,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 28,
          color: '#FDF4E3', margin: 0,
        }}>
          Your Recipe
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onMaximize && (
            <button onClick={onMaximize} title="Full screen view" style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(253,244,227,0.3)',
              borderRadius: 8, padding: '6px 8px',
              cursor: 'pointer', color: '#FDF4E3',
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Full view
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#D4E842',
              animation: 'bs-pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.10em', color: '#D4E842',
            }}>
              Live
            </span>
          </div>
        </div>
      </div>

      {hasAdditional && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12,
          color: 'rgba(253,244,227,0.5)', marginBottom: 20, lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          Recipe for {ingredientName}. {additionalNames.join(' and ')} will share this brine — adjust quantities accordingly.
        </p>
      )}

      <div style={{ marginBottom: 8 }}>
        <span style={{
          background: '#D4E842', color: '#2A1A4E',
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          padding: '4px 12px', borderRadius: 999,
        }}>
          Scaled for {grams}g
        </span>
      </div>

      <div style={{ marginTop: 20 }} />

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
          {renderLines(scaledRecipe.brine, 'rb')}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }} />

      {/* Aromatics with spice diff */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
          textTransform: 'uppercase', color: '#D4E842',
          letterSpacing: '0.08em', marginBottom: 12,
        }}>
          🌿 Aromatics
        </p>
        <AromaticsDiff aromatics={scaledRecipe.aromatics} selectedSpices={selectedSpices} suggestedSpices={suggestedSpices} />
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
          {renderLines(scaledRecipe.method, 'rm')}
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
  );
}
