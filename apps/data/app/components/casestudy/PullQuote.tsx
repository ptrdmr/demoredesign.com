interface PullQuoteProps {
  quote: string;
  attribution?: string;
}

/**
 * Large pull quote used to land a design decision on the page.
 *
 * Inputs: quote text and optional attribution.
 * Outputs: a bordered, accent-left blockquote.
 */
export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="relative rounded-2xl border border-emerald-800/40 bg-emerald-950/20 px-8 py-8">
      <span
        aria-hidden="true"
        className="absolute top-4 left-5 text-6xl leading-none text-emerald-500/30 font-serif"
      >
        “
      </span>
      <p className="relative text-xl md:text-2xl text-white font-medium leading-relaxed pl-4">
        {quote}
      </p>
      {attribution && (
        <footer className="mt-4 pl-4 text-sm text-emerald-300/80">{attribution}</footer>
      )}
    </blockquote>
  );
}
