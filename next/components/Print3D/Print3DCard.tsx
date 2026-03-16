import Image from "next/image";
import type { Print3DProject, Locale } from "@/types";

interface Print3DCardProps {
  project: Print3DProject;
  locale: Locale;
  reelsLabel: string;
  buyLabel: string;
}

export function Print3DCard({
  project,
  locale,
  reelsLabel,
  buyLabel,
}: Print3DCardProps) {
  const title = locale === "pt-br" ? project.titlePt : project.titleEn;
  const description =
    locale === "pt-br" ? project.descriptionPt : project.descriptionEn;

  return (
    <li className="lg:w-[280px] lg:mr-[40px] my-8 lg:my-0 shrink-0">
      {/* Thumbnail — clicável para o Reels */}
      <a
        href={project.reelsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative group"
        aria-label={`${title} — ${reelsLabel}`}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={title}
            width={280}
            height={280}
            className="w-full aspect-square object-cover border-4 border-dark"
          />
        ) : (
          <div className="w-full aspect-square border-4 border-dark bg-dark/10 flex items-center justify-center">
            <span className="text-4xl">🖨️</span>
          </div>
        )}
        {/* Overlay com ícone do Instagram ao hover */}
        <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-light text-sm font-bold border-2 border-light px-3 py-1">
            {reelsLabel}
          </span>
        </div>
      </a>

      <h4 className="font-bold text-base mt-3">{title}</h4>

      {description && (
        <p className="text-sm mt-1 text-dark/80">{description}</p>
      )}

      {/* Botões de ação */}
      <div className="flex gap-3 mt-3">
        <a
          href={project.reelsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold border-2 border-dark px-3 py-1 hover:bg-dark hover:text-light transition-colors"
        >
          ▶ {reelsLabel}
        </a>
        {project.buyUrl && (
          <a
            href={project.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold border-2 border-dark bg-dark text-light px-3 py-1 hover:bg-transparent hover:text-dark transition-colors"
          >
            🛒 {buyLabel}
          </a>
        )}
      </div>
    </li>
  );
}
