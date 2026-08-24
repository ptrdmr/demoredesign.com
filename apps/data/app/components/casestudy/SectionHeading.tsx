import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  visual?: ReactNode;
}

/**
 * Numbered-feel section header used across case-study pages.
 *
 * Inputs: optional eyebrow, required title, optional description, optional visual.
 * Outputs: a heading block with an illustration on the right at desktop widths.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  visual,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${visual ? 'grid md:grid-cols-[1fr_14rem] gap-8 items-center' : 'max-w-3xl'}`}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">{description}</p>
        )}
      </div>
      {visual && (
        <div className="flex justify-start md:justify-end mt-6 md:mt-0 opacity-90">
          {visual}
        </div>
      )}
    </div>
  );
}
