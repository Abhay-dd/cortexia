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
    <div className="min-h-screen bg-[#060A10]">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Process />
        <Work />
        <TechStack />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
