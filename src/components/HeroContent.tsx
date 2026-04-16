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
          className="text-white/20 hover:text-citral-teal/60 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
