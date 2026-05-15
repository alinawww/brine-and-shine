import { spices, type Spice } from '../data/spices';

interface Props {
  selected: string[];
  suggested?: string[];
  onChange: (spices: string[]) => void;
}

export default function SpiceSelector({ selected, suggested = [], onChange }: Props) {
  function toggle(slug: string) {
    onChange(
      selected.includes(slug)
        ? selected.filter(s => s !== slug)
        : [...selected, slug],
    );
  }

  const suggestedSpices = spices.filter(s => suggested.includes(s.slug));
  const otherSpices = spices.filter(s => !suggested.includes(s.slug));

  return (
    <div className="space-y-4">
      {suggestedSpices.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
            Suggested for this ingredient
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedSpices.map(spice => (
              <SpiceChip
                key={spice.slug}
                spice={spice}
                selected={selected.includes(spice.slug)}
                highlighted
                onToggle={() => toggle(spice.slug)}
              />
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
          All spices
        </p>
        <div className="flex flex-wrap gap-2">
          {otherSpices.map(spice => (
            <SpiceChip
              key={spice.slug}
              spice={spice}
              selected={selected.includes(spice.slug)}
              highlighted={false}
              onToggle={() => toggle(spice.slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpiceChip({
  spice,
  selected,
  highlighted,
  onToggle,
}: {
  spice: Spice;
  selected: boolean;
  highlighted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
        selected
          ? 'bg-cosmos text-parchment border-cosmos'
          : highlighted
          ? 'bg-lavender/20 text-cosmos border-lavender/40 hover:border-lavender'
          : 'bg-parchment text-cosmos border-lavender/20 hover:border-lavender/60'
      }`}
    >
      <span aria-hidden="true">{spice.emoji}</span>
      {spice.name}
    </button>
  );
}
