import React from 'react';

/**
 * Omnira 1:1 Cyber Tech Notch Frame
 * Accurately replicates the chamfered corners and central step notches
 * from omnira.framer.website without fake orange border marks.
 */
export function CyberFrame({ children, className = "", contentClassName = "", variant = "hero" }) {
  if (variant === "footer") {
    return (
      <div className={`relative w-full ${className}`}>
        {/* SVG Cyber Border with Step Notch */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 80"
        >
          <path
            d="M 16 0 
               L 480 0 
               L 492 8 
               L 708 8 
               L 720 0 
               L 1184 0 
               L 1200 16 
               L 1200 64 
               L 1184 80 
               L 720 80 
               L 708 72 
               L 492 72 
               L 480 80 
               L 16 80 
               L 0 64 
               L 0 16 
               Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className={`relative z-10 w-full h-full ${contentClassName}`}>
          {children}
        </div>
      </div>
    );
  }

  // Hero / Contact monolithic cyber frame
  return (
    <div className={`relative w-full ${className}`}>
      {/* SVG Responsive Cyber Tech Frame with Notched Borders */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        preserveAspectRatio="none"
        viewBox="0 0 1200 700"
      >
        {/* Main Blueprint Boundary */}
        <path
          d="M 20 0 
             L 420 0 
             L 432 8 
             L 768 8 
             L 780 0 
             L 1180 0 
             L 1200 20 
             L 1200 240 
             L 1192 252 
             L 1192 448 
             L 1200 460 
             L 1200 680 
             L 1180 700 
             L 780 700 
             L 768 692 
             L 432 692 
             L 420 700 
             L 20 700 
             L 0 680 
             L 0 460 
             L 8 448 
             L 8 252 
             L 0 240 
             L 0 20 
             Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={`relative z-10 w-full h-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
