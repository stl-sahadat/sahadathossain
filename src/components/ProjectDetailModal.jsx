import React, { useEffect, useRef } from 'react';
import { resolveAssetUrl } from '../lib/assetHelper';
import { ButtonCornerMarks } from './CyberIcons';
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  Activity,
  Sparkles,
  ShieldCheck,
  Lock,
  Terminal,
  Target,
  HelpCircle,
  Wrench,
  ArrowRight,
  Globe,
} from 'lucide-react';

/**
 * ProjectDetailModal — Sleek, lightweight cyber overlay displaying detailed
 * project specifications, background purpose, technical architecture, and 
 * direct interactive visit access.
 */
export function ProjectDetailModal({ project, onClose, onOpenContact }) {
  const modalRef = useRef(null);

  // Close on Escape key & manage body scroll lock with Lenis
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll & pause Lenis smooth momentum
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.__lenis) {
      try {
        window.__lenis.stop();
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (window.__lenis) {
        try {
          window.__lenis.start();
        } catch (e) {}
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  // Handle direct visit to live project
  const handleOpenLiveUrl = (e) => {
    if (e) e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0b0e18] border border-[#00F0FF]/40 rounded-2xl max-w-3xl w-full relative shadow-[0_0_80px_rgba(0,240,255,0.22)] my-4 sm:my-6 overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300"
      >
        {/* ========================================================
            TOP MODAL HEADER & CONTROLS
            ======================================================== */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#070912]/95 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse flex-shrink-0" />
            <span className="font-orbitron font-bold text-[11px] sm:text-xs uppercase tracking-widest text-white truncate">
              SYSTEM SPECIFICATION // {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-white transition-colors p-1.5 rounded-lg bg-white/10 border border-white/15 hover:border-[#00F0FF] cursor-pointer flex-shrink-0"
            aria-label="Close Project Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ========================================================
            SCROLLABLE CONTENT BODY
            ======================================================== */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-6 md:p-8 space-y-6">
          {/* ========================================================
              PROMINENT THUMBNAIL / PREVIEW SECTION (CLICK TO VISIT)
              ======================================================== */}
          <div className="relative group/thumb rounded-xl overflow-hidden border border-[#00F0FF]/40 shadow-[0_0_35px_rgba(0,240,255,0.18)] bg-black">
            {/* Cyber Reticle Corner Marks */}
            <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
            <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />
            <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF] z-20 pointer-events-none" />
            <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF] z-20 pointer-events-none" />

            {/* Thumbnail Media Container (Clicking opens liveUrl if available) */}
            <div
              onClick={project.liveUrl ? handleOpenLiveUrl : undefined}
              className={`relative aspect-video sm:aspect-[16/9] w-full overflow-hidden ${
                project.liveUrl ? 'cursor-pointer' : ''
              }`}
              title={
                project.liveUrl
                  ? `সরাসরি ভিজিট করুন: ${project.title}`
                  : 'প্রোপ্রাইটারি আর্কিটেকচার'
              }
            >
              {project.videoPreview ? (
                <video
                  src={resolveAssetUrl(project.videoPreview)}
                  poster={resolveAssetUrl(project.img)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-[1.04]"
                />
              ) : (
                <img
                  src={resolveAssetUrl(project.img)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-[1.04] filter brightness-95 group-hover/thumb:brightness-105"
                />
              )}

              {/* Floating Top Left Category Pill */}
              <div className="absolute top-3.5 left-3.5 bg-black/90 backdrop-blur-md border border-[#00F0FF]/60 px-2.5 py-1 rounded text-[10px] sm:text-xs font-chakra font-bold tracking-wider text-[#00F0FF] uppercase z-20 shadow-xl">
                {project.category}
              </div>

              {/* Floating Top Right Domain / Status Pill */}
              <div className="absolute top-3.5 right-3.5 bg-black/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded text-[10px] sm:text-xs font-mono z-20 shadow-xl flex items-center gap-1.5">
                {project.isPrivate ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                    <span className="text-[#00F0FF] font-semibold">PROTECTED ARCHITECTURE</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse" />
                    <span className="text-neutral-200">{project.domain}</span>
                  </>
                )}
              </div>

              {/* Permanent Bottom Right Cyber Badge for Touch / Mobile & Desktop */}
              {project.liveUrl && (
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F0FF] text-black font-chakra font-extrabold text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.7)] group-hover/thumb:scale-105 transition-all">
                  <span>VISIT LIVE SYSTEM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Interactive Hover Overlay: CLICK TO VISIT LIVE SYSTEM */}
              {project.liveUrl && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-[2px]">
                  <div className="px-5 py-2.5 bg-[#00F0FF] text-black font-chakra font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.8)] flex items-center gap-2 transform -translate-y-2 group-hover/thumb:translate-y-0 transition-transform duration-300">
                    <span>VISIT LIVE SYSTEM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-2 text-[11px] font-chakra text-white/90 drop-shadow">
                    থাম্বনেইলে ক্লিক করে সরাসরি লাইভ ওয়েবসাইটে প্রবেশ করুন ↗
                  </span>
                </div>
              )}

              {/* Subtle Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e18] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>

          {/* ========================================================
              TITLE & TAGLINE
              ======================================================== */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
                  {project.domain || 'SYSTEM.STL'}
                </span>
                {project.liveUrl ? (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE SYSTEM</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>PROTECTED PIPELINE</span>
                  </span>
                )}
              </div>

              {project.liveUrl && (
                <button
                  onClick={handleOpenLiveUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-chakra font-bold text-[#00F0FF] hover:text-white transition-colors cursor-pointer group/quick"
                  title="সরাসরি লাইভ সিস্টেমে প্রবেশ করুন"
                >
                  <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="underline underline-offset-4 decoration-[#00F0FF]/50 group-hover/quick:decoration-[#00F0FF]">
                    VISIT LIVE SYSTEM
                  </span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover/quick:translate-x-0.5 group-hover/quick:-translate-y-0.5" />
                </button>
              )}
            </div>

            <h2
              id="modal-project-title"
              className="font-orbitron font-extrabold text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight leading-tight"
            >
              {project.title}
            </h2>

            {project.tagline && (
              <p className="font-chakra text-xs sm:text-sm text-[#38BDF8] font-semibold mt-1">
                {project.tagline}
              </p>
            )}

            {project.desc && (
              <p className="font-chakra text-xs sm:text-sm text-neutral-300 leading-relaxed mt-3">
                {project.desc}
              </p>
            )}
          </div>

          {/* ========================================================
              STRUCTURED DETAILS:
              1. কী কাজ করে // WHAT IT DOES
              2. কী জন্য বানানো হয়েছে // WHY IT WAS BUILT
              3. কিভাবে বানানো হয়েছে // HOW IT WAS ENGINEERED
              ======================================================== */}
          <div className="space-y-4">
            {/* 1. কী কাজ করে // WHAT IT DOES */}
            {project.whatItDoes && (
              <div className="bg-[#070912] border border-white/10 rounded-xl p-4 sm:p-5 shadow-inner">
                <div className="text-xs font-orbitron font-bold text-[#00F0FF] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#00F0FF]" />
                  <span>কোনটা কী কাজ করে // WHAT IT DOES & CORE FEATURES</span>
                </div>
                <div className="font-chakra text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                  {project.whatItDoes}
                </div>
              </div>
            )}

            {/* 2. কী জন্য বানানো হয়েছে // WHY IT WAS BUILT */}
            {project.whyItWasBuilt && (
              <div className="bg-[#070912] border border-white/10 rounded-xl p-4 sm:p-5 shadow-inner">
                <div className="text-xs font-orbitron font-bold text-[#38BDF8] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>কী জন্য বানানো হয়েছে // PURPOSE & MOTIVATION</span>
                </div>
                <div className="font-chakra text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                  {project.whyItWasBuilt}
                </div>
              </div>
            )}

            {/* 3. কিভাবে বানানো হয়েছে // HOW IT WAS ENGINEERED */}
            {project.howItWasBuilt && (
              <div className="bg-[#070912] border border-white/10 rounded-xl p-4 sm:p-5 shadow-inner">
                <div className="text-xs font-orbitron font-bold text-[#80B82C] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#80B82C]" />
                  <span>কীভাবে বানানো হয়েছে // HOW IT WAS ENGINEERED</span>
                </div>
                <div className="font-chakra text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                  {project.howItWasBuilt}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              PRIVATE AUTOMATION SECURITY ADVISORY (IF APPLICABLE)
              ======================================================== */}
          {project.isPrivate && (
            <div className="p-4 rounded-xl bg-[#00F0FF]/[0.05] border border-[#00F0FF]/30 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#00F0FF] flex-shrink-0 mt-0.5" />
              <div className="text-xs font-chakra text-neutral-300 leading-relaxed">
                <span className="text-[#00F0FF] font-bold block mb-1 uppercase tracking-wider">
                  PROPRIETARY PIPELINE // DATA ACCESS RESTRICTED
                </span>
                This automation engine operates on private infrastructure. In compliance with client NDA and security protocols, live customer database credentials and proprietary business logic are restricted from public browsing.
              </div>
            </div>
          )}

          {/* ========================================================
              PERFORMANCE & TELEMETRY METRICS (IF APPLICABLE)
              ======================================================== */}
          {project.stats && (
            <div>
              <div className="text-[11px] font-orbitron font-bold text-neutral-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>PERFORMANCE & OPERATIONAL METRICS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-white/[0.04] rounded-xl border border-white/10 text-center">
                {Object.entries(project.stats).map(([k, v]) => (
                  <div key={k} className="p-1">
                    <div className="font-orbitron font-extrabold text-xs sm:text-sm md:text-base text-white">
                      {v}
                    </div>
                    <div className="font-chakra text-[9px] sm:text-[10px] text-neutral-400 font-semibold uppercase tracking-wider mt-0.5">
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              SYSTEM TOPOLOGY & DATA FLOW (IF APPLICABLE)
              ======================================================== */}
          {project.asciiArchitecture && (
            <div>
              <div className="text-[11px] font-orbitron font-bold text-neutral-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>SYSTEM TOPOLOGY & DATA FLOW</span>
              </div>
              <pre className="bg-[#05070d] border border-[#00F0FF]/30 rounded-xl p-3.5 sm:p-4 text-[10px] sm:text-[11px] font-mono text-[#00F0FF] overflow-x-auto leading-relaxed shadow-inner">
                {project.asciiArchitecture}
              </pre>
            </div>
          )}

          {/* ========================================================
              TECHNOLOGY MATRIX & PROTOCOLS
              ======================================================== */}
          {project.tech && project.tech.length > 0 && (
            <div>
              <div className="text-[11px] font-orbitron font-bold text-neutral-300 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>TECHNOLOGY MATRIX & PROTOCOLS</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 bg-white/[0.06] border border-white/15 rounded-md text-[11px] sm:text-xs font-chakra text-neutral-200 hover:border-[#00F0FF]/50 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            MODAL BOTTOM ACTION FOOTER
            ======================================================== */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#070912]/95 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-30 sticky bottom-0">
          {project.liveUrl ? (
            <>
              {/* Primary: OPEN LIVE SYSTEM (New tab) */}
              <button
                onClick={handleOpenLiveUrl}
                className="group relative flex-1 py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer overflow-hidden rounded-lg transition-all"
                title={`Open ${project.title} Live System`}
              >
                <ButtonCornerMarks />
                <span className="relative z-10">VISIT LIVE SYSTEM</span>
                <ExternalLink className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Secondary: Close */}
              <button
                onClick={onClose}
                className="py-3.5 px-6 bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white font-chakra font-semibold text-xs uppercase tracking-widest rounded-lg border border-white/15 hover:border-[#00F0FF]/50 transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </>
          ) : (
            <>
              {/* Private Automations: Inquire Access */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenContact) onOpenContact();
                }}
                className="group relative flex-1 py-3.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-black font-chakra font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer overflow-hidden rounded-lg transition-all"
              >
                <ButtonCornerMarks />
                <span className="relative z-10">INQUIRE SIMILAR SYSTEM ARCHITECTURE</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onClose}
                className="py-3.5 px-6 bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white font-chakra font-semibold text-xs uppercase tracking-widest rounded-lg border border-white/15 hover:border-[#00F0FF]/50 transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
