import React, { useState, useEffect, useRef } from 'react';

/**
 * RollingDigit component
 * Renders a vertical column of numbers 0..9, 0..9 (20 items).
 * When triggered, it rolls up with cubic-bezier(0.16, 1, 0.3, 1) and locks onto target digit.
 */
function RollingDigit({ digit, delay = 0, isRolling = false }) {
  // 20 items: two sets of 0..9 so every digit spins with authentic slot-machine momentum
  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  
  // Target index in second loop (10 + digit)
  const targetIndex = 10 + Number(digit);
  // Each item is 1/20th = 5% of total height
  const translateY = isRolling ? -(targetIndex * 5) : 0;

  return (
    <span className="relative inline-block h-[1.12em] overflow-hidden leading-none select-none align-baseline">
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: `translateY(${translateY}%)`,
          transition: `transform 2.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }}
      >
        {numbers.map((n, idx) => (
          <span
            key={idx}
            className="flex h-[1.12em] items-center justify-center font-orbitron font-extrabold"
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * RollingCounter
 * Splits value into individual digits and rolls them with staggered timing.
 * Non-digit characters (like '+', 'K', '%') are rendered statically beside digits.
 */
export function RollingCounter({
  value,
  suffix = '',
  label = '',
  color = 'text-[#00F0FF]',
  delay = 0,
}) {
  const [isRolling, setIsRolling] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver so the rolling counter fires when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger the roll
          setIsRolling(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback timer in case already in viewport on mount
    const timer = setTimeout(() => {
      setIsRolling(true);
    }, delay + 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  const chars = String(value).split('');

  return (
    <div ref={containerRef} className="flex flex-col items-start">
      <div className={`font-orbitron font-extrabold text-3xl sm:text-4xl ${color} flex items-baseline tracking-tight`}>
        {chars.map((char, i) => {
          const isNum = !isNaN(Number(char)) && char !== ' ';
          if (isNum) {
            return (
              <RollingDigit
                key={i}
                digit={char}
                delay={delay + i * 140}
                isRolling={isRolling}
              />
            );
          }
          return (
            <span key={i} className="inline-block align-baseline font-orbitron">
              {char}
            </span>
          );
        })}

        {/* Suffix like '+' or 'K+' */}
        {suffix && (
          <span className="text-white/60 text-2xl sm:text-3xl font-orbitron font-normal ml-0.5 align-baseline">
            {suffix}
          </span>
        )}
      </div>

      {label && (
        <div className="text-[11px] font-chakra text-neutral-400 uppercase tracking-widest mt-1.5 font-semibold">
          {label}
        </div>
      )}
    </div>
  );
}

export default RollingCounter;
