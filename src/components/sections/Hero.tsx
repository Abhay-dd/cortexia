"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

// Interactive Canvas AI Holographic Core Sphere Visual
function HolographicCoreVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = 500;
      canvas.height = 500;
    };

    const drawOrb = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      rotation += 0.006;

      // Volumetric Core Glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 220);
      bgGlow.addColorStop(0, "rgba(96, 165, 250, 0.25)");
      bgGlow.addColorStop(0.4, "rgba(59, 130, 246, 0.1)");
      bgGlow.addColorStop(1, "rgba(3, 6, 17, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      // Rotating Energy Orbital Rings
      for (let ring = 0; ring < 4; ring++) {
        const radius = 80 + ring * 35;
        const speed = (ring % 2 === 0 ? 1 : -1) * (0.8 + ring * 0.2);
        const currentRot = rotation * speed + ring;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(currentRot);
        ctx.scale(1, 0.35 + ring * 0.1);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring % 2 === 0 ? "rgba(96, 165, 250, 0.4)" : "rgba(6, 182, 212, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([15, 25, 45, 10]);
        ctx.stroke();

        ctx.restore();
      }

      // Center High-Density Core Particles
      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + rotation * 2;
        const dist = 40 + Math.sin(rotation * 3 + i) * 25;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist * 0.7;

        const size = 1.5 + Math.sin(i + rotation * 4) * 1;
        const opacity = 0.4 + Math.sin(rotation * 2 + i) * 0.4;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(255, 255, 255, ${opacity})` : `rgba(96, 165, 250, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawOrb);
    };

    resize();
    drawOrb();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Floating Hologram Label */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="font-mono text-xs text-slate-300 tracking-wider">CORTEXIA ARCHITECTURE v3.0</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const handleScrollToNext = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 overflow-hidden bg-[#030611] bg-mesh-grid"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto z-10">
        
        {/* Editorial Pill Tag */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono tracking-wider text-slate-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>NEXT-GENERATION AI ENGINEERING</span>
        </motion.div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Typography Column */}
          <div className="lg:col-span-7">
            <motion.h1
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              ENGINEERING <br />
              <span className="gradient-accent">INTELLIGENCE.</span> <br />
              <span className="text-slate-400 font-light italic">EMPOWERING</span> BUSINESSES.
            </motion.h1>

            {/* Minimalist Editorial Paragraph */}
            <motion.p
              className="mt-8 text-slate-400 text-lg sm:text-xl max-w-xl font-light leading-relaxed text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              We engineer custom artificial intelligence, autonomous agentic systems, and 
              enterprise cloud platforms built for businesses ready to dominate their industry.
            </motion.p>

            {/* Premium CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
              >
                <span>Explore Capability</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white text-sm font-semibold hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 backdrop-blur-md"
              >
                <span>Selected Work</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Holographic AI Core Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <HolographicCoreVisual />
            </motion.div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex justify-between items-end z-10 pt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="flex items-center gap-8 text-xs font-mono text-slate-500">
          <span>01 / PREMIER AI LAB</span>
          <span className="hidden sm:inline">SAN FRANCISCO, CA</span>
        </div>

        <button
          onClick={handleScrollToNext}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
