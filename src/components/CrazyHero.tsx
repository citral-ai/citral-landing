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
              className="inline-flex items-center gap-2.5 transition-transform hover:-translate-y-px"
              style={{
                padding: "18px 32px",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "Geist",
                color: "#000",
                background: accent,
                border: "none",
                borderRadius: 99,
                cursor: "pointer",
                boxShadow: `0 16px 50px -10px ${accent}, inset 0 1px 0 rgba(255,255,255,0.4)`,
                textDecoration: "none",
              }}
            >
              <span style={{ color: "#000" }}>⚡</span> Get Beta Access →
            </a>
            <button
              onClick={() => {
                const el = document.querySelector("[data-open-modal]");
                if (el) (el as HTMLElement).click();
              }}
              className="inline-flex items-center"
              style={{
                padding: "18px 26px",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Geist",
                color: "#fff",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${accent}30`,
                borderRadius: 99,
                cursor: "pointer",
              }}
            >
              ▸ Watch Demo
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
