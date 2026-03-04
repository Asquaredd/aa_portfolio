"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";
import { MousePointer2, ChevronLeft, ChevronRight } from "lucide-react";

/* ===============================
   Types
================================= */

interface Project {
  title: string;
  caption: string;
  images: string[];
  description: string;
  longDescription: string;
  tech: string[];
}

/* ===============================
   Animation Variant (Typed)
================================= */

const breatheVariant: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Projects() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  /* ===============================
     Project Data (Typed)
  ================================= */

  const projects: Project[] = [
    {
      title: "Neurosymbolic Object Detection for Laundry Care Symbols",
      caption: "Real-time computer vision pipeline",
      images: ["/images/results.png", "/images/endtoEnd.png"],
      description:
        "Computer vision model for detecting, classifying, and tracking laundry items.",
      longDescription:
        "This project implements an end-to-end object detection pipeline optimized for real-time inference, study compares YOLO-based and Vision Transformer architectures.",
      tech: [
        "Python",
        "PyTorch",
        "YOLOv11",
        "YOLOv12",
        "ViT",
        "Vision-Language",
        "LaTeX",
        "Jupyter",
      ],
    },
    {
      title: "Deep Q-Network: Atari Pong",
      caption: "Deep reinforcement learning system",
      images: ["/images/NoisyPongDQN.gif", "/images/denoisedPongDQN.gif"],
      description:
        "Deep Q-Network agent trained in simulated environments with experience replay.",
      longDescription:
        "Full Deep Q-Network implementation featuring replay buffers, target network synchronization, and Gymnasium integration.",
      tech: [
        "Python",
        "PyTorch",
        "OpenAI Gymnasium",
        "Deep Q Learning",
        "Reinforcement Learning",
        "PPO",
        "PCA",
        "Matplotlib",
      ],
    },
    {
      title: "SO-Arm 101 Robotic Arm",
      caption: "Servo-driven articulated manipulator",
      images: ["/images/soarm101_1.jpg", "/images/soarm101parts.jpg"],
      description:
        "Servo-driven robotic arm platform for motion control and kinematic simulation.",
      longDescription:
        "Eight degree-of-freedom robotic arm using bus-controlled servos and simulation-based kinematic validation.",
      tech: [
        "VLA",
        "IsaacSim",
        "LBM",
        "ROS2",
        "Kinematics",
        "Real-to-Sim/Sim-to-Real",
      ],
    },
    {
      title: "Dobsodian 'Go-To' Telescope",
      caption: "UAV-mounted telescope platform",
      images: [
        "/images/telescope.gif",
        "/images/telescopemountdimensions.png",
        "/images/Starfinder.png",
      ],
      description:
        "Custom telescope platform featuring 3D-printed gearboxes and alt-az gimbals.",
      longDescription:
        "Drone-mounted telescope system including gear reductions and structural optimization in Fusion 360.",
      tech: [
        "Raspberry Pi 5",
        "Python",
        "C",
        "Hall Effect Encoders",
        "Gearboxes",
        "Optics",
        "Skyfield",
        "Batteries",
      ],
    },
    {
      title: "CAN-Bus Tester",
      caption: "Automotive diagnostics tool",
      images: [
        "/images/typeCTesterConnected.jpg",
        "/images/typeCBoardside.jpg",
      ],
      description:
        "CAN-Bus diagnostic and testing tool for automotive electronic modules.",
      longDescription:
        "Hardware/software system for sniffing and validating CAN-Bus traffic for ECU diagnostics.",
      tech: ["CAN-Bus", "Embedded", "ECUs", "C++", "Altium"],
    },
    {
      title: "FPV Drones",
      caption: "High-performance UAV platforms",
      images: ["/projects/fpv-drone.jpg"],
      description:
        "Design and tuning of FPV drone systems for precision flight.",
      longDescription:
        "Development of FPV platforms including motor matching, PID tuning, and telemetry optimization.",
      tech: [
        "FPV VTX",
        "PixHawk",
        "Betaflight",
        "Ardupilot",
        "Radio RF",
        "ELRS",
      ],
    },
  ];

  /* ===============================
     Navigation
  ================================= */

  const nextImage = () => {
    if (!activeProject) return;
    setImageIndex((prev) =>
      prev === activeProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!activeProject) return;
    setImageIndex((prev) =>
      prev === 0 ? activeProject.images.length - 1 : prev - 1
    );
  };

  /* ===============================
     JSX
  ================================= */

  return (
    <>
      <motion.section
        ref={ref}
        id="projects"
        style={{ opacity }}
        className="min-h-screen px-6 md:px-20 bg-black relative py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl font-bold text-white mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  setActiveProject(project);
                  setImageIndex(0);
                }}
                className="group relative cursor-pointer"
              >
                <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 shadow-2xl">
                  <div className="relative aspect-video overflow-hidden bg-neutral-800">
                    <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal remains same logic — trimmed for clarity */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-950 rounded-2xl max-w-6xl w-full"
            >
              <div className="relative bg-black flex items-center justify-center overflow-hidden">
                <motion.img
                  key={imageIndex}
                  src={activeProject.images[imageIndex]}
                  className="w-full h-full object-contain p-4"
                />

                {activeProject.images.length > 1 && (
                  <>
                    <motion.button
                      variants={breatheVariant}
                      animate="animate"
                      onClick={prevImage}
                      className="absolute left-6 text-white"
                    >
                      <ChevronLeft size={64} />
                    </motion.button>

                    <motion.button
                      variants={breatheVariant}
                      animate="animate"
                      onClick={nextImage}
                      className="absolute right-6 text-white"
                    >
                      <ChevronRight size={64} />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}