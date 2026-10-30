import React, { useEffect, useRef, useState } from 'react';

/**
 * CyberCursor: Authentic High-Precision Sci-Fi Reticle & Dot Cursor
 * 
 * Features:
 * 1. Zero-latency instant central dot pinned directly to clientX/clientY with subpixel centering.
 * 2. Butter-smooth trailing HUD reticle ring with liquid damping lerp physics (120fps capable).
 * 3. 4-corner HUD reticle targeting brackets + rotating dashed radar ring that smoothly locks on.
 * 4. Micro-interactions:
 *    - Hover: Reticle expands, illuminates in cyber cyan (#00F0FF), corner brackets lock-on with inner radar ring.
 *    - Text: Morphs into a sleek cyber I-beam capsule with precision vertical guide needle.
 *    - Click / Mousedown: Tactile recoil, central flash, emits radar sonar ripple wave from exact center.
 * 5. Touch & Hybrid Safe: Automatically hidden on touch taps; self-healing on mouse movement.
 * 6. Edge & Blur Guard: Cleanly fades out when cursor leaves browser window or window loses focus.
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

  // Cached state refs to prevent redundant React re-renders during mouse movement
  const isHoveredRef = useRef(false);
  const isTextRef = useRef(false);

  // DOM node direct references for 60-120 FPS GPU transforms
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect if device is exclusively a coarse touch screen (e.g. mobile phone without mouse)
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

    return () => {
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

    const TEXT_SELECTOR = 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"]), textarea, [contenteditable="true"]';

    const updateCoordinates = (clientX, clientY) => {
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      if (!hasInitialized.current) {
        followerPos.current.x = clientX;
        followerPos.current.y = clientY;
        hasInitialized.current = true;
      }
    };

    const handlePointerMove = (e) => {
      // Touch guard: if pointer event is from a touch screen tap, ignore custom cursor
      if (e.pointerType === 'touch') {
        setIsVisible(false);
        return;
      }

      // Restore active classes if on hybrid screen
      if (!document.documentElement.classList.contains('cyber-cursor-active')) {
        document.documentElement.classList.add('cyber-cursor-active');
        document.documentElement.classList.remove('touch-device');
      }

      updateCoordinates(e.clientX, e.clientY);
      setIsVisible(true);

      // Check hovered element
      const target = e.target;
      if (target && target.closest) {
        const textEl = target.closest(TEXT_SELECTOR);
        const isCurrentlyText = !!textEl;
        const isCurrentlyHovered = isCurrentlyText || !!target.closest(INTERACTIVE_SELECTOR);

        if (isTextRef.current !== isCurrentlyText) {
          isTextRef.current = isCurrentlyText;
          setIsText(isCurrentlyText);
        }
        if (isHoveredRef.current !== isCurrentlyHovered) {
          isHoveredRef.current = isCurrentlyHovered;
          setIsHovered(isCurrentlyHovered);
        }
      }
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch') return;

      updateCoordinates(e.clientX, e.clientY);
      setIsVisible(true);
      setIsClicking(true);

      // Spawn Sonar Ripple Ping at exact click coordinate
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

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e) => {
      if (e && e.clientX !== undefined) {
        updateCoordinates(e.clientX, e.clientY);
      }
      setIsVisible(true);
    };

    const handleTouchStart = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('cyber-cursor-active');
      document.documentElement.classList.add('touch-device');
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    const handleWindowFocus = () => {
      setIsVisible(true);
    };

    // Physics Animation Loop: Direct GPU transform updates with subpixel center alignment
    const LERP_FACTOR = 0.18;
    const renderLoop = () => {
      // Lerp follower ring coordinates towards mouse
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * LERP_FACTOR;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * LERP_FACTOR;

      // translate(-50%, -50%) ensures the dot and ring centers match coordinates exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      data-testid="cyber-cursor-root"
      className={`cyber-cursor-container fixed inset-0 pointer-events-none z-[999999] overflow-hidden transition-opacity duration-200 ${
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
          className="absolute pointer-events-none rounded-full border border-[#00F0FF] animate-sonar-ping"
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
        className="absolute top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
            isText
              ? 'w-2.5 h-7 rounded-sm border-x border-[#00F0FF] bg-[#00F0FF]/15 shadow-[0_0_12px_rgba(0,240,255,0.6)]'
              : isHovered
              ? 'w-14 h-14 rounded-full border-[1.5px] border-[#00F0FF] bg-[#00F0FF]/[0.08] shadow-[0_0_22px_rgba(0,240,255,0.5),inset_0_0_12px_rgba(0,240,255,0.2)] scale-100'
              : isClicking
              ? 'w-8 h-8 rounded-full border-[1.5px] border-[#00F0FF] bg-[#00F0FF]/25 shadow-[0_0_15px_rgba(0,240,255,0.7)] scale-90'
              : 'w-10 h-10 rounded-full border-[1.2px] border-[#00F0FF]/50 bg-transparent shadow-[0_0_8px_rgba(0,240,255,0.25)]'
          }`}
        >
          {/* Text Mode Caps */}
          {isText && (
            <>
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[#00F0FF] shadow-[0_0_4px_#00F0FF]" />
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[#00F0FF] shadow-[0_0_4px_#00F0FF]" />
            </>
          )}

          {/* Futuristic HUD Targeting Crosshairs & Rotating Radar Ring (Shown when not in text mode) */}
          {!isText && (
            <>
              {/* Inner Rotating Dashed Radar Ring when Target Locked / Hovered */}
              <div
                className={`absolute inset-1 rounded-full border border-dashed border-[#00F0FF]/40 animate-spin transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animationDuration: '6s' }}
              />

              {/* 4 Precision Crosshair Ticks */}
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

              {/* 4 Diagonal Sci-Fi Corner Brackets with fluid micro-scale lock-on */}
              <div
                className={`absolute inset-0 pointer-events-none transition-all duration-200 ease-out ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <span className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
              </div>
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
        className="absolute top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
      >
        <div
          className={`transition-all duration-150 ease-out ${
            isText
              ? 'w-0.5 h-3.5 bg-white shadow-[0_0_6px_#00F0FF]'
              : isClicking
              ? 'w-1.5 h-1.5 rounded-full bg-white scale-75 shadow-[0_0_12px_#00F0FF,0_0_24px_#00F0FF]'
              : isHovered
              ? 'w-2.5 h-2.5 rounded-full bg-[#00F0FF] scale-125 shadow-[0_0_12px_#00F0FF,0_0_24px_rgba(0,240,255,0.9)]'
              : 'w-2 h-2 rounded-full bg-[#00F0FF] scale-100 shadow-[0_0_8px_#00F0FF,0_0_16px_rgba(0,240,255,0.7)]'
          }`}
        />
      </div>
    </div>
  );
}
