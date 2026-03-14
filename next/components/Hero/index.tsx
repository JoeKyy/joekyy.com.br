import Image from "next/image";
import type { Locale } from "@/types";
import { getMessages } from "@/lib/data";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const messages = getMessages(locale);
  const { hero } = messages;

  return (
    <section
      id="hello"
      className="min-w-screen min-h-dvh lg:h-dvh flex items-center pt-27.5 lg:pt-0 px-4 lg:px-0"
    >
      <div className="w-full lg:w-screen">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:flex-1">
            <h3
              className="text-lg lg:text-3xl font-normal text-center lg:text-right leading-[0.9] my-4 lg:my-0 [&>strong]:font-bold"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
              dangerouslySetInnerHTML={{ __html: hero.html }}
            />
          </div>
          <div className="lg:flex-1 text-center">
            <Image
              src="/images/avatar.png"
              alt={hero.avatarAlt}
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
