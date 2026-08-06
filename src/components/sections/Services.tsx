"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Workflow, Code, Cloud, ArrowUpRight, Check } from "lucide-react";

const SERVICES = [
  {
    id: "ai",
    icon: Brain,
    title: "Artificial Intelligence",
    subtitle: "Custom Neural Models & Autonomous Agents",
    description: "Domain-specific LLMs, autonomous multi-agent swarms, computer vision pipelines, and natural language processing tailored for high-stakes enterprise environments.",
    features: ["Autonomous AI Agents", "Custom LLM Fine-Tuning", "Computer Vision & Perception", "Enterprise NLP Systems"],
  },
  {
    id: "auto",
    icon: Workflow,
    title: "Intelligent Automation",
    subtitle: "Autonomous Workflow Orchestration",
    description: "Connect your enterprise CRM, ERP, and databases with AI decision routing engines that eliminate manual overhead and execute tasks 24/7.",
    features: ["End-to-End Workflow Sync", "AI Decision Routing", "API Orchestration", "Real-Time Telemetry"],
  },
  {
    id: "software",
    icon: Code,
    title: "Software Engineering",
    subtitle: "High-Performance SaaS & Enterprise Apps",
    description: "Robust full-stack enterprise applications built with modern architectures — lightning-fast APIs, sleek glass interfaces, and scalable backends.",
    features: ["SaaS Product Engineering", "Executive Analytics Dashboards", "REST & GraphQL APIs", "Microservices Architecture"],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Auto-Scaling AI Infrastructure",
    description: "Resilient, SOC2-compliant cloud environments engineered specifically for AI compute workloads with zero-downtime CI/CD and 99.99% SLAs.",
    features: ["AWS Architecture & Migration", "Kubernetes & Docker", "Automated CI/CD Pipelines", "24/7 Threat Monitoring"],
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="section bg-ambient-mesh">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge-minimal justify-center mb-4">Core Capabilities</div>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold text-white leading-[1.08] mb-5">
            Four Core Pillars of <br />
            <span className="text-gradient-orange">Enterprise Intelligence.</span>
          </h2>
          <p className="text-[#A1A1AA] text-base font-light leading-relaxed">
            We engineer end-to-end intelligent systems tailored specifically to your operational ecosystem.
          </p>
        </div>

        {/* Capability Nav Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const isActive = activeTab === i;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#FF6B00] text-white shadow-[0_4px_25px_rgba(255,107,0,0.4)]"
                    : "card-luxury text-[#A1A1AA] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="card-luxury p-10 max-w-4xl mx-auto text-left"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8 pb-8 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-widest mb-2 font-bold">
                  Capability Module 0{activeTab + 1}
                </div>
                <h3 className="font-display text-3xl font-extrabold text-white mb-2">
                  {SERVICES[activeTab].title}
                </h3>
                <p className="text-sm font-mono text-[#A1A1AA]">
                  {SERVICES[activeTab].subtitle}
                </p>
              </div>

              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary-orange text-xs py-3 px-6 whitespace-nowrap"
              >
                Discuss This Capability
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[#A1A1AA] text-base font-light leading-relaxed mb-8">
              {SERVICES[activeTab].description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES[activeTab].features.map((feature) => (
                <div key={feature} className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-[#FF6B00]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#FF6B00]" />
                  </div>
                  <span className="text-xs text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
