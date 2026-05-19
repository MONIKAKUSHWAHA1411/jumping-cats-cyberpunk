"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const PLATFORMS = [
  { x: "5%", y: "55%", w: 120, color: "#b44fff" },
  { x: "28%", y: "40%", w: 90, color: "#ff2d78" },
  { x: "50%", y: "55%", w: 110, color: "#00f5ff" },
  { x: "72%", y: "38%", w: 85, color: "#b44fff" },
  { x: "88%", y: "52%", w: 100, color: "#ff2d78" },
];

const COINS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${8 + i * 7.5}%`,
  y: `${30 + Math.sin(i) * 15}%`,
  delay: i * 0.15,
}));

const CAT_RUNNERS = [
  { emoji: "🐱", startX: "-80px", endX: "110vw", y: "62%", duration: 4, delay: 0 },
  { emoji: "🐈", startX: "110vw", endX: "-80px", y: "72%", duration: 5, delay: 1.5 },
  { emoji: "🐱", startX: "-80px", endX: "110vw", y: "50%", duration: 3.5, delay: 3 },
];

function Platform({ x, y, w, color }: { x: string; y: string; w: number; color: string }) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, width: w, height: 12 }}
    >
      <div
        className="w-full h-full"
        style={{
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}40`,
          clipPath: "polygon(0 3px,3px 0,calc(100% - 3px) 0,100% 3px,100% 100%,0 100%)",
        }}
      />
      {/* Pixel dots on platform */}
      {Array.from({ length: Math.floor(w / 12) }, (_, i) => (
        <div
          key={i}
          className="absolute -top-1 w-1.5 h-1.5"
          style={{
            left: i * 12 + 4,
            background: color,
            boxShadow: `0 0 4px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function ScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const scoreX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 420, 8420]);

  const inView = useInView(sectionRef, { once: false, margin: "-50px" });

  return (
    <section
      id="game"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #060010 0%, #080018 50%, #060010 100%)",
      }}
    >
      {/* Game HUD top bar */}
      <div
        className="sticky top-0 z-20 flex justify-between items-center px-4 sm:px-8 py-3"
        style={{
          background: "rgba(6,0,16,0.9)",
          borderBottom: "1px solid rgba(0,245,255,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="font-pixel text-[8px] sm:text-[10px] text-[var(--neon-cyan)] flex flex-col gap-0.5">
          <div>LEVEL 01</div>
          <div className="text-gray-500">INTERNET ALLEY</div>
        </div>
        {/* Score counter */}
        <div className="font-pixel text-[8px] sm:text-[10px] text-right">
          <div className="text-gray-500">SCORE</div>
          <motion.div
            className="text-[var(--neon-yellow)]"
            style={{ textShadow: "0 0 8px var(--neon-yellow)" }}
          >
            <motion.span>
              {useTransform(scoreX, (v) => String(Math.floor(v)).padStart(6, "0"))}
            </motion.span>
          </motion.div>
        </div>
        {/* Hearts */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-sm sm:text-base" style={{ filter: "drop-shadow(0 0 4px red)" }}>
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Main game world viewport */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Sky / background layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: layer3Y,
            background: "linear-gradient(180deg, #080018 0%, #0d0035 60%, #140030 100%)",
          }}
        />

        {/* Distant city BG */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-15 pointer-events-none"
          style={{ y: layer3Y }}
        >
          <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sg1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,200 L0,120 L50,120 L50,60 L70,60 L70,30 L90,30 L90,60 L110,60 L110,90 L150,90 L150,40 L170,40 L170,10 L190,10 L190,40 L210,40 L210,80 L260,80 L260,50 L280,50 L280,20 L300,20 L300,50 L320,50 L320,90 L380,90 L380,60 L400,60 L400,30 L420,30 L420,60 L440,60 L440,100 L500,100 L500,70 L520,70 L520,40 L540,40 L540,70 L560,70 L560,110 L620,110 L620,80 L640,80 L640,50 L660,50 L660,80 L680,80 L680,120 L740,120 L740,90 L760,90 L760,60 L780,60 L780,90 L800,90 L800,130 L860,130 L860,100 L880,100 L880,70 L900,70 L900,100 L920,100 L920,140 L980,140 L980,110 L1000,110 L1000,80 L1020,80 L1020,110 L1040,110 L1040,150 L1100,150 L1100,120 L1120,120 L1120,90 L1140,90 L1140,120 L1160,120 L1160,160 L1220,160 L1220,130 L1240,130 L1240,150 L1300,150 L1300,180 L1440,180 L1440,200 Z"
              fill="url(#sg1)"
            />
          </svg>
        </motion.div>

        {/* Mid layer - floating neon signs */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: layer2Y }}>
          {[
            { x: "10%", y: "20%", text: "MEOW//NET", color: "#b44fff" },
            { x: "60%", y: "15%", text: "CAT_PROTOCOL", color: "#00f5ff" },
            { x: "35%", y: "25%", text: "PURR.EXE", color: "#ff2d78" },
            { x: "80%", y: "22%", text: "CHAOS:99", color: "#ffee00" },
          ].map(({ x, y, text, color }) => (
            <div
              key={text}
              className="absolute font-vt text-sm sm:text-base tracking-widest"
              style={{
                left: x, top: y, color,
                textShadow: `0 0 8px ${color}`,
                animation: "neonPulse 2s infinite",
                opacity: 0.7,
              }}
            >
              {text}
            </div>
          ))}
        </motion.div>

        {/* Ground layer — platforms */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: layer1Y }}
        >
          {/* Ground */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6"
            style={{
              background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink), var(--neon-cyan), var(--neon-purple))",
              boxShadow: "0 -4px 20px rgba(180,79,255,0.6)",
              backgroundSize: "200% 100%",
              animation: "marquee 3s linear infinite",
            }}
          />

          {/* Platforms */}
          {PLATFORMS.map((p, i) => (
            <Platform key={i} {...p} />
          ))}

          {/* Coins */}
          {COINS.map((coin) => (
            <motion.div
              key={coin.id}
              className="absolute font-pixel text-[var(--neon-yellow)] text-base select-none"
              style={{
                left: coin.x,
                top: coin.y,
                textShadow: "0 0 8px var(--neon-yellow)",
                animation: `coinSpin 1.2s ${coin.delay}s linear infinite, float 2s ${coin.delay}s ease-in-out infinite`,
              }}
            >
              ●
            </motion.div>
          ))}

          {/* Running cats */}
          {CAT_RUNNERS.map((cat, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl pointer-events-none"
              style={{ top: cat.y, filter: "drop-shadow(0 0 8px var(--neon-pink))" }}
              animate={{
                x: [cat.startX, cat.endX],
              }}
              transition={{
                duration: cat.duration,
                delay: cat.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {cat.emoji}
            </motion.div>
          ))}

          {/* Laser beams */}
          {[30, 65].map((leftPct) => (
            <div
              key={leftPct}
              className="absolute top-0 bottom-6 w-px"
              style={{
                left: `${leftPct}%`,
                background: "linear-gradient(transparent, var(--neon-cyan), transparent)",
                boxShadow: "0 0 8px var(--neon-cyan)",
                opacity: 0.4,
                animation: "neonPulse 1.5s infinite",
              }}
            />
          ))}
        </motion.div>

        {/* Player cat */}
        <motion.div
          className="absolute text-4xl sm:text-5xl z-10"
          style={{
            bottom: "10%",
            left: "20%",
            filter: "drop-shadow(0 0 12px var(--neon-pink))",
          }}
          animate={{
            y: [0, -24, 0, -12, 0],
            rotate: [0, -5, 0, 3, 0],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🐱
        </motion.div>
      </div>

      {/* Scroll CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 gap-4">
        <motion.p
          className="font-pixel text-[10px] text-gray-500 tracking-[0.3em]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO ENTER THE WORLD
        </motion.p>
        <motion.div
          className="font-pixel text-[var(--neon-cyan)] text-lg"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ textShadow: "0 0 10px var(--neon-cyan)" }}
        >
          ↓
        </motion.div>
      </div>

      {/* Side decorations */}
      <div className="absolute left-0 top-12 bottom-0 w-px opacity-30"
        style={{ background: "linear-gradient(transparent, var(--neon-purple), transparent)" }} />
      <div className="absolute right-0 top-12 bottom-0 w-px opacity-30"
        style={{ background: "linear-gradient(transparent, var(--neon-cyan), transparent)" }} />
    </section>
  );
}
