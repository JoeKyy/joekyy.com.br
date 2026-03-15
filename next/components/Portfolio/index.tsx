import type { Locale } from "@/types";
import { getMessages, getProjects, getSiteConfig } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

interface PortfolioProps {
  locale: Locale;
}

export async function Portfolio({ locale }: PortfolioProps) {
  const messages = getMessages(locale);
  const [projects, config] = await Promise.all([getProjects(), getSiteConfig(locale)]);
  const { portfolio } = messages;

  const heading = locale === "pt-br"
    ? config.portfolioHeadingPt || portfolio.heading
    : config.portfolioHeadingEn || portfolio.heading;
  const intro = locale === "pt-br"
    ? config.portfolioIntroPt || portfolio.intro
    : config.portfolioIntroEn || portfolio.intro;
  const cta = locale === "pt-br"
    ? config.portfolioCtaPt || portfolio.cta
    : config.portfolioCtaEn || portfolio.cta;

  return (
    <section
      id="portifolio"
      className="w-full lg:w-max lg:min-w-max min-h-dvh flex flex-col lg:flex-row pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[45px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {portfolio.title}
        </h2>
      </header>
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{portfolio.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex flex-col lg:flex-row items-center p-4 w-full">
        {/* Intro column */}
        <div className="lg:w-[360px] lg:mr-[56px] shrink-0">
          <h3 className="font-bold text-lg my-4">
            <span className="border-b-[3px] border-dark">
              {heading}
            </span>
          </h3>
          <p className="text-md">{intro}</p>
          <p className="my-4">
            <strong>{cta}</strong>
          </p>
        </div>

        {/* Projects horizontal scroll */}
        <div>
          <ul className="flex flex-col lg:flex-row lg:items-center">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
