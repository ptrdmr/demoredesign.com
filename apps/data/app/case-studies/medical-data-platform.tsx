import {
  Reveal,
  CaseStudyHero,
  StatStrip,
  SectionHeading,
  PullQuote,
  CodeBlock,
  SplitPanel,
  CriteriaChecklist,
  StackGrid,
  PipelineDiagram,
  BeforeAfterFlow,
  DualStorageDiagram,
  ByteLimitChart,
  BenchmarkChart,
  HeroGraphic,
  HalfJobGraphic,
  UnstructuredGraphic,
  MergeUndoGraphic,
  HipaaGraphic,
  PipelineGraphic,
  BottleneckGraphic,
  PrivacyGraphic,
  AllowlistGraphic,
  Doc88Graphic,
  MeasuredGraphic,
  GuardrailGraphic,
  CircuitBreakerIcon,
  CacheIcon,
  PartialIcon,
  CheckpointIcon,
  ChainIcon,
  FailOpenIcon,
} from '../components/casestudy';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const stats = [
  { value: '21k+', label: 'Lines across 7 Django apps' },
  { value: '6k+', label: 'Lines of FHIR merge logic' },
  { value: '280+', label: 'Unit tests on the merge system' },
  { value: '55', label: 'Audited HIPAA event types' },
];

const autoApprovalGates = [
  'Confidence score at or above 0.80',
  'Primary Claude model — not the GPT fallback',
  'At least one FHIR resource extracted',
  'Confidence at or above 0.95 when fewer than three resources',
  'No patient date-of-birth or name conflict',
];

const safeToLog = [
  'Document IDs and medical record numbers',
  'Confidence scores and resource counts',
  'Model name and provider',
  'Whether a reviewer left notes (boolean only)',
];

const neverLogged = [
  'Patient names and dates of birth',
  'Diagnoses, medications, clinical codes',
  'FHIR bundle contents',
  'The text of a reviewer’s notes',
];

const guardrails = [
  {
    title: 'Cost circuit breaker',
    body: 'Each chunk call checks a $5.00 per-document ceiling and a $100.00 daily one. If either trips, the job stops and the error names the setting you\'d raise.',
    graphic: CircuitBreakerIcon,
  },
  {
    title: 'Prompt caching',
    body: 'Anthropic caches the MediExtract prefix, which is enough to cut input cost on a multi-chunk document by about half.',
    graphic: CacheIcon,
  },
  {
    title: 'Partial completion',
    body: 'A document can finish as partial once 85% of its chunks succeed. The rest is recoverable, so one noisy page doesn\'t fail the file.',
    graphic: PartialIcon,
  },
  {
    title: 'Checkpoint and resume',
    body: 'If Celery hits a soft time limit, the job writes a checkpoint and continues from there instead of restarting. After a configured number of resumes it fails with a real error.',
    graphic: CheckpointIcon,
  },
  {
    title: 'Provenance chain',
    body: 'Merges, conflict resolutions, and dedups each write a FHIR Provenance resource, so you can walk a diagnosis back through the documents that produced it.',
    graphic: ChainIcon,
  },
  {
    title: 'Fail-open audit',
    body: 'The audit helpers are wrapped so a thrown AuditLog write can\'t stop the clinical workflow. The record still goes through.',
    graphic: FailOpenIcon,
  },
];

const stack = [
  { name: 'Django', detail: '5.2.3' },
  { name: 'PostgreSQL', detail: 'JSONB + GIN' },
  { name: 'Celery / Redis', detail: '5.3.1 / 5.0.0' },
  { name: 'Claude Sonnet', detail: 'primary extractor' },
  { name: 'GPT-4o-mini', detail: 'fallback model' },
  { name: 'AWS Textract', detail: 'sync + async OCR' },
  { name: 'fhir.resources', detail: 'R4 · 7.1.0' },
  { name: 'django-cryptography', detail: 'Fernet fields' },
];

/**
 * Bespoke case study for the Medical Document Parser.
 *
 * Inputs: none — project chrome (nav, title, footer) lives on the shared page.
 * Outputs: the full narrative body, composed from reusable case-study sections.
 */
export default function MedicalDataPlatformCaseStudy() {
  return (
    <article className="space-y-28">
      <Reveal>
        <CaseStudyHero
          eyebrow="Case study"
          lede="I built this because the incoming documents were a mess, and the compliance requirements around them weren't optional. The backend is Django. It runs OCR, extracts a structured record with an LLM, writes FHIR R4, and keeps an audit trail of what it did."
          visual={<HeroGraphic />}
        />
        <div className="mt-10">
          <StatStrip stats={stats} />
        </div>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="01 — The problem"
          title="Extraction is only half the job"
          description="Most of the conversation around a project like this is about getting diagnoses out of a PDF. I spent more time on the other half: making sure a failure couldn't look like a success in the UI."
          visual={<HalfJobGraphic />}
        />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Unstructured input',
              body: 'A sending facility will use whatever they have — an ED note one day, a faxed lab the next. There isn\'t a schema on the other end of that.',
              graphic: UnstructuredGraphic,
            },
            {
              title: 'A merge you can undo',
              body: 'If two documents belong to the same patient, they have to land on one record. I also had to be able to take one of them back out without tearing up the rest.',
              graphic: MergeUndoGraphic,
            },
            {
              title: 'HIPAA is the constraint',
              body: 'PHI stays encrypted. Codes that aren\'t PHI stay searchable. The audit log only writes fields I\'ve explicitly allowed.',
              graphic: HipaaGraphic,
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6"
            >
              <card.graphic className="w-14 h-14 mb-3" />
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="02 — The pipeline"
          title="What happens to a document"
          description="There are eight stages from upload to patient record. Click one to see which task owns it and what stops it from running away. The HTTP request is already gone by the time Textract starts; Celery has the rest."
          visual={<PipelineGraphic />}
        />
        <PipelineDiagram />
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="03 — The bottleneck"
          title="Approve after the merge, not before"
          description="The first version held every extraction until someone clicked approve. I thought that was the careful design. It just meant good documents sat in a queue with the bad ones."
          visual={<BottleneckGraphic />}
        />
        <PullQuote
          quote="Data merges immediately even if flagged. Review happens after merge."
          attribution="Design note, optimistic concurrency"
        />
        <div className="mt-8">
          <BeforeAfterFlow />
        </div>
        <div className="mt-8 grid lg:grid-cols-2 gap-6 items-start">
          <CriteriaChecklist
            title="Auto-approval requires every gate"
            items={autoApprovalGates}
          />
          <div className="space-y-4">
            <p className="text-gray-400 leading-relaxed">
              Missing any gate flags the extraction, but the merge has already
              happened. A reviewer either confirms it or rolls that document
              back. I replaced{' '}
              <span className="font-mono text-sm text-gray-300">is_approved</span>{' '}
              with a five-state{' '}
              <span className="font-mono text-sm text-gray-300">review_status</span>{' '}
              so the flag and the merge could move independently.
            </p>
            <CodeBlock
              caption="Quality check, not a merge gate"
              code={`pending → auto_approved | flagged
                 → reviewed | rejected

# Merge is independent of the flag.
# Rollback is selective by document.`}
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="04 — Privacy by construction"
          title="Encrypt the narrative. Index the codes."
          description="A SNOMED code isn't PHI, and a patient name is. I store them differently so you can search the record without decrypting the person attached to it."
          visual={<PrivacyGraphic />}
        />
        <DualStorageDiagram />
        <p className="mt-6 max-w-3xl text-gray-400 leading-relaxed">
          Date of birth is an encrypted string because that&apos;s what the
          field-encryption library can wrap. MRN stays plaintext so you can
          look a patient up; the model comment spells that out. I also added
          management commands that verify encryption, print an audit report, or
          scrub a database before it leaves the building.
        </p>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="05 — Audit trail"
          title="An allowlist, not a dump"
          description="There are 55 event types, from PHI access through the OCR job lifecycle. I spent as much time deciding what the log is forbidden to store as I did adding events."
          visual={<AllowlistGraphic />}
        />
        <SplitPanel
          left={{
            title: 'Safe to log',
            tone: 'safe',
            children: (
              <ul className="space-y-3">
                {safeToLog.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ),
          }}
          right={{
            title: 'Never logged',
            tone: 'danger',
            children: (
              <ul className="space-y-3">
                {neverLogged.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0 text-rose-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ),
          }}
        />
        <p className="mt-6 max-w-3xl text-gray-400 leading-relaxed">
          Three helpers share the same allowlist —{' '}
          <span className="font-mono text-sm text-gray-300">audit_extraction_decision</span>,{' '}
          <span className="font-mono text-sm text-gray-300">audit_merge_operation</span>,{' '}
          <span className="font-mono text-sm text-gray-300">audit_manual_review</span>.
          Those calls are wrapped. If the audit write throws, the record still
          goes through.
        </p>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="06 — The silent failure"
          title="Document 88 processed. The data was gone."
          description="Document 88 processed and the UI marked it complete. The extracted data never merged. It was sitting in a ParsedData row I didn't know to look for."
          visual={<Doc88Graphic />}
        />
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-gray-400 leading-relaxed">
            <p>
              The merge had hit a Postgres B-tree limit of 2,704 bytes per
              index entry. Document 88&apos;s{' '}
              <span className="font-mono text-sm text-gray-300">searchable_medical_codes</span>{' '}
              JSONB was 4,448 bytes, so the write failed while the document
              status stayed complete.
            </p>
            <p>
              A green status over a missing record is a bad failure mode in
              any system. In healthcare it&apos;s worse, because someone will
              trust the screen.
            </p>
            <p>
              Migration 0009 converted those indexes to GIN. The task also
              flips the document to{' '}
              <span className="font-mono text-sm text-gray-300">failed</span>{' '}
              now, and the recovery message includes the orphaned ParsedData
              ID.
            </p>
          </div>
          <ByteLimitChart />
        </div>
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="07 — Proof"
          title="Measured, not hoped"
          description="I put a pytest-benchmark suite on the FHIR merge path after I got tired of estimating. Quality and conflict checks are under 100ms each, and the merge itself is well inside the SLA."
          visual={<MeasuredGraphic />}
        />
        <BenchmarkChart />
      </Reveal>

      <Reveal>
        <SectionHeading
          eyebrow="08 — Guardrails"
          title="The pipeline assumes things will go wrong"
          description="A lot of this code exists because documents are large, model calls are expensive, and extraction isn't deterministic. I trust the boring parts more than I trust a happy path."
          visual={<GuardrailGraphic />}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {guardrails.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-5"
            >
              <item.graphic className="w-14 h-14 mb-3" />
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
          Stack
        </h3>
        <StackGrid items={stack} />
      </Reveal>
    </article>
  );
}
