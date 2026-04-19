"use client";

import { motion } from "framer-motion";
import PaperDoc from "./PaperDoc";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe61_VqYep9KZIqGNQV0FuBMWm6IUJCZI97-EZFBvJV9MP9Xg/viewform";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroContent() {
  return (
    <section className="relative z-[2] min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1380px] mx-auto px-6 sm:px-10 pt-[140px] pb-20 lg:pb-[120px]">
      {/* LEFT — Text */}
      <div>
        {/* Eyebrow */}
        <FadeUp delay={0}>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#3ff0d0] bg-[rgba(0,194,168,0.06)] border border-[rgba(0,194,168,0.28)] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ff0d0] shadow-[0_0_8px_#00C2A8]" />
            Private Beta · Q2 2026
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.06}>
          <h1 className="text-[clamp(48px,6.8vw,96px)] leading-[0.95] tracking-[-0.04em] font-medium m-0 mb-7" style={{ fontFeatureSettings: '"ss01"' }}>
            Compliance auditing{" "}
            <span className="font-serif italic font-normal text-[#3ff0d0]">
              engineered.
            </span>
          </h1>
        </FadeUp>

        {/* Sub */}
        <FadeUp delay={0.12}>
          <p className="max-w-[540px] text-[16.5px] leading-[1.6] text-[#8aa69d] mb-9">
            Citral reviews batch records, validation protocols, and deviation reports end-to-end — surfacing every missed signature, expired calibration, and out-of-spec value with{" "}
            <strong className="text-[#eafff8] font-medium">a verified citation to the source line</strong>.
            {" "}Purpose-built for regulated pharmaceutical manufacturing.
          </p>
        </FadeUp>

        {/* Actions */}
        <FadeUp delay={0.18}>
          <div className="flex gap-3.5 flex-wrap items-center">
            {/* Primary CTA */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-7 py-[15px] text-[14px] font-semibold rounded-xl text-[#001814] overflow-hidden transition-all duration-200 hover:-translate-y-px"
              style={{
                background: "linear-gradient(180deg, #3ff0d0 0%, #00C2A8 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 12px 40px -10px rgba(0,194,168,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
              <span className="relative">Join Waitlist</span>
              <svg className="relative" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            {/* Ghost button */}
            <button
              className="inline-flex items-center gap-2.5 px-[22px] py-[15px] text-[14px] font-medium rounded-xl text-[#eafff8] border border-[rgba(0,194,168,0.28)] bg-transparent hover:bg-[rgba(0,194,168,0.06)] hover:border-citral-teal transition-all duration-200"
              onClick={() => {
                const el = document.querySelector('[data-open-modal]');
                if (el) (el as HTMLElement).click();
              }}
            >
              <span className="w-[22px] h-[22px] rounded-full bg-[rgba(0,194,168,0.15)] grid place-items-center text-[#3ff0d0]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Request a demo
            </button>
          </div>
        </FadeUp>
      </div>

      {/* RIGHT — Paper document */}
      <FadeUp delay={0.3} className="w-full lg:w-auto">
        <div className="lg:transform-none transform scale-[0.82] sm:scale-90 lg:scale-100 origin-top">
          <PaperDoc />
        </div>
      </FadeUp>
    </section>
  );
}
