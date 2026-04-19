"use client";

import { useEffect, useState } from "react";

const FRAGMENTS = [
  "21 CFR §211.180",
  "ALCOA+",
  "EU GMP Annex 15",
  "Batch 0847",
  "Yield 94.2%",
  "PIC/S §5.43",
  "WHO TRS 986",
  "ID-2847",
  "Schedule M",
  "§211.188(b)",
  "97.3% match",
  "ALCOA Complete",
];

interface Fragment {
  id: number;
  text: string;
  left: number;
  duration: number;
  delay: number;
}

export default function FloatingFragments() {
  const [fragments, setFragments] = useState<Fragment[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
      left: Math.random() * 100,
      duration: 7 + Math.random() * 5,
      delay: i * 1.5,
    }));
    setFragments(initial);

    let nextId = initial.length;
    const interval = setInterval(() => {
      setFragments((prev) => {
        const newFrag = {
          id: nextId++,
          text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
          left: Math.random() * 100,
          duration: 7 + Math.random() * 5,
          delay: 0,
        };
        return [...prev.slice(-8), newFrag];
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fragments.map((f) => (
        <span
          key={f.id}
          className="absolute bottom-0 font-mono text-[10px] text-citral-teal/40 whitespace-nowrap"
          style={{
            left: `${f.left}%`,
            animation: `float-fragment ${f.duration}s ease-out ${f.delay}s forwards`,
          }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}
