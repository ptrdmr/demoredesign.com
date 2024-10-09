'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
// Comment out or remove the problematic imports for now
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Code, Mail, Phone, ChevronDown, Menu, X } from "lucide-react"

export default function Component() {
const [scrollY, setScrollY] = useState(0)
const [activeSection, setActiveSection] = useState('hero')
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [formState, setFormState] = useState({
  name: '',
  email: '',
  message: '',
})

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
  { name: "MORITRAC", url: "https://www.moritrac.com", image: "/moritrac-screenshot.jpg" },
  { name: "Concourse Bowling", url: "https://www.concoursebowling.com", image: "/concourse-screenshot.jpg" },
  // { name: "Project 3", url: "#", image: "/placeholder.svg?height=300&width=400" },
  // { name: "Project 4", url: "#", image: "/placeholder.svg?height=300&width=400" },
  // { name: "Project 5", url: "#", image: "/placeholder.svg?height=300&width=400" },
  // { name: "Project 6", url: "#", image: "/placeholder.svg?height=300&width=400" },
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
  const form = e.target as HTMLFormElement;
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as any).toString()
    })
    if (response.ok) {
      alert('Form submitted successfully!')
      setFormState({ name: '', email: '', message: '' })
    } else {
      alert('Form submission failed. Please try again.')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred. Please try again.')
  }
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormState({ ...formState, [e.target.name]: e.target.value })
}

return (
  <div className="min-h-screen bg-black text-white overflow-hidden">
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
        <div className="text-2xl font-bold">
          <svg width="260" height="40" viewBox="0 0 260 40" xmlns="http://www.w3.org/2000/svg">
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
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-900 to-black opacity-50"
          style={{
            clipPath: `polygon(${Math.min(50 + scrollY / 5, 100)}% 0, 100% 0, 100% 100%, ${Math.max(0, 50 - scrollY / 5)}% 100%)`
          }}
        ></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Web Design Solutions
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-75 max-w-2xl mx-auto">Crafting powerful digital experiences for businesses of all sizes</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-full transition-transform hover:scale-110">
            Elevate Your Online Presence
          </Button>
        </div>
        <ChevronDown className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce" size={32} />
      </section>

      <section id="services" className="py-20 px-4 md:px-6 bg-green-900 bg-opacity-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Services</h2>
        <div className="container mx-auto grid md:grid-cols-3 gap-8 max-w-6xl">
          {[
            { 
              title: "Small Business Package", 
              description: "Perfect for startups and small businesses looking to establish their online presence", 
              price: "$1,000", 
              features: [
                "Responsive Design", 
                "Single Page Layout", 
                "Basic SEO", 
                "Contact Form Integration",
                "Custom Domain Setup",
                "1 Round of Revisions",
                "30 Days of Support"
              ]
            },
            { 
              title: "Professional Package", 
              description: "Ideal for growing businesses requiring a more comprehensive web solution", 
              price: "Starting at $3,000", 
              features: [
                "Responsive Design",
                "Up to 5 Pages of Cultivated Content",
                "Advanced SEO Optimization",
                "Up to 3 3rd Party Integrations",
                "Custom Domain & Email Setup",
                "2 Rounds of Revisions",
                "3 Months of Maintenance",
                "Basic Analytics Setup"
              ]
            },
            {
              title: "Enterprise Solutions",
              description: "Tailored for large companies needing robust, scalable web infrastructure",
              price: "Custom Quote",
              features: [
                "Custom Design & Development",
                "Unlimited Pages & Sections",
                "Advanced Interactive Elements",
                "Advanced SEO Optimizations",
                "5 3rd Party Integrations",
                "Detailed Case Studies & Portfolio Sections",
                "6 Months of Priority Support & Maintenance",
                "Advanced Analytics & Conversion Tracking",
                "Web App Development Options",
                "Scalable Architecture for High Traffic"
              ]
            }
          ].map((service, index) => (
            <Card key={index} className="bg-black bg-opacity-50 border-green-600 hover:border-green-400 transition-all duration-300 transform hover:scale-105 flex flex-col">
              <CardHeader>
                <CardTitle className="text-green-300 text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-gray-300">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-200 flex-grow">
                <p className="text-4xl font-bold mb-4 text-white">{service.price}</p>
                <ul className="list-none space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                  {index === 2 ? "Request Quote" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 md:px-6 bg-black bg-opacity-90">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Portfolio</h2>
        <div className="container mx-auto grid md:grid-cols-2 gap-8 max-w-6xl">
          {portfolioItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative h-64 bg-green-900 bg-opacity-50 rounded-lg overflow-hidden cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="transition-transform duration-300 group-hover:scale-110 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white text-lg font-semibold hover:underline">
                  {item.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-20 px-4 md:px-6 bg-gradient-to-t from-green-900/20 to-black">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-2xl mx-auto">
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
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
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
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
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2  text-green-400" size={18} />
            </div>
            <div className="relative">
              <Textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your Message" 
                className="bg-black bg-opacity-50 border-green-600 text-white pl-10  focus:border-green-400 transition-all duration-300" 
                required
              />
              <Mail className="absolute left-3 top-6 transform -translate-y-1/2 text-green-400" size={18} />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>

    <footer className="bg-black bg-opacity-90 py-8 px-4 md:px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">DEMOREDESIGN</h3>
          <p className="text-green-400">Professional Web Solutions for Businesses</p>
        </div>
        <div className="flex space-x-6">
          {[Mail, Phone, Briefcase, Code].map((Icon, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-white hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
              aria-label={`Social media link ${index + 1}`}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  </div>
)
}