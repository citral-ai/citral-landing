"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AuditTerminal from "./AuditTerminal";
import WaitlistForm from "./WaitlistForm";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-svh px-4 sm:px-6 pt-14">
      <motion.div
        className="flex flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Logo */}
        <motion.div variants={fadeUp}>
          <Image
            src="/logo.png"
            alt="Citral AI"
            width={810}
            height={386}
            priority
            className="w-[60vw] sm:w-[36vw] md:w-[22rem] lg:w-[26rem] h-auto max-w-[26rem] translate-x-[5%] drop-shadow-[0_0_40px_rgba(0,194,168,0.15)]"
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} className="leading-[1.05] -mt-1">
          <span className="block text-[clamp(1.2rem,3vw,1.85rem)] font-semibold tracking-[-0.03em] text-[#f7f8f8]">
            We Catch What
          </span>
          <span
            className="block text-[clamp(1.2rem,3vw,1.85rem)] font-serif italic text-[#f7f8f8]"
            style={{ textShadow: "0 0 60px rgba(0,194,168,0.12)" }}
          >
            Humans Miss
            <span className="not-italic text-citral-teal period-pulse">.</span>
          </span>
        </motion.h1>

        {/* Waitlist CTA */}
        <motion.div variants={fadeUp} className="mt-4" id="waitlist">
          <WaitlistForm />
        </motion.div>

        {/* Terminal — compact */}
        <motion.div variants={fadeUp} className="w-full">
          <AuditTerminal />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-3 flex items-center gap-3"
      >
        <span className="text-[10px] text-white/[0.08] font-mono tracking-wide">
          &copy; 2026 Citral AI
        </span>
        <a
          href="https://instagram.com/citral.ai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/20 hover:text-citral-teal/60 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/company/citral-ai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white/20 hover:text-citral-teal/60 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://twitter.com/citralai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="text-white/20 hover:text-citral-teal/60 transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
