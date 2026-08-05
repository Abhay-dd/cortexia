"use client";

import { motion } from "framer-motion";
import { Lock, ShieldAlert } from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="relative py-36 bg-[#030611] overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        
        {/* Section Index Marker */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16 text-xs font-mono text-violet-400 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>05</span>
          <span className="w-8 h-px bg-violet-500/40" />
          <span>RESEARCH & PRODUCTS</span>
        </motion.div>

        {/* Monolithic Lock Visual */}
        <motion.div
          className="relative w-28 h-28 mx-auto mb-10 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/10 blur-xl animate-pulse-glow" />
          <div className="relative w-full h-full rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-xl flex items-center justify-center shadow-2xl">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 max-w-3xl mx-auto leading-[1.05]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Something extraordinary <br /> is in development.
        </motion.h2>

        {/* Minimal mystery text */}
        <motion.p
          className="text-slate-400 text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are engineering the next generation of autonomous AI products designed to fundamentally shift how businesses build and operate.
        </motion.p>

        {/* Progress Line */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "65%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>CONFIDENTIAL REVEAL</span>
            <span className="text-slate-400">STAGE II / STEALTH</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
