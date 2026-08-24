import { ArrowRight } from 'lucide-react';

const beforeSteps = ['Upload', 'Extract', 'Hold', 'Manual approve', 'Merge'];
const afterSteps = ['Upload', 'Extract', 'Auto-merge', 'Patient record'];

const reviewStates = [
  { id: 'pending', label: 'pending', note: 'Just extracted' },
  { id: 'auto_approved', label: 'auto_approved', note: 'All five gates passed' },
  { id: 'flagged', label: 'flagged', note: 'Any gate failed' },
  { id: 'reviewed', label: 'reviewed', note: 'Human confirmed' },
  { id: 'rejected', label: 'rejected', note: 'Rolled back' },
];

/**
 * Before/after merge flow plus the five-state review machine.
 *
 * Inputs: none (copy is local to this project’s concurrency redesign).
 * Outputs: two stacked flows and a state-machine row.
 */
export default function BeforeAfterFlow() {
  return (
    <div className="space-y-4">
      <FlowRow
        label="Before"
        caption="Every document waits"
        steps={beforeSteps}
        tone="muted"
        holdIndex={2}
      />
      <FlowRow
        label="After"
        caption="Merge first, review second"
        steps={afterSteps}
        tone="accent"
      />

      <div className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
          Review state machine
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          A five-state field replaced a boolean. The merge doesn&apos;t wait on the flag.
        </p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <StateChip state={reviewStates[0]} />
          <BranchArrow />
          <div className="grid sm:grid-cols-2 gap-3 flex-1">
            <StateChip state={reviewStates[1]} highlight />
            <div className="space-y-3">
              <StateChip state={reviewStates[2]} />
              <div className="grid grid-cols-2 gap-3 pl-0 sm:pl-4">
                <StateChip state={reviewStates[3]} compact />
                <StateChip state={reviewStates[4]} compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FlowRowProps {
  label: string;
  caption: string;
  steps: string[];
  tone: 'muted' | 'accent';
  holdIndex?: number;
}

function FlowRow({ label, caption, steps, tone, holdIndex }: FlowRowProps) {
  const isAccent = tone === 'accent';

  return (
    <div
      className={`rounded-2xl border p-5 ${
        isAccent
          ? 'border-emerald-800/40 bg-emerald-950/15'
          : 'border-rose-900/30 bg-rose-950/10'
      }`}
    >
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${
            isAccent ? 'text-emerald-300' : 'text-rose-300'
          }`}
        >
          {label}
        </p>
        <p className="text-xs text-gray-500">{caption}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                holdIndex === index
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                  : isAccent
                    ? 'bg-emerald-500/10 text-emerald-100 border border-emerald-500/20'
                    : 'bg-gray-900 text-gray-300 border border-gray-800'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-gray-600 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface StateChipProps {
  state: { id: string; label: string; note: string };
  highlight?: boolean;
  compact?: boolean;
}

function StateChip({ state, highlight, compact }: StateChipProps) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 ${
        highlight
          ? 'border-emerald-500/40 bg-emerald-950/30'
          : 'border-gray-800 bg-gray-900/60'
      }`}
    >
      <p className="font-mono text-xs text-cyan-300">{state.label}</p>
      {!compact && <p className="text-xs text-gray-500 mt-1">{state.note}</p>}
      {compact && <p className="text-[11px] text-gray-500 mt-1">{state.note}</p>}
    </div>
  );
}

function BranchArrow() {
  return (
    <div className="hidden lg:flex flex-col items-center text-gray-600 px-1" aria-hidden="true">
      <span className="text-xs">then</span>
      <ArrowRight className="h-4 w-4" />
    </div>
  );
}
