'use client';

import { ProjectType, ProjectFilters } from '../types/project';
import { Github, BarChart2, PieChart, BookOpen, Folder, Filter, X } from 'lucide-react';

interface FilterBarProps {
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
  projectCounts: Record<ProjectType | 'all', number>;
}

const typeOptions: { value: ProjectType | 'all'; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All Projects', icon: <Filter className="w-4 h-4" /> },
  { value: 'github', label: 'GitHub', icon: <Github className="w-4 h-4" /> },
  { value: 'tableau', label: 'Tableau', icon: <BarChart2 className="w-4 h-4" /> },
  { value: 'powerbi', label: 'Power BI', icon: <PieChart className="w-4 h-4" /> },
  { value: 'jupyter', label: 'Notebooks', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'other', label: 'Other', icon: <Folder className="w-4 h-4" /> },
];

export default function FilterBar({ filters, onFilterChange, projectCounts }: FilterBarProps) {
  const activeType = filters.type || 'all';

  const handleTypeChange = (type: ProjectType | 'all') => {
    onFilterChange({ ...filters, type });
  };

  const clearFilters = () => {
    onFilterChange({ type: 'all', domain: 'all', status: 'all' });
  };

  const hasActiveFilters = activeType !== 'all';

  return (
    <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800/50 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Type filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {typeOptions.map((option) => {
              const count = projectCounts[option.value];
              const isActive = activeType === option.value;
              
              // Don't show options with 0 projects (except "all")
              if (count === 0 && option.value !== 'all') return null;

              return (
                <button
                  key={option.value}
                  onClick={() => handleTypeChange(option.value)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 border
                    ${isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/50 text-white'
                      : 'bg-gray-900/50 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                    }
                  `}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs
                    ${isActive ? 'bg-emerald-500/30 text-emerald-300' : 'bg-gray-800 text-gray-500'}
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 
                         hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

