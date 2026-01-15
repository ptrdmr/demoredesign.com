'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Github, ExternalLink, FileText } from 'lucide-react';

interface GitHubReadmeProps {
  content: string;
  repoUrl: string;
  repoDisplayName: string;
}

export default function GitHubReadme({ content, repoUrl, repoDisplayName }: GitHubReadmeProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-800">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">README.md</h3>
            <p className="text-sm text-gray-500">From {repoDisplayName}</p>
          </div>
        </div>
        
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                     text-gray-300 bg-gray-900 border border-gray-800 rounded-lg
                     hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4" />
          View on GitHub
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* README Content */}
      <div className="rounded-xl border border-gray-800 bg-gray-950/50 overflow-hidden">
        <div className="p-6 md:p-8 prose prose-invert prose-emerald max-w-none
                        prose-headings:text-white prose-headings:font-semibold
                        prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-800 prose-h1:pb-4 prose-h1:mb-6
                        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                        prose-p:text-gray-400 prose-p:leading-relaxed
                        prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-emerald-300 prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg
                        prose-ul:text-gray-400 prose-ol:text-gray-400
                        prose-li:marker:text-gray-600
                        prose-blockquote:border-l-emerald-500 prose-blockquote:text-gray-400 prose-blockquote:italic
                        prose-table:text-gray-400
                        prose-th:text-gray-300 prose-th:font-semibold prose-th:border-gray-800
                        prose-td:border-gray-800
                        prose-img:rounded-lg prose-img:border prose-img:border-gray-800">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Make images responsive and handle relative paths
              img: ({ src, alt, ...props }) => {
                // If it's a relative path, we can't render it (would need base URL)
                if (src && !src.startsWith('http')) {
                  return (
                    <span className="inline-flex items-center gap-2 text-gray-500 text-sm italic">
                      [Image: {alt || src}]
                    </span>
                  );
                }
                return (
                  <img 
                    src={src} 
                    alt={alt} 
                    className="max-w-full h-auto rounded-lg border border-gray-800"
                    loading="lazy"
                    {...props}
                  />
                );
              },
              // Make links open in new tab
              a: ({ href, children, ...props }) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

