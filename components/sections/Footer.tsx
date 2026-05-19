"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [domination, setDomination] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = 100;
    let current = 0;
    const step = () => {
      current = Math.min(current + 0.5, target);
      setDomination(current);
      if (current < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView]);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden py-20 px-6"
      style={{
        background: "linear-gradient(180deg, #060010 0%, #0a001e 100%)",
        borderTop: "1px solid rgba(255,45,120,0.2)",
        boxShadow: "0 -20px 60px rgba(255,45,120,0.05)",
      }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(180,79,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(180,79,255,0.3) 1px,transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* WORLD DOMINATION counter */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="font-pixel text-[10px] text-gray-500 tracking-widest mb-4">
          ☠ CURRENT STATUS
        </div>
        <div
          className="font-pixel text-5xl sm:text-7xl md:text-8xl"
          style={{
            color: domination >= 100 ? "var(--neon-green)" : "var(--neon-pink)",
            textShadow: domination >= 100
              ? "0 0 30px var(--neon-green), 0 0 60px var(--neon-green)"
              : "0 0 30px var(--neon-pink), 0 0 60px rgba(255,45,120,0.4)",
            transition: "color 0.3s, text-shadow 0.3s",
          }}
        >
          WORLD DOMINATION: {Math.floor(domination)}%
        </div>
        <div
          className="mt-6 h-2 max-w-xl mx-auto relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,45,120,0.3)" }}
        >
          <motion.div
            className="h-full"
            style={{
              background: "linear-gradient(90deg, var(--neon-pink), var(--neon-purple), var(--neon-cyan))",
              boxShadow: "0 0 12px var(--neon-pink)",
              width: `${domination}%`,
              transition: "width 0.05s linear",
            }}
          />
        </div>
        {domination >= 100 && (
          <motion.p
            className="font-pixel text-[10px] text-[var(--neon-green)] mt-4 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            MISSION COMPLETE. CATS WIN. INTERNET BELONGS TO US.
          </motion.p>
        )}
      </motion.div>

      {/* Logo + links */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl" style={{ filter: "drop-shadow(0 0 12px var(--neon-pink))", animation: "floatSlow 3s ease-in-out infinite" }}>🐱</span>
            <span
              className="font-pixel text-xl"
              style={{ color: "var(--neon-pink)", textShadow: "0 0 20px var(--neon-pink)" }}
            >
              JUMPING CATS
            </span>
          </div>
          <p className="font-vt text-gray-500 text-base max-w-xs">
            The internet is our playground. We jump. We scratch. We break everything.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {["PLAY NOW", "LEADERBOARD", "ABOUT", "CONTACT"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-pixel text-[9px] text-gray-500 hover:text-[var(--neon-cyan)] transition-colors tracking-widest group flex items-center gap-2"
            >
              <span className="w-0 group-hover:w-3 h-px transition-all duration-200"
                style={{ background: "var(--neon-cyan)", boxShadow: "0 0 4px var(--neon-cyan)", display: "inline-block" }}
              />
              {link}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom strip */}
      <motion.div
        className="relative z-10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <span className="font-vt text-gray-600 text-sm">© 2025 CAT.NET — All rights reserved by cats</span>
        <span className="font-vt text-gray-700 text-sm" style={{ animation: "hudBlink 2s infinite" }}>
          BUILT WITH 🐱 AND CHAOS
        </span>
      </motion.div>

      {/* Floating background cats */}
      {["5%", "95%"].map((x, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 text-4xl opacity-5 pointer-events-none select-none"
          style={{
            left: x,
            animation: `floatSlow ${3 + i}s ease-in-out infinite`,
            fontSize: "60px",
          }}
        >
          🐱
        </div>
      ))}
    </footer>
  );
}
