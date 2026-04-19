"use client";

import { useEffect, useState } from "react";

type Palette = { a: string; b: string; c: string };

export const ACID_PALETTES: Palette[] = [
  { a: "#22c55e", b: "#065f46", c: "#84cc16" }, // hero
  { a: "#0d9488", b: "#115e59", c: "#14b8a6" }, // process
  { a: "#16a34a", b: "#86efac", c: "#052e16" }, // frameworks
  { a: "#84cc16", b: "#422006", c: "#bef264" }, // compare
  { a: "#10b981", b: "#064e3b", c: "#34d399" }, // cta
];

export default function ScrollMorphBg({ palettes = ACID_PALETTES }: { palettes?: Palette[] }) {
  const [progress, setProgress] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      setSectionIdx(Math.min(palettes.length - 1, Math.floor(p * palettes.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [palettes.length]);

  return (
    <>
      <div className="fixed inset-0 z-0" style={{ background: "#000" }} />

      {palettes.map((pal, i) => (
        <div
          key={i}
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            opacity: sectionIdx === i ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: "10%",
              left: "-10%",
              width: "60vw",
              height: "60vw",
              filter: "blur(120px)",
              opacity: 0.55,
              background: `radial-gradient(circle, ${pal.a}, transparent 70%)`,
              animation: "orb-drift-1 22s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: "-10%",
              right: "-10%",
              width: "55vw",
              height: "55vw",
              filter: "blur(120px)",
              opacity: 0.5,
              background: `radial-gradient(circle, ${pal.b}, transparent 70%)`,
              animation: "orb-drift-2 26s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              top: "40%",
              left: "40%",
              width: "50vw",
              height: "50vw",
              filter: "blur(140px)",
              opacity: 0.35,
              background: `radial-gradient(circle, ${pal.c}, transparent 70%)`,
              animation: "orb-drift-3 30s ease-in-out infinite",
            }}
          />
        </div>
      ))}

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(rgba(132,204,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${progress * -30}vh)`,
        }}
      />

      {/* Scanlines */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.3) 3px 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </>
  );
}
