"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const MOBILE_BREAKPOINT = 1260;
const OBSERVER_THRESHOLD = 0.2;

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("hello");
  const [isMobile, setIsMobile] = useState(false);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      if (isMobile) {
        // Vertical scroll on mobile
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Horizontal scroll on desktop
        // element.offsetLeft is relative to body; container.scrollTo at that
        // value correctly lands the section at viewport x=0 (behind the fixed nav)
        const container = containerRef.current;
        if (container) {
          container.scrollTo({ left: element.offsetLeft, behavior: "smooth" });
        }
      }

      setActiveSection(sectionId);
      if (typeof window !== "undefined") {
        history.pushState(null, "", `#${sectionId}`);
      }
    },
    [isMobile],
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Wheel → horizontal scroll on desktop
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta =
        Math.sign(event.deltaY) * Math.min(Math.abs(event.deltaY), 200);
      container.scrollBy({ left: delta });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          container.scrollBy({ left: -window.innerWidth });
          break;
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          container.scrollBy({ left: window.innerWidth });
          break;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            if (typeof window !== "undefined") {
              history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      {
        root: isMobile ? null : container,
        rootMargin: "0px",
        threshold: OBSERVER_THRESHOLD,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMobile]);

  // Handle initial hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => scrollToSection(hash), 150);
    }
  }, [scrollToSection]);

  return {
    containerRef,
    activeSection,
    scrollToSection,
    isMobile,
  };
}
