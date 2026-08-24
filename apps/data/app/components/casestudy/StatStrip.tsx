interface StatItem {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: StatItem[];
}

/**
 * Horizontal strip of headline metrics for a case-study hero.
 *
 * Inputs: an array of value/label pairs.
 * Outputs: a responsive grid of metric cards.
 */
export default function StatStrip({ stats }: StatStripProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-gray-800/60 bg-gray-950/60 px-5 py-6"
        >
          <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-gray-400 leading-snug">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
