import React from 'react';

/**
 * Omnira Authentic Cyberpunk Icons & UI Primitives
 * 100% 1:1 match to https://omnira.framer.website/
 */

// STL Authentic 'S' Cyber Brand Logo for Md. Sahadat Hossain (STL.)
// Matches the browser tab favicon and provides a signature geometric cyber S monogram
export function STLLogo({ className = "w-8 h-8", color = "#00F0FF" }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.45)]">
        {/* Outer Chamfered Cyber Hexagonal Frame */}
        <polygon
          points="11,2 29,2 38,11 38,29 29,38 11,38 2,29 2,11"
          fill="#080B12"
          stroke={color}
          strokeWidth="1.8"
        />
        {/* Corner Circuit Tick Accents */}
        <path
          d="M6,11 L11,6 M34,11 L29,6 M6,29 L11,34 M34,29 L29,34"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.65"
        />
        {/* Bold Stylized Futuristic Geometric 'S' Monogram */}
        <path
          d="M 28 12.5 L 16 12.5 C 13 12.5 10.5 14.8 10.5 17.5 C 10.5 20.2 13 22 16 22 L 24 22.8 C 27 22.8 29.5 24.6 29.5 27.5 C 29.5 30.2 27 32.5 24 32.5 L 12 32.5"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Circuit Power Core */}
        <circle cx="20" cy="22.5" r="1.5" fill={color} />
      </svg>
    </div>
  );
}

// Keep OmniraLogo as an alias to STLLogo so all navigation & footer references render the S logo
export const OmniraLogo = STLLogo;

/**
 * ButtonCornerMarks
 * Authentic Framer Omnira 4-corner reticle tick marks on buttons.
 * Discovered from Framer DOM (Corners element with styleType: 'line').
 * On hover, corner marks subtly pull inward with spring transition.
 */
export function ButtonCornerMarks({ className = "" }) {
  return (
    <span className={`pointer-events-none absolute inset-0 block z-20 ${className}`}>
      <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] border-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:top-1.5 group-hover:left-1.5" />
      <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] border-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:top-1.5 group-hover:right-1.5" />
      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-1.5 group-hover:right-1.5" />
      <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] border-current opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-1.5 group-hover:left-1.5" />
    </span>
  );
}

// 01 Discover - Crosshairs / Target Icon
export function DiscoverIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  );
}

// 02 Design - Pencil / Vector Node Icon
export function DesignIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

// 03 Build - Isometric Code Cube
export function BuildIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

// 04 Refine - Tuning Sliders
export function RefineIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21v-7" />
      <path d="M4 10V3" />
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M20 21v-5" />
      <path d="M20 12V3" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="10" r="2" />
      <circle cx="20" cy="14" r="2" />
    </svg>
  );
}

// Diagonal Arrow for Selected Work Cards
export function DiagonalArrowIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// Corner Badge with [ ] ticks:
// variant="accent" or "orange" or "cyan": for Hero & featured tags (cyan text & cyan ticks)
// variant="white": for Sections (white text & subtle white/gray ticks)
export function CornerBadge({ children, className = "", variant = "white" }) {
  const isAccent = variant === "orange" || variant === "accent" || variant === "cyan";
  const textColor = isAccent ? "text-[#00F0FF]" : "text-white";
  const borderColor = isAccent ? "border-[#00F0FF]" : "border-white/40";
  const bg = isAccent ? "bg-[#00F0FF]/[0.05]" : "bg-white/[0.02]";

  return (
    <div className={`relative inline-flex items-center px-3 py-1 font-chakra text-[11px] font-semibold tracking-[0.22em] ${textColor} uppercase ${bg} select-none ${className}`}>
      {/* Top-left tick */}
      <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] ${borderColor}`} />
      {/* Top-right tick */}
      <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] ${borderColor}`} />
      {/* Bottom-left tick */}
      <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] ${borderColor}`} />
      {/* Bottom-right tick */}
      <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] ${borderColor}`} />
      {children}
    </div>
  );
}

// Cyber Icon Box with Corner Brackets
export function IconBox({ children, className = "", isAccent = false, isOrange = false }) {
  const activeAccent = isAccent || isOrange;
  const borderColor = activeAccent ? "border-[#00F0FF]" : "border-white/20";
  return (
    <div className={`relative w-10 h-10 flex items-center justify-center bg-white/[0.02] flex-shrink-0 ${className}`}>
      <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] ${borderColor}`} />
      <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] ${borderColor}`} />
      <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] ${borderColor}`} />
      <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] ${borderColor}`} />
      {children}
    </div>
  );
}

// Quote "99" Badge
export function QuoteBadge({ className = "" }) {
  return (
    <div className={`relative w-8 h-8 flex items-center justify-center font-orbitron font-bold text-xs text-neutral-400 bg-white/[0.02] ${className}`}>
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30" />
      99
    </div>
  );
}

// About Me - 4 Core Pillar Icons
export function PillTargetIcon({ className = "w-3.5 h-3.5 text-neutral-300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function PillLayersIcon({ className = "w-3.5 h-3.5 text-neutral-300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}

export function PillMotionIcon({ className = "w-3.5 h-3.5 text-neutral-300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function PillImpactIcon({ className = "w-3.5 h-3.5 text-neutral-300" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="9 12 11.5 14.5 16 9.5" />
    </svg>
  );
}

// About Me - 4 Numbered Capability Icons
export function WindowLayoutIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.75">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2" />
      <circle cx="6" cy="6.5" r="1" fill="#00F0FF" />
    </svg>
  );
}

export function CodeSystemIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function FramerBrandIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.75" strokeLinejoin="round">
      <path d="M5 2h14v7h-7zM5 9h7v7H5zM5 16h7l7 7H5z" />
    </svg>
  );
}

export function EyeLensIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" fill="#00F0FF" />
    </svg>
  );
}

// Services Accordion Icons
export function ServicesDesignIcon({ className = "w-4 h-4", color = "#00F0FF" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
      <path d="m5 2 5 5" />
      <path d="M2 13h15" />
      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 2-4 2-4s2 2.4 2 4Z" fill={color} />
    </svg>
  );
}

export function ServicesDevIcon({ className = "w-4 h-4", color = "#00F0FF" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function ServicesSystemIcon({ className = "w-4 h-4", color = "#00F0FF" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
      <path d="M8 8v8" />
      <path d="M12 6v12" />
      <path d="M16 10v6" />
    </svg>
  );
}

export function ServicesCreativeIcon({ className = "w-4 h-4", color = "#00F0FF" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  );
}

// FAQs Chat Bubble Icon (Smooth rounded speech bubble with inner dot matching real_omnira_08_faqs.png)
export function ChatBubbleTechIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Outline Star Icon for Reviews Satisfaction Card (stroke cyan, fill none)
export function OutlineStarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Authentic Client Logo SVGs for Testimonials Marquee
export function LogoTodoFusion({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4h18v4h-6v12h-4V8H3V4z" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">TodoFusion</span>
    </div>
  );
}

export function LogoDailyHub({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z" />
        <path d="M12 5v7l4 2" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">DailyHub</span>
    </div>
  );
}

export function LogoFlexify({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="13" height="13" rx="2" />
        <path d="M4 17V5a2 2 0 0 1 2-2h12" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Flexify</span>
    </div>
  );
}

export function LogoCodify({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Codify</span>
    </div>
  );
}

export function LogoLandify({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Landify</span>
    </div>
  );
}

export function LogoFlowboard({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v2.5H4zm0 5h12v2.5H4zm0 5h8v2.5H4z" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Flowboard</span>
    </div>
  );
}

export function LogoNexusAI({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" fill="currentColor" />
        <circle cx="5" cy="19" r="2.5" fill="currentColor" />
        <circle cx="19" cy="19" r="2.5" fill="currentColor" />
        <line x1="12" y1="7.5" x2="5" y2="16.5" />
        <line x1="12" y1="7.5" x2="19" y2="16.5" />
        <line x1="7.5" y1="19" x2="16.5" y2="19" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Nexus AI</span>
    </div>
  );
}

export function LogoIdentify({ className = "h-4" }) {
  return (
    <div className={`inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0 ${className}`}>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
      </svg>
      <span className="font-chakra font-medium text-xs tracking-wider">Identify</span>
    </div>
  );
}

// ========================================================
// PRICING SECTION ICONS (Matching Framer Omnira 1:1)
// ========================================================

// 1. STARTER: 4-Point Sparkle Icon
export function PricingSparkleIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
        fill={color}
      />
      <circle cx="12" cy="12" r="1.5" fill="#000000" />
    </svg>
  );
}

// 2. PRO: Cyber Trophy / Cup Icon
export function PricingTrophyIcon({ className = "w-5 h-5", color = "#00F0FF" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12v5a6 6 0 0 1-12 0V4z" fill={`${color}22`} />
    </svg>
  );
}

// 3. CUSTOM: Cyber Rocket Icon
export function PricingRocketIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill={`${color}15`} />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <circle cx="15" cy="9" r="1.5" fill={color} />
    </svg>
  );
}
