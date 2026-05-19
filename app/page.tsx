"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CRTOverlay from "@/components/effects/CRTOverlay";
import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import ChaosSection from "@/components/sections/ChaosSection";
import MotionTextSection from "@/components/sections/MotionTextSection";
import ScrollExperience from "@/components/sections/ScrollExperience";
import GameSection from "@/components/sections/GameSection";
import Footer from "@/components/sections/Footer";

const LoadingScreen = dynamic(() => import("@/components/sections/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/effects/CustomCursor"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/effects/ParticleField"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative">
      {/* Global effects */}
      <CRTOverlay />
      <CustomCursor />
      <ParticleField count={50} />

      {/* Loading screen — unmounts on complete */}
      {!loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} />
      )}

      {/* Main content — fades in after loading */}
      {loaded && (
        <>
          <Navigation />
          <HeroSection />
          <ChaosSection />
          <MotionTextSection />
          <ScrollExperience />
          <GameSection />
          <Footer />
        </>
      )}
    </main>
  );
}
