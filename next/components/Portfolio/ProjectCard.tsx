import Image from 'next/image';
import type { Project, Locale } from '@/types';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === 'pt-br' ? project.titlePt : project.titleEn;
  const description =
    locale === 'pt-br' ? project.descriptionPt : project.descriptionEn;

  return (
    <li className="lg:w-[360px] lg:mr-[56px] my-8 lg:my-0 shrink-0">
      <h4 className="font-bold text-base">{title}</h4>
      <Image
        src={`/images/portfolio/${project.image}`}
        alt={title}
        width={360}
        height={225}
        className="w-full my-4 border-4 border-dark"
      />
      <p
        className="mt-4 [&>strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </li>
  );
}
