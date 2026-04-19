"use client";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/citral.ai" },
  { label: "LinkedIn", href: "https://linkedin.com/company/citral-ai" },
  { label: "X", href: "https://twitter.com/citralai" },
  { label: "prateek@citral.ai", href: "mailto:prateek@citral.ai" },
];

export default function CrazyFooter({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <footer
      className="relative z-[5] mx-auto"
      style={{
        padding: "60px 32px 40px",
        maxWidth: 1400,
        borderTop: `1px solid ${accent}15`,
      }}
    >
      <div
        className="select-none"
        style={{
          fontFamily: "Geist",
          fontSize: "clamp(80px, 14vw, 240px)",
          fontWeight: 500,
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: `1px ${accent}50`,
          marginBottom: 40,
        }}
      >
        CITRAL
        <span style={{ color: accent, WebkitTextStroke: 0 }}>.</span>
      </div>

      <div
        className="flex flex-wrap justify-between gap-5"
        style={{
          fontFamily: '"Geist Mono",monospace',
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        <div>© 2026 Citral AI · All rights reserved</div>
        <div className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ color: "inherit", textDecoration: "none" }}
              className="hover:text-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
