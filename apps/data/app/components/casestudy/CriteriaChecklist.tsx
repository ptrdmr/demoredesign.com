import { Check } from 'lucide-react';

interface CriteriaChecklistProps {
  title?: string;
  items: string[];
}

/**
 * Visual checklist for gate criteria (auto-approval, quality checks).
 *
 * Inputs: optional title and a list of criterion strings.
 * Outputs: a stacked list of check-marked items.
 */
export default function CriteriaChecklist({ title, items }: CriteriaChecklistProps) {
  return (
    <div className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6">
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-gray-300 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
