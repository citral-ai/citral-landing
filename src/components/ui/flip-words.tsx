"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  suffix,
  suffixClassName,
}: {
  words: string[];
  duration?: number;
  className?: string;
  suffix?: string;
  suffixClassName?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const idx = words.indexOf(currentWord);
    const word = words[(idx + 1) % words.length];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const t = setTimeout(() => startAnimation(), duration);
      return () => clearTimeout(t);
    }
  }, [isAnimating, duration, startAnimation]);

  const letters = currentWord.split("");
  const totalChars = letters.length + (suffix ? suffix.length : 0);

  return (
    <span className="relative inline-flex overflow-visible" style={{ minWidth: "8ch" }}>
      <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn("inline-block whitespace-nowrap", className)}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={currentWord + i}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.03, duration: 0.15 }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          {suffix && (
            <motion.span
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: letters.length * 0.03, duration: 0.15 }}
              className={cn("inline-block not-italic", suffixClassName)}
            >
              {suffix}
            </motion.span>
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
