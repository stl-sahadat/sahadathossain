import React, { useRef, useEffect } from 'react';
import { resolveAssetUrl } from '../lib/assetHelper';

/**
 * InteractiveHalftoneCanvas
 * Authentic 1:1 reverse-engineered implementation of Framer Omnira's Hero Halftone Generator.
 * Discovered from Framer bundle: EobXXbbWfB7esIu9E9mR-oWYOkWOMjNJMoyb6HWc2Rw.B7tFxpIP.mjs
 *
 * Parameters discovered directly from live Omnira:
 * - mouseRadius: 300
 * - repulsionStrength: 64
 * - returnSpeed: 0.20
 * - dotSpacing: 3 (ultra-dense matrix)
 * - dotSize: 1.0 (fine silky dot resolution)
 * - contrast: 2.0
 * - threshold: 32
 * - sizeVariation: 0.01
 * - accentAmount: 0.10
 * - primaryColor: 'rgb(255, 255, 255)'
 * - accentColor: 'rgb(255, 212, 0)'
 *
 * Micro-Interaction & Physics:
 * - Moving the mouse produces an elastic rubber displacement / water-ripple wave.
 * - Dots push outward quadratically and spring back smoothly with damping,
 *   creating the exact "dipping finger into water / pressing into rubber" sensation.
 */
export function InteractiveHalftoneCanvas({
  imageSrc = '/assets/img/sahadat-hero-transparent.png',
  className = '',
  dotSpacing = 3,
  dotSize = 1.1,
  contrast = 2.0,
  threshold = 16,
  mouseRadius = 280,
  repulsionStrength = 60,
  returnSpeed = 0.20,
  sizeVariation = 0.01,
  accentAmount = 0.12,
  primaryColor = 'rgb(255, 255, 255)',
  accentColor = 'rgb(0, 240, 255)',
  borderRadius = 40,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const animFrameRef = useRef(null);
  const isRunningRef = useRef(false);
  const imgRef = useRef(null);
  const dimsRef = useRef({ width: 1, height: 1 });
  const dprRef = useRef(1);

  useEffect(() => {
    let isMounted = true;
    const resolvedSrc = resolveAssetUrl(imageSrc || '/assets/img/sahadat-hero-transparent.png');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = resolvedSrc;
    imgRef.current = img;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    const initParticles = () => {
      if (!isMounted || !img.complete || img.naturalWidth === 0) return;

      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(container.clientWidth || rect.width));
      const height = Math.max(1, Math.floor(container.clientHeight || rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimsRef.current = { width, height };
      dprRef.current = dpr;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Create offscreen sampling canvas
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Framer fit calculation (cover)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = width / height;
      let drawW = width;
      let drawH = height;

      if (imgAspect > containerAspect) {
        drawW = height * imgAspect;
        drawH = height;
      } else {
        drawW = width;
        drawH = width / imgAspect;
      }

      // Center & align the portrait figure with precision: head and shoulders clearly framed
      const drawX = width / 2 - drawW / 2;
      const drawY = Math.max(0, height * 0.48 - drawH * 0.42);

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const particles = [];
      const O = Math.max(2, Math.round(dotSpacing));
      const A = contrast;

      for (let y = 0; y < height; y += O) {
        for (let x = 0; x < width; x += O) {
          const pixelIndex = (Math.floor(y) * width + Math.floor(x)) * 4;
          const r = imgData[pixelIndex];
          const g = imgData[pixelIndex + 1];
          const b = imgData[pixelIndex + 2];
          const a = imgData[pixelIndex + 3] / 255;

          if (a < 0.12) continue;

          // Normalized luminance (perceptual weights) with contrast curve
          const rawBrightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          let brightness = (rawBrightness - 0.5) * A + 0.5;
          brightness = Math.max(0, Math.min(1, brightness));

          // Base dot sizing: dark areas (hair, eyes, suit) retain fine sharp dots,
          // highlight areas expand into radiant golden/white matrix dots
          const norm = Math.pow(brightness, 0.85);
          const pSize = dotSize * (0.5 + 1.25 * norm);

          // Alpha curve ensures entire face & silhouette is 100% visible and sharp
          const pAlpha = Math.max(0.4, Math.min(1, 0.45 + 0.55 * norm)) * a;

          const colorNoise = Math.sin(x * 4.112 + y * 9.331) * 9182.381;
          const isAccent = (colorNoise - Math.floor(colorNoise)) < (accentAmount * (0.4 + 0.6 * norm));

          particles.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
            size: pSize,
            alpha: pAlpha,
            color: isAccent ? accentColor : primaryColor,
          });
        }
      }

      particlesRef.current = particles;
      drawFrame(true);
    };

    const drawFrame = (force = false) => {
      const { width, height } = dimsRef.current;
      const dpr = dprRef.current;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const h = mouseRadius;
      const v = h * h;
      let hasMovement = false;
      let lastAlpha = -1;
      let lastColor = '';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let targetX = p.ox;
        let targetY = p.oy;

        if (mouse.active) {
          const dx = p.ox - mouse.x;
          const dy = p.oy - mouse.y;

          if (Math.abs(dx) < h && Math.abs(dy) < h) {
            const distSq = dx * dx + dy * dy;
            if (distSq < v && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              // Framer quadratic repulsion
              const forceRatio = Math.pow(1 - dist / h, 2) * repulsionStrength;
              targetX = p.ox + (dx / dist) * forceRatio;
              targetY = p.oy + (dy / dist) * forceRatio;
            }
          }
        }

        // Smooth physical return with dampening
        const nextX = p.x + (targetX - p.x) * returnSpeed;
        const nextY = p.y + (targetY - p.y) * returnSpeed;

        if (Math.abs(nextX - p.x) > 0.01 || Math.abs(nextY - p.y) > 0.01) {
          hasMovement = true;
        }

        p.x = nextX;
        p.y = nextY;

        if (p.alpha !== lastAlpha) {
          ctx.globalAlpha = p.alpha;
          lastAlpha = p.alpha;
        }
        if (p.color !== lastColor) {
          ctx.fillStyle = p.color;
          lastColor = p.color;
        }

        if (p.size <= 1.0) {
          const s = Math.max(1, p.size);
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (hasMovement || mouse.active || force) {
        animFrameRef.current = requestAnimationFrame(() => drawFrame(false));
        isRunningRef.current = true;
      } else {
        isRunningRef.current = false;
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      }
    };

    const startAnimation = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(() => drawFrame(false));
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      initParticles();
    } else {
      img.onload = initParticles;
    }

    const handleMouseMove = (e) => {
      const cRect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const x = clientX - cRect.left;
      const y = clientY - cRect.top;

      mouseRef.current = {
        x,
        y,
        active: true,
        vx: x - mouseRef.current.lastX,
        vy: y - mouseRef.current.lastY,
        lastX: x,
        lastY: y,
      };
      startAnimation();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      startAnimation();
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const cRect = container.getBoundingClientRect();
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        const x = clientX - cRect.left;
        const y = clientY - cRect.top;

        mouseRef.current = {
          x,
          y,
          active: true,
          vx: x - mouseRef.current.lastX,
          vy: y - mouseRef.current.lastY,
          lastX: x,
          lastY: y,
        };
        startAnimation();
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      startAnimation();
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(container);

    return () => {
      isMounted = false;
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    imageSrc,
    dotSpacing,
    dotSize,
    contrast,
    threshold,
    mouseRadius,
    repulsionStrength,
    returnSpeed,
    sizeVariation,
    accentAmount,
    primaryColor,
    accentColor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-default ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  );
}
