"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Send, Github } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const socials = [
    { icon: <Github size={28} />, href: "https://github.com/Asquaredd" },
    { icon: <Linkedin size={28} />, href: "https://www.linkedin.com/in/aman-adhikari/" },
    { icon: <Mail size={28} />, href: "mailto:amanadhikarisso@gmail.com?subject=Portfolio%20Inquiry" },
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [0, 0.85, 1, 0.7]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0.96, 1, 0.98]
  );

  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      style={{ opacity, scale, y }}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-8 py-24"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-white/10 rounded-full blur-[200px]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* CONTENT */}
      <motion.div className="relative z-10 w-full max-w-5xl text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-none"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Let's Connect
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 tracking-wide max-w-2xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Open to research, engineering, and high-impact collaborations.
        </motion.p>

        {/* CONTACT FORM */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-400 text-base backdrop-blur-sm"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-400 text-base backdrop-blur-sm"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            
            {/* Added extra padding specifically for the message field */}
            <div className="pt-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-400 text-base backdrop-blur-sm"
                placeholder="Your Message"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-white text-black font-medium py-3.5 px-6 rounded-2xl hover:bg-gray-200 transition-colors duration-300 text-base mt-2 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* CONTACT CARDS - UPDATED TO MATCH SOCIAL LINKS STYLE */}
        <motion.div
          className="flex justify-center gap-8 max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
        >
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                {social.icon}
              </div>
              <span className="text-sm uppercase tracking-[0.3em] text-gray-400">
                {social.href.includes('github') ? 'GitHub' : 
                 social.href.includes('linkedin') ? 'LinkedIn' : 'Email'}
              </span>
              <span className="text-base font-light text-white">
                {social.href.includes('github') ? 'Asquaredd' : 
                 social.href.includes('linkedin') ? 'Aman Adhikari' : 'amanadhikarisso@gmail.com'}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          className="mt-8 mb-8 w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </motion.section>
  );
}
