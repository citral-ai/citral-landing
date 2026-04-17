"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

export default function WaitlistForm() {
  const [hover, setHover] = useState(false);

  const handleClick = async () => {
    if (supabase) {
      try {
        await supabase
          .from("waitlist_clicks")
          .insert({ source: "landing", clicked_at: new Date().toISOString() });
      } catch {
        // Silent fail
      }
    }
  };

  return (
    <a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative inline-flex items-center gap-2.5 pl-6 pr-5 py-2.5 text-[13px] sm:text-[14px] font-semibold rounded-full text-white transition-all duration-300 active:scale-[0.97] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(0,212,182,0.95) 0%, rgba(0,194,168,0.9) 50%, rgba(0,160,140,1) 100%)",
        boxShadow: hover
          ? "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(0,194,168,0.6), 0 4px 24px rgba(0,194,168,0.5), 0 20px 60px rgba(0,194,168,0.2)"
          : "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(0,194,168,0.4), 0 4px 16px rgba(0,194,168,0.25), 0 12px 40px rgba(0,194,168,0.1)",
      }}
    >
      {/* Shimmer sweep on hover */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: hover ? "-100% 0" : "200% 0",
          transition: "background-position 0.6s ease",
        }}
      />

      {/* Glow behind */}
      <span
        className="absolute inset-0 -z-10 rounded-full transition-opacity duration-500"
        style={{
          opacity: hover ? 0.7 : 0,
          background: "conic-gradient(from 0deg, #00C2A8, #00ffe0, #00C2A8, #009985, #00C2A8)",
          filter: "blur(28px)",
          transform: "scale(1.4)",
        }}
      />

      <span className="relative">Join Waitlist</span>
      <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:translate-x-0.5">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
