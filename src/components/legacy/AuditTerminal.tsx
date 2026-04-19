"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LINES: { text: string; color: string; delay: number }[] = [
  { text: "$ citral audit BMR-2024-0847.pdf --frameworks fda,eu-gmp", color: "#6b7280", delay: 0 },
  { text: "", color: "", delay: 600 },
  { text: "● Loading 47 pages... done (1.2s)", color: "#00C2A8", delay: 800 },
  { text: "● Extracting 84 fields via hybrid pipeline... done", color: "#00C2A8", delay: 1800 },
  { text: "● Building section tree: 12 sections detected", color: "#00C2A8", delay: 2800 },
  { text: "", color: "", delay: 3400 },
  { text: "  Section 3.2 — Dispensing Record", color: "#9ca3af", delay: 3700 },
  { text: "  ⚠ Yield 94.2% — below 95% threshold", color: "#E8C84A", delay: 4400 },
  { text: '  ↳ Cited: Page 12, §3.2.4 "Actual yield: 94.2%"', color: "#6b7280", delay: 5100 },
  { text: "  ✓ Citation verified (97% match)", color: "#00C2A8", delay: 5800 },
  { text: "", color: "", delay: 6300 },
  { text: "  Section 5.1 — Equipment Calibration", color: "#9ca3af", delay: 6500 },
  { text: "  ✗ Balance ID-2847 calibration expired 2024-01-15", color: "#FF6B6B", delay: 7200 },
  { text: '  ↳ Cited: Page 28, §5.1.2 "Last cal: 2024-01-15"', color: "#6b7280", delay: 7900 },
  { text: "  ✓ Citation verified (99% match)", color: "#00C2A8", delay: 8600 },
  { text: "", color: "", delay: 9100 },
  { text: "  Section 4.3 — Operator Log", color: "#9ca3af", delay: 9300 },
  { text: "  ⚠ Missing operator signature", color: "#E8C84A", delay: 9900 },
  { text: "", color: "", delay: 10400 },
  { text: "─────────────────────────────────────────────────", color: "#1e3a36", delay: 10600 },
  { text: "  1 critical · 2 warnings · ALCOA+ 82/100", color: "#f7f8f8", delay: 11000 },
  { text: "  4/4 citations verified · audit time 2.3s", color: "#00C2A8", delay: 11500 },
];

function TypewriterLine({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || !text) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 14);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!text) return <div className="h-3" />;
  if (!started) return <div className="h-[20px]" />;

  return (
    <div className="h-[20px] font-mono text-[12px] sm:text-[13px] leading-[20px] whitespace-pre" style={{ color }}>
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse text-citral-teal">▊</span>}
    </div>
  );
}

export default function AuditTerminal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => { el.scrollTop = el.scrollHeight; }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8 text-left"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="rounded-xl overflow-hidden backdrop-blur-md relative"
        style={{
          background: "rgba(2, 10, 8, 0.78)",
          border: "1px solid rgba(0, 194, 168, 0.12)",
          boxShadow: "0 0 50px rgba(0, 194, 168, 0.06), 0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <div
          className="scan-beam absolute left-0 right-0 h-[2px] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,194,168,0.5), transparent)",
            boxShadow: "0 0 12px rgba(0,194,168,0.4)",
          }}
        />

        <div className="flex items-center px-4 py-2.5 border-b border-white/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8C84A]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00C2A8]/60" />
          </div>
          <span className="ml-3 text-[10px] font-mono text-white/25 tracking-wider">
            citral-audit · BMR-2024-0847
          </span>
        </div>

        <div ref={scrollRef} className="px-5 py-4 overflow-hidden max-h-[400px] sm:max-h-[460px]" style={{ scrollbarWidth: "none" }}>
          {LINES.map((line, i) => (
            <TypewriterLine key={i} text={line.text} color={line.color} delay={line.delay + 1200} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
