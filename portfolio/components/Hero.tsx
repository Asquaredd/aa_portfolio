"use client";

import { motion } from "framer-motion";
import AsciiLogo from "./AsciiLogo";
import Navbar from "./Navbar";
import { JetBrains_Mono } from "next/font/google";
import { Github, Linkedin, Mail, Mouse } from "lucide-react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function Hero() {
  const socials = [
    { icon: <Github size={28} />, href: "https://github.com/Asquaredd" },
    { icon: <Linkedin size={28} />, href: "https://www.linkedin.com/in/aman-adhikari/" },
    { icon: <Mail size={28} />, href: "mailto:amanadhikarisso@gmail.com?subject=Portfolio%20Inquiry" },
  ];

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <motion.section className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-white/[0.03] rounded-full blur-[120px]" />
        </div>

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: "-10vw" }}
          animate={{ opacity: 1, x: "5vw" }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          className="absolute left-[5vw] top-1/2 -translate-y-1/2 z-10 text-left"
        >
          <h1
            className={`${jetBrainsMono.className} font-bold text-white tracking-tight [font-size:clamp(2.5rem,6vw,4rem)] leading-tight`}
          >
            Aman Adhikari
          </h1>

          <p
            className={`${jetBrainsMono.className} mt-6 text-gray-400 opacity-90 whitespace-nowrap [font-size:clamp(1rem,1.8vw,1.2rem)] leading-relaxed max-w-xl`}
          >
            Software Engineer · Embedded Systems · Machine Learning
          </p>

          {/* SOCIAL ICONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="flex gap-8 mt-12 items-center"
          >
            {socials.map((social, i) => {
              const isExternal = social.href.startsWith("http");

              return (
                <motion.a
                  key={i}
                  href={social.href}
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="relative group p-2 text-white/60 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {social.icon}
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* SCROLL INDICATOR (ALWAYS VISIBLE) */}
          {/* SCROLL INDICATOR (Under Socials) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              textShadow: [
                "0 0 4px rgba(255,255,255,0.4)",
                "0 0 25px rgba(255,255,255,1)",
                "0 0 4px rgba(255,255,255,0.4)",
              ],
            }}
            transition={{
              delay: 100,
              duration: 100,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={handleScrollClick}
            className="mt-16 flex items-center gap-4 cursor-pointer text-white"
          >
            {/* Mouse Container */}
            <div className="relative flex items-center justify-center">
              {/* Mouse Outline */}
              <Mouse size={40} strokeWidth={1.5} />

              {/* Animated Scroll Wheel */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[2px] h-[6px] bg-white rounded-full"
                style={{ top: "8px" }}
              />
            </div>

            <span
              className={`${jetBrainsMono.className} text-sm tracking-wide`}
            >
              Scroll Down
            </span>
          </motion.div>
        </motion.div>

        {/* ASCII LOGO */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "28vw" }}
          transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
          className="text-white z-10 hidden lg:block"
        >
          <AsciiLogo />
        </motion.div>
      </motion.section>
    </>
  );
}