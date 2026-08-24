import { Lock, Search } from 'lucide-react';

const encryptedFields = [
  'encrypted_fhir_bundle',
  'first_name · last_name',
  'date_of_birth',
  'ssn · address · phone · email',
];

const searchableFields = [
  'searchable_medical_codes',
  'encounter_dates',
  'provider_references',
  'MRN (plaintext by design)',
];

/**
 * Dual-storage diagram: encrypted PHI bundle vs plaintext searchable indexes.
 *
 * Inputs: none.
 * Outputs: a two-vault visual explaining the encryption split.
 */
export default function DualStorageDiagram() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Vault
        icon={Lock}
        title="Encrypted at rest"
        subtitle="Fernet field encryption · django-cryptography-5"
        items={encryptedFields}
        tone="locked"
        footer="The complete FHIR bundle — names, dates, narrative — never leaves ciphertext."
      />
      <Vault
        icon={Search}
        title="Searchable without PHI"
        subtitle="Plaintext JSONB · GIN indexes"
        items={searchableFields}
        tone="open"
        footer="SNOMED, ICD, RxNorm, and LOINC codes aren't PHI. That's what buys sub-50ms search over encrypted records."
      />
    </div>
  );
}

interface VaultProps {
  icon: typeof Lock;
  title: string;
  subtitle: string;
  items: string[];
  tone: 'locked' | 'open';
  footer: string;
}

function Vault({ icon: Icon, title, subtitle, items, tone, footer }: VaultProps) {
  const isLocked = tone === 'locked';

  return (
    <div
      className={`rounded-2xl border p-6 ${
        isLocked
          ? 'border-gray-700 bg-gradient-to-b from-gray-900/80 to-gray-950'
          : 'border-cyan-800/40 bg-gradient-to-b from-cyan-950/30 to-gray-950'
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isLocked ? 'bg-gray-800 text-gray-300' : 'bg-cyan-500/15 text-cyan-300'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2 font-mono text-sm">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-lg px-3 py-2 ${
              isLocked
                ? 'bg-black/40 text-emerald-300/90'
                : 'bg-cyan-950/40 text-cyan-200'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-gray-400 leading-relaxed">{footer}</p>
    </div>
  );
}
