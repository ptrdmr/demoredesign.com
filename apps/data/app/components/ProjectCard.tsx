'use client';

import Link from 'next/link';
import { Project, getProjectTypeLabel } from '../types/project';
import { Github, BarChart2, PieChart, BookOpen, Folder, LayoutDashboard, ArrowUpRight, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const typeIcons: Record<string, React.ReactNode> = {
  github: <Github className="w-4 h-4" />,
  tableau: <BarChart2 className="w-4 h-4" />,
  powerbi: <PieChart className="w-4 h-4" />,
  jupyter: <BookOpen className="w-4 h-4" />,
  'react-dashboard': <LayoutDashboard className="w-4 h-4" />,
  other: <Folder className="w-4 h-4" />,
};

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  github: { bg: 'bg-gray-900', border: 'border-gray-700', text: 'text-gray-300' },
  tableau: { bg: 'bg-blue-950/50', border: 'border-blue-800/50', text: 'text-blue-300' },
  powerbi: { bg: 'bg-amber-950/50', border: 'border-amber-800/50', text: 'text-amber-300' },
  jupyter: { bg: 'bg-orange-950/50', border: 'border-orange-800/50', text: 'text-orange-300' },
  'react-dashboard': { bg: 'bg-emerald-950/50', border: 'border-emerald-800/50', text: 'text-emerald-300' },
  other: { bg: 'bg-purple-950/50', border: 'border-purple-800/50', text: 'text-purple-300' },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const colors = typeColors[project.type] || typeColors.other;

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article
        className={`
          relative h-full rounded-2xl border transition-all duration-300
          bg-gray-950/50 border-gray-800/50
          hover:border-emerald-500/30 hover:bg-gray-900/50
          hover:shadow-xl hover:shadow-emerald-500/5
          hover:-translate-y-1
        `}
      >
        {/* Featured badge */}
        {project.status === 'featured' && (
          <div className="absolute -top-3 -right-3 z-10">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 
                            rounded-full text-xs font-semibold text-black shadow-lg">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Thumbnail area */}
        <div className="relative aspect-video rounded-t-2xl overflow-hidden bg-gray-900">
          {project.thumbnail ? (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.thumbnail})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`p-6 rounded-2xl ${colors.bg} ${colors.border} border`}>
                <div className={`w-12 h-12 ${colors.text}`}>
                  {typeIcons[project.type]}
                </div>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
              ${colors.bg} ${colors.border} ${colors.text} border
            `}>
              {typeIcons[project.type]}
              {getProjectTypeLabel(project.type)}
            </span>
            
            {project.status === 'wip' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-950/50 border border-yellow-800/50 text-yellow-300">
                In Progress
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.tagline}
          </p>

          {/* Domain tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.domainTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-gray-500 bg-gray-900/50 rounded-md"
              >
                {tag}
              </span>
            ))}
            {project.domainTags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.domainTags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
            {/* Tool tags */}
            <div className="flex items-center gap-1.5">
              {project.toolTags.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 text-xs text-emerald-400/70 bg-emerald-950/30 rounded"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-emerald-400 transition-colors">
              <span className="text-xs">View</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

