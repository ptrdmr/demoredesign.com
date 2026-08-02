import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — Neighborhood Bookings',
  description:
    'I help hospitality venues fill slow days with local groups. Peter DeMore, owner — group sales experience inside a multi-million-dollar venue.',
  openGraph: {
    title: 'About — Neighborhood Bookings',
    description:
      'I help hospitality venues fill slow days with local groups. Meet Peter DeMore, owner.',
    url: 'https://web.demoredesign.com/about',
    siteName: 'Neighborhood Bookings',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-rule px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-content items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-accent md:text-xl"
          >
            Neighborhood Bookings
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to site
          </Link>
        </div>
      </header>

      <main className="px-4 py-16 md:px-6 md:py-28">
        <div className="mx-auto max-w-content">
          <p className="font-mono text-eyebrow uppercase text-ink-muted">About</p>
          <h1 className="mt-4 max-w-2xl font-display text-display text-balance">
            I help venues fill slow days with local groups.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            I research what&apos;s around your business, build a list of who to call, and write a
            plan tailored to what you sell. Restaurants, diners, bowling centers, bar-grills, and
            family entertainment centers — if you have slow times and open seats, I can help.
          </p>

          <article className="mt-16 border-t border-rule pt-16 md:mt-20 md:pt-20">
            <div className="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-12">
              <div className="relative aspect-square w-full max-w-[12rem] border border-rule bg-surface">
                <Image
                  src="/me.jpg"
                  alt="Peter DeMore"
                  fill
                  sizes="192px"
                  className="object-cover object-center"
                  priority
                />
              </div>
              <div>
                <p className="font-mono text-eyebrow uppercase text-ink-soft">Owner</p>
                <h2 className="mt-2 font-display text-section-heading">Peter DeMore</h2>
                <p className="mt-6 max-w-prose leading-relaxed text-ink-muted">
                  I ran group sales inside a multi-million-dollar venue before starting
                  Neighborhood Bookings. I built this system at{' '}
                  <a
                    href="https://www.concoursebowling.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    Concourse Bowling
                  </a>{' '}
                  — learning hospitality from the floor, not from a desk.
                </p>
                <p className="mt-4 max-w-prose leading-relaxed text-ink-muted">
                  Every deliverable reflects that: real names, real sources, and plans your team
                  can run the week they arrive.
                </p>
              </div>
            </div>
          </article>

          <div className="mt-16 border-t border-rule pt-12">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded bg-accent px-8 py-4 text-base font-medium text-white transition-colors duration-150 hover:bg-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              Book a 20-minute call
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-rule px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-content flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-muted">Helping venues fill slow days with local groups.</p>
          <a
            href="mailto:ptrdmr@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors duration-150 hover:text-accent"
          >
            <Mail size={16} strokeWidth={1.5} />
            ptrdmr@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
