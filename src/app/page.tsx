"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import TechStack from "@/components/sections/TechStack";
import Products from "@/components/sections/Products";
import Contact from "@/components/sections/Contact";

const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#04080F]">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* 1. Hero — 3D brain, typewriter value props */}
        <Hero />
        {/* 2. The Problem — pain → gain transformation */}
        <Problem />
        {/* 3. Services — live animated demos of what we build */}
        <Services />
        {/* 4. Process — how we work, 4-phase timeline */}
        <Process />
        {/* 5. Work — case studies with real results */}
        <Work />
        {/* 6. Tech Stack */}
        <TechStack />
        {/* 7. Products — coming soon */}
        <Products />
        {/* 8. Contact — founder voice, conversion focused */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
