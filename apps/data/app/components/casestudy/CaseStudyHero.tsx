import type { ReactNode } from 'react';

interface CaseStudyHeroProps {
  eyebrow?: string;
  lede: string;
  visual?: ReactNode;
}

/**
 * Opening lede that sits under the shared project hero chrome.
 *
 * Inputs: optional eyebrow, required lede, optional illustration.
 * Outputs: a short narrative introduction with an optional graphic.
 */
export default function CaseStudyHero({ eyebrow, lede, visual }: CaseStudyHeroProps) {
  return (
    <div className={visual ? 'grid md:grid-cols-[1fr_14rem] gap-8 items-center' : 'max-w-3xl'}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4">
            {eyebrow}
          </p>
        )}
        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium">
          {lede}
        </p>
      </div>
      {visual && (
        <div className="flex justify-start md:justify-end mt-6 md:mt-0">
          {visual}
        </div>
      )}
    </div>
  );
}
