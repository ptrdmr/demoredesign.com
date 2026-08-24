import MedicalDataPlatformCaseStudy from './medical-data-platform';

const CASE_STUDY_SLUGS = ['medical-data-platform'] as const;

/**
 * Return whether a project slug has a bespoke case-study body.
 *
 * Inputs: URL slug from the project detail route.
 * Outputs: true when the generic README/P-A-O template should be skipped.
 */
export function hasCaseStudy(slug: string): boolean {
  return (CASE_STUDY_SLUGS as readonly string[]).includes(slug);
}

interface CaseStudyBodyProps {
  slug: string;
}

/**
 * Render the registered case-study body for a slug.
 *
 * Inputs: project slug.
 * Outputs: the matching article, or null if the slug is unregistered.
 */
export function CaseStudyBody({ slug }: CaseStudyBodyProps) {
  switch (slug) {
    case 'medical-data-platform':
      return <MedicalDataPlatformCaseStudy />;
    default:
      return null;
  }
}
