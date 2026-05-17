export function parseMaxDays(timeline: string): number {
  const str = timeline.toLowerCase()

  const rangeMatch = str.match(/(\d+)\s*[–\-]\s*(\d+)\s*(day|week|hour|month)/)
  if (rangeMatch) {
    const max = parseFloat(rangeMatch[2])
    const unit = rangeMatch[3]
    if (unit.startsWith('week'))  return max * 7
    if (unit.startsWith('month')) return max * 30
    if (unit.startsWith('hour'))  return max / 24
    return max
  }

  const plusMatch = str.match(/(\d+)\+\s*(day|week|month)/)
  if (plusMatch) {
    const n = parseFloat(plusMatch[1])
    const unit = plusMatch[2]
    if (unit.startsWith('week'))  return n * 7
    if (unit.startsWith('month')) return n * 30
    return n
  }

  const singleMatch = str.match(/(\d+)\s*(day|week|hour|month)/)
  if (singleMatch) {
    const n = parseFloat(singleMatch[1])
    const unit = singleMatch[2]
    if (unit.startsWith('week'))  return n * 7
    if (unit.startsWith('month')) return n * 30
    if (unit.startsWith('hour'))  return n / 24
    return n
  }

  if (str.includes('hour')) return 0.5

  return 7
}

export function getFermentationProgress(dateStarted: string, maxDays: number): {
  daysElapsed: number
  daysRemaining: number
  percentComplete: number
  isReady: boolean
  label: string
} {
  const start = new Date(dateStarted)
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  const daysElapsed = Math.max(0, (now.getTime() - start.getTime()) / msPerDay)
  const daysRemaining = Math.max(0, maxDays - daysElapsed)
  const percentComplete = Math.min(100, (daysElapsed / maxDays) * 100)
  const isReady = daysElapsed >= maxDays

  let label: string
  if (isReady) {
    label = 'Ready! 🎉'
  } else if (daysRemaining < 1) {
    const hoursLeft = Math.ceil(daysRemaining * 24)
    label = `${hoursLeft}h left`
  } else {
    const daysLeft = Math.ceil(daysRemaining)
    label = `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`
  }

  return { daysElapsed, daysRemaining, percentComplete, isReady, label }
}
