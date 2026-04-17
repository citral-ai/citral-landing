"use client";

const STEPS = [
  {
    num: "01",
    title: "Upload document",
    description:
      "Drag-and-drop any batch manufacturing record -- PDF, scanned image, or structured export.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M12 18v-6" />
        <path d="m9 15 3-3 3 3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Parse & structure",
    description:
      "AI extracts every field, table, signature block and cross-references the master template.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Audit against regulations",
    description:
      "Each finding is mapped to the specific clause of the applicable regulatory framework.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Review & resolve",
    description:
      "QA teams review flagged deviations, accept or dismiss findings, and generate the audit trail.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m16 11 2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16">
        <div className="flex-1">
          <p
            className="font-mono uppercase mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#00C2A8",
            }}
          >
            02 / How it works
          </p>
          <h2
            className="font-medium tracking-[-0.02em] text-white"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.08,
            }}
          >
            From submission to signed-off audit in{" "}
            <span className="font-serif italic text-citral-teal">
              four steps.
            </span>
          </h2>
        </div>
        <div className="lg:max-w-sm">
          <p
            className="leading-relaxed"
            style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)" }}
          >
            Every batch record follows the same repeatable, auditable pipeline
            -- from raw document to regulatory-grade findings in minutes.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        className="max-w-7xl mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "rgba(0,194,168,0.06)",
          border: "1px solid rgba(0,194,168,0.1)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px" style={{ background: "rgba(0,194,168,0.08)" }}>
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="group flex flex-col gap-4 p-6 sm:p-8 transition-colors duration-300 hover:bg-[rgba(0,194,168,0.04)]"
              style={{ background: "#061614" }}
            >
              {/* Step number */}
              <span
                className="font-mono"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                {step.num}
              </span>

              {/* Icon */}
              <div
                className="flex items-center justify-center w-11 h-11 rounded-lg"
                style={{
                  background: "rgba(0,194,168,0.08)",
                  border: "1px solid rgba(0,194,168,0.15)",
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className="font-semibold text-white"
                style={{ fontSize: "17px" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="leading-relaxed"
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
