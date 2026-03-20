import type { Locale } from "@/types";
import { getMessages, getPrint3DProjects, getSiteConfig } from "@/lib/data";
import { Print3DCard } from "./Print3DCard";

interface Print3DProps {
  locale: Locale;
}

export async function Print3D({ locale }: Print3DProps) {
  const messages = getMessages(locale);
  const [projects, config] = await Promise.all([
    getPrint3DProjects(),
    getSiteConfig(locale),
  ]);
  const { print3d } = messages;

  const heading =
    locale === "pt-br"
      ? config.print3dHeadingPt || print3d.heading
      : config.print3dHeadingEn || print3d.heading;
  const intro =
    locale === "pt-br"
      ? config.print3dIntroPt || print3d.intro
      : config.print3dIntroEn || print3d.intro;

  return (
    <section
      id="impressao-3d"
      className="w-full lg:w-max lg:min-w-max min-h-dvh flex flex-col lg:flex-row pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar — desktop */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[45px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {print3d.title}
        </h2>
      </header>
      {/* Section header — mobile */}
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{print3d.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex flex-col lg:flex-row items-center p-4 w-full">
        {/* Intro column */}
        <div className="lg:w-[360px] lg:mr-[56px] shrink-0">
          <h3 className="font-bold text-lg my-4">
            <span className="border-b-[3px] border-dark">{heading}</span>
          </h3>
          <p
            className="text-md [&>strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: intro }}
          />
        </div>

        {/* Cards */}
        <div>
          {projects.length === 0 ? (
            <p className="text-dark/50 italic">{print3d.emptyMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 lg:flex lg:flex-row lg:items-start">
              {projects.map((project) => (
                <Print3DCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  reelsLabel={print3d.reelsLabel}
                  buyLabel={print3d.buyLabel}
                />
              ))}
            </ul>
          )}
        </div>
      </article>
    </section>
  );
}
