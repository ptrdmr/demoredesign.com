'use client';

import { useEffect, useState } from 'react';
import { Project } from '../types/project';
import ProjectCard from './ProjectCard';

interface MasonryGridProps {
  projects: Project[];
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects into columns for masonry effect
  const columnArrays: Project[][] = Array.from({ length: columns }, () => []);
  
  projects.forEach((project, index) => {
    columnArrays[index % columns].push(project);
  });

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 mb-6 rounded-full bg-gray-900 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
        <p className="text-gray-400">Try adjusting your filters to see more projects.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnArrays.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ))}
    </div>
  );
}

