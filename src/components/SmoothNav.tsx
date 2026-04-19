"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BETA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

const LINKS = [
  { id: "process", label: "Process" },
  { id: "frameworks", label: "Coverage" },
  { id: "compare", label: "Compare" },
  { id: "cta", label: "Beta" },
];

export default function SmoothNav({ accent = "#84cc16" }: { accent?: string }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      for (const lnk of LINKS) {
        const el = document.getElementById(lnk.id);
        if (el && el.getBoundingClientRect().top < 200) cur = lnk.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 py-[10px] pl-[18px] pr-[10px] rounded-full transition-[padding,width] duration-300"
      style={{
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${accent}25`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Logo: wordmark unscrolled, C icon scrolled */}
      <a href="#top" className="flex items-center mr-2 shrink-0" aria-label="Citral home">
        {scrolled ? (
          <Image
            src="/icon-only.png"
            alt="Citral"
            width={210}
            height={286}
            className="h-[22px] w-auto"
            priority
          />
        ) : (
          <Image
            src="/logo.png"
            alt="Citral"
            width={1993}
            height={882}
            className="h-[18px] w-auto"
            priority
          />
        )}
      </a>

      {/* Links */}
      <div className="hidden sm:flex items-center gap-1">
        {LINKS.map((lnk) => {
          const isActive = active === lnk.id;
          return (
            <a
              key={lnk.id}
              href={`#${lnk.id}`}
              onClick={(e) => click(e, lnk.id)}
              className="transition-colors duration-200"
              style={{
                padding: "7px 14px",
                fontSize: 12,
                fontWeight: 500,
                color: isActive ? "#000" : "rgba(255,255,255,0.75)",
                background: isActive ? accent : "transparent",
                borderRadius: 99,
                textDecoration: "none",
              }}
            >
              {lnk.label}
            </a>
          );
        })}
      </div>

      {/* Beta Access CTA */}
      <a
        href={BETA_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 shrink-0 transition-transform hover:-translate-y-px"
        style={{
          padding: "9px 18px",
          fontSize: 12,
          fontWeight: 700,
          color: "#000",
          background: accent,
          borderRadius: 99,
          textDecoration: "none",
          boxShadow: `0 0 24px -6px ${accent}`,
        }}
      >
        Beta Access
      </a>
    </nav>
  );
}
