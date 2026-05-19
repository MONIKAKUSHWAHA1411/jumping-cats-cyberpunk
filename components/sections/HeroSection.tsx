"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import StarField from "@/components/effects/StarField";

const CAT_EMOJI_LARGE = "🐱";

function CatSilhouette({ x, y, size = 20, style }: { x: string; y: string; size?: number; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute font-pixel select-none"
      style={{ left: x, top: y, fontSize: size, opacity: 0.15, ...style }}
    >
      🐈
    </div>
  );
}

export default function HeroSection() {
  const [catDropped, setCatDropped] = useState(false);
  const [catScratched, setCatScratched] = useState(false);
  const [impactVisible, setImpactVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [catCount] = useState("4,294,967,295");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const t1 = setTimeout(() => setCatDropped(true), 400);
    const t2 = setTimeout(() => { setImpactVisible(true); setTimeout(() => setImpactVisible(false), 600); }, 1400);
    const t3 = setTimeout(() => setCatScratched(true), 2200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      mouseX.set(cx * 30);
      mouseY.set(cy * 20);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060010 0%, #100020 50%, #060010 100%)" }}
    >
      <StarField />

      {/* Grid floor perspective */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(180,79,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180,79,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(400px) rotateX(60deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(transparent, rgba(0,0,0,0.8) 40%)",
          WebkitMaskImage: "linear-gradient(transparent, rgba(0,0,0,0.8) 40%)",
        }}
      />

      {/* Cyberpunk city silhouette BG */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 260" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hg1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#b44fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#b44fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,260 L0,180 L80,180 L80,100 L100,100 L100,60 L120,60 L120,100 L140,100 L140,140 L200,140 L200,60 L220,60 L220,20 L240,20 L240,60 L260,60 L260,100 L300,100 L300,80 L320,80 L320,40 L340,40 L340,80 L360,80 L360,120 L400,120 L400,60 L420,60 L420,20 L440,20 L440,60 L460,60 L460,100 L520,100 L520,70 L540,70 L540,30 L560,30 L560,70 L580,70 L580,100 L640,100 L640,50 L660,50 L660,10 L680,10 L680,50 L700,50 L700,80 L760,80 L760,120 L800,120 L800,50 L820,50 L820,20 L840,20 L840,50 L860,50 L860,90 L920,90 L920,60 L940,60 L940,30 L960,30 L960,60 L980,60 L980,100 L1040,100 L1040,70 L1060,70 L1060,40 L1080,40 L1080,70 L1100,70 L1100,120 L1160,120 L1160,80 L1180,80 L1180,50 L1200,50 L1200,80 L1220,80 L1220,130 L1280,130 L1280,100 L1300,100 L1300,150 L1360,150 L1360,180 L1440,180 L1440,260 Z"
            fill="url(#hg1)"
          />
        </svg>
      </div>

      {/* Neon billboard lights */}
      {[
        { x: "8%", y: "30%", color: "var(--neon-cyan)", text: "MEOW" },
        { x: "82%", y: "35%", color: "var(--neon-pink)", text: "CATS" },
        { x: "3%", y: "55%", color: "var(--neon-purple)", text: "NET" },
        { x: "88%", y: "58%", color: "var(--neon-yellow)", text: "GAME" },
      ].map(({ x, y, color, text }) => (
        <div
          key={text}
          className="absolute font-pixel text-[10px] tracking-widest hidden sm:block"
          style={{
            left: x, top: y,
            color,
            textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            animation: "neonPulse 2s infinite",
            opacity: 0.6,
            transform: "rotate(-2deg)",
          }}
        >
          {text}
        </div>
      ))}

      {/* Cat silhouettes bg */}
      <CatSilhouette x="5%" y="40%" size={18} />
      <CatSilhouette x="88%" y="45%" size={22} />
      <CatSilhouette x="15%" y="65%" size={14} />
      <CatSilhouette x="75%" y="60%" size={16} />

      {/* Parallax container */}
      <motion.div
        className="relative z-10 text-center px-4 w-full max-w-5xl"
        style={{ x: springX, y: springY }}
      >
        {/* SOUND / FULLSCREEN top controls */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between px-2 sm:px-8 font-pixel text-[9px] text-gray-500">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="flex items-center gap-2 hover:text-[var(--neon-cyan)] transition-colors"
            style={{ cursor: "none" }}
          >
            {soundOn ? "🔊" : "🔇"} SOUND: {soundOn ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => document.documentElement.requestFullscreen?.()}
            className="flex items-center gap-2 hover:text-[var(--neon-cyan)] transition-colors"
            style={{ cursor: "none" }}
          >
            FULLSCREEN ⛶
          </button>
        </div>

        {/* Main cat drop */}
        <motion.div
          className="text-7xl sm:text-9xl mb-6 relative inline-block"
          initial={{ y: "-120vh", opacity: 0 }}
          animate={catDropped ? { y: 0, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
            duration: 1.2,
          }}
          onAnimationComplete={() => {}}
        >
          <span style={{ animation: "floatSlow 3s ease-in-out infinite" }}>
            {CAT_EMOJI_LARGE}
          </span>
          {/* Scratch marks from second cat */}
          {catScratched && (
            <motion.div
              className="absolute -right-8 -top-4 text-4xl"
              initial={{ x: 100, opacity: 0, rotate: -30 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              🐱
            </motion.div>
          )}
        </motion.div>

        {/* Impact ring */}
        {impactVisible && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none"
            style={{
              border: "3px solid var(--neon-yellow)",
              boxShadow: "0 0 20px var(--neon-yellow)",
              animation: "impactRipple 0.6s ease-out forwards",
            }}
          />
        )}

        {/* JUMPING CATS title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 120, damping: 10 }}
        >
          <h1
            className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-2 relative inline-block"
            style={{
              background: "linear-gradient(135deg, var(--neon-pink) 0%, var(--neon-purple) 50%, var(--neon-cyan) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px var(--neon-pink)) drop-shadow(0 0 40px rgba(180,79,255,0.5))",
              animation: "titleGlitch 6s infinite",
            }}
          >
            JUMPING
          </h1>
          <br />
          <h1
            className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none"
            style={{
              background: "linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-pink) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px var(--neon-cyan)) drop-shadow(0 0 40px rgba(0,245,255,0.5))",
              animation: "titleGlitch 6s 1s infinite",
            }}
          >
            CATS
          </h1>
        </motion.div>

        {/* Scratch marks overlay on title */}
        {catScratched && (
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8] }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 300 200" className="w-full max-w-sm opacity-40" style={{ filter: "drop-shadow(0 0 8px var(--neon-pink))" }}>
              <line x1="80" y1="20" x2="220" y2="180" stroke="var(--neon-pink)" strokeWidth="3" strokeLinecap="round" />
              <line x1="100" y1="15" x2="240" y2="175" stroke="var(--neon-pink)" strokeWidth="2" strokeLinecap="round" />
              <line x1="60" y1="25" x2="200" y2="185" stroke="var(--neon-pink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}

        {/* Tagline */}
        <motion.p
          className="font-pixel text-[10px] sm:text-xs text-gray-400 tracking-[0.3em] mt-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          THE INTERNET IS OUR PLAYGROUND
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <button className="arcade-btn text-[10px] sm:text-xs">
            PRESS ENTER TO START
          </button>
        </motion.div>
      </motion.div>

      {/* HUD bottom bar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between px-4 sm:px-8 items-end pointer-events-none">
        <div className="font-vt text-[var(--neon-cyan)] text-xs opacity-50" style={{ animation: "hudBlink 3s infinite" }}>
          <div>X:289.2274475097656</div>
          <div>USR: ANON-MOOMAN</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="font-vt text-gray-500 text-sm">🖱 SCROLL DOWN</div>
          <motion.div
            className="w-px h-8 mx-auto"
            style={{ background: "linear-gradient(transparent, var(--neon-pink))" }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <div className="font-vt text-[var(--neon-cyan)] text-xs opacity-50 text-right" style={{ animation: "hudBlink 3.4s infinite" }}>
          <div>CAT COUNT: {catCount}</div>
          <div>FIREWALL: DOWN</div>
        </div>
      </div>

      {/* World domination badge */}
      <motion.div
        className="absolute bottom-6 right-4 sm:right-8 flex items-center gap-2 font-pixel text-[9px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-gray-500">☠ WORLD DOMINATION</span>
        <span
          className="text-[var(--neon-pink)]"
          style={{ textShadow: "0 0 10px var(--neon-pink)", animation: "neonPulse 1s infinite" }}
        >
          0%
        </span>
      </motion.div>
    </section>
  );
}
