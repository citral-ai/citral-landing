"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LINES: { text: string; color: string; delay: number }[] = [
  { text: "$ citral audit BMR-2024-0847.pdf", color: "#6b7280", delay: 0 },
  { text: "", color: "", delay: 500 },
  { text: "Scanning 47 pages... done", color: "#00C2A8", delay: 700 },
  { text: "", color: "", delay: 1200 },
  { text: "  ⚠ Yield 94.2% below threshold (95%)", color: "#E8C84A", delay: 1500 },
  { text: "  ✗ Balance ID-2847 calibration expired", color: "#FF6B6B", delay: 2500 },
  { text: "  ⚠ Missing operator signature §4.3", color: "#E8C84A", delay: 3500 },
  { text: "  ✓ 4/4 citations verified", color: "#00C2A8", delay: 4500 },
  { text: "", color: "", delay: 5200 },
  { text: "  1 critical · 2 warnings · ALCOA+ 82/100 · 2.3s", color: "#f7f8f8", delay: 5500 },
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
    }, 16);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!text) return <div className="h-3" />;
  if (!started) return <div className="h-[18px]" />;

  return (
    <div className="h-[18px] font-mono text-[11px] sm:text-[12px] leading-[18px] whitespace-pre" style={{ color }}>
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
      className="w-full max-w-md mx-auto mt-8 sm:mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="rounded-lg overflow-hidden backdrop-blur-md"
        style={{
          background: "rgba(2, 10, 8, 0.7)",
          border: "1px solid rgba(0, 194, 168, 0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.03]">
          <div className="w-2 h-2 rounded-full bg-[#FF6B6B]/50" />
          <div className="w-2 h-2 rounded-full bg-[#E8C84A]/50" />
          <div className="w-2 h-2 rounded-full bg-[#00C2A8]/50" />
        </div>

        {/* Content */}
        <div ref={scrollRef} className="px-4 py-3 overflow-hidden max-h-[200px]" style={{ scrollbarWidth: "none" }}>
          {LINES.map((line, i) => (
            <TypewriterLine key={i} text={line.text} color={line.color} delay={line.delay + 1200} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
