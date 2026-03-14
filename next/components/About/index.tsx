import type { Locale } from "@/types";
import { getMessages, getSkills, siteConfig } from "@/lib/data";

interface AboutProps {
  locale: Locale;
}

export function About({ locale }: AboutProps) {
  const messages = getMessages(locale);
  const skills = getSkills();
  const { about } = messages;

  const technicalSkills = skills.filter((s) => s.category === "technical");
  const professionalSkills = skills.filter(
    (s) => s.category === "professional",
  );

  return (
    <section
      id="sobre"
      className="w-full lg:min-w-dvw min-h-dvh flex flex-col lg:flex-row pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar - black bg, rotated title */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[45px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {about.title}
        </h2>
      </header>
      {/* Mobile header */}
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{about.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex items-center w-full py-[56px] px-[32px]">
        <div className="w-full">
          {/* Bio */}
          <p
            className="mb-8 text-md leading-[2] [&>span]:font-bold [&>span]:bg-dark [&>span]:text-light [&>span]:px-[5px] [&>span]:inline [&>span]:leading-[1.5]"
            dangerouslySetInnerHTML={{ __html: about.bio1 }}
          />
          <p
            className="mb-8 text-md leading-[2] [&>span]:font-bold [&>span]:bg-dark [&>span]:text-light [&>span]:px-[5px] [&>span]:inline [&>span]:leading-[1.5]"
            dangerouslySetInnerHTML={{ __html: about.bio2 }}
          />

          {/* Skills */}
          <h3 className="font-bold text-lg my-4">
            <span className="border-b-[3px] border-dark">
              {about.skillsTitle}
            </span>
          </h3>
          <div className="flex flex-row">
            <div className="w-1/2">
              <ul>
                {technicalSkills.map((skill) => (
                  <li key={skill.name} className="my-4 text-md">
                    <span className="font-bold bg-dark text-light px-[5px] inline-block leading-[1.5]">
                      {locale === "pt-br" ? skill.namePt : skill.nameEn}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <ul>
                {professionalSkills.map((skill) => (
                  <li key={skill.name} className="my-4 text-md">
                    <span className="font-bold bg-dark text-light px-[5px] inline-block leading-[1.5]">
                      {locale === "pt-br" ? skill.namePt : skill.nameEn}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resume downloads */}
          <div className="flex flex-row my-4">
            <div className="w-1/2">
              <a
                href={siteConfig.resumePtUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 font-bold border-b border-dotted border-dark"
              >
                {about.resumePtLabel}
              </a>
            </div>
            <div className="w-1/2">
              <a
                href={siteConfig.resumeEnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 font-bold border-b border-dotted border-dark"
              >
                {about.resumeEnLabel}
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
