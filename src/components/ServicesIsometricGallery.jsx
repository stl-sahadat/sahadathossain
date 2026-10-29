import React, { useState, useEffect } from 'react';
import { CyberCard } from './ThreeD';
import {
  Smartphone,
  Server,
  ShoppingBag,
  Cpu,
} from 'lucide-react';

/**
 * ServicesIsometricGallery
 * Authentic 1:1 Framer Omnira 3D Interactive Isometric System Gallery.
 * Retains the authentic 4-layer stacked isometric platform format ("ভাঙা হয়ে").
 *
 * Rules:
 * - Exact original 4-tier isometric slab stack layout.
 * - On the active platform: prominent 3D elevation (translateY(-20px) scale(1.06)), glowing cyan illumination,
 *   and clear, clean visual icon & typography representing that service.
 * - Inactive platforms also display subtle wireframe icons and labels so they never look empty.
 * - Strictly NO emojis anywhere.
 * - Strictly NO cluttered extra floating texts.
 * - Smooth transition animation between platforms.
 * - Bidirectional sync with parent service accordion.
 */
export function ServicesIsometricGallery({ activeIdx = 0, onSelect = () => {}, services = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Sync with parent activeIdx
  useEffect(() => {
    setHoveredIdx(null);
  }, [activeIdx]);

  const defaultPlatforms = [
    {
      id: 'mobile-apps',
      num: '01',
      title: 'MOBILE_ENGINE',
      label: 'MOBILE-APPS',
      displayName: 'MOBILE & CROSS-PLATFORM',
      subtitle: 'iOS & Android · Cross-Platform · 60fps Native',
      telemetry: 'PLATFORM: DUAL // FPS: 60 // SYNC: OFFLINE',
      topPos: '25%',
      icon: Smartphone,
      tag: 'IOS & ANDROID',
      subtag: '60 FPS NATIVE',
    },
    {
      id: 'fullstack-saas',
      num: '02',
      title: 'FULLSTACK_SAAS',
      label: 'FULLSTACK-SAAS',
      displayName: 'FULL-STACK SAAS & APIS',
      subtitle: 'Next.js 15 · Scalable Cloud APIs · Multi-Tenant DB',
      telemetry: 'LATENCY: <140MS // RBAC: SECURE // SCALE: HIGH',
      topPos: '43%',
      icon: Server,
      tag: 'FULLSTACK SAAS',
      subtag: 'NEXT.JS 15 + APIS',
    },
    {
      id: 'ecommerce-engines',
      num: '03',
      title: 'SMART_COMMERCE',
      label: 'ECOMMERCE-ENGINES',
      displayName: 'HIGH-CONVERTING COMMERCE',
      subtitle: 'Headless Storefront · High Conversion · Stripe',
      telemetry: 'CHECKOUT: 1-CLICK // SPEED: 98+ // AOV: OPTIMIZED',
      topPos: '61%',
      icon: ShoppingBag,
      tag: 'SMART COMMERCE',
      subtag: '1-CLICK CHECKOUT',
    },
    {
      id: 'ai-reverse-engineering',
      num: '04',
      title: 'REVERSE_ENGINEERING',
      label: 'AI-REVERSE-ENGINEERING',
      displayName: 'AI & REVERSE ENGINEERING',
      subtitle: 'Target App Recon · 1:1 Pixel Parity · AI Multi-Agent',
      telemetry: 'RECON: 100% // VELOCITY: 10X // PARITY: 1:1',
      topPos: '79%',
      icon: Cpu,
      tag: 'AI REVERSE ENG',
      subtag: '1:1 RECON CORE',
    },
  ];

  const platforms = defaultPlatforms.map((p, idx) => {
    const s = services && services[idx];
    if (!s) return p;
    return {
      ...p,
      displayName: s.title || s.name || p.displayName,
      subtitle: s.desc || p.subtitle,
      tag: (s.name || s.title || p.tag).toUpperCase(),
    };
  });

  const currentIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const currentPlatform = platforms[currentIdx] || platforms[0];

  return (
    <CyberCard className="w-full aspect-square max-w-lg select-none">
      <div className="relative w-full h-full bg-[#08090d] border border-[#242734] rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden group">
        
        {/* Background Cyber Matrix Dot Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="services-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="0.8" fill="#ffffff" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-grid)" />
          </svg>
        </div>

        {/* Top Telemetry Header */}
        <div className="relative z-20 flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#80B82C] animate-pulse shadow-[0_0_8px_#80B82C]" />
            <span className="px-2.5 py-1 bg-black/80 border border-[#00F0FF]/40 rounded text-[10px] font-mono text-[#00F0FF] tracking-wider transition-all duration-300">
              NODE_0{currentIdx + 1} // {currentPlatform.title}
            </span>
          </div>

          <span className="px-2.5 py-1 bg-black/80 border border-white/10 rounded text-[10px] font-mono text-neutral-400 tracking-wider">
            STATUS: OPTIMIZED
          </span>
        </div>

        {/* Middle: 3D Stack of 4 Interactive Isometric Platforms ("ভাঙা হয়ে") */}
        <div className="relative w-full h-[320px] sm:h-[360px] my-auto">
          {platforms.map((plat, idx) => {
            const isActive = currentIdx === idx;
            const zIndex = isActive ? 50 : 20 - idx * 2;
            const IconComponent = plat.icon;

            return (
              <div
                key={plat.id}
                onClick={() => {
                  setHoveredIdx(null);
                  onSelect(idx);
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="absolute left-1/2 w-[86%] sm:w-[82%] h-[36%] cursor-pointer transition-all duration-400 ease-out"
                style={{
                  top: plat.topPos,
                  zIndex,
                  transform: `translate(-50%, -50%) ${
                    isActive ? 'translateY(-20px) scale(1.06)' : 'translateY(0px) scale(1)'
                  }`,
                  opacity: isActive ? 1 : 0.38,
                  filter: isActive ? 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.5))' : 'none',
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div className="relative w-full h-full overflow-visible">
                  
                  {/* 1. Isometric Top Surface (Diamond Polygon) */}
                  <div
                    className={`absolute inset-0 transition-all duration-400 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#1c2230] via-[#121622] to-[#0a0d14]'
                        : 'bg-[#0c0e15]'
                    }`}
                    style={{
                      clipPath: 'polygon(50% 5%, 98% 40%, 50% 80%, 2% 40%)',
                    }}
                  >
                    {/* Visual Graphic & Typography centered inside the widest heart of the Diamond */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-3.5 sm:-translate-y-4 transition-all duration-300 pointer-events-none">
                      <div
                        className={`flex flex-col items-center justify-center transition-all duration-400 ${
                          isActive ? 'scale-105 opacity-100' : 'opacity-45'
                        }`}
                      >
                        {/* Clean SVG Icon with animated cyan glow when active */}
                        <div className="relative flex items-center justify-center mb-1">
                          <IconComponent
                            className={`w-6 h-6 transition-colors duration-300 ${
                              isActive ? 'text-[#00F0FF]' : 'text-neutral-400'
                            }`}
                          />
                          {isActive && (
                            <span className="absolute -inset-1.5 rounded-full bg-[#00F0FF]/30 blur-sm animate-pulse pointer-events-none" />
                          )}
                          {/* Spin ring specifically for AI Recon */}
                          {isActive && idx === 3 && (
                            <div
                              className="absolute -inset-2 rounded-full border border-[#00F0FF]/60 animate-spin pointer-events-none"
                              style={{ animationDuration: '6s' }}
                            />
                          )}
                        </div>

                        {/* Stacked Clean Title and Subtag (Fits perfectly inside diamond without cutoff) */}
                        <div className="flex flex-col items-center text-center leading-tight">
                          <span
                            className={`text-[9px] sm:text-[10px] font-orbitron font-bold tracking-wider uppercase transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-neutral-400'
                            }`}
                          >
                            {plat.tag}
                          </span>
                          {isActive && (
                            <span className="text-[7.5px] font-mono text-[#00F0FF] font-bold tracking-wider mt-0.5 animate-fadeIn">
                              {plat.subtag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Left Side Chamfer Depth Face */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-colors duration-300"
                    style={{
                      background: isActive ? '#00F0FF' : 'rgba(0, 240, 255, 0.35)',
                      opacity: isActive ? 0.95 : 0.35,
                      clipPath: 'polygon(2% 40%, 50% 80%, 50% calc(80% + 7px), 2% calc(40% + 7px))',
                    }}
                  />

                  {/* 3. Right Side Chamfer Depth Face */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-colors duration-300"
                    style={{
                      background: isActive ? '#38BDF8' : 'rgba(56, 189, 248, 0.25)',
                      opacity: isActive ? 0.85 : 0.25,
                      clipPath: 'polygon(50% 80%, 98% 40%, 98% calc(40% + 7px), 50% calc(80% + 7px))',
                    }}
                  />

                  {/* 4. Front Edge Glowing Polyline */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 10 }}
                  >
                    <polyline
                      points="2,40 50,80 98,40"
                      fill="none"
                      stroke={isActive ? '#00F0FF' : 'rgba(0, 240, 255, 0.4)'}
                      strokeWidth={isActive ? '1.8' : '1.2'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* 5. Center Bottom Accent Pip */}
                  <div
                    className={`absolute left-[50%] top-[80%] -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 z-20 ${
                      isActive
                        ? 'bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] scale-125'
                        : 'bg-white/20'
                    }`}
                  />

                  {/* Layer Label on Left */}
                  <div
                    className={`absolute -left-2 top-[35%] -translate-y-1/2 px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-wider transition-all duration-300 z-30 ${
                      isActive
                        ? 'bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                        : 'bg-black/85 text-neutral-400 border border-white/10'
                    }`}
                  >
                    {plat.num} {plat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Telemetry Bar */}
        <div className="relative z-20 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-chakra text-neutral-400">
          <div className="flex items-center gap-2 min-w-0 flex-1 mr-3">
            <span className="font-orbitron font-bold text-[#00F0FF] flex-shrink-0">
              {currentPlatform.num}
            </span>
            <span
              className="uppercase tracking-wider text-neutral-300 font-semibold truncate text-[10px] sm:text-[11px]"
              title={currentPlatform.subtitle}
            >
              {currentPlatform.subtitle}
            </span>
          </div>

          <div className="font-mono text-[9px] text-neutral-500 hidden sm:block whitespace-nowrap flex-shrink-0">
            {currentPlatform.telemetry}
          </div>
        </div>

      </div>
    </CyberCard>
  );
}
