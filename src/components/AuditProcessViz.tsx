"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { n: "01", t: "UPLOAD", d: "Raw BMR enters the pipeline." },
  { n: "02", t: "PARSE", d: "OCR + structure extraction." },
  { n: "03", t: "AUDIT", d: "Clause-by-clause cross-check." },
  { n: "04", t: "RESOLVE", d: "QA signs off with citations." },
];

const FRAGMENTS = ["§211.68", "ALCOA+", "BMR-0847", "97.3%", "ID-2847", "SCHEDULE M"];

export default function AuditProcessViz({ accent = "#84cc16" }: { accent?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % 4;
      setActive(i);
    }, 2200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      id="process"
      ref={rootRef}
      className="relative z-[5] mx-auto px-5 sm:px-8"
      style={{ padding: "clamp(80px, 12vw, 140px) 0", maxWidth: 1400 }}
    >
      <div style={{ marginBottom: 60 }}>
        <div
          style={{
            fontFamily: '"Geist Mono",monospace',
            fontSize: 11,
            letterSpacing: "0.24em",
            color: accent,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)" }}>[02/05]</span> The process
        </div>
        <h2
          style={{
            fontFamily: "Geist",
            fontSize: "clamp(44px, 6.5vw, 88px)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "#fff",
            margin: 0,
            maxWidth: 900,
          }}
        >
          A{" "}
          <span
            style={{
              fontFamily: '"Instrument Serif",serif',
              fontStyle: "italic",
              color: accent,
            }}
          >
            living
          </span>{" "}
          pipeline,
          <br />
          not a report.
        </h2>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          minHeight: 420,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: `1px solid ${accent}20`,
          borderRadius: 20,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(132,204,22,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(132,204,22,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Stages — desktop grid, mobile horizontal snap-scroll */}
        <div
          className="relative z-[5] stage-grid"
          style={{ padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 60px)" }}
        >
          {STAGES.map((s, i) => {
            const isActive = active === i;
            const isPast = active > i;
            return (
              <div
                key={s.n}
                className="stage-card"
                style={{
                  padding: 24,
                  borderRadius: 12,
                  background: isActive ? `${accent}15` : "transparent",
                  border: `1px solid ${isActive ? accent : `${accent}20`}`,
                  transition: "all 0.5s",
                  transform: isActive ? "translateY(-4px)" : "none",
                  boxShadow: isActive ? `0 20px 60px -20px ${accent}` : "none",
                }}
              >
                <div className="flex items-center gap-2.5" style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: isActive ? accent : isPast ? accent : `${accent}40`,
                      boxShadow: isActive ? `0 0 16px ${accent}` : "none",
                      animation: isActive ? "dot-pulse 1.2s infinite" : "none",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: '"Geist Mono",monospace',
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: isActive ? accent : `${accent}80`,
                    }}
                  >
                    {s.n}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Geist",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                  }}
                >
                  {s.t}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  {s.d}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pipeline-wrap relative" style={{ height: 260, padding: "0 clamp(20px, 4vw, 60px)" }}>
          <svg className="w-full h-full" viewBox="0 0 1280 260" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pipe-grad" x1="0" x2="1">
                <stop offset="0" stopColor={accent} stopOpacity="0.3" />
                <stop offset="1" stopColor={accent} stopOpacity="0.3" />
              </linearGradient>
              <filter id="pipe-glow">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            <path d="M 100 130 L 1180 130" stroke="url(#pipe-grad)" strokeWidth="3" strokeDasharray="8 6" />
            <circle
              cx={100 + active * 360 + 180}
              cy="130"
              r="10"
              fill={accent}
              filter="url(#pipe-glow)"
              style={{ transition: "cx 1.8s cubic-bezier(0.4,0,0.2,1)" }}
            >
              <animate attributeName="r" values="8;14;8" dur="1.2s" repeatCount="indefinite" />
            </circle>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <circle
                  cx={100 + i * 360 + 180}
                  cy="130"
                  r="20"
                  fill="none"
                  stroke={active >= i ? accent : `${accent}30`}
                  strokeWidth="1.5"
                  style={{ transition: "stroke 0.5s" }}
                />
                <circle
                  cx={100 + i * 360 + 180}
                  cy="130"
                  r="4"
                  fill={active >= i ? accent : `${accent}40`}
                  style={{ transition: "fill 0.5s" }}
                />
              </g>
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r="3" fill={accent} opacity="0.7">
                <animateMotion
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path="M 100 130 L 1180 130"
                  begin={`${i * 0.7}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0"
                  dur={`${3 + i * 0.5}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          {FRAGMENTS.map((txt, i) => (
            <span
              key={txt}
              className="hidden sm:inline-block"
              style={{
                position: "absolute",
                left: `${8 + i * 15}%`,
                top: i % 2 === 0 ? "30%" : "70%",
                fontFamily: '"Geist Mono",monospace',
                fontSize: 10,
                color: accent,
                opacity: 0.4,
                letterSpacing: "0.1em",
                animation: `frag-flow ${6 + i}s ease-in-out ${i * 0.5}s infinite`,
              }}
            >
              {txt}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .stage-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        @media (max-width: 900px) {
          .stage-grid {
            display: flex;
            grid-template-columns: none;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 12px;
          }
          .stage-grid::-webkit-scrollbar { display: none; }
          .stage-card {
            flex: 0 0 75%;
            max-width: 280px;
            scroll-snap-align: start;
          }
        }
        @media (max-width: 640px) {
          .pipeline-wrap { display: none; }
        }
      `}</style>
    </section>
  );
}
