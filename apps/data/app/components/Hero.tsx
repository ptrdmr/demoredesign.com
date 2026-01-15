'use client';

import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToProjects?: () => void;
}

export default function Hero({ onScrollToProjects }: HeroProps) {
  const handleScrollClick = () => {
    if (onScrollToProjects) {
      onScrollToProjects();
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-black to-cyan-950/30" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating accent shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-emerald-300 font-medium">Data & Analytics Portfolio</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Turning Data into
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Actionable Insight
          </span>
        </h1>

        {/* Bio summary */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Started at Concourse in 2013 bussing tables, later moving into the office where I became 
          the go-to problem solver for tech, marketing, data, reporting, and workflow automation. 
          That hands-on experience pushed me into engineering—building data platforms, 
          OCR pipelines, and AI-driven solutions that understand real business needs.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleScrollClick}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 
                     text-black font-semibold rounded-full transition-all duration-300
                     hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
        >
          View Projects
          <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
        </button>

        {/* Tech stack pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {['Python', 'Django', 'SQL', 'Tableau', 'Power BI', 'OCR/LLM'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm text-gray-400 bg-gray-900/50 border border-gray-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  );
}

