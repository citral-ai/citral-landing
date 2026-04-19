"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ContactModal from "./ContactModal";

const BETA_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

const LINKS = [
  { id: "process", label: "Process" },
  { id: "frameworks", label: "Coverage" },
  { id: "compare", label: "Compare" },
  { id: "cta", label: "Beta" },
];

const DI_SPRING = { type: "spring", stiffness: 420, damping: 32, mass: 0.9 } as const;

export default function SmoothNav({ accent = "#a3e635" }: { accent?: string }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
    <>
      <motion.nav
        layout
        transition={DI_SPRING}
        className="fixed top-5 left-1/2 z-[100] flex items-center gap-2 rounded-full overflow-hidden"
        style={{
          x: "-50%",
          background: scrolled ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(26px) saturate(160%)",
          WebkitBackdropFilter: "blur(26px) saturate(160%)",
          border: `1px solid ${accent}2b`,
          boxShadow: scrolled
            ? `0 12px 50px rgba(0,0,0,0.55), 0 0 0 1px ${accent}12, inset 0 1px 0 rgba(255,255,255,0.04)`
            : `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)`,
          padding: scrolled ? "8px 8px 8px 14px" : "10px 10px 10px 18px",
        }}
      >
        {/* Logo — morphs smoothly between wordmark and C icon */}
        <motion.a
          layout
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center shrink-0 pr-3 mr-1"
          style={{ borderRight: `1px solid ${accent}20` }}
          aria-label="Citral home"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {scrolled ? (
              <motion.span
                key="icon"
                layout
                initial={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
                transition={DI_SPRING}
                className="inline-flex"
              >
                <Image
                  src="/icon-only.png"
                  alt="Citral"
                  width={210}
                  height={286}
                  priority
                  className="h-[22px] w-auto"
                />
              </motion.span>
            ) : (
              <motion.span
                key="wordmark"
                layout
                initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                transition={DI_SPRING}
                className="inline-flex"
              >
                <Image
                  src="/logo.png"
                  alt="Citral"
                  width={1993}
                  height={882}
                  priority
                  className="h-[20px] w-auto"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>

        {/* Links */}
        <motion.div layout className="hidden sm:flex items-center gap-0.5">
          {LINKS.map((lnk) => {
            const isActive = active === lnk.id;
            return (
              <motion.a
                key={lnk.id}
                layout
                href={`#${lnk.id}`}
                onClick={(e) => click(e, lnk.id)}
                className="relative transition-colors duration-200"
                style={{
                  padding: "7px 14px",
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: isActive ? "#0a0f00" : "rgba(255,255,255,0.78)",
                  borderRadius: 99,
                  textDecoration: "none",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={DI_SPRING}
                    className="absolute inset-0 rounded-full"
                    style={{ background: accent, zIndex: -1 }}
                  />
                )}
                <span className="relative z-[1]">{lnk.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Us — opens modal */}
        <motion.button
          layout
          data-open-modal
          onClick={() => setContactOpen(true)}
          className="hidden md:inline-flex items-center transition-colors duration-200 hover:text-white"
          style={{
            padding: "7px 12px",
            fontSize: 12.5,
            fontWeight: 500,
            color: "rgba(255,255,255,0.78)",
            background: "transparent",
            border: "none",
            borderRadius: 99,
            cursor: "pointer",
          }}
        >
          Contact
        </motion.button>

        {/* Beta Access CTA */}
        <motion.a
          layout
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 transition-transform hover:-translate-y-px"
          style={{
            padding: "9px 18px",
            fontSize: 12.5,
            fontWeight: 700,
            color: "#0a0f00",
            background: `linear-gradient(180deg, #d9f99d 0%, ${accent} 100%)`,
            borderRadius: 99,
            textDecoration: "none",
            boxShadow: `0 8px 24px -6px ${accent}aa, inset 0 1px 0 rgba(255,255,255,0.55)`,
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          Beta Access
        </motion.a>
      </motion.nav>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
