"use client";

import { useEffect, useRef, useState } from "react";

const FRAMEWORKS = [
  "USFDA", "EU GMP", "PIC/S", "WHO GMP", "Schedule M", "CDSCO", "TGA",
  "ANVISA", "PMDA", "SAHPRA", "HSA", "NPRA", "NAFDAC", "KFDA", "ALCOA+",
];

function AnimatedRing({ inView }: { inView: boolean }) {
  const [count, setCount] = useState(0);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const target = 99.4;
  const offset = circumference - (circumference * (inView ? target : 0)) / 100;

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1800;
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="transform -rotate-90">
        {/* Track */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="rgba(0,194,168,0.08)"
          strokeWidth="10"
        />
        {/* Fill */}
        <circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3ff0d0" />
            <stop offset="100%" stopColor="#00C2A8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-semibold tracking-tight"
          style={{
            fontSize: "48px",
            background: "linear-gradient(135deg, #3ff0d0 0%, #00C2A8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {count}%
        </span>
      </div>
    </div>
  );
}

export default function BentoGrid() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [ringInView, setRingInView] = useState(false);

  useEffect(() => {
    if (!ringRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRingInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ringRef.current);
    return () => obs.disconnect();
  }, []);

  const cardStyle = {
    background: "rgba(6,22,20,0.7)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0,194,168,0.1)",
    borderRadius: "16px",
  };

  return (
    <section className="relative w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p
            className="font-mono uppercase mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#00C2A8",
            }}
          >
            03 / Platform
          </p>
          <h2
            className="font-medium tracking-[-0.02em] text-white max-w-2xl"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.08,
            }}
          >
            Engineered for{" "}
            <span className="font-serif italic text-citral-teal">
              defensible
            </span>{" "}
            audits.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4">
          {/* Card 1: Citation Accuracy */}
          <div
            ref={ringRef}
            className="sm:col-span-2 lg:col-span-4 lg:row-span-2 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 transition-transform duration-300 hover:-translate-y-0.5"
            style={cardStyle}
          >
            <AnimatedRing inView={ringInView} />
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Citation Accuracy
              </p>
              <h3
                className="font-semibold text-white"
                style={{ fontSize: "22px" }}
              >
                99.4% of findings cite the exact source line
              </h3>
              <p
                style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}
                className="leading-relaxed"
              >
                Every flagged deviation links back to the precise line,
                paragraph, or table cell in the source document -- fully
                traceable and audit-ready.
              </p>
            </div>
          </div>

          {/* Card 2: Regulatory Coverage */}
          <div
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2 p-6 sm:p-8 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-0.5"
            style={cardStyle}
          >
            <p
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Regulatory Coverage
            </p>
            <h3
              className="font-semibold text-white"
              style={{ fontSize: "18px" }}
            >
              15 frameworks, one audit
            </h3>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((fw, i) => (
                <span
                  key={fw}
                  className="inline-flex items-center px-2.5 py-1 rounded-full font-mono"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.04em",
                    background: "rgba(0,194,168,0.12)",
                    border: "1px solid rgba(0,194,168,0.2)",
                    color: "rgba(0,194,168,0.9)",
                  }}
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Traceable */}
          <div
            className="lg:col-span-3 p-6 sm:p-8 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-0.5"
            style={cardStyle}
          >
            <p
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Traceable
            </p>
            <h3
              className="font-semibold text-white"
              style={{ fontSize: "18px" }}
            >
              Every finding, fully cited
            </h3>
            {/* Citation demo */}
            <div
              className="rounded-lg p-4 font-mono text-[12px] leading-relaxed"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(0,194,168,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.2)" }}>4.3.2</span>{" "}
              The recorded drying temperature was{" "}
              <span
                className="px-1 rounded"
                style={{
                  background: "rgba(0,194,168,0.15)",
                  color: "#3ff0d0",
                  borderBottom: "1px solid rgba(0,194,168,0.4)",
                }}
              >
                72 &deg;C
              </span>{" "}
              which exceeds the validated range of 60--65 &deg;C per{" "}
              <span
                className="underline decoration-dotted"
                style={{ color: "rgba(0,194,168,0.7)" }}
              >
                SOP-BPR-041 &sect;3.7
              </span>
            </div>
          </div>

          {/* Card 4: Throughput */}
          <div
            className="lg:col-span-3 p-6 sm:p-8 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-0.5"
            style={cardStyle}
          >
            <p
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Throughput
            </p>
            <h3
              className="font-semibold text-white"
              style={{ fontSize: "18px" }}
            >
              2--3 minutes per full batch record
            </h3>
            {/* Visual bars */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono shrink-0"
                  style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", width: "64px" }}
                >
                  Manual
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <span className="font-mono shrink-0" style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>4--6 hrs</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-mono shrink-0"
                  style={{ fontSize: "11px", color: "rgba(0,194,168,0.7)", width: "64px" }}
                >
                  Citral
                </span>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "4%",
                      minWidth: "12px",
                      background: "linear-gradient(90deg, #00C2A8, #3ff0d0)",
                    }}
                  />
                </div>
                <span className="font-mono shrink-0" style={{ fontSize: "11px", color: "#00C2A8" }}>~3 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
