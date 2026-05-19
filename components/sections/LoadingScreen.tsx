"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> BOOTING CAT.OS v9.09...",
  "> LOADING CHAOS MODULES...",
  "> INITIALIZING MEOW ENGINE...",
  "> HACKING THE INTERNET...",
  "> DEPLOYING CATS WORLDWIDE...",
  "> PURR PROTOCOL: ACTIVE",
  "> FIREWALL: BYPASSED",
  "> HUMANS: CONFUSED",
  "> CATS: IN CONTROL",
  "> WORLD DOMINATION: 99%",
];

const GLITCH_CHARS = "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function glitch(text: string, progress: number): string {
  return text
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (Math.random() > progress) {
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      return char;
    })
    .join("");
}

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [titleText, setTitleText] = useState("INITIATING CAT PROTOCOL");
  const [phase, setPhase] = useState<"boot" | "loading" | "glitch" | "done">("boot");
  const [visible, setVisible] = useState(true);
  const titleRef = useRef("INITIATING CAT PROTOCOL");
  const frameRef = useRef(0);

  // Boot lines typewriter
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let current = "";
    const interval = setInterval(() => {
      if (lineIdx >= BOOT_LINES.length) {
        clearInterval(interval);
        setPhase("loading");
        return;
      }
      current += BOOT_LINES[lineIdx][charIdx] ?? "";
      charIdx++;
      if (charIdx >= BOOT_LINES[lineIdx].length) {
        setBootLines((prev) => [...prev, current]);
        current = "";
        charIdx = 0;
        lineIdx++;
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  // Progress bar
  useEffect(() => {
    if (phase !== "loading") return;
    const start = Date.now();
    const dur = 2800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / dur, 1);
      setProgress(Math.floor(p * 100));
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("glitch");
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [phase]);

  // Glitch title animation
  useEffect(() => {
    if (phase !== "glitch") return;
    let frame = 0;
    const total = 40;
    const animate = () => {
      frame++;
      const p = frame / total;
      setTitleText(glitch(titleRef.current, p));
      if (frame < total) {
        setTimeout(animate, 40);
      } else {
        setTitleText(titleRef.current);
        setTimeout(() => {
          setPhase("done");
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 300);
      }
    };
    animate();
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--dark-bg)" }}
          exit={{ opacity: 0, filter: "blur(20px) brightness(3)" }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          {/* Grid floor */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              perspectiveOrigin: "50% 50%",
              transform: "perspective(600px) rotateX(55deg) translateY(40%)",
            }}
          />

          {/* Cyberpunk city silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-48 opacity-30">
            <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cityGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b44fff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b44fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,200 L0,140 L60,140 L60,80 L80,80 L80,60 L100,60 L100,80 L120,80 L120,100 L160,100 L160,40 L180,40 L180,20 L200,20 L200,40 L220,40 L220,100 L260,100 L260,70 L280,70 L280,50 L300,50 L300,70 L320,70 L320,120 L360,120 L360,60 L380,60 L380,30 L400,30 L400,10 L420,10 L420,30 L440,30 L440,60 L480,60 L480,90 L520,90 L520,50 L540,50 L540,20 L560,20 L560,50 L580,50 L580,90 L620,90 L620,70 L640,70 L640,40 L660,40 L660,70 L680,70 L680,110 L720,110 L720,55 L740,55 L740,25 L760,25 L760,55 L780,55 L780,85 L820,85 L820,45 L840,45 L840,15 L860,15 L860,45 L880,45 L880,90 L920,90 L920,65 L940,65 L940,35 L960,35 L960,65 L980,65 L980,105 L1020,105 L1020,75 L1040,75 L1040,50 L1060,50 L1060,75 L1080,75 L1080,120 L1120,120 L1120,60 L1140,60 L1140,30 L1160,30 L1160,60 L1180,60 L1180,100 L1220,100 L1220,80 L1240,80 L1240,140 L1280,140 L1280,100 L1300,100 L1300,80 L1320,80 L1320,110 L1360,110 L1360,140 L1440,140 L1440,200 Z"
                fill="url(#cityGrad)"
              />
            </svg>
          </div>

          {/* Corner HUD elements */}
          <div className="absolute top-4 left-4 font-vt text-[var(--neon-cyan)] text-sm opacity-70" style={{ animation: "hudBlink 2s infinite" }}>
            <div>SYS: CAT.OS v9.09</div>
            <div>THREAT LVL: MEOW-9</div>
            <div>FRAME {String(Math.floor(Math.random() * 9999)).padStart(4, "0")}</div>
          </div>
          <div className="absolute top-4 right-4 font-vt text-[var(--neon-cyan)] text-sm opacity-70 text-right" style={{ animation: "hudBlink 2.3s infinite" }}>
            <div>REC • 01:22:47</div>
            <div>CH 09 – FERAL.NET</div>
            <div>SIGNAL: 97%</div>
          </div>

          {/* Emergency broadcast banner */}
          <motion.div
            className="absolute top-16 left-0 right-0 text-center font-pixel text-[var(--neon-yellow)] text-[10px] tracking-widest"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0.8], y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ animation: "hudBlink 1.5s 0.5s infinite" }}
          >
            EMERGENCY BROADCAST — DO NOT ADJUST YOUR SCREEN
          </motion.div>

          {/* Main title */}
          <motion.div
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="font-pixel text-[var(--neon-cyan)] text-xs tracking-[0.3em] mb-4 opacity-80">
              INITIATING
            </p>
            <h1
              className="font-pixel text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wider"
              style={{
                textShadow: "0 0 20px #fff, 0 0 40px var(--neon-pink), 0 0 80px var(--neon-pink)",
                animation: phase === "glitch" ? "titleGlitch 0.3s infinite" : undefined,
              }}
            >
              {titleText}
            </h1>
          </motion.div>

          {/* Boot lines terminal */}
          <motion.div
            className="relative z-10 mt-8 w-full max-w-lg px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-black/40 border border-[var(--neon-cyan)]/30 p-3 font-vt text-sm text-[var(--neon-green)] h-28 overflow-hidden">
              {bootLines.slice(-6).map((line, i) => (
                <div key={i} style={{ opacity: 0.6 + i * 0.07 }}>{line}</div>
              ))}
              <span style={{ animation: "blink 1s infinite" }}>_</span>
            </div>
          </motion.div>

          {/* Loading bar */}
          {phase !== "boot" && (
            <motion.div
              className="relative z-10 mt-6 w-full max-w-md px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between font-pixel text-[9px] text-[var(--neon-pink)] mb-2">
                <span>LOADING...</span>
                <span>{progress}%</span>
              </div>
              <div
                className="h-3 bg-black/60 relative overflow-hidden"
                style={{ border: "1px solid var(--neon-pink)", boxShadow: "0 0 10px rgba(255,45,120,0.4)" }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, var(--neon-pink), var(--neon-purple), var(--neon-cyan))",
                    boxShadow: "0 0 15px var(--neon-pink)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
                {/* Scanline on bar */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.5) 4px, rgba(0,0,0,0.5) 6px)",
                  }}
                />
              </div>
              <motion.p
                className="mt-4 text-center font-pixel text-[9px] text-[var(--neon-yellow)] tracking-widest"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                WARNING: CATS HAVE TAKEN THE INTERNET
              </motion.p>
            </motion.div>
          )}

          {/* Bottom marquee */}
          <div className="absolute bottom-4 left-0 right-0 overflow-hidden font-vt text-[var(--neon-purple)] text-sm opacity-50">
            <div style={{ animation: "marquee 14s linear infinite", whiteSpace: "nowrap", display: "inline-block" }}>
              &nbsp;&nbsp;&nbsp;CATS ONLINE: 4,294,967,295 &nbsp;•&nbsp; WORLD DOMINATION: IMMINENT &nbsp;•&nbsp; MEOW FREQUENCY: MAX &nbsp;•&nbsp; HUMANS: IRRELEVANT &nbsp;•&nbsp; PURRING: ACTIVE &nbsp;•&nbsp;
            </div>
          </div>

          {/* Corner decoration pixels */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8`}
              style={{
                borderColor: "var(--neon-pink)",
                borderStyle: "solid",
                borderWidth: i % 2 === 0 ? "2px 0 0 2px" : "2px 2px 0 0",
                ...(i >= 2 && { borderWidth: i === 2 ? "0 0 2px 2px" : "0 2px 2px 0" }),
                boxShadow: `0 0 8px var(--neon-pink)`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
