import React, { useEffect, useRef, useState } from 'react';

/**
 * CyberCursor: Authentic High-Precision Sci-Fi Reticle & Dot Cursor
 * 
 * Features:
 * 1. Zero-latency instant central dot pinned directly to clientX/clientY.
 * 2. Butter-smooth trailing HUD reticle ring with liquid damping lerp physics (120fps capable).
 * 3. 4-corner HUD reticle targeting brackets that expand/lock onto interactive elements.
 * 4. Micro-interactions:
 *    - Hover: Reticle expands, illuminates in cyber cyan (#00F0FF), corner brackets lock-on.
 *    - Text: Morphs into a sleek cyber I-beam bracket capsule.
 *    - Click / Mousedown: Dot snaps in, reticle recoils, emits a radar sonar ripple wave.
 * 5. Touch & Mobile Safe: Automatically disabled on touch screens / coarse pointer devices.
 * 6. Edge guard: Cleanly fades out when cursor leaves browser window.
 */
export function CyberCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

  // High-frequency coordinates tracked in refs to prevent React render-cycle thrashing
  const mousePos = useRef({ x: -200, y: -200 });
  const followerPos = useRef({ x: -200, y: -200 });
  const hasInitialized = useRef(false);
  const animFrameId = useRef(null);

  // DOM node direct references for 60-120 FPS GPU transforms
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Touch & Coarse Pointer Guard
    if (typeof window === 'undefined') return;

    // Detect if the device is exclusively touch (coarse pointer and no fine pointer)
    const hasCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const hasFine = window.matchMedia && (window.matchMedia('(pointer: fine)').matches || window.matchMedia('(any-pointer: fine)').matches);
    const isTouchOnly = hasCoarse && !hasFine;

    if (isTouchOnly) {
      setIsEnabled(false);
      document.documentElement.classList.add('touch-device');
      document.documentElement.classList.remove('cyber-cursor-active');
      return;
    }

    // Enable custom cyber cursor and activate global cursor:none class
    setIsEnabled(true);
    document.documentElement.classList.add('cyber-cursor-active');
    document.documentElement.classList.remove('touch-device');

    const onTouchStart = () => {
      // If user actively taps screen on a mobile/hybrid screen, disable custom cursor
      setIsVisible(false);
      setIsEnabled(false);
      document.documentElement.classList.remove('cyber-cursor-active');
      document.documentElement.classList.add('touch-device');
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      document.documentElement.classList.remove('cyber-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const INTERACTIVE_SELECTOR = [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      '[role="button"]',
      '[role="link"]',
      '[role="tab"]',
      '[role="checkbox"]',
      '[role="switch"]',
      '.cursor-pointer',
      '.cyber-card',
      '.btn-chamfer',
      '.btn-pro-chamfer',
      '.faq-row-chamfer',
      '[data-cursor-hover]',
      'label',
      'summary',
    ].join(', ');

    const TEXT_SELECTOR = 'input[type="text"], input[type="email"], input[type="search"], input[type="tel"], input[type="password"], textarea, [contenteditable="true"]';

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (!hasInitialized.current) {
        followerPos.current.x = clientX;
        followerPos.current.y = clientY;
        hasInitialized.current = true;
      }

      setIsVisible(true);

      // Check hovered element
      const target = e.target;
      if (target && target.closest) {
        const textEl = target.closest(TEXT_SELECTOR);
        if (textEl) {
          setIsText(true);
          setIsHovered(true);
        } else {
          setIsText(false);
          const interactiveEl = target.closest(INTERACTIVE_SELECTOR);
          setIsHovered(!!interactiveEl);
        }
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);

      // Spawn Sonar Ripple Ping
      const rippleId = Date.now() + Math.random();
      const newRipple = {
        id: rippleId,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 550);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Physics Animation Loop: Direct GPU transform updates
    const LERP_FACTOR = 0.18;
    const renderLoop = () => {
      // Lerp follower ring coordinates towards mouse
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * LERP_FACTOR;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * LERP_FACTOR;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      data-testid="cyber-cursor-root"
      className={`cyber-cursor-container fixed inset-0 pointer-events-none z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* ========================================================
          1. SONAR RIPPLE PINGS (Click pulse waves)
          ======================================================== */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full border border-[#00F0FF] animate-sonar-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '40px',
            height: '40px',
          }}
        />
      ))}

      {/* ========================================================
          2. SMOOTH LERP FOLLOWER RETICLE RING
          ======================================================== */}
      <div
        ref={ringRef}
        data-testid="cyber-cursor-follower"
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
        style={{
          transition:
            'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-radius 0.2s ease',
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isText
              ? 'w-2 h-7 rounded-sm border-x border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_10px_rgba(0,240,255,0.6)]'
              : isHovered
              ? 'w-14 h-14 rounded-full border-[1.5px] border-[#00F0FF] bg-[#00F0FF]/[0.08] shadow-[0_0_20px_rgba(0,240,255,0.45),inset_0_0_12px_rgba(0,240,255,0.15)] scale-100'
              : isClicking
              ? 'w-8 h-8 rounded-full border-[1.5px] border-[#00F0FF] bg-[#00F0FF]/20 shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-90'
              : 'w-10 h-10 rounded-full border-[1.2px] border-[#00F0FF]/50 bg-transparent shadow-[0_0_8px_rgba(0,240,255,0.2)]'
          }`}
        >
          {/* Futuristic HUD Targeting Crosshair Tick Marks (Shown when not in text mode) */}
          {!isText && (
            <>
              {/* Top Tick */}
              <span
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 transition-colors duration-200 ${
                  isHovered ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : 'bg-[#00F0FF]/60'
                }`}
              />
              {/* Bottom Tick */}
              <span
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 transition-colors duration-200 ${
                  isHovered ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : 'bg-[#00F0FF]/60'
                }`}
              />
              {/* Left Tick */}
              <span
                className={`absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-0.5 transition-colors duration-200 ${
                  isHovered ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : 'bg-[#00F0FF]/60'
                }`}
              />
              {/* Right Tick */}
              <span
                className={`absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-0.5 transition-colors duration-200 ${
                  isHovered ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : 'bg-[#00F0FF]/60'
                }`}
              />

              {/* 4 Diagonal Sci-Fi Corner Brackets when locked on / hovered */}
              {isHovered && (
                <>
                  <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#00F0FF]" />
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#00F0FF]" />
                  <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#00F0FF]" />
                  <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#00F0FF]" />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ========================================================
          3. IMMEDIATE CENTRAL GLOWING CYBER DOT (Zero latency)
          ======================================================== */}
      <div
        ref={dotRef}
        data-testid="cyber-cursor-dot"
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-transform duration-150 ease-out ${
            isClicking
              ? 'w-1.5 h-1.5 bg-white scale-75 shadow-[0_0_12px_#00F0FF,0_0_24px_#00F0FF]'
              : isHovered
              ? 'w-2 h-2 bg-[#00F0FF] scale-125 shadow-[0_0_10px_#00F0FF,0_0_20px_rgba(0,240,255,0.9)]'
              : 'w-2 h-2 bg-[#00F0FF] scale-100 shadow-[0_0_8px_#00F0FF,0_0_16px_rgba(0,240,255,0.7)]'
          }`}
        />
      </div>
    </div>
  );
}
