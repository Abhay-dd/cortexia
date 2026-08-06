"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

/* Ambient radial canvas — subtle volumetric depth, no sci-fi clutter */
function AmbientOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const w = canvas.width, h = canvas.height;
      const cx = w * 0.5, cy = h * 0.5;

      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // Outer soft glow rings
      for (let i = 3; i >= 0; i--) {
        const radius = 140 + i * 60 + Math.sin(t + i) * 20;
        const alpha = 0.04 - i * 0.008;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(232, 97, 26, ${alpha * 2})`);
        grad.addColorStop(0.5, `rgba(27, 42, 74, ${alpha})`);
        grad.addColorStop(1, "rgba(12, 20, 34, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Rotating arcs (like the logo swooshes)
      for (let ring = 0; ring < 5; ring++) {
        const r = 80 + ring * 45;
        const startAngle = t * (ring % 2 === 0 ? 0.5 : -0.4) + ring;
        const endAngle = startAngle + Math.PI * (0.4 + ring * 0.1);

        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = ring % 3 === 0
          ? `rgba(232, 97, 26, ${0.25 - ring * 0.04})`
          : `rgba(176, 196, 222, ${0.08 - ring * 0.01})`;
        ctx.lineWidth = ring === 0 ? 2.5 : 1.2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Center glowing dot
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      cg.addColorStop(0, "rgba(232, 97, 26, 0.6)");
      cg.addColorStop(1, "rgba(232, 97, 26, 0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "AI Systems Deployed" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function Hero() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0C1422] bg-grid pt-20"
    >
      {/* Background ambient gradient from bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E8611A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#1B2A4A]/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Pure Typography + CTA */}
          <div>
            {/* Overline */}
            <motion.div
              className="label mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Engineering Company
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.05] text-white mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Engineering <span className="text-gradient-orange">Intelligence.</span>{" "}
              <br />
              Empowering{" "}
              <span className="text-gradient-orange">Businesses.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-[#8896B0] text-lg font-light leading-relaxed max-w-[500px] mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              We build custom AI solutions, intelligent automation engines, and enterprise software
              platforms that transform how modern businesses operate and scale.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => scrollTo("#services")}
                className="btn-primary"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("#work")}
                className="btn-secondary"
              >
                View Our Work
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="flex gap-10 pt-6 border-t border-white/[0.08]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-[#4F617A] mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Ambient Visual */}
          <motion.div
            className="relative h-[480px] w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer ring decorative border */}
            <div className="absolute inset-8 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-16 rounded-full border border-[#E8611A]/10" />

            <AmbientOrb />

            {/* Floating status badge */}
            <motion.div
              className="absolute bottom-16 left-8 card rounded-xl p-4 border border-[#E8611A]/20"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-xs text-white font-semibold">AI Engine Active</div>
                  <div className="text-[10px] text-[#4F617A] mt-0.5">cortexia-core v3.0</div>
                </div>
              </div>
            </motion.div>

            {/* Floating metric badge */}
            <motion.div
              className="absolute top-20 right-8 card rounded-xl p-4 border border-[#E8611A]/20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-xs text-[#8896B0]">Model Accuracy</div>
              <div className="font-display text-xl font-bold text-white">99.4%</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0C1422] to-transparent pointer-events-none" />
    </section>
  );
}
