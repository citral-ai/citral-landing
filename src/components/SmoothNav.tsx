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
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const click = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    setMenuOpen(false);
  };

  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  return (
    <>
      <motion.nav
        layout
        transition={DI_SPRING}
        className="fixed top-3 sm:top-5 left-1/2 z-[100] flex items-center gap-1.5 sm:gap-2 rounded-full overflow-hidden"
        style={{
          x: "-50%",
          maxWidth: "calc(100vw - 16px)",
          background: scrolled ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.55)",
          backdropFilter: "blur(26px) saturate(160%)",
          WebkitBackdropFilter: "blur(26px) saturate(160%)",
          border: `1px solid ${accent}2b`,
          boxShadow: scrolled
            ? `0 12px 50px rgba(0,0,0,0.55), 0 0 0 1px ${accent}12, inset 0 1px 0 rgba(255,255,255,0.04)`
            : `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)`,
          padding: scrolled ? "7px 7px 7px 12px" : "9px 8px 9px 16px",
        }}
      >
        {/* Logo */}
        <motion.a
          layout
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMenuOpen(false);
          }}
          className="flex items-center shrink-0 pr-2 sm:pr-3 mr-0.5 sm:mr-1"
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
                  className="h-[20px] sm:h-[22px] w-auto"
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
                  className="h-[18px] sm:h-[20px] w-auto"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>

        {/* Desktop links */}
        <motion.div layout className="hidden md:flex items-center gap-0.5">
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

        {/* Desktop Contact */}
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

        {/* Beta Access — always visible */}
        <motion.a
          layout
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 transition-transform hover:-translate-y-px"
          style={{
            padding: "8px 15px",
            fontSize: 12,
            fontWeight: 700,
            color: "#0a0f00",
            background: `linear-gradient(180deg, #d9f99d 0%, ${accent} 100%)`,
            borderRadius: 99,
            textDecoration: "none",
            boxShadow: `0 8px 24px -6px ${accent}aa, inset 0 1px 0 rgba(255,255,255,0.55)`,
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <span className="hidden sm:inline">Beta Access</span>
          <span className="inline sm:hidden">Beta</span>
        </motion.a>

        {/* Mobile hamburger */}
        <motion.button
          layout
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden shrink-0 inline-flex items-center justify-center"
          style={{
            width: 34,
            height: 34,
            marginLeft: 2,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${accent}35`,
            borderRadius: 99,
            cursor: "pointer",
            color: "#fff",
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <motion.path
              animate={menuOpen ? { d: "M 3 3 L 13 13" } : { d: "M 2 5 L 14 5" }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              animate={menuOpen ? { d: "M 13 3 L 3 13", opacity: 1 } : { d: "M 2 11 L 14 11", opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </motion.button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="md:hidden fixed inset-0 z-[95]"
              style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(12px)" }}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={DI_SPRING}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[98] flex flex-col"
              style={{
                width: "88%",
                maxWidth: 360,
                background: "linear-gradient(160deg, rgba(10,15,5,0.98), rgba(2,6,2,0.98))",
                borderLeft: `1px solid ${accent}25`,
                boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
                padding: "88px 24px 32px",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <div className="flex flex-col gap-1.5 mb-6">
                {LINKS.map((lnk, i) => (
                  <motion.a
                    key={lnk.id}
                    href={`#${lnk.id}`}
                    onClick={(e) => click(e, lnk.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...DI_SPRING, delay: 0.05 + i * 0.04 }}
                    className="flex items-center justify-between"
                    style={{
                      padding: "16px 18px",
                      borderRadius: 14,
                      background:
                        active === lnk.id
                          ? `linear-gradient(180deg, ${accent}12, transparent)`
                          : "transparent",
                      border: `1px solid ${active === lnk.id ? `${accent}35` : "rgba(255,255,255,0.06)"}`,
                      fontFamily: "Geist",
                      fontSize: 18,
                      fontWeight: 500,
                      color: active === lnk.id ? accent : "#f5f5f0",
                      letterSpacing: "-0.01em",
                      textDecoration: "none",
                    }}
                  >
                    <span>{lnk.label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.a>
                ))}
              </div>

              <div
                style={{
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
                  margin: "4px 0 20px",
                }}
              />

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...DI_SPRING, delay: 0.25 }}
                onClick={openContact}
                className="flex items-center justify-between"
                style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${accent}30`,
                  fontFamily: "Geist",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#f5f5f0",
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  marginBottom: 12,
                }}
              >
                <span>Contact Us</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </motion.button>

              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...DI_SPRING, delay: 0.3 }}
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between"
                style={{
                  padding: "18px 22px",
                  borderRadius: 99,
                  background: `linear-gradient(180deg, #d9f99d 0%, ${accent} 55%, #84cc16 100%)`,
                  fontFamily: "Geist",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0a0f00",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  boxShadow: `0 14px 40px -10px ${accent}, inset 0 1px 0 rgba(255,255,255,0.55)`,
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a0f00">
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                  </svg>
                  Get Beta Access
                </span>
                <span>→</span>
              </motion.a>

              <div
                className="mt-auto pt-6"
                style={{
                  fontFamily: '"Geist Mono",monospace',
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Citral AI &middot; Pharma Compliance
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
