import {
  HorizontalScrollProvider,
  HorizontalScrollContainer,
} from "@/components/HorizontalScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types";

type PageParams = { locale: string };

export default async function LocalePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  return (
    <HorizontalScrollProvider>
      <Navigation locale={typedLocale} />
      <main className="w-full lg:flex lg:flex-1 lg:min-w-0 lg:h-dvh lg:ml-26.25">
        <HorizontalScrollContainer>
          <Hero locale={typedLocale} />
          <About locale={typedLocale} />
          <Portfolio locale={typedLocale} />
          <Clients locale={typedLocale} />
          <Contact locale={typedLocale} />
        </HorizontalScrollContainer>
      </main>
    </HorizontalScrollProvider>
  );
}
