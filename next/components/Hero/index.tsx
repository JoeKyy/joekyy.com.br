import Image from "next/image";
import type { Locale } from "@/types";
import { getSiteConfig } from "@/lib/data";

interface HeroProps {
  locale: Locale;
}

export async function Hero({ locale }: HeroProps) {
  const config = await getSiteConfig(locale);
  const heroHtml = locale === "pt-br" ? config.heroHtmlPt : config.heroHtmlEn;
  const avatarAlt =
    locale === "pt-br" ? config.heroAvatarAltPt : config.heroAvatarAltEn;

  return (
    <section
      id="hello"
      className="min-w-screen min-h-dvh lg:h-dvh flex items-center pt-27.5 lg:pt-0 px-4 lg:px-0"
    >
      <div className="w-full lg:w-screen">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-5/12 lg:px-[15px]">
            <h3
              className="text-lg lg:text-[48px] font-normal text-center lg:text-right leading-[0.9] my-4 lg:my-0 [&>strong]:font-bold"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
              dangerouslySetInnerHTML={{ __html: heroHtml ?? "" }}
            />
          </div>
          <div className="lg:w-7/12 lg:px-[15px] text-center">
            <Image
              src="/images/avatar.png"
              alt={avatarAlt ?? "Joe"}
              width={501}
              height={501}
              className="max-w-full h-auto mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
