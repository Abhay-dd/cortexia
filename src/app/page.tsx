"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Products from "@/components/sections/Products";
import Contact from "@/components/sections/Contact";

// Lazy-load heavy visual effects to improve initial load
const ParticleBackground = dynamic(
  () => import("@/components/effects/ParticleBackground"),
  { ssr: false }
);
const MouseGlow = dynamic(() => import("@/components/effects/MouseGlow"), {
  ssr: false,
});
const ScrollProgress = dynamic(
  () => import("@/components/effects/ScrollProgress"),
  { ssr: false }
);
const FloatingShapes = dynamic(
  () => import("@/components/effects/FloatingShapes"),
  { ssr: false }
);
const LoadingScreen = dynamic(
  () => import("@/components/layout/LoadingScreen"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ParticleBackground />
      <MouseGlow />
      <FloatingShapes />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Products />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
