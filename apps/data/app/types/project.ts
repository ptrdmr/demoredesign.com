/**
 * Project type definitions for data.demoredesign.com portfolio.
 * 
 * This type system is extensible - add new ProjectType values as needed.
 */

export type ProjectType = 'github' | 'tableau' | 'powerbi' | 'jupyter' | 'other';

export type ProjectStatus = 'published' | 'featured' | 'wip';

export type DomainTag = 
  | 'Healthcare'
  | 'Operations'
  | 'AI/ML'
  | 'Data Engineering'
  | 'Reporting'
  | 'Automation'
  | 'Analytics'
  | 'OCR/Document Processing'
  | 'Backend Development'
  | 'Visualization';

export type ToolTag =
  | 'Python'
  | 'SQL'
  | 'Django'
  | 'Tableau'
  | 'Power BI'
  | 'Pandas'
  | 'OCR'
  | 'LLM'
  | 'PostgreSQL'
  | 'Celery'
  | 'React'
  | 'Next.js'
  | 'Excel'
  | 'R';

export interface Project {
  /** Unique URL-safe identifier */
  slug: string;
  
  /** Display title */
  title: string;
  
  /** One-line description for cards */
  tagline: string;
  
  /** Project category */
  type: ProjectType;
  
  /** Publication status */
  status: ProjectStatus;
  
  /** Domain/industry tags */
  domainTags: DomainTag[];
  
  /** Technologies used */
  toolTags: ToolTag[];
  
  /** Path to thumbnail image (in /public) */
  thumbnail?: string;
  
  /** GitHub repository URL */
  repoUrl?: string;
  
  /** Tableau/PowerBI embed URL for iframe */
  embedUrl?: string;
  
  /** Direct link to live dashboard or app */
  liveUrl?: string;
  
  /** Jupyter notebook URL (GitHub, Colab, etc.) */
  notebookUrl?: string;
  
  /** Extended description for detail page */
  problemStatement?: string;
  
  /** How you approached the problem */
  approach?: string;
  
  /** Results and impact */
  outcome?: string;
  
  /** Completion date (ISO format) */
  dateCompleted?: string;
}

/** Helper type for filtering */
export interface ProjectFilters {
  type?: ProjectType | 'all';
  domain?: DomainTag | 'all';
  status?: ProjectStatus | 'all';
}

/** Type guard for checking project type */
export function isEmbeddableProject(project: Project): boolean {
  return project.type === 'tableau' || project.type === 'powerbi';
}

/** Get icon name for project type */
export function getProjectTypeIcon(type: ProjectType): string {
  const icons: Record<ProjectType, string> = {
    github: 'github',
    tableau: 'bar-chart-2',
    powerbi: 'pie-chart',
    jupyter: 'book-open',
    other: 'folder',
  };
  return icons[type];
}

/** Get display label for project type */
export function getProjectTypeLabel(type: ProjectType): string {
  const labels: Record<ProjectType, string> = {
    github: 'GitHub',
    tableau: 'Tableau',
    powerbi: 'Power BI',
    jupyter: 'Notebook',
    other: 'Project',
  };
  return labels[type];
}

