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
      {/* Inner div matches original: width: 100vw on desktop */}
      <div className="w-full lg:w-screen">
        {/* Row mirrors Bootstrap col-lg-5 + col-lg with 15px column gutters */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text column: col-lg-5 = 5/12 */}
          <div className="lg:w-5/12 lg:px-[15px]">
            <h3
              className="text-lg lg:text-[48px] font-normal text-center lg:text-right leading-[0.9] my-4 lg:my-0 [&>strong]:font-bold"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
              dangerouslySetInnerHTML={{ __html: hero.html }}
            />
          </div>

          {/* Image column: col-lg = 7/12, avatar at natural size */}
          <div className="lg:w-7/12 lg:px-[15px] text-center">
            <Image
              src="/images/avatar.png"
              alt={hero.avatarAlt}
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
