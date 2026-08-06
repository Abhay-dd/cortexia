"use client";

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

const METRICS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "AI Models in Production" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support & Monitoring" },
];

export default function WhyCortexia() {
  return (
    <section id="why-cortexia" className="section bg-[#0C1422]">
      <div className="container">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="label mb-5">Why Cortexia AI</div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1]">
              Built for enterprises that can&apos;t afford to fail.
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-[#8896B0] text-lg font-light leading-relaxed">
              Cortexia AI partners directly with engineering leaders to deploy reliable, 
              secure, and scalable AI that delivers verifiable business impact — not just 
              impressive demos.
            </p>
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              className="card p-7 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8611A]/10 border border-[#E8611A]/20 flex items-center justify-center text-[#E8611A] mb-5">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-[#8896B0] text-sm font-light leading-relaxed">{p.description}</p>
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
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`p-8 bg-[#111D34] text-center ${i < 3 ? "border-r border-white/[0.06]" : ""}`}
            >
              <div className="font-display text-3xl font-bold text-[#E8611A] mb-1">{m.value}</div>
              <div className="text-xs text-[#4F617A] font-medium uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
