"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const CHAOS_LINES = [
  { text: "WE JUMP.", color: "white", delay: 0 },
  { text: "WE SCRATCH.", color: "white", delay: 0.2 },
  { text: "WE BREAK", color: "var(--neon-pink)", delay: 0.4 },
  { text: "THE INTERNET.", color: "var(--neon-pink)", delay: 0.55 },
];

const SCRATCH_MARKS = [
  { x1: 0, y1: 20, x2: 60, y2: 80 },
  { x1: 10, y1: 15, x2: 70, y2: 75 },
  { x1: -10, y1: 25, x2: 50, y2: 85 },
];

function GlitchLine({ text, color, delay }: { text: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.1 }}
    >
      <motion.h2
        className="font-pixel text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight relative inline-block"
        style={{ color, willChange: "transform" }}
        initial={{ x: -80, opacity: 0, skewX: -5 }}
        animate={inView ? { x: 0, opacity: 1, skewX: 0 } : {}}
        transition={{
          delay: delay + 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <span
          style={{
            textShadow: color === "var(--neon-pink)"
              ? "0 0 20px var(--neon-pink), 0 0 60px rgba(255,45,120,0.4)"
              : "0 0 20px rgba(255,255,255,0.4)",
          }}
        >
          {text}
        </span>
        {/* Pixel cat icon in line */}
        {text === "WE JUMP." && (
          <span className="ml-4 text-2xl align-middle" style={{ animation: "float 1.5s ease-in-out infinite" }}>
            🐱
          </span>
        )}
        {/* Scratch marks for BREAK line */}
        {text === "WE BREAK" && (
          <svg
            className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12"
            viewBox="0 0 60 90"
            style={{ filter: "drop-shadow(0 0 4px var(--neon-pink))", opacity: 0.8 }}
          >
            {SCRATCH_MARKS.map((m, i) => (
              <line key={i} x1={m.x1 + 30} y1={m.y1} x2={m.x2 + 5} y2={m.y2}
                stroke="var(--neon-pink)" strokeWidth="2.5" strokeLinecap="round" />
            ))}
          </svg>
        )}
      </motion.h2>
    </motion.div>
  );
}

export default function ChaosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const catX = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  const catX2 = useTransform(scrollYProgress, [0, 1], ["110%", "-10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section
      id="chaos"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden px-6 sm:px-12 lg:px-24 py-24"
      style={{ background: "linear-gradient(180deg, #060010 0%, #0d0025 50%, #060010 100%)" }}
    >
      {/* Parallax bg text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgY }}
      >
        <span
          className="font-pixel text-[120px] sm:text-[200px] opacity-[0.03] text-white whitespace-nowrap"
        >
          CHAOS
        </span>
      </motion.div>

      {/* Section label */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px" style={{ background: "var(--neon-pink)", boxShadow: "0 0 6px var(--neon-pink)" }} />
          <span className="font-pixel text-[9px] text-[var(--neon-pink)] tracking-widest">01 / CHAOS BEGINS</span>
        </div>
      </motion.div>

      {/* Main text lines */}
      <div className="relative z-10 mb-10" ref={contentRef}>
        {CHAOS_LINES.map((line) => (
          <GlitchLine key={line.text} {...line} />
        ))}
      </div>

      {/* Description */}
      <motion.p
        className="font-vt text-gray-400 text-lg sm:text-xl max-w-xs leading-relaxed mb-8 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Run, jump, climb and destroy in a world where chaos is cute and cats are in charge.
      </motion.p>

      {/* CTA */}
      <motion.div
        className="z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1 }}
      >
        <button className="arcade-btn text-[9px] flex items-center gap-3">
          EXPLORE THE GAME
          <span style={{ animation: "float 1s ease-in-out infinite" }}>→</span>
        </button>
      </motion.div>

      {/* Right side — jumping cats illustration area */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden hidden lg:block">
        {/* CRT monitor being destroyed */}
        <motion.div
          className="absolute right-16 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <div
            className="relative text-8xl"
            style={{ filter: "drop-shadow(0 0 20px var(--neon-cyan))" }}
          >
            🖥️
            {/* Sparks */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xs"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 20}%`,
                  color: i % 2 ? "var(--neon-yellow)" : "var(--neon-pink)",
                  animation: `float ${0.8 + i * 0.2}s ${i * 0.1}s ease-in-out infinite`,
                  textShadow: "0 0 6px currentColor",
                }}
              >
                ✦
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cats jumping across */}
        <motion.div
          className="absolute top-1/3 text-5xl"
          style={{ x: catX }}
        >
          🐱
        </motion.div>
        <motion.div
          className="absolute top-2/3 text-4xl"
          style={{ x: catX2 }}
        >
          🐈
        </motion.div>

        {/* Neon scratch pattern */}
        <svg
          className="absolute right-8 top-1/4"
          width="120"
          height="160"
          viewBox="0 0 120 160"
          style={{ opacity: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1={20 + i * 12}
              y1={10}
              x2={100 - i * 12}
              y2={150}
              stroke="var(--neon-pink)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
            />
          ))}
        </svg>
      </div>

      {/* Floating cats on mobile */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-20 lg:hidden">
        🐱
      </div>

      {/* Neon line decoration */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: "linear-gradient(transparent, var(--neon-pink), transparent)",
          boxShadow: "0 0 8px var(--neon-pink)",
        }}
      />
    </section>
  );
}
