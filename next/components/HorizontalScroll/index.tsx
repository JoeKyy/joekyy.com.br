"use client";

import { createContext, useContext, useRef } from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface ScrollContextType {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeSection: string;
  scrollToSection: (id: string) => void;
  isMobile: boolean;
}

const ScrollContext = createContext<ScrollContextType>({
  containerRef: { current: null },
  activeSection: "hello",
  scrollToSection: () => {},
  isMobile: false,
});

export const useScrollContext = () => useContext(ScrollContext);

/** Wrap your entire page layout — Navigation + main content */
export function HorizontalScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { containerRef, activeSection, scrollToSection, isMobile } =
    useHorizontalScroll();

  return (
    <ScrollContext.Provider
      value={{ containerRef, activeSection, scrollToSection, isMobile }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

/** The actual scrollable container — put your sections here */
export function HorizontalScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { containerRef, isMobile } = useScrollContext();

  return (
    <div
      ref={containerRef}
      className={
        isMobile
          ? "flex flex-col overflow-y-auto"
          : "flex overflow-x-scroll overflow-y-hidden h-dvh scrollbar-hide"
      }
    >
      {children}
    </div>
  );
}
