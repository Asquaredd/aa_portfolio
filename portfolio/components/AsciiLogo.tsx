"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ASCII_FRAMES } from "./asciiFrames";

// Pre-generate consistent random values for each character position
const generateRandomValues = (totalChars: number) => {
  const values = [];
  for (let i = 0; i < totalChars; i++) {
    values.push({
      y: Math.random() * 40 - 20,
      x: Math.random() * 20 - 10,
      rotate: Math.random() * 60 - 30,
      delay: Math.random() * 0.3,
    });
  }
  return values;
};

export default function AsciiLogo() {
  const [frame, setFrame] = useState(0);
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);
  const randomValuesRef = useRef<{ y: number; x: number; rotate: number; delay: number }[]>([]);

  // Initialize random values only on mount (client-side)
  useEffect(() => {
    const totalChars = ASCII_FRAMES[0].length;
    randomValuesRef.current = generateRandomValues(totalChars);
  }, []);

  useEffect(() => {
    const morphTimer = setTimeout(() => {
      setIsInitialAnimationDone(true);
    }, 4000);

    return () => clearTimeout(morphTimer);
  }, []);

  useEffect(() => {
    if (!isInitialAnimationDone) return;

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ASCII_FRAMES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInitialAnimationDone]);

  const lines = ASCII_FRAMES[frame].split("\n");
  let charCounter = 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`frame-${frame}`}
        className="inline-block select-none relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "20px",
          lineHeight: "20px",
          transform: "scale(1)",
          transformOrigin: "center",
        }}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ whiteSpace: "pre" }}>
            {line.split("").map((char, charIndex) => {
              const currentIndex = charCounter++;
              const randomValue = randomValuesRef.current[currentIndex] || {
                y: 0,
                x: 0,
                rotate: 0,
                delay: 0,
              };

              return (
                <motion.span
                  key={`${lineIndex}-${charIndex}-${frame}`}
                  initial={{
                    opacity: 0,
                    y: randomValue.y,
                    x: randomValue.x,
                    rotate: randomValue.rotate,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: char === " " ? 0 : 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: randomValue.y,
                    x: randomValue.x,
                    rotate: randomValue.rotate,
                    filter: "blur(8px)",
                  }}
                  transition={{
                    duration: isInitialAnimationDone ? 0.4 : 0.6,
                    delay: randomValue.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    display: "inline-block",
                    textShadow:
                      char !== " "
                        ? `
                        0 0 5px #fff,
                        0 0 10px #fff,
                        0 0 15px #fff,
                        0 0 20px #fff,
                        0 0 25px #fff,
                        0 0 30px #fff,
                        0 0 35px #fff
                      `
                        : "none",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
