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
      className="relative z-[5] mx-auto"
      style={{ padding: "140px 32px", maxWidth: 1400 }}
    >
      <div
        className="fw-grid grid gap-12 items-center"
        style={{ gridTemplateColumns: "1fr 1fr" }}
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
          style={{ aspectRatio: "1/1", maxWidth: 540 }}
        >
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
              inset: "12%",
              border: `1px dashed ${accent}40`,
              animation: "orb-spin 40s linear infinite reverse",
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
          {/* Center */}
          <div
            className="absolute top-1/2 left-1/2 grid place-items-center text-center"
            style={{
              transform: "translate(-50%, -50%)",
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accent}35, ${accent}05)`,
              border: `1px solid ${accent}60`,
              boxShadow: `0 0 60px ${accent}40`,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.2em",
                }}
              >
                CITRAL
              </div>
              <div
                style={{
                  fontFamily: "Geist",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#fff",
                  marginTop: 4,
                }}
              >
                BMR
              </div>
              <div
                style={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 9,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 2,
                }}
              >
                0847
              </div>
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
