"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-3 sm:gap-6 rounded-full bg-black/40 backdrop-blur-md px-3 sm:px-5 py-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-transparent border-none outline-none cursor-pointer"
          >
            {/* Hover glow (desktop only) */}
            {hoveredItem === item.id && (
              <motion.div
                className="absolute inset-0 -z-10 hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
                  filter: "blur(16px)",
                  transform: "scale(3)",
                }}
              />
            )}

            <span
              className={`${jetBrainsMono.className} font-semibold tracking-wide transition-colors duration-200`}
              style={{
                fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
                color:
                  hoveredItem === item.id
                    ? "#ffffff"
                    : "rgba(255,255,255,0.7)",
              }}
            >
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
