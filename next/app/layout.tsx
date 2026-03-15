import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "JoeKyy | Desenvolvimento Web & Soluções Digitais",
  description:
    "JoeKyy — Desenvolvedor web full stack especializado em sites, sistemas e soluções digitais sob medida. Web Developer specializing in websites, systems and digital solutions.",
  keywords: [
    "desenvolvedor web", "web developer", "full stack", "freelance",
    "sites", "sistemas", "Next.js", "WordPress", "UI", "UX", "JoeKyy",
  ],
  authors: [{ name: "JoeKyy", url: "https://joekyy.com.br" }],
  creator: "JoeKyy",
  metadataBase: new URL("https://joekyy.com.br"),
  alternates: {
    canonical: "https://joekyy.com.br",
    languages: {
      "pt-BR": "https://joekyy.com.br/pt-br/",
      "en-US": "https://joekyy.com.br/en-us/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://joekyy.com.br",
    siteName: "JoeKyy",
    title: "JoeKyy | Desenvolvimento Web & Soluções Digitais",
    description:
      "JoeKyy — Desenvolvedor web full stack especializado em sites, sistemas e soluções digitais sob medida.",
    images: [{ url: "https://joekyy.com.br/images/img-social.png", width: 1200, height: 630 }],
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "JoeKyy | Web Developer",
    description: "JoeKyy — Web Developer specializing in websites, systems and digital solutions.",
    images: ["https://joekyy.com.br/images/img-social.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Root layout — lang é sobrescrito pelo [locale]/layout via suppressHydrationWarning
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
