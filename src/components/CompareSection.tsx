"use client";

const MANUAL_ITEMS = [
  "4--6 hours per batch record, per reviewer",
  "Inconsistent interpretation across QA staff",
  "Paper-based findings with no traceability",
  "Regulatory updates missed for weeks",
  "Audit trails reconstructed after the fact",
];

const CITRAL_ITEMS = [
  "Full BMR audit in 2--3 minutes",
  "Deterministic rule engine -- same input, same output",
  "Every finding cites the exact source line",
  "Regulatory corpus updated continuously",
  "Immutable, timestamped audit trail from day one",
];

export default function CompareSection() {
  return (
    <section className="relative w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p
            className="font-mono uppercase mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#00C2A8",
            }}
          >
            04 / Why Citral
          </p>
          <h2
            className="font-medium tracking-[-0.02em] text-white max-w-3xl"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.08,
            }}
          >
            The legacy approach. And the Citral approach.
          </h2>
        </div>

        {/* Comparison */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,194,168,0.1)",
            background: "rgba(0,194,168,0.06)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(0,194,168,0.08)" }}>
            {/* Manual side */}
            <div
              className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6"
              style={{ background: "#061614" }}
            >
              <h3
                className="font-semibold flex items-center gap-2"
                style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                  style={{
                    background: "rgba(255,80,80,0.08)",
                    border: "1px solid rgba(255,80,80,0.15)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="rgba(255,80,80,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                Manual QA Review
              </h3>
              <ul className="flex flex-col gap-4">
                {MANUAL_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5"
                      style={{
                        background: "rgba(255,80,80,0.06)",
                        border: "1px solid rgba(255,80,80,0.12)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="rgba(255,80,80,0.5)" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span
                      className="line-through"
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,80,80,0.45)",
                        textDecorationColor: "rgba(255,80,80,0.25)",
                        opacity: 0.7,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citral side */}
            <div
              className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6"
              style={{ background: "#061614" }}
            >
              <h3
                className="font-semibold flex items-center gap-2 text-white"
                style={{ fontSize: "16px" }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                  style={{
                    background: "rgba(0,194,168,0.1)",
                    border: "1px solid rgba(0,194,168,0.2)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5L5 9l4.5-6" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                With Citral AI
              </h3>
              <ul className="flex flex-col gap-4">
                {CITRAL_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5"
                      style={{
                        background: "rgba(0,194,168,0.08)",
                        border: "1px solid rgba(0,194,168,0.15)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5.5L4 7.5 8 3" stroke="#00C2A8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
