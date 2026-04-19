"use client";

const BETA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

export default function FinalCTA({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <section
      id="cta"
      className="relative z-[5] mx-auto text-center"
      style={{ padding: "160px 32px 100px", maxWidth: 1400 }}
    >
      <div
        style={{
          fontFamily: '"Geist Mono",monospace',
          fontSize: 11,
          letterSpacing: "0.24em",
          color: accent,
          marginBottom: 32,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.3)" }}>[05/05]</span> Get Started
      </div>

      <h2
        style={{
          fontFamily: "Geist",
          fontSize: "clamp(56px, 10vw, 180px)",
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: "-0.045em",
          color: "#fff",
          margin: "0 0 40px",
        }}
      >
        Audit
        <br />
        <span
          style={{
            fontFamily: '"Instrument Serif",serif',
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${accent} 0%, #fff 50%, ${accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "cta-shimmer 6s linear infinite",
            backgroundSize: "200% auto",
          }}
        >
          defensibly.
        </span>
      </h2>

      <p
        className="mx-auto"
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.55)",
          maxWidth: 520,
          margin: "0 auto 50px",
          lineHeight: 1.6,
        }}
      >
        Join the private beta. Onboard your QA team in under a week.
      </p>

      <div className="flex justify-center flex-wrap gap-4">
        <a
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 transition-transform hover:-translate-y-px"
          style={{
            padding: "20px 44px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Geist",
            color: "#000",
            background: accent,
            border: "none",
            borderRadius: 99,
            cursor: "pointer",
            boxShadow: `0 20px 60px -12px ${accent}, inset 0 1px 0 rgba(255,255,255,0.4)`,
            textDecoration: "none",
          }}
        >
          ⚡ Get Beta Access →
        </a>
        <a
          href="mailto:prateek@citral.ai"
          className="inline-flex items-center"
          style={{
            padding: "20px 36px",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "Geist",
            color: "#fff",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${accent}30`,
            borderRadius: 99,
            textDecoration: "none",
          }}
        >
          prateek@citral.ai
        </a>
      </div>
    </section>
  );
}
