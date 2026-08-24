import { Project } from '../types/project';

/**
 * Portfolio projects data.
 * 
 * Add new projects by following the Project interface structure.
 * Projects are displayed in the order they appear here (featured first recommended).
 */
export const projects: Project[] = [
  // ============================================
  // REAL PROJECTS
  // ============================================

  {
    slug: 'food-sales-dashboard',
    title: 'Food & Beverage Sales Dashboard',
    tagline: 'Interactive analytics dashboard covering $312K in revenue across 81 menu items — built with React & Recharts',
    type: 'react-dashboard',
    status: 'featured',
    domainTags: ['Food & Beverage', 'Analytics', 'Reporting', 'Visualization'],
    toolTags: ['React', 'Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    thumbnail: 'https://i.imgur.com/e7TJUv6.png',
    embedUrl: 'https://concourseanalytics.netlify.app/',
    liveUrl: 'https://concourseanalytics.netlify.app/',
    problemStatement: 'The venue\'s food & beverage operation generates thousands of transactions weekly across a large menu, but leadership lacked a consolidated view of what was selling, what was underperforming, and how revenue trended over time.',
    approach: 'Extracted 19 weeks of POS transaction data and built an interactive dashboard with KPI metrics, revenue & volume rankings, weekly trend analysis, category breakdowns, and a sortable/filterable product detail table.',
    outcome: 'A fully interactive dashboard surfacing actionable insights: top 10 items drive 56% of revenue, December holiday traffic produced a $28.9K peak week, and 15 low-volume items may warrant menu consolidation.',
    dateCompleted: '2026-02-15',
  },

  {
    slug: 'medical-data-platform',
    title: 'Medical Document Parser',
    tagline: 'Django backend with OCR pipelines, LLM extraction, FHIR integration, and HIPAA-compliant PHI storage',
    type: 'case-study',
    status: 'featured',
    domainTags: ['Healthcare', 'AI/ML', 'Backend Development', 'OCR/Document Processing'],
    toolTags: ['Django', 'Python', 'PostgreSQL', 'OCR', 'LLM', 'Celery'],
    thumbnail: '/projects/medical-document-parser.svg',
    problemStatement: 'Clinical documents arrive unstructured (PDFs, faxes, scans) and already contain PHI. Extraction is only half the job; a silent failure can\'t be allowed to look like success.',
    approach: 'I built a Django platform around OCR, Claude/GPT extraction, FHIR R4, and an optimistic merge that writes first and reviews after, with HIPAA audit logging on an allowlist.',
    outcome: 'Quality-gated auto-merge, under 200ms of pipeline overhead, a complete audit trail, and 280+ tests on the FHIR merge path.',
    dateCompleted: '2026-01-15',
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

