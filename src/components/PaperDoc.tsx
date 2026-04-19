"use client";

import React from "react";

/**
 * PaperDoc — Realistic pharmaceutical Batch Manufacturing Record (BMR)
 *
 * Fonts 'Caveat' and 'Courier Prime' are loaded via next/font/google
 * in layout.tsx as CSS variables --font-caveat and --font-courier-prime.
 */

/* ------------------------------------------------------------------ */
/*  SVG sub-components                                                 */
/* ------------------------------------------------------------------ */

const PaperClip = () => (
  <svg
    className="absolute -top-4 -left-3 z-20"
    width="38"
    height="68"
    viewBox="0 0 38 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M20 4C20 2.5 18.5 1 17 1C15.5 1 14 2.5 14 4V52C14 56.5 17 60 21 60C25 60 28 56.5 28 52V14C28 12.5 26.5 11 25 11C23.5 11 22 12.5 22 14V48"
      stroke="#8a8a8a"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const HandArrow = () => (
  <svg
    width="38"
    height="22"
    viewBox="0 0 38 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="inline-block ml-1"
  >
    <path
      d="M2 18C8 14 18 8 34 4"
      stroke="#1b3a7a"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M28 2L35 4L30 9"
      stroke="#1b3a7a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CircleMark = () => (
  <svg
    className="absolute -inset-2 pointer-events-none"
    viewBox="0 0 80 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <ellipse
      cx="40"
      cy="16"
      rx="36"
      ry="14"
      stroke="#c03a2b"
      strokeWidth="1.6"
      strokeDasharray="4 2"
      fill="none"
      opacity="0.7"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Noise texture filter (inline SVG for paper grain)                  */
/* ------------------------------------------------------------------ */

const NoiseFilter = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.045]" aria-hidden>
    <filter id="paperNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#paperNoise)" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Sticky Note                                                        */
/* ------------------------------------------------------------------ */

const StickyNote = ({
  color,
  tapeColor,
  label,
  children,
  className,
  rotate,
}: {
  color: string;
  tapeColor: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}) => (
  <div
    className={`absolute z-30 hidden lg:block ${className ?? ""}`}
    style={{ transform: rotate ?? "rotate(2deg)" }}
  >
    {/* tape strip */}
    <div
      className="mx-auto h-[10px] w-16 rounded-sm opacity-70"
      style={{ background: tapeColor }}
    />
    <div
      className="px-3 py-2 rounded-sm shadow-md"
      style={{
        background: `linear-gradient(135deg, ${color.split(",")[0]}, ${color.split(",")[1]})`,
        minWidth: 150,
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-wider mb-1"
        style={{ color: "#5a4e2e", fontFamily: "var(--font-courier-prime), 'Courier New', monospace" }}
      >
        {label}
      </p>
      <div
        className="text-[11px] leading-snug"
        style={{ color: "#3b3520", fontFamily: "var(--font-caveat), cursive" }}
      >
        {children}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  AI Review Card                                                     */
/* ------------------------------------------------------------------ */

const ReviewItem = ({
  severity,
  color,
  text,
  cite: refText,
}: {
  severity: string;
  color: string;
  text: string;
  cite: string;
}) => (
  <div className="flex gap-2 items-start">
    <span
      className="mt-0.5 shrink-0 text-[9px] font-bold uppercase px-1.5 py-[1px] rounded"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {severity}
    </span>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-200 leading-snug">{text}</p>
      <p className="text-[9px] text-gray-500 mt-0.5 font-mono">{refText}</p>
    </div>
  </div>
);

const AIReviewCard = () => (
  <div
    className="absolute -bottom-16 -right-10 z-40 hidden lg:block animate-slideIn"
    style={{ transform: "rotate(2deg)" }}
  >
    <div
      className="rounded-lg shadow-2xl border overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #111714, #0d1210)",
        borderColor: "#1a3a30",
        width: 290,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#1a3a30" }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-semibold text-emerald-300 tracking-wide">
          Citral Review
        </span>
        <span className="ml-auto text-[10px] text-gray-500 font-mono">2m 18s</span>
      </div>

      {/* Items */}
      <div className="px-3 py-2.5 space-y-2.5">
        <ReviewItem
          severity="Critical"
          color="#EF4444"
          text="Calibration expired \u00b7 Balance ID-2847"
          cite="\u00a75.1.2 \u00b7 pg. 28 \u00b7 21 CFR \u00a7211.68(a)"
        />
        <ReviewItem
          severity="Warning"
          color="#E8C84A"
          text="Yield 94.2% below 95% spec"
          cite="\u00a73.2.4 \u00b7 pg. 12 \u00b7 SOP-QA-0042"
        />
        <ReviewItem
          severity="Warning"
          color="#E8C84A"
          text="Missing supervisor signature"
          cite="\u00a74.3 \u00b7 SOP-MFG-0101"
        />
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main PaperDoc Component                                            */
/* ------------------------------------------------------------------ */

export default function PaperDoc() {
  const ink = "#1a1814";
  const dimInk = "#5a5446";
  const blue = "#1b3a7a";
  const red = "#c03a2b";

  const mono: React.CSSProperties = {
    fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
    color: ink,
  };

  const hand: React.CSSProperties = {
    fontFamily: "var(--font-caveat), cursive",
  };

  return (
    <div className="relative select-none" style={{ perspective: 900 }}>
      {/* ---- Sticky Notes ---- */}
      <StickyNote
        color="#fff6a6,#f3e18b"
        tapeColor="#e8d566"
        label="QA Memo"
        className="-top-10 -right-16 max-[1200px]:-right-6"
        rotate="rotate(3deg)"
      >
        <p className="text-[13px] font-bold">
          Balance cert. overdue by{" "}
          <span className="underline decoration-wavy decoration-red-600">395 d</span> !!
        </p>
      </StickyNote>

      <StickyNote
        color="#b9ead8,#9cd9c5"
        tapeColor="#6ec4a2"
        label="Action"
        className="-bottom-8 -left-20 max-[1200px]:-left-8"
        rotate="rotate(-2.5deg)"
      >
        <p className="text-[13px]">
          open <span className="font-bold">CAPA-212</span> by Fri 17th
        </p>
      </StickyNote>

      {/* ---- Paper ---- */}
      <div
        className="relative rounded-sm overflow-hidden transition-transform duration-500 ease-out
                    px-6 py-5 sm:px-8 sm:py-7 max-[560px]:px-4 max-[560px]:py-4
                    max-lg:!transform-none"
        style={{
          background: "linear-gradient(168deg, #f5ecd8 0%, #ede2c9 100%)",
          boxShadow:
            "0 2px 6px rgba(0,0,0,0.09), 0 8px 24px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.35)",
          transform: "rotate(-1.2deg)",
          maxWidth: 520,
          width: "100%",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-0.3deg)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-1.2deg)")}
      >
        <NoiseFilter />
        <PaperClip />

        {/* ---- STAMP ---- */}
        <div
          className="absolute top-4 right-4 z-10 px-2.5 py-1 max-[560px]:px-1.5 max-[560px]:py-0.5 max-[560px]:text-[8px]"
          style={{
            color: red,
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: "0.16em",
            transform: "rotate(-8deg)",
            border: `2.5px double ${red}`,
            opacity: 0.85,
            fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
          }}
        >
          UNDER REVIEW
        </div>

        {/* ---- HEADER ---- */}
        <div className="relative z-10 flex justify-between items-start gap-4 mb-4">
          <div>
            <h3
              className="text-[13px] font-bold uppercase max-[560px]:text-[11px]"
              style={{ ...mono, letterSpacing: "0.14em" }}
            >
              Batch Manufacturing Record
            </h3>
            <p className="text-[10px] mt-0.5" style={{ ...mono, color: dimInk }}>
              Form QA-BMR-04 &middot; Rev. 3 &middot; Sheet 12 of 47
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px]" style={{ ...mono, color: dimInk }}>
              Ref: <span style={{ color: ink }}>BMR-2024-0847</span>
            </p>
            <p className="text-[10px]" style={{ ...mono, color: dimInk }}>
              Prod: <span style={{ color: ink }}>Tab. Losartan 50mg</span>
            </p>
            <p className="text-[10px]" style={{ ...mono, color: dimInk }}>
              Date: <span style={{ color: ink }}>14 FEB 2026</span>
            </p>
          </div>
        </div>

        {/* ---- Divider ---- */}
        <div className="relative z-10 border-t mb-3" style={{ borderColor: "#c9bfa6" }} />

        {/* ---- META GRID ---- */}
        <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-1 mb-4">
          {[
            ["Batch Size", "100,000 tabs"],
            ["Line", "Tab-04 / Room 3B"],
            ["Start", "08:14"],
            ["End", "17:42"],
          ].map(([label, val]) => (
            <div key={label} className="flex gap-1.5 text-[10px]" style={mono}>
              <span style={{ color: dimInk }}>{label}:</span>
              <span>{val}</span>
            </div>
          ))}
        </div>

        {/* ---- SECTION 3.2 ---- */}
        <Section title="3.2 &mdash; Dispensing Record">
          <Row
            id="3.2.1"
            left={
              <>
                API &mdash; Losartan Potassium, 50.00&thinsp;mg/unit
              </>
            }
            right={<>Wt. verified <Check /></>}
          />
          <Row
            id="3.2.4"
            left={
              <span className="relative">
                Batch yield recorded:{" "}
                <span className="relative inline-block">
                  <span
                    className="px-1 rounded-sm"
                    style={{ background: "#f8e26a", color: ink, fontWeight: 700 }}
                  >
                    94.2%
                  </span>
                  <CircleMark />
                </span>{" "}
                <span style={{ color: dimInk }}>(spec &ge; 95.0%)</span>
              </span>
            }
            right={<>RS &middot; 14:08</>}
          />
        </Section>

        {/* ---- SECTION 5.1 ---- */}
        <Section title="5.1 &mdash; Equipment Calibration">
          <Row
            id="5.1.1"
            left={<>Balance ID-2846 &middot; Last cal. 2025-11-02 <Check /></>}
            right={
              <span className="text-[10px] font-bold" style={{ color: "#2e7d32" }}>
                VALID
              </span>
            }
          />
          <Row
            id="5.1.2"
            left={
              <>
                Balance ID-2847 &middot; Last cal.{" "}
                <span className="relative inline-block">
                  <span>2024-01-15</span>
                  {/* strikethrough red line */}
                  <span
                    className="absolute left-0 right-0 top-1/2"
                    style={{ height: 1.5, background: red, transform: "rotate(-2deg)" }}
                  />
                </span>
              </>
            }
            right={
              <span className="text-[10px] font-bold" style={{ color: red }}>
                EXPIRED
              </span>
            }
          />
        </Section>

        {/* ---- SECTION 4.3 ---- */}
        <Section title="4.3 &mdash; In-Process Control Log">
          <Row
            id="4.3.1"
            left={<>Hardness, thickness, friability &mdash; within spec</>}
            right={
              <span className="text-[10px] font-bold" style={{ color: "#2e7d32" }}>
                OK
              </span>
            }
          />
          <Row
            id="4.3.2"
            left={<>Dual sign-off &mdash; operator + supervisor</>}
            right={
              <span className="text-[10px] font-bold" style={{ color: "#b8860b" }}>
                &#9888; incomplete
              </span>
            }
          />
        </Section>

        {/* ---- SIGNATURES ---- */}
        <div
          className="relative z-10 grid grid-cols-2 gap-6 mt-4 pt-3 border-t"
          style={{ borderColor: "#c9bfa6" }}
        >
          <div>
            <p className="text-[9px] uppercase tracking-wider mb-1" style={{ ...mono, color: dimInk }}>
              Operator Sign-off
            </p>
            <p
              className="text-[18px] italic"
              style={{ ...hand, color: blue }}
            >
              R. Sharma
            </p>
            <p className="text-[9px]" style={{ ...mono, color: dimInk }}>
              ID 2041 &middot; 14 FEB 17:45
            </p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider mb-1" style={{ ...mono, color: dimInk }}>
              Supervisor Sign-off
            </p>
            <p
              className="text-[16px] italic"
              style={{ ...hand, color: red, opacity: 0.8 }}
            >
              &mdash; not signed &mdash;
            </p>
            <p className="text-[9px]" style={{ ...mono, color: dimInk }}>
              Required per SOP-MFG-0101
            </p>
          </div>
        </div>

        {/* ---- HANDWRITTEN NOTES ---- */}
        <span
          className="absolute z-20 text-[13px] italic"
          style={{
            ...hand,
            color: blue,
            bottom: "38%",
            right: "6%",
            transform: "rotate(-3deg)",
          }}
        >
          check SOP-QA-0042
          <HandArrow />
        </span>

        <span
          className="absolute z-20 text-[12px] italic"
          style={{
            ...hand,
            color: red,
            bottom: "8%",
            right: "12%",
            transform: "rotate(2deg)",
          }}
        >
          follow-up w/ Supv.
        </span>
      </div>

      {/* ---- AI Review Card ---- */}
      <AIReviewCard />

      {/* ---- Keyframes ---- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pdSlideIn {
          0% { opacity: 0; transform: rotate(2deg) translateY(18px); }
          100% { opacity: 1; transform: rotate(2deg) translateY(0); }
        }
        .animate-slideIn { animation: pdSlideIn 0.7s ease-out 0.5s both; }
      `}} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 mb-3">
      <p
        className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
        style={{
          fontFamily: "var(--font-courier-prime), 'Courier New', monospace",
          color: "#1a1814",
          letterSpacing: "0.08em",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({
  id,
  left,
  right,
}: {
  id: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-between items-baseline gap-3 text-[10px] leading-relaxed pl-3"
      style={{ fontFamily: "var(--font-courier-prime), 'Courier New', monospace", color: "#1a1814" }}
    >
      <span className="min-w-0">
        <span style={{ color: "#5a5446" }}>{id}</span>&ensp;{left}
      </span>
      <span className="shrink-0 text-right">{right}</span>
    </div>
  );
}

function Check() {
  return (
    <span className="text-[11px] font-bold" style={{ color: "#2e7d32" }}>
      &#10003;
    </span>
  );
}
