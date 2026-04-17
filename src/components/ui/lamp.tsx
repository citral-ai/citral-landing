"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampEffect = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden w-full z-0",
        className
      )}
    >
      <div className="relative flex w-full scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          animate={{ opacity: 1, width: "20rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: "conic-gradient(from 70deg at center top, #00C2A8, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-32 overflow-visible w-[20rem]"
        >
          <div className="absolute w-full left-0 bg-[#020a08] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-24 h-full left-0 bg-[#020a08] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          animate={{ opacity: 1, width: "20rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #00C2A8)",
          }}
          className="absolute inset-auto left-1/2 h-32 w-[20rem]"
        >
          <div className="absolute w-24 h-full right-0 bg-[#020a08] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#020a08] h-24 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-28 w-full translate-y-8 scale-x-150 bg-[#020a08] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-28 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-20 w-[18rem] -translate-y-1/2 rounded-full bg-[#00C2A8] opacity-40 blur-3xl" />
        <motion.div
          initial={{ width: "4rem" }}
          animate={{ width: "10rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-20 w-40 -translate-y-[4rem] rounded-full bg-[#00C2A8] blur-2xl"
        />
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "20rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[20rem] -translate-y-[4.5rem] bg-[#00C2A8]"
        />
        <div className="absolute inset-auto z-40 h-28 w-full -translate-y-[8rem] bg-[#020a08]" />
      </div>
      {children && (
        <div className="relative z-50 flex flex-col items-center">
          {children}
        </div>
      )}
    </div>
  );
};
