'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ContactModal } from './ContactModal';
import { CyberCursor } from './CyberCursor';
import { STLLogo } from './CyberIcons';

export function NextClientWrapper({ children }) {
  const pathname = usePathname() || '/';
  const isAdminRoute = pathname.startsWith('/admin');
  const { personalInfo, currentTheme } = usePortfolioData();

  const [isLoading, setIsLoading] = useState(
    typeof window !== 'undefined' &&
    !window.location.search.includes('noload') &&
    !pathname.startsWith('/admin')
  );
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Dynamic Page Title
  useEffect(() => {
    if (pathname === '/') {
      document.title = 'Md. Sahadat Hossain — AI Product Architect & Systems Engineer';
    } else if (pathname === '/about') {
      document.title = 'About & Philosophy — Md. Sahadat Hossain';
    } else if (pathname === '/works') {
      document.title = 'Selected Works & Archive — Md. Sahadat Hossain';
    } else if (pathname === '/gallery') {
      document.title = 'Video Gallery & Media Archive — Md. Sahadat Hossain';
    } else if (pathname === '/contact') {
      document.title = 'Contact & Transmission — Md. Sahadat Hossain';
    } else if (pathname === '/admin') {
      document.title = 'STL Admin Matrix // Production Control Terminal';
    } else {
      document.title = '404 Node Not Found — Md. Sahadat Hossain';
    }
  }, [pathname]);

  // Smooth Lenis Scroll and Preloader
  useEffect(() => {
    if (isAdminRoute) {
      setIsLoading(false);
      if (window.__lenis) {
        window.__lenis.stop();
      }
      window.scrollTo(0, 0);
      return;
    }

    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 180);

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Scroll to top on route change if no target
    const hasScrollTarget = typeof window !== 'undefined' && (window.location.search.includes('scrollTo') || !!window.location.hash);
    if (!hasScrollTarget) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    return () => {
      clearTimeout(loaderTimer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [pathname, isAdminRoute]);

  // Live Digital Clock (Dhaka GMT+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        setCurrentTime(
          now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        );
      } catch (e) {
        setCurrentTime(
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pass handlers down to page children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onOpenContact: () => setContactModalOpen(true),
        currentTime,
      });
    }
    return child;
  });

  if (isAdminRoute) {
    return (
      <div className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00F0FF] selection:text-black font-chakra antialiased">
        {childrenWithProps}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00F0FF] selection:text-black font-chakra antialiased overflow-x-clip">
      <CyberCursor />
      {/* 0. PRELOADER SCREEN */}
      <div
        className={`fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-500 ${
          isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3.5 mb-5">
          <STLLogo className="w-10 h-10" color={currentTheme?.hex || "#00F0FF"} />
          <div className="flex flex-col">
            <span className="font-orbitron font-extrabold text-2xl tracking-[0.25em] text-white">
              {personalInfo?.brandName || 'STL'}<span className="text-[#00F0FF]">.</span>
            </span>
            <span className="text-[10px] font-chakra text-neutral-300 tracking-[0.2em] uppercase mt-0.5 font-semibold">
              {personalInfo?.name || 'MD. SAHADAT HOSSAIN'}
            </span>
          </div>
        </div>
        <div className="w-48 h-[2px] bg-neutral-900 overflow-hidden relative rounded-full">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent w-full animate-pulse" />
        </div>
      </div>

      {/* 1. Atmospheric Film Grain Overlay */}
      <div className="film-grain" />

      {/* Outer Gutters with Continuous Hazard Stripes */}
      <div className="absolute top-0 bottom-0 left-0 w-[calc((100vw-1200px)/2)] hazard-stripes border-r border-white/[0.08] pointer-events-none hidden xl:block z-0" />
      <div className="absolute top-0 bottom-0 right-0 w-[calc((100vw-1200px)/2)] hazard-stripes border-l border-white/[0.08] pointer-events-none hidden xl:block z-0" />

      {/* Main 1200px max width container */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-6">
        {childrenWithProps}
      </div>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
