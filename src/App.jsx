import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import { HomePage } from './views/HomePage';
import { AboutPage } from './views/AboutPage';
import { WorksPage } from './views/WorksPage';
import { GalleryPage } from './views/GalleryPage';
import { ContactPage } from './views/ContactPage';
import { NotFoundPage } from './views/NotFoundPage';
import { AdminPage } from './views/AdminPage';
import { ContactModal } from './components/ContactModal';
import { CyberCursor } from './components/CyberCursor';
import { STLLogo } from './components/CyberIcons';
import { getBasePrefix, resolveAssetUrl } from './lib/assetHelper';

/**
 * ScrollToTop helper: scrolls window to top on every route transition
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dynamic Page Titles matching Md. Sahadat Hossain's identity
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

    if (pathname.startsWith('/admin')) {
      if (window.__lenis) {
        window.__lenis.stop();
      }
      window.scrollTo(0, 0);
      return;
    } else {
      if (window.__lenis) {
        window.__lenis.start();
      }
    }

    const hasScrollTarget = typeof window !== 'undefined' && (window.location.search.includes('scrollTo') || !!window.location.hash);
    if (!hasScrollTarget) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return null;
}

function MainPortfolioApp() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { personalInfo, currentTheme } = usePortfolioData();

  // Preloader State (skip on admin)
  const [isLoading, setIsLoading] = useState(
    typeof window !== 'undefined' &&
    !window.location.search.includes('noload') &&
    !window.location.pathname.startsWith('/admin')
  );

  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Live Digital Clock (Asia/Dhaka GMT+6)
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Set dynamic film grain overlay background
    try {
      const grainUrl = resolveAssetUrl('/assets/img/grain.jpg');
      document.documentElement.style.setProperty('--film-grain-bg', `url("${grainUrl}")`);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }

    // Fade out preloader smoothly
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 180);

    // Live Clock Update in Dhaka timezone
    const updateClock = () => {
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
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Initialize Lenis Smooth Inertia Momentum Scroll
    const lenis = new Lenis({
      duration: 1.25, // Smooth liquid momentum matching Framer
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

    return () => {
      clearTimeout(loaderTimer);
      clearInterval(clockInterval);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [isAdminRoute]);

  // If Admin route, render dedicated Admin layout without outer 1200px gutter constraints
  if (isAdminRoute) {
    return (
      <div className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00F0FF] selection:text-black font-chakra antialiased">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-[#00F0FF] selection:text-black font-chakra antialiased overflow-x-clip">
      {/* ========================================================
          0. PRELOADER SCREEN
          ======================================================== */}
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

      {/* ========================================================
          OUTER GUTTERS WITH CONTINUOUS HAZARD STRIPES
          Full document height, framing the 1200px container
          ======================================================== */}
      <div className="absolute top-0 bottom-0 left-0 w-[calc((100vw-1200px)/2)] hazard-stripes border-r border-white/[0.08] pointer-events-none hidden xl:block z-0" />
      <div className="absolute top-0 bottom-0 right-0 w-[calc((100vw-1200px)/2)] hazard-stripes border-l border-white/[0.08] pointer-events-none hidden xl:block z-0" />

      {/* Main 1200px max width container matching Omnira layout */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 pt-4 sm:pt-6">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
          <Route
            path="/works"
            element={
              <WorksPage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
          <Route
            path="/gallery"
            element={
              <GalleryPage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
          <Route
            path="*"
            element={
              <NotFoundPage
                onOpenContact={() => setContactModalOpen(true)}
                currentTime={currentTime}
              />
            }
          />
        </Routes>
      </div>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const resolvedBasename = getBasePrefix() || '/';

  return (
    <PortfolioDataProvider>
      <CyberCursor />
      <BrowserRouter basename={resolvedBasename}>
        <ScrollToTop />
        <MainPortfolioApp />
      </BrowserRouter>
    </PortfolioDataProvider>
  );
}
