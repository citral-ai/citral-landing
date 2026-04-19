"use client";

import PaperDoc from "./PaperDoc";

const BETA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

function TextRail({
  text,
  accent,
  reverse = false,
  size = 80,
}: {
  text: string;
  accent: string;
  reverse?: boolean;
  size?: number;
}) {
  const repeated = Array(6).fill(text);
  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{
        padding: "6px 0",
        borderTop: `1px solid ${accent}22`,
        borderBottom: `1px solid ${accent}22`,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="inline-flex"
        style={{
          gap: 40,
          animation: `rail-scroll 40s linear infinite${reverse ? " reverse" : ""}`,
          fontFamily: '"Instrument Serif",serif',
          fontSize: size,
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            style={{
              color: i % 2 === 0 ? "transparent" : "#fff",
              WebkitTextStroke: i % 2 === 0 ? `1px ${accent}55` : "0",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LiveStats({ accent }: { accent: string }) {
  const STATS = [
    { k: "99.4%", l: "Citation accuracy" },
    { k: "2.3m", l: "Avg. per BMR" },
    { k: "15", l: "Frameworks" },
    { k: "0", l: "Missed findings" },
  ];
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-6"
      style={{ maxWidth: 560 }}
    >
      {STATS.map((s) => (
        <div key={s.l} style={{ borderLeft: `1px solid ${accent}30`, paddingLeft: 14 }}>
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 28,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {s.k}
          </div>
          <div
            style={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: 10,
              color: `${accent}cc`,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginTop: 4,
            }}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CrazyHero({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <section
      id="top"
      className="relative z-[5]"
      style={{ minHeight: "110vh", paddingTop: 140, paddingBottom: 60 }}
    >
      {/* Eyebrow */}
      <div className="mx-auto px-8" style={{ maxWidth: 1400 }}>
        <div
          className="inline-flex items-center gap-2.5"
          style={{
            padding: "7px 14px",
            borderRadius: 99,
            fontFamily: '"Geist Mono",monospace',
            fontSize: 10.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: accent,
            background: `${accent}10`,
            border: `1px solid ${accent}40`,
            marginBottom: 30,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 99,
              background: accent,
              boxShadow: `0 0 14px ${accent}`,
            }}
          />
          Private Beta &middot; Q2 2026
        </div>
      </div>

      {/* Headline */}
      <div className="mx-auto px-8" style={{ maxWidth: 1400, marginBottom: 40 }}>
        <h1
          className="m-0"
          style={{
            fontFamily: "Geist",
            fontSize: "clamp(56px, 9vw, 160px)",
            fontWeight: 500,
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            color: "#fff",
          }}
        >
          We catch what
          <br />
          <span
            style={{
              fontFamily: '"Instrument Serif",serif',
              fontStyle: "italic",
              fontWeight: 400,
              background: `linear-gradient(135deg, ${accent} 0%, #fff 70%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            humans miss
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "clamp(14px, 1.6vw, 28px)",
              height: "clamp(14px, 1.6vw, 28px)",
              background: accent,
              borderRadius: 3,
              marginLeft: 12,
              marginBottom: "0.1em",
              verticalAlign: "baseline",
              boxShadow: `0 0 24px ${accent}`,
            }}
          />
        </h1>
      </div>

      {/* Full-bleed outlined italic rail */}
      <TextRail text="BMR · audit · deviation · batch · ALCOA+ · " accent={accent} size={80} />

      {/* Grid: desc/stats + paper */}
      <div
        className="hero-main mx-auto px-8"
        style={{
          maxWidth: 1400,
          marginTop: 60,
          display: "grid",
          gridTemplateColumns: "1fr 520px",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            Citral reviews batch records, validation protocols, and deviation reports
            end-to-end &mdash; surfacing every missed signature, expired calibration,
            and out-of-spec value with{" "}
            <strong style={{ color: "#fff", fontWeight: 500 }}>
              a verified citation to the source line
            </strong>
            .
          </p>

          <div className="flex flex-wrap gap-3.5" style={{ marginBottom: 50 }}>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                padding: "17px 32px 17px 22px",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "Geist",
                color: "#0a0f00",
                background: `linear-gradient(180deg, #d9f99d 0%, ${accent} 55%, #84cc16 100%)`,
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 99,
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: `0 18px 55px -12px ${accent}cc, 0 0 0 0 ${accent}00, inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.15)`,
                letterSpacing: "-0.01em",
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a0f00" aria-hidden="true">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
              </span>
              <span className="relative">Get Beta Access</span>
              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-1"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <button
              onClick={() => {
                const el = document.querySelector("[data-open-modal]");
                if (el) (el as HTMLElement).click();
              }}
              className="group relative inline-flex items-center gap-3 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                padding: "17px 28px 17px 20px",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Geist",
                color: "#f5f5f0",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${accent}38`,
                borderRadius: 99,
                cursor: "pointer",
                letterSpacing: "-0.01em",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <span
                className="relative inline-flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:brightness-125"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 99,
                  background: `${accent}1e`,
                  border: `1px solid ${accent}55`,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill={accent} aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="relative">Watch Demo</span>
            </button>
          </div>

          <LiveStats accent={accent} />
        </div>

        <div className="flex justify-center">
          <div style={{ transform: "scale(0.95)" }}>
            <PaperDoc />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-main { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
