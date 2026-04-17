"use client";

const FRAMEWORKS = [
  "USFDA",
  "EU GMP",
  "PIC/S",
  "WHO GMP",
  "Schedule M",
  "CDSCO",
  "TGA",
  "ANVISA",
  "PMDA",
  "SAHPRA",
  "HSA",
  "NPRA",
  "NAFDAC",
  "KFDA",
  "ICH Q9",
  "ALCOA+",
  "21 CFR \u00A711",
  "Annex 11",
];

export default function Marquee() {
  return (
    <section
      className="relative w-full overflow-hidden py-6"
      style={{
        borderTop: "1px solid rgba(0,194,168,0.12)",
        borderBottom: "1px solid rgba(0,194,168,0.12)",
        background: "rgba(6,22,20,0.5)",
      }}
    >
      {/* Label */}
      <p
        className="text-center font-mono uppercase mb-4 px-4"
        style={{
          fontSize: "10px",
          letterSpacing: "0.24em",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Trained on 60+ years of regulatory guidance
      </p>

      {/* Scrolling row */}
      <div className="relative flex overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(2,10,8,1) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(2,10,8,1) 0%, transparent 100%)",
          }}
        />

        <div
          className="flex shrink-0"
          style={{
            animation: "marquee-scroll 40s linear infinite",
          }}
        >
          {[...FRAMEWORKS, ...FRAMEWORKS].map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-5 font-mono"
              style={{
                fontSize: "14px",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#00C2A8" }}
              />
              {name}
            </span>
          ))}
        </div>
        <div
          className="flex shrink-0"
          style={{
            animation: "marquee-scroll 40s linear infinite",
          }}
        >
          {[...FRAMEWORKS, ...FRAMEWORKS].map((name, i) => (
            <span
              key={`dup-${i}`}
              className="flex items-center gap-2.5 shrink-0 px-5 font-mono"
              style={{
                fontSize: "14px",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#00C2A8" }}
              />
              {name}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
