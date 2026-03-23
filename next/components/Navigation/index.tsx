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

function USFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="30" fill="#B22234" />
      <rect y="2.308" width="60" height="2.308" fill="#fff" />
      <rect y="6.923" width="60" height="2.308" fill="#fff" />
      <rect y="11.538" width="60" height="2.308" fill="#fff" />
      <rect y="16.154" width="60" height="2.308" fill="#fff" />
      <rect y="20.769" width="60" height="2.308" fill="#fff" />
      <rect y="25.385" width="60" height="2.308" fill="#fff" />
      <rect width="24" height="16.154" fill="#3C3B6E" />
    </svg>
  );
}

function BrazilFlagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 42"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="42" fill="#009c3b" />
      <polygon points="30,3 57,21 30,39 3,21" fill="#ffdf00" />
      <circle cx="30" cy="21" r="9" fill="#002776" />
      <path
        d="M21.5,21Q30,15.5 38.5,21"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
      />
    </svg>
  );
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
    { id: "impressao-3d", label: t("print3d") },
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
        <div className="flex-[10] relative z-[99999] bg-primary pr-2 py-2">
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
          className={`fixed left-0 w-full bg-primary z-[10] px-[24px] border-b-2 border-light transition-[top] duration-300 overflow-y-auto ${
            menuOpen ? "top-[110px]" : "-top-[1000vh]"
          }`}
          style={{ height: "calc(100dvh - 110px)", paddingTop: "40px" }}
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
                className="flex items-center gap-2 text-sm text-dark/60 hover:text-dark transition-colors"
                aria-label={
                  locale === "pt-br"
                    ? "Switch to English"
                    : "Mudar para Português"
                }
              >
                {locale === "pt-br" ? (
                  <>
                    <USFlagIcon className="w-6 h-4 inline-block" />{" "}
                    <span>English</span>
                  </>
                ) : (
                  <>
                    <BrazilFlagIcon className="w-6 h-4 inline-block" />{" "}
                    <span>Português</span>
                  </>
                )}
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
          className="hover:scale-110 transition-transform"
          aria-label={
            locale === "pt-br" ? "Switch to English" : "Mudar para Português"
          }
          title={locale === "pt-br" ? "English" : "Português"}
        >
          {locale === "pt-br" ? (
            <USFlagIcon className="w-8 h-6" />
          ) : (
            <BrazilFlagIcon className="w-8 h-6" />
          )}
        </button>
      </header>
    </>
  );
}
