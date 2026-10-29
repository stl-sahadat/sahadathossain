import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { resolveAssetUrl } from '../lib/assetHelper';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RollingCounter } from '../components/RollingCounter';
import {
  CornerBadge,
  DiscoverIcon,
  DesignIcon,
  BuildIcon,
  RefineIcon,
  EyeLensIcon,
} from '../components/CyberIcons';
import { CyberCard, ScrollReveal } from '../components/ThreeD';
import {
  User,
  Crown,
  Target,
  Star,
  Shield,
  MapPin,
  Settings,
  Check,
  ArrowRight,
  Code2,
  Layers,
  Infinity as InfinityIcon,
  Palette,
  Play,
  Box,
  Compass,
  Cpu,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export function AboutPage({ onOpenContact, currentTime }) {
  const navigate = useNavigate();
  const {
    personalInfo,
    timeline,
    services,
    testimonials,
    aiModels,
    projects,
    techStackCategories,
    atAGlance,
    corePillars,
    aboutCapabilities,
    currentTheme,
  } = usePortfolioData();

  // Helper to extract focus & tools from atAGlance array or personalInfo
  const resolvedFocus = React.useMemo(() => {
    if (personalInfo?.focus) return personalInfo.focus;
    if (Array.isArray(atAGlance)) {
      const item = atAGlance.find((i) => i.label?.toLowerCase() === 'focus');
      if (item?.value) return item.value;
    }
    return atAGlance?.focus || 'Autonomous AI Agents · FastMCP · Full-Stack Web · Cloud Infra';
  }, [personalInfo?.focus, atAGlance]);

  const resolvedTools = React.useMemo(() => {
    if (personalInfo?.tools) return personalInfo.tools;
    if (Array.isArray(atAGlance)) {
      const item = atAGlance.find((i) => i.label?.toLowerCase() === 'tools' || i.label?.toLowerCase() === 'core stack');
      if (item?.value) return item.value;
    }
    return atAGlance?.tools || 'Figma, Framer, React, Next.js, Node.js';
  }, [personalInfo?.tools, atAGlance]);

  // Tool Stack Category Tab State (DESIGN, DEVELOPMENT, MOTION, 3D / VISUAL)
  const [activeStackTab, setActiveStackTab] = useState(0);

  // Timeline Scroll Tracking State (with exact node DOM rect tracking)
  const timelineRef = useRef(null);
  const railRef = useRef(null);
  const runnerRef = useRef(null);
  const runnerTipRef = useRef(null);
  const nodeRefs = useRef([]);
  const activeTimelineIdxRef = useRef(-1);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(-1);

  // Terminal interactive state
  const [terminalEntered, setTerminalEntered] = useState(false);
  const [hoveredProcessStep, setHoveredProcessStep] = useState(null);

  // Stack data across the 4 disciplines
  const stackCategories = [
    {
      id: 'design',
      title: 'DESIGN',
      icon: <Palette className="w-4 h-4" />,
      tools: [
        {
          name: 'FIGMA',
          desc: 'Interface design and prototyping',
          symbol: 'F',
        },
        {
          name: 'PHOTOSHOP',
          desc: 'Image editing and refinement',
          symbol: 'P',
        },
        {
          name: 'ILLUSTRATOR',
          desc: 'Vector graphics and icons',
          symbol: 'I',
        },
        {
          name: 'DESIGN SYSTEMS',
          desc: 'Design system examples and resources',
          symbol: 'D',
        },
      ],
    },
    {
      id: 'development',
      title: 'DEVELOPMENT',
      icon: <Code2 className="w-4 h-4" />,
      tools: [
        {
          name: 'NEXT.JS / REACT',
          desc: 'Full-stack architecture & client apps',
          symbol: 'N',
        },
        {
          name: 'NODE.JS / APIS',
          desc: 'High-concurrency backend services',
          symbol: 'JS',
        },
        {
          name: 'POSTGRESQL / REDIS',
          desc: 'High-speed database & cache caching',
          symbol: 'DB',
        },
        {
          name: 'DOCKER / DEVOPS',
          desc: 'Containerized deployment & VPS infrastructure',
          symbol: 'DK',
        },
      ],
    },
    {
      id: 'motion',
      title: 'MOTION',
      icon: <Play className="w-4 h-4" />,
      tools: [
        {
          name: 'GSAP / FRAMER MOTION',
          desc: 'Spring physics & scroll animations',
          symbol: 'M',
        },
        {
          name: 'LENIS SCROLL',
          desc: 'Smooth momentum scrolling physics',
          symbol: 'L',
        },
        {
          name: 'TAILWIND CSS',
          desc: 'Utility design tokens & animations',
          symbol: 'TW',
        },
        {
          name: 'SVG / CANVAS',
          desc: 'Vector motion & dynamic rendering',
          symbol: 'CV',
        },
      ],
    },
    {
      id: '3d-visual',
      title: '3D / VISUAL',
      icon: <Box className="w-4 h-4" />,
      tools: [
        {
          name: 'THREE.JS / WEBGL',
          desc: 'Interactive 3D scenes & shaders',
          symbol: '3D',
        },
        {
          name: 'SPLINE 3D',
          desc: 'Interactive web 3D models & lighting',
          symbol: 'S',
        },
        {
          name: 'BLENDER',
          desc: '3D asset modeling & rendering',
          symbol: 'B',
        },
        {
          name: 'HALFTONE ENGINE',
          desc: 'Dynamic dot-matrix canvas physics',
          symbol: 'HT',
        },
      ],
    },
  ];

  // High-performance 120fps Scroll listener for smooth Timeline tracking and sequential ignition
  useEffect(() => {
    let rafId = null;

    const updateRailSpan = () => {
      const nodes = nodeRefs.current;
      if (nodes[0] && nodes[nodes.length - 1] && railRef.current) {
        const topRect = nodes[0].getBoundingClientRect();
        const bottomRect = nodes[nodes.length - 1].getBoundingClientRect();
        const firstCenter = topRect.top + 16;
        const lastCenter = bottomRect.top + 16;
        const spanHeight = Math.max(10, lastCenter - firstCenter);
        railRef.current.style.height = `${spanHeight}px`;
      }
    };

    const updateTimeline = () => {
      if (!railRef.current || !runnerRef.current) return;

      const railRect = railRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Trigger threshold at 58% of viewport height
      const triggerY = windowHeight * 0.58;

      const relativeY = triggerY - railRect.top;
      const p = Math.max(0, Math.min(1, relativeY / Math.max(1, railRect.height)));

      // Direct hardware-accelerated GPU transform with zero latency
      runnerRef.current.style.transform = `scaleY(${p})`;

      // Leading laser runner tip
      if (runnerTipRef.current) {
        runnerTipRef.current.style.top = `${p * 100}%`;
        runnerTipRef.current.style.opacity = p > 0.008 && p < 0.995 ? '1' : '0';
      }

      // Check physical viewport position of each milestone node
      let highestReached = -1;
      const nodes = nodeRefs.current;
      for (let idx = 0; idx < nodes.length; idx++) {
        const el = nodes[idx];
        if (el) {
          const rect = el.getBoundingClientRect();
          const nodeCenter = rect.top + rect.height * 0.35;
          if (nodeCenter <= triggerY) {
            highestReached = idx;
          }
        }
      }

      // Only trigger React state re-render when a milestone changes state!
      if (highestReached !== activeTimelineIdxRef.current) {
        activeTimelineIdxRef.current = highestReached;
        setActiveTimelineIdx(highestReached);
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateTimeline();
      });
    };

    const handleResize = () => {
      updateRailSpan();
      handleScroll();
    };

    // Initial setup with short delay to allow fonts and layout to settle
    updateRailSpan();
    updateTimeline();
    const initTimer = setTimeout(() => {
      updateRailSpan();
      updateTimeline();
    }, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

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
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (window.__lenis) window.__lenis.off('scroll', handleScroll);
      if (lenisTimer) clearInterval(lenisTimer);
    };
  }, []);

  const handleEnterClick = () => {
    setTerminalEntered(true);
    setTimeout(() => setTerminalEntered(false), 2200);
  };

  const currentStackCategories =
    techStackCategories && techStackCategories.length > 0
      ? techStackCategories
      : stackCategories;

  return (
    <div className="w-full">
      {/* ========================================================
          SECTION 1: HERO SECTION (INSIDE CYBER FRAME NAV)
          Matches https://omnira.framer.website/about top hero
          ======================================================== */}
      <section id="about-hero" className="mb-14 sm:mb-20">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[720px] lg:min-h-[780px]"
        >
          {/* Top Navbar */}
          <Navbar onOpenContact={onOpenContact} />

          {/* Hero Main Body: Split 12-Col Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative flex-grow my-auto py-6">
            {/* Left Column: Heading, Bio, Stats & Focus Card */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              {/* Pre-Badge: PROFILE SYSTEM */}
              <CornerBadge variant="cyan" className="mb-4">
                PROFILE SYSTEM
              </CornerBadge>

              {/* 3-Line Heading matching Framer Omnira 1:1 */}
              <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl uppercase tracking-tight leading-[1.08] mb-6 text-white flex flex-col items-start">
                <span>BUILD WITH</span>
                <span>CLEAR</span>
                <span className="text-[#00F0FF] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">DIRECTION</span>
              </h1>

              {/* Bio Description */}
              <p className="font-chakra text-sm sm:text-base text-neutral-300 max-w-xl leading-relaxed mb-6">
                I craft futuristic websites and digital experiences that combine clean aesthetics with powerful interactions. Every project is built with purpose, precision, and a focus on what truly matters.
              </p>

              {/* Accent Gradient Line */}
              <div className="w-20 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#38BDF8] mb-8" />

              {/* Stats & Focus Chamfered Cyber Card */}
              <div className="w-full max-w-xl bg-[#0d0f17] border border-white/15 rounded-2xl p-6 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
                {/* 3 Big Stats Grid with 3D Rolling Slot-Machine Odometer */}
                <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b border-white/[0.07]">
                  <RollingCounter
                    value={String(personalInfo.experienceDesignYears || '5').replace(/[^0-9]/g, '') || '5'}
                    suffix="+"
                    label={personalInfo.experienceDesignLabel || 'YRS DESIGN'}
                    color="text-[#00F0FF]"
                    delay={100}
                  />
                  <RollingCounter
                    value={String(personalInfo.experienceDevYears || '1').replace(/[^0-9]/g, '') || '1'}
                    suffix="+"
                    label={personalInfo.experienceDevLabel || 'YR WEB DEV'}
                    color="text-[#00F0FF]"
                    delay={260}
                  />
                  <RollingCounter
                    value={String(projects.length)}
                    suffix="+"
                    label={personalInfo.experienceProjectsLabel || 'PROJECTS'}
                    color="text-[#00F0FF]"
                    delay={420}
                  />
                </div>

                {/* Sub-Card FOCUS & TOOLS rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-chakra">
                  <div>
                    <span className="text-[#00F0FF] font-bold uppercase tracking-wider block mb-1">
                      FOCUS
                    </span>
                    <span className="text-neutral-300 leading-relaxed block">
                      {resolvedFocus}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#00F0FF] font-bold uppercase tracking-wider block mb-1">
                      TOOLS
                    </span>
                    <span className="text-neutral-300 leading-relaxed block">
                      {resolvedTools}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sahadat Vai's Second Photo in Cyber Bracket Frame */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/4.8] sm:aspect-[4/5] rounded-2xl bg-[#090a0f] border border-[#242734] hover:border-[#00F0FF]/40 overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-500">
                {/* 4 Cyber Corner Brackets */}
                <span className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                <span className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />

                {/* Background Cyber Matrix Grid */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none z-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(0,240,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Sahadat Vai's Second Portrait */}
                <img
                  src={resolveAssetUrl(personalInfo.portraitAbout || "/assets/img/sahadat-about-new.jpg")}
                  alt={(personalInfo.name || "Md. Sahadat Hossain") + " Portrait"}
                  className="w-full h-full object-cover object-[center_12%] filter contrast-105 brightness-95 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = resolveAssetUrl("/assets/img/sahadat-about-new.jpg");
                  }}
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/25 pointer-events-none z-10" />

                {/* Bottom Left Accent Golden Status Pill */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                  <div className="w-10 sm:w-14 h-1 bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#00F0FF] uppercase tracking-widest bg-black/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#00F0FF]/30 font-semibold shadow-md">
                    MD. SAHADAT HOSSAIN // ARCHITECT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CyberFrame>
      </section>

      {/* ========================================================
          SECTION 2: ABOUT ME ("BEHIND THE CODE. THIS IS WHO I AM")
          Matches real_omnira_about_sec2
          ======================================================== */}
      <section id="about-story" className="py-14 sm:py-20 border-b border-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Heading, Accent Line, 3 Bio Paragraphs & Signature */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <CornerBadge variant="cyan" className="mb-3 text-[10px] tracking-[0.2em]">
                {personalInfo?.brandName || 'STL'} // IDENTITY & PHILOSOPHY
              </CornerBadge>
              <h2 className="font-orbitron font-bold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                BEHIND THE CODE. <br className="hidden sm:inline" />
                THIS IS <span className="text-[#00F0FF] drop-shadow-[0_0_25px_rgba(0,240,255,0.45)]">WHO I AM</span>
              </h2>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent" />
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  AI PRODUCT ARCHITECT & FULL-STACK ENGINEER
                </span>
              </div>

              <div className="space-y-5 text-neutral-300 font-chakra text-sm sm:text-base leading-relaxed max-w-xl">
                <p>
                  {personalInfo.storyParagraph1 || (
                    <>I’m <span className="text-white font-semibold">{personalInfo.name}</span>, an interface designer and Framer developer based in Dhaka, Bangladesh, creating futuristic websites for bold brands and independent creators.</>
                  )}
                </p>
                <p>
                  {personalInfo.storyParagraph2 || (
                    <>My work blends visual direction, interaction design, and clean development to build digital experiences that feel sharp, immersive, and easy to use.</>
                  )}
                </p>
                <p>
                  {personalInfo.storyParagraph3 || (
                    <>I care about clarity, structure, motion, and meaningful details — turning ideas into interfaces that look distinctive and perform with purpose.</>
                  )}
                </p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-8 mt-6 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <svg width="180" height="42" viewBox="0 0 200 45" fill="none" className="text-white/80">
                  <path
                    d="M10 32 C35 12, 45 38, 65 18 C80 2, 95 42, 110 22 C125 6, 140 32, 160 16 C175 4, 185 28, 195 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-orbitron font-bold text-xs text-[#00F0FF] tracking-widest uppercase">
                  — {personalInfo.name}
                </span>
              </div>
              <div className="w-12 h-3 hazard-stripes opacity-40" />
            </div>
          </ScrollReveal>

          {/* Right Column: Profile HUD Card */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5 flex flex-col justify-center">
            <CyberCard className="w-full rounded-2xl">
              <div className="bg-[#0c0d12] border border-[#242734] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                {/* Header: PROFILE with 3 dots */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-orbitron font-bold text-[#00F0FF] tracking-widest uppercase">
                    PROFILE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                    <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                  </div>
                </div>

                {/* 6 Profile Rows */}
                <div className="space-y-4 font-chakra text-xs">
                  {/* Row 1: Name */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <User className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">NAME</span>
                    </div>
                    <span className="text-white font-medium">{personalInfo.name}</span>
                  </div>

                  {/* Row 2: Role */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <Crown className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">ROLE</span>
                    </div>
                    <span className="text-white font-medium">{personalInfo.title || "Software Architect & Full Stack Developer"}</span>
                  </div>

                  {/* Row 3: Focus */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <Target className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">FOCUS</span>
                    </div>
                    <span className="text-white font-medium">{resolvedFocus}</span>
                  </div>

                  {/* Row 4: Experience */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <Star className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">EXPERIENCE</span>
                    </div>
                    <span className="text-white font-medium">{personalInfo.experienceYears || '1+ year'}</span>
                  </div>

                  {/* Row 5: Location */}
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <MapPin className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">LOCATION</span>
                    </div>
                    <span className="text-white font-medium">{personalInfo.location || "Dhaka, Bangladesh"}</span>
                  </div>

                  {/* Row 6: Tools */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-neutral-400">
                      <span className="p-1.5 rounded bg-white/5 text-[#00F0FF] border border-white/10">
                        <Settings className="w-3.5 h-3.5" />
                      </span>
                      <span className="uppercase tracking-wider font-semibold">TOOLS</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {resolvedTools.split(',').map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-neutral-300 font-mono uppercase"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CyberCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: PROCESS SYSTEM / TERMINAL HUD
          Matches real_omnira_about_sec3
          ======================================================== */}
      <section id="about-process-system" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              PROCESS SYSTEM
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              BEHIND OMNIRA. <br />
              THIS IS <span className="text-[#00F0FF]">WHO I AM</span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
            Every step is built to keep the work clear, responsive, and ready to perform before launch.
          </p>
        </ScrollReveal>

        {/* 2-Card Layout: Left Terminal + Right Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card (Col 7): Interactive Terminal HUD */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-7">
            <CyberCard className="h-full rounded-2xl">
              <div className="bg-[#090a0f] border border-[#242734] rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                {/* Top Title Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600" />
                    <span className="text-xs font-mono font-bold text-neutral-200 ml-2 tracking-wider">
                      TERMINAL
                    </span>
                  </div>
                  <div className="text-[10px] font-mono tracking-widest uppercase">
                    STATUS: <span className="text-[#00F0FF] font-semibold">IN PROGRESS</span>
                  </div>
                </div>

                {/* Main Body: 5 Steps on Left + 3D Wireframe Graphic on Right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-grow mb-6">
                  {/* Left: 5 Steps */}
                  <div className="md:col-span-7 space-y-3.5">
                    {[
                      {
                        key: 'INPUT',
                        desc: 'Understand your goals, audience and context',
                        icon: <Target className="w-3.5 h-3.5" />,
                      },
                      {
                        key: 'STRATEGY',
                        desc: 'Analyze the market, competitors and opportunities.',
                        icon: <Compass className="w-3.5 h-3.5" />,
                      },
                      {
                        key: 'STRUCTURE',
                        desc: 'Build the information architecture and user flow.',
                        icon: <Layers className="w-3.5 h-3.5" />,
                      },
                      {
                        key: 'INTERFACE',
                        desc: 'Design the UI system, layouts and interactions.',
                        icon: <EyeLensIcon className="w-3.5 h-3.5" />,
                      },
                      {
                        key: 'LAUNCH',
                        desc: 'Build in Framer, test thoroughly and deliver.',
                        icon: <Sparkles className="w-3.5 h-3.5" />,
                      },
                    ].map((step, sIdx) => {
                      const isHovered = hoveredProcessStep === sIdx;
                      return (
                        <div
                          key={step.key}
                          onMouseEnter={() => setHoveredProcessStep(sIdx)}
                          onMouseLeave={() => setHoveredProcessStep(null)}
                          className={`p-2.5 rounded-lg border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                            isHovered
                              ? 'bg-[#12141c] border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,240,255,0.12)]'
                              : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span
                            className={`p-1.5 rounded flex items-center justify-center transition-colors ${
                              isHovered
                                ? 'bg-[#00F0FF] text-black shadow-[0_0_10px_#00F0FF]'
                                : 'bg-white/5 text-neutral-400'
                            }`}
                          >
                            {step.icon}
                          </span>
                          <div>
                            <span
                              className={`text-xs font-orbitron font-bold uppercase block transition-colors ${
                                isHovered ? 'text-[#00F0FF]' : 'text-white'
                              }`}
                            >
                              {step.key}
                            </span>
                            <span className="text-[11px] font-chakra text-neutral-400 leading-tight block mt-0.5">
                              {step.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right: Isometric Wireframe Deck Graphic */}
                  <div className="md:col-span-5 relative flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                        {/* 4 Isometric Wireframe Platters */}
                        {[35, 75, 115, 155].map((y, lIdx) => {
                          const isHigh = hoveredProcessStep === lIdx;
                          return (
                            <g key={lIdx} className="transition-all duration-300">
                              <polygon
                                points={`100,${y - 20} 180,${y} 100,${y + 20} 20,${y}`}
                                fill={isHigh ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)'}
                                stroke={isHigh ? '#00F0FF' : 'rgba(255, 255, 255, 0.15)'}
                                strokeWidth={isHigh ? '1.5' : '1'}
                              />
                              {/* Inner cross grid */}
                              <line
                                x1="60"
                                y1={y - 10}
                                x2="140"
                                y2={y + 10}
                                stroke={isHigh ? '#00F0FF' : 'rgba(255, 255, 255, 0.08)'}
                                strokeWidth="0.8"
                                strokeDasharray="2,2"
                              />
                              <line
                                x1="140"
                                y1={y - 10}
                                x2="60"
                                y2={y + 10}
                                stroke={isHigh ? '#00F0FF' : 'rgba(255, 255, 255, 0.08)'}
                                strokeWidth="0.8"
                                strokeDasharray="2,2"
                              />
                              {/* Center glowing node */}
                              <circle
                                cx="100"
                                cy={y}
                                r={isHigh ? '4' : '2.5'}
                                fill={isHigh ? '#00F0FF' : 'rgba(255, 255, 255, 0.4)'}
                                className={isHigh ? 'shadow-[0_0_10px_#00F0FF]' : ''}
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Command Line Bar */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-[#00F0FF] font-semibold">sahadat@terminal: ~$</span>
                    <span className="text-neutral-200">purpose + structure + clarity = impact</span>
                    <span className="w-2 h-4 bg-[#00F0FF] inline-block animate-pulse" />
                  </div>
                  <button
                    onClick={handleEnterClick}
                    className="px-3 py-1 bg-white/5 hover:bg-[#00F0FF] hover:text-black text-neutral-300 border border-white/10 hover:border-[#00F0FF] rounded text-[10px] font-mono tracking-wider uppercase transition-all duration-200 flex-shrink-0 cursor-pointer"
                  >
                    ENTER
                  </button>
                </div>
              </div>
            </CyberCard>
          </ScrollReveal>

          {/* Right Card (Col 5): OUTPUT & System Check */}
          <ScrollReveal direction="up" delay={0.3} className="lg:col-span-5">
            <CyberCard className="h-full rounded-2xl">
              <div className="bg-[#090a0f] border border-[#242734] rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                <div>
                  {/* Top Header: OUTPUT with 3 dots */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                    <span className="text-xs font-mono font-bold text-neutral-300 tracking-wider">
                      OUTPUT
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                      <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                      <span className="w-1.5 h-1.5 rounded-sm bg-neutral-600" />
                    </div>
                  </div>

                  {/* Main Status: READY TO LAUNCH */}
                  <h3 className="font-orbitron font-extrabold text-2xl text-[#80B82C] uppercase tracking-wide mb-1">
                    READY TO LAUNCH
                  </h3>
                  <p className="font-chakra text-xs text-neutral-400 mb-6">
                    Polished interface system
                  </p>

                  {/* Hatched Green Progress Bar */}
                  <div className="p-3 bg-black/60 border border-white/10 rounded-xl mb-8 font-mono text-[10px] text-[#80B82C] tracking-widest overflow-hidden whitespace-nowrap">
                    [||||||||||||||||||||||||||||||||||||||||||||||||||||]
                  </div>

                  {/* SYSTEM CHECK [ALL OK] */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08] text-xs font-mono">
                    <span className="text-neutral-300 uppercase tracking-wider font-semibold">
                      SYSTEM CHECK
                    </span>
                    <span className="text-[#80B82C] font-bold">[ALL OK]</span>
                  </div>

                  {/* 4 Checklist Rows */}
                  <div className="space-y-3 font-mono text-xs">
                    {['CLARITY', 'RESPONSIVE', 'MOTION', 'PERFORMANCE'].map((item) => (
                      <div key={item} className="flex items-center justify-between text-neutral-300">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#80B82C] rounded-sm" />
                          <span className="tracking-wider">{item}</span>
                        </div>
                        <span className="text-[#80B82C] font-bold">OK</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Notification on Enter */}
                <div
                  className={`mt-6 pt-4 border-t border-white/[0.08] text-[11px] font-mono transition-all duration-300 ${
                    terminalEntered ? 'text-[#80B82C] opacity-100' : 'text-neutral-500 opacity-60'
                  }`}
                >
                  {terminalEntered ? '✓ SCAN EXECUTED: ZERO ERRORS' : 'ALL 4 CHECKS VERIFIED'}
                </div>
              </div>
            </CyberCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: WHAT I CREATE / DIGITAL SYSTEMS FOR BOLD BRANDS
          Matches real_omnira_about_sec4
          ======================================================== */}
      <section id="about-services" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              WHAT I CREATE
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              DIGITAL SYSTEMS FOR <br />
              <span className="text-[#00F0FF]">BOLD BRANDS</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
              High-impact services for sharp interfaces, visual systems, and polished Framer execution.
            </p>
            <span className="text-xs font-orbitron text-[#00F0FF] tracking-widest uppercase font-bold">
              CORE SERVICES
            </span>
          </div>
        </ScrollReveal>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((svc, idx) => {
            return (
              <ScrollReveal key={svc.id} direction="up" delay={idx * 0.1} className="h-full">
                <CyberCard className="h-full rounded-2xl">
                  <div className="bg-[#0c0d12] border border-[#242734] hover:border-[#00F0FF]/60 rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]">
                    <div>
                      {/* Top Chamfered Icon Box with Corner Brackets */}
                      <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] mb-6">
                        <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00F0FF]" />
                        <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#00F0FF]" />
                        <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#00F0FF]" />
                        <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#00F0FF]" />
                        {idx === 0 && <Palette className="w-5 h-5" />}
                        {idx === 1 && <Code2 className="w-5 h-5" />}
                        {idx === 2 && <EyeLensIcon className="w-5 h-5" />}
                        {idx === 3 && <InfinityIcon className="w-5 h-5" />}
                      </div>

                      <h3 className="font-orbitron font-bold text-base text-white uppercase mb-2">
                        {svc.title}
                      </h3>

                      <p className="font-chakra text-xs text-neutral-400 leading-relaxed mb-6">
                        {svc.desc}
                      </p>

                      {/* 4 Checklist Bullets with Checkmarks */}
                      <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs font-chakra text-neutral-300">
                        {svc.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2.5">
                            <Check className="w-3.5 h-3.5 text-[#00F0FF] flex-shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CyberCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Formula Ticker Banner */}
        <ScrollReveal direction="up" delay={0.2} className="p-4 bg-[#0d0f17] border border-white/15 rounded-xl flex items-center justify-center gap-4 sm:gap-8 text-xs font-chakra text-neutral-300 uppercase tracking-widest shadow-md">
          <span className="text-white font-semibold">STRATEGY</span>
          <span className="text-[#00F0FF] font-bold">+</span>
          <span className="text-white font-semibold">DESIGN</span>
          <span className="text-[#00F0FF] font-bold">+</span>
          <span className="text-white font-semibold">DEVELOPMENT</span>
          <span className="text-[#00F0FF] font-bold">=</span>
          <span className="text-[#00F0FF] font-bold">IMPACT</span>
        </ScrollReveal>
      </section>

      {/* ========================================================
          SECTION 5: TIMELINE ARCHIVE ("YEARS OF FOCUSED DIGITAL CRAFT")
          Matches real_omnira_about_sec5 (Scroll-driven vertical timeline)
          ======================================================== */}
      <section id="about-timeline" ref={timelineRef} className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <CornerBadge variant="white" className="mb-3">
              EVOLUTION & ROADMAP
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              MILESTONES OF <br />
              <span className="text-[#00F0FF]">DIGITAL CRAFT</span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-300 max-w-md leading-relaxed md:text-right">
            A progressive roadmap of architecture, full-stack systems, and AI acceleration — shaped through precision, motion, and launch-ready deliverables.
          </p>
        </ScrollReveal>

        {/* Scroll-Driven Vertical Timeline Track */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-8">
          {/* Vertical Track Rail with Cyan Runner (Spanning from Dot 0 to Dot 6) */}
          <div
            ref={railRef}
            className="absolute left-[25px] sm:left-[41px] top-[16px] w-[2px] bg-white/[0.08] pointer-events-none"
            style={{ height: 'calc(100% - 130px)' }}
          >
            {/* 120fps Hardware-Accelerated Cyan Runner Line */}
            <div className="w-full h-full overflow-hidden">
              <div
                ref={runnerRef}
                className="w-full h-full origin-top bg-gradient-to-b from-[#0284C7] via-[#00F0FF] to-[#38BDF8] shadow-[0_0_14px_rgba(0,240,255,0.9)] will-change-transform"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            {/* Glowing Laser Leading Tip */}
            <div
              ref={runnerTipRef}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#00F0FF,0_0_18px_#00F0FF] pointer-events-none opacity-0 transition-opacity duration-150"
              style={{ top: '0%' }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-8 sm:space-y-12">
            {timeline.map((node, idx) => {
              const isReached = activeTimelineIdx >= 0 && idx <= activeTimelineIdx;
              return (
                <div
                  key={`${node.year}-${idx}`}
                  ref={(el) => (nodeRefs.current[idx] = el)}
                  className="relative flex items-start gap-6 sm:gap-10 transition-all duration-500"
                >
                  {/* Left: Milestone Dot on the Rail */}
                  <div className="relative z-10 flex-shrink-0 pt-1.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                        isReached
                          ? 'bg-[#00F0FF] border-[#00F0FF] shadow-[0_0_18px_#00F0FF,0_0_6px_#00F0FF] scale-110'
                          : 'bg-[#090a0f] border-neutral-700/60 scale-100 shadow-none'
                      }`}
                    >
                      <span
                        className={`rounded-full transition-all duration-500 ${
                          isReached
                            ? 'w-2 h-2 bg-black shadow-[inset_0_0_2px_rgba(0,0,0,0.8)]'
                            : 'w-1.5 h-1.5 bg-neutral-700/50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Year Label in Orbitron */}
                  <div className="flex-shrink-0 w-16 sm:w-20 pt-0.5">
                    <span
                      className={`font-orbitron font-extrabold text-xl sm:text-2xl transition-all duration-500 select-none inline-block ${
                        isReached
                          ? 'text-[#00F0FF] drop-shadow-[0_0_16px_rgba(0,240,255,0.6)] scale-105 origin-left'
                          : 'text-neutral-600 scale-100'
                      }`}
                    >
                      {node.year}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex-grow">
                    <CyberCard className="rounded-xl">
                      <div
                        className={`p-5 sm:p-6 rounded-xl border transition-all duration-500 ${
                          isReached
                            ? 'bg-[#0f1118] border-[#00F0FF]/70 shadow-[0_0_35px_rgba(0,240,255,0.14)] opacity-100'
                            : 'bg-[#08090d]/90 border-[#1c1f2b] opacity-60 hover:opacity-85 shadow-none'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3
                            className={`font-orbitron font-bold text-base uppercase transition-colors duration-500 ${
                              isReached ? 'text-white' : 'text-neutral-400'
                            }`}
                          >
                            {node.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-chakra font-semibold tracking-wider uppercase border transition-colors duration-500 self-start sm:self-auto ${
                              isReached
                                ? 'bg-[#00F0FF]/10 border-[#00F0FF]/40 text-[#00F0FF]'
                                : 'bg-white/[0.03] border-white/10 text-neutral-500'
                            }`}
                          >
                            {node.badge}
                          </span>
                        </div>
                        <p
                          className={`font-chakra text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
                            isReached ? 'text-neutral-300' : 'text-neutral-500'
                          }`}
                        >
                          {node.desc}
                        </p>
                      </div>
                    </CyberCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: SYSTEM STACK / TOOLS BEHIND THE EXECUTION
          Matches real_omnira_about_sec6
          ======================================================== */}
      <section id="about-stack" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              SYSTEM STACK
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              TOOLS BEHIND <br />
              <span className="text-[#00F0FF]">THE EXECUTION</span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
            A focused stack of design, motion, and development tools used to build sharp, scalable and launch-ready digital experiences.
          </p>
        </ScrollReveal>

        {/* 2-Column Split: Left Category Tabs + Right 2x2 Tool Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Category Tabs */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-4 space-y-3">
            {currentStackCategories.map((cat, idx) => {
              const isActive = activeStackTab === idx;
              return (
                <div
                  key={cat.id || idx}
                  onClick={() => setActiveStackTab(idx)}
                  className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'bg-[#10121a] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.15)] text-white'
                      : 'bg-[#0a0c10] border-[#242734] hover:border-white/20 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#00F0FF] text-black border-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                          : 'bg-white/5 border-white/10 text-neutral-400'
                      }`}
                    >
                      {cat.icon || <Box className="w-4 h-4" />}
                    </span>
                    <span className="font-orbitron font-bold text-sm uppercase tracking-wider">
                      {cat.title}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#00F0FF]' : 'text-neutral-600'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
              );
            })}
          </ScrollReveal>

          {/* Right Column: 2x2 Grid of 4 Tool Cards */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-8 flex flex-col justify-between">
            <CyberCard className="h-full rounded-2xl">
              <div className="bg-[#090a0f] border border-[#242734] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                {/* Header: Category Name + Index (e.g. 01 / 04) */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                  <span className="text-xs font-orbitron font-bold text-[#00F0FF] tracking-widest uppercase">
                    {currentStackCategories[activeStackTab]?.title}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    <span className="text-[#00F0FF] font-bold">0{activeStackTab + 1}</span> / 0{currentStackCategories.length}
                  </span>
                </div>

                {/* 2x2 Tool Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                  {currentStackCategories[activeStackTab]?.tools?.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-5 rounded-xl bg-[#0c0d12] border border-[#242734] hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Top Symbol Icon Box with Corner Brackets */}
                      <div className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-neutral-300 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/50 transition-colors mb-4">
                        <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-white/20 group-hover:border-[#00F0FF]" />
                        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-white/20 group-hover:border-[#00F0FF]" />
                        {tool.symbol}
                      </div>

                      <div>
                        <h4 className="font-orbitron font-bold text-sm text-white uppercase group-hover:text-[#00F0FF] transition-colors mb-1">
                          {tool.name}
                        </h4>
                        <p className="font-chakra text-xs text-neutral-400 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CyberCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: CLIENT REVIEWS & AI MODEL ARSENAL
          Matches Framer Omnira standard (Zero Fake Reviews · 100% Transparent)
          ======================================================== */}
      <section id="about-reviews" className="py-14 sm:py-20 border-b border-white/[0.07]">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <CornerBadge variant="white" className="mb-3">
              RADICAL TRANSPARENCY · 100% VERIFIED ONLY
            </CornerBadge>
            <h2 className="font-orbitron font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              CLIENT REVIEWS & <br />
              <span className="text-[#00F0FF]">TRUST PIPELINE</span>
            </h2>
          </div>
          <p className="font-chakra text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed md:text-right">
            No fabricated testimonials or fake reviews. Review slots are strictly reserved and will be published exclusively upon live client deliveries.
          </p>
        </ScrollReveal>

        {/* 3 Review Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testimonials.length === 0 ? (
            [1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="rounded-2xl border border-dashed border-white/15 hover:border-[#00F0FF]/40 bg-[#0c0d12] p-6 flex flex-col justify-between min-h-[200px] transition-all group select-none shadow-[0_0_20px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider font-semibold">
                      SLOT 0{slot} // VERIFIED
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                      AWAITING REVIEW
                    </span>
                  </div>
                  <p className="font-chakra text-xs text-neutral-400 italic leading-relaxed mb-6">
                    "This review slot is open for upcoming client projects. Zero fake reviews, zero paid feedback."
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-chakra text-xs text-neutral-300 font-semibold">
                    Client Partner #{slot}
                  </span>
                  <button
                    onClick={onOpenContact}
                    className="text-[10px] font-mono text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>CLAIM SPOT</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            testimonials.slice(0, 3).map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="h-full">
                <CyberCard className="h-full rounded-2xl">
                  <div className="bg-[#0c0d12] border border-[#242734] hover:border-[#00F0FF]/40 rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300">
                    <div>
                      {/* Top Quote Badge with Corner Brackets */}
                      <div className="relative w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mb-6 font-mono text-xs">
                        <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-white/20" />
                        <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-white/20" />
                        ""
                      </div>

                      <p className="font-chakra text-sm text-neutral-300 leading-relaxed mb-6">
                        {item.quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="font-orbitron font-bold text-xs text-white uppercase">
                            {item.name}
                          </h4>
                          <p className="font-chakra text-[11px] text-neutral-400">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#00F0FF] hover:text-[#38BDF8] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                        <span>X LINK</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </CyberCard>
              </ScrollReveal>
            ))
          )}
        </div>

        {/* Bottom Banner: Core Commitment Rating + AI Model Arsenal Marquee */}
        <ScrollReveal direction="up" delay={0.25} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Core Commitment 100% Verified */}
          <div className="lg:col-span-4 p-5 bg-[#08090d] border border-white/[0.08] rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] font-chakra text-[#00F0FF] uppercase tracking-widest font-bold mb-1">
                CORE COMMITMENT
              </div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-2xl text-white">100%</span>
                <span className="px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[10px] font-mono text-[#00F0FF] uppercase">
                  VERIFIED
                </span>
              </div>
              <div className="text-[10px] font-chakra text-neutral-400 uppercase tracking-wider mt-1">
                ON-TIME DELIVERY · ZERO COMPROMISE
              </div>
            </div>

            {/* Glowing Shield Badge */}
            <div className="relative w-10 h-10 rounded-xl bg-white/5 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00F0FF]" />
              <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#00F0FF]" />
              <Shield className="w-5 h-5 text-[#00F0FF]" />
            </div>
          </div>

          {/* Right: AI Models & Engines Marquee */}
          <div className="lg:col-span-8 p-3.5 bg-[#08090d] border border-white/[0.08] rounded-xl overflow-hidden relative">
            <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
              {aiModels.concat(aiModels).concat(aiModels).map((model, idx) => (
                <div
                  key={`${model.name}-${idx}`}
                  className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0e1017] border border-white/10 hover:border-[#00F0FF]/50 transition-all flex-shrink-0 group select-none shadow-[0_0_10px_rgba(0,0,0,0.4)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] group-hover:scale-125 transition-transform" />
                  <span className="font-orbitron font-bold text-xs tracking-wider text-white group-hover:text-[#00F0FF] transition-colors">
                    {model.name}
                  </span>
                  <span className="text-[9px] font-chakra px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-wider">
                    {model.provider}
                  </span>
                  <span className="text-[9px] font-mono text-[#00F0FF]/70 tracking-wider">
                    {model.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================
          SECTION 8: FOOTER CTA FRAME
          Matches Framer Omnira standard footer
          ======================================================== */}
      <ScrollReveal direction="up" delay={0.1}>
        <Footer
          personalInfo={personalInfo}
          currentTime={currentTime}
          onOpenContact={onOpenContact}
        />
      </ScrollReveal>
    </div>
  );
}
