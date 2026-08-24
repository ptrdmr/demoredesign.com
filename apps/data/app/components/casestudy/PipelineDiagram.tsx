'use client';

import { useState } from 'react';
import {
  FileUp,
  Lock,
  ScanText,
  Scissors,
  Sparkles,
  Layers,
  GitMerge,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

interface PipelineStage {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  owner: string;
  guardrail: string;
  detail: string;
  icon: LucideIcon;
}

const stages: PipelineStage[] = [
  {
    id: 'upload',
    number: '01',
    title: 'Upload',
    shortLabel: 'Upload',
    owner: 'documents views',
    guardrail: 'MIME type, size, and extension checks before anything hits disk',
    detail:
      'Upload creates a Document row after MIME and size checks. Celery picks up processing from there, so the HTTP request is already finished.',
    icon: FileUp,
  },
  {
    id: 'storage',
    number: '02',
    title: 'Encrypted storage',
    shortLabel: 'Encrypt',
    owner: 'EncryptedFileField',
    guardrail: 'Source files are encrypted at rest; plaintext never sits on disk',
    detail:
      'EncryptedFileField writes the source to disk. I treat that file as PHI from the moment it lands, before anyone has extracted a name from it.',
    icon: Lock,
  },
  {
    id: 'ocr',
    number: '03',
    title: 'Textract OCR',
    shortLabel: 'OCR',
    owner: 'start_textract_async_job → poll_textract_job',
    guardrail: 'Sync path under ~5MB; async S3 job above. Hard cap 500,000 characters.',
    detail:
      'Textract handles OCR. Files under about 5MB run synchronously; larger ones go to S3 as an async job and get polled (30 retries, 10 seconds apart). Celery Beat has a watchdog for jobs that stall.',
    icon: ScanText,
  },
  {
    id: 'chunk',
    number: '04',
    title: 'Medical-aware chunking',
    shortLabel: 'Chunk',
    owner: 'process_document_chunk',
    guardrail: 'Max 25 chunks; splits on clinical section boundaries, not raw page count',
    detail:
      'Long notes are split on clinical section headings so a chunk is a History or a Meds list, not a random character window. The document can complete as partial if 85% of those chunks succeed.',
    icon: Scissors,
  },
  {
    id: 'extract',
    number: '05',
    title: 'MediExtract',
    shortLabel: 'Extract',
    owner: 'Claude Sonnet · GPT-4o-mini fallback',
    guardrail: 'Cost circuit breaker: $5.00 per document, $100.00 per day',
    detail:
      'MediExtract is a named persona whose job is to structure what\'s already on the page, not to interpret or correct it. Specialty prompts exist for ED, surgical, and lab notes, and the system prefix is cached with Anthropic so multi-chunk documents cost less.',
    icon: Sparkles,
  },
  {
    id: 'fhir',
    number: '06',
    title: 'FHIR generation',
    shortLabel: 'FHIR',
    owner: 'fhir.services (one service per resource type)',
    guardrail: 'Pydantic-validated extraction before a resource is emitted',
    detail:
      'The fhir app has a service per resource type rather than one converter for the whole bundle. On the test corpus it captures a bit over 95% of the expected resources.',
    icon: Layers,
  },
  {
    id: 'merge',
    number: '07',
    title: 'Idempotent merge',
    shortLabel: 'Merge',
    owner: 'Patient.add_fhir_resources()',
    guardrail: 'Composite-key matching; retry-safe; selective rollback by document',
    detail:
      'Patient.add_fhir_resources() merges immediately and is idempotent, so a Celery retry won\'t double-write. rollback_document_merge() can later remove just that document\'s resources from a bundle that already has others in it.',
    icon: GitMerge,
  },
  {
    id: 'record',
    number: '08',
    title: 'Patient record',
    shortLabel: 'Record',
    owner: 'encrypted_fhir_bundle + provenance',
    guardrail: 'Quality check routes the review flag — it never holds the merge',
    detail:
      'When this stage finishes, the encrypted bundle is updated and a Provenance resource is chained on. Auto-approval closes the high-quality ones; everything else is already on the record and sitting in a review flag.',
    icon: UserRound,
  },
];

/**
 * Interactive eight-stage pipeline. Clicking a stage reveals owner, guardrail, and narrative.
 *
 * Inputs: none (stage data is local).
 * Outputs: a responsive stepper plus a detail panel.
 */
export default function PipelineDiagram() {
  const [activeId, setActiveId] = useState(stages[0].id);
  const activeStage = stages.find((stage) => stage.id === activeId) ?? stages[0];
  const ActiveIcon = activeStage.icon;

  return (
    <div className="rounded-2xl border border-gray-800/60 bg-gray-950/40 p-4 md:p-6">
      <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeId;

          return (
            <li key={stage.id} className="relative">
              <button
                type="button"
                onClick={() => setActiveId(stage.id)}
                aria-pressed={isActive}
                className={`
                  w-full h-full rounded-xl border px-2 py-3 text-left transition-all
                  ${isActive
                    ? 'border-emerald-500/50 bg-emerald-950/40 shadow-lg shadow-emerald-500/10'
                    : 'border-gray-800/70 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/70'}
                `}
              >
                <span className="flex items-center gap-2 mb-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono text-[10px] text-gray-500">{stage.number}</span>
                </span>
                <span className={`block text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {stage.shortLabel}
                </span>
              </button>
              {index < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-1/2 -right-1 w-2 h-px bg-gray-700"
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 rounded-xl border border-gray-800/60 bg-black/40 p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
            <ActiveIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono text-emerald-400 mb-1">
              {activeStage.number} · {activeStage.title}
            </p>
            <p className="text-gray-300 leading-relaxed">{activeStage.detail}</p>
            <dl className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-gray-900/60 px-3 py-2">
                <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Owner</dt>
                <dd className="font-mono text-cyan-300 text-xs break-words">{activeStage.owner}</dd>
              </div>
              <div className="rounded-lg bg-gray-900/60 px-3 py-2">
                <dt className="text-xs uppercase tracking-wide text-gray-500 mb-1">Guardrail</dt>
                <dd className="text-gray-300 text-xs leading-relaxed">{activeStage.guardrail}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
