"use client";

export default function CRTOverlay() {
  return (
    <>
      <div className="crt-overlay" />
      <div className="crt-flicker" />
      <div className="vhs-noise" />
      {/* Moving horizontal scanline */}
      <div
        className="pointer-events-none fixed inset-x-0 h-8 z-[9996]"
        style={{
          background: "linear-gradient(transparent, rgba(0,245,255,0.015), transparent)",
          animation: "scanlineMove 6s linear infinite",
          top: 0,
        }}
      />
    </>
  );
}
