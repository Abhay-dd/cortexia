"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Cpu, Rocket, Shield } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Architecture Blueprint",
    timeframe: "Phase 01 · Week 1-2",
    description: "We audit your data infrastructure, security constraints, and operational bottlenecks to build a fixed-scope technical blueprint.",
    deliverable: "Blueprint & ROI Model",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Neural Model & System Engineering",
    timeframe: "Phase 02 · Week 3-7",
    description: "Our engineers build, train, and fine-tune your custom AI models and integrations in transparent weekly sprint iterations with live demos.",
    deliverable: "Production Models & Core API",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Zero-Downtime Deployment",
    timeframe: "Phase 03 · Week 8-9",
    description: "We deploy your autonomous systems onto your cloud infrastructure with end-to-end encryption, full documentation, and staff onboarding.",
    deliverable: "Production Launch & Onboarding",
  },
  {
    number: "04",
    icon: Shield,
    title: "Telemetry & Model Optimization",
    timeframe: "Phase 04 · Continuous",
    description: "Continuous real-time telemetry monitoring, automated model retraining, and 24/7 SLA maintenance to guarantee sub-40ms performance.",
    deliverable: "24/7 Telemetry & Optimization",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section bg-ambient-mesh">
      <div className="container" ref={sectionRef}>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="badge-minimal justify-center mb-4">Engineering Methodology</div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5">
            Structured Execution from <br />
            <span className="text-gradient-orange">Concept to Production.</span>
          </h2>
          <p className="text-[#A1A1AA] text-base font-light leading-relaxed">
            Our 4-phase deployment framework guarantees rapid execution with enterprise-grade stability.
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-luxury p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-2xl font-extrabold text-white/30 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider mb-2 font-bold">
                    {step.timeframe}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[#A1A1AA] text-xs font-light leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#A1A1AA]">Deliverable:</span>
                  <span className="text-xs font-mono text-white font-semibold">{step.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
