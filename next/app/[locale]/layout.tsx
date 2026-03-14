import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import type { Locale } from "@/types";
import "@/app/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

type LayoutParams = { locale: string };

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/data/${locale}.json`)).default;

  const faviconBase = `/favicon/${locale}`;
  const socialImage =
    locale === "pt-br"
      ? "https://joekyy.com.br/images/img-social.png"
      : "https://joekyy.com.br/images/img-social-en-us.png";

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    icons: {
      shortcut: `${faviconBase}/favicon.ico`,
      icon: [
        { url: `${faviconBase}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
        { url: `${faviconBase}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
        { url: `${faviconBase}/favicon-96x96.png`, sizes: "96x96", type: "image/png" },
        { url: `${faviconBase}/android-icon-192x192.png`, sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: `${faviconBase}/apple-icon-57x57.png`, sizes: "57x57" },
        { url: `${faviconBase}/apple-icon-60x60.png`, sizes: "60x60" },
        { url: `${faviconBase}/apple-icon-72x72.png`, sizes: "72x72" },
        { url: `${faviconBase}/apple-icon-76x76.png`, sizes: "76x76" },
        { url: `${faviconBase}/apple-icon-114x114.png`, sizes: "114x114" },
        { url: `${faviconBase}/apple-icon-120x120.png`, sizes: "120x120" },
        { url: `${faviconBase}/apple-icon-144x144.png`, sizes: "144x144" },
        { url: `${faviconBase}/apple-icon-152x152.png`, sizes: "152x152" },
        { url: `${faviconBase}/apple-icon-180x180.png`, sizes: "180x180" },
      ],
    },
    openGraph: {
      title: messages.meta.title,
      siteName: locale === "pt-br" ? "JoeKyy - Soluções em TI e WEB" : "JoeKyy - IT and WEB Solutions",
      description: messages.meta.description,
      url: "https://joekyy.com.br/",
      locale: locale === "pt-br" ? "pt_BR" : "en_US",
      type: "website",
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      site: "https://joekyy.com.br/",
      creator: "@JoeKyy",
      images: [socialImage],
    },
    other: {
      "theme-color": "#FFC700",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`@/data/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
