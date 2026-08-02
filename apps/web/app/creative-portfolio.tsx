'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SampleModal } from '@/components/sample-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import neighborhoodIllustration from '@/components/ui/undraw_our-neighborhood_s0n2.svg'
import {
  ArrowRight,
  BookOpen,
  Mail,
  Map,
  Menu,
  Search,
  User,
  X,
} from 'lucide-react'

const EASTER_EGG_HOLD_MS = 3000

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  venueType: '',
  city: '',
  seatsOrLanes: '',
  deadDaypart: '',
  websiteUrl: '',
  message: '',
}

const NAV_SECTIONS = [
  { id: 'system', label: 'What you get' },
  { id: 'offer', label: 'Pricing' },
  { id: 'sample', label: 'Sample' },
  { id: 'contact', label: 'Book a call' },
]

const deliverables = [
  {
    icon: Search,
    eyebrow: '01',
    title: 'The What',
    label: 'Area Audit',
    description:
      "What's around you — nearby demographics, which schools, churches, and clubs are close, who else is competing for them, how the local economy is doing.",
  },
  {
    icon: Map,
    eyebrow: '02',
    title: 'The Who',
    label: 'Partner Map',
    description:
      'Who to call — real organizations with turn-key points of contact, ranked and proritized by your business goals.',
  },
  {
    icon: BookOpen,
    eyebrow: '03',
    title: 'The How',
    label: 'Playbook',
    description:
      'How to reach them — a plan built around what you sell, tailored to each group on your list.',
  },
]

const sampleHighlights = [
  {
    title: 'Real names',
    description:
      'Actual clubs, schools, and groups, with the person to ask for.',
  },
  {
    title: 'Real sources',
    description:
      'Every finding about your area cites where it came from.',
  },
  {
    title: 'A real plan',
    description:
      'Offers and outreach built around what the venue sells, matched to each group on the list.',
  },
]

const selectedWebWork = [
  {
    name: 'Concourse Bowling',
    url: 'https://www.concoursebowling.com',
    image: '/concourse-screenshot.jpg',
    note: 'Where I learned venue operations.',
  },
  { name: 'Glycemic Glow', url: 'https://glycemicglow.com/', image: '/glycemic-glow.png' },
  { name: 'GStarrFx', url: 'https://gstarrfx.com/', image: '/gstarr-fx.png' },
  {
    name: 'Sierra Club — LA Water History',
    url: 'https://lawaterhistory.com/',
    image: '/sierra_club.jpg',
  },
]

const selectClassName =
  'w-full rounded-sm border border-rule bg-surface px-3 py-2.5 text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-focus/30 transition-colors duration-150'

export default function GroupRevenueHome() {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formState, setFormState] = useState(INITIAL_FORM_STATE)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const [sampleOpen, setSampleOpen] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sampleTriggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const sections = ['hero', ...NAV_SECTIONS.map((s) => s.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleLogoMouseEnter = () => {
    if (easterEggOpen) return
    hoverTimerRef.current = setTimeout(() => {
      setEasterEggOpen(true)
      hoverTimerRef.current = null
    }, EASTER_EGG_HOLD_MS)
  }

  const handleLogoMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const handleNavClick = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const openSampleModal = (trigger: HTMLElement | null) => {
    sampleTriggerRef.current = trigger
    setSampleOpen(true)
  }

  const closeSampleModal = () => {
    setSampleOpen(false)
    requestAnimationFrame(() => {
      sampleTriggerRef.current?.focus()
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('idle')
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      })
      if (response.ok) {
        setFormState(INITIAL_FORM_STATE)
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Neighborhood Bookings',
            description:
              'Helping restaurants, diners, bowling centers, bar-grills, and family entertainment centers fill slow days with local groups.',
            url: 'https://web.demoredesign.com',
            email: 'ptrdmr@gmail.com',
            areaServed: 'United States',
            serviceType: 'Group revenue consulting for hospitality venues',
          }),
        }}
      />

      <SampleModal open={sampleOpen} onClose={closeSampleModal} />

      <header className="fixed top-0 left-0 w-full z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-content items-center justify-between px-4 py-4 md:px-6">
          <div
            className="relative"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="font-display text-lg tracking-tight text-accent md:text-xl"
            >
              Neighborhood Bookings
            </button>
            {easterEggOpen && (
              <div
                className="absolute left-0 top-full z-[60] mt-3 w-64 animate-fade-in border border-rule bg-surface p-4 shadow-card"
                role="dialog"
                aria-label="Easter egg"
              >
                <button
                  type="button"
                  onClick={() => setEasterEggOpen(false)}
                  className="absolute top-2 right-2 text-ink-muted hover:text-ink transition-colors duration-150"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="relative mb-3 aspect-square w-full border border-rule">
                  <Image
                    src="/me.jpg"
                    alt="Peter DeMore"
                    fill
                    sizes="256px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <p className="font-display text-base text-ink">Nice find.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Mention this card on your call for 20% off the website add-on.
                </p>
                <p className="mt-3 text-xs text-ink-soft">— Peter DeMore</p>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className={`text-sm transition-colors duration-150 ${
                  activeSection === id
                    ? 'text-accent'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
            <Link
              href="/about"
              className="text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              About
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-rule bg-paper px-4 py-3 md:hidden">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="block w-full py-2 text-left text-sm text-ink"
              >
                {label}
              </button>
            ))}
            <Link
              href="/about"
              className="block py-2 text-left text-sm text-ink"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </header>

      <main>
        <section
          id="hero"
          className="border-b border-rule px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36"
        >
          <div className="mx-auto max-w-content animate-fade-up">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div>
                {/* <p className="font-display text-section-heading">Analysis &amp; Strategy</p> */}
                <p className="mt-3 font-mono text-eyebrow uppercase text-ink-muted">
                  Restaurants · Diners · Bowling Alleys· Bar-grills · FECs
                </p>
                <h1 className="mt-4 max-w-3xl font-display text-display text-balance">
                  Know your neighborhood. Engage the right markets.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
                   Local demographics, the markets that fit your business, and a plan your team can run to bring them in.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button size="large" onClick={() => handleNavClick('contact')}>
                    Book a 20-minute call
                  </Button>
                  <Button
                    variant="ghost"
                    size="medium"
                    className="inline-flex items-center gap-2 px-0"
                    onClick={(event) => openSampleModal(event.currentTarget)}
                  >
                    See a sample
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </Button>
                </div>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-accent transition-colors duration-150 hover:text-accent-deep"
                >
                  About me
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>

              <div className="flex justify-center md:justify-end">
                <Image
                  src={neighborhoodIllustration}
                  alt=""
                  priority
                  className="h-auto w-full max-w-sm md:max-w-md"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="system" className="bg-paper-alt px-4 py-16 md:px-6 md:py-28">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-eyebrow uppercase text-ink-muted">What you get</p>
            <h2 className="mt-3 font-display text-section-heading">
              The what, the who, the how.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-muted">
              Three documents, delivered as a strategy page your team can open and use.
            </p>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {deliverables.map(({ icon: Icon, eyebrow, title, label, description }, i) => (
                <article
                  key={title}
                  className="animate-fade-up border-l-2 border-rule pl-6 opacity-0"
                  style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                >
                  <Icon className="mb-4 text-ink" size={22} strokeWidth={1.5} />
                  <p className="font-mono text-eyebrow uppercase text-ink-soft">{eyebrow}</p>
                  <h3 className="mt-2 font-display text-sub-heading">{title}</h3>
                  <p className="mt-1 font-mono text-eyebrow uppercase text-ink-soft">{label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="border-t border-rule px-4 py-16 md:px-6 md:py-28">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-eyebrow uppercase text-ink-muted">Pricing</p>
            <h2 className="mt-3 font-display text-section-heading">What it costs</h2>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              <article className="border-2 border-accent bg-surface p-8">
                <p className="font-mono text-eyebrow uppercase text-accent">The full system</p>
                <h3 className="mt-2 font-display text-sub-heading">Group revenue system</h3>
                <p className="mt-4 font-display text-4xl tabular-nums text-ink">$5,000</p>
                <p className="mt-2 text-sm text-ink-muted">50% to start · 50% on handoff</p>
                <h3 className="mt-2 font-display text-sub-heading">You Get:</h3>
                <ul className="mt-6 space-y-2 text-sm text-ink-muted">
                <li>Strategy web page</li>
                  <li>- Area Audit</li>
                  <li>- Partner Map</li>
                  <li>- Playbook</li>
                  <li>- 2 weeks of implementation support for your staff</li>
                </ul>
                <p className="mt-6 text-xs text-ink-soft">
                  Note:
                </p>
                <p className="mt-2 text-xs text-ink-soft">
                  Findings reflect your market at time of delivery. Local conditions and contacts can
                  change. After-project support is billed at an additional hourly rate.
                </p>
              </article>

              <article className="border border-rule bg-surface p-8">
                <p className="font-mono text-eyebrow uppercase text-ink-soft">Research only</p>
                <h3 className="mt-2 font-display text-sub-heading">Audit + partner map</h3>
                <p className="mt-4 font-display text-4xl tabular-nums text-ink">$2,000</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  The area audit and partner list only — no playbook, no strategy page. Paid in
                  full up front.
                </p>
              </article>

              <article className="border border-rule bg-surface p-8">
                <p className="font-mono text-eyebrow uppercase text-ink-soft">Website add-on</p>
                <h3 className="mt-2 font-display text-sub-heading">Site that supports bookings</h3>
                <p className="mt-4 font-display text-4xl tabular-nums text-ink">$3k–$7k</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  A clear place for groups to ask about booking, plus handouts that match what you
                  send out.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="sample" className="bg-paper-alt px-4 py-16 md:px-6 md:py-28">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-eyebrow uppercase text-accent">Sample</p>
            <h2 className="mt-3 font-display text-section-heading">
              See exactly what you get.
            </h2>
            <p className="mt-4 max-w-2xl text-ink-muted">
              A sample of the deliverable format, built for a real market, not a finished client
              project. Browse the three documents and the strategy page.
            </p>

            <p className="mt-10 font-mono text-eyebrow uppercase text-ink-muted">
              What to look for
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {sampleHighlights.map(({ title, description }) => (
                <article key={title} className="border-l-2 border-rule pl-5">
                  <h3 className="font-display text-lg text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
                </article>
              ))}
            </div>

            <Button
              size="large"
              className="mt-12"
              onClick={(event) => openSampleModal(event.currentTarget)}
            >
              Open the sample
            </Button>
          </div>
        </section>

        <section id="web" className="border-t border-rule px-4 py-16 md:px-6 md:py-28">
          <div className="mx-auto max-w-content">
            <p className="font-mono text-eyebrow uppercase text-ink-soft">Selected web work</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedWebWork.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[4/3] overflow-hidden border border-rule bg-surface"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-opacity duration-150 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    {'note' in item && item.note && (
                      <p className="mt-1 text-xs text-white/80">{item.note}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-paper-alt px-4 py-16 md:px-6 md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-eyebrow uppercase text-ink-muted">Next step</p>
            <h2 className="mt-3 font-display text-section-heading">Book a 20-minute call.</h2>
            <p className="mt-4 text-ink-muted">
              Tell me about your place. I will reply within 24 hours.
            </p>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid gap-5 md:grid-cols-2">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="pl-10"
                    required
                  />
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="pl-10"
                    required
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
                    size={16}
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="venueType" className="mb-2 block text-sm text-ink-muted">
                    Venue type
                  </label>
                  <select
                    id="venueType"
                    name="venueType"
                    value={formState.venueType}
                    onChange={handleChange}
                    className={selectClassName}
                    required
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Diner">Diner</option>
                    <option value="Bowling">Bowling</option>
                    <option value="Bar-Grill">Bar-Grill</option>
                    <option value="Family Entertainment Center">Family Entertainment Center</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="mb-2 block text-sm text-ink-muted">
                    City
                  </label>
                  <Input
                    id="city"
                    type="text"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    placeholder="City, state"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="seatsOrLanes" className="mb-2 block text-sm text-ink-muted">
                    Seats or lanes
                  </label>
                  <Input
                    id="seatsOrLanes"
                    type="text"
                    name="seatsOrLanes"
                    value={formState.seatsOrLanes}
                    onChange={handleChange}
                    placeholder="e.g. 80 seats or 24 lanes"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="deadDaypart" className="mb-2 block text-sm text-ink-muted">
                    Your slowest time
                  </label>
                  <Input
                    id="deadDaypart"
                    type="text"
                    name="deadDaypart"
                    value={formState.deadDaypart}
                    onChange={handleChange}
                    placeholder="e.g. weekday breakfast"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="websiteUrl" className="mb-2 block text-sm text-ink-muted">
                  Website URL <span className="text-ink-soft">(optional)</span>
                </label>
                <Input
                  id="websiteUrl"
                  type="url"
                  name="websiteUrl"
                  value={formState.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-ink-muted">
                  Anything else
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Anything you want me to know before we talk."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" size="large" className="w-full">
                Request a call
              </Button>

              {submitStatus === 'success' && (
                <p className="text-center text-sm text-accent">
                  Thanks — I received your message and will be in touch within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-center text-sm text-accent-deep">
                  Something went wrong. Email{' '}
                  <a href="mailto:ptrdmr@gmail.com" className="underline">
                    ptrdmr@gmail.com
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule px-4 py-10 md:px-6">
        <div className="mx-auto flex max-w-content flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-accent">Neighborhood Bookings</p>
            <p className="mt-1 text-sm text-ink-muted">
              Helping venues fill slow days with local groups.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/about"
              className="text-sm text-ink-muted transition-colors duration-150 hover:text-accent"
            >
              About me
            </Link>
            <a
              href="mailto:ptrdmr@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-ink transition-colors duration-150 hover:text-accent"
            >
              <Mail size={16} strokeWidth={1.5} />
              ptrdmr@gmail.com
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-content text-center text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} Neighborhood Bookings. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
