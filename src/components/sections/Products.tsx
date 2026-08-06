"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function Products() {
  return (
    <section id="products" className="section bg-[#070E1A] relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#E8611A]/5 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 text-center">

        {/* Lock icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-[#1B2A4A] border border-[#E8611A]/20 flex items-center justify-center shadow-[0_0_30px_rgba(232,97,26,0.15)]"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Lock className="w-7 h-7 text-[#E8611A]" />
        </motion.div>

        <motion.div
          className="label justify-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Research & Products
        </motion.div>

        <motion.h2
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-5 max-w-2xl mx-auto leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Something extraordinary is in development.
        </motion.h2>

        <motion.p
          className="text-[#8896B0] text-lg font-light max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We are engineering the next generation of AI products designed to fundamentally transform how enterprises build and operate.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-0.5 w-full bg-[#1B2A4A] rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-[#E8611A] to-[#F07840] rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "70%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#4F617A] uppercase tracking-widest">
            Stealth Development · Stage II
          </span>
        </motion.div>

      </div>
    </section>
  );
}
