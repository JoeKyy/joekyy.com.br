'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const MOBILE_BREAKPOINT = 1260;
const SCROLL_AMOUNT = 15;
const OBSERVER_THRESHOLD = 0.2;

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('hello');
  const [isMobile, setIsMobile] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActiveSection(sectionId);
      if (typeof window !== 'undefined') {
        history.pushState(null, '', `#${sectionId}`);
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      container.scrollBy({
        left: event.deltaY < 0 ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          container.scrollBy({ left: -10 });
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          container.scrollBy({ left: 10 });
          break;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            if (typeof window !== 'undefined') {
              history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      {
        root: isMobile ? null : container,
        rootMargin: '0px',
        threshold: OBSERVER_THRESHOLD,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMobile]);

  // Handle initial hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => scrollToSection(hash), 100);
    }
  }, [scrollToSection]);

  return {
    containerRef,
    activeSection,
    scrollToSection,
    isMobile,
  };
}
