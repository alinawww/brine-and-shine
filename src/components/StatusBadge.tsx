import type { Jar } from '../hooks/useJars';

const CONFIG: Record<Jar['status'], { label: string; classes: string }> = {
  draft:      { label: 'Draft',       classes: 'bg-muted/15 text-muted' },
  fermenting: { label: 'Fermenting',  classes: 'bg-tangerine/20 text-tangerine' },
  ready:      { label: 'Ready! 🎉',   classes: 'bg-sage/30 text-cosmos' },
  eaten:      { label: 'Eaten',       classes: 'bg-cosmos/10 text-muted line-through' },
};

export default function StatusBadge({ status }: { status: Jar['status'] }) {
  const { label, classes } = CONFIG[status];
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}
