"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-5 sm:px-10 border-b border-white/[0.04]"
        style={{
          background: "rgba(2, 10, 8, 0.5)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Image
          src="/icon-only.png"
          alt="Citral"
          width={210}
          height={286}
          className="h-8 w-auto opacity-80"
        />

        <button
          onClick={() => setContactOpen(true)}
          className="px-4 py-1.5 text-[13px] text-white/70 font-medium rounded-md border border-white/[0.08] hover:border-citral-teal/30 hover:text-citral-teal hover:bg-citral-teal/[0.05] transition-all duration-150"
        >
          Contact Us
        </button>
      </motion.nav>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
