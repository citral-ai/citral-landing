"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES: { text: string; color: string }[] = [
  { text: "$ citral audit BMR-2024-0847.pdf", color: "#6b7280" },
  { text: "", color: "" },
  { text: "● Loading 47 pages... done (1.2s)", color: "#00C2A8" },
  { text: "● Extracting 84 fields... done", color: "#00C2A8" },
  { text: "● Building section tree: 12 sections", color: "#00C2A8" },
  { text: "", color: "" },
  { text: "  Section 3.2 — Dispensing Record", color: "#9ca3af" },
  { text: "  ⚠ Yield 94.2% — below 95%", color: "#E8C84A" },
  { text: '  ↳ Page 12, §3.2.4 "Yield: 94.2%"', color: "#6b7280" },
  { text: "  ✓ Citation verified (97%)", color: "#00C2A8" },
  { text: "", color: "" },
  { text: "  Section 5.1 — Equipment Cal.", color: "#9ca3af" },
  { text: "  ✗ Balance ID-2847 cal expired", color: "#FF6B6B" },
  { text: '  ↳ Page 28, §5.1.2 "2024-01-15"', color: "#6b7280" },
  { text: "  ✓ Citation verified (99%)", color: "#00C2A8" },
  { text: "", color: "" },
  { text: "  Section 4.3 — Operator Log", color: "#9ca3af" },
  { text: "  ⚠ Missing operator signature", color: "#E8C84A" },
  { text: "", color: "" },
  { text: "──────────────────────────────", color: "#1e3a36" },
  { text: "  1 critical · 2 warnings", color: "#f7f8f8" },
  { text: "  4/4 verified · 2.3s", color: "#00C2A8" },
];

const TYPE_SPEED = 12; // ms per character

function useSequentialTypewriter(lines: typeof LINES) {
  const [lineStates, setLineStates] = useState<string[]>(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    // Empty spacer lines — skip instantly
    if (!line.text) {
      setCurrentLine((c) => c + 1);
      return;
    }

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setLineStates((prev) => {
        const next = [...prev];
        next[currentLine] = line.text.slice(0, charIndex);
        return next;
      });
      if (charIndex >= line.text.length) {
        clearInterval(interval);
        setCurrentLine((c) => c + 1);
      }
    }, TYPE_SPEED);

    return () => clearInterval(interval);
  }, [currentLine, lines]);

  return { lineStates, currentLine };
}

export default function AuditTerminal() {
  const { lineStates, currentLine } = useSequentialTypewriter(LINES);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 sm:mt-8 text-left relative">
      {/* Glow orbs */}
      <div className="absolute -inset-4 sm:-inset-8 -z-10 pointer-events-none">
        <div className="terminal-glow-orb absolute top-1/2 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(0,194,168,0.4) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="terminal-glow-orb-2 absolute top-1/3 right-1/4 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(0,210,180,0.35) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div
        className="rounded-xl overflow-hidden backdrop-blur-md relative"
        style={{
          background: "rgba(2, 10, 8, 0.78)",
          border: "1px solid rgba(0, 194, 168, 0.12)",
          boxShadow: "0 0 50px rgba(0, 194, 168, 0.06), 0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <div className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 border-b border-white/[0.04]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF6B6B]/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E8C84A]/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00C2A8]/60" />
          </div>
          <span className="ml-3 text-[9px] sm:text-[10px] font-mono text-white/25 tracking-wider truncate">
            citral-audit · BMR-2024-0847
          </span>
        </div>

        <div
          className="px-3 sm:px-5 py-2 sm:py-4 overflow-x-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {LINES.map((line, i) => {
            if (!line.text) {
              return <div key={i} className="h-[8px] sm:h-[12px]" />;
            }
            const displayed = lineStates[i];
            const isTyping = i === currentLine;
            const isDone = i < currentLine;

            return (
              <div
                key={i}
                className="h-[18px] sm:h-[20px] font-mono text-[10px] sm:text-[13px] leading-[18px] sm:leading-[20px] whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ color: (isDone || isTyping) ? line.color : "transparent" }}
              >
                {isDone ? line.text : isTyping ? (
                  <>
                    {displayed}
                    <span className="animate-pulse text-citral-teal">▊</span>
                  </>
                ) : " "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
