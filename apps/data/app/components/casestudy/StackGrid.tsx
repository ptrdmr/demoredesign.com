interface StackItem {
  name: string;
  detail: string;
}

interface StackGridProps {
  items: StackItem[];
}

/**
 * Versioned technology grid for the closing stack section.
 *
 * Inputs: name/detail pairs (e.g. Django / 5.2.3).
 * Outputs: a compact responsive card grid.
 */
export default function StackGrid({ items }: StackGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-gray-800/60 bg-gray-950/50 px-4 py-4"
        >
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="mt-1 text-xs font-mono text-emerald-400/80">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
