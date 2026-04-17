"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "signature",
  "calibration",
  "yield",
  "deviation",
  "citation",
  "potency",
];

// Positions for old words floating up-right (as percentages of the container)
// Each step: moves UP and to the RIGHT, more tilt, more blur, more fade
const GHOST_POSITIONS = [
  // offset -1 (just exited): center-right, slight tilt
  { x: "55%", y: "45%", rotate: -25, blur: 1.5, opacity: 0.45, scale: 0.9 },
  // offset -2: upper-right, more tilt
  { x: "70%", y: "25%", rotate: -40, blur: 3.5, opacity: 0.25, scale: 0.8 },
  // offset -3: far upper-right, steep tilt, almost gone
  { x: "82%", y: "8%", rotate: -52, blur: 5.5, opacity: 0.12, scale: 0.7 },
];

export default function RotatingCylinder() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const scrollAccumRef = useRef(0);
  const lockRef = useRef(false);

  // Track last 3 words for the ghost trail
  const [history, setHistory] = useState<string[]>([]);

  const goNext = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setHistory((prev) => [WORDS[activeIndex], ...prev].slice(0, 3));
    setActiveIndex((p) => (p + 1) % WORDS.length);
    setTimeout(() => { lockRef.current = false; }, 600);
  }, [activeIndex]);

  // Scroll wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollAccumRef.current += e.deltaY;
      if (scrollAccumRef.current > 50) { goNext(); scrollAccumRef.current = 0; }
      else if (scrollAccumRef.current < -50) { scrollAccumRef.current = 0; }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext]);

  // Touch swipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onStart = (e: TouchEvent) => { touchStartRef.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = touchStartRef.current - e.changedTouches[0].clientY;
      if (diff > 30) goNext();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => { el.removeEventListener("touchstart", onStart); el.removeEventListener("touchend", onEnd); };
  }, [goNext]);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(goNext, 2500);
    return () => clearInterval(t);
  }, [goNext]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto select-none px-4 sm:px-6"
      style={{ touchAction: "pan-x" }}
    >
      <div className="relative" style={{ height: "280px" }}>
        {/* Ghost words floating up-right */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {history.map((word, i) => {
              const pos = GHOST_POSITIONS[i];
              if (!pos) return null;
              return (
                <motion.span
                  key={word + "-ghost-" + i}
                  initial={{
                    left: i === 0 ? "30%" : GHOST_POSITIONS[Math.max(0, i - 1)].x,
                    top: i === 0 ? "70%" : GHOST_POSITIONS[Math.max(0, i - 1)].y,
                    rotate: i === 0 ? -10 : GHOST_POSITIONS[Math.max(0, i - 1)].rotate,
                    opacity: i === 0 ? 0.7 : GHOST_POSITIONS[Math.max(0, i - 1)].opacity,
                    scale: i === 0 ? 1 : GHOST_POSITIONS[Math.max(0, i - 1)].scale,
                  }}
                  animate={{
                    left: pos.x,
                    top: pos.y,
                    rotate: pos.rotate,
                    opacity: pos.opacity,
                    scale: pos.scale,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-[clamp(1.1rem,2.5vw,1.6rem)] font-semibold text-white whitespace-nowrap pointer-events-none"
                  style={{
                    filter: `blur(${pos.blur}px)`,
                    textShadow: "0 0 20px rgba(255,255,255,0.3)",
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Main flat text — one line, bottom left */}
        <div className="absolute bottom-6 left-0 z-10">
          <h2 className="text-[clamp(1.5rem,4.5vw,2.8rem)] font-bold tracking-[-0.02em] leading-[1.15] whitespace-nowrap">
            <span className="text-gradient-white">Every </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-citral-teal inline-block"
              >
                {WORDS[activeIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="text-gradient-white"> verified.</span>
          </h2>
        </div>
      </div>

      <p className="text-[10px] font-mono text-white/15 mt-1 px-1">
        swipe to explore
      </p>
    </div>
  );
}
