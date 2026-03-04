"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  SiPython,
  SiC,
  SiDotnet,
  SiNextdotjs,
  SiTensorflow,
  SiPytorch,
  SiLinux,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiGit,
  SiDocker,
  SiVuedotjs,
  SiHtml5,
  SiPhp,
  SiAltiumdesigner,
  SiKicad,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";

export default function Skills() {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  const row1 = [
    { name: "Python", icon: <SiPython />, hover: "hover:text-yellow-400" },
    { name: "C", icon: <SiC />, hover: "hover:text-blue-400" },
    { name: ".NET", icon: <SiDotnet />, hover: "hover:text-purple-500" },
    { name: "TensorFlow", icon: <SiTensorflow />, hover: "hover:text-orange-500" },
    { name: "PyTorch", icon: <SiPytorch />, hover: "hover:text-orange-400" },
    { name: "Linux", icon: <SiLinux />, hover: "hover:text-yellow-500" },
  ];

  const row2 = [
    { name: "React", icon: <SiReact />, hover: "hover:text-cyan-400" },
    { name: "Next.js", icon: <SiNextdotjs />, hover: "hover:text-white" },
    { name: "Vue.js", icon: <SiVuedotjs />, hover: "hover:text-green-500" },
    { name: "HTML", icon: <SiHtml5 />, hover: "hover:text-orange-600" },
    { name: "Tailwind", icon: <SiTailwindcss />, hover: "hover:text-sky-400" },
    { name: "Node.js", icon: <SiNodedotjs />, hover: "hover:text-green-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, hover: "hover:text-blue-500" },
    { name: "Redis", icon: <SiRedis />, hover: "hover:text-red-500" },
    { name: "JavaScript", icon: <SiJavascript />, hover: "hover:text-yellow-400" },
    { name: "TypeScript", icon: <SiTypescript />, hover: "hover:text-blue-500" },
  ];

  const row3 = [
    { name: "Git", icon: <SiGit />, hover: "hover:text-orange-500" },
    { name: "Docker", icon: <SiDocker />, hover: "hover:text-blue-400" },
    { name: "MATLAB", icon: "📊", hover: "hover:text-orange-500" },
    { name: "CAN-BUS", icon: "🔌", hover: "hover:text-emerald-400" },
    { name: "Altium Designer", icon: <SiAltiumdesigner />, hover: "hover:text-indigo-400" },
    { name: "KiCad", icon: <SiKicad />, hover: "hover:text-green-600" },
  ];

  const MarqueeRow = ({
    items,
    reverse = false,
  }: {
    items: any[];
    reverse?: boolean;
  }) => {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    const SPEED = 40; // px per second

    useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver(() => {
        const fullWidth = containerRef.current!.scrollWidth;
        setWidth(fullWidth / 2); // because we duplicate items
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }, []);

    useAnimationFrame((_, delta) => {
      if (shouldReduceMotion || !width) return;

      const move = (SPEED * delta) / 1000;
      let next = x.get() + (reverse ? move : -move);

      if (!reverse && next <= -width) {
        next += width;
      }

      if (reverse && next >= 0) {
        next -= width;
      }

      x.set(next);
    });

    return (
      <div className="relative overflow-hidden py-8">
        {/* Edge fade */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black via-transparent to-black" />

        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex gap-20 whitespace-nowrap"
        >
          {[...items, ...items].map((skill, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 text-2xl font-semibold text-gray-600
                          transition-all duration-300 hover:scale-110 ${skill.hover}`}
            >
              <span className="text-3xl grayscale hover:grayscale-0 transition-all duration-300">
                {skill.icon}
              </span>
              <span className="hidden sm:inline">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.section
      ref={ref}
      id="skills"
      style={{ opacity }}
      className="min-h-screen px-6 sm:px-12 lg:px-20 py-24 bg-black relative overflow-hidden"
    >
      {/* Background blur gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div style={{ scale }} className="max-w-[1600px] mx-auto z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            My Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and systems I work with.
          </p>
        </div>

        <div className="space-y-12">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
          <MarqueeRow items={row3} />
        </div>
      </motion.div>
    </motion.section>
  );
}