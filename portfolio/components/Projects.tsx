"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { MousePointer2, ChevronLeft, ChevronRight } from "lucide-react";

const breatheVariant = {
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
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: "Neurosymbolic Object Detection for Laundry Care Symbols",
      caption: "Real-time computer vision pipeline",
      images: ["/images/results.png", "/images/endtoEnd.png"],
      description: "Computer vision model for detecting, classifying, and tracking laundry items.",
      longDescription: "This project implements an end-to-end object detection pipeline optimized for real-time inference, study compares YOLO-based and Vision Transformer architectures.",
      tech: ["Python", "PyTorch", "YOLOv11","YOLOv12", "ViT","Vision-Language", "LaTex", "Jupyter"],
    },
    {
      title: "Deep Q-Network: Atari Pong",
      caption: "Deep reinforcement learning system",
      images: ["/images/NoisyPongDQN.gif", "/images/denoisedPongDQN.gif"],
      description: "Deep Q-Network agent trained in simulated environments with experience replay.",
      longDescription: "Full Deep Q-Network implementation featuring replay buffers, target network synchronization, and Gymnasium integration.",
      tech: ["Python", "PyTorch", "Open-AI Gymnasium", "Deep Q Learning", "Reinforcement Learning","PPO","PCA", "Matplotlib"],
    },
    {
      title: "SO-Arm 101 Robotic Arm",
      caption: "Servo-driven articulated manipulator",
      images: ["/images/soarm101_1.jpg", "/images/soarm101parts.jpg"],
      description: "Servo-driven robotic arm platform for motion control and kinematic simulation.",
      longDescription: "Eight degree-of-freedom robotic arm using bus-controlled servos and simulation-based kinematic validation.",
      tech: ["VLA", "IsaacSim", "LBM", "ROS2", "Kinematics", "Real-to-Sim/Sim-to-real"],
    },
    {
      title: "Dobsodian 'Go-To' Telescope",
      caption: "UAV-mounted telescope platform",
      images: ["/images/telescope.gif", "/images/telescopemountdimensions.png","/images/Starfinder.png"],
      description: "Custom telescope platform featuring 3D-printed gearboxes and alt-az gimbals.",
      longDescription: "Drone-mounted telescope system including gear reductions and structural optimization in Fusion 360.",
      tech: ["Raspberry-Pi5","Python", "C", "Hall Effect Encoders","Gearboxes","Optics", "Skyfield", "Batteries"],
    },
    {
      title: "CAN-Bus Tester",
      caption: "Automotive diagnostics tool",
      images: ["/images/typeCTesterConnected.jpg", "/images/typeCBoardside.jpg"],
      description: "CAN-Bus diagnostic and testing tool for automotive electronic modules.",
      longDescription: "Hardware/software system for sniffing and validating CAN-Bus traffic for ECU diagnostics.",
      tech: ["CAN-Bus", "Embedded", "ECUs", "C++", "Altium"],
    },
    {
      title: "FPV Drones",
      caption: "High-performance UAV platforms",
      images: ["/projects/fpv-drone.jpg"],
      description: "Design and tuning of FPV drone systems for precision flight.",
      longDescription: "Development of FPV platforms including motor matching, PID tuning, and telemetry optimization.",
      tech: ["FPV VTX","PixHawk", "Betaflight", "Ardupilot", "Radio RF", "ELRS"],
    },
  ];

  const nextImage = () => {
    if (!activeProject) return;
    setImageIndex((prev) => (prev === activeProject.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!activeProject) return;
    setImageIndex((prev) => (prev === 0 ? activeProject.images.length - 1 : prev - 1));
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="projects"
        style={{ opacity }}
        className="min-h-screen px-6 md:px-20 bg-black relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px]" />
        </div>

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
                className="group relative cursor-pointer flex flex-col h-full"
              >
                {/* Indicator */}
                <div className="absolute -top-4 -right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-xl">
                    <MousePointer2 size={10} className="animate-bounce" />
                    CLICK ME
                  </div>
                </div>

                <div className="bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col h-full shadow-2xl">
                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-800">
                    <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Consistent Tech Tags - FRONT CARD */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {project.tech.slice(0, 6).map((t) => (
                        <span 
                          key={t} 
                          className="text-[9px] font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 6 && (
                        <span className="text-[9px] font-bold text-blue-400/80 px-1 py-1">
                          +{project.tech.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-950 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10 shadow-2xl"
            >
              <div className="relative aspect-square md:aspect-auto bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageIndex}
                    src={activeProject.images[imageIndex]}
                    className="w-full h-full object-contain p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {activeProject.images.length > 1 && (
                  <>
                    <motion.button 
                      variants={breatheVariant}
                      animate="animate"
                      whileHover={{ scale: 1.2, textShadow: "0px 0px 12px rgb(255,255,255)" }}
                      onClick={prevImage} 
                      className="absolute left-6 text-white z-30 drop-shadow-lg"
                    >
                      <ChevronLeft size={64} strokeWidth={2.5} />
                    </motion.button>

                    <motion.button 
                      variants={breatheVariant}
                      animate="animate"
                      whileHover={{ scale: 1.2, textShadow: "0px 0px 12px rgb(255,255,255)" }}
                      onClick={nextImage} 
                      className="absolute right-6 text-white z-30 drop-shadow-lg"
                    >
                      <ChevronRight size={64} strokeWidth={2.5} />
                    </motion.button>

                    <div className="absolute bottom-8 flex gap-4 z-30">
                      {activeProject.images.map((_: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setImageIndex(i)}
                          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                            i === imageIndex 
                              ? "bg-white scale-125 shadow-[0_0_15px_rgba(255,255,255,1)]" 
                              : "bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold text-white mb-2">{activeProject.title}</h3>
                  <p className="text-blue-400 font-bold uppercase tracking-[0.25em] text-[10px]">{activeProject.caption}</p>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{activeProject.longDescription}</p>

                {/* Tech Tags - MODAL */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {activeProject.tech.map((t: string) => (
                        <span 
                          key={t} 
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold tracking-wide text-white/90"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="mt-auto w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                >
                  Close Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}