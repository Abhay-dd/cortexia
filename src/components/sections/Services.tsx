"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Workflow, Code, Cloud, Check, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "Custom ML Models & Autonomous Agents",
    description:
      "We engineer production-ready intelligent systems — from fine-tuned large language models to real-time computer vision pipelines and autonomous multi-agent workflows.",
    features: [
      "Autonomous AI Agents",
      "Enterprise Chatbots",
      "Computer Vision & Perception",
      "Custom ML Engineering",
      "Natural Language Processing",
    ],
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    subtitle: "End-to-End Workflow Optimization",
    description:
      "Eliminate manual overhead with intelligent process automation that connects your entire software ecosystem and makes real-time decisions autonomously.",
    features: [
      "Business Process Automation",
      "Workflow Orchestration Engines",
      "CRM & ERP Integration",
      "Multi-Channel AI Bots",
      "Document & Email Automation",
    ],
  },
  {
    icon: Code,
    title: "Software Engineering",
    subtitle: "Modern Web & Enterprise Platforms",
    description:
      "Robust, high-performance software built with modern architectures — clean design, scalable backends, and intuitive user experiences that grow with your business.",
    features: [
      "SaaS Product Development",
      "Enterprise Web Applications",
      "Executive Analytics Dashboards",
      "High-Performance REST & GraphQL APIs",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Resilient Cloud Infrastructure",
    description:
      "We architect and manage secure, auto-scaling cloud environments optimized for AI workloads, with automated pipelines and continuous monitoring.",
    features: [
      "AWS Architecture & Migration",
      "Docker & Kubernetes Orchestration",
      "Automated CI/CD Pipelines",
      "Cloud Security & Compliance",
      "24/7 Infrastructure Monitoring",
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section bg-[#0C1422]">
      <div className="container">

        {/* Header */}
        <div className="max-w-xl mb-14">
          <div className="label mb-5">Capability Architecture</div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold text-white leading-[1.1] mb-4">
            Services built for high-stakes operations.
          </h2>
          <p className="text-[#8896B0] font-light leading-relaxed">
            Every capability is an enterprise module designed for resilient, seamless integration into your existing systems.
          </p>
        </div>

        {/* Interactive Stage */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SERVICES.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                  active === i
                    ? "bg-[#1B2A4A] border-[#E8611A]/40 shadow-[0_0_20px_rgba(232,97,26,0.12)]"
                    : "bg-transparent border-transparent hover:bg-[#111D34] hover:border-white/[0.08]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  active === i ? "bg-[#E8611A] text-white" : "bg-[#1B2A4A] text-[#8896B0]"
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-display font-semibold text-sm ${active === i ? "text-white" : "text-[#8896B0]"}`}>
                    {s.title}
                  </div>
                  <div className="text-xs text-[#4F617A] mt-0.5">{s.subtitle}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="card rounded-2xl p-8 h-full"
              >
                <div className="text-xs font-mono text-[#E8611A] uppercase tracking-widest mb-2">
                  Specification 0{active + 1}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {SERVICES[active].title}
                </h3>
                <p className="text-[#8896B0] font-light leading-relaxed mb-7">
                  {SERVICES[active].description}
                </p>

                <div className="text-xs font-mono text-[#4F617A] uppercase tracking-widest mb-3">
                  Core Modules
                </div>
                <div className="grid sm:grid-cols-2 gap-2 mb-8">
                  {SERVICES[active].features.map((f) => (
                    <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-4 h-4 rounded-full bg-[#E8611A]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#E8611A]" />
                      </div>
                      <span className="text-xs text-[#8896B0] font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Discuss This Service
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
