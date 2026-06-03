'use client'

import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronDown,
  LifeBuoy,
  Mail,
  Menu,
  Monitor,
  PenLine,
  Puzzle,
  Search,
  User,
  X,
  Zap,
} from "lucide-react"
import { Press_Start_2P } from "next/font/google"

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
})

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  message: '',
  projectType: '',
  budgetRange: '',
  timeline: '',
}

const capabilities = [
  {
    icon: Monitor,
    title: 'Responsive Design',
    description: 'Looks great on every device, from phone to desktop.',
  },
  {
    icon: Search,
    title: 'SEO Foundations',
    description: 'Built to be found by the customers searching for you.',
  },
  {
    icon: Puzzle,
    title: 'Custom Integrations',
    description: 'Forms, booking, payments, analytics — wired in cleanly.',
  },
  {
    icon: LifeBuoy,
    title: 'Ongoing Support',
    description: 'I do not disappear after launch.',
  },
  {
    icon: PenLine,
    title: 'Content Strategy',
    description: 'Copy and layout that converts visitors into customers.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Fast load times and optimized assets, every time.',
  },
]

const selectClassName =
  'w-full rounded-md border border-green-600 bg-black/50 px-4 py-2 text-white focus:border-green-400 focus:outline-none transition-all duration-300'

const EASTER_EGG_HOLD_MS = 3000

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formState, setFormState] = useState(INITIAL_FORM_STATE)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'contact']
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      }
      return false
    })
    if (currentSection) setActiveSection(currentSection)
  }, [scrollY])

  const portfolioItems = [
    { name: "Glycemic Glow", url: "https://glycemicglow.com/", image: "/glycemic-glow.png" },
    { name: "GStarrFx", url: "https://gstarrfx.com/", image: "/gstarr-fx.png" },
    { name: "Concourse Bowling", url: "https://www.concoursebowling.com", image: "/concourse-screenshot.jpg" },
    { name: "Sierra Club - LA Water History", url: "https://lawaterhistory.com/", image: "/sierra_club.jpg" },
  ]

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitStatus('idle')
    const form = e.currentTarget
    const formData = new FormData(form)

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
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Head>
        <title>DEMOREDESIGN - Professional Web Design Services for Businesses</title>
        <meta name="description" content="DEMOREDESIGN offers premium web design services for businesses of all sizes, from small startups to large corporations. Custom solutions, ongoing support, and advanced features." />
        <meta name="keywords" content="web design, freelance, responsive design, SEO, portfolio, small business, large corporations, premium web services, B2B web solutions" />
        <link rel="canonical" href="https://www.demoredesign.com" />
        <meta property="og:title" content="DEMOREDESIGN - Professional Web Design Services for Businesses" />
        <meta property="og:description" content="Create stunning, high-performance websites for your business with DEMOREDESIGN. Responsive design, SEO optimization, and custom B2B solutions." />
        <meta property="og:image" content="https://www.demoredesign.com/og-image.jpg" />
        <meta property="og:url" content="https://www.demoredesign.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "DEMOREDESIGN",
          "description": "Professional web design services for businesses of all sizes.",
          "url": "https://www.demoredesign.com",
          "telephone": "+1-555-123-4567",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Web Design St",
            "addressLocality": "Design City",
            "addressRegion": "DC",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.7128,
            "longitude": -74.0060
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
          },
          "sameAs": [
            "https://www.facebook.com/demoredesign",
            "https://www.linkedin.com/company/demoredesign",
            "https://www.instagram.com/demoredesign"
          ]
        })
      }} />
      <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-50">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div
            className="relative text-2xl font-bold"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <svg width="260" height="40" viewBox="0 0 260 40" xmlns="http://www.w3.org/2000/svg" className="cursor-default">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" fill="url(#logoGradient)">
                DEMOREDESIGN
              </text>
            </svg>
            {easterEggOpen && (
              <div
                className={`absolute left-0 top-full mt-3 z-[60] w-[260px] h-[416px] border-4 border-white bg-black p-4 rounded-none overflow-hidden animate-easter-egg-drop flex flex-col gap-2 box-border ${pixelFont.className}`}
                role="dialog"
                aria-label="Easter egg"
              >
                <button
                  type="button"
                  onClick={() => setEasterEggOpen(false)}
                  className="absolute top-2 right-2 z-10 text-green-400 hover:text-green-300 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} strokeWidth={3} />
                </button>
                <div className="relative w-full h-[48%] shrink-0 border-2 border-white">
                  <Image
                    src="/me.jpg"
                    alt="Peter"
                    fill
                    sizes="260px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="text-green-400 text-center flex flex-col flex-1 min-h-0 justify-between gap-2 overflow-hidden">
                  <p className="text-[14px] leading-tight shrink-0">YOU FOUND ME!</p>
                  <p className="text-[11px] leading-[1.55] shrink min-h-0">
                    Fill out the form below. When I reply, send a screenshot of this card for 20% off your first project.
                  </p>
                  <p className="text-[11px] leading-tight shrink-0 pb-0.5">-Peter DeMore</p>
                </div>
              </div>
            )}
          </div>
          <div className="hidden md:flex space-x-4">
            {['hero', 'services', 'portfolio', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`transition-colors duration-300 ${
                  activeSection === section ? 'text-green-400' : 'hover:text-green-400'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 py-4">
            {['hero', 'services', 'portfolio', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className="block w-full text-left px-4 py-2 text-white hover:bg-green-800 transition-colors duration-300"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        )}
      </header>
      <main>
        <section id="hero" className="min-h-[60vh] flex items-center justify-center relative py-20">
          {/* Frosted portfolio collage background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-2 gap-2 p-8 opacity-[0.12]">
              {portfolioItems.map((item, i) => (
                <div key={i} className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 backdrop-blur-sm bg-black/60" />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-900 to-black opacity-50 pointer-events-none"
            style={{
              clipPath: `polygon(${Math.min(50 + scrollY / 5, 100)}% 0, 100% 0, 100% 100%, ${Math.max(0, 50 - scrollY / 5)}% 100%)`
            }}
          ></div>
          <div className="text-center z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Websites That Work As Hard As You Do
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-75 max-w-2xl mx-auto">
              Custom web design for small businesses, creators, and growing brands.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full transition-transform hover:scale-110"
                onClick={() => handleNavClick('contact')}
              >
                Start Your Project
              </Button>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="text-green-400 hover:text-green-300 text-sm transition-colors duration-300"
              >
                See My Work &darr;
              </button>
            </div>
          </div>
          <ChevronDown className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce" size={32} />
        </section>

        <section id="services" className="py-20 px-4 md:px-6 bg-black">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">What I Do</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              Here&apos;s what I bring to every project — no tiers, no guesswork. Just solid work that gets you online and growing.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((capability) => {
                const Icon = capability.icon
                return (
                  <div
                    key={capability.title}
                    className="border border-green-500/40 rounded-lg p-6 text-left transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <Icon className="text-green-400 mb-4" size={28} />
                    <h3 className="text-xl font-bold mb-2 text-white">{capability.title}</h3>
                    <p className="text-gray-400 text-sm">{capability.description}</p>
                  </div>
                )
              })}
            </div>
            <Button
              className="mt-12 bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full transition-transform hover:scale-105"
              onClick={() => handleNavClick('contact')}
            >
              Start Your Project
            </Button>
          </div>
        </section>

        <section id="portfolio" className="py-20 px-4 md:px-6 bg-black bg-opacity-90">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">My Portfolio</h2>
          <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-6xl">
            {portfolioItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-72 bg-green-900 bg-opacity-50 rounded-lg overflow-hidden cursor-pointer block"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-transform duration-300 group-hover:scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <span className="text-white text-lg font-semibold">{item.name}</span>
                  <span className="text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Visit site →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-t from-green-900/20 to-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Let&apos;s Build Something</h2>
            <p className="text-gray-400 text-center mb-12">
              Tell me a bit about your project and I&apos;ll get back to you within 24 hours.
            </p>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="bg-black bg-opacity-50 border-green-600 text-white pl-10 focus:border-green-400 transition-all duration-300"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="bg-black bg-opacity-50 border-green-600 text-white pl-10 focus:border-green-400 transition-all duration-300"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm text-gray-400 mb-2">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleChange}
                    className={selectClassName}
                    required
                  >
                    <option value="" disabled>Select type</option>
                    <option value="New Website">New Website</option>
                    <option value="Redesign">Redesign</option>
                    <option value="Ongoing Support">Ongoing Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-sm text-gray-400 mb-2">Budget Range</label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formState.budgetRange}
                    onChange={handleChange}
                    className={selectClassName}
                    required
                  >
                    <option value="" disabled>Select budget</option>
                    <option value="Under $1K">Under $1K</option>
                    <option value="$1K - $3K">$1K - $3K</option>
                    <option value="$3K - $5K">$3K - $5K</option>
                    <option value="$5K+">$5K+</option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm text-gray-400 mb-2">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleChange}
                    className={selectClassName}
                    required
                  >
                    <option value="" disabled>Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 Months">1-2 Months</option>
                    <option value="3+ Months">3+ Months</option>
                    <option value="Just Exploring">Just Exploring</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Tell me about your project</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="What are you building? What does success look like?"
                  className="bg-black bg-opacity-50 border-green-600 text-white focus:border-green-400 transition-all duration-300 min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Send Message
              </Button>
              {submitStatus === 'success' && (
                <p className="text-green-400 text-center text-sm">
                  Thanks! I received your message and will be in touch within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center text-sm">
                  Something went wrong. Please try again or{' '}
                  <a href="mailto:ptrdmr@gmail.com" className="underline hover:text-red-300">
                    email us directly
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-90 py-8 px-4 md:px-6 border-t border-green-900/30">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">DEMOREDESIGN</h3>
            <p className="text-green-400">Professional Web Solutions for Your Business</p>
          </div>
          <a
            href="mailto:ptrdmr@gmail.com"
            className="flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300"
          >
            <Mail className="h-5 w-5" />
            ptrdmr@gmail.com
          </a>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; 2026 DEMOREDESIGN. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
