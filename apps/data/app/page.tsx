'use client';

import { useState, useMemo } from 'react';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import MasonryGrid from './components/MasonryGrid';
import { projects } from './data/projects';
import { ProjectType, ProjectFilters } from './types/project';

export default function DataPortfolio() {
  const [filters, setFilters] = useState<ProjectFilters>({
    type: 'all',
    domain: 'all',
    status: 'all',
  });

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (filters.type && filters.type !== 'all' && project.type !== filters.type) {
        return false;
      }
      if (filters.domain && filters.domain !== 'all' && !project.domainTags.includes(filters.domain)) {
        return false;
      }
      if (filters.status && filters.status !== 'all' && project.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [filters]);

  // Calculate project counts for filter badges
  const projectCounts = useMemo(() => {
    const counts: Record<ProjectType | 'all', number> = {
      all: projects.length,
      github: 0,
      tableau: 0,
      powerbi: 0,
      jupyter: 0,
      other: 0,
    };

    projects.forEach((project) => {
      counts[project.type]++;
    });

    return counts;
  }, []);

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 
                              flex items-center justify-center font-bold text-black text-lg">
                D
              </div>
              <div>
                <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  DEMOREDESIGN
                </div>
                <div className="text-xs text-gray-500">Data & Analytics</div>
              </div>
            </a>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="https://demoredesign.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                Main Site
              </a>
              <a
                href="https://github.com/demoredesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Hero Section */}
      <Hero onScrollToProjects={handleScrollToProjects} />

      {/* Projects Section */}
      <section id="projects" className="py-20">
        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Projects</h2>
              <p className="text-gray-400">
                Explore dashboards, repositories, and data analysis work
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} of {projects.length} projects
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          projectCounts={projectCounts}
        />

        {/* Projects grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <MasonryGrid projects={filteredProjects} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 
                              flex items-center justify-center font-bold text-black text-sm">
                D
              </div>
              <span className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Demore Design. Data & Analytics Portfolio.
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://demoredesign.com"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                demoredesign.com
              </a>
              <a
                href="https://github.com/demoredesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/peterdemore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
