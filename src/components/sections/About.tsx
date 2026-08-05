"use client";

import { motion } from "framer-motion";
import { COMPANY, VALUES, TIMELINE, STATS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[#030611] overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Index Marker */}
        <motion.div
          className="flex items-center gap-4 mb-16 text-xs font-mono text-blue-400 tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span>02</span>
          <span className="w-8 h-px bg-blue-500/40" />
          <span>ABOUT CORTEXIA AI</span>
        </motion.div>

        {/* Editorial Split Header & Mission */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              We build intelligent software that redefines industrial capability.
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed">
              {COMPANY.description}
            </p>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              <h3 className="font-mono text-xs text-blue-400 uppercase tracking-wider mb-2">Our Core Imperative</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{COMPANY.mission}</p>
            </div>
          </motion.div>
        </div>

        {/* Stats Row with Thin Dividers */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/[0.08] mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center md:text-left">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </motion.div>

        {/* Core Values Magazine Grid */}
        <div className="mb-28">
          <h3 className="font-display text-2xl font-bold text-white mb-12">Engineering Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="group relative glass-panel p-8 rounded-3xl border border-white/[0.08] hover:border-blue-500/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-xl font-semibold text-white mb-3">{value.title}</h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div>
          <h3 className="font-display text-2xl font-bold text-white mb-12">Historical Milestones</h3>
          <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-slate-700 border-2 border-[#030611] group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                <span className="font-mono text-xs text-blue-400 tracking-wider">{item.year}</span>
                <h4 className="font-display text-lg font-semibold text-white mt-1 mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm font-light max-w-xl leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
