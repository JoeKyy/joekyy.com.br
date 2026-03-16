import Image from "next/image";
import type { Print3DProject, Locale } from "@/types";

interface Print3DCardProps {
  project: Print3DProject;
  locale: Locale;
  reelsLabel: string;
  buyLabel: string;
}

export function Print3DCard({ project, locale, reelsLabel, buyLabel }: Print3DCardProps) {
  const title = locale === "pt-br" ? project.titlePt : project.titleEn;
  const description = locale === "pt-br" ? project.descriptionPt : project.descriptionEn;

  return (
    <li className="w-[160px] lg:w-[240px] lg:mr-[40px] my-8 lg:my-0 shrink-0">
      <h4 className="font-bold text-base mb-3 min-h-[4.5em]">{title}</h4>

      {/* Thumbnail clicável — formato vertical (9:16) */}
      <a
        href={project.reelsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative group border-4 border-dark"
        aria-label={`${title} — ${reelsLabel}`}
      >
        {project.thumbnail ? (
          <div className="relative w-full aspect-[9/16]">
            <Image
              src={project.thumbnail}
              alt={title}
              fill
              sizes="(max-width: 1024px) 160px, 240px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[9/16] bg-dark/10 flex items-center justify-center">
            <span className="text-5xl">🖨️</span>
          </div>
        )}
        {/* Overlay cobre toda a imagem */}
        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-light text-sm font-bold border-2 border-light px-3 py-1">
            ▶ {reelsLabel}
          </span>
        </div>
      </a>

      {description && (
        <p className="mt-2 text-sm text-dark/80">{description}</p>
      )}

      {project.buyUrl && (
        <a
          href={project.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs font-bold border-2 border-dark bg-dark text-light px-3 py-1 hover:bg-transparent hover:text-dark transition-colors"
        >
          🛒 {buyLabel}
        </a>
      )}
    </li>
  );
}
