"use client";

const FINDINGS = [
  { s: "CRITICAL", c: "#ef4444", t: "Balance ID-2847 calibration expired", r: "§5.1.2" },
  { s: "WARNING", c: "#E8C84A", t: "Yield 94.2% below 95% spec", r: "§3.2.4" },
  { s: "WARNING", c: "#E8C84A", t: "Missing supervisor signature", r: "§4.3" },
  { s: "OK", c: "#84cc16", t: "Hardness, friability within spec", r: "§4.3.1" },
  { s: "OK", c: "#84cc16", t: "API weight verified", r: "§3.2.1" },
];

// Pre-computed widths (deterministic, no Math.random in render to avoid purity lints)
const PAPER_WIDTHS = Array.from({ length: 18 }, (_, i) => 60 + ((i * 13) % 35));

function PaperPage({ rotate, top, left }: { rotate: number; top: number; left: number }) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        width: 160,
        height: 200,
        background: "linear-gradient(168deg,#f5ecd8,#ede2c9)",
        borderRadius: 2,
        transform: `rotate(${rotate}deg)`,
        padding: 10,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ height: 4, background: "#c9bfa6", marginBottom: 6 }} />
      {PAPER_WIDTHS.map((w, i) => (
        <div
          key={i}
          style={{
            height: 3,
            background: "#c9bfa6",
            marginBottom: 4,
            width: `${w}%`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function BeforeAfter({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <section
      id="compare"
      className="relative z-[5] mx-auto"
      style={{ padding: "140px 32px", maxWidth: 1400 }}
    >
      <div className="text-center" style={{ marginBottom: 80 }}>
        <div
          style={{
            fontFamily: '"Geist Mono",monospace',
            fontSize: 11,
            letterSpacing: "0.24em",
            color: accent,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)" }}>[04/05]</span> Before vs After
        </div>
        <h2
          style={{
            fontFamily: "Geist",
            fontSize: "clamp(44px, 6.5vw, 88px)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "#fff",
            margin: 0,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>4 hours</span>{" "}
          <span style={{ fontFamily: '"Instrument Serif",serif', fontStyle: "italic" }}>→</span>{" "}
          <span style={{ color: accent }}>3 minutes</span>
        </h2>
      </div>

      <div className="ba-grid grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* BEFORE */}
        <div
          className="relative"
          style={{
            padding: 40,
            borderRadius: 20,
            minHeight: 480,
            background: "linear-gradient(145deg, rgba(239,68,68,0.05), rgba(0,0,0,0.5))",
            border: "1px solid rgba(239,68,68,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div
            style={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "#ef4444cc",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Before
          </div>
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 28,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            Manual review
          </div>

          <div className="relative" style={{ height: 280 }}>
            <PaperPage rotate={-4} top={10} left={20} />
            <PaperPage rotate={3} top={30} left={120} />
            <PaperPage rotate={-2} top={55} left={220} />
            <svg className="absolute inset-0 pointer-events-none">
              <path
                d="M 40 180 Q 120 160 200 200 T 350 180"
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
              <circle
                cx="160"
                cy="120"
                r="25"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.6"
              />
            </svg>
            <div
              className="absolute bottom-0 right-0"
              style={{
                padding: "10px 14px",
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.4)",
                borderRadius: 8,
                fontFamily: '"Geist Mono",monospace',
                fontSize: 11,
                color: "#fca5a5",
              }}
            >
              ⚠ 47 pages · 4 frameworks
            </div>
          </div>

          <div className="flex justify-between" style={{ marginTop: 28 }}>
            {[
              ["4–6h", "per BMR"],
              ["~12%", "miss rate"],
              ["$340", "per review"],
            ].map(([k, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "Geist",
                    fontSize: 30,
                    fontWeight: 600,
                    color: "#fca5a5",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: '"Geist Mono",monospace',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AFTER */}
        <div
          className="relative"
          style={{
            padding: 40,
            borderRadius: 20,
            minHeight: 480,
            background: `linear-gradient(145deg, ${accent}15, rgba(0,0,0,0.5))`,
            border: `1px solid ${accent}50`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: `0 0 80px ${accent}20`,
          }}
        >
          <div
            style={{
              fontFamily: '"Geist Mono",monospace',
              fontSize: 10,
              letterSpacing: "0.22em",
              color: accent,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            With Citral
          </div>
          <div
            style={{
              fontFamily: "Geist",
              fontSize: 28,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            Automated review
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              height: 280,
              borderRadius: 12,
              background: "rgba(0,0,0,0.5)",
              border: `1px solid ${accent}20`,
            }}
          >
            <div
              className="flex items-center gap-2.5"
              style={{ padding: "10px 14px", borderBottom: `1px solid ${accent}20` }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 99,
                  background: accent,
                  boxShadow: `0 0 10px ${accent}`,
                }}
              />
              <span
                style={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 10,
                  color: "#fff",
                }}
              >
                BMR-2024-0847.pdf
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 10,
                  color: accent,
                }}
              >
                2m 18s
              </span>
            </div>
            <div className="flex flex-col gap-2.5" style={{ padding: 16 }}>
              {FINDINGS.map((f, i) => (
                <div
                  key={f.t}
                  className="flex items-center gap-2.5"
                  style={{
                    padding: "8px 12px",
                    borderRadius: 6,
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid ${f.c}30`,
                    animation: `find-fade 0.6s ease-out ${i * 0.15}s both`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: f.c,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: `${f.c}22`,
                      fontFamily: '"Geist Mono",monospace',
                    }}
                  >
                    {f.s}
                  </span>
                  <span style={{ fontSize: 11, color: "#e5e7eb", flex: 1 }}>{f.t}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: '"Geist Mono",monospace',
                    }}
                  >
                    {f.r}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between" style={{ marginTop: 28 }}>
            {[
              ["2-3m", "per BMR"],
              ["99.4%", "accuracy"],
              ["$12", "per review"],
            ].map(([k, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "Geist",
                    fontSize: 30,
                    fontWeight: 600,
                    color: accent,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: '"Geist Mono",monospace',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px){ .ba-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
