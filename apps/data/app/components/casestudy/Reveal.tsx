'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fade a block in once it crosses the viewport threshold.
 *
 * Inputs: children to reveal, optional className.
 * Outputs: a wrapper that starts invisible and plays `animate-fade-in`.
 */
export default function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const fallback = window.setTimeout(() => setIsVisible(true), 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          window.clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px 0px 0px' },
    );

    observer.observe(element);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}
