"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  { icon: "🐱", title: "JUMP", desc: "Wall jumps, double jumps, air dashes. Physics that feels JUICY.", color: "var(--neon-cyan)" },
  { icon: "✦", title: "SCRATCH", desc: "Tear through enemies, screens, and neon billboards.", color: "var(--neon-pink)" },
  { icon: "💰", title: "COLLECT", desc: "Coins, chaos tokens, internet memes. Spend them on mayhem.", color: "var(--neon-yellow)" },
  { icon: "☠", title: "DOMINATE", desc: "Take over the internet level by level. 0% → 100%.", color: "var(--neon-purple)" },
];

const GAME_MODES = ["ENDLESS MODE", "LEVEL MODE", "BOSS RUSH", "CHAOS TRIAL"];

export default function GameSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 sm:px-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060010 0%, #0d0025 50%, #060010 100%)" }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16" style={{ background: "var(--neon-pink)", boxShadow: "0 0 8px var(--neon-pink)" }} />
          <span className="font-pixel text-[9px] text-[var(--neon-pink)] tracking-widest">02 / THE GAME</span>
          <div className="h-px w-16" style={{ background: "var(--neon-pink)", boxShadow: "0 0 8px var(--neon-pink)" }} />
        </div>
        <h2
          className="font-pixel text-3xl sm:text-5xl md:text-6xl"
          style={{
            background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0,245,255,0.4))",
          }}
        >
          PLAY THE GAME
        </h2>
      </motion.div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            className="relative p-6 group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${feat.color}30`,
              boxShadow: `0 0 20px ${feat.color}10`,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{
              borderColor: feat.color,
              boxShadow: `0 0 30px ${feat.color}40`,
              y: -4,
            }}
          >
            {/* Corner pixel */}
            <div
              className="absolute top-0 left-0 w-3 h-3"
              style={{ borderTop: `2px solid ${feat.color}`, borderLeft: `2px solid ${feat.color}` }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3"
              style={{ borderBottom: `2px solid ${feat.color}`, borderRight: `2px solid ${feat.color}` }}
            />

            <div
              className="text-3xl mb-4"
              style={{ filter: `drop-shadow(0 0 8px ${feat.color})`, animation: `float 2s ${i * 0.3}s ease-in-out infinite` }}
            >
              {feat.icon}
            </div>
            <h3
              className="font-pixel text-[10px] mb-3 tracking-widest"
              style={{ color: feat.color, textShadow: `0 0 10px ${feat.color}` }}
            >
              {feat.title}
            </h3>
            <p className="font-vt text-gray-400 text-base leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Game modes */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <span className="font-pixel text-[10px] text-[var(--neon-cyan)] tracking-widest">GAME MODES</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GAME_MODES.map((mode, i) => (
            <motion.button
              key={mode}
              className="font-pixel text-[8px] sm:text-[9px] py-4 px-2 tracking-widest relative overflow-hidden group"
              style={{
                border: "1px solid rgba(255,45,120,0.3)",
                color: "var(--neon-pink)",
                background: "rgba(255,45,120,0.03)",
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{
                background: "rgba(255,45,120,0.1)",
                borderColor: "var(--neon-pink)",
                boxShadow: "0 0 20px rgba(255,45,120,0.3)",
              }}
            >
              {mode}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "var(--neon-pink)", boxShadow: "0 0 6px var(--neon-pink)" }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Big CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          className="font-pixel text-[10px] sm:text-xs px-10 py-5 tracking-widest"
          style={{
            background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))",
            color: "#fff",
            boxShadow: "0 0 30px rgba(255,45,120,0.4), 0 0 60px rgba(180,79,255,0.2)",
          }}
          whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(255,45,120,0.6), 0 0 80px rgba(180,79,255,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          🐱 LAUNCH GAME — FREE TO PLAY
        </motion.button>
        <p className="font-vt text-gray-600 text-sm mt-4 tracking-widest">NO HUMANS REQUIRED</p>
      </motion.div>
    </section>
  );
}
