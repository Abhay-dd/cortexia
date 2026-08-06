"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Layers, Workflow, Globe, ArrowRight, Sparkles } from "lucide-react";

const STAGES = [
  {
    number: "01",
    title: "The AI Research Lab",
    subtitle: "Algorithm & Neural Architecture",
    description: "Deep model training, domain-specific dataset fine-tuning, and neural safety alignment inside our dedicated AI lab.",
    icon: Cpu,
    tag: "Lab Foundations",
  },
  {
    number: "02",
    title: "System Synthesis",
    subtitle: "API & Microservices Engineering",
    description: "Translating raw AI models into high-performance REST/GraphQL microservices with sub-40ms latency benchmarks.",
    icon: Layers,
    tag: "Engineering Bridge",
  },
  {
    number: "03",
    title: "Enterprise Automation",
    subtitle: "Autonomous Workflow Integration",
    description: "Connecting intelligence into your CRM, ERP, and operations to automate complex manual processes end-to-end.",
    icon: Workflow,
    tag: "Operational Scale",
  },
  {
    number: "04",
    title: "The Modern World",
    subtitle: "Global Enterprise Impact",
    description: "Production software deployed at global scale, delivering verifiable efficiency gains, cost reduction, and market leadership.",
    icon: Globe,
    tag: "Real-World Deployment",
  },
];

export default function Evolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="evolution" className="section bg-ambient-mesh">
      <div className="container" ref={sectionRef}>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge-minimal justify-center mb-4"
          >
            The Evolution Story
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5"
          >
            From the AI Lab to the <br />
            <span className="text-gradient-orange">Modern Enterprise.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A1A1AA] text-base font-light leading-relaxed"
          >
            How we transform theoretical artificial intelligence into real-world enterprise software.
          </motion.p>
        </div>

        {/* 4-Stage Horizontal Evolutionary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-luxury p-7 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] group-hover:border-[#FF6B00]/40 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-2xl font-extrabold text-white/30 font-mono">
                      {stage.number}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider mb-2 font-bold">
                    {stage.tag}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {stage.title}
                  </h3>

                  <div className="text-xs text-[#A1A1AA] font-mono mb-4">
                    {stage.subtitle}
                  </div>

                  <p className="text-[#A1A1AA] text-xs font-light leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A1A1AA] font-mono group-hover:text-white transition-colors">
                  <span>Stage {stage.number}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
