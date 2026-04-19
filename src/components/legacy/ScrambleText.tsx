"use client";

import { useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function ScrambleText({
  text,
  className = "",
  delay = 1200,
  speed = 40,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;
    const totalIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplay(text);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Initial scramble on mount after delay
  useEffect(() => {
    const timeout = setTimeout(scramble, delay);
    return () => clearTimeout(timeout);
  }, [scramble, delay]);

  // Re-scramble every 5 seconds
  useEffect(() => {
    if (isScrambling) return;
    const loop = setInterval(scramble, 5000);
    return () => clearInterval(loop);
  }, [scramble, isScrambling]);

  return <span className={className}>{display}</span>;
}
