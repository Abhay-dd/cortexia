"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

const COMPARISONS = [
  {
    pain: "Teams spending 40+ hours weekly on repetitive manual operational tasks",
    gain: "Autonomous AI agents execute complex workflows 24/7 with zero human error",
    metric: "85% Efficiency Boost"
  },
  {
    pain: "Fragmented software tools causing data bottlenecks & delayed decisions",
    gain: "Unified intelligent pipeline synchronizes CRM, ERP & analytics in real-time",
    metric: "Instant Data Sync"
  },
  {
    pain: "Customer support bottlenecks leading to long wait times & lost revenue",
    gain: "Domain-trained AI copilots resolve 90%+ inquiries with instant sub-second response",
    metric: "sub-1s Resolution"
  },
  {
    pain: "Off-the-shelf software fails to match your exact proprietary business logic",
    gain: "Bespoke fine-tuned AI architecture built precisely around your operational blueprint",
    metric: "100% Custom Tailored"
  }
];

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="section bg-matrix" style={{ background: "#060A10" }}>
      <div className="container" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-emerald justify-center mb-4"
          >
            Operational Evolution
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5"
          >
            From Operational Friction to <br />
            <span className="text-gradient-laser">AI-Powered Superiority.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8FA3BF] text-base font-light leading-relaxed"
          >
            Legacy workflows slow down growing enterprise companies. Cortexia AI transforms 
            manual overhead into high-throughput autonomous intelligence.
          </motion.p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {COMPARISONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-chrome rounded-3xl p-8 relative overflow-hidden group"
            >
              {/* Metric Tag */}
              <div className="absolute top-6 right-6 px-3.5 py-1 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 text-[#00FF9D] font-mono text-xs font-bold">
                {item.metric}
              </div>

              {/* Before Friction */}
              <div className="mb-6 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5 mb-2.5 text-rose-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <X className="w-3 h-3 text-rose-400" />
                  </div>
                  Legacy Pain Point
                </div>
                <p className="text-[#8FA3BF] text-sm font-light leading-relaxed">
                  {item.pain}
                </p>
              </div>

              {/* After Cortexia */}
              <div>
                <div className="flex items-center gap-2.5 mb-2.5 text-[#00FF9D] font-mono text-xs uppercase tracking-wider font-semibold">
                  <div className="w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00FF9D]" />
                  </div>
                  Cortexia AI Outcome
                </div>
                <p className="text-white text-base font-medium leading-relaxed">
                  {item.gain}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="card-chrome rounded-3xl p-8 border-[#00FF9D]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#00FF9D]/15 border border-[#00FF9D]/30 flex items-center justify-center text-[#00FF9D] flex-shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                Zero-Risk Engineering Guarantee
              </h3>
              <p className="text-[#8FA3BF] text-sm font-light">
                We perform an architectural discovery session before any engagement. 100% technical transparency.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-emerald text-xs py-3.5 px-6 whitespace-nowrap"
          >
            Request Free Discovery
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
