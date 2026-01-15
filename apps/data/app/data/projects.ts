import { Project } from '../types/project';

/**
 * Portfolio projects data.
 * 
 * Add new projects by following the Project interface structure.
 * Projects are displayed in the order they appear here (featured first recommended).
 */
export const projects: Project[] = [
  // ============================================
  // SAMPLE PROJECTS - Replace with your real projects
  // ============================================
  
  {
    slug: 'medical-data-platform',
    title: 'Medical Document Parser',
    tagline: 'Django backend with OCR pipelines, LLM extraction, FHIR integration, and HIPAA-compliant PHI storage',
    type: 'github',
    status: 'featured',
    domainTags: ['Healthcare', 'AI/ML', 'Backend Development', 'OCR/Document Processing'],
    toolTags: ['Django', 'Python', 'PostgreSQL', 'OCR', 'LLM', 'Celery'],
    thumbnail: '/projects/placeholder-medical.jpg',
    repoUrl: 'https://github.com/ptrdmr/django_doc',
    problemStatement: 'Healthcare organizations needed a secure, compliant way to extract structured medical data from documents at scale while maintaining HIPAA compliance.',
    approach: 'Built a complete Django platform featuring AI-powered document analysis with Claude/GPT extraction, FHIR R4 integration for standardized medical records, optimistic concurrency merge system, and comprehensive HIPAA audit logging.',
    outcome: 'Production-ready medical data extraction with 70-80% auto-approval rates, <200ms processing overhead, and complete audit trails. Implemented enterprise FHIR merge logic with 280+ unit tests.',
    dateCompleted: '2025-01-15',
  },
  
  {
    slug: 'operations-dashboard',
    title: 'Operations Analytics Dashboard',
    tagline: 'Real-time KPI tracking and workflow visibility for venue operations',
    type: 'tableau',
    status: 'featured',
    domainTags: ['Operations', 'Reporting', 'Analytics'],
    toolTags: ['Tableau', 'SQL', 'Python'],
    thumbnail: '/projects/placeholder-dashboard.jpg',
    embedUrl: 'https://public.tableau.com/views/YourDashboard/Sheet1',
    liveUrl: 'https://public.tableau.com/views/YourDashboard',
    problemStatement: 'Operations team lacked visibility into real-time performance metrics across departments.',
    approach: 'Designed interactive Tableau dashboard connecting to live operational data, with drill-down capabilities for each department.',
    outcome: 'Enabled data-driven decision making with 15-minute refresh cycles.',
    dateCompleted: '2024-06-01',
  },
  
  {
    slug: 'sales-reporting-powerbi',
    title: 'Sales & Revenue Reporting',
    tagline: 'Executive Power BI dashboard for revenue trends and forecasting',
    type: 'powerbi',
    status: 'published',
    domainTags: ['Reporting', 'Analytics'],
    toolTags: ['Power BI', 'SQL', 'Excel'],
    thumbnail: '/projects/placeholder-powerbi.jpg',
    embedUrl: 'https://app.powerbi.com/view?r=YOUR_EMBED_ID',
    liveUrl: 'https://app.powerbi.com/view?r=YOUR_EMBED_ID',
    problemStatement: 'Leadership needed consolidated view of revenue streams with forecasting capabilities.',
    approach: 'Built Power BI report with DAX measures for YoY comparisons, rolling averages, and predictive trends.',
    outcome: 'Replaced manual weekly reporting process, saving 10+ hours per month.',
    dateCompleted: '2024-03-01',
  },
  
  {
    slug: 'data-pipeline-analysis',
    title: 'ETL Pipeline Optimization',
    tagline: 'Jupyter analysis of data pipeline performance and bottlenecks',
    type: 'jupyter',
    status: 'published',
    domainTags: ['Data Engineering', 'Analytics'],
    toolTags: ['Python', 'Pandas', 'SQL'],
    thumbnail: '/projects/placeholder-notebook.jpg',
    notebookUrl: 'https://github.com/demoredesign/etl-analysis/blob/main/analysis.ipynb',
    repoUrl: 'https://github.com/demoredesign/etl-analysis',
    problemStatement: 'Legacy ETL processes were slow and lacked observability.',
    approach: 'Profiled pipeline stages, identified bottlenecks, and documented optimization strategies.',
    outcome: 'Recommendations led to 60% reduction in pipeline runtime.',
    dateCompleted: '2024-01-15',
  },
  
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation Suite',
    tagline: 'Automated reporting and task management integrations',
    type: 'other',
    status: 'published',
    domainTags: ['Automation', 'Operations'],
    toolTags: ['Python', 'SQL'],
    thumbnail: '/projects/placeholder-automation.jpg',
    problemStatement: 'Manual processes were consuming significant staff time across departments.',
    approach: 'Identified repetitive workflows and built automated solutions for scheduling, reporting, and notifications.',
    outcome: 'Freed up 20+ hours weekly across the organization.',
    dateCompleted: '2023-09-01',
  },
];

/**
 * Get all unique domain tags from projects
 */
export function getAllDomainTags(): string[] {
  const tags = new Set<string>();
  projects.forEach(p => p.domainTags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Get all unique tool tags from projects
 */
export function getAllToolTags(): string[] {
  const tags = new Set<string>();
  projects.forEach(p => p.toolTags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Find project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.status === 'featured');
}

