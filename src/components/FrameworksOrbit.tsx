"use client";

const FRAMEWORKS = [
  { n: "USFDA", r: "21 CFR Part 211", c: "#ef4444" },
  { n: "EU GMP", r: "Annex 15", c: "#3b82f6" },
  { n: "PIC/S", r: "§5.43", c: "#f59e0b" },
  { n: "WHO", r: "TRS 986", c: "#10b981" },
  { n: "SCHEDULE M", r: "India CDSCO", c: "#8b5cf6" },
  { n: "ANVISA", r: "RDC 658", c: "#ec4899" },
  { n: "TGA", r: "Australia GMP", c: "#06b6d4" },
  { n: "PMDA", r: "Japan MHLW", c: "#f97316" },
];

export default function FrameworksOrbit({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <section
      id="frameworks"
      className="relative z-[5] mx-auto px-5 sm:px-8"
      style={{ padding: "clamp(80px, 12vw, 140px) 0", maxWidth: 1400 }}
    >
      <div
        className="fw-grid grid items-center"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 48px)" }}
      >
        <div>
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
            <span style={{ color: "rgba(255,255,255,0.3)" }}>[03/05]</span> Coverage
          </div>
          <h2
            style={{
              fontFamily: "Geist",
              fontSize: "clamp(44px, 6vw, 80px)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "#fff",
              margin: "0 0 24px",
            }}
          >
            One audit,
            <br />
            <span
              style={{
                fontFamily: '"Instrument Serif",serif',
                fontStyle: "italic",
                color: accent,
              }}
            >
              every
            </span>{" "}
            regulator.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              maxWidth: 480,
              marginBottom: 30,
            }}
          >
            Citral cross-references your BMR against every applicable framework
            simultaneously. No more re-running for each jurisdiction.
          </p>
          <div className="grid grid-cols-2 gap-3" style={{ maxWidth: 480 }}>
            {FRAMEWORKS.slice(0, 6).map((f) => (
              <div
                key={f.n}
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1px solid ${f.c}40`,
                }}
              >
                <div
                  style={{
                    fontFamily: "Geist",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {f.n}
                </div>
                <div
                  style={{
                    fontFamily: '"Geist Mono",monospace',
                    fontSize: 10,
                    color: `${f.c}cc`,
                    marginTop: 2,
                  }}
                >
                  {f.r}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orbit */}
        <div
          className="relative mx-auto w-full"
          style={{ aspectRatio: "1/1", maxWidth: "min(540px, 90vw)" }}
        >
          {/* Radial glow behind everything */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "20%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accent}18 0%, ${accent}08 40%, transparent 70%)`,
              filter: "blur(20px)",
            }}
          />

          {/* Concentric guideline rings — 5 total, varying weight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px dashed ${accent}30`,
              animation: "orb-spin 60s linear infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "7%",
              border: `1px solid ${accent}15`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "12%",
              border: `1px dashed ${accent}40`,
              animation: "orb-spin 40s linear infinite reverse",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "19%",
              border: `1px dotted ${accent}28`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "25%",
              border: `1px solid ${accent}20`,
              animation: "orb-spin 80s linear infinite",
            }}
          />

          {/* Crosshair axes — subtle guidelines through center */}
          <div
            className="absolute top-1/2 left-0 right-0 pointer-events-none"
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent 0%, ${accent}12 20%, ${accent}20 50%, ${accent}12 80%, transparent 100%)`,
              transform: "translateY(-50%)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0 pointer-events-none"
            style={{
              width: 1,
              background: `linear-gradient(180deg, transparent 0%, ${accent}12 20%, ${accent}20 50%, ${accent}12 80%, transparent 100%)`,
              transform: "translateX(-50%)",
            }}
          />

          {/* Outer pulsing scan ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "8%",
              border: `1.5px solid ${accent}`,
              opacity: 0,
              animation: "scan-pulse 3.6s ease-out infinite",
            }}
          />

          {/* Center — richer BMR node */}
          <div
            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              transform: "translate(-50%, -50%)",
              width: "clamp(132px, 32%, 168px)",
              height: "clamp(132px, 32%, 168px)",
              borderRadius: "50%",
              background: `
                radial-gradient(circle at 30% 28%, ${accent}50 0%, transparent 60%),
                radial-gradient(circle at 70% 75%, ${accent}25 0%, transparent 55%),
                linear-gradient(145deg, rgba(10,15,0,0.96), rgba(5,20,5,0.9))
              `,
              border: `1px solid ${accent}60`,
              boxShadow: `0 0 80px ${accent}35, inset 0 1px 0 ${accent}35, inset 0 -16px 32px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Inner scan-lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.15,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)",
              }}
            />
            {/* Soft moving sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, ${accent}20 45deg, transparent 90deg, transparent 360deg)`,
                animation: "orb-spin 10s linear infinite",
                mixBlendMode: "screen",
              }}
            />

            {/* Status pill */}
            <div
              className="relative inline-flex items-center gap-1.5 mb-2"
              style={{
                padding: "3px 9px",
                borderRadius: 99,
                background: `${accent}18`,
                border: `1px solid ${accent}55`,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 99,
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                  animation: "dot-pulse 1.2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 8.5,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: accent,
                  textTransform: "uppercase",
                }}
              >
                Live · Auditing
              </span>
            </div>

            {/* Label */}
            <div
              className="relative"
              style={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: 9,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
              }}
            >
              Batch Record
            </div>

            {/* BMR ID */}
            <div
              className="relative"
              style={{
                fontFamily: "Geist",
                fontSize: 28,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginTop: 4,
              }}
            >
              BMR-0847
            </div>

            {/* Meta */}
            <div
              className="relative flex items-center gap-2 mt-2"
              style={{
                fontFamily: '"Geist Mono",monospace',
                fontSize: 9,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              <span>8 FRAMEWORKS</span>
              <span style={{ color: `${accent}80` }}>·</span>
              <span>2m 18s</span>
            </div>
          </div>

          {/* Orbiting chips */}
          <div
            className="absolute inset-0"
            style={{ animation: "orb-spin 80s linear infinite" }}
          >
            {FRAMEWORKS.map((f, i) => {
              const angle = (i / FRAMEWORKS.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.sin(rad);
              const y = 50 - radius * Math.cos(rad);
              return (
                <div
                  key={f.n}
                  className="absolute"
                  style={{
                    top: `${y}%`,
                    left: `${x}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: 99,
                      background: "rgba(0,0,0,0.72)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: `1px solid ${f.c}60`,
                      whiteSpace: "nowrap",
                      boxShadow: `0 4px 20px ${f.c}30`,
                      animation: "orb-spin 80s linear infinite reverse",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '"Geist Mono",monospace',
                        fontSize: 10,
                        fontWeight: 700,
                        color: f.c,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {f.n}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px){ .fw-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
