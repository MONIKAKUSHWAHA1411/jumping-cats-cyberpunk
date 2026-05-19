"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINES = [
  { text: "CHAOS. CATS. DOMINATION.", color: "var(--neon-cyan)", size: "text-xl sm:text-2xl md:text-3xl" },
  { text: "THE INTERNET IS OUR PLAYGROUND", color: "white", size: "text-base sm:text-xl md:text-2xl" },
  { text: "ARE YOU READY?", color: "var(--neon-pink)", size: "text-xl sm:text-2xl md:text-3xl" },
];

const PIXEL_CATS = ["🐱", "👾", "🐱", "👾"];

export default function MotionTextSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060010 0%, #120028 50%, #060010 100%)",
        minHeight: "60vh",
      }}
    >
      {/* Big BG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-pixel text-[80px] sm:text-[140px] opacity-[0.025] text-white whitespace-nowrap">
          MEOW
        </span>
      </div>

      {/* Horizontal neon lines */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 h-px"
        style={{ background: "var(--neon-purple)", boxShadow: "0 0 8px var(--neon-purple)", opacity: 0.2 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 right-0 h-px"
        style={{ background: "var(--neon-cyan)", boxShadow: "0 0 8px var(--neon-cyan)", opacity: 0.2 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Pixel cat icons flanking */}
      <div className="flex justify-center gap-6 mb-8">
        {PIXEL_CATS.map((emoji, i) => (
          <motion.span
            key={i}
            className="text-xl sm:text-2xl"
            style={{ filter: "drop-shadow(0 0 6px var(--neon-cyan))", animation: `float ${1.5 + i * 0.3}s ease-in-out infinite` }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Text lines */}
      <div className="flex flex-col items-center gap-4 z-10">
        {LINES.map((line, i) => (
          <motion.div
            key={line.text}
            className={`font-pixel ${line.size} text-center tracking-widest`}
            style={{
              color: line.color,
              textShadow: `0 0 20px ${line.color}, 0 0 40px ${line.color}50`,
            }}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6, type: "spring" }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      {/* Bottom pixel cats icons */}
      <div className="flex justify-center gap-6 mt-8">
        {PIXEL_CATS.map((emoji, i) => (
          <motion.span
            key={i}
            className="text-xl sm:text-2xl"
            style={{
              filter: "drop-shadow(0 0 6px var(--neon-pink))",
              animation: `float ${1.8 + i * 0.25}s ${i * 0.2}s ease-in-out infinite`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
