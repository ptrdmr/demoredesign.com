import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { projects, getProjectBySlug } from '../../data/projects';
import { getProjectTypeLabel } from '../../types/project';
import { fetchGitHubReadme, getRepoDisplayName } from '../../lib/github';
import ProjectDetailClient from './ProjectDetailClient';
import GitHubReadme from '../../components/GitHubReadme';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  BookOpen,
  Calendar,
  Tag
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Data Portfolio - Demore Design`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch README for GitHub projects
  let readmeContent: string | null = null;
  let repoDisplayName: string = '';
  
  if (project.type === 'github' && project.repoUrl) {
    readmeContent = await fetchGitHubReadme(project.repoUrl);
    repoDisplayName = getRepoDisplayName(project.repoUrl);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="flex items-center gap-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                             text-black bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg
                             hover:opacity-90 transition-opacity"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                             text-black bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg
                             hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Dashboard
                </a>
              )}
              {project.notebookUrl && (
                <a
                  href={project.notebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                             text-gray-300 bg-gray-900 border border-gray-800 rounded-lg
                             hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  View Notebook
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero */}
      <header className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-cyan-950/20" />
        
        <div className="relative max-w-5xl mx-auto px-6">
          {/* Type badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full 
                          bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            <Tag className="w-4 h-4" />
            {getProjectTypeLabel(project.type)}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl">{project.tagline}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {/* GitHub repo info */}
            {project.type === 'github' && project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-mono">{repoDisplayName}</span>
              </a>
            )}
            
            {project.dateCompleted && (
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(project.dateCompleted).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {project.toolTags.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-400 
                             bg-emerald-950/30 border border-emerald-800/30 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Embedded dashboard (for Tableau/Power BI) */}
        {project.embedUrl && (
          <section className="mb-16">
            <ProjectDetailClient project={project} />
          </section>
        )}

        {/* GitHub README (for GitHub projects) */}
        {project.type === 'github' && readmeContent && project.repoUrl && (
          <section className="mb-16">
            <GitHubReadme 
              content={readmeContent} 
              repoUrl={project.repoUrl}
              repoDisplayName={repoDisplayName}
            />
          </section>
        )}

        {/* Project narrative */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-12">
            {project.problemStatement && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">The Problem</h2>
                <p className="text-gray-400 leading-relaxed">{project.problemStatement}</p>
              </section>
            )}

            {project.approach && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">Approach</h2>
                <p className="text-gray-400 leading-relaxed">{project.approach}</p>
              </section>
            )}

            {project.outcome && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">Outcome</h2>
                <p className="text-gray-400 leading-relaxed">{project.outcome}</p>
              </section>
            )}

            {/* Show note if no README was found for GitHub projects */}
            {project.type === 'github' && !readmeContent && project.repoUrl && (
              <section className="p-6 rounded-xl border border-gray-800 bg-gray-950/50">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <Github className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">View on GitHub</h3>
                    <p className="text-gray-400 mb-4">
                      Check out the full source code, documentation, and README on GitHub.
                    </p>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                                 text-black bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg
                                 hover:opacity-90 transition-opacity"
                    >
                      <Github className="w-4 h-4" />
                      Open Repository
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Domain tags */}
            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Domains
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.domainTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm text-gray-300 bg-gray-900 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.toolTags.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-sm text-emerald-400 bg-emerald-950/30 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="p-6 rounded-2xl bg-gray-950/50 border border-gray-800/50">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Links
              </h3>
              <div className="space-y-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Dashboard</span>
                  </a>
                )}
                {project.notebookUrl && (
                  <a
                    href={project.notebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>View Notebook</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
            <span className="text-sm text-gray-600">
              © {new Date().getFullYear()} Demore Design
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
