import type { ReactNode } from 'react';

type PanelTone = 'safe' | 'danger' | 'muted' | 'accent';

interface PanelSide {
  title: string;
  tone: PanelTone;
  children: ReactNode;
}

interface SplitPanelProps {
  left: PanelSide;
  right: PanelSide;
}

const toneStyles: Record<PanelTone, { wrap: string; title: string }> = {
  safe: {
    wrap: 'border-emerald-800/40 bg-emerald-950/20',
    title: 'text-emerald-300',
  },
  danger: {
    wrap: 'border-rose-800/40 bg-rose-950/20',
    title: 'text-rose-300',
  },
  muted: {
    wrap: 'border-gray-800/60 bg-gray-950/50',
    title: 'text-gray-300',
  },
  accent: {
    wrap: 'border-cyan-800/40 bg-cyan-950/20',
    title: 'text-cyan-300',
  },
};

/**
 * Two-column comparison panel (allow / deny, before / after, encrypted / search).
 *
 * Inputs: left and right sides, each with a title, tone, and body.
 * Outputs: a stacked-on-mobile, side-by-side-on-desktop layout.
 */
export default function SplitPanel({ left, right }: SplitPanelProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[left, right].map((side) => {
        const styles = toneStyles[side.tone];
        return (
          <div
            key={side.title}
            className={`rounded-2xl border p-6 ${styles.wrap}`}
          >
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${styles.title}`}>
              {side.title}
            </h3>
            {side.children}
          </div>
        );
      })}
    </div>
  );
}
