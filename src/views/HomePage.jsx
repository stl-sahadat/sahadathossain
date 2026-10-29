import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { resolveAssetUrl } from '../lib/assetHelper';
import {
  OmniraLogo,
  DiscoverIcon,
  DesignIcon,
  BuildIcon,
  RefineIcon,
  DiagonalArrowIcon,
  CornerBadge,
  IconBox,
  QuoteBadge,
  PillTargetIcon,
  PillLayersIcon,
  PillMotionIcon,
  PillImpactIcon,
  WindowLayoutIcon,
  CodeSystemIcon,
  FramerBrandIcon,
  EyeLensIcon,
  ServicesDesignIcon,
  ServicesDevIcon,
  ServicesSystemIcon,
  ServicesCreativeIcon,
  ChatBubbleTechIcon,
  OutlineStarIcon,
  LogoTodoFusion,
  LogoDailyHub,
  LogoFlexify,
  LogoCodify,
  LogoLandify,
  LogoFlowboard,
  LogoNexusAI,
  LogoIdentify,
  PricingSparkleIcon,
  PricingTrophyIcon,
  PricingRocketIcon,
  ButtonCornerMarks,
} from '../components/CyberIcons';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CyberCard, Hero3DCube, ScrollReveal } from '../components/ThreeD';
import { InteractiveHalftoneCanvas } from '../components/InteractiveHalftoneCanvas';
import { HeroScrollProgress } from '../components/HeroScrollProgress';
import { ServicesIsometricGallery } from '../components/ServicesIsometricGallery';
import {
  ChevronDown,
  Plus,
  Minus,
  Check,
  Shield,
  Clock,
  Layers,
  Headphones,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export function HomePage({ onOpenContact, currentTime }) {
  const navigate = useNavigate();
  const {
    personalInfo,
    heroWords,
    projects,
    processPhases,
    aboutCapabilities,
    corePillars,
    services,
    testimonials,
    aiModels,
    clientLogos,
    pricing,
    trustBadges,
    faqs,
    currentTheme,
  } = usePortfolioData();

  // Active rotating hero word
  const [currentWordIdx, setCurrentWordIdx] = useState(0);

  // Process section scroll-driven reveal and progress line tracking
  const processRef = useRef(null);
  const processBarRef = useRef(null);
  const [activePhases, setActivePhases] = useState([false, false, false, false]);

  useEffect(() => {
    // URL Deep-link or test scroll parameter
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scrollTo') || (window.location.hash ? window.location.hash.replace('#', '') : null);
    if (scrollTarget) {
      const scrollNow = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo('#' + scrollTarget, { immediate: true });
        }
        const targetEl = document.getElementById(scrollTarget);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      };
      scrollNow();
      const t1 = setTimeout(scrollNow, 100);
      const t2 = setTimeout(scrollNow, 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  // Services section scroll-driven sticky tab switching
  const servicesRef = useRef(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const isManualServiceSelectRef = useRef(false);
  const manualServiceTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollMetrics = () => {
      const windowHeight = window.innerHeight;

      // On mobile / tablet screens (<1024px), disable trapped sticky pin and reveal all cards cleanly
      if (window.innerWidth < 1024) {
        if (processBarRef.current) processBarRef.current.style.width = '100%';
        setActivePhases((prev) => {
          if (prev[0] && prev[1] && prev[2] && prev[3]) return prev;
          return [true, true, true, true];
        });
        ticking = false;
        return;
      }

      // 1. Process Section Tracking (Sticky Scroll Progression on Desktop)
      if (processRef.current) {
        const el = processRef.current;
        const rect = el.getBoundingClientRect();
        const totalScrollable = Math.max(1, rect.height - windowHeight);
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

        // Directly update DOM ref for 120fps stutter-free scroll
        if (processBarRef.current) {
          processBarRef.current.style.width = `${p * 100}%`;
        }

        // Only trigger React state change when a phase threshold actually transitions
        const p0 = p >= 0.02;
        const p1 = p >= 0.28;
        const p2 = p >= 0.55;
        const p3 = p >= 0.80;
        setActivePhases((prev) => {
          if (prev[0] === p0 && prev[1] === p1 && prev[2] === p2 && prev[3] === p3) {
            return prev;
          }
          return [p0, p1, p2, p3];
        });
      }

      // 2. Services Section Tracking (Sticky Scroll Accordion Switching)
      if (servicesRef.current) {
        const el = servicesRef.current;
        const rect = el.getBoundingClientRect();
        const totalScrollable = Math.max(1, rect.height - windowHeight);
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

        // Only switch tabs via mouse scroll if user hasn't clicked recently
        if (!isManualServiceSelectRef.current && scrolled >= 0 && scrolled <= totalScrollable) {
          let nextIdx = 0;
          if (p < 0.25) nextIdx = 0;
          else if (p < 0.50) nextIdx = 1;
          else if (p < 0.75) nextIdx = 2;
          else nextIdx = 3;

          setActiveServiceIdx((prev) => (prev === nextIdx ? prev : nextIdx));
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollMetrics);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollMetrics();

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
      if (manualServiceTimeoutRef.current) clearTimeout(manualServiceTimeoutRef.current);
    };
  }, []);

  // Smooth scroll handler for VIEW WORKS
  const handleViewWorksClick = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo('#works', {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll handler for EXPLORE PROCESS
  const handleExploreProcessClick = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo('#process', {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Service accordion select handler (both click and scroll aware)
  const handleServiceSelect = (idx) => {
    setActiveServiceIdx(idx);
    isManualServiceSelectRef.current = true;
    if (manualServiceTimeoutRef.current) clearTimeout(manualServiceTimeoutRef.current);
    manualServiceTimeoutRef.current = setTimeout(() => {
      isManualServiceSelectRef.current = false;
    }, 1500);

    if (servicesRef.current) {
      const top = servicesRef.current.offsetTop;
      const totalScrollable = servicesRef.current.offsetHeight - window.innerHeight;
      const targetScroll = top + (idx / 3.2) * totalScrollable;
      if (window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const clientLogoComponents = {
    todofusion: <LogoTodoFusion />,
    dailyhub: <LogoDailyHub />,
    flexify: <LogoFlexify />,
    codify: <LogoCodify />,
    identify: <LogoIdentify />,
    landify: <LogoLandify />,
    flowboard: <LogoFlowboard />,
    nexusai: <LogoNexusAI />,
  };

  // Strictly showcase the 6 featured projects selected from Admin Panel
  const featuredProjects = React.useMemo(() => {
    const selected = projects.filter((p) => p.featured);
    if (selected.length >= 6) {
      return selected.slice(0, 6);
    }
    const unselected = projects.filter((p) => !p.featured);
    return [...selected, ...unselected].slice(0, 6);
  }, [projects]);

  return (
    <div className="w-full">
      {/* ========================================================
          SECTION 1: HERO SECTION (WITH INSIDE CYBER FRAME NAV)
          Matches real_omnira_01_hero.png
          ======================================================== */}
      <section id="home" className="mb-14 sm:mb-20">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[720px] lg:min-h-[780px]"
        >
          {/* Top Navigation Inside Cyber Frame */}
          <Navbar onOpenContact={onOpenContact} />

          {/* Hero Main Body: Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative flex-grow my-auto">
            {/* Left Column: Heading & Content */}
            <div className="lg:col-span-7 flex flex-col items-start z-30 pt-2 lg:pt-4">
              {/* Pre-Badge: MD. SAHADAT HOSSAIN · AI & FULL-STACK DEVELOPER */}
              <CornerBadge variant="cyan" className="mb-6">
                {personalInfo.badge}
              </CornerBadge>

              {/* 3-Line Heading with Authentic 3D Rotating Prism Cube matching Framer Omnira */}
              <h1 className="font-orbitron font-bold text-2xl sm:text-4xl lg:text-[44px] xl:text-[50px] uppercase tracking-tight leading-[1.08] mb-6 text-white flex flex-col items-start max-w-lg">
                <span>{personalInfo.heroHeading.split(' ')[0]}</span>
                <span>{personalInfo.heroHeading.split(' ').slice(1).join(' ')}</span>
                <div className="mt-1 sm:mt-2">
                  <Hero3DCube words={heroWords} />
                </div>
              </h1>

              {/* Bio Description */}
              <p className="font-chakra text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mb-8">
                {personalInfo.heroBio}
              </p>

              {/* CTA Action Buttons: Clean idle state, sleek thin arrow slides in on hover matching Framer Omnira */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                  onClick={handleViewWorksClick}
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] cursor-pointer overflow-hidden"
                >
                  <ButtonCornerMarks />
                  <span className="relative z-10 select-none">
                    {personalInfo.ctaWorksText || "VIEW WORKS"}
                  </span>
                  <span className="relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden text-black">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>

                <button
                  onClick={handleExploreProcessClick}
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-transparent hover:bg-white/[0.06] text-white border border-white/20 hover:border-[#00F0FF]/70 font-chakra font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <ButtonCornerMarks />
                  <span className="relative z-10 transition-colors group-hover:text-[#00F0FF] select-none">
                    {personalInfo.ctaProcessText || "EXPLORE PROCESS"}
                  </span>
                  <span className="relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-y-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden text-[#00F0FF]">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Sahadat Vai's Authentic Halftone Dot Matrix Canvas with Fluid Rubber Ripple Physics */}
            <div className="lg:col-span-5 relative flex justify-end items-center h-[380px] sm:h-[480px] lg:h-[580px]">
              <div className="relative w-full h-full flex items-center justify-center lg:justify-end overflow-hidden rounded-[40px]">
                {/* Subtle base portrait underlay to guarantee 100% facial clarity and recognition */}
                <img
                  src={resolveAssetUrl(personalInfo.heroImage || personalInfo.avatar || "/assets/img/sahadat-hero-transparent.png")}
                  alt={(personalInfo.name || "Md. Sahadat Hossain") + " Portrait"}
                  className="absolute inset-0 w-full h-full object-contain object-bottom pointer-events-none opacity-30 filter contrast-125 brightness-95"
                  onError={(e) => {
                    e.currentTarget.src = resolveAssetUrl("/assets/img/sahadat-hero-transparent.png");
                  }}
                />
                <InteractiveHalftoneCanvas
                  imageSrc={resolveAssetUrl(personalInfo.heroImage || personalInfo.avatar || "/assets/img/sahadat-hero-transparent.png")}
                  dotSpacing={3}
                  dotSize={1.15}
                  contrast={2.2}
                  threshold={16}
                  mouseRadius={280}
                  repulsionStrength={60}
                  returnSpeed={0.20}
                  accentAmount={0.14}
                  primaryColor="rgb(255, 255, 255)"
                  accentColor={`rgb(${currentTheme?.rgb || '0, 240, 255'})`}
                  borderRadius={40}
                  className="w-full h-full relative z-10"
                />
                {/* Seamless edge blend masks */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </div>

          {/* Bottom Inside-Frame Interactive Status & Progress Tracker */}
          <HeroScrollProgress targetId="#works" />
        </CyberFrame>
      </section>

      {/* ========================================================
          SECTION 2: SELECTED WORK (3-COLUMN GRID EXACT MATCH)
          Matches real_omnira_02_works.png
          ======================================================== */}
      <section id="works" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              SELECTED WORK
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              CRAFTED DIGITAL <br />
              <span className="text-[#00F0FF]">
                EXPERIENCES
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
              A curated collection of full-stack platforms, scalable backends, and futuristic design systems shaped with clean architecture.
            </p>
            <button
              onClick={() => {
                navigate('/works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-chakra text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-widest flex items-center gap-2 font-bold group"
            >
              <span>{personalInfo.ctaExploreAllProjectsText || `EXPLORE ALL ${projects.length} PROJECTS`}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 6 Projects in 2-Column / 3-Column Responsive Grid with Smooth Hover Scale Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.08} className="h-full">
              <CyberCard className="h-full rounded-xl">
                <div className="group bg-[#0b0c10] border border-[#242734] hover:border-[#00F0FF]/60 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.14)] flex flex-col justify-between h-full cursor-pointer">
                  {/* Image Container with Chamfered Corners & Smooth Scale Zoom */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <img
                      src={resolveAssetUrl(project.img)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] filter brightness-95 group-hover:brightness-105"
                    />

                    {/* Top Corner Badge with Category */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-chakra font-medium tracking-wider text-neutral-300 uppercase">
                      {project.category}
                    </div>

                    {/* Top Right Live Pill with animated diagonal arrow */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm group-hover:bg-[#00F0FF] group-hover:text-black border border-white/10 group-hover:border-[#00F0FF] px-2.5 py-1 rounded text-[10px] font-chakra font-bold tracking-wider text-white transition-all flex items-center gap-1.5 z-10"
                      >
                        <span>{project.domain}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </a>
                    ) : (
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-[#00F0FF]/30 text-[#00F0FF] px-2.5 py-1 rounded text-[10px] font-mono tracking-wider z-10 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                        <span>SECURE PIPELINE</span>
                      </div>
                    )}

                    {/* Gradient Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Card Meta Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-[#00F0FF] transition-colors mb-1.5">
                        {project.title}
                      </h3>
                      <p className="font-chakra text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                        {project.desc}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                      {project.tech.slice(0, 3).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-chakra text-neutral-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-[10px] font-chakra text-neutral-500">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CyberCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 3: PROCESS (4 PHASES + SCROLL-DRIVEN PINNED REVEAL + METRIC BAR)
          Matches real_omnira_03_process.png (Sticky pinned scroll track)
          ======================================================== */}
      <section id="process" ref={processRef} className="relative border-b border-white/[0.07] min-h-auto lg:min-h-[320vh]">
        {/* Pinned Viewport Container on Desktop · Clean Normal Scroll on Mobile */}
        <div className="relative lg:sticky lg:top-0 min-h-auto lg:min-h-screen flex flex-col justify-center py-8 sm:py-12 z-10 overflow-visible">
          <div className="w-full">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <CornerBadge variant="white" className="mb-3">
                  PROCESS
                </CornerBadge>
                <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                  FROM CONCEPT <br />
                  <span className="text-[#00F0FF]">
                    TO LAUNCH
                  </span>
                </h2>
              </div>
              <p className="font-chakra text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed">
                A structured 4-phase methodology transforming complex product visions into production-ready software with 10x velocity and design precision.
              </p>
            </div>

            {/* Scroll-Driven Connecting Progress Line Across the 4 Phases (Zero-lag smooth runner with 4 milestone dots) */}
            <div className="hidden lg:block relative w-full mb-8 px-4">
              <div className="w-full h-[2px] bg-white/[0.08] relative overflow-visible rounded-full">
                {/* 4 Milestone Dots */}
                {[
                  { pct: 12.5, idx: 0 },
                  { pct: 37.5, idx: 1 },
                  { pct: 62.5, idx: 2 },
                  { pct: 87.5, idx: 3 },
                ].map(({ pct, idx }) => {
                  const isReached = activePhases[idx];
                  return (
                    <div
                      key={idx}
                      style={{ left: `${pct}%` }}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-10 transition-all duration-300 border ${
                        isReached
                          ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_10px_#00F0FF] scale-125'
                          : 'bg-black border-white/20'
                      }`}
                    />
                  );
                })}

                {/* Smooth Non-Lagging Active Progress Bar (Direct GPU Ref) */}
                <div
                  ref={processBarRef}
                  className="h-full bg-gradient-to-r from-[#0284C7] via-[#00F0FF] to-[#38BDF8] shadow-[0_0_12px_rgba(0,240,255,0.8)] relative will-change-[width]"
                  style={{ width: '0%' }}
                >
                  {/* Glowing Runner Dot at the leading edge of progress */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#00F0FF]" />
                </div>
              </div>
            </div>

            {/* 4 Phase Cards: Legible & Visible Before Scroll, Sequentially Illuminated on Scroll */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {processPhases.map((phase, idx) => {
                const isRevealed = activePhases[idx];
                return (
                  <div
                    key={phase.phase}
                    id={`content-${idx + 1}`}
                    className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-400 ease-out h-full border select-none ${
                      isRevealed
                        ? 'opacity-100 bg-[#12141c] border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.22)] ring-1 ring-[#00F0FF]/40 scale-[1.01]'
                        : 'opacity-85 bg-[#0c0d12] border-[#242734] hover:border-white/20 shadow-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span
                          className={`font-orbitron font-extrabold text-2xl transition-colors duration-300 ${
                            isRevealed ? 'text-[#00F0FF]' : 'text-neutral-500'
                          }`}
                        >
                          {phase.phase}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isRevealed
                              ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-110'
                              : 'bg-white/5 border border-white/10 text-neutral-400'
                          }`}
                        >
                          {phase.phase === '01' && <DiscoverIcon />}
                          {phase.phase === '02' && <DesignIcon />}
                          {phase.phase === '03' && <BuildIcon />}
                          {phase.phase === '04' && <RefineIcon />}
                        </div>
                      </div>

                      <h3
                        className={`font-orbitron font-bold text-base uppercase mb-2 transition-colors duration-300 ${
                          isRevealed ? 'text-white' : 'text-neutral-200'
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p
                        className={`font-chakra text-xs leading-relaxed transition-colors duration-300 ${
                          isRevealed ? 'text-neutral-300' : 'text-neutral-400'
                        }`}
                      >
                        {phase.desc}
                      </p>
                    </div>

                    <div
                      className={`mt-6 pt-4 border-t border-white/5 text-[11px] font-chakra uppercase tracking-wider flex items-center justify-between transition-colors duration-300 ${
                        isRevealed ? 'text-[#00F0FF] font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      <span>{phase.phaseLabel || `PHASES ${phase.phase}`}</span>
                      {isRevealed && <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Metric Ticker */}
            <div className="bg-[#08090d] border border-white/[0.08] rounded-xl p-5 flex flex-wrap items-center justify-around gap-6 text-xs font-chakra">
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-lg text-[#00F0FF]">4</span>
                <span className="text-neutral-300 uppercase tracking-wider font-semibold">STRUCTURED PHASES</span>
              </div>
              <span className="hidden md:block text-neutral-700">|</span>
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-lg text-[#00F0FF]">10x</span>
                <span className="text-neutral-300 uppercase tracking-wider font-semibold">VELOCITY (AI-ACCELERATED)</span>
              </div>
              <span className="hidden md:block text-neutral-700">|</span>
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-lg text-[#00F0FF]">95+</span>
                <span className="text-neutral-300 uppercase tracking-wider font-semibold">PAGESPEED PERFORMANCE</span>
              </div>
              <span className="hidden md:block text-neutral-700">|</span>
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-bold text-lg text-[#00F0FF]">100%</span>
                <span className="text-neutral-300 uppercase tracking-wider font-semibold">RESPONSIVE PRECISION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: ABOUT ME (2-CARD SPLIT LAYOUT)
          Matches real_omnira_04_about.png
          ======================================================== */}
      <section id="about" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              ABOUT ME
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              SHARP DESIGN <br />
              <span className="text-[#00F0FF]">
                CLEAN FLOW
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
              {personalInfo.aboutBio}
            </p>
            <button
              onClick={() => {
                navigate('/about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-chakra text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-widest flex items-center gap-2 font-bold group"
            >
              <span>READ FULL STORY & PHILOSOPHY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 2-Card Layout: Left Monolithic Card + Right 4-Card Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Status, Role, 3 Big Stats, 4 Pillars, Bottom Badge */}
          <ScrollReveal direction="left" className="lg:col-span-6 h-full">
            <CyberCard className="h-full rounded-2xl">
              <div className="bg-[#0c0d12] border border-[#242734] rounded-2xl p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden h-full">
                <div>
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mb-10 sm:mb-14">
                    <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
                    <span className="text-neutral-400 text-xs font-chakra tracking-widest uppercase">
                      STATUS: <span className="text-[#80B82C] font-semibold">{personalInfo.aboutStatus}</span>
                    </span>
                  </div>

                  {/* 3 Big Stats Row - Dynamic & Configurable */}
                  <div className="grid grid-cols-3 gap-4 pb-8 mb-8 border-b border-white/[0.07]">
                    <div>
                      <div className="font-orbitron font-bold text-3xl sm:text-4xl text-[#00F0FF]">
                        {personalInfo.experienceDesignYears || '5+'}
                      </div>
                      <div className="text-[11px] font-chakra text-neutral-300 uppercase tracking-widest mt-1 font-semibold">
                        {personalInfo.experienceDesignLabel || 'YRS DESIGN'}
                      </div>
                    </div>
                    <div>
                      <div className="font-orbitron font-bold text-3xl sm:text-4xl text-[#00F0FF]">
                        {personalInfo.experienceDevYears || '1+'}
                      </div>
                      <div className="text-[11px] font-chakra text-neutral-300 uppercase tracking-widest mt-1 font-semibold">
                        {personalInfo.experienceDevLabel || 'YR WEB DEV'}
                      </div>
                    </div>
                    <div>
                      <div className="font-orbitron font-bold text-3xl sm:text-4xl text-[#00F0FF]">
                        {projects.length}<span className="text-white/60 text-xl sm:text-2xl">+</span>
                      </div>
                      <div className="text-[11px] font-chakra text-neutral-300 uppercase tracking-widest mt-1 font-semibold">
                        {personalInfo.experienceProjectsLabel || 'PROJECTS'}
                      </div>
                    </div>
                  </div>

                  {/* 4 Brand Pillars / Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                    {(corePillars && corePillars.length ? corePillars : [
                      { label: 'REVERSE ENG' },
                      { label: 'UI/UX DESIGN' },
                      { label: 'FRONTEND' },
                      { label: 'WITH AI' },
                    ]).map((pillar, pIdx) => (
                      <span
                        key={pillar.id || pIdx}
                        className={`px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-center text-[11px] font-chakra uppercase tracking-wider font-semibold ${
                          pIdx === 0 || pIdx === 3 ? 'text-[#00F0FF]' : 'text-neutral-300'
                        }`}
                      >
                        {pillar.label || pillar.title || pillar.name || (typeof pillar === 'string' ? pillar : '')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Signature Line */}
                <div className="pt-6 border-t border-white/[0.07] flex items-center justify-between">
                  <div>
                    <p className="font-chakra text-xs text-neutral-400">
                      {personalInfo.signatureSubtext || "Engineered for bold, scalable software products."}
                    </p>
                    <p className="font-orbitron font-bold text-sm text-[#00F0FF] tracking-wider mt-1">
                      — {personalInfo.signatureText || (personalInfo.name || "MD. SAHADAT HOSSAIN").toUpperCase()}
                    </p>
                  </div>
                  <div className="w-16 h-4 hazard-stripes opacity-40" />
                </div>
              </div>
            </CyberCard>
          </ScrollReveal>

          {/* Right Column: 4 Numbered Capability Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              {aboutCapabilities.map((cap, cIdx) => (
                <ScrollReveal key={cap.number} delay={cIdx * 0.08} direction="right">
                  <CyberCard className="rounded-xl">
                    <div className="bg-[#0c0d12] border border-[#242734] hover:border-[#00F0FF]/40 rounded-xl p-5 flex items-center justify-between gap-4 transition-all">
                      <div className="flex items-center gap-4">
                        <IconBox isOrange={true}>
                          {cap.iconType === 'window' && <WindowLayoutIcon />}
                          {cap.iconType === 'code' && <CodeSystemIcon />}
                          {cap.iconType === 'framer' && <FramerBrandIcon />}
                          {cap.iconType === 'visual' && <EyeLensIcon />}
                        </IconBox>

                        <div>
                          <h4 className="font-orbitron font-bold text-sm text-white uppercase">
                            {cap.title}
                          </h4>
                          <p className="font-chakra text-xs text-neutral-400 mt-0.5">
                            {cap.desc}
                          </p>
                        </div>
                      </div>

                      <span className="font-orbitron text-xs text-neutral-500 font-bold">
                        {cap.number}
                      </span>
                    </div>
                  </CyberCard>
                </ScrollReveal>
              ))}
            </div>

            {/* Bottom Technical Hazard Bar */}
            <div className="p-4 bg-[#08090d] border border-white/[0.08] rounded-xl flex items-center justify-between gap-3 text-xs font-chakra text-neutral-300 overflow-hidden">
              <div className="w-10 h-3 hazard-stripes opacity-40 flex-shrink-0" />
              <div className="flex items-center gap-2 tracking-widest uppercase text-[11px] font-semibold text-center whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80B82C] animate-pulse" />
                <span>WORKING WORLDWIDE WITH FOUNDERS, TEAMS & DIGITAL STUDIOS</span>
              </div>
              <div className="w-10 h-3 hazard-stripes opacity-40 flex-shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: SERVICES (ACCORDION + 3D ISOMETRIC GRAPHIC)
          Matches real_omnira_05_services.png (Sticky pinned scroll track)
          ======================================================== */}
      <section id="services" ref={servicesRef} className="relative border-b border-white/[0.07] min-h-auto lg:min-h-[320vh]">
        {/* Pinned Viewport Container on Desktop · Clean Normal Scroll on Mobile */}
        <div className="relative lg:sticky lg:top-0 min-h-auto lg:min-h-screen flex flex-col justify-center py-8 sm:py-12 z-10 overflow-visible">
          <div className="w-full">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <CornerBadge variant="white" className="mb-3">
                  CORE SERVICES
                </CornerBadge>
                <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                  DIGITAL SYSTEMS FOR <br />
                  <span className="text-[#00F0FF]">
                    BOLD BRANDS
                  </span>
                </h2>
              </div>
              <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
                High-performance mobile applications, enterprise SaaS platforms, high-converting e-commerce engines, and 1:1 AI reverse engineering.
              </p>
            </div>

            {/* 2-Column Grid: Left Accordion Tabs + Right 3D Isometric Interactive Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 4 Accordion Service Panels */}
              <div className="lg:col-span-7 space-y-4">
                {services.map((svc, idx) => {
                  const isActive = activeServiceIdx === idx;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => handleServiceSelect(idx)}
                      className={`cursor-pointer rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#10121a] border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                          : 'bg-[#0a0c10] border-[#242734] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF]'
                                : 'bg-white/5 border-white/10 text-neutral-400'
                            }`}
                          >
                            {idx === 0 && <ServicesDevIcon />}
                            {idx === 1 && <ServicesDesignIcon />}
                            {idx === 2 && <ServicesSystemIcon />}
                            {idx === 3 && <ServicesCreativeIcon />}
                          </span>
                          <h3 className="font-orbitron font-bold text-base text-white uppercase">
                            {svc.title}
                          </h3>
                        </div>
                        <span className={`font-orbitron text-xs font-bold transition-colors ${isActive ? 'text-[#00F0FF]' : 'text-neutral-500'}`}>
                          0{idx + 1}
                        </span>
                      </div>

                      <p className="font-chakra text-xs text-neutral-400 mb-3 pl-10">
                        {svc.desc}
                      </p>

                      {/* Bullet points expanded when active */}
                      {isActive && (
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 pl-10 animate-fadeIn">
                          {svc.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs font-chakra text-neutral-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: 3D Interactive Isometric System Gallery (Synchronized with Active Service Tab) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <ServicesIsometricGallery
                  activeIdx={activeServiceIdx}
                  onSelect={handleServiceSelect}
                  services={services}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: CLIENT REVIEWS & AI MODEL ARSENAL
          Matches real_omnira_06_reviews.png (Zero Fake Reviews · Transparent Slots)
          ======================================================== */}
      <section id="reviews" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="cyan" className="mb-3">
              RADICAL TRANSPARENCY · 100% VERIFIED ONLY
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              CLIENT REVIEWS & <br />
              <span className="text-[#00F0FF]">
                TRUST PIPELINE
              </span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
            No fabricated testimonials or fake reviews. Review slots are kept clean and will be published exclusively upon live client deliveries.
          </p>
        </div>

        {/* Dynamic Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials && testimonials.length > 0 ? (
            <>
              {testimonials.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="rounded-xl border border-white/10 hover:border-[#00F0FF]/50 bg-[#090a0f] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                        {item.project ? `// ${item.project}` : 'VERIFIED CLIENT'}
                      </span>
                      <div className="flex items-center text-[#FFD700]">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <span key={i} className="text-xs">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="font-chakra text-xs text-neutral-300 italic leading-relaxed mb-6">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={resolveAssetUrl(item.avatar || '/assets/img/sahadat-avatar.jpg')}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                        onError={(e) => {
                          e.currentTarget.src = resolveAssetUrl('/assets/img/sahadat-avatar.jpg');
                        }}
                      />
                      <div>
                        <h4 className="font-orbitron font-bold text-xs text-white uppercase">
                          {item.name}
                        </h4>
                        <p className="font-chakra text-[10px] text-neutral-400">
                          {item.role} {item.company && `· ${item.company}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-[#00F0FF] uppercase tracking-wider px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20 font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>
              ))}
              {testimonials.length < 3 &&
                [...Array(3 - testimonials.length)].map((_, idx) => {
                  const slotNum = testimonials.length + idx + 1;
                  return (
                    <div
                      key={'slot-' + slotNum}
                      className="rounded-xl border border-dashed border-white/15 hover:border-[#00F0FF]/40 bg-[#090a0f] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 group select-none"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                            SLOT 0{slotNum} // VERIFIED
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                            AWAITING REVIEW
                          </span>
                        </div>
                        <p className="font-chakra text-xs text-neutral-400 italic leading-relaxed mb-6">
                          "This review slot is open for upcoming client projects. Zero fake reviews, zero paid feedback."
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-neutral-500 font-mono">
                            #0{slotNum}
                          </div>
                          <span className="font-chakra text-xs text-neutral-300 font-semibold">
                            Client Partner #{slotNum}
                          </span>
                        </div>
                        <button
                          onClick={onOpenContact}
                          className="text-[10px] font-chakra text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-wider font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                        >
                          <span>CLAIM SPOT</span>
                          <span>↗</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </>
          ) : (
            [1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="rounded-xl border border-dashed border-white/15 hover:border-[#00F0FF]/40 bg-[#090a0f] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 group select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                      SLOT 0{slot} // VERIFIED
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      AWAITING REVIEW
                    </span>
                  </div>
                  <p className="font-chakra text-xs text-neutral-400 italic leading-relaxed mb-6">
                    "This review slot is open for upcoming client projects. Zero fake reviews, zero paid feedback."
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-neutral-500 font-mono">
                      #0{slot}
                    </div>
                    <span className="font-chakra text-xs text-neutral-300 font-semibold">
                      Client Partner #{slot}
                    </span>
                  </div>
                  <button
                    onClick={onOpenContact}
                    className="text-[10px] font-chakra text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-wider font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>CLAIM SPOT</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Infinite AI Models & Tech Engines Marquee Strip */}
        <div className="relative w-full overflow-hidden border-y border-white/[0.08] py-4 bg-[#050608]">
          <div className="flex items-center gap-4 sm:gap-6 animate-marquee whitespace-nowrap">
            {aiModels.concat(aiModels).map((model, mIdx) => (
              <div
                key={mIdx}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#00F0FF]/50 transition-all select-none flex-shrink-0 group"
              >
                <span className="text-[#00F0FF] text-xs font-mono group-hover:scale-125 transition-transform">
                  {model.symbol}
                </span>
                <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors">
                  {model.name}
                </span>
                <span className="text-[10px] font-chakra text-neutral-400 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/5">
                  {model.provider}
                </span>
                <span className="text-[9px] font-mono text-[#00F0FF]/70 uppercase tracking-wider">
                  // {model.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: PRICING (MATCHING FRAMER OMNIRA 1:1)
          Matches media_1793149142373_5489fb22.png
          ======================================================== */}
      <section id="pricing" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              BUILT FOR EVERY <br />
              <span className="text-[#00F0FF]">
                PROJECT STAGE
              </span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed">
            Choose a focused package for sharp interfaces, polished Framer builds, and launch-ready digital experiences.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {pricing.map((plan, idx) => (
            <ScrollReveal key={plan.name} delay={idx * 0.1} className="h-full">
              <CyberCard className="h-full rounded-2xl">
                <div
                  className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative h-full ${
                    plan.featured
                      ? 'bg-[#090d14] border-2 border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/50'
                      : 'bg-[#090a0f] border border-[#20222e] hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Top Row: Cyber Box Icon + Plan Title & Subtitle */}
                    <div className="flex items-center gap-3.5 mb-6">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          plan.featured
                            ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF] shadow-[0_0_15px_rgba(255,152,0,0.3)]'
                            : 'bg-white/[0.04] border border-white/10 text-white/90'
                        }`}
                      >
                        {plan.icon === 'sparkle' && (
                          <PricingSparkleIcon className="w-5 h-5" color={plan.featured ? '#00F0FF' : '#ffffff'} />
                        )}
                        {plan.icon === 'trophy' && (
                          <PricingTrophyIcon className="w-5 h-5" color="#00F0FF" />
                        )}
                        {plan.icon === 'rocket' && (
                          <PricingRocketIcon className="w-5 h-5" color="#ffffff" />
                        )}
                      </div>

                      <div>
                        <h3
                          className={`font-orbitron font-bold text-lg sm:text-xl uppercase tracking-wider ${
                            plan.featured ? 'text-[#00F0FF]' : 'text-white'
                          }`}
                        >
                          {plan.name}
                        </h3>
                        <p className="font-chakra text-xs text-neutral-400 mt-0.5">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1.5 my-6">
                      <span className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white">
                        {plan.price}
                      </span>
                      <span className="font-chakra text-xs text-neutral-500 font-normal tracking-wider uppercase">
                        {plan.currency || 'USD'}
                      </span>
                    </div>

                    {/* Features List with Thin Checkmarks */}
                    <div className="space-y-3.5 mb-8 pt-6 border-t border-white/[0.08]">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm font-chakra text-neutral-300">
                          <span className="text-neutral-500 text-xs font-mono">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: GET STARTED with Framer Slide Arrow Interaction & 4 Corner Reticle Marks */}
                  <button
                    onClick={onOpenContact ? onOpenContact : () => navigate('/contact')}
                    className={`group w-full py-3.5 px-6 font-chakra font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center justify-center relative overflow-hidden ${
                      plan.featured
                        ? 'bg-[#00F0FF] hover:bg-[#38BDF8] text-black shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)]'
                        : 'bg-[#121319] hover:bg-[#1a1c24] text-neutral-200 hover:text-white border border-white/[0.12] hover:border-white/30'
                    }`}
                  >
                    <ButtonCornerMarks />
                    <span className="relative z-10 select-none">GET STARTED</span>
                    <span className={`relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden ${plan.featured ? 'text-black' : 'text-[#00F0FF]'}`}>
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </button>
                </div>
              </CyberCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 4 Trust Badges Container matching Framer Omnira 1:1 */}
        <div className="bg-[#090a0f] border border-white/[0.08] rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, bIdx) => (
            <div key={bIdx} className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-300 flex-shrink-0">
                {badge.icon === 'shield' && <Shield className="w-4 h-4" />}
                {badge.icon === 'clock' && <Clock className="w-4 h-4" />}
                {badge.icon === 'layers' && <Layers className="w-4 h-4" />}
                {badge.icon === 'headphones' && <Headphones className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
                  {badge.title}
                </h4>
                <p className="font-chakra text-[11px] text-neutral-400 mt-0.5">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 8: FAQS (8 CHAMFERED ACCORDIONS + QUERY CARD)
          Matches real_omnira_08_faqs.png
          ======================================================== */}
      <section id="faqs" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              CLEAR ANSWERS
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              FREQUENTLY <br />
              <span className="text-[#00F0FF]">
                ASKED QUESTIONS
              </span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
            Everything you need to know about the architecture process, tech stack, timeline, and deployment guarantees.
          </p>
        </div>

        {/* 2-Column Grid: Left Accordion Rows + Right Query Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 Accordion Rows */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0b0c10] border border-[#242734] hover:border-[#00F0FF]/40 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-orbitron font-bold text-sm text-white uppercase cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] flex-shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs font-chakra text-neutral-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Query Box */}
          <div className="lg:col-span-4">
            <CyberCard className="rounded-2xl">
              <div className="bg-[#0d0e14] border border-[#242734] rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <CornerBadge variant="cyan" className="mb-4">
                    SUPPORT DESK
                  </CornerBadge>
                  <h3 className="font-orbitron font-bold text-xl text-white uppercase mb-2">
                    STILL HAVE QUESTIONS?
                  </h3>
                  <p className="font-chakra text-xs text-neutral-400 leading-relaxed mb-6">
                    Have a specialized system requirement, high-traffic migration, or custom inquiry? Let's discuss it directly.
                  </p>
                </div>

                <button
                  onClick={onOpenContact ? onOpenContact : () => navigate('/contact')}
                  className="group relative w-full py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <ButtonCornerMarks />
                  <span className="relative z-10 select-none">CONTACT ARCHITECT</span>
                  <span className="relative z-10 inline-flex items-center justify-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out overflow-hidden text-black">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
            </CyberCard>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: CONTACT & FOOTER (MONOLITHIC CYBER CARD)
          Matches real_omnira_09_contact_footer.png
          ======================================================== */}
      <Footer
        personalInfo={personalInfo}
        currentTime={currentTime}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}
