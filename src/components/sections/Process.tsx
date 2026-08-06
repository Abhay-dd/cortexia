"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Cpu, Rocket, Shield, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Technical Discovery & Blueprint",
    timeframe: "Phase 01 · Week 1-2",
    description: "We audit your existing data infrastructure, security constraints, and operational bottlenecks to build a clear, fixed-scope engineering blueprint.",
    deliverable: "Architecture Blueprint & ROI Model",
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
    deliverable: "Production Launch & Staff Training",
  },
  {
    number: "04",
    icon: Shield,
    title: "Telemetry & Model Optimization",
    timeframe: "Phase 04 · Continuous",
    description: "Continuous real-time telemetry monitoring, automated model retraining, and 24/7 SLA maintenance to guarantee sub-40ms performance.",
    deliverable: "24/7 Telemetry & Model Retraining",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container" ref={sectionRef}>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="label-emerald justify-center mb-4">Engineering Methodology</div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5">
            Structured Execution from <br />
            <span className="text-gradient-laser">Concept to Production.</span>
          </h2>
          <p className="text-[#8FA3BF] text-base font-light leading-relaxed">
            Our 4-phase deployment framework guarantees rapid execution with enterprise-grade stability.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-chrome rounded-3xl p-7 relative flex flex-col justify-between group"
              >
                {/* Step Glow Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF9D]/40 to-transparent group-hover:via-[#00FF9D] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-2xl font-extrabold text-[#00FF9D]/40 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-[#00FF9D] uppercase tracking-wider mb-2 font-bold">
                    {step.timeframe}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[#8FA3BF] text-xs font-light leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#060A10] border border-[rgba(0,255,157,0.15)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8FA3BF]">Deliverable:</span>
                  <span className="text-xs font-mono text-[#00FF9D] font-semibold">{step.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
