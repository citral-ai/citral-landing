"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedLogo() {
  return (
    <div className="relative">
      {/* Glow burst — flashes after logo reveals */}
      <motion.div
        className="absolute inset-0 scale-110 blur-3xl rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,194,168,0.25), transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.15] }}
        transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
      />

      {/* Logo with clip-path reveal wipe */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
      >
        <motion.div
          initial={{ scale: 1.02, filter: "brightness(2)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="Citral AI"
            width={810}
            height={386}
            priority
            className="w-[65vw] sm:w-[45vw] md:w-[28rem] lg:w-[32rem] h-auto max-w-[32rem] relative z-10"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
