'use client';

import { useState } from 'react';
import { Project } from '../types/project';
import { ExternalLink, Maximize2, Loader2 } from 'lucide-react';

interface ProjectEmbedProps {
  project: Project;
}

export default function ProjectEmbed({ project }: ProjectEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!project.embedUrl) {
    return null;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interactive Dashboard</h3>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                         text-gray-300 bg-gray-900 border border-gray-800 rounded-lg
                         hover:bg-gray-800 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Full View
            </a>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Toggle fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Embed container */}
      <div
        className={`
          relative rounded-xl overflow-hidden border border-gray-800 bg-gray-900
          transition-all duration-300
          ${isFullscreen ? 'fixed inset-4 z-50' : 'h-[75vh] min-h-[500px]'}
        `}
      >
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <span className="text-sm text-gray-400">Loading dashboard...</span>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src={project.embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          onLoad={handleLoad}
          title={`${project.title} Dashboard`}
        />

        {/* Fullscreen backdrop */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-40 bg-black/80"
            aria-label="Close fullscreen"
          />
        )}
      </div>

      {/* Caption */}
      <p className="mt-3 text-sm text-gray-500">
        This is an embedded interactive dashboard. Use the controls above to explore the data 
        or open in full view for the complete experience.
      </p>
    </div>
  );
}

