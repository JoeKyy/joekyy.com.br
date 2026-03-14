"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useScrollContext } from "@/components/HorizontalScroll";
import Image from "next/image";
import type { Locale } from "@/types";

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations("nav");
  const { activeSection, scrollToSection } = useScrollContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: "sobre", label: t("about") },
    { id: "portifolio", label: t("portfolio") },
    { id: "clientes", label: t("clients") },
    { id: "contato", label: t("contact") },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  const switchLocale = () => {
    const newLocale = locale === "pt-br" ? "en-us" : "pt-br";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const logoSrc =
    locale === "en-us" ? "/images/logo-en-us.png" : "/images/logo.png";

  return (
    <>
      {/* ── Mobile header (< lg) ── */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-[110px] bg-primary z-[10] border-b-[3px] border-dark flex items-center px-4">
        {/* Logo — col-10 equivalent */}
        <div className="flex-[10]">
          <button onClick={() => handleNavClick("hello")} aria-label="Início">
            <Image src={logoSrc} alt="JoeKyy" width={80} height={55} />
          </button>
        </div>

        {/* Hamburger — col-2 equivalent */}
        <div className="flex-[2] flex justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[99999] p-2 border-0"
            aria-label="Menu"
          >
            {/* Hamburger squeeze animation */}
            <span className="block w-6 h-4 relative">
              <span
                className={`absolute block w-6 h-[2px] bg-dark transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute block w-6 h-[2px] bg-dark top-[7px] transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block w-6 h-[2px] bg-dark transition-all duration-300 ${
                  menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile nav overlay — always rendered, slides via top position */}
        <nav
          className={`fixed left-0 w-full h-dvh bg-primary z-[10] px-[24px] border-b-2 border-light transition-[top] duration-300 ${
            menuOpen ? "top-0" : "-top-[1000vh]"
          }`}
          style={{ paddingTop: "168px" }}
        >
          <ul className="block">
            {navItems.map((item) => (
              <li key={item.id} className="inline-block w-full mb-[32px]">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base transition-colors ${
                    activeSection === item.id
                      ? "font-bold"
                      : "font-normal hover:font-bold"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="inline-block w-full mb-[32px]">
              <button
                onClick={switchLocale}
                className="text-sm text-dark/60 hover:text-dark transition-colors"
              >
                {locale === "pt-br" ? "English" : "Português"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* ── Desktop sidebar (≥ lg) ── */}
      <header className="hidden lg:flex fixed top-0 left-0 w-[105px] h-dvh bg-primary z-[10] border-r-[3px] border-dark flex-col items-center py-4">
        <button
          onClick={() => handleNavClick("hello")}
          className="relative z-[11] mb-4"
          aria-label="Início"
        >
          <Image src={logoSrc} alt="JoeKyy" width={70} height={55} />
        </button>

        <nav className="flex-1 flex items-center">
          <ul
            className="flex flex-col justify-around"
            style={{ height: "80dvh" }}
          >
            {navItems.map((item) => (
              <li key={item.id} className="-rotate-90">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`whitespace-nowrap text-sm tracking-wider transition-colors ${
                    activeSection === item.id
                      ? "font-bold"
                      : "font-normal hover:font-bold"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={switchLocale}
          className="text-xs text-dark/60 hover:text-dark transition-colors"
        >
          {locale === "pt-br" ? "EN" : "PT"}
        </button>
      </header>
    </>
  );
}
