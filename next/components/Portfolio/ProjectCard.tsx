import Image from "next/image";
import type { Project, Locale } from "@/types";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const title = locale === "pt-br" ? project.titlePt : project.titleEn;
  const description =
    locale === "pt-br" ? project.descriptionPt : project.descriptionEn;

  return (
    <li className="lg:w-[360px] lg:mr-[56px] my-4 lg:my-0 shrink-0">
      <h4 className="font-bold text-base mb-2 min-h-[3em]">{title}</h4>
      <div className="relative w-full aspect-video border-4 border-dark">
        <Image
          src={
            project.image.startsWith("http")
              ? project.image
              : `/images/portfolio/${project.image}`
          }
          alt={title}
          fill
          sizes="(max-width: 1024px) 50vw, 360px"
          className="object-cover object-top"
        />
      </div>
      <p
        className="mt-2 text-sm [&>strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </li>
  );
}
