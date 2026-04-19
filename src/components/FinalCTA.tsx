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
          className="group relative inline-flex items-center gap-3 overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
          style={{
            padding: "20px 44px 20px 30px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "Geist",
            color: "#0a0f00",
            background: `linear-gradient(180deg, #d9f99d 0%, ${accent} 55%, #84cc16 100%)`,
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 99,
            cursor: "pointer",
            boxShadow: `0 22px 70px -14px ${accent}cc, inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.15)`,
            textDecoration: "none",
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
              width: 30,
              height: 30,
              borderRadius: 99,
              background: "rgba(0,0,0,0.18)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a0f00" aria-hidden="true">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </span>
          <span className="relative">Get Beta Access</span>
          <svg
            className="relative transition-transform duration-300 group-hover:translate-x-1"
            width="16"
            height="16"
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
          className="group relative inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            padding: "20px 36px 20px 24px",
            fontSize: 15,
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
            className="relative inline-flex items-center justify-center shrink-0"
            style={{
              width: 28,
              height: 28,
              borderRadius: 99,
              background: `${accent}1e`,
              border: `1px solid ${accent}55`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </span>
          <span>Talk to Sales</span>
        </button>
      </div>
    </section>
  );
}
