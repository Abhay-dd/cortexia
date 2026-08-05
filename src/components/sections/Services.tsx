"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="relative py-32 bg-[#030611] overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Index Marker */}
        <motion.div
          className="flex items-center gap-4 mb-16 text-xs font-mono text-cyan-400 tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span>03</span>
          <span className="w-8 h-px bg-cyan-500/40" />
          <span>CAPABILITIES & ARCHITECTURE</span>
        </motion.div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Autonomous Systems. Scalable Engineering.
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            We deliver enterprise AI solutions designed to integrate into high-stakes business operations.
          </p>
        </div>

        {/* Interactive Capability Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Capability Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={service.title}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-6 rounded-3xl transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? "bg-white/[0.06] border-white/20 shadow-2xl"
                      : "bg-transparent border-transparent hover:bg-white/[0.02] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-blue-500 text-white" : "bg-white/5 text-slate-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-display text-lg font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">{service.features.length} Enterprise Modules</p>
                    </div>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 transition-transform ${isActive ? "text-blue-400 rotate-45" : "text-slate-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Stage */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
              >
                {/* Background Ambient Color Blob */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="font-mono text-xs text-blue-400 tracking-wider uppercase mb-2 block">
                    SERVICE SPECIFICATION 0{activeTab + 1}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">
                    {SERVICES[activeTab].title}
                  </h3>
                  <p className="text-slate-300 text-base font-light leading-relaxed mb-8">
                    {SERVICES[activeTab].description}
                  </p>

                  <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">
                    MODULE ARCHITECTURE
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-10">
                    {SERVICES[activeTab].features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                      >
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-slate-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-slate-200 transition-all shadow-xl"
                  >
                    <span>Request Architecture Brief</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
