interface CodeBlockProps {
  code: string;
  caption?: string;
}

/**
 * Monospace block for short, illustrative snippets — not live source.
 *
 * Inputs: code string and optional caption.
 * Outputs: a scrollable, themed pre/code figure.
 */
export default function CodeBlock({ code, caption }: CodeBlockProps) {
  return (
    <figure className="rounded-2xl border border-gray-800/60 bg-gray-950/80 overflow-hidden">
      {caption && (
        <figcaption className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800/60">
          {caption}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-emerald-300">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
