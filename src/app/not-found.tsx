"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const ACCENT = "#a3e635";
const SPRING = { type: "spring", stiffness: 400, damping: 32, mass: 0.9 } as const;

const MOLECULES = [
  { x: 6, y: 10, s: 0.9, rot: -20, dur: 25 },
  { x: 86, y: 14, s: 1.2, rot: 35, dur: 32 },
  { x: 8, y: 78, s: 0.8, rot: 15, dur: 28 },
  { x: 88, y: 82, s: 0.95, rot: -45, dur: 30 },
  { x: 48, y: 8, s: 0.55, rot: 80, dur: 40 },
];

function hashPath(p: string): string {
  let h = 0;
  for (let i = 0; i < p.length; i++) h = ((h << 5) - h + p.charCodeAt(i)) | 0;
  return Math.abs(h).toString(16).padStart(8, "0").toUpperCase();
}

function PolygonMolecule({
  i,
  x,
  y,
  s,
  rot,
  dur,
}: {
  i: number;
  x: number;
  y: number;
  s: number;
  rot: number;
  dur: number;
}) {
  return (
    <svg
      aria-hidden="true"
      width={110 * s}
      height={110 * s}
      viewBox="0 0 80 80"
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        animation: `mol-float ${dur}s ease-in-out ${i * 2}s infinite`,
        transform: `rotate(${rot}deg)`,
        opacity: 0.32,
        filter: "drop-shadow(0 0 14px rgba(163,230,53,0.22))",
      }}
    >
      <g stroke={ACCENT} strokeWidth="1" fill="none" opacity="0.6">
        <line x1="20" y1="20" x2="40" y2="40" />
        <line x1="40" y1="40" x2="60" y2="20" />
        <line x1="40" y1="40" x2="40" y2="65" />
        <line x1="40" y1="65" x2="60" y2="75" />
        <line x1="40" y1="65" x2="20" y2="75" />
      </g>
      <g fill={ACCENT}>
        <circle cx="20" cy="20" r="3" />
        <circle cx="40" cy="40" r="4" />
        <circle cx="60" cy="20" r="3" />
        <circle cx="40" cy="65" r="3.5" />
        <circle cx="60" cy="75" r="2.5" />
        <circle cx="20" cy="75" r="2.5" />
      </g>
    </svg>
  );
}

function Field({
  label,
  mono,
  children,
}: {
  label: string;
  mono?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: '"Geist Mono",monospace',
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          alignSelf: "flex-start",
          paddingTop: 3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: mono ? '"Geist Mono",monospace' : "Geist",
          fontSize: 13,
          color: "#fff",
          lineHeight: 1.4,
          minWidth: 0,
          wordBreak: "break-all",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default function NotFound() {
  const pathname = usePathname();
  const hash = hashPath(pathname || "/unknown");
  const [timestamp, setTimestamp] = useState("—");

  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimestamp(now.toISOString().replace("T", " ").replace(/\..+/, "Z"));
    document.title = "404 · Batch record not found — Citral AI";
  }, []);

  return (
    <main
      className="grain relative min-h-screen overflow-hidden flex items-center justify-center px-5 sm:px-8 py-16 sm:py-20"
      style={{ background: "#000" }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: 0.08,
          backgroundImage:
            "linear-gradient(rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial lime bloom */}
      <div
        aria-hidden="true"
        className="fixed pointer-events-none z-[1]"
        style={{
          top: "50%",
          left: "50%",
          width: "80vw",
          height: "80vw",
          maxWidth: 1000,
          maxHeight: 1000,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${ACCENT}18 0%, ${ACCENT}08 30%, transparent 60%)`,
          filter: "blur(70px)",
        }}
      />

      {/* Scanlines */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.3) 3px 4px)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Molecular polygons — hidden on mobile for focus */}
      <div className="fixed inset-0 z-[4] pointer-events-none hidden sm:block" aria-hidden="true">
        {MOLECULES.map((m, i) => (
          <PolygonMolecule key={i} i={i} {...m} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-[5] w-full" style={{ maxWidth: 920 }}>
        {/* Incident tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
          className="flex items-center gap-2.5 mb-5 sm:mb-7"
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: 99,
              background: "#ef4444",
              boxShadow: "0 0 10px #ef4444",
              animation: "dot-pulse 1.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#ef4444",
            }}
          >
            Incident &middot; NCR-404
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:inline-block"
            style={{
              height: 1,
              flex: 1,
              maxWidth: 140,
              background: `linear-gradient(90deg, ${ACCENT}50, transparent)`,
            }}
          />
        </motion.div>

        {/* Giant 404 — sans, italic-serif outline, sans */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...SPRING, delay: 0.18 }}
          className="relative mb-5 sm:mb-8 select-none"
          style={{
            fontFamily: "Geist",
            fontSize: "clamp(120px, 26vw, 360px)",
            fontWeight: 500,
            lineHeight: 0.82,
            letterSpacing: "-0.055em",
            color: "#fff",
          }}
          aria-label="404"
        >
          <span aria-hidden="true">4</span>
          <span
            aria-hidden="true"
            style={{
              fontFamily: '"Instrument Serif",serif',
              fontStyle: "italic",
              fontWeight: 400,
              color: "transparent",
              WebkitTextStroke: `1.5px ${ACCENT}`,
              margin: "0 0.02em",
            }}
          >
            0
          </span>
          <span aria-hidden="true">4</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.28 }}
          className="m-0 mb-8 sm:mb-10"
          style={{
            fontFamily: "Geist",
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#fff",
            maxWidth: 760,
          }}
        >
          Batch record{" "}
          <span
            style={{
              fontFamily: '"Instrument Serif",serif',
              fontStyle: "italic",
              fontWeight: 400,
              background: `linear-gradient(135deg, ${ACCENT} 0%, #fff 70%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            not found
          </span>{" "}
          in registry.
        </motion.h1>

        {/* INCIDENT REPORT card */}
        <motion.section
          initial={{ opacity: 0, y: 26, rotate: -0.6 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ ...SPRING, delay: 0.38 }}
          className="relative mb-8 sm:mb-10"
          style={{
            maxWidth: 640,
            padding: "20px 20px 18px",
            borderRadius: 14,
            background:
              "linear-gradient(145deg, rgba(10,15,5,0.88), rgba(5,10,3,0.78))",
            border: `1px solid ${ACCENT}28`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px ${ACCENT}10, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}
          aria-label="Incident report"
        >
          {/* Crosshair top-right */}
          <svg
            aria-hidden="true"
            className="absolute"
            style={{ top: 10, right: 10 }}
            width="14"
            height="14"
            viewBox="0 0 16 16"
          >
            <path
              d="M 8 1 L 8 5 M 8 11 L 8 15 M 1 8 L 5 8 M 11 8 L 15 8"
              stroke={`${ACCENT}66`}
              strokeWidth="1"
              fill="none"
            />
            <circle cx="8" cy="8" r="1.6" fill="none" stroke={ACCENT} strokeWidth="1" />
          </svg>

          {/* Header */}
          <div
            className="flex items-center justify-between gap-3 flex-wrap mb-3 pb-3"
            style={{ borderBottom: `1px dashed ${ACCENT}22` }}
          >
            <div
              style={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Deviation Report
            </div>
            <div
              style={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#ef4444",
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.4)",
                transform: "rotate(-1.5deg)",
              }}
            >
              Under Review
            </div>
          </div>

          {/* Form rows */}
          <div
            className="grid gap-x-4 gap-y-3"
            style={{ gridTemplateColumns: "minmax(78px, auto) 1fr" }}
          >
            <Field label="Ref ID" mono>
              <span
                style={{
                  color: "#fff",
                  fontFamily: '"Geist Mono",monospace',
                }}
              >
                {pathname || "/unknown"}
              </span>
            </Field>
            <Field label="Status" mono>
              <span style={{ color: "#ef4444", fontWeight: 600 }}>
                NOT FOUND IN REGISTRY
              </span>
            </Field>
            <Field label="Severity" mono>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "1px 7px",
                  borderRadius: 3,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  fontFamily: '"Geist Mono",monospace',
                }}
              >
                Critical
              </span>
            </Field>
            <Field label="Framework" mono>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                21 CFR §11.10 — data integrity
              </span>
            </Field>
            <Field label="Last Seen" mono>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>—</span>
            </Field>
          </div>

          {/* Footer: handwritten + timestamp */}
          <div
            className="mt-4 pt-3 flex items-center justify-between gap-3 flex-wrap"
            style={{ borderTop: `1px dashed ${ACCENT}22` }}
          >
            <div
              style={{
                fontFamily: '"Caveat",cursive',
                fontSize: 18,
                color: ACCENT,
                transform: "rotate(-0.8deg)",
                lineHeight: 1,
              }}
            >
              flag for QA review →
            </div>
            <div
              style={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: 9.5,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.08em",
              }}
            >
              {timestamp}
            </div>
          </div>
        </motion.section>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.5 }}
          className="flex flex-wrap gap-3.5"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              padding: "17px 32px 17px 22px",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Geist",
              color: "#0a0f00",
              background: `linear-gradient(180deg, #d9f99d 0%, ${ACCENT} 55%, #84cc16 100%)`,
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 99,
              boxShadow: `0 18px 55px -12px ${ACCENT}cc, inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.15)`,
              letterSpacing: "-0.01em",
              textDecoration: "none",
            }}
          >
            <span
              className="absolute inset-0 pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
              }}
            />
            <span
              className="relative inline-flex items-center justify-center shrink-0"
              style={{
                width: 26,
                height: 26,
                borderRadius: 99,
                background: "rgba(0,0,0,0.18)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0a0f00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="relative">Return to main audit</span>
          </Link>

          <a
            href="mailto:prateek@citral.ai"
            className="inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              padding: "17px 26px 17px 20px",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "Geist",
              color: "#f5f5f0",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${ACCENT}38`,
              borderRadius: 99,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <span
              className="relative inline-flex items-center justify-center shrink-0"
              style={{
                width: 26,
                height: 26,
                borderRadius: 99,
                background: `${ACCENT}1e`,
                border: `1px solid ${ACCENT}55`,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <span>Contact support</span>
          </a>
        </motion.div>

        {/* Audit log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.8 }}
          className="mt-12 sm:mt-16 pt-5 flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{
            borderTop: `1px solid ${ACCENT}15`,
            fontFamily: '"Geist Mono",monospace',
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <span>Audit Log &middot; Entry 404</span>
          <span aria-hidden="true" style={{ color: `${ACCENT}60` }}>
            ·
          </span>
          <span>
            Hash <span style={{ color: `${ACCENT}99` }}>0x{hash}</span>
          </span>
          <span aria-hidden="true" style={{ color: `${ACCENT}60` }}>
            ·
          </span>
          <span>Citral AI Registry</span>
        </motion.div>
      </div>
    </main>
  );
}
