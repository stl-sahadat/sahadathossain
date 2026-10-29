import React, { useState, useEffect, useRef } from 'react';

/**
 * HeroScrollProgress
 * Authentic reverse-engineered implementation of Framer Omnira's Hero Bottom Progress & Navigation.
 * Discovered from Framer DOM: Trailing content with live status, hatched progress track, and animated 4-chevron cascade.
 *
 * Micro-Interactions:
 * - Idle: 4 stacked chevrons cascade down in a repeating wave of light.
 * - Hover: Chevrons illuminate bright yellow/orange, accelerate, and slide downward.
 * - Track: Real-time scroll depth bar with glowing runner dot, zero re-render lag via direct DOM ref.
 */
export function HeroScrollProgress({ targetId = '#works' }) {
  const [isHovered, setIsHovered] = useState(false);
  const fillRef = useRef(null);
  const runnerDotRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      const pct = Math.min(100, Math.max(0, (scrollY / heroHeight) * 100));

      if (fillRef.current) {
        fillRef.current.style.width = isHovered ? '100%' : `${pct}%`;
      }
      if (runnerDotRef.current) {
        runnerDotRef.current.style.opacity = isHovered || pct > 2 ? '1' : '0';
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    let lenisTimer;
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    } else {
      lenisTimer = setInterval(() => {
        if (window.__lenis) {
          window.__lenis.on('scroll', handleScroll);
          clearInterval(lenisTimer);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
      if (lenisTimer) clearInterval(lenisTimer);
    };
  }, [isHovered]);

  const handleScrollDown = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(targetId, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-4 text-xs font-chakra select-none">
      {/* Left: Pulsing Green Live Status matching Framer Omnira 1:1 */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#80B82C] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#80B82C]" />
        </span>
        <span className="text-neutral-400 tracking-wider">
          STATUS: <span className="text-[#80B82C] font-semibold">AVAILABLE FOR HIRE</span>
        </span>
      </div>

      {/* Middle: Interactive Cyber Progress Track */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleScrollDown}
        className="hidden sm:flex flex-grow max-w-sm mx-6 h-6 items-center cursor-pointer group relative"
        title="Scroll or click to explore"
      >
        {/* Track Container */}
        <div className="w-full h-[3px] bg-white/[0.08] relative overflow-hidden rounded-full flex items-center">
          {/* Background Hatch Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(72deg, transparent 0px, transparent 2px, rgba(255, 255, 255, 0.25) 2px, rgba(255, 255, 255, 0.25) 4px)',
            }}
          />

          {/* Active Fill Bar with Smooth GPU-accelerated Progression */}
          <div
            ref={fillRef}
            className="h-full bg-gradient-to-r from-[#0284C7] to-[#00F0FF] relative shadow-[0_0_12px_rgba(0,240,255,0.85)] transition-all duration-300 ease-out will-change-[width]"
            style={{ width: isHovered ? '100%' : '0%' }}
          >
            {/* Glowing Runner Dot at the leading edge */}
            <span
              ref={runnerDotRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#00F0FF] transition-opacity duration-200 opacity-0"
            />
          </div>
        </div>
      </div>

      {/* Right: SCROLL TO EXPLORE Button with Framer Omnira 4-Chevron Cascading Animation */}
      <button
        onClick={handleScrollDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 text-neutral-400 hover:text-white text-xs font-chakra tracking-[0.2em] uppercase transition-colors group flex-shrink-0 cursor-pointer"
      >
        <span className="group-hover:text-[#00F0FF] transition-colors font-medium">
          SCROLL TO EXPLORE
        </span>

        {/* 4 Cascading Down Chevrons matching Framer Omnira SVG & Wave Animation */}
        <div className="relative w-4 h-5 flex flex-col items-center justify-center gap-[2px] transition-transform duration-300 group-hover:translate-y-1">
          {[0, 1, 2, 3].map((i) => (
            <svg
              key={i}
              width="14"
              height="4"
              viewBox="0 0 20 6"
              fill="none"
              className="transition-all duration-300"
              style={{
                animation: `chevronWave 1.4s infinite ease-in-out ${i * 0.2}s`,
              }}
            >
              <path
                d="M 19 1 L 10 5 L 1 1"
                stroke="#00F0FF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-[#38BDF8]"
              />
            </svg>
          ))}
        </div>
      </button>

      <style>{`
        @keyframes chevronWave {
          0%, 100% {
            opacity: 0.25;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(1px);
          }
        }
      `}</style>
    </div>
  );
}
