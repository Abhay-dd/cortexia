"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyCortexia from "@/components/sections/WhyCortexia";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import TechStack from "@/components/sections/TechStack";
import Products from "@/components/sections/Products";
import Contact from "@/components/sections/Contact";

const ScrollProgress = dynamic(() => import("@/components/effects/ScrollProgress"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C1422]">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyCortexia />
        <Services />
        <Work />
        <TechStack />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
