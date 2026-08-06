"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Brain, Zap, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    icon: Brain,
    title: "Custom AI Architecture",
    description:
      "Domain-specific model fine-tuning, autonomous multi-agent orchestration, and computer vision pipelines built for your exact use case.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description:
      "SOC2-compliant infrastructure, encrypted model pipelines, and deterministic fallback systems designed for zero-risk enterprise adoption.",
  },
  {
    icon: Zap,
    title: "High-Throughput Performance",
    description:
      "Sub-50ms model latency, auto-scaling cloud compute, optimized vector search, and 99.9% uptime SLA on all production systems.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Business Impact",
    description:
      "Every system we build is measured against hard business KPIs — efficiency gains, cost reductions, and revenue impact.",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    setTilt({ x: -(cy / rect.height - 0.5) * 14, y: (cx / rect.width - 0.5) * 14 });
    setGlare({ x: (cx / rect.width) * 100, y: (cy / rect.height) * 100 });
  };

  return (
    <div
      className={className}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
        transition: "transform 0.15s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
    >
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(232,97,26,0.15) 0%, transparent 65%)`,
        }} />
      )}
      {children}
    </div>
  );
}

export default function WhyCortexia() {
  return (
    <section id="why-cortexia" className="section bg-[#070E1A]">
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="label mb-5">Why Cortexia AI</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1]">
              Built for enterprises that can&apos;t afford to fail.
            </h2>
          </motion.div>
          <motion.div className="flex items-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="text-[#8896B0] text-lg font-light leading-relaxed">
              Cortexia AI partners directly with engineering leaders to deploy reliable,
              secure, and scalable AI that delivers verifiable business impact — not just impressive demos.
            </p>
          </motion.div>
        </div>

        {/* 3D Tilt Pillar Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard className="card p-7 rounded-2xl h-full">
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#E8611A] mb-5"
                    style={{ background: "rgba(232,97,26,0.1)", border: "1px solid rgba(232,97,26,0.2)" }}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-[#8896B0] text-sm font-light leading-relaxed">{p.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Metrics Bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-white/[0.08]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "30+", label: "AI Models in Production" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "24/7", label: "Support & Monitoring" },
          ].map((m, i) => (
            <div key={m.label} className={`p-8 bg-[#0B1525] text-center ${i < 3 ? "border-r border-white/[0.06]" : ""}`}>
              <div className="font-display text-3xl font-bold text-[#E8611A] mb-1">{m.value}</div>
              <div className="text-xs text-[#4F617A] font-medium uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
