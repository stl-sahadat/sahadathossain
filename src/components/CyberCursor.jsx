import React, { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

/**
 * CyberCursor: Top-Tier Cybernetic Cursor System
 * 
 * Features:
 * 1. Pinned directly to mouse coordinates with zero-latency instant tracking.
 * 2. Outer bulky trailing circle removed as requested by Sahadat vai.
 * 3. 5-6 selectable cursor styles (Default OS Pointer + 5 High-Tech Cyber Cursors).
 * 4. 100% reactive to active color theme (Cyber Cyan, Neon Gold, Crimson Red, Matrix Green, Violet Purple).
 * 5. Micro-interactions:
 *    - Interactive hover: expands with radiant cyber glow.
 *    - Text hover: morphs into precision cyber I-beam.
 *    - Click / Mousedown: tactile snappy recoil + sonar ripple wave.
 * 6. Default OS mode: completely disables custom cursor and reveals native OS arrow.
 * 7. Mobile / Touch Guard: automatically disabled on touch-only devices.
 */
export function CyberCursor() {
  const portfolioData = usePortfolioData();
  const activeCursorStyle = portfolioData?.activeCursorStyle || 'cyber-dot';
  const currentTheme = portfolioData?.currentTheme || {
    hex: '#00F0FF',
    rgb: '0, 240, 255',
    glow: 'rgba(0, 240, 255, 0.45)',
  };

  const themeHex = currentTheme.hex || '#00F0FF';
  const themeGlow = currentTheme.glow || 'rgba(0, 240, 255, 0.45)';

  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Coordinates tracked via ref for 120fps direct GPU transform without React render churn
  const mousePos = useRef({ x: -200, y: -200 });
  const isHoveredRef = useRef(false);
  const isTextRef = useRef(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Default OS cursor mode: unmount custom cursor and restore standard browser arrow
    if (activeCursorStyle === 'default') {
      setIsEnabled(false);
      document.documentElement.classList.remove('cyber-cursor-active');
      return;
    }

    // Touch only guard
    const hasCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const hasFine = window.matchMedia && (window.matchMedia('(pointer: fine)').matches || window.matchMedia('(any-pointer: fine)').matches);
    const isTouchOnly = hasCoarse && !hasFine;

    if (isTouchOnly) {
      setIsEnabled(false);
      document.documentElement.classList.add('touch-device');
      document.documentElement.classList.remove('cyber-cursor-active');
      return;
    }

    // Custom cyber cursor active: hide OS pointer
    setIsEnabled(true);
    document.documentElement.classList.add('cyber-cursor-active');
    document.documentElement.classList.remove('touch-device');

    return () => {
      document.documentElement.classList.remove('cyber-cursor-active');
    };
  }, [activeCursorStyle]);

  useEffect(() => {
    if (!isEnabled || activeCursorStyle === 'default') return;

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

    const updatePosition = () => {
      if (cursorRef.current) {
        if (activeCursorStyle === 'futuristic-arrow') {
          // Arrow hotspot is at the tip: (0, 0)
          cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        } else {
          // Center hotspot
          cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
    };

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') {
        setIsVisible(false);
        return;
      }

      if (!document.documentElement.classList.contains('cyber-cursor-active')) {
        document.documentElement.classList.add('cyber-cursor-active');
        document.documentElement.classList.remove('touch-device');
      }

      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      updatePosition();
      setIsVisible(true);

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
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      updatePosition();
      setIsVisible(true);
      setIsClicking(true);

      // Emit sonar ripple ping
      const rippleId = Date.now() + Math.random();
      const newRipple = {
        id: rippleId,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 500);
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e) => {
      if (e && e.clientX !== undefined) {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        updatePosition();
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isEnabled, activeCursorStyle]);

  if (!isEnabled || activeCursorStyle === 'default') {
    return null;
  }

  return (
    <div
      data-testid="cyber-cursor-root"
      className={`cyber-cursor-container fixed inset-0 pointer-events-none z-[999999] overflow-hidden transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Sonar Ripple Waves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full animate-sonar-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '36px',
            height: '36px',
            border: `1.5px solid ${themeHex}`,
            boxShadow: `0 0 10px ${themeGlow}`,
          }}
        />
      ))}

      {/* 2. Direct-Pinned Cyber Cursor (Zero Trailing Lag) */}
      <div
        ref={cursorRef}
        data-testid="cyber-cursor-active-node"
        className="absolute top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
      >
        {/* Text Mode: Precision Cyber I-Beam */}
        {isText ? (
          <div className="relative flex flex-col items-center justify-center">
            <span
              className="w-2 h-0.5 rounded-full"
              style={{ backgroundColor: themeHex, boxShadow: `0 0 6px ${themeHex}` }}
            />
            <span
              className="w-0.5 h-4 my-0.5 rounded-full"
              style={{ backgroundColor: '#FFFFFF', boxShadow: `0 0 6px ${themeHex}` }}
            />
            <span
              className="w-2 h-0.5 rounded-full"
              style={{ backgroundColor: themeHex, boxShadow: `0 0 6px ${themeHex}` }}
            />
          </div>
        ) : (
          <>
            {/* Style 1: Minimal Cyber Dot */}
            {activeCursorStyle === 'cyber-dot' && (
              <div
                className="relative flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                  transform: isClicking ? 'scale(0.7)' : isHovered ? 'scale(1.7)' : 'scale(1)',
                }}
              >
                <div
                  className="absolute rounded-full transition-opacity duration-200"
                  style={{
                    width: isHovered ? '24px' : '14px',
                    height: isHovered ? '24px' : '14px',
                    backgroundColor: themeHex,
                    opacity: isHovered ? 0.35 : 0.18,
                    filter: 'blur(3px)',
                  }}
                />
                <div
                  className="rounded-full transition-all duration-150"
                  style={{
                    width: isHovered ? '10px' : '7px',
                    height: isHovered ? '10px' : '7px',
                    backgroundColor: isHovered ? '#FFFFFF' : themeHex,
                    boxShadow: `0 0 10px ${themeHex}, 0 0 20px ${themeGlow}`,
                  }}
                />
              </div>
            )}

            {/* Style 2: Precision Crosshair / Reticle */}
            {activeCursorStyle === 'crosshair' && (
              <div
                className="relative flex items-center justify-center transition-all duration-200 ease-out"
                style={{
                  transform: isClicking
                    ? 'scale(0.8) rotate(45deg)'
                    : isHovered
                    ? 'scale(1.3) rotate(45deg)'
                    : 'scale(1) rotate(0deg)',
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : themeHex,
                    boxShadow: `0 0 8px ${themeHex}`,
                  }}
                />
                <span
                  className="absolute -top-3 w-0.5 h-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: themeHex,
                    boxShadow: isHovered ? `0 0 6px ${themeHex}` : 'none',
                  }}
                />
                <span
                  className="absolute -bottom-3 w-0.5 h-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: themeHex,
                    boxShadow: isHovered ? `0 0 6px ${themeHex}` : 'none',
                  }}
                />
                <span
                  className="absolute -left-3 h-0.5 w-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: themeHex,
                    boxShadow: isHovered ? `0 0 6px ${themeHex}` : 'none',
                  }}
                />
                <span
                  className="absolute -right-3 h-0.5 w-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: themeHex,
                    boxShadow: isHovered ? `0 0 6px ${themeHex}` : 'none',
                  }}
                />
              </div>
            )}

            {/* Style 3: Sleek Cyber Stealth Arrow */}
            {activeCursorStyle === 'futuristic-arrow' && (
              <div
                className="relative transition-all duration-150 ease-out"
                style={{
                  transformOrigin: '0 0',
                  transform: isClicking ? 'scale(0.9)' : isHovered ? 'scale(1.18)' : 'scale(1)',
                  filter: isHovered
                    ? `drop-shadow(0 0 8px ${themeHex}) drop-shadow(0 0 16px ${themeGlow})`
                    : `drop-shadow(0 0 5px ${themeGlow})`,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block"
                >
                  <polygon
                    points="2,2 21,9.5 13.5,13.5 9.5,21"
                    fill="rgba(5, 7, 12, 0.92)"
                    stroke={themeHex}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <line
                    x1="2.5"
                    y1="2.5"
                    x2="13"
                    y2="13"
                    stroke={isHovered ? '#FFFFFF' : themeHex}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
                </svg>
              </div>
            )}

            {/* Style 4: Diamond Prism */}
            {activeCursorStyle === 'diamond' && (
              <div
                className="relative flex items-center justify-center transition-all duration-200 ease-out"
                style={{
                  transform: isClicking
                    ? 'scale(0.8) rotate(45deg)'
                    : isHovered
                    ? 'scale(1.3) rotate(90deg)'
                    : 'scale(1) rotate(45deg)',
                }}
              >
                <div
                  className="w-3.5 h-3.5 border-[1.5px] transition-colors duration-200"
                  style={{
                    borderColor: themeHex,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.5)',
                    boxShadow: isHovered
                      ? `0 0 12px ${themeHex}, inset 0 0 6px ${themeGlow}`
                      : `0 0 6px ${themeGlow}`,
                  }}
                />
                <div
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : themeHex,
                    boxShadow: `0 0 6px ${themeHex}`,
                  }}
                />
              </div>
            )}

            {/* Style 5: Precision Micro Ring */}
            {activeCursorStyle === 'hollow-circle' && (
              <div
                className="relative flex items-center justify-center transition-all duration-150 ease-out"
                style={{
                  transform: isClicking ? 'scale(0.75)' : isHovered ? 'scale(1.35)' : 'scale(1)',
                }}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border-[1.5px] transition-all duration-150"
                  style={{
                    borderColor: themeHex,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    boxShadow: isHovered
                      ? `0 0 12px ${themeHex}, inset 0 0 6px ${themeGlow}`
                      : `0 0 6px ${themeGlow}`,
                  }}
                />
                <div
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : themeHex,
                    boxShadow: `0 0 4px ${themeHex}`,
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
