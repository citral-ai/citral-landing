"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 hidden sm:flex items-center justify-between px-6 sm:px-9 py-[22px] transition-[border-color] duration-300 ${
          scrolled ? "border-b border-[rgba(0,194,168,0.12)]" : "border-b border-transparent"
        }`}
        style={{
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          background: "linear-gradient(180deg, rgba(2,10,8,0.78), rgba(2,10,8,0.1))",
        }}
      >
        {/* Left: logo + tag */}
        <div className="flex items-center gap-4">
          <Image src="/icon-only.png" alt="Citral AI" width={210} height={286} className="h-[22px] w-auto" />
          <span className="hidden md:block pl-3.5 border-l border-[rgba(0,194,168,0.12)] font-mono text-[10px] tracking-[0.16em] uppercase text-[#4f6963]">
            Pharma Compliance AI
          </span>
        </div>

        {/* Center: anchor links */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-7">
          {["Platform", "How it works", "Why Citral"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative text-[13px] text-[#8aa69d] tracking-[0.01em] hover:text-[#eafff8] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-citral-teal after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right: contact + waitlist */}
        <div className="flex items-center gap-3.5">
          <button
            data-open-modal
            onClick={() => setContactOpen(true)}
            className="text-[13px] text-[#8aa69d] hover:text-[#eafff8] transition-colors duration-200"
          >
            Contact
          </button>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-[18px] py-[9px] rounded-full bg-[#eafff8] text-[#020a08] hover:shadow-[0_0_0_4px_rgba(234,255,248,0.1)] transition-shadow duration-200"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Mobile: contact button */}
      <button
        onClick={() => setContactOpen(true)}
        className="fixed top-3.5 right-4 z-40 sm:hidden text-[13px] text-[#8aa69d] px-3 py-2 rounded-full bg-[rgba(2,10,8,0.6)] backdrop-blur-xl border border-[rgba(0,194,168,0.12)]"
      >
        Contact
      </button>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
