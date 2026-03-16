import type { Locale } from "@/types";
import { getMessages, getPrint3DProjects } from "@/lib/data";
import { Print3DCard } from "./Print3DCard";

interface Print3DProps {
  locale: Locale;
}

export async function Print3D({ locale }: Print3DProps) {
  const messages = getMessages(locale);
  const projects = await getPrint3DProjects();
  const { print3d } = messages;

  return (
    <section
      id="impressao-3d"
      className="w-full lg:min-w-dvw min-h-dvh flex flex-col lg:flex-row pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar — desktop */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[75px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {print3d.title}
        </h2>
      </header>
      {/* Section header — mobile */}
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{print3d.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex items-center w-full p-4 lg:p-8 overflow-hidden">
        <div className="w-full">
          {/* Heading + intro */}
          <div className="mb-6 max-w-xl">
            <h3 className="font-bold text-lg mb-2">
              <span className="border-b-[3px] border-dark">
                {print3d.heading}
              </span>
            </h3>
            <p
              className="text-sm [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: print3d.intro }}
            />
          </div>

          {/* Cards */}
          {projects.length === 0 ? (
            <p className="text-dark/50 italic">{print3d.emptyMessage}</p>
          ) : (
            <ul className="flex flex-col lg:flex-row gap-0 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4">
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
