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
    thumbnail: '/projects/food-sales-dashboard.png',
    problemStatement: 'The venue\'s food & beverage operation generates thousands of transactions weekly across a large menu, but leadership lacked a consolidated view of what was selling, what was underperforming, and how revenue trended over time.',
    approach: 'Extracted 19 weeks of POS transaction data and built an interactive dashboard with KPI metrics, revenue & volume rankings, weekly trend analysis, category breakdowns, and a sortable/filterable product detail table.',
    outcome: 'A fully interactive dashboard surfacing actionable insights: top 10 items drive 56% of revenue, December holiday traffic produced a $28.9K peak week, and 15 low-volume items may warrant menu consolidation.',
    dateCompleted: '2026-02-15',
  },

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

