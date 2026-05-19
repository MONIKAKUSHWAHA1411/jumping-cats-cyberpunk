"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["HOME", "GAME", "CATS", "CHAOS", "ABOUT"];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setInterval(() => setTick((n) => n + 1), 1200);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(t); };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-3 flex items-center justify-between"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      style={{
        background: scrolled ? "rgba(6,0,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,45,120,0.2)" : "none",
        transition: "background 0.3s, border-color 0.3s",
        boxShadow: scrolled ? "0 4px 30px rgba(255,45,120,0.1)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 relative">
          <span className="text-base">🐱</span>
        </div>
        <span
          className="font-pixel text-[11px] text-[var(--neon-pink)] tracking-widest"
          style={{ textShadow: "0 0 10px var(--neon-pink)" }}
        >
          CAT.NET
        </span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-pixel text-[9px] text-gray-400 hover:text-[var(--neon-cyan)] tracking-widest relative group transition-colors"
          >
            {link}
            <span
              className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--neon-cyan)] group-hover:w-full transition-all duration-200"
              style={{ boxShadow: "0 0 6px var(--neon-cyan)" }}
            />
          </a>
        ))}
      </div>

      {/* Play Now CTA */}
      <div className="hidden md:flex items-center gap-3">
        <div className="font-vt text-[var(--neon-cyan)] text-sm opacity-60 animate-pulse">
          {tick % 2 === 0 ? "◉ ONLINE" : "◉ ONLINE"}
        </div>
        <button
          className="font-pixel text-[9px] px-4 py-2 tracking-widest"
          style={{
            background: "var(--neon-pink)",
            color: "#000",
            boxShadow: "0 0 15px var(--neon-pink), 0 0 30px rgba(255,45,120,0.4)",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 25px var(--neon-pink), 0 0 60px rgba(255,45,120,0.5)";
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 15px var(--neon-pink), 0 0 30px rgba(255,45,120,0.4)";
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          PLAY NOW
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        style={{ cursor: "none" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-5 h-px transition-all"
            style={{
              background: "var(--neon-pink)",
              boxShadow: "0 0 4px var(--neon-pink)",
              transform: mobileOpen
                ? i === 0 ? "rotate(45deg) translate(2px, 2px)"
                : i === 2 ? "rotate(-45deg) translate(2px, -2px)"
                : "scaleX(0)"
                : "none",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 md:hidden py-4 px-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: "rgba(6,0,16,0.97)",
              borderBottom: "1px solid rgba(255,45,120,0.3)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-pixel text-[10px] text-gray-300 hover:text-[var(--neon-cyan)] tracking-widest"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              className="font-pixel text-[9px] px-4 py-3 mt-2 w-full"
              style={{ background: "var(--neon-pink)", color: "#000" }}
            >
              PLAY NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
