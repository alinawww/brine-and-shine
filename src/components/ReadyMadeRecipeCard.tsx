import { useState } from 'react'
import { type ReadyMade } from '../data/ingredients'

interface Props {
  recipe: ReadyMade
  grams: number
}

function ProTipCard({ text }: { text: string }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        transform: hover ? 'rotate(-0.5deg)' : 'rotate(-1.5deg)',
        background: '#D4E842',
        borderRadius: 16,
        padding: '20px 24px',
        boxShadow: '3px 4px 0 rgba(42,26,78,0.5)',
        margin: '8px 4px 0',
        transition: 'transform 200ms ease',
      }}
    >
      <svg
        width="20" height="28" viewBox="0 0 20 28" fill="none"
        style={{ position: 'absolute', top: -10, right: 16 }}
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="7" fill="#2A1A4E"/>
        <circle cx="10" cy="10" r="4" fill="#FDF4E3"/>
        <line x1="10" y1="17" x2="10" y2="28" stroke="#2A1A4E" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#2A1A4E', marginBottom: 6 }}>
        💡 Pro Tip
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#2A1A4E', lineHeight: 1.5, margin: 0 }}>
        {text}
      </p>
    </div>
  )
}

export default function ReadyMadeRecipeCard({ recipe, grams }: Props) {
  return (
    <div style={{
      background: '#2A1A4E',
      borderRadius: 20,
      padding: '24px 28px',
      color: '#FDF4E3',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#FDF4E3', margin: 0 }}>
            {recipe.name}
          </h3>
          <span style={{
            background: '#D4E842', color: '#2A1A4E',
            borderRadius: 999, padding: '3px 10px',
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.10em',
          }}>
            {recipe.region}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(253,244,227,0.55)', margin: 0 }}>
          Classic recipe · {grams}g batch
        </p>
      </div>

      {/* Two-column: ingredients + spices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#D4E842', marginBottom: 10,
          }}>
            🥬 Ingredients
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {recipe.ingredients.map((ing, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2, fontSize: 10 }}>•</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(253,244,227,0.85)', lineHeight: 1.4 }}>
                  {ing}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#D4E842', marginBottom: 10,
          }}>
            🌿 Spices
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {recipe.spices.map((spice, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#D4E842', flexShrink: 0, marginTop: 2, fontSize: 10 }}>•</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(253,244,227,0.85)', lineHeight: 1.4 }}>
                  {spice}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 12, padding: '12px 16px',
        marginBottom: 4,
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: '#D4E842', marginBottom: 4 }}>
          ⏳ Timeline
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FDF4E3', lineHeight: 1.5, margin: 0 }}>
          {recipe.timeline}
        </p>
      </div>

      {/* Pro Tip */}
      <ProTipCard text={recipe.proTip} />
    </div>
  )
}
