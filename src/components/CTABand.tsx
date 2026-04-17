"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

export default function CTABand() {
  const [hover, setHover] = useState(false);

  const handleClick = async () => {
    if (supabase) {
      try {
        await supabase
          .from("waitlist_clicks")
          .insert({ source: "cta_band", clicked_at: new Date().toISOString() });
      } catch {
        // Silent fail
      }
    }
  };

  return (
    <section className="relative w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
      <div
        className="relative max-w-7xl mx-auto overflow-hidden"
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(0,194,168,0.18)",
          background: "#061614",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(0,194,168,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,194,168,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,168,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 py-16 sm:py-20">
          <h2
            className="font-medium tracking-[-0.02em] text-white max-w-2xl mb-5"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.12,
            }}
          >
            Move compliance from{" "}
            <span className="font-serif italic text-citral-teal">
              bottleneck to backbone.
            </span>
          </h2>
          <p
            className="max-w-lg mb-10 leading-relaxed"
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Partnering with leading pharmaceutical manufacturers ahead of
            general availability in Q2 2026.
          </p>

          {/* Button */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group relative inline-flex items-center gap-2.5 pl-6 pr-5 py-2.5 text-[13px] sm:text-[14px] font-semibold rounded-full text-white transition-all duration-300 active:scale-[0.97] overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,212,182,0.95) 0%, rgba(0,194,168,0.9) 50%, rgba(0,160,140,1) 100%)",
              boxShadow: hover
                ? "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(0,194,168,0.6), 0 4px 24px rgba(0,194,168,0.5), 0 20px 60px rgba(0,194,168,0.2)"
                : "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 0 0 1px rgba(0,194,168,0.4), 0 4px 16px rgba(0,194,168,0.25), 0 12px 40px rgba(0,194,168,0.1)",
            }}
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                backgroundPosition: hover ? "-100% 0" : "200% 0",
                transition: "background-position 0.6s ease",
              }}
            />
            <span className="relative z-10">Join Waitlist</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
