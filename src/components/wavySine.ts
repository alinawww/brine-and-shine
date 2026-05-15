export function wavySine(w: number, amp = 6, periods = 6, samples = 200): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * w;
    const y = Math.sin((i / samples) * Math.PI * 2 * periods) * amp;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')}`;
}
