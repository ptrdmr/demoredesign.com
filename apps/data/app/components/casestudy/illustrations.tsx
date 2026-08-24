import type { ReactNode } from 'react';

/**
 * On-the-nose case-study illustrations. Each drawing is the title word
 * or the concept in the copy, in the site's emerald / cyan / slate palette.
 */

const frame = 'w-full max-w-[14rem] h-auto';
const card = 'w-14 h-14';

interface GraphicProps {
  className?: string;
}

function Svg({
  className,
  label,
  children,
  viewBox = '0 0 160 120',
}: GraphicProps & { label: string; children: ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={label}
      fill="none"
    >
      {children}
    </svg>
  );
}

/** Hero: a messy page going into a box and coming out as FHIR blocks. */
export function HeroGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A messy document becoming structured FHIR blocks">
      <rect x="8" y="18" width="44" height="58" rx="3" stroke="#6b7280" strokeWidth="1.5" />
      <path d="M16 30h28M16 38h22M16 46h26M16 54h18" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 62h24" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M56 48h16" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#hero-arrow)" />
      <defs>
        <marker id="hero-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0l6 3-6 3z" fill="#10b981" />
        </marker>
      </defs>
      <rect x="80" y="28" width="28" height="16" rx="2" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" />
      <rect x="114" y="28" width="28" height="16" rx="2" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.08)" />
      <rect x="80" y="50" width="28" height="16" rx="2" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.08)" />
      <rect x="114" y="50" width="28" height="16" rx="2" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" />
      <text x="86" y="39" fill="#6ee7b7" fontSize="7" fontFamily="ui-monospace, monospace">Cnd</text>
      <text x="120" y="39" fill="#67e8f9" fontSize="7" fontFamily="ui-monospace, monospace">Med</text>
      <text x="86" y="61" fill="#67e8f9" fontSize="7" fontFamily="ui-monospace, monospace">Obs</text>
      <text x="120" y="61" fill="#6ee7b7" fontSize="7" fontFamily="ui-monospace, monospace">Enc</text>
      <text x="96" y="86" fill="#6b7280" fontSize="8" fontFamily="ui-sans-serif, sans-serif">FHIR</text>
    </Svg>
  );
}

/** Extraction is only half the job: a page split down the middle. */
export function HalfJobGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A document split in half: messy text on the left, structured fields on the right">
      <rect x="28" y="10" width="104" height="100" rx="4" stroke="#374151" strokeWidth="1.5" />
      <line x1="80" y1="10" x2="80" y2="110" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M40 28h28M40 38h24M40 48h26M40 58h20M40 68h28M40 78h16" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="90" y="26" width="32" height="10" rx="2" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
      <rect x="90" y="42" width="32" height="10" rx="2" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
      <rect x="90" y="58" width="32" height="10" rx="2" fill="rgba(34,211,238,0.12)" stroke="#22d3ee" strokeWidth="1" />
      <rect x="90" y="74" width="32" height="10" rx="2" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
      <text x="40" y="100" fill="#6b7280" fontSize="7">half</text>
      <text x="94" y="100" fill="#10b981" fontSize="7">half</text>
    </Svg>
  );
}

/** Crooked stack of papers / a fax. */
export function UnstructuredGraphic({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A crooked stack of papers">
      <rect x="18" y="10" width="32" height="40" rx="2" transform="rotate(-8 34 30)" stroke="#6b7280" strokeWidth="1.5" />
      <rect x="16" y="14" width="32" height="40" rx="2" transform="rotate(4 32 34)" stroke="#9ca3af" strokeWidth="1.5" fill="#0a0a0a" />
      <rect x="14" y="16" width="32" height="40" rx="2" stroke="#10b981" strokeWidth="1.5" fill="#111" />
      <path d="M20 26h20M20 32h16M20 38h18" stroke="#6b7280" strokeWidth="1.2" />
      <text x="20" y="50" fill="#6b7280" fontSize="6">FAX</text>
    </Svg>
  );
}

/** Two documents becoming one, with an undo arrow. */
export function MergeUndoGraphic({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="Two documents merging into one with an undo arrow">
      <rect x="6" y="14" width="18" height="24" rx="2" stroke="#6b7280" strokeWidth="1.4" />
      <rect x="14" y="20" width="18" height="24" rx="2" stroke="#6b7280" strokeWidth="1.4" />
      <path d="M34 32h8" stroke="#10b981" strokeWidth="1.5" />
      <rect x="42" y="16" width="16" height="30" rx="2" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)" />
      <path d="M50 52c-10 0-16-6-16-14" stroke="#22d3ee" strokeWidth="1.4" fill="none" />
      <path d="M32 42l2-5 5 1" stroke="#22d3ee" strokeWidth="1.4" fill="none" />
    </Svg>
  );
}

/** HIPAA: medical cross behind a locked shield. */
export function HipaaGraphic({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A medical cross behind a locked shield">
      <path d="M32 8l18 8v16c0 12-8 20-18 24-10-4-18-12-18-24V16z" stroke="#10b981" strokeWidth="1.6" fill="rgba(16,185,129,0.08)" />
      <path d="M32 22v16M24 30h16" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="28" y="36" width="8" height="7" rx="1" stroke="#e5e7eb" strokeWidth="1.2" />
      <path d="M30 36v-2a2 2 0 014 0v2" stroke="#e5e7eb" strokeWidth="1.2" />
    </Svg>
  );
}

/** A document on a pipe with stations — a pipeline. */
export function PipelineGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A document traveling through a pipeline">
      <rect x="8" y="52" width="144" height="16" rx="8" stroke="#374151" strokeWidth="1.5" fill="rgba(17,24,39,0.8)" />
      {[24, 52, 80, 108, 136].map((x) => (
        <circle key={x} cx={x} cy="60" r="5" fill="#0a0a0a" stroke="#10b981" strokeWidth="1.4" />
      ))}
      <rect x="68" y="22" width="24" height="30" rx="2" stroke="#e5e7eb" strokeWidth="1.4" fill="#111" />
      <path d="M73 30h14M73 36h12M73 42h10" stroke="#6b7280" strokeWidth="1" />
    </Svg>
  );
}

/** A literal bottleneck: wide pipe, pinched middle, documents queued. */
export function BottleneckGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="Documents queued at a bottleneck in a pipe">
      <path
        d="M10 30h40c8 0 12 10 20 20s12 20 20 20h50"
        stroke="#6b7280"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M10 30h40c8 0 12 10 20 20s12 20 20 20h50"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
      />
      <rect x="18" y="18" width="12" height="16" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" />
      <rect x="32" y="16" width="12" height="16" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" />
      <rect x="26" y="22" width="12" height="16" rx="1.5" stroke="#f87171" strokeWidth="1.3" />
      <rect x="118" y="62" width="14" height="18" rx="1.5" stroke="#10b981" strokeWidth="1.3" fill="rgba(16,185,129,0.1)" />
    </Svg>
  );
}

/** A locked book (narrative) next to an open index card of codes. */
export function PrivacyGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A locked narrative book next to an unlocked index of codes">
      <rect x="14" y="22" width="52" height="76" rx="3" stroke="#6b7280" strokeWidth="1.5" fill="#111" />
      <path d="M14 34h52" stroke="#374151" />
      <rect x="32" y="56" width="16" height="14" rx="2" stroke="#e5e7eb" strokeWidth="1.3" />
      <path d="M36 56v-4a4 4 0 018 0v4" stroke="#e5e7eb" strokeWidth="1.3" />
      <rect x="84" y="30" width="60" height="60" rx="3" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.06)" />
      <text x="92" y="50" fill="#67e8f9" fontSize="8" fontFamily="ui-monospace, monospace">I10</text>
      <text x="92" y="64" fill="#67e8f9" fontSize="8" fontFamily="ui-monospace, monospace">E11.9</text>
      <text x="92" y="78" fill="#67e8f9" fontSize="8" fontFamily="ui-monospace, monospace">R73.9</text>
    </Svg>
  );
}

/** A clipboard with an allowlist; a dumpster of papers crossed out. */
export function AllowlistGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="An allowlist clipboard next to a crossed-out dump of papers">
      <rect x="16" y="20" width="56" height="80" rx="4" stroke="#10b981" strokeWidth="1.5" fill="#0a0a0a" />
      <rect x="32" y="14" width="24" height="12" rx="3" stroke="#10b981" strokeWidth="1.3" />
      <path d="M26 44h8M38 44h24" stroke="#6ee7b7" strokeWidth="1.3" />
      <path d="M26 56h8M38 56h20" stroke="#6ee7b7" strokeWidth="1.3" />
      <path d="M26 68h8M38 68h22" stroke="#6ee7b7" strokeWidth="1.3" />
      <circle cx="30" cy="44" r="3" stroke="#10b981" />
      <circle cx="30" cy="56" r="3" stroke="#10b981" />
      <circle cx="30" cy="68" r="3" stroke="#10b981" />
      <rect x="90" y="36" width="52" height="52" rx="4" stroke="#4b5563" strokeWidth="1.4" />
      <path d="M98 48h20M98 58h16M98 68h22" stroke="#6b7280" strokeWidth="1.2" />
      <path d="M96 40l40 44M136 40l-40 44" stroke="#f87171" strokeWidth="1.6" />
    </Svg>
  );
}

/** Document 88 with a green check and an empty data box. */
export function Doc88Graphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="Document 88 stamped complete next to an empty data box">
      <rect x="18" y="16" width="52" height="72" rx="3" stroke="#e5e7eb" strokeWidth="1.5" fill="#111" />
      <text x="28" y="40" fill="#9ca3af" fontSize="12" fontFamily="ui-sans-serif, sans-serif" fontWeight="700">88</text>
      <circle cx="44" cy="64" r="12" stroke="#10b981" strokeWidth="2" fill="rgba(16,185,129,0.12)" />
      <path d="M38 64l4 4 8-9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="88" y="28" width="52" height="52" rx="3" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="98" y="58" fill="#6b7280" fontSize="8">DATA?</text>
    </Svg>
  );
}

/** A tape measure over a tiny measured bar vs a long SLA. */
export function MeasuredGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A tape measure comparing a short measured bar to a long SLA bar">
      <rect x="16" y="20" width="128" height="18" rx="3" stroke="#6b7280" strokeWidth="1.3" fill="#111" />
      {[16, 32, 48, 64, 80, 96, 112, 128, 144].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="28" stroke="#6b7280" strokeWidth="1" />
      ))}
      <rect x="16" y="56" width="18" height="12" rx="2" fill="#10b981" />
      <rect x="16" y="80" width="120" height="12" rx="2" fill="#334155" />
      <text x="40" y="66" fill="#6ee7b7" fontSize="8">1ms</text>
      <text x="140" y="90" fill="#9ca3af" fontSize="8" textAnchor="end">SLA</text>
    </Svg>
  );
}

/** A pipe snapped in half. */
export function GuardrailGraphic({ className = frame }: GraphicProps) {
  return (
    <Svg className={className} label="A pipe broken in half">
      <ellipse cx="38" cy="60" rx="16" ry="22" stroke="#10b981" strokeWidth="3" />
      <path d="M38 38h36" stroke="#10b981" strokeWidth="3" />
      <path d="M38 82h36" stroke="#10b981" strokeWidth="3" />
      <path
        d="M74 38l-8 6 6 6-7 5 8 5-6 6 7 6"
        stroke="#6ee7b7"
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="M96 32l8 6-6 6 7 5-8 5 6 6-7 8"
        stroke="#6ee7b7"
        strokeWidth="2.2"
        fill="none"
      />
      <path d="M104 38h20" stroke="#10b981" strokeWidth="3" />
      <path d="M104 82h20" stroke="#10b981" strokeWidth="3" />
      <ellipse cx="124" cy="60" rx="16" ry="22" stroke="#10b981" strokeWidth="3" />
      <ellipse cx="38" cy="60" rx="7" ry="10" fill="#0a0a0a" stroke="#374151" strokeWidth="1.5" />
      <ellipse cx="124" cy="60" rx="7" ry="10" fill="#0a0a0a" stroke="#374151" strokeWidth="1.5" />
    </Svg>
  );
}

export function CircuitBreakerIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A circuit breaker next to a dollar sign">
      <rect x="18" y="10" width="28" height="44" rx="4" stroke="#10b981" strokeWidth="1.6" />
      <rect x="26" y="20" width="12" height="20" rx="2" fill="rgba(16,185,129,0.2)" stroke="#10b981" />
      <circle cx="32" cy="46" r="3" fill="#10b981" />
      <text x="48" y="36" fill="#6ee7b7" fontSize="16" fontWeight="700">$</text>
    </Svg>
  );
}

export function CacheIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="Stacked identical cached cards">
      <rect x="22" y="12" width="28" height="20" rx="2" stroke="#4b5563" strokeWidth="1.3" />
      <rect x="18" y="20" width="28" height="20" rx="2" stroke="#6b7280" strokeWidth="1.3" />
      <rect x="14" y="28" width="28" height="22" rx="2" stroke="#22d3ee" strokeWidth="1.5" fill="rgba(34,211,238,0.08)" />
      <path d="M20 36h16M20 42h12" stroke="#67e8f9" strokeWidth="1.2" />
    </Svg>
  );
}

export function PartialIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A document that is 85 percent filled">
      <rect x="16" y="8" width="32" height="44" rx="2" stroke="#9ca3af" strokeWidth="1.5" />
      <rect x="16" y="8" width="32" height="37" fill="rgba(16,185,129,0.25)" />
      <text x="20" y="60" fill="#6ee7b7" fontSize="8">85%</text>
    </Svg>
  );
}

export function CheckpointIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A flag checkpoint on a path">
      <path d="M8 48h48" stroke="#374151" strokeWidth="2" />
      <line x1="32" y1="48" x2="32" y2="16" stroke="#e5e7eb" strokeWidth="2" />
      <path d="M32 16h18l-4 8 4 8H32z" fill="#10b981" />
    </Svg>
  );
}

export function ChainIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="Two chain links">
      <rect x="8" y="24" width="24" height="16" rx="8" stroke="#22d3ee" strokeWidth="2.2" transform="rotate(-25 20 32)" />
      <rect x="32" y="24" width="24" height="16" rx="8" stroke="#10b981" strokeWidth="2.2" transform="rotate(25 44 32)" />
    </Svg>
  );
}

export function FailOpenIcon({ className = card }: GraphicProps) {
  return (
    <Svg className={className} viewBox="0 0 64 64" label="A door left ajar">
      <rect x="14" y="10" width="28" height="44" rx="2" stroke="#6b7280" strokeWidth="1.5" />
      <path d="M42 12l14 6v34l-14 6z" stroke="#10b981" strokeWidth="1.6" fill="rgba(16,185,129,0.08)" />
      <circle cx="50" cy="34" r="1.8" fill="#10b981" />
    </Svg>
  );
}
