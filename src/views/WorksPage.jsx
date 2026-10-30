import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { resolveAssetUrl } from '../lib/assetHelper';
import { CyberFrame } from '../components/CyberFrame';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CornerBadge, ButtonCornerMarks } from '../components/CyberIcons';
import { CyberCard, ScrollReveal } from '../components/ThreeD';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import {
  ExternalLink,
  Code,
  ArrowRight,
  X,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export function WorksPage({ onOpenContact, currentTime }) {
  const navigate = useNavigate();
  const { personalInfo, projects, currentTheme } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Category filter tabs for software systems & architectures
  const filterTabs = [
    { id: 'all', label: 'ALL WORKS' },
    { id: 'websites', label: 'WEBSITES & SAAS' },
    { id: 'automations', label: 'AUTOMATIONS & BOTS' },
    { id: 'portfolios', label: 'PORTFOLIOS' },
  ];

  // Filtering logic
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(
          (p) =>
            p.categoryFilter === activeFilter ||
            (p.filters && p.filters.includes(activeFilter))
        );

  return (
    <div className="w-full">
      {/* ========================================================
          HERO BANNER FRAME: SELECTED WORK / CRAFTED DIGITAL EXPERIENCES
          Matches Framer Omnira standard
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <CyberFrame
          variant="hero"
          className="bg-[#050507]"
          contentClassName="p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
        >
          {/* Top Navbar */}
          <Navbar onOpenContact={onOpenContact} />

          {/* Page Banner Header - Split Layout */}
          <div className="py-8 sm:py-14 border-b border-white/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Left Column: Pre-Badge & Headline */}
              <div className="lg:col-span-7">
                <CornerBadge variant="cyan" className="mb-4 inline-block">
                  SELECTED WORK & ARCHIVE
                </CornerBadge>

                <h1 className="font-orbitron font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.08]">
                  CRAFTED DIGITAL <br />
                  <span className="text-[#00F0FF] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    EXPERIENCES
                  </span>
                </h1>
              </div>

              {/* Right Column: Description */}
              <div className="lg:col-span-5 pb-2">
                <p className="font-chakra text-sm sm:text-base text-neutral-300 leading-relaxed">
                  Real deployed websites, autonomous AI pipelines, interactive 3D WebGL portfolios, and high-concurrency automation daemons engineered with 1:1 precision.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Bar with 4 Category Tabs */}
          <div className="pt-8 flex flex-wrap items-center gap-3 text-xs">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-lg font-orbitron font-bold tracking-wider text-xs uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#00F0FF] text-black shadow-[0_0_25px_rgba(0,240,255,0.45)]'
                      : 'bg-white/[0.04] hover:bg-white/[0.09] text-neutral-300 hover:text-white border border-white/10 hover:border-[#00F0FF]/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </CyberFrame>
      </section>

      {/* ========================================================
          PROJECTS SHOWCASE GRID (Websites, Portfolios, Automations)
          Compact, elegant card sizing matching user preference
          ======================================================== */}
      <section className="py-4 sm:py-8 border-b border-white/[0.07]">
        {/* Section Header Meta Info */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] text-xs font-mono">
          <span className="text-neutral-300 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>
              SHOWING <span className="text-[#00F0FF] font-bold">{filteredProjects.length}</span> PRODUCTION SYSTEMS
            </span>
          </span>
          <span className="text-neutral-400 uppercase tracking-wider hidden sm:inline-block">
            FILTER: <span className="text-white font-semibold">{activeFilter.toUpperCase()}</span>
          </span>
        </div>

        {/* Regular Projects 3-Column Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={(idx % 3) * 0.06} className="h-full">
              <CyberCard className="h-full rounded-xl">
                <div
                  onClick={() => setSelectedProject(project)}
                  className="group bg-[#0d0f17] border border-white/15 hover:border-[#00F0FF] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.22)] flex flex-col justify-between h-full relative cursor-pointer"
                >
                  {/* Top Image Preview (Compact 16/10 Aspect Ratio) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/90 border-b border-white/10">
                    {/* Reticle Brackets */}
                    <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
                    <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />

                    {project.videoPreview ? (
                      <video
                        src={resolveAssetUrl(project.videoPreview)}
                        poster={resolveAssetUrl(project.img)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <img
                        src={resolveAssetUrl(project.img)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] filter brightness-100 group-hover:brightness-105"
                      />
                    )}

                    {/* Category Badge Top Left */}
                    <div className="absolute top-2.5 left-2.5 bg-black/90 backdrop-blur-md border border-[#00F0FF]/50 px-2 py-0.5 rounded text-[9px] font-chakra font-bold tracking-wider text-[#00F0FF] uppercase z-10 shadow-lg">
                      {project.category}
                    </div>

                    {/* Top Right: Live Domain Link OR Secure Pipeline Badge */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 bg-black/90 backdrop-blur-md hover:bg-[#00F0FF] hover:text-black border border-white/20 hover:border-[#00F0FF] px-2.5 py-0.5 rounded text-[9px] font-chakra font-bold tracking-wider text-white transition-all flex items-center gap-1 z-10 cursor-pointer shadow-lg group/link"
                        title={`Visit ${project.domain}`}
                      >
                        <span>{project.domain}</span>
                        <ExternalLink className="w-2.5 h-2.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    ) : (
                      <div className="absolute top-2.5 right-2.5 bg-black/90 backdrop-blur-md border border-[#00F0FF]/40 px-2 py-0.5 rounded text-[9px] font-mono text-[#00F0FF] tracking-wider z-10 shadow-lg flex items-center gap-1.5 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                        <span>{project.isPrivate ? 'SECURE' : 'INTERNAL'}</span>
                      </div>
                    )}

                    {/* Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent opacity-50 pointer-events-none" />
                  </div>

                  {/* Card Content Body - Compact & Clean */}
                  <div className="p-4 sm:p-4.5 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Title in Bold Orbitron */}
                      <h3 className="font-orbitron font-bold text-sm sm:text-base text-white group-hover:text-[#00F0FF] transition-colors truncate mb-1">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <div className="text-[11px] font-chakra text-[#38BDF8] font-semibold truncate mb-2.5">
                        {project.tagline}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap items-center gap-1 mb-4">
                        {project.tech.slice(0, 3).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 bg-white/[0.06] rounded text-[9px] font-chakra text-neutral-300 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-[9px] font-mono text-neutral-400">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-3 border-t border-white/10">
                      {!project.liveUrl ? (
                        /* Automations: Safe Architecture Button with No External Data Link */
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="group relative w-full py-2 bg-white/[0.06] hover:bg-[#00F0FF] text-white hover:text-black font-chakra font-bold text-[11px] uppercase tracking-wider transition-all border border-white/15 hover:border-[#00F0FF] cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden shadow-sm rounded-lg"
                        >
                          <ButtonCornerMarks />
                          <ShieldCheck className="w-3 h-3 relative z-10 text-[#00F0FF] group-hover:text-black" />
                          <span className="relative z-10">VIEW SPECS & ARCHITECTURE</span>
                        </button>
                      ) : (
                        /* Live Websites & Portfolios: Specs + Direct Live URL */
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="group relative flex-1 py-2 bg-white/[0.06] hover:bg-[#00F0FF] text-white hover:text-black font-chakra font-bold text-[11px] uppercase tracking-wider transition-all border border-white/15 hover:border-[#00F0FF] cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden shadow-sm rounded-lg"
                          >
                            <ButtonCornerMarks />
                            <Layers className="w-3 h-3 relative z-10" />
                            <span className="relative z-10">SPECS</span>
                          </button>

                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="group relative px-4 py-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer overflow-hidden shadow-[0_0_12px_rgba(0,240,255,0.25)] rounded-lg"
                            title="Open Live Website"
                          >
                            <ButtonCornerMarks />
                            <span className="relative z-10">LIVE DEMO</span>
                            <ExternalLink className="w-3 h-3 relative z-10" />
                          </a>
                        </div>
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
          PROJECT ARCHITECTURE & DETAIL HIGHLIGHT MODAL
          Prominently displays the project image at the top,
          followed by comprehensive engineering information below.
          ======================================================== */}
      {/* ========================================================
          PROJECT ARCHITECTURE & DETAIL HIGHLIGHT MODAL
          ======================================================== */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenContact={onOpenContact}
        />
      )}

      {/* Footer */}
      <Footer
        personalInfo={personalInfo}
        currentTime={currentTime}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}

export default WorksPage;
