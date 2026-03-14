'use client';

import { createContext, useContext } from 'react';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

interface ScrollContextType {
  activeSection: string;
  scrollToSection: (id: string) => void;
  isMobile: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  activeSection: 'hello',
  scrollToSection: () => {},
  isMobile: false,
});

export const useScrollContext = () => useContext(ScrollContext);

export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const { containerRef, activeSection, scrollToSection, isMobile } =
    useHorizontalScroll();

  return (
    <ScrollContext.Provider value={{ activeSection, scrollToSection, isMobile }}>
      <div
        ref={containerRef}
        className={
          isMobile
            ? 'flex flex-col overflow-y-auto'
            : 'flex overflow-x-scroll overflow-y-hidden h-dvh snap-x snap-mandatory scrollbar-hide'
        }
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
