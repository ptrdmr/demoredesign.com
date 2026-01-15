'use client';

import { Project } from '../../types/project';
import ProjectEmbed from '../../components/ProjectEmbed';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return <ProjectEmbed project={project} />;
}

