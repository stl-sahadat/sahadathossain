import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * CyberCard: Authentic Framer Omnira Project & Feature Card.
 * Clean 2D cyber box with subtle hover glow, specular border lighting,
 * and smooth image zoom without artificial 3D distortion.
 */
export function CyberCard({
  children,
  className = '',
  onClick,
}) {
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y, opacity: 0.08 });
  };

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group ${className}`}
    >
      {children}
      {/* Specular border glow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 overflow-hidden z-20"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 240, 255, ${glarePos.opacity}), transparent 65%)`,
        }}
      />
    </div>
  );
}

/**
 * TiltCard: Optional 3D perspective tilt on mouse hover.
 * Kept for specific interactive widgets where subtle depth is desired.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  perspective = 1000,
  glare = true,
  scale = 1.01,
  onClick,
}) {
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  );
  const [transition, setTransition] = useState('transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
    setTransition('transform 0.08s ease-out');

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.10,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setTransition('transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)');
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transition,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 overflow-hidden z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 212, 0, ${glarePos.opacity}), transparent 65%)`,
          }}
        />
      )}
    </div>
  );
}

/**
 * Hero3DCube: Authentic 4-sided 3D rotating prism cube matching Framer Omnira.
 * Discovered from Framer Omnira DOM:
 * Perspective: 600px, translateZ(-22px) rotateX(${angle}deg)
 * Smooth 0.65s cubic-bezier(0.76, 0, 0.24, 1) transition.
 * Monotonic rotation step ensures no rewind glitches or backwards spinning.
 * Invisible back-face swapping guarantees 100% flawless support for arbitrary word lists without opacity toggling.
 */
export function Hero3DCube({
  words = ['MOBILE APPS', 'SAAS PLATFORMS', 'AI & AGENTS', 'E-COMMERCE'],
  interval = 2600,
}) {
  const safeWords = useMemo(() => {
    const list = Array.isArray(words) && words.length > 0 ? words : ['MOBILE APPS', 'SAAS PLATFORMS', 'AI & AGENTS', 'E-COMMERCE'];
    return list;
  }, [words]);

  const N = safeWords.length;
  const [step, setStep] = useState(0);

  // 4 physical faces with words initialized for the first 4 slots
  const [faceWords, setFaceWords] = useState(() => [
    safeWords[0],
    safeWords[1 % N],
    safeWords[2 % N],
    safeWords[3 % N],
  ]);

  // Update faces when safeWords change
  useEffect(() => {
    const len = safeWords.length;
    setFaceWords([
      safeWords[0],
      safeWords[1 % len],
      safeWords[2 % len],
      safeWords[3 % len],
    ]);
    setStep(0);
  }, [safeWords]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        const nextStep = prev + 1;
        // The face that is now at the back (opposite side) is completely hidden.
        // Update it with the word for its next front appearance at nextStep + 2
        const backFace = (nextStep - 2 + 4) % 4;
        const upcomingWord = safeWords[(nextStep + 2) % safeWords.length];
        setFaceWords((curr) => {
          if (curr[backFace] === upcomingWord) return curr;
          const copy = [...curr];
          copy[backFace] = upcomingWord;
          return copy;
        });
        return nextStep;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, safeWords]);

  const angle = -step * 90;

  // Use the longest word as invisible sizer to prevent horizontal layout shift
  const sizerWord = safeWords.reduce((a, b) => (a.length > b.length ? a : b), 'SAAS PLATFORMS');

  return (
    <span
      className="inline-grid align-baseline relative select-none"
      style={{
        perspective: '600px',
        perspectiveOrigin: '50% 50%',
        lineHeight: '1.05em',
        whiteSpace: 'pre',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Sizer word to maintain exact width */}
      <span
        aria-hidden="true"
        className="invisible pointer-events-none col-start-1 row-start-1 font-orbitron font-extrabold uppercase whitespace-pre tracking-tight"
        style={{ lineHeight: '1.05em' }}
      >
        {sizerWord}
      </span>

      {/* 3D Rotating Prism */}
      <span
        className="col-start-1 row-start-1 relative inline-block w-full h-[1.12em] leading-[1.12em]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(-0.55em) rotateX(${angle}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
          willChange: 'transform',
        }}
      >
        {[0, 1, 2, 3].map((faceIdx) => {
          const faceRotation = faceIdx * 90;
          return (
            <span
              key={faceIdx}
              className="absolute left-0 top-0 w-full h-[1.12em] leading-[1.12em] flex items-center justify-start bg-gradient-to-t from-[#0284C7] to-[#00F0FF] bg-clip-text text-transparent font-orbitron font-extrabold uppercase whitespace-pre tracking-tight select-none"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: `rotateX(${faceRotation}deg) translateZ(0.55em)`,
                transformOrigin: 'center center',
              }}
            >
              {faceWords[faceIdx]}
            </span>
          );
        })}
      </span>
    </span>
  );
}

/**
 * ScrollReveal: Viewport intersection spring animator matching Framer's scroll entrance.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(
    typeof window !== 'undefined' && (window.location.search.includes('noload') || window.innerWidth < 768)
  );

  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '200px 0px 200px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  const getTransform = () => {
    if (isVisible) return 'none';
    switch (direction) {
      case 'up':
        return 'translateY(36px)';
      case 'down':
        return 'translateY(-36px)';
      case 'left':
        return 'translateX(36px)';
      case 'right':
        return 'translateX(-36px)';
      default:
        return 'translateY(36px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        transform: getTransform(),
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform, filter',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * CursorSpotlight: Ambient radial glow that tracks mouse cursor across the screen.
 * Optimized with requestAnimationFrame and direct DOM ref for zero re-render overhead.
 */
export function CursorSpotlight({ color = 'rgba(255, 212, 0, 0.05)', size = 500 }) {
  const spotRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let mouseX = -1000;
    let mouseY = -1000;

    const updateSpot = () => {
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`;
      }
      ticking = false;
    };

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!ticking) {
        window.requestAnimationFrame(updateSpot);
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [color, size]);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ willChange: 'background' }}
    />
  );
}
