import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Style Reference — Neighborhood Bookings',
  robots: { index: false, follow: false },
}

const swatches = [
  { name: 'Paper', token: '--paper', hex: '#FBF8F3', on: '#17150F' },
  { name: 'Paper alt', token: '--paper-alt', hex: '#F5F0E8', on: '#17150F' },
  { name: 'Surface', token: '--surface', hex: '#FFFFFF', on: '#17150F' },
  { name: 'Ink', token: '--ink', hex: '#17150F', on: '#FBF8F3' },
  { name: 'Ink muted', token: '--ink-muted', hex: '#5C5850', on: '#FBF8F3' },
  { name: 'Rule', token: '--rule', hex: '#E3DCD0', on: '#17150F' },
  { name: 'Accent', token: '--accent', hex: '#A03E2F', on: '#FFFFFF' },
  { name: 'Accent deep', token: '--accent-deep', hex: '#7C2E22', on: '#FFFFFF' },
  { name: 'Data', token: '--data', hex: '#2F5D62', on: '#FFFFFF' },
  { name: 'Focus', token: '--focus', hex: '#1F5FBF', on: '#FFFFFF' },
]

export default function StyleReferencePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-rule px-4 py-6 md:px-6">
        <div className="mx-auto max-w-content">
          <Link href="/" className="text-sm text-accent hover:text-accent-deep">
            ← Back to site
          </Link>
          <h1 className="mt-4 font-display text-section-heading">Operator&apos;s Report</h1>
          <p className="mt-2 text-ink-muted">Living style reference — not indexed.</p>
        </div>
      </header>

      <main className="mx-auto max-w-content px-4 py-12 md:px-6 md:py-16 space-y-16">
        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Palette</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((s) => (
              <div key={s.token} className="border border-rule bg-surface overflow-hidden">
                <div
                  className="h-20 flex items-end p-3"
                  style={{ backgroundColor: s.hex, color: s.on }}
                >
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <div className="p-3 text-sm text-ink-muted">
                  <p>{s.hex}</p>
                  <p className="font-mono text-xs mt-1">{s.token}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Type scale</h2>
          <div className="mt-6 space-y-6 border border-rule bg-surface p-8">
            <p className="font-mono text-eyebrow uppercase text-ink-soft">Eyebrow label</p>
            <p className="font-display text-display">Display headline</p>
            <p className="font-display text-section-heading">Section heading</p>
            <p className="font-display text-sub-heading">Sub-heading</p>
            <p className="max-w-prose text-ink-muted">
              Body copy at 1.0625rem with 1.65 line-height. Used for paragraphs, form help text,
              and card descriptions. Prose should not exceed 68 characters per line where possible.
            </p>
            <p className="font-display text-4xl tabular-nums">$5,000</p>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Buttons</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost link</Button>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            3px radius. 150ms color transitions. No scale or glow on hover.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Form fields</h2>
          <div className="mt-6 max-w-md space-y-4">
            <Input placeholder="Text input" />
            <Input type="email" placeholder="email@venue.com" />
          </div>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Price card</h2>
          <Card className="mt-6 max-w-sm border-2 border-accent shadow-card">
            <CardHeader>
              <p className="font-mono text-eyebrow uppercase text-accent">The full system</p>
              <CardTitle>Group revenue system</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-4xl tabular-nums">$5,000</p>
              <p className="mt-2 text-sm text-ink-muted">50% to start · 50% on handoff</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Stat block</h2>
          <div className="mt-6 inline-block border border-rule bg-surface p-6">
            <p className="font-mono text-eyebrow uppercase text-ink-soft">Persons / household</p>
            <p className="font-display text-4xl tabular-nums text-data">3.01</p>
            <p className="mt-1 text-sm text-ink-muted">vs. 2.81 LA County · 2.59 U.S.</p>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Pills</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-block rounded-sm bg-data-soft px-2 py-1 font-mono text-xs text-data">
              Verified
            </span>
            <span className="inline-block rounded-sm bg-accent-soft px-2 py-1 font-mono text-xs text-accent">
              Confirm
            </span>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-eyebrow uppercase text-ink-muted">Motion</h2>
          <p className="mt-4 text-sm text-ink-muted max-w-prose">
            One fade-up per section on scroll (500ms, ease-out). Color transitions at 150ms. No
            infinite animations. Respects prefers-reduced-motion.
          </p>
        </section>
      </main>
    </div>
  )
}
