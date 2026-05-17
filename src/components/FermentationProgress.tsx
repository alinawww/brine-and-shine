import { parseMaxDays, getFermentationProgress } from '../utils/parseTimeline'

interface Props {
  dateStarted: string
  timeline: string
  status: string
}

export function FermentationProgress({ dateStarted, timeline, status }: Props) {
  const maxDays = parseMaxDays(timeline)
  const progress = getFermentationProgress(dateStarted, maxDays)

  if (status === 'draft') return (
    <div style={{
      background: 'rgba(42,26,78,0.06)',
      borderRadius: 16, padding: '16px 20px',
      display: 'flex', alignItems: 'center', gap: 12,
      marginBottom: 24,
    }}>
      <span style={{ fontSize: 20 }}>📝</span>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, color: '#2A1A4E' }}>
          Draft jar
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#7A5A9E' }}>
          Finish setting up to start the fermentation clock
        </div>
      </div>
    </div>
  )

  if (status === 'eaten') return (
    <div style={{
      background: '#A8D8A8', borderRadius: 16, padding: '16px 20px',
      display: 'flex', alignItems: 'center', gap: 12,
      marginBottom: 24,
    }}>
      <span style={{ fontSize: 24 }}>😋</span>
      <span style={{ fontFamily: '"Bagel Fat One"', fontSize: 20, color: '#2A1A4E' }}>
        All gone!
      </span>
    </div>
  )

  const barColor = progress.isReady ? '#A8D8A8' : '#D4E842'
  const targetDate = new Date(dateStarted)
  targetDate.setDate(targetDate.getDate() + maxDays)
  const readyDateStr = targetDate.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long',
  })

  return (
    <div style={{
      background: progress.isReady ? 'rgba(168,216,168,0.15)' : 'rgba(42,26,78,0.04)',
      borderRadius: 20, padding: '20px 24px',
      border: progress.isReady
        ? '2px solid #A8D8A8'
        : '1.5px solid rgba(42,26,78,0.1)',
      marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>
            {progress.isReady ? '🎉' : '⏳'}
          </span>
          <span style={{
            fontFamily: '"Bagel Fat One"', fontSize: 22,
            color: progress.isReady ? '#2D5016' : '#2A1A4E',
          }}>
            {progress.isReady ? 'Ready to eat!' : 'Fermenting...'}
          </span>
        </div>

        <span style={{
          background: progress.isReady ? '#A8D8A8' : '#2A1A4E',
          color: progress.isReady ? '#2A1A4E' : '#D4E842',
          borderRadius: 999, padding: '6px 16px',
          fontFamily: '"Bagel Fat One"', fontSize: 18,
        }}>
          {progress.label}
        </span>
      </div>

      <div style={{
        background: 'rgba(42,26,78,0.1)',
        borderRadius: 999, height: 12,
        overflow: 'hidden', marginBottom: 10,
      }}>
        <div style={{
          height: '100%',
          width: `${progress.percentComplete}%`,
          background: barColor,
          borderRadius: 999,
          transition: 'width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: progress.isReady
            ? 'none'
            : '0 0 12px rgba(212,232,66,0.4)',
        }} />
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-body)', fontSize: 12, color: '#7A5A9E',
      }}>
        <span>
          Started {new Date(dateStarted).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long',
          })}
        </span>
        <span>
          {progress.isReady
            ? `Ready since ${readyDateStr}`
            : `Ready around ${readyDateStr}`}
        </span>
      </div>

      {!progress.isReady && (
        <div style={{
          marginTop: 8,
          fontFamily: 'var(--font-body)', fontSize: 12,
          color: '#7A5A9E', textAlign: 'center',
        }}>
          Day {Math.floor(progress.daysElapsed)} of {maxDays} · {Math.round(progress.percentComplete)}% there
        </div>
      )}
    </div>
  )
}
