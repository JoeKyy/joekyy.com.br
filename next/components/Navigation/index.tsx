'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useScrollContext } from '@/components/HorizontalScroll';
import Image from 'next/image';
import type { Locale } from '@/types';

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const { activeSection, scrollToSection, isMobile } = useScrollContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'sobre', label: t('about') },
    { id: 'portifolio', label: t('portfolio') },
    { id: 'clientes', label: t('clients') },
    { id: 'contato', label: t('contact') },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  const switchLocale = () => {
    const newLocale = locale === 'pt-br' ? 'en-us' : 'pt-br';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const logoSrc = locale === 'en-us' ? '/images/logo-en-us.png' : '/images/logo.png';

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 w-full h-[110px] bg-primary z-10 border-b-[3px] border-dark flex items-center justify-between px-4">
        <button
          onClick={() => handleNavClick('hello')}
          className="relative z-[11]"
        >
          <Image src={logoSrc} alt="JoeKyy" width={70} height={70} />
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-6 h-4 flex flex-col justify-between z-[99999]"
          aria-label="Menu"
        >
          <span
            className={`block w-full h-[2px] bg-dark transition-transform duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-dark transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-dark transition-transform duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>

        {menuOpen && (
          <nav className="fixed inset-0 z-10 bg-primary pt-[168px] px-6 border-b-2 border-light">
            <ul className="block">
              {navItems.map((item) => (
                <li key={item.id} className="block w-full mb-8">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`text-base transition-colors ${
                      activeSection === item.id
                        ? 'font-bold text-dark'
                        : 'text-dark hover:font-bold'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="block w-full mb-8">
                <button
                  onClick={switchLocale}
                  className="text-sm text-dark/60 hover:text-dark transition-colors"
                >
                  {locale === 'pt-br' ? 'English' : 'Português'}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-[105px] h-dvh bg-primary z-10 border-r-[3px] border-dark flex flex-col items-center py-4">
      <button
        onClick={() => handleNavClick('hello')}
        className="relative z-[11] mb-4"
      >
        <Image src={logoSrc} alt="JoeKyy" width={70} height={70} />
      </button>

      <nav className="flex-1 flex items-center">
        <ul className="flex flex-col justify-around h-[80dvh]">
          {navItems.map((item) => (
            <li key={item.id} className="-rotate-90">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap text-sm tracking-wider transition-colors ${
                  activeSection === item.id
                    ? 'font-bold text-dark'
                    : 'text-dark hover:font-bold'
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
        {locale === 'pt-br' ? 'EN' : 'PT'}
      </button>
    </header>
  );
}
