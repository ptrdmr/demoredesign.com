const BTREE_LIMIT = 2704;
const DOCUMENT_BYTES = 4448;

/**
 * Two-bar visual of the document 88 B-tree overrun.
 *
 * Inputs: none (constants are the measured 2,704-byte cap vs 4,448-byte payload).
 * Outputs: a labeled comparison with a limit line.
 */
export default function ByteLimitChart() {
  const scaleMax = DOCUMENT_BYTES;
  const limitPercent = (BTREE_LIMIT / scaleMax) * 100;
  const payloadPercent = 100;

  return (
    <div className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6">
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
          Index payload vs B-tree cap
        </h3>
        <p className="text-xs font-mono text-rose-300">+1,744 bytes over</p>
      </div>

      <div className="space-y-5">
        <BarRow
          label="PostgreSQL B-tree limit"
          value={`${BTREE_LIMIT.toLocaleString()} bytes`}
          percent={limitPercent}
          color="bg-gray-500"
        />
        <BarRow
          label="Document 88 searchable_medical_codes"
          value={`${DOCUMENT_BYTES.toLocaleString()} bytes`}
          percent={payloadPercent}
          color="bg-rose-500"
        />
      </div>

      <div className="relative mt-6 h-2 rounded-full bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-emerald-500/30"
          style={{ width: `${limitPercent}%` }}
        />
        <div
          className="absolute inset-y-0 bg-rose-500/50"
          style={{ left: `${limitPercent}%`, width: `${100 - limitPercent}%` }}
        />
        <div
          className="absolute inset-y-0 w-px bg-emerald-300"
          style={{ left: `${limitPercent}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Left of the marker would have indexed. Right of it is why the merge
        failed while the UI still said complete.
      </p>
    </div>
  );
}

interface BarRowProps {
  label: string;
  value: string;
  percent: number;
  color: string;
}

function BarRow({ label, value, percent, color }: BarRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="font-mono text-sm text-white shrink-0">{value}</p>
      </div>
      <div className="h-3 rounded-full bg-gray-900 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
