"use client";

const MOLECULES = [
  { x: 8, y: 15, s: 0.7, rot: -20, dur: 25 },
  { x: 85, y: 25, s: 1.1, rot: 35, dur: 32 },
  { x: 12, y: 65, s: 0.9, rot: 15, dur: 28 },
  { x: 78, y: 75, s: 0.8, rot: -45, dur: 30 },
  { x: 50, y: 45, s: 0.5, rot: 80, dur: 40 },
];

export default function FloatingMolecules({ accent = "#84cc16" }: { accent?: string }) {
  return (
    <div
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ opacity: 0.35 }}
      aria-hidden="true"
    >
      {MOLECULES.map((m, i) => (
        <svg
          key={i}
          width={80 * m.s}
          height={80 * m.s}
          viewBox="0 0 80 80"
          style={{
            position: "absolute",
            left: `${m.x}%`,
            top: `${m.y}%`,
            animation: `mol-float ${m.dur}s ease-in-out ${i * 2}s infinite`,
            transform: `rotate(${m.rot}deg)`,
          }}
        >
          <defs>
            <filter id={`mol-glow-${i}`}>
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>
          <g stroke={accent} strokeWidth="1" fill="none" opacity="0.6">
            <line x1="20" y1="20" x2="40" y2="40" />
            <line x1="40" y1="40" x2="60" y2="20" />
            <line x1="40" y1="40" x2="40" y2="65" />
            <line x1="40" y1="65" x2="60" y2="75" />
            <line x1="40" y1="65" x2="20" y2="75" />
          </g>
          <g fill={accent} filter={`url(#mol-glow-${i})`}>
            <circle cx="20" cy="20" r="3" />
            <circle cx="40" cy="40" r="4" />
            <circle cx="60" cy="20" r="3" />
            <circle cx="40" cy="65" r="3.5" />
            <circle cx="60" cy="75" r="2.5" />
            <circle cx="20" cy="75" r="2.5" />
          </g>
        </svg>
      ))}
    </div>
  );
}
